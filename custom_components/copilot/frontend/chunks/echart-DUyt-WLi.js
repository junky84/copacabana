import { i as m0, b as _0, a as S0 } from "./panel-DDAsFRoX.js";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var uu = function(r, t) {
  return uu = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }, uu(r, t);
};
function k(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  uu(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var w0 = /* @__PURE__ */ (function() {
  function r() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return r;
})(), b0 = /* @__PURE__ */ (function() {
  function r() {
    this.browser = new w0(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return r;
})(), U = new b0();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (U.wxa = !0, U.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? U.worker = !0 : !U.hasGlobalWindow || "Deno" in window ? (U.node = !0, U.svgSupported = !0) : x0(navigator.userAgent, U);
function x0(r, t) {
  var e = t.browser, i = r.match(/Firefox\/([\d.]+)/), n = r.match(/MSIE\s([\d.]+)/) || r.match(/Trident\/.+?rv:(([\d.]+))/), a = r.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(r);
  i && (e.firefox = !0, e.version = i[1]), n && (e.ie = !0, e.version = n[1]), a && (e.edge = !0, e.version = a[1], e.newEdge = +a[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (e.ie && "transition" in s || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
var pf = 12, T0 = "sans-serif", Xr = pf + "px " + T0, C0 = 20, M0 = 100, D0 = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function A0(r) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var e = 0; e < r.length; e++) {
    var i = String.fromCharCode(e + 32), n = (r.charCodeAt(e) - C0) / M0;
    t[i] = n;
  }
  return t;
}
var L0 = A0(D0), Gi = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    var r, t;
    return function(e, i) {
      if (!r) {
        var n = Gi.createCanvas();
        r = n && n.getContext("2d");
      }
      if (r)
        return t !== i && (t = r.font = i || Xr), r.measureText(e);
      e = e || "", i = i || Xr;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || pf, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * e.length;
      else
        for (var l = 0; l < e.length; l++) {
          var u = L0[e[l]];
          s += u == null ? o : u * o;
        }
      return { width: s };
    };
  })(),
  loadImage: function(r, t, e) {
    var i = new Image();
    return i.onload = t, i.onerror = e, i.src = r, i;
  }
}, Ad = Wi([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  "Image",
  "Canvas"
], function(r, t) {
  return r["[object " + t + "]"] = !0, r;
}, {}), Ld = Wi([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], function(r, t) {
  return r["[object " + t + "Array]"] = !0, r;
}, {}), ia = Object.prototype.toString, Qo = Array.prototype, I0 = Qo.forEach, P0 = Qo.filter, df = Qo.slice, R0 = Qo.map, Ch = function() {
}.constructor, ha = Ch ? Ch.prototype : null, gf = "__proto__", E0 = 2311;
function Id() {
  return E0++;
}
function yf() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, r);
}
function Q(r) {
  if (r == null || typeof r != "object")
    return r;
  var t = r, e = ia.call(r);
  if (e === "[object Array]") {
    if (!Dn(r)) {
      t = [];
      for (var i = 0, n = r.length; i < n; i++)
        t[i] = Q(r[i]);
    }
  } else if (Ld[e]) {
    if (!Dn(r)) {
      var a = r.constructor;
      if (a.from)
        t = a.from(r);
      else {
        t = new a(r.length);
        for (var i = 0, n = r.length; i < n; i++)
          t[i] = r[i];
      }
    }
  } else if (!Ad[e] && !Dn(r) && !Hn(r)) {
    t = {};
    for (var o in r)
      r.hasOwnProperty(o) && o !== gf && (t[o] = Q(r[o]));
  }
  return t;
}
function J(r, t, e) {
  if (!G(t) || !G(r))
    return e ? Q(t) : r;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== gf) {
      var n = r[i], a = t[i];
      G(a) && G(n) && !N(a) && !N(n) && !Hn(a) && !Hn(n) && !Mh(a) && !Mh(n) && !Dn(a) && !Dn(n) ? J(n, a, e) : (e || !(i in r)) && (r[i] = Q(t[i]));
    }
  return r;
}
function k0(r, t) {
  for (var e = r[0], i = 1, n = r.length; i < n; i++)
    e = J(e, r[i], t);
  return e;
}
function O(r, t) {
  if (Object.assign)
    Object.assign(r, t);
  else
    for (var e in t)
      t.hasOwnProperty(e) && e !== gf && (r[e] = t[e]);
  return r;
}
function st(r, t, e) {
  for (var i = ct(t), n = 0, a = i.length; n < a; n++) {
    var o = i[n];
    r[o] == null && (r[o] = t[o]);
  }
  return r;
}
function rt(r, t) {
  if (r) {
    if (r.indexOf)
      return r.indexOf(t);
    for (var e = 0, i = r.length; e < i; e++)
      if (r[e] === t)
        return e;
  }
  return -1;
}
function O0(r, t) {
  var e = r.prototype;
  function i() {
  }
  i.prototype = t.prototype, r.prototype = new i();
  for (var n in e)
    e.hasOwnProperty(n) && (r.prototype[n] = e[n]);
  r.prototype.constructor = r, r.superClass = t;
}
function _e(r, t, e) {
  if (r = "prototype" in r ? r.prototype : r, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
      var a = i[n];
      a !== "constructor" && r[a] == null && (r[a] = t[a]);
    }
  else
    st(r, t);
}
function Wt(r) {
  return !r || typeof r == "string" ? !1 : typeof r.length == "number";
}
function M(r, t, e) {
  if (r && t)
    if (r.forEach && r.forEach === I0)
      r.forEach(t, e);
    else if (r.length === +r.length)
      for (var i = 0, n = r.length; i < n; i++)
        t.call(e, r[i], i, r);
    else
      for (var a in r)
        r.hasOwnProperty(a) && t.call(e, r[a], a, r);
}
function V(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return mf(r);
  if (r.map && r.map === R0)
    return r.map(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    i.push(t.call(e, r[n], n, r));
  return i;
}
function Wi(r, t, e, i) {
  if (r && t) {
    for (var n = 0, a = r.length; n < a; n++)
      e = t.call(i, e, r[n], n, r);
    return e;
  }
}
function bt(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return mf(r);
  if (r.filter && r.filter === P0)
    return r.filter(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    t.call(e, r[n], n, r) && i.push(r[n]);
  return i;
}
function ct(r) {
  if (!r)
    return [];
  if (Object.keys)
    return Object.keys(r);
  var t = [];
  for (var e in r)
    r.hasOwnProperty(e) && t.push(e);
  return t;
}
function B0(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return r.apply(t, e.concat(df.call(arguments)));
  };
}
var Z = ha && X(ha.bind) ? ha.call.bind(ha.bind) : B0;
function lt(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return function() {
    return r.apply(this, t.concat(df.call(arguments)));
  };
}
function N(r) {
  return Array.isArray ? Array.isArray(r) : ia.call(r) === "[object Array]";
}
function X(r) {
  return typeof r == "function";
}
function z(r) {
  return typeof r == "string";
}
function fu(r) {
  return ia.call(r) === "[object String]";
}
function ht(r) {
  return typeof r == "number";
}
function G(r) {
  var t = typeof r;
  return t === "function" || !!r && t === "object";
}
function Mh(r) {
  return !!Ad[ia.call(r)];
}
function Ut(r) {
  return !!Ld[ia.call(r)];
}
function Hn(r) {
  return typeof r == "object" && typeof r.nodeType == "number" && typeof r.ownerDocument == "object";
}
function Jo(r) {
  return r.colorStops != null;
}
function N0(r) {
  return r.image != null;
}
function yo(r) {
  return r !== r;
}
function De() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  for (var e = 0, i = r.length; e < i; e++)
    if (r[e] != null)
      return r[e];
}
function q(r, t) {
  return r ?? t;
}
function ro(r, t, e) {
  return r ?? t ?? e;
}
function mf(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return df.apply(r, t);
}
function Pd(r) {
  if (typeof r == "number")
    return [r, r, r, r];
  var t = r.length;
  return t === 2 ? [r[0], r[1], r[0], r[1]] : t === 3 ? [r[0], r[1], r[2], r[1]] : r;
}
function We(r, t) {
  if (!r)
    throw new Error(t);
}
function Ae(r) {
  return r == null ? null : typeof r.trim == "function" ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var Rd = "__ec_primitive__";
function hu(r) {
  r[Rd] = !0;
}
function Dn(r) {
  return r[Rd];
}
var F0 = (function() {
  function r() {
    this.data = {};
  }
  return r.prototype.delete = function(t) {
    var e = this.has(t);
    return e && delete this.data[t], e;
  }, r.prototype.has = function(t) {
    return this.data.hasOwnProperty(t);
  }, r.prototype.get = function(t) {
    return this.data[t];
  }, r.prototype.set = function(t, e) {
    return this.data[t] = e, this;
  }, r.prototype.keys = function() {
    return ct(this.data);
  }, r.prototype.forEach = function(t) {
    var e = this.data;
    for (var i in e)
      e.hasOwnProperty(i) && t(e[i], i);
  }, r;
})(), Ed = typeof Map == "function";
function z0() {
  return Ed ? /* @__PURE__ */ new Map() : new F0();
}
var V0 = (function() {
  function r(t) {
    var e = N(t);
    this.data = z0();
    var i = this;
    t instanceof r ? t.each(n) : t && M(t, n);
    function n(a, o) {
      e ? i.set(a, o) : i.set(o, a);
    }
  }
  return r.prototype.hasKey = function(t) {
    return this.data.has(t);
  }, r.prototype.get = function(t) {
    return this.data.get(t);
  }, r.prototype.set = function(t, e) {
    return this.data.set(t, e), e;
  }, r.prototype.each = function(t, e) {
    this.data.forEach(function(i, n) {
      t.call(e, i, n);
    });
  }, r.prototype.keys = function() {
    var t = this.data.keys();
    return Ed ? Array.from(t) : t;
  }, r.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, r;
})();
function Y(r) {
  return new V0(r);
}
function H0(r, t) {
  for (var e = new r.constructor(r.length + t.length), i = 0; i < r.length; i++)
    e[i] = r[i];
  for (var n = r.length, i = 0; i < t.length; i++)
    e[i + n] = t[i];
  return e;
}
function jo(r, t) {
  var e;
  if (Object.create)
    e = Object.create(r);
  else {
    var i = function() {
    };
    i.prototype = r, e = new i();
  }
  return t && O(e, t), e;
}
function kd(r) {
  var t = r.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function $r(r, t) {
  return r.hasOwnProperty(t);
}
function Rt() {
}
var G0 = 180 / Math.PI;
function Ui(r, t) {
  return r == null && (r = 0), t == null && (t = 0), [r, t];
}
function W0(r) {
  return [r[0], r[1]];
}
function Dh(r, t, e) {
  return r[0] = t[0] + e[0], r[1] = t[1] + e[1], r;
}
function Od(r, t, e) {
  return r[0] = t[0] - e[0], r[1] = t[1] - e[1], r;
}
function U0(r) {
  return Math.sqrt(Y0(r));
}
function Y0(r) {
  return r[0] * r[0] + r[1] * r[1];
}
function Rs(r, t, e) {
  return r[0] = t[0] * e, r[1] = t[1] * e, r;
}
function _f(r, t) {
  var e = U0(t);
  return e === 0 ? (r[0] = 0, r[1] = 0) : (r[0] = t[0] / e, r[1] = t[1] / e), r;
}
function vu(r, t) {
  return Math.sqrt((r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]));
}
var Z0 = vu;
function X0(r, t) {
  return (r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]);
}
var Li = X0;
function oe(r, t, e) {
  var i = t[0], n = t[1];
  return r[0] = e[0] * i + e[2] * n + e[4], r[1] = e[1] * i + e[3] * n + e[5], r;
}
function Ci(r, t, e) {
  return r[0] = Math.min(t[0], e[0]), r[1] = Math.min(t[1], e[1]), r;
}
function Mi(r, t, e) {
  return r[0] = Math.max(t[0], e[0]), r[1] = Math.max(t[1], e[1]), r;
}
var oi = /* @__PURE__ */ (function() {
  function r(t, e) {
    this.target = t, this.topTarget = e && e.topTarget;
  }
  return r;
})(), $0 = (function() {
  function r(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return r.prototype._dragStart = function(t) {
    for (var e = t.target; e && !e.draggable; )
      e = e.parent || e.__hostTarget;
    e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new oi(e, t), "dragstart", t.event));
  }, r.prototype._drag = function(t) {
    var e = this._draggingTarget;
    if (e) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, e.drift(a, o, t), this.handler.dispatchToElement(new oi(e, t), "drag", t.event);
      var s = this.handler.findHover(i, n, e).target, l = this._dropTarget;
      this._dropTarget = s, e !== s && (l && s !== l && this.handler.dispatchToElement(new oi(l, t), "dragleave", t.event), s && s !== l && this.handler.dispatchToElement(new oi(s, t), "dragenter", t.event));
    }
  }, r.prototype._dragEnd = function(t) {
    var e = this._draggingTarget;
    e && (e.dragging = !1), this.handler.dispatchToElement(new oi(e, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new oi(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, r;
})(), Se = (function() {
  function r(t) {
    t && (this._$eventProcessor = t);
  }
  return r.prototype.on = function(t, e, i, n) {
    this._$handlers || (this._$handlers = {});
    var a = this._$handlers;
    if (typeof e == "function" && (n = i, i = e, e = null), !i || !t)
      return this;
    var o = this._$eventProcessor;
    e != null && o && o.normalizeQuery && (e = o.normalizeQuery(e)), a[t] || (a[t] = []);
    for (var s = 0; s < a[t].length; s++)
      if (a[t][s].h === i)
        return this;
    var l = {
      h: i,
      query: e,
      ctx: n || this,
      callAtLast: i.zrEventfulCallAtLast
    }, u = a[t].length - 1, f = a[t][u];
    return f && f.callAtLast ? a[t].splice(u, 0, l) : a[t].push(l), this;
  }, r.prototype.isSilent = function(t) {
    var e = this._$handlers;
    return !e || !e[t] || !e[t].length;
  }, r.prototype.off = function(t, e) {
    var i = this._$handlers;
    if (!i)
      return this;
    if (!t)
      return this._$handlers = {}, this;
    if (e) {
      if (i[t]) {
        for (var n = [], a = 0, o = i[t].length; a < o; a++)
          i[t][a].h !== e && n.push(i[t][a]);
        i[t] = n;
      }
      i[t] && i[t].length === 0 && delete i[t];
    } else
      delete i[t];
    return this;
  }, r.prototype.trigger = function(t) {
    for (var e = [], i = 1; i < arguments.length; i++)
      e[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = e.length, s = n.length, l = 0; l < s; l++) {
        var u = n[l];
        if (!(a && a.filter && u.query != null && !a.filter(t, u.query)))
          switch (o) {
            case 0:
              u.h.call(u.ctx);
              break;
            case 1:
              u.h.call(u.ctx, e[0]);
              break;
            case 2:
              u.h.call(u.ctx, e[0], e[1]);
              break;
            default:
              u.h.apply(u.ctx, e);
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, r.prototype.triggerWithContext = function(t) {
    for (var e = [], i = 1; i < arguments.length; i++)
      e[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = e.length, s = e[o - 1], l = n.length, u = 0; u < l; u++) {
        var f = n[u];
        if (!(a && a.filter && f.query != null && !a.filter(t, f.query)))
          switch (o) {
            case 0:
              f.h.call(s);
              break;
            case 1:
              f.h.call(s, e[0]);
              break;
            case 2:
              f.h.call(s, e[0], e[1]);
              break;
            default:
              f.h.apply(s, e.slice(1, o - 1));
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, r;
})(), q0 = Math.log(2);
function cu(r, t, e, i, n, a) {
  var o = i + "-" + n, s = r.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var l = Math.round(Math.log((1 << s) - 1 & ~n) / q0);
    return r[e][l];
  }
  for (var u = i | 1 << e, f = e + 1; i & 1 << f; )
    f++;
  for (var h = 0, v = 0, c = 0; v < s; v++) {
    var p = 1 << v;
    p & n || (h += (c % 2 ? -1 : 1) * r[e][v] * cu(r, t - 1, f, u, n | p, a), c++);
  }
  return a[o] = h, h;
}
function Ah(r, t) {
  var e = [
    [r[0], r[1], 1, 0, 0, 0, -t[0] * r[0], -t[0] * r[1]],
    [0, 0, 0, r[0], r[1], 1, -t[1] * r[0], -t[1] * r[1]],
    [r[2], r[3], 1, 0, 0, 0, -t[2] * r[2], -t[2] * r[3]],
    [0, 0, 0, r[2], r[3], 1, -t[3] * r[2], -t[3] * r[3]],
    [r[4], r[5], 1, 0, 0, 0, -t[4] * r[4], -t[4] * r[5]],
    [0, 0, 0, r[4], r[5], 1, -t[5] * r[4], -t[5] * r[5]],
    [r[6], r[7], 1, 0, 0, 0, -t[6] * r[6], -t[6] * r[7]],
    [0, 0, 0, r[6], r[7], 1, -t[7] * r[6], -t[7] * r[7]]
  ], i = {}, n = cu(e, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * cu(e, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(l, u, f) {
      var h = u * a[6] + f * a[7] + 1;
      l[0] = (u * a[0] + f * a[1] + a[2]) / h, l[1] = (u * a[3] + f * a[4] + a[5]) / h;
    };
  }
}
var Lh = "___zrEVENTSAVED", Es = [];
function K0(r, t, e, i, n) {
  return pu(Es, t, i, n, !0) && pu(r, e, Es[0], Es[1]);
}
function pu(r, t, e, i, n) {
  if (t.getBoundingClientRect && U.domSupported && !Bd(t)) {
    var a = t[Lh] || (t[Lh] = {}), o = Q0(t, a), s = J0(o, a, n);
    if (s)
      return s(r, e, i), !0;
  }
  return !1;
}
function Q0(r, t) {
  var e = t.markers;
  if (e)
    return e;
  e = t.markers = [];
  for (var i = ["left", "right"], n = ["top", "bottom"], a = 0; a < 4; a++) {
    var o = document.createElement("div"), s = o.style, l = a % 2, u = (a >> 1) % 2;
    s.cssText = [
      "position: absolute",
      "visibility: hidden",
      "padding: 0",
      "margin: 0",
      "border-width: 0",
      "user-select: none",
      "width:0",
      "height:0",
      i[l] + ":0",
      n[u] + ":0",
      i[1 - l] + ":auto",
      n[1 - u] + ":auto",
      ""
    ].join("!important;"), r.appendChild(o), e.push(o);
  }
  return e;
}
function J0(r, t, e) {
  for (var i = e ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], l = !0, u = 0; u < 4; u++) {
    var f = r[u].getBoundingClientRect(), h = 2 * u, v = f.left, c = f.top;
    o.push(v, c), l = l && a && v === a[h] && c === a[h + 1], s.push(r[u].offsetLeft, r[u].offsetTop);
  }
  return l && n ? n : (t.srcCoords = o, t[i] = e ? Ah(s, o) : Ah(o, s));
}
function Bd(r) {
  return r.nodeName.toUpperCase() === "CANVAS";
}
var j0 = /([&<>"'])/g, t_ = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Ft(r) {
  return r == null ? "" : (r + "").replace(j0, function(t, e) {
    return t_[e];
  });
}
var e_ = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, ks = [], r_ = U.browser.firefox && +U.browser.version.split(".")[0] < 39;
function du(r, t, e, i) {
  return e = e || {}, i ? Ih(r, t, e) : r_ && t.layerX != null && t.layerX !== t.offsetX ? (e.zrX = t.layerX, e.zrY = t.layerY) : t.offsetX != null ? (e.zrX = t.offsetX, e.zrY = t.offsetY) : Ih(r, t, e), e;
}
function Ih(r, t, e) {
  if (U.domSupported && r.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if (Bd(r)) {
      var a = r.getBoundingClientRect();
      e.zrX = i - a.left, e.zrY = n - a.top;
      return;
    } else if (pu(ks, r, i, n)) {
      e.zrX = ks[0], e.zrY = ks[1];
      return;
    }
  }
  e.zrX = e.zrY = 0;
}
function Sf(r) {
  return r || window.event;
}
function jt(r, t, e) {
  if (t = Sf(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && du(r, o, t, e);
  } else {
    du(r, t, t, e);
    var a = i_(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && e_.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function i_(r) {
  var t = r.wheelDelta;
  if (t)
    return t;
  var e = r.deltaX, i = r.deltaY;
  if (e == null || i == null)
    return t;
  var n = Math.abs(i !== 0 ? i : e), a = i > 0 ? -1 : i < 0 ? 1 : e > 0 ? -1 : 1;
  return 3 * n * a;
}
function n_(r, t, e, i) {
  r.addEventListener(t, e, i);
}
function a_(r, t, e, i) {
  r.removeEventListener(t, e, i);
}
var Ni = function(r) {
  r.preventDefault(), r.stopPropagation(), r.cancelBubble = !0;
};
function Ph(r) {
  return r.which === 2 || r.which === 3;
}
var o_ = (function() {
  function r() {
    this._track = [];
  }
  return r.prototype.recognize = function(t, e, i) {
    return this._doTrack(t, e, i), this._recognize(t);
  }, r.prototype.clear = function() {
    return this._track.length = 0, this;
  }, r.prototype._doTrack = function(t, e, i) {
    var n = t.touches;
    if (n) {
      for (var a = {
        points: [],
        touches: [],
        target: e,
        event: t
      }, o = 0, s = n.length; o < s; o++) {
        var l = n[o], u = du(i, l, {});
        a.points.push([u.zrX, u.zrY]), a.touches.push(l);
      }
      this._track.push(a);
    }
  }, r.prototype._recognize = function(t) {
    for (var e in Os)
      if (Os.hasOwnProperty(e)) {
        var i = Os[e](this._track, t);
        if (i)
          return i;
      }
  }, r;
})();
function Rh(r) {
  var t = r[1][0] - r[0][0], e = r[1][1] - r[0][1];
  return Math.sqrt(t * t + e * e);
}
function s_(r) {
  return [
    (r[0][0] + r[1][0]) / 2,
    (r[0][1] + r[1][1]) / 2
  ];
}
var Os = {
  pinch: function(r, t) {
    var e = r.length;
    if (e) {
      var i = (r[e - 1] || {}).points, n = (r[e - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = Rh(i) / Rh(n);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = s_(i);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: r[0].target,
          event: t
        };
      }
    }
  }
};
function Ii() {
  return [1, 0, 0, 1, 0, 0];
}
function wf(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r;
}
function l_(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4], r[5] = t[5], r;
}
function Pi(r, t, e) {
  var i = t[0] * e[0] + t[2] * e[1], n = t[1] * e[0] + t[3] * e[1], a = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], s = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return r[0] = i, r[1] = n, r[2] = a, r[3] = o, r[4] = s, r[5] = l, r;
}
function gu(r, t, e) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4] + e[0], r[5] = t[5] + e[1], r;
}
function bf(r, t, e, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], l = t[3], u = t[5], f = Math.sin(e), h = Math.cos(e);
  return r[0] = n * h + s * f, r[1] = -n * f + s * h, r[2] = a * h + l * f, r[3] = -a * f + h * l, r[4] = h * (o - i[0]) + f * (u - i[1]) + i[0], r[5] = h * (u - i[1]) - f * (o - i[0]) + i[1], r;
}
function u_(r, t, e) {
  var i = e[0], n = e[1];
  return r[0] = t[0] * i, r[1] = t[1] * n, r[2] = t[2] * i, r[3] = t[3] * n, r[4] = t[4] * i, r[5] = t[5] * n, r;
}
function xf(r, t) {
  var e = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], l = e * o - a * i;
  return l ? (l = 1 / l, r[0] = o * l, r[1] = -a * l, r[2] = -i * l, r[3] = e * l, r[4] = (i * s - o * n) * l, r[5] = (a * n - e * s) * l, r) : null;
}
var ft = (function() {
  function r(t, e) {
    this.x = t || 0, this.y = e || 0;
  }
  return r.prototype.copy = function(t) {
    return this.x = t.x, this.y = t.y, this;
  }, r.prototype.clone = function() {
    return new r(this.x, this.y);
  }, r.prototype.set = function(t, e) {
    return this.x = t, this.y = e, this;
  }, r.prototype.equal = function(t) {
    return t.x === this.x && t.y === this.y;
  }, r.prototype.add = function(t) {
    return this.x += t.x, this.y += t.y, this;
  }, r.prototype.scale = function(t) {
    this.x *= t, this.y *= t;
  }, r.prototype.scaleAndAdd = function(t, e) {
    this.x += t.x * e, this.y += t.y * e;
  }, r.prototype.sub = function(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }, r.prototype.dot = function(t) {
    return this.x * t.x + this.y * t.y;
  }, r.prototype.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }, r.prototype.lenSquare = function() {
    return this.x * this.x + this.y * this.y;
  }, r.prototype.normalize = function() {
    var t = this.len();
    return this.x /= t, this.y /= t, this;
  }, r.prototype.distance = function(t) {
    var e = this.x - t.x, i = this.y - t.y;
    return Math.sqrt(e * e + i * i);
  }, r.prototype.distanceSquare = function(t) {
    var e = this.x - t.x, i = this.y - t.y;
    return e * e + i * i;
  }, r.prototype.negate = function() {
    return this.x = -this.x, this.y = -this.y, this;
  }, r.prototype.transform = function(t) {
    if (t) {
      var e = this.x, i = this.y;
      return this.x = t[0] * e + t[2] * i + t[4], this.y = t[1] * e + t[3] * i + t[5], this;
    }
  }, r.prototype.toArray = function(t) {
    return t[0] = this.x, t[1] = this.y, t;
  }, r.prototype.fromArray = function(t) {
    this.x = t[0], this.y = t[1];
  }, r.set = function(t, e, i) {
    t.x = e, t.y = i;
  }, r.copy = function(t, e) {
    t.x = e.x, t.y = e.y;
  }, r.len = function(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
  }, r.lenSquare = function(t) {
    return t.x * t.x + t.y * t.y;
  }, r.dot = function(t, e) {
    return t.x * e.x + t.y * e.y;
  }, r.add = function(t, e, i) {
    t.x = e.x + i.x, t.y = e.y + i.y;
  }, r.sub = function(t, e, i) {
    t.x = e.x - i.x, t.y = e.y - i.y;
  }, r.scale = function(t, e, i) {
    t.x = e.x * i, t.y = e.y * i;
  }, r.scaleAndAdd = function(t, e, i, n) {
    t.x = e.x + i.x * n, t.y = e.y + i.y * n;
  }, r.lerp = function(t, e, i, n) {
    var a = 1 - n;
    t.x = a * e.x + n * i.x, t.y = a * e.y + n * i.y;
  }, r;
})(), va = Math.min, ca = Math.max, yr = new ft(), mr = new ft(), _r = new ft(), Sr = new ft(), Qi = new ft(), Ji = new ft(), it = (function() {
  function r(t, e, i, n) {
    i < 0 && (t = t + i, i = -i), n < 0 && (e = e + n, n = -n), this.x = t, this.y = e, this.width = i, this.height = n;
  }
  return r.prototype.union = function(t) {
    var e = va(t.x, this.x), i = va(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = ca(t.x + t.width, this.x + this.width) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = ca(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = e, this.y = i;
  }, r.prototype.applyTransform = function(t) {
    r.applyTransform(this, this, t);
  }, r.prototype.calculateTransform = function(t) {
    var e = this, i = t.width / e.width, n = t.height / e.height, a = Ii();
    return gu(a, a, [-e.x, -e.y]), u_(a, a, [i, n]), gu(a, a, [t.x, t.y]), a;
  }, r.prototype.intersect = function(t, e) {
    if (!t)
      return !1;
    t instanceof r || (t = r.create(t));
    var i = this, n = i.x, a = i.x + i.width, o = i.y, s = i.y + i.height, l = t.x, u = t.x + t.width, f = t.y, h = t.y + t.height, v = !(a < l || u < n || s < f || h < o);
    if (e) {
      var c = 1 / 0, p = 0, d = Math.abs(a - l), g = Math.abs(u - n), y = Math.abs(s - f), m = Math.abs(h - o), _ = Math.min(d, g), S = Math.min(y, m);
      a < l || u < n ? _ > p && (p = _, d < g ? ft.set(Ji, -d, 0) : ft.set(Ji, g, 0)) : _ < c && (c = _, d < g ? ft.set(Qi, d, 0) : ft.set(Qi, -g, 0)), s < f || h < o ? S > p && (p = S, y < m ? ft.set(Ji, 0, -y) : ft.set(Ji, 0, m)) : _ < c && (c = _, y < m ? ft.set(Qi, 0, y) : ft.set(Qi, 0, -m));
    }
    return e && ft.copy(e, v ? Qi : Ji), v;
  }, r.prototype.contain = function(t, e) {
    var i = this;
    return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height;
  }, r.prototype.clone = function() {
    return new r(this.x, this.y, this.width, this.height);
  }, r.prototype.copy = function(t) {
    r.copy(this, t);
  }, r.prototype.plain = function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }, r.prototype.isFinite = function() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  }, r.prototype.isZero = function() {
    return this.width === 0 || this.height === 0;
  }, r.create = function(t) {
    return new r(t.x, t.y, t.width, t.height);
  }, r.copy = function(t, e) {
    t.x = e.x, t.y = e.y, t.width = e.width, t.height = e.height;
  }, r.applyTransform = function(t, e, i) {
    if (!i) {
      t !== e && r.copy(t, e);
      return;
    }
    if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
      var n = i[0], a = i[3], o = i[4], s = i[5];
      t.x = e.x * n + o, t.y = e.y * a + s, t.width = e.width * n, t.height = e.height * a, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    yr.x = _r.x = e.x, yr.y = Sr.y = e.y, mr.x = Sr.x = e.x + e.width, mr.y = _r.y = e.y + e.height, yr.transform(i), Sr.transform(i), mr.transform(i), _r.transform(i), t.x = va(yr.x, mr.x, _r.x, Sr.x), t.y = va(yr.y, mr.y, _r.y, Sr.y);
    var l = ca(yr.x, mr.x, _r.x, Sr.x), u = ca(yr.y, mr.y, _r.y, Sr.y);
    t.width = l - t.x, t.height = u - t.y;
  }, r;
})(), Nd = "silent";
function f_(r, t, e) {
  return {
    type: r,
    event: e,
    target: t.target,
    topTarget: t.topTarget,
    cancelBubble: !1,
    offsetX: e.zrX,
    offsetY: e.zrY,
    gestureEvent: e.gestureEvent,
    pinchX: e.pinchX,
    pinchY: e.pinchY,
    pinchScale: e.pinchScale,
    wheelDelta: e.zrDelta,
    zrByTouch: e.zrByTouch,
    which: e.which,
    stop: h_
  };
}
function h_() {
  Ni(this.event);
}
var v_ = (function(r) {
  k(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.handler = null, e;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
})(Se), ji = /* @__PURE__ */ (function() {
  function r(t, e) {
    this.x = t, this.y = e;
  }
  return r;
})(), c_ = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], Bs = new it(0, 0, 0, 0), Fd = (function(r) {
  k(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this) || this;
    return s._hovered = new ji(0, 0), s.storage = e, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new v_(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new $0(s), s;
  }
  return t.prototype.setHandlerProxy = function(e) {
    this.proxy && this.proxy.dispose(), e && (M(c_, function(i) {
      e.on && e.on(i, this[i], this);
    }, this), e.handler = this), this.proxy = e;
  }, t.prototype.mousemove = function(e) {
    var i = e.zrX, n = e.zrY, a = zd(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var l = this._hovered = a ? new ji(i, n) : this.findHover(i, n), u = l.target, f = this.proxy;
    f.setCursor && f.setCursor(u ? u.cursor : "default"), s && u !== s && this.dispatchToElement(o, "mouseout", e), this.dispatchToElement(l, "mousemove", e), u && u !== s && this.dispatchToElement(l, "mouseover", e);
  }, t.prototype.mouseout = function(e) {
    var i = e.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", e), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: e });
  }, t.prototype.resize = function() {
    this._hovered = new ji(0, 0);
  }, t.prototype.dispatch = function(e, i) {
    var n = this[e];
    n && n.call(this, i);
  }, t.prototype.dispose = function() {
    this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
  }, t.prototype.setCursorStyle = function(e) {
    var i = this.proxy;
    i.setCursor && i.setCursor(e);
  }, t.prototype.dispatchToElement = function(e, i, n) {
    e = e || {};
    var a = e.target;
    if (!(a && a.silent)) {
      for (var o = "on" + i, s = f_(i, e, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(l) {
        typeof l[o] == "function" && l[o].call(l, s), l.trigger && l.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(e, i, n) {
    var a = this.storage.getDisplayList(), o = new ji(e, i);
    if (Eh(a, o, e, i, n), this._pointerSize && !o.target) {
      for (var s = [], l = this._pointerSize, u = l / 2, f = new it(e - u, i - u, l, l), h = a.length - 1; h >= 0; h--) {
        var v = a[h];
        v !== n && !v.ignore && !v.ignoreCoarsePointer && (!v.parent || !v.parent.ignoreCoarsePointer) && (Bs.copy(v.getBoundingRect()), v.transform && Bs.applyTransform(v.transform), Bs.intersect(f) && s.push(v));
      }
      if (s.length)
        for (var c = 4, p = Math.PI / 12, d = Math.PI * 2, g = 0; g < u; g += c)
          for (var y = 0; y < d; y += p) {
            var m = e + g * Math.cos(y), _ = i + g * Math.sin(y);
            if (Eh(s, o, m, _, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(e, i) {
    this._gestureMgr || (this._gestureMgr = new o_());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(e, this.findHover(e.zrX, e.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      e.gestureEvent = o;
      var s = new ji();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
})(Se);
M(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(r) {
  Fd.prototype[r] = function(t) {
    var e = t.zrX, i = t.zrY, n = zd(this, e, i), a, o;
    if ((r !== "mouseup" || !n) && (a = this.findHover(e, i), o = a.target), r === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (r === "mouseup")
      this._upEl = o;
    else if (r === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || Z0(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, r, t);
  };
});
function p_(r, t, e) {
  if (r[r.rectHover ? "rectContain" : "contain"](t, e)) {
    for (var i = r, n = void 0, a = !1; i; ) {
      if (i.ignoreClip && (a = !0), !a) {
        var o = i.getClipPath();
        if (o && !o.contain(t, e))
          return !1;
      }
      i.silent && (n = !0);
      var s = i.__hostTarget;
      i = s || i.parent;
    }
    return n ? Nd : !0;
  }
  return !1;
}
function Eh(r, t, e, i, n) {
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a], s = void 0;
    if (o !== n && !o.ignore && (s = p_(o, e, i)) && (!t.topTarget && (t.topTarget = o), s !== Nd)) {
      t.target = o;
      break;
    }
  }
}
function zd(r, t, e) {
  var i = r.painter;
  return t < 0 || t > i.getWidth() || e < 0 || e > i.getHeight();
}
var Vd = 32, tn = 7;
function d_(r) {
  for (var t = 0; r >= Vd; )
    t |= r & 1, r >>= 1;
  return r + t;
}
function kh(r, t, e, i) {
  var n = t + 1;
  if (n === e)
    return 1;
  if (i(r[n++], r[t]) < 0) {
    for (; n < e && i(r[n], r[n - 1]) < 0; )
      n++;
    g_(r, t, n);
  } else
    for (; n < e && i(r[n], r[n - 1]) >= 0; )
      n++;
  return n - t;
}
function g_(r, t, e) {
  for (e--; t < e; ) {
    var i = r[t];
    r[t++] = r[e], r[e--] = i;
  }
}
function Oh(r, t, e, i, n) {
  for (i === t && i++; i < e; i++) {
    for (var a = r[i], o = t, s = i, l; o < s; )
      l = o + s >>> 1, n(a, r[l]) < 0 ? s = l : o = l + 1;
    var u = i - o;
    switch (u) {
      case 3:
        r[o + 3] = r[o + 2];
      case 2:
        r[o + 2] = r[o + 1];
      case 1:
        r[o + 1] = r[o];
        break;
      default:
        for (; u > 0; )
          r[o + u] = r[o + u - 1], u--;
    }
    r[o] = a;
  }
}
function Ns(r, t, e, i, n, a) {
  var o = 0, s = 0, l = 1;
  if (a(r, t[e + n]) > 0) {
    for (s = i - n; l < s && a(r, t[e + n + l]) > 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += n, l += n;
  } else {
    for (s = n + 1; l < s && a(r, t[e + n - l]) <= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = n - l, l = n - u;
  }
  for (o++; o < l; ) {
    var f = o + (l - o >>> 1);
    a(r, t[e + f]) > 0 ? o = f + 1 : l = f;
  }
  return l;
}
function Fs(r, t, e, i, n, a) {
  var o = 0, s = 0, l = 1;
  if (a(r, t[e + n]) < 0) {
    for (s = n + 1; l < s && a(r, t[e + n - l]) < 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s);
    var u = o;
    o = n - l, l = n - u;
  } else {
    for (s = i - n; l < s && a(r, t[e + n + l]) >= 0; )
      o = l, l = (l << 1) + 1, l <= 0 && (l = s);
    l > s && (l = s), o += n, l += n;
  }
  for (o++; o < l; ) {
    var f = o + (l - o >>> 1);
    a(r, t[e + f]) < 0 ? l = f : o = f + 1;
  }
  return l;
}
function y_(r, t) {
  var e = tn, i, n, a = 0, o = [];
  i = [], n = [];
  function s(c, p) {
    i[a] = c, n[a] = p, a += 1;
  }
  function l() {
    for (; a > 1; ) {
      var c = a - 2;
      if (c >= 1 && n[c - 1] <= n[c] + n[c + 1] || c >= 2 && n[c - 2] <= n[c] + n[c - 1])
        n[c - 1] < n[c + 1] && c--;
      else if (n[c] > n[c + 1])
        break;
      f(c);
    }
  }
  function u() {
    for (; a > 1; ) {
      var c = a - 2;
      c > 0 && n[c - 1] < n[c + 1] && c--, f(c);
    }
  }
  function f(c) {
    var p = i[c], d = n[c], g = i[c + 1], y = n[c + 1];
    n[c] = d + y, c === a - 3 && (i[c + 1] = i[c + 2], n[c + 1] = n[c + 2]), a--;
    var m = Fs(r[g], r, p, d, 0, t);
    p += m, d -= m, d !== 0 && (y = Ns(r[p + d - 1], r, g, y, y - 1, t), y !== 0 && (d <= y ? h(p, d, g, y) : v(p, d, g, y)));
  }
  function h(c, p, d, g) {
    var y = 0;
    for (y = 0; y < p; y++)
      o[y] = r[c + y];
    var m = 0, _ = d, S = c;
    if (r[S++] = r[_++], --g === 0) {
      for (y = 0; y < p; y++)
        r[S + y] = o[m + y];
      return;
    }
    if (p === 1) {
      for (y = 0; y < g; y++)
        r[S + y] = r[_ + y];
      r[S + g] = o[m];
      return;
    }
    for (var b = e, w, x, C; ; ) {
      w = 0, x = 0, C = !1;
      do
        if (t(r[_], o[m]) < 0) {
          if (r[S++] = r[_++], x++, w = 0, --g === 0) {
            C = !0;
            break;
          }
        } else if (r[S++] = o[m++], w++, x = 0, --p === 1) {
          C = !0;
          break;
        }
      while ((w | x) < b);
      if (C)
        break;
      do {
        if (w = Fs(r[_], o, m, p, 0, t), w !== 0) {
          for (y = 0; y < w; y++)
            r[S + y] = o[m + y];
          if (S += w, m += w, p -= w, p <= 1) {
            C = !0;
            break;
          }
        }
        if (r[S++] = r[_++], --g === 0) {
          C = !0;
          break;
        }
        if (x = Ns(o[m], r, _, g, 0, t), x !== 0) {
          for (y = 0; y < x; y++)
            r[S + y] = r[_ + y];
          if (S += x, _ += x, g -= x, g === 0) {
            C = !0;
            break;
          }
        }
        if (r[S++] = o[m++], --p === 1) {
          C = !0;
          break;
        }
        b--;
      } while (w >= tn || x >= tn);
      if (C)
        break;
      b < 0 && (b = 0), b += 2;
    }
    if (e = b, e < 1 && (e = 1), p === 1) {
      for (y = 0; y < g; y++)
        r[S + y] = r[_ + y];
      r[S + g] = o[m];
    } else {
      if (p === 0)
        throw new Error();
      for (y = 0; y < p; y++)
        r[S + y] = o[m + y];
    }
  }
  function v(c, p, d, g) {
    var y = 0;
    for (y = 0; y < g; y++)
      o[y] = r[d + y];
    var m = c + p - 1, _ = g - 1, S = d + g - 1, b = 0, w = 0;
    if (r[S--] = r[m--], --p === 0) {
      for (b = S - (g - 1), y = 0; y < g; y++)
        r[b + y] = o[y];
      return;
    }
    if (g === 1) {
      for (S -= p, m -= p, w = S + 1, b = m + 1, y = p - 1; y >= 0; y--)
        r[w + y] = r[b + y];
      r[S] = o[_];
      return;
    }
    for (var x = e; ; ) {
      var C = 0, D = 0, A = !1;
      do
        if (t(o[_], r[m]) < 0) {
          if (r[S--] = r[m--], C++, D = 0, --p === 0) {
            A = !0;
            break;
          }
        } else if (r[S--] = o[_--], D++, C = 0, --g === 1) {
          A = !0;
          break;
        }
      while ((C | D) < x);
      if (A)
        break;
      do {
        if (C = p - Fs(o[_], r, c, p, p - 1, t), C !== 0) {
          for (S -= C, m -= C, p -= C, w = S + 1, b = m + 1, y = C - 1; y >= 0; y--)
            r[w + y] = r[b + y];
          if (p === 0) {
            A = !0;
            break;
          }
        }
        if (r[S--] = o[_--], --g === 1) {
          A = !0;
          break;
        }
        if (D = g - Ns(r[m], o, 0, g, g - 1, t), D !== 0) {
          for (S -= D, _ -= D, g -= D, w = S + 1, b = _ + 1, y = 0; y < D; y++)
            r[w + y] = o[b + y];
          if (g <= 1) {
            A = !0;
            break;
          }
        }
        if (r[S--] = r[m--], --p === 0) {
          A = !0;
          break;
        }
        x--;
      } while (C >= tn || D >= tn);
      if (A)
        break;
      x < 0 && (x = 0), x += 2;
    }
    if (e = x, e < 1 && (e = 1), g === 1) {
      for (S -= p, m -= p, w = S + 1, b = m + 1, y = p - 1; y >= 0; y--)
        r[w + y] = r[b + y];
      r[S] = o[_];
    } else {
      if (g === 0)
        throw new Error();
      for (b = S - (g - 1), y = 0; y < g; y++)
        r[b + y] = o[y];
    }
  }
  return {
    mergeRuns: l,
    forceMergeRuns: u,
    pushRun: s
  };
}
function io(r, t, e, i) {
  e || (e = 0), i || (i = r.length);
  var n = i - e;
  if (!(n < 2)) {
    var a = 0;
    if (n < Vd) {
      a = kh(r, e, i, t), Oh(r, e, i, e + a, t);
      return;
    }
    var o = y_(r, t), s = d_(n);
    do {
      if (a = kh(r, e, i, t), a < s) {
        var l = n;
        l > s && (l = s), Oh(r, e, e + l, e + a, t), a = l;
      }
      o.pushRun(e, a), o.mergeRuns(), n -= a, e += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var $t = 1, Sn = 2, bi = 4, Bh = !1;
function zs() {
  Bh || (Bh = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function Nh(r, t) {
  return r.zlevel === t.zlevel ? r.z === t.z ? r.z2 - t.z2 : r.z - t.z : r.zlevel - t.zlevel;
}
var m_ = (function() {
  function r() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = Nh;
  }
  return r.prototype.traverse = function(t, e) {
    for (var i = 0; i < this._roots.length; i++)
      this._roots[i].traverse(t, e);
  }, r.prototype.getDisplayList = function(t, e) {
    e = e || !1;
    var i = this._displayList;
    return (t || !i.length) && this.updateDisplayList(e), i;
  }, r.prototype.updateDisplayList = function(t) {
    this._displayListLen = 0;
    for (var e = this._roots, i = this._displayList, n = 0, a = e.length; n < a; n++)
      this._updateAndAddDisplayable(e[n], null, t);
    i.length = this._displayListLen, io(i, Nh);
  }, r.prototype._updateAndAddDisplayable = function(t, e, i) {
    if (!(t.ignore && !i)) {
      t.beforeUpdate(), t.update(), t.afterUpdate();
      var n = t.getClipPath();
      if (t.ignoreClip)
        e = null;
      else if (n) {
        e ? e = e.slice() : e = [];
        for (var a = n, o = t; a; )
          a.parent = o, a.updateTransform(), e.push(a), o = a, a = a.getClipPath();
      }
      if (t.childrenRef) {
        for (var s = t.childrenRef(), l = 0; l < s.length; l++) {
          var u = s[l];
          t.__dirty && (u.__dirty |= $t), this._updateAndAddDisplayable(u, e, i);
        }
        t.__dirty = 0;
      } else {
        var f = t;
        e && e.length ? f.__clipPaths = e : f.__clipPaths && f.__clipPaths.length > 0 && (f.__clipPaths = []), isNaN(f.z) && (zs(), f.z = 0), isNaN(f.z2) && (zs(), f.z2 = 0), isNaN(f.zlevel) && (zs(), f.zlevel = 0), this._displayList[this._displayListLen++] = f;
      }
      var h = t.getDecalElement && t.getDecalElement();
      h && this._updateAndAddDisplayable(h, e, i);
      var v = t.getTextGuideLine();
      v && this._updateAndAddDisplayable(v, e, i);
      var c = t.getTextContent();
      c && this._updateAndAddDisplayable(c, e, i);
    }
  }, r.prototype.addRoot = function(t) {
    t.__zr && t.__zr.storage === this || this._roots.push(t);
  }, r.prototype.delRoot = function(t) {
    if (t instanceof Array) {
      for (var e = 0, i = t.length; e < i; e++)
        this.delRoot(t[e]);
      return;
    }
    var n = rt(this._roots, t);
    n >= 0 && this._roots.splice(n, 1);
  }, r.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, r.prototype.getRoots = function() {
    return this._roots;
  }, r.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, r;
})(), mo;
mo = U.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(r) {
  return setTimeout(r, 16);
};
var An = {
  linear: function(r) {
    return r;
  },
  quadraticIn: function(r) {
    return r * r;
  },
  quadraticOut: function(r) {
    return r * (2 - r);
  },
  quadraticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r : -0.5 * (--r * (r - 2) - 1);
  },
  cubicIn: function(r) {
    return r * r * r;
  },
  cubicOut: function(r) {
    return --r * r * r + 1;
  },
  cubicInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r : 0.5 * ((r -= 2) * r * r + 2);
  },
  quarticIn: function(r) {
    return r * r * r * r;
  },
  quarticOut: function(r) {
    return 1 - --r * r * r * r;
  },
  quarticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r * r : -0.5 * ((r -= 2) * r * r * r - 2);
  },
  quinticIn: function(r) {
    return r * r * r * r * r;
  },
  quinticOut: function(r) {
    return --r * r * r * r * r + 1;
  },
  quinticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r * r * r : 0.5 * ((r -= 2) * r * r * r * r + 2);
  },
  sinusoidalIn: function(r) {
    return 1 - Math.cos(r * Math.PI / 2);
  },
  sinusoidalOut: function(r) {
    return Math.sin(r * Math.PI / 2);
  },
  sinusoidalInOut: function(r) {
    return 0.5 * (1 - Math.cos(Math.PI * r));
  },
  exponentialIn: function(r) {
    return r === 0 ? 0 : Math.pow(1024, r - 1);
  },
  exponentialOut: function(r) {
    return r === 1 ? 1 : 1 - Math.pow(2, -10 * r);
  },
  exponentialInOut: function(r) {
    return r === 0 ? 0 : r === 1 ? 1 : (r *= 2) < 1 ? 0.5 * Math.pow(1024, r - 1) : 0.5 * (-Math.pow(2, -10 * (r - 1)) + 2);
  },
  circularIn: function(r) {
    return 1 - Math.sqrt(1 - r * r);
  },
  circularOut: function(r) {
    return Math.sqrt(1 - --r * r);
  },
  circularInOut: function(r) {
    return (r *= 2) < 1 ? -0.5 * (Math.sqrt(1 - r * r) - 1) : 0.5 * (Math.sqrt(1 - (r -= 2) * r) + 1);
  },
  elasticIn: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), -(e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i)));
  },
  elasticOut: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), e * Math.pow(2, -10 * r) * Math.sin((r - t) * (2 * Math.PI) / i) + 1);
  },
  elasticInOut: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), (r *= 2) < 1 ? -0.5 * (e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i)) : e * Math.pow(2, -10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i) * 0.5 + 1);
  },
  backIn: function(r) {
    var t = 1.70158;
    return r * r * ((t + 1) * r - t);
  },
  backOut: function(r) {
    var t = 1.70158;
    return --r * r * ((t + 1) * r + t) + 1;
  },
  backInOut: function(r) {
    var t = 2.5949095;
    return (r *= 2) < 1 ? 0.5 * (r * r * ((t + 1) * r - t)) : 0.5 * ((r -= 2) * r * ((t + 1) * r + t) + 2);
  },
  bounceIn: function(r) {
    return 1 - An.bounceOut(1 - r);
  },
  bounceOut: function(r) {
    return r < 1 / 2.75 ? 7.5625 * r * r : r < 2 / 2.75 ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75 : r < 2.5 / 2.75 ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375 : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375;
  },
  bounceInOut: function(r) {
    return r < 0.5 ? An.bounceIn(r * 2) * 0.5 : An.bounceOut(r * 2 - 1) * 0.5 + 0.5;
  }
}, pa = Math.pow, lr = Math.sqrt, _o = 1e-8, Hd = 1e-4, Fh = lr(3), da = 1 / 3, Me = Ui(), re = Ui(), Ri = Ui();
function ar(r) {
  return r > -_o && r < _o;
}
function Gd(r) {
  return r > _o || r < -_o;
}
function Tt(r, t, e, i, n) {
  var a = 1 - n;
  return a * a * (a * r + 3 * n * t) + n * n * (n * i + 3 * a * e);
}
function zh(r, t, e, i, n) {
  var a = 1 - n;
  return 3 * (((t - r) * a + 2 * (e - t) * n) * a + (i - e) * n * n);
}
function So(r, t, e, i, n, a) {
  var o = i + 3 * (t - e) - r, s = 3 * (e - t * 2 + r), l = 3 * (t - r), u = r - n, f = s * s - 3 * o * l, h = s * l - 9 * o * u, v = l * l - 3 * s * u, c = 0;
  if (ar(f) && ar(h))
    if (ar(s))
      a[0] = 0;
    else {
      var p = -l / s;
      p >= 0 && p <= 1 && (a[c++] = p);
    }
  else {
    var d = h * h - 4 * f * v;
    if (ar(d)) {
      var g = h / f, p = -s / o + g, y = -g / 2;
      p >= 0 && p <= 1 && (a[c++] = p), y >= 0 && y <= 1 && (a[c++] = y);
    } else if (d > 0) {
      var m = lr(d), _ = f * s + 1.5 * o * (-h + m), S = f * s + 1.5 * o * (-h - m);
      _ < 0 ? _ = -pa(-_, da) : _ = pa(_, da), S < 0 ? S = -pa(-S, da) : S = pa(S, da);
      var p = (-s - (_ + S)) / (3 * o);
      p >= 0 && p <= 1 && (a[c++] = p);
    } else {
      var b = (2 * f * s - 3 * o * h) / (2 * lr(f * f * f)), w = Math.acos(b) / 3, x = lr(f), C = Math.cos(w), p = (-s - 2 * x * C) / (3 * o), y = (-s + x * (C + Fh * Math.sin(w))) / (3 * o), D = (-s + x * (C - Fh * Math.sin(w))) / (3 * o);
      p >= 0 && p <= 1 && (a[c++] = p), y >= 0 && y <= 1 && (a[c++] = y), D >= 0 && D <= 1 && (a[c++] = D);
    }
  }
  return c;
}
function Wd(r, t, e, i, n) {
  var a = 6 * e - 12 * t + 6 * r, o = 9 * t + 3 * i - 3 * r - 9 * e, s = 3 * t - 3 * r, l = 0;
  if (ar(o)) {
    if (Gd(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var f = a * a - 4 * o * s;
    if (ar(f))
      n[0] = -a / (2 * o);
    else if (f > 0) {
      var h = lr(f), u = (-a + h) / (2 * o), v = (-a - h) / (2 * o);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function wo(r, t, e, i, n, a) {
  var o = (t - r) * n + r, s = (e - t) * n + t, l = (i - e) * n + e, u = (s - o) * n + o, f = (l - s) * n + s, h = (f - u) * n + u;
  a[0] = r, a[1] = o, a[2] = u, a[3] = h, a[4] = h, a[5] = f, a[6] = l, a[7] = i;
}
function __(r, t, e, i, n, a, o, s, l, u, f) {
  var h, v = 5e-3, c = 1 / 0, p, d, g, y;
  Me[0] = l, Me[1] = u;
  for (var m = 0; m < 1; m += 0.05)
    re[0] = Tt(r, e, n, o, m), re[1] = Tt(t, i, a, s, m), g = Li(Me, re), g < c && (h = m, c = g);
  c = 1 / 0;
  for (var _ = 0; _ < 32 && !(v < Hd); _++)
    p = h - v, d = h + v, re[0] = Tt(r, e, n, o, p), re[1] = Tt(t, i, a, s, p), g = Li(re, Me), p >= 0 && g < c ? (h = p, c = g) : (Ri[0] = Tt(r, e, n, o, d), Ri[1] = Tt(t, i, a, s, d), y = Li(Ri, Me), d <= 1 && y < c ? (h = d, c = y) : v *= 0.5);
  return lr(c);
}
function S_(r, t, e, i, n, a, o, s, l) {
  for (var u = r, f = t, h = 0, v = 1 / l, c = 1; c <= l; c++) {
    var p = c * v, d = Tt(r, e, n, o, p), g = Tt(t, i, a, s, p), y = d - u, m = g - f;
    h += Math.sqrt(y * y + m * m), u = d, f = g;
  }
  return h;
}
function zt(r, t, e, i) {
  var n = 1 - i;
  return n * (n * r + 2 * i * t) + i * i * e;
}
function Vh(r, t, e, i) {
  return 2 * ((1 - i) * (t - r) + i * (e - t));
}
function w_(r, t, e, i, n) {
  var a = r - 2 * t + e, o = 2 * (t - r), s = r - i, l = 0;
  if (ar(a)) {
    if (Gd(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (n[l++] = u);
    }
  } else {
    var f = o * o - 4 * a * s;
    if (ar(f)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u);
    } else if (f > 0) {
      var h = lr(f), u = (-o + h) / (2 * a), v = (-o - h) / (2 * a);
      u >= 0 && u <= 1 && (n[l++] = u), v >= 0 && v <= 1 && (n[l++] = v);
    }
  }
  return l;
}
function Ud(r, t, e) {
  var i = r + e - 2 * t;
  return i === 0 ? 0.5 : (r - t) / i;
}
function bo(r, t, e, i, n) {
  var a = (t - r) * i + r, o = (e - t) * i + t, s = (o - a) * i + a;
  n[0] = r, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = e;
}
function b_(r, t, e, i, n, a, o, s, l) {
  var u, f = 5e-3, h = 1 / 0;
  Me[0] = o, Me[1] = s;
  for (var v = 0; v < 1; v += 0.05) {
    re[0] = zt(r, e, n, v), re[1] = zt(t, i, a, v);
    var c = Li(Me, re);
    c < h && (u = v, h = c);
  }
  h = 1 / 0;
  for (var p = 0; p < 32 && !(f < Hd); p++) {
    var d = u - f, g = u + f;
    re[0] = zt(r, e, n, d), re[1] = zt(t, i, a, d);
    var c = Li(re, Me);
    if (d >= 0 && c < h)
      u = d, h = c;
    else {
      Ri[0] = zt(r, e, n, g), Ri[1] = zt(t, i, a, g);
      var y = Li(Ri, Me);
      g <= 1 && y < h ? (u = g, h = y) : f *= 0.5;
    }
  }
  return lr(h);
}
function x_(r, t, e, i, n, a, o) {
  for (var s = r, l = t, u = 0, f = 1 / o, h = 1; h <= o; h++) {
    var v = h * f, c = zt(r, e, n, v), p = zt(t, i, a, v), d = c - s, g = p - l;
    u += Math.sqrt(d * d + g * g), s = c, l = p;
  }
  return u;
}
var T_ = /cubic-bezier\(([0-9,\.e ]+)\)/;
function Yd(r) {
  var t = r && T_.exec(r);
  if (t) {
    var e = t[1].split(","), i = +Ae(e[0]), n = +Ae(e[1]), a = +Ae(e[2]), o = +Ae(e[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : So(0, i, a, 1, l, s) && Tt(0, n, o, 1, s[0]);
    };
  }
}
var C_ = (function() {
  function r(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Rt, this.ondestroy = t.ondestroy || Rt, this.onrestart = t.onrestart || Rt, t.easing && this.setEasing(t.easing);
  }
  return r.prototype.step = function(t, e) {
    if (this._inited || (this._startTime = t + this._delay, this._inited = !0), this._paused) {
      this._pausedTime += e;
      return;
    }
    var i = this._life, n = t - this._startTime - this._pausedTime, a = n / i;
    a < 0 && (a = 0), a = Math.min(a, 1);
    var o = this.easingFunc, s = o ? o(a) : a;
    if (this.onframe(s), a === 1)
      if (this.loop) {
        var l = n % i;
        this._startTime = t - l, this._pausedTime = 0, this.onrestart();
      } else
        return !0;
    return !1;
  }, r.prototype.pause = function() {
    this._paused = !0;
  }, r.prototype.resume = function() {
    this._paused = !1;
  }, r.prototype.setEasing = function(t) {
    this.easing = t, this.easingFunc = X(t) ? t : An[t] || Yd(t);
  }, r;
})(), Zd = /* @__PURE__ */ (function() {
  function r(t) {
    this.value = t;
  }
  return r;
})(), M_ = (function() {
  function r() {
    this._len = 0;
  }
  return r.prototype.insert = function(t) {
    var e = new Zd(t);
    return this.insertEntry(e), e;
  }, r.prototype.insertEntry = function(t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
  }, r.prototype.remove = function(t) {
    var e = t.prev, i = t.next;
    e ? e.next = i : this.head = i, i ? i.prev = e : this.tail = e, t.next = t.prev = null, this._len--;
  }, r.prototype.len = function() {
    return this._len;
  }, r.prototype.clear = function() {
    this.head = this.tail = null, this._len = 0;
  }, r;
})(), na = (function() {
  function r(t) {
    this._list = new M_(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return r.prototype.put = function(t, e) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l;
      }
      s ? s.value = e : s = new Zd(e), s.key = t, i.insertEntry(s), n[t] = s;
    }
    return a;
  }, r.prototype.get = function(t) {
    var e = this._map[t], i = this._list;
    if (e != null)
      return e !== i.tail && (i.remove(e), i.insertEntry(e)), e.value;
  }, r.prototype.clear = function() {
    this._list.clear(), this._map = {};
  }, r.prototype.len = function() {
    return this._list.len();
  }, r;
})(), Hh = {
  transparent: [0, 0, 0, 0],
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};
function ur(r) {
  return r = Math.round(r), r < 0 ? 0 : r > 255 ? 255 : r;
}
function xo(r) {
  return r < 0 ? 0 : r > 1 ? 1 : r;
}
function Vs(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? ur(parseFloat(t) / 100 * 255) : ur(parseInt(t, 10));
}
function Ln(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? xo(parseFloat(t) / 100) : xo(parseFloat(t));
}
function Hs(r, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? r + (t - r) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? r + (t - r) * (2 / 3 - e) * 6 : r;
}
function ga(r, t, e) {
  return r + (t - r) * e;
}
function Jt(r, t, e, i, n) {
  return r[0] = t, r[1] = e, r[2] = i, r[3] = n, r;
}
function yu(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r;
}
var Xd = new na(20), ya = null;
function si(r, t) {
  ya && yu(ya, t), ya = Xd.put(r, ya || t.slice());
}
function Pe(r, t) {
  if (r) {
    t = t || [];
    var e = Xd.get(r);
    if (e)
      return yu(t, e);
    r = r + "";
    var i = r.replace(/ /g, "").toLowerCase();
    if (i in Hh)
      return yu(t, Hh[i]), si(r, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          Jt(t, 0, 0, 0, 1);
          return;
        }
        return Jt(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), si(r, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          Jt(t, 0, 0, 0, 1);
          return;
        }
        return Jt(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), si(r, t), t;
      }
      return;
    }
    var o = i.indexOf("("), s = i.indexOf(")");
    if (o !== -1 && s + 1 === n) {
      var l = i.substr(0, o), u = i.substr(o + 1, s - (o + 1)).split(","), f = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3 ? Jt(t, +u[0], +u[1], +u[2], 1) : Jt(t, 0, 0, 0, 1);
          f = Ln(u.pop());
        case "rgb":
          if (u.length >= 3)
            return Jt(t, Vs(u[0]), Vs(u[1]), Vs(u[2]), u.length === 3 ? f : Ln(u[3])), si(r, t), t;
          Jt(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            Jt(t, 0, 0, 0, 1);
            return;
          }
          return u[3] = Ln(u[3]), Gh(u, t), si(r, t), t;
        case "hsl":
          if (u.length !== 3) {
            Jt(t, 0, 0, 0, 1);
            return;
          }
          return Gh(u, t), si(r, t), t;
        default:
          return;
      }
    }
    Jt(t, 0, 0, 0, 1);
  }
}
function Gh(r, t) {
  var e = (parseFloat(r[0]) % 360 + 360) % 360 / 360, i = Ln(r[1]), n = Ln(r[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], Jt(t, ur(Hs(o, a, e + 1 / 3) * 255), ur(Hs(o, a, e) * 255), ur(Hs(o, a, e - 1 / 3) * 255), 1), r.length === 4 && (t[3] = r[3]), t;
}
function Wh(r, t) {
  var e = Pe(r);
  if (e) {
    for (var i = 0; i < 3; i++)
      e[i] = e[i] * (1 - t) | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return aa(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function D_(r, t, e) {
  if (!(!(t && t.length) || !(r >= 0 && r <= 1))) {
    var i = r * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = Pe(t[n]), s = Pe(t[a]), l = i - n, u = aa([
      ur(ga(o[0], s[0], l)),
      ur(ga(o[1], s[1], l)),
      ur(ga(o[2], s[2], l)),
      xo(ga(o[3], s[3], l))
    ], "rgba");
    return e ? {
      color: u,
      leftIndex: n,
      rightIndex: a,
      value: i
    } : u;
  }
}
function Uh(r, t) {
  var e = Pe(r);
  if (e && t != null)
    return e[3] = xo(t), aa(e, "rgba");
}
function aa(r, t) {
  if (!(!r || !r.length)) {
    var e = r[0] + "," + r[1] + "," + r[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + r[3]), t + "(" + e + ")";
  }
}
function To(r, t) {
  var e = Pe(r);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
var Yh = new na(100);
function Zh(r) {
  if (z(r)) {
    var t = Yh.get(r);
    return t || (t = Wh(r, -0.1), Yh.put(r, t)), t;
  } else if (Jo(r)) {
    var e = O({}, r);
    return e.colorStops = V(r.colorStops, function(i) {
      return {
        offset: i.offset,
        color: Wh(i.color, -0.1)
      };
    }), e;
  }
  return r;
}
function A_(r) {
  return r.type === "linear";
}
function L_(r) {
  return r.type === "radial";
}
(function() {
  return U.hasGlobalWindow && X(window.btoa) ? function(r) {
    return window.btoa(unescape(encodeURIComponent(r)));
  } : typeof Buffer < "u" ? function(r) {
    return Buffer.from(r).toString("base64");
  } : function(r) {
    return null;
  };
})();
var mu = Array.prototype.slice;
function ze(r, t, e) {
  return (t - r) * e + r;
}
function Gs(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = ze(t[a], e[a], i);
  return r;
}
function I_(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = ze(t[o][s], e[o][s], i);
  }
  return r;
}
function ma(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = t[a] + e[a] * i;
  return r;
}
function Xh(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = t[o][s] + e[o][s] * i;
  }
  return r;
}
function P_(r, t) {
  for (var e = r.length, i = t.length, n = e > i ? t : r, a = Math.min(e, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(e, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function R_(r, t, e) {
  var i = r, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var l = a; l < o; l++)
          i.push(e === 1 ? n[l] : mu.call(n[l]));
    }
    for (var u = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (e === 1)
        isNaN(i[l]) && (i[l] = n[l]);
      else
        for (var f = 0; f < u; f++)
          isNaN(i[l][f]) && (i[l][f] = n[l][f]);
  }
}
function no(r) {
  if (Wt(r)) {
    var t = r.length;
    if (Wt(r[0])) {
      for (var e = [], i = 0; i < t; i++)
        e.push(mu.call(r[i]));
      return e;
    }
    return mu.call(r);
  }
  return r;
}
function ao(r) {
  return r[0] = Math.floor(r[0]) || 0, r[1] = Math.floor(r[1]) || 0, r[2] = Math.floor(r[2]) || 0, r[3] = r[3] == null ? 1 : r[3], "rgba(" + r.join(",") + ")";
}
function E_(r) {
  return Wt(r && r[0]) ? 2 : 1;
}
var _a = 0, oo = 1, $d = 2, wn = 3, _u = 4, Su = 5, $h = 6;
function qh(r) {
  return r === _u || r === Su;
}
function Sa(r) {
  return r === oo || r === $d;
}
var en = [0, 0, 0, 0], k_ = (function() {
  function r(t) {
    this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = t;
  }
  return r.prototype.isFinished = function() {
    return this._finished;
  }, r.prototype.setFinished = function() {
    this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
  }, r.prototype.needsAnimate = function() {
    return this.keyframes.length >= 1;
  }, r.prototype.getAdditiveTrack = function() {
    return this._additiveTrack;
  }, r.prototype.addKeyframe = function(t, e, i) {
    this._needsSort = !0;
    var n = this.keyframes, a = n.length, o = !1, s = $h, l = e;
    if (Wt(e)) {
      var u = E_(e);
      s = u, (u === 1 && !ht(e[0]) || u === 2 && !ht(e[0][0])) && (o = !0);
    } else if (ht(e) && !yo(e))
      s = _a;
    else if (z(e))
      if (!isNaN(+e))
        s = _a;
      else {
        var f = Pe(e);
        f && (l = f, s = wn);
      }
    else if (Jo(e)) {
      var h = O({}, l);
      h.colorStops = V(e.colorStops, function(c) {
        return {
          offset: c.offset,
          color: Pe(c.color)
        };
      }), A_(e) ? s = _u : L_(e) && (s = Su), l = h;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === $h) && (o = !0), this.discrete = this.discrete || o;
    var v = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (v.easing = i, v.easingFunc = X(i) ? i : An[i] || Yd(i)), n.push(v), v;
  }, r.prototype.prepare = function(t, e) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(d, g) {
      return d.time - g.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, l = Sa(n), u = qh(n), f = 0; f < a; f++) {
      var h = i[f], v = h.value, c = o.value;
      h.percent = h.time / t, s || (l && f !== a - 1 ? R_(v, c, n) : u && P_(v.colorStops, c.colorStops));
    }
    if (!s && n !== Su && e && this.needsAnimate() && e.needsAnimate() && n === e.valType && !e._finished) {
      this._additiveTrack = e;
      for (var p = i[0].value, f = 0; f < a; f++)
        n === _a ? i[f].additiveValue = i[f].value - p : n === wn ? i[f].additiveValue = ma([], i[f].value, p, -1) : Sa(n) && (i[f].additiveValue = n === oo ? ma([], i[f].value, p, -1) : Xh([], i[f].value, p, -1));
    }
  }, r.prototype.step = function(t, e) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, l = this.propName, u = a === wn, f, h = this._lastFr, v = Math.min, c, p;
      if (s === 1)
        c = p = o[0];
      else {
        if (e < 0)
          f = 0;
        else if (e < this._lastFrP) {
          var d = v(h + 1, s - 1);
          for (f = d; f >= 0 && !(o[f].percent <= e); f--)
            ;
          f = v(f, s - 2);
        } else {
          for (f = h; f < s && !(o[f].percent > e); f++)
            ;
          f = v(f - 1, s - 2);
        }
        p = o[f + 1], c = o[f];
      }
      if (c && p) {
        this._lastFr = f, this._lastFrP = e;
        var g = p.percent - c.percent, y = g === 0 ? 1 : v((e - c.percent) / g, 1);
        p.easingFunc && (y = p.easingFunc(y));
        var m = i ? this._additiveValue : u ? en : t[l];
        if ((Sa(a) || u) && !m && (m = this._additiveValue = []), this.discrete)
          t[l] = y < 1 ? c.rawValue : p.rawValue;
        else if (Sa(a))
          a === oo ? Gs(m, c[n], p[n], y) : I_(m, c[n], p[n], y);
        else if (qh(a)) {
          var _ = c[n], S = p[n], b = a === _u;
          t[l] = {
            type: b ? "linear" : "radial",
            x: ze(_.x, S.x, y),
            y: ze(_.y, S.y, y),
            colorStops: V(_.colorStops, function(x, C) {
              var D = S.colorStops[C];
              return {
                offset: ze(x.offset, D.offset, y),
                color: ao(Gs([], x.color, D.color, y))
              };
            }),
            global: S.global
          }, b ? (t[l].x2 = ze(_.x2, S.x2, y), t[l].y2 = ze(_.y2, S.y2, y)) : t[l].r = ze(_.r, S.r, y);
        } else if (u)
          Gs(m, c[n], p[n], y), i || (t[l] = ao(m));
        else {
          var w = ze(c[n], p[n], y);
          i ? this._additiveValue = w : t[l] = w;
        }
        i && this._addToTarget(t);
      }
    }
  }, r.prototype._addToTarget = function(t) {
    var e = this.valType, i = this.propName, n = this._additiveValue;
    e === _a ? t[i] = t[i] + n : e === wn ? (Pe(t[i], en), ma(en, en, n, 1), t[i] = ao(en)) : e === oo ? ma(t[i], t[i], n, 1) : e === $d && Xh(t[i], t[i], n, 1);
  }, r;
})(), Tf = (function() {
  function r(t, e, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && n) {
      yf("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = n, this._allowDiscrete = i;
  }
  return r.prototype.getMaxTime = function() {
    return this._maxTime;
  }, r.prototype.getDelay = function() {
    return this._delay;
  }, r.prototype.getLoop = function() {
    return this._loop;
  }, r.prototype.getTarget = function() {
    return this._target;
  }, r.prototype.changeTarget = function(t) {
    this._target = t;
  }, r.prototype.when = function(t, e, i) {
    return this.whenWithKeys(t, e, ct(e), i);
  }, r.prototype.whenWithKeys = function(t, e, i, n) {
    for (var a = this._tracks, o = 0; o < i.length; o++) {
      var s = i[o], l = a[s];
      if (!l) {
        l = a[s] = new k_(s);
        var u = void 0, f = this._getAdditiveTrack(s);
        if (f) {
          var h = f.keyframes, v = h[h.length - 1];
          u = v && v.value, f.valType === wn && u && (u = ao(u));
        } else
          u = this._target[s];
        if (u == null)
          continue;
        t > 0 && l.addKeyframe(0, no(u), n), this._trackKeys.push(s);
      }
      l.addKeyframe(t, no(e[s]), n);
    }
    return this._maxTime = Math.max(this._maxTime, t), this;
  }, r.prototype.pause = function() {
    this._clip.pause(), this._paused = !0;
  }, r.prototype.resume = function() {
    this._clip.resume(), this._paused = !1;
  }, r.prototype.isPaused = function() {
    return !!this._paused;
  }, r.prototype.duration = function(t) {
    return this._maxTime = t, this._force = !0, this;
  }, r.prototype._doneCallback = function() {
    this._setTracksFinished(), this._clip = null;
    var t = this._doneCbs;
    if (t)
      for (var e = t.length, i = 0; i < e; i++)
        t[i].call(this);
  }, r.prototype._abortedCallback = function() {
    this._setTracksFinished();
    var t = this.animation, e = this._abortedCbs;
    if (t && t.removeClip(this._clip), this._clip = null, e)
      for (var i = 0; i < e.length; i++)
        e[i].call(this);
  }, r.prototype._setTracksFinished = function() {
    for (var t = this._tracks, e = this._trackKeys, i = 0; i < e.length; i++)
      t[e[i]].setFinished();
  }, r.prototype._getAdditiveTrack = function(t) {
    var e, i = this._additiveAnimators;
    if (i)
      for (var n = 0; n < i.length; n++) {
        var a = i[n].getTrack(t);
        a && (e = a);
      }
    return e;
  }, r.prototype.start = function(t) {
    if (!(this._started > 0)) {
      this._started = 1;
      for (var e = this, i = [], n = this._maxTime || 0, a = 0; a < this._trackKeys.length; a++) {
        var o = this._trackKeys[a], s = this._tracks[o], l = this._getAdditiveTrack(o), u = s.keyframes, f = u.length;
        if (s.prepare(n, l), s.needsAnimate())
          if (!this._allowDiscrete && s.discrete) {
            var h = u[f - 1];
            h && (e._target[s.propName] = h.rawValue), s.setFinished();
          } else
            i.push(s);
      }
      if (i.length || this._force) {
        var v = new C_({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(c) {
            e._started = 2;
            var p = e._additiveAnimators;
            if (p) {
              for (var d = !1, g = 0; g < p.length; g++)
                if (p[g]._clip) {
                  d = !0;
                  break;
                }
              d || (e._additiveAnimators = null);
            }
            for (var g = 0; g < i.length; g++)
              i[g].step(e._target, c);
            var y = e._onframeCbs;
            if (y)
              for (var g = 0; g < y.length; g++)
                y[g](e._target, c);
          },
          ondestroy: function() {
            e._doneCallback();
          }
        });
        this._clip = v, this.animation && this.animation.addClip(v), t && v.setEasing(t);
      } else
        this._doneCallback();
      return this;
    }
  }, r.prototype.stop = function(t) {
    if (this._clip) {
      var e = this._clip;
      t && e.onframe(1), this._abortedCallback();
    }
  }, r.prototype.delay = function(t) {
    return this._delay = t, this;
  }, r.prototype.during = function(t) {
    return t && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t)), this;
  }, r.prototype.done = function(t) {
    return t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)), this;
  }, r.prototype.aborted = function(t) {
    return t && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t)), this;
  }, r.prototype.getClip = function() {
    return this._clip;
  }, r.prototype.getTrack = function(t) {
    return this._tracks[t];
  }, r.prototype.getTracks = function() {
    var t = this;
    return V(this._trackKeys, function(e) {
      return t._tracks[e];
    });
  }, r.prototype.stopTracks = function(t, e) {
    if (!t.length || !this._clip)
      return !0;
    for (var i = this._tracks, n = this._trackKeys, a = 0; a < t.length; a++) {
      var o = i[t[a]];
      o && !o.isFinished() && (e ? o.step(this._target, 1) : this._started === 1 && o.step(this._target, 0), o.setFinished());
    }
    for (var s = !0, a = 0; a < n.length; a++)
      if (!i[n[a]].isFinished()) {
        s = !1;
        break;
      }
    return s && this._abortedCallback(), s;
  }, r.prototype.saveTo = function(t, e, i) {
    if (t) {
      e = e || this._trackKeys;
      for (var n = 0; n < e.length; n++) {
        var a = e[n], o = this._tracks[a];
        if (!(!o || o.isFinished())) {
          var s = o.keyframes, l = s[i ? 0 : s.length - 1];
          l && (t[a] = no(l.rawValue));
        }
      }
    }
  }, r.prototype.__changeFinalValue = function(t, e) {
    e = e || ct(t);
    for (var i = 0; i < e.length; i++) {
      var n = e[i], a = this._tracks[n];
      if (a) {
        var o = a.keyframes;
        if (o.length > 1) {
          var s = o.pop();
          a.addKeyframe(s.time, t[n]), a.prepare(this._maxTime, a.getAdditiveTrack());
        }
      }
    }
  }, r;
})();
function Di() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var O_ = (function(r) {
  k(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i._running = !1, i._time = 0, i._pausedTime = 0, i._pauseStart = 0, i._paused = !1, e = e || {}, i.stage = e.stage || {}, i;
  }
  return t.prototype.addClip = function(e) {
    e.animation && this.removeClip(e), this._head ? (this._tail.next = e, e.prev = this._tail, e.next = null, this._tail = e) : this._head = this._tail = e, e.animation = this;
  }, t.prototype.addAnimator = function(e) {
    e.animation = this;
    var i = e.getClip();
    i && this.addClip(i);
  }, t.prototype.removeClip = function(e) {
    if (e.animation) {
      var i = e.prev, n = e.next;
      i ? i.next = n : this._head = n, n ? n.prev = i : this._tail = i, e.next = e.prev = e.animation = null;
    }
  }, t.prototype.removeAnimator = function(e) {
    var i = e.getClip();
    i && this.removeClip(i), e.animation = null;
  }, t.prototype.update = function(e) {
    for (var i = Di() - this._pausedTime, n = i - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(i, n);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = i, e || (this.trigger("frame", n), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var e = this;
    this._running = !0;
    function i() {
      e._running && (mo(i), !e._paused && e.update());
    }
    mo(i);
  }, t.prototype.start = function() {
    this._running || (this._time = Di(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = Di(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += Di() - this._pauseStart, this._paused = !1);
  }, t.prototype.clear = function() {
    for (var e = this._head; e; ) {
      var i = e.next;
      e.prev = e.next = e.animation = null, e = i;
    }
    this._head = this._tail = null;
  }, t.prototype.isFinished = function() {
    return this._head == null;
  }, t.prototype.animate = function(e, i) {
    i = i || {}, this.start();
    var n = new Tf(e, i.loop);
    return this.addAnimator(n), n;
  }, t;
})(Se), B_ = 300, Ws = U.domSupported, Us = (function() {
  var r = [
    "click",
    "dblclick",
    "mousewheel",
    "wheel",
    "mouseout",
    "mouseup",
    "mousedown",
    "mousemove",
    "contextmenu"
  ], t = [
    "touchstart",
    "touchend",
    "touchmove"
  ], e = {
    pointerdown: 1,
    pointerup: 1,
    pointermove: 1,
    pointerout: 1
  }, i = V(r, function(n) {
    var a = n.replace("mouse", "pointer");
    return e.hasOwnProperty(a) ? a : n;
  });
  return {
    mouse: r,
    touch: t,
    pointer: i
  };
})(), Kh = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, Qh = !1;
function wu(r) {
  var t = r.pointerType;
  return t === "pen" || t === "touch";
}
function N_(r) {
  r.touching = !0, r.touchTimer != null && (clearTimeout(r.touchTimer), r.touchTimer = null), r.touchTimer = setTimeout(function() {
    r.touching = !1, r.touchTimer = null;
  }, 700);
}
function Ys(r) {
  r && (r.zrByTouch = !0);
}
function F_(r, t) {
  return jt(r.dom, new z_(r, t), !0);
}
function qd(r, t) {
  for (var e = t, i = !1; e && e.nodeType !== 9 && !(i = e.domBelongToZr || e !== t && e === r.painterRoot); )
    e = e.parentNode;
  return i;
}
var z_ = /* @__PURE__ */ (function() {
  function r(t, e) {
    this.stopPropagation = Rt, this.stopImmediatePropagation = Rt, this.preventDefault = Rt, this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, this.clientX = e.clientX, this.clientY = e.clientY;
  }
  return r;
})(), de = {
  mousedown: function(r) {
    r = jt(this.dom, r), this.__mayPointerCapture = [r.zrX, r.zrY], this.trigger("mousedown", r);
  },
  mousemove: function(r) {
    r = jt(this.dom, r);
    var t = this.__mayPointerCapture;
    t && (r.zrX !== t[0] || r.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    r = jt(this.dom, r), this.__togglePointerCapture(!1), this.trigger("mouseup", r);
  },
  mouseout: function(r) {
    r = jt(this.dom, r);
    var t = r.toElement || r.relatedTarget;
    qd(this, t) || (this.__pointerCapturing && (r.zrEventControl = "no_globalout"), this.trigger("mouseout", r));
  },
  wheel: function(r) {
    Qh = !0, r = jt(this.dom, r), this.trigger("mousewheel", r);
  },
  mousewheel: function(r) {
    Qh || (r = jt(this.dom, r), this.trigger("mousewheel", r));
  },
  touchstart: function(r) {
    r = jt(this.dom, r), Ys(r), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(r, "start"), de.mousemove.call(this, r), de.mousedown.call(this, r);
  },
  touchmove: function(r) {
    r = jt(this.dom, r), Ys(r), this.handler.processGesture(r, "change"), de.mousemove.call(this, r);
  },
  touchend: function(r) {
    r = jt(this.dom, r), Ys(r), this.handler.processGesture(r, "end"), de.mouseup.call(this, r), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < B_ && de.click.call(this, r);
  },
  pointerdown: function(r) {
    de.mousedown.call(this, r);
  },
  pointermove: function(r) {
    wu(r) || de.mousemove.call(this, r);
  },
  pointerup: function(r) {
    de.mouseup.call(this, r);
  },
  pointerout: function(r) {
    wu(r) || de.mouseout.call(this, r);
  }
};
M(["click", "dblclick", "contextmenu"], function(r) {
  de[r] = function(t) {
    t = jt(this.dom, t), this.trigger(r, t);
  };
});
var bu = {
  pointermove: function(r) {
    wu(r) || bu.mousemove.call(this, r);
  },
  pointerup: function(r) {
    bu.mouseup.call(this, r);
  },
  mousemove: function(r) {
    this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", r), t && (r.zrEventControl = "only_globalout", this.trigger("mouseout", r));
  }
};
function V_(r, t) {
  var e = t.domHandlers;
  U.pointerEventsSupported ? M(Us.pointer, function(i) {
    so(t, i, function(n) {
      e[i].call(r, n);
    });
  }) : (U.touchEventsSupported && M(Us.touch, function(i) {
    so(t, i, function(n) {
      e[i].call(r, n), N_(t);
    });
  }), M(Us.mouse, function(i) {
    so(t, i, function(n) {
      n = Sf(n), t.touching || e[i].call(r, n);
    });
  }));
}
function H_(r, t) {
  U.pointerEventsSupported ? M(Kh.pointer, e) : U.touchEventsSupported || M(Kh.mouse, e);
  function e(i) {
    function n(a) {
      a = Sf(a), qd(r, a.target) || (a = F_(r, a), t.domHandlers[i].call(r, a));
    }
    so(t, i, n, { capture: !0 });
  }
}
function so(r, t, e, i) {
  r.mounted[t] = e, r.listenerOpts[t] = i, n_(r.domTarget, t, e, i);
}
function Zs(r) {
  var t = r.mounted;
  for (var e in t)
    t.hasOwnProperty(e) && a_(r.domTarget, e, t[e], r.listenerOpts[e]);
  r.mounted = {};
}
var Jh = /* @__PURE__ */ (function() {
  function r(t, e) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = e;
  }
  return r;
})(), G_ = (function(r) {
  k(t, r);
  function t(e, i) {
    var n = r.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = e, n.painterRoot = i, n._localHandlerScope = new Jh(e, de), Ws && (n._globalHandlerScope = new Jh(document, bu)), V_(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    Zs(this._localHandlerScope), Ws && Zs(this._globalHandlerScope);
  }, t.prototype.setCursor = function(e) {
    this.dom.style && (this.dom.style.cursor = e || "default");
  }, t.prototype.__togglePointerCapture = function(e) {
    if (this.__mayPointerCapture = null, Ws && +this.__pointerCapturing ^ +e) {
      this.__pointerCapturing = e;
      var i = this._globalHandlerScope;
      e ? H_(this, i) : Zs(i);
    }
  }, t;
})(Se), Kd = 1;
U.hasGlobalWindow && (Kd = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Co = Kd, xu = 0.4, Tu = "#333", Cu = "#ccc", W_ = "#eee", jh = wf, tv = 5e-5;
function wr(r) {
  return r > tv || r < -tv;
}
var br = [], li = [], Xs = Ii(), $s = Math.abs, Cf = (function() {
  function r() {
  }
  return r.prototype.getLocalTransform = function(t) {
    return r.getLocalTransform(this, t);
  }, r.prototype.setPosition = function(t) {
    this.x = t[0], this.y = t[1];
  }, r.prototype.setScale = function(t) {
    this.scaleX = t[0], this.scaleY = t[1];
  }, r.prototype.setSkew = function(t) {
    this.skewX = t[0], this.skewY = t[1];
  }, r.prototype.setOrigin = function(t) {
    this.originX = t[0], this.originY = t[1];
  }, r.prototype.needLocalTransform = function() {
    return wr(this.rotation) || wr(this.x) || wr(this.y) || wr(this.scaleX - 1) || wr(this.scaleY - 1) || wr(this.skewX) || wr(this.skewY);
  }, r.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, e = this.needLocalTransform(), i = this.transform;
    if (!(e || t)) {
      i && (jh(i), this.invTransform = null);
      return;
    }
    i = i || Ii(), e ? this.getLocalTransform(i) : jh(i), t && (e ? Pi(i, t, i) : l_(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, r.prototype._resolveGlobalScaleRatio = function(t) {
    var e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(br);
      var i = br[0] < 0 ? -1 : 1, n = br[1] < 0 ? -1 : 1, a = ((br[0] - i) * e + i) / br[0] || 0, o = ((br[1] - n) * e + n) / br[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || Ii(), xf(this.invTransform, t);
  }, r.prototype.getComputedTransform = function() {
    for (var t = this, e = []; t; )
      e.push(t), t = t.parent;
    for (; t = e.pop(); )
      t.updateTransform();
    return this.transform;
  }, r.prototype.setLocalTransform = function(t) {
    if (t) {
      var e = t[0] * t[0] + t[1] * t[1], i = t[2] * t[2] + t[3] * t[3], n = Math.atan2(t[1], t[0]), a = Math.PI / 2 + n - Math.atan2(t[3], t[2]);
      i = Math.sqrt(i) * Math.cos(a), e = Math.sqrt(e), this.skewX = a, this.skewY = 0, this.rotation = -n, this.x = +t[4], this.y = +t[5], this.scaleX = e, this.scaleY = i, this.originX = 0, this.originY = 0;
    }
  }, r.prototype.decomposeTransform = function() {
    if (this.transform) {
      var t = this.parent, e = this.transform;
      t && t.transform && (t.invTransform = t.invTransform || Ii(), Pi(li, t.invTransform, e), e = li);
      var i = this.originX, n = this.originY;
      (i || n) && (Xs[4] = i, Xs[5] = n, Pi(li, e, Xs), li[4] -= i, li[5] -= n, e = li), this.setLocalTransform(e);
    }
  }, r.prototype.getGlobalScale = function(t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, r.prototype.transformCoordToLocal = function(t, e) {
    var i = [t, e], n = this.invTransform;
    return n && oe(i, i, n), i;
  }, r.prototype.transformCoordToGlobal = function(t, e) {
    var i = [t, e], n = this.transform;
    return n && oe(i, i, n), i;
  }, r.prototype.getLineScale = function() {
    var t = this.transform;
    return t && $s(t[0] - 1) > 1e-10 && $s(t[3] - 1) > 1e-10 ? Math.sqrt($s(t[0] * t[3] - t[2] * t[1])) : 1;
  }, r.prototype.copyTransform = function(t) {
    U_(this, t);
  }, r.getLocalTransform = function(t, e) {
    e = e || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, l = t.anchorY, u = t.rotation || 0, f = t.x, h = t.y, v = t.skewX ? Math.tan(t.skewX) : 0, c = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || l) {
      var p = i + s, d = n + l;
      e[4] = -p * a - v * d * o, e[5] = -d * o - c * p * a;
    } else
      e[4] = e[5] = 0;
    return e[0] = a, e[3] = o, e[1] = c * a, e[2] = v * o, u && bf(e, e, u), e[4] += i + f, e[5] += n + h, e;
  }, r.initDefaultProps = (function() {
    var t = r.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  })(), r;
})(), Gn = [
  "x",
  "y",
  "originX",
  "originY",
  "anchorX",
  "anchorY",
  "rotation",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY"
];
function U_(r, t) {
  for (var e = 0; e < Gn.length; e++) {
    var i = Gn[e];
    r[i] = t[i];
  }
}
var ev = {};
function qt(r, t) {
  t = t || Xr;
  var e = ev[t];
  e || (e = ev[t] = new na(500));
  var i = e.get(r);
  return i == null && (i = Gi.measureText(r, t).width, e.put(r, i)), i;
}
function rv(r, t, e, i) {
  var n = qt(r, t), a = Df(t), o = bn(0, n, e), s = xi(0, a, i), l = new it(o, s, n, a);
  return l;
}
function Mf(r, t, e, i) {
  var n = ((r || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return rv(n[0], t, e, i);
  for (var o = new it(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var l = rv(n[s], t, e, i);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function bn(r, t, e) {
  return e === "right" ? r -= t : e === "center" && (r -= t / 2), r;
}
function xi(r, t, e) {
  return e === "middle" ? r -= t / 2 : e === "bottom" && (r -= t), r;
}
function Df(r) {
  return qt("国", r);
}
function cr(r, t) {
  return typeof r == "string" ? r.lastIndexOf("%") >= 0 ? parseFloat(r) / 100 * t : parseFloat(r) : r;
}
function Mo(r, t, e) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = e.height, o = e.width, s = a / 2, l = e.x, u = e.y, f = "left", h = "top";
  if (i instanceof Array)
    l += cr(i[0], e.width), u += cr(i[1], e.height), f = null, h = null;
  else
    switch (i) {
      case "left":
        l -= n, u += s, f = "right", h = "middle";
        break;
      case "right":
        l += n + o, u += s, h = "middle";
        break;
      case "top":
        l += o / 2, u -= n, f = "center", h = "bottom";
        break;
      case "bottom":
        l += o / 2, u += a + n, f = "center";
        break;
      case "inside":
        l += o / 2, u += s, f = "center", h = "middle";
        break;
      case "insideLeft":
        l += n, u += s, h = "middle";
        break;
      case "insideRight":
        l += o - n, u += s, f = "right", h = "middle";
        break;
      case "insideTop":
        l += o / 2, u += n, f = "center";
        break;
      case "insideBottom":
        l += o / 2, u += a - n, f = "center", h = "bottom";
        break;
      case "insideTopLeft":
        l += n, u += n;
        break;
      case "insideTopRight":
        l += o - n, u += n, f = "right";
        break;
      case "insideBottomLeft":
        l += n, u += a - n, h = "bottom";
        break;
      case "insideBottomRight":
        l += o - n, u += a - n, f = "right", h = "bottom";
        break;
    }
  return r = r || {}, r.x = l, r.y = u, r.align = f, r.verticalAlign = h, r;
}
var qs = "__zr_normal__", Ks = Gn.concat(["ignore"]), Y_ = Wi(Gn, function(r, t) {
  return r[t] = !0, r;
}, { ignore: !1 }), ui = {}, Z_ = new it(0, 0, 0, 0), ts = (function() {
  function r(t) {
    this.id = Id(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
  }
  return r.prototype._init = function(t) {
    this.attr(t);
  }, r.prototype.drift = function(t, e, i) {
    switch (this.draggable) {
      case "horizontal":
        e = 0;
        break;
      case "vertical":
        t = 0;
        break;
    }
    var n = this.transform;
    n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += e, this.decomposeTransform(), this.markRedraw();
  }, r.prototype.beforeUpdate = function() {
  }, r.prototype.afterUpdate = function() {
  }, r.prototype.update = function() {
    this.updateTransform(), this.__dirty && this.updateInnerText();
  }, r.prototype.updateInnerText = function(t) {
    var e = this._textContent;
    if (e && (!e.ignore || t)) {
      this.textConfig || (this.textConfig = {});
      var i = this.textConfig, n = i.local, a = e.innerTransformable, o = void 0, s = void 0, l = !1;
      a.parent = n ? this : null;
      var u = !1;
      if (a.copyTransform(e), i.position != null) {
        var f = Z_;
        i.layoutRect ? f.copy(i.layoutRect) : f.copy(this.getBoundingRect()), n || f.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(ui, i, f) : Mo(ui, i, f), a.x = ui.x, a.y = ui.y, o = ui.align, s = ui.verticalAlign;
        var h = i.origin;
        if (h && i.rotation != null) {
          var v = void 0, c = void 0;
          h === "center" ? (v = f.width * 0.5, c = f.height * 0.5) : (v = cr(h[0], f.width), c = cr(h[1], f.height)), u = !0, a.originX = -a.x + v + (n ? 0 : f.x), a.originY = -a.y + c + (n ? 0 : f.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var p = i.offset;
      p && (a.x += p[0], a.y += p[1], u || (a.originX = -p[0], a.originY = -p[1]));
      var d = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, g = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), y = void 0, m = void 0, _ = void 0;
      d && this.canBeInsideText() ? (y = i.insideFill, m = i.insideStroke, (y == null || y === "auto") && (y = this.getInsideTextFill()), (m == null || m === "auto") && (m = this.getInsideTextStroke(y), _ = !0)) : (y = i.outsideFill, m = i.outsideStroke, (y == null || y === "auto") && (y = this.getOutsideFill()), (m == null || m === "auto") && (m = this.getOutsideStroke(y), _ = !0)), y = y || "#000", (y !== g.fill || m !== g.stroke || _ !== g.autoStroke || o !== g.align || s !== g.verticalAlign) && (l = !0, g.fill = y, g.stroke = m, g.autoStroke = _, g.align = o, g.verticalAlign = s, e.setDefaultTextStyle(g)), e.__dirty |= $t, l && e.dirtyStyle(!0);
    }
  }, r.prototype.canBeInsideText = function() {
    return !0;
  }, r.prototype.getInsideTextFill = function() {
    return "#fff";
  }, r.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, r.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? Cu : Tu;
  }, r.prototype.getOutsideStroke = function(t) {
    var e = this.__zr && this.__zr.getBackgroundColor(), i = typeof e == "string" && Pe(e);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, aa(i, "rgba");
  }, r.prototype.traverse = function(t, e) {
  }, r.prototype.attrKV = function(t, e) {
    t === "textConfig" ? this.setTextConfig(e) : t === "textContent" ? this.setTextContent(e) : t === "clipPath" ? this.setClipPath(e) : t === "extra" ? (this.extra = this.extra || {}, O(this.extra, e)) : this[t] = e;
  }, r.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, r.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, r.prototype.attr = function(t, e) {
    if (typeof t == "string")
      this.attrKV(t, e);
    else if (G(t))
      for (var i = t, n = ct(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, r.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var e = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== qs)) {
        var o = n.targetName, s = o ? e[o] : e;
        n.saveTo(s);
      }
    }
  }, r.prototype._innerSaveToNormal = function(t) {
    var e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, Ks);
  }, r.prototype._savePrimaryToNormal = function(t, e, i) {
    for (var n = 0; n < i.length; n++) {
      var a = i[n];
      t[a] != null && !(a in e) && (e[a] = this[a]);
    }
  }, r.prototype.hasState = function() {
    return this.currentStates.length > 0;
  }, r.prototype.getState = function(t) {
    return this.states[t];
  }, r.prototype.ensureState = function(t) {
    var e = this.states;
    return e[t] || (e[t] = {}), e[t];
  }, r.prototype.clearStates = function(t) {
    this.useState(qs, !1, t);
  }, r.prototype.useState = function(t, e, i, n) {
    var a = t === qs, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, l = this.stateTransition;
      if (!(rt(s, t) >= 0 && (e || s.length === 1))) {
        var u;
        if (this.stateProxy && !a && (u = this.stateProxy(t)), u || (u = this.states && this.states[t]), !u && !a) {
          yf("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(u);
        var f = !!(u && u.hoverLayer || n);
        f && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, u, this._normalState, e, !i && !this.__inHover && l && l.duration > 0, l);
        var h = this._textContent, v = this._textGuide;
        return h && h.useState(t, e, i, f), v && v.useState(t, e, i, f), a ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !f && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~$t), u;
      }
    }
  }, r.prototype.useStates = function(t, e, i) {
    if (!t.length)
      this.clearStates();
    else {
      var n = [], a = this.currentStates, o = t.length, s = o === a.length;
      if (s) {
        for (var l = 0; l < o; l++)
          if (t[l] !== a[l]) {
            s = !1;
            break;
          }
      }
      if (s)
        return;
      for (var l = 0; l < o; l++) {
        var u = t[l], f = void 0;
        this.stateProxy && (f = this.stateProxy(u, t)), f || (f = this.states[u]), f && n.push(f);
      }
      var h = n[o - 1], v = !!(h && h.hoverLayer || i);
      v && this._toggleHoverLayerFlag(!0);
      var c = this._mergeStates(n), p = this.stateTransition;
      this.saveCurrentToNormalState(c), this._applyStateObj(t.join(","), c, this._normalState, !1, !e && !this.__inHover && p && p.duration > 0, p);
      var d = this._textContent, g = this._textGuide;
      d && d.useStates(t, e, v), g && g.useStates(t, e, v), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !v && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~$t);
    }
  }, r.prototype.isSilent = function() {
    for (var t = this.silent, e = this.parent; !t && e; ) {
      if (e.silent) {
        t = !0;
        break;
      }
      e = e.parent;
    }
    return t;
  }, r.prototype._updateAnimationTargets = function() {
    for (var t = 0; t < this.animators.length; t++) {
      var e = this.animators[t];
      e.targetName && e.changeTarget(this[e.targetName]);
    }
  }, r.prototype.removeState = function(t) {
    var e = rt(this.currentStates, t);
    if (e >= 0) {
      var i = this.currentStates.slice();
      i.splice(e, 1), this.useStates(i);
    }
  }, r.prototype.replaceState = function(t, e, i) {
    var n = this.currentStates.slice(), a = rt(n, t), o = rt(n, e) >= 0;
    a >= 0 ? o ? n.splice(a, 1) : n[a] = e : i && !o && n.push(e), this.useStates(n);
  }, r.prototype.toggleState = function(t, e) {
    e ? this.useState(t, !0) : this.removeState(t);
  }, r.prototype._mergeStates = function(t) {
    for (var e = {}, i, n = 0; n < t.length; n++) {
      var a = t[n];
      O(e, a), a.textConfig && (i = i || {}, O(i, a.textConfig));
    }
    return i && (e.textConfig = i), e;
  }, r.prototype._applyStateObj = function(t, e, i, n, a, o) {
    var s = !(e && n);
    e && e.textConfig ? (this.textConfig = O({}, n ? this.textConfig : i.textConfig), O(this.textConfig, e.textConfig)) : s && i.textConfig && (this.textConfig = i.textConfig);
    for (var l = {}, u = !1, f = 0; f < Ks.length; f++) {
      var h = Ks[f], v = a && Y_[h];
      e && e[h] != null ? v ? (u = !0, l[h] = e[h]) : this[h] = e[h] : s && i[h] != null && (v ? (u = !0, l[h] = i[h]) : this[h] = i[h]);
    }
    if (!a)
      for (var f = 0; f < this.animators.length; f++) {
        var c = this.animators[f], p = c.targetName;
        c.getLoop() || c.__changeFinalValue(p ? (e || i)[p] : e || i);
      }
    u && this._transitionState(t, l, o);
  }, r.prototype._attachComponent = function(t) {
    if (!(t.__zr && !t.__hostTarget) && t !== this) {
      var e = this.__zr;
      e && t.addSelfToZr(e), t.__zr = e, t.__hostTarget = this;
    }
  }, r.prototype._detachComponent = function(t) {
    t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__hostTarget = null;
  }, r.prototype.getClipPath = function() {
    return this._clipPath;
  }, r.prototype.setClipPath = function(t) {
    this._clipPath && this._clipPath !== t && this.removeClipPath(), this._attachComponent(t), this._clipPath = t, this.markRedraw();
  }, r.prototype.removeClipPath = function() {
    var t = this._clipPath;
    t && (this._detachComponent(t), this._clipPath = null, this.markRedraw());
  }, r.prototype.getTextContent = function() {
    return this._textContent;
  }, r.prototype.setTextContent = function(t) {
    var e = this._textContent;
    e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new Cf(), this._attachComponent(t), this._textContent = t, this.markRedraw());
  }, r.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), O(this.textConfig, t), this.markRedraw();
  }, r.prototype.removeTextConfig = function() {
    this.textConfig = null, this.markRedraw();
  }, r.prototype.removeTextContent = function() {
    var t = this._textContent;
    t && (t.innerTransformable = null, this._detachComponent(t), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
  }, r.prototype.getTextGuideLine = function() {
    return this._textGuide;
  }, r.prototype.setTextGuideLine = function(t) {
    this._textGuide && this._textGuide !== t && this.removeTextGuideLine(), this._attachComponent(t), this._textGuide = t, this.markRedraw();
  }, r.prototype.removeTextGuideLine = function() {
    var t = this._textGuide;
    t && (this._detachComponent(t), this._textGuide = null, this.markRedraw());
  }, r.prototype.markRedraw = function() {
    this.__dirty |= $t;
    var t = this.__zr;
    t && (this.__inHover ? t.refreshHover() : t.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
  }, r.prototype.dirty = function() {
    this.markRedraw();
  }, r.prototype._toggleHoverLayerFlag = function(t) {
    this.__inHover = t;
    var e = this._textContent, i = this._textGuide;
    e && (e.__inHover = t), i && (i.__inHover = t);
  }, r.prototype.addSelfToZr = function(t) {
    if (this.__zr !== t) {
      this.__zr = t;
      var e = this.animators;
      if (e)
        for (var i = 0; i < e.length; i++)
          t.animation.addAnimator(e[i]);
      this._clipPath && this._clipPath.addSelfToZr(t), this._textContent && this._textContent.addSelfToZr(t), this._textGuide && this._textGuide.addSelfToZr(t);
    }
  }, r.prototype.removeSelfFromZr = function(t) {
    if (this.__zr) {
      this.__zr = null;
      var e = this.animators;
      if (e)
        for (var i = 0; i < e.length; i++)
          t.animation.removeAnimator(e[i]);
      this._clipPath && this._clipPath.removeSelfFromZr(t), this._textContent && this._textContent.removeSelfFromZr(t), this._textGuide && this._textGuide.removeSelfFromZr(t);
    }
  }, r.prototype.animate = function(t, e, i) {
    var n = t ? this[t] : this, a = new Tf(n, e, i);
    return t && (a.targetName = t), this.addAnimator(a, t), a;
  }, r.prototype.addAnimator = function(t, e) {
    var i = this.__zr, n = this;
    t.during(function() {
      n.updateDuringAnimation(e);
    }).done(function() {
      var a = n.animators, o = rt(a, t);
      o >= 0 && a.splice(o, 1);
    }), this.animators.push(t), i && i.animation.addAnimator(t), i && i.wakeUp();
  }, r.prototype.updateDuringAnimation = function(t) {
    this.markRedraw();
  }, r.prototype.stopAnimation = function(t, e) {
    for (var i = this.animators, n = i.length, a = [], o = 0; o < n; o++) {
      var s = i[o];
      !t || t === s.scope ? s.stop(e) : a.push(s);
    }
    return this.animators = a, this;
  }, r.prototype.animateTo = function(t, e, i) {
    Qs(this, t, e, i);
  }, r.prototype.animateFrom = function(t, e, i) {
    Qs(this, t, e, i, !0);
  }, r.prototype._transitionState = function(t, e, i, n) {
    for (var a = Qs(this, e, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, r.prototype.getBoundingRect = function() {
    return null;
  }, r.prototype.getPaintRect = function() {
    return null;
  }, r.initDefaultProps = (function() {
    var t = r.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = $t;
    function e(i, n, a, o) {
      Object.defineProperty(t, i, {
        get: function() {
          if (!this[n]) {
            var l = this[n] = [];
            s(this, l);
          }
          return this[n];
        },
        set: function(l) {
          this[a] = l[0], this[o] = l[1], this[n] = l, s(this, l);
        }
      });
      function s(l, u) {
        Object.defineProperty(u, 0, {
          get: function() {
            return l[a];
          },
          set: function(f) {
            l[a] = f;
          }
        }), Object.defineProperty(u, 1, {
          get: function() {
            return l[o];
          },
          set: function(f) {
            l[o] = f;
          }
        });
      }
    }
    Object.defineProperty && (e("position", "_legacyPos", "x", "y"), e("scale", "_legacyScale", "scaleX", "scaleY"), e("origin", "_legacyOrigin", "originX", "originY"));
  })(), r;
})();
_e(ts, Se);
_e(ts, Cf);
function Qs(r, t, e, i, n) {
  e = e || {};
  var a = [];
  Qd(r, "", r, t, e, i, a, n);
  var o = a.length, s = !1, l = e.done, u = e.aborted, f = function() {
    s = !0, o--, o <= 0 && (s ? l && l() : u && u());
  }, h = function() {
    o--, o <= 0 && (s ? l && l() : u && u());
  };
  o || l && l(), a.length > 0 && e.during && a[0].during(function(p, d) {
    e.during(d);
  });
  for (var v = 0; v < a.length; v++) {
    var c = a[v];
    f && c.done(f), h && c.aborted(h), e.force && c.duration(e.duration), c.start(e.easing);
  }
  return a;
}
function Js(r, t, e) {
  for (var i = 0; i < e; i++)
    r[i] = t[i];
}
function X_(r) {
  return Wt(r[0]);
}
function $_(r, t, e) {
  if (Wt(t[e]))
    if (Wt(r[e]) || (r[e] = []), Ut(t[e])) {
      var i = t[e].length;
      r[e].length !== i && (r[e] = new t[e].constructor(i), Js(r[e], t[e], i));
    } else {
      var n = t[e], a = r[e], o = n.length;
      if (X_(n))
        for (var s = n[0].length, l = 0; l < o; l++)
          a[l] ? Js(a[l], n[l], s) : a[l] = Array.prototype.slice.call(n[l]);
      else
        Js(a, n, o);
      a.length = n.length;
    }
  else
    r[e] = t[e];
}
function q_(r, t) {
  return r === t || Wt(r) && Wt(t) && K_(r, t);
}
function K_(r, t) {
  var e = r.length;
  if (e !== t.length)
    return !1;
  for (var i = 0; i < e; i++)
    if (r[i] !== t[i])
      return !1;
  return !0;
}
function Qd(r, t, e, i, n, a, o, s) {
  for (var l = ct(i), u = n.duration, f = n.delay, h = n.additive, v = n.setToFinal, c = !G(a), p = r.animators, d = [], g = 0; g < l.length; g++) {
    var y = l[g], m = i[y];
    if (m != null && e[y] != null && (c || a[y]))
      if (G(m) && !Wt(m) && !Jo(m)) {
        if (t) {
          s || (e[y] = m, r.updateDuringAnimation(t));
          continue;
        }
        Qd(r, y, e[y], m, n, a && a[y], o, s);
      } else
        d.push(y);
    else s || (e[y] = m, r.updateDuringAnimation(t), d.push(y));
  }
  var _ = d.length;
  if (!h && _)
    for (var S = 0; S < p.length; S++) {
      var b = p[S];
      if (b.targetName === t) {
        var w = b.stopTracks(d);
        if (w) {
          var x = rt(p, b);
          p.splice(x, 1);
        }
      }
    }
  if (n.force || (d = bt(d, function(T) {
    return !q_(i[T], e[T]);
  }), _ = d.length), _ > 0 || n.force && !o.length) {
    var C = void 0, D = void 0, A = void 0;
    if (s) {
      D = {}, v && (C = {});
      for (var S = 0; S < _; S++) {
        var y = d[S];
        D[y] = e[y], v ? C[y] = i[y] : e[y] = i[y];
      }
    } else if (v) {
      A = {};
      for (var S = 0; S < _; S++) {
        var y = d[S];
        A[y] = no(e[y]), $_(e, i, y);
      }
    }
    var b = new Tf(e, !1, !1, h ? bt(p, function(L) {
      return L.targetName === t;
    }) : null);
    b.targetName = t, n.scope && (b.scope = n.scope), v && C && b.whenWithKeys(0, C, d), A && b.whenWithKeys(0, A, d), b.whenWithKeys(u ?? 500, s ? D : i, d).delay(f || 0), r.addAnimator(b, t), o.push(b);
  }
}
var gt = (function(r) {
  k(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.isGroup = !0, i._children = [], i.attr(e), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.children = function() {
    return this._children.slice();
  }, t.prototype.childAt = function(e) {
    return this._children[e];
  }, t.prototype.childOfName = function(e) {
    for (var i = this._children, n = 0; n < i.length; n++)
      if (i[n].name === e)
        return i[n];
  }, t.prototype.childCount = function() {
    return this._children.length;
  }, t.prototype.add = function(e) {
    return e && e !== this && e.parent !== this && (this._children.push(e), this._doAdd(e)), this;
  }, t.prototype.addBefore = function(e, i) {
    if (e && e !== this && e.parent !== this && i && i.parent === this) {
      var n = this._children, a = n.indexOf(i);
      a >= 0 && (n.splice(a, 0, e), this._doAdd(e));
    }
    return this;
  }, t.prototype.replace = function(e, i) {
    var n = rt(this._children, e);
    return n >= 0 && this.replaceAt(i, n), this;
  }, t.prototype.replaceAt = function(e, i) {
    var n = this._children, a = n[i];
    if (e && e !== this && e.parent !== this && e !== a) {
      n[i] = e, a.parent = null;
      var o = this.__zr;
      o && a.removeSelfFromZr(o), this._doAdd(e);
    }
    return this;
  }, t.prototype._doAdd = function(e) {
    e.parent && e.parent.remove(e), e.parent = this;
    var i = this.__zr;
    i && i !== e.__zr && e.addSelfToZr(i), i && i.refresh();
  }, t.prototype.remove = function(e) {
    var i = this.__zr, n = this._children, a = rt(n, e);
    return a < 0 ? this : (n.splice(a, 1), e.parent = null, i && e.removeSelfFromZr(i), i && i.refresh(), this);
  }, t.prototype.removeAll = function() {
    for (var e = this._children, i = this.__zr, n = 0; n < e.length; n++) {
      var a = e[n];
      i && a.removeSelfFromZr(i), a.parent = null;
    }
    return e.length = 0, this;
  }, t.prototype.eachChild = function(e, i) {
    for (var n = this._children, a = 0; a < n.length; a++) {
      var o = n[a];
      e.call(i, o, a);
    }
    return this;
  }, t.prototype.traverse = function(e, i) {
    for (var n = 0; n < this._children.length; n++) {
      var a = this._children[n], o = e.call(i, a);
      a.isGroup && !o && a.traverse(e, i);
    }
    return this;
  }, t.prototype.addSelfToZr = function(e) {
    r.prototype.addSelfToZr.call(this, e);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.addSelfToZr(e);
    }
  }, t.prototype.removeSelfFromZr = function(e) {
    r.prototype.removeSelfFromZr.call(this, e);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.removeSelfFromZr(e);
    }
  }, t.prototype.getBoundingRect = function(e) {
    for (var i = new it(0, 0, 0, 0), n = e || this._children, a = [], o = null, s = 0; s < n.length; s++) {
      var l = n[s];
      if (!(l.ignore || l.invisible)) {
        var u = l.getBoundingRect(), f = l.getLocalTransform(a);
        f ? (it.applyTransform(i, u, f), o = o || i.clone(), o.union(i)) : (o = o || u.clone(), o.union(u));
      }
    }
    return o || i;
  }, t;
})(ts);
gt.prototype.type = "group";
/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
var lo = {}, Jd = {};
function Q_(r) {
  delete Jd[r];
}
function J_(r) {
  if (!r)
    return !1;
  if (typeof r == "string")
    return To(r, 1) < xu;
  if (r.colorStops) {
    for (var t = r.colorStops, e = 0, i = t.length, n = 0; n < i; n++)
      e += To(t[n].color, 1);
    return e /= i, e < xu;
  }
  return !1;
}
var j_ = (function() {
  function r(t, e, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, i = i || {}, this.dom = e, this.id = t;
    var a = new m_(), o = i.renderer || "canvas";
    lo[o] || (o = ct(lo)[0]), i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new lo[o](e, a, i, t), l = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var u = !U.node && !U.worker && !l ? new G_(s.getViewportRoot(), s.root) : null, f = i.useCoarsePointer, h = f == null || f === "auto" ? U.touchEventsSupported : !!f, v = 44, c;
    h && (c = q(i.pointerSize, v)), this.handler = new Fd(a, s, u, s.root, c), this.animation = new O_({
      stage: {
        update: l ? null : function() {
          return n._flush(!0);
        }
      }
    }), l || this.animation.start();
  }
  return r.prototype.add = function(t) {
    this._disposed || !t || (this.storage.addRoot(t), t.addSelfToZr(this), this.refresh());
  }, r.prototype.remove = function(t) {
    this._disposed || !t || (this.storage.delRoot(t), t.removeSelfFromZr(this), this.refresh());
  }, r.prototype.configLayer = function(t, e) {
    this._disposed || (this.painter.configLayer && this.painter.configLayer(t, e), this.refresh());
  }, r.prototype.setBackgroundColor = function(t) {
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = J_(t));
  }, r.prototype.getBackgroundColor = function() {
    return this._backgroundColor;
  }, r.prototype.setDarkMode = function(t) {
    this._darkMode = t;
  }, r.prototype.isDarkMode = function() {
    return this._darkMode;
  }, r.prototype.refreshImmediately = function(t) {
    this._disposed || (t || this.animation.update(!0), this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1);
  }, r.prototype.refresh = function() {
    this._disposed || (this._needsRefresh = !0, this.animation.start());
  }, r.prototype.flush = function() {
    this._disposed || this._flush(!1);
  }, r.prototype._flush = function(t) {
    var e, i = Di();
    this._needsRefresh && (e = !0, this.refreshImmediately(t)), this._needsRefreshHover && (e = !0, this.refreshHoverImmediately());
    var n = Di();
    e ? (this._stillFrameAccum = 0, this.trigger("rendered", {
      elapsedTime: n - i
    })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
  }, r.prototype.setSleepAfterStill = function(t) {
    this._sleepAfterStill = t;
  }, r.prototype.wakeUp = function() {
    this._disposed || (this.animation.start(), this._stillFrameAccum = 0);
  }, r.prototype.refreshHover = function() {
    this._needsRefreshHover = !0;
  }, r.prototype.refreshHoverImmediately = function() {
    this._disposed || (this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.getType() === "canvas" && this.painter.refreshHover());
  }, r.prototype.resize = function(t) {
    this._disposed || (t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize());
  }, r.prototype.clearAnimation = function() {
    this._disposed || this.animation.clear();
  }, r.prototype.getWidth = function() {
    if (!this._disposed)
      return this.painter.getWidth();
  }, r.prototype.getHeight = function() {
    if (!this._disposed)
      return this.painter.getHeight();
  }, r.prototype.setCursorStyle = function(t) {
    this._disposed || this.handler.setCursorStyle(t);
  }, r.prototype.findHover = function(t, e) {
    if (!this._disposed)
      return this.handler.findHover(t, e);
  }, r.prototype.on = function(t, e, i) {
    return this._disposed || this.handler.on(t, e, i), this;
  }, r.prototype.off = function(t, e) {
    this._disposed || this.handler.off(t, e);
  }, r.prototype.trigger = function(t, e) {
    this._disposed || this.handler.trigger(t, e);
  }, r.prototype.clear = function() {
    if (!this._disposed) {
      for (var t = this.storage.getRoots(), e = 0; e < t.length; e++)
        t[e] instanceof gt && t[e].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, r.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, Q_(this.id));
  }, r;
})();
function iv(r, t) {
  var e = new j_(Id(), r, t);
  return Jd[e.id] = e, e;
}
function t1(r, t) {
  lo[r] = t;
}
var nv = 1e-4, jd = 20;
function e1(r) {
  return r.replace(/^\s+|\s+$/g, "");
}
function At(r, t, e, i) {
  var n = t[0], a = t[1], o = e[0], s = e[1], l = a - n, u = s - o;
  if (l === 0)
    return u === 0 ? o : (o + s) / 2;
  if (i)
    if (l > 0) {
      if (r <= n)
        return o;
      if (r >= a)
        return s;
    } else {
      if (r >= n)
        return o;
      if (r <= a)
        return s;
    }
  else {
    if (r === n)
      return o;
    if (r === a)
      return s;
  }
  return (r - n) / l * u + o;
}
function St(r, t) {
  switch (r) {
    case "center":
    case "middle":
      r = "50%";
      break;
    case "left":
    case "top":
      r = "0%";
      break;
    case "right":
    case "bottom":
      r = "100%";
      break;
  }
  return z(r) ? e1(r).match(/%$/) ? parseFloat(r) / 100 * t : parseFloat(r) : r == null ? NaN : +r;
}
function wt(r, t, e) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), jd), r = (+r).toFixed(t), e ? r : +r;
}
function Vr(r) {
  return r.sort(function(t, e) {
    return t - e;
  }), r;
}
function Le(r) {
  if (r = +r, isNaN(r))
    return 0;
  if (r > 1e-14) {
    for (var t = 1, e = 0; e < 15; e++, t *= 10)
      if (Math.round(r * t) / t === r)
        return e;
  }
  return r1(r);
}
function r1(r) {
  var t = r.toString().toLowerCase(), e = t.indexOf("e"), i = e > 0 ? +t.slice(e + 1) : 0, n = e > 0 ? e : t.length, a = t.indexOf("."), o = a < 0 ? 0 : n - 1 - a;
  return Math.max(0, o - i);
}
function tg(r, t) {
  var e = Math.log, i = Math.LN10, n = Math.floor(e(r[1] - r[0]) / i), a = Math.round(e(Math.abs(t[1] - t[0])) / i), o = Math.min(Math.max(-n + a, 0), 20);
  return isFinite(o) ? o : 20;
}
function i1(r, t) {
  var e = Math.max(Le(r), Le(t)), i = r + t;
  return e > jd ? i : wt(i, e);
}
function eg(r) {
  var t = Math.PI * 2;
  return (r % t + t) % t;
}
function Do(r) {
  return r > -nv && r < nv;
}
var n1 = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function Ue(r) {
  if (r instanceof Date)
    return r;
  if (z(r)) {
    var t = n1.exec(r);
    if (!t)
      return /* @__PURE__ */ new Date(NaN);
    if (t[8]) {
      var e = +t[4] || 0;
      return t[8].toUpperCase() !== "Z" && (e -= +t[8].slice(0, 3)), new Date(Date.UTC(+t[1], +(t[2] || 1) - 1, +t[3] || 1, e, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0));
    } else
      return new Date(+t[1], +(t[2] || 1) - 1, +t[3] || 1, +t[4] || 0, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0);
  } else if (r == null)
    return /* @__PURE__ */ new Date(NaN);
  return new Date(Math.round(r));
}
function a1(r) {
  return Math.pow(10, Af(r));
}
function Af(r) {
  if (r === 0)
    return 0;
  var t = Math.floor(Math.log(r) / Math.LN10);
  return r / Math.pow(10, t) >= 10 && t++, t;
}
function rg(r, t) {
  var e = Af(r), i = Math.pow(10, e), n = r / i, a;
  return n < 1.5 ? a = 1 : n < 2.5 ? a = 2 : n < 4 ? a = 3 : n < 7 ? a = 5 : a = 10, r = a * i, e >= -20 ? +r.toFixed(e < 0 ? -e : 0) : r;
}
function Ao(r) {
  var t = parseFloat(r);
  return t == r && (t !== 0 || !z(r) || r.indexOf("x") <= 0) ? t : NaN;
}
function o1(r) {
  return !isNaN(Ao(r));
}
function ig() {
  return Math.round(Math.random() * 9);
}
function ng(r, t) {
  return t === 0 ? r : ng(t, r % t);
}
function av(r, t) {
  return r == null ? t : t == null ? r : r * t / ng(r, t);
}
function Vt(r) {
  throw new Error(r);
}
function ov(r, t, e) {
  return (t - r) * e + r;
}
var ag = "series\0", s1 = "\0_ec_\0";
function Et(r) {
  return r instanceof Array ? r : r == null ? [] : [r];
}
function Mu(r, t, e) {
  if (r) {
    r[t] = r[t] || {}, r.emphasis = r.emphasis || {}, r.emphasis[t] = r.emphasis[t] || {};
    for (var i = 0, n = e.length; i < n; i++) {
      var a = e[i];
      !r.emphasis[t].hasOwnProperty(a) && r[t].hasOwnProperty(a) && (r.emphasis[t][a] = r[t][a]);
    }
  }
}
var sv = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function oa(r) {
  return G(r) && !N(r) && !(r instanceof Date) ? r.value : r;
}
function l1(r) {
  return G(r) && !(r instanceof Array);
}
function u1(r, t, e) {
  var i = e === "normalMerge", n = e === "replaceMerge", a = e === "replaceAll";
  r = r || [], t = (t || []).slice();
  var o = Y();
  M(t, function(l, u) {
    if (!G(l)) {
      t[u] = null;
      return;
    }
  });
  var s = f1(r, o, e);
  return (i || n) && h1(s, r, o, t), i && v1(s, t), i || n ? c1(s, t, n) : a && p1(s, t), d1(s), s;
}
function f1(r, t, e) {
  var i = [];
  if (e === "replaceAll")
    return i;
  for (var n = 0; n < r.length; n++) {
    var a = r[n];
    a && a.id != null && t.set(a.id, n), i.push({
      existing: e === "replaceMerge" || Wn(a) ? null : a,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function h1(r, t, e, i) {
  M(i, function(n, a) {
    if (!(!n || n.id == null)) {
      var o = In(n.id), s = e.get(o);
      if (s != null) {
        var l = r[s];
        We(!l.newOption, 'Duplicated option on id "' + o + '".'), l.newOption = n, l.existing = t[s], i[a] = null;
      }
    }
  });
}
function v1(r, t) {
  M(t, function(e, i) {
    if (!(!e || e.name == null))
      for (var n = 0; n < r.length; n++) {
        var a = r[n].existing;
        if (!r[n].newOption && a && (a.id == null || e.id == null) && !Wn(e) && !Wn(a) && og("name", a, e)) {
          r[n].newOption = e, t[i] = null;
          return;
        }
      }
  });
}
function c1(r, t, e) {
  M(t, function(i) {
    if (i) {
      for (
        var n, a = 0;
        // Be `!resultItem` only when `nextIdx >= result.length`.
        (n = r[a]) && (n.newOption || Wn(n.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        n.existing && i.id != null && !og("id", i, n.existing));
      )
        a++;
      n ? (n.newOption = i, n.brandNew = e) : r.push({
        newOption: i,
        brandNew: e,
        existing: null,
        keyInfo: null
      }), a++;
    }
  });
}
function p1(r, t) {
  M(t, function(e) {
    r.push({
      newOption: e,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function d1(r) {
  var t = Y();
  M(r, function(e) {
    var i = e.existing;
    i && t.set(i.id, e);
  }), M(r, function(e) {
    var i = e.newOption;
    We(!i || i.id == null || !t.get(i.id) || t.get(i.id) === e, "id duplicates: " + (i && i.id)), i && i.id != null && t.set(i.id, e), !e.keyInfo && (e.keyInfo = {});
  }), M(r, function(e, i) {
    var n = e.existing, a = e.newOption, o = e.keyInfo;
    if (G(a)) {
      if (o.name = a.name != null ? In(a.name) : n ? n.name : ag + i, n)
        o.id = In(n.id);
      else if (a.id != null)
        o.id = In(a.id);
      else {
        var s = 0;
        do
          o.id = "\0" + o.name + "\0" + s++;
        while (t.get(o.id));
      }
      t.set(o.id, e);
    }
  });
}
function og(r, t, e) {
  var i = Re(t[r], null), n = Re(e[r], null);
  return i != null && n != null && i === n;
}
function In(r) {
  return Re(r, "");
}
function Re(r, t) {
  return r == null ? t : z(r) ? r : ht(r) || fu(r) ? r + "" : t;
}
function Lf(r) {
  var t = r.name;
  return !!(t && t.indexOf(ag));
}
function Wn(r) {
  return r && r.id != null && In(r.id).indexOf(s1) === 0;
}
function g1(r, t, e) {
  M(r, function(i) {
    var n = i.newOption;
    G(n) && (i.keyInfo.mainType = t, i.keyInfo.subType = y1(t, n, i.existing, e));
  });
}
function y1(r, t, e, i) {
  var n = t.type ? t.type : e ? e.subType : i.determineSubType(r, t);
  return n;
}
function qr(r, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return N(t.dataIndex) ? V(t.dataIndex, function(e) {
      return r.indexOfRawIndex(e);
    }) : r.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return N(t.name) ? V(t.name, function(e) {
      return r.indexOfName(e);
    }) : r.indexOfName(t.name);
}
function pt() {
  var r = "__ec_inner_" + m1++;
  return function(t) {
    return t[r] || (t[r] = {});
  };
}
var m1 = ig();
function js(r, t, e) {
  var i = If(t, e), n = i.mainTypeSpecified, a = i.queryOptionMap, o = i.others, s = o, l = e ? e.defaultMainType : null;
  return !n && l && a.set(l, {}), a.each(function(u, f) {
    var h = sa(r, f, u, {
      useDefault: l === f,
      enableAll: e && e.enableAll != null ? e.enableAll : !0,
      enableNone: e && e.enableNone != null ? e.enableNone : !0
    });
    s[f + "Models"] = h.models, s[f + "Model"] = h.models[0];
  }), s;
}
function If(r, t) {
  var e;
  if (z(r)) {
    var i = {};
    i[r + "Index"] = 0, e = i;
  } else
    e = r;
  var n = Y(), a = {}, o = !1;
  return M(e, function(s, l) {
    if (l === "dataIndex" || l === "dataIndexInside") {
      a[l] = s;
      return;
    }
    var u = l.match(/^(\w+)(Index|Id|Name)$/) || [], f = u[1], h = (u[2] || "").toLowerCase();
    if (!(!f || !h || t && t.includeMainTypes && rt(t.includeMainTypes, f) < 0)) {
      o = o || !!f;
      var v = n.get(f) || n.set(f, {});
      v[h] = s;
    }
  }), {
    mainTypeSpecified: o,
    queryOptionMap: n,
    others: a
  };
}
var Gt = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
}, _1 = {
  useDefault: !1,
  enableAll: !0,
  enableNone: !0
};
function sa(r, t, e, i) {
  i = i || Gt;
  var n = e.index, a = e.id, o = e.name, s = {
    models: null,
    specified: n != null || a != null || o != null
  };
  if (!s.specified) {
    var l = void 0;
    return s.models = i.useDefault && (l = r.getComponent(t)) ? [l] : [], s;
  }
  return n === "none" || n === !1 ? (We(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), s.models = [], s) : (n === "all" && (We(i.enableAll, '`"all"` is not a valid value on index option.'), n = a = o = null), s.models = r.queryComponents({
    mainType: t,
    index: n,
    id: a,
    name: o
  }), s);
}
function sg(r, t, e) {
  r.setAttribute ? r.setAttribute(t, e) : r[t] = e;
}
function S1(r, t) {
  return r.getAttribute ? r.getAttribute(t) : r[t];
}
function w1(r) {
  return r === "auto" ? U.domSupported ? "html" : "richText" : r || "html";
}
function b1(r, t, e, i, n) {
  var a = t == null || t === "auto";
  if (i == null)
    return i;
  if (ht(i)) {
    var o = ov(e || 0, i, n);
    return wt(o, a ? Math.max(Le(e || 0), Le(i)) : t);
  } else {
    if (z(i))
      return n < 1 ? e : i;
    for (var s = [], l = e, u = i, f = Math.max(l ? l.length : 0, u.length), h = 0; h < f; ++h) {
      var v = r.getDimensionInfo(h);
      if (v && v.type === "ordinal")
        s[h] = (n < 1 && l ? l : u)[h];
      else {
        var c = l && l[h] ? l[h] : 0, p = u[h], o = ov(c, p, n);
        s[h] = wt(o, a ? Math.max(Le(c), Le(p)) : t);
      }
    }
    return s;
  }
}
var x1 = ".", xr = "___EC__COMPONENT__CONTAINER___", lg = "___EC__EXTENDED_CLASS___";
function Ie(r) {
  var t = {
    main: "",
    sub: ""
  };
  if (r) {
    var e = r.split(x1);
    t.main = e[0] || "", t.sub = e[1] || "";
  }
  return t;
}
function T1(r) {
  We(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(r), 'componentType "' + r + '" illegal');
}
function C1(r) {
  return !!(r && r[lg]);
}
function Pf(r, t) {
  r.$constructor = r, r.extend = function(e) {
    var i = this, n;
    return M1(i) ? n = /** @class */
    (function(a) {
      k(o, a);
      function o() {
        return a.apply(this, arguments) || this;
      }
      return o;
    })(i) : (n = function() {
      (e.$constructor || i).apply(this, arguments);
    }, O0(n, this)), O(n.prototype, e), n[lg] = !0, n.extend = this.extend, n.superCall = L1, n.superApply = I1, n.superClass = i, n;
  };
}
function M1(r) {
  return X(r) && /^class\s/.test(Function.prototype.toString.call(r));
}
function ug(r, t) {
  r.extend = t.extend;
}
var D1 = Math.round(Math.random() * 10);
function A1(r) {
  var t = ["__\0is_clz", D1++].join("_");
  r.prototype[t] = !0, r.isInstance = function(e) {
    return !!(e && e[t]);
  };
}
function L1(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return this.superClass.prototype[t].apply(r, e);
}
function I1(r, t, e) {
  return this.superClass.prototype[t].apply(r, e);
}
function es(r) {
  var t = {};
  r.registerClass = function(i) {
    var n = i.type || i.prototype.type;
    if (n) {
      T1(n), i.prototype.type = n;
      var a = Ie(n);
      if (!a.sub)
        t[a.main] = i;
      else if (a.sub !== xr) {
        var o = e(a);
        o[a.sub] = i;
      }
    }
    return i;
  }, r.getClass = function(i, n, a) {
    var o = t[i];
    if (o && o[xr] && (o = n ? o[n] : null), a && !o)
      throw new Error(n ? "Component " + i + "." + (n || "") + " is used but not imported." : i + ".type should be specified.");
    return o;
  }, r.getClassesByMainType = function(i) {
    var n = Ie(i), a = [], o = t[n.main];
    return o && o[xr] ? M(o, function(s, l) {
      l !== xr && a.push(s);
    }) : a.push(o), a;
  }, r.hasClass = function(i) {
    var n = Ie(i);
    return !!t[n.main];
  }, r.getAllClassMainTypes = function() {
    var i = [];
    return M(t, function(n, a) {
      i.push(a);
    }), i;
  }, r.hasSubTypes = function(i) {
    var n = Ie(i), a = t[n.main];
    return a && a[xr];
  };
  function e(i) {
    var n = t[i.main];
    return (!n || !n[xr]) && (n = t[i.main] = {}, n[xr] = !0), n;
  }
}
function Un(r, t) {
  for (var e = 0; e < r.length; e++)
    r[e][1] || (r[e][1] = r[e][0]);
  return t = t || !1, function(i, n, a) {
    for (var o = {}, s = 0; s < r.length; s++) {
      var l = r[s][1];
      if (!(n && rt(n, l) >= 0 || a && rt(a, l) < 0)) {
        var u = i.getShallow(l, t);
        u != null && (o[r[s][0]] = u);
      }
    }
    return o;
  };
}
var P1 = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], R1 = Un(P1), E1 = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getAreaStyle = function(t, e) {
      return R1(this, t, e);
    }, r;
  })()
), Du = new na(50);
function k1(r) {
  if (typeof r == "string") {
    var t = Du.get(r);
    return t && t.image;
  } else
    return r;
}
function fg(r, t, e, i, n) {
  if (r)
    if (typeof r == "string") {
      if (t && t.__zrImageSrc === r || !e)
        return t;
      var a = Du.get(r), o = { hostEl: e, cb: i, cbPayload: n };
      return a ? (t = a.image, !rs(t) && a.pending.push(o)) : (t = Gi.loadImage(r, lv, lv), t.__zrImageSrc = r, Du.put(r, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return r;
  else return t;
}
function lv() {
  var r = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < r.pending.length; t++) {
    var e = r.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  r.pending.length = 0;
}
function rs(r) {
  return r && r.width && r.height;
}
var tl = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function O1(r, t, e, i, n, a) {
  if (!e) {
    r.text = "", r.isTruncated = !1;
    return;
  }
  var o = (t + "").split(`
`);
  a = hg(e, i, n, a);
  for (var s = !1, l = {}, u = 0, f = o.length; u < f; u++)
    vg(l, o[u], a), o[u] = l.textLine, s = s || l.isTruncated;
  r.text = o.join(`
`), r.isTruncated = s;
}
function hg(r, t, e, i) {
  i = i || {};
  var n = O({}, i);
  n.font = t, e = q(e, "..."), n.maxIterations = q(i.maxIterations, 2);
  var a = n.minChar = q(i.minChar, 0);
  n.cnCharWidth = qt("国", t);
  var o = n.ascCharWidth = qt("a", t);
  n.placeholder = q(i.placeholder, "");
  for (var s = r = Math.max(0, r - 1), l = 0; l < a && s >= o; l++)
    s -= o;
  var u = qt(e, t);
  return u > s && (e = "", u = 0), s = r - u, n.ellipsis = e, n.ellipsisWidth = u, n.contentWidth = s, n.containerWidth = r, n;
}
function vg(r, t, e) {
  var i = e.containerWidth, n = e.font, a = e.contentWidth;
  if (!i) {
    r.textLine = "", r.isTruncated = !1;
    return;
  }
  var o = qt(t, n);
  if (o <= i) {
    r.textLine = t, r.isTruncated = !1;
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= a || s >= e.maxIterations) {
      t += e.ellipsis;
      break;
    }
    var l = s === 0 ? B1(t, a, e.ascCharWidth, e.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
    t = t.substr(0, l), o = qt(t, n);
  }
  t === "" && (t = e.placeholder), r.textLine = t, r.isTruncated = !0;
}
function B1(r, t, e, i) {
  for (var n = 0, a = 0, o = r.length; a < o && n < t; a++) {
    var s = r.charCodeAt(a);
    n += 0 <= s && s <= 127 ? e : i;
  }
  return a;
}
function N1(r, t) {
  r != null && (r += "");
  var e = t.overflow, i = t.padding, n = t.font, a = e === "truncate", o = Df(n), s = q(t.lineHeight, o), l = !!t.backgroundColor, u = t.lineOverflow === "truncate", f = !1, h = t.width, v;
  h != null && (e === "break" || e === "breakAll") ? v = r ? cg(r, t.font, h, e === "breakAll", 0).lines : [] : v = r ? r.split(`
`) : [];
  var c = v.length * s, p = q(t.height, c);
  if (c > p && u) {
    var d = Math.floor(p / s);
    f = f || v.length > d, v = v.slice(0, d);
  }
  if (r && a && h != null)
    for (var g = hg(h, n, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), y = {}, m = 0; m < v.length; m++)
      vg(y, v[m], g), v[m] = y.textLine, f = f || y.isTruncated;
  for (var _ = p, S = 0, m = 0; m < v.length; m++)
    S = Math.max(qt(v[m], n), S);
  h == null && (h = S);
  var b = S;
  return i && (_ += i[0] + i[2], b += i[1] + i[3], h += i[1] + i[3]), l && (b = h), {
    lines: v,
    height: p,
    outerWidth: b,
    outerHeight: _,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: S,
    contentHeight: c,
    width: h,
    isTruncated: f
  };
}
var F1 = /* @__PURE__ */ (function() {
  function r() {
  }
  return r;
})(), uv = /* @__PURE__ */ (function() {
  function r(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return r;
})(), z1 = /* @__PURE__ */ (function() {
  function r() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
  }
  return r;
})();
function V1(r, t) {
  var e = new z1();
  if (r != null && (r += ""), !r)
    return e;
  for (var i = t.width, n = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && i != null ? { width: i, accumWidth: 0, breakAll: a === "breakAll" } : null, s = tl.lastIndex = 0, l; (l = tl.exec(r)) != null; ) {
    var u = l.index;
    u > s && el(e, r.substring(s, u), t, o), el(e, l[2], t, o, l[1]), s = tl.lastIndex;
  }
  s < r.length && el(e, r.substring(s, r.length), t, o);
  var f = [], h = 0, v = 0, c = t.padding, p = a === "truncate", d = t.lineOverflow === "truncate", g = {};
  function y(W, K, j) {
    W.width = K, W.lineHeight = j, h += j, v = Math.max(v, K);
  }
  t: for (var m = 0; m < e.lines.length; m++) {
    for (var _ = e.lines[m], S = 0, b = 0, w = 0; w < _.tokens.length; w++) {
      var x = _.tokens[w], C = x.styleName && t.rich[x.styleName] || {}, D = x.textPadding = C.padding, A = D ? D[1] + D[3] : 0, T = x.font = C.font || t.font;
      x.contentHeight = Df(T);
      var L = q(C.height, x.contentHeight);
      if (x.innerHeight = L, D && (L += D[0] + D[2]), x.height = L, x.lineHeight = ro(C.lineHeight, t.lineHeight, L), x.align = C && C.align || t.align, x.verticalAlign = C && C.verticalAlign || "middle", d && n != null && h + x.lineHeight > n) {
        var I = e.lines.length;
        w > 0 ? (_.tokens = _.tokens.slice(0, w), y(_, b, S), e.lines = e.lines.slice(0, m + 1)) : e.lines = e.lines.slice(0, m), e.isTruncated = e.isTruncated || e.lines.length < I;
        break t;
      }
      var P = C.width, R = P == null || P === "auto";
      if (typeof P == "string" && P.charAt(P.length - 1) === "%")
        x.percentWidth = P, f.push(x), x.contentWidth = qt(x.text, T);
      else {
        if (R) {
          var E = C.backgroundColor, H = E && E.image;
          H && (H = k1(H), rs(H) && (x.width = Math.max(x.width, H.width * L / H.height)));
        }
        var B = p && i != null ? i - b : null;
        B != null && B < x.width ? !R || B < A ? (x.text = "", x.width = x.contentWidth = 0) : (O1(g, x.text, B - A, T, t.ellipsis, { minChar: t.truncateMinChar }), x.text = g.text, e.isTruncated = e.isTruncated || g.isTruncated, x.width = x.contentWidth = qt(x.text, T)) : x.contentWidth = qt(x.text, T);
      }
      x.width += A, b += x.width, C && (S = Math.max(S, x.lineHeight));
    }
    y(_, b, S);
  }
  e.outerWidth = e.width = q(i, v), e.outerHeight = e.height = q(n, h), e.contentHeight = h, e.contentWidth = v, c && (e.outerWidth += c[1] + c[3], e.outerHeight += c[0] + c[2]);
  for (var m = 0; m < f.length; m++) {
    var x = f[m], F = x.percentWidth;
    x.width = parseInt(F, 10) / 100 * e.width;
  }
  return e;
}
function el(r, t, e, i, n) {
  var a = t === "", o = n && e.rich[n] || {}, s = r.lines, l = o.font || e.font, u = !1, f, h;
  if (i) {
    var v = o.padding, c = v ? v[1] + v[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var p = cr(o.width, i.width) + c;
      s.length > 0 && p + i.accumWidth > i.width && (f = t.split(`
`), u = !0), i.accumWidth = p;
    } else {
      var d = cg(t, l, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = d.accumWidth + c, h = d.linesWidths, f = d.lines;
    }
  } else
    f = t.split(`
`);
  for (var g = 0; g < f.length; g++) {
    var y = f[g], m = new F1();
    if (m.styleName = n, m.text = y, m.isLineHolder = !y && !a, typeof o.width == "number" ? m.width = o.width : m.width = h ? h[g] : qt(y, l), !g && !u) {
      var _ = (s[s.length - 1] || (s[0] = new uv())).tokens, S = _.length;
      S === 1 && _[0].isLineHolder ? _[0] = m : (y || !S || a) && _.push(m);
    } else
      s.push(new uv([m]));
  }
}
function H1(r) {
  var t = r.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var G1 = Wi(",&?/;] ".split(""), function(r, t) {
  return r[t] = !0, r;
}, {});
function W1(r) {
  return H1(r) ? !!G1[r] : !0;
}
function cg(r, t, e, i, n) {
  for (var a = [], o = [], s = "", l = "", u = 0, f = 0, h = 0; h < r.length; h++) {
    var v = r.charAt(h);
    if (v === `
`) {
      l && (s += l, f += u), a.push(s), o.push(f), s = "", l = "", u = 0, f = 0;
      continue;
    }
    var c = qt(v, t), p = i ? !1 : !W1(v);
    if (a.length ? f + c > e : n + f + c > e) {
      f ? (s || l) && (p ? (s || (s = l, l = "", u = 0, f = u), a.push(s), o.push(f - u), l += v, u += c, s = "", f = u) : (l && (s += l, l = "", u = 0), a.push(s), o.push(f), s = v, f = c)) : p ? (a.push(l), o.push(u), l = v, u = c) : (a.push(v), o.push(c));
      continue;
    }
    f += c, p ? (l += v, u += c) : (l && (s += l, l = "", u = 0), s += v);
  }
  return !a.length && !s && (s = r, l = "", u = 0), l && (s += l), s && (a.push(s), o.push(f)), a.length === 1 && (f += n), {
    accumWidth: f,
    lines: a,
    linesWidths: o
  };
}
var Au = "__zr_style_" + Math.round(Math.random() * 10), Ur = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, is = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Ur[Au] = !0;
var fv = ["z", "z2", "invisible"], U1 = ["invisible"], la = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype._init = function(e) {
    for (var i = ct(e), n = 0; n < i.length; n++) {
      var a = i[n];
      a === "style" ? this.useStyle(e[a]) : r.prototype.attrKV.call(this, a, e[a]);
    }
    this.style || this.useStyle({});
  }, t.prototype.beforeBrush = function() {
  }, t.prototype.afterBrush = function() {
  }, t.prototype.innerBeforeBrush = function() {
  }, t.prototype.innerAfterBrush = function() {
  }, t.prototype.shouldBePainted = function(e, i, n, a) {
    var o = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && Y1(this, e, i) || o && !o[0] && !o[3])
      return !1;
    if (n && this.__clipPaths) {
      for (var s = 0; s < this.__clipPaths.length; ++s)
        if (this.__clipPaths[s].isZeroArea())
          return !1;
    }
    if (a && this.parent)
      for (var l = this.parent; l; ) {
        if (l.ignore)
          return !1;
        l = l.parent;
      }
    return !0;
  }, t.prototype.contain = function(e, i) {
    return this.rectContain(e, i);
  }, t.prototype.traverse = function(e, i) {
    e.call(i, this);
  }, t.prototype.rectContain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect();
    return a.contain(n[0], n[1]);
  }, t.prototype.getPaintRect = function() {
    var e = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      var i = this.transform, n = this.getBoundingRect(), a = this.style, o = a.shadowBlur || 0, s = a.shadowOffsetX || 0, l = a.shadowOffsetY || 0;
      e = this._paintRect || (this._paintRect = new it(0, 0, 0, 0)), i ? it.applyTransform(e, n, i) : e.copy(n), (o || s || l) && (e.width += o * 2 + Math.abs(s), e.height += o * 2 + Math.abs(l), e.x = Math.min(e.x, e.x + s - o), e.y = Math.min(e.y, e.y + l - o));
      var u = this.dirtyRectTolerance;
      e.isZero() || (e.x = Math.floor(e.x - u), e.y = Math.floor(e.y - u), e.width = Math.ceil(e.width + 1 + u * 2), e.height = Math.ceil(e.height + 1 + u * 2));
    }
    return e;
  }, t.prototype.setPrevPaintRect = function(e) {
    e ? (this._prevPaintRect = this._prevPaintRect || new it(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
  }, t.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, t.prototype.animateStyle = function(e) {
    return this.animate("style", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e !== "style" ? r.prototype.attrKV.call(this, e, i) : this.style ? this.setStyle(i) : this.useStyle(i);
  }, t.prototype.setStyle = function(e, i) {
    return typeof e == "string" ? this.style[e] = i : O(this.style, e), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(e) {
    e || this.markRedraw(), this.__dirty |= Sn, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & Sn);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~Sn;
  }, t.prototype.createStyle = function(e) {
    return jo(Ur, e);
  }, t.prototype.useStyle = function(e) {
    e[Au] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(e) {
    return e[Au];
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(e, i, fv);
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.style ? o ? a ? u = i.style : (u = this._mergeStyle(this.createStyle(), n.style), this._mergeStyle(u, i.style)) : (u = this._mergeStyle(this.createStyle(), a ? this.style : n.style), this._mergeStyle(u, i.style)) : l && (u = n.style), u)
      if (o) {
        var f = this.style;
        if (this.style = this.createStyle(l ? {} : f), l)
          for (var h = ct(f), v = 0; v < h.length; v++) {
            var c = h[v];
            c in u && (u[c] = u[c], this.style[c] = f[c]);
          }
        for (var p = ct(u), v = 0; v < p.length; v++) {
          var c = p[v];
          this.style[c] = this.style[c];
        }
        this._transitionState(e, {
          style: u
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(u);
    for (var d = this.__inHover ? U1 : fv, v = 0; v < d.length; v++) {
      var c = d[v];
      i && i[c] != null ? this[c] = i[c] : l && n[c] != null && (this[c] = n[c]);
    }
  }, t.prototype._mergeStates = function(e) {
    for (var i = r.prototype._mergeStates.call(this, e), n, a = 0; a < e.length; a++) {
      var o = e[a];
      o.style && (n = n || {}, this._mergeStyle(n, o.style));
    }
    return n && (i.style = n), i;
  }, t.prototype._mergeStyle = function(e, i) {
    return O(e, i), e;
  }, t.prototype.getAnimationStyleProps = function() {
    return is;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = $t | Sn;
  })(), t;
})(ts), rl = new it(0, 0, 0, 0), il = new it(0, 0, 0, 0);
function Y1(r, t, e) {
  return rl.copy(r.getBoundingRect()), r.transform && rl.applyTransform(r.transform), il.width = t, il.height = e, !rl.intersect(il);
}
var ie = Math.min, ne = Math.max, nl = Math.sin, al = Math.cos, Tr = Math.PI * 2, wa = Ui(), ba = Ui(), xa = Ui();
function hv(r, t, e, i, n, a) {
  n[0] = ie(r, e), n[1] = ie(t, i), a[0] = ne(r, e), a[1] = ne(t, i);
}
var vv = [], cv = [];
function Z1(r, t, e, i, n, a, o, s, l, u) {
  var f = Wd, h = Tt, v = f(r, e, n, o, vv);
  l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
  for (var c = 0; c < v; c++) {
    var p = h(r, e, n, o, vv[c]);
    l[0] = ie(p, l[0]), u[0] = ne(p, u[0]);
  }
  v = f(t, i, a, s, cv);
  for (var c = 0; c < v; c++) {
    var d = h(t, i, a, s, cv[c]);
    l[1] = ie(d, l[1]), u[1] = ne(d, u[1]);
  }
  l[0] = ie(r, l[0]), u[0] = ne(r, u[0]), l[0] = ie(o, l[0]), u[0] = ne(o, u[0]), l[1] = ie(t, l[1]), u[1] = ne(t, u[1]), l[1] = ie(s, l[1]), u[1] = ne(s, u[1]);
}
function X1(r, t, e, i, n, a, o, s) {
  var l = Ud, u = zt, f = ne(ie(l(r, e, n), 1), 0), h = ne(ie(l(t, i, a), 1), 0), v = u(r, e, n, f), c = u(t, i, a, h);
  o[0] = ie(r, n, v), o[1] = ie(t, a, c), s[0] = ne(r, n, v), s[1] = ne(t, a, c);
}
function $1(r, t, e, i, n, a, o, s, l) {
  var u = Ci, f = Mi, h = Math.abs(n - a);
  if (h % Tr < 1e-4 && h > 1e-4) {
    s[0] = r - e, s[1] = t - i, l[0] = r + e, l[1] = t + i;
    return;
  }
  if (wa[0] = al(n) * e + r, wa[1] = nl(n) * i + t, ba[0] = al(a) * e + r, ba[1] = nl(a) * i + t, u(s, wa, ba), f(l, wa, ba), n = n % Tr, n < 0 && (n = n + Tr), a = a % Tr, a < 0 && (a = a + Tr), n > a && !o ? a += Tr : n < a && o && (n += Tr), o) {
    var v = a;
    a = n, n = v;
  }
  for (var c = 0; c < a; c += Math.PI / 2)
    c > n && (xa[0] = al(c) * e + r, xa[1] = nl(c) * i + t, u(s, xa, s), f(l, xa, l));
}
var at = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, Cr = [], Mr = [], be = [], $e = [], xe = [], Te = [], ol = Math.min, sl = Math.max, Dr = Math.cos, Ar = Math.sin, Ne = Math.abs, Lu = Math.PI, ir = Lu * 2, ll = typeof Float32Array < "u", rn = [];
function ul(r) {
  var t = Math.round(r / Lu * 1e8) / 1e8;
  return t % 2 * Lu;
}
function q1(r, t) {
  var e = ul(r[0]);
  e < 0 && (e += ir);
  var i = e - r[0], n = r[1];
  n += i, !t && n - e >= ir ? n = e + ir : t && e - n >= ir ? n = e - ir : !t && e > n ? n = e + (ir - ul(e - n)) : t && e < n && (n = e - (ir - ul(n - e))), r[0] = e, r[1] = n;
}
var Kr = (function() {
  function r(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return r.prototype.increaseVersion = function() {
    this._version++;
  }, r.prototype.getVersion = function() {
    return this._version;
  }, r.prototype.setScale = function(t, e, i) {
    i = i || 0, i > 0 && (this._ux = Ne(i / Co / t) || 0, this._uy = Ne(i / Co / e) || 0);
  }, r.prototype.setDPR = function(t) {
    this.dpr = t;
  }, r.prototype.setContext = function(t) {
    this._ctx = t;
  }, r.prototype.getContext = function() {
    return this._ctx;
  }, r.prototype.beginPath = function() {
    return this._ctx && this._ctx.beginPath(), this.reset(), this;
  }, r.prototype.reset = function() {
    this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
  }, r.prototype.moveTo = function(t, e) {
    return this._drawPendingPt(), this.addData(at.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
  }, r.prototype.lineTo = function(t, e) {
    var i = Ne(t - this._xi), n = Ne(e - this._yi), a = i > this._ux || n > this._uy;
    if (this.addData(at.L, t, e), this._ctx && a && this._ctx.lineTo(t, e), a)
      this._xi = t, this._yi = e, this._pendingPtDist = 0;
    else {
      var o = i * i + n * n;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = e, this._pendingPtDist = o);
    }
    return this;
  }, r.prototype.bezierCurveTo = function(t, e, i, n, a, o) {
    return this._drawPendingPt(), this.addData(at.C, t, e, i, n, a, o), this._ctx && this._ctx.bezierCurveTo(t, e, i, n, a, o), this._xi = a, this._yi = o, this;
  }, r.prototype.quadraticCurveTo = function(t, e, i, n) {
    return this._drawPendingPt(), this.addData(at.Q, t, e, i, n), this._ctx && this._ctx.quadraticCurveTo(t, e, i, n), this._xi = i, this._yi = n, this;
  }, r.prototype.arc = function(t, e, i, n, a, o) {
    this._drawPendingPt(), rn[0] = n, rn[1] = a, q1(rn, o), n = rn[0], a = rn[1];
    var s = a - n;
    return this.addData(at.A, t, e, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, n, a, o), this._xi = Dr(a) * i + t, this._yi = Ar(a) * i + e, this;
  }, r.prototype.arcTo = function(t, e, i, n, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, i, n, a), this;
  }, r.prototype.rect = function(t, e, i, n) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, e, i, n), this.addData(at.R, t, e, i, n), this;
  }, r.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(at.Z);
    var t = this._ctx, e = this._x0, i = this._y0;
    return t && t.closePath(), this._xi = e, this._yi = i, this;
  }, r.prototype.fill = function(t) {
    t && t.fill(), this.toStatic();
  }, r.prototype.stroke = function(t) {
    t && t.stroke(), this.toStatic();
  }, r.prototype.len = function() {
    return this._len;
  }, r.prototype.setData = function(t) {
    var e = t.length;
    !(this.data && this.data.length === e) && ll && (this.data = new Float32Array(e));
    for (var i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }, r.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var e = t.length, i = 0, n = this._len, a = 0; a < e; a++)
      i += t[a].len();
    ll && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
    for (var a = 0; a < e; a++)
      for (var o = t[a].data, s = 0; s < o.length; s++)
        this.data[n++] = o[s];
    this._len = n;
  }, r.prototype.addData = function(t, e, i, n, a, o, s, l, u) {
    if (this._saveData) {
      var f = this.data;
      this._len + arguments.length > f.length && (this._expandData(), f = this.data);
      for (var h = 0; h < arguments.length; h++)
        f[this._len++] = arguments[h];
    }
  }, r.prototype._drawPendingPt = function() {
    this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
  }, r.prototype._expandData = function() {
    if (!(this.data instanceof Array)) {
      for (var t = [], e = 0; e < this._len; e++)
        t[e] = this.data[e];
      this.data = t;
    }
  }, r.prototype.toStatic = function() {
    if (this._saveData) {
      this._drawPendingPt();
      var t = this.data;
      t instanceof Array && (t.length = this._len, ll && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, r.prototype.getBoundingRect = function() {
    be[0] = be[1] = xe[0] = xe[1] = Number.MAX_VALUE, $e[0] = $e[1] = Te[0] = Te[1] = -Number.MAX_VALUE;
    var t = this.data, e = 0, i = 0, n = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], n = e, a = i), s) {
        case at.M:
          e = n = t[o++], i = a = t[o++], xe[0] = n, xe[1] = a, Te[0] = n, Te[1] = a;
          break;
        case at.L:
          hv(e, i, t[o], t[o + 1], xe, Te), e = t[o++], i = t[o++];
          break;
        case at.C:
          Z1(e, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], xe, Te), e = t[o++], i = t[o++];
          break;
        case at.Q:
          X1(e, i, t[o++], t[o++], t[o], t[o + 1], xe, Te), e = t[o++], i = t[o++];
          break;
        case at.A:
          var u = t[o++], f = t[o++], h = t[o++], v = t[o++], c = t[o++], p = t[o++] + c;
          o += 1;
          var d = !t[o++];
          l && (n = Dr(c) * h + u, a = Ar(c) * v + f), $1(u, f, h, v, c, p, d, xe, Te), e = Dr(p) * h + u, i = Ar(p) * v + f;
          break;
        case at.R:
          n = e = t[o++], a = i = t[o++];
          var g = t[o++], y = t[o++];
          hv(n, a, n + g, a + y, xe, Te);
          break;
        case at.Z:
          e = n, i = a;
          break;
      }
      Ci(be, be, xe), Mi($e, $e, Te);
    }
    return o === 0 && (be[0] = be[1] = $e[0] = $e[1] = 0), new it(be[0], be[1], $e[0] - be[0], $e[1] - be[1]);
  }, r.prototype._calculateLength = function() {
    var t = this.data, e = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, f = 0, h = 0, v = 0; v < e; ) {
      var c = t[v++], p = v === 1;
      p && (a = t[v], o = t[v + 1], s = a, l = o);
      var d = -1;
      switch (c) {
        case at.M:
          a = s = t[v++], o = l = t[v++];
          break;
        case at.L: {
          var g = t[v++], y = t[v++], m = g - a, _ = y - o;
          (Ne(m) > i || Ne(_) > n || v === e - 1) && (d = Math.sqrt(m * m + _ * _), a = g, o = y);
          break;
        }
        case at.C: {
          var S = t[v++], b = t[v++], g = t[v++], y = t[v++], w = t[v++], x = t[v++];
          d = S_(a, o, S, b, g, y, w, x, 10), a = w, o = x;
          break;
        }
        case at.Q: {
          var S = t[v++], b = t[v++], g = t[v++], y = t[v++];
          d = x_(a, o, S, b, g, y, 10), a = g, o = y;
          break;
        }
        case at.A:
          var C = t[v++], D = t[v++], A = t[v++], T = t[v++], L = t[v++], I = t[v++], P = I + L;
          v += 1, p && (s = Dr(L) * A + C, l = Ar(L) * T + D), d = sl(A, T) * ol(ir, Math.abs(I)), a = Dr(P) * A + C, o = Ar(P) * T + D;
          break;
        case at.R: {
          s = a = t[v++], l = o = t[v++];
          var R = t[v++], E = t[v++];
          d = R * 2 + E * 2;
          break;
        }
        case at.Z: {
          var m = s - a, _ = l - o;
          d = Math.sqrt(m * m + _ * _), a = s, o = l;
          break;
        }
      }
      d >= 0 && (u[h++] = d, f += d);
    }
    return this._pathLen = f, f;
  }, r.prototype.rebuildPath = function(t, e) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, l, u, f, h, v, c = e < 1, p, d, g = 0, y = 0, m, _ = 0, S, b;
    if (!(c && (this._pathSegLen || this._calculateLength(), p = this._pathSegLen, d = this._pathLen, m = e * d, !m)))
      t: for (var w = 0; w < o; ) {
        var x = i[w++], C = w === 1;
        switch (C && (u = i[w], f = i[w + 1], s = u, l = f), x !== at.L && _ > 0 && (t.lineTo(S, b), _ = 0), x) {
          case at.M:
            s = u = i[w++], l = f = i[w++], t.moveTo(u, f);
            break;
          case at.L: {
            h = i[w++], v = i[w++];
            var D = Ne(h - u), A = Ne(v - f);
            if (D > n || A > a) {
              if (c) {
                var T = p[y++];
                if (g + T > m) {
                  var L = (m - g) / T;
                  t.lineTo(u * (1 - L) + h * L, f * (1 - L) + v * L);
                  break t;
                }
                g += T;
              }
              t.lineTo(h, v), u = h, f = v, _ = 0;
            } else {
              var I = D * D + A * A;
              I > _ && (S = h, b = v, _ = I);
            }
            break;
          }
          case at.C: {
            var P = i[w++], R = i[w++], E = i[w++], H = i[w++], B = i[w++], F = i[w++];
            if (c) {
              var T = p[y++];
              if (g + T > m) {
                var L = (m - g) / T;
                wo(u, P, E, B, L, Cr), wo(f, R, H, F, L, Mr), t.bezierCurveTo(Cr[1], Mr[1], Cr[2], Mr[2], Cr[3], Mr[3]);
                break t;
              }
              g += T;
            }
            t.bezierCurveTo(P, R, E, H, B, F), u = B, f = F;
            break;
          }
          case at.Q: {
            var P = i[w++], R = i[w++], E = i[w++], H = i[w++];
            if (c) {
              var T = p[y++];
              if (g + T > m) {
                var L = (m - g) / T;
                bo(u, P, E, L, Cr), bo(f, R, H, L, Mr), t.quadraticCurveTo(Cr[1], Mr[1], Cr[2], Mr[2]);
                break t;
              }
              g += T;
            }
            t.quadraticCurveTo(P, R, E, H), u = E, f = H;
            break;
          }
          case at.A:
            var W = i[w++], K = i[w++], j = i[w++], ut = i[w++], vt = i[w++], yt = i[w++], he = i[w++], dr = !i[w++], ai = j > ut ? j : ut, Zt = Ne(j - ut) > 1e-3, xt = vt + yt, $ = !1;
            if (c) {
              var T = p[y++];
              g + T > m && (xt = vt + yt * (m - g) / T, $ = !0), g += T;
            }
            if (Zt && t.ellipse ? t.ellipse(W, K, j, ut, he, vt, xt, dr) : t.arc(W, K, ai, vt, xt, dr), $)
              break t;
            C && (s = Dr(vt) * j + W, l = Ar(vt) * ut + K), u = Dr(xt) * j + W, f = Ar(xt) * ut + K;
            break;
          case at.R:
            s = u = i[w], l = f = i[w + 1], h = i[w++], v = i[w++];
            var tt = i[w++], gr = i[w++];
            if (c) {
              var T = p[y++];
              if (g + T > m) {
                var It = m - g;
                t.moveTo(h, v), t.lineTo(h + ol(It, tt), v), It -= tt, It > 0 && t.lineTo(h + tt, v + ol(It, gr)), It -= gr, It > 0 && t.lineTo(h + sl(tt - It, 0), v + gr), It -= tt, It > 0 && t.lineTo(h, v + sl(gr - It, 0));
                break t;
              }
              g += T;
            }
            t.rect(h, v, tt, gr);
            break;
          case at.Z:
            if (c) {
              var T = p[y++];
              if (g + T > m) {
                var L = (m - g) / T;
                t.lineTo(u * (1 - L) + s * L, f * (1 - L) + l * L);
                break t;
              }
              g += T;
            }
            t.closePath(), u = s, f = l;
        }
      }
  }, r.prototype.clone = function() {
    var t = new r(), e = this.data;
    return t.data = e.slice ? e.slice() : Array.prototype.slice.call(e), t._len = this._len, t;
  }, r.CMD = at, r.initDefaultProps = (function() {
    var t = r.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  })(), r;
})();
function fi(r, t, e, i, n, a, o) {
  if (n === 0)
    return !1;
  var s = n, l = 0, u = r;
  if (o > t + s && o > i + s || o < t - s && o < i - s || a > r + s && a > e + s || a < r - s && a < e - s)
    return !1;
  if (r !== e)
    l = (t - i) / (r - e), u = (r * i - e * t) / (r - e);
  else
    return Math.abs(a - r) <= s / 2;
  var f = l * a - o + u, h = f * f / (l * l + 1);
  return h <= s / 2 * s / 2;
}
function K1(r, t, e, i, n, a, o, s, l, u, f) {
  if (l === 0)
    return !1;
  var h = l;
  if (f > t + h && f > i + h && f > a + h && f > s + h || f < t - h && f < i - h && f < a - h && f < s - h || u > r + h && u > e + h && u > n + h && u > o + h || u < r - h && u < e - h && u < n - h && u < o - h)
    return !1;
  var v = __(r, t, e, i, n, a, o, s, u, f);
  return v <= h / 2;
}
function Q1(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  if (l > t + u && l > i + u && l > a + u || l < t - u && l < i - u && l < a - u || s > r + u && s > e + u && s > n + u || s < r - u && s < e - u && s < n - u)
    return !1;
  var f = b_(r, t, e, i, n, a, s, l);
  return f <= u / 2;
}
var pv = Math.PI * 2;
function Ta(r) {
  return r %= pv, r < 0 && (r += pv), r;
}
var nn = Math.PI * 2;
function J1(r, t, e, i, n, a, o, s, l) {
  if (o === 0)
    return !1;
  var u = o;
  s -= r, l -= t;
  var f = Math.sqrt(s * s + l * l);
  if (f - u > e || f + u < e)
    return !1;
  if (Math.abs(i - n) % nn < 1e-4)
    return !0;
  if (a) {
    var h = i;
    i = Ta(n), n = Ta(h);
  } else
    i = Ta(i), n = Ta(n);
  i > n && (n += nn);
  var v = Math.atan2(l, s);
  return v < 0 && (v += nn), v >= i && v <= n || v + nn >= i && v + nn <= n;
}
function Lr(r, t, e, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var l = o * (e - r) + r;
  return l === n ? 1 / 0 : l > n ? s : 0;
}
var qe = Kr.CMD, Ir = Math.PI * 2, j1 = 1e-4;
function tS(r, t) {
  return Math.abs(r - t) < j1;
}
var Pt = [-1, -1, -1], ee = [-1, -1];
function eS() {
  var r = ee[0];
  ee[0] = ee[1], ee[1] = r;
}
function rS(r, t, e, i, n, a, o, s, l, u) {
  if (u > t && u > i && u > a && u > s || u < t && u < i && u < a && u < s)
    return 0;
  var f = So(t, i, a, s, u, Pt);
  if (f === 0)
    return 0;
  for (var h = 0, v = -1, c = void 0, p = void 0, d = 0; d < f; d++) {
    var g = Pt[d], y = g === 0 || g === 1 ? 0.5 : 1, m = Tt(r, e, n, o, g);
    m < l || (v < 0 && (v = Wd(t, i, a, s, ee), ee[1] < ee[0] && v > 1 && eS(), c = Tt(t, i, a, s, ee[0]), v > 1 && (p = Tt(t, i, a, s, ee[1]))), v === 2 ? g < ee[0] ? h += c < t ? y : -y : g < ee[1] ? h += p < c ? y : -y : h += s < p ? y : -y : g < ee[0] ? h += c < t ? y : -y : h += s < c ? y : -y);
  }
  return h;
}
function iS(r, t, e, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var l = w_(t, i, a, s, Pt);
  if (l === 0)
    return 0;
  var u = Ud(t, i, a);
  if (u >= 0 && u <= 1) {
    for (var f = 0, h = zt(t, i, a, u), v = 0; v < l; v++) {
      var c = Pt[v] === 0 || Pt[v] === 1 ? 0.5 : 1, p = zt(r, e, n, Pt[v]);
      p < o || (Pt[v] < u ? f += h < t ? c : -c : f += a < h ? c : -c);
    }
    return f;
  } else {
    var c = Pt[0] === 0 || Pt[0] === 1 ? 0.5 : 1, p = zt(r, e, n, Pt[0]);
    return p < o ? 0 : a < t ? c : -c;
  }
}
function nS(r, t, e, i, n, a, o, s) {
  if (s -= t, s > e || s < -e)
    return 0;
  var l = Math.sqrt(e * e - s * s);
  Pt[0] = -l, Pt[1] = l;
  var u = Math.abs(i - n);
  if (u < 1e-4)
    return 0;
  if (u >= Ir - 1e-4) {
    i = 0, n = Ir;
    var f = a ? 1 : -1;
    return o >= Pt[0] + r && o <= Pt[1] + r ? f : 0;
  }
  if (i > n) {
    var h = i;
    i = n, n = h;
  }
  i < 0 && (i += Ir, n += Ir);
  for (var v = 0, c = 0; c < 2; c++) {
    var p = Pt[c];
    if (p + r > o) {
      var d = Math.atan2(s, p), f = a ? 1 : -1;
      d < 0 && (d = Ir + d), (d >= i && d <= n || d + Ir >= i && d + Ir <= n) && (d > Math.PI / 2 && d < Math.PI * 1.5 && (f = -f), v += f);
    }
  }
  return v;
}
function pg(r, t, e, i, n) {
  for (var a = r.data, o = r.len(), s = 0, l = 0, u = 0, f = 0, h = 0, v, c, p = 0; p < o; ) {
    var d = a[p++], g = p === 1;
    switch (d === qe.M && p > 1 && (e || (s += Lr(l, u, f, h, i, n))), g && (l = a[p], u = a[p + 1], f = l, h = u), d) {
      case qe.M:
        f = a[p++], h = a[p++], l = f, u = h;
        break;
      case qe.L:
        if (e) {
          if (fi(l, u, a[p], a[p + 1], t, i, n))
            return !0;
        } else
          s += Lr(l, u, a[p], a[p + 1], i, n) || 0;
        l = a[p++], u = a[p++];
        break;
      case qe.C:
        if (e) {
          if (K1(l, u, a[p++], a[p++], a[p++], a[p++], a[p], a[p + 1], t, i, n))
            return !0;
        } else
          s += rS(l, u, a[p++], a[p++], a[p++], a[p++], a[p], a[p + 1], i, n) || 0;
        l = a[p++], u = a[p++];
        break;
      case qe.Q:
        if (e) {
          if (Q1(l, u, a[p++], a[p++], a[p], a[p + 1], t, i, n))
            return !0;
        } else
          s += iS(l, u, a[p++], a[p++], a[p], a[p + 1], i, n) || 0;
        l = a[p++], u = a[p++];
        break;
      case qe.A:
        var y = a[p++], m = a[p++], _ = a[p++], S = a[p++], b = a[p++], w = a[p++];
        p += 1;
        var x = !!(1 - a[p++]);
        v = Math.cos(b) * _ + y, c = Math.sin(b) * S + m, g ? (f = v, h = c) : s += Lr(l, u, v, c, i, n);
        var C = (i - y) * S / _ + y;
        if (e) {
          if (J1(y, m, S, b, b + w, x, t, C, n))
            return !0;
        } else
          s += nS(y, m, S, b, b + w, x, C, n);
        l = Math.cos(b + w) * _ + y, u = Math.sin(b + w) * S + m;
        break;
      case qe.R:
        f = l = a[p++], h = u = a[p++];
        var D = a[p++], A = a[p++];
        if (v = f + D, c = h + A, e) {
          if (fi(f, h, v, h, t, i, n) || fi(v, h, v, c, t, i, n) || fi(v, c, f, c, t, i, n) || fi(f, c, f, h, t, i, n))
            return !0;
        } else
          s += Lr(v, h, v, c, i, n), s += Lr(f, c, f, h, i, n);
        break;
      case qe.Z:
        if (e) {
          if (fi(l, u, f, h, t, i, n))
            return !0;
        } else
          s += Lr(l, u, f, h, i, n);
        l = f, u = h;
        break;
    }
  }
  return !e && !tS(u, h) && (s += Lr(l, u, f, h, i, n) || 0), s !== 0;
}
function aS(r, t, e) {
  return pg(r, 0, !1, t, e);
}
function oS(r, t, e, i) {
  return pg(r, t, !0, e, i);
}
var dg = st({
  fill: "#000",
  stroke: null,
  strokePercent: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  lineDashOffset: 0,
  lineWidth: 1,
  lineCap: "butt",
  miterLimit: 10,
  strokeNoScale: !1,
  strokeFirst: !1
}, Ur), sS = {
  style: st({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, is.style)
}, fl = Gn.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), nt = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.update = function() {
    var e = this;
    r.prototype.update.call(this);
    var i = this.style;
    if (i.decal) {
      var n = this._decalEl = this._decalEl || new t();
      n.buildPath === t.prototype.buildPath && (n.buildPath = function(l) {
        e.buildPath(l, e.shape);
      }), n.silent = !0;
      var a = n.style;
      for (var o in i)
        a[o] !== i[o] && (a[o] = i[o]);
      a.fill = i.fill ? i.decal : null, a.decal = null, a.shadowColor = null, i.strokeFirst && (a.stroke = null);
      for (var s = 0; s < fl.length; ++s)
        n[fl[s]] = this[fl[s]];
      n.__dirty |= $t;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(e) {
    var i = ct(e);
    this.shape = this.getDefaultShape();
    var n = this.getDefaultStyle();
    n && this.useStyle(n);
    for (var a = 0; a < i.length; a++) {
      var o = i[a], s = e[o];
      o === "style" ? this.style ? O(this.style, s) : this.useStyle(s) : o === "shape" ? O(this.shape, s) : r.prototype.attrKV.call(this, o, s);
    }
    this.style || this.useStyle({});
  }, t.prototype.getDefaultStyle = function() {
    return null;
  }, t.prototype.getDefaultShape = function() {
    return {};
  }, t.prototype.canBeInsideText = function() {
    return this.hasFill();
  }, t.prototype.getInsideTextFill = function() {
    var e = this.style.fill;
    if (e !== "none") {
      if (z(e)) {
        var i = To(e, 0);
        return i > 0.5 ? Tu : i > 0.2 ? W_ : Cu;
      } else if (e)
        return Cu;
    }
    return Tu;
  }, t.prototype.getInsideTextStroke = function(e) {
    var i = this.style.fill;
    if (z(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = To(e, 0) < xu;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(e, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~bi;
  }, t.prototype.getUpdatedPathProxy = function(e) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new Kr(!1);
  }, t.prototype.hasStroke = function() {
    var e = this.style, i = e.stroke;
    return !(i == null || i === "none" || !(e.lineWidth > 0));
  }, t.prototype.hasFill = function() {
    var e = this.style, i = e.fill;
    return i != null && i !== "none";
  }, t.prototype.getBoundingRect = function() {
    var e = this._rect, i = this.style, n = !e;
    if (n) {
      var a = !1;
      this.path || (a = !0, this.createPathProxy());
      var o = this.path;
      (a || this.__dirty & bi) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), e = o.getBoundingRect();
    }
    if (this._rect = e, this.hasStroke() && this.path && this.path.len() > 0) {
      var s = this._rectStroke || (this._rectStroke = e.clone());
      if (this.__dirty || n) {
        s.copy(e);
        var l = i.strokeNoScale ? this.getLineScale() : 1, u = i.lineWidth;
        if (!this.hasFill()) {
          var f = this.strokeContainThreshold;
          u = Math.max(u, f ?? 4);
        }
        l > 1e-10 && (s.width += u / l, s.height += u / l, s.x -= u / l / 2, s.y -= u / l / 2);
      }
      return s;
    }
    return e;
  }, t.prototype.contain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect(), o = this.style;
    if (e = n[0], i = n[1], a.contain(e, i)) {
      var s = this.path;
      if (this.hasStroke()) {
        var l = o.lineWidth, u = o.strokeNoScale ? this.getLineScale() : 1;
        if (u > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), oS(s, l / u, e, i)))
          return !0;
      }
      if (this.hasFill())
        return aS(s, e, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= bi, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
  }, t.prototype.dirty = function() {
    this.dirtyStyle(), this.dirtyShape();
  }, t.prototype.animateShape = function(e) {
    return this.animate("shape", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : e === "shape" ? this.dirtyShape() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e === "shape" ? this.setShape(i) : r.prototype.attrKV.call(this, e, i);
  }, t.prototype.setShape = function(e, i) {
    var n = this.shape;
    return n || (n = this.shape = {}), typeof e == "string" ? n[e] = i : O(n, e), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & bi);
  }, t.prototype.createStyle = function(e) {
    return jo(dg, e);
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.shape && !i.shape && (i.shape = O({}, this.shape));
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var l = !(i && a), u;
    if (i && i.shape ? o ? a ? u = i.shape : (u = O({}, n.shape), O(u, i.shape)) : (u = O({}, a ? this.shape : n.shape), O(u, i.shape)) : l && (u = n.shape), u)
      if (o) {
        this.shape = O({}, this.shape);
        for (var f = {}, h = ct(u), v = 0; v < h.length; v++) {
          var c = h[v];
          typeof u[c] == "object" ? this.shape[c] = u[c] : f[c] = u[c];
        }
        this._transitionState(e, {
          shape: f
        }, s);
      } else
        this.shape = u, this.dirtyShape();
  }, t.prototype._mergeStates = function(e) {
    for (var i = r.prototype._mergeStates.call(this, e), n, a = 0; a < e.length; a++) {
      var o = e[a];
      o.shape && (n = n || {}, this._mergeStyle(n, o.shape));
    }
    return n && (i.shape = n), i;
  }, t.prototype.getAnimationStyleProps = function() {
    return sS;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(e) {
    var i = (function(a) {
      k(o, a);
      function o(s) {
        var l = a.call(this, s) || this;
        return e.init && e.init.call(l, s), l;
      }
      return o.prototype.getDefaultStyle = function() {
        return Q(e.style);
      }, o.prototype.getDefaultShape = function() {
        return Q(e.shape);
      }, o;
    })(t);
    for (var n in e)
      typeof e[n] == "function" && (i.prototype[n] = e[n]);
    return i;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = $t | Sn | bi;
  })(), t;
})(la), lS = st({
  strokeFirst: !0,
  font: Xr,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, dg), Lo = (function(r) {
  k(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.hasStroke = function() {
    var e = this.style, i = e.stroke;
    return i != null && i !== "none" && e.lineWidth > 0;
  }, t.prototype.hasFill = function() {
    var e = this.style, i = e.fill;
    return i != null && i !== "none";
  }, t.prototype.createStyle = function(e) {
    return jo(lS, e);
  }, t.prototype.setBoundingRect = function(e) {
    this._rect = e;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    if (!this._rect) {
      var i = e.text;
      i != null ? i += "" : i = "";
      var n = Mf(i, e.font, e.textAlign, e.textBaseline);
      if (n.x += e.x || 0, n.y += e.y || 0, this.hasStroke()) {
        var a = e.lineWidth;
        n.x -= a / 2, n.y -= a / 2, n.width += a, n.height += a;
      }
      this._rect = n;
    }
    return this._rect;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.dirtyRectTolerance = 10;
  })(), t;
})(la);
Lo.prototype.type = "tspan";
var uS = st({
  x: 0,
  y: 0
}, Ur), fS = {
  style: st({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, is.style)
};
function hS(r) {
  return !!(r && typeof r != "string" && r.width && r.height);
}
var pr = (function(r) {
  k(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(e) {
    return jo(uS, e);
  }, t.prototype._getSize = function(e) {
    var i = this.style, n = i[e];
    if (n != null)
      return n;
    var a = hS(i.image) ? i.image : this.__image;
    if (!a)
      return 0;
    var o = e === "width" ? "height" : "width", s = i[o];
    return s == null ? a[e] : a[e] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return fS;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    return this._rect || (this._rect = new it(e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
})(la);
pr.prototype.type = "image";
function vS(r, t) {
  var e = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, l, u, f;
  n < 0 && (e = e + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = l = u = f = o : o instanceof Array ? o.length === 1 ? s = l = u = f = o[0] : o.length === 2 ? (s = u = o[0], l = f = o[1]) : o.length === 3 ? (s = o[0], l = f = o[1], u = o[2]) : (s = o[0], l = o[1], u = o[2], f = o[3]) : s = l = u = f = 0;
  var h;
  s + l > n && (h = s + l, s *= n / h, l *= n / h), u + f > n && (h = u + f, u *= n / h, f *= n / h), l + u > a && (h = l + u, l *= a / h, u *= a / h), s + f > a && (h = s + f, s *= a / h, f *= a / h), r.moveTo(e + s, i), r.lineTo(e + n - l, i), l !== 0 && r.arc(e + n - l, i + l, l, -Math.PI / 2, 0), r.lineTo(e + n, i + a - u), u !== 0 && r.arc(e + n - u, i + a - u, u, 0, Math.PI / 2), r.lineTo(e + f, i + a), f !== 0 && r.arc(e + f, i + a - f, f, Math.PI / 2, Math.PI), r.lineTo(e, i + s), s !== 0 && r.arc(e + s, i + s, s, Math.PI, Math.PI * 1.5);
}
var Ai = Math.round;
function gg(r, t, e) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    r.x1 = i, r.x2 = n, r.y1 = a, r.y2 = o;
    var s = e && e.lineWidth;
    return s && (Ai(i * 2) === Ai(n * 2) && (r.x1 = r.x2 = Hr(i, s, !0)), Ai(a * 2) === Ai(o * 2) && (r.y1 = r.y2 = Hr(a, s, !0))), r;
  }
}
function yg(r, t, e) {
  if (t) {
    var i = t.x, n = t.y, a = t.width, o = t.height;
    r.x = i, r.y = n, r.width = a, r.height = o;
    var s = e && e.lineWidth;
    return s && (r.x = Hr(i, s, !0), r.y = Hr(n, s, !0), r.width = Math.max(Hr(i + a, s, !1) - r.x, a === 0 ? 0 : 1), r.height = Math.max(Hr(n + o, s, !1) - r.y, o === 0 ? 0 : 1)), r;
  }
}
function Hr(r, t, e) {
  if (!t)
    return r;
  var i = Ai(r * 2);
  return (i + Ai(t)) % 2 === 0 ? i / 2 : (i + (e ? 1 : -1)) / 2;
}
var cS = /* @__PURE__ */ (function() {
  function r() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return r;
})(), pS = {}, dt = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new cS();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = yg(pS, i, this.style);
      n = l.x, a = l.y, o = l.width, s = l.height, l.r = i.r, i = l;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? vS(e, i) : e.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
})(nt);
dt.prototype.type = "rect";
var dv = {
  fill: "#000"
}, gv = 2, dS = {
  style: st({
    fill: !0,
    stroke: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineWidth: !0,
    fontSize: !0,
    lineHeight: !0,
    width: !0,
    height: !0,
    textShadowColor: !0,
    textShadowBlur: !0,
    textShadowOffsetX: !0,
    textShadowOffsetY: !0,
    backgroundColor: !0,
    padding: !0,
    borderColor: !0,
    borderWidth: !0,
    borderRadius: !0
  }, is.style)
}, kt = (function(r) {
  k(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.type = "text", i._children = [], i._defaultStyle = dv, i.attr(e), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.update = function() {
    r.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
    for (var e = 0; e < this._children.length; e++) {
      var i = this._children[e];
      i.zlevel = this.zlevel, i.z = this.z, i.z2 = this.z2, i.culling = this.culling, i.cursor = this.cursor, i.invisible = this.invisible;
    }
  }, t.prototype.updateTransform = function() {
    var e = this.innerTransformable;
    e ? (e.updateTransform(), e.transform && (this.transform = e.transform)) : r.prototype.updateTransform.call(this);
  }, t.prototype.getLocalTransform = function(e) {
    var i = this.innerTransformable;
    return i ? i.getLocalTransform(e) : r.prototype.getLocalTransform.call(this, e);
  }, t.prototype.getComputedTransform = function() {
    return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), r.prototype.getComputedTransform.call(this);
  }, t.prototype._updateSubTexts = function() {
    this._childCursor = 0, SS(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
  }, t.prototype.addSelfToZr = function(e) {
    r.prototype.addSelfToZr.call(this, e);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = e;
  }, t.prototype.removeSelfFromZr = function(e) {
    r.prototype.removeSelfFromZr.call(this, e);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = null;
  }, t.prototype.getBoundingRect = function() {
    if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
      for (var e = new it(0, 0, 0, 0), i = this._children, n = [], a = null, o = 0; o < i.length; o++) {
        var s = i[o], l = s.getBoundingRect(), u = s.getLocalTransform(n);
        u ? (e.copy(l), e.applyTransform(u), a = a || e.clone(), a.union(e)) : (a = a || l.clone(), a.union(l));
      }
      this._rect = a || e;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(e) {
    this._defaultStyle = e || dv;
  }, t.prototype.setTextContent = function(e) {
  }, t.prototype._mergeStyle = function(e, i) {
    if (!i)
      return e;
    var n = i.rich, a = e.rich || n && {};
    return O(e, i), n && a ? (this._mergeRich(a, n), e.rich = a) : a && (e.rich = a), e;
  }, t.prototype._mergeRich = function(e, i) {
    for (var n = ct(i), a = 0; a < n.length; a++) {
      var o = n[a];
      e[o] = e[o] || {}, O(e[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return dS;
  }, t.prototype._getOrCreateChild = function(e) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof e)) && (i = new e()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var e = this.style, i = e.font || Xr, n = e.padding, a = xv(e), o = N1(a, e), s = hl(e), l = !!e.backgroundColor, u = o.outerHeight, f = o.outerWidth, h = o.contentWidth, v = o.lines, c = o.lineHeight, p = this._defaultStyle;
    this.isTruncated = !!o.isTruncated;
    var d = e.x || 0, g = e.y || 0, y = e.align || p.align || "left", m = e.verticalAlign || p.verticalAlign || "top", _ = d, S = xi(g, o.contentHeight, m);
    if (s || n) {
      var b = bn(d, f, y), w = xi(g, u, m);
      s && this._renderBackground(e, e, b, w, f, u);
    }
    S += c / 2, n && (_ = bv(d, y, n), m === "top" ? S += n[0] : m === "bottom" && (S -= n[2]));
    for (var x = 0, C = !1, D = wv("fill" in e ? e.fill : (C = !0, p.fill)), A = Sv("stroke" in e ? e.stroke : !l && (!p.autoStroke || C) ? (x = gv, p.stroke) : null), T = e.textShadowBlur > 0, L = e.width != null && (e.overflow === "truncate" || e.overflow === "break" || e.overflow === "breakAll"), I = o.calculatedLineHeight, P = 0; P < v.length; P++) {
      var R = this._getOrCreateChild(Lo), E = R.createStyle();
      R.useStyle(E), E.text = v[P], E.x = _, E.y = S, E.textAlign = y, E.textBaseline = "middle", E.opacity = e.opacity, E.strokeFirst = !0, T && (E.shadowBlur = e.textShadowBlur || 0, E.shadowColor = e.textShadowColor || "transparent", E.shadowOffsetX = e.textShadowOffsetX || 0, E.shadowOffsetY = e.textShadowOffsetY || 0), E.stroke = A, E.fill = D, A && (E.lineWidth = e.lineWidth || x, E.lineDash = e.lineDash, E.lineDashOffset = e.lineDashOffset || 0), E.font = i, mv(E, e), S += c, L && R.setBoundingRect(new it(bn(E.x, h, E.textAlign), xi(E.y, I, E.textBaseline), h, I));
    }
  }, t.prototype._updateRichTexts = function() {
    var e = this.style, i = xv(e), n = V1(i, e), a = n.width, o = n.outerWidth, s = n.outerHeight, l = e.padding, u = e.x || 0, f = e.y || 0, h = this._defaultStyle, v = e.align || h.align, c = e.verticalAlign || h.verticalAlign;
    this.isTruncated = !!n.isTruncated;
    var p = bn(u, o, v), d = xi(f, s, c), g = p, y = d;
    l && (g += l[3], y += l[0]);
    var m = g + a;
    hl(e) && this._renderBackground(e, e, p, d, o, s);
    for (var _ = !!e.backgroundColor, S = 0; S < n.lines.length; S++) {
      for (var b = n.lines[S], w = b.tokens, x = w.length, C = b.lineHeight, D = b.width, A = 0, T = g, L = m, I = x - 1, P = void 0; A < x && (P = w[A], !P.align || P.align === "left"); )
        this._placeToken(P, e, C, y, T, "left", _), D -= P.width, T += P.width, A++;
      for (; I >= 0 && (P = w[I], P.align === "right"); )
        this._placeToken(P, e, C, y, L, "right", _), D -= P.width, L -= P.width, I--;
      for (T += (a - (T - g) - (m - L) - D) / 2; A <= I; )
        P = w[A], this._placeToken(P, e, C, y, T + P.width / 2, "center", _), T += P.width, A++;
      y += C;
    }
  }, t.prototype._placeToken = function(e, i, n, a, o, s, l) {
    var u = i.rich[e.styleName] || {};
    u.text = e.text;
    var f = e.verticalAlign, h = a + n / 2;
    f === "top" ? h = a + e.height / 2 : f === "bottom" && (h = a + n - e.height / 2);
    var v = !e.isLineHolder && hl(u);
    v && this._renderBackground(u, i, s === "right" ? o - e.width : s === "center" ? o - e.width / 2 : o, h - e.height / 2, e.width, e.height);
    var c = !!u.backgroundColor, p = e.textPadding;
    p && (o = bv(o, s, p), h -= e.height / 2 - p[0] - e.innerHeight / 2);
    var d = this._getOrCreateChild(Lo), g = d.createStyle();
    d.useStyle(g);
    var y = this._defaultStyle, m = !1, _ = 0, S = wv("fill" in u ? u.fill : "fill" in i ? i.fill : (m = !0, y.fill)), b = Sv("stroke" in u ? u.stroke : "stroke" in i ? i.stroke : !c && !l && (!y.autoStroke || m) ? (_ = gv, y.stroke) : null), w = u.textShadowBlur > 0 || i.textShadowBlur > 0;
    g.text = e.text, g.x = o, g.y = h, w && (g.shadowBlur = u.textShadowBlur || i.textShadowBlur || 0, g.shadowColor = u.textShadowColor || i.textShadowColor || "transparent", g.shadowOffsetX = u.textShadowOffsetX || i.textShadowOffsetX || 0, g.shadowOffsetY = u.textShadowOffsetY || i.textShadowOffsetY || 0), g.textAlign = s, g.textBaseline = "middle", g.font = e.font || Xr, g.opacity = ro(u.opacity, i.opacity, 1), mv(g, u), b && (g.lineWidth = ro(u.lineWidth, i.lineWidth, _), g.lineDash = q(u.lineDash, i.lineDash), g.lineDashOffset = i.lineDashOffset || 0, g.stroke = b), S && (g.fill = S);
    var x = e.contentWidth, C = e.contentHeight;
    d.setBoundingRect(new it(bn(g.x, x, g.textAlign), xi(g.y, C, g.textBaseline), x, C));
  }, t.prototype._renderBackground = function(e, i, n, a, o, s) {
    var l = e.backgroundColor, u = e.borderWidth, f = e.borderColor, h = l && l.image, v = l && !h, c = e.borderRadius, p = this, d, g;
    if (v || e.lineHeight || u && f) {
      d = this._getOrCreateChild(dt), d.useStyle(d.createStyle()), d.style.fill = null;
      var y = d.shape;
      y.x = n, y.y = a, y.width = o, y.height = s, y.r = c, d.dirtyShape();
    }
    if (v) {
      var m = d.style;
      m.fill = l || null, m.fillOpacity = q(e.fillOpacity, 1);
    } else if (h) {
      g = this._getOrCreateChild(pr), g.onload = function() {
        p.dirtyStyle();
      };
      var _ = g.style;
      _.image = l.image, _.x = n, _.y = a, _.width = o, _.height = s;
    }
    if (u && f) {
      var m = d.style;
      m.lineWidth = u, m.stroke = f, m.strokeOpacity = q(e.strokeOpacity, 1), m.lineDash = e.borderDash, m.lineDashOffset = e.borderDashOffset || 0, d.strokeContainThreshold = 0, d.hasFill() && d.hasStroke() && (m.strokeFirst = !0, m.lineWidth *= 2);
    }
    var S = (d || g).style;
    S.shadowBlur = e.shadowBlur || 0, S.shadowColor = e.shadowColor || "transparent", S.shadowOffsetX = e.shadowOffsetX || 0, S.shadowOffsetY = e.shadowOffsetY || 0, S.opacity = ro(e.opacity, i.opacity, 1);
  }, t.makeFont = function(e) {
    var i = "";
    return _S(e) && (i = [
      e.fontStyle,
      e.fontWeight,
      mS(e.fontSize),
      e.fontFamily || "sans-serif"
    ].join(" ")), i && Ae(i) || e.textFont || e.font;
  }, t;
})(la), gS = { left: !0, right: 1, center: 1 }, yS = { top: 1, bottom: 1, middle: 1 }, yv = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function mS(r) {
  return typeof r == "string" && (r.indexOf("px") !== -1 || r.indexOf("rem") !== -1 || r.indexOf("em") !== -1) ? r : isNaN(+r) ? pf + "px" : r + "px";
}
function mv(r, t) {
  for (var e = 0; e < yv.length; e++) {
    var i = yv[e], n = t[i];
    n != null && (r[i] = n);
  }
}
function _S(r) {
  return r.fontSize != null || r.fontFamily || r.fontWeight;
}
function SS(r) {
  return _v(r), M(r.rich, _v), r;
}
function _v(r) {
  if (r) {
    r.font = kt.makeFont(r);
    var t = r.align;
    t === "middle" && (t = "center"), r.align = t == null || gS[t] ? t : "left";
    var e = r.verticalAlign;
    e === "center" && (e = "middle"), r.verticalAlign = e == null || yS[e] ? e : "top";
    var i = r.padding;
    i && (r.padding = Pd(r.padding));
  }
}
function Sv(r, t) {
  return r == null || t <= 0 || r === "transparent" || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function wv(r) {
  return r == null || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function bv(r, t, e) {
  return t === "right" ? r - e[1] : t === "center" ? r + e[3] / 2 - e[1] / 2 : r + e[3];
}
function xv(r) {
  var t = r.text;
  return t != null && (t += ""), t;
}
function hl(r) {
  return !!(r.backgroundColor || r.lineHeight || r.borderWidth && r.borderColor);
}
var et = pt(), wS = function(r, t, e, i) {
  if (i) {
    var n = et(i);
    n.dataIndex = e, n.dataType = t, n.seriesIndex = r, n.ssrType = "chart", i.type === "group" && i.traverse(function(a) {
      var o = et(a);
      o.seriesIndex = r, o.dataIndex = e, o.dataType = t, o.ssrType = "chart";
    });
  }
}, Tv = 1, Cv = {}, mg = pt(), Rf = pt(), Ef = 0, ns = 1, as = 2, le = ["emphasis", "blur", "select"], Mv = ["normal", "emphasis", "blur", "select"], bS = 10, xS = 9, Yr = "highlight", uo = "downplay", Pn = "select", fo = "unselect", Rn = "toggleSelect";
function hi(r) {
  return r != null && r !== "none";
}
function os(r, t, e) {
  r.onHoverStateChange && (r.hoverState || 0) !== e && r.onHoverStateChange(t), r.hoverState = e;
}
function _g(r) {
  os(r, "emphasis", as);
}
function Sg(r) {
  r.hoverState === as && os(r, "normal", Ef);
}
function kf(r) {
  os(r, "blur", ns);
}
function wg(r) {
  r.hoverState === ns && os(r, "normal", Ef);
}
function TS(r) {
  r.selected = !0;
}
function CS(r) {
  r.selected = !1;
}
function Dv(r, t, e) {
  t(r, e);
}
function Ze(r, t, e) {
  Dv(r, t, e), r.isGroup && r.traverse(function(i) {
    Dv(i, t, e);
  });
}
function Av(r, t) {
  switch (t) {
    case "emphasis":
      r.hoverState = as;
      break;
    case "normal":
      r.hoverState = Ef;
      break;
    case "blur":
      r.hoverState = ns;
      break;
    case "select":
      r.selected = !0;
  }
}
function MS(r, t, e, i) {
  for (var n = r.style, a = {}, o = 0; o < t.length; o++) {
    var s = t[o], l = n[s];
    a[s] = l ?? (i && i[s]);
  }
  for (var o = 0; o < r.animators.length; o++) {
    var u = r.animators[o];
    u.__fromStateTransition && u.__fromStateTransition.indexOf(e) < 0 && u.targetName === "style" && u.saveTo(a, t);
  }
  return a;
}
function DS(r, t, e, i) {
  var n = e && rt(e, "select") >= 0, a = !1;
  if (r instanceof nt) {
    var o = mg(r), s = n && o.selectFill || o.normalFill, l = n && o.selectStroke || o.normalStroke;
    if (hi(s) || hi(l)) {
      i = i || {};
      var u = i.style || {};
      u.fill === "inherit" ? (a = !0, i = O({}, i), u = O({}, u), u.fill = s) : !hi(u.fill) && hi(s) ? (a = !0, i = O({}, i), u = O({}, u), u.fill = Zh(s)) : !hi(u.stroke) && hi(l) && (a || (i = O({}, i), u = O({}, u)), u.stroke = Zh(l)), i.style = u;
    }
  }
  if (i && i.z2 == null) {
    a || (i = O({}, i));
    var f = r.z2EmphasisLift;
    i.z2 = r.z2 + (f ?? bS);
  }
  return i;
}
function AS(r, t, e) {
  if (e && e.z2 == null) {
    e = O({}, e);
    var i = r.z2SelectLift;
    e.z2 = r.z2 + (i ?? xS);
  }
  return e;
}
function LS(r, t, e) {
  var i = rt(r.currentStates, t) >= 0, n = r.style.opacity, a = i ? null : MS(r, ["opacity"], t, {
    opacity: 1
  });
  e = e || {};
  var o = e.style || {};
  return o.opacity == null && (e = O({}, e), o = O({
    // Already being applied 'emphasis'. DON'T mul opacity multiple times.
    opacity: i ? n : a.opacity * 0.1
  }, o), e.style = o), e;
}
function vl(r, t) {
  var e = this.states[r];
  if (this.style) {
    if (r === "emphasis")
      return DS(this, r, t, e);
    if (r === "blur")
      return LS(this, r, e);
    if (r === "select")
      return AS(this, r, e);
  }
  return e;
}
function IS(r) {
  r.stateProxy = vl;
  var t = r.getTextContent(), e = r.getTextGuideLine();
  t && (t.stateProxy = vl), e && (e.stateProxy = vl);
}
function Lv(r, t) {
  !Cg(r, t) && !r.__highByOuter && Ze(r, _g);
}
function Iv(r, t) {
  !Cg(r, t) && !r.__highByOuter && Ze(r, Sg);
}
function Yn(r, t) {
  r.__highByOuter |= 1 << (t || 0), Ze(r, _g);
}
function Zn(r, t) {
  !(r.__highByOuter &= ~(1 << (t || 0))) && Ze(r, Sg);
}
function bg(r) {
  Ze(r, kf);
}
function Of(r) {
  Ze(r, wg);
}
function xg(r) {
  Ze(r, TS);
}
function Tg(r) {
  Ze(r, CS);
}
function Cg(r, t) {
  return r.__highDownSilentOnTouch && t.zrByTouch;
}
function Mg(r) {
  var t = r.getModel(), e = [], i = [];
  t.eachComponent(function(n, a) {
    var o = Rf(a), s = n === "series", l = s ? r.getViewOfSeriesModel(a) : r.getViewOfComponentModel(a);
    !s && i.push(l), o.isBlured && (l.group.traverse(function(u) {
      wg(u);
    }), s && e.push(a)), o.isBlured = !1;
  }), M(i, function(n) {
    n && n.toggleBlurSeries && n.toggleBlurSeries(e, !1, t);
  });
}
function Iu(r, t, e, i) {
  var n = i.getModel();
  e = e || "coordinateSystem";
  function a(u, f) {
    for (var h = 0; h < f.length; h++) {
      var v = u.getItemGraphicEl(f[h]);
      v && Of(v);
    }
  }
  if (r != null && !(!t || t === "none")) {
    var o = n.getSeriesByIndex(r), s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    n.eachSeries(function(u) {
      var f = o === u, h = u.coordinateSystem;
      h && h.master && (h = h.master);
      var v = h && s ? h === s : f;
      if (!// Not blur other series if blurScope series
      (e === "series" && !f || e === "coordinateSystem" && !v || t === "series" && f)) {
        var c = i.getViewOfSeriesModel(u);
        if (c.group.traverse(function(g) {
          g.__highByOuter && f && t === "self" || kf(g);
        }), Wt(t))
          a(u.getData(), t);
        else if (G(t))
          for (var p = ct(t), d = 0; d < p.length; d++)
            a(u.getData(p[d]), t[p[d]]);
        l.push(u), Rf(u).isBlured = !0;
      }
    }), n.eachComponent(function(u, f) {
      if (u !== "series") {
        var h = i.getViewOfComponentModel(f);
        h && h.toggleBlurSeries && h.toggleBlurSeries(l, !0, n);
      }
    });
  }
}
function Pu(r, t, e) {
  if (!(r == null || t == null)) {
    var i = e.getModel().getComponent(r, t);
    if (i) {
      Rf(i).isBlured = !0;
      var n = e.getViewOfComponentModel(i);
      !n || !n.focusBlurEnabled || n.group.traverse(function(a) {
        kf(a);
      });
    }
  }
}
function PS(r, t, e) {
  var i = r.seriesIndex, n = r.getData(t.dataType);
  if (n) {
    var a = qr(n, t);
    a = (N(a) ? a[0] : a) || 0;
    var o = n.getItemGraphicEl(a);
    if (!o)
      for (var s = n.count(), l = 0; !o && l < s; )
        o = n.getItemGraphicEl(l++);
    if (o) {
      var u = et(o);
      Iu(i, u.focus, u.blurScope, e);
    } else {
      var f = r.get(["emphasis", "focus"]), h = r.get(["emphasis", "blurScope"]);
      f != null && Iu(i, f, h, e);
    }
  }
}
function Bf(r, t, e, i) {
  var n = {
    focusSelf: !1,
    dispatchers: null
  };
  if (r == null || r === "series" || t == null || e == null)
    return n;
  var a = i.getModel().getComponent(r, t);
  if (!a)
    return n;
  var o = i.getViewOfComponentModel(a);
  if (!o || !o.findHighDownDispatchers)
    return n;
  for (var s = o.findHighDownDispatchers(e), l, u = 0; u < s.length; u++)
    if (et(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return {
    focusSelf: l,
    dispatchers: s
  };
}
function RS(r, t, e) {
  var i = et(r), n = Bf(i.componentMainType, i.componentIndex, i.componentHighDownName, e), a = n.dispatchers, o = n.focusSelf;
  a ? (o && Pu(i.componentMainType, i.componentIndex, e), M(a, function(s) {
    return Lv(s, t);
  })) : (Iu(i.seriesIndex, i.focus, i.blurScope, e), i.focus === "self" && Pu(i.componentMainType, i.componentIndex, e), Lv(r, t));
}
function ES(r, t, e) {
  Mg(e);
  var i = et(r), n = Bf(i.componentMainType, i.componentIndex, i.componentHighDownName, e).dispatchers;
  n ? M(n, function(a) {
    return Iv(a, t);
  }) : Iv(r, t);
}
function kS(r, t, e) {
  if (Eu(t)) {
    var i = t.dataType, n = r.getData(i), a = qr(n, t);
    N(a) || (a = [a]), r[t.type === Rn ? "toggleSelect" : t.type === Pn ? "select" : "unselect"](a, i);
  }
}
function Pv(r) {
  var t = r.getAllData();
  M(t, function(e) {
    var i = e.data, n = e.type;
    i.eachItemGraphicEl(function(a, o) {
      r.isSelected(o, n) ? xg(a) : Tg(a);
    });
  });
}
function OS(r) {
  var t = [];
  return r.eachSeries(function(e) {
    var i = e.getAllData();
    M(i, function(n) {
      n.data;
      var a = n.type, o = e.getSelectedDataIndices();
      if (o.length > 0) {
        var s = {
          dataIndex: o,
          seriesIndex: e.seriesIndex
        };
        a != null && (s.dataType = a), t.push(s);
      }
    });
  }), t;
}
function Io(r, t, e) {
  Dg(r, !0), Ze(r, IS), NS(r, t, e);
}
function BS(r) {
  Dg(r, !1);
}
function Fi(r, t, e, i) {
  i ? BS(r) : Io(r, t, e);
}
function NS(r, t, e) {
  var i = et(r);
  t != null ? (i.focus = t, i.blurScope = e) : i.focus && (i.focus = null);
}
var Rv = ["emphasis", "blur", "select"], FS = {
  itemStyle: "getItemStyle",
  lineStyle: "getLineStyle",
  areaStyle: "getAreaStyle"
};
function Po(r, t, e, i) {
  e = e || "itemStyle";
  for (var n = 0; n < Rv.length; n++) {
    var a = Rv[n], o = t.getModel([a, e]), s = r.ensureState(a);
    s.style = o[FS[e]]();
  }
}
function Dg(r, t) {
  var e = t === !1, i = r;
  r.highDownSilentOnTouch && (i.__highDownSilentOnTouch = r.highDownSilentOnTouch), (!e || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !e);
}
function Ru(r) {
  return !!(r && r.__highDownDispatcher);
}
function zS(r) {
  var t = Cv[r];
  return t == null && Tv <= 32 && (t = Cv[r] = Tv++), t;
}
function Eu(r) {
  var t = r.type;
  return t === Pn || t === fo || t === Rn;
}
function Ev(r) {
  var t = r.type;
  return t === Yr || t === uo;
}
function VS(r) {
  var t = mg(r);
  t.normalFill = r.style.fill, t.normalStroke = r.style.stroke;
  var e = r.states.select || {};
  t.selectFill = e.style && e.style.fill || null, t.selectStroke = e.style && e.style.stroke || null;
}
var vi = Kr.CMD, HS = [[], [], []], kv = Math.sqrt, GS = Math.atan2;
function WS(r, t) {
  if (t) {
    var e = r.data, i = r.len(), n, a, o, s, l, u, f = vi.M, h = vi.C, v = vi.L, c = vi.R, p = vi.A, d = vi.Q;
    for (o = 0, s = 0; o < i; ) {
      switch (n = e[o++], s = o, a = 0, n) {
        case f:
          a = 1;
          break;
        case v:
          a = 1;
          break;
        case h:
          a = 3;
          break;
        case d:
          a = 2;
          break;
        case p:
          var g = t[4], y = t[5], m = kv(t[0] * t[0] + t[1] * t[1]), _ = kv(t[2] * t[2] + t[3] * t[3]), S = GS(-t[1] / _, t[0] / m);
          e[o] *= m, e[o++] += g, e[o] *= _, e[o++] += y, e[o++] *= m, e[o++] *= _, e[o++] += S, e[o++] += S, o += 2, s = o;
          break;
        case c:
          u[0] = e[o++], u[1] = e[o++], oe(u, u, t), e[s++] = u[0], e[s++] = u[1], u[0] += e[o++], u[1] += e[o++], oe(u, u, t), e[s++] = u[0], e[s++] = u[1];
      }
      for (l = 0; l < a; l++) {
        var b = HS[l];
        b[0] = e[o++], b[1] = e[o++], oe(b, b, t), e[s++] = b[0], e[s++] = b[1];
      }
    }
    r.increaseVersion();
  }
}
var cl = Math.sqrt, Ca = Math.sin, Ma = Math.cos, an = Math.PI;
function Ov(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1]);
}
function ku(r, t) {
  return (r[0] * t[0] + r[1] * t[1]) / (Ov(r) * Ov(t));
}
function Bv(r, t) {
  return (r[0] * t[1] < r[1] * t[0] ? -1 : 1) * Math.acos(ku(r, t));
}
function Nv(r, t, e, i, n, a, o, s, l, u, f) {
  var h = l * (an / 180), v = Ma(h) * (r - e) / 2 + Ca(h) * (t - i) / 2, c = -1 * Ca(h) * (r - e) / 2 + Ma(h) * (t - i) / 2, p = v * v / (o * o) + c * c / (s * s);
  p > 1 && (o *= cl(p), s *= cl(p));
  var d = (n === a ? -1 : 1) * cl((o * o * (s * s) - o * o * (c * c) - s * s * (v * v)) / (o * o * (c * c) + s * s * (v * v))) || 0, g = d * o * c / s, y = d * -s * v / o, m = (r + e) / 2 + Ma(h) * g - Ca(h) * y, _ = (t + i) / 2 + Ca(h) * g + Ma(h) * y, S = Bv([1, 0], [(v - g) / o, (c - y) / s]), b = [(v - g) / o, (c - y) / s], w = [(-1 * v - g) / o, (-1 * c - y) / s], x = Bv(b, w);
  if (ku(b, w) <= -1 && (x = an), ku(b, w) >= 1 && (x = 0), x < 0) {
    var C = Math.round(x / an * 1e6) / 1e6;
    x = an * 2 + C % 2 * an;
  }
  f.addData(u, m, _, o, s, S, x, h, a);
}
var US = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, YS = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function ZS(r) {
  var t = new Kr();
  if (!r)
    return t;
  var e = 0, i = 0, n = e, a = i, o, s = Kr.CMD, l = r.match(US);
  if (!l)
    return t;
  for (var u = 0; u < l.length; u++) {
    for (var f = l[u], h = f.charAt(0), v = void 0, c = f.match(YS) || [], p = c.length, d = 0; d < p; d++)
      c[d] = parseFloat(c[d]);
    for (var g = 0; g < p; ) {
      var y = void 0, m = void 0, _ = void 0, S = void 0, b = void 0, w = void 0, x = void 0, C = e, D = i, A = void 0, T = void 0;
      switch (h) {
        case "l":
          e += c[g++], i += c[g++], v = s.L, t.addData(v, e, i);
          break;
        case "L":
          e = c[g++], i = c[g++], v = s.L, t.addData(v, e, i);
          break;
        case "m":
          e += c[g++], i += c[g++], v = s.M, t.addData(v, e, i), n = e, a = i, h = "l";
          break;
        case "M":
          e = c[g++], i = c[g++], v = s.M, t.addData(v, e, i), n = e, a = i, h = "L";
          break;
        case "h":
          e += c[g++], v = s.L, t.addData(v, e, i);
          break;
        case "H":
          e = c[g++], v = s.L, t.addData(v, e, i);
          break;
        case "v":
          i += c[g++], v = s.L, t.addData(v, e, i);
          break;
        case "V":
          i = c[g++], v = s.L, t.addData(v, e, i);
          break;
        case "C":
          v = s.C, t.addData(v, c[g++], c[g++], c[g++], c[g++], c[g++], c[g++]), e = c[g - 2], i = c[g - 1];
          break;
        case "c":
          v = s.C, t.addData(v, c[g++] + e, c[g++] + i, c[g++] + e, c[g++] + i, c[g++] + e, c[g++] + i), e += c[g - 2], i += c[g - 1];
          break;
        case "S":
          y = e, m = i, A = t.len(), T = t.data, o === s.C && (y += e - T[A - 4], m += i - T[A - 3]), v = s.C, C = c[g++], D = c[g++], e = c[g++], i = c[g++], t.addData(v, y, m, C, D, e, i);
          break;
        case "s":
          y = e, m = i, A = t.len(), T = t.data, o === s.C && (y += e - T[A - 4], m += i - T[A - 3]), v = s.C, C = e + c[g++], D = i + c[g++], e += c[g++], i += c[g++], t.addData(v, y, m, C, D, e, i);
          break;
        case "Q":
          C = c[g++], D = c[g++], e = c[g++], i = c[g++], v = s.Q, t.addData(v, C, D, e, i);
          break;
        case "q":
          C = c[g++] + e, D = c[g++] + i, e += c[g++], i += c[g++], v = s.Q, t.addData(v, C, D, e, i);
          break;
        case "T":
          y = e, m = i, A = t.len(), T = t.data, o === s.Q && (y += e - T[A - 4], m += i - T[A - 3]), e = c[g++], i = c[g++], v = s.Q, t.addData(v, y, m, e, i);
          break;
        case "t":
          y = e, m = i, A = t.len(), T = t.data, o === s.Q && (y += e - T[A - 4], m += i - T[A - 3]), e += c[g++], i += c[g++], v = s.Q, t.addData(v, y, m, e, i);
          break;
        case "A":
          _ = c[g++], S = c[g++], b = c[g++], w = c[g++], x = c[g++], C = e, D = i, e = c[g++], i = c[g++], v = s.A, Nv(C, D, e, i, w, x, _, S, b, v, t);
          break;
        case "a":
          _ = c[g++], S = c[g++], b = c[g++], w = c[g++], x = c[g++], C = e, D = i, e += c[g++], i += c[g++], v = s.A, Nv(C, D, e, i, w, x, _, S, b, v, t);
          break;
      }
    }
    (h === "z" || h === "Z") && (v = s.Z, t.addData(v), e = n, i = a), o = v;
  }
  return t.toStatic(), t;
}
var Ag = (function(r) {
  k(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(e) {
  }, t;
})(nt);
function Lg(r) {
  return r.setData != null;
}
function Ig(r, t) {
  var e = ZS(r), i = O({}, t);
  return i.buildPath = function(n) {
    if (Lg(n)) {
      n.setData(e.data);
      var a = n.getContext();
      a && n.rebuildPath(a, 1);
    } else {
      var a = n;
      e.rebuildPath(a, 1);
    }
  }, i.applyTransform = function(n) {
    WS(e, n), this.dirtyShape();
  }, i;
}
function XS(r, t) {
  return new Ag(Ig(r, t));
}
function $S(r, t) {
  var e = Ig(r, t), i = (function(n) {
    k(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = e.applyTransform, s.buildPath = e.buildPath, s;
    }
    return a;
  })(Ag);
  return i;
}
function qS(r, t) {
  for (var e = [], i = r.length, n = 0; n < i; n++) {
    var a = r[n];
    e.push(a.getUpdatedPathProxy(!0));
  }
  var o = new nt(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (Lg(s)) {
      s.appendPath(e);
      var l = s.getContext();
      l && s.rebuildPath(l, 1);
    }
  }, o;
}
var KS = /* @__PURE__ */ (function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return r;
})(), ss = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new KS();
  }, t.prototype.buildPath = function(e, i) {
    e.moveTo(i.cx + i.r, i.cy), e.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
})(nt);
ss.prototype.type = "circle";
var QS = /* @__PURE__ */ (function() {
  function r() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return r;
})(), Nf = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new QS();
  }, t.prototype.buildPath = function(e, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, l = i.ry, u = s * n, f = l * n;
    e.moveTo(a - s, o), e.bezierCurveTo(a - s, o - f, a - u, o - l, a, o - l), e.bezierCurveTo(a + u, o - l, a + s, o - f, a + s, o), e.bezierCurveTo(a + s, o + f, a + u, o + l, a, o + l), e.bezierCurveTo(a - u, o + l, a - s, o + f, a - s, o), e.closePath();
  }, t;
})(nt);
Nf.prototype.type = "ellipse";
var Pg = Math.PI, pl = Pg * 2, Pr = Math.sin, ci = Math.cos, JS = Math.acos, Ct = Math.atan2, Fv = Math.abs, En = Math.sqrt, xn = Math.max, Ce = Math.min, pe = 1e-4;
function jS(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, f = o - n, h = s - a, v = h * l - f * u;
  if (!(v * v < pe))
    return v = (f * (t - a) - h * (r - n)) / v, [r + v * l, t + v * u];
}
function Da(r, t, e, i, n, a, o) {
  var s = r - e, l = t - i, u = (o ? a : -a) / En(s * s + l * l), f = u * l, h = -u * s, v = r + f, c = t + h, p = e + f, d = i + h, g = (v + p) / 2, y = (c + d) / 2, m = p - v, _ = d - c, S = m * m + _ * _, b = n - a, w = v * d - p * c, x = (_ < 0 ? -1 : 1) * En(xn(0, b * b * S - w * w)), C = (w * _ - m * x) / S, D = (-w * m - _ * x) / S, A = (w * _ + m * x) / S, T = (-w * m + _ * x) / S, L = C - g, I = D - y, P = A - g, R = T - y;
  return L * L + I * I > P * P + R * R && (C = A, D = T), {
    cx: C,
    cy: D,
    x0: -f,
    y0: -h,
    x1: C * (n / b - 1),
    y1: D * (n / b - 1)
  };
}
function tw(r) {
  var t;
  if (N(r)) {
    var e = r.length;
    if (!e)
      return r;
    e === 1 ? t = [r[0], r[0], 0, 0] : e === 2 ? t = [r[0], r[0], r[1], r[1]] : e === 3 ? t = r.concat(r[2]) : t = r;
  } else
    t = [r, r, r, r];
  return t;
}
function ew(r, t) {
  var e, i = xn(t.r, 0), n = xn(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var l = t.startAngle, u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var f = t.cx, h = t.cy, v = !!t.clockwise, c = Fv(u - l), p = c > pl && c % pl;
      if (p > pe && (c = p), !(i > pe))
        r.moveTo(f, h);
      else if (c > pl - pe)
        r.moveTo(f + i * ci(l), h + i * Pr(l)), r.arc(f, h, i, l, u, !v), n > pe && (r.moveTo(f + n * ci(u), h + n * Pr(u)), r.arc(f, h, n, u, l, v));
      else {
        var d = void 0, g = void 0, y = void 0, m = void 0, _ = void 0, S = void 0, b = void 0, w = void 0, x = void 0, C = void 0, D = void 0, A = void 0, T = void 0, L = void 0, I = void 0, P = void 0, R = i * ci(l), E = i * Pr(l), H = n * ci(u), B = n * Pr(u), F = c > pe;
        if (F) {
          var W = t.cornerRadius;
          W && (e = tw(W), d = e[0], g = e[1], y = e[2], m = e[3]);
          var K = Fv(i - n) / 2;
          if (_ = Ce(K, y), S = Ce(K, m), b = Ce(K, d), w = Ce(K, g), D = x = xn(_, S), A = C = xn(b, w), (x > pe || C > pe) && (T = i * ci(u), L = i * Pr(u), I = n * ci(l), P = n * Pr(l), c < Pg)) {
            var j = jS(R, E, I, P, T, L, H, B);
            if (j) {
              var ut = R - j[0], vt = E - j[1], yt = T - j[0], he = L - j[1], dr = 1 / Pr(JS((ut * yt + vt * he) / (En(ut * ut + vt * vt) * En(yt * yt + he * he))) / 2), ai = En(j[0] * j[0] + j[1] * j[1]);
              D = Ce(x, (i - ai) / (dr + 1)), A = Ce(C, (n - ai) / (dr - 1));
            }
          }
        }
        if (!F)
          r.moveTo(f + R, h + E);
        else if (D > pe) {
          var Zt = Ce(y, D), xt = Ce(m, D), $ = Da(I, P, R, E, i, Zt, v), tt = Da(T, L, H, B, i, xt, v);
          r.moveTo(f + $.cx + $.x0, h + $.cy + $.y0), D < x && Zt === xt ? r.arc(f + $.cx, h + $.cy, D, Ct($.y0, $.x0), Ct(tt.y0, tt.x0), !v) : (Zt > 0 && r.arc(f + $.cx, h + $.cy, Zt, Ct($.y0, $.x0), Ct($.y1, $.x1), !v), r.arc(f, h, i, Ct($.cy + $.y1, $.cx + $.x1), Ct(tt.cy + tt.y1, tt.cx + tt.x1), !v), xt > 0 && r.arc(f + tt.cx, h + tt.cy, xt, Ct(tt.y1, tt.x1), Ct(tt.y0, tt.x0), !v));
        } else
          r.moveTo(f + R, h + E), r.arc(f, h, i, l, u, !v);
        if (!(n > pe) || !F)
          r.lineTo(f + H, h + B);
        else if (A > pe) {
          var Zt = Ce(d, A), xt = Ce(g, A), $ = Da(H, B, T, L, n, -xt, v), tt = Da(R, E, I, P, n, -Zt, v);
          r.lineTo(f + $.cx + $.x0, h + $.cy + $.y0), A < C && Zt === xt ? r.arc(f + $.cx, h + $.cy, A, Ct($.y0, $.x0), Ct(tt.y0, tt.x0), !v) : (xt > 0 && r.arc(f + $.cx, h + $.cy, xt, Ct($.y0, $.x0), Ct($.y1, $.x1), !v), r.arc(f, h, n, Ct($.cy + $.y1, $.cx + $.x1), Ct(tt.cy + tt.y1, tt.cx + tt.x1), v), Zt > 0 && r.arc(f + tt.cx, h + tt.cy, Zt, Ct(tt.y1, tt.x1), Ct(tt.y0, tt.x0), !v));
        } else
          r.lineTo(f + H, h + B), r.arc(f, h, n, u, l, v);
      }
      r.closePath();
    }
  }
}
var rw = /* @__PURE__ */ (function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return r;
})(), Yi = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new rw();
  }, t.prototype.buildPath = function(e, i) {
    ew(e, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
})(nt);
Yi.prototype.type = "sector";
var iw = /* @__PURE__ */ (function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return r;
})(), Ff = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new iw();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    e.moveTo(n + i.r, a), e.arc(n, a, i.r, 0, o, !1), e.moveTo(n + i.r0, a), e.arc(n, a, i.r0, 0, o, !0);
  }, t;
})(nt);
Ff.prototype.type = "ring";
function nw(r, t, e, i) {
  var n = [], a = [], o = [], s = [], l, u, f, h;
  if (i) {
    f = [1 / 0, 1 / 0], h = [-1 / 0, -1 / 0];
    for (var v = 0, c = r.length; v < c; v++)
      Ci(f, f, r[v]), Mi(h, h, r[v]);
    Ci(f, f, i[0]), Mi(h, h, i[1]);
  }
  for (var v = 0, c = r.length; v < c; v++) {
    var p = r[v];
    if (e)
      l = r[v ? v - 1 : c - 1], u = r[(v + 1) % c];
    else if (v === 0 || v === c - 1) {
      n.push(W0(r[v]));
      continue;
    } else
      l = r[v - 1], u = r[v + 1];
    Od(a, u, l), Rs(a, a, t);
    var d = vu(p, l), g = vu(p, u), y = d + g;
    y !== 0 && (d /= y, g /= y), Rs(o, a, -d), Rs(s, a, g);
    var m = Dh([], p, o), _ = Dh([], p, s);
    i && (Mi(m, m, f), Ci(m, m, h), Mi(_, _, f), Ci(_, _, h)), n.push(m), n.push(_);
  }
  return e && n.push(n.shift()), n;
}
function Rg(r, t, e) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = nw(n, i, e, t.smoothConstraint);
      r.moveTo(n[0][0], n[0][1]);
      for (var o = n.length, s = 0; s < (e ? o : o - 1); s++) {
        var l = a[s * 2], u = a[s * 2 + 1], f = n[(s + 1) % o];
        r.bezierCurveTo(l[0], l[1], u[0], u[1], f[0], f[1]);
      }
    } else {
      r.moveTo(n[0][0], n[0][1]);
      for (var s = 1, h = n.length; s < h; s++)
        r.lineTo(n[s][0], n[s][1]);
    }
    e && r.closePath();
  }
}
var aw = /* @__PURE__ */ (function() {
  function r() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
})(), zi = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new aw();
  }, t.prototype.buildPath = function(e, i) {
    Rg(e, i, !0);
  }, t;
})(nt);
zi.prototype.type = "polygon";
var ow = /* @__PURE__ */ (function() {
  function r() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
})(), ls = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new ow();
  }, t.prototype.buildPath = function(e, i) {
    Rg(e, i, !1);
  }, t;
})(nt);
ls.prototype.type = "polyline";
var sw = {}, lw = /* @__PURE__ */ (function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return r;
})(), Ye = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new lw();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var l = gg(sw, i, this.style);
      n = l.x1, a = l.y1, o = l.x2, s = l.y2;
    } else
      n = i.x1, a = i.y1, o = i.x2, s = i.y2;
    var u = i.percent;
    u !== 0 && (e.moveTo(n, a), u < 1 && (o = n * (1 - u) + o * u, s = a * (1 - u) + s * u), e.lineTo(o, s));
  }, t.prototype.pointAt = function(e) {
    var i = this.shape;
    return [
      i.x1 * (1 - e) + i.x2 * e,
      i.y1 * (1 - e) + i.y2 * e
    ];
  }, t;
})(nt);
Ye.prototype.type = "line";
var Bt = [], uw = /* @__PURE__ */ (function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return r;
})();
function zv(r, t, e) {
  var i = r.cpx2, n = r.cpy2;
  return i != null || n != null ? [
    (e ? zh : Tt)(r.x1, r.cpx1, r.cpx2, r.x2, t),
    (e ? zh : Tt)(r.y1, r.cpy1, r.cpy2, r.y2, t)
  ] : [
    (e ? Vh : zt)(r.x1, r.cpx1, r.x2, t),
    (e ? Vh : zt)(r.y1, r.cpy1, r.y2, t)
  ];
}
var us = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new uw();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, l = i.cpx1, u = i.cpy1, f = i.cpx2, h = i.cpy2, v = i.percent;
    v !== 0 && (e.moveTo(n, a), f == null || h == null ? (v < 1 && (bo(n, l, o, v, Bt), l = Bt[1], o = Bt[2], bo(a, u, s, v, Bt), u = Bt[1], s = Bt[2]), e.quadraticCurveTo(l, u, o, s)) : (v < 1 && (wo(n, l, f, o, v, Bt), l = Bt[1], f = Bt[2], o = Bt[3], wo(a, u, h, s, v, Bt), u = Bt[1], h = Bt[2], s = Bt[3]), e.bezierCurveTo(l, u, f, h, o, s)));
  }, t.prototype.pointAt = function(e) {
    return zv(this.shape, e, !1);
  }, t.prototype.tangentAt = function(e) {
    var i = zv(this.shape, e, !0);
    return _f(i, i);
  }, t;
})(nt);
us.prototype.type = "bezier-curve";
var fw = /* @__PURE__ */ (function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return r;
})(), fs = (function(r) {
  k(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new fw();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, l = i.endAngle, u = i.clockwise, f = Math.cos(s), h = Math.sin(s);
    e.moveTo(f * o + n, h * o + a), e.arc(n, a, o, s, l, !u);
  }, t;
})(nt);
fs.prototype.type = "arc";
var hw = (function(r) {
  k(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.type = "compound", e;
  }
  return t.prototype._updatePathDirty = function() {
    for (var e = this.shape.paths, i = this.shapeChanged(), n = 0; n < e.length; n++)
      i = i || e[n].shapeChanged();
    i && this.dirtyShape();
  }, t.prototype.beforeBrush = function() {
    this._updatePathDirty();
    for (var e = this.shape.paths || [], i = this.getGlobalScale(), n = 0; n < e.length; n++)
      e[n].path || e[n].createPathProxy(), e[n].path.setScale(i[0], i[1], e[n].segmentIgnoreThreshold);
  }, t.prototype.buildPath = function(e, i) {
    for (var n = i.paths || [], a = 0; a < n.length; a++)
      n[a].buildPath(e, n[a].shape, !0);
  }, t.prototype.afterBrush = function() {
    for (var e = this.shape.paths || [], i = 0; i < e.length; i++)
      e[i].pathUpdated();
  }, t.prototype.getBoundingRect = function() {
    return this._updatePathDirty.call(this), nt.prototype.getBoundingRect.call(this);
  }, t;
})(nt), Eg = (function() {
  function r(t) {
    this.colorStops = t || [];
  }
  return r.prototype.addColorStop = function(t, e) {
    this.colorStops.push({
      offset: t,
      color: e
    });
  }, r;
})(), kg = (function(r) {
  k(t, r);
  function t(e, i, n, a, o, s) {
    var l = r.call(this, o) || this;
    return l.x = e ?? 0, l.y = i ?? 0, l.x2 = n ?? 1, l.y2 = a ?? 0, l.type = "linear", l.global = s || !1, l;
  }
  return t;
})(Eg), vw = (function(r) {
  k(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this, a) || this;
    return s.x = e ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
})(Eg), Rr = [0, 0], Er = [0, 0], Aa = new ft(), La = new ft(), Ro = (function() {
  function r(t, e) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new ft();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new ft();
    t && this.fromBoundingRect(t, e);
  }
  return r.prototype.fromBoundingRect = function(t, e) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, l = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, l), i[3].set(a, l), e)
      for (var u = 0; u < 4; u++)
        i[u].transform(e);
    ft.sub(n[0], i[1], i[0]), ft.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var u = 0; u < 2; u++)
      this._origin[u] = n[u].dot(i[0]);
  }, r.prototype.intersect = function(t, e) {
    var i = !0, n = !e;
    return Aa.set(1 / 0, 1 / 0), La.set(0, 0), !this._intersectCheckOneSide(this, t, Aa, La, n, 1) && (i = !1, n) || !this._intersectCheckOneSide(t, this, Aa, La, n, -1) && (i = !1, n) || n || ft.copy(e, i ? Aa : La), i;
  }, r.prototype._intersectCheckOneSide = function(t, e, i, n, a, o) {
    for (var s = !0, l = 0; l < 2; l++) {
      var u = this._axes[l];
      if (this._getProjMinMaxOnAxis(l, t._corners, Rr), this._getProjMinMaxOnAxis(l, e._corners, Er), Rr[1] < Er[0] || Rr[0] > Er[1]) {
        if (s = !1, a)
          return s;
        var f = Math.abs(Er[0] - Rr[1]), h = Math.abs(Rr[0] - Er[1]);
        Math.min(f, h) > n.len() && (f < h ? ft.scale(n, u, -f * o) : ft.scale(n, u, h * o));
      } else if (i) {
        var f = Math.abs(Er[0] - Rr[1]), h = Math.abs(Rr[0] - Er[1]);
        Math.min(f, h) < i.len() && (f < h ? ft.scale(i, u, f * o) : ft.scale(i, u, -h * o));
      }
    }
    return s;
  }, r.prototype._getProjMinMaxOnAxis = function(t, e, i) {
    for (var n = this._axes[t], a = this._origin, o = e[0].dot(n) + a[t], s = o, l = o, u = 1; u < e.length; u++) {
      var f = e[u].dot(n) + a[t];
      s = Math.min(f, s), l = Math.max(f, l);
    }
    i[0] = s, i[1] = l;
  }, r;
})(), cw = [], pw = (function(r) {
  k(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.notClear = !0, e.incremental = !0, e._displayables = [], e._temporaryDisplayables = [], e._cursor = 0, e;
  }
  return t.prototype.traverse = function(e, i) {
    e.call(i, this);
  }, t.prototype.useStyle = function() {
    this.style = {};
  }, t.prototype.getCursor = function() {
    return this._cursor;
  }, t.prototype.innerAfterBrush = function() {
    this._cursor = this._displayables.length;
  }, t.prototype.clearDisplaybles = function() {
    this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.markRedraw(), this.notClear = !1;
  }, t.prototype.clearTemporalDisplayables = function() {
    this._temporaryDisplayables = [];
  }, t.prototype.addDisplayable = function(e, i) {
    i ? this._temporaryDisplayables.push(e) : this._displayables.push(e), this.markRedraw();
  }, t.prototype.addDisplayables = function(e, i) {
    i = i || !1;
    for (var n = 0; n < e.length; n++)
      this.addDisplayable(e[n], i);
  }, t.prototype.getDisplayables = function() {
    return this._displayables;
  }, t.prototype.getTemporalDisplayables = function() {
    return this._temporaryDisplayables;
  }, t.prototype.eachPendingDisplayable = function(e) {
    for (var i = this._cursor; i < this._displayables.length; i++)
      e && e(this._displayables[i]);
    for (var i = 0; i < this._temporaryDisplayables.length; i++)
      e && e(this._temporaryDisplayables[i]);
  }, t.prototype.update = function() {
    this.updateTransform();
    for (var e = this._cursor; e < this._displayables.length; e++) {
      var i = this._displayables[e];
      i.parent = this, i.update(), i.parent = null;
    }
    for (var e = 0; e < this._temporaryDisplayables.length; e++) {
      var i = this._temporaryDisplayables[e];
      i.parent = this, i.update(), i.parent = null;
    }
  }, t.prototype.getBoundingRect = function() {
    if (!this._rect) {
      for (var e = new it(1 / 0, 1 / 0, -1 / 0, -1 / 0), i = 0; i < this._displayables.length; i++) {
        var n = this._displayables[i], a = n.getBoundingRect().clone();
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(cw)), e.union(a);
      }
      this._rect = e;
    }
    return this._rect;
  }, t.prototype.contain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect();
    if (a.contain(n[0], n[1]))
      for (var o = 0; o < this._displayables.length; o++) {
        var s = this._displayables[o];
        if (s.contain(e, i))
          return !0;
      }
    return !1;
  }, t;
})(la), dw = pt();
function gw(r, t, e, i, n) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(), l = r === "update";
  if (s) {
    var u = void 0, f = void 0, h = void 0;
    i ? (u = q(i.duration, 200), f = q(i.easing, "cubicOut"), h = 0) : (u = t.getShallow(l ? "animationDurationUpdate" : "animationDuration"), f = t.getShallow(l ? "animationEasingUpdate" : "animationEasing"), h = t.getShallow(l ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (u = a.duration), a.easing != null && (f = a.easing), a.delay != null && (h = a.delay)), X(h) && (h = h(e, n)), X(u) && (u = u(e));
    var v = {
      duration: u || 0,
      delay: h,
      easing: f
    };
    return v;
  } else
    return null;
}
function zf(r, t, e, i, n, a, o) {
  var s = !1, l;
  X(n) ? (o = a, a = n, n = null) : G(n) && (a = n.cb, o = n.during, s = n.isFrom, l = n.removeOpt, n = n.dataIndex);
  var u = r === "leave";
  u || t.stopAnimation("leave");
  var f = gw(r, i, n, u ? l || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, n) : null);
  if (f && f.duration > 0) {
    var h = f.duration, v = f.delay, c = f.easing, p = {
      duration: h,
      delay: v || 0,
      easing: c,
      done: a,
      force: !!a || !!o,
      // Set to final state in update/init animation.
      // So the post processing based on the path shape can be done correctly.
      setToFinal: !u,
      scope: r,
      during: o
    };
    s ? t.animateFrom(e, p) : t.animateTo(e, p);
  } else
    t.stopAnimation(), !s && t.attr(e), o && o(1), a && a();
}
function Ot(r, t, e, i, n, a) {
  zf("update", r, t, e, i, n, a);
}
function Ee(r, t, e, i, n, a) {
  zf("enter", r, t, e, i, n, a);
}
function kn(r) {
  if (!r.__zr)
    return !0;
  for (var t = 0; t < r.animators.length; t++) {
    var e = r.animators[t];
    if (e.scope === "leave")
      return !0;
  }
  return !1;
}
function Eo(r, t, e, i, n, a) {
  kn(r) || zf("leave", r, t, e, i, n, a);
}
function Vv(r, t, e, i) {
  r.removeTextContent(), r.removeTextGuideLine(), Eo(r, {
    style: {
      opacity: 0
    }
  }, t, e, i);
}
function Ou(r, t, e) {
  function i() {
    r.parent && r.parent.remove(r);
  }
  r.isGroup ? r.traverse(function(n) {
    n.isGroup || Vv(n, t, e, i);
  }) : Vv(r, t, e, i);
}
function Og(r) {
  dw(r).oldStyle = r.style;
}
var ko = Math.max, Oo = Math.min, Bu = {};
function yw(r) {
  return nt.extend(r);
}
var mw = $S;
function _w(r, t) {
  return mw(r, t);
}
function we(r, t) {
  Bu[r] = t;
}
function Sw(r) {
  if (Bu.hasOwnProperty(r))
    return Bu[r];
}
function Vf(r, t, e, i) {
  var n = XS(r, t);
  return e && (i === "center" && (e = Ng(e, n.getBoundingRect())), Fg(n, e)), n;
}
function Bg(r, t, e) {
  var i = new pr({
    style: {
      image: r,
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height
    },
    onload: function(n) {
      if (e === "center") {
        var a = {
          width: n.width,
          height: n.height
        };
        i.setStyle(Ng(t, a));
      }
    }
  });
  return i;
}
function Ng(r, t) {
  var e = t.width / t.height, i = r.height * e, n;
  i <= r.width ? n = r.height : (i = r.width, n = i / e);
  var a = r.x + r.width / 2, o = r.y + r.height / 2;
  return {
    x: a - i / 2,
    y: o - n / 2,
    width: i,
    height: n
  };
}
var ww = qS;
function Fg(r, t) {
  if (r.applyTransform) {
    var e = r.getBoundingRect(), i = e.calculateTransform(t);
    r.applyTransform(i);
  }
}
function Xn(r, t) {
  return gg(r, r, {
    lineWidth: t
  }), r;
}
function bw(r) {
  return yg(r.shape, r.shape, r.style), r;
}
var xw = Hr;
function zg(r, t) {
  for (var e = wf([]); r && r !== t; )
    Pi(e, r.getLocalTransform(), e), r = r.parent;
  return e;
}
function $n(r, t, e) {
  return t && !Wt(t) && (t = Cf.getLocalTransform(t)), e && (t = xf([], t)), oe([], r, t);
}
function Vg(r, t, e) {
  var i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), n = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]), a = [r === "left" ? -i : r === "right" ? i : 0, r === "top" ? -n : r === "bottom" ? n : 0];
  return a = $n(a, t, e), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function Hv(r) {
  return !r.isGroup;
}
function Tw(r) {
  return r.shape != null;
}
function Hg(r, t, e) {
  if (!r || !t)
    return;
  function i(o) {
    var s = {};
    return o.traverse(function(l) {
      Hv(l) && l.anid && (s[l.anid] = l);
    }), s;
  }
  function n(o) {
    var s = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return Tw(o) && (s.shape = O({}, o.shape)), s;
  }
  var a = i(r);
  t.traverse(function(o) {
    if (Hv(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = n(o);
        o.attr(n(s)), Ot(o, l, e, et(o).dataIndex);
      }
    }
  });
}
function Cw(r, t) {
  return V(r, function(e) {
    var i = e[0];
    i = ko(i, t.x), i = Oo(i, t.x + t.width);
    var n = e[1];
    return n = ko(n, t.y), n = Oo(n, t.y + t.height), [i, n];
  });
}
function Mw(r, t) {
  var e = ko(r.x, t.x), i = Oo(r.x + r.width, t.x + t.width), n = ko(r.y, t.y), a = Oo(r.y + r.height, t.y + t.height);
  if (i >= e && a >= n)
    return {
      x: e,
      y: n,
      width: i - e,
      height: a - n
    };
}
function Hf(r, t, e) {
  var i = O({
    rectHover: !0
  }, t), n = i.style = {
    strokeNoScale: !0
  };
  if (e = e || {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }, r)
    return r.indexOf("image://") === 0 ? (n.image = r.slice(8), st(n, e), new pr(i)) : Vf(r.replace("path://", ""), i, e, "center");
}
function Dw(r, t, e, i, n) {
  for (var a = 0, o = n[n.length - 1]; a < n.length; a++) {
    var s = n[a];
    if (Gg(r, t, e, i, s[0], s[1], o[0], o[1]))
      return !0;
    o = s;
  }
}
function Gg(r, t, e, i, n, a, o, s) {
  var l = e - r, u = i - t, f = o - n, h = s - a, v = dl(f, h, l, u);
  if (Aw(v))
    return !1;
  var c = r - n, p = t - a, d = dl(c, p, l, u) / v;
  if (d < 0 || d > 1)
    return !1;
  var g = dl(c, p, f, h) / v;
  return !(g < 0 || g > 1);
}
function dl(r, t, e, i) {
  return r * i - e * t;
}
function Aw(r) {
  return r <= 1e-6 && r >= -1e-6;
}
function hs(r) {
  var t = r.itemTooltipOption, e = r.componentModel, i = r.itemName, n = z(t) ? {
    formatter: t
  } : t, a = e.mainType, o = e.componentIndex, s = {
    componentType: a,
    name: i,
    $vars: ["name"]
  };
  s[a + "Index"] = o;
  var l = r.formatterParamsExtra;
  l && M(ct(l), function(f) {
    $r(s, f) || (s[f] = l[f], s.$vars.push(f));
  });
  var u = et(r.el);
  u.componentMainType = a, u.componentIndex = o, u.tooltipConfig = {
    name: i,
    option: st({
      content: i,
      encodeHTMLContent: !0,
      formatterParams: s
    }, n)
  };
}
function Gv(r, t) {
  var e;
  r.isGroup && (e = t(r)), e || r.traverse(t);
}
function ua(r, t) {
  if (r)
    if (N(r))
      for (var e = 0; e < r.length; e++)
        Gv(r[e], t);
    else
      Gv(r, t);
}
we("circle", ss);
we("ellipse", Nf);
we("sector", Yi);
we("ring", Ff);
we("polygon", zi);
we("polyline", ls);
we("rect", dt);
we("line", Ye);
we("bezierCurve", us);
we("arc", fs);
const Lw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arc: fs,
  BezierCurve: us,
  BoundingRect: it,
  Circle: ss,
  CompoundPath: hw,
  Ellipse: Nf,
  Group: gt,
  Image: pr,
  IncrementalDisplayable: pw,
  Line: Ye,
  LinearGradient: kg,
  OrientedBoundingRect: Ro,
  Path: nt,
  Point: ft,
  Polygon: zi,
  Polyline: ls,
  RadialGradient: vw,
  Rect: dt,
  Ring: Ff,
  Sector: Yi,
  Text: kt,
  applyTransform: $n,
  clipPointsByRect: Cw,
  clipRectByRect: Mw,
  createIcon: Hf,
  extendPath: _w,
  extendShape: yw,
  getShapeClass: Sw,
  getTransform: zg,
  groupTransition: Hg,
  initProps: Ee,
  isElementRemoved: kn,
  lineLineIntersect: Gg,
  linePolygonIntersect: Dw,
  makeImage: Bg,
  makePath: Vf,
  mergePath: ww,
  registerShape: we,
  removeElement: Eo,
  removeElementWithFadeOut: Ou,
  resizePath: Fg,
  setTooltipConfig: hs,
  subPixelOptimize: xw,
  subPixelOptimizeLine: Xn,
  subPixelOptimizeRect: bw,
  transformDirection: Vg,
  traverseElements: ua,
  updateProps: Ot
}, Symbol.toStringTag, { value: "Module" }));
var vs = {};
function Iw(r, t) {
  for (var e = 0; e < le.length; e++) {
    var i = le[e], n = t[i], a = r.ensureState(i);
    a.style = a.style || {}, a.style.text = n;
  }
  var o = r.currentStates.slice();
  r.clearStates(!0), r.setStyle({
    text: t.normal
  }), r.useStates(o, !0);
}
function Wv(r, t, e) {
  var i = r.labelFetcher, n = r.labelDataIndex, a = r.labelDimIndex, o = t.normal, s;
  i && (s = i.getFormattedLabel(n, "normal", null, a, o && o.get("formatter"), e != null ? {
    interpolatedValue: e
  } : null)), s == null && (s = X(r.defaultText) ? r.defaultText(n, r, e) : r.defaultText);
  for (var l = {
    normal: s
  }, u = 0; u < le.length; u++) {
    var f = le[u], h = t[f];
    l[f] = q(i ? i.getFormattedLabel(n, f, null, a, h && h.get("formatter")) : null, s);
  }
  return l;
}
function Zi(r, t, e, i) {
  e = e || vs;
  for (var n = r instanceof kt, a = !1, o = 0; o < Mv.length; o++) {
    var s = t[Mv[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = n ? r : r.getTextContent();
  if (a) {
    n || (l || (l = new kt(), r.setTextContent(l)), r.stateProxy && (l.stateProxy = r.stateProxy));
    var u = Wv(e, t), f = t.normal, h = !!f.getShallow("show"), v = Qr(f, i && i.normal, e, !1, !n);
    v.text = u.normal, n || r.setTextConfig(Uv(f, e, !1));
    for (var o = 0; o < le.length; o++) {
      var c = le[o], s = t[c];
      if (s) {
        var p = l.ensureState(c), d = !!q(s.getShallow("show"), h);
        if (d !== h && (p.ignore = !d), p.style = Qr(s, i && i[c], e, !0, !n), p.style.text = u[c], !n) {
          var g = r.ensureState(c);
          g.textConfig = Uv(s, e, !0);
        }
      }
    }
    l.silent = !!f.getShallow("silent"), l.style.x != null && (v.x = l.style.x), l.style.y != null && (v.y = l.style.y), l.ignore = !h, l.useStyle(v), l.dirty(), e.enableTextSetter && (cs(l).setLabelText = function(y) {
      var m = Wv(e, t, y);
      Iw(l, m);
    });
  } else l && (l.ignore = !0);
  r.dirty();
}
function ri(r, t) {
  t = t || "label";
  for (var e = {
    normal: r.getModel(t)
  }, i = 0; i < le.length; i++) {
    var n = le[i];
    e[n] = r.getModel([n, t]);
  }
  return e;
}
function Qr(r, t, e, i, n) {
  var a = {};
  return Pw(a, r, e, i, n), t && O(a, t), a;
}
function Uv(r, t, e) {
  t = t || {};
  var i = {}, n, a = r.getShallow("rotate"), o = q(r.getShallow("distance"), e ? null : 5), s = r.getShallow("offset");
  return n = r.getShallow("position") || (e ? null : "inside"), n === "outside" && (n = t.defaultOutsidePosition || "top"), n != null && (i.position = n), s != null && (i.offset = s), a != null && (a *= Math.PI / 180, i.rotation = a), o != null && (i.distance = o), i.outsideFill = r.get("color") === "inherit" ? t.inheritColor || null : "auto", i;
}
function Pw(r, t, e, i, n) {
  e = e || vs;
  var a = t.ecModel, o = a && a.option.textStyle, s = Rw(t), l;
  if (s) {
    l = {};
    for (var u in s)
      if (s.hasOwnProperty(u)) {
        var f = t.getModel(["rich", u]);
        $v(l[u] = {}, f, o, e, i, n, !1, !0);
      }
  }
  l && (r.rich = l);
  var h = t.get("overflow");
  h && (r.overflow = h);
  var v = t.get("minMargin");
  v != null && (r.margin = v), $v(r, t, o, e, i, n, !0, !1);
}
function Rw(r) {
  for (var t; r && r !== r.ecModel; ) {
    var e = (r.option || vs).rich;
    if (e) {
      t = t || {};
      for (var i = ct(e), n = 0; n < i.length; n++) {
        var a = i[n];
        t[a] = 1;
      }
    }
    r = r.parentModel;
  }
  return t;
}
var Yv = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], Zv = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"], Xv = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function $v(r, t, e, i, n, a, o, s) {
  e = !n && e || vs;
  var l = i && i.inheritColor, u = t.getShallow("color"), f = t.getShallow("textBorderColor"), h = q(t.getShallow("opacity"), e.opacity);
  (u === "inherit" || u === "auto") && (l ? u = l : u = null), (f === "inherit" || f === "auto") && (l ? f = l : f = null), a || (u = u || e.color, f = f || e.textBorderColor), u != null && (r.fill = u), f != null && (r.stroke = f);
  var v = q(t.getShallow("textBorderWidth"), e.textBorderWidth);
  v != null && (r.lineWidth = v);
  var c = q(t.getShallow("textBorderType"), e.textBorderType);
  c != null && (r.lineDash = c);
  var p = q(t.getShallow("textBorderDashOffset"), e.textBorderDashOffset);
  p != null && (r.lineDashOffset = p), !n && h == null && !s && (h = i && i.defaultOpacity), h != null && (r.opacity = h), !n && !a && r.fill == null && i.inheritColor && (r.fill = i.inheritColor);
  for (var d = 0; d < Yv.length; d++) {
    var g = Yv[d], y = q(t.getShallow(g), e[g]);
    y != null && (r[g] = y);
  }
  for (var d = 0; d < Zv.length; d++) {
    var g = Zv[d], y = t.getShallow(g);
    y != null && (r[g] = y);
  }
  if (r.verticalAlign == null) {
    var m = t.getShallow("baseline");
    m != null && (r.verticalAlign = m);
  }
  if (!o || !i.disableBox) {
    for (var d = 0; d < Xv.length; d++) {
      var g = Xv[d], y = t.getShallow(g);
      y != null && (r[g] = y);
    }
    var _ = t.getShallow("borderType");
    _ != null && (r.borderDash = _), (r.backgroundColor === "auto" || r.backgroundColor === "inherit") && l && (r.backgroundColor = l), (r.borderColor === "auto" || r.borderColor === "inherit") && l && (r.borderColor = l);
  }
}
function Ew(r, t) {
  var e = t && t.getModel("textStyle");
  return Ae([
    // FIXME in node-canvas fontWeight is before fontStyle
    r.fontStyle || e && e.getShallow("fontStyle") || "",
    r.fontWeight || e && e.getShallow("fontWeight") || "",
    (r.fontSize || e && e.getShallow("fontSize") || 12) + "px",
    r.fontFamily || e && e.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var cs = pt();
function kw(r, t, e, i) {
  if (r) {
    var n = cs(r);
    n.prevValue = n.value, n.value = e;
    var a = t.normal;
    n.valueAnimation = a.get("valueAnimation"), n.valueAnimation && (n.precision = a.get("precision"), n.defaultInterpolatedText = i, n.statesModels = t);
  }
}
var Ow = ["textStyle", "color"], gl = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"], yl = new kt(), Bw = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getTextColor = function(t) {
      var e = this.ecModel;
      return this.getShallow("color") || (!t && e ? e.get(Ow) : null);
    }, r.prototype.getFont = function() {
      return Ew({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, r.prototype.getTextRect = function(t) {
      for (var e = {
        text: t,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      }, i = 0; i < gl.length; i++)
        e[gl[i]] = this.getShallow(gl[i]);
      return yl.useStyle(e), yl.update(), yl.getBoundingRect();
    }, r;
  })()
), Wg = [
  ["lineWidth", "width"],
  ["stroke", "color"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "type"],
  ["lineDashOffset", "dashOffset"],
  ["lineCap", "cap"],
  ["lineJoin", "join"],
  ["miterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], Nw = Un(Wg), Fw = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getLineStyle = function(t) {
      return Nw(this, t);
    }, r;
  })()
), Ug = [
  ["fill", "color"],
  ["stroke", "borderColor"],
  ["lineWidth", "borderWidth"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "borderType"],
  ["lineDashOffset", "borderDashOffset"],
  ["lineCap", "borderCap"],
  ["lineJoin", "borderJoin"],
  ["miterLimit", "borderMiterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], zw = Un(Ug), Vw = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getItemStyle = function(t, e) {
      return zw(this, t, e);
    }, r;
  })()
), mt = (
  /** @class */
  (function() {
    function r(t, e, i) {
      this.parentModel = e, this.ecModel = i, this.option = t;
    }
    return r.prototype.init = function(t, e, i) {
    }, r.prototype.mergeOption = function(t, e) {
      J(this.option, t, !0);
    }, r.prototype.get = function(t, e) {
      return t == null ? this.option : this._doGet(this.parsePath(t), !e && this.parentModel);
    }, r.prototype.getShallow = function(t, e) {
      var i = this.option, n = i == null ? i : i[t];
      if (n == null && !e) {
        var a = this.parentModel;
        a && (n = a.getShallow(t));
      }
      return n;
    }, r.prototype.getModel = function(t, e) {
      var i = t != null, n = i ? this.parsePath(t) : null, a = i ? this._doGet(n) : this.option;
      return e = e || this.parentModel && this.parentModel.getModel(this.resolveParentPath(n)), new r(a, e, this.ecModel);
    }, r.prototype.isEmpty = function() {
      return this.option == null;
    }, r.prototype.restoreData = function() {
    }, r.prototype.clone = function() {
      var t = this.constructor;
      return new t(Q(this.option));
    }, r.prototype.parsePath = function(t) {
      return typeof t == "string" ? t.split(".") : t;
    }, r.prototype.resolveParentPath = function(t) {
      return t;
    }, r.prototype.isAnimationEnabled = function() {
      if (!U.node && this.option) {
        if (this.option.animation != null)
          return !!this.option.animation;
        if (this.parentModel)
          return this.parentModel.isAnimationEnabled();
      }
    }, r.prototype._doGet = function(t, e) {
      var i = this.option;
      if (!t)
        return i;
      for (var n = 0; n < t.length && !(t[n] && (i = i && typeof i == "object" ? i[t[n]] : null, i == null)); n++)
        ;
      return i == null && e && (i = e._doGet(this.resolveParentPath(t), e.parentModel)), i;
    }, r;
  })()
);
Pf(mt);
A1(mt);
_e(mt, Fw);
_e(mt, Vw);
_e(mt, E1);
_e(mt, Bw);
var Hw = Math.round(Math.random() * 10);
function ps(r) {
  return [r || "", Hw++].join("_");
}
function Gw(r) {
  var t = {};
  r.registerSubTypeDefaulter = function(e, i) {
    var n = Ie(e);
    t[n.main] = i;
  }, r.determineSubType = function(e, i) {
    var n = i.type;
    if (!n) {
      var a = Ie(e).main;
      r.hasSubTypes(e) && t[a] && (n = t[a](i));
    }
    return n;
  };
}
function Ww(r, t) {
  r.topologicalTravel = function(a, o, s, l) {
    if (!a.length)
      return;
    var u = e(o), f = u.graph, h = u.noEntryList, v = {};
    for (M(a, function(m) {
      v[m] = !0;
    }); h.length; ) {
      var c = h.pop(), p = f[c], d = !!v[c];
      d && (s.call(l, c, p.originalDeps.slice()), delete v[c]), M(p.successor, d ? y : g);
    }
    M(v, function() {
      var m = "";
      throw new Error(m);
    });
    function g(m) {
      f[m].entryCount--, f[m].entryCount === 0 && h.push(m);
    }
    function y(m) {
      v[m] = !0, g(m);
    }
  };
  function e(a) {
    var o = {}, s = [];
    return M(a, function(l) {
      var u = i(o, l), f = u.originalDeps = t(l), h = n(f, a);
      u.entryCount = h.length, u.entryCount === 0 && s.push(l), M(h, function(v) {
        rt(u.predecessor, v) < 0 && u.predecessor.push(v);
        var c = i(o, v);
        rt(c.successor, v) < 0 && c.successor.push(l);
      });
    }), {
      graph: o,
      noEntryList: s
    };
  }
  function i(a, o) {
    return a[o] || (a[o] = {
      predecessor: [],
      successor: []
    }), a[o];
  }
  function n(a, o) {
    var s = [];
    return M(a, function(l) {
      rt(o, l) >= 0 && s.push(l);
    }), s;
  }
}
function ds(r, t) {
  return J(J({}, r, !0), t, !0);
}
const Uw = {
  time: {
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayOfWeekAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  legend: {
    selector: {
      all: "All",
      inverse: "Inv"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "Box Select",
        polygon: "Lasso Select",
        lineX: "Horizontally Select",
        lineY: "Vertically Select",
        keep: "Keep Selections",
        clear: "Clear Selections"
      }
    },
    dataView: {
      title: "Data View",
      lang: ["Data View", "Close", "Refresh"]
    },
    dataZoom: {
      title: {
        zoom: "Zoom",
        back: "Zoom Reset"
      }
    },
    magicType: {
      title: {
        line: "Switch to Line Chart",
        bar: "Switch to Bar Chart",
        stack: "Stack",
        tiled: "Tile"
      }
    },
    restore: {
      title: "Restore"
    },
    saveAsImage: {
      title: "Save as Image",
      lang: ["Right Click to Save Image"]
    }
  },
  series: {
    typeNames: {
      pie: "Pie chart",
      bar: "Bar chart",
      line: "Line chart",
      scatter: "Scatter plot",
      effectScatter: "Ripple scatter plot",
      radar: "Radar chart",
      tree: "Tree",
      treemap: "Treemap",
      boxplot: "Boxplot",
      candlestick: "Candlestick",
      k: "K line chart",
      heatmap: "Heat map",
      map: "Map",
      parallel: "Parallel coordinate map",
      lines: "Line graph",
      graph: "Relationship graph",
      sankey: "Sankey diagram",
      funnel: "Funnel chart",
      gauge: "Gauge",
      pictorialBar: "Pictorial bar",
      themeRiver: "Theme River Map",
      sunburst: "Sunburst",
      custom: "Custom chart",
      chart: "Chart"
    }
  },
  aria: {
    general: {
      withTitle: 'This is a chart about "{title}"',
      withoutTitle: "This is a chart"
    },
    series: {
      single: {
        prefix: "",
        withName: " with type {seriesType} named {seriesName}.",
        withoutName: " with type {seriesType}."
      },
      multiple: {
        prefix: ". It consists of {seriesCount} series count.",
        withName: " The {seriesId} series is a {seriesType} representing {seriesName}.",
        withoutName: " The {seriesId} series is a {seriesType}.",
        separator: {
          middle: "",
          end: ""
        }
      }
    },
    data: {
      allData: "The data is as follows: ",
      partialData: "The first {displayCnt} items are: ",
      withName: "the data for {name} is {value}",
      withoutName: "{value}",
      separator: {
        middle: ", ",
        end: ". "
      }
    }
  }
}, Yw = {
  time: {
    month: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthAbbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayOfWeekAbbr: ["日", "一", "二", "三", "四", "五", "六"]
  },
  legend: {
    selector: {
      all: "全选",
      inverse: "反选"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "矩形选择",
        polygon: "圈选",
        lineX: "横向选择",
        lineY: "纵向选择",
        keep: "保持选择",
        clear: "清除选择"
      }
    },
    dataView: {
      title: "数据视图",
      lang: ["数据视图", "关闭", "刷新"]
    },
    dataZoom: {
      title: {
        zoom: "区域缩放",
        back: "区域缩放还原"
      }
    },
    magicType: {
      title: {
        line: "切换为折线图",
        bar: "切换为柱状图",
        stack: "切换为堆叠",
        tiled: "切换为平铺"
      }
    },
    restore: {
      title: "还原"
    },
    saveAsImage: {
      title: "保存为图片",
      lang: ["右键另存为图片"]
    }
  },
  series: {
    typeNames: {
      pie: "饼图",
      bar: "柱状图",
      line: "折线图",
      scatter: "散点图",
      effectScatter: "涟漪散点图",
      radar: "雷达图",
      tree: "树图",
      treemap: "矩形树图",
      boxplot: "箱型图",
      candlestick: "K线图",
      k: "K线图",
      heatmap: "热力图",
      map: "地图",
      parallel: "平行坐标图",
      lines: "线图",
      graph: "关系图",
      sankey: "桑基图",
      funnel: "漏斗图",
      gauge: "仪表盘图",
      pictorialBar: "象形柱图",
      themeRiver: "主题河流图",
      sunburst: "旭日图",
      custom: "自定义图表",
      chart: "图表"
    }
  },
  aria: {
    general: {
      withTitle: "这是一个关于“{title}”的图表。",
      withoutTitle: "这是一个图表，"
    },
    series: {
      single: {
        prefix: "",
        withName: "图表类型是{seriesType}，表示{seriesName}。",
        withoutName: "图表类型是{seriesType}。"
      },
      multiple: {
        prefix: "它由{seriesCount}个图表系列组成。",
        withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
        withoutName: "第{seriesId}个系列是一个{seriesType}，",
        separator: {
          middle: "；",
          end: "。"
        }
      }
    },
    data: {
      allData: "其数据是——",
      partialData: "其中，前{displayCnt}项是——",
      withName: "{name}的数据是{value}",
      withoutName: "{value}",
      separator: {
        middle: "，",
        end: ""
      }
    }
  }
};
var Bo = "ZH", Gf = "EN", Ei = Gf, ho = {}, Wf = {}, Yg = U.domSupported ? (function() {
  var r = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || Ei).toUpperCase()
  );
  return r.indexOf(Bo) > -1 ? Bo : Ei;
})() : Ei;
function Zg(r, t) {
  r = r.toUpperCase(), Wf[r] = new mt(t), ho[r] = t;
}
function Zw(r) {
  if (z(r)) {
    var t = ho[r.toUpperCase()] || {};
    return r === Bo || r === Gf ? Q(t) : J(Q(t), Q(ho[Ei]), !1);
  } else
    return J(Q(r), Q(ho[Ei]), !1);
}
function Xw(r) {
  return Wf[r];
}
function $w() {
  return Wf[Ei];
}
Zg(Gf, Uw);
Zg(Bo, Yw);
var Uf = 1e3, Yf = Uf * 60, On = Yf * 60, ae = On * 24, qv = ae * 365, Tn = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, Ia = "{yyyy}-{MM}-{dd}", Kv = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: Ia,
  hour: Ia + " " + Tn.hour,
  minute: Ia + " " + Tn.minute,
  second: Ia + " " + Tn.second,
  millisecond: Tn.none
}, ml = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Xg = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function Ke(r, t) {
  return r += "", "0000".substr(0, t - r.length) + r;
}
function ki(r) {
  switch (r) {
    case "half-year":
    case "quarter":
      return "month";
    case "week":
    case "half-week":
      return "day";
    case "half-day":
    case "quarter-day":
      return "hour";
    default:
      return r;
  }
}
function qw(r) {
  return r === ki(r);
}
function Kw(r) {
  switch (r) {
    case "year":
    case "month":
      return "day";
    case "millisecond":
      return "millisecond";
    default:
      return "second";
  }
}
function gs(r, t, e, i) {
  var n = Ue(r), a = n[Zf(e)](), o = n[Oi(e)]() + 1, s = Math.floor((o - 1) / 3) + 1, l = n[ys(e)](), u = n["get" + (e ? "UTC" : "") + "Day"](), f = n[qn(e)](), h = (f - 1) % 12 + 1, v = n[ms(e)](), c = n[_s(e)](), p = n[Ss(e)](), d = f >= 12 ? "pm" : "am", g = d.toUpperCase(), y = i instanceof mt ? i : Xw(i || Yg) || $w(), m = y.getModel("time"), _ = m.get("month"), S = m.get("monthAbbr"), b = m.get("dayOfWeek"), w = m.get("dayOfWeekAbbr");
  return (t || "").replace(/{a}/g, d + "").replace(/{A}/g, g + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, Ke(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, _[o - 1]).replace(/{MMM}/g, S[o - 1]).replace(/{MM}/g, Ke(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, Ke(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, b[u]).replace(/{ee}/g, w[u]).replace(/{e}/g, u + "").replace(/{HH}/g, Ke(f, 2)).replace(/{H}/g, f + "").replace(/{hh}/g, Ke(h + "", 2)).replace(/{h}/g, h + "").replace(/{mm}/g, Ke(v, 2)).replace(/{m}/g, v + "").replace(/{ss}/g, Ke(c, 2)).replace(/{s}/g, c + "").replace(/{SSS}/g, Ke(p, 3)).replace(/{S}/g, p + "");
}
function Qw(r, t, e, i, n) {
  var a = null;
  if (z(e))
    a = e;
  else if (X(e))
    a = e(r.value, t, {
      level: r.level
    });
  else {
    var o = O({}, Tn);
    if (r.level > 0)
      for (var s = 0; s < ml.length; ++s)
        o[ml[s]] = "{primary|" + o[ml[s]] + "}";
    var l = e ? e.inherit === !1 ? e : st(e, o) : o, u = $g(r.value, n);
    if (l[u])
      a = l[u];
    else if (l.inherit) {
      for (var f = Xg.indexOf(u), s = f - 1; s >= 0; --s)
        if (l[u]) {
          a = l[u];
          break;
        }
      a = a || o.none;
    }
    if (N(a)) {
      var h = r.level == null ? 0 : r.level >= 0 ? r.level : a.length + r.level;
      h = Math.min(h, a.length - 1), a = a[h];
    }
  }
  return gs(new Date(r.value), a, n, i);
}
function $g(r, t) {
  var e = Ue(r), i = e[Oi(t)]() + 1, n = e[ys(t)](), a = e[qn(t)](), o = e[ms(t)](), s = e[_s(t)](), l = e[Ss(t)](), u = l === 0, f = u && s === 0, h = f && o === 0, v = h && a === 0, c = v && n === 1, p = c && i === 1;
  return p ? "year" : c ? "month" : v ? "day" : h ? "hour" : f ? "minute" : u ? "second" : "millisecond";
}
function Qv(r, t, e) {
  var i = ht(r) ? Ue(r) : r;
  switch (t = t || $g(r, e), t) {
    case "year":
      return i[Zf(e)]();
    case "half-year":
      return i[Oi(e)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((i[Oi(e)]() + 1) / 4);
    case "month":
      return i[Oi(e)]();
    case "day":
      return i[ys(e)]();
    case "half-day":
      return i[qn(e)]() / 24;
    case "hour":
      return i[qn(e)]();
    case "minute":
      return i[ms(e)]();
    case "second":
      return i[_s(e)]();
    case "millisecond":
      return i[Ss(e)]();
  }
}
function Zf(r) {
  return r ? "getUTCFullYear" : "getFullYear";
}
function Oi(r) {
  return r ? "getUTCMonth" : "getMonth";
}
function ys(r) {
  return r ? "getUTCDate" : "getDate";
}
function qn(r) {
  return r ? "getUTCHours" : "getHours";
}
function ms(r) {
  return r ? "getUTCMinutes" : "getMinutes";
}
function _s(r) {
  return r ? "getUTCSeconds" : "getSeconds";
}
function Ss(r) {
  return r ? "getUTCMilliseconds" : "getMilliseconds";
}
function Jw(r) {
  return r ? "setUTCFullYear" : "setFullYear";
}
function qg(r) {
  return r ? "setUTCMonth" : "setMonth";
}
function Kg(r) {
  return r ? "setUTCDate" : "setDate";
}
function Qg(r) {
  return r ? "setUTCHours" : "setHours";
}
function Jg(r) {
  return r ? "setUTCMinutes" : "setMinutes";
}
function jg(r) {
  return r ? "setUTCSeconds" : "setSeconds";
}
function ty(r) {
  return r ? "setUTCMilliseconds" : "setMilliseconds";
}
function ey(r) {
  if (!o1(r))
    return z(r) ? r : "-";
  var t = (r + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function ry(r, t) {
  return r = (r || "").toLowerCase().replace(/-(.)/g, function(e, i) {
    return i.toUpperCase();
  }), t && r && (r = r.charAt(0).toUpperCase() + r.slice(1)), r;
}
var ws = Pd;
function Nu(r, t, e) {
  var i = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function n(f) {
    return f && Ae(f) ? f : "-";
  }
  function a(f) {
    return !!(f != null && !isNaN(f) && isFinite(f));
  }
  var o = t === "time", s = r instanceof Date;
  if (o || s) {
    var l = o ? Ue(r) : r;
    if (isNaN(+l)) {
      if (s)
        return "-";
    } else return gs(l, i, e);
  }
  if (t === "ordinal")
    return fu(r) ? n(r) : ht(r) && a(r) ? r + "" : "-";
  var u = Ao(r);
  return a(u) ? ey(u) : fu(r) ? n(r) : typeof r == "boolean" ? r + "" : "-";
}
var Jv = ["a", "b", "c", "d", "e", "f", "g"], _l = function(r, t) {
  return "{" + r + (t ?? "") + "}";
};
function iy(r, t, e) {
  N(t) || (t = [t]);
  var i = t.length;
  if (!i)
    return "";
  for (var n = t[0].$vars || [], a = 0; a < n.length; a++) {
    var o = Jv[a];
    r = r.replace(_l(o), _l(o, 0));
  }
  for (var s = 0; s < i; s++)
    for (var l = 0; l < n.length; l++) {
      var u = t[s][n[l]];
      r = r.replace(_l(Jv[l], s), e ? Ft(u) : u);
    }
  return r;
}
function jw(r, t) {
  var e = z(r) ? {
    color: r,
    extraCssText: t
  } : r || {}, i = e.color, n = e.type;
  t = e.extraCssText;
  var a = e.renderMode || "html";
  if (!i)
    return "";
  if (a === "html")
    return n === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Ft(i) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + Ft(i) + ";" + (t || "") + '"></span>';
  var o = e.markerId || "markerX";
  return {
    renderMode: a,
    content: "{" + o + "|}  ",
    style: n === "subItem" ? {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: i
    } : {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: i
    }
  };
}
function Jr(r, t) {
  return t = t || "transparent", z(r) ? r : G(r) && r.colorStops && (r.colorStops[0] || {}).color || t;
}
var vo = M, tb = ["left", "right", "top", "bottom", "width", "height"], Pa = [["width", "left", "right"], ["height", "top", "bottom"]];
function Xf(r, t, e, i, n) {
  var a = 0, o = 0;
  i == null && (i = 1 / 0), n == null && (n = 1 / 0);
  var s = 0;
  t.eachChild(function(l, u) {
    var f = l.getBoundingRect(), h = t.childAt(u + 1), v = h && h.getBoundingRect(), c, p;
    if (r === "horizontal") {
      var d = f.width + (v ? -v.x + f.x : 0);
      c = a + d, c > i || l.newline ? (a = 0, c = d, o += s + e, s = f.height) : s = Math.max(s, f.height);
    } else {
      var g = f.height + (v ? -v.y + f.y : 0);
      p = o + g, p > n || l.newline ? (a += s + e, o = 0, p = g, s = f.width) : s = Math.max(s, f.width);
    }
    l.newline || (l.x = a, l.y = o, l.markRedraw(), r === "horizontal" ? a = c + e : o = p + e);
  });
}
var Bn = Xf;
lt(Xf, "vertical");
lt(Xf, "horizontal");
function Kn(r, t, e) {
  e = ws(e || 0);
  var i = t.width, n = t.height, a = St(r.left, i), o = St(r.top, n), s = St(r.right, i), l = St(r.bottom, n), u = St(r.width, i), f = St(r.height, n), h = e[2] + e[0], v = e[1] + e[3], c = r.aspect;
  switch (isNaN(u) && (u = i - s - v - a), isNaN(f) && (f = n - l - h - o), c != null && (isNaN(u) && isNaN(f) && (c > i / n ? u = i * 0.8 : f = n * 0.8), isNaN(u) && (u = c * f), isNaN(f) && (f = u / c)), isNaN(a) && (a = i - s - u - v), isNaN(o) && (o = n - l - f - h), r.left || r.right) {
    case "center":
      a = i / 2 - u / 2 - e[3];
      break;
    case "right":
      a = i - u - v;
      break;
  }
  switch (r.top || r.bottom) {
    case "middle":
    case "center":
      o = n / 2 - f / 2 - e[0];
      break;
    case "bottom":
      o = n - f - h;
      break;
  }
  a = a || 0, o = o || 0, isNaN(u) && (u = i - v - a - (s || 0)), isNaN(f) && (f = n - h - o - (l || 0));
  var p = new it(a + e[3], o + e[0], u, f);
  return p.margin = e, p;
}
function Qn(r) {
  var t = r.layoutMode || r.constructor.layoutMode;
  return G(t) ? t : t ? {
    type: t
  } : null;
}
function Vi(r, t, e) {
  var i = e && e.ignoreSize;
  !N(i) && (i = [i, i]);
  var n = o(Pa[0], 0), a = o(Pa[1], 1);
  u(Pa[0], r, n), u(Pa[1], r, a);
  function o(f, h) {
    var v = {}, c = 0, p = {}, d = 0, g = 2;
    if (vo(f, function(_) {
      p[_] = r[_];
    }), vo(f, function(_) {
      s(t, _) && (v[_] = p[_] = t[_]), l(v, _) && c++, l(p, _) && d++;
    }), i[h])
      return l(t, f[1]) ? p[f[2]] = null : l(t, f[2]) && (p[f[1]] = null), p;
    if (d === g || !c)
      return p;
    if (c >= g)
      return v;
    for (var y = 0; y < f.length; y++) {
      var m = f[y];
      if (!s(v, m) && s(r, m)) {
        v[m] = r[m];
        break;
      }
    }
    return v;
  }
  function s(f, h) {
    return f.hasOwnProperty(h);
  }
  function l(f, h) {
    return f[h] != null && f[h] !== "auto";
  }
  function u(f, h, v) {
    vo(f, function(c) {
      h[c] = v[c];
    });
  }
}
function fa(r) {
  return eb({}, r);
}
function eb(r, t) {
  return t && r && vo(tb, function(e) {
    t.hasOwnProperty(e) && (r[e] = t[e]);
  }), r;
}
var rb = pt(), ot = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e, i, n) {
      var a = r.call(this, e, i, n) || this;
      return a.uid = ps("ec_cpt_model"), a;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = Qn(this), a = n ? fa(e) : {}, o = i.getTheme();
      J(e, o.get(this.mainType)), J(e, this.getDefaultOption()), n && Vi(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      J(this.option, e, !0);
      var n = Qn(this);
      n && Vi(this.option, e, n);
    }, t.prototype.optionUpdated = function(e, i) {
    }, t.prototype.getDefaultOption = function() {
      var e = this.constructor;
      if (!C1(e))
        return e.defaultOption;
      var i = rb(this);
      if (!i.defaultOption) {
        for (var n = [], a = e; a; ) {
          var o = a.prototype.defaultOption;
          o && n.push(o), a = a.superClass;
        }
        for (var s = {}, l = n.length - 1; l >= 0; l--)
          s = J(s, n[l], !0);
        i.defaultOption = s;
      }
      return i.defaultOption;
    }, t.prototype.getReferringComponents = function(e, i) {
      var n = e + "Index", a = e + "Id";
      return sa(this.ecModel, e, {
        index: this.get(n, !0),
        id: this.get(a, !0)
      }, i);
    }, t.prototype.getBoxLayoutParams = function() {
      var e = this;
      return {
        left: e.get("left"),
        top: e.get("top"),
        right: e.get("right"),
        bottom: e.get("bottom"),
        width: e.get("width"),
        height: e.get("height")
      };
    }, t.prototype.getZLevelKey = function() {
      return "";
    }, t.prototype.setZLevel = function(e) {
      this.option.zlevel = e;
    }, t.protoInitialize = (function() {
      var e = t.prototype;
      e.type = "component", e.id = "", e.name = "", e.mainType = "", e.subType = "", e.componentIndex = 0;
    })(), t;
  })(mt)
);
ug(ot, mt);
es(ot);
Gw(ot);
Ww(ot, ib);
function ib(r) {
  var t = [];
  return M(ot.getClassesByMainType(r), function(e) {
    t = t.concat(e.dependencies || e.prototype.dependencies || []);
  }), t = V(t, function(e) {
    return Ie(e).main;
  }), r !== "dataset" && rt(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
var ny = "";
typeof navigator < "u" && (ny = navigator.platform || "");
var pi = "rgba(0, 0, 0, 0.2)";
const nb = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
  gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
  aria: {
    decal: {
      decals: [{
        color: pi,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: pi,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: pi,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: pi,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: pi,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: pi,
        symbol: "triangle",
        dashArrayX: [[9, 9], [0, 9, 9, 0]],
        dashArrayY: [7, 2],
        symbolSize: 0.75
      }]
    }
  },
  // If xAxis and yAxis declared, grid is created by default.
  // grid: {},
  textStyle: {
    // color: '#000',
    // decoration: 'none',
    // PENDING
    fontFamily: ny.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
    // fontFamily: 'Arial, Verdana, sans-serif',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal"
  },
  // http://blogs.adobe.com/webplatform/2014/02/24/using-blend-modes-in-html-canvas/
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  // Default is source-over
  blendMode: null,
  stateAnimation: {
    duration: 300,
    easing: "cubicOut"
  },
  animation: "auto",
  animationDuration: 1e3,
  animationDurationUpdate: 500,
  animationEasing: "cubicInOut",
  animationEasingUpdate: "cubicInOut",
  animationThreshold: 2e3,
  // Configuration for progressive/incremental rendering
  progressiveThreshold: 3e3,
  progressive: 400,
  // Threshold of if use single hover layer to optimize.
  // It is recommended that `hoverLayerThreshold` is equivalent to or less than
  // `progressiveThreshold`, otherwise hover will cause restart of progressive,
  // which is unexpected.
  // see example <echarts/test/heatmap-large.html>.
  hoverLayerThreshold: 3e3,
  // See: module:echarts/scale/Time
  useUTC: !1
};
var ay = Y(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]), fe = "original", Yt = "arrayRows", Oe = "objectRows", Xe = "keyedColumns", fr = "typedArray", oy = "unknown", Ge = "column", Xi = "row", Xt = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
}, sy = pt();
function ab(r) {
  sy(r).datasetMap = Y();
}
function ob(r, t, e) {
  var i = {}, n = ly(t);
  if (!n || !r)
    return i;
  var a = [], o = [], s = t.ecModel, l = sy(s).datasetMap, u = n.uid + "_" + e.seriesLayoutBy, f, h;
  r = r.slice(), M(r, function(d, g) {
    var y = G(d) ? d : r[g] = {
      name: d
    };
    y.type === "ordinal" && f == null && (f = g, h = p(y)), i[y.name] = [];
  });
  var v = l.get(u) || l.set(u, {
    categoryWayDim: h,
    valueWayDim: 0
  });
  M(r, function(d, g) {
    var y = d.name, m = p(d);
    if (f == null) {
      var _ = v.valueWayDim;
      c(i[y], _, m), c(o, _, m), v.valueWayDim += m;
    } else if (f === g)
      c(i[y], 0, m), c(a, 0, m);
    else {
      var _ = v.categoryWayDim;
      c(i[y], _, m), c(o, _, m), v.categoryWayDim += m;
    }
  });
  function c(d, g, y) {
    for (var m = 0; m < y; m++)
      d.push(g + m);
  }
  function p(d) {
    var g = d.dimsDef;
    return g ? g.length : 1;
  }
  return a.length && (i.itemName = a), o.length && (i.seriesName = o), i;
}
function ly(r) {
  var t = r.get("data", !0);
  if (!t)
    return sa(r.ecModel, "dataset", {
      index: r.get("datasetIndex", !0),
      id: r.get("datasetId", !0)
    }, Gt).models[0];
}
function sb(r) {
  return !r.get("transform", !0) && !r.get("fromTransformResult", !0) ? [] : sa(r.ecModel, "dataset", {
    index: r.get("fromDatasetIndex", !0),
    id: r.get("fromDatasetId", !0)
  }, Gt).models;
}
function uy(r, t) {
  return lb(r.data, r.sourceFormat, r.seriesLayoutBy, r.dimensionsDefine, r.startIndex, t);
}
function lb(r, t, e, i, n, a) {
  var o, s = 5;
  if (Ut(r))
    return Xt.Not;
  var l, u;
  if (i) {
    var f = i[a];
    G(f) ? (l = f.name, u = f.type) : z(f) && (l = f);
  }
  if (u != null)
    return u === "ordinal" ? Xt.Must : Xt.Not;
  if (t === Yt) {
    var h = r;
    if (e === Xi) {
      for (var v = h[a], c = 0; c < (v || []).length && c < s; c++)
        if ((o = S(v[n + c])) != null)
          return o;
    } else
      for (var c = 0; c < h.length && c < s; c++) {
        var p = h[n + c];
        if (p && (o = S(p[a])) != null)
          return o;
      }
  } else if (t === Oe) {
    var d = r;
    if (!l)
      return Xt.Not;
    for (var c = 0; c < d.length && c < s; c++) {
      var g = d[c];
      if (g && (o = S(g[l])) != null)
        return o;
    }
  } else if (t === Xe) {
    var y = r;
    if (!l)
      return Xt.Not;
    var v = y[l];
    if (!v || Ut(v))
      return Xt.Not;
    for (var c = 0; c < v.length && c < s; c++)
      if ((o = S(v[c])) != null)
        return o;
  } else if (t === fe)
    for (var m = r, c = 0; c < m.length && c < s; c++) {
      var g = m[c], _ = oa(g);
      if (!N(_))
        return Xt.Not;
      if ((o = S(_[a])) != null)
        return o;
    }
  function S(b) {
    var w = z(b);
    if (b != null && Number.isFinite(Number(b)) && b !== "")
      return w ? Xt.Might : Xt.Not;
    if (w && b !== "-")
      return Xt.Must;
  }
  return Xt.Not;
}
var ub = Y();
function fb(r, t, e) {
  var i = ub.get(t);
  if (!i)
    return e;
  var n = i(r);
  return n ? e.concat(n) : e;
}
var jv = pt();
pt();
var $f = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getColorFromPalette = function(t, e, i) {
      var n = Et(this.get("color", !0)), a = this.get("colorLayer", !0);
      return vb(this, jv, n, a, t, e, i);
    }, r.prototype.clearColorPalette = function() {
      cb(this, jv);
    }, r;
  })()
);
function hb(r, t) {
  for (var e = r.length, i = 0; i < e; i++)
    if (r[i].length > t)
      return r[i];
  return r[e - 1];
}
function vb(r, t, e, i, n, a, o) {
  a = a || r;
  var s = t(a), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
  if (u.hasOwnProperty(n))
    return u[n];
  var f = o == null || !i ? e : hb(i, o);
  if (f = f || e, !(!f || !f.length)) {
    var h = f[l];
    return n && (u[n] = h), s.paletteIdx = (l + 1) % f.length, h;
  }
}
function cb(r, t) {
  t(r).paletteIdx = 0, t(r).paletteNameMap = {};
}
var Ra, on, tc, ec = "\0_ec_inner", pb = 1, qf = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function(e, i, n, a, o, s) {
      a = a || {}, this.option = null, this._theme = new mt(a), this._locale = new mt(o), this._optionManager = s;
    }, t.prototype.setOption = function(e, i, n) {
      var a = nc(i);
      this._optionManager.setOption(e, n, a), this._resetOption(null, a);
    }, t.prototype.resetOption = function(e, i) {
      return this._resetOption(e, nc(i));
    }, t.prototype._resetOption = function(e, i) {
      var n = !1, a = this._optionManager;
      if (!e || e === "recreate") {
        var o = a.mountOption(e === "recreate");
        !this.option || e === "recreate" ? tc(this, o) : (this.restoreData(), this._mergeOption(o, i)), n = !0;
      }
      if ((e === "timeline" || e === "media") && this.restoreData(), !e || e === "recreate" || e === "timeline") {
        var s = a.getTimelineOption(this);
        s && (n = !0, this._mergeOption(s, i));
      }
      if (!e || e === "recreate" || e === "media") {
        var l = a.getMediaOption(this);
        l.length && M(l, function(u) {
          n = !0, this._mergeOption(u, i);
        }, this);
      }
      return n;
    }, t.prototype.mergeOption = function(e) {
      this._mergeOption(e, null);
    }, t.prototype._mergeOption = function(e, i) {
      var n = this.option, a = this._componentsMap, o = this._componentsCount, s = [], l = Y(), u = i && i.replaceMergeMainTypeMap;
      ab(this), M(e, function(h, v) {
        h != null && (ot.hasClass(v) ? v && (s.push(v), l.set(v, !0)) : n[v] = n[v] == null ? Q(h) : J(n[v], h, !0));
      }), u && u.each(function(h, v) {
        ot.hasClass(v) && !l.get(v) && (s.push(v), l.set(v, !0));
      }), ot.topologicalTravel(s, ot.getAllClassMainTypes(), f, this);
      function f(h) {
        var v = fb(this, h, Et(e[h])), c = a.get(h), p = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          c ? u && u.get(h) ? "replaceMerge" : "normalMerge" : "replaceAll"
        ), d = u1(c, v, p);
        g1(d, h, ot), n[h] = null, a.set(h, null), o.set(h, 0);
        var g = [], y = [], m = 0, _;
        M(d, function(S, b) {
          var w = S.existing, x = S.newOption;
          if (!x)
            w && (w.mergeOption({}, this), w.optionUpdated({}, !1));
          else {
            var C = h === "series", D = ot.getClass(
              h,
              S.keyInfo.subType,
              !C
              // Give a more detailed warn later if series don't exists
            );
            if (!D)
              return;
            if (h === "tooltip") {
              if (_)
                return;
              _ = !0;
            }
            if (w && w.constructor === D)
              w.name = S.keyInfo.name, w.mergeOption(x, this), w.optionUpdated(x, !1);
            else {
              var A = O({
                componentIndex: b
              }, S.keyInfo);
              w = new D(x, this, this, A), O(w, A), S.brandNew && (w.__requireNewView = !0), w.init(x, this, this), w.optionUpdated(null, !0);
            }
          }
          w ? (g.push(w.option), y.push(w), m++) : (g.push(void 0), y.push(void 0));
        }, this), n[h] = g, a.set(h, y), o.set(h, m), h === "series" && Ra(this);
      }
      this._seriesIndices || Ra(this);
    }, t.prototype.getOption = function() {
      var e = Q(this.option);
      return M(e, function(i, n) {
        if (ot.hasClass(n)) {
          for (var a = Et(i), o = a.length, s = !1, l = o - 1; l >= 0; l--)
            a[l] && !Wn(a[l]) ? s = !0 : (a[l] = null, !s && o--);
          a.length = o, e[n] = a;
        }
      }), delete e[ec], e;
    }, t.prototype.getTheme = function() {
      return this._theme;
    }, t.prototype.getLocaleModel = function() {
      return this._locale;
    }, t.prototype.setUpdatePayload = function(e) {
      this._payload = e;
    }, t.prototype.getUpdatePayload = function() {
      return this._payload;
    }, t.prototype.getComponent = function(e, i) {
      var n = this._componentsMap.get(e);
      if (n) {
        var a = n[i || 0];
        if (a)
          return a;
        if (i == null) {
          for (var o = 0; o < n.length; o++)
            if (n[o])
              return n[o];
        }
      }
    }, t.prototype.queryComponents = function(e) {
      var i = e.mainType;
      if (!i)
        return [];
      var n = e.index, a = e.id, o = e.name, s = this._componentsMap.get(i);
      if (!s || !s.length)
        return [];
      var l;
      return n != null ? (l = [], M(Et(n), function(u) {
        s[u] && l.push(s[u]);
      })) : a != null ? l = rc("id", a, s) : o != null ? l = rc("name", o, s) : l = bt(s, function(u) {
        return !!u;
      }), ic(l, e);
    }, t.prototype.findComponents = function(e) {
      var i = e.query, n = e.mainType, a = s(i), o = a ? this.queryComponents(a) : bt(this._componentsMap.get(n), function(u) {
        return !!u;
      });
      return l(ic(o, e));
      function s(u) {
        var f = n + "Index", h = n + "Id", v = n + "Name";
        return u && (u[f] != null || u[h] != null || u[v] != null) ? {
          mainType: n,
          // subType will be filtered finally.
          index: u[f],
          id: u[h],
          name: u[v]
        } : null;
      }
      function l(u) {
        return e.filter ? bt(u, e.filter) : u;
      }
    }, t.prototype.eachComponent = function(e, i, n) {
      var a = this._componentsMap;
      if (X(e)) {
        var o = i, s = e;
        a.each(function(h, v) {
          for (var c = 0; h && c < h.length; c++) {
            var p = h[c];
            p && s.call(o, v, p, p.componentIndex);
          }
        });
      } else
        for (var l = z(e) ? a.get(e) : G(e) ? this.findComponents(e) : null, u = 0; l && u < l.length; u++) {
          var f = l[u];
          f && i.call(n, f, f.componentIndex);
        }
    }, t.prototype.getSeriesByName = function(e) {
      var i = Re(e, null);
      return bt(this._componentsMap.get("series"), function(n) {
        return !!n && i != null && n.name === i;
      });
    }, t.prototype.getSeriesByIndex = function(e) {
      return this._componentsMap.get("series")[e];
    }, t.prototype.getSeriesByType = function(e) {
      return bt(this._componentsMap.get("series"), function(i) {
        return !!i && i.subType === e;
      });
    }, t.prototype.getSeries = function() {
      return bt(this._componentsMap.get("series"), function(e) {
        return !!e;
      });
    }, t.prototype.getSeriesCount = function() {
      return this._componentsCount.get("series");
    }, t.prototype.eachSeries = function(e, i) {
      on(this), M(this._seriesIndices, function(n) {
        var a = this._componentsMap.get("series")[n];
        e.call(i, a, n);
      }, this);
    }, t.prototype.eachRawSeries = function(e, i) {
      M(this._componentsMap.get("series"), function(n) {
        n && e.call(i, n, n.componentIndex);
      });
    }, t.prototype.eachSeriesByType = function(e, i, n) {
      on(this), M(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        o.subType === e && i.call(n, o, a);
      }, this);
    }, t.prototype.eachRawSeriesByType = function(e, i, n) {
      return M(this.getSeriesByType(e), i, n);
    }, t.prototype.isSeriesFiltered = function(e) {
      return on(this), this._seriesIndicesMap.get(e.componentIndex) == null;
    }, t.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    }, t.prototype.filterSeries = function(e, i) {
      on(this);
      var n = [];
      M(this._seriesIndices, function(a) {
        var o = this._componentsMap.get("series")[a];
        e.call(i, o, a) && n.push(a);
      }, this), this._seriesIndices = n, this._seriesIndicesMap = Y(n);
    }, t.prototype.restoreData = function(e) {
      Ra(this);
      var i = this._componentsMap, n = [];
      i.each(function(a, o) {
        ot.hasClass(o) && n.push(o);
      }), ot.topologicalTravel(n, ot.getAllClassMainTypes(), function(a) {
        M(i.get(a), function(o) {
          o && (a !== "series" || !db(o, e)) && o.restoreData();
        });
      });
    }, t.internalField = (function() {
      Ra = function(e) {
        var i = e._seriesIndices = [];
        M(e._componentsMap.get("series"), function(n) {
          n && i.push(n.componentIndex);
        }), e._seriesIndicesMap = Y(i);
      }, on = function(e) {
      }, tc = function(e, i) {
        e.option = {}, e.option[ec] = pb, e._componentsMap = Y({
          series: []
        }), e._componentsCount = Y();
        var n = i.aria;
        G(n) && n.enabled == null && (n.enabled = !0), gb(i, e._theme.option), J(i, nb, !1), e._mergeOption(i, null);
      };
    })(), t;
  })(mt)
);
function db(r, t) {
  if (t) {
    var e = t.seriesIndex, i = t.seriesId, n = t.seriesName;
    return e != null && r.componentIndex !== e || i != null && r.id !== i || n != null && r.name !== n;
  }
}
function gb(r, t) {
  var e = r.color && !r.colorLayer;
  M(t, function(i, n) {
    n === "colorLayer" && e || ot.hasClass(n) || (typeof i == "object" ? r[n] = r[n] ? J(r[n], i, !1) : Q(i) : r[n] == null && (r[n] = i));
  });
}
function rc(r, t, e) {
  if (N(t)) {
    var i = Y();
    return M(t, function(a) {
      if (a != null) {
        var o = Re(a, null);
        o != null && i.set(a, !0);
      }
    }), bt(e, function(a) {
      return a && i.get(a[r]);
    });
  } else {
    var n = Re(t, null);
    return bt(e, function(a) {
      return a && n != null && a[r] === n;
    });
  }
}
function ic(r, t) {
  return t.hasOwnProperty("subType") ? bt(r, function(e) {
    return e && e.subType === t.subType;
  }) : r;
}
function nc(r) {
  var t = Y();
  return r && M(Et(r.replaceMerge), function(e) {
    t.set(e, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
_e(qf, $f);
var yb = [
  "getDom",
  "getZr",
  "getWidth",
  "getHeight",
  "getDevicePixelRatio",
  "dispatchAction",
  "isSSR",
  "isDisposed",
  "on",
  "off",
  "getDataURL",
  "getConnectedDataURL",
  // 'getModel',
  "getOption",
  // 'getViewOfComponentModel',
  // 'getViewOfSeriesModel',
  "getId",
  "updateLabelLayout"
], fy = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r(t) {
      M(yb, function(e) {
        this[e] = Z(t[e], t);
      }, this);
    }
    return r;
  })()
), Sl = {}, Kf = (
  /** @class */
  (function() {
    function r() {
      this._coordinateSystems = [];
    }
    return r.prototype.create = function(t, e) {
      var i = [];
      M(Sl, function(n, a) {
        var o = n.create(t, e);
        i = i.concat(o || []);
      }), this._coordinateSystems = i;
    }, r.prototype.update = function(t, e) {
      M(this._coordinateSystems, function(i) {
        i.update && i.update(t, e);
      });
    }, r.prototype.getCoordinateSystems = function() {
      return this._coordinateSystems.slice();
    }, r.register = function(t, e) {
      Sl[t] = e;
    }, r.get = function(t) {
      return Sl[t];
    }, r;
  })()
), mb = /^(min|max)?(.+)$/, _b = (
  /** @class */
  (function() {
    function r(t) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = t;
    }
    return r.prototype.setOption = function(t, e, i) {
      t && (M(Et(t.series), function(o) {
        o && o.data && Ut(o.data) && hu(o.data);
      }), M(Et(t.dataset), function(o) {
        o && o.source && Ut(o.source) && hu(o.source);
      })), t = Q(t);
      var n = this._optionBackup, a = Sb(t, e, !n);
      this._newBaseOption = a.baseOption, n ? (a.timelineOptions.length && (n.timelineOptions = a.timelineOptions), a.mediaList.length && (n.mediaList = a.mediaList), a.mediaDefault && (n.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
    }, r.prototype.mountOption = function(t) {
      var e = this._optionBackup;
      return this._timelineOptions = e.timelineOptions, this._mediaList = e.mediaList, this._mediaDefault = e.mediaDefault, this._currentMediaIndices = [], Q(t ? e.baseOption : this._newBaseOption);
    }, r.prototype.getTimelineOption = function(t) {
      var e, i = this._timelineOptions;
      if (i.length) {
        var n = t.getComponent("timeline");
        n && (e = Q(
          // FIXME:TS as TimelineModel or quivlant interface
          i[n.getCurrentIndex()]
        ));
      }
      return e;
    }, r.prototype.getMediaOption = function(t) {
      var e = this._api.getWidth(), i = this._api.getHeight(), n = this._mediaList, a = this._mediaDefault, o = [], s = [];
      if (!n.length && !a)
        return s;
      for (var l = 0, u = n.length; l < u; l++)
        wb(n[l].query, e, i) && o.push(l);
      return !o.length && a && (o = [-1]), o.length && !xb(o, this._currentMediaIndices) && (s = V(o, function(f) {
        return Q(f === -1 ? a.option : n[f].option);
      })), this._currentMediaIndices = o, s;
    }, r;
  })()
);
function Sb(r, t, e) {
  var i = [], n, a, o = r.baseOption, s = r.timeline, l = r.options, u = r.media, f = !!r.media, h = !!(l || s || o && o.timeline);
  o ? (a = o, a.timeline || (a.timeline = s)) : ((h || f) && (r.options = r.media = null), a = r), f && N(u) && M(u, function(c) {
    c && c.option && (c.query ? i.push(c) : n || (n = c));
  }), v(a), M(l, function(c) {
    return v(c);
  }), M(i, function(c) {
    return v(c.option);
  });
  function v(c) {
    M(t, function(p) {
      p(c, e);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: n,
    mediaList: i
  };
}
function wb(r, t, e) {
  var i = {
    width: t,
    height: e,
    aspectratio: t / e
    // lower case for convenience.
  }, n = !0;
  return M(r, function(a, o) {
    var s = o.match(mb);
    if (!(!s || !s[1] || !s[2])) {
      var l = s[1], u = s[2].toLowerCase();
      bb(i[u], a, l) || (n = !1);
    }
  }), n;
}
function bb(r, t, e) {
  return e === "min" ? r >= t : e === "max" ? r <= t : r === t;
}
function xb(r, t) {
  return r.join(",") === t.join(",");
}
var ve = M, Jn = G, ac = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function wl(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0, i = ac.length; e < i; e++) {
      var n = ac[e], a = t.normal, o = t.emphasis;
      a && a[n] && (r[n] = r[n] || {}, r[n].normal ? J(r[n].normal, a[n]) : r[n].normal = a[n], a[n] = null), o && o[n] && (r[n] = r[n] || {}, r[n].emphasis ? J(r[n].emphasis, o[n]) : r[n].emphasis = o[n], o[n] = null);
    }
}
function Lt(r, t, e) {
  if (r && r[t] && (r[t].normal || r[t].emphasis)) {
    var i = r[t].normal, n = r[t].emphasis;
    i && (e ? (r[t].normal = r[t].emphasis = null, st(r[t], i)) : r[t] = i), n && (r.emphasis = r.emphasis || {}, r.emphasis[t] = n, n.focus && (r.emphasis.focus = n.focus), n.blurScope && (r.emphasis.blurScope = n.blurScope));
  }
}
function Cn(r) {
  Lt(r, "itemStyle"), Lt(r, "lineStyle"), Lt(r, "areaStyle"), Lt(r, "label"), Lt(r, "labelLine"), Lt(r, "upperLabel"), Lt(r, "edgeLabel");
}
function _t(r, t) {
  var e = Jn(r) && r[t], i = Jn(e) && e.textStyle;
  if (i)
    for (var n = 0, a = sv.length; n < a; n++) {
      var o = sv[n];
      i.hasOwnProperty(o) && (e[o] = i[o]);
    }
}
function te(r) {
  r && (Cn(r), _t(r, "label"), r.emphasis && _t(r.emphasis, "label"));
}
function Tb(r) {
  if (Jn(r)) {
    wl(r), Cn(r), _t(r, "label"), _t(r, "upperLabel"), _t(r, "edgeLabel"), r.emphasis && (_t(r.emphasis, "label"), _t(r.emphasis, "upperLabel"), _t(r.emphasis, "edgeLabel"));
    var t = r.markPoint;
    t && (wl(t), te(t));
    var e = r.markLine;
    e && (wl(e), te(e));
    var i = r.markArea;
    i && te(i);
    var n = r.data;
    if (r.type === "graph") {
      n = n || r.nodes;
      var a = r.links || r.edges;
      if (a && !Ut(a))
        for (var o = 0; o < a.length; o++)
          te(a[o]);
      M(r.categories, function(u) {
        Cn(u);
      });
    }
    if (n && !Ut(n))
      for (var o = 0; o < n.length; o++)
        te(n[o]);
    if (t = r.markPoint, t && t.data)
      for (var s = t.data, o = 0; o < s.length; o++)
        te(s[o]);
    if (e = r.markLine, e && e.data)
      for (var l = e.data, o = 0; o < l.length; o++)
        N(l[o]) ? (te(l[o][0]), te(l[o][1])) : te(l[o]);
    r.type === "gauge" ? (_t(r, "axisLabel"), _t(r, "title"), _t(r, "detail")) : r.type === "treemap" ? (Lt(r.breadcrumb, "itemStyle"), M(r.levels, function(u) {
      Cn(u);
    })) : r.type === "tree" && Cn(r.leaves);
  }
}
function Fe(r) {
  return N(r) ? r : r ? [r] : [];
}
function oc(r) {
  return (N(r) ? r[0] : r) || {};
}
function Cb(r, t) {
  ve(Fe(r.series), function(i) {
    Jn(i) && Tb(i);
  });
  var e = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && e.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), ve(e, function(i) {
    ve(Fe(r[i]), function(n) {
      n && (_t(n, "axisLabel"), _t(n.axisPointer, "label"));
    });
  }), ve(Fe(r.parallel), function(i) {
    var n = i && i.parallelAxisDefault;
    _t(n, "axisLabel"), _t(n && n.axisPointer, "label");
  }), ve(Fe(r.calendar), function(i) {
    Lt(i, "itemStyle"), _t(i, "dayLabel"), _t(i, "monthLabel"), _t(i, "yearLabel");
  }), ve(Fe(r.radar), function(i) {
    _t(i, "name"), i.name && i.axisName == null && (i.axisName = i.name, delete i.name), i.nameGap != null && i.axisNameGap == null && (i.axisNameGap = i.nameGap, delete i.nameGap);
  }), ve(Fe(r.geo), function(i) {
    Jn(i) && (te(i), ve(Fe(i.regions), function(n) {
      te(n);
    }));
  }), ve(Fe(r.timeline), function(i) {
    te(i), Lt(i, "label"), Lt(i, "itemStyle"), Lt(i, "controlStyle", !0);
    var n = i.data;
    N(n) && M(n, function(a) {
      G(a) && (Lt(a, "label"), Lt(a, "itemStyle"));
    });
  }), ve(Fe(r.toolbox), function(i) {
    Lt(i, "iconStyle"), ve(i.feature, function(n) {
      Lt(n, "iconStyle");
    });
  }), _t(oc(r.axisPointer), "label"), _t(oc(r.tooltip).axisPointer, "label");
}
function Mb(r, t) {
  for (var e = t.split(","), i = r, n = 0; n < e.length && (i = i && i[e[n]], i != null); n++)
    ;
  return i;
}
function Db(r, t, e, i) {
  for (var n = t.split(","), a = r, o, s = 0; s < n.length - 1; s++)
    o = n[s], a[o] == null && (a[o] = {}), a = a[o];
  a[n[s]] == null && (a[n[s]] = e);
}
function sc(r) {
  r && M(Ab, function(t) {
    t[0] in r && !(t[1] in r) && (r[t[1]] = r[t[0]]);
  });
}
var Ab = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], Lb = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], bl = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function sn(r) {
  var t = r && r.itemStyle;
  if (t)
    for (var e = 0; e < bl.length; e++) {
      var i = bl[e][1], n = bl[e][0];
      t[i] != null && (t[n] = t[i]);
    }
}
function lc(r) {
  r && r.alignTo === "edge" && r.margin != null && r.edgeDistance == null && (r.edgeDistance = r.margin);
}
function uc(r) {
  r && r.downplay && !r.blur && (r.blur = r.downplay);
}
function Ib(r) {
  r && r.focusNodeAdjacency != null && (r.emphasis = r.emphasis || {}, r.emphasis.focus == null && (r.emphasis.focus = "adjacency"));
}
function hy(r, t) {
  if (r)
    for (var e = 0; e < r.length; e++)
      t(r[e]), r[e] && hy(r[e].children, t);
}
function vy(r, t) {
  Cb(r, t), r.series = Et(r.series), M(r.series, function(e) {
    if (G(e)) {
      var i = e.type;
      if (i === "line")
        e.clipOverflow != null && (e.clip = e.clipOverflow);
      else if (i === "pie" || i === "gauge") {
        e.clockWise != null && (e.clockwise = e.clockWise), lc(e.label);
        var n = e.data;
        if (n && !Ut(n))
          for (var a = 0; a < n.length; a++)
            lc(n[a]);
        e.hoverOffset != null && (e.emphasis = e.emphasis || {}, (e.emphasis.scaleSize = null) && (e.emphasis.scaleSize = e.hoverOffset));
      } else if (i === "gauge") {
        var o = Mb(e, "pointer.color");
        o != null && Db(e, "itemStyle.color", o);
      } else if (i === "bar") {
        sn(e), sn(e.backgroundStyle), sn(e.emphasis);
        var n = e.data;
        if (n && !Ut(n))
          for (var a = 0; a < n.length; a++)
            typeof n[a] == "object" && (sn(n[a]), sn(n[a] && n[a].emphasis));
      } else if (i === "sunburst") {
        var s = e.highlightPolicy;
        s && (e.emphasis = e.emphasis || {}, e.emphasis.focus || (e.emphasis.focus = s)), uc(e), hy(e.data, uc);
      } else i === "graph" || i === "sankey" ? Ib(e) : i === "map" && (e.mapType && !e.map && (e.map = e.mapType), e.mapLocation && st(e, e.mapLocation));
      e.hoverAnimation != null && (e.emphasis = e.emphasis || {}, e.emphasis && e.emphasis.scale == null && (e.emphasis.scale = e.hoverAnimation)), sc(e);
    }
  }), r.dataRange && (r.visualMap = r.dataRange), M(Lb, function(e) {
    var i = r[e];
    i && (N(i) || (i = [i]), M(i, function(n) {
      sc(n);
    }));
  });
}
function Pb(r) {
  var t = Y();
  r.eachSeries(function(e) {
    var i = e.get("stack");
    if (i) {
      var n = t.get(i) || t.set(i, []), a = e.getData(), o = {
        // Used for calculate axis extent automatically.
        // TODO: Type getCalculationInfo return more specific type?
        stackResultDimension: a.getCalculationInfo("stackResultDimension"),
        stackedOverDimension: a.getCalculationInfo("stackedOverDimension"),
        stackedDimension: a.getCalculationInfo("stackedDimension"),
        stackedByDimension: a.getCalculationInfo("stackedByDimension"),
        isStackedByIndex: a.getCalculationInfo("isStackedByIndex"),
        data: a,
        seriesModel: e
      };
      if (!o.stackedDimension || !(o.isStackedByIndex || o.stackedByDimension))
        return;
      n.length && a.setCalculationInfo("stackedOnSeries", n[n.length - 1].seriesModel), n.push(o);
    }
  }), t.each(Rb);
}
function Rb(r) {
  M(r, function(t, e) {
    var i = [], n = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function(u, f, h) {
      var v = o.get(t.stackedDimension, h);
      if (isNaN(v))
        return n;
      var c, p;
      s ? p = o.getRawIndex(h) : c = o.get(t.stackedByDimension, h);
      for (var d = NaN, g = e - 1; g >= 0; g--) {
        var y = r[g];
        if (s || (p = y.data.rawIndexOf(y.stackedByDimension, c)), p >= 0) {
          var m = y.data.getByRawIndex(y.stackResultDimension, p);
          if (l === "all" || l === "positive" && m > 0 || l === "negative" && m < 0 || l === "samesign" && v >= 0 && m > 0 || l === "samesign" && v <= 0 && m < 0) {
            v = i1(v, m), d = m;
            break;
          }
        }
      }
      return i[0] = v, i[1] = d, i;
    });
  });
}
var bs = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r(t) {
      this.data = t.data || (t.sourceFormat === Xe ? {} : []), this.sourceFormat = t.sourceFormat || oy, this.seriesLayoutBy = t.seriesLayoutBy || Ge, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
      var e = this.dimensionsDefine = t.dimensionsDefine;
      if (e)
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          n.type == null && uy(this, i) === Xt.Must && (n.type = "ordinal");
        }
    }
    return r;
  })()
);
function Qf(r) {
  return r instanceof bs;
}
function Fu(r, t, e) {
  e = e || py(r);
  var i = t.seriesLayoutBy, n = kb(r, e, i, t.sourceHeader, t.dimensions), a = new bs({
    data: r,
    sourceFormat: e,
    seriesLayoutBy: i,
    dimensionsDefine: n.dimensionsDefine,
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount,
    metaRawOption: Q(t)
  });
  return a;
}
function cy(r) {
  return new bs({
    data: r,
    sourceFormat: Ut(r) ? fr : fe
  });
}
function Eb(r) {
  return new bs({
    data: r.data,
    sourceFormat: r.sourceFormat,
    seriesLayoutBy: r.seriesLayoutBy,
    dimensionsDefine: Q(r.dimensionsDefine),
    startIndex: r.startIndex,
    dimensionsDetectedCount: r.dimensionsDetectedCount
  });
}
function py(r) {
  var t = oy;
  if (Ut(r))
    t = fr;
  else if (N(r)) {
    r.length === 0 && (t = Yt);
    for (var e = 0, i = r.length; e < i; e++) {
      var n = r[e];
      if (n != null) {
        if (N(n) || Ut(n)) {
          t = Yt;
          break;
        } else if (G(n)) {
          t = Oe;
          break;
        }
      }
    }
  } else if (G(r)) {
    for (var a in r)
      if ($r(r, a) && Wt(r[a])) {
        t = Xe;
        break;
      }
  }
  return t;
}
function kb(r, t, e, i, n) {
  var a, o;
  if (!r)
    return {
      dimensionsDefine: fc(n),
      startIndex: o,
      dimensionsDetectedCount: a
    };
  if (t === Yt) {
    var s = r;
    i === "auto" || i == null ? hc(function(u) {
      u != null && u !== "-" && (z(u) ? o == null && (o = 1) : o = 0);
    }, e, s, 10) : o = ht(i) ? i : i ? 1 : 0, !n && o === 1 && (n = [], hc(function(u, f) {
      n[f] = u != null ? u + "" : "";
    }, e, s, 1 / 0)), a = n ? n.length : e === Xi ? s.length : s[0] ? s[0].length : null;
  } else if (t === Oe)
    n || (n = Ob(r));
  else if (t === Xe)
    n || (n = [], M(r, function(u, f) {
      n.push(f);
    }));
  else if (t === fe) {
    var l = oa(r[0]);
    a = N(l) && l.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: fc(n),
    dimensionsDetectedCount: a
  };
}
function Ob(r) {
  for (var t = 0, e; t < r.length && !(e = r[t++]); )
    ;
  if (e)
    return ct(e);
}
function fc(r) {
  if (r) {
    var t = Y();
    return V(r, function(e, i) {
      e = G(e) ? e : {
        name: e
      };
      var n = {
        name: e.name,
        displayName: e.displayName,
        type: e.type
      };
      if (n.name == null)
        return n;
      n.name += "", n.displayName == null && (n.displayName = n.name);
      var a = t.get(n.name);
      return a ? n.name += "-" + a.count++ : t.set(n.name, {
        count: 1
      }), n;
    });
  }
}
function hc(r, t, e, i) {
  if (t === Xi)
    for (var n = 0; n < e.length && n < i; n++)
      r(e[n] ? e[n][0] : null, n);
  else
    for (var a = e[0] || [], n = 0; n < a.length && n < i; n++)
      r(a[n], n);
}
function dy(r) {
  var t = r.sourceFormat;
  return t === Oe || t === Xe;
}
var kr, Or, Br, vc, cc, gy = (
  /** @class */
  (function() {
    function r(t, e) {
      var i = Qf(t) ? t : cy(t);
      this._source = i;
      var n = this._data = i.data;
      i.sourceFormat === fr && (this._offset = 0, this._dimSize = e, this._data = n), cc(this, n, i);
    }
    return r.prototype.getSource = function() {
      return this._source;
    }, r.prototype.count = function() {
      return 0;
    }, r.prototype.getItem = function(t, e) {
    }, r.prototype.appendData = function(t) {
    }, r.prototype.clean = function() {
    }, r.protoInitialize = (function() {
      var t = r.prototype;
      t.pure = !1, t.persistent = !0;
    })(), r.internalField = (function() {
      var t;
      cc = function(o, s, l) {
        var u = l.sourceFormat, f = l.seriesLayoutBy, h = l.startIndex, v = l.dimensionsDefine, c = vc[Jf(u, f)];
        if (O(o, c), u === fr)
          o.getItem = e, o.count = n, o.fillStorage = i;
        else {
          var p = yy(u, f);
          o.getItem = Z(p, null, s, h, v);
          var d = my(u, f);
          o.count = Z(d, null, s, h, v);
        }
      };
      var e = function(o, s) {
        o = o - this._offset, s = s || [];
        for (var l = this._data, u = this._dimSize, f = u * o, h = 0; h < u; h++)
          s[h] = l[f + h];
        return s;
      }, i = function(o, s, l, u) {
        for (var f = this._data, h = this._dimSize, v = 0; v < h; v++) {
          for (var c = u[v], p = c[0] == null ? 1 / 0 : c[0], d = c[1] == null ? -1 / 0 : c[1], g = s - o, y = l[v], m = 0; m < g; m++) {
            var _ = f[m * h + v];
            y[o + m] = _, _ < p && (p = _), _ > d && (d = _);
          }
          c[0] = p, c[1] = d;
        }
      }, n = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      vc = (t = {}, t[Yt + "_" + Ge] = {
        pure: !0,
        appendData: a
      }, t[Yt + "_" + Xi] = {
        pure: !0,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, t[Oe] = {
        pure: !0,
        appendData: a
      }, t[Xe] = {
        pure: !0,
        appendData: function(o) {
          var s = this._data;
          M(o, function(l, u) {
            for (var f = s[u] || (s[u] = []), h = 0; h < (l || []).length; h++)
              f.push(l[h]);
          });
        }
      }, t[fe] = {
        appendData: a
      }, t[fr] = {
        persistent: !1,
        pure: !0,
        appendData: function(o) {
          this._data = o;
        },
        // Clean self if data is already used.
        clean: function() {
          this._offset += this.count(), this._data = null;
        }
      }, t);
      function a(o) {
        for (var s = 0; s < o.length; s++)
          this._data.push(o[s]);
      }
    })(), r;
  })()
), pc = function(r, t, e, i) {
  return r[i];
}, Bb = (kr = {}, kr[Yt + "_" + Ge] = function(r, t, e, i) {
  return r[i + t];
}, kr[Yt + "_" + Xi] = function(r, t, e, i, n) {
  i += t;
  for (var a = n || [], o = r, s = 0; s < o.length; s++) {
    var l = o[s];
    a[s] = l ? l[i] : null;
  }
  return a;
}, kr[Oe] = pc, kr[Xe] = function(r, t, e, i, n) {
  for (var a = n || [], o = 0; o < e.length; o++) {
    var s = e[o].name, l = r[s];
    a[o] = l ? l[i] : null;
  }
  return a;
}, kr[fe] = pc, kr);
function yy(r, t) {
  var e = Bb[Jf(r, t)];
  return e;
}
var dc = function(r, t, e) {
  return r.length;
}, Nb = (Or = {}, Or[Yt + "_" + Ge] = function(r, t, e) {
  return Math.max(0, r.length - t);
}, Or[Yt + "_" + Xi] = function(r, t, e) {
  var i = r[0];
  return i ? Math.max(0, i.length - t) : 0;
}, Or[Oe] = dc, Or[Xe] = function(r, t, e) {
  var i = e[0].name, n = r[i];
  return n ? n.length : 0;
}, Or[fe] = dc, Or);
function my(r, t) {
  var e = Nb[Jf(r, t)];
  return e;
}
var xl = function(r, t, e) {
  return r[t];
}, Fb = (Br = {}, Br[Yt] = xl, Br[Oe] = function(r, t, e) {
  return r[e];
}, Br[Xe] = xl, Br[fe] = function(r, t, e) {
  var i = oa(r);
  return i instanceof Array ? i[t] : i;
}, Br[fr] = xl, Br);
function _y(r) {
  var t = Fb[r];
  return t;
}
function Jf(r, t) {
  return r === Yt ? r + "_" + t : r;
}
function Hi(r, t, e) {
  if (r) {
    var i = r.getRawDataItem(t);
    if (i != null) {
      var n = r.getStore(), a = n.getSource().sourceFormat;
      if (e != null) {
        var o = r.getDimensionIndex(e), s = n.getDimensionProperty(o);
        return _y(a)(i, o, s);
      } else {
        var l = i;
        return a === fe && (l = oa(i)), l;
      }
    }
  }
}
var zb = /\{@(.+?)\}/g, jf = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getDataParams = function(t, e) {
      var i = this.getData(e), n = this.getRawValue(t, e), a = i.getRawIndex(t), o = i.getName(t), s = i.getRawDataItem(t), l = i.getItemVisual(t, "style"), u = l && l[i.getItemVisual(t, "drawType") || "fill"], f = l && l.stroke, h = this.mainType, v = h === "series", c = i.userOutput && i.userOutput.get();
      return {
        componentType: h,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: v ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: v ? this.id : null,
        seriesName: v ? this.name : null,
        name: o,
        dataIndex: a,
        data: s,
        dataType: e,
        value: n,
        color: u,
        borderColor: f,
        dimensionNames: c ? c.fullDimensions : null,
        encode: c ? c.encode : null,
        // Param name list for mapping `a`, `b`, `c`, `d`, `e`
        $vars: ["seriesName", "name", "value"]
      };
    }, r.prototype.getFormattedLabel = function(t, e, i, n, a, o) {
      e = e || "normal";
      var s = this.getData(i), l = this.getDataParams(t, i);
      if (o && (l.value = o.interpolatedValue), n != null && N(l.value) && (l.value = l.value[n]), !a) {
        var u = s.getItemModel(t);
        a = u.get(e === "normal" ? ["label", "formatter"] : [e, "label", "formatter"]);
      }
      if (X(a))
        return l.status = e, l.dimensionIndex = n, a(l);
      if (z(a)) {
        var f = iy(a, l);
        return f.replace(zb, function(h, v) {
          var c = v.length, p = v;
          p.charAt(0) === "[" && p.charAt(c - 1) === "]" && (p = +p.slice(1, c - 1));
          var d = Hi(s, t, p);
          if (o && N(o.interpolatedValue)) {
            var g = s.getDimensionIndex(p);
            g >= 0 && (d = o.interpolatedValue[g]);
          }
          return d != null ? d + "" : "";
        });
      }
    }, r.prototype.getRawValue = function(t, e) {
      return Hi(this.getData(e), t);
    }, r.prototype.formatTooltip = function(t, e, i) {
    }, r;
  })()
);
function gc(r) {
  var t, e;
  return G(r) ? r.type && (e = r) : t = r, {
    text: t,
    // markers: markers || markersExisting,
    frag: e
  };
}
function Nn(r) {
  return new Vb(r);
}
var Vb = (
  /** @class */
  (function() {
    function r(t) {
      t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0;
    }
    return r.prototype.perform = function(t) {
      var e = this._upstream, i = t && t.skip;
      if (this._dirty && e) {
        var n = this.context;
        n.data = n.outputData = e.context.outputData;
      }
      this.__pipeline && (this.__pipeline.currentTask = this);
      var a;
      this._plan && !i && (a = this._plan(this.context));
      var o = f(this._modBy), s = this._modDataCount || 0, l = f(t && t.modBy), u = t && t.modDataCount || 0;
      (o !== l || s !== u) && (a = "reset");
      function f(m) {
        return !(m >= 1) && (m = 1), m;
      }
      var h;
      (this._dirty || a === "reset") && (this._dirty = !1, h = this._doReset(i)), this._modBy = l, this._modDataCount = u;
      var v = t && t.step;
      if (e ? this._dueEnd = e._outputDueEnd : this._dueEnd = this._count ? this._count(this.context) : 1 / 0, this._progress) {
        var c = this._dueIndex, p = Math.min(v != null ? this._dueIndex + v : 1 / 0, this._dueEnd);
        if (!i && (h || c < p)) {
          var d = this._progress;
          if (N(d))
            for (var g = 0; g < d.length; g++)
              this._doProgress(d[g], c, p, l, u);
          else
            this._doProgress(d, c, p, l, u);
        }
        this._dueIndex = p;
        var y = this._settedOutputEnd != null ? this._settedOutputEnd : p;
        this._outputDueEnd = y;
      } else
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, r.prototype.dirty = function() {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, r.prototype._doProgress = function(t, e, i, n, a) {
      yc.reset(e, i, n, a), this._callingProgress = t, this._callingProgress({
        start: e,
        end: i,
        count: i - e,
        next: yc.next
      }, this.context);
    }, r.prototype._doReset = function(t) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
      var e, i;
      !t && this._reset && (e = this._reset(this.context), e && e.progress && (i = e.forceFirstProgress, e = e.progress), N(e) && !e.length && (e = null)), this._progress = e, this._modBy = this._modDataCount = null;
      var n = this._downstream;
      return n && n.dirty(), i;
    }, r.prototype.unfinished = function() {
      return this._progress && this._dueIndex < this._dueEnd;
    }, r.prototype.pipe = function(t) {
      (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty());
    }, r.prototype.dispose = function() {
      this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0);
    }, r.prototype.getUpstream = function() {
      return this._upstream;
    }, r.prototype.getDownstream = function() {
      return this._downstream;
    }, r.prototype.setOutputEnd = function(t) {
      this._outputDueEnd = this._settedOutputEnd = t;
    }, r;
  })()
), yc = /* @__PURE__ */ (function() {
  var r, t, e, i, n, a = {
    reset: function(l, u, f, h) {
      t = l, r = u, e = f, i = h, n = Math.ceil(i / e), a.next = e > 1 && i > 0 ? s : o;
    }
  };
  return a;
  function o() {
    return t < r ? t++ : null;
  }
  function s() {
    var l = t % n * e + Math.ceil(t / n), u = t >= r ? null : l < i ? l : t;
    return t++, u;
  }
})();
function hr(r, t) {
  var e = t && t.type;
  return e === "ordinal" ? r : (e === "time" && !ht(r) && r != null && r !== "-" && (r = +Ue(r)), r == null || r === "" ? NaN : Number(r));
}
Y({
  number: function(r) {
    return parseFloat(r);
  },
  time: function(r) {
    return +Ue(r);
  },
  trim: function(r) {
    return z(r) ? Ae(r) : r;
  }
});
var Hb = (
  /** @class */
  (function() {
    function r(t, e) {
      var i = t === "desc";
      this._resultLT = i ? 1 : -1, e == null && (e = i ? "min" : "max"), this._incomparable = e === "min" ? -1 / 0 : 1 / 0;
    }
    return r.prototype.evaluate = function(t, e) {
      var i = ht(t) ? t : Ao(t), n = ht(e) ? e : Ao(e), a = isNaN(i), o = isNaN(n);
      if (a && (i = this._incomparable), o && (n = this._incomparable), a && o) {
        var s = z(t), l = z(e);
        s && (i = l ? t : 0), l && (n = s ? e : 0);
      }
      return i < n ? this._resultLT : i > n ? -this._resultLT : 0;
    }, r;
  })()
), Gb = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getRawData = function() {
      throw new Error("not supported");
    }, r.prototype.getRawDataItem = function(t) {
      throw new Error("not supported");
    }, r.prototype.cloneRawData = function() {
    }, r.prototype.getDimensionInfo = function(t) {
    }, r.prototype.cloneAllDimensionInfo = function() {
    }, r.prototype.count = function() {
    }, r.prototype.retrieveValue = function(t, e) {
    }, r.prototype.retrieveValueFromItem = function(t, e) {
    }, r.prototype.convertValue = function(t, e) {
      return hr(t, e);
    }, r;
  })()
);
function Wb(r, t) {
  var e = new Gb(), i = r.data, n = e.sourceFormat = r.sourceFormat, a = r.startIndex, o = "";
  r.seriesLayoutBy !== Ge && Vt(o);
  var s = [], l = {}, u = r.dimensionsDefine;
  if (u)
    M(u, function(d, g) {
      var y = d.name, m = {
        index: g,
        name: y,
        displayName: d.displayName
      };
      if (s.push(m), y != null) {
        var _ = "";
        $r(l, y) && Vt(_), l[y] = m;
      }
    });
  else
    for (var f = 0; f < r.dimensionsDetectedCount; f++)
      s.push({
        index: f
      });
  var h = yy(n, Ge);
  t.__isBuiltIn && (e.getRawDataItem = function(d) {
    return h(i, a, s, d);
  }, e.getRawData = Z(Ub, null, r)), e.cloneRawData = Z(Yb, null, r);
  var v = my(n, Ge);
  e.count = Z(v, null, i, a, s);
  var c = _y(n);
  e.retrieveValue = function(d, g) {
    var y = h(i, a, s, d);
    return p(y, g);
  };
  var p = e.retrieveValueFromItem = function(d, g) {
    if (d != null) {
      var y = s[g];
      if (y)
        return c(d, g, y.name);
    }
  };
  return e.getDimensionInfo = Z(Zb, null, s, l), e.cloneAllDimensionInfo = Z(Xb, null, s), e;
}
function Ub(r) {
  var t = r.sourceFormat;
  if (!th(t)) {
    var e = "";
    Vt(e);
  }
  return r.data;
}
function Yb(r) {
  var t = r.sourceFormat, e = r.data;
  if (!th(t)) {
    var i = "";
    Vt(i);
  }
  if (t === Yt) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(e[a].slice());
    return n;
  } else if (t === Oe) {
    for (var n = [], a = 0, o = e.length; a < o; a++)
      n.push(O({}, e[a]));
    return n;
  }
}
function Zb(r, t, e) {
  if (e != null) {
    if (ht(e) || !isNaN(e) && !$r(t, e))
      return r[e];
    if ($r(t, e))
      return t[e];
  }
}
function Xb(r) {
  return Q(r);
}
var Sy = Y();
function $b(r) {
  r = Q(r);
  var t = r.type, e = "";
  t || Vt(e);
  var i = t.split(":");
  i.length !== 2 && Vt(e);
  var n = !1;
  i[0] === "echarts" && (t = i[1], n = !0), r.__isBuiltIn = n, Sy.set(t, r);
}
function qb(r, t, e) {
  var i = Et(r), n = i.length, a = "";
  n || Vt(a);
  for (var o = 0, s = n; o < s; o++) {
    var l = i[o];
    t = Kb(l, t), o !== s - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function Kb(r, t, e, i) {
  var n = "";
  t.length || Vt(n), G(r) || Vt(n);
  var a = r.type, o = Sy.get(a);
  o || Vt(n);
  var s = V(t, function(u) {
    return Wb(u, o);
  }), l = Et(o.transform({
    upstream: s[0],
    upstreamList: s,
    config: Q(r.config)
  }));
  return V(l, function(u, f) {
    var h = "";
    G(u) || Vt(h), u.data || Vt(h);
    var v = py(u.data);
    th(v) || Vt(h);
    var c, p = t[0];
    if (p && f === 0 && !u.dimensions) {
      var d = p.startIndex;
      d && (u.data = p.data.slice(0, d).concat(u.data)), c = {
        seriesLayoutBy: Ge,
        sourceHeader: d,
        dimensions: p.metaRawOption.dimensions
      };
    } else
      c = {
        seriesLayoutBy: Ge,
        sourceHeader: 0,
        dimensions: u.dimensions
      };
    return Fu(u.data, c, null);
  });
}
function th(r) {
  return r === Yt || r === Oe;
}
var xs = "undefined", Qb = typeof Uint32Array === xs ? Array : Uint32Array, Jb = typeof Uint16Array === xs ? Array : Uint16Array, wy = typeof Int32Array === xs ? Array : Int32Array, mc = typeof Float64Array === xs ? Array : Float64Array, by = {
  float: mc,
  int: wy,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: mc
}, Tl;
function di(r) {
  return r > 65535 ? Qb : Jb;
}
function gi() {
  return [1 / 0, -1 / 0];
}
function jb(r) {
  var t = r.constructor;
  return t === Array ? r.slice() : new t(r);
}
function _c(r, t, e, i, n) {
  var a = by[e || "float"];
  if (n) {
    var o = r[t], s = o && o.length;
    if (s !== i) {
      for (var l = new a(i), u = 0; u < s; u++)
        l[u] = o[u];
      r[t] = l;
    }
  } else
    r[t] = new a(i);
}
var zu = (
  /** @class */
  (function() {
    function r() {
      this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = Y();
    }
    return r.prototype.initData = function(t, e, i) {
      this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
      var n = t.getSource(), a = this.defaultDimValueGetter = Tl[n.sourceFormat];
      this._dimValueGetter = i || a, this._rawExtent = [], dy(n), this._dimensions = V(e, function(o) {
        return {
          // Only pick these two props. Not leak other properties like orderMeta.
          type: o.type,
          property: o.property
        };
      }), this._initDataFromProvider(0, t.count());
    }, r.prototype.getProvider = function() {
      return this._provider;
    }, r.prototype.getSource = function() {
      return this._provider.getSource();
    }, r.prototype.ensureCalculationDimension = function(t, e) {
      var i = this._calcDimNameToIdx, n = this._dimensions, a = i.get(t);
      if (a != null) {
        if (n[a].type === e)
          return a;
      } else
        a = n.length;
      return n[a] = {
        type: e
      }, i.set(t, a), this._chunks[a] = new by[e || "float"](this._rawCount), this._rawExtent[a] = gi(), a;
    }, r.prototype.collectOrdinalMeta = function(t, e) {
      var i = this._chunks[t], n = this._dimensions[t], a = this._rawExtent, o = n.ordinalOffset || 0, s = i.length;
      o === 0 && (a[t] = gi());
      for (var l = a[t], u = o; u < s; u++) {
        var f = i[u] = e.parseAndCollect(i[u]);
        isNaN(f) || (l[0] = Math.min(f, l[0]), l[1] = Math.max(f, l[1]));
      }
      n.ordinalMeta = e, n.ordinalOffset = s, n.type = "ordinal";
    }, r.prototype.getOrdinalMeta = function(t) {
      var e = this._dimensions[t], i = e.ordinalMeta;
      return i;
    }, r.prototype.getDimensionProperty = function(t) {
      var e = this._dimensions[t];
      return e && e.property;
    }, r.prototype.appendData = function(t) {
      var e = this._provider, i = this.count();
      e.appendData(t);
      var n = e.count();
      return e.persistent || (n += i), i < n && this._initDataFromProvider(i, n, !0), [i, n];
    }, r.prototype.appendValues = function(t, e) {
      for (var i = this._chunks, n = this._dimensions, a = n.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, e || 0), u = 0; u < a; u++) {
        var f = n[u];
        _c(i, u, f.type, l, !0);
      }
      for (var h = [], v = s; v < l; v++)
        for (var c = v - s, p = 0; p < a; p++) {
          var f = n[p], d = Tl.arrayRows.call(this, t[c] || h, f.property, c, p);
          i[p][v] = d;
          var g = o[p];
          d < g[0] && (g[0] = d), d > g[1] && (g[1] = d);
        }
      return this._rawCount = this._count = l, {
        start: s,
        end: l
      };
    }, r.prototype._initDataFromProvider = function(t, e, i) {
      for (var n = this._provider, a = this._chunks, o = this._dimensions, s = o.length, l = this._rawExtent, u = V(o, function(m) {
        return m.property;
      }), f = 0; f < s; f++) {
        var h = o[f];
        l[f] || (l[f] = gi()), _c(a, f, h.type, e, i);
      }
      if (n.fillStorage)
        n.fillStorage(t, e, a, l);
      else
        for (var v = [], c = t; c < e; c++) {
          v = n.getItem(c, v);
          for (var p = 0; p < s; p++) {
            var d = a[p], g = this._dimValueGetter(v, u[p], c, p);
            d[c] = g;
            var y = l[p];
            g < y[0] && (y[0] = g), g > y[1] && (y[1] = g);
          }
        }
      !n.persistent && n.clean && n.clean(), this._rawCount = this._count = e, this._extent = [];
    }, r.prototype.count = function() {
      return this._count;
    }, r.prototype.get = function(t, e) {
      if (!(e >= 0 && e < this._count))
        return NaN;
      var i = this._chunks[t];
      return i ? i[this.getRawIndex(e)] : NaN;
    }, r.prototype.getValues = function(t, e) {
      var i = [], n = [];
      if (e == null) {
        e = t, t = [];
        for (var a = 0; a < this._dimensions.length; a++)
          n.push(a);
      } else
        n = t;
      for (var a = 0, o = n.length; a < o; a++)
        i.push(this.get(n[a], e));
      return i;
    }, r.prototype.getByRawIndex = function(t, e) {
      if (!(e >= 0 && e < this._rawCount))
        return NaN;
      var i = this._chunks[t];
      return i ? i[e] : NaN;
    }, r.prototype.getSum = function(t) {
      var e = this._chunks[t], i = 0;
      if (e)
        for (var n = 0, a = this.count(); n < a; n++) {
          var o = this.get(t, n);
          isNaN(o) || (i += o);
        }
      return i;
    }, r.prototype.getMedian = function(t) {
      var e = [];
      this.each([t], function(a) {
        isNaN(a) || e.push(a);
      });
      var i = e.sort(function(a, o) {
        return a - o;
      }), n = this.count();
      return n === 0 ? 0 : n % 2 === 1 ? i[(n - 1) / 2] : (i[n / 2] + i[n / 2 - 1]) / 2;
    }, r.prototype.indexOfRawIndex = function(t) {
      if (t >= this._rawCount || t < 0)
        return -1;
      if (!this._indices)
        return t;
      var e = this._indices, i = e[t];
      if (i != null && i < this._count && i === t)
        return t;
      for (var n = 0, a = this._count - 1; n <= a; ) {
        var o = (n + a) / 2 | 0;
        if (e[o] < t)
          n = o + 1;
        else if (e[o] > t)
          a = o - 1;
        else
          return o;
      }
      return -1;
    }, r.prototype.indicesOfNearest = function(t, e, i) {
      var n = this._chunks, a = n[t], o = [];
      if (!a)
        return o;
      i == null && (i = 1 / 0);
      for (var s = 1 / 0, l = -1, u = 0, f = 0, h = this.count(); f < h; f++) {
        var v = this.getRawIndex(f), c = e - a[v], p = Math.abs(c);
        p <= i && ((p < s || p === s && c >= 0 && l < 0) && (s = p, l = c, u = 0), c === l && (o[u++] = f));
      }
      return o.length = u, o;
    }, r.prototype.getIndices = function() {
      var t, e = this._indices;
      if (e) {
        var i = e.constructor, n = this._count;
        if (i === Array) {
          t = new i(n);
          for (var a = 0; a < n; a++)
            t[a] = e[a];
        } else
          t = new i(e.buffer, 0, n);
      } else {
        var i = di(this._rawCount);
        t = new i(this.count());
        for (var a = 0; a < t.length; a++)
          t[a] = a;
      }
      return t;
    }, r.prototype.filter = function(t, e) {
      if (!this._count)
        return this;
      for (var i = this.clone(), n = i.count(), a = di(i._rawCount), o = new a(n), s = [], l = t.length, u = 0, f = t[0], h = i._chunks, v = 0; v < n; v++) {
        var c = void 0, p = i.getRawIndex(v);
        if (l === 0)
          c = e(v);
        else if (l === 1) {
          var d = h[f][p];
          c = e(d, v);
        } else {
          for (var g = 0; g < l; g++)
            s[g] = h[t[g]][p];
          s[g] = v, c = e.apply(null, s);
        }
        c && (o[u++] = p);
      }
      return u < n && (i._indices = o), i._count = u, i._extent = [], i._updateGetRawIdx(), i;
    }, r.prototype.selectRange = function(t) {
      var e = this.clone(), i = e._count;
      if (!i)
        return this;
      var n = ct(t), a = n.length;
      if (!a)
        return this;
      var o = e.count(), s = di(e._rawCount), l = new s(o), u = 0, f = n[0], h = t[f][0], v = t[f][1], c = e._chunks, p = !1;
      if (!e._indices) {
        var d = 0;
        if (a === 1) {
          for (var g = c[n[0]], y = 0; y < i; y++) {
            var m = g[y];
            (m >= h && m <= v || isNaN(m)) && (l[u++] = d), d++;
          }
          p = !0;
        } else if (a === 2) {
          for (var g = c[n[0]], _ = c[n[1]], S = t[n[1]][0], b = t[n[1]][1], y = 0; y < i; y++) {
            var m = g[y], w = _[y];
            (m >= h && m <= v || isNaN(m)) && (w >= S && w <= b || isNaN(w)) && (l[u++] = d), d++;
          }
          p = !0;
        }
      }
      if (!p)
        if (a === 1)
          for (var y = 0; y < o; y++) {
            var x = e.getRawIndex(y), m = c[n[0]][x];
            (m >= h && m <= v || isNaN(m)) && (l[u++] = x);
          }
        else
          for (var y = 0; y < o; y++) {
            for (var C = !0, x = e.getRawIndex(y), D = 0; D < a; D++) {
              var A = n[D], m = c[A][x];
              (m < t[A][0] || m > t[A][1]) && (C = !1);
            }
            C && (l[u++] = e.getRawIndex(y));
          }
      return u < o && (e._indices = l), e._count = u, e._extent = [], e._updateGetRawIdx(), e;
    }, r.prototype.map = function(t, e) {
      var i = this.clone(t);
      return this._updateDims(i, t, e), i;
    }, r.prototype.modify = function(t, e) {
      this._updateDims(this, t, e);
    }, r.prototype._updateDims = function(t, e, i) {
      for (var n = t._chunks, a = [], o = e.length, s = t.count(), l = [], u = t._rawExtent, f = 0; f < e.length; f++)
        u[e[f]] = gi();
      for (var h = 0; h < s; h++) {
        for (var v = t.getRawIndex(h), c = 0; c < o; c++)
          l[c] = n[e[c]][v];
        l[o] = h;
        var p = i && i.apply(null, l);
        if (p != null) {
          typeof p != "object" && (a[0] = p, p = a);
          for (var f = 0; f < p.length; f++) {
            var d = e[f], g = p[f], y = u[d], m = n[d];
            m && (m[v] = g), g < y[0] && (y[0] = g), g > y[1] && (y[1] = g);
          }
        }
      }
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = this.clone([t], !0), n = i._chunks, a = n[t], o = this.count(), s = 0, l = Math.floor(1 / e), u = this.getRawIndex(0), f, h, v, c = new (di(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
      c[s++] = u;
      for (var p = 1; p < o - 1; p += l) {
        for (var d = Math.min(p + l, o - 1), g = Math.min(p + l * 2, o), y = (g + d) / 2, m = 0, _ = d; _ < g; _++) {
          var S = this.getRawIndex(_), b = a[S];
          isNaN(b) || (m += b);
        }
        m /= g - d;
        var w = p, x = Math.min(p + l, o), C = p - 1, D = a[u];
        f = -1, v = w;
        for (var A = -1, T = 0, _ = w; _ < x; _++) {
          var S = this.getRawIndex(_), b = a[S];
          if (isNaN(b)) {
            T++, A < 0 && (A = S);
            continue;
          }
          h = Math.abs((C - y) * (b - D) - (C - _) * (m - D)), h > f && (f = h, v = S);
        }
        T > 0 && T < x - w && (c[s++] = Math.min(A, v), v = Math.max(A, v)), c[s++] = v, u = v;
      }
      return c[s++] = this.getRawIndex(o - 1), i._count = s, i._indices = c, i.getRawIndex = this._getRawIdx, i;
    }, r.prototype.minmaxDownSample = function(t, e) {
      for (var i = this.clone([t], !0), n = i._chunks, a = Math.floor(1 / e), o = n[t], s = this.count(), l = new (di(this._rawCount))(Math.ceil(s / a) * 2), u = 0, f = 0; f < s; f += a) {
        var h = f, v = o[this.getRawIndex(h)], c = f, p = o[this.getRawIndex(c)], d = a;
        f + a > s && (d = s - f);
        for (var g = 0; g < d; g++) {
          var y = this.getRawIndex(f + g), m = o[y];
          m < v && (v = m, h = f + g), m > p && (p = m, c = f + g);
        }
        var _ = this.getRawIndex(h), S = this.getRawIndex(c);
        h < c ? (l[u++] = _, l[u++] = S) : (l[u++] = S, l[u++] = _);
      }
      return i._count = u, i._indices = l, i._updateGetRawIdx(), i;
    }, r.prototype.downSample = function(t, e, i, n) {
      for (var a = this.clone([t], !0), o = a._chunks, s = [], l = Math.floor(1 / e), u = o[t], f = this.count(), h = a._rawExtent[t] = gi(), v = new (di(this._rawCount))(Math.ceil(f / l)), c = 0, p = 0; p < f; p += l) {
        l > f - p && (l = f - p, s.length = l);
        for (var d = 0; d < l; d++) {
          var g = this.getRawIndex(p + d);
          s[d] = u[g];
        }
        var y = i(s), m = this.getRawIndex(Math.min(p + n(s, y) || 0, f - 1));
        u[m] = y, y < h[0] && (h[0] = y), y > h[1] && (h[1] = y), v[c++] = m;
      }
      return a._count = c, a._indices = v, a._updateGetRawIdx(), a;
    }, r.prototype.each = function(t, e) {
      if (this._count)
        for (var i = t.length, n = this._chunks, a = 0, o = this.count(); a < o; a++) {
          var s = this.getRawIndex(a);
          switch (i) {
            case 0:
              e(a);
              break;
            case 1:
              e(n[t[0]][s], a);
              break;
            case 2:
              e(n[t[0]][s], n[t[1]][s], a);
              break;
            default:
              for (var l = 0, u = []; l < i; l++)
                u[l] = n[t[l]][s];
              u[l] = a, e.apply(null, u);
          }
        }
    }, r.prototype.getDataExtent = function(t) {
      var e = this._chunks[t], i = gi();
      if (!e)
        return i;
      var n = this.count(), a = !this._indices, o;
      if (a)
        return this._rawExtent[t].slice();
      if (o = this._extent[t], o)
        return o.slice();
      o = i;
      for (var s = o[0], l = o[1], u = 0; u < n; u++) {
        var f = this.getRawIndex(u), h = e[f];
        h < s && (s = h), h > l && (l = h);
      }
      return o = [s, l], this._extent[t] = o, o;
    }, r.prototype.getRawDataItem = function(t) {
      var e = this.getRawIndex(t);
      if (this._provider.persistent)
        return this._provider.getItem(e);
      for (var i = [], n = this._chunks, a = 0; a < n.length; a++)
        i.push(n[a][e]);
      return i;
    }, r.prototype.clone = function(t, e) {
      var i = new r(), n = this._chunks, a = t && Wi(t, function(s, l) {
        return s[l] = !0, s;
      }, {});
      if (a)
        for (var o = 0; o < n.length; o++)
          i._chunks[o] = a[o] ? jb(n[o]) : n[o];
      else
        i._chunks = n;
      return this._copyCommonProps(i), e || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), i;
    }, r.prototype._copyCommonProps = function(t) {
      t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = Q(this._extent), t._rawExtent = Q(this._rawExtent);
    }, r.prototype._cloneIndices = function() {
      if (this._indices) {
        var t = this._indices.constructor, e = void 0;
        if (t === Array) {
          var i = this._indices.length;
          e = new t(i);
          for (var n = 0; n < i; n++)
            e[n] = this._indices[n];
        } else
          e = new t(this._indices);
        return e;
      }
      return null;
    }, r.prototype._getRawIdxIdentity = function(t) {
      return t;
    }, r.prototype._getRawIdx = function(t) {
      return t < this._count && t >= 0 ? this._indices[t] : -1;
    }, r.prototype._updateGetRawIdx = function() {
      this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
    }, r.internalField = (function() {
      function t(e, i, n, a) {
        return hr(e[a], this._dimensions[a]);
      }
      Tl = {
        arrayRows: t,
        objectRows: function(e, i, n, a) {
          return hr(e[i], this._dimensions[a]);
        },
        keyedColumns: t,
        original: function(e, i, n, a) {
          var o = e && (e.value == null ? e : e.value);
          return hr(o instanceof Array ? o[a] : o, this._dimensions[a]);
        },
        typedArray: function(e, i, n, a) {
          return e[a];
        }
      };
    })(), r;
  })()
), tx = (
  /** @class */
  (function() {
    function r(t) {
      this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, this._dirty = !0, this._sourceHost = t;
    }
    return r.prototype.dirty = function() {
      this._setLocalSource([], []), this._storeList = [], this._dirty = !0;
    }, r.prototype._setLocalSource = function(t, e) {
      this._sourceList = t, this._upstreamSignList = e, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0);
    }, r.prototype._getVersionSign = function() {
      return this._sourceHost.uid + "_" + this._versionSignBase;
    }, r.prototype.prepareSource = function() {
      this._isDirty() && (this._createSource(), this._dirty = !1);
    }, r.prototype._createSource = function() {
      this._setLocalSource([], []);
      var t = this._sourceHost, e = this._getUpstreamSourceManagers(), i = !!e.length, n, a;
      if (Ea(t)) {
        var o = t, s = void 0, l = void 0, u = void 0;
        if (i) {
          var f = e[0];
          f.prepareSource(), u = f.getSource(), s = u.data, l = u.sourceFormat, a = [f._getVersionSign()];
        } else
          s = o.get("data", !0), l = Ut(s) ? fr : fe, a = [];
        var h = this._getSourceMetaRawOption() || {}, v = u && u.metaRawOption || {}, c = q(h.seriesLayoutBy, v.seriesLayoutBy) || null, p = q(h.sourceHeader, v.sourceHeader), d = q(h.dimensions, v.dimensions), g = c !== v.seriesLayoutBy || !!p != !!v.sourceHeader || d;
        n = g ? [Fu(s, {
          seriesLayoutBy: c,
          sourceHeader: p,
          dimensions: d
        }, l)] : [];
      } else {
        var y = t;
        if (i) {
          var m = this._applyTransform(e);
          n = m.sourceList, a = m.upstreamSignList;
        } else {
          var _ = y.get("source", !0);
          n = [Fu(_, this._getSourceMetaRawOption(), null)], a = [];
        }
      }
      this._setLocalSource(n, a);
    }, r.prototype._applyTransform = function(t) {
      var e = this._sourceHost, i = e.get("transform", !0), n = e.get("fromTransformResult", !0);
      if (n != null) {
        var a = "";
        t.length !== 1 && Sc(a);
      }
      var o, s = [], l = [];
      return M(t, function(u) {
        u.prepareSource();
        var f = u.getSource(n || 0), h = "";
        n != null && !f && Sc(h), s.push(f), l.push(u._getVersionSign());
      }), i ? o = qb(i, s, {
        datasetIndex: e.componentIndex
      }) : n != null && (o = [Eb(s[0])]), {
        sourceList: o,
        upstreamSignList: l
      };
    }, r.prototype._isDirty = function() {
      if (this._dirty)
        return !0;
      for (var t = this._getUpstreamSourceManagers(), e = 0; e < t.length; e++) {
        var i = t[e];
        if (
          // Consider the case that there is ancestor diry, call it recursively.
          // The performance is probably not an issue because usually the chain is not long.
          i._isDirty() || this._upstreamSignList[e] !== i._getVersionSign()
        )
          return !0;
      }
    }, r.prototype.getSource = function(t) {
      t = t || 0;
      var e = this._sourceList[t];
      if (!e) {
        var i = this._getUpstreamSourceManagers();
        return i[0] && i[0].getSource(t);
      }
      return e;
    }, r.prototype.getSharedDataStore = function(t) {
      var e = t.makeStoreSchema();
      return this._innerGetDataStore(e.dimensions, t.source, e.hash);
    }, r.prototype._innerGetDataStore = function(t, e, i) {
      var n = 0, a = this._storeList, o = a[n];
      o || (o = a[n] = {});
      var s = o[i];
      if (!s) {
        var l = this._getUpstreamSourceManagers()[0];
        Ea(this._sourceHost) && l ? s = l._innerGetDataStore(t, e, i) : (s = new zu(), s.initData(new gy(e, t.length), t)), o[i] = s;
      }
      return s;
    }, r.prototype._getUpstreamSourceManagers = function() {
      var t = this._sourceHost;
      if (Ea(t)) {
        var e = ly(t);
        return e ? [e.getSourceManager()] : [];
      } else
        return V(sb(t), function(i) {
          return i.getSourceManager();
        });
    }, r.prototype._getSourceMetaRawOption = function() {
      var t = this._sourceHost, e, i, n;
      if (Ea(t))
        e = t.get("seriesLayoutBy", !0), i = t.get("sourceHeader", !0), n = t.get("dimensions", !0);
      else if (!this._getUpstreamSourceManagers().length) {
        var a = t;
        e = a.get("seriesLayoutBy", !0), i = a.get("sourceHeader", !0), n = a.get("dimensions", !0);
      }
      return {
        seriesLayoutBy: e,
        sourceHeader: i,
        dimensions: n
      };
    }, r;
  })()
);
function Ea(r) {
  return r.mainType === "series";
}
function Sc(r) {
  throw new Error(r);
}
var ex = "line-height:1";
function xy(r) {
  var t = r.lineHeight;
  return t == null ? ex : "line-height:" + Ft(t + "") + "px";
}
function Ty(r, t) {
  var e = r.color || "#6e7079", i = r.fontSize || 12, n = r.fontWeight || "400", a = r.color || "#464646", o = r.fontSize || 14, s = r.fontWeight || "900";
  return t === "html" ? {
    // eslint-disable-next-line max-len
    nameStyle: "font-size:" + Ft(i + "") + "px;color:" + Ft(e) + ";font-weight:" + Ft(n + ""),
    // eslint-disable-next-line max-len
    valueStyle: "font-size:" + Ft(o + "") + "px;color:" + Ft(a) + ";font-weight:" + Ft(s + "")
  } : {
    nameStyle: {
      fontSize: i,
      fill: e,
      fontWeight: n
    },
    valueStyle: {
      fontSize: o,
      fill: a,
      fontWeight: s
    }
  };
}
var rx = [0, 10, 20, 30], ix = ["", `
`, `

`, `


`];
function jr(r, t) {
  return t.type = r, t;
}
function Vu(r) {
  return r.type === "section";
}
function Cy(r) {
  return Vu(r) ? nx : ax;
}
function My(r) {
  if (Vu(r)) {
    var t = 0, e = r.blocks.length, i = e > 1 || e > 0 && !r.noHeader;
    return M(r.blocks, function(n) {
      var a = My(n);
      a >= t && (t = a + +(i && // 0 always can not be readable gap level.
      (!a || Vu(n) && !n.noHeader)));
    }), t;
  }
  return 0;
}
function nx(r, t, e, i) {
  var n = t.noHeader, a = ox(My(t)), o = [], s = t.blocks || [];
  We(!s || N(s)), s = s || [];
  var l = r.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if ($r(u, l)) {
      var f = new Hb(u[l], null);
      s.sort(function(d, g) {
        return f.evaluate(d.sortParam, g.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  M(s, function(d, g) {
    var y = t.valueFormatter, m = Cy(d)(
      // Inherit valueFormatter
      y ? O(O({}, r), {
        valueFormatter: y
      }) : r,
      d,
      g > 0 ? a.html : 0,
      i
    );
    m != null && o.push(m);
  });
  var h = r.renderMode === "richText" ? o.join(a.richText) : Hu(i, o.join(""), n ? e : a.html);
  if (n)
    return h;
  var v = Nu(t.header, "ordinal", r.useUTC), c = Ty(i, r.renderMode).nameStyle, p = xy(i);
  return r.renderMode === "richText" ? Dy(r, v, c) + a.richText + h : Hu(i, '<div style="' + c + ";" + p + ';">' + Ft(v) + "</div>" + h, e);
}
function ax(r, t, e, i) {
  var n = r.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, l = t.name, u = r.useUTC, f = t.valueFormatter || r.valueFormatter || function(S) {
    return S = N(S) ? S : [S], V(S, function(b, w) {
      return Nu(b, N(c) ? c[w] : c, u);
    });
  };
  if (!(a && o)) {
    var h = s ? "" : r.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", n), v = a ? "" : Nu(l, "ordinal", u), c = t.valueType, p = o ? [] : f(t.value, t.dataIndex), d = !s || !a, g = !s && a, y = Ty(i, n), m = y.nameStyle, _ = y.valueStyle;
    return n === "richText" ? (s ? "" : h) + (a ? "" : Dy(r, v, m)) + (o ? "" : ux(r, p, d, g, _)) : Hu(i, (s ? "" : h) + (a ? "" : sx(v, !s, m)) + (o ? "" : lx(p, d, g, _)), e);
  }
}
function wc(r, t, e, i, n, a) {
  if (r) {
    var o = Cy(r), s = {
      useUTC: n,
      renderMode: e,
      orderMode: i,
      markupStyleCreator: t,
      valueFormatter: r.valueFormatter
    };
    return o(s, r, 0, a);
  }
}
function ox(r) {
  return {
    html: rx[r],
    richText: ix[r]
  };
}
function Hu(r, t, e) {
  var i = '<div style="clear:both"></div>', n = "margin: " + e + "px 0 0", a = xy(r);
  return '<div style="' + n + ";" + a + ';">' + t + i + "</div>";
}
function sx(r, t, e) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + e + ";" + i + '">' + Ft(r) + "</span>";
}
function lx(r, t, e, i) {
  var n = e ? "10px" : "20px", a = t ? "float:right;margin-left:" + n : "";
  return r = N(r) ? r : [r], '<span style="' + a + ";" + i + '">' + V(r, function(o) {
    return Ft(o);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function Dy(r, t, e) {
  return r.markupStyleCreator.wrapRichTextStyle(t, e);
}
function ux(r, t, e, i, n) {
  var a = [n], o = i ? 10 : 20;
  return e && a.push({
    padding: [0, 0, 0, o],
    align: "right"
  }), r.markupStyleCreator.wrapRichTextStyle(N(t) ? t.join("  ") : t, a);
}
function fx(r, t) {
  var e = r.getData().getItemVisual(t, "style"), i = e[r.visualDrawType];
  return Jr(i);
}
function Ay(r, t) {
  var e = r.get("padding");
  return e ?? (t === "richText" ? [8, 10] : 10);
}
var Cl = (
  /** @class */
  (function() {
    function r() {
      this.richTextStyles = {}, this._nextStyleNameId = ig();
    }
    return r.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }, r.prototype.makeTooltipMarker = function(t, e, i) {
      var n = i === "richText" ? this._generateStyleName() : null, a = jw({
        color: e,
        type: t,
        renderMode: i,
        markerId: n
      });
      return z(a) ? a : (this.richTextStyles[n] = a.style, a.content);
    }, r.prototype.wrapRichTextStyle = function(t, e) {
      var i = {};
      N(e) ? M(e, function(a) {
        return O(i, a);
      }) : O(i, e);
      var n = this._generateStyleName();
      return this.richTextStyles[n] = i, "{" + n + "|" + t + "}";
    }, r;
  })()
);
function hx(r) {
  var t = r.series, e = r.dataIndex, i = r.multipleSeries, n = t.getData(), a = n.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(e), l = N(s), u = fx(t, e), f, h, v, c;
  if (o > 1 || l && !o) {
    var p = vx(s, t, e, a, u);
    f = p.inlineValues, h = p.inlineValueTypes, v = p.blocks, c = p.inlineValues[0];
  } else if (o) {
    var d = n.getDimensionInfo(a[0]);
    c = f = Hi(n, e, a[0]), h = d.type;
  } else
    c = f = l ? s[0] : s;
  var g = Lf(t), y = g && t.name || "", m = n.getName(e), _ = i ? y : m;
  return jr("section", {
    header: y,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: i || !g,
    sortParam: c,
    blocks: [jr("nameValue", {
      markerType: "item",
      markerColor: u,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: _,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !Ae(_),
      value: f,
      valueType: h,
      dataIndex: e
    })].concat(v || [])
  });
}
function vx(r, t, e, i, n) {
  var a = t.getData(), o = Wi(r, function(h, v, c) {
    var p = a.getDimensionInfo(c);
    return h = h || p && p.tooltip !== !1 && p.displayName != null;
  }, !1), s = [], l = [], u = [];
  i.length ? M(i, function(h) {
    f(Hi(a, e, h), h);
  }) : M(r, f);
  function f(h, v) {
    var c = a.getDimensionInfo(v);
    !c || c.otherDims.tooltip === !1 || (o ? u.push(jr("nameValue", {
      markerType: "subItem",
      markerColor: n,
      name: c.displayName,
      value: h,
      valueType: c.type
    })) : (s.push(h), l.push(c.type)));
  }
  return {
    inlineValues: s,
    inlineValueTypes: l,
    blocks: u
  };
}
var Qe = pt();
function ka(r, t) {
  return r.getName(t) || r.getId(t);
}
var cx = "__universalTransitionEnabled", ye = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e._selectedDataIndicesMap = {}, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = Nn({
        count: dx,
        reset: gx
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(e, n);
      var a = Qe(this).sourceManager = new tx(this);
      a.prepareSource();
      var o = this.getInitialData(e, n);
      xc(o, this), this.dataTask.context.data = o, Qe(this).dataBeforeProcessed = o, bc(this), this._initSelectedMapFromData(o);
    }, t.prototype.mergeDefaultAndTheme = function(e, i) {
      var n = Qn(this), a = n ? fa(e) : {}, o = this.subType;
      ot.hasClass(o) && (o += "Series"), J(e, i.getTheme().get(this.subType)), J(e, this.getDefaultOption()), Mu(e, "label", ["show"]), this.fillDataTextStyle(e.data), n && Vi(e, a, n);
    }, t.prototype.mergeOption = function(e, i) {
      e = J(this.option, e, !0), this.fillDataTextStyle(e.data);
      var n = Qn(this);
      n && Vi(this.option, e, n);
      var a = Qe(this).sourceManager;
      a.dirty(), a.prepareSource();
      var o = this.getInitialData(e, i);
      xc(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, Qe(this).dataBeforeProcessed = o, bc(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function(e) {
      if (e && !Ut(e))
        for (var i = ["show"], n = 0; n < e.length; n++)
          e[n] && e[n].label && Mu(e[n], "label", i);
    }, t.prototype.getInitialData = function(e, i) {
    }, t.prototype.appendData = function(e) {
      var i = this.getRawData();
      i.appendData(e.data);
    }, t.prototype.getData = function(e) {
      var i = Gu(this);
      if (i) {
        var n = i.context.data;
        return e == null || !n.getLinkedData ? n : n.getLinkedData(e);
      } else
        return Qe(this).data;
    }, t.prototype.getAllData = function() {
      var e = this.getData();
      return e && e.getLinkedDataAll ? e.getLinkedDataAll() : [{
        data: e
      }];
    }, t.prototype.setData = function(e) {
      var i = Gu(this);
      if (i) {
        var n = i.context;
        n.outputData = e, i !== this.dataTask && (n.data = e);
      }
      Qe(this).data = e;
    }, t.prototype.getEncode = function() {
      var e = this.get("encode", !0);
      if (e)
        return Y(e);
    }, t.prototype.getSourceManager = function() {
      return Qe(this).sourceManager;
    }, t.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function() {
      return Qe(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function() {
      var e = this.get("colorBy");
      return e || "series";
    }, t.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    }, t.prototype.getBaseAxis = function() {
      var e = this.coordinateSystem;
      return e && e.getBaseAxis && e.getBaseAxis();
    }, t.prototype.formatTooltip = function(e, i, n) {
      return hx({
        series: this,
        dataIndex: e,
        multipleSeries: i
      });
    }, t.prototype.isAnimationEnabled = function() {
      var e = this.ecModel;
      if (U.node && !(e && e.ssr))
        return !1;
      var i = this.getShallow("animation");
      return i && this.getData().count() > this.getShallow("animationThreshold") && (i = !1), !!i;
    }, t.prototype.restoreData = function() {
      this.dataTask.dirty();
    }, t.prototype.getColorFromPalette = function(e, i, n) {
      var a = this.ecModel, o = $f.prototype.getColorFromPalette.call(this, e, i, n);
      return o || (o = a.getColorFromPalette(e, i, n)), o;
    }, t.prototype.coordDimToDataDim = function(e) {
      return this.getRawData().mapDimensionsAll(e);
    }, t.prototype.getProgressive = function() {
      return this.get("progressive");
    }, t.prototype.getProgressiveThreshold = function() {
      return this.get("progressiveThreshold");
    }, t.prototype.select = function(e, i) {
      this._innerSelect(this.getData(i), e);
    }, t.prototype.unselect = function(e, i) {
      var n = this.option.selectedMap;
      if (n) {
        var a = this.option.selectedMode, o = this.getData(i);
        if (a === "series" || n === "all") {
          this.option.selectedMap = {}, this._selectedDataIndicesMap = {};
          return;
        }
        for (var s = 0; s < e.length; s++) {
          var l = e[s], u = ka(o, l);
          n[u] = !1, this._selectedDataIndicesMap[u] = -1;
        }
      }
    }, t.prototype.toggleSelect = function(e, i) {
      for (var n = [], a = 0; a < e.length; a++)
        n[0] = e[a], this.isSelected(e[a], i) ? this.unselect(n, i) : this.select(n, i);
    }, t.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all")
        return [].slice.call(this.getData().getIndices());
      for (var e = this._selectedDataIndicesMap, i = ct(e), n = [], a = 0; a < i.length; a++) {
        var o = e[i[a]];
        o >= 0 && n.push(o);
      }
      return n;
    }, t.prototype.isSelected = function(e, i) {
      var n = this.option.selectedMap;
      if (!n)
        return !1;
      var a = this.getData(i);
      return (n === "all" || n[ka(a, e)]) && !a.getItemModel(e).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function() {
      if (this[cx])
        return !0;
      var e = this.option.universalTransition;
      return e ? e === !0 ? !0 : e && e.enabled : !1;
    }, t.prototype._innerSelect = function(e, i) {
      var n, a, o = this.option, s = o.selectedMode, l = i.length;
      if (!(!s || !l)) {
        if (s === "series")
          o.selectedMap = "all";
        else if (s === "multiple") {
          G(o.selectedMap) || (o.selectedMap = {});
          for (var u = o.selectedMap, f = 0; f < l; f++) {
            var h = i[f], v = ka(e, h);
            u[v] = !0, this._selectedDataIndicesMap[v] = e.getRawIndex(h);
          }
        } else if (s === "single" || s === !0) {
          var c = i[l - 1], v = ka(e, c);
          o.selectedMap = (n = {}, n[v] = !0, n), this._selectedDataIndicesMap = (a = {}, a[v] = e.getRawIndex(c), a);
        }
      }
    }, t.prototype._initSelectedMapFromData = function(e) {
      if (!this.option.selectedMap) {
        var i = [];
        e.hasItemOption && e.each(function(n) {
          var a = e.getRawDataItem(n);
          a && a.selected && i.push(n);
        }), i.length > 0 && this._innerSelect(e, i);
      }
    }, t.registerClass = function(e) {
      return ot.registerClass(e);
    }, t.protoInitialize = (function() {
      var e = t.prototype;
      e.type = "series.__base__", e.seriesIndex = 0, e.ignoreStyleOnData = !1, e.hasSymbolVisual = !1, e.defaultSymbol = "circle", e.visualStyleAccessPath = "itemStyle", e.visualDrawType = "fill";
    })(), t;
  })(ot)
);
_e(ye, jf);
_e(ye, $f);
ug(ye, ot);
function bc(r) {
  var t = r.name;
  Lf(r) || (r.name = px(r) || t);
}
function px(r) {
  var t = r.getRawData(), e = t.mapDimensionsAll("seriesName"), i = [];
  return M(e, function(n) {
    var a = t.getDimensionInfo(n);
    a.displayName && i.push(a.displayName);
  }), i.join(" ");
}
function dx(r) {
  return r.model.getRawData().count();
}
function gx(r) {
  var t = r.model;
  return t.setData(t.getRawData().cloneShallow()), yx;
}
function yx(r, t) {
  t.outputData && r.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function xc(r, t) {
  M(H0(r.CHANGABLE_METHODS, r.DOWNSAMPLE_METHODS), function(e) {
    r.wrapMethod(e, lt(mx, t));
  });
}
function mx(r, t) {
  var e = Gu(r);
  return e && e.setOutputEnd((t || this).count()), t;
}
function Gu(r) {
  var t = (r.ecModel || {}).scheduler, e = t && t.getPipeline(r.uid);
  if (e) {
    var i = e.currentTask;
    if (i) {
      var n = i.agentStubMap;
      n && (i = n.get(r.uid));
    }
    return i;
  }
}
var ue = (
  /** @class */
  (function() {
    function r() {
      this.group = new gt(), this.uid = ps("viewComponent");
    }
    return r.prototype.init = function(t, e) {
    }, r.prototype.render = function(t, e, i, n) {
    }, r.prototype.dispose = function(t, e) {
    }, r.prototype.updateView = function(t, e, i, n) {
    }, r.prototype.updateLayout = function(t, e, i, n) {
    }, r.prototype.updateVisual = function(t, e, i, n) {
    }, r.prototype.toggleBlurSeries = function(t, e, i) {
    }, r.prototype.eachRendered = function(t) {
      var e = this.group;
      e && e.traverse(t);
    }, r;
  })()
);
Pf(ue);
es(ue);
function eh() {
  var r = pt();
  return function(t) {
    var e = r(t), i = t.pipelineContext, n = !!e.large, a = !!e.progressiveRender, o = e.large = !!(i && i.large), s = e.progressiveRender = !!(i && i.progressiveRender);
    return (n !== o || a !== s) && "reset";
  };
}
var Ly = pt(), _x = eh(), se = (
  /** @class */
  (function() {
    function r() {
      this.group = new gt(), this.uid = ps("viewChart"), this.renderTask = Nn({
        plan: Sx,
        reset: bx
      }), this.renderTask.context = {
        view: this
      };
    }
    return r.prototype.init = function(t, e) {
    }, r.prototype.render = function(t, e, i, n) {
    }, r.prototype.highlight = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      a && Cc(a, n, "emphasis");
    }, r.prototype.downplay = function(t, e, i, n) {
      var a = t.getData(n && n.dataType);
      a && Cc(a, n, "normal");
    }, r.prototype.remove = function(t, e) {
      this.group.removeAll();
    }, r.prototype.dispose = function(t, e) {
    }, r.prototype.updateView = function(t, e, i, n) {
      this.render(t, e, i, n);
    }, r.prototype.updateLayout = function(t, e, i, n) {
      this.render(t, e, i, n);
    }, r.prototype.updateVisual = function(t, e, i, n) {
      this.render(t, e, i, n);
    }, r.prototype.eachRendered = function(t) {
      ua(this.group, t);
    }, r.markUpdateMethod = function(t, e) {
      Ly(t).updateMethod = e;
    }, r.protoInitialize = (function() {
      var t = r.prototype;
      t.type = "chart";
    })(), r;
  })()
);
function Tc(r, t, e) {
  r && Ru(r) && (t === "emphasis" ? Yn : Zn)(r, e);
}
function Cc(r, t, e) {
  var i = qr(r, t), n = t && t.highlightKey != null ? zS(t.highlightKey) : null;
  i != null ? M(Et(i), function(a) {
    Tc(r.getItemGraphicEl(a), e, n);
  }) : r.eachItemGraphicEl(function(a) {
    Tc(a, e, n);
  });
}
Pf(se);
es(se);
function Sx(r) {
  return _x(r.model);
}
function bx(r) {
  var t = r.model, e = r.ecModel, i = r.api, n = r.payload, a = t.pipelineContext.progressiveRender, o = r.view, s = n && Ly(n).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return l !== "render" && o[l](t, e, i, n), xx[l];
}
var xx = {
  incrementalPrepareRender: {
    progress: function(r, t) {
      t.view.incrementalRender(r, t.model, t.ecModel, t.api, t.payload);
    }
  },
  render: {
    // Put view.render in `progress` to support appendData. But in this case
    // view.render should not be called in reset, otherwise it will be called
    // twise. Use `forceFirstProgress` to make sure that view.render is called
    // in any cases.
    forceFirstProgress: !0,
    progress: function(r, t) {
      t.view.render(t.model, t.ecModel, t.api, t.payload);
    }
  }
}, No = "\0__throttleOriginMethod", Mc = "\0__throttleRate", Dc = "\0__throttleType";
function rh(r, t, e) {
  var i, n = 0, a = 0, o = null, s, l, u, f;
  t = t || 0;
  function h() {
    a = (/* @__PURE__ */ new Date()).getTime(), o = null, r.apply(l, u || []);
  }
  var v = function() {
    for (var c = [], p = 0; p < arguments.length; p++)
      c[p] = arguments[p];
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, u = c;
    var d = f || t, g = f || e;
    f = null, s = i - (g ? n : a) - d, clearTimeout(o), g ? o = setTimeout(h, d) : s >= 0 ? h() : o = setTimeout(h, -s), n = i;
  };
  return v.clear = function() {
    o && (clearTimeout(o), o = null);
  }, v.debounceNextCall = function(c) {
    f = c;
  }, v;
}
function Ts(r, t, e, i) {
  var n = r[t];
  if (n) {
    var a = n[No] || n, o = n[Dc], s = n[Mc];
    if (s !== e || o !== i) {
      if (e == null || !i)
        return r[t] = a;
      n = r[t] = rh(a, e, i === "debounce"), n[No] = a, n[Dc] = i, n[Mc] = e;
    }
    return n;
  }
}
function Fo(r, t) {
  var e = r[t];
  e && e[No] && (e.clear && e.clear(), r[t] = e[No]);
}
var Ac = pt(), Lc = {
  itemStyle: Un(Ug, !0),
  lineStyle: Un(Wg, !0)
}, Tx = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function Iy(r, t) {
  var e = r.visualStyleMapper || Lc[t];
  return e || (console.warn("Unknown style type '" + t + "'."), Lc.itemStyle);
}
function Py(r, t) {
  var e = r.visualDrawType || Tx[t];
  return e || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var Cx = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = r.getModel(i), a = Iy(r, i), o = a(n), s = n.getShallow("decal");
    s && (e.setVisual("decal", s), s.dirty = !0);
    var l = Py(r, i), u = o[l], f = X(u) ? u : null, h = o.fill === "auto" || o.stroke === "auto";
    if (!o[l] || f || h) {
      var v = r.getColorFromPalette(
        // TODO series count changed.
        r.name,
        null,
        t.getSeriesCount()
      );
      o[l] || (o[l] = v, e.setVisual("colorFromPalette", !0)), o.fill = o.fill === "auto" || X(o.fill) ? v : o.fill, o.stroke = o.stroke === "auto" || X(o.stroke) ? v : o.stroke;
    }
    if (e.setVisual("style", o), e.setVisual("drawType", l), !t.isSeriesFiltered(r) && f)
      return e.setVisual("colorFromPalette", !1), {
        dataEach: function(c, p) {
          var d = r.getDataParams(p), g = O({}, o);
          g[l] = f(d), c.setItemVisual(p, "style", g);
        }
      };
  }
}, ln = new mt(), Mx = {
  createOnAllSeries: !0,
  performRawSeries: !0,
  reset: function(r, t) {
    if (!(r.ignoreStyleOnData || t.isSeriesFiltered(r))) {
      var e = r.getData(), i = r.visualStyleAccessPath || "itemStyle", n = Iy(r, i), a = e.getVisual("drawType");
      return {
        dataEach: e.hasItemOption ? function(o, s) {
          var l = o.getRawDataItem(s);
          if (l && l[i]) {
            ln.option = l[i];
            var u = n(ln), f = o.ensureUniqueItemVisual(s, "style");
            O(f, u), ln.option.decal && (o.setItemVisual(s, "decal", ln.option.decal), ln.option.decal.dirty = !0), a in u && o.setItemVisual(s, "colorFromPalette", !1);
          }
        } : null
      };
    }
  }
}, Dx = {
  performRawSeries: !0,
  overallReset: function(r) {
    var t = Y();
    r.eachSeries(function(e) {
      var i = e.getColorBy();
      if (!e.isColorBySeries()) {
        var n = e.type + "-" + i, a = t.get(n);
        a || (a = {}, t.set(n, a)), Ac(e).scope = a;
      }
    }), r.eachSeries(function(e) {
      if (!(e.isColorBySeries() || r.isSeriesFiltered(e))) {
        var i = e.getRawData(), n = {}, a = e.getData(), o = Ac(e).scope, s = e.visualStyleAccessPath || "itemStyle", l = Py(e, s);
        a.each(function(u) {
          var f = a.getRawIndex(u);
          n[f] = u;
        }), i.each(function(u) {
          var f = n[u], h = a.getItemVisual(f, "colorFromPalette");
          if (h) {
            var v = a.ensureUniqueItemVisual(f, "style"), c = i.getName(u) || u + "", p = i.count();
            v[l] = e.getColorFromPalette(c, o, p);
          }
        });
      }
    });
  }
}, Oa = Math.PI;
function Ax(r, t) {
  t = t || {}, st(t, {
    text: "loading",
    textColor: "#000",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "sans-serif",
    maskColor: "rgba(255, 255, 255, 0.8)",
    showSpinner: !0,
    color: "#5470c6",
    spinnerRadius: 10,
    lineWidth: 5,
    zlevel: 0
  });
  var e = new gt(), i = new dt({
    style: {
      fill: t.maskColor
    },
    zlevel: t.zlevel,
    z: 1e4
  });
  e.add(i);
  var n = new kt({
    style: {
      text: t.text,
      fill: t.textColor,
      fontSize: t.fontSize,
      fontWeight: t.fontWeight,
      fontStyle: t.fontStyle,
      fontFamily: t.fontFamily
    },
    zlevel: t.zlevel,
    z: 10001
  }), a = new dt({
    style: {
      fill: "none"
    },
    textContent: n,
    textConfig: {
      position: "right",
      distance: 10
    },
    zlevel: t.zlevel,
    z: 10001
  });
  e.add(a);
  var o;
  return t.showSpinner && (o = new fs({
    shape: {
      startAngle: -Oa / 2,
      endAngle: -Oa / 2 + 0.1,
      r: t.spinnerRadius
    },
    style: {
      stroke: t.color,
      lineCap: "round",
      lineWidth: t.lineWidth
    },
    zlevel: t.zlevel,
    z: 10001
  }), o.animateShape(!0).when(1e3, {
    endAngle: Oa * 3 / 2
  }).start("circularInOut"), o.animateShape(!0).when(1e3, {
    startAngle: Oa * 3 / 2
  }).delay(300).start("circularInOut"), e.add(o)), e.resize = function() {
    var s = n.getBoundingRect().width, l = t.showSpinner ? t.spinnerRadius : 0, u = (r.getWidth() - l * 2 - (t.showSpinner && s ? 10 : 0) - s) / 2 - (t.showSpinner && s ? 0 : 5 + s / 2) + (t.showSpinner ? 0 : s / 2) + (s ? 0 : l), f = r.getHeight() / 2;
    t.showSpinner && o.setShape({
      cx: u,
      cy: f
    }), a.setShape({
      x: u - l,
      y: f - l,
      width: l * 2,
      height: l * 2
    }), i.setShape({
      x: 0,
      y: 0,
      width: r.getWidth(),
      height: r.getHeight()
    });
  }, e.resize(), e;
}
var Ry = (
  /** @class */
  (function() {
    function r(t, e, i, n) {
      this._stageTaskMap = Y(), this.ecInstance = t, this.api = e, i = this._dataProcessorHandlers = i.slice(), n = this._visualHandlers = n.slice(), this._allHandlers = i.concat(n);
    }
    return r.prototype.restoreData = function(t, e) {
      t.restoreData(e), this._stageTaskMap.each(function(i) {
        var n = i.overallTask;
        n && n.dirty();
      });
    }, r.prototype.getPerformArgs = function(t, e) {
      if (t.__pipeline) {
        var i = this._pipelineMap.get(t.__pipeline.id), n = i.context, a = !e && i.progressiveEnabled && (!n || n.progressiveRender) && t.__idxInPipeline > i.blockIndex, o = a ? i.step : null, s = n && n.modDataCount, l = s != null ? Math.ceil(s / o) : null;
        return {
          step: o,
          modBy: l,
          modDataCount: s
        };
      }
    }, r.prototype.getPipeline = function(t) {
      return this._pipelineMap.get(t);
    }, r.prototype.updateStreamModes = function(t, e) {
      var i = this._pipelineMap.get(t.uid), n = t.getData(), a = n.count(), o = i.progressiveEnabled && e.incrementalPrepareRender && a >= i.threshold, s = t.get("large") && a >= t.get("largeThreshold"), l = t.get("progressiveChunkMode") === "mod" ? a : null;
      t.pipelineContext = i.context = {
        progressiveRender: o,
        modDataCount: l,
        large: s
      };
    }, r.prototype.restorePipelines = function(t) {
      var e = this, i = e._pipelineMap = Y();
      t.eachSeries(function(n) {
        var a = n.getProgressive(), o = n.uid;
        i.set(o, {
          id: o,
          head: null,
          tail: null,
          threshold: n.getProgressiveThreshold(),
          progressiveEnabled: a && !(n.preventIncremental && n.preventIncremental()),
          blockIndex: -1,
          step: Math.round(a || 700),
          count: 0
        }), e._pipe(n, n.dataTask);
      });
    }, r.prototype.prepareStageTasks = function() {
      var t = this._stageTaskMap, e = this.api.getModel(), i = this.api;
      M(this._allHandlers, function(n) {
        var a = t.get(n.uid) || t.set(n.uid, {}), o = "";
        We(!(n.reset && n.overallReset), o), n.reset && this._createSeriesStageTask(n, a, e, i), n.overallReset && this._createOverallStageTask(n, a, e, i);
      }, this);
    }, r.prototype.prepareView = function(t, e, i, n) {
      var a = t.renderTask, o = a.context;
      o.model = e, o.ecModel = i, o.api = n, a.__block = !t.incrementalPrepareRender, this._pipe(e, a);
    }, r.prototype.performDataProcessorTasks = function(t, e) {
      this._performStageTasks(this._dataProcessorHandlers, t, e, {
        block: !0
      });
    }, r.prototype.performVisualTasks = function(t, e, i) {
      this._performStageTasks(this._visualHandlers, t, e, i);
    }, r.prototype._performStageTasks = function(t, e, i, n) {
      n = n || {};
      var a = !1, o = this;
      M(t, function(l, u) {
        if (!(n.visualType && n.visualType !== l.visualType)) {
          var f = o._stageTaskMap.get(l.uid), h = f.seriesTaskMap, v = f.overallTask;
          if (v) {
            var c, p = v.agentStubMap;
            p.each(function(g) {
              s(n, g) && (g.dirty(), c = !0);
            }), c && v.dirty(), o.updatePayload(v, i);
            var d = o.getPerformArgs(v, n.block);
            p.each(function(g) {
              g.perform(d);
            }), v.perform(d) && (a = !0);
          } else h && h.each(function(g, y) {
            s(n, g) && g.dirty();
            var m = o.getPerformArgs(g, n.block);
            m.skip = !l.performRawSeries && e.isSeriesFiltered(g.context.model), o.updatePayload(g, i), g.perform(m) && (a = !0);
          });
        }
      });
      function s(l, u) {
        return l.setDirty && (!l.dirtyMap || l.dirtyMap.get(u.__pipeline.id));
      }
      this.unfinished = a || this.unfinished;
    }, r.prototype.performSeriesTasks = function(t) {
      var e;
      t.eachSeries(function(i) {
        e = i.dataTask.perform() || e;
      }), this.unfinished = e || this.unfinished;
    }, r.prototype.plan = function() {
      this._pipelineMap.each(function(t) {
        var e = t.tail;
        do {
          if (e.__block) {
            t.blockIndex = e.__idxInPipeline;
            break;
          }
          e = e.getUpstream();
        } while (e);
      });
    }, r.prototype.updatePayload = function(t, e) {
      e !== "remain" && (t.context.payload = e);
    }, r.prototype._createSeriesStageTask = function(t, e, i, n) {
      var a = this, o = e.seriesTaskMap, s = e.seriesTaskMap = Y(), l = t.seriesType, u = t.getTargetSeries;
      t.createOnAllSeries ? i.eachRawSeries(f) : l ? i.eachRawSeriesByType(l, f) : u && u(i, n).each(f);
      function f(h) {
        var v = h.uid, c = s.set(v, o && o.get(v) || Nn({
          plan: Ex,
          reset: kx,
          count: Bx
        }));
        c.context = {
          model: h,
          ecModel: i,
          api: n,
          // PENDING: `useClearVisual` not used?
          useClearVisual: t.isVisual && !t.isLayout,
          plan: t.plan,
          reset: t.reset,
          scheduler: a
        }, a._pipe(h, c);
      }
    }, r.prototype._createOverallStageTask = function(t, e, i, n) {
      var a = this, o = e.overallTask = e.overallTask || Nn({
        reset: Lx
      });
      o.context = {
        ecModel: i,
        api: n,
        overallReset: t.overallReset,
        scheduler: a
      };
      var s = o.agentStubMap, l = o.agentStubMap = Y(), u = t.seriesType, f = t.getTargetSeries, h = !0, v = !1, c = "";
      We(!t.createOnAllSeries, c), u ? i.eachRawSeriesByType(u, p) : f ? f(i, n).each(p) : (h = !1, M(i.getSeries(), p));
      function p(d) {
        var g = d.uid, y = l.set(g, s && s.get(g) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (v = !0, Nn({
          reset: Ix,
          onDirty: Rx
        })));
        y.context = {
          model: d,
          overallProgress: h
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        }, y.agent = o, y.__block = h, a._pipe(d, y);
      }
      v && o.dirty();
    }, r.prototype._pipe = function(t, e) {
      var i = t.uid, n = this._pipelineMap.get(i);
      !n.head && (n.head = e), n.tail && n.tail.pipe(e), n.tail = e, e.__idxInPipeline = n.count++, e.__pipeline = n;
    }, r.wrapStageHandler = function(t, e) {
      return X(t) && (t = {
        overallReset: t,
        seriesType: Nx(t)
      }), t.uid = ps("stageHandler"), e && (t.visualType = e), t;
    }, r;
  })()
);
function Lx(r) {
  r.overallReset(r.ecModel, r.api, r.payload);
}
function Ix(r) {
  return r.overallProgress && Px;
}
function Px() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function Rx() {
  this.agent && this.agent.dirty();
}
function Ex(r) {
  return r.plan ? r.plan(r.model, r.ecModel, r.api, r.payload) : null;
}
function kx(r) {
  r.useClearVisual && r.data.clearAllVisual();
  var t = r.resetDefines = Et(r.reset(r.model, r.ecModel, r.api, r.payload));
  return t.length > 1 ? V(t, function(e, i) {
    return Ey(i);
  }) : Ox;
}
var Ox = Ey(0);
function Ey(r) {
  return function(t, e) {
    var i = e.data, n = e.resetDefines[r];
    if (n && n.dataEach)
      for (var a = t.start; a < t.end; a++)
        n.dataEach(i, a);
    else n && n.progress && n.progress(t, i);
  };
}
function Bx(r) {
  return r.data.count();
}
function Nx(r) {
  zo = null;
  try {
    r(jn, ky);
  } catch {
  }
  return zo;
}
var jn = {}, ky = {}, zo;
Oy(jn, qf);
Oy(ky, fy);
jn.eachSeriesByType = jn.eachRawSeriesByType = function(r) {
  zo = r;
};
jn.eachComponent = function(r) {
  r.mainType === "series" && r.subType && (zo = r.subType);
};
function Oy(r, t) {
  for (var e in t.prototype)
    r[e] = Rt;
}
var Ic = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
const Fx = {
  color: Ic,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Ic]
};
var Dt = "#B9B8CE", Pc = "#100C2A", Ba = function() {
  return {
    axisLine: {
      lineStyle: {
        color: Dt
      }
    },
    splitLine: {
      lineStyle: {
        color: "#484753"
      }
    },
    splitArea: {
      areaStyle: {
        color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"]
      }
    },
    minorSplitLine: {
      lineStyle: {
        color: "#20203B"
      }
    }
  };
}, Rc = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"], By = {
  darkMode: !0,
  color: Rc,
  backgroundColor: Pc,
  axisPointer: {
    lineStyle: {
      color: "#817f91"
    },
    crossStyle: {
      color: "#817f91"
    },
    label: {
      // TODO Contrast of label backgorundColor
      color: "#fff"
    }
  },
  legend: {
    textStyle: {
      color: Dt
    },
    pageTextStyle: {
      color: Dt
    }
  },
  textStyle: {
    color: Dt
  },
  title: {
    textStyle: {
      color: "#EEF1FA"
    },
    subtextStyle: {
      color: "#B9B8CE"
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: Dt
    }
  },
  dataZoom: {
    borderColor: "#71708A",
    textStyle: {
      color: Dt
    },
    brushStyle: {
      color: "rgba(135,163,206,0.3)"
    },
    handleStyle: {
      color: "#353450",
      borderColor: "#C5CBE3"
    },
    moveHandleStyle: {
      color: "#B0B6C3",
      opacity: 0.3
    },
    fillerColor: "rgba(135,163,206,0.2)",
    emphasis: {
      handleStyle: {
        borderColor: "#91B7F2",
        color: "#4D587D"
      },
      moveHandleStyle: {
        color: "#636D9A",
        opacity: 0.7
      }
    },
    dataBackground: {
      lineStyle: {
        color: "#71708A",
        width: 1
      },
      areaStyle: {
        color: "#71708A"
      }
    },
    selectedDataBackground: {
      lineStyle: {
        color: "#87A3CE"
      },
      areaStyle: {
        color: "#87A3CE"
      }
    }
  },
  visualMap: {
    textStyle: {
      color: Dt
    }
  },
  timeline: {
    lineStyle: {
      color: Dt
    },
    label: {
      color: Dt
    },
    controlStyle: {
      color: Dt,
      borderColor: Dt
    }
  },
  calendar: {
    itemStyle: {
      color: Pc
    },
    dayLabel: {
      color: Dt
    },
    monthLabel: {
      color: Dt
    },
    yearLabel: {
      color: Dt
    }
  },
  timeAxis: Ba(),
  logAxis: Ba(),
  valueAxis: Ba(),
  categoryAxis: Ba(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: Rc
  },
  gauge: {
    title: {
      color: Dt
    },
    axisLine: {
      lineStyle: {
        color: [[1, "rgba(207,212,219,0.2)"]]
      }
    },
    axisLabel: {
      color: Dt
    },
    detail: {
      color: "#EEF1FA"
    }
  },
  candlestick: {
    itemStyle: {
      color: "#f64e56",
      color0: "#54ea92",
      borderColor: "#f64e56",
      borderColor0: "#54ea92"
      // borderColor: '#ca2824',
      // borderColor0: '#09a443'
    }
  }
};
By.categoryAxis.splitLine.show = !1;
var zx = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.normalizeQuery = function(t) {
      var e = {}, i = {}, n = {};
      if (z(t)) {
        var a = Ie(t);
        e.mainType = a.main || null, e.subType = a.sub || null;
      } else {
        var o = ["Index", "Name", "Id"], s = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        M(t, function(l, u) {
          for (var f = !1, h = 0; h < o.length; h++) {
            var v = o[h], c = u.lastIndexOf(v);
            if (c > 0 && c === u.length - v.length) {
              var p = u.slice(0, c);
              p !== "data" && (e.mainType = p, e[v.toLowerCase()] = l, f = !0);
            }
          }
          s.hasOwnProperty(u) && (i[u] = l, f = !0), f || (n[u] = l);
        });
      }
      return {
        cptQuery: e,
        dataQuery: i,
        otherQuery: n
      };
    }, r.prototype.filter = function(t, e) {
      var i = this.eventInfo;
      if (!i)
        return !0;
      var n = i.targetEl, a = i.packedEvent, o = i.model, s = i.view;
      if (!o || !s)
        return !0;
      var l = e.cptQuery, u = e.dataQuery;
      return f(l, o, "mainType") && f(l, o, "subType") && f(l, o, "index", "componentIndex") && f(l, o, "name") && f(l, o, "id") && f(u, a, "name") && f(u, a, "dataIndex") && f(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, n, a));
      function f(h, v, c, p) {
        return h[c] == null || v[p || c] === h[c];
      }
    }, r.prototype.afterTrigger = function() {
      this.eventInfo = null;
    }, r;
  })()
), Wu = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"], Ec = Wu.concat(["symbolKeepAspect"]), Vx = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    var e = r.getData();
    if (r.legendIcon && e.setVisual("legendIcon", r.legendIcon), !r.hasSymbolVisual)
      return;
    for (var i = {}, n = {}, a = !1, o = 0; o < Wu.length; o++) {
      var s = Wu[o], l = r.get(s);
      X(l) ? (a = !0, n[s] = l) : i[s] = l;
    }
    if (i.symbol = i.symbol || r.defaultSymbol, e.setVisual(O({
      legendIcon: r.legendIcon || i.symbol,
      symbolKeepAspect: r.get("symbolKeepAspect")
    }, i)), t.isSeriesFiltered(r))
      return;
    var u = ct(n);
    function f(h, v) {
      for (var c = r.getRawValue(v), p = r.getDataParams(v), d = 0; d < u.length; d++) {
        var g = u[d];
        h.setItemVisual(v, g, n[g](c, p));
      }
    }
    return {
      dataEach: a ? f : null
    };
  }
}, Hx = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(r, t) {
    if (!r.hasSymbolVisual || t.isSeriesFiltered(r))
      return;
    var e = r.getData();
    function i(n, a) {
      for (var o = n.getItemModel(a), s = 0; s < Ec.length; s++) {
        var l = Ec[s], u = o.getShallow(l, !0);
        u != null && n.setItemVisual(a, l, u);
      }
    }
    return {
      dataEach: e.hasItemOption ? i : null
    };
  }
};
function Gx(r, t, e) {
  switch (e) {
    case "color":
      var i = r.getItemVisual(t, "style");
      return i[r.getVisual("drawType")];
    case "opacity":
      return r.getItemVisual(t, "style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return r.getItemVisual(t, e);
  }
}
function ih(r, t) {
  switch (t) {
    case "color":
      var e = r.getVisual("style");
      return e[r.getVisual("drawType")];
    case "opacity":
      return r.getVisual("style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return r.getVisual(t);
  }
}
function yi(r, t, e, i, n) {
  var a = r + t;
  e.isSilent(a) || i.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function(o) {
    for (var s = o.seriesIndex, l = o.option.selectedMap, u = n.selected, f = 0; f < u.length; f++)
      if (u[f].seriesIndex === s) {
        var h = o.getData(), v = qr(h, n.fromActionPayload);
        e.trigger(a, {
          type: a,
          seriesId: o.id,
          name: N(v) ? h.getName(v[0]) : h.getName(v),
          selected: z(l) ? l : O({}, l)
        });
      }
  });
}
function Wx(r, t, e) {
  r.on("selectchanged", function(i) {
    var n = e.getModel();
    i.isFromClick ? (yi("map", "selectchanged", t, n, i), yi("pie", "selectchanged", t, n, i)) : i.fromAction === "select" ? (yi("map", "selected", t, n, i), yi("pie", "selected", t, n, i)) : i.fromAction === "unselect" && (yi("map", "unselected", t, n, i), yi("pie", "unselected", t, n, i));
  });
}
function Mn(r, t, e) {
  for (var i; r && !(t(r) && (i = r, e)); )
    r = r.__hostTarget || r.parent;
  return i;
}
var Ux = Math.round(Math.random() * 9), Yx = typeof Object.defineProperty == "function", Zx = (function() {
  function r() {
    this._id = "__ec_inner_" + Ux++;
  }
  return r.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, r.prototype.set = function(t, e) {
    var i = this._guard(t);
    return Yx ? Object.defineProperty(i, this._id, {
      value: e,
      enumerable: !1,
      configurable: !0
    }) : i[this._id] = e, this;
  }, r.prototype.delete = function(t) {
    return this.has(t) ? (delete this._guard(t)[this._id], !0) : !1;
  }, r.prototype.has = function(t) {
    return !!this._guard(t)[this._id];
  }, r.prototype._guard = function(t) {
    if (t !== Object(t))
      throw TypeError("Value of WeakMap is not a non-null object.");
    return t;
  }, r;
})(), Xx = nt.extend({
  type: "triangle",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.cx, i = t.cy, n = t.width / 2, a = t.height / 2;
    r.moveTo(e, i - a), r.lineTo(e + n, i + a), r.lineTo(e - n, i + a), r.closePath();
  }
}), $x = nt.extend({
  type: "diamond",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.cx, i = t.cy, n = t.width / 2, a = t.height / 2;
    r.moveTo(e, i - a), r.lineTo(e + n, i), r.lineTo(e, i + a), r.lineTo(e - n, i), r.closePath();
  }
}), qx = nt.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.x, i = t.y, n = t.width / 5 * 3, a = Math.max(n, t.height), o = n / 2, s = o * o / (a - o), l = i - a + o + s, u = Math.asin(s / o), f = Math.cos(u) * o, h = Math.sin(u), v = Math.cos(u), c = o * 0.6, p = o * 0.7;
    r.moveTo(e - f, l + s), r.arc(e, l, o, Math.PI - u, Math.PI * 2 + u), r.bezierCurveTo(e + f - h * c, l + s + v * c, e, i - p, e, i), r.bezierCurveTo(e, i - p, e - f + h * c, l + s + v * c, e - f, l + s), r.closePath();
  }
}), Kx = nt.extend({
  type: "arrow",
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(r, t) {
    var e = t.height, i = t.width, n = t.x, a = t.y, o = i / 3 * 2;
    r.moveTo(n, a), r.lineTo(n + o, a + e), r.lineTo(n, a + e / 4 * 3), r.lineTo(n - o, a + e), r.lineTo(n, a), r.closePath();
  }
}), Qx = {
  line: Ye,
  rect: dt,
  roundRect: dt,
  square: dt,
  circle: ss,
  diamond: $x,
  pin: qx,
  arrow: Kx,
  triangle: Xx
}, Jx = {
  line: function(r, t, e, i, n) {
    n.x1 = r, n.y1 = t + i / 2, n.x2 = r + e, n.y2 = t + i / 2;
  },
  rect: function(r, t, e, i, n) {
    n.x = r, n.y = t, n.width = e, n.height = i;
  },
  roundRect: function(r, t, e, i, n) {
    n.x = r, n.y = t, n.width = e, n.height = i, n.r = Math.min(e, i) / 4;
  },
  square: function(r, t, e, i, n) {
    var a = Math.min(e, i);
    n.x = r, n.y = t, n.width = a, n.height = a;
  },
  circle: function(r, t, e, i, n) {
    n.cx = r + e / 2, n.cy = t + i / 2, n.r = Math.min(e, i) / 2;
  },
  diamond: function(r, t, e, i, n) {
    n.cx = r + e / 2, n.cy = t + i / 2, n.width = e, n.height = i;
  },
  pin: function(r, t, e, i, n) {
    n.x = r + e / 2, n.y = t + i / 2, n.width = e, n.height = i;
  },
  arrow: function(r, t, e, i, n) {
    n.x = r + e / 2, n.y = t + i / 2, n.width = e, n.height = i;
  },
  triangle: function(r, t, e, i, n) {
    n.cx = r + e / 2, n.cy = t + i / 2, n.width = e, n.height = i;
  }
}, Vo = {};
M(Qx, function(r, t) {
  Vo[t] = new r();
});
var jx = nt.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(r, t, e) {
    var i = Mo(r, t, e), n = this.shape;
    return n && n.symbolType === "pin" && t.position === "inside" && (i.y = e.y + e.height * 0.4), i;
  },
  buildPath: function(r, t, e) {
    var i = t.symbolType;
    if (i !== "none") {
      var n = Vo[i];
      n || (i = "rect", n = Vo[i]), Jx[i](t.x, t.y, t.width, t.height, n.shape), n.buildPath(r, n.shape, e);
    }
  }
});
function tT(r, t) {
  if (this.type !== "image") {
    var e = this.style;
    this.__isEmptyBrush ? (e.stroke = r, e.fill = t || "#fff", e.lineWidth = 2) : this.shape.symbolType === "line" ? e.stroke = r : e.fill = r, this.markRedraw();
  }
}
function ke(r, t, e, i, n, a, o) {
  var s = r.indexOf("empty") === 0;
  s && (r = r.substr(5, 1).toLowerCase() + r.substr(6));
  var l;
  return r.indexOf("image://") === 0 ? l = Bg(r.slice(8), new it(t, e, i, n), o ? "center" : "cover") : r.indexOf("path://") === 0 ? l = Vf(r.slice(7), {}, new it(t, e, i, n), o ? "center" : "cover") : l = new jx({
    shape: {
      symbolType: r,
      x: t,
      y: e,
      width: i,
      height: n
    }
  }), l.__isEmptyBrush = s, l.setColor = tT, a && l.setColor(a), l;
}
function nh(r) {
  return N(r) || (r = [+r, +r]), [r[0] || 0, r[1] || 0];
}
function Cs(r, t) {
  if (r != null)
    return N(r) || (r = [r, r]), [St(r[0], t[0]) || 0, St(q(r[1], r[0]), t[1]) || 0];
}
function Gr(r) {
  return isFinite(r);
}
function eT(r, t, e) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * e.width + e.x, n = n * e.width + e.x, a = a * e.height + e.y, o = o * e.height + e.y), i = Gr(i) ? i : 0, n = Gr(n) ? n : 1, a = Gr(a) ? a : 0, o = Gr(o) ? o : 0;
  var s = r.createLinearGradient(i, a, n, o);
  return s;
}
function rT(r, t, e) {
  var i = e.width, n = e.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + e.x, s = s * n + e.y, l = l * a), o = Gr(o) ? o : 0.5, s = Gr(s) ? s : 0.5, l = l >= 0 && Gr(l) ? l : 0.5;
  var u = r.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function Uu(r, t, e) {
  for (var i = t.type === "radial" ? rT(r, t, e) : eT(r, t, e), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function iT(r, t) {
  if (r === t || !r && !t)
    return !1;
  if (!r || !t || r.length !== t.length)
    return !0;
  for (var e = 0; e < r.length; e++)
    if (r[e] !== t[e])
      return !0;
  return !1;
}
function Na(r) {
  return parseInt(r, 10);
}
function Fa(r, t, e) {
  var i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (e[i] != null && e[i] !== "auto")
    return parseFloat(e[i]);
  var s = document.defaultView.getComputedStyle(r);
  return (r[n] || Na(s[i]) || Na(r.style[i])) - (Na(s[a]) || 0) - (Na(s[o]) || 0) | 0;
}
function nT(r, t) {
  return !r || r === "solid" || !(t > 0) ? null : r === "dashed" ? [4 * t, 2 * t] : r === "dotted" ? [t] : ht(r) ? [r] : N(r) ? r : null;
}
function Ny(r) {
  var t = r.style, e = t.lineDash && t.lineWidth > 0 && nT(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    var n = t.strokeNoScale && r.getLineScale ? r.getLineScale() : 1;
    n && n !== 1 && (e = V(e, function(a) {
      return a / n;
    }), i /= n);
  }
  return [e, i];
}
var aT = new Kr(!0);
function Ho(r) {
  var t = r.stroke;
  return !(t == null || t === "none" || !(r.lineWidth > 0));
}
function kc(r) {
  return typeof r == "string" && r !== "none";
}
function Go(r) {
  var t = r.fill;
  return t != null && t !== "none";
}
function Oc(r, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.fillOpacity * t.opacity, r.fill(), r.globalAlpha = e;
  } else
    r.fill();
}
function Bc(r, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.strokeOpacity * t.opacity, r.stroke(), r.globalAlpha = e;
  } else
    r.stroke();
}
function Yu(r, t, e) {
  var i = fg(t.image, t.__image, e);
  if (rs(i)) {
    var n = r.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * G0), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function oT(r, t, e, i) {
  var n, a = Ho(e), o = Go(e), s = e.strokePercent, l = s < 1, u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var f = t.path || aT, h = t.__dirty;
  if (!i) {
    var v = e.fill, c = e.stroke, p = o && !!v.colorStops, d = a && !!c.colorStops, g = o && !!v.image, y = a && !!c.image, m = void 0, _ = void 0, S = void 0, b = void 0, w = void 0;
    (p || d) && (w = t.getBoundingRect()), p && (m = h ? Uu(r, v, w) : t.__canvasFillGradient, t.__canvasFillGradient = m), d && (_ = h ? Uu(r, c, w) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = _), g && (S = h || !t.__canvasFillPattern ? Yu(r, v, t) : t.__canvasFillPattern, t.__canvasFillPattern = S), y && (b = h || !t.__canvasStrokePattern ? Yu(r, c, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = S), p ? r.fillStyle = m : g && (S ? r.fillStyle = S : o = !1), d ? r.strokeStyle = _ : y && (b ? r.strokeStyle = b : a = !1);
  }
  var x = t.getGlobalScale();
  f.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var C, D;
  r.setLineDash && e.lineDash && (n = Ny(t), C = n[0], D = n[1]);
  var A = !0;
  (u || h & bi) && (f.setDPR(r.dpr), l ? f.setContext(null) : (f.setContext(r), A = !1), f.reset(), t.buildPath(f, t.shape, i), f.toStatic(), t.pathUpdated()), A && f.rebuildPath(r, l ? s : 1), C && (r.setLineDash(C), r.lineDashOffset = D), i || (e.strokeFirst ? (a && Bc(r, e), o && Oc(r, e)) : (o && Oc(r, e), a && Bc(r, e))), C && r.setLineDash([]);
}
function sT(r, t, e) {
  var i = t.__image = fg(e.image, t.__image, t, t.onload);
  if (!(!i || !rs(i))) {
    var n = e.x || 0, a = e.y || 0, o = t.getWidth(), s = t.getHeight(), l = i.width / i.height;
    if (o == null && s != null ? o = s * l : s == null && o != null ? s = o / l : o == null && s == null && (o = i.width, s = i.height), e.sWidth && e.sHeight) {
      var u = e.sx || 0, f = e.sy || 0;
      r.drawImage(i, u, f, e.sWidth, e.sHeight, n, a, o, s);
    } else if (e.sx && e.sy) {
      var u = e.sx, f = e.sy, h = o - u, v = s - f;
      r.drawImage(i, u, f, h, v, n, a, o, s);
    } else
      r.drawImage(i, n, a, o, s);
  }
}
function lT(r, t, e) {
  var i, n = e.text;
  if (n != null && (n += ""), n) {
    r.font = e.font || Xr, r.textAlign = e.textAlign, r.textBaseline = e.textBaseline;
    var a = void 0, o = void 0;
    r.setLineDash && e.lineDash && (i = Ny(t), a = i[0], o = i[1]), a && (r.setLineDash(a), r.lineDashOffset = o), e.strokeFirst ? (Ho(e) && r.strokeText(n, e.x, e.y), Go(e) && r.fillText(n, e.x, e.y)) : (Go(e) && r.fillText(n, e.x, e.y), Ho(e) && r.strokeText(n, e.x, e.y)), a && r.setLineDash([]);
  }
}
var Nc = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], Fc = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function Fy(r, t, e, i, n) {
  var a = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    Ht(r, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    r.globalAlpha = isNaN(o) ? Ur.opacity : o;
  }
  (i || t.blend !== e.blend) && (a || (Ht(r, n), a = !0), r.globalCompositeOperation = t.blend || Ur.blend);
  for (var s = 0; s < Nc.length; s++) {
    var l = Nc[s];
    (i || t[l] !== e[l]) && (a || (Ht(r, n), a = !0), r[l] = r.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (a || (Ht(r, n), a = !0), r.shadowColor = t.shadowColor || Ur.shadowColor), a;
}
function zc(r, t, e, i, n) {
  var a = ta(t, n.inHover), o = i ? null : e && ta(e, n.inHover) || {};
  if (a === o)
    return !1;
  var s = Fy(r, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (Ht(r, n), s = !0), kc(a.fill) && (r.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (Ht(r, n), s = !0), kc(a.stroke) && (r.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (Ht(r, n), s = !0), r.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var l = a.lineWidth, u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    r.lineWidth !== u && (s || (Ht(r, n), s = !0), r.lineWidth = u);
  }
  for (var f = 0; f < Fc.length; f++) {
    var h = Fc[f], v = h[0];
    (i || a[v] !== o[v]) && (s || (Ht(r, n), s = !0), r[v] = a[v] || h[1]);
  }
  return s;
}
function uT(r, t, e, i, n) {
  return Fy(r, ta(t, n.inHover), e && ta(e, n.inHover), i, n);
}
function zy(r, t) {
  var e = t.transform, i = r.dpr || 1;
  e ? r.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : r.setTransform(i, 0, 0, i, 0, 0);
}
function fT(r, t, e) {
  for (var i = !1, n = 0; n < r.length; n++) {
    var a = r[n];
    i = i || a.isZeroArea(), zy(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  e.allClipped = i;
}
function hT(r, t) {
  return r && t ? r[0] !== t[0] || r[1] !== t[1] || r[2] !== t[2] || r[3] !== t[3] || r[4] !== t[4] || r[5] !== t[5] : !(!r && !t);
}
var Vc = 1, Hc = 2, Gc = 3, Wc = 4;
function vT(r) {
  var t = Go(r), e = Ho(r);
  return !(r.lineDash || !(+t ^ +e) || t && typeof r.fill != "string" || e && typeof r.stroke != "string" || r.strokePercent < 1 || r.strokeOpacity < 1 || r.fillOpacity < 1);
}
function Ht(r, t) {
  t.batchFill && r.fill(), t.batchStroke && r.stroke(), t.batchFill = "", t.batchStroke = "";
}
function ta(r, t) {
  return t && r.__hoverStyle || r.style;
}
function Vy(r, t) {
  Wr(r, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function Wr(r, t, e, i) {
  var n = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~$t, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = e.prevElClipPaths, s = !1, l = !1;
  if ((!o || iT(a, o)) && (o && o.length && (Ht(r, e), r.restore(), l = s = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), a && a.length && (Ht(r, e), r.save(), fT(a, r, e), s = !0), e.prevElClipPaths = a), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var u = e.prevEl;
  u || (l = s = !0);
  var f = t instanceof nt && t.autoBatch && vT(t.style);
  s || hT(n, u.transform) ? (Ht(r, e), zy(r, t)) : f || Ht(r, e);
  var h = ta(t, e.inHover);
  t instanceof nt ? (e.lastDrawType !== Vc && (l = !0, e.lastDrawType = Vc), zc(r, t, u, l, e), (!f || !e.batchFill && !e.batchStroke) && r.beginPath(), oT(r, t, h, f), f && (e.batchFill = h.fill || "", e.batchStroke = h.stroke || "")) : t instanceof Lo ? (e.lastDrawType !== Gc && (l = !0, e.lastDrawType = Gc), zc(r, t, u, l, e), lT(r, t, h)) : t instanceof pr ? (e.lastDrawType !== Hc && (l = !0, e.lastDrawType = Hc), uT(r, t, u, l, e), sT(r, t, h)) : t.getTemporalDisplayables && (e.lastDrawType !== Wc && (l = !0, e.lastDrawType = Wc), cT(r, t, e)), f && i && Ht(r, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function cT(r, t, e) {
  var i = t.getDisplayables(), n = t.getTemporalDisplayables();
  r.save();
  var a = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: !1,
    viewWidth: e.viewWidth,
    viewHeight: e.viewHeight,
    inHover: e.inHover
  }, o, s;
  for (o = t.getCursor(), s = i.length; o < s; o++) {
    var l = i[o];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Wr(r, l, a, o === s - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  for (var u = 0, f = n.length; u < f; u++) {
    var l = n[u];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Wr(r, l, a, u === f - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), a.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, r.restore();
}
var Ml = new Zx(), Uc = new na(100), Yc = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function Zu(r, t) {
  if (r === "none")
    return null;
  var e = t.getDevicePixelRatio(), i = t.getZr(), n = i.painter.type === "svg";
  r.dirty && Ml.delete(r);
  var a = Ml.get(r);
  if (a)
    return a;
  var o = st(r, {
    symbol: "rect",
    symbolSize: 1,
    symbolKeepAspect: !0,
    color: "rgba(0, 0, 0, 0.2)",
    backgroundColor: null,
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512
  });
  o.backgroundColor === "none" && (o.backgroundColor = null);
  var s = {
    repeat: "repeat"
  };
  return l(s), s.rotation = o.rotation, s.scaleX = s.scaleY = n ? 1 : 1 / e, Ml.set(r, s), r.dirty = !1, s;
  function l(u) {
    for (var f = [e], h = !0, v = 0; v < Yc.length; ++v) {
      var c = o[Yc[v]];
      if (c != null && !N(c) && !z(c) && !ht(c) && typeof c != "boolean") {
        h = !1;
        break;
      }
      f.push(c);
    }
    var p;
    if (h) {
      p = f.join(",") + (n ? "-svg" : "");
      var d = Uc.get(p);
      d && (n ? u.svgElement = d : u.image = d);
    }
    var g = Gy(o.dashArrayX), y = pT(o.dashArrayY), m = Hy(o.symbol), _ = dT(g), S = Wy(y), b = !n && Gi.createCanvas(), w = n && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, x = D(), C;
    b && (b.width = x.width * e, b.height = x.height * e, C = b.getContext("2d")), A(), h && Uc.put(p, b || w), u.image = b, u.svgElement = w, u.svgWidth = x.width, u.svgHeight = x.height;
    function D() {
      for (var T = 1, L = 0, I = _.length; L < I; ++L)
        T = av(T, _[L]);
      for (var P = 1, L = 0, I = m.length; L < I; ++L)
        P = av(P, m[L].length);
      T *= P;
      var R = S * _.length * m.length;
      return {
        width: Math.max(1, Math.min(T, o.maxTileWidth)),
        height: Math.max(1, Math.min(R, o.maxTileHeight))
      };
    }
    function A() {
      C && (C.clearRect(0, 0, b.width, b.height), o.backgroundColor && (C.fillStyle = o.backgroundColor, C.fillRect(0, 0, b.width, b.height)));
      for (var T = 0, L = 0; L < y.length; ++L)
        T += y[L];
      if (T <= 0)
        return;
      for (var I = -S, P = 0, R = 0, E = 0; I < x.height; ) {
        if (P % 2 === 0) {
          for (var H = R / 2 % m.length, B = 0, F = 0, W = 0; B < x.width * 2; ) {
            for (var K = 0, L = 0; L < g[E].length; ++L)
              K += g[E][L];
            if (K <= 0)
              break;
            if (F % 2 === 0) {
              var j = (1 - o.symbolSize) * 0.5, ut = B + g[E][F] * j, vt = I + y[P] * j, yt = g[E][F] * o.symbolSize, he = y[P] * o.symbolSize, dr = W / 2 % m[H].length;
              ai(ut, vt, yt, he, m[H][dr]);
            }
            B += g[E][F], ++W, ++F, F === g[E].length && (F = 0);
          }
          ++E, E === g.length && (E = 0);
        }
        I += y[P], ++R, ++P, P === y.length && (P = 0);
      }
      function ai(Zt, xt, $, tt, gr) {
        var It = n ? 1 : e, xh = ke(gr, Zt * It, xt * It, $ * It, tt * It, o.color, o.symbolKeepAspect);
        if (n) {
          var Th = i.painter.renderOneToVNode(xh);
          Th && w.children.push(Th);
        } else
          Vy(C, xh);
      }
    }
  }
}
function Hy(r) {
  if (!r || r.length === 0)
    return [["rect"]];
  if (z(r))
    return [[r]];
  for (var t = !0, e = 0; e < r.length; ++e)
    if (!z(r[e])) {
      t = !1;
      break;
    }
  if (t)
    return Hy([r]);
  for (var i = [], e = 0; e < r.length; ++e)
    z(r[e]) ? i.push([r[e]]) : i.push(r[e]);
  return i;
}
function Gy(r) {
  if (!r || r.length === 0)
    return [[0, 0]];
  if (ht(r)) {
    var t = Math.ceil(r);
    return [[t, t]];
  }
  for (var e = !0, i = 0; i < r.length; ++i)
    if (!ht(r[i])) {
      e = !1;
      break;
    }
  if (e)
    return Gy([r]);
  for (var n = [], i = 0; i < r.length; ++i)
    if (ht(r[i])) {
      var t = Math.ceil(r[i]);
      n.push([t, t]);
    } else {
      var t = V(r[i], function(s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? n.push(t.concat(t)) : n.push(t);
    }
  return n;
}
function pT(r) {
  if (!r || typeof r == "object" && r.length === 0)
    return [0, 0];
  if (ht(r)) {
    var t = Math.ceil(r);
    return [t, t];
  }
  var e = V(r, function(i) {
    return Math.ceil(i);
  });
  return r.length % 2 ? e.concat(e) : e;
}
function dT(r) {
  return V(r, function(t) {
    return Wy(t);
  });
}
function Wy(r) {
  for (var t = 0, e = 0; e < r.length; ++e)
    t += r[e];
  return r.length % 2 === 1 ? t * 2 : t;
}
function gT(r, t) {
  r.eachRawSeries(function(e) {
    if (!r.isSeriesFiltered(e)) {
      var i = e.getData();
      i.hasItemVisual() && i.each(function(o) {
        var s = i.getItemVisual(o, "decal");
        if (s) {
          var l = i.ensureUniqueItemVisual(o, "style");
          l.decal = Zu(s, t);
        }
      });
      var n = i.getVisual("decal");
      if (n) {
        var a = i.getVisual("style");
        a.decal = Zu(n, t);
      }
    }
  });
}
var ge = new Se(), Uy = {};
function yT(r, t) {
  Uy[r] = t;
}
function mT(r) {
  return Uy[r];
}
var _T = 1, ST = 800, wT = 900, bT = 1e3, xT = 2e3, TT = 5e3, Yy = 1e3, CT = 1100, ah = 2e3, Zy = 3e3, MT = 4e3, Ms = 4500, DT = 4600, AT = 5e3, LT = 6e3, Xy = 7e3, IT = {
  PROCESSOR: {
    FILTER: bT,
    SERIES_FILTER: ST,
    STATISTIC: TT
  },
  VISUAL: {
    LAYOUT: Yy,
    PROGRESSIVE_LAYOUT: CT,
    GLOBAL: ah,
    CHART: Zy,
    POST_CHART_LAYOUT: DT,
    COMPONENT: MT,
    BRUSH: AT,
    CHART_ITEM: Ms,
    ARIA: LT,
    DECAL: Xy
  }
}, Mt = "__flagInMainProcess", Nt = "__pendingUpdate", Dl = "__needsUpdateStatus", Zc = /^[a-zA-Z0-9_]+$/, Al = "__connectUpdateStatus", Xc = 0, PT = 1, RT = 2;
function $y(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return Ky(this, r, t);
  };
}
function qy(r) {
  return function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return Ky(this, r, t);
  };
}
function Ky(r, t, e) {
  return e[0] = e[0] && e[0].toLowerCase(), Se.prototype[t].apply(r, e);
}
var Qy = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  })(Se)
), Jy = Qy.prototype;
Jy.on = qy("on");
Jy.off = qy("off");
var mi, Ll, za, Je, Il, Pl, Rl, un, fn, $c, qc, El, Kc, Va, Qc, jy, Kt, Jc, tm = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e, i, n) {
      var a = r.call(this, new zx()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], n = n || {}, z(i) && (i = em[i]), a._dom = e;
      var o = "canvas", s = "auto", l = !1;
      n.ssr;
      var u = a._zr = iv(e, {
        renderer: n.renderer || o,
        devicePixelRatio: n.devicePixelRatio,
        width: n.width,
        height: n.height,
        ssr: n.ssr,
        useDirtyRect: q(n.useDirtyRect, l),
        useCoarsePointer: q(n.useCoarsePointer, s),
        pointerSize: n.pointerSize
      });
      a._ssr = n.ssr, a._throttledZrFlush = rh(Z(u.flush, u), 17), i = Q(i), i && vy(i, !0), a._theme = i, a._locale = Zw(n.locale || Yg), a._coordSysMgr = new Kf();
      var f = a._api = Qc(a);
      function h(v, c) {
        return v.__prio - c.__prio;
      }
      return io(Uo, h), io(Xu, h), a._scheduler = new Ry(a, f, Xu, Uo), a._messageCenter = new Qy(), a._initEvents(), a.resize = Z(a.resize, a), u.animation.on("frame", a._onframe, a), $c(u, a), qc(u, a), hu(a), a;
    }
    return t.prototype._onframe = function() {
      if (!this._disposed) {
        Jc(this);
        var e = this._scheduler;
        if (this[Nt]) {
          var i = this[Nt].silent;
          this[Mt] = !0;
          try {
            mi(this), Je.update.call(this, null, this[Nt].updateParams);
          } catch (l) {
            throw this[Mt] = !1, this[Nt] = null, l;
          }
          this._zr.flush(), this[Mt] = !1, this[Nt] = null, un.call(this, i), fn.call(this, i);
        } else if (e.unfinished) {
          var n = _T, a = this._model, o = this._api;
          e.unfinished = !1;
          do {
            var s = +/* @__PURE__ */ new Date();
            e.performSeriesTasks(a), e.performDataProcessorTasks(a), Pl(this, a), e.performVisualTasks(a), Va(this, this._model, o, "remain", {}), n -= +/* @__PURE__ */ new Date() - s;
          } while (n > 0 && e.unfinished);
          e.unfinished || this._zr.flush();
        }
      }
    }, t.prototype.getDom = function() {
      return this._dom;
    }, t.prototype.getId = function() {
      return this.id;
    }, t.prototype.getZr = function() {
      return this._zr;
    }, t.prototype.isSSR = function() {
      return this._ssr;
    }, t.prototype.setOption = function(e, i, n) {
      if (!this[Mt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        var a, o, s;
        if (G(i) && (n = i.lazyUpdate, a = i.silent, o = i.replaceMerge, s = i.transition, i = i.notMerge), this[Mt] = !0, !this._model || i) {
          var l = new _b(this._api), u = this._theme, f = this._model = new qf();
          f.scheduler = this._scheduler, f.ssr = this._ssr, f.init(null, null, null, u, this._locale, l);
        }
        this._model.setOption(e, {
          replaceMerge: o
        }, $u);
        var h = {
          seriesTransition: s,
          optionChanged: !0
        };
        if (n)
          this[Nt] = {
            silent: a,
            updateParams: h
          }, this[Mt] = !1, this.getZr().wakeUp();
        else {
          try {
            mi(this), Je.update.call(this, null, h);
          } catch (v) {
            throw this[Nt] = null, this[Mt] = !1, v;
          }
          this._ssr || this._zr.flush(), this[Nt] = null, this[Mt] = !1, un.call(this, a), fn.call(this, a);
        }
      }
    }, t.prototype.setTheme = function() {
    }, t.prototype.getModel = function() {
      return this._model;
    }, t.prototype.getOption = function() {
      return this._model && this._model.getOption();
    }, t.prototype.getWidth = function() {
      return this._zr.getWidth();
    }, t.prototype.getHeight = function() {
      return this._zr.getHeight();
    }, t.prototype.getDevicePixelRatio = function() {
      return this._zr.painter.dpr || U.hasGlobalWindow && window.devicePixelRatio || 1;
    }, t.prototype.getRenderedCanvas = function(e) {
      return this.renderToCanvas(e);
    }, t.prototype.renderToCanvas = function(e) {
      e = e || {};
      var i = this._zr.painter;
      return i.getRenderedCanvas({
        backgroundColor: e.backgroundColor || this._model.get("backgroundColor"),
        pixelRatio: e.pixelRatio || this.getDevicePixelRatio()
      });
    }, t.prototype.renderToSVGString = function(e) {
      e = e || {};
      var i = this._zr.painter;
      return i.renderToString({
        useViewBox: e.useViewBox
      });
    }, t.prototype.getSvgDataURL = function() {
      if (U.svgSupported) {
        var e = this._zr, i = e.storage.getDisplayList();
        return M(i, function(n) {
          n.stopAnimation(null, !0);
        }), e.painter.toDataURL();
      }
    }, t.prototype.getDataURL = function(e) {
      if (this._disposed) {
        this.id;
        return;
      }
      e = e || {};
      var i = e.excludeComponents, n = this._model, a = [], o = this;
      M(i, function(l) {
        n.eachComponent({
          mainType: l
        }, function(u) {
          var f = o._componentsMap[u.__viewId];
          f.group.ignore || (a.push(f), f.group.ignore = !0);
        });
      });
      var s = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(e).toDataURL("image/" + (e && e.type || "png"));
      return M(a, function(l) {
        l.group.ignore = !1;
      }), s;
    }, t.prototype.getConnectedDataURL = function(e) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = e.type === "svg", n = this.group, a = Math.min, o = Math.max, s = 1 / 0;
      if (jc[n]) {
        var l = s, u = s, f = -s, h = -s, v = [], c = e && e.pixelRatio || this.getDevicePixelRatio();
        M(zn, function(_, S) {
          if (_.group === n) {
            var b = i ? _.getZr().painter.getSvgDom().innerHTML : _.renderToCanvas(Q(e)), w = _.getDom().getBoundingClientRect();
            l = a(w.left, l), u = a(w.top, u), f = o(w.right, f), h = o(w.bottom, h), v.push({
              dom: b,
              left: w.left,
              top: w.top
            });
          }
        }), l *= c, u *= c, f *= c, h *= c;
        var p = f - l, d = h - u, g = Gi.createCanvas(), y = iv(g, {
          renderer: i ? "svg" : "canvas"
        });
        if (y.resize({
          width: p,
          height: d
        }), i) {
          var m = "";
          return M(v, function(_) {
            var S = _.left - l, b = _.top - u;
            m += '<g transform="translate(' + S + "," + b + ')">' + _.dom + "</g>";
          }), y.painter.getSvgRoot().innerHTML = m, e.connectedBackgroundColor && y.painter.setBackgroundColor(e.connectedBackgroundColor), y.refreshImmediately(), y.painter.toDataURL();
        } else
          return e.connectedBackgroundColor && y.add(new dt({
            shape: {
              x: 0,
              y: 0,
              width: p,
              height: d
            },
            style: {
              fill: e.connectedBackgroundColor
            }
          })), M(v, function(_) {
            var S = new pr({
              style: {
                x: _.left * c - l,
                y: _.top * c - u,
                image: _.dom
              }
            });
            y.add(S);
          }), y.refreshImmediately(), g.toDataURL("image/" + (e && e.type || "png"));
      } else
        return this.getDataURL(e);
    }, t.prototype.convertToPixel = function(e, i) {
      return Il(this, "convertToPixel", e, i);
    }, t.prototype.convertFromPixel = function(e, i) {
      return Il(this, "convertFromPixel", e, i);
    }, t.prototype.containPixel = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      var n = this._model, a, o = js(n, e);
      return M(o, function(s, l) {
        l.indexOf("Models") >= 0 && M(s, function(u) {
          var f = u.coordinateSystem;
          if (f && f.containPoint)
            a = a || !!f.containPoint(i);
          else if (l === "seriesModels") {
            var h = this._chartsMap[u.__viewId];
            h && h.containPoint && (a = a || h.containPoint(i, u));
          }
        }, this);
      }, this), !!a;
    }, t.prototype.getVisual = function(e, i) {
      var n = this._model, a = js(n, e, {
        defaultMainType: "series"
      }), o = a.seriesModel, s = o.getData(), l = a.hasOwnProperty("dataIndexInside") ? a.dataIndexInside : a.hasOwnProperty("dataIndex") ? s.indexOfRawIndex(a.dataIndex) : null;
      return l != null ? Gx(s, l, i) : ih(s, i);
    }, t.prototype.getViewOfComponentModel = function(e) {
      return this._componentsMap[e.__viewId];
    }, t.prototype.getViewOfSeriesModel = function(e) {
      return this._chartsMap[e.__viewId];
    }, t.prototype._initEvents = function() {
      var e = this;
      M(ET, function(i) {
        var n = function(a) {
          var o = e.getModel(), s = a.target, l, u = i === "globalout";
          if (u ? l = {} : s && Mn(s, function(p) {
            var d = et(p);
            if (d && d.dataIndex != null) {
              var g = d.dataModel || o.getSeriesByIndex(d.seriesIndex);
              return l = g && g.getDataParams(d.dataIndex, d.dataType, s) || {}, !0;
            } else if (d.eventData)
              return l = O({}, d.eventData), !0;
          }, !0), l) {
            var f = l.componentType, h = l.componentIndex;
            (f === "markLine" || f === "markPoint" || f === "markArea") && (f = "series", h = l.seriesIndex);
            var v = f && h != null && o.getComponent(f, h), c = v && e[v.mainType === "series" ? "_chartsMap" : "_componentsMap"][v.__viewId];
            l.event = a, l.type = i, e._$eventProcessor.eventInfo = {
              targetEl: s,
              packedEvent: l,
              model: v,
              view: c
            }, e.trigger(i, l);
          }
        };
        n.zrEventfulCallAtLast = !0, e._zr.on(i, n, e);
      }), M(Fn, function(i, n) {
        e._messageCenter.on(n, function(a) {
          this.trigger(n, a);
        }, e);
      }), M(["selectchanged"], function(i) {
        e._messageCenter.on(i, function(n) {
          this.trigger(i, n);
        }, e);
      }), Wx(this._messageCenter, this, this._api);
    }, t.prototype.isDisposed = function() {
      return this._disposed;
    }, t.prototype.clear = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this.setOption({
        series: []
      }, !0);
    }, t.prototype.dispose = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._disposed = !0;
      var e = this.getDom();
      e && sg(this.getDom(), sh, "");
      var i = this, n = i._api, a = i._model;
      M(i._componentsViews, function(o) {
        o.dispose(a, n);
      }), M(i._chartsViews, function(o) {
        o.dispose(a, n);
      }), i._zr.dispose(), i._dom = i._model = i._chartsMap = i._componentsMap = i._chartsViews = i._componentsViews = i._scheduler = i._api = i._zr = i._throttledZrFlush = i._theme = i._coordSysMgr = i._messageCenter = null, delete zn[i.id];
    }, t.prototype.resize = function(e) {
      if (!this[Mt]) {
        if (this._disposed) {
          this.id;
          return;
        }
        this._zr.resize(e);
        var i = this._model;
        if (this._loadingFX && this._loadingFX.resize(), !!i) {
          var n = i.resetOption("media"), a = e && e.silent;
          this[Nt] && (a == null && (a = this[Nt].silent), n = !0, this[Nt] = null), this[Mt] = !0;
          try {
            n && mi(this), Je.update.call(this, {
              type: "resize",
              animation: O({
                // Disable animation
                duration: 0
              }, e && e.animation)
            });
          } catch (o) {
            throw this[Mt] = !1, o;
          }
          this[Mt] = !1, un.call(this, a), fn.call(this, a);
        }
      }
    }, t.prototype.showLoading = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (G(e) && (i = e, e = ""), e = e || "default", this.hideLoading(), !!qu[e]) {
        var n = qu[e](this._api, i), a = this._zr;
        this._loadingFX = n, a.add(n);
      }
    }, t.prototype.hideLoading = function() {
      if (this._disposed) {
        this.id;
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, t.prototype.makeActionFromEvent = function(e) {
      var i = O({}, e);
      return i.type = Fn[e.type], i;
    }, t.prototype.dispatchAction = function(e, i) {
      if (this._disposed) {
        this.id;
        return;
      }
      if (G(i) || (i = {
        silent: !!i
      }), !!Wo[e.type] && this._model) {
        if (this[Mt]) {
          this._pendingActions.push(e);
          return;
        }
        var n = i.silent;
        Rl.call(this, e, n);
        var a = i.flush;
        a ? this._zr.flush() : a !== !1 && U.browser.weChat && this._throttledZrFlush(), un.call(this, n), fn.call(this, n);
      }
    }, t.prototype.updateLabelLayout = function() {
      ge.trigger("series:layoutlabels", this._model, this._api, {
        // Not adding series labels.
        // TODO
        updatedSeries: []
      });
    }, t.prototype.appendData = function(e) {
      if (this._disposed) {
        this.id;
        return;
      }
      var i = e.seriesIndex, n = this.getModel(), a = n.getSeriesByIndex(i);
      a.appendData(e), this._scheduler.unfinished = !0, this.getZr().wakeUp();
    }, t.internalField = (function() {
      mi = function(h) {
        var v = h._scheduler;
        v.restorePipelines(h._model), v.prepareStageTasks(), Ll(h, !0), Ll(h, !1), v.plan();
      }, Ll = function(h, v) {
        for (var c = h._model, p = h._scheduler, d = v ? h._componentsViews : h._chartsViews, g = v ? h._componentsMap : h._chartsMap, y = h._zr, m = h._api, _ = 0; _ < d.length; _++)
          d[_].__alive = !1;
        v ? c.eachComponent(function(w, x) {
          w !== "series" && S(x);
        }) : c.eachSeries(S);
        function S(w) {
          var x = w.__requireNewView;
          w.__requireNewView = !1;
          var C = "_ec_" + w.id + "_" + w.type, D = !x && g[C];
          if (!D) {
            var A = Ie(w.type), T = v ? ue.getClass(A.main, A.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              se.getClass(A.sub)
            );
            D = new T(), D.init(c, m), g[C] = D, d.push(D), y.add(D.group);
          }
          w.__viewId = D.__id = C, D.__alive = !0, D.__model = w, D.group.__ecComponentInfo = {
            mainType: w.mainType,
            index: w.componentIndex
          }, !v && p.prepareView(D, w, c, m);
        }
        for (var _ = 0; _ < d.length; ) {
          var b = d[_];
          b.__alive ? _++ : (!v && b.renderTask.dispose(), y.remove(b.group), b.dispose(c, m), d.splice(_, 1), g[b.__id] === b && delete g[b.__id], b.__id = b.group.__ecComponentInfo = null);
        }
      }, za = function(h, v, c, p, d) {
        var g = h._model;
        if (g.setUpdatePayload(c), !p) {
          M([].concat(h._componentsViews).concat(h._chartsViews), b);
          return;
        }
        var y = {};
        y[p + "Id"] = c[p + "Id"], y[p + "Index"] = c[p + "Index"], y[p + "Name"] = c[p + "Name"];
        var m = {
          mainType: p,
          query: y
        };
        d && (m.subType = d);
        var _ = c.excludeSeriesId, S;
        _ != null && (S = Y(), M(Et(_), function(w) {
          var x = Re(w, null);
          x != null && S.set(x, !0);
        })), g && g.eachComponent(m, function(w) {
          var x = S && S.get(w.id) != null;
          if (!x)
            if (Ev(c))
              if (w instanceof ye)
                c.type === Yr && !c.notBlur && !w.get(["emphasis", "disabled"]) && PS(w, c, h._api);
              else {
                var C = Bf(w.mainType, w.componentIndex, c.name, h._api), D = C.focusSelf, A = C.dispatchers;
                c.type === Yr && D && !c.notBlur && Pu(w.mainType, w.componentIndex, h._api), A && M(A, function(T) {
                  c.type === Yr ? Yn(T) : Zn(T);
                });
              }
            else Eu(c) && w instanceof ye && (kS(w, c, h._api), Pv(w), Kt(h));
        }, h), g && g.eachComponent(m, function(w) {
          var x = S && S.get(w.id) != null;
          x || b(h[p === "series" ? "_chartsMap" : "_componentsMap"][w.__viewId]);
        }, h);
        function b(w) {
          w && w.__alive && w[v] && w[v](w.__model, g, h._api, c);
        }
      }, Je = {
        prepareAndUpdate: function(h) {
          mi(this), Je.update.call(this, h, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: h.newOption != null
          });
        },
        update: function(h, v) {
          var c = this._model, p = this._api, d = this._zr, g = this._coordSysMgr, y = this._scheduler;
          if (c) {
            c.setUpdatePayload(h), y.restoreData(c, h), y.performSeriesTasks(c), g.create(c, p), y.performDataProcessorTasks(c, h), Pl(this, c), g.update(c, p), e(c), y.performVisualTasks(c, h), El(this, c, p, h, v);
            var m = c.get("backgroundColor") || "transparent", _ = c.get("darkMode");
            d.setBackgroundColor(m), _ != null && _ !== "auto" && d.setDarkMode(_), ge.trigger("afterupdate", c, p);
          }
        },
        updateTransform: function(h) {
          var v = this, c = this._model, p = this._api;
          if (c) {
            c.setUpdatePayload(h);
            var d = [];
            c.eachComponent(function(y, m) {
              if (y !== "series") {
                var _ = v.getViewOfComponentModel(m);
                if (_ && _.__alive)
                  if (_.updateTransform) {
                    var S = _.updateTransform(m, c, p, h);
                    S && S.update && d.push(_);
                  } else
                    d.push(_);
              }
            });
            var g = Y();
            c.eachSeries(function(y) {
              var m = v._chartsMap[y.__viewId];
              if (m.updateTransform) {
                var _ = m.updateTransform(y, c, p, h);
                _ && _.update && g.set(y.uid, 1);
              } else
                g.set(y.uid, 1);
            }), e(c), this._scheduler.performVisualTasks(c, h, {
              setDirty: !0,
              dirtyMap: g
            }), Va(this, c, p, h, {}, g), ge.trigger("afterupdate", c, p);
          }
        },
        updateView: function(h) {
          var v = this._model;
          v && (v.setUpdatePayload(h), se.markUpdateMethod(h, "updateView"), e(v), this._scheduler.performVisualTasks(v, h, {
            setDirty: !0
          }), El(this, v, this._api, h, {}), ge.trigger("afterupdate", v, this._api));
        },
        updateVisual: function(h) {
          var v = this, c = this._model;
          c && (c.setUpdatePayload(h), c.eachSeries(function(p) {
            p.getData().clearAllVisual();
          }), se.markUpdateMethod(h, "updateVisual"), e(c), this._scheduler.performVisualTasks(c, h, {
            visualType: "visual",
            setDirty: !0
          }), c.eachComponent(function(p, d) {
            if (p !== "series") {
              var g = v.getViewOfComponentModel(d);
              g && g.__alive && g.updateVisual(d, c, v._api, h);
            }
          }), c.eachSeries(function(p) {
            var d = v._chartsMap[p.__viewId];
            d.updateVisual(p, c, v._api, h);
          }), ge.trigger("afterupdate", c, this._api));
        },
        updateLayout: function(h) {
          Je.update.call(this, h);
        }
      }, Il = function(h, v, c, p) {
        if (h._disposed) {
          h.id;
          return;
        }
        for (var d = h._model, g = h._coordSysMgr.getCoordinateSystems(), y, m = js(d, c), _ = 0; _ < g.length; _++) {
          var S = g[_];
          if (S[v] && (y = S[v](d, m, p)) != null)
            return y;
        }
      }, Pl = function(h, v) {
        var c = h._chartsMap, p = h._scheduler;
        v.eachSeries(function(d) {
          p.updateStreamModes(d, c[d.__viewId]);
        });
      }, Rl = function(h, v) {
        var c = this, p = this.getModel(), d = h.type, g = h.escapeConnect, y = Wo[d], m = y.actionInfo, _ = (m.update || "update").split(":"), S = _.pop(), b = _[0] != null && Ie(_[0]);
        this[Mt] = !0;
        var w = [h], x = !1;
        h.batch && (x = !0, w = V(h.batch, function(P) {
          return P = st(O({}, P), h), P.batch = null, P;
        }));
        var C = [], D, A = Eu(h), T = Ev(h);
        if (T && Mg(this._api), M(w, function(P) {
          if (D = y.action(P, c._model, c._api), D = D || O({}, P), D.type = m.event || D.type, C.push(D), T) {
            var R = If(h), E = R.queryOptionMap, H = R.mainTypeSpecified, B = H ? E.keys()[0] : "series";
            za(c, S, P, B), Kt(c);
          } else A ? (za(c, S, P, "series"), Kt(c)) : b && za(c, S, P, b.main, b.sub);
        }), S !== "none" && !T && !A && !b)
          try {
            this[Nt] ? (mi(this), Je.update.call(this, h), this[Nt] = null) : Je[S].call(this, h);
          } catch (P) {
            throw this[Mt] = !1, P;
          }
        if (x ? D = {
          type: m.event || d,
          escapeConnect: g,
          batch: C
        } : D = C[0], this[Mt] = !1, !v) {
          var L = this._messageCenter;
          if (L.trigger(D.type, D), A) {
            var I = {
              type: "selectchanged",
              escapeConnect: g,
              selected: OS(p),
              isFromClick: h.isFromClick || !1,
              fromAction: h.type,
              fromActionPayload: h
            };
            L.trigger(I.type, I);
          }
        }
      }, un = function(h) {
        for (var v = this._pendingActions; v.length; ) {
          var c = v.shift();
          Rl.call(this, c, h);
        }
      }, fn = function(h) {
        !h && this.trigger("updated");
      }, $c = function(h, v) {
        h.on("rendered", function(c) {
          v.trigger("rendered", c), // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          h.animation.isFinished() && !v[Nt] && !v._scheduler.unfinished && !v._pendingActions.length && v.trigger("finished");
        });
      }, qc = function(h, v) {
        h.on("mouseover", function(c) {
          var p = c.target, d = Mn(p, Ru);
          d && (RS(d, c, v._api), Kt(v));
        }).on("mouseout", function(c) {
          var p = c.target, d = Mn(p, Ru);
          d && (ES(d, c, v._api), Kt(v));
        }).on("click", function(c) {
          var p = c.target, d = Mn(p, function(m) {
            return et(m).dataIndex != null;
          }, !0);
          if (d) {
            var g = d.selected ? "unselect" : "select", y = et(d);
            v._api.dispatchAction({
              type: g,
              dataType: y.dataType,
              dataIndexInside: y.dataIndex,
              seriesIndex: y.seriesIndex,
              isFromClick: !0
            });
          }
        });
      };
      function e(h) {
        h.clearColorPalette(), h.eachSeries(function(v) {
          v.clearColorPalette();
        });
      }
      function i(h) {
        var v = [], c = [], p = !1;
        if (h.eachComponent(function(m, _) {
          var S = _.get("zlevel") || 0, b = _.get("z") || 0, w = _.getZLevelKey();
          p = p || !!w, (m === "series" ? c : v).push({
            zlevel: S,
            z: b,
            idx: _.componentIndex,
            type: m,
            key: w
          });
        }), p) {
          var d = v.concat(c), g, y;
          io(d, function(m, _) {
            return m.zlevel === _.zlevel ? m.z - _.z : m.zlevel - _.zlevel;
          }), M(d, function(m) {
            var _ = h.getComponent(m.type, m.idx), S = m.zlevel, b = m.key;
            g != null && (S = Math.max(g, S)), b ? (S === g && b !== y && S++, y = b) : y && (S === g && S++, y = ""), g = S, _.setZLevel(S);
          });
        }
      }
      El = function(h, v, c, p, d) {
        i(v), Kc(h, v, c, p, d), M(h._chartsViews, function(g) {
          g.__alive = !1;
        }), Va(h, v, c, p, d), M(h._chartsViews, function(g) {
          g.__alive || g.remove(v, c);
        });
      }, Kc = function(h, v, c, p, d, g) {
        M(g || h._componentsViews, function(y) {
          var m = y.__model;
          u(m, y), y.render(m, v, c, p), s(m, y), f(m, y);
        });
      }, Va = function(h, v, c, p, d, g) {
        var y = h._scheduler;
        d = O(d || {}, {
          updatedSeries: v.getSeries()
        }), ge.trigger("series:beforeupdate", v, c, d);
        var m = !1;
        v.eachSeries(function(_) {
          var S = h._chartsMap[_.__viewId];
          S.__alive = !0;
          var b = S.renderTask;
          y.updatePayload(b, p), u(_, S), g && g.get(_.uid) && b.dirty(), b.perform(y.getPerformArgs(b)) && (m = !0), S.group.silent = !!_.get("silent"), o(_, S), Pv(_);
        }), y.unfinished = m || y.unfinished, ge.trigger("series:layoutlabels", v, c, d), ge.trigger("series:transition", v, c, d), v.eachSeries(function(_) {
          var S = h._chartsMap[_.__viewId];
          s(_, S), f(_, S);
        }), a(h, v), ge.trigger("series:afterupdate", v, c, d);
      }, Kt = function(h) {
        h[Dl] = !0, h.getZr().wakeUp();
      }, Jc = function(h) {
        h[Dl] && (h.getZr().storage.traverse(function(v) {
          kn(v) || n(v);
        }), h[Dl] = !1);
      };
      function n(h) {
        for (var v = [], c = h.currentStates, p = 0; p < c.length; p++) {
          var d = c[p];
          d === "emphasis" || d === "blur" || d === "select" || v.push(d);
        }
        h.selected && h.states.select && v.push("select"), h.hoverState === as && h.states.emphasis ? v.push("emphasis") : h.hoverState === ns && h.states.blur && v.push("blur"), h.useStates(v);
      }
      function a(h, v) {
        var c = h._zr, p = c.storage, d = 0;
        p.traverse(function(g) {
          g.isGroup || d++;
        }), d > v.get("hoverLayerThreshold") && !U.node && !U.worker && v.eachSeries(function(g) {
          if (!g.preventUsingHoverLayer) {
            var y = h._chartsMap[g.__viewId];
            y.__alive && y.eachRendered(function(m) {
              m.states.emphasis && (m.states.emphasis.hoverLayer = !0);
            });
          }
        });
      }
      function o(h, v) {
        var c = h.get("blendMode") || null;
        v.eachRendered(function(p) {
          p.isGroup || (p.style.blend = c);
        });
      }
      function s(h, v) {
        if (!h.preventAutoZ) {
          var c = h.get("z") || 0, p = h.get("zlevel") || 0;
          v.eachRendered(function(d) {
            return l(d, c, p, -1 / 0), !0;
          });
        }
      }
      function l(h, v, c, p) {
        var d = h.getTextContent(), g = h.getTextGuideLine(), y = h.isGroup;
        if (y)
          for (var m = h.childrenRef(), _ = 0; _ < m.length; _++)
            p = Math.max(l(m[_], v, c, p), p);
        else
          h.z = v, h.zlevel = c, p = Math.max(h.z2, p);
        if (d && (d.z = v, d.zlevel = c, isFinite(p) && (d.z2 = p + 2)), g) {
          var S = h.textGuideLineConfig;
          g.z = v, g.zlevel = c, isFinite(p) && (g.z2 = p + (S && S.showAbove ? 1 : -1));
        }
        return p;
      }
      function u(h, v) {
        v.eachRendered(function(c) {
          if (!kn(c)) {
            var p = c.getTextContent(), d = c.getTextGuideLine();
            c.stateTransition && (c.stateTransition = null), p && p.stateTransition && (p.stateTransition = null), d && d.stateTransition && (d.stateTransition = null), c.hasState() ? (c.prevStates = c.currentStates, c.clearStates()) : c.prevStates && (c.prevStates = null);
          }
        });
      }
      function f(h, v) {
        var c = h.getModel("stateAnimation"), p = h.isAnimationEnabled(), d = c.get("duration"), g = d > 0 ? {
          duration: d,
          delay: c.get("delay"),
          easing: c.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        v.eachRendered(function(y) {
          if (y.states && y.states.emphasis) {
            if (kn(y))
              return;
            if (y instanceof nt && VS(y), y.__dirty) {
              var m = y.prevStates;
              m && y.useStates(m);
            }
            if (p) {
              y.stateTransition = g;
              var _ = y.getTextContent(), S = y.getTextGuideLine();
              _ && (_.stateTransition = g), S && (S.stateTransition = g);
            }
            y.__dirty && n(y);
          }
        });
      }
      Qc = function(h) {
        return new /** @class */
        ((function(v) {
          k(c, v);
          function c() {
            return v !== null && v.apply(this, arguments) || this;
          }
          return c.prototype.getCoordinateSystems = function() {
            return h._coordSysMgr.getCoordinateSystems();
          }, c.prototype.getComponentByElement = function(p) {
            for (; p; ) {
              var d = p.__ecComponentInfo;
              if (d != null)
                return h._model.getComponent(d.mainType, d.index);
              p = p.parent;
            }
          }, c.prototype.enterEmphasis = function(p, d) {
            Yn(p, d), Kt(h);
          }, c.prototype.leaveEmphasis = function(p, d) {
            Zn(p, d), Kt(h);
          }, c.prototype.enterBlur = function(p) {
            bg(p), Kt(h);
          }, c.prototype.leaveBlur = function(p) {
            Of(p), Kt(h);
          }, c.prototype.enterSelect = function(p) {
            xg(p), Kt(h);
          }, c.prototype.leaveSelect = function(p) {
            Tg(p), Kt(h);
          }, c.prototype.getModel = function() {
            return h.getModel();
          }, c.prototype.getViewOfComponentModel = function(p) {
            return h.getViewOfComponentModel(p);
          }, c.prototype.getViewOfSeriesModel = function(p) {
            return h.getViewOfSeriesModel(p);
          }, c;
        })(fy))(h);
      }, jy = function(h) {
        function v(c, p) {
          for (var d = 0; d < c.length; d++) {
            var g = c[d];
            g[Al] = p;
          }
        }
        M(Fn, function(c, p) {
          h._messageCenter.on(p, function(d) {
            if (jc[h.group] && h[Al] !== Xc) {
              if (d && d.escapeConnect)
                return;
              var g = h.makeActionFromEvent(d), y = [];
              M(zn, function(m) {
                m !== h && m.group === h.group && y.push(m);
              }), v(y, Xc), M(y, function(m) {
                m[Al] !== PT && m.dispatchAction(g);
              }), v(y, RT);
            }
          });
        });
      };
    })(), t;
  })(Se)
), oh = tm.prototype;
oh.on = $y("on");
oh.off = $y("off");
oh.one = function(r, t, e) {
  var i = this;
  function n() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    t && t.apply && t.apply(this, a), i.off(r, n);
  }
  this.on.call(this, r, n, e);
};
var ET = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
var Wo = {}, Fn = {}, Xu = [], $u = [], Uo = [], em = {}, qu = {}, zn = {}, jc = {}, kT = +/* @__PURE__ */ new Date() - 0, sh = "_echarts_instance_";
function OT(r, t, e) {
  var i = !(e && e.ssr);
  if (i) {
    var n = BT(r);
    if (n)
      return n;
  }
  var a = new tm(r, t, e);
  return a.id = "ec_" + kT++, zn[a.id] = a, i && sg(r, sh, a.id), jy(a), ge.trigger("afterinit", a), a;
}
function BT(r) {
  return zn[S1(r, sh)];
}
function rm(r, t) {
  em[r] = t;
}
function im(r) {
  rt($u, r) < 0 && $u.push(r);
}
function nm(r, t) {
  uh(Xu, r, t, xT);
}
function NT(r) {
  lh("afterinit", r);
}
function FT(r) {
  lh("afterupdate", r);
}
function lh(r, t) {
  ge.on(r, t);
}
function ii(r, t, e) {
  X(t) && (e = t, t = "");
  var i = G(r) ? r.type : [r, r = {
    event: t
  }][0];
  r.event = (r.event || i).toLowerCase(), t = r.event, !Fn[t] && (We(Zc.test(i) && Zc.test(t)), Wo[i] || (Wo[i] = {
    action: e,
    actionInfo: r
  }), Fn[t] = i);
}
function zT(r, t) {
  Kf.register(r, t);
}
function VT(r, t) {
  uh(Uo, r, t, Yy, "layout");
}
function ni(r, t) {
  uh(Uo, r, t, Zy, "visual");
}
var tp = [];
function uh(r, t, e, i, n) {
  if ((X(t) || G(t)) && (e = t, t = i), !(rt(tp, e) >= 0)) {
    tp.push(e);
    var a = Ry.wrapStageHandler(e, n);
    a.__prio = t, a.__raw = e, r.push(a);
  }
}
function am(r, t) {
  qu[r] = t;
}
function HT(r, t, e) {
  var i = mT("registerMap");
  i && i(r, t, e);
}
var GT = $b;
ni(ah, Cx);
ni(Ms, Mx);
ni(Ms, Dx);
ni(ah, Vx);
ni(Ms, Hx);
ni(Xy, gT);
im(vy);
nm(wT, Pb);
am("default", Ax);
ii({
  type: Yr,
  event: Yr,
  update: Yr
}, Rt);
ii({
  type: uo,
  event: uo,
  update: uo
}, Rt);
ii({
  type: Pn,
  event: Pn,
  update: Pn
}, Rt);
ii({
  type: fo,
  event: fo,
  update: fo
}, Rt);
ii({
  type: Rn,
  event: Rn,
  update: Rn
}, Rt);
rm("light", Fx);
rm("dark", By);
function hn(r) {
  return r == null ? 0 : r.length || 1;
}
function ep(r) {
  return r;
}
var WT = (
  /** @class */
  (function() {
    function r(t, e, i, n, a, o) {
      this._old = t, this._new = e, this._oldKeyGetter = i || ep, this._newKeyGetter = n || ep, this.context = a, this._diffModeMultiple = o === "multiple";
    }
    return r.prototype.add = function(t) {
      return this._add = t, this;
    }, r.prototype.update = function(t) {
      return this._update = t, this;
    }, r.prototype.updateManyToOne = function(t) {
      return this._updateManyToOne = t, this;
    }, r.prototype.updateOneToMany = function(t) {
      return this._updateOneToMany = t, this;
    }, r.prototype.updateManyToMany = function(t) {
      return this._updateManyToMany = t, this;
    }, r.prototype.remove = function(t) {
      return this._remove = t, this;
    }, r.prototype.execute = function() {
      this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
    }, r.prototype._executeOneToOne = function() {
      var t = this._old, e = this._new, i = {}, n = new Array(t.length), a = new Array(e.length);
      this._initIndexMap(t, null, n, "_oldKeyGetter"), this._initIndexMap(e, i, a, "_newKeyGetter");
      for (var o = 0; o < t.length; o++) {
        var s = n[o], l = i[s], u = hn(l);
        if (u > 1) {
          var f = l.shift();
          l.length === 1 && (i[s] = l[0]), this._update && this._update(f, o);
        } else u === 1 ? (i[s] = null, this._update && this._update(l, o)) : this._remove && this._remove(o);
      }
      this._performRestAdd(a, i);
    }, r.prototype._executeMultiple = function() {
      var t = this._old, e = this._new, i = {}, n = {}, a = [], o = [];
      this._initIndexMap(t, i, a, "_oldKeyGetter"), this._initIndexMap(e, n, o, "_newKeyGetter");
      for (var s = 0; s < a.length; s++) {
        var l = a[s], u = i[l], f = n[l], h = hn(u), v = hn(f);
        if (h > 1 && v === 1)
          this._updateManyToOne && this._updateManyToOne(f, u), n[l] = null;
        else if (h === 1 && v > 1)
          this._updateOneToMany && this._updateOneToMany(f, u), n[l] = null;
        else if (h === 1 && v === 1)
          this._update && this._update(f, u), n[l] = null;
        else if (h > 1 && v > 1)
          this._updateManyToMany && this._updateManyToMany(f, u), n[l] = null;
        else if (h > 1)
          for (var c = 0; c < h; c++)
            this._remove && this._remove(u[c]);
        else
          this._remove && this._remove(u);
      }
      this._performRestAdd(o, n);
    }, r.prototype._performRestAdd = function(t, e) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i], a = e[n], o = hn(a);
        if (o > 1)
          for (var s = 0; s < o; s++)
            this._add && this._add(a[s]);
        else o === 1 && this._add && this._add(a);
        e[n] = null;
      }
    }, r.prototype._initIndexMap = function(t, e, i, n) {
      for (var a = this._diffModeMultiple, o = 0; o < t.length; o++) {
        var s = "_ec_" + this[n](t[o], o);
        if (a || (i[o] = s), !!e) {
          var l = e[s], u = hn(l);
          u === 0 ? (e[s] = o, a && i.push(s)) : u === 1 ? e[s] = [l, o] : l.push(o);
        }
      }
    }, r;
  })()
), UT = (
  /** @class */
  (function() {
    function r(t, e) {
      this._encode = t, this._schema = e;
    }
    return r.prototype.get = function() {
      return {
        // Do not generate full dimension name until fist used.
        fullDimensions: this._getFullDimensionNames(),
        encode: this._encode
      };
    }, r.prototype._getFullDimensionNames = function() {
      return this._cachedDimNames || (this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : []), this._cachedDimNames;
    }, r;
  })()
);
function YT(r, t) {
  var e = {}, i = e.encode = {}, n = Y(), a = [], o = [], s = {};
  M(r.dimensions, function(v) {
    var c = r.getDimensionInfo(v), p = c.coordDim;
    if (p) {
      var d = c.coordDimIndex;
      kl(i, p)[d] = v, c.isExtraCoord || (n.set(p, 1), XT(c.type) && (a[0] = v), kl(s, p)[d] = r.getDimensionIndex(c.name)), c.defaultTooltip && o.push(v);
    }
    ay.each(function(g, y) {
      var m = kl(i, y), _ = c.otherDims[y];
      _ != null && _ !== !1 && (m[_] = c.name);
    });
  });
  var l = [], u = {};
  n.each(function(v, c) {
    var p = i[c];
    u[c] = p[0], l = l.concat(p);
  }), e.dataDimsOnCoord = l, e.dataDimIndicesOnCoord = V(l, function(v) {
    return r.getDimensionInfo(v).storeDimIndex;
  }), e.encodeFirstDimNotExtra = u;
  var f = i.label;
  f && f.length && (a = f.slice());
  var h = i.tooltip;
  return h && h.length ? o = h.slice() : o.length || (o = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = o, e.userOutput = new UT(s, t), e;
}
function kl(r, t) {
  return r.hasOwnProperty(t) || (r[t] = []), r[t];
}
function ZT(r) {
  return r === "category" ? "ordinal" : r === "time" ? "time" : "float";
}
function XT(r) {
  return !(r === "ordinal" || r === "time");
}
var co = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r(t) {
      this.otherDims = {}, t != null && O(this, t);
    }
    return r;
  })()
), $T = pt(), qT = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
}, om = (
  /** @class */
  (function() {
    function r(t) {
      this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
    }
    return r.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    }, r.prototype._updateDimOmitted = function(t) {
      this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = um(this.source)));
    }, r.prototype.getSourceDimensionIndex = function(t) {
      return q(this._dimNameMap.get(t), -1);
    }, r.prototype.getSourceDimension = function(t) {
      var e = this.source.dimensionsDefine;
      if (e)
        return e[t];
    }, r.prototype.makeStoreSchema = function() {
      for (var t = this._fullDimCount, e = dy(this.source), i = !fm(t), n = "", a = [], o = 0, s = 0; o < t; o++) {
        var l = void 0, u = void 0, f = void 0, h = this.dimensions[s];
        if (h && h.storeDimIndex === o)
          l = e ? h.name : null, u = h.type, f = h.ordinalMeta, s++;
        else {
          var v = this.getSourceDimension(o);
          v && (l = e ? v.name : null, u = v.type);
        }
        a.push({
          property: l,
          type: u,
          ordinalMeta: f
        }), e && l != null && (!h || !h.isCalculationCoord) && (n += i ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l), n += "$", n += qT[u] || "f", f && (n += f.uid), n += "$";
      }
      var c = this.source, p = [c.seriesLayoutBy, c.startIndex, n].join("$$");
      return {
        dimensions: a,
        hash: p
      };
    }, r.prototype.makeOutputDimensionNames = function() {
      for (var t = [], e = 0, i = 0; e < this._fullDimCount; e++) {
        var n = void 0, a = this.dimensions[i];
        if (a && a.storeDimIndex === e)
          a.isCalculationCoord || (n = a.name), i++;
        else {
          var o = this.getSourceDimension(e);
          o && (n = o.name);
        }
        t.push(n);
      }
      return t;
    }, r.prototype.appendCalculationDimension = function(t) {
      this.dimensions.push(t), t.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
    }, r;
  })()
);
function sm(r) {
  return r instanceof om;
}
function lm(r) {
  for (var t = Y(), e = 0; e < (r || []).length; e++) {
    var i = r[e], n = G(i) ? i.name : i;
    n != null && t.get(n) == null && t.set(n, e);
  }
  return t;
}
function um(r) {
  var t = $T(r);
  return t.dimNameMap || (t.dimNameMap = lm(r.dimensionsDefine));
}
function fm(r) {
  return r > 30;
}
var vn = G, je = V, KT = typeof Int32Array > "u" ? Array : Int32Array, QT = "e\0\0", rp = -1, JT = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"], jT = ["_approximateExtent"], ip, Ha, cn, pn, Ol, dn, Bl, Bi = (
  /** @class */
  (function() {
    function r(t, e) {
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "minmaxDownSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "minmaxDownSample", "lttbDownSample"];
      var i, n = !1;
      sm(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (n = !0, i = t), i = i || ["x", "y"];
      for (var a = {}, o = [], s = {}, l = !1, u = {}, f = 0; f < i.length; f++) {
        var h = i[f], v = z(h) ? new co({
          name: h
        }) : h instanceof co ? h : new co(h), c = v.name;
        v.type = v.type || "float", v.coordDim || (v.coordDim = c, v.coordDimIndex = 0);
        var p = v.otherDims = v.otherDims || {};
        o.push(c), a[c] = v, u[c] != null && (l = !0), v.createInvertedIndices && (s[c] = []), p.itemName === 0 && (this._nameDimIdx = f), p.itemId === 0 && (this._idDimIdx = f), n && (v.storeDimIndex = f);
      }
      if (this.dimensions = o, this._dimInfos = a, this._initGetDimensionInfo(l), this.hostModel = e, this._invertedIndicesMap = s, this._dimOmitted) {
        var d = this._dimIdxToName = Y();
        M(o, function(g) {
          d.set(a[g].storeDimIndex, g);
        });
      }
    }
    return r.prototype.getDimension = function(t) {
      var e = this._recognizeDimIndex(t);
      if (e == null)
        return t;
      if (e = t, !this._dimOmitted)
        return this.dimensions[e];
      var i = this._dimIdxToName.get(e);
      if (i != null)
        return i;
      var n = this._schema.getSourceDimension(e);
      if (n)
        return n.name;
    }, r.prototype.getDimensionIndex = function(t) {
      var e = this._recognizeDimIndex(t);
      if (e != null)
        return e;
      if (t == null)
        return -1;
      var i = this._getDimInfo(t);
      return i ? i.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(t) : -1;
    }, r.prototype._recognizeDimIndex = function(t) {
      if (ht(t) || t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
        return +t;
    }, r.prototype._getStoreDimIndex = function(t) {
      var e = this.getDimensionIndex(t);
      return e;
    }, r.prototype.getDimensionInfo = function(t) {
      return this._getDimInfo(this.getDimension(t));
    }, r.prototype._initGetDimensionInfo = function(t) {
      var e = this._dimInfos;
      this._getDimInfo = t ? function(i) {
        return e.hasOwnProperty(i) ? e[i] : void 0;
      } : function(i) {
        return e[i];
      };
    }, r.prototype.getDimensionsOnCoord = function() {
      return this._dimSummary.dataDimsOnCoord.slice();
    }, r.prototype.mapDimension = function(t, e) {
      var i = this._dimSummary;
      if (e == null)
        return i.encodeFirstDimNotExtra[t];
      var n = i.encode[t];
      return n ? n[e] : null;
    }, r.prototype.mapDimensionsAll = function(t) {
      var e = this._dimSummary, i = e.encode[t];
      return (i || []).slice();
    }, r.prototype.getStore = function() {
      return this._store;
    }, r.prototype.initData = function(t, e, i) {
      var n = this, a;
      if (t instanceof zu && (a = t), !a) {
        var o = this.dimensions, s = Qf(t) || Wt(t) ? new gy(t, o.length) : t;
        a = new zu();
        var l = je(o, function(u) {
          return {
            type: n._dimInfos[u].type,
            property: u
          };
        });
        a.initData(s, l, i);
      }
      this._store = a, this._nameList = (e || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, a.count()), this._dimSummary = YT(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, r.prototype.appendData = function(t) {
      var e = this._store.appendData(t);
      this._doInit(e[0], e[1]);
    }, r.prototype.appendValues = function(t, e) {
      var i = this._store.appendValues(t, e && e.length), n = i.start, a = i.end, o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), e)
        for (var s = n; s < a; s++) {
          var l = s - n;
          this._nameList[s] = e[l], o && Bl(this, s);
        }
    }, r.prototype._updateOrdinalMeta = function() {
      for (var t = this._store, e = this.dimensions, i = 0; i < e.length; i++) {
        var n = this._dimInfos[e[i]];
        n.ordinalMeta && t.collectOrdinalMeta(n.storeDimIndex, n.ordinalMeta);
      }
    }, r.prototype._shouldMakeIdFromName = function() {
      var t = this._store.getProvider();
      return this._idDimIdx == null && t.getSource().sourceFormat !== fr && !t.fillStorage;
    }, r.prototype._doInit = function(t, e) {
      if (!(t >= e)) {
        var i = this._store, n = i.getProvider();
        this._updateOrdinalMeta();
        var a = this._nameList, o = this._idList, s = n.getSource().sourceFormat, l = s === fe;
        if (l && !n.pure)
          for (var u = [], f = t; f < e; f++) {
            var h = n.getItem(f, u);
            if (!this.hasItemOption && l1(h) && (this.hasItemOption = !0), h) {
              var v = h.name;
              a[f] == null && v != null && (a[f] = Re(v, null));
              var c = h.id;
              o[f] == null && c != null && (o[f] = Re(c, null));
            }
          }
        if (this._shouldMakeIdFromName())
          for (var f = t; f < e; f++)
            Bl(this, f);
        ip(this);
      }
    }, r.prototype.getApproximateExtent = function(t) {
      return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
    }, r.prototype.setApproximateExtent = function(t, e) {
      e = this.getDimension(e), this._approximateExtent[e] = t.slice();
    }, r.prototype.getCalculationInfo = function(t) {
      return this._calculationInfo[t];
    }, r.prototype.setCalculationInfo = function(t, e) {
      vn(t) ? O(this._calculationInfo, t) : this._calculationInfo[t] = e;
    }, r.prototype.getName = function(t) {
      var e = this.getRawIndex(t), i = this._nameList[e];
      return i == null && this._nameDimIdx != null && (i = cn(this, this._nameDimIdx, e)), i == null && (i = ""), i;
    }, r.prototype._getCategory = function(t, e) {
      var i = this._store.get(t, e), n = this._store.getOrdinalMeta(t);
      return n ? n.categories[i] : i;
    }, r.prototype.getId = function(t) {
      return Ha(this, this.getRawIndex(t));
    }, r.prototype.count = function() {
      return this._store.count();
    }, r.prototype.get = function(t, e) {
      var i = this._store, n = this._dimInfos[t];
      if (n)
        return i.get(n.storeDimIndex, e);
    }, r.prototype.getByRawIndex = function(t, e) {
      var i = this._store, n = this._dimInfos[t];
      if (n)
        return i.getByRawIndex(n.storeDimIndex, e);
    }, r.prototype.getIndices = function() {
      return this._store.getIndices();
    }, r.prototype.getDataExtent = function(t) {
      return this._store.getDataExtent(this._getStoreDimIndex(t));
    }, r.prototype.getSum = function(t) {
      return this._store.getSum(this._getStoreDimIndex(t));
    }, r.prototype.getMedian = function(t) {
      return this._store.getMedian(this._getStoreDimIndex(t));
    }, r.prototype.getValues = function(t, e) {
      var i = this, n = this._store;
      return N(t) ? n.getValues(je(t, function(a) {
        return i._getStoreDimIndex(a);
      }), e) : n.getValues(t);
    }, r.prototype.hasValue = function(t) {
      for (var e = this._dimSummary.dataDimIndicesOnCoord, i = 0, n = e.length; i < n; i++)
        if (isNaN(this._store.get(e[i], t)))
          return !1;
      return !0;
    }, r.prototype.indexOfName = function(t) {
      for (var e = 0, i = this._store.count(); e < i; e++)
        if (this.getName(e) === t)
          return e;
      return -1;
    }, r.prototype.getRawIndex = function(t) {
      return this._store.getRawIndex(t);
    }, r.prototype.indexOfRawIndex = function(t) {
      return this._store.indexOfRawIndex(t);
    }, r.prototype.rawIndexOf = function(t, e) {
      var i = t && this._invertedIndicesMap[t], n = i && i[e];
      return n == null || isNaN(n) ? rp : n;
    }, r.prototype.indicesOfNearest = function(t, e, i) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(t), e, i);
    }, r.prototype.each = function(t, e, i) {
      X(t) && (i = e, e = t, t = []);
      var n = i || this, a = je(pn(t), this._getStoreDimIndex, this);
      this._store.each(a, n ? Z(e, n) : e);
    }, r.prototype.filterSelf = function(t, e, i) {
      X(t) && (i = e, e = t, t = []);
      var n = i || this, a = je(pn(t), this._getStoreDimIndex, this);
      return this._store = this._store.filter(a, n ? Z(e, n) : e), this;
    }, r.prototype.selectRange = function(t) {
      var e = this, i = {}, n = ct(t);
      return M(n, function(a) {
        var o = e._getStoreDimIndex(a);
        i[o] = t[a];
      }), this._store = this._store.selectRange(i), this;
    }, r.prototype.mapArray = function(t, e, i) {
      X(t) && (i = e, e = t, t = []), i = i || this;
      var n = [];
      return this.each(t, function() {
        n.push(e && e.apply(this, arguments));
      }, i), n;
    }, r.prototype.map = function(t, e, i, n) {
      var a = i || n || this, o = je(pn(t), this._getStoreDimIndex, this), s = dn(this);
      return s._store = this._store.map(o, a ? Z(e, a) : e), s;
    }, r.prototype.modify = function(t, e, i, n) {
      var a = i || n || this, o = je(pn(t), this._getStoreDimIndex, this);
      this._store.modify(o, a ? Z(e, a) : e);
    }, r.prototype.downSample = function(t, e, i, n) {
      var a = dn(this);
      return a._store = this._store.downSample(this._getStoreDimIndex(t), e, i, n), a;
    }, r.prototype.minmaxDownSample = function(t, e) {
      var i = dn(this);
      return i._store = this._store.minmaxDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.lttbDownSample = function(t, e) {
      var i = dn(this);
      return i._store = this._store.lttbDownSample(this._getStoreDimIndex(t), e), i;
    }, r.prototype.getRawDataItem = function(t) {
      return this._store.getRawDataItem(t);
    }, r.prototype.getItemModel = function(t) {
      var e = this.hostModel, i = this.getRawDataItem(t);
      return new mt(i, e, e && e.ecModel);
    }, r.prototype.diff = function(t) {
      var e = this;
      return new WT(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(i) {
        return Ha(t, i);
      }, function(i) {
        return Ha(e, i);
      });
    }, r.prototype.getVisual = function(t) {
      var e = this._visual;
      return e && e[t];
    }, r.prototype.setVisual = function(t, e) {
      this._visual = this._visual || {}, vn(t) ? O(this._visual, t) : this._visual[t] = e;
    }, r.prototype.getItemVisual = function(t, e) {
      var i = this._itemVisuals[t], n = i && i[e];
      return n ?? this.getVisual(e);
    }, r.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    }, r.prototype.ensureUniqueItemVisual = function(t, e) {
      var i = this._itemVisuals, n = i[t];
      n || (n = i[t] = {});
      var a = n[e];
      return a == null && (a = this.getVisual(e), N(a) ? a = a.slice() : vn(a) && (a = O({}, a)), n[e] = a), a;
    }, r.prototype.setItemVisual = function(t, e, i) {
      var n = this._itemVisuals[t] || {};
      this._itemVisuals[t] = n, vn(e) ? O(n, e) : n[e] = i;
    }, r.prototype.clearAllVisual = function() {
      this._visual = {}, this._itemVisuals = [];
    }, r.prototype.setLayout = function(t, e) {
      vn(t) ? O(this._layout, t) : this._layout[t] = e;
    }, r.prototype.getLayout = function(t) {
      return this._layout[t];
    }, r.prototype.getItemLayout = function(t) {
      return this._itemLayouts[t];
    }, r.prototype.setItemLayout = function(t, e, i) {
      this._itemLayouts[t] = i ? O(this._itemLayouts[t] || {}, e) : e;
    }, r.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    }, r.prototype.setItemGraphicEl = function(t, e) {
      var i = this.hostModel && this.hostModel.seriesIndex;
      wS(i, this.dataType, t, e), this._graphicEls[t] = e;
    }, r.prototype.getItemGraphicEl = function(t) {
      return this._graphicEls[t];
    }, r.prototype.eachItemGraphicEl = function(t, e) {
      M(this._graphicEls, function(i, n) {
        i && t && t.call(e, i, n);
      });
    }, r.prototype.cloneShallow = function(t) {
      return t || (t = new r(this._schema ? this._schema : je(this.dimensions, this._getDimInfo, this), this.hostModel)), Ol(t, this), t._store = this._store, t;
    }, r.prototype.wrapMethod = function(t, e) {
      var i = this[t];
      X(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
        var n = i.apply(this, arguments);
        return e.apply(this, [n].concat(mf(arguments)));
      });
    }, r.internalField = (function() {
      ip = function(t) {
        var e = t._invertedIndicesMap;
        M(e, function(i, n) {
          var a = t._dimInfos[n], o = a.ordinalMeta, s = t._store;
          if (o) {
            i = e[n] = new KT(o.categories.length);
            for (var l = 0; l < i.length; l++)
              i[l] = rp;
            for (var l = 0; l < s.count(); l++)
              i[s.get(a.storeDimIndex, l)] = l;
          }
        });
      }, cn = function(t, e, i) {
        return Re(t._getCategory(e, i), null);
      }, Ha = function(t, e) {
        var i = t._idList[e];
        return i == null && t._idDimIdx != null && (i = cn(t, t._idDimIdx, e)), i == null && (i = QT + e), i;
      }, pn = function(t) {
        return N(t) || (t = t != null ? [t] : []), t;
      }, dn = function(t) {
        var e = new r(t._schema ? t._schema : je(t.dimensions, t._getDimInfo, t), t.hostModel);
        return Ol(e, t), e;
      }, Ol = function(t, e) {
        M(JT.concat(e.__wrappedMethods || []), function(i) {
          e.hasOwnProperty(i) && (t[i] = e[i]);
        }), t.__wrappedMethods = e.__wrappedMethods, M(jT, function(i) {
          t[i] = Q(e[i]);
        }), t._calculationInfo = O({}, e._calculationInfo);
      }, Bl = function(t, e) {
        var i = t._nameList, n = t._idList, a = t._nameDimIdx, o = t._idDimIdx, s = i[e], l = n[e];
        if (s == null && a != null && (i[e] = s = cn(t, a, e)), l == null && o != null && (n[e] = l = cn(t, o, e)), l == null && s != null) {
          var u = t._nameRepeatCount, f = u[s] = (u[s] || 0) + 1;
          l = s, f > 1 && (l += "__ec__" + f), n[e] = l;
        }
      };
    })(), r;
  })()
);
function tC(r, t) {
  Qf(r) || (r = cy(r)), t = t || {};
  var e = t.coordDimensions || [], i = t.dimensionsDefine || r.dimensionsDefine || [], n = Y(), a = [], o = rC(r, e, i, t.dimensionsCount), s = t.canOmitUnusedDimensions && fm(o), l = i === r.dimensionsDefine, u = l ? um(r) : lm(i), f = t.encodeDefine;
  !f && t.encodeDefaulter && (f = t.encodeDefaulter(r, o));
  for (var h = Y(f), v = new wy(o), c = 0; c < v.length; c++)
    v[c] = -1;
  function p(D) {
    var A = v[D];
    if (A < 0) {
      var T = i[D], L = G(T) ? T : {
        name: T
      }, I = new co(), P = L.name;
      P != null && u.get(P) != null && (I.name = I.displayName = P), L.type != null && (I.type = L.type), L.displayName != null && (I.displayName = L.displayName);
      var R = a.length;
      return v[D] = R, I.storeDimIndex = D, a.push(I), I;
    }
    return a[A];
  }
  if (!s)
    for (var c = 0; c < o; c++)
      p(c);
  h.each(function(D, A) {
    var T = Et(D).slice();
    if (T.length === 1 && !z(T[0]) && T[0] < 0) {
      h.set(A, !1);
      return;
    }
    var L = h.set(A, []);
    M(T, function(I, P) {
      var R = z(I) ? u.get(I) : I;
      R != null && R < o && (L[P] = R, g(p(R), A, P));
    });
  });
  var d = 0;
  M(e, function(D) {
    var A, T, L, I;
    if (z(D))
      A = D, I = {};
    else {
      I = D, A = I.name;
      var P = I.ordinalMeta;
      I.ordinalMeta = null, I = O({}, I), I.ordinalMeta = P, T = I.dimsDef, L = I.otherDims, I.name = I.coordDim = I.coordDimIndex = I.dimsDef = I.otherDims = null;
    }
    var R = h.get(A);
    if (R !== !1) {
      if (R = Et(R), !R.length)
        for (var E = 0; E < (T && T.length || 1); E++) {
          for (; d < o && p(d).coordDim != null; )
            d++;
          d < o && R.push(d++);
        }
      M(R, function(H, B) {
        var F = p(H);
        if (l && I.type != null && (F.type = I.type), g(st(F, I), A, B), F.name == null && T) {
          var W = T[B];
          !G(W) && (W = {
            name: W
          }), F.name = F.displayName = W.name, F.defaultTooltip = W.defaultTooltip;
        }
        L && st(F.otherDims, L);
      });
    }
  });
  function g(D, A, T) {
    ay.get(A) != null ? D.otherDims[A] = T : (D.coordDim = A, D.coordDimIndex = T, n.set(A, !0));
  }
  var y = t.generateCoord, m = t.generateCoordCount, _ = m != null;
  m = y ? m || 1 : 0;
  var S = y || "value";
  function b(D) {
    D.name == null && (D.name = D.coordDim);
  }
  if (s)
    M(a, function(D) {
      b(D);
    }), a.sort(function(D, A) {
      return D.storeDimIndex - A.storeDimIndex;
    });
  else
    for (var w = 0; w < o; w++) {
      var x = p(w), C = x.coordDim;
      C == null && (x.coordDim = iC(S, n, _), x.coordDimIndex = 0, (!y || m <= 0) && (x.isExtraCoord = !0), m--), b(x), x.type == null && (uy(r, w) === Xt.Must || x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return eC(a), new om({
    source: r,
    dimensions: a,
    fullDimensionCount: o,
    dimensionOmitted: s
  });
}
function eC(r) {
  for (var t = Y(), e = 0; e < r.length; e++) {
    var i = r[e], n = i.name, a = t.get(n) || 0;
    a > 0 && (i.name = n + (a - 1)), a++, t.set(n, a);
  }
}
function rC(r, t, e, i) {
  var n = Math.max(r.dimensionsDetectedCount || 1, t.length, e.length, i || 0);
  return M(t, function(a) {
    var o;
    G(a) && (o = a.dimsDef) && (n = Math.max(n, o.length));
  }), n;
}
function iC(r, t, e) {
  if (e || t.hasKey(r)) {
    for (var i = 0; t.hasKey(r + i); )
      i++;
    r += i;
  }
  return t.set(r, !0), r;
}
var nC = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r(t) {
      this.coordSysDims = [], this.axisMap = Y(), this.categoryAxisMap = Y(), this.coordSysName = t;
    }
    return r;
  })()
);
function aC(r) {
  var t = r.get("coordinateSystem"), e = new nC(t), i = oC[t];
  if (i)
    return i(r, e, e.axisMap, e.categoryAxisMap), e;
}
var oC = {
  cartesian2d: function(r, t, e, i) {
    var n = r.getReferringComponents("xAxis", Gt).models[0], a = r.getReferringComponents("yAxis", Gt).models[0];
    t.coordSysDims = ["x", "y"], e.set("x", n), e.set("y", a), _i(n) && (i.set("x", n), t.firstCategoryDimIndex = 0), _i(a) && (i.set("y", a), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  singleAxis: function(r, t, e, i) {
    var n = r.getReferringComponents("singleAxis", Gt).models[0];
    t.coordSysDims = ["single"], e.set("single", n), _i(n) && (i.set("single", n), t.firstCategoryDimIndex = 0);
  },
  polar: function(r, t, e, i) {
    var n = r.getReferringComponents("polar", Gt).models[0], a = n.findAxisModel("radiusAxis"), o = n.findAxisModel("angleAxis");
    t.coordSysDims = ["radius", "angle"], e.set("radius", a), e.set("angle", o), _i(a) && (i.set("radius", a), t.firstCategoryDimIndex = 0), _i(o) && (i.set("angle", o), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  },
  geo: function(r, t, e, i) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function(r, t, e, i) {
    var n = r.ecModel, a = n.getComponent("parallel", r.get("parallelIndex")), o = t.coordSysDims = a.dimensions.slice();
    M(a.parallelAxisIndex, function(s, l) {
      var u = n.getComponent("parallelAxis", s), f = o[l];
      e.set(f, u), _i(u) && (i.set(f, u), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = l));
    });
  }
};
function _i(r) {
  return r.get("type") === "category";
}
function sC(r, t, e) {
  e = e || {};
  var i = e.byIndex, n = e.stackedCoordDimension, a, o, s;
  lC(t) ? a = t : (o = t.schema, a = o.dimensions, s = t.store);
  var l = !!(r && r.get("stack")), u, f, h, v;
  if (M(a, function(m, _) {
    z(m) && (a[_] = m = {
      name: m
    }), l && !m.isExtraCoord && (!i && !u && m.ordinalMeta && (u = m), !f && m.type !== "ordinal" && m.type !== "time" && (!n || n === m.coordDim) && (f = m));
  }), f && !i && !u && (i = !0), f) {
    h = "__\0ecstackresult_" + r.id, v = "__\0ecstackedover_" + r.id, u && (u.createInvertedIndices = !0);
    var c = f.coordDim, p = f.type, d = 0;
    M(a, function(m) {
      m.coordDim === c && d++;
    });
    var g = {
      name: h,
      coordDim: c,
      coordDimIndex: d,
      type: p,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length
    }, y = {
      name: v,
      // This dimension contains stack base (generally, 0), so do not set it as
      // `stackedDimCoordDim` to avoid extent calculation, consider log scale.
      coordDim: v,
      coordDimIndex: d + 1,
      type: p,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: a.length + 1
    };
    o ? (s && (g.storeDimIndex = s.ensureCalculationDimension(v, p), y.storeDimIndex = s.ensureCalculationDimension(h, p)), o.appendCalculationDimension(g), o.appendCalculationDimension(y)) : (a.push(g), a.push(y));
  }
  return {
    stackedDimension: f && f.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: i,
    stackedOverDimension: v,
    stackResultDimension: h
  };
}
function lC(r) {
  return !sm(r.schema);
}
function ti(r, t) {
  return !!t && t === r.getCalculationInfo("stackedDimension");
}
function hm(r, t) {
  return ti(r, t) ? r.getCalculationInfo("stackResultDimension") : t;
}
function uC(r, t) {
  var e = r.get("coordinateSystem"), i = Kf.get(e), n;
  return t && t.coordSysDims && (n = V(t.coordSysDims, function(a) {
    var o = {
      name: a
    }, s = t.axisMap.get(a);
    if (s) {
      var l = s.get("type");
      o.type = ZT(l);
    }
    return o;
  })), n || (n = i && (i.getDimensionsInfo ? i.getDimensionsInfo() : i.dimensions.slice()) || ["x", "y"]), n;
}
function fC(r, t, e) {
  var i, n;
  return e && M(r, function(a, o) {
    var s = a.coordDim, l = e.categoryAxisMap.get(s);
    l && (i == null && (i = o), a.ordinalMeta = l.getOrdinalMeta(), t && (a.createInvertedIndices = !0)), a.otherDims.itemName != null && (n = !0);
  }), !n && i != null && (r[i].otherDims.itemName = 0), i;
}
function Ds(r, t, e) {
  e = e || {};
  var i = t.getSourceManager(), n, a = !1;
  n = i.getSource(), a = n.sourceFormat === fe;
  var o = aC(t), s = uC(t, o), l = e.useEncodeDefaulter, u = X(l) ? l : l ? lt(ob, s, t) : null, f = {
    coordDimensions: s,
    generateCoord: e.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: u,
    canOmitUnusedDimensions: !a
  }, h = tC(n, f), v = fC(h.dimensions, e.createInvertedIndices, o), c = a ? null : i.getSharedDataStore(h), p = sC(t, {
    schema: h,
    store: c
  }), d = new Bi(h, t);
  d.setCalculationInfo(p);
  var g = v != null && hC(n) ? function(y, m, _, S) {
    return S === v ? _ : this.defaultDimValueGetter(y, m, _, S);
  } : null;
  return d.hasItemOption = !1, d.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    a ? n : c,
    null,
    g
  ), d;
}
function hC(r) {
  if (r.sourceFormat === fe) {
    var t = vC(r.data || []);
    return !N(oa(t));
  }
}
function vC(r) {
  for (var t = 0; t < r.length && r[t] == null; )
    t++;
  return r[t];
}
var Be = (
  /** @class */
  (function() {
    function r(t) {
      this._setting = t || {}, this._extent = [1 / 0, -1 / 0];
    }
    return r.prototype.getSetting = function(t) {
      return this._setting[t];
    }, r.prototype.unionExtent = function(t) {
      var e = this._extent;
      t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);
    }, r.prototype.unionExtentFromData = function(t, e) {
      this.unionExtent(t.getApproximateExtent(e));
    }, r.prototype.getExtent = function() {
      return this._extent.slice();
    }, r.prototype.setExtent = function(t, e) {
      var i = this._extent;
      isNaN(t) || (i[0] = t), isNaN(e) || (i[1] = e);
    }, r.prototype.isInExtentRange = function(t) {
      return this._extent[0] <= t && this._extent[1] >= t;
    }, r.prototype.isBlank = function() {
      return this._isBlank;
    }, r.prototype.setBlank = function(t) {
      this._isBlank = t;
    }, r;
  })()
);
es(Be);
var cC = 0, Ku = (
  /** @class */
  (function() {
    function r(t) {
      this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++cC;
    }
    return r.createByAxisModel = function(t) {
      var e = t.option, i = e.data, n = i && V(i, pC);
      return new r({
        categories: n,
        needCollect: !n,
        // deduplication is default in axis.
        deduplication: e.dedplication !== !1
      });
    }, r.prototype.getOrdinal = function(t) {
      return this._getOrCreateMap().get(t);
    }, r.prototype.parseAndCollect = function(t) {
      var e, i = this._needCollect;
      if (!z(t) && !i)
        return t;
      if (i && !this._deduplication)
        return e = this.categories.length, this.categories[e] = t, e;
      var n = this._getOrCreateMap();
      return e = n.get(t), e == null && (i ? (e = this.categories.length, this.categories[e] = t, n.set(t, e)) : e = NaN), e;
    }, r.prototype._getOrCreateMap = function() {
      return this._map || (this._map = Y(this.categories));
    }, r;
  })()
);
function pC(r) {
  return G(r) && r.value != null ? r.value : r + "";
}
function Qu(r) {
  return r.type === "interval" || r.type === "log";
}
function dC(r, t, e, i) {
  var n = {}, a = r[1] - r[0], o = n.interval = rg(a / t);
  e != null && o < e && (o = n.interval = e), i != null && o > i && (o = n.interval = i);
  var s = n.intervalPrecision = vm(o), l = n.niceTickExtent = [wt(Math.ceil(r[0] / o) * o, s), wt(Math.floor(r[1] / o) * o, s)];
  return gC(l, r), n;
}
function Nl(r) {
  var t = Math.pow(10, Af(r)), e = r / t;
  return e ? e === 2 ? e = 3 : e === 3 ? e = 5 : e *= 2 : e = 1, wt(e * t);
}
function vm(r) {
  return Le(r) + 2;
}
function np(r, t, e) {
  r[t] = Math.max(Math.min(r[t], e[1]), e[0]);
}
function gC(r, t) {
  !isFinite(r[0]) && (r[0] = t[0]), !isFinite(r[1]) && (r[1] = t[1]), np(r, 0, t), np(r, 1, t), r[0] > r[1] && (r[0] = r[1]);
}
function As(r, t) {
  return r >= t[0] && r <= t[1];
}
function Ls(r, t) {
  return t[1] === t[0] ? 0.5 : (r - t[0]) / (t[1] - t[0]);
}
function Is(r, t) {
  return r * (t[1] - t[0]) + t[0];
}
var fh = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      i.type = "ordinal";
      var n = i.getSetting("ordinalMeta");
      return n || (n = new Ku({})), N(n) && (n = new Ku({
        categories: V(n, function(a) {
          return G(a) ? a.value : a;
        })
      })), i._ordinalMeta = n, i._extent = i.getSetting("extent") || [0, n.categories.length - 1], i;
    }
    return t.prototype.parse = function(e) {
      return e == null ? NaN : z(e) ? this._ordinalMeta.getOrdinal(e) : Math.round(e);
    }, t.prototype.contain = function(e) {
      return e = this.parse(e), As(e, this._extent) && this._ordinalMeta.categories[e] != null;
    }, t.prototype.normalize = function(e) {
      return e = this._getTickNumber(this.parse(e)), Ls(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = Math.round(Is(e, this._extent)), this.getRawOrdinalNumber(e);
    }, t.prototype.getTicks = function() {
      for (var e = [], i = this._extent, n = i[0]; n <= i[1]; )
        e.push({
          value: n
        }), n++;
      return e;
    }, t.prototype.getMinorTicks = function(e) {
    }, t.prototype.setSortInfo = function(e) {
      if (e == null) {
        this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
        return;
      }
      for (var i = e.ordinalNumbers, n = this._ordinalNumbersByTick = [], a = this._ticksByOrdinalNumber = [], o = 0, s = this._ordinalMeta.categories.length, l = Math.min(s, i.length); o < l; ++o) {
        var u = i[o];
        n[o] = u, a[u] = o;
      }
      for (var f = 0; o < s; ++o) {
        for (; a[f] != null; )
          f++;
        n.push(f), a[f] = o;
      }
    }, t.prototype._getTickNumber = function(e) {
      var i = this._ticksByOrdinalNumber;
      return i && e >= 0 && e < i.length ? i[e] : e;
    }, t.prototype.getRawOrdinalNumber = function(e) {
      var i = this._ordinalNumbersByTick;
      return i && e >= 0 && e < i.length ? i[e] : e;
    }, t.prototype.getLabel = function(e) {
      if (!this.isBlank()) {
        var i = this.getRawOrdinalNumber(e.value), n = this._ordinalMeta.categories[i];
        return n == null ? "" : n + "";
      }
    }, t.prototype.count = function() {
      return this._extent[1] - this._extent[0] + 1;
    }, t.prototype.unionExtentFromData = function(e, i) {
      this.unionExtent(e.getApproximateExtent(i));
    }, t.prototype.isInExtentRange = function(e) {
      return e = this._getTickNumber(e), this._extent[0] <= e && this._extent[1] >= e;
    }, t.prototype.getOrdinalMeta = function() {
      return this._ordinalMeta;
    }, t.prototype.calcNiceTicks = function() {
    }, t.prototype.calcNiceExtent = function() {
    }, t.type = "ordinal", t;
  })(Be)
);
Be.registerClass(fh);
var Nr = wt, $i = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "interval", e._interval = 0, e._intervalPrecision = 2, e;
    }
    return t.prototype.parse = function(e) {
      return e;
    }, t.prototype.contain = function(e) {
      return As(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return Ls(e, this._extent);
    }, t.prototype.scale = function(e) {
      return Is(e, this._extent);
    }, t.prototype.setExtent = function(e, i) {
      var n = this._extent;
      isNaN(e) || (n[0] = parseFloat(e)), isNaN(i) || (n[1] = parseFloat(i));
    }, t.prototype.unionExtent = function(e) {
      var i = this._extent;
      e[0] < i[0] && (i[0] = e[0]), e[1] > i[1] && (i[1] = e[1]), this.setExtent(i[0], i[1]);
    }, t.prototype.getInterval = function() {
      return this._interval;
    }, t.prototype.setInterval = function(e) {
      this._interval = e, this._niceExtent = this._extent.slice(), this._intervalPrecision = vm(e);
    }, t.prototype.getTicks = function(e) {
      var i = this._interval, n = this._extent, a = this._niceExtent, o = this._intervalPrecision, s = [];
      if (!i)
        return s;
      var l = 1e4;
      n[0] < a[0] && (e ? s.push({
        value: Nr(a[0] - i, o)
      }) : s.push({
        value: n[0]
      }));
      for (var u = a[0]; u <= a[1] && (s.push({
        value: u
      }), u = Nr(u + i, o), u !== s[s.length - 1].value); )
        if (s.length > l)
          return [];
      var f = s.length ? s[s.length - 1].value : a[1];
      return n[1] > f && (e ? s.push({
        value: Nr(f + i, o)
      }) : s.push({
        value: n[1]
      })), s;
    }, t.prototype.getMinorTicks = function(e) {
      for (var i = this.getTicks(!0), n = [], a = this.getExtent(), o = 1; o < i.length; o++) {
        for (var s = i[o], l = i[o - 1], u = 0, f = [], h = s.value - l.value, v = h / e; u < e - 1; ) {
          var c = Nr(l.value + (u + 1) * v);
          c > a[0] && c < a[1] && f.push(c), u++;
        }
        n.push(f);
      }
      return n;
    }, t.prototype.getLabel = function(e, i) {
      if (e == null)
        return "";
      var n = i && i.precision;
      n == null ? n = Le(e.value) || 0 : n === "auto" && (n = this._intervalPrecision);
      var a = Nr(e.value, n, !0);
      return ey(a);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 5;
      var a = this._extent, o = a[1] - a[0];
      if (isFinite(o)) {
        o < 0 && (o = -o, a.reverse());
        var s = dC(a, e, i, n);
        this._intervalPrecision = s.intervalPrecision, this._interval = s.interval, this._niceExtent = s.niceTickExtent;
      }
    }, t.prototype.calcNiceExtent = function(e) {
      var i = this._extent;
      if (i[0] === i[1])
        if (i[0] !== 0) {
          var n = Math.abs(i[0]);
          e.fixMax || (i[1] += n / 2), i[0] -= n / 2;
        } else
          i[1] = 1;
      var a = i[1] - i[0];
      isFinite(a) || (i[0] = 0, i[1] = 1), this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
      var o = this._interval;
      e.fixMin || (i[0] = Nr(Math.floor(i[0] / o) * o)), e.fixMax || (i[1] = Nr(Math.ceil(i[1] / o) * o));
    }, t.prototype.setNiceExtent = function(e, i) {
      this._niceExtent = [e, i];
    }, t.type = "interval", t;
  })(Be)
);
Be.registerClass($i);
var cm = typeof Float32Array < "u", yC = cm ? Float32Array : Array;
function Ve(r) {
  return N(r) ? cm ? new Float32Array(r) : r : new yC(r);
}
var mC = "__ec_stack_";
function pm(r) {
  return r.get("stack") || mC + r.seriesIndex;
}
function hh(r) {
  return r.dim + r.index;
}
function dm(r, t) {
  var e = [];
  return t.eachSeriesByType(r, function(i) {
    ym(i) && e.push(i);
  }), e;
}
function _C(r) {
  var t = {};
  M(r, function(l) {
    var u = l.coordinateSystem, f = u.getBaseAxis();
    if (!(f.type !== "time" && f.type !== "value"))
      for (var h = l.getData(), v = f.dim + "_" + f.index, c = h.getDimensionIndex(h.mapDimension(f.dim)), p = h.getStore(), d = 0, g = p.count(); d < g; ++d) {
        var y = p.get(c, d);
        t[v] ? t[v].push(y) : t[v] = [y];
      }
  });
  var e = {};
  for (var i in t)
    if (t.hasOwnProperty(i)) {
      var n = t[i];
      if (n) {
        n.sort(function(l, u) {
          return l - u;
        });
        for (var a = null, o = 1; o < n.length; ++o) {
          var s = n[o] - n[o - 1];
          s > 0 && (a = a === null ? s : Math.min(a, s));
        }
        e[i] = a;
      }
    }
  return e;
}
function gm(r) {
  var t = _C(r), e = [];
  return M(r, function(i) {
    var n = i.coordinateSystem, a = n.getBaseAxis(), o = a.getExtent(), s;
    if (a.type === "category")
      s = a.getBandWidth();
    else if (a.type === "value" || a.type === "time") {
      var l = a.dim + "_" + a.index, u = t[l], f = Math.abs(o[1] - o[0]), h = a.scale.getExtent(), v = Math.abs(h[1] - h[0]);
      s = u ? f / v * u : f;
    } else {
      var c = i.getData();
      s = Math.abs(o[1] - o[0]) / c.count();
    }
    var p = St(i.get("barWidth"), s), d = St(i.get("barMaxWidth"), s), g = St(
      // barMinWidth by default is 0.5 / 1 in cartesian. Because in value axis,
      // the auto-calculated bar width might be less than 0.5 / 1.
      i.get("barMinWidth") || (mm(i) ? 0.5 : 1),
      s
    ), y = i.get("barGap"), m = i.get("barCategoryGap");
    e.push({
      bandWidth: s,
      barWidth: p,
      barMaxWidth: d,
      barMinWidth: g,
      barGap: y,
      barCategoryGap: m,
      axisKey: hh(a),
      stackId: pm(i)
    });
  }), SC(e);
}
function SC(r) {
  var t = {};
  M(r, function(i, n) {
    var a = i.axisKey, o = i.bandWidth, s = t[a] || {
      bandWidth: o,
      remainedWidth: o,
      autoWidthCount: 0,
      categoryGap: null,
      gap: "20%",
      stacks: {}
    }, l = s.stacks;
    t[a] = s;
    var u = i.stackId;
    l[u] || s.autoWidthCount++, l[u] = l[u] || {
      width: 0,
      maxWidth: 0
    };
    var f = i.barWidth;
    f && !l[u].width && (l[u].width = f, f = Math.min(s.remainedWidth, f), s.remainedWidth -= f);
    var h = i.barMaxWidth;
    h && (l[u].maxWidth = h);
    var v = i.barMinWidth;
    v && (l[u].minWidth = v);
    var c = i.barGap;
    c != null && (s.gap = c);
    var p = i.barCategoryGap;
    p != null && (s.categoryGap = p);
  });
  var e = {};
  return M(t, function(i, n) {
    e[n] = {};
    var a = i.stacks, o = i.bandWidth, s = i.categoryGap;
    if (s == null) {
      var l = ct(a).length;
      s = Math.max(35 - l * 4, 15) + "%";
    }
    var u = St(s, o), f = St(i.gap, 1), h = i.remainedWidth, v = i.autoWidthCount, c = (h - u) / (v + (v - 1) * f);
    c = Math.max(c, 0), M(a, function(y) {
      var m = y.maxWidth, _ = y.minWidth;
      if (y.width) {
        var S = y.width;
        m && (S = Math.min(S, m)), _ && (S = Math.max(S, _)), y.width = S, h -= S + f * S, v--;
      } else {
        var S = c;
        m && m < S && (S = Math.min(m, h)), _ && _ > S && (S = _), S !== c && (y.width = S, h -= S + f * S, v--);
      }
    }), c = (h - u) / (v + (v - 1) * f), c = Math.max(c, 0);
    var p = 0, d;
    M(a, function(y, m) {
      y.width || (y.width = c), d = y, p += y.width * (1 + f);
    }), d && (p -= d.width * f);
    var g = -p / 2;
    M(a, function(y, m) {
      e[n][m] = e[n][m] || {
        bandWidth: o,
        offset: g,
        width: y.width
      }, g += y.width * (1 + f);
    });
  }), e;
}
function wC(r, t, e) {
  if (r && t) {
    var i = r[hh(t)];
    return i;
  }
}
function bC(r, t) {
  var e = dm(r, t), i = gm(e);
  M(e, function(n) {
    var a = n.getData(), o = n.coordinateSystem, s = o.getBaseAxis(), l = pm(n), u = i[hh(s)][l], f = u.offset, h = u.width;
    a.setLayout({
      bandWidth: u.bandWidth,
      offset: f,
      size: h
    });
  });
}
function xC(r) {
  return {
    seriesType: r,
    plan: eh(),
    reset: function(t) {
      if (ym(t)) {
        var e = t.getData(), i = t.coordinateSystem, n = i.getBaseAxis(), a = i.getOtherAxis(n), o = e.getDimensionIndex(e.mapDimension(a.dim)), s = e.getDimensionIndex(e.mapDimension(n.dim)), l = t.get("showBackground", !0), u = e.mapDimension(a.dim), f = e.getCalculationInfo("stackResultDimension"), h = ti(e, u) && !!e.getCalculationInfo("stackedOnSeries"), v = a.isHorizontal(), c = TC(n, a), p = mm(t), d = t.get("barMinHeight") || 0, g = f && e.getDimensionIndex(f), y = e.getLayout("size"), m = e.getLayout("offset");
        return {
          progress: function(_, S) {
            for (var b = _.count, w = p && Ve(b * 3), x = p && l && Ve(b * 3), C = p && Ve(b), D = i.master.getRect(), A = v ? D.width : D.height, T, L = S.getStore(), I = 0; (T = _.next()) != null; ) {
              var P = L.get(h ? g : o, T), R = L.get(s, T), E = c, H = void 0;
              h && (H = +P - L.get(o, T));
              var B = void 0, F = void 0, W = void 0, K = void 0;
              if (v) {
                var j = i.dataToPoint([P, R]);
                if (h) {
                  var ut = i.dataToPoint([H, R]);
                  E = ut[0];
                }
                B = E, F = j[1] + m, W = j[0] - E, K = y, Math.abs(W) < d && (W = (W < 0 ? -1 : 1) * d);
              } else {
                var j = i.dataToPoint([R, P]);
                if (h) {
                  var ut = i.dataToPoint([R, H]);
                  E = ut[1];
                }
                B = j[0] + m, F = E, W = y, K = j[1] - E, Math.abs(K) < d && (K = (K <= 0 ? -1 : 1) * d);
              }
              p ? (w[I] = B, w[I + 1] = F, w[I + 2] = v ? W : K, x && (x[I] = v ? D.x : B, x[I + 1] = v ? F : D.y, x[I + 2] = A), C[T] = T) : S.setItemLayout(T, {
                x: B,
                y: F,
                width: W,
                height: K
              }), I += 3;
            }
            p && S.setLayout({
              largePoints: w,
              largeDataIndices: C,
              largeBackgroundPoints: x,
              valueAxisHorizontal: v
            });
          }
        };
      }
    }
  };
}
function ym(r) {
  return r.coordinateSystem && r.coordinateSystem.type === "cartesian2d";
}
function mm(r) {
  return r.pipelineContext && r.pipelineContext.large;
}
function TC(r, t) {
  var e = t.model.get("startValue");
  return e || (e = 0), t.toGlobalCoord(t.dataToCoord(t.type === "log" ? e > 0 ? e : 1 : e));
}
var CC = function(r, t, e, i) {
  for (; e < i; ) {
    var n = e + i >>> 1;
    r[n][1] < t ? e = n + 1 : i = n;
  }
  return e;
}, _m = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "time", i;
    }
    return t.prototype.getLabel = function(e) {
      var i = this.getSetting("useUTC");
      return gs(e.value, Kv[Kw(ki(this._minLevelUnit))] || Kv.second, i, this.getSetting("locale"));
    }, t.prototype.getFormattedLabel = function(e, i, n) {
      var a = this.getSetting("useUTC"), o = this.getSetting("locale");
      return Qw(e, i, n, o, a);
    }, t.prototype.getTicks = function() {
      var e = this._interval, i = this._extent, n = [];
      if (!e)
        return n;
      n.push({
        value: i[0],
        level: 0
      });
      var a = this.getSetting("useUTC"), o = RC(this._minLevelUnit, this._approxInterval, a, i);
      return n = n.concat(o), n.push({
        value: i[1],
        level: 0
      }), n;
    }, t.prototype.calcNiceExtent = function(e) {
      var i = this._extent;
      if (i[0] === i[1] && (i[0] -= ae, i[1] += ae), i[1] === -1 / 0 && i[0] === 1 / 0) {
        var n = /* @__PURE__ */ new Date();
        i[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), i[0] = i[1] - ae;
      }
      this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
    }, t.prototype.calcNiceTicks = function(e, i, n) {
      e = e || 10;
      var a = this._extent, o = a[1] - a[0];
      this._approxInterval = o / e, i != null && this._approxInterval < i && (this._approxInterval = i), n != null && this._approxInterval > n && (this._approxInterval = n);
      var s = Ga.length, l = Math.min(CC(Ga, this._approxInterval, 0, s), s - 1);
      this._interval = Ga[l][1], this._minLevelUnit = Ga[Math.max(l - 1, 0)][0];
    }, t.prototype.parse = function(e) {
      return ht(e) ? e : +Ue(e);
    }, t.prototype.contain = function(e) {
      return As(this.parse(e), this._extent);
    }, t.prototype.normalize = function(e) {
      return Ls(this.parse(e), this._extent);
    }, t.prototype.scale = function(e) {
      return Is(e, this._extent);
    }, t.type = "time", t;
  })($i)
), Ga = [
  // Format                           interval
  ["second", Uf],
  ["minute", Yf],
  ["hour", On],
  ["quarter-day", On * 6],
  ["half-day", On * 12],
  ["day", ae * 1.2],
  ["half-week", ae * 3.5],
  ["week", ae * 7],
  ["month", ae * 31],
  ["quarter", ae * 95],
  ["half-year", qv / 2],
  ["year", qv]
  // 1Y
];
function MC(r, t, e, i) {
  var n = Ue(t), a = Ue(e), o = function(p) {
    return Qv(n, p, i) === Qv(a, p, i);
  }, s = function() {
    return o("year");
  }, l = function() {
    return s() && o("month");
  }, u = function() {
    return l() && o("day");
  }, f = function() {
    return u() && o("hour");
  }, h = function() {
    return f() && o("minute");
  }, v = function() {
    return h() && o("second");
  }, c = function() {
    return v() && o("millisecond");
  };
  switch (r) {
    case "year":
      return s();
    case "month":
      return l();
    case "day":
      return u();
    case "hour":
      return f();
    case "minute":
      return h();
    case "second":
      return v();
    case "millisecond":
      return c();
  }
}
function DC(r, t) {
  return r /= ae, r > 16 ? 16 : r > 7.5 ? 7 : r > 3.5 ? 4 : r > 1.5 ? 2 : 1;
}
function AC(r) {
  var t = 30 * ae;
  return r /= t, r > 6 ? 6 : r > 3 ? 3 : r > 2 ? 2 : 1;
}
function LC(r) {
  return r /= On, r > 12 ? 12 : r > 6 ? 6 : r > 3.5 ? 4 : r > 2 ? 2 : 1;
}
function ap(r, t) {
  return r /= t ? Yf : Uf, r > 30 ? 30 : r > 20 ? 20 : r > 15 ? 15 : r > 10 ? 10 : r > 5 ? 5 : r > 2 ? 2 : 1;
}
function IC(r) {
  return rg(r);
}
function PC(r, t, e) {
  var i = new Date(r);
  switch (ki(t)) {
    case "year":
    case "month":
      i[qg(e)](0);
    case "day":
      i[Kg(e)](1);
    case "hour":
      i[Qg(e)](0);
    case "minute":
      i[Jg(e)](0);
    case "second":
      i[jg(e)](0), i[ty(e)](0);
  }
  return i.getTime();
}
function RC(r, t, e, i) {
  var n = 1e4, a = Xg, o = 0;
  function s(A, T, L, I, P, R, E) {
    for (var H = new Date(T), B = T, F = H[I](); B < L && B <= i[1]; )
      E.push({
        value: B
      }), F += A, H[P](F), B = H.getTime();
    E.push({
      value: B,
      notAdd: !0
    });
  }
  function l(A, T, L) {
    var I = [], P = !T.length;
    if (!MC(ki(A), i[0], i[1], e)) {
      P && (T = [{
        // TODO Optimize. Not include so may ticks.
        value: PC(new Date(i[0]), A, e)
      }, {
        value: i[1]
      }]);
      for (var R = 0; R < T.length - 1; R++) {
        var E = T[R].value, H = T[R + 1].value;
        if (E !== H) {
          var B = void 0, F = void 0, W = void 0, K = !1;
          switch (A) {
            case "year":
              B = Math.max(1, Math.round(t / ae / 365)), F = Zf(e), W = Jw(e);
              break;
            case "half-year":
            case "quarter":
            case "month":
              B = AC(t), F = Oi(e), W = qg(e);
              break;
            case "week":
            // PENDING If week is added. Ignore day.
            case "half-week":
            case "day":
              B = DC(t), F = ys(e), W = Kg(e), K = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              B = LC(t), F = qn(e), W = Qg(e);
              break;
            case "minute":
              B = ap(t, !0), F = ms(e), W = Jg(e);
              break;
            case "second":
              B = ap(t, !1), F = _s(e), W = jg(e);
              break;
            case "millisecond":
              B = IC(t), F = Ss(e), W = ty(e);
              break;
          }
          s(B, E, H, F, W, K, I), A === "year" && L.length > 1 && R === 0 && L.unshift({
            value: L[0].value - B
          });
        }
      }
      for (var R = 0; R < I.length; R++)
        L.push(I[R]);
      return I;
    }
  }
  for (var u = [], f = [], h = 0, v = 0, c = 0; c < a.length && o++ < n; ++c) {
    var p = ki(a[c]);
    if (qw(a[c])) {
      l(a[c], u[u.length - 1] || [], f);
      var d = a[c + 1] ? ki(a[c + 1]) : null;
      if (p !== d) {
        if (f.length) {
          v = h, f.sort(function(A, T) {
            return A.value - T.value;
          });
          for (var g = [], y = 0; y < f.length; ++y) {
            var m = f[y].value;
            (y === 0 || f[y - 1].value !== m) && (g.push(f[y]), m >= i[0] && m <= i[1] && h++);
          }
          var _ = (i[1] - i[0]) / t;
          if (h > _ * 1.5 && v > _ / 1.5 || (u.push(g), h > _ || r === a[c]))
            break;
        }
        f = [];
      }
    }
  }
  for (var S = bt(V(u, function(A) {
    return bt(A, function(T) {
      return T.value >= i[0] && T.value <= i[1] && !T.notAdd;
    });
  }), function(A) {
    return A.length > 0;
  }), b = [], w = S.length - 1, c = 0; c < S.length; ++c)
    for (var x = S[c], C = 0; C < x.length; ++C)
      b.push({
        value: x[C].value,
        level: w - c
      });
  b.sort(function(A, T) {
    return A.value - T.value;
  });
  for (var D = [], c = 0; c < b.length; ++c)
    (c === 0 || b[c].value !== b[c - 1].value) && D.push(b[c]);
  return D;
}
Be.registerClass(_m);
var op = Be.prototype, Vn = $i.prototype, EC = wt, kC = Math.floor, OC = Math.ceil, Wa = Math.pow, ce = Math.log, vh = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "log", e.base = 10, e._originalScale = new $i(), e._interval = 0, e;
    }
    return t.prototype.getTicks = function(e) {
      var i = this._originalScale, n = this._extent, a = i.getExtent(), o = Vn.getTicks.call(this, e);
      return V(o, function(s) {
        var l = s.value, u = wt(Wa(this.base, l));
        return u = l === n[0] && this._fixMin ? Ua(u, a[0]) : u, u = l === n[1] && this._fixMax ? Ua(u, a[1]) : u, {
          value: u
        };
      }, this);
    }, t.prototype.setExtent = function(e, i) {
      var n = ce(this.base);
      e = ce(Math.max(0, e)) / n, i = ce(Math.max(0, i)) / n, Vn.setExtent.call(this, e, i);
    }, t.prototype.getExtent = function() {
      var e = this.base, i = op.getExtent.call(this);
      i[0] = Wa(e, i[0]), i[1] = Wa(e, i[1]);
      var n = this._originalScale, a = n.getExtent();
      return this._fixMin && (i[0] = Ua(i[0], a[0])), this._fixMax && (i[1] = Ua(i[1], a[1])), i;
    }, t.prototype.unionExtent = function(e) {
      this._originalScale.unionExtent(e);
      var i = this.base;
      e[0] = ce(e[0]) / ce(i), e[1] = ce(e[1]) / ce(i), op.unionExtent.call(this, e);
    }, t.prototype.unionExtentFromData = function(e, i) {
      this.unionExtent(e.getApproximateExtent(i));
    }, t.prototype.calcNiceTicks = function(e) {
      e = e || 10;
      var i = this._extent, n = i[1] - i[0];
      if (!(n === 1 / 0 || n <= 0)) {
        var a = a1(n), o = e / n * a;
        for (o <= 0.5 && (a *= 10); !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0; )
          a *= 10;
        var s = [wt(OC(i[0] / a) * a), wt(kC(i[1] / a) * a)];
        this._interval = a, this._niceExtent = s;
      }
    }, t.prototype.calcNiceExtent = function(e) {
      Vn.calcNiceExtent.call(this, e), this._fixMin = e.fixMin, this._fixMax = e.fixMax;
    }, t.prototype.parse = function(e) {
      return e;
    }, t.prototype.contain = function(e) {
      return e = ce(e) / ce(this.base), As(e, this._extent);
    }, t.prototype.normalize = function(e) {
      return e = ce(e) / ce(this.base), Ls(e, this._extent);
    }, t.prototype.scale = function(e) {
      return e = Is(e, this._extent), Wa(this.base, e);
    }, t.type = "log", t;
  })(Be)
), Sm = vh.prototype;
Sm.getMinorTicks = Vn.getMinorTicks;
Sm.getLabel = Vn.getLabel;
function Ua(r, t) {
  return EC(r, Le(t));
}
Be.registerClass(vh);
var BC = (
  /** @class */
  (function() {
    function r(t, e, i) {
      this._prepareParams(t, e, i);
    }
    return r.prototype._prepareParams = function(t, e, i) {
      i[1] < i[0] && (i = [NaN, NaN]), this._dataMin = i[0], this._dataMax = i[1];
      var n = this._isOrdinal = t.type === "ordinal";
      this._needCrossZero = t.type === "interval" && e.getNeedCrossZero && e.getNeedCrossZero();
      var a = e.get("min", !0);
      a == null && (a = e.get("startValue", !0));
      var o = this._modelMinRaw = a;
      X(o) ? this._modelMinNum = Ya(t, o({
        min: i[0],
        max: i[1]
      })) : o !== "dataMin" && (this._modelMinNum = Ya(t, o));
      var s = this._modelMaxRaw = e.get("max", !0);
      if (X(s) ? this._modelMaxNum = Ya(t, s({
        min: i[0],
        max: i[1]
      })) : s !== "dataMax" && (this._modelMaxNum = Ya(t, s)), n)
        this._axisDataLen = e.getCategories().length;
      else {
        var l = e.get("boundaryGap"), u = N(l) ? l : [l || 0, l || 0];
        typeof u[0] == "boolean" || typeof u[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [cr(u[0], 1), cr(u[1], 1)];
      }
    }, r.prototype.calculate = function() {
      var t = this._isOrdinal, e = this._dataMin, i = this._dataMax, n = this._axisDataLen, a = this._boundaryGapInner, o = t ? null : i - e || Math.abs(e), s = this._modelMinRaw === "dataMin" ? e : this._modelMinNum, l = this._modelMaxRaw === "dataMax" ? i : this._modelMaxNum, u = s != null, f = l != null;
      s == null && (s = t ? n ? 0 : NaN : e - a[0] * o), l == null && (l = t ? n ? n - 1 : NaN : i + a[1] * o), (s == null || !isFinite(s)) && (s = NaN), (l == null || !isFinite(l)) && (l = NaN);
      var h = yo(s) || yo(l) || t && !n;
      this._needCrossZero && (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !f && (l = 0));
      var v = this._determinedMin, c = this._determinedMax;
      return v != null && (s = v, u = !0), c != null && (l = c, f = !0), {
        min: s,
        max: l,
        minFixed: u,
        maxFixed: f,
        isBlank: h
      };
    }, r.prototype.modifyDataMinMax = function(t, e) {
      this[FC[t]] = e;
    }, r.prototype.setDeterminedMinMax = function(t, e) {
      var i = NC[t];
      this[i] = e;
    }, r.prototype.freeze = function() {
      this.frozen = !0;
    }, r;
  })()
), NC = {
  min: "_determinedMin",
  max: "_determinedMax"
}, FC = {
  min: "_dataMin",
  max: "_dataMax"
};
function wm(r, t, e) {
  var i = r.rawExtentInfo;
  return i || (i = new BC(r, t, e), r.rawExtentInfo = i, i);
}
function Ya(r, t) {
  return t == null ? null : yo(t) ? NaN : r.parse(t);
}
function bm(r, t) {
  var e = r.type, i = wm(r, t, r.getExtent()).calculate();
  r.setBlank(i.isBlank);
  var n = i.min, a = i.max, o = t.ecModel;
  if (o && e === "time") {
    var s = dm("bar", o), l = !1;
    if (M(s, function(h) {
      l = l || h.getBaseAxis() === t.axis;
    }), l) {
      var u = gm(s), f = zC(n, a, t, u);
      n = f.min, a = f.max;
    }
  }
  return {
    extent: [n, a],
    // "fix" means "fixed", the value should not be
    // changed in the subsequent steps.
    fixMin: i.minFixed,
    fixMax: i.maxFixed
  };
}
function zC(r, t, e, i) {
  var n = e.axis.getExtent(), a = Math.abs(n[1] - n[0]), o = wC(i, e.axis);
  if (o === void 0)
    return {
      min: r,
      max: t
    };
  var s = 1 / 0;
  M(o, function(c) {
    s = Math.min(c.offset, s);
  });
  var l = -1 / 0;
  M(o, function(c) {
    l = Math.max(c.offset + c.width, l);
  }), s = Math.abs(s), l = Math.abs(l);
  var u = s + l, f = t - r, h = 1 - (s + l) / a, v = f / h - f;
  return t += v * (l / u), r -= v * (s / u), {
    min: r,
    max: t
  };
}
function sp(r, t) {
  var e = t, i = bm(r, e), n = i.extent, a = e.get("splitNumber");
  r instanceof vh && (r.base = e.get("logBase"));
  var o = r.type, s = e.get("interval"), l = o === "interval" || o === "time";
  r.setExtent(n[0], n[1]), r.calcNiceExtent({
    splitNumber: a,
    fixMin: i.fixMin,
    fixMax: i.fixMax,
    minInterval: l ? e.get("minInterval") : null,
    maxInterval: l ? e.get("maxInterval") : null
  }), s != null && r.setInterval && r.setInterval(s);
}
function VC(r, t) {
  if (t = t || r.get("type"), t)
    switch (t) {
      // Buildin scale
      case "category":
        return new fh({
          ordinalMeta: r.getOrdinalMeta ? r.getOrdinalMeta() : r.getCategories(),
          extent: [1 / 0, -1 / 0]
        });
      case "time":
        return new _m({
          locale: r.ecModel.getLocaleModel(),
          useUTC: r.ecModel.get("useUTC")
        });
      default:
        return new (Be.getClass(t) || $i)();
    }
}
function HC(r) {
  var t = r.scale.getExtent(), e = t[0], i = t[1];
  return !(e > 0 && i > 0 || e < 0 && i < 0);
}
function qi(r) {
  var t = r.getLabelModel().get("formatter"), e = r.type === "category" ? r.scale.getExtent()[0] : null;
  return r.scale.type === "time" ? /* @__PURE__ */ (function(i) {
    return function(n, a) {
      return r.scale.getFormattedLabel(n, a, i);
    };
  })(t) : z(t) ? /* @__PURE__ */ (function(i) {
    return function(n) {
      var a = r.scale.getLabel(n), o = i.replace("{value}", a ?? "");
      return o;
    };
  })(t) : X(t) ? /* @__PURE__ */ (function(i) {
    return function(n, a) {
      return e != null && (a = n.value - e), i(ch(r, n), a, n.level != null ? {
        level: n.level
      } : null);
    };
  })(t) : function(i) {
    return r.scale.getLabel(i);
  };
}
function ch(r, t) {
  return r.type === "category" ? r.scale.getLabel(t) : t.value;
}
function GC(r) {
  var t = r.model, e = r.scale;
  if (!(!t.get(["axisLabel", "show"]) || e.isBlank())) {
    var i, n, a = e.getExtent();
    e instanceof fh ? n = e.count() : (i = e.getTicks(), n = i.length);
    var o = r.getLabelModel(), s = qi(r), l, u = 1;
    n > 40 && (u = Math.ceil(n / 40));
    for (var f = 0; f < n; f += u) {
      var h = i ? i[f] : {
        value: a[0] + f
      }, v = s(h, f), c = o.getTextRect(v), p = WC(c, o.get("rotate") || 0);
      l ? l.union(p) : l = p;
    }
    return l;
  }
}
function WC(r, t) {
  var e = t * Math.PI / 180, i = r.width, n = r.height, a = i * Math.abs(Math.cos(e)) + Math.abs(n * Math.sin(e)), o = i * Math.abs(Math.sin(e)) + Math.abs(n * Math.cos(e)), s = new it(r.x, r.y, a, o);
  return s;
}
function ph(r) {
  var t = r.get("interval");
  return t ?? "auto";
}
function xm(r) {
  return r.type === "category" && ph(r.getLabelModel()) === 0;
}
function Tm(r, t) {
  var e = {};
  return M(r.mapDimensionsAll(t), function(i) {
    e[hm(r, i)] = !0;
  }), ct(e);
}
function UC(r, t, e) {
  t && M(Tm(t, e), function(i) {
    var n = t.getApproximateExtent(i);
    n[0] < r[0] && (r[0] = n[0]), n[1] > r[1] && (r[1] = n[1]);
  });
}
var YC = (
  /** @class */
  (function() {
    function r() {
    }
    return r.prototype.getNeedCrossZero = function() {
      var t = this.option;
      return !t.scale;
    }, r.prototype.getCoordSysModel = function() {
    }, r;
  })()
), lp = [], ZC = {
  registerPreprocessor: im,
  registerProcessor: nm,
  registerPostInit: NT,
  registerPostUpdate: FT,
  registerUpdateLifecycle: lh,
  registerAction: ii,
  registerCoordinateSystem: zT,
  registerLayout: VT,
  registerVisual: ni,
  registerTransform: GT,
  registerLoading: am,
  registerMap: HT,
  registerImpl: yT,
  PRIORITY: IT,
  ComponentModel: ot,
  ComponentView: ue,
  SeriesModel: ye,
  ChartView: se,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(r) {
    ot.registerClass(r);
  },
  registerComponentView: function(r) {
    ue.registerClass(r);
  },
  registerSeriesModel: function(r) {
    ye.registerClass(r);
  },
  registerChartView: function(r) {
    se.registerClass(r);
  },
  registerSubTypeDefaulter: function(r, t) {
    ot.registerSubTypeDefaulter(r, t);
  },
  registerPainter: function(r, t) {
    t1(r, t);
  }
};
function me(r) {
  if (N(r)) {
    M(r, function(t) {
      me(t);
    });
    return;
  }
  rt(lp, r) >= 0 || (lp.push(r), X(r) && (r = {
    install: r
  }), r.install(ZC));
}
var ea = pt();
function Cm(r, t) {
  var e = V(t, function(i) {
    return r.scale.parse(i);
  });
  return r.type === "time" && e.length > 0 && (e.sort(), e.unshift(e[0]), e.push(e[e.length - 1])), e;
}
function XC(r) {
  var t = r.getLabelModel().get("customValues");
  if (t) {
    var e = qi(r), i = r.scale.getExtent(), n = Cm(r, t), a = bt(n, function(o) {
      return o >= i[0] && o <= i[1];
    });
    return {
      labels: V(a, function(o) {
        var s = {
          value: o
        };
        return {
          formattedLabel: e(s),
          rawLabel: r.scale.getLabel(s),
          tickValue: o
        };
      })
    };
  }
  return r.type === "category" ? qC(r) : QC(r);
}
function $C(r, t) {
  var e = r.getTickModel().get("customValues");
  if (e) {
    var i = r.scale.getExtent(), n = Cm(r, e);
    return {
      ticks: bt(n, function(a) {
        return a >= i[0] && a <= i[1];
      })
    };
  }
  return r.type === "category" ? KC(r, t) : {
    ticks: V(r.scale.getTicks(), function(a) {
      return a.value;
    })
  };
}
function qC(r) {
  var t = r.getLabelModel(), e = Mm(r, t);
  return !t.get("show") || r.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: e.labelCategoryInterval
  } : e;
}
function Mm(r, t) {
  var e = Dm(r, "labels"), i = ph(t), n = Am(e, i);
  if (n)
    return n;
  var a, o;
  return X(i) ? a = Pm(r, i) : (o = i === "auto" ? JC(r) : i, a = Im(r, o)), Lm(e, i, {
    labels: a,
    labelCategoryInterval: o
  });
}
function KC(r, t) {
  var e = Dm(r, "ticks"), i = ph(t), n = Am(e, i);
  if (n)
    return n;
  var a, o;
  if ((!t.get("show") || r.scale.isBlank()) && (a = []), X(i))
    a = Pm(r, i, !0);
  else if (i === "auto") {
    var s = Mm(r, r.getLabelModel());
    o = s.labelCategoryInterval, a = V(s.labels, function(l) {
      return l.tickValue;
    });
  } else
    o = i, a = Im(r, o, !0);
  return Lm(e, i, {
    ticks: a,
    tickCategoryInterval: o
  });
}
function QC(r) {
  var t = r.scale.getTicks(), e = qi(r);
  return {
    labels: V(t, function(i, n) {
      return {
        level: i.level,
        formattedLabel: e(i, n),
        rawLabel: r.scale.getLabel(i),
        tickValue: i.value
      };
    })
  };
}
function Dm(r, t) {
  return ea(r)[t] || (ea(r)[t] = []);
}
function Am(r, t) {
  for (var e = 0; e < r.length; e++)
    if (r[e].key === t)
      return r[e].value;
}
function Lm(r, t, e) {
  return r.push({
    key: t,
    value: e
  }), e;
}
function JC(r) {
  var t = ea(r).autoInterval;
  return t ?? (ea(r).autoInterval = r.calculateCategoryInterval());
}
function jC(r) {
  var t = tM(r), e = qi(r), i = (t.axisRotate - t.labelRotate) / 180 * Math.PI, n = r.scale, a = n.getExtent(), o = n.count();
  if (a[1] - a[0] < 1)
    return 0;
  var s = 1;
  o > 40 && (s = Math.max(1, Math.floor(o / 40)));
  for (var l = a[0], u = r.dataToCoord(l + 1) - r.dataToCoord(l), f = Math.abs(u * Math.cos(i)), h = Math.abs(u * Math.sin(i)), v = 0, c = 0; l <= a[1]; l += s) {
    var p = 0, d = 0, g = Mf(e({
      value: l
    }), t.font, "center", "top");
    p = g.width * 1.3, d = g.height * 1.3, v = Math.max(v, p, 7), c = Math.max(c, d, 7);
  }
  var y = v / f, m = c / h;
  isNaN(y) && (y = 1 / 0), isNaN(m) && (m = 1 / 0);
  var _ = Math.max(0, Math.floor(Math.min(y, m))), S = ea(r.model), b = r.getExtent(), w = S.lastAutoInterval, x = S.lastTickCount;
  return w != null && x != null && Math.abs(w - _) <= 1 && Math.abs(x - o) <= 1 && w > _ && S.axisExtent0 === b[0] && S.axisExtent1 === b[1] ? _ = w : (S.lastTickCount = o, S.lastAutoInterval = _, S.axisExtent0 = b[0], S.axisExtent1 = b[1]), _;
}
function tM(r) {
  var t = r.getLabelModel();
  return {
    axisRotate: r.getRotate ? r.getRotate() : r.isHorizontal && !r.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
function Im(r, t, e) {
  var i = qi(r), n = r.scale, a = n.getExtent(), o = r.getLabelModel(), s = [], l = Math.max((t || 0) + 1, 1), u = a[0], f = n.count();
  u !== 0 && l > 1 && f / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var h = xm(r), v = o.get("showMinLabel") || h, c = o.get("showMaxLabel") || h;
  v && u !== a[0] && d(a[0]);
  for (var p = u; p <= a[1]; p += l)
    d(p);
  c && p - l !== a[1] && d(a[1]);
  function d(g) {
    var y = {
      value: g
    };
    s.push(e ? g : {
      formattedLabel: i(y),
      rawLabel: n.getLabel(y),
      tickValue: g
    });
  }
  return s;
}
function Pm(r, t, e) {
  var i = r.scale, n = qi(r), a = [];
  return M(i.getTicks(), function(o) {
    var s = i.getLabel(o), l = o.value;
    t(o.value, s) && a.push(e ? l : {
      formattedLabel: n(o),
      rawLabel: s,
      tickValue: l
    });
  }), a;
}
var up = [0, 1], eM = (
  /** @class */
  (function() {
    function r(t, e, i) {
      this.onBand = !1, this.inverse = !1, this.dim = t, this.scale = e, this._extent = i || [0, 0];
    }
    return r.prototype.contain = function(t) {
      var e = this._extent, i = Math.min(e[0], e[1]), n = Math.max(e[0], e[1]);
      return t >= i && t <= n;
    }, r.prototype.containData = function(t) {
      return this.scale.contain(t);
    }, r.prototype.getExtent = function() {
      return this._extent.slice();
    }, r.prototype.getPixelPrecision = function(t) {
      return tg(t || this.scale.getExtent(), this._extent);
    }, r.prototype.setExtent = function(t, e) {
      var i = this._extent;
      i[0] = t, i[1] = e;
    }, r.prototype.dataToCoord = function(t, e) {
      var i = this._extent, n = this.scale;
      return t = n.normalize(t), this.onBand && n.type === "ordinal" && (i = i.slice(), fp(i, n.count())), At(t, up, i, e);
    }, r.prototype.coordToData = function(t, e) {
      var i = this._extent, n = this.scale;
      this.onBand && n.type === "ordinal" && (i = i.slice(), fp(i, n.count()));
      var a = At(t, i, up, e);
      return this.scale.scale(a);
    }, r.prototype.pointToData = function(t, e) {
    }, r.prototype.getTicksCoords = function(t) {
      t = t || {};
      var e = t.tickModel || this.getTickModel(), i = $C(this, e), n = i.ticks, a = V(n, function(s) {
        return {
          coord: this.dataToCoord(this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(s) : s),
          tickValue: s
        };
      }, this), o = e.get("alignWithLabel");
      return rM(this, a, o, t.clamp), a;
    }, r.prototype.getMinorTicksCoords = function() {
      if (this.scale.type === "ordinal")
        return [];
      var t = this.model.getModel("minorTick"), e = t.get("splitNumber");
      e > 0 && e < 100 || (e = 5);
      var i = this.scale.getMinorTicks(e), n = V(i, function(a) {
        return V(a, function(o) {
          return {
            coord: this.dataToCoord(o),
            tickValue: o
          };
        }, this);
      }, this);
      return n;
    }, r.prototype.getViewLabels = function() {
      return XC(this).labels;
    }, r.prototype.getLabelModel = function() {
      return this.model.getModel("axisLabel");
    }, r.prototype.getTickModel = function() {
      return this.model.getModel("axisTick");
    }, r.prototype.getBandWidth = function() {
      var t = this._extent, e = this.scale.getExtent(), i = e[1] - e[0] + (this.onBand ? 1 : 0);
      i === 0 && (i = 1);
      var n = Math.abs(t[1] - t[0]);
      return Math.abs(n) / i;
    }, r.prototype.calculateCategoryInterval = function() {
      return jC(this);
    }, r;
  })()
);
function fp(r, t) {
  var e = r[1] - r[0], i = t, n = e / i / 2;
  r[0] += n, r[1] -= n;
}
function rM(r, t, e, i) {
  var n = t.length;
  if (!r.onBand || e || !n)
    return;
  var a = r.getExtent(), o, s;
  if (n === 1)
    t[0].coord = a[0], o = t[1] = {
      coord: a[1],
      tickValue: t[0].tickValue
    };
  else {
    var l = t[n - 1].tickValue - t[0].tickValue, u = (t[n - 1].coord - t[0].coord) / l;
    M(t, function(c) {
      c.coord -= u / 2;
    });
    var f = r.scale.getExtent();
    s = 1 + f[1] - t[n - 1].tickValue, o = {
      coord: t[n - 1].coord + u * s,
      tickValue: f[1] + 1
    }, t.push(o);
  }
  var h = a[0] > a[1];
  v(t[0].coord, a[0]) && (i ? t[0].coord = a[0] : t.shift()), i && v(a[0], t[0].coord) && t.unshift({
    coord: a[0]
  }), v(a[1], o.coord) && (i ? o.coord = a[1] : t.pop()), i && v(o.coord, a[1]) && t.push({
    coord: a[1]
  });
  function v(c, p) {
    return c = wt(c), p = wt(p), h ? c > p : c < p;
  }
}
function iM(r) {
  for (var t = [], e = 0; e < r.length; e++) {
    var i = r[e];
    if (!i.defaultAttr.ignore) {
      var n = i.label, a = n.getComputedTransform(), o = n.getBoundingRect(), s = !a || a[1] < 1e-5 && a[2] < 1e-5, l = n.style.margin || 0, u = o.clone();
      u.applyTransform(a), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var f = s ? new Ro(o, a) : null;
      t.push({
        label: n,
        labelLine: i.labelLine,
        rect: u,
        localRect: o,
        obb: f,
        priority: i.priority,
        defaultAttr: i.defaultAttr,
        layoutOption: i.computedLayoutOption,
        axisAligned: s,
        transform: a
      });
    }
  }
  return t;
}
function nM(r) {
  var t = [];
  r.sort(function(d, g) {
    return g.priority - d.priority;
  });
  var e = new it(0, 0, 0, 0);
  function i(d) {
    if (!d.ignore) {
      var g = d.ensureState("emphasis");
      g.ignore == null && (g.ignore = !1);
    }
    d.ignore = !0;
  }
  for (var n = 0; n < r.length; n++) {
    var a = r[n], o = a.axisAligned, s = a.localRect, l = a.transform, u = a.label, f = a.labelLine;
    e.copy(a.rect), e.width -= 0.1, e.height -= 0.1, e.x += 0.05, e.y += 0.05;
    for (var h = a.obb, v = !1, c = 0; c < t.length; c++) {
      var p = t[c];
      if (e.intersect(p.rect)) {
        if (o && p.axisAligned) {
          v = !0;
          break;
        }
        if (p.obb || (p.obb = new Ro(p.localRect, p.transform)), h || (h = new Ro(s, l)), h.intersect(p.obb)) {
          v = !0;
          break;
        }
      }
    }
    v ? (i(u), f && i(f)) : (u.attr("ignore", a.defaultAttr.ignore), f && f.attr("ignore", a.defaultAttr.labelGuideIgnore), t.push(a));
  }
}
var aM = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.hasSymbolVisual = !0, e;
    }
    return t.prototype.getInitialData = function(e) {
      return Ds(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getLegendIcon = function(e) {
      var i = new gt(), n = ke("line", 0, e.itemHeight / 2, e.itemWidth, 0, e.lineStyle.stroke, !1);
      i.add(n), n.setStyle(e.lineStyle);
      var a = this.getData().getVisual("symbol"), o = this.getData().getVisual("symbolRotate"), s = a === "none" ? "circle" : a, l = e.itemHeight * 0.8, u = ke(s, (e.itemWidth - l) / 2, (e.itemHeight - l) / 2, l, l, e.itemStyle.fill);
      i.add(u), u.setStyle(e.itemStyle);
      var f = e.iconRotate === "inherit" ? o : e.iconRotate || 0;
      return u.rotation = f * Math.PI / 180, u.setOrigin([e.itemWidth / 2, e.itemHeight / 2]), s.indexOf("empty") > -1 && (u.style.stroke = u.style.fill, u.style.fill = "#fff", u.style.lineWidth = 2), i;
    }, t.type = "series.line", t.dependencies = ["grid", "polar"], t.defaultOption = {
      // zlevel: 0,
      z: 3,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      clip: !0,
      label: {
        position: "top"
      },
      // itemStyle: {
      // },
      endLabel: {
        show: !1,
        valueAnimation: !0,
        distance: 8
      },
      lineStyle: {
        width: 2,
        type: "solid"
      },
      emphasis: {
        scale: !0
      },
      // areaStyle: {
      // origin of areaStyle. Valid values:
      // `'auto'/null/undefined`: from axisLine to data
      // `'start'`: from min to data
      // `'end'`: from data to max
      // origin: 'auto'
      // },
      // false, 'start', 'end', 'middle'
      step: !1,
      // Disabled if step is true
      smooth: !1,
      smoothMonotone: null,
      symbol: "emptyCircle",
      symbolSize: 4,
      symbolRotate: null,
      showSymbol: !0,
      // `false`: follow the label interval strategy.
      // `true`: show all symbols.
      // `'auto'`: If possible, show all symbols, otherwise
      //           follow the label interval strategy.
      showAllSymbol: "auto",
      // Whether to connect break point.
      connectNulls: !1,
      // Sampling for large data. Can be: 'average', 'max', 'min', 'sum', 'lttb'.
      sampling: "none",
      animationEasing: "linear",
      // Disable progressive
      progressive: 0,
      hoverLayerThreshold: 1 / 0,
      universalTransition: {
        divideShape: "clone"
      },
      triggerLineEvent: !1
    }, t;
  })(ye)
);
function dh(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel"), i = e.length;
  if (i === 1) {
    var n = Hi(r, t, e[0]);
    return n != null ? n + "" : null;
  } else if (i) {
    for (var a = [], o = 0; o < e.length; o++)
      a.push(Hi(r, t, e[o]));
    return a.join(" ");
  }
}
function Rm(r, t) {
  var e = r.mapDimensionsAll("defaultedLabel");
  if (!N(t))
    return t + "";
  for (var i = [], n = 0; n < e.length; n++) {
    var a = r.getDimensionIndex(e[n]);
    a >= 0 && i.push(t[a]);
  }
  return i.join(" ");
}
var gh = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e, i, n, a) {
      var o = r.call(this) || this;
      return o.updateData(e, i, n, a), o;
    }
    return t.prototype._createSymbol = function(e, i, n, a, o) {
      this.removeAll();
      var s = ke(e, -1, -1, 2, 2, null, o);
      s.attr({
        z2: 100,
        culling: !0,
        scaleX: a[0] / 2,
        scaleY: a[1] / 2
      }), s.drift = oM, this._symbolType = e, this.add(s);
    }, t.prototype.stopSymbolAnimation = function(e) {
      this.childAt(0).stopAnimation(null, e);
    }, t.prototype.getSymbolType = function() {
      return this._symbolType;
    }, t.prototype.getSymbolPath = function() {
      return this.childAt(0);
    }, t.prototype.highlight = function() {
      Yn(this.childAt(0));
    }, t.prototype.downplay = function() {
      Zn(this.childAt(0));
    }, t.prototype.setZ = function(e, i) {
      var n = this.childAt(0);
      n.zlevel = e, n.z = i;
    }, t.prototype.setDraggable = function(e, i) {
      var n = this.childAt(0);
      n.draggable = e, n.cursor = !i && e ? "move" : n.cursor;
    }, t.prototype.updateData = function(e, i, n, a) {
      this.silent = !1;
      var o = e.getItemVisual(i, "symbol") || "circle", s = e.hostModel, l = t.getSymbolSize(e, i), u = o !== this._symbolType, f = a && a.disableAnimation;
      if (u) {
        var h = e.getItemVisual(i, "symbolKeepAspect");
        this._createSymbol(o, e, i, l, h);
      } else {
        var v = this.childAt(0);
        v.silent = !1;
        var c = {
          scaleX: l[0] / 2,
          scaleY: l[1] / 2
        };
        f ? v.attr(c) : Ot(v, c, s, i), Og(v);
      }
      if (this._updateCommon(e, i, l, n, a), u) {
        var v = this.childAt(0);
        if (!f) {
          var c = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: {
              // Always fadeIn. Because it has fadeOut animation when symbol is removed..
              opacity: v.style.opacity
            }
          };
          v.scaleX = v.scaleY = 0, v.style.opacity = 0, Ee(v, c, s, i);
        }
      }
      f && this.childAt(0).stopAnimation("leave");
    }, t.prototype._updateCommon = function(e, i, n, a, o) {
      var s = this.childAt(0), l = e.hostModel, u, f, h, v, c, p, d, g, y;
      if (a && (u = a.emphasisItemStyle, f = a.blurItemStyle, h = a.selectItemStyle, v = a.focus, c = a.blurScope, d = a.labelStatesModels, g = a.hoverScale, y = a.cursorStyle, p = a.emphasisDisabled), !a || e.hasItemOption) {
        var m = a && a.itemModel ? a.itemModel : e.getItemModel(i), _ = m.getModel("emphasis");
        u = _.getModel("itemStyle").getItemStyle(), h = m.getModel(["select", "itemStyle"]).getItemStyle(), f = m.getModel(["blur", "itemStyle"]).getItemStyle(), v = _.get("focus"), c = _.get("blurScope"), p = _.get("disabled"), d = ri(m), g = _.getShallow("scale"), y = m.getShallow("cursor");
      }
      var S = e.getItemVisual(i, "symbolRotate");
      s.attr("rotation", (S || 0) * Math.PI / 180 || 0);
      var b = Cs(e.getItemVisual(i, "symbolOffset"), n);
      b && (s.x = b[0], s.y = b[1]), y && s.attr("cursor", y);
      var w = e.getItemVisual(i, "style"), x = w.fill;
      if (s instanceof pr) {
        var C = s.style;
        s.useStyle(O({
          // TODO other properties like x, y ?
          image: C.image,
          x: C.x,
          y: C.y,
          width: C.width,
          height: C.height
        }, w));
      } else
        s.__isEmptyBrush ? s.useStyle(O({}, w)) : s.useStyle(w), s.style.decal = null, s.setColor(x, o && o.symbolInnerColor), s.style.strokeNoScale = !0;
      var D = e.getItemVisual(i, "liftZ"), A = this._z2;
      D != null ? A == null && (this._z2 = s.z2, s.z2 += D) : A != null && (s.z2 = A, this._z2 = null);
      var T = o && o.useNameLabel;
      Zi(s, d, {
        labelFetcher: l,
        labelDataIndex: i,
        defaultText: L,
        inheritColor: x,
        defaultOpacity: w.opacity
      });
      function L(R) {
        return T ? e.getName(R) : dh(e, R);
      }
      this._sizeX = n[0] / 2, this._sizeY = n[1] / 2;
      var I = s.ensureState("emphasis");
      I.style = u, s.ensureState("select").style = h, s.ensureState("blur").style = f;
      var P = g == null || g === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(g) && g > 0 ? +g : 1;
      I.scaleX = this._sizeX * P, I.scaleY = this._sizeY * P, this.setSymbolScale(1), Fi(this, v, c, p);
    }, t.prototype.setSymbolScale = function(e) {
      this.scaleX = this.scaleY = e;
    }, t.prototype.fadeOut = function(e, i, n) {
      var a = this.childAt(0), o = et(this).dataIndex, s = n && n.animation;
      if (this.silent = a.silent = !0, n && n.fadeLabel) {
        var l = a.getTextContent();
        l && Eo(l, {
          style: {
            opacity: 0
          }
        }, i, {
          dataIndex: o,
          removeOpt: s,
          cb: function() {
            a.removeTextContent();
          }
        });
      } else
        a.removeTextContent();
      Eo(a, {
        style: {
          opacity: 0
        },
        scaleX: 0,
        scaleY: 0
      }, i, {
        dataIndex: o,
        cb: e,
        removeOpt: s
      });
    }, t.getSymbolSize = function(e, i) {
      return nh(e.getItemVisual(i, "symbolSize"));
    }, t;
  })(gt)
);
function oM(r, t) {
  this.parent.drift(r, t);
}
function Fl(r, t, e, i) {
  return t && !isNaN(t[0]) && !isNaN(t[1]) && !(i.isIgnore && i.isIgnore(e)) && !(i.clipShape && !i.clipShape.contain(t[0], t[1])) && r.getItemVisual(e, "symbol") !== "none";
}
function hp(r) {
  return r != null && !G(r) && (r = {
    isIgnore: r
  }), r || {};
}
function vp(r) {
  var t = r.hostModel, e = t.getModel("emphasis");
  return {
    emphasisItemStyle: e.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: e.get("focus"),
    blurScope: e.get("blurScope"),
    emphasisDisabled: e.get("disabled"),
    hoverScale: e.get("scale"),
    labelStatesModels: ri(t),
    cursorStyle: t.get("cursor")
  };
}
var Em = (
  /** @class */
  (function() {
    function r(t) {
      this.group = new gt(), this._SymbolCtor = t || gh;
    }
    return r.prototype.updateData = function(t, e) {
      this._progressiveEls = null, e = hp(e);
      var i = this.group, n = t.hostModel, a = this._data, o = this._SymbolCtor, s = e.disableAnimation, l = vp(t), u = {
        disableAnimation: s
      }, f = e.getSymbolPoint || function(h) {
        return t.getItemLayout(h);
      };
      a || i.removeAll(), t.diff(a).add(function(h) {
        var v = f(h);
        if (Fl(t, v, h, e)) {
          var c = new o(t, h, l, u);
          c.setPosition(v), t.setItemGraphicEl(h, c), i.add(c);
        }
      }).update(function(h, v) {
        var c = a.getItemGraphicEl(v), p = f(h);
        if (!Fl(t, p, h, e)) {
          i.remove(c);
          return;
        }
        var d = t.getItemVisual(h, "symbol") || "circle", g = c && c.getSymbolType && c.getSymbolType();
        if (!c || g && g !== d)
          i.remove(c), c = new o(t, h, l, u), c.setPosition(p);
        else {
          c.updateData(t, h, l, u);
          var y = {
            x: p[0],
            y: p[1]
          };
          s ? c.attr(y) : Ot(c, y, n);
        }
        i.add(c), t.setItemGraphicEl(h, c);
      }).remove(function(h) {
        var v = a.getItemGraphicEl(h);
        v && v.fadeOut(function() {
          i.remove(v);
        }, n);
      }).execute(), this._getSymbolPoint = f, this._data = t;
    }, r.prototype.updateLayout = function() {
      var t = this, e = this._data;
      e && e.eachItemGraphicEl(function(i, n) {
        var a = t._getSymbolPoint(n);
        i.setPosition(a), i.markRedraw();
      });
    }, r.prototype.incrementalPrepareUpdate = function(t) {
      this._seriesScope = vp(t), this._data = null, this.group.removeAll();
    }, r.prototype.incrementalUpdate = function(t, e, i) {
      this._progressiveEls = [], i = hp(i);
      function n(l) {
        l.isGroup || (l.incremental = !0, l.ensureState("emphasis").hoverLayer = !0);
      }
      for (var a = t.start; a < t.end; a++) {
        var o = e.getItemLayout(a);
        if (Fl(e, o, a, i)) {
          var s = new this._SymbolCtor(e, a, this._seriesScope);
          s.traverse(n), s.setPosition(o), this.group.add(s), e.setItemGraphicEl(a, s), this._progressiveEls.push(s);
        }
      }
    }, r.prototype.eachRendered = function(t) {
      ua(this._progressiveEls || this.group, t);
    }, r.prototype.remove = function(t) {
      var e = this.group, i = this._data;
      i && t ? i.eachItemGraphicEl(function(n) {
        n.fadeOut(function() {
          e.remove(n);
        }, i.hostModel);
      }) : e.removeAll();
    }, r;
  })()
);
function km(r, t, e) {
  var i = r.getBaseAxis(), n = r.getOtherAxis(i), a = sM(n, e), o = i.dim, s = n.dim, l = t.mapDimension(s), u = t.mapDimension(o), f = s === "x" || s === "radius" ? 1 : 0, h = V(r.dimensions, function(p) {
    return t.mapDimension(p);
  }), v = !1, c = t.getCalculationInfo("stackResultDimension");
  return ti(
    t,
    h[0]
    /* , dims[1] */
  ) && (v = !0, h[0] = c), ti(
    t,
    h[1]
    /* , dims[0] */
  ) && (v = !0, h[1] = c), {
    dataDimsForPoint: h,
    valueStart: a,
    valueAxisDim: s,
    baseAxisDim: o,
    stacked: !!v,
    valueDim: l,
    baseDim: u,
    baseDataOffset: f,
    stackedOverDimension: t.getCalculationInfo("stackedOverDimension")
  };
}
function sM(r, t) {
  var e = 0, i = r.scale.getExtent();
  return t === "start" ? e = i[0] : t === "end" ? e = i[1] : ht(t) && !isNaN(t) ? e = t : i[0] > 0 ? e = i[0] : i[1] < 0 && (e = i[1]), e;
}
function Om(r, t, e, i) {
  var n = NaN;
  r.stacked && (n = e.get(e.getCalculationInfo("stackedOverDimension"), i)), isNaN(n) && (n = r.valueStart);
  var a = r.baseDataOffset, o = [];
  return o[a] = e.get(r.baseDim, i), o[1 - a] = n, t.dataToPoint(o);
}
function lM(r, t) {
  var e = [];
  return t.diff(r).add(function(i) {
    e.push({
      cmd: "+",
      idx: i
    });
  }).update(function(i, n) {
    e.push({
      cmd: "=",
      idx: n,
      idx1: i
    });
  }).remove(function(i) {
    e.push({
      cmd: "-",
      idx: i
    });
  }).execute(), e;
}
function uM(r, t, e, i, n, a, o, s) {
  for (var l = lM(r, t), u = [], f = [], h = [], v = [], c = [], p = [], d = [], g = km(n, t, o), y = r.getLayout("points") || [], m = t.getLayout("points") || [], _ = 0; _ < l.length; _++) {
    var S = l[_], b = !0, w = void 0, x = void 0;
    switch (S.cmd) {
      case "=":
        w = S.idx * 2, x = S.idx1 * 2;
        var C = y[w], D = y[w + 1], A = m[x], T = m[x + 1];
        (isNaN(C) || isNaN(D)) && (C = A, D = T), u.push(C, D), f.push(A, T), h.push(e[w], e[w + 1]), v.push(i[x], i[x + 1]), d.push(t.getRawIndex(S.idx1));
        break;
      case "+":
        var L = S.idx, I = g.dataDimsForPoint, P = n.dataToPoint([t.get(I[0], L), t.get(I[1], L)]);
        x = L * 2, u.push(P[0], P[1]), f.push(m[x], m[x + 1]);
        var R = Om(g, n, t, L);
        h.push(R[0], R[1]), v.push(i[x], i[x + 1]), d.push(t.getRawIndex(L));
        break;
      case "-":
        b = !1;
    }
    b && (c.push(S), p.push(p.length));
  }
  p.sort(function(yt, he) {
    return d[yt] - d[he];
  });
  for (var E = u.length, H = Ve(E), B = Ve(E), F = Ve(E), W = Ve(E), K = [], _ = 0; _ < p.length; _++) {
    var j = p[_], ut = _ * 2, vt = j * 2;
    H[ut] = u[vt], H[ut + 1] = u[vt + 1], B[ut] = f[vt], B[ut + 1] = f[vt + 1], F[ut] = h[vt], F[ut + 1] = h[vt + 1], W[ut] = v[vt], W[ut + 1] = v[vt + 1], K[_] = c[j];
  }
  return {
    current: H,
    next: B,
    stackedOnCurrent: F,
    stackedOnNext: W,
    status: K
  };
}
var tr = Math.min, er = Math.max;
function Zr(r, t) {
  return isNaN(r) || isNaN(t);
}
function Ju(r, t, e, i, n, a, o, s, l) {
  for (var u, f, h, v, c, p, d = e, g = 0; g < i; g++) {
    var y = t[d * 2], m = t[d * 2 + 1];
    if (d >= n || d < 0)
      break;
    if (Zr(y, m)) {
      if (l) {
        d += a;
        continue;
      }
      break;
    }
    if (d === e)
      r[a > 0 ? "moveTo" : "lineTo"](y, m), h = y, v = m;
    else {
      var _ = y - u, S = m - f;
      if (_ * _ + S * S < 0.5) {
        d += a;
        continue;
      }
      if (o > 0) {
        for (var b = d + a, w = t[b * 2], x = t[b * 2 + 1]; w === y && x === m && g < i; )
          g++, b += a, d += a, w = t[b * 2], x = t[b * 2 + 1], y = t[d * 2], m = t[d * 2 + 1], _ = y - u, S = m - f;
        var C = g + 1;
        if (l)
          for (; Zr(w, x) && C < i; )
            C++, b += a, w = t[b * 2], x = t[b * 2 + 1];
        var D = 0.5, A = 0, T = 0, L = void 0, I = void 0;
        if (C >= i || Zr(w, x))
          c = y, p = m;
        else {
          A = w - u, T = x - f;
          var P = y - u, R = w - y, E = m - f, H = x - m, B = void 0, F = void 0;
          if (s === "x") {
            B = Math.abs(P), F = Math.abs(R);
            var W = A > 0 ? 1 : -1;
            c = y - W * B * o, p = m, L = y + W * F * o, I = m;
          } else if (s === "y") {
            B = Math.abs(E), F = Math.abs(H);
            var K = T > 0 ? 1 : -1;
            c = y, p = m - K * B * o, L = y, I = m + K * F * o;
          } else
            B = Math.sqrt(P * P + E * E), F = Math.sqrt(R * R + H * H), D = F / (F + B), c = y - A * o * (1 - D), p = m - T * o * (1 - D), L = y + A * o * D, I = m + T * o * D, L = tr(L, er(w, y)), I = tr(I, er(x, m)), L = er(L, tr(w, y)), I = er(I, tr(x, m)), A = L - y, T = I - m, c = y - A * B / F, p = m - T * B / F, c = tr(c, er(u, y)), p = tr(p, er(f, m)), c = er(c, tr(u, y)), p = er(p, tr(f, m)), A = y - c, T = m - p, L = y + A * F / B, I = m + T * F / B;
        }
        r.bezierCurveTo(h, v, c, p, y, m), h = L, v = I;
      } else
        r.lineTo(y, m);
    }
    u = y, f = m, d += a;
  }
  return g;
}
var Bm = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return r;
  })()
), fM = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-polyline", i;
    }
    return t.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    }, t.prototype.getDefaultShape = function() {
      return new Bm();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = 0, o = n.length / 2;
      if (i.connectNulls) {
        for (; o > 0 && Zr(n[o * 2 - 2], n[o * 2 - 1]); o--)
          ;
        for (; a < o && Zr(n[a * 2], n[a * 2 + 1]); a++)
          ;
      }
      for (; a < o; )
        a += Ju(e, n, a, o, o, 1, i.smooth, i.smoothMonotone, i.connectNulls) + 1;
    }, t.prototype.getPointOn = function(e, i) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var n = this.path, a = n.data, o = Kr.CMD, s, l, u = i === "x", f = [], h = 0; h < a.length; ) {
        var v = a[h++], c = void 0, p = void 0, d = void 0, g = void 0, y = void 0, m = void 0, _ = void 0;
        switch (v) {
          case o.M:
            s = a[h++], l = a[h++];
            break;
          case o.L:
            if (c = a[h++], p = a[h++], _ = u ? (e - s) / (c - s) : (e - l) / (p - l), _ <= 1 && _ >= 0) {
              var S = u ? (p - l) * _ + l : (c - s) * _ + s;
              return u ? [e, S] : [S, e];
            }
            s = c, l = p;
            break;
          case o.C:
            c = a[h++], p = a[h++], d = a[h++], g = a[h++], y = a[h++], m = a[h++];
            var b = u ? So(s, c, d, y, e, f) : So(l, p, g, m, e, f);
            if (b > 0)
              for (var w = 0; w < b; w++) {
                var x = f[w];
                if (x <= 1 && x >= 0) {
                  var S = u ? Tt(l, p, g, m, x) : Tt(s, c, d, y, x);
                  return u ? [e, S] : [S, e];
                }
              }
            s = y, l = m;
            break;
        }
      }
    }, t;
  })(nt)
), hM = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t;
  })(Bm)
), vM = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-polygon", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new hM();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = i.stackedOnPoints, o = 0, s = n.length / 2, l = i.smoothMonotone;
      if (i.connectNulls) {
        for (; s > 0 && Zr(n[s * 2 - 2], n[s * 2 - 1]); s--)
          ;
        for (; o < s && Zr(n[o * 2], n[o * 2 + 1]); o++)
          ;
      }
      for (; o < s; ) {
        var u = Ju(e, n, o, s, s, 1, i.smooth, l, i.connectNulls);
        Ju(e, a, o + u - 1, u, s, -1, i.stackedOnSmooth, l, i.connectNulls), o += u + 1, e.closePath();
      }
    }, t;
  })(nt)
);
function Nm(r, t, e, i, n) {
  var a = r.getArea(), o = a.x, s = a.y, l = a.width, u = a.height, f = e.get(["lineStyle", "width"]) || 0;
  o -= f / 2, s -= f / 2, l += f, u += f, l = Math.ceil(l), o !== Math.floor(o) && (o = Math.floor(o), l++);
  var h = new dt({
    shape: {
      x: o,
      y: s,
      width: l,
      height: u
    }
  });
  if (t) {
    var v = r.getBaseAxis(), c = v.isHorizontal(), p = v.inverse;
    c ? (p && (h.shape.x += l), h.shape.width = 0) : (p || (h.shape.y += u), h.shape.height = 0);
    var d = X(n) ? function(g) {
      n(g, h);
    } : null;
    Ee(h, {
      shape: {
        width: l,
        height: u,
        x: o,
        y: s
      }
    }, e, null, i, d);
  }
  return h;
}
function Fm(r, t, e) {
  var i = r.getArea(), n = wt(i.r0, 1), a = wt(i.r, 1), o = new Yi({
    shape: {
      cx: wt(r.cx, 1),
      cy: wt(r.cy, 1),
      r0: n,
      r: a,
      startAngle: i.startAngle,
      endAngle: i.endAngle,
      clockwise: i.clockwise
    }
  });
  if (t) {
    var s = r.getBaseAxis().dim === "angle";
    s ? o.shape.endAngle = i.startAngle : o.shape.r = n, Ee(o, {
      shape: {
        endAngle: i.endAngle,
        r: a
      }
    }, e);
  }
  return o;
}
function cM(r, t, e, i, n) {
  if (r) {
    if (r.type === "polar")
      return Fm(r, t, e);
    if (r.type === "cartesian2d")
      return Nm(r, t, e, i, n);
  } else return null;
  return null;
}
function Ki(r, t) {
  return r.type === t;
}
function cp(r, t) {
  if (r.length === t.length) {
    for (var e = 0; e < r.length; e++)
      if (r[e] !== t[e])
        return;
    return !0;
  }
}
function pp(r) {
  for (var t = 1 / 0, e = 1 / 0, i = -1 / 0, n = -1 / 0, a = 0; a < r.length; ) {
    var o = r[a++], s = r[a++];
    isNaN(o) || (t = Math.min(o, t), i = Math.max(o, i)), isNaN(s) || (e = Math.min(s, e), n = Math.max(s, n));
  }
  return [[t, e], [i, n]];
}
function dp(r, t) {
  var e = pp(r), i = e[0], n = e[1], a = pp(t), o = a[0], s = a[1];
  return Math.max(Math.abs(i[0] - o[0]), Math.abs(i[1] - o[1]), Math.abs(n[0] - s[0]), Math.abs(n[1] - s[1]));
}
function gp(r) {
  return ht(r) ? r : r ? 0.5 : 0;
}
function pM(r, t, e) {
  if (!e.valueDim)
    return [];
  for (var i = t.count(), n = Ve(i * 2), a = 0; a < i; a++) {
    var o = Om(e, r, t, a);
    n[a * 2] = o[0], n[a * 2 + 1] = o[1];
  }
  return n;
}
function rr(r, t, e, i, n) {
  var a = e.getBaseAxis(), o = a.dim === "x" || a.dim === "radius" ? 0 : 1, s = [], l = 0, u = [], f = [], h = [], v = [];
  if (n) {
    for (l = 0; l < r.length; l += 2) {
      var c = t || r;
      !isNaN(c[l]) && !isNaN(c[l + 1]) && v.push(r[l], r[l + 1]);
    }
    r = v;
  }
  for (l = 0; l < r.length - 2; l += 2)
    switch (h[0] = r[l + 2], h[1] = r[l + 3], f[0] = r[l], f[1] = r[l + 1], s.push(f[0], f[1]), i) {
      case "end":
        u[o] = h[o], u[1 - o] = f[1 - o], s.push(u[0], u[1]);
        break;
      case "middle":
        var p = (f[o] + h[o]) / 2, d = [];
        u[o] = d[o] = p, u[1 - o] = f[1 - o], d[1 - o] = h[1 - o], s.push(u[0], u[1]), s.push(d[0], d[1]);
        break;
      default:
        u[o] = f[o], u[1 - o] = h[1 - o], s.push(u[0], u[1]);
    }
  return s.push(r[l++], r[l++]), s;
}
function dM(r, t) {
  var e = [], i = r.length, n, a;
  function o(f, h, v) {
    var c = f.coord, p = (v - c) / (h.coord - c), d = D_(p, [f.color, h.color]);
    return {
      coord: v,
      color: d
    };
  }
  for (var s = 0; s < i; s++) {
    var l = r[s], u = l.coord;
    if (u < 0)
      n = l;
    else if (u > t) {
      a ? e.push(o(a, l, t)) : n && e.push(o(n, l, 0), o(n, l, t));
      break;
    } else
      n && (e.push(o(n, l, 0)), n = null), e.push(l), a = l;
  }
  return e;
}
function gM(r, t, e) {
  var i = r.getVisual("visualMeta");
  if (!(!i || !i.length || !r.count()) && t.type === "cartesian2d") {
    for (var n, a, o = i.length - 1; o >= 0; o--) {
      var s = r.getDimensionInfo(i[o].dimension);
      if (n = s && s.coordDim, n === "x" || n === "y") {
        a = i[o];
        break;
      }
    }
    if (a) {
      var l = t.getAxis(n), u = V(a.stops, function(_) {
        return {
          coord: l.toGlobalCoord(l.dataToCoord(_.value)),
          color: _.color
        };
      }), f = u.length, h = a.outerColors.slice();
      f && u[0].coord > u[f - 1].coord && (u.reverse(), h.reverse());
      var v = dM(u, n === "x" ? e.getWidth() : e.getHeight()), c = v.length;
      if (!c && f)
        return u[0].coord < 0 ? h[1] ? h[1] : u[f - 1].color : h[0] ? h[0] : u[0].color;
      var p = 10, d = v[0].coord - p, g = v[c - 1].coord + p, y = g - d;
      if (y < 1e-3)
        return "transparent";
      M(v, function(_) {
        _.offset = (_.coord - d) / y;
      }), v.push({
        // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
        offset: c ? v[c - 1].offset : 0.5,
        color: h[1] || "transparent"
      }), v.unshift({
        offset: c ? v[0].offset : 0.5,
        color: h[0] || "transparent"
      });
      var m = new kg(0, 0, 0, 0, v, !0);
      return m[n] = d, m[n + "2"] = g, m;
    }
  }
}
function yM(r, t, e) {
  var i = r.get("showAllSymbol"), n = i === "auto";
  if (!(i && !n)) {
    var a = e.getAxesByScale("ordinal")[0];
    if (a && !(n && mM(a, t))) {
      var o = t.mapDimension(a.dim), s = {};
      return M(a.getViewLabels(), function(l) {
        var u = a.scale.getRawOrdinalNumber(l.tickValue);
        s[u] = 1;
      }), function(l) {
        return !s.hasOwnProperty(t.get(o, l));
      };
    }
  }
}
function mM(r, t) {
  var e = r.getExtent(), i = Math.abs(e[1] - e[0]) / r.scale.count();
  isNaN(i) && (i = 0);
  for (var n = t.count(), a = Math.max(1, Math.round(n / 5)), o = 0; o < n; o += a)
    if (gh.getSymbolSize(
      t,
      o
      // Only for cartesian, where `isHorizontal` exists.
    )[r.isHorizontal() ? 1 : 0] * 1.5 > i)
      return !1;
  return !0;
}
function _M(r, t) {
  return isNaN(r) || isNaN(t);
}
function SM(r) {
  for (var t = r.length / 2; t > 0 && _M(r[t * 2 - 2], r[t * 2 - 1]); t--)
    ;
  return t - 1;
}
function yp(r, t) {
  return [r[t * 2], r[t * 2 + 1]];
}
function wM(r, t, e) {
  for (var i = r.length / 2, n = e === "x" ? 0 : 1, a, o, s = 0, l = -1, u = 0; u < i; u++)
    if (o = r[u * 2 + n], !(isNaN(o) || isNaN(r[u * 2 + 1 - n]))) {
      if (u === 0) {
        a = o;
        continue;
      }
      if (a <= t && o >= t || a >= t && o <= t) {
        l = u;
        break;
      }
      s = u, a = o;
    }
  return {
    range: [s, l],
    t: (t - a) / (o - a)
  };
}
function zm(r) {
  if (r.get(["endLabel", "show"]))
    return !0;
  for (var t = 0; t < le.length; t++)
    if (r.get([le[t], "endLabel", "show"]))
      return !0;
  return !1;
}
function zl(r, t, e, i) {
  if (Ki(t, "cartesian2d")) {
    var n = i.getModel("endLabel"), a = n.get("valueAnimation"), o = i.getData(), s = {
      lastFrameIndex: 0
    }, l = zm(i) ? function(c, p) {
      r._endLabelOnDuring(c, p, o, s, a, n, t);
    } : null, u = t.getBaseAxis().isHorizontal(), f = Nm(t, e, i, function() {
      var c = r._endLabel;
      c && e && s.originalX != null && c.attr({
        x: s.originalX,
        y: s.originalY
      });
    }, l);
    if (!i.get("clip", !0)) {
      var h = f.shape, v = Math.max(h.width, h.height);
      u ? (h.y -= v, h.height += v * 2) : (h.x -= v, h.width += v * 2);
    }
    return l && l(1, f), f;
  } else
    return Fm(t, e, i);
}
function bM(r, t) {
  var e = t.getBaseAxis(), i = e.isHorizontal(), n = e.inverse, a = i ? n ? "right" : "left" : "center", o = i ? "middle" : n ? "top" : "bottom";
  return {
    normal: {
      align: r.get("align") || a,
      verticalAlign: r.get("verticalAlign") || o
    }
  };
}
var xM = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.init = function() {
      var e = new gt(), i = new Em();
      this.group.add(i.group), this._symbolDraw = i, this._lineGroup = e, this._changePolyState = Z(this._changePolyState, this);
    }, t.prototype.render = function(e, i, n) {
      var a = e.coordinateSystem, o = this.group, s = e.getData(), l = e.getModel("lineStyle"), u = e.getModel("areaStyle"), f = s.getLayout("points") || [], h = a.type === "polar", v = this._coordSys, c = this._symbolDraw, p = this._polyline, d = this._polygon, g = this._lineGroup, y = !i.ssr && e.get("animation"), m = !u.isEmpty(), _ = u.get("origin"), S = km(a, s, _), b = m && pM(a, s, S), w = e.get("showSymbol"), x = e.get("connectNulls"), C = w && !h && yM(e, s, a), D = this._data;
      D && D.eachItemGraphicEl(function(yt, he) {
        yt.__temp && (o.remove(yt), D.setItemGraphicEl(he, null));
      }), w || c.remove(), o.add(g);
      var A = h ? !1 : e.get("step"), T;
      a && a.getArea && e.get("clip", !0) && (T = a.getArea(), T.width != null ? (T.x -= 0.1, T.y -= 0.1, T.width += 0.2, T.height += 0.2) : T.r0 && (T.r0 -= 0.5, T.r += 0.5)), this._clipShapeForSymbol = T;
      var L = gM(s, a, n) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(p && v.type === a.type && A === this._step))
        w && c.updateData(s, {
          isIgnore: C,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(yt) {
            return [f[yt * 2], f[yt * 2 + 1]];
          }
        }), y && this._initSymbolLabelAnimation(s, a, T), A && (b && (b = rr(b, f, a, A, x)), f = rr(f, null, a, A, x)), p = this._newPolyline(f), m ? d = this._newPolygon(f, b) : d && (g.remove(d), d = this._polygon = null), h || this._initOrUpdateEndLabel(e, a, Jr(L)), g.setClipPath(zl(this, a, !0, e));
      else {
        m && !d ? d = this._newPolygon(f, b) : d && !m && (g.remove(d), d = this._polygon = null), h || this._initOrUpdateEndLabel(e, a, Jr(L));
        var I = g.getClipPath();
        if (I) {
          var P = zl(this, a, !1, e);
          Ee(I, {
            shape: P.shape
          }, e);
        } else
          g.setClipPath(zl(this, a, !0, e));
        w && c.updateData(s, {
          isIgnore: C,
          clipShape: T,
          disableAnimation: !0,
          getSymbolPoint: function(yt) {
            return [f[yt * 2], f[yt * 2 + 1]];
          }
        }), (!cp(this._stackedOnPoints, b) || !cp(this._points, f)) && (y ? this._doUpdateAnimation(s, b, a, n, A, _, x) : (A && (b && (b = rr(b, f, a, A, x)), f = rr(f, null, a, A, x)), p.setShape({
          points: f
        }), d && d.setShape({
          points: f,
          stackedOnPoints: b
        })));
      }
      var R = e.getModel("emphasis"), E = R.get("focus"), H = R.get("blurScope"), B = R.get("disabled");
      if (p.useStyle(st(
        // Use color in lineStyle first
        l.getLineStyle(),
        {
          fill: "none",
          stroke: L,
          lineJoin: "bevel"
        }
      )), Po(p, e, "lineStyle"), p.style.lineWidth > 0 && e.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var F = p.getState("emphasis").style;
        F.lineWidth = +p.style.lineWidth + 1;
      }
      et(p).seriesIndex = e.seriesIndex, Fi(p, E, H, B);
      var W = gp(e.get("smooth")), K = e.get("smoothMonotone");
      if (p.setShape({
        smooth: W,
        smoothMonotone: K,
        connectNulls: x
      }), d) {
        var j = s.getCalculationInfo("stackedOnSeries"), ut = 0;
        d.useStyle(st(u.getAreaStyle(), {
          fill: L,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: s.getVisual("style").decal
        })), j && (ut = gp(j.get("smooth"))), d.setShape({
          smooth: W,
          stackedOnSmooth: ut,
          smoothMonotone: K,
          connectNulls: x
        }), Po(d, e, "areaStyle"), et(d).seriesIndex = e.seriesIndex, Fi(d, E, H, B);
      }
      var vt = this._changePolyState;
      s.eachItemGraphicEl(function(yt) {
        yt && (yt.onHoverStateChange = vt);
      }), this._polyline.onHoverStateChange = vt, this._data = s, this._coordSys = a, this._stackedOnPoints = b, this._points = f, this._step = A, this._valueOrigin = _, e.get("triggerLineEvent") && (this.packEventData(e, p), d && this.packEventData(e, d));
    }, t.prototype.packEventData = function(e, i) {
      et(i).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: e.componentIndex,
        seriesIndex: e.seriesIndex,
        seriesName: e.name,
        seriesType: "line"
      };
    }, t.prototype.highlight = function(e, i, n, a) {
      var o = e.getData(), s = qr(o, a);
      if (this._changePolyState("emphasis"), !(s instanceof Array) && s != null && s >= 0) {
        var l = o.getLayout("points"), u = o.getItemGraphicEl(s);
        if (!u) {
          var f = l[s * 2], h = l[s * 2 + 1];
          if (isNaN(f) || isNaN(h) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(f, h))
            return;
          var v = e.get("zlevel") || 0, c = e.get("z") || 0;
          u = new gh(o, s), u.x = f, u.y = h, u.setZ(v, c);
          var p = u.getSymbolPath().getTextContent();
          p && (p.zlevel = v, p.z = c, p.z2 = this._polyline.z2 + 1), u.__temp = !0, o.setItemGraphicEl(s, u), u.stopSymbolAnimation(!0), this.group.add(u);
        }
        u.highlight();
      } else
        se.prototype.highlight.call(this, e, i, n, a);
    }, t.prototype.downplay = function(e, i, n, a) {
      var o = e.getData(), s = qr(o, a);
      if (this._changePolyState("normal"), s != null && s >= 0) {
        var l = o.getItemGraphicEl(s);
        l && (l.__temp ? (o.setItemGraphicEl(s, null), this.group.remove(l)) : l.downplay());
      } else
        se.prototype.downplay.call(this, e, i, n, a);
    }, t.prototype._changePolyState = function(e) {
      var i = this._polygon;
      Av(this._polyline, e), i && Av(i, e);
    }, t.prototype._newPolyline = function(e) {
      var i = this._polyline;
      return i && this._lineGroup.remove(i), i = new fM({
        shape: {
          points: e
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(i), this._polyline = i, i;
    }, t.prototype._newPolygon = function(e, i) {
      var n = this._polygon;
      return n && this._lineGroup.remove(n), n = new vM({
        shape: {
          points: e,
          stackedOnPoints: i
        },
        segmentIgnoreThreshold: 2
      }), this._lineGroup.add(n), this._polygon = n, n;
    }, t.prototype._initSymbolLabelAnimation = function(e, i, n) {
      var a, o, s = i.getBaseAxis(), l = s.inverse;
      i.type === "cartesian2d" ? (a = s.isHorizontal(), o = !1) : i.type === "polar" && (a = s.dim === "angle", o = !0);
      var u = e.hostModel, f = u.get("animationDuration");
      X(f) && (f = f(null));
      var h = u.get("animationDelay") || 0, v = X(h) ? h(null) : h;
      e.eachItemGraphicEl(function(c, p) {
        var d = c;
        if (d) {
          var g = [c.x, c.y], y = void 0, m = void 0, _ = void 0;
          if (n)
            if (o) {
              var S = n, b = i.pointToCoord(g);
              a ? (y = S.startAngle, m = S.endAngle, _ = -b[1] / 180 * Math.PI) : (y = S.r0, m = S.r, _ = b[0]);
            } else {
              var w = n;
              a ? (y = w.x, m = w.x + w.width, _ = c.x) : (y = w.y + w.height, m = w.y, _ = c.y);
            }
          var x = m === y ? 0 : (_ - y) / (m - y);
          l && (x = 1 - x);
          var C = X(h) ? h(p) : f * x + v, D = d.getSymbolPath(), A = D.getTextContent();
          d.attr({
            scaleX: 0,
            scaleY: 0
          }), d.animateTo({
            scaleX: 1,
            scaleY: 1
          }, {
            duration: 200,
            setToFinal: !0,
            delay: C
          }), A && A.animateFrom({
            style: {
              opacity: 0
            }
          }, {
            duration: 300,
            delay: C
          }), D.disableLabelAnimation = !0;
        }
      });
    }, t.prototype._initOrUpdateEndLabel = function(e, i, n) {
      var a = e.getModel("endLabel");
      if (zm(e)) {
        var o = e.getData(), s = this._polyline, l = o.getLayout("points");
        if (!l) {
          s.removeTextContent(), this._endLabel = null;
          return;
        }
        var u = this._endLabel;
        u || (u = this._endLabel = new kt({
          z2: 200
          // should be higher than item symbol
        }), u.ignoreClip = !0, s.setTextContent(this._endLabel), s.disableLabelAnimation = !0);
        var f = SM(l);
        f >= 0 && (Zi(s, ri(e, "endLabel"), {
          inheritColor: n,
          labelFetcher: e,
          labelDataIndex: f,
          defaultText: function(h, v, c) {
            return c != null ? Rm(o, c) : dh(o, h);
          },
          enableTextSetter: !0
        }, bM(a, i)), s.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, t.prototype._endLabelOnDuring = function(e, i, n, a, o, s, l) {
      var u = this._endLabel, f = this._polyline;
      if (u) {
        e < 1 && a.originalX == null && (a.originalX = u.x, a.originalY = u.y);
        var h = n.getLayout("points"), v = n.hostModel, c = v.get("connectNulls"), p = s.get("precision"), d = s.get("distance") || 0, g = l.getBaseAxis(), y = g.isHorizontal(), m = g.inverse, _ = i.shape, S = m ? y ? _.x : _.y + _.height : y ? _.x + _.width : _.y, b = (y ? d : 0) * (m ? -1 : 1), w = (y ? 0 : -d) * (m ? -1 : 1), x = y ? "x" : "y", C = wM(h, S, x), D = C.range, A = D[1] - D[0], T = void 0;
        if (A >= 1) {
          if (A > 1 && !c) {
            var L = yp(h, D[0]);
            u.attr({
              x: L[0] + b,
              y: L[1] + w
            }), o && (T = v.getRawValue(D[0]));
          } else {
            var L = f.getPointOn(S, x);
            L && u.attr({
              x: L[0] + b,
              y: L[1] + w
            });
            var I = v.getRawValue(D[0]), P = v.getRawValue(D[1]);
            o && (T = b1(n, p, I, P, C.t));
          }
          a.lastFrameIndex = D[0];
        } else {
          var R = e === 1 || a.lastFrameIndex > 0 ? D[0] : 0, L = yp(h, R);
          o && (T = v.getRawValue(R)), u.attr({
            x: L[0] + b,
            y: L[1] + w
          });
        }
        if (o) {
          var E = cs(u);
          typeof E.setLabelText == "function" && E.setLabelText(T);
        }
      }
    }, t.prototype._doUpdateAnimation = function(e, i, n, a, o, s, l) {
      var u = this._polyline, f = this._polygon, h = e.hostModel, v = uM(this._data, e, this._stackedOnPoints, i, this._coordSys, n, this._valueOrigin), c = v.current, p = v.stackedOnCurrent, d = v.next, g = v.stackedOnNext;
      if (o && (p = rr(v.stackedOnCurrent, v.current, n, o, l), c = rr(v.current, null, n, o, l), g = rr(v.stackedOnNext, v.next, n, o, l), d = rr(v.next, null, n, o, l)), dp(c, d) > 3e3 || f && dp(p, g) > 3e3) {
        u.stopAnimation(), u.setShape({
          points: d
        }), f && (f.stopAnimation(), f.setShape({
          points: d,
          stackedOnPoints: g
        }));
        return;
      }
      u.shape.__points = v.current, u.shape.points = c;
      var y = {
        shape: {
          points: d
        }
      };
      v.current !== c && (y.shape.__points = v.next), u.stopAnimation(), Ot(u, y, h), f && (f.setShape({
        // Reuse the points with polyline.
        points: c,
        stackedOnPoints: p
      }), f.stopAnimation(), Ot(f, {
        shape: {
          stackedOnPoints: g
        }
      }, h), u.shape.points !== f.shape.points && (f.shape.points = u.shape.points));
      for (var m = [], _ = v.status, S = 0; S < _.length; S++) {
        var b = _[S].cmd;
        if (b === "=") {
          var w = e.getItemGraphicEl(_[S].idx1);
          w && m.push({
            el: w,
            ptIdx: S
            // Index of points
          });
        }
      }
      u.animators && u.animators.length && u.animators[0].during(function() {
        f && f.dirtyShape();
        for (var x = u.shape.__points, C = 0; C < m.length; C++) {
          var D = m[C].el, A = m[C].ptIdx * 2;
          D.x = x[A], D.y = x[A + 1], D.markRedraw();
        }
      });
    }, t.prototype.remove = function(e) {
      var i = this.group, n = this._data;
      this._lineGroup.removeAll(), this._symbolDraw.remove(!0), n && n.eachItemGraphicEl(function(a, o) {
        a.__temp && (i.remove(a), n.setItemGraphicEl(o, null));
      }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
    }, t.type = "line", t;
  })(se)
);
function yh(r, t) {
  return {
    seriesType: r,
    plan: eh(),
    reset: function(e) {
      var i = e.getData(), n = e.coordinateSystem, a = e.pipelineContext, o = t || a.large;
      if (n) {
        var s = V(n.dimensions, function(c) {
          return i.mapDimension(c);
        }).slice(0, 2), l = s.length, u = i.getCalculationInfo("stackResultDimension");
        ti(i, s[0]) && (s[0] = u), ti(i, s[1]) && (s[1] = u);
        var f = i.getStore(), h = i.getDimensionIndex(s[0]), v = i.getDimensionIndex(s[1]);
        return l && {
          progress: function(c, p) {
            for (var d = c.end - c.start, g = o && Ve(d * l), y = [], m = [], _ = c.start, S = 0; _ < c.end; _++) {
              var b = void 0;
              if (l === 1) {
                var w = f.get(h, _);
                b = n.dataToPoint(w, null, m);
              } else
                y[0] = f.get(h, _), y[1] = f.get(v, _), b = n.dataToPoint(y, null, m);
              o ? (g[S++] = b[0], g[S++] = b[1]) : p.setItemLayout(_, b.slice());
            }
            o && p.setLayout("points", g);
          }
        };
      }
    }
  };
}
var TM = {
  average: function(r) {
    for (var t = 0, e = 0, i = 0; i < r.length; i++)
      isNaN(r[i]) || (t += r[i], e++);
    return e === 0 ? NaN : t / e;
  },
  sum: function(r) {
    for (var t = 0, e = 0; e < r.length; e++)
      t += r[e] || 0;
    return t;
  },
  max: function(r) {
    for (var t = -1 / 0, e = 0; e < r.length; e++)
      r[e] > t && (t = r[e]);
    return isFinite(t) ? t : NaN;
  },
  min: function(r) {
    for (var t = 1 / 0, e = 0; e < r.length; e++)
      r[e] < t && (t = r[e]);
    return isFinite(t) ? t : NaN;
  },
  // TODO
  // Median
  nearest: function(r) {
    return r[0];
  }
}, CM = function(r) {
  return Math.round(r.length / 2);
};
function Vm(r) {
  return {
    seriesType: r,
    // FIXME:TS never used, so comment it
    // modifyOutputEnd: true,
    reset: function(t, e, i) {
      var n = t.getData(), a = t.get("sampling"), o = t.coordinateSystem, s = n.count();
      if (s > 10 && o.type === "cartesian2d" && a) {
        var l = o.getBaseAxis(), u = o.getOtherAxis(l), f = l.getExtent(), h = i.getDevicePixelRatio(), v = Math.abs(f[1] - f[0]) * (h || 1), c = Math.round(s / v);
        if (isFinite(c) && c > 1) {
          a === "lttb" ? t.setData(n.lttbDownSample(n.mapDimension(u.dim), 1 / c)) : a === "minmax" && t.setData(n.minmaxDownSample(n.mapDimension(u.dim), 1 / c));
          var p = void 0;
          z(a) ? p = TM[a] : X(a) && (p = a), p && t.setData(n.downSample(n.mapDimension(u.dim), 1 / c, p, CM));
        }
      }
    }
  };
}
function MM(r) {
  r.registerChartView(xM), r.registerSeriesModel(aM), r.registerLayout(yh("line", !0)), r.registerVisual({
    seriesType: "line",
    reset: function(t) {
      var e = t.getData(), i = t.getModel("lineStyle").getLineStyle();
      i && !i.stroke && (i.stroke = e.getVisual("style").fill), e.setVisual("legendLineStyle", i);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, Vm("line"));
}
var ju = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function(e, i) {
      return Ds(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getMarkerPosition = function(e, i, n) {
      var a = this.coordinateSystem;
      if (a && a.clampData) {
        var o = a.clampData(e), s = a.dataToPoint(o);
        if (n)
          M(a.getAxes(), function(v, c) {
            if (v.type === "category" && i != null) {
              var p = v.getTicksCoords(), d = v.getTickModel().get("alignWithLabel"), g = o[c], y = i[c] === "x1" || i[c] === "y1";
              if (y && !d && (g += 1), p.length < 2)
                return;
              if (p.length === 2) {
                s[c] = v.toGlobalCoord(v.getExtent()[y ? 1 : 0]);
                return;
              }
              for (var m = void 0, _ = void 0, S = 1, b = 0; b < p.length; b++) {
                var w = p[b].coord, x = b === p.length - 1 ? p[b - 1].tickValue + S : p[b].tickValue;
                if (x === g) {
                  _ = w;
                  break;
                } else if (x < g)
                  m = w;
                else if (m != null && x > g) {
                  _ = (w + m) / 2;
                  break;
                }
                b === 1 && (S = x - p[0].tickValue);
              }
              _ == null && (m ? m && (_ = p[p.length - 1].coord) : _ = p[0].coord), s[c] = v.toGlobalCoord(_);
            }
          });
        else {
          var l = this.getData(), u = l.getLayout("offset"), f = l.getLayout("size"), h = a.getBaseAxis().isHorizontal() ? 0 : 1;
          s[h] += u + f / 2;
        }
        return s;
      }
      return [NaN, NaN];
    }, t.type = "series.__base_bar__", t.defaultOption = {
      // zlevel: 0,
      z: 2,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      // stack: null
      // Cartesian coordinate system
      // xAxisIndex: 0,
      // yAxisIndex: 0,
      barMinHeight: 0,
      barMinAngle: 0,
      // cursor: null,
      large: !1,
      largeThreshold: 400,
      progressive: 3e3,
      progressiveChunkMode: "mod"
    }, t;
  })(ye)
);
ye.registerClass(ju);
var DM = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.getInitialData = function() {
      return Ds(null, this, {
        useEncodeDefaulter: !0,
        createInvertedIndices: !!this.get("realtimeSort", !0) || null
      });
    }, t.prototype.getProgressive = function() {
      return this.get("large") ? this.get("progressive") : !1;
    }, t.prototype.getProgressiveThreshold = function() {
      var e = this.get("progressiveThreshold"), i = this.get("largeThreshold");
      return i > e && (e = i), e;
    }, t.prototype.brushSelector = function(e, i, n) {
      return n.rect(i.getItemLayout(e));
    }, t.type = "series.bar", t.dependencies = ["grid", "polar"], t.defaultOption = ds(ju.defaultOption, {
      // If clipped
      // Only available on cartesian2d
      clip: !0,
      roundCap: !1,
      showBackground: !1,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
        borderColor: null,
        borderWidth: 0,
        borderType: "solid",
        borderRadius: 0,
        shadowBlur: 0,
        shadowColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 1
      },
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      },
      realtimeSort: !1
    }), t;
  })(ju)
), AM = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
    }
    return r;
  })()
), mp = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "sausage", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new AM();
    }, t.prototype.buildPath = function(e, i) {
      var n = i.cx, a = i.cy, o = Math.max(i.r0 || 0, 0), s = Math.max(i.r, 0), l = (s - o) * 0.5, u = o + l, f = i.startAngle, h = i.endAngle, v = i.clockwise, c = Math.PI * 2, p = v ? h - f < c : f - h < c;
      p || (f = h - (v ? c : -c));
      var d = Math.cos(f), g = Math.sin(f), y = Math.cos(h), m = Math.sin(h);
      p ? (e.moveTo(d * o + n, g * o + a), e.arc(d * u + n, g * u + a, l, -Math.PI + f, f, !v)) : e.moveTo(d * s + n, g * s + a), e.arc(n, a, s, f, h, !v), e.arc(y * u + n, m * u + a, l, h - Math.PI * 2, h - Math.PI, !v), o !== 0 && e.arc(n, a, o, h, f, v);
    }, t;
  })(nt)
);
function LM(r, t) {
  t = t || {};
  var e = t.isRoundCap;
  return function(i, n, a) {
    var o = n.position;
    if (!o || o instanceof Array)
      return Mo(i, n, a);
    var s = r(o), l = n.distance != null ? n.distance : 5, u = this.shape, f = u.cx, h = u.cy, v = u.r, c = u.r0, p = (v + c) / 2, d = u.startAngle, g = u.endAngle, y = (d + g) / 2, m = e ? Math.abs(v - c) / 2 : 0, _ = Math.cos, S = Math.sin, b = f + v * _(d), w = h + v * S(d), x = "left", C = "top";
    switch (s) {
      case "startArc":
        b = f + (c - l) * _(y), w = h + (c - l) * S(y), x = "center", C = "top";
        break;
      case "insideStartArc":
        b = f + (c + l) * _(y), w = h + (c + l) * S(y), x = "center", C = "bottom";
        break;
      case "startAngle":
        b = f + p * _(d) + Za(d, l + m, !1), w = h + p * S(d) + Xa(d, l + m, !1), x = "right", C = "middle";
        break;
      case "insideStartAngle":
        b = f + p * _(d) + Za(d, -l + m, !1), w = h + p * S(d) + Xa(d, -l + m, !1), x = "left", C = "middle";
        break;
      case "middle":
        b = f + p * _(y), w = h + p * S(y), x = "center", C = "middle";
        break;
      case "endArc":
        b = f + (v + l) * _(y), w = h + (v + l) * S(y), x = "center", C = "bottom";
        break;
      case "insideEndArc":
        b = f + (v - l) * _(y), w = h + (v - l) * S(y), x = "center", C = "top";
        break;
      case "endAngle":
        b = f + p * _(g) + Za(g, l + m, !0), w = h + p * S(g) + Xa(g, l + m, !0), x = "left", C = "middle";
        break;
      case "insideEndAngle":
        b = f + p * _(g) + Za(g, -l + m, !0), w = h + p * S(g) + Xa(g, -l + m, !0), x = "right", C = "middle";
        break;
      default:
        return Mo(i, n, a);
    }
    return i = i || {}, i.x = b, i.y = w, i.align = x, i.verticalAlign = C, i;
  };
}
function IM(r, t, e, i) {
  if (ht(i)) {
    r.setTextConfig({
      rotation: i
    });
    return;
  } else if (N(t)) {
    r.setTextConfig({
      rotation: 0
    });
    return;
  }
  var n = r.shape, a = n.clockwise ? n.startAngle : n.endAngle, o = n.clockwise ? n.endAngle : n.startAngle, s = (a + o) / 2, l, u = e(t);
  switch (u) {
    case "startArc":
    case "insideStartArc":
    case "middle":
    case "insideEndArc":
    case "endArc":
      l = s;
      break;
    case "startAngle":
    case "insideStartAngle":
      l = a;
      break;
    case "endAngle":
    case "insideEndAngle":
      l = o;
      break;
    default:
      r.setTextConfig({
        rotation: 0
      });
      return;
  }
  var f = Math.PI * 1.5 - l;
  u === "middle" && f > Math.PI / 2 && f < Math.PI * 1.5 && (f -= Math.PI), r.setTextConfig({
    rotation: f
  });
}
function Za(r, t, e) {
  return t * Math.sin(r) * (e ? -1 : 1);
}
function Xa(r, t, e) {
  return t * Math.cos(r) * (e ? 1 : -1);
}
function PM(r, t, e) {
  var i = r.get("borderRadius");
  if (i == null)
    return {
      cornerRadius: 0
    };
  N(i) || (i = [i, i, i, i]);
  var n = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: V(i, function(a) {
      return cr(a, n);
    })
  };
}
var Vl = Math.max, Hl = Math.min;
function RM(r, t) {
  var e = r.getArea && r.getArea();
  if (Ki(r, "cartesian2d")) {
    var i = r.getBaseAxis();
    if (i.type !== "category" || !i.onBand) {
      var n = t.getLayout("bandWidth");
      i.isHorizontal() ? (e.x -= n, e.width += n * 2) : (e.y -= n, e.height += n * 2);
    }
  }
  return e;
}
var EM = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r.call(this) || this;
      return e.type = t.type, e._isFirstFrame = !0, e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this._model = e, this._removeOnRenderedListener(n), this._updateDrawMode(e);
      var o = e.get("coordinateSystem");
      (o === "cartesian2d" || o === "polar") && (this._progressiveEls = null, this._isLargeDraw ? this._renderLarge(e, i, n) : this._renderNormal(e, i, n, a));
    }, t.prototype.incrementalPrepareRender = function(e) {
      this._clear(), this._updateDrawMode(e), this._updateLargeClip(e);
    }, t.prototype.incrementalRender = function(e, i) {
      this._progressiveEls = [], this._incrementalRenderLarge(e, i);
    }, t.prototype.eachRendered = function(e) {
      ua(this._progressiveEls || this.group, e);
    }, t.prototype._updateDrawMode = function(e) {
      var i = e.pipelineContext.large;
      (this._isLargeDraw == null || i !== this._isLargeDraw) && (this._isLargeDraw = i, this._clear());
    }, t.prototype._renderNormal = function(e, i, n, a) {
      var o = this.group, s = e.getData(), l = this._data, u = e.coordinateSystem, f = u.getBaseAxis(), h;
      u.type === "cartesian2d" ? h = f.isHorizontal() : u.type === "polar" && (h = f.dim === "angle");
      var v = e.isAnimationEnabled() ? e : null, c = kM(e, u);
      c && this._enableRealtimeSort(c, s, n);
      var p = e.get("clip", !0) || c, d = RM(u, s);
      o.removeClipPath();
      var g = e.get("roundCap", !0), y = e.get("showBackground", !0), m = e.getModel("backgroundStyle"), _ = m.get("borderRadius") || 0, S = [], b = this._backgroundEls, w = a && a.isInitSort, x = a && a.type === "changeAxisOrder";
      function C(T) {
        var L = $a[u.type](s, T), I = HM(u, h, L);
        return I.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? I.setShape("r", _) : I.setShape("cornerRadius", _), S[T] = I, I;
      }
      s.diff(l).add(function(T) {
        var L = s.getItemModel(T), I = $a[u.type](s, T, L);
        if (y && C(T), !(!s.hasValue(T) || !xp[u.type](I))) {
          var P = !1;
          p && (P = _p[u.type](d, I));
          var R = Sp[u.type](e, s, T, I, h, v, f.model, !1, g);
          c && (R.forceLabelAnimation = !0), Tp(R, s, T, L, I, e, h, u.type === "polar"), w ? R.attr({
            shape: I
          }) : c ? wp(c, v, R, I, T, h, !1, !1) : Ee(R, {
            shape: I
          }, e, T), s.setItemGraphicEl(T, R), o.add(R), R.ignore = P;
        }
      }).update(function(T, L) {
        var I = s.getItemModel(T), P = $a[u.type](s, T, I);
        if (y) {
          var R = void 0;
          b.length === 0 ? R = C(L) : (R = b[L], R.useStyle(m.getItemStyle()), u.type === "cartesian2d" ? R.setShape("r", _) : R.setShape("cornerRadius", _), S[T] = R);
          var E = $a[u.type](s, T), H = Gm(h, E, u);
          Ot(R, {
            shape: H
          }, v, T);
        }
        var B = l.getItemGraphicEl(L);
        if (!s.hasValue(T) || !xp[u.type](P)) {
          o.remove(B);
          return;
        }
        var F = !1;
        if (p && (F = _p[u.type](d, P), F && o.remove(B)), B ? Og(B) : B = Sp[u.type](e, s, T, P, h, v, f.model, !!B, g), c && (B.forceLabelAnimation = !0), x) {
          var W = B.getTextContent();
          if (W) {
            var K = cs(W);
            K.prevValue != null && (K.prevValue = K.value);
          }
        } else
          Tp(B, s, T, I, P, e, h, u.type === "polar");
        w ? B.attr({
          shape: P
        }) : c ? wp(c, v, B, P, T, h, !0, x) : Ot(B, {
          shape: P
        }, e, T, null), s.setItemGraphicEl(T, B), B.ignore = F, o.add(B);
      }).remove(function(T) {
        var L = l.getItemGraphicEl(T);
        L && Ou(L, e, T);
      }).execute();
      var D = this._backgroundGroup || (this._backgroundGroup = new gt());
      D.removeAll();
      for (var A = 0; A < S.length; ++A)
        D.add(S[A]);
      o.add(D), this._backgroundEls = S, this._data = s;
    }, t.prototype._renderLarge = function(e, i, n) {
      this._clear(), Mp(e, this.group), this._updateLargeClip(e);
    }, t.prototype._incrementalRenderLarge = function(e, i) {
      this._removeBackground(), Mp(i, this.group, this._progressiveEls, !0);
    }, t.prototype._updateLargeClip = function(e) {
      var i = e.get("clip", !0) && cM(e.coordinateSystem, !1, e), n = this.group;
      i ? n.setClipPath(i) : n.removeClipPath();
    }, t.prototype._enableRealtimeSort = function(e, i, n) {
      var a = this;
      if (i.count()) {
        var o = e.baseAxis;
        if (this._isFirstFrame)
          this._dispatchInitSort(i, e, n), this._isFirstFrame = !1;
        else {
          var s = function(l) {
            var u = i.getItemGraphicEl(l), f = u && u.shape;
            return f && // The result should be consistent with the initial sort by data value.
            // Do not support the case that both positive and negative exist.
            Math.abs(o.isHorizontal() ? f.height : f.width) || 0;
          };
          this._onRendered = function() {
            a._updateSortWithinSameData(i, s, o, n);
          }, n.getZr().on("rendered", this._onRendered);
        }
      }
    }, t.prototype._dataSort = function(e, i, n) {
      var a = [];
      return e.each(e.mapDimension(i.dim), function(o, s) {
        var l = n(s);
        l = l ?? NaN, a.push({
          dataIndex: s,
          mappedValue: l,
          ordinalNumber: o
        });
      }), a.sort(function(o, s) {
        return s.mappedValue - o.mappedValue;
      }), {
        ordinalNumbers: V(a, function(o) {
          return o.ordinalNumber;
        })
      };
    }, t.prototype._isOrderChangedWithinSameData = function(e, i, n) {
      for (var a = n.scale, o = e.mapDimension(n.dim), s = Number.MAX_VALUE, l = 0, u = a.getOrdinalMeta().categories.length; l < u; ++l) {
        var f = e.rawIndexOf(o, a.getRawOrdinalNumber(l)), h = f < 0 ? Number.MIN_VALUE : i(e.indexOfRawIndex(f));
        if (h > s)
          return !0;
        s = h;
      }
      return !1;
    }, t.prototype._isOrderDifferentInView = function(e, i) {
      for (var n = i.scale, a = n.getExtent(), o = Math.max(0, a[0]), s = Math.min(a[1], n.getOrdinalMeta().categories.length - 1); o <= s; ++o)
        if (e.ordinalNumbers[o] !== n.getRawOrdinalNumber(o))
          return !0;
    }, t.prototype._updateSortWithinSameData = function(e, i, n, a) {
      if (this._isOrderChangedWithinSameData(e, i, n)) {
        var o = this._dataSort(e, n, i);
        this._isOrderDifferentInView(o, n) && (this._removeOnRenderedListener(a), a.dispatchAction({
          type: "changeAxisOrder",
          componentType: n.dim + "Axis",
          axisId: n.index,
          sortInfo: o
        }));
      }
    }, t.prototype._dispatchInitSort = function(e, i, n) {
      var a = i.baseAxis, o = this._dataSort(e, a, function(s) {
        return e.get(e.mapDimension(i.otherAxis.dim), s);
      });
      n.dispatchAction({
        type: "changeAxisOrder",
        componentType: a.dim + "Axis",
        isInitSort: !0,
        axisId: a.index,
        sortInfo: o
      });
    }, t.prototype.remove = function(e, i) {
      this._clear(this._model), this._removeOnRenderedListener(i);
    }, t.prototype.dispose = function(e, i) {
      this._removeOnRenderedListener(i);
    }, t.prototype._removeOnRenderedListener = function(e) {
      this._onRendered && (e.getZr().off("rendered", this._onRendered), this._onRendered = null);
    }, t.prototype._clear = function(e) {
      var i = this.group, n = this._data;
      e && e.isAnimationEnabled() && n && !this._isLargeDraw ? (this._removeBackground(), this._backgroundEls = [], n.eachItemGraphicEl(function(a) {
        Ou(a, e, et(a).dataIndex);
      })) : i.removeAll(), this._data = null, this._isFirstFrame = !0;
    }, t.prototype._removeBackground = function() {
      this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
    }, t.type = "bar", t;
  })(se)
), _p = {
  cartesian2d: function(r, t) {
    var e = t.width < 0 ? -1 : 1, i = t.height < 0 ? -1 : 1;
    e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height);
    var n = r.x + r.width, a = r.y + r.height, o = Vl(t.x, r.x), s = Hl(t.x + t.width, n), l = Vl(t.y, r.y), u = Hl(t.y + t.height, a), f = s < o, h = u < l;
    return t.x = f && o > n ? s : o, t.y = h && l > a ? u : l, t.width = f ? 0 : s - o, t.height = h ? 0 : u - l, e < 0 && (t.x += t.width, t.width = -t.width), i < 0 && (t.y += t.height, t.height = -t.height), f || h;
  },
  polar: function(r, t) {
    var e = t.r0 <= t.r ? 1 : -1;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    var n = Hl(t.r, r.r), a = Vl(t.r0, r.r0);
    t.r = n, t.r0 = a;
    var o = n - a < 0;
    if (e < 0) {
      var i = t.r;
      t.r = t.r0, t.r0 = i;
    }
    return o;
  }
}, Sp = {
  cartesian2d: function(r, t, e, i, n, a, o, s, l) {
    var u = new dt({
      shape: O({}, i),
      z2: 1
    });
    if (u.__dataIndex = e, u.name = "item", a) {
      var f = u.shape, h = n ? "height" : "width";
      f[h] = 0;
    }
    return u;
  },
  polar: function(r, t, e, i, n, a, o, s, l) {
    var u = !n && l ? mp : Yi, f = new u({
      shape: i,
      z2: 1
    });
    f.name = "item";
    var h = Hm(n);
    if (f.calculateTextPosition = LM(h, {
      isRoundCap: u === mp
    }), a) {
      var v = f.shape, c = n ? "r" : "endAngle", p = {};
      v[c] = n ? i.r0 : i.startAngle, p[c] = i[c], (s ? Ot : Ee)(f, {
        shape: p
        // __value: typeof dataValue === 'string' ? parseInt(dataValue, 10) : dataValue
      }, a);
    }
    return f;
  }
};
function kM(r, t) {
  var e = r.get("realtimeSort", !0), i = t.getBaseAxis();
  if (e && i.type === "category" && t.type === "cartesian2d")
    return {
      baseAxis: i,
      otherAxis: t.getOtherAxis(i)
    };
}
function wp(r, t, e, i, n, a, o, s) {
  var l, u;
  a ? (u = {
    x: i.x,
    width: i.width
  }, l = {
    y: i.y,
    height: i.height
  }) : (u = {
    y: i.y,
    height: i.height
  }, l = {
    x: i.x,
    width: i.width
  }), s || (o ? Ot : Ee)(e, {
    shape: l
  }, t, n, null);
  var f = t ? r.baseAxis.model : null;
  (o ? Ot : Ee)(e, {
    shape: u
  }, f, n);
}
function bp(r, t) {
  for (var e = 0; e < t.length; e++)
    if (!isFinite(r[t[e]]))
      return !0;
  return !1;
}
var OM = ["x", "y", "width", "height"], BM = ["cx", "cy", "r", "startAngle", "endAngle"], xp = {
  cartesian2d: function(r) {
    return !bp(r, OM);
  },
  polar: function(r) {
    return !bp(r, BM);
  }
}, $a = {
  // itemModel is only used to get borderWidth, which is not needed
  // when calculating bar background layout.
  cartesian2d: function(r, t, e) {
    var i = r.getItemLayout(t), n = e ? FM(e, i) : 0, a = i.width > 0 ? 1 : -1, o = i.height > 0 ? 1 : -1;
    return {
      x: i.x + a * n / 2,
      y: i.y + o * n / 2,
      width: i.width - a * n,
      height: i.height - o * n
    };
  },
  polar: function(r, t, e) {
    var i = r.getItemLayout(t);
    return {
      cx: i.cx,
      cy: i.cy,
      r0: i.r0,
      r: i.r,
      startAngle: i.startAngle,
      endAngle: i.endAngle,
      clockwise: i.clockwise
    };
  }
};
function NM(r) {
  return r.startAngle != null && r.endAngle != null && r.startAngle === r.endAngle;
}
function Hm(r) {
  return /* @__PURE__ */ (function(t) {
    var e = t ? "Arc" : "Angle";
    return function(i) {
      switch (i) {
        case "start":
        case "insideStart":
        case "end":
        case "insideEnd":
          return i + e;
        default:
          return i;
      }
    };
  })(r);
}
function Tp(r, t, e, i, n, a, o, s) {
  var l = t.getItemVisual(e, "style");
  if (s) {
    if (!a.get("roundCap")) {
      var f = r.shape, h = PM(i.getModel("itemStyle"), f);
      O(f, h), r.setShape(f);
    }
  } else {
    var u = i.get(["itemStyle", "borderRadius"]) || 0;
    r.setShape("r", u);
  }
  r.useStyle(l);
  var v = i.getShallow("cursor");
  v && r.attr("cursor", v);
  var c = s ? o ? n.r >= n.r0 ? "endArc" : "startArc" : n.endAngle >= n.startAngle ? "endAngle" : "startAngle" : o ? n.height >= 0 ? "bottom" : "top" : n.width >= 0 ? "right" : "left", p = ri(i);
  Zi(r, p, {
    labelFetcher: a,
    labelDataIndex: e,
    defaultText: dh(a.getData(), e),
    inheritColor: l.fill,
    defaultOpacity: l.opacity,
    defaultOutsidePosition: c
  });
  var d = r.getTextContent();
  if (s && d) {
    var g = i.get(["label", "position"]);
    r.textConfig.inside = g === "middle" ? !0 : null, IM(r, g === "outside" ? c : g, Hm(o), i.get(["label", "rotate"]));
  }
  kw(d, p, a.getRawValue(e), function(m) {
    return Rm(t, m);
  });
  var y = i.getModel(["emphasis"]);
  Fi(r, y.get("focus"), y.get("blurScope"), y.get("disabled")), Po(r, i), NM(n) && (r.style.fill = "none", r.style.stroke = "none", M(r.states, function(m) {
    m.style && (m.style.fill = m.style.stroke = "none");
  }));
}
function FM(r, t) {
  var e = r.get(["itemStyle", "borderColor"]);
  if (!e || e === "none")
    return 0;
  var i = r.get(["itemStyle", "borderWidth"]) || 0, n = isNaN(t.width) ? Number.MAX_VALUE : Math.abs(t.width), a = isNaN(t.height) ? Number.MAX_VALUE : Math.abs(t.height);
  return Math.min(i, n, a);
}
var zM = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r() {
    }
    return r;
  })()
), Cp = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "largeBar", i;
    }
    return t.prototype.getDefaultShape = function() {
      return new zM();
    }, t.prototype.buildPath = function(e, i) {
      for (var n = i.points, a = this.baseDimIdx, o = 1 - this.baseDimIdx, s = [], l = [], u = this.barWidth, f = 0; f < n.length; f += 3)
        l[a] = u, l[o] = n[f + 2], s[a] = n[f + a], s[o] = n[f + o], e.rect(s[0], s[1], l[0], l[1]);
    }, t;
  })(nt)
);
function Mp(r, t, e, i) {
  var n = r.getData(), a = n.getLayout("valueAxisHorizontal") ? 1 : 0, o = n.getLayout("largeDataIndices"), s = n.getLayout("size"), l = r.getModel("backgroundStyle"), u = n.getLayout("largeBackgroundPoints");
  if (u) {
    var f = new Cp({
      shape: {
        points: u
      },
      incremental: !!i,
      silent: !0,
      z2: 0
    });
    f.baseDimIdx = a, f.largeDataIndices = o, f.barWidth = s, f.useStyle(l.getItemStyle()), t.add(f), e && e.push(f);
  }
  var h = new Cp({
    shape: {
      points: n.getLayout("largePoints")
    },
    incremental: !!i,
    ignoreCoarsePointer: !0,
    z2: 1
  });
  h.baseDimIdx = a, h.largeDataIndices = o, h.barWidth = s, t.add(h), h.useStyle(n.getVisual("style")), h.style.stroke = null, et(h).seriesIndex = r.seriesIndex, r.get("silent") || (h.on("mousedown", Dp), h.on("mousemove", Dp)), e && e.push(h);
}
var Dp = rh(function(r) {
  var t = this, e = VM(t, r.offsetX, r.offsetY);
  et(t).dataIndex = e >= 0 ? e : null;
}, 30, !1);
function VM(r, t, e) {
  for (var i = r.baseDimIdx, n = 1 - i, a = r.shape.points, o = r.largeDataIndices, s = [], l = [], u = r.barWidth, f = 0, h = a.length / 3; f < h; f++) {
    var v = f * 3;
    if (l[i] = u, l[n] = a[v + 2], s[i] = a[v + i], s[n] = a[v + n], l[n] < 0 && (s[n] += l[n], l[n] = -l[n]), t >= s[0] && t <= s[0] + l[0] && e >= s[1] && e <= s[1] + l[1])
      return o[f];
  }
  return -1;
}
function Gm(r, t, e) {
  if (Ki(e, "cartesian2d")) {
    var i = t, n = e.getArea();
    return {
      x: r ? i.x : n.x,
      y: r ? n.y : i.y,
      width: r ? i.width : n.width,
      height: r ? n.height : i.height
    };
  } else {
    var n = e.getArea(), a = t;
    return {
      cx: n.cx,
      cy: n.cy,
      r0: r ? n.r0 : a.r0,
      r: r ? n.r : a.r,
      startAngle: r ? a.startAngle : 0,
      endAngle: r ? a.endAngle : Math.PI * 2
    };
  }
}
function HM(r, t, e) {
  var i = r.type === "polar" ? Yi : dt;
  return new i({
    shape: Gm(t, e, r),
    silent: !0,
    z2: 0
  });
}
function GM(r) {
  r.registerChartView(EM), r.registerSeriesModel(DM), r.registerLayout(r.PRIORITY.VISUAL.LAYOUT, lt(bC, "bar")), r.registerLayout(r.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, xC("bar")), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, Vm("bar")), r.registerAction({
    type: "changeAxisOrder",
    event: "changeAxisOrder",
    update: "update"
  }, function(t, e) {
    var i = t.componentType || "series";
    e.eachComponent({
      mainType: i,
      query: t
    }, function(n) {
      t.sortInfo && n.axis.setCategorySortInfo(t.sortInfo);
    });
  });
}
var WM = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.hasSymbolVisual = !0, e;
    }
    return t.prototype.getInitialData = function(e, i) {
      return Ds(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getProgressive = function() {
      var e = this.option.progressive;
      return e ?? (this.option.large ? 5e3 : this.get("progressive"));
    }, t.prototype.getProgressiveThreshold = function() {
      var e = this.option.progressiveThreshold;
      return e ?? (this.option.large ? 1e4 : this.get("progressiveThreshold"));
    }, t.prototype.brushSelector = function(e, i, n) {
      return n.point(i.getItemLayout(e));
    }, t.prototype.getZLevelKey = function() {
      return this.getData().count() > this.getProgressiveThreshold() ? this.id : "";
    }, t.type = "series.scatter", t.dependencies = ["grid", "polar", "geo", "singleAxis", "calendar"], t.defaultOption = {
      coordinateSystem: "cartesian2d",
      // zlevel: 0,
      z: 2,
      legendHoverLink: !0,
      symbolSize: 10,
      // symbolRotate: null,  // 图形旋转控制
      large: !1,
      // Available when large is true
      largeThreshold: 2e3,
      // cursor: null,
      itemStyle: {
        opacity: 0.8
        // color: 各异
      },
      emphasis: {
        scale: !0
      },
      // If clip the overflow graphics
      // Works on cartesian / polar series
      clip: !0,
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      },
      universalTransition: {
        divideShape: "clone"
      }
      // progressive: null
    }, t;
  })(ye)
), Wm = 4, UM = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r() {
    }
    return r;
  })()
), YM = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i._off = 0, i.hoverDataIdx = -1, i;
    }
    return t.prototype.getDefaultShape = function() {
      return new UM();
    }, t.prototype.reset = function() {
      this.notClear = !1, this._off = 0;
    }, t.prototype.buildPath = function(e, i) {
      var n = i.points, a = i.size, o = this.symbolProxy, s = o.shape, l = e.getContext ? e.getContext() : e, u = l && a[0] < Wm, f = this.softClipShape, h;
      if (u) {
        this._ctx = l;
        return;
      }
      for (this._ctx = null, h = this._off; h < n.length; ) {
        var v = n[h++], c = n[h++];
        isNaN(v) || isNaN(c) || f && !f.contain(v, c) || (s.x = v - a[0] / 2, s.y = c - a[1] / 2, s.width = a[0], s.height = a[1], o.buildPath(e, s, !0));
      }
      this.incremental && (this._off = h, this.notClear = !0);
    }, t.prototype.afterBrush = function() {
      var e = this.shape, i = e.points, n = e.size, a = this._ctx, o = this.softClipShape, s;
      if (a) {
        for (s = this._off; s < i.length; ) {
          var l = i[s++], u = i[s++];
          isNaN(l) || isNaN(u) || o && !o.contain(l, u) || a.fillRect(l - n[0] / 2, u - n[1] / 2, n[0], n[1]);
        }
        this.incremental && (this._off = s, this.notClear = !0);
      }
    }, t.prototype.findDataIndex = function(e, i) {
      for (var n = this.shape, a = n.points, o = n.size, s = Math.max(o[0], 4), l = Math.max(o[1], 4), u = a.length / 2 - 1; u >= 0; u--) {
        var f = u * 2, h = a[f] - s / 2, v = a[f + 1] - l / 2;
        if (e >= h && i >= v && e <= h + s && i <= v + l)
          return u;
      }
      return -1;
    }, t.prototype.contain = function(e, i) {
      var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect();
      if (e = n[0], i = n[1], a.contain(e, i)) {
        var o = this.hoverDataIdx = this.findDataIndex(e, i);
        return o >= 0;
      }
      return this.hoverDataIdx = -1, !1;
    }, t.prototype.getBoundingRect = function() {
      var e = this._rect;
      if (!e) {
        for (var i = this.shape, n = i.points, a = i.size, o = a[0], s = a[1], l = 1 / 0, u = 1 / 0, f = -1 / 0, h = -1 / 0, v = 0; v < n.length; ) {
          var c = n[v++], p = n[v++];
          l = Math.min(c, l), f = Math.max(c, f), u = Math.min(p, u), h = Math.max(p, h);
        }
        e = this._rect = new it(l - o / 2, u - s / 2, f - l + o, h - u + s);
      }
      return e;
    }, t;
  })(nt)
), ZM = (
  /** @class */
  (function() {
    function r() {
      this.group = new gt();
    }
    return r.prototype.updateData = function(t, e) {
      this._clear();
      var i = this._create();
      i.setShape({
        points: t.getLayout("points")
      }), this._setCommon(i, t, e);
    }, r.prototype.updateLayout = function(t) {
      var e = t.getLayout("points");
      this.group.eachChild(function(i) {
        if (i.startIndex != null) {
          var n = (i.endIndex - i.startIndex) * 2, a = i.startIndex * 4 * 2;
          e = new Float32Array(e.buffer, a, n);
        }
        i.setShape("points", e), i.reset();
      });
    }, r.prototype.incrementalPrepareUpdate = function(t) {
      this._clear();
    }, r.prototype.incrementalUpdate = function(t, e, i) {
      var n = this._newAdded[0], a = e.getLayout("points"), o = n && n.shape.points;
      if (o && o.length < 2e4) {
        var s = o.length, l = new Float32Array(s + a.length);
        l.set(o), l.set(a, s), n.endIndex = t.end, n.setShape({
          points: l
        });
      } else {
        this._newAdded = [];
        var u = this._create();
        u.startIndex = t.start, u.endIndex = t.end, u.incremental = !0, u.setShape({
          points: a
        }), this._setCommon(u, e, i);
      }
    }, r.prototype.eachRendered = function(t) {
      this._newAdded[0] && t(this._newAdded[0]);
    }, r.prototype._create = function() {
      var t = new YM({
        cursor: "default"
      });
      return t.ignoreCoarsePointer = !0, this.group.add(t), this._newAdded.push(t), t;
    }, r.prototype._setCommon = function(t, e, i) {
      var n = e.hostModel;
      i = i || {};
      var a = e.getVisual("symbolSize");
      t.setShape("size", a instanceof Array ? a : [a, a]), t.softClipShape = i.clipShape || null, t.symbolProxy = ke(e.getVisual("symbol"), 0, 0, 0, 0), t.setColor = t.symbolProxy.setColor;
      var o = t.shape.size[0] < Wm;
      t.useStyle(
        // Draw shadow when doing fillRect is extremely slow.
        n.getModel("itemStyle").getItemStyle(o ? ["color", "shadowBlur", "shadowColor"] : ["color"])
      );
      var s = e.getVisual("style"), l = s && s.fill;
      l && t.setColor(l);
      var u = et(t);
      u.seriesIndex = n.seriesIndex, t.on("mousemove", function(f) {
        u.dataIndex = null;
        var h = t.hoverDataIdx;
        h >= 0 && (u.dataIndex = h + (t.startIndex || 0));
      });
    }, r.prototype.remove = function() {
      this._clear();
    }, r.prototype._clear = function() {
      this._newAdded = [], this.group.removeAll();
    }, r;
  })()
), XM = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n) {
      var a = e.getData(), o = this._updateSymbolDraw(a, e);
      o.updateData(a, {
        // TODO
        // If this parameter should be a shape or a bounding volume
        // shape will be more general.
        // But bounding volume like bounding rect will be much faster in the contain calculation
        clipShape: this._getClipShape(e)
      }), this._finished = !0;
    }, t.prototype.incrementalPrepareRender = function(e, i, n) {
      var a = e.getData(), o = this._updateSymbolDraw(a, e);
      o.incrementalPrepareUpdate(a), this._finished = !1;
    }, t.prototype.incrementalRender = function(e, i, n) {
      this._symbolDraw.incrementalUpdate(e, i.getData(), {
        clipShape: this._getClipShape(i)
      }), this._finished = e.end === i.getData().count();
    }, t.prototype.updateTransform = function(e, i, n) {
      var a = e.getData();
      if (this.group.dirty(), !this._finished || a.count() > 1e4)
        return {
          update: !0
        };
      var o = yh("").reset(e, i, n);
      o.progress && o.progress({
        start: 0,
        end: a.count(),
        count: a.count()
      }, a), this._symbolDraw.updateLayout(a);
    }, t.prototype.eachRendered = function(e) {
      this._symbolDraw && this._symbolDraw.eachRendered(e);
    }, t.prototype._getClipShape = function(e) {
      if (e.get("clip", !0)) {
        var i = e.coordinateSystem;
        return i && i.getArea && i.getArea(0.1);
      }
    }, t.prototype._updateSymbolDraw = function(e, i) {
      var n = this._symbolDraw, a = i.pipelineContext, o = a.large;
      return (!n || o !== this._isLargeDraw) && (n && n.remove(), n = this._symbolDraw = o ? new ZM() : new Em(), this._isLargeDraw = o, this.group.removeAll()), this.group.add(n.group), n;
    }, t.prototype.remove = function(e, i) {
      this._symbolDraw && this._symbolDraw.remove(!0), this._symbolDraw = null;
    }, t.prototype.dispose = function() {
    }, t.type = "scatter", t;
  })(se)
), $M = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.type = "grid", t.dependencies = ["xAxis", "yAxis"], t.layoutMode = "box", t.defaultOption = {
      show: !1,
      // zlevel: 0,
      z: 0,
      left: "10%",
      top: 60,
      right: "10%",
      bottom: 70,
      // If grid size contain label
      containLabel: !1,
      // width: {totalWidth} - left - right,
      // height: {totalHeight} - top - bottom,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc"
    }, t;
  })(ot)
), tf = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.getCoordSysModel = function() {
      return this.getReferringComponents("grid", Gt).models[0];
    }, t.type = "cartesian2dAxis", t;
  })(ot)
);
_e(tf, YC);
var Um = {
  show: !0,
  // zlevel: 0,
  z: 0,
  // Inverse the axis.
  inverse: !1,
  // Axis name displayed.
  name: "",
  // 'start' | 'middle' | 'end'
  nameLocation: "end",
  // By degree. By default auto rotate by nameLocation.
  nameRotate: null,
  nameTruncate: {
    maxWidth: null,
    ellipsis: "...",
    placeholder: "."
  },
  // Use global text style by default.
  nameTextStyle: {},
  // The gap between axisName and axisLine.
  nameGap: 15,
  // Default `false` to support tooltip.
  silent: !1,
  // Default `false` to avoid legacy user event listener fail.
  triggerEvent: !1,
  tooltip: {
    show: !1
  },
  axisPointer: {},
  axisLine: {
    show: !0,
    onZero: !0,
    onZeroAxisIndex: null,
    lineStyle: {
      color: "#6E7079",
      width: 1,
      type: "solid"
    },
    // The arrow at both ends the the axis.
    symbol: ["none", "none"],
    symbolSize: [10, 15]
  },
  axisTick: {
    show: !0,
    // Whether axisTick is inside the grid or outside the grid.
    inside: !1,
    // The length of axisTick.
    length: 5,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: !0,
    // Whether axisLabel is inside the grid or outside the grid.
    inside: !1,
    rotate: 0,
    // true | false | null/undefined (auto)
    showMinLabel: null,
    // true | false | null/undefined (auto)
    showMaxLabel: null,
    margin: 8,
    // formatter: null,
    fontSize: 12
  },
  splitLine: {
    show: !0,
    showMinLine: !0,
    showMaxLine: !0,
    lineStyle: {
      color: ["#E0E6F1"],
      width: 1,
      type: "solid"
    }
  },
  splitArea: {
    show: !1,
    areaStyle: {
      color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
    }
  }
}, qM = J({
  // The gap at both ends of the axis. For categoryAxis, boolean.
  boundaryGap: !0,
  // Set false to faster category collection.
  deduplication: null,
  // splitArea: {
  // show: false
  // },
  splitLine: {
    show: !1
  },
  axisTick: {
    // If tick is align with label when boundaryGap is true
    alignWithLabel: !1,
    interval: "auto"
  },
  axisLabel: {
    interval: "auto"
  }
}, Um), mh = J({
  boundaryGap: [0, 0],
  axisLine: {
    // Not shown when other axis is categoryAxis in cartesian
    show: "auto"
  },
  axisTick: {
    // Not shown when other axis is categoryAxis in cartesian
    show: "auto"
  },
  // TODO
  // min/max: [30, datamin, 60] or [20, datamin] or [datamin, 60]
  splitNumber: 5,
  minorTick: {
    // Minor tick, not available for cateogry axis.
    show: !1,
    // Split number of minor ticks. The value should be in range of (0, 100)
    splitNumber: 5,
    // Length of minor tick
    length: 3,
    // Line style
    lineStyle: {
      // Default to be same with axisTick
    }
  },
  minorSplitLine: {
    show: !1,
    lineStyle: {
      color: "#F4F7FD",
      width: 1
    }
  }
}, Um), KM = J({
  splitNumber: 6,
  axisLabel: {
    // To eliminate labels that are not nice
    showMinLabel: !1,
    showMaxLabel: !1,
    rich: {
      primary: {
        fontWeight: "bold"
      }
    }
  },
  splitLine: {
    show: !1
  }
}, mh), QM = st({
  logBase: 10
}, mh);
const JM = {
  category: qM,
  value: mh,
  time: KM,
  log: QM
};
var jM = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};
function Ap(r, t, e, i) {
  M(jM, function(n, a) {
    var o = J(J({}, JM[a], !0), i, !0), s = (
      /** @class */
      (function(l) {
        k(u, l);
        function u() {
          var f = l !== null && l.apply(this, arguments) || this;
          return f.type = t + "Axis." + a, f;
        }
        return u.prototype.mergeDefaultAndTheme = function(f, h) {
          var v = Qn(this), c = v ? fa(f) : {}, p = h.getTheme();
          J(f, p.get(a + "Axis")), J(f, this.getDefaultOption()), f.type = Lp(f), v && Vi(f, c, v);
        }, u.prototype.optionUpdated = function() {
          var f = this.option;
          f.type === "category" && (this.__ordinalMeta = Ku.createByAxisModel(this));
        }, u.prototype.getCategories = function(f) {
          var h = this.option;
          if (h.type === "category")
            return f ? h.data : this.__ordinalMeta.categories;
        }, u.prototype.getOrdinalMeta = function() {
          return this.__ordinalMeta;
        }, u.type = t + "Axis." + a, u.defaultOption = o, u;
      })(e)
    );
    r.registerComponentModel(s);
  }), r.registerSubTypeDefaulter(t + "Axis", Lp);
}
function Lp(r) {
  return r.type || (r.data ? "category" : "value");
}
var tD = (
  /** @class */
  (function() {
    function r(t) {
      this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = t || "";
    }
    return r.prototype.getAxis = function(t) {
      return this._axes[t];
    }, r.prototype.getAxes = function() {
      return V(this._dimList, function(t) {
        return this._axes[t];
      }, this);
    }, r.prototype.getAxesByScale = function(t) {
      return t = t.toLowerCase(), bt(this.getAxes(), function(e) {
        return e.scale.type === t;
      });
    }, r.prototype.addAxis = function(t) {
      var e = t.dim;
      this._axes[e] = t, this._dimList.push(e);
    }, r;
  })()
), ef = ["x", "y"];
function Ip(r) {
  return r.type === "interval" || r.type === "time";
}
var eD = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "cartesian2d", e.dimensions = ef, e;
    }
    return t.prototype.calcAffineTransform = function() {
      this._transform = this._invTransform = null;
      var e = this.getAxis("x").scale, i = this.getAxis("y").scale;
      if (!(!Ip(e) || !Ip(i))) {
        var n = e.getExtent(), a = i.getExtent(), o = this.dataToPoint([n[0], a[0]]), s = this.dataToPoint([n[1], a[1]]), l = n[1] - n[0], u = a[1] - a[0];
        if (!(!l || !u)) {
          var f = (s[0] - o[0]) / l, h = (s[1] - o[1]) / u, v = o[0] - n[0] * f, c = o[1] - a[0] * h, p = this._transform = [f, 0, 0, h, v, c];
          this._invTransform = xf([], p);
        }
      }
    }, t.prototype.getBaseAxis = function() {
      return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
    }, t.prototype.containPoint = function(e) {
      var i = this.getAxis("x"), n = this.getAxis("y");
      return i.contain(i.toLocalCoord(e[0])) && n.contain(n.toLocalCoord(e[1]));
    }, t.prototype.containData = function(e) {
      return this.getAxis("x").containData(e[0]) && this.getAxis("y").containData(e[1]);
    }, t.prototype.containZone = function(e, i) {
      var n = this.dataToPoint(e), a = this.dataToPoint(i), o = this.getArea(), s = new it(n[0], n[1], a[0] - n[0], a[1] - n[1]);
      return o.intersect(s);
    }, t.prototype.dataToPoint = function(e, i, n) {
      n = n || [];
      var a = e[0], o = e[1];
      if (this._transform && a != null && isFinite(a) && o != null && isFinite(o))
        return oe(n, e, this._transform);
      var s = this.getAxis("x"), l = this.getAxis("y");
      return n[0] = s.toGlobalCoord(s.dataToCoord(a, i)), n[1] = l.toGlobalCoord(l.dataToCoord(o, i)), n;
    }, t.prototype.clampData = function(e, i) {
      var n = this.getAxis("x").scale, a = this.getAxis("y").scale, o = n.getExtent(), s = a.getExtent(), l = n.parse(e[0]), u = a.parse(e[1]);
      return i = i || [], i[0] = Math.min(Math.max(Math.min(o[0], o[1]), l), Math.max(o[0], o[1])), i[1] = Math.min(Math.max(Math.min(s[0], s[1]), u), Math.max(s[0], s[1])), i;
    }, t.prototype.pointToData = function(e, i) {
      var n = [];
      if (this._invTransform)
        return oe(n, e, this._invTransform);
      var a = this.getAxis("x"), o = this.getAxis("y");
      return n[0] = a.coordToData(a.toLocalCoord(e[0]), i), n[1] = o.coordToData(o.toLocalCoord(e[1]), i), n;
    }, t.prototype.getOtherAxis = function(e) {
      return this.getAxis(e.dim === "x" ? "y" : "x");
    }, t.prototype.getArea = function(e) {
      e = e || 0;
      var i = this.getAxis("x").getGlobalExtent(), n = this.getAxis("y").getGlobalExtent(), a = Math.min(i[0], i[1]) - e, o = Math.min(n[0], n[1]) - e, s = Math.max(i[0], i[1]) - a + e, l = Math.max(n[0], n[1]) - o + e;
      return new it(a, o, s, l);
    }, t;
  })(tD)
), rD = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e, i, n, a, o) {
      var s = r.call(this, e, i, n) || this;
      return s.index = 0, s.type = a || "value", s.position = o || "bottom", s;
    }
    return t.prototype.isHorizontal = function() {
      var e = this.position;
      return e === "top" || e === "bottom";
    }, t.prototype.getGlobalExtent = function(e) {
      var i = this.getExtent();
      return i[0] = this.toGlobalCoord(i[0]), i[1] = this.toGlobalCoord(i[1]), e && i[0] > i[1] && i.reverse(), i;
    }, t.prototype.pointToData = function(e, i) {
      return this.coordToData(this.toLocalCoord(e[this.dim === "x" ? 0 : 1]), i);
    }, t.prototype.setCategorySortInfo = function(e) {
      if (this.type !== "category")
        return !1;
      this.model.option.categorySortInfo = e, this.scale.setSortInfo(e);
    }, t;
  })(eM)
);
function rf(r, t, e) {
  e = e || {};
  var i = r.coordinateSystem, n = t.axis, a = {}, o = n.getAxesOnZeroOf()[0], s = n.position, l = o ? "onZero" : s, u = n.dim, f = i.getRect(), h = [f.x, f.x + f.width, f.y, f.y + f.height], v = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  }, c = t.get("offset") || 0, p = u === "x" ? [h[2] - c, h[3] + c] : [h[0] - c, h[1] + c];
  if (o) {
    var d = o.toGlobalCoord(o.dataToCoord(0));
    p[v.onZero] = Math.max(Math.min(d, p[1]), p[0]);
  }
  a.position = [u === "y" ? p[v[l]] : h[0], u === "x" ? p[v[l]] : h[3]], a.rotation = Math.PI / 2 * (u === "x" ? 0 : 1);
  var g = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = g[s], a.labelOffset = o ? p[v[s]] - p[v.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), De(e.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var y = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = l === "top" ? -y : y, a.z2 = 1, a;
}
function Pp(r) {
  return r.get("coordinateSystem") === "cartesian2d";
}
function Rp(r) {
  var t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return M(t, function(e, i) {
    var n = i.replace(/Model$/, ""), a = r.getReferringComponents(n, Gt).models[0];
    t[i] = a;
  }), t;
}
var Gl = Math.log;
function iD(r, t, e) {
  var i = $i.prototype, n = i.getTicks.call(e), a = i.getTicks.call(e, !0), o = n.length - 1, s = i.getInterval.call(e), l = bm(r, t), u = l.extent, f = l.fixMin, h = l.fixMax;
  if (r.type === "log") {
    var v = Gl(r.base);
    u = [Gl(u[0]) / v, Gl(u[1]) / v];
  }
  r.setExtent(u[0], u[1]), r.calcNiceExtent({
    splitNumber: o,
    fixMin: f,
    fixMax: h
  });
  var c = i.getExtent.call(r);
  f && (u[0] = c[0]), h && (u[1] = c[1]);
  var p = i.getInterval.call(r), d = u[0], g = u[1];
  if (f && h)
    p = (g - d) / o;
  else if (f)
    for (g = u[0] + p * o; g < u[1] && isFinite(g) && isFinite(u[1]); )
      p = Nl(p), g = u[0] + p * o;
  else if (h)
    for (d = u[1] - p * o; d > u[0] && isFinite(d) && isFinite(u[0]); )
      p = Nl(p), d = u[1] - p * o;
  else {
    var y = r.getTicks().length - 1;
    y > o && (p = Nl(p));
    var m = p * o;
    g = Math.ceil(u[1] / p) * p, d = wt(g - m), d < 0 && u[0] >= 0 ? (d = 0, g = wt(m)) : g > 0 && u[1] <= 0 && (g = 0, d = -wt(m));
  }
  var _ = (n[0].value - a[0].value) / s, S = (n[o].value - a[o].value) / s;
  i.setExtent.call(r, d + p * _, g + p * S), i.setInterval.call(r, p), (_ || S) && i.setNiceExtent.call(r, d + p, g - p);
}
var nD = (
  /** @class */
  (function() {
    function r(t, e, i) {
      this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = ef, this._initCartesian(t, e, i), this.model = t;
    }
    return r.prototype.getRect = function() {
      return this._rect;
    }, r.prototype.update = function(t, e) {
      var i = this._axesMap;
      this._updateScale(t, this.model);
      function n(o) {
        var s, l = ct(o), u = l.length;
        if (u) {
          for (var f = [], h = u - 1; h >= 0; h--) {
            var v = +l[h], c = o[v], p = c.model, d = c.scale;
            // Only value and log axis without interval support alignTicks.
            Qu(d) && p.get("alignTicks") && p.get("interval") == null ? f.push(c) : (sp(d, p), Qu(d) && (s = c));
          }
          f.length && (s || (s = f.pop(), sp(s.scale, s.model)), M(f, function(g) {
            iD(g.scale, g.model, s.scale);
          }));
        }
      }
      n(i.x), n(i.y);
      var a = {};
      M(i.x, function(o) {
        Ep(i, "y", o, a);
      }), M(i.y, function(o) {
        Ep(i, "x", o, a);
      }), this.resize(this.model, e);
    }, r.prototype.resize = function(t, e, i) {
      var n = t.getBoxLayoutParams(), a = !i && t.get("containLabel"), o = Kn(n, {
        width: e.getWidth(),
        height: e.getHeight()
      });
      this._rect = o;
      var s = this._axesList;
      l(), a && (M(s, function(u) {
        if (!u.model.get(["axisLabel", "inside"])) {
          var f = GC(u);
          if (f) {
            var h = u.isHorizontal() ? "height" : "width", v = u.model.get(["axisLabel", "margin"]);
            o[h] -= f[h] + v, u.position === "top" ? o.y += f.height + v : u.position === "left" && (o.x += f.width + v);
          }
        }
      }), l()), M(this._coordsList, function(u) {
        u.calcAffineTransform();
      });
      function l() {
        M(s, function(u) {
          var f = u.isHorizontal(), h = f ? [0, o.width] : [0, o.height], v = u.inverse ? 1 : 0;
          u.setExtent(h[v], h[1 - v]), aD(u, f ? o.x : o.y);
        });
      }
    }, r.prototype.getAxis = function(t, e) {
      var i = this._axesMap[t];
      if (i != null)
        return i[e || 0];
    }, r.prototype.getAxes = function() {
      return this._axesList.slice();
    }, r.prototype.getCartesian = function(t, e) {
      if (t != null && e != null) {
        var i = "x" + t + "y" + e;
        return this._coordsMap[i];
      }
      G(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
      for (var n = 0, a = this._coordsList; n < a.length; n++)
        if (a[n].getAxis("x").index === t || a[n].getAxis("y").index === e)
          return a[n];
    }, r.prototype.getCartesians = function() {
      return this._coordsList.slice();
    }, r.prototype.convertToPixel = function(t, e, i) {
      var n = this._findConvertTarget(e);
      return n.cartesian ? n.cartesian.dataToPoint(i) : n.axis ? n.axis.toGlobalCoord(n.axis.dataToCoord(i)) : null;
    }, r.prototype.convertFromPixel = function(t, e, i) {
      var n = this._findConvertTarget(e);
      return n.cartesian ? n.cartesian.pointToData(i) : n.axis ? n.axis.coordToData(n.axis.toLocalCoord(i)) : null;
    }, r.prototype._findConvertTarget = function(t) {
      var e = t.seriesModel, i = t.xAxisModel || e && e.getReferringComponents("xAxis", Gt).models[0], n = t.yAxisModel || e && e.getReferringComponents("yAxis", Gt).models[0], a = t.gridModel, o = this._coordsList, s, l;
      if (e)
        s = e.coordinateSystem, rt(o, s) < 0 && (s = null);
      else if (i && n)
        s = this.getCartesian(i.componentIndex, n.componentIndex);
      else if (i)
        l = this.getAxis("x", i.componentIndex);
      else if (n)
        l = this.getAxis("y", n.componentIndex);
      else if (a) {
        var u = a.coordinateSystem;
        u === this && (s = this._coordsList[0]);
      }
      return {
        cartesian: s,
        axis: l
      };
    }, r.prototype.containPoint = function(t) {
      var e = this._coordsList[0];
      if (e)
        return e.containPoint(t);
    }, r.prototype._initCartesian = function(t, e, i) {
      var n = this, a = this, o = {
        left: !1,
        right: !1,
        top: !1,
        bottom: !1
      }, s = {
        x: {},
        y: {}
      }, l = {
        x: 0,
        y: 0
      };
      if (e.eachComponent("xAxis", u("x"), this), e.eachComponent("yAxis", u("y"), this), !l.x || !l.y) {
        this._axesMap = {}, this._axesList = [];
        return;
      }
      this._axesMap = s, M(s.x, function(f, h) {
        M(s.y, function(v, c) {
          var p = "x" + h + "y" + c, d = new eD(p);
          d.master = n, d.model = t, n._coordsMap[p] = d, n._coordsList.push(d), d.addAxis(f), d.addAxis(v);
        });
      });
      function u(f) {
        return function(h, v) {
          if (Wl(h, t)) {
            var c = h.get("position");
            f === "x" ? c !== "top" && c !== "bottom" && (c = o.bottom ? "top" : "bottom") : c !== "left" && c !== "right" && (c = o.left ? "right" : "left"), o[c] = !0;
            var p = new rD(f, VC(h), [0, 0], h.get("type"), c), d = p.type === "category";
            p.onBand = d && h.get("boundaryGap"), p.inverse = h.get("inverse"), h.axis = p, p.model = h, p.grid = a, p.index = v, a._axesList.push(p), s[f][v] = p, l[f]++;
          }
        };
      }
    }, r.prototype._updateScale = function(t, e) {
      M(this._axesList, function(n) {
        if (n.scale.setExtent(1 / 0, -1 / 0), n.type === "category") {
          var a = n.model.get("categorySortInfo");
          n.scale.setSortInfo(a);
        }
      }), t.eachSeries(function(n) {
        if (Pp(n)) {
          var a = Rp(n), o = a.xAxisModel, s = a.yAxisModel;
          if (!Wl(o, e) || !Wl(s, e))
            return;
          var l = this.getCartesian(o.componentIndex, s.componentIndex), u = n.getData(), f = l.getAxis("x"), h = l.getAxis("y");
          i(u, f), i(u, h);
        }
      }, this);
      function i(n, a) {
        M(Tm(n, a.dim), function(o) {
          a.scale.unionExtentFromData(n, o);
        });
      }
    }, r.prototype.getTooltipAxes = function(t) {
      var e = [], i = [];
      return M(this.getCartesians(), function(n) {
        var a = t != null && t !== "auto" ? n.getAxis(t) : n.getBaseAxis(), o = n.getOtherAxis(a);
        rt(e, a) < 0 && e.push(a), rt(i, o) < 0 && i.push(o);
      }), {
        baseAxes: e,
        otherAxes: i
      };
    }, r.create = function(t, e) {
      var i = [];
      return t.eachComponent("grid", function(n, a) {
        var o = new r(n, t, e);
        o.name = "grid_" + a, o.resize(n, e, !0), n.coordinateSystem = o, i.push(o);
      }), t.eachSeries(function(n) {
        if (Pp(n)) {
          var a = Rp(n), o = a.xAxisModel, s = a.yAxisModel, l = o.getCoordSysModel(), u = l.coordinateSystem;
          n.coordinateSystem = u.getCartesian(o.componentIndex, s.componentIndex);
        }
      }), i;
    }, r.dimensions = ef, r;
  })()
);
function Wl(r, t) {
  return r.getCoordSysModel() === t;
}
function Ep(r, t, e, i) {
  e.getAxesOnZeroOf = function() {
    return a ? [a] : [];
  };
  var n = r[t], a, o = e.model, s = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s)
    return;
  if (l != null)
    kp(n[l]) && (a = n[l]);
  else
    for (var u in n)
      if (n.hasOwnProperty(u) && kp(n[u]) && !i[f(n[u])]) {
        a = n[u];
        break;
      }
  a && (i[f(a)] = !0);
  function f(h) {
    return h.dim + "_" + h.index;
  }
}
function kp(r) {
  return r && r.type !== "category" && r.type !== "time" && HC(r);
}
function aD(r, t) {
  var e = r.getExtent(), i = e[0] + e[1];
  r.toGlobalCoord = r.dim === "x" ? function(n) {
    return n + t;
  } : function(n) {
    return i - n + t;
  }, r.toLocalCoord = r.dim === "x" ? function(n) {
    return n - t;
  } : function(n) {
    return i - n + t;
  };
}
var or = Math.PI, vr = (
  /** @class */
  (function() {
    function r(t, e) {
      this.group = new gt(), this.opt = e, this.axisModel = t, st(e, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function() {
          return !0;
        }
      });
      var i = new gt({
        x: e.position[0],
        y: e.position[1],
        rotation: e.rotation
      });
      i.updateTransform(), this._transformGroup = i;
    }
    return r.prototype.hasBuilder = function(t) {
      return !!Op[t];
    }, r.prototype.add = function(t) {
      Op[t](this.opt, this.axisModel, this.group, this._transformGroup);
    }, r.prototype.getGroup = function() {
      return this.group;
    }, r.innerTextLayout = function(t, e, i) {
      var n = eg(e - t), a, o;
      return Do(n) ? (o = i > 0 ? "top" : "bottom", a = "center") : Do(n - or) ? (o = i > 0 ? "bottom" : "top", a = "center") : (o = "middle", n > 0 && n < or ? a = i > 0 ? "right" : "left" : a = i > 0 ? "left" : "right"), {
        rotation: n,
        textAlign: a,
        textVerticalAlign: o
      };
    }, r.makeAxisEventDataBase = function(t) {
      var e = {
        componentType: t.mainType,
        componentIndex: t.componentIndex
      };
      return e[t.mainType + "Index"] = t.componentIndex, e;
    }, r.isLabelSilent = function(t) {
      var e = t.get("tooltip");
      return t.get("silent") || !(t.get("triggerEvent") || e && e.show);
    }, r;
  })()
), Op = {
  axisLine: function(r, t, e, i) {
    var n = t.get(["axisLine", "show"]);
    if (n === "auto" && r.handleAutoShown && (n = r.handleAutoShown("axisLine")), !!n) {
      var a = t.axis.getExtent(), o = i.transform, s = [a[0], 0], l = [a[1], 0], u = s[0] > l[0];
      o && (oe(s, s, o), oe(l, l, o));
      var f = O({
        lineCap: "round"
      }, t.getModel(["axisLine", "lineStyle"]).getLineStyle()), h = new Ye({
        shape: {
          x1: s[0],
          y1: s[1],
          x2: l[0],
          y2: l[1]
        },
        style: f,
        strokeContainThreshold: r.strokeContainThreshold || 5,
        silent: !0,
        z2: 1
      });
      Xn(h.shape, h.style.lineWidth), h.anid = "line", e.add(h);
      var v = t.get(["axisLine", "symbol"]);
      if (v != null) {
        var c = t.get(["axisLine", "symbolSize"]);
        z(v) && (v = [v, v]), (z(c) || ht(c)) && (c = [c, c]);
        var p = Cs(t.get(["axisLine", "symbolOffset"]) || 0, c), d = c[0], g = c[1];
        M([{
          rotate: r.rotation + Math.PI / 2,
          offset: p[0],
          r: 0
        }, {
          rotate: r.rotation - Math.PI / 2,
          offset: p[1],
          r: Math.sqrt((s[0] - l[0]) * (s[0] - l[0]) + (s[1] - l[1]) * (s[1] - l[1]))
        }], function(y, m) {
          if (v[m] !== "none" && v[m] != null) {
            var _ = ke(v[m], -d / 2, -g / 2, d, g, f.stroke, !0), S = y.r + y.offset, b = u ? l : s;
            _.attr({
              rotation: y.rotate,
              x: b[0] + S * Math.cos(r.rotation),
              y: b[1] - S * Math.sin(r.rotation),
              silent: !0,
              z2: 11
            }), e.add(_);
          }
        });
      }
    }
  },
  axisTickLabel: function(r, t, e, i) {
    var n = lD(e, i, t, r), a = fD(e, i, t, r);
    if (sD(t, a, n), uD(e, i, t, r.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
      var o = iM(V(a, function(s) {
        return {
          label: s,
          priority: s.z2,
          defaultAttr: {
            ignore: s.ignore
          }
        };
      }));
      nM(o);
    }
  },
  axisName: function(r, t, e, i) {
    var n = De(r.axisName, t.get("name"));
    if (n) {
      var a = t.get("nameLocation"), o = r.nameDirection, s = t.getModel("nameTextStyle"), l = t.get("nameGap") || 0, u = t.axis.getExtent(), f = u[0] > u[1] ? -1 : 1, h = [
        a === "start" ? u[0] - f * l : a === "end" ? u[1] + f * l : (u[0] + u[1]) / 2,
        // Reuse labelOffset.
        Np(a) ? r.labelOffset + o * l : 0
      ], v, c = t.get("nameRotate");
      c != null && (c = c * or / 180);
      var p;
      Np(a) ? v = vr.innerTextLayout(
        r.rotation,
        c ?? r.rotation,
        // Adapt to axis.
        o
      ) : (v = oD(r.rotation, a, c || 0, u), p = r.axisNameAvailableWidth, p != null && (p = Math.abs(p / Math.sin(v.rotation)), !isFinite(p) && (p = null)));
      var d = s.getFont(), g = t.get("nameTruncate", !0) || {}, y = g.ellipsis, m = De(r.nameTruncateMaxWidth, g.maxWidth, p), _ = new kt({
        x: h[0],
        y: h[1],
        rotation: v.rotation,
        silent: vr.isLabelSilent(t),
        style: Qr(s, {
          text: n,
          font: d,
          overflow: "truncate",
          width: m,
          ellipsis: y,
          fill: s.getTextColor() || t.get(["axisLine", "lineStyle", "color"]),
          align: s.get("align") || v.textAlign,
          verticalAlign: s.get("verticalAlign") || v.textVerticalAlign
        }),
        z2: 1
      });
      if (hs({
        el: _,
        componentModel: t,
        itemName: n
      }), _.__fullText = n, _.anid = "name", t.get("triggerEvent")) {
        var S = vr.makeAxisEventDataBase(t);
        S.targetType = "axisName", S.name = n, et(_).eventData = S;
      }
      i.add(_), _.updateTransform(), e.add(_), _.decomposeTransform();
    }
  }
};
function oD(r, t, e, i) {
  var n = eg(e - r), a, o, s = i[0] > i[1], l = t === "start" && !s || t !== "start" && s;
  return Do(n - or / 2) ? (o = l ? "bottom" : "top", a = "center") : Do(n - or * 1.5) ? (o = l ? "top" : "bottom", a = "center") : (o = "middle", n < or * 1.5 && n > or / 2 ? a = l ? "left" : "right" : a = l ? "right" : "left"), {
    rotation: n,
    textAlign: a,
    textVerticalAlign: o
  };
}
function sD(r, t, e) {
  if (!xm(r.axis)) {
    var i = r.get(["axisLabel", "showMinLabel"]), n = r.get(["axisLabel", "showMaxLabel"]);
    t = t || [], e = e || [];
    var a = t[0], o = t[1], s = t[t.length - 1], l = t[t.length - 2], u = e[0], f = e[1], h = e[e.length - 1], v = e[e.length - 2];
    i === !1 ? (Qt(a), Qt(u)) : Bp(a, o) && (i ? (Qt(o), Qt(f)) : (Qt(a), Qt(u))), n === !1 ? (Qt(s), Qt(h)) : Bp(l, s) && (n ? (Qt(l), Qt(v)) : (Qt(s), Qt(h)));
  }
}
function Qt(r) {
  r && (r.ignore = !0);
}
function Bp(r, t) {
  var e = r && r.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!(!e || !i)) {
    var n = wf([]);
    return bf(n, n, -r.rotation), e.applyTransform(Pi([], n, r.getLocalTransform())), i.applyTransform(Pi([], n, t.getLocalTransform())), e.intersect(i);
  }
}
function Np(r) {
  return r === "middle" || r === "center";
}
function Ym(r, t, e, i, n) {
  for (var a = [], o = [], s = [], l = 0; l < r.length; l++) {
    var u = r[l].coord;
    o[0] = u, o[1] = 0, s[0] = u, s[1] = e, t && (oe(o, o, t), oe(s, s, t));
    var f = new Ye({
      shape: {
        x1: o[0],
        y1: o[1],
        x2: s[0],
        y2: s[1]
      },
      style: i,
      z2: 2,
      autoBatch: !0,
      silent: !0
    });
    Xn(f.shape, f.style.lineWidth), f.anid = n + "_" + r[l].tickValue, a.push(f);
  }
  return a;
}
function lD(r, t, e, i) {
  var n = e.axis, a = e.getModel("axisTick"), o = a.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !(!o || n.scale.isBlank())) {
    for (var s = a.getModel("lineStyle"), l = i.tickDirection * a.get("length"), u = n.getTicksCoords(), f = Ym(u, t.transform, l, st(s.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }), "ticks"), h = 0; h < f.length; h++)
      r.add(f[h]);
    return f;
  }
}
function uD(r, t, e, i) {
  var n = e.axis, a = e.getModel("minorTick");
  if (!(!a.get("show") || n.scale.isBlank())) {
    var o = n.getMinorTicksCoords();
    if (o.length)
      for (var s = a.getModel("lineStyle"), l = i * a.get("length"), u = st(s.getLineStyle(), st(e.getModel("axisTick").getLineStyle(), {
        stroke: e.get(["axisLine", "lineStyle", "color"])
      })), f = 0; f < o.length; f++)
        for (var h = Ym(o[f], t.transform, l, u, "minorticks_" + f), v = 0; v < h.length; v++)
          r.add(h[v]);
  }
}
function fD(r, t, e, i) {
  var n = e.axis, a = De(i.axisLabelShow, e.get(["axisLabel", "show"]));
  if (!(!a || n.scale.isBlank())) {
    var o = e.getModel("axisLabel"), s = o.get("margin"), l = n.getViewLabels(), u = (De(i.labelRotate, o.get("rotate")) || 0) * or / 180, f = vr.innerTextLayout(i.rotation, u, i.labelDirection), h = e.getCategories && e.getCategories(!0), v = [], c = vr.isLabelSilent(e), p = e.get("triggerEvent");
    return M(l, function(d, g) {
      var y = n.scale.type === "ordinal" ? n.scale.getRawOrdinalNumber(d.tickValue) : d.tickValue, m = d.formattedLabel, _ = d.rawLabel, S = o;
      if (h && h[y]) {
        var b = h[y];
        G(b) && b.textStyle && (S = new mt(b.textStyle, o, e.ecModel));
      }
      var w = S.getTextColor() || e.get(["axisLine", "lineStyle", "color"]), x = n.dataToCoord(y), C = S.getShallow("align", !0) || f.textAlign, D = q(S.getShallow("alignMinLabel", !0), C), A = q(S.getShallow("alignMaxLabel", !0), C), T = S.getShallow("verticalAlign", !0) || S.getShallow("baseline", !0) || f.textVerticalAlign, L = q(S.getShallow("verticalAlignMinLabel", !0), T), I = q(S.getShallow("verticalAlignMaxLabel", !0), T), P = new kt({
        x,
        y: i.labelOffset + i.labelDirection * s,
        rotation: f.rotation,
        silent: c,
        z2: 10 + (d.level || 0),
        style: Qr(S, {
          text: m,
          align: g === 0 ? D : g === l.length - 1 ? A : C,
          verticalAlign: g === 0 ? L : g === l.length - 1 ? I : T,
          fill: X(w) ? w(
            // (1) In category axis with data zoom, tick is not the original
            // index of axis.data. So tick should not be exposed to user
            // in category axis.
            // (2) Compatible with previous version, which always use formatted label as
            // input. But in interval scale the formatted label is like '223,445', which
            // maked user replace ','. So we modify it to return original val but remain
            // it as 'string' to avoid error in replacing.
            n.type === "category" ? _ : n.type === "value" ? y + "" : y,
            g
          ) : w
        })
      });
      if (P.anid = "label_" + y, hs({
        el: P,
        componentModel: e,
        itemName: m,
        formatterParamsExtra: {
          isTruncated: function() {
            return P.isTruncated;
          },
          value: _,
          tickIndex: g
        }
      }), p) {
        var R = vr.makeAxisEventDataBase(e);
        R.targetType = "axisLabel", R.value = _, R.tickIndex = g, n.type === "category" && (R.dataIndex = y), et(P).eventData = R;
      }
      t.add(P), P.updateTransform(), v.push(P), r.add(P), P.decomposeTransform();
    }), v;
  }
}
function hD(r, t) {
  var e = {
    /**
     * key: makeKey(axis.model)
     * value: {
     *      axis,
     *      coordSys,
     *      axisPointerModel,
     *      triggerTooltip,
     *      triggerEmphasis,
     *      involveSeries,
     *      snap,
     *      seriesModels,
     *      seriesDataCount
     * }
     */
    axesInfo: {},
    seriesInvolved: !1,
    /**
     * key: makeKey(coordSys.model)
     * value: Object: key makeKey(axis.model), value: axisInfo
     */
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  return vD(e, r, t), e.seriesInvolved && pD(e, r), e;
}
function vD(r, t, e) {
  var i = t.getComponent("tooltip"), n = t.getComponent("axisPointer"), a = n.get("link", !0) || [], o = [];
  M(e.getCoordinateSystems(), function(s) {
    if (!s.axisPointerEnabled)
      return;
    var l = ra(s.model), u = r.coordSysAxesInfo[l] = {};
    r.coordSysMap[l] = s;
    var f = s.model, h = f.getModel("tooltip", i);
    if (M(s.getAxes(), lt(d, !1, null)), s.getTooltipAxes && i && h.get("show")) {
      var v = h.get("trigger") === "axis", c = h.get(["axisPointer", "type"]) === "cross", p = s.getTooltipAxes(h.get(["axisPointer", "axis"]));
      (v || c) && M(p.baseAxes, lt(d, c ? "cross" : !0, v)), c && M(p.otherAxes, lt(d, "cross", !1));
    }
    function d(g, y, m) {
      var _ = m.model.getModel("axisPointer", n), S = _.get("show");
      if (!(!S || S === "auto" && !g && !nf(_))) {
        y == null && (y = _.get("triggerTooltip")), _ = g ? cD(m, h, n, t, g, y) : _;
        var b = _.get("snap"), w = _.get("triggerEmphasis"), x = ra(m.model), C = y || b || m.type === "category", D = r.axesInfo[x] = {
          key: x,
          axis: m,
          coordSys: s,
          axisPointerModel: _,
          triggerTooltip: y,
          triggerEmphasis: w,
          involveSeries: C,
          snap: b,
          useHandle: nf(_),
          seriesModels: [],
          linkGroup: null
        };
        u[x] = D, r.seriesInvolved = r.seriesInvolved || C;
        var A = dD(a, m);
        if (A != null) {
          var T = o[A] || (o[A] = {
            axesInfo: {}
          });
          T.axesInfo[x] = D, T.mapper = a[A].mapper, D.linkGroup = T;
        }
      }
    }
  });
}
function cD(r, t, e, i, n, a) {
  var o = t.getModel("axisPointer"), s = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], l = {};
  M(s, function(v) {
    l[v] = Q(o.get(v));
  }), l.snap = r.type !== "category" && !!a, o.get("type") === "cross" && (l.type = "line");
  var u = l.label || (l.label = {});
  if (u.show == null && (u.show = !1), n === "cross") {
    var f = o.get(["label", "show"]);
    if (u.show = f ?? !0, !a) {
      var h = l.lineStyle = o.get("crossStyle");
      h && st(u, h.textStyle);
    }
  }
  return r.model.getModel("axisPointer", new mt(l, e, i));
}
function pD(r, t) {
  t.eachSeries(function(e) {
    var i = e.coordinateSystem, n = e.get(["tooltip", "trigger"], !0), a = e.get(["tooltip", "show"], !0);
    !i || n === "none" || n === !1 || n === "item" || a === !1 || e.get(["axisPointer", "show"], !0) === !1 || M(r.coordSysAxesInfo[ra(i.model)], function(o) {
      var s = o.axis;
      i.getAxis(s.dim) === s && (o.seriesModels.push(e), o.seriesDataCount == null && (o.seriesDataCount = 0), o.seriesDataCount += e.getData().count());
    });
  });
}
function dD(r, t) {
  for (var e = t.model, i = t.dim, n = 0; n < r.length; n++) {
    var a = r[n] || {};
    if (Ul(a[i + "AxisId"], e.id) || Ul(a[i + "AxisIndex"], e.componentIndex) || Ul(a[i + "AxisName"], e.name))
      return n;
  }
}
function Ul(r, t) {
  return r === "all" || N(r) && rt(r, t) >= 0 || r === t;
}
function gD(r) {
  var t = _h(r);
  if (t) {
    var e = t.axisPointerModel, i = t.axis.scale, n = e.option, a = e.get("status"), o = e.get("value");
    o != null && (o = i.parse(o));
    var s = nf(e);
    a == null && (n.status = s ? "show" : "hide");
    var l = i.getExtent().slice();
    l[0] > l[1] && l.reverse(), // Pick a value on axis when initializing.
    (o == null || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), n.value = o, s && (n.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function _h(r) {
  var t = (r.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[ra(r)];
}
function yD(r) {
  var t = _h(r);
  return t && t.axisPointerModel;
}
function nf(r) {
  return !!r.get(["handle", "show"]);
}
function ra(r) {
  return r.type + "||" + r.id;
}
var Fp = {}, Zm = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.axisPointerClass && gD(e), r.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(e, n, !0);
    }, t.prototype.updateAxisPointer = function(e, i, n, a) {
      this._doUpdateAxisPointerClass(e, n, !1);
    }, t.prototype.remove = function(e, i) {
      var n = this._axisPointer;
      n && n.remove(i);
    }, t.prototype.dispose = function(e, i) {
      this._disposeAxisPointer(i), r.prototype.dispose.apply(this, arguments);
    }, t.prototype._doUpdateAxisPointerClass = function(e, i, n) {
      var a = t.getAxisPointerClass(this.axisPointerClass);
      if (a) {
        var o = yD(e);
        o ? (this._axisPointer || (this._axisPointer = new a())).render(e, o, i, n) : this._disposeAxisPointer(i);
      }
    }, t.prototype._disposeAxisPointer = function(e) {
      this._axisPointer && this._axisPointer.dispose(e), this._axisPointer = null;
    }, t.registerAxisPointerClass = function(e, i) {
      Fp[e] = i;
    }, t.getAxisPointerClass = function(e) {
      return e && Fp[e];
    }, t.type = "axis", t;
  })(ue)
), af = pt();
function mD(r, t, e, i) {
  var n = e.axis;
  if (!n.scale.isBlank()) {
    var a = e.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), l = i.coordinateSystem.getRect(), u = n.getTicksCoords({
      tickModel: a,
      clamp: !0
    });
    if (u.length) {
      var f = s.length, h = af(r).splitAreaColors, v = Y(), c = 0;
      if (h)
        for (var p = 0; p < u.length; p++) {
          var d = h.get(u[p].tickValue);
          if (d != null) {
            c = (d + (f - 1) * p) % f;
            break;
          }
        }
      var g = n.toGlobalCoord(u[0].coord), y = o.getAreaStyle();
      s = N(s) ? s : [s];
      for (var p = 1; p < u.length; p++) {
        var m = n.toGlobalCoord(u[p].coord), _ = void 0, S = void 0, b = void 0, w = void 0;
        n.isHorizontal() ? (_ = g, S = l.y, b = m - _, w = l.height, g = _ + b) : (_ = l.x, S = g, b = l.width, w = m - S, g = S + w);
        var x = u[p - 1].tickValue;
        x != null && v.set(x, c), t.add(new dt({
          anid: x != null ? "area_" + x : null,
          shape: {
            x: _,
            y: S,
            width: b,
            height: w
          },
          style: st({
            fill: s[c]
          }, y),
          autoBatch: !0,
          silent: !0
        })), c = (c + 1) % f;
      }
      af(r).splitAreaColors = v;
    }
  }
}
function _D(r) {
  af(r).splitAreaColors = null;
}
var SD = ["axisLine", "axisTickLabel", "axisName"], wD = ["splitArea", "splitLine", "minorSplitLine"], Xm = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.axisPointerClass = "CartesianAxisPointer", e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.group.removeAll();
      var o = this._axisGroup;
      if (this._axisGroup = new gt(), this.group.add(this._axisGroup), !!e.get("show")) {
        var s = e.getCoordSysModel(), l = rf(s, e), u = new vr(e, O({
          handleAutoShown: function(h) {
            for (var v = s.coordinateSystem.getCartesians(), c = 0; c < v.length; c++)
              if (Qu(v[c].getOtherAxis(e.axis).scale))
                return !0;
            return !1;
          }
        }, l));
        M(SD, u.add, u), this._axisGroup.add(u.getGroup()), M(wD, function(h) {
          e.get([h, "show"]) && bD[h](this, this._axisGroup, e, s);
        }, this);
        var f = a && a.type === "changeAxisOrder" && a.isInitSort;
        f || Hg(o, this._axisGroup, e), r.prototype.render.call(this, e, i, n, a);
      }
    }, t.prototype.remove = function() {
      _D(this);
    }, t.type = "cartesianAxis", t;
  })(Zm)
), bD = {
  splitLine: function(r, t, e, i) {
    var n = e.axis;
    if (!n.scale.isBlank()) {
      var a = e.getModel("splitLine"), o = a.getModel("lineStyle"), s = o.get("color"), l = a.get("showMinLine") !== !1, u = a.get("showMaxLine") !== !1;
      s = N(s) ? s : [s];
      for (var f = i.coordinateSystem.getRect(), h = n.isHorizontal(), v = 0, c = n.getTicksCoords({
        tickModel: a
      }), p = [], d = [], g = o.getLineStyle(), y = 0; y < c.length; y++) {
        var m = n.toGlobalCoord(c[y].coord);
        if (!(y === 0 && !l || y === c.length - 1 && !u)) {
          var _ = c[y].tickValue;
          h ? (p[0] = m, p[1] = f.y, d[0] = m, d[1] = f.y + f.height) : (p[0] = f.x, p[1] = m, d[0] = f.x + f.width, d[1] = m);
          var S = v++ % s.length, b = new Ye({
            anid: _ != null ? "line_" + _ : null,
            autoBatch: !0,
            shape: {
              x1: p[0],
              y1: p[1],
              x2: d[0],
              y2: d[1]
            },
            style: st({
              stroke: s[S]
            }, g),
            silent: !0
          });
          Xn(b.shape, g.lineWidth), t.add(b);
        }
      }
    }
  },
  minorSplitLine: function(r, t, e, i) {
    var n = e.axis, a = e.getModel("minorSplitLine"), o = a.getModel("lineStyle"), s = i.coordinateSystem.getRect(), l = n.isHorizontal(), u = n.getMinorTicksCoords();
    if (u.length)
      for (var f = [], h = [], v = o.getLineStyle(), c = 0; c < u.length; c++)
        for (var p = 0; p < u[c].length; p++) {
          var d = n.toGlobalCoord(u[c][p].coord);
          l ? (f[0] = d, f[1] = s.y, h[0] = d, h[1] = s.y + s.height) : (f[0] = s.x, f[1] = d, h[0] = s.x + s.width, h[1] = d);
          var g = new Ye({
            anid: "minor_line_" + u[c][p].tickValue,
            autoBatch: !0,
            shape: {
              x1: f[0],
              y1: f[1],
              x2: h[0],
              y2: h[1]
            },
            style: v,
            silent: !0
          });
          Xn(g.shape, v.lineWidth), t.add(g);
        }
  },
  splitArea: function(r, t, e, i) {
    mD(r, t, e, i);
  }
}, $m = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "xAxis", t;
  })(Xm)
), xD = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = $m.type, e;
    }
    return t.type = "yAxis", t;
  })(Xm)
), TD = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "grid", e;
    }
    return t.prototype.render = function(e, i) {
      this.group.removeAll(), e.get("show") && this.group.add(new dt({
        shape: e.coordinateSystem.getRect(),
        style: st({
          fill: e.get("backgroundColor")
        }, e.getItemStyle()),
        silent: !0,
        z2: -1
      }));
    }, t.type = "grid", t;
  })(ue)
), zp = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function qm(r) {
  r.registerComponentView(TD), r.registerComponentModel($M), r.registerCoordinateSystem("cartesian2d", nD), Ap(r, "x", tf, zp), Ap(r, "y", tf, zp), r.registerComponentView($m), r.registerComponentView(xD), r.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
function CD(r) {
  me(qm), r.registerSeriesModel(WM), r.registerChartView(XM), r.registerLayout(yh("scatter"));
}
var Vp = "\0_ec_interaction_mutex";
function Hp(r, t) {
  return !!MD(r)[t];
}
function MD(r) {
  return r[Vp] || (r[Vp] = {});
}
ii({
  type: "takeGlobalCursor",
  event: "globalCursorTaken",
  update: "update"
}, Rt);
var DD = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e) {
      var i = r.call(this) || this;
      i._zr = e;
      var n = Z(i._mousedownHandler, i), a = Z(i._mousemoveHandler, i), o = Z(i._mouseupHandler, i), s = Z(i._mousewheelHandler, i), l = Z(i._pinchHandler, i);
      return i.enable = function(u, f) {
        this.disable(), this._opt = st(Q(f) || {}, {
          zoomOnMouseWheel: !0,
          moveOnMouseMove: !0,
          // By default, wheel do not trigger move.
          moveOnMouseWheel: !1,
          preventDefaultMouseMove: !0
        }), u == null && (u = !0), (u === !0 || u === "move" || u === "pan") && (e.on("mousedown", n), e.on("mousemove", a), e.on("mouseup", o)), (u === !0 || u === "scale" || u === "zoom") && (e.on("mousewheel", s), e.on("pinch", l));
      }, i.disable = function() {
        e.off("mousedown", n), e.off("mousemove", a), e.off("mouseup", o), e.off("mousewheel", s), e.off("pinch", l);
      }, i;
    }
    return t.prototype.isDragging = function() {
      return this._dragging;
    }, t.prototype.isPinching = function() {
      return this._pinching;
    }, t.prototype.setPointerChecker = function(e) {
      this.pointerChecker = e;
    }, t.prototype.dispose = function() {
      this.disable();
    }, t.prototype._mousedownHandler = function(e) {
      if (!Ph(e)) {
        for (var i = e.target; i; ) {
          if (i.draggable)
            return;
          i = i.__hostTarget || i.parent;
        }
        var n = e.offsetX, a = e.offsetY;
        this.pointerChecker && this.pointerChecker(e, n, a) && (this._x = n, this._y = a, this._dragging = !0);
      }
    }, t.prototype._mousemoveHandler = function(e) {
      if (!(!this._dragging || !po("moveOnMouseMove", e, this._opt) || e.gestureEvent === "pinch" || Hp(this._zr, "globalPan"))) {
        var i = e.offsetX, n = e.offsetY, a = this._x, o = this._y, s = i - a, l = n - o;
        this._x = i, this._y = n, this._opt.preventDefaultMouseMove && Ni(e.event), Km(this, "pan", "moveOnMouseMove", e, {
          dx: s,
          dy: l,
          oldX: a,
          oldY: o,
          newX: i,
          newY: n,
          isAvailableBehavior: null
        });
      }
    }, t.prototype._mouseupHandler = function(e) {
      Ph(e) || (this._dragging = !1);
    }, t.prototype._mousewheelHandler = function(e) {
      var i = po("zoomOnMouseWheel", e, this._opt), n = po("moveOnMouseWheel", e, this._opt), a = e.wheelDelta, o = Math.abs(a), s = e.offsetX, l = e.offsetY;
      if (!(a === 0 || !i && !n)) {
        if (i) {
          var u = o > 3 ? 1.4 : o > 1 ? 1.2 : 1.1, f = a > 0 ? u : 1 / u;
          Yl(this, "zoom", "zoomOnMouseWheel", e, {
            scale: f,
            originX: s,
            originY: l,
            isAvailableBehavior: null
          });
        }
        if (n) {
          var h = Math.abs(a), v = (a > 0 ? 1 : -1) * (h > 3 ? 0.4 : h > 1 ? 0.15 : 0.05);
          Yl(this, "scrollMove", "moveOnMouseWheel", e, {
            scrollDelta: v,
            originX: s,
            originY: l,
            isAvailableBehavior: null
          });
        }
      }
    }, t.prototype._pinchHandler = function(e) {
      if (!Hp(this._zr, "globalPan")) {
        var i = e.pinchScale > 1 ? 1.1 : 1 / 1.1;
        Yl(this, "zoom", null, e, {
          scale: i,
          originX: e.pinchX,
          originY: e.pinchY,
          isAvailableBehavior: null
        });
      }
    }, t;
  })(Se)
);
function Yl(r, t, e, i, n) {
  r.pointerChecker && r.pointerChecker(i, n.originX, n.originY) && (Ni(i.event), Km(r, t, e, i, n));
}
function Km(r, t, e, i, n) {
  n.isAvailableBehavior = Z(po, null, e, i), r.trigger(t, n);
}
function po(r, t, e) {
  var i = e[r];
  return !r || i && (!z(i) || t.event[i + "Key"]);
}
var Gp = Ye.prototype, Zl = us.prototype, Qm = (
  /** @class */
  /* @__PURE__ */ (function() {
    function r() {
      this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
    }
    return r;
  })()
);
(function(r) {
  k(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t;
})(Qm);
function Xl(r) {
  return isNaN(+r.cpx1) || isNaN(+r.cpy1);
}
var AD = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e) {
      var i = r.call(this, e) || this;
      return i.type = "ec-line", i;
    }
    return t.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    }, t.prototype.getDefaultShape = function() {
      return new Qm();
    }, t.prototype.buildPath = function(e, i) {
      Xl(i) ? Gp.buildPath.call(this, e, i) : Zl.buildPath.call(this, e, i);
    }, t.prototype.pointAt = function(e) {
      return Xl(this.shape) ? Gp.pointAt.call(this, e) : Zl.pointAt.call(this, e);
    }, t.prototype.tangentAt = function(e) {
      var i = this.shape, n = Xl(i) ? [i.x2 - i.x1, i.y2 - i.y1] : Zl.tangentAt.call(this, e);
      return _f(n, n);
    }, t;
  })(nt)
), $l = ["fromSymbol", "toSymbol"];
function Wp(r) {
  return "_" + r + "Type";
}
function Up(r, t, e) {
  var i = t.getItemVisual(e, r);
  if (!i || i === "none")
    return i;
  var n = t.getItemVisual(e, r + "Size"), a = t.getItemVisual(e, r + "Rotate"), o = t.getItemVisual(e, r + "Offset"), s = t.getItemVisual(e, r + "KeepAspect"), l = nh(n), u = Cs(o || 0, l);
  return i + l + u + (a || "") + (s || "");
}
function Yp(r, t, e) {
  var i = t.getItemVisual(e, r);
  if (!(!i || i === "none")) {
    var n = t.getItemVisual(e, r + "Size"), a = t.getItemVisual(e, r + "Rotate"), o = t.getItemVisual(e, r + "Offset"), s = t.getItemVisual(e, r + "KeepAspect"), l = nh(n), u = Cs(o || 0, l), f = ke(i, -l[0] / 2 + u[0], -l[1] / 2 + u[1], l[0], l[1], null, s);
    return f.__specifiedRotation = a == null || isNaN(a) ? void 0 : +a * Math.PI / 180 || 0, f.name = r, f;
  }
}
function LD(r) {
  var t = new AD({
    name: "line",
    subPixelOptimize: !0
  });
  return of(t.shape, r), t;
}
function of(r, t) {
  r.x1 = t[0][0], r.y1 = t[0][1], r.x2 = t[1][0], r.y2 = t[1][1], r.percent = 1;
  var e = t[2];
  e ? (r.cpx1 = e[0], r.cpy1 = e[1]) : (r.cpx1 = NaN, r.cpy1 = NaN);
}
var ID = (
  /** @class */
  (function(r) {
    k(t, r);
    function t(e, i, n) {
      var a = r.call(this) || this;
      return a._createLine(e, i, n), a;
    }
    return t.prototype._createLine = function(e, i, n) {
      var a = e.hostModel, o = e.getItemLayout(i), s = LD(o);
      s.shape.percent = 0, Ee(s, {
        shape: {
          percent: 1
        }
      }, a, i), this.add(s), M($l, function(l) {
        var u = Yp(l, e, i);
        this.add(u), this[Wp(l)] = Up(l, e, i);
      }, this), this._updateCommonStl(e, i, n);
    }, t.prototype.updateData = function(e, i, n) {
      var a = e.hostModel, o = this.childOfName("line"), s = e.getItemLayout(i), l = {
        shape: {}
      };
      of(l.shape, s), Ot(o, l, a, i), M($l, function(u) {
        var f = Up(u, e, i), h = Wp(u);
        if (this[h] !== f) {
          this.remove(this.childOfName(u));
          var v = Yp(u, e, i);
          this.add(v);
        }
        this[h] = f;
      }, this), this._updateCommonStl(e, i, n);
    }, t.prototype.getLinePath = function() {
      return this.childAt(0);
    }, t.prototype._updateCommonStl = function(e, i, n) {
      var a = e.hostModel, o = this.childOfName("line"), s = n && n.emphasisLineStyle, l = n && n.blurLineStyle, u = n && n.selectLineStyle, f = n && n.labelStatesModels, h = n && n.emphasisDisabled, v = n && n.focus, c = n && n.blurScope;
      if (!n || e.hasItemOption) {
        var p = e.getItemModel(i), d = p.getModel("emphasis");
        s = d.getModel("lineStyle").getLineStyle(), l = p.getModel(["blur", "lineStyle"]).getLineStyle(), u = p.getModel(["select", "lineStyle"]).getLineStyle(), h = d.get("disabled"), v = d.get("focus"), c = d.get("blurScope"), f = ri(p);
      }
      var g = e.getItemVisual(i, "style"), y = g.stroke;
      o.useStyle(g), o.style.fill = null, o.style.strokeNoScale = !0, o.ensureState("emphasis").style = s, o.ensureState("blur").style = l, o.ensureState("select").style = u, M($l, function(w) {
        var x = this.childOfName(w);
        if (x) {
          x.setColor(y), x.style.opacity = g.opacity;
          for (var C = 0; C < le.length; C++) {
            var D = le[C], A = o.getState(D);
            if (A) {
              var T = A.style || {}, L = x.ensureState(D), I = L.style || (L.style = {});
              T.stroke != null && (I[x.__isEmptyBrush ? "stroke" : "fill"] = T.stroke), T.opacity != null && (I.opacity = T.opacity);
            }
          }
          x.markRedraw();
        }
      }, this);
      var m = a.getRawValue(i);
      Zi(this, f, {
        labelDataIndex: i,
        labelFetcher: {
          getFormattedLabel: function(w, x) {
            return a.getFormattedLabel(w, x, e.dataType);
          }
        },
        inheritColor: y || "#000",
        defaultOpacity: g.opacity,
        defaultText: (m == null ? e.getName(i) : isFinite(m) ? wt(m) : m) + ""
      });
      var _ = this.getTextContent();
      if (_) {
        var S = f.normal;
        _.__align = _.style.align, _.__verticalAlign = _.style.verticalAlign, _.__position = S.get("position") || "middle";
        var b = S.get("distance");
        N(b) || (b = [b, b]), _.__labelDistance = b;
      }
      this.setTextConfig({
        position: null,
        local: !0,
        inside: !1
        // Can't be inside for stroke element.
      }), Fi(this, v, c, h);
    }, t.prototype.highlight = function() {
      Yn(this);
    }, t.prototype.downplay = function() {
      Zn(this);
    }, t.prototype.updateLayout = function(e, i) {
      this.setLinePoints(e.getItemLayout(i));
    }, t.prototype.setLinePoints = function(e) {
      var i = this.childOfName("line");
      of(i.shape, e), i.dirty();
    }, t.prototype.beforeUpdate = function() {
      var e = this, i = e.childOfName("fromSymbol"), n = e.childOfName("toSymbol"), a = e.getTextContent();
      if (!i && !n && (!a || a.ignore))
        return;
      for (var o = 1, s = this.parent; s; )
        s.scaleX && (o /= s.scaleX), s = s.parent;
      var l = e.childOfName("line");
      if (!this.__dirty && !l.__dirty)
        return;
      var u = l.shape.percent, f = l.pointAt(0), h = l.pointAt(u), v = Od([], h, f);
      _f(v, v);
      function c(A, T) {
        var L = A.__specifiedRotation;
        if (L == null) {
          var I = l.tangentAt(T);
          A.attr("rotation", (T === 1 ? -1 : 1) * Math.PI / 2 - Math.atan2(I[1], I[0]));
        } else
          A.attr("rotation", L);
      }
      if (i && (i.setPosition(f), c(i, 0), i.scaleX = i.scaleY = o * u, i.markRedraw()), n && (n.setPosition(h), c(n, 1), n.scaleX = n.scaleY = o * u, n.markRedraw()), a && !a.ignore) {
        a.x = a.y = 0, a.originX = a.originY = 0;
        var p = void 0, d = void 0, g = a.__labelDistance, y = g[0] * o, m = g[1] * o, _ = u / 2, S = l.tangentAt(_), b = [S[1], -S[0]], w = l.pointAt(_);
        b[1] > 0 && (b[0] = -b[0], b[1] = -b[1]);
        var x = S[0] < 0 ? -1 : 1;
        if (a.__position !== "start" && a.__position !== "end") {
          var C = -Math.atan2(S[1], S[0]);
          h[0] < f[0] && (C = Math.PI + C), a.rotation = C;
        }
        var D = void 0;
        switch (a.__position) {
          case "insideStartTop":
          case "insideMiddleTop":
          case "insideEndTop":
          case "middle":
            D = -m, d = "bottom";
            break;
          case "insideStartBottom":
          case "insideMiddleBottom":
          case "insideEndBottom":
            D = m, d = "top";
            break;
          default:
            D = 0, d = "middle";
        }
        switch (a.__position) {
          case "end":
            a.x = v[0] * y + h[0], a.y = v[1] * m + h[1], p = v[0] > 0.8 ? "left" : v[0] < -0.8 ? "right" : "center", d = v[1] > 0.8 ? "top" : v[1] < -0.8 ? "bottom" : "middle";
            break;
          case "start":
            a.x = -v[0] * y + f[0], a.y = -v[1] * m + f[1], p = v[0] > 0.8 ? "right" : v[0] < -0.8 ? "left" : "center", d = v[1] > 0.8 ? "bottom" : v[1] < -0.8 ? "top" : "middle";
            break;
          case "insideStartTop":
          case "insideStart":
          case "insideStartBottom":
            a.x = y * x + f[0], a.y = f[1] + D, p = S[0] < 0 ? "right" : "left", a.originX = -y * x, a.originY = -D;
            break;
          case "insideMiddleTop":
          case "insideMiddle":
          case "insideMiddleBottom":
          case "middle":
            a.x = w[0], a.y = w[1] + D, p = "center", a.originY = -D;
            break;
          case "insideEndTop":
          case "insideEnd":
          case "insideEndBottom":
            a.x = -y * x + h[0], a.y = h[1] + D, p = S[0] >= 0 ? "right" : "left", a.originX = y * x, a.originY = -D;
            break;
        }
        a.scaleX = a.scaleY = o, a.setStyle({
          // Use the user specified text align and baseline first
          verticalAlign: a.__verticalAlign || d,
          align: a.__align || p
        });
      }
    }, t;
  })(gt)
), PD = (
  /** @class */
  (function() {
    function r(t) {
      this.group = new gt(), this._LineCtor = t || ID;
    }
    return r.prototype.updateData = function(t) {
      var e = this;
      this._progressiveEls = null;
      var i = this, n = i.group, a = i._lineData;
      i._lineData = t, a || n.removeAll();
      var o = Zp(t);
      t.diff(a).add(function(s) {
        e._doAdd(t, s, o);
      }).update(function(s, l) {
        e._doUpdate(a, t, l, s, o);
      }).remove(function(s) {
        n.remove(a.getItemGraphicEl(s));
      }).execute();
    }, r.prototype.updateLayout = function() {
      var t = this._lineData;
      t && t.eachItemGraphicEl(function(e, i) {
        e.updateLayout(t, i);
      }, this);
    }, r.prototype.incrementalPrepareUpdate = function(t) {
      this._seriesScope = Zp(t), this._lineData = null, this.group.removeAll();
    }, r.prototype.incrementalUpdate = function(t, e) {
      this._progressiveEls = [];
      function i(s) {
        !s.isGroup && !RD(s) && (s.incremental = !0, s.ensureState("emphasis").hoverLayer = !0);
      }
      for (var n = t.start; n < t.end; n++) {
        var a = e.getItemLayout(n);
        if (ql(a)) {
          var o = new this._LineCtor(e, n, this._seriesScope);
          o.traverse(i), this.group.add(o), e.setItemGraphicEl(n, o), this._progressiveEls.push(o);
        }
      }
    }, r.prototype.remove = function() {
      this.group.removeAll();
    }, r.prototype.eachRendered = function(t) {
      ua(this._progressiveEls || this.group, t);
    }, r.prototype._doAdd = function(t, e, i) {
      var n = t.getItemLayout(e);
      if (ql(n)) {
        var a = new this._LineCtor(t, e, i);
        t.setItemGraphicEl(e, a), this.group.add(a);
      }
    }, r.prototype._doUpdate = function(t, e, i, n, a) {
      var o = t.getItemGraphicEl(i);
      if (!ql(e.getItemLayout(n))) {
        this.group.remove(o);
        return;
      }
      o ? o.updateData(e, n, a) : o = new this._LineCtor(e, n, a), e.setItemGraphicEl(n, o), this.group.add(o);
    }, r;
  })()
);
function RD(r) {
  return r.animators && r.animators.length > 0;
}
function Zp(r) {
  var t = r.hostModel, e = t.getModel("emphasis");
  return {
    lineStyle: t.getModel("lineStyle").getLineStyle(),
    emphasisLineStyle: e.getModel(["lineStyle"]).getLineStyle(),
    blurLineStyle: t.getModel(["blur", "lineStyle"]).getLineStyle(),
    selectLineStyle: t.getModel(["select", "lineStyle"]).getLineStyle(),
    emphasisDisabled: e.get("disabled"),
    blurScope: e.get("blurScope"),
    focus: e.get("focus"),
    labelStatesModels: ri(t)
  };
}
function Xp(r) {
  return isNaN(r[0]) || isNaN(r[1]);
}
function ql(r) {
  return r && !Xp(r[0]) && !Xp(r[1]);
}
function Ps(r, t, e, i, n, a) {
  r = r || 0;
  var o = e[1] - e[0];
  if (n != null && (n = Si(n, [0, o])), a != null && (a = Math.max(a, n ?? 0)), i === "all") {
    var s = Math.abs(t[1] - t[0]);
    s = Si(s, [0, o]), n = a = Si(s, [n, a]), i = 0;
  }
  t[0] = Si(t[0], e), t[1] = Si(t[1], e);
  var l = Kl(t, i);
  t[i] += r;
  var u = n || 0, f = e.slice();
  l.sign < 0 ? f[0] += u : f[1] -= u, t[i] = Si(t[i], f);
  var h;
  return h = Kl(t, i), n != null && (h.sign !== l.sign || h.span < n) && (t[1 - i] = t[i] + l.sign * n), h = Kl(t, i), a != null && h.span > a && (t[1 - i] = t[i] + h.sign * a), t;
}
function Kl(r, t) {
  var e = r[t] - r[1 - t];
  return {
    span: Math.abs(e),
    sign: e > 0 ? -1 : e < 0 ? 1 : t ? -1 : 1
  };
}
function Si(r, t) {
  return Math.min(t[1] != null ? t[1] : 1 / 0, Math.max(t[0] != null ? t[0] : -1 / 0, r));
}
var zr = pt(), $p = Q, Ql = Z, ED = (
  /** @class */
  (function() {
    function r() {
      this._dragging = !1, this.animationThreshold = 15;
    }
    return r.prototype.render = function(t, e, i, n) {
      var a = e.get("value"), o = e.get("status");
      if (this._axisModel = t, this._axisPointerModel = e, this._api = i, !(!n && this._lastValue === a && this._lastStatus === o)) {
        this._lastValue = a, this._lastStatus = o;
        var s = this._group, l = this._handle;
        if (!o || o === "hide") {
          s && s.hide(), l && l.hide();
          return;
        }
        s && s.show(), l && l.show();
        var u = {};
        this.makeElOption(u, a, t, e, i);
        var f = u.graphicKey;
        f !== this._lastGraphicKey && this.clear(i), this._lastGraphicKey = f;
        var h = this._moveAnimation = this.determineAnimation(t, e);
        if (!s)
          s = this._group = new gt(), this.createPointerEl(s, u, t, e), this.createLabelEl(s, u, t, e), i.getZr().add(s);
        else {
          var v = lt(qp, e, h);
          this.updatePointerEl(s, u, v), this.updateLabelEl(s, u, v, e);
        }
        Qp(s, e, !0), this._renderHandle(a);
      }
    }, r.prototype.remove = function(t) {
      this.clear(t);
    }, r.prototype.dispose = function(t) {
      this.clear(t);
    }, r.prototype.determineAnimation = function(t, e) {
      var i = e.get("animation"), n = t.axis, a = n.type === "category", o = e.get("snap");
      if (!o && !a)
        return !1;
      if (i === "auto" || i == null) {
        var s = this.animationThreshold;
        if (a && n.getBandWidth() > s)
          return !0;
        if (o) {
          var l = _h(t).seriesDataCount, u = n.getExtent();
          return Math.abs(u[0] - u[1]) / l > s;
        }
        return !1;
      }
      return i === !0;
    }, r.prototype.makeElOption = function(t, e, i, n, a) {
    }, r.prototype.createPointerEl = function(t, e, i, n) {
      var a = e.pointer;
      if (a) {
        var o = zr(t).pointerEl = new Lw[a.type]($p(e.pointer));
        t.add(o);
      }
    }, r.prototype.createLabelEl = function(t, e, i, n) {
      if (e.label) {
        var a = zr(t).labelEl = new kt($p(e.label));
        t.add(a), Kp(a, n);
      }
    }, r.prototype.updatePointerEl = function(t, e, i) {
      var n = zr(t).pointerEl;
      n && e.pointer && (n.setStyle(e.pointer.style), i(n, {
        shape: e.pointer.shape
      }));
    }, r.prototype.updateLabelEl = function(t, e, i, n) {
      var a = zr(t).labelEl;
      a && (a.setStyle(e.label.style), i(a, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: e.label.x,
        y: e.label.y
      }), Kp(a, n));
    }, r.prototype._renderHandle = function(t) {
      if (!(this._dragging || !this.updateHandleTransform)) {
        var e = this._axisPointerModel, i = this._api.getZr(), n = this._handle, a = e.getModel("handle"), o = e.get("status");
        if (!a.get("show") || !o || o === "hide") {
          n && i.remove(n), this._handle = null;
          return;
        }
        var s;
        this._handle || (s = !0, n = this._handle = Hf(a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function(u) {
            Ni(u.event);
          },
          onmousedown: Ql(this._onHandleDragMove, this, 0, 0),
          drift: Ql(this._onHandleDragMove, this),
          ondragend: Ql(this._onHandleDragEnd, this)
        }), i.add(n)), Qp(n, e, !1), n.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var l = a.get("size");
        N(l) || (l = [l, l]), n.scaleX = l[0] / 2, n.scaleY = l[1] / 2, Ts(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, s);
      }
    }, r.prototype._moveHandleToValue = function(t, e) {
      qp(this._axisPointerModel, !e && this._moveAnimation, this._handle, Jl(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
    }, r.prototype._onHandleDragMove = function(t, e) {
      var i = this._handle;
      if (i) {
        this._dragging = !0;
        var n = this.updateHandleTransform(Jl(i), [t, e], this._axisModel, this._axisPointerModel);
        this._payloadInfo = n, i.stopAnimation(), i.attr(Jl(n)), zr(i).lastProp = null, this._doDispatchAxisPointer();
      }
    }, r.prototype._doDispatchAxisPointer = function() {
      var t = this._handle;
      if (t) {
        var e = this._payloadInfo, i = this._axisModel;
        this._api.dispatchAction({
          type: "updateAxisPointer",
          x: e.cursorPoint[0],
          y: e.cursorPoint[1],
          tooltipOption: e.tooltipOption,
          axesInfo: [{
            axisDim: i.axis.dim,
            axisIndex: i.componentIndex
          }]
        });
      }
    }, r.prototype._onHandleDragEnd = function() {
      this._dragging = !1;
      var t = this._handle;
      if (t) {
        var e = this._axisPointerModel.get("value");
        this._moveHandleToValue(e), this._api.dispatchAction({
          type: "hideTip"
        });
      }
    }, r.prototype.clear = function(t) {
      this._lastValue = null, this._lastStatus = null;
      var e = t.getZr(), i = this._group, n = this._handle;
      e && i && (this._lastGraphicKey = null, i && e.remove(i), n && e.remove(n), this._group = null, this._handle = null, this._payloadInfo = null), Fo(this, "_doDispatchAxisPointer");
    }, r.prototype.doClear = function() {
    }, r.prototype.buildLabel = function(t, e, i) {
      return i = i || 0, {
        x: t[i],
        y: t[1 - i],
        width: e[i],
        height: e[1 - i]
      };
    }, r;
  })()
);
function qp(r, t, e, i) {
  Jm(zr(e).lastProp, i) || (zr(e).lastProp = i, t ? Ot(e, i, r) : (e.stopAnimation(), e.attr(i)));
}
function Jm(r, t) {
  if (G(r) && G(t)) {
    var e = !0;
    return M(t, function(i, n) {
      e = e && Jm(r[n], i);
    }), !!e;
  } else
    return r === t;
}
function Kp(r, t) {
  r[t.get(["label", "show"]) ? "show" : "hide"]();
}
function Jl(r) {
  return {
    x: r.x || 0,
    y: r.y || 0,
    rotation: r.rotation || 0
  };
}
function Qp(r, t, e) {
  var i = t.get("z"), n = t.get("zlevel");
  r && r.traverse(function(a) {
    a.type !== "group" && (i != null && (a.z = i), n != null && (a.zlevel = n), a.silent = e);
  });
}
function kD(r) {
  var t = r.get("type"), e = r.getModel(t + "Style"), i;
  return t === "line" ? (i = e.getLineStyle(), i.fill = null) : t === "shadow" && (i = e.getAreaStyle(), i.stroke = null), i;
}
function OD(r, t, e, i, n) {
  var a = e.get("value"), o = jm(a, t.axis, t.ecModel, e.get("seriesDataIndices"), {
    precision: e.get(["label", "precision"]),
    formatter: e.get(["label", "formatter"])
  }), s = e.getModel("label"), l = ws(s.get("padding") || 0), u = s.getFont(), f = Mf(o, u), h = n.position, v = f.width + l[1] + l[3], c = f.height + l[0] + l[2], p = n.align;
  p === "right" && (h[0] -= v), p === "center" && (h[0] -= v / 2);
  var d = n.verticalAlign;
  d === "bottom" && (h[1] -= c), d === "middle" && (h[1] -= c / 2), BD(h, v, c, i);
  var g = s.get("backgroundColor");
  (!g || g === "auto") && (g = t.get(["axisLine", "lineStyle", "color"])), r.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: h[0],
    y: h[1],
    style: Qr(s, {
      text: o,
      font: u,
      fill: s.getTextColor(),
      padding: l,
      backgroundColor: g
    }),
    // Label should be over axisPointer.
    z2: 10
  };
}
function BD(r, t, e, i) {
  var n = i.getWidth(), a = i.getHeight();
  r[0] = Math.min(r[0] + t, n) - t, r[1] = Math.min(r[1] + e, a) - e, r[0] = Math.max(r[0], 0), r[1] = Math.max(r[1], 0);
}
function jm(r, t, e, i, n) {
  r = t.scale.parse(r);
  var a = t.scale.getLabel({
    value: r
  }, {
    // If `precision` is set, width can be fixed (like '12.00500'), which
    // helps to debounce when when moving label.
    precision: n.precision
  }), o = n.formatter;
  if (o) {
    var s = {
      value: ch(t, {
        value: r
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    M(i, function(l) {
      var u = e.getSeriesByIndex(l.seriesIndex), f = l.dataIndexInside, h = u && u.getDataParams(f);
      h && s.seriesData.push(h);
    }), z(o) ? a = o.replace("{value}", a) : X(o) && (a = o(s));
  }
  return a;
}
function t0(r, t, e) {
  var i = Ii();
  return bf(i, i, e.rotation), gu(i, i, e.position), $n([r.dataToCoord(t), (e.labelOffset || 0) + (e.labelDirection || 1) * (e.labelMargin || 0)], i);
}
function ND(r, t, e, i, n, a) {
  var o = vr.innerTextLayout(e.rotation, 0, e.labelDirection);
  e.labelMargin = n.get(["label", "margin"]), OD(t, i, n, a, {
    position: t0(i.axis, r, e),
    align: o.textAlign,
    verticalAlign: o.textVerticalAlign
  });
}
function FD(r, t, e) {
  return e = e || 0, {
    x1: r[e],
    y1: r[1 - e],
    x2: t[e],
    y2: t[1 - e]
  };
}
function zD(r, t, e) {
  return e = e || 0, {
    x: r[e],
    y: r[1 - e],
    width: t[e],
    height: t[1 - e]
  };
}
var VD = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return t.prototype.makeElOption = function(e, i, n, a, o) {
      var s = n.axis, l = s.grid, u = a.get("type"), f = Jp(l, s).getOtherAxis(s).getGlobalExtent(), h = s.toGlobalCoord(s.dataToCoord(i, !0));
      if (u && u !== "none") {
        var v = kD(a), c = HD[u](s, h, f);
        c.style = v, e.graphicKey = c.type, e.pointer = c;
      }
      var p = rf(l.model, n);
      ND(
        // @ts-ignore
        i,
        e,
        p,
        n,
        a,
        o
      );
    }, t.prototype.getHandleTransform = function(e, i, n) {
      var a = rf(i.axis.grid.model, i, {
        labelInside: !1
      });
      a.labelMargin = n.get(["handle", "margin"]);
      var o = t0(i.axis, e, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function(e, i, n, a) {
      var o = n.axis, s = o.grid, l = o.getGlobalExtent(!0), u = Jp(s, o).getOtherAxis(o).getGlobalExtent(), f = o.dim === "x" ? 0 : 1, h = [e.x, e.y];
      h[f] += i[f], h[f] = Math.min(l[1], h[f]), h[f] = Math.max(l[0], h[f]);
      var v = (u[1] + u[0]) / 2, c = [v, v];
      c[f] = h[f];
      var p = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: h[0],
        y: h[1],
        rotation: e.rotation,
        cursorPoint: c,
        tooltipOption: p[f]
      };
    }, t;
  })(ED)
);
function Jp(r, t) {
  var e = {};
  return e[t.dim + "AxisIndex"] = t.index, r.getCartesian(e);
}
var HD = {
  line: function(r, t, e) {
    var i = FD([t, e[0]], [t, e[1]], jp(r));
    return {
      type: "Line",
      subPixelOptimize: !0,
      shape: i
    };
  },
  shadow: function(r, t, e) {
    var i = Math.max(1, r.getBandWidth()), n = e[1] - e[0];
    return {
      type: "Rect",
      shape: zD([t - i / 2, e[0]], [i, n], jp(r))
    };
  }
};
function jp(r) {
  return r.dim === "x" ? 0 : 1;
}
var GD = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "axisPointer", t.defaultOption = {
      // 'auto' means that show when triggered by tooltip or handle.
      show: "auto",
      // zlevel: 0,
      z: 50,
      type: "line",
      // axispointer triggered by tootip determine snap automatically,
      // see `modelHelper`.
      snap: !1,
      triggerTooltip: !0,
      triggerEmphasis: !0,
      value: null,
      status: null,
      link: [],
      // Do not set 'auto' here, otherwise global animation: false
      // will not effect at this axispointer.
      animation: null,
      animationDurationUpdate: 200,
      lineStyle: {
        color: "#B9BEC9",
        width: 1,
        type: "dashed"
      },
      shadowStyle: {
        color: "rgba(210,219,238,0.2)"
      },
      label: {
        show: !0,
        formatter: null,
        precision: "auto",
        margin: 3,
        color: "#fff",
        padding: [5, 7, 5, 7],
        backgroundColor: "auto",
        borderColor: null,
        borderWidth: 0,
        borderRadius: 3
      },
      handle: {
        show: !1,
        // eslint-disable-next-line
        icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
        size: 45,
        // handle margin is from symbol center to axis, which is stable when circular move.
        margin: 50,
        // color: '#1b8bbd'
        // color: '#2f4554'
        color: "#333",
        shadowBlur: 3,
        shadowColor: "#aaa",
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        // For mobile performance
        throttle: 40
      }
    }, t;
  })(ot)
), He = pt(), WD = M;
function e0(r, t, e) {
  if (!U.node) {
    var i = t.getZr();
    He(i).records || (He(i).records = {}), UD(i, t);
    var n = He(i).records[r] || (He(i).records[r] = {});
    n.handler = e;
  }
}
function UD(r, t) {
  if (He(r).initialized)
    return;
  He(r).initialized = !0, e("click", lt(td, "click")), e("mousemove", lt(td, "mousemove")), e("globalout", ZD);
  function e(i, n) {
    r.on(i, function(a) {
      var o = XD(t);
      WD(He(r).records, function(s) {
        s && n(s, a, o.dispatchAction);
      }), YD(o.pendings, t);
    });
  }
}
function YD(r, t) {
  var e = r.showTip.length, i = r.hideTip.length, n;
  e ? n = r.showTip[e - 1] : i && (n = r.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function ZD(r, t, e) {
  r.handler("leave", null, e);
}
function td(r, t, e, i) {
  t.handler(r, e, i);
}
function XD(r) {
  var t = {
    showTip: [],
    hideTip: []
  }, e = function(i) {
    var n = t[i.type];
    n ? n.push(i) : (i.dispatchAction = e, r.dispatchAction(i));
  };
  return {
    dispatchAction: e,
    pendings: t
  };
}
function sf(r, t) {
  if (!U.node) {
    var e = t.getZr(), i = (He(e).records || {})[r];
    i && (He(e).records[r] = null);
  }
}
var $D = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n) {
      var a = i.getComponent("tooltip"), o = e.get("triggerOn") || a && a.get("triggerOn") || "mousemove|click";
      e0("axisPointer", n, function(s, l, u) {
        o !== "none" && (s === "leave" || o.indexOf(s) >= 0) && u({
          type: "updateAxisPointer",
          currTrigger: s,
          x: l && l.offsetX,
          y: l && l.offsetY
        });
      });
    }, t.prototype.remove = function(e, i) {
      sf("axisPointer", i);
    }, t.prototype.dispose = function(e, i) {
      sf("axisPointer", i);
    }, t.type = "axisPointer", t;
  })(ue)
);
function r0(r, t) {
  var e = [], i = r.seriesIndex, n;
  if (i == null || !(n = t.getSeriesByIndex(i)))
    return {
      point: []
    };
  var a = n.getData(), o = qr(a, r);
  if (o == null || o < 0 || N(o))
    return {
      point: []
    };
  var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
  if (n.getTooltipPosition)
    e = n.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (r.isStacked) {
      var u = l.getBaseAxis(), f = l.getOtherAxis(u), h = f.dim, v = u.dim, c = h === "x" || h === "radius" ? 1 : 0, p = a.mapDimension(v), d = [];
      d[c] = a.get(p, o), d[1 - c] = a.get(a.getCalculationInfo("stackResultDimension"), o), e = l.dataToPoint(d) || [];
    } else
      e = l.dataToPoint(a.getValues(V(l.dimensions, function(y) {
        return a.mapDimension(y);
      }), o)) || [];
  else if (s) {
    var g = s.getBoundingRect().clone();
    g.applyTransform(s.transform), e = [g.x + g.width / 2, g.y + g.height / 2];
  }
  return {
    point: e,
    el: s
  };
}
var ed = pt();
function qD(r, t, e) {
  var i = r.currTrigger, n = [r.x, r.y], a = r, o = r.dispatchAction || Z(e.dispatchAction, e), s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    go(n) && (n = r0({
      seriesIndex: a.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: a.dataIndex
    }, t).point);
    var l = go(n), u = a.axesInfo, f = s.axesInfo, h = i === "leave" || go(n), v = {}, c = {}, p = {
      list: [],
      map: {}
    }, d = {
      showPointer: lt(QD, c),
      showTooltip: lt(JD, p)
    };
    M(s.coordSysMap, function(y, m) {
      var _ = l || y.containPoint(n);
      M(s.coordSysAxesInfo[m], function(S, b) {
        var w = S.axis, x = rA(u, S);
        if (!h && _ && (!u || x)) {
          var C = x && x.value;
          C == null && !l && (C = w.pointToData(n)), C != null && rd(S, C, d, !1, v);
        }
      });
    });
    var g = {};
    return M(f, function(y, m) {
      var _ = y.linkGroup;
      _ && !c[m] && M(_.axesInfo, function(S, b) {
        var w = c[b];
        if (S !== y && w) {
          var x = w.value;
          _.mapper && (x = y.axis.scale.parse(_.mapper(x, id(S), id(y)))), g[y.key] = x;
        }
      });
    }), M(g, function(y, m) {
      rd(f[m], y, d, !0, v);
    }), jD(c, f, v), tA(p, n, r, o), eA(f, o, e), v;
  }
}
function rd(r, t, e, i, n) {
  var a = r.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!r.involveSeries) {
      e.showPointer(r, t);
      return;
    }
    var o = KD(t, r), s = o.payloadBatch, l = o.snapToValue;
    s[0] && n.seriesIndex == null && O(n, s[0]), !i && r.snap && a.containData(l) && l != null && (t = l), e.showPointer(r, t, s), e.showTooltip(r, o, l);
  }
}
function KD(r, t) {
  var e = t.axis, i = e.dim, n = r, a = [], o = Number.MAX_VALUE, s = -1;
  return M(t.seriesModels, function(l, u) {
    var f = l.getData().mapDimensionsAll(i), h, v;
    if (l.getAxisTooltipData) {
      var c = l.getAxisTooltipData(f, r, e);
      v = c.dataIndices, h = c.nestestValue;
    } else {
      if (v = l.getData().indicesOfNearest(
        f[0],
        r,
        // Add a threshold to avoid find the wrong dataIndex
        // when data length is not same.
        // false,
        e.type === "category" ? 0.5 : null
      ), !v.length)
        return;
      h = l.getData().get(f[0], v[0]);
    }
    if (!(h == null || !isFinite(h))) {
      var p = r - h, d = Math.abs(p);
      d <= o && ((d < o || p >= 0 && s < 0) && (o = d, s = p, n = h, a.length = 0), M(v, function(g) {
        a.push({
          seriesIndex: l.seriesIndex,
          dataIndexInside: g,
          dataIndex: l.getData().getRawIndex(g)
        });
      }));
    }
  }), {
    payloadBatch: a,
    snapToValue: n
  };
}
function QD(r, t, e, i) {
  r[t.key] = {
    value: e,
    payloadBatch: i
  };
}
function JD(r, t, e, i) {
  var n = e.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !n.length)) {
    var l = t.coordSys.model, u = ra(l), f = r.map[u];
    f || (f = r.map[u] = {
      coordSysId: l.id,
      coordSysIndex: l.componentIndex,
      coordSysType: l.type,
      coordSysMainType: l.mainType,
      dataByAxis: []
    }, r.list.push(f)), f.dataByAxis.push({
      axisDim: a.dim,
      axisIndex: o.componentIndex,
      axisType: o.type,
      axisId: o.id,
      value: i,
      // Caustion: viewHelper.getValueLabel is actually on "view stage", which
      // depends that all models have been updated. So it should not be performed
      // here. Considering axisPointerModel used here is volatile, which is hard
      // to be retrieve in TooltipView, we prepare parameters here.
      valueLabelOpt: {
        precision: s.get(["label", "precision"]),
        formatter: s.get(["label", "formatter"])
      },
      seriesDataIndices: n.slice()
    });
  }
}
function jD(r, t, e) {
  var i = e.axesInfo = [];
  M(t, function(n, a) {
    var o = n.axisPointerModel.option, s = r[a];
    s ? (!n.useHandle && (o.status = "show"), o.value = s.value, o.seriesDataIndices = (s.payloadBatch || []).slice()) : !n.useHandle && (o.status = "hide"), o.status === "show" && i.push({
      axisDim: n.axis.dim,
      axisIndex: n.axis.model.componentIndex,
      value: o.value
    });
  });
}
function tA(r, t, e, i) {
  if (go(t) || !r.list.length) {
    i({
      type: "hideTip"
    });
    return;
  }
  var n = ((r.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  i({
    type: "showTip",
    escapeConnect: !0,
    x: t[0],
    y: t[1],
    tooltipOption: e.tooltipOption,
    position: e.position,
    dataIndexInside: n.dataIndexInside,
    dataIndex: n.dataIndex,
    seriesIndex: n.seriesIndex,
    dataByCoordSys: r.list
  });
}
function eA(r, t, e) {
  var i = e.getZr(), n = "axisPointerLastHighlights", a = ed(i)[n] || {}, o = ed(i)[n] = {};
  M(r, function(u, f) {
    var h = u.axisPointerModel.option;
    h.status === "show" && u.triggerEmphasis && M(h.seriesDataIndices, function(v) {
      var c = v.seriesIndex + " | " + v.dataIndex;
      o[c] = v;
    });
  });
  var s = [], l = [];
  M(a, function(u, f) {
    !o[f] && l.push(u);
  }), M(o, function(u, f) {
    !a[f] && s.push(u);
  }), l.length && e.dispatchAction({
    type: "downplay",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: l
  }), s.length && e.dispatchAction({
    type: "highlight",
    escapeConnect: !0,
    // Not blur others when highlight in axisPointer.
    notBlur: !0,
    batch: s
  });
}
function rA(r, t) {
  for (var e = 0; e < (r || []).length; e++) {
    var i = r[e];
    if (t.axis.dim === i.axisDim && t.axis.model.componentIndex === i.axisIndex)
      return i;
  }
}
function id(r) {
  var t = r.axis.model, e = {}, i = e.axisDim = r.axis.dim;
  return e.axisIndex = e[i + "AxisIndex"] = t.componentIndex, e.axisName = e[i + "AxisName"] = t.name, e.axisId = e[i + "AxisId"] = t.id, e;
}
function go(r) {
  return !r || r[0] == null || isNaN(r[0]) || r[1] == null || isNaN(r[1]);
}
function i0(r) {
  Zm.registerAxisPointerClass("CartesianAxisPointer", VD), r.registerComponentModel(GD), r.registerComponentView($D), r.registerPreprocessor(function(t) {
    if (t) {
      (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
      var e = t.axisPointer.link;
      e && !N(e) && (t.axisPointer.link = [e]);
    }
  }), r.registerProcessor(r.PRIORITY.PROCESSOR.STATISTIC, function(t, e) {
    t.getComponent("axisPointer").coordSysAxesInfo = hD(t, e);
  }), r.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, qD);
}
function iA(r) {
  me(qm), me(i0);
}
var nd = ["x", "y", "radius", "angle", "single"], nA = ["cartesian2d", "polar", "singleAxis"];
function aA(r) {
  var t = r.get("coordinateSystem");
  return rt(nA, t) >= 0;
}
function sr(r) {
  return r + "Axis";
}
function oA(r, t) {
  var e = Y(), i = [], n = Y();
  r.eachComponent({
    mainType: "dataZoom",
    query: t
  }, function(f) {
    n.get(f.uid) || s(f);
  });
  var a;
  do
    a = !1, r.eachComponent("dataZoom", o);
  while (a);
  function o(f) {
    !n.get(f.uid) && l(f) && (s(f), a = !0);
  }
  function s(f) {
    n.set(f.uid, !0), i.push(f), u(f);
  }
  function l(f) {
    var h = !1;
    return f.eachTargetAxis(function(v, c) {
      var p = e.get(v);
      p && p[c] && (h = !0);
    }), h;
  }
  function u(f) {
    f.eachTargetAxis(function(h, v) {
      (e.get(h) || e.set(h, []))[v] = !0;
    });
  }
  return i;
}
function n0(r) {
  var t = r.ecModel, e = {
    infoList: [],
    infoMap: Y()
  };
  return r.eachTargetAxis(function(i, n) {
    var a = t.getComponent(sr(i), n);
    if (a) {
      var o = a.getCoordSysModel();
      if (o) {
        var s = o.uid, l = e.infoMap.get(s);
        l || (l = {
          model: o,
          axisModels: []
        }, e.infoList.push(l), e.infoMap.set(s, l)), l.axisModels.push(a);
      }
    }
  }), e;
}
var jl = (
  /** @class */
  (function() {
    function r() {
      this.indexList = [], this.indexMap = [];
    }
    return r.prototype.add = function(t) {
      this.indexMap[t] || (this.indexList.push(t), this.indexMap[t] = !0);
    }, r;
  })()
), Yo = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e._autoThrottle = !0, e._noTarget = !0, e._rangePropMode = ["percent", "percent"], e;
    }
    return t.prototype.init = function(e, i, n) {
      var a = ad(e);
      this.settledOption = a, this.mergeDefaultAndTheme(e, n), this._doInit(a);
    }, t.prototype.mergeOption = function(e) {
      var i = ad(e);
      J(this.option, e, !0), J(this.settledOption, i, !0), this._doInit(i);
    }, t.prototype._doInit = function(e) {
      var i = this.option;
      this._setDefaultThrottle(e), this._updateRangeUse(e);
      var n = this.settledOption;
      M([["start", "startValue"], ["end", "endValue"]], function(a, o) {
        this._rangePropMode[o] === "value" && (i[a[0]] = n[a[0]] = null);
      }, this), this._resetTarget();
    }, t.prototype._resetTarget = function() {
      var e = this.get("orient", !0), i = this._targetAxisInfoMap = Y(), n = this._fillSpecifiedTargetAxis(i);
      n ? this._orient = e || this._makeAutoOrientByTargetAxis() : (this._orient = e || "horizontal", this._fillAutoTargetAxisByOrient(i, this._orient)), this._noTarget = !0, i.each(function(a) {
        a.indexList.length && (this._noTarget = !1);
      }, this);
    }, t.prototype._fillSpecifiedTargetAxis = function(e) {
      var i = !1;
      return M(nd, function(n) {
        var a = this.getReferringComponents(sr(n), _1);
        if (a.specified) {
          i = !0;
          var o = new jl();
          M(a.models, function(s) {
            o.add(s.componentIndex);
          }), e.set(n, o);
        }
      }, this), i;
    }, t.prototype._fillAutoTargetAxisByOrient = function(e, i) {
      var n = this.ecModel, a = !0;
      if (a) {
        var o = i === "vertical" ? "y" : "x", s = n.findComponents({
          mainType: o + "Axis"
        });
        l(s, o);
      }
      if (a) {
        var s = n.findComponents({
          mainType: "singleAxis",
          filter: function(f) {
            return f.get("orient", !0) === i;
          }
        });
        l(s, "single");
      }
      function l(u, f) {
        var h = u[0];
        if (h) {
          var v = new jl();
          if (v.add(h.componentIndex), e.set(f, v), a = !1, f === "x" || f === "y") {
            var c = h.getReferringComponents("grid", Gt).models[0];
            c && M(u, function(p) {
              h.componentIndex !== p.componentIndex && c === p.getReferringComponents("grid", Gt).models[0] && v.add(p.componentIndex);
            });
          }
        }
      }
      a && M(nd, function(u) {
        if (a) {
          var f = n.findComponents({
            mainType: sr(u),
            filter: function(v) {
              return v.get("type", !0) === "category";
            }
          });
          if (f[0]) {
            var h = new jl();
            h.add(f[0].componentIndex), e.set(u, h), a = !1;
          }
        }
      }, this);
    }, t.prototype._makeAutoOrientByTargetAxis = function() {
      var e;
      return this.eachTargetAxis(function(i) {
        !e && (e = i);
      }, this), e === "y" ? "vertical" : "horizontal";
    }, t.prototype._setDefaultThrottle = function(e) {
      if (e.hasOwnProperty("throttle") && (this._autoThrottle = !1), this._autoThrottle) {
        var i = this.ecModel.option;
        this.option.throttle = i.animation && i.animationDurationUpdate > 0 ? 100 : 20;
      }
    }, t.prototype._updateRangeUse = function(e) {
      var i = this._rangePropMode, n = this.get("rangeMode");
      M([["start", "startValue"], ["end", "endValue"]], function(a, o) {
        var s = e[a[0]] != null, l = e[a[1]] != null;
        s && !l ? i[o] = "percent" : !s && l ? i[o] = "value" : n ? i[o] = n[o] : s && (i[o] = "percent");
      });
    }, t.prototype.noTarget = function() {
      return this._noTarget;
    }, t.prototype.getFirstTargetAxisModel = function() {
      var e;
      return this.eachTargetAxis(function(i, n) {
        e == null && (e = this.ecModel.getComponent(sr(i), n));
      }, this), e;
    }, t.prototype.eachTargetAxis = function(e, i) {
      this._targetAxisInfoMap.each(function(n, a) {
        M(n.indexList, function(o) {
          e.call(i, a, o);
        });
      });
    }, t.prototype.getAxisProxy = function(e, i) {
      var n = this.getAxisModel(e, i);
      if (n)
        return n.__dzAxisProxy;
    }, t.prototype.getAxisModel = function(e, i) {
      var n = this._targetAxisInfoMap.get(e);
      if (n && n.indexMap[i])
        return this.ecModel.getComponent(sr(e), i);
    }, t.prototype.setRawRange = function(e) {
      var i = this.option, n = this.settledOption;
      M([["start", "startValue"], ["end", "endValue"]], function(a) {
        (e[a[0]] != null || e[a[1]] != null) && (i[a[0]] = n[a[0]] = e[a[0]], i[a[1]] = n[a[1]] = e[a[1]]);
      }, this), this._updateRangeUse(e);
    }, t.prototype.setCalculatedRange = function(e) {
      var i = this.option;
      M(["start", "startValue", "end", "endValue"], function(n) {
        i[n] = e[n];
      });
    }, t.prototype.getPercentRange = function() {
      var e = this.findRepresentativeAxisProxy();
      if (e)
        return e.getDataPercentWindow();
    }, t.prototype.getValueRange = function(e, i) {
      if (e == null && i == null) {
        var n = this.findRepresentativeAxisProxy();
        if (n)
          return n.getDataValueWindow();
      } else
        return this.getAxisProxy(e, i).getDataValueWindow();
    }, t.prototype.findRepresentativeAxisProxy = function(e) {
      if (e)
        return e.__dzAxisProxy;
      for (var i, n = this._targetAxisInfoMap.keys(), a = 0; a < n.length; a++)
        for (var o = n[a], s = this._targetAxisInfoMap.get(o), l = 0; l < s.indexList.length; l++) {
          var u = this.getAxisProxy(o, s.indexList[l]);
          if (u.hostedBy(this))
            return u;
          i || (i = u);
        }
      return i;
    }, t.prototype.getRangePropMode = function() {
      return this._rangePropMode.slice();
    }, t.prototype.getOrient = function() {
      return this._orient;
    }, t.type = "dataZoom", t.dependencies = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "series", "toolbox"], t.defaultOption = {
      // zlevel: 0,
      z: 4,
      filterMode: "filter",
      start: 0,
      end: 100
    }, t;
  })(ot)
);
function ad(r) {
  var t = {};
  return M(["start", "end", "startValue", "endValue", "throttle"], function(e) {
    r.hasOwnProperty(e) && (t[e] = r[e]);
  }), t;
}
var a0 = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.render = function(e, i, n, a) {
      this.dataZoomModel = e, this.ecModel = i, this.api = n;
    }, t.type = "dataZoom", t;
  })(ue)
), Ti = M, od = Vr, sA = (
  /** @class */
  (function() {
    function r(t, e, i, n) {
      this._dimName = t, this._axisIndex = e, this.ecModel = n, this._dataZoomModel = i;
    }
    return r.prototype.hostedBy = function(t) {
      return this._dataZoomModel === t;
    }, r.prototype.getDataValueWindow = function() {
      return this._valueWindow.slice();
    }, r.prototype.getDataPercentWindow = function() {
      return this._percentWindow.slice();
    }, r.prototype.getTargetSeriesModels = function() {
      var t = [];
      return this.ecModel.eachSeries(function(e) {
        if (aA(e)) {
          var i = sr(this._dimName), n = e.getReferringComponents(i, Gt).models[0];
          n && this._axisIndex === n.componentIndex && t.push(e);
        }
      }, this), t;
    }, r.prototype.getAxisModel = function() {
      return this.ecModel.getComponent(this._dimName + "Axis", this._axisIndex);
    }, r.prototype.getMinMaxSpan = function() {
      return Q(this._minMaxSpan);
    }, r.prototype.calculateDataWindow = function(t) {
      var e = this._dataExtent, i = this.getAxisModel(), n = i.axis.scale, a = this._dataZoomModel.getRangePropMode(), o = [0, 100], s = [], l = [], u;
      Ti(["start", "end"], function(v, c) {
        var p = t[v], d = t[v + "Value"];
        a[c] === "percent" ? (p == null && (p = o[c]), d = n.parse(At(p, o, e))) : (u = !0, d = d == null ? e[c] : n.parse(d), p = At(d, e, o)), l[c] = d == null || isNaN(d) ? e[c] : d, s[c] = p == null || isNaN(p) ? o[c] : p;
      }), od(l), od(s);
      var f = this._minMaxSpan;
      u ? h(l, s, e, o, !1) : h(s, l, o, e, !0);
      function h(v, c, p, d, g) {
        var y = g ? "Span" : "ValueSpan";
        Ps(0, v, p, "all", f["min" + y], f["max" + y]);
        for (var m = 0; m < 2; m++)
          c[m] = At(v[m], p, d, !0), g && (c[m] = n.parse(c[m]));
      }
      return {
        valueWindow: l,
        percentWindow: s
      };
    }, r.prototype.reset = function(t) {
      if (t === this._dataZoomModel) {
        var e = this.getTargetSeriesModels();
        this._dataExtent = lA(this, this._dimName, e), this._updateMinMaxSpan();
        var i = this.calculateDataWindow(t.settledOption);
        this._valueWindow = i.valueWindow, this._percentWindow = i.percentWindow, this._setAxisModel();
      }
    }, r.prototype.filterData = function(t, e) {
      if (t !== this._dataZoomModel)
        return;
      var i = this._dimName, n = this.getTargetSeriesModels(), a = t.get("filterMode"), o = this._valueWindow;
      if (a === "none")
        return;
      Ti(n, function(l) {
        var u = l.getData(), f = u.mapDimensionsAll(i);
        if (f.length) {
          if (a === "weakFilter") {
            var h = u.getStore(), v = V(f, function(c) {
              return u.getDimensionIndex(c);
            }, u);
            u.filterSelf(function(c) {
              for (var p, d, g, y = 0; y < f.length; y++) {
                var m = h.get(v[y], c), _ = !isNaN(m), S = m < o[0], b = m > o[1];
                if (_ && !S && !b)
                  return !0;
                _ && (g = !0), S && (p = !0), b && (d = !0);
              }
              return g && p && d;
            });
          } else
            Ti(f, function(c) {
              if (a === "empty")
                l.setData(u = u.map(c, function(d) {
                  return s(d) ? d : NaN;
                }));
              else {
                var p = {};
                p[c] = o, u.selectRange(p);
              }
            });
          Ti(f, function(c) {
            u.setApproximateExtent(o, c);
          });
        }
      });
      function s(l) {
        return l >= o[0] && l <= o[1];
      }
    }, r.prototype._updateMinMaxSpan = function() {
      var t = this._minMaxSpan = {}, e = this._dataZoomModel, i = this._dataExtent;
      Ti(["min", "max"], function(n) {
        var a = e.get(n + "Span"), o = e.get(n + "ValueSpan");
        o != null && (o = this.getAxisModel().axis.scale.parse(o)), o != null ? a = At(i[0] + o, i, [0, 100], !0) : a != null && (o = At(a, [0, 100], i, !0) - i[0]), t[n + "Span"] = a, t[n + "ValueSpan"] = o;
      }, this);
    }, r.prototype._setAxisModel = function() {
      var t = this.getAxisModel(), e = this._percentWindow, i = this._valueWindow;
      if (e) {
        var n = tg(i, [0, 500]);
        n = Math.min(n, 20);
        var a = t.axis.scale.rawExtentInfo;
        e[0] !== 0 && a.setDeterminedMinMax("min", +i[0].toFixed(n)), e[1] !== 100 && a.setDeterminedMinMax("max", +i[1].toFixed(n)), a.freeze();
      }
    }, r;
  })()
);
function lA(r, t, e) {
  var i = [1 / 0, -1 / 0];
  Ti(e, function(o) {
    UC(i, o.getData(), t);
  });
  var n = r.getAxisModel(), a = wm(n.axis.scale, n, i).calculate();
  return [a.min, a.max];
}
var uA = {
  // `dataZoomProcessor` will only be performed in needed series. Consider if
  // there is a line series and a pie series, it is better not to update the
  // line series if only pie series is needed to be updated.
  getTargetSeries: function(r) {
    function t(n) {
      r.eachComponent("dataZoom", function(a) {
        a.eachTargetAxis(function(o, s) {
          var l = r.getComponent(sr(o), s);
          n(o, s, l, a);
        });
      });
    }
    t(function(n, a, o, s) {
      o.__dzAxisProxy = null;
    });
    var e = [];
    t(function(n, a, o, s) {
      o.__dzAxisProxy || (o.__dzAxisProxy = new sA(n, a, s, r), e.push(o.__dzAxisProxy));
    });
    var i = Y();
    return M(e, function(n) {
      M(n.getTargetSeriesModels(), function(a) {
        i.set(a.uid, a);
      });
    }), i;
  },
  // Consider appendData, where filter should be performed. Because data process is
  // in block mode currently, it is not need to worry about that the overallProgress
  // execute every frame.
  overallReset: function(r, t) {
    r.eachComponent("dataZoom", function(e) {
      e.eachTargetAxis(function(i, n) {
        e.getAxisProxy(i, n).reset(e);
      }), e.eachTargetAxis(function(i, n) {
        e.getAxisProxy(i, n).filterData(e, t);
      });
    }), r.eachComponent("dataZoom", function(e) {
      var i = e.findRepresentativeAxisProxy();
      if (i) {
        var n = i.getDataPercentWindow(), a = i.getDataValueWindow();
        e.setCalculatedRange({
          start: n[0],
          end: n[1],
          startValue: a[0],
          endValue: a[1]
        });
      }
    });
  }
};
function fA(r) {
  r.registerAction("dataZoom", function(t, e) {
    var i = oA(e, t);
    M(i, function(n) {
      n.setRawRange({
        start: t.start,
        end: t.end,
        startValue: t.startValue,
        endValue: t.endValue
      });
    });
  });
}
var sd = !1;
function o0(r) {
  sd || (sd = !0, r.registerProcessor(r.PRIORITY.PROCESSOR.FILTER, uA), fA(r), r.registerSubTypeDefaulter("dataZoom", function() {
    return "slider";
  }));
}
function hA(r, t) {
  var e = ws(t.get("padding")), i = t.getItemStyle(["color", "opacity"]);
  return i.fill = t.get("backgroundColor"), r = new dt({
    shape: {
      x: r.x - e[3],
      y: r.y - e[0],
      width: r.width + e[1] + e[3],
      height: r.height + e[0] + e[2],
      r: t.get("borderRadius")
    },
    style: i,
    silent: !0,
    z2: -1
  }), r;
}
var vA = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "tooltip", t.dependencies = ["axisPointer"], t.defaultOption = {
      // zlevel: 0,
      z: 60,
      show: !0,
      // tooltip main content
      showContent: !0,
      // 'trigger' only works on coordinate system.
      // 'item' | 'axis' | 'none'
      trigger: "item",
      // 'click' | 'mousemove' | 'none'
      triggerOn: "mousemove|click",
      alwaysShowContent: !1,
      displayMode: "single",
      renderMode: "auto",
      // whether restraint content inside viewRect.
      // If renderMode: 'richText', default true.
      // If renderMode: 'html', defaut false (for backward compat).
      confine: null,
      showDelay: 0,
      hideDelay: 100,
      // Animation transition time, unit is second
      transitionDuration: 0.4,
      enterable: !1,
      backgroundColor: "#fff",
      // box shadow
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, .2)",
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      // tooltip border radius, unit is px, default is 4
      borderRadius: 4,
      // tooltip border width, unit is px, default is 0 (no border)
      borderWidth: 1,
      // Tooltip inside padding, default is 5 for all direction
      // Array is allowed to set up, right, bottom, left, same with css
      // The default value: See `tooltip/tooltipMarkup.ts#getPaddingFromTooltipModel`.
      padding: null,
      // Extra css text
      extraCssText: "",
      // axis indicator, trigger by axis
      axisPointer: {
        // default is line
        // legal values: 'line' | 'shadow' | 'cross'
        type: "line",
        // Valid when type is line, appoint tooltip line locate on which line. Optional
        // legal values: 'x' | 'y' | 'angle' | 'radius' | 'auto'
        // default is 'auto', chose the axis which type is category.
        // for multiply y axis, cartesian coord chose x axis, polar chose angle axis
        axis: "auto",
        animation: "auto",
        animationDurationUpdate: 200,
        animationEasingUpdate: "exponentialOut",
        crossStyle: {
          color: "#999",
          width: 1,
          type: "dashed",
          // TODO formatter
          textStyle: {}
        }
        // lineStyle and shadowStyle should not be specified here,
        // otherwise it will always override those styles on option.axisPointer.
      },
      textStyle: {
        color: "#666",
        fontSize: 14
      }
    }, t;
  })(ot)
);
function s0(r) {
  var t = r.get("confine");
  return t != null ? !!t : r.get("renderMode") === "richText";
}
function l0(r) {
  if (U.domSupported) {
    for (var t = document.documentElement.style, e = 0, i = r.length; e < i; e++)
      if (r[e] in t)
        return r[e];
  }
}
var u0 = l0(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), cA = l0(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function f0(r, t) {
  if (!r)
    return t;
  t = ry(t, !0);
  var e = r.indexOf(t);
  return r = e === -1 ? t : "-" + r.slice(0, e) + "-" + t, r.toLowerCase();
}
function pA(r, t) {
  var e = r.currentStyle || document.defaultView && document.defaultView.getComputedStyle(r);
  return e ? e[t] : null;
}
var dA = f0(cA, "transition"), Sh = f0(u0, "transform"), gA = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (U.transform3dSupported ? "will-change:transform;" : "");
function yA(r) {
  return r = r === "left" ? "right" : r === "right" ? "left" : r === "top" ? "bottom" : "top", r;
}
function mA(r, t, e) {
  if (!z(e) || e === "inside")
    return "";
  var i = r.get("backgroundColor"), n = r.get("borderWidth");
  t = Jr(t);
  var a = yA(e), o = Math.max(Math.round(n) * 1.5, 6), s = "", l = Sh + ":", u;
  rt(["left", "right"], a) > -1 ? (s += "top:50%", l += "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", l += "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)");
  var f = u * Math.PI / 180, h = o + n, v = h * Math.abs(Math.cos(f)) + h * Math.abs(Math.sin(f)), c = Math.round(((v - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (v - h) / 2) * 100) / 100;
  s += ";" + a + ":-" + c + "px";
  var p = t + " solid " + n + "px;", d = ["position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;", s + ";" + l + ";", "border-bottom:" + p, "border-right:" + p, "background-color:" + i + ";"];
  return '<div style="' + d.join("") + '"></div>';
}
function _A(r, t) {
  var e = "cubic-bezier(0.23,1,0.32,1)", i = " " + r / 2 + "s " + e, n = "opacity" + i + ",visibility" + i;
  return t || (i = " " + r + "s " + e, n += U.transformSupported ? "," + Sh + i : ",left" + i + ",top" + i), dA + ":" + n;
}
function ld(r, t, e) {
  var i = r.toFixed(0) + "px", n = t.toFixed(0) + "px";
  if (!U.transformSupported)
    return e ? "top:" + n + ";left:" + i + ";" : [["top", n], ["left", i]];
  var a = U.transform3dSupported, o = "translate" + (a ? "3d" : "") + "(" + i + "," + n + (a ? ",0" : "") + ")";
  return e ? "top:0;left:0;" + Sh + ":" + o + ";" : [["top", 0], ["left", 0], [u0, o]];
}
function SA(r) {
  var t = [], e = r.get("fontSize"), i = r.getTextColor();
  i && t.push("color:" + i), t.push("font:" + r.getFont());
  var n = q(r.get("lineHeight"), Math.round(e * 3 / 2));
  e && t.push("line-height:" + n + "px");
  var a = r.get("textShadowColor"), o = r.get("textShadowBlur") || 0, s = r.get("textShadowOffsetX") || 0, l = r.get("textShadowOffsetY") || 0;
  return a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a), M(["decoration", "align"], function(u) {
    var f = r.get(u);
    f && t.push("text-" + u + ":" + f);
  }), t.join(";");
}
function wA(r, t, e) {
  var i = [], n = r.get("transitionDuration"), a = r.get("backgroundColor"), o = r.get("shadowBlur"), s = r.get("shadowColor"), l = r.get("shadowOffsetX"), u = r.get("shadowOffsetY"), f = r.getModel("textStyle"), h = Ay(r, "html"), v = l + "px " + u + "px " + o + "px " + s;
  return i.push("box-shadow:" + v), t && n && i.push(_A(n, e)), a && i.push("background-color:" + a), M(["width", "color", "radius"], function(c) {
    var p = "border-" + c, d = ry(p), g = r.get(d);
    g != null && i.push(p + ":" + g + (c === "color" ? "" : "px"));
  }), i.push(SA(f)), h != null && i.push("padding:" + ws(h).join("px ") + "px"), i.join(";") + ";";
}
function ud(r, t, e, i, n) {
  var a = t && t.painter;
  if (e) {
    var o = a && a.getViewportRoot();
    o && K0(r, o, e, i, n);
  } else {
    r[0] = i, r[1] = n;
    var s = a && a.getViewportRootOffset();
    s && (r[0] += s.offsetLeft, r[1] += s.offsetTop);
  }
  r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var bA = (
  /** @class */
  (function() {
    function r(t, e) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, U.wxa)
        return null;
      var i = document.createElement("div");
      i.domBelongToZr = !0, this.el = i;
      var n = this._zr = t.getZr(), a = e.appendTo, o = a && (z(a) ? document.querySelector(a) : Hn(a) ? a : X(a) && a(t.getDom()));
      ud(this._styleCoord, n, o, t.getWidth() / 2, t.getHeight() / 2), (o || t.getDom()).appendChild(i), this._api = t, this._container = o;
      var s = this;
      i.onmouseenter = function() {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }, i.onmousemove = function(l) {
        if (l = l || window.event, !s._enterable) {
          var u = n.handler, f = n.painter.getViewportRoot();
          jt(f, l, !0), u.dispatch("mousemove", l);
        }
      }, i.onmouseleave = function() {
        s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
      };
    }
    return r.prototype.update = function(t) {
      if (!this._container) {
        var e = this._api.getDom(), i = pA(e, "position"), n = e.style;
        n.position !== "absolute" && i !== "absolute" && (n.position = "relative");
      }
      var a = t.get("alwaysShowContent");
      a && this._moveIfResized(), this._alwaysShowContent = a, this.el.className = t.get("className") || "";
    }, r.prototype.show = function(t, e) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var i = this.el, n = i.style, a = this._styleCoord;
      i.innerHTML ? n.cssText = gA + wA(t, !this._firstShow, this._longHide) + ld(a[0], a[1], !0) + ("border-color:" + Jr(e) + ";") + (t.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : n.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this.el;
      if (t == null) {
        o.innerHTML = "";
        return;
      }
      var s = "";
      if (z(a) && i.get("trigger") === "item" && !s0(i) && (s = mA(i, n, a)), z(t))
        o.innerHTML = t + s;
      else if (t) {
        o.innerHTML = "", N(t) || (t = [t]);
        for (var l = 0; l < t.length; l++)
          Hn(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
        if (s && o.childNodes.length) {
          var u = document.createElement("div");
          u.innerHTML = s, o.appendChild(u);
        }
      }
    }, r.prototype.setEnterable = function(t) {
      this._enterable = t;
    }, r.prototype.getSize = function() {
      var t = this.el;
      return t ? [t.offsetWidth, t.offsetHeight] : [0, 0];
    }, r.prototype.moveTo = function(t, e) {
      if (this.el) {
        var i = this._styleCoord;
        if (ud(i, this._zr, this._container, t, e), i[0] != null && i[1] != null) {
          var n = this.el.style, a = ld(i[0], i[1]);
          M(a, function(o) {
            n[o[0]] = o[1];
          });
        }
      }
    }, r.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], e = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
    }, r.prototype.hide = function() {
      var t = this, e = this.el.style;
      e.visibility = "hidden", e.opacity = "0", U.transform3dSupported && (e.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
        return t._longHide = !0;
      }, 500);
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(Z(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var t = this.el.parentNode;
      t && t.removeChild(this.el), this.el = this._container = null;
    }, r;
  })()
), xA = (
  /** @class */
  (function() {
    function r(t) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._alwaysShowContent = !1, this._enterable = !0, this._zr = t.getZr(), hd(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
    }
    return r.prototype.update = function(t) {
      var e = t.get("alwaysShowContent");
      e && this._moveIfResized(), this._alwaysShowContent = e;
    }, r.prototype.show = function() {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, r.prototype.setContent = function(t, e, i, n, a) {
      var o = this;
      G(t) && Vt(""), this.el && this._zr.remove(this.el);
      var s = i.getModel("textStyle");
      this.el = new kt({
        style: {
          rich: e.richTextStyles,
          text: t,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: n,
          textShadowColor: s.get("textShadowColor"),
          fill: i.get(["textStyle", "color"]),
          padding: Ay(i, "richText"),
          verticalAlign: "top",
          align: "left"
        },
        z: i.get("z")
      }), M(["backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"], function(u) {
        o.el.style[u] = i.get(u);
      }), M(["textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], function(u) {
        o.el.style[u] = s.get(u) || 0;
      }), this._zr.add(this.el);
      var l = this;
      this.el.on("mouseover", function() {
        l._enterable && (clearTimeout(l._hideTimeout), l._show = !0), l._inContent = !0;
      }), this.el.on("mouseout", function() {
        l._enterable && l._show && l.hideLater(l._hideDelay), l._inContent = !1;
      });
    }, r.prototype.setEnterable = function(t) {
      this._enterable = t;
    }, r.prototype.getSize = function() {
      var t = this.el, e = this.el.getBoundingRect(), i = fd(t.style);
      return [e.width + i.left + i.right, e.height + i.top + i.bottom];
    }, r.prototype.moveTo = function(t, e) {
      var i = this.el;
      if (i) {
        var n = this._styleCoord;
        hd(n, this._zr, t, e), t = n[0], e = n[1];
        var a = i.style, o = nr(a.borderWidth || 0), s = fd(a);
        i.x = t + o + s.left, i.y = e + o + s.top, i.markRedraw();
      }
    }, r.prototype._moveIfResized = function() {
      var t = this._styleCoord[2], e = this._styleCoord[3];
      this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
    }, r.prototype.hide = function() {
      this.el && this.el.hide(), this._show = !1;
    }, r.prototype.hideLater = function(t) {
      this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(Z(this.hide, this), t)) : this.hide());
    }, r.prototype.isShow = function() {
      return this._show;
    }, r.prototype.dispose = function() {
      this._zr.remove(this.el);
    }, r;
  })()
);
function nr(r) {
  return Math.max(0, r);
}
function fd(r) {
  var t = nr(r.shadowBlur || 0), e = nr(r.shadowOffsetX || 0), i = nr(r.shadowOffsetY || 0);
  return {
    left: nr(t - e),
    right: nr(t + e),
    top: nr(t - i),
    bottom: nr(t + i)
  };
}
function hd(r, t, e, i) {
  r[0] = e, r[1] = i, r[2] = r[0] / t.getWidth(), r[3] = r[1] / t.getHeight();
}
var TA = new dt({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
}), CA = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.init = function(e, i) {
      if (!(U.node || !i.getDom())) {
        var n = e.getComponent("tooltip"), a = this._renderMode = w1(n.get("renderMode"));
        this._tooltipContent = a === "richText" ? new xA(i) : new bA(i, {
          appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0)
        });
      }
    }, t.prototype.render = function(e, i, n) {
      if (!(U.node || !n.getDom())) {
        this.group.removeAll(), this._tooltipModel = e, this._ecModel = i, this._api = n;
        var a = this._tooltipContent;
        a.update(e), a.setEnterable(e.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && e.get("transitionDuration") ? Ts(this, "_updatePosition", 50, "fixRate") : Fo(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function() {
      var e = this._tooltipModel, i = e.get("triggerOn");
      e0("itemTooltip", this._api, Z(function(n, a, o) {
        i !== "none" && (i.indexOf(n) >= 0 ? this._tryShow(a, o) : n === "leave" && this._hide(o));
      }, this));
    }, t.prototype._keepShow = function() {
      var e = this._tooltipModel, i = this._ecModel, n = this._api, a = e.get("triggerOn");
      if (this._lastX != null && this._lastY != null && a !== "none" && a !== "click") {
        var o = this;
        clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function() {
          !n.isDisposed() && o.manuallyShowTip(e, i, n, {
            x: o._lastX,
            y: o._lastY,
            dataByCoordSys: o._lastDataByCoordSys
          });
        });
      }
    }, t.prototype.manuallyShowTip = function(e, i, n, a) {
      if (!(a.from === this.uid || U.node || !n.getDom())) {
        var o = vd(a, n);
        this._ticket = "";
        var s = a.dataByCoordSys, l = LA(a, i, n);
        if (l) {
          var u = l.el.getBoundingRect().clone();
          u.applyTransform(l.el.transform), this._tryShow({
            offsetX: u.x + u.width / 2,
            offsetY: u.y + u.height / 2,
            target: l.el,
            position: a.position,
            // When manully trigger, the mouse is not on the el, so we'd better to
            // position tooltip on the bottom of the el and display arrow is possible.
            positionDefault: "bottom"
          }, o);
        } else if (a.tooltip && a.x != null && a.y != null) {
          var f = TA;
          f.x = a.x, f.y = a.y, f.update(), et(f).tooltipConfig = {
            name: null,
            option: a.tooltip
          }, this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            target: f
          }, o);
        } else if (s)
          this._tryShow({
            offsetX: a.x,
            offsetY: a.y,
            position: a.position,
            dataByCoordSys: s,
            tooltipOption: a.tooltipOption
          }, o);
        else if (a.seriesIndex != null) {
          if (this._manuallyAxisShowTip(e, i, n, a))
            return;
          var h = r0(a, i), v = h.point[0], c = h.point[1];
          v != null && c != null && this._tryShow({
            offsetX: v,
            offsetY: c,
            target: h.el,
            position: a.position,
            // When manully trigger, the mouse is not on the el, so we'd better to
            // position tooltip on the bottom of the el and display arrow is possible.
            positionDefault: "bottom"
          }, o);
        } else a.x != null && a.y != null && (n.dispatchAction({
          type: "updateAxisPointer",
          x: a.x,
          y: a.y
        }), this._tryShow({
          offsetX: a.x,
          offsetY: a.y,
          position: a.position,
          target: n.getZr().findHover(a.x, a.y).target
        }, o));
      }
    }, t.prototype.manuallyHideTip = function(e, i, n, a) {
      var o = this._tooltipContent;
      this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, a.from !== this.uid && this._hide(vd(a, n));
    }, t.prototype._manuallyAxisShowTip = function(e, i, n, a) {
      var o = a.seriesIndex, s = a.dataIndex, l = i.getComponent("axisPointer").coordSysAxesInfo;
      if (!(o == null || s == null || l == null)) {
        var u = i.getSeriesByIndex(o);
        if (u) {
          var f = u.getData(), h = gn([f.getItemModel(s), u, (u.coordinateSystem || {}).model], this._tooltipModel);
          if (h.get("trigger") === "axis")
            return n.dispatchAction({
              type: "updateAxisPointer",
              seriesIndex: o,
              dataIndex: s,
              position: a.position
            }), !0;
        }
      }
    }, t.prototype._tryShow = function(e, i) {
      var n = e.target, a = this._tooltipModel;
      if (a) {
        this._lastX = e.offsetX, this._lastY = e.offsetY;
        var o = e.dataByCoordSys;
        if (o && o.length)
          this._showAxisTooltip(o, e);
        else if (n) {
          var s = et(n);
          if (s.ssrType === "legend")
            return;
          this._lastDataByCoordSys = null;
          var l, u;
          Mn(n, function(f) {
            if (et(f).dataIndex != null)
              return l = f, !0;
            if (et(f).tooltipConfig != null)
              return u = f, !0;
          }, !0), l ? this._showSeriesItemTooltip(e, l, i) : u ? this._showComponentItemTooltip(e, u, i) : this._hide(i);
        } else
          this._lastDataByCoordSys = null, this._hide(i);
      }
    }, t.prototype._showOrMove = function(e, i) {
      var n = e.get("showDelay");
      i = Z(i, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(i, n) : i();
    }, t.prototype._showAxisTooltip = function(e, i) {
      var n = this._ecModel, a = this._tooltipModel, o = [i.offsetX, i.offsetY], s = gn([i.tooltipOption], a), l = this._renderMode, u = [], f = jr("section", {
        blocks: [],
        noHeader: !0
      }), h = [], v = new Cl();
      M(e, function(m) {
        M(m.dataByAxis, function(_) {
          var S = n.getComponent(_.axisDim + "Axis", _.axisIndex), b = _.value;
          if (!(!S || b == null)) {
            var w = jm(b, S.axis, n, _.seriesDataIndices, _.valueLabelOpt), x = jr("section", {
              header: w,
              noHeader: !Ae(w),
              sortBlocks: !0,
              blocks: []
            });
            f.blocks.push(x), M(_.seriesDataIndices, function(C) {
              var D = n.getSeriesByIndex(C.seriesIndex), A = C.dataIndexInside, T = D.getDataParams(A);
              if (!(T.dataIndex < 0)) {
                T.axisDim = _.axisDim, T.axisIndex = _.axisIndex, T.axisType = _.axisType, T.axisId = _.axisId, T.axisValue = ch(S.axis, {
                  value: b
                }), T.axisValueLabel = w, T.marker = v.makeTooltipMarker("item", Jr(T.color), l);
                var L = gc(D.formatTooltip(A, !0, null)), I = L.frag;
                if (I) {
                  var P = gn([D], a).get("valueFormatter");
                  x.blocks.push(P ? O({
                    valueFormatter: P
                  }, I) : I);
                }
                L.text && h.push(L.text), u.push(T);
              }
            });
          }
        });
      }), f.blocks.reverse(), h.reverse();
      var c = i.position, p = s.get("order"), d = wc(f, v, l, p, n.get("useUTC"), s.get("textStyle"));
      d && h.unshift(d);
      var g = l === "richText" ? `

` : "<br/>", y = h.join(g);
      this._showOrMove(s, function() {
        this._updateContentNotChangedOnAxis(e, u) ? this._updatePosition(s, c, o[0], o[1], this._tooltipContent, u) : this._showTooltipContent(s, y, u, Math.random() + "", o[0], o[1], c, null, v);
      });
    }, t.prototype._showSeriesItemTooltip = function(e, i, n) {
      var a = this._ecModel, o = et(i), s = o.seriesIndex, l = a.getSeriesByIndex(s), u = o.dataModel || l, f = o.dataIndex, h = o.dataType, v = u.getData(h), c = this._renderMode, p = e.positionDefault, d = gn([v.getItemModel(f), u, l && (l.coordinateSystem || {}).model], this._tooltipModel, p ? {
        position: p
      } : null), g = d.get("trigger");
      if (!(g != null && g !== "item")) {
        var y = u.getDataParams(f, h), m = new Cl();
        y.marker = m.makeTooltipMarker("item", Jr(y.color), c);
        var _ = gc(u.formatTooltip(f, !1, h)), S = d.get("order"), b = d.get("valueFormatter"), w = _.frag, x = w ? wc(b ? O({
          valueFormatter: b
        }, w) : w, m, c, S, a.get("useUTC"), d.get("textStyle")) : _.text, C = "item_" + u.name + "_" + f;
        this._showOrMove(d, function() {
          this._showTooltipContent(d, x, y, C, e.offsetX, e.offsetY, e.position, e.target, m);
        }), n({
          type: "showTip",
          dataIndexInside: f,
          dataIndex: v.getRawIndex(f),
          seriesIndex: s,
          from: this.uid
        });
      }
    }, t.prototype._showComponentItemTooltip = function(e, i, n) {
      var a = this._renderMode === "html", o = et(i), s = o.tooltipConfig, l = s.option || {}, u = l.encodeHTMLContent;
      if (z(l)) {
        var f = l;
        l = {
          content: f,
          // Fixed formatter
          formatter: f
        }, u = !0;
      }
      u && a && l.content && (l = Q(l), l.content = Ft(l.content));
      var h = [l], v = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
      v && h.push(v), h.push({
        formatter: l.content
      });
      var c = e.positionDefault, p = gn(h, this._tooltipModel, c ? {
        position: c
      } : null), d = p.get("content"), g = Math.random() + "", y = new Cl();
      this._showOrMove(p, function() {
        var m = Q(p.get("formatterParams") || {});
        this._showTooltipContent(p, d, m, g, e.offsetX, e.offsetY, e.position, i, y);
      }), n({
        type: "showTip",
        from: this.uid
      });
    }, t.prototype._showTooltipContent = function(e, i, n, a, o, s, l, u, f) {
      if (this._ticket = "", !(!e.get("showContent") || !e.get("show"))) {
        var h = this._tooltipContent;
        h.setEnterable(e.get("enterable"));
        var v = e.get("formatter");
        l = l || e.get("position");
        var c = i, p = this._getNearestPoint([o, s], n, e.get("trigger"), e.get("borderColor")), d = p.color;
        if (v)
          if (z(v)) {
            var g = e.ecModel.get("useUTC"), y = N(n) ? n[0] : n, m = y && y.axisType && y.axisType.indexOf("time") >= 0;
            c = v, m && (c = gs(y.axisValue, c, g)), c = iy(c, n, !0);
          } else if (X(v)) {
            var _ = Z(function(S, b) {
              S === this._ticket && (h.setContent(b, f, e, d, l), this._updatePosition(e, l, o, s, h, n, u));
            }, this);
            this._ticket = a, c = v(n, a, _);
          } else
            c = v;
        h.setContent(c, f, e, d, l), h.show(e, d), this._updatePosition(e, l, o, s, h, n, u);
      }
    }, t.prototype._getNearestPoint = function(e, i, n, a) {
      if (n === "axis" || N(i))
        return {
          color: a || (this._renderMode === "html" ? "#fff" : "none")
        };
      if (!N(i))
        return {
          color: a || i.color || i.borderColor
        };
    }, t.prototype._updatePosition = function(e, i, n, a, o, s, l) {
      var u = this._api.getWidth(), f = this._api.getHeight();
      i = i || e.get("position");
      var h = o.getSize(), v = e.get("align"), c = e.get("verticalAlign"), p = l && l.getBoundingRect().clone();
      if (l && p.applyTransform(l.transform), X(i) && (i = i([n, a], s, o.el, p, {
        viewSize: [u, f],
        contentSize: h.slice()
      })), N(i))
        n = St(i[0], u), a = St(i[1], f);
      else if (G(i)) {
        var d = i;
        d.width = h[0], d.height = h[1];
        var g = Kn(d, {
          width: u,
          height: f
        });
        n = g.x, a = g.y, v = null, c = null;
      } else if (z(i) && l) {
        var y = AA(i, p, h, e.get("borderWidth"));
        n = y[0], a = y[1];
      } else {
        var y = MA(n, a, o, u, f, v ? null : 20, c ? null : 20);
        n = y[0], a = y[1];
      }
      if (v && (n -= cd(v) ? h[0] / 2 : v === "right" ? h[0] : 0), c && (a -= cd(c) ? h[1] / 2 : c === "bottom" ? h[1] : 0), s0(e)) {
        var y = DA(n, a, o, u, f);
        n = y[0], a = y[1];
      }
      o.moveTo(n, a);
    }, t.prototype._updateContentNotChangedOnAxis = function(e, i) {
      var n = this._lastDataByCoordSys, a = this._cbParamsList, o = !!n && n.length === e.length;
      return o && M(n, function(s, l) {
        var u = s.dataByAxis || [], f = e[l] || {}, h = f.dataByAxis || [];
        o = o && u.length === h.length, o && M(u, function(v, c) {
          var p = h[c] || {}, d = v.seriesDataIndices || [], g = p.seriesDataIndices || [];
          o = o && v.value === p.value && v.axisType === p.axisType && v.axisId === p.axisId && d.length === g.length, o && M(d, function(y, m) {
            var _ = g[m];
            o = o && y.seriesIndex === _.seriesIndex && y.dataIndex === _.dataIndex;
          }), a && M(v.seriesDataIndices, function(y) {
            var m = y.seriesIndex, _ = i[m], S = a[m];
            _ && S && S.data !== _.data && (o = !1);
          });
        });
      }), this._lastDataByCoordSys = e, this._cbParamsList = i, !!o;
    }, t.prototype._hide = function(e) {
      this._lastDataByCoordSys = null, e({
        type: "hideTip",
        from: this.uid
      });
    }, t.prototype.dispose = function(e, i) {
      U.node || !i.getDom() || (Fo(this, "_updatePosition"), this._tooltipContent.dispose(), sf("itemTooltip", i));
    }, t.type = "tooltip", t;
  })(ue)
);
function gn(r, t, e) {
  var i = t.ecModel, n;
  e ? (n = new mt(e, i, i), n = new mt(t.option, n, i)) : n = t;
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a];
    o && (o instanceof mt && (o = o.get("tooltip", !0)), z(o) && (o = {
      formatter: o
    }), o && (n = new mt(o, n, i)));
  }
  return n;
}
function vd(r, t) {
  return r.dispatchAction || Z(t.dispatchAction, t);
}
function MA(r, t, e, i, n, a, o) {
  var s = e.getSize(), l = s[0], u = s[1];
  return a != null && (r + l + a + 2 > i ? r -= l + a : r += a), o != null && (t + u + o > n ? t -= u + o : t += o), [r, t];
}
function DA(r, t, e, i, n) {
  var a = e.getSize(), o = a[0], s = a[1];
  return r = Math.min(r + o, i) - o, t = Math.min(t + s, n) - s, r = Math.max(r, 0), t = Math.max(t, 0), [r, t];
}
function AA(r, t, e, i) {
  var n = e[0], a = e[1], o = Math.ceil(Math.SQRT2 * i) + 8, s = 0, l = 0, u = t.width, f = t.height;
  switch (r) {
    case "inside":
      s = t.x + u / 2 - n / 2, l = t.y + f / 2 - a / 2;
      break;
    case "top":
      s = t.x + u / 2 - n / 2, l = t.y - a - o;
      break;
    case "bottom":
      s = t.x + u / 2 - n / 2, l = t.y + f + o;
      break;
    case "left":
      s = t.x - n - o, l = t.y + f / 2 - a / 2;
      break;
    case "right":
      s = t.x + u + o, l = t.y + f / 2 - a / 2;
  }
  return [s, l];
}
function cd(r) {
  return r === "center" || r === "middle";
}
function LA(r, t, e) {
  var i = If(r).queryOptionMap, n = i.keys()[0];
  if (!(!n || n === "series")) {
    var a = sa(t, n, i.get(n), {
      useDefault: !1,
      enableAll: !1,
      enableNone: !1
    }), o = a.models[0];
    if (o) {
      var s = e.getViewOfComponentModel(o), l;
      if (s.group.traverse(function(u) {
        var f = et(u).tooltipConfig;
        if (f && f.name === r.name)
          return l = u, !0;
      }), l)
        return {
          componentMainType: n,
          componentIndex: o.componentIndex,
          el: l
        };
    }
  }
}
function IA(r) {
  me(i0), r.registerComponentModel(vA), r.registerComponentView(CA), r.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, Rt), r.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, Rt);
}
function h0(r, t) {
  if (!r)
    return !1;
  for (var e = N(r) ? r : [r], i = 0; i < e.length; i++)
    if (e[i] && e[i][t])
      return !0;
  return !1;
}
function qa(r) {
  Mu(r, "label", ["show"]);
}
var Ka = pt(), ei = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.createdBySelf = !1, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n), this._mergeOption(e, n, !1, !0);
    }, t.prototype.isAnimationEnabled = function() {
      if (U.node)
        return !1;
      var e = this.__hostSeries;
      return this.getShallow("animation") && e && e.isAnimationEnabled();
    }, t.prototype.mergeOption = function(e, i) {
      this._mergeOption(e, i, !1, !1);
    }, t.prototype._mergeOption = function(e, i, n, a) {
      var o = this.mainType;
      n || i.eachSeries(function(s) {
        var l = s.get(this.mainType, !0), u = Ka(s)[o];
        if (!l || !l.data) {
          Ka(s)[o] = null;
          return;
        }
        u ? u._mergeOption(l, i, !0) : (a && qa(l), M(l.data, function(f) {
          f instanceof Array ? (qa(f[0]), qa(f[1])) : qa(f);
        }), u = this.createMarkerModelFromSeries(l, this, i), O(u, {
          mainType: this.mainType,
          // Use the same series index and name
          seriesIndex: s.seriesIndex,
          name: s.name,
          createdBySelf: !0
        }), u.__hostSeries = s), Ka(s)[o] = u;
      }, this);
    }, t.prototype.formatTooltip = function(e, i, n) {
      var a = this.getData(), o = this.getRawValue(e), s = a.getName(e);
      return jr("section", {
        header: this.name,
        blocks: [jr("nameValue", {
          name: s,
          value: o,
          noName: !s,
          noValue: o == null
        })]
      });
    }, t.prototype.getData = function() {
      return this._data;
    }, t.prototype.setData = function(e) {
      this._data = e;
    }, t.prototype.getDataParams = function(e, i) {
      var n = jf.prototype.getDataParams.call(this, e, i), a = this.__hostSeries;
      return a && (n.seriesId = a.id, n.seriesName = a.name, n.seriesType = a.subType), n;
    }, t.getMarkerModelFromSeries = function(e, i) {
      return Ka(e)[i];
    }, t.type = "marker", t.dependencies = ["series", "grid", "polar", "geo"], t;
  })(ot)
);
_e(ei, jf.prototype);
function lf(r) {
  return !(isNaN(parseFloat(r.x)) && isNaN(parseFloat(r.y)));
}
function PA(r) {
  return !isNaN(parseFloat(r.x)) && !isNaN(parseFloat(r.y));
}
function Qa(r, t, e, i, n, a) {
  var o = [], s = ti(
    t,
    i
    /* , otherDataDim */
  ), l = s ? t.getCalculationInfo("stackResultDimension") : i, u = wh(t, l, r), f = t.indicesOfNearest(l, u)[0];
  o[n] = t.get(e, f), o[a] = t.get(l, f);
  var h = t.get(i, f), v = Le(t.get(i, f));
  return v = Math.min(v, 20), v >= 0 && (o[a] = +o[a].toFixed(v)), [o, h];
}
var tu = {
  min: lt(Qa, "min"),
  max: lt(Qa, "max"),
  average: lt(Qa, "average"),
  median: lt(Qa, "median")
};
function Zo(r, t) {
  if (t) {
    var e = r.getData(), i = r.coordinateSystem, n = i && i.dimensions;
    if (!PA(t) && !N(t.coord) && N(n)) {
      var a = v0(t, e, i, r);
      if (t = Q(t), t.type && tu[t.type] && a.baseAxis && a.valueAxis) {
        var o = rt(n, a.baseAxis.dim), s = rt(n, a.valueAxis.dim), l = tu[t.type](e, a.baseDataDim, a.valueDataDim, o, s);
        t.coord = l[0], t.value = l[1];
      } else
        t.coord = [t.xAxis != null ? t.xAxis : t.radiusAxis, t.yAxis != null ? t.yAxis : t.angleAxis];
    }
    if (t.coord == null || !N(n))
      t.coord = [];
    else
      for (var u = t.coord, f = 0; f < 2; f++)
        tu[u[f]] && (u[f] = wh(e, e.mapDimension(n[f]), u[f]));
    return t;
  }
}
function v0(r, t, e, i) {
  var n = {};
  return r.valueIndex != null || r.valueDim != null ? (n.valueDataDim = r.valueIndex != null ? t.getDimension(r.valueIndex) : r.valueDim, n.valueAxis = e.getAxis(RA(i, n.valueDataDim)), n.baseAxis = e.getOtherAxis(n.valueAxis), n.baseDataDim = t.mapDimension(n.baseAxis.dim)) : (n.baseAxis = i.getBaseAxis(), n.valueAxis = e.getOtherAxis(n.baseAxis), n.baseDataDim = t.mapDimension(n.baseAxis.dim), n.valueDataDim = t.mapDimension(n.valueAxis.dim)), n;
}
function RA(r, t) {
  var e = r.getData().getDimensionInfo(t);
  return e && e.coordDim;
}
function Xo(r, t) {
  return r && r.containData && t.coord && !lf(t) ? r.containData(t.coord) : !0;
}
function EA(r, t, e) {
  return r && r.containZone && t.coord && e.coord && !lf(t) && !lf(e) ? r.containZone(t.coord, e.coord) : !0;
}
function kA(r, t) {
  return r ? function(e, i, n, a) {
    var o = a < 2 ? e.coord && e.coord[a] : e.value;
    return hr(o, t[a]);
  } : function(e, i, n, a) {
    return hr(e.value, t[a]);
  };
}
function wh(r, t, e) {
  if (e === "average") {
    var i = 0, n = 0;
    return r.each(t, function(a, o) {
      isNaN(a) || (i += a, n++);
    }), i / n;
  } else return e === "median" ? r.getMedian(t) : r.getDataExtent(t)[e === "max" ? 1 : 0];
}
var eu = pt(), c0 = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.init = function() {
      this.markerGroupMap = Y();
    }, t.prototype.render = function(e, i, n) {
      var a = this, o = this.markerGroupMap;
      o.each(function(s) {
        eu(s).keep = !1;
      }), i.eachSeries(function(s) {
        var l = ei.getMarkerModelFromSeries(s, a.type);
        l && a.renderSeries(s, l, i, n);
      }), o.each(function(s) {
        !eu(s).keep && a.group.remove(s.group);
      });
    }, t.prototype.markKeep = function(e) {
      eu(e).keep = !0;
    }, t.prototype.toggleBlurSeries = function(e, i) {
      var n = this;
      M(e, function(a) {
        var o = ei.getMarkerModelFromSeries(a, n.type);
        if (o) {
          var s = o.getData();
          s.eachItemGraphicEl(function(l) {
            l && (i ? bg(l) : Of(l));
          });
        }
      });
    }, t.type = "marker", t;
  })(ue)
), OA = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.createMarkerModelFromSeries = function(e, i, n) {
      return new t(e, i, n);
    }, t.type = "markLine", t.defaultOption = {
      // zlevel: 0,
      z: 5,
      symbol: ["circle", "arrow"],
      symbolSize: [8, 16],
      // symbolRotate: 0,
      symbolOffset: 0,
      precision: 2,
      tooltip: {
        trigger: "item"
      },
      label: {
        show: !0,
        position: "end",
        distance: 5
      },
      lineStyle: {
        type: "dashed"
      },
      emphasis: {
        label: {
          show: !0
        },
        lineStyle: {
          width: 3
        }
      },
      animationEasing: "linear"
    }, t;
  })(ei)
), Ja = pt(), BA = function(r, t, e, i) {
  var n = r.getData(), a;
  if (N(i))
    a = i;
  else {
    var o = i.type;
    if (o === "min" || o === "max" || o === "average" || o === "median" || i.xAxis != null || i.yAxis != null) {
      var s = void 0, l = void 0;
      if (i.yAxis != null || i.xAxis != null)
        s = t.getAxis(i.yAxis != null ? "y" : "x"), l = De(i.yAxis, i.xAxis);
      else {
        var u = v0(i, n, t, r);
        s = u.valueAxis;
        var f = hm(n, u.valueDataDim);
        l = wh(n, f, o);
      }
      var h = s.dim === "x" ? 0 : 1, v = 1 - h, c = Q(i), p = {
        coord: []
      };
      c.type = null, c.coord = [], c.coord[v] = -1 / 0, p.coord[v] = 1 / 0;
      var d = e.get("precision");
      d >= 0 && ht(l) && (l = +l.toFixed(Math.min(d, 20))), c.coord[h] = p.coord[h] = l, a = [c, p, {
        type: o,
        valueIndex: i.valueIndex,
        // Force to use the value of calculated value.
        value: l
      }];
    } else
      a = [];
  }
  var g = [Zo(r, a[0]), Zo(r, a[1]), O({}, a[2])];
  return g[2].type = g[2].type || null, J(g[2], g[0]), J(g[2], g[1]), g;
};
function $o(r) {
  return !isNaN(r) && !isFinite(r);
}
function pd(r, t, e, i) {
  var n = 1 - r, a = i.dimensions[r];
  return $o(t[n]) && $o(e[n]) && t[r] === e[r] && i.getAxis(a).containData(t[r]);
}
function NA(r, t) {
  if (r.type === "cartesian2d") {
    var e = t[0].coord, i = t[1].coord;
    if (e && i && (pd(1, e, i, r) || pd(0, e, i, r)))
      return !0;
  }
  return Xo(r, t[0]) && Xo(r, t[1]);
}
function ru(r, t, e, i, n) {
  var a = i.coordinateSystem, o = r.getItemModel(t), s, l = St(o.get("x"), n.getWidth()), u = St(o.get("y"), n.getHeight());
  if (!isNaN(l) && !isNaN(u))
    s = [l, u];
  else {
    if (i.getMarkerPosition)
      s = i.getMarkerPosition(r.getValues(r.dimensions, t));
    else {
      var f = a.dimensions, h = r.get(f[0], t), v = r.get(f[1], t);
      s = a.dataToPoint([h, v]);
    }
    if (Ki(a, "cartesian2d")) {
      var c = a.getAxis("x"), p = a.getAxis("y"), f = a.dimensions;
      $o(r.get(f[0], t)) ? s[0] = c.toGlobalCoord(c.getExtent()[e ? 0 : 1]) : $o(r.get(f[1], t)) && (s[1] = p.toGlobalCoord(p.getExtent()[e ? 0 : 1]));
    }
    isNaN(l) || (s[0] = l), isNaN(u) || (s[1] = u);
  }
  r.setItemLayout(t, s);
}
var FA = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.updateTransform = function(e, i, n) {
      i.eachSeries(function(a) {
        var o = ei.getMarkerModelFromSeries(a, "markLine");
        if (o) {
          var s = o.getData(), l = Ja(o).from, u = Ja(o).to;
          l.each(function(f) {
            ru(l, f, !0, a, n), ru(u, f, !1, a, n);
          }), s.each(function(f) {
            s.setItemLayout(f, [l.getItemLayout(f), u.getItemLayout(f)]);
          }), this.markerGroupMap.get(a.id).updateLayout();
        }
      }, this);
    }, t.prototype.renderSeries = function(e, i, n, a) {
      var o = e.coordinateSystem, s = e.id, l = e.getData(), u = this.markerGroupMap, f = u.get(s) || u.set(s, new PD());
      this.group.add(f.group);
      var h = zA(o, e, i), v = h.from, c = h.to, p = h.line;
      Ja(i).from = v, Ja(i).to = c, i.setData(p);
      var d = i.get("symbol"), g = i.get("symbolSize"), y = i.get("symbolRotate"), m = i.get("symbolOffset");
      N(d) || (d = [d, d]), N(g) || (g = [g, g]), N(y) || (y = [y, y]), N(m) || (m = [m, m]), h.from.each(function(S) {
        _(v, S, !0), _(c, S, !1);
      }), p.each(function(S) {
        var b = p.getItemModel(S).getModel("lineStyle").getLineStyle();
        p.setItemLayout(S, [v.getItemLayout(S), c.getItemLayout(S)]), b.stroke == null && (b.stroke = v.getItemVisual(S, "style").fill), p.setItemVisual(S, {
          fromSymbolKeepAspect: v.getItemVisual(S, "symbolKeepAspect"),
          fromSymbolOffset: v.getItemVisual(S, "symbolOffset"),
          fromSymbolRotate: v.getItemVisual(S, "symbolRotate"),
          fromSymbolSize: v.getItemVisual(S, "symbolSize"),
          fromSymbol: v.getItemVisual(S, "symbol"),
          toSymbolKeepAspect: c.getItemVisual(S, "symbolKeepAspect"),
          toSymbolOffset: c.getItemVisual(S, "symbolOffset"),
          toSymbolRotate: c.getItemVisual(S, "symbolRotate"),
          toSymbolSize: c.getItemVisual(S, "symbolSize"),
          toSymbol: c.getItemVisual(S, "symbol"),
          style: b
        });
      }), f.updateData(p), h.line.eachItemGraphicEl(function(S) {
        et(S).dataModel = i, S.traverse(function(b) {
          et(b).dataModel = i;
        });
      });
      function _(S, b, w) {
        var x = S.getItemModel(b);
        ru(S, b, w, e, a);
        var C = x.getModel("itemStyle").getItemStyle();
        C.fill == null && (C.fill = ih(l, "color")), S.setItemVisual(b, {
          symbolKeepAspect: x.get("symbolKeepAspect"),
          // `0` should be considered as a valid value, so use `retrieve2` instead of `||`
          symbolOffset: q(x.get("symbolOffset", !0), m[w ? 0 : 1]),
          symbolRotate: q(x.get("symbolRotate", !0), y[w ? 0 : 1]),
          // TODO: when 2d array is supported, it should ignore parent
          symbolSize: q(x.get("symbolSize"), g[w ? 0 : 1]),
          symbol: q(x.get("symbol", !0), d[w ? 0 : 1]),
          style: C
        });
      }
      this.markKeep(f), f.group.silent = i.get("silent") || e.get("silent");
    }, t.type = "markLine", t;
  })(c0)
);
function zA(r, t, e) {
  var i;
  r ? i = V(r && r.dimensions, function(u) {
    var f = t.getData().getDimensionInfo(t.getData().mapDimension(u)) || {};
    return O(O({}, f), {
      name: u,
      // DON'T use ordinalMeta to parse and collect ordinal.
      ordinalMeta: null
    });
  }) : i = [{
    name: "value",
    type: "float"
  }];
  var n = new Bi(i, e), a = new Bi(i, e), o = new Bi([], e), s = V(e.get("data"), lt(BA, t, r, e));
  r && (s = bt(s, lt(NA, r)));
  var l = kA(!!r, i);
  return n.initData(V(s, function(u) {
    return u[0];
  }), null, l), a.initData(V(s, function(u) {
    return u[1];
  }), null, l), o.initData(V(s, function(u) {
    return u[2];
  })), o.hasItemOption = !0, {
    from: n,
    to: a,
    line: o
  };
}
function VA(r) {
  r.registerComponentModel(OA), r.registerComponentView(FA), r.registerPreprocessor(function(t) {
    h0(t.series, "markLine") && (t.markLine = t.markLine || {});
  });
}
var HA = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.createMarkerModelFromSeries = function(e, i, n) {
      return new t(e, i, n);
    }, t.type = "markArea", t.defaultOption = {
      // zlevel: 0,
      // PENDING
      z: 1,
      tooltip: {
        trigger: "item"
      },
      // markArea should fixed on the coordinate system
      animation: !1,
      label: {
        show: !0,
        position: "top"
      },
      itemStyle: {
        // color and borderColor default to use color from series
        // color: 'auto'
        // borderColor: 'auto'
        borderWidth: 0
      },
      emphasis: {
        label: {
          show: !0,
          position: "top"
        }
      }
    }, t;
  })(ei)
), ja = pt(), GA = function(r, t, e, i) {
  var n = i[0], a = i[1];
  if (!(!n || !a)) {
    var o = Zo(r, n), s = Zo(r, a), l = o.coord, u = s.coord;
    l[0] = De(l[0], -1 / 0), l[1] = De(l[1], -1 / 0), u[0] = De(u[0], 1 / 0), u[1] = De(u[1], 1 / 0);
    var f = k0([{}, o, s]);
    return f.coord = [o.coord, s.coord], f.x0 = o.x, f.y0 = o.y, f.x1 = s.x, f.y1 = s.y, f;
  }
};
function qo(r) {
  return !isNaN(r) && !isFinite(r);
}
function dd(r, t, e, i) {
  var n = 1 - r;
  return qo(t[n]) && qo(e[n]);
}
function WA(r, t) {
  var e = t.coord[0], i = t.coord[1], n = {
    coord: e,
    x: t.x0,
    y: t.y0
  }, a = {
    coord: i,
    x: t.x1,
    y: t.y1
  };
  return Ki(r, "cartesian2d") ? e && i && (dd(1, e, i) || dd(0, e, i)) ? !0 : EA(r, n, a) : Xo(r, n) || Xo(r, a);
}
function gd(r, t, e, i, n) {
  var a = i.coordinateSystem, o = r.getItemModel(t), s, l = St(o.get(e[0]), n.getWidth()), u = St(o.get(e[1]), n.getHeight());
  if (!isNaN(l) && !isNaN(u))
    s = [l, u];
  else {
    if (i.getMarkerPosition) {
      var f = r.getValues(["x0", "y0"], t), h = r.getValues(["x1", "y1"], t), v = a.clampData(f), c = a.clampData(h), p = [];
      e[0] === "x0" ? p[0] = v[0] > c[0] ? h[0] : f[0] : p[0] = v[0] > c[0] ? f[0] : h[0], e[1] === "y0" ? p[1] = v[1] > c[1] ? h[1] : f[1] : p[1] = v[1] > c[1] ? f[1] : h[1], s = i.getMarkerPosition(p, e, !0);
    } else {
      var d = r.get(e[0], t), g = r.get(e[1], t), y = [d, g];
      a.clampData && a.clampData(y, y), s = a.dataToPoint(y, !0);
    }
    if (Ki(a, "cartesian2d")) {
      var m = a.getAxis("x"), _ = a.getAxis("y"), d = r.get(e[0], t), g = r.get(e[1], t);
      qo(d) ? s[0] = m.toGlobalCoord(m.getExtent()[e[0] === "x0" ? 0 : 1]) : qo(g) && (s[1] = _.toGlobalCoord(_.getExtent()[e[1] === "y0" ? 0 : 1]));
    }
    isNaN(l) || (s[0] = l), isNaN(u) || (s[1] = u);
  }
  return s;
}
var yd = [["x0", "y0"], ["x1", "y0"], ["x1", "y1"], ["x0", "y1"]], UA = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.updateTransform = function(e, i, n) {
      i.eachSeries(function(a) {
        var o = ei.getMarkerModelFromSeries(a, "markArea");
        if (o) {
          var s = o.getData();
          s.each(function(l) {
            var u = V(yd, function(h) {
              return gd(s, l, h, a, n);
            });
            s.setItemLayout(l, u);
            var f = s.getItemGraphicEl(l);
            f.setShape("points", u);
          });
        }
      }, this);
    }, t.prototype.renderSeries = function(e, i, n, a) {
      var o = e.coordinateSystem, s = e.id, l = e.getData(), u = this.markerGroupMap, f = u.get(s) || u.set(s, {
        group: new gt()
      });
      this.group.add(f.group), this.markKeep(f);
      var h = YA(o, e, i);
      i.setData(h), h.each(function(v) {
        var c = V(yd, function(C) {
          return gd(h, v, C, e, a);
        }), p = o.getAxis("x").scale, d = o.getAxis("y").scale, g = p.getExtent(), y = d.getExtent(), m = [p.parse(h.get("x0", v)), p.parse(h.get("x1", v))], _ = [d.parse(h.get("y0", v)), d.parse(h.get("y1", v))];
        Vr(m), Vr(_);
        var S = !(g[0] > m[1] || g[1] < m[0] || y[0] > _[1] || y[1] < _[0]), b = !S;
        h.setItemLayout(v, {
          points: c,
          allClipped: b
        });
        var w = h.getItemModel(v).getModel("itemStyle").getItemStyle(), x = ih(l, "color");
        w.fill || (w.fill = x, z(w.fill) && (w.fill = Uh(w.fill, 0.4))), w.stroke || (w.stroke = x), h.setItemVisual(v, "style", w);
      }), h.diff(ja(f).data).add(function(v) {
        var c = h.getItemLayout(v);
        if (!c.allClipped) {
          var p = new zi({
            shape: {
              points: c.points
            }
          });
          h.setItemGraphicEl(v, p), f.group.add(p);
        }
      }).update(function(v, c) {
        var p = ja(f).data.getItemGraphicEl(c), d = h.getItemLayout(v);
        d.allClipped ? p && f.group.remove(p) : (p ? Ot(p, {
          shape: {
            points: d.points
          }
        }, i, v) : p = new zi({
          shape: {
            points: d.points
          }
        }), h.setItemGraphicEl(v, p), f.group.add(p));
      }).remove(function(v) {
        var c = ja(f).data.getItemGraphicEl(v);
        f.group.remove(c);
      }).execute(), h.eachItemGraphicEl(function(v, c) {
        var p = h.getItemModel(c), d = h.getItemVisual(c, "style");
        v.useStyle(h.getItemVisual(c, "style")), Zi(v, ri(p), {
          labelFetcher: i,
          labelDataIndex: c,
          defaultText: h.getName(c) || "",
          inheritColor: z(d.fill) ? Uh(d.fill, 1) : "#000"
        }), Po(v, p), Fi(v, null, null, p.get(["emphasis", "disabled"])), et(v).dataModel = i;
      }), ja(f).data = h, f.group.silent = i.get("silent") || e.get("silent");
    }, t.type = "markArea", t;
  })(c0)
);
function YA(r, t, e) {
  var i, n, a = ["x0", "y0", "x1", "y1"];
  if (r) {
    var o = V(r && r.dimensions, function(u) {
      var f = t.getData(), h = f.getDimensionInfo(f.mapDimension(u)) || {};
      return O(O({}, h), {
        name: u,
        // DON'T use ordinalMeta to parse and collect ordinal.
        ordinalMeta: null
      });
    });
    n = V(a, function(u, f) {
      return {
        name: u,
        type: o[f % 2].type
      };
    }), i = new Bi(n, e);
  } else
    n = [{
      name: "value",
      type: "float"
    }], i = new Bi(n, e);
  var s = V(e.get("data"), lt(GA, t, r, e));
  r && (s = bt(s, lt(WA, r)));
  var l = r ? function(u, f, h, v) {
    var c = u.coord[Math.floor(v / 2)][v % 2];
    return hr(c, n[v]);
  } : function(u, f, h, v) {
    return hr(u.value, n[v]);
  };
  return i.initData(s, null, l), i.hasItemOption = !0, i;
}
function ZA(r) {
  r.registerComponentModel(HA), r.registerComponentView(UA), r.registerPreprocessor(function(t) {
    h0(t.series, "markArea") && (t.markArea = t.markArea || {});
  });
}
var XA = function(r, t) {
  if (t === "all")
    return {
      type: "all",
      title: r.getLocaleModel().get(["legend", "selector", "all"])
    };
  if (t === "inverse")
    return {
      type: "inverse",
      title: r.getLocaleModel().get(["legend", "selector", "inverse"])
    };
}, uf = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.layoutMode = {
        type: "box",
        // legend.width/height are maxWidth/maxHeight actually,
        // whereas real width/height is calculated by its content.
        // (Setting {left: 10, right: 10} does not make sense).
        // So consider the case:
        // `setOption({legend: {left: 10});`
        // then `setOption({legend: {right: 10});`
        // The previous `left` should be cleared by setting `ignoreSize`.
        ignoreSize: !0
      }, e;
    }
    return t.prototype.init = function(e, i, n) {
      this.mergeDefaultAndTheme(e, n), e.selected = e.selected || {}, this._updateSelector(e);
    }, t.prototype.mergeOption = function(e, i) {
      r.prototype.mergeOption.call(this, e, i), this._updateSelector(e);
    }, t.prototype._updateSelector = function(e) {
      var i = e.selector, n = this.ecModel;
      i === !0 && (i = e.selector = ["all", "inverse"]), N(i) && M(i, function(a, o) {
        z(a) && (a = {
          type: a
        }), i[o] = J(a, XA(n, a.type));
      });
    }, t.prototype.optionUpdated = function() {
      this._updateData(this.ecModel);
      var e = this._data;
      if (e[0] && this.get("selectedMode") === "single") {
        for (var i = !1, n = 0; n < e.length; n++) {
          var a = e[n].get("name");
          if (this.isSelected(a)) {
            this.select(a), i = !0;
            break;
          }
        }
        !i && this.select(e[0].get("name"));
      }
    }, t.prototype._updateData = function(e) {
      var i = [], n = [];
      e.eachRawSeries(function(l) {
        var u = l.name;
        n.push(u);
        var f;
        if (l.legendVisualProvider) {
          var h = l.legendVisualProvider, v = h.getAllNames();
          e.isSeriesFiltered(l) || (n = n.concat(v)), v.length ? i = i.concat(v) : f = !0;
        } else
          f = !0;
        f && Lf(l) && i.push(l.name);
      }), this._availableNames = n;
      var a = this.get("data") || i, o = Y(), s = V(a, function(l) {
        return (z(l) || ht(l)) && (l = {
          name: l
        }), o.get(l.name) ? null : (o.set(l.name, !0), new mt(l, this, this.ecModel));
      }, this);
      this._data = bt(s, function(l) {
        return !!l;
      });
    }, t.prototype.getData = function() {
      return this._data;
    }, t.prototype.select = function(e) {
      var i = this.option.selected, n = this.get("selectedMode");
      if (n === "single") {
        var a = this._data;
        M(a, function(o) {
          i[o.get("name")] = !1;
        });
      }
      i[e] = !0;
    }, t.prototype.unSelect = function(e) {
      this.get("selectedMode") !== "single" && (this.option.selected[e] = !1);
    }, t.prototype.toggleSelected = function(e) {
      var i = this.option.selected;
      i.hasOwnProperty(e) || (i[e] = !0), this[i[e] ? "unSelect" : "select"](e);
    }, t.prototype.allSelect = function() {
      var e = this._data, i = this.option.selected;
      M(e, function(n) {
        i[n.get("name", !0)] = !0;
      });
    }, t.prototype.inverseSelect = function() {
      var e = this._data, i = this.option.selected;
      M(e, function(n) {
        var a = n.get("name", !0);
        i.hasOwnProperty(a) || (i[a] = !0), i[a] = !i[a];
      });
    }, t.prototype.isSelected = function(e) {
      var i = this.option.selected;
      return !(i.hasOwnProperty(e) && !i[e]) && rt(this._availableNames, e) >= 0;
    }, t.prototype.getOrient = function() {
      return this.get("orient") === "vertical" ? {
        index: 1,
        name: "vertical"
      } : {
        index: 0,
        name: "horizontal"
      };
    }, t.type = "legend.plain", t.dependencies = ["series"], t.defaultOption = {
      // zlevel: 0,
      z: 4,
      show: !0,
      orient: "horizontal",
      left: "center",
      // right: 'center',
      top: 0,
      // bottom: null,
      align: "auto",
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "#ccc",
      borderRadius: 0,
      borderWidth: 0,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
      symbolRotate: "inherit",
      symbolKeepAspect: !0,
      inactiveColor: "#ccc",
      inactiveBorderColor: "#ccc",
      inactiveBorderWidth: "auto",
      itemStyle: {
        color: "inherit",
        opacity: "inherit",
        borderColor: "inherit",
        borderWidth: "auto",
        borderCap: "inherit",
        borderJoin: "inherit",
        borderDashOffset: "inherit",
        borderMiterLimit: "inherit"
      },
      lineStyle: {
        width: "auto",
        color: "inherit",
        inactiveColor: "#ccc",
        inactiveWidth: 2,
        opacity: "inherit",
        type: "inherit",
        cap: "inherit",
        join: "inherit",
        dashOffset: "inherit",
        miterLimit: "inherit"
      },
      textStyle: {
        color: "#333"
      },
      selectedMode: !0,
      selector: !1,
      selectorLabel: {
        show: !0,
        borderRadius: 10,
        padding: [3, 5, 3, 5],
        fontSize: 12,
        fontFamily: "sans-serif",
        color: "#666",
        borderWidth: 1,
        borderColor: "#666"
      },
      emphasis: {
        selectorLabel: {
          show: !0,
          color: "#eee",
          backgroundColor: "#666"
        }
      },
      selectorPosition: "auto",
      selectorItemGap: 7,
      selectorButtonGap: 10,
      tooltip: {
        show: !1
      }
    }, t;
  })(ot)
), wi = lt, ff = M, to = gt, p0 = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.newlineDisabled = !1, e;
    }
    return t.prototype.init = function() {
      this.group.add(this._contentGroup = new to()), this.group.add(this._selectorGroup = new to()), this._isFirstRender = !0;
    }, t.prototype.getContentGroup = function() {
      return this._contentGroup;
    }, t.prototype.getSelectorGroup = function() {
      return this._selectorGroup;
    }, t.prototype.render = function(e, i, n) {
      var a = this._isFirstRender;
      if (this._isFirstRender = !1, this.resetInner(), !!e.get("show", !0)) {
        var o = e.get("align"), s = e.get("orient");
        (!o || o === "auto") && (o = e.get("left") === "right" && s === "vertical" ? "right" : "left");
        var l = e.get("selector", !0), u = e.get("selectorPosition", !0);
        l && (!u || u === "auto") && (u = s === "horizontal" ? "end" : "start"), this.renderInner(o, e, i, n, l, s, u);
        var f = e.getBoxLayoutParams(), h = {
          width: n.getWidth(),
          height: n.getHeight()
        }, v = e.get("padding"), c = Kn(f, h, v), p = this.layoutInner(e, o, c, a, l, u), d = Kn(st({
          width: p.width,
          height: p.height
        }, f), h, v);
        this.group.x = d.x - p.x, this.group.y = d.y - p.y, this.group.markRedraw(), this.group.add(this._backgroundEl = hA(p, e));
      }
    }, t.prototype.resetInner = function() {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
    }, t.prototype.renderInner = function(e, i, n, a, o, s, l) {
      var u = this.getContentGroup(), f = Y(), h = i.get("selectedMode"), v = [];
      n.eachRawSeries(function(c) {
        !c.get("legendHoverLink") && v.push(c.id);
      }), ff(i.getData(), function(c, p) {
        var d = c.get("name");
        if (!this.newlineDisabled && (d === "" || d === `
`)) {
          var g = new to();
          g.newline = !0, u.add(g);
          return;
        }
        var y = n.getSeriesByName(d)[0];
        if (!f.get(d))
          if (y) {
            var m = y.getData(), _ = m.getVisual("legendLineStyle") || {}, S = m.getVisual("legendIcon"), b = m.getVisual("style"), w = this._createItem(y, d, p, c, i, e, _, b, S, h, a);
            w.on("click", wi(md, d, null, a, v)).on("mouseover", wi(hf, y.name, null, a, v)).on("mouseout", wi(vf, y.name, null, a, v)), n.ssr && w.eachChild(function(x) {
              var C = et(x);
              C.seriesIndex = y.seriesIndex, C.dataIndex = p, C.ssrType = "legend";
            }), f.set(d, !0);
          } else
            n.eachRawSeries(function(x) {
              if (!f.get(d) && x.legendVisualProvider) {
                var C = x.legendVisualProvider;
                if (!C.containName(d))
                  return;
                var D = C.indexOfName(d), A = C.getItemVisual(D, "style"), T = C.getItemVisual(D, "legendIcon"), L = Pe(A.fill);
                L && L[3] === 0 && (L[3] = 0.2, A = O(O({}, A), {
                  fill: aa(L, "rgba")
                }));
                var I = this._createItem(x, d, p, c, i, e, {}, A, T, h, a);
                I.on("click", wi(md, null, d, a, v)).on("mouseover", wi(hf, null, d, a, v)).on("mouseout", wi(vf, null, d, a, v)), n.ssr && I.eachChild(function(P) {
                  var R = et(P);
                  R.seriesIndex = x.seriesIndex, R.dataIndex = p, R.ssrType = "legend";
                }), f.set(d, !0);
              }
            }, this);
      }, this), o && this._createSelector(o, i, a, s, l);
    }, t.prototype._createSelector = function(e, i, n, a, o) {
      var s = this.getSelectorGroup();
      ff(e, function(u) {
        var f = u.type, h = new kt({
          style: {
            x: 0,
            y: 0,
            align: "center",
            verticalAlign: "middle"
          },
          onclick: function() {
            n.dispatchAction({
              type: f === "all" ? "legendAllSelect" : "legendInverseSelect",
              legendId: i.id
            });
          }
        });
        s.add(h);
        var v = i.getModel("selectorLabel"), c = i.getModel(["emphasis", "selectorLabel"]);
        Zi(h, {
          normal: v,
          emphasis: c
        }, {
          defaultText: u.title
        }), Io(h);
      });
    }, t.prototype._createItem = function(e, i, n, a, o, s, l, u, f, h, v) {
      var c = e.visualDrawType, p = o.get("itemWidth"), d = o.get("itemHeight"), g = o.isSelected(i), y = a.get("symbolRotate"), m = a.get("symbolKeepAspect"), _ = a.get("icon");
      f = _ || f || "roundRect";
      var S = $A(f, a, l, u, c, g, v), b = new to(), w = a.getModel("textStyle");
      if (X(e.getLegendIcon) && (!_ || _ === "inherit"))
        b.add(e.getLegendIcon({
          itemWidth: p,
          itemHeight: d,
          icon: f,
          iconRotate: y,
          itemStyle: S.itemStyle,
          lineStyle: S.lineStyle,
          symbolKeepAspect: m
        }));
      else {
        var x = _ === "inherit" && e.getData().getVisual("symbol") ? y === "inherit" ? e.getData().getVisual("symbolRotate") : y : 0;
        b.add(qA({
          itemWidth: p,
          itemHeight: d,
          icon: f,
          iconRotate: x,
          itemStyle: S.itemStyle,
          symbolKeepAspect: m
        }));
      }
      var C = s === "left" ? p + 5 : -5, D = s, A = o.get("formatter"), T = i;
      z(A) && A ? T = A.replace("{name}", i ?? "") : X(A) && (T = A(i));
      var L = g ? w.getTextColor() : a.get("inactiveColor");
      b.add(new kt({
        style: Qr(w, {
          text: T,
          x: C,
          y: d / 2,
          fill: L,
          align: D,
          verticalAlign: "middle"
        }, {
          inheritColor: L
        })
      }));
      var I = new dt({
        shape: b.getBoundingRect(),
        style: {
          // Cannot use 'invisible' because SVG SSR will miss the node
          fill: "transparent"
        }
      }), P = a.getModel("tooltip");
      return P.get("show") && hs({
        el: I,
        componentModel: o,
        itemName: i,
        itemTooltipOption: P.option
      }), b.add(I), b.eachChild(function(R) {
        R.silent = !0;
      }), I.silent = !h, this.getContentGroup().add(b), Io(b), b.__legendDataIndex = n, b;
    }, t.prototype.layoutInner = function(e, i, n, a, o, s) {
      var l = this.getContentGroup(), u = this.getSelectorGroup();
      Bn(e.get("orient"), l, e.get("itemGap"), n.width, n.height);
      var f = l.getBoundingRect(), h = [-f.x, -f.y];
      if (u.markRedraw(), l.markRedraw(), o) {
        Bn(
          // Buttons in selectorGroup always layout horizontally
          "horizontal",
          u,
          e.get("selectorItemGap", !0)
        );
        var v = u.getBoundingRect(), c = [-v.x, -v.y], p = e.get("selectorButtonGap", !0), d = e.getOrient().index, g = d === 0 ? "width" : "height", y = d === 0 ? "height" : "width", m = d === 0 ? "y" : "x";
        s === "end" ? c[d] += f[g] + p : h[d] += v[g] + p, c[1 - d] += f[y] / 2 - v[y] / 2, u.x = c[0], u.y = c[1], l.x = h[0], l.y = h[1];
        var _ = {
          x: 0,
          y: 0
        };
        return _[g] = f[g] + p + v[g], _[y] = Math.max(f[y], v[y]), _[m] = Math.min(0, v[m] + c[1 - d]), _;
      } else
        return l.x = h[0], l.y = h[1], this.group.getBoundingRect();
    }, t.prototype.remove = function() {
      this.getContentGroup().removeAll(), this._isFirstRender = !0;
    }, t.type = "legend.plain", t;
  })(ue)
);
function $A(r, t, e, i, n, a, o) {
  function s(g, y) {
    g.lineWidth === "auto" && (g.lineWidth = y.lineWidth > 0 ? 2 : 0), ff(g, function(m, _) {
      g[_] === "inherit" && (g[_] = y[_]);
    });
  }
  var l = t.getModel("itemStyle"), u = l.getItemStyle(), f = r.lastIndexOf("empty", 0) === 0 ? "fill" : "stroke", h = l.getShallow("decal");
  u.decal = !h || h === "inherit" ? i.decal : Zu(h, o), u.fill === "inherit" && (u.fill = i[n]), u.stroke === "inherit" && (u.stroke = i[f]), u.opacity === "inherit" && (u.opacity = (n === "fill" ? i : e).opacity), s(u, i);
  var v = t.getModel("lineStyle"), c = v.getLineStyle();
  if (s(c, e), u.fill === "auto" && (u.fill = i.fill), u.stroke === "auto" && (u.stroke = i.fill), c.stroke === "auto" && (c.stroke = i.fill), !a) {
    var p = t.get("inactiveBorderWidth"), d = u[f];
    u.lineWidth = p === "auto" ? i.lineWidth > 0 && d ? 2 : 0 : u.lineWidth, u.fill = t.get("inactiveColor"), u.stroke = t.get("inactiveBorderColor"), c.stroke = v.get("inactiveColor"), c.lineWidth = v.get("inactiveWidth");
  }
  return {
    itemStyle: u,
    lineStyle: c
  };
}
function qA(r) {
  var t = r.icon || "roundRect", e = ke(t, 0, 0, r.itemWidth, r.itemHeight, r.itemStyle.fill, r.symbolKeepAspect);
  return e.setStyle(r.itemStyle), e.rotation = (r.iconRotate || 0) * Math.PI / 180, e.setOrigin([r.itemWidth / 2, r.itemHeight / 2]), t.indexOf("empty") > -1 && (e.style.stroke = e.style.fill, e.style.fill = "#fff", e.style.lineWidth = 2), e;
}
function md(r, t, e, i) {
  vf(r, t, e, i), e.dispatchAction({
    type: "legendToggleSelect",
    name: r ?? t
  }), hf(r, t, e, i);
}
function d0(r) {
  for (var t = r.getZr().storage.getDisplayList(), e, i = 0, n = t.length; i < n && !(e = t[i].states.emphasis); )
    i++;
  return e && e.hoverLayer;
}
function hf(r, t, e, i) {
  d0(e) || e.dispatchAction({
    type: "highlight",
    seriesName: r,
    name: t,
    excludeSeriesId: i
  });
}
function vf(r, t, e, i) {
  d0(e) || e.dispatchAction({
    type: "downplay",
    seriesName: r,
    name: t,
    excludeSeriesId: i
  });
}
function KA(r) {
  var t = r.findComponents({
    mainType: "legend"
  });
  t && t.length && r.filterSeries(function(e) {
    for (var i = 0; i < t.length; i++)
      if (!t[i].isSelected(e.name))
        return !1;
    return !0;
  });
}
function yn(r, t, e) {
  var i = r === "allSelect" || r === "inverseSelect", n = {}, a = [];
  e.eachComponent({
    mainType: "legend",
    query: t
  }, function(s) {
    i ? s[r]() : s[r](t.name), _d(s, n), a.push(s.componentIndex);
  });
  var o = {};
  return e.eachComponent("legend", function(s) {
    M(n, function(l, u) {
      s[l ? "select" : "unSelect"](u);
    }), _d(s, o);
  }), i ? {
    selected: o,
    // return legendIndex array to tell the developers which legends are allSelect / inverseSelect
    legendIndex: a
  } : {
    name: t.name,
    selected: o
  };
}
function _d(r, t) {
  var e = t || {};
  return M(r.getData(), function(i) {
    var n = i.get("name");
    if (!(n === `
` || n === "")) {
      var a = r.isSelected(n);
      $r(e, n) ? e[n] = e[n] && a : e[n] = a;
    }
  }), e;
}
function QA(r) {
  r.registerAction("legendToggleSelect", "legendselectchanged", lt(yn, "toggleSelected")), r.registerAction("legendAllSelect", "legendselectall", lt(yn, "allSelect")), r.registerAction("legendInverseSelect", "legendinverseselect", lt(yn, "inverseSelect")), r.registerAction("legendSelect", "legendselected", lt(yn, "select")), r.registerAction("legendUnSelect", "legendunselected", lt(yn, "unSelect"));
}
function g0(r) {
  r.registerComponentModel(uf), r.registerComponentView(p0), r.registerProcessor(r.PRIORITY.PROCESSOR.SERIES_FILTER, KA), r.registerSubTypeDefaulter("legend", function() {
    return "plain";
  }), QA(r);
}
var JA = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.prototype.setScrollDataIndex = function(e) {
      this.option.scrollDataIndex = e;
    }, t.prototype.init = function(e, i, n) {
      var a = fa(e);
      r.prototype.init.call(this, e, i, n), Sd(this, e, a);
    }, t.prototype.mergeOption = function(e, i) {
      r.prototype.mergeOption.call(this, e, i), Sd(this, this.option, e);
    }, t.type = "legend.scroll", t.defaultOption = ds(uf.defaultOption, {
      scrollDataIndex: 0,
      pageButtonItemGap: 5,
      pageButtonGap: null,
      pageButtonPosition: "end",
      pageFormatter: "{current}/{total}",
      pageIcons: {
        horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"],
        vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"]
      },
      pageIconColor: "#2f4554",
      pageIconInactiveColor: "#aaa",
      pageIconSize: 15,
      pageTextStyle: {
        color: "#333"
      },
      animationDurationUpdate: 800
    }), t;
  })(uf)
);
function Sd(r, t, e) {
  var i = r.getOrient(), n = [1, 1];
  n[i.index] = 0, Vi(t, e, {
    type: "box",
    ignoreSize: !!n
  });
}
var wd = gt, iu = ["width", "height"], nu = ["x", "y"], jA = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e.newlineDisabled = !0, e._currentIndex = 0, e;
    }
    return t.prototype.init = function() {
      r.prototype.init.call(this), this.group.add(this._containerGroup = new wd()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new wd());
    }, t.prototype.resetInner = function() {
      r.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
    }, t.prototype.renderInner = function(e, i, n, a, o, s, l) {
      var u = this;
      r.prototype.renderInner.call(this, e, i, n, a, o, s, l);
      var f = this._controllerGroup, h = i.get("pageIconSize", !0), v = N(h) ? h : [h, h];
      p("pagePrev", 0);
      var c = i.getModel("pageTextStyle");
      f.add(new kt({
        name: "pageText",
        style: {
          // Placeholder to calculate a proper layout.
          text: "xx/xx",
          fill: c.getTextColor(),
          font: c.getFont(),
          verticalAlign: "middle",
          align: "center"
        },
        silent: !0
      })), p("pageNext", 1);
      function p(d, g) {
        var y = d + "DataIndex", m = Hf(i.get("pageIcons", !0)[i.getOrient().name][g], {
          // Buttons will be created in each render, so we do not need
          // to worry about avoiding using legendModel kept in scope.
          onclick: Z(u._pageGo, u, y, i, a)
        }, {
          x: -v[0] / 2,
          y: -v[1] / 2,
          width: v[0],
          height: v[1]
        });
        m.name = d, f.add(m);
      }
    }, t.prototype.layoutInner = function(e, i, n, a, o, s) {
      var l = this.getSelectorGroup(), u = e.getOrient().index, f = iu[u], h = nu[u], v = iu[1 - u], c = nu[1 - u];
      o && Bn(
        // Buttons in selectorGroup always layout horizontally
        "horizontal",
        l,
        e.get("selectorItemGap", !0)
      );
      var p = e.get("selectorButtonGap", !0), d = l.getBoundingRect(), g = [-d.x, -d.y], y = Q(n);
      o && (y[f] = n[f] - d[f] - p);
      var m = this._layoutContentAndController(e, a, y, u, f, v, c, h);
      if (o) {
        if (s === "end")
          g[u] += m[f] + p;
        else {
          var _ = d[f] + p;
          g[u] -= _, m[h] -= _;
        }
        m[f] += d[f] + p, g[1 - u] += m[c] + m[v] / 2 - d[v] / 2, m[v] = Math.max(m[v], d[v]), m[c] = Math.min(m[c], d[c] + g[1 - u]), l.x = g[0], l.y = g[1], l.markRedraw();
      }
      return m;
    }, t.prototype._layoutContentAndController = function(e, i, n, a, o, s, l, u) {
      var f = this.getContentGroup(), h = this._containerGroup, v = this._controllerGroup;
      Bn(e.get("orient"), f, e.get("itemGap"), a ? n.width : null, a ? null : n.height), Bn(
        // Buttons in controller are layout always horizontally.
        "horizontal",
        v,
        e.get("pageButtonItemGap", !0)
      );
      var c = f.getBoundingRect(), p = v.getBoundingRect(), d = this._showController = c[o] > n[o], g = [-c.x, -c.y];
      i || (g[a] = f[u]);
      var y = [0, 0], m = [-p.x, -p.y], _ = q(e.get("pageButtonGap", !0), e.get("itemGap", !0));
      if (d) {
        var S = e.get("pageButtonPosition", !0);
        S === "end" ? m[a] += n[o] - p[o] : y[a] += p[o] + _;
      }
      m[1 - a] += c[s] / 2 - p[s] / 2, f.setPosition(g), h.setPosition(y), v.setPosition(m);
      var b = {
        x: 0,
        y: 0
      };
      if (b[o] = d ? n[o] : c[o], b[s] = Math.max(c[s], p[s]), b[l] = Math.min(0, p[l] + m[1 - a]), h.__rectSize = n[o], d) {
        var w = {
          x: 0,
          y: 0
        };
        w[o] = Math.max(n[o] - p[o] - _, 0), w[s] = b[s], h.setClipPath(new dt({
          shape: w
        })), h.__rectSize = w[o];
      } else
        v.eachChild(function(C) {
          C.attr({
            invisible: !0,
            silent: !0
          });
        });
      var x = this._getPageInfo(e);
      return x.pageIndex != null && Ot(
        f,
        {
          x: x.contentPosition[0],
          y: x.contentPosition[1]
        },
        // When switch from "show controller" to "not show controller", view should be
        // updated immediately without animation, otherwise causes weird effect.
        d ? e : null
      ), this._updatePageInfoView(e, x), b;
    }, t.prototype._pageGo = function(e, i, n) {
      var a = this._getPageInfo(i)[e];
      a != null && n.dispatchAction({
        type: "legendScroll",
        scrollDataIndex: a,
        legendId: i.id
      });
    }, t.prototype._updatePageInfoView = function(e, i) {
      var n = this._controllerGroup;
      M(["pagePrev", "pageNext"], function(f) {
        var h = f + "DataIndex", v = i[h] != null, c = n.childOfName(f);
        c && (c.setStyle("fill", v ? e.get("pageIconColor", !0) : e.get("pageIconInactiveColor", !0)), c.cursor = v ? "pointer" : "default");
      });
      var a = n.childOfName("pageText"), o = e.get("pageFormatter"), s = i.pageIndex, l = s != null ? s + 1 : 0, u = i.pageCount;
      a && o && a.setStyle("text", z(o) ? o.replace("{current}", l == null ? "" : l + "").replace("{total}", u == null ? "" : u + "") : o({
        current: l,
        total: u
      }));
    }, t.prototype._getPageInfo = function(e) {
      var i = e.get("scrollDataIndex", !0), n = this.getContentGroup(), a = this._containerGroup.__rectSize, o = e.getOrient().index, s = iu[o], l = nu[o], u = this._findTargetItemIndex(i), f = n.children(), h = f[u], v = f.length, c = v ? 1 : 0, p = {
        contentPosition: [n.x, n.y],
        pageCount: c,
        pageIndex: c - 1,
        pagePrevDataIndex: null,
        pageNextDataIndex: null
      };
      if (!h)
        return p;
      var d = S(h);
      p.contentPosition[o] = -d.s;
      for (var g = u + 1, y = d, m = d, _ = null; g <= v; ++g)
        _ = S(f[g]), // Half of the last item is out of the window.
        (!_ && m.e > y.s + a || _ && !b(_, y.s)) && (m.i > y.i ? y = m : y = _, y && (p.pageNextDataIndex == null && (p.pageNextDataIndex = y.i), ++p.pageCount)), m = _;
      for (var g = u - 1, y = d, m = d, _ = null; g >= -1; --g)
        _ = S(f[g]), // If the the end item does not intersect with the window started
        // from the current item, a page can be settled.
        (!_ || !b(m, _.s)) && y.i < m.i && (m = y, p.pagePrevDataIndex == null && (p.pagePrevDataIndex = y.i), ++p.pageCount, ++p.pageIndex), y = _;
      return p;
      function S(w) {
        if (w) {
          var x = w.getBoundingRect(), C = x[l] + w[l];
          return {
            s: C,
            e: C + x[s],
            i: w.__legendDataIndex
          };
        }
      }
      function b(w, x) {
        return w.e >= x && w.s <= x + a;
      }
    }, t.prototype._findTargetItemIndex = function(e) {
      if (!this._showController)
        return 0;
      var i, n = this.getContentGroup(), a;
      return n.eachChild(function(o, s) {
        var l = o.__legendDataIndex;
        a == null && l != null && (a = s), l === e && (i = s);
      }), i ?? a;
    }, t.type = "legend.scroll", t;
  })(p0)
);
function tL(r) {
  r.registerAction("legendScroll", "legendscroll", function(t, e) {
    var i = t.scrollDataIndex;
    i != null && e.eachComponent({
      mainType: "legend",
      subType: "scroll",
      query: t
    }, function(n) {
      n.setScrollDataIndex(i);
    });
  });
}
function eL(r) {
  me(g0), r.registerComponentModel(JA), r.registerComponentView(jA), tL(r);
}
function rL(r) {
  me(g0), me(eL);
}
var iL = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "dataZoom.inside", t.defaultOption = ds(Yo.defaultOption, {
      disabled: !1,
      zoomLock: !1,
      zoomOnMouseWheel: !0,
      moveOnMouseMove: !0,
      moveOnMouseWheel: !1,
      preventDefaultMouseMove: !0
    }), t;
  })(Yo)
), bh = pt();
function nL(r, t, e) {
  bh(r).coordSysRecordMap.each(function(i) {
    var n = i.dataZoomInfoMap.get(t.uid);
    n && (n.getRange = e);
  });
}
function aL(r, t) {
  for (var e = bh(r).coordSysRecordMap, i = e.keys(), n = 0; n < i.length; n++) {
    var a = i[n], o = e.get(a), s = o.dataZoomInfoMap;
    if (s) {
      var l = t.uid, u = s.get(l);
      u && (s.removeKey(l), s.keys().length || y0(e, o));
    }
  }
}
function y0(r, t) {
  if (t) {
    r.removeKey(t.model.uid);
    var e = t.controller;
    e && e.dispose();
  }
}
function oL(r, t) {
  var e = {
    model: t,
    containsPoint: lt(lL, t),
    dispatchAction: lt(sL, r),
    dataZoomInfoMap: null,
    controller: null
  }, i = e.controller = new DD(r.getZr());
  return M(["pan", "zoom", "scrollMove"], function(n) {
    i.on(n, function(a) {
      var o = [];
      e.dataZoomInfoMap.each(function(s) {
        if (a.isAvailableBehavior(s.model.option)) {
          var l = (s.getRange || {})[n], u = l && l(s.dzReferCoordSysInfo, e.model.mainType, e.controller, a);
          !s.model.get("disabled", !0) && u && o.push({
            dataZoomId: s.model.id,
            start: u[0],
            end: u[1]
          });
        }
      }), o.length && e.dispatchAction(o);
    });
  }), e;
}
function sL(r, t) {
  r.isDisposed() || r.dispatchAction({
    type: "dataZoom",
    animation: {
      easing: "cubicOut",
      duration: 100
    },
    batch: t
  });
}
function lL(r, t, e, i) {
  return r.coordinateSystem.containPoint([e, i]);
}
function uL(r) {
  var t, e = "type_", i = {
    type_true: 2,
    type_move: 1,
    type_false: 0,
    type_undefined: -1
  }, n = !0;
  return r.each(function(a) {
    var o = a.model, s = o.get("disabled", !0) ? !1 : o.get("zoomLock", !0) ? "move" : !0;
    i[e + s] > i[e + t] && (t = s), n = n && o.get("preventDefaultMouseMove", !0);
  }), {
    controlType: t,
    opt: {
      // RoamController will enable all of these functionalities,
      // and the final behavior is determined by its event listener
      // provided by each inside zoom.
      zoomOnMouseWheel: !0,
      moveOnMouseMove: !0,
      moveOnMouseWheel: !0,
      preventDefaultMouseMove: !!n
    }
  };
}
function fL(r) {
  r.registerProcessor(r.PRIORITY.PROCESSOR.FILTER, function(t, e) {
    var i = bh(e), n = i.coordSysRecordMap || (i.coordSysRecordMap = Y());
    n.each(function(a) {
      a.dataZoomInfoMap = null;
    }), t.eachComponent({
      mainType: "dataZoom",
      subType: "inside"
    }, function(a) {
      var o = n0(a);
      M(o.infoList, function(s) {
        var l = s.model.uid, u = n.get(l) || n.set(l, oL(e, s.model)), f = u.dataZoomInfoMap || (u.dataZoomInfoMap = Y());
        f.set(a.uid, {
          dzReferCoordSysInfo: s,
          model: a,
          getRange: null
        });
      });
    }), n.each(function(a) {
      var o = a.controller, s, l = a.dataZoomInfoMap;
      if (l) {
        var u = l.keys()[0];
        u != null && (s = l.get(u));
      }
      if (!s) {
        y0(n, a);
        return;
      }
      var f = uL(l);
      o.enable(f.controlType, f.opt), o.setPointerChecker(a.containsPoint), Ts(a, "dispatchAction", s.model.get("throttle", !0), "fixRate");
    });
  });
}
var hL = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = "dataZoom.inside", e;
    }
    return t.prototype.render = function(e, i, n) {
      if (r.prototype.render.apply(this, arguments), e.noTarget()) {
        this._clear();
        return;
      }
      this.range = e.getPercentRange(), nL(n, e, {
        pan: Z(au.pan, this),
        zoom: Z(au.zoom, this),
        scrollMove: Z(au.scrollMove, this)
      });
    }, t.prototype.dispose = function() {
      this._clear(), r.prototype.dispose.apply(this, arguments);
    }, t.prototype._clear = function() {
      aL(this.api, this.dataZoomModel), this.range = null;
    }, t.type = "dataZoom.inside", t;
  })(a0)
), au = {
  zoom: function(r, t, e, i) {
    var n = this.range, a = n.slice(), o = r.axisModels[0];
    if (o) {
      var s = ou[t](null, [i.originX, i.originY], o, e, r), l = (s.signal > 0 ? s.pixelStart + s.pixelLength - s.pixel : s.pixel - s.pixelStart) / s.pixelLength * (a[1] - a[0]) + a[0], u = Math.max(1 / i.scale, 0);
      a[0] = (a[0] - l) * u + l, a[1] = (a[1] - l) * u + l;
      var f = this.dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();
      if (Ps(0, a, [0, 100], 0, f.minSpan, f.maxSpan), this.range = a, n[0] !== a[0] || n[1] !== a[1])
        return a;
    }
  },
  pan: bd(function(r, t, e, i, n, a) {
    var o = ou[i]([a.oldX, a.oldY], [a.newX, a.newY], t, n, e);
    return o.signal * (r[1] - r[0]) * o.pixel / o.pixelLength;
  }),
  scrollMove: bd(function(r, t, e, i, n, a) {
    var o = ou[i]([0, 0], [a.scrollDelta, a.scrollDelta], t, n, e);
    return o.signal * (r[1] - r[0]) * a.scrollDelta;
  })
};
function bd(r) {
  return function(t, e, i, n) {
    var a = this.range, o = a.slice(), s = t.axisModels[0];
    if (s) {
      var l = r(o, s, t, e, i, n);
      if (Ps(l, o, [0, 100], "all"), this.range = o, a[0] !== o[0] || a[1] !== o[1])
        return o;
    }
  };
}
var ou = {
  grid: function(r, t, e, i, n) {
    var a = e.axis, o = {}, s = n.model.coordinateSystem.getRect();
    return r = r || [0, 0], a.dim === "x" ? (o.pixel = t[0] - r[0], o.pixelLength = s.width, o.pixelStart = s.x, o.signal = a.inverse ? 1 : -1) : (o.pixel = t[1] - r[1], o.pixelLength = s.height, o.pixelStart = s.y, o.signal = a.inverse ? -1 : 1), o;
  },
  polar: function(r, t, e, i, n) {
    var a = e.axis, o = {}, s = n.model.coordinateSystem, l = s.getRadiusAxis().getExtent(), u = s.getAngleAxis().getExtent();
    return r = r ? s.pointToCoord(r) : [0, 0], t = s.pointToCoord(t), e.mainType === "radiusAxis" ? (o.pixel = t[0] - r[0], o.pixelLength = l[1] - l[0], o.pixelStart = l[0], o.signal = a.inverse ? 1 : -1) : (o.pixel = t[1] - r[1], o.pixelLength = u[1] - u[0], o.pixelStart = u[0], o.signal = a.inverse ? -1 : 1), o;
  },
  singleAxis: function(r, t, e, i, n) {
    var a = e.axis, o = n.model.coordinateSystem.getRect(), s = {};
    return r = r || [0, 0], a.orient === "horizontal" ? (s.pixel = t[0] - r[0], s.pixelLength = o.width, s.pixelStart = o.x, s.signal = a.inverse ? 1 : -1) : (s.pixel = t[1] - r[1], s.pixelLength = o.height, s.pixelStart = o.y, s.signal = a.inverse ? -1 : 1), s;
  }
};
function vL(r) {
  o0(r), r.registerComponentModel(iL), r.registerComponentView(hL), fL(r);
}
var cL = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e;
    }
    return t.type = "dataZoom.slider", t.layoutMode = "box", t.defaultOption = ds(Yo.defaultOption, {
      show: !0,
      // deault value can only be drived in view stage.
      right: "ph",
      top: "ph",
      width: "ph",
      height: "ph",
      left: null,
      bottom: null,
      borderColor: "#d2dbee",
      borderRadius: 3,
      backgroundColor: "rgba(47,69,84,0)",
      // dataBackgroundColor: '#ddd',
      dataBackground: {
        lineStyle: {
          color: "#d2dbee",
          width: 0.5
        },
        areaStyle: {
          color: "#d2dbee",
          opacity: 0.2
        }
      },
      selectedDataBackground: {
        lineStyle: {
          color: "#8fb0f7",
          width: 0.5
        },
        areaStyle: {
          color: "#8fb0f7",
          opacity: 0.2
        }
      },
      // Color of selected window.
      fillerColor: "rgba(135,175,274,0.2)",
      handleIcon: "path://M-9.35,34.56V42m0-40V9.5m-2,0h4a2,2,0,0,1,2,2v21a2,2,0,0,1-2,2h-4a2,2,0,0,1-2-2v-21A2,2,0,0,1-11.35,9.5Z",
      // Percent of the slider height
      handleSize: "100%",
      handleStyle: {
        color: "#fff",
        borderColor: "#ACB8D1"
      },
      moveHandleSize: 7,
      moveHandleIcon: "path://M-320.9-50L-320.9-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-348-41-339-50-320.9-50z M-212.3-50L-212.3-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-239.4-41-230.4-50-212.3-50z M-103.7-50L-103.7-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-130.9-41-121.8-50-103.7-50z",
      moveHandleStyle: {
        color: "#D2DBEE",
        opacity: 0.7
      },
      showDetail: !0,
      showDataShadow: "auto",
      realtime: !0,
      zoomLock: !1,
      textStyle: {
        color: "#6E7079"
      },
      brushSelect: !0,
      brushStyle: {
        color: "rgba(135,175,274,0.15)"
      },
      emphasis: {
        handleLabel: {
          show: !0
        },
        handleStyle: {
          borderColor: "#8FB0F7"
        },
        moveHandleStyle: {
          color: "#8FB0F7"
        }
      }
    }), t;
  })(Yo)
), mn = dt, xd = 7, pL = 1, su = 30, dL = 7, _n = "horizontal", Td = "vertical", gL = 5, yL = ["line", "bar", "candlestick", "scatter"], mL = {
  easing: "cubicOut",
  duration: 100,
  delay: 0
}, _L = (
  /** @class */
  (function(r) {
    k(t, r);
    function t() {
      var e = r !== null && r.apply(this, arguments) || this;
      return e.type = t.type, e._displayables = {}, e;
    }
    return t.prototype.init = function(e, i) {
      this.api = i, this._onBrush = Z(this._onBrush, this), this._onBrushEnd = Z(this._onBrushEnd, this);
    }, t.prototype.render = function(e, i, n, a) {
      if (r.prototype.render.apply(this, arguments), Ts(this, "_dispatchZoomAction", e.get("throttle"), "fixRate"), this._orient = e.getOrient(), e.get("show") === !1) {
        this.group.removeAll();
        return;
      }
      if (e.noTarget()) {
        this._clear(), this.group.removeAll();
        return;
      }
      (!a || a.type !== "dataZoom" || a.from !== this.uid) && this._buildView(), this._updateView();
    }, t.prototype.dispose = function() {
      this._clear(), r.prototype.dispose.apply(this, arguments);
    }, t.prototype._clear = function() {
      Fo(this, "_dispatchZoomAction");
      var e = this.api.getZr();
      e.off("mousemove", this._onBrush), e.off("mouseup", this._onBrushEnd);
    }, t.prototype._buildView = function() {
      var e = this.group;
      e.removeAll(), this._brushing = !1, this._displayables.brushRect = null, this._resetLocation(), this._resetInterval();
      var i = this._displayables.sliderGroup = new gt();
      this._renderBackground(), this._renderHandle(), this._renderDataShadow(), e.add(i), this._positionGroup();
    }, t.prototype._resetLocation = function() {
      var e = this.dataZoomModel, i = this.api, n = e.get("brushSelect"), a = n ? dL : 0, o = this._findCoordRect(), s = {
        width: i.getWidth(),
        height: i.getHeight()
      }, l = this._orient === _n ? {
        // Why using 'right', because right should be used in vertical,
        // and it is better to be consistent for dealing with position param merge.
        right: s.width - o.x - o.width,
        top: s.height - su - xd - a,
        width: o.width,
        height: su
      } : {
        right: xd,
        top: o.y,
        width: su,
        height: o.height
      }, u = fa(e.option);
      M(["right", "top", "width", "height"], function(h) {
        u[h] === "ph" && (u[h] = l[h]);
      });
      var f = Kn(u, s);
      this._location = {
        x: f.x,
        y: f.y
      }, this._size = [f.width, f.height], this._orient === Td && this._size.reverse();
    }, t.prototype._positionGroup = function() {
      var e = this.group, i = this._location, n = this._orient, a = this.dataZoomModel.getFirstTargetAxisModel(), o = a && a.get("inverse"), s = this._displayables.sliderGroup, l = (this._dataShadowInfo || {}).otherAxisInverse;
      s.attr(n === _n && !o ? {
        scaleY: l ? 1 : -1,
        scaleX: 1
      } : n === _n && o ? {
        scaleY: l ? 1 : -1,
        scaleX: -1
      } : n === Td && !o ? {
        scaleY: l ? -1 : 1,
        scaleX: 1,
        rotation: Math.PI / 2
      } : {
        scaleY: l ? -1 : 1,
        scaleX: -1,
        rotation: Math.PI / 2
      });
      var u = e.getBoundingRect([s]);
      e.x = i.x - u.x, e.y = i.y - u.y, e.markRedraw();
    }, t.prototype._getViewExtent = function() {
      return [0, this._size[0]];
    }, t.prototype._renderBackground = function() {
      var e = this.dataZoomModel, i = this._size, n = this._displayables.sliderGroup, a = e.get("brushSelect");
      n.add(new mn({
        silent: !0,
        shape: {
          x: 0,
          y: 0,
          width: i[0],
          height: i[1]
        },
        style: {
          fill: e.get("backgroundColor")
        },
        z2: -40
      }));
      var o = new mn({
        shape: {
          x: 0,
          y: 0,
          width: i[0],
          height: i[1]
        },
        style: {
          fill: "transparent"
        },
        z2: 0,
        onclick: Z(this._onClickPanel, this)
      }), s = this.api.getZr();
      a ? (o.on("mousedown", this._onBrushStart, this), o.cursor = "crosshair", s.on("mousemove", this._onBrush), s.on("mouseup", this._onBrushEnd)) : (s.off("mousemove", this._onBrush), s.off("mouseup", this._onBrushEnd)), n.add(o);
    }, t.prototype._renderDataShadow = function() {
      var e = this._dataShadowInfo = this._prepareDataShadowInfo();
      if (this._displayables.dataShadowSegs = [], !e)
        return;
      var i = this._size, n = this._shadowSize || [], a = e.series, o = a.getRawData(), s = a.getShadowDim && a.getShadowDim(), l = s && o.getDimensionInfo(s) ? a.getShadowDim() : e.otherDim;
      if (l == null)
        return;
      var u = this._shadowPolygonPts, f = this._shadowPolylinePts;
      if (o !== this._shadowData || l !== this._shadowDim || i[0] !== n[0] || i[1] !== n[1]) {
        var h = o.getDataExtent(l), v = (h[1] - h[0]) * 0.3;
        h = [h[0] - v, h[1] + v];
        var c = [0, i[1]], p = [0, i[0]], d = [[i[0], 0], [0, 0]], g = [], y = p[1] / (o.count() - 1), m = 0, _ = Math.round(o.count() / i[0]), S;
        o.each([l], function(D, A) {
          if (_ > 0 && A % _) {
            m += y;
            return;
          }
          var T = D == null || isNaN(D) || D === "", L = T ? 0 : At(D, h, c, !0);
          T && !S && A ? (d.push([d[d.length - 1][0], 0]), g.push([g[g.length - 1][0], 0])) : !T && S && (d.push([m, 0]), g.push([m, 0])), d.push([m, L]), g.push([m, L]), m += y, S = T;
        }), u = this._shadowPolygonPts = d, f = this._shadowPolylinePts = g;
      }
      this._shadowData = o, this._shadowDim = l, this._shadowSize = [i[0], i[1]];
      var b = this.dataZoomModel;
      function w(D) {
        var A = b.getModel(D ? "selectedDataBackground" : "dataBackground"), T = new gt(), L = new zi({
          shape: {
            points: u
          },
          segmentIgnoreThreshold: 1,
          style: A.getModel("areaStyle").getAreaStyle(),
          silent: !0,
          z2: -20
        }), I = new ls({
          shape: {
            points: f
          },
          segmentIgnoreThreshold: 1,
          style: A.getModel("lineStyle").getLineStyle(),
          silent: !0,
          z2: -19
        });
        return T.add(L), T.add(I), T;
      }
      for (var x = 0; x < 3; x++) {
        var C = w(x === 1);
        this._displayables.sliderGroup.add(C), this._displayables.dataShadowSegs.push(C);
      }
    }, t.prototype._prepareDataShadowInfo = function() {
      var e = this.dataZoomModel, i = e.get("showDataShadow");
      if (i !== !1) {
        var n, a = this.ecModel;
        return e.eachTargetAxis(function(o, s) {
          var l = e.getAxisProxy(o, s).getTargetSeriesModels();
          M(l, function(u) {
            if (!n && !(i !== !0 && rt(yL, u.get("type")) < 0)) {
              var f = a.getComponent(sr(o), s).axis, h = SL(o), v, c = u.coordinateSystem;
              h != null && c.getOtherAxis && (v = c.getOtherAxis(f).inverse), h = u.getData().mapDimension(h), n = {
                thisAxis: f,
                series: u,
                thisDim: o,
                otherDim: h,
                otherAxisInverse: v
              };
            }
          }, this);
        }, this), n;
      }
    }, t.prototype._renderHandle = function() {
      var e = this.group, i = this._displayables, n = i.handles = [null, null], a = i.handleLabels = [null, null], o = this._displayables.sliderGroup, s = this._size, l = this.dataZoomModel, u = this.api, f = l.get("borderRadius") || 0, h = l.get("brushSelect"), v = i.filler = new mn({
        silent: h,
        style: {
          fill: l.get("fillerColor")
        },
        textConfig: {
          position: "inside"
        }
      });
      o.add(v), o.add(new mn({
        silent: !0,
        subPixelOptimize: !0,
        shape: {
          x: 0,
          y: 0,
          width: s[0],
          height: s[1],
          r: f
        },
        style: {
          // deprecated option
          stroke: l.get("dataBackgroundColor") || l.get("borderColor"),
          lineWidth: pL,
          fill: "rgba(0,0,0,0)"
        }
      })), M([0, 1], function(_) {
        var S = l.get("handleIcon");
        !Vo[S] && S.indexOf("path://") < 0 && S.indexOf("image://") < 0 && (S = "path://" + S);
        var b = ke(S, -1, 0, 2, 2, null, !0);
        b.attr({
          cursor: Cd(this._orient),
          draggable: !0,
          drift: Z(this._onDragMove, this, _),
          ondragend: Z(this._onDragEnd, this),
          onmouseover: Z(this._showDataInfo, this, !0),
          onmouseout: Z(this._showDataInfo, this, !1),
          z2: 5
        });
        var w = b.getBoundingRect(), x = l.get("handleSize");
        this._handleHeight = St(x, this._size[1]), this._handleWidth = w.width / w.height * this._handleHeight, b.setStyle(l.getModel("handleStyle").getItemStyle()), b.style.strokeNoScale = !0, b.rectHover = !0, b.ensureState("emphasis").style = l.getModel(["emphasis", "handleStyle"]).getItemStyle(), Io(b);
        var C = l.get("handleColor");
        C != null && (b.style.fill = C), o.add(n[_] = b);
        var D = l.getModel("textStyle"), A = l.get("handleLabel") || {}, T = A.show || !1;
        e.add(a[_] = new kt({
          silent: !0,
          invisible: !T,
          style: Qr(D, {
            x: 0,
            y: 0,
            text: "",
            verticalAlign: "middle",
            align: "center",
            fill: D.getTextColor(),
            font: D.getFont()
          }),
          z2: 10
        }));
      }, this);
      var c = v;
      if (h) {
        var p = St(l.get("moveHandleSize"), s[1]), d = i.moveHandle = new dt({
          style: l.getModel("moveHandleStyle").getItemStyle(),
          silent: !0,
          shape: {
            r: [0, 0, 2, 2],
            y: s[1] - 0.5,
            height: p
          }
        }), g = p * 0.8, y = i.moveHandleIcon = ke(l.get("moveHandleIcon"), -g / 2, -g / 2, g, g, "#fff", !0);
        y.silent = !0, y.y = s[1] + p / 2 - 0.5, d.ensureState("emphasis").style = l.getModel(["emphasis", "moveHandleStyle"]).getItemStyle();
        var m = Math.min(s[1] / 2, Math.max(p, 10));
        c = i.moveZone = new dt({
          invisible: !0,
          shape: {
            y: s[1] - m,
            height: p + m
          }
        }), c.on("mouseover", function() {
          u.enterEmphasis(d);
        }).on("mouseout", function() {
          u.leaveEmphasis(d);
        }), o.add(d), o.add(y), o.add(c);
      }
      c.attr({
        draggable: !0,
        cursor: Cd(this._orient),
        drift: Z(this._onDragMove, this, "all"),
        ondragstart: Z(this._showDataInfo, this, !0),
        ondragend: Z(this._onDragEnd, this),
        onmouseover: Z(this._showDataInfo, this, !0),
        onmouseout: Z(this._showDataInfo, this, !1)
      });
    }, t.prototype._resetInterval = function() {
      var e = this._range = this.dataZoomModel.getPercentRange(), i = this._getViewExtent();
      this._handleEnds = [At(e[0], [0, 100], i, !0), At(e[1], [0, 100], i, !0)];
    }, t.prototype._updateInterval = function(e, i) {
      var n = this.dataZoomModel, a = this._handleEnds, o = this._getViewExtent(), s = n.findRepresentativeAxisProxy().getMinMaxSpan(), l = [0, 100];
      Ps(i, a, o, n.get("zoomLock") ? "all" : e, s.minSpan != null ? At(s.minSpan, l, o, !0) : null, s.maxSpan != null ? At(s.maxSpan, l, o, !0) : null);
      var u = this._range, f = this._range = Vr([At(a[0], o, l, !0), At(a[1], o, l, !0)]);
      return !u || u[0] !== f[0] || u[1] !== f[1];
    }, t.prototype._updateView = function(e) {
      var i = this._displayables, n = this._handleEnds, a = Vr(n.slice()), o = this._size;
      M([0, 1], function(c) {
        var p = i.handles[c], d = this._handleHeight;
        p.attr({
          scaleX: d / 2,
          scaleY: d / 2,
          // This is a trick, by adding an extra tiny offset to let the default handle's end point align to the drag window.
          // NOTE: It may affect some custom shapes a bit. But we prefer to have better result by default.
          x: n[c] + (c ? -1 : 1),
          y: o[1] / 2 - d / 2
        });
      }, this), i.filler.setShape({
        x: a[0],
        y: 0,
        width: a[1] - a[0],
        height: o[1]
      });
      var s = {
        x: a[0],
        width: a[1] - a[0]
      };
      i.moveHandle && (i.moveHandle.setShape(s), i.moveZone.setShape(s), i.moveZone.getBoundingRect(), i.moveHandleIcon && i.moveHandleIcon.attr("x", s.x + s.width / 2));
      for (var l = i.dataShadowSegs, u = [0, a[0], a[1], o[0]], f = 0; f < l.length; f++) {
        var h = l[f], v = h.getClipPath();
        v || (v = new dt(), h.setClipPath(v)), v.setShape({
          x: u[f],
          y: 0,
          width: u[f + 1] - u[f],
          height: o[1]
        });
      }
      this._updateDataInfo(e);
    }, t.prototype._updateDataInfo = function(e) {
      var i = this.dataZoomModel, n = this._displayables, a = n.handleLabels, o = this._orient, s = ["", ""];
      if (i.get("showDetail")) {
        var l = i.findRepresentativeAxisProxy();
        if (l) {
          var u = l.getAxisModel().axis, f = this._range, h = e ? l.calculateDataWindow({
            start: f[0],
            end: f[1]
          }).valueWindow : l.getDataValueWindow();
          s = [this._formatLabel(h[0], u), this._formatLabel(h[1], u)];
        }
      }
      var v = Vr(this._handleEnds.slice());
      c.call(this, 0), c.call(this, 1);
      function c(p) {
        var d = zg(n.handles[p].parent, this.group), g = Vg(p === 0 ? "right" : "left", d), y = this._handleWidth / 2 + gL, m = $n([v[p] + (p === 0 ? -y : y), this._size[1] / 2], d);
        a[p].setStyle({
          x: m[0],
          y: m[1],
          verticalAlign: o === _n ? "middle" : g,
          align: o === _n ? g : "center",
          text: s[p]
        });
      }
    }, t.prototype._formatLabel = function(e, i) {
      var n = this.dataZoomModel, a = n.get("labelFormatter"), o = n.get("labelPrecision");
      (o == null || o === "auto") && (o = i.getPixelPrecision());
      var s = e == null || isNaN(e) ? "" : i.type === "category" || i.type === "time" ? i.scale.getLabel({
        value: Math.round(e)
      }) : e.toFixed(Math.min(o, 20));
      return X(a) ? a(e, s) : z(a) ? a.replace("{value}", s) : s;
    }, t.prototype._showDataInfo = function(e) {
      var i = this.dataZoomModel.get("handleLabel") || {}, n = i.show || !1, a = this.dataZoomModel.getModel(["emphasis", "handleLabel"]), o = a.get("show") || !1, s = e || this._dragging ? o : n, l = this._displayables, u = l.handleLabels;
      u[0].attr("invisible", !s), u[1].attr("invisible", !s), l.moveHandle && this.api[s ? "enterEmphasis" : "leaveEmphasis"](l.moveHandle, 1);
    }, t.prototype._onDragMove = function(e, i, n, a) {
      this._dragging = !0, Ni(a.event);
      var o = this._displayables.sliderGroup.getLocalTransform(), s = $n([i, n], o, !0), l = this._updateInterval(e, s[0]), u = this.dataZoomModel.get("realtime");
      this._updateView(!u), l && u && this._dispatchZoomAction(!0);
    }, t.prototype._onDragEnd = function() {
      this._dragging = !1, this._showDataInfo(!1);
      var e = this.dataZoomModel.get("realtime");
      !e && this._dispatchZoomAction(!1);
    }, t.prototype._onClickPanel = function(e) {
      var i = this._size, n = this._displayables.sliderGroup.transformCoordToLocal(e.offsetX, e.offsetY);
      if (!(n[0] < 0 || n[0] > i[0] || n[1] < 0 || n[1] > i[1])) {
        var a = this._handleEnds, o = (a[0] + a[1]) / 2, s = this._updateInterval("all", n[0] - o);
        this._updateView(), s && this._dispatchZoomAction(!1);
      }
    }, t.prototype._onBrushStart = function(e) {
      var i = e.offsetX, n = e.offsetY;
      this._brushStart = new ft(i, n), this._brushing = !0, this._brushStartTime = +/* @__PURE__ */ new Date();
    }, t.prototype._onBrushEnd = function(e) {
      if (this._brushing) {
        var i = this._displayables.brushRect;
        if (this._brushing = !1, !!i) {
          i.attr("ignore", !0);
          var n = i.shape, a = +/* @__PURE__ */ new Date();
          if (!(a - this._brushStartTime < 200 && Math.abs(n.width) < 5)) {
            var o = this._getViewExtent(), s = [0, 100];
            this._range = Vr([At(n.x, o, s, !0), At(n.x + n.width, o, s, !0)]), this._handleEnds = [n.x, n.x + n.width], this._updateView(), this._dispatchZoomAction(!1);
          }
        }
      }
    }, t.prototype._onBrush = function(e) {
      this._brushing && (Ni(e.event), this._updateBrushRect(e.offsetX, e.offsetY));
    }, t.prototype._updateBrushRect = function(e, i) {
      var n = this._displayables, a = this.dataZoomModel, o = n.brushRect;
      o || (o = n.brushRect = new mn({
        silent: !0,
        style: a.getModel("brushStyle").getItemStyle()
      }), n.sliderGroup.add(o)), o.attr("ignore", !1);
      var s = this._brushStart, l = this._displayables.sliderGroup, u = l.transformCoordToLocal(e, i), f = l.transformCoordToLocal(s.x, s.y), h = this._size;
      u[0] = Math.max(Math.min(h[0], u[0]), 0), o.setShape({
        x: f[0],
        y: 0,
        width: u[0] - f[0],
        height: h[1]
      });
    }, t.prototype._dispatchZoomAction = function(e) {
      var i = this._range;
      this.api.dispatchAction({
        type: "dataZoom",
        from: this.uid,
        dataZoomId: this.dataZoomModel.id,
        animation: e ? mL : null,
        start: i[0],
        end: i[1]
      });
    }, t.prototype._findCoordRect = function() {
      var e, i = n0(this.dataZoomModel).infoList;
      if (!e && i.length) {
        var n = i[0].model.coordinateSystem;
        e = n.getRect && n.getRect();
      }
      if (!e) {
        var a = this.api.getWidth(), o = this.api.getHeight();
        e = {
          x: a * 0.2,
          y: o * 0.2,
          width: a * 0.6,
          height: o * 0.6
        };
      }
      return e;
    }, t.type = "dataZoom.slider", t;
  })(a0)
);
function SL(r) {
  var t = {
    x: "y",
    y: "x",
    radius: "angle",
    angle: "radius"
  };
  return t[r];
}
function Cd(r) {
  return r === "vertical" ? "ns-resize" : "ew-resize";
}
function wL(r) {
  r.registerComponentModel(cL), r.registerComponentView(_L), o0(r);
}
function bL(r) {
  me(vL), me(wL);
}
function Md(r, t, e) {
  var i = Gi.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", r)), i.width = n * e, i.height = a * e, i;
}
var lu = (function(r) {
  k(t, r);
  function t(e, i, n) {
    var a = r.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    n = n || Co, typeof e == "string" ? o = Md(e, i, n) : G(e) && (o = e, e = o.id), a.id = e, a.dom = o;
    var s = o.style;
    return s && (kd(o), o.onselectstart = function() {
      return !1;
    }, s.padding = "0", s.margin = "0", s.borderWidth = "0"), a.painter = i, a.dpr = n, a;
  }
  return t.prototype.getElementCount = function() {
    return this.__endIndex - this.__startIndex;
  }, t.prototype.afterBrush = function() {
    this.__prevStartIndex = this.__startIndex, this.__prevEndIndex = this.__endIndex;
  }, t.prototype.initContext = function() {
    this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
  }, t.prototype.setUnpainted = function() {
    this.__firstTimePaint = !0;
  }, t.prototype.createBackBuffer = function() {
    var e = this.dpr;
    this.domBack = Md("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
  }, t.prototype.createRepaintRects = function(e, i, n, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, l = !1, u = new it(0, 0, 0, 0);
    function f(m) {
      if (!(!m.isFinite() || m.isZero()))
        if (o.length === 0) {
          var _ = new it(0, 0, 0, 0);
          _.copy(m), o.push(_);
        } else {
          for (var S = !1, b = 1 / 0, w = 0, x = 0; x < o.length; ++x) {
            var C = o[x];
            if (C.intersect(m)) {
              var D = new it(0, 0, 0, 0);
              D.copy(C), D.union(m), o[x] = D, S = !0;
              break;
            } else if (l) {
              u.copy(m), u.union(C);
              var A = m.width * m.height, T = C.width * C.height, L = u.width * u.height, I = L - A - T;
              I < b && (b = I, w = x);
            }
          }
          if (l && (o[w].union(m), S = !0), !S) {
            var _ = new it(0, 0, 0, 0);
            _.copy(m), o.push(_);
          }
          l || (l = o.length >= s);
        }
    }
    for (var h = this.__startIndex; h < this.__endIndex; ++h) {
      var v = e[h];
      if (v) {
        var c = v.shouldBePainted(n, a, !0, !0), p = v.__isRendered && (v.__dirty & $t || !c) ? v.getPrevPaintRect() : null;
        p && f(p);
        var d = c && (v.__dirty & $t || !v.__isRendered) ? v.getPaintRect() : null;
        d && f(d);
      }
    }
    for (var h = this.__prevStartIndex; h < this.__prevEndIndex; ++h) {
      var v = i[h], c = v && v.shouldBePainted(n, a, !0, !0);
      if (v && (!c || !v.__zr) && v.__isRendered) {
        var p = v.getPrevPaintRect();
        p && f(p);
      }
    }
    var g;
    do {
      g = !1;
      for (var h = 0; h < o.length; ) {
        if (o[h].isZero()) {
          o.splice(h, 1);
          continue;
        }
        for (var y = h + 1; y < o.length; )
          o[h].intersect(o[y]) ? (g = !0, o[h].union(o[y]), o.splice(y, 1)) : y++;
        h++;
      }
    } while (g);
    return this._paintRects = o, o;
  }, t.prototype.debugGetPaintRects = function() {
    return (this._paintRects || []).slice();
  }, t.prototype.resize = function(e, i) {
    var n = this.dpr, a = this.dom, o = a.style, s = this.domBack;
    o && (o.width = e + "px", o.height = i + "px"), a.width = e * n, a.height = i * n, s && (s.width = e * n, s.height = i * n, n !== 1 && this.ctxBack.scale(n, n));
  }, t.prototype.clear = function(e, i, n) {
    var a = this.dom, o = this.ctx, s = a.width, l = a.height;
    i = i || this.clearColor;
    var u = this.motionBlur && !e, f = this.lastFrameAlpha, h = this.dpr, v = this;
    u && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / h, l / h));
    var c = this.domBack;
    function p(d, g, y, m) {
      if (o.clearRect(d, g, y, m), i && i !== "transparent") {
        var _ = void 0;
        if (Jo(i)) {
          var S = i.global || i.__width === y && i.__height === m;
          _ = S && i.__canvasGradient || Uu(o, i, {
            x: 0,
            y: 0,
            width: y,
            height: m
          }), i.__canvasGradient = _, i.__width = y, i.__height = m;
        } else N0(i) && (i.scaleX = i.scaleX || h, i.scaleY = i.scaleY || h, _ = Yu(o, i, {
          dirty: function() {
            v.setUnpainted(), v.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = _ || i, o.fillRect(d, g, y, m), o.restore();
      }
      u && (o.save(), o.globalAlpha = f, o.drawImage(c, d, g, y, m), o.restore());
    }
    !n || u ? p(0, 0, s, l) : n.length && M(n, function(d) {
      p(d.x * h, d.y * h, d.width * h, d.height * h);
    });
  }, t;
})(Se), Dd = 1e5, Fr = 314159, eo = 0.01, xL = 1e-3;
function TL(r) {
  return r ? r.__builtin__ ? !0 : !(typeof r.resize != "function" || typeof r.refresh != "function") : !1;
}
function CL(r, t) {
  var e = document.createElement("div");
  return e.style.cssText = [
    "position:relative",
    "width:" + r + "px",
    "height:" + t + "px",
    "padding:0",
    "margin:0",
    "border-width:0"
  ].join(";") + ";", e;
}
var ML = (function() {
  function r(t, e, i, n) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = O({}, i || {}), this.dpr = i.devicePixelRatio || Co, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (kd(t), t.innerHTML = ""), this.storage = e;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var f = t, h = f.width, v = f.height;
      i.width != null && (h = i.width), i.height != null && (v = i.height), this.dpr = i.devicePixelRatio || 1, f.width = h * this.dpr, f.height = v * this.dpr, this._width = h, this._height = v;
      var c = new lu(f, this, this.dpr);
      c.__builtin__ = !0, c.initContext(), l[Fr] = c, c.zlevel = Fr, s.push(Fr), this._domRoot = t;
    } else {
      this._width = Fa(t, 0, i), this._height = Fa(t, 1, i);
      var u = this._domRoot = CL(this._width, this._height);
      t.appendChild(u);
    }
  }
  return r.prototype.getType = function() {
    return "canvas";
  }, r.prototype.isSingleCanvas = function() {
    return this._singleCanvas;
  }, r.prototype.getViewportRoot = function() {
    return this._domRoot;
  }, r.prototype.getViewportRootOffset = function() {
    var t = this.getViewportRoot();
    if (t)
      return {
        offsetLeft: t.offsetLeft || 0,
        offsetTop: t.offsetTop || 0
      };
  }, r.prototype.refresh = function(t) {
    var e = this.storage.getDisplayList(!0), i = this._prevDisplayList, n = this._zlevelList;
    this._redrawId = Math.random(), this._paintList(e, i, t, this._redrawId);
    for (var a = 0; a < n.length; a++) {
      var o = n[a], s = this._layers[o];
      if (!s.__builtin__ && s.refresh) {
        var l = a === 0 ? this._backgroundColor : null;
        s.refresh(l);
      }
    }
    return this._opts.useDirtyRect && (this._prevDisplayList = e.slice()), this;
  }, r.prototype.refreshHover = function() {
    this._paintHoverList(this.storage.getDisplayList(!1));
  }, r.prototype._paintHoverList = function(t) {
    var e = t.length, i = this._hoverlayer;
    if (i && i.clear(), !!e) {
      for (var n = {
        inHover: !0,
        viewWidth: this._width,
        viewHeight: this._height
      }, a, o = 0; o < e; o++) {
        var s = t[o];
        s.__inHover && (i || (i = this._hoverlayer = this.getLayer(Dd)), a || (a = i.ctx, a.save()), Wr(a, s, n, o === e - 1));
      }
      a && a.restore();
    }
  }, r.prototype.getHoverLayer = function() {
    return this.getLayer(Dd);
  }, r.prototype.paintOne = function(t, e) {
    Vy(t, e);
  }, r.prototype._paintList = function(t, e, i, n) {
    if (this._redrawId === n) {
      i = i || !1, this._updateLayerStatus(t);
      var a = this._doPaintList(t, e, i), o = a.finished, s = a.needsRefreshHover;
      if (this._needsManuallyCompositing && this._compositeManually(), s && this._paintHoverList(t), o)
        this.eachLayer(function(u) {
          u.afterBrush && u.afterBrush();
        });
      else {
        var l = this;
        mo(function() {
          l._paintList(t, e, i, n);
        });
      }
    }
  }, r.prototype._compositeManually = function() {
    var t = this.getLayer(Fr).ctx, e = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, e, i), this.eachBuiltinLayer(function(n) {
      n.virtual && t.drawImage(n.dom, 0, 0, e, i);
    });
  }, r.prototype._doPaintList = function(t, e, i) {
    for (var n = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
      var l = this._zlevelList[s], u = this._layers[l];
      u.__builtin__ && u !== this._hoverlayer && (u.__dirty || i) && a.push(u);
    }
    for (var f = !0, h = !1, v = function(d) {
      var g = a[d], y = g.ctx, m = o && g.createRepaintRects(t, e, c._width, c._height), _ = i ? g.__startIndex : g.__drawIndex, S = !i && g.incremental && Date.now, b = S && Date.now(), w = g.zlevel === c._zlevelList[0] ? c._backgroundColor : null;
      if (g.__startIndex === g.__endIndex)
        g.clear(!1, w, m);
      else if (_ === g.__startIndex) {
        var x = t[_];
        (!x.incremental || !x.notClear || i) && g.clear(!1, w, m);
      }
      _ === -1 && (console.error("For some unknown reason. drawIndex is -1"), _ = g.__startIndex);
      var C, D = function(I) {
        var P = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: n._width,
          viewHeight: n._height
        };
        for (C = _; C < g.__endIndex; C++) {
          var R = t[C];
          if (R.__inHover && (h = !0), n._doPaintEl(R, g, o, I, P, C === g.__endIndex - 1), S) {
            var E = Date.now() - b;
            if (E > 15)
              break;
          }
        }
        P.prevElClipPaths && y.restore();
      };
      if (m)
        if (m.length === 0)
          C = g.__endIndex;
        else
          for (var A = c.dpr, T = 0; T < m.length; ++T) {
            var L = m[T];
            y.save(), y.beginPath(), y.rect(L.x * A, L.y * A, L.width * A, L.height * A), y.clip(), D(L), y.restore();
          }
      else
        y.save(), D(), y.restore();
      g.__drawIndex = C, g.__drawIndex < g.__endIndex && (f = !1);
    }, c = this, p = 0; p < a.length; p++)
      v(p);
    return U.wxa && M(this._layers, function(d) {
      d && d.ctx && d.ctx.draw && d.ctx.draw();
    }), {
      finished: f,
      needsRefreshHover: h
    };
  }, r.prototype._doPaintEl = function(t, e, i, n, a, o) {
    var s = e.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!n || l && l.intersect(n)) && (Wr(s, t, a, o), t.setPrevPaintRect(l));
    } else
      Wr(s, t, a, o);
  }, r.prototype.getLayer = function(t, e) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = Fr);
    var i = this._layers[t];
    return i || (i = new lu("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? J(i, this._layerConfig[t], !0) : this._layerConfig[t - eo] && J(i, this._layerConfig[t - eo], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;
  }, r.prototype.insertLayer = function(t, e) {
    var i = this._layers, n = this._zlevelList, a = n.length, o = this._domRoot, s = null, l = -1;
    if (!i[t] && TL(e)) {
      if (a > 0 && t > n[0]) {
        for (l = 0; l < a - 1 && !(n[l] < t && n[l + 1] > t); l++)
          ;
        s = i[n[l]];
      }
      if (n.splice(l + 1, 0, t), i[t] = e, !e.virtual)
        if (s) {
          var u = s.dom;
          u.nextSibling ? o.insertBefore(e.dom, u.nextSibling) : o.appendChild(e.dom);
        } else
          o.firstChild ? o.insertBefore(e.dom, o.firstChild) : o.appendChild(e.dom);
      e.painter || (e.painter = this);
    }
  }, r.prototype.eachLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n];
      t.call(e, this._layers[a], a);
    }
  }, r.prototype.eachBuiltinLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ && t.call(e, o, a);
    }
  }, r.prototype.eachOtherLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ || t.call(e, o, a);
    }
  }, r.prototype.getLayers = function() {
    return this._layers;
  }, r.prototype._updateLayerStatus = function(t) {
    this.eachBuiltinLayer(function(h, v) {
      h.__dirty = h.__used = !1;
    });
    function e(h) {
      a && (a.__endIndex !== h && (a.__dirty = !0), a.__endIndex = h);
    }
    if (this._singleCanvas)
      for (var i = 1; i < t.length; i++) {
        var n = t[i];
        if (n.zlevel !== t[i - 1].zlevel || n.incremental) {
          this._needsManuallyCompositing = !0;
          break;
        }
      }
    var a = null, o = 0, s, l;
    for (l = 0; l < t.length; l++) {
      var n = t[l], u = n.zlevel, f = void 0;
      s !== u && (s = u, o = 0), n.incremental ? (f = this.getLayer(u + xL, this._needsManuallyCompositing), f.incremental = !0, o = 1) : f = this.getLayer(u + (o > 0 ? eo : 0), this._needsManuallyCompositing), f.__builtin__ || yf("ZLevel " + u + " has been used by unkown layer " + f.id), f !== a && (f.__used = !0, f.__startIndex !== l && (f.__dirty = !0), f.__startIndex = l, f.incremental ? f.__drawIndex = -1 : f.__drawIndex = l, e(l), a = f), n.__dirty & $t && !n.__inHover && (f.__dirty = !0, f.incremental && f.__drawIndex < 0 && (f.__drawIndex = l));
    }
    e(l), this.eachBuiltinLayer(function(h, v) {
      !h.__used && h.getElementCount() > 0 && (h.__dirty = !0, h.__startIndex = h.__endIndex = h.__drawIndex = 0), h.__dirty && h.__drawIndex < 0 && (h.__drawIndex = h.__startIndex);
    });
  }, r.prototype.clear = function() {
    return this.eachBuiltinLayer(this._clearLayer), this;
  }, r.prototype._clearLayer = function(t) {
    t.clear();
  }, r.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, M(this._layers, function(e) {
      e.setUnpainted();
    });
  }, r.prototype.configLayer = function(t, e) {
    if (e) {
      var i = this._layerConfig;
      i[t] ? J(i[t], e, !0) : i[t] = e;
      for (var n = 0; n < this._zlevelList.length; n++) {
        var a = this._zlevelList[n];
        if (a === t || a === t + eo) {
          var o = this._layers[a];
          J(o, i[t], !0);
        }
      }
    }
  }, r.prototype.delLayer = function(t) {
    var e = this._layers, i = this._zlevelList, n = e[t];
    n && (n.dom.parentNode.removeChild(n.dom), delete e[t], i.splice(rt(i, t), 1));
  }, r.prototype.resize = function(t, e) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var n = this._opts, a = this.root;
      if (t != null && (n.width = t), e != null && (n.height = e), t = Fa(a, 0, n), e = Fa(a, 1, n), i.style.display = "", this._width !== t || e !== this._height) {
        i.style.width = t + "px", i.style.height = e + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
        this.refresh(!0);
      }
      this._width = t, this._height = e;
    } else {
      if (t == null || e == null)
        return;
      this._width = t, this._height = e, this.getLayer(Fr).resize(t, e);
    }
    return this;
  }, r.prototype.clearLayer = function(t) {
    var e = this._layers[t];
    e && e.clear();
  }, r.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, r.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[Fr].dom;
    var e = new lu("image", this, t.pixelRatio || this.dpr);
    e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor);
    var i = e.ctx;
    if (t.pixelRatio <= this.dpr) {
      this.refresh();
      var n = e.dom.width, a = e.dom.height;
      this.eachLayer(function(h) {
        h.__builtin__ ? i.drawImage(h.dom, 0, 0, n, a) : h.renderToCanvas && (i.save(), h.renderToCanvas(i), i.restore());
      });
    } else
      for (var o = {
        inHover: !1,
        viewWidth: this._width,
        viewHeight: this._height
      }, s = this.storage.getDisplayList(!0), l = 0, u = s.length; l < u; l++) {
        var f = s[l];
        Wr(i, f, o, l === u - 1);
      }
    return e.dom;
  }, r.prototype.getWidth = function() {
    return this._width;
  }, r.prototype.getHeight = function() {
    return this._height;
  }, r;
})();
function DL(r) {
  r.registerPainter("canvas", ML);
}
me([GM, MM, CD, iA, IA, rL, bL, VA, ZA, DL]);
const Ko = class Ko extends m0 {
  constructor() {
    super(...arguments), this._mq = window.matchMedia("(prefers-color-scheme: dark)"), this._fresh = !0, this._apply = () => {
      !this._chart || !this.option || (this._chart.setOption(this.option(this._theme()), { notMerge: this._fresh, lazyUpdate: !0 }), this._fresh = !1);
    }, this._retheme = () => {
      this._fresh = !0, this._apply();
    };
  }
  _theme() {
    const t = getComputedStyle(this), e = (i, n) => t.getPropertyValue(i).trim() || n;
    return {
      text: e("--cp-text", "#e6edf3"),
      muted: e("--cp-muted", "#8b949e"),
      border: e("--cp-border", "#30363d"),
      surface: e("--cp-surface", "#161b22")
    };
  }
  firstUpdated() {
    const t = this.renderRoot.querySelector(".c");
    this._chart = OT(t, void 0, { renderer: "canvas" }), this._apply(), this._ro = new ResizeObserver(() => this._chart?.resize()), this._ro.observe(t), this._mq.addEventListener("change", this._retheme);
  }
  updated(t) {
    t.has("option") && this._apply();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._ro?.disconnect(), this._mq.removeEventListener("change", this._retheme), this._chart?.dispose(), this._chart = void 0, this._fresh = !0;
  }
  connectedCallback() {
    super.connectedCallback(), this.hasUpdated && !this._chart && this.firstUpdated();
  }
  render() {
    return _0`<div class="c"></div>`;
  }
};
Ko.properties = { option: { attribute: !1 } }, Ko.styles = S0`
    :host { display: block; height: 260px; }
    .c { width: 100%; height: 100%; }
  `;
let cf = Ko;
customElements.get("cp-echart") || customElements.define("cp-echart", cf);
export {
  cf as CpEchart
};
