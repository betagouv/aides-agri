var dp = Object.defineProperty;
var up = (e, t, n) => t in e ? dp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Y = (e, t, n) => up(e, typeof t != "symbol" ? t + "" : t, n);
var au = {};
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function xn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const yt = au.NODE_ENV !== "production" ? Object.freeze({}) : {}, Di = au.NODE_ENV !== "production" ? Object.freeze([]) : [], zt = () => {
}, fp = () => !1, Vs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Bo = (e) => e.startsWith("onUpdate:"), Nt = Object.assign, ua = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, pp = Object.prototype.hasOwnProperty, pt = (e, t) => pp.call(e, t), K = Array.isArray, Qn = (e) => $s(e) === "[object Map]", kr = (e) => $s(e) === "[object Set]", bc = (e) => $s(e) === "[object Date]", it = (e) => typeof e == "function", Et = (e) => typeof e == "string", Qe = (e) => typeof e == "symbol", xt = (e) => e !== null && typeof e == "object", fa = (e) => (xt(e) || it(e)) && it(e.then) && it(e.catch), cu = Object.prototype.toString, $s = (e) => cu.call(e), pa = (e) => $s(e).slice(8, -1), wr = (e) => $s(e) === "[object Object]", ga = (e) => Et(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, us = /* @__PURE__ */ xn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), gp = /* @__PURE__ */ xn(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), _r = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, mp = /-(\w)/g, qt = _r(
  (e) => e.replace(mp, (t, n) => n ? n.toUpperCase() : "")
), vp = /\B([A-Z])/g, ge = _r(
  (e) => e.replace(vp, "-$1").toLowerCase()
), ai = _r((e) => e.charAt(0).toUpperCase() + e.slice(1)), qn = _r(
  (e) => e ? `on${ai(e)}` : ""
), Dn = (e, t) => !Object.is(e, t), Mi = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, zo = (e, t, n, i = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: i,
    value: n
  });
}, hu = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, yc = (e) => {
  const t = Et(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let xc;
const Bs = () => xc || (xc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function C(e) {
  if (K(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n], s = Et(i) ? kp(i) : C(i);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (Et(e) || xt(e))
    return e;
}
const bp = /;(?![^(]*\))/g, yp = /:([^]+)/, xp = /\/\*[^]*?\*\//g;
function kp(e) {
  const t = {};
  return e.replace(xp, "").split(bp).forEach((n) => {
    if (n) {
      const i = n.split(yp);
      i.length > 1 && (t[i[0].trim()] = i[1].trim());
    }
  }), t;
}
function ie(e) {
  let t = "";
  if (Et(e))
    t = e;
  else if (K(e))
    for (let n = 0; n < e.length; n++) {
      const i = ie(e[n]);
      i && (t += i + " ");
    }
  else if (xt(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const wp = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", _p = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Mp = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Cp = /* @__PURE__ */ xn(wp), Sp = /* @__PURE__ */ xn(_p), Ep = /* @__PURE__ */ xn(Mp), Pp = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Dp = /* @__PURE__ */ xn(Pp);
function du(e) {
  return !!e || e === "";
}
function Np(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let i = 0; n && i < e.length; i++)
    n = Mr(e[i], t[i]);
  return n;
}
function Mr(e, t) {
  if (e === t) return !0;
  let n = bc(e), i = bc(t);
  if (n || i)
    return n && i ? e.getTime() === t.getTime() : !1;
  if (n = Qe(e), i = Qe(t), n || i)
    return e === t;
  if (n = K(e), i = K(t), n || i)
    return n && i ? Np(e, t) : !1;
  if (n = xt(e), i = xt(t), n || i) {
    if (!n || !i)
      return !1;
    const s = Object.keys(e).length, r = Object.keys(t).length;
    if (s !== r)
      return !1;
    for (const o in e) {
      const l = e.hasOwnProperty(o), a = t.hasOwnProperty(o);
      if (l && !a || !l && a || !Mr(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Op(e, t) {
  return e.findIndex((n) => Mr(n, t));
}
const uu = (e) => !!(e && e.__v_isRef === !0), X = (e) => Et(e) ? e : e == null ? "" : K(e) || xt(e) && (e.toString === cu || !it(e.toString)) ? uu(e) ? X(e.value) : JSON.stringify(e, fu, 2) : String(e), fu = (e, t) => uu(t) ? fu(e, t.value) : Qn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [i, s], r) => (n[zr(i, r) + " =>"] = s, n),
    {}
  )
} : kr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => zr(n))
} : Qe(t) ? zr(t) : xt(t) && !K(t) && !wr(t) ? String(t) : t, zr = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Qe(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
var St = {};
function tn(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let fe;
class Rp {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = fe, !t && fe && (this.index = (fe.scopes || (fe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = fe;
      try {
        return fe = this, t();
      } finally {
        fe = n;
      }
    } else St.NODE_ENV !== "production" && tn("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    fe = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    fe = this.parent;
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, i;
      for (n = 0, i = this.effects.length; n < i; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, i = this.cleanups.length; n < i; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, i = this.scopes.length; n < i; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Ap() {
  return fe;
}
let bt;
const Hr = /* @__PURE__ */ new WeakSet();
class pu {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, fe && fe.active && fe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Hr.has(this) && (Hr.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || mu(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, kc(this), vu(this);
    const t = bt, n = Oe;
    bt = this, Oe = !0;
    try {
      return this.fn();
    } finally {
      St.NODE_ENV !== "production" && bt !== this && tn(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), bu(this), bt = t, Oe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ba(t);
      this.deps = this.depsTail = void 0, kc(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Hr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Sl(this) && this.run();
  }
  get dirty() {
    return Sl(this);
  }
}
let gu = 0, fs, ps;
function mu(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ps, ps = e;
    return;
  }
  e.next = fs, fs = e;
}
function ma() {
  gu++;
}
function va() {
  if (--gu > 0)
    return;
  if (ps) {
    let t = ps;
    for (ps = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; fs; ) {
    let t = fs;
    for (fs = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (i) {
          e || (e = i);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function vu(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function bu(e) {
  let t, n = e.depsTail, i = n;
  for (; i; ) {
    const s = i.prevDep;
    i.version === -1 ? (i === n && (n = s), ba(i), Fp(i)) : t = i, i.dep.activeLink = i.prevActiveLink, i.prevActiveLink = void 0, i = s;
  }
  e.deps = t, e.depsTail = n;
}
function Sl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (yu(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function yu(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === _s))
    return;
  e.globalVersion = _s;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Sl(e)) {
    e.flags &= -3;
    return;
  }
  const n = bt, i = Oe;
  bt = e, Oe = !0;
  try {
    vu(e);
    const s = e.fn(e._value);
    (t.version === 0 || Dn(s, e._value)) && (e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    bt = n, Oe = i, bu(e), e.flags &= -3;
  }
}
function ba(e, t = !1) {
  const { dep: n, prevSub: i, nextSub: s } = e;
  if (i && (i.nextSub = s, e.prevSub = void 0), s && (s.prevSub = i, e.nextSub = void 0), St.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = s), n.subs === e && (n.subs = i, !i && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      ba(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Fp(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Oe = !0;
const xu = [];
function kn() {
  xu.push(Oe), Oe = !1;
}
function wn() {
  const e = xu.pop();
  Oe = e === void 0 ? !0 : e;
}
function kc(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = bt;
    bt = void 0;
    try {
      t();
    } finally {
      bt = n;
    }
  }
}
let _s = 0;
class Tp {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ya {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, St.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!bt || !Oe || bt === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== bt)
      n = this.activeLink = new Tp(bt, this), bt.deps ? (n.prevDep = bt.depsTail, bt.depsTail.nextDep = n, bt.depsTail = n) : bt.deps = bt.depsTail = n, ku(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const i = n.nextDep;
      i.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = i), n.prevDep = bt.depsTail, n.nextDep = void 0, bt.depsTail.nextDep = n, bt.depsTail = n, bt.deps === n && (bt.deps = i);
    }
    return St.NODE_ENV !== "production" && bt.onTrack && bt.onTrack(
      Nt(
        {
          effect: bt
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, _s++, this.notify(t);
  }
  notify(t) {
    ma();
    try {
      if (St.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            Nt(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      va();
    }
  }
}
function ku(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let i = t.deps; i; i = i.nextDep)
        ku(i);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), St.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const El = /* @__PURE__ */ new WeakMap(), ti = Symbol(
  St.NODE_ENV !== "production" ? "Object iterate" : ""
), Pl = Symbol(
  St.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Ms = Symbol(
  St.NODE_ENV !== "production" ? "Array iterate" : ""
);
function Bt(e, t, n) {
  if (Oe && bt) {
    let i = El.get(e);
    i || El.set(e, i = /* @__PURE__ */ new Map());
    let s = i.get(n);
    s || (i.set(n, s = new ya()), s.map = i, s.key = n), St.NODE_ENV !== "production" ? s.track({
      target: e,
      type: t,
      key: n
    }) : s.track();
  }
}
function Ge(e, t, n, i, s, r) {
  const o = El.get(e);
  if (!o) {
    _s++;
    return;
  }
  const l = (a) => {
    a && (St.NODE_ENV !== "production" ? a.trigger({
      target: e,
      type: t,
      key: n,
      newValue: i,
      oldValue: s,
      oldTarget: r
    }) : a.trigger());
  };
  if (ma(), t === "clear")
    o.forEach(l);
  else {
    const a = K(e), c = a && ga(n);
    if (a && n === "length") {
      const h = Number(i);
      o.forEach((d, u) => {
        (u === "length" || u === Ms || !Qe(u) && u >= h) && l(d);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), c && l(o.get(Ms)), t) {
        case "add":
          a ? c && l(o.get("length")) : (l(o.get(ti)), Qn(e) && l(o.get(Pl)));
          break;
        case "delete":
          a || (l(o.get(ti)), Qn(e) && l(o.get(Pl)));
          break;
        case "set":
          Qn(e) && l(o.get(ti));
          break;
      }
  }
  va();
}
function pi(e) {
  const t = at(e);
  return t === e ? t : (Bt(t, "iterate", Ms), oe(e) ? t : t.map(Ut));
}
function Cr(e) {
  return Bt(e = at(e), "iterate", Ms), e;
}
const Lp = {
  __proto__: null,
  [Symbol.iterator]() {
    return jr(this, Symbol.iterator, Ut);
  },
  concat(...e) {
    return pi(this).concat(
      ...e.map((t) => K(t) ? pi(t) : t)
    );
  },
  entries() {
    return jr(this, "entries", (e) => (e[1] = Ut(e[1]), e));
  },
  every(e, t) {
    return sn(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return sn(this, "filter", e, t, (n) => n.map(Ut), arguments);
  },
  find(e, t) {
    return sn(this, "find", e, t, Ut, arguments);
  },
  findIndex(e, t) {
    return sn(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return sn(this, "findLast", e, t, Ut, arguments);
  },
  findLastIndex(e, t) {
    return sn(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return sn(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Wr(this, "includes", e);
  },
  indexOf(...e) {
    return Wr(this, "indexOf", e);
  },
  join(e) {
    return pi(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return Wr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return sn(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ki(this, "pop");
  },
  push(...e) {
    return Ki(this, "push", e);
  },
  reduce(e, ...t) {
    return wc(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return wc(this, "reduceRight", e, t);
  },
  shift() {
    return Ki(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return sn(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ki(this, "splice", e);
  },
  toReversed() {
    return pi(this).toReversed();
  },
  toSorted(e) {
    return pi(this).toSorted(e);
  },
  toSpliced(...e) {
    return pi(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ki(this, "unshift", e);
  },
  values() {
    return jr(this, "values", Ut);
  }
};
function jr(e, t, n) {
  const i = Cr(e), s = i[t]();
  return i !== e && !oe(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.value && (r.value = n(r.value)), r;
  }), s;
}
const Ip = Array.prototype;
function sn(e, t, n, i, s, r) {
  const o = Cr(e), l = o !== e && !oe(e), a = o[t];
  if (a !== Ip[t]) {
    const d = a.apply(e, r);
    return l ? Ut(d) : d;
  }
  let c = n;
  o !== e && (l ? c = function(d, u) {
    return n.call(this, Ut(d), u, e);
  } : n.length > 2 && (c = function(d, u) {
    return n.call(this, d, u, e);
  }));
  const h = a.call(o, c, i);
  return l && s ? s(h) : h;
}
function wc(e, t, n, i) {
  const s = Cr(e);
  let r = n;
  return s !== e && (oe(e) ? n.length > 3 && (r = function(o, l, a) {
    return n.call(this, o, l, a, e);
  }) : r = function(o, l, a) {
    return n.call(this, o, Ut(l), a, e);
  }), s[t](r, ...i);
}
function Wr(e, t, n) {
  const i = at(e);
  Bt(i, "iterate", Ms);
  const s = i[t](...n);
  return (s === -1 || s === !1) && Ho(n[0]) ? (n[0] = at(n[0]), i[t](...n)) : s;
}
function Ki(e, t, n = []) {
  kn(), ma();
  const i = at(e)[t].apply(e, n);
  return va(), wn(), i;
}
const Vp = /* @__PURE__ */ xn("__proto__,__v_isRef,__isVue"), wu = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qe)
);
function $p(e) {
  Qe(e) || (e = String(e));
  const t = at(this);
  return Bt(t, "has", e), t.hasOwnProperty(e);
}
class _u {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, i) {
    if (n === "__v_skip") return t.__v_skip;
    const s = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return i === (s ? r ? Du : Pu : r ? Eu : Su).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(i) ? t : void 0;
    const o = K(t);
    if (!s) {
      let a;
      if (o && (a = Lp[n]))
        return a;
      if (n === "hasOwnProperty")
        return $p;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      $t(t) ? t : i
    );
    return (Qe(n) ? wu.has(n) : Vp(n)) || (s || Bt(t, "get", n), r) ? l : $t(l) ? o && ga(n) ? l : l.value : xt(l) ? s ? Nu(l) : xa(l) : l;
  }
}
class Mu extends _u {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, i, s) {
    let r = t[n];
    if (!this._isShallow) {
      const a = yn(r);
      if (!oe(i) && !yn(i) && (r = at(r), i = at(i)), !K(t) && $t(r) && !$t(i))
        return a ? !1 : (r.value = i, !0);
    }
    const o = K(t) && ga(n) ? Number(n) < t.length : pt(t, n), l = Reflect.set(
      t,
      n,
      i,
      $t(t) ? t : s
    );
    return t === at(s) && (o ? Dn(i, r) && Ge(t, "set", n, i, r) : Ge(t, "add", n, i)), l;
  }
  deleteProperty(t, n) {
    const i = pt(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && i && Ge(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const i = Reflect.has(t, n);
    return (!Qe(n) || !wu.has(n)) && Bt(t, "has", n), i;
  }
  ownKeys(t) {
    return Bt(
      t,
      "iterate",
      K(t) ? "length" : ti
    ), Reflect.ownKeys(t);
  }
}
class Cu extends _u {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return St.NODE_ENV !== "production" && tn(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return St.NODE_ENV !== "production" && tn(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Bp = /* @__PURE__ */ new Mu(), zp = /* @__PURE__ */ new Cu(), Hp = /* @__PURE__ */ new Mu(!0), jp = /* @__PURE__ */ new Cu(!0), Dl = (e) => e, Xs = (e) => Reflect.getPrototypeOf(e);
function Wp(e, t, n) {
  return function(...i) {
    const s = this.__v_raw, r = at(s), o = Qn(r), l = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, c = s[e](...i), h = n ? Dl : t ? Nl : Ut;
    return !t && Bt(
      r,
      "iterate",
      a ? Pl : ti
    ), {
      // iterator protocol
      next() {
        const { value: d, done: u } = c.next();
        return u ? { value: d, done: u } : {
          value: l ? [h(d[0]), h(d[1])] : h(d),
          done: u
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ks(e) {
  return function(...t) {
    if (St.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      tn(
        `${ai(e)} operation ${n}failed: target is readonly.`,
        at(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function qp(e, t) {
  const n = {
    get(s) {
      const r = this.__v_raw, o = at(r), l = at(s);
      e || (Dn(s, l) && Bt(o, "get", s), Bt(o, "get", l));
      const { has: a } = Xs(o), c = t ? Dl : e ? Nl : Ut;
      if (a.call(o, s))
        return c(r.get(s));
      if (a.call(o, l))
        return c(r.get(l));
      r !== o && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && Bt(at(s), "iterate", ti), Reflect.get(s, "size", s);
    },
    has(s) {
      const r = this.__v_raw, o = at(r), l = at(s);
      return e || (Dn(s, l) && Bt(o, "has", s), Bt(o, "has", l)), s === l ? r.has(s) : r.has(s) || r.has(l);
    },
    forEach(s, r) {
      const o = this, l = o.__v_raw, a = at(l), c = t ? Dl : e ? Nl : Ut;
      return !e && Bt(a, "iterate", ti), l.forEach((h, d) => s.call(r, c(h), c(d), o));
    }
  };
  return Nt(
    n,
    e ? {
      add: Ks("add"),
      set: Ks("set"),
      delete: Ks("delete"),
      clear: Ks("clear")
    } : {
      add(s) {
        !t && !oe(s) && !yn(s) && (s = at(s));
        const r = at(this);
        return Xs(r).has.call(r, s) || (r.add(s), Ge(r, "add", s, s)), this;
      },
      set(s, r) {
        !t && !oe(r) && !yn(r) && (r = at(r));
        const o = at(this), { has: l, get: a } = Xs(o);
        let c = l.call(o, s);
        c ? St.NODE_ENV !== "production" && _c(o, l, s) : (s = at(s), c = l.call(o, s));
        const h = a.call(o, s);
        return o.set(s, r), c ? Dn(r, h) && Ge(o, "set", s, r, h) : Ge(o, "add", s, r), this;
      },
      delete(s) {
        const r = at(this), { has: o, get: l } = Xs(r);
        let a = o.call(r, s);
        a ? St.NODE_ENV !== "production" && _c(r, o, s) : (s = at(s), a = o.call(r, s));
        const c = l ? l.call(r, s) : void 0, h = r.delete(s);
        return a && Ge(r, "delete", s, void 0, c), h;
      },
      clear() {
        const s = at(this), r = s.size !== 0, o = St.NODE_ENV !== "production" ? Qn(s) ? new Map(s) : new Set(s) : void 0, l = s.clear();
        return r && Ge(
          s,
          "clear",
          void 0,
          void 0,
          o
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = Wp(s, e, t);
  }), n;
}
function Sr(e, t) {
  const n = qp(e, t);
  return (i, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? i : Reflect.get(
    pt(n, s) && s in i ? n : i,
    s,
    r
  );
}
const Gp = {
  get: /* @__PURE__ */ Sr(!1, !1)
}, Yp = {
  get: /* @__PURE__ */ Sr(!1, !0)
}, Up = {
  get: /* @__PURE__ */ Sr(!0, !1)
}, Xp = {
  get: /* @__PURE__ */ Sr(!0, !0)
};
function _c(e, t, n) {
  const i = at(n);
  if (i !== n && t.call(e, i)) {
    const s = pa(e);
    tn(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Su = /* @__PURE__ */ new WeakMap(), Eu = /* @__PURE__ */ new WeakMap(), Pu = /* @__PURE__ */ new WeakMap(), Du = /* @__PURE__ */ new WeakMap();
function Kp(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Jp(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Kp(pa(e));
}
function xa(e) {
  return yn(e) ? e : Er(
    e,
    !1,
    Bp,
    Gp,
    Su
  );
}
function Zp(e) {
  return Er(
    e,
    !1,
    Hp,
    Yp,
    Eu
  );
}
function Nu(e) {
  return Er(
    e,
    !0,
    zp,
    Up,
    Pu
  );
}
function Ue(e) {
  return Er(
    e,
    !0,
    jp,
    Xp,
    Du
  );
}
function Er(e, t, n, i, s) {
  if (!xt(e))
    return St.NODE_ENV !== "production" && tn(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = s.get(e);
  if (r)
    return r;
  const o = Jp(e);
  if (o === 0)
    return e;
  const l = new Proxy(
    e,
    o === 2 ? i : n
  );
  return s.set(e, l), l;
}
function ei(e) {
  return yn(e) ? ei(e.__v_raw) : !!(e && e.__v_isReactive);
}
function yn(e) {
  return !!(e && e.__v_isReadonly);
}
function oe(e) {
  return !!(e && e.__v_isShallow);
}
function Ho(e) {
  return e ? !!e.__v_raw : !1;
}
function at(e) {
  const t = e && e.__v_raw;
  return t ? at(t) : e;
}
function Qp(e) {
  return !pt(e, "__v_skip") && Object.isExtensible(e) && zo(e, "__v_skip", !0), e;
}
const Ut = (e) => xt(e) ? xa(e) : e, Nl = (e) => xt(e) ? Nu(e) : e;
function $t(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Js(e) {
  return t2(e, !1);
}
function t2(e, t) {
  return $t(e) ? e : new e2(e, t);
}
class e2 {
  constructor(t, n) {
    this.dep = new ya(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : at(t), this._value = n ? t : Ut(t), this.__v_isShallow = n;
  }
  get value() {
    return St.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, i = this.__v_isShallow || oe(t) || yn(t);
    t = i ? t : at(t), Dn(t, n) && (this._rawValue = t, this._value = i ? t : Ut(t), St.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function Kn(e) {
  return $t(e) ? e.value : e;
}
const n2 = {
  get: (e, t, n) => t === "__v_raw" ? e : Kn(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const s = e[t];
    return $t(s) && !$t(n) ? (s.value = n, !0) : Reflect.set(e, t, n, i);
  }
};
function Ou(e) {
  return ei(e) ? e : new Proxy(e, n2);
}
class i2 {
  constructor(t, n, i) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ya(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = _s - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = i;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    bt !== this)
      return mu(this, !0), !0;
  }
  get value() {
    const t = St.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return yu(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : St.NODE_ENV !== "production" && tn("Write operation failed: computed value is readonly");
  }
}
function s2(e, t, n = !1) {
  let i, s;
  return it(e) ? i = e : (i = e.get, s = e.set), new i2(i, s, n);
}
const Zs = {}, jo = /* @__PURE__ */ new WeakMap();
let Gn;
function o2(e, t = !1, n = Gn) {
  if (n) {
    let i = jo.get(n);
    i || jo.set(n, i = []), i.push(e);
  } else St.NODE_ENV !== "production" && !t && tn(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function r2(e, t, n = yt) {
  const { immediate: i, deep: s, once: r, scheduler: o, augmentJob: l, call: a } = n, c = (k) => {
    (n.onWarn || tn)(
      "Invalid watch source: ",
      k,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, h = (k) => s ? k : oe(k) || s === !1 || s === 0 ? un(k, 1) : un(k);
  let d, u, f, g, m = !1, v = !1;
  if ($t(e) ? (u = () => e.value, m = oe(e)) : ei(e) ? (u = () => h(e), m = !0) : K(e) ? (v = !0, m = e.some((k) => ei(k) || oe(k)), u = () => e.map((k) => {
    if ($t(k))
      return k.value;
    if (ei(k))
      return h(k);
    if (it(k))
      return a ? a(k, 2) : k();
    St.NODE_ENV !== "production" && c(k);
  })) : it(e) ? t ? u = a ? () => a(e, 2) : e : u = () => {
    if (f) {
      kn();
      try {
        f();
      } finally {
        wn();
      }
    }
    const k = Gn;
    Gn = d;
    try {
      return a ? a(e, 3, [g]) : e(g);
    } finally {
      Gn = k;
    }
  } : (u = zt, St.NODE_ENV !== "production" && c(e)), t && s) {
    const k = u, N = s === !0 ? 1 / 0 : s;
    u = () => un(k(), N);
  }
  const b = Ap(), _ = () => {
    d.stop(), b && b.active && ua(b.effects, d);
  };
  if (r && t) {
    const k = t;
    t = (...N) => {
      k(...N), _();
    };
  }
  let S = v ? new Array(e.length).fill(Zs) : Zs;
  const E = (k) => {
    if (!(!(d.flags & 1) || !d.dirty && !k))
      if (t) {
        const N = d.run();
        if (s || m || (v ? N.some((w, P) => Dn(w, S[P])) : Dn(N, S))) {
          f && f();
          const w = Gn;
          Gn = d;
          try {
            const P = [
              N,
              // pass undefined as the old value when it's changed for the first time
              S === Zs ? void 0 : v && S[0] === Zs ? [] : S,
              g
            ];
            a ? a(t, 3, P) : (
              // @ts-expect-error
              t(...P)
            ), S = N;
          } finally {
            Gn = w;
          }
        }
      } else
        d.run();
  };
  return l && l(E), d = new pu(u), d.scheduler = o ? () => o(E, !1) : E, g = (k) => o2(k, !1, d), f = d.onStop = () => {
    const k = jo.get(d);
    if (k) {
      if (a)
        a(k, 4);
      else
        for (const N of k) N();
      jo.delete(d);
    }
  }, St.NODE_ENV !== "production" && (d.onTrack = n.onTrack, d.onTrigger = n.onTrigger), t ? i ? E(!0) : S = d.run() : o ? o(E.bind(null, !0), !0) : d.run(), _.pause = d.pause.bind(d), _.resume = d.resume.bind(d), _.stop = _, _;
}
function un(e, t = 1 / 0, n) {
  if (t <= 0 || !xt(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, $t(e))
    un(e.value, t, n);
  else if (K(e))
    for (let i = 0; i < e.length; i++)
      un(e[i], t, n);
  else if (kr(e) || Qn(e))
    e.forEach((i) => {
      un(i, t, n);
    });
  else if (wr(e)) {
    for (const i in e)
      un(e[i], t, n);
    for (const i of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, i) && un(e[i], t, n);
  }
  return e;
}
var M = {};
const ni = [];
function Mo(e) {
  ni.push(e);
}
function Co() {
  ni.pop();
}
let qr = !1;
function B(e, ...t) {
  if (qr) return;
  qr = !0, kn();
  const n = ni.length ? ni[ni.length - 1].component : null, i = n && n.appContext.config.warnHandler, s = l2();
  if (i)
    Bi(
      i,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((r) => {
          var o, l;
          return (l = (o = r.toString) == null ? void 0 : o.call(r)) != null ? l : JSON.stringify(r);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: r }) => `at <${Ar(n, r.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...a2(s)), console.warn(...r);
  }
  wn(), qr = !1;
}
function l2() {
  let e = ni[ni.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const i = e.component && e.component.parent;
    e = i && i.vnode;
  }
  return t;
}
function a2(e) {
  const t = [];
  return e.forEach((n, i) => {
    t.push(...i === 0 ? [] : [`
`], ...c2(n));
  }), t;
}
function c2({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", i = e.component ? e.component.parent == null : !1, s = ` at <${Ar(
    e.component,
    e.type,
    i
  )}`, r = ">" + n;
  return e.props ? [s, ...h2(e.props), r] : [s + r];
}
function h2(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((i) => {
    t.push(...Ru(i, e[i]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Ru(e, t, n) {
  return Et(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : $t(t) ? (t = Ru(e, at(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : it(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = at(t), n ? t : [`${e}=`, t]);
}
const ka = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function Bi(e, t, n, i) {
  try {
    return i ? e(...i) : e();
  } catch (s) {
    zs(s, t, n);
  }
}
function en(e, t, n, i) {
  if (it(e)) {
    const s = Bi(e, t, n, i);
    return s && fa(s) && s.catch((r) => {
      zs(r, t, n);
    }), s;
  }
  if (K(e)) {
    const s = [];
    for (let r = 0; r < e.length; r++)
      s.push(en(e[r], t, n, i));
    return s;
  } else M.NODE_ENV !== "production" && B(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function zs(e, t, n, i = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = t && t.appContext.config || yt;
  if (t) {
    let l = t.parent;
    const a = t.proxy, c = M.NODE_ENV !== "production" ? ka[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const h = l.ec;
      if (h) {
        for (let d = 0; d < h.length; d++)
          if (h[d](e, a, c) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      kn(), Bi(r, null, 10, [
        e,
        a,
        c
      ]), wn();
      return;
    }
  }
  d2(e, n, s, i, o);
}
function d2(e, t, n, i = !0, s = !1) {
  if (M.NODE_ENV !== "production") {
    const r = ka[t];
    if (n && Mo(n), B(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Co(), i)
      throw e;
    console.error(e);
  } else {
    if (s)
      throw e;
    console.error(e);
  }
}
const se = [];
let je = -1;
const Ni = [];
let Mn = null, Ci = 0;
const Au = /* @__PURE__ */ Promise.resolve();
let Wo = null;
const u2 = 100;
function wa(e) {
  const t = Wo || Au;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function f2(e) {
  let t = je + 1, n = se.length;
  for (; t < n; ) {
    const i = t + n >>> 1, s = se[i], r = Cs(s);
    r < e || r === e && s.flags & 2 ? t = i + 1 : n = i;
  }
  return t;
}
function Pr(e) {
  if (!(e.flags & 1)) {
    const t = Cs(e), n = se[se.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Cs(n) ? se.push(e) : se.splice(f2(t), 0, e), e.flags |= 1, Fu();
  }
}
function Fu() {
  Wo || (Wo = Au.then(Iu));
}
function Tu(e) {
  K(e) ? Ni.push(...e) : Mn && e.id === -1 ? Mn.splice(Ci + 1, 0, e) : e.flags & 1 || (Ni.push(e), e.flags |= 1), Fu();
}
function Mc(e, t, n = je + 1) {
  for (M.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < se.length; n++) {
    const i = se[n];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || M.NODE_ENV !== "production" && _a(t, i))
        continue;
      se.splice(n, 1), n--, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function Lu(e) {
  if (Ni.length) {
    const t = [...new Set(Ni)].sort(
      (n, i) => Cs(n) - Cs(i)
    );
    if (Ni.length = 0, Mn) {
      Mn.push(...t);
      return;
    }
    for (Mn = t, M.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Ci = 0; Ci < Mn.length; Ci++) {
      const n = Mn[Ci];
      M.NODE_ENV !== "production" && _a(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Mn = null, Ci = 0;
  }
}
const Cs = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Iu(e) {
  M.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = M.NODE_ENV !== "production" ? (n) => _a(e, n) : zt;
  try {
    for (je = 0; je < se.length; je++) {
      const n = se[je];
      if (n && !(n.flags & 8)) {
        if (M.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Bi(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; je < se.length; je++) {
      const n = se[je];
      n && (n.flags &= -2);
    }
    je = -1, se.length = 0, Lu(e), Wo = null, (se.length || Ni.length) && Iu(e);
  }
}
function _a(e, t) {
  const n = e.get(t) || 0;
  if (n > u2) {
    const i = t.i, s = i && Oa(i.type);
    return zs(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Ne = !1;
const So = /* @__PURE__ */ new Map();
M.NODE_ENV !== "production" && (Bs().__VUE_HMR_RUNTIME__ = {
  createRecord: Gr(Vu),
  rerender: Gr(m2),
  reload: Gr(v2)
});
const ci = /* @__PURE__ */ new Map();
function p2(e) {
  const t = e.type.__hmrId;
  let n = ci.get(t);
  n || (Vu(t, e.type), n = ci.get(t)), n.instances.add(e);
}
function g2(e) {
  ci.get(e.type.__hmrId).instances.delete(e);
}
function Vu(e, t) {
  return ci.has(e) ? !1 : (ci.set(e, {
    initialDef: qo(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function qo(e) {
  return wf(e) ? e.__vccOpts : e;
}
function m2(e, t) {
  const n = ci.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((i) => {
    t && (i.render = t, qo(i.type).render = t), i.renderCache = [], Ne = !0, i.update(), Ne = !1;
  }));
}
function v2(e, t) {
  const n = ci.get(e);
  if (!n) return;
  t = qo(t), Cc(n.initialDef, t);
  const i = [...n.instances];
  for (let s = 0; s < i.length; s++) {
    const r = i[s], o = qo(r.type);
    let l = So.get(o);
    l || (o !== n.initialDef && Cc(o, t), So.set(o, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? Pr(() => {
      Ne = !0, r.parent.update(), Ne = !1, l.delete(r);
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(o);
  }
  Tu(() => {
    So.clear();
  });
}
function Cc(e, t) {
  Nt(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Gr(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (i) {
      console.error(i), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let Ye, ss = [], Ol = !1;
function Hs(e, ...t) {
  Ye ? Ye.emit(e, ...t) : Ol || ss.push({ event: e, args: t });
}
function $u(e, t) {
  var n, i;
  Ye = e, Ye ? (Ye.enabled = !0, ss.forEach(({ event: s, args: r }) => Ye.emit(s, ...r)), ss = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((i = (n = window.navigator) == null ? void 0 : n.userAgent) != null && i.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    $u(r, t);
  }), setTimeout(() => {
    Ye || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Ol = !0, ss = []);
  }, 3e3)) : (Ol = !0, ss = []);
}
function b2(e, t) {
  Hs("app:init", e, t, {
    Fragment: vt,
    Text: js,
    Comment: be,
    Static: Do
  });
}
function y2(e) {
  Hs("app:unmount", e);
}
const x2 = /* @__PURE__ */ Ma(
  "component:added"
  /* COMPONENT_ADDED */
), Bu = /* @__PURE__ */ Ma(
  "component:updated"
  /* COMPONENT_UPDATED */
), k2 = /* @__PURE__ */ Ma(
  "component:removed"
  /* COMPONENT_REMOVED */
), w2 = (e) => {
  Ye && typeof Ye.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !Ye.cleanupBuffer(e) && k2(e);
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ma(e) {
  return (t) => {
    Hs(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const _2 = /* @__PURE__ */ zu(
  "perf:start"
  /* PERFORMANCE_START */
), M2 = /* @__PURE__ */ zu(
  "perf:end"
  /* PERFORMANCE_END */
);
function zu(e) {
  return (t, n, i) => {
    Hs(e, t.appContext.app, t.uid, t, n, i);
  };
}
function C2(e, t, n) {
  Hs(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let Xt = null, Hu = null;
function Go(e) {
  const t = Xt;
  return Xt = e, Hu = e && e.type.__scopeId || null, t;
}
function S2(e, t = Xt, n) {
  if (!t || e._n)
    return e;
  const i = (...s) => {
    i._d && zc(-1);
    const r = Go(t);
    let o;
    try {
      o = e(...s);
    } finally {
      Go(r), i._d && zc(1);
    }
    return M.NODE_ENV !== "production" && Bu(t), o;
  };
  return i._n = !0, i._c = !0, i._d = !0, i;
}
function ju(e) {
  gp(e) && B("Do not use built-in directive ids as custom directive id: " + e);
}
function E2(e, t) {
  if (Xt === null)
    return M.NODE_ENV !== "production" && B("withDirectives can only be used inside render functions."), e;
  const n = Rr(Xt), i = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [r, o, l, a = yt] = t[s];
    r && (it(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && un(o), i.push({
      dir: r,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function Bn(e, t, n, i) {
  const s = e.dirs, r = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const l = s[o];
    r && (l.oldValue = r[o].value);
    let a = l.dir[i];
    a && (kn(), en(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), wn());
  }
}
const Wu = Symbol("_vte"), P2 = (e) => e.__isTeleport, ii = (e) => e && (e.disabled || e.disabled === ""), Sc = (e) => e && (e.defer || e.defer === ""), Ec = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Pc = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Rl = (e, t) => {
  const n = e && e.to;
  if (Et(n))
    if (t) {
      const i = t(n);
      return M.NODE_ENV !== "production" && !i && !ii(e) && B(
        `Failed to locate Teleport target with selector "${n}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`
      ), i;
    } else
      return M.NODE_ENV !== "production" && B(
        "Current renderer does not support string target for Teleports. (missing querySelector renderer option)"
      ), null;
  else
    return M.NODE_ENV !== "production" && !n && !ii(e) && B(`Invalid Teleport target: ${n}`), n;
}, qu = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, i, s, r, o, l, a, c) {
    const {
      mc: h,
      pc: d,
      pbc: u,
      o: { insert: f, querySelector: g, createText: m, createComment: v }
    } = c, b = ii(t.props);
    let { shapeFlag: _, children: S, dynamicChildren: E } = t;
    if (M.NODE_ENV !== "production" && Ne && (a = !1, E = null), e == null) {
      const k = t.el = M.NODE_ENV !== "production" ? v("teleport start") : m(""), N = t.anchor = M.NODE_ENV !== "production" ? v("teleport end") : m("");
      f(k, n, i), f(N, n, i);
      const w = (O, F) => {
        _ & 16 && (s && s.isCE && (s.ce._teleportTarget = O), h(
          S,
          O,
          F,
          s,
          r,
          o,
          l,
          a
        ));
      }, P = () => {
        const O = t.target = Rl(t.props, g), F = Gu(O, t, m, f);
        O ? (o !== "svg" && Ec(O) ? o = "svg" : o !== "mathml" && Pc(O) && (o = "mathml"), b || (w(O, F), Eo(t, !1))) : M.NODE_ENV !== "production" && !b && B(
          "Invalid Teleport target on mount:",
          O,
          `(${typeof O})`
        );
      };
      b && (w(n, N), Eo(t, !0)), Sc(t.props) ? ne(() => {
        P(), t.el.__isMounted = !0;
      }, r) : P();
    } else {
      if (Sc(t.props) && !e.el.__isMounted) {
        ne(() => {
          qu.process(
            e,
            t,
            n,
            i,
            s,
            r,
            o,
            l,
            a,
            c
          ), delete e.el.__isMounted;
        }, r);
        return;
      }
      t.el = e.el, t.targetStart = e.targetStart;
      const k = t.anchor = e.anchor, N = t.target = e.target, w = t.targetAnchor = e.targetAnchor, P = ii(e.props), O = P ? n : N, F = P ? k : w;
      if (o === "svg" || Ec(N) ? o = "svg" : (o === "mathml" || Pc(N)) && (o = "mathml"), E ? (u(
        e.dynamicChildren,
        E,
        O,
        s,
        r,
        o,
        l
      ), ms(e, t, !0)) : a || d(
        e,
        t,
        O,
        F,
        s,
        r,
        o,
        l,
        !1
      ), b)
        P ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Qs(
          t,
          n,
          k,
          c,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const R = t.target = Rl(
          t.props,
          g
        );
        R ? Qs(
          t,
          R,
          null,
          c,
          0
        ) : M.NODE_ENV !== "production" && B(
          "Invalid Teleport target on update:",
          N,
          `(${typeof N})`
        );
      } else P && Qs(
        t,
        N,
        w,
        c,
        1
      );
      Eo(t, b);
    }
  },
  remove(e, t, n, { um: i, o: { remove: s } }, r) {
    const {
      shapeFlag: o,
      children: l,
      anchor: a,
      targetStart: c,
      targetAnchor: h,
      target: d,
      props: u
    } = e;
    if (d && (s(c), s(h)), r && s(a), o & 16) {
      const f = r || !ii(u);
      for (let g = 0; g < l.length; g++) {
        const m = l[g];
        i(
          m,
          t,
          n,
          f,
          !!m.dynamicChildren
        );
      }
    }
  },
  move: Qs,
  hydrate: D2
};
function Qs(e, t, n, { o: { insert: i }, m: s }, r = 2) {
  r === 0 && i(e.targetAnchor, t, n);
  const { el: o, anchor: l, shapeFlag: a, children: c, props: h } = e, d = r === 2;
  if (d && i(o, t, n), (!d || ii(h)) && a & 16)
    for (let u = 0; u < c.length; u++)
      s(
        c[u],
        t,
        n,
        2
      );
  d && i(l, t, n);
}
function D2(e, t, n, i, s, r, {
  o: { nextSibling: o, parentNode: l, querySelector: a, insert: c, createText: h }
}, d) {
  const u = t.target = Rl(
    t.props,
    a
  );
  if (u) {
    const f = ii(t.props), g = u._lpa || u.firstChild;
    if (t.shapeFlag & 16)
      if (f)
        t.anchor = d(
          o(e),
          t,
          l(e),
          n,
          i,
          s,
          r
        ), t.targetStart = g, t.targetAnchor = g && o(g);
      else {
        t.anchor = o(e);
        let m = g;
        for (; m; ) {
          if (m && m.nodeType === 8) {
            if (m.data === "teleport start anchor")
              t.targetStart = m;
            else if (m.data === "teleport anchor") {
              t.targetAnchor = m, u._lpa = t.targetAnchor && o(t.targetAnchor);
              break;
            }
          }
          m = o(m);
        }
        t.targetAnchor || Gu(u, t, h, c), d(
          g && o(g),
          t,
          u,
          n,
          i,
          s,
          r
        );
      }
    Eo(t, f);
  }
  return t.anchor && o(t.anchor);
}
const Fe = qu;
function Eo(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let i, s;
    for (t ? (i = e.el, s = e.anchor) : (i = e.targetStart, s = e.targetAnchor); i && i !== s; )
      i.nodeType === 1 && i.setAttribute("data-v-owner", n.uid), i = i.nextSibling;
    n.ut();
  }
}
function Gu(e, t, n, i) {
  const s = t.targetStart = n(""), r = t.targetAnchor = n("");
  return s[Wu] = r, e && (i(s, e), i(r, e)), r;
}
function Ca(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Ca(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function N2(e, t) {
  return it(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Nt({ name: e.name }, t, { setup: e })
  ) : e;
}
function Yu(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const O2 = /* @__PURE__ */ new WeakSet();
function Yo(e, t, n, i, s = !1) {
  if (K(e)) {
    e.forEach(
      (g, m) => Yo(
        g,
        t && (K(t) ? t[m] : t),
        n,
        i,
        s
      )
    );
    return;
  }
  if (gs(i) && !s) {
    i.shapeFlag & 512 && i.type.__asyncResolved && i.component.subTree.component && Yo(e, t, n, i.component.subTree);
    return;
  }
  const r = i.shapeFlag & 4 ? Rr(i.component) : i.el, o = s ? null : r, { i: l, r: a } = e;
  if (M.NODE_ENV !== "production" && !l) {
    B(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const c = t && t.r, h = l.refs === yt ? l.refs = {} : l.refs, d = l.setupState, u = at(d), f = d === yt ? () => !1 : (g) => M.NODE_ENV !== "production" && (pt(u, g) && !$t(u[g]) && B(
    `Template ref "${g}" used on a non-ref value. It will not work in the production build.`
  ), O2.has(u[g])) ? !1 : pt(u, g);
  if (c != null && c !== a && (Et(c) ? (h[c] = null, f(c) && (d[c] = null)) : $t(c) && (c.value = null)), it(a))
    Bi(a, l, 12, [o, h]);
  else {
    const g = Et(a), m = $t(a);
    if (g || m) {
      const v = () => {
        if (e.f) {
          const b = g ? f(a) ? d[a] : h[a] : a.value;
          s ? K(b) && ua(b, r) : K(b) ? b.includes(r) || b.push(r) : g ? (h[a] = [r], f(a) && (d[a] = h[a])) : (a.value = [r], e.k && (h[e.k] = a.value));
        } else g ? (h[a] = o, f(a) && (d[a] = o)) : m ? (a.value = o, e.k && (h[e.k] = o)) : M.NODE_ENV !== "production" && B("Invalid template ref type:", a, `(${typeof a})`);
      };
      o ? (v.id = -1, ne(v, n)) : v();
    } else M.NODE_ENV !== "production" && B("Invalid template ref type:", a, `(${typeof a})`);
  }
}
Bs().requestIdleCallback;
Bs().cancelIdleCallback;
const gs = (e) => !!e.type.__asyncLoader, Sa = (e) => e.type.__isKeepAlive;
function R2(e, t) {
  Uu(e, "a", t);
}
function A2(e, t) {
  Uu(e, "da", t);
}
function Uu(e, t, n = Ht) {
  const i = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Dr(t, i, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Sa(s.parent.vnode) && F2(i, t, n, s), s = s.parent;
  }
}
function F2(e, t, n, i) {
  const s = Dr(
    t,
    e,
    i,
    !0
    /* prepend */
  );
  Xu(() => {
    ua(i[t], s);
  }, n);
}
function Dr(e, t, n = Ht, i = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...o) => {
      kn();
      const l = Ws(n), a = en(t, n, e, o);
      return l(), wn(), a;
    });
    return i ? s.unshift(r) : s.push(r), r;
  } else if (M.NODE_ENV !== "production") {
    const s = qn(ka[e].replace(/ hook$/, ""));
    B(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const _n = (e) => (t, n = Ht) => {
  (!Es || e === "sp") && Dr(e, (...i) => t(...i), n);
}, T2 = _n("bm"), L2 = _n("m"), I2 = _n(
  "bu"
), V2 = _n("u"), $2 = _n(
  "bum"
), Xu = _n("um"), B2 = _n(
  "sp"
), z2 = _n("rtg"), H2 = _n("rtc");
function j2(e, t = Ht) {
  Dr("ec", e, t);
}
const W2 = "components";
function We(e, t) {
  return G2(W2, e, !0, t) || e;
}
const q2 = Symbol.for("v-ndc");
function G2(e, t, n = !0, i = !1) {
  const s = Xt || Ht;
  if (s) {
    const r = s.type;
    {
      const l = Oa(
        r,
        !1
      );
      if (l && (l === t || l === qt(t) || l === ai(qt(t))))
        return r;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      Dc(s[e] || r[e], t) || // global registration
      Dc(s.appContext[e], t)
    );
    return !o && i ? r : (M.NODE_ENV !== "production" && n && !o && B(`Failed to resolve ${e.slice(0, -1)}: ${t}
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.`), o);
  } else M.NODE_ENV !== "production" && B(
    `resolve${ai(e.slice(0, -1))} can only be used in render() or setup().`
  );
}
function Dc(e, t) {
  return e && (e[t] || e[qt(t)] || e[ai(qt(t))]);
}
function Ft(e, t, n, i) {
  let s;
  const r = n, o = K(e);
  if (o || Et(e)) {
    const l = o && ei(e);
    let a = !1;
    l && (a = !oe(e), e = Cr(e)), s = new Array(e.length);
    for (let c = 0, h = e.length; c < h; c++)
      s[c] = t(
        a ? Ut(e[c]) : e[c],
        c,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    M.NODE_ENV !== "production" && !Number.isInteger(e) && B(`The v-for range expect an integer value but got ${e}.`), s = new Array(e);
    for (let l = 0; l < e; l++)
      s[l] = t(l + 1, l, void 0, r);
  } else if (xt(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (l, a) => t(l, a, void 0, r)
      );
    else {
      const l = Object.keys(e);
      s = new Array(l.length);
      for (let a = 0, c = l.length; a < c; a++) {
        const h = l[a];
        s[a] = t(e[h], h, a, r);
      }
    }
  else
    s = [];
  return s;
}
const Al = (e) => e ? xf(e) ? Rr(e) : Al(e.parent) : null, si = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Nt(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => M.NODE_ENV !== "production" ? Ue(e.props) : e.props,
    $attrs: (e) => M.NODE_ENV !== "production" ? Ue(e.attrs) : e.attrs,
    $slots: (e) => M.NODE_ENV !== "production" ? Ue(e.slots) : e.slots,
    $refs: (e) => M.NODE_ENV !== "production" ? Ue(e.refs) : e.refs,
    $parent: (e) => Al(e.parent),
    $root: (e) => Al(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Zu(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Pr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = wa.bind(e.proxy)),
    $watch: (e) => Cg.bind(e)
  })
), Ea = (e) => e === "_" || e === "$", Yr = (e, t) => e !== yt && !e.__isScriptSetup && pt(e, t), Ku = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: i, data: s, props: r, accessCache: o, type: l, appContext: a } = e;
    if (M.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let c;
    if (t[0] !== "$") {
      const f = o[t];
      if (f !== void 0)
        switch (f) {
          case 1:
            return i[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (Yr(i, t))
          return o[t] = 1, i[t];
        if (s !== yt && pt(s, t))
          return o[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = e.propsOptions[0]) && pt(c, t)
        )
          return o[t] = 3, r[t];
        if (n !== yt && pt(n, t))
          return o[t] = 4, n[t];
        Fl && (o[t] = 0);
      }
    }
    const h = si[t];
    let d, u;
    if (h)
      return t === "$attrs" ? (Bt(e.attrs, "get", ""), M.NODE_ENV !== "production" && Ko()) : M.NODE_ENV !== "production" && t === "$slots" && Bt(e, "get", t), h(e);
    if (
      // css module (injected by vue-loader)
      (d = l.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== yt && pt(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      u = a.config.globalProperties, pt(u, t)
    )
      return u[t];
    M.NODE_ENV !== "production" && Xt && (!Et(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== yt && Ea(t[0]) && pt(s, t) ? B(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === Xt && B(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: i, setupState: s, ctx: r } = e;
    return Yr(s, t) ? (s[t] = n, !0) : M.NODE_ENV !== "production" && s.__isScriptSetup && pt(s, t) ? (B(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : i !== yt && pt(i, t) ? (i[t] = n, !0) : pt(e.props, t) ? (M.NODE_ENV !== "production" && B(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (M.NODE_ENV !== "production" && B(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (M.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: s, propsOptions: r }
  }, o) {
    let l;
    return !!n[o] || e !== yt && pt(e, o) || Yr(t, o) || (l = r[0]) && pt(l, o) || pt(i, o) || pt(si, o) || pt(s.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : pt(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
M.NODE_ENV !== "production" && (Ku.ownKeys = (e) => (B(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Y2(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(si).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => si[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: zt
    });
  }), t;
}
function U2(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((i) => {
    Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[i],
      set: zt
    });
  });
}
function X2(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(at(n)).forEach((i) => {
    if (!n.__isScriptSetup) {
      if (Ea(i[0])) {
        B(
          `setup() return property ${JSON.stringify(
            i
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, i, {
        enumerable: !0,
        configurable: !0,
        get: () => n[i],
        set: zt
      });
    }
  });
}
function Nc(e) {
  return K(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function K2() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? B(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let Fl = !0;
function J2(e) {
  const t = Zu(e), n = e.proxy, i = e.ctx;
  Fl = !1, t.beforeCreate && Oc(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: r,
    methods: o,
    watch: l,
    provide: a,
    inject: c,
    // lifecycle
    created: h,
    beforeMount: d,
    mounted: u,
    beforeUpdate: f,
    updated: g,
    activated: m,
    deactivated: v,
    beforeDestroy: b,
    beforeUnmount: _,
    destroyed: S,
    unmounted: E,
    render: k,
    renderTracked: N,
    renderTriggered: w,
    errorCaptured: P,
    serverPrefetch: O,
    // public API
    expose: F,
    inheritAttrs: R,
    // assets
    components: j,
    directives: J,
    filters: kt
  } = t, st = M.NODE_ENV !== "production" ? K2() : null;
  if (M.NODE_ENV !== "production") {
    const [U] = e.propsOptions;
    if (U)
      for (const Z in U)
        st("Props", Z);
  }
  if (c && Z2(c, i, st), o)
    for (const U in o) {
      const Z = o[U];
      it(Z) ? (M.NODE_ENV !== "production" ? Object.defineProperty(i, U, {
        value: Z.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : i[U] = Z.bind(n), M.NODE_ENV !== "production" && st("Methods", U)) : M.NODE_ENV !== "production" && B(
        `Method "${U}" has type "${typeof Z}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (s) {
    M.NODE_ENV !== "production" && !it(s) && B(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const U = s.call(n, n);
    if (M.NODE_ENV !== "production" && fa(U) && B(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !xt(U))
      M.NODE_ENV !== "production" && B("data() should return an object.");
    else if (e.data = xa(U), M.NODE_ENV !== "production")
      for (const Z in U)
        st("Data", Z), Ea(Z[0]) || Object.defineProperty(i, Z, {
          configurable: !0,
          enumerable: !0,
          get: () => U[Z],
          set: zt
        });
  }
  if (Fl = !0, r)
    for (const U in r) {
      const Z = r[U], ct = it(Z) ? Z.bind(n, n) : it(Z.get) ? Z.get.bind(n, n) : zt;
      M.NODE_ENV !== "production" && ct === zt && B(`Computed property "${U}" has no getter.`);
      const Se = !it(Z) && it(Z.set) ? Z.set.bind(n) : M.NODE_ENV !== "production" ? () => {
        B(
          `Write operation failed: computed property "${U}" is readonly.`
        );
      } : zt, xe = Xn({
        get: ct,
        set: Se
      });
      Object.defineProperty(i, U, {
        enumerable: !0,
        configurable: !0,
        get: () => xe.value,
        set: (Zt) => xe.value = Zt
      }), M.NODE_ENV !== "production" && st("Computed", U);
    }
  if (l)
    for (const U in l)
      Ju(l[U], i, n, U);
  if (a) {
    const U = it(a) ? a.call(n) : a;
    Reflect.ownKeys(U).forEach((Z) => {
      sg(Z, U[Z]);
    });
  }
  h && Oc(h, e, "c");
  function et(U, Z) {
    K(Z) ? Z.forEach((ct) => U(ct.bind(n))) : Z && U(Z.bind(n));
  }
  if (et(T2, d), et(L2, u), et(I2, f), et(V2, g), et(R2, m), et(A2, v), et(j2, P), et(H2, N), et(z2, w), et($2, _), et(Xu, E), et(B2, O), K(F))
    if (F.length) {
      const U = e.exposed || (e.exposed = {});
      F.forEach((Z) => {
        Object.defineProperty(U, Z, {
          get: () => n[Z],
          set: (ct) => n[Z] = ct
        });
      });
    } else e.exposed || (e.exposed = {});
  k && e.render === zt && (e.render = k), R != null && (e.inheritAttrs = R), j && (e.components = j), J && (e.directives = J), O && Yu(e);
}
function Z2(e, t, n = zt) {
  K(e) && (e = Tl(e));
  for (const i in e) {
    const s = e[i];
    let r;
    xt(s) ? "default" in s ? r = Po(
      s.from || i,
      s.default,
      !0
    ) : r = Po(s.from || i) : r = Po(s), $t(r) ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : t[i] = r, M.NODE_ENV !== "production" && n("Inject", i);
  }
}
function Oc(e, t, n) {
  en(
    K(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Ju(e, t, n, i) {
  let s = i.includes(".") ? uf(n, i) : () => n[i];
  if (Et(e)) {
    const r = t[e];
    it(r) ? Xr(s, r) : M.NODE_ENV !== "production" && B(`Invalid watch handler specified by key "${e}"`, r);
  } else if (it(e))
    Xr(s, e.bind(n));
  else if (xt(e))
    if (K(e))
      e.forEach((r) => Ju(r, t, n, i));
    else {
      const r = it(e.handler) ? e.handler.bind(n) : t[e.handler];
      it(r) ? Xr(s, r, e) : M.NODE_ENV !== "production" && B(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else M.NODE_ENV !== "production" && B(`Invalid watch option: "${i}"`, e);
}
function Zu(e) {
  const t = e.type, { mixins: n, extends: i } = t, {
    mixins: s,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = r.get(t);
  let a;
  return l ? a = l : !s.length && !n && !i ? a = t : (a = {}, s.length && s.forEach(
    (c) => Uo(a, c, o, !0)
  ), Uo(a, t, o)), xt(t) && r.set(t, a), a;
}
function Uo(e, t, n, i = !1) {
  const { mixins: s, extends: r } = t;
  r && Uo(e, r, n, !0), s && s.forEach(
    (o) => Uo(e, o, n, !0)
  );
  for (const o in t)
    if (i && o === "expose")
      M.NODE_ENV !== "production" && B(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = Q2[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Q2 = {
  data: Rc,
  props: Ac,
  emits: Ac,
  // objects
  methods: os,
  computed: os,
  // lifecycle
  beforeCreate: ee,
  created: ee,
  beforeMount: ee,
  mounted: ee,
  beforeUpdate: ee,
  updated: ee,
  beforeDestroy: ee,
  beforeUnmount: ee,
  destroyed: ee,
  unmounted: ee,
  activated: ee,
  deactivated: ee,
  errorCaptured: ee,
  serverPrefetch: ee,
  // assets
  components: os,
  directives: os,
  // watch
  watch: eg,
  // provide / inject
  provide: Rc,
  inject: tg
};
function Rc(e, t) {
  return t ? e ? function() {
    return Nt(
      it(e) ? e.call(this, this) : e,
      it(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function tg(e, t) {
  return os(Tl(e), Tl(t));
}
function Tl(e) {
  if (K(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ee(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function os(e, t) {
  return e ? Nt(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ac(e, t) {
  return e ? K(e) && K(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Nt(
    /* @__PURE__ */ Object.create(null),
    Nc(e),
    Nc(t ?? {})
  ) : t;
}
function eg(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Nt(/* @__PURE__ */ Object.create(null), e);
  for (const i in t)
    n[i] = ee(e[i], t[i]);
  return n;
}
function Qu() {
  return {
    app: null,
    config: {
      isNativeTag: fp,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let ng = 0;
function ig(e, t) {
  return function(i, s = null) {
    it(i) || (i = Nt({}, i)), s != null && !xt(s) && (M.NODE_ENV !== "production" && B("root props passed to app.mount() must be an object."), s = null);
    const r = Qu(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const c = r.app = {
      _uid: ng++,
      _component: i,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: qc,
      get config() {
        return r.config;
      },
      set config(h) {
        M.NODE_ENV !== "production" && B(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(h, ...d) {
        return o.has(h) ? M.NODE_ENV !== "production" && B("Plugin has already been applied to target app.") : h && it(h.install) ? (o.add(h), h.install(c, ...d)) : it(h) ? (o.add(h), h(c, ...d)) : M.NODE_ENV !== "production" && B(
          'A plugin must either be a function or an object with an "install" function.'
        ), c;
      },
      mixin(h) {
        return r.mixins.includes(h) ? M.NODE_ENV !== "production" && B(
          "Mixin has already been applied to target app" + (h.name ? `: ${h.name}` : "")
        ) : r.mixins.push(h), c;
      },
      component(h, d) {
        return M.NODE_ENV !== "production" && Bl(h, r.config), d ? (M.NODE_ENV !== "production" && r.components[h] && B(`Component "${h}" has already been registered in target app.`), r.components[h] = d, c) : r.components[h];
      },
      directive(h, d) {
        return M.NODE_ENV !== "production" && ju(h), d ? (M.NODE_ENV !== "production" && r.directives[h] && B(`Directive "${h}" has already been registered in target app.`), r.directives[h] = d, c) : r.directives[h];
      },
      mount(h, d, u) {
        if (a)
          M.NODE_ENV !== "production" && B(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          M.NODE_ENV !== "production" && h.__vue_app__ && B(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const f = c._ceVNode || At(i, s);
          return f.appContext = r, u === !0 ? u = "svg" : u === !1 && (u = void 0), M.NODE_ENV !== "production" && (r.reload = () => {
            e(
              Rn(f),
              h,
              u
            );
          }), e(f, h, u), a = !0, c._container = h, h.__vue_app__ = c, M.NODE_ENV !== "production" && (c._instance = f.component, b2(c, qc)), Rr(f.component);
        }
      },
      onUnmount(h) {
        M.NODE_ENV !== "production" && typeof h != "function" && B(
          `Expected function as first argument to app.onUnmount(), but got ${typeof h}`
        ), l.push(h);
      },
      unmount() {
        a ? (en(
          l,
          c._instance,
          16
        ), e(null, c._container), M.NODE_ENV !== "production" && (c._instance = null, y2(c)), delete c._container.__vue_app__) : M.NODE_ENV !== "production" && B("Cannot unmount an app that is not mounted.");
      },
      provide(h, d) {
        return M.NODE_ENV !== "production" && h in r.provides && B(
          `App already provides property with key "${String(h)}". It will be overwritten with the new value.`
        ), r.provides[h] = d, c;
      },
      runWithContext(h) {
        const d = Oi;
        Oi = c;
        try {
          return h();
        } finally {
          Oi = d;
        }
      }
    };
    return c;
  };
}
let Oi = null;
function sg(e, t) {
  if (!Ht)
    M.NODE_ENV !== "production" && B("provide() can only be used inside setup().");
  else {
    let n = Ht.provides;
    const i = Ht.parent && Ht.parent.provides;
    i === n && (n = Ht.provides = Object.create(i)), n[e] = t;
  }
}
function Po(e, t, n = !1) {
  const i = Ht || Xt;
  if (i || Oi) {
    const s = Oi ? Oi._context.provides : i ? i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && it(t) ? t.call(i && i.proxy) : t;
    M.NODE_ENV !== "production" && B(`injection "${String(e)}" not found.`);
  } else M.NODE_ENV !== "production" && B("inject() can only be used inside setup() or functional components.");
}
const tf = {}, ef = () => Object.create(tf), nf = (e) => Object.getPrototypeOf(e) === tf;
function og(e, t, n, i = !1) {
  const s = {}, r = ef();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), sf(e, t, s, r);
  for (const o in e.propsOptions[0])
    o in s || (s[o] = void 0);
  M.NODE_ENV !== "production" && rf(t || {}, s, e), n ? e.props = i ? s : Zp(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function rg(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function lg(e, t, n, i) {
  const {
    props: s,
    attrs: r,
    vnode: { patchFlag: o }
  } = e, l = at(s), [a] = e.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(M.NODE_ENV !== "production" && rg(e)) && (i || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const h = e.vnode.dynamicProps;
      for (let d = 0; d < h.length; d++) {
        let u = h[d];
        if (Nr(e.emitsOptions, u))
          continue;
        const f = t[u];
        if (a)
          if (pt(r, u))
            f !== r[u] && (r[u] = f, c = !0);
          else {
            const g = qt(u);
            s[g] = Ll(
              a,
              l,
              g,
              f,
              e,
              !1
            );
          }
        else
          f !== r[u] && (r[u] = f, c = !0);
      }
    }
  } else {
    sf(e, t, s, r) && (c = !0);
    let h;
    for (const d in l)
      (!t || // for camelCase
      !pt(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = ge(d)) === d || !pt(t, h))) && (a ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[h] !== void 0) && (s[d] = Ll(
        a,
        l,
        d,
        void 0,
        e,
        !0
      )) : delete s[d]);
    if (r !== l)
      for (const d in r)
        (!t || !pt(t, d)) && (delete r[d], c = !0);
  }
  c && Ge(e.attrs, "set", ""), M.NODE_ENV !== "production" && rf(t || {}, s, e);
}
function sf(e, t, n, i) {
  const [s, r] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let a in t) {
      if (us(a))
        continue;
      const c = t[a];
      let h;
      s && pt(s, h = qt(a)) ? !r || !r.includes(h) ? n[h] = c : (l || (l = {}))[h] = c : Nr(e.emitsOptions, a) || (!(a in i) || c !== i[a]) && (i[a] = c, o = !0);
    }
  if (r) {
    const a = at(n), c = l || yt;
    for (let h = 0; h < r.length; h++) {
      const d = r[h];
      n[d] = Ll(
        s,
        a,
        d,
        c[d],
        e,
        !pt(c, d)
      );
    }
  }
  return o;
}
function Ll(e, t, n, i, s, r) {
  const o = e[n];
  if (o != null) {
    const l = pt(o, "default");
    if (l && i === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && it(a)) {
        const { propsDefaults: c } = s;
        if (n in c)
          i = c[n];
        else {
          const h = Ws(s);
          i = c[n] = a.call(
            null,
            t
          ), h();
        }
      } else
        i = a;
      s.ce && s.ce._setProp(n, i);
    }
    o[
      0
      /* shouldCast */
    ] && (r && !l ? i = !1 : o[
      1
      /* shouldCastTrue */
    ] && (i === "" || i === ge(n)) && (i = !0));
  }
  return i;
}
const ag = /* @__PURE__ */ new WeakMap();
function of(e, t, n = !1) {
  const i = n ? ag : t.propsCache, s = i.get(e);
  if (s)
    return s;
  const r = e.props, o = {}, l = [];
  let a = !1;
  if (!it(e)) {
    const h = (d) => {
      a = !0;
      const [u, f] = of(d, t, !0);
      Nt(o, u), f && l.push(...f);
    };
    !n && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !a)
    return xt(e) && i.set(e, Di), Di;
  if (K(r))
    for (let h = 0; h < r.length; h++) {
      M.NODE_ENV !== "production" && !Et(r[h]) && B("props must be strings when using array syntax.", r[h]);
      const d = qt(r[h]);
      Fc(d) && (o[d] = yt);
    }
  else if (r) {
    M.NODE_ENV !== "production" && !xt(r) && B("invalid props options", r);
    for (const h in r) {
      const d = qt(h);
      if (Fc(d)) {
        const u = r[h], f = o[d] = K(u) || it(u) ? { type: u } : Nt({}, u), g = f.type;
        let m = !1, v = !0;
        if (K(g))
          for (let b = 0; b < g.length; ++b) {
            const _ = g[b], S = it(_) && _.name;
            if (S === "Boolean") {
              m = !0;
              break;
            } else S === "String" && (v = !1);
          }
        else
          m = it(g) && g.name === "Boolean";
        f[
          0
          /* shouldCast */
        ] = m, f[
          1
          /* shouldCastTrue */
        ] = v, (m || pt(f, "default")) && l.push(d);
      }
    }
  }
  const c = [o, l];
  return xt(e) && i.set(e, c), c;
}
function Fc(e) {
  return e[0] !== "$" && !us(e) ? !0 : (M.NODE_ENV !== "production" && B(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function cg(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function rf(e, t, n) {
  const i = at(t), s = n.propsOptions[0], r = Object.keys(e).map((o) => qt(o));
  for (const o in s) {
    let l = s[o];
    l != null && hg(
      o,
      i[o],
      l,
      M.NODE_ENV !== "production" ? Ue(i) : i,
      !r.includes(o)
    );
  }
}
function hg(e, t, n, i, s) {
  const { type: r, required: o, validator: l, skipCheck: a } = n;
  if (o && s) {
    B('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !o)) {
    if (r != null && r !== !0 && !a) {
      let c = !1;
      const h = K(r) ? r : [r], d = [];
      for (let u = 0; u < h.length && !c; u++) {
        const { valid: f, expectedType: g } = ug(t, h[u]);
        d.push(g || ""), c = f;
      }
      if (!c) {
        B(fg(e, t, d));
        return;
      }
    }
    l && !l(t, i) && B('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const dg = /* @__PURE__ */ xn(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function ug(e, t) {
  let n;
  const i = cg(t);
  if (i === "null")
    n = e === null;
  else if (dg(i)) {
    const s = typeof e;
    n = s === i.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else i === "Object" ? n = xt(e) : i === "Array" ? n = K(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: i
  };
}
function fg(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let i = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(ai).join(" | ")}`;
  const s = n[0], r = pa(t), o = Tc(t, s), l = Tc(t, r);
  return n.length === 1 && Lc(s) && !pg(s, r) && (i += ` with value ${o}`), i += `, got ${r} `, Lc(r) && (i += `with value ${l}.`), i;
}
function Tc(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Lc(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function pg(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const lf = (e) => e[0] === "_" || e === "$stable", Pa = (e) => K(e) ? e.map(Pe) : [Pe(e)], gg = (e, t, n) => {
  if (t._n)
    return t;
  const i = S2((...s) => (M.NODE_ENV !== "production" && Ht && (!n || n.root === Ht.root) && B(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Pa(t(...s))), n);
  return i._c = !1, i;
}, af = (e, t, n) => {
  const i = e._ctx;
  for (const s in e) {
    if (lf(s)) continue;
    const r = e[s];
    if (it(r))
      t[s] = gg(s, r, i);
    else if (r != null) {
      M.NODE_ENV !== "production" && B(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const o = Pa(r);
      t[s] = () => o;
    }
  }
}, cf = (e, t) => {
  M.NODE_ENV !== "production" && !Sa(e.vnode) && B(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Pa(t);
  e.slots.default = () => n;
}, Il = (e, t, n) => {
  for (const i in t)
    (n || i !== "_") && (e[i] = t[i]);
}, mg = (e, t, n) => {
  const i = e.slots = ef();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Il(i, t, n), n && zo(i, "_", s, !0)) : af(t, i);
  } else t && cf(e, t);
}, vg = (e, t, n) => {
  const { vnode: i, slots: s } = e;
  let r = !0, o = yt;
  if (i.shapeFlag & 32) {
    const l = t._;
    l ? M.NODE_ENV !== "production" && Ne ? (Il(s, t, n), Ge(e, "set", "$slots")) : n && l === 1 ? r = !1 : Il(s, t, n) : (r = !t.$stable, af(t, s)), o = t;
  } else t && (cf(e, t), o = { default: 1 });
  if (r)
    for (const l in s)
      !lf(l) && o[l] == null && delete s[l];
};
let Ji, Sn;
function gi(e, t) {
  e.appContext.config.performance && Xo() && Sn.mark(`vue-${t}-${e.uid}`), M.NODE_ENV !== "production" && _2(e, t, Xo() ? Sn.now() : Date.now());
}
function mi(e, t) {
  if (e.appContext.config.performance && Xo()) {
    const n = `vue-${t}-${e.uid}`, i = n + ":end";
    Sn.mark(i), Sn.measure(
      `<${Ar(e, e.type)}> ${t}`,
      n,
      i
    ), Sn.clearMarks(n), Sn.clearMarks(i);
  }
  M.NODE_ENV !== "production" && M2(e, t, Xo() ? Sn.now() : Date.now());
}
function Xo() {
  return Ji !== void 0 || (typeof window < "u" && window.performance ? (Ji = !0, Sn = window.performance) : Ji = !1), Ji;
}
function bg() {
  const e = [];
  if (M.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const ne = Rg;
function yg(e) {
  return xg(e);
}
function xg(e, t) {
  bg();
  const n = Bs();
  n.__VUE__ = !0, M.NODE_ENV !== "production" && $u(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: i,
    remove: s,
    patchProp: r,
    createElement: o,
    createText: l,
    createComment: a,
    setText: c,
    setElementText: h,
    parentNode: d,
    nextSibling: u,
    setScopeId: f = zt,
    insertStaticContent: g
  } = e, m = (y, x, D, L = null, A = null, T = null, q = void 0, H = null, z = M.NODE_ENV !== "production" && Ne ? !1 : !!x.dynamicChildren) => {
    if (y === x)
      return;
    y && !Zi(y, x) && (L = Us(y), Wt(y, A, T, !0), y = null), x.patchFlag === -2 && (z = !1, x.dynamicChildren = null);
    const { type: I, ref: nt, shapeFlag: G } = x;
    switch (I) {
      case js:
        v(y, x, D, L);
        break;
      case be:
        b(y, x, D, L);
        break;
      case Do:
        y == null ? _(x, D, L, q) : M.NODE_ENV !== "production" && S(y, x, D, q);
        break;
      case vt:
        J(
          y,
          x,
          D,
          L,
          A,
          T,
          q,
          H,
          z
        );
        break;
      default:
        G & 1 ? N(
          y,
          x,
          D,
          L,
          A,
          T,
          q,
          H,
          z
        ) : G & 6 ? kt(
          y,
          x,
          D,
          L,
          A,
          T,
          q,
          H,
          z
        ) : G & 64 || G & 128 ? I.process(
          y,
          x,
          D,
          L,
          A,
          T,
          q,
          H,
          z,
          Ui
        ) : M.NODE_ENV !== "production" && B("Invalid VNode type:", I, `(${typeof I})`);
    }
    nt != null && A && Yo(nt, y && y.ref, T, x || y, !x);
  }, v = (y, x, D, L) => {
    if (y == null)
      i(
        x.el = l(x.children),
        D,
        L
      );
    else {
      const A = x.el = y.el;
      x.children !== y.children && c(A, x.children);
    }
  }, b = (y, x, D, L) => {
    y == null ? i(
      x.el = a(x.children || ""),
      D,
      L
    ) : x.el = y.el;
  }, _ = (y, x, D, L) => {
    [y.el, y.anchor] = g(
      y.children,
      x,
      D,
      L,
      y.el,
      y.anchor
    );
  }, S = (y, x, D, L) => {
    if (x.children !== y.children) {
      const A = u(y.anchor);
      k(y), [x.el, x.anchor] = g(
        x.children,
        D,
        A,
        L
      );
    } else
      x.el = y.el, x.anchor = y.anchor;
  }, E = ({ el: y, anchor: x }, D, L) => {
    let A;
    for (; y && y !== x; )
      A = u(y), i(y, D, L), y = A;
    i(x, D, L);
  }, k = ({ el: y, anchor: x }) => {
    let D;
    for (; y && y !== x; )
      D = u(y), s(y), y = D;
    s(x);
  }, N = (y, x, D, L, A, T, q, H, z) => {
    x.type === "svg" ? q = "svg" : x.type === "math" && (q = "mathml"), y == null ? w(
      x,
      D,
      L,
      A,
      T,
      q,
      H,
      z
    ) : F(
      y,
      x,
      A,
      T,
      q,
      H,
      z
    );
  }, w = (y, x, D, L, A, T, q, H) => {
    let z, I;
    const { props: nt, shapeFlag: G, transition: Q, dirs: ot } = y;
    if (z = y.el = o(
      y.type,
      T,
      nt && nt.is,
      nt
    ), G & 8 ? h(z, y.children) : G & 16 && O(
      y.children,
      z,
      null,
      L,
      A,
      Ur(y, T),
      q,
      H
    ), ot && Bn(y, null, L, "created"), P(z, y, y.scopeId, q, L), nt) {
      for (const Mt in nt)
        Mt !== "value" && !us(Mt) && r(z, Mt, null, nt[Mt], T, L);
      "value" in nt && r(z, "value", null, nt.value, T), (I = nt.onVnodeBeforeMount) && Be(I, L, y);
    }
    M.NODE_ENV !== "production" && (zo(z, "__vnode", y, !0), zo(z, "__vueParentComponent", L, !0)), ot && Bn(y, null, L, "beforeMount");
    const ft = kg(A, Q);
    ft && Q.beforeEnter(z), i(z, x, D), ((I = nt && nt.onVnodeMounted) || ft || ot) && ne(() => {
      I && Be(I, L, y), ft && Q.enter(z), ot && Bn(y, null, L, "mounted");
    }, A);
  }, P = (y, x, D, L, A) => {
    if (D && f(y, D), L)
      for (let T = 0; T < L.length; T++)
        f(y, L[T]);
    if (A) {
      let T = A.subTree;
      if (M.NODE_ENV !== "production" && T.patchFlag > 0 && T.patchFlag & 2048 && (T = Da(T.children) || T), x === T || gf(T.type) && (T.ssContent === x || T.ssFallback === x)) {
        const q = A.vnode;
        P(
          y,
          q,
          q.scopeId,
          q.slotScopeIds,
          A.parent
        );
      }
    }
  }, O = (y, x, D, L, A, T, q, H, z = 0) => {
    for (let I = z; I < y.length; I++) {
      const nt = y[I] = H ? Cn(y[I]) : Pe(y[I]);
      m(
        null,
        nt,
        x,
        D,
        L,
        A,
        T,
        q,
        H
      );
    }
  }, F = (y, x, D, L, A, T, q) => {
    const H = x.el = y.el;
    M.NODE_ENV !== "production" && (H.__vnode = x);
    let { patchFlag: z, dynamicChildren: I, dirs: nt } = x;
    z |= y.patchFlag & 16;
    const G = y.props || yt, Q = x.props || yt;
    let ot;
    if (D && zn(D, !1), (ot = Q.onVnodeBeforeUpdate) && Be(ot, D, x, y), nt && Bn(x, y, D, "beforeUpdate"), D && zn(D, !0), M.NODE_ENV !== "production" && Ne && (z = 0, q = !1, I = null), (G.innerHTML && Q.innerHTML == null || G.textContent && Q.textContent == null) && h(H, ""), I ? (R(
      y.dynamicChildren,
      I,
      H,
      D,
      L,
      Ur(x, A),
      T
    ), M.NODE_ENV !== "production" && ms(y, x)) : q || ct(
      y,
      x,
      H,
      null,
      D,
      L,
      Ur(x, A),
      T,
      !1
    ), z > 0) {
      if (z & 16)
        j(H, G, Q, D, A);
      else if (z & 2 && G.class !== Q.class && r(H, "class", null, Q.class, A), z & 4 && r(H, "style", G.style, Q.style, A), z & 8) {
        const ft = x.dynamicProps;
        for (let Mt = 0; Mt < ft.length; Mt++) {
          const wt = ft[Mt], de = G[wt], re = Q[wt];
          (re !== de || wt === "value") && r(H, wt, de, re, A, D);
        }
      }
      z & 1 && y.children !== x.children && h(H, x.children);
    } else !q && I == null && j(H, G, Q, D, A);
    ((ot = Q.onVnodeUpdated) || nt) && ne(() => {
      ot && Be(ot, D, x, y), nt && Bn(x, y, D, "updated");
    }, L);
  }, R = (y, x, D, L, A, T, q) => {
    for (let H = 0; H < x.length; H++) {
      const z = y[H], I = x[H], nt = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        z.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (z.type === vt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Zi(z, I) || // - In the case of a component, it could contain anything.
        z.shapeFlag & 70) ? d(z.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          D
        )
      );
      m(
        z,
        I,
        nt,
        null,
        L,
        A,
        T,
        q,
        !0
      );
    }
  }, j = (y, x, D, L, A) => {
    if (x !== D) {
      if (x !== yt)
        for (const T in x)
          !us(T) && !(T in D) && r(
            y,
            T,
            x[T],
            null,
            A,
            L
          );
      for (const T in D) {
        if (us(T)) continue;
        const q = D[T], H = x[T];
        q !== H && T !== "value" && r(y, T, H, q, A, L);
      }
      "value" in D && r(y, "value", x.value, D.value, A);
    }
  }, J = (y, x, D, L, A, T, q, H, z) => {
    const I = x.el = y ? y.el : l(""), nt = x.anchor = y ? y.anchor : l("");
    let { patchFlag: G, dynamicChildren: Q, slotScopeIds: ot } = x;
    M.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Ne || G & 2048) && (G = 0, z = !1, Q = null), ot && (H = H ? H.concat(ot) : ot), y == null ? (i(I, D, L), i(nt, D, L), O(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      x.children || [],
      D,
      nt,
      A,
      T,
      q,
      H,
      z
    )) : G > 0 && G & 64 && Q && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    y.dynamicChildren ? (R(
      y.dynamicChildren,
      Q,
      D,
      A,
      T,
      q,
      H
    ), M.NODE_ENV !== "production" ? ms(y, x) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (x.key != null || A && x === A.subTree) && ms(
        y,
        x,
        !0
        /* shallow */
      )
    )) : ct(
      y,
      x,
      D,
      nt,
      A,
      T,
      q,
      H,
      z
    );
  }, kt = (y, x, D, L, A, T, q, H, z) => {
    x.slotScopeIds = H, y == null ? x.shapeFlag & 512 ? A.ctx.activate(
      x,
      D,
      L,
      q,
      z
    ) : st(
      x,
      D,
      L,
      A,
      T,
      q,
      z
    ) : et(y, x, z);
  }, st = (y, x, D, L, A, T, q) => {
    const H = y.component = $g(
      y,
      L,
      A
    );
    if (M.NODE_ENV !== "production" && H.type.__hmrId && p2(H), M.NODE_ENV !== "production" && (Mo(y), gi(H, "mount")), Sa(y) && (H.ctx.renderer = Ui), M.NODE_ENV !== "production" && gi(H, "init"), Hg(H, !1, q), M.NODE_ENV !== "production" && mi(H, "init"), H.asyncDep) {
      if (M.NODE_ENV !== "production" && Ne && (y.el = null), A && A.registerDep(H, U, q), !y.el) {
        const z = H.subTree = At(be);
        b(null, z, x, D);
      }
    } else
      U(
        H,
        y,
        x,
        D,
        A,
        T,
        q
      );
    M.NODE_ENV !== "production" && (Co(), mi(H, "mount"));
  }, et = (y, x, D) => {
    const L = x.component = y.component;
    if (Ng(y, x, D))
      if (L.asyncDep && !L.asyncResolved) {
        M.NODE_ENV !== "production" && Mo(x), Z(L, x, D), M.NODE_ENV !== "production" && Co();
        return;
      } else
        L.next = x, L.update();
    else
      x.el = y.el, L.vnode = x;
  }, U = (y, x, D, L, A, T, q) => {
    const H = () => {
      if (y.isMounted) {
        let { next: G, bu: Q, u: ot, parent: ft, vnode: Mt } = y;
        {
          const Ve = hf(y);
          if (Ve) {
            G && (G.el = Mt.el, Z(y, G, q)), Ve.asyncDep.then(() => {
              y.isUnmounted || H();
            });
            return;
          }
        }
        let wt = G, de;
        M.NODE_ENV !== "production" && Mo(G || y.vnode), zn(y, !1), G ? (G.el = Mt.el, Z(y, G, q)) : G = Mt, Q && Mi(Q), (de = G.props && G.props.onVnodeBeforeUpdate) && Be(de, ft, G, Mt), zn(y, !0), M.NODE_ENV !== "production" && gi(y, "render");
        const re = Vc(y);
        M.NODE_ENV !== "production" && mi(y, "render");
        const Ie = y.subTree;
        y.subTree = re, M.NODE_ENV !== "production" && gi(y, "patch"), m(
          Ie,
          re,
          // parent may have changed if it's in a teleport
          d(Ie.el),
          // anchor may have changed if it's in a fragment
          Us(Ie),
          y,
          A,
          T
        ), M.NODE_ENV !== "production" && mi(y, "patch"), G.el = re.el, wt === null && Og(y, re.el), ot && ne(ot, A), (de = G.props && G.props.onVnodeUpdated) && ne(
          () => Be(de, ft, G, Mt),
          A
        ), M.NODE_ENV !== "production" && Bu(y), M.NODE_ENV !== "production" && Co();
      } else {
        let G;
        const { el: Q, props: ot } = x, { bm: ft, m: Mt, parent: wt, root: de, type: re } = y, Ie = gs(x);
        zn(y, !1), ft && Mi(ft), !Ie && (G = ot && ot.onVnodeBeforeMount) && Be(G, wt, x), zn(y, !0);
        {
          de.ce && de.ce._injectChildStyle(re), M.NODE_ENV !== "production" && gi(y, "render");
          const Ve = y.subTree = Vc(y);
          M.NODE_ENV !== "production" && mi(y, "render"), M.NODE_ENV !== "production" && gi(y, "patch"), m(
            null,
            Ve,
            D,
            L,
            y,
            A,
            T
          ), M.NODE_ENV !== "production" && mi(y, "patch"), x.el = Ve.el;
        }
        if (Mt && ne(Mt, A), !Ie && (G = ot && ot.onVnodeMounted)) {
          const Ve = x;
          ne(
            () => Be(G, wt, Ve),
            A
          );
        }
        (x.shapeFlag & 256 || wt && gs(wt.vnode) && wt.vnode.shapeFlag & 256) && y.a && ne(y.a, A), y.isMounted = !0, M.NODE_ENV !== "production" && x2(y), x = D = L = null;
      }
    };
    y.scope.on();
    const z = y.effect = new pu(H);
    y.scope.off();
    const I = y.update = z.run.bind(z), nt = y.job = z.runIfDirty.bind(z);
    nt.i = y, nt.id = y.uid, z.scheduler = () => Pr(nt), zn(y, !0), M.NODE_ENV !== "production" && (z.onTrack = y.rtc ? (G) => Mi(y.rtc, G) : void 0, z.onTrigger = y.rtg ? (G) => Mi(y.rtg, G) : void 0), I();
  }, Z = (y, x, D) => {
    x.component = y;
    const L = y.vnode.props;
    y.vnode = x, y.next = null, lg(y, x.props, L, D), vg(y, x.children, D), kn(), Mc(y), wn();
  }, ct = (y, x, D, L, A, T, q, H, z = !1) => {
    const I = y && y.children, nt = y ? y.shapeFlag : 0, G = x.children, { patchFlag: Q, shapeFlag: ot } = x;
    if (Q > 0) {
      if (Q & 128) {
        xe(
          I,
          G,
          D,
          L,
          A,
          T,
          q,
          H,
          z
        );
        return;
      } else if (Q & 256) {
        Se(
          I,
          G,
          D,
          L,
          A,
          T,
          q,
          H,
          z
        );
        return;
      }
    }
    ot & 8 ? (nt & 16 && Yi(I, A, T), G !== I && h(D, G)) : nt & 16 ? ot & 16 ? xe(
      I,
      G,
      D,
      L,
      A,
      T,
      q,
      H,
      z
    ) : Yi(I, A, T, !0) : (nt & 8 && h(D, ""), ot & 16 && O(
      G,
      D,
      L,
      A,
      T,
      q,
      H,
      z
    ));
  }, Se = (y, x, D, L, A, T, q, H, z) => {
    y = y || Di, x = x || Di;
    const I = y.length, nt = x.length, G = Math.min(I, nt);
    let Q;
    for (Q = 0; Q < G; Q++) {
      const ot = x[Q] = z ? Cn(x[Q]) : Pe(x[Q]);
      m(
        y[Q],
        ot,
        D,
        null,
        A,
        T,
        q,
        H,
        z
      );
    }
    I > nt ? Yi(
      y,
      A,
      T,
      !0,
      !1,
      G
    ) : O(
      x,
      D,
      L,
      A,
      T,
      q,
      H,
      z,
      G
    );
  }, xe = (y, x, D, L, A, T, q, H, z) => {
    let I = 0;
    const nt = x.length;
    let G = y.length - 1, Q = nt - 1;
    for (; I <= G && I <= Q; ) {
      const ot = y[I], ft = x[I] = z ? Cn(x[I]) : Pe(x[I]);
      if (Zi(ot, ft))
        m(
          ot,
          ft,
          D,
          null,
          A,
          T,
          q,
          H,
          z
        );
      else
        break;
      I++;
    }
    for (; I <= G && I <= Q; ) {
      const ot = y[G], ft = x[Q] = z ? Cn(x[Q]) : Pe(x[Q]);
      if (Zi(ot, ft))
        m(
          ot,
          ft,
          D,
          null,
          A,
          T,
          q,
          H,
          z
        );
      else
        break;
      G--, Q--;
    }
    if (I > G) {
      if (I <= Q) {
        const ot = Q + 1, ft = ot < nt ? x[ot].el : L;
        for (; I <= Q; )
          m(
            null,
            x[I] = z ? Cn(x[I]) : Pe(x[I]),
            D,
            ft,
            A,
            T,
            q,
            H,
            z
          ), I++;
      }
    } else if (I > Q)
      for (; I <= G; )
        Wt(y[I], A, T, !0), I++;
    else {
      const ot = I, ft = I, Mt = /* @__PURE__ */ new Map();
      for (I = ft; I <= Q; I++) {
        const Qt = x[I] = z ? Cn(x[I]) : Pe(x[I]);
        Qt.key != null && (M.NODE_ENV !== "production" && Mt.has(Qt.key) && B(
          "Duplicate keys found during update:",
          JSON.stringify(Qt.key),
          "Make sure keys are unique."
        ), Mt.set(Qt.key, I));
      }
      let wt, de = 0;
      const re = Q - ft + 1;
      let Ie = !1, Ve = 0;
      const Xi = new Array(re);
      for (I = 0; I < re; I++) Xi[I] = 0;
      for (I = ot; I <= G; I++) {
        const Qt = y[I];
        if (de >= re) {
          Wt(Qt, A, T, !0);
          continue;
        }
        let $e;
        if (Qt.key != null)
          $e = Mt.get(Qt.key);
        else
          for (wt = ft; wt <= Q; wt++)
            if (Xi[wt - ft] === 0 && Zi(Qt, x[wt])) {
              $e = wt;
              break;
            }
        $e === void 0 ? Wt(Qt, A, T, !0) : (Xi[$e - ft] = I + 1, $e >= Ve ? Ve = $e : Ie = !0, m(
          Qt,
          x[$e],
          D,
          null,
          A,
          T,
          q,
          H,
          z
        ), de++);
      }
      const mc = Ie ? wg(Xi) : Di;
      for (wt = mc.length - 1, I = re - 1; I >= 0; I--) {
        const Qt = ft + I, $e = x[Qt], vc = Qt + 1 < nt ? x[Qt + 1].el : L;
        Xi[I] === 0 ? m(
          null,
          $e,
          D,
          vc,
          A,
          T,
          q,
          H,
          z
        ) : Ie && (wt < 0 || I !== mc[wt] ? Zt($e, D, vc, 2) : wt--);
      }
    }
  }, Zt = (y, x, D, L, A = null) => {
    const { el: T, type: q, transition: H, children: z, shapeFlag: I } = y;
    if (I & 6) {
      Zt(y.component.subTree, x, D, L);
      return;
    }
    if (I & 128) {
      y.suspense.move(x, D, L);
      return;
    }
    if (I & 64) {
      q.move(y, x, D, Ui);
      return;
    }
    if (q === vt) {
      i(T, x, D);
      for (let G = 0; G < z.length; G++)
        Zt(z[G], x, D, L);
      i(y.anchor, x, D);
      return;
    }
    if (q === Do) {
      E(y, x, D);
      return;
    }
    if (L !== 2 && I & 1 && H)
      if (L === 0)
        H.beforeEnter(T), i(T, x, D), ne(() => H.enter(T), A);
      else {
        const { leave: G, delayLeave: Q, afterLeave: ot } = H, ft = () => i(T, x, D), Mt = () => {
          G(T, () => {
            ft(), ot && ot();
          });
        };
        Q ? Q(T, ft, Mt) : Mt();
      }
    else
      i(T, x, D);
  }, Wt = (y, x, D, L = !1, A = !1) => {
    const {
      type: T,
      props: q,
      ref: H,
      children: z,
      dynamicChildren: I,
      shapeFlag: nt,
      patchFlag: G,
      dirs: Q,
      cacheIndex: ot
    } = y;
    if (G === -2 && (A = !1), H != null && Yo(H, null, D, y, !0), ot != null && (x.renderCache[ot] = void 0), nt & 256) {
      x.ctx.deactivate(y);
      return;
    }
    const ft = nt & 1 && Q, Mt = !gs(y);
    let wt;
    if (Mt && (wt = q && q.onVnodeBeforeUnmount) && Be(wt, x, y), nt & 6)
      nn(y.component, D, L);
    else {
      if (nt & 128) {
        y.suspense.unmount(D, L);
        return;
      }
      ft && Bn(y, null, x, "beforeUnmount"), nt & 64 ? y.type.remove(
        y,
        x,
        D,
        Ui,
        L
      ) : I && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !I.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (T !== vt || G > 0 && G & 64) ? Yi(
        I,
        x,
        D,
        !1,
        !0
      ) : (T === vt && G & 384 || !A && nt & 16) && Yi(z, x, D), L && Ee(y);
    }
    (Mt && (wt = q && q.onVnodeUnmounted) || ft) && ne(() => {
      wt && Be(wt, x, y), ft && Bn(y, null, x, "unmounted");
    }, D);
  }, Ee = (y) => {
    const { type: x, el: D, anchor: L, transition: A } = y;
    if (x === vt) {
      M.NODE_ENV !== "production" && y.patchFlag > 0 && y.patchFlag & 2048 && A && !A.persisted ? y.children.forEach((q) => {
        q.type === be ? s(q.el) : Ee(q);
      }) : $n(D, L);
      return;
    }
    if (x === Do) {
      k(y);
      return;
    }
    const T = () => {
      s(D), A && !A.persisted && A.afterLeave && A.afterLeave();
    };
    if (y.shapeFlag & 1 && A && !A.persisted) {
      const { leave: q, delayLeave: H } = A, z = () => q(D, T);
      H ? H(y.el, T, z) : z();
    } else
      T();
  }, $n = (y, x) => {
    let D;
    for (; y !== x; )
      D = u(y), s(y), y = D;
    s(x);
  }, nn = (y, x, D) => {
    M.NODE_ENV !== "production" && y.type.__hmrId && g2(y);
    const { bum: L, scope: A, job: T, subTree: q, um: H, m: z, a: I } = y;
    Ic(z), Ic(I), L && Mi(L), A.stop(), T && (T.flags |= 8, Wt(q, y, x, D)), H && ne(H, x), ne(() => {
      y.isUnmounted = !0;
    }, x), x && x.pendingBranch && !x.isUnmounted && y.asyncDep && !y.asyncResolved && y.suspenseId === x.pendingId && (x.deps--, x.deps === 0 && x.resolve()), M.NODE_ENV !== "production" && w2(y);
  }, Yi = (y, x, D, L = !1, A = !1, T = 0) => {
    for (let q = T; q < y.length; q++)
      Wt(y[q], x, D, L, A);
  }, Us = (y) => {
    if (y.shapeFlag & 6)
      return Us(y.component.subTree);
    if (y.shapeFlag & 128)
      return y.suspense.next();
    const x = u(y.anchor || y.el), D = x && x[Wu];
    return D ? u(D) : x;
  };
  let Br = !1;
  const gc = (y, x, D) => {
    y == null ? x._vnode && Wt(x._vnode, null, null, !0) : m(
      x._vnode || null,
      y,
      x,
      null,
      null,
      null,
      D
    ), x._vnode = y, Br || (Br = !0, Mc(), Lu(), Br = !1);
  }, Ui = {
    p: m,
    um: Wt,
    m: Zt,
    r: Ee,
    mt: st,
    mc: O,
    pc: ct,
    pbc: R,
    n: Us,
    o: e
  };
  return {
    render: gc,
    hydrate: void 0,
    createApp: ig(gc)
  };
}
function Ur({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function zn({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function kg(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ms(e, t, n = !1) {
  const i = e.children, s = t.children;
  if (K(i) && K(s))
    for (let r = 0; r < i.length; r++) {
      const o = i[r];
      let l = s[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = Cn(s[r]), l.el = o.el), !n && l.patchFlag !== -2 && ms(o, l)), l.type === js && (l.el = o.el), M.NODE_ENV !== "production" && l.type === be && !l.el && (l.el = o.el);
    }
}
function wg(e) {
  const t = e.slice(), n = [0];
  let i, s, r, o, l;
  const a = e.length;
  for (i = 0; i < a; i++) {
    const c = e[i];
    if (c !== 0) {
      if (s = n[n.length - 1], e[s] < c) {
        t[i] = s, n.push(i);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        l = r + o >> 1, e[n[l]] < c ? r = l + 1 : o = l;
      c < e[n[r]] && (r > 0 && (t[i] = n[r - 1]), n[r] = i);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = t[o];
  return n;
}
function hf(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : hf(t);
}
function Ic(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const _g = Symbol.for("v-scx"), Mg = () => {
  {
    const e = Po(_g);
    return e || M.NODE_ENV !== "production" && B(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Xr(e, t, n) {
  return M.NODE_ENV !== "production" && !it(t) && B(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), df(e, t, n);
}
function df(e, t, n = yt) {
  const { immediate: i, deep: s, flush: r, once: o } = n;
  M.NODE_ENV !== "production" && !t && (i !== void 0 && B(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && B(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && B(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = Nt({}, n);
  M.NODE_ENV !== "production" && (l.onWarn = B);
  const a = t && i || !t && r !== "post";
  let c;
  if (Es) {
    if (r === "sync") {
      const f = Mg();
      c = f.__watcherHandles || (f.__watcherHandles = []);
    } else if (!a) {
      const f = () => {
      };
      return f.stop = zt, f.resume = zt, f.pause = zt, f;
    }
  }
  const h = Ht;
  l.call = (f, g, m) => en(f, h, g, m);
  let d = !1;
  r === "post" ? l.scheduler = (f) => {
    ne(f, h && h.suspense);
  } : r !== "sync" && (d = !0, l.scheduler = (f, g) => {
    g ? f() : Pr(f);
  }), l.augmentJob = (f) => {
    t && (f.flags |= 4), d && (f.flags |= 2, h && (f.id = h.uid, f.i = h));
  };
  const u = r2(e, t, l);
  return Es && (c ? c.push(u) : a && u()), u;
}
function Cg(e, t, n) {
  const i = this.proxy, s = Et(e) ? e.includes(".") ? uf(i, e) : () => i[e] : e.bind(i, i);
  let r;
  it(t) ? r = t : (r = t.handler, n = t);
  const o = Ws(this), l = df(s, r.bind(i), n);
  return o(), l;
}
function uf(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let s = 0; s < n.length && i; s++)
      i = i[n[s]];
    return i;
  };
}
const Sg = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${qt(t)}Modifiers`] || e[`${ge(t)}Modifiers`];
function Eg(e, t, ...n) {
  if (e.isUnmounted) return;
  const i = e.vnode.props || yt;
  if (M.NODE_ENV !== "production") {
    const {
      emitsOptions: h,
      propsOptions: [d]
    } = e;
    if (h)
      if (!(t in h))
        (!d || !(qn(qt(t)) in d)) && B(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${qn(qt(t))}" prop.`
        );
      else {
        const u = h[t];
        it(u) && (u(...n) || B(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), o = r && Sg(i, t.slice(7));
  if (o && (o.trim && (s = n.map((h) => Et(h) ? h.trim() : h)), o.number && (s = n.map(hu))), M.NODE_ENV !== "production" && C2(e, t, s), M.NODE_ENV !== "production") {
    const h = t.toLowerCase();
    h !== t && i[qn(h)] && B(
      `Event "${h}" is emitted in component ${Ar(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${ge(
        t
      )}" instead of "${t}".`
    );
  }
  let l, a = i[l = qn(t)] || // also try camelCase event handler (#2249)
  i[l = qn(qt(t))];
  !a && r && (a = i[l = qn(ge(t))]), a && en(
    a,
    e,
    6,
    s
  );
  const c = i[l + "Once"];
  if (c) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, en(
      c,
      e,
      6,
      s
    );
  }
}
function ff(e, t, n = !1) {
  const i = t.emitsCache, s = i.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let o = {}, l = !1;
  if (!it(e)) {
    const a = (c) => {
      const h = ff(c, t, !0);
      h && (l = !0, Nt(o, h));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !r && !l ? (xt(e) && i.set(e, null), null) : (K(r) ? r.forEach((a) => o[a] = null) : Nt(o, r), xt(e) && i.set(e, o), o);
}
function Nr(e, t) {
  return !e || !Vs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), pt(e, t[0].toLowerCase() + t.slice(1)) || pt(e, ge(t)) || pt(e, t));
}
let Vl = !1;
function Ko() {
  Vl = !0;
}
function Vc(e) {
  const {
    type: t,
    vnode: n,
    proxy: i,
    withProxy: s,
    propsOptions: [r],
    slots: o,
    attrs: l,
    emit: a,
    render: c,
    renderCache: h,
    props: d,
    data: u,
    setupState: f,
    ctx: g,
    inheritAttrs: m
  } = e, v = Go(e);
  let b, _;
  M.NODE_ENV !== "production" && (Vl = !1);
  try {
    if (n.shapeFlag & 4) {
      const k = s || i, N = M.NODE_ENV !== "production" && f.__isScriptSetup ? new Proxy(k, {
        get(w, P, O) {
          return B(
            `Property '${String(
              P
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(w, P, O);
        }
      }) : k;
      b = Pe(
        c.call(
          N,
          k,
          h,
          M.NODE_ENV !== "production" ? Ue(d) : d,
          f,
          u,
          g
        )
      ), _ = l;
    } else {
      const k = t;
      M.NODE_ENV !== "production" && l === d && Ko(), b = Pe(
        k.length > 1 ? k(
          M.NODE_ENV !== "production" ? Ue(d) : d,
          M.NODE_ENV !== "production" ? {
            get attrs() {
              return Ko(), Ue(l);
            },
            slots: o,
            emit: a
          } : { attrs: l, slots: o, emit: a }
        ) : k(
          M.NODE_ENV !== "production" ? Ue(d) : d,
          null
        )
      ), _ = t.props ? l : Pg(l);
    }
  } catch (k) {
    vs.length = 0, zs(k, e, 1), b = At(be);
  }
  let S = b, E;
  if (M.NODE_ENV !== "production" && b.patchFlag > 0 && b.patchFlag & 2048 && ([S, E] = pf(b)), _ && m !== !1) {
    const k = Object.keys(_), { shapeFlag: N } = S;
    if (k.length) {
      if (N & 7)
        r && k.some(Bo) && (_ = Dg(
          _,
          r
        )), S = Rn(S, _, !1, !0);
      else if (M.NODE_ENV !== "production" && !Vl && S.type !== be) {
        const w = Object.keys(l), P = [], O = [];
        for (let F = 0, R = w.length; F < R; F++) {
          const j = w[F];
          Vs(j) ? Bo(j) || P.push(j[2].toLowerCase() + j.slice(3)) : O.push(j);
        }
        O.length && B(
          `Extraneous non-props attributes (${O.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), P.length && B(
          `Extraneous non-emits event listeners (${P.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (M.NODE_ENV !== "production" && !$c(S) && B(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), S = Rn(S, null, !1, !0), S.dirs = S.dirs ? S.dirs.concat(n.dirs) : n.dirs), n.transition && (M.NODE_ENV !== "production" && !$c(S) && B(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Ca(S, n.transition)), M.NODE_ENV !== "production" && E ? E(S) : b = S, Go(v), b;
}
const pf = (e) => {
  const t = e.children, n = e.dynamicChildren, i = Da(t, !1);
  if (i) {
    if (M.NODE_ENV !== "production" && i.patchFlag > 0 && i.patchFlag & 2048)
      return pf(i);
  } else return [e, void 0];
  const s = t.indexOf(i), r = n ? n.indexOf(i) : -1, o = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [Pe(i), o];
};
function Da(e, t = !0) {
  let n;
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    if (Or(s)) {
      if (s.type !== be || s.children === "v-if") {
        if (n)
          return;
        if (n = s, M.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Da(n.children);
      }
    } else
      return;
  }
  return n;
}
const Pg = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Vs(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Dg = (e, t) => {
  const n = {};
  for (const i in e)
    (!Bo(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
  return n;
}, $c = (e) => e.shapeFlag & 7 || e.type === be;
function Ng(e, t, n) {
  const { props: i, children: s, component: r } = e, { props: o, children: l, patchFlag: a } = t, c = r.emitsOptions;
  if (M.NODE_ENV !== "production" && (s || l) && Ne || t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return i ? Bc(i, o, c) : !!o;
    if (a & 8) {
      const h = t.dynamicProps;
      for (let d = 0; d < h.length; d++) {
        const u = h[d];
        if (o[u] !== i[u] && !Nr(c, u))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : i === o ? !1 : i ? o ? Bc(i, o, c) : !0 : !!o;
  return !1;
}
function Bc(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < i.length; s++) {
    const r = i[s];
    if (t[r] !== e[r] && !Nr(n, r))
      return !0;
  }
  return !1;
}
function Og({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.el = e.el), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const gf = (e) => e.__isSuspense;
function Rg(e, t) {
  t && t.pendingBranch ? K(e) ? t.effects.push(...e) : t.effects.push(e) : Tu(e);
}
const vt = Symbol.for("v-fgt"), js = Symbol.for("v-txt"), be = Symbol.for("v-cmt"), Do = Symbol.for("v-stc"), vs = [];
let me = null;
function V(e = !1) {
  vs.push(me = e ? null : []);
}
function Ag() {
  vs.pop(), me = vs[vs.length - 1] || null;
}
let Ss = 1;
function zc(e, t = !1) {
  Ss += e, e < 0 && me && t && (me.hasOnce = !0);
}
function mf(e) {
  return e.dynamicChildren = Ss > 0 ? me || Di : null, Ag(), Ss > 0 && me && me.push(e), e;
}
function W(e, t, n, i, s, r) {
  return mf(
    p(
      e,
      t,
      n,
      i,
      s,
      r,
      !0
    )
  );
}
function Ce(e, t, n, i, s) {
  return mf(
    At(
      e,
      t,
      n,
      i,
      s,
      !0
    )
  );
}
function Or(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Zi(e, t) {
  if (M.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = So.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const Fg = (...e) => bf(
  ...e
), vf = ({ key: e }) => e ?? null, No = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Et(e) || $t(e) || it(e) ? { i: Xt, r: e, k: t, f: !!n } : e : null);
function p(e, t = null, n = null, i = 0, s = null, r = e === vt ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && vf(t),
    ref: t && No(t),
    scopeId: Hu,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: i,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Xt
  };
  return l ? (Na(a, n), r & 128 && e.normalize(a)) : n && (a.shapeFlag |= Et(n) ? 8 : 16), M.NODE_ENV !== "production" && a.key !== a.key && B("VNode created with invalid key (NaN). VNode type:", a.type), Ss > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  me && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && me.push(a), a;
}
const At = M.NODE_ENV !== "production" ? Fg : bf;
function bf(e, t = null, n = null, i = 0, s = null, r = !1) {
  if ((!e || e === q2) && (M.NODE_ENV !== "production" && !e && B(`Invalid vnode type when creating vnode: ${e}.`), e = be), Or(e)) {
    const l = Rn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Na(l, n), Ss > 0 && !r && me && (l.shapeFlag & 6 ? me[me.indexOf(e)] = l : me.push(l)), l.patchFlag = -2, l;
  }
  if (wf(e) && (e = e.__vccOpts), t) {
    t = Tg(t);
    let { class: l, style: a } = t;
    l && !Et(l) && (t.class = ie(l)), xt(a) && (Ho(a) && !K(a) && (a = Nt({}, a)), t.style = C(a));
  }
  const o = Et(e) ? 1 : gf(e) ? 128 : P2(e) ? 64 : xt(e) ? 4 : it(e) ? 2 : 0;
  return M.NODE_ENV !== "production" && o & 4 && Ho(e) && (e = at(e), B(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), p(
    e,
    t,
    n,
    i,
    s,
    o,
    r,
    !0
  );
}
function Tg(e) {
  return e ? Ho(e) || nf(e) ? Nt({}, e) : e : null;
}
function Rn(e, t, n = !1, i = !1) {
  const { props: s, ref: r, patchFlag: o, children: l, transition: a } = e, c = t ? Lg(s || {}, t) : s, h = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && vf(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? K(r) ? r.concat(No(t)) : [r, No(t)] : No(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: M.NODE_ENV !== "production" && o === -1 && K(l) ? l.map(yf) : l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== vt ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Rn(e.ssContent),
    ssFallback: e.ssFallback && Rn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && i && Ca(
    h,
    a.clone(h)
  ), h;
}
function yf(e) {
  const t = Rn(e);
  return K(e.children) && (t.children = e.children.map(yf)), t;
}
function Si(e = " ", t = 0) {
  return At(js, null, e, t);
}
function Ct(e = "", t = !1) {
  return t ? (V(), Ce(be, null, e)) : At(be, null, e);
}
function Pe(e) {
  return e == null || typeof e == "boolean" ? At(be) : K(e) ? At(
    vt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Or(e) ? Cn(e) : At(js, null, String(e));
}
function Cn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Rn(e);
}
function Na(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null)
    t = null;
  else if (K(t))
    n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Na(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !nf(t) ? t._ctx = Xt : s === 3 && Xt && (Xt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else it(t) ? (t = { default: t, _ctx: Xt }, n = 32) : (t = String(t), i & 64 ? (n = 16, t = [Si(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Lg(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const s in i)
      if (s === "class")
        t.class !== i.class && (t.class = ie([t.class, i.class]));
      else if (s === "style")
        t.style = C([t.style, i.style]);
      else if (Vs(s)) {
        const r = t[s], o = i[s];
        o && r !== o && !(K(r) && r.includes(o)) && (t[s] = r ? [].concat(r, o) : o);
      } else s !== "" && (t[s] = i[s]);
  }
  return t;
}
function Be(e, t, n, i = null) {
  en(e, t, 7, [
    n,
    i
  ]);
}
const Ig = Qu();
let Vg = 0;
function $g(e, t, n) {
  const i = e.type, s = (t ? t.appContext : e.appContext) || Ig, r = {
    uid: Vg++,
    vnode: e,
    type: i,
    parent: t,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Rp(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: of(i, s),
    emitsOptions: ff(i, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: yt,
    // inheritAttrs
    inheritAttrs: i.inheritAttrs,
    // state
    ctx: yt,
    data: yt,
    props: yt,
    attrs: yt,
    slots: yt,
    refs: yt,
    setupState: yt,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return M.NODE_ENV !== "production" ? r.ctx = Y2(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Eg.bind(null, r), e.ce && e.ce(r), r;
}
let Ht = null;
const Bg = () => Ht || Xt;
let Jo, $l;
{
  const e = Bs(), t = (n, i) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(i), (r) => {
      s.length > 1 ? s.forEach((o) => o(r)) : s[0](r);
    };
  };
  Jo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ht = n
  ), $l = t(
    "__VUE_SSR_SETTERS__",
    (n) => Es = n
  );
}
const Ws = (e) => {
  const t = Ht;
  return Jo(e), e.scope.on(), () => {
    e.scope.off(), Jo(t);
  };
}, Hc = () => {
  Ht && Ht.scope.off(), Jo(null);
}, zg = /* @__PURE__ */ xn("slot,component");
function Bl(e, { isNativeTag: t }) {
  (zg(e) || t(e)) && B(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function xf(e) {
  return e.vnode.shapeFlag & 4;
}
let Es = !1;
function Hg(e, t = !1, n = !1) {
  t && $l(t);
  const { props: i, children: s } = e.vnode, r = xf(e);
  og(e, i, r, t), mg(e, s, n);
  const o = r ? jg(e, t) : void 0;
  return t && $l(!1), o;
}
function jg(e, t) {
  var n;
  const i = e.type;
  if (M.NODE_ENV !== "production") {
    if (i.name && Bl(i.name, e.appContext.config), i.components) {
      const r = Object.keys(i.components);
      for (let o = 0; o < r.length; o++)
        Bl(r[o], e.appContext.config);
    }
    if (i.directives) {
      const r = Object.keys(i.directives);
      for (let o = 0; o < r.length; o++)
        ju(r[o]);
    }
    i.compilerOptions && Wg() && B(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ku), M.NODE_ENV !== "production" && U2(e);
  const { setup: s } = i;
  if (s) {
    kn();
    const r = e.setupContext = s.length > 1 ? Gg(e) : null, o = Ws(e), l = Bi(
      s,
      e,
      0,
      [
        M.NODE_ENV !== "production" ? Ue(e.props) : e.props,
        r
      ]
    ), a = fa(l);
    if (wn(), o(), (a || e.sp) && !gs(e) && Yu(e), a) {
      if (l.then(Hc, Hc), t)
        return l.then((c) => {
          jc(e, c, t);
        }).catch((c) => {
          zs(c, e, 0);
        });
      if (e.asyncDep = l, M.NODE_ENV !== "production" && !e.suspense) {
        const c = (n = i.name) != null ? n : "Anonymous";
        B(
          `Component <${c}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      jc(e, l, t);
  } else
    kf(e, t);
}
function jc(e, t, n) {
  it(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : xt(t) ? (M.NODE_ENV !== "production" && Or(t) && B(
    "setup() should not return VNodes directly - return a render function instead."
  ), M.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Ou(t), M.NODE_ENV !== "production" && X2(e)) : M.NODE_ENV !== "production" && t !== void 0 && B(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), kf(e, n);
}
const Wg = () => !0;
function kf(e, t, n) {
  const i = e.type;
  e.render || (e.render = i.render || zt);
  {
    const s = Ws(e);
    kn();
    try {
      J2(e);
    } finally {
      wn(), s();
    }
  }
  M.NODE_ENV !== "production" && !i.render && e.render === zt && !t && (i.template ? B(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : B("Component is missing template or render function: ", i));
}
const Wc = M.NODE_ENV !== "production" ? {
  get(e, t) {
    return Ko(), Bt(e, "get", ""), e[t];
  },
  set() {
    return B("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return B("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return Bt(e, "get", ""), e[t];
  }
};
function qg(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return Bt(e, "get", "$slots"), t[n];
    }
  });
}
function Gg(e) {
  const t = (n) => {
    if (M.NODE_ENV !== "production" && (e.exposed && B("expose() should be called only once per setup()."), n != null)) {
      let i = typeof n;
      i === "object" && (K(n) ? i = "array" : $t(n) && (i = "ref")), i !== "object" && B(
        `expose() should be passed a plain object, received ${i}.`
      );
    }
    e.exposed = n || {};
  };
  if (M.NODE_ENV !== "production") {
    let n, i;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, Wc));
      },
      get slots() {
        return i || (i = qg(e));
      },
      get emit() {
        return (s, ...r) => e.emit(s, ...r);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, Wc),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Rr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ou(Qp(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in si)
        return si[n](e);
    },
    has(t, n) {
      return n in t || n in si;
    }
  })) : e.proxy;
}
const Yg = /(?:^|[-_])(\w)/g, Ug = (e) => e.replace(Yg, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Oa(e, t = !0) {
  return it(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ar(e, t, n = !1) {
  let i = Oa(t);
  if (!i && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (i = s[1]);
  }
  if (!i && e && e.parent) {
    const s = (r) => {
      for (const o in r)
        if (r[o] === t)
          return o;
    };
    i = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return i ? Ug(i) : n ? "App" : "Anonymous";
}
function wf(e) {
  return it(e) && "__vccOpts" in e;
}
const Xn = (e, t) => {
  const n = s2(e, t, Es);
  if (M.NODE_ENV !== "production") {
    const i = Bg();
    i && i.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Xg() {
  if (M.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, i = { style: "color:#eb2f96" }, s = {
    __vue_custom_formatter: !0,
    header(d) {
      return xt(d) ? d.__isVue ? ["div", e, "VueInstance"] : $t(d) ? [
        "div",
        {},
        ["span", e, h(d)],
        "<",
        // avoid debugger accessing value affecting behavior
        l("_value" in d ? d._value : d),
        ">"
      ] : ei(d) ? [
        "div",
        {},
        ["span", e, oe(d) ? "ShallowReactive" : "Reactive"],
        "<",
        l(d),
        `>${yn(d) ? " (readonly)" : ""}`
      ] : yn(d) ? [
        "div",
        {},
        ["span", e, oe(d) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(d),
        ">"
      ] : null : null;
    },
    hasBody(d) {
      return d && d.__isVue;
    },
    body(d) {
      if (d && d.__isVue)
        return [
          "div",
          {},
          ...r(d.$)
        ];
    }
  };
  function r(d) {
    const u = [];
    d.type.props && d.props && u.push(o("props", at(d.props))), d.setupState !== yt && u.push(o("setup", d.setupState)), d.data !== yt && u.push(o("data", at(d.data)));
    const f = a(d, "computed");
    f && u.push(o("computed", f));
    const g = a(d, "inject");
    return g && u.push(o("injected", g)), u.push([
      "div",
      {},
      [
        "span",
        {
          style: i.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: d }]
    ]), u;
  }
  function o(d, u) {
    return u = Nt({}, u), Object.keys(u).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        d
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(u).map((f) => [
          "div",
          {},
          ["span", i, f + ": "],
          l(u[f], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(d, u = !0) {
    return typeof d == "number" ? ["span", t, d] : typeof d == "string" ? ["span", n, JSON.stringify(d)] : typeof d == "boolean" ? ["span", i, d] : xt(d) ? ["object", { object: u ? at(d) : d }] : ["span", n, String(d)];
  }
  function a(d, u) {
    const f = d.type;
    if (it(f))
      return;
    const g = {};
    for (const m in d.ctx)
      c(f, m, u) && (g[m] = d.ctx[m]);
    return g;
  }
  function c(d, u, f) {
    const g = d[f];
    if (K(g) && g.includes(u) || xt(g) && u in g || d.extends && c(d.extends, u, f) || d.mixins && d.mixins.some((m) => c(m, u, f)))
      return !0;
  }
  function h(d) {
    return oe(d) ? "ShallowRef" : d.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const qc = "3.5.13", ye = M.NODE_ENV !== "production" ? B : zt;
var Yt = {};
let zl;
const Gc = typeof window < "u" && window.trustedTypes;
if (Gc)
  try {
    zl = /* @__PURE__ */ Gc.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    Yt.NODE_ENV !== "production" && ye(`Error creating trusted types policy: ${e}`);
  }
const _f = zl ? (e) => zl.createHTML(e) : (e) => e, Kg = "http://www.w3.org/2000/svg", Jg = "http://www.w3.org/1998/Math/MathML", cn = typeof document < "u" ? document : null, Yc = cn && /* @__PURE__ */ cn.createElement("template"), Zg = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, i) => {
    const s = t === "svg" ? cn.createElementNS(Kg, e) : t === "mathml" ? cn.createElementNS(Jg, e) : n ? cn.createElement(e, { is: n }) : cn.createElement(e);
    return e === "select" && i && i.multiple != null && s.setAttribute("multiple", i.multiple), s;
  },
  createText: (e) => cn.createTextNode(e),
  createComment: (e) => cn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => cn.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, i, s, r) {
    const o = n ? n.previousSibling : t.lastChild;
    if (s && (s === r || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling)); )
        ;
    else {
      Yc.innerHTML = _f(
        i === "svg" ? `<svg>${e}</svg>` : i === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Yc.content;
      if (i === "svg" || i === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Qg = Symbol("_vtc");
function t3(e, t, n) {
  const i = e[Qg];
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Uc = Symbol("_vod"), e3 = Symbol("_vsh"), n3 = Symbol(Yt.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), i3 = /(^|;)\s*display\s*:/;
function s3(e, t, n) {
  const i = e.style, s = Et(n);
  let r = !1;
  if (n && !s) {
    if (t)
      if (Et(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Oo(i, l, "");
        }
      else
        for (const o in t)
          n[o] == null && Oo(i, o, "");
    for (const o in n)
      o === "display" && (r = !0), Oo(i, o, n[o]);
  } else if (s) {
    if (t !== n) {
      const o = i[n3];
      o && (n += ";" + o), i.cssText = n, r = i3.test(n);
    }
  } else t && e.removeAttribute("style");
  Uc in e && (e[Uc] = r ? i.display : "", e[e3] && (i.display = "none"));
}
const o3 = /[^\\];\s*$/, Xc = /\s*!important$/;
function Oo(e, t, n) {
  if (K(n))
    n.forEach((i) => Oo(e, t, i));
  else if (n == null && (n = ""), Yt.NODE_ENV !== "production" && o3.test(n) && ye(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const i = r3(e, t);
    Xc.test(n) ? e.setProperty(
      ge(i),
      n.replace(Xc, ""),
      "important"
    ) : e[i] = n;
  }
}
const Kc = ["Webkit", "Moz", "ms"], Kr = {};
function r3(e, t) {
  const n = Kr[t];
  if (n)
    return n;
  let i = qt(t);
  if (i !== "filter" && i in e)
    return Kr[t] = i;
  i = ai(i);
  for (let s = 0; s < Kc.length; s++) {
    const r = Kc[s] + i;
    if (r in e)
      return Kr[t] = r;
  }
  return t;
}
const Jc = "http://www.w3.org/1999/xlink";
function Zc(e, t, n, i, s, r = Dp(t)) {
  i && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Jc, t.slice(6, t.length)) : e.setAttributeNS(Jc, t, n) : n == null || r && !du(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Qe(n) ? String(n) : n
  );
}
function Qc(e, t, n, i, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? _f(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = du(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    Yt.NODE_ENV !== "production" && !o && ye(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      l
    );
  }
  o && e.removeAttribute(s || t);
}
function Mf(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function l3(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
const th = Symbol("_vei");
function a3(e, t, n, i, s = null) {
  const r = e[th] || (e[th] = {}), o = r[t];
  if (i && o)
    o.value = Yt.NODE_ENV !== "production" ? nh(i, t) : i;
  else {
    const [l, a] = c3(t);
    if (i) {
      const c = r[t] = u3(
        Yt.NODE_ENV !== "production" ? nh(i, t) : i,
        s
      );
      Mf(e, l, c, a);
    } else o && (l3(e, l, o, a), r[t] = void 0);
  }
}
const eh = /(?:Once|Passive|Capture)$/;
function c3(e) {
  let t;
  if (eh.test(e)) {
    t = {};
    let i;
    for (; i = e.match(eh); )
      e = e.slice(0, e.length - i[0].length), t[i[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ge(e.slice(2)), t];
}
let Jr = 0;
const h3 = /* @__PURE__ */ Promise.resolve(), d3 = () => Jr || (h3.then(() => Jr = 0), Jr = Date.now());
function u3(e, t) {
  const n = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= n.attached)
      return;
    en(
      f3(i, n.value),
      t,
      5,
      [i]
    );
  };
  return n.value = e, n.attached = d3(), n;
}
function nh(e, t) {
  return it(e) || K(e) ? e : (ye(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), zt);
}
function f3(e, t) {
  if (K(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (i) => (s) => !s._stopped && i && i(s)
    );
  } else
    return t;
}
const ih = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, p3 = (e, t, n, i, s, r) => {
  const o = s === "svg";
  t === "class" ? t3(e, i, o) : t === "style" ? s3(e, n, i) : Vs(t) ? Bo(t) || a3(e, t, n, i, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : g3(e, t, i, o)) ? (Qc(e, t, i), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Zc(e, t, i, o, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !Et(i)) ? Qc(e, qt(t), i, r, t) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i), Zc(e, t, i, o));
};
function g3(e, t, n, i) {
  if (i)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ih(t) && it(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return ih(t) && Et(n) ? !1 : t in e;
}
const sh = {};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Te(e, t, n) {
  const i = /* @__PURE__ */ N2(e, t);
  wr(i) && Nt(i, t);
  class s extends Ra {
    constructor(o) {
      super(i, o, n);
    }
  }
  return s.def = i, s;
}
const m3 = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Ra extends m3 {
  constructor(t, n = {}, i = ah) {
    super(), this._def = t, this._props = n, this._createApp = i, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && i !== ah ? this._root = this.shadowRoot : (Yt.NODE_ENV !== "production" && this.shadowRoot && ye(
      "Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use `defineSSRCustomElement`."
    ), t.shadowRoot !== !1 ? (this.attachShadow({ mode: "open" }), this._root = this.shadowRoot) : this._root = this), this._def.__asyncLoader || this._resolveProps(this._def);
  }
  connectedCallback() {
    if (!this.isConnected) return;
    this.shadowRoot || this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof Ra) {
        this._parent = t;
        break;
      }
    this._instance || (this._resolved ? (this._setParent(), this._update()) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._instance.provides = t._instance.provides);
  }
  disconnectedCallback() {
    this._connected = !1, wa(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let i = 0; i < this.attributes.length; i++)
      this._setAttr(this.attributes[i].name);
    this._ob = new MutationObserver((i) => {
      for (const s of i)
        this._setAttr(s.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (i, s = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: r, styles: o } = i;
      let l;
      if (r && !K(r))
        for (const a in r) {
          const c = r[a];
          (c === Number || c && c.type === Number) && (a in this._props && (this._props[a] = yc(this._props[a])), (l || (l = /* @__PURE__ */ Object.create(null)))[qt(a)] = !0);
        }
      this._numberProps = l, s && this._resolveProps(i), this.shadowRoot ? this._applyStyles(o) : Yt.NODE_ENV !== "production" && o && ye(
        "Custom element style injection is not supported when using shadowRoot: false"
      ), this._mount(i);
    }, n = this._def.__asyncLoader;
    n ? this._pendingResolve = n().then(
      (i) => t(this._def = i, !0)
    ) : t(this._def);
  }
  _mount(t) {
    Yt.NODE_ENV !== "production" && !t.name && (t.name = "VueElement"), this._app = this._createApp(t), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const n = this._instance && this._instance.exposed;
    if (n)
      for (const i in n)
        pt(this, i) ? Yt.NODE_ENV !== "production" && ye(`Exposed property "${i}" already exists on custom element.`) : Object.defineProperty(this, i, {
          // unwrap ref to be consistent with public instance behavior
          get: () => Kn(n[i])
        });
  }
  _resolveProps(t) {
    const { props: n } = t, i = K(n) ? n : Object.keys(n || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && i.includes(s) && this._setProp(s, this[s]);
    for (const s of i.map(qt))
      Object.defineProperty(this, s, {
        get() {
          return this._getProp(s);
        },
        set(r) {
          this._setProp(s, r, !0, !0);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const n = this.hasAttribute(t);
    let i = n ? this.getAttribute(t) : sh;
    const s = qt(t);
    n && this._numberProps && this._numberProps[s] && (i = yc(i)), this._setProp(s, i, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, i = !0, s = !1) {
    if (n !== this._props[t] && (n === sh ? delete this._props[t] : (this._props[t] = n, t === "key" && this._app && (this._app._ceVNode.key = n)), s && this._instance && this._update(), i)) {
      const r = this._ob;
      r && r.disconnect(), n === !0 ? this.setAttribute(ge(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(ge(t), n + "") : n || this.removeAttribute(ge(t)), r && r.observe(this, { attributes: !0 });
    }
  }
  _update() {
    y3(this._createVNode(), this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const n = At(this._def, Nt(t, this._props));
    return this._instance || (n.ce = (i) => {
      this._instance = i, i.ce = this, i.isCE = !0, Yt.NODE_ENV !== "production" && (i.ceReload = (r) => {
        this._styles && (this._styles.forEach((o) => this._root.removeChild(o)), this._styles.length = 0), this._applyStyles(r), this._instance = null, this._update();
      });
      const s = (r, o) => {
        this.dispatchEvent(
          new CustomEvent(
            r,
            wr(o[0]) ? Nt({ detail: o }, o[0]) : { detail: o }
          )
        );
      };
      i.emit = (r, ...o) => {
        s(r, o), ge(r) !== r && s(ge(r), o);
      }, this._setParent();
    }), n;
  }
  _applyStyles(t, n) {
    if (!t) return;
    if (n) {
      if (n === this._def || this._styleChildren.has(n))
        return;
      this._styleChildren.add(n);
    }
    const i = this._nonce;
    for (let s = t.length - 1; s >= 0; s--) {
      const r = document.createElement("style");
      if (i && r.setAttribute("nonce", i), r.textContent = t[s], this.shadowRoot.prepend(r), Yt.NODE_ENV !== "production")
        if (n) {
          if (n.__hmrId) {
            this._childStyles || (this._childStyles = /* @__PURE__ */ new Map());
            let o = this._childStyles.get(n.__hmrId);
            o || this._childStyles.set(n.__hmrId, o = []), o.push(r);
          }
        } else
          (this._styles || (this._styles = [])).push(r);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let n;
    for (; n = this.firstChild; ) {
      const i = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (t[i] || (t[i] = [])).push(n), this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = (this._teleportTarget || this).querySelectorAll("slot"), n = this._instance.type.__scopeId;
    for (let i = 0; i < t.length; i++) {
      const s = t[i], r = s.getAttribute("name") || "default", o = this._slots[r], l = s.parentNode;
      if (o)
        for (const a of o) {
          if (n && a.nodeType === 1) {
            const c = n + "-s", h = document.createTreeWalker(a, 1);
            a.setAttribute(c, "");
            let d;
            for (; d = h.nextNode(); )
              d.setAttribute(c, "");
          }
          l.insertBefore(a, s);
        }
      else
        for (; s.firstChild; ) l.insertBefore(s.firstChild, s);
      l.removeChild(s);
    }
  }
  /**
   * @internal
   */
  _injectChildStyle(t) {
    this._applyStyles(t.styles, t);
  }
  /**
   * @internal
   */
  _removeChildStyle(t) {
    if (Yt.NODE_ENV !== "production" && (this._styleChildren.delete(t), this._childStyles && t.__hmrId)) {
      const n = this._childStyles.get(t.__hmrId);
      n && (n.forEach((i) => this._root.removeChild(i)), n.length = 0);
    }
  }
}
const oh = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return K(t) ? (n) => Mi(t, n) : t;
}, Zr = Symbol("_assign"), v3 = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, i) {
    const s = kr(t);
    Mf(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (o) => o.selected).map(
        (o) => n ? hu(Zo(o)) : Zo(o)
      );
      e[Zr](
        e.multiple ? s ? new Set(r) : r : r[0]
      ), e._assigning = !0, wa(() => {
        e._assigning = !1;
      });
    }), e[Zr] = oh(i);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    rh(e, t);
  },
  beforeUpdate(e, t, n) {
    e[Zr] = oh(n);
  },
  updated(e, { value: t }) {
    e._assigning || rh(e, t);
  }
};
function rh(e, t) {
  const n = e.multiple, i = K(t);
  if (n && !i && !kr(t)) {
    Yt.NODE_ENV !== "production" && ye(
      `<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(t).slice(8, -1)}.`
    );
    return;
  }
  for (let s = 0, r = e.options.length; s < r; s++) {
    const o = e.options[s], l = Zo(o);
    if (n)
      if (i) {
        const a = typeof l;
        a === "string" || a === "number" ? o.selected = t.some((c) => String(c) === String(l)) : o.selected = Op(t, l) > -1;
      } else
        o.selected = t.has(l);
    else if (Mr(Zo(o), t)) {
      e.selectedIndex !== s && (e.selectedIndex = s);
      return;
    }
  }
  !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
}
function Zo(e) {
  return "_value" in e ? e._value : e.value;
}
const b3 = /* @__PURE__ */ Nt({ patchProp: p3 }, Zg);
let lh;
function Cf() {
  return lh || (lh = yg(b3));
}
const y3 = (...e) => {
  Cf().render(...e);
}, ah = (...e) => {
  const t = Cf().createApp(...e);
  Yt.NODE_ENV !== "production" && (k3(t), w3(t));
  const { mount: n } = t;
  return t.mount = (i) => {
    const s = _3(i);
    if (!s) return;
    const r = t._component;
    !it(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const o = n(s, !1, x3(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
  }, t;
};
function x3(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function k3(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Cp(t) || Sp(t) || Ep(t),
    writable: !1
  });
}
function w3(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        ye(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, i = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return ye(i), n;
      },
      set() {
        ye(i);
      }
    });
  }
}
function _3(e) {
  if (Et(e)) {
    const t = document.querySelector(e);
    return Yt.NODE_ENV !== "production" && !t && ye(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return Yt.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && ye(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
var M3 = {};
function C3() {
  Xg();
}
M3.NODE_ENV !== "production" && C3();
function S3(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), i = n.createElement("base"), s = n.createElement("a");
  return n.head.appendChild(i), n.body.appendChild(s), t && (i.href = t), s.href = e, s.href;
}
const E3 = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function Nn(e) {
  const t = [];
  for (let n = 0, i = e.length; n < i; n++)
    t.push(e[n]);
  return t;
}
let vi = null;
function Sf(e = {}) {
  return vi || (e.includeStyleProperties ? (vi = e.includeStyleProperties, vi) : (vi = Nn(window.getComputedStyle(document.documentElement)), vi));
}
function Qo(e, t) {
  const i = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return i ? parseFloat(i.replace("px", "")) : 0;
}
function P3(e) {
  const t = Qo(e, "border-left-width"), n = Qo(e, "border-right-width");
  return e.clientWidth + t + n;
}
function D3(e) {
  const t = Qo(e, "border-top-width"), n = Qo(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Ef(e, t = {}) {
  const n = t.width || P3(e), i = t.height || D3(e);
  return { width: n, height: i };
}
function N3() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const ue = 16384;
function O3(e) {
  (e.width > ue || e.height > ue) && (e.width > ue && e.height > ue ? e.width > e.height ? (e.height *= ue / e.width, e.width = ue) : (e.width *= ue / e.height, e.height = ue) : e.width > ue ? (e.height *= ue / e.width, e.width = ue) : (e.width *= ue / e.height, e.height = ue));
}
function tr(e) {
  return new Promise((t, n) => {
    const i = new Image();
    i.onload = () => {
      i.decode().then(() => {
        requestAnimationFrame(() => t(i));
      });
    }, i.onerror = n, i.crossOrigin = "anonymous", i.decoding = "async", i.src = e;
  });
}
async function R3(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function A3(e, t, n) {
  const i = "http://www.w3.org/2000/svg", s = document.createElementNS(i, "svg"), r = document.createElementNS(i, "foreignObject");
  return s.setAttribute("width", `${t}`), s.setAttribute("height", `${n}`), s.setAttribute("viewBox", `0 0 ${t} ${n}`), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"), r.setAttribute("x", "0"), r.setAttribute("y", "0"), r.setAttribute("externalResourcesRequired", "true"), s.appendChild(r), r.appendChild(e), R3(s);
}
const he = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || he(n, t);
};
function F3(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function T3(e, t) {
  return Sf(t).map((n) => {
    const i = e.getPropertyValue(n), s = e.getPropertyPriority(n);
    return `${n}: ${i}${s ? " !important" : ""};`;
  }).join(" ");
}
function L3(e, t, n, i) {
  const s = `.${e}:${t}`, r = n.cssText ? F3(n) : T3(n, i);
  return document.createTextNode(`${s}{${r}}`);
}
function ch(e, t, n, i) {
  const s = window.getComputedStyle(e, n), r = s.getPropertyValue("content");
  if (r === "" || r === "none")
    return;
  const o = E3();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const l = document.createElement("style");
  l.appendChild(L3(o, n, s, i)), t.appendChild(l);
}
function I3(e, t, n) {
  ch(e, t, ":before", n), ch(e, t, ":after", n);
}
const hh = "application/font-woff", dh = "image/jpeg", V3 = {
  woff: hh,
  woff2: hh,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: dh,
  jpeg: dh,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function $3(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Aa(e) {
  const t = $3(e).toLowerCase();
  return V3[t] || "";
}
function B3(e) {
  return e.split(/,/)[1];
}
function Hl(e) {
  return e.search(/^(data:)/) !== -1;
}
function z3(e, t) {
  return `data:${t};base64,${e}`;
}
async function Pf(e, t, n) {
  const i = await fetch(e, t);
  if (i.status === 404)
    throw new Error(`Resource "${i.url}" not found`);
  const s = await i.blob();
  return new Promise((r, o) => {
    const l = new FileReader();
    l.onerror = o, l.onloadend = () => {
      try {
        r(n({ res: i, result: l.result }));
      } catch (a) {
        o(a);
      }
    }, l.readAsDataURL(s);
  });
}
const Qr = {};
function H3(e, t, n) {
  let i = e.replace(/\?.*/, "");
  return n && (i = e), /ttf|otf|eot|woff2?/i.test(i) && (i = i.replace(/.*\//, "")), t ? `[${t}]${i}` : i;
}
async function Fa(e, t, n) {
  const i = H3(e, t, n.includeQueryParams);
  if (Qr[i] != null)
    return Qr[i];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let s;
  try {
    const r = await Pf(e, n.fetchRequestInit, ({ res: o, result: l }) => (t || (t = o.headers.get("Content-Type") || ""), B3(l)));
    s = z3(r, t);
  } catch (r) {
    s = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    r && (o = typeof r == "string" ? r : r.message), o && console.warn(o);
  }
  return Qr[i] = s, s;
}
async function j3(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : tr(t);
}
async function W3(e, t) {
  if (e.currentSrc) {
    const r = document.createElement("canvas"), o = r.getContext("2d");
    r.width = e.clientWidth, r.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, r.width, r.height);
    const l = r.toDataURL();
    return tr(l);
  }
  const n = e.poster, i = Aa(n), s = await Fa(n, i, t);
  return tr(s);
}
async function q3(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Fr(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function G3(e, t) {
  return he(e, HTMLCanvasElement) ? j3(e) : he(e, HTMLVideoElement) ? W3(e, t) : he(e, HTMLIFrameElement) ? q3(e, t) : e.cloneNode(Df(e));
}
const Y3 = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Df = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function U3(e, t, n) {
  var i, s;
  if (Df(t))
    return t;
  let r = [];
  return Y3(e) && e.assignedNodes ? r = Nn(e.assignedNodes()) : he(e, HTMLIFrameElement) && (!((i = e.contentDocument) === null || i === void 0) && i.body) ? r = Nn(e.contentDocument.body.childNodes) : r = Nn(((s = e.shadowRoot) !== null && s !== void 0 ? s : e).childNodes), r.length === 0 || he(e, HTMLVideoElement) || await r.reduce((o, l) => o.then(() => Fr(l, n)).then((a) => {
    a && t.appendChild(a);
  }), Promise.resolve()), t;
}
function X3(e, t, n) {
  const i = t.style;
  if (!i)
    return;
  const s = window.getComputedStyle(e);
  s.cssText ? (i.cssText = s.cssText, i.transformOrigin = s.transformOrigin) : Sf(n).forEach((r) => {
    let o = s.getPropertyValue(r);
    r === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), he(e, HTMLIFrameElement) && r === "display" && o === "inline" && (o = "block"), r === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), i.setProperty(r, o, s.getPropertyPriority(r));
  });
}
function K3(e, t) {
  he(e, HTMLTextAreaElement) && (t.innerHTML = e.value), he(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function J3(e, t) {
  if (he(e, HTMLSelectElement)) {
    const n = t, i = Array.from(n.children).find((s) => e.value === s.getAttribute("value"));
    i && i.setAttribute("selected", "");
  }
}
function Z3(e, t, n) {
  return he(t, Element) && (X3(e, t, n), I3(e, t, n), K3(e, t), J3(e, t)), t;
}
async function Q3(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const i = {};
  for (let r = 0; r < n.length; r++) {
    const l = n[r].getAttribute("xlink:href");
    if (l) {
      const a = e.querySelector(l), c = document.querySelector(l);
      !a && c && !i[l] && (i[l] = await Fr(c, t, !0));
    }
  }
  const s = Object.values(i);
  if (s.length) {
    const r = "http://www.w3.org/1999/xhtml", o = document.createElementNS(r, "svg");
    o.setAttribute("xmlns", r), o.style.position = "absolute", o.style.width = "0", o.style.height = "0", o.style.overflow = "hidden", o.style.display = "none";
    const l = document.createElementNS(r, "defs");
    o.appendChild(l);
    for (let a = 0; a < s.length; a++)
      l.appendChild(s[a]);
    e.appendChild(o);
  }
  return e;
}
async function Fr(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((i) => G3(i, t)).then((i) => U3(e, i, t)).then((i) => Z3(e, i, t)).then((i) => Q3(i, t));
}
const Nf = /url\((['"]?)([^'"]+?)\1\)/g, tm = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, em = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function nm(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function im(e) {
  const t = [];
  return e.replace(Nf, (n, i, s) => (t.push(s), n)), t.filter((n) => !Hl(n));
}
async function sm(e, t, n, i, s) {
  try {
    const r = n ? S3(t, n) : t, o = Aa(t);
    let l;
    return s || (l = await Fa(r, o, i)), e.replace(nm(t), `$1${l}$3`);
  } catch {
  }
  return e;
}
function om(e, { preferredFontFormat: t }) {
  return t ? e.replace(em, (n) => {
    for (; ; ) {
      const [i, , s] = tm.exec(n) || [];
      if (!s)
        return "";
      if (s === t)
        return `src: ${i};`;
    }
  }) : e;
}
function Of(e) {
  return e.search(Nf) !== -1;
}
async function Rf(e, t, n) {
  if (!Of(e))
    return e;
  const i = om(e, n);
  return im(i).reduce((r, o) => r.then((l) => sm(l, o, t, n)), Promise.resolve(i));
}
async function bi(e, t, n) {
  var i;
  const s = (i = t.style) === null || i === void 0 ? void 0 : i.getPropertyValue(e);
  if (s) {
    const r = await Rf(s, null, n);
    return t.style.setProperty(e, r, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function rm(e, t) {
  await bi("background", e, t) || await bi("background-image", e, t), await bi("mask", e, t) || await bi("-webkit-mask", e, t) || await bi("mask-image", e, t) || await bi("-webkit-mask-image", e, t);
}
async function lm(e, t) {
  const n = he(e, HTMLImageElement);
  if (!(n && !Hl(e.src)) && !(he(e, SVGImageElement) && !Hl(e.href.baseVal)))
    return;
  const i = n ? e.src : e.href.baseVal, s = await Fa(i, Aa(i), t);
  await new Promise((r, o) => {
    e.onload = r, e.onerror = t.onImageErrorHandler ? (...a) => {
      try {
        r(t.onImageErrorHandler(...a));
      } catch (c) {
        o(c);
      }
    } : o;
    const l = e;
    l.decode && (l.decode = r), l.loading === "lazy" && (l.loading = "eager"), n ? (e.srcset = "", e.src = s) : e.href.baseVal = s;
  });
}
async function am(e, t) {
  const i = Nn(e.childNodes).map((s) => Af(s, t));
  await Promise.all(i).then(() => e);
}
async function Af(e, t) {
  he(e, Element) && (await rm(e, t), await lm(e, t), await am(e, t));
}
function cm(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const i = t.style;
  return i != null && Object.keys(i).forEach((s) => {
    n[s] = i[s];
  }), e;
}
const uh = {};
async function fh(e) {
  let t = uh[e];
  if (t != null)
    return t;
  const i = await (await fetch(e)).text();
  return t = { url: e, cssText: i }, uh[e] = t, t;
}
async function ph(e, t) {
  let n = e.cssText;
  const i = /url\(["']?([^"')]+)["']?\)/g, r = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let l = o.replace(i, "$1");
    return l.startsWith("https://") || (l = new URL(l, e.url).href), Pf(l, t.fetchRequestInit, ({ result: a }) => (n = n.replace(o, `url(${a})`), [o, a]));
  });
  return Promise.all(r).then(() => n);
}
function gh(e) {
  if (e == null)
    return [];
  const t = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let i = e.replace(n, "");
  const s = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const a = s.exec(i);
    if (a === null)
      break;
    t.push(a[0]);
  }
  i = i.replace(s, "");
  const r = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, o = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", l = new RegExp(o, "gi");
  for (; ; ) {
    let a = r.exec(i);
    if (a === null) {
      if (a = l.exec(i), a === null)
        break;
      r.lastIndex = l.lastIndex;
    } else
      l.lastIndex = r.lastIndex;
    t.push(a[0]);
  }
  return t;
}
async function hm(e, t) {
  const n = [], i = [];
  return e.forEach((s) => {
    if ("cssRules" in s)
      try {
        Nn(s.cssRules || []).forEach((r, o) => {
          if (r.type === CSSRule.IMPORT_RULE) {
            let l = o + 1;
            const a = r.href, c = fh(a).then((h) => ph(h, t)).then((h) => gh(h).forEach((d) => {
              try {
                s.insertRule(d, d.startsWith("@import") ? l += 1 : s.cssRules.length);
              } catch (u) {
                console.error("Error inserting rule from remote css", {
                  rule: d,
                  error: u
                });
              }
            })).catch((h) => {
              console.error("Error loading remote css", h.toString());
            });
            i.push(c);
          }
        });
      } catch (r) {
        const o = e.find((l) => l.href == null) || document.styleSheets[0];
        s.href != null && i.push(fh(s.href).then((l) => ph(l, t)).then((l) => gh(l).forEach((a) => {
          o.insertRule(a, o.cssRules.length);
        })).catch((l) => {
          console.error("Error loading remote stylesheet", l);
        })), console.error("Error inlining remote css file", r);
      }
  }), Promise.all(i).then(() => (e.forEach((s) => {
    if ("cssRules" in s)
      try {
        Nn(s.cssRules || []).forEach((r) => {
          n.push(r);
        });
      } catch (r) {
        console.error(`Error while reading CSS rules from ${s.href}`, r);
      }
  }), n));
}
function dm(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Of(t.style.getPropertyValue("src")));
}
async function um(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Nn(e.ownerDocument.styleSheets), i = await hm(n, t);
  return dm(i);
}
function Ff(e) {
  return e.trim().replace(/["']/g, "");
}
function fm(e) {
  const t = /* @__PURE__ */ new Set();
  function n(i) {
    (i.style.fontFamily || getComputedStyle(i).fontFamily).split(",").forEach((r) => {
      t.add(Ff(r));
    }), Array.from(i.children).forEach((r) => {
      r instanceof HTMLElement && n(r);
    });
  }
  return n(e), t;
}
async function pm(e, t) {
  const n = await um(e, t), i = fm(e);
  return (await Promise.all(n.filter((r) => i.has(Ff(r.style.fontFamily))).map((r) => {
    const o = r.parentStyleSheet ? r.parentStyleSheet.href : null;
    return Rf(r.cssText, o, t);
  }))).join(`
`);
}
async function gm(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await pm(e, t);
  if (n) {
    const i = document.createElement("style"), s = document.createTextNode(n);
    i.appendChild(s), e.firstChild ? e.insertBefore(i, e.firstChild) : e.appendChild(i);
  }
}
async function mm(e, t = {}) {
  const { width: n, height: i } = Ef(e, t), s = await Fr(e, t, !0);
  return await gm(s, t), await Af(s, t), cm(s, t), await A3(s, n, i);
}
async function vm(e, t = {}) {
  const { width: n, height: i } = Ef(e, t), s = await mm(e, t), r = await tr(s), o = document.createElement("canvas"), l = o.getContext("2d"), a = t.pixelRatio || N3(), c = t.canvasWidth || n, h = t.canvasHeight || i;
  return o.width = c * a, o.height = h * a, t.skipAutoScale || O3(o), o.style.width = `${c}`, o.style.height = `${h}`, t.backgroundColor && (l.fillStyle = t.backgroundColor, l.fillRect(0, 0, o.width, o.height)), l.drawImage(r, 0, 0, o.width, o.height), o;
}
async function bm(e, t = {}) {
  return (await vm(e, t)).toDataURL();
}
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function qs(e) {
  return e + 0.5 | 0;
}
const En = (e, t, n) => Math.max(Math.min(e, n), t);
function rs(e) {
  return En(qs(e * 2.55), 0, 255);
}
function On(e) {
  return En(qs(e * 255), 0, 255);
}
function hn(e) {
  return En(qs(e / 2.55) / 100, 0, 1);
}
function mh(e) {
  return En(qs(e * 100), 0, 100);
}
const ke = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, jl = [..."0123456789ABCDEF"], ym = (e) => jl[e & 15], xm = (e) => jl[(e & 240) >> 4] + jl[e & 15], to = (e) => (e & 240) >> 4 === (e & 15), km = (e) => to(e.r) && to(e.g) && to(e.b) && to(e.a);
function wm(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & ke[e[1]] * 17,
    g: 255 & ke[e[2]] * 17,
    b: 255 & ke[e[3]] * 17,
    a: t === 5 ? ke[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: ke[e[1]] << 4 | ke[e[2]],
    g: ke[e[3]] << 4 | ke[e[4]],
    b: ke[e[5]] << 4 | ke[e[6]],
    a: t === 9 ? ke[e[7]] << 4 | ke[e[8]] : 255
  })), n;
}
const _m = (e, t) => e < 255 ? t(e) : "";
function Mm(e) {
  var t = km(e) ? ym : xm;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + _m(e.a, t) : void 0;
}
const Cm = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Tf(e, t, n) {
  const i = t * Math.min(n, 1 - n), s = (r, o = (r + e / 30) % 12) => n - i * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [s(0), s(8), s(4)];
}
function Sm(e, t, n) {
  const i = (s, r = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(r, 4 - r, 1), 0);
  return [i(5), i(3), i(1)];
}
function Em(e, t, n) {
  const i = Tf(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    i[s] *= 1 - t - n, i[s] += t;
  return i;
}
function Pm(e, t, n, i, s) {
  return e === s ? (t - n) / i + (t < n ? 6 : 0) : t === s ? (n - e) / i + 2 : (e - t) / i + 4;
}
function Ta(e) {
  const n = e.r / 255, i = e.g / 255, s = e.b / 255, r = Math.max(n, i, s), o = Math.min(n, i, s), l = (r + o) / 2;
  let a, c, h;
  return r !== o && (h = r - o, c = l > 0.5 ? h / (2 - r - o) : h / (r + o), a = Pm(n, i, s, h, r), a = a * 60 + 0.5), [a | 0, c || 0, l];
}
function La(e, t, n, i) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, i)).map(On);
}
function Ia(e, t, n) {
  return La(Tf, e, t, n);
}
function Dm(e, t, n) {
  return La(Em, e, t, n);
}
function Nm(e, t, n) {
  return La(Sm, e, t, n);
}
function Lf(e) {
  return (e % 360 + 360) % 360;
}
function Om(e) {
  const t = Cm.exec(e);
  let n = 255, i;
  if (!t)
    return;
  t[5] !== i && (n = t[6] ? rs(+t[5]) : On(+t[5]));
  const s = Lf(+t[2]), r = +t[3] / 100, o = +t[4] / 100;
  return t[1] === "hwb" ? i = Dm(s, r, o) : t[1] === "hsv" ? i = Nm(s, r, o) : i = Ia(s, r, o), {
    r: i[0],
    g: i[1],
    b: i[2],
    a: n
  };
}
function Rm(e, t) {
  var n = Ta(e);
  n[0] = Lf(n[0] + t), n = Ia(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Am(e) {
  if (!e)
    return;
  const t = Ta(e), n = t[0], i = mh(t[1]), s = mh(t[2]);
  return e.a < 255 ? `hsla(${n}, ${i}%, ${s}%, ${hn(e.a)})` : `hsl(${n}, ${i}%, ${s}%)`;
}
const vh = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, bh = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function Fm() {
  const e = {}, t = Object.keys(bh), n = Object.keys(vh);
  let i, s, r, o, l;
  for (i = 0; i < t.length; i++) {
    for (o = l = t[i], s = 0; s < n.length; s++)
      r = n[s], l = l.replace(r, vh[r]);
    r = parseInt(bh[o], 16), e[l] = [r >> 16 & 255, r >> 8 & 255, r & 255];
  }
  return e;
}
let eo;
function Tm(e) {
  eo || (eo = Fm(), eo.transparent = [0, 0, 0, 0]);
  const t = eo[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Lm = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Im(e) {
  const t = Lm.exec(e);
  let n = 255, i, s, r;
  if (t) {
    if (t[7] !== i) {
      const o = +t[7];
      n = t[8] ? rs(o) : En(o * 255, 0, 255);
    }
    return i = +t[1], s = +t[3], r = +t[5], i = 255 & (t[2] ? rs(i) : En(i, 0, 255)), s = 255 & (t[4] ? rs(s) : En(s, 0, 255)), r = 255 & (t[6] ? rs(r) : En(r, 0, 255)), {
      r: i,
      g: s,
      b: r,
      a: n
    };
  }
}
function Vm(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${hn(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const tl = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, yi = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function $m(e, t, n) {
  const i = yi(hn(e.r)), s = yi(hn(e.g)), r = yi(hn(e.b));
  return {
    r: On(tl(i + n * (yi(hn(t.r)) - i))),
    g: On(tl(s + n * (yi(hn(t.g)) - s))),
    b: On(tl(r + n * (yi(hn(t.b)) - r))),
    a: e.a + n * (t.a - e.a)
  };
}
function no(e, t, n) {
  if (e) {
    let i = Ta(e);
    i[t] = Math.max(0, Math.min(i[t] + i[t] * n, t === 0 ? 360 : 1)), i = Ia(i), e.r = i[0], e.g = i[1], e.b = i[2];
  }
}
function If(e, t) {
  return e && Object.assign(t || {}, e);
}
function yh(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = On(e[3]))) : (t = If(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = On(t.a)), t;
}
function Bm(e) {
  return e.charAt(0) === "r" ? Im(e) : Om(e);
}
let Vf = class Wl {
  constructor(t) {
    if (t instanceof Wl)
      return t;
    const n = typeof t;
    let i;
    n === "object" ? i = yh(t) : n === "string" && (i = wm(t) || Tm(t) || Bm(t)), this._rgb = i, this._valid = !!i;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = If(this._rgb);
    return t && (t.a = hn(t.a)), t;
  }
  set rgb(t) {
    this._rgb = yh(t);
  }
  rgbString() {
    return this._valid ? Vm(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Mm(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Am(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const i = this.rgb, s = t.rgb;
      let r;
      const o = n === r ? 0.5 : n, l = 2 * o - 1, a = i.a - s.a, c = ((l * a === -1 ? l : (l + a) / (1 + l * a)) + 1) / 2;
      r = 1 - c, i.r = 255 & c * i.r + r * s.r + 0.5, i.g = 255 & c * i.g + r * s.g + 0.5, i.b = 255 & c * i.b + r * s.b + 0.5, i.a = o * i.a + (1 - o) * s.a, this.rgb = i;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = $m(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Wl(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = On(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = qs(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = n, this;
  }
  opaquer(t) {
    const n = this._rgb;
    return n.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return no(this._rgb, 2, t), this;
  }
  darken(t) {
    return no(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return no(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return no(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Rm(this._rgb, t), this;
  }
};
/*!
 * Chart.js v4.4.9
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function on() {
}
const zm = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function gt(e) {
  return e == null;
}
function Dt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function dt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function Gt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function ze(e, t) {
  return Gt(e) ? e : t;
}
function mt(e, t) {
  return typeof e > "u" ? t : e;
}
const Hm = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, $f = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Ot(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function _t(e, t, n, i) {
  let s, r, o;
  if (Dt(e))
    for (r = e.length, s = 0; s < r; s++)
      t.call(n, e[s], s);
  else if (dt(e))
    for (o = Object.keys(e), r = o.length, s = 0; s < r; s++)
      t.call(n, e[o[s]], o[s]);
}
function er(e, t) {
  let n, i, s, r;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, i = e.length; n < i; ++n)
    if (s = e[n], r = t[n], s.datasetIndex !== r.datasetIndex || s.index !== r.index)
      return !1;
  return !0;
}
function nr(e) {
  if (Dt(e))
    return e.map(nr);
  if (dt(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), i = n.length;
    let s = 0;
    for (; s < i; ++s)
      t[n[s]] = nr(e[n[s]]);
    return t;
  }
  return e;
}
function Bf(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function jm(e, t, n, i) {
  if (!Bf(e))
    return;
  const s = t[e], r = n[e];
  dt(s) && dt(r) ? Ps(s, r, i) : t[e] = nr(r);
}
function Ps(e, t, n) {
  const i = Dt(t) ? t : [
    t
  ], s = i.length;
  if (!dt(e))
    return e;
  n = n || {};
  const r = n.merger || jm;
  let o;
  for (let l = 0; l < s; ++l) {
    if (o = i[l], !dt(o))
      continue;
    const a = Object.keys(o);
    for (let c = 0, h = a.length; c < h; ++c)
      r(a[c], e, o, n);
  }
  return e;
}
function bs(e, t) {
  return Ps(e, t, {
    merger: Wm
  });
}
function Wm(e, t, n) {
  if (!Bf(e))
    return;
  const i = t[e], s = n[e];
  dt(i) && dt(s) ? bs(i, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = nr(s));
}
const xh = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function qm(e) {
  const t = e.split("."), n = [];
  let i = "";
  for (const s of t)
    i += s, i.endsWith("\\") ? i = i.slice(0, -1) + "." : (n.push(i), i = "");
  return n;
}
function Gm(e) {
  const t = qm(e);
  return (n) => {
    for (const i of t) {
      if (i === "")
        break;
      n = n && n[i];
    }
    return n;
  };
}
function An(e, t) {
  return (xh[t] || (xh[t] = Gm(t)))(e);
}
function Va(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Ds = (e) => typeof e < "u", Fn = (e) => typeof e == "function", kh = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Ym(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Rt = Math.PI, Pt = 2 * Rt, Um = Pt + Rt, ir = Number.POSITIVE_INFINITY, Xm = Rt / 180, Tt = Rt / 2, Hn = Rt / 4, wh = Rt * 2 / 3, zf = Math.log10, Ke = Math.sign;
function ys(e, t, n) {
  return Math.abs(e - t) < n;
}
function _h(e) {
  const t = Math.round(e);
  e = ys(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(zf(e))), i = e / n;
  return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * n;
}
function Km(e) {
  const t = [], n = Math.sqrt(e);
  let i;
  for (i = 1; i < n; i++)
    e % i === 0 && (t.push(i), t.push(e / i));
  return n === (n | 0) && t.push(n), t.sort((s, r) => s - r).pop(), t;
}
function Jm(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Fi(e) {
  return !Jm(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Zm(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Qm(e, t, n) {
  let i, s, r;
  for (i = 0, s = e.length; i < s; i++)
    r = e[i][n], isNaN(r) || (t.min = Math.min(t.min, r), t.max = Math.max(t.max, r));
}
function Xe(e) {
  return e * (Rt / 180);
}
function $a(e) {
  return e * (180 / Rt);
}
function Mh(e) {
  if (!Gt(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Hf(e, t) {
  const n = t.x - e.x, i = t.y - e.y, s = Math.sqrt(n * n + i * i);
  let r = Math.atan2(i, n);
  return r < -0.5 * Rt && (r += Pt), {
    angle: r,
    distance: s
  };
}
function ql(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function t0(e, t) {
  return (e - t + Um) % Pt - Rt;
}
function pe(e) {
  return (e % Pt + Pt) % Pt;
}
function Ns(e, t, n, i) {
  const s = pe(e), r = pe(t), o = pe(n), l = pe(r - s), a = pe(o - s), c = pe(s - r), h = pe(s - o);
  return s === r || s === o || i && r === o || l > a && c < h;
}
function Kt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function e0(e) {
  return Kt(e, -32768, 32767);
}
function Os(e, t, n, i = 1e-6) {
  return e >= Math.min(t, n) - i && e <= Math.max(t, n) + i;
}
function Ba(e, t, n) {
  n = n || ((o) => e[o] < t);
  let i = e.length - 1, s = 0, r;
  for (; i - s > 1; )
    r = s + i >> 1, n(r) ? s = r : i = r;
  return {
    lo: s,
    hi: i
  };
}
const Jn = (e, t, n, i) => Ba(e, n, i ? (s) => {
  const r = e[s][t];
  return r < n || r === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), n0 = (e, t, n) => Ba(e, n, (i) => e[i][t] >= n);
function i0(e, t, n) {
  let i = 0, s = e.length;
  for (; i < s && e[i] < t; )
    i++;
  for (; s > i && e[s - 1] > n; )
    s--;
  return i > 0 || s < e.length ? e.slice(i, s) : e;
}
const jf = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function s0(e, t) {
  if (e._chartjs) {
    e._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(e, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), jf.forEach((n) => {
    const i = "_onData" + Va(n), s = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...r) {
        const o = s.apply(this, r);
        return e._chartjs.listeners.forEach((l) => {
          typeof l[i] == "function" && l[i](...r);
        }), o;
      }
    });
  });
}
function Ch(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const i = n.listeners, s = i.indexOf(t);
  s !== -1 && i.splice(s, 1), !(i.length > 0) && (jf.forEach((r) => {
    delete e[r];
  }), delete e._chartjs);
}
function Wf(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const qf = function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
}();
function Gf(e, t) {
  let n = [], i = !1;
  return function(...s) {
    n = s, i || (i = !0, qf.call(window, () => {
      i = !1, e.apply(t, n);
    }));
  };
}
function o0(e, t) {
  let n;
  return function(...i) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, i)) : e.apply(this, i), t;
  };
}
const r0 = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Sh = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2;
function Yf(e, t, n) {
  const i = t.length;
  let s = 0, r = i;
  if (e._sorted) {
    const { iScale: o, vScale: l, _parsed: a } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, h = o.axis, { min: d, max: u, minDefined: f, maxDefined: g } = o.getUserBounds();
    if (f) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        Jn(a, h, d).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? i : Jn(t, h, o.getPixelForValue(d)).lo
      ), c) {
        const m = a.slice(0, s + 1).reverse().findIndex((v) => !gt(v[l.axis]));
        s -= Math.max(0, m);
      }
      s = Kt(s, 0, i - 1);
    }
    if (g) {
      let m = Math.max(
        // @ts-expect-error Need to type _parsed
        Jn(a, o.axis, u, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Jn(t, h, o.getPixelForValue(u), !0).hi + 1
      );
      if (c) {
        const v = a.slice(m - 1).findIndex((b) => !gt(b[l.axis]));
        m += Math.max(0, v);
      }
      r = Kt(m, s, i) - s;
    } else
      r = i - s;
  }
  return {
    start: s,
    count: r
  };
}
function Uf(e) {
  const { xScale: t, yScale: n, _scaleRanges: i } = e, s = {
    xmin: t.min,
    xmax: t.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!i)
    return e._scaleRanges = s, !0;
  const r = i.xmin !== t.min || i.xmax !== t.max || i.ymin !== n.min || i.ymax !== n.max;
  return Object.assign(i, s), r;
}
const io = (e) => e === 0 || e === 1, Eh = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Pt / n)), Ph = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Pt / n) + 1, xs = {
  linear: (e) => e,
  easeInQuad: (e) => e * e,
  easeOutQuad: (e) => -e * (e - 2),
  easeInOutQuad: (e) => (e /= 0.5) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1),
  easeInCubic: (e) => e * e * e,
  easeOutCubic: (e) => (e -= 1) * e * e + 1,
  easeInOutCubic: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2),
  easeInQuart: (e) => e * e * e * e,
  easeOutQuart: (e) => -((e -= 1) * e * e * e - 1),
  easeInOutQuart: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2),
  easeInQuint: (e) => e * e * e * e * e,
  easeOutQuint: (e) => (e -= 1) * e * e * e * e + 1,
  easeInOutQuint: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2),
  easeInSine: (e) => -Math.cos(e * Tt) + 1,
  easeOutSine: (e) => Math.sin(e * Tt),
  easeInOutSine: (e) => -0.5 * (Math.cos(Rt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => io(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => io(e) ? e : Eh(e, 0.075, 0.3),
  easeOutElastic: (e) => io(e) ? e : Ph(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return io(e) ? e : e < 0.5 ? 0.5 * Eh(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Ph(e * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(e) {
    return e * e * ((1.70158 + 1) * e - 1.70158);
  },
  easeOutBack(e) {
    return (e -= 1) * e * ((1.70158 + 1) * e + 1.70158) + 1;
  },
  easeInOutBack(e) {
    let t = 1.70158;
    return (e /= 0.5) < 1 ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t)) : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  },
  easeInBounce: (e) => 1 - xs.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? xs.easeInBounce(e * 2) * 0.5 : xs.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function za(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Dh(e) {
  return za(e) ? e : new Vf(e);
}
function el(e) {
  return za(e) ? e : new Vf(e).saturate(0.5).darken(0.1).hexString();
}
const l0 = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], a0 = [
  "color",
  "borderColor",
  "backgroundColor"
];
function c0(e) {
  e.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), e.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), e.set("animations", {
    colors: {
      type: "color",
      properties: a0
    },
    numbers: {
      type: "number",
      properties: l0
    }
  }), e.describe("animations", {
    _fallback: "animation"
  }), e.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function h0(e) {
  e.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const Nh = /* @__PURE__ */ new Map();
function d0(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let i = Nh.get(n);
  return i || (i = new Intl.NumberFormat(e, t), Nh.set(n, i)), i;
}
function Ha(e, t, n) {
  return d0(t, n).format(e);
}
const u0 = {
  values(e) {
    return Dt(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const i = this.chart.options.locale;
    let s, r = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), r = f0(e, n);
    }
    const o = zf(Math.abs(r)), l = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), a = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(a, this.options.ticks.format), Ha(e, i, a);
  }
};
function f0(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var ja = {
  formatters: u0
};
function p0(e) {
  e.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, n) => n.lineWidth,
      tickColor: (t, n) => n.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: ja.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), e.route("scale.ticks", "color", "", "color"), e.route("scale.grid", "color", "", "borderColor"), e.route("scale.border", "color", "", "borderColor"), e.route("scale.title", "color", "", "color"), e.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), e.describe("scales", {
    _fallback: "scale"
  }), e.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const hi = /* @__PURE__ */ Object.create(null), Gl = /* @__PURE__ */ Object.create(null);
function ks(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let i = 0, s = n.length; i < s; ++i) {
    const r = n[i];
    e = e[r] || (e[r] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function nl(e, t, n) {
  return typeof t == "string" ? Ps(ks(e, t), n) : Ps(ks(e, ""), t);
}
class g0 {
  constructor(t, n) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (i) => i.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (i, s) => el(s.backgroundColor), this.hoverBorderColor = (i, s) => el(s.borderColor), this.hoverColor = (i, s) => el(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return nl(this, t, n);
  }
  get(t) {
    return ks(this, t);
  }
  describe(t, n) {
    return nl(Gl, t, n);
  }
  override(t, n) {
    return nl(hi, t, n);
  }
  route(t, n, i, s) {
    const r = ks(this, t), o = ks(this, i), l = "_" + n;
    Object.defineProperties(r, {
      [l]: {
        value: r[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const a = this[l], c = o[s];
          return dt(a) ? Object.assign({}, c, a) : mt(a, c);
        },
        set(a) {
          this[l] = a;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var Lt = /* @__PURE__ */ new g0({
  _scriptable: (e) => !e.startsWith("on"),
  _indexable: (e) => e !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  c0,
  h0,
  p0
]);
function m0(e) {
  return !e || gt(e.size) || gt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function sr(e, t, n, i, s) {
  let r = t[s];
  return r || (r = t[s] = e.measureText(s).width, n.push(s)), r > i && (i = r), i;
}
function v0(e, t, n, i) {
  i = i || {};
  let s = i.data = i.data || {}, r = i.garbageCollect = i.garbageCollect || [];
  i.font !== t && (s = i.data = {}, r = i.garbageCollect = [], i.font = t), e.save(), e.font = t;
  let o = 0;
  const l = n.length;
  let a, c, h, d, u;
  for (a = 0; a < l; a++)
    if (d = n[a], d != null && !Dt(d))
      o = sr(e, s, r, o, d);
    else if (Dt(d))
      for (c = 0, h = d.length; c < h; c++)
        u = d[c], u != null && !Dt(u) && (o = sr(e, s, r, o, u));
  e.restore();
  const f = r.length / 2;
  if (f > n.length) {
    for (a = 0; a < f; a++)
      delete s[r[a]];
    r.splice(0, f);
  }
  return o;
}
function jn(e, t, n) {
  const i = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * i) / i + s;
}
function Oh(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Yl(e, t, n, i) {
  b0(e, t, n, i);
}
function b0(e, t, n, i, s) {
  let r, o, l, a, c, h, d, u;
  const f = t.pointStyle, g = t.rotation, m = t.radius;
  let v = (g || 0) * Xm;
  if (f && typeof f == "object" && (r = f.toString(), r === "[object HTMLImageElement]" || r === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, i), e.rotate(v), e.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height), e.restore();
    return;
  }
  if (!(isNaN(m) || m <= 0)) {
    switch (e.beginPath(), f) {
      // Default includes circle
      default:
        e.arc(n, i, m, 0, Pt), e.closePath();
        break;
      case "triangle":
        h = m, e.moveTo(n + Math.sin(v) * h, i - Math.cos(v) * m), v += wh, e.lineTo(n + Math.sin(v) * h, i - Math.cos(v) * m), v += wh, e.lineTo(n + Math.sin(v) * h, i - Math.cos(v) * m), e.closePath();
        break;
      case "rectRounded":
        c = m * 0.516, a = m - c, o = Math.cos(v + Hn) * a, d = Math.cos(v + Hn) * a, l = Math.sin(v + Hn) * a, u = Math.sin(v + Hn) * a, e.arc(n - d, i - l, c, v - Rt, v - Tt), e.arc(n + u, i - o, c, v - Tt, v), e.arc(n + d, i + l, c, v, v + Tt), e.arc(n - u, i + o, c, v + Tt, v + Rt), e.closePath();
        break;
      case "rect":
        if (!g) {
          a = Math.SQRT1_2 * m, h = a, e.rect(n - h, i - a, 2 * h, 2 * a);
          break;
        }
        v += Hn;
      /* falls through */
      case "rectRot":
        d = Math.cos(v) * m, o = Math.cos(v) * m, l = Math.sin(v) * m, u = Math.sin(v) * m, e.moveTo(n - d, i - l), e.lineTo(n + u, i - o), e.lineTo(n + d, i + l), e.lineTo(n - u, i + o), e.closePath();
        break;
      case "crossRot":
        v += Hn;
      /* falls through */
      case "cross":
        d = Math.cos(v) * m, o = Math.cos(v) * m, l = Math.sin(v) * m, u = Math.sin(v) * m, e.moveTo(n - d, i - l), e.lineTo(n + d, i + l), e.moveTo(n + u, i - o), e.lineTo(n - u, i + o);
        break;
      case "star":
        d = Math.cos(v) * m, o = Math.cos(v) * m, l = Math.sin(v) * m, u = Math.sin(v) * m, e.moveTo(n - d, i - l), e.lineTo(n + d, i + l), e.moveTo(n + u, i - o), e.lineTo(n - u, i + o), v += Hn, d = Math.cos(v) * m, o = Math.cos(v) * m, l = Math.sin(v) * m, u = Math.sin(v) * m, e.moveTo(n - d, i - l), e.lineTo(n + d, i + l), e.moveTo(n + u, i - o), e.lineTo(n - u, i + o);
        break;
      case "line":
        o = Math.cos(v) * m, l = Math.sin(v) * m, e.moveTo(n - o, i - l), e.lineTo(n + o, i + l);
        break;
      case "dash":
        e.moveTo(n, i), e.lineTo(n + Math.cos(v) * m, i + Math.sin(v) * m);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function fn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function Wa(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function qa(e) {
  e.restore();
}
function y0(e, t, n, i, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const r = (t.x + n.x) / 2;
    e.lineTo(r, t.y), e.lineTo(r, n.y);
  } else s === "after" != !!i ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function x0(e, t, n, i) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(i ? t.cp1x : t.cp2x, i ? t.cp1y : t.cp2y, i ? n.cp2x : n.cp1x, i ? n.cp2y : n.cp1y, n.x, n.y);
}
function k0(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), gt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function w0(e, t, n, i, s) {
  if (s.strikethrough || s.underline) {
    const r = e.measureText(i), o = t - r.actualBoundingBoxLeft, l = t + r.actualBoundingBoxRight, a = n - r.actualBoundingBoxAscent, c = n + r.actualBoundingBoxDescent, h = s.strikethrough ? (a + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(o, h), e.lineTo(l, h), e.stroke();
  }
}
function _0(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function or(e, t, n, i, s, r = {}) {
  const o = Dt(t) ? t : [
    t
  ], l = r.strokeWidth > 0 && r.strokeColor !== "";
  let a, c;
  for (e.save(), e.font = s.string, k0(e, r), a = 0; a < o.length; ++a)
    c = o[a], r.backdrop && _0(e, r.backdrop), l && (r.strokeColor && (e.strokeStyle = r.strokeColor), gt(r.strokeWidth) || (e.lineWidth = r.strokeWidth), e.strokeText(c, n, i, r.maxWidth)), e.fillText(c, n, i, r.maxWidth), w0(e, n, i, c, r), i += Number(s.lineHeight);
  e.restore();
}
function rr(e, t) {
  const { x: n, y: i, w: s, h: r, radius: o } = t;
  e.arc(n + o.topLeft, i + o.topLeft, o.topLeft, 1.5 * Rt, Rt, !0), e.lineTo(n, i + r - o.bottomLeft), e.arc(n + o.bottomLeft, i + r - o.bottomLeft, o.bottomLeft, Rt, Tt, !0), e.lineTo(n + s - o.bottomRight, i + r), e.arc(n + s - o.bottomRight, i + r - o.bottomRight, o.bottomRight, Tt, 0, !0), e.lineTo(n + s, i + o.topRight), e.arc(n + s - o.topRight, i + o.topRight, o.topRight, 0, -Tt, !0), e.lineTo(n + o.topLeft, i);
}
const M0 = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, C0 = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function S0(e, t) {
  const n = ("" + e).match(M0);
  if (!n || n[1] === "normal")
    return t * 1.2;
  switch (e = +n[2], n[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const E0 = (e) => +e || 0;
function Ga(e, t) {
  const n = {}, i = dt(t), s = i ? Object.keys(t) : t, r = dt(e) ? i ? (o) => mt(e[o], e[t[o]]) : (o) => e[o] : () => e;
  for (const o of s)
    n[o] = E0(r(o));
  return n;
}
function Xf(e) {
  return Ga(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ri(e) {
  return Ga(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function _e(e) {
  const t = Xf(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function ve(e, t) {
  e = e || {}, t = t || Lt.font;
  let n = mt(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let i = mt(e.style, t.style);
  i && !("" + i).match(C0) && (console.warn('Invalid font style specified: "' + i + '"'), i = void 0);
  const s = {
    family: mt(e.family, t.family),
    lineHeight: S0(mt(e.lineHeight, t.lineHeight), n),
    size: n,
    style: i,
    weight: mt(e.weight, t.weight),
    string: ""
  };
  return s.string = m0(s), s;
}
function so(e, t, n, i) {
  let s, r, o;
  for (s = 0, r = e.length; s < r; ++s)
    if (o = e[s], o !== void 0 && o !== void 0)
      return o;
}
function P0(e, t, n) {
  const { min: i, max: s } = e, r = $f(t, (s - i) / 2), o = (l, a) => n && l === 0 ? 0 : l + a;
  return {
    min: o(i, -Math.abs(r)),
    max: o(s, r)
  };
}
function Tn(e, t) {
  return Object.assign(Object.create(e), t);
}
function Ya(e, t = [
  ""
], n, i, s = () => e[0]) {
  const r = n || e;
  typeof i > "u" && (i = Qf("_fallback", e));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: r,
    _fallback: i,
    _getTarget: s,
    override: (l) => Ya([
      l,
      ...e
    ], t, r, i)
  };
  return new Proxy(o, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(l, a) {
      return delete l[a], delete l._keys, delete e[0][a], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(l, a) {
      return Jf(l, a, () => L0(a, t, e, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(l, a) {
      return Reflect.getOwnPropertyDescriptor(l._scopes[0], a);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(l, a) {
      return Ah(l).includes(a);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return Ah(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, a, c) {
      const h = l._storage || (l._storage = s());
      return l[a] = h[a] = c, delete l._keys, !0;
    }
  });
}
function Ti(e, t, n, i) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Kf(e, i),
    setContext: (r) => Ti(e, r, n, i),
    override: (r) => Ti(e.override(r), t, n, i)
  };
  return new Proxy(s, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(r, o) {
      return delete r[o], delete e[o], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(r, o, l) {
      return Jf(r, o, () => N0(r, o, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(r, o) {
      return r._descriptors.allKeys ? Reflect.has(e, o) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(e, o);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e);
    },
    /**
    * A trap for the in operator.
    */
    has(r, o) {
      return Reflect.has(e, o);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(e);
    },
    /**
    * A trap for setting property values.
    */
    set(r, o, l) {
      return e[o] = l, delete r[o], !0;
    }
  });
}
function Kf(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: i = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: i,
    isScriptable: Fn(n) ? n : () => n,
    isIndexable: Fn(i) ? i : () => i
  };
}
const D0 = (e, t) => e ? e + Va(t) : t, Ua = (e, t) => dt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Jf(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const i = n();
  return e[t] = i, i;
}
function N0(e, t, n) {
  const { _proxy: i, _context: s, _subProxy: r, _descriptors: o } = e;
  let l = i[t];
  return Fn(l) && o.isScriptable(t) && (l = O0(t, l, e, n)), Dt(l) && l.length && (l = R0(t, l, e, o.isIndexable)), Ua(t, l) && (l = Ti(l, s, r && r[t], o)), l;
}
function O0(e, t, n, i) {
  const { _proxy: s, _context: r, _subProxy: o, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let a = t(r, o || i);
  return l.delete(e), Ua(e, a) && (a = Xa(s._scopes, s, e, a)), a;
}
function R0(e, t, n, i) {
  const { _proxy: s, _context: r, _subProxy: o, _descriptors: l } = n;
  if (typeof r.index < "u" && i(e))
    return t[r.index % t.length];
  if (dt(t[0])) {
    const a = t, c = s._scopes.filter((h) => h !== a);
    t = [];
    for (const h of a) {
      const d = Xa(c, s, e, h);
      t.push(Ti(d, r, o && o[e], l));
    }
  }
  return t;
}
function Zf(e, t, n) {
  return Fn(e) ? e(t, n) : e;
}
const A0 = (e, t) => e === !0 ? t : typeof e == "string" ? An(t, e) : void 0;
function F0(e, t, n, i, s) {
  for (const r of t) {
    const o = A0(n, r);
    if (o) {
      e.add(o);
      const l = Zf(o._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== i)
        return l;
    } else if (o === !1 && typeof i < "u" && n !== i)
      return null;
  }
  return !1;
}
function Xa(e, t, n, i) {
  const s = t._rootScopes, r = Zf(t._fallback, n, i), o = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(i);
  let a = Rh(l, o, n, r || n, i);
  return a === null || typeof r < "u" && r !== n && (a = Rh(l, o, r, a, i), a === null) ? !1 : Ya(Array.from(l), [
    ""
  ], s, r, () => T0(t, n, i));
}
function Rh(e, t, n, i, s) {
  for (; n; )
    n = F0(e, t, n, i, s);
  return n;
}
function T0(e, t, n) {
  const i = e._getTarget();
  t in i || (i[t] = {});
  const s = i[t];
  return Dt(s) && dt(n) ? n : s || {};
}
function L0(e, t, n, i) {
  let s;
  for (const r of t)
    if (s = Qf(D0(r, e), n), typeof s < "u")
      return Ua(e, s) ? Xa(n, i, e, s) : s;
}
function Qf(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const i = n[e];
    if (typeof i < "u")
      return i;
  }
}
function Ah(e) {
  let t = e._keys;
  return t || (t = e._keys = I0(e._scopes)), t;
}
function I0(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const i of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(i);
  return Array.from(t);
}
function V0(e, t, n, i) {
  const { iScale: s } = e, { key: r = "r" } = this._parsing, o = new Array(i);
  let l, a, c, h;
  for (l = 0, a = i; l < a; ++l)
    c = l + n, h = t[c], o[l] = {
      r: s.parse(An(h, r), c)
    };
  return o;
}
const $0 = Number.EPSILON || 1e-14, Li = (e, t) => t < e.length && !e[t].skip && e[t], t1 = (e) => e === "x" ? "y" : "x";
function B0(e, t, n, i) {
  const s = e.skip ? t : e, r = t, o = n.skip ? t : n, l = ql(r, s), a = ql(o, r);
  let c = l / (l + a), h = a / (l + a);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const d = i * c, u = i * h;
  return {
    previous: {
      x: r.x - d * (o.x - s.x),
      y: r.y - d * (o.y - s.y)
    },
    next: {
      x: r.x + u * (o.x - s.x),
      y: r.y + u * (o.y - s.y)
    }
  };
}
function z0(e, t, n) {
  const i = e.length;
  let s, r, o, l, a, c = Li(e, 0);
  for (let h = 0; h < i - 1; ++h)
    if (a = c, c = Li(e, h + 1), !(!a || !c)) {
      if (ys(t[h], 0, $0)) {
        n[h] = n[h + 1] = 0;
        continue;
      }
      s = n[h] / t[h], r = n[h + 1] / t[h], l = Math.pow(s, 2) + Math.pow(r, 2), !(l <= 9) && (o = 3 / Math.sqrt(l), n[h] = s * o * t[h], n[h + 1] = r * o * t[h]);
    }
}
function H0(e, t, n = "x") {
  const i = t1(n), s = e.length;
  let r, o, l, a = Li(e, 0);
  for (let c = 0; c < s; ++c) {
    if (o = l, l = a, a = Li(e, c + 1), !l)
      continue;
    const h = l[n], d = l[i];
    o && (r = (h - o[n]) / 3, l[`cp1${n}`] = h - r, l[`cp1${i}`] = d - r * t[c]), a && (r = (a[n] - h) / 3, l[`cp2${n}`] = h + r, l[`cp2${i}`] = d + r * t[c]);
  }
}
function j0(e, t = "x") {
  const n = t1(t), i = e.length, s = Array(i).fill(0), r = Array(i);
  let o, l, a, c = Li(e, 0);
  for (o = 0; o < i; ++o)
    if (l = a, a = c, c = Li(e, o + 1), !!a) {
      if (c) {
        const h = c[t] - a[t];
        s[o] = h !== 0 ? (c[n] - a[n]) / h : 0;
      }
      r[o] = l ? c ? Ke(s[o - 1]) !== Ke(s[o]) ? 0 : (s[o - 1] + s[o]) / 2 : s[o - 1] : s[o];
    }
  z0(e, s, r), H0(e, r, t);
}
function oo(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function W0(e, t) {
  let n, i, s, r, o, l = fn(e[0], t);
  for (n = 0, i = e.length; n < i; ++n)
    o = r, r = l, l = n < i - 1 && fn(e[n + 1], t), r && (s = e[n], o && (s.cp1x = oo(s.cp1x, t.left, t.right), s.cp1y = oo(s.cp1y, t.top, t.bottom)), l && (s.cp2x = oo(s.cp2x, t.left, t.right), s.cp2y = oo(s.cp2y, t.top, t.bottom)));
}
function q0(e, t, n, i, s) {
  let r, o, l, a;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    j0(e, s);
  else {
    let c = i ? e[e.length - 1] : e[0];
    for (r = 0, o = e.length; r < o; ++r)
      l = e[r], a = B0(c, l, e[Math.min(r + 1, o - (i ? 0 : 1)) % o], t.tension), l.cp1x = a.previous.x, l.cp1y = a.previous.y, l.cp2x = a.next.x, l.cp2y = a.next.y, c = l;
  }
  t.capBezierPoints && W0(e, n);
}
function Ka() {
  return typeof window < "u" && typeof document < "u";
}
function Ja(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function lr(e, t, n) {
  let i;
  return typeof e == "string" ? (i = parseInt(e, 10), e.indexOf("%") !== -1 && (i = i / 100 * t.parentNode[n])) : i = e, i;
}
const Tr = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function G0(e, t) {
  return Tr(e).getPropertyValue(t);
}
const Y0 = [
  "top",
  "right",
  "bottom",
  "left"
];
function oi(e, t, n) {
  const i = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const r = Y0[s];
    i[r] = parseFloat(e[t + "-" + r + n]) || 0;
  }
  return i.width = i.left + i.right, i.height = i.top + i.bottom, i;
}
const U0 = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function X0(e, t) {
  const n = e.touches, i = n && n.length ? n[0] : e, { offsetX: s, offsetY: r } = i;
  let o = !1, l, a;
  if (U0(s, r, e.target))
    l = s, a = r;
  else {
    const c = t.getBoundingClientRect();
    l = i.clientX - c.left, a = i.clientY - c.top, o = !0;
  }
  return {
    x: l,
    y: a,
    box: o
  };
}
function Yn(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: i } = t, s = Tr(n), r = s.boxSizing === "border-box", o = oi(s, "padding"), l = oi(s, "border", "width"), { x: a, y: c, box: h } = X0(e, n), d = o.left + (h && l.left), u = o.top + (h && l.top);
  let { width: f, height: g } = t;
  return r && (f -= o.width + l.width, g -= o.height + l.height), {
    x: Math.round((a - d) / f * n.width / i),
    y: Math.round((c - u) / g * n.height / i)
  };
}
function K0(e, t, n) {
  let i, s;
  if (t === void 0 || n === void 0) {
    const r = e && Ja(e);
    if (!r)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const o = r.getBoundingClientRect(), l = Tr(r), a = oi(l, "border", "width"), c = oi(l, "padding");
      t = o.width - c.width - a.width, n = o.height - c.height - a.height, i = lr(l.maxWidth, r, "clientWidth"), s = lr(l.maxHeight, r, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: i || ir,
    maxHeight: s || ir
  };
}
const ro = (e) => Math.round(e * 10) / 10;
function J0(e, t, n, i) {
  const s = Tr(e), r = oi(s, "margin"), o = lr(s.maxWidth, e, "clientWidth") || ir, l = lr(s.maxHeight, e, "clientHeight") || ir, a = K0(e, t, n);
  let { width: c, height: h } = a;
  if (s.boxSizing === "content-box") {
    const u = oi(s, "border", "width"), f = oi(s, "padding");
    c -= f.width + u.width, h -= f.height + u.height;
  }
  return c = Math.max(0, c - r.width), h = Math.max(0, i ? c / i : h - r.height), c = ro(Math.min(c, o, a.maxWidth)), h = ro(Math.min(h, l, a.maxHeight)), c && !h && (h = ro(c / 2)), (t !== void 0 || n !== void 0) && i && a.height && h > a.height && (h = a.height, c = ro(Math.floor(h * i))), {
    width: c,
    height: h
  };
}
function Fh(e, t, n) {
  const i = t || 1, s = Math.floor(e.height * i), r = Math.floor(e.width * i);
  e.height = Math.floor(e.height), e.width = Math.floor(e.width);
  const o = e.canvas;
  return o.style && (n || !o.style.height && !o.style.width) && (o.style.height = `${e.height}px`, o.style.width = `${e.width}px`), e.currentDevicePixelRatio !== i || o.height !== s || o.width !== r ? (e.currentDevicePixelRatio = i, o.height = s, o.width = r, e.ctx.setTransform(i, 0, 0, i, 0, 0), !0) : !1;
}
const Z0 = function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Ka() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
}();
function Th(e, t) {
  const n = G0(e, t), i = n && n.match(/^(\d+)(\.\d+)?px$/);
  return i ? +i[1] : void 0;
}
function Un(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function Q0(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: i === "middle" ? n < 0.5 ? e.y : t.y : i === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function tv(e, t, n, i) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, r = {
    x: t.cp1x,
    y: t.cp1y
  }, o = Un(e, s, n), l = Un(s, r, n), a = Un(r, t, n), c = Un(o, l, n), h = Un(l, a, n);
  return Un(c, h, n);
}
const ev = function(e, t) {
  return {
    x(n) {
      return e + e + t - n;
    },
    setWidth(n) {
      t = n;
    },
    textAlign(n) {
      return n === "center" ? n : n === "right" ? "left" : "right";
    },
    xPlus(n, i) {
      return n - i;
    },
    leftForLtr(n, i) {
      return n - i;
    }
  };
}, nv = function() {
  return {
    x(e) {
      return e;
    },
    setWidth(e) {
    },
    textAlign(e) {
      return e;
    },
    xPlus(e, t) {
      return e + t;
    },
    leftForLtr(e, t) {
      return e;
    }
  };
};
function il(e, t, n) {
  return e ? ev(t, n) : nv();
}
function iv(e, t) {
  let n, i;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, i = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = i);
}
function sv(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function e1(e) {
  return e === "angle" ? {
    between: Ns,
    compare: t0,
    normalize: pe
  } : {
    between: Os,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Lh({ start: e, end: t, count: n, loop: i, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: i && (t - e + 1) % n === 0,
    style: s
  };
}
function ov(e, t, n) {
  const { property: i, start: s, end: r } = n, { between: o, normalize: l } = e1(i), a = t.length;
  let { start: c, end: h, loop: d } = e, u, f;
  if (d) {
    for (c += a, h += a, u = 0, f = a; u < f && o(l(t[c % a][i]), s, r); ++u)
      c--, h--;
    c %= a, h %= a;
  }
  return h < c && (h += a), {
    start: c,
    end: h,
    loop: d,
    style: e.style
  };
}
function n1(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: i, start: s, end: r } = n, o = t.length, { compare: l, between: a, normalize: c } = e1(i), { start: h, end: d, loop: u, style: f } = ov(e, t, n), g = [];
  let m = !1, v = null, b, _, S;
  const E = () => a(s, S, b) && l(s, S) !== 0, k = () => l(r, b) === 0 || a(r, S, b), N = () => m || E(), w = () => !m || k();
  for (let P = h, O = h; P <= d; ++P)
    _ = t[P % o], !_.skip && (b = c(_[i]), b !== S && (m = a(b, s, r), v === null && N() && (v = l(b, s) === 0 ? P : O), v !== null && w() && (g.push(Lh({
      start: v,
      end: P,
      loop: u,
      count: o,
      style: f
    })), v = null), O = P, S = b));
  return v !== null && g.push(Lh({
    start: v,
    end: d,
    loop: u,
    count: o,
    style: f
  })), g;
}
function i1(e, t) {
  const n = [], i = e.segments;
  for (let s = 0; s < i.length; s++) {
    const r = n1(i[s], e.points, t);
    r.length && n.push(...r);
  }
  return n;
}
function rv(e, t, n, i) {
  let s = 0, r = t - 1;
  if (n && !i)
    for (; s < t && !e[s].skip; )
      s++;
  for (; s < t && e[s].skip; )
    s++;
  for (s %= t, n && (r += s); r > s && e[r % t].skip; )
    r--;
  return r %= t, {
    start: s,
    end: r
  };
}
function lv(e, t, n, i) {
  const s = e.length, r = [];
  let o = t, l = e[t], a;
  for (a = t + 1; a <= n; ++a) {
    const c = e[a % s];
    c.skip || c.stop ? l.skip || (i = !1, r.push({
      start: t % s,
      end: (a - 1) % s,
      loop: i
    }), t = o = c.stop ? a : null) : (o = a, l.skip && (t = a)), l = c;
  }
  return o !== null && r.push({
    start: t % s,
    end: o % s,
    loop: i
  }), r;
}
function av(e, t) {
  const n = e.points, i = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const r = !!e._loop, { start: o, end: l } = rv(n, s, r, i);
  if (i === !0)
    return Ih(e, [
      {
        start: o,
        end: l,
        loop: r
      }
    ], n, t);
  const a = l < o ? l + s : l, c = !!e._fullLoop && o === 0 && l === s - 1;
  return Ih(e, lv(n, o, a, c), n, t);
}
function Ih(e, t, n, i) {
  return !i || !i.setContext || !n ? t : cv(e, t, n, i);
}
function cv(e, t, n, i) {
  const s = e._chart.getContext(), r = Vh(e.options), { _datasetIndex: o, options: { spanGaps: l } } = e, a = n.length, c = [];
  let h = r, d = t[0].start, u = d;
  function f(g, m, v, b) {
    const _ = l ? -1 : 1;
    if (g !== m) {
      for (g += a; n[g % a].skip; )
        g -= _;
      for (; n[m % a].skip; )
        m += _;
      g % a !== m % a && (c.push({
        start: g % a,
        end: m % a,
        loop: v,
        style: b
      }), h = b, d = m % a);
    }
  }
  for (const g of t) {
    d = l ? d : g.start;
    let m = n[d % a], v;
    for (u = d + 1; u <= g.end; u++) {
      const b = n[u % a];
      v = Vh(i.setContext(Tn(s, {
        type: "segment",
        p0: m,
        p1: b,
        p0DataIndex: (u - 1) % a,
        p1DataIndex: u % a,
        datasetIndex: o
      }))), hv(v, h) && f(d, u - 1, g.loop, h), m = b, h = v;
    }
    d < u - 1 && f(d, u - 1, g.loop, h);
  }
  return c;
}
function Vh(e) {
  return {
    backgroundColor: e.backgroundColor,
    borderCapStyle: e.borderCapStyle,
    borderDash: e.borderDash,
    borderDashOffset: e.borderDashOffset,
    borderJoinStyle: e.borderJoinStyle,
    borderWidth: e.borderWidth,
    borderColor: e.borderColor
  };
}
function hv(e, t) {
  if (!t)
    return !1;
  const n = [], i = function(s, r) {
    return za(r) ? (n.includes(r) || n.push(r), n.indexOf(r)) : r;
  };
  return JSON.stringify(e, i) !== JSON.stringify(t, i);
}
function lo(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function dv(e, t) {
  const { xScale: n, yScale: i } = e;
  return n && i ? {
    left: lo(n, t, "left"),
    right: lo(n, t, "right"),
    top: lo(i, t, "top"),
    bottom: lo(i, t, "bottom")
  } : t;
}
function s1(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const i = dv(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : i.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : i.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : i.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : i.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
/*!
 * Chart.js v4.4.9
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class uv {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, i, s) {
    const r = n.listeners[s], o = n.duration;
    r.forEach((l) => l({
      chart: t,
      initial: n.initial,
      numSteps: o,
      currentStep: Math.min(i - n.start, o)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = qf.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((i, s) => {
      if (!i.running || !i.items.length)
        return;
      const r = i.items;
      let o = r.length - 1, l = !1, a;
      for (; o >= 0; --o)
        a = r[o], a._active ? (a._total > i.duration && (i.duration = a._total), a.tick(t), l = !0) : (r[o] = r[r.length - 1], r.pop());
      l && (s.draw(), this._notify(s, i, t, "progress")), r.length || (i.running = !1, this._notify(s, i, t, "complete"), i.initial = !1), n += r.length;
    }), this._lastDate = t, n === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const n = this._charts;
    let i = n.get(t);
    return i || (i = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, n.set(t, i)), i;
  }
  listen(t, n, i) {
    this._getAnims(t).listeners[n].push(i);
  }
  add(t, n) {
    !n || !n.length || this._getAnims(t).items.push(...n);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const n = this._charts.get(t);
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((i, s) => Math.max(i, s._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const n = this._charts.get(t);
    return !(!n || !n.running || !n.items.length);
  }
  stop(t) {
    const n = this._charts.get(t);
    if (!n || !n.items.length)
      return;
    const i = n.items;
    let s = i.length - 1;
    for (; s >= 0; --s)
      i[s].cancel();
    n.items = [], this._notify(t, n, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var ln = /* @__PURE__ */ new uv();
const $h = "transparent", fv = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const i = Dh(e || $h), s = i.valid && Dh(t || $h);
    return s && s.valid ? s.mix(i, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class pv {
  constructor(t, n, i, s) {
    const r = n[i];
    s = so([
      t.to,
      s,
      r,
      t.from
    ]);
    const o = so([
      t.from,
      r,
      s
    ]);
    this._active = !0, this._fn = t.fn || fv[t.type || typeof o], this._easing = xs[t.easing] || xs.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = i, this._from = o, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, i) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], r = i - this._start, o = this._duration - r;
      this._start = i, this._duration = Math.floor(Math.max(o, t.duration)), this._total += r, this._loop = !!t.loop, this._to = so([
        t.to,
        n,
        s,
        t.from
      ]), this._from = so([
        t.from,
        s,
        n
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const n = t - this._start, i = this._duration, s = this._prop, r = this._from, o = this._loop, l = this._to;
    let a;
    if (this._active = r !== l && (o || n < i), !this._active) {
      this._target[s] = l, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[s] = r;
      return;
    }
    a = n / i % 2, a = o && a > 1 ? 2 - a : a, a = this._easing(Math.min(1, Math.max(0, a))), this._target[s] = this._fn(r, l, a);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((n, i) => {
      t.push({
        res: n,
        rej: i
      });
    });
  }
  _notify(t) {
    const n = t ? "res" : "rej", i = this._promises || [];
    for (let s = 0; s < i.length; s++)
      i[s][n]();
  }
}
class o1 {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!dt(t))
      return;
    const n = Object.keys(Lt.animation), i = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const r = t[s];
      if (!dt(r))
        return;
      const o = {};
      for (const l of n)
        o[l] = r[l];
      (Dt(r.properties) && r.properties || [
        s
      ]).forEach((l) => {
        (l === s || !i.has(l)) && i.set(l, o);
      });
    });
  }
  _animateOptions(t, n) {
    const i = n.options, s = mv(t, i);
    if (!s)
      return [];
    const r = this._createAnimations(s, i);
    return i.$shared && gv(t.options.$animations, i).then(() => {
      t.options = i;
    }, () => {
    }), r;
  }
  _createAnimations(t, n) {
    const i = this._properties, s = [], r = t.$animations || (t.$animations = {}), o = Object.keys(n), l = Date.now();
    let a;
    for (a = o.length - 1; a >= 0; --a) {
      const c = o[a];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        s.push(...this._animateOptions(t, n));
        continue;
      }
      const h = n[c];
      let d = r[c];
      const u = i.get(c);
      if (d)
        if (u && d.active()) {
          d.update(u, h, l);
          continue;
        } else
          d.cancel();
      if (!u || !u.duration) {
        t[c] = h;
        continue;
      }
      r[c] = d = new pv(u, t, c, h), s.push(d);
    }
    return s;
  }
  update(t, n) {
    if (this._properties.size === 0) {
      Object.assign(t, n);
      return;
    }
    const i = this._createAnimations(t, n);
    if (i.length)
      return ln.add(this._chart, i), !0;
  }
}
function gv(e, t) {
  const n = [], i = Object.keys(t);
  for (let s = 0; s < i.length; s++) {
    const r = e[i[s]];
    r && r.active() && n.push(r.wait());
  }
  return Promise.all(n);
}
function mv(e, t) {
  if (!t)
    return;
  let n = e.options;
  if (!n) {
    e.options = t;
    return;
  }
  return n.$shared && (e.options = n = Object.assign({}, n, {
    $shared: !1,
    $animations: {}
  })), n;
}
function Bh(e, t) {
  const n = e && e.options || {}, i = n.reverse, s = n.min === void 0 ? t : 0, r = n.max === void 0 ? t : 0;
  return {
    start: i ? r : s,
    end: i ? s : r
  };
}
function vv(e, t, n) {
  if (n === !1)
    return !1;
  const i = Bh(e, n), s = Bh(t, n);
  return {
    top: s.end,
    right: i.end,
    bottom: s.start,
    left: i.start
  };
}
function bv(e) {
  let t, n, i, s;
  return dt(e) ? (t = e.top, n = e.right, i = e.bottom, s = e.left) : t = n = i = s = e, {
    top: t,
    right: n,
    bottom: i,
    left: s,
    disabled: e === !1
  };
}
function r1(e, t) {
  const n = [], i = e._getSortedDatasetMetas(t);
  let s, r;
  for (s = 0, r = i.length; s < r; ++s)
    n.push(i[s].index);
  return n;
}
function zh(e, t, n, i = {}) {
  const s = e.keys, r = i.mode === "single";
  let o, l, a, c;
  if (t === null)
    return;
  let h = !1;
  for (o = 0, l = s.length; o < l; ++o) {
    if (a = +s[o], a === n) {
      if (h = !0, i.all)
        continue;
      break;
    }
    c = e.values[a], Gt(c) && (r || t === 0 || Ke(t) === Ke(c)) && (t += c);
  }
  return !h && !i.all ? 0 : t;
}
function yv(e, t) {
  const { iScale: n, vScale: i } = t, s = n.axis === "x" ? "x" : "y", r = i.axis === "x" ? "x" : "y", o = Object.keys(e), l = new Array(o.length);
  let a, c, h;
  for (a = 0, c = o.length; a < c; ++a)
    h = o[a], l[a] = {
      [s]: h,
      [r]: e[h]
    };
  return l;
}
function sl(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function xv(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function kv(e) {
  const { min: t, max: n, minDefined: i, maxDefined: s } = e.getUserBounds();
  return {
    min: i ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function wv(e, t, n) {
  const i = e[t] || (e[t] = {});
  return i[n] || (i[n] = {});
}
function Hh(e, t, n, i) {
  for (const s of t.getMatchingVisibleMetas(i).reverse()) {
    const r = e[s.index];
    if (n && r > 0 || !n && r < 0)
      return s.index;
  }
  return null;
}
function jh(e, t) {
  const { chart: n, _cachedMeta: i } = e, s = n._stacks || (n._stacks = {}), { iScale: r, vScale: o, index: l } = i, a = r.axis, c = o.axis, h = xv(r, o, i), d = t.length;
  let u;
  for (let f = 0; f < d; ++f) {
    const g = t[f], { [a]: m, [c]: v } = g, b = g._stacks || (g._stacks = {});
    u = b[c] = wv(s, h, m), u[l] = v, u._top = Hh(u, o, !0, i.type), u._bottom = Hh(u, o, !1, i.type);
    const _ = u._visualValues || (u._visualValues = {});
    _[l] = v;
  }
}
function ol(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((i) => n[i].axis === t).shift();
}
function _v(e, t) {
  return Tn(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Mv(e, t, n) {
  return Tn(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: n,
    index: t,
    mode: "default",
    type: "data"
  });
}
function Qi(e, t) {
  const n = e.controller.index, i = e.vScale && e.vScale.axis;
  if (i) {
    t = t || e._parsed;
    for (const s of t) {
      const r = s._stacks;
      if (!r || r[i] === void 0 || r[i][n] === void 0)
        return;
      delete r[i][n], r[i]._visualValues !== void 0 && r[i]._visualValues[n] !== void 0 && delete r[i]._visualValues[n];
    }
  }
}
const rl = (e) => e === "reset" || e === "none", Wh = (e, t) => t ? e : Object.assign({}, e), Cv = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: r1(n, !0),
  values: null
};
class mn {
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = sl(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Qi(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, i = this.getDataset(), s = (d, u, f, g) => d === "x" ? u : d === "r" ? g : f, r = n.xAxisID = mt(i.xAxisID, ol(t, "x")), o = n.yAxisID = mt(i.yAxisID, ol(t, "y")), l = n.rAxisID = mt(i.rAxisID, ol(t, "r")), a = n.indexAxis, c = n.iAxisID = s(a, r, o, l), h = n.vAxisID = s(a, o, r, l);
    n.xScale = this.getScaleForId(r), n.yScale = this.getScaleForId(o), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const n = this._cachedMeta;
    return t === n.iScale ? n.vScale : n.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && Ch(this._data, this), t._stacked && Qi(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), i = this._data;
    if (dt(n)) {
      const s = this._cachedMeta;
      this._data = yv(n, s);
    } else if (i !== n) {
      if (i) {
        Ch(i, this);
        const s = this._cachedMeta;
        Qi(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && s0(n, this), this._syncList = [], this._data = n;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const n = this._cachedMeta, i = this.getDataset();
    let s = !1;
    this._dataCheck();
    const r = n._stacked;
    n._stacked = sl(n.vScale, n), n.stack !== i.stack && (s = !0, Qi(n), n.stack = i.stack), this._resyncElements(t), (s || r !== n._stacked) && (jh(this, n._parsed), n._stacked = sl(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), i = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(i, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: i, _data: s } = this, { iScale: r, _stacked: o } = i, l = r.axis;
    let a = t === 0 && n === s.length ? !0 : i._sorted, c = t > 0 && i._parsed[t - 1], h, d, u;
    if (this._parsing === !1)
      i._parsed = s, i._sorted = !0, u = s;
    else {
      Dt(s[t]) ? u = this.parseArrayData(i, s, t, n) : dt(s[t]) ? u = this.parseObjectData(i, s, t, n) : u = this.parsePrimitiveData(i, s, t, n);
      const f = () => d[l] === null || c && d[l] < c[l];
      for (h = 0; h < n; ++h)
        i._parsed[h + t] = d = u[h], a && (f() && (a = !1), c = d);
      i._sorted = a;
    }
    o && jh(this, u);
  }
  parsePrimitiveData(t, n, i, s) {
    const { iScale: r, vScale: o } = t, l = r.axis, a = o.axis, c = r.getLabels(), h = r === o, d = new Array(s);
    let u, f, g;
    for (u = 0, f = s; u < f; ++u)
      g = u + i, d[u] = {
        [l]: h || r.parse(c[g], g),
        [a]: o.parse(n[g], g)
      };
    return d;
  }
  parseArrayData(t, n, i, s) {
    const { xScale: r, yScale: o } = t, l = new Array(s);
    let a, c, h, d;
    for (a = 0, c = s; a < c; ++a)
      h = a + i, d = n[h], l[a] = {
        x: r.parse(d[0], h),
        y: o.parse(d[1], h)
      };
    return l;
  }
  parseObjectData(t, n, i, s) {
    const { xScale: r, yScale: o } = t, { xAxisKey: l = "x", yAxisKey: a = "y" } = this._parsing, c = new Array(s);
    let h, d, u, f;
    for (h = 0, d = s; h < d; ++h)
      u = h + i, f = n[u], c[h] = {
        x: r.parse(An(f, l), u),
        y: o.parse(An(f, a), u)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, n, i) {
    const s = this.chart, r = this._cachedMeta, o = n[t.axis], l = {
      keys: r1(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return zh(l, o, r.index, {
      mode: i
    });
  }
  updateRangeFromParsed(t, n, i, s) {
    const r = i[n.axis];
    let o = r === null ? NaN : r;
    const l = s && i._stacks[n.axis];
    s && l && (s.values = l, o = zh(s, r, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o);
  }
  getMinMax(t, n) {
    const i = this._cachedMeta, s = i._parsed, r = i._sorted && t === i.iScale, o = s.length, l = this._getOtherScale(t), a = Cv(n, i, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: d } = kv(l);
    let u, f;
    function g() {
      f = s[u];
      const m = f[l.axis];
      return !Gt(f[t.axis]) || h > m || d < m;
    }
    for (u = 0; u < o && !(!g() && (this.updateRangeFromParsed(c, t, f, a), r)); ++u)
      ;
    if (r) {
      for (u = o - 1; u >= 0; --u)
        if (!g()) {
          this.updateRangeFromParsed(c, t, f, a);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, i = [];
    let s, r, o;
    for (s = 0, r = n.length; s < r; ++s)
      o = n[s][t.axis], Gt(o) && i.push(o);
    return i;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, i = n.iScale, s = n.vScale, r = this.getParsed(t);
    return {
      label: i ? "" + i.getLabelForValue(r[i.axis]) : "",
      value: s ? "" + s.getLabelForValue(r[s.axis]) : ""
    };
  }
  _update(t) {
    const n = this._cachedMeta;
    this.update(t || "default"), n._clip = bv(mt(this.options.clip, vv(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, i = this._cachedMeta, s = i.data || [], r = n.chartArea, o = [], l = this._drawStart || 0, a = this._drawCount || s.length - l, c = this.options.drawActiveElementsOnTop;
    let h;
    for (i.dataset && i.dataset.draw(t, r, l, a), h = l; h < l + a; ++h) {
      const d = s[h];
      d.hidden || (d.active && c ? o.push(d) : d.draw(t, r));
    }
    for (h = 0; h < o.length; ++h)
      o[h].draw(t, r);
  }
  getStyle(t, n) {
    const i = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(t || 0, i);
  }
  getContext(t, n, i) {
    const s = this.getDataset();
    let r;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[t];
      r = o.$context || (o.$context = Mv(this.getContext(), t, o)), r.parsed = this.getParsed(t), r.raw = s.data[t], r.index = r.dataIndex = t;
    } else
      r = this.$context || (this.$context = _v(this.chart.getContext(), this.index)), r.dataset = s, r.index = r.datasetIndex = this.index;
    return r.active = !!n, r.mode = i, r;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", i) {
    const s = n === "active", r = this._cachedDataOpts, o = t + "-" + n, l = r[o], a = this.enableOptionSharing && Ds(i);
    if (l)
      return Wh(l, a);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, t), d = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], u = c.getOptionScopes(this.getDataset(), h), f = Object.keys(Lt.elements[t]), g = () => this.getContext(i, s, n), m = c.resolveNamedOptions(u, f, g, d);
    return m.$shared && (m.$shared = a, r[o] = Object.freeze(Wh(m, a))), m;
  }
  _resolveAnimations(t, n, i) {
    const s = this.chart, r = this._cachedDataOpts, o = `animation-${n}`, l = r[o];
    if (l)
      return l;
    let a;
    if (s.options.animation !== !1) {
      const h = this.chart.config, d = h.datasetAnimationScopeKeys(this._type, n), u = h.getOptionScopes(this.getDataset(), d);
      a = h.createResolver(u, this.getContext(t, i, n));
    }
    const c = new o1(s, a && a.animations);
    return a && a._cacheable && (r[o] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || rl(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const i = this.resolveDataElementOptions(t, n), s = this._sharedOptions, r = this.getSharedOptions(i), o = this.includeOptions(n, r) || r !== s;
    return this.updateSharedOptions(r, n, i), {
      sharedOptions: r,
      includeOptions: o
    };
  }
  updateElement(t, n, i, s) {
    rl(s) ? Object.assign(t, i) : this._resolveAnimations(n, s).update(t, i);
  }
  updateSharedOptions(t, n, i) {
    t && !rl(n) && this._resolveAnimations(void 0, n).update(t, i);
  }
  _setStyle(t, n, i, s) {
    t.active = s;
    const r = this.getStyle(n, s);
    this._resolveAnimations(n, i, s).update(t, {
      options: !s && this.getSharedOptions(r) || r
    });
  }
  removeHoverStyle(t, n, i) {
    this._setStyle(t, i, "active", !1);
  }
  setHoverStyle(t, n, i) {
    this._setStyle(t, i, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const n = this._data, i = this._cachedMeta.data;
    for (const [l, a, c] of this._syncList)
      this[l](a, c);
    this._syncList = [];
    const s = i.length, r = n.length, o = Math.min(r, s);
    o && this.parse(0, o), r > s ? this._insertElements(s, r - s, t) : r < s && this._removeElements(r, s - r);
  }
  _insertElements(t, n, i = !0) {
    const s = this._cachedMeta, r = s.data, o = t + n;
    let l;
    const a = (c) => {
      for (c.length += n, l = c.length - 1; l >= o; l--)
        c[l] = c[l - n];
    };
    for (a(r), l = t; l < o; ++l)
      r[l] = new this.dataElementType();
    this._parsing && a(s._parsed), this.parse(t, n), i && this.updateElements(r, t, n, "reset");
  }
  updateElements(t, n, i, s) {
  }
  _removeElements(t, n) {
    const i = this._cachedMeta;
    if (this._parsing) {
      const s = i._parsed.splice(t, n);
      i._stacked && Qi(i, s);
    }
    i.data.splice(t, n);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [n, i, s] = t;
      this[n](i, s);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, n) {
    n && this._sync([
      "_removeElements",
      t,
      n
    ]);
    const i = arguments.length - 2;
    i && this._sync([
      "_insertElements",
      t,
      i
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
Y(mn, "defaults", {}), Y(mn, "datasetElementType", null), Y(mn, "dataElementType", null);
function Sv(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let i = [];
    for (let s = 0, r = n.length; s < r; s++)
      i = i.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = Wf(i.sort((s, r) => s - r));
  }
  return e._cache.$bar;
}
function Ev(e) {
  const t = e.iScale, n = Sv(t, e.type);
  let i = t._length, s, r, o, l;
  const a = () => {
    o === 32767 || o === -32768 || (Ds(l) && (i = Math.min(i, Math.abs(o - l) || i)), l = o);
  };
  for (s = 0, r = n.length; s < r; ++s)
    o = t.getPixelForValue(n[s]), a();
  for (l = void 0, s = 0, r = t.ticks.length; s < r; ++s)
    o = t.getPixelForTick(s), a();
  return i;
}
function Pv(e, t, n, i) {
  const s = n.barThickness;
  let r, o;
  return gt(s) ? (r = t.min * n.categoryPercentage, o = n.barPercentage) : (r = s * i, o = 1), {
    chunk: r / i,
    ratio: o,
    start: t.pixels[e] - r / 2
  };
}
function Dv(e, t, n, i) {
  const s = t.pixels, r = s[e];
  let o = e > 0 ? s[e - 1] : null, l = e < s.length - 1 ? s[e + 1] : null;
  const a = n.categoryPercentage;
  o === null && (o = r - (l === null ? t.end - t.start : l - r)), l === null && (l = r + r - o);
  const c = r - (r - Math.min(o, l)) / 2 * a;
  return {
    chunk: Math.abs(l - o) / 2 * a / i,
    ratio: n.barPercentage,
    start: c
  };
}
function Nv(e, t, n, i) {
  const s = n.parse(e[0], i), r = n.parse(e[1], i), o = Math.min(s, r), l = Math.max(s, r);
  let a = o, c = l;
  Math.abs(o) > Math.abs(l) && (a = l, c = o), t[n.axis] = c, t._custom = {
    barStart: a,
    barEnd: c,
    start: s,
    end: r,
    min: o,
    max: l
  };
}
function l1(e, t, n, i) {
  return Dt(e) ? Nv(e, t, n, i) : t[n.axis] = n.parse(e, i), t;
}
function qh(e, t, n, i) {
  const s = e.iScale, r = e.vScale, o = s.getLabels(), l = s === r, a = [];
  let c, h, d, u;
  for (c = n, h = n + i; c < h; ++c)
    u = t[c], d = {}, d[s.axis] = l || s.parse(o[c], c), a.push(l1(u, d, r, c));
  return a;
}
function ll(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Ov(e, t, n) {
  return e !== 0 ? Ke(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Rv(e) {
  let t, n, i, s, r;
  return e.horizontal ? (t = e.base > e.x, n = "left", i = "right") : (t = e.base < e.y, n = "bottom", i = "top"), t ? (s = "end", r = "start") : (s = "start", r = "end"), {
    start: n,
    end: i,
    reverse: t,
    top: s,
    bottom: r
  };
}
function Av(e, t, n, i) {
  let s = t.borderSkipped;
  const r = {};
  if (!s) {
    e.borderSkipped = r;
    return;
  }
  if (s === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: o, end: l, reverse: a, top: c, bottom: h } = Rv(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === i ? s = c : (n._bottom || 0) === i ? s = h : (r[Gh(h, o, l, a)] = !0, s = c)), r[Gh(s, o, l, a)] = !0, e.borderSkipped = r;
}
function Gh(e, t, n, i) {
  return i ? (e = Fv(e, t, n), e = Yh(e, n, t)) : e = Yh(e, t, n), e;
}
function Fv(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function Yh(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Tv(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Ro extends mn {
  parsePrimitiveData(t, n, i, s) {
    return qh(t, n, i, s);
  }
  parseArrayData(t, n, i, s) {
    return qh(t, n, i, s);
  }
  parseObjectData(t, n, i, s) {
    const { iScale: r, vScale: o } = t, { xAxisKey: l = "x", yAxisKey: a = "y" } = this._parsing, c = r.axis === "x" ? l : a, h = o.axis === "x" ? l : a, d = [];
    let u, f, g, m;
    for (u = i, f = i + s; u < f; ++u)
      m = n[u], g = {}, g[r.axis] = r.parse(An(m, c), u), d.push(l1(An(m, h), g, o, u));
    return d;
  }
  updateRangeFromParsed(t, n, i, s) {
    super.updateRangeFromParsed(t, n, i, s);
    const r = i._custom;
    r && n === this._cachedMeta.vScale && (t.min = Math.min(t.min, r.min), t.max = Math.max(t.max, r.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, { iScale: i, vScale: s } = n, r = this.getParsed(t), o = r._custom, l = ll(o) ? "[" + o.start + ", " + o.end + "]" : "" + s.getLabelForValue(r[s.axis]);
    return {
      label: "" + i.getLabelForValue(r[i.axis]),
      value: l
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const n = this._cachedMeta;
    this.updateElements(n.data, 0, n.data.length, t);
  }
  updateElements(t, n, i, s) {
    const r = s === "reset", { index: o, _cachedMeta: { vScale: l } } = this, a = l.getBasePixel(), c = l.isHorizontal(), h = this._getRuler(), { sharedOptions: d, includeOptions: u } = this._getSharedOptions(n, s);
    for (let f = n; f < n + i; f++) {
      const g = this.getParsed(f), m = r || gt(g[l.axis]) ? {
        base: a,
        head: a
      } : this._calculateBarValuePixels(f), v = this._calculateBarIndexPixels(f, h), b = (g._stacks || {})[l.axis], _ = {
        horizontal: c,
        base: m.base,
        enableBorderRadius: !b || ll(g._custom) || o === b._top || o === b._bottom,
        x: c ? m.head : v.center,
        y: c ? v.center : m.head,
        height: c ? v.size : Math.abs(m.size),
        width: c ? Math.abs(m.size) : v.size
      };
      u && (_.options = d || this.resolveDataElementOptions(f, t[f].active ? "active" : s));
      const S = _.options || t[f].options;
      Av(_, S, b, o), Tv(_, S, h.ratio), this.updateElement(t[f], f, _, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: i } = this._cachedMeta, s = i.getMatchingVisibleMetas(this._type).filter((h) => h.controller.options.grouped), r = i.options.stacked, o = [], l = this._cachedMeta.controller.getParsed(n), a = l && l[i.axis], c = (h) => {
      const d = h._parsed.find((f) => f[i.axis] === a), u = d && d[h.vScale.axis];
      if (gt(u) || isNaN(u))
        return !0;
    };
    for (const h of s)
      if (!(n !== void 0 && c(h)) && ((r === !1 || o.indexOf(h.stack) === -1 || r === void 0 && h.stack === void 0) && o.push(h.stack), h.index === t))
        break;
    return o.length || o.push(void 0), o;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getStackIndex(t, n, i) {
    const s = this._getStacks(t, i), r = n !== void 0 ? s.indexOf(n) : -1;
    return r === -1 ? s.length - 1 : r;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, i = n.iScale, s = [];
    let r, o;
    for (r = 0, o = n.data.length; r < o; ++r)
      s.push(i.getPixelForValue(this.getParsed(r)[i.axis], r));
    const l = t.barThickness;
    return {
      min: l || Ev(n),
      pixels: s,
      start: i._startPixel,
      end: i._endPixel,
      stackCount: this._getStackCount(),
      scale: i,
      grouped: t.grouped,
      ratio: l ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: n, _stacked: i, index: s }, options: { base: r, minBarLength: o } } = this, l = r || 0, a = this.getParsed(t), c = a._custom, h = ll(c);
    let d = a[n.axis], u = 0, f = i ? this.applyStack(n, a, i) : d, g, m;
    f !== d && (u = f - d, f = d), h && (d = c.barStart, f = c.barEnd - c.barStart, d !== 0 && Ke(d) !== Ke(c.barEnd) && (u = 0), u += d);
    const v = !gt(r) && !h ? r : u;
    let b = n.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? g = n.getPixelForValue(u + f) : g = b, m = g - b, Math.abs(m) < o) {
      m = Ov(m, n, l) * o, d === l && (b -= m / 2);
      const _ = n.getPixelForDecimal(0), S = n.getPixelForDecimal(1), E = Math.min(_, S), k = Math.max(_, S);
      b = Math.max(Math.min(b, k), E), g = b + m, i && !h && (a._stacks[n.axis]._visualValues[s] = n.getValueForPixel(g) - n.getValueForPixel(b));
    }
    if (b === n.getPixelForValue(l)) {
      const _ = Ke(m) * n.getLineWidthForValue(l) / 2;
      b += _, m -= _;
    }
    return {
      size: m,
      base: b,
      head: g,
      center: g + m / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const i = n.scale, s = this.options, r = s.skipNull, o = mt(s.maxBarThickness, 1 / 0);
    let l, a;
    if (n.grouped) {
      const c = r ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? Dv(t, n, s, c) : Pv(t, n, s, c), d = this._getStackIndex(this.index, this._cachedMeta.stack, r ? t : void 0);
      l = h.start + h.chunk * d + h.chunk / 2, a = Math.min(o, h.chunk * h.ratio);
    } else
      l = i.getPixelForValue(this.getParsed(t)[i.axis], t), a = Math.min(o, n.min * n.ratio);
    return {
      base: l - a / 2,
      head: l + a / 2,
      center: l,
      size: a
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, i = t.data, s = i.length;
    let r = 0;
    for (; r < s; ++r)
      this.getParsed(r)[n.axis] !== null && !i[r].hidden && i[r].draw(this._ctx);
  }
}
Y(Ro, "id", "bar"), Y(Ro, "defaults", {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
}), Y(Ro, "overrides", {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
});
function Lv(e, t, n) {
  let i = 1, s = 1, r = 0, o = 0;
  if (t < Pt) {
    const l = e, a = l + t, c = Math.cos(l), h = Math.sin(l), d = Math.cos(a), u = Math.sin(a), f = (S, E, k) => Ns(S, l, a, !0) ? 1 : Math.max(E, E * n, k, k * n), g = (S, E, k) => Ns(S, l, a, !0) ? -1 : Math.min(E, E * n, k, k * n), m = f(0, c, d), v = f(Tt, h, u), b = g(Rt, c, d), _ = g(Rt + Tt, h, u);
    i = (m - b) / 2, s = (v - _) / 2, r = -(m + b) / 2, o = -(v + _) / 2;
  }
  return {
    ratioX: i,
    ratioY: s,
    offsetX: r,
    offsetY: o
  };
}
class Ei extends mn {
  constructor(t, n) {
    super(t, n), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, n) {
    const i = this.getDataset().data, s = this._cachedMeta;
    if (this._parsing === !1)
      s._parsed = i;
    else {
      let r = (a) => +i[a];
      if (dt(i[t])) {
        const { key: a = "value" } = this._parsing;
        r = (c) => +An(i[c], a);
      }
      let o, l;
      for (o = t, l = t + n; o < l; ++o)
        s._parsed[o] = r(o);
    }
  }
  _getRotation() {
    return Xe(this.options.rotation - 90);
  }
  _getCircumference() {
    return Xe(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Pt, n = -Pt;
    for (let i = 0; i < this.chart.data.datasets.length; ++i)
      if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
        const s = this.chart.getDatasetMeta(i).controller, r = s._getRotation(), o = s._getCircumference();
        t = Math.min(t, r), n = Math.max(n, r + o);
      }
    return {
      rotation: t,
      circumference: n - t
    };
  }
  update(t) {
    const n = this.chart, { chartArea: i } = n, s = this._cachedMeta, r = s.data, o = this.getMaxBorderWidth() + this.getMaxOffset(r) + this.options.spacing, l = Math.max((Math.min(i.width, i.height) - o) / 2, 0), a = Math.min(Hm(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: d } = this._getRotationExtents(), { ratioX: u, ratioY: f, offsetX: g, offsetY: m } = Lv(d, h, a), v = (i.width - o) / u, b = (i.height - o) / f, _ = Math.max(Math.min(v, b) / 2, 0), S = $f(this.options.radius, _), E = Math.max(S * a, 0), k = (S - E) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * S, this.offsetY = m * S, s.total = this.calculateTotal(), this.outerRadius = S - k * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - k * c, 0), this.updateElements(r, 0, r.length, t);
  }
  _circumference(t, n) {
    const i = this.options, s = this._cachedMeta, r = this._getCircumference();
    return n && i.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * r / Pt);
  }
  updateElements(t, n, i, s) {
    const r = s === "reset", o = this.chart, l = o.chartArea, c = o.options.animation, h = (l.left + l.right) / 2, d = (l.top + l.bottom) / 2, u = r && c.animateScale, f = u ? 0 : this.innerRadius, g = u ? 0 : this.outerRadius, { sharedOptions: m, includeOptions: v } = this._getSharedOptions(n, s);
    let b = this._getRotation(), _;
    for (_ = 0; _ < n; ++_)
      b += this._circumference(_, r);
    for (_ = n; _ < n + i; ++_) {
      const S = this._circumference(_, r), E = t[_], k = {
        x: h + this.offsetX,
        y: d + this.offsetY,
        startAngle: b,
        endAngle: b + S,
        circumference: S,
        outerRadius: g,
        innerRadius: f
      };
      v && (k.options = m || this.resolveDataElementOptions(_, E.active ? "active" : s)), b += S, this.updateElement(E, _, k, s);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, n = t.data;
    let i = 0, s;
    for (s = 0; s < n.length; s++) {
      const r = t._parsed[s];
      r !== null && !isNaN(r) && this.chart.getDataVisibility(s) && !n[s].hidden && (i += Math.abs(r));
    }
    return i;
  }
  calculateCircumference(t) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(t) ? Pt * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, i = this.chart, s = i.data.labels || [], r = Ha(n._parsed[t], i.options.locale);
    return {
      label: s[t] || "",
      value: r
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const i = this.chart;
    let s, r, o, l, a;
    if (!t) {
      for (s = 0, r = i.data.datasets.length; s < r; ++s)
        if (i.isDatasetVisible(s)) {
          o = i.getDatasetMeta(s), t = o.data, l = o.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (s = 0, r = t.length; s < r; ++s)
      a = l.resolveDataElementOptions(s), a.borderAlign !== "inner" && (n = Math.max(n, a.borderWidth || 0, a.hoverBorderWidth || 0));
    return n;
  }
  getMaxOffset(t) {
    let n = 0;
    for (let i = 0, s = t.length; i < s; ++i) {
      const r = this.resolveDataElementOptions(i);
      n = Math.max(n, r.offset || 0, r.hoverOffset || 0);
    }
    return n;
  }
  _getRingWeightOffset(t) {
    let n = 0;
    for (let i = 0; i < t; ++i)
      this.chart.isDatasetVisible(i) && (n += this._getRingWeight(i));
    return n;
  }
  _getRingWeight(t) {
    return Math.max(mt(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
Y(Ei, "id", "doughnut"), Y(Ei, "defaults", {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing"
      ]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
}), Y(Ei, "descriptors", {
  _scriptable: (t) => t !== "spacing",
  _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), Y(Ei, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const n = t.data;
          if (n.labels.length && n.datasets.length) {
            const { labels: { pointStyle: i, color: s } } = t.legend.options;
            return n.labels.map((r, o) => {
              const a = t.getDatasetMeta(0).controller.getStyle(o);
              return {
                text: r,
                fillStyle: a.backgroundColor,
                strokeStyle: a.borderColor,
                fontColor: s,
                lineWidth: a.borderWidth,
                pointStyle: i,
                hidden: !t.getDataVisibility(o),
                index: o
              };
            });
          }
          return [];
        }
      },
      onClick(t, n, i) {
        i.chart.toggleDataVisibility(n.index), i.chart.update();
      }
    }
  }
});
class ws extends mn {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const n = this._cachedMeta, { dataset: i, data: s = [], _dataset: r } = n, o = this.chart._animationsDisabled;
    let { start: l, count: a } = Yf(n, s, o);
    this._drawStart = l, this._drawCount = a, Uf(n) && (l = 0, a = s.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!r._decimated, i.points = s;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(i, void 0, {
      animated: !o,
      options: c
    }, t), this.updateElements(s, l, a, t);
  }
  updateElements(t, n, i, s) {
    const r = s === "reset", { iScale: o, vScale: l, _stacked: a, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: d } = this._getSharedOptions(n, s), u = o.axis, f = l.axis, { spanGaps: g, segment: m } = this.options, v = Fi(g) ? g : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || r || s === "none", _ = n + i, S = t.length;
    let E = n > 0 && this.getParsed(n - 1);
    for (let k = 0; k < S; ++k) {
      const N = t[k], w = b ? N : {};
      if (k < n || k >= _) {
        w.skip = !0;
        continue;
      }
      const P = this.getParsed(k), O = gt(P[f]), F = w[u] = o.getPixelForValue(P[u], k), R = w[f] = r || O ? l.getBasePixel() : l.getPixelForValue(a ? this.applyStack(l, P, a) : P[f], k);
      w.skip = isNaN(F) || isNaN(R) || O, w.stop = k > 0 && Math.abs(P[u] - E[u]) > v, m && (w.parsed = P, w.raw = c.data[k]), d && (w.options = h || this.resolveDataElementOptions(k, N.active ? "active" : s)), b || this.updateElement(N, k, w, s), E = P;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, i = n.options && n.options.borderWidth || 0, s = t.data || [];
    if (!s.length)
      return i;
    const r = s[0].size(this.resolveDataElementOptions(0)), o = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(i, r, o) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
Y(ws, "id", "line"), Y(ws, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), Y(ws, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class Ul extends Ei {
}
Y(Ul, "id", "pie"), Y(Ul, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class Ao extends mn {
  getLabelAndValue(t) {
    const n = this._cachedMeta.vScale, i = this.getParsed(t);
    return {
      label: n.getLabels()[t],
      value: "" + n.getLabelForValue(i[n.axis])
    };
  }
  parseObjectData(t, n, i, s) {
    return V0.bind(this)(t, n, i, s);
  }
  update(t) {
    const n = this._cachedMeta, i = n.dataset, s = n.data || [], r = n.iScale.getLabels();
    if (i.points = s, t !== "resize") {
      const o = this.resolveDatasetElementOptions(t);
      this.options.showLine || (o.borderWidth = 0);
      const l = {
        _loop: !0,
        _fullLoop: r.length === s.length,
        options: o
      };
      this.updateElement(i, void 0, l, t);
    }
    this.updateElements(s, 0, s.length, t);
  }
  updateElements(t, n, i, s) {
    const r = this._cachedMeta.rScale, o = s === "reset";
    for (let l = n; l < n + i; l++) {
      const a = t[l], c = this.resolveDataElementOptions(l, a.active ? "active" : s), h = r.getPointPositionForValue(l, this.getParsed(l).r), d = o ? r.xCenter : h.x, u = o ? r.yCenter : h.y, f = {
        x: d,
        y: u,
        angle: h.angle,
        skip: isNaN(d) || isNaN(u),
        options: c
      };
      this.updateElement(a, l, f, s);
    }
  }
}
Y(Ao, "id", "radar"), Y(Ao, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), Y(Ao, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class Fo extends mn {
  getLabelAndValue(t) {
    const n = this._cachedMeta, i = this.chart.data.labels || [], { xScale: s, yScale: r } = n, o = this.getParsed(t), l = s.getLabelForValue(o.x), a = r.getLabelForValue(o.y);
    return {
      label: i[t] || "",
      value: "(" + l + ", " + a + ")"
    };
  }
  update(t) {
    const n = this._cachedMeta, { data: i = [] } = n, s = this.chart._animationsDisabled;
    let { start: r, count: o } = Yf(n, i, s);
    if (this._drawStart = r, this._drawCount = o, Uf(n) && (r = 0, o = i.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: l, _dataset: a } = n;
      l._chart = this.chart, l._datasetIndex = this.index, l._decimated = !!a._decimated, l.points = i;
      const c = this.resolveDatasetElementOptions(t);
      c.segment = this.options.segment, this.updateElement(l, void 0, {
        animated: !s,
        options: c
      }, t);
    } else this.datasetElementType && (delete n.dataset, this.datasetElementType = !1);
    this.updateElements(i, r, o, t);
  }
  addElements() {
    const { showLine: t } = this.options;
    !this.datasetElementType && t && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(t, n, i, s) {
    const r = s === "reset", { iScale: o, vScale: l, _stacked: a, _dataset: c } = this._cachedMeta, h = this.resolveDataElementOptions(n, s), d = this.getSharedOptions(h), u = this.includeOptions(s, d), f = o.axis, g = l.axis, { spanGaps: m, segment: v } = this.options, b = Fi(m) ? m : Number.POSITIVE_INFINITY, _ = this.chart._animationsDisabled || r || s === "none";
    let S = n > 0 && this.getParsed(n - 1);
    for (let E = n; E < n + i; ++E) {
      const k = t[E], N = this.getParsed(E), w = _ ? k : {}, P = gt(N[g]), O = w[f] = o.getPixelForValue(N[f], E), F = w[g] = r || P ? l.getBasePixel() : l.getPixelForValue(a ? this.applyStack(l, N, a) : N[g], E);
      w.skip = isNaN(O) || isNaN(F) || P, w.stop = E > 0 && Math.abs(N[f] - S[f]) > b, v && (w.parsed = N, w.raw = c.data[E]), u && (w.options = d || this.resolveDataElementOptions(E, k.active ? "active" : s)), _ || this.updateElement(k, E, w, s), S = N;
    }
    this.updateSharedOptions(d, s, h);
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.data || [];
    if (!this.options.showLine) {
      let l = 0;
      for (let a = n.length - 1; a >= 0; --a)
        l = Math.max(l, n[a].size(this.resolveDataElementOptions(a)) / 2);
      return l > 0 && l;
    }
    const i = t.dataset, s = i.options && i.options.borderWidth || 0;
    if (!n.length)
      return s;
    const r = n[0].size(this.resolveDataElementOptions(0)), o = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(s, r, o) / 2;
  }
}
Y(Fo, "id", "scatter"), Y(Fo, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), Y(Fo, "overrides", {
  interaction: {
    mode: "point"
  },
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function Wn() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Za {
  constructor(t) {
    Y(this, "options");
    this.options = t || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(Za.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Wn();
  }
  parse() {
    return Wn();
  }
  format() {
    return Wn();
  }
  add() {
    return Wn();
  }
  diff() {
    return Wn();
  }
  startOf() {
    return Wn();
  }
  endOf() {
    return Wn();
  }
}
var Iv = {
  _date: Za
};
function Vv(e, t, n, i) {
  const { controller: s, data: r, _sorted: o } = e, l = s._cachedMeta.iScale, a = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && o && r.length) {
    const c = l._reversePixels ? n0 : Jn;
    if (i) {
      if (s._sharedOptions) {
        const h = r[0], d = typeof h.getRange == "function" && h.getRange(t);
        if (d) {
          const u = c(r, t, n - d), f = c(r, t, n + d);
          return {
            lo: u.lo,
            hi: f.hi
          };
        }
      }
    } else {
      const h = c(r, t, n);
      if (a) {
        const { vScale: d } = s._cachedMeta, { _parsed: u } = e, f = u.slice(0, h.lo + 1).reverse().findIndex((m) => !gt(m[d.axis]));
        h.lo -= Math.max(0, f);
        const g = u.slice(h.hi).findIndex((m) => !gt(m[d.axis]));
        h.hi += Math.max(0, g);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: r.length - 1
  };
}
function Lr(e, t, n, i, s) {
  const r = e.getSortedVisibleDatasetMetas(), o = n[t];
  for (let l = 0, a = r.length; l < a; ++l) {
    const { index: c, data: h } = r[l], { lo: d, hi: u } = Vv(r[l], t, o, s);
    for (let f = d; f <= u; ++f) {
      const g = h[f];
      g.skip || i(g, c, f);
    }
  }
}
function $v(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(i, s) {
    const r = t ? Math.abs(i.x - s.x) : 0, o = n ? Math.abs(i.y - s.y) : 0;
    return Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2));
  };
}
function al(e, t, n, i, s) {
  const r = [];
  return !s && !e.isPointInArea(t) || Lr(e, n, t, function(l, a, c) {
    !s && !fn(l, e.chartArea, 0) || l.inRange(t.x, t.y, i) && r.push({
      element: l,
      datasetIndex: a,
      index: c
    });
  }, !0), r;
}
function Bv(e, t, n, i) {
  let s = [];
  function r(o, l, a) {
    const { startAngle: c, endAngle: h } = o.getProps([
      "startAngle",
      "endAngle"
    ], i), { angle: d } = Hf(o, {
      x: t.x,
      y: t.y
    });
    Ns(d, c, h) && s.push({
      element: o,
      datasetIndex: l,
      index: a
    });
  }
  return Lr(e, n, t, r), s;
}
function zv(e, t, n, i, s, r) {
  let o = [];
  const l = $v(n);
  let a = Number.POSITIVE_INFINITY;
  function c(h, d, u) {
    const f = h.inRange(t.x, t.y, s);
    if (i && !f)
      return;
    const g = h.getCenterPoint(s);
    if (!(!!r || e.isPointInArea(g)) && !f)
      return;
    const v = l(t, g);
    v < a ? (o = [
      {
        element: h,
        datasetIndex: d,
        index: u
      }
    ], a = v) : v === a && o.push({
      element: h,
      datasetIndex: d,
      index: u
    });
  }
  return Lr(e, n, t, c), o;
}
function cl(e, t, n, i, s, r) {
  return !r && !e.isPointInArea(t) ? [] : n === "r" && !i ? Bv(e, t, n, s) : zv(e, t, n, i, s, r);
}
function Uh(e, t, n, i, s) {
  const r = [], o = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return Lr(e, n, t, (a, c, h) => {
    a[o] && a[o](t[n], s) && (r.push({
      element: a,
      datasetIndex: c,
      index: h
    }), l = l || a.inRange(t.x, t.y, s));
  }), i && !l ? [] : r;
}
var Hv = {
  modes: {
    index(e, t, n, i) {
      const s = Yn(t, e), r = n.axis || "x", o = n.includeInvisible || !1, l = n.intersect ? al(e, s, r, i, o) : cl(e, s, r, !1, i, o), a = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const h = l[0].index, d = c.data[h];
        d && !d.skip && a.push({
          element: d,
          datasetIndex: c.index,
          index: h
        });
      }), a) : [];
    },
    dataset(e, t, n, i) {
      const s = Yn(t, e), r = n.axis || "xy", o = n.includeInvisible || !1;
      let l = n.intersect ? al(e, s, r, i, o) : cl(e, s, r, !1, i, o);
      if (l.length > 0) {
        const a = l[0].datasetIndex, c = e.getDatasetMeta(a).data;
        l = [];
        for (let h = 0; h < c.length; ++h)
          l.push({
            element: c[h],
            datasetIndex: a,
            index: h
          });
      }
      return l;
    },
    point(e, t, n, i) {
      const s = Yn(t, e), r = n.axis || "xy", o = n.includeInvisible || !1;
      return al(e, s, r, i, o);
    },
    nearest(e, t, n, i) {
      const s = Yn(t, e), r = n.axis || "xy", o = n.includeInvisible || !1;
      return cl(e, s, r, n.intersect, i, o);
    },
    x(e, t, n, i) {
      const s = Yn(t, e);
      return Uh(e, s, "x", n.intersect, i);
    },
    y(e, t, n, i) {
      const s = Yn(t, e);
      return Uh(e, s, "y", n.intersect, i);
    }
  }
};
const a1 = [
  "left",
  "top",
  "right",
  "bottom"
];
function ts(e, t) {
  return e.filter((n) => n.pos === t);
}
function Xh(e, t) {
  return e.filter((n) => a1.indexOf(n.pos) === -1 && n.box.axis === t);
}
function es(e, t) {
  return e.sort((n, i) => {
    const s = t ? i : n, r = t ? n : i;
    return s.weight === r.weight ? s.index - r.index : s.weight - r.weight;
  });
}
function jv(e) {
  const t = [];
  let n, i, s, r, o, l;
  for (n = 0, i = (e || []).length; n < i; ++n)
    s = e[n], { position: r, options: { stack: o, stackWeight: l = 1 } } = s, t.push({
      index: n,
      box: s,
      pos: r,
      horizontal: s.isHorizontal(),
      weight: s.weight,
      stack: o && r + o,
      stackWeight: l
    });
  return t;
}
function Wv(e) {
  const t = {};
  for (const n of e) {
    const { stack: i, pos: s, stackWeight: r } = n;
    if (!i || !a1.includes(s))
      continue;
    const o = t[i] || (t[i] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    o.count++, o.weight += r;
  }
  return t;
}
function qv(e, t) {
  const n = Wv(e), { vBoxMaxWidth: i, hBoxMaxHeight: s } = t;
  let r, o, l;
  for (r = 0, o = e.length; r < o; ++r) {
    l = e[r];
    const { fullSize: a } = l.box, c = n[l.stack], h = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = h ? h * i : a && t.availableWidth, l.height = s) : (l.width = i, l.height = h ? h * s : a && t.availableHeight);
  }
  return n;
}
function Gv(e) {
  const t = jv(e), n = es(t.filter((c) => c.box.fullSize), !0), i = es(ts(t, "left"), !0), s = es(ts(t, "right")), r = es(ts(t, "top"), !0), o = es(ts(t, "bottom")), l = Xh(t, "x"), a = Xh(t, "y");
  return {
    fullSize: n,
    leftAndTop: i.concat(r),
    rightAndBottom: s.concat(a).concat(o).concat(l),
    chartArea: ts(t, "chartArea"),
    vertical: i.concat(s).concat(a),
    horizontal: r.concat(o).concat(l)
  };
}
function Kh(e, t, n, i) {
  return Math.max(e[n], t[n]) + Math.max(e[i], t[i]);
}
function c1(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Yv(e, t, n, i) {
  const { pos: s, box: r } = n, o = e.maxPadding;
  if (!dt(s)) {
    n.size && (e[s] -= n.size);
    const d = i[n.stack] || {
      size: 0,
      count: 1
    };
    d.size = Math.max(d.size, n.horizontal ? r.height : r.width), n.size = d.size / d.count, e[s] += n.size;
  }
  r.getPadding && c1(o, r.getPadding());
  const l = Math.max(0, t.outerWidth - Kh(o, e, "left", "right")), a = Math.max(0, t.outerHeight - Kh(o, e, "top", "bottom")), c = l !== e.w, h = a !== e.h;
  return e.w = l, e.h = a, n.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function Uv(e) {
  const t = e.maxPadding;
  function n(i) {
    const s = Math.max(t[i] - e[i], 0);
    return e[i] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Xv(e, t) {
  const n = t.maxPadding;
  function i(s) {
    const r = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return s.forEach((o) => {
      r[o] = Math.max(t[o], n[o]);
    }), r;
  }
  return i(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function ls(e, t, n, i) {
  const s = [];
  let r, o, l, a, c, h;
  for (r = 0, o = e.length, c = 0; r < o; ++r) {
    l = e[r], a = l.box, a.update(l.width || t.w, l.height || t.h, Xv(l.horizontal, t));
    const { same: d, other: u } = Yv(t, n, l, i);
    c |= d && s.length, h = h || u, a.fullSize || s.push(l);
  }
  return c && ls(s, t, n, i) || h;
}
function ao(e, t, n, i, s) {
  e.top = n, e.left = t, e.right = t + i, e.bottom = n + s, e.width = i, e.height = s;
}
function Jh(e, t, n, i) {
  const s = n.padding;
  let { x: r, y: o } = t;
  for (const l of e) {
    const a = l.box, c = i[l.stack] || {
      placed: 0,
      weight: 1
    }, h = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const d = t.w * h, u = c.size || a.height;
      Ds(c.start) && (o = c.start), a.fullSize ? ao(a, s.left, o, n.outerWidth - s.right - s.left, u) : ao(a, t.left + c.placed, o, d, u), c.start = o, c.placed += d, o = a.bottom;
    } else {
      const d = t.h * h, u = c.size || a.width;
      Ds(c.start) && (r = c.start), a.fullSize ? ao(a, r, s.top, u, n.outerHeight - s.bottom - s.top) : ao(a, r, t.top + c.placed, u, d), c.start = r, c.placed += d, r = a.right;
    }
  }
  t.x = r, t.y = o;
}
var co = {
  addBox(e, t) {
    e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(n) {
            t.draw(n);
          }
        }
      ];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const n = e.boxes ? e.boxes.indexOf(t) : -1;
    n !== -1 && e.boxes.splice(n, 1);
  },
  configure(e, t, n) {
    t.fullSize = n.fullSize, t.position = n.position, t.weight = n.weight;
  },
  update(e, t, n, i) {
    if (!e)
      return;
    const s = _e(e.options.layout.padding), r = Math.max(t - s.width, 0), o = Math.max(n - s.height, 0), l = Gv(e.boxes), a = l.vertical, c = l.horizontal;
    _t(e.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const h = a.reduce((m, v) => v.box.options && v.box.options.display === !1 ? m : m + 1, 0) || 1, d = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: r,
      availableHeight: o,
      vBoxMaxWidth: r / 2 / h,
      hBoxMaxHeight: o / 2
    }), u = Object.assign({}, s);
    c1(u, _e(i));
    const f = Object.assign({
      maxPadding: u,
      w: r,
      h: o,
      x: s.left,
      y: s.top
    }, s), g = qv(a.concat(c), d);
    ls(l.fullSize, f, d, g), ls(a, f, d, g), ls(c, f, d, g) && ls(a, f, d, g), Uv(f), Jh(l.leftAndTop, f, d, g), f.x += f.w, f.y += f.h, Jh(l.rightAndBottom, f, d, g), e.chartArea = {
      left: f.left,
      top: f.top,
      right: f.left + f.w,
      bottom: f.top + f.h,
      height: f.h,
      width: f.w
    }, _t(l.chartArea, (m) => {
      const v = m.box;
      Object.assign(v, e.chartArea), v.update(f.w, f.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class h1 {
  acquireContext(t, n) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, n, i) {
  }
  removeEventListener(t, n, i) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, n, i, s) {
    return n = Math.max(0, n || t.width), i = i || t.height, {
      width: n,
      height: Math.max(0, s ? Math.floor(n / s) : i)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Kv extends h1 {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const To = "$chartjs", Jv = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Zh = (e) => e === null || e === "";
function Zv(e, t) {
  const n = e.style, i = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[To] = {
    initial: {
      height: i,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", Zh(s)) {
    const r = Th(e, "width");
    r !== void 0 && (e.width = r);
  }
  if (Zh(i))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const r = Th(e, "height");
      r !== void 0 && (e.height = r);
    }
  return e;
}
const d1 = Z0 ? {
  passive: !0
} : !1;
function Qv(e, t, n) {
  e && e.addEventListener(t, n, d1);
}
function tb(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, d1);
}
function eb(e, t) {
  const n = Jv[e.type] || e.type, { x: i, y: s } = Yn(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: i !== void 0 ? i : null,
    y: s !== void 0 ? s : null
  };
}
function ar(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function nb(e, t, n) {
  const i = e.canvas, s = new MutationObserver((r) => {
    let o = !1;
    for (const l of r)
      o = o || ar(l.addedNodes, i), o = o && !ar(l.removedNodes, i);
    o && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function ib(e, t, n) {
  const i = e.canvas, s = new MutationObserver((r) => {
    let o = !1;
    for (const l of r)
      o = o || ar(l.removedNodes, i), o = o && !ar(l.addedNodes, i);
    o && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Rs = /* @__PURE__ */ new Map();
let Qh = 0;
function u1() {
  const e = window.devicePixelRatio;
  e !== Qh && (Qh = e, Rs.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function sb(e, t) {
  Rs.size || window.addEventListener("resize", u1), Rs.set(e, t);
}
function ob(e) {
  Rs.delete(e), Rs.size || window.removeEventListener("resize", u1);
}
function rb(e, t, n) {
  const i = e.canvas, s = i && Ja(i);
  if (!s)
    return;
  const r = Gf((l, a) => {
    const c = s.clientWidth;
    n(l, a), c < s.clientWidth && n();
  }, window), o = new ResizeObserver((l) => {
    const a = l[0], c = a.contentRect.width, h = a.contentRect.height;
    c === 0 && h === 0 || r(c, h);
  });
  return o.observe(s), sb(e, r), o;
}
function hl(e, t, n) {
  n && n.disconnect(), t === "resize" && ob(e);
}
function lb(e, t, n) {
  const i = e.canvas, s = Gf((r) => {
    e.ctx !== null && n(eb(r, e));
  }, e);
  return Qv(i, t, s), s;
}
class ab extends h1 {
  acquireContext(t, n) {
    const i = t && t.getContext && t.getContext("2d");
    return i && i.canvas === t ? (Zv(t, n), i) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[To])
      return !1;
    const i = n[To].initial;
    [
      "height",
      "width"
    ].forEach((r) => {
      const o = i[r];
      gt(o) ? n.removeAttribute(r) : n.setAttribute(r, o);
    });
    const s = i.style || {};
    return Object.keys(s).forEach((r) => {
      n.style[r] = s[r];
    }), n.width = n.width, delete n[To], !0;
  }
  addEventListener(t, n, i) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), o = {
      attach: nb,
      detach: ib,
      resize: rb
    }[n] || lb;
    s[n] = o(t, n, i);
  }
  removeEventListener(t, n) {
    const i = t.$proxies || (t.$proxies = {}), s = i[n];
    if (!s)
      return;
    ({
      attach: hl,
      detach: hl,
      resize: hl
    }[n] || tb)(t, n, s), i[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, i, s) {
    return J0(t, n, i, s);
  }
  isAttached(t) {
    const n = t && Ja(t);
    return !!(n && n.isConnected);
  }
}
function cb(e) {
  return !Ka() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Kv : ab;
}
var _o;
let di = (_o = class {
  constructor() {
    Y(this, "x");
    Y(this, "y");
    Y(this, "active", !1);
    Y(this, "options");
    Y(this, "$animations");
  }
  tooltipPosition(t) {
    const { x: n, y: i } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: n,
      y: i
    };
  }
  hasValue() {
    return Fi(this.x) && Fi(this.y);
  }
  getProps(t, n) {
    const i = this.$animations;
    if (!n || !i)
      return this;
    const s = {};
    return t.forEach((r) => {
      s[r] = i[r] && i[r].active() ? i[r]._to : this[r];
    }), s;
  }
}, Y(_o, "defaults", {}), Y(_o, "defaultRoutes"), _o);
function hb(e, t) {
  const n = e.options.ticks, i = db(e), s = Math.min(n.maxTicksLimit || i, i), r = n.major.enabled ? fb(t) : [], o = r.length, l = r[0], a = r[o - 1], c = [];
  if (o > s)
    return pb(t, c, r, o / s), c;
  const h = ub(r, t, s);
  if (o > 0) {
    let d, u;
    const f = o > 1 ? Math.round((a - l) / (o - 1)) : null;
    for (ho(t, c, h, gt(f) ? 0 : l - f, l), d = 0, u = o - 1; d < u; d++)
      ho(t, c, h, r[d], r[d + 1]);
    return ho(t, c, h, a, gt(f) ? t.length : a + f), c;
  }
  return ho(t, c, h), c;
}
function db(e) {
  const t = e.options.offset, n = e._tickSize(), i = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(i, s));
}
function ub(e, t, n) {
  const i = gb(e), s = t.length / n;
  if (!i)
    return Math.max(s, 1);
  const r = Km(i);
  for (let o = 0, l = r.length - 1; o < l; o++) {
    const a = r[o];
    if (a > s)
      return a;
  }
  return Math.max(s, 1);
}
function fb(e) {
  const t = [];
  let n, i;
  for (n = 0, i = e.length; n < i; n++)
    e[n].major && t.push(n);
  return t;
}
function pb(e, t, n, i) {
  let s = 0, r = n[0], o;
  for (i = Math.ceil(i), o = 0; o < e.length; o++)
    o === r && (t.push(e[o]), s++, r = n[s * i]);
}
function ho(e, t, n, i, s) {
  const r = mt(i, 0), o = Math.min(mt(s, e.length), e.length);
  let l = 0, a, c, h;
  for (n = Math.ceil(n), s && (a = s - i, n = a / Math.floor(a / n)), h = r; h < 0; )
    l++, h = Math.round(r + l * n);
  for (c = Math.max(r, 0); c < o; c++)
    c === h && (t.push(e[c]), l++, h = Math.round(r + l * n));
}
function gb(e) {
  const t = e.length;
  let n, i;
  if (t < 2)
    return !1;
  for (i = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== i)
      return !1;
  return i;
}
const mb = (e) => e === "left" ? "right" : e === "right" ? "left" : e, td = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, ed = (e, t) => Math.min(t || e, e);
function nd(e, t) {
  const n = [], i = e.length / t, s = e.length;
  let r = 0;
  for (; r < s; r += i)
    n.push(e[Math.floor(r)]);
  return n;
}
function vb(e, t, n) {
  const i = e.ticks.length, s = Math.min(t, i - 1), r = e._startPixel, o = e._endPixel, l = 1e-6;
  let a = e.getPixelForTick(s), c;
  if (!(n && (i === 1 ? c = Math.max(a - r, o - a) : t === 0 ? c = (e.getPixelForTick(1) - a) / 2 : c = (a - e.getPixelForTick(s - 1)) / 2, a += s < t ? c : -c, a < r - l || a > o + l)))
    return a;
}
function bb(e, t) {
  _t(e, (n) => {
    const i = n.gc, s = i.length / 2;
    let r;
    if (s > t) {
      for (r = 0; r < s; ++r)
        delete n.data[i[r]];
      i.splice(0, s);
    }
  });
}
function ns(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function id(e, t) {
  if (!e.display)
    return 0;
  const n = ve(e.font, t), i = _e(e.padding);
  return (Dt(e.text) ? e.text.length : 1) * n.lineHeight + i.height;
}
function yb(e, t) {
  return Tn(e, {
    scale: t,
    type: "scale"
  });
}
function xb(e, t, n) {
  return Tn(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function kb(e, t, n) {
  let i = r0(e);
  return (n && t !== "right" || !n && t === "right") && (i = mb(i)), i;
}
function wb(e, t, n, i) {
  const { top: s, left: r, bottom: o, right: l, chart: a } = e, { chartArea: c, scales: h } = a;
  let d = 0, u, f, g;
  const m = o - s, v = l - r;
  if (e.isHorizontal()) {
    if (f = Sh(i, r, l), dt(n)) {
      const b = Object.keys(n)[0], _ = n[b];
      g = h[b].getPixelForValue(_) + m - t;
    } else n === "center" ? g = (c.bottom + c.top) / 2 + m - t : g = td(e, n, t);
    u = l - r;
  } else {
    if (dt(n)) {
      const b = Object.keys(n)[0], _ = n[b];
      f = h[b].getPixelForValue(_) - v + t;
    } else n === "center" ? f = (c.left + c.right) / 2 - v + t : f = td(e, n, t);
    g = Sh(i, o, s), d = n === "left" ? -Tt : Tt;
  }
  return {
    titleX: f,
    titleY: g,
    maxWidth: u,
    rotation: d
  };
}
class zi extends di {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, n) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: n, _suggestedMin: i, _suggestedMax: s } = this;
    return t = ze(t, Number.POSITIVE_INFINITY), n = ze(n, Number.NEGATIVE_INFINITY), i = ze(i, Number.POSITIVE_INFINITY), s = ze(s, Number.NEGATIVE_INFINITY), {
      min: ze(t, i),
      max: ze(n, s),
      minDefined: Gt(t),
      maxDefined: Gt(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: i, minDefined: s, maxDefined: r } = this.getUserBounds(), o;
    if (s && r)
      return {
        min: n,
        max: i
      };
    const l = this.getMatchingVisibleMetas();
    for (let a = 0, c = l.length; a < c; ++a)
      o = l[a].controller.getMinMax(this, t), s || (n = Math.min(n, o.min)), r || (i = Math.max(i, o.max));
    return n = r && n > i ? i : n, i = s && n > i ? n : i, {
      min: ze(n, ze(i, n)),
      max: ze(i, ze(n, i))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    Ot(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, n, i) {
    const { beginAtZero: s, grace: r, ticks: o } = this.options, l = o.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = i = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = P0(this, r, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const a = l < this.ticks.length;
    this._convertTicksToLabels(a ? nd(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = hb(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), a && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, i;
    this.isHorizontal() ? (n = this.left, i = this.right) : (n = this.top, i = this.bottom, t = !t), this._startPixel = n, this._endPixel = i, this._reversePixels = t, this._length = i - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Ot(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Ot(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Ot(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Ot(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    Ot(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let i, s, r;
    for (i = 0, s = t.length; i < s; i++)
      r = t[i], r.label = Ot(n.callback, [
        r.value,
        i,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Ot(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Ot(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, i = ed(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, r = n.maxRotation;
    let o = s, l, a, c;
    if (!this._isVisible() || !n.display || s >= r || i <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const h = this._getLabelSizes(), d = h.widest.width, u = h.highest.height, f = Kt(this.chart.width - d, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / i : f / (i - 1), d + 6 > l && (l = f / (i - (t.offset ? 0.5 : 1)), a = this.maxHeight - ns(t.grid) - n.padding - id(t.title, this.chart.options.font), c = Math.sqrt(d * d + u * u), o = $a(Math.min(Math.asin(Kt((h.highest.height + 6) / l, -1, 1)), Math.asin(Kt(a / c, -1, 1)) - Math.asin(Kt(u / c, -1, 1)))), o = Math.max(s, Math.min(r, o))), this.labelRotation = o;
  }
  afterCalculateLabelRotation() {
    Ot(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Ot(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: i, title: s, grid: r } } = this, o = this._isVisible(), l = this.isHorizontal();
    if (o) {
      const a = id(s, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = ns(r) + a) : (t.height = this.maxHeight, t.width = ns(r) + a), i.display && this.ticks.length) {
        const { first: c, last: h, widest: d, highest: u } = this._getLabelSizes(), f = i.padding * 2, g = Xe(this.labelRotation), m = Math.cos(g), v = Math.sin(g);
        if (l) {
          const b = i.mirror ? 0 : v * d.width + m * u.height;
          t.height = Math.min(this.maxHeight, t.height + b + f);
        } else {
          const b = i.mirror ? 0 : m * d.width + v * u.height;
          t.width = Math.min(this.maxWidth, t.width + b + f);
        }
        this._calculatePadding(c, h, v, m);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, i, s) {
    const { ticks: { align: r, padding: o }, position: l } = this.options, a = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, d = this.right - this.getPixelForTick(this.ticks.length - 1);
      let u = 0, f = 0;
      a ? c ? (u = s * t.width, f = i * n.height) : (u = i * t.height, f = s * n.width) : r === "start" ? f = n.width : r === "end" ? u = t.width : r !== "inner" && (u = t.width / 2, f = n.width / 2), this.paddingLeft = Math.max((u - h + o) * this.width / (this.width - h), 0), this.paddingRight = Math.max((f - d + o) * this.width / (this.width - d), 0);
    } else {
      let h = n.height / 2, d = t.height / 2;
      r === "start" ? (h = 0, d = t.height) : r === "end" && (h = n.height, d = 0), this.paddingTop = h + o, this.paddingBottom = d + o;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Ot(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: n } = this.options;
    return n === "top" || n === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let n, i;
    for (n = 0, i = t.length; n < i; n++)
      gt(t[n].label) && (t.splice(n, 1), i--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let i = this.ticks;
      n < i.length && (i = nd(i, n)), this._labelSizes = t = this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, i) {
    const { ctx: s, _longestTextCache: r } = this, o = [], l = [], a = Math.floor(n / ed(n, i));
    let c = 0, h = 0, d, u, f, g, m, v, b, _, S, E, k;
    for (d = 0; d < n; d += a) {
      if (g = t[d].label, m = this._resolveTickFontOptions(d), s.font = v = m.string, b = r[v] = r[v] || {
        data: {},
        gc: []
      }, _ = m.lineHeight, S = E = 0, !gt(g) && !Dt(g))
        S = sr(s, b.data, b.gc, S, g), E = _;
      else if (Dt(g))
        for (u = 0, f = g.length; u < f; ++u)
          k = g[u], !gt(k) && !Dt(k) && (S = sr(s, b.data, b.gc, S, k), E += _);
      o.push(S), l.push(E), c = Math.max(S, c), h = Math.max(E, h);
    }
    bb(r, n);
    const N = o.indexOf(c), w = l.indexOf(h), P = (O) => ({
      width: o[O] || 0,
      height: l[O] || 0
    });
    return {
      first: P(0),
      last: P(n - 1),
      widest: P(N),
      highest: P(w),
      widths: o,
      heights: l
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, n) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const n = this._startPixel + t * this._length;
    return e0(this._alignToPixels ? jn(this.chart, n, 0) : n);
  }
  getDecimalForPixel(t) {
    const n = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - n : n;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: n } = this;
    return t < 0 && n < 0 ? n : t > 0 && n > 0 ? t : 0;
  }
  getContext(t) {
    const n = this.ticks || [];
    if (t >= 0 && t < n.length) {
      const i = n[t];
      return i.$context || (i.$context = xb(this.getContext(), t, i));
    }
    return this.$context || (this.$context = yb(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Xe(this.labelRotation), i = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), r = this._getLabelSizes(), o = t.autoSkipPadding || 0, l = r ? r.widest.width + o : 0, a = r ? r.highest.height + o : 0;
    return this.isHorizontal() ? a * i > l * s ? l / i : a / s : a * s < l * i ? a / i : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, i = this.chart, s = this.options, { grid: r, position: o, border: l } = s, a = r.offset, c = this.isHorizontal(), d = this.ticks.length + (a ? 1 : 0), u = ns(r), f = [], g = l.setContext(this.getContext()), m = g.display ? g.width : 0, v = m / 2, b = function(et) {
      return jn(i, et, m);
    };
    let _, S, E, k, N, w, P, O, F, R, j, J;
    if (o === "top")
      _ = b(this.bottom), w = this.bottom - u, O = _ - v, R = b(t.top) + v, J = t.bottom;
    else if (o === "bottom")
      _ = b(this.top), R = t.top, J = b(t.bottom) - v, w = _ + v, O = this.top + u;
    else if (o === "left")
      _ = b(this.right), N = this.right - u, P = _ - v, F = b(t.left) + v, j = t.right;
    else if (o === "right")
      _ = b(this.left), F = t.left, j = b(t.right) - v, N = _ + v, P = this.left + u;
    else if (n === "x") {
      if (o === "center")
        _ = b((t.top + t.bottom) / 2 + 0.5);
      else if (dt(o)) {
        const et = Object.keys(o)[0], U = o[et];
        _ = b(this.chart.scales[et].getPixelForValue(U));
      }
      R = t.top, J = t.bottom, w = _ + v, O = w + u;
    } else if (n === "y") {
      if (o === "center")
        _ = b((t.left + t.right) / 2);
      else if (dt(o)) {
        const et = Object.keys(o)[0], U = o[et];
        _ = b(this.chart.scales[et].getPixelForValue(U));
      }
      N = _ - v, P = N - u, F = t.left, j = t.right;
    }
    const kt = mt(s.ticks.maxTicksLimit, d), st = Math.max(1, Math.ceil(d / kt));
    for (S = 0; S < d; S += st) {
      const et = this.getContext(S), U = r.setContext(et), Z = l.setContext(et), ct = U.lineWidth, Se = U.color, xe = Z.dash || [], Zt = Z.dashOffset, Wt = U.tickWidth, Ee = U.tickColor, $n = U.tickBorderDash || [], nn = U.tickBorderDashOffset;
      E = vb(this, S, a), E !== void 0 && (k = jn(i, E, ct), c ? N = P = F = j = k : w = O = R = J = k, f.push({
        tx1: N,
        ty1: w,
        tx2: P,
        ty2: O,
        x1: F,
        y1: R,
        x2: j,
        y2: J,
        width: ct,
        color: Se,
        borderDash: xe,
        borderDashOffset: Zt,
        tickWidth: Wt,
        tickColor: Ee,
        tickBorderDash: $n,
        tickBorderDashOffset: nn
      }));
    }
    return this._ticksLength = d, this._borderValue = _, f;
  }
  _computeLabelItems(t) {
    const n = this.axis, i = this.options, { position: s, ticks: r } = i, o = this.isHorizontal(), l = this.ticks, { align: a, crossAlign: c, padding: h, mirror: d } = r, u = ns(i.grid), f = u + h, g = d ? -h : f, m = -Xe(this.labelRotation), v = [];
    let b, _, S, E, k, N, w, P, O, F, R, j, J = "middle";
    if (s === "top")
      N = this.bottom - g, w = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      N = this.top + g, w = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const st = this._getYAxisLabelAlignment(u);
      w = st.textAlign, k = st.x;
    } else if (s === "right") {
      const st = this._getYAxisLabelAlignment(u);
      w = st.textAlign, k = st.x;
    } else if (n === "x") {
      if (s === "center")
        N = (t.top + t.bottom) / 2 + f;
      else if (dt(s)) {
        const st = Object.keys(s)[0], et = s[st];
        N = this.chart.scales[st].getPixelForValue(et) + f;
      }
      w = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        k = (t.left + t.right) / 2 - f;
      else if (dt(s)) {
        const st = Object.keys(s)[0], et = s[st];
        k = this.chart.scales[st].getPixelForValue(et);
      }
      w = this._getYAxisLabelAlignment(u).textAlign;
    }
    n === "y" && (a === "start" ? J = "top" : a === "end" && (J = "bottom"));
    const kt = this._getLabelSizes();
    for (b = 0, _ = l.length; b < _; ++b) {
      S = l[b], E = S.label;
      const st = r.setContext(this.getContext(b));
      P = this.getPixelForTick(b) + r.labelOffset, O = this._resolveTickFontOptions(b), F = O.lineHeight, R = Dt(E) ? E.length : 1;
      const et = R / 2, U = st.color, Z = st.textStrokeColor, ct = st.textStrokeWidth;
      let Se = w;
      o ? (k = P, w === "inner" && (b === _ - 1 ? Se = this.options.reverse ? "left" : "right" : b === 0 ? Se = this.options.reverse ? "right" : "left" : Se = "center"), s === "top" ? c === "near" || m !== 0 ? j = -R * F + F / 2 : c === "center" ? j = -kt.highest.height / 2 - et * F + F : j = -kt.highest.height + F / 2 : c === "near" || m !== 0 ? j = F / 2 : c === "center" ? j = kt.highest.height / 2 - et * F : j = kt.highest.height - R * F, d && (j *= -1), m !== 0 && !st.showLabelBackdrop && (k += F / 2 * Math.sin(m))) : (N = P, j = (1 - R) * F / 2);
      let xe;
      if (st.showLabelBackdrop) {
        const Zt = _e(st.backdropPadding), Wt = kt.heights[b], Ee = kt.widths[b];
        let $n = j - Zt.top, nn = 0 - Zt.left;
        switch (J) {
          case "middle":
            $n -= Wt / 2;
            break;
          case "bottom":
            $n -= Wt;
            break;
        }
        switch (w) {
          case "center":
            nn -= Ee / 2;
            break;
          case "right":
            nn -= Ee;
            break;
          case "inner":
            b === _ - 1 ? nn -= Ee : b > 0 && (nn -= Ee / 2);
            break;
        }
        xe = {
          left: nn,
          top: $n,
          width: Ee + Zt.width,
          height: Wt + Zt.height,
          color: st.backdropColor
        };
      }
      v.push({
        label: E,
        font: O,
        textOffset: j,
        options: {
          rotation: m,
          color: U,
          strokeColor: Z,
          strokeWidth: ct,
          textAlign: Se,
          textBaseline: J,
          translation: [
            k,
            N
          ],
          backdrop: xe
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Xe(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return n.align === "start" ? s = "left" : n.align === "end" ? s = "right" : n.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: i, mirror: s, padding: r } } = this.options, o = this._getLabelSizes(), l = t + r, a = o.widest.width;
    let c, h;
    return n === "left" ? s ? (h = this.right + r, i === "near" ? c = "left" : i === "center" ? (c = "center", h += a / 2) : (c = "right", h += a)) : (h = this.right - l, i === "near" ? c = "right" : i === "center" ? (c = "center", h -= a / 2) : (c = "left", h = this.left)) : n === "right" ? s ? (h = this.left + r, i === "near" ? c = "right" : i === "center" ? (c = "center", h -= a / 2) : (c = "left", h -= a)) : (h = this.left + l, i === "near" ? c = "left" : i === "center" ? (c = "center", h += a / 2) : (c = "right", h = this.right)) : c = "right", {
      textAlign: c,
      x: h
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, n = this.options.position;
    if (n === "left" || n === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (n === "top" || n === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: n }, left: i, top: s, width: r, height: o } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(i, s, r, o), t.restore());
  }
  getLineWidthForValue(t) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const s = this.ticks.findIndex((r) => r.value === t);
    return s >= 0 ? n.setContext(this.getContext(s)).lineWidth : 0;
  }
  drawGrid(t) {
    const n = this.options.grid, i = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let r, o;
    const l = (a, c, h) => {
      !h.width || !h.color || (i.save(), i.lineWidth = h.width, i.strokeStyle = h.color, i.setLineDash(h.borderDash || []), i.lineDashOffset = h.borderDashOffset, i.beginPath(), i.moveTo(a.x, a.y), i.lineTo(c.x, c.y), i.stroke(), i.restore());
    };
    if (n.display)
      for (r = 0, o = s.length; r < o; ++r) {
        const a = s[r];
        n.drawOnChartArea && l({
          x: a.x1,
          y: a.y1
        }, {
          x: a.x2,
          y: a.y2
        }, a), n.drawTicks && l({
          x: a.tx1,
          y: a.ty1
        }, {
          x: a.tx2,
          y: a.ty2
        }, {
          color: a.tickColor,
          width: a.tickWidth,
          borderDash: a.tickBorderDash,
          borderDashOffset: a.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: n, options: { border: i, grid: s } } = this, r = i.setContext(this.getContext()), o = i.display ? r.width : 0;
    if (!o)
      return;
    const l = s.setContext(this.getContext(0)).lineWidth, a = this._borderValue;
    let c, h, d, u;
    this.isHorizontal() ? (c = jn(t, this.left, o) - o / 2, h = jn(t, this.right, l) + l / 2, d = u = a) : (d = jn(t, this.top, o) - o / 2, u = jn(t, this.bottom, l) + l / 2, c = h = a), n.save(), n.lineWidth = r.width, n.strokeStyle = r.color, n.beginPath(), n.moveTo(c, d), n.lineTo(h, u), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const i = this.ctx, s = this._computeLabelArea();
    s && Wa(i, s);
    const r = this.getLabelItems(t);
    for (const o of r) {
      const l = o.options, a = o.font, c = o.label, h = o.textOffset;
      or(i, c, 0, h, a, l);
    }
    s && qa(i);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: i, reverse: s } } = this;
    if (!i.display)
      return;
    const r = ve(i.font), o = _e(i.padding), l = i.align;
    let a = r.lineHeight / 2;
    n === "bottom" || n === "center" || dt(n) ? (a += o.bottom, Dt(i.text) && (a += r.lineHeight * (i.text.length - 1))) : a += o.top;
    const { titleX: c, titleY: h, maxWidth: d, rotation: u } = wb(this, a, n, l);
    or(t, i.text, 0, 0, r, {
      color: i.color,
      maxWidth: d,
      rotation: u,
      textAlign: kb(l, n, s),
      textBaseline: "middle",
      translation: [
        c,
        h
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, n = t.ticks && t.ticks.z || 0, i = mt(t.grid && t.grid.z, -1), s = mt(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== zi.prototype.draw ? [
      {
        z: n,
        draw: (r) => {
          this.draw(r);
        }
      }
    ] : [
      {
        z: i,
        draw: (r) => {
          this.drawBackground(), this.drawGrid(r), this.drawTitle();
        }
      },
      {
        z: s,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: n,
        draw: (r) => {
          this.drawLabels(r);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const n = this.chart.getSortedVisibleDatasetMetas(), i = this.axis + "AxisID", s = [];
    let r, o;
    for (r = 0, o = n.length; r < o; ++r) {
      const l = n[r];
      l[i] === this.id && (!t || l.type === t) && s.push(l);
    }
    return s;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return ve(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class uo {
  constructor(t, n, i) {
    this.type = t, this.scope = n, this.override = i, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let i;
    Cb(n) && (i = this.register(n));
    const s = this.items, r = t.id, o = this.scope + "." + r;
    if (!r)
      throw new Error("class does not have id: " + t);
    return r in s || (s[r] = t, _b(t, o, i), this.override && Lt.override(t.id, t.overrides)), o;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, i = t.id, s = this.scope;
    i in n && delete n[i], s && i in Lt[s] && (delete Lt[s][i], this.override && delete hi[i]);
  }
}
function _b(e, t, n) {
  const i = Ps(/* @__PURE__ */ Object.create(null), [
    n ? Lt.get(n) : {},
    Lt.get(t),
    e.defaults
  ]);
  Lt.set(t, i), e.defaultRoutes && Mb(t, e.defaultRoutes), e.descriptors && Lt.describe(t, e.descriptors);
}
function Mb(e, t) {
  Object.keys(t).forEach((n) => {
    const i = n.split("."), s = i.pop(), r = [
      e
    ].concat(i).join("."), o = t[n].split("."), l = o.pop(), a = o.join(".");
    Lt.route(r, s, a, l);
  });
}
function Cb(e) {
  return "id" in e && "defaults" in e;
}
class Sb {
  constructor() {
    this.controllers = new uo(mn, "datasets", !0), this.elements = new uo(di, "elements"), this.plugins = new uo(Object, "plugins"), this.scales = new uo(zi, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, n, i) {
    [
      ...n
    ].forEach((s) => {
      const r = i || this._getRegistryForType(s);
      i || r.isForType(s) || r === this.plugins && s.id ? this._exec(t, r, s) : _t(s, (o) => {
        const l = i || this._getRegistryForType(o);
        this._exec(t, l, o);
      });
    });
  }
  _exec(t, n, i) {
    const s = Va(t);
    Ot(i["before" + s], [], i), n[t](i), Ot(i["after" + s], [], i);
  }
  _getRegistryForType(t) {
    for (let n = 0; n < this._typedRegistries.length; n++) {
      const i = this._typedRegistries[n];
      if (i.isForType(t))
        return i;
    }
    return this.plugins;
  }
  _get(t, n, i) {
    const s = n.get(t);
    if (s === void 0)
      throw new Error('"' + t + '" is not a registered ' + i + ".");
    return s;
  }
}
var qe = /* @__PURE__ */ new Sb();
class Eb {
  constructor() {
    this._init = [];
  }
  notify(t, n, i, s) {
    n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
    const r = s ? this._descriptors(t).filter(s) : this._descriptors(t), o = this._notify(r, t, n, i);
    return n === "afterDestroy" && (this._notify(r, t, "stop"), this._notify(this._init, t, "uninstall")), o;
  }
  _notify(t, n, i, s) {
    s = s || {};
    for (const r of t) {
      const o = r.plugin, l = o[i], a = [
        n,
        s,
        r.options
      ];
      if (Ot(l, a, o) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    gt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const i = t && t.config, s = mt(i.options && i.options.plugins, {}), r = Pb(i);
    return s === !1 && !n ? [] : Nb(t, r, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], i = this._cache, s = (r, o) => r.filter((l) => !o.some((a) => l.plugin.id === a.plugin.id));
    this._notify(s(n, i), t, "stop"), this._notify(s(i, n), t, "start");
  }
}
function Pb(e) {
  const t = {}, n = [], i = Object.keys(qe.plugins.items);
  for (let r = 0; r < i.length; r++)
    n.push(qe.getPlugin(i[r]));
  const s = e.plugins || [];
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    n.indexOf(o) === -1 && (n.push(o), t[o.id] = !0);
  }
  return {
    plugins: n,
    localIds: t
  };
}
function Db(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Nb(e, { plugins: t, localIds: n }, i, s) {
  const r = [], o = e.getContext();
  for (const l of t) {
    const a = l.id, c = Db(i[a], s);
    c !== null && r.push({
      plugin: l,
      options: Ob(e.config, {
        plugin: l,
        local: n[a]
      }, c, o)
    });
  }
  return r;
}
function Ob(e, { plugin: t, local: n }, i, s) {
  const r = e.pluginScopeKeys(t), o = e.getOptionScopes(i, r);
  return n && t.defaults && o.push(t.defaults), e.createResolver(o, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Xl(e, t) {
  const n = Lt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Rb(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Ab(e, t) {
  return e === t ? "_index_" : "_value_";
}
function sd(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Fb(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Kl(e, ...t) {
  if (sd(e))
    return e;
  for (const n of t) {
    const i = n.axis || Fb(n.position) || e.length > 1 && sd(e[0].toLowerCase());
    if (i)
      return i;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function od(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Tb(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((i) => i.xAxisID === e || i.yAxisID === e);
    if (n.length)
      return od(e, "x", n[0]) || od(e, "y", n[0]);
  }
  return {};
}
function Lb(e, t) {
  const n = hi[e.type] || {
    scales: {}
  }, i = t.scales || {}, s = Xl(e.type, t), r = /* @__PURE__ */ Object.create(null);
  return Object.keys(i).forEach((o) => {
    const l = i[o];
    if (!dt(l))
      return console.error(`Invalid scale configuration for scale: ${o}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
    const a = Kl(o, l, Tb(o, e), Lt.scales[l.type]), c = Ab(a, s), h = n.scales || {};
    r[o] = bs(/* @__PURE__ */ Object.create(null), [
      {
        axis: a
      },
      l,
      h[a],
      h[c]
    ]);
  }), e.data.datasets.forEach((o) => {
    const l = o.type || e.type, a = o.indexAxis || Xl(l, t), h = (hi[l] || {}).scales || {};
    Object.keys(h).forEach((d) => {
      const u = Rb(d, a), f = o[u + "AxisID"] || u;
      r[f] = r[f] || /* @__PURE__ */ Object.create(null), bs(r[f], [
        {
          axis: u
        },
        i[f],
        h[d]
      ]);
    });
  }), Object.keys(r).forEach((o) => {
    const l = r[o];
    bs(l, [
      Lt.scales[l.type],
      Lt.scale
    ]);
  }), r;
}
function f1(e) {
  const t = e.options || (e.options = {});
  t.plugins = mt(t.plugins, {}), t.scales = Lb(e, t);
}
function p1(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Ib(e) {
  return e = e || {}, e.data = p1(e.data), f1(e), e;
}
const rd = /* @__PURE__ */ new Map(), g1 = /* @__PURE__ */ new Set();
function fo(e, t) {
  let n = rd.get(e);
  return n || (n = t(), rd.set(e, n), g1.add(n)), n;
}
const is = (e, t, n) => {
  const i = An(t, n);
  i !== void 0 && e.add(i);
};
class Vb {
  constructor(t) {
    this._config = Ib(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = p1(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), f1(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return fo(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return fo(`${t}.transition.${n}`, () => [
      [
        `datasets.${t}.transitions.${n}`,
        `transitions.${n}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, n) {
    return fo(`${t}-${n}`, () => [
      [
        `datasets.${t}.elements.${n}`,
        `datasets.${t}`,
        `elements.${n}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const n = t.id, i = this.type;
    return fo(`${i}-plugin-${n}`, () => [
      [
        `plugins.${n}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, n) {
    const i = this._scopeCache;
    let s = i.get(t);
    return (!s || n) && (s = /* @__PURE__ */ new Map(), i.set(t, s)), s;
  }
  getOptionScopes(t, n, i) {
    const { options: s, type: r } = this, o = this._cachedScopes(t, i), l = o.get(n);
    if (l)
      return l;
    const a = /* @__PURE__ */ new Set();
    n.forEach((h) => {
      t && (a.add(t), h.forEach((d) => is(a, t, d))), h.forEach((d) => is(a, s, d)), h.forEach((d) => is(a, hi[r] || {}, d)), h.forEach((d) => is(a, Lt, d)), h.forEach((d) => is(a, Gl, d));
    });
    const c = Array.from(a);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), g1.has(n) && o.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      hi[n] || {},
      Lt.datasets[n] || {},
      {
        type: n
      },
      Lt,
      Gl
    ];
  }
  resolveNamedOptions(t, n, i, s = [
    ""
  ]) {
    const r = {
      $shared: !0
    }, { resolver: o, subPrefixes: l } = ld(this._resolverCache, t, s);
    let a = o;
    if (Bb(o, n)) {
      r.$shared = !1, i = Fn(i) ? i() : i;
      const c = this.createResolver(t, i, l);
      a = Ti(o, i, c);
    }
    for (const c of n)
      r[c] = a[c];
    return r;
  }
  createResolver(t, n, i = [
    ""
  ], s) {
    const { resolver: r } = ld(this._resolverCache, t, i);
    return dt(n) ? Ti(r, n, void 0, s) : r;
  }
}
function ld(e, t, n) {
  let i = e.get(t);
  i || (i = /* @__PURE__ */ new Map(), e.set(t, i));
  const s = n.join();
  let r = i.get(s);
  return r || (r = {
    resolver: Ya(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, i.set(s, r)), r;
}
const $b = (e) => dt(e) && Object.getOwnPropertyNames(e).some((t) => Fn(e[t]));
function Bb(e, t) {
  const { isScriptable: n, isIndexable: i } = Kf(e);
  for (const s of t) {
    const r = n(s), o = i(s), l = (o || r) && e[s];
    if (r && (Fn(l) || $b(l)) || o && Dt(l))
      return !0;
  }
  return !1;
}
var zb = "4.4.9";
const Hb = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function ad(e, t) {
  return e === "top" || e === "bottom" || Hb.indexOf(e) === -1 && t === "x";
}
function cd(e, t) {
  return function(n, i) {
    return n[e] === i[e] ? n[t] - i[t] : n[e] - i[e];
  };
}
function hd(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Ot(n && n.onComplete, [
    e
  ], t);
}
function jb(e) {
  const t = e.chart, n = t.options.animation;
  Ot(n && n.onProgress, [
    e
  ], t);
}
function m1(e) {
  return Ka() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Lo = {}, dd = (e) => {
  const t = m1(e);
  return Object.values(Lo).filter((n) => n.canvas === t).pop();
};
function Wb(e, t, n) {
  const i = Object.keys(e);
  for (const s of i) {
    const r = +s;
    if (r >= t) {
      const o = e[s];
      delete e[s], (n > 0 || r > t) && (e[r + n] = o);
    }
  }
}
function qb(e, t, n, i) {
  return !n || e.type === "mouseout" ? null : i ? t : e;
}
class ut {
  static register(...t) {
    qe.add(...t), ud();
  }
  static unregister(...t) {
    qe.remove(...t), ud();
  }
  constructor(t, n) {
    const i = this.config = new Vb(n), s = m1(t), r = dd(s);
    if (r)
      throw new Error("Canvas is already in use. Chart with ID '" + r.id + "' must be destroyed before the canvas with ID '" + r.canvas.id + "' can be reused.");
    const o = i.createResolver(i.chartOptionScopes(), this.getContext());
    this.platform = new (i.platform || cb(s))(), this.platform.updateConfig(i);
    const l = this.platform.acquireContext(s, o.aspectRatio), a = l && l.canvas, c = a && a.height, h = a && a.width;
    if (this.id = zm(), this.ctx = l, this.canvas = a, this.width = h, this.height = c, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Eb(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = o0((d) => this.update(d), o.resizeDelay || 0), this._dataChanges = [], Lo[this.id] = this, !l || !a) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    ln.listen(this, "complete", hd), ln.listen(this, "progress", jb), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: i, height: s, _aspectRatio: r } = this;
    return gt(t) ? n && r ? r : s ? i / s : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return qe;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Fh(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Oh(this.canvas, this.ctx), this;
  }
  stop() {
    return ln.stop(this), this;
  }
  resize(t, n) {
    ln.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const i = this.options, s = this.canvas, r = i.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(s, t, n, r), l = i.devicePixelRatio || this.platform.getDevicePixelRatio(), a = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, Fh(this, l, !0) && (this.notifyPlugins("resize", {
      size: o
    }), Ot(i.onResize, [
      this,
      o
    ], this), this.attached && this._doResize(a) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    _t(n, (i, s) => {
      i.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, i = this.scales, s = Object.keys(i).reduce((o, l) => (o[l] = !1, o), {});
    let r = [];
    n && (r = r.concat(Object.keys(n).map((o) => {
      const l = n[o], a = Kl(o, l), c = a === "r", h = a === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), _t(r, (o) => {
      const l = o.options, a = l.id, c = Kl(a, l), h = mt(l.type, o.dtype);
      (l.position === void 0 || ad(l.position, c) !== ad(o.dposition)) && (l.position = o.dposition), s[a] = !0;
      let d = null;
      if (a in i && i[a].type === h)
        d = i[a];
      else {
        const u = qe.getScale(h);
        d = new u({
          id: a,
          type: h,
          ctx: this.ctx,
          chart: this
        }), i[d.id] = d;
      }
      d.init(l, t);
    }), _t(s, (o, l) => {
      o || delete i[l];
    }), _t(i, (o) => {
      co.configure(this, o, o.options), co.addBox(this, o);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, i = t.length;
    if (t.sort((s, r) => s.index - r.index), i > n) {
      for (let s = n; s < i; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, i - n);
    }
    this._sortedMetasets = t.slice(0).sort(cd("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: n } } = this;
    t.length > n.length && delete this._stacks, t.forEach((i, s) => {
      n.filter((r) => r === i._dataset).length === 0 && this._destroyDatasetMeta(s);
    });
  }
  buildOrUpdateControllers() {
    const t = [], n = this.data.datasets;
    let i, s;
    for (this._removeUnreferencedMetasets(), i = 0, s = n.length; i < s; i++) {
      const r = n[i];
      let o = this.getDatasetMeta(i);
      const l = r.type || this.config.type;
      if (o.type && o.type !== l && (this._destroyDatasetMeta(i), o = this.getDatasetMeta(i)), o.type = l, o.indexAxis = r.indexAxis || Xl(l, this.options), o.order = r.order || 0, o.index = i, o.label = "" + r.label, o.visible = this.isDatasetVisible(i), o.controller)
        o.controller.updateIndex(i), o.controller.linkScales();
      else {
        const a = qe.getController(l), { datasetElementType: c, dataElementType: h } = Lt.datasets[l];
        Object.assign(a, {
          dataElementType: qe.getElement(h),
          datasetElementType: c && qe.getElement(c)
        }), o.controller = new a(this, i), t.push(o.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    _t(this.data.datasets, (t, n) => {
      this.getDatasetMeta(n).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const n = this.config;
    n.update();
    const i = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !i.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const r = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let o = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: d } = this.getDatasetMeta(c), u = !s && r.indexOf(d) === -1;
      d.buildOrUpdateElements(u), o = Math.max(+d.getMaxOverflow(), o);
    }
    o = this._minPadding = i.layout.autoPadding ? o : 0, this._updateLayout(o), s || _t(r, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(cd("z", "_idx"));
    const { _active: l, _lastEvent: a } = this;
    a ? this._eventHandler(a, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    _t(this.scales, (t) => {
      co.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), i = new Set(t.events);
    (!kh(n, i) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: i, start: s, count: r } of n) {
      const o = i === "_removeElements" ? -r : r;
      Wb(t, s, o);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, i = (r) => new Set(t.filter((o) => o[0] === r).map((o, l) => l + "," + o.splice(1).join(","))), s = i(0);
    for (let r = 1; r < n; r++)
      if (!kh(s, i(r)))
        return;
    return Array.from(s).map((r) => r.split(",")).map((r) => ({
      method: r[1],
      start: +r[2],
      count: +r[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    co.update(this, this.width, this.height, t);
    const n = this.chartArea, i = n.width <= 0 || n.height <= 0;
    this._layers = [], _t(this.boxes, (s) => {
      i && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()));
    }, this), this._layers.forEach((s, r) => {
      s._idx = r;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let n = 0, i = this.data.datasets.length; n < i; ++n)
        this.getDatasetMeta(n).controller.configure();
      for (let n = 0, i = this.data.datasets.length; n < i; ++n)
        this._updateDataset(n, Fn(t) ? t({
          datasetIndex: n
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, n) {
    const i = this.getDatasetMeta(t), s = {
      meta: i,
      index: t,
      mode: n,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (i.controller._update(n), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (ln.has(this) ? this.attached && !ln.running(this) && ln.start(this) : (this.draw(), hd({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: i, height: s } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(i, s);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const n = this._layers;
    for (t = 0; t < n.length && n[t].z <= 0; ++t)
      n[t].draw(this.chartArea);
    for (this._drawDatasets(); t < n.length; ++t)
      n[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const n = this._sortedMetasets, i = [];
    let s, r;
    for (s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      (!t || o.visible) && i.push(o);
    }
    return i;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let n = t.length - 1; n >= 0; --n)
      this._drawDataset(t[n]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const n = this.ctx, i = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, s = s1(this, t);
    this.notifyPlugins("beforeDatasetDraw", i) !== !1 && (s && Wa(n, s), t.controller.draw(), s && qa(n), i.cancelable = !1, this.notifyPlugins("afterDatasetDraw", i));
  }
  isPointInArea(t) {
    return fn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, i, s) {
    const r = Hv.modes[n];
    return typeof r == "function" ? r(this, t, i, s) : [];
  }
  getDatasetMeta(t) {
    const n = this.data.datasets[t], i = this._metasets;
    let s = i.filter((r) => r && r._dataset === n).pop();
    return s || (s = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: n && n.order || 0,
      index: t,
      _dataset: n,
      _parsed: [],
      _sorted: !1
    }, i.push(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Tn(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const n = this.data.datasets[t];
    if (!n)
      return !1;
    const i = this.getDatasetMeta(t);
    return typeof i.hidden == "boolean" ? !i.hidden : !n.hidden;
  }
  setDatasetVisibility(t, n) {
    const i = this.getDatasetMeta(t);
    i.hidden = !n;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, n, i) {
    const s = i ? "show" : "hide", r = this.getDatasetMeta(t), o = r.controller._resolveAnimations(void 0, s);
    Ds(n) ? (r.data[n].hidden = !i, this.update()) : (this.setDatasetVisibility(t, i), o.update(r, {
      visible: i
    }), this.update((l) => l.datasetIndex === t ? s : void 0));
  }
  hide(t, n) {
    this._updateVisibility(t, n, !1);
  }
  show(t, n) {
    this._updateVisibility(t, n, !0);
  }
  _destroyDatasetMeta(t) {
    const n = this._metasets[t];
    n && n.controller && n.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, n;
    for (this.stop(), ln.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Oh(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Lo[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, i = (r, o) => {
      n.addEventListener(this, r, o), t[r] = o;
    }, s = (r, o, l) => {
      r.offsetX = o, r.offsetY = l, this._eventHandler(r);
    };
    _t(this.options.events, (r) => i(r, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, i = (a, c) => {
      n.addEventListener(this, a, c), t[a] = c;
    }, s = (a, c) => {
      t[a] && (n.removeEventListener(this, a, c), delete t[a]);
    }, r = (a, c) => {
      this.canvas && this.resize(a, c);
    };
    let o;
    const l = () => {
      s("attach", l), this.attached = !0, this.resize(), i("resize", r), i("detach", o);
    };
    o = () => {
      this.attached = !1, s("resize", r), this._stop(), this._resize(0, 0), i("attach", l);
    }, n.isAttached(this.canvas) ? l() : o();
  }
  unbindEvents() {
    _t(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, _t(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, i) {
    const s = i ? "set" : "remove";
    let r, o, l, a;
    for (n === "dataset" && (r = this.getDatasetMeta(t[0].datasetIndex), r.controller["_" + s + "DatasetHoverStyle"]()), l = 0, a = t.length; l < a; ++l) {
      o = t[l];
      const c = o && this.getDatasetMeta(o.datasetIndex).controller;
      c && c[s + "HoverStyle"](o.element, o.datasetIndex, o.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], i = t.map(({ datasetIndex: r, index: o }) => {
      const l = this.getDatasetMeta(r);
      if (!l)
        throw new Error("No dataset found at index " + r);
      return {
        datasetIndex: r,
        element: l.data[o],
        index: o
      };
    });
    !er(i, n) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, n));
  }
  notifyPlugins(t, n, i) {
    return this._plugins.notify(this, t, n, i);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, i) {
    const s = this.options.hover, r = (a, c) => a.filter((h) => !c.some((d) => h.datasetIndex === d.datasetIndex && h.index === d.index)), o = r(n, t), l = i ? t : r(t, n);
    o.length && this.updateHoverStyle(o, s.mode, !1), l.length && s.mode && this.updateHoverStyle(l, s.mode, !0);
  }
  _eventHandler(t, n) {
    const i = {
      event: t,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, s = (o) => (o.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", i, s) === !1)
      return;
    const r = this._handleEvent(t, n, i.inChartArea);
    return i.cancelable = !1, this.notifyPlugins("afterEvent", i, s), (r || i.changed) && this.render(), this;
  }
  _handleEvent(t, n, i) {
    const { _active: s = [], options: r } = this, o = n, l = this._getActiveElements(t, s, i, o), a = Ym(t), c = qb(t, this._lastEvent, i, a);
    i && (this._lastEvent = null, Ot(r.onHover, [
      t,
      l,
      this
    ], this), a && Ot(r.onClick, [
      t,
      l,
      this
    ], this));
    const h = !er(l, s);
    return (h || n) && (this._active = l, this._updateHoverStyles(l, s, n)), this._lastEvent = c, h;
  }
  _getActiveElements(t, n, i, s) {
    if (t.type === "mouseout")
      return [];
    if (!i)
      return n;
    const r = this.options.hover;
    return this.getElementsAtEventForMode(t, r.mode, r, s);
  }
}
Y(ut, "defaults", Lt), Y(ut, "instances", Lo), Y(ut, "overrides", hi), Y(ut, "registry", qe), Y(ut, "version", zb), Y(ut, "getChart", dd);
function ud() {
  return _t(ut.instances, (e) => e._plugins.invalidate());
}
function Gb(e, t, n) {
  const { startAngle: i, pixelMargin: s, x: r, y: o, outerRadius: l, innerRadius: a } = t;
  let c = s / l;
  e.beginPath(), e.arc(r, o, l, i - c, n + c), a > s ? (c = s / a, e.arc(r, o, a, n + c, i - c, !0)) : e.arc(r, o, s, n + Tt, i - Tt), e.closePath(), e.clip();
}
function Yb(e) {
  return Ga(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Ub(e, t, n, i) {
  const s = Yb(e.options.borderRadius), r = (n - t) / 2, o = Math.min(r, i * t / 2), l = (a) => {
    const c = (n - Math.min(r, a)) * i / 2;
    return Kt(a, 0, Math.min(r, c));
  };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: Kt(s.innerStart, 0, o),
    innerEnd: Kt(s.innerEnd, 0, o)
  };
}
function xi(e, t, n, i) {
  return {
    x: n + e * Math.cos(t),
    y: i + e * Math.sin(t)
  };
}
function cr(e, t, n, i, s, r) {
  const { x: o, y: l, startAngle: a, pixelMargin: c, innerRadius: h } = t, d = Math.max(t.outerRadius + i + n - c, 0), u = h > 0 ? h + i + n + c : 0;
  let f = 0;
  const g = s - a;
  if (i) {
    const st = h > 0 ? h - i : 0, et = d > 0 ? d - i : 0, U = (st + et) / 2, Z = U !== 0 ? g * U / (U + i) : g;
    f = (g - Z) / 2;
  }
  const m = Math.max(1e-3, g * d - n / Rt) / d, v = (g - m) / 2, b = a + v + f, _ = s - v - f, { outerStart: S, outerEnd: E, innerStart: k, innerEnd: N } = Ub(t, u, d, _ - b), w = d - S, P = d - E, O = b + S / w, F = _ - E / P, R = u + k, j = u + N, J = b + k / R, kt = _ - N / j;
  if (e.beginPath(), r) {
    const st = (O + F) / 2;
    if (e.arc(o, l, d, O, st), e.arc(o, l, d, st, F), E > 0) {
      const ct = xi(P, F, o, l);
      e.arc(ct.x, ct.y, E, F, _ + Tt);
    }
    const et = xi(j, _, o, l);
    if (e.lineTo(et.x, et.y), N > 0) {
      const ct = xi(j, kt, o, l);
      e.arc(ct.x, ct.y, N, _ + Tt, kt + Math.PI);
    }
    const U = (_ - N / u + (b + k / u)) / 2;
    if (e.arc(o, l, u, _ - N / u, U, !0), e.arc(o, l, u, U, b + k / u, !0), k > 0) {
      const ct = xi(R, J, o, l);
      e.arc(ct.x, ct.y, k, J + Math.PI, b - Tt);
    }
    const Z = xi(w, b, o, l);
    if (e.lineTo(Z.x, Z.y), S > 0) {
      const ct = xi(w, O, o, l);
      e.arc(ct.x, ct.y, S, b - Tt, O);
    }
  } else {
    e.moveTo(o, l);
    const st = Math.cos(O) * d + o, et = Math.sin(O) * d + l;
    e.lineTo(st, et);
    const U = Math.cos(F) * d + o, Z = Math.sin(F) * d + l;
    e.lineTo(U, Z);
  }
  e.closePath();
}
function Xb(e, t, n, i, s) {
  const { fullCircles: r, startAngle: o, circumference: l } = t;
  let a = t.endAngle;
  if (r) {
    cr(e, t, n, i, a, s);
    for (let c = 0; c < r; ++c)
      e.fill();
    isNaN(l) || (a = o + (l % Pt || Pt));
  }
  return cr(e, t, n, i, a, s), e.fill(), a;
}
function Kb(e, t, n, i, s) {
  const { fullCircles: r, startAngle: o, circumference: l, options: a } = t, { borderWidth: c, borderJoinStyle: h, borderDash: d, borderDashOffset: u } = a, f = a.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(d || []), e.lineDashOffset = u, f ? (e.lineWidth = c * 2, e.lineJoin = h || "round") : (e.lineWidth = c, e.lineJoin = h || "bevel");
  let g = t.endAngle;
  if (r) {
    cr(e, t, n, i, g, s);
    for (let m = 0; m < r; ++m)
      e.stroke();
    isNaN(l) || (g = o + (l % Pt || Pt));
  }
  f && Gb(e, t, g), r || (cr(e, t, n, i, g, s), e.stroke());
}
class as extends di {
  constructor(n) {
    super();
    Y(this, "circumference");
    Y(this, "endAngle");
    Y(this, "fullCircles");
    Y(this, "innerRadius");
    Y(this, "outerRadius");
    Y(this, "pixelMargin");
    Y(this, "startAngle");
    this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, n && Object.assign(this, n);
  }
  inRange(n, i, s) {
    const r = this.getProps([
      "x",
      "y"
    ], s), { angle: o, distance: l } = Hf(r, {
      x: n,
      y: i
    }), { startAngle: a, endAngle: c, innerRadius: h, outerRadius: d, circumference: u } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), f = (this.options.spacing + this.options.borderWidth) / 2, g = mt(u, c - a), m = Ns(o, a, c) && a !== c, v = g >= Pt || m, b = Os(l, h + f, d + f);
    return v && b;
  }
  getCenterPoint(n) {
    const { x: i, y: s, startAngle: r, endAngle: o, innerRadius: l, outerRadius: a } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], n), { offset: c, spacing: h } = this.options, d = (r + o) / 2, u = (l + a + h + c) / 2;
    return {
      x: i + Math.cos(d) * u,
      y: s + Math.sin(d) * u
    };
  }
  tooltipPosition(n) {
    return this.getCenterPoint(n);
  }
  draw(n) {
    const { options: i, circumference: s } = this, r = (i.offset || 0) / 4, o = (i.spacing || 0) / 2, l = i.circular;
    if (this.pixelMargin = i.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > Pt ? Math.floor(s / Pt) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    n.save();
    const a = (this.startAngle + this.endAngle) / 2;
    n.translate(Math.cos(a) * r, Math.sin(a) * r);
    const c = 1 - Math.sin(Math.min(Rt, s || 0)), h = r * c;
    n.fillStyle = i.backgroundColor, n.strokeStyle = i.borderColor, Xb(n, this, h, o, l), Kb(n, this, h, o, l), n.restore();
  }
}
Y(as, "id", "arc"), Y(as, "defaults", {
  borderAlign: "center",
  borderColor: "#fff",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: !0
}), Y(as, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), Y(as, "descriptors", {
  _scriptable: !0,
  _indexable: (n) => n !== "borderDash"
});
function v1(e, t, n = t) {
  e.lineCap = mt(n.borderCapStyle, t.borderCapStyle), e.setLineDash(mt(n.borderDash, t.borderDash)), e.lineDashOffset = mt(n.borderDashOffset, t.borderDashOffset), e.lineJoin = mt(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = mt(n.borderWidth, t.borderWidth), e.strokeStyle = mt(n.borderColor, t.borderColor);
}
function Jb(e, t, n) {
  e.lineTo(n.x, n.y);
}
function Zb(e) {
  return e.stepped ? y0 : e.tension || e.cubicInterpolationMode === "monotone" ? x0 : Jb;
}
function b1(e, t, n = {}) {
  const i = e.length, { start: s = 0, end: r = i - 1 } = n, { start: o, end: l } = t, a = Math.max(s, o), c = Math.min(r, l), h = s < o && r < o || s > l && r > l;
  return {
    count: i,
    start: a,
    loop: t.loop,
    ilen: c < a && !h ? i + c - a : c - a
  };
}
function Qb(e, t, n, i) {
  const { points: s, options: r } = t, { count: o, start: l, loop: a, ilen: c } = b1(s, n, i), h = Zb(r);
  let { move: d = !0, reverse: u } = i || {}, f, g, m;
  for (f = 0; f <= c; ++f)
    g = s[(l + (u ? c - f : f)) % o], !g.skip && (d ? (e.moveTo(g.x, g.y), d = !1) : h(e, m, g, u, r.stepped), m = g);
  return a && (g = s[(l + (u ? c : 0)) % o], h(e, m, g, u, r.stepped)), !!a;
}
function t4(e, t, n, i) {
  const s = t.points, { count: r, start: o, ilen: l } = b1(s, n, i), { move: a = !0, reverse: c } = i || {};
  let h = 0, d = 0, u, f, g, m, v, b;
  const _ = (E) => (o + (c ? l - E : E)) % r, S = () => {
    m !== v && (e.lineTo(h, v), e.lineTo(h, m), e.lineTo(h, b));
  };
  for (a && (f = s[_(0)], e.moveTo(f.x, f.y)), u = 0; u <= l; ++u) {
    if (f = s[_(u)], f.skip)
      continue;
    const E = f.x, k = f.y, N = E | 0;
    N === g ? (k < m ? m = k : k > v && (v = k), h = (d * h + E) / ++d) : (S(), e.lineTo(E, k), g = N, d = 0, m = v = k), b = k;
  }
  S();
}
function Jl(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? t4 : Qb;
}
function e4(e) {
  return e.stepped ? Q0 : e.tension || e.cubicInterpolationMode === "monotone" ? tv : Un;
}
function n4(e, t, n, i) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, i) && s.closePath()), v1(e, t.options), e.stroke(s);
}
function i4(e, t, n, i) {
  const { segments: s, options: r } = t, o = Jl(t);
  for (const l of s)
    v1(e, r, l.style), e.beginPath(), o(e, t, l, {
      start: n,
      end: n + i - 1
    }) && e.closePath(), e.stroke();
}
const s4 = typeof Path2D == "function";
function o4(e, t, n, i) {
  s4 && !t.options.segment ? n4(e, t, n, i) : i4(e, t, n, i);
}
class pn extends di {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, n) {
    const i = this.options;
    if ((i.tension || i.cubicInterpolationMode === "monotone") && !i.stepped && !this._pointsUpdated) {
      const s = i.spanGaps ? this._loop : this._fullLoop;
      q0(this._points, i, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = av(this, this.options.segment));
  }
  first() {
    const t = this.segments, n = this.points;
    return t.length && n[t[0].start];
  }
  last() {
    const t = this.segments, n = this.points, i = t.length;
    return i && n[t[i - 1].end];
  }
  interpolate(t, n) {
    const i = this.options, s = t[n], r = this.points, o = i1(this, {
      property: n,
      start: s,
      end: s
    });
    if (!o.length)
      return;
    const l = [], a = e4(i);
    let c, h;
    for (c = 0, h = o.length; c < h; ++c) {
      const { start: d, end: u } = o[c], f = r[d], g = r[u];
      if (f === g) {
        l.push(f);
        continue;
      }
      const m = Math.abs((s - f[n]) / (g[n] - f[n])), v = a(f, g, m, i.stepped);
      v[n] = t[n], l.push(v);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, i) {
    return Jl(this)(t, this, n, i);
  }
  path(t, n, i) {
    const s = this.segments, r = Jl(this);
    let o = this._loop;
    n = n || 0, i = i || this.points.length - n;
    for (const l of s)
      o &= r(t, this, l, {
        start: n,
        end: n + i - 1
      });
    return !!o;
  }
  draw(t, n, i, s) {
    const r = this.options || {};
    (this.points || []).length && r.borderWidth && (t.save(), o4(t, this, i, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
Y(pn, "id", "line"), Y(pn, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}), Y(pn, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), Y(pn, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function fd(e, t, n, i) {
  const s = e.options, { [n]: r } = e.getProps([
    n
  ], i);
  return Math.abs(t - r) < s.radius + s.hitRadius;
}
class Io extends di {
  constructor(n) {
    super();
    Y(this, "parsed");
    Y(this, "skip");
    Y(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, n && Object.assign(this, n);
  }
  inRange(n, i, s) {
    const r = this.options, { x: o, y: l } = this.getProps([
      "x",
      "y"
    ], s);
    return Math.pow(n - o, 2) + Math.pow(i - l, 2) < Math.pow(r.hitRadius + r.radius, 2);
  }
  inXRange(n, i) {
    return fd(this, n, "x", i);
  }
  inYRange(n, i) {
    return fd(this, n, "y", i);
  }
  getCenterPoint(n) {
    const { x: i, y: s } = this.getProps([
      "x",
      "y"
    ], n);
    return {
      x: i,
      y: s
    };
  }
  size(n) {
    n = n || this.options || {};
    let i = n.radius || 0;
    i = Math.max(i, i && n.hoverRadius || 0);
    const s = i && n.borderWidth || 0;
    return (i + s) * 2;
  }
  draw(n, i) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !fn(this, i, this.size(s) / 2) || (n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.fillStyle = s.backgroundColor, Yl(n, s, this.x, this.y));
  }
  getRange() {
    const n = this.options || {};
    return n.radius + n.hitRadius;
  }
}
Y(Io, "id", "point"), /**
* @type {any}
*/
Y(Io, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}), /**
* @type {any}
*/
Y(Io, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function y1(e, t) {
  const { x: n, y: i, base: s, width: r, height: o } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, a, c, h, d;
  return e.horizontal ? (d = o / 2, l = Math.min(n, s), a = Math.max(n, s), c = i - d, h = i + d) : (d = r / 2, l = n - d, a = n + d, c = Math.min(i, s), h = Math.max(i, s)), {
    left: l,
    top: c,
    right: a,
    bottom: h
  };
}
function Pn(e, t, n, i) {
  return e ? 0 : Kt(t, n, i);
}
function r4(e, t, n) {
  const i = e.options.borderWidth, s = e.borderSkipped, r = Xf(i);
  return {
    t: Pn(s.top, r.top, 0, n),
    r: Pn(s.right, r.right, 0, t),
    b: Pn(s.bottom, r.bottom, 0, n),
    l: Pn(s.left, r.left, 0, t)
  };
}
function l4(e, t, n) {
  const { enableBorderRadius: i } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, r = Ri(s), o = Math.min(t, n), l = e.borderSkipped, a = i || dt(s);
  return {
    topLeft: Pn(!a || l.top || l.left, r.topLeft, 0, o),
    topRight: Pn(!a || l.top || l.right, r.topRight, 0, o),
    bottomLeft: Pn(!a || l.bottom || l.left, r.bottomLeft, 0, o),
    bottomRight: Pn(!a || l.bottom || l.right, r.bottomRight, 0, o)
  };
}
function a4(e) {
  const t = y1(e), n = t.right - t.left, i = t.bottom - t.top, s = r4(e, n / 2, i / 2), r = l4(e, n / 2, i / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: n,
      h: i,
      radius: r
    },
    inner: {
      x: t.left + s.l,
      y: t.top + s.t,
      w: n - s.l - s.r,
      h: i - s.t - s.b,
      radius: {
        topLeft: Math.max(0, r.topLeft - Math.max(s.t, s.l)),
        topRight: Math.max(0, r.topRight - Math.max(s.t, s.r)),
        bottomLeft: Math.max(0, r.bottomLeft - Math.max(s.b, s.l)),
        bottomRight: Math.max(0, r.bottomRight - Math.max(s.b, s.r))
      }
    }
  };
}
function dl(e, t, n, i) {
  const s = t === null, r = n === null, l = e && !(s && r) && y1(e, i);
  return l && (s || Os(t, l.left, l.right)) && (r || Os(n, l.top, l.bottom));
}
function c4(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function h4(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function ul(e, t, n = {}) {
  const i = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, r = (e.x + e.w !== n.x + n.w ? t : 0) - i, o = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + i,
    y: e.y + s,
    w: e.w + r,
    h: e.h + o,
    radius: e.radius
  };
}
class Vo extends di {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: n, options: { borderColor: i, backgroundColor: s } } = this, { inner: r, outer: o } = a4(this), l = c4(o.radius) ? rr : h4;
    t.save(), (o.w !== r.w || o.h !== r.h) && (t.beginPath(), l(t, ul(o, n, r)), t.clip(), l(t, ul(r, -n, o)), t.fillStyle = i, t.fill("evenodd")), t.beginPath(), l(t, ul(r, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, i) {
    return dl(this, t, n, i);
  }
  inXRange(t, n) {
    return dl(this, t, null, n);
  }
  inYRange(t, n) {
    return dl(this, null, t, n);
  }
  getCenterPoint(t) {
    const { x: n, y: i, base: s, horizontal: r } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: r ? (n + s) / 2 : n,
      y: r ? i : (i + s) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
Y(Vo, "id", "bar"), Y(Vo, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), Y(Vo, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function d4(e, t, n) {
  const i = e.segments, s = e.points, r = t.points, o = [];
  for (const l of i) {
    let { start: a, end: c } = l;
    c = Qa(a, c, s);
    const h = Zl(n, s[a], s[c], l.loop);
    if (!t.segments) {
      o.push({
        source: l,
        target: h,
        start: s[a],
        end: s[c]
      });
      continue;
    }
    const d = i1(t, h);
    for (const u of d) {
      const f = Zl(n, r[u.start], r[u.end], u.loop), g = n1(l, s, f);
      for (const m of g)
        o.push({
          source: m,
          target: u,
          start: {
            [n]: pd(h, f, "start", Math.max)
          },
          end: {
            [n]: pd(h, f, "end", Math.min)
          }
        });
    }
  }
  return o;
}
function Zl(e, t, n, i) {
  if (i)
    return;
  let s = t[e], r = n[e];
  return e === "angle" && (s = pe(s), r = pe(r)), {
    property: e,
    start: s,
    end: r
  };
}
function u4(e, t) {
  const { x: n = null, y: i = null } = e || {}, s = t.points, r = [];
  return t.segments.forEach(({ start: o, end: l }) => {
    l = Qa(o, l, s);
    const a = s[o], c = s[l];
    i !== null ? (r.push({
      x: a.x,
      y: i
    }), r.push({
      x: c.x,
      y: i
    })) : n !== null && (r.push({
      x: n,
      y: a.y
    }), r.push({
      x: n,
      y: c.y
    }));
  }), r;
}
function Qa(e, t, n) {
  for (; t > e; t--) {
    const i = n[t];
    if (!isNaN(i.x) && !isNaN(i.y))
      break;
  }
  return t;
}
function pd(e, t, n, i) {
  return e && t ? i(e[n], t[n]) : e ? e[n] : t ? t[n] : 0;
}
function x1(e, t) {
  let n = [], i = !1;
  return Dt(e) ? (i = !0, n = e) : n = u4(e, t), n.length ? new pn({
    points: n,
    options: {
      tension: 0
    },
    _loop: i,
    _fullLoop: i
  }) : null;
}
function gd(e) {
  return e && e.fill !== !1;
}
function f4(e, t, n) {
  let s = e[t].fill;
  const r = [
    t
  ];
  let o;
  if (!n)
    return s;
  for (; s !== !1 && r.indexOf(s) === -1; ) {
    if (!Gt(s))
      return s;
    if (o = e[s], !o)
      return !1;
    if (o.visible)
      return s;
    r.push(s), s = o.fill;
  }
  return !1;
}
function p4(e, t, n) {
  const i = b4(e);
  if (dt(i))
    return isNaN(i.value) ? !1 : i;
  let s = parseFloat(i);
  return Gt(s) && Math.floor(s) === s ? g4(i[0], t, s, n) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(i) >= 0 && i;
}
function g4(e, t, n, i) {
  return (e === "-" || e === "+") && (n = t + n), n === t || n < 0 || n >= i ? !1 : n;
}
function m4(e, t) {
  let n = null;
  return e === "start" ? n = t.bottom : e === "end" ? n = t.top : dt(e) ? n = t.getPixelForValue(e.value) : t.getBasePixel && (n = t.getBasePixel()), n;
}
function v4(e, t, n) {
  let i;
  return e === "start" ? i = n : e === "end" ? i = t.options.reverse ? t.min : t.max : dt(e) ? i = e.value : i = t.getBaseValue(), i;
}
function b4(e) {
  const t = e.options, n = t.fill;
  let i = mt(n && n.target, n);
  return i === void 0 && (i = !!t.backgroundColor), i === !1 || i === null ? !1 : i === !0 ? "origin" : i;
}
function y4(e) {
  const { scale: t, index: n, line: i } = e, s = [], r = i.segments, o = i.points, l = x4(t, n);
  l.push(x1({
    x: null,
    y: t.bottom
  }, i));
  for (let a = 0; a < r.length; a++) {
    const c = r[a];
    for (let h = c.start; h <= c.end; h++)
      k4(s, o[h], l);
  }
  return new pn({
    points: s,
    options: {}
  });
}
function x4(e, t) {
  const n = [], i = e.getMatchingVisibleMetas("line");
  for (let s = 0; s < i.length; s++) {
    const r = i[s];
    if (r.index === t)
      break;
    r.hidden || n.unshift(r.dataset);
  }
  return n;
}
function k4(e, t, n) {
  const i = [];
  for (let s = 0; s < n.length; s++) {
    const r = n[s], { first: o, last: l, point: a } = w4(r, t, "x");
    if (!(!a || o && l)) {
      if (o)
        i.unshift(a);
      else if (e.push(a), !l)
        break;
    }
  }
  e.push(...i);
}
function w4(e, t, n) {
  const i = e.interpolate(t, n);
  if (!i)
    return {};
  const s = i[n], r = e.segments, o = e.points;
  let l = !1, a = !1;
  for (let c = 0; c < r.length; c++) {
    const h = r[c], d = o[h.start][n], u = o[h.end][n];
    if (Os(s, d, u)) {
      l = s === d, a = s === u;
      break;
    }
  }
  return {
    first: l,
    last: a,
    point: i
  };
}
class k1 {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, n, i) {
    const { x: s, y: r, radius: o } = this;
    return n = n || {
      start: 0,
      end: Pt
    }, t.arc(s, r, o, n.end, n.start, !0), !i.bounds;
  }
  interpolate(t) {
    const { x: n, y: i, radius: s } = this, r = t.angle;
    return {
      x: n + Math.cos(r) * s,
      y: i + Math.sin(r) * s,
      angle: r
    };
  }
}
function _4(e) {
  const { chart: t, fill: n, line: i } = e;
  if (Gt(n))
    return M4(t, n);
  if (n === "stack")
    return y4(e);
  if (n === "shape")
    return !0;
  const s = C4(e);
  return s instanceof k1 ? s : x1(s, i);
}
function M4(e, t) {
  const n = e.getDatasetMeta(t);
  return n && e.isDatasetVisible(t) ? n.dataset : null;
}
function C4(e) {
  return (e.scale || {}).getPointPositionForValue ? E4(e) : S4(e);
}
function S4(e) {
  const { scale: t = {}, fill: n } = e, i = m4(n, t);
  if (Gt(i)) {
    const s = t.isHorizontal();
    return {
      x: s ? i : null,
      y: s ? null : i
    };
  }
  return null;
}
function E4(e) {
  const { scale: t, fill: n } = e, i = t.options, s = t.getLabels().length, r = i.reverse ? t.max : t.min, o = v4(n, t, r), l = [];
  if (i.grid.circular) {
    const a = t.getPointPositionForValue(0, r);
    return new k1({
      x: a.x,
      y: a.y,
      radius: t.getDistanceFromCenterForValue(o)
    });
  }
  for (let a = 0; a < s; ++a)
    l.push(t.getPointPositionForValue(a, o));
  return l;
}
function fl(e, t, n) {
  const i = _4(t), { chart: s, index: r, line: o, scale: l, axis: a } = t, c = o.options, h = c.fill, d = c.backgroundColor, { above: u = d, below: f = d } = h || {}, g = s.getDatasetMeta(r), m = s1(s, g);
  i && o.points.length && (Wa(e, n), P4(e, {
    line: o,
    target: i,
    above: u,
    below: f,
    area: n,
    scale: l,
    axis: a,
    clip: m
  }), qa(e));
}
function P4(e, t) {
  const { line: n, target: i, above: s, below: r, area: o, scale: l, clip: a } = t, c = n._loop ? "angle" : t.axis;
  e.save(), c === "x" && r !== s && (md(e, i, o.top), vd(e, {
    line: n,
    target: i,
    color: s,
    scale: l,
    property: c,
    clip: a
  }), e.restore(), e.save(), md(e, i, o.bottom)), vd(e, {
    line: n,
    target: i,
    color: r,
    scale: l,
    property: c,
    clip: a
  }), e.restore();
}
function md(e, t, n) {
  const { segments: i, points: s } = t;
  let r = !0, o = !1;
  e.beginPath();
  for (const l of i) {
    const { start: a, end: c } = l, h = s[a], d = s[Qa(a, c, s)];
    r ? (e.moveTo(h.x, h.y), r = !1) : (e.lineTo(h.x, n), e.lineTo(h.x, h.y)), o = !!t.pathSegment(e, l, {
      move: o
    }), o ? e.closePath() : e.lineTo(d.x, n);
  }
  e.lineTo(t.first().x, n), e.closePath(), e.clip();
}
function vd(e, t) {
  const { line: n, target: i, property: s, color: r, scale: o, clip: l } = t, a = d4(n, i, s);
  for (const { source: c, target: h, start: d, end: u } of a) {
    const { style: { backgroundColor: f = r } = {} } = c, g = i !== !0;
    e.save(), e.fillStyle = f, D4(e, o, l, g && Zl(s, d, u)), e.beginPath();
    const m = !!n.pathSegment(e, c);
    let v;
    if (g) {
      m ? e.closePath() : bd(e, i, u, s);
      const b = !!i.pathSegment(e, h, {
        move: m,
        reverse: !0
      });
      v = m && b, v || bd(e, i, d, s);
    }
    e.closePath(), e.fill(v ? "evenodd" : "nonzero"), e.restore();
  }
}
function D4(e, t, n, i) {
  const s = t.chart.chartArea, { property: r, start: o, end: l } = i || {};
  if (r === "x" || r === "y") {
    let a, c, h, d;
    r === "x" ? (a = o, c = s.top, h = l, d = s.bottom) : (a = s.left, c = o, h = s.right, d = l), e.beginPath(), n && (a = Math.max(a, n.left), h = Math.min(h, n.right), c = Math.max(c, n.top), d = Math.min(d, n.bottom)), e.rect(a, c, h - a, d - c), e.clip();
  }
}
function bd(e, t, n, i) {
  const s = t.interpolate(n, i);
  s && e.lineTo(s.x, s.y);
}
var N4 = {
  id: "filler",
  afterDatasetsUpdate(e, t, n) {
    const i = (e.data.datasets || []).length, s = [];
    let r, o, l, a;
    for (o = 0; o < i; ++o)
      r = e.getDatasetMeta(o), l = r.dataset, a = null, l && l.options && l instanceof pn && (a = {
        visible: e.isDatasetVisible(o),
        index: o,
        fill: p4(l, o, i),
        chart: e,
        axis: r.controller.options.indexAxis,
        scale: r.vScale,
        line: l
      }), r.$filler = a, s.push(a);
    for (o = 0; o < i; ++o)
      a = s[o], !(!a || a.fill === !1) && (a.fill = f4(s, o, n.propagate));
  },
  beforeDraw(e, t, n) {
    const i = n.drawTime === "beforeDraw", s = e.getSortedVisibleDatasetMetas(), r = e.chartArea;
    for (let o = s.length - 1; o >= 0; --o) {
      const l = s[o].$filler;
      l && (l.line.updateControlPoints(r, l.axis), i && l.fill && fl(e.ctx, l, r));
    }
  },
  beforeDatasetsDraw(e, t, n) {
    if (n.drawTime !== "beforeDatasetsDraw")
      return;
    const i = e.getSortedVisibleDatasetMetas();
    for (let s = i.length - 1; s >= 0; --s) {
      const r = i[s].$filler;
      gd(r) && fl(e.ctx, r, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, n) {
    const i = t.meta.$filler;
    !gd(i) || n.drawTime !== "beforeDatasetDraw" || fl(e.ctx, i, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const cs = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, i = /* @__PURE__ */ new Set(), s = 0, r = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const a = l.tooltipPosition();
        i.add(a.x), s += a.y, ++r;
      }
    }
    return r === 0 || i.size === 0 ? !1 : {
      x: [
        ...i
      ].reduce((l, a) => l + a) / i.size,
      y: s / r
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, i = t.y, s = Number.POSITIVE_INFINITY, r, o, l;
    for (r = 0, o = e.length; r < o; ++r) {
      const a = e[r].element;
      if (a && a.hasValue()) {
        const c = a.getCenterPoint(), h = ql(t, c);
        h < s && (s = h, l = a);
      }
    }
    if (l) {
      const a = l.tooltipPosition();
      n = a.x, i = a.y;
    }
    return {
      x: n,
      y: i
    };
  }
};
function He(e, t) {
  return t && (Dt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function an(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function O4(e, t) {
  const { element: n, datasetIndex: i, index: s } = t, r = e.getDatasetMeta(i).controller, { label: o, value: l } = r.getLabelAndValue(s);
  return {
    chart: e,
    label: o,
    parsed: r.getParsed(s),
    raw: e.data.datasets[i].data[s],
    formattedValue: l,
    dataset: r.getDataset(),
    dataIndex: s,
    datasetIndex: i,
    element: n
  };
}
function yd(e, t) {
  const n = e.chart.ctx, { body: i, footer: s, title: r } = e, { boxWidth: o, boxHeight: l } = t, a = ve(t.bodyFont), c = ve(t.titleFont), h = ve(t.footerFont), d = r.length, u = s.length, f = i.length, g = _e(t.padding);
  let m = g.height, v = 0, b = i.reduce((E, k) => E + k.before.length + k.lines.length + k.after.length, 0);
  if (b += e.beforeBody.length + e.afterBody.length, d && (m += d * c.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const E = t.displayColors ? Math.max(l, a.lineHeight) : a.lineHeight;
    m += f * E + (b - f) * a.lineHeight + (b - 1) * t.bodySpacing;
  }
  u && (m += t.footerMarginTop + u * h.lineHeight + (u - 1) * t.footerSpacing);
  let _ = 0;
  const S = function(E) {
    v = Math.max(v, n.measureText(E).width + _);
  };
  return n.save(), n.font = c.string, _t(e.title, S), n.font = a.string, _t(e.beforeBody.concat(e.afterBody), S), _ = t.displayColors ? o + 2 + t.boxPadding : 0, _t(i, (E) => {
    _t(E.before, S), _t(E.lines, S), _t(E.after, S);
  }), _ = 0, n.font = h.string, _t(e.footer, S), n.restore(), v += g.width, {
    width: v,
    height: m
  };
}
function R4(e, t) {
  const { y: n, height: i } = t;
  return n < i / 2 ? "top" : n > e.height - i / 2 ? "bottom" : "center";
}
function A4(e, t, n, i) {
  const { x: s, width: r } = i, o = n.caretSize + n.caretPadding;
  if (e === "left" && s + r + o > t.width || e === "right" && s - r - o < 0)
    return !0;
}
function F4(e, t, n, i) {
  const { x: s, width: r } = n, { width: o, chartArea: { left: l, right: a } } = e;
  let c = "center";
  return i === "center" ? c = s <= (l + a) / 2 ? "left" : "right" : s <= r / 2 ? c = "left" : s >= o - r / 2 && (c = "right"), A4(c, e, t, n) && (c = "center"), c;
}
function xd(e, t, n) {
  const i = n.yAlign || t.yAlign || R4(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || F4(e, t, n, i),
    yAlign: i
  };
}
function T4(e, t) {
  let { x: n, width: i } = e;
  return t === "right" ? n -= i : t === "center" && (n -= i / 2), n;
}
function L4(e, t, n) {
  let { y: i, height: s } = e;
  return t === "top" ? i += n : t === "bottom" ? i -= s + n : i -= s / 2, i;
}
function kd(e, t, n, i) {
  const { caretSize: s, caretPadding: r, cornerRadius: o } = e, { xAlign: l, yAlign: a } = n, c = s + r, { topLeft: h, topRight: d, bottomLeft: u, bottomRight: f } = Ri(o);
  let g = T4(t, l);
  const m = L4(t, a, c);
  return a === "center" ? l === "left" ? g += c : l === "right" && (g -= c) : l === "left" ? g -= Math.max(h, u) + s : l === "right" && (g += Math.max(d, f) + s), {
    x: Kt(g, 0, i.width - t.width),
    y: Kt(m, 0, i.height - t.height)
  };
}
function po(e, t, n) {
  const i = _e(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - i.right : e.x + i.left;
}
function wd(e) {
  return He([], an(e));
}
function I4(e, t, n) {
  return Tn(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function _d(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const w1 = {
  beforeTitle: on,
  title(e) {
    if (e.length > 0) {
      const t = e[0], n = t.chart.data.labels, i = n ? n.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (i > 0 && t.dataIndex < i)
        return n[t.dataIndex];
    }
    return "";
  },
  afterTitle: on,
  beforeBody: on,
  beforeLabel: on,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return gt(n) || (t += n), t;
  },
  labelColor(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      borderColor: n.borderColor,
      backgroundColor: n.backgroundColor,
      borderWidth: n.borderWidth,
      borderDash: n.borderDash,
      borderDashOffset: n.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      pointStyle: n.pointStyle,
      rotation: n.rotation
    };
  },
  afterLabel: on,
  afterBody: on,
  beforeFooter: on,
  footer: on,
  afterFooter: on
};
function le(e, t, n, i) {
  const s = e[t].call(n, i);
  return typeof s > "u" ? w1[t].call(n, i) : s;
}
class Ql extends di {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const n = this.chart, i = this.options.setContext(this.getContext()), s = i.enabled && n.options.animation && i.animations, r = new o1(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(r)), r;
  }
  getContext() {
    return this.$context || (this.$context = I4(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: i } = n, s = le(i, "beforeTitle", this, t), r = le(i, "title", this, t), o = le(i, "afterTitle", this, t);
    let l = [];
    return l = He(l, an(s)), l = He(l, an(r)), l = He(l, an(o)), l;
  }
  getBeforeBody(t, n) {
    return wd(le(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: i } = n, s = [];
    return _t(t, (r) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, l = _d(i, r);
      He(o.before, an(le(l, "beforeLabel", this, r))), He(o.lines, le(l, "label", this, r)), He(o.after, an(le(l, "afterLabel", this, r))), s.push(o);
    }), s;
  }
  getAfterBody(t, n) {
    return wd(le(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: i } = n, s = le(i, "beforeFooter", this, t), r = le(i, "footer", this, t), o = le(i, "afterFooter", this, t);
    let l = [];
    return l = He(l, an(s)), l = He(l, an(r)), l = He(l, an(o)), l;
  }
  _createItems(t) {
    const n = this._active, i = this.chart.data, s = [], r = [], o = [];
    let l = [], a, c;
    for (a = 0, c = n.length; a < c; ++a)
      l.push(O4(this.chart, n[a]));
    return t.filter && (l = l.filter((h, d, u) => t.filter(h, d, u, i))), t.itemSort && (l = l.sort((h, d) => t.itemSort(h, d, i))), _t(l, (h) => {
      const d = _d(t.callbacks, h);
      s.push(le(d, "labelColor", this, h)), r.push(le(d, "labelPointStyle", this, h)), o.push(le(d, "labelTextColor", this, h));
    }), this.labelColors = s, this.labelPointStyles = r, this.labelTextColors = o, this.dataPoints = l, l;
  }
  update(t, n) {
    const i = this.options.setContext(this.getContext()), s = this._active;
    let r, o = [];
    if (!s.length)
      this.opacity !== 0 && (r = {
        opacity: 0
      });
    else {
      const l = cs[i.position].call(this, s, this._eventPosition);
      o = this._createItems(i), this.title = this.getTitle(o, i), this.beforeBody = this.getBeforeBody(o, i), this.body = this.getBody(o, i), this.afterBody = this.getAfterBody(o, i), this.footer = this.getFooter(o, i);
      const a = this._size = yd(this, i), c = Object.assign({}, l, a), h = xd(this.chart, i, c), d = kd(i, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, r = {
        opacity: 1,
        x: d.x,
        y: d.y,
        width: a.width,
        height: a.height,
        caretX: l.x,
        caretY: l.y
      };
    }
    this._tooltipItems = o, this.$context = void 0, r && this._resolveAnimations().update(this, r), t && i.external && i.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: n
    });
  }
  drawCaret(t, n, i, s) {
    const r = this.getCaretPosition(t, i, s);
    n.lineTo(r.x1, r.y1), n.lineTo(r.x2, r.y2), n.lineTo(r.x3, r.y3);
  }
  getCaretPosition(t, n, i) {
    const { xAlign: s, yAlign: r } = this, { caretSize: o, cornerRadius: l } = i, { topLeft: a, topRight: c, bottomLeft: h, bottomRight: d } = Ri(l), { x: u, y: f } = t, { width: g, height: m } = n;
    let v, b, _, S, E, k;
    return r === "center" ? (E = f + m / 2, s === "left" ? (v = u, b = v - o, S = E + o, k = E - o) : (v = u + g, b = v + o, S = E - o, k = E + o), _ = v) : (s === "left" ? b = u + Math.max(a, h) + o : s === "right" ? b = u + g - Math.max(c, d) - o : b = this.caretX, r === "top" ? (S = f, E = S - o, v = b - o, _ = b + o) : (S = f + m, E = S + o, v = b + o, _ = b - o), k = S), {
      x1: v,
      x2: b,
      x3: _,
      y1: S,
      y2: E,
      y3: k
    };
  }
  drawTitle(t, n, i) {
    const s = this.title, r = s.length;
    let o, l, a;
    if (r) {
      const c = il(i.rtl, this.x, this.width);
      for (t.x = po(this, i.titleAlign, i), n.textAlign = c.textAlign(i.titleAlign), n.textBaseline = "middle", o = ve(i.titleFont), l = i.titleSpacing, n.fillStyle = i.titleColor, n.font = o.string, a = 0; a < r; ++a)
        n.fillText(s[a], c.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + l, a + 1 === r && (t.y += i.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, i, s, r) {
    const o = this.labelColors[i], l = this.labelPointStyles[i], { boxHeight: a, boxWidth: c } = r, h = ve(r.bodyFont), d = po(this, "left", r), u = s.x(d), f = a < h.lineHeight ? (h.lineHeight - a) / 2 : 0, g = n.y + f;
    if (r.usePointStyle) {
      const m = {
        radius: Math.min(c, a) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, v = s.leftForLtr(u, c) + c / 2, b = g + a / 2;
      t.strokeStyle = r.multiKeyBackground, t.fillStyle = r.multiKeyBackground, Yl(t, m, v, b), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, Yl(t, m, v, b);
    } else {
      t.lineWidth = dt(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
      const m = s.leftForLtr(u, c), v = s.leftForLtr(s.xPlus(u, 1), c - 2), b = Ri(o.borderRadius);
      Object.values(b).some((_) => _ !== 0) ? (t.beginPath(), t.fillStyle = r.multiKeyBackground, rr(t, {
        x: m,
        y: g,
        w: c,
        h: a,
        radius: b
      }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), rr(t, {
        x: v,
        y: g + 1,
        w: c - 2,
        h: a - 2,
        radius: b
      }), t.fill()) : (t.fillStyle = r.multiKeyBackground, t.fillRect(m, g, c, a), t.strokeRect(m, g, c, a), t.fillStyle = o.backgroundColor, t.fillRect(v, g + 1, c - 2, a - 2));
    }
    t.fillStyle = this.labelTextColors[i];
  }
  drawBody(t, n, i) {
    const { body: s } = this, { bodySpacing: r, bodyAlign: o, displayColors: l, boxHeight: a, boxWidth: c, boxPadding: h } = i, d = ve(i.bodyFont);
    let u = d.lineHeight, f = 0;
    const g = il(i.rtl, this.x, this.width), m = function(P) {
      n.fillText(P, g.x(t.x + f), t.y + u / 2), t.y += u + r;
    }, v = g.textAlign(o);
    let b, _, S, E, k, N, w;
    for (n.textAlign = o, n.textBaseline = "middle", n.font = d.string, t.x = po(this, v, i), n.fillStyle = i.bodyColor, _t(this.beforeBody, m), f = l && v !== "right" ? o === "center" ? c / 2 + h : c + 2 + h : 0, E = 0, N = s.length; E < N; ++E) {
      for (b = s[E], _ = this.labelTextColors[E], n.fillStyle = _, _t(b.before, m), S = b.lines, l && S.length && (this._drawColorBox(n, t, E, g, i), u = Math.max(d.lineHeight, a)), k = 0, w = S.length; k < w; ++k)
        m(S[k]), u = d.lineHeight;
      _t(b.after, m);
    }
    f = 0, u = d.lineHeight, _t(this.afterBody, m), t.y -= r;
  }
  drawFooter(t, n, i) {
    const s = this.footer, r = s.length;
    let o, l;
    if (r) {
      const a = il(i.rtl, this.x, this.width);
      for (t.x = po(this, i.footerAlign, i), t.y += i.footerMarginTop, n.textAlign = a.textAlign(i.footerAlign), n.textBaseline = "middle", o = ve(i.footerFont), n.fillStyle = i.footerColor, n.font = o.string, l = 0; l < r; ++l)
        n.fillText(s[l], a.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + i.footerSpacing;
    }
  }
  drawBackground(t, n, i, s) {
    const { xAlign: r, yAlign: o } = this, { x: l, y: a } = t, { width: c, height: h } = i, { topLeft: d, topRight: u, bottomLeft: f, bottomRight: g } = Ri(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + d, a), o === "top" && this.drawCaret(t, n, i, s), n.lineTo(l + c - u, a), n.quadraticCurveTo(l + c, a, l + c, a + u), o === "center" && r === "right" && this.drawCaret(t, n, i, s), n.lineTo(l + c, a + h - g), n.quadraticCurveTo(l + c, a + h, l + c - g, a + h), o === "bottom" && this.drawCaret(t, n, i, s), n.lineTo(l + f, a + h), n.quadraticCurveTo(l, a + h, l, a + h - f), o === "center" && r === "left" && this.drawCaret(t, n, i, s), n.lineTo(l, a + d), n.quadraticCurveTo(l, a, l + d, a), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, i = this.$animations, s = i && i.x, r = i && i.y;
    if (s || r) {
      const o = cs[t.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const l = this._size = yd(this, t), a = Object.assign({}, o, this._size), c = xd(n, t, a), h = kd(t, a, c, n);
      (s._to !== h.x || r._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const n = this.options.setContext(this.getContext());
    let i = this.opacity;
    if (!i)
      return;
    this._updateAnimationTarget(n);
    const s = {
      width: this.width,
      height: this.height
    }, r = {
      x: this.x,
      y: this.y
    };
    i = Math.abs(i) < 1e-3 ? 0 : i;
    const o = _e(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = i, this.drawBackground(r, t, s, n), iv(t, n.textDirection), r.y += o.top, this.drawTitle(r, t, n), this.drawBody(r, t, n), this.drawFooter(r, t, n), sv(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const i = this._active, s = t.map(({ datasetIndex: l, index: a }) => {
      const c = this.chart.getDatasetMeta(l);
      if (!c)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: c.data[a],
        index: a
      };
    }), r = !er(i, s), o = this._positionChanged(s, n);
    (r || o) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, i = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, r = this._active || [], o = this._getActiveElements(t, r, n, i), l = this._positionChanged(o, t), a = n || !er(o, r) || l;
    return a && (this._active = o, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), a;
  }
  _getActiveElements(t, n, i, s) {
    const r = this.options;
    if (t.type === "mouseout")
      return [];
    if (!s)
      return n.filter((l) => this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
    const o = this.chart.getElementsAtEventForMode(t, r.mode, r, i);
    return r.reverse && o.reverse(), o;
  }
  _positionChanged(t, n) {
    const { caretX: i, caretY: s, options: r } = this, o = cs[r.position].call(this, t, n);
    return o !== !1 && (i !== o.x || s !== o.y);
  }
}
Y(Ql, "positioners", cs);
var V4 = {
  id: "tooltip",
  _element: Ql,
  positioners: cs,
  afterInit(e, t, n) {
    n && (e.tooltip = new Ql({
      chart: e,
      options: n
    }));
  },
  beforeUpdate(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  reset(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  afterDraw(e) {
    const t = e.tooltip;
    if (t && t._willRender()) {
      const n = {
        tooltip: t
      };
      if (e.notifyPlugins("beforeTooltipDraw", {
        ...n,
        cancelable: !0
      }) === !1)
        return;
      t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", n);
    }
  },
  afterEvent(e, t) {
    if (e.tooltip) {
      const n = t.replay;
      e.tooltip.handleEvent(t.event, n, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (e, t) => t.bodyFont.size,
    boxWidth: (e, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: w1
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (e) => e !== "filter" && e !== "itemSort" && e !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
};
const $4 = (e, t, n, i) => (typeof t == "string" ? (n = e.push(t) - 1, i.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function B4(e, t, n, i) {
  const s = e.indexOf(t);
  if (s === -1)
    return $4(e, t, n, i);
  const r = e.lastIndexOf(t);
  return s !== r ? n : s;
}
const z4 = (e, t) => e === null ? null : Kt(Math.round(e), 0, t);
function Md(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class ta extends zi {
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const n = this._addedLabels;
    if (n.length) {
      const i = this.getLabels();
      for (const { index: s, label: r } of n)
        i[s] === r && i.splice(s, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, n) {
    if (gt(t))
      return null;
    const i = this.getLabels();
    return n = isFinite(n) && i[n] === t ? n : B4(i, t, mt(n, t), this._addedLabels), z4(n, i.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let { min: i, max: s } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (i = 0), n || (s = this.getLabels().length - 1)), this.min = i, this.max = s;
  }
  buildTicks() {
    const t = this.min, n = this.max, i = this.options.offset, s = [];
    let r = this.getLabels();
    r = t === 0 && n === r.length - 1 ? r : r.slice(t, n + 1), this._valueRange = Math.max(r.length - (i ? 0 : 1), 1), this._startValue = this.min - (i ? 0.5 : 0);
    for (let o = t; o <= n; o++)
      s.push({
        value: o
      });
    return s;
  }
  getLabelForValue(t) {
    return Md.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
Y(ta, "id", "category"), Y(ta, "defaults", {
  ticks: {
    callback: Md
  }
});
function H4(e, t) {
  const n = [], { bounds: s, step: r, min: o, max: l, precision: a, count: c, maxTicks: h, maxDigits: d, includeBounds: u } = e, f = r || 1, g = h - 1, { min: m, max: v } = t, b = !gt(o), _ = !gt(l), S = !gt(c), E = (v - m) / (d + 1);
  let k = _h((v - m) / g / f) * f, N, w, P, O;
  if (k < 1e-14 && !b && !_)
    return [
      {
        value: m
      },
      {
        value: v
      }
    ];
  O = Math.ceil(v / k) - Math.floor(m / k), O > g && (k = _h(O * k / g / f) * f), gt(a) || (N = Math.pow(10, a), k = Math.ceil(k * N) / N), s === "ticks" ? (w = Math.floor(m / k) * k, P = Math.ceil(v / k) * k) : (w = m, P = v), b && _ && r && Zm((l - o) / r, k / 1e3) ? (O = Math.round(Math.min((l - o) / k, h)), k = (l - o) / O, w = o, P = l) : S ? (w = b ? o : w, P = _ ? l : P, O = c - 1, k = (P - w) / O) : (O = (P - w) / k, ys(O, Math.round(O), k / 1e3) ? O = Math.round(O) : O = Math.ceil(O));
  const F = Math.max(Mh(k), Mh(w));
  N = Math.pow(10, gt(a) ? F : a), w = Math.round(w * N) / N, P = Math.round(P * N) / N;
  let R = 0;
  for (b && (u && w !== o ? (n.push({
    value: o
  }), w < o && R++, ys(Math.round((w + R * k) * N) / N, o, Cd(o, E, e)) && R++) : w < o && R++); R < O; ++R) {
    const j = Math.round((w + R * k) * N) / N;
    if (_ && j > l)
      break;
    n.push({
      value: j
    });
  }
  return _ && u && P !== l ? n.length && ys(n[n.length - 1].value, l, Cd(l, E, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!_ || P === l) && n.push({
    value: P
  }), n;
}
function Cd(e, t, { horizontal: n, minRotation: i }) {
  const s = Xe(i), r = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, o = 0.75 * t * ("" + e).length;
  return Math.min(t / r, o);
}
class ea extends zi {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return gt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: i } = this.getUserBounds();
    let { min: s, max: r } = this;
    const o = (a) => s = n ? s : a, l = (a) => r = i ? r : a;
    if (t) {
      const a = Ke(s), c = Ke(r);
      a < 0 && c < 0 ? l(0) : a > 0 && c > 0 && o(0);
    }
    if (s === r) {
      let a = r === 0 ? 1 : Math.abs(r * 0.05);
      l(r + a), t || o(s - a);
    }
    this.min = s, this.max = r;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: n, stepSize: i } = t, s;
    return i ? (s = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), n = n || 11), n && (s = Math.min(n, s)), s;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, n = t.ticks;
    let i = this.getTickLimit();
    i = Math.max(2, i);
    const s = {
      maxTicks: i,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: n.precision,
      step: n.stepSize,
      count: n.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: n.minRotation || 0,
      includeBounds: n.includeBounds !== !1
    }, r = this._range || this, o = H4(s, r);
    return t.bounds === "ticks" && Qm(o, this, "value"), t.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
  }
  configure() {
    const t = this.ticks;
    let n = this.min, i = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const s = (i - n) / Math.max(t.length - 1, 1) / 2;
      n -= s, i += s;
    }
    this._startValue = n, this._endValue = i, this._valueRange = i - n;
  }
  getLabelForValue(t) {
    return Ha(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class na extends ea {
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = Gt(t) ? t : 0, this.max = Gt(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, i = Xe(this.options.ticks.minRotation), s = (t ? Math.sin(i) : Math.cos(i)) || 1e-3, r = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, r.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
Y(na, "id", "linear"), Y(na, "defaults", {
  ticks: {
    callback: ja.formatters.numeric
  }
});
function ia(e) {
  const t = e.ticks;
  if (t.display && e.display) {
    const n = _e(t.backdropPadding);
    return mt(t.font && t.font.size, Lt.font.size) + n.height;
  }
  return 0;
}
function j4(e, t, n) {
  return n = Dt(n) ? n : [
    n
  ], {
    w: v0(e, t.string, n),
    h: n.length * t.lineHeight
  };
}
function Sd(e, t, n, i, s) {
  return e === i || e === s ? {
    start: t - n / 2,
    end: t + n / 2
  } : e < i || e > s ? {
    start: t - n,
    end: t
  } : {
    start: t,
    end: t + n
  };
}
function W4(e) {
  const t = {
    l: e.left + e._padding.left,
    r: e.right - e._padding.right,
    t: e.top + e._padding.top,
    b: e.bottom - e._padding.bottom
  }, n = Object.assign({}, t), i = [], s = [], r = e._pointLabels.length, o = e.options.pointLabels, l = o.centerPointLabels ? Rt / r : 0;
  for (let a = 0; a < r; a++) {
    const c = o.setContext(e.getPointLabelContext(a));
    s[a] = c.padding;
    const h = e.getPointPosition(a, e.drawingArea + s[a], l), d = ve(c.font), u = j4(e.ctx, d, e._pointLabels[a]);
    i[a] = u;
    const f = pe(e.getIndexAngle(a) + l), g = Math.round($a(f)), m = Sd(g, h.x, u.w, 0, 180), v = Sd(g, h.y, u.h, 90, 270);
    q4(n, t, f, m, v);
  }
  e.setCenterPoint(t.l - n.l, n.r - t.r, t.t - n.t, n.b - t.b), e._pointLabelItems = U4(e, i, s);
}
function q4(e, t, n, i, s) {
  const r = Math.abs(Math.sin(n)), o = Math.abs(Math.cos(n));
  let l = 0, a = 0;
  i.start < t.l ? (l = (t.l - i.start) / r, e.l = Math.min(e.l, t.l - l)) : i.end > t.r && (l = (i.end - t.r) / r, e.r = Math.max(e.r, t.r + l)), s.start < t.t ? (a = (t.t - s.start) / o, e.t = Math.min(e.t, t.t - a)) : s.end > t.b && (a = (s.end - t.b) / o, e.b = Math.max(e.b, t.b + a));
}
function G4(e, t, n) {
  const i = e.drawingArea, { extra: s, additionalAngle: r, padding: o, size: l } = n, a = e.getPointPosition(t, i + s + o, r), c = Math.round($a(pe(a.angle + Tt))), h = J4(a.y, l.h, c), d = X4(c), u = K4(a.x, l.w, d);
  return {
    visible: !0,
    x: a.x,
    y: h,
    textAlign: d,
    left: u,
    top: h,
    right: u + l.w,
    bottom: h + l.h
  };
}
function Y4(e, t) {
  if (!t)
    return !0;
  const { left: n, top: i, right: s, bottom: r } = e;
  return !(fn({
    x: n,
    y: i
  }, t) || fn({
    x: n,
    y: r
  }, t) || fn({
    x: s,
    y: i
  }, t) || fn({
    x: s,
    y: r
  }, t));
}
function U4(e, t, n) {
  const i = [], s = e._pointLabels.length, r = e.options, { centerPointLabels: o, display: l } = r.pointLabels, a = {
    extra: ia(r) / 2,
    additionalAngle: o ? Rt / s : 0
  };
  let c;
  for (let h = 0; h < s; h++) {
    a.padding = n[h], a.size = t[h];
    const d = G4(e, h, a);
    i.push(d), l === "auto" && (d.visible = Y4(d, c), d.visible && (c = d));
  }
  return i;
}
function X4(e) {
  return e === 0 || e === 180 ? "center" : e < 180 ? "left" : "right";
}
function K4(e, t, n) {
  return n === "right" ? e -= t : n === "center" && (e -= t / 2), e;
}
function J4(e, t, n) {
  return n === 90 || n === 270 ? e -= t / 2 : (n > 270 || n < 90) && (e -= t), e;
}
function Z4(e, t, n) {
  const { left: i, top: s, right: r, bottom: o } = n, { backdropColor: l } = t;
  if (!gt(l)) {
    const a = Ri(t.borderRadius), c = _e(t.backdropPadding);
    e.fillStyle = l;
    const h = i - c.left, d = s - c.top, u = r - i + c.width, f = o - s + c.height;
    Object.values(a).some((g) => g !== 0) ? (e.beginPath(), rr(e, {
      x: h,
      y: d,
      w: u,
      h: f,
      radius: a
    }), e.fill()) : e.fillRect(h, d, u, f);
  }
}
function Q4(e, t) {
  const { ctx: n, options: { pointLabels: i } } = e;
  for (let s = t - 1; s >= 0; s--) {
    const r = e._pointLabelItems[s];
    if (!r.visible)
      continue;
    const o = i.setContext(e.getPointLabelContext(s));
    Z4(n, o, r);
    const l = ve(o.font), { x: a, y: c, textAlign: h } = r;
    or(n, e._pointLabels[s], a, c + l.lineHeight / 2, l, {
      color: o.color,
      textAlign: h,
      textBaseline: "middle"
    });
  }
}
function _1(e, t, n, i) {
  const { ctx: s } = e;
  if (n)
    s.arc(e.xCenter, e.yCenter, t, 0, Pt);
  else {
    let r = e.getPointPosition(0, t);
    s.moveTo(r.x, r.y);
    for (let o = 1; o < i; o++)
      r = e.getPointPosition(o, t), s.lineTo(r.x, r.y);
  }
}
function ty(e, t, n, i, s) {
  const r = e.ctx, o = t.circular, { color: l, lineWidth: a } = t;
  !o && !i || !l || !a || n < 0 || (r.save(), r.strokeStyle = l, r.lineWidth = a, r.setLineDash(s.dash || []), r.lineDashOffset = s.dashOffset, r.beginPath(), _1(e, n, o, i), r.closePath(), r.stroke(), r.restore());
}
function ey(e, t, n) {
  return Tn(e, {
    label: n,
    index: t,
    type: "pointLabel"
  });
}
class hs extends ea {
  constructor(t) {
    super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const t = this._padding = _e(ia(this.options) / 2), n = this.width = this.maxWidth - t.width, i = this.height = this.maxHeight - t.height;
    this.xCenter = Math.floor(this.left + n / 2 + t.left), this.yCenter = Math.floor(this.top + i / 2 + t.top), this.drawingArea = Math.floor(Math.min(n, i) / 2);
  }
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!1);
    this.min = Gt(t) && !isNaN(t) ? t : 0, this.max = Gt(n) && !isNaN(n) ? n : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / ia(this.options));
  }
  generateTickLabels(t) {
    ea.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((n, i) => {
      const s = Ot(this.options.pointLabels.callback, [
        n,
        i
      ], this);
      return s || s === 0 ? s : "";
    }).filter((n, i) => this.chart.getDataVisibility(i));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display ? W4(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, n, i, s) {
    this.xCenter += Math.floor((t - n) / 2), this.yCenter += Math.floor((i - s) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, n, i, s));
  }
  getIndexAngle(t) {
    const n = Pt / (this._pointLabels.length || 1), i = this.options.startAngle || 0;
    return pe(t * n + Xe(i));
  }
  getDistanceFromCenterForValue(t) {
    if (gt(t))
      return NaN;
    const n = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * n : (t - this.min) * n;
  }
  getValueForDistanceFromCenter(t) {
    if (gt(t))
      return NaN;
    const n = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - n : this.min + n;
  }
  getPointLabelContext(t) {
    const n = this._pointLabels || [];
    if (t >= 0 && t < n.length) {
      const i = n[t];
      return ey(this.getContext(), t, i);
    }
  }
  getPointPosition(t, n, i = 0) {
    const s = this.getIndexAngle(t) - Tt + i;
    return {
      x: Math.cos(s) * n + this.xCenter,
      y: Math.sin(s) * n + this.yCenter,
      angle: s
    };
  }
  getPointPositionForValue(t, n) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(n));
  }
  getBasePosition(t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue());
  }
  getPointLabelPosition(t) {
    const { left: n, top: i, right: s, bottom: r } = this._pointLabelItems[t];
    return {
      left: n,
      top: i,
      right: s,
      bottom: r
    };
  }
  drawBackground() {
    const { backgroundColor: t, grid: { circular: n } } = this.options;
    if (t) {
      const i = this.ctx;
      i.save(), i.beginPath(), _1(this, this.getDistanceFromCenterForValue(this._endValue), n, this._pointLabels.length), i.closePath(), i.fillStyle = t, i.fill(), i.restore();
    }
  }
  drawGrid() {
    const t = this.ctx, n = this.options, { angleLines: i, grid: s, border: r } = n, o = this._pointLabels.length;
    let l, a, c;
    if (n.pointLabels.display && Q4(this, o), s.display && this.ticks.forEach((h, d) => {
      if (d !== 0 || d === 0 && this.min < 0) {
        a = this.getDistanceFromCenterForValue(h.value);
        const u = this.getContext(d), f = s.setContext(u), g = r.setContext(u);
        ty(this, f, a, o, g);
      }
    }), i.display) {
      for (t.save(), l = o - 1; l >= 0; l--) {
        const h = i.setContext(this.getPointLabelContext(l)), { color: d, lineWidth: u } = h;
        !u || !d || (t.lineWidth = u, t.strokeStyle = d, t.setLineDash(h.borderDash), t.lineDashOffset = h.borderDashOffset, a = this.getDistanceFromCenterForValue(n.reverse ? this.min : this.max), c = this.getPointPosition(l, a), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(c.x, c.y), t.stroke());
      }
      t.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const t = this.ctx, n = this.options, i = n.ticks;
    if (!i.display)
      return;
    const s = this.getIndexAngle(0);
    let r, o;
    t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(s), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((l, a) => {
      if (a === 0 && this.min >= 0 && !n.reverse)
        return;
      const c = i.setContext(this.getContext(a)), h = ve(c.font);
      if (r = this.getDistanceFromCenterForValue(this.ticks[a].value), c.showLabelBackdrop) {
        t.font = h.string, o = t.measureText(l.label).width, t.fillStyle = c.backdropColor;
        const d = _e(c.backdropPadding);
        t.fillRect(-o / 2 - d.left, -r - h.size / 2 - d.top, o + d.width, h.size + d.height);
      }
      or(t, l.label, 0, -r, h, {
        color: c.color,
        strokeColor: c.textStrokeColor,
        strokeWidth: c.textStrokeWidth
      });
    }), t.restore();
  }
  drawTitle() {
  }
}
Y(hs, "id", "radialLinear"), Y(hs, "defaults", {
  display: !0,
  animate: !0,
  position: "chartArea",
  angleLines: {
    display: !0,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: {
    circular: !1
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: !0,
    callback: ja.formatters.numeric
  },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: !0,
    font: {
      size: 10
    },
    callback(t) {
      return t;
    },
    padding: 5,
    centerPointLabels: !1
  }
}), Y(hs, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}), Y(hs, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
const Ir = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, ae = /* @__PURE__ */ Object.keys(Ir);
function Ed(e, t) {
  return e - t;
}
function Pd(e, t) {
  if (gt(t))
    return null;
  const n = e._adapter, { parser: i, round: s, isoWeekday: r } = e._parseOpts;
  let o = t;
  return typeof i == "function" && (o = i(o)), Gt(o) || (o = typeof i == "string" ? n.parse(o, i) : n.parse(o)), o === null ? null : (s && (o = s === "week" && (Fi(r) || r === !0) ? n.startOf(o, "isoWeek", r) : n.startOf(o, s)), +o);
}
function Dd(e, t, n, i) {
  const s = ae.length;
  for (let r = ae.indexOf(e); r < s - 1; ++r) {
    const o = Ir[ae[r]], l = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((n - t) / (l * o.size)) <= i)
      return ae[r];
  }
  return ae[s - 1];
}
function ny(e, t, n, i, s) {
  for (let r = ae.length - 1; r >= ae.indexOf(n); r--) {
    const o = ae[r];
    if (Ir[o].common && e._adapter.diff(s, i, o) >= t - 1)
      return o;
  }
  return ae[n ? ae.indexOf(n) : 0];
}
function iy(e) {
  for (let t = ae.indexOf(e) + 1, n = ae.length; t < n; ++t)
    if (Ir[ae[t]].common)
      return ae[t];
}
function Nd(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: i, hi: s } = Ba(n, t), r = n[i] >= t ? n[i] : n[s];
    e[r] = !0;
  }
}
function sy(e, t, n, i) {
  const s = e._adapter, r = +s.startOf(t[0].value, i), o = t[t.length - 1].value;
  let l, a;
  for (l = r; l <= o; l = +s.add(l, 1, i))
    a = n[l], a >= 0 && (t[a].major = !0);
  return t;
}
function Od(e, t, n) {
  const i = [], s = {}, r = t.length;
  let o, l;
  for (o = 0; o < r; ++o)
    l = t[o], s[l] = o, i.push({
      value: l,
      major: !1
    });
  return r === 0 || !n ? i : sy(e, i, s, n);
}
class hr extends zi {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, n = {}) {
    const i = t.time || (t.time = {}), s = this._adapter = new Iv._date(t.adapters.date);
    s.init(n), bs(i.displayFormats, s.formats()), this._parseOpts = {
      parser: i.parser,
      round: i.round,
      isoWeekday: i.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Pd(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, n = this._adapter, i = t.time.unit || "day";
    let { min: s, max: r, minDefined: o, maxDefined: l } = this.getUserBounds();
    function a(c) {
      !o && !isNaN(c.min) && (s = Math.min(s, c.min)), !l && !isNaN(c.max) && (r = Math.max(r, c.max));
    }
    (!o || !l) && (a(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && a(this.getMinMax(!1))), s = Gt(s) && !isNaN(s) ? s : +n.startOf(Date.now(), i), r = Gt(r) && !isNaN(r) ? r : +n.endOf(Date.now(), i) + 1, this.min = Math.min(s, r - 1), this.max = Math.max(s + 1, r);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let n = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
    return t.length && (n = t[0], i = t[t.length - 1]), {
      min: n,
      max: i
    };
  }
  buildTicks() {
    const t = this.options, n = t.time, i = t.ticks, s = i.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
    const r = this.min, o = this.max, l = i0(s, r, o);
    return this._unit = n.unit || (i.autoSkip ? Dd(n.minUnit, this.min, this.max, this._getLabelCapacity(r)) : ny(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !i.major.enabled || this._unit === "year" ? void 0 : iy(this._unit), this.initOffsets(s), t.reverse && l.reverse(), Od(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, i = 0, s, r;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, r = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? i = r : i = (r - this.getDecimalForValue(t[t.length - 2])) / 2);
    const o = t.length < 3 ? 0.5 : 0.25;
    n = Kt(n, 0, o), i = Kt(i, 0, o), this._offsets = {
      start: n,
      end: i,
      factor: 1 / (n + 1 + i)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, i = this.max, s = this.options, r = s.time, o = r.unit || Dd(r.minUnit, n, i, this._getLabelCapacity(n)), l = mt(s.ticks.stepSize, 1), a = o === "week" ? r.isoWeekday : !1, c = Fi(a) || a === !0, h = {};
    let d = n, u, f;
    if (c && (d = +t.startOf(d, "isoWeek", a)), d = +t.startOf(d, c ? "day" : o), t.diff(i, n, o) > 1e5 * l)
      throw new Error(n + " and " + i + " are too far apart with stepSize of " + l + " " + o);
    const g = s.ticks.source === "data" && this.getDataTimestamps();
    for (u = d, f = 0; u < i; u = +t.add(u, l, o), f++)
      Nd(h, u, g);
    return (u === i || s.bounds === "ticks" || f === 1) && Nd(h, u, g), Object.keys(h).sort(Ed).map((m) => +m);
  }
  getLabelForValue(t) {
    const n = this._adapter, i = this.options.time;
    return i.tooltipFormat ? n.format(t, i.tooltipFormat) : n.format(t, i.displayFormats.datetime);
  }
  format(t, n) {
    const s = this.options.time.displayFormats, r = this._unit, o = n || s[r];
    return this._adapter.format(t, o);
  }
  _tickFormatFunction(t, n, i, s) {
    const r = this.options, o = r.ticks.callback;
    if (o)
      return Ot(o, [
        t,
        n,
        i
      ], this);
    const l = r.time.displayFormats, a = this._unit, c = this._majorUnit, h = a && l[a], d = c && l[c], u = i[n], f = c && d && u && u.major;
    return this._adapter.format(t, s || (f ? d : h));
  }
  generateTickLabels(t) {
    let n, i, s;
    for (n = 0, i = t.length; n < i; ++n)
      s = t[n], s.label = this._tickFormatFunction(s.value, n, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const n = this._offsets, i = this.getDecimalForValue(t);
    return this.getPixelForDecimal((n.start + i) * n.factor);
  }
  getValueForPixel(t) {
    const n = this._offsets, i = this.getDecimalForPixel(t) / n.factor - n.end;
    return this.min + i * (this.max - this.min);
  }
  _getLabelSize(t) {
    const n = this.options.ticks, i = this.ctx.measureText(t).width, s = Xe(this.isHorizontal() ? n.maxRotation : n.minRotation), r = Math.cos(s), o = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: i * r + l * o,
      h: i * o + l * r
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, i = n.displayFormats, s = i[n.unit] || i.millisecond, r = this._tickFormatFunction(t, 0, Od(this, [
      t
    ], this._majorUnit), s), o = this._getLabelSize(r), l = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
    return l > 0 ? l : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], n, i;
    if (t.length)
      return t;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return this._cache.data = s[0].controller.getAllParsedValues(this);
    for (n = 0, i = s.length; n < i; ++n)
      t = t.concat(s[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let n, i;
    if (t.length)
      return t;
    const s = this.getLabels();
    for (n = 0, i = s.length; n < i; ++n)
      t.push(Pd(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Wf(t.sort(Ed));
  }
}
Y(hr, "id", "time"), Y(hr, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
});
function go(e, t, n) {
  let i = 0, s = e.length - 1, r, o, l, a;
  n ? (t >= e[i].pos && t <= e[s].pos && ({ lo: i, hi: s } = Jn(e, "pos", t)), { pos: r, time: l } = e[i], { pos: o, time: a } = e[s]) : (t >= e[i].time && t <= e[s].time && ({ lo: i, hi: s } = Jn(e, "time", t)), { time: r, pos: l } = e[i], { time: o, pos: a } = e[s]);
  const c = o - r;
  return c ? l + (a - l) * (t - r) / c : l;
}
class Rd extends hr {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = go(n, this.min), this._tableRange = go(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: i } = this, s = [], r = [];
    let o, l, a, c, h;
    for (o = 0, l = t.length; o < l; ++o)
      c = t[o], c >= n && c <= i && s.push(c);
    if (s.length < 2)
      return [
        {
          time: n,
          pos: 0
        },
        {
          time: i,
          pos: 1
        }
      ];
    for (o = 0, l = s.length; o < l; ++o)
      h = s[o + 1], a = s[o - 1], c = s[o], Math.round((h + a) / 2) !== c && r.push({
        time: c,
        pos: o / (l - 1)
      });
    return r;
  }
  _generate() {
    const t = this.min, n = this.max;
    let i = super.getDataTimestamps();
    return (!i.includes(t) || !i.length) && i.splice(0, 0, t), (!i.includes(n) || i.length === 1) && i.push(n), i.sort((s, r) => s - r);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const n = this.getDataTimestamps(), i = this.getLabelTimestamps();
    return n.length && i.length ? t = this.normalize(n.concat(i)) : t = n.length ? n : i, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (go(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, i = this.getDecimalForPixel(t) / n.factor - n.end;
    return go(this._table, i * this._tableRange + this._minPos, !0);
  }
}
Y(Rd, "id", "timeseries"), Y(Rd, "defaults", hr.defaults);
const Gs = [
  {
    department: "Ain",
    department_value: "01",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Aisne",
    department_value: "02",
    region: "Hauts-de-France",
    region_value: "HDF"
  },
  {
    department: "Allier",
    department_value: "03",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Alpes de Haute-Provence",
    department_value: "04",
    region: "Provence-Alpes-Côte d’Azur",
    region_value: "PAC"
  },
  {
    department: "Hautes-Alpes",
    department_value: "05",
    region: "Provence-Alpes-Côte d’Azur",
    region_value: "PAC"
  },
  {
    department: "Alpes-Maritimes",
    department_value: "06",
    region: "Provence-Alpes-Côte d’Azur",
    region_value: "PAC"
  },
  {
    department: "Ardèche",
    department_value: "07",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Ardennes",
    department_value: "08",
    region: "Grand Est",
    region_value: "GES"
  },
  {
    department: "Ariège",
    department_value: "09",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Aube",
    department_value: "10",
    region: "Grand Est",
    region_value: "GES"
  },
  {
    department: "Aude",
    department_value: "11",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Aveyron",
    department_value: "12",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Bouches-du-Rhône",
    department_value: "13",
    region: "Provence-Alpes-Côte d’Azur",
    region_value: "PAC"
  },
  {
    department: "Calvados",
    department_value: "14",
    region: "Normandie",
    region_value: "NOR"
  },
  {
    department: "Cantal",
    department_value: "15",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Charente",
    department_value: "16",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Charente-Maritime",
    department_value: "17",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Cher",
    department_value: "18",
    region: "Centre-Val de Loire",
    region_value: "CVL"
  },
  {
    department: "Corrèze",
    department_value: "19",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Corse-du-Sud",
    department_value: "2A",
    region: "Corse",
    region_value: "20R"
  },
  {
    department: "Haute-Corse",
    department_value: "2B",
    region: "Corse",
    region_value: "20R"
  },
  {
    department: "Côte-d’Or",
    department_value: "21",
    region: "Bourgogne-Franche-Comté",
    region_value: "BFC"
  },
  {
    department: "Côtes d’Armor",
    department_value: "22",
    region: "Bretagne",
    region_value: "BRE"
  },
  {
    department: "Creuse",
    department_value: "23",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Dordogne",
    department_value: "24",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Doubs",
    department_value: "25",
    region: "Bourgogne-Franche-Comté",
    region_value: "BFC"
  },
  {
    department: "Drôme",
    department_value: "26",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Eure",
    department_value: "27",
    region: "Normandie",
    region_value: "NOR"
  },
  {
    department: "Eure-et-Loir",
    department_value: "28",
    region: "Centre-Val de Loire",
    region_value: "CVL"
  },
  {
    department: "Finistère",
    department_value: "29",
    region: "Bretagne",
    region_value: "BRE"
  },
  {
    department: "Gard",
    department_value: "30",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Haute-Garonne",
    department_value: "31",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Gers",
    department_value: "32",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Gironde",
    department_value: "33",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Hérault",
    department_value: "34",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Ille-et-Vilaine",
    department_value: "35",
    region: "Bretagne",
    region_value: "BRE"
  },
  {
    department: "Indre",
    department_value: "36",
    region: "Centre-Val de Loire",
    region_value: "CVL"
  },
  {
    department: "Indre-et-Loire",
    department_value: "37",
    region: "Centre-Val de Loire",
    region_value: "CVL"
  },
  {
    department: "Isère",
    department_value: "38",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Jura",
    department_value: "39",
    region: "Bourgogne-Franche-Comté",
    region_value: "BFC"
  },
  {
    department: "Landes",
    department_value: "40",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Loir-et-Cher",
    department_value: "41",
    region: "Centre-Val de Loire",
    region_value: "CVL"
  },
  {
    department: "Loire",
    department_value: "42",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Haute-Loire",
    department_value: "43",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Loire-Atlantique",
    department_value: "44",
    region: "Pays de la Loire",
    region_value: "PDL"
  },
  {
    department: "Loiret",
    department_value: "45",
    region: "Centre-Val de Loire",
    region_value: "CVL"
  },
  {
    department: "Lot",
    department_value: "46",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Lot-et-Garonne",
    department_value: "47",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Lozère",
    department_value: "48",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Maine-et-Loire",
    department_value: "49",
    region: "Pays de la Loire",
    region_value: "PDL"
  },
  {
    department: "Manche",
    department_value: "50",
    region: "Normandie",
    region_value: "NOR"
  },
  {
    department: "Marne",
    department_value: "51",
    region: "Grand Est",
    region_value: "GES"
  },
  {
    department: "Haute-Marne",
    department_value: "52",
    region: "Grand Est",
    region_value: "GES"
  },
  {
    department: "Mayenne",
    department_value: "53",
    region: "Pays de la Loire",
    region_value: "PDL"
  },
  {
    department: "Meurthe-et-Moselle",
    department_value: "54",
    region: "Grand Est",
    region_value: "GES"
  },
  {
    department: "Meuse",
    department_value: "55",
    region: "Grand Est",
    region_value: "GES"
  },
  {
    department: "Morbihan",
    department_value: "56",
    region: "Bretagne",
    region_value: "BRE"
  },
  {
    department: "Moselle",
    department_value: "57",
    region: "Grand Est",
    region_value: "GES"
  },
  {
    department: "Nièvre",
    department_value: "58",
    region: "Bourgogne-Franche-Comté",
    region_value: "BFC"
  },
  {
    department: "Nord",
    department_value: "59",
    region: "Hauts-de-France",
    region_value: "HDF"
  },
  {
    department: "Oise",
    department_value: "60",
    region: "Hauts-de-France",
    region_value: "HDF"
  },
  {
    department: "Orne",
    department_value: "61",
    region: "Normandie",
    region_value: "NOR"
  },
  {
    department: "Pas-de-Calais",
    department_value: "62",
    region: "Hauts-de-France",
    region_value: "HDF"
  },
  {
    department: "Puy-de-Dôme",
    department_value: "63",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Pyrénées-Atlantiques",
    department_value: "64",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Hautes-Pyrénées",
    department_value: "65",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Pyrénées-Orientales",
    department_value: "66",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Bas-Rhin",
    department_value: "67",
    region: "Grand Est",
    region_value: "GES"
  },
  {
    department: "Haut-Rhin",
    department_value: "68",
    region: "Grand Est",
    region_value: "GES"
  },
  {
    department: "Rhône",
    department_value: "69",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Haute-Saône",
    department_value: "70",
    region: "Bourgogne-Franche-Comté",
    region_value: "BFC"
  },
  {
    department: "Saône-et-Loire",
    department_value: "71",
    region: "Bourgogne-Franche-Comté",
    region_value: "BFC"
  },
  {
    department: "Sarthe",
    department_value: "72",
    region: "Pays de la Loire",
    region_value: "PDL"
  },
  {
    department: "Savoie",
    department_value: "73",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Haute-Savoie",
    department_value: "74",
    region: "Auvergne-Rhône-Alpes",
    region_value: "ARA"
  },
  {
    department: "Paris",
    department_value: "75",
    region: "Île-de-France",
    region_value: "IDF"
  },
  {
    department: "Seine-Maritime",
    department_value: "76",
    region: "Normandie",
    region_value: "NOR"
  },
  {
    department: "Seine-et-Marne",
    department_value: "77",
    region: "Île-de-France",
    region_value: "IDF"
  },
  {
    department: "Yvelines",
    department_value: "78",
    region: "Île-de-France",
    region_value: "IDF"
  },
  {
    department: "Deux-Sèvres",
    department_value: "79",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Somme",
    department_value: "80",
    region: "Hauts-de-France",
    region_value: "HDF"
  },
  {
    department: "Tarn",
    department_value: "81",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Tarn-et-Garonne",
    department_value: "82",
    region: "Occitanie",
    region_value: "OCC"
  },
  {
    department: "Var",
    department_value: "83",
    region: "Provence-Alpes-Côte d’Azur",
    region_value: "PAC"
  },
  {
    department: "Vaucluse",
    department_value: "84",
    region: "Provence-Alpes-Côte d’Azur",
    region_value: "PAC"
  },
  {
    department: "Vendée",
    department_value: "85",
    region: "Pays de la Loire",
    region_value: "PDL"
  },
  {
    department: "Vienne",
    department_value: "86",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Haute-Vienne",
    department_value: "87",
    region: "Nouvelle-Aquitaine",
    region_value: "NAQ"
  },
  {
    department: "Vosges",
    department_value: "88",
    region: "Grand Est",
    region_value: "GES"
  },
  {
    department: "Yonne",
    department_value: "89",
    region: "Bourgogne-Franche-Comté",
    region_value: "BFC"
  },
  {
    department: "Territoire-de-Belfort",
    department_value: "90",
    region: "Bourgogne-Franche-Comté",
    region_value: "BFC"
  },
  {
    department: "Essonne",
    department_value: "91",
    region: "Île-de-France",
    region_value: "IDF"
  },
  {
    department: "Hauts-de-Seine",
    department_value: "92",
    region: "Île-de-France",
    region_value: "IDF"
  },
  {
    department: "Seine-Saint-Denis",
    department_value: "93",
    region: "Île-de-France",
    region_value: "IDF"
  },
  {
    department: "Val-de-Marne",
    department_value: "94",
    region: "Île-de-France",
    region_value: "IDF"
  },
  {
    department: "Val-d’Oise",
    department_value: "95",
    region: "Île-de-France",
    region_value: "IDF"
  },
  {
    department: "Guadeloupe",
    department_value: "971",
    region: "Guadeloupe",
    region_value: "971"
  },
  {
    department: "Martinique",
    department_value: "972",
    region: "Martinique",
    region_value: "972"
  },
  {
    department: "Guyane française",
    department_value: "973",
    region: "Guyane",
    region_value: "973"
  },
  {
    department: "Réunion",
    department_value: "974",
    region: "La Réunion",
    region_value: "974"
  },
  {
    department: "Mayotte",
    department_value: "976",
    region: "Mayotte",
    region_value: "976"
  }
];
ut.register(V4, N4, na, ta, Io);
const oy = (e) => e.charAt(0).toUpperCase() + e.slice(1), ry = (e) => e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(), ds = (e) => isNaN(e) ? e : Number.isInteger(e) ? parseInt(e).toLocaleString("fr-FR") : parseFloat(e).toLocaleString("fr-FR", { maximumFractionDigits: 2 }), dr = function() {
  const e = navigator.userAgent || navigator.vendor || window.opera;
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    e.substr(0, 4)
  );
}, ly = (e) => Gs.find((t) => t.department_value === e), ay = (e) => Gs.find((t) => t.region_value === e), cy = () => Gs.map((e) => e.department_value), hy = () => Gs.map((e) => e.region_value), dy = (e) => Gs.filter((n) => n.region_value === e).map((n) => n.department_value), Hi = () => {
  ut.defaults.font.family = "Marianne", ut.defaults.font.size = 12, ut.defaults.font.lineHeight = 1.66, ut.defaults.color = "#6b6b6b", ut.defaults.borderColor = "#cecece";
}, Ln = {
  methods: {
    capitalize: oy,
    formatNumber: ds
  }
}, M1 = {
  methods: {
    getDep: ly,
    getReg: ay,
    getAllDep: cy,
    getAllReg: hy,
    getDepsFromReg: dy
  }
}, ui = {
  props: {
    onenter: Function,
    onleave: Function,
    onclick: Function,
    ondblclick: Function
  }
}, uy = ["id", "aria-labelledby"], fy = { class: "fr-container fr-container--fluid fr-container-md" }, py = { class: "fr-grid-row fr-grid-row--center" }, gy = { class: "fr-col-12 fr-col-md-8 fr-col-lg-6" }, my = { class: "fr-modal__body" }, vy = { class: "fr-modal__header" }, by = ["aria-controls"], yy = { class: "fr-modal__content" }, xy = ["id"], ky = ["innerHTML"], wy = {
  __name: "DialogModal",
  props: {
    id: {
      type: String,
      required: !0
    },
    modalTitle: {
      type: String,
      default: ""
    },
    modalContent: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    return (t, n) => (V(), W("dialog", {
      id: "modal-" + e.id,
      "aria-labelledby": "fr-modal-title-modal-" + e.id,
      role: "dialog",
      class: "fr-modal"
    }, [
      p("div", fy, [
        p("div", py, [
          p("div", gy, [
            p("div", my, [
              p("div", vy, [
                p("button", {
                  class: "fr-btn--close fr-btn",
                  title: "Fermer la fenêtre modale",
                  "aria-controls": "modal-" + e.id
                }, " Fermer ", 8, by)
              ]),
              p("div", yy, [
                p("h1", {
                  id: "fr-modal-title-modal-" + e.id,
                  class: "fr-modal__title"
                }, [
                  n[0] || (n[0] = p("span", { class: "fr-icon-arrow-right-line fr-icon--lg" }, null, -1)),
                  Si(" " + X(e.modalTitle), 1)
                ], 8, xy),
                p("div", { innerHTML: e.modalContent }, null, 8, ky)
              ])
            ])
          ])
        ])
      ])
    ], 8, uy));
  }
}, jt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, s] of t)
    n[i] = s;
  return n;
}, _y = ["id"], My = { class: "fr-p-2w databox__header" }, Cy = { class: "fr-h6 fr-mb-0" }, Sy = ["aria-describedby"], Ey = ["id"], Py = {
  key: 0,
  class: "fr-text--xs fr-mb-0 fr-text--bold"
}, Dy = {
  key: 1,
  class: "fr-text--xs fr-mb-0"
}, Ny = ["aria-controls"], Oy = {
  key: 2,
  role: "navigation",
  class: "fr-translate fr-nav more-actions-menu"
}, Ry = { class: "fr-nav__item fr-nav__item--align-right" }, Ay = ["aria-controls"], Fy = ["id"], Ty = { class: "fr-menu__list" }, Ly = { key: 0 }, Iy = { key: 1 }, Vy = ["id", "title"], $y = { class: "fr-px-2w databox__data" }, By = {
  key: 0,
  class: "databox__source"
}, zy = { class: "fr-select-group" }, Hy = ["for"], jy = ["id"], Wy = ["value"], qy = {
  key: 1,
  class: "databox__tendency"
}, Gy = {
  key: 0,
  class: "fr-text--xs fr-m-0"
}, Yy = ["aria-label"], Uy = {
  key: 1,
  class: "fr-text--xs fr-m-0"
}, Xy = ["aria-label"], Ky = { class: "fr-p-2w databox__content" }, Jy = ["aria-hidden"], Zy = ["id"], Qy = ["aria-hidden"], t5 = ["id"], e5 = ["id"], n5 = { class: "fr-p-2w databox__footer" }, i5 = { class: "fr-text--xs fr-mb-0" }, s5 = { class: "fr-segmented__elements" }, o5 = { class: "fr-segmented__element" }, r5 = ["id", "name"], l5 = ["for"], a5 = { class: "fr-segmented__element" }, c5 = ["id", "name"], h5 = ["for"], d5 = {
  __name: "DataBox",
  props: {
    id: {
      type: String,
      required: !0
    },
    title: {
      type: String,
      required: !0
    },
    tooltipTitle: {
      type: String,
      default: ""
    },
    tooltipContent: {
      type: String,
      default: ""
    },
    modalTitle: {
      type: String,
      default: ""
    },
    modalContent: {
      type: String,
      default: ""
    },
    source: {
      type: String,
      required: !0
    },
    date: {
      type: String,
      required: !0
    },
    defaultSource: {
      type: String,
      default: null
    },
    trend: {
      type: String,
      default: null
    },
    segmentedControl: {
      type: [Boolean, String],
      default: !0
    },
    fullscreen: {
      type: [Boolean, String],
      default: !1
    },
    screenshot: {
      type: [Boolean, String],
      default: !1
    },
    download: {
      type: [Boolean, String],
      default: !1
    },
    actions: {
      type: [Array, String],
      default: () => []
    }
  },
  setup(e) {
    const t = e, n = Js([]), i = Js([]);
    n.value = [...document.querySelectorAll(`[databox-id="${t.id}"][databox-type="chart"]`)].map((m) => m.getAttribute("databox-source") || "default"), i.value = [...document.querySelectorAll(`[databox-id="${t.id}"][databox-type="table"]`)].map((m) => m.getAttribute("databox-source") || "global");
    const s = Js(n.value.includes(t.defaultSource) ? t.defaultSource : n.value[0]), r = (m) => m.map((v) => ({
      label: v.charAt(0).toUpperCase() + v.slice(1).replace(/-/g, " "),
      value: v
    })), o = Xn(() => [!0, "true", ""].includes(t.segmentedControl)), l = Xn(() => [!0, "true", ""].includes(t.fullscreen)), a = Xn(() => [!0, "true", ""].includes(t.screenshot)), c = Xn(() => [!0, "true", ""].includes(t.download)), h = Xn(() => typeof t.actions == "string" ? JSON.parse(t.actions) : t.actions), d = Js(n.value.length > 0 ? "chart" : "table"), u = (m) => {
      d.value = m;
    }, f = (m) => {
      const v = document.querySelector(`[databox-id="${t.id}"][databox-type="${m}"][databox-source="${s.value}"]`), b = JSON.parse(v.getAttribute("x")), _ = JSON.parse(v.getAttribute("y")), S = JSON.parse(v.getAttribute("name")), E = v.getAttribute("table-name") ?? "";
      let k = [];
      k.push(E + "," + S.join(",") + `
`), (m === "chart" ? b[0] : b).forEach((F, R) => {
        k.push(`${F},${_.map((j) => j[R]).join(",")}
`);
      });
      const w = new Blob(k, { type: "text/csv" }), P = window.URL.createObjectURL(w), O = document.createElement("a");
      O.href = P, O.download = "data.csv", O.click(), window.URL.revokeObjectURL(P);
    }, g = () => {
      const m = document.getElementById(`container-${t.id}`), v = m.querySelectorAll(".screenshot-hide-" + t.id);
      v.forEach((E) => E.style.display = "none");
      const b = m.querySelector(".databox__data"), _ = m.querySelector(`#select-${t.id}`), S = m.querySelector(".databox__tendency");
      b.style.display = "block", _ && (_.style.boxShadow = "none", _.style.appearance = "none"), S.style.marginTop = "20px", bm(m).then((E) => {
        const k = document.createElement("a");
        k.href = E, k.download = "chart.png", k.click();
      }).catch((E) => {
        console.error("Error while taking screenshot", E);
      }).finally(() => {
        v.forEach((E) => E.style.removeProperty("display")), b.style.removeProperty("display"), _ && (_.style.removeProperty("box-shadow"), _.style.removeProperty("appearance")), S.style.removeProperty("margin-top");
      });
    };
    return (m, v) => (V(), W("div", {
      id: "container-" + e.id,
      class: "fr-card fr-card--shadow databox"
    }, [
      p("div", My, [
        p("h3", Cy, X(e.title), 1),
        p("div", {
          class: ie("flex screenshot-hide-" + e.id)
        }, [
          p("button", {
            class: "fr-btn--tooltip fr-btn",
            type: "button",
            "aria-describedby": "tooltip-" + e.id,
            title: "Informations complémentaires sur le graphique"
          }, " Informations complémentaires sur le graphique ", 8, Sy),
          e.tooltipTitle || e.tooltipContent ? (V(), W("div", {
            key: 0,
            id: "tooltip-" + e.id,
            class: "fr-tooltip fr-placement",
            role: "tooltip",
            "aria-hidden": "true"
          }, [
            e.tooltipTitle ? (V(), W("p", Py, X(e.tooltipTitle), 1)) : Ct("", !0),
            e.tooltipContent ? (V(), W("p", Dy, X(e.tooltipContent), 1)) : Ct("", !0)
          ], 8, Ey)) : Ct("", !0),
          l.value ? (V(), W("button", {
            key: 1,
            type: "button",
            class: "fr-btn fr-btn--sm fr-icon-fullscreen-line fr-btn--tertiary-no-outline fr-ratio-1x1",
            "data-fr-opened": "false",
            "aria-controls": "modal-" + e.id,
            title: "Afficher la modale"
          }, null, 8, Ny)) : Ct("", !0),
          (V(), Ce(Fe, { to: "body" }, [
            At(wy, {
              id: e.id,
              "modal-title": e.modalTitle,
              "modal-content": e.modalContent
            }, null, 8, ["id", "modal-title", "modal-content"])
          ])),
          a.value || c.value || h.value.length ? (V(), W("nav", Oy, [
            p("div", Ry, [
              p("button", {
                class: "fr-btn fr-btn--sm fr-icon-more-line fr-btn--tertiary-no-outline fr-ratio-1x1",
                "aria-controls": "translate-" + e.id,
                "aria-expanded": "false",
                title: "Plus d'actions"
              }, null, 8, Ay),
              p("div", {
                id: "translate-" + e.id,
                class: "fr-collapse fr-translate__menu fr-menu"
              }, [
                p("ul", Ty, [
                  a.value ? (V(), W("li", Ly, [
                    p("button", {
                      class: "fr-translate__language fr-nav__link",
                      title: "Prendre une capture d'écran",
                      onClick: v[0] || (v[0] = (b) => g())
                    }, " Capture d'écran ")
                  ])) : Ct("", !0),
                  c.value ? (V(), W("li", Iy, [
                    p("button", {
                      class: "fr-translate__language fr-nav__link",
                      title: "Télécharger les données en CSV",
                      onClick: v[1] || (v[1] = (b) => f(d.value))
                    }, " Télécharger en CSV ")
                  ])) : Ct("", !0),
                  (V(!0), W(vt, null, Ft(h.value, (b, _) => (V(), W("li", { key: _ }, [
                    p("button", {
                      id: Kn(ry)(b),
                      class: "fr-translate__language fr-nav__link",
                      title: b
                    }, X(b), 9, Vy)
                  ]))), 128))
                ])
              ], 8, Fy)
            ])
          ])) : Ct("", !0)
        ], 2)
      ]),
      p("div", $y, [
        n.value.length > 1 ? (V(), W("div", By, [
          p("div", zy, [
            p("label", {
              class: "fr-label fr-text--xs fr-mb-0",
              for: "select-" + e.id
            }, " Choisir une source de données ", 8, Hy),
            E2(p("select", {
              id: "select-" + e.id,
              "onUpdate:modelValue": v[2] || (v[2] = (b) => s.value = b),
              name: "select",
              class: "fr-select fr-mt-0"
            }, [
              (V(!0), W(vt, null, Ft(r(n.value), (b) => (V(), W("option", {
                key: b.value,
                value: b.value
              }, X(b.label), 9, Wy))), 128))
            ], 8, jy), [
              [v3, s.value]
            ])
          ])
        ])) : Ct("", !0),
        e.trend ? (V(), W("div", qy, [
          e.trend.includes("-") ? (V(), W("p", Gy, [
            v[5] || (v[5] = Si(" En baisse ")),
            p("span", {
              class: "fr-badge fr-badge--error fr-badge--no-icon fr-badge--sm fr-ml-1v",
              "aria-label": "Baisse de " + e.trend.replace("-", "").trim()
            }, [
              p("span", {
                class: ie("fr-pr-1v screenshot-hide-" + e.id),
                "aria-hidden": "true"
              }, "↘ ", 2),
              Si(" " + X(e.trend.replace("-", "").trim()), 1)
            ], 8, Yy)
          ])) : (V(), W("p", Uy, [
            v[6] || (v[6] = Si(" En hausse ")),
            p("span", {
              class: "fr-badge fr-badge--success fr-badge--no-icon fr-badge--sm fr-ml-1v",
              "aria-label": "Hausse de " + e.trend.trim()
            }, [
              p("span", {
                class: ie("fr-pr-1v screenshot-hide-" + e.id),
                "aria-hidden": "true"
              }, "↗ ", 2),
              Si(" " + X(e.trend.trim()), 1)
            ], 8, Xy)
          ]))
        ])) : Ct("", !0)
      ]),
      p("div", Ky, [
        p("div", {
          class: ie(d.value === "table" ? "fr-hidden" : "w-full"),
          "aria-hidden": d.value === "chart"
        }, [
          (V(!0), W(vt, null, Ft(n.value, (b, _) => (V(), W("div", {
            id: e.id + "-chart-" + b,
            key: _,
            class: ie(s.value !== b ? "fr-hidden" : "")
          }, null, 10, Zy))), 128))
        ], 10, Jy),
        p("div", {
          class: ie(d.value === "chart" ? "fr-hidden" : "w-full"),
          "aria-hidden": d.value === "table"
        }, [
          (V(!0), W(vt, null, Ft(i.value.filter((b) => b !== "global"), (b, _) => (V(), W("div", {
            id: e.id + "-table-" + b,
            key: _,
            class: ie(s.value !== b ? "fr-hidden" : "")
          }, null, 10, t5))), 128)),
          i.value.includes("global") ? (V(), W("div", {
            key: 0,
            id: e.id + "-table-global",
            class: ie(i.value.includes(s.value) ? "fr-hidden" : "")
          }, null, 10, e5)) : Ct("", !0)
        ], 10, Qy)
      ]),
      p("div", n5, [
        p("p", i5, X(e.source) + ", " + X(e.date), 1),
        o.value && n.value.length > 0 ? (V(), W("fieldset", {
          key: 0,
          class: ie("fr-segmented fr-segmented--no-legend fr-segmented--sm screenshot-hide-" + e.id)
        }, [
          v[9] || (v[9] = p("legend", { class: "fr-segmented__legend" }, " Choisir votre vue ", -1)),
          p("div", s5, [
            p("div", o5, [
              p("input", {
                id: "segmented-chart-" + e.id,
                value: "1",
                type: "radio",
                checked: "",
                name: "segmented-" + e.id,
                onChange: v[3] || (v[3] = (b) => u("chart"))
              }, null, 40, r5),
              p("label", {
                class: "fr-label",
                for: "segmented-chart-" + e.id
              }, v[7] || (v[7] = [
                p("span", {
                  class: "fr-icon-pie-chart-2-fill fr-icon--sm",
                  "aria-hidden": "true"
                }, null, -1),
                p("span", { class: "fr-sr-only" }, "Vue graphique", -1)
              ]), 8, l5)
            ]),
            p("div", a5, [
              p("input", {
                id: "segmented-table-" + e.id,
                value: "2",
                type: "radio",
                name: "segmented-" + e.id,
                onChange: v[4] || (v[4] = (b) => u("table"))
              }, null, 40, c5),
              p("label", {
                class: "fr-label",
                for: "segmented-table-" + e.id
              }, v[8] || (v[8] = [
                p("span", {
                  class: "fr-icon-table-2 fr-icon fr-icon--sm",
                  "aria-hidden": "true"
                }, null, -1),
                p("span", { class: "fr-sr-only" }, "Vue tableau", -1)
              ]), 8, h5)
            ])
          ])
        ], 2)) : Ct("", !0)
      ])
    ], 8, _y));
  }
}, u5 = /* @__PURE__ */ jt(d5, [["__scopeId", "data-v-de2712de"]]), { min: f5, max: p5 } = Math, ri = (e, t = 0, n = 1) => f5(p5(t, e), n), tc = (e) => {
  e._clipped = !1, e._unclipped = e.slice(0);
  for (let t = 0; t <= 3; t++)
    t < 3 ? ((e[t] < 0 || e[t] > 255) && (e._clipped = !0), e[t] = ri(e[t], 0, 255)) : t === 3 && (e[t] = ri(e[t], 0, 1));
  return e;
}, C1 = {};
for (let e of [
  "Boolean",
  "Number",
  "String",
  "Function",
  "Array",
  "Date",
  "RegExp",
  "Undefined",
  "Null"
])
  C1[`[object ${e}]`] = e.toLowerCase();
function ht(e) {
  return C1[Object.prototype.toString.call(e)] || "object";
}
const lt = (e, t = null) => e.length >= 3 ? Array.prototype.slice.call(e) : ht(e[0]) == "object" && t ? t.split("").filter((n) => e[0][n] !== void 0).map((n) => e[0][n]) : e[0].slice(0), ji = (e) => {
  if (e.length < 2) return null;
  const t = e.length - 1;
  return ht(e[t]) == "string" ? e[t].toLowerCase() : null;
}, { PI: Vr, min: S1, max: E1 } = Math, we = (e) => Math.round(e * 100) / 100, sa = (e) => Math.round(e * 100) / 100, dn = Vr * 2, pl = Vr / 3, g5 = Vr / 180, m5 = 180 / Vr;
function P1(e) {
  return [...e.slice(0, 3).reverse(), ...e.slice(3)];
}
const rt = {
  format: {},
  autodetect: []
};
let $ = class {
  constructor(...t) {
    const n = this;
    if (ht(t[0]) === "object" && t[0].constructor && t[0].constructor === this.constructor)
      return t[0];
    let i = ji(t), s = !1;
    if (!i) {
      s = !0, rt.sorted || (rt.autodetect = rt.autodetect.sort((r, o) => o.p - r.p), rt.sorted = !0);
      for (let r of rt.autodetect)
        if (i = r.test(...t), i) break;
    }
    if (rt.format[i]) {
      const r = rt.format[i].apply(
        null,
        s ? t : t.slice(0, -1)
      );
      n._rgb = tc(r);
    } else
      throw new Error("unknown format: " + t);
    n._rgb.length === 3 && n._rgb.push(1);
  }
  toString() {
    return ht(this.hex) == "function" ? this.hex() : `[${this._rgb.join(",")}]`;
  }
};
const v5 = "3.1.2", tt = (...e) => new $(...e);
tt.version = v5;
const Ii = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  laserlemon: "#ffff54",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrod: "#fafad2",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  maroon2: "#7f0000",
  maroon3: "#b03060",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  purple2: "#7f007f",
  purple3: "#a020f0",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
}, b5 = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, y5 = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/, D1 = (e) => {
  if (e.match(b5)) {
    (e.length === 4 || e.length === 7) && (e = e.substr(1)), e.length === 3 && (e = e.split(""), e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]);
    const t = parseInt(e, 16), n = t >> 16, i = t >> 8 & 255, s = t & 255;
    return [n, i, s, 1];
  }
  if (e.match(y5)) {
    (e.length === 5 || e.length === 9) && (e = e.substr(1)), e.length === 4 && (e = e.split(""), e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2] + e[3] + e[3]);
    const t = parseInt(e, 16), n = t >> 24 & 255, i = t >> 16 & 255, s = t >> 8 & 255, r = Math.round((t & 255) / 255 * 100) / 100;
    return [n, i, s, r];
  }
  throw new Error(`unknown hex color: ${e}`);
}, { round: mo } = Math, N1 = (...e) => {
  let [t, n, i, s] = lt(e, "rgba"), r = ji(e) || "auto";
  s === void 0 && (s = 1), r === "auto" && (r = s < 1 ? "rgba" : "rgb"), t = mo(t), n = mo(n), i = mo(i);
  let l = "000000" + (t << 16 | n << 8 | i).toString(16);
  l = l.substr(l.length - 6);
  let a = "0" + mo(s * 255).toString(16);
  switch (a = a.substr(a.length - 2), r.toLowerCase()) {
    case "rgba":
      return `#${l}${a}`;
    case "argb":
      return `#${a}${l}`;
    default:
      return `#${l}`;
  }
};
$.prototype.name = function() {
  const e = N1(this._rgb, "rgb");
  for (let t of Object.keys(Ii))
    if (Ii[t] === e) return t.toLowerCase();
  return e;
};
rt.format.named = (e) => {
  if (e = e.toLowerCase(), Ii[e]) return D1(Ii[e]);
  throw new Error("unknown color name: " + e);
};
rt.autodetect.push({
  p: 5,
  test: (e, ...t) => {
    if (!t.length && ht(e) === "string" && Ii[e.toLowerCase()])
      return "named";
  }
});
$.prototype.alpha = function(e, t = !1) {
  return e !== void 0 && ht(e) === "number" ? t ? (this._rgb[3] = e, this) : new $([this._rgb[0], this._rgb[1], this._rgb[2], e], "rgb") : this._rgb[3];
};
$.prototype.clipped = function() {
  return this._rgb._clipped || !1;
};
const Je = {
  // Corresponds roughly to RGB brighter/darker
  Kn: 18,
  // D65 standard referent
  labWhitePoint: "d65",
  Xn: 0.95047,
  Yn: 1,
  Zn: 1.08883,
  kE: 216 / 24389,
  kKE: 8,
  kK: 24389 / 27,
  RefWhiteRGB: {
    // sRGB
    X: 0.95047,
    Y: 1,
    Z: 1.08883
  },
  MtxRGB2XYZ: {
    m00: 0.4124564390896922,
    m01: 0.21267285140562253,
    m02: 0.0193338955823293,
    m10: 0.357576077643909,
    m11: 0.715152155287818,
    m12: 0.11919202588130297,
    m20: 0.18043748326639894,
    m21: 0.07217499330655958,
    m22: 0.9503040785363679
  },
  MtxXYZ2RGB: {
    m00: 3.2404541621141045,
    m01: -0.9692660305051868,
    m02: 0.055643430959114726,
    m10: -1.5371385127977166,
    m11: 1.8760108454466942,
    m12: -0.2040259135167538,
    m20: -0.498531409556016,
    m21: 0.041556017530349834,
    m22: 1.0572251882231791
  },
  // used in rgb2xyz
  As: 0.9414285350000001,
  Bs: 1.040417467,
  Cs: 1.089532651,
  MtxAdaptMa: {
    m00: 0.8951,
    m01: -0.7502,
    m02: 0.0389,
    m10: 0.2664,
    m11: 1.7135,
    m12: -0.0685,
    m20: -0.1614,
    m21: 0.0367,
    m22: 1.0296
  },
  MtxAdaptMaI: {
    m00: 0.9869929054667123,
    m01: 0.43230526972339456,
    m02: -0.008528664575177328,
    m10: -0.14705425642099013,
    m11: 0.5183602715367776,
    m12: 0.04004282165408487,
    m20: 0.15996265166373125,
    m21: 0.0492912282128556,
    m22: 0.9684866957875502
  }
}, x5 = /* @__PURE__ */ new Map([
  // ASTM E308-01
  ["a", [1.0985, 0.35585]],
  // Wyszecki & Stiles, p. 769
  ["b", [1.0985, 0.35585]],
  // C ASTM E308-01
  ["c", [0.98074, 1.18232]],
  // D50 (ASTM E308-01)
  ["d50", [0.96422, 0.82521]],
  // D55 (ASTM E308-01)
  ["d55", [0.95682, 0.92149]],
  // D65 (ASTM E308-01)
  ["d65", [0.95047, 1.08883]],
  // E (ASTM E308-01)
  ["e", [1, 1, 1]],
  // F2 (ASTM E308-01)
  ["f2", [0.99186, 0.67393]],
  // F7 (ASTM E308-01)
  ["f7", [0.95041, 1.08747]],
  // F11 (ASTM E308-01)
  ["f11", [1.00962, 0.6435]],
  ["icc", [0.96422, 0.82521]]
]);
function gn(e) {
  const t = x5.get(String(e).toLowerCase());
  if (!t)
    throw new Error("unknown Lab illuminant " + e);
  Je.labWhitePoint = e, Je.Xn = t[0], Je.Zn = t[1];
}
function As() {
  return Je.labWhitePoint;
}
const ec = (...e) => {
  e = lt(e, "lab");
  const [t, n, i] = e, [s, r, o] = k5(t, n, i), [l, a, c] = O1(s, r, o);
  return [l, a, c, e.length > 3 ? e[3] : 1];
}, k5 = (e, t, n) => {
  const { kE: i, kK: s, kKE: r, Xn: o, Yn: l, Zn: a } = Je, c = (e + 16) / 116, h = 2e-3 * t + c, d = c - 5e-3 * n, u = h * h * h, f = d * d * d, g = u > i ? u : (116 * h - 16) / s, m = e > r ? Math.pow((e + 16) / 116, 3) : e / s, v = f > i ? f : (116 * d - 16) / s, b = g * o, _ = m * l, S = v * a;
  return [b, _, S];
}, gl = (e) => {
  const t = Math.sign(e);
  return e = Math.abs(e), (e <= 31308e-7 ? e * 12.92 : 1.055 * Math.pow(e, 1 / 2.4) - 0.055) * t;
}, O1 = (e, t, n) => {
  const { MtxAdaptMa: i, MtxAdaptMaI: s, MtxXYZ2RGB: r, RefWhiteRGB: o, Xn: l, Yn: a, Zn: c } = Je, h = l * i.m00 + a * i.m10 + c * i.m20, d = l * i.m01 + a * i.m11 + c * i.m21, u = l * i.m02 + a * i.m12 + c * i.m22, f = o.X * i.m00 + o.Y * i.m10 + o.Z * i.m20, g = o.X * i.m01 + o.Y * i.m11 + o.Z * i.m21, m = o.X * i.m02 + o.Y * i.m12 + o.Z * i.m22, v = (e * i.m00 + t * i.m10 + n * i.m20) * (f / h), b = (e * i.m01 + t * i.m11 + n * i.m21) * (g / d), _ = (e * i.m02 + t * i.m12 + n * i.m22) * (m / u), S = v * s.m00 + b * s.m10 + _ * s.m20, E = v * s.m01 + b * s.m11 + _ * s.m21, k = v * s.m02 + b * s.m12 + _ * s.m22, N = gl(
    S * r.m00 + E * r.m10 + k * r.m20
  ), w = gl(
    S * r.m01 + E * r.m11 + k * r.m21
  ), P = gl(
    S * r.m02 + E * r.m12 + k * r.m22
  );
  return [N * 255, w * 255, P * 255];
}, nc = (...e) => {
  const [t, n, i, ...s] = lt(e, "rgb"), [r, o, l] = R1(t, n, i), [a, c, h] = w5(r, o, l);
  return [a, c, h, ...s.length > 0 && s[0] < 1 ? [s[0]] : []];
};
function w5(e, t, n) {
  const { Xn: i, Yn: s, Zn: r, kE: o, kK: l } = Je, a = e / i, c = t / s, h = n / r, d = a > o ? Math.pow(a, 1 / 3) : (l * a + 16) / 116, u = c > o ? Math.pow(c, 1 / 3) : (l * c + 16) / 116, f = h > o ? Math.pow(h, 1 / 3) : (l * h + 16) / 116;
  return [116 * u - 16, 500 * (d - u), 200 * (u - f)];
}
function ml(e) {
  const t = Math.sign(e);
  return e = Math.abs(e), (e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4)) * t;
}
const R1 = (e, t, n) => {
  e = ml(e / 255), t = ml(t / 255), n = ml(n / 255);
  const { MtxRGB2XYZ: i, MtxAdaptMa: s, MtxAdaptMaI: r, Xn: o, Yn: l, Zn: a, As: c, Bs: h, Cs: d } = Je;
  let u = e * i.m00 + t * i.m10 + n * i.m20, f = e * i.m01 + t * i.m11 + n * i.m21, g = e * i.m02 + t * i.m12 + n * i.m22;
  const m = o * s.m00 + l * s.m10 + a * s.m20, v = o * s.m01 + l * s.m11 + a * s.m21, b = o * s.m02 + l * s.m12 + a * s.m22;
  let _ = u * s.m00 + f * s.m10 + g * s.m20, S = u * s.m01 + f * s.m11 + g * s.m21, E = u * s.m02 + f * s.m12 + g * s.m22;
  return _ *= m / c, S *= v / h, E *= b / d, u = _ * r.m00 + S * r.m10 + E * r.m20, f = _ * r.m01 + S * r.m11 + E * r.m21, g = _ * r.m02 + S * r.m12 + E * r.m22, [u, f, g];
};
$.prototype.lab = function() {
  return nc(this._rgb);
};
const _5 = (...e) => new $(...e, "lab");
Object.assign(tt, { lab: _5, getLabWhitePoint: As, setLabWhitePoint: gn });
rt.format.lab = ec;
rt.autodetect.push({
  p: 2,
  test: (...e) => {
    if (e = lt(e, "lab"), ht(e) === "array" && e.length === 3)
      return "lab";
  }
});
$.prototype.darken = function(e = 1) {
  const t = this, n = t.lab();
  return n[0] -= Je.Kn * e, new $(n, "lab").alpha(t.alpha(), !0);
};
$.prototype.brighten = function(e = 1) {
  return this.darken(-e);
};
$.prototype.darker = $.prototype.darken;
$.prototype.brighter = $.prototype.brighten;
$.prototype.get = function(e) {
  const [t, n] = e.split("."), i = this[t]();
  if (n) {
    const s = t.indexOf(n) - (t.substr(0, 2) === "ok" ? 2 : 0);
    if (s > -1) return i[s];
    throw new Error(`unknown channel ${n} in mode ${t}`);
  } else
    return i;
};
const { pow: M5 } = Math, C5 = 1e-7, S5 = 20;
$.prototype.luminance = function(e, t = "rgb") {
  if (e !== void 0 && ht(e) === "number") {
    if (e === 0)
      return new $([0, 0, 0, this._rgb[3]], "rgb");
    if (e === 1)
      return new $([255, 255, 255, this._rgb[3]], "rgb");
    let n = this.luminance(), i = S5;
    const s = (o, l) => {
      const a = o.interpolate(l, 0.5, t), c = a.luminance();
      return Math.abs(e - c) < C5 || !i-- ? a : c > e ? s(o, a) : s(a, l);
    }, r = (n > e ? s(new $([0, 0, 0]), this) : s(this, new $([255, 255, 255]))).rgb();
    return new $([...r, this._rgb[3]]);
  }
  return E5(...this._rgb.slice(0, 3));
};
const E5 = (e, t, n) => (e = vl(e), t = vl(t), n = vl(n), 0.2126 * e + 0.7152 * t + 0.0722 * n), vl = (e) => (e /= 255, e <= 0.03928 ? e / 12.92 : M5((e + 0.055) / 1.055, 2.4)), Jt = {}, Vi = (e, t, n = 0.5, ...i) => {
  let s = i[0] || "lrgb";
  if (!Jt[s] && !i.length && (s = Object.keys(Jt)[0]), !Jt[s])
    throw new Error(`interpolation mode ${s} is not defined`);
  return ht(e) !== "object" && (e = new $(e)), ht(t) !== "object" && (t = new $(t)), Jt[s](e, t, n).alpha(
    e.alpha() + n * (t.alpha() - e.alpha())
  );
};
$.prototype.mix = $.prototype.interpolate = function(e, t = 0.5, ...n) {
  return Vi(this, e, t, ...n);
};
$.prototype.premultiply = function(e = !1) {
  const t = this._rgb, n = t[3];
  return e ? (this._rgb = [t[0] * n, t[1] * n, t[2] * n, n], this) : new $([t[0] * n, t[1] * n, t[2] * n, n], "rgb");
};
const { sin: P5, cos: D5 } = Math, A1 = (...e) => {
  let [t, n, i] = lt(e, "lch");
  return isNaN(i) && (i = 0), i = i * g5, [t, D5(i) * n, P5(i) * n];
}, ic = (...e) => {
  e = lt(e, "lch");
  const [t, n, i] = e, [s, r, o] = A1(t, n, i), [l, a, c] = ec(s, r, o);
  return [l, a, c, e.length > 3 ? e[3] : 1];
}, N5 = (...e) => {
  const t = P1(lt(e, "hcl"));
  return ic(...t);
}, { sqrt: O5, atan2: R5, round: A5 } = Math, F1 = (...e) => {
  const [t, n, i] = lt(e, "lab"), s = O5(n * n + i * i);
  let r = (R5(i, n) * m5 + 360) % 360;
  return A5(s * 1e4) === 0 && (r = Number.NaN), [t, s, r];
}, sc = (...e) => {
  const [t, n, i, ...s] = lt(e, "rgb"), [r, o, l] = nc(t, n, i), [a, c, h] = F1(r, o, l);
  return [a, c, h, ...s.length > 0 && s[0] < 1 ? [s[0]] : []];
};
$.prototype.lch = function() {
  return sc(this._rgb);
};
$.prototype.hcl = function() {
  return P1(sc(this._rgb));
};
const F5 = (...e) => new $(...e, "lch"), T5 = (...e) => new $(...e, "hcl");
Object.assign(tt, { lch: F5, hcl: T5 });
rt.format.lch = ic;
rt.format.hcl = N5;
["lch", "hcl"].forEach(
  (e) => rt.autodetect.push({
    p: 2,
    test: (...t) => {
      if (t = lt(t, e), ht(t) === "array" && t.length === 3)
        return e;
    }
  })
);
$.prototype.saturate = function(e = 1) {
  const t = this, n = t.lch();
  return n[1] += Je.Kn * e, n[1] < 0 && (n[1] = 0), new $(n, "lch").alpha(t.alpha(), !0);
};
$.prototype.desaturate = function(e = 1) {
  return this.saturate(-e);
};
$.prototype.set = function(e, t, n = !1) {
  const [i, s] = e.split("."), r = this[i]();
  if (s) {
    const o = i.indexOf(s) - (i.substr(0, 2) === "ok" ? 2 : 0);
    if (o > -1) {
      if (ht(t) == "string")
        switch (t.charAt(0)) {
          case "+":
            r[o] += +t;
            break;
          case "-":
            r[o] += +t;
            break;
          case "*":
            r[o] *= +t.substr(1);
            break;
          case "/":
            r[o] /= +t.substr(1);
            break;
          default:
            r[o] = +t;
        }
      else if (ht(t) === "number")
        r[o] = t;
      else
        throw new Error("unsupported value for Color.set");
      const l = new $(r, i);
      return n ? (this._rgb = l._rgb, this) : l;
    }
    throw new Error(`unknown channel ${s} in mode ${i}`);
  } else
    return r;
};
$.prototype.tint = function(e = 0.5, ...t) {
  return Vi(this, "white", e, ...t);
};
$.prototype.shade = function(e = 0.5, ...t) {
  return Vi(this, "black", e, ...t);
};
const L5 = (e, t, n) => {
  const i = e._rgb, s = t._rgb;
  return new $(
    i[0] + n * (s[0] - i[0]),
    i[1] + n * (s[1] - i[1]),
    i[2] + n * (s[2] - i[2]),
    "rgb"
  );
};
Jt.rgb = L5;
const { sqrt: bl, pow: ki } = Math, I5 = (e, t, n) => {
  const [i, s, r] = e._rgb, [o, l, a] = t._rgb;
  return new $(
    bl(ki(i, 2) * (1 - n) + ki(o, 2) * n),
    bl(ki(s, 2) * (1 - n) + ki(l, 2) * n),
    bl(ki(r, 2) * (1 - n) + ki(a, 2) * n),
    "rgb"
  );
};
Jt.lrgb = I5;
const V5 = (e, t, n) => {
  const i = e.lab(), s = t.lab();
  return new $(
    i[0] + n * (s[0] - i[0]),
    i[1] + n * (s[1] - i[1]),
    i[2] + n * (s[2] - i[2]),
    "lab"
  );
};
Jt.lab = V5;
const Wi = (e, t, n, i) => {
  let s, r;
  i === "hsl" ? (s = e.hsl(), r = t.hsl()) : i === "hsv" ? (s = e.hsv(), r = t.hsv()) : i === "hcg" ? (s = e.hcg(), r = t.hcg()) : i === "hsi" ? (s = e.hsi(), r = t.hsi()) : i === "lch" || i === "hcl" ? (i = "hcl", s = e.hcl(), r = t.hcl()) : i === "oklch" && (s = e.oklch().reverse(), r = t.oklch().reverse());
  let o, l, a, c, h, d;
  (i.substr(0, 1) === "h" || i === "oklch") && ([o, a, h] = s, [l, c, d] = r);
  let u, f, g, m;
  return !isNaN(o) && !isNaN(l) ? (l > o && l - o > 180 ? m = l - (o + 360) : l < o && o - l > 180 ? m = l + 360 - o : m = l - o, f = o + n * m) : isNaN(o) ? isNaN(l) ? f = Number.NaN : (f = l, (h == 1 || h == 0) && i != "hsv" && (u = c)) : (f = o, (d == 1 || d == 0) && i != "hsv" && (u = a)), u === void 0 && (u = a + n * (c - a)), g = h + n * (d - h), i === "oklch" ? new $([g, u, f], i) : new $([f, u, g], i);
}, T1 = (e, t, n) => Wi(e, t, n, "lch");
Jt.lch = T1;
Jt.hcl = T1;
const $5 = (e) => {
  if (ht(e) == "number" && e >= 0 && e <= 16777215) {
    const t = e >> 16, n = e >> 8 & 255, i = e & 255;
    return [t, n, i, 1];
  }
  throw new Error("unknown num color: " + e);
}, B5 = (...e) => {
  const [t, n, i] = lt(e, "rgb");
  return (t << 16) + (n << 8) + i;
};
$.prototype.num = function() {
  return B5(this._rgb);
};
const z5 = (...e) => new $(...e, "num");
Object.assign(tt, { num: z5 });
rt.format.num = $5;
rt.autodetect.push({
  p: 5,
  test: (...e) => {
    if (e.length === 1 && ht(e[0]) === "number" && e[0] >= 0 && e[0] <= 16777215)
      return "num";
  }
});
const H5 = (e, t, n) => {
  const i = e.num(), s = t.num();
  return new $(i + n * (s - i), "num");
};
Jt.num = H5;
const { floor: j5 } = Math, W5 = (...e) => {
  e = lt(e, "hcg");
  let [t, n, i] = e, s, r, o;
  i = i * 255;
  const l = n * 255;
  if (n === 0)
    s = r = o = i;
  else {
    t === 360 && (t = 0), t > 360 && (t -= 360), t < 0 && (t += 360), t /= 60;
    const a = j5(t), c = t - a, h = i * (1 - n), d = h + l * (1 - c), u = h + l * c, f = h + l;
    switch (a) {
      case 0:
        [s, r, o] = [f, u, h];
        break;
      case 1:
        [s, r, o] = [d, f, h];
        break;
      case 2:
        [s, r, o] = [h, f, u];
        break;
      case 3:
        [s, r, o] = [h, d, f];
        break;
      case 4:
        [s, r, o] = [u, h, f];
        break;
      case 5:
        [s, r, o] = [f, h, d];
        break;
    }
  }
  return [s, r, o, e.length > 3 ? e[3] : 1];
}, q5 = (...e) => {
  const [t, n, i] = lt(e, "rgb"), s = S1(t, n, i), r = E1(t, n, i), o = r - s, l = o * 100 / 255, a = s / (255 - o) * 100;
  let c;
  return o === 0 ? c = Number.NaN : (t === r && (c = (n - i) / o), n === r && (c = 2 + (i - t) / o), i === r && (c = 4 + (t - n) / o), c *= 60, c < 0 && (c += 360)), [c, l, a];
};
$.prototype.hcg = function() {
  return q5(this._rgb);
};
const G5 = (...e) => new $(...e, "hcg");
tt.hcg = G5;
rt.format.hcg = W5;
rt.autodetect.push({
  p: 1,
  test: (...e) => {
    if (e = lt(e, "hcg"), ht(e) === "array" && e.length === 3)
      return "hcg";
  }
});
const Y5 = (e, t, n) => Wi(e, t, n, "hcg");
Jt.hcg = Y5;
const { cos: wi } = Math, U5 = (...e) => {
  e = lt(e, "hsi");
  let [t, n, i] = e, s, r, o;
  return isNaN(t) && (t = 0), isNaN(n) && (n = 0), t > 360 && (t -= 360), t < 0 && (t += 360), t /= 360, t < 1 / 3 ? (o = (1 - n) / 3, s = (1 + n * wi(dn * t) / wi(pl - dn * t)) / 3, r = 1 - (o + s)) : t < 2 / 3 ? (t -= 1 / 3, s = (1 - n) / 3, r = (1 + n * wi(dn * t) / wi(pl - dn * t)) / 3, o = 1 - (s + r)) : (t -= 2 / 3, r = (1 - n) / 3, o = (1 + n * wi(dn * t) / wi(pl - dn * t)) / 3, s = 1 - (r + o)), s = ri(i * s * 3), r = ri(i * r * 3), o = ri(i * o * 3), [s * 255, r * 255, o * 255, e.length > 3 ? e[3] : 1];
}, { min: X5, sqrt: K5, acos: J5 } = Math, Z5 = (...e) => {
  let [t, n, i] = lt(e, "rgb");
  t /= 255, n /= 255, i /= 255;
  let s;
  const r = X5(t, n, i), o = (t + n + i) / 3, l = o > 0 ? 1 - r / o : 0;
  return l === 0 ? s = NaN : (s = (t - n + (t - i)) / 2, s /= K5((t - n) * (t - n) + (t - i) * (n - i)), s = J5(s), i > n && (s = dn - s), s /= dn), [s * 360, l, o];
};
$.prototype.hsi = function() {
  return Z5(this._rgb);
};
const Q5 = (...e) => new $(...e, "hsi");
tt.hsi = Q5;
rt.format.hsi = U5;
rt.autodetect.push({
  p: 2,
  test: (...e) => {
    if (e = lt(e, "hsi"), ht(e) === "array" && e.length === 3)
      return "hsi";
  }
});
const t6 = (e, t, n) => Wi(e, t, n, "hsi");
Jt.hsi = t6;
const oa = (...e) => {
  e = lt(e, "hsl");
  const [t, n, i] = e;
  let s, r, o;
  if (n === 0)
    s = r = o = i * 255;
  else {
    const l = [0, 0, 0], a = [0, 0, 0], c = i < 0.5 ? i * (1 + n) : i + n - i * n, h = 2 * i - c, d = t / 360;
    l[0] = d + 1 / 3, l[1] = d, l[2] = d - 1 / 3;
    for (let u = 0; u < 3; u++)
      l[u] < 0 && (l[u] += 1), l[u] > 1 && (l[u] -= 1), 6 * l[u] < 1 ? a[u] = h + (c - h) * 6 * l[u] : 2 * l[u] < 1 ? a[u] = c : 3 * l[u] < 2 ? a[u] = h + (c - h) * (2 / 3 - l[u]) * 6 : a[u] = h;
    [s, r, o] = [a[0] * 255, a[1] * 255, a[2] * 255];
  }
  return e.length > 3 ? [s, r, o, e[3]] : [s, r, o, 1];
}, L1 = (...e) => {
  e = lt(e, "rgba");
  let [t, n, i] = e;
  t /= 255, n /= 255, i /= 255;
  const s = S1(t, n, i), r = E1(t, n, i), o = (r + s) / 2;
  let l, a;
  return r === s ? (l = 0, a = Number.NaN) : l = o < 0.5 ? (r - s) / (r + s) : (r - s) / (2 - r - s), t == r ? a = (n - i) / (r - s) : n == r ? a = 2 + (i - t) / (r - s) : i == r && (a = 4 + (t - n) / (r - s)), a *= 60, a < 0 && (a += 360), e.length > 3 && e[3] !== void 0 ? [a, l, o, e[3]] : [a, l, o];
};
$.prototype.hsl = function() {
  return L1(this._rgb);
};
const e6 = (...e) => new $(...e, "hsl");
tt.hsl = e6;
rt.format.hsl = oa;
rt.autodetect.push({
  p: 2,
  test: (...e) => {
    if (e = lt(e, "hsl"), ht(e) === "array" && e.length === 3)
      return "hsl";
  }
});
const n6 = (e, t, n) => Wi(e, t, n, "hsl");
Jt.hsl = n6;
const { floor: i6 } = Math, s6 = (...e) => {
  e = lt(e, "hsv");
  let [t, n, i] = e, s, r, o;
  if (i *= 255, n === 0)
    s = r = o = i;
  else {
    t === 360 && (t = 0), t > 360 && (t -= 360), t < 0 && (t += 360), t /= 60;
    const l = i6(t), a = t - l, c = i * (1 - n), h = i * (1 - n * a), d = i * (1 - n * (1 - a));
    switch (l) {
      case 0:
        [s, r, o] = [i, d, c];
        break;
      case 1:
        [s, r, o] = [h, i, c];
        break;
      case 2:
        [s, r, o] = [c, i, d];
        break;
      case 3:
        [s, r, o] = [c, h, i];
        break;
      case 4:
        [s, r, o] = [d, c, i];
        break;
      case 5:
        [s, r, o] = [i, c, h];
        break;
    }
  }
  return [s, r, o, e.length > 3 ? e[3] : 1];
}, { min: o6, max: r6 } = Math, l6 = (...e) => {
  e = lt(e, "rgb");
  let [t, n, i] = e;
  const s = o6(t, n, i), r = r6(t, n, i), o = r - s;
  let l, a, c;
  return c = r / 255, r === 0 ? (l = Number.NaN, a = 0) : (a = o / r, t === r && (l = (n - i) / o), n === r && (l = 2 + (i - t) / o), i === r && (l = 4 + (t - n) / o), l *= 60, l < 0 && (l += 360)), [l, a, c];
};
$.prototype.hsv = function() {
  return l6(this._rgb);
};
const a6 = (...e) => new $(...e, "hsv");
tt.hsv = a6;
rt.format.hsv = s6;
rt.autodetect.push({
  p: 2,
  test: (...e) => {
    if (e = lt(e, "hsv"), ht(e) === "array" && e.length === 3)
      return "hsv";
  }
});
const c6 = (e, t, n) => Wi(e, t, n, "hsv");
Jt.hsv = c6;
function ur(e, t) {
  let n = e.length;
  Array.isArray(e[0]) || (e = [e]), Array.isArray(t[0]) || (t = t.map((o) => [o]));
  let i = t[0].length, s = t[0].map((o, l) => t.map((a) => a[l])), r = e.map(
    (o) => s.map((l) => Array.isArray(o) ? o.reduce((a, c, h) => a + c * (l[h] || 0), 0) : l.reduce((a, c) => a + c * o, 0))
  );
  return n === 1 && (r = r[0]), i === 1 ? r.map((o) => o[0]) : r;
}
const oc = (...e) => {
  e = lt(e, "lab");
  const [t, n, i, ...s] = e, [r, o, l] = h6([t, n, i]), [a, c, h] = O1(r, o, l);
  return [a, c, h, ...s.length > 0 && s[0] < 1 ? [s[0]] : []];
};
function h6(e) {
  var t = [
    [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
    [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
    [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816]
  ], n = [
    [1, 0.3963377773761749, 0.2158037573099136],
    [1, -0.1055613458156586, -0.0638541728258133],
    [1, -0.0894841775298119, -1.2914855480194092]
  ], i = ur(n, e);
  return ur(
    t,
    i.map((s) => s ** 3)
  );
}
const rc = (...e) => {
  const [t, n, i, ...s] = lt(e, "rgb"), r = R1(t, n, i);
  return [...d6(r), ...s.length > 0 && s[0] < 1 ? [s[0]] : []];
};
function d6(e) {
  const t = [
    [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
    [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
    [0.0481771893596242, 0.2642395317527308, 0.6335478284694309]
  ], n = [
    [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
    [1.9779985324311684, -2.42859224204858, 0.450593709617411],
    [0.0259040424655478, 0.7827717124575296, -0.8086757549230774]
  ], i = ur(t, e);
  return ur(
    n,
    i.map((s) => Math.cbrt(s))
  );
}
$.prototype.oklab = function() {
  return rc(this._rgb);
};
const u6 = (...e) => new $(...e, "oklab");
Object.assign(tt, { oklab: u6 });
rt.format.oklab = oc;
rt.autodetect.push({
  p: 2,
  test: (...e) => {
    if (e = lt(e, "oklab"), ht(e) === "array" && e.length === 3)
      return "oklab";
  }
});
const f6 = (e, t, n) => {
  const i = e.oklab(), s = t.oklab();
  return new $(
    i[0] + n * (s[0] - i[0]),
    i[1] + n * (s[1] - i[1]),
    i[2] + n * (s[2] - i[2]),
    "oklab"
  );
};
Jt.oklab = f6;
const p6 = (e, t, n) => Wi(e, t, n, "oklch");
Jt.oklch = p6;
const { pow: yl, sqrt: xl, PI: kl, cos: Ad, sin: Fd, atan2: g6 } = Math, m6 = (e, t = "lrgb", n = null) => {
  const i = e.length;
  n || (n = Array.from(new Array(i)).map(() => 1));
  const s = i / n.reduce(function(d, u) {
    return d + u;
  });
  if (n.forEach((d, u) => {
    n[u] *= s;
  }), e = e.map((d) => new $(d)), t === "lrgb")
    return v6(e, n);
  const r = e.shift(), o = r.get(t), l = [];
  let a = 0, c = 0;
  for (let d = 0; d < o.length; d++)
    if (o[d] = (o[d] || 0) * n[0], l.push(isNaN(o[d]) ? 0 : n[0]), t.charAt(d) === "h" && !isNaN(o[d])) {
      const u = o[d] / 180 * kl;
      a += Ad(u) * n[0], c += Fd(u) * n[0];
    }
  let h = r.alpha() * n[0];
  e.forEach((d, u) => {
    const f = d.get(t);
    h += d.alpha() * n[u + 1];
    for (let g = 0; g < o.length; g++)
      if (!isNaN(f[g]))
        if (l[g] += n[u + 1], t.charAt(g) === "h") {
          const m = f[g] / 180 * kl;
          a += Ad(m) * n[u + 1], c += Fd(m) * n[u + 1];
        } else
          o[g] += f[g] * n[u + 1];
  });
  for (let d = 0; d < o.length; d++)
    if (t.charAt(d) === "h") {
      let u = g6(c / l[d], a / l[d]) / kl * 180;
      for (; u < 0; ) u += 360;
      for (; u >= 360; ) u -= 360;
      o[d] = u;
    } else
      o[d] = o[d] / l[d];
  return h /= i, new $(o, t).alpha(h > 0.99999 ? 1 : h, !0);
}, v6 = (e, t) => {
  const n = e.length, i = [0, 0, 0, 0];
  for (let s = 0; s < e.length; s++) {
    const r = e[s], o = t[s] / n, l = r._rgb;
    i[0] += yl(l[0], 2) * o, i[1] += yl(l[1], 2) * o, i[2] += yl(l[2], 2) * o, i[3] += l[3] * o;
  }
  return i[0] = xl(i[0]), i[1] = xl(i[1]), i[2] = xl(i[2]), i[3] > 0.9999999 && (i[3] = 1), new $(tc(i));
}, { pow: b6 } = Math;
function fr(e) {
  let t = "rgb", n = tt("#ccc"), i = 0, s = [0, 1], r = [], o = [0, 0], l = !1, a = [], c = !1, h = 0, d = 1, u = !1, f = {}, g = !0, m = 1;
  const v = function(w) {
    if (w = w || ["#fff", "#000"], w && ht(w) === "string" && tt.brewer && tt.brewer[w.toLowerCase()] && (w = tt.brewer[w.toLowerCase()]), ht(w) === "array") {
      w.length === 1 && (w = [w[0], w[0]]), w = w.slice(0);
      for (let P = 0; P < w.length; P++)
        w[P] = tt(w[P]);
      r.length = 0;
      for (let P = 0; P < w.length; P++)
        r.push(P / (w.length - 1));
    }
    return k(), a = w;
  }, b = function(w) {
    if (l != null) {
      const P = l.length - 1;
      let O = 0;
      for (; O < P && w >= l[O]; )
        O++;
      return O - 1;
    }
    return 0;
  };
  let _ = (w) => w, S = (w) => w;
  const E = function(w, P) {
    let O, F;
    if (P == null && (P = !1), isNaN(w) || w === null)
      return n;
    P ? F = w : l && l.length > 2 ? F = b(w) / (l.length - 2) : d !== h ? F = (w - h) / (d - h) : F = 1, F = S(F), P || (F = _(F)), m !== 1 && (F = b6(F, m)), F = o[0] + F * (1 - o[0] - o[1]), F = ri(F, 0, 1);
    const R = Math.floor(F * 1e4);
    if (g && f[R])
      O = f[R];
    else {
      if (ht(a) === "array")
        for (let j = 0; j < r.length; j++) {
          const J = r[j];
          if (F <= J) {
            O = a[j];
            break;
          }
          if (F >= J && j === r.length - 1) {
            O = a[j];
            break;
          }
          if (F > J && F < r[j + 1]) {
            F = (F - J) / (r[j + 1] - J), O = tt.interpolate(
              a[j],
              a[j + 1],
              F,
              t
            );
            break;
          }
        }
      else ht(a) === "function" && (O = a(F));
      g && (f[R] = O);
    }
    return O;
  };
  var k = () => f = {};
  v(e);
  const N = function(w) {
    const P = tt(E(w));
    return c && P[c] ? P[c]() : P;
  };
  return N.classes = function(w) {
    if (w != null) {
      if (ht(w) === "array")
        l = w, s = [w[0], w[w.length - 1]];
      else {
        const P = tt.analyze(s);
        w === 0 ? l = [P.min, P.max] : l = tt.limits(P, "e", w);
      }
      return N;
    }
    return l;
  }, N.domain = function(w) {
    if (!arguments.length)
      return s;
    h = w[0], d = w[w.length - 1], r = [];
    const P = a.length;
    if (w.length === P && h !== d)
      for (let O of Array.from(w))
        r.push((O - h) / (d - h));
    else {
      for (let O = 0; O < P; O++)
        r.push(O / (P - 1));
      if (w.length > 2) {
        const O = w.map((R, j) => j / (w.length - 1)), F = w.map((R) => (R - h) / (d - h));
        F.every((R, j) => O[j] === R) || (S = (R) => {
          if (R <= 0 || R >= 1) return R;
          let j = 0;
          for (; R >= F[j + 1]; ) j++;
          const J = (R - F[j]) / (F[j + 1] - F[j]);
          return O[j] + J * (O[j + 1] - O[j]);
        });
      }
    }
    return s = [h, d], N;
  }, N.mode = function(w) {
    return arguments.length ? (t = w, k(), N) : t;
  }, N.range = function(w, P) {
    return v(w), N;
  }, N.out = function(w) {
    return c = w, N;
  }, N.spread = function(w) {
    return arguments.length ? (i = w, N) : i;
  }, N.correctLightness = function(w) {
    return w == null && (w = !0), u = w, k(), u ? _ = function(P) {
      const O = E(0, !0).lab()[0], F = E(1, !0).lab()[0], R = O > F;
      let j = E(P, !0).lab()[0];
      const J = O + (F - O) * P;
      let kt = j - J, st = 0, et = 1, U = 20;
      for (; Math.abs(kt) > 0.01 && U-- > 0; )
        (function() {
          return R && (kt *= -1), kt < 0 ? (st = P, P += (et - P) * 0.5) : (et = P, P += (st - P) * 0.5), j = E(P, !0).lab()[0], kt = j - J;
        })();
      return P;
    } : _ = (P) => P, N;
  }, N.padding = function(w) {
    return w != null ? (ht(w) === "number" && (w = [w, w]), o = w, N) : o;
  }, N.colors = function(w, P) {
    arguments.length < 2 && (P = "hex");
    let O = [];
    if (arguments.length === 0)
      O = a.slice(0);
    else if (w === 1)
      O = [N(0.5)];
    else if (w > 1) {
      const F = s[0], R = s[1] - F;
      O = y6(0, w).map(
        (j) => N(F + j / (w - 1) * R)
      );
    } else {
      e = [];
      let F = [];
      if (l && l.length > 2)
        for (let R = 1, j = l.length, J = 1 <= j; J ? R < j : R > j; J ? R++ : R--)
          F.push((l[R - 1] + l[R]) * 0.5);
      else
        F = s;
      O = F.map((R) => N(R));
    }
    return tt[P] && (O = O.map((F) => F[P]())), O;
  }, N.cache = function(w) {
    return w != null ? (g = w, N) : g;
  }, N.gamma = function(w) {
    return w != null ? (m = w, N) : m;
  }, N.nodata = function(w) {
    return w != null ? (n = tt(w), N) : n;
  }, N;
}
function y6(e, t, n) {
  let i = [], s = e < t, r = t;
  for (let o = e; s ? o < r : o > r; s ? o++ : o--)
    i.push(o);
  return i;
}
const x6 = function(e) {
  let t = [1, 1];
  for (let n = 1; n < e; n++) {
    let i = [1];
    for (let s = 1; s <= t.length; s++)
      i[s] = (t[s] || 0) + t[s - 1];
    t = i;
  }
  return t;
}, k6 = function(e) {
  let t, n, i, s;
  if (e = e.map((r) => new $(r)), e.length === 2)
    [n, i] = e.map((r) => r.lab()), t = function(r) {
      const o = [0, 1, 2].map((l) => n[l] + r * (i[l] - n[l]));
      return new $(o, "lab");
    };
  else if (e.length === 3)
    [n, i, s] = e.map((r) => r.lab()), t = function(r) {
      const o = [0, 1, 2].map(
        (l) => (1 - r) * (1 - r) * n[l] + 2 * (1 - r) * r * i[l] + r * r * s[l]
      );
      return new $(o, "lab");
    };
  else if (e.length === 4) {
    let r;
    [n, i, s, r] = e.map((o) => o.lab()), t = function(o) {
      const l = [0, 1, 2].map(
        (a) => (1 - o) * (1 - o) * (1 - o) * n[a] + 3 * (1 - o) * (1 - o) * o * i[a] + 3 * (1 - o) * o * o * s[a] + o * o * o * r[a]
      );
      return new $(l, "lab");
    };
  } else if (e.length >= 5) {
    let r, o, l;
    r = e.map((a) => a.lab()), l = e.length - 1, o = x6(l), t = function(a) {
      const c = 1 - a, h = [0, 1, 2].map(
        (d) => r.reduce(
          (u, f, g) => u + o[g] * c ** (l - g) * a ** g * f[d],
          0
        )
      );
      return new $(h, "lab");
    };
  } else
    throw new RangeError("No point in running bezier with only one color.");
  return t;
}, w6 = (e) => {
  const t = k6(e);
  return t.scale = () => fr(t), t;
}, { round: I1 } = Math;
$.prototype.rgb = function(e = !0) {
  return e === !1 ? this._rgb.slice(0, 3) : this._rgb.slice(0, 3).map(I1);
};
$.prototype.rgba = function(e = !0) {
  return this._rgb.slice(0, 4).map((t, n) => n < 3 ? e === !1 ? t : I1(t) : t);
};
const _6 = (...e) => new $(...e, "rgb");
Object.assign(tt, { rgb: _6 });
rt.format.rgb = (...e) => {
  const t = lt(e, "rgba");
  return t[3] === void 0 && (t[3] = 1), t;
};
rt.autodetect.push({
  p: 3,
  test: (...e) => {
    if (e = lt(e, "rgba"), ht(e) === "array" && (e.length === 3 || e.length === 4 && ht(e[3]) == "number" && e[3] >= 0 && e[3] <= 1))
      return "rgb";
  }
});
const Ae = (e, t, n) => {
  if (!Ae[n])
    throw new Error("unknown blend mode " + n);
  return Ae[n](e, t);
}, In = (e) => (t, n) => {
  const i = tt(n).rgb(), s = tt(t).rgb();
  return tt.rgb(e(i, s));
}, Vn = (e) => (t, n) => {
  const i = [];
  return i[0] = e(t[0], n[0]), i[1] = e(t[1], n[1]), i[2] = e(t[2], n[2]), i;
}, M6 = (e) => e, C6 = (e, t) => e * t / 255, S6 = (e, t) => e > t ? t : e, E6 = (e, t) => e > t ? e : t, P6 = (e, t) => 255 * (1 - (1 - e / 255) * (1 - t / 255)), D6 = (e, t) => t < 128 ? 2 * e * t / 255 : 255 * (1 - 2 * (1 - e / 255) * (1 - t / 255)), N6 = (e, t) => 255 * (1 - (1 - t / 255) / (e / 255)), O6 = (e, t) => e === 255 ? 255 : (e = 255 * (t / 255) / (1 - e / 255), e > 255 ? 255 : e);
Ae.normal = In(Vn(M6));
Ae.multiply = In(Vn(C6));
Ae.screen = In(Vn(P6));
Ae.overlay = In(Vn(D6));
Ae.darken = In(Vn(S6));
Ae.lighten = In(Vn(E6));
Ae.dodge = In(Vn(O6));
Ae.burn = In(Vn(N6));
const { pow: R6, sin: A6, cos: F6 } = Math;
function T6(e = 300, t = -1.5, n = 1, i = 1, s = [0, 1]) {
  let r = 0, o;
  ht(s) === "array" ? o = s[1] - s[0] : (o = 0, s = [s, s]);
  const l = function(a) {
    const c = dn * ((e + 120) / 360 + t * a), h = R6(s[0] + o * a, i), u = (r !== 0 ? n[0] + a * r : n) * h * (1 - h) / 2, f = F6(c), g = A6(c), m = h + u * (-0.14861 * f + 1.78277 * g), v = h + u * (-0.29227 * f - 0.90649 * g), b = h + u * (1.97294 * f);
    return tt(tc([m * 255, v * 255, b * 255, 1]));
  };
  return l.start = function(a) {
    return a == null ? e : (e = a, l);
  }, l.rotations = function(a) {
    return a == null ? t : (t = a, l);
  }, l.gamma = function(a) {
    return a == null ? i : (i = a, l);
  }, l.hue = function(a) {
    return a == null ? n : (n = a, ht(n) === "array" ? (r = n[1] - n[0], r === 0 && (n = n[1])) : r = 0, l);
  }, l.lightness = function(a) {
    return a == null ? s : (ht(a) === "array" ? (s = a, o = a[1] - a[0]) : (s = [a, a], o = 0), l);
  }, l.scale = () => tt.scale(l), l.hue(n), l;
}
const L6 = "0123456789abcdef", { floor: I6, random: V6 } = Math, $6 = () => {
  let e = "#";
  for (let t = 0; t < 6; t++)
    e += L6.charAt(I6(V6() * 16));
  return new $(e, "hex");
}, { log: Td, pow: B6, floor: z6, abs: H6 } = Math;
function V1(e, t = null) {
  const n = {
    min: Number.MAX_VALUE,
    max: Number.MAX_VALUE * -1,
    sum: 0,
    values: [],
    count: 0
  };
  return ht(e) === "object" && (e = Object.values(e)), e.forEach((i) => {
    t && ht(i) === "object" && (i = i[t]), i != null && !isNaN(i) && (n.values.push(i), n.sum += i, i < n.min && (n.min = i), i > n.max && (n.max = i), n.count += 1);
  }), n.domain = [n.min, n.max], n.limits = (i, s) => $1(n, i, s), n;
}
function $1(e, t = "equal", n = 7) {
  ht(e) == "array" && (e = V1(e));
  const { min: i, max: s } = e, r = e.values.sort((l, a) => l - a);
  if (n === 1)
    return [i, s];
  const o = [];
  if (t.substr(0, 1) === "c" && (o.push(i), o.push(s)), t.substr(0, 1) === "e") {
    o.push(i);
    for (let l = 1; l < n; l++)
      o.push(i + l / n * (s - i));
    o.push(s);
  } else if (t.substr(0, 1) === "l") {
    if (i <= 0)
      throw new Error(
        "Logarithmic scales are only possible for values > 0"
      );
    const l = Math.LOG10E * Td(i), a = Math.LOG10E * Td(s);
    o.push(i);
    for (let c = 1; c < n; c++)
      o.push(B6(10, l + c / n * (a - l)));
    o.push(s);
  } else if (t.substr(0, 1) === "q") {
    o.push(i);
    for (let l = 1; l < n; l++) {
      const a = (r.length - 1) * l / n, c = z6(a);
      if (c === a)
        o.push(r[c]);
      else {
        const h = a - c;
        o.push(r[c] * (1 - h) + r[c + 1] * h);
      }
    }
    o.push(s);
  } else if (t.substr(0, 1) === "k") {
    let l;
    const a = r.length, c = new Array(a), h = new Array(n);
    let d = !0, u = 0, f = null;
    f = [], f.push(i);
    for (let v = 1; v < n; v++)
      f.push(i + v / n * (s - i));
    for (f.push(s); d; ) {
      for (let b = 0; b < n; b++)
        h[b] = 0;
      for (let b = 0; b < a; b++) {
        const _ = r[b];
        let S = Number.MAX_VALUE, E;
        for (let k = 0; k < n; k++) {
          const N = H6(f[k] - _);
          N < S && (S = N, E = k), h[E]++, c[b] = E;
        }
      }
      const v = new Array(n);
      for (let b = 0; b < n; b++)
        v[b] = null;
      for (let b = 0; b < a; b++)
        l = c[b], v[l] === null ? v[l] = r[b] : v[l] += r[b];
      for (let b = 0; b < n; b++)
        v[b] *= 1 / h[b];
      d = !1;
      for (let b = 0; b < n; b++)
        if (v[b] !== f[b]) {
          d = !0;
          break;
        }
      f = v, u++, u > 200 && (d = !1);
    }
    const g = {};
    for (let v = 0; v < n; v++)
      g[v] = [];
    for (let v = 0; v < a; v++)
      l = c[v], g[l].push(r[v]);
    let m = [];
    for (let v = 0; v < n; v++)
      m.push(g[v][0]), m.push(g[v][g[v].length - 1]);
    m = m.sort((v, b) => v - b), o.push(m[0]);
    for (let v = 1; v < m.length; v += 2) {
      const b = m[v];
      !isNaN(b) && o.indexOf(b) === -1 && o.push(b);
    }
  }
  return o;
}
const j6 = (e, t) => {
  e = new $(e), t = new $(t);
  const n = e.luminance(), i = t.luminance();
  return n > i ? (n + 0.05) / (i + 0.05) : (i + 0.05) / (n + 0.05);
};
/**
 * @license
 *
 * The APCA contrast prediction algorithm is based of the formulas published
 * in the APCA-1.0.98G specification by Myndex. The specification is available at:
 * https://raw.githubusercontent.com/Myndex/apca-w3/master/images/APCAw3_0.1.17_APCA0.0.98G.svg
 *
 * Note that the APCA implementation is still beta, so please update to
 * future versions of chroma.js when they become available.
 *
 * You can read more about the APCA Readability Criterion at
 * https://readtech.org/ARC/
 */
const Ld = 0.027, W6 = 5e-4, q6 = 0.1, Id = 1.14, vo = 0.022, Vd = 1.414, G6 = (e, t) => {
  e = new $(e), t = new $(t), e.alpha() < 1 && (e = Vi(t, e, e.alpha(), "rgb"));
  const n = $d(...e.rgb()), i = $d(...t.rgb()), s = n >= vo ? n : n + Math.pow(vo - n, Vd), r = i >= vo ? i : i + Math.pow(vo - i, Vd), o = Math.pow(r, 0.56) - Math.pow(s, 0.57), l = Math.pow(r, 0.65) - Math.pow(s, 0.62), a = Math.abs(r - s) < W6 ? 0 : s < r ? o * Id : l * Id;
  return (Math.abs(a) < q6 ? 0 : a > 0 ? a - Ld : a + Ld) * 100;
};
function $d(e, t, n) {
  return 0.2126729 * Math.pow(e / 255, 2.4) + 0.7151522 * Math.pow(t / 255, 2.4) + 0.072175 * Math.pow(n / 255, 2.4);
}
const { sqrt: rn, pow: It, min: Y6, max: U6, atan2: Bd, abs: zd, cos: bo, sin: Hd, exp: X6, PI: jd } = Math;
function K6(e, t, n = 1, i = 1, s = 1) {
  var r = function(Wt) {
    return 360 * Wt / (2 * jd);
  }, o = function(Wt) {
    return 2 * jd * Wt / 360;
  };
  e = new $(e), t = new $(t);
  const [l, a, c] = Array.from(e.lab()), [h, d, u] = Array.from(t.lab()), f = (l + h) / 2, g = rn(It(a, 2) + It(c, 2)), m = rn(It(d, 2) + It(u, 2)), v = (g + m) / 2, b = 0.5 * (1 - rn(It(v, 7) / (It(v, 7) + It(25, 7)))), _ = a * (1 + b), S = d * (1 + b), E = rn(It(_, 2) + It(c, 2)), k = rn(It(S, 2) + It(u, 2)), N = (E + k) / 2, w = r(Bd(c, _)), P = r(Bd(u, S)), O = w >= 0 ? w : w + 360, F = P >= 0 ? P : P + 360, R = zd(O - F) > 180 ? (O + F + 360) / 2 : (O + F) / 2, j = 1 - 0.17 * bo(o(R - 30)) + 0.24 * bo(o(2 * R)) + 0.32 * bo(o(3 * R + 6)) - 0.2 * bo(o(4 * R - 63));
  let J = F - O;
  J = zd(J) <= 180 ? J : F <= O ? J + 360 : J - 360, J = 2 * rn(E * k) * Hd(o(J) / 2);
  const kt = h - l, st = k - E, et = 1 + 0.015 * It(f - 50, 2) / rn(20 + It(f - 50, 2)), U = 1 + 0.045 * N, Z = 1 + 0.015 * N * j, ct = 30 * X6(-It((R - 275) / 25, 2)), xe = -(2 * rn(It(N, 7) / (It(N, 7) + It(25, 7)))) * Hd(2 * o(ct)), Zt = rn(
    It(kt / (n * et), 2) + It(st / (i * U), 2) + It(J / (s * Z), 2) + xe * (st / (i * U)) * (J / (s * Z))
  );
  return U6(0, Y6(100, Zt));
}
function J6(e, t, n = "lab") {
  e = new $(e), t = new $(t);
  const i = e.get(n), s = t.get(n);
  let r = 0;
  for (let o in i) {
    const l = (i[o] || 0) - (s[o] || 0);
    r += l * l;
  }
  return Math.sqrt(r);
}
const Z6 = (...e) => {
  try {
    return new $(...e), !0;
  } catch {
    return !1;
  }
}, Q6 = {
  cool() {
    return fr([tt.hsl(180, 1, 0.9), tt.hsl(250, 0.7, 0.4)]);
  },
  hot() {
    return fr(["#000", "#f00", "#ff0", "#fff"]).mode(
      "rgb"
    );
  }
}, ra = {
  // sequential
  OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
  PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
  BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
  Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
  BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
  YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
  YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
  Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
  RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
  Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
  YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
  Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
  GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
  Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
  YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
  PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
  Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
  PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
  Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
  // diverging
  Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
  RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
  RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
  PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
  PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
  RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
  BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
  RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
  PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
  // qualitative
  Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
  Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
  Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
  Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
  Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
  Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
  Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
  Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
}, B1 = Object.keys(ra), Wd = new Map(B1.map((e) => [e.toLowerCase(), e])), tx = typeof Proxy == "function" ? new Proxy(ra, {
  get(e, t) {
    const n = t.toLowerCase();
    if (Wd.has(n))
      return e[Wd.get(n)];
  },
  getOwnPropertyNames() {
    return Object.getOwnPropertyNames(B1);
  }
}) : ra, ex = (...e) => {
  e = lt(e, "cmyk");
  const [t, n, i, s] = e, r = e.length > 4 ? e[4] : 1;
  return s === 1 ? [0, 0, 0, r] : [
    t >= 1 ? 0 : 255 * (1 - t) * (1 - s),
    // r
    n >= 1 ? 0 : 255 * (1 - n) * (1 - s),
    // g
    i >= 1 ? 0 : 255 * (1 - i) * (1 - s),
    // b
    r
  ];
}, { max: qd } = Math, nx = (...e) => {
  let [t, n, i] = lt(e, "rgb");
  t = t / 255, n = n / 255, i = i / 255;
  const s = 1 - qd(t, qd(n, i)), r = s < 1 ? 1 / (1 - s) : 0, o = (1 - t - s) * r, l = (1 - n - s) * r, a = (1 - i - s) * r;
  return [o, l, a, s];
};
$.prototype.cmyk = function() {
  return nx(this._rgb);
};
const ix = (...e) => new $(...e, "cmyk");
Object.assign(tt, { cmyk: ix });
rt.format.cmyk = ex;
rt.autodetect.push({
  p: 2,
  test: (...e) => {
    if (e = lt(e, "cmyk"), ht(e) === "array" && e.length === 4)
      return "cmyk";
  }
});
const sx = (...e) => {
  const t = lt(e, "hsla");
  let n = ji(e) || "lsa";
  return t[0] = we(t[0] || 0) + "deg", t[1] = we(t[1] * 100) + "%", t[2] = we(t[2] * 100) + "%", n === "hsla" || t.length > 3 && t[3] < 1 ? (t[3] = "/ " + (t.length > 3 ? t[3] : 1), n = "hsla") : t.length = 3, `${n.substr(0, 3)}(${t.join(" ")})`;
}, ox = (...e) => {
  const t = lt(e, "lab");
  let n = ji(e) || "lab";
  return t[0] = we(t[0]) + "%", t[1] = we(t[1]), t[2] = we(t[2]), n === "laba" || t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `lab(${t.join(" ")})`;
}, rx = (...e) => {
  const t = lt(e, "lch");
  let n = ji(e) || "lab";
  return t[0] = we(t[0]) + "%", t[1] = we(t[1]), t[2] = isNaN(t[2]) ? "none" : we(t[2]) + "deg", n === "lcha" || t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `lch(${t.join(" ")})`;
}, lx = (...e) => {
  const t = lt(e, "lab");
  return t[0] = we(t[0] * 100) + "%", t[1] = sa(t[1]), t[2] = sa(t[2]), t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `oklab(${t.join(" ")})`;
}, z1 = (...e) => {
  const [t, n, i, ...s] = lt(e, "rgb"), [r, o, l] = rc(t, n, i), [a, c, h] = F1(r, o, l);
  return [a, c, h, ...s.length > 0 && s[0] < 1 ? [s[0]] : []];
}, ax = (...e) => {
  const t = lt(e, "lch");
  return t[0] = we(t[0] * 100) + "%", t[1] = sa(t[1]), t[2] = isNaN(t[2]) ? "none" : we(t[2]) + "deg", t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `oklch(${t.join(" ")})`;
}, { round: wl } = Math, cx = (...e) => {
  const t = lt(e, "rgba");
  let n = ji(e) || "rgb";
  if (n.substr(0, 3) === "hsl")
    return sx(L1(t), n);
  if (n.substr(0, 3) === "lab") {
    const i = As();
    gn("d50");
    const s = ox(nc(t), n);
    return gn(i), s;
  }
  if (n.substr(0, 3) === "lch") {
    const i = As();
    gn("d50");
    const s = rx(sc(t), n);
    return gn(i), s;
  }
  return n.substr(0, 5) === "oklab" ? lx(rc(t)) : n.substr(0, 5) === "oklch" ? ax(z1(t)) : (t[0] = wl(t[0]), t[1] = wl(t[1]), t[2] = wl(t[2]), (n === "rgba" || t.length > 3 && t[3] < 1) && (t[3] = "/ " + (t.length > 3 ? t[3] : 1), n = "rgba"), `${n.substr(0, 3)}(${t.slice(0, n === "rgb" ? 3 : 4).join(" ")})`);
}, H1 = (...e) => {
  e = lt(e, "lch");
  const [t, n, i, ...s] = e, [r, o, l] = A1(t, n, i), [a, c, h] = oc(r, o, l);
  return [a, c, h, ...s.length > 0 && s[0] < 1 ? [s[0]] : []];
}, vn = /((?:-?\d+)|(?:-?\d+(?:\.\d+)?)%|none)/.source, Re = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%?)|none)/.source, pr = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%)|none)/.source, Me = /\s*/.source, qi = /\s+/.source, lc = /\s*,\s*/.source, $r = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)(?:deg)?)|none)/.source, Gi = /\s*(?:\/\s*((?:[01]|[01]?\.\d+)|\d+(?:\.\d+)?%))?/.source, j1 = new RegExp(
  "^rgba?\\(" + Me + [vn, vn, vn].join(qi) + Gi + "\\)$"
), W1 = new RegExp(
  "^rgb\\(" + Me + [vn, vn, vn].join(lc) + Me + "\\)$"
), q1 = new RegExp(
  "^rgba\\(" + Me + [vn, vn, vn, Re].join(lc) + Me + "\\)$"
), G1 = new RegExp(
  "^hsla?\\(" + Me + [$r, pr, pr].join(qi) + Gi + "\\)$"
), Y1 = new RegExp(
  "^hsl?\\(" + Me + [$r, pr, pr].join(lc) + Me + "\\)$"
), U1 = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/, X1 = new RegExp(
  "^lab\\(" + Me + [Re, Re, Re].join(qi) + Gi + "\\)$"
), K1 = new RegExp(
  "^lch\\(" + Me + [Re, Re, $r].join(qi) + Gi + "\\)$"
), J1 = new RegExp(
  "^oklab\\(" + Me + [Re, Re, Re].join(qi) + Gi + "\\)$"
), Z1 = new RegExp(
  "^oklch\\(" + Me + [Re, Re, $r].join(qi) + Gi + "\\)$"
), { round: Q1 } = Math, _i = (e) => e.map((t, n) => n <= 2 ? ri(Q1(t), 0, 255) : t), Vt = (e, t = 0, n = 100, i = !1) => (typeof e == "string" && e.endsWith("%") && (e = parseFloat(e.substring(0, e.length - 1)) / 100, i ? e = t + (e + 1) * 0.5 * (n - t) : e = t + e * (n - t)), +e), te = (e, t) => e === "none" ? t : e, ac = (e) => {
  if (e = e.toLowerCase().trim(), e === "transparent")
    return [0, 0, 0, 0];
  let t;
  if (rt.format.named)
    try {
      return rt.format.named(e);
    } catch {
    }
  if ((t = e.match(j1)) || (t = e.match(W1))) {
    let n = t.slice(1, 4);
    for (let s = 0; s < 3; s++)
      n[s] = +Vt(te(n[s], 0), 0, 255);
    n = _i(n);
    const i = t[4] !== void 0 ? +Vt(t[4], 0, 1) : 1;
    return n[3] = i, n;
  }
  if (t = e.match(q1)) {
    const n = t.slice(1, 5);
    for (let i = 0; i < 4; i++)
      n[i] = +Vt(n[i], 0, 255);
    return n;
  }
  if ((t = e.match(G1)) || (t = e.match(Y1))) {
    const n = t.slice(1, 4);
    n[0] = +te(n[0].replace("deg", ""), 0), n[1] = +Vt(te(n[1], 0), 0, 100) * 0.01, n[2] = +Vt(te(n[2], 0), 0, 100) * 0.01;
    const i = _i(oa(n)), s = t[4] !== void 0 ? +Vt(t[4], 0, 1) : 1;
    return i[3] = s, i;
  }
  if (t = e.match(U1)) {
    const n = t.slice(1, 4);
    n[1] *= 0.01, n[2] *= 0.01;
    const i = oa(n);
    for (let s = 0; s < 3; s++)
      i[s] = Q1(i[s]);
    return i[3] = +t[4], i;
  }
  if (t = e.match(X1)) {
    const n = t.slice(1, 4);
    n[0] = Vt(te(n[0], 0), 0, 100), n[1] = Vt(te(n[1], 0), -125, 125, !0), n[2] = Vt(te(n[2], 0), -125, 125, !0);
    const i = As();
    gn("d50");
    const s = _i(ec(n));
    gn(i);
    const r = t[4] !== void 0 ? +Vt(t[4], 0, 1) : 1;
    return s[3] = r, s;
  }
  if (t = e.match(K1)) {
    const n = t.slice(1, 4);
    n[0] = Vt(n[0], 0, 100), n[1] = Vt(te(n[1], 0), 0, 150, !1), n[2] = +te(n[2].replace("deg", ""), 0);
    const i = As();
    gn("d50");
    const s = _i(ic(n));
    gn(i);
    const r = t[4] !== void 0 ? +Vt(t[4], 0, 1) : 1;
    return s[3] = r, s;
  }
  if (t = e.match(J1)) {
    const n = t.slice(1, 4);
    n[0] = Vt(te(n[0], 0), 0, 1), n[1] = Vt(te(n[1], 0), -0.4, 0.4, !0), n[2] = Vt(te(n[2], 0), -0.4, 0.4, !0);
    const i = _i(oc(n)), s = t[4] !== void 0 ? +Vt(t[4], 0, 1) : 1;
    return i[3] = s, i;
  }
  if (t = e.match(Z1)) {
    const n = t.slice(1, 4);
    n[0] = Vt(te(n[0], 0), 0, 1), n[1] = Vt(te(n[1], 0), 0, 0.4, !1), n[2] = +te(n[2].replace("deg", ""), 0);
    const i = _i(H1(n)), s = t[4] !== void 0 ? +Vt(t[4], 0, 1) : 1;
    return i[3] = s, i;
  }
};
ac.test = (e) => (
  // modern
  j1.test(e) || G1.test(e) || X1.test(e) || K1.test(e) || J1.test(e) || Z1.test(e) || // legacy
  W1.test(e) || q1.test(e) || Y1.test(e) || U1.test(e) || e === "transparent"
);
$.prototype.css = function(e) {
  return cx(this._rgb, e);
};
const hx = (...e) => new $(...e, "css");
tt.css = hx;
rt.format.css = ac;
rt.autodetect.push({
  p: 5,
  test: (e, ...t) => {
    if (!t.length && ht(e) === "string" && ac.test(e))
      return "css";
  }
});
rt.format.gl = (...e) => {
  const t = lt(e, "rgba");
  return t[0] *= 255, t[1] *= 255, t[2] *= 255, t;
};
const dx = (...e) => new $(...e, "gl");
tt.gl = dx;
$.prototype.gl = function() {
  const e = this._rgb;
  return [e[0] / 255, e[1] / 255, e[2] / 255, e[3]];
};
$.prototype.hex = function(e) {
  return N1(this._rgb, e);
};
const ux = (...e) => new $(...e, "hex");
tt.hex = ux;
rt.format.hex = D1;
rt.autodetect.push({
  p: 4,
  test: (e, ...t) => {
    if (!t.length && ht(e) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(e.length) >= 0)
      return "hex";
  }
});
const { log: yo } = Math, tp = (e) => {
  const t = e / 100;
  let n, i, s;
  return t < 66 ? (n = 255, i = t < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (i = t - 2) + 104.49216199393888 * yo(i), s = t < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (s = t - 10) + 115.67994401066147 * yo(s)) : (n = 351.97690566805693 + 0.114206453784165 * (n = t - 55) - 40.25366309332127 * yo(n), i = 325.4494125711974 + 0.07943456536662342 * (i = t - 50) - 28.0852963507957 * yo(i), s = 255), [n, i, s, 1];
}, { round: fx } = Math, px = (...e) => {
  const t = lt(e, "rgb"), n = t[0], i = t[2];
  let s = 1e3, r = 4e4;
  const o = 0.4;
  let l;
  for (; r - s > o; ) {
    l = (r + s) * 0.5;
    const a = tp(l);
    a[2] / a[0] >= i / n ? r = l : s = l;
  }
  return fx(l);
};
$.prototype.temp = $.prototype.kelvin = $.prototype.temperature = function() {
  return px(this._rgb);
};
const _l = (...e) => new $(...e, "temp");
Object.assign(tt, { temp: _l, kelvin: _l, temperature: _l });
rt.format.temp = rt.format.kelvin = rt.format.temperature = tp;
$.prototype.oklch = function() {
  return z1(this._rgb);
};
const gx = (...e) => new $(...e, "oklch");
Object.assign(tt, { oklch: gx });
rt.format.oklch = H1;
rt.autodetect.push({
  p: 2,
  test: (...e) => {
    if (e = lt(e, "oklch"), ht(e) === "array" && e.length === 3)
      return "oklch";
  }
});
Object.assign(tt, {
  analyze: V1,
  average: m6,
  bezier: w6,
  blend: Ae,
  brewer: tx,
  Color: $,
  colors: Ii,
  contrast: j6,
  contrastAPCA: G6,
  cubehelix: T6,
  deltaE: K6,
  distance: J6,
  input: rt,
  interpolate: Vi,
  limits: $1,
  mix: Vi,
  random: $6,
  scale: fr,
  scales: Q6,
  valid: Z6
});
const mx = { "dsfr-chart-colors-01": "#5C68E5", "dsfr-chart-colors-02": "#82B5F2", "dsfr-chart-colors-03": "#29598F", "dsfr-chart-colors-04": "#31A7AE", "dsfr-chart-colors-05": "#81EEF5", "dsfr-chart-colors-06": "#B478F1", "dsfr-chart-colors-07": "#CFB1F5", "dsfr-chart-colors-08": "#CECECE", "dsfr-chart-colors-09": "#DBDAFF", "dsfr-chart-colors-10": "#00005F", "dsfr-chart-colors-11": "#298641", "dsfr-chart-colors-12": "#79D289", "dsfr-chart-colors-13": "#EFB900", "dsfr-chart-colors-14": "#FFA373", "dsfr-chart-colors-15": "#E91719", "dsfr-chart-colors-default": "#5C68E5", "dsfr-chart-colors-neutral": "#B1B1B1" }, vx = { "dsfr-chart-colors-01": "#5C68E5", "dsfr-chart-colors-02": "#699BD6", "dsfr-chart-colors-03": "#4878B1", "dsfr-chart-colors-04": "#00828A", "dsfr-chart-colors-05": "#51C1C8", "dsfr-chart-colors-06": "#BC8AF2", "dsfr-chart-colors-07": "#CFB1F5", "dsfr-chart-colors-08": "#A4A4A4", "dsfr-chart-colors-09": "#B8B9FF", "dsfr-chart-colors-10": "#3647CA", "dsfr-chart-colors-11": "#298641", "dsfr-chart-colors-12": "#449D57", "dsfr-chart-colors-13": "#AF8800", "dsfr-chart-colors-14": "#FFA373", "dsfr-chart-colors-15": "#E16834", "dsfr-chart-colors-default": "#5C68E5", "dsfr-chart-colors-neutral": "#808080" }, Gd = {
  light: mx,
  dark: vx
};
function cc({
  yparse: e = [],
  tmpColorParse: t = [],
  highlightIndex: n = [],
  selectedPalette: i = "",
  reverseOrder: s = !1
}) {
  const r = [], o = [], l = Le(i), a = s ? [...e].reverse() : e;
  for (let h = 0; h < a.length; h++) {
    const d = a[h];
    let u = [], f = [];
    if (t[h]) {
      const g = t[h], m = d && d.length ? d.length : 1;
      u = Array(m).fill(g), f = u.map((v) => tt(v).darken(0.8).hex());
    } else if (i === "neutral" && n.length > 0 && Array.isArray(d)) {
      const g = d && d.length ? d.length : 1;
      for (let m = 0; m < g; m++) {
        const v = n.includes(m) ? ep() : bn();
        u.push(v), f.push(tt(v).darken(0.8).hex());
      }
    } else if (i.startsWith("divergent")) {
      const g = d && d.length ? d.length : 1;
      u = Array(g).fill(l[h % l.length]), f = u.map((m) => tt(m).darken(0.8).hex());
    } else if (i === "categorical" || !i) {
      const g = Fs(h, l), m = d && d.length ? d.length : 1;
      u = Array(m).fill(g), f = u.map((v) => tt(v).darken(0.8).hex());
    } else {
      const g = e.flat(), m = Math.min(...g), v = Math.max(...g), b = tt.scale(l).domain([v, m]);
      u = (d || [m]).map((S) => tt(b(S)).hex()), f = u.map((S) => tt(S).darken(0.8).hex());
    }
    r.push(u), o.push(f);
  }
  const c = s ? r.map((h) => h[0]).reverse() : r.map((h) => h[0]);
  return {
    colorParse: r,
    colorHover: o,
    legendColors: c
  };
}
function bx({
  vlineParse: e = [],
  hlineParse: t = [],
  tmpVlineColorParse: n = [],
  tmpHlineColorParse: i = [],
  selectedPalette: s = ""
}) {
  const r = Le(s), o = Fs(0, r), l = tt(o).darken(0.8).hex(), a = Fs(1, r), c = tt(a).darken(0.8).hex(), h = e.map((u, f) => n[f] || bn()), d = t.map((u, f) => i[f] || bn());
  return {
    colorBarParse: o,
    colorBarHover: l,
    colorParse: a,
    colorHover: c,
    vlineColorParse: h,
    hlineColorParse: d
  };
}
function yx({
  yparse: e = [],
  tmpColorParse: t = [],
  selectedPalette: n = "",
  highlightIndex: i = -1,
  vlineParse: s = [],
  tmpVlineColorParse: r = [],
  hlineParse: o = [],
  tmpHlineColorParse: l = []
}) {
  const a = Le(n), c = [], h = [];
  for (let f = 0; f < e.length; f++) {
    let g;
    t[f] ? g = t[f] : f === i ? g = bn() : g = Fs(f, a), c.push(g), h.push(tt(g).darken(0.8).hex());
  }
  const d = s.map((f, g) => r[g] || bn()), u = o.map((f, g) => l[g] || bn());
  return {
    colorParse: c,
    colorHover: h,
    vlineColorParse: d,
    hlineColorParse: u
  };
}
function fi() {
  const e = document.documentElement.getAttribute("data-fr-theme") || "light";
  return Gd[e] || Gd.light;
}
function la() {
  const e = fi();
  return [
    e["dsfr-chart-colors-01"],
    e["dsfr-chart-colors-02"],
    e["dsfr-chart-colors-03"],
    e["dsfr-chart-colors-04"],
    e["dsfr-chart-colors-05"],
    e["dsfr-chart-colors-06"],
    e["dsfr-chart-colors-07"],
    e["dsfr-chart-colors-08"]
  ];
}
function xx() {
  const e = fi();
  return tt.scale([
    e["dsfr-chart-colors-09"],
    e["dsfr-chart-colors-10"]
  ]).colors(10);
}
function kx() {
  const e = fi();
  return tt.scale([
    e["dsfr-chart-colors-10"],
    e["dsfr-chart-colors-09"]
  ]).colors(10);
}
function wx() {
  const e = fi();
  return tt.scale([
    e["dsfr-chart-colors-11"],
    e["dsfr-chart-colors-13"],
    e["dsfr-chart-colors-15"]
  ]).colors(4);
}
function _x() {
  const e = fi();
  return tt.scale([
    e["dsfr-chart-colors-15"],
    e["dsfr-chart-colors-13"],
    e["dsfr-chart-colors-11"]
  ]).colors(4);
}
function Fs(e, t = la()) {
  return t[e % t.length];
}
function ep() {
  return fi()["dsfr-chart-colors-default"];
}
function bn() {
  return fi()["dsfr-chart-colors-neutral"];
}
function Le(e) {
  switch (e) {
    case "default":
      return [ep()];
    case "neutral":
      return [bn()];
    case "categorical":
      return la();
    case "sequentialAscending":
      return xx();
    case "sequentialDescending":
      return kx();
    case "divergentAscending":
      return wx();
    case "divergentDescending":
      return _x();
    default:
      return la();
  }
}
ut.register(Ro, Vo);
const Mx = {
  name: "BarChart",
  mixins: [Ln],
  props: {
    databoxId: {
      type: String,
      default: null
    },
    databoxType: {
      type: String,
      default: null
    },
    databoxSource: {
      type: String,
      default: "default"
    },
    x: {
      type: String,
      required: !0
    },
    y: {
      type: String,
      required: !0
    },
    xMin: {
      type: [Number, String],
      default: ""
    },
    xMax: {
      type: [Number, String],
      default: ""
    },
    yMin: {
      type: [Number, String],
      default: ""
    },
    yMax: {
      type: [Number, String],
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    stacked: {
      type: [Boolean, String],
      default: !1
    },
    horizontal: {
      type: [Boolean, String],
      default: !1
    },
    barSize: {
      type: [Number, String],
      default: "flex"
    },
    maxBarSize: {
      type: [Number, String],
      default: 32
    },
    date: {
      type: String,
      default: ""
    },
    aspectRatio: {
      type: [Number, String],
      default: 2
    },
    selectedPalette: {
      type: String,
      default: ""
    },
    highlightIndex: {
      type: Array,
      default: () => [3, 4]
    },
    unitTooltip: {
      type: String,
      default: ""
    }
  },
  data() {
    return this.chart = void 0, {
      widgetId: "",
      chartId: "",
      datasets: [],
      labels: [],
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      colorHover: [],
      legendColors: []
    };
  },
  watch: {
    $props: {
      handler() {
        this.chartId && (this.resetData(), this.getData(), this.createChart());
      },
      deep: !0,
      immediate: !0
    }
  },
  created() {
    Hi(), this.chartId = "dsfr-chart-" + Math.floor(Math.random() * 1e3), this.widgetId = "dsfr-widget-" + Math.floor(Math.random() * 1e3);
  },
  mounted() {
    this.resetData(), this.createChart(), this.display = this.$refs[this.widgetId].offsetWidth > 486 ? "big" : "small", document.documentElement.addEventListener("dsfr.theme", (t) => {
      this.chartId !== "" && this.changeColors(t.detail.theme);
    });
  },
  methods: {
    resetData() {
      this.chart && this.chart.destroy(), this.datasets = [], this.labels = [], this.xparse = [], this.yparse = [], this.nameParse = [], this.tmpColorParse = [], this.colorParse = [], this.colorHover = [];
    },
    getData() {
      try {
        this.xparse = JSON.parse(this.x), this.yparse = JSON.parse(this.y);
      } catch (t) {
        console.error("Erreur lors du parsing des données x ou y:", t);
        return;
      }
      let e = [];
      if (this.name)
        try {
          e = JSON.parse(this.name);
        } catch (t) {
          console.error("Erreur lors du parsing de name:", t);
        }
      for (let t = 0; t < this.yparse.length; t++)
        e[t] ? this.nameParse.push(e[t]) : this.nameParse.push("Série " + (t + 1));
      this.labels = this.xparse[0], this.loadColors(), this.datasets = this.yparse.map((t, n) => ({
        label: this.nameParse[n],
        data: t,
        backgroundColor: this.colorParse[n],
        borderColor: this.colorParse[n],
        hoverBackgroundColor: this.colorHover[n],
        hoverBorderColor: this.colorHover[n],
        barThickness: this.barSize,
        ...this.maxBarSize ? { maxBarThickness: this.maxBarSize } : {}
      }));
    },
    choosePalette() {
      return Le(this.selectedPalette);
    },
    loadColors() {
      const { colorParse: e, colorHover: t, legendColors: n } = cc({
        yparse: this.yparse,
        tmpColorParse: this.tmpColorParse,
        highlightIndex: this.highlightIndex,
        selectedPalette: this.selectedPalette,
        reverseOrder: this.selectedPalette === "divergentDescending"
      });
      this.colorParse = e, this.colorHover = t, this.legendColors = n;
    },
    createChart() {
      this.chart && this.chart.destroy(), this.getData();
      const e = this.$refs[this.chartId].getContext("2d");
      this.chart = new ut(e, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: this.datasets
        },
        options: {
          indexAxis: this.horizontal ? "y" : "x",
          aspectRatio: this.aspectRatio,
          scales: {
            x: {
              offset: !this.horizontal,
              stacked: this.stacked,
              grid: {
                drawTicks: !1,
                drawOnChartArea: this.horizontal
              },
              ticks: {
                beginAtZero: !0,
                padding: this.horizontal ? 5 : 15
              },
              ...this.xMin ? { suggestedMin: this.xMin } : {},
              ...this.xMax ? { suggestedMax: this.xMax } : {}
            },
            y: {
              stacked: this.stacked,
              offset: this.horizontal,
              grid: {
                drawTicks: !1,
                drawOnChartArea: !this.horizontal
              },
              border: {
                dash: [3]
              },
              ticks: {
                beginAtZero: !0,
                padding: 5
              },
              ...this.yMin ? { suggestedMin: this.yMin } : {},
              ...this.yMax ? { suggestedMax: this.yMax } : {}
            }
          },
          plugins: {
            legend: {
              display: !1
            },
            tooltip: {
              enabled: !1,
              mode: "index",
              displayColors: !1,
              backgroundColor: "#6b6b6b",
              callbacks: {
                label: (t) => {
                  const n = this.datasets[t.datasetIndex].data[t.dataIndex];
                  return this.formatNumber(n);
                },
                title: (t) => t[0].label,
                labelTextColor: (t) => this.colorParse[t.datasetIndex][t.dataIndex]
              },
              external: (t) => {
                const i = (document.getElementById(this.databoxId + "-" + this.databoxType + "-" + this.databoxSource) || this.$el.nextElementSibling).querySelector(".tooltip"), s = t.tooltip;
                if (!i) return;
                if (!s || s.opacity === 0) {
                  i.style.opacity = 0;
                  return;
                }
                if (i.classList.remove("above", "below", "no-transform"), s.yAlign ? i.classList.add(s.yAlign) : i.classList.add("no-transform"), s.body) {
                  const d = s.title || [], u = i.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
                  u.innerHTML = d[0];
                  const f = i.querySelector(".tooltip_value");
                  f.innerHTML = "", s.dataPoints.forEach((g) => {
                    const m = g.datasetIndex, v = g.dataIndex, b = this.colorParse[m] ? this.colorParse[m][v] : "#000", S = `${this.formatNumber(this.datasets[m].data[v])}${this.unitTooltip ? " " + this.unitTooltip : ""}`;
                    f.innerHTML += `
                    <div class="tooltip_value-content">
                      <span class="tooltip_dot" style="background-color:${b};"></span>
                      <p class="tooltip_place fr-mb-0">${S}</p>
                    </div>
                  `;
                  });
                }
                const { offsetLeft: r, offsetTop: o } = this.chart.canvas, l = Number(this.chart.canvas.style.width.replace(/\D/g, "")), a = Number(this.chart.canvas.style.height.replace(/\D/g, ""));
                let c = r + s.caretX + 10, h = o + s.caretY - 20;
                c + i.clientWidth > r + l && (c = r + s.caretX - i.clientWidth - 10), h + i.clientHeight > o + 0.9 * a && (h = o + s.caretY - i.clientHeight + 20), c < r && (c = r + s.caretX - i.clientWidth / 2, h = o + s.caretY - i.clientHeight - 20), i.style.position = "absolute", i.style.padding = s.padding + "px " + s.padding + "px", i.style.pointerEvents = "none", i.style.left = c + "px", i.style.top = h + "px", i.style.opacity = 1;
              }
            }
          }
        }
      });
    },
    changeColors(e) {
      this.loadColors(), this.chart.data.datasets.forEach((t, n) => {
        t.borderColor = this.colorParse[n], t.backgroundColor = this.colorParse[n], t.hoverBorderColor = this.colorHover[n], t.hoverBackgroundColor = this.colorHover[n];
      }), this.chart.options.scales.x.ticks.color = e === "dark" ? "#cecece" : ut.defaults.color, this.chart.options.scales.y.ticks.color = e === "dark" ? "#cecece" : ut.defaults.color, this.chart.update("none");
    }
  }
}, Cx = { class: "fr-col-12" }, Sx = { class: "chart" }, Ex = { class: "chart_legend fr-mb-0 fr-mt-4v" }, Px = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, Dx = {
  key: 0,
  class: "flex fr-mt-1w"
}, Nx = { class: "fr-text--xs" };
function Ox(e, t, n, i, s, r) {
  var o;
  return V(), Ce(Fe, {
    disabled: !((o = e.$el) != null && o.ownerDocument.getElementById(n.databoxId)) || !n.databoxId && !n.databoxType && n.databoxSource === "default",
    to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource
  }, [
    p("div", {
      ref: s.widgetId,
      class: "widget_container fr-grid-row"
    }, [
      p("div", Cx, [
        p("div", Sx, [
          t[0] || (t[0] = p("div", { class: "tooltip" }, [
            p("div", { class: "tooltip_header fr-text--sm fr-mb-0" }),
            p("div", { class: "tooltip_body" }, [
              p("div", { class: "tooltip_value" })
            ])
          ], -1)),
          p("canvas", { ref: s.chartId }, null, 512),
          p("div", Ex, [
            (V(!0), W(vt, null, Ft(s.nameParse, (l, a) => (V(), W("div", {
              key: a,
              class: "flex fr-mt-3v fr-mb-1v"
            }, [
              p("span", {
                class: "legende_dot",
                style: C({ "background-color": s.legendColors[a] })
              }, null, 4),
              p("p", Px, X(e.capitalize(l)), 1)
            ]))), 128))
          ]),
          n.date ? (V(), W("div", Dx, [
            p("p", Nx, " Mise à jour : " + X(n.date), 1)
          ])) : Ct("", !0)
        ])
      ])
    ], 512)
  ], 8, ["disabled", "to"]);
}
const Rx = /* @__PURE__ */ jt(Mx, [["render", Ox]]);
ut.register(ws, pn);
const Ax = {
  name: "BarLineChart",
  mixins: [Ln],
  props: {
    databoxId: {
      type: String,
      default: null
    },
    databoxType: {
      type: String,
      default: null
    },
    databoxSource: {
      type: String,
      default: "default"
    },
    x: {
      type: String,
      required: !0
    },
    yBar: {
      type: String,
      required: !0
    },
    yLine: {
      type: String,
      required: !0
    },
    xMin: {
      type: [Number, String],
      default: ""
    },
    xMax: {
      type: [Number, String],
      default: ""
    },
    yBarMin: {
      type: [Number, String],
      default: ""
    },
    yBarMax: {
      type: [Number, String],
      default: ""
    },
    yLineMin: {
      type: [Number, String],
      default: ""
    },
    yLineMax: {
      type: [Number, String],
      default: ""
    },
    nameBar: {
      type: String,
      default: ""
    },
    nameLine: {
      type: String,
      default: ""
    },
    barSize: {
      type: [Number, String],
      default: "flex"
    },
    maxBarSize: {
      type: [Number, String],
      default: 32
    },
    vline: {
      type: String,
      default: ""
    },
    vlinecolor: {
      type: String,
      default: ""
    },
    vlinename: {
      type: String,
      default: ""
    },
    hline: {
      type: String,
      default: ""
    },
    hlinecolor: {
      type: String,
      default: ""
    },
    hlinename: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: ""
    },
    aspectRatio: {
      type: [Number, String],
      default: 2
    },
    selectedPalette: {
      type: String,
      default: "categorical"
    },
    unitTooltipBar: {
      type: String,
      default: ""
    },
    unitTooltipLine: {
      type: String,
      default: ""
    }
  },
  data() {
    return this.chart = void 0, {
      widgetId: "",
      chartId: "",
      display: "",
      datasets: [],
      labels: [],
      xparse: [],
      ybarparse: [],
      ylineparse: [],
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      colorParse: [],
      colorBarParse: [],
      colorHover: [],
      colorBarHover: []
    };
  },
  watch: {
    $props: {
      handler() {
        this.chartId && (this.resetData(), this.getData(), this.createChart());
      },
      deep: !0,
      immediate: !0
    }
  },
  created() {
    Hi(), this.chartId = "dsfr-chart-" + Math.floor(Math.random() * 1e3), this.widgetId = "dsfr-widget-" + Math.floor(Math.random() * 1e3);
  },
  mounted() {
    this.resetData(), this.createChart(), this.display = this.$refs[this.widgetId].offsetWidth > 486 ? "big" : "small", document.documentElement.addEventListener("dsfr.theme", (t) => {
      this.chartId !== "" && this.changeColors(t.detail.theme);
    });
  },
  methods: {
    resetData() {
      this.chart && this.chart.destroy(), this.display = "", this.datasets = [], this.labels = [], this.xparse = [], this.ybarparse = [], this.ylineparse = [], this.vlineParse = [], this.vlineColorParse = [], this.tmpVlineColorParse = [], this.vlineNameParse = [], this.hlineParse = [], this.hlineColorParse = [], this.tmpHlineColorParse = [], this.hlineNameParse = [], this.colorParse = [], this.colorBarParse = [], this.colorHover = [], this.colorBarHover = [];
    },
    getData() {
      try {
        this.xparse = JSON.parse(this.x), this.ybarparse = JSON.parse(this.yBar), this.ylineparse = JSON.parse(this.yLine);
      } catch (n) {
        console.error("Erreur lors du parsing des données x ou y-bar ou y-line:", n);
        return;
      }
      if (this.vline) {
        this.vlineParse = JSON.parse(this.vline);
        let n = [];
        this.vlinename && (n = JSON.parse(this.vlinename)), this.vlinecolor && (this.tmpVlineColorParse = JSON.parse(this.vlinecolor));
        for (let i = 0; i < this.vlineParse.length; i++)
          n[i] ? this.vlineNameParse.push(n[i]) : this.vlineNameParse.push("V" + (i + 1));
      }
      if (this.hline) {
        this.hlineParse = JSON.parse(this.hline);
        let n = [];
        this.hlinename && (n = JSON.parse(this.hlinename)), this.hlinecolor && (this.tmpHlineColorParse = JSON.parse(this.hlinecolor));
        for (let i = 0; i < this.hlineParse.length; i++)
          n[i] ? this.hlineNameParse.push(n[i]) : this.hlineNameParse.push("H" + (i + 1));
      }
      let e = [], t = [];
      if (typeof this.xparse[0] == "number") {
        const n = this.xparse.map((i) => i).sort((i, s) => i - s);
        n.forEach((i) => {
          const s = this.xparse.findIndex((r) => r === i);
          t.push(this.ybarparse[s]), e.push(this.ylineparse[s]);
        }), this.labels = n;
      } else
        t = this.ybarparse, e = this.ylineparse, this.labels = this.xparse;
      this.loadColors(), this.datasets = [
        {
          data: t,
          type: "bar",
          borderColor: this.colorBarParse,
          backgroundColor: this.colorBarParse,
          hoverBorderColor: this.colorBarHover,
          hoverBackgroundColor: this.colorBarHover,
          pointRadius: 5,
          pointHoverRadius: 5,
          barThickness: this.barSize,
          ...this.maxBarSize ? { maxBarThickness: this.maxBarSize } : {},
          barPercentage: 0.5
        },
        {
          data: e,
          type: "line",
          borderColor: this.colorParse,
          backgroundColor: "rgba(0, 0, 0, 0)",
          pointBorderColor: this.colorParse,
          pointBackgroundColor: this.colorParse,
          pointHoverBorderColor: this.colorHover,
          pointHoverBackgroundColor: this.colorHover,
          pointRadius: 5,
          pointHoverRadius: 5,
          yAxisID: "yLine",
          tension: 0.4
        }
      ];
    },
    choosePalette() {
      return Le(this.selectedPalette);
    },
    loadColors() {
      const { colorBarParse: e, colorBarHover: t, colorParse: n, colorHover: i, vlineColorParse: s, hlineColorParse: r } = bx({
        vlineParse: this.vlineParse,
        hlineParse: this.hlineParse,
        tmpVlineColorParse: this.tmpVlineColorParse,
        tmpHlineColorParse: this.tmpHlineColorParse,
        selectedPalette: this.selectedPalette
      });
      this.colorBarParse = e, this.colorBarHover = t, this.colorParse = n, this.colorHover = i, this.vlineColorParse = s, this.hlineColorParse = r;
    },
    createChart() {
      this.chart && this.chart.destroy(), this.getData();
      const e = this.$refs[this.chartId].getContext("2d");
      this.chart = new ut(e, {
        data: {
          labels: this.labels,
          datasets: this.datasets
        },
        plugins: [
          {
            afterDraw: (t) => {
              var n, i;
              if ((n = t.tooltip) != null && n._active && ((i = t.tooltip) != null && i._active.length)) {
                const { ctx: s } = t, r = t.tooltip.getActiveElements()[0].element.tooltipPosition().x, o = t.tooltip._active[0].index, l = t.scales.y.getPixelForValue(this.ybarparse[o]), a = t.scales.yLine.getPixelForValue(this.ylineparse[o]);
                s.save(), s.beginPath(), s.moveTo(r, t.scales.y.top), s.lineTo(r, t.scales.y.bottom), s.lineWidth = 1, s.strokeStyle = this.colorPrecisionBar, s.setLineDash([10, 5]), s.stroke(), s.restore(), s.save(), s.beginPath(), s.moveTo(t.scales.x.right, a), s.lineTo(r, a), s.lineWidth = 1, s.strokeStyle = this.colorPrecisionBar, s.setLineDash([10, 5]), s.stroke(), s.restore(), s.save(), s.beginPath(), s.moveTo(t.scales.x.left, l), s.lineTo(r, l), s.lineWidth = 1, s.strokeStyle = this.colorPrecisionBar, s.setLineDash([10, 5]), s.stroke(), s.restore();
              }
            }
          }
        ],
        options: {
          aspectRatio: this.aspectRatio,
          scales: {
            x: {
              offset: !0,
              grid: {
                drawTicks: !1,
                drawOnChartArea: !1
              },
              ...this.xMin ? { suggestedMin: this.xMin } : {},
              ...this.xMax ? { suggestedMax: this.xMax } : {}
            },
            y: {
              type: "linear",
              position: "left",
              grid: {
                drawTicks: !1
              },
              border: {
                dash: [3]
              },
              ticks: {
                padding: 10,
                maxTicksLimit: 5,
                callback: (t) => t >= 1e9 || t <= -1e9 ? t / 1e9 + "B" : t >= 1e6 || t <= -1e6 ? t / 1e6 + "M" : t >= 1e3 || t <= -1e3 ? t / 1e3 + "K" : t
              },
              ...this.yBarMin ? { suggestedMin: this.yBarMin } : {},
              ...this.yBarMax ? { suggestedMax: this.yBarMax } : {}
            },
            yLine: {
              type: "linear",
              position: "right",
              id: "yLine",
              beginAtZero: !0,
              grid: {
                drawTicks: !1
              },
              border: {
                dash: [3]
              },
              ticks: {
                padding: 10,
                maxTicksLimit: 5,
                callback: (t) => t >= 1e9 || t <= -1e9 ? t / 1e9 + "B" : t >= 1e6 || t <= -1e6 ? t / 1e6 + "M" : t >= 1e3 || t <= -1e3 ? t / 1e3 + "K" : t
              },
              ...this.yLineMin ? { suggestedMin: this.yLineMin } : {},
              ...this.yLineMax ? { suggestedMax: this.yLineMax } : {}
            }
          },
          plugins: {
            legend: {
              display: !1
            },
            tooltip: {
              enabled: !1,
              displayColors: !1,
              backgroundColor: "#6b6b6b",
              callbacks: {
                label: (t) => {
                  const n = [];
                  return this.datasets.forEach((i) => {
                    n.push(this.formatNumber(i.data[t.dataIndex]));
                  }), n;
                },
                title: (t) => t[0].label
              },
              external: (t) => {
                const i = (document.getElementById(this.databoxId + "-" + this.databoxType + "-" + this.databoxSource) || this.$el.nextElementSibling).querySelector(".tooltip"), s = t.tooltip;
                if (!i) return;
                if (!s || s.opacity === 0) {
                  i.style.opacity = 0;
                  return;
                }
                if (i.classList.remove("above", "below", "no-transform"), s.yAlign ? i.classList.add(s.yAlign) : i.classList.add("no-transform"), s.body) {
                  const d = s.title || [], u = s.body.map((v) => v.lines), f = i.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
                  f.innerHTML = d[0];
                  const g = i.querySelector(".tooltip_value");
                  g.innerHTML = "";
                  const m = [this.colorBarParse, this.colorParse];
                  u[0].forEach((v, b) => {
                    if (v) {
                      const _ = m[b] ? m[b] : "#000", S = b === 0 ? `${v}${this.unitTooltipBar ? " " + this.unitTooltipBar : ""}` : `${v}${this.unitTooltipLine ? " " + this.unitTooltipLine : ""}`;
                      g.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" style="background-color:${_};"></span>
                          <p class="tooltip_place fr-mb-0">${S}</p>
                        </div>
                      `;
                    }
                  });
                }
                const { offsetLeft: r, offsetTop: o } = this.chart.canvas, l = Number(this.chart.canvas.style.width.replace(/\D/g, "")), a = Number(this.chart.canvas.style.height.replace(/\D/g, ""));
                let c = r + s.caretX + 10, h = o + s.caretY - 20;
                c + i.clientWidth > r + l && (c = r + s.caretX - i.clientWidth - 10), h + i.clientHeight > o + 0.9 * a && (h = o + s.caretY - i.clientHeight + 20), c < r && (c = r + s.caretX - i.clientWidth / 2, h = o + s.caretY - i.clientHeight - 20), i.style.position = "absolute", i.style.padding = s.padding + "px " + s.padding + "px", i.style.pointerEvents = "none", i.style.left = c + "px", i.style.top = h + "px", i.style.opacity = 1;
              }
            }
          }
        }
      });
    },
    changeColors(e) {
      this.loadColors(), this.chart.data.datasets.forEach((t) => {
        t.borderColor = this.colorParse, t.backgroundColor = this.colorBarParse, t.pointBorderColor = this.colorParse, t.pointBackgroundColor = this.colorParse, t.hoverBorderColor = this.colorHover, t.hoverBackgroundColor = this.colorBarHover, t.pointHoverBorderColor = this.colorHover, t.pointHoverBackgroundColor = this.colorHover;
      }), this.chart.options.scales.x.ticks.color = e === "dark" ? "#cecece" : ut.defaults.color, this.chart.options.scales.y.ticks.color = e === "dark" ? "#cecece" : ut.defaults.color, this.chart.options.scales.yLine.ticks.color = e === "dark" ? "#cecece" : ut.defaults.color, this.chart.update("none");
    }
  }
}, Fx = { class: "fr-col-12" }, Tx = { class: "chart" }, Lx = { class: "tooltip" }, Ix = { class: "tooltip_body" }, Vx = { class: "tooltip_value" }, $x = {
  class: "flex fr-mt-3v fr-mb-1v",
  style: { "border-bottom": "1px solid #e0e0e0" }
}, Bx = { class: "tooltip_value-content" }, zx = { class: "tooltip_place" }, Hx = {
  class: "flex fr-mt-3v fr-mb-1v",
  style: { "border-bottom": "1px solid #e0e0e0" }
}, jx = { class: "tooltip_value-content" }, Wx = { class: "tooltip_place" }, qx = { class: "chart_legend fr-mb-0 fr-mt-4v" }, Gx = { class: "flex fr-mt-3v fr-mb-1v" }, Yx = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, Ux = { class: "flex fr-mt-3v fr-mb-1v" }, Xx = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, Kx = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, Jx = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, Zx = {
  key: 0,
  class: "flex fr-mt-1w"
}, Qx = { class: "fr-text--xs" };
function t7(e, t, n, i, s, r) {
  var o;
  return V(), Ce(Fe, {
    disabled: !((o = e.$el) != null && o.ownerDocument.getElementById(n.databoxId)) || !n.databoxId && !n.databoxType && n.databoxSource === "default",
    to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource
  }, [
    p("div", {
      ref: s.widgetId,
      class: "widget_container fr-grid-row"
    }, [
      p("div", Fx, [
        p("div", Tx, [
          p("div", Lx, [
            t[0] || (t[0] = p("div", { class: "tooltip_header fr-text--sm fr-mb-0" }, null, -1)),
            p("div", Ix, [
              p("div", Vx, [
                p("div", $x, [
                  p("div", Bx, [
                    p("span", {
                      class: "tooltip_dot",
                      style: C({ "background-color": s.colorBarParse })
                    }, null, 4),
                    p("p", zx, X(e.capitalize(n.nameBar)), 1)
                  ])
                ]),
                p("div", Hx, [
                  p("div", jx, [
                    p("span", {
                      class: "tooltip_dot",
                      style: C({ "background-color": s.colorParse })
                    }, null, 4),
                    p("p", Wx, X(e.capitalize(n.nameLine)), 1)
                  ])
                ])
              ])
            ])
          ]),
          p("canvas", { ref: s.chartId }, null, 512),
          p("div", qx, [
            p("div", Gx, [
              p("span", {
                class: "legende_dot",
                style: C({ "background-color": s.colorBarParse })
              }, null, 4),
              p("p", Yx, X(e.capitalize(n.nameBar)), 1)
            ]),
            p("div", Ux, [
              p("span", {
                class: "legende_dot",
                style: C({ "background-color": s.colorParse })
              }, null, 4),
              p("p", Xx, X(e.capitalize(n.nameLine)), 1)
            ]),
            (V(!0), W(vt, null, Ft(s.hlineNameParse, (l, a) => (V(), W("div", {
              key: a,
              class: "flex"
            }, [
              p("span", {
                class: "legende_dash_line",
                style: C({ "background-color": s.hlineColorParse[a] })
              }, null, 4),
              p("span", {
                class: "legende_dash_line legende_dash_line_end",
                style: C({ "background-color": s.hlineColorParse[a] })
              }, null, 4),
              p("p", Kx, X(e.capitalize(l)), 1)
            ]))), 128)),
            (V(!0), W(vt, null, Ft(s.vlineNameParse, (l, a) => (V(), W("div", {
              key: a,
              class: "flex"
            }, [
              p("span", {
                class: "legende_dash_line",
                style: C({ "background-color": s.vlineColorParse[a] })
              }, null, 4),
              p("span", {
                class: "legende_dash_line legende_dash_line_end",
                style: C({ "background-color": s.vlineColorParse[a] })
              }, null, 4),
              p("p", Jx, X(e.capitalize(l)), 1)
            ]))), 128))
          ]),
          n.date ? (V(), W("div", Zx, [
            p("p", Qx, " Mise à jour : " + X(n.date), 1)
          ])) : Ct("", !0)
        ])
      ])
    ], 512)
  ], 8, ["disabled", "to"]);
}
const e7 = /* @__PURE__ */ jt(Ax, [["render", t7]]), n7 = {
  name: "GaugeChart",
  mixins: [Ln],
  props: {
    databoxId: {
      type: String,
      default: null
    },
    databoxType: {
      type: String,
      default: null
    },
    databoxSource: {
      type: String,
      default: "default"
    },
    value: {
      type: [Number, String],
      default: ""
    },
    percent: {
      type: [Number, String],
      default: ""
    },
    init: {
      type: [Number, String],
      required: !0
    },
    target: {
      type: [Number, String],
      required: !0
    },
    initDate: {
      type: String,
      default: ""
    },
    targetDate: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "2rem"
    },
    legend: {
      type: [Boolean, String],
      default: !0
    },
    date: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      widgetId: "",
      percentage: 0,
      styleRectangleOver: "",
      styleRectangleUnder: "",
      styleLegendOver: "",
      styleLegendUnder: "",
      colorOver: "",
      colorUnder: "",
      width: ""
    };
  },
  watch: {
    $props: {
      handler() {
        this.widgetId && this.createChart();
      },
      deep: !0,
      immediate: !0
    }
  },
  created() {
    this.widgetId = "dsfr-widget-" + Math.floor(Math.random() * 1e3);
  },
  mounted() {
    this.createChart(), this.display = this.$refs[this.widgetId].offsetWidth > 486 ? "big" : "small";
  },
  methods: {
    createChart() {
      this.percent ? this.percentage = Math.round(this.percent) : this.percentage = Math.round(100 * (this.value - this.init) / (this.target - this.init)), this.width = Math.min(100, this.percentage);
    }
  }
}, i7 = { class: "fr-col-12" }, s7 = { class: "chart" }, o7 = { class: "gauge-container" }, r7 = { class: "jauge-text fr-text fr-text--sm fr-text-title--blue-france fr-pl-1w" }, l7 = { class: "gauge-container" }, a7 = { class: "fr-text--xs fr-text-mention--grey fr-mt-1w fr-mb-0" }, c7 = { class: "fr-text--xs fr-text-mention--grey fr-mt-1w fr-mb-0 fr-ml-auto fr-mr-0" }, h7 = {
  key: 0,
  class: "gauge-container"
}, d7 = { class: "fr-text--xs fr-text-mention--grey" }, u7 = { class: "fr-text--xs fr-text-mention--grey fr-ml-auto fr-mr-0" }, f7 = {
  key: 1,
  class: "flex"
}, p7 = {
  key: 2,
  class: "flex fr-mt-3v fr-mb-1v"
}, g7 = {
  key: 3,
  class: "flex fr-mt-1w"
}, m7 = { class: "fr-text--xs" };
function v7(e, t, n, i, s, r) {
  var o;
  return V(), Ce(Fe, {
    disabled: !((o = e.$el) != null && o.ownerDocument.getElementById(n.databoxId)) || !n.databoxId && !n.databoxType && n.databoxSource === "default",
    to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource
  }, [
    p("div", {
      ref: s.widgetId,
      class: "widget_container fr-grid-row"
    }, [
      p("div", i7, [
        p("div", s7, [
          p("div", o7, [
            p("div", {
              class: "jauge",
              style: C({ height: n.height })
            }, [
              p("div", {
                class: "jauge-fill",
                style: C({ width: s.width + "%" })
              }, [
                p("span", r7, X(s.percentage) + "%", 1)
              ], 4)
            ], 4)
          ]),
          p("div", l7, [
            p("p", a7, X(e.formatNumber(n.init)), 1),
            p("p", c7, X(e.formatNumber(n.target)), 1)
          ]),
          n.initDate && n.targetDate ? (V(), W("div", h7, [
            p("p", d7, X(n.initDate), 1),
            p("p", u7, X(n.targetDate), 1)
          ])) : Ct("", !0),
          n.legend ? (V(), W("div", f7, t[0] || (t[0] = [
            p("span", { class: "legende_dot target_legend" }, null, -1),
            p("p", { class: "fr-text--sm fr-text--bold fr-ml-2v fr-mb-0" }, " Valeur cible ", -1)
          ]))) : Ct("", !0),
          n.legend ? (V(), W("div", p7, t[1] || (t[1] = [
            p("span", { class: "legende_dot actual_legend" }, null, -1),
            p("p", { class: "fr-text--sm fr-text--bold fr-ml-2v fr-mb-0" }, " Valeur actuelle ", -1)
          ]))) : Ct("", !0),
          n.date ? (V(), W("div", g7, [
            p("p", m7, " Mise à jour : " + X(n.date), 1)
          ])) : Ct("", !0)
        ])
      ])
    ], 512)
  ], 8, ["disabled", "to"]);
}
const b7 = /* @__PURE__ */ jt(n7, [["render", v7], ["__scopeId", "data-v-e6e08090"]]);
ut.register(ws, pn);
const y7 = {
  name: "LineChart",
  mixins: [Ln],
  props: {
    databoxId: {
      type: String,
      default: null
    },
    databoxType: {
      type: String,
      default: null
    },
    databoxSource: {
      type: String,
      default: "default"
    },
    x: {
      type: String,
      required: !0
    },
    y: {
      type: String,
      required: !0
    },
    xMin: {
      type: [Number, String],
      default: ""
    },
    xMax: {
      type: [Number, String],
      default: ""
    },
    yMin: {
      type: [Number, String],
      default: ""
    },
    yMax: {
      type: [Number, String],
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    vline: {
      type: String,
      default: ""
    },
    vlinecolor: {
      type: String,
      default: ""
    },
    vlinename: {
      type: String,
      default: ""
    },
    hline: {
      type: String,
      default: ""
    },
    hlinecolor: {
      type: String,
      default: ""
    },
    hlinename: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: ""
    },
    aspectRatio: {
      type: [Number, String],
      default: 2
    },
    formatDate: {
      type: [Boolean, String],
      default: !1
    },
    selectedPalette: {
      type: String,
      default: ""
    },
    unitTooltip: {
      type: String,
      default: ""
    }
  },
  data() {
    return this.chart = void 0, {
      widgetId: "",
      chartId: "",
      display: "",
      datasets: [],
      xAxisType: "category",
      labels: [],
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      colorHover: []
    };
  },
  watch: {
    $props: {
      handler() {
        this.chartId && (this.resetData(), this.getData(), this.createChart());
      },
      deep: !0,
      immediate: !0
    }
  },
  created() {
    Hi(), this.chartId = "dsfr-chart-" + Math.floor(Math.random() * 1e3), this.widgetId = "dsfr-widget-" + Math.floor(Math.random() * 1e3);
  },
  mounted() {
    this.resetData(), this.createChart(), this.display = this.$refs[this.widgetId].offsetWidth > 486 ? "big" : "small", document.documentElement.addEventListener("dsfr.theme", (t) => {
      this.chartId !== "" && this.changeColors(t.detail.theme);
    });
  },
  methods: {
    resetData() {
      this.chart && this.chart.destroy(), this.display = "", this.datasets = [], this.xAxisType = "", this.labels = [], this.xparse = [], this.yparse = [], this.nameParse = [], this.tmpColorParse = [], this.colorParse = [], this.vlineParse = [], this.vlineColorParse = [], this.tmpVlineColorParse = [], this.vlineNameParse = [], this.hlineParse = [], this.hlineColorParse = [], this.tmpHlineColorParse = [], this.hlineNameParse = [], this.colorHover = [];
    },
    getData() {
      try {
        this.xparse = JSON.parse(this.x), this.yparse = JSON.parse(this.y);
      } catch (n) {
        console.error("Erreur lors du parsing des données x ou y:", n);
        return;
      }
      let e = [];
      if (this.name)
        try {
          e = JSON.parse(this.name);
        } catch (n) {
          console.error("Erreur lors du parsing de name:", n);
        }
      for (let n = 0; n < this.yparse.length; n++)
        e[n] ? this.nameParse.push(e[n]) : this.nameParse.push("Série " + (n + 1));
      if (this.vline) {
        this.vlineParse = JSON.parse(this.vline);
        let n = [];
        this.vlinename && (n = JSON.parse(this.vlinename)), this.vlinecolor && (this.tmpVlineColorParse = JSON.parse(this.vlinecolor));
        for (let i = 0; i < this.vlineParse.length; i++)
          n[i] ? this.vlineNameParse.push(n[i]) : this.vlineNameParse.push("V" + (i + 1));
      }
      if (this.hline) {
        this.hlineParse = JSON.parse(this.hline);
        let n = [];
        this.hlinename && (n = JSON.parse(this.hlinename)), this.hlinecolor && (this.tmpHlineColorParse = JSON.parse(this.hlinecolor));
        for (let i = 0; i < this.hlineParse.length; i++)
          n[i] ? this.hlineNameParse.push(n[i]) : this.hlineNameParse.push("H" + (i + 1));
      }
      let t = [];
      typeof this.xparse[0][0] == "number" ? (this.xparse.forEach((n, i) => {
        const s = [];
        n.map((o) => o).sort((o, l) => o - l).forEach((o) => {
          const l = n.findIndex((a) => a === o);
          s.push({
            x: o,
            y: this.yparse[i][l]
          });
        }), t.push(s);
      }), this.labels = [], this.xAxisType = "linear") : (t = this.yparse, this.labels = this.xparse[0], this.xAxisType = "category"), this.loadColors(), this.datasets = t.map((n, i) => ({
        data: n,
        fill: !1,
        borderColor: this.colorParse[i],
        pointRadius: 5,
        pointHoverRadius: 5,
        pointBackgroundColor: this.colorParse[i],
        pointBorderColor: this.colorParse[i],
        pointHoverBackgroundColor: this.colorHover[i],
        pointHoverBorderColor: this.colorHover[i],
        borderWidth: 2,
        tension: 0.4
      }));
    },
    loadColors() {
      this.colorParse = [], this.colorHover = [];
      const e = this.choosePalette();
      for (let t = 0; t < this.yparse.length; t++)
        if (this.tmpColorParse[t]) {
          const n = this.tmpColorParse[t];
          this.colorParse.push(n), this.colorHover.push(tt(n).brighten(0.5).hex());
        } else {
          const n = Fs(t, e);
          this.colorParse.push(n), this.colorHover.push(tt(n).brighten(0.5).hex());
        }
      this.vlineColorParse = [];
      for (let t = 0; t < this.vlineParse.length; t++)
        this.tmpVlineColorParse[t] ? this.vlineColorParse.push(this.tmpVlineColorParse[t]) : this.vlineColorParse.push(bn());
      this.hlineColorParse = [];
      for (let t = 0; t < this.hlineParse.length; t++)
        this.tmpHlineColorParse[t] ? this.hlineColorParse.push(this.tmpHlineColorParse[t]) : this.hlineColorParse.push(bn());
    },
    choosePalette() {
      return Le(this.selectedPalette);
    },
    changeColors(e) {
      this.loadColors(), this.chart.data.datasets.forEach((t, n) => {
        t.borderColor = this.colorParse[n], t.backgroundColor = this.colorParse[n], t.pointBorderColor = this.colorParse[n], t.pointBackgroundColor = this.colorParse[n], t.hoverBorderColor = this.colorHover[n], t.hoverBackgroundColor = this.colorHover[n], t.pointHoverBorderColor = this.colorHover[n], t.pointHoverBackgroundColor = this.colorHover[n];
      }), this.chart.options.scales.x.ticks.color = e === "dark" ? "#cecece" : ut.defaults.color, this.chart.options.scales.y.ticks.color = e === "dark" ? "#cecece" : ut.defaults.color, this.chart.update("none");
    },
    createChart() {
      this.chart && this.chart.destroy(), this.getData();
      const e = this.$refs[this.chartId].getContext("2d");
      this.chart = new ut(e, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: this.datasets
        },
        plugins: [
          {
            afterDraw: (t) => {
              var n, i;
              if ((n = t.tooltip) != null && n._active && ((i = t.tooltip) != null && i._active.length)) {
                const { ctx: s } = t, r = t.tooltip.getActiveElements()[0].element.tooltipPosition().x, o = t.tooltip._active[0].index;
                s.save(), s.beginPath(), s.moveTo(r, t.scales.y.top), s.lineTo(r, t.scales.y.bottom), s.lineWidth = 1, s.strokeStyle = this.colorPrecisionBar, s.setLineDash([10, 5]), s.stroke(), s.restore(), this.yparse.forEach((l) => {
                  let a = t.scales.y.getPixelForValue(l[o]);
                  s.save(), s.beginPath(), s.moveTo(t.scales.x.left, a), s.lineTo(t.scales.x.right, a), s.lineWidth = 1, s.strokeStyle = this.colorPrecisionBar, s.setLineDash([10, 5]), s.stroke(), s.restore();
                });
              }
            }
          }
        ],
        options: {
          aspectRatio: this.aspectRatio,
          scales: {
            x: {
              offset: !0,
              type: this.xAxisType,
              grid: {
                drawOnChartArea: !1
              },
              ticks: {
                padding: 10
              },
              ...this.xMin ? { suggestedMin: this.xMin } : {},
              ...this.xMax ? { suggestedMax: this.xMax } : {}
            },
            y: {
              grid: {
                drawTicks: !1
              },
              border: {
                dash: [3]
              },
              ticks: {
                padding: 5,
                maxTicksLimit: 5,
                callback: (t) => t >= 1e9 || t <= -1e9 ? t / 1e9 + "B" : t >= 1e6 || t <= -1e6 ? t / 1e6 + "M" : t >= 1e3 || t <= -1e3 ? t / 1e3 + "K" : t
              },
              ...this.yMin ? { suggestedMin: this.yMin } : {},
              ...this.yMax ? { suggestedMax: this.yMax } : {}
            }
          },
          plugins: {
            legend: {
              display: !1
            },
            tooltip: {
              enabled: !1,
              displayColors: !1,
              backgroundColor: "#6b6b6b",
              callbacks: {
                label: (t) => {
                  const n = [];
                  return this.datasets.forEach((i, s) => {
                    if (this.xAxisType === "linear") {
                      const r = this.xparse[s].indexOf(t.parsed.x);
                      r !== -1 && n.push(this.yparse[s][r]);
                    } else
                      n.push(i.data[t.dataIndex]);
                  }), n;
                },
                title: (t) => t[0].label,
                labelTextColor: () => this.colorParse
              },
              external: (t) => {
                const i = (document.getElementById(this.databoxId + "-" + this.databoxType + "-" + this.databoxSource) || this.$el.nextElementSibling).querySelector(".tooltip"), s = t.tooltip;
                if (!i) return;
                if (!s || s.opacity === 0) {
                  i.style.opacity = 0;
                  return;
                }
                if (i.classList.remove("above", "below", "no-transform"), s.yAlign ? i.classList.add(s.yAlign) : i.classList.add("no-transform"), s.body) {
                  const d = s.title || [], u = s.body.map((m) => m.lines), f = i.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
                  f.innerHTML = d[0];
                  const g = i.querySelector(".tooltip_value");
                  g.innerHTML = "", u[0].forEach((m, v) => {
                    const b = `${m}${this.unitTooltip ? " " + this.unitTooltip : ""}`;
                    m && (g.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" style="background-color:${this.colorParse[v]};"></span>
                          <p class="tooltip_place fr-mb-0">${b}</p>
                        </div>
                      `);
                  });
                }
                const { offsetLeft: r, offsetTop: o } = this.chart.canvas, l = Number(this.chart.canvas.style.width.replace(/\D/g, "")), a = Number(this.chart.canvas.style.height.replace(/\D/g, ""));
                let c = r + s.caretX + 10, h = o + s.caretY - 20;
                c + i.clientWidth > r + l && (c = r + s.caretX - i.clientWidth - 10), h + i.clientHeight > o + 0.9 * a && (h = o + s.caretY - i.clientHeight + 20), c < r && (c = r + s.caretX - i.clientWidth / 2, h = o + s.caretY - i.clientHeight - 20), i.style.position = "absolute", i.style.padding = s.padding + "px " + s.padding + "px", i.style.pointerEvents = "none", i.style.left = c + "px", i.style.top = h + "px", i.style.opacity = 1;
              }
            }
          }
        }
      });
    }
  }
}, x7 = { class: "fr-col-12" }, k7 = { class: "chart" }, w7 = { class: "tooltip" }, _7 = { class: "tooltip_body" }, M7 = { class: "tooltip_value" }, C7 = { class: "tooltip_value-content" }, S7 = { class: "tooltip_place" }, E7 = { class: "chart_legend fr-mb-0 fr-mt-4v" }, P7 = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, D7 = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, N7 = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, O7 = {
  key: 0,
  class: "flex fr-mt-1w"
}, R7 = { class: "fr-text--xs" };
function A7(e, t, n, i, s, r) {
  var o;
  return V(), Ce(Fe, {
    disabled: !((o = e.$el) != null && o.ownerDocument.getElementById(n.databoxId)) || !n.databoxId && !n.databoxType && n.databoxSource === "default",
    to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource
  }, [
    p("div", {
      ref: s.widgetId,
      class: "widget_container fr-grid-row"
    }, [
      p("div", x7, [
        p("div", k7, [
          p("div", w7, [
            t[0] || (t[0] = p("div", { class: "tooltip_header fr-text--sm fr-mb-0" }, null, -1)),
            p("div", _7, [
              p("div", M7, [
                (V(!0), W(vt, null, Ft(s.nameParse, (l, a) => (V(), W("div", {
                  key: a,
                  class: "flex fr-mt-3v fr-mb-1v",
                  style: { "border-bottom": "1px solid #e0e0e0" }
                }, [
                  p("div", C7, [
                    p("span", {
                      class: "tooltip_dot",
                      style: C({ "background-color": s.colorParse[a] })
                    }, null, 4),
                    p("p", S7, X(e.capitalize(l)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          p("canvas", { ref: s.chartId }, null, 512),
          p("div", E7, [
            (V(!0), W(vt, null, Ft(s.nameParse, (l, a) => (V(), W("div", {
              key: a,
              class: "flex fr-mt-3v fr-mb-1v"
            }, [
              p("span", {
                class: "legende_dot",
                style: C({ "background-color": s.colorParse[a] })
              }, null, 4),
              p("p", P7, X(e.capitalize(l)), 1)
            ]))), 128))
          ]),
          (V(!0), W(vt, null, Ft(s.hlineNameParse, (l, a) => (V(), W("div", {
            key: a,
            class: "flex fr-mt-3v"
          }, [
            p("span", {
              class: "legende_dash_line",
              style: C({ "background-color": s.hlineColorParse[a] })
            }, null, 4),
            p("span", {
              class: "legende_dash_line legende_dash_line_end",
              style: C({ "background-color": s.hlineColorParse[a] })
            }, null, 4),
            p("p", D7, X(e.capitalize(l)), 1)
          ]))), 128)),
          (V(!0), W(vt, null, Ft(s.vlineNameParse, (l, a) => (V(), W("div", {
            key: a,
            class: "flex fr-mt-3v fr-mb-1v"
          }, [
            p("span", {
              class: "legende_dash_line",
              style: C({ "background-color": s.vlineColorParse[a] })
            }, null, 4),
            p("span", {
              class: "legende_dash_line legende_dash_line_end",
              style: C({ "background-color": s.vlineColorParse[a] })
            }, null, 4),
            p("p", N7, X(e.capitalize(l)), 1)
          ]))), 128)),
          n.date ? (V(), W("div", O7, [
            p("p", R7, " Mise à jour : " + X(n.date), 1)
          ])) : Ct("", !0)
        ])
      ])
    ], 512)
  ], 8, ["disabled", "to"]);
}
const F7 = /* @__PURE__ */ jt(y7, [["render", A7]]);
function $o(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function T7(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function np(e) {
  let t, n, i;
  e.length !== 2 ? (t = $o, n = (l, a) => $o(e(l), a), i = (l, a) => e(l) - a) : (t = e === $o || e === T7 ? e : L7, n = e, i = e);
  function s(l, a, c = 0, h = l.length) {
    if (c < h) {
      if (t(a, a) !== 0) return h;
      do {
        const d = c + h >>> 1;
        n(l[d], a) < 0 ? c = d + 1 : h = d;
      } while (c < h);
    }
    return c;
  }
  function r(l, a, c = 0, h = l.length) {
    if (c < h) {
      if (t(a, a) !== 0) return h;
      do {
        const d = c + h >>> 1;
        n(l[d], a) <= 0 ? c = d + 1 : h = d;
      } while (c < h);
    }
    return c;
  }
  function o(l, a, c = 0, h = l.length) {
    const d = s(l, a, c, h - 1);
    return d > c && i(l[d - 1], a) > -i(l[d], a) ? d - 1 : d;
  }
  return { left: s, center: o, right: r };
}
function L7() {
  return 0;
}
function I7(e) {
  return e === null ? NaN : +e;
}
const V7 = np($o), $7 = V7.right;
np(I7).center;
const B7 = Math.sqrt(50), z7 = Math.sqrt(10), H7 = Math.sqrt(2);
function gr(e, t, n) {
  const i = (t - e) / Math.max(0, n), s = Math.floor(Math.log10(i)), r = i / Math.pow(10, s), o = r >= B7 ? 10 : r >= z7 ? 5 : r >= H7 ? 2 : 1;
  let l, a, c;
  return s < 0 ? (c = Math.pow(10, -s) / o, l = Math.round(e * c), a = Math.round(t * c), l / c < e && ++l, a / c > t && --a, c = -c) : (c = Math.pow(10, s) * o, l = Math.round(e / c), a = Math.round(t / c), l * c < e && ++l, a * c > t && --a), a < l && 0.5 <= n && n < 2 ? gr(e, t, n * 2) : [l, a, c];
}
function j7(e, t, n) {
  if (t = +t, e = +e, n = +n, !(n > 0)) return [];
  if (e === t) return [e];
  const i = t < e, [s, r, o] = i ? gr(t, e, n) : gr(e, t, n);
  if (!(r >= s)) return [];
  const l = r - s + 1, a = new Array(l);
  if (i)
    if (o < 0) for (let c = 0; c < l; ++c) a[c] = (r - c) / -o;
    else for (let c = 0; c < l; ++c) a[c] = (r - c) * o;
  else if (o < 0) for (let c = 0; c < l; ++c) a[c] = (s + c) / -o;
  else for (let c = 0; c < l; ++c) a[c] = (s + c) * o;
  return a;
}
function aa(e, t, n) {
  return t = +t, e = +e, n = +n, gr(e, t, n)[2];
}
function W7(e, t, n) {
  t = +t, e = +e, n = +n;
  const i = t < e, s = i ? aa(t, e, n) : aa(e, t, n);
  return (i ? -1 : 1) * (s < 0 ? 1 / -s : s);
}
function q7(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function hc(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function ip(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function Ys() {
}
var Ts = 0.7, mr = 1 / Ts, Ai = "\\s*([+-]?\\d+)\\s*", Ls = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ze = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", G7 = /^#([0-9a-f]{3,8})$/, Y7 = new RegExp(`^rgb\\(${Ai},${Ai},${Ai}\\)$`), U7 = new RegExp(`^rgb\\(${Ze},${Ze},${Ze}\\)$`), X7 = new RegExp(`^rgba\\(${Ai},${Ai},${Ai},${Ls}\\)$`), K7 = new RegExp(`^rgba\\(${Ze},${Ze},${Ze},${Ls}\\)$`), J7 = new RegExp(`^hsl\\(${Ls},${Ze},${Ze}\\)$`), Z7 = new RegExp(`^hsla\\(${Ls},${Ze},${Ze},${Ls}\\)$`), Yd = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
hc(Ys, Is, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ud,
  // Deprecated! Use color.formatHex.
  formatHex: Ud,
  formatHex8: Q7,
  formatHsl: tk,
  formatRgb: Xd,
  toString: Xd
});
function Ud() {
  return this.rgb().formatHex();
}
function Q7() {
  return this.rgb().formatHex8();
}
function tk() {
  return sp(this).formatHsl();
}
function Xd() {
  return this.rgb().formatRgb();
}
function Is(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = G7.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Kd(t) : n === 3 ? new ce(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? xo(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? xo(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Y7.exec(e)) ? new ce(t[1], t[2], t[3], 1) : (t = U7.exec(e)) ? new ce(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = X7.exec(e)) ? xo(t[1], t[2], t[3], t[4]) : (t = K7.exec(e)) ? xo(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = J7.exec(e)) ? Qd(t[1], t[2] / 100, t[3] / 100, 1) : (t = Z7.exec(e)) ? Qd(t[1], t[2] / 100, t[3] / 100, t[4]) : Yd.hasOwnProperty(e) ? Kd(Yd[e]) : e === "transparent" ? new ce(NaN, NaN, NaN, 0) : null;
}
function Kd(e) {
  return new ce(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function xo(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new ce(e, t, n, i);
}
function ek(e) {
  return e instanceof Ys || (e = Is(e)), e ? (e = e.rgb(), new ce(e.r, e.g, e.b, e.opacity)) : new ce();
}
function ca(e, t, n, i) {
  return arguments.length === 1 ? ek(e) : new ce(e, t, n, i ?? 1);
}
function ce(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
hc(ce, ca, ip(Ys, {
  brighter(e) {
    return e = e == null ? mr : Math.pow(mr, e), new ce(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ts : Math.pow(Ts, e), new ce(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ce(li(this.r), li(this.g), li(this.b), vr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Jd,
  // Deprecated! Use color.formatHex.
  formatHex: Jd,
  formatHex8: nk,
  formatRgb: Zd,
  toString: Zd
}));
function Jd() {
  return `#${Zn(this.r)}${Zn(this.g)}${Zn(this.b)}`;
}
function nk() {
  return `#${Zn(this.r)}${Zn(this.g)}${Zn(this.b)}${Zn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Zd() {
  const e = vr(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${li(this.r)}, ${li(this.g)}, ${li(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function vr(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function li(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Zn(e) {
  return e = li(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Qd(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new De(e, t, n, i);
}
function sp(e) {
  if (e instanceof De) return new De(e.h, e.s, e.l, e.opacity);
  if (e instanceof Ys || (e = Is(e)), !e) return new De();
  if (e instanceof De) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, s = Math.min(t, n, i), r = Math.max(t, n, i), o = NaN, l = r - s, a = (r + s) / 2;
  return l ? (t === r ? o = (n - i) / l + (n < i) * 6 : n === r ? o = (i - t) / l + 2 : o = (t - n) / l + 4, l /= a < 0.5 ? r + s : 2 - r - s, o *= 60) : l = a > 0 && a < 1 ? 0 : o, new De(o, l, a, e.opacity);
}
function ik(e, t, n, i) {
  return arguments.length === 1 ? sp(e) : new De(e, t, n, i ?? 1);
}
function De(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
hc(De, ik, ip(Ys, {
  brighter(e) {
    return e = e == null ? mr : Math.pow(mr, e), new De(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ts : Math.pow(Ts, e), new De(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - i;
    return new ce(
      Ml(e >= 240 ? e - 240 : e + 120, s, i),
      Ml(e, s, i),
      Ml(e < 120 ? e + 240 : e - 120, s, i),
      this.opacity
    );
  },
  clamp() {
    return new De(tu(this.h), ko(this.s), ko(this.l), vr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = vr(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${tu(this.h)}, ${ko(this.s) * 100}%, ${ko(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function tu(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ko(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Ml(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const dc = (e) => () => e;
function sk(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function ok(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function rk(e) {
  return (e = +e) == 1 ? op : function(t, n) {
    return n - t ? ok(t, n, e) : dc(isNaN(t) ? n : t);
  };
}
function op(e, t) {
  var n = t - e;
  return n ? sk(e, n) : dc(isNaN(e) ? t : e);
}
const eu = function e(t) {
  var n = rk(t);
  function i(s, r) {
    var o = n((s = ca(s)).r, (r = ca(r)).r), l = n(s.g, r.g), a = n(s.b, r.b), c = op(s.opacity, r.opacity);
    return function(h) {
      return s.r = o(h), s.g = l(h), s.b = a(h), s.opacity = c(h), s + "";
    };
  }
  return i.gamma = e, i;
}(1);
function lk(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, i = t.slice(), s;
  return function(r) {
    for (s = 0; s < n; ++s) i[s] = e[s] * (1 - r) + t[s] * r;
    return i;
  };
}
function ak(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function ck(e, t) {
  var n = t ? t.length : 0, i = e ? Math.min(n, e.length) : 0, s = new Array(i), r = new Array(n), o;
  for (o = 0; o < i; ++o) s[o] = uc(e[o], t[o]);
  for (; o < n; ++o) r[o] = t[o];
  return function(l) {
    for (o = 0; o < i; ++o) r[o] = s[o](l);
    return r;
  };
}
function hk(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(i) {
    return n.setTime(e * (1 - i) + t * i), n;
  };
}
function br(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function dk(e, t) {
  var n = {}, i = {}, s;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (s in t)
    s in e ? n[s] = uc(e[s], t[s]) : i[s] = t[s];
  return function(r) {
    for (s in n) i[s] = n[s](r);
    return i;
  };
}
var ha = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Cl = new RegExp(ha.source, "g");
function uk(e) {
  return function() {
    return e;
  };
}
function fk(e) {
  return function(t) {
    return e(t) + "";
  };
}
function pk(e, t) {
  var n = ha.lastIndex = Cl.lastIndex = 0, i, s, r, o = -1, l = [], a = [];
  for (e = e + "", t = t + ""; (i = ha.exec(e)) && (s = Cl.exec(t)); )
    (r = s.index) > n && (r = t.slice(n, r), l[o] ? l[o] += r : l[++o] = r), (i = i[0]) === (s = s[0]) ? l[o] ? l[o] += s : l[++o] = s : (l[++o] = null, a.push({ i: o, x: br(i, s) })), n = Cl.lastIndex;
  return n < t.length && (r = t.slice(n), l[o] ? l[o] += r : l[++o] = r), l.length < 2 ? a[0] ? fk(a[0].x) : uk(t) : (t = a.length, function(c) {
    for (var h = 0, d; h < t; ++h) l[(d = a[h]).i] = d.x(c);
    return l.join("");
  });
}
function uc(e, t) {
  var n = typeof t, i;
  return t == null || n === "boolean" ? dc(t) : (n === "number" ? br : n === "string" ? (i = Is(t)) ? (t = i, eu) : pk : t instanceof Is ? eu : t instanceof Date ? hk : ak(t) ? lk : Array.isArray(t) ? ck : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? dk : br)(e, t);
}
function gk(e, t) {
  return e = +e, t = +t, function(n) {
    return Math.round(e * (1 - n) + t * n);
  };
}
function mk(e) {
  return function() {
    return e;
  };
}
function vk(e) {
  return +e;
}
var nu = [0, 1];
function Pi(e) {
  return e;
}
function da(e, t) {
  return (t -= e = +e) ? function(n) {
    return (n - e) / t;
  } : mk(isNaN(t) ? NaN : 0.5);
}
function bk(e, t) {
  var n;
  return e > t && (n = e, e = t, t = n), function(i) {
    return Math.max(e, Math.min(t, i));
  };
}
function yk(e, t, n) {
  var i = e[0], s = e[1], r = t[0], o = t[1];
  return s < i ? (i = da(s, i), r = n(o, r)) : (i = da(i, s), r = n(r, o)), function(l) {
    return r(i(l));
  };
}
function xk(e, t, n) {
  var i = Math.min(e.length, t.length) - 1, s = new Array(i), r = new Array(i), o = -1;
  for (e[i] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < i; )
    s[o] = da(e[o], e[o + 1]), r[o] = n(t[o], t[o + 1]);
  return function(l) {
    var a = $7(e, l, 1, i) - 1;
    return r[a](s[a](l));
  };
}
function kk(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function wk() {
  var e = nu, t = nu, n = uc, i, s, r, o = Pi, l, a, c;
  function h() {
    var u = Math.min(e.length, t.length);
    return o !== Pi && (o = bk(e[0], e[u - 1])), l = u > 2 ? xk : yk, a = c = null, d;
  }
  function d(u) {
    return u == null || isNaN(u = +u) ? r : (a || (a = l(e.map(i), t, n)))(i(o(u)));
  }
  return d.invert = function(u) {
    return o(s((c || (c = l(t, e.map(i), br)))(u)));
  }, d.domain = function(u) {
    return arguments.length ? (e = Array.from(u, vk), h()) : e.slice();
  }, d.range = function(u) {
    return arguments.length ? (t = Array.from(u), h()) : t.slice();
  }, d.rangeRound = function(u) {
    return t = Array.from(u), n = gk, h();
  }, d.clamp = function(u) {
    return arguments.length ? (o = u ? !0 : Pi, h()) : o !== Pi;
  }, d.interpolate = function(u) {
    return arguments.length ? (n = u, h()) : n;
  }, d.unknown = function(u) {
    return arguments.length ? (r = u, d) : r;
  }, function(u, f) {
    return i = u, s = f, h();
  };
}
function _k() {
  return wk()(Pi, Pi);
}
function Mk(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function yr(e, t) {
  if ((n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0) return null;
  var n, i = e.slice(0, n);
  return [
    i.length > 1 ? i[0] + i.slice(2) : i,
    +e.slice(n + 1)
  ];
}
function $i(e) {
  return e = yr(Math.abs(e)), e ? e[1] : NaN;
}
function Ck(e, t) {
  return function(n, i) {
    for (var s = n.length, r = [], o = 0, l = e[0], a = 0; s > 0 && l > 0 && (a + l + 1 > i && (l = Math.max(1, i - a)), r.push(n.substring(s -= l, s + l)), !((a += l + 1) > i)); )
      l = e[o = (o + 1) % e.length];
    return r.reverse().join(t);
  };
}
function Sk(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(n) {
      return e[+n];
    });
  };
}
var Ek = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function xr(e) {
  if (!(t = Ek.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new fc({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
xr.prototype = fc.prototype;
function fc(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
fc.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Pk(e) {
  t: for (var t = e.length, n = 1, i = -1, s; n < t; ++n)
    switch (e[n]) {
      case ".":
        i = s = n;
        break;
      case "0":
        i === 0 && (i = n), s = n;
        break;
      default:
        if (!+e[n]) break t;
        i > 0 && (i = 0);
        break;
    }
  return i > 0 ? e.slice(0, i) + e.slice(s + 1) : e;
}
var rp;
function Dk(e, t) {
  var n = yr(e, t);
  if (!n) return e + "";
  var i = n[0], s = n[1], r = s - (rp = Math.max(-8, Math.min(8, Math.floor(s / 3))) * 3) + 1, o = i.length;
  return r === o ? i : r > o ? i + new Array(r - o + 1).join("0") : r > 0 ? i.slice(0, r) + "." + i.slice(r) : "0." + new Array(1 - r).join("0") + yr(e, Math.max(0, t + r - 1))[0];
}
function iu(e, t) {
  var n = yr(e, t);
  if (!n) return e + "";
  var i = n[0], s = n[1];
  return s < 0 ? "0." + new Array(-s).join("0") + i : i.length > s + 1 ? i.slice(0, s + 1) + "." + i.slice(s + 1) : i + new Array(s - i.length + 2).join("0");
}
const su = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: Mk,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => iu(e * 100, t),
  r: iu,
  s: Dk,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function ou(e) {
  return e;
}
var ru = Array.prototype.map, lu = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Nk(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? ou : Ck(ru.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", i = e.currency === void 0 ? "" : e.currency[1] + "", s = e.decimal === void 0 ? "." : e.decimal + "", r = e.numerals === void 0 ? ou : Sk(ru.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", l = e.minus === void 0 ? "−" : e.minus + "", a = e.nan === void 0 ? "NaN" : e.nan + "";
  function c(d) {
    d = xr(d);
    var u = d.fill, f = d.align, g = d.sign, m = d.symbol, v = d.zero, b = d.width, _ = d.comma, S = d.precision, E = d.trim, k = d.type;
    k === "n" ? (_ = !0, k = "g") : su[k] || (S === void 0 && (S = 12), E = !0, k = "g"), (v || u === "0" && f === "=") && (v = !0, u = "0", f = "=");
    var N = m === "$" ? n : m === "#" && /[boxX]/.test(k) ? "0" + k.toLowerCase() : "", w = m === "$" ? i : /[%p]/.test(k) ? o : "", P = su[k], O = /[defgprs%]/.test(k);
    S = S === void 0 ? 6 : /[gprs]/.test(k) ? Math.max(1, Math.min(21, S)) : Math.max(0, Math.min(20, S));
    function F(R) {
      var j = N, J = w, kt, st, et;
      if (k === "c")
        J = P(R) + J, R = "";
      else {
        R = +R;
        var U = R < 0 || 1 / R < 0;
        if (R = isNaN(R) ? a : P(Math.abs(R), S), E && (R = Pk(R)), U && +R == 0 && g !== "+" && (U = !1), j = (U ? g === "(" ? g : l : g === "-" || g === "(" ? "" : g) + j, J = (k === "s" ? lu[8 + rp / 3] : "") + J + (U && g === "(" ? ")" : ""), O) {
          for (kt = -1, st = R.length; ++kt < st; )
            if (et = R.charCodeAt(kt), 48 > et || et > 57) {
              J = (et === 46 ? s + R.slice(kt + 1) : R.slice(kt)) + J, R = R.slice(0, kt);
              break;
            }
        }
      }
      _ && !v && (R = t(R, 1 / 0));
      var Z = j.length + R.length + J.length, ct = Z < b ? new Array(b - Z + 1).join(u) : "";
      switch (_ && v && (R = t(ct + R, ct.length ? b - J.length : 1 / 0), ct = ""), f) {
        case "<":
          R = j + R + J + ct;
          break;
        case "=":
          R = j + ct + R + J;
          break;
        case "^":
          R = ct.slice(0, Z = ct.length >> 1) + j + R + J + ct.slice(Z);
          break;
        default:
          R = ct + j + R + J;
          break;
      }
      return r(R);
    }
    return F.toString = function() {
      return d + "";
    }, F;
  }
  function h(d, u) {
    var f = c((d = xr(d), d.type = "f", d)), g = Math.max(-8, Math.min(8, Math.floor($i(u) / 3))) * 3, m = Math.pow(10, -g), v = lu[8 + g / 3];
    return function(b) {
      return f(m * b) + v;
    };
  }
  return {
    format: c,
    formatPrefix: h
  };
}
var wo, lp, ap;
Ok({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Ok(e) {
  return wo = Nk(e), lp = wo.format, ap = wo.formatPrefix, wo;
}
function Rk(e) {
  return Math.max(0, -$i(Math.abs(e)));
}
function Ak(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor($i(t) / 3))) * 3 - $i(Math.abs(e)));
}
function Fk(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, $i(t) - $i(e)) + 1;
}
function Tk(e, t, n, i) {
  var s = W7(e, t, n), r;
  switch (i = xr(i ?? ",f"), i.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return i.precision == null && !isNaN(r = Ak(s, o)) && (i.precision = r), ap(i, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      i.precision == null && !isNaN(r = Fk(s, Math.max(Math.abs(e), Math.abs(t)))) && (i.precision = r - (i.type === "e"));
      break;
    }
    case "f":
    case "%": {
      i.precision == null && !isNaN(r = Rk(s)) && (i.precision = r - (i.type === "%") * 2);
      break;
    }
  }
  return lp(i);
}
function Lk(e) {
  var t = e.domain;
  return e.ticks = function(n) {
    var i = t();
    return j7(i[0], i[i.length - 1], n ?? 10);
  }, e.tickFormat = function(n, i) {
    var s = t();
    return Tk(s[0], s[s.length - 1], n ?? 10, i);
  }, e.nice = function(n) {
    n == null && (n = 10);
    var i = t(), s = 0, r = i.length - 1, o = i[s], l = i[r], a, c, h = 10;
    for (l < o && (c = o, o = l, l = c, c = s, s = r, r = c); h-- > 0; ) {
      if (c = aa(o, l, n), c === a)
        return i[s] = o, i[r] = l, t(i);
      if (c > 0)
        o = Math.floor(o / c) * c, l = Math.ceil(l / c) * c;
      else if (c < 0)
        o = Math.ceil(o * c) / c, l = Math.floor(l * c) / c;
      else
        break;
      a = c;
    }
    return e;
  }, e;
}
function pc() {
  var e = _k();
  return e.copy = function() {
    return kk(e, pc());
  }, q7.apply(e, arguments), Lk(e);
}
const Ik = { class: "map_info fr-col-12 fr-col-lg-3" }, Vk = { key: 0 }, $k = { class: "flex fr-text--sm fr-text--bold fr-mb-2w" }, Bk = { class: "fr-text--sm fr-text--bold fr-mb-1v" }, zk = { class: "fr-text--md fr-text--bold fr-my-0" }, Hk = { class: "scale fr-mt-auto" }, jk = { class: "scale_values" }, Wk = { class: "min fr-text--sm fr-text--bold fr-mb-0" }, qk = { class: "max fr-text--sm fr-text--bold fr-mb-0" }, Gk = {
  __name: "MapInfo",
  props: {
    data: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = e, n = Xn(() => "linear-gradient(90deg," + t.data.colorMin + " 0%," + t.data.colorMax + " 100%)");
    return (i, s) => (V(), W("div", Ik, [
      e.data.valueNat || e.data.valueReg ? (V(), W("div", Vk, [
        p("p", {
          class: "fr-text--xs fr-mb-1v",
          style: C({ color: e.data.textMention })
        }, " Mise à jour : " + X(e.data.date), 5),
        p("p", {
          class: "fr-text--xs fr-text--bold fr-mb-1v",
          style: C({ color: e.data.textMention })
        }, X(e.data.names) + ", en France ", 5),
        s[0] || (s[0] = p("div", { class: "sep fr-mb-2w" }, null, -1)),
        p("p", {
          class: "fr-text--xs fr-text--bold fr-mb-2w",
          style: C({ color: e.data.textMention })
        }, X(Kn(ds)(e.data.value)), 5)
      ])) : Ct("", !0),
      p("div", null, [
        p("p", {
          class: "fr-text--xs fr-mb-1v",
          style: C({ color: e.data.textMention })
        }, " Localisation ", 4),
        p("p", $k, [
          p("span", null, X(e.data.localisation), 1)
        ]),
        p("p", {
          class: "fr-text--xs fr-mb-1v",
          style: C({ color: e.data.textMention })
        }, " Mise à jour : " + X(e.data.date), 5),
        p("p", Bk, X(e.data.names), 1),
        p("p", zk, X(Kn(ds)(e.data.valueNat || e.data.valueReg || e.data.value)), 1)
      ]),
      p("div", Hk, [
        s[1] || (s[1] = p("div", { class: "sep fr-my-2w" }, null, -1)),
        p("p", {
          class: "fr-text--xs fr-mb-1w",
          style: C({ color: e.data.textMention })
        }, " Légende ", 4),
        p("div", {
          class: "scale_container",
          style: C({ background: n.value })
        }, null, 4),
        p("div", jk, [
          p("span", Wk, X(Kn(ds)(e.data.min)), 1),
          p("span", qk, X(Kn(ds)(e.data.max)), 1)
        ])
      ])
    ]));
  }
}, cp = /* @__PURE__ */ jt(Gk, [["__scopeId", "data-v-25dc55bf"]]), Yk = {
  mixins: [ui],
  props: {
    config: {
      type: Object,
      required: !0
    }
  }
}, Uk = ["viewBox"], Xk = ["stroke"];
function Kk(e, t, n, i, s, r) {
  return V(), W("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: n.config.viewBox
  }, [
    p("g", {
      fill: "#5C68E5",
      stroke: n.config.colorStroke,
      "stroke-width": ".2%"
    }, [
      p("path", {
        class: "FR-2A",
        style: C({ display: n.config.displayDep["FR-2A"] }),
        d: "M930 907v3l3 3 6 4 1 3-4 1-5 1v2l2 2v8l8 2 3 1 2 4-2 2-2 1-3 4-2 3 1 6h6l1 1 5-2 2 1-3 6 3 2-5 3-2 7 8 2 11 1-5 5s-2-1-3-1v1c0 2-3 6-3 7l4 3 6 4 12 4 4 1 3 2-2 3h6l1 3h5l2-7-4-1 5-5-1-2v-3l7-4v-4h-4l-3 2v-4h5l2-4 2-13-1-5v-5l-7 4h-7l-1-5 1-1-2-2-1-9-1-2h-4l-2-1v-6l-2-2-2-1-4-5v-3h-5l-2-5h-6l-4-4 1-2-2-1h-5l-2-1h-8v-2z",
        onClick: t[0] || (t[0] = (o) => e.onclick(o)),
        onDblclick: t[1] || (t[1] = (o) => e.ondblclick()),
        onMouseenter: t[2] || (t[2] = (o) => e.onenter(o)),
        onMouseleave: t[3] || (t[3] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-2B",
        style: C({ display: n.config.displayDep["FR-2B"] }),
        d: "m990 834-5 4v4l3 3-3 3 1 3-2 2v3l4 4v5l-2 4-3 1-3-3h-5l-1-1h-4l-4 4-2 6-9 2-7 6-2 4-3-1-2-2-1 6-3 1v6l1 3-4 3-1 3h4v2h7l2 1h6l2 1-1 2 4 4h6l2 5h5v3l3 5 3 1 2 2v6l2 2h4l1 1 1 9 2 2-1 1 1 5h7l7-4-1-11 9-12v-20l-4-7-1-22-2-4-5-4-1-13 2-6-2-10-2-8-2-2z",
        onClick: t[4] || (t[4] = (o) => e.onclick(o)),
        onDblclick: t[5] || (t[5] = (o) => e.ondblclick()),
        onMouseenter: t[6] || (t[6] = (o) => e.onenter(o)),
        onMouseleave: t[7] || (t[7] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-13",
        style: C({ display: n.config.displayDep["FR-13"] }),
        d: "m686 750-10 5-3 20-11-2-3 8 3 4-12 7-3 8h11l15 1 3 3h-5l-4 6 16 3 12-2-7-6 5-4 7 3 3 7 20 1 6-3 1 4-6 5h8l-1 4-2 2h17l9 3 1 1v-7l3-3 3-2v-2l-3-2h-3l-2-2 3-3v-1l-3-1v-3h7l2-1-6-6v-7l-4-3 3-7 8-5-6-4-4 3-10 3-7-1-15-6h-8l-7-3-3-4-5-6-13-5h-1z",
        onClick: t[8] || (t[8] = (o) => e.onclick(o)),
        onDblclick: t[9] || (t[9] = (o) => e.ondblclick()),
        onMouseenter: t[10] || (t[10] = (o) => e.onenter(o)),
        onMouseleave: t[11] || (t[11] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-84",
        style: C({ display: n.config.displayDep["FR-84"] }),
        d: "M699 697h-5l-4 6 1 7 6 1-1 2-5 1-5 5-1-2 1-7-2-2-10 1-2 4 1 1 6 10v8l11 11v4l-4 3 13 5 5 6 3 4 7 3h9l14 6 8 1 9-3 4-3 1-2-7-9h-9v-3l3-3v-4l-6-3-1-5 4-2v-4l-4-1-1-5h-3l-6-5-1-4-10-1-7-1-1-4 2-5-4 4-8-1-1-3 5-6z",
        onClick: t[12] || (t[12] = (o) => e.onclick(o)),
        onDblclick: t[13] || (t[13] = (o) => e.ondblclick()),
        onMouseenter: t[14] || (t[14] = (o) => e.onenter(o)),
        onMouseleave: t[15] || (t[15] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-83",
        style: C({ display: n.config.displayDep["FR-83"] }),
        d: "M830 756h-6l-2 2h-10l-9 6-6-4-9 3-1 4-7 5-12-8-9 3-1 2 7 4-8 6-4 6 4 3v7l6 6-2 1h-7v3l4 1v1l-3 3 1 2h3l3 2v2l-3 2-3 3v7l1 2 6 2 2 8 4 1 4-3 6-4 11 1v3l-4 2h9l-2-2-1-5 5-3 5 2h2l2 3 3-2v-5l3-2h8l2-4 5 2 6-3v-9h-8l6-3 3-4 1-6 10-1 6-7-4-4v-2l-2-2 2-2v-4l-5-2h-2l-4-3v-8l-5-1-4-1-1-4z",
        onClick: t[16] || (t[16] = (o) => e.onclick(o)),
        onDblclick: t[17] || (t[17] = (o) => e.ondblclick()),
        onMouseenter: t[18] || (t[18] = (o) => e.onenter(o)),
        onMouseleave: t[19] || (t[19] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-04",
        style: C({ display: n.config.displayDep["FR-04"] }),
        d: "m841 665-4 6-5 4-2 3-5 1v3l-2 2-2 5h-11l-6-3-4 3-6-1-2 3h2v6h-1l-6-3v-3l-4-3h-2v4h-3l-6 4-4 6-1 4h2l1 5h-2l-4-3-2 1 1 2 5 7-3 1-3-2h-6l-6 6v2l-2-3-3-2-2 5-3 3h-2l1 5 4 1v4l-4 2 1 5 6 3v4l-3 3v3h8l8 9 9-3 12 8 7-5 1-4 10-3 5 4 9-6h10l2-2h6l-2-4 2-2v-2h5l1-2 5-3 4 3 2-2-6-5-6-6-3-1v-5l-4-6 2-8 1-5 4-3v-4l5-3h1v-7l5-1-3-3-3-1-2-4 1-4 7-7-1-5h1z",
        onClick: t[20] || (t[20] = (o) => e.onclick(o)),
        onDblclick: t[21] || (t[21] = (o) => e.ondblclick()),
        onMouseenter: t[22] || (t[22] = (o) => e.onenter(o)),
        onMouseleave: t[23] || (t[23] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-06",
        style: C({ display: n.config.displayDep["FR-06"] }),
        d: "M841 698h-1l-5 3v4l-4 3-1 5-2 8 4 6v5l3 1 6 6 6 5-2 2-4-3-5 3-1 2h-5v2l-2 2 2 4-4 2 1 4h4l5 2v7l4 4h2l5 2v3l-2 3 2 1v3l4 4 1-9 7 2 2-3h4v-11l9-1 7-6h6l1-4 6-4-4-8 6-5-1-5 8-3 2-8-1-5-2-3-2-5h-5l-17 6h-5l-10-7-9-3h-5v-6z",
        onClick: t[24] || (t[24] = (o) => e.onclick(o)),
        onDblclick: t[25] || (t[25] = (o) => e.ondblclick()),
        onMouseenter: t[26] || (t[26] = (o) => e.onenter(o)),
        onMouseleave: t[27] || (t[27] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-05",
        style: C({ display: n.config.displayDep["FR-05"] }),
        d: "m810 619-3 1-1 6-6 1-1-6-2-2-7 1-2 2-2 8 1 2h8l1 5 3 1v8h-7l-2 3-9-1-4 4-4-2-4 4 1 3-2 3h-10v4l3 2-1 2-6 3-7 1-3 6v5l4 3-4 5-5-3h-6v3l3 3-4 3 1 6 13 3 2 5h3l-1 11 6-5h6l3 2 3-1-5-7-1-2 2-1 4 3h2l-1-5h-2l1-4 4-6 6-4h3v-4h2l4 3v3l6 3h2l-1-6h-2l2-3 6 1 4-3 6 3h11l2-5 2-2v-3l5-1 1-3 6-4 4-6 5 1 3-4h4v-3l-5-3-1-10-4-1h-5l-10-4-1-11-6-2-1-4-3-5z",
        onClick: t[28] || (t[28] = (o) => e.onclick(o)),
        onDblclick: t[29] || (t[29] = (o) => e.ondblclick()),
        onMouseenter: t[30] || (t[30] = (o) => e.onenter(o)),
        onMouseleave: t[31] || (t[31] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-48",
        style: C({ display: n.config.displayDep["FR-48"] }),
        d: "m577 643-10 4-3 6-7-4-5 16-5 12 7 9v7l5 4v8l2 13 6 2-1 4 9-1 3 1-2 2 11 7 10-2 1-2-1-3 4-1 6 5 9 1 4-7v-5l3-3-2-1v-7l-6-6h5l2-2 2-4-2-1 1-7-6-7-3-13-9-12-7 2-1-6h-4v5l-10 3z",
        onClick: t[32] || (t[32] = (o) => e.onclick(o)),
        onDblclick: t[33] || (t[33] = (o) => e.ondblclick()),
        onMouseenter: t[34] || (t[34] = (o) => e.onenter(o)),
        onMouseleave: t[35] || (t[35] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-03",
        style: C({ display: n.config.displayDep["FR-03"] }),
        d: "m541 451-5 6h-3l-3 4-3-4-10 9v6l2 2v2l-5 4-5-1-9 2-4 5-2 4 4 6v4l3 4 2-4 3 5 4 2 4 9v3l6 4 3-1 2-6h2v-3l4-1 1 2 5-5h5l1 2-2 3 3 5 1 2 9 5 12 2h3l5 1 4-3 3 2 1 4 4 1h6l1 4 5 2v-2h9l-1-21-2-5 1-4 6-1 8-6v-14l-3-4h-5l-2-3h-7l-1-2v-5l-8-14-3-2-7 9-3 1-1-5-3-2-2 3h-5l-1-3-4 2-3 2-5-4-6-3v-5z",
        onClick: t[36] || (t[36] = (o) => e.onclick(o)),
        onDblclick: t[37] || (t[37] = (o) => e.ondblclick()),
        onMouseenter: t[38] || (t[38] = (o) => e.onenter(o)),
        onMouseleave: t[39] || (t[39] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-30",
        style: C({ display: n.config.displayDep["FR-30"] }),
        d: "m624 696-2 4-2 2h-5l6 6v7l2 1-3 3v5l-4 7-9-1-6-5-4 1 1 3-1 3-10 1-11-7-2 2v5l-4 1 1 4 5 1h6l1 7-6 3v4l5 2v2l2 2 2-2h3l1 3h4l2-7h3l5-6h6l1 9 2 3 4-2 6 3 2 4 11 6 4 10v4l-7 4-5 4 6 1v7h13l3-8 12-7-3-4 3-8 11 2 2-20 15-8v-4l-11-11v-8l-6-10-13-7-1 5-5 1-2-6-5 1-1 7-4-1-8-6-4 2v-10z",
        onClick: t[40] || (t[40] = (o) => e.onclick(o)),
        onDblclick: t[41] || (t[41] = (o) => e.ondblclick()),
        onMouseenter: t[42] || (t[42] = (o) => e.onenter(o)),
        onMouseleave: t[43] || (t[43] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-11",
        style: C({ display: n.config.displayDep["FR-11"] }),
        d: "m491 802-1 7-6-2h-7v-3l-4 1-7 2-3-4-5 4 2 4-6 2-1 6-5 2 5 5-1 3 17 8 2 13v6l1 9h-9l-3 4 12 9 7-3 8 9-1 1h1l15-7-4-5v-6h34l-1-5 8-4 10 7 4 2v-22l-4 1-4-6 3-5 6 6 6-4 3-4 1-4h-5l-1-5h-5l-4-7-4 1-3-2-1-6-2 1 1 4h-5v6l-7 3-3-7-5 3-4-3-1-5 3-4-2-4h-11l-11-2z",
        onClick: t[44] || (t[44] = (o) => e.onclick(o)),
        onDblclick: t[45] || (t[45] = (o) => e.ondblclick()),
        onMouseenter: t[46] || (t[46] = (o) => e.onenter(o)),
        onMouseleave: t[47] || (t[47] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-34",
        style: C({ display: n.config.displayDep["FR-34"] }),
        d: "m604 747-5 6h-3l-2 7h-4l-1-3h-3l-2 2-2-2v-3l-5-2v2l-7 1-3 3 1 6h-5l-6-3h-3v4l1 10h-10l-2 4-13 5-5-4-3 5-2 5 6 5-2 7-8 2 2 4-3 4 1 5 4 3 5-3 3 7 7-3v-6h5l-1-4 2-1 1 6 3 2 4-1 4 7h5l1 5h5v-2l13-3 1-4h11l3-4 19-16 12-8h5l5-4 7-4v-5l-4-9-11-6-2-5-6-3-4 2-2-2-1-9z",
        onClick: t[48] || (t[48] = (o) => e.onclick(o)),
        onDblclick: t[49] || (t[49] = (o) => e.ondblclick()),
        onMouseenter: t[50] || (t[50] = (o) => e.onenter(o)),
        onMouseleave: t[51] || (t[51] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-66",
        style: C({ display: n.config.displayDep["FR-66"] }),
        d: "m539 858-8 4 1 5h-34v6l4 5-15 7h-14l-1 3-6 2-4 4-12 2 1 4 6 5 10 3v6l6 5h5l6-8 7-1 12 4 10 8 3-3h3l2 2 2-2 1-5 11-2 3-5 6-2h7l5 5 6 1v-6l-3-4-5-2-1-32-5-2z",
        onClick: t[52] || (t[52] = (o) => e.onclick(o)),
        onDblclick: t[53] || (t[53] = (o) => e.ondblclick()),
        onMouseenter: t[54] || (t[54] = (o) => e.onenter(o)),
        onMouseleave: t[55] || (t[55] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-15",
        style: C({ display: n.config.displayDep["FR-15"] }),
        d: "m512 590-1 4 2 5-2 2h-4l-4-4-3-2v10l-7 5-4 6 1 6-2 3-2 6h-2l-3 4 2 2 1 4-4 3 1 12 7 5-5 10 5 2-2 6 4 1 3-5h5l1 1h11l2-4 3-1 1-8h2v-9l11-9 1 1 1 7 7-1 1 10h4l1 11 3 3 5-11 5-16 7 4 3-7 9-3v-3l-2-3-4-2 2-3-2-2h2l3-2-4-1-2-2-1-7-2-2-2-6h-8l-2-5h-2l-2 3-5-1-5-7-2-1-4-2-2 3h-6l-3-7z",
        onClick: t[56] || (t[56] = (o) => e.onclick(o)),
        onDblclick: t[57] || (t[57] = (o) => e.ondblclick()),
        onMouseenter: t[58] || (t[58] = (o) => e.onenter(o)),
        onMouseleave: t[59] || (t[59] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-43",
        style: C({ display: n.config.displayDep["FR-43"] }),
        d: "m571 595-2 2v2h-4l-4 3-6 1-2 2h1l2 5h8l2 6 2 2 1 7 1 2 5 1-3 2h-2l2 2-2 3 4 2 2 3v3h1l6 17 9-3 1-5h4l1 6 7-2 8 10 6-8 9-7h9l3-9h5l1-7h5l-1-2-1-5 2-4 5-2 2-8-5-6h-6l1-6-11-5h-4l-8 6-8-2-1 2-5-2-3-3-2 4-5-1-3-2-2 5-4-2-2-4h-3l-2-2-4 1h-5l-2-1-2 1z",
        onClick: t[60] || (t[60] = (o) => e.onclick(o)),
        onDblclick: t[61] || (t[61] = (o) => e.ondblclick()),
        onMouseenter: t[62] || (t[62] = (o) => e.onenter(o)),
        onMouseleave: t[63] || (t[63] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-63",
        style: C({ display: n.config.displayDep["FR-63"] }),
        d: "m537 509-5 5v-2l-5 1v3h-2l-2 6-3 1-5-4v8l3 4 1 7-4 3-1 5-4 2-7 4 1 3 8 9 1 5-3 5v5l2 3 1 6-1 2 11 4 3 6h6l2-2 4 1 2 1 5 7 5 1 2-3h1l2-2 6-1 4-3h4v-3l2-1 1 2 2-1 2 1h5l4-2 2 3h3l2 4 4 1 2-4 3 2 5 1 2-4 3 3 5 1 1-1-2-1-1-4 6-7-3-12-9-6-4-9-5-6 2-8 3-3-6-5v-1l-5-2-2-4h-5l-4-1-1-4-3-2-4 2-5-1-4 1-11-2-9-5-1-3-3-4 2-4-1-1z",
        onClick: t[64] || (t[64] = (o) => e.onclick(o)),
        onDblclick: t[65] || (t[65] = (o) => e.ondblclick()),
        onMouseenter: t[66] || (t[66] = (o) => e.onenter(o)),
        onMouseleave: t[67] || (t[67] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-65",
        style: C({ display: n.config.displayDep["FR-65"] }),
        d: "m315 784-3 2 6 10-3 4 2 4 5 6-4 5-5 13-10 8 2 5-2 2-5-1-2 12-3 2v7h1l6 3 7 6 1 4 5 5h5l12-5 5 6 7 1 2-4 4 1 7 1-1-19h4l3 1 2-2v-4l5-2-2-7-2-2-4 2 2-4-1-4-6-4 1-3 3-6 4-1v-3l3-3 1-3-6-3h-9l-1-3h-5l-1-3h-5l-1 1h-5v-3l-4-2 1-1 1-4-1-1-2-5-4-1-4-2v-6z",
        onClick: t[68] || (t[68] = (o) => e.onclick(o)),
        onDblclick: t[69] || (t[69] = (o) => e.ondblclick()),
        onMouseenter: t[70] || (t[70] = (o) => e.onenter(o)),
        onMouseleave: t[71] || (t[71] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-64",
        style: C({ display: n.config.displayDep["FR-64"] }),
        d: "m302 785-5 3-10-1-1-1-7 2-5 1-4-3-5 2-1-2h-5l-3 2h-9l-4 3h-9l-1 2-2-1 2-3-4-3-6 5h-9l-11-5-1 3-8 10-7 3h-4v4l4 4h6l1 5 5 1 1-4 7 3 4 1 1 5-2 2v7l-5 2v3l3 4 6 2 1-6 3-3-1 5 3 3h6l3 4 9 2 8 5h14l1 7 9 7 4 5 4-2 3-1 2 2 3-2 7-4v-7l3-2 2-12 5 1 2-2-2-5 9-8 6-13 4-5-5-6-2-4 3-4-6-10-9-1z",
        onClick: t[72] || (t[72] = (o) => e.onclick(o)),
        onDblclick: t[73] || (t[73] = (o) => e.ondblclick()),
        onMouseenter: t[74] || (t[74] = (o) => e.onenter(o)),
        onMouseleave: t[75] || (t[75] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-40",
        style: C({ display: n.config.displayDep["FR-40"] }),
        d: "m243 684-12 6h-3l-6 34-8 32-3 12-2 9-6 9 11 5h9l6-5 4 4-2 2 2 1 1-2h9l4-4 9 1 3-2h5l1 2 5-2 3 3 6-1 7-2 1 1 10 1 5-3-2-5 2-7 4-4-1-7 3-3-5-7 4-4 4-1 4 2 5-5 1 6 2 2 4-1v-4l1-3-1-2 1-7 4-4-2-3h-4l-5-2-7 1-2-8-4-6h-2l1 6v2l-7 1-6-3-2-8-4-5h-3l-1-3-3-2-6-2 2-2v-2l-2-2-3-1h-6l-4 4h-3l-4-3-6 3-3-2 2-3 1-5z",
        onClick: t[76] || (t[76] = (o) => e.onclick(o)),
        onDblclick: t[77] || (t[77] = (o) => e.ondblclick()),
        onMouseenter: t[78] || (t[78] = (o) => e.onenter(o)),
        onMouseleave: t[79] || (t[79] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-33",
        style: C({ display: n.config.displayDep["FR-33"] }),
        d: "m245 575-6 9-2 30-4 30-4 24v6l3-8 5-6 7 6 1 2 2 3-9 1-2-3-3 2-1 5-4 6v8h3l11-6 7 2-1 4-2 4 3 1 6-2 4 3h3l3-4 7-1 2 2 2 2v2l-1 2 6 2 3 2v3h4l4 5 2 8 6 2h6v-8h2l3 5 6-1 3-3-1-3-2-2 1-4h3l4-2-2-4-1-4 3-5 5-8 4-4 3-1v-4h-3l-2-4 1-3 5-1 3-1 4-1-1-7 4-2-5-3-4 5h-11l-1-2-4-2 3-3v-4l-1-2v-1l3-3 1-5 2-6-2-3h-4l-2-2-1 4-4-2-5 2-4-1-9-8h-5l-1-12-10-1v-5l-2 1h-10v3l3 10v11l-1 2-2-8-5-20-19-17 1-7-4-1z",
        onClick: t[80] || (t[80] = (o) => e.onclick(o)),
        onDblclick: t[81] || (t[81] = (o) => e.ondblclick()),
        onMouseenter: t[82] || (t[82] = (o) => e.onenter(o)),
        onMouseleave: t[83] || (t[83] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-24",
        style: C({ display: n.config.displayDep["FR-24"] }),
        d: "m372 566-3 6h-6v9l-17 12v12l-7 7-3 3-7-1-4 7-1 2 1 3h4l2 3-2 5-1 6-3 2v2l1 1v4l-2 3 3 2 1 3 11-1 4-5 5 3-4 2 1 7 5 4 1 7 5 2 3-3h8l3-3h3v3h8l1-2h3l3 3v3l-3 1 1 2 4 1 4-4h4l3 3 5 2 1-1 3-3 1-6h7l6-8h-3v-4l6-1v-4l3-1 4-6-4-4v-4l3-2-3-5v-8h-8l-3-2 3-3-4-4 3-3-3-2v-5l7-6-4-3-2-6-8-1-2-2 5-2-2-3-8-1-2-7-11-1-3 3-2 1-3-4 1-4-2-4z",
        onClick: t[84] || (t[84] = (o) => e.onclick(o)),
        onDblclick: t[85] || (t[85] = (o) => e.ondblclick()),
        onMouseenter: t[86] || (t[86] = (o) => e.onenter(o)),
        onMouseleave: t[87] || (t[87] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-47",
        style: C({ display: n.config.displayDep["FR-47"] }),
        d: "M345 664h-4l-3 1-5 1-1 4 2 3 3 1v3l-3 1-3 4-6 8-2 5 1 5 1 3-4 2h-3l-1 4 3 2v3l-3 3-5 1v1l2 8 7-1 5 2h4l2 3-4 4-1 7 1 2 1-3 5 4 5-6 3 4 6-1 7-1 2-5 11-1 6 5 2-2 3-1-1-5 5-1 7-2-2-4 3-3 1-6-4-5 3-8 6 3 7-1-3-8-3-11h7l2-4-6-2-3-3h-4l-4 4-4-1-1-2 3-1v-3l-3-3-3-1-2 2h-7v-2h-2l-4 3h-8l-3 3-5-2-1-7-5-4z",
        onClick: t[88] || (t[88] = (o) => e.onclick(o)),
        onDblclick: t[89] || (t[89] = (o) => e.ondblclick()),
        onMouseenter: t[90] || (t[90] = (o) => e.onenter(o)),
        onMouseleave: t[91] || (t[91] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-46",
        style: C({ display: n.config.displayDep["FR-46"] }),
        d: "m441 634-7 4h-1l-3 2v4l4 4-4 6-3 1v4l-6 1v3l3 1-6 8h-8v6l-3 3-2 5h-7l3 11 3 7 4-1 1 2-3 3 2 4h3l3 4h3l2-3 1 1v3l1 4h7l5-5 3-1 1 2 2 4h3l1-7 5 1 3-4 6 1 8-4v1l2-2-3-5-1-7 4-3h2l6-6h3l1-2h7l2-2 1-2-3-1 2-6-5-2 5-10-6-5-2-13-6-2-4 4-2-3-6 6h-4l-8-10z",
        onClick: t[92] || (t[92] = (o) => e.onclick(o)),
        onDblclick: t[93] || (t[93] = (o) => e.ondblclick()),
        onMouseenter: t[94] || (t[94] = (o) => e.onenter(o)),
        onMouseleave: t[95] || (t[95] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-09",
        style: C({ display: n.config.displayDep["FR-09"] }),
        d: "m422 817-2 2-1 1 5 4 1 2-1 2-8 1-2 3v1l3 1 2 2-2 3h-2l-4-3-4-2-5 1-7 4v7l2 1-1 5-8 2-4 4v7l2 1-3 3 1 1 11 3h5l7 7h15l6 9 6-2 15 2 1 7 12-2 4-4 6-2 1-3 14-1-8-9-7 3-12-9 3-4h9l-1-9v-6l-2-13-17-8v-3l-3-4-3 1-4 1-7-4h-2l3 4-1 2h-6l-1-4-3-5z",
        onClick: t[96] || (t[96] = (o) => e.onclick(o)),
        onDblclick: t[97] || (t[97] = (o) => e.ondblclick()),
        onMouseenter: t[98] || (t[98] = (o) => e.onenter(o)),
        onMouseleave: t[99] || (t[99] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-32",
        style: C({ display: n.config.displayDep["FR-32"] }),
        d: "m368 735-11 1-2 5-7 1-6 1-3-4-5 6-5-4-2 6v4l-4 1-2-2-1-6-5 5-4-2-4 1-4 4 5 8-3 2 1 7-4 4-2 7 3 5 9 1 3-2h6v6l4 2 4 1 2 5 1 1-1 4-1 1 4 2v3h5l1-1h5l1 3h5l1 3h9l6 3 1-1 4-2 6-8 12 1 5 3 2-2 3-8 3-7 7-3 3-2-1-2-3-1-2-3h-2l-4-4v-3l-6-6-1-3-3 1-1-2 2-3-3-3v-4l-2-3h-7v-4l4-3v-4l4-1-2-2-3 2h-5l-2-2h-1l-1 2z",
        onClick: t[100] || (t[100] = (o) => e.onclick(o)),
        onDblclick: t[101] || (t[101] = (o) => e.ondblclick()),
        onMouseenter: t[102] || (t[102] = (o) => e.onenter(o)),
        onMouseleave: t[103] || (t[103] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-31",
        style: C({ display: n.config.displayDep["FR-31"] }),
        d: "m437 754-5 2-2 3-2-2-4-1v3l-3 1 4 2-3 4-8 2-3-4h-4l-2 1h-10l-1 1 1 3 6 6v3l4 4h2l2 3 3 1 1 2-3 2-7 3-3 7-3 8-2 2-5-3-12-1-7 8-3 2-2 4-3 3v3l-4 1-3 6-1 3 6 4 1 4-2 4 4-2 2 2 2 7-5 2v4l-2 2-3-2h-4l1 20 14 1 1-18 5 1 8 4 3-3-2-1v-7l4-4 8-2 1-5-2-1v-7l7-4 5-1 4 2 4 3h2l2-3-2-2-3-1v-1l2-3 8-1 1-2-1-2-5-4 1-1 2-2h3l3 5 1 4h6l1-3-3-3h2l7 4 4-1 3-1-1-1 5-2 1-5 6-3-2-4 5-4 3 4 7-2h2v-7h-4l-5-1-4-5-2-3-8-3-2-3 2-1v-4l-2-2-4-6v-4l-1-1-4-4-2-5z",
        onClick: t[104] || (t[104] = (o) => e.onclick(o)),
        onDblclick: t[105] || (t[105] = (o) => e.ondblclick()),
        onMouseenter: t[106] || (t[106] = (o) => e.onenter(o)),
        onMouseleave: t[107] || (t[107] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-82",
        style: C({ display: n.config.displayDep["FR-82"] }),
        d: "m391 703-3 8 4 5-1 6-3 3 2 4-7 2-5 1 1 5-3 1 2 2h5l3-2 2 2-4 1v4l-4 3v4h7l2 3v4l3 3-2 3 1 2 4-2h10l2-1h4l3 4 8-2 3-4-4-2 3-1v-3l4 1 2 2 2-3 5-2 2 1 2-3-3-3h6l2-4 4-4h-4l2-5 11-2 4-2 5-2 2-2-2-5 3-6h-6v-8l-8 3-5-1-4 4-5-1-1 7h-3l-1-4-1-2-3 1-6 5h-7l-1-4v-4l-3 3h-3l-3-4h-3l-2-4 3-3v-2h-5v2l-7 1z",
        onClick: t[108] || (t[108] = (o) => e.onclick(o)),
        onDblclick: t[109] || (t[109] = (o) => e.ondblclick()),
        onMouseenter: t[110] || (t[110] = (o) => e.onenter(o)),
        onMouseleave: t[111] || (t[111] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-12",
        style: C({ display: n.config.displayDep["FR-12"] }),
        d: "m529 645-11 9v9h-2l-1 8-3 1-2 4h-11l-1-1h-5l-3 5h-1l-1 2-2 2h-7l-1 2h-3l-6 6h-2l-4 3 1 7 3 5-2 2v8h5l-3 6 3 6 3-2 1 3 4-4h6l7 4 10 2 4 7 6 2 3 8-1 3 4 7v3l7 9 6 3 4-1 2-3 3 1 6 4h10l-1-11v-3h3l6 3h5l-1-6 3-3 7-1v-5l6-3-1-7h-6l-5-1-1-4 4-1v-5l4-4-3-1-9 1 1-4-6-2-2-13v-8l-5-4 1-7-11-13-1-10h-4l-1-11-8 1v-6z",
        onClick: t[112] || (t[112] = (o) => e.onclick(o)),
        onDblclick: t[113] || (t[113] = (o) => e.ondblclick()),
        onMouseenter: t[114] || (t[114] = (o) => e.onenter(o)),
        onMouseleave: t[115] || (t[115] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-81",
        style: C({ display: n.config.displayDep["FR-81"] }),
        d: "M484 726h-6l-4 4-1-3-3 2-1-1-1 2-5 2-5 2-11 2-1 5h4l-4 4-2 4h-6l3 3-2 3 1 1 1 4 4 5 1 1 1 4 3 5 3 3v4l-3 1 2 3 8 4 2 2 4 5 5 1h4v7l2-1v3h7l6 2 1-7h3l11 2h11l8-2 2-7-6-5 2-5 3-5 5 4 13-5 2-4-6-4-3-1-2 3-4 1-6-3-7-9v-4l-4-6 1-3-3-7-6-3-4-7-10-2z",
        onClick: t[116] || (t[116] = (o) => e.onclick(o)),
        onDblclick: t[117] || (t[117] = (o) => e.ondblclick()),
        onMouseenter: t[118] || (t[118] = (o) => e.onenter(o)),
        onMouseleave: t[119] || (t[119] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-01",
        style: C({ display: n.config.displayDep["FR-01"] }),
        d: "M692 478h-4l-2 5-7 26-1 3-1 8-2 3v12l-1 3 7 4h3l4 4 1 6 5-1 7 2v-1h4l5 4 4-2 3-7 2-3 3 1 3 2 2 5 14 18 5-3v-7h5v-12l3-2v-11l1 1v-4l-2-4 1-10 4 2 2-3 3-1 4-3h-4v-7l4-3h7v-4l-2-1 5-7-1-2-6-4-15 17h-10v-5l-6-2-7 7-5 1v-5l-5-2-7-10-7-3-2-5h-3l-4 2-3 1z",
        onClick: t[120] || (t[120] = (o) => e.onclick(o)),
        onDblclick: t[121] || (t[121] = (o) => e.ondblclick()),
        onMouseenter: t[122] || (t[122] = (o) => e.onenter(o)),
        onMouseleave: t[123] || (t[123] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-38",
        style: C({ display: n.config.displayDep["FR-38"] }),
        d: "m719 544-2 3-3 7-4 2-5-4h-4v5l5 4-8 10-10 3-8 2 5 5 1 3-8 4v11h-1l2 5 7 2 4-2 5-3 7 5h6l3 6-1 3v6l-1 6v1h3l6 2 9 2 3-2 2-3h1v29l2 2h5l5 3 4 3h3l2 2 7 1v-1l-3-2v-4h10l2-3-1-3 4-4 4 2 4-4 9 1 2-3h7v-8l-3-1-1-5h-8l-1-2 2-8 2-2-2-3-4-2-2 2 1-3v-3l-3-3 1-8 4-2-1-5-7-7h-3l-2 3-5-7-2 1-3 5 2 3-1 1-3-2-10-2-4-8v-3l-4-5-1-2-14-18-2-5-3-2z",
        onClick: t[124] || (t[124] = (o) => e.onclick(o)),
        onDblclick: t[125] || (t[125] = (o) => e.ondblclick()),
        onMouseenter: t[126] || (t[126] = (o) => e.onenter(o)),
        onMouseleave: t[127] || (t[127] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-74",
        style: C({ display: n.config.displayDep["FR-74"] }),
        d: "m808 484-8 2-8 6-2-3h-4l-4 8 1 3 4 4-8 4-4 5h-8l-4 3-4 1-1 3-4-2-1 10 2 4v4l3 2v10l7 2 3 5h6l2-2h3l5 6 2 2 6-1 2-3 2-7 3-2 3-8 4-3 2 1 1 2-2 3 4 4h5l4 6-1 2 4-3 3-3 2 1v-7l12-5 2-3-1-8-8-8-3 1v-9l-6-3-1-3 4-4v-5l-6-7v-5z",
        onClick: t[128] || (t[128] = (o) => e.onclick(o)),
        onDblclick: t[129] || (t[129] = (o) => e.ondblclick()),
        onMouseenter: t[130] || (t[130] = (o) => e.onenter(o)),
        onMouseleave: t[131] || (t[131] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-42",
        style: C({ display: n.config.displayDep["FR-42"] }),
        d: "m611 506-6 1-1 4 2 5 1 21h-9v3l6 5-3 3-2 8 5 6 4 9 9 6 3 12-6 7 1 4 10 3 8-6h3l12 5-1 6h6l5 5h3l6-2 2-7 9-5v-11h1l-5-1-3 2-4-2 4-5-1-4-12-2-10-9v-3l2-2v-3l-3-2 3-3v-5l-5-4v-5l-3-3v-4l-2-5 3-3v-7h7l2-2-2-4v-4l-2-1-1 7h-4l-3 3-2-2-12-2-4 3h-3l-1-3-5-1-1-5z",
        onClick: t[132] || (t[132] = (o) => e.onclick(o)),
        onDblclick: t[133] || (t[133] = (o) => e.ondblclick()),
        onMouseenter: t[134] || (t[134] = (o) => e.onenter(o)),
        onMouseleave: t[135] || (t[135] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-69",
        style: C({ display: n.config.displayDep["FR-69"] }),
        d: "M671 501h-4l-3 4-2-3-4 3-4-3h-4l-1 1-1 4 2 2v3l2 4-1 2h-8v7l-3 3 2 6v3l3 3v5l5 4v5l-3 4 3 1v3l-2 2v3l10 9 12 2 1 4-4 4 4 2 3-1 5 1 7-4-1-3-5-5 8-2 10-3 8-10-5-4v-4l-7-2-5 1-1-6-4-4h-3l-7-4 1-3v-12l2-3 1-8-1 2h-3l-1-7z",
        onClick: t[136] || (t[136] = (o) => e.onclick(o)),
        onDblclick: t[137] || (t[137] = (o) => e.ondblclick()),
        onMouseenter: t[138] || (t[138] = (o) => e.onenter(o)),
        onMouseleave: t[139] || (t[139] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-73",
        style: C({ display: n.config.displayDep["FR-73"] }),
        d: "M754 535v11l-3 2v12h-5v7l-5 3 1 2 4 5v3l5 8 9 2 3 2 1-1-2-3 3-5 2-1 5 7 2-3h3l7 7 1 5-4 2-1 8 3 3v3l-1 3 2-2 4 2 2 3 7-1 2 2 1 6 6-1 1-6 3-1h7l11-4 4 2h4v-4l5-3 2-2 9-3 1-7-1-2 5-9-5-2-2-5-9-6s1-11-1-13c-2 0-7 1-7 1l-5-7v-5l-2-1-3 3-4 3 1-2-4-6h-5l-4-4 2-3-1-2-3-1-3 3-3 8-3 2-2 7-2 3-6 1-2-2-5-6h-3l-2 2h-6l-3-5-7-2v-10z",
        onClick: t[140] || (t[140] = (o) => e.onclick(o)),
        onDblclick: t[141] || (t[141] = (o) => e.ondblclick()),
        onMouseenter: t[142] || (t[142] = (o) => e.onenter(o)),
        onMouseleave: t[143] || (t[143] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-07",
        style: C({ display: n.config.displayDep["FR-07"] }),
        d: "m677 599-8 5-2 7-6 2h-3l-2 9-5 2-2 4 1 5 1 2h-6v7h-5l-3 9h-9l-9 7-6 8 1 2 3 13 6 6-1 8 8 5v10l4-2 8 6 4 1 1-7 5-1 2 5h5l1-5 12 6 2-4 5-1v-7l-1-2h-2v-3l2-3-2-3 1-7 4-5v-8l-1-9 3-1 1-4 3-7 2-5-3-8-2-6-3-11v-15h-1z",
        onClick: t[144] || (t[144] = (o) => e.onclick(o)),
        onDblclick: t[145] || (t[145] = (o) => e.ondblclick()),
        onMouseenter: t[146] || (t[146] = (o) => e.onenter(o)),
        onMouseleave: t[147] || (t[147] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-26",
        style: C({ display: n.config.displayDep["FR-26"] }),
        d: "m695 601-5 3-4 2-5-2v15l3 11 2 6 3 8-2 5-3 7-1 4-4 1 2 9v8l-4 5-1 7 1 3-1 3v3h2l1 2v7h5l2 2-1 7 1 2 5-5 5-1 1-2-6-1-1-7 4-6h5l5 5-5 6 1 3 8 1 4-4-2 5v4l8 1 10 1 2 4 5 5h5l3-3 2-6 3 3 2 3 1-14h-3l-2-5-13-3-1-6 4-3-4-3 1-3h6l5 3 4-5-4-3v-5l3-6 7-1 6-3 1-1-7-1-2-2h-3l-4-3-5-3h-5l-2-2v-29h-1l-2 3-3 2-9-2-6-2-3 1v-2l1-6v-5l1-4-4-6h-5z",
        onClick: t[148] || (t[148] = (o) => e.onclick(o)),
        onDblclick: t[149] || (t[149] = (o) => e.ondblclick()),
        onMouseenter: t[150] || (t[150] = (o) => e.onenter(o)),
        onMouseleave: t[151] || (t[151] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-17",
        style: C({ display: n.config.displayDep["FR-17"] }),
        d: "m260 492-5 1-11 6 3 3-6 5-1 3-5 1-3-3-7-1-1-4-4-3-6 3 3 5h5l6 4 3 3 8-1 2 4 4 1 2 5 4 1-1 4-4-1-1 3 3 4-2 8h-4v5l1 2h-5l-1-3 4-4-2-3-1-1-1-9-6-1-5-6-1 13 8 6 1 7 2 8v8l5-1 7 6 5 3 1 4 4 1 11 11 3 13h10l2-2 1 5 9 1 1 12h6l8 9h4l5-2 4 2 3-6 2-5-7-5-2-3-4-4-7 1-3-1v-2l4-1v-1l-3-1-2-1 5-4v-3l-2-2 1-2 1-4-3-3-2-3-4-5-3-1 2-4h-1l-1-8-3-2 4-2h6l2-2h4l1 2h4l3-1 1-7 3-11-3-3-1-4-5-3-7-4-8 1-5-7h-7l-6-5v-2l-4-5-1-5-5-4-7 3z",
        onClick: t[152] || (t[152] = (o) => e.onclick(o)),
        onDblclick: t[153] || (t[153] = (o) => e.ondblclick()),
        onMouseenter: t[154] || (t[154] = (o) => e.onenter(o)),
        onMouseleave: t[155] || (t[155] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-19",
        style: C({ display: n.config.displayDep["FR-19"] }),
        d: "m475 561-1 3-6 2-3 4h-2l-4-1-3 4-4 1-3 5h-4l-2 2h-7l-3 4-2-1-5 6-5-2-2 5 2 4 4 3-7 6v5l3 2-3 3 4 4-3 3 3 2h8v8l3 5h1l7-4 10 4 7 10h4l6-6 2 3 4-4 5 2 1 1 4-3-1-4-2-2 3-4h2l2-6 2-3-1-6 4-6 7-5v-9l3 1 4 4h4l2-2-2-5 2-6-1-6-2-3v-5l3-5-1-5-1-1-3 3h-7l-3 3h-4l-4-3-1-3h-9l-2-2z",
        onClick: t[156] || (t[156] = (o) => e.onclick(o)),
        onDblclick: t[157] || (t[157] = (o) => e.ondblclick()),
        onMouseenter: t[158] || (t[158] = (o) => e.onenter(o)),
        onMouseleave: t[159] || (t[159] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-23",
        style: C({ display: n.config.displayDep["FR-23"] }),
        d: "m457 487-2 6h-6l-2-1h-4l-3-2-7 7v6l-4 8 1 5 5 1 3 8 3 3-1 15 7-2 2 3-4 4v3l4 1 6-1 2-3h1l-1 5 6 2 4 4v2h-2v4l2 2 1-1 6-1 1-4h3l2 2h9l2 3 3 3h4l3-3h7l3-3-7-8-1-3 7-4 4-2 1-5 4-3-1-7-3-4-1-11-4-9-4-2-3-5-2 4-3-4v-4l-4-6-12 1-7-2z",
        onClick: t[160] || (t[160] = (o) => e.onclick(o)),
        onDblclick: t[161] || (t[161] = (o) => e.ondblclick()),
        onMouseenter: t[162] || (t[162] = (o) => e.onenter(o)),
        onMouseleave: t[163] || (t[163] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-87",
        style: C({ display: n.config.displayDep["FR-87"] }),
        d: "m427 493-3 3-10-1h-1l-6 1-5 4v4h-7l-5 6-3 2 3 3-1 9-2 4 3 3h5l1 5 1 4-7 1-3 1 1 9-5 3-3 1-2 5h-3l-1 6h8l2 4-1 4 3 4 2-1 3-3 11 1 2 7 8 1 2 3-5 2 2 2 8 1v2l2-4 5 1 5-6 2 1 3-4h7l2-2h4l3-5 4-1 3-4 4 1h2l2-3-2-2v-4h2v-2l-4-4-6-2 1-5h-1l-2 3-7 1-3-1v-3l4-4-2-4-7 3 1-15-3-3-3-8-5-1-1-5 4-8v-6 1z",
        onClick: t[164] || (t[164] = (o) => e.onclick(o)),
        onDblclick: t[165] || (t[165] = (o) => e.ondblclick()),
        onMouseenter: t[166] || (t[166] = (o) => e.onenter(o)),
        onMouseleave: t[167] || (t[167] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-86",
        style: C({ display: n.config.displayDep["FR-86"] }),
        d: "m333 409-7 8-2 3 1 8h3v4l2 6 2 5-3 2 1 2-1 3v1l3 3v2l-2 3-4 6 4 2 2 3-2 4v2l-3 4v3h2v8l3 2-2 3 1 2 3 4 2-3v-1l3-2 2 2v5l-2 3-2 5 2 4 6 2-1 3-5 1 4 6 7-1 5-1 6 3 2-2-1-5 3-2 3 4 2 3 7-3 3-3h6l3 2 1-7-3-3 3-2 5-6h7v-5l5-3 9-2 1-5-4-2-2-8h-6l-3-4-7-5 1-5v-7l-6-6-1-5-6-7-3-8-2-1-3-4-3 2 1 3-9 3h-11v-12l-9-2v-4l-6-2-2-5h-3z",
        onClick: t[168] || (t[168] = (o) => e.onclick(o)),
        onDblclick: t[169] || (t[169] = (o) => e.ondblclick()),
        onMouseenter: t[170] || (t[170] = (o) => e.onenter(o)),
        onMouseleave: t[171] || (t[171] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-16",
        style: C({ display: n.config.displayDep["FR-16"] }),
        d: "m365 519-3 2 1 5-2 2-6-3-5 1-7 1-4-6h-2l-6 4-5 1v2l-3 4 1 1-4 3-2 11-1 7-3 1h-4l-1-2h-4l-2 2h-6l-4 2 3 2 1 8h1l-2 3 3 2 4 4 2 4 3 3-1 4-1 2 2 2v3l-5 3 2 2 3 1v1l-4 1v2l3 1 7-1 4 4 2 3 7 5 2-2 7 1 3-3 7-7v-12l17-12v-9h6l3-6h2l1-6h3l2-5 3-1 5-3-1-9 3-1 7-1-1-4-1-5h-5l-3-3 2-4v-3l-3-1h-6l-3 3-7 3-2-3z",
        onClick: t[172] || (t[172] = (o) => e.onclick(o)),
        onDblclick: t[173] || (t[173] = (o) => e.ondblclick()),
        onMouseenter: t[174] || (t[174] = (o) => e.onenter(o)),
        onMouseleave: t[175] || (t[175] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-79",
        style: C({ display: n.config.displayDep["FR-79"] }),
        d: "m320 416-10 1-9 1-10 1v5l-5 3-11-2-7 3 3 5v4l9 8-2 4 6 7-3 3 4 6 1 10-2 3 2 4-2 5v3l3-3 3 4-5 3-1 2-5 1-4 2h-1l1 6 4 4v2l5 5h8l5 7 8-1 7 4 5 3 1 4 3 3 3-2-1-2 3-4v-2l5-1 6-4 7-1 1-3-6-2-2-4 2-5 2-3v-6l-2-1-3 1v2l-2 3-3-4-1-2 2-3-3-2v-8h-2v-3l3-4v-2l2-4-2-3-4-2 4-6 2-3v-2l-3-3v-1l1-3-1-2 3-2-2-5-2-6v-4h-3l-1-8v1l-3-2z",
        onClick: t[176] || (t[176] = (o) => e.onclick(o)),
        onDblclick: t[177] || (t[177] = (o) => e.ondblclick()),
        onMouseenter: t[178] || (t[178] = (o) => e.onenter(o)),
        onMouseleave: t[179] || (t[179] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-22",
        style: C({ display: n.config.displayDep["FR-22"] }),
        d: "m113 220-3 3-8 1-2 2-6-4-7 5 2 4-5 7-2 9 5 1-1 4 3 2-2 3-3 1 1 4 4 1-4 1v5l3 3v11l-1 2 1 5 6 1v3l4 1 3-2 2 2 7 2 5-3 2-3h4l6 5 5-1 4 4h2l2 3h5l1-2 2 4 4 1 6-3v-4l4-1h3l3 5 7 1 4-4 4-9 5-2 2-3 3 2 6-1 2-16 1-7-1-4-3-1-2-11-3 3-7-1v4l-5 1v-5l-4-1-2 2v-7l-4 4-7-2-2 5-13 7v4h-3v-7l-8-4 1-6-7-5v-6l-5-1v-6l-4-1 1-4h-8l-1 4z",
        onClick: t[180] || (t[180] = (o) => e.onclick(o)),
        onDblclick: t[181] || (t[181] = (o) => e.ondblclick()),
        onMouseenter: t[182] || (t[182] = (o) => e.onenter(o)),
        onMouseleave: t[183] || (t[183] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-85",
        style: C({ display: n.config.displayDep["FR-85"] }),
        d: "m240 417-2 3h-6l3 3-2 6-6 2-2-2 1-6-1-3h-4l-2 2 1 9 3 4-3 3-5-1-7-2-2-6h-5l-6-3-2-4-7-4-10 14-1 9 11 10v4h3l7 20 7 4 8 7h8l3 7h8l4 6 8 4v-6l2 2 11-6 5-1 2 6 7-3 6 4 4-2 5-1 1-2 5-3-3-4-3 3v-3l2-5-2-4 2-3-1-10-4-6 3-3-6-7 2-4-9-8v-4l-3-5-5-4h-9l-3-2-4-1-5-4z",
        onClick: t[184] || (t[184] = (o) => e.onclick(o)),
        onDblclick: t[185] || (t[185] = (o) => e.ondblclick()),
        onMouseenter: t[186] || (t[186] = (o) => e.onenter(o)),
        onMouseleave: t[187] || (t[187] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-50",
        style: C({ display: n.config.displayDep["FR-50"] }),
        d: "m205 136-1 3 7 7v7l-3 4 2 2h1v7l2 6 8 9 2 9 2 2v13l4 9v10l-4 9 5 13 8 2v4l-3 2h-7l1 4 2 7 6 5 3 1 3-4h3l4-5 4 3h4l3 1v1l6 1 4-3 5 2 6-5 2-7v-3l1-3-4-4-9-6h-7l-7-9 6-2 2-5-3-2 3-3 2 2 5-3 3-4 1-5-2-4 2-2-3-4 3-4-3-3-2 4-5-3-7-6v-3l2-3v-3h-4v-8l-10-11 3-8h4l-3-9-16-1-8 6-9-6z",
        onClick: t[188] || (t[188] = (o) => e.onclick(o)),
        onDblclick: t[189] || (t[189] = (o) => e.ondblclick()),
        onMouseenter: t[190] || (t[190] = (o) => e.onenter(o)),
        onMouseleave: t[191] || (t[191] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-56",
        style: C({ display: n.config.displayDep["FR-56"] }),
        d: "m88 289-6 3h-4l-5 3v3l3 7 1 5 10 2 4 4 2-3 3 4-2 2v5h-3l-2 4h-4l-2 7 4 6 6 2 2-4-1 4 5 2 7 7 2 4-1 5-1 4 5 4 2-3-2-3v-6l4 1 2-5 1 3 4 4 3-4-3-5 4 6 5-1-1-3 5 2 4 4-2 3-5-2-5-2-3 3 4 2 3 5 20-2 5 1-2 2v4h2l3-3 2 2h6l7-4 10-3 1-11 2-1-4-7 3-3-1-1-1-2 3-1 3-4-1-3h-3l-1-4 2-3-3-6-4-2h-5l-2-1v-2l3-2 1-6-1-4-1 1h-7l-3-6h-3l-4 1v4l-6 4-4-2-2-4-2 2h-4l-2-3h-2l-4-4-5 1-6-5-5 1-1 3-6 3-7-3-1-2-3 2h-4v-3l-6-2z",
        onClick: t[192] || (t[192] = (o) => e.onclick(o)),
        onDblclick: t[193] || (t[193] = (o) => e.ondblclick()),
        onMouseenter: t[194] || (t[194] = (o) => e.onenter(o)),
        onMouseleave: t[195] || (t[195] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-29",
        style: C({ display: n.config.displayDep["FR-29"] }),
        d: "m60 231-5 4-4-2-8 1-1 4-5 1-1-4-8 1v3h-6l-2-2-3 2-1 4H7l-6 6 5 4-6 4 2 4-2 7 6 1 2-2 1 1 14-1 9-7-8 8 1 3 7-3-1 5h7v3l-8-1-7-2-9-3-5 5 7 3-1 9 2-1 4-6 8 4 3 1 2 5-2 4h-9l-8 1-12 1-2 3 3 2h4l4 3 4-1 8 9 2 9-3 5 8 2h8l2-4-4-4 4 1h3l6 3h3v-7l2 7 5 7 10 1v-2l2 3 7 1h4l1 1 1-7h4l3-4h2l1-5 1-2-3-3-2 2-4-4-9-1-2-6-3-7v-2l5-4h4l6-3-1-4 1-2v-11l-3-3v-5l4-1-4-1-1-4 3-1 2-3-3-2 1-4-5-1 2-9-6-4-10 1v7h-3v-3h-5z",
        onClick: t[196] || (t[196] = (o) => e.onclick(o)),
        onDblclick: t[197] || (t[197] = (o) => e.ondblclick()),
        onMouseenter: t[198] || (t[198] = (o) => e.onenter(o)),
        onMouseleave: t[199] || (t[199] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-35",
        style: C({ display: n.config.displayDep["FR-35"] }),
        d: "m199 244-4 3 3 12 3 1 1 3-1 7-2 16-6 1-3-2-2 3-5 2-4 9-3 3 1 3-1 6-3 3v2l2 1h5l5 2 3 6-3 3 1 4h4v4l-3 3-3 2 2 1v2l-3 2 4 7 7-3 22-2 2-4 3-3 8-1 1-4h5l3 5 8 2 1-3 2-7 5-11 2-2 6 1v-10l-2-2v-11l-1-3v-6l3-4v-7l-2-1 1-11-3-1h-4l-4-3-4 5h-3l-3 4h-3l-6-6-2-7-1-4h-18l-7-4 5-6z",
        onClick: t[200] || (t[200] = (o) => e.onclick(o)),
        onDblclick: t[201] || (t[201] = (o) => e.ondblclick()),
        onMouseenter: t[202] || (t[202] = (o) => e.onenter(o)),
        onMouseleave: t[203] || (t[203] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-44",
        style: C({ display: n.config.displayDep["FR-44"] }),
        d: "m230 336-1 4-8 1-3 4-1 3-23 2-9 5-1 10-10 4-7 3h-5l-3-2-3 3h-1l1 1-6 7 1 1 2 3-4 5 4 2 7 2v-3l4 5h7l5-5h6l-7 3 1 4 1 3-4 4h-4l1 5 7-1 10 9h-1l7 4 2 4 6 3h5l2 6 7 2 5 1 3-3-3-4-1-9 2-2h4l1 3-1 6 2 2 6-2 2-6-3-3h6l2-3h2l5 4 3 1v-4l-2-4h-6l2-2v-3l3-1 1-4-1-1v-5h-4l-4-5v-3l4-3 8-1h11l4-2-1-7-6-5h-6l-2-1v-6l4-4-3-4-3-6-3-3v-4l-1-1-7-2-3-4z",
        onClick: t[204] || (t[204] = (o) => e.onclick(o)),
        onDblclick: t[205] || (t[205] = (o) => e.ondblclick()),
        onMouseenter: t[206] || (t[206] = (o) => e.onenter(o)),
        onMouseleave: t[207] || (t[207] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-49",
        style: C({ display: n.config.displayDep["FR-49"] }),
        d: "m247 341-1 2h-1v5l4 2 3 7 3 4-4 4v6l2 1 6-1 6 5 1 8-4 2h-11l-8 1-4 2v4l4 5h4v5l2 1-2 4-3 1v3l-2 2h6l3 4v4l3 2h9l5 4 7-3 11 2 5-3v-5l10-1 9-1 10-1 1 3 3 2 2-4 7-8h3l4-15 5-6v-8l4-5v-2l-2-2 1-3-5-1-15-10-14-4h-5v-4l-4-2h-3l-6-3-5 5h-9l-4-2-11-4-2 3-6-3h-6z",
        onClick: t[208] || (t[208] = (o) => e.onclick(o)),
        onDblclick: t[209] || (t[209] = (o) => e.ondblclick()),
        onMouseenter: t[210] || (t[210] = (o) => e.onenter(o)),
        onMouseleave: t[211] || (t[211] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-72",
        style: C({ display: n.config.displayDep["FR-72"] }),
        d: "M358 273h-9l-10 9h-5l-7 2-2 4-1 7 1 5-6 5-1 3 1 3-2 3 1 2h-6l-1 3 3 6-1 2-2 2-5 1-1 1 2 2v11l-1 3 3 2v4h5l14 4 15 10 5 1 3-4 7 5h4l-2-8 4 3 2-3 11-3-2-5 3-3 5-2 5-6v-7h4l1-5 1-8-4-3 3-5 4-6-5-3-5-1-5-7h-1l-1 3v-2h-7l-4-6-6-2-2-13z",
        onClick: t[212] || (t[212] = (o) => e.onclick(o)),
        onDblclick: t[213] || (t[213] = (o) => e.ondblclick()),
        onMouseenter: t[214] || (t[214] = (o) => e.onenter(o)),
        onMouseleave: t[215] || (t[215] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-53",
        style: C({ display: n.config.displayDep["FR-53"] }),
        d: "M321 263h-3l-2 4-5 2-10-1-10 5-3-2-6 4-4-3-2-5-6-2-3 3-6-1-1 10 2 1v7l-3 4v6l1 3v11l2 2v10l-6-1-2 2-5 11-2 7-1 1 7 1h5l6 4 3-3 10 4 5 2h9l4-5 7 3h4l1-3v-11l-2-2 1-2h5l2-2 1-2-3-6 1-3h6l-1-2 2-4-1-2 1-3 6-5-1-4 1-8 2-4 7-2h-1l-2-6-5-2-1-8z",
        onClick: t[216] || (t[216] = (o) => e.onclick(o)),
        onDblclick: t[217] || (t[217] = (o) => e.ondblclick()),
        onMouseenter: t[218] || (t[218] = (o) => e.onenter(o)),
        onMouseleave: t[219] || (t[219] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-14",
        style: C({ display: n.config.displayDep["FR-14"] }),
        d: "m359 173-9 2-13 8-16 6-12-7-30-4-7-4-10 3v4l-2 2v3l7 7 5 2 2-4 3 3-3 4 3 4-2 2 2 4-1 5-3 5-5 2-2-1-3 2 3 3-2 4-6 2 7 9h7l5 4 7-3 6-6 7 2 7-4 4-2 4 5 7-2 6 4 7-3 7-5 4-5h3l1 3h2l1-3 7-1 2 1 7-1 2-4-1-3-4-1v-3l3-2 1-4-2-8-5-7 4-2v-1l-4-1z",
        onClick: t[220] || (t[220] = (o) => e.onclick(o)),
        onDblclick: t[221] || (t[221] = (o) => e.ondblclick()),
        onMouseenter: t[222] || (t[222] = (o) => e.onenter(o)),
        onMouseleave: t[223] || (t[223] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-61",
        style: C({ display: n.config.displayDep["FR-61"] }),
        d: "m366 223-7 1-2-1-7 1-1 3h-2l-1-3h-3l-4 5-7 5-7 3-6-4-7 2-4-5-4 2-7 4-7-2-6 6-7 3 4 2 4 4-1 3v3l-2 7-6 6 2 4 4 3 6-4 3 2 10-5 10 1 5-2 2-4h3l4 3 1 8 5 2 2 6h6l10-9h9l3 4 2 13 6 2 4 6h7v2l1-4h1l6 8 3 1v-9l-2-3-1-3 6-3 5-1 4-5-1-13-8-7v-6l-6-4 2-4-2-5-5-2-3-3-2-5-10-1-3-4z",
        onClick: t[224] || (t[224] = (o) => e.onclick(o)),
        onDblclick: t[225] || (t[225] = (o) => e.ondblclick()),
        onMouseenter: t[226] || (t[226] = (o) => e.onenter(o)),
        onMouseleave: t[227] || (t[227] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-28",
        style: C({ display: n.config.displayDep["FR-28"] }),
        d: "m441 225-2 2v6l-8 4v5l-2 2h-9l-4-1-13 7h-5l-5 4 1 1v6l8 7v13l-3 5-6 1-5 3 1 3 2 3v9h1l5 3-2 3 4 2 5-1h4v1l-4 2 3 1h5l2 5 3 1 2 5 8 3 5-1 4-4 4 1 1-2v-3l2-1 3 2 3-2v-2l2-2 3 1 2 2 4-2h5l3-3 2-7h3l-1-7 3-3-1-2 1-1h-1l-1-9-1-2-1-4-7-2-3-4-1-7-5-1v-4l-6-4-2-6 2-4-2-3v-4l1-4-3-3-1-4z",
        onClick: t[228] || (t[228] = (o) => e.onclick(o)),
        onDblclick: t[229] || (t[229] = (o) => e.ondblclick()),
        onMouseenter: t[230] || (t[230] = (o) => e.onenter(o)),
        onMouseleave: t[231] || (t[231] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-89",
        style: C({ display: n.config.displayDep["FR-89"] }),
        d: "m572 283-3 3-14-1-6 3-3 6 3 3-4 5-4 4 7 6 2 6 4 5v6l-9 8 3 4v5l-6 4h-7l1 4 5 6 1 6 1 4-2 1 5 1h3l2-3h2l3 2-1 3 3 2h3l5 3 2-1 2 2 2-1 3-2 4 1 2-1v-6h1l1 3 4 3v4h6l8 7 5 1v-3l2-3 1 3-1 2 1 2 3-1h3v5l3 2 2-1 6-4v-1l-4-2v-4l4-1 1-2-1-2v-4l3-4 4-9 1-4 3-1v-1l-2-1v-3l5-3 1-5-2-3h-3l-1-1v-4l4-3v-3l-1-2-2 4-2-1-2-4-8 4-14-1-2-4-4-5v-7l-6-7-4 3-6-5 1-10-9-10h-5l-2-2z",
        onClick: t[232] || (t[232] = (o) => e.onclick(o)),
        onDblclick: t[233] || (t[233] = (o) => e.ondblclick()),
        onMouseenter: t[234] || (t[234] = (o) => e.onenter(o)),
        onMouseleave: t[235] || (t[235] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-70",
        style: C({ display: n.config.displayDep["FR-70"] }),
        d: "m766 317-6 1-2 3-3 3-3-3-1 1 1 2-4 2 1 3-3 2v5h-6v2l-5 1v5h4l-2 2-1 8h-3l-6 1-6-1-5 1v4l4 1 3 6 1 3-5 5-2 1-2 2 4 1 1 6h3l1 8 1 1v1l3 1 3 3h5l2-2h6l7-6h2l3-2 7 1 6-5 4-1 2-4 3-1 3-5 5-4 5-1 3 3 7-1v-4l3-1 2-3h4l3-3v-9l-1-6v-4l3-2 3-2-12-7-3-3-3-2-3 1-1 2-2 2h-2l-6-6h-7l-4 2-2 1-5-4v-4z",
        onClick: t[236] || (t[236] = (o) => e.onclick(o)),
        onDblclick: t[237] || (t[237] = (o) => e.ondblclick()),
        onMouseenter: t[238] || (t[238] = (o) => e.onenter(o)),
        onMouseleave: t[239] || (t[239] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-76",
        style: C({ display: n.config.displayDep["FR-76"] }),
        d: "m431 106-2 3-16 12-27 7-18 6-15 8-9 13-1 10 7 6 10 2h-1l8-1 4-4 3-1 4 6h5l2 4 8-1 9 6-5 2 4 3h2l3 5h4l1-3-3-2 9-3 9-1 2-6 5-4 8-1 10 5 5 1 1-3 3-5 1-2h-3v-6l-2-4 1-7 1-4h-2l1-4 4-4-4-6-1-7-16-15-2-4h-4z",
        onClick: t[240] || (t[240] = (o) => e.onclick(o)),
        onDblclick: t[241] || (t[241] = (o) => e.ondblclick()),
        onMouseenter: t[242] || (t[242] = (o) => e.onenter(o)),
        onMouseleave: t[243] || (t[243] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-27",
        style: C({ display: n.config.displayDep["FR-27"] }),
        d: "m374 167-3 1-4 4-8 1 1 14 4 1v1l-4 2 5 7 2 8-1 4-3 2v3l4 1 1 3-3 9 3 3 10 1 2 5 3 3 5 2 2 5-2 4 5 3 5-4h5l13-7 4 2h9l2-3v-5l8-4v-6l1-2v-1l2-2-3-1v-2l-2-3 2-2 10-3 2-4 2-8 3-4 1-4 3 2 2-1-1-3-1-8-4-3-5-1-10-5-8 1-5 3-2 7-9 1-9 3 3 2-1 3h-4l-3-5h-2l-4-3 5-2-9-6-8 1-2-4h-5z",
        onClick: t[244] || (t[244] = (o) => e.onclick(o)),
        onDblclick: t[245] || (t[245] = (o) => e.ondblclick()),
        onMouseenter: t[246] || (t[246] = (o) => e.onenter(o)),
        onMouseleave: t[247] || (t[247] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-37",
        style: C({ display: n.config.displayDep["FR-37"] }),
        d: "m376 356 1 2-11 3-2 3-4-3 2 8h-4l-7-5-4 7 2 2v2l-4 5 1 8-6 7-4 14 2 6 6 2v4l9 2v12h10l10-3-1-4 3-1 3 4 2 1 3 8 6 7 1 5 5 6 3-1 4-3 3-15 2-5 1-7 6-2 4 1 2 2 3-4 3-3v-3h3l1-3-3-4 1-2-2-2-6-8h-7l-2-3v-12l-3-8v-9l-4-1-4-3h-1l-4 3-2-2-1-3 3-2v-1l-1-1z",
        onClick: t[248] || (t[248] = (o) => e.onclick(o)),
        onDblclick: t[249] || (t[249] = (o) => e.ondblclick()),
        onMouseenter: t[250] || (t[250] = (o) => e.onenter(o)),
        onMouseleave: t[251] || (t[251] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-45",
        style: C({ display: n.config.displayDep["FR-45"] }),
        d: "m490 289-5 4-10 1-1 1 1 2-3 3 1 7h-3l-2 7-3 3h-5l-4 2-2-2-3-1-2 2v3l-3 1-3-2-2 1v3l-1 2h4v2l-2 4v2h2l2 2v2l-4 4 2 5v2l4 3h4l3 3 1 4 3 4 4-1 2-3h5l2 2h3l2-2h13l3 5 4 1 3 3h4l1-2h2l3 4h6l2 2 4 6 2 1h2v-5h3l2 3 2 1 4-1-1-1v-4l7-2-1-4-1-6-5-6-1-4h8l5-4v-5l-3-4 9-8v-6l-4-5-2-6-7-6-9 5v-3h-4l-1 3h-14l-4 2-3-2 6-4-1-7-4-2-4-5-9-1z",
        onClick: t[252] || (t[252] = (o) => e.onclick(o)),
        onDblclick: t[253] || (t[253] = (o) => e.ondblclick()),
        onMouseenter: t[254] || (t[254] = (o) => e.onenter(o)),
        onMouseleave: t[255] || (t[255] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-36",
        style: C({ display: n.config.displayDep["FR-36"] }),
        d: "m455 401-3 1h-4l-6 2-1 3-1-1h-6l-3 2-3 1-1 2 3 4-1 3h-3v3l-3 3-3 4-2-2-4-1-6 2-1 7-2 5-3 15-4 3-3 1h1v7l-1 5 7 5 3 4h6l2 8 4 2-1 6h-3 1l10 1 3-3 6 5 7-8 3 2h4l2 1h6l2-6 18 3 7 1h3l1-3 3-4v-3l-3-4 1-1v-5l2-2v-1l-3-2-1-4-5-3v-3l4-2v-2l-4-3-1-2 3-1-1-2 5-4-1-1h-3l-2-2v-2l2-3v-2l-4-6v-5l-2-1h-5l-4 1h-5l-2-2-1-2 4-3v-4l-5-4z",
        onClick: t[256] || (t[256] = (o) => e.onclick(o)),
        onDblclick: t[257] || (t[257] = (o) => e.ondblclick()),
        onMouseenter: t[258] || (t[258] = (o) => e.onenter(o)),
        onMouseleave: t[259] || (t[259] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-41",
        style: C({ display: n.config.displayDep["FR-41"] }),
        d: "m395 311-2 3-3 5 4 3-1 8-1 5h-4v7l-5 6-5 2-3 3 1 3 18 1 1 1v1l-3 2 1 3 2 2 4-3h1l4 3 4 1v9l3 7v13l2 3h7l6 9 1 1h1l3-1 3-2h6l1 1 1-3 6-2h4l3-1 3 3 5 4 5-1v-4l2-3h2l2 2 7-1 5-2-1-2-1-2v-3l3-6 5-2v-4l1-2-3-1-2-4-4-1-1-2 5-4 5-3-3-4h-13l-2 2h-3l-2-2h-5l-2 3-4 1-3-4-1-4-3-3h-4l-4-3v-2l-2-5 4-4v-2l-2-2h-2v-2l2-3v-3h-3l-5-1-4 4-5 1-8-2-2-6-3-1-2-4h-5l-3-2 4-2v-1h-4l-5 1z",
        onClick: t[260] || (t[260] = (o) => e.onclick(o)),
        onDblclick: t[261] || (t[261] = (o) => e.ondblclick()),
        onMouseenter: t[262] || (t[262] = (o) => e.onenter(o)),
        onMouseleave: t[263] || (t[263] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-18",
        style: C({ display: n.config.displayDep["FR-18"] }),
        d: "m493 363-5 3-5 4v2l5 1 2 4 3 1-1 2v4l-5 2-3 6v3l1 2 1 2-5 2-7 1-2-2h-2l-2 3v4l-5 1v4l-4 3 1 2 2 2h5l4-1h5l2 2v4l4 6v2l-2 3v2l2 2h3l1 1-5 4 1 2-3 1 1 2 4 3v2l-4 2v3l5 3 1 4 3 2v1l-2 2v5l-1 1 3 4v3l-3 4v3l8-1 2-4 4-5 9-2 5 1 5-4v-2l-2-2v-6l10-9 3 4 3-4h3l5-6h9v2l3-9-2-3v-5l1-9-4-4 1-9-4-7v-5l-6-5-2-5 4-4v-7l-4-4-4 1-1-1-3-3h-3v5h-2l-2-1-4-6-2-2h-6l-3-4h-2l-1 2h-4l-3-3-4-1z",
        onClick: t[264] || (t[264] = (o) => e.onclick(o)),
        onDblclick: t[265] || (t[265] = (o) => e.ondblclick()),
        onMouseenter: t[266] || (t[266] = (o) => e.onenter(o)),
        onMouseleave: t[267] || (t[267] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-21",
        style: C({ display: n.config.displayDep["FR-21"] }),
        d: "M655 320v5l-5 2h-12l1 3v3l-4 2v5l1 1h3l2 2-1 6-5 3v3l2 1v1l-3 1-1 4-4 8-3 5v4l1 2-1 2-4 1v4l4 2 1 3-1 4v3l2 3 5 1 2 4v1l-2 1v3h1l7 8 7-1 6 5 5 4v4l5 1 4 3 11-3 8-3h3l1-2h4l3 2 4-1 4-3 3 1v-1l3-1-1-2-1-2 2-3 6-3v-3l3-3 2-2-1-3 1-4 1-6h1v-2l-1-1-1-8h-3l-1-5-4-2 2-2 2-1 5-5-1-3-3-6-4-1-1 4-8 2-1-2-6-8-3 2h-4l-2-3-6 1v-7l-3-2 4-5-8-11-6-7-6-3z",
        onClick: t[268] || (t[268] = (o) => e.onclick(o)),
        onDblclick: t[269] || (t[269] = (o) => e.ondblclick()),
        onMouseenter: t[270] || (t[270] = (o) => e.onenter(o)),
        onMouseleave: t[271] || (t[271] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-58",
        style: C({ display: n.config.displayDep["FR-58"] }),
        d: "m551 369-2 3h-3l-5-1-5 1v4l5 5v7l-4 4 2 5 6 5v5l4 7-1 9 4 4-1 9v5l2 3-3 9v3l6 3 5 4 3-2 4-2 1 3h5l2-3 3 2 1 5 3-1 7-9 3 2 1 1 5-3h3l2 4h3l3-3h3l3-3 2-1 1-2 5 1 1-2-3-2v-2l4-2v-2l-4-2v-8l-2-1 2-3 1-1 2-3-2-1-2-3 3-4 4-2h5v-4l2-1v-1l-2-4-6-1-1-3v-3l1-4-1-2-6 4-2 1-3-2v-5h-3l-3 1-1-2 2-2-2-3-2 3v3h-5l-8-8h-6v-4l-4-3-1-3h-1v6l-2 1-4-1-3 2h-2l-2-1-2 1-5-3h-3l-3-2 1-3-3-2z",
        onClick: t[272] || (t[272] = (o) => e.onclick(o)),
        onDblclick: t[273] || (t[273] = (o) => e.ondblclick()),
        onMouseenter: t[274] || (t[274] = (o) => e.onenter(o)),
        onMouseleave: t[275] || (t[275] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-71",
        style: C({ display: n.config.displayDep["FR-71"] }),
        d: "M633 413v1h-5l-4 2-3 4 2 3 2 1-1 3-2 1-2 3 2 2v7l4 2v2l-4 2v2l3 2-1 2-5-1-1 2-2 1-3 3h-3l-3 3h-3l-2-4h-3l-5 3 7 13v5l1 2h7l2 3h5l3 4v14l-8 6h1l1 6 5 1 1 3h3l4-3 12 2 2 2 3-3h4l2-11 1-1h4l4 3 4-3 2 3 3-4h4l2 6 1 7h3l2-5 7-26 2-5h4l4 3 3-1 4-2h3l2 5 2 1 10-1 4-3-2-2-4-2-1-5 4-3 1-6-3-5-2-3 1-1v-4l-3-2v-3l8-1 1-3h-3l-2-2h-4l-3-6h-3v-4l-3-1-4 3-4 1-3-1-4-1-1 2h-3l-8 3-11 3-4-3-5-1v-4l-5-4-6-5-7 1-7-8z",
        onClick: t[276] || (t[276] = (o) => e.onclick(o)),
        onDblclick: t[277] || (t[277] = (o) => e.ondblclick()),
        onMouseenter: t[278] || (t[278] = (o) => e.onenter(o)),
        onMouseleave: t[279] || (t[279] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-39",
        style: C({ display: n.config.displayDep["FR-39"] }),
        d: "M725 394v1h-1l-1 6-1 4 1 3-2 2-3 3v3l-6 3-2 3 1 2 1 2-3 1v5h3l3 6h4l2 2h3l-1 3-8 1v3l3 2v4l-1 1 2 3 3 5-1 6-4 3 1 5 4 2 2 2-4 3-10 1 5 2 7 10 5 2v5l5-1 7-7 6 2v5h10l15-17v-8l6-6-4-2 1-2h-5v-3l3-3-1-2-2-4 7-2 2-4 1-4-5-5-4-1-8-2v-8l-1-5-6 1-10-4 1-3 3-6v-3l-2-4-5-3v-6h-4l-1 2h-5l-3-3z",
        onClick: t[280] || (t[280] = (o) => e.onclick(o)),
        onDblclick: t[281] || (t[281] = (o) => e.ondblclick()),
        onMouseenter: t[282] || (t[282] = (o) => e.onenter(o)),
        onMouseleave: t[283] || (t[283] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-51",
        style: C({ display: n.config.displayDep["FR-51"] }),
        d: "m607 176-4 2 1 4h-8l-7 5v9l5 3 2 4h-9v4l3 2-2 2-3 2 1 2h4l2 3-3 2-3 7-5 3-2 4-2 2 1 2-3 2-1 5 3 2 1 5-2 3 2 3h5v1h1l7 7 8-2 11-7h6l6-4 7-4h6l1 7 6 10h8l10-2 7 3 8-6 1-9 8-1v-6l-7-5v-3l2-5-2-2 2-5 4-2 3-9-6 1 4-4-3-8-2-5 3-3-2-1-1-2-3-3-4 4h-1l-2-2h-8l-2 2h-2l-3-5h-4l-2 1h-4l-6-5-4-1-2-2-7-5h-9v3l-2 1z",
        onClick: t[284] || (t[284] = (o) => e.onclick(o)),
        onDblclick: t[285] || (t[285] = (o) => e.ondblclick()),
        onMouseenter: t[286] || (t[286] = (o) => e.onenter(o)),
        onMouseleave: t[287] || (t[287] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-60",
        style: C({ display: n.config.displayDep["FR-60"] }),
        d: "m459 141-2 2-1 4h2l-1 4-1 7 2 4v6h3l-1 2-3 5-1 3 4 3 1 8 1 3-2 1-3-2-1 4 2 3 2 4 10 1 7-1 4-4 6 4 3 2 4-1 4-2 8 4 8 5 2 3 4-3 4 2 2 2 4-1 2-3 5 3 6-2 3 1 4-3 2-1h1l1-5-3-3-4-3-2 3-1 1-1-6 4-1-1-5h-4l2-4 6-1 2-9 4-2-5-3 2-3v-11l-1-9-8 1-5-1-9 3-9 8-6-3h-7l-5-5-9-3-13 1-3-2h-6l-5 1-2-1v-4l-1-1z",
        onClick: t[288] || (t[288] = (o) => e.onclick(o)),
        onDblclick: t[289] || (t[289] = (o) => e.ondblclick()),
        onMouseenter: t[290] || (t[290] = (o) => e.onenter(o)),
        onMouseleave: t[291] || (t[291] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-62",
        style: C({ display: n.config.displayDep["FR-62"] }),
        d: "m482 9-20 3-16 13v50l5 1 2 4 4-1 3-3 3 1 7 5 2-1 2 4 7 3v4l5 2 4-2 9-1 2 2 5-2 2 4-6 3v5l2 2h2l1-3 3-2 3 2 8 3h3v-4l5 3v3l-2 3 4-2 3-1 2 2v3l5-3h9l2-4-1-2h-7l-2-1 4-2h6l1-6 2-2v-3l-4-3h-5l-1-1 3-2 1-2-3-2-3-4v-2l5-3 1-2-4-2-2-4-6-1-7-2v-7l4-3-2-4h-3l-3 4-11-1-9-2-5-5v-5l4-1-4-3h-8l-4-12-8-12z",
        onClick: t[292] || (t[292] = (o) => e.onclick(o)),
        onDblclick: t[293] || (t[293] = (o) => e.ondblclick()),
        onMouseenter: t[294] || (t[294] = (o) => e.onenter(o)),
        onMouseleave: t[295] || (t[295] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-59",
        style: C({ display: n.config.displayDep["FR-59"] }),
        d: "m512 0-11 6-18 2h-2l8 12 4 12h8l4 3-4 1v5l5 5 9 2 11 1 3-4h3l2 4-4 3v7l7 2h6l2 5 4 2-1 2-5 2v3l3 4 3 2-1 2-3 2 1 1h5l4 3v3l-2 2-1 6h-6l-4 2h6l3 1 1 2-2 4 3 3 3 1 3-2h4l1 2h1l5-3 4 3 6-4h2l3 2 6-4 2 1 2 2h9v3l4-3h2l2 4 7 2 2-1h-1v-4l7-4-1-7-7-2 2-1v-5l5-4-1-3-12-9-20 1-2 4h-3l1-13-6-7-5 1-2-3-7 3-3-3h-5l-1-5-1-14-3-2v-2h-2l-1-4h-5l-9 3-4 5h-5l-2-3-1-4-4-4h-5l-2-4v-6l2-4-1-6z",
        onClick: t[296] || (t[296] = (o) => e.onclick(o)),
        onDblclick: t[297] || (t[297] = (o) => e.ondblclick()),
        onMouseenter: t[298] || (t[298] = (o) => e.onenter(o)),
        onMouseleave: t[299] || (t[299] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-02",
        style: C({ display: n.config.displayDep["FR-02"] }),
        d: "m591 107-6 5-3-3h-2l-6 4-4-3-5 3h-1l-1-2h-4l-3 2v5l-4 5v5l-3 3v5l2 7 2 13v11l-2 3 5 3-4 2-2 9-6 1-2 4h4l1 5-4 1 1 6 1-1 2-3 4 3 3 3-1 5 3 3 1 8 10 9 3 1 2 4 6 2 1-1 2-4 5-3 3-7 3-2-2-3h-4l-1-2 3-2 2-2-3-2v-4h9l-2-4-5-3v-9l7-6h8l-1-3 4-2 7 4 2-1v-12l1-4 1-5-4-3 1-3 6-1v-5l6-3 1-4-2-3 1-6 3-2-3-7 1-6h-7l-2 1-7-2-2-4h-2l-4 4-1-4h-8l-2-2z",
        onClick: t[300] || (t[300] = (o) => e.onclick(o)),
        onDblclick: t[301] || (t[301] = (o) => e.ondblclick()),
        onMouseenter: t[302] || (t[302] = (o) => e.onenter(o)),
        onMouseleave: t[303] || (t[303] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-80",
        style: C({ display: n.config.displayDep["FR-80"] }),
        d: "m446 75-1 12 8 7v4l-10-6-12 14 3 1h4l2 4 16 15 1 7 4 6-2 2h5l1 1v4l2 1 5-1h6l3 2 13-1 9 3 5 5h7l6 3 9-8 9-3 5 1 8-1-1-4-2-7v-4l3-4v-5l4-5v-5l-3-1-4-3h-8l-6 3v-3l-1-2-3 1-4 2 2-3v-3l-5-3v4h-3l-8-3-3-2-3 2-1 3h-2l-2-2v-5l6-4-2-3-5 2-2-2-9 1-4 2-5-2v-4l-7-3-2-4-2 1-7-5-3-1-3 3-4 1-2-4z",
        onClick: t[304] || (t[304] = (o) => e.onclick(o)),
        onDblclick: t[305] || (t[305] = (o) => e.ondblclick()),
        onMouseenter: t[306] || (t[306] = (o) => e.onenter(o)),
        onMouseleave: t[307] || (t[307] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-08",
        style: C({ display: n.config.displayDep["FR-08"] }),
        d: "m663 96-3 5-4 3v8l-4 3-8 2-4 2-5-4h-7l-1 7 3 6-3 3v5l1 3-1 4-6 3v5l-6 1-1 3 4 3-1 4-1 5v9h9l7 5 2 2 4 1 6 5h4l2-1h4l3 5h2l2-3 8 1 2 2h1l4-4 3 3v-2l5-2 2-2-2-4v-2l4-3 1-8-4-5 1-3 4-6 1 1h6l2 2 3-2 3-4h-3l-1-7-3-3-10-1-2-4-3-3-12-1-1-8 2-2v-3l-6-4 1-4 2-3-3-2 4-4v-6l-1-2h-6z",
        onClick: t[308] || (t[308] = (o) => e.onclick(o)),
        onDblclick: t[309] || (t[309] = (o) => e.ondblclick()),
        onMouseenter: t[310] || (t[310] = (o) => e.onenter(o)),
        onMouseleave: t[311] || (t[311] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-10",
        style: C({ display: n.config.displayDep["FR-10"] }),
        d: "m629 249-7 4-6 4h-6l-11 7-8 2-7-7h-1v1l-5 3v4l-3 3-2 8v5l2 2h4l10 10-2 10 7 5 4-3 5 7 1 7 4 5 2 4 14 1 8-4 2 4h2l2-4h12l5-2v-5h11l1 1-1-5-3-2 4-3 6-1 3-3-1-13-1-8-7-2-6-9v-6l2-4-3-1-10 2h-8l-6-10-1-7z",
        onClick: t[312] || (t[312] = (o) => e.onclick(o)),
        onDblclick: t[313] || (t[313] = (o) => e.ondblclick()),
        onMouseenter: t[314] || (t[314] = (o) => e.onenter(o)),
        onMouseleave: t[315] || (t[315] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-52",
        style: C({ display: n.config.displayDep["FR-52"] }),
        d: "m684 251-8 1-1 9-8 6-4-2-2 4v6l6 9 7 2 1 8 1 13-3 3-6 1-4 3 3 2 1 5 5 2 6 7 8 11-4 5 3 2v7l6-1 2 3h4l3-1 6 7 1 2 8-2 1-4v-4l5-1 6 1 6-1h3l1-8 2-2h-4v-5l5-1v-2h6v-5l3-2-1-3h1l-3-3-4 1v-7l-10-5 2-10 4-2-1-3-5-1-1-5h-5l-5-6-5-1-3-4 3-3-7-8-4-1-8-4-5-5-7-1z",
        onClick: t[316] || (t[316] = (o) => e.onclick(o)),
        onDblclick: t[317] || (t[317] = (o) => e.ondblclick()),
        onMouseenter: t[318] || (t[318] = (o) => e.onenter(o)),
        onMouseleave: t[319] || (t[319] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-67",
        style: C({ display: n.config.displayDep["FR-67"] }),
        d: "m872 200-7 2-3 5v6l-3 2h-2l-5-3-4 3h-4l-4-4-7-1-3-2-2-5-3 3-2 9-5 1v5l5 2 4 2-2 4 3 2 6-4 10 5-4 8v3l3 3-2 7-7 8-4-1 3 3-2 6 2 10 6 2v1h5l3 3 3 4h7l3 9 6 2v-1l9-18-1-11 5-14 1-12 9-7v-4l4-5h2l4-3-1-6 3-9 5-1-5-4-9-1-8-4-5 3-3-3z",
        onClick: t[320] || (t[320] = (o) => e.onclick(o)),
        onDblclick: t[321] || (t[321] = (o) => e.ondblclick()),
        onMouseenter: t[322] || (t[322] = (o) => e.onenter(o)),
        onMouseleave: t[323] || (t[323] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-54",
        style: C({ display: n.config.displayDep["FR-54"] }),
        d: "m726 156-4 4h-7l-2 2v5l2 3-1 2-1 3 1 1 2-1 1-3 4-1 6-1 3 2 1 3 1 3v3l2 2v2l-2 2v5l2 2v7l2 2 3 2-1 2 4 4-3 4v2l4 2v2h-4l-2 2v2l3 3-3 7-2 6 1 4v6l1 3h2l2 2h-4l-2 2v2l3 3v5l4-1h5v6h2l-2 2v2l3 1 3 3 12-1 2-4h6l2-2 3 2 3-1h5l4-1 4-3 2 2v-5l3-1 1 5h5l4 1h2l6-2 3-3 3-3 5-2 4-1-2-2h5l-5-2-6-4-5-4h-6l-7-4h-5v-2l-8-4-10-4h-4l-2-5-7-9h-7l-3-4h-6l1-6-8-4 1-5h4v-4l1-3-3-3 3-5-2-5-2-2-5-10 2-3v-5h-5l-7-7z",
        onClick: t[324] || (t[324] = (o) => e.onclick(o)),
        onDblclick: t[325] || (t[325] = (o) => e.ondblclick()),
        onMouseenter: t[326] || (t[326] = (o) => e.onenter(o)),
        onMouseleave: t[327] || (t[327] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-77",
        style: C({ display: n.config.displayDep["FR-77"] }),
        d: "m552 208-2 1-4 3-3-1-6 2-5-3-2 3h-4l-2-1-4-2-4 3v-1l-2 10 3 13v8l-3 8v4l-3 3 2 10-1 2-2 9 3 3-8 6v7l2 3 4 2 1 7-6 4 3 3 4-3h14l1-3h4v3l9-5 4-4 4-5-3-3 3-6 6-3 14 1 3-3h1v-6l2-7 3-3v-4l5-3v-2h-6l-1-3 2-3-1-5-3-2 1-5 3-2-1-2 1-1-6-2-2-4-3-1-10-9-1-8z",
        onClick: t[328] || (t[328] = (o) => e.onclick(o)),
        onDblclick: t[329] || (t[329] = (o) => e.ondblclick()),
        onMouseenter: t[330] || (t[330] = (o) => e.onenter(o)),
        onMouseleave: t[331] || (t[331] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-68",
        style: C({ display: n.config.displayDep["FR-68"] }),
        d: "M844 282h-5l-4 8-4 8 1 6-4 8-6 5v14l-4 4v1l1 2 6 1 6 5 2 2-1 4-2 4 1 4 5-1 1 4 2 8 4-1-1 4 3 2h13l7-5 1-8 3-5-5-5-2-6 3-4v-9l2-4v-8l3-4-4-5v-11l-5-2-4-9h-7l-3-4z",
        onClick: t[332] || (t[332] = (o) => e.onclick(o)),
        onDblclick: t[333] || (t[333] = (o) => e.ondblclick()),
        onMouseenter: t[334] || (t[334] = (o) => e.onenter(o)),
        onMouseleave: t[335] || (t[335] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-55",
        style: C({ display: n.config.displayDep["FR-55"] }),
        d: "m705 152-3 5-3 2-3-3h-5l-1-1-4 7-1 2 4 6-1 7-4 3v2l2 4-2 2-5 2 1 4 2 1-3 3 2 5 3 8-4 4 6-1-3 9-4 2-2 6 2 1-2 5v3l7 5 1 13 7 1 5 5 8 4 4 1 7 8-1 1 7-1v-3l7-1v-3h2v2l5-1 3-3h-1v-5l-4-3v-2l3-2h4l-2-2h-1l-2-3v-6l-1-4 2-6 3-7-3-3v-2l2-2h4v-2l-4-2v-2l3-4-4-4 1-2-3-2-2-2v-7l-2-2v-5l2-2v-2l-2-1v-4l-1-3-1-3-3-2-6 2h-4l-2 3-1 2-1-2 1-2 1-3-2-3v-4h-2l-1-7-3-3h-2z",
        onClick: t[336] || (t[336] = (o) => e.onclick(o)),
        onDblclick: t[337] || (t[337] = (o) => e.ondblclick()),
        onMouseenter: t[338] || (t[338] = (o) => e.onenter(o)),
        onMouseleave: t[339] || (t[339] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-57",
        style: C({ display: n.config.displayDep["FR-57"] }),
        d: "M765 160h-5l-4 4-1 1h-6l-2-2h-1v6l-2 2 5 10 2 2 2 5-3 5 3 3-1 3v4h-4v5l7 4v6h5l3 4h7l7 9 2 5h5l9 4 8 4v2h5l7 4h6l6 4 5 4 5 2 6-7 2-7-2-3-1-3 5-8-10-5-6 4-4-2 2-4-4-2-5-2v-5l5-1 2-9 3-3 2 5 4 2 7 1 3 4h4l4-3 5 3h2l3-2v-6l3-5-3-3-7-5-3-4-8 1-5 5h-13l-3-2c-.9-2-2.3-3.7-4-5h-1c-2 0-5-2-5-2l-5 2v4l-6 1-4-7-2-1v-5l-5-2-1-9-3-3-8-4h-3l-1 1h-4l-5-4z",
        onClick: t[340] || (t[340] = (o) => e.onclick(o)),
        onDblclick: t[341] || (t[341] = (o) => e.ondblclick()),
        onMouseenter: t[342] || (t[342] = (o) => e.onenter(o)),
        onMouseleave: t[343] || (t[343] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-88",
        style: C({ display: n.config.displayDep["FR-88"] }),
        d: "m832 262-4 1-5 2-3 4-3 2-6 2h-2l-4-1h-5l-1-5-3 1v5l-2-2-4 3-4 1h-5l-3 1-3-2-2 2h-6l-2 4-12 1-2-3-4-1v-2l2-2h-2v-6h-6l-2 1-3 3-5 2v-3h-2v3l-7 1v3l-7 1-2 3 3 3 5 1 5 6h5l1 5 5 1 1 3-4 2-2 10 10 5v7l4-1 3 3 3-2-1-2 1-1 3 3 4-3 1-3 6-1 2 1v4l5 4 2-1 4-2h7l6 6h2l2-2 1-2 3-1 3 2 3 3 12 6 4-4v-14l6-5 4-8-1-6 4-8 4-9-7-2-1-10 2-6z",
        onClick: t[344] || (t[344] = (o) => e.onclick(o)),
        onDblclick: t[345] || (t[345] = (o) => e.ondblclick()),
        onMouseenter: t[346] || (t[346] = (o) => e.onenter(o)),
        onMouseleave: t[347] || (t[347] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-91",
        style: C({ display: n.config.displayDep["FR-91"] }),
        d: "m491 244-3 2-4 1-1 4-5 3-1 4 3 4-4 5h-5l2 3-2 3-1 5 2 1v4l1 2 1 9 11-1 5-4 4 3 9 1 2 2v-7l8-6-3-3 2-9 1-2-2-10 3-3v-4l-4-2h-7l-3-2-3 1-6-3z",
        onClick: t[348] || (t[348] = (o) => e.onclick(o)),
        onDblclick: t[349] || (t[349] = (o) => e.ondblclick()),
        onMouseenter: t[350] || (t[350] = (o) => e.onenter(o)),
        onMouseleave: t[351] || (t[351] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-78",
        style: C({ display: n.config.displayDep["FR-78"] }),
        d: "m449 211-10 3-2 2 2 3v2l3 1-2 2v2l1-1 3 4 1 4 3 3-1 4v4l2 3-2 4 2 6 6 4v4h5l1 8 3 4 6 1 1-5 2-3-2-3h5l4-5-3-4 1-4 5-3 1-4 4-1 3-2v1-1l-3-3-2-6 3-7-1-5-7-4h-8l-9-6-6 2z",
        onClick: t[352] || (t[352] = (o) => e.onclick(o)),
        onDblclick: t[353] || (t[353] = (o) => e.ondblclick()),
        onMouseenter: t[354] || (t[354] = (o) => e.onenter(o)),
        onMouseleave: t[355] || (t[355] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-95",
        style: C({ display: n.config.displayDep["FR-95"] }),
        d: "m456 195-3 4-2 8-2 4 9 4 6-2 9 6h8l7 4 1 5h1l6-3 10-1 5-2 4-3 1-7-2-2-8-5-8-4-4 2-4 1-3-2-6-4-4 4-7 1-10-1-2-4z",
        onClick: t[356] || (t[356] = (o) => e.onclick(o)),
        onDblclick: t[357] || (t[357] = (o) => e.ondblclick()),
        onMouseenter: t[358] || (t[358] = (o) => e.onenter(o)),
        onMouseleave: t[359] || (t[359] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-93",
        style: C({ display: n.config.displayDep["FR-93"] }),
        d: "m515 219-4 3-5 2-10 1 1 1h1v3h-1v2h5l1 2 1 4 1-1 2-1h2l3 2 2 2 1 1h2v-5l-3-13z",
        onClick: t[360] || (t[360] = (o) => e.onclick(o)),
        onDblclick: t[361] || (t[361] = (o) => e.ondblclick()),
        onMouseenter: t[362] || (t[362] = (o) => e.onenter(o)),
        onMouseleave: t[363] || (t[363] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-75",
        style: C({ display: n.config.displayDep["FR-75"] }),
        d: "M502 231h-5l-2 1-1 1h-1l-2 2v2l3 1 4 2h3l2-1 4 1v-3h-2v1h-2l1-1-1-4z",
        onClick: t[364] || (t[364] = (o) => e.onclick(o)),
        onDblclick: t[365] || (t[365] = (o) => e.ondblclick()),
        onMouseenter: t[366] || (t[366] = (o) => e.onenter(o)),
        onMouseleave: t[367] || (t[367] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-92",
        style: C({ display: n.config.displayDep["FR-92"] }),
        d: "m496 225-6 3h-1l-3 7 2 6 3 4 5 4 2-1-1-2 1-3-1-1 1-2-4-2-3-1v-2l2-2h1l1-1 2-1v-2h1v-3h-1z",
        onClick: t[368] || (t[368] = (o) => e.onclick(o)),
        onDblclick: t[369] || (t[369] = (o) => e.ondblclick()),
        onMouseenter: t[370] || (t[370] = (o) => e.onenter(o)),
        onMouseleave: t[371] || (t[371] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-94",
        style: C({ display: n.config.displayDep["FR-94"] }),
        d: "m507 235-2 1-1 1-1 1h2v-1h2v3l-4-1-2 1h-3l-1 2 1 1-1 3 1 2 1-1 4 2h7l4 2 3-8v-3h-2l-1-1-2-2-3-2z",
        onClick: t[372] || (t[372] = (o) => e.onclick(o)),
        onDblclick: t[373] || (t[373] = (o) => e.ondblclick()),
        onMouseenter: t[374] || (t[374] = (o) => e.onenter(o)),
        onMouseleave: t[375] || (t[375] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-25",
        style: C({ display: n.config.displayDep["FR-25"] }),
        d: "m811 361-1 1h-4l-2 3-3 1v4l-7 1-3-3-5 1-5 4-3 5-3 1-2 4-4 1-6 5h-7l-3 1h-2l-7 6h-3v6l5 3 2 3v4l-3 6-1 3 10 4 6-1 1 6v7l8 2 4 1 5 5-1 4-2 4-7 2 2 4 1 2-3 3v3h5l22-21-1-17 8-4 6-3 5-4v-8l5-2 12-13-2-5 4-1 4-6-2-3-9 2v-1l8-10z",
        onClick: t[376] || (t[376] = (o) => e.onclick(o)),
        onDblclick: t[377] || (t[377] = (o) => e.ondblclick()),
        onMouseenter: t[378] || (t[378] = (o) => e.onenter(o)),
        onMouseleave: t[379] || (t[379] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-90",
        style: C({ display: n.config.displayDep["FR-90"] }),
        d: "m818 336-3 2-3 2v5l1 5v9l-2 2 22 11 1-2 5-1-2-8-1-4-5 1-1-4 2-4v-4l-1-2-6-5-6-1z",
        onClick: t[380] || (t[380] = (o) => e.onclick(o)),
        onDblclick: t[381] || (t[381] = (o) => e.ondblclick()),
        onMouseenter: t[382] || (t[382] = (o) => e.onenter(o)),
        onMouseleave: t[383] || (t[383] = (o) => e.onleave(o))
      }, null, 36)
    ], 8, Xk)
  ], 8, Uk);
}
const Jk = /* @__PURE__ */ jt(Yk, [["render", Kk]]), Zk = {
  mixins: [ui],
  props: {
    config: {
      type: Object,
      required: !0
    }
  }
}, Qk = ["viewBox"], tw = ["stroke"];
function ew(e, t, n, i, s, r) {
  return V(), W("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: n.config.viewBox
  }, [
    p("g", {
      fill: "#5C68E5",
      stroke: n.config.colorStroke,
      "stroke-width": ".2%"
    }, [
      p("path", {
        class: "FR-20R",
        style: C({ display: n.config.displayDep["FR-20R"] }),
        d: "m1010 932-9 12 1 11v5l1 5-2 13-2 4h-5v4l3-2h4v4l-7 4v3l1 2-5 5 4 1-2 7h-5l-1-3h-6l2-3-3-2-4-1-12-4-6-4-4-3c0-1 3-5 3-7v-1c1 0 3 1 3 1l5-5-11-1-8-2 2-7 5-3-3-2 3-6-2-1-5 2-1-1h-6l-1-6 2-3 3-4 2-1 2-2-2-4-3-1-8-2v-8l-2-2v-2l5-1 4-1-1-3-6-4-3-3v-3h3l1-3 4-3-1-3v-6l3-1 1-6 2 2 3 1 2-4 7-6 9-2 2-6 4-4h4l1 1h5l3 3 3-1 2-4v-5l-4-4v-3l2-2-1-3 3-3-3-3v-4l5-4 3 2 2 2 2 8 2 10-2 6 1 13 5 4 2 4 1 22 4 7z",
        onClick: t[0] || (t[0] = (o) => e.onclick(o)),
        onDblclick: t[1] || (t[1] = (o) => e.ondblclick()),
        onMouseenter: t[2] || (t[2] = (o) => e.onenter(o)),
        onMouseleave: t[3] || (t[3] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-PAC",
        style: C({ display: n.config.displayDep["FR-PAC"] }),
        d: "m903 734-8 3 1 5-6 5 4 8-6 4-1 4h-6l-7 6-9 1v11h-4l-2 3-7-2-1 9-6 7-10 1-1 6-3 4-6 3h8v9l-6 3-5-2-2 4h-8l-3 2v5l-3 2-2-3h-2l-5-2-5 3 1 5 2 2h-9l4-2v-3l-11-1-6 4-4 3-4-1-2-8-6-2-1-2-1-1-9-3h-17l2-2 1-4h-8l6-5-1-4-6 3-20-1-3-7-7-3-5 4 7 6-12 2-16-3 4-6h5l-3-3-15-1h-11l3-8 12-7-3-4 3-8 11 2 3-20 10-5 4-3v-4l-11-11v-8l-6-10-1-1 2-4 10-1 2 2-1 7 1 2 5-5 5-1 1-2-6-1-1-7 4-6h5l5 5-5 6 1 3 8 1 4-4-2 5 1 4 7 1 10 1 1 4 6 5h5l3-3 2-5 3 2 2 3 1-14h-3l-2-5-13-3-1-6 4-3-3-3v-3h6l5 3 4-5-4-3v-5l3-6 7-1 6-3 1-2-3-2v-4h10l2-3-1-3 4-4 4 2 4-4 9 1 2-3h7v-8l-3-1-1-5h-8l-1-2 2-8 2-2 7-1 2 2 1 6 6-1 1-6 3-1h7l3 5 1 4 6 2 1 11 10 4h5l4 1 1 10 5 3v3h-4l-3 4h-1l1 5-7 7-1 4 2 4 3 1 3 3-5 1v7l8 5v6h5l9 3 10 7h5l17-6h5l2 5 2 3 1 5z",
        onClick: t[4] || (t[4] = (o) => e.onclick(o)),
        onDblclick: t[5] || (t[5] = (o) => e.ondblclick()),
        onMouseenter: t[6] || (t[6] = (o) => e.onenter(o)),
        onMouseleave: t[7] || (t[7] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-OCC",
        style: C({ display: n.config.displayDep["FR-OCC"] }),
        d: "M690 743v4l-15 8-2 20-11-2-3 8 3 4-12 7-3 8h-13v-7l-6-1h-5l-12 8-19 16-3 4h-11l-1 4-13 3v2l-1 4-3 4-6 4-6-6-3 5 4 6 4-1v22l1 32 5 2 3 4v6l-6-1-5-5h-7l-6 2-3 5-11 2-1 5-2 2-2-2h-3l-3 3-10-8-12-4-7 1-6 8h-5l-6-5v-6l-10-3-6-5-1-4-1-7-15-2-6 2-6-9h-15l-7-7h-5l-11-3-1-1-8-4-5-1-1 18-14-1-7-1-4-1-2 4-7-1-5-6-12 5h-5l-5-5-1-4-7-6-6-3h-1v-7l3-2 2-12 5 1 2-2-2-5 10-8 5-13 4-5-5-6-2-4 3-4-6-10-9-1-3-5 2-7 4-4-1-7 3-2-5-8 4-4 4-1 4 2 5-5 1 6 2 2 4-1v-4l2-6 5 4 5-6 3 4 6-1 7-1 2-5 11-1 6 5 1-2h1l3-1-1-5 5-1 7-2-2-4 3-3 1-6-4-5 3-8 6 3 7-1v-1l-3-7-3-11h7l2-5 3-3v-6h8l6-8-3-1v-3l6-1v-4l3-1 4-6-4-4v-4l3-2h1l7-4 9 4 8 10h4l6-6 2 3 4-4 6 2 2 13 6 5-5 10 5 2-2 6 3 1h1l3-5h5l1 1h11l2-4 3-1 1-8h2v-9l11-9 1 2v6l8-1 1 11h4l1 10 3.1 3.7L552 665l5-16 7 4 3-6 10-4 6 17 10-3v-5h4l1 6 7-2 9 12 3 13 6 7-1 7 2 1 6 4v10l4-2 8 6 4 1 1-7 5-1 2 6 5-1 1-5 13 7 6 10v8z",
        onClick: t[8] || (t[8] = (o) => e.onclick(o)),
        onDblclick: t[9] || (t[9] = (o) => e.ondblclick()),
        onMouseenter: t[10] || (t[10] = (o) => e.onenter(o)),
        onMouseleave: t[11] || (t[11] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-ARA",
        style: C({ display: n.config.displayDep["FR-ARA"] }),
        d: "m852 596 1 2-1 7-9 3-2 2-5 3v4h-4l-4-2-11 4h-7l-3 1-1 6-6 1-1-6-2-2-7 1-2 2-2 8 1 2h8l1 5 3 1v8h-7l-2 3-9-1-4 4-4-2-4 4 1 3-2 3h-10v4l3 2v1l-1 1-6 3-7 1-3 6v5l4 3-4 5-5-3h-6l-1 3 4 3-4 3 1 6 13 3 2 5h3l-1 14-2-3-3-3-2 6-3 3h-5l-5-5-2-4-10-1-8-1v-4l2-5-4 4-8-1-1-3 5-6-5-5h-5l-4 6 1 7 6 1-1 2-5 1-5 5-1-2 1-7-2-2h-5l-5 1-2 4-12-6-1 5h-5l-2-5-5 1-1 7-4-1-8-6-4 2v-10l-8-5 1-8-6-6-3-13-1-2-8-10-7 2-1-6h-4l-1 5-9 3-6-17h-1l-9 3-3 7-7-4-5 16-5 11-3-3-1-11h-4l-1-10-7 1-1-7-1-1-11 9v9h-2l-1 8-3 1-2 4h-11l-1-1h-5l-3 5-4-1 2-6-5-2 5-10-7-5-1-12 4-3-1-4-2-2 3-4h2l2-6 2-3-1-6 4-6 7-5v-10l3 2 4 4h4l2-2-2-5 1-4 1-2-1-6-2-3v-5l3-5-1-5-8-9-1-3 7-4 4-2 1-5 4-3-1-7-3-4v-7.3l-1-.7v-3l-4-9-4-2-3-5-2 4-3-4v-4l-4-6 2-4 4-5 9-2 5 1 5-4v-2l-2-2v-6l10-9 3 4 3-4h3l5-6h9v5l6 3 5 4 3-2 4-2 1 3h5l2-3 3 2 1 5 3-1 7-9 3 2 8 14v5l1 2h7l2 3h5l3 4v14l-8 6 1 1 1 5 5 1 1 3h3l4-3 12 2 2 2 3-3h4l1-7 1-4 1-1h4l4 3 4-3 2 3 3-4h4l2 6 1 7h3l1-2 1-3 7-26 2-5h4l4 3 3-1 4-2h3l2 5 7 3 7 10 5 2v5l5-1 7-7 6 2v5h10l15-17 6 4 1 2-5 7 2 1v4h-7l-4 3v7h12l4-5 8-4-4-4-1-3 4-8h4l2 3 8-6 8-2h13v5l6 7v5l-4 4 1 3 6 3v9l3-1 8 8 1 8-2 3-12 5v12l5 7s5-1 7-1c2 2 1 13 1 13l9 6 2 5 5 2z",
        onClick: t[12] || (t[12] = (o) => e.onclick(o)),
        onDblclick: t[13] || (t[13] = (o) => e.ondblclick()),
        onMouseenter: t[14] || (t[14] = (o) => e.onenter(o)),
        onMouseleave: t[15] || (t[15] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-NAQ",
        style: C({ display: n.config.displayDep["FR-NAQ"] }),
        d: "m519 538-4 3-1 5-4 2-7 4 1 3 7 8 1 1 1 5-3 5v5l2 3 1 6-2 6 2 5-2 2h-4l-4-4-3-1v9l-7 5-4 6 1 6-2 3-2 6h-2l-3 4 2 2 1 4-4 3-1-1-5-2-4 4-2-3-6 6h-4l-7-10-10-4-7 4h-1l-3 2v4l4 4-4 6-3 1v4l-6 1v4h3l-6 8h-7l-1 6-3.8 3.8.8.2-2 4h-7l3 11 3 8-7 1-6-3-3 8 4 5-1 6-3 3 2 4-7 2-5 1 1 5-3 1-2 2-6-5-11 1-2 5-7 1-6 1-3-4-5 6-5-4-2 6v4l-4 1-2-2-1-6-5 5-4-2-4 1-4 4 5 7-3 3 1 7-4 4-2 7 2 5h1l9 1 6 10-3 4 2 4 5 6-4 5-6 13-9 8 2 5-2 2-5-1-2 12-3 2v7l-7 4-3 2-2-2-3 1-4 2-4-5-9-7-1-7h-14l-8-5-9-2-3-4h-6l-3-3 1-5-3 3-1 6-6-2-3-4v-3l5-2v-7l2-2-1-5-4-1-7-3-1 4-5-1-1-5h-6l-4-4v-4h4l7-3 8-10 1-3 6-9 2-9 11-44 6-34v-8l4-6 1-5 3-2 2 3 9-1-2-3-1-2-7-6-5 6-3 8v-6l4-24 4-30 2-30 6-9v-1l4 1-1 7 19 17 7 28 1-2v-11l-3-10v-2l-3-13-11-11-4-1-1-4-5-3-7-6-5 1v-8l-2-8-1-7-8-6 1-13 5 6 6 1 1 9 1 1 2 3-4 4 1 3h5l-1-2v-5h4l2-8-3-4 1-3 4 1 1-4-4-1-2-5-4-1-2-4-8 1-3-3-6-4h-5l-3-5 6-3 4 3 1 4 7 1 3 3 5-1 1-3 6-5-3-3 11-6 5-1 2 6 7-3 5 4h1l4-2 5-1 1-2 5-3-3-4-3 3v-3l2-5-2-4 2-3-1-10-4-6 3-3-6-7 2-4-9-8v-4l-3-5 7-3 11 2 5-3v-5l10-1 9-1 10-1 1 3 3 2v-1l2-3 7-8v1h3l2 5 6 2v4l9 2v12h11l9-3-1-3 3-2 3 4 2 1 3 8 6 7 1 5 6 6v7l-1 5 7 5 3 4h6l2 8 4 2-1 5-2 1 10 1 3-3 6 5v-1l7-7 3 2h4l2 1h6l2-6 18 2 7 2 12-1 4 6v4l3 4 2-4 3 5 4 2 4 9 1 11 3 4z",
        onClick: t[16] || (t[16] = (o) => e.onclick(o)),
        onDblclick: t[17] || (t[17] = (o) => e.ondblclick()),
        onMouseenter: t[18] || (t[18] = (o) => e.onenter(o)),
        onMouseleave: t[19] || (t[19] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-BRE",
        style: C({ display: n.config.displayDep["FR-BRE"] }),
        d: "M259 289v6l1 3v11l2 2v10l-6-1-2 2-5 11-2 7-1 3-8-2-3-5h-5l-1 4-8 1-3 3-2 4-22 2-7 3-2 1-1 11-10 3-7 4h-6l-2-2-3 3h-2v-4l2-2-5-1-20 2-3-5-4-2 3-3 10 4 2-3-4-4-5-2 1 3-5 1-4-6 3 5-3 4-4-4-1-3-2 5-4-1v6l2 3-2 3-5-4 1-4 1-5-2-4-7-7-5-2 1-4-2 4-6-2-4-6 .2-.8-.2-.2h-4l-7-1-2-3v2l-10-1-5-7-2-7v7h-3l-6-3h-3l-4-1 4 4-2 4h-8l-8-2 3-5-2-9-8-9-4 1-4-3H4l-3-2 2-3 12-1 8-1h9l2-4-2-5-3-1-8-4-4 6-2 1 1-9-7-3 5-5 9 3 7 2 8 1v-3h-7l1-5-7 3-1-3 8-8-9 7-14 1-1-1-2 2-6-1 2-7-2-4 6-4-5-4 6-6h9l1-4 3-2 2 2h6v-3l8-1 1 4 5-1 1-4 8-1 4 2 5-4v8h5v3h3v-7l10-1 6 4 5-7-2-4 7-5 6 4 2-2 8-1 3-3 2 5 1-4h8l-1 4 4 1v6l5 1v6l7 5-1 6 8 4v7h3v-4l13-7 2-5 7 2 4-4v7l2-2 4 1v5l5-1v-4l7 1 2.2-2.2-.2-.8 4-3h9l-5 6 7 4h18l1 4 2 7 6 6h3l3-4h3l4-5 4 3h4l3 1-1 11 2 1v7z",
        onClick: t[20] || (t[20] = (o) => e.onclick(o)),
        onDblclick: t[21] || (t[21] = (o) => e.ondblclick()),
        onMouseenter: t[22] || (t[22] = (o) => e.onenter(o)),
        onMouseleave: t[23] || (t[23] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-PDL",
        style: C({ display: n.config.displayDep["FR-PDL"] }),
        d: "m390 319 4 3-1 8-1 5h-4v7l-5 6-5 2-3 3 2 5-11 3-2 3-4-3 2 8h-4l-7-5-3 4-1 3 2 2v2l-4 5v8l-5 6-4 15h-3l-7 8-2 4-3-2-1-3-10 1-9 1-10 1v5l-5 3-11-2-7 3 3 5v4l9 8-2 4 6 7-3 3 4 6 1 10-2 3 2 4-2 5v3l3-3 3 4-5 3-1 2-5 1-4 2-6-4-7 3-2-6-5 1-11 6-2-2v6l-8-4-4-6h-8l-3-7h-8l-8-7-7-4-7-20h-3v-4l-11-10 1-9 10-14h1l-10-9-7 1-1-5h4l4-4-1-3-1-4 7-3h-6l-5 5h-7l-4-5v3l-7-2-4-2 4-5-2-3-1-1 6-7-1-1h1l3-3 3 2h5l7-3 10-4 1-10 9-5 23-2 1-3 3-4 8-1 1-4 5 1 3 4 7 2h1l.9-1.9-.9-.1 1-1 2-7 5-11 2-2 6 1v-10l-2-2v-11l-1-3v-6l3-4v-7l-2-1 1-10 6 1 3-3 6 2 2 5 4 3 6-4 3 2 10-5 10 1 5-2 2-4h3l4 3 1 8 5 2 2 6h6l10-9h9l3 4 2 13 6 2 4 6h7v2l1-3h1l5 7 5 1 5 3-4 6z",
        onClick: t[24] || (t[24] = (o) => e.onclick(o)),
        onDblclick: t[25] || (t[25] = (o) => e.ondblclick()),
        onMouseenter: t[26] || (t[26] = (o) => e.onenter(o)),
        onMouseleave: t[27] || (t[27] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-CVL",
        style: C({ display: n.config.displayDep["FR-CVL"] }),
        d: "m554 329-9 8 3 4v5l-5 4h-8l1 4 5 6 1 6 1 4-7 2v4l5 5v7l-4 4 2 5 6 5v5l4 7-1 9 4 4-1 9v5l2 3-3 9v-2h-9l-5 6h-3l-3 4-3-4-10 9v6l2 2v2l-5 4-5-1-9 2-4 5-2 4-8 1h-4l-7-1-18-3-2 6h-6l-2-1h-4l-3-2-7 8-6-5-3 3-10-1h2l1-6-4-2-2-8h-6l-3-4-7-5 1-5v-7h-1l-5-6-1-5-6-7-3-8-2-1-3-4-3 1 1 4-10 3h-10v-12l-9-2v-4l-6-2-2-6 4-14 6-7-1-8 4-5v-2l-2-2 4-7 7 5h4l-2-8 4 3 2-3 11-3-1-2-1-3 3-3 5-2 5-6v-7h4l1-5 1-8-4-3 3-5 4-6-5-3h-1v-9l-2-3-1-3 5-3 6-1 3-5v-13l-8-7v-6l-1-1 5-4h5l13-7 4 1h9l2-2v-5l8-4v-6l2-2 3 4 1 4 3 3-1 4v4l2 3-2 4 2 6 6 4v4l5 1 1 7 3 4 7 2 1 4 1 2 1 9h1l10-1 5-4 4 3 9 1 4 5 4 2 1 7-6 4 3 2 4-2h14l1-3h4v3l9-5 7 6 2 6 4 5z",
        onClick: t[28] || (t[28] = (o) => e.onclick(o)),
        onDblclick: t[29] || (t[29] = (o) => e.ondblclick()),
        onMouseenter: t[30] || (t[30] = (o) => e.onenter(o)),
        onMouseleave: t[31] || (t[31] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-NOR",
        style: C({ display: n.config.displayDep["FR-NOR"] }),
        d: "m462 192-2 1-3-2-1 4-3 4-2 8-2 4-10 3-2 2 2 3v2l3 1-2 2v1l-1 2v6l-8 4v5l-2 3h-9l-4-2-13 7h-5l-5 4-5-3 6 4v6l8 7 1 13-4 5-5 1-6 3 1 3 2 3v9l-3-1-6-8h-1l-1 4v-2h-7l-4-6-6-2-2-13-3-4h-9l-10 9h-6l-2-6-5-2-1-8-4-3h-3l-2 4-5 2-10-1-10 5-3-2-6 4-4-3-2-4v-1l-5-2-4 3-6-1v-1l-3-1h-4l-4-3-4 5h-3l-3 4-3-1-6-5-2-7-1-4h7l3-2v-4l-8-2-5-13 4-9v-10l-4-9v-13l-2-2-2-9-8-9-2-6v-7h-1l-2-2 3-4v-7l-7-7 1-3 14 4 9 6 8-6 16 1 3 9h-4l-3 8 10 11v8h4l10-3 7 4 30 4 12 7 16-6 13-8 9-2h1l-.4-.1-9.6-1.9-7-6 1-10 9-13 15-8 18-6 27-7 16-12 2-3 3 1h4l2 4 16 15 1 7 4 6-4 4-1 4h2l-1 4-1 7 2 4v6h3l-1 2-3 5-1 3 4 3 1 8z",
        onClick: t[32] || (t[32] = (o) => e.onclick(o)),
        onDblclick: t[33] || (t[33] = (o) => e.ondblclick()),
        onMouseenter: t[34] || (t[34] = (o) => e.onenter(o)),
        onMouseleave: t[35] || (t[35] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-HDF",
        style: C({ display: n.config.displayDep["FR-HDF"] }),
        d: "m626 136 2 3-1 4-6 3v5l-6 1-1 3 4 3-1 5-1 4v12l-2 1-7-4-4 2 1 3h-8l-7 6v9l5 3 2 4h-9v4l3 2-2 2-3 2 1 2h4l2 3-3 2-3 7-5 3-2 4-1 1-6-2-2-4-3-1-10-9-1-8-3-3h-1l-2 1-4 3-3-1-6 2-5-3-2 3-4 1-2-2-4-2-4 3-2-3-8-5-8-4-4 2-4 1-9-6-4 4-7 1-10-1-2-4-2-3 1-4 3 2 2-1-1-3-1-8-4-3 1-3 3-5 1-2h-3v-6l-2-4 1-7 1-4h-2l1-4 4-4-4-6-1-7-16-15-2-4h-4l-3-1 12-14 10 6v-4l-8-7 1-12V25l16-13 19.7-2.9.3-.1-1-1h2l18-2 11-6 5 9 1 6-2 4v6l2 4h5l4 4 1 4 2 3h5l4-5 9-3h5l1 4h2v2l3 2 1 14 1 5h5l3 3 7-3 2 3 5-1 6 7-1 13h3l2-4 20-1 12 9 1 3-5 4v5l-2 1 7 2 1 7-7 4v4h8l-1 6 3 7-3 2z",
        onClick: t[36] || (t[36] = (o) => e.onclick(o)),
        onDblclick: t[37] || (t[37] = (o) => e.ondblclick()),
        onMouseenter: t[38] || (t[38] = (o) => e.onenter(o)),
        onMouseleave: t[39] || (t[39] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-IDF",
        style: C({ display: n.config.displayDep["FR-IDF"] }),
        d: "M583 258v2l-5 3v4l-3 3-2 7v6h-1l-3 3-14-1-6 3-3 6 3 3-4 5-4 4-9 5v-3h-4l-1 3h-14l-4 3-3-3 6-4-1-7-4-2-2-3-2-2-9-1-4-3-5 4-11 1-1-9-1-2v-4l-2-1-6-1-3-4-1-8h-5v-4l-6-4-2-6 2-4-2-3v-4l1-4-3-3-1-4-3-4-1 1v-2l2-2-3-1v-2l-2-3 2-2 10-3 2-4 2-8 3-4 2 3 2 4 10 1 7-1 4-4 9 6 4-1 4-2 8 4 8 5 2 2v1l4-3 6 3h4l2-3 5 3 6-2 3 1 4-3 2-1 4 3 1 8 10 9 3 1 2 4 6 2-1 1 1 2-3 2-1 5 3 2 1 5-2 3 1 3z",
        onClick: t[40] || (t[40] = (o) => e.onclick(o)),
        onDblclick: t[41] || (t[41] = (o) => e.ondblclick()),
        onMouseenter: t[42] || (t[42] = (o) => e.onenter(o)),
        onMouseleave: t[43] || (t[43] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-GES",
        style: C({ display: n.config.displayDep["FR-GES"] }),
        d: "m901 210-3 9 1 6-4 3h-2l-4 5v4l-9 7-1 12-5 14 1 11-9 18v12l4 5-3 4v8l-2 4v9l-3 4 2 6 5 5-3 5-1 8-7 5h-13l-3-2 1-4-4 1-3-12-5 1-1-4 2-4-1-6-6-5-6-1-1-2-12-7-3-3-3-2-3 1-1 2-2 2h-2l-6-6h-7l-6 3-5-4v-4l-2-1-6 1-1 3-4 3-3-3-1 1 1 2-3 2h-1l1 3-3 2v5h-6v2l-5 1v5h4l-2 2-1 8h-3l-6 1-6-1-5 1v4l-1 4-8 2-1-2-6-7-3 1h-4l-2-3-6 1v-7l-3-2 4-5-8-11-6-7-5-2-1-1h-11v5l-5 2h-12l-2 4h-2l-2-4-8 4-14-1-2-4-4-5-1-7-5-7-4 3-7-5 2-10-10-10h-4l-2-2v-5l2-8 3-3v-4l5-3v-2h-5l-2-3 2-3-1-5-3-2 1-5 3-2-1-2 2-2 2-4 5-3 3-7 3-2-2-3h-4l-1-2 3-2 2-2-3-2v-4h9l-2-4-5-3v-9l7-5h8l-1-4 4-2 7 4 2-1v-12l1-5 1-4-4-3 1-3 6-1v-5l6-3 1-4-1-3v-5l3-3-3-6 1-7h7l5 4 4-2 8-2 4-3v-8l4-3 3-5v-1h6l1 2v6l-4 4 3 2-2 3-1 4 6 4v3l-2 2 1 8 12 1 3 3 2 4 10 1 3 3 1 7h3v1h2l3 3 1 7h2v-1l2-2h7l4-4h8l7 7h6l2 2h6l5-5h6l5 4h4l1-1h3l8 4 3 3 1 9 5 2v5l2 1 4 7 6-1v-4l5-2s3 2 5 2h1a13 13 0 0 1 4 5l3 2h13l5-5 8-1 3 4 7 5 3 3 7-2h4l3 3 5-3 8 4 9 1 5 4z",
        onClick: t[44] || (t[44] = (o) => e.onclick(o)),
        onDblclick: t[45] || (t[45] = (o) => e.ondblclick()),
        onMouseenter: t[46] || (t[46] = (o) => e.onenter(o)),
        onMouseleave: t[47] || (t[47] = (o) => e.onleave(o))
      }, null, 36),
      p("path", {
        class: "FR-BFC",
        style: C({ display: n.config.displayDep["FR-BFC"] }),
        d: "m834 380 2 3-4 6-4 1 2 5-12 13-5 2v8l-5 4-14 7 1 17-22 21-1 2 4 2-6 6v8l-15 17h-10v-5l-6-2-7 7-5 1v-5l-5-2-7-10-5-2-2-1-2-5h-3l-4 2-3 1-4-3h-4l-2 5-7 26-2 5h-3l-1-7-2-6h-4l-3 4-2-3-4 3-4-3h-4l-1 1-2 11h-4l-3 3-2-2-12-2-4 3h-3l-1-3-5-1-1-6h-1l8-6v-14l-3-4h-5l-2-3h-7l-1-2v-5l-7-13-1-1-3-2-7 9-3 1-1-5-3-2-2 3h-5l-1-3-4 2-3 2-5-4-6-3v-3l3-9-2-3v-5l1-9-4-4 1-9-4-7v-5l-6-5-2-5 4-4v-7l-5-5v-4l5-1 2-1-1-4-1-6-5-6-1-4h7l6-4v-5l-3-4 9-8v-6l-4-5-2-6-7-6 4-4 4-5-3-3 3-6 6-3 14 1 3-3h1l2 2h5l9 10-1 10 6 5 4-3 6 7v7l4 5 2 4 14 1 8-4 2 4 2 1 2-4 1 2-1-3h12l5-2v-5h11l6 3 6 7 8 11-4 5 3 2v7l6-1 2 3h4l3-2 6 8 1 2 8-2 1-4v-4l5-1 6 1 6-1h3l1-8 2-2h-4v-5l5-1v-2h6v-5l3-2-1-3 4-2-1-2 1-1 3 3 3-3 2-3 6-1 2 1v4l5 4 6-3h7l6 6h2l2-2 1-2 3-1 3 2 3 3 12 7 1 2 6 1 6 5 1 2v4l-2 4 1 4 5-1 3 12-5 1-1 2-.6-.3-7.4 9.3v1z",
        onClick: t[48] || (t[48] = (o) => e.onclick(o)),
        onDblclick: t[49] || (t[49] = (o) => e.ondblclick()),
        onMouseenter: t[50] || (t[50] = (o) => e.onenter(o)),
        onMouseleave: t[51] || (t[51] = (o) => e.onleave(o))
      }, null, 36)
    ], 8, tw)
  ], 8, Qk);
}
const nw = /* @__PURE__ */ jt(Zk, [["render", ew]]), iw = {
  mixins: [ui],
  props: {
    config: {
      type: Object,
      required: !0
    }
  }
}, sw = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 57 50"
}, ow = ["stroke"];
function rw(e, t, n, i, s, r) {
  return V(), W("svg", sw, [
    p("g", {
      fill: "#5C68E5",
      stroke: n.config.colorStroke,
      "stroke-width": "0.2%"
    }, [
      p("path", {
        class: "FR-971",
        d: "m22.8 0-.2.2-2 1.2-.7.5-.3.4-1 1.3-.7 1v.6l.4.7.4 2.5.5.1.6.3.4.3.3.3V11l-.2.3-1.3.3-.6.7-1.1 3.8-.3 1v1l.3.8.7.9.9.7 1.1.7 1.4.5 1.4.3 1.2-.2 2.3-1 12-2.8 1 .3.6.2 2 .5h.5l.7-.6-.3-.4-1.3-.4-3.7-2.6-.7-.3-.4-.3-1.5-1.3-.7-.4-.8-.1h-1.3l-.7-.4-.5.5-1-.5-.8-.6-.7-.8-.7-1-.5-1.1-.1-.7.1-1.9-.3-1.8-.8-1.5-1.2-1.2L23 .1zm-6 16.2-.5-.5-.8.2-.7.5-.3.8-.7-.8-.3-.2-.2.2H13l-.5-.2 1-.5-1.2-1.4L10 13l-2.5-1-1.7-.3-.6-.3-.5-.6-.6-.4-1.3.3-1 .9-1.1 2-.7.6.3.9-.3 2.2v1.2l.4.8.5.8.4.8-.4 1 1 2.6v5.6l1 2.5.5.4.3.7.2.8.5.8.8.7.7.5.6.5.5 1-.5.5.4 1 .1.4 3.5-1.5 3.1-1.9 2.2-2.6.5-3.7-.4-3.9L15 24l-.1-3.3.4-.7 1.2-.3.5-.1-.5-1.4.4-1.6zm-2.4-4.6.6-.2-.2-.2-.3-.1h-.3l-.3.5.2.3zm40.6.2-1.7-.5-1.7.7-2.7 2.3-.9.5 1.6.2 2-.9zm-8 11.8v.2l.2-.2zm-.7.7h.5l.2-.4h-1.4l.5.4zm-5.2 17-.3-1-.5-.6-.5-.4-.8-2-1.3-1.2-1.7-.3-1.5.8-1.2 1.4-.5.8-.2 1-.6 1-.3.4.2.3.3.2.2.4.2.6v.5l1 1.8 2 .4 2.3-.6 1.7-.9.8-.6.4-.5.2-.7zM15.7 45v-.2l-.5-.1-.4.2-.3.7-.4.2-.3.3.2.3.7-.2.8-.5.3-.4zm-1.6-.1h-.4l.2.2h.3zm-2.3.6-.7.4-.3 1 .8.4.6-.4.2-.6-.4-.5zm2.6 2.5v-.3l-.3-.2v.2zm-1.5-.3.2.1h.1v-.1z",
        onClick: t[0] || (t[0] = (o) => e.onclick(o)),
        onDblclick: t[1] || (t[1] = (o) => e.ondblclick()),
        onMouseenter: t[2] || (t[2] = (o) => e.onenter(o)),
        onMouseleave: t[3] || (t[3] = (o) => e.onleave(o))
      }, null, 32)
    ], 8, ow)
  ]);
}
const lw = /* @__PURE__ */ jt(iw, [["render", rw]]), aw = {
  mixins: [ui],
  props: {
    config: {
      type: Object,
      required: !0
    }
  }
}, cw = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 43 50"
}, hw = ["stroke"];
function dw(e, t, n, i, s, r) {
  return V(), W("svg", cw, [
    p("g", {
      fill: "#5C68E5",
      stroke: n.config.colorStroke,
      "stroke-width": "0.2%"
    }, [
      p("path", {
        class: "FR-972",
        d: "m35.1 48 1.4-.1 1.1-.5 1-1.4 1.2-3 1.2-.5v-.7l-.6-1.2-.3-1.7-.6-1.4-1.2-.6.3-.5.1-.3.3-.3.6-.3-.8-1.1-.3-1.2v-1.3l.4-1.3-1.3.7.1-.8-.1-1-.3-.7-.7-.3-1-.3-.3-.6-.2-.7-.2-.5-2-1.2-.8-.8-.6-1.5.6-.3.3-.2.4-.2h.7l-3.3-1.5-.8 1.2-.9-.3-.1-.9 1.2-.6-.8-.8 2.7-1.5-.5-.6-.6-.3-.7-.1-.9.4-.2-2.3.3-1.9.8-.6 1.1 2 2.1-2.2-.2-.6.3-.4.6-.4.6-.6h-2.3l-2.3.6-2 1-1.4 1.2-1.7-3.6-1.2-.3-.5-.7-.2-.9-.4-.8-1.6-1-3.8-1.8-4.4-2.8L9.1 0 5.7.1 1.8 2.3l-.9.8-.6 1.1L0 5.6l.3 1.5.7 1.2 2.8 3 .7 1 .6 1.2.2 1.3-.2.6-.3.7-.2.7.4.7.4.5.3.5.3.5v.7l.8 1.8 1.7 1.7 3.5 2.5.4.4.6 1.2.4.5.6.1 2.1-.1h2.1l1.1-.2 1.5-.5.2 1.7.7 1.4.8 1.1.3.6-.7 1.5-1.4.6-1.5-.5-1.1-1.6-.8.9-2.6 1.2-2.7 2.9.9.5.5.4.1.4-.1.7 2.2 3.1.8.5 1.5-.2 2.4-1 1.5-.3 5.8.8 2.7-.5.6.2-.1 1 1.6.1 1.6-1 1.3-.5 1 1.4-.1 1.5-1 .6-1.1.3-.6 1.1.4 1.5z",
        onClick: t[0] || (t[0] = (o) => e.onclick(o)),
        onDblclick: t[1] || (t[1] = (o) => e.ondblclick()),
        onMouseenter: t[2] || (t[2] = (o) => e.onenter(o)),
        onMouseleave: t[3] || (t[3] = (o) => e.onleave(o))
      }, null, 32)
    ], 8, hw)
  ]);
}
const uw = /* @__PURE__ */ jt(aw, [["render", dw]]), fw = {
  mixins: [ui],
  props: {
    config: {
      type: Object,
      required: !0
    }
  }
}, pw = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 40 50"
}, gw = ["stroke"];
function mw(e, t, n, i, s, r) {
  return V(), W("svg", pw, [
    p("g", {
      fill: "#5C68E5",
      stroke: n.config.colorStroke,
      "stroke-width": "0.2%"
    }, [
      p("path", {
        class: "FR-973",
        d: "m7.8 0 .3.1.3.1h1l.2.1.3.2h.1l.2.1.1.1.2.1.2.1.2.1.2.2.3.1h.1l.1.1h.1l.5.3h.1l.2.1h.1l.1.1h.1l.1.1h.1v.1h.1l.1.1.2.1h.1l.4.2v.2l.1-.1v-.1h1l.2.1h.1l.4.1.1.1h.3l.2-.1-.1-.1h.1v-.1h.2v-.1l.3.1.2.1v.1l.3.1h.1l.2.1.2.1h.1l.1.1h.2v.1h.1v.1h.1v.1h.1l.1.1.1.1h.1l.1.1h.1l.3.2.3-.1h.1l.3.2h.2l.3.2.4.2.1.1h.1v.1l.2.1h.1l.1.1h.1l.1.2v-.1l.1-.1v.1h.1l.1.1v.1l.1.1.1.1h.1l-.1.1h-.1.1l.1.1v-.1l.1.1h.1l.2.2v-.1l.1.1.1.1.1.1v.2h.1l.1.1.1.1v.2h.1v.1l.2.2.1.1h.1l.1.1.1.1.1.1h.2l.1.2.2.3h.1l.1.1h-.1v.1l.1.1.1.1h.1l.2.1.2.3h.1v.1l.1.1.1.1.2.1h.2V9l.1.1.1.1.1.1h.1l.1.1.1.1h.1v.1h.1l.1.1.1.1.1.1h.1v.1h.1v.1h.1l.1.1v.1h.1v.1l.1.1.1.2.1.1.2.2h.3l.1-.1v-.1h-.1v-.1h.2v-.1.1-.1l.1.1.1-.1h.1l.1.1h.1v.1l.2.1.1.1.1.1h-.1v.2l.1.1h.1l.1.1.2.3h.2l.1.1.1.1.1.1v.2h.1v-.1l.1.1h.1v.1h.1l.1.1v.2h.1l.1.1v-.1l-.1-.1.1.1h.1v.2h.1v-.1l.1.1v.1h.1v.1h.1l-.1-.1.2.2h.1l.1.1h.1l.1.1h.1l.1.1h.1v.1h.1v.1h-.1.1l.1.1.1.1v-.1.2h.1v.2h.1-.1l.2.1.2.2h.4l.4-.2v-.1h.3l.1.1h.1v.1h.1l.1.1h.1l.1.1.1.1.1.1h.1l-.1.1h.2v.1l.1.2h.1l-.1-.1h.1v.3-.1.1h.1v.3l.1.1v.4l.1.1v.6l.1.2h.1v.1h.1v.2h-.1v.2h.1v.1l.1.1h.1l.1.2h.3v-.1h.1v.2h-.1l-.1.1v.1l-.1.1-.1.1.1.2v.2l.1.2.1.1v.1l.1.1.1.2h.1v.2l.1.1h.1v.1l.1.1.6-.1-.1.6v.3l-.1.2-.2.3v.2l-.1.5-.2.4-.1.1-.1.1-.3.1-.2.1-.2.1-.3.2-.2.4-.1.1-.1.1v.6l-.2.2-.2.3-.1.2-.2.1-.5.5-.2.1-.2.2-.2.1v.1l.1.3v.2l-.2.1h-.3l-.1.1-.1.1-.2.5v.4l-.1.3-.3.3-.2.1-.3.8v.1h-.1l-.1.1v.1l-.2.4v.1l-.2.2-.2.3-.5.9-.1.2-.3.3v.2l-.1.2-.1.1-.4.5h-.1l-.1-.1-.1.1-.3.2-.2.4v.3h-.2l-.1.1h-.1l-.1.3-.1.1.1.1h-.2v.1l.1.1v.3l.2.1v.2l-.1.2-.2.3v.1l-.1.1v.2l-.2.2-.1.5-.2.1v.4h.1l.1.1h-.1l-.1.2h-.3l-.1.1-.3.5-.4.9v.2l-.1.1.1.1-.2.2-.1.2-.1.2-.1.3-.2.4h-.2l-.1.1v.1l.1.1v.3h.1l.1.1v.3l-.1.1v.1h-.1l-.1.1v.2l.1.1-.1.1-.3.3-.1.2-.1.1-.1.1H25l-.2.1h.1v.2h-.2v.1h-.1l-.1.1v.1l-.1.2v.2l-.1.1-.1.2H24l-.2.1-.1.1h-.1v.1l-.1.1h-.1l-.4.2h-.1v.1h-.1l-.1.1-.1.1h-.1l-.2.1h-.2l-.1.1v.1h-.2l.1.1-.1.1-.2.1v.2l-.1.1-.1.2-.1.2-.1.2h-.3l-.1-.1v.2l-.1.1h-.2l-.4.1-.2-.1h-.1l-.1-.1h-.3l-.1-.1-.1-.1-.2-.3h-.3l-.1-.1-.2.1-.1-.1-.1.1h-.7l-.1-.1-.1-.1-.2-.4-.1-.1-.1-.1h-.2l-.3-.1-.2-.1-.2.1-.4.1-.3.1h-.6l-.2-.1-.3-.5-.2-.1-.1-.1-.2.1h-.2l-.3.2-.3.1h-.3l-.1.1-.3.1h-.5l-.5.1-.2-.1h-.1l-.3-.1-.3-.3-.1-.1-.1-.3v-.1l-.2-.1h-.1l-.1.1-.2.2-.1.2v.1l-.2.1h-.6l-.4.4h-.1l-.1-.2h-.2v.1l-.1.1v.4l-.2.2-.2.1h-.1l-.3.1-.1.2-.2.1h-.1l-.2-.1h-.2L6 47l-.1.1-.1.3v.2l-.1.2-.1.1h-.1l-.1-.1H5l-.1-.2-.1-.3h-.4l-.9.3h-.2l-.3-.1h-.3l-.1-.1-.1-.2-.1-.1-.1-.2-.1-.1h-.5l-.2-.1h-.4l-.2-.1-.3-.4H.5l-.1-.1H.1L0 46v-.1l.1-.1h.2v-.1l-.1-.1.5-.1h.1l.1-.1.1-.1h.2l.2-.2V45l-.1-.2-.1-.3.1-.5v-.2l.2.1.1-.1.3-.3.1-.1v-.1l.1-.1h.1l.1-.2.1-.1.2-.5-.1-.2h.1l.1-.1V42l.1-.3.1-.1.1-.1-.1-.1v-.1l.2-.3.2-.2h.1l.1-.2.1-.4v-.1h.1V40h.2l.1-.2v-.1h.1l.1-.1h-.1l.1-.1.1-.1v-.2h.1v-.6h.2l.1-.1v-.3h-.2V38l.1-.3v-.2l.1-.1.1-.1v-.4H5l-.1-.1h-.1l-.1-.1-.1-.2h.1l.1-.1v-.3l-.1-.2-.1-.2v-.1l.2-.2-.1-.2.1-.1-.1-.2v-.1l-.1-.1h-.1l-.1.1h-.1v-.1l.1-.1v-.1h-.1v-.1h.1l.1-.3.1-.2-.1-.1.1-.1h.2l.1-.1v-.1l.1-.1.1-.1v-.2l.2-.2.2-.2.2-.2H6l.1-.2.1-.1.1-.5.1-.3v-.1l.2-.2.1-.1.1-.2.1-.1-.1-.3.2-.4v-.9l.1-.3v-.1l.1-.1.1-.1v-.1l-.1-.2-.1-.2-.1-.2h-.1l-.2.2h-.2l-.1-.1v-.2l-.2-.1-.2-.3V27l-.1-.3-.2-.4-.3-.5h-.7l-.2-.1v-.2l.1-.2v-.1l-.1-.1-.4-.1-.2-.2-.1-.2-.1-.1v-.1l-.2-.1-.1-.2-.1-.1-.1-.3-.1-.3-.2-.4-.1-.1-.2-.1h-.1l-.1-.1-.1-.1v-.2l.2-.2.1-.2v-.3l.2-.3.1-.1-.1-.1-.1-.1-.2-.1-.2-.1-.3-.1v-.3l.1-.3v-.5l-.1-.3v-.6l-.2-.4-.1-.1-.1-.1V18l-.1-.3-.1-.1V17l-.2-.7.1-.2.3-.2v-.1l.1-.3v-.4l-.1-.1-.2-.3.1-.2v-.8l-.2-.2h-.2l-.1-.1.1-.4v-.2l-.1-.3v-.8l-.1-.4v-.1l.1-.1.1-.2.1-.2.1-.1V10l.1-.3.1-.3.1-.4.2-.2.2-.2.2-.2v-.2l.1-.1.1-.1.1-.2.3-.5.3-.6.4-.3L4 6l.2-.1.2-.1.3-.4.3-.1.2-.1.1-.1v-.4l.1-.2.4-.4.2-.4.5-.5.2-.2.1-.3.1-.4v-.6l.1-.1v-.3l.1-.2.1-.1.1-.2h.1V.4l.1-.1.1-.2V0z",
        onClick: t[0] || (t[0] = (o) => e.onclick(o)),
        onDblclick: t[1] || (t[1] = (o) => e.ondblclick()),
        onMouseenter: t[2] || (t[2] = (o) => e.onenter(o)),
        onMouseleave: t[3] || (t[3] = (o) => e.onleave(o))
      }, null, 32)
    ], 8, gw)
  ]);
}
const vw = /* @__PURE__ */ jt(fw, [["render", mw]]), bw = {
  mixins: [ui],
  props: {
    config: {
      type: Object,
      required: !0
    }
  }
}, yw = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 56 50"
}, xw = ["stroke"];
function kw(e, t, n, i, s, r) {
  return V(), W("svg", yw, [
    p("g", {
      fill: "#5C68E5",
      stroke: n.config.colorStroke,
      "stroke-width": "0.2%"
    }, [
      p("path", {
        class: "FR-974",
        d: "m20.4 0-1 .5-1.6-.3-1.7.5-.6.2-3.7 2.8-.6.9-1.3.6-.6.1-.2-.3.1.3h.2v.6l-1-.2.5-.2v-.4l-1 .2-1.6-.5-.5.2-.1.9H6v-.3l.3.1-.2.7-.3-.2-.1.6.1-.6.1-.1h-.3l-.1 1.1-.3.5.5 1.9-.4 2.2-2 1.6-.7.3-1-.2L0 15.2v.6l.6 1-.2 2.4.8 1.2 2 1.6-.1.4 1.6 1.7.1 1.7.8.3.5.7v2l-.6 1.9.5.4.6 2.1 1.6.9.8.8v.4l.9.6.3.9-.2.4.7.7 2.2.3 2.1.7.8.5 1.9 2.3.8.4 1.7.2.5.3.2.7.9.5 1 .1-.4-.1h.4l.1-.3-.1.6h.2l.3.4 1.5-.1 1.9.9 1.3.3 1.1 1 .3-.3 1.5.5 1.3-.5.3.4.8.3.9.8 2.4-.5.8.7 1.2-.7 1 .2.8-.9 2.5.2 1.6-.7 2-.1.5-.5 1.7.2 1.9-1.4.9-1.2.1-.6-.5-2 .4-2-.4-.8-.2-1.8.7-3 .5-1.2.9-1 .1-1.6.9-.2-.3-1.7.2-.5-.7-.7-.1-.8-1.4-.6-1.2-1.1-1.3-.2-.9-1.5-.8-.7-.5-1-1.6-1.8-.6-1 .1-.8-1.3-1.7-.8-.4-.5-.9-.2-3.6-.3-1.3-1.2-1.9L39.1 5l-1.2-.8-1-.4-1.7-.2-2.5-1.4-.9.2-2-.6-.7.4-.8-.1L25.1 1l-1.4.3h-1.4z",
        onClick: t[0] || (t[0] = (o) => e.onclick(o)),
        onDblclick: t[1] || (t[1] = (o) => e.ondblclick()),
        onMouseenter: t[2] || (t[2] = (o) => e.onenter(o)),
        onMouseleave: t[3] || (t[3] = (o) => e.onleave(o))
      }, null, 32)
    ], 8, xw)
  ]);
}
const ww = /* @__PURE__ */ jt(bw, [["render", kw]]), _w = {
  mixins: [ui],
  props: {
    config: {
      type: Object,
      required: !0
    }
  }
}, Mw = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 38 50"
}, Cw = ["stroke"];
function Sw(e, t, n, i, s, r) {
  return V(), W("svg", Mw, [
    p("g", {
      fill: "#5C68E5",
      stroke: n.config.colorStroke,
      "stroke-width": "0.2%"
    }, [
      p("path", {
        class: "FR-976",
        d: "M30.8 19.5V19l-.3-.2h-.2v.4l.1.1h.3zl.2.1v.3h.4v.1l.2.1h.2l.2.2h-.1.1l.2.2.2.1v.1l.1.1.2.6.4.4.2.4v.8h.1v.2l.2.1h.1l.2.1h.2l.2.5h.2v-.1L34 23v-1l.1-.1v-.1l.2-.2v-.1h.1v-.1h.9v-.2h.1l.1-.2.2-.2v-.2h-.2v-.4l-.2-.1v-.3l.2-.1v-.3l.2-.1h.1v.2h.1l.1-.1v-.3h-.5V19l.3-.3-.2-.2h-.2v-.1h-.1v-1H35l-.1-.1v-.1l-.1-.1-.1-.1h-.1v-.2h-.1l-.1-.1h-.1v-.3h-.1v-.1l-.2-.1v.1h-.1v.2h-.1v.1l-.2.1v.2l-.3.3-.2.2-.1.1-.2.2-.3.2-.7.7-.4.6.1.1h.2v-.1h.2l.2-.1v-.3H32v-.2h.1v.3h.1v-.1h.1v-.3h.4v.4l-.3.2v.2l-.2.2-.3.3v.3h-.3v-.2h-.2l-.2-.1.1-.1h.3v-.2.1H31h.2l.1-.3h-.1zM16.6 48l.2-.1.2-.1.1-.2h.1l.1-.3.2-.3v-.2h.2v-.2l.2-.2V46h-.1v-.3l-.2-.1v-.3h.1v-.1h.1l.2-.1v-.2h.1l.1-.1h1.1v.1h.1v.1l.2.1v.4h.1l.2.3v.8l.1.2v.1l.1.1v.3h.5V47h-.1l-.1-.1v-.4l.1-.1v-.2h.1l.1-.2h.3l.3-.1h.1l.2.1h.2l.2.2h.2v.1h.2V46l.1-.1.2-.1h.1v-.2l.1-.1h.1v-.1h.3V45h.1l.1-.2h.1l.2-.2-.1-.1h-.8v.2h-.2l-.4-.2-.1-.1-.1-.1-.2-.3h-.6l-.2-.2-.2-.1-.2-.2h-.1l-.2-.1-.1-.2-.1-.4v-.4l-.1-.1v-.2l-.2-.1-.1-.2h-.2l-.1-.1v-.2h-.1l-.2-.3V41l.2-.3v-.2h.1l.1-.2h.4l.2.1h.2l.2.1V40l-.3-.5-.1-.1v-.5l.2-.2.1-.3.1-.1v-.1l.1-.1h.3l.1-.1h.2v-.3h-.1v-.4l.2-.1.1-.2h1.1v.1h.1v.1l.2.1.3.1h.7l.4.2v-.1l-.4-.1h-.2v-.2h-.1V37h-.2v-.2l-.2-.1H23l-.1-1.4.2-.8-.1-.3h.1l.2-.1.3-.2h.1l.1-.1h.3v-.1h.3v-.1h.3v-.3h.1l.2-.2.2-.2h.3v-.3h-.2V32h.2v-.3h.1l.2-.2.2-.2V31h-.4l-.4.1-.2.1-.2-.2-.2-.3v-.1l.1-.5h.1v-.2l-.1-.1h-.2l-.2.1-.3-.2-.1-.1h-.1l-.3-.2V29l-.1-.2v-.1l-.1-.1H23v.1h-.2l-.1-.1v-.4l-.1-.1h-.1v-.6l.1-.1h-.1v-.1h-.1v-.2l-.2-.1v-.2h-.1v-.3l.1-.2h.1v-.1l.1-.1V26h.1l.2-.2v-.2h.3v-.1h-.6v-.4l.1-.4h.2v-.2h.1v-.1l.3-.2h.4l.1-.1v-.4h.1v-.3l.2-.2v-.4h.1l.1-.1.2-.2h.1v-.2l.1-.1.2-.1.3-.3h.2v-.2h.1v-.8h.1l.2-.1v-.1l.2-.1.2-.2.3-.3.3-.2.1-.1h.4v-.2h.2l.1-.1h.1v.1l.1.1h.3v-.1h.1V19h-.5l-.1-.1v-.2h-.1v-.2h.1v-.2h-.3v-.1l-.3-.1v.1l-.2-.1v-.4h.1v-.1h.1l.1-.1v-.2h.1v-.1l.1-.2v-.3h.3v.7h-.1v.2H27v.3h.5l.1-.3.1-.5h.1v-.4l.5-.1v-.1l-.1-.3H28l-.2-.4v-.2l.1-.1v-.3l-.1-.1h-.5V15H27v-.1l-.2-.1h.1v-.3l-.3-.1V14h-.2l-.5.1-.2-.1v-.3H25v-.2h-.1v-.2h-.1v-.2l.2-.1.1-.5H25v.3h-.2v.1h-.1v-.1h-.4v-.3H24v-.2h-.4l-.1-.1v-.1l-.2.1v.1h-.9l-.1-.1v-.1H22V12h-.7v-.1H21l-.1.1v.1h-.5l-.6-.2-.1-.2h-.1l-.2-.1v-.1l-.1-.3-.2-.2-.2-.3-.2.1v.1h-.1v.2h.1l.3.1v.4h-.2v-.2h-.3v.1l.1.2h.1l-.4.3v.2l-.4.5-.5.2-.5-.1v-.6h-.1V12h-2.1l.2-.3-.2-.2-.2-.2-.2-.3v-.6l-.2-.1-.1-.2h-.1l-.1-.2h-.2l-.1-.2v-.8l.4-.2h.2V9h.2v-.5l-.2.1h-.3l-.2-.1-.2-.1h-.2L13 8l-.2-.1-.2-.2h-.3l-.1-.1v-.1H12v-.3l-.1-.1v-.3h.3v-.1l-.1-.1-.1-.2h-.4v-.1l-.1-.2V6h-.8v-.2h-.1v-.2h.1l.1-.1.1-.2.1-.1h-.3v-.1h-.4l-.1-.1H10v-.2h-.5v-.1h-.4L9 4.5v-.4h.1V4h.2l.1-.1h.1v-.2h.3l.1-.1h.2v-.1h.3v-.1h.2l.1-.1h.4l.1-.1h-.3v-.1h-.2v-.3l.1-.1v-.4h.2l.1-.1v-.1h.2V2h-.1v-.1H11v.3h-.1l-.1.1v.1h-.1v.1h-.1v.1h-.2l-.1.1v.1H10V3h-.4l-.1-.1h-.1V3h.1v.6h-.2v.1h-.1v.1H9V4h-.4v.5h-.1v.1h-.2l-.1.1v.8l.1.1v.1l-.1.1-.1.1-.2.1h-.1l-.2.1-.2.1h-.6L6.6 6h-.3v-.1h-.1v.2h.1l.2.1h.2l.1.1.1.1H7v.9h-.1v.1h-.1l-.1.2v.1h-.2v-.1h-.2v.1h.1v.1h.1V8h-.1l-.1.1v.1h-.1v.1H6l-.1.1h-.2v.1h-.1l-.1.1-.3-.1h-.6v-.1h-.4v.2H4v.2l-.2.1h.3v.7H4v.3l-.2.1v.2l-.1.1-.2.3-.2.1v.1l-.1.1v.1l-.2.2h-.3v.2h1.4l.3.1h.2l.1.1v.1l.1.1v.1l.2.2-.1.1-.2.1v.3l-.1.3-.1.1h-.1l-.2.2-.2.2-.4.1-.2.1v.2l-.3.2-.1.2v.5l.1.1.1.1h.1l.1.1.1.2H4v.2l.1.1v.2h.3l.1-.1.1-.2v-.1l.2-.1h.7l.1.1.1.1h.1v.3H6v.3h.2v.1l.4.2h.1v.1h.1v.1l.2.2v.1h.1v.1h.1v.1h.2v.1l.3.1.3-.3.7.2.2.1.1.1h.1v.1l.2.2.1.2h.2l.1-.1h.1v-.2h.2v-.2l.1-.1V17l.2-.2h.2v.2h.2v.1l-.1.1v.2h.1v.2l.1.2v.2h-.2v.9h-.2v.1h-.1l-.1.1v.1H10l-.1.1h-.2v.3h.1l.1.1.1.2v.3h.1v.2l1.2.1v-.1l.2.1v.3l-.7.2-.2.1v.4h-.1v.7l.4.4v.5h.1v.2h.1v.8h-.2v.7l-.1.3-.1.3-.2.5v.1l.3.2h.7l.1.1h.4l.1.1h.1l.2.2h.2v.4l-.1.2h-1l-.3.2-.3-.2h-.2v.2l-.3.4-.2.2-.2.2h-.5v.2l.1.1h.2v.1l.1.1h.1v.1h.1v.1l.1.1.1.1v.2h.1v.1h.2v.1h.2v.1l.1.1v.1h.7v.1h.2l.2.1v.1l.2.2v.3h.2v.3l.1.1v.1h.1v.1l.1.1v.1l.1.2h.2v.1l.2.2v.1l.2.1v.2h.4l.2.1v.1h.2l.3.7h.4l.1.1h.2v.4l.2.5v.6h.3l.1.1v.4l.1.2h.2l.1.2.1.1.1.1v.2l.1.1v.3l.1.2.1.2v.1l.1.2v.6l-.3.9-.4.4-1 .3h-.6l-.6-.4-.3-.2v-.2l-.2-.1h-.3l-.4-.2-.2-.1-.1-.1H12V38h-.4l-.2-.1h-.1v-.2H11l-.1-.2h-.1l-.2-.4v-1.3l.1-.1v-.5l-.3-.3-.1-.1v-.2h-.6l-.1-.1H7.4l-.2.1h-.5v.4H7l.1.1h.1l.3.5.2.5v.3l.2.1v.5l.2.1v.3l.2.2.1.1h.3l.2.3v.1l.1.1v.2l-.2.1v.2h.4l.2-.2.2-.1h.2v-.2h.6l.2.2.1.2.2.2v.6l-.1.1h-.1v.6l-.1.1v.4l-.1.2-.1.2-.2.2-.2.2-.1.2-.2.2-.1.2h-.3l-.2.1-.2.1-.3.2h-.1l-.1.1-.1.1H8v.4h-.1v.1H8l.2-.1h.3l.4.3.6.4.5-.3h.4l.2-.3.2-.2.1-.2v-.1l.7.3v1.4l-.1.1-.2.1v.8l.2.4-.2.4-.2.2v.4h.2l.1.2.1.2v.1h.1V47l.3-.8V46l.4-.4.2-.1h.2l.2-.1.3.1.3.1h.1v.3l.2.4-.2.5.1.2v.4l.3-.1h.2l.1-.1h.2V47l.1-.2h.4l.4.1v.3l.2.3v.3l.2.1h.3zM1 0 .9.3v.1L.8.5H.7L.5.8H.3v.1H0V1l.1.2v.2h.4l.1-.1h.2l.2.1.2.2.2.1.1.2v.4l-.1.1h-.2v.1l-.1.2v.2l.1-.2v-.2h.6l.2-.2V2l.2-.1v-.1h.2l.3-.2H3v-.3l-.1-.1h-.1L2.4 1V.7H2V.5L1.7.3h-.2V.2h-.2z",
        onClick: t[0] || (t[0] = (o) => e.onclick(o)),
        onDblclick: t[1] || (t[1] = (o) => e.ondblclick()),
        onMouseenter: t[2] || (t[2] = (o) => e.onenter(o)),
        onMouseleave: t[3] || (t[3] = (o) => e.onleave(o))
      }, null, 32)
    ], 8, Cw)
  ]);
}
const Ew = /* @__PURE__ */ jt(_w, [["render", Sw]]), hp = {
  France: Jk,
  FranceReg: nw,
  // FranceAcad,
  Guadeloupe: lw,
  Martinique: uw,
  Guyane: vw,
  Reunion: ww,
  Mayotte: Ew
}, Pw = {
  name: "MapChart",
  components: {
    MapInfo: cp,
    ...hp
  },
  mixins: [M1],
  props: {
    databoxId: {
      type: String,
      default: null
    },
    databoxType: {
      type: String,
      default: null
    },
    databoxSource: {
      type: String,
      default: "default"
    },
    data: {
      type: String,
      required: !0
    },
    value: {
      type: [Number, String],
      default: ""
    },
    date: {
      type: String,
      required: !0
    },
    level: {
      type: String,
      default: "dep"
    },
    name: {
      type: String,
      default: "Data"
    },
    selectedPalette: {
      type: String,
      default: "sequentialAscending"
    }
  },
  data() {
    return {
      dataParse: {},
      widgetId: "",
      scaleMin: 0,
      scaleMax: 0,
      colorLeft: "",
      colorRight: "",
      isDep: !0,
      isReg: !1,
      isAcad: !1,
      zoomDep: "",
      InfoProps: {
        localisation: "",
        names: [],
        min: 0,
        max: 0,
        colorMin: "",
        colorMax: "",
        value: 0,
        valueNat: 0,
        date: ""
      },
      FranceProps: {
        viewBox: "0 0 1010 1010",
        displayDep: {},
        colorStroke: "#FFFFFF"
      },
      DromProps: {
        colorStroke: "#FFFFFF"
      },
      tooltip: {
        top: "0px",
        left: "0px",
        visibility: "hidden",
        value: 0,
        place: ""
      },
      displayFrance: "",
      displayGuadeloupe: "",
      displayMartinique: "",
      displayMayotte: "",
      displayReunion: "",
      displayGuyane: "",
      dromColor: "#6b6b6b"
    };
  },
  watch: {
    $props: {
      handler() {
        this.widgetId && this.createChart();
      },
      deep: !0,
      immediate: !0
    }
  },
  created() {
    this.widgetId = "dsfr-widget-" + Math.floor(Math.random() * 1e3), this.isDep = this.level === "dep", this.isReg = this.level === "reg", this.isAcad = this.level === "acad";
  },
  mounted() {
    this.createChart(), this.$forceUpdate(), document.documentElement.addEventListener("dsfr.theme", (t) => {
      this.changeTheme(t.detail.theme);
    });
  },
  methods: {
    createChart() {
      const e = this.$refs[this.widgetId];
      try {
        this.dataParse = JSON.parse(this.data);
      } catch (c) {
        console.error("Erreur lors du parsing des données data:", c);
        return;
      }
      const t = this.choosePalette();
      this.colorLeft = t[0], this.colorRight = t[t.length - 1], this.InfoProps.colorMin = this.colorLeft, this.InfoProps.colorMax = this.colorRight, this.InfoProps.date = this.date, this.InfoProps.names = this.name;
      const n = [];
      let i = [];
      if (this.FranceProps.displayDep = {}, this.zoomDep) {
        if (this.isDep) {
          const c = this.getDep(this.zoomDep).region_value;
          i = this.getDepsFromReg(c);
        } else this.isReg ? i = this.getAllReg() : this.isAcad && (i = [this.getAcad(this.zoomDep).value]);
        for (const c of i)
          n.push(this.dataParse[c]);
      } else
        for (const c in this.dataParse)
          n.push(this.dataParse[c]);
      this.scaleMin = Math.min(...n), this.scaleMax = Math.max(...n);
      const s = pc().domain([this.scaleMin, this.scaleMax]).range([this.colorLeft, this.colorRight]);
      let r = [], o = [], l = [], a = [];
      for (const c in this.dataParse) {
        const h = "FR-" + c, d = e.getElementsByClassName(h);
        if (!this.zoomDep)
          d.length !== 0 && d[0].setAttribute("fill", s(this.dataParse[c])), this.FranceProps.displayDep[h] = "";
        else {
          const u = document.querySelector("." + h).getBBox();
          this.zoomDep === c ? (d.length !== 0 && d[0].setAttribute("fill", s(this.dataParse[c])), this.FranceProps.displayDep[h] = "", r.push(u.x), l.push(u.y), o.push(u.x + u.width), a.push(u.y + u.height)) : i.includes(c) ? (d.length !== 0 && d[0].setAttribute("fill", this.colorLeft + "B3"), this.FranceProps.displayDep[h] = "", r.push(u.x), l.push(u.y), o.push(u.x + u.width), a.push(u.y + u.height)) : (d.length !== 0 && d[0].setAttribute("fill", "rgba(255, 255, 255, 0)"), this.FranceProps.displayDep[h] = "none");
        }
      }
      if (this.zoomDep) {
        if (this.isDep) {
          this.InfoProps.localisation = this.getDep(this.zoomDep).department;
          const c = Math.min(...r), h = Math.min(...l), d = Math.max(...o), u = Math.max(...a), f = d - c, g = u - h, m = Math.max(f, g);
          this.FranceProps.viewBox = `${c} ${h} ${m} ${m}`;
        } else this.isReg ? this.InfoProps.localisation = this.getReg(this.zoomDep).region : this.isAcad && (this.InfoProps.localisation = this.getAcad(this.zoomDep).academy);
        this.InfoProps.value = this.value, this.InfoProps.valueNat = this.dataParse[this.zoomDep], this.isDep && (this.displayFrance = "none", this.displayGuadeloupe = "none", this.displayMartinique = "none", this.displayMayotte = "none", this.displayReunion = "none", this.displayGuyane = "none", this.zoomDep === "971" && this.level === "dep" || this.zoomDep === "01" && this.level === "reg" ? this.displayGuadeloupe = "" : this.zoomDep === "972" && this.level === "dep" || this.zoomDep === "02" && this.level === "reg" ? this.displayMartinique = "" : this.zoomDep === "973" && this.level === "dep" || this.zoomDep === "03" && this.level === "reg" ? this.displayGuyane = "" : this.zoomDep === "974" && this.level === "dep" || this.zoomDep === "04" && this.level === "reg" ? this.displayReunion = "" : this.zoomDep === "976" && this.level === "dep" || this.zoomDep === "06" && this.level === "reg" ? this.displayMayotte = "" : this.displayFrance = "");
      } else
        this.InfoProps.localisation = "France", this.InfoProps.value = this.value, this.InfoProps.valueNat = 0, this.FranceProps.viewBox = "0 0 1010 1010", this.displayFrance = "", this.displayGuadeloupe = "", this.displayMartinique = "", this.displayMayotte = "", this.displayReunion = "", this.displayGuyane = "";
      this.InfoProps.names = this.name, this.InfoProps.min = this.scaleMin, this.InfoProps.max = this.scaleMax, this.InfoProps.colorMin = this.colorLeft, this.InfoProps.colorMax = this.colorRight;
    },
    displayTooltip(e) {
      if (dr()) return;
      const t = this.$refs[this.widgetId], n = e.target.className.baseVal, i = n.replace("FR-", ""), s = t.getElementsByClassName(n);
      s[0].style.opacity = 0.8, this.tooltip.value = this.dataParse[i], this.isDep ? this.tooltip.place = this.getDep(i).department : this.isReg ? this.tooltip.place = this.getReg(i).region : this.isAcad && (this.tooltip.place = this.getAcad(i).academy);
      const r = t.querySelector(".france_container").getBoundingClientRect(), o = t.querySelector(".map_tooltip").getBoundingClientRect(), l = e.target.getBoundingClientRect(), a = window.innerWidth > 1e3 ? window.innerWidth / 30 : window.innerWidth / 15;
      let c = l.x - r.x + o.width - a, h = l.y - r.y;
      c + o.width + a > r.x && (c = l.x / 2 - r.x + o.width + a / 2), this.tooltip.top = h + "px", this.tooltip.left = c + "px", this.tooltip.visibility = "visible";
    },
    hideTooltip(e) {
      if (dr()) return;
      this.tooltip.visibility = "hidden";
      const t = this.$refs[this.widgetId], n = e.target.className.baseVal, i = t.getElementsByClassName(n);
      i[0].style.opacity = 1;
    },
    changeGeoLevel(e) {
      const t = e.target.className.baseVal.replace("FR-", "");
      this.zoomDep = t, this.createChart();
    },
    resetGeoFilters() {
      this.zoomDep = "", this.createChart();
    },
    choosePalette() {
      return Le(this.selectedPalette);
    },
    changeTheme(e) {
      e === "light" ? (this.dromColor = "#6b6b6b", this.FranceProps.colorStroke = "#FFFFFF", this.DromProps.colorStroke = "#FFFFFF") : (this.dromColor = "#cecece", this.FranceProps.colorStroke = "#161616", this.DromProps.colorStroke = "#161616"), this.createChart();
    }
  }
}, Dw = { class: "fr-col-12 fr-col-lg-9 align-stretch" }, Nw = { class: "map" }, Ow = { class: "tooltip_header fr-text--sm fr-mb-0" }, Rw = { class: "tooltip_body" }, Aw = { class: "tooltip_value-content" }, Fw = { class: "tooltip_value" }, Tw = { class: "om_container fr-grid-row no_select" };
function Lw(e, t, n, i, s, r) {
  var g;
  const o = We("MapInfo"), l = We("france"), a = We("france-reg"), c = We("guadeloupe"), h = We("martinique"), d = We("guyane"), u = We("reunion"), f = We("mayotte");
  return V(), Ce(Fe, {
    disabled: !((g = e.$el) != null && g.ownerDocument.getElementById(n.databoxId)) || !n.databoxId && !n.databoxType && n.databoxSource === "default",
    to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource
  }, [
    p("div", {
      ref: s.widgetId,
      class: "widget_container fr-grid-row"
    }, [
      At(o, { data: s.InfoProps }, null, 8, ["data"]),
      p("div", Dw, [
        s.zoomDep ? (V(), W("button", {
          key: 0,
          class: "fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w",
          onClick: t[0] || (t[0] = (...m) => r.resetGeoFilters && r.resetGeoFilters(...m))
        }, " Retour ")) : Ct("", !0),
        p("div", Nw, [
          p("div", {
            class: "map_tooltip",
            style: C({ top: s.tooltip.top, left: s.tooltip.left, visibility: s.tooltip.visibility })
          }, [
            p("div", Ow, X(s.tooltip.place), 1),
            p("div", Rw, [
              p("div", Aw, [
                p("div", Fw, X(s.tooltip.value), 1)
              ])
            ])
          ], 4),
          s.isDep ? (V(), W("div", {
            key: 0,
            class: "france_container no_select",
            style: C({ display: s.displayFrance })
          }, [
            At(l, {
              config: s.FranceProps,
              onclick: r.changeGeoLevel,
              ondblclick: r.resetGeoFilters,
              onenter: r.displayTooltip,
              onleave: r.hideTooltip
            }, null, 8, ["config", "onclick", "ondblclick", "onenter", "onleave"])
          ], 4)) : Ct("", !0),
          s.isReg ? (V(), W("div", {
            key: 1,
            class: "france_container no_select",
            style: C({ display: s.displayFrance })
          }, [
            At(a, {
              config: s.FranceProps,
              onclick: r.changeGeoLevel,
              ondblclick: r.resetGeoFilters,
              onenter: r.displayTooltip,
              onleave: r.hideTooltip
            }, null, 8, ["config", "onclick", "ondblclick", "onenter", "onleave"])
          ], 4)) : Ct("", !0),
          p("div", Tw, [
            p("div", {
              class: "om fr-col-sm",
              style: C({ display: s.displayGuadeloupe })
            }, [
              p("span", {
                class: "om_title fr-text--xs fr-my-1w",
                style: C({ color: s.dromColor })
              }, " Guadeloupe ", 4),
              At(c, {
                height: "50",
                config: s.DromProps,
                onclick: r.changeGeoLevel,
                ondblclick: r.resetGeoFilters,
                onenter: r.displayTooltip,
                onleave: r.hideTooltip
              }, null, 8, ["config", "onclick", "ondblclick", "onenter", "onleave"])
            ], 4),
            p("div", {
              class: "om fr-col-sm",
              style: C({ display: s.displayMartinique })
            }, [
              p("span", {
                class: "fr-text--xs fr-my-1w",
                style: C({ color: s.dromColor })
              }, " Martinique ", 4),
              At(h, {
                height: "50",
                config: s.DromProps,
                onclick: r.changeGeoLevel,
                ondblclick: r.resetGeoFilters,
                onenter: r.displayTooltip,
                onleave: r.hideTooltip
              }, null, 8, ["config", "onclick", "ondblclick", "onenter", "onleave"])
            ], 4),
            p("div", {
              class: "om fr-col-sm",
              style: C({ display: s.displayGuyane })
            }, [
              p("span", {
                class: "fr-text--xs fr-my-1w",
                style: C({ color: s.dromColor })
              }, " Guyane ", 4),
              At(d, {
                height: "50",
                config: s.DromProps,
                onclick: r.changeGeoLevel,
                ondblclick: r.resetGeoFilters,
                onenter: r.displayTooltip,
                onleave: r.hideTooltip
              }, null, 8, ["config", "onclick", "ondblclick", "onenter", "onleave"])
            ], 4),
            p("div", {
              class: "om fr-col-sm",
              style: C({ display: s.displayReunion })
            }, [
              p("span", {
                class: "fr-text--xs fr-my-1w",
                style: C({ color: s.dromColor })
              }, " La Réunion ", 4),
              At(u, {
                height: "50",
                config: s.DromProps,
                onclick: r.changeGeoLevel,
                ondblclick: r.resetGeoFilters,
                onenter: r.displayTooltip,
                onleave: r.hideTooltip
              }, null, 8, ["config", "onclick", "ondblclick", "onenter", "onleave"])
            ], 4),
            p("div", {
              class: "om fr-col-sm",
              style: C({ display: s.displayMayotte })
            }, [
              p("span", {
                class: "fr-text--xs fr-my-1w",
                style: C({ color: s.dromColor })
              }, " Mayotte ", 4),
              At(f, {
                height: "50",
                config: s.DromProps,
                onclick: r.changeGeoLevel,
                ondblclick: r.resetGeoFilters,
                onenter: r.displayTooltip,
                onleave: r.hideTooltip
              }, null, 8, ["config", "onclick", "ondblclick", "onenter", "onleave"])
            ], 4)
          ])
        ])
      ])
    ], 512)
  ], 8, ["disabled", "to"]);
}
const Iw = /* @__PURE__ */ jt(Pw, [["render", Lw], ["__scopeId", "data-v-b4bd94f7"]]), Vw = {
  name: "MapChartReg",
  components: {
    MapInfo: cp,
    ...hp
  },
  mixins: [M1],
  props: {
    databoxId: {
      type: String,
      default: null
    },
    databoxType: {
      type: String,
      default: null
    },
    databoxSource: {
      type: String,
      default: "default"
    },
    data: {
      type: String,
      required: !0
    },
    value: {
      type: [Number, String],
      default: ""
    },
    date: {
      type: String,
      required: !0
    },
    region: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      default: "Data"
    },
    selectedPalette: {
      type: String,
      default: "sequentialAscending"
    }
  },
  data() {
    return {
      dataParse: {},
      widgetId: "",
      scaleMin: 0,
      scaleMax: 0,
      colorLeft: "",
      colorRight: "",
      zoomDep: "",
      InfoProps: {
        localisation: "",
        names: [],
        min: 0,
        max: 0,
        colorMin: "",
        colorMax: "",
        value: 0,
        valueReg: 0,
        date: ""
      },
      FranceProps: {
        viewBox: "0 0 1010 1010",
        displayDep: {},
        colorStroke: "#FFFFFF"
      },
      tooltip: {
        top: "0px",
        left: "0px",
        visibility: "hidden",
        value: 0,
        place: ""
      },
      displayFrance: "",
      displayGuadeloupe: "",
      displayMartinique: "",
      displayMayotte: "",
      displayReunion: "",
      displayGuyanne: ""
    };
  },
  watch: {
    $props: {
      handler() {
        this.widgetId && this.createChart();
      },
      deep: !0,
      immediate: !0
    }
  },
  created() {
    this.widgetId = "dsfr-widget-" + Math.floor(Math.random() * 1e3);
  },
  mounted() {
    this.createChart(), this.$forceUpdate(), document.documentElement.addEventListener("dsfr.theme", (t) => {
      this.changeTheme(t.detail.theme);
    });
  },
  methods: {
    createChart() {
      const e = this.$refs[this.widgetId];
      try {
        this.dataParse = JSON.parse(this.data);
      } catch (c) {
        console.error("Erreur lors du parsing des données data:", c);
        return;
      }
      const t = this.choosePalette();
      this.colorLeft = t[0], this.colorRight = t[t.length - 1], this.InfoProps.colorMin = this.colorLeft, this.InfoProps.colorMax = this.colorRight, this.InfoProps.date = this.date, this.InfoProps.names = this.name;
      const n = [];
      let i = [];
      this.FranceProps.displayDep = {}, i = this.getDepsFromReg(this.region), i.forEach((c) => {
        n.push(this.dataParse[c]);
      }), this.scaleMin = Math.min(...n), this.scaleMax = Math.max(...n);
      const s = pc().domain([this.scaleMin, this.scaleMax]).range([this.colorLeft, this.colorRight]);
      let r = [], o = [], l = [], a = [];
      for (const c in this.dataParse) {
        const h = "FR-" + c, d = e.getElementsByClassName(h);
        d.length !== 0 && d[0].setAttribute("fill", "rgba(255, 255, 255, 0)"), this.FranceProps.displayDep[h] = "none";
      }
      if (i.forEach((c) => {
        const h = "FR-" + c, d = e.getElementsByClassName(h);
        if (this.zoomDep) {
          if (this.zoomDep === c) {
            const u = d[0].getBBox();
            d.length !== 0 && d[0].setAttribute("fill", s(this.dataParse[c])), this.FranceProps.displayDep[h] = "", r.push(u.x), l.push(u.y), o.push(u.x + u.width), a.push(u.y + u.height);
          } else if (i.includes(c)) {
            const u = d[0].getBBox();
            d.length !== 0 && d[0].setAttribute("fill", this.colorLeft + "B3"), this.FranceProps.displayDep[h] = "", r.push(u.x), l.push(u.y), o.push(u.x + u.width), a.push(u.y + u.height);
          }
        } else if (i.includes(c)) {
          const u = d[0].getBBox();
          d.length !== 0 && d[0].setAttribute("fill", s(this.dataParse[c])), this.FranceProps.displayDep[h] = "", r.push(u.x), l.push(u.y), o.push(u.x + u.width), a.push(u.y + u.height);
        }
      }), r.length && l.length && o.length && a.length) {
        const c = Math.min(...r), h = Math.min(...l), d = Math.max(...o), u = Math.max(...a), f = d - c, g = u - h, m = Math.max(f, g);
        this.FranceProps.viewBox = `${c} ${h} ${m} ${m}`;
      }
      this.InfoProps.localisation = this.getReg(this.region).department, this.InfoProps.value = this.value, this.InfoProps.valueReg = this.dataParse[this.zoomDep], this.InfoProps.min = this.scaleMin, this.InfoProps.max = this.scaleMax;
    },
    choosePalette() {
      return Le(this.selectedPalette);
    },
    displayTooltip(e) {
      if (dr()) return;
      const t = this.$refs[this.widgetId], n = e.target.className.baseVal, i = n.replace("FR-", ""), s = t.getElementsByClassName(n);
      s[0].style.opacity = 0.8, this.tooltip.value = this.dataParse[i], this.tooltip.place = this.getDep(i).department;
      const r = t.querySelector(".france_container").getBoundingClientRect(), o = t.querySelector(".map_tooltip").getBoundingClientRect(), l = e.target.getBoundingClientRect(), a = window.innerWidth > 1e3 ? window.innerWidth / 30 : window.innerWidth / 15;
      let c = l.x - r.x + o.width - a, h = l.y - r.y;
      c + o.width + a > r.x && (c = l.x / 2 - r.x + o.width + a / 2), this.tooltip.top = h + "px", this.tooltip.left = c + "px", this.tooltip.visibility = "visible";
    },
    hideTooltip(e) {
      if (dr()) return;
      this.tooltip.visibility = "hidden";
      const t = this.$refs[this.widgetId], n = e.target.className.baseVal, i = t.getElementsByClassName(n);
      i[0].style.opacity = 1;
    },
    changeGeoLevel(e) {
      const t = e.target.className.baseVal.replace("FR-", "");
      this.zoomDep = t, this.createChart();
    },
    resetGeoFilters() {
      this.zoomDep = "", this.createChart();
    },
    changeTheme(e) {
      e === "light" ? this.FranceProps.colorStroke = "#FFFFFF" : this.FranceProps.colorStroke = "#161616", this.createChart();
    }
  }
}, $w = { class: "fr-col-12 fr-col-lg-9 align-stretch" }, Bw = { class: "map" }, zw = { class: "tooltip_header fr-text--sm fr-mb-0" }, Hw = { class: "tooltip_body" }, jw = { class: "tooltip_value-content" }, Ww = { class: "tooltip_value" };
function qw(e, t, n, i, s, r) {
  var a;
  const o = We("MapInfo"), l = We("france");
  return V(), Ce(Fe, {
    disabled: !((a = e.$el) != null && a.ownerDocument.getElementById(n.databoxId)) || !n.databoxId && !n.databoxType && n.databoxSource === "default",
    to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource
  }, [
    p("div", {
      ref: s.widgetId,
      class: "widget_container fr-grid-row"
    }, [
      At(o, { data: s.InfoProps }, null, 8, ["data"]),
      p("div", $w, [
        s.zoomDep ? (V(), W("button", {
          key: 0,
          class: "fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w",
          onClick: t[0] || (t[0] = (...c) => r.resetGeoFilters && r.resetGeoFilters(...c))
        }, " Retour ")) : Ct("", !0),
        p("div", Bw, [
          p("div", {
            class: "map_tooltip",
            style: C({ top: s.tooltip.top, left: s.tooltip.left, visibility: s.tooltip.visibility })
          }, [
            p("div", zw, X(s.tooltip.place), 1),
            p("div", Hw, [
              p("div", jw, [
                p("div", Ww, X(s.tooltip.value), 1)
              ])
            ])
          ], 4),
          p("div", {
            class: "france_container no_select",
            style: C({ display: s.displayFrance })
          }, [
            At(l, {
              config: s.FranceProps,
              onclick: r.changeGeoLevel,
              ondblclick: r.resetGeoFilters,
              onenter: r.displayTooltip,
              onleave: r.hideTooltip
            }, null, 8, ["config", "onclick", "ondblclick", "onenter", "onleave"])
          ], 4)
        ])
      ])
    ], 512)
  ], 8, ["disabled", "to"]);
}
const Gw = /* @__PURE__ */ jt(Vw, [["render", qw], ["__scopeId", "data-v-398d94dc"]]);
ut.register(Ei, Ul, as);
const Yw = {
  name: "PieChart",
  mixins: [Ln],
  props: {
    databoxId: {
      type: String,
      default: null
    },
    databoxType: {
      type: String,
      default: null
    },
    databoxSource: {
      type: String,
      default: "default"
    },
    x: {
      type: String,
      required: !0
    },
    y: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      default: ""
    },
    fill: {
      type: [Boolean, String],
      default: !1
    },
    date: {
      type: String,
      default: ""
    },
    aspectRatio: {
      type: [Number, String],
      default: 2
    },
    selectedPalette: {
      type: String,
      default: ""
    },
    unitTooltip: {
      type: String,
      default: ""
    }
  },
  data() {
    return this.chart = void 0, {
      widgetId: "",
      chartId: "",
      display: "",
      datasets: [],
      labels: [],
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      colorHover: []
    };
  },
  watch: {
    $props: {
      handler() {
        this.chartId && (this.resetData(), this.getData(), this.createChart());
      },
      deep: !0,
      immediate: !0
    }
  },
  created() {
    Hi(), this.chartId = "dsfr-chart-" + Math.floor(Math.random() * 1e3), this.widgetId = "dsfr-widget-" + Math.floor(Math.random() * 1e3);
  },
  mounted() {
    this.resetData(), this.createChart(), this.display = this.$refs[this.widgetId].offsetWidth > 486 ? "big" : "small", document.documentElement.addEventListener("dsfr.theme", (t) => {
      this.chartId !== "" && this.changeColors(t.detail.theme);
    });
  },
  methods: {
    resetData() {
      this.chart && this.chart.destroy(), this.display = "", this.datasets = [], this.labels = [], this.xparse = [], this.yparse = [], this.nameParse = [], this.tmpColorParse = [], this.colorParse = [], this.colorHover = [];
    },
    getData() {
      try {
        this.xparse = JSON.parse(this.x), this.yparse = JSON.parse(this.y);
      } catch (t) {
        console.error("Erreur lors du parsing des données x ou y:", t);
        return;
      }
      let e = [];
      if (this.name)
        try {
          e = JSON.parse(this.name);
        } catch (t) {
          console.error("Erreur lors du parsing de name:", t);
        }
      for (let t = 0; t < this.yparse[0].length; t++)
        e[t] ? this.nameParse.push(e[t]) : this.nameParse.push("Série " + (t + 1));
      this.labels = this.xparse[0], this.loadColors(), this.datasets = this.yparse.map((t, n) => ({
        data: t,
        borderColor: this.colorParse[n],
        backgroundColor: this.colorParse[n],
        hoverBorderColor: this.colorHover[n],
        hoverBackgroundColor: this.colorHover[n]
      }));
    },
    createChart() {
      this.chart && this.chart.destroy(), this.getData();
      const e = this.$refs[this.chartId].getContext("2d");
      this.chart = new ut(e, {
        type: this.fill ? "pie" : "doughnut",
        data: {
          labels: this.labels,
          datasets: this.datasets
        },
        options: {
          aspectRatio: this.aspectRatio,
          layout: {
            padding: {
              left: 50,
              right: 50,
              top: 0,
              bottom: 0
            }
          },
          plugins: {
            legend: {
              display: !1
            },
            tooltip: {
              enabled: !1,
              displayColors: !1,
              backgroundColor: "#6b6b6b",
              callbacks: {
                label: (t) => {
                  const n = this.datasets[t.datasetIndex].data[t.dataIndex];
                  return this.formatNumber(n);
                },
                title: (t) => t[0].label,
                labelTextColor: (t) => this.colorParse[t.datasetIndex][t.dataIndex]
              },
              external: (t) => {
                const i = (document.getElementById(this.databoxId + "-" + this.databoxType + "-" + this.databoxSource) ?? this.$el.nextElementSibling).querySelector(".tooltip"), s = t.tooltip;
                if (!i) return;
                if (!s || s.opacity === 0) {
                  i.style.opacity = 0;
                  return;
                }
                if (i.classList.remove("above", "below", "no-transform"), s.yAlign ? i.classList.add(s.yAlign) : i.classList.add("no-transform"), s.body) {
                  const d = s.title || [], u = s.body.map((_) => _.lines), f = i.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
                  f.innerHTML = d;
                  const g = s.labelTextColors[0], m = i.querySelector(".tooltip_value");
                  m.innerHTML = "";
                  const b = `${u[0][0]}${this.unitTooltip ? " " + this.unitTooltip : ""}`;
                  m.innerHTML += `
                    <div class="tooltip_value-content">
                      <span class="tooltip_dot" style="background-color:${g};"></span>
                      <p class="tooltip_place fr-mb-0">${b}</p>
                    </div>
                  `;
                }
                const { offsetLeft: r, offsetTop: o } = this.chart.canvas, l = Number(this.chart.canvas.style.width.replace(/\D/g, "")), a = Number(this.chart.canvas.style.height.replace(/\D/g, ""));
                let c = r + s.caretX + 10, h = o + s.caretY - 20;
                c + i.clientWidth > r + l && (c = r + s.caretX - i.clientWidth - 10), h + i.clientHeight > o + 0.9 * a && (h = o + s.caretY - i.clientHeight + 20), c < r && (c = r + s.caretX - i.clientWidth / 2, h = o + s.caretY - i.clientHeight - 20), i.style.position = "absolute", i.style.padding = s.padding + "px " + s.padding + "px", i.style.pointerEvents = "none", i.style.left = c + "px", i.style.top = h + "px", i.style.opacity = 1;
              }
            }
          }
        }
      });
    },
    loadColors() {
      let e = this.yparse;
      (this.selectedPalette === "" || this.selectedPalette === "categorical") && (e = this.yparse[0]);
      const { colorParse: t, colorHover: n } = cc({
        yparse: e,
        tmpColorParse: this.tmpColorParse,
        selectedPalette: this.selectedPalette
      });
      this.colorParse = [t.flat()], this.colorHover = [n.flat()];
    },
    choosePalette() {
      return Le(this.selectedPalette);
    },
    // eslint-disable-next-line no-unused-vars
    changeColors(e) {
      this.loadColors(), this.chart.data.datasets.forEach((t, n) => {
        t.borderColor = this.colorParse[n], t.backgroundColor = this.colorParse[n], t.hoverBorderColor = this.colorHover[n], t.hoverBackgroundColor = this.colorHover[n];
      }), this.chart.update("none");
    }
  }
}, Uw = { class: "fr-col-12" }, Xw = { class: "chart" }, Kw = { class: "chart_legend fr-mb-0 fr-mt-4v" }, Jw = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, Zw = {
  key: 0,
  class: "flex fr-mt-1w"
}, Qw = { class: "fr-text--xs" };
function t8(e, t, n, i, s, r) {
  var o;
  return V(), Ce(Fe, {
    disabled: !((o = e.$el) != null && o.ownerDocument.getElementById(n.databoxId)) || !n.databoxId && !n.databoxType && n.databoxSource === "default",
    to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource
  }, [
    p("div", {
      ref: s.widgetId,
      class: "widget_container fr-grid-row"
    }, [
      p("div", Uw, [
        p("div", Xw, [
          t[0] || (t[0] = p("div", { class: "tooltip" }, [
            p("div", { class: "tooltip_header fr-text--sm fr-mb-0" }),
            p("div", { class: "tooltip_body" }, [
              p("div", { class: "tooltip_value" }, [
                p("span", { class: "tooltip_dot" })
              ])
            ])
          ], -1)),
          p("canvas", { ref: s.chartId }, null, 512),
          p("div", Kw, [
            (V(!0), W(vt, null, Ft(s.nameParse, (l, a) => (V(), W("div", {
              key: a,
              class: "flex fr-mt-3v fr-mb-1v"
            }, [
              p("span", {
                class: "legende_dot",
                style: C({ "background-color": s.colorParse[0][a] })
              }, null, 4),
              p("p", Jw, X(e.capitalize(l)), 1)
            ]))), 128)),
            n.date ? (V(), W("div", Zw, [
              p("p", Qw, " Mise à jour : " + X(n.date), 1)
            ])) : Ct("", !0)
          ])
        ])
      ])
    ], 512)
  ], 8, ["disabled", "to"]);
}
const e8 = /* @__PURE__ */ jt(Yw, [["render", t8]]);
ut.register(Ao, hs);
const n8 = {
  name: "RadarChart",
  mixins: [Ln],
  props: {
    databoxId: {
      type: String,
      default: null
    },
    databoxType: {
      type: String,
      default: null
    },
    databoxSource: {
      type: String,
      default: "default"
    },
    x: {
      type: String,
      required: !0
    },
    y: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: ""
    },
    aspectRatio: {
      type: [Number, String],
      default: 2
    },
    selectedPalette: {
      type: String,
      default: ""
    },
    unitTooltip: {
      type: String,
      default: ""
    }
  },
  data() {
    return this.chart = void 0, {
      widgetId: "",
      chartId: "",
      display: "",
      datasets: [],
      labels: [],
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      colorHover: []
    };
  },
  watch: {
    $props: {
      handler() {
        this.chartId && (this.resetData(), this.getData(), this.createChart());
      },
      deep: !0,
      immediate: !0
    }
  },
  created() {
    Hi(), this.chartId = "dsfr-chart-" + Math.floor(Math.random() * 1e3), this.widgetId = "dsfr-widget-" + Math.floor(Math.random() * 1e3);
  },
  mounted() {
    this.resetData(), this.createChart(), this.display = this.$refs[this.widgetId].offsetWidth > 486 ? "big" : "small", document.documentElement.addEventListener("dsfr.theme", (t) => {
      this.chartId !== "" && this.changeColors(t.detail.theme);
    });
  },
  methods: {
    resetData() {
      this.chart && this.chart.destroy(), this.display = "", this.datasets = [], this.labels = [], this.xparse = [], this.yparse = [], this.nameParse = [], this.tmpColorParse = [], this.colorParse = [], this.colorHover = [];
    },
    getData() {
      try {
        this.xparse = JSON.parse(this.x), this.yparse = JSON.parse(this.y);
      } catch (t) {
        console.error("Erreur lors du parsing des données x ou y:", t);
        return;
      }
      let e = [];
      if (this.name)
        try {
          e = JSON.parse(this.name);
        } catch (t) {
          console.error("Erreur lors du parsing de name:", t);
        }
      for (let t = 0; t < this.yparse.length; t++)
        e[t] ? this.nameParse.push(e[t]) : this.nameParse.push("Série " + (t + 1));
      this.labels = this.xparse[0], this.loadColors(), this.datasets = this.yparse.map((t, n) => ({
        pointRadius: 5,
        pointHoverRadius: 5,
        data: t,
        borderColor: this.colorParse[n],
        pointBackgroundColor: this.colorParse[n],
        backgroundColor: tt(this.colorParse[n]).alpha(0.3).hex(),
        fill: !0,
        hoverBorderColor: this.colorHover[n],
        hoverBackgroundColor: this.colorHover[n]
      }));
    },
    loadColors() {
      const { colorParse: e, colorHover: t } = cc({
        yparse: this.yparse.map(() => [1]),
        // Simule une série avec une valeur unique
        tmpColorParse: this.tmpColorParse,
        selectedPalette: this.selectedPalette
      });
      this.colorParse = e.map((n) => n[0]), this.colorHover = t.map((n) => n[0]);
    },
    choosePalette() {
      return Le(this.selectedPalette);
    },
    changeColors(e) {
      this.loadColors(), this.chart.data.datasets.forEach((t, n) => {
        t.borderColor = this.colorParse[n], t.pointBorderColor = this.colorParse[n], t.pointBackgroundColor = this.colorParse[n], t.hoverBorderColor = this.colorHover[n], t.hoverBackgroundColor = this.colorHover[n], t.pointHoverBorderColor = this.colorHover[n], t.pointHoverBackgroundColor = this.colorHover[n];
      }), this.chart.options.scales.r.pointLabels.color = e === "dark" ? "#cecece" : ut.defaults.color, this.chart.update("none");
    },
    createChart() {
      this.chart && this.chart.destroy(), this.getData();
      const e = this.$refs[this.chartId].getContext("2d");
      this.chart = new ut(e, {
        type: "radar",
        data: {
          labels: this.labels,
          datasets: this.datasets
        },
        options: {
          aspectRatio: this.aspectRatio,
          scales: {
            r: {
              angleLines: {
                display: !0,
                borderDash: [3, 3]
              },
              ticks: {
                display: !1
              },
              grid: {
                color: "#6b6b6b"
              }
            }
          },
          plugins: {
            legend: {
              display: !1
            },
            tooltip: {
              enabled: !1,
              mode: "index",
              displayColors: !1,
              backgroundColor: "#6b6b6b",
              callbacks: {
                label: (t) => {
                  const n = [];
                  return this.datasets.forEach((i) => {
                    n.push(i.data[t.dataIndex]);
                  }), n;
                },
                title: (t) => t[0].label,
                labelTextColor: () => this.colorParse
              },
              external: (t) => {
                const i = (document.getElementById(this.databoxId + "-" + this.databoxType + "-" + this.databoxSource) || this.$el.nextElementSibling).querySelector(".tooltip"), s = t.tooltip;
                if (!i) return;
                if (!s || s.opacity === 0) {
                  i.style.opacity = 0;
                  return;
                }
                if (i.classList.remove("above", "below", "no-transform"), s.yAlign ? i.classList.add(s.yAlign) : i.classList.add("no-transform"), s.body) {
                  const d = [this.xparse[0][s.dataPoints[0].dataIndex]], u = s.body.map((m) => m.lines), f = i.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
                  f.innerHTML = d[0];
                  const g = i.querySelector(".tooltip_value");
                  g.innerHTML = "", u[0].forEach((m, v) => {
                    if (m && s.dataPoints[v]) {
                      const _ = s.dataPoints[v].datasetIndex, S = this.colorParse[_] ? this.colorParse[_] : "#000", E = `${m}${this.unitTooltip ? " " + this.unitTooltip : ""}`;
                      g.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" style="background-color:${S};"></span>
                          <p class="tooltip_place fr-mb-0">${E}</p>
                        </div>
                      `;
                    }
                  });
                }
                const { offsetLeft: r, offsetTop: o } = this.chart.canvas, l = Number(this.chart.canvas.style.width.replace(/\D/g, "")), a = Number(this.chart.canvas.style.height.replace(/\D/g, ""));
                let c = r + s.caretX + 10, h = o + s.caretY - 20;
                c + i.clientWidth > r + l && (c = r + s.caretX - i.clientWidth - 10), h + i.clientHeight > o + 0.9 * a && (h = o + s.caretY - i.clientHeight + 20), c < r && (c = r + s.caretX - i.clientWidth / 2, h = o + s.caretY - i.clientHeight - 20), i.style.position = "absolute", i.style.padding = s.padding + "px " + s.padding + "px", i.style.pointerEvents = "none", i.style.left = c + "px", i.style.top = h + "px", i.style.opacity = 1;
              }
            }
          }
        }
      });
    }
  }
}, i8 = { class: "fr-col-12" }, s8 = { class: "chart" }, o8 = { class: "chart_legend fr-mb-0 fr-mt-4v" }, r8 = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, l8 = {
  key: 0,
  class: "flex fr-mt-1w"
}, a8 = { class: "fr-text--xs" };
function c8(e, t, n, i, s, r) {
  var o;
  return V(), Ce(Fe, {
    disabled: !((o = e.$el) != null && o.ownerDocument.getElementById(n.databoxId)) || !n.databoxId && !n.databoxType && n.databoxSource === "default",
    to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource
  }, [
    p("div", {
      ref: s.widgetId,
      class: "widget_container fr-grid-row"
    }, [
      p("div", i8, [
        p("div", s8, [
          t[0] || (t[0] = p("div", { class: "tooltip" }, [
            p("div", { class: "tooltip_header fr-text--sm fr-mb-0" }),
            p("div", { class: "tooltip_body" }, [
              p("div", { class: "tooltip_value" }, [
                p("span", { class: "tooltip_dot" })
              ])
            ])
          ], -1)),
          p("canvas", { ref: s.chartId }, null, 512),
          p("div", o8, [
            (V(!0), W(vt, null, Ft(s.nameParse, (l, a) => (V(), W("div", {
              key: a,
              class: "flex fr-mt-3v fr-mb-1v"
            }, [
              p("span", {
                class: "legende_dot",
                style: C({ "background-color": s.colorParse[a] })
              }, null, 4),
              p("p", r8, X(e.capitalize(l)), 1)
            ]))), 128))
          ]),
          n.date ? (V(), W("div", l8, [
            p("p", a8, " Mise à jour : " + X(n.date), 1)
          ])) : Ct("", !0)
        ])
      ])
    ], 512)
  ], 8, ["disabled", "to"]);
}
const h8 = /* @__PURE__ */ jt(n8, [["render", c8]]);
ut.register(Fo);
const d8 = {
  name: "ScatterChart",
  mixins: [Ln],
  props: {
    databoxId: {
      type: String,
      default: null
    },
    databoxType: {
      type: String,
      default: null
    },
    databoxSource: {
      type: String,
      default: "default"
    },
    x: {
      type: String,
      required: !0
    },
    y: {
      type: String,
      required: !0
    },
    xMin: {
      type: [Number, String],
      default: ""
    },
    xMax: {
      type: [Number, String],
      default: ""
    },
    yMin: {
      type: [Number, String],
      default: ""
    },
    yMax: {
      type: [Number, String],
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    vline: {
      type: String,
      default: ""
    },
    vlinecolor: {
      type: String,
      default: ""
    },
    vlinename: {
      type: String,
      default: ""
    },
    hline: {
      type: String,
      default: ""
    },
    hlinecolor: {
      type: String,
      default: ""
    },
    hlinename: {
      type: String,
      default: ""
    },
    showLine: {
      type: [Boolean, String],
      default: !1
    },
    date: {
      type: String,
      default: ""
    },
    aspectRatio: {
      type: [Number, String],
      default: 2
    },
    formatDate: {
      type: [Boolean, String],
      default: !1
    },
    selectedPalette: {
      type: String,
      default: ""
    },
    unitTooltip: {
      type: String,
      default: ""
    }
  },
  data() {
    return this.chart = void 0, {
      widgetId: "",
      chartId: "",
      display: "",
      datasets: [],
      xAxisType: "category",
      labels: [],
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      colorHover: []
    };
  },
  watch: {
    $props: {
      handler() {
        this.chartId && (this.resetData(), this.getData(), this.createChart());
      },
      deep: !0,
      immediate: !0
    }
  },
  created() {
    Hi(), this.chartId = "dsfr-chart-" + Math.floor(Math.random() * 1e3), this.widgetId = "dsfr-widget-" + Math.floor(Math.random() * 1e3);
  },
  mounted() {
    this.resetData(), this.createChart(), this.display = this.$refs[this.widgetId].offsetWidth > 486 ? "big" : "small", document.documentElement.addEventListener("dsfr.theme", (t) => {
      this.chartId !== "" && this.changeColors(t.detail.theme);
    });
  },
  methods: {
    resetData() {
      this.chart && this.chart.destroy(), this.datasets = [], this.xAxisType = "category", this.labels = [], this.xparse = [], this.yparse = [], this.nameParse = [], this.tmpColorParse = [], this.colorParse = [], this.vlineParse = [], this.vlineColorParse = [], this.tmpVlineColorParse = [], this.vlineNameParse = [], this.hlineParse = [], this.hlineColorParse = [], this.tmpHlineColorParse = [], this.hlineNameParse = [], this.colorHover = [];
    },
    getData() {
      try {
        this.xparse = JSON.parse(this.x), this.yparse = JSON.parse(this.y);
      } catch (n) {
        console.error("Erreur lors du parsing des données x ou y:", n);
        return;
      }
      let e = [];
      if (this.name)
        try {
          e = JSON.parse(this.name);
        } catch (n) {
          console.error("Erreur lors du parsing de name:", n);
        }
      for (let n = 0; n < this.yparse.length; n++)
        e[n] ? this.nameParse.push(e[n]) : this.nameParse.push("Série " + (n + 1));
      if (this.vline) {
        this.vlineParse = JSON.parse(this.vline);
        let n = [];
        this.vlinename && (n = JSON.parse(this.vlinename)), this.vlinecolor && (this.tmpVlineColorParse = JSON.parse(this.vlinecolor));
        for (let i = 0; i < this.vlineParse.length; i++)
          n[i] ? this.vlineNameParse.push(n[i]) : this.vlineNameParse.push("V" + (i + 1));
      }
      if (this.hline) {
        this.hlineParse = JSON.parse(this.hline);
        let n = [];
        this.hlinename && (n = JSON.parse(this.hlinename)), this.hlinecolor && (this.tmpHlineColorParse = JSON.parse(this.hlinecolor));
        for (let i = 0; i < this.hlineParse.length; i++)
          n[i] ? this.hlineNameParse.push(n[i]) : this.hlineNameParse.push("H" + (i + 1));
      }
      let t = [];
      typeof this.xparse[0][0] == "number" ? (this.xparse.forEach((n, i) => {
        const s = [];
        n.map((o) => o).sort((o, l) => o - l).forEach((o) => {
          const l = n.findIndex((a) => a === o);
          s.push({
            x: o,
            y: this.yparse[i][l]
          });
        }), t.push(s);
      }), this.labels = [], this.xAxisType = "linear") : (t = this.yparse, this.labels = this.xparse[0], this.xAxisType = "category"), this.loadColors(), this.datasets = t.map((n, i) => ({
        data: n,
        fill: !1,
        borderColor: this.colorParse[i],
        backgroundColor: this.colorParse[i],
        pointRadius: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: this.colorHover[i],
        pointHoverBorderColor: this.colorHover[i],
        showLine: this.showLine,
        borderWidth: 2,
        tension: 0.4
      }));
    },
    createChart() {
      this.chart && this.chart.destroy(), this.getData();
      const e = this.$refs[this.chartId].getContext("2d");
      this.chart = new ut(e, {
        type: "scatter",
        data: {
          labels: this.labels,
          datasets: this.datasets
        },
        plugins: [
          {
            afterDraw: (t) => {
              var n, i;
              if ((n = t.tooltip) != null && n._active && ((i = t.tooltip) != null && i._active.length)) {
                const { ctx: s } = t, r = t.tooltip.getActiveElements()[0].element.tooltipPosition().x, o = t.tooltip._active[0].index;
                s.save(), s.beginPath(), s.moveTo(r, t.scales.y.top), s.lineTo(r, t.scales.y.bottom), s.lineWidth = 1, s.strokeStyle = this.colorPrecisionBar, s.setLineDash([10, 5]), s.stroke(), s.restore(), this.yparse.forEach((l) => {
                  let a = t.scales.y.getPixelForValue(l[o]);
                  s.save(), s.beginPath(), s.moveTo(t.scales.x.left, a), s.lineTo(t.scales.x.right, a), s.lineWidth = 1, s.strokeStyle = this.colorPrecisionBar, s.setLineDash([10, 5]), s.stroke(), s.restore();
                });
              }
            }
          }
        ],
        options: {
          aspectRatio: this.aspectRatio,
          scales: {
            x: {
              offset: !0,
              type: this.xAxisType,
              grid: {
                drawOnChartArea: !1
              },
              ticks: {
                padding: 10
              },
              ...this.xMin ? { suggestedMin: this.xMin } : {},
              ...this.xMax ? { suggestedMax: this.xMax } : {}
            },
            y: {
              grid: {
                drawTicks: !1
              },
              border: {
                dash: [3]
              },
              ticks: {
                padding: 5,
                maxTicksLimit: 5,
                callback: (t) => t >= 1e9 || t <= -1e9 ? t / 1e9 + "B" : t >= 1e6 || t <= -1e6 ? t / 1e6 + "M" : t >= 1e3 || t <= -1e3 ? t / 1e3 + "K" : t
              },
              ...this.yMin ? { suggestedMin: this.yMin } : {},
              ...this.yMax ? { suggestedMax: this.yMax } : {}
            }
          },
          plugins: {
            legend: {
              display: !1
            },
            tooltip: {
              enabled: !1,
              displayColors: !1,
              backgroundColor: "#6b6b6b",
              callbacks: {
                label: (t) => {
                  const n = [];
                  return this.datasets.forEach((i, s) => {
                    if (this.xAxisType === "linear") {
                      const r = this.xparse[s].indexOf(t.parsed.x);
                      r !== -1 && n.push(this.formatNumber(this.yparse[s][r]));
                    } else
                      n.push(this.formatNumber(i.data[t.dataIndex]));
                  }), n;
                },
                title: (t) => t[0].parsed.x,
                labelTextColor: () => this.colorParse
              },
              external: (t) => {
                const i = (document.getElementById(this.databoxId + "-" + this.databoxType + "-" + this.databoxSource) || this.$el.nextElementSibling).querySelector(".tooltip"), s = t.tooltip;
                if (!i) return;
                if (!s || s.opacity === 0) {
                  i.style.opacity = 0;
                  return;
                }
                if (i.classList.remove("above", "below", "no-transform"), s.yAlign ? i.classList.add(s.yAlign) : i.classList.add("no-transform"), s.body) {
                  const d = s.title || [], u = s.body.map((m) => m.lines), f = i.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
                  f.innerHTML = d[0];
                  const g = i.querySelector(".tooltip_value");
                  g.innerHTML = "", u[0].forEach((m, v) => {
                    const b = `${m}${this.unitTooltip ? " " + this.unitTooltip : ""}`;
                    m && (g.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" style="background-color:${this.colorParse[v]};"></span>
                          <p class="tooltip_place fr-mb-0">${b}</p>
                        </div>
                      `);
                  });
                }
                const { offsetLeft: r, offsetTop: o } = this.chart.canvas, l = Number(this.chart.canvas.style.width.replace(/\D/g, "")), a = Number(this.chart.canvas.style.height.replace(/\D/g, ""));
                let c = r + s.caretX + 10, h = o + s.caretY - 20;
                c + i.clientWidth > r + l && (c = r + s.caretX - i.clientWidth - 10), h + i.clientHeight > o + 0.9 * a && (h = o + s.caretY - i.clientHeight + 20), c < r && (c = r + s.caretX - i.clientWidth / 2, h = o + s.caretY - i.clientHeight - 20), i.style.position = "absolute", i.style.padding = s.padding + "px " + s.padding + "px", i.style.pointerEvents = "none", i.style.left = c + "px", i.style.top = h + "px", i.style.opacity = 1;
              }
            }
          }
        }
      });
    },
    loadColors() {
      const { colorParse: e, colorHover: t, vlineColorParse: n, hlineColorParse: i } = yx({
        yparse: this.yparse,
        tmpColorParse: this.tmpColorParse,
        selectedPalette: this.selectedPalette,
        vlineParse: this.vlineParse,
        tmpVlineColorParse: this.tmpVlineColorParse,
        hlineParse: this.hlineParse,
        tmpHlineColorParse: this.tmpHlineColorParse
      });
      this.colorParse = e, this.colorHover = t, this.vlineColorParse = n, this.hlineColorParse = i;
    },
    choosePalette() {
      return Le(this.selectedPalette);
    },
    changeColors(e) {
      this.loadColors(), this.chart.data.datasets.forEach((t, n) => {
        t.borderColor = this.colorParse[n], t.backgroundColor = this.colorParse[n], t.pointBorderColor = this.colorParse[n], t.pointBackgroundColor = this.colorParse[n], t.hoverBorderColor = this.colorHover[n], t.hoverBackgroundColor = this.colorHover[n], t.pointHoverBorderColor = this.colorHover[n], t.pointHoverBackgroundColor = this.colorHover[n];
      }), this.chart.options.scales.x.ticks.color = e === "dark" ? "#cecece" : ut.defaults.color, this.chart.options.scales.y.ticks.color = e === "dark" ? "#cecece" : ut.defaults.color, this.chart.update("none");
    }
  }
}, u8 = { class: "fr-col-12" }, f8 = { class: "chart" }, p8 = { class: "chart_legend fr-mb-0 fr-mt-4v" }, g8 = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, m8 = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, v8 = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, b8 = {
  key: 0,
  class: "flex fr-mt-1w"
}, y8 = { class: "fr-text--xs" };
function x8(e, t, n, i, s, r) {
  var o;
  return V(), Ce(Fe, {
    disabled: !((o = e.$el) != null && o.ownerDocument.getElementById(n.databoxId)) || !n.databoxId && !n.databoxType && n.databoxSource === "default",
    to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource
  }, [
    p("div", {
      ref: s.widgetId,
      class: "widget_container fr-grid-row"
    }, [
      p("div", u8, [
        p("div", f8, [
          t[0] || (t[0] = p("div", { class: "tooltip" }, [
            p("div", { class: "tooltip_header fr-text--sm fr-mb-0" }),
            p("div", { class: "tooltip_body" }, [
              p("div", { class: "tooltip_value" }, [
                p("span", { class: "tooltip_dot" })
              ])
            ])
          ], -1)),
          p("canvas", { ref: s.chartId }, null, 512),
          p("div", p8, [
            (V(!0), W(vt, null, Ft(s.nameParse, (l, a) => (V(), W("div", {
              key: a,
              class: "flex fr-mt-3v fr-mb-1v"
            }, [
              p("span", {
                class: "legende_dot",
                style: C({ "background-color": s.colorParse[a] })
              }, null, 4),
              p("p", g8, X(e.capitalize(l)), 1)
            ]))), 128))
          ]),
          (V(!0), W(vt, null, Ft(s.hlineNameParse, (l, a) => (V(), W("div", {
            key: a,
            class: "flex fr-mt-3v"
          }, [
            p("span", {
              class: "legende_dash_line",
              style: C({ "background-color": s.hlineColorParse[a] })
            }, null, 4),
            p("span", {
              class: "legende_dash_line legende_dash_line_end",
              style: C({ "background-color": s.hlineColorParse[a] })
            }, null, 4),
            p("p", m8, X(e.capitalize(l)), 1)
          ]))), 128)),
          (V(!0), W(vt, null, Ft(s.vlineNameParse, (l, a) => (V(), W("div", {
            key: a,
            class: "flex fr-mt-3v fr-mb-1v"
          }, [
            p("span", {
              class: "legende_dash_line",
              style: C({ "background-color": s.vlineColorParse[a] })
            }, null, 4),
            p("span", {
              class: "legende_dash_line legende_dash_line_end",
              style: C({ "background-color": s.vlineColorParse[a] })
            }, null, 4),
            p("p", v8, X(e.capitalize(n.name)), 1)
          ]))), 128)),
          n.date ? (V(), W("div", b8, [
            p("p", y8, " Mise à jour : " + X(n.date), 1)
          ])) : Ct("", !0)
        ])
      ])
    ], 512)
  ], 8, ["disabled", "to"]);
}
const k8 = /* @__PURE__ */ jt(d8, [["render", x8]]), w8 = {
  name: "TableChart",
  mixins: [Ln],
  props: {
    databoxId: {
      type: String,
      default: null
    },
    databoxType: {
      type: String,
      default: null
    },
    databoxSource: {
      type: String,
      default: "global"
    },
    x: {
      type: String,
      default: ""
    },
    y: {
      type: String,
      default: ""
    },
    line: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    tableName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      widgetId: "",
      tableId: "",
      xparse: [],
      yparse: [],
      lineParse: [],
      nameParse: []
    };
  },
  watch: {
    $props: {
      handler() {
        this.tableId && (this.resetData(), this.getData());
      },
      deep: !0,
      immediate: !0
    }
  },
  created() {
    this.tableId = "dsfr-table-" + Math.floor(Math.random() * 1e3), this.widgetId = "dsfr-widget-" + Math.floor(Math.random() * 1e3);
  },
  mounted() {
    this.resetData(), this.getData();
  },
  methods: {
    resetData() {
      this.xparse = [], this.yparse = [], this.lineParse = [], this.nameParse = [];
    },
    getData() {
      if (this.x && this.y)
        try {
          this.xparse = JSON.parse(this.x ?? "[]"), this.yparse = JSON.parse(this.y ?? "[]");
        } catch (t) {
          console.error("Erreur lors du parsing des données x ou y:", t);
          return;
        }
      if (this.line)
        try {
          this.lineParse = JSON.parse(this.line ?? "[]");
        } catch (t) {
          console.error("Erreur lors du parsing des données line:", t);
          return;
        }
      let e = [];
      if (this.name)
        try {
          e = JSON.parse(this.name);
        } catch (t) {
          console.error("Erreur lors du parsing de name:", t);
        }
      for (let t = 0; t < this.yparse.length; t++)
        e[t] ? this.nameParse.push(e[t]) : this.nameParse.push("Série " + (t + 1));
      for (let t = 0; t < (this.lineParse.length ? this.lineParse[0].length : 0); t++)
        e[t] ? this.nameParse.push(e[t]) : this.nameParse.push("Série " + (t + 1));
    },
    getClass(e) {
      let t = "";
      return typeof e == "string" && e.replace(/<[^>]*>/g, "").length > 132 && (t += "text-overflow "), typeof e == "number" ? t += "text-right " : t += "text-left ", t;
    }
  }
}, _8 = { class: "fr-table__wrapper" }, M8 = { class: "fr-table__container" }, C8 = { class: "fr-table__content" }, S8 = {
  key: 0,
  scope: "col"
}, E8 = ["innerHTML"];
function P8(e, t, n, i, s, r) {
  var o;
  return V(), Ce(Fe, {
    disabled: !((o = e.$el) != null && o.ownerDocument.getElementById(n.databoxId)) || !n.databoxId && !n.databoxType && n.databoxSource === "global",
    to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource
  }, [
    p("div", {
      ref: s.widgetId,
      class: "widget_container"
    }, [
      p("div", {
        ref: s.tableId,
        class: "fr-table",
        style: { maxHeight: "25rem", overflow: "auto" }
      }, [
        p("div", _8, [
          p("div", M8, [
            p("div", C8, [
              p("table", null, [
                p("caption", null, X(n.tableName), 1),
                p("thead", null, [
                  p("tr", null, [
                    s.xparse.length ? (V(), W("th", S8, X(n.tableName), 1)) : Ct("", !0),
                    (V(!0), W(vt, null, Ft(s.nameParse, (l, a) => (V(), W("th", {
                      key: a,
                      scope: "col"
                    }, X(l), 1))), 128))
                  ])
                ]),
                p("tbody", null, [
                  (V(!0), W(vt, null, Ft(s.xparse, (l, a) => (V(), W("tr", { key: a }, [
                    p("td", {
                      class: ie(r.getClass(l))
                    }, X(l), 3),
                    (V(!0), W(vt, null, Ft(s.yparse, (c, h) => (V(), W("td", {
                      key: h,
                      class: ie(r.getClass(c[a]))
                    }, X(e.formatNumber(c[a])), 3))), 128))
                  ]))), 128)),
                  (V(!0), W(vt, null, Ft(s.lineParse, (l, a) => (V(), W("tr", { key: a }, [
                    (V(!0), W(vt, null, Ft(l, (c, h) => (V(), W("td", {
                      key: h,
                      class: ie(r.getClass(c)),
                      innerHTML: c
                    }, null, 10, E8))), 128))
                  ]))), 128))
                ])
              ])
            ])
          ])
        ])
      ], 512)
    ], 512)
  ], 8, ["disabled", "to"]);
}
const D8 = /* @__PURE__ */ jt(w8, [["render", P8], ["__scopeId", "data-v-9999a2b4"]]);
customElements.define("data-box", /* @__PURE__ */ Te(u5, { shadowRoot: !1 }));
customElements.define("bar-chart", /* @__PURE__ */ Te(Rx, { shadowRoot: !1 }));
customElements.define("bar-line-chart", /* @__PURE__ */ Te(e7, { shadowRoot: !1 }));
customElements.define("gauge-chart", /* @__PURE__ */ Te(b7, { shadowRoot: !1 }));
customElements.define("line-chart", /* @__PURE__ */ Te(F7, { shadowRoot: !1 }));
customElements.define("map-chart", /* @__PURE__ */ Te(Iw, { shadowRoot: !1 }));
customElements.define("map-chart-reg", /* @__PURE__ */ Te(Gw, { shadowRoot: !1 }));
customElements.define("pie-chart", /* @__PURE__ */ Te(e8, { shadowRoot: !1 }));
customElements.define("radar-chart", /* @__PURE__ */ Te(h8, { shadowRoot: !1 }));
customElements.define("scatter-chart", /* @__PURE__ */ Te(k8, { shadowRoot: !1 }));
customElements.define("table-chart", /* @__PURE__ */ Te(D8, { shadowRoot: !1 }));
