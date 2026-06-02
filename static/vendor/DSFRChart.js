//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function e(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var t = {}, n = [], r = () => {}, i = () => !1, a = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), o = (e) => e.startsWith("onUpdate:"), s = Object.assign, c = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, T = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), E = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, D = /-\w/g, O = E((e) => e.replace(D, (e) => e.slice(1).toUpperCase())), ee = /\B([A-Z])/g, te = E((e) => e.replace(ee, "-$1").toLowerCase()), ne = E((e) => e.charAt(0).toUpperCase() + e.slice(1)), re = E((e) => e ? `on${ne(e)}` : ""), ie = (e, t) => !Object.is(e, t), ae = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, oe = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, se = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, ce = (e) => {
	let t = g(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, le, ue = () => le ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function k(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? me(r) : k(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (g(e) || v(e)) return e;
}
var de = /;(?![^(]*\))/g, fe = /:([^]+)/, pe = /\/\*[^]*?\*\//g;
function me(e) {
	let t = {};
	return e.replace(pe, "").split(de).forEach((e) => {
		if (e) {
			let n = e.split(fe);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function he(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = he(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var ge = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", _e = /* @__PURE__ */ e(ge);
ge + "";
function ve(e) {
	return !!e || e === "";
}
function ye(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = be(e[r], t[r]);
	return n;
}
function be(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? ye(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !be(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function xe(e, t) {
	return e.findIndex((e) => be(e, t));
}
var Se = (e) => !!(e && e.__v_isRef === !0), A = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? Se(e) ? A(e.value) : JSON.stringify(e, Ce, 2) : String(e), Ce = (e, t) => Se(t) ? Ce(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[we(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => we(e)) } : _(t) ? we(t) : v(t) && !d(t) && !C(t) ? String(t) : t, we = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, Te, Ee = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && Te && (Te.active ? (this.parent = Te, this.index = (Te.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = Te;
			try {
				return Te = this, e();
			} finally {
				Te = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = Te, Te = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (Te === this) Te = this.prevScope;
			else {
				let e = Te;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function De() {
	return Te;
}
var j, Oe = /* @__PURE__ */ new WeakSet(), ke = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Te && (Te.active ? Te.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Oe.has(this) && (Oe.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ne(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Ke(this), Ie(this);
		let e = j, t = He;
		j = this, He = !0;
		try {
			return this.fn();
		} finally {
			Le(this), j = e, He = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Be(e);
			this.deps = this.depsTail = void 0, Ke(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Oe.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Re(this) && this.run();
	}
	get dirty() {
		return Re(this);
	}
}, Ae = 0, je, Me;
function Ne(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Me, Me = e;
		return;
	}
	e.next = je, je = e;
}
function Pe() {
	Ae++;
}
function Fe() {
	if (--Ae > 0) return;
	if (Me) {
		let e = Me;
		for (Me = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; je;) {
		let t = je;
		for (je = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Ie(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Le(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Be(r), Ve(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Re(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (ze(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function ze(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === qe) || (e.globalVersion = qe, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Re(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = j, r = He;
	j = e, He = !0;
	try {
		Ie(e);
		let n = e.fn(e._value);
		(t.version === 0 || ie(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		j = n, He = r, Le(e), e.flags &= -3;
	}
}
function Be(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Be(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ve(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var He = !0, Ue = [];
function We() {
	Ue.push(He), He = !1;
}
function Ge() {
	let e = Ue.pop();
	He = e === void 0 ? !0 : e;
}
function Ke(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = j;
		j = void 0;
		try {
			t();
		} finally {
			j = e;
		}
	}
}
var qe = 0, Je = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Ye = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!j || !He || j === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== j) t = this.activeLink = new Je(j, this), j.deps ? (t.prevDep = j.depsTail, j.depsTail.nextDep = t, j.depsTail = t) : j.deps = j.depsTail = t, Xe(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = j.depsTail, t.nextDep = void 0, j.depsTail.nextDep = t, j.depsTail = t, j.deps === t && (j.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, qe++, this.notify(e);
	}
	notify(e) {
		Pe();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Fe();
		}
	}
};
function Xe(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Xe(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Ze = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ Symbol(""), $e = /* @__PURE__ */ Symbol(""), et = /* @__PURE__ */ Symbol("");
function tt(e, t, n) {
	if (He && j) {
		let t = Ze.get(e);
		t || Ze.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Ye()), r.map = t, r.key = n), r.track();
	}
}
function nt(e, t, n, r, i, a) {
	let o = Ze.get(e);
	if (!o) {
		qe++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Pe(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === et || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(et)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Qe)), f(e) && s(o.get($e)));
				break;
			case "delete":
				i || (s(o.get(Qe)), f(e) && s(o.get($e)));
				break;
			case "set":
				f(e) && s(o.get(Qe));
				break;
		}
	}
	Fe();
}
function rt(e) {
	let t = /* @__PURE__ */ M(e);
	return t === e ? t : (tt(t, "iterate", et), /* @__PURE__ */ Ht(e) ? t : t.map(Gt));
}
function it(e) {
	return tt(e = /* @__PURE__ */ M(e), "iterate", et), e;
}
function at(e, t) {
	return /* @__PURE__ */ Vt(e) ? Kt(/* @__PURE__ */ Bt(e) ? Gt(t) : t) : Gt(t);
}
var ot = {
	__proto__: null,
	[Symbol.iterator]() {
		return st(this, Symbol.iterator, (e) => at(this, e));
	},
	concat(...e) {
		return rt(this).concat(...e.map((e) => d(e) ? rt(e) : e));
	},
	entries() {
		return st(this, "entries", (e) => (e[1] = at(this, e[1]), e));
	},
	every(e, t) {
		return lt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return lt(this, "filter", e, t, (e) => e.map((e) => at(this, e)), arguments);
	},
	find(e, t) {
		return lt(this, "find", e, t, (e) => at(this, e), arguments);
	},
	findIndex(e, t) {
		return lt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return lt(this, "findLast", e, t, (e) => at(this, e), arguments);
	},
	findLastIndex(e, t) {
		return lt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return lt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return dt(this, "includes", e);
	},
	indexOf(...e) {
		return dt(this, "indexOf", e);
	},
	join(e) {
		return rt(this).join(e);
	},
	lastIndexOf(...e) {
		return dt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return lt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return ft(this, "pop");
	},
	push(...e) {
		return ft(this, "push", e);
	},
	reduce(e, ...t) {
		return ut(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return ut(this, "reduceRight", e, t);
	},
	shift() {
		return ft(this, "shift");
	},
	some(e, t) {
		return lt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return ft(this, "splice", e);
	},
	toReversed() {
		return rt(this).toReversed();
	},
	toSorted(e) {
		return rt(this).toSorted(e);
	},
	toSpliced(...e) {
		return rt(this).toSpliced(...e);
	},
	unshift(...e) {
		return ft(this, "unshift", e);
	},
	values() {
		return st(this, "values", (e) => at(this, e));
	}
};
function st(e, t, n) {
	let r = it(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Ht(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var ct = Array.prototype;
function lt(e, t, n, r, i, a) {
	let o = it(e), s = o !== e && !/* @__PURE__ */ Ht(e), c = o[t];
	if (c !== ct[t]) {
		let t = c.apply(e, a);
		return s ? Gt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, at(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function ut(e, t, n, r) {
	let i = it(e), a = i !== e && !/* @__PURE__ */ Ht(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = at(e, t)), n.call(this, t, at(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? at(e, c) : c;
}
function dt(e, t, n) {
	let r = /* @__PURE__ */ M(e);
	tt(r, "iterate", et);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Ut(n[0]) ? (n[0] = /* @__PURE__ */ M(n[0]), r[t](...n)) : i;
}
function ft(e, t, n = []) {
	We(), Pe();
	let r = (/* @__PURE__ */ M(e))[t].apply(e, n);
	return Fe(), Ge(), r;
}
var pt = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), mt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function ht(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ M(this);
	return tt(t, "has", e), t.hasOwnProperty(e);
}
var gt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Pt : Nt : i ? Mt : jt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = ot[t])) return e;
			if (t === "hasOwnProperty") return ht;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ qt(e) ? e : n);
		if ((_(t) ? mt.has(t) : pt(t)) || (r || tt(e, "get", t), i)) return o;
		if (/* @__PURE__ */ qt(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Rt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Rt(o) : /* @__PURE__ */ It(o) : o;
	}
}, _t = class extends gt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Vt(i);
			if (!/* @__PURE__ */ Ht(n) && !/* @__PURE__ */ Vt(n) && (i = /* @__PURE__ */ M(i), n = /* @__PURE__ */ M(n)), !a && /* @__PURE__ */ qt(i) && !/* @__PURE__ */ qt(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ qt(e) ? e : r);
		return e === /* @__PURE__ */ M(r) && (o ? ie(n, i) && nt(e, "set", t, n, i) : nt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && nt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !mt.has(t)) && tt(e, "has", t), n;
	}
	ownKeys(e) {
		return tt(e, "iterate", d(e) ? "length" : Qe), Reflect.ownKeys(e);
	}
}, vt = class extends gt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, yt = /* @__PURE__ */ new _t(), bt = /* @__PURE__ */ new vt(), xt = /* @__PURE__ */ new _t(!0), St = (e) => e, Ct = (e) => Reflect.getPrototypeOf(e);
function wt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ M(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? St : t ? Kt : Gt;
		return !t && tt(a, "iterate", l ? $e : Qe), s(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: c ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function Tt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Et(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ M(r), a = /* @__PURE__ */ M(n);
			e || (ie(n, a) && tt(i, "get", n), tt(i, "get", a));
			let { has: o } = Ct(i), s = t ? St : e ? Kt : Gt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && tt(/* @__PURE__ */ M(t), "iterate", Qe), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ M(n), i = /* @__PURE__ */ M(t);
			return e || (ie(t, i) && tt(r, "has", t), tt(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ M(a), s = t ? St : e ? Kt : Gt;
			return !e && tt(o, "iterate", Qe), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: Tt("add"),
		set: Tt("set"),
		delete: Tt("delete"),
		clear: Tt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ M(this), r = Ct(n), i = /* @__PURE__ */ M(e), a = !t && !/* @__PURE__ */ Ht(e) && !/* @__PURE__ */ Vt(e) ? i : e;
			return r.has.call(n, a) || ie(e, a) && r.has.call(n, e) || ie(i, a) && r.has.call(n, i) || (n.add(a), nt(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Ht(n) && !/* @__PURE__ */ Vt(n) && (n = /* @__PURE__ */ M(n));
			let r = /* @__PURE__ */ M(this), { has: i, get: a } = Ct(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ M(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? ie(n, s) && nt(r, "set", e, n, s) : nt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ M(this), { has: n, get: r } = Ct(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ M(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && nt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ M(this), t = e.size !== 0, n = e.clear();
			return t && nt(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = wt(r, e, t);
	}), n;
}
function Dt(e, t) {
	let n = Et(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var Ot = { get: /* @__PURE__ */ Dt(!1, !1) }, kt = { get: /* @__PURE__ */ Dt(!1, !0) }, At = { get: /* @__PURE__ */ Dt(!0, !1) }, jt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ new WeakMap();
function Ft(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function It(e) {
	return /* @__PURE__ */ Vt(e) ? e : zt(e, !1, yt, Ot, jt);
}
// @__NO_SIDE_EFFECTS__
function Lt(e) {
	return zt(e, !1, xt, kt, Mt);
}
// @__NO_SIDE_EFFECTS__
function Rt(e) {
	return zt(e, !0, bt, At, Nt);
}
function zt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Ft(S(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Bt(e) {
	return /* @__PURE__ */ Vt(e) ? /* @__PURE__ */ Bt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ht(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function M(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ M(t) : e;
}
function Wt(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && oe(e, "__v_skip", !0), e;
}
var Gt = (e) => v(e) ? /* @__PURE__ */ It(e) : e, Kt = (e) => v(e) ? /* @__PURE__ */ Rt(e) : e;
// @__NO_SIDE_EFFECTS__
function qt(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Jt(e) {
	return Yt(e, !1);
}
function Yt(e, t) {
	return /* @__PURE__ */ qt(e) ? e : new Xt(e, t);
}
var Xt = class {
	constructor(e, t) {
		this.dep = new Ye(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ M(e), this._value = t ? e : Gt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Ht(e) || /* @__PURE__ */ Vt(e);
		e = n ? e : /* @__PURE__ */ M(e), ie(e, t) && (this._rawValue = e, this._value = n ? e : Gt(e), this.dep.trigger());
	}
};
function Zt(e) {
	return /* @__PURE__ */ qt(e) ? e.value : e;
}
var Qt = {
	get: (e, t, n) => t === "__v_raw" ? e : Zt(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ qt(i) && !/* @__PURE__ */ qt(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function $t(e) {
	return /* @__PURE__ */ Bt(e) ? e : new Proxy(e, Qt);
}
var en = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Ye(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qe - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && j !== this) return Ne(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return ze(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function tn(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new en(r, i, n);
}
var nn = {}, rn = /* @__PURE__ */ new WeakMap(), an = void 0;
function on(e, t = !1, n = an) {
	if (n) {
		let t = rn.get(n);
		t || rn.set(n, t = []), t.push(e);
	}
}
function sn(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ Ht(e) || o === !1 || o === 0 ? cn(e, 1) : cn(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ qt(e) ? (g = () => e.value, y = /* @__PURE__ */ Ht(e)) : /* @__PURE__ */ Bt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Bt(e) || /* @__PURE__ */ Ht(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ qt(e)) return e.value;
		if (/* @__PURE__ */ Bt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			We();
			try {
				_();
			} finally {
				Ge();
			}
		}
		let t = an;
		an = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			an = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => cn(e(), t);
	}
	let x = De(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			e(...t), S();
		};
	}
	let C = b ? Array(e.length).fill(nn) : nn, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (n) {
			let e = m.run();
			if (o || y || (b ? e.some((e, t) => ie(e, C[t])) : ie(e, C))) {
				_ && _();
				let t = an;
				an = m;
				try {
					let t = [
						e,
						C === nn ? void 0 : b && C[0] === nn ? [] : C,
						v
					];
					C = e, f ? f(n, 3, t) : n(...t);
				} finally {
					an = t;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new ke(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => on(e, !1, m), _ = m.onStop = () => {
		let e = rn.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			rn.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function cn(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ qt(e)) cn(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) cn(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		cn(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) cn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && cn(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function ln(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		dn(e, t, n);
	}
}
function un(e, t, n, r) {
	if (h(e)) {
		let i = ln(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			dn(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(un(e[a], t, n, r));
		return i;
	}
}
function dn(e, n, r, i = !0) {
	let a = n ? n.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = n && n.appContext.config || t;
	if (n) {
		let t = n.parent, i = n.proxy, a = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; t;) {
			let n = t.ec;
			if (n) {
				for (let t = 0; t < n.length; t++) if (n[t](e, i, a) === !1) return;
			}
			t = t.parent;
		}
		if (o) {
			We(), ln(o, null, 10, [
				e,
				i,
				a
			]), Ge();
			return;
		}
	}
	fn(e, r, a, i, s);
}
function fn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var pn = [], mn = -1, hn = [], gn = null, _n = 0, vn = /* @__PURE__ */ Promise.resolve(), yn = null;
function bn(e) {
	let t = yn || vn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function xn(e) {
	let t = mn + 1, n = pn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = pn[r], a = Dn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Sn(e) {
	if (!(e.flags & 1)) {
		let t = Dn(e), n = pn[pn.length - 1];
		!n || !(e.flags & 2) && t >= Dn(n) ? pn.push(e) : pn.splice(xn(t), 0, e), e.flags |= 1, Cn();
	}
}
function Cn() {
	yn ||= vn.then(On);
}
function wn(e) {
	d(e) ? hn.push(...e) : gn && e.id === -1 ? gn.splice(_n + 1, 0, e) : e.flags & 1 || (hn.push(e), e.flags |= 1), Cn();
}
function Tn(e, t, n = mn + 1) {
	for (; n < pn.length; n++) {
		let t = pn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			pn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function En(e) {
	if (hn.length) {
		let e = [...new Set(hn)].sort((e, t) => Dn(e) - Dn(t));
		if (hn.length = 0, gn) {
			gn.push(...e);
			return;
		}
		for (gn = e, _n = 0; _n < gn.length; _n++) {
			let e = gn[_n];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		gn = null, _n = 0;
	}
}
var Dn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function On(e) {
	try {
		for (mn = 0; mn < pn.length; mn++) {
			let e = pn[mn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), ln(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; mn < pn.length; mn++) {
			let e = pn[mn];
			e && (e.flags &= -2);
		}
		mn = -1, pn.length = 0, En(e), yn = null, (pn.length || hn.length) && On(e);
	}
}
var kn = null, An = null;
function jn(e) {
	let t = kn;
	return kn = e, An = e && e.type.__scopeId || null, t;
}
function Mn(e, t = kn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && na(-1);
		let i = jn(t), a;
		try {
			a = e(...n);
		} finally {
			jn(i), r._d && na(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Nn(e, n) {
	if (kn === null) return e;
	let r = La(kn), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && cn(o), i.push({
			dir: a,
			instance: r,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function Pn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (We(), un(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Ge());
	}
}
function Fn(e, t) {
	if (xa) {
		let n = xa.provides, r = xa.parent && xa.parent.provides;
		r === n && (n = xa.provides = Object.create(r)), n[e] = t;
	}
}
function In(e, t, n = !1) {
	let r = Sa();
	if (r || ai) {
		let i = ai ? ai._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
var Ln = /* @__PURE__ */ Symbol.for("v-scx"), Rn = () => In(Ln);
function zn(e, t, n) {
	return Bn(e, t, n);
}
function Bn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (Oa) {
		if (c === "sync") {
			let e = Rn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = xa;
	u.call = (e, t, n) => un(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		Ii(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Sn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = sn(e, n, u);
	return Oa && (f ? f.push(h) : d && h()), h;
}
function Vn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Hn(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = Ta(this), s = Bn(i, a.bind(r), n);
	return o(), s;
}
function Hn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Un = /* @__PURE__ */ new WeakMap(), Wn = /* @__PURE__ */ Symbol("_vte"), Gn = (e) => e.__isTeleport, Kn = (e) => e && (e.disabled || e.disabled === ""), qn = (e) => e && (e.defer || e.defer === ""), Jn = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Yn = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Xn = (e, t) => {
	let n = e && e.to;
	return g(n) ? t ? t(n) : null : n;
}, Zn = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g, parentNode: _ } } = l, v = Kn(t.props), { dynamicChildren: y } = t, b = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, x = (e = t) => {
			let n = Kn(e.props), r = e.target = Xn(e.props, m), a = nr(r, e, h, p);
			r && (o !== "svg" && Jn(r) ? o = "svg" : o !== "mathml" && Yn(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (b(e, r, a), tr(e, !1)));
		}, S = (e) => {
			let t = () => {
				Un.get(e) === t && (Un.delete(e), Kn(e.props) && (b(e, _(e.el) || n, e.anchor), tr(e, !0)), x(e));
			};
			Un.set(e, t), Ii(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), qn(t.props) || a && a.pendingBranch) {
				S(t);
				return;
			}
			v && (b(t, n, i), tr(t, !0)), x();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Un.get(e);
			if (u) {
				u.flags |= 8, Un.delete(e), S(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = Kn(e.props), _ = g ? n : p, b = g ? r : h;
			if (o === "svg" || Jn(p) ? o = "svg" : (o === "mathml" || Yn(p)) && (o = "mathml"), y ? (f(e.dynamicChildren, y, _, i, a, o, s), Hi(e, t, !0)) : c || d(e, t, _, b, i, a, o, s, !1), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Qn(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = t.target = Xn(t.props, m);
				e && Qn(t, e, null, l, 0);
			} else g && Qn(t, p, h, l, 1);
			tr(t, v);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = a || !Kn(f), m = Un.get(e);
		if (m && (m.flags |= 8, Un.delete(e)), d && (i(l), i(u)), a && i(c), !m && o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, p, !!i.dynamicChildren);
		}
	},
	move: Qn,
	hydrate: $n
};
function Qn(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), !Un.has(e) && (!d || Kn(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function $n(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
	function f(e, n) {
		let r = n;
		for (; r;) {
			if (r && r.nodeType === 8) {
				if (r.data === "teleport start anchor") t.targetStart = r;
				else if (r.data === "teleport anchor") {
					t.targetAnchor = r, e._lpa = t.targetAnchor && o(t.targetAnchor);
					break;
				}
			}
			r = o(r);
		}
	}
	function p(e, t) {
		t.anchor = d(o(e), t, s(e), n, r, i, a);
	}
	let m = t.target = Xn(t.props, c), h = Kn(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || nr(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || nr(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), tr(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var er = Zn;
function tr(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function nr(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[Wn] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var rr = /* @__PURE__ */ Symbol("_leaveCb");
function ir(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, ir(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function ar(e, t) {
	return h(e) ? /* @__PURE__ */ s({ name: e.name }, t, { setup: e }) : e;
}
function or(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function sr(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var cr = /* @__PURE__ */ new WeakMap();
function lr(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => lr(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (dr(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && lr(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? La(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ M(v), b = v === t ? i : (e) => sr(_, e) ? !1 : u(y, e), x = (e, t) => !(t && sr(_, t));
	if (m != null && m !== p) {
		if (ur(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ qt(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) ln(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ qt(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? v[p] : _[p] : x(p) || !e.k ? p.value : _[e.k];
					if (o) d(n) && c(n, s);
					else if (d(n)) n.includes(s) || n.push(s);
					else if (t) _[p] = [s], b(p) && (v[p] = _[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (_[e.k] = t);
					}
				} else t ? (_[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (_[e.k] = l));
			};
			if (l) {
				let t = () => {
					i(), cr.delete(e);
				};
				t.id = -1, cr.set(e, t), Ii(t, r);
			} else ur(e), i();
		}
	}
}
function ur(e) {
	let t = cr.get(e);
	t && (t.flags |= 8, cr.delete(e));
}
ue().requestIdleCallback, ue().cancelIdleCallback;
var dr = (e) => !!e.type.__asyncLoader, fr = (e) => e.type.__isKeepAlive;
function pr(e, t) {
	hr(e, "a", t);
}
function mr(e, t) {
	hr(e, "da", t);
}
function hr(e, t, n = xa) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (_r(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) fr(e.parent.vnode) && gr(r, t, n, e), e = e.parent;
	}
}
function gr(e, t, n, r) {
	let i = _r(t, e, r, !0);
	wr(() => {
		c(r[t], i);
	}, n);
}
function _r(e, t, n = xa, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			We();
			let i = Ta(n), a = un(t, n, e, r);
			return i(), Ge(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var vr = (e) => (t, n = xa) => {
	(!Oa || e === "sp") && _r(e, (...e) => t(...e), n);
}, yr = vr("bm"), br = vr("m"), xr = vr("bu"), Sr = vr("u"), Cr = vr("bum"), wr = vr("um"), Tr = vr("sp"), Er = vr("rtg"), Dr = vr("rtc");
function Or(e, t = xa) {
	_r("ec", e, t);
}
var kr = "components";
function Ar(e, t) {
	return Nr(kr, e, !0, t) || e;
}
var jr = /* @__PURE__ */ Symbol.for("v-ndc");
function Mr(e) {
	return g(e) ? Nr(kr, e, !1) || e : e || jr;
}
function Nr(e, t, n = !0, r = !1) {
	let i = kn || xa;
	if (i) {
		let n = i.type;
		if (e === kr) {
			let e = Ra(n, !1);
			if (e && (e === t || e === O(t) || e === ne(O(t)))) return n;
		}
		let a = Pr(i[e] || n[e], t) || Pr(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function Pr(e, t) {
	return e && (e[t] || e[O(t)] || e[ne(O(t))]);
}
function Fr(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ Bt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Ht(e), s = /* @__PURE__ */ Vt(e), e = it(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Kt(Gt(e[n])) : Gt(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (v(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
	else {
		let n = Object.keys(e);
		i = Array(n.length);
		for (let r = 0, o = n.length; r < o; r++) {
			let o = n[r];
			i[r] = t(e[o], o, r, a && a[r]);
		}
	}
	else i = [];
	return n && (n[r] = i), i;
}
var Ir = (e) => e ? Da(e) ? La(e) : Ir(e.parent) : null, Lr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Ir(e.parent),
	$root: (e) => Ir(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Kr(e),
	$forceUpdate: (e) => e.f ||= () => {
		Sn(e.update);
	},
	$nextTick: (e) => e.n ||= bn.bind(e.proxy),
	$watch: (e) => Vn.bind(e)
}), Rr = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), zr = {
	get({ _: e }, n) {
		if (n === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (n[0] !== "$") {
			let e = s[n];
			if (e !== void 0) switch (e) {
				case 1: return i[n];
				case 2: return a[n];
				case 4: return r[n];
				case 3: return o[n];
			}
			else if (Rr(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else Vr && (s[n] = 0);
		}
		let d = Lr[n], f, p;
		if (d) return n === "$attrs" && tt(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return Rr(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || Rr(n, c) || u(o, c) || u(i, c) || u(Lr, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Br(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Vr = !0;
function Hr(e) {
	let t = Kr(e), n = e.proxy, i = e.ctx;
	Vr = !1, t.beforeCreate && Wr(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: T, renderTracked: E, renderTriggered: D, errorCaptured: O, serverPrefetch: ee, expose: te, inheritAttrs: ne, components: re, directives: ie, filters: ae } = t;
	if (u && Ur(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ It(t));
	}
	if (Vr = !0, o) for (let e in o) {
		let t = o[e], a = Ba({
			get: h(t) ? t.bind(n, n) : h(t.get) ? t.get.bind(n, n) : r,
			set: !h(t) && h(t.set) ? t.set.bind(n) : r
		});
		Object.defineProperty(i, e, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		});
	}
	if (c) for (let e in c) Gr(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Fn(t, e[t]);
		});
	}
	f && Wr(f, e, "c");
	function oe(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (oe(yr, p), oe(br, m), oe(xr, g), oe(Sr, _), oe(pr, y), oe(mr, b), oe(Or, O), oe(Dr, E), oe(Er, D), oe(Cr, S), oe(wr, w), oe(Tr, ee), d(te)) if (te.length) {
		let t = e.exposed ||= {};
		te.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	T && e.render === r && (e.render = T), ne != null && (e.inheritAttrs = ne), re && (e.components = re), ie && (e.directives = ie), ee && or(e);
}
function Ur(e, t, n = r) {
	d(e) && (e = Zr(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? In(r.from || n, r.default, !0) : In(r.from || n) : In(r), /* @__PURE__ */ qt(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Wr(e, t, n) {
	un(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Gr(e, t, n, r) {
	let i = r.includes(".") ? Hn(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && zn(i, n);
	} else if (h(e)) zn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => Gr(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && zn(i, r, e);
	}
}
function Kr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => qr(c, e, o, !0)), qr(c, t, o)), v(t) && a.set(t, c), c;
}
function qr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && qr(e, a, n, !0), i && i.forEach((t) => qr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Jr[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Jr = {
	data: Yr,
	props: ei,
	emits: ei,
	methods: $r,
	computed: $r,
	beforeCreate: Qr,
	created: Qr,
	beforeMount: Qr,
	mounted: Qr,
	beforeUpdate: Qr,
	updated: Qr,
	beforeDestroy: Qr,
	beforeUnmount: Qr,
	destroyed: Qr,
	unmounted: Qr,
	activated: Qr,
	deactivated: Qr,
	errorCaptured: Qr,
	serverPrefetch: Qr,
	components: $r,
	directives: $r,
	watch: ti,
	provide: Yr,
	inject: Xr
};
function Yr(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function Xr(e, t) {
	return $r(Zr(e), Zr(t));
}
function Zr(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function Qr(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function $r(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ei(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), Br(e), Br(t ?? {})) : t;
}
function ti(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = Qr(e[r], t[r]);
	return n;
}
function ni() {
	return {
		app: null,
		config: {
			isNativeTag: i,
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
var ri = 0;
function ii(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = ni(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: ri++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Va,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && h(e.install) ? (a.add(e), e.install(l, ...t)) : h(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, s) {
				if (!c) {
					let u = l._ceVNode || L(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, La(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (un(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = ai;
				ai = l;
				try {
					return e();
				} finally {
					ai = t;
				}
			}
		};
		return l;
	};
}
var ai = null, oi = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${O(t)}Modifiers`] || e[`${te(t)}Modifiers`];
function si(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && oi(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(se)));
	let c, l = i[c = re(n)] || i[c = re(O(n))];
	!l && o && (l = i[c = re(te(n))]), l && un(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, un(u, e, 6, a);
	}
}
var ci = /* @__PURE__ */ new WeakMap();
function li(e, t, n = !1) {
	let r = n ? ci : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = li(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function ui(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, te(t)) || u(e, t));
}
function di(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = jn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = pa(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = pa(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : fi(c);
		}
	} catch (t) {
		Qi.length = 0, dn(t, e, 1), v = L(Xi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = pi(y, a)), b = da(b, y, !1, !0));
	}
	return n.dirs && (b = da(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ir(b, n.transition), v = b, jn(_), v;
}
var fi = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, pi = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function mi(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? hi(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (gi(o, r, n) && !ui(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? hi(r, o, l) : !0 : !!o;
	return !1;
}
function hi(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (gi(t, e, a) && !ui(n, a)) return !0;
	}
	return !1;
}
function gi(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !be(r, i) : r !== i;
}
function _i({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var vi = {}, yi = () => Object.create(vi), bi = (e) => Object.getPrototypeOf(e) === vi;
function xi(e, t, n, r = !1) {
	let i = {}, a = yi();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Ci(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ Lt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function Si(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ M(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (ui(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = O(o);
					i[t] = wi(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		Ci(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = te(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = wi(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && nt(e.attrs, "set", "");
}
function Ci(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (T(t)) continue;
		let l = n[t], d;
		a && u(a, d = O(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : ui(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ M(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = wi(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function wi(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Ta(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === te(n)) && (r = !0));
	}
	return r;
}
var Ti = /* @__PURE__ */ new WeakMap();
function Ei(e, r, i = !1) {
	let a = i ? Ti : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = Ei(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = O(c[e]);
		Di(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = O(e);
		if (Di(t)) {
			let n = c[e], r = l[t] = d(n) || h(n) ? { type: n } : s({}, n), i = r.type, a = !1, o = !0;
			if (d(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = h(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				} else n === "String" && (o = !1);
			}
			else a = h(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || u(r, "default")) && f.push(t);
		}
	}
	let m = [l, f];
	return v(e) && a.set(e, m), m;
}
function Di(e) {
	return e[0] !== "$" && !T(e);
}
var Oi = (e) => e === "_" || e === "_ctx" || e === "$stable", ki = (e) => d(e) ? e.map(pa) : [pa(e)], Ai = (e, t, n) => {
	if (t._n) return t;
	let r = Mn((...e) => ki(t(...e)), n);
	return r._c = !1, r;
}, ji = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Oi(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = Ai(n, i, r);
		else if (i != null) {
			let e = ki(i);
			t[n] = () => e;
		}
	}
}, Mi = (e, t) => {
	let n = ki(t);
	e.slots.default = () => n;
}, Ni = (e, t, n) => {
	for (let r in t) (n || !Oi(r)) && (e[r] = t[r]);
}, Pi = (e, t, n) => {
	let r = e.slots = yi();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Ni(r, t, n), n && oe(r, "_", e, !0)) : ji(t, r);
	} else t && Mi(e, t);
}, Fi = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : Ni(a, n, r) : (o = !n.$stable, ji(n, a)), s = n;
	} else n && (Mi(e, n), s = { default: 1 });
	if (o) for (let e in a) !Oi(e) && s[e] == null && delete a[e];
}, Ii = Ji;
function Li(e) {
	return Ri(e);
}
function Ri(e, i) {
	let a = ue();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !oa(e, t) && (r = ye(e), me(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Yi:
				y(e, t, n, r);
				break;
			case Xi:
				b(e, t, n, r);
				break;
			case Zi:
				e ?? x(t, n, r, o);
				break;
			case N:
				re(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? ie(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, Se);
		}
		u != null && i ? lr(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && lr(e.ref, null, a, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) E(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), ee(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, E = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && O(e.children, d, null, r, i, zi(e, a), s, u), _ && Pn(e, null, r, "created"), D(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !T(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && _a(f, r, e);
		}
		_ && Pn(e, null, r, "beforeMount");
		let v = Vi(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && Ii(() => {
			try {
				f && _a(f, r, e), v && g.enter(d), _ && Pn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, D = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || qi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				D(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, O = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? ma(e[l]) : pa(e[l]), t, n, r, i, a, o, s);
	}, ee = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Bi(r, !1), (g = h.onVnodeBeforeUpdate) && _a(g, r, n, e), f && Pn(n, e, r, "beforeUpdate"), r && Bi(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? te(e.dynamicChildren, d, l, r, i, zi(n, a), o) : s || k(e, n, l, null, r, i, zi(n, a), o, !1), u > 0) {
			if (u & 16) ne(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && ne(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && Ii(() => {
			g && _a(g, r, n, e), f && Pn(n, e, r, "updated");
		}, i);
	}, te = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === N || !oa(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
		}
	}, ne = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !T(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (T(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, re = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), O(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (te(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Hi(e, t, !0)) : k(e, t, n, f, i, a, s, c, l);
	}, ie = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : oe(t, n, r, i, a, o, c) : se(e, t, c);
	}, oe = (e, t, n, r, i, a, o) => {
		let s = e.component = ba(e, r, i);
		if (fr(e) && (s.ctx.renderer = Se), ka(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ce, o), !e.el) {
				let r = s.subTree = L(Xi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ce(s, e, t, n, i, a, o);
	}, se = (e, t, n) => {
		let r = t.component = e.component;
		if (mi(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			le(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, ce = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Wi(e);
					if (n) {
						t && (t.el = c.el, le(e, t, o)), n.asyncDep.then(() => {
							Ii(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Bi(e, !1), t ? (t.el = c.el, le(e, t, o)) : t = c, n && ae(n), (d = t.props && t.props.onVnodeBeforeUpdate) && _a(d, s, t, c), Bi(e, !0);
				let f = di(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ye(p), e, i, a), t.el = f.el, u === null && _i(e, f.el), r && Ii(r, i), (d = t.props && t.props.onVnodeUpdated) && Ii(() => _a(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = dr(t);
				if (Bi(e, !1), l && ae(l), !m && (o = c && c.onVnodeBeforeMount) && _a(o, d, t), Bi(e, !0), s && Ce) {
					let t = () => {
						e.subTree = di(e), Ce(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = di(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && Ii(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					Ii(() => _a(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && dr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && Ii(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new ke(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Sn(u), Bi(e, !0), l();
	}, le = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Si(e, t.props, r, n), Fi(e, t.children, n), We(), Tn(e), Ge();
	}, k = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				fe(l, d, n, r, i, a, o, s, c);
				return;
			} else if (f & 256) {
				de(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && ve(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? fe(l, d, n, r, i, a, o, s, c) : ve(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && O(d, n, r, i, a, o, s, c));
	}, de = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? ma(t[p]) : pa(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? ve(e, a, o, !0, !1, f) : O(t, r, i, a, o, s, c, l, f);
	}, fe = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? ma(t[u]) : pa(t[u]);
			if (oa(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? ma(t[p]) : pa(t[p]);
			if (oa(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? ma(t[u]) : pa(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) me(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? ma(t[u]) : pa(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					me(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && oa(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? me(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Ui(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Ki(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? pe(n, r, p, 2) : _--);
			}
		}
	}, pe = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			pe(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, Se);
			return;
		}
		if (c === N) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) pe(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === Zi) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.persisted && !a[rr] ? o(a, t, n) : (l.beforeEnter(a), o(a, t, n), Ii(() => l.enter(a), i));
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				let e = a._isLeaving || !!a[rr];
				a._isLeaving && a[rr](!0), l.persisted && !e ? u() : r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, me = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (We(), lr(s, null, n, e, !0), Ge()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !dr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && _a(_, t, e), u & 6) _e(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Pn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, Se, r) : l && !l.hasOnce && (a !== N || d > 0 && d & 64) ? ve(l, t, n, !1, !0) : (a === N && d & 384 || !i && u & 16) && ve(c, t, n), r && he(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && Ii(() => {
			_ && _a(_, t, e), h && Pn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, he = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === N) {
			ge(n, r);
			return;
		}
		if (t === Zi) {
			C(e);
			return;
		}
		let a = () => {
			s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (e.shapeFlag & 1 && i && !i.persisted) {
			let { leave: t, delayLeave: r } = i, o = () => t(n, a);
			r ? r(e.el, a, o) : o();
		} else a();
	}, ge = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, _e = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Gi(c), Gi(l), r && ae(r), i.stop(), a && (a.flags |= 8, me(o, e, t, n)), s && Ii(s, t), Ii(() => {
			e.isUnmounted = !0;
		}, t);
	}, ve = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) me(e[o], t, n, r, i);
	}, ye = (e) => {
		if (e.shapeFlag & 6) return ye(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Wn];
		return n ? h(n) : t;
	}, be = !1, xe = (e, t, n) => {
		let r;
		e == null ? t._vnode && (me(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, be ||= (be = !0, Tn(r), En(), !1);
	}, Se = {
		p: v,
		um: me,
		m: pe,
		r: he,
		mt: oe,
		mc: O,
		pc: k,
		pbc: te,
		n: ye,
		o: e
	}, A, Ce;
	return i && ([A, Ce] = i(Se)), {
		render: xe,
		hydrate: A,
		createApp: ii(xe, A)
	};
}
function zi({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Bi({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Vi(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Hi(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = ma(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Hi(t, a)), a.type === Yi && (a.patchFlag === -1 && (a = i[e] = ma(a)), a.el = t.el), a.type === Xi && !a.el && (a.el = t.el);
	}
}
function Ui(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Wi(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Wi(t);
}
function Gi(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Ki(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Ki(t.subTree) : null;
}
var qi = (e) => e.__isSuspense;
function Ji(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : wn(e);
}
var N = /* @__PURE__ */ Symbol.for("v-fgt"), Yi = /* @__PURE__ */ Symbol.for("v-txt"), Xi = /* @__PURE__ */ Symbol.for("v-cmt"), Zi = /* @__PURE__ */ Symbol.for("v-stc"), Qi = [], $i = null;
function P(e = !1) {
	Qi.push($i = e ? null : []);
}
function ea() {
	Qi.pop(), $i = Qi[Qi.length - 1] || null;
}
var ta = 1;
function na(e, t = !1) {
	ta += e, e < 0 && $i && t && ($i.hasOnce = !0);
}
function ra(e) {
	return e.dynamicChildren = ta > 0 ? $i || n : null, ea(), ta > 0 && $i && $i.push(e), e;
}
function F(e, t, n, r, i, a) {
	return ra(I(e, t, n, r, i, a, !0));
}
function ia(e, t, n, r, i) {
	return ra(L(e, t, n, r, i, !0));
}
function aa(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function oa(e, t) {
	return e.type === t.type && e.key === t.key;
}
var sa = ({ key: e }) => e ?? null, ca = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ qt(e) || h(e) ? {
	i: kn,
	r: e,
	k: t,
	f: !!n
} : e);
function I(e, t = null, n = null, r = 0, i = null, a = e === N ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && sa(t),
		ref: t && ca(t),
		scopeId: An,
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
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: kn
	};
	return s ? (ha(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), ta > 0 && !o && $i && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && $i.push(c), c;
}
var L = la;
function la(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === jr) && (e = Xi), aa(e)) {
		let r = da(e, t, !0);
		return n && ha(r, n), ta > 0 && !a && $i && (r.shapeFlag & 6 ? $i[$i.indexOf(e)] = r : $i.push(r)), r.patchFlag = -2, r;
	}
	if (za(e) && (e = e.__vccOpts), t) {
		t = ua(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = he(e)), v(n) && (/* @__PURE__ */ Ut(n) && !d(n) && (n = s({}, n)), t.style = k(n));
	}
	let o = g(e) ? 1 : qi(e) ? 128 : Gn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return I(e, t, n, r, i, o, a, !0);
}
function ua(e) {
	return e ? /* @__PURE__ */ Ut(e) || bi(e) ? s({}, e) : e : null;
}
function da(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? ga(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && sa(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(ca(t)) : [a, ca(t)] : ca(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== N ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && da(e.ssContent),
		ssFallback: e.ssFallback && da(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && ir(u, c.clone(u)), u;
}
function fa(e = " ", t = 0) {
	return L(Yi, null, e, t);
}
function R(e = "", t = !1) {
	return t ? (P(), ia(Xi, null, e)) : L(Xi, null, e);
}
function pa(e) {
	return e == null || typeof e == "boolean" ? L(Xi) : d(e) ? L(N, null, e.slice()) : aa(e) ? ma(e) : L(Yi, null, String(e));
}
function ma(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : da(e);
}
function ha(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), ha(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !bi(t) ? t._ctx = kn : r === 3 && kn && (kn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: kn
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [fa(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function ga(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = he([t.class, r.class]));
		else if (e === "style") t.style = k([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function _a(e, t, n, r = null) {
	un(e, t, 7, [n, r]);
}
var va = ni(), ya = 0;
function ba(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || va, o = {
		uid: ya++,
		vnode: e,
		type: i,
		parent: n,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Ee(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: n ? n.provides : Object.create(a.provides),
		ids: n ? n.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: Ei(i, a),
		emitsOptions: li(i, a),
		emit: null,
		emitted: null,
		propsDefaults: t,
		inheritAttrs: i.inheritAttrs,
		ctx: t,
		data: t,
		props: t,
		attrs: t,
		slots: t,
		refs: t,
		setupState: t,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
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
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = si.bind(null, o), e.ce && e.ce(o), o;
}
var xa = null, Sa = () => xa || kn, Ca, wa;
{
	let e = ue(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Ca = t("__VUE_INSTANCE_SETTERS__", (e) => xa = e), wa = t("__VUE_SSR_SETTERS__", (e) => Oa = e);
}
var Ta = (e) => {
	let t = xa;
	return Ca(e), e.scope.on(), () => {
		e.scope.off(), Ca(t);
	};
}, Ea = () => {
	xa && xa.scope.off(), Ca(null);
};
function Da(e) {
	return e.vnode.shapeFlag & 4;
}
var Oa = !1;
function ka(e, t = !1, n = !1) {
	t && wa(t);
	let { props: r, children: i } = e.vnode, a = Da(e);
	xi(e, r, a, t), Pi(e, i, n || t);
	let o = a ? Aa(e, t) : void 0;
	return t && wa(!1), o;
}
function Aa(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, zr);
	let { setup: r } = n;
	if (r) {
		We();
		let n = e.setupContext = r.length > 1 ? Ia(e) : null, i = Ta(e), a = ln(r, e, 0, [e.props, n]), o = y(a);
		if (Ge(), i(), (o || e.sp) && !dr(e) && or(e), o) {
			if (a.then(Ea, Ea), t) return a.then((n) => {
				ja(e, n, t);
			}).catch((t) => {
				dn(t, e, 0);
			});
			e.asyncDep = a;
		} else ja(e, a, t);
	} else Pa(e, t);
}
function ja(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = $t(t)), Pa(e, n);
}
var Ma, Na;
function Pa(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && Ma && !i.render) {
			let t = i.template || Kr(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: r } = e.appContext.config, { delimiters: a, compilerOptions: o } = i;
				i.render = Ma(t, s(s({
					isCustomElement: n,
					delimiters: a
				}, r), o));
			}
		}
		e.render = i.render || r, Na && Na(e);
	}
	{
		let t = Ta(e);
		We();
		try {
			Hr(e);
		} finally {
			Ge(), t();
		}
	}
}
var Fa = { get(e, t) {
	return tt(e, "get", ""), e[t];
} };
function Ia(e) {
	return {
		attrs: new Proxy(e.attrs, Fa),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function La(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy($t(Wt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Lr) return Lr[n](e);
		},
		has(e, t) {
			return t in e || t in Lr;
		}
	}) : e.proxy;
}
function Ra(e, t = !0) {
	return h(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function za(e) {
	return h(e) && "__vccOpts" in e;
}
var Ba = (e, t) => /* @__PURE__ */ tn(e, t, Oa), Va = "3.5.35", Ha = void 0, Ua = typeof window < "u" && window.trustedTypes;
if (Ua) try {
	Ha = /* @__PURE__ */ Ua.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Wa = Ha ? (e) => Ha.createHTML(e) : (e) => e, Ga = "http://www.w3.org/2000/svg", Ka = "http://www.w3.org/1998/Math/MathML", qa = typeof document < "u" ? document : null, Ja = qa && /* @__PURE__ */ qa.createElement("template"), Ya = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? qa.createElementNS(Ga, e) : t === "mathml" ? qa.createElementNS(Ka, e) : n ? qa.createElement(e, { is: n }) : qa.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => qa.createTextNode(e),
	createComment: (e) => qa.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => qa.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Ja.innerHTML = Wa(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Ja.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Xa = /* @__PURE__ */ Symbol("_vtc");
function Za(e, t, n) {
	let r = e[Xa];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Qa = /* @__PURE__ */ Symbol("_vod"), $a = /* @__PURE__ */ Symbol("_vsh"), eo = /* @__PURE__ */ Symbol(""), to = /(?:^|;)\s*display\s*:/;
function no(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) if (g(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? io(r, t, "");
		}
		else for (let e in t) n[e] ?? io(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? io(r, i, "") : co(e, i, !g(t) && t ? t[i] : void 0, o) || io(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[eo];
			e && (n += ";" + e), r.cssText = n, a = to.test(n);
		}
	} else t && e.removeAttribute("style");
	Qa in e && (e[Qa] = a ? r.display : "", e[$a] && (r.display = "none"));
}
var ro = /\s*!important$/;
function io(e, t, n) {
	if (d(n)) n.forEach((n) => io(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = so(e, t);
		ro.test(n) ? e.setProperty(te(r), n.replace(ro, ""), "important") : e[r] = n;
	}
}
var ao = [
	"Webkit",
	"Moz",
	"ms"
], oo = {};
function so(e, t) {
	let n = oo[t];
	if (n) return n;
	let r = O(t);
	if (r !== "filter" && r in e) return oo[t] = r;
	r = ne(r);
	for (let n = 0; n < ao.length; n++) {
		let i = ao[n] + r;
		if (i in e) return oo[t] = i;
	}
	return t;
}
function co(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && g(r) && n === r;
}
var lo = "http://www.w3.org/1999/xlink";
function uo(e, t, n, r, i, a = _e(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(lo, t.slice(6, t.length)) : e.setAttributeNS(lo, t, n) : n == null || a && !ve(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function fo(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Wa(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = ve(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function po(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function mo(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var ho = /* @__PURE__ */ Symbol("_vei");
function go(e, t, n, r, i = null) {
	let a = e[ho] || (e[ho] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = vo(t);
		r ? po(e, n, a[t] = So(r, i), s) : o && (mo(e, n, o, s), a[t] = void 0);
	}
}
var _o = /(?:Once|Passive|Capture)$/;
function vo(e) {
	let t;
	if (_o.test(e)) {
		t = {};
		let n;
		for (; n = e.match(_o);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : te(e.slice(2)), t];
}
var yo = 0, bo = /* @__PURE__ */ Promise.resolve(), xo = () => yo ||= (bo.then(() => yo = 0), Date.now());
function So(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (d(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && un(e, t, 5, a);
			}
		} else un(r, t, 5, [e]);
	};
	return n.value = e, n.attached = xo(), n;
}
var Co = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, wo = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? Za(e, r, c) : t === "style" ? no(e, n, r) : a(t) ? o(t) || go(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : To(e, t, r, c)) ? (fo(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && uo(e, t, r, c, s, t !== "value")) : e._isVueCE && (Eo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? fo(e, O(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), uo(e, t, r, c));
};
function To(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Co(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Co(t) && g(n) ? !1 : t in e;
}
function Eo(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = O(t);
	return Array.isArray(n) ? n.some((e) => O(e) === r) : Object.keys(n).some((e) => O(e) === r);
}
var Do = {};
// @__NO_SIDE_EFFECTS__
function Oo(e, t, n) {
	let r = /* @__PURE__ */ ar(e, t);
	C(r) && (r = s({}, r, t));
	class i extends Ao {
		constructor(e) {
			super(r, e, n);
		}
	}
	return i.def = r, i;
}
var ko = typeof HTMLElement < "u" ? HTMLElement : class {}, Ao = class e extends ko {
	constructor(e, t = {}, n = Bo) {
		super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== Bo ? this._root = this.shadowRoot : e.shadowRoot === !1 ? this._root = this : (this.attachShadow(s({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot);
	}
	connectedCallback() {
		if (!this.isConnected) return;
		!this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
		let t = this;
		for (; t &&= t.assignedSlot || t.parentNode || t.host;) if (t instanceof e) {
			this._parent = t;
			break;
		}
		this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
			this._pendingResolve = void 0, this._resolveDef();
		}) : this._resolveDef());
	}
	_setParent(e = this._parent) {
		e && (this._instance.parent = e._instance, this._inheritParentContext(e));
	}
	_inheritParentContext(e = this._parent) {
		e && this._app && Object.setPrototypeOf(this._app._context.provides, e._instance.provides);
	}
	disconnectedCallback() {
		this._connected = !1, bn(() => {
			this._connected || (this._ob &&= (this._ob.disconnect(), null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets &&= (this._teleportTargets.clear(), void 0));
		});
	}
	_processMutations(e) {
		for (let t of e) this._setAttr(t.attributeName);
	}
	_resolveDef() {
		if (this._pendingResolve) return;
		for (let e = 0; e < this.attributes.length; e++) this._setAttr(this.attributes[e].name);
		this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
		let e = (e, t = !1) => {
			this._resolved = !0, this._pendingResolve = void 0;
			let { props: n, styles: r } = e, i;
			if (n && !d(n)) for (let e in n) {
				let t = n[e];
				(t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = ce(this._props[e])), (i ||= /* @__PURE__ */ Object.create(null))[O(e)] = !0);
			}
			this._numberProps = i, this._resolveProps(e), this.shadowRoot && this._applyStyles(r), this._mount(e);
		}, t = this._def.__asyncLoader;
		t ? this._pendingResolve = t().then((t) => {
			t.configureApp = this._def.configureApp, e(this._def = t, !0);
		}) : e(this._def);
	}
	_mount(e) {
		this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
		let t = this._instance && this._instance.exposed;
		if (t) for (let e in t) u(this, e) || Object.defineProperty(this, e, { get: () => Zt(t[e]) });
	}
	_resolveProps(e) {
		let { props: t } = e, n = d(t) ? t : Object.keys(t || {});
		for (let e of Object.keys(this)) e[0] !== "_" && n.includes(e) && this._setProp(e, this[e]);
		for (let e of n.map(O)) Object.defineProperty(this, e, {
			get() {
				return this._getProp(e);
			},
			set(t) {
				this._setProp(e, t, !0, !this._patching);
			}
		});
	}
	_setAttr(e) {
		if (e.startsWith("data-v-")) return;
		let t = this.hasAttribute(e), n = t ? this.getAttribute(e) : Do, r = O(e);
		t && this._numberProps && this._numberProps[r] && (n = ce(n)), this._setProp(r, n, !1, !0);
	}
	_getProp(e) {
		return this._props[e];
	}
	_setProp(e, t, n = !0, r = !1) {
		if (t !== this._props[e] && (this._dirty = !0, t === Do ? delete this._props[e] : (this._props[e] = t, e === "key" && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
			let n = this._ob;
			n && (this._processMutations(n.takeRecords()), n.disconnect()), t === !0 ? this.setAttribute(te(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(te(e), t + "") : t || this.removeAttribute(te(e)), n && n.observe(this, { attributes: !0 });
		}
	}
	_update() {
		let e = this._createVNode();
		this._app && (e.appContext = this._app._context), zo(e, this._root);
	}
	_createVNode() {
		let e = {};
		this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
		let t = L(this._def, s(e, this._props));
		return this._instance || (t.ce = (e) => {
			this._instance = e, e.ce = this, e.isCE = !0;
			let t = (e, t) => {
				this.dispatchEvent(new CustomEvent(e, C(t[0]) ? s({ detail: t }, t[0]) : { detail: t }));
			};
			e.emit = (e, ...n) => {
				t(e, n), te(e) !== e && t(te(e), n);
			}, this._setParent();
		}), t;
	}
	_applyStyles(e, t, n) {
		if (!e) return;
		if (t) {
			if (t === this._def || this._styleChildren.has(t)) return;
			this._styleChildren.add(t);
		}
		let r = this._nonce, i = this.shadowRoot, a = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(i), o = null;
		for (let s = e.length - 1; s >= 0; s--) {
			let c = document.createElement("style");
			r && c.setAttribute("nonce", r), c.textContent = e[s], i.insertBefore(c, o || a), o = c, s === 0 && (n || this._styleAnchors.set(this._def, c), t && this._styleAnchors.set(t, c));
		}
	}
	_getStyleAnchor(e) {
		if (!e) return null;
		let t = this._styleAnchors.get(e);
		return t && t.parentNode === this.shadowRoot ? t : (t && this._styleAnchors.delete(e), null);
	}
	_getRootStyleInsertionAnchor(e) {
		for (let t = 0; t < e.childNodes.length; t++) {
			let n = e.childNodes[t];
			if (!(n instanceof HTMLStyleElement)) return n;
		}
		return null;
	}
	_parseSlots() {
		let e = this._slots = {}, t;
		for (; t = this.firstChild;) {
			let n = t.nodeType === 1 && t.getAttribute("slot") || "default";
			(e[n] || (e[n] = [])).push(t), this.removeChild(t);
		}
	}
	_renderSlots() {
		let e = this._getSlots(), t = this._instance.type.__scopeId;
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = r.getAttribute("name") || "default", a = this._slots[i], o = r.parentNode;
			if (a) for (let e of a) {
				if (t && e.nodeType === 1) {
					let n = t + "-s", r = document.createTreeWalker(e, 1);
					e.setAttribute(n, "");
					let i;
					for (; i = r.nextNode();) i.setAttribute(n, "");
				}
				o.insertBefore(e, r);
			}
			else for (; r.firstChild;) o.insertBefore(r.firstChild, r);
			o.removeChild(r);
		}
	}
	_getSlots() {
		let e = [this];
		this._teleportTargets && e.push(...this._teleportTargets);
		let t = /* @__PURE__ */ new Set();
		for (let n of e) {
			let e = n.querySelectorAll("slot");
			for (let n = 0; n < e.length; n++) t.add(e[n]);
		}
		return Array.from(t);
	}
	_injectChildStyle(e, t) {
		this._applyStyles(e.styles, e, t);
	}
	_beginPatch() {
		this._patching = !0, this._dirty = !1;
	}
	_endPatch() {
		this._patching = !1, this._dirty && this._instance && this._update();
	}
	_hasShadowRoot() {
		return this._def.shadowRoot !== !1;
	}
	_removeChildStyle(e) {}
}, jo = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => ae(t, e) : t;
}, Mo = /* @__PURE__ */ Symbol("_assign"), No = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		po(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? se(Fo(e)) : Fo(e));
			e[Mo](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, bn(() => {
				e._assigning = !1;
			});
		}), e[Mo] = jo(r);
	},
	mounted(e, { value: t }) {
		Po(e, t);
	},
	beforeUpdate(e, t, n) {
		e[Mo] = jo(n);
	},
	updated(e, { value: t }) {
		e._assigning || Po(e, t);
	}
};
function Po(e, t) {
	let n = e.multiple, r = d(t);
	if (!(n && !r && !p(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Fo(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = xe(t, o) > -1;
			} else a.selected = t.has(o);
			else if (be(Fo(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Fo(e) {
	return "_value" in e ? e._value : e.value;
}
var Io = /* @__PURE__ */ s({ patchProp: wo }, Ya), Lo;
function Ro() {
	return Lo ||= Li(Io);
}
var zo = ((...e) => {
	Ro().render(...e);
}), Bo = ((...e) => {
	let t = Ro().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Ho(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Vo(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Vo(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Ho(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region node_modules/@jpinsonneau/html-to-image/es/util.js
function Uo(e, t) {
	if (e.match(/^[a-z]+:\/\//i)) return e;
	if (e.match(/^\/\//)) return window.location.protocol + e;
	if (e.match(/^[a-z]+:/i)) return e;
	let n = document.implementation.createHTMLDocument(), r = n.createElement("base"), i = n.createElement("a");
	return n.head.appendChild(r), n.body.appendChild(i), t && (r.href = t), i.href = e, i.href;
}
var Wo = (() => {
	let e = 0, t = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
	return () => (e += 1, `u${t()}${e}`);
})();
function Go(e) {
	let t = [];
	for (let n = 0, r = e.length; n < r; n++) t.push(e[n]);
	return t;
}
var Ko = null;
function qo(e = {}) {
	return Ko || (e.includeStyleProperties ? (Ko = e.includeStyleProperties, Ko) : (Ko = Go(window.getComputedStyle(document.documentElement)), Ko));
}
function Jo(e, t) {
	let n = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
	return n ? parseFloat(n.replace("px", "")) : 0;
}
function Yo(e) {
	let t = Jo(e, "border-left-width"), n = Jo(e, "border-right-width");
	return e.clientWidth + t + n;
}
function Xo(e) {
	let t = Jo(e, "border-top-width"), n = Jo(e, "border-bottom-width");
	return e.clientHeight + t + n;
}
function Zo(e, t = {}) {
	return {
		width: t.width || Yo(e),
		height: t.height || Xo(e)
	};
}
function Qo() {
	let e, t;
	try {
		t = process;
	} catch {}
	let n = t && t.env ? t.env.devicePixelRatio : null;
	return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
var $o = 16384;
function es(e) {
	(e.width > $o || e.height > $o) && (e.width > $o && e.height > $o ? e.width > e.height ? (e.height *= $o / e.width, e.width = $o) : (e.width *= $o / e.height, e.height = $o) : e.width > $o ? (e.height *= $o / e.width, e.width = $o) : (e.width *= $o / e.height, e.height = $o));
}
function ts(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => {
			r.decode().then(() => {
				requestAnimationFrame(() => t(r));
			});
		}, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
	});
}
async function ns(e) {
	return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((e) => `data:image/svg+xml;charset=utf-8,${e}`);
}
async function rs(e, t, n) {
	let r = "http://www.w3.org/2000/svg", i = document.createElementNS(r, "svg"), a = document.createElementNS(r, "foreignObject");
	return i.setAttribute("width", `${t}`), i.setAttribute("height", `${n}`), i.setAttribute("viewBox", `0 0 ${t} ${n}`), a.setAttribute("width", "100%"), a.setAttribute("height", "100%"), a.setAttribute("x", "0"), a.setAttribute("y", "0"), a.setAttribute("externalResourcesRequired", "true"), i.appendChild(a), a.appendChild(e), ns(i);
}
var is = (e, t) => {
	if (e instanceof t) return !0;
	let n = Object.getPrototypeOf(e);
	return n === null ? !1 : n.constructor.name === t.name || is(n, t);
};
//#endregion
//#region node_modules/@jpinsonneau/html-to-image/es/clone-pseudos.js
function as(e) {
	let t = e.getPropertyValue("content");
	return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function os(e, t) {
	return qo(t).map((t) => `${t}: ${e.getPropertyValue(t)}${e.getPropertyPriority(t) ? " !important" : ""};`).join(" ");
}
function ss(e, t, n, r) {
	let i = `.${e}:${t}`, a = n.cssText ? as(n) : os(n, r);
	return document.createTextNode(`${i}{${a}}`);
}
function cs(e, t, n, r) {
	let i = window.getComputedStyle(e, n), a = i.getPropertyValue("content");
	if (a === "" || a === "none") return;
	let o = Wo();
	try {
		t.className = `${t.className} ${o}`;
	} catch {
		return;
	}
	let s = document.createElement("style");
	s.appendChild(ss(o, n, i, r)), t.appendChild(s);
}
function ls(e, t, n) {
	cs(e, t, ":before", n), cs(e, t, ":after", n);
}
//#endregion
//#region node_modules/@jpinsonneau/html-to-image/es/mimes.js
var us = "application/font-woff", ds = "image/jpeg", fs = {
	woff: us,
	woff2: us,
	ttf: "application/font-truetype",
	eot: "application/vnd.ms-fontobject",
	png: "image/png",
	jpg: ds,
	jpeg: ds,
	gif: "image/gif",
	tiff: "image/tiff",
	svg: "image/svg+xml",
	webp: "image/webp"
};
function ps(e) {
	let t = /\.([^./]*?)$/g.exec(e);
	return t ? t[1] : "";
}
function ms(e) {
	return fs[ps(e).toLowerCase()] || "";
}
//#endregion
//#region node_modules/@jpinsonneau/html-to-image/es/dataurl.js
function hs(e) {
	return e.split(/,/)[1];
}
function gs(e) {
	return e.search(/^(data:)/) !== -1;
}
function _s(e, t) {
	return `data:${t};base64,${e}`;
}
async function vs(e, t, n) {
	let r = await fetch(e, t);
	if (r.status === 404) throw Error(`Resource "${r.url}" not found`);
	let i = await r.blob();
	return new Promise((e, t) => {
		let a = new FileReader();
		a.onerror = t, a.onloadend = () => {
			try {
				e(n({
					res: r,
					result: a.result
				}));
			} catch (e) {
				t(e);
			}
		}, a.readAsDataURL(i);
	});
}
var ys = {};
function bs(e, t, n) {
	let r = e.replace(/\?.*/, "");
	return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function xs(e, t, n) {
	let r = bs(e, t, n.includeQueryParams);
	if (ys[r] != null) return ys[r];
	n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
	let i;
	try {
		i = _s(await vs(e, n.fetchRequestInit, ({ res: e, result: n }) => (t ||= e.headers.get("Content-Type") || "", hs(n))), t);
	} catch (t) {
		i = n.imagePlaceholder || "";
		let r = `Failed to fetch resource: ${e}`;
		t && (r = typeof t == "string" ? t : t.message), r && console.warn(r);
	}
	return ys[r] = i, i;
}
//#endregion
//#region node_modules/@jpinsonneau/html-to-image/es/clone-node.js
async function Ss(e) {
	let t = e.toDataURL();
	return t === "data:," ? e.cloneNode(!1) : ts(t);
}
async function Cs(e, t) {
	if (e.currentSrc) {
		let t = document.createElement("canvas"), n = t.getContext("2d");
		return t.width = e.clientWidth, t.height = e.clientHeight, n?.drawImage(e, 0, 0, t.width, t.height), ts(t.toDataURL());
	}
	let n = e.poster;
	return ts(await xs(n, ms(n), t));
}
async function ws(e, t) {
	try {
		if (e?.contentDocument?.body) return await Ps(e.contentDocument.body, t, !0);
	} catch {}
	return e.cloneNode(!1);
}
async function Ts(e, t) {
	return is(e, HTMLCanvasElement) ? Ss(e) : is(e, HTMLVideoElement) ? Cs(e, t) : is(e, HTMLIFrameElement) ? ws(e, t) : e.cloneNode(Ds(e));
}
var Es = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Ds = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Os(e, t, n) {
	if (Ds(t)) return t;
	let r = [];
	return r = Es(e) && e.assignedNodes ? Go(e.assignedNodes()) : is(e, HTMLIFrameElement) && e.contentDocument?.body ? Go(e.contentDocument.body.childNodes) : Go((e.shadowRoot ?? e).childNodes), r.length === 0 || is(e, HTMLVideoElement) || await r.reduce((e, r) => e.then(() => Ps(r, n)).then((e) => {
		e && t.appendChild(e);
	}), Promise.resolve()), t;
}
function ks(e, t, n) {
	let r = t.style;
	if (!r) return;
	let i = window.getComputedStyle(e);
	i.cssText ? (r.cssText = i.cssText, r.transformOrigin = i.transformOrigin) : qo(n).forEach((n) => {
		let a = i.getPropertyValue(n);
		n === "font-size" && a.endsWith("px") && (a = `${Math.floor(parseFloat(a.substring(0, a.length - 2))) - .1}px`), is(e, HTMLIFrameElement) && n === "display" && a === "inline" && (a = "block"), n === "d" && t.getAttribute("d") && (a = `path(${t.getAttribute("d")})`), r.setProperty(n, a, i.getPropertyPriority(n));
	});
}
function As(e, t) {
	is(e, HTMLTextAreaElement) && (t.innerHTML = e.value), is(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function js(e, t) {
	if (is(e, HTMLSelectElement)) {
		let n = t, r = Array.from(n.children).find((t) => e.value === t.getAttribute("value"));
		r && r.setAttribute("selected", "");
	}
}
function Ms(e, t, n) {
	return is(t, Element) && (ks(e, t, n), ls(e, t, n), As(e, t), js(e, t)), t;
}
async function Ns(e, t) {
	let n = e.querySelectorAll ? e.querySelectorAll("use") : [];
	if (n.length === 0) return e;
	let r = {};
	for (let i = 0; i < n.length; i++) {
		let a = n[i].getAttribute("xlink:href");
		if (a) {
			let n = e.querySelector(a), i = document.querySelector(a);
			!n && i && !r[a] && (r[a] = await Ps(i, t, !0));
		}
	}
	let i = Object.values(r);
	if (i.length) {
		let t = "http://www.w3.org/1999/xhtml", n = document.createElementNS(t, "svg");
		n.setAttribute("xmlns", t), n.style.position = "absolute", n.style.width = "0", n.style.height = "0", n.style.overflow = "hidden", n.style.display = "none";
		let r = document.createElementNS(t, "defs");
		n.appendChild(r);
		for (let e = 0; e < i.length; e++) r.appendChild(i[e]);
		e.appendChild(n);
	}
	return e;
}
async function Ps(e, t, n) {
	return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((e) => Ts(e, t)).then((n) => Os(e, n, t)).then((n) => Ms(e, n, t)).then((e) => Ns(e, t));
}
//#endregion
//#region node_modules/@jpinsonneau/html-to-image/es/embed-resources.js
var Fs = /url\((['"]?)([^'"]+?)\1\)/g, Is = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Ls = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Rs(e) {
	let t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
	return RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function zs(e) {
	let t = [];
	return e.replace(Fs, (e, n, r) => (t.push(r), e)), t.filter((e) => !gs(e));
}
async function Bs(e, t, n, r, i) {
	try {
		let a = n ? Uo(t, n) : t, o = ms(t), s;
		return s = i ? _s(await i(a), o) : await xs(a, o, r), e.replace(Rs(t), `$1${s}$3`);
	} catch {}
	return e;
}
function Vs(e, { preferredFontFormat: t }) {
	return t ? e.replace(Ls, (e) => {
		for (;;) {
			let [n, , r] = Is.exec(e) || [];
			if (!r) return "";
			if (r === t) return `src: ${n};`;
		}
	}) : e;
}
function Hs(e) {
	return e.search(Fs) !== -1;
}
async function Us(e, t, n) {
	if (!Hs(e)) return e;
	let r = Vs(e, n);
	return zs(r).reduce((e, r) => e.then((e) => Bs(e, r, t, n)), Promise.resolve(r));
}
//#endregion
//#region node_modules/@jpinsonneau/html-to-image/es/embed-images.js
async function Ws(e, t, n) {
	let r = t.style?.getPropertyValue(e);
	if (r) {
		let i = await Us(r, null, n);
		return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
	}
	return !1;
}
async function Gs(e, t) {
	await Ws("background", e, t) || await Ws("background-image", e, t), await Ws("mask", e, t) || await Ws("-webkit-mask", e, t) || await Ws("mask-image", e, t) || await Ws("-webkit-mask-image", e, t);
}
async function Ks(e, t) {
	let n = is(e, HTMLImageElement);
	if (!(n && !gs(e.src)) && !(is(e, SVGImageElement) && !gs(e.href.baseVal))) return;
	let r = n ? e.src : e.href.baseVal, i = await xs(r, ms(r), t);
	await new Promise((r, a) => {
		e.onload = r, e.onerror = t.onImageErrorHandler ? (...e) => {
			try {
				r(t.onImageErrorHandler(...e));
			} catch (e) {
				a(e);
			}
		} : a;
		let o = e;
		o.decode &&= r, o.loading === "lazy" && (o.loading = "eager"), n ? (e.srcset = "", e.src = i) : e.href.baseVal = i;
	});
}
async function qs(e, t) {
	let n = Go(e.childNodes).map((e) => Js(e, t));
	await Promise.all(n).then(() => e);
}
async function Js(e, t) {
	is(e, Element) && (await Gs(e, t), await Ks(e, t), await qs(e, t));
}
//#endregion
//#region node_modules/@jpinsonneau/html-to-image/es/apply-style.js
function Ys(e, t) {
	let { style: n } = e;
	t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
	let r = t.style;
	return r != null && Object.keys(r).forEach((e) => {
		n[e] = r[e];
	}), e;
}
//#endregion
//#region node_modules/@jpinsonneau/html-to-image/es/embed-webfonts.js
var Xs = {};
async function Zs(e) {
	let t = Xs[e];
	return t ?? (t = {
		url: e,
		cssText: await (await fetch(e)).text()
	}, Xs[e] = t, t);
}
async function Qs(e, t) {
	let n = e.cssText, r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (i) => {
		let a = i.replace(r, "$1");
		return a.startsWith("https://") || (a = new URL(a, e.url).href), vs(a, t.fetchRequestInit, ({ result: e }) => (n = n.replace(i, `url(${e})`), [i, e]));
	});
	return Promise.all(i).then(() => n);
}
function $s(e) {
	if (e == null) return [];
	let t = [], n = e.replace(/(\/\*[\s\S]*?\*\/)/gi, ""), r = /* @__PURE__ */ RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
	for (;;) {
		let e = r.exec(n);
		if (e === null) break;
		t.push(e[0]);
	}
	n = n.replace(r, "");
	let i = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, a = /* @__PURE__ */ RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", "gi");
	for (;;) {
		let e = i.exec(n);
		if (e === null) {
			if (e = a.exec(n), e === null) break;
			i.lastIndex = a.lastIndex;
		} else a.lastIndex = i.lastIndex;
		t.push(e[0]);
	}
	return t;
}
async function ec(e, t) {
	let n = [], r = [];
	return e.forEach((n) => {
		if ("cssRules" in n) try {
			Go(n.cssRules || []).forEach((e, i) => {
				if (e.type === CSSRule.IMPORT_RULE) {
					let a = i + 1, o = e.href, s = Zs(o).then((e) => Qs(e, t)).then((e) => $s(e).forEach((e) => {
						try {
							n.insertRule(e, e.startsWith("@import") ? a += 1 : n.cssRules.length);
						} catch (t) {
							console.error("Error inserting rule from remote css", {
								rule: e,
								error: t
							});
						}
					})).catch((e) => {
						console.error("Error loading remote css", e.toString());
					});
					r.push(s);
				}
			});
		} catch (i) {
			let a = e.find((e) => e.href == null) || document.styleSheets[0];
			n.href != null && r.push(Zs(n.href).then((e) => Qs(e, t)).then((e) => $s(e).forEach((e) => {
				a.insertRule(e, a.cssRules.length);
			})).catch((e) => {
				console.error("Error loading remote stylesheet", e);
			})), console.error("Error inlining remote css file", i);
		}
	}), Promise.all(r).then(() => (e.forEach((e) => {
		if ("cssRules" in e) try {
			Go(e.cssRules || []).forEach((e) => {
				n.push(e);
			});
		} catch (t) {
			console.error(`Error while reading CSS rules from ${e.href}`, t);
		}
	}), n));
}
function tc(e) {
	return e.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => Hs(e.style.getPropertyValue("src")));
}
async function nc(e, t) {
	if (e.ownerDocument == null) throw Error("Provided element is not within a Document");
	return tc(await ec(Go(e.ownerDocument.styleSheets), t));
}
function rc(e) {
	return e.trim().replace(/["']/g, "");
}
function ic(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		(e.style.fontFamily || getComputedStyle(e).fontFamily).split(",").forEach((e) => {
			t.add(rc(e));
		}), Array.from(e.children).forEach((e) => {
			e instanceof HTMLElement && n(e);
		});
	}
	return n(e), t;
}
async function ac(e, t) {
	let n = await nc(e, t), r = ic(e);
	return (await Promise.all(n.filter((e) => r.has(rc(e.style.fontFamily || e.style.getPropertyValue("fontFamily")))).map((e) => {
		let n = e.parentStyleSheet ? e.parentStyleSheet.href : null;
		return Us(e.cssText, n, t);
	}))).join("\n");
}
async function oc(e, t) {
	let n = t.fontEmbedCSS == null ? t.skipFonts ? null : await ac(e, t) : t.fontEmbedCSS;
	if (n) {
		let t = document.createElement("style"), r = document.createTextNode(n);
		t.appendChild(r), e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t);
	}
}
//#endregion
//#region node_modules/@jpinsonneau/html-to-image/es/index.js
async function sc(e, t = {}) {
	let { width: n, height: r } = Zo(e, t), i = await Ps(e, t, !0);
	return await oc(i, t), await Js(i, t), Ys(i, t), await rs(i, n, r);
}
async function cc(e, t = {}) {
	let { width: n, height: r } = Zo(e, t), i = await ts(await sc(e, t)), a = document.createElement("canvas"), o = a.getContext("2d"), s = t.pixelRatio || Qo(), c = t.canvasWidth || n, l = t.canvasHeight || r;
	return a.width = c * s, a.height = l * s, t.skipAutoScale || es(a), a.style.width = `${c}`, a.style.height = `${l}`, t.backgroundColor && (o.fillStyle = t.backgroundColor, o.fillRect(0, 0, a.width, a.height)), o.drawImage(i, 0, 0, a.width, a.height), a;
}
async function lc(e, t = {}) {
	return (await cc(e, t)).toDataURL();
}
//#endregion
//#region node_modules/@kurkle/color/dist/color.esm.js
function uc(e) {
	return e + .5 | 0;
}
var dc = (e, t, n) => Math.max(Math.min(e, n), t);
function fc(e) {
	return dc(uc(e * 2.55), 0, 255);
}
function pc(e) {
	return dc(uc(e * 255), 0, 255);
}
function mc(e) {
	return dc(uc(e / 2.55) / 100, 0, 1);
}
function hc(e) {
	return dc(uc(e * 100), 0, 100);
}
var gc = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	A: 10,
	B: 11,
	C: 12,
	D: 13,
	E: 14,
	F: 15,
	a: 10,
	b: 11,
	c: 12,
	d: 13,
	e: 14,
	f: 15
}, _c = [..."0123456789ABCDEF"], vc = (e) => _c[e & 15], yc = (e) => _c[(e & 240) >> 4] + _c[e & 15], bc = (e) => (e & 240) >> 4 == (e & 15), xc = (e) => bc(e.r) && bc(e.g) && bc(e.b) && bc(e.a);
function Sc(e) {
	var t = e.length, n;
	return e[0] === "#" && (t === 4 || t === 5 ? n = {
		r: 255 & gc[e[1]] * 17,
		g: 255 & gc[e[2]] * 17,
		b: 255 & gc[e[3]] * 17,
		a: t === 5 ? gc[e[4]] * 17 : 255
	} : (t === 7 || t === 9) && (n = {
		r: gc[e[1]] << 4 | gc[e[2]],
		g: gc[e[3]] << 4 | gc[e[4]],
		b: gc[e[5]] << 4 | gc[e[6]],
		a: t === 9 ? gc[e[7]] << 4 | gc[e[8]] : 255
	})), n;
}
var Cc = (e, t) => e < 255 ? t(e) : "";
function wc(e) {
	var t = xc(e) ? vc : yc;
	return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Cc(e.a, t) : void 0;
}
var Tc = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ec(e, t, n) {
	let r = t * Math.min(n, 1 - n), i = (t, i = (t + e / 30) % 12) => n - r * Math.max(Math.min(i - 3, 9 - i, 1), -1);
	return [
		i(0),
		i(8),
		i(4)
	];
}
function Dc(e, t, n) {
	let r = (r, i = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(i, 4 - i, 1), 0);
	return [
		r(5),
		r(3),
		r(1)
	];
}
function Oc(e, t, n) {
	let r = Ec(e, 1, .5), i;
	for (t + n > 1 && (i = 1 / (t + n), t *= i, n *= i), i = 0; i < 3; i++) r[i] *= 1 - t - n, r[i] += t;
	return r;
}
function kc(e, t, n, r, i) {
	return e === i ? (t - n) / r + (t < n ? 6 : 0) : t === i ? (n - e) / r + 2 : (e - t) / r + 4;
}
function Ac(e) {
	let t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.max(t, n, r), a = Math.min(t, n, r), o = (i + a) / 2, s, c, l;
	return i !== a && (l = i - a, c = o > .5 ? l / (2 - i - a) : l / (i + a), s = kc(t, n, r, l, i), s = s * 60 + .5), [
		s | 0,
		c || 0,
		o
	];
}
function jc(e, t, n, r) {
	return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, r)).map(pc);
}
function Mc(e, t, n) {
	return jc(Ec, e, t, n);
}
function Nc(e, t, n) {
	return jc(Oc, e, t, n);
}
function Pc(e, t, n) {
	return jc(Dc, e, t, n);
}
function Fc(e) {
	return (e % 360 + 360) % 360;
}
function Ic(e) {
	let t = Tc.exec(e), n = 255, r;
	if (!t) return;
	t[5] !== r && (n = t[6] ? fc(+t[5]) : pc(+t[5]));
	let i = Fc(+t[2]), a = t[3] / 100, o = t[4] / 100;
	return r = t[1] === "hwb" ? Nc(i, a, o) : t[1] === "hsv" ? Pc(i, a, o) : Mc(i, a, o), {
		r: r[0],
		g: r[1],
		b: r[2],
		a: n
	};
}
function Lc(e, t) {
	var n = Ac(e);
	n[0] = Fc(n[0] + t), n = Mc(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Rc(e) {
	if (!e) return;
	let t = Ac(e), n = t[0], r = hc(t[1]), i = hc(t[2]);
	return e.a < 255 ? `hsla(${n}, ${r}%, ${i}%, ${mc(e.a)})` : `hsl(${n}, ${r}%, ${i}%)`;
}
var zc = {
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
}, Bc = {
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
function Vc() {
	let e = {}, t = Object.keys(Bc), n = Object.keys(zc), r, i, a, o, s;
	for (r = 0; r < t.length; r++) {
		for (o = s = t[r], i = 0; i < n.length; i++) a = n[i], s = s.replace(a, zc[a]);
		a = parseInt(Bc[o], 16), e[s] = [
			a >> 16 & 255,
			a >> 8 & 255,
			a & 255
		];
	}
	return e;
}
var Hc;
function Uc(e) {
	Hc || (Hc = Vc(), Hc.transparent = [
		0,
		0,
		0,
		0
	]);
	let t = Hc[e.toLowerCase()];
	return t && {
		r: t[0],
		g: t[1],
		b: t[2],
		a: t.length === 4 ? t[3] : 255
	};
}
var Wc = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Gc(e) {
	let t = Wc.exec(e), n = 255, r, i, a;
	if (t) {
		if (t[7] !== r) {
			let e = +t[7];
			n = t[8] ? fc(e) : dc(e * 255, 0, 255);
		}
		return r = +t[1], i = +t[3], a = +t[5], r = 255 & (t[2] ? fc(r) : dc(r, 0, 255)), i = 255 & (t[4] ? fc(i) : dc(i, 0, 255)), a = 255 & (t[6] ? fc(a) : dc(a, 0, 255)), {
			r,
			g: i,
			b: a,
			a: n
		};
	}
}
function Kc(e) {
	return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${mc(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
var qc = (e) => e <= .0031308 ? e * 12.92 : e ** (1 / 2.4) * 1.055 - .055, Jc = (e) => e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4;
function Yc(e, t, n) {
	let r = Jc(mc(e.r)), i = Jc(mc(e.g)), a = Jc(mc(e.b));
	return {
		r: pc(qc(r + n * (Jc(mc(t.r)) - r))),
		g: pc(qc(i + n * (Jc(mc(t.g)) - i))),
		b: pc(qc(a + n * (Jc(mc(t.b)) - a))),
		a: e.a + n * (t.a - e.a)
	};
}
function Xc(e, t, n) {
	if (e) {
		let r = Ac(e);
		r[t] = Math.max(0, Math.min(r[t] + r[t] * n, t === 0 ? 360 : 1)), r = Mc(r), e.r = r[0], e.g = r[1], e.b = r[2];
	}
}
function Zc(e, t) {
	return e && Object.assign(t || {}, e);
}
function Qc(e) {
	var t = {
		r: 0,
		g: 0,
		b: 0,
		a: 255
	};
	return Array.isArray(e) ? e.length >= 3 && (t = {
		r: e[0],
		g: e[1],
		b: e[2],
		a: 255
	}, e.length > 3 && (t.a = pc(e[3]))) : (t = Zc(e, {
		r: 0,
		g: 0,
		b: 0,
		a: 1
	}), t.a = pc(t.a)), t;
}
function $c(e) {
	return e.charAt(0) === "r" ? Gc(e) : Ic(e);
}
var el = class e {
	constructor(t) {
		if (t instanceof e) return t;
		let n = typeof t, r;
		n === "object" ? r = Qc(t) : n === "string" && (r = Sc(t) || Uc(t) || $c(t)), this._rgb = r, this._valid = !!r;
	}
	get valid() {
		return this._valid;
	}
	get rgb() {
		var e = Zc(this._rgb);
		return e && (e.a = mc(e.a)), e;
	}
	set rgb(e) {
		this._rgb = Qc(e);
	}
	rgbString() {
		return this._valid ? Kc(this._rgb) : void 0;
	}
	hexString() {
		return this._valid ? wc(this._rgb) : void 0;
	}
	hslString() {
		return this._valid ? Rc(this._rgb) : void 0;
	}
	mix(e, t) {
		if (e) {
			let n = this.rgb, r = e.rgb, i, a = t === i ? .5 : t, o = 2 * a - 1, s = n.a - r.a, c = ((o * s === -1 ? o : (o + s) / (1 + o * s)) + 1) / 2;
			i = 1 - c, n.r = 255 & c * n.r + i * r.r + .5, n.g = 255 & c * n.g + i * r.g + .5, n.b = 255 & c * n.b + i * r.b + .5, n.a = a * n.a + (1 - a) * r.a, this.rgb = n;
		}
		return this;
	}
	interpolate(e, t) {
		return e && (this._rgb = Yc(this._rgb, e._rgb, t)), this;
	}
	clone() {
		return new e(this.rgb);
	}
	alpha(e) {
		return this._rgb.a = pc(e), this;
	}
	clearer(e) {
		let t = this._rgb;
		return t.a *= 1 - e, this;
	}
	greyscale() {
		let e = this._rgb;
		return e.r = e.g = e.b = uc(e.r * .3 + e.g * .59 + e.b * .11), this;
	}
	opaquer(e) {
		let t = this._rgb;
		return t.a *= 1 + e, this;
	}
	negate() {
		let e = this._rgb;
		return e.r = 255 - e.r, e.g = 255 - e.g, e.b = 255 - e.b, this;
	}
	lighten(e) {
		return Xc(this._rgb, 2, e), this;
	}
	darken(e) {
		return Xc(this._rgb, 2, -e), this;
	}
	saturate(e) {
		return Xc(this._rgb, 1, e), this;
	}
	desaturate(e) {
		return Xc(this._rgb, 1, -e), this;
	}
	rotate(e) {
		return Lc(this._rgb, e), this;
	}
};
//#endregion
//#region node_modules/chart.js/dist/chunks/helpers.dataset.js
function tl() {}
var nl = (() => {
	let e = 0;
	return () => e++;
})();
function z(e) {
	return e == null;
}
function B(e) {
	if (Array.isArray && Array.isArray(e)) return !0;
	let t = Object.prototype.toString.call(e);
	return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function V(e) {
	return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function H(e) {
	return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function rl(e, t) {
	return H(e) ? e : t;
}
function U(e, t) {
	return e === void 0 ? t : e;
}
var il = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, al = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function W(e, t, n) {
	if (e && typeof e.call == "function") return e.apply(n, t);
}
function G(e, t, n, r) {
	let i, a, o;
	if (B(e)) if (a = e.length, r) for (i = a - 1; i >= 0; i--) t.call(n, e[i], i);
	else for (i = 0; i < a; i++) t.call(n, e[i], i);
	else if (V(e)) for (o = Object.keys(e), a = o.length, i = 0; i < a; i++) t.call(n, e[o[i]], o[i]);
}
function ol(e, t) {
	let n, r, i, a;
	if (!e || !t || e.length !== t.length) return !1;
	for (n = 0, r = e.length; n < r; ++n) if (i = e[n], a = t[n], i.datasetIndex !== a.datasetIndex || i.index !== a.index) return !1;
	return !0;
}
function sl(e) {
	if (B(e)) return e.map(sl);
	if (V(e)) {
		let t = Object.create(null), n = Object.keys(e), r = n.length, i = 0;
		for (; i < r; ++i) t[n[i]] = sl(e[n[i]]);
		return t;
	}
	return e;
}
function cl(e) {
	return [
		"__proto__",
		"prototype",
		"constructor"
	].indexOf(e) === -1;
}
function ll(e, t, n, r) {
	if (!cl(e)) return;
	let i = t[e], a = n[e];
	V(i) && V(a) ? ul(i, a, r) : t[e] = sl(a);
}
function ul(e, t, n) {
	let r = B(t) ? t : [t], i = r.length;
	if (!V(e)) return e;
	n ||= {};
	let a = n.merger || ll, o;
	for (let t = 0; t < i; ++t) {
		if (o = r[t], !V(o)) continue;
		let i = Object.keys(o);
		for (let t = 0, r = i.length; t < r; ++t) a(i[t], e, o, n);
	}
	return e;
}
function dl(e, t) {
	return ul(e, t, { merger: fl });
}
function fl(e, t, n) {
	if (!cl(e)) return;
	let r = t[e], i = n[e];
	V(r) && V(i) ? dl(r, i) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = sl(i));
}
var pl = {
	"": (e) => e,
	x: (e) => e.x,
	y: (e) => e.y
};
function ml(e) {
	let t = e.split("."), n = [], r = "";
	for (let e of t) r += e, r.endsWith("\\") ? r = r.slice(0, -1) + "." : (n.push(r), r = "");
	return n;
}
function hl(e) {
	let t = ml(e);
	return (e) => {
		for (let n of t) {
			if (n === "") break;
			e &&= e[n];
		}
		return e;
	};
}
function gl(e, t) {
	return (pl[t] || (pl[t] = hl(t)))(e);
}
function _l(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
var vl = (e) => e !== void 0, yl = (e) => typeof e == "function", bl = (e, t) => {
	if (e.size !== t.size) return !1;
	for (let n of e) if (!t.has(n)) return !1;
	return !0;
};
function xl(e) {
	return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
var K = Math.PI, q = 2 * K, Sl = q + K, Cl = Infinity, wl = K / 180, Tl = K / 2, El = K / 4, Dl = K * 2 / 3, Ol = Math.log10, kl = Math.sign;
function Al(e, t, n) {
	return Math.abs(e - t) < n;
}
function jl(e) {
	let t = Math.round(e);
	e = Al(e, t, e / 1e3) ? t : e;
	let n = 10 ** Math.floor(Ol(e)), r = e / n;
	return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * n;
}
function Ml(e) {
	let t = [], n = Math.sqrt(e), r;
	for (r = 1; r < n; r++) e % r === 0 && (t.push(r), t.push(e / r));
	return n === (n | 0) && t.push(n), t.sort((e, t) => e - t).pop(), t;
}
function Nl(e) {
	return typeof e == "symbol" || typeof e == "object" && !!e && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Pl(e) {
	return !Nl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Fl(e, t) {
	let n = Math.round(e);
	return n - t <= e && n + t >= e;
}
function Il(e, t, n) {
	let r, i, a;
	for (r = 0, i = e.length; r < i; r++) a = e[r][n], isNaN(a) || (t.min = Math.min(t.min, a), t.max = Math.max(t.max, a));
}
function Ll(e) {
	return K / 180 * e;
}
function Rl(e) {
	return 180 / K * e;
}
function zl(e) {
	if (!H(e)) return;
	let t = 1, n = 0;
	for (; Math.round(e * t) / t !== e;) t *= 10, n++;
	return n;
}
function Bl(e, t) {
	let n = t.x - e.x, r = t.y - e.y, i = Math.sqrt(n * n + r * r), a = Math.atan2(r, n);
	return a < -.5 * K && (a += q), {
		angle: a,
		distance: i
	};
}
function Vl(e, t) {
	return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
function Hl(e, t) {
	return (e - t + Sl) % q - K;
}
function Ul(e) {
	return (e % q + q) % q;
}
function Wl(e, t, n, r) {
	let i = Ul(e), a = Ul(t), o = Ul(n), s = Ul(a - i), c = Ul(o - i), l = Ul(i - a), u = Ul(i - o);
	return i === a || i === o || r && a === o || s > c && l < u;
}
function Gl(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Kl(e) {
	return Gl(e, -32768, 32767);
}
function ql(e, t, n, r = 1e-6) {
	return e >= Math.min(t, n) - r && e <= Math.max(t, n) + r;
}
function Jl(e, t, n) {
	n ||= ((n) => e[n] < t);
	let r = e.length - 1, i = 0, a;
	for (; r - i > 1;) a = i + r >> 1, n(a) ? i = a : r = a;
	return {
		lo: i,
		hi: r
	};
}
var Yl = (e, t, n, r) => Jl(e, n, r ? (r) => {
	let i = e[r][t];
	return i < n || i === n && e[r + 1][t] === n;
} : (r) => e[r][t] < n), Xl = (e, t, n) => Jl(e, n, (r) => e[r][t] >= n);
function Zl(e, t, n) {
	let r = 0, i = e.length;
	for (; r < i && e[r] < t;) r++;
	for (; i > r && e[i - 1] > n;) i--;
	return r > 0 || i < e.length ? e.slice(r, i) : e;
}
var Ql = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift"
];
function $l(e, t) {
	if (e._chartjs) {
		e._chartjs.listeners.push(t);
		return;
	}
	Object.defineProperty(e, "_chartjs", {
		configurable: !0,
		enumerable: !1,
		value: { listeners: [t] }
	}), Ql.forEach((t) => {
		let n = "_onData" + _l(t), r = e[t];
		Object.defineProperty(e, t, {
			configurable: !0,
			enumerable: !1,
			value(...t) {
				let i = r.apply(this, t);
				return e._chartjs.listeners.forEach((e) => {
					typeof e[n] == "function" && e[n](...t);
				}), i;
			}
		});
	});
}
function eu(e, t) {
	let n = e._chartjs;
	if (!n) return;
	let r = n.listeners, i = r.indexOf(t);
	i !== -1 && r.splice(i, 1), !(r.length > 0) && (Ql.forEach((t) => {
		delete e[t];
	}), delete e._chartjs);
}
function tu(e) {
	let t = new Set(e);
	return t.size === e.length ? e : Array.from(t);
}
var nu = function() {
	return typeof window > "u" ? function(e) {
		return e();
	} : window.requestAnimationFrame;
}();
function ru(e, t) {
	let n = [], r = !1;
	return function(...i) {
		n = i, r || (r = !0, nu.call(window, () => {
			r = !1, e.apply(t, n);
		}));
	};
}
function iu(e, t) {
	let n;
	return function(...r) {
		return t ? (clearTimeout(n), n = setTimeout(e, t, r)) : e.apply(this, r), t;
	};
}
var au = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", ou = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2;
function su(e, t, n) {
	let r = t.length, i = 0, a = r;
	if (e._sorted) {
		let { iScale: o, vScale: s, _parsed: c } = e, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = o.axis, { min: d, max: f, minDefined: p, maxDefined: m } = o.getUserBounds();
		if (p) {
			if (i = Math.min(Yl(c, u, d).lo, n ? r : Yl(t, u, o.getPixelForValue(d)).lo), l) {
				let e = c.slice(0, i + 1).reverse().findIndex((e) => !z(e[s.axis]));
				i -= Math.max(0, e);
			}
			i = Gl(i, 0, r - 1);
		}
		if (m) {
			let e = Math.max(Yl(c, o.axis, f, !0).hi + 1, n ? 0 : Yl(t, u, o.getPixelForValue(f), !0).hi + 1);
			if (l) {
				let t = c.slice(e - 1).findIndex((e) => !z(e[s.axis]));
				e += Math.max(0, t);
			}
			a = Gl(e, i, r) - i;
		} else a = r - i;
	}
	return {
		start: i,
		count: a
	};
}
function cu(e) {
	let { xScale: t, yScale: n, _scaleRanges: r } = e, i = {
		xmin: t.min,
		xmax: t.max,
		ymin: n.min,
		ymax: n.max
	};
	if (!r) return e._scaleRanges = i, !0;
	let a = r.xmin !== t.min || r.xmax !== t.max || r.ymin !== n.min || r.ymax !== n.max;
	return Object.assign(r, i), a;
}
var lu = (e) => e === 0 || e === 1, uu = (e, t, n) => -(2 ** (10 * --e) * Math.sin((e - t) * q / n)), du = (e, t, n) => 2 ** (-10 * e) * Math.sin((e - t) * q / n) + 1, fu = {
	linear: (e) => e,
	easeInQuad: (e) => e * e,
	easeOutQuad: (e) => -e * (e - 2),
	easeInOutQuad: (e) => (e /= .5) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1),
	easeInCubic: (e) => e * e * e,
	easeOutCubic: (e) => --e * e * e + 1,
	easeInOutCubic: (e) => (e /= .5) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2),
	easeInQuart: (e) => e * e * e * e,
	easeOutQuart: (e) => -(--e * e * e * e - 1),
	easeInOutQuart: (e) => (e /= .5) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2),
	easeInQuint: (e) => e * e * e * e * e,
	easeOutQuint: (e) => --e * e * e * e * e + 1,
	easeInOutQuint: (e) => (e /= .5) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2),
	easeInSine: (e) => -Math.cos(e * Tl) + 1,
	easeOutSine: (e) => Math.sin(e * Tl),
	easeInOutSine: (e) => -.5 * (Math.cos(K * e) - 1),
	easeInExpo: (e) => e === 0 ? 0 : 2 ** (10 * (e - 1)),
	easeOutExpo: (e) => e === 1 ? 1 : -(2 ** (-10 * e)) + 1,
	easeInOutExpo: (e) => lu(e) ? e : e < .5 ? .5 * 2 ** (10 * (e * 2 - 1)) : .5 * (-(2 ** (-10 * (e * 2 - 1))) + 2),
	easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
	easeOutCirc: (e) => Math.sqrt(1 - --e * e),
	easeInOutCirc: (e) => (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
	easeInElastic: (e) => lu(e) ? e : uu(e, .075, .3),
	easeOutElastic: (e) => lu(e) ? e : du(e, .075, .3),
	easeInOutElastic(e) {
		let t = .1125, n = .45;
		return lu(e) ? e : e < .5 ? .5 * uu(e * 2, t, n) : .5 + .5 * du(e * 2 - 1, t, n);
	},
	easeInBack(e) {
		return e * e * (2.70158 * e - 1.70158);
	},
	easeOutBack(e) {
		return --e * e * (2.70158 * e + 1.70158) + 1;
	},
	easeInOutBack(e) {
		let t = 1.70158;
		return (e /= .5) < 1 ? .5 * (e * e * (((t *= 1.525) + 1) * e - t)) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
	},
	easeInBounce: (e) => 1 - fu.easeOutBounce(1 - e),
	easeOutBounce(e) {
		let t = 7.5625, n = 2.75;
		return e < 1 / n ? t * e * e : e < 2 / n ? t * (e -= 1.5 / n) * e + .75 : e < 2.5 / n ? t * (e -= 2.25 / n) * e + .9375 : t * (e -= 2.625 / n) * e + .984375;
	},
	easeInOutBounce: (e) => e < .5 ? fu.easeInBounce(e * 2) * .5 : fu.easeOutBounce(e * 2 - 1) * .5 + .5
};
function pu(e) {
	if (e && typeof e == "object") {
		let t = e.toString();
		return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
	}
	return !1;
}
function mu(e) {
	return pu(e) ? e : new el(e);
}
function hu(e) {
	return pu(e) ? e : new el(e).saturate(.5).darken(.1).hexString();
}
var gu = [
	"x",
	"y",
	"borderWidth",
	"radius",
	"tension"
], _u = [
	"color",
	"borderColor",
	"backgroundColor"
];
function vu(e) {
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
		_scriptable: (e) => e !== "onProgress" && e !== "onComplete" && e !== "fn"
	}), e.set("animations", {
		colors: {
			type: "color",
			properties: _u
		},
		numbers: {
			type: "number",
			properties: gu
		}
	}), e.describe("animations", { _fallback: "animation" }), e.set("transitions", {
		active: { animation: { duration: 400 } },
		resize: { animation: { duration: 0 } },
		show: { animations: {
			colors: { from: "transparent" },
			visible: {
				type: "boolean",
				duration: 0
			}
		} },
		hide: { animations: {
			colors: { to: "transparent" },
			visible: {
				type: "boolean",
				easing: "linear",
				fn: (e) => e | 0
			}
		} }
	});
}
function yu(e) {
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
var bu = /* @__PURE__ */ new Map();
function xu(e, t) {
	t ||= {};
	let n = e + JSON.stringify(t), r = bu.get(n);
	return r || (r = new Intl.NumberFormat(e, t), bu.set(n, r)), r;
}
function Su(e, t, n) {
	return xu(t, n).format(e);
}
var Cu = {
	values(e) {
		return B(e) ? e : "" + e;
	},
	numeric(e, t, n) {
		if (e === 0) return "0";
		let r = this.chart.options.locale, i, a = e;
		if (n.length > 1) {
			let t = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
			(t < 1e-4 || t > 0x38d7ea4c68000) && (i = "scientific"), a = wu(e, n);
		}
		let o = Ol(Math.abs(a)), s = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), c = {
			notation: i,
			minimumFractionDigits: s,
			maximumFractionDigits: s
		};
		return Object.assign(c, this.options.ticks.format), Su(e, r, c);
	},
	logarithmic(e, t, n) {
		if (e === 0) return "0";
		let r = n[t].significand || e / 10 ** Math.floor(Ol(e));
		return [
			1,
			2,
			3,
			5,
			10,
			15
		].includes(r) || t > .8 * n.length ? Cu.numeric.call(this, e, t, n) : "";
	}
};
function wu(e, t) {
	let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
	return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var Tu = { formatters: Cu };
function Eu(e) {
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
			tickWidth: (e, t) => t.lineWidth,
			tickColor: (e, t) => t.color,
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
			callback: Tu.formatters.values,
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
		_scriptable: (e) => !e.startsWith("before") && !e.startsWith("after") && e !== "callback" && e !== "parser",
		_indexable: (e) => e !== "borderDash" && e !== "tickBorderDash" && e !== "dash"
	}), e.describe("scales", { _fallback: "scale" }), e.describe("scale.ticks", {
		_scriptable: (e) => e !== "backdropPadding" && e !== "callback",
		_indexable: (e) => e !== "backdropPadding"
	});
}
var Du = Object.create(null), Ou = Object.create(null);
function ku(e, t) {
	if (!t) return e;
	let n = t.split(".");
	for (let t = 0, r = n.length; t < r; ++t) {
		let r = n[t];
		e = e[r] || (e[r] = Object.create(null));
	}
	return e;
}
function Au(e, t, n) {
	return typeof t == "string" ? ul(ku(e, t), n) : ul(ku(e, ""), t);
}
var ju = /* #__PURE__ */ new class {
	constructor(e, t) {
		this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (e) => e.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
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
		}, this.hover = {}, this.hoverBackgroundColor = (e, t) => hu(t.backgroundColor), this.hoverBorderColor = (e, t) => hu(t.borderColor), this.hoverColor = (e, t) => hu(t.color), this.indexAxis = "x", this.interaction = {
			mode: "nearest",
			intersect: !0,
			includeInvisible: !1
		}, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(e), this.apply(t);
	}
	set(e, t) {
		return Au(this, e, t);
	}
	get(e) {
		return ku(this, e);
	}
	describe(e, t) {
		return Au(Ou, e, t);
	}
	override(e, t) {
		return Au(Du, e, t);
	}
	route(e, t, n, r) {
		let i = ku(this, e), a = ku(this, n), o = "_" + t;
		Object.defineProperties(i, {
			[o]: {
				value: i[t],
				writable: !0
			},
			[t]: {
				enumerable: !0,
				get() {
					let e = this[o], t = a[r];
					return V(e) ? Object.assign({}, t, e) : U(e, t);
				},
				set(e) {
					this[o] = e;
				}
			}
		});
	}
	apply(e) {
		e.forEach((e) => e(this));
	}
}({
	_scriptable: (e) => !e.startsWith("on"),
	_indexable: (e) => e !== "events",
	hover: { _fallback: "interaction" },
	interaction: {
		_scriptable: !1,
		_indexable: !1
	}
}, [
	vu,
	yu,
	Eu
]);
function Mu(e) {
	return !e || z(e.size) || z(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Nu(e, t, n, r, i) {
	let a = t[i];
	return a || (a = t[i] = e.measureText(i).width, n.push(i)), a > r && (r = a), r;
}
function Pu(e, t, n, r) {
	r ||= {};
	let i = r.data = r.data || {}, a = r.garbageCollect = r.garbageCollect || [];
	r.font !== t && (i = r.data = {}, a = r.garbageCollect = [], r.font = t), e.save(), e.font = t;
	let o = 0, s = n.length, c, l, u, d, f;
	for (c = 0; c < s; c++) if (d = n[c], d != null && !B(d)) o = Nu(e, i, a, o, d);
	else if (B(d)) for (l = 0, u = d.length; l < u; l++) f = d[l], f != null && !B(f) && (o = Nu(e, i, a, o, f));
	e.restore();
	let p = a.length / 2;
	if (p > n.length) {
		for (c = 0; c < p; c++) delete i[a[c]];
		a.splice(0, p);
	}
	return o;
}
function Fu(e, t, n) {
	let r = e.currentDevicePixelRatio, i = n === 0 ? 0 : Math.max(n / 2, .5);
	return Math.round((t - i) * r) / r + i;
}
function Iu(e, t) {
	!t && !e || (t ||= e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Lu(e, t, n, r) {
	Ru(e, t, n, r, null);
}
function Ru(e, t, n, r, i) {
	let a, o, s, c, l, u, d, f, p = t.pointStyle, m = t.rotation, h = t.radius, g = (m || 0) * wl;
	if (p && typeof p == "object" && (a = p.toString(), a === "[object HTMLImageElement]" || a === "[object HTMLCanvasElement]")) {
		e.save(), e.translate(n, r), e.rotate(g), e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), e.restore();
		return;
	}
	if (!(isNaN(h) || h <= 0)) {
		switch (e.beginPath(), p) {
			default:
				i ? e.ellipse(n, r, i / 2, h, 0, 0, q) : e.arc(n, r, h, 0, q), e.closePath();
				break;
			case "triangle":
				u = i ? i / 2 : h, e.moveTo(n + Math.sin(g) * u, r - Math.cos(g) * h), g += Dl, e.lineTo(n + Math.sin(g) * u, r - Math.cos(g) * h), g += Dl, e.lineTo(n + Math.sin(g) * u, r - Math.cos(g) * h), e.closePath();
				break;
			case "rectRounded":
				l = h * .516, c = h - l, o = Math.cos(g + El) * c, d = Math.cos(g + El) * (i ? i / 2 - l : c), s = Math.sin(g + El) * c, f = Math.sin(g + El) * (i ? i / 2 - l : c), e.arc(n - d, r - s, l, g - K, g - Tl), e.arc(n + f, r - o, l, g - Tl, g), e.arc(n + d, r + s, l, g, g + Tl), e.arc(n - f, r + o, l, g + Tl, g + K), e.closePath();
				break;
			case "rect":
				if (!m) {
					c = Math.SQRT1_2 * h, u = i ? i / 2 : c, e.rect(n - u, r - c, 2 * u, 2 * c);
					break;
				}
				g += El;
			case "rectRot":
				d = Math.cos(g) * (i ? i / 2 : h), o = Math.cos(g) * h, s = Math.sin(g) * h, f = Math.sin(g) * (i ? i / 2 : h), e.moveTo(n - d, r - s), e.lineTo(n + f, r - o), e.lineTo(n + d, r + s), e.lineTo(n - f, r + o), e.closePath();
				break;
			case "crossRot": g += El;
			case "cross":
				d = Math.cos(g) * (i ? i / 2 : h), o = Math.cos(g) * h, s = Math.sin(g) * h, f = Math.sin(g) * (i ? i / 2 : h), e.moveTo(n - d, r - s), e.lineTo(n + d, r + s), e.moveTo(n + f, r - o), e.lineTo(n - f, r + o);
				break;
			case "star":
				d = Math.cos(g) * (i ? i / 2 : h), o = Math.cos(g) * h, s = Math.sin(g) * h, f = Math.sin(g) * (i ? i / 2 : h), e.moveTo(n - d, r - s), e.lineTo(n + d, r + s), e.moveTo(n + f, r - o), e.lineTo(n - f, r + o), g += El, d = Math.cos(g) * (i ? i / 2 : h), o = Math.cos(g) * h, s = Math.sin(g) * h, f = Math.sin(g) * (i ? i / 2 : h), e.moveTo(n - d, r - s), e.lineTo(n + d, r + s), e.moveTo(n + f, r - o), e.lineTo(n - f, r + o);
				break;
			case "line":
				o = i ? i / 2 : Math.cos(g) * h, s = Math.sin(g) * h, e.moveTo(n - o, r - s), e.lineTo(n + o, r + s);
				break;
			case "dash":
				e.moveTo(n, r), e.lineTo(n + Math.cos(g) * (i ? i / 2 : h), r + Math.sin(g) * h);
				break;
			case !1:
				e.closePath();
				break;
		}
		e.fill(), t.borderWidth > 0 && e.stroke();
	}
}
function zu(e, t, n) {
	return n ||= .5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function Bu(e, t) {
	e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Vu(e) {
	e.restore();
}
function Hu(e, t, n, r, i) {
	if (!t) return e.lineTo(n.x, n.y);
	if (i === "middle") {
		let r = (t.x + n.x) / 2;
		e.lineTo(r, t.y), e.lineTo(r, n.y);
	} else i === "after" == !!r ? e.lineTo(n.x, t.y) : e.lineTo(t.x, n.y);
	e.lineTo(n.x, n.y);
}
function Uu(e, t, n, r) {
	if (!t) return e.lineTo(n.x, n.y);
	e.bezierCurveTo(r ? t.cp1x : t.cp2x, r ? t.cp1y : t.cp2y, r ? n.cp2x : n.cp1x, r ? n.cp2y : n.cp1y, n.x, n.y);
}
function Wu(e, t) {
	t.translation && e.translate(t.translation[0], t.translation[1]), z(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Gu(e, t, n, r, i) {
	if (i.strikethrough || i.underline) {
		let a = e.measureText(r), o = t - a.actualBoundingBoxLeft, s = t + a.actualBoundingBoxRight, c = n - a.actualBoundingBoxAscent, l = n + a.actualBoundingBoxDescent, u = i.strikethrough ? (c + l) / 2 : l;
		e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = i.decorationWidth || 2, e.moveTo(o, u), e.lineTo(s, u), e.stroke();
	}
}
function Ku(e, t) {
	let n = e.fillStyle;
	e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function qu(e, t, n, r, i, a = {}) {
	let o = B(t) ? t : [t], s = a.strokeWidth > 0 && a.strokeColor !== "", c, l;
	for (e.save(), e.font = i.string, Wu(e, a), c = 0; c < o.length; ++c) l = o[c], a.backdrop && Ku(e, a.backdrop), s && (a.strokeColor && (e.strokeStyle = a.strokeColor), z(a.strokeWidth) || (e.lineWidth = a.strokeWidth), e.strokeText(l, n, r, a.maxWidth)), e.fillText(l, n, r, a.maxWidth), Gu(e, n, r, l, a), r += Number(i.lineHeight);
	e.restore();
}
function Ju(e, t) {
	let { x: n, y: r, w: i, h: a, radius: o } = t;
	e.arc(n + o.topLeft, r + o.topLeft, o.topLeft, 1.5 * K, K, !0), e.lineTo(n, r + a - o.bottomLeft), e.arc(n + o.bottomLeft, r + a - o.bottomLeft, o.bottomLeft, K, Tl, !0), e.lineTo(n + i - o.bottomRight, r + a), e.arc(n + i - o.bottomRight, r + a - o.bottomRight, o.bottomRight, Tl, 0, !0), e.lineTo(n + i, r + o.topRight), e.arc(n + i - o.topRight, r + o.topRight, o.topRight, 0, -Tl, !0), e.lineTo(n + o.topLeft, r);
}
var Yu = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Xu = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Zu(e, t) {
	let n = ("" + e).match(Yu);
	if (!n || n[1] === "normal") return t * 1.2;
	switch (e = +n[2], n[3]) {
		case "px": return e;
		case "%":
			e /= 100;
			break;
	}
	return t * e;
}
var Qu = (e) => +e || 0;
function $u(e, t) {
	let n = {}, r = V(t), i = r ? Object.keys(t) : t, a = V(e) ? r ? (n) => U(e[n], e[t[n]]) : (t) => e[t] : () => e;
	for (let e of i) n[e] = Qu(a(e));
	return n;
}
function ed(e) {
	return $u(e, {
		top: "y",
		right: "x",
		bottom: "y",
		left: "x"
	});
}
function td(e) {
	return $u(e, [
		"topLeft",
		"topRight",
		"bottomLeft",
		"bottomRight"
	]);
}
function nd(e) {
	let t = ed(e);
	return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function rd(e, t) {
	e ||= {}, t ||= ju.font;
	let n = U(e.size, t.size);
	typeof n == "string" && (n = parseInt(n, 10));
	let r = U(e.style, t.style);
	r && !("" + r).match(Xu) && (console.warn("Invalid font style specified: \"" + r + "\""), r = void 0);
	let i = {
		family: U(e.family, t.family),
		lineHeight: Zu(U(e.lineHeight, t.lineHeight), n),
		size: n,
		style: r,
		weight: U(e.weight, t.weight),
		string: ""
	};
	return i.string = Mu(i), i;
}
function id(e, t, n, r) {
	let i = !0, a, o, s;
	for (a = 0, o = e.length; a < o; ++a) if (s = e[a], s !== void 0 && (t !== void 0 && typeof s == "function" && (s = s(t), i = !1), n !== void 0 && B(s) && (s = s[n % s.length], i = !1), s !== void 0)) return r && !i && (r.cacheable = !1), s;
}
function ad(e, t, n) {
	let { min: r, max: i } = e, a = al(t, (i - r) / 2), o = (e, t) => n && e === 0 ? 0 : e + t;
	return {
		min: o(r, -Math.abs(a)),
		max: o(i, a)
	};
}
function od(e, t) {
	return Object.assign(Object.create(e), t);
}
function sd(e, t = [""], n, r, i = () => e[0]) {
	let a = n || e;
	return r === void 0 && (r = Cd("_fallback", e)), new Proxy({
		[Symbol.toStringTag]: "Object",
		_cacheable: !0,
		_scopes: e,
		_rootScopes: a,
		_fallback: r,
		_getTarget: i,
		override: (n) => sd([n, ...e], t, a, r)
	}, {
		deleteProperty(t, n) {
			return delete t[n], delete t._keys, delete e[0][n], !0;
		},
		get(n, r) {
			return fd(n, r, () => Sd(r, t, e, n));
		},
		getOwnPropertyDescriptor(e, t) {
			return Reflect.getOwnPropertyDescriptor(e._scopes[0], t);
		},
		getPrototypeOf() {
			return Reflect.getPrototypeOf(e[0]);
		},
		has(e, t) {
			return wd(e).includes(t);
		},
		ownKeys(e) {
			return wd(e);
		},
		set(e, t, n) {
			let r = e._storage ||= i();
			return e[t] = r[t] = n, delete e._keys, !0;
		}
	});
}
function cd(e, t, n, r) {
	let i = {
		_cacheable: !1,
		_proxy: e,
		_context: t,
		_subProxy: n,
		_stack: /* @__PURE__ */ new Set(),
		_descriptors: ld(e, r),
		setContext: (t) => cd(e, t, n, r),
		override: (i) => cd(e.override(i), t, n, r)
	};
	return new Proxy(i, {
		deleteProperty(t, n) {
			return delete t[n], delete e[n], !0;
		},
		get(e, t, n) {
			return fd(e, t, () => pd(e, t, n));
		},
		getOwnPropertyDescriptor(t, n) {
			return t._descriptors.allKeys ? Reflect.has(e, n) ? {
				enumerable: !0,
				configurable: !0
			} : void 0 : Reflect.getOwnPropertyDescriptor(e, n);
		},
		getPrototypeOf() {
			return Reflect.getPrototypeOf(e);
		},
		has(t, n) {
			return Reflect.has(e, n);
		},
		ownKeys() {
			return Reflect.ownKeys(e);
		},
		set(t, n, r) {
			return e[n] = r, delete t[n], !0;
		}
	});
}
function ld(e, t = {
	scriptable: !0,
	indexable: !0
}) {
	let { _scriptable: n = t.scriptable, _indexable: r = t.indexable, _allKeys: i = t.allKeys } = e;
	return {
		allKeys: i,
		scriptable: n,
		indexable: r,
		isScriptable: yl(n) ? n : () => n,
		isIndexable: yl(r) ? r : () => r
	};
}
var ud = (e, t) => e ? e + _l(t) : t, dd = (e, t) => V(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function fd(e, t, n) {
	if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor") return e[t];
	let r = n();
	return e[t] = r, r;
}
function pd(e, t, n) {
	let { _proxy: r, _context: i, _subProxy: a, _descriptors: o } = e, s = r[t];
	return yl(s) && o.isScriptable(t) && (s = md(t, s, e, n)), B(s) && s.length && (s = hd(t, s, e, o.isIndexable)), dd(t, s) && (s = cd(s, i, a && a[t], o)), s;
}
function md(e, t, n, r) {
	let { _proxy: i, _context: a, _subProxy: o, _stack: s } = n;
	if (s.has(e)) throw Error("Recursion detected: " + Array.from(s).join("->") + "->" + e);
	s.add(e);
	let c = t(a, o || r);
	return s.delete(e), dd(e, c) && (c = yd(i._scopes, i, e, c)), c;
}
function hd(e, t, n, r) {
	let { _proxy: i, _context: a, _subProxy: o, _descriptors: s } = n;
	if (a.index !== void 0 && r(e)) return t[a.index % t.length];
	if (V(t[0])) {
		let n = t, r = i._scopes.filter((e) => e !== n);
		t = [];
		for (let c of n) {
			let n = yd(r, i, e, c);
			t.push(cd(n, a, o && o[e], s));
		}
	}
	return t;
}
function gd(e, t, n) {
	return yl(e) ? e(t, n) : e;
}
var _d = (e, t) => e === !0 ? t : typeof e == "string" ? gl(t, e) : void 0;
function vd(e, t, n, r, i) {
	for (let a of t) {
		let t = _d(n, a);
		if (t) {
			e.add(t);
			let a = gd(t._fallback, n, i);
			if (a !== void 0 && a !== n && a !== r) return a;
		} else if (t === !1 && r !== void 0 && n !== r) return null;
	}
	return !1;
}
function yd(e, t, n, r) {
	let i = t._rootScopes, a = gd(t._fallback, n, r), o = [...e, ...i], s = /* @__PURE__ */ new Set();
	s.add(r);
	let c = bd(s, o, n, a || n, r);
	return c === null || a !== void 0 && a !== n && (c = bd(s, o, a, c, r), c === null) ? !1 : sd(Array.from(s), [""], i, a, () => xd(t, n, r));
}
function bd(e, t, n, r, i) {
	for (; n;) n = vd(e, t, n, r, i);
	return n;
}
function xd(e, t, n) {
	let r = e._getTarget();
	t in r || (r[t] = {});
	let i = r[t];
	return B(i) && V(n) ? n : i || {};
}
function Sd(e, t, n, r) {
	let i;
	for (let a of t) if (i = Cd(ud(a, e), n), i !== void 0) return dd(e, i) ? yd(n, r, e, i) : i;
}
function Cd(e, t) {
	for (let n of t) {
		if (!n) continue;
		let t = n[e];
		if (t !== void 0) return t;
	}
}
function wd(e) {
	let t = e._keys;
	return t ||= e._keys = Td(e._scopes), t;
}
function Td(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) for (let e of Object.keys(n).filter((e) => !e.startsWith("_"))) t.add(e);
	return Array.from(t);
}
function Ed(e, t, n, r) {
	let { iScale: i } = e, { key: a = "r" } = this._parsing, o = Array(r), s, c, l, u;
	for (s = 0, c = r; s < c; ++s) l = s + n, u = t[l], o[s] = { r: i.parse(gl(u, a), l) };
	return o;
}
var Dd = 2 ** -52 || 1e-14, Od = (e, t) => t < e.length && !e[t].skip && e[t], kd = (e) => e === "x" ? "y" : "x";
function Ad(e, t, n, r) {
	let i = e.skip ? t : e, a = t, o = n.skip ? t : n, s = Vl(a, i), c = Vl(o, a), l = s / (s + c), u = c / (s + c);
	l = isNaN(l) ? 0 : l, u = isNaN(u) ? 0 : u;
	let d = r * l, f = r * u;
	return {
		previous: {
			x: a.x - d * (o.x - i.x),
			y: a.y - d * (o.y - i.y)
		},
		next: {
			x: a.x + f * (o.x - i.x),
			y: a.y + f * (o.y - i.y)
		}
	};
}
function jd(e, t, n) {
	let r = e.length, i, a, o, s, c, l = Od(e, 0);
	for (let u = 0; u < r - 1; ++u) if (c = l, l = Od(e, u + 1), !(!c || !l)) {
		if (Al(t[u], 0, Dd)) {
			n[u] = n[u + 1] = 0;
			continue;
		}
		i = n[u] / t[u], a = n[u + 1] / t[u], s = i ** 2 + a ** 2, !(s <= 9) && (o = 3 / Math.sqrt(s), n[u] = i * o * t[u], n[u + 1] = a * o * t[u]);
	}
}
function Md(e, t, n = "x") {
	let r = kd(n), i = e.length, a, o, s, c = Od(e, 0);
	for (let l = 0; l < i; ++l) {
		if (o = s, s = c, c = Od(e, l + 1), !s) continue;
		let i = s[n], u = s[r];
		o && (a = (i - o[n]) / 3, s[`cp1${n}`] = i - a, s[`cp1${r}`] = u - a * t[l]), c && (a = (c[n] - i) / 3, s[`cp2${n}`] = i + a, s[`cp2${r}`] = u + a * t[l]);
	}
}
function Nd(e, t = "x") {
	let n = kd(t), r = e.length, i = Array(r).fill(0), a = Array(r), o, s, c, l = Od(e, 0);
	for (o = 0; o < r; ++o) if (s = c, c = l, l = Od(e, o + 1), c) {
		if (l) {
			let e = l[t] - c[t];
			i[o] = e === 0 ? 0 : (l[n] - c[n]) / e;
		}
		a[o] = s ? l ? kl(i[o - 1]) === kl(i[o]) ? (i[o - 1] + i[o]) / 2 : 0 : i[o - 1] : i[o];
	}
	jd(e, i, a), Md(e, a, t);
}
function Pd(e, t, n) {
	return Math.max(Math.min(e, n), t);
}
function Fd(e, t) {
	let n, r, i, a, o, s = zu(e[0], t);
	for (n = 0, r = e.length; n < r; ++n) o = a, a = s, s = n < r - 1 && zu(e[n + 1], t), a && (i = e[n], o && (i.cp1x = Pd(i.cp1x, t.left, t.right), i.cp1y = Pd(i.cp1y, t.top, t.bottom)), s && (i.cp2x = Pd(i.cp2x, t.left, t.right), i.cp2y = Pd(i.cp2y, t.top, t.bottom)));
}
function Id(e, t, n, r, i) {
	let a, o, s, c;
	if (t.spanGaps && (e = e.filter((e) => !e.skip)), t.cubicInterpolationMode === "monotone") Nd(e, i);
	else {
		let n = r ? e[e.length - 1] : e[0];
		for (a = 0, o = e.length; a < o; ++a) s = e[a], c = Ad(n, s, e[Math.min(a + 1, o - +!r) % o], t.tension), s.cp1x = c.previous.x, s.cp1y = c.previous.y, s.cp2x = c.next.x, s.cp2y = c.next.y, n = s;
	}
	t.capBezierPoints && Fd(e, n);
}
function Ld() {
	return typeof window < "u" && typeof document < "u";
}
function Rd(e) {
	let t = e.parentNode;
	return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function zd(e, t, n) {
	let r;
	return typeof e == "string" ? (r = parseInt(e, 10), e.indexOf("%") !== -1 && (r = r / 100 * t.parentNode[n])) : r = e, r;
}
var Bd = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Vd(e, t) {
	return Bd(e).getPropertyValue(t);
}
var Hd = [
	"top",
	"right",
	"bottom",
	"left"
];
function Ud(e, t, n) {
	let r = {};
	n = n ? "-" + n : "";
	for (let i = 0; i < 4; i++) {
		let a = Hd[i];
		r[a] = parseFloat(e[t + "-" + a + n]) || 0;
	}
	return r.width = r.left + r.right, r.height = r.top + r.bottom, r;
}
var Wd = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Gd(e, t) {
	let n = e.touches, r = n && n.length ? n[0] : e, { offsetX: i, offsetY: a } = r, o = !1, s, c;
	if (Wd(i, a, e.target)) s = i, c = a;
	else {
		let e = t.getBoundingClientRect();
		s = r.clientX - e.left, c = r.clientY - e.top, o = !0;
	}
	return {
		x: s,
		y: c,
		box: o
	};
}
function Kd(e, t) {
	if ("native" in e) return e;
	let { canvas: n, currentDevicePixelRatio: r } = t, i = Bd(n), a = i.boxSizing === "border-box", o = Ud(i, "padding"), s = Ud(i, "border", "width"), { x: c, y: l, box: u } = Gd(e, n), d = o.left + (u && s.left), f = o.top + (u && s.top), { width: p, height: m } = t;
	return a && (p -= o.width + s.width, m -= o.height + s.height), {
		x: Math.round((c - d) / p * n.width / r),
		y: Math.round((l - f) / m * n.height / r)
	};
}
function qd(e, t, n) {
	let r, i;
	if (t === void 0 || n === void 0) {
		let a = e && Rd(e);
		if (!a) t = e.clientWidth, n = e.clientHeight;
		else {
			let e = a.getBoundingClientRect(), o = Bd(a), s = Ud(o, "border", "width"), c = Ud(o, "padding");
			t = e.width - c.width - s.width, n = e.height - c.height - s.height, r = zd(o.maxWidth, a, "clientWidth"), i = zd(o.maxHeight, a, "clientHeight");
		}
	}
	return {
		width: t,
		height: n,
		maxWidth: r || Cl,
		maxHeight: i || Cl
	};
}
var Jd = (e) => Math.round(e * 10) / 10;
function Yd(e, t, n, r) {
	let i = Bd(e), a = Ud(i, "margin"), o = zd(i.maxWidth, e, "clientWidth") || Cl, s = zd(i.maxHeight, e, "clientHeight") || Cl, c = qd(e, t, n), { width: l, height: u } = c;
	if (i.boxSizing === "content-box") {
		let e = Ud(i, "border", "width"), t = Ud(i, "padding");
		l -= t.width + e.width, u -= t.height + e.height;
	}
	return l = Math.max(0, l - a.width), u = Math.max(0, r ? l / r : u - a.height), l = Jd(Math.min(l, o, c.maxWidth)), u = Jd(Math.min(u, s, c.maxHeight)), l && !u && (u = Jd(l / 2)), (t !== void 0 || n !== void 0) && r && c.height && u > c.height && (u = c.height, l = Jd(Math.floor(u * r))), {
		width: l,
		height: u
	};
}
function Xd(e, t, n) {
	let r = t || 1, i = Jd(e.height * r), a = Jd(e.width * r);
	e.height = Jd(e.height), e.width = Jd(e.width);
	let o = e.canvas;
	return o.style && (n || !o.style.height && !o.style.width) && (o.style.height = `${e.height}px`, o.style.width = `${e.width}px`), e.currentDevicePixelRatio !== r || o.height !== i || o.width !== a ? (e.currentDevicePixelRatio = r, o.height = i, o.width = a, e.ctx.setTransform(r, 0, 0, r, 0, 0), !0) : !1;
}
var Zd = function() {
	let e = !1;
	try {
		let t = { get passive() {
			return e = !0, !1;
		} };
		Ld() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
	} catch {}
	return e;
}();
function Qd(e, t) {
	let n = Vd(e, t), r = n && n.match(/^(\d+)(\.\d+)?px$/);
	return r ? +r[1] : void 0;
}
function $d(e, t, n, r) {
	return {
		x: e.x + n * (t.x - e.x),
		y: e.y + n * (t.y - e.y)
	};
}
function ef(e, t, n, r) {
	return {
		x: e.x + n * (t.x - e.x),
		y: r === "middle" ? n < .5 ? e.y : t.y : r === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
	};
}
function tf(e, t, n, r) {
	let i = {
		x: e.cp2x,
		y: e.cp2y
	}, a = {
		x: t.cp1x,
		y: t.cp1y
	}, o = $d(e, i, n), s = $d(i, a, n), c = $d(a, t, n);
	return $d($d(o, s, n), $d(s, c, n), n);
}
var nf = function(e, t) {
	return {
		x(n) {
			return e + e + t - n;
		},
		setWidth(e) {
			t = e;
		},
		textAlign(e) {
			return e === "center" ? e : e === "right" ? "left" : "right";
		},
		xPlus(e, t) {
			return e - t;
		},
		leftForLtr(e, t) {
			return e - t;
		}
	};
}, rf = function() {
	return {
		x(e) {
			return e;
		},
		setWidth(e) {},
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
function af(e, t, n) {
	return e ? nf(t, n) : rf();
}
function of(e, t) {
	let n, r;
	(t === "ltr" || t === "rtl") && (n = e.canvas.style, r = [n.getPropertyValue("direction"), n.getPropertyPriority("direction")], n.setProperty("direction", t, "important"), e.prevTextDirection = r);
}
function sf(e, t) {
	t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function cf(e) {
	return e === "angle" ? {
		between: Wl,
		compare: Hl,
		normalize: Ul
	} : {
		between: ql,
		compare: (e, t) => e - t,
		normalize: (e) => e
	};
}
function lf({ start: e, end: t, count: n, loop: r, style: i }) {
	return {
		start: e % n,
		end: t % n,
		loop: r && (t - e + 1) % n === 0,
		style: i
	};
}
function uf(e, t, n) {
	let { property: r, start: i, end: a } = n, { between: o, normalize: s } = cf(r), c = t.length, { start: l, end: u, loop: d } = e, f, p;
	if (d) {
		for (l += c, u += c, f = 0, p = c; f < p && o(s(t[l % c][r]), i, a); ++f) l--, u--;
		l %= c, u %= c;
	}
	return u < l && (u += c), {
		start: l,
		end: u,
		loop: d,
		style: e.style
	};
}
function df(e, t, n) {
	if (!n) return [e];
	let { property: r, start: i, end: a } = n, o = t.length, { compare: s, between: c, normalize: l } = cf(r), { start: u, end: d, loop: f, style: p } = uf(e, t, n), m = [], h = !1, g = null, _, v, y, b = () => c(i, y, _) && s(i, y) !== 0, x = () => s(a, _) === 0 || c(a, y, _), S = () => h || b(), C = () => !h || x();
	for (let e = u, n = u; e <= d; ++e) v = t[e % o], !v.skip && (_ = l(v[r]), _ !== y && (h = c(_, i, a), g === null && S() && (g = s(_, i) === 0 ? e : n), g !== null && C() && (m.push(lf({
		start: g,
		end: e,
		loop: f,
		count: o,
		style: p
	})), g = null), n = e, y = _));
	return g !== null && m.push(lf({
		start: g,
		end: d,
		loop: f,
		count: o,
		style: p
	})), m;
}
function ff(e, t) {
	let n = [], r = e.segments;
	for (let i = 0; i < r.length; i++) {
		let a = df(r[i], e.points, t);
		a.length && n.push(...a);
	}
	return n;
}
function pf(e, t, n, r) {
	let i = 0, a = t - 1;
	if (n && !r) for (; i < t && !e[i].skip;) i++;
	for (; i < t && e[i].skip;) i++;
	for (i %= t, n && (a += i); a > i && e[a % t].skip;) a--;
	return a %= t, {
		start: i,
		end: a
	};
}
function mf(e, t, n, r) {
	let i = e.length, a = [], o = t, s = e[t], c;
	for (c = t + 1; c <= n; ++c) {
		let n = e[c % i];
		n.skip || n.stop ? s.skip || (r = !1, a.push({
			start: t % i,
			end: (c - 1) % i,
			loop: r
		}), t = o = n.stop ? c : null) : (o = c, s.skip && (t = c)), s = n;
	}
	return o !== null && a.push({
		start: t % i,
		end: o % i,
		loop: r
	}), a;
}
function hf(e, t) {
	let n = e.points, r = e.options.spanGaps, i = n.length;
	if (!i) return [];
	let a = !!e._loop, { start: o, end: s } = pf(n, i, a, r);
	return r === !0 ? gf(e, [{
		start: o,
		end: s,
		loop: a
	}], n, t) : gf(e, mf(n, o, s < o ? s + i : s, !!e._fullLoop && o === 0 && s === i - 1), n, t);
}
function gf(e, t, n, r) {
	return !r || !r.setContext || !n ? t : _f(e, t, n, r);
}
function _f(e, t, n, r) {
	let i = e._chart.getContext(), a = vf(e.options), { _datasetIndex: o, options: { spanGaps: s } } = e, c = n.length, l = [], u = a, d = t[0].start, f = d;
	function p(e, t, r, i) {
		let a = s ? -1 : 1;
		if (e !== t) {
			for (e += c; n[e % c].skip;) e -= a;
			for (; n[t % c].skip;) t += a;
			e % c !== t % c && (l.push({
				start: e % c,
				end: t % c,
				loop: r,
				style: i
			}), u = i, d = t % c);
		}
	}
	for (let e of t) {
		d = s ? d : e.start;
		let t = n[d % c], a;
		for (f = d + 1; f <= e.end; f++) {
			let s = n[f % c];
			a = vf(r.setContext(od(i, {
				type: "segment",
				p0: t,
				p1: s,
				p0DataIndex: (f - 1) % c,
				p1DataIndex: f % c,
				datasetIndex: o
			}))), yf(a, u) && p(d, f - 1, e.loop, u), t = s, u = a;
		}
		d < f - 1 && p(d, f - 1, e.loop, u);
	}
	return l;
}
function vf(e) {
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
function yf(e, t) {
	if (!t) return !1;
	let n = [], r = function(e, t) {
		return pu(t) ? (n.includes(t) || n.push(t), n.indexOf(t)) : t;
	};
	return JSON.stringify(e, r) !== JSON.stringify(t, r);
}
function bf(e, t, n) {
	return e.options.clip ? e[n] : t[n];
}
function xf(e, t) {
	let { xScale: n, yScale: r } = e;
	return n && r ? {
		left: bf(n, t, "left"),
		right: bf(n, t, "right"),
		top: bf(r, t, "top"),
		bottom: bf(r, t, "bottom")
	} : t;
}
function Sf(e, t) {
	let n = t._clip;
	if (n.disabled) return !1;
	let r = xf(t, e.chartArea);
	return {
		left: n.left === !1 ? 0 : r.left - (n.left === !0 ? 0 : n.left),
		right: n.right === !1 ? e.width : r.right + (n.right === !0 ? 0 : n.right),
		top: n.top === !1 ? 0 : r.top - (n.top === !0 ? 0 : n.top),
		bottom: n.bottom === !1 ? e.height : r.bottom + (n.bottom === !0 ? 0 : n.bottom)
	};
}
var Cf = /* #__PURE__ */ new class {
	constructor() {
		this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
	}
	_notify(e, t, n, r) {
		let i = t.listeners[r], a = t.duration;
		i.forEach((r) => r({
			chart: e,
			initial: t.initial,
			numSteps: a,
			currentStep: Math.min(n - t.start, a)
		}));
	}
	_refresh() {
		this._request ||= (this._running = !0, nu.call(window, () => {
			this._update(), this._request = null, this._running && this._refresh();
		}));
	}
	_update(e = Date.now()) {
		let t = 0;
		this._charts.forEach((n, r) => {
			if (!n.running || !n.items.length) return;
			let i = n.items, a = i.length - 1, o = !1, s;
			for (; a >= 0; --a) s = i[a], s._active ? (s._total > n.duration && (n.duration = s._total), s.tick(e), o = !0) : (i[a] = i[i.length - 1], i.pop());
			o && (r.draw(), this._notify(r, n, e, "progress")), i.length || (n.running = !1, this._notify(r, n, e, "complete"), n.initial = !1), t += i.length;
		}), this._lastDate = e, t === 0 && (this._running = !1);
	}
	_getAnims(e) {
		let t = this._charts, n = t.get(e);
		return n || (n = {
			running: !1,
			initial: !0,
			items: [],
			listeners: {
				complete: [],
				progress: []
			}
		}, t.set(e, n)), n;
	}
	listen(e, t, n) {
		this._getAnims(e).listeners[t].push(n);
	}
	add(e, t) {
		!t || !t.length || this._getAnims(e).items.push(...t);
	}
	has(e) {
		return this._getAnims(e).items.length > 0;
	}
	start(e) {
		let t = this._charts.get(e);
		t && (t.running = !0, t.start = Date.now(), t.duration = t.items.reduce((e, t) => Math.max(e, t._duration), 0), this._refresh());
	}
	running(e) {
		if (!this._running) return !1;
		let t = this._charts.get(e);
		return !(!t || !t.running || !t.items.length);
	}
	stop(e) {
		let t = this._charts.get(e);
		if (!t || !t.items.length) return;
		let n = t.items, r = n.length - 1;
		for (; r >= 0; --r) n[r].cancel();
		t.items = [], this._notify(e, t, Date.now(), "complete");
	}
	remove(e) {
		return this._charts.delete(e);
	}
}(), wf = "transparent", Tf = {
	boolean(e, t, n) {
		return n > .5 ? t : e;
	},
	color(e, t, n) {
		let r = mu(e || wf), i = r.valid && mu(t || wf);
		return i && i.valid ? i.mix(r, n).hexString() : t;
	},
	number(e, t, n) {
		return e + (t - e) * n;
	}
}, Ef = class {
	constructor(e, t, n, r) {
		let i = t[n];
		r = id([
			e.to,
			r,
			i,
			e.from
		]);
		let a = id([
			e.from,
			i,
			r
		]);
		this._active = !0, this._fn = e.fn || Tf[e.type || typeof a], this._easing = fu[e.easing] || fu.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = t, this._prop = n, this._from = a, this._to = r, this._promises = void 0;
	}
	active() {
		return this._active;
	}
	update(e, t, n) {
		if (this._active) {
			this._notify(!1);
			let r = this._target[this._prop], i = n - this._start, a = this._duration - i;
			this._start = n, this._duration = Math.floor(Math.max(a, e.duration)), this._total += i, this._loop = !!e.loop, this._to = id([
				e.to,
				t,
				r,
				e.from
			]), this._from = id([
				e.from,
				r,
				t
			]);
		}
	}
	cancel() {
		this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
	}
	tick(e) {
		let t = e - this._start, n = this._duration, r = this._prop, i = this._from, a = this._loop, o = this._to, s;
		if (this._active = i !== o && (a || t < n), !this._active) {
			this._target[r] = o, this._notify(!0);
			return;
		}
		if (t < 0) {
			this._target[r] = i;
			return;
		}
		s = t / n % 2, s = a && s > 1 ? 2 - s : s, s = this._easing(Math.min(1, Math.max(0, s))), this._target[r] = this._fn(i, o, s);
	}
	wait() {
		let e = this._promises ||= [];
		return new Promise((t, n) => {
			e.push({
				res: t,
				rej: n
			});
		});
	}
	_notify(e) {
		let t = e ? "res" : "rej", n = this._promises || [];
		for (let e = 0; e < n.length; e++) n[e][t]();
	}
}, Df = class {
	constructor(e, t) {
		this._chart = e, this._properties = /* @__PURE__ */ new Map(), this.configure(t);
	}
	configure(e) {
		if (!V(e)) return;
		let t = Object.keys(ju.animation), n = this._properties;
		Object.getOwnPropertyNames(e).forEach((r) => {
			let i = e[r];
			if (!V(i)) return;
			let a = {};
			for (let e of t) a[e] = i[e];
			(B(i.properties) && i.properties || [r]).forEach((e) => {
				(e === r || !n.has(e)) && n.set(e, a);
			});
		});
	}
	_animateOptions(e, t) {
		let n = t.options, r = kf(e, n);
		if (!r) return [];
		let i = this._createAnimations(r, n);
		return n.$shared && Of(e.options.$animations, n).then(() => {
			e.options = n;
		}, () => {}), i;
	}
	_createAnimations(e, t) {
		let n = this._properties, r = [], i = e.$animations ||= {}, a = Object.keys(t), o = Date.now(), s;
		for (s = a.length - 1; s >= 0; --s) {
			let c = a[s];
			if (c.charAt(0) === "$") continue;
			if (c === "options") {
				r.push(...this._animateOptions(e, t));
				continue;
			}
			let l = t[c], u = i[c], d = n.get(c);
			if (u) if (d && u.active()) {
				u.update(d, l, o);
				continue;
			} else u.cancel();
			if (!d || !d.duration) {
				e[c] = l;
				continue;
			}
			i[c] = u = new Ef(d, e, c, l), r.push(u);
		}
		return r;
	}
	update(e, t) {
		if (this._properties.size === 0) {
			Object.assign(e, t);
			return;
		}
		let n = this._createAnimations(e, t);
		if (n.length) return Cf.add(this._chart, n), !0;
	}
};
function Of(e, t) {
	let n = [], r = Object.keys(t);
	for (let t = 0; t < r.length; t++) {
		let i = e[r[t]];
		i && i.active() && n.push(i.wait());
	}
	return Promise.all(n);
}
function kf(e, t) {
	if (!t) return;
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
function Af(e, t) {
	let n = e && e.options || {}, r = n.reverse, i = n.min === void 0 ? t : 0, a = n.max === void 0 ? t : 0;
	return {
		start: r ? a : i,
		end: r ? i : a
	};
}
function jf(e, t, n) {
	if (n === !1) return !1;
	let r = Af(e, n), i = Af(t, n);
	return {
		top: i.end,
		right: r.end,
		bottom: i.start,
		left: r.start
	};
}
function Mf(e) {
	let t, n, r, i;
	return V(e) ? (t = e.top, n = e.right, r = e.bottom, i = e.left) : t = n = r = i = e, {
		top: t,
		right: n,
		bottom: r,
		left: i,
		disabled: e === !1
	};
}
function Nf(e, t) {
	let n = [], r = e._getSortedDatasetMetas(t), i, a;
	for (i = 0, a = r.length; i < a; ++i) n.push(r[i].index);
	return n;
}
function Pf(e, t, n, r = {}) {
	let i = e.keys, a = r.mode === "single", o, s, c, l;
	if (t === null) return;
	let u = !1;
	for (o = 0, s = i.length; o < s; ++o) {
		if (c = +i[o], c === n) {
			if (u = !0, r.all) continue;
			break;
		}
		l = e.values[c], H(l) && (a || t === 0 || kl(t) === kl(l)) && (t += l);
	}
	return !u && !r.all ? 0 : t;
}
function Ff(e, t) {
	let { iScale: n, vScale: r } = t, i = n.axis === "x" ? "x" : "y", a = r.axis === "x" ? "x" : "y", o = Object.keys(e), s = Array(o.length), c, l, u;
	for (c = 0, l = o.length; c < l; ++c) u = o[c], s[c] = {
		[i]: u,
		[a]: e[u]
	};
	return s;
}
function If(e, t) {
	let n = e && e.options.stacked;
	return n || n === void 0 && t.stack !== void 0;
}
function Lf(e, t, n) {
	return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function Rf(e) {
	let { min: t, max: n, minDefined: r, maxDefined: i } = e.getUserBounds();
	return {
		min: r ? t : -Infinity,
		max: i ? n : Infinity
	};
}
function zf(e, t, n) {
	let r = e[t] || (e[t] = {});
	return r[n] || (r[n] = {});
}
function Bf(e, t, n, r) {
	for (let i of t.getMatchingVisibleMetas(r).reverse()) {
		let t = e[i.index];
		if (n && t > 0 || !n && t < 0) return i.index;
	}
	return null;
}
function Vf(e, t) {
	let { chart: n, _cachedMeta: r } = e, i = n._stacks ||= {}, { iScale: a, vScale: o, index: s } = r, c = a.axis, l = o.axis, u = Lf(a, o, r), d = t.length, f;
	for (let e = 0; e < d; ++e) {
		let n = t[e], { [c]: a, [l]: d } = n, p = n._stacks ||= {};
		f = p[l] = zf(i, u, a), f[s] = d, f._top = Bf(f, o, !0, r.type), f._bottom = Bf(f, o, !1, r.type);
		let m = f._visualValues ||= {};
		m[s] = d;
	}
}
function Hf(e, t) {
	let n = e.scales;
	return Object.keys(n).filter((e) => n[e].axis === t).shift();
}
function Uf(e, t) {
	return od(e, {
		active: !1,
		dataset: void 0,
		datasetIndex: t,
		index: t,
		mode: "default",
		type: "dataset"
	});
}
function Wf(e, t, n) {
	return od(e, {
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
function Gf(e, t) {
	let n = e.controller.index, r = e.vScale && e.vScale.axis;
	if (r) {
		t ||= e._parsed;
		for (let e of t) {
			let t = e._stacks;
			if (!t || t[r] === void 0 || t[r][n] === void 0) return;
			delete t[r][n], t[r]._visualValues !== void 0 && t[r]._visualValues[n] !== void 0 && delete t[r]._visualValues[n];
		}
	}
}
var Kf = (e) => e === "reset" || e === "none", qf = (e, t) => t ? e : Object.assign({}, e), Jf = (e, t, n) => e && !t.hidden && t._stacked && {
	keys: Nf(n, !0),
	values: null
}, Yf = class {
	static defaults = {};
	static datasetElementType = null;
	static dataElementType = null;
	constructor(e, t) {
		this.chart = e, this._ctx = e.ctx, this.index = t, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
	}
	initialize() {
		let e = this._cachedMeta;
		this.configure(), this.linkScales(), e._stacked = If(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
	}
	updateIndex(e) {
		this.index !== e && Gf(this._cachedMeta), this.index = e;
	}
	linkScales() {
		let e = this.chart, t = this._cachedMeta, n = this.getDataset(), r = (e, t, n, r) => e === "x" ? t : e === "r" ? r : n, i = t.xAxisID = U(n.xAxisID, Hf(e, "x")), a = t.yAxisID = U(n.yAxisID, Hf(e, "y")), o = t.rAxisID = U(n.rAxisID, Hf(e, "r")), s = t.indexAxis, c = t.iAxisID = r(s, i, a, o), l = t.vAxisID = r(s, a, i, o);
		t.xScale = this.getScaleForId(i), t.yScale = this.getScaleForId(a), t.rScale = this.getScaleForId(o), t.iScale = this.getScaleForId(c), t.vScale = this.getScaleForId(l);
	}
	getDataset() {
		return this.chart.data.datasets[this.index];
	}
	getMeta() {
		return this.chart.getDatasetMeta(this.index);
	}
	getScaleForId(e) {
		return this.chart.scales[e];
	}
	_getOtherScale(e) {
		let t = this._cachedMeta;
		return e === t.iScale ? t.vScale : t.iScale;
	}
	reset() {
		this._update("reset");
	}
	_destroy() {
		let e = this._cachedMeta;
		this._data && eu(this._data, this), e._stacked && Gf(e);
	}
	_dataCheck() {
		let e = this.getDataset(), t = e.data ||= [], n = this._data;
		if (V(t)) {
			let e = this._cachedMeta;
			this._data = Ff(t, e);
		} else if (n !== t) {
			if (n) {
				eu(n, this);
				let e = this._cachedMeta;
				Gf(e), e._parsed = [];
			}
			t && Object.isExtensible(t) && $l(t, this), this._syncList = [], this._data = t;
		}
	}
	addElements() {
		let e = this._cachedMeta;
		this._dataCheck(), this.datasetElementType && (e.dataset = new this.datasetElementType());
	}
	buildOrUpdateElements(e) {
		let t = this._cachedMeta, n = this.getDataset(), r = !1;
		this._dataCheck();
		let i = t._stacked;
		t._stacked = If(t.vScale, t), t.stack !== n.stack && (r = !0, Gf(t), t.stack = n.stack), this._resyncElements(e), (r || i !== t._stacked) && (Vf(this, t._parsed), t._stacked = If(t.vScale, t));
	}
	configure() {
		let e = this.chart.config, t = e.datasetScopeKeys(this._type), n = e.getOptionScopes(this.getDataset(), t, !0);
		this.options = e.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
	}
	parse(e, t) {
		let { _cachedMeta: n, _data: r } = this, { iScale: i, _stacked: a } = n, o = i.axis, s = e === 0 && t === r.length ? !0 : n._sorted, c = e > 0 && n._parsed[e - 1], l, u, d;
		if (this._parsing === !1) n._parsed = r, n._sorted = !0, d = r;
		else {
			d = B(r[e]) ? this.parseArrayData(n, r, e, t) : V(r[e]) ? this.parseObjectData(n, r, e, t) : this.parsePrimitiveData(n, r, e, t);
			let i = () => u[o] === null || c && u[o] < c[o];
			for (l = 0; l < t; ++l) n._parsed[l + e] = u = d[l], s && (i() && (s = !1), c = u);
			n._sorted = s;
		}
		a && Vf(this, d);
	}
	parsePrimitiveData(e, t, n, r) {
		let { iScale: i, vScale: a } = e, o = i.axis, s = a.axis, c = i.getLabels(), l = i === a, u = Array(r), d, f, p;
		for (d = 0, f = r; d < f; ++d) p = d + n, u[d] = {
			[o]: l || i.parse(c[p], p),
			[s]: a.parse(t[p], p)
		};
		return u;
	}
	parseArrayData(e, t, n, r) {
		let { xScale: i, yScale: a } = e, o = Array(r), s, c, l, u;
		for (s = 0, c = r; s < c; ++s) l = s + n, u = t[l], o[s] = {
			x: i.parse(u[0], l),
			y: a.parse(u[1], l)
		};
		return o;
	}
	parseObjectData(e, t, n, r) {
		let { xScale: i, yScale: a } = e, { xAxisKey: o = "x", yAxisKey: s = "y" } = this._parsing, c = Array(r), l, u, d, f;
		for (l = 0, u = r; l < u; ++l) d = l + n, f = t[d], c[l] = {
			x: i.parse(gl(f, o), d),
			y: a.parse(gl(f, s), d)
		};
		return c;
	}
	getParsed(e) {
		return this._cachedMeta._parsed[e];
	}
	getDataElement(e) {
		return this._cachedMeta.data[e];
	}
	applyStack(e, t, n) {
		let r = this.chart, i = this._cachedMeta, a = t[e.axis];
		return Pf({
			keys: Nf(r, !0),
			values: t._stacks[e.axis]._visualValues
		}, a, i.index, { mode: n });
	}
	updateRangeFromParsed(e, t, n, r) {
		let i = n[t.axis], a = i === null ? NaN : i, o = r && n._stacks[t.axis];
		r && o && (r.values = o, a = Pf(r, i, this._cachedMeta.index)), e.min = Math.min(e.min, a), e.max = Math.max(e.max, a);
	}
	getMinMax(e, t) {
		let n = this._cachedMeta, r = n._parsed, i = n._sorted && e === n.iScale, a = r.length, o = this._getOtherScale(e), s = Jf(t, n, this.chart), c = {
			min: Infinity,
			max: -Infinity
		}, { min: l, max: u } = Rf(o), d, f;
		function p() {
			f = r[d];
			let t = f[o.axis];
			return !H(f[e.axis]) || l > t || u < t;
		}
		for (d = 0; d < a && !(!p() && (this.updateRangeFromParsed(c, e, f, s), i)); ++d);
		if (i) {
			for (d = a - 1; d >= 0; --d) if (!p()) {
				this.updateRangeFromParsed(c, e, f, s);
				break;
			}
		}
		return c;
	}
	getAllParsedValues(e) {
		let t = this._cachedMeta._parsed, n = [], r, i, a;
		for (r = 0, i = t.length; r < i; ++r) a = t[r][e.axis], H(a) && n.push(a);
		return n;
	}
	getMaxOverflow() {
		return !1;
	}
	getLabelAndValue(e) {
		let t = this._cachedMeta, n = t.iScale, r = t.vScale, i = this.getParsed(e);
		return {
			label: n ? "" + n.getLabelForValue(i[n.axis]) : "",
			value: r ? "" + r.getLabelForValue(i[r.axis]) : ""
		};
	}
	_update(e) {
		let t = this._cachedMeta;
		this.update(e || "default"), t._clip = Mf(U(this.options.clip, jf(t.xScale, t.yScale, this.getMaxOverflow())));
	}
	update(e) {}
	draw() {
		let e = this._ctx, t = this.chart, n = this._cachedMeta, r = n.data || [], i = t.chartArea, a = [], o = this._drawStart || 0, s = this._drawCount || r.length - o, c = this.options.drawActiveElementsOnTop, l;
		for (n.dataset && n.dataset.draw(e, i, o, s), l = o; l < o + s; ++l) {
			let t = r[l];
			t.hidden || (t.active && c ? a.push(t) : t.draw(e, i));
		}
		for (l = 0; l < a.length; ++l) a[l].draw(e, i);
	}
	getStyle(e, t) {
		let n = t ? "active" : "default";
		return e === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(e || 0, n);
	}
	getContext(e, t, n) {
		let r = this.getDataset(), i;
		if (e >= 0 && e < this._cachedMeta.data.length) {
			let t = this._cachedMeta.data[e];
			i = t.$context ||= Wf(this.getContext(), e, t), i.parsed = this.getParsed(e), i.raw = r.data[e], i.index = i.dataIndex = e;
		} else i = this.$context ||= Uf(this.chart.getContext(), this.index), i.dataset = r, i.index = i.datasetIndex = this.index;
		return i.active = !!t, i.mode = n, i;
	}
	resolveDatasetElementOptions(e) {
		return this._resolveElementOptions(this.datasetElementType.id, e);
	}
	resolveDataElementOptions(e, t) {
		return this._resolveElementOptions(this.dataElementType.id, t, e);
	}
	_resolveElementOptions(e, t = "default", n) {
		let r = t === "active", i = this._cachedDataOpts, a = e + "-" + t, o = i[a], s = this.enableOptionSharing && vl(n);
		if (o) return qf(o, s);
		let c = this.chart.config, l = c.datasetElementScopeKeys(this._type, e), u = r ? [
			`${e}Hover`,
			"hover",
			e,
			""
		] : [e, ""], d = c.getOptionScopes(this.getDataset(), l), f = Object.keys(ju.elements[e]), p = c.resolveNamedOptions(d, f, () => this.getContext(n, r, t), u);
		return p.$shared && (p.$shared = s, i[a] = Object.freeze(qf(p, s))), p;
	}
	_resolveAnimations(e, t, n) {
		let r = this.chart, i = this._cachedDataOpts, a = `animation-${t}`, o = i[a];
		if (o) return o;
		let s;
		if (r.options.animation !== !1) {
			let r = this.chart.config, i = r.datasetAnimationScopeKeys(this._type, t), a = r.getOptionScopes(this.getDataset(), i);
			s = r.createResolver(a, this.getContext(e, n, t));
		}
		let c = new Df(r, s && s.animations);
		return s && s._cacheable && (i[a] = Object.freeze(c)), c;
	}
	getSharedOptions(e) {
		if (e.$shared) return this._sharedOptions ||= Object.assign({}, e);
	}
	includeOptions(e, t) {
		return !t || Kf(e) || this.chart._animationsDisabled;
	}
	_getSharedOptions(e, t) {
		let n = this.resolveDataElementOptions(e, t), r = this._sharedOptions, i = this.getSharedOptions(n), a = this.includeOptions(t, i) || i !== r;
		return this.updateSharedOptions(i, t, n), {
			sharedOptions: i,
			includeOptions: a
		};
	}
	updateElement(e, t, n, r) {
		Kf(r) ? Object.assign(e, n) : this._resolveAnimations(t, r).update(e, n);
	}
	updateSharedOptions(e, t, n) {
		e && !Kf(t) && this._resolveAnimations(void 0, t).update(e, n);
	}
	_setStyle(e, t, n, r) {
		e.active = r;
		let i = this.getStyle(t, r);
		this._resolveAnimations(t, n, r).update(e, { options: !r && this.getSharedOptions(i) || i });
	}
	removeHoverStyle(e, t, n) {
		this._setStyle(e, n, "active", !1);
	}
	setHoverStyle(e, t, n) {
		this._setStyle(e, n, "active", !0);
	}
	_removeDatasetHoverStyle() {
		let e = this._cachedMeta.dataset;
		e && this._setStyle(e, void 0, "active", !1);
	}
	_setDatasetHoverStyle() {
		let e = this._cachedMeta.dataset;
		e && this._setStyle(e, void 0, "active", !0);
	}
	_resyncElements(e) {
		let t = this._data, n = this._cachedMeta.data;
		for (let [e, t, n] of this._syncList) this[e](t, n);
		this._syncList = [];
		let r = n.length, i = t.length, a = Math.min(i, r);
		a && this.parse(0, a), i > r ? this._insertElements(r, i - r, e) : i < r && this._removeElements(i, r - i);
	}
	_insertElements(e, t, n = !0) {
		let r = this._cachedMeta, i = r.data, a = e + t, o, s = (e) => {
			for (e.length += t, o = e.length - 1; o >= a; o--) e[o] = e[o - t];
		};
		for (s(i), o = e; o < a; ++o) i[o] = new this.dataElementType();
		this._parsing && s(r._parsed), this.parse(e, t), n && this.updateElements(i, e, t, "reset");
	}
	updateElements(e, t, n, r) {}
	_removeElements(e, t) {
		let n = this._cachedMeta;
		if (this._parsing) {
			let r = n._parsed.splice(e, t);
			n._stacked && Gf(n, r);
		}
		n.data.splice(e, t);
	}
	_sync(e) {
		if (this._parsing) this._syncList.push(e);
		else {
			let [t, n, r] = e;
			this[t](n, r);
		}
		this.chart._dataChanges.push([this.index, ...e]);
	}
	_onDataPush() {
		let e = arguments.length;
		this._sync([
			"_insertElements",
			this.getDataset().data.length - e,
			e
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
	_onDataSplice(e, t) {
		t && this._sync([
			"_removeElements",
			e,
			t
		]);
		let n = arguments.length - 2;
		n && this._sync([
			"_insertElements",
			e,
			n
		]);
	}
	_onDataUnshift() {
		this._sync([
			"_insertElements",
			0,
			arguments.length
		]);
	}
};
function Xf(e, t) {
	if (!e._cache.$bar) {
		let n = e.getMatchingVisibleMetas(t), r = [];
		for (let t = 0, i = n.length; t < i; t++) r = r.concat(n[t].controller.getAllParsedValues(e));
		e._cache.$bar = tu(r.sort((e, t) => e - t));
	}
	return e._cache.$bar;
}
function Zf(e) {
	let t = e.iScale, n = Xf(t, e.type), r = t._length, i, a, o, s, c = () => {
		o === 32767 || o === -32768 || (vl(s) && (r = Math.min(r, Math.abs(o - s) || r)), s = o);
	};
	for (i = 0, a = n.length; i < a; ++i) o = t.getPixelForValue(n[i]), c();
	for (s = void 0, i = 0, a = t.ticks.length; i < a; ++i) o = t.getPixelForTick(i), c();
	return r;
}
function Qf(e, t, n, r) {
	let i = n.barThickness, a, o;
	return z(i) ? (a = t.min * n.categoryPercentage, o = n.barPercentage) : (a = i * r, o = 1), {
		chunk: a / r,
		ratio: o,
		start: t.pixels[e] - a / 2
	};
}
function $f(e, t, n, r) {
	let i = t.pixels, a = i[e], o = e > 0 ? i[e - 1] : null, s = e < i.length - 1 ? i[e + 1] : null, c = n.categoryPercentage;
	o === null && (o = a - (s === null ? t.end - t.start : s - a)), s === null && (s = a + a - o);
	let l = a - (a - Math.min(o, s)) / 2 * c;
	return {
		chunk: Math.abs(s - o) / 2 * c / r,
		ratio: n.barPercentage,
		start: l
	};
}
function ep(e, t, n, r) {
	let i = n.parse(e[0], r), a = n.parse(e[1], r), o = Math.min(i, a), s = Math.max(i, a), c = o, l = s;
	Math.abs(o) > Math.abs(s) && (c = s, l = o), t[n.axis] = l, t._custom = {
		barStart: c,
		barEnd: l,
		start: i,
		end: a,
		min: o,
		max: s
	};
}
function tp(e, t, n, r) {
	return B(e) ? ep(e, t, n, r) : t[n.axis] = n.parse(e, r), t;
}
function np(e, t, n, r) {
	let i = e.iScale, a = e.vScale, o = i.getLabels(), s = i === a, c = [], l, u, d, f;
	for (l = n, u = n + r; l < u; ++l) f = t[l], d = {}, d[i.axis] = s || i.parse(o[l], l), c.push(tp(f, d, a, l));
	return c;
}
function rp(e) {
	return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function ip(e, t, n) {
	return e === 0 ? (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1) : kl(e);
}
function ap(e) {
	let t, n, r, i, a;
	return e.horizontal ? (t = e.base > e.x, n = "left", r = "right") : (t = e.base < e.y, n = "bottom", r = "top"), t ? (i = "end", a = "start") : (i = "start", a = "end"), {
		start: n,
		end: r,
		reverse: t,
		top: i,
		bottom: a
	};
}
function op(e, t, n, r) {
	let i = t.borderSkipped, a = {};
	if (!i) {
		e.borderSkipped = a;
		return;
	}
	if (i === !0) {
		e.borderSkipped = {
			top: !0,
			right: !0,
			bottom: !0,
			left: !0
		};
		return;
	}
	let { start: o, end: s, reverse: c, top: l, bottom: u } = ap(e);
	i === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === r ? i = l : (n._bottom || 0) === r ? i = u : (a[sp(u, o, s, c)] = !0, i = l)), a[sp(i, o, s, c)] = !0, e.borderSkipped = a;
}
function sp(e, t, n, r) {
	return r ? (e = cp(e, t, n), e = lp(e, n, t)) : e = lp(e, t, n), e;
}
function cp(e, t, n) {
	return e === t ? n : e === n ? t : e;
}
function lp(e, t, n) {
	return e === "start" ? t : e === "end" ? n : e;
}
function up(e, { inflateAmount: t }, n) {
	e.inflateAmount = t === "auto" ? n === 1 ? .33 : 0 : t;
}
var dp = class extends Yf {
	static id = "bar";
	static defaults = {
		datasetElementType: !1,
		dataElementType: "bar",
		categoryPercentage: .8,
		barPercentage: .9,
		grouped: !0,
		animations: { numbers: {
			type: "number",
			properties: [
				"x",
				"y",
				"base",
				"width",
				"height"
			]
		} }
	};
	static overrides = { scales: {
		_index_: {
			type: "category",
			offset: !0,
			grid: { offset: !0 }
		},
		_value_: {
			type: "linear",
			beginAtZero: !0
		}
	} };
	parsePrimitiveData(e, t, n, r) {
		return np(e, t, n, r);
	}
	parseArrayData(e, t, n, r) {
		return np(e, t, n, r);
	}
	parseObjectData(e, t, n, r) {
		let { iScale: i, vScale: a } = e, { xAxisKey: o = "x", yAxisKey: s = "y" } = this._parsing, c = i.axis === "x" ? o : s, l = a.axis === "x" ? o : s, u = [], d, f, p, m;
		for (d = n, f = n + r; d < f; ++d) m = t[d], p = {}, p[i.axis] = i.parse(gl(m, c), d), u.push(tp(gl(m, l), p, a, d));
		return u;
	}
	updateRangeFromParsed(e, t, n, r) {
		super.updateRangeFromParsed(e, t, n, r);
		let i = n._custom;
		i && t === this._cachedMeta.vScale && (e.min = Math.min(e.min, i.min), e.max = Math.max(e.max, i.max));
	}
	getMaxOverflow() {
		return 0;
	}
	getLabelAndValue(e) {
		let { iScale: t, vScale: n } = this._cachedMeta, r = this.getParsed(e), i = r._custom, a = rp(i) ? "[" + i.start + ", " + i.end + "]" : "" + n.getLabelForValue(r[n.axis]);
		return {
			label: "" + t.getLabelForValue(r[t.axis]),
			value: a
		};
	}
	initialize() {
		this.enableOptionSharing = !0, super.initialize();
		let e = this._cachedMeta;
		e.stack = this.getDataset().stack;
	}
	update(e) {
		let t = this._cachedMeta;
		this.updateElements(t.data, 0, t.data.length, e);
	}
	updateElements(e, t, n, r) {
		let i = r === "reset", { index: a, _cachedMeta: { vScale: o } } = this, s = o.getBasePixel(), c = o.isHorizontal(), l = this._getRuler(), { sharedOptions: u, includeOptions: d } = this._getSharedOptions(t, r);
		for (let f = t; f < t + n; f++) {
			let t = this.getParsed(f), n = i || z(t[o.axis]) ? {
				base: s,
				head: s
			} : this._calculateBarValuePixels(f), p = this._calculateBarIndexPixels(f, l), m = (t._stacks || {})[o.axis], h = {
				horizontal: c,
				base: n.base,
				enableBorderRadius: !m || rp(t._custom) || a === m._top || a === m._bottom,
				x: c ? n.head : p.center,
				y: c ? p.center : n.head,
				height: c ? p.size : Math.abs(n.size),
				width: c ? Math.abs(n.size) : p.size
			};
			d && (h.options = u || this.resolveDataElementOptions(f, e[f].active ? "active" : r));
			let g = h.options || e[f].options;
			op(h, g, m, a), up(h, g, l.ratio), this.updateElement(e[f], f, h, r);
		}
	}
	_getStacks(e, t) {
		let { iScale: n } = this._cachedMeta, r = n.getMatchingVisibleMetas(this._type).filter((e) => e.controller.options.grouped), i = n.options.stacked, a = [], o = this._cachedMeta.controller.getParsed(t), s = o && o[n.axis], c = (e) => {
			let t = e._parsed.find((e) => e[n.axis] === s), r = t && t[e.vScale.axis];
			if (z(r) || isNaN(r)) return !0;
		};
		for (let n of r) if (!(t !== void 0 && c(n)) && ((i === !1 || a.indexOf(n.stack) === -1 || i === void 0 && n.stack === void 0) && a.push(n.stack), n.index === e)) break;
		return a.length || a.push(void 0), a;
	}
	_getStackCount(e) {
		return this._getStacks(void 0, e).length;
	}
	_getAxisCount() {
		return this._getAxis().length;
	}
	getFirstScaleIdForIndexAxis() {
		let e = this.chart.scales, t = this.chart.options.indexAxis;
		return Object.keys(e).filter((n) => e[n].axis === t).shift();
	}
	_getAxis() {
		let e = {}, t = this.getFirstScaleIdForIndexAxis();
		for (let n of this.chart.data.datasets) e[U(this.chart.options.indexAxis === "x" ? n.xAxisID : n.yAxisID, t)] = !0;
		return Object.keys(e);
	}
	_getStackIndex(e, t, n) {
		let r = this._getStacks(e, n), i = t === void 0 ? -1 : r.indexOf(t);
		return i === -1 ? r.length - 1 : i;
	}
	_getRuler() {
		let e = this.options, t = this._cachedMeta, n = t.iScale, r = [], i, a;
		for (i = 0, a = t.data.length; i < a; ++i) r.push(n.getPixelForValue(this.getParsed(i)[n.axis], i));
		let o = e.barThickness;
		return {
			min: o || Zf(t),
			pixels: r,
			start: n._startPixel,
			end: n._endPixel,
			stackCount: this._getStackCount(),
			scale: n,
			grouped: e.grouped,
			ratio: o ? 1 : e.categoryPercentage * e.barPercentage
		};
	}
	_calculateBarValuePixels(e) {
		let { _cachedMeta: { vScale: t, _stacked: n, index: r }, options: { base: i, minBarLength: a } } = this, o = i || 0, s = this.getParsed(e), c = s._custom, l = rp(c), u = s[t.axis], d = 0, f = n ? this.applyStack(t, s, n) : u, p, m;
		f !== u && (d = f - u, f = u), l && (u = c.barStart, f = c.barEnd - c.barStart, u !== 0 && kl(u) !== kl(c.barEnd) && (d = 0), d += u);
		let h = !z(i) && !l ? i : d, g = t.getPixelForValue(h);
		if (p = this.chart.getDataVisibility(e) ? t.getPixelForValue(d + f) : g, m = p - g, Math.abs(m) < a) {
			m = ip(m, t, o) * a, u === o && (g -= m / 2);
			let e = t.getPixelForDecimal(0), i = t.getPixelForDecimal(1);
			g = Math.max(Math.min(g, Math.max(e, i)), Math.min(e, i)), p = g + m, n && !l && (s._stacks[t.axis]._visualValues[r] = t.getValueForPixel(p) - t.getValueForPixel(g));
		}
		if (g === t.getPixelForValue(o)) {
			let e = kl(m) * t.getLineWidthForValue(o) / 2;
			g += e, m -= e;
		}
		return {
			size: m,
			base: g,
			head: p,
			center: p + m / 2
		};
	}
	_calculateBarIndexPixels(e, t) {
		let n = t.scale, r = this.options, i = r.skipNull, a = U(r.maxBarThickness, Infinity), o, s, c = this._getAxisCount();
		if (t.grouped) {
			let n = i ? this._getStackCount(e) : t.stackCount, l = r.barThickness === "flex" ? $f(e, t, r, n * c) : Qf(e, t, r, n * c), u = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, d = this._getAxis().indexOf(U(u, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, i ? e : void 0) + d;
			o = l.start + l.chunk * f + l.chunk / 2, s = Math.min(a, l.chunk * l.ratio);
		} else o = n.getPixelForValue(this.getParsed(e)[n.axis], e), s = Math.min(a, t.min * t.ratio);
		return {
			base: o - s / 2,
			head: o + s / 2,
			center: o,
			size: s
		};
	}
	draw() {
		let e = this._cachedMeta, t = e.vScale, n = e.data, r = n.length, i = 0;
		for (; i < r; ++i) this.getParsed(i)[t.axis] !== null && !n[i].hidden && n[i].draw(this._ctx);
	}
};
function fp(e, t, n) {
	let r = 1, i = 1, a = 0, o = 0;
	if (t < q) {
		let s = e, c = s + t, l = Math.cos(s), u = Math.sin(s), d = Math.cos(c), f = Math.sin(c), p = (e, t, r) => Wl(e, s, c, !0) ? 1 : Math.max(t, t * n, r, r * n), m = (e, t, r) => Wl(e, s, c, !0) ? -1 : Math.min(t, t * n, r, r * n), h = p(0, l, d), g = p(Tl, u, f), _ = m(K, l, d), v = m(K + Tl, u, f);
		r = (h - _) / 2, i = (g - v) / 2, a = -(h + _) / 2, o = -(g + v) / 2;
	}
	return {
		ratioX: r,
		ratioY: i,
		offsetX: a,
		offsetY: o
	};
}
var pp = class extends Yf {
	static id = "doughnut";
	static defaults = {
		datasetElementType: !1,
		dataElementType: "arc",
		animation: {
			animateRotate: !0,
			animateScale: !1
		},
		animations: { numbers: {
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
		} },
		cutout: "50%",
		rotation: 0,
		circumference: 360,
		radius: "100%",
		spacing: 0,
		indexAxis: "r"
	};
	static descriptors = {
		_scriptable: (e) => e !== "spacing",
		_indexable: (e) => e !== "spacing" && !e.startsWith("borderDash") && !e.startsWith("hoverBorderDash")
	};
	static overrides = {
		aspectRatio: 1,
		plugins: { legend: {
			labels: { generateLabels(e) {
				let t = e.data, { labels: { pointStyle: n, textAlign: r, color: i, useBorderRadius: a, borderRadius: o } } = e.legend.options;
				return t.labels.length && t.datasets.length ? t.labels.map((t, s) => {
					let c = e.getDatasetMeta(0).controller.getStyle(s);
					return {
						text: t,
						fillStyle: c.backgroundColor,
						fontColor: i,
						hidden: !e.getDataVisibility(s),
						lineDash: c.borderDash,
						lineDashOffset: c.borderDashOffset,
						lineJoin: c.borderJoinStyle,
						lineWidth: c.borderWidth,
						strokeStyle: c.borderColor,
						textAlign: r,
						pointStyle: n,
						borderRadius: a && (o || c.borderRadius),
						index: s
					};
				}) : [];
			} },
			onClick(e, t, n) {
				n.chart.toggleDataVisibility(t.index), n.chart.update();
			}
		} }
	};
	constructor(e, t) {
		super(e, t), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
	}
	linkScales() {}
	parse(e, t) {
		let n = this.getDataset().data, r = this._cachedMeta;
		if (this._parsing === !1) r._parsed = n;
		else {
			let i = (e) => +n[e];
			if (V(n[e])) {
				let { key: e = "value" } = this._parsing;
				i = (t) => +gl(n[t], e);
			}
			let a, o;
			for (a = e, o = e + t; a < o; ++a) r._parsed[a] = i(a);
		}
	}
	_getRotation() {
		return Ll(this.options.rotation - 90);
	}
	_getCircumference() {
		return Ll(this.options.circumference);
	}
	_getRotationExtents() {
		let e = q, t = -q;
		for (let n = 0; n < this.chart.data.datasets.length; ++n) if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
			let r = this.chart.getDatasetMeta(n).controller, i = r._getRotation(), a = r._getCircumference();
			e = Math.min(e, i), t = Math.max(t, i + a);
		}
		return {
			rotation: e,
			circumference: t - e
		};
	}
	update(e) {
		let { chartArea: t } = this.chart, n = this._cachedMeta, r = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(r) + this.options.spacing, a = Math.max((Math.min(t.width, t.height) - i) / 2, 0), o = Math.min(il(this.options.cutout, a), 1), s = this._getRingWeight(this.index), { circumference: c, rotation: l } = this._getRotationExtents(), { ratioX: u, ratioY: d, offsetX: f, offsetY: p } = fp(l, c, o), m = (t.width - i) / u, h = (t.height - i) / d, g = Math.max(Math.min(m, h) / 2, 0), _ = al(this.options.radius, g), v = (_ - Math.max(_ * o, 0)) / this._getVisibleDatasetWeightTotal();
		this.offsetX = f * _, this.offsetY = p * _, n.total = this.calculateTotal(), this.outerRadius = _ - v * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - v * s, 0), this.updateElements(r, 0, r.length, e);
	}
	_circumference(e, t) {
		let n = this.options, r = this._cachedMeta, i = this._getCircumference();
		return t && n.animation.animateRotate || !this.chart.getDataVisibility(e) || r._parsed[e] === null || r.data[e].hidden ? 0 : this.calculateCircumference(r._parsed[e] * i / q);
	}
	updateElements(e, t, n, r) {
		let i = r === "reset", a = this.chart, o = a.chartArea, s = a.options.animation, c = (o.left + o.right) / 2, l = (o.top + o.bottom) / 2, u = i && s.animateScale, d = u ? 0 : this.innerRadius, f = u ? 0 : this.outerRadius, { sharedOptions: p, includeOptions: m } = this._getSharedOptions(t, r), h = this._getRotation(), g;
		for (g = 0; g < t; ++g) h += this._circumference(g, i);
		for (g = t; g < t + n; ++g) {
			let t = this._circumference(g, i), n = e[g], a = {
				x: c + this.offsetX,
				y: l + this.offsetY,
				startAngle: h,
				endAngle: h + t,
				circumference: t,
				outerRadius: f,
				innerRadius: d
			};
			m && (a.options = p || this.resolveDataElementOptions(g, n.active ? "active" : r)), h += t, this.updateElement(n, g, a, r);
		}
	}
	calculateTotal() {
		let e = this._cachedMeta, t = e.data, n = 0, r;
		for (r = 0; r < t.length; r++) {
			let i = e._parsed[r];
			i !== null && !isNaN(i) && this.chart.getDataVisibility(r) && !t[r].hidden && (n += Math.abs(i));
		}
		return n;
	}
	calculateCircumference(e) {
		let t = this._cachedMeta.total;
		return t > 0 && !isNaN(e) ? Math.abs(e) / t * q : 0;
	}
	getLabelAndValue(e) {
		let t = this._cachedMeta, n = this.chart, r = n.data.labels || [], i = Su(t._parsed[e], n.options.locale);
		return {
			label: r[e] || "",
			value: i
		};
	}
	getMaxBorderWidth(e) {
		let t = 0, n = this.chart, r, i, a, o, s;
		if (!e) {
			for (r = 0, i = n.data.datasets.length; r < i; ++r) if (n.isDatasetVisible(r)) {
				a = n.getDatasetMeta(r), e = a.data, o = a.controller;
				break;
			}
		}
		if (!e) return 0;
		for (r = 0, i = e.length; r < i; ++r) s = o.resolveDataElementOptions(r), s.borderAlign !== "inner" && (t = Math.max(t, s.borderWidth || 0, s.hoverBorderWidth || 0));
		return t;
	}
	getMaxOffset(e) {
		let t = 0;
		for (let n = 0, r = e.length; n < r; ++n) {
			let e = this.resolveDataElementOptions(n);
			t = Math.max(t, e.offset || 0, e.hoverOffset || 0);
		}
		return t;
	}
	_getRingWeightOffset(e) {
		let t = 0;
		for (let n = 0; n < e; ++n) this.chart.isDatasetVisible(n) && (t += this._getRingWeight(n));
		return t;
	}
	_getRingWeight(e) {
		return Math.max(U(this.chart.data.datasets[e].weight, 1), 0);
	}
	_getVisibleDatasetWeightTotal() {
		return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
	}
}, mp = class extends Yf {
	static id = "line";
	static defaults = {
		datasetElementType: "line",
		dataElementType: "point",
		showLine: !0,
		spanGaps: !1
	};
	static overrides = { scales: {
		_index_: { type: "category" },
		_value_: { type: "linear" }
	} };
	initialize() {
		this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
	}
	update(e) {
		let t = this._cachedMeta, { dataset: n, data: r = [], _dataset: i } = t, a = this.chart._animationsDisabled, { start: o, count: s } = su(t, r, a);
		this._drawStart = o, this._drawCount = s, cu(t) && (o = 0, s = r.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!i._decimated, n.points = r;
		let c = this.resolveDatasetElementOptions(e);
		this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
			animated: !a,
			options: c
		}, e), this.updateElements(r, o, s, e);
	}
	updateElements(e, t, n, r) {
		let i = r === "reset", { iScale: a, vScale: o, _stacked: s, _dataset: c } = this._cachedMeta, { sharedOptions: l, includeOptions: u } = this._getSharedOptions(t, r), d = a.axis, f = o.axis, { spanGaps: p, segment: m } = this.options, h = Pl(p) ? p : Infinity, g = this.chart._animationsDisabled || i || r === "none", _ = t + n, v = e.length, y = t > 0 && this.getParsed(t - 1);
		for (let n = 0; n < v; ++n) {
			let p = e[n], v = g ? p : {};
			if (n < t || n >= _) {
				v.skip = !0;
				continue;
			}
			let b = this.getParsed(n), x = z(b[f]), S = v[d] = a.getPixelForValue(b[d], n), C = v[f] = i || x ? o.getBasePixel() : o.getPixelForValue(s ? this.applyStack(o, b, s) : b[f], n);
			v.skip = isNaN(S) || isNaN(C) || x, v.stop = n > 0 && Math.abs(b[d] - y[d]) > h, m && (v.parsed = b, v.raw = c.data[n]), u && (v.options = l || this.resolveDataElementOptions(n, p.active ? "active" : r)), g || this.updateElement(p, n, v, r), y = b;
		}
	}
	getMaxOverflow() {
		let e = this._cachedMeta, t = e.dataset, n = t.options && t.options.borderWidth || 0, r = e.data || [];
		if (!r.length) return n;
		let i = r[0].size(this.resolveDataElementOptions(0)), a = r[r.length - 1].size(this.resolveDataElementOptions(r.length - 1));
		return Math.max(n, i, a) / 2;
	}
	draw() {
		let e = this._cachedMeta;
		e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis), super.draw();
	}
}, hp = class extends pp {
	static id = "pie";
	static defaults = {
		cutout: 0,
		rotation: 0,
		circumference: 360,
		radius: "100%"
	};
}, gp = class extends Yf {
	static id = "radar";
	static defaults = {
		datasetElementType: "line",
		dataElementType: "point",
		indexAxis: "r",
		showLine: !0,
		elements: { line: { fill: "start" } }
	};
	static overrides = {
		aspectRatio: 1,
		scales: { r: { type: "radialLinear" } }
	};
	getLabelAndValue(e) {
		let t = this._cachedMeta.vScale, n = this.getParsed(e);
		return {
			label: t.getLabels()[e],
			value: "" + t.getLabelForValue(n[t.axis])
		};
	}
	parseObjectData(e, t, n, r) {
		return Ed.bind(this)(e, t, n, r);
	}
	update(e) {
		let t = this._cachedMeta, n = t.dataset, r = t.data || [], i = t.iScale.getLabels();
		if (n.points = r, e !== "resize") {
			let t = this.resolveDatasetElementOptions(e);
			this.options.showLine || (t.borderWidth = 0);
			let a = {
				_loop: !0,
				_fullLoop: i.length === r.length,
				options: t
			};
			this.updateElement(n, void 0, a, e);
		}
		this.updateElements(r, 0, r.length, e);
	}
	updateElements(e, t, n, r) {
		let i = this._cachedMeta.rScale, a = r === "reset";
		for (let o = t; o < t + n; o++) {
			let t = e[o], n = this.resolveDataElementOptions(o, t.active ? "active" : r), s = i.getPointPositionForValue(o, this.getParsed(o).r), c = a ? i.xCenter : s.x, l = a ? i.yCenter : s.y, u = {
				x: c,
				y: l,
				angle: s.angle,
				skip: isNaN(c) || isNaN(l),
				options: n
			};
			this.updateElement(t, o, u, r);
		}
	}
}, _p = class extends Yf {
	static id = "scatter";
	static defaults = {
		datasetElementType: !1,
		dataElementType: "point",
		showLine: !1,
		fill: !1
	};
	static overrides = {
		interaction: { mode: "point" },
		scales: {
			x: { type: "linear" },
			y: { type: "linear" }
		}
	};
	getLabelAndValue(e) {
		let t = this._cachedMeta, n = this.chart.data.labels || [], { xScale: r, yScale: i } = t, a = this.getParsed(e), o = r.getLabelForValue(a.x), s = i.getLabelForValue(a.y);
		return {
			label: n[e] || "",
			value: "(" + o + ", " + s + ")"
		};
	}
	update(e) {
		let t = this._cachedMeta, { data: n = [] } = t, r = this.chart._animationsDisabled, { start: i, count: a } = su(t, n, r);
		if (this._drawStart = i, this._drawCount = a, cu(t) && (i = 0, a = n.length), this.options.showLine) {
			this.datasetElementType || this.addElements();
			let { dataset: i, _dataset: a } = t;
			i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!a._decimated, i.points = n;
			let o = this.resolveDatasetElementOptions(e);
			o.segment = this.options.segment, this.updateElement(i, void 0, {
				animated: !r,
				options: o
			}, e);
		} else this.datasetElementType &&= (delete t.dataset, !1);
		this.updateElements(n, i, a, e);
	}
	addElements() {
		let { showLine: e } = this.options;
		!this.datasetElementType && e && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
	}
	updateElements(e, t, n, r) {
		let i = r === "reset", { iScale: a, vScale: o, _stacked: s, _dataset: c } = this._cachedMeta, l = this.resolveDataElementOptions(t, r), u = this.getSharedOptions(l), d = this.includeOptions(r, u), f = a.axis, p = o.axis, { spanGaps: m, segment: h } = this.options, g = Pl(m) ? m : Infinity, _ = this.chart._animationsDisabled || i || r === "none", v = t > 0 && this.getParsed(t - 1);
		for (let l = t; l < t + n; ++l) {
			let t = e[l], n = this.getParsed(l), m = _ ? t : {}, y = z(n[p]), b = m[f] = a.getPixelForValue(n[f], l), x = m[p] = i || y ? o.getBasePixel() : o.getPixelForValue(s ? this.applyStack(o, n, s) : n[p], l);
			m.skip = isNaN(b) || isNaN(x) || y, m.stop = l > 0 && Math.abs(n[f] - v[f]) > g, h && (m.parsed = n, m.raw = c.data[l]), d && (m.options = u || this.resolveDataElementOptions(l, t.active ? "active" : r)), _ || this.updateElement(t, l, m, r), v = n;
		}
		this.updateSharedOptions(u, r, l);
	}
	getMaxOverflow() {
		let e = this._cachedMeta, t = e.data || [];
		if (!this.options.showLine) {
			let e = 0;
			for (let n = t.length - 1; n >= 0; --n) e = Math.max(e, t[n].size(this.resolveDataElementOptions(n)) / 2);
			return e > 0 && e;
		}
		let n = e.dataset, r = n.options && n.options.borderWidth || 0;
		if (!t.length) return r;
		let i = t[0].size(this.resolveDataElementOptions(0)), a = t[t.length - 1].size(this.resolveDataElementOptions(t.length - 1));
		return Math.max(r, i, a) / 2;
	}
};
function vp() {
	throw Error("This method is not implemented: Check that a complete date adapter is provided.");
}
var yp = { _date: class e {
	static override(t) {
		Object.assign(e.prototype, t);
	}
	options;
	constructor(e) {
		this.options = e || {};
	}
	init() {}
	formats() {
		return vp();
	}
	parse() {
		return vp();
	}
	format() {
		return vp();
	}
	add() {
		return vp();
	}
	diff() {
		return vp();
	}
	startOf() {
		return vp();
	}
	endOf() {
		return vp();
	}
} };
function bp(e, t, n, r) {
	let { controller: i, data: a, _sorted: o } = e, s = i._cachedMeta.iScale, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
	if (s && t === s.axis && t !== "r" && o && a.length) {
		let o = s._reversePixels ? Xl : Yl;
		if (!r) {
			let r = o(a, t, n);
			if (c) {
				let { vScale: t } = i._cachedMeta, { _parsed: n } = e, a = n.slice(0, r.lo + 1).reverse().findIndex((e) => !z(e[t.axis]));
				r.lo -= Math.max(0, a);
				let o = n.slice(r.hi).findIndex((e) => !z(e[t.axis]));
				r.hi += Math.max(0, o);
			}
			return r;
		} else if (i._sharedOptions) {
			let e = a[0], r = typeof e.getRange == "function" && e.getRange(t);
			if (r) {
				let e = o(a, t, n - r), i = o(a, t, n + r);
				return {
					lo: e.lo,
					hi: i.hi
				};
			}
		}
	}
	return {
		lo: 0,
		hi: a.length - 1
	};
}
function xp(e, t, n, r, i) {
	let a = e.getSortedVisibleDatasetMetas(), o = n[t];
	for (let e = 0, n = a.length; e < n; ++e) {
		let { index: n, data: s } = a[e], { lo: c, hi: l } = bp(a[e], t, o, i);
		for (let e = c; e <= l; ++e) {
			let t = s[e];
			t.skip || r(t, n, e);
		}
	}
}
function Sp(e) {
	let t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
	return function(e, r) {
		let i = t ? Math.abs(e.x - r.x) : 0, a = n ? Math.abs(e.y - r.y) : 0;
		return Math.sqrt(i ** 2 + a ** 2);
	};
}
function Cp(e, t, n, r, i) {
	let a = [];
	return !i && !e.isPointInArea(t) || xp(e, n, t, function(n, o, s) {
		!i && !zu(n, e.chartArea, 0) || n.inRange(t.x, t.y, r) && a.push({
			element: n,
			datasetIndex: o,
			index: s
		});
	}, !0), a;
}
function wp(e, t, n, r) {
	let i = [];
	function a(e, n, a) {
		let { startAngle: o, endAngle: s } = e.getProps(["startAngle", "endAngle"], r), { angle: c } = Bl(e, {
			x: t.x,
			y: t.y
		});
		Wl(c, o, s) && i.push({
			element: e,
			datasetIndex: n,
			index: a
		});
	}
	return xp(e, n, t, a), i;
}
function Tp(e, t, n, r, i, a) {
	let o = [], s = Sp(n), c = Infinity;
	function l(n, l, u) {
		let d = n.inRange(t.x, t.y, i);
		if (r && !d) return;
		let f = n.getCenterPoint(i);
		if (!(a || e.isPointInArea(f)) && !d) return;
		let p = s(t, f);
		p < c ? (o = [{
			element: n,
			datasetIndex: l,
			index: u
		}], c = p) : p === c && o.push({
			element: n,
			datasetIndex: l,
			index: u
		});
	}
	return xp(e, n, t, l), o;
}
function Ep(e, t, n, r, i, a) {
	return !a && !e.isPointInArea(t) ? [] : n === "r" && !r ? wp(e, t, n, i) : Tp(e, t, n, r, i, a);
}
function Dp(e, t, n, r, i) {
	let a = [], o = n === "x" ? "inXRange" : "inYRange", s = !1;
	return xp(e, n, t, (e, r, c) => {
		e[o] && e[o](t[n], i) && (a.push({
			element: e,
			datasetIndex: r,
			index: c
		}), s ||= e.inRange(t.x, t.y, i));
	}), r && !s ? [] : a;
}
var Op = {
	evaluateInteractionItems: xp,
	modes: {
		index(e, t, n, r) {
			let i = Kd(t, e), a = n.axis || "x", o = n.includeInvisible || !1, s = n.intersect ? Cp(e, i, a, r, o) : Ep(e, i, a, !1, r, o), c = [];
			return s.length ? (e.getSortedVisibleDatasetMetas().forEach((e) => {
				let t = s[0].index, n = e.data[t];
				n && !n.skip && c.push({
					element: n,
					datasetIndex: e.index,
					index: t
				});
			}), c) : [];
		},
		dataset(e, t, n, r) {
			let i = Kd(t, e), a = n.axis || "xy", o = n.includeInvisible || !1, s = n.intersect ? Cp(e, i, a, r, o) : Ep(e, i, a, !1, r, o);
			if (s.length > 0) {
				let t = s[0].datasetIndex, n = e.getDatasetMeta(t).data;
				s = [];
				for (let e = 0; e < n.length; ++e) s.push({
					element: n[e],
					datasetIndex: t,
					index: e
				});
			}
			return s;
		},
		point(e, t, n, r) {
			return Cp(e, Kd(t, e), n.axis || "xy", r, n.includeInvisible || !1);
		},
		nearest(e, t, n, r) {
			let i = Kd(t, e), a = n.axis || "xy", o = n.includeInvisible || !1;
			return Ep(e, i, a, n.intersect, r, o);
		},
		x(e, t, n, r) {
			return Dp(e, Kd(t, e), "x", n.intersect, r);
		},
		y(e, t, n, r) {
			return Dp(e, Kd(t, e), "y", n.intersect, r);
		}
	}
}, kp = [
	"left",
	"top",
	"right",
	"bottom"
];
function Ap(e, t) {
	return e.filter((e) => e.pos === t);
}
function jp(e, t) {
	return e.filter((e) => kp.indexOf(e.pos) === -1 && e.box.axis === t);
}
function Mp(e, t) {
	return e.sort((e, n) => {
		let r = t ? n : e, i = t ? e : n;
		return r.weight === i.weight ? r.index - i.index : r.weight - i.weight;
	});
}
function Np(e) {
	let t = [], n, r, i, a, o, s;
	for (n = 0, r = (e || []).length; n < r; ++n) i = e[n], {position: a, options: {stack: o, stackWeight: s = 1}} = i, t.push({
		index: n,
		box: i,
		pos: a,
		horizontal: i.isHorizontal(),
		weight: i.weight,
		stack: o && a + o,
		stackWeight: s
	});
	return t;
}
function Pp(e) {
	let t = {};
	for (let n of e) {
		let { stack: e, pos: r, stackWeight: i } = n;
		if (!e || !kp.includes(r)) continue;
		let a = t[e] || (t[e] = {
			count: 0,
			placed: 0,
			weight: 0,
			size: 0
		});
		a.count++, a.weight += i;
	}
	return t;
}
function Fp(e, t) {
	let n = Pp(e), { vBoxMaxWidth: r, hBoxMaxHeight: i } = t, a, o, s;
	for (a = 0, o = e.length; a < o; ++a) {
		s = e[a];
		let { fullSize: o } = s.box, c = n[s.stack], l = c && s.stackWeight / c.weight;
		s.horizontal ? (s.width = l ? l * r : o && t.availableWidth, s.height = i) : (s.width = r, s.height = l ? l * i : o && t.availableHeight);
	}
	return n;
}
function Ip(e) {
	let t = Np(e), n = Mp(t.filter((e) => e.box.fullSize), !0), r = Mp(Ap(t, "left"), !0), i = Mp(Ap(t, "right")), a = Mp(Ap(t, "top"), !0), o = Mp(Ap(t, "bottom")), s = jp(t, "x"), c = jp(t, "y");
	return {
		fullSize: n,
		leftAndTop: r.concat(a),
		rightAndBottom: i.concat(c).concat(o).concat(s),
		chartArea: Ap(t, "chartArea"),
		vertical: r.concat(i).concat(c),
		horizontal: a.concat(o).concat(s)
	};
}
function Lp(e, t, n, r) {
	return Math.max(e[n], t[n]) + Math.max(e[r], t[r]);
}
function Rp(e, t) {
	e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function zp(e, t, n, r) {
	let { pos: i, box: a } = n, o = e.maxPadding;
	if (!V(i)) {
		n.size && (e[i] -= n.size);
		let t = r[n.stack] || {
			size: 0,
			count: 1
		};
		t.size = Math.max(t.size, n.horizontal ? a.height : a.width), n.size = t.size / t.count, e[i] += n.size;
	}
	a.getPadding && Rp(o, a.getPadding());
	let s = Math.max(0, t.outerWidth - Lp(o, e, "left", "right")), c = Math.max(0, t.outerHeight - Lp(o, e, "top", "bottom")), l = s !== e.w, u = c !== e.h;
	return e.w = s, e.h = c, n.horizontal ? {
		same: l,
		other: u
	} : {
		same: u,
		other: l
	};
}
function Bp(e) {
	let t = e.maxPadding;
	function n(n) {
		let r = Math.max(t[n] - e[n], 0);
		return e[n] += r, r;
	}
	e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Vp(e, t) {
	let n = t.maxPadding;
	function r(e) {
		let r = {
			left: 0,
			top: 0,
			right: 0,
			bottom: 0
		};
		return e.forEach((e) => {
			r[e] = Math.max(t[e], n[e]);
		}), r;
	}
	return r(e ? ["left", "right"] : ["top", "bottom"]);
}
function Hp(e, t, n, r) {
	let i = [], a, o, s, c, l, u;
	for (a = 0, o = e.length, l = 0; a < o; ++a) {
		s = e[a], c = s.box, c.update(s.width || t.w, s.height || t.h, Vp(s.horizontal, t));
		let { same: o, other: d } = zp(t, n, s, r);
		l |= o && i.length, u ||= d, c.fullSize || i.push(s);
	}
	return l && Hp(i, t, n, r) || u;
}
function Up(e, t, n, r, i) {
	e.top = n, e.left = t, e.right = t + r, e.bottom = n + i, e.width = r, e.height = i;
}
function Wp(e, t, n, r) {
	let i = n.padding, { x: a, y: o } = t;
	for (let s of e) {
		let e = s.box, c = r[s.stack] || {
			count: 1,
			placed: 0,
			weight: 1
		}, l = s.stackWeight / c.weight || 1;
		if (s.horizontal) {
			let r = t.w * l, a = c.size || e.height;
			vl(c.start) && (o = c.start), e.fullSize ? Up(e, i.left, o, n.outerWidth - i.right - i.left, a) : Up(e, t.left + c.placed, o, r, a), c.start = o, c.placed += r, o = e.bottom;
		} else {
			let r = t.h * l, o = c.size || e.width;
			vl(c.start) && (a = c.start), e.fullSize ? Up(e, a, i.top, o, n.outerHeight - i.bottom - i.top) : Up(e, a, t.top + c.placed, o, r), c.start = a, c.placed += r, a = e.right;
		}
	}
	t.x = a, t.y = o;
}
var Gp = {
	addBox(e, t) {
		e.boxes ||= [], t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
			return [{
				z: 0,
				draw(e) {
					t.draw(e);
				}
			}];
		}, e.boxes.push(t);
	},
	removeBox(e, t) {
		let n = e.boxes ? e.boxes.indexOf(t) : -1;
		n !== -1 && e.boxes.splice(n, 1);
	},
	configure(e, t, n) {
		t.fullSize = n.fullSize, t.position = n.position, t.weight = n.weight;
	},
	update(e, t, n, r) {
		if (!e) return;
		let i = nd(e.options.layout.padding), a = Math.max(t - i.width, 0), o = Math.max(n - i.height, 0), s = Ip(e.boxes), c = s.vertical, l = s.horizontal;
		G(e.boxes, (e) => {
			typeof e.beforeLayout == "function" && e.beforeLayout();
		});
		let u = c.reduce((e, t) => t.box.options && t.box.options.display === !1 ? e : e + 1, 0) || 1, d = Object.freeze({
			outerWidth: t,
			outerHeight: n,
			padding: i,
			availableWidth: a,
			availableHeight: o,
			vBoxMaxWidth: a / 2 / u,
			hBoxMaxHeight: o / 2
		}), f = Object.assign({}, i);
		Rp(f, nd(r));
		let p = Object.assign({
			maxPadding: f,
			w: a,
			h: o,
			x: i.left,
			y: i.top
		}, i), m = Fp(c.concat(l), d);
		Hp(s.fullSize, p, d, m), Hp(c, p, d, m), Hp(l, p, d, m) && Hp(c, p, d, m), Bp(p), Wp(s.leftAndTop, p, d, m), p.x += p.w, p.y += p.h, Wp(s.rightAndBottom, p, d, m), e.chartArea = {
			left: p.left,
			top: p.top,
			right: p.left + p.w,
			bottom: p.top + p.h,
			height: p.h,
			width: p.w
		}, G(s.chartArea, (t) => {
			let n = t.box;
			Object.assign(n, e.chartArea), n.update(p.w, p.h, {
				left: 0,
				top: 0,
				right: 0,
				bottom: 0
			});
		});
	}
}, Kp = class {
	acquireContext(e, t) {}
	releaseContext(e) {
		return !1;
	}
	addEventListener(e, t, n) {}
	removeEventListener(e, t, n) {}
	getDevicePixelRatio() {
		return 1;
	}
	getMaximumSize(e, t, n, r) {
		return t = Math.max(0, t || e.width), n ||= e.height, {
			width: t,
			height: Math.max(0, r ? Math.floor(t / r) : n)
		};
	}
	isAttached(e) {
		return !0;
	}
	updateConfig(e) {}
}, qp = class extends Kp {
	acquireContext(e) {
		return e && e.getContext && e.getContext("2d") || null;
	}
	updateConfig(e) {
		e.options.animation = !1;
	}
}, Jp = "$chartjs", Yp = {
	touchstart: "mousedown",
	touchmove: "mousemove",
	touchend: "mouseup",
	pointerenter: "mouseenter",
	pointerdown: "mousedown",
	pointermove: "mousemove",
	pointerup: "mouseup",
	pointerleave: "mouseout",
	pointerout: "mouseout"
}, Xp = (e) => e === null || e === "";
function Zp(e, t) {
	let n = e.style, r = e.getAttribute("height"), i = e.getAttribute("width");
	if (e[Jp] = { initial: {
		height: r,
		width: i,
		style: {
			display: n.display,
			height: n.height,
			width: n.width
		}
	} }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", Xp(i)) {
		let t = Qd(e, "width");
		t !== void 0 && (e.width = t);
	}
	if (Xp(r)) if (e.style.height === "") e.height = e.width / (t || 2);
	else {
		let t = Qd(e, "height");
		t !== void 0 && (e.height = t);
	}
	return e;
}
var Qp = Zd ? { passive: !0 } : !1;
function $p(e, t, n) {
	e && e.addEventListener(t, n, Qp);
}
function em(e, t, n) {
	e && e.canvas && e.canvas.removeEventListener(t, n, Qp);
}
function tm(e, t) {
	let n = Yp[e.type] || e.type, { x: r, y: i } = Kd(e, t);
	return {
		type: n,
		chart: t,
		native: e,
		x: r === void 0 ? null : r,
		y: i === void 0 ? null : i
	};
}
function nm(e, t) {
	for (let n of e) if (n === t || n.contains(t)) return !0;
}
function rm(e, t, n) {
	let r = e.canvas, i = new MutationObserver((e) => {
		let t = !1;
		for (let n of e) t ||= nm(n.addedNodes, r), t &&= !nm(n.removedNodes, r);
		t && n();
	});
	return i.observe(document, {
		childList: !0,
		subtree: !0
	}), i;
}
function im(e, t, n) {
	let r = e.canvas, i = new MutationObserver((e) => {
		let t = !1;
		for (let n of e) t ||= nm(n.removedNodes, r), t &&= !nm(n.addedNodes, r);
		t && n();
	});
	return i.observe(document, {
		childList: !0,
		subtree: !0
	}), i;
}
var am = /* @__PURE__ */ new Map(), om = 0;
function sm() {
	let e = window.devicePixelRatio;
	e !== om && (om = e, am.forEach((t, n) => {
		n.currentDevicePixelRatio !== e && t();
	}));
}
function cm(e, t) {
	am.size || window.addEventListener("resize", sm), am.set(e, t);
}
function lm(e) {
	am.delete(e), am.size || window.removeEventListener("resize", sm);
}
function um(e, t, n) {
	let r = e.canvas, i = r && Rd(r);
	if (!i) return;
	let a = ru((e, t) => {
		let r = i.clientWidth;
		n(e, t), r < i.clientWidth && n();
	}, window), o = new ResizeObserver((e) => {
		let t = e[0], n = t.contentRect.width, r = t.contentRect.height;
		n === 0 && r === 0 || a(n, r);
	});
	return o.observe(i), cm(e, a), o;
}
function dm(e, t, n) {
	n && n.disconnect(), t === "resize" && lm(e);
}
function fm(e, t, n) {
	let r = e.canvas, i = ru((t) => {
		e.ctx !== null && n(tm(t, e));
	}, e);
	return $p(r, t, i), i;
}
var pm = class extends Kp {
	acquireContext(e, t) {
		let n = e && e.getContext && e.getContext("2d");
		return n && n.canvas === e ? (Zp(e, t), n) : null;
	}
	releaseContext(e) {
		let t = e.canvas;
		if (!t[Jp]) return !1;
		let n = t[Jp].initial;
		["height", "width"].forEach((e) => {
			let r = n[e];
			z(r) ? t.removeAttribute(e) : t.setAttribute(e, r);
		});
		let r = n.style || {};
		return Object.keys(r).forEach((e) => {
			t.style[e] = r[e];
		}), t.width = t.width, delete t[Jp], !0;
	}
	addEventListener(e, t, n) {
		this.removeEventListener(e, t);
		let r = e.$proxies ||= {};
		r[t] = ({
			attach: rm,
			detach: im,
			resize: um
		}[t] || fm)(e, t, n);
	}
	removeEventListener(e, t) {
		let n = e.$proxies ||= {}, r = n[t];
		r && (({
			attach: dm,
			detach: dm,
			resize: dm
		}[t] || em)(e, t, r), n[t] = void 0);
	}
	getDevicePixelRatio() {
		return window.devicePixelRatio;
	}
	getMaximumSize(e, t, n, r) {
		return Yd(e, t, n, r);
	}
	isAttached(e) {
		let t = e && Rd(e);
		return !!(t && t.isConnected);
	}
};
function mm(e) {
	return !Ld() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? qp : pm;
}
var hm = class {
	static defaults = {};
	static defaultRoutes = void 0;
	x;
	y;
	active = !1;
	options;
	$animations;
	tooltipPosition(e) {
		let { x: t, y: n } = this.getProps(["x", "y"], e);
		return {
			x: t,
			y: n
		};
	}
	hasValue() {
		return Pl(this.x) && Pl(this.y);
	}
	getProps(e, t) {
		let n = this.$animations;
		if (!t || !n) return this;
		let r = {};
		return e.forEach((e) => {
			r[e] = n[e] && n[e].active() ? n[e]._to : this[e];
		}), r;
	}
};
function gm(e, t) {
	let n = e.options.ticks, r = _m(e), i = Math.min(n.maxTicksLimit || r, r), a = n.major.enabled ? ym(t) : [], o = a.length, s = a[0], c = a[o - 1], l = [];
	if (o > i) return bm(t, l, a, o / i), l;
	let u = vm(a, t, i);
	if (o > 0) {
		let e, n, r = o > 1 ? Math.round((c - s) / (o - 1)) : null;
		for (xm(t, l, u, z(r) ? 0 : s - r, s), e = 0, n = o - 1; e < n; e++) xm(t, l, u, a[e], a[e + 1]);
		return xm(t, l, u, c, z(r) ? t.length : c + r), l;
	}
	return xm(t, l, u), l;
}
function _m(e) {
	let t = e.options.offset, n = e._tickSize(), r = e._length / n + +!t, i = e._maxLength / n;
	return Math.floor(Math.min(r, i));
}
function vm(e, t, n) {
	let r = Sm(e), i = t.length / n;
	if (!r) return Math.max(i, 1);
	let a = Ml(r);
	for (let e = 0, t = a.length - 1; e < t; e++) {
		let t = a[e];
		if (t > i) return t;
	}
	return Math.max(i, 1);
}
function ym(e) {
	let t = [], n, r;
	for (n = 0, r = e.length; n < r; n++) e[n].major && t.push(n);
	return t;
}
function bm(e, t, n, r) {
	let i = 0, a = n[0], o;
	for (r = Math.ceil(r), o = 0; o < e.length; o++) o === a && (t.push(e[o]), i++, a = n[i * r]);
}
function xm(e, t, n, r, i) {
	let a = U(r, 0), o = Math.min(U(i, e.length), e.length), s = 0, c, l, u;
	for (n = Math.ceil(n), i && (c = i - r, n = c / Math.floor(c / n)), u = a; u < 0;) s++, u = Math.round(a + s * n);
	for (l = Math.max(a, 0); l < o; l++) l === u && (t.push(e[l]), s++, u = Math.round(a + s * n));
}
function Sm(e) {
	let t = e.length, n, r;
	if (t < 2) return !1;
	for (r = e[0], n = 1; n < t; ++n) if (e[n] - e[n - 1] !== r) return !1;
	return r;
}
var Cm = (e) => e === "left" ? "right" : e === "right" ? "left" : e, wm = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Tm = (e, t) => Math.min(t || e, e);
function Em(e, t) {
	let n = [], r = e.length / t, i = e.length, a = 0;
	for (; a < i; a += r) n.push(e[Math.floor(a)]);
	return n;
}
function Dm(e, t, n) {
	let r = e.ticks.length, i = Math.min(t, r - 1), a = e._startPixel, o = e._endPixel, s = 1e-6, c = e.getPixelForTick(i), l;
	if (!(n && (l = r === 1 ? Math.max(c - a, o - c) : t === 0 ? (e.getPixelForTick(1) - c) / 2 : (c - e.getPixelForTick(i - 1)) / 2, c += i < t ? l : -l, c < a - s || c > o + s))) return c;
}
function Om(e, t) {
	G(e, (e) => {
		let n = e.gc, r = n.length / 2, i;
		if (r > t) {
			for (i = 0; i < r; ++i) delete e.data[n[i]];
			n.splice(0, r);
		}
	});
}
function km(e) {
	return e.drawTicks ? e.tickLength : 0;
}
function Am(e, t) {
	if (!e.display) return 0;
	let n = rd(e.font, t), r = nd(e.padding);
	return (B(e.text) ? e.text.length : 1) * n.lineHeight + r.height;
}
function jm(e, t) {
	return od(e, {
		scale: t,
		type: "scale"
	});
}
function Mm(e, t, n) {
	return od(e, {
		tick: n,
		index: t,
		type: "tick"
	});
}
function Nm(e, t, n) {
	let r = au(e);
	return (n && t !== "right" || !n && t === "right") && (r = Cm(r)), r;
}
function Pm(e, t, n, r) {
	let { top: i, left: a, bottom: o, right: s, chart: c } = e, { chartArea: l, scales: u } = c, d = 0, f, p, m, h = o - i, g = s - a;
	if (e.isHorizontal()) {
		if (p = ou(r, a, s), V(n)) {
			let e = Object.keys(n)[0], r = n[e];
			m = u[e].getPixelForValue(r) + h - t;
		} else m = n === "center" ? (l.bottom + l.top) / 2 + h - t : wm(e, n, t);
		f = s - a;
	} else {
		if (V(n)) {
			let e = Object.keys(n)[0], r = n[e];
			p = u[e].getPixelForValue(r) - g + t;
		} else p = n === "center" ? (l.left + l.right) / 2 - g + t : wm(e, n, t);
		m = ou(r, o, i), d = n === "left" ? -Tl : Tl;
	}
	return {
		titleX: p,
		titleY: m,
		maxWidth: f,
		rotation: d
	};
}
var Fm = class e extends hm {
	constructor(e) {
		super(), this.id = e.id, this.type = e.type, this.options = void 0, this.ctx = e.ctx, this.chart = e.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		}, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
	}
	init(e) {
		this.options = e.setContext(this.getContext()), this.axis = e.axis, this._userMin = this.parse(e.min), this._userMax = this.parse(e.max), this._suggestedMin = this.parse(e.suggestedMin), this._suggestedMax = this.parse(e.suggestedMax);
	}
	parse(e, t) {
		return e;
	}
	getUserBounds() {
		let { _userMin: e, _userMax: t, _suggestedMin: n, _suggestedMax: r } = this;
		return e = rl(e, Infinity), t = rl(t, -Infinity), n = rl(n, Infinity), r = rl(r, -Infinity), {
			min: rl(e, n),
			max: rl(t, r),
			minDefined: H(e),
			maxDefined: H(t)
		};
	}
	getMinMax(e) {
		let { min: t, max: n, minDefined: r, maxDefined: i } = this.getUserBounds(), a;
		if (r && i) return {
			min: t,
			max: n
		};
		let o = this.getMatchingVisibleMetas();
		for (let s = 0, c = o.length; s < c; ++s) a = o[s].controller.getMinMax(this, e), r || (t = Math.min(t, a.min)), i || (n = Math.max(n, a.max));
		return t = i && t > n ? n : t, n = r && t > n ? t : n, {
			min: rl(t, rl(n, t)),
			max: rl(n, rl(t, n))
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
		let e = this.chart.data;
		return this.options.labels || (this.isHorizontal() ? e.xLabels : e.yLabels) || e.labels || [];
	}
	getLabelItems(e = this.chart.chartArea) {
		return this._labelItems ||= this._computeLabelItems(e);
	}
	beforeLayout() {
		this._cache = {}, this._dataLimitsCached = !1;
	}
	beforeUpdate() {
		W(this.options.beforeUpdate, [this]);
	}
	update(e, t, n) {
		let { beginAtZero: r, grace: i, ticks: a } = this.options, o = a.sampleSize;
		this.beforeUpdate(), this.maxWidth = e, this.maxHeight = t, this._margins = n = Object.assign({
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		}, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached ||= (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = ad(this, i, r), !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
		let s = o < this.ticks.length;
		this._convertTicksToLabels(s ? Em(this.ticks, o) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = gm(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), s && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
	}
	configure() {
		let e = this.options.reverse, t, n;
		this.isHorizontal() ? (t = this.left, n = this.right) : (t = this.top, n = this.bottom, e = !e), this._startPixel = t, this._endPixel = n, this._reversePixels = e, this._length = n - t, this._alignToPixels = this.options.alignToPixels;
	}
	afterUpdate() {
		W(this.options.afterUpdate, [this]);
	}
	beforeSetDimensions() {
		W(this.options.beforeSetDimensions, [this]);
	}
	setDimensions() {
		this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
	}
	afterSetDimensions() {
		W(this.options.afterSetDimensions, [this]);
	}
	_callHooks(e) {
		this.chart.notifyPlugins(e, this.getContext()), W(this.options[e], [this]);
	}
	beforeDataLimits() {
		this._callHooks("beforeDataLimits");
	}
	determineDataLimits() {}
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
		W(this.options.beforeTickToLabelConversion, [this]);
	}
	generateTickLabels(e) {
		let t = this.options.ticks, n, r, i;
		for (n = 0, r = e.length; n < r; n++) i = e[n], i.label = W(t.callback, [
			i.value,
			n,
			e
		], this);
	}
	afterTickToLabelConversion() {
		W(this.options.afterTickToLabelConversion, [this]);
	}
	beforeCalculateLabelRotation() {
		W(this.options.beforeCalculateLabelRotation, [this]);
	}
	calculateLabelRotation() {
		let e = this.options, t = e.ticks, n = Tm(this.ticks.length, e.ticks.maxTicksLimit), r = t.minRotation || 0, i = t.maxRotation, a = r, o, s, c;
		if (!this._isVisible() || !t.display || r >= i || n <= 1 || !this.isHorizontal()) {
			this.labelRotation = r;
			return;
		}
		let l = this._getLabelSizes(), u = l.widest.width, d = l.highest.height, f = Gl(this.chart.width - u, 0, this.maxWidth);
		o = e.offset ? this.maxWidth / n : f / (n - 1), u + 6 > o && (o = f / (n - (e.offset ? .5 : 1)), s = this.maxHeight - km(e.grid) - t.padding - Am(e.title, this.chart.options.font), c = Math.sqrt(u * u + d * d), a = Rl(Math.min(Math.asin(Gl((l.highest.height + 6) / o, -1, 1)), Math.asin(Gl(s / c, -1, 1)) - Math.asin(Gl(d / c, -1, 1)))), a = Math.max(r, Math.min(i, a))), this.labelRotation = a;
	}
	afterCalculateLabelRotation() {
		W(this.options.afterCalculateLabelRotation, [this]);
	}
	afterAutoSkip() {}
	beforeFit() {
		W(this.options.beforeFit, [this]);
	}
	fit() {
		let e = {
			width: 0,
			height: 0
		}, { chart: t, options: { ticks: n, title: r, grid: i } } = this, a = this._isVisible(), o = this.isHorizontal();
		if (a) {
			let a = Am(r, t.options.font);
			if (o ? (e.width = this.maxWidth, e.height = km(i) + a) : (e.height = this.maxHeight, e.width = km(i) + a), n.display && this.ticks.length) {
				let { first: t, last: r, widest: i, highest: a } = this._getLabelSizes(), s = n.padding * 2, c = Ll(this.labelRotation), l = Math.cos(c), u = Math.sin(c);
				if (o) {
					let t = n.mirror ? 0 : u * i.width + l * a.height;
					e.height = Math.min(this.maxHeight, e.height + t + s);
				} else {
					let t = n.mirror ? 0 : l * i.width + u * a.height;
					e.width = Math.min(this.maxWidth, e.width + t + s);
				}
				this._calculatePadding(t, r, u, l);
			}
		}
		this._handleMargins(), o ? (this.width = this._length = t.width - this._margins.left - this._margins.right, this.height = e.height) : (this.width = e.width, this.height = this._length = t.height - this._margins.top - this._margins.bottom);
	}
	_calculatePadding(e, t, n, r) {
		let { ticks: { align: i, padding: a }, position: o } = this.options, s = this.labelRotation !== 0, c = o !== "top" && this.axis === "x";
		if (this.isHorizontal()) {
			let o = this.getPixelForTick(0) - this.left, l = this.right - this.getPixelForTick(this.ticks.length - 1), u = 0, d = 0;
			s ? c ? (u = r * e.width, d = n * t.height) : (u = n * e.height, d = r * t.width) : i === "start" ? d = t.width : i === "end" ? u = e.width : i !== "inner" && (u = e.width / 2, d = t.width / 2), this.paddingLeft = Math.max((u - o + a) * this.width / (this.width - o), 0), this.paddingRight = Math.max((d - l + a) * this.width / (this.width - l), 0);
		} else {
			let n = t.height / 2, r = e.height / 2;
			i === "start" ? (n = 0, r = e.height) : i === "end" && (n = t.height, r = 0), this.paddingTop = n + a, this.paddingBottom = r + a;
		}
	}
	_handleMargins() {
		this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
	}
	afterFit() {
		W(this.options.afterFit, [this]);
	}
	isHorizontal() {
		let { axis: e, position: t } = this.options;
		return t === "top" || t === "bottom" || e === "x";
	}
	isFullSize() {
		return this.options.fullSize;
	}
	_convertTicksToLabels(e) {
		this.beforeTickToLabelConversion(), this.generateTickLabels(e);
		let t, n;
		for (t = 0, n = e.length; t < n; t++) z(e[t].label) && (e.splice(t, 1), n--, t--);
		this.afterTickToLabelConversion();
	}
	_getLabelSizes() {
		let e = this._labelSizes;
		if (!e) {
			let t = this.options.ticks.sampleSize, n = this.ticks;
			t < n.length && (n = Em(n, t)), this._labelSizes = e = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
		}
		return e;
	}
	_computeLabelSizes(e, t, n) {
		let { ctx: r, _longestTextCache: i } = this, a = [], o = [], s = Math.floor(t / Tm(t, n)), c = 0, l = 0, u, d, f, p, m, h, g, _, v, y, b;
		for (u = 0; u < t; u += s) {
			if (p = e[u].label, m = this._resolveTickFontOptions(u), r.font = h = m.string, g = i[h] = i[h] || {
				data: {},
				gc: []
			}, _ = m.lineHeight, v = y = 0, !z(p) && !B(p)) v = Nu(r, g.data, g.gc, v, p), y = _;
			else if (B(p)) for (d = 0, f = p.length; d < f; ++d) b = p[d], !z(b) && !B(b) && (v = Nu(r, g.data, g.gc, v, b), y += _);
			a.push(v), o.push(y), c = Math.max(v, c), l = Math.max(y, l);
		}
		Om(i, t);
		let x = a.indexOf(c), S = o.indexOf(l), C = (e) => ({
			width: a[e] || 0,
			height: o[e] || 0
		});
		return {
			first: C(0),
			last: C(t - 1),
			widest: C(x),
			highest: C(S),
			widths: a,
			heights: o
		};
	}
	getLabelForValue(e) {
		return e;
	}
	getPixelForValue(e, t) {
		return NaN;
	}
	getValueForPixel(e) {}
	getPixelForTick(e) {
		let t = this.ticks;
		return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e].value);
	}
	getPixelForDecimal(e) {
		this._reversePixels && (e = 1 - e);
		let t = this._startPixel + e * this._length;
		return Kl(this._alignToPixels ? Fu(this.chart, t, 0) : t);
	}
	getDecimalForPixel(e) {
		let t = (e - this._startPixel) / this._length;
		return this._reversePixels ? 1 - t : t;
	}
	getBasePixel() {
		return this.getPixelForValue(this.getBaseValue());
	}
	getBaseValue() {
		let { min: e, max: t } = this;
		return e < 0 && t < 0 ? t : e > 0 && t > 0 ? e : 0;
	}
	getContext(e) {
		let t = this.ticks || [];
		if (e >= 0 && e < t.length) {
			let n = t[e];
			return n.$context ||= Mm(this.getContext(), e, n);
		}
		return this.$context ||= jm(this.chart.getContext(), this);
	}
	_tickSize() {
		let e = this.options.ticks, t = Ll(this.labelRotation), n = Math.abs(Math.cos(t)), r = Math.abs(Math.sin(t)), i = this._getLabelSizes(), a = e.autoSkipPadding || 0, o = i ? i.widest.width + a : 0, s = i ? i.highest.height + a : 0;
		return this.isHorizontal() ? s * n > o * r ? o / n : s / r : s * r < o * n ? s / n : o / r;
	}
	_isVisible() {
		let e = this.options.display;
		return e === "auto" ? this.getMatchingVisibleMetas().length > 0 : !!e;
	}
	_computeGridLineItems(e) {
		let t = this.axis, n = this.chart, r = this.options, { grid: i, position: a, border: o } = r, s = i.offset, c = this.isHorizontal(), l = this.ticks.length + +!!s, u = km(i), d = [], f = o.setContext(this.getContext()), p = f.display ? f.width : 0, m = p / 2, h = function(e) {
			return Fu(n, e, p);
		}, g, _, v, y, b, x, S, C, w, T, E, D;
		if (a === "top") g = h(this.bottom), x = this.bottom - u, C = g - m, T = h(e.top) + m, D = e.bottom;
		else if (a === "bottom") g = h(this.top), T = e.top, D = h(e.bottom) - m, x = g + m, C = this.top + u;
		else if (a === "left") g = h(this.right), b = this.right - u, S = g - m, w = h(e.left) + m, E = e.right;
		else if (a === "right") g = h(this.left), w = e.left, E = h(e.right) - m, b = g + m, S = this.left + u;
		else if (t === "x") {
			if (a === "center") g = h((e.top + e.bottom) / 2 + .5);
			else if (V(a)) {
				let e = Object.keys(a)[0], t = a[e];
				g = h(this.chart.scales[e].getPixelForValue(t));
			}
			T = e.top, D = e.bottom, x = g + m, C = x + u;
		} else if (t === "y") {
			if (a === "center") g = h((e.left + e.right) / 2);
			else if (V(a)) {
				let e = Object.keys(a)[0], t = a[e];
				g = h(this.chart.scales[e].getPixelForValue(t));
			}
			b = g - m, S = b - u, w = e.left, E = e.right;
		}
		let O = U(r.ticks.maxTicksLimit, l), ee = Math.max(1, Math.ceil(l / O));
		for (_ = 0; _ < l; _ += ee) {
			let e = this.getContext(_), t = i.setContext(e), r = o.setContext(e), a = t.lineWidth, l = t.color, u = r.dash || [], f = r.dashOffset, p = t.tickWidth, m = t.tickColor, h = t.tickBorderDash || [], g = t.tickBorderDashOffset;
			v = Dm(this, _, s), v !== void 0 && (y = Fu(n, v, a), c ? b = S = w = E = y : x = C = T = D = y, d.push({
				tx1: b,
				ty1: x,
				tx2: S,
				ty2: C,
				x1: w,
				y1: T,
				x2: E,
				y2: D,
				width: a,
				color: l,
				borderDash: u,
				borderDashOffset: f,
				tickWidth: p,
				tickColor: m,
				tickBorderDash: h,
				tickBorderDashOffset: g
			}));
		}
		return this._ticksLength = l, this._borderValue = g, d;
	}
	_computeLabelItems(e) {
		let t = this.axis, n = this.options, { position: r, ticks: i } = n, a = this.isHorizontal(), o = this.ticks, { align: s, crossAlign: c, padding: l, mirror: u } = i, d = km(n.grid), f = d + l, p = u ? -l : f, m = -Ll(this.labelRotation), h = [], g, _, v, y, b, x, S, C, w, T, E, D, O = "middle";
		if (r === "top") x = this.bottom - p, S = this._getXAxisLabelAlignment();
		else if (r === "bottom") x = this.top + p, S = this._getXAxisLabelAlignment();
		else if (r === "left") {
			let e = this._getYAxisLabelAlignment(d);
			S = e.textAlign, b = e.x;
		} else if (r === "right") {
			let e = this._getYAxisLabelAlignment(d);
			S = e.textAlign, b = e.x;
		} else if (t === "x") {
			if (r === "center") x = (e.top + e.bottom) / 2 + f;
			else if (V(r)) {
				let e = Object.keys(r)[0], t = r[e];
				x = this.chart.scales[e].getPixelForValue(t) + f;
			}
			S = this._getXAxisLabelAlignment();
		} else if (t === "y") {
			if (r === "center") b = (e.left + e.right) / 2 - f;
			else if (V(r)) {
				let e = Object.keys(r)[0], t = r[e];
				b = this.chart.scales[e].getPixelForValue(t);
			}
			S = this._getYAxisLabelAlignment(d).textAlign;
		}
		t === "y" && (s === "start" ? O = "top" : s === "end" && (O = "bottom"));
		let ee = this._getLabelSizes();
		for (g = 0, _ = o.length; g < _; ++g) {
			v = o[g], y = v.label;
			let e = i.setContext(this.getContext(g));
			C = this.getPixelForTick(g) + i.labelOffset, w = this._resolveTickFontOptions(g), T = w.lineHeight, E = B(y) ? y.length : 1;
			let t = E / 2, n = e.color, s = e.textStrokeColor, l = e.textStrokeWidth, d = S;
			a ? (b = C, S === "inner" && (d = g === _ - 1 ? this.options.reverse ? "left" : "right" : g === 0 ? this.options.reverse ? "right" : "left" : "center"), D = r === "top" ? c === "near" || m !== 0 ? -E * T + T / 2 : c === "center" ? -ee.highest.height / 2 - t * T + T : -ee.highest.height + T / 2 : c === "near" || m !== 0 ? T / 2 : c === "center" ? ee.highest.height / 2 - t * T : ee.highest.height - E * T, u && (D *= -1), m !== 0 && !e.showLabelBackdrop && (b += T / 2 * Math.sin(m))) : (x = C, D = (1 - E) * T / 2);
			let f;
			if (e.showLabelBackdrop) {
				let t = nd(e.backdropPadding), n = ee.heights[g], r = ee.widths[g], i = D - t.top, a = 0 - t.left;
				switch (O) {
					case "middle":
						i -= n / 2;
						break;
					case "bottom":
						i -= n;
						break;
				}
				switch (S) {
					case "center":
						a -= r / 2;
						break;
					case "right":
						a -= r;
						break;
					case "inner":
						g === _ - 1 ? a -= r : g > 0 && (a -= r / 2);
						break;
				}
				f = {
					left: a,
					top: i,
					width: r + t.width,
					height: n + t.height,
					color: e.backdropColor
				};
			}
			h.push({
				label: y,
				font: w,
				textOffset: D,
				options: {
					rotation: m,
					color: n,
					strokeColor: s,
					strokeWidth: l,
					textAlign: d,
					textBaseline: O,
					translation: [b, x],
					backdrop: f
				}
			});
		}
		return h;
	}
	_getXAxisLabelAlignment() {
		let { position: e, ticks: t } = this.options;
		if (-Ll(this.labelRotation)) return e === "top" ? "left" : "right";
		let n = "center";
		return t.align === "start" ? n = "left" : t.align === "end" ? n = "right" : t.align === "inner" && (n = "inner"), n;
	}
	_getYAxisLabelAlignment(e) {
		let { position: t, ticks: { crossAlign: n, mirror: r, padding: i } } = this.options, a = this._getLabelSizes(), o = e + i, s = a.widest.width, c, l;
		return t === "left" ? r ? (l = this.right + i, n === "near" ? c = "left" : n === "center" ? (c = "center", l += s / 2) : (c = "right", l += s)) : (l = this.right - o, n === "near" ? c = "right" : n === "center" ? (c = "center", l -= s / 2) : (c = "left", l = this.left)) : t === "right" ? r ? (l = this.left + i, n === "near" ? c = "right" : n === "center" ? (c = "center", l -= s / 2) : (c = "left", l -= s)) : (l = this.left + o, n === "near" ? c = "left" : n === "center" ? (c = "center", l += s / 2) : (c = "right", l = this.right)) : c = "right", {
			textAlign: c,
			x: l
		};
	}
	_computeLabelArea() {
		if (this.options.ticks.mirror) return;
		let e = this.chart, t = this.options.position;
		if (t === "left" || t === "right") return {
			top: 0,
			left: this.left,
			bottom: e.height,
			right: this.right
		};
		if (t === "top" || t === "bottom") return {
			top: this.top,
			left: 0,
			bottom: this.bottom,
			right: e.width
		};
	}
	drawBackground() {
		let { ctx: e, options: { backgroundColor: t }, left: n, top: r, width: i, height: a } = this;
		t && (e.save(), e.fillStyle = t, e.fillRect(n, r, i, a), e.restore());
	}
	getLineWidthForValue(e) {
		let t = this.options.grid;
		if (!this._isVisible() || !t.display) return 0;
		let n = this.ticks.findIndex((t) => t.value === e);
		return n >= 0 ? t.setContext(this.getContext(n)).lineWidth : 0;
	}
	drawGrid(e) {
		let t = this.options.grid, n = this.ctx, r = this._gridLineItems ||= this._computeGridLineItems(e), i, a, o = (e, t, r) => {
			!r.width || !r.color || (n.save(), n.lineWidth = r.width, n.strokeStyle = r.color, n.setLineDash(r.borderDash || []), n.lineDashOffset = r.borderDashOffset, n.beginPath(), n.moveTo(e.x, e.y), n.lineTo(t.x, t.y), n.stroke(), n.restore());
		};
		if (t.display) for (i = 0, a = r.length; i < a; ++i) {
			let e = r[i];
			t.drawOnChartArea && o({
				x: e.x1,
				y: e.y1
			}, {
				x: e.x2,
				y: e.y2
			}, e), t.drawTicks && o({
				x: e.tx1,
				y: e.ty1
			}, {
				x: e.tx2,
				y: e.ty2
			}, {
				color: e.tickColor,
				width: e.tickWidth,
				borderDash: e.tickBorderDash,
				borderDashOffset: e.tickBorderDashOffset
			});
		}
	}
	drawBorder() {
		let { chart: e, ctx: t, options: { border: n, grid: r } } = this, i = n.setContext(this.getContext()), a = n.display ? i.width : 0;
		if (!a) return;
		let o = r.setContext(this.getContext(0)).lineWidth, s = this._borderValue, c, l, u, d;
		this.isHorizontal() ? (c = Fu(e, this.left, a) - a / 2, l = Fu(e, this.right, o) + o / 2, u = d = s) : (u = Fu(e, this.top, a) - a / 2, d = Fu(e, this.bottom, o) + o / 2, c = l = s), t.save(), t.lineWidth = i.width, t.strokeStyle = i.color, t.beginPath(), t.moveTo(c, u), t.lineTo(l, d), t.stroke(), t.restore();
	}
	drawLabels(e) {
		if (!this.options.ticks.display) return;
		let t = this.ctx, n = this._computeLabelArea();
		n && Bu(t, n);
		let r = this.getLabelItems(e);
		for (let e of r) {
			let n = e.options, r = e.font, i = e.label, a = e.textOffset;
			qu(t, i, 0, a, r, n);
		}
		n && Vu(t);
	}
	drawTitle() {
		let { ctx: e, options: { position: t, title: n, reverse: r } } = this;
		if (!n.display) return;
		let i = rd(n.font), a = nd(n.padding), o = n.align, s = i.lineHeight / 2;
		t === "bottom" || t === "center" || V(t) ? (s += a.bottom, B(n.text) && (s += i.lineHeight * (n.text.length - 1))) : s += a.top;
		let { titleX: c, titleY: l, maxWidth: u, rotation: d } = Pm(this, s, t, o);
		qu(e, n.text, 0, 0, i, {
			color: n.color,
			maxWidth: u,
			rotation: d,
			textAlign: Nm(o, t, r),
			textBaseline: "middle",
			translation: [c, l]
		});
	}
	draw(e) {
		this._isVisible() && (this.drawBackground(), this.drawGrid(e), this.drawBorder(), this.drawTitle(), this.drawLabels(e));
	}
	_layers() {
		let t = this.options, n = t.ticks && t.ticks.z || 0, r = U(t.grid && t.grid.z, -1), i = U(t.border && t.border.z, 0);
		return !this._isVisible() || this.draw !== e.prototype.draw ? [{
			z: n,
			draw: (e) => {
				this.draw(e);
			}
		}] : [
			{
				z: r,
				draw: (e) => {
					this.drawBackground(), this.drawGrid(e), this.drawTitle();
				}
			},
			{
				z: i,
				draw: () => {
					this.drawBorder();
				}
			},
			{
				z: n,
				draw: (e) => {
					this.drawLabels(e);
				}
			}
		];
	}
	getMatchingVisibleMetas(e) {
		let t = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", r = [], i, a;
		for (i = 0, a = t.length; i < a; ++i) {
			let a = t[i];
			a[n] === this.id && (!e || a.type === e) && r.push(a);
		}
		return r;
	}
	_resolveTickFontOptions(e) {
		return rd(this.options.ticks.setContext(this.getContext(e)).font);
	}
	_maxDigits() {
		let e = this._resolveTickFontOptions(0).lineHeight;
		return (this.isHorizontal() ? this.width : this.height) / e;
	}
}, Im = class {
	constructor(e, t, n) {
		this.type = e, this.scope = t, this.override = n, this.items = Object.create(null);
	}
	isForType(e) {
		return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
	}
	register(e) {
		let t = Object.getPrototypeOf(e), n;
		zm(t) && (n = this.register(t));
		let r = this.items, i = e.id, a = this.scope + "." + i;
		if (!i) throw Error("class does not have id: " + e);
		return i in r ? a : (r[i] = e, Lm(e, a, n), this.override && ju.override(e.id, e.overrides), a);
	}
	get(e) {
		return this.items[e];
	}
	unregister(e) {
		let t = this.items, n = e.id, r = this.scope;
		n in t && delete t[n], r && n in ju[r] && (delete ju[r][n], this.override && delete Du[n]);
	}
};
function Lm(e, t, n) {
	let r = ul(Object.create(null), [
		n ? ju.get(n) : {},
		ju.get(t),
		e.defaults
	]);
	ju.set(t, r), e.defaultRoutes && Rm(t, e.defaultRoutes), e.descriptors && ju.describe(t, e.descriptors);
}
function Rm(e, t) {
	Object.keys(t).forEach((n) => {
		let r = n.split("."), i = r.pop(), a = [e].concat(r).join("."), o = t[n].split("."), s = o.pop(), c = o.join(".");
		ju.route(a, i, c, s);
	});
}
function zm(e) {
	return "id" in e && "defaults" in e;
}
var Bm = /* #__PURE__ */ new class {
	constructor() {
		this.controllers = new Im(Yf, "datasets", !0), this.elements = new Im(hm, "elements"), this.plugins = new Im(Object, "plugins"), this.scales = new Im(Fm, "scales"), this._typedRegistries = [
			this.controllers,
			this.scales,
			this.elements
		];
	}
	add(...e) {
		this._each("register", e);
	}
	remove(...e) {
		this._each("unregister", e);
	}
	addControllers(...e) {
		this._each("register", e, this.controllers);
	}
	addElements(...e) {
		this._each("register", e, this.elements);
	}
	addPlugins(...e) {
		this._each("register", e, this.plugins);
	}
	addScales(...e) {
		this._each("register", e, this.scales);
	}
	getController(e) {
		return this._get(e, this.controllers, "controller");
	}
	getElement(e) {
		return this._get(e, this.elements, "element");
	}
	getPlugin(e) {
		return this._get(e, this.plugins, "plugin");
	}
	getScale(e) {
		return this._get(e, this.scales, "scale");
	}
	removeControllers(...e) {
		this._each("unregister", e, this.controllers);
	}
	removeElements(...e) {
		this._each("unregister", e, this.elements);
	}
	removePlugins(...e) {
		this._each("unregister", e, this.plugins);
	}
	removeScales(...e) {
		this._each("unregister", e, this.scales);
	}
	_each(e, t, n) {
		[...t].forEach((t) => {
			let r = n || this._getRegistryForType(t);
			n || r.isForType(t) || r === this.plugins && t.id ? this._exec(e, r, t) : G(t, (t) => {
				let r = n || this._getRegistryForType(t);
				this._exec(e, r, t);
			});
		});
	}
	_exec(e, t, n) {
		let r = _l(e);
		W(n["before" + r], [], n), t[e](n), W(n["after" + r], [], n);
	}
	_getRegistryForType(e) {
		for (let t = 0; t < this._typedRegistries.length; t++) {
			let n = this._typedRegistries[t];
			if (n.isForType(e)) return n;
		}
		return this.plugins;
	}
	_get(e, t, n) {
		let r = t.get(e);
		if (r === void 0) throw Error("\"" + e + "\" is not a registered " + n + ".");
		return r;
	}
}(), Vm = class {
	constructor() {
		this._init = void 0;
	}
	notify(e, t, n, r) {
		if (t === "beforeInit" && (this._init = this._createDescriptors(e, !0), this._notify(this._init, e, "install")), this._init === void 0) return;
		let i = r ? this._descriptors(e).filter(r) : this._descriptors(e), a = this._notify(i, e, t, n);
		return t === "afterDestroy" && (this._notify(i, e, "stop"), this._notify(this._init, e, "uninstall"), this._init = void 0), a;
	}
	_notify(e, t, n, r) {
		r ||= {};
		for (let i of e) {
			let e = i.plugin, a = e[n];
			if (W(a, [
				t,
				r,
				i.options
			], e) === !1 && r.cancelable) return !1;
		}
		return !0;
	}
	invalidate() {
		z(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
	}
	_descriptors(e) {
		if (this._cache) return this._cache;
		let t = this._cache = this._createDescriptors(e);
		return this._notifyStateChanges(e), t;
	}
	_createDescriptors(e, t) {
		let n = e && e.config, r = U(n.options && n.options.plugins, {}), i = Hm(n);
		return r === !1 && !t ? [] : Wm(e, i, r, t);
	}
	_notifyStateChanges(e) {
		let t = this._oldCache || [], n = this._cache, r = (e, t) => e.filter((e) => !t.some((t) => e.plugin.id === t.plugin.id));
		this._notify(r(t, n), e, "stop"), this._notify(r(n, t), e, "start");
	}
};
function Hm(e) {
	let t = {}, n = [], r = Object.keys(Bm.plugins.items);
	for (let e = 0; e < r.length; e++) n.push(Bm.getPlugin(r[e]));
	let i = e.plugins || [];
	for (let e = 0; e < i.length; e++) {
		let r = i[e];
		n.indexOf(r) === -1 && (n.push(r), t[r.id] = !0);
	}
	return {
		plugins: n,
		localIds: t
	};
}
function Um(e, t) {
	return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Wm(e, { plugins: t, localIds: n }, r, i) {
	let a = [], o = e.getContext();
	for (let s of t) {
		let t = s.id, c = Um(r[t], i);
		c !== null && a.push({
			plugin: s,
			options: Gm(e.config, {
				plugin: s,
				local: n[t]
			}, c, o)
		});
	}
	return a;
}
function Gm(e, { plugin: t, local: n }, r, i) {
	let a = e.pluginScopeKeys(t), o = e.getOptionScopes(r, a);
	return n && t.defaults && o.push(t.defaults), e.createResolver(o, i, [""], {
		scriptable: !1,
		indexable: !1,
		allKeys: !0
	});
}
function Km(e, t) {
	let n = ju.datasets[e] || {};
	return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function qm(e, t) {
	let n = e;
	return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Jm(e, t) {
	return e === t ? "_index_" : "_value_";
}
function Ym(e) {
	if (e === "x" || e === "y" || e === "r") return e;
}
function Xm(e) {
	if (e === "top" || e === "bottom") return "x";
	if (e === "left" || e === "right") return "y";
}
function Zm(e, ...t) {
	if (Ym(e)) return e;
	for (let n of t) {
		let t = n.axis || Xm(n.position) || e.length > 1 && Ym(e[0].toLowerCase());
		if (t) return t;
	}
	throw Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Qm(e, t, n) {
	if (n[t + "AxisID"] === e) return { axis: t };
}
function $m(e, t) {
	if (t.data && t.data.datasets) {
		let n = t.data.datasets.filter((t) => t.xAxisID === e || t.yAxisID === e);
		if (n.length) return Qm(e, "x", n[0]) || Qm(e, "y", n[0]);
	}
	return {};
}
function eh(e, t) {
	let n = Du[e.type] || { scales: {} }, r = t.scales || {}, i = Km(e.type, t), a = Object.create(null);
	return Object.keys(r).forEach((t) => {
		let o = r[t];
		if (!V(o)) return console.error(`Invalid scale configuration for scale: ${t}`);
		if (o._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${t}`);
		let s = Zm(t, o, $m(t, e), ju.scales[o.type]), c = Jm(s, i), l = n.scales || {};
		a[t] = dl(Object.create(null), [
			{ axis: s },
			o,
			l[s],
			l[c]
		]);
	}), e.data.datasets.forEach((n) => {
		let i = n.type || e.type, o = n.indexAxis || Km(i, t), s = (Du[i] || {}).scales || {};
		Object.keys(s).forEach((e) => {
			let t = qm(e, o), i = n[t + "AxisID"] || t;
			a[i] = a[i] || Object.create(null), dl(a[i], [
				{ axis: t },
				r[i],
				s[e]
			]);
		});
	}), Object.keys(a).forEach((e) => {
		let t = a[e];
		dl(t, [ju.scales[t.type], ju.scale]);
	}), a;
}
function th(e) {
	let t = e.options ||= {};
	t.plugins = U(t.plugins, {}), t.scales = eh(e, t);
}
function nh(e) {
	return e ||= {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function rh(e) {
	return e ||= {}, e.data = nh(e.data), th(e), e;
}
var ih = /* @__PURE__ */ new Map(), ah = /* @__PURE__ */ new Set();
function oh(e, t) {
	let n = ih.get(e);
	return n || (n = t(), ih.set(e, n), ah.add(n)), n;
}
var sh = (e, t, n) => {
	let r = gl(t, n);
	r !== void 0 && e.add(r);
}, ch = class {
	constructor(e) {
		this._config = rh(e), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
	}
	get platform() {
		return this._config.platform;
	}
	get type() {
		return this._config.type;
	}
	set type(e) {
		this._config.type = e;
	}
	get data() {
		return this._config.data;
	}
	set data(e) {
		this._config.data = nh(e);
	}
	get options() {
		return this._config.options;
	}
	set options(e) {
		this._config.options = e;
	}
	get plugins() {
		return this._config.plugins;
	}
	update() {
		let e = this._config;
		this.clearCache(), th(e);
	}
	clearCache() {
		this._scopeCache.clear(), this._resolverCache.clear();
	}
	datasetScopeKeys(e) {
		return oh(e, () => [[`datasets.${e}`, ""]]);
	}
	datasetAnimationScopeKeys(e, t) {
		return oh(`${e}.transition.${t}`, () => [[`datasets.${e}.transitions.${t}`, `transitions.${t}`], [`datasets.${e}`, ""]]);
	}
	datasetElementScopeKeys(e, t) {
		return oh(`${e}-${t}`, () => [[
			`datasets.${e}.elements.${t}`,
			`datasets.${e}`,
			`elements.${t}`,
			""
		]]);
	}
	pluginScopeKeys(e) {
		let t = e.id, n = this.type;
		return oh(`${n}-plugin-${t}`, () => [[`plugins.${t}`, ...e.additionalOptionScopes || []]]);
	}
	_cachedScopes(e, t) {
		let n = this._scopeCache, r = n.get(e);
		return (!r || t) && (r = /* @__PURE__ */ new Map(), n.set(e, r)), r;
	}
	getOptionScopes(e, t, n) {
		let { options: r, type: i } = this, a = this._cachedScopes(e, n), o = a.get(t);
		if (o) return o;
		let s = /* @__PURE__ */ new Set();
		t.forEach((t) => {
			e && (s.add(e), t.forEach((t) => sh(s, e, t))), t.forEach((e) => sh(s, r, e)), t.forEach((e) => sh(s, Du[i] || {}, e)), t.forEach((e) => sh(s, ju, e)), t.forEach((e) => sh(s, Ou, e));
		});
		let c = Array.from(s);
		return c.length === 0 && c.push(Object.create(null)), ah.has(t) && a.set(t, c), c;
	}
	chartOptionScopes() {
		let { options: e, type: t } = this;
		return [
			e,
			Du[t] || {},
			ju.datasets[t] || {},
			{ type: t },
			ju,
			Ou
		];
	}
	resolveNamedOptions(e, t, n, r = [""]) {
		let i = { $shared: !0 }, { resolver: a, subPrefixes: o } = lh(this._resolverCache, e, r), s = a;
		if (dh(a, t)) {
			i.$shared = !1, n = yl(n) ? n() : n;
			let t = this.createResolver(e, n, o);
			s = cd(a, n, t);
		}
		for (let e of t) i[e] = s[e];
		return i;
	}
	createResolver(e, t, n = [""], r) {
		let { resolver: i } = lh(this._resolverCache, e, n);
		return V(t) ? cd(i, t, void 0, r) : i;
	}
};
function lh(e, t, n) {
	let r = e.get(t);
	r || (r = /* @__PURE__ */ new Map(), e.set(t, r));
	let i = n.join(), a = r.get(i);
	return a || (a = {
		resolver: sd(t, n),
		subPrefixes: n.filter((e) => !e.toLowerCase().includes("hover"))
	}, r.set(i, a)), a;
}
var uh = (e) => V(e) && Object.getOwnPropertyNames(e).some((t) => yl(e[t]));
function dh(e, t) {
	let { isScriptable: n, isIndexable: r } = ld(e);
	for (let i of t) {
		let t = n(i), a = r(i), o = (a || t) && e[i];
		if (t && (yl(o) || uh(o)) || a && B(o)) return !0;
	}
	return !1;
}
var fh = "4.5.1", ph = [
	"top",
	"bottom",
	"left",
	"right",
	"chartArea"
];
function mh(e, t) {
	return e === "top" || e === "bottom" || ph.indexOf(e) === -1 && t === "x";
}
function hh(e, t) {
	return function(n, r) {
		return n[e] === r[e] ? n[t] - r[t] : n[e] - r[e];
	};
}
function gh(e) {
	let t = e.chart, n = t.options.animation;
	t.notifyPlugins("afterRender"), W(n && n.onComplete, [e], t);
}
function _h(e) {
	let t = e.chart, n = t.options.animation;
	W(n && n.onProgress, [e], t);
}
function vh(e) {
	return Ld() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
var yh = {}, bh = (e) => {
	let t = vh(e);
	return Object.values(yh).filter((e) => e.canvas === t).pop();
};
function xh(e, t, n) {
	let r = Object.keys(e);
	for (let i of r) {
		let r = +i;
		if (r >= t) {
			let a = e[i];
			delete e[i], (n > 0 || r > t) && (e[r + n] = a);
		}
	}
}
function Sh(e, t, n, r) {
	return !n || e.type === "mouseout" ? null : r ? t : e;
}
var J = class {
	static defaults = ju;
	static instances = yh;
	static overrides = Du;
	static registry = Bm;
	static version = fh;
	static getChart = bh;
	static register(...e) {
		Bm.add(...e), Ch();
	}
	static unregister(...e) {
		Bm.remove(...e), Ch();
	}
	constructor(e, t) {
		let n = this.config = new ch(t), r = vh(e), i = bh(r);
		if (i) throw Error("Canvas is already in use. Chart with ID '" + i.id + "' must be destroyed before the canvas with ID '" + i.canvas.id + "' can be reused.");
		let a = n.createResolver(n.chartOptionScopes(), this.getContext());
		this.platform = new (n.platform || (mm(r)))(), this.platform.updateConfig(n);
		let o = this.platform.acquireContext(r, a.aspectRatio), s = o && o.canvas, c = s && s.height, l = s && s.width;
		if (this.id = nl(), this.ctx = o, this.canvas = s, this.width = l, this.height = c, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Vm(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = iu((e) => this.update(e), a.resizeDelay || 0), this._dataChanges = [], yh[this.id] = this, !o || !s) {
			console.error("Failed to create chart: can't acquire context from the given item");
			return;
		}
		Cf.listen(this, "complete", gh), Cf.listen(this, "progress", _h), this._initialize(), this.attached && this.update();
	}
	get aspectRatio() {
		let { options: { aspectRatio: e, maintainAspectRatio: t }, width: n, height: r, _aspectRatio: i } = this;
		return z(e) ? t && i ? i : r ? n / r : null : e;
	}
	get data() {
		return this.config.data;
	}
	set data(e) {
		this.config.data = e;
	}
	get options() {
		return this._options;
	}
	set options(e) {
		this.config.options = e;
	}
	get registry() {
		return Bm;
	}
	_initialize() {
		return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Xd(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
	}
	clear() {
		return Iu(this.canvas, this.ctx), this;
	}
	stop() {
		return Cf.stop(this), this;
	}
	resize(e, t) {
		Cf.running(this) ? this._resizeBeforeDraw = {
			width: e,
			height: t
		} : this._resize(e, t);
	}
	_resize(e, t) {
		let n = this.options, r = this.canvas, i = n.maintainAspectRatio && this.aspectRatio, a = this.platform.getMaximumSize(r, e, t, i), o = n.devicePixelRatio || this.platform.getDevicePixelRatio(), s = this.width ? "resize" : "attach";
		this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, Xd(this, o, !0) && (this.notifyPlugins("resize", { size: a }), W(n.onResize, [this, a], this), this.attached && this._doResize(s) && this.render());
	}
	ensureScalesHaveIDs() {
		G(this.options.scales || {}, (e, t) => {
			e.id = t;
		});
	}
	buildOrUpdateScales() {
		let e = this.options, t = e.scales, n = this.scales, r = Object.keys(n).reduce((e, t) => (e[t] = !1, e), {}), i = [];
		t && (i = i.concat(Object.keys(t).map((e) => {
			let n = t[e], r = Zm(e, n), i = r === "r", a = r === "x";
			return {
				options: n,
				dposition: i ? "chartArea" : a ? "bottom" : "left",
				dtype: i ? "radialLinear" : a ? "category" : "linear"
			};
		}))), G(i, (t) => {
			let i = t.options, a = i.id, o = Zm(a, i), s = U(i.type, t.dtype);
			(i.position === void 0 || mh(i.position, o) !== mh(t.dposition)) && (i.position = t.dposition), r[a] = !0;
			let c = null;
			a in n && n[a].type === s ? c = n[a] : (c = new (Bm.getScale(s))({
				id: a,
				type: s,
				ctx: this.ctx,
				chart: this
			}), n[c.id] = c), c.init(i, e);
		}), G(r, (e, t) => {
			e || delete n[t];
		}), G(n, (e) => {
			Gp.configure(this, e, e.options), Gp.addBox(this, e);
		});
	}
	_updateMetasets() {
		let e = this._metasets, t = this.data.datasets.length, n = e.length;
		if (e.sort((e, t) => e.index - t.index), n > t) {
			for (let e = t; e < n; ++e) this._destroyDatasetMeta(e);
			e.splice(t, n - t);
		}
		this._sortedMetasets = e.slice(0).sort(hh("order", "index"));
	}
	_removeUnreferencedMetasets() {
		let { _metasets: e, data: { datasets: t } } = this;
		e.length > t.length && delete this._stacks, e.forEach((e, n) => {
			t.filter((t) => t === e._dataset).length === 0 && this._destroyDatasetMeta(n);
		});
	}
	buildOrUpdateControllers() {
		let e = [], t = this.data.datasets, n, r;
		for (this._removeUnreferencedMetasets(), n = 0, r = t.length; n < r; n++) {
			let r = t[n], i = this.getDatasetMeta(n), a = r.type || this.config.type;
			if (i.type && i.type !== a && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = a, i.indexAxis = r.indexAxis || Km(a, this.options), i.order = r.order || 0, i.index = n, i.label = "" + r.label, i.visible = this.isDatasetVisible(n), i.controller) i.controller.updateIndex(n), i.controller.linkScales();
			else {
				let t = Bm.getController(a), { datasetElementType: r, dataElementType: o } = ju.datasets[a];
				Object.assign(t, {
					dataElementType: Bm.getElement(o),
					datasetElementType: r && Bm.getElement(r)
				}), i.controller = new t(this, n), e.push(i.controller);
			}
		}
		return this._updateMetasets(), e;
	}
	_resetElements() {
		G(this.data.datasets, (e, t) => {
			this.getDatasetMeta(t).controller.reset();
		}, this);
	}
	reset() {
		this._resetElements(), this.notifyPlugins("reset");
	}
	update(e) {
		let t = this.config;
		t.update();
		let n = this._options = t.createResolver(t.chartOptionScopes(), this.getContext()), r = this._animationsDisabled = !n.animation;
		if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
			mode: e,
			cancelable: !0
		}) === !1) return;
		let i = this.buildOrUpdateControllers();
		this.notifyPlugins("beforeElementsUpdate");
		let a = 0;
		for (let e = 0, t = this.data.datasets.length; e < t; e++) {
			let { controller: t } = this.getDatasetMeta(e), n = !r && i.indexOf(t) === -1;
			t.buildOrUpdateElements(n), a = Math.max(+t.getMaxOverflow(), a);
		}
		a = this._minPadding = n.layout.autoPadding ? a : 0, this._updateLayout(a), r || G(i, (e) => {
			e.reset();
		}), this._updateDatasets(e), this.notifyPlugins("afterUpdate", { mode: e }), this._layers.sort(hh("z", "_idx"));
		let { _active: o, _lastEvent: s } = this;
		s ? this._eventHandler(s, !0) : o.length && this._updateHoverStyles(o, o, !0), this.render();
	}
	_updateScales() {
		G(this.scales, (e) => {
			Gp.removeBox(this, e);
		}), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
	}
	_checkEventBindings() {
		let e = this.options;
		(!bl(new Set(Object.keys(this._listeners)), new Set(e.events)) || !!this._responsiveListeners !== e.responsive) && (this.unbindEvents(), this.bindEvents());
	}
	_updateHiddenIndices() {
		let { _hiddenIndices: e } = this, t = this._getUniformDataChanges() || [];
		for (let { method: n, start: r, count: i } of t) xh(e, r, n === "_removeElements" ? -i : i);
	}
	_getUniformDataChanges() {
		let e = this._dataChanges;
		if (!e || !e.length) return;
		this._dataChanges = [];
		let t = this.data.datasets.length, n = (t) => new Set(e.filter((e) => e[0] === t).map((e, t) => t + "," + e.splice(1).join(","))), r = n(0);
		for (let e = 1; e < t; e++) if (!bl(r, n(e))) return;
		return Array.from(r).map((e) => e.split(",")).map((e) => ({
			method: e[1],
			start: +e[2],
			count: +e[3]
		}));
	}
	_updateLayout(e) {
		if (this.notifyPlugins("beforeLayout", { cancelable: !0 }) === !1) return;
		Gp.update(this, this.width, this.height, e);
		let t = this.chartArea, n = t.width <= 0 || t.height <= 0;
		this._layers = [], G(this.boxes, (e) => {
			n && e.position === "chartArea" || (e.configure && e.configure(), this._layers.push(...e._layers()));
		}, this), this._layers.forEach((e, t) => {
			e._idx = t;
		}), this.notifyPlugins("afterLayout");
	}
	_updateDatasets(e) {
		if (this.notifyPlugins("beforeDatasetsUpdate", {
			mode: e,
			cancelable: !0
		}) !== !1) {
			for (let e = 0, t = this.data.datasets.length; e < t; ++e) this.getDatasetMeta(e).controller.configure();
			for (let t = 0, n = this.data.datasets.length; t < n; ++t) this._updateDataset(t, yl(e) ? e({ datasetIndex: t }) : e);
			this.notifyPlugins("afterDatasetsUpdate", { mode: e });
		}
	}
	_updateDataset(e, t) {
		let n = this.getDatasetMeta(e), r = {
			meta: n,
			index: e,
			mode: t,
			cancelable: !0
		};
		this.notifyPlugins("beforeDatasetUpdate", r) !== !1 && (n.controller._update(t), r.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", r));
	}
	render() {
		this.notifyPlugins("beforeRender", { cancelable: !0 }) !== !1 && (Cf.has(this) ? this.attached && !Cf.running(this) && Cf.start(this) : (this.draw(), gh({ chart: this })));
	}
	draw() {
		let e;
		if (this._resizeBeforeDraw) {
			let { width: e, height: t } = this._resizeBeforeDraw;
			this._resizeBeforeDraw = null, this._resize(e, t);
		}
		if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", { cancelable: !0 }) === !1) return;
		let t = this._layers;
		for (e = 0; e < t.length && t[e].z <= 0; ++e) t[e].draw(this.chartArea);
		for (this._drawDatasets(); e < t.length; ++e) t[e].draw(this.chartArea);
		this.notifyPlugins("afterDraw");
	}
	_getSortedDatasetMetas(e) {
		let t = this._sortedMetasets, n = [], r, i;
		for (r = 0, i = t.length; r < i; ++r) {
			let i = t[r];
			(!e || i.visible) && n.push(i);
		}
		return n;
	}
	getSortedVisibleDatasetMetas() {
		return this._getSortedDatasetMetas(!0);
	}
	_drawDatasets() {
		if (this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 }) === !1) return;
		let e = this.getSortedVisibleDatasetMetas();
		for (let t = e.length - 1; t >= 0; --t) this._drawDataset(e[t]);
		this.notifyPlugins("afterDatasetsDraw");
	}
	_drawDataset(e) {
		let t = this.ctx, n = {
			meta: e,
			index: e.index,
			cancelable: !0
		}, r = Sf(this, e);
		this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (r && Bu(t, r), e.controller.draw(), r && Vu(t), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
	}
	isPointInArea(e) {
		return zu(e, this.chartArea, this._minPadding);
	}
	getElementsAtEventForMode(e, t, n, r) {
		let i = Op.modes[t];
		return typeof i == "function" ? i(this, e, n, r) : [];
	}
	getDatasetMeta(e) {
		let t = this.data.datasets[e], n = this._metasets, r = n.filter((e) => e && e._dataset === t).pop();
		return r || (r = {
			type: null,
			data: [],
			dataset: null,
			controller: null,
			hidden: null,
			xAxisID: null,
			yAxisID: null,
			order: t && t.order || 0,
			index: e,
			_dataset: t,
			_parsed: [],
			_sorted: !1
		}, n.push(r)), r;
	}
	getContext() {
		return this.$context ||= od(null, {
			chart: this,
			type: "chart"
		});
	}
	getVisibleDatasetCount() {
		return this.getSortedVisibleDatasetMetas().length;
	}
	isDatasetVisible(e) {
		let t = this.data.datasets[e];
		if (!t) return !1;
		let n = this.getDatasetMeta(e);
		return typeof n.hidden == "boolean" ? !n.hidden : !t.hidden;
	}
	setDatasetVisibility(e, t) {
		let n = this.getDatasetMeta(e);
		n.hidden = !t;
	}
	toggleDataVisibility(e) {
		this._hiddenIndices[e] = !this._hiddenIndices[e];
	}
	getDataVisibility(e) {
		return !this._hiddenIndices[e];
	}
	_updateVisibility(e, t, n) {
		let r = n ? "show" : "hide", i = this.getDatasetMeta(e), a = i.controller._resolveAnimations(void 0, r);
		vl(t) ? (i.data[t].hidden = !n, this.update()) : (this.setDatasetVisibility(e, n), a.update(i, { visible: n }), this.update((t) => t.datasetIndex === e ? r : void 0));
	}
	hide(e, t) {
		this._updateVisibility(e, t, !1);
	}
	show(e, t) {
		this._updateVisibility(e, t, !0);
	}
	_destroyDatasetMeta(e) {
		let t = this._metasets[e];
		t && t.controller && t.controller._destroy(), delete this._metasets[e];
	}
	_stop() {
		let e, t;
		for (this.stop(), Cf.remove(this), e = 0, t = this.data.datasets.length; e < t; ++e) this._destroyDatasetMeta(e);
	}
	destroy() {
		this.notifyPlugins("beforeDestroy");
		let { canvas: e, ctx: t } = this;
		this._stop(), this.config.clearCache(), e && (this.unbindEvents(), Iu(e, t), this.platform.releaseContext(t), this.canvas = null, this.ctx = null), delete yh[this.id], this.notifyPlugins("afterDestroy");
	}
	toBase64Image(...e) {
		return this.canvas.toDataURL(...e);
	}
	bindEvents() {
		this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
	}
	bindUserEvents() {
		let e = this._listeners, t = this.platform, n = (n, r) => {
			t.addEventListener(this, n, r), e[n] = r;
		}, r = (e, t, n) => {
			e.offsetX = t, e.offsetY = n, this._eventHandler(e);
		};
		G(this.options.events, (e) => n(e, r));
	}
	bindResponsiveEvents() {
		this._responsiveListeners ||= {};
		let e = this._responsiveListeners, t = this.platform, n = (n, r) => {
			t.addEventListener(this, n, r), e[n] = r;
		}, r = (n, r) => {
			e[n] && (t.removeEventListener(this, n, r), delete e[n]);
		}, i = (e, t) => {
			this.canvas && this.resize(e, t);
		}, a, o = () => {
			r("attach", o), this.attached = !0, this.resize(), n("resize", i), n("detach", a);
		};
		a = () => {
			this.attached = !1, r("resize", i), this._stop(), this._resize(0, 0), n("attach", o);
		}, t.isAttached(this.canvas) ? o() : a();
	}
	unbindEvents() {
		G(this._listeners, (e, t) => {
			this.platform.removeEventListener(this, t, e);
		}), this._listeners = {}, G(this._responsiveListeners, (e, t) => {
			this.platform.removeEventListener(this, t, e);
		}), this._responsiveListeners = void 0;
	}
	updateHoverStyle(e, t, n) {
		let r = n ? "set" : "remove", i, a, o, s;
		for (t === "dataset" && (i = this.getDatasetMeta(e[0].datasetIndex), i.controller["_" + r + "DatasetHoverStyle"]()), o = 0, s = e.length; o < s; ++o) {
			a = e[o];
			let t = a && this.getDatasetMeta(a.datasetIndex).controller;
			t && t[r + "HoverStyle"](a.element, a.datasetIndex, a.index);
		}
	}
	getActiveElements() {
		return this._active || [];
	}
	setActiveElements(e) {
		let t = this._active || [], n = e.map(({ datasetIndex: e, index: t }) => {
			let n = this.getDatasetMeta(e);
			if (!n) throw Error("No dataset found at index " + e);
			return {
				datasetIndex: e,
				element: n.data[t],
				index: t
			};
		});
		ol(n, t) || (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, t));
	}
	notifyPlugins(e, t, n) {
		return this._plugins.notify(this, e, t, n);
	}
	isPluginEnabled(e) {
		return this._plugins._cache.filter((t) => t.plugin.id === e).length === 1;
	}
	_updateHoverStyles(e, t, n) {
		let r = this.options.hover, i = (e, t) => e.filter((e) => !t.some((t) => e.datasetIndex === t.datasetIndex && e.index === t.index)), a = i(t, e), o = n ? e : i(e, t);
		a.length && this.updateHoverStyle(a, r.mode, !1), o.length && r.mode && this.updateHoverStyle(o, r.mode, !0);
	}
	_eventHandler(e, t) {
		let n = {
			event: e,
			replay: t,
			cancelable: !0,
			inChartArea: this.isPointInArea(e)
		}, r = (t) => (t.options.events || this.options.events).includes(e.native.type);
		if (this.notifyPlugins("beforeEvent", n, r) === !1) return;
		let i = this._handleEvent(e, t, n.inChartArea);
		return n.cancelable = !1, this.notifyPlugins("afterEvent", n, r), (i || n.changed) && this.render(), this;
	}
	_handleEvent(e, t, n) {
		let { _active: r = [], options: i } = this, a = t, o = this._getActiveElements(e, r, n, a), s = xl(e), c = Sh(e, this._lastEvent, n, s);
		n && (this._lastEvent = null, W(i.onHover, [
			e,
			o,
			this
		], this), s && W(i.onClick, [
			e,
			o,
			this
		], this));
		let l = !ol(o, r);
		return (l || t) && (this._active = o, this._updateHoverStyles(o, r, t)), this._lastEvent = c, l;
	}
	_getActiveElements(e, t, n, r) {
		if (e.type === "mouseout") return [];
		if (!n) return t;
		let i = this.options.hover;
		return this.getElementsAtEventForMode(e, i.mode, i, r);
	}
};
function Ch() {
	return G(J.instances, (e) => e._plugins.invalidate());
}
function wh(e, t, n) {
	let { startAngle: r, x: i, y: a, outerRadius: o, innerRadius: s, options: c } = t, { borderWidth: l, borderJoinStyle: u } = c, d = Math.min(l / o, Ul(r - n));
	if (e.beginPath(), e.arc(i, a, o - l / 2, r + d / 2, n - d / 2), s > 0) {
		let t = Math.min(l / s, Ul(r - n));
		e.arc(i, a, s + l / 2, n - t / 2, r + t / 2, !0);
	} else {
		let t = Math.min(l / 2, o * Ul(r - n));
		if (u === "round") e.arc(i, a, t, n - K / 2, r + K / 2, !0);
		else if (u === "bevel") {
			let o = 2 * t * t, s = -o * Math.cos(n + K / 2) + i, c = -o * Math.sin(n + K / 2) + a, l = o * Math.cos(r + K / 2) + i, u = o * Math.sin(r + K / 2) + a;
			e.lineTo(s, c), e.lineTo(l, u);
		}
	}
	e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Th(e, t, n) {
	let { startAngle: r, pixelMargin: i, x: a, y: o, outerRadius: s, innerRadius: c } = t, l = i / s;
	e.beginPath(), e.arc(a, o, s, r - l, n + l), c > i ? (l = i / c, e.arc(a, o, c, n + l, r - l, !0)) : e.arc(a, o, i, n + Tl, r - Tl), e.closePath(), e.clip();
}
function Eh(e) {
	return $u(e, [
		"outerStart",
		"outerEnd",
		"innerStart",
		"innerEnd"
	]);
}
function Dh(e, t, n, r) {
	let i = Eh(e.options.borderRadius), a = (n - t) / 2, o = Math.min(a, r * t / 2), s = (e) => {
		let t = (n - Math.min(a, e)) * r / 2;
		return Gl(e, 0, Math.min(a, t));
	};
	return {
		outerStart: s(i.outerStart),
		outerEnd: s(i.outerEnd),
		innerStart: Gl(i.innerStart, 0, o),
		innerEnd: Gl(i.innerEnd, 0, o)
	};
}
function Oh(e, t, n, r) {
	return {
		x: n + e * Math.cos(t),
		y: r + e * Math.sin(t)
	};
}
function kh(e, t, n, r, i, a) {
	let { x: o, y: s, startAngle: c, pixelMargin: l, innerRadius: u } = t, d = Math.max(t.outerRadius + r + n - l, 0), f = u > 0 ? u + r + n + l : 0, p = 0, m = i - c;
	if (r) {
		let e = ((u > 0 ? u - r : 0) + (d > 0 ? d - r : 0)) / 2;
		p = (m - (e === 0 ? m : m * e / (e + r))) / 2;
	}
	let h = (m - Math.max(.001, m * d - n / K) / d) / 2, g = c + h + p, _ = i - h - p, { outerStart: v, outerEnd: y, innerStart: b, innerEnd: x } = Dh(t, f, d, _ - g), S = d - v, C = d - y, w = g + v / S, T = _ - y / C, E = f + b, D = f + x, O = g + b / E, ee = _ - x / D;
	if (e.beginPath(), a) {
		let t = (w + T) / 2;
		if (e.arc(o, s, d, w, t), e.arc(o, s, d, t, T), y > 0) {
			let t = Oh(C, T, o, s);
			e.arc(t.x, t.y, y, T, _ + Tl);
		}
		let n = Oh(D, _, o, s);
		if (e.lineTo(n.x, n.y), x > 0) {
			let t = Oh(D, ee, o, s);
			e.arc(t.x, t.y, x, _ + Tl, ee + Math.PI);
		}
		let r = (_ - x / f + (g + b / f)) / 2;
		if (e.arc(o, s, f, _ - x / f, r, !0), e.arc(o, s, f, r, g + b / f, !0), b > 0) {
			let t = Oh(E, O, o, s);
			e.arc(t.x, t.y, b, O + Math.PI, g - Tl);
		}
		let i = Oh(S, g, o, s);
		if (e.lineTo(i.x, i.y), v > 0) {
			let t = Oh(S, w, o, s);
			e.arc(t.x, t.y, v, g - Tl, w);
		}
	} else {
		e.moveTo(o, s);
		let t = Math.cos(w) * d + o, n = Math.sin(w) * d + s;
		e.lineTo(t, n);
		let r = Math.cos(T) * d + o, i = Math.sin(T) * d + s;
		e.lineTo(r, i);
	}
	e.closePath();
}
function Ah(e, t, n, r, i) {
	let { fullCircles: a, startAngle: o, circumference: s } = t, c = t.endAngle;
	if (a) {
		kh(e, t, n, r, c, i);
		for (let t = 0; t < a; ++t) e.fill();
		isNaN(s) || (c = o + (s % q || q));
	}
	return kh(e, t, n, r, c, i), e.fill(), c;
}
function jh(e, t, n, r, i) {
	let { fullCircles: a, startAngle: o, circumference: s, options: c } = t, { borderWidth: l, borderJoinStyle: u, borderDash: d, borderDashOffset: f, borderRadius: p } = c, m = c.borderAlign === "inner";
	if (!l) return;
	e.setLineDash(d || []), e.lineDashOffset = f, m ? (e.lineWidth = l * 2, e.lineJoin = u || "round") : (e.lineWidth = l, e.lineJoin = u || "bevel");
	let h = t.endAngle;
	if (a) {
		kh(e, t, n, r, h, i);
		for (let t = 0; t < a; ++t) e.stroke();
		isNaN(s) || (h = o + (s % q || q));
	}
	m && Th(e, t, h), c.selfJoin && h - o >= K && p === 0 && u !== "miter" && wh(e, t, h), a || (kh(e, t, n, r, h, i), e.stroke());
}
var Mh = class extends hm {
	static id = "arc";
	static defaults = {
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
		circular: !0,
		selfJoin: !1
	};
	static defaultRoutes = { backgroundColor: "backgroundColor" };
	static descriptors = {
		_scriptable: !0,
		_indexable: (e) => e !== "borderDash"
	};
	circumference;
	endAngle;
	fullCircles;
	innerRadius;
	outerRadius;
	pixelMargin;
	startAngle;
	constructor(e) {
		super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, e && Object.assign(this, e);
	}
	inRange(e, t, n) {
		let { angle: r, distance: i } = Bl(this.getProps(["x", "y"], n), {
			x: e,
			y: t
		}), { startAngle: a, endAngle: o, innerRadius: s, outerRadius: c, circumference: l } = this.getProps([
			"startAngle",
			"endAngle",
			"innerRadius",
			"outerRadius",
			"circumference"
		], n), u = (this.options.spacing + this.options.borderWidth) / 2, d = U(l, o - a), f = Wl(r, a, o) && a !== o, p = d >= q || f, m = ql(i, s + u, c + u);
		return p && m;
	}
	getCenterPoint(e) {
		let { x: t, y: n, startAngle: r, endAngle: i, innerRadius: a, outerRadius: o } = this.getProps([
			"x",
			"y",
			"startAngle",
			"endAngle",
			"innerRadius",
			"outerRadius"
		], e), { offset: s, spacing: c } = this.options, l = (r + i) / 2, u = (a + o + c + s) / 2;
		return {
			x: t + Math.cos(l) * u,
			y: n + Math.sin(l) * u
		};
	}
	tooltipPosition(e) {
		return this.getCenterPoint(e);
	}
	draw(e) {
		let { options: t, circumference: n } = this, r = (t.offset || 0) / 4, i = (t.spacing || 0) / 2, a = t.circular;
		if (this.pixelMargin = t.borderAlign === "inner" ? .33 : 0, this.fullCircles = n > q ? Math.floor(n / q) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0) return;
		e.save();
		let o = (this.startAngle + this.endAngle) / 2;
		e.translate(Math.cos(o) * r, Math.sin(o) * r);
		let s = r * (1 - Math.sin(Math.min(K, n || 0)));
		e.fillStyle = t.backgroundColor, e.strokeStyle = t.borderColor, Ah(e, this, s, i, a), jh(e, this, s, i, a), e.restore();
	}
};
function Nh(e, t, n = t) {
	e.lineCap = U(n.borderCapStyle, t.borderCapStyle), e.setLineDash(U(n.borderDash, t.borderDash)), e.lineDashOffset = U(n.borderDashOffset, t.borderDashOffset), e.lineJoin = U(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = U(n.borderWidth, t.borderWidth), e.strokeStyle = U(n.borderColor, t.borderColor);
}
function Ph(e, t, n) {
	e.lineTo(n.x, n.y);
}
function Fh(e) {
	return e.stepped ? Hu : e.tension || e.cubicInterpolationMode === "monotone" ? Uu : Ph;
}
function Ih(e, t, n = {}) {
	let r = e.length, { start: i = 0, end: a = r - 1 } = n, { start: o, end: s } = t, c = Math.max(i, o), l = Math.min(a, s), u = i < o && a < o || i > s && a > s;
	return {
		count: r,
		start: c,
		loop: t.loop,
		ilen: l < c && !u ? r + l - c : l - c
	};
}
function Lh(e, t, n, r) {
	let { points: i, options: a } = t, { count: o, start: s, loop: c, ilen: l } = Ih(i, n, r), u = Fh(a), { move: d = !0, reverse: f } = r || {}, p, m, h;
	for (p = 0; p <= l; ++p) m = i[(s + (f ? l - p : p)) % o], !m.skip && (d ? (e.moveTo(m.x, m.y), d = !1) : u(e, h, m, f, a.stepped), h = m);
	return c && (m = i[(s + (f ? l : 0)) % o], u(e, h, m, f, a.stepped)), !!c;
}
function Rh(e, t, n, r) {
	let i = t.points, { count: a, start: o, ilen: s } = Ih(i, n, r), { move: c = !0, reverse: l } = r || {}, u = 0, d = 0, f, p, m, h, g, _, v = (e) => (o + (l ? s - e : e)) % a, y = () => {
		h !== g && (e.lineTo(u, g), e.lineTo(u, h), e.lineTo(u, _));
	};
	for (c && (p = i[v(0)], e.moveTo(p.x, p.y)), f = 0; f <= s; ++f) {
		if (p = i[v(f)], p.skip) continue;
		let t = p.x, n = p.y, r = t | 0;
		r === m ? (n < h ? h = n : n > g && (g = n), u = (d * u + t) / ++d) : (y(), e.lineTo(t, n), m = r, d = 0, h = g = n), _ = n;
	}
	y();
}
function zh(e) {
	let t = e.options, n = t.borderDash && t.borderDash.length;
	return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? Rh : Lh;
}
function Bh(e) {
	return e.stepped ? ef : e.tension || e.cubicInterpolationMode === "monotone" ? tf : $d;
}
function Vh(e, t, n, r) {
	let i = t._path;
	i || (i = t._path = new Path2D(), t.path(i, n, r) && i.closePath()), Nh(e, t.options), e.stroke(i);
}
function Hh(e, t, n, r) {
	let { segments: i, options: a } = t, o = zh(t);
	for (let s of i) Nh(e, a, s.style), e.beginPath(), o(e, t, s, {
		start: n,
		end: n + r - 1
	}) && e.closePath(), e.stroke();
}
var Uh = typeof Path2D == "function";
function Wh(e, t, n, r) {
	Uh && !t.options.segment ? Vh(e, t, n, r) : Hh(e, t, n, r);
}
var Gh = class extends hm {
	static id = "line";
	static defaults = {
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
	};
	static defaultRoutes = {
		backgroundColor: "backgroundColor",
		borderColor: "borderColor"
	};
	static descriptors = {
		_scriptable: !0,
		_indexable: (e) => e !== "borderDash" && e !== "fill"
	};
	constructor(e) {
		super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
	}
	updateControlPoints(e, t) {
		let n = this.options;
		if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
			let r = n.spanGaps ? this._loop : this._fullLoop;
			Id(this._points, n, e, r, t), this._pointsUpdated = !0;
		}
	}
	set points(e) {
		this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
	}
	get points() {
		return this._points;
	}
	get segments() {
		return this._segments ||= hf(this, this.options.segment);
	}
	first() {
		let e = this.segments, t = this.points;
		return e.length && t[e[0].start];
	}
	last() {
		let e = this.segments, t = this.points, n = e.length;
		return n && t[e[n - 1].end];
	}
	interpolate(e, t) {
		let n = this.options, r = e[t], i = this.points, a = ff(this, {
			property: t,
			start: r,
			end: r
		});
		if (!a.length) return;
		let o = [], s = Bh(n), c, l;
		for (c = 0, l = a.length; c < l; ++c) {
			let { start: l, end: u } = a[c], d = i[l], f = i[u];
			if (d === f) {
				o.push(d);
				continue;
			}
			let p = s(d, f, Math.abs((r - d[t]) / (f[t] - d[t])), n.stepped);
			p[t] = e[t], o.push(p);
		}
		return o.length === 1 ? o[0] : o;
	}
	pathSegment(e, t, n) {
		return zh(this)(e, this, t, n);
	}
	path(e, t, n) {
		let r = this.segments, i = zh(this), a = this._loop;
		t ||= 0, n ||= this.points.length - t;
		for (let o of r) a &= i(e, this, o, {
			start: t,
			end: t + n - 1
		});
		return !!a;
	}
	draw(e, t, n, r) {
		let i = this.options || {};
		(this.points || []).length && i.borderWidth && (e.save(), Wh(e, this, n, r), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
	}
};
function Kh(e, t, n, r) {
	let i = e.options, { [n]: a } = e.getProps([n], r);
	return Math.abs(t - a) < i.radius + i.hitRadius;
}
var qh = class extends hm {
	static id = "point";
	parsed;
	skip;
	stop;
	static defaults = {
		borderWidth: 1,
		hitRadius: 1,
		hoverBorderWidth: 1,
		hoverRadius: 4,
		pointStyle: "circle",
		radius: 3,
		rotation: 0
	};
	static defaultRoutes = {
		backgroundColor: "backgroundColor",
		borderColor: "borderColor"
	};
	constructor(e) {
		super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
	}
	inRange(e, t, n) {
		let r = this.options, { x: i, y: a } = this.getProps(["x", "y"], n);
		return (e - i) ** 2 + (t - a) ** 2 < (r.hitRadius + r.radius) ** 2;
	}
	inXRange(e, t) {
		return Kh(this, e, "x", t);
	}
	inYRange(e, t) {
		return Kh(this, e, "y", t);
	}
	getCenterPoint(e) {
		let { x: t, y: n } = this.getProps(["x", "y"], e);
		return {
			x: t,
			y: n
		};
	}
	size(e) {
		e = e || this.options || {};
		let t = e.radius || 0;
		t = Math.max(t, t && e.hoverRadius || 0);
		let n = t && e.borderWidth || 0;
		return (t + n) * 2;
	}
	draw(e, t) {
		let n = this.options;
		this.skip || n.radius < .1 || !zu(this, t, this.size(n) / 2) || (e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.fillStyle = n.backgroundColor, Lu(e, n, this.x, this.y));
	}
	getRange() {
		let e = this.options || {};
		return e.radius + e.hitRadius;
	}
};
function Jh(e, t) {
	let { x: n, y: r, base: i, width: a, height: o } = e.getProps([
		"x",
		"y",
		"base",
		"width",
		"height"
	], t), s, c, l, u, d;
	return e.horizontal ? (d = o / 2, s = Math.min(n, i), c = Math.max(n, i), l = r - d, u = r + d) : (d = a / 2, s = n - d, c = n + d, l = Math.min(r, i), u = Math.max(r, i)), {
		left: s,
		top: l,
		right: c,
		bottom: u
	};
}
function Yh(e, t, n, r) {
	return e ? 0 : Gl(t, n, r);
}
function Xh(e, t, n) {
	let r = e.options.borderWidth, i = e.borderSkipped, a = ed(r);
	return {
		t: Yh(i.top, a.top, 0, n),
		r: Yh(i.right, a.right, 0, t),
		b: Yh(i.bottom, a.bottom, 0, n),
		l: Yh(i.left, a.left, 0, t)
	};
}
function Zh(e, t, n) {
	let { enableBorderRadius: r } = e.getProps(["enableBorderRadius"]), i = e.options.borderRadius, a = td(i), o = Math.min(t, n), s = e.borderSkipped, c = r || V(i);
	return {
		topLeft: Yh(!c || s.top || s.left, a.topLeft, 0, o),
		topRight: Yh(!c || s.top || s.right, a.topRight, 0, o),
		bottomLeft: Yh(!c || s.bottom || s.left, a.bottomLeft, 0, o),
		bottomRight: Yh(!c || s.bottom || s.right, a.bottomRight, 0, o)
	};
}
function Qh(e) {
	let t = Jh(e), n = t.right - t.left, r = t.bottom - t.top, i = Xh(e, n / 2, r / 2), a = Zh(e, n / 2, r / 2);
	return {
		outer: {
			x: t.left,
			y: t.top,
			w: n,
			h: r,
			radius: a
		},
		inner: {
			x: t.left + i.l,
			y: t.top + i.t,
			w: n - i.l - i.r,
			h: r - i.t - i.b,
			radius: {
				topLeft: Math.max(0, a.topLeft - Math.max(i.t, i.l)),
				topRight: Math.max(0, a.topRight - Math.max(i.t, i.r)),
				bottomLeft: Math.max(0, a.bottomLeft - Math.max(i.b, i.l)),
				bottomRight: Math.max(0, a.bottomRight - Math.max(i.b, i.r))
			}
		}
	};
}
function $h(e, t, n, r) {
	let i = t === null, a = n === null, o = e && !(i && a) && Jh(e, r);
	return o && (i || ql(t, o.left, o.right)) && (a || ql(n, o.top, o.bottom));
}
function eg(e) {
	return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function tg(e, t) {
	e.rect(t.x, t.y, t.w, t.h);
}
function ng(e, t, n = {}) {
	let r = e.x === n.x ? 0 : -t, i = e.y === n.y ? 0 : -t, a = (e.x + e.w === n.x + n.w ? 0 : t) - r, o = (e.y + e.h === n.y + n.h ? 0 : t) - i;
	return {
		x: e.x + r,
		y: e.y + i,
		w: e.w + a,
		h: e.h + o,
		radius: e.radius
	};
}
var rg = class extends hm {
	static id = "bar";
	static defaults = {
		borderSkipped: "start",
		borderWidth: 0,
		borderRadius: 0,
		inflateAmount: "auto",
		pointStyle: void 0
	};
	static defaultRoutes = {
		backgroundColor: "backgroundColor",
		borderColor: "borderColor"
	};
	constructor(e) {
		super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, e && Object.assign(this, e);
	}
	draw(e) {
		let { inflateAmount: t, options: { borderColor: n, backgroundColor: r } } = this, { inner: i, outer: a } = Qh(this), o = eg(a.radius) ? Ju : tg;
		e.save(), (a.w !== i.w || a.h !== i.h) && (e.beginPath(), o(e, ng(a, t, i)), e.clip(), o(e, ng(i, -t, a)), e.fillStyle = n, e.fill("evenodd")), e.beginPath(), o(e, ng(i, t)), e.fillStyle = r, e.fill(), e.restore();
	}
	inRange(e, t, n) {
		return $h(this, e, t, n);
	}
	inXRange(e, t) {
		return $h(this, e, null, t);
	}
	inYRange(e, t) {
		return $h(this, null, e, t);
	}
	getCenterPoint(e) {
		let { x: t, y: n, base: r, horizontal: i } = this.getProps([
			"x",
			"y",
			"base",
			"horizontal"
		], e);
		return {
			x: i ? (t + r) / 2 : t,
			y: i ? n : (n + r) / 2
		};
	}
	getRange(e) {
		return e === "x" ? this.width / 2 : this.height / 2;
	}
};
function ig(e, t, n) {
	let r = e.segments, i = e.points, a = t.points, o = [];
	for (let e of r) {
		let { start: r, end: s } = e;
		s = sg(r, s, i);
		let c = ag(n, i[r], i[s], e.loop);
		if (!t.segments) {
			o.push({
				source: e,
				target: c,
				start: i[r],
				end: i[s]
			});
			continue;
		}
		let l = ff(t, c);
		for (let t of l) {
			let r = ag(n, a[t.start], a[t.end], t.loop), s = df(e, i, r);
			for (let e of s) o.push({
				source: e,
				target: t,
				start: { [n]: cg(c, r, "start", Math.max) },
				end: { [n]: cg(c, r, "end", Math.min) }
			});
		}
	}
	return o;
}
function ag(e, t, n, r) {
	if (r) return;
	let i = t[e], a = n[e];
	return e === "angle" && (i = Ul(i), a = Ul(a)), {
		property: e,
		start: i,
		end: a
	};
}
function og(e, t) {
	let { x: n = null, y: r = null } = e || {}, i = t.points, a = [];
	return t.segments.forEach(({ start: e, end: t }) => {
		t = sg(e, t, i);
		let o = i[e], s = i[t];
		r === null ? n !== null && (a.push({
			x: n,
			y: o.y
		}), a.push({
			x: n,
			y: s.y
		})) : (a.push({
			x: o.x,
			y: r
		}), a.push({
			x: s.x,
			y: r
		}));
	}), a;
}
function sg(e, t, n) {
	for (; t > e; t--) {
		let e = n[t];
		if (!isNaN(e.x) && !isNaN(e.y)) break;
	}
	return t;
}
function cg(e, t, n, r) {
	return e && t ? r(e[n], t[n]) : e ? e[n] : t ? t[n] : 0;
}
function lg(e, t) {
	let n = [], r = !1;
	return B(e) ? (r = !0, n = e) : n = og(e, t), n.length ? new Gh({
		points: n,
		options: { tension: 0 },
		_loop: r,
		_fullLoop: r
	}) : null;
}
function ug(e) {
	return e && e.fill !== !1;
}
function dg(e, t, n) {
	let r = e[t].fill, i = [t], a;
	if (!n) return r;
	for (; r !== !1 && i.indexOf(r) === -1;) {
		if (!H(r)) return r;
		if (a = e[r], !a) return !1;
		if (a.visible) return r;
		i.push(r), r = a.fill;
	}
	return !1;
}
function fg(e, t, n) {
	let r = gg(e);
	if (V(r)) return isNaN(r.value) ? !1 : r;
	let i = parseFloat(r);
	return H(i) && Math.floor(i) === i ? pg(r[0], t, i, n) : [
		"origin",
		"start",
		"end",
		"stack",
		"shape"
	].indexOf(r) >= 0 && r;
}
function pg(e, t, n, r) {
	return (e === "-" || e === "+") && (n = t + n), n === t || n < 0 || n >= r ? !1 : n;
}
function mg(e, t) {
	let n = null;
	return e === "start" ? n = t.bottom : e === "end" ? n = t.top : V(e) ? n = t.getPixelForValue(e.value) : t.getBasePixel && (n = t.getBasePixel()), n;
}
function hg(e, t, n) {
	let r;
	return r = e === "start" ? n : e === "end" ? t.options.reverse ? t.min : t.max : V(e) ? e.value : t.getBaseValue(), r;
}
function gg(e) {
	let t = e.options, n = t.fill, r = U(n && n.target, n);
	return r === void 0 && (r = !!t.backgroundColor), r === !1 || r === null ? !1 : r === !0 ? "origin" : r;
}
function _g(e) {
	let { scale: t, index: n, line: r } = e, i = [], a = r.segments, o = r.points, s = vg(t, n);
	s.push(lg({
		x: null,
		y: t.bottom
	}, r));
	for (let e = 0; e < a.length; e++) {
		let t = a[e];
		for (let e = t.start; e <= t.end; e++) yg(i, o[e], s);
	}
	return new Gh({
		points: i,
		options: {}
	});
}
function vg(e, t) {
	let n = [], r = e.getMatchingVisibleMetas("line");
	for (let e = 0; e < r.length; e++) {
		let i = r[e];
		if (i.index === t) break;
		i.hidden || n.unshift(i.dataset);
	}
	return n;
}
function yg(e, t, n) {
	let r = [];
	for (let i = 0; i < n.length; i++) {
		let a = n[i], { first: o, last: s, point: c } = bg(a, t, "x");
		if (!(!c || o && s)) {
			if (o) r.unshift(c);
			else if (e.push(c), !s) break;
		}
	}
	e.push(...r);
}
function bg(e, t, n) {
	let r = e.interpolate(t, n);
	if (!r) return {};
	let i = r[n], a = e.segments, o = e.points, s = !1, c = !1;
	for (let e = 0; e < a.length; e++) {
		let t = a[e], r = o[t.start][n], l = o[t.end][n];
		if (ql(i, r, l)) {
			s = i === r, c = i === l;
			break;
		}
	}
	return {
		first: s,
		last: c,
		point: r
	};
}
var xg = class {
	constructor(e) {
		this.x = e.x, this.y = e.y, this.radius = e.radius;
	}
	pathSegment(e, t, n) {
		let { x: r, y: i, radius: a } = this;
		return t ||= {
			start: 0,
			end: q
		}, e.arc(r, i, a, t.end, t.start, !0), !n.bounds;
	}
	interpolate(e) {
		let { x: t, y: n, radius: r } = this, i = e.angle;
		return {
			x: t + Math.cos(i) * r,
			y: n + Math.sin(i) * r,
			angle: i
		};
	}
};
function Sg(e) {
	let { chart: t, fill: n, line: r } = e;
	if (H(n)) return Cg(t, n);
	if (n === "stack") return _g(e);
	if (n === "shape") return !0;
	let i = wg(e);
	return i instanceof xg ? i : lg(i, r);
}
function Cg(e, t) {
	let n = e.getDatasetMeta(t);
	return n && e.isDatasetVisible(t) ? n.dataset : null;
}
function wg(e) {
	return (e.scale || {}).getPointPositionForValue ? Eg(e) : Tg(e);
}
function Tg(e) {
	let { scale: t = {}, fill: n } = e, r = mg(n, t);
	if (H(r)) {
		let e = t.isHorizontal();
		return {
			x: e ? r : null,
			y: e ? null : r
		};
	}
	return null;
}
function Eg(e) {
	let { scale: t, fill: n } = e, r = t.options, i = t.getLabels().length, a = r.reverse ? t.max : t.min, o = hg(n, t, a), s = [];
	if (r.grid.circular) {
		let e = t.getPointPositionForValue(0, a);
		return new xg({
			x: e.x,
			y: e.y,
			radius: t.getDistanceFromCenterForValue(o)
		});
	}
	for (let e = 0; e < i; ++e) s.push(t.getPointPositionForValue(e, o));
	return s;
}
function Dg(e, t, n) {
	let r = Sg(t), { chart: i, index: a, line: o, scale: s, axis: c } = t, l = o.options, u = l.fill, d = l.backgroundColor, { above: f = d, below: p = d } = u || {}, m = Sf(i, i.getDatasetMeta(a));
	r && o.points.length && (Bu(e, n), Og(e, {
		line: o,
		target: r,
		above: f,
		below: p,
		area: n,
		scale: s,
		axis: c,
		clip: m
	}), Vu(e));
}
function Og(e, t) {
	let { line: n, target: r, above: i, below: a, area: o, scale: s, clip: c } = t, l = n._loop ? "angle" : t.axis;
	e.save();
	let u = a;
	a !== i && (l === "x" ? (kg(e, r, o.top), jg(e, {
		line: n,
		target: r,
		color: i,
		scale: s,
		property: l,
		clip: c
	}), e.restore(), e.save(), kg(e, r, o.bottom)) : l === "y" && (Ag(e, r, o.left), jg(e, {
		line: n,
		target: r,
		color: a,
		scale: s,
		property: l,
		clip: c
	}), e.restore(), e.save(), Ag(e, r, o.right), u = i)), jg(e, {
		line: n,
		target: r,
		color: u,
		scale: s,
		property: l,
		clip: c
	}), e.restore();
}
function kg(e, t, n) {
	let { segments: r, points: i } = t, a = !0, o = !1;
	e.beginPath();
	for (let s of r) {
		let { start: r, end: c } = s, l = i[r], u = i[sg(r, c, i)];
		a ? (e.moveTo(l.x, l.y), a = !1) : (e.lineTo(l.x, n), e.lineTo(l.x, l.y)), o = !!t.pathSegment(e, s, { move: o }), o ? e.closePath() : e.lineTo(u.x, n);
	}
	e.lineTo(t.first().x, n), e.closePath(), e.clip();
}
function Ag(e, t, n) {
	let { segments: r, points: i } = t, a = !0, o = !1;
	e.beginPath();
	for (let s of r) {
		let { start: r, end: c } = s, l = i[r], u = i[sg(r, c, i)];
		a ? (e.moveTo(l.x, l.y), a = !1) : (e.lineTo(n, l.y), e.lineTo(l.x, l.y)), o = !!t.pathSegment(e, s, { move: o }), o ? e.closePath() : e.lineTo(n, u.y);
	}
	e.lineTo(n, t.first().y), e.closePath(), e.clip();
}
function jg(e, t) {
	let { line: n, target: r, property: i, color: a, scale: o, clip: s } = t, c = ig(n, r, i);
	for (let { source: t, target: l, start: u, end: d } of c) {
		let { style: { backgroundColor: c = a } = {} } = t, f = r !== !0;
		e.save(), e.fillStyle = c, Mg(e, o, s, f && ag(i, u, d)), e.beginPath();
		let p = !!n.pathSegment(e, t), m;
		if (f) {
			p ? e.closePath() : Ng(e, r, d, i);
			let t = !!r.pathSegment(e, l, {
				move: p,
				reverse: !0
			});
			m = p && t, m || Ng(e, r, u, i);
		}
		e.closePath(), e.fill(m ? "evenodd" : "nonzero"), e.restore();
	}
}
function Mg(e, t, n, r) {
	let i = t.chart.chartArea, { property: a, start: o, end: s } = r || {};
	if (a === "x" || a === "y") {
		let t, r, c, l;
		a === "x" ? (t = o, r = i.top, c = s, l = i.bottom) : (t = i.left, r = o, c = i.right, l = s), e.beginPath(), n && (t = Math.max(t, n.left), c = Math.min(c, n.right), r = Math.max(r, n.top), l = Math.min(l, n.bottom)), e.rect(t, r, c - t, l - r), e.clip();
	}
}
function Ng(e, t, n, r) {
	let i = t.interpolate(n, r);
	i && e.lineTo(i.x, i.y);
}
var Pg = {
	id: "filler",
	afterDatasetsUpdate(e, t, n) {
		let r = (e.data.datasets || []).length, i = [], a, o, s, c;
		for (o = 0; o < r; ++o) a = e.getDatasetMeta(o), s = a.dataset, c = null, s && s.options && s instanceof Gh && (c = {
			visible: e.isDatasetVisible(o),
			index: o,
			fill: fg(s, o, r),
			chart: e,
			axis: a.controller.options.indexAxis,
			scale: a.vScale,
			line: s
		}), a.$filler = c, i.push(c);
		for (o = 0; o < r; ++o) c = i[o], !(!c || c.fill === !1) && (c.fill = dg(i, o, n.propagate));
	},
	beforeDraw(e, t, n) {
		let r = n.drawTime === "beforeDraw", i = e.getSortedVisibleDatasetMetas(), a = e.chartArea;
		for (let t = i.length - 1; t >= 0; --t) {
			let n = i[t].$filler;
			n && (n.line.updateControlPoints(a, n.axis), r && n.fill && Dg(e.ctx, n, a));
		}
	},
	beforeDatasetsDraw(e, t, n) {
		if (n.drawTime !== "beforeDatasetsDraw") return;
		let r = e.getSortedVisibleDatasetMetas();
		for (let t = r.length - 1; t >= 0; --t) {
			let n = r[t].$filler;
			ug(n) && Dg(e.ctx, n, e.chartArea);
		}
	},
	beforeDatasetDraw(e, t, n) {
		let r = t.meta.$filler;
		!ug(r) || n.drawTime !== "beforeDatasetDraw" || Dg(e.ctx, r, e.chartArea);
	},
	defaults: {
		propagate: !0,
		drawTime: "beforeDatasetDraw"
	}
}, Fg = {
	average(e) {
		if (!e.length) return !1;
		let t, n, r = /* @__PURE__ */ new Set(), i = 0, a = 0;
		for (t = 0, n = e.length; t < n; ++t) {
			let n = e[t].element;
			if (n && n.hasValue()) {
				let e = n.tooltipPosition();
				r.add(e.x), i += e.y, ++a;
			}
		}
		return a === 0 || r.size === 0 ? !1 : {
			x: [...r].reduce((e, t) => e + t) / r.size,
			y: i / a
		};
	},
	nearest(e, t) {
		if (!e.length) return !1;
		let n = t.x, r = t.y, i = Infinity, a, o, s;
		for (a = 0, o = e.length; a < o; ++a) {
			let n = e[a].element;
			if (n && n.hasValue()) {
				let e = Vl(t, n.getCenterPoint());
				e < i && (i = e, s = n);
			}
		}
		if (s) {
			let e = s.tooltipPosition();
			n = e.x, r = e.y;
		}
		return {
			x: n,
			y: r
		};
	}
};
function Ig(e, t) {
	return t && (B(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Lg(e) {
	return (typeof e == "string" || e instanceof String) && e.indexOf("\n") > -1 ? e.split("\n") : e;
}
function Rg(e, t) {
	let { element: n, datasetIndex: r, index: i } = t, a = e.getDatasetMeta(r).controller, { label: o, value: s } = a.getLabelAndValue(i);
	return {
		chart: e,
		label: o,
		parsed: a.getParsed(i),
		raw: e.data.datasets[r].data[i],
		formattedValue: s,
		dataset: a.getDataset(),
		dataIndex: i,
		datasetIndex: r,
		element: n
	};
}
function zg(e, t) {
	let n = e.chart.ctx, { body: r, footer: i, title: a } = e, { boxWidth: o, boxHeight: s } = t, c = rd(t.bodyFont), l = rd(t.titleFont), u = rd(t.footerFont), d = a.length, f = i.length, p = r.length, m = nd(t.padding), h = m.height, g = 0, _ = r.reduce((e, t) => e + t.before.length + t.lines.length + t.after.length, 0);
	if (_ += e.beforeBody.length + e.afterBody.length, d && (h += d * l.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom), _) {
		let e = t.displayColors ? Math.max(s, c.lineHeight) : c.lineHeight;
		h += p * e + (_ - p) * c.lineHeight + (_ - 1) * t.bodySpacing;
	}
	f && (h += t.footerMarginTop + f * u.lineHeight + (f - 1) * t.footerSpacing);
	let v = 0, y = function(e) {
		g = Math.max(g, n.measureText(e).width + v);
	};
	return n.save(), n.font = l.string, G(e.title, y), n.font = c.string, G(e.beforeBody.concat(e.afterBody), y), v = t.displayColors ? o + 2 + t.boxPadding : 0, G(r, (e) => {
		G(e.before, y), G(e.lines, y), G(e.after, y);
	}), v = 0, n.font = u.string, G(e.footer, y), n.restore(), g += m.width, {
		width: g,
		height: h
	};
}
function Bg(e, t) {
	let { y: n, height: r } = t;
	return n < r / 2 ? "top" : n > e.height - r / 2 ? "bottom" : "center";
}
function Vg(e, t, n, r) {
	let { x: i, width: a } = r, o = n.caretSize + n.caretPadding;
	if (e === "left" && i + a + o > t.width || e === "right" && i - a - o < 0) return !0;
}
function Hg(e, t, n, r) {
	let { x: i, width: a } = n, { width: o, chartArea: { left: s, right: c } } = e, l = "center";
	return r === "center" ? l = i <= (s + c) / 2 ? "left" : "right" : i <= a / 2 ? l = "left" : i >= o - a / 2 && (l = "right"), Vg(l, e, t, n) && (l = "center"), l;
}
function Ug(e, t, n) {
	let r = n.yAlign || t.yAlign || Bg(e, n);
	return {
		xAlign: n.xAlign || t.xAlign || Hg(e, t, n, r),
		yAlign: r
	};
}
function Wg(e, t) {
	let { x: n, width: r } = e;
	return t === "right" ? n -= r : t === "center" && (n -= r / 2), n;
}
function Gg(e, t, n) {
	let { y: r, height: i } = e;
	return t === "top" ? r += n : t === "bottom" ? r -= i + n : r -= i / 2, r;
}
function Kg(e, t, n, r) {
	let { caretSize: i, caretPadding: a, cornerRadius: o } = e, { xAlign: s, yAlign: c } = n, l = i + a, { topLeft: u, topRight: d, bottomLeft: f, bottomRight: p } = td(o), m = Wg(t, s), h = Gg(t, c, l);
	return c === "center" ? s === "left" ? m += l : s === "right" && (m -= l) : s === "left" ? m -= Math.max(u, f) + i : s === "right" && (m += Math.max(d, p) + i), {
		x: Gl(m, 0, r.width - t.width),
		y: Gl(h, 0, r.height - t.height)
	};
}
function qg(e, t, n) {
	let r = nd(n.padding);
	return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - r.right : e.x + r.left;
}
function Jg(e) {
	return Ig([], Lg(e));
}
function Yg(e, t, n) {
	return od(e, {
		tooltip: t,
		tooltipItems: n,
		type: "tooltip"
	});
}
function Xg(e, t) {
	let n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
	return n ? e.override(n) : e;
}
var Zg = {
	beforeTitle: tl,
	title(e) {
		if (e.length > 0) {
			let t = e[0], n = t.chart.data.labels, r = n ? n.length : 0;
			if (this && this.options && this.options.mode === "dataset") return t.dataset.label || "";
			if (t.label) return t.label;
			if (r > 0 && t.dataIndex < r) return n[t.dataIndex];
		}
		return "";
	},
	afterTitle: tl,
	beforeBody: tl,
	beforeLabel: tl,
	label(e) {
		if (this && this.options && this.options.mode === "dataset") return e.label + ": " + e.formattedValue || e.formattedValue;
		let t = e.dataset.label || "";
		t && (t += ": ");
		let n = e.formattedValue;
		return z(n) || (t += n), t;
	},
	labelColor(e) {
		let t = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
		return {
			borderColor: t.borderColor,
			backgroundColor: t.backgroundColor,
			borderWidth: t.borderWidth,
			borderDash: t.borderDash,
			borderDashOffset: t.borderDashOffset,
			borderRadius: 0
		};
	},
	labelTextColor() {
		return this.options.bodyColor;
	},
	labelPointStyle(e) {
		let t = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
		return {
			pointStyle: t.pointStyle,
			rotation: t.rotation
		};
	},
	afterLabel: tl,
	afterBody: tl,
	beforeFooter: tl,
	footer: tl,
	afterFooter: tl
};
function Qg(e, t, n, r) {
	let i = e[t].call(n, r);
	return i === void 0 ? Zg[t].call(n, r) : i;
}
var $g = class extends hm {
	static positioners = Fg;
	constructor(e) {
		super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = e.chart, this.options = e.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
	}
	initialize(e) {
		this.options = e, this._cachedAnimations = void 0, this.$context = void 0;
	}
	_resolveAnimations() {
		let e = this._cachedAnimations;
		if (e) return e;
		let t = this.chart, n = this.options.setContext(this.getContext()), r = n.enabled && t.options.animation && n.animations, i = new Df(this.chart, r);
		return r._cacheable && (this._cachedAnimations = Object.freeze(i)), i;
	}
	getContext() {
		return this.$context ||= Yg(this.chart.getContext(), this, this._tooltipItems);
	}
	getTitle(e, t) {
		let { callbacks: n } = t, r = Qg(n, "beforeTitle", this, e), i = Qg(n, "title", this, e), a = Qg(n, "afterTitle", this, e), o = [];
		return o = Ig(o, Lg(r)), o = Ig(o, Lg(i)), o = Ig(o, Lg(a)), o;
	}
	getBeforeBody(e, t) {
		return Jg(Qg(t.callbacks, "beforeBody", this, e));
	}
	getBody(e, t) {
		let { callbacks: n } = t, r = [];
		return G(e, (e) => {
			let t = {
				before: [],
				lines: [],
				after: []
			}, i = Xg(n, e);
			Ig(t.before, Lg(Qg(i, "beforeLabel", this, e))), Ig(t.lines, Qg(i, "label", this, e)), Ig(t.after, Lg(Qg(i, "afterLabel", this, e))), r.push(t);
		}), r;
	}
	getAfterBody(e, t) {
		return Jg(Qg(t.callbacks, "afterBody", this, e));
	}
	getFooter(e, t) {
		let { callbacks: n } = t, r = Qg(n, "beforeFooter", this, e), i = Qg(n, "footer", this, e), a = Qg(n, "afterFooter", this, e), o = [];
		return o = Ig(o, Lg(r)), o = Ig(o, Lg(i)), o = Ig(o, Lg(a)), o;
	}
	_createItems(e) {
		let t = this._active, n = this.chart.data, r = [], i = [], a = [], o = [], s, c;
		for (s = 0, c = t.length; s < c; ++s) o.push(Rg(this.chart, t[s]));
		return e.filter && (o = o.filter((t, r, i) => e.filter(t, r, i, n))), e.itemSort && (o = o.sort((t, r) => e.itemSort(t, r, n))), G(o, (t) => {
			let n = Xg(e.callbacks, t);
			r.push(Qg(n, "labelColor", this, t)), i.push(Qg(n, "labelPointStyle", this, t)), a.push(Qg(n, "labelTextColor", this, t));
		}), this.labelColors = r, this.labelPointStyles = i, this.labelTextColors = a, this.dataPoints = o, o;
	}
	update(e, t) {
		let n = this.options.setContext(this.getContext()), r = this._active, i, a = [];
		if (!r.length) this.opacity !== 0 && (i = { opacity: 0 });
		else {
			let e = Fg[n.position].call(this, r, this._eventPosition);
			a = this._createItems(n), this.title = this.getTitle(a, n), this.beforeBody = this.getBeforeBody(a, n), this.body = this.getBody(a, n), this.afterBody = this.getAfterBody(a, n), this.footer = this.getFooter(a, n);
			let t = this._size = zg(this, n), o = Object.assign({}, e, t), s = Ug(this.chart, n, o), c = Kg(n, o, s, this.chart);
			this.xAlign = s.xAlign, this.yAlign = s.yAlign, i = {
				opacity: 1,
				x: c.x,
				y: c.y,
				width: t.width,
				height: t.height,
				caretX: e.x,
				caretY: e.y
			};
		}
		this._tooltipItems = a, this.$context = void 0, i && this._resolveAnimations().update(this, i), e && n.external && n.external.call(this, {
			chart: this.chart,
			tooltip: this,
			replay: t
		});
	}
	drawCaret(e, t, n, r) {
		let i = this.getCaretPosition(e, n, r);
		t.lineTo(i.x1, i.y1), t.lineTo(i.x2, i.y2), t.lineTo(i.x3, i.y3);
	}
	getCaretPosition(e, t, n) {
		let { xAlign: r, yAlign: i } = this, { caretSize: a, cornerRadius: o } = n, { topLeft: s, topRight: c, bottomLeft: l, bottomRight: u } = td(o), { x: d, y: f } = e, { width: p, height: m } = t, h, g, _, v, y, b;
		return i === "center" ? (y = f + m / 2, r === "left" ? (h = d, g = h - a, v = y + a, b = y - a) : (h = d + p, g = h + a, v = y - a, b = y + a), _ = h) : (g = r === "left" ? d + Math.max(s, l) + a : r === "right" ? d + p - Math.max(c, u) - a : this.caretX, i === "top" ? (v = f, y = v - a, h = g - a, _ = g + a) : (v = f + m, y = v + a, h = g + a, _ = g - a), b = v), {
			x1: h,
			x2: g,
			x3: _,
			y1: v,
			y2: y,
			y3: b
		};
	}
	drawTitle(e, t, n) {
		let r = this.title, i = r.length, a, o, s;
		if (i) {
			let c = af(n.rtl, this.x, this.width);
			for (e.x = qg(this, n.titleAlign, n), t.textAlign = c.textAlign(n.titleAlign), t.textBaseline = "middle", a = rd(n.titleFont), o = n.titleSpacing, t.fillStyle = n.titleColor, t.font = a.string, s = 0; s < i; ++s) t.fillText(r[s], c.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + o, s + 1 === i && (e.y += n.titleMarginBottom - o);
		}
	}
	_drawColorBox(e, t, n, r, i) {
		let a = this.labelColors[n], o = this.labelPointStyles[n], { boxHeight: s, boxWidth: c } = i, l = rd(i.bodyFont), u = qg(this, "left", i), d = r.x(u), f = s < l.lineHeight ? (l.lineHeight - s) / 2 : 0, p = t.y + f;
		if (i.usePointStyle) {
			let t = {
				radius: Math.min(c, s) / 2,
				pointStyle: o.pointStyle,
				rotation: o.rotation,
				borderWidth: 1
			}, n = r.leftForLtr(d, c) + c / 2, l = p + s / 2;
			e.strokeStyle = i.multiKeyBackground, e.fillStyle = i.multiKeyBackground, Lu(e, t, n, l), e.strokeStyle = a.borderColor, e.fillStyle = a.backgroundColor, Lu(e, t, n, l);
		} else {
			e.lineWidth = V(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, e.strokeStyle = a.borderColor, e.setLineDash(a.borderDash || []), e.lineDashOffset = a.borderDashOffset || 0;
			let t = r.leftForLtr(d, c), n = r.leftForLtr(r.xPlus(d, 1), c - 2), o = td(a.borderRadius);
			Object.values(o).some((e) => e !== 0) ? (e.beginPath(), e.fillStyle = i.multiKeyBackground, Ju(e, {
				x: t,
				y: p,
				w: c,
				h: s,
				radius: o
			}), e.fill(), e.stroke(), e.fillStyle = a.backgroundColor, e.beginPath(), Ju(e, {
				x: n,
				y: p + 1,
				w: c - 2,
				h: s - 2,
				radius: o
			}), e.fill()) : (e.fillStyle = i.multiKeyBackground, e.fillRect(t, p, c, s), e.strokeRect(t, p, c, s), e.fillStyle = a.backgroundColor, e.fillRect(n, p + 1, c - 2, s - 2));
		}
		e.fillStyle = this.labelTextColors[n];
	}
	drawBody(e, t, n) {
		let { body: r } = this, { bodySpacing: i, bodyAlign: a, displayColors: o, boxHeight: s, boxWidth: c, boxPadding: l } = n, u = rd(n.bodyFont), d = u.lineHeight, f = 0, p = af(n.rtl, this.x, this.width), m = function(n) {
			t.fillText(n, p.x(e.x + f), e.y + d / 2), e.y += d + i;
		}, h = p.textAlign(a), g, _, v, y, b, x, S;
		for (t.textAlign = a, t.textBaseline = "middle", t.font = u.string, e.x = qg(this, h, n), t.fillStyle = n.bodyColor, G(this.beforeBody, m), f = o && h !== "right" ? a === "center" ? c / 2 + l : c + 2 + l : 0, y = 0, x = r.length; y < x; ++y) {
			for (g = r[y], _ = this.labelTextColors[y], t.fillStyle = _, G(g.before, m), v = g.lines, o && v.length && (this._drawColorBox(t, e, y, p, n), d = Math.max(u.lineHeight, s)), b = 0, S = v.length; b < S; ++b) m(v[b]), d = u.lineHeight;
			G(g.after, m);
		}
		f = 0, d = u.lineHeight, G(this.afterBody, m), e.y -= i;
	}
	drawFooter(e, t, n) {
		let r = this.footer, i = r.length, a, o;
		if (i) {
			let s = af(n.rtl, this.x, this.width);
			for (e.x = qg(this, n.footerAlign, n), e.y += n.footerMarginTop, t.textAlign = s.textAlign(n.footerAlign), t.textBaseline = "middle", a = rd(n.footerFont), t.fillStyle = n.footerColor, t.font = a.string, o = 0; o < i; ++o) t.fillText(r[o], s.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + n.footerSpacing;
		}
	}
	drawBackground(e, t, n, r) {
		let { xAlign: i, yAlign: a } = this, { x: o, y: s } = e, { width: c, height: l } = n, { topLeft: u, topRight: d, bottomLeft: f, bottomRight: p } = td(r.cornerRadius);
		t.fillStyle = r.backgroundColor, t.strokeStyle = r.borderColor, t.lineWidth = r.borderWidth, t.beginPath(), t.moveTo(o + u, s), a === "top" && this.drawCaret(e, t, n, r), t.lineTo(o + c - d, s), t.quadraticCurveTo(o + c, s, o + c, s + d), a === "center" && i === "right" && this.drawCaret(e, t, n, r), t.lineTo(o + c, s + l - p), t.quadraticCurveTo(o + c, s + l, o + c - p, s + l), a === "bottom" && this.drawCaret(e, t, n, r), t.lineTo(o + f, s + l), t.quadraticCurveTo(o, s + l, o, s + l - f), a === "center" && i === "left" && this.drawCaret(e, t, n, r), t.lineTo(o, s + u), t.quadraticCurveTo(o, s, o + u, s), t.closePath(), t.fill(), r.borderWidth > 0 && t.stroke();
	}
	_updateAnimationTarget(e) {
		let t = this.chart, n = this.$animations, r = n && n.x, i = n && n.y;
		if (r || i) {
			let n = Fg[e.position].call(this, this._active, this._eventPosition);
			if (!n) return;
			let a = this._size = zg(this, e), o = Object.assign({}, n, this._size), s = Ug(t, e, o), c = Kg(e, o, s, t);
			(r._to !== c.x || i._to !== c.y) && (this.xAlign = s.xAlign, this.yAlign = s.yAlign, this.width = a.width, this.height = a.height, this.caretX = n.x, this.caretY = n.y, this._resolveAnimations().update(this, c));
		}
	}
	_willRender() {
		return !!this.opacity;
	}
	draw(e) {
		let t = this.options.setContext(this.getContext()), n = this.opacity;
		if (!n) return;
		this._updateAnimationTarget(t);
		let r = {
			width: this.width,
			height: this.height
		}, i = {
			x: this.x,
			y: this.y
		};
		n = Math.abs(n) < .001 ? 0 : n;
		let a = nd(t.padding), o = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
		t.enabled && o && (e.save(), e.globalAlpha = n, this.drawBackground(i, e, r, t), of(e, t.textDirection), i.y += a.top, this.drawTitle(i, e, t), this.drawBody(i, e, t), this.drawFooter(i, e, t), sf(e, t.textDirection), e.restore());
	}
	getActiveElements() {
		return this._active || [];
	}
	setActiveElements(e, t) {
		let n = this._active, r = e.map(({ datasetIndex: e, index: t }) => {
			let n = this.chart.getDatasetMeta(e);
			if (!n) throw Error("Cannot find a dataset at index " + e);
			return {
				datasetIndex: e,
				element: n.data[t],
				index: t
			};
		}), i = !ol(n, r), a = this._positionChanged(r, t);
		(i || a) && (this._active = r, this._eventPosition = t, this._ignoreReplayEvents = !0, this.update(!0));
	}
	handleEvent(e, t, n = !0) {
		if (t && this._ignoreReplayEvents) return !1;
		this._ignoreReplayEvents = !1;
		let r = this.options, i = this._active || [], a = this._getActiveElements(e, i, t, n), o = this._positionChanged(a, e), s = t || !ol(a, i) || o;
		return s && (this._active = a, (r.enabled || r.external) && (this._eventPosition = {
			x: e.x,
			y: e.y
		}, this.update(!0, t))), s;
	}
	_getActiveElements(e, t, n, r) {
		let i = this.options;
		if (e.type === "mouseout") return [];
		if (!r) return t.filter((e) => this.chart.data.datasets[e.datasetIndex] && this.chart.getDatasetMeta(e.datasetIndex).controller.getParsed(e.index) !== void 0);
		let a = this.chart.getElementsAtEventForMode(e, i.mode, i, n);
		return i.reverse && a.reverse(), a;
	}
	_positionChanged(e, t) {
		let { caretX: n, caretY: r, options: i } = this, a = Fg[i.position].call(this, e, t);
		return a !== !1 && (n !== a.x || r !== a.y);
	}
}, e_ = {
	id: "tooltip",
	_element: $g,
	positioners: Fg,
	afterInit(e, t, n) {
		n && (e.tooltip = new $g({
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
		let t = e.tooltip;
		if (t && t._willRender()) {
			let n = { tooltip: t };
			if (e.notifyPlugins("beforeTooltipDraw", {
				...n,
				cancelable: !0
			}) === !1) return;
			t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", n);
		}
	},
	afterEvent(e, t) {
		if (e.tooltip) {
			let n = t.replay;
			e.tooltip.handleEvent(t.event, n, t.inChartArea) && (t.changed = !0);
		}
	},
	defaults: {
		enabled: !0,
		external: null,
		position: "average",
		backgroundColor: "rgba(0,0,0,0.8)",
		titleColor: "#fff",
		titleFont: { weight: "bold" },
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
		footerFont: { weight: "bold" },
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
		callbacks: Zg
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
		animation: { _fallback: !1 },
		animations: { _fallback: "animation" }
	},
	additionalOptionScopes: ["interaction"]
}, t_ = (e, t, n, r) => (typeof t == "string" ? (n = e.push(t) - 1, r.unshift({
	index: n,
	label: t
})) : isNaN(t) && (n = null), n);
function n_(e, t, n, r) {
	let i = e.indexOf(t);
	return i === -1 ? t_(e, t, n, r) : i === e.lastIndexOf(t) ? i : n;
}
var r_ = (e, t) => e === null ? null : Gl(Math.round(e), 0, t);
function i_(e) {
	let t = this.getLabels();
	return e >= 0 && e < t.length ? t[e] : e;
}
var a_ = class extends Fm {
	static id = "category";
	static defaults = { ticks: { callback: i_ } };
	constructor(e) {
		super(e), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
	}
	init(e) {
		let t = this._addedLabels;
		if (t.length) {
			let e = this.getLabels();
			for (let { index: n, label: r } of t) e[n] === r && e.splice(n, 1);
			this._addedLabels = [];
		}
		super.init(e);
	}
	parse(e, t) {
		if (z(e)) return null;
		let n = this.getLabels();
		return t = isFinite(t) && n[t] === e ? t : n_(n, e, U(t, e), this._addedLabels), r_(t, n.length - 1);
	}
	determineDataLimits() {
		let { minDefined: e, maxDefined: t } = this.getUserBounds(), { min: n, max: r } = this.getMinMax(!0);
		this.options.bounds === "ticks" && (e || (n = 0), t || (r = this.getLabels().length - 1)), this.min = n, this.max = r;
	}
	buildTicks() {
		let e = this.min, t = this.max, n = this.options.offset, r = [], i = this.getLabels();
		i = e === 0 && t === i.length - 1 ? i : i.slice(e, t + 1), this._valueRange = Math.max(i.length - +!n, 1), this._startValue = this.min - (n ? .5 : 0);
		for (let n = e; n <= t; n++) r.push({ value: n });
		return r;
	}
	getLabelForValue(e) {
		return i_.call(this, e);
	}
	configure() {
		super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
	}
	getPixelForValue(e) {
		return typeof e != "number" && (e = this.parse(e)), e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
	}
	getPixelForTick(e) {
		let t = this.ticks;
		return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e].value);
	}
	getValueForPixel(e) {
		return Math.round(this._startValue + this.getDecimalForPixel(e) * this._valueRange);
	}
	getBasePixel() {
		return this.bottom;
	}
};
function o_(e, t) {
	let n = [], { bounds: r, step: i, min: a, max: o, precision: s, count: c, maxTicks: l, maxDigits: u, includeBounds: d } = e, f = i || 1, p = l - 1, { min: m, max: h } = t, g = !z(a), _ = !z(o), v = !z(c), y = (h - m) / (u + 1), b = jl((h - m) / p / f) * f, x, S, C, w;
	if (b < 1e-14 && !g && !_) return [{ value: m }, { value: h }];
	w = Math.ceil(h / b) - Math.floor(m / b), w > p && (b = jl(w * b / p / f) * f), z(s) || (x = 10 ** s, b = Math.ceil(b * x) / x), r === "ticks" ? (S = Math.floor(m / b) * b, C = Math.ceil(h / b) * b) : (S = m, C = h), g && _ && i && Fl((o - a) / i, b / 1e3) ? (w = Math.round(Math.min((o - a) / b, l)), b = (o - a) / w, S = a, C = o) : v ? (S = g ? a : S, C = _ ? o : C, w = c - 1, b = (C - S) / w) : (w = (C - S) / b, w = Al(w, Math.round(w), b / 1e3) ? Math.round(w) : Math.ceil(w));
	let T = Math.max(zl(b), zl(S));
	x = 10 ** (z(s) ? T : s), S = Math.round(S * x) / x, C = Math.round(C * x) / x;
	let E = 0;
	for (g && (d && S !== a ? (n.push({ value: a }), S < a && E++, Al(Math.round((S + E * b) * x) / x, a, s_(a, y, e)) && E++) : S < a && E++); E < w; ++E) {
		let e = Math.round((S + E * b) * x) / x;
		if (_ && e > o) break;
		n.push({ value: e });
	}
	return _ && d && C !== o ? n.length && Al(n[n.length - 1].value, o, s_(o, y, e)) ? n[n.length - 1].value = o : n.push({ value: o }) : (!_ || C === o) && n.push({ value: C }), n;
}
function s_(e, t, { horizontal: n, minRotation: r }) {
	let i = Ll(r), a = (n ? Math.sin(i) : Math.cos(i)) || .001, o = .75 * t * ("" + e).length;
	return Math.min(t / a, o);
}
var c_ = class extends Fm {
	constructor(e) {
		super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
	}
	parse(e, t) {
		return z(e) || (typeof e == "number" || e instanceof Number) && !isFinite(+e) ? null : +e;
	}
	handleTickRangeOptions() {
		let { beginAtZero: e } = this.options, { minDefined: t, maxDefined: n } = this.getUserBounds(), { min: r, max: i } = this, a = (e) => r = t ? r : e, o = (e) => i = n ? i : e;
		if (e) {
			let e = kl(r), t = kl(i);
			e < 0 && t < 0 ? o(0) : e > 0 && t > 0 && a(0);
		}
		if (r === i) {
			let t = i === 0 ? 1 : Math.abs(i * .05);
			o(i + t), e || a(r - t);
		}
		this.min = r, this.max = i;
	}
	getTickLimit() {
		let { maxTicksLimit: e, stepSize: t } = this.options.ticks, n;
		return t ? (n = Math.ceil(this.max / t) - Math.floor(this.min / t) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${t} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), e ||= 11), e && (n = Math.min(e, n)), n;
	}
	computeTickLimit() {
		return Infinity;
	}
	buildTicks() {
		let e = this.options, t = e.ticks, n = this.getTickLimit();
		n = Math.max(2, n);
		let r = o_({
			maxTicks: n,
			bounds: e.bounds,
			min: e.min,
			max: e.max,
			precision: t.precision,
			step: t.stepSize,
			count: t.count,
			maxDigits: this._maxDigits(),
			horizontal: this.isHorizontal(),
			minRotation: t.minRotation || 0,
			includeBounds: t.includeBounds !== !1
		}, this._range || this);
		return e.bounds === "ticks" && Il(r, this, "value"), e.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
	}
	configure() {
		let e = this.ticks, t = this.min, n = this.max;
		if (super.configure(), this.options.offset && e.length) {
			let r = (n - t) / Math.max(e.length - 1, 1) / 2;
			t -= r, n += r;
		}
		this._startValue = t, this._endValue = n, this._valueRange = n - t;
	}
	getLabelForValue(e) {
		return Su(e, this.chart.options.locale, this.options.ticks.format);
	}
}, l_ = class extends c_ {
	static id = "linear";
	static defaults = { ticks: { callback: Tu.formatters.numeric } };
	determineDataLimits() {
		let { min: e, max: t } = this.getMinMax(!0);
		this.min = H(e) ? e : 0, this.max = H(t) ? t : 1, this.handleTickRangeOptions();
	}
	computeTickLimit() {
		let e = this.isHorizontal(), t = e ? this.width : this.height, n = Ll(this.options.ticks.minRotation), r = (e ? Math.sin(n) : Math.cos(n)) || .001, i = this._resolveTickFontOptions(0);
		return Math.ceil(t / Math.min(40, i.lineHeight / r));
	}
	getPixelForValue(e) {
		return e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
	}
	getValueForPixel(e) {
		return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
	}
}, u_ = (e) => Math.floor(Ol(e)), d_ = (e, t) => 10 ** (u_(e) + t);
function f_(e) {
	return e / 10 ** u_(e) == 1;
}
function p_(e, t, n) {
	let r = 10 ** n, i = Math.floor(e / r);
	return Math.ceil(t / r) - i;
}
function m_(e, t) {
	let n = u_(t - e);
	for (; p_(e, t, n) > 10;) n++;
	for (; p_(e, t, n) < 10;) n--;
	return Math.min(n, u_(e));
}
function h_(e, { min: t, max: n }) {
	t = rl(e.min, t);
	let r = [], i = u_(t), a = m_(t, n), o = a < 0 ? 10 ** Math.abs(a) : 1, s = 10 ** a, c = i > a ? 10 ** i : 0, l = Math.round((t - c) * o) / o, u = Math.floor((t - c) / s / 10) * s * 10, d = Math.floor((l - u) / 10 ** a), f = rl(e.min, Math.round((c + u + d * 10 ** a) * o) / o);
	for (; f < n;) r.push({
		value: f,
		major: f_(f),
		significand: d
	}), d >= 10 ? d = d < 15 ? 15 : 20 : d++, d >= 20 && (a++, d = 2, o = a >= 0 ? 1 : o), f = Math.round((c + u + d * 10 ** a) * o) / o;
	let p = rl(e.max, f);
	return r.push({
		value: p,
		major: f_(p),
		significand: d
	}), r;
}
(class extends Fm {
	static id = "logarithmic";
	static defaults = { ticks: {
		callback: Tu.formatters.logarithmic,
		major: { enabled: !0 }
	} };
	constructor(e) {
		super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
	}
	parse(e, t) {
		let n = c_.prototype.parse.apply(this, [e, t]);
		if (n === 0) {
			this._zero = !0;
			return;
		}
		return H(n) && n > 0 ? n : null;
	}
	determineDataLimits() {
		let { min: e, max: t } = this.getMinMax(!0);
		this.min = H(e) ? Math.max(0, e) : null, this.max = H(t) ? Math.max(0, t) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !H(this._userMin) && (this.min = e === d_(this.min, 0) ? d_(this.min, -1) : d_(this.min, 0)), this.handleTickRangeOptions();
	}
	handleTickRangeOptions() {
		let { minDefined: e, maxDefined: t } = this.getUserBounds(), n = this.min, r = this.max, i = (t) => n = e ? n : t, a = (e) => r = t ? r : e;
		n === r && (n <= 0 ? (i(1), a(10)) : (i(d_(n, -1)), a(d_(r, 1)))), n <= 0 && i(d_(r, -1)), r <= 0 && a(d_(n, 1)), this.min = n, this.max = r;
	}
	buildTicks() {
		let e = this.options, t = h_({
			min: this._userMin,
			max: this._userMax
		}, this);
		return e.bounds === "ticks" && Il(t, this, "value"), e.reverse ? (t.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), t;
	}
	getLabelForValue(e) {
		return e === void 0 ? "0" : Su(e, this.chart.options.locale, this.options.ticks.format);
	}
	configure() {
		let e = this.min;
		super.configure(), this._startValue = Ol(e), this._valueRange = Ol(this.max) - Ol(e);
	}
	getPixelForValue(e) {
		return (e === void 0 || e === 0) && (e = this.min), e === null || isNaN(e) ? NaN : this.getPixelForDecimal(e === this.min ? 0 : (Ol(e) - this._startValue) / this._valueRange);
	}
	getValueForPixel(e) {
		let t = this.getDecimalForPixel(e);
		return 10 ** (this._startValue + t * this._valueRange);
	}
});
function g_(e) {
	let t = e.ticks;
	if (t.display && e.display) {
		let e = nd(t.backdropPadding);
		return U(t.font && t.font.size, ju.font.size) + e.height;
	}
	return 0;
}
function __(e, t, n) {
	return n = B(n) ? n : [n], {
		w: Pu(e, t.string, n),
		h: n.length * t.lineHeight
	};
}
function v_(e, t, n, r, i) {
	return e === r || e === i ? {
		start: t - n / 2,
		end: t + n / 2
	} : e < r || e > i ? {
		start: t - n,
		end: t
	} : {
		start: t,
		end: t + n
	};
}
function y_(e) {
	let t = {
		l: e.left + e._padding.left,
		r: e.right - e._padding.right,
		t: e.top + e._padding.top,
		b: e.bottom - e._padding.bottom
	}, n = Object.assign({}, t), r = [], i = [], a = e._pointLabels.length, o = e.options.pointLabels, s = o.centerPointLabels ? K / a : 0;
	for (let c = 0; c < a; c++) {
		let a = o.setContext(e.getPointLabelContext(c));
		i[c] = a.padding;
		let l = e.getPointPosition(c, e.drawingArea + i[c], s), u = rd(a.font), d = __(e.ctx, u, e._pointLabels[c]);
		r[c] = d;
		let f = Ul(e.getIndexAngle(c) + s), p = Math.round(Rl(f));
		b_(n, t, f, v_(p, l.x, d.w, 0, 180), v_(p, l.y, d.h, 90, 270));
	}
	e.setCenterPoint(t.l - n.l, n.r - t.r, t.t - n.t, n.b - t.b), e._pointLabelItems = C_(e, r, i);
}
function b_(e, t, n, r, i) {
	let a = Math.abs(Math.sin(n)), o = Math.abs(Math.cos(n)), s = 0, c = 0;
	r.start < t.l ? (s = (t.l - r.start) / a, e.l = Math.min(e.l, t.l - s)) : r.end > t.r && (s = (r.end - t.r) / a, e.r = Math.max(e.r, t.r + s)), i.start < t.t ? (c = (t.t - i.start) / o, e.t = Math.min(e.t, t.t - c)) : i.end > t.b && (c = (i.end - t.b) / o, e.b = Math.max(e.b, t.b + c));
}
function x_(e, t, n) {
	let r = e.drawingArea, { extra: i, additionalAngle: a, padding: o, size: s } = n, c = e.getPointPosition(t, r + i + o, a), l = Math.round(Rl(Ul(c.angle + Tl))), u = E_(c.y, s.h, l), d = w_(l), f = T_(c.x, s.w, d);
	return {
		visible: !0,
		x: c.x,
		y: u,
		textAlign: d,
		left: f,
		top: u,
		right: f + s.w,
		bottom: u + s.h
	};
}
function S_(e, t) {
	if (!t) return !0;
	let { left: n, top: r, right: i, bottom: a } = e;
	return !(zu({
		x: n,
		y: r
	}, t) || zu({
		x: n,
		y: a
	}, t) || zu({
		x: i,
		y: r
	}, t) || zu({
		x: i,
		y: a
	}, t));
}
function C_(e, t, n) {
	let r = [], i = e._pointLabels.length, a = e.options, { centerPointLabels: o, display: s } = a.pointLabels, c = {
		extra: g_(a) / 2,
		additionalAngle: o ? K / i : 0
	}, l;
	for (let a = 0; a < i; a++) {
		c.padding = n[a], c.size = t[a];
		let i = x_(e, a, c);
		r.push(i), s === "auto" && (i.visible = S_(i, l), i.visible && (l = i));
	}
	return r;
}
function w_(e) {
	return e === 0 || e === 180 ? "center" : e < 180 ? "left" : "right";
}
function T_(e, t, n) {
	return n === "right" ? e -= t : n === "center" && (e -= t / 2), e;
}
function E_(e, t, n) {
	return n === 90 || n === 270 ? e -= t / 2 : (n > 270 || n < 90) && (e -= t), e;
}
function D_(e, t, n) {
	let { left: r, top: i, right: a, bottom: o } = n, { backdropColor: s } = t;
	if (!z(s)) {
		let n = td(t.borderRadius), c = nd(t.backdropPadding);
		e.fillStyle = s;
		let l = r - c.left, u = i - c.top, d = a - r + c.width, f = o - i + c.height;
		Object.values(n).some((e) => e !== 0) ? (e.beginPath(), Ju(e, {
			x: l,
			y: u,
			w: d,
			h: f,
			radius: n
		}), e.fill()) : e.fillRect(l, u, d, f);
	}
}
function O_(e, t) {
	let { ctx: n, options: { pointLabels: r } } = e;
	for (let i = t - 1; i >= 0; i--) {
		let t = e._pointLabelItems[i];
		if (!t.visible) continue;
		let a = r.setContext(e.getPointLabelContext(i));
		D_(n, a, t);
		let o = rd(a.font), { x: s, y: c, textAlign: l } = t;
		qu(n, e._pointLabels[i], s, c + o.lineHeight / 2, o, {
			color: a.color,
			textAlign: l,
			textBaseline: "middle"
		});
	}
}
function k_(e, t, n, r) {
	let { ctx: i } = e;
	if (n) i.arc(e.xCenter, e.yCenter, t, 0, q);
	else {
		let n = e.getPointPosition(0, t);
		i.moveTo(n.x, n.y);
		for (let a = 1; a < r; a++) n = e.getPointPosition(a, t), i.lineTo(n.x, n.y);
	}
}
function A_(e, t, n, r, i) {
	let a = e.ctx, o = t.circular, { color: s, lineWidth: c } = t;
	!o && !r || !s || !c || n < 0 || (a.save(), a.strokeStyle = s, a.lineWidth = c, a.setLineDash(i.dash || []), a.lineDashOffset = i.dashOffset, a.beginPath(), k_(e, n, o, r), a.closePath(), a.stroke(), a.restore());
}
function j_(e, t, n) {
	return od(e, {
		label: n,
		index: t,
		type: "pointLabel"
	});
}
var M_ = class extends c_ {
	static id = "radialLinear";
	static defaults = {
		display: !0,
		animate: !0,
		position: "chartArea",
		angleLines: {
			display: !0,
			lineWidth: 1,
			borderDash: [],
			borderDashOffset: 0
		},
		grid: { circular: !1 },
		startAngle: 0,
		ticks: {
			showLabelBackdrop: !0,
			callback: Tu.formatters.numeric
		},
		pointLabels: {
			backdropColor: void 0,
			backdropPadding: 2,
			display: !0,
			font: { size: 10 },
			callback(e) {
				return e;
			},
			padding: 5,
			centerPointLabels: !1
		}
	};
	static defaultRoutes = {
		"angleLines.color": "borderColor",
		"pointLabels.color": "color",
		"ticks.color": "color"
	};
	static descriptors = { angleLines: { _fallback: "grid" } };
	constructor(e) {
		super(e), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
	}
	setDimensions() {
		let e = this._padding = nd(g_(this.options) / 2), t = this.width = this.maxWidth - e.width, n = this.height = this.maxHeight - e.height;
		this.xCenter = Math.floor(this.left + t / 2 + e.left), this.yCenter = Math.floor(this.top + n / 2 + e.top), this.drawingArea = Math.floor(Math.min(t, n) / 2);
	}
	determineDataLimits() {
		let { min: e, max: t } = this.getMinMax(!1);
		this.min = H(e) && !isNaN(e) ? e : 0, this.max = H(t) && !isNaN(t) ? t : 0, this.handleTickRangeOptions();
	}
	computeTickLimit() {
		return Math.ceil(this.drawingArea / g_(this.options));
	}
	generateTickLabels(e) {
		c_.prototype.generateTickLabels.call(this, e), this._pointLabels = this.getLabels().map((e, t) => {
			let n = W(this.options.pointLabels.callback, [e, t], this);
			return n || n === 0 ? n : "";
		}).filter((e, t) => this.chart.getDataVisibility(t));
	}
	fit() {
		let e = this.options;
		e.display && e.pointLabels.display ? y_(this) : this.setCenterPoint(0, 0, 0, 0);
	}
	setCenterPoint(e, t, n, r) {
		this.xCenter += Math.floor((e - t) / 2), this.yCenter += Math.floor((n - r) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(e, t, n, r));
	}
	getIndexAngle(e) {
		let t = q / (this._pointLabels.length || 1), n = this.options.startAngle || 0;
		return Ul(e * t + Ll(n));
	}
	getDistanceFromCenterForValue(e) {
		if (z(e)) return NaN;
		let t = this.drawingArea / (this.max - this.min);
		return this.options.reverse ? (this.max - e) * t : (e - this.min) * t;
	}
	getValueForDistanceFromCenter(e) {
		if (z(e)) return NaN;
		let t = e / (this.drawingArea / (this.max - this.min));
		return this.options.reverse ? this.max - t : this.min + t;
	}
	getPointLabelContext(e) {
		let t = this._pointLabels || [];
		if (e >= 0 && e < t.length) {
			let n = t[e];
			return j_(this.getContext(), e, n);
		}
	}
	getPointPosition(e, t, n = 0) {
		let r = this.getIndexAngle(e) - Tl + n;
		return {
			x: Math.cos(r) * t + this.xCenter,
			y: Math.sin(r) * t + this.yCenter,
			angle: r
		};
	}
	getPointPositionForValue(e, t) {
		return this.getPointPosition(e, this.getDistanceFromCenterForValue(t));
	}
	getBasePosition(e) {
		return this.getPointPositionForValue(e || 0, this.getBaseValue());
	}
	getPointLabelPosition(e) {
		let { left: t, top: n, right: r, bottom: i } = this._pointLabelItems[e];
		return {
			left: t,
			top: n,
			right: r,
			bottom: i
		};
	}
	drawBackground() {
		let { backgroundColor: e, grid: { circular: t } } = this.options;
		if (e) {
			let n = this.ctx;
			n.save(), n.beginPath(), k_(this, this.getDistanceFromCenterForValue(this._endValue), t, this._pointLabels.length), n.closePath(), n.fillStyle = e, n.fill(), n.restore();
		}
	}
	drawGrid() {
		let e = this.ctx, t = this.options, { angleLines: n, grid: r, border: i } = t, a = this._pointLabels.length, o, s, c;
		if (t.pointLabels.display && O_(this, a), r.display && this.ticks.forEach((e, t) => {
			if (t !== 0 || t === 0 && this.min < 0) {
				s = this.getDistanceFromCenterForValue(e.value);
				let n = this.getContext(t), o = r.setContext(n), c = i.setContext(n);
				A_(this, o, s, a, c);
			}
		}), n.display) {
			for (e.save(), o = a - 1; o >= 0; o--) {
				let r = n.setContext(this.getPointLabelContext(o)), { color: i, lineWidth: a } = r;
				!a || !i || (e.lineWidth = a, e.strokeStyle = i, e.setLineDash(r.borderDash), e.lineDashOffset = r.borderDashOffset, s = this.getDistanceFromCenterForValue(t.reverse ? this.min : this.max), c = this.getPointPosition(o, s), e.beginPath(), e.moveTo(this.xCenter, this.yCenter), e.lineTo(c.x, c.y), e.stroke());
			}
			e.restore();
		}
	}
	drawBorder() {}
	drawLabels() {
		let e = this.ctx, t = this.options, n = t.ticks;
		if (!n.display) return;
		let r = this.getIndexAngle(0), i, a;
		e.save(), e.translate(this.xCenter, this.yCenter), e.rotate(r), e.textAlign = "center", e.textBaseline = "middle", this.ticks.forEach((r, o) => {
			if (o === 0 && this.min >= 0 && !t.reverse) return;
			let s = n.setContext(this.getContext(o)), c = rd(s.font);
			if (i = this.getDistanceFromCenterForValue(this.ticks[o].value), s.showLabelBackdrop) {
				e.font = c.string, a = e.measureText(r.label).width, e.fillStyle = s.backdropColor;
				let t = nd(s.backdropPadding);
				e.fillRect(-a / 2 - t.left, -i - c.size / 2 - t.top, a + t.width, c.size + t.height);
			}
			qu(e, r.label, 0, -i, c, {
				color: s.color,
				strokeColor: s.textStrokeColor,
				strokeWidth: s.textStrokeWidth
			});
		}), e.restore();
	}
	drawTitle() {}
}, N_ = {
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
}, P_ = /* #__PURE__ */ Object.keys(N_);
function F_(e, t) {
	return e - t;
}
function I_(e, t) {
	if (z(t)) return null;
	let n = e._adapter, { parser: r, round: i, isoWeekday: a } = e._parseOpts, o = t;
	return typeof r == "function" && (o = r(o)), H(o) || (o = typeof r == "string" ? n.parse(o, r) : n.parse(o)), o === null ? null : (i && (o = i === "week" && (Pl(a) || a === !0) ? n.startOf(o, "isoWeek", a) : n.startOf(o, i)), +o);
}
function L_(e, t, n, r) {
	let i = P_.length;
	for (let a = P_.indexOf(e); a < i - 1; ++a) {
		let e = N_[P_[a]], i = e.steps ? e.steps : 2 ** 53 - 1;
		if (e.common && Math.ceil((n - t) / (i * e.size)) <= r) return P_[a];
	}
	return P_[i - 1];
}
function R_(e, t, n, r, i) {
	for (let a = P_.length - 1; a >= P_.indexOf(n); a--) {
		let n = P_[a];
		if (N_[n].common && e._adapter.diff(i, r, n) >= t - 1) return n;
	}
	return P_[n ? P_.indexOf(n) : 0];
}
function z_(e) {
	for (let t = P_.indexOf(e) + 1, n = P_.length; t < n; ++t) if (N_[P_[t]].common) return P_[t];
}
function B_(e, t, n) {
	if (!n) e[t] = !0;
	else if (n.length) {
		let { lo: r, hi: i } = Jl(n, t), a = n[r] >= t ? n[r] : n[i];
		e[a] = !0;
	}
}
function V_(e, t, n, r) {
	let i = e._adapter, a = +i.startOf(t[0].value, r), o = t[t.length - 1].value, s, c;
	for (s = a; s <= o; s = +i.add(s, 1, r)) c = n[s], c >= 0 && (t[c].major = !0);
	return t;
}
function H_(e, t, n) {
	let r = [], i = {}, a = t.length, o, s;
	for (o = 0; o < a; ++o) s = t[o], i[s] = o, r.push({
		value: s,
		major: !1
	});
	return a === 0 || !n ? r : V_(e, r, i, n);
}
var U_ = class extends Fm {
	static id = "time";
	static defaults = {
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
			major: { enabled: !1 }
		}
	};
	constructor(e) {
		super(e), this._cache = {
			data: [],
			labels: [],
			all: []
		}, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
	}
	init(e, t = {}) {
		let n = e.time ||= {}, r = this._adapter = new yp._date(e.adapters.date);
		r.init(t), dl(n.displayFormats, r.formats()), this._parseOpts = {
			parser: n.parser,
			round: n.round,
			isoWeekday: n.isoWeekday
		}, super.init(e), this._normalized = t.normalized;
	}
	parse(e, t) {
		return e === void 0 ? null : I_(this, e);
	}
	beforeLayout() {
		super.beforeLayout(), this._cache = {
			data: [],
			labels: [],
			all: []
		};
	}
	determineDataLimits() {
		let e = this.options, t = this._adapter, n = e.time.unit || "day", { min: r, max: i, minDefined: a, maxDefined: o } = this.getUserBounds();
		function s(e) {
			!a && !isNaN(e.min) && (r = Math.min(r, e.min)), !o && !isNaN(e.max) && (i = Math.max(i, e.max));
		}
		(!a || !o) && (s(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && s(this.getMinMax(!1))), r = H(r) && !isNaN(r) ? r : +t.startOf(Date.now(), n), i = H(i) && !isNaN(i) ? i : +t.endOf(Date.now(), n) + 1, this.min = Math.min(r, i - 1), this.max = Math.max(r + 1, i);
	}
	_getLabelBounds() {
		let e = this.getLabelTimestamps(), t = Infinity, n = -Infinity;
		return e.length && (t = e[0], n = e[e.length - 1]), {
			min: t,
			max: n
		};
	}
	buildTicks() {
		let e = this.options, t = e.time, n = e.ticks, r = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
		e.bounds === "ticks" && r.length && (this.min = this._userMin || r[0], this.max = this._userMax || r[r.length - 1]);
		let i = this.min, a = this.max, o = Zl(r, i, a);
		return this._unit = t.unit || (n.autoSkip ? L_(t.minUnit, this.min, this.max, this._getLabelCapacity(i)) : R_(this, o.length, t.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : z_(this._unit), this.initOffsets(r), e.reverse && o.reverse(), H_(this, o, this._majorUnit);
	}
	afterAutoSkip() {
		this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((e) => +e.value));
	}
	initOffsets(e = []) {
		let t = 0, n = 0, r, i;
		this.options.offset && e.length && (r = this.getDecimalForValue(e[0]), t = e.length === 1 ? 1 - r : (this.getDecimalForValue(e[1]) - r) / 2, i = this.getDecimalForValue(e[e.length - 1]), n = e.length === 1 ? i : (i - this.getDecimalForValue(e[e.length - 2])) / 2);
		let a = e.length < 3 ? .5 : .25;
		t = Gl(t, 0, a), n = Gl(n, 0, a), this._offsets = {
			start: t,
			end: n,
			factor: 1 / (t + 1 + n)
		};
	}
	_generate() {
		let e = this._adapter, t = this.min, n = this.max, r = this.options, i = r.time, a = i.unit || L_(i.minUnit, t, n, this._getLabelCapacity(t)), o = U(r.ticks.stepSize, 1), s = a === "week" ? i.isoWeekday : !1, c = Pl(s) || s === !0, l = {}, u = t, d, f;
		if (c && (u = +e.startOf(u, "isoWeek", s)), u = +e.startOf(u, c ? "day" : a), e.diff(n, t, a) > 1e5 * o) throw Error(t + " and " + n + " are too far apart with stepSize of " + o + " " + a);
		let p = r.ticks.source === "data" && this.getDataTimestamps();
		for (d = u, f = 0; d < n; d = +e.add(d, o, a), f++) B_(l, d, p);
		return (d === n || r.bounds === "ticks" || f === 1) && B_(l, d, p), Object.keys(l).sort(F_).map((e) => +e);
	}
	getLabelForValue(e) {
		let t = this._adapter, n = this.options.time;
		return n.tooltipFormat ? t.format(e, n.tooltipFormat) : t.format(e, n.displayFormats.datetime);
	}
	format(e, t) {
		let n = this.options.time.displayFormats, r = this._unit, i = t || n[r];
		return this._adapter.format(e, i);
	}
	_tickFormatFunction(e, t, n, r) {
		let i = this.options, a = i.ticks.callback;
		if (a) return W(a, [
			e,
			t,
			n
		], this);
		let o = i.time.displayFormats, s = this._unit, c = this._majorUnit, l = s && o[s], u = c && o[c], d = n[t], f = c && u && d && d.major;
		return this._adapter.format(e, r || (f ? u : l));
	}
	generateTickLabels(e) {
		let t, n, r;
		for (t = 0, n = e.length; t < n; ++t) r = e[t], r.label = this._tickFormatFunction(r.value, t, e);
	}
	getDecimalForValue(e) {
		return e === null ? NaN : (e - this.min) / (this.max - this.min);
	}
	getPixelForValue(e) {
		let t = this._offsets, n = this.getDecimalForValue(e);
		return this.getPixelForDecimal((t.start + n) * t.factor);
	}
	getValueForPixel(e) {
		let t = this._offsets, n = this.getDecimalForPixel(e) / t.factor - t.end;
		return this.min + n * (this.max - this.min);
	}
	_getLabelSize(e) {
		let t = this.options.ticks, n = this.ctx.measureText(e).width, r = Ll(this.isHorizontal() ? t.maxRotation : t.minRotation), i = Math.cos(r), a = Math.sin(r), o = this._resolveTickFontOptions(0).size;
		return {
			w: n * i + o * a,
			h: n * a + o * i
		};
	}
	_getLabelCapacity(e) {
		let t = this.options.time, n = t.displayFormats, r = n[t.unit] || n.millisecond, i = this._tickFormatFunction(e, 0, H_(this, [e], this._majorUnit), r), a = this._getLabelSize(i), o = Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) - 1;
		return o > 0 ? o : 1;
	}
	getDataTimestamps() {
		let e = this._cache.data || [], t, n;
		if (e.length) return e;
		let r = this.getMatchingVisibleMetas();
		if (this._normalized && r.length) return this._cache.data = r[0].controller.getAllParsedValues(this);
		for (t = 0, n = r.length; t < n; ++t) e = e.concat(r[t].controller.getAllParsedValues(this));
		return this._cache.data = this.normalize(e);
	}
	getLabelTimestamps() {
		let e = this._cache.labels || [], t, n;
		if (e.length) return e;
		let r = this.getLabels();
		for (t = 0, n = r.length; t < n; ++t) e.push(I_(this, r[t]));
		return this._cache.labels = this._normalized ? e : this.normalize(e);
	}
	normalize(e) {
		return tu(e.sort(F_));
	}
};
function W_(e, t, n) {
	let r = 0, i = e.length - 1, a, o, s, c;
	n ? (t >= e[r].pos && t <= e[i].pos && ({lo: r, hi: i} = Yl(e, "pos", t)), {pos: a, time: s} = e[r], {pos: o, time: c} = e[i]) : (t >= e[r].time && t <= e[i].time && ({lo: r, hi: i} = Yl(e, "time", t)), {time: a, pos: s} = e[r], {time: o, pos: c} = e[i]);
	let l = o - a;
	return l ? s + (c - s) * (t - a) / l : s;
}
(class extends U_ {
	static id = "timeseries";
	static defaults = U_.defaults;
	constructor(e) {
		super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
	}
	initOffsets() {
		let e = this._getTimestampsForTable(), t = this._table = this.buildLookupTable(e);
		this._minPos = W_(t, this.min), this._tableRange = W_(t, this.max) - this._minPos, super.initOffsets(e);
	}
	buildLookupTable(e) {
		let { min: t, max: n } = this, r = [], i = [], a, o, s, c, l;
		for (a = 0, o = e.length; a < o; ++a) c = e[a], c >= t && c <= n && r.push(c);
		if (r.length < 2) return [{
			time: t,
			pos: 0
		}, {
			time: n,
			pos: 1
		}];
		for (a = 0, o = r.length; a < o; ++a) l = r[a + 1], s = r[a - 1], c = r[a], Math.round((l + s) / 2) !== c && i.push({
			time: c,
			pos: a / (o - 1)
		});
		return i;
	}
	_generate() {
		let e = this.min, t = this.max, n = super.getDataTimestamps();
		return (!n.includes(e) || !n.length) && n.splice(0, 0, e), (!n.includes(t) || n.length === 1) && n.push(t), n.sort((e, t) => e - t);
	}
	_getTimestampsForTable() {
		let e = this._cache.all || [];
		if (e.length) return e;
		let t = this.getDataTimestamps(), n = this.getLabelTimestamps();
		return e = t.length && n.length ? this.normalize(t.concat(n)) : t.length ? t : n, e = this._cache.all = e, e;
	}
	getDecimalForValue(e) {
		return (W_(this._table, e) - this._minPos) / this._tableRange;
	}
	getValueForPixel(e) {
		let t = this._offsets, n = this.getDecimalForPixel(e) / t.factor - t.end;
		return W_(this._table, n * this._tableRange + this._minPos, !0);
	}
});
//#endregion
//#region src/utils/constants.js
var G_ = [
	{
		department: "Ain",
		department_value: "01",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Lyon",
		academy_value: "LYON"
	},
	{
		department: "Aisne",
		department_value: "02",
		region: "Hauts-de-France",
		region_value: "HDF",
		academy: "Académie d’Amiens",
		academy_value: "AMIENS"
	},
	{
		department: "Allier",
		department_value: "03",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Clermont-Ferrand",
		academy_value: "CLERMONT-FERRAND"
	},
	{
		department: "Alpes de Haute-Provence",
		department_value: "04",
		region: "Provence-Alpes-Côte d’Azur",
		region_value: "PAC",
		academy: "Académie d’Aix-Marseille",
		academy_value: "AIX-MARSEILLE"
	},
	{
		department: "Hautes-Alpes",
		department_value: "05",
		region: "Provence-Alpes-Côte d’Azur",
		region_value: "PAC",
		academy: "Académie d’Aix-Marseille",
		academy_value: "AIX-MARSEILLE"
	},
	{
		department: "Alpes-Maritimes",
		department_value: "06",
		region: "Provence-Alpes-Côte d’Azur",
		region_value: "PAC",
		academy: "Académie de Nice",
		academy_value: "NICE"
	},
	{
		department: "Ardèche",
		department_value: "07",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Grenoble",
		academy_value: "GRENOBLE"
	},
	{
		department: "Ardennes",
		department_value: "08",
		region: "Grand Est",
		region_value: "GES",
		academy: "Académie de Reims",
		academy_value: "REIMS"
	},
	{
		department: "Ariège",
		department_value: "09",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Toulouse",
		academy_value: "TOULOUSE"
	},
	{
		department: "Aube",
		department_value: "10",
		region: "Grand Est",
		region_value: "GES",
		academy: "Académie de Reims",
		academy_value: "REIMS"
	},
	{
		department: "Aude",
		department_value: "11",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Montpellier",
		academy_value: "MONTPELLIER"
	},
	{
		department: "Aveyron",
		department_value: "12",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Toulouse",
		academy_value: "TOULOUSE"
	},
	{
		department: "Bouches-du-Rhône",
		department_value: "13",
		region: "Provence-Alpes-Côte d’Azur",
		region_value: "PAC",
		academy: "Académie d’Aix-Marseille",
		academy_value: "AIX-MARSEILLE"
	},
	{
		department: "Calvados",
		department_value: "14",
		region: "Normandie",
		region_value: "NOR",
		academy: "Académie de Normandie",
		academy_value: "NORMANDIE"
	},
	{
		department: "Cantal",
		department_value: "15",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Clermont-Ferrand",
		academy_value: "CLERMONT-FERRAND"
	},
	{
		department: "Charente",
		department_value: "16",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Poitiers",
		academy_value: "POITIERS"
	},
	{
		department: "Charente-Maritime",
		department_value: "17",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Poitiers",
		academy_value: "POITIERS"
	},
	{
		department: "Cher",
		department_value: "18",
		region: "Centre-Val de Loire",
		region_value: "CVL",
		academy: "Académie d’Orléans-Tours",
		academy_value: "ORLEANS-TOURS"
	},
	{
		department: "Corrèze",
		department_value: "19",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Limoges",
		academy_value: "LIMOGES"
	},
	{
		department: "Corse-du-Sud",
		department_value: "2A",
		region: "Corse",
		region_value: "20R",
		academy: "Académie de Corse",
		academy_value: "CORSE"
	},
	{
		department: "Haute-Corse",
		department_value: "2B",
		region: "Corse",
		region_value: "20R",
		academy: "Académie de Corse",
		academy_value: "CORSE"
	},
	{
		department: "Côte-d’Or",
		department_value: "21",
		region: "Bourgogne-Franche-Comté",
		region_value: "BFC",
		academy: "Académie de Dijon",
		academy_value: "DIJON"
	},
	{
		department: "Côtes d’Armor",
		department_value: "22",
		region: "Bretagne",
		region_value: "BRE",
		academy: "Académie de Rennes",
		academy_value: "RENNES"
	},
	{
		department: "Creuse",
		department_value: "23",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Limoges",
		academy_value: "LIMOGES"
	},
	{
		department: "Dordogne",
		department_value: "24",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Bordeaux",
		academy_value: "BORDEAUX"
	},
	{
		department: "Doubs",
		department_value: "25",
		region: "Bourgogne-Franche-Comté",
		region_value: "BFC",
		academy: "Académie de Besançon",
		academy_value: "BESANCON"
	},
	{
		department: "Drôme",
		department_value: "26",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Grenoble",
		academy_value: "GRENOBLE"
	},
	{
		department: "Eure",
		department_value: "27",
		region: "Normandie",
		region_value: "NOR",
		academy: "Académie de Normandie",
		academy_value: "NORMANDIE"
	},
	{
		department: "Eure-et-Loir",
		department_value: "28",
		region: "Centre-Val de Loire",
		region_value: "CVL",
		academy: "Académie d’Orléans-Tours",
		academy_value: "ORLEANS-TOURS"
	},
	{
		department: "Finistère",
		department_value: "29",
		region: "Bretagne",
		region_value: "BRE",
		academy: "Académie de Rennes",
		academy_value: "RENNES"
	},
	{
		department: "Gard",
		department_value: "30",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Montpellier",
		academy_value: "MONTPELLIER"
	},
	{
		department: "Haute-Garonne",
		department_value: "31",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Toulouse",
		academy_value: "TOULOUSE"
	},
	{
		department: "Gers",
		department_value: "32",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Toulouse",
		academy_value: "TOULOUSE"
	},
	{
		department: "Gironde",
		department_value: "33",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Bordeaux",
		academy_value: "BORDEAUX"
	},
	{
		department: "Hérault",
		department_value: "34",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Montpellier",
		academy_value: "MONTPELLIER"
	},
	{
		department: "Ille-et-Vilaine",
		department_value: "35",
		region: "Bretagne",
		region_value: "BRE",
		academy: "Académie de Rennes",
		academy_value: "RENNES"
	},
	{
		department: "Indre",
		department_value: "36",
		region: "Centre-Val de Loire",
		region_value: "CVL",
		academy: "Académie d’Orléans-Tours",
		academy_value: "ORLEANS-TOURS"
	},
	{
		department: "Indre-et-Loire",
		department_value: "37",
		region: "Centre-Val de Loire",
		region_value: "CVL",
		academy: "Académie d’Orléans-Tours",
		academy_value: "ORLEANS-TOURS"
	},
	{
		department: "Isère",
		department_value: "38",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Grenoble",
		academy_value: "GRENOBLE"
	},
	{
		department: "Jura",
		department_value: "39",
		region: "Bourgogne-Franche-Comté",
		region_value: "BFC",
		academy: "Académie de Besançon",
		academy_value: "BESANCON"
	},
	{
		department: "Landes",
		department_value: "40",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Bordeaux",
		academy_value: "BORDEAUX"
	},
	{
		department: "Loir-et-Cher",
		department_value: "41",
		region: "Centre-Val de Loire",
		region_value: "CVL",
		academy: "Académie d’Orléans-Tours",
		academy_value: "ORLEANS-TOURS"
	},
	{
		department: "Loire",
		department_value: "42",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Lyon",
		academy_value: "LYON"
	},
	{
		department: "Haute-Loire",
		department_value: "43",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Clermont-Ferrand",
		academy_value: "CLERMONT-FERRAND"
	},
	{
		department: "Loire-Atlantique",
		department_value: "44",
		region: "Pays de la Loire",
		region_value: "PDL",
		academy: "Académie de Nantes",
		academy_value: "NANTES"
	},
	{
		department: "Loiret",
		department_value: "45",
		region: "Centre-Val de Loire",
		region_value: "CVL",
		academy: "Académie d’Orléans-Tours",
		academy_value: "ORLEANS-TOURS"
	},
	{
		department: "Lot",
		department_value: "46",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Toulouse",
		academy_value: "TOULOUSE"
	},
	{
		department: "Lot-et-Garonne",
		department_value: "47",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Bordeaux",
		academy_value: "BORDEAUX"
	},
	{
		department: "Lozère",
		department_value: "48",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Montpellier",
		academy_value: "MONTPELLIER"
	},
	{
		department: "Maine-et-Loire",
		department_value: "49",
		region: "Pays de la Loire",
		region_value: "PDL",
		academy: "Académie de Nantes",
		academy_value: "NANTES"
	},
	{
		department: "Manche",
		department_value: "50",
		region: "Normandie",
		region_value: "NOR",
		academy: "Académie de Normandie",
		academy_value: "NORMANDIE"
	},
	{
		department: "Marne",
		department_value: "51",
		region: "Grand Est",
		region_value: "GES",
		academy: "Académie de Reims",
		academy_value: "REIMS"
	},
	{
		department: "Haute-Marne",
		department_value: "52",
		region: "Grand Est",
		region_value: "GES",
		academy: "Académie de Reims",
		academy_value: "REIMS"
	},
	{
		department: "Mayenne",
		department_value: "53",
		region: "Pays de la Loire",
		region_value: "PDL",
		academy: "Académie de Nantes",
		academy_value: "NANTES"
	},
	{
		department: "Meurthe-et-Moselle",
		department_value: "54",
		region: "Grand Est",
		region_value: "GES",
		academy: "Académie de Nancy-Metz",
		academy_value: "NANCY-METZ"
	},
	{
		department: "Meuse",
		department_value: "55",
		region: "Grand Est",
		region_value: "GES",
		academy: "Académie de Nancy-Metz",
		academy_value: "NANCY-METZ"
	},
	{
		department: "Morbihan",
		department_value: "56",
		region: "Bretagne",
		region_value: "BRE",
		academy: "Académie de Rennes",
		academy_value: "RENNES"
	},
	{
		department: "Moselle",
		department_value: "57",
		region: "Grand Est",
		region_value: "GES",
		academy: "Académie de Nancy-Metz",
		academy_value: "NANCY-METZ"
	},
	{
		department: "Nièvre",
		department_value: "58",
		region: "Bourgogne-Franche-Comté",
		region_value: "BFC",
		academy: "Académie de Dijon",
		academy_value: "DIJON"
	},
	{
		department: "Nord",
		department_value: "59",
		region: "Hauts-de-France",
		region_value: "HDF",
		academy: "Académie de Lille",
		academy_value: "LILLE"
	},
	{
		department: "Oise",
		department_value: "60",
		region: "Hauts-de-France",
		region_value: "HDF",
		academy: "Académie d’Amiens",
		academy_value: "AMIENS"
	},
	{
		department: "Orne",
		department_value: "61",
		region: "Normandie",
		region_value: "NOR",
		academy: "Académie de Normandie",
		academy_value: "NORMANDIE"
	},
	{
		department: "Pas-de-Calais",
		department_value: "62",
		region: "Hauts-de-France",
		region_value: "HDF",
		academy: "Académie de Lille",
		academy_value: "LILLE"
	},
	{
		department: "Puy-de-Dôme",
		department_value: "63",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Clermont-Ferrand",
		academy_value: "CLERMONT-FERRAND"
	},
	{
		department: "Pyrénées-Atlantiques",
		department_value: "64",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Bordeaux",
		academy_value: "BORDEAUX"
	},
	{
		department: "Hautes-Pyrénées",
		department_value: "65",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Toulouse",
		academy_value: "TOULOUSE"
	},
	{
		department: "Pyrénées-Orientales",
		department_value: "66",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Montpellier",
		academy_value: "MONTPELLIER"
	},
	{
		department: "Bas-Rhin",
		department_value: "67",
		region: "Grand Est",
		region_value: "GES",
		academy: "Académie de Strasbourg",
		academy_value: "STRASBOURG"
	},
	{
		department: "Haut-Rhin",
		department_value: "68",
		region: "Grand Est",
		region_value: "GES",
		academy: "Académie de Strasbourg",
		academy_value: "STRASBOURG"
	},
	{
		department: "Rhône",
		department_value: "69",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Lyon",
		academy_value: "LYON"
	},
	{
		department: "Haute-Saône",
		department_value: "70",
		region: "Bourgogne-Franche-Comté",
		region_value: "BFC",
		academy: "Académie de Besançon",
		academy_value: "BESANCON"
	},
	{
		department: "Saône-et-Loire",
		department_value: "71",
		region: "Bourgogne-Franche-Comté",
		region_value: "BFC",
		academy: "Académie de Dijon",
		academy_value: "DIJON"
	},
	{
		department: "Sarthe",
		department_value: "72",
		region: "Pays de la Loire",
		region_value: "PDL",
		academy: "Académie de Nantes",
		academy_value: "NANTES"
	},
	{
		department: "Savoie",
		department_value: "73",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Grenoble",
		academy_value: "GRENOBLE"
	},
	{
		department: "Haute-Savoie",
		department_value: "74",
		region: "Auvergne-Rhône-Alpes",
		region_value: "ARA",
		academy: "Académie de Grenoble",
		academy_value: "GRENOBLE"
	},
	{
		department: "Paris",
		department_value: "75",
		region: "Île-de-France",
		region_value: "IDF",
		academy: "Académie de Paris",
		academy_value: "PARIS"
	},
	{
		department: "Seine-Maritime",
		department_value: "76",
		region: "Normandie",
		region_value: "NOR",
		academy: "Académie de Normandie",
		academy_value: "NORMANDIE"
	},
	{
		department: "Seine-et-Marne",
		department_value: "77",
		region: "Île-de-France",
		region_value: "IDF",
		academy: "Académie de Créteil",
		academy_value: "CRETEIL"
	},
	{
		department: "Yvelines",
		department_value: "78",
		region: "Île-de-France",
		region_value: "IDF",
		academy: "Académie de Versailles",
		academy_value: "VERSAILLES"
	},
	{
		department: "Deux-Sèvres",
		department_value: "79",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Poitiers",
		academy_value: "POITIERS"
	},
	{
		department: "Somme",
		department_value: "80",
		region: "Hauts-de-France",
		region_value: "HDF",
		academy: "Académie d’Amiens",
		academy_value: "AMIENS"
	},
	{
		department: "Tarn",
		department_value: "81",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Toulouse",
		academy_value: "TOULOUSE"
	},
	{
		department: "Tarn-et-Garonne",
		department_value: "82",
		region: "Occitanie",
		region_value: "OCC",
		academy: "Académie de Toulouse",
		academy_value: "TOULOUSE"
	},
	{
		department: "Var",
		department_value: "83",
		region: "Provence-Alpes-Côte d’Azur",
		region_value: "PAC",
		academy: "Académie de Nice",
		academy_value: "NICE"
	},
	{
		department: "Vaucluse",
		department_value: "84",
		region: "Provence-Alpes-Côte d’Azur",
		region_value: "PAC",
		academy: "Académie d’Aix-Marseille",
		academy_value: "AIX-MARSEILLE"
	},
	{
		department: "Vendée",
		department_value: "85",
		region: "Pays de la Loire",
		region_value: "PDL",
		academy: "Académie de Nantes",
		academy_value: "NANTES"
	},
	{
		department: "Vienne",
		department_value: "86",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Poitiers",
		academy_value: "POITIERS"
	},
	{
		department: "Haute-Vienne",
		department_value: "87",
		region: "Nouvelle-Aquitaine",
		region_value: "NAQ",
		academy: "Académie de Limoges",
		academy_value: "LIMOGES"
	},
	{
		department: "Vosges",
		department_value: "88",
		region: "Grand Est",
		region_value: "GES",
		academy: "Académie de Nancy-Metz",
		academy_value: "NANCY-METZ"
	},
	{
		department: "Yonne",
		department_value: "89",
		region: "Bourgogne-Franche-Comté",
		region_value: "BFC",
		academy: "Académie de Dijon",
		academy_value: "DIJON"
	},
	{
		department: "Territoire-de-Belfort",
		department_value: "90",
		region: "Bourgogne-Franche-Comté",
		region_value: "BFC",
		academy: "Académie de Besançon",
		academy_value: "BESANCON"
	},
	{
		department: "Essonne",
		department_value: "91",
		region: "Île-de-France",
		region_value: "IDF",
		academy: "Académie de Versailles",
		academy_value: "VERSAILLES"
	},
	{
		department: "Hauts-de-Seine",
		department_value: "92",
		region: "Île-de-France",
		region_value: "IDF",
		academy: "Académie de Versailles",
		academy_value: "VERSAILLES"
	},
	{
		department: "Seine-Saint-Denis",
		department_value: "93",
		region: "Île-de-France",
		region_value: "IDF",
		academy: "Académie de Créteil",
		academy_value: "CRETEIL"
	},
	{
		department: "Val-de-Marne",
		department_value: "94",
		region: "Île-de-France",
		region_value: "IDF",
		academy: "Académie de Créteil",
		academy_value: "CRETEIL"
	},
	{
		department: "Val-d’Oise",
		department_value: "95",
		region: "Île-de-France",
		region_value: "IDF",
		academy: "Académie de Versailles",
		academy_value: "VERSAILLES"
	},
	{
		department: "Guadeloupe",
		department_value: "971",
		region: "Guadeloupe",
		region_value: "971",
		academy: "Académie de Guadeloupe",
		academy_value: "GUADELOUPE"
	},
	{
		department: "Martinique",
		department_value: "972",
		region: "Martinique",
		region_value: "972",
		academy: "Académie de Martinique",
		academy_value: "MARTINIQUE"
	},
	{
		department: "Guyane française",
		department_value: "973",
		region: "Guyane",
		region_value: "973",
		academy: "Académie de Guyane",
		academy_value: "GUYANE"
	},
	{
		department: "La Réunion",
		department_value: "974",
		region: "La Réunion",
		region_value: "974",
		academy: "Académie de La Réunion",
		academy_value: "REUNION"
	},
	{
		department: "Mayotte",
		department_value: "976",
		region: "Mayotte",
		region_value: "976",
		academy: "Académie de Mayotte",
		academy_value: "MAYOTTE"
	}
], K_ = [
	{
		country: "Émirats arabes unis",
		country_value: "AE",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Afghanistan",
		country_value: "AF",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Albanie",
		country_value: "AL",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Arménie",
		country_value: "AM",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Angola",
		country_value: "AO",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Argentine",
		country_value: "AR",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Autriche",
		country_value: "AT",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Australie",
		country_value: "AU",
		continent: "Océanie",
		continent_value: "OC"
	},
	{
		country: "Azerbaïdjan",
		country_value: "AZ",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Bosnie-Herzégovine",
		country_value: "BA",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Bangladesh",
		country_value: "BD",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Belgique",
		country_value: "BE",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Burkina Faso",
		country_value: "BF",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Bulgarie",
		country_value: "BG",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Burundi",
		country_value: "BI",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Bénin",
		country_value: "BJ",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Brunéi Darussalam",
		country_value: "BN",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Bolivie",
		country_value: "BO",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Brésil",
		country_value: "BR",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Bahamas",
		country_value: "BS",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Bhoutan",
		country_value: "BT",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Botswana",
		country_value: "BW",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Biélorussie",
		country_value: "BY",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Belize",
		country_value: "BZ",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Canada",
		country_value: "CA",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "République démocratique du Congo",
		country_value: "CD",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "République centrafricaine",
		country_value: "CF",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "République du Congo",
		country_value: "CG",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Suisse",
		country_value: "CH",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Côte d’Ivoire",
		country_value: "CI",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Chili",
		country_value: "CL",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Cameroun",
		country_value: "CM",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Chine",
		country_value: "CN",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Colombie",
		country_value: "CO",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Costa Rica",
		country_value: "CR",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Cuba",
		country_value: "CU",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Chypre",
		country_value: "CY",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Tchéquie",
		country_value: "CZ",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Allemagne",
		country_value: "DE",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Djibouti",
		country_value: "DJ",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Danemark",
		country_value: "DK",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "République dominicaine",
		country_value: "DO",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Algérie",
		country_value: "DZ",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Équateur",
		country_value: "EC",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Estonie",
		country_value: "EE",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Égypte",
		country_value: "EG",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Sahara occidental",
		country_value: "EH",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Érythrée",
		country_value: "ER",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Espagne",
		country_value: "ES",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Éthiopie",
		country_value: "ET",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Finlande",
		country_value: "FI",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Fidji",
		country_value: "FJ",
		continent: "Océanie",
		continent_value: "OC"
	},
	{
		country: "Falkland",
		country_value: "FK",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "France",
		country_value: "FR",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Gabon",
		country_value: "GA",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Royaume-Uni",
		country_value: "GB",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Groenland",
		country_value: "GL",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Géorgie",
		country_value: "GE",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Guyane française",
		country_value: "GF",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Ghana",
		country_value: "GH",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Gambie",
		country_value: "GM",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Guinée",
		country_value: "GN",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Guinée équatoriale",
		country_value: "GQ",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Grèce",
		country_value: "GR",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Guatemala",
		country_value: "GT",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Guinée-Bissau",
		country_value: "GW",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Guyana",
		country_value: "GY",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Honduras",
		country_value: "HN",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Croatie",
		country_value: "HR",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Haïti",
		country_value: "HT",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Hongrie",
		country_value: "HU",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Indonésie",
		country_value: "ID",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Irlande",
		country_value: "IE",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Israël",
		country_value: "IL",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Inde",
		country_value: "IN",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Iraq",
		country_value: "IQ",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Iran",
		country_value: "IR",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Islande",
		country_value: "IS",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Italie",
		country_value: "IT",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Jamaïque",
		country_value: "JM",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Jordanie",
		country_value: "JO",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Japon",
		country_value: "JP",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Kenya",
		country_value: "KE",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Kirghizistan",
		country_value: "KG",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Cambodge",
		country_value: "KH",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Corée du Nord",
		country_value: "KP",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Corée du Sud",
		country_value: "KR",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Koweït",
		country_value: "KW",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Kazakhstan",
		country_value: "KZ",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Laos",
		country_value: "LA",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Liban",
		country_value: "LB",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Sri Lanka",
		country_value: "LK",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Libéria",
		country_value: "LR",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Lesotho",
		country_value: "LS",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Lituanie",
		country_value: "LT",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Luxembourg",
		country_value: "LU",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Lettonie",
		country_value: "LV",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Libye",
		country_value: "LY",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Maroc",
		country_value: "MA",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Moldavie",
		country_value: "MD",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Monténégro",
		country_value: "ME",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Madagascar",
		country_value: "MG",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Macédoine du Nord",
		country_value: "MK",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Mali",
		country_value: "ML",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Myanmar",
		country_value: "MM",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Mongolie",
		country_value: "MN",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Mauritanie",
		country_value: "MR",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Malawi",
		country_value: "MW",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Mexique",
		country_value: "MX",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Malaisie",
		country_value: "MY",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Mozambique",
		country_value: "MZ",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Namibie",
		country_value: "NA",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Nouvelle-Calédonie",
		country_value: "NC",
		continent: "Océanie",
		continent_value: "OC"
	},
	{
		country: "Niger",
		country_value: "NE",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Nigéria",
		country_value: "NG",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Nicaragua",
		country_value: "NI",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Pays-Bas",
		country_value: "NL",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Norvège",
		country_value: "NO",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Népal",
		country_value: "NP",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Nouvelle-Zélande",
		country_value: "NZ",
		continent: "Océanie",
		continent_value: "OC"
	},
	{
		country: "Oman",
		country_value: "OM",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Panama",
		country_value: "PA",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Pérou",
		country_value: "PE",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Papouasie-Nouvelle-Guinée",
		country_value: "PG",
		continent: "Océanie",
		continent_value: "OC"
	},
	{
		country: "Philippines",
		country_value: "PH",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Pakistan",
		country_value: "PK",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Pologne",
		country_value: "PL",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Porto Rico",
		country_value: "PR",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Palestine",
		country_value: "PS",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Portugal",
		country_value: "PT",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Paraguay",
		country_value: "PY",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Qatar",
		country_value: "QA",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Roumanie",
		country_value: "RO",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Serbie",
		country_value: "RS",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Russie",
		country_value: "RU",
		continent: "Europe",
		continent_value: "RU"
	},
	{
		country: "Rwanda",
		country_value: "RW",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Arabie saoudite",
		country_value: "SA",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Îles Salomon",
		country_value: "SB",
		continent: "Océanie",
		continent_value: "OC"
	},
	{
		country: "Soudan",
		country_value: "SD",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Suède",
		country_value: "SE",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Slovénie",
		country_value: "SI",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Svalbard et l’Île Jan Mayen",
		country_value: "SJ",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Slovaquie",
		country_value: "SK",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Sierra Leone",
		country_value: "SL",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Sénégal",
		country_value: "SN",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Somalie",
		country_value: "SO",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Suriname",
		country_value: "SR",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Soudan du Sud",
		country_value: "SS",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "El Salvador",
		country_value: "SV",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "République arabe syrienne",
		country_value: "SY",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Eswatini",
		country_value: "SZ",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Tchad",
		country_value: "TD",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Terres australes françaises",
		country_value: "TF",
		continent: "Antarctique",
		continent_value: "AN"
	},
	{
		country: "Togo",
		country_value: "TG",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Thaïlande",
		country_value: "TH",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Tadjikistan",
		country_value: "TJ",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Timor-Leste",
		country_value: "TL",
		continent: "Océanie",
		continent_value: "OC"
	},
	{
		country: "Turkménistan",
		country_value: "TM",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Tunisie",
		country_value: "TN",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Turquie",
		country_value: "TR",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Trinité-et-Tobago",
		country_value: "TT",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Taïwan",
		country_value: "TW",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Tanzanie",
		country_value: "TZ",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Ukraine",
		country_value: "UA",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Ouganda",
		country_value: "UG",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "États-Unis d’Amérique",
		country_value: "US",
		continent: "Amérique du Nord",
		continent_value: "NA"
	},
	{
		country: "Uruguay",
		country_value: "UY",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Ouzbékistan",
		country_value: "UZ",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Venezuela",
		country_value: "VE",
		continent: "Amérique du Sud",
		continent_value: "SA"
	},
	{
		country: "Vietnam",
		country_value: "VN",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Vanuatu",
		country_value: "VU",
		continent: "Océanie",
		continent_value: "OC"
	},
	{
		country: "Kosovo",
		country_value: "XK",
		continent: "Europe",
		continent_value: "EU"
	},
	{
		country: "Yémen",
		country_value: "YE",
		continent: "Asie",
		continent_value: "AS"
	},
	{
		country: "Afrique du Sud",
		country_value: "ZA",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Zambie",
		country_value: "ZM",
		continent: "Afrique",
		continent_value: "AF"
	},
	{
		country: "Zimbabwe",
		country_value: "ZW",
		continent: "Afrique",
		continent_value: "AF"
	}
];
//#endregion
//#region src/utils/global.js
J.register(e_, Pg, l_, a_, qh);
var q_ = (e) => e.charAt(0).toUpperCase() + e.slice(1), J_ = (e) => e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(), Y_ = (e) => e == null || e === "" ? "" : isNaN(e) ? e : Number.isInteger(e) ? parseInt(e).toLocaleString("fr-FR") : parseFloat(e).toLocaleString("fr-FR", { maximumFractionDigits: 2 }), X_ = function() {
	let e = navigator.userAgent || navigator.vendor || window.opera;
	return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4));
}, Z_ = (e) => G_.find((t) => t.department_value === e), Q_ = (e) => G_.find((t) => t.region_value === e), $_ = (e) => G_.find((t) => t.academy_value === e), ev = (e) => K_.find((t) => t.country_value === e), tv = () => G_.map((e) => e.department_value), nv = () => G_.map((e) => e.region_value), rv = () => G_.map((e) => e.academy_value), iv = () => K_.map((e) => e.country_value), av = (e) => G_.filter((t) => t.region_value === e).map((e) => e.department_value), ov = (e) => G_.filter((t) => t.academy_value === e).map((e) => e.department_value), sv = (e) => K_.filter((t) => t.continent_value === e).map((e) => e.country_value), cv = () => {
	J.defaults.font.family = "Marianne", J.defaults.font.size = 12, J.defaults.font.lineHeight = 1.66, J.defaults.color = "#6b6b6b", J.defaults.borderColor = "#cecece";
}, lv = { methods: {
	capitalize: q_,
	formatNumber: Y_
} }, uv = { methods: {
	getDep: Z_,
	getReg: Q_,
	getAca: $_,
	getCountry: ev,
	getAllDep: tv,
	getAllReg: nv,
	getAllAca: rv,
	getAllCountries: iv,
	getDepsFromReg: av,
	getDepsFromAca: ov,
	getCountriesFromContinent: sv
} }, dv = ["id", "aria-labelledby"], fv = { class: "fr-container fr-container--fluid fr-container-md" }, pv = { class: "fr-grid-row fr-grid-row--center" }, mv = { class: "fr-col-12 fr-col-md-8 fr-col-lg-6" }, hv = { class: "fr-modal__body" }, gv = { class: "fr-modal__header" }, _v = ["aria-controls"], vv = { class: "fr-modal__content" }, yv = ["id"], bv = ["innerHTML"], xv = {
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
		return (t, n) => (P(), F("dialog", {
			id: "modal-" + e.id,
			"aria-labelledby": "fr-modal-title-modal-" + e.id,
			role: "dialog",
			class: "fr-modal"
		}, [I("div", fv, [I("div", pv, [I("div", mv, [I("div", hv, [I("div", gv, [I("button", {
			class: "fr-btn--close fr-btn",
			title: "Fermer la fenêtre modale",
			"aria-controls": "modal-" + e.id
		}, " Fermer ", 8, _v)]), I("div", vv, [I("h1", {
			id: "fr-modal-title-modal-" + e.id,
			class: "fr-modal__title"
		}, [n[0] ||= I("span", { class: "fr-icon-arrow-right-line fr-icon--lg" }, null, -1), fa(" " + A(e.modalTitle), 1)], 8, yv), I("div", { innerHTML: e.modalContent }, null, 8, bv)])])])])])], 8, dv));
	}
}, Sv = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Cv = ["id"], wv = { class: "fr-p-2w databox_header" }, Tv = ["aria-describedby", "title"], Ev = ["id"], Dv = {
	key: 0,
	class: "fr-text--xs fr-mb-0 fr-text--bold"
}, Ov = {
	key: 1,
	class: "fr-text--xs fr-mb-0"
}, kv = { key: 2 }, Av = ["aria-controls", "title"], jv = {
	key: 3,
	class: "fr-translate fr-nav more-actions-menu"
}, Mv = { class: "fr-nav__item fr-nav__item--align-right" }, Nv = ["aria-controls"], Pv = ["id"], Fv = { class: "fr-menu__list" }, Iv = { key: 0 }, Lv = { key: 1 }, Rv = [
	"id",
	"data-action",
	"data-id",
	"title"
], zv = { class: "fr-px-2w databox_data" }, Bv = {
	key: 0,
	class: "databox_source"
}, Vv = { class: "fr-select-group" }, Hv = ["for"], Uv = ["id"], Wv = ["value"], Gv = {
	key: 1,
	class: "databox_tendency"
}, Kv = {
	key: 0,
	class: "fr-text--xs fr-m-0"
}, qv = ["aria-label"], Jv = {
	key: 1,
	class: "fr-text--xs fr-m-0"
}, Yv = {
	class: "fr-badge fr-badge--info fr-badge--no-icon fr-badge--sm fr-ml-1v",
	"aria-label": "Valeur stable"
}, Xv = {
	key: 2,
	class: "fr-text--xs fr-m-0"
}, Zv = ["aria-label"], Qv = { class: "fr-p-2w databox_footer" }, $v = { class: "fr-text--xs fr-mb-0" }, ey = {
	key: 0,
	class: "fr-text--xs fr-mb-0"
}, ty = ["href"], ny = { key: 1 }, ry = { class: "fr-segmented__elements" }, iy = { class: "fr-segmented__element" }, ay = ["id", "name"], oy = ["for"], sy = { class: "fr-segmented__element" }, cy = ["id", "name"], ly = ["for"], uy = { class: "fr-p-2w databox_content" }, dy = { class: "fr-mb-0 text-center" }, fy = {
	key: 0,
	class: "fr-display--xs fr-mb-0 databox_value"
}, py = ["aria-hidden"], my = ["id"], hy = ["aria-hidden"], gy = ["id"], _y = ["id"], vy = /*#__PURE__*/ Sv({
	__name: "DataBox",
	props: {
		id: {
			type: String,
			required: !0
		},
		name: {
			type: String,
			required: !0
		},
		headingLevel: {
			type: String,
			default: "h3",
			validator: (e) => [
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6"
			].includes(e)
		},
		description: {
			type: String,
			default: ""
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
		value: {
			type: [Number, String],
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
		linkIa: {
			type: String,
			default: "",
			validator: (e) => e === "" || /^https?:\/\//.test(e)
		},
		textIa: {
			type: String,
			default: ""
		},
		defaultSource: {
			type: String,
			default: null
		},
		trend: {
			type: [Number, String],
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
		let t = e, n = /* @__PURE__ */ Jt([]), r = /* @__PURE__ */ Jt([]), i = /* @__PURE__ */ Jt(null), a = /* @__PURE__ */ Jt("chart");
		br(async () => {
			await bn(), n.value = [...document.querySelectorAll(`[databox-id="${t.id}"][databox-type="chart"]`)].map((e) => e.getAttribute("databox-source") || "default"), r.value = [...document.querySelectorAll(`[databox-id="${t.id}"][databox-type="table"]`)].map((e) => e.getAttribute("databox-source") || "global"), i.value = n.value.includes(t.defaultSource) ? t.defaultSource : n.value[0] || r.value[0], a.value = n.value.length > 0 ? "chart" : "table";
		});
		let o = (e) => e.map((e) => ({
			label: e.charAt(0).toUpperCase() + e.slice(1).replace(/-/g, " "),
			value: e
		})), s = Ba(() => typeof t.value == "number" ? t.value.toString() : t.value), c = Ba(() => typeof t.trend == "number" ? t.trend.toString() : t.trend), l = Ba(() => [
			!0,
			"true",
			""
		].includes(t.segmentedControl)), u = Ba(() => [
			!0,
			"true",
			""
		].includes(t.fullscreen)), d = Ba(() => [
			!0,
			"true",
			""
		].includes(t.screenshot)), f = Ba(() => [
			!0,
			"true",
			""
		].includes(t.download)), p = Ba(() => typeof t.actions == "string" ? JSON.parse(t.actions) : t.actions), m = () => {
			let e, a, o = [];
			if (document.querySelector(`[databox-id="${t.id}"][databox-type="table"]`) ? (e = "table", a = document.querySelector(`[databox-id="${t.id}"][databox-type="table"][databox-source="${i.value}"]`), a ||= document.querySelector(`[databox-id="${t.id}"][databox-type="table"]`)) : (e = "chart", a = document.querySelector(`[databox-id="${t.id}"][databox-type="chart"][databox-source="${i.value}"]`), a ||= document.querySelector(`[databox-id="${t.id}"][databox-type="chart"]`)), e === "chart" && n.value.length > 0) {
				let e = JSON.parse(a.getAttribute("x")), t = JSON.parse(a.getAttribute("y")), n = JSON.parse(a.getAttribute("name"));
				o.push(`Indicateur,${n.join(",")}\n`), e[0].forEach((e, n) => {
					o.push(`${e},${t.map((e) => e[n]).join(",")}\n`);
				});
			} else if (e === "table" && r.value.length > 0) {
				if (a.getAttribute("x") && a.getAttribute("y")) {
					let e = JSON.parse(a.getAttribute("x")), t = JSON.parse(a.getAttribute("y")), n = JSON.parse(a.getAttribute("name")), r = a.getAttribute("table-name") ?? "";
					o.push(`${r},${n.join(",")}\n`), e.forEach((e, n) => {
						o.push(`${e},${t.map((e) => e[n]).join(",")}\n`);
					});
				} else if (a.getAttribute("line")) {
					let e = JSON.parse(a.getAttribute("name")), t = JSON.parse(a.getAttribute("line"));
					o.push(`${e.join(",")}\n`), t.forEach((e) => {
						o.push(`${e.join(",")}\n`);
					});
				}
			} else {
				console.warn("No data available to download.");
				return;
			}
			let s = t.name.replace(/[/|\\:*?"<>]/g, " ").trim(), c = new Blob(o, { type: "text/csv" }), l = window.URL.createObjectURL(c), u = document.createElement("a");
			u.href = l, u.download = (s ?? `data-${t.id}-${i.value}`) + ".csv", u.style.display = "none", u.click(), window.URL.revokeObjectURL(l);
		}, h = () => {
			let e = document.getElementById(`container-${t.id}`), n = e.querySelectorAll(`.screenshot-hide-${t.id}`);
			n.forEach((e) => e.style.display = "none");
			let r = e.querySelector(".databox_data"), a = e.querySelector(`#select-${t.id}`), o = e.querySelector(".databox_tendency");
			r.style.display = "block", a && (a.style.boxShadow = "none", a.style.appearance = "none"), o && (o.style.marginTop = "20px"), lc(e).then((e) => {
				let n = t.name.replace(/[/|\\:*?"<>]/g, " ").trim(), r = document.createElement("a");
				r.href = e, r.download = (n ?? `chart-${t.id}-${i.value}`) + ".png", r.style.display = "none", r.click();
			}).catch((e) => {
				console.error("Erreur lors de la capture d'écran", e);
			}).finally(() => {
				n.forEach((e) => e.style.removeProperty("display")), r.style.removeProperty("display"), a && (a.style.removeProperty("box-shadow"), a.style.removeProperty("appearance")), o && o.style.removeProperty("margin-top");
			});
		};
		return (t, g) => (P(), F("div", {
			id: "container-" + e.id,
			class: "fr-card fr-card--shadow databox"
		}, [
			I("div", wv, [(P(), ia(Mr(e.headingLevel), {
				id: "title-" + e.id,
				class: "fr-h6 fr-mb-0"
			}, {
				default: Mn(() => [fa(A(e.name), 1)]),
				_: 1
			}, 8, ["id"])), I("div", { class: he("flex screenshot-hide-" + e.id) }, [
				e.tooltipTitle || e.tooltipContent ? (P(), F("button", {
					key: 0,
					class: "fr-btn--tooltip fr-btn",
					type: "button",
					"aria-describedby": "tooltip-" + e.id,
					title: "Informations complémentaires sur le graphique " + e.tooltipTitle
				}, " Informations complémentaires sur le graphique ", 8, Tv)) : R("", !0),
				e.tooltipTitle || e.tooltipContent ? (P(), F("div", {
					key: 1,
					id: "tooltip-" + e.id,
					class: "fr-tooltip fr-placement",
					role: "tooltip",
					"aria-hidden": "true"
				}, [e.tooltipTitle ? (P(), F("p", Dv, A(e.tooltipTitle), 1)) : R("", !0), e.tooltipContent ? (P(), F("p", Ov, A(e.tooltipContent), 1)) : R("", !0)], 8, Ev)) : R("", !0),
				u.value && e.modalTitle ? (P(), F("div", kv, [I("button", {
					type: "button",
					class: "fr-btn fr-btn--sm fr-icon-fullscreen-line fr-btn--tertiary-no-outline fr-ratio-1x1",
					"data-fr-opened": "false",
					"aria-controls": "modal-" + e.id,
					title: "Afficher la modale " + e.modalTitle
				}, null, 8, Av), (P(), ia(er, { to: "body" }, [L(xv, {
					id: e.id,
					"modal-title": e.modalTitle,
					"modal-content": e.modalContent
				}, null, 8, [
					"id",
					"modal-title",
					"modal-content"
				])]))])) : R("", !0),
				d.value || f.value || p.value.length > 0 ? (P(), F("div", jv, [I("div", Mv, [I("button", {
					type: "button",
					class: "fr-btn fr-btn--sm fr-icon-more-line fr-btn--tertiary-no-outline fr-ratio-1x1",
					"aria-controls": "translate-" + e.id,
					"aria-expanded": "false",
					title: "Plus d'actions"
				}, null, 8, Nv), I("div", {
					id: "translate-" + e.id,
					class: "fr-collapse fr-translate__menu fr-menu"
				}, [I("ul", Fv, [
					d.value ? (P(), F("li", Iv, [I("button", {
						type: "button",
						class: "fr-translate__language fr-nav__link",
						title: "Prendre une capture d'écran",
						onClick: g[0] ||= (e) => h()
					}, " Capture d'écran ")])) : R("", !0),
					f.value ? (P(), F("li", Lv, [I("button", {
						type: "button",
						class: "fr-translate__language fr-nav__link",
						title: "Télécharger les données en CSV",
						onClick: g[1] ||= (e) => m()
					}, " Télécharger en CSV ")])) : R("", !0),
					(P(!0), F(N, null, Fr(p.value, (t, n) => (P(), F("li", { key: n }, [I("button", {
						id: e.id + "_" + Zt(J_)(t),
						"data-action": Zt(J_)(t),
						"data-id": e.id,
						class: "fr-translate__language fr-nav__link",
						title: t
					}, A(t), 9, Rv)]))), 128))
				])], 8, Pv)])])) : R("", !0)
			], 2)]),
			e.description ? (P(), ia(Mr(/<\w+>/.test(e.description) ? "span" : "p"), {
				key: 0,
				class: he([/<\w+>/.test(e.description) ? "" : "fr-text--xs fr-mb-0", "fr-px-2w"]),
				innerHTML: e.description
			}, null, 8, ["class", "innerHTML"])) : R("", !0),
			I("div", zv, [n.value.length > 1 ? (P(), F("div", Bv, [I("div", Vv, [I("label", {
				class: "fr-label fr-text--xs fr-mb-0",
				for: "select-" + e.id
			}, " Choisir une source de données ", 8, Hv), Nn(I("select", {
				id: "select-" + e.id,
				"onUpdate:modelValue": g[2] ||= (e) => i.value = e,
				name: "select",
				class: "fr-select fr-mt-0"
			}, [(P(!0), F(N, null, Fr(o(n.value), (e) => (P(), F("option", {
				key: e.value,
				value: e.value
			}, A(e.label), 9, Wv))), 128))], 8, Uv), [[No, i.value]])])])) : R("", !0), c.value ? (P(), F("div", Gv, [c.value.includes("-") ? (P(), F("p", Kv, [g[5] ||= fa(" En baisse ", -1), I("span", {
				class: "fr-badge fr-badge--error fr-badge--no-icon fr-badge--sm fr-ml-1v",
				"aria-label": "Baisse de " + c.value.replace("-", "").trim()
			}, [I("span", {
				class: he("fr-pr-1v screenshot-hide-" + e.id),
				"aria-hidden": "true"
			}, " ↘ ", 2), fa(" " + A(c.value.replace("-", "").trim()), 1)], 8, qv)])) : c.value === "0" ? (P(), F("p", Jv, [g[6] ||= fa(" Stable ", -1), I("span", Yv, [I("span", {
				class: he("fr-pr-1v screenshot-hide-" + e.id),
				"aria-hidden": "true"
			}, " ↔ ", 2), fa(" " + A(c.value.trim()), 1)])])) : (P(), F("p", Xv, [g[7] ||= fa(" En hausse ", -1), I("span", {
				class: "fr-badge fr-badge--success fr-badge--no-icon fr-badge--sm fr-ml-1v",
				"aria-label": "Hausse de " + c.value.trim()
			}, [I("span", {
				class: he("fr-pr-1v screenshot-hide-" + e.id),
				"aria-hidden": "true"
			}, " ↗ ", 2), fa(" " + A(c.value.trim()), 1)], 8, Zv)]))])) : R("", !0)]),
			I("div", Qv, [I("div", null, [I("p", $v, A(e.source) + ", " + A(e.date), 1), e.textIa ? (P(), F("p", ey, [g[8] ||= I("span", {
				class: "fr-icon-sparkling-2-line fr-icon--sm",
				"aria-disabled": "true"
			}, null, -1), e.linkIa ? (P(), F("a", {
				key: 0,
				href: e.linkIa,
				target: "_blank",
				rel: "noopener noreferrer"
			}, A(e.textIa), 9, ty)) : (P(), F("span", ny, A(e.textIa), 1))])) : R("", !0)]), l.value && n.value.length > 0 ? (P(), F("fieldset", {
				key: 0,
				class: he("fr-segmented fr-segmented--no-legend fr-segmented--sm screenshot-hide-" + e.id)
			}, [g[11] ||= I("legend", { class: "fr-segmented__legend" }, "Choisir votre vue", -1), I("div", ry, [I("div", iy, [I("input", {
				id: "segmented-chart-" + e.id,
				value: "1",
				type: "radio",
				checked: "",
				name: "segmented-" + e.id,
				onChange: g[3] ||= (e) => a.value = "chart"
			}, null, 40, ay), I("label", {
				class: "fr-label",
				for: "segmented-chart-" + e.id
			}, [...g[9] ||= [I("span", {
				class: "fr-icon-pie-chart-2-fill fr-icon--sm",
				"aria-hidden": "true"
			}, null, -1), I("span", { class: "fr-sr-only" }, "Vue graphique", -1)]], 8, oy)]), I("div", sy, [I("input", {
				id: "segmented-table-" + e.id,
				value: "2",
				type: "radio",
				name: "segmented-" + e.id,
				onChange: g[4] ||= (e) => a.value = "table"
			}, null, 40, cy), I("label", {
				class: "fr-label",
				for: "segmented-table-" + e.id
			}, [...g[10] ||= [I("span", {
				class: "fr-icon-table-2 fr-icon fr-icon--sm",
				"aria-hidden": "true"
			}, null, -1), I("span", { class: "fr-sr-only" }, "Vue tableau", -1)]], 8, ly)])])], 2)) : R("", !0)]),
			I("div", uy, [
				I("p", dy, [s.value ? (P(), F("strong", fy, A(s.value), 1)) : R("", !0)]),
				s.value ? R("", !0) : (P(), F("div", {
					key: 0,
					class: he(a.value === "table" ? "fr-hidden" : "w-full"),
					"aria-hidden": a.value === "table"
				}, [(P(!0), F(N, null, Fr(n.value, (t, n) => (P(), F("div", {
					id: e.id + "-chart-" + t,
					key: n,
					class: he(i.value === t ? "" : "fr-hidden")
				}, null, 10, my))), 128))], 10, py)),
				s.value ? R("", !0) : (P(), F("div", {
					key: 1,
					class: he(a.value === "chart" ? "fr-hidden" : "w-full"),
					"aria-hidden": a.value === "chart"
				}, [(P(!0), F(N, null, Fr(r.value.filter((e) => e !== "global"), (t, n) => (P(), F("div", {
					id: e.id + "-table-" + t,
					key: n,
					class: he(i.value === t ? "" : "fr-hidden")
				}, null, 10, gy))), 128)), r.value.includes("global") ? (P(), F("div", {
					key: 0,
					id: e.id + "-table-global",
					class: he(r.value.includes(i.value) && r.value.length > 1 ? "fr-hidden" : "")
				}, null, 10, _y)) : R("", !0)], 10, hy))
			])
		], 8, Cv));
	}
}, [["__scopeId", "data-v-608b349b"]]), { min: yy, max: by } = Math, xy = (e, t = 0, n = 1) => yy(by(t, e), n), Sy = (e) => {
	e._clipped = !1, e._unclipped = e.slice(0);
	for (let t = 0; t <= 3; t++) t < 3 ? ((e[t] < 0 || e[t] > 255) && (e._clipped = !0), e[t] = xy(e[t], 0, 255)) : t === 3 && (e[t] = xy(e[t], 0, 1));
	return e;
}, Cy = {};
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
]) Cy[`[object ${e}]`] = e.toLowerCase();
function Y(e) {
	return Cy[Object.prototype.toString.call(e)] || "object";
}
//#endregion
//#region node_modules/chroma-js/src/utils/unpack.js
var X = (e, t = null) => e.length >= 3 ? Array.prototype.slice.call(e) : Y(e[0]) == "object" && t ? t.split("").filter((t) => e[0][t] !== void 0).map((t) => e[0][t]) : e[0].slice(0), wy = (e) => {
	if (e.length < 2) return null;
	let t = e.length - 1;
	return Y(e[t]) == "string" ? e[t].toLowerCase() : null;
}, { PI: Ty, min: Ey, max: Dy } = Math, Oy = (e) => Math.round(e * 100) / 100, ky = (e) => Math.round(e * 100) / 100, Ay = Ty * 2, jy = Ty / 3, My = Ty / 180, Ny = 180 / Ty;
function Py(e) {
	return [...e.slice(0, 3).reverse(), ...e.slice(3)];
}
//#endregion
//#region node_modules/chroma-js/src/io/input.js
var Z = {
	format: {},
	autodetect: []
}, Q = class {
	constructor(...e) {
		let t = this;
		if (Y(e[0]) === "object" && e[0].constructor && e[0].constructor === this.constructor) return e[0];
		let n = wy(e), r = !1;
		if (!n) {
			r = !0, Z.sorted ||= (Z.autodetect = Z.autodetect.sort((e, t) => t.p - e.p), !0);
			for (let t of Z.autodetect) if (n = t.test(...e), n) break;
		}
		if (Z.format[n]) t._rgb = Sy(Z.format[n].apply(null, r ? e : e.slice(0, -1)));
		else throw Error("unknown format: " + e);
		t._rgb.length === 3 && t._rgb.push(1);
	}
	toString() {
		return Y(this.hex) == "function" ? this.hex() : `[${this._rgb.join(",")}]`;
	}
}, Fy = "3.2.0", $ = (...e) => new Q(...e);
$.version = Fy;
//#endregion
//#region node_modules/chroma-js/src/colors/w3cx11.js
var Iy = {
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
}, Ly = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, Ry = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/, zy = (e) => {
	if (e.match(Ly)) {
		(e.length === 4 || e.length === 7) && (e = e.substr(1)), e.length === 3 && (e = e.split(""), e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]);
		let t = parseInt(e, 16);
		return [
			t >> 16,
			t >> 8 & 255,
			t & 255,
			1
		];
	}
	if (e.match(Ry)) {
		(e.length === 5 || e.length === 9) && (e = e.substr(1)), e.length === 4 && (e = e.split(""), e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2] + e[3] + e[3]);
		let t = parseInt(e, 16);
		return [
			t >> 24 & 255,
			t >> 16 & 255,
			t >> 8 & 255,
			Math.round((t & 255) / 255 * 100) / 100
		];
	}
	throw Error(`unknown hex color: ${e}`);
}, { round: By } = Math, Vy = (...e) => {
	let [t, n, r, i] = X(e, "rgba"), a = wy(e) || "auto";
	i === void 0 && (i = 1), a === "auto" && (a = i < 1 ? "rgba" : "rgb"), t = By(t), n = By(n), r = By(r);
	let o = "000000" + (t << 16 | n << 8 | r).toString(16);
	o = o.substr(o.length - 6);
	let s = "0" + By(i * 255).toString(16);
	switch (s = s.substr(s.length - 2), a.toLowerCase()) {
		case "rgba": return `#${o}${s}`;
		case "argb": return `#${s}${o}`;
		default: return `#${o}`;
	}
};
//#endregion
//#region node_modules/chroma-js/src/ops/clipped.js
Q.prototype.name = function() {
	let e = Vy(this._rgb, "rgb");
	for (let t of Object.keys(Iy)) if (Iy[t] === e) return t.toLowerCase();
	return e;
}, Z.format.named = (e) => {
	if (e = e.toLowerCase(), Iy[e]) return zy(Iy[e]);
	throw Error("unknown color name: " + e);
}, Z.autodetect.push({
	p: 5,
	test: (e, ...t) => {
		if (!t.length && Y(e) === "string" && Iy[e.toLowerCase()]) return "named";
	}
}), Q.prototype.alpha = function(e, t = !1) {
	return e !== void 0 && Y(e) === "number" ? t ? (this._rgb[3] = e, this) : new Q([
		this._rgb[0],
		this._rgb[1],
		this._rgb[2],
		e
	], "rgb") : this._rgb[3];
}, Q.prototype.clipped = function() {
	return this._rgb._clipped || !1;
};
//#endregion
//#region node_modules/chroma-js/src/io/lab/lab-constants.js
var Hy = {
	Kn: 18,
	labWhitePoint: "d65",
	Xn: .95047,
	Yn: 1,
	Zn: 1.08883,
	t0: .137931034,
	t1: .206896552,
	t2: .12841855,
	t3: .008856452,
	kE: 216 / 24389,
	kKE: 8,
	kK: 24389 / 27,
	RefWhiteRGB: {
		X: .95047,
		Y: 1,
		Z: 1.08883
	},
	MtxRGB2XYZ: {
		m00: .4124564390896922,
		m01: .21267285140562253,
		m02: .0193338955823293,
		m10: .357576077643909,
		m11: .715152155287818,
		m12: .11919202588130297,
		m20: .18043748326639894,
		m21: .07217499330655958,
		m22: .9503040785363679
	},
	MtxXYZ2RGB: {
		m00: 3.2404541621141045,
		m01: -.9692660305051868,
		m02: .055643430959114726,
		m10: -1.5371385127977166,
		m11: 1.8760108454466942,
		m12: -.2040259135167538,
		m20: -.498531409556016,
		m21: .041556017530349834,
		m22: 1.0572251882231791
	},
	As: .9414285350000001,
	Bs: 1.040417467,
	Cs: 1.089532651,
	MtxAdaptMa: {
		m00: .8951,
		m01: -.7502,
		m02: .0389,
		m10: .2664,
		m11: 1.7135,
		m12: -.0685,
		m20: -.1614,
		m21: .0367,
		m22: 1.0296
	},
	MtxAdaptMaI: {
		m00: .9869929054667123,
		m01: .43230526972339456,
		m02: -.008528664575177328,
		m10: -.14705425642099013,
		m11: .5183602715367776,
		m12: .04004282165408487,
		m20: .15996265166373125,
		m21: .0492912282128556,
		m22: .9684866957875502
	}
}, Uy = new Map([
	["a", [1.0985, .35585]],
	["b", [1.0985, .35585]],
	["c", [.98074, 1.18232]],
	["d50", [.96422, .82521]],
	["d55", [.95682, .92149]],
	["d65", [.95047, 1.08883]],
	["e", [
		1,
		1,
		1
	]],
	["f2", [.99186, .67393]],
	["f7", [.95041, 1.08747]],
	["f11", [1.00962, .6435]],
	["icc", [.96422, .82521]]
]);
function Wy(e) {
	let t = Uy.get(String(e).toLowerCase());
	if (!t) throw Error("unknown Lab illuminant " + e);
	Hy.labWhitePoint = e, Hy.Xn = t[0], Hy.Zn = t[1];
}
function Gy() {
	return Hy.labWhitePoint;
}
//#endregion
//#region node_modules/chroma-js/src/io/lab/lab2rgb.js
var Ky = (...e) => {
	e = X(e, "lab");
	let [t, n, r] = e, [i, a, o] = qy(t, n, r), [s, c, l] = Yy(i, a, o);
	return [
		s,
		c,
		l,
		e.length > 3 ? e[3] : 1
	];
}, qy = (e, t, n) => {
	let { kE: r, kK: i, kKE: a, Xn: o, Yn: s, Zn: c } = Hy, l = (e + 16) / 116, u = .002 * t + l, d = l - .005 * n, f = u * u * u, p = d * d * d, m = f > r ? f : (116 * u - 16) / i, h = e > a ? ((e + 16) / 116) ** 3 : e / i, g = p > r ? p : (116 * d - 16) / i;
	return [
		m * o,
		h * s,
		g * c
	];
}, Jy = (e) => {
	let t = Math.sign(e);
	return e = Math.abs(e), (e <= .0031308 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - .055) * t;
}, Yy = (e, t, n) => {
	let { MtxAdaptMa: r, MtxAdaptMaI: i, MtxXYZ2RGB: a, RefWhiteRGB: o, Xn: s, Yn: c, Zn: l } = Hy, u = s * r.m00 + c * r.m10 + l * r.m20, d = s * r.m01 + c * r.m11 + l * r.m21, f = s * r.m02 + c * r.m12 + l * r.m22, p = o.X * r.m00 + o.Y * r.m10 + o.Z * r.m20, m = o.X * r.m01 + o.Y * r.m11 + o.Z * r.m21, h = o.X * r.m02 + o.Y * r.m12 + o.Z * r.m22, g = (e * r.m00 + t * r.m10 + n * r.m20) * (p / u), _ = (e * r.m01 + t * r.m11 + n * r.m21) * (m / d), v = (e * r.m02 + t * r.m12 + n * r.m22) * (h / f), y = g * i.m00 + _ * i.m10 + v * i.m20, b = g * i.m01 + _ * i.m11 + v * i.m21, x = g * i.m02 + _ * i.m12 + v * i.m22, S = Jy(y * a.m00 + b * a.m10 + x * a.m20), C = Jy(y * a.m01 + b * a.m11 + x * a.m21), w = Jy(y * a.m02 + b * a.m12 + x * a.m22);
	return [
		S * 255,
		C * 255,
		w * 255
	];
}, Xy = (...e) => {
	let [t, n, r, ...i] = X(e, "rgb"), [a, o, s] = $y(t, n, r), [c, l, u] = Zy(a, o, s);
	return [
		c,
		l,
		u,
		...i.length > 0 && i[0] < 1 ? [i[0]] : []
	];
};
function Zy(e, t, n) {
	let { Xn: r, Yn: i, Zn: a, kE: o, kK: s } = Hy, c = e / r, l = t / i, u = n / a, d = c > o ? c ** (1 / 3) : (s * c + 16) / 116, f = l > o ? l ** (1 / 3) : (s * l + 16) / 116, p = u > o ? u ** (1 / 3) : (s * u + 16) / 116;
	return [
		116 * f - 16,
		500 * (d - f),
		200 * (f - p)
	];
}
function Qy(e) {
	let t = Math.sign(e);
	return e = Math.abs(e), (e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4) * t;
}
var $y = (e, t, n) => {
	e = Qy(e / 255), t = Qy(t / 255), n = Qy(n / 255);
	let { MtxRGB2XYZ: r, MtxAdaptMa: i, MtxAdaptMaI: a, Xn: o, Yn: s, Zn: c, As: l, Bs: u, Cs: d } = Hy, f = e * r.m00 + t * r.m10 + n * r.m20, p = e * r.m01 + t * r.m11 + n * r.m21, m = e * r.m02 + t * r.m12 + n * r.m22, h = o * i.m00 + s * i.m10 + c * i.m20, g = o * i.m01 + s * i.m11 + c * i.m21, _ = o * i.m02 + s * i.m12 + c * i.m22, v = f * i.m00 + p * i.m10 + m * i.m20, y = f * i.m01 + p * i.m11 + m * i.m21, b = f * i.m02 + p * i.m12 + m * i.m22;
	return v *= h / l, y *= g / u, b *= _ / d, f = v * a.m00 + y * a.m10 + b * a.m20, p = v * a.m01 + y * a.m11 + b * a.m21, m = v * a.m02 + y * a.m12 + b * a.m22, [
		f,
		p,
		m
	];
};
//#endregion
//#region node_modules/chroma-js/src/ops/get.js
Q.prototype.lab = function() {
	return Xy(this._rgb);
}, Object.assign($, {
	lab: (...e) => new Q(...e, "lab"),
	getLabWhitePoint: Gy,
	setLabWhitePoint: Wy
}), Z.format.lab = Ky, Z.autodetect.push({
	p: 2,
	test: (...e) => {
		if (e = X(e, "lab"), Y(e) === "array" && e.length === 3) return "lab";
	}
}), Q.prototype.darken = function(e = 1) {
	let t = this, n = t.lab();
	return n[0] -= Hy.Kn * e, new Q(n, "lab").alpha(t.alpha(), !0);
}, Q.prototype.brighten = function(e = 1) {
	return this.darken(-e);
}, Q.prototype.darker = Q.prototype.darken, Q.prototype.brighter = Q.prototype.brighten, Q.prototype.get = function(e) {
	let [t, n] = e.split("."), r = this[t]();
	if (n) {
		let e = t.indexOf(n) - (t.substr(0, 2) === "ok" ? 2 : 0);
		if (e > -1) return r[e];
		throw Error(`unknown channel ${n} in mode ${t}`);
	} else return r;
};
//#endregion
//#region node_modules/chroma-js/src/ops/luminance.js
var { pow: eb } = Math, tb = 1e-7, nb = 20;
Q.prototype.luminance = function(e, t = "rgb") {
	if (e !== void 0 && Y(e) === "number") {
		if (e === 0) return new Q([
			0,
			0,
			0,
			this._rgb[3]
		], "rgb");
		if (e === 1) return new Q([
			255,
			255,
			255,
			this._rgb[3]
		], "rgb");
		let n = this.luminance(), r = nb, i = (n, a) => {
			let o = n.interpolate(a, .5, t), s = o.luminance();
			return Math.abs(e - s) < tb || !r-- ? o : s > e ? i(n, o) : i(o, a);
		};
		return new Q([...(n > e ? i(new Q([
			0,
			0,
			0
		]), this) : i(this, new Q([
			255,
			255,
			255
		]))).rgb(), this._rgb[3]]);
	}
	return rb(...this._rgb.slice(0, 3));
};
var rb = (e, t, n) => (e = ib(e), t = ib(t), n = ib(n), .2126 * e + .7152 * t + .0722 * n), ib = (e) => (e /= 255, e <= .03928 ? e / 12.92 : eb((e + .055) / 1.055, 2.4)), ab = {}, ob = (e, t, n = .5, ...r) => {
	let i = r[0] || "lrgb";
	if (!ab[i] && !r.length && (i = Object.keys(ab)[0]), !ab[i]) throw Error(`interpolation mode ${i} is not defined`);
	return Y(e) !== "object" && (e = new Q(e)), Y(t) !== "object" && (t = new Q(t)), ab[i](e, t, n).alpha(e.alpha() + n * (t.alpha() - e.alpha()));
};
//#endregion
//#region node_modules/chroma-js/src/ops/premultiply.js
Q.prototype.mix = Q.prototype.interpolate = function(e, t = .5, ...n) {
	return ob(this, e, t, ...n);
}, Q.prototype.premultiply = function(e = !1) {
	let t = this._rgb, n = t[3];
	return e ? (this._rgb = [
		t[0] * n,
		t[1] * n,
		t[2] * n,
		n
	], this) : new Q([
		t[0] * n,
		t[1] * n,
		t[2] * n,
		n
	], "rgb");
};
//#endregion
//#region node_modules/chroma-js/src/io/lch/lch2lab.js
var { sin: sb, cos: cb } = Math, lb = (...e) => {
	let [t, n, r] = X(e, "lch");
	return isNaN(r) && (r = 0), r *= My, [
		t,
		cb(r) * n,
		sb(r) * n
	];
}, ub = (...e) => {
	e = X(e, "lch");
	let [t, n, r] = e, [i, a, o] = lb(t, n, r), [s, c, l] = Ky(i, a, o);
	return [
		s,
		c,
		l,
		e.length > 3 ? e[3] : 1
	];
}, db = (...e) => ub(...Py(X(e, "hcl"))), { sqrt: fb, atan2: pb, round: mb } = Math, hb = (...e) => {
	let [t, n, r] = X(e, "lab"), i = fb(n * n + r * r), a = (pb(r, n) * Ny + 360) % 360;
	return mb(i * 1e4) === 0 && (a = NaN), [
		t,
		i,
		a
	];
}, gb = (...e) => {
	let [t, n, r, ...i] = X(e, "rgb"), [a, o, s] = Xy(t, n, r), [c, l, u] = hb(a, o, s);
	return [
		c,
		l,
		u,
		...i.length > 0 && i[0] < 1 ? [i[0]] : []
	];
};
Q.prototype.lch = function() {
	return gb(this._rgb);
}, Q.prototype.hcl = function() {
	return Py(gb(this._rgb));
}, Object.assign($, {
	lch: (...e) => new Q(...e, "lch"),
	hcl: (...e) => new Q(...e, "hcl")
}), Z.format.lch = ub, Z.format.hcl = db, ["lch", "hcl"].forEach((e) => Z.autodetect.push({
	p: 2,
	test: (...t) => {
		if (t = X(t, e), Y(t) === "array" && t.length === 3) return e;
	}
})), Q.prototype.saturate = function(e = 1) {
	let t = this, n = t.lch();
	return n[1] += Hy.Kn * e, n[1] < 0 && (n[1] = 0), new Q(n, "lch").alpha(t.alpha(), !0);
}, Q.prototype.desaturate = function(e = 1) {
	return this.saturate(-e);
}, Q.prototype.set = function(e, t, n = !1) {
	let [r, i] = e.split("."), a = this[r]();
	if (i) {
		let e = r.indexOf(i) - (r.substr(0, 2) === "ok" ? 2 : 0);
		if (e > -1) {
			if (Y(t) == "string") switch (t.charAt(0)) {
				case "+":
					a[e] += +t;
					break;
				case "-":
					a[e] += +t;
					break;
				case "*":
					a[e] *= +t.substr(1);
					break;
				case "/":
					a[e] /= +t.substr(1);
					break;
				default: a[e] = +t;
			}
			else if (Y(t) === "number") a[e] = t;
			else throw Error("unsupported value for Color.set");
			let i = new Q(a, r);
			return n ? (this._rgb = i._rgb, this) : i;
		}
		throw Error(`unknown channel ${i} in mode ${r}`);
	} else return a;
}, Q.prototype.tint = function(e = .5, ...t) {
	return ob(this, "white", e, ...t);
}, Q.prototype.shade = function(e = .5, ...t) {
	return ob(this, "black", e, ...t);
}, ab.rgb = (e, t, n) => {
	let r = e._rgb, i = t._rgb;
	return new Q(r[0] + n * (i[0] - r[0]), r[1] + n * (i[1] - r[1]), r[2] + n * (i[2] - r[2]), "rgb");
};
//#endregion
//#region node_modules/chroma-js/src/interpolator/lrgb.js
var { sqrt: _b, pow: vb } = Math;
ab.lrgb = (e, t, n) => {
	let [r, i, a] = e._rgb, [o, s, c] = t._rgb;
	return new Q(_b(vb(r, 2) * (1 - n) + vb(o, 2) * n), _b(vb(i, 2) * (1 - n) + vb(s, 2) * n), _b(vb(a, 2) * (1 - n) + vb(c, 2) * n), "rgb");
}, ab.lab = (e, t, n) => {
	let r = e.lab(), i = t.lab();
	return new Q(r[0] + n * (i[0] - r[0]), r[1] + n * (i[1] - r[1]), r[2] + n * (i[2] - r[2]), "lab");
};
//#endregion
//#region node_modules/chroma-js/src/interpolator/_hsx.js
var yb = (e, t, n, r) => {
	let i, a;
	r === "hsl" ? (i = e.hsl(), a = t.hsl()) : r === "hsv" ? (i = e.hsv(), a = t.hsv()) : r === "hcg" ? (i = e.hcg(), a = t.hcg()) : r === "hsi" ? (i = e.hsi(), a = t.hsi()) : r === "lch" || r === "hcl" ? (r = "hcl", i = e.hcl(), a = t.hcl()) : r === "oklch" && (i = e.oklch().reverse(), a = t.oklch().reverse());
	let o, s, c, l, u, d;
	(r.substr(0, 1) === "h" || r === "oklch") && ([o, c, u] = i, [s, l, d] = a);
	let f, p, m, h;
	return !isNaN(o) && !isNaN(s) ? (h = s > o && s - o > 180 ? s - (o + 360) : s < o && o - s > 180 ? s + 360 - o : s - o, p = o + n * h) : isNaN(o) ? isNaN(s) ? p = NaN : (p = s, (u == 1 || u == 0) && r != "hsv" && (f = l)) : (p = o, (d == 1 || d == 0) && r != "hsv" && (f = c)), f === void 0 && (f = c + n * (l - c)), m = u + n * (d - u), r === "oklch" ? new Q([
		m,
		f,
		p
	], r) : new Q([
		p,
		f,
		m
	], r);
}, bb = (e, t, n) => yb(e, t, n, "lch");
ab.lch = bb, ab.hcl = bb;
//#endregion
//#region node_modules/chroma-js/src/io/num/num2rgb.js
var xb = (e) => {
	if (Y(e) == "number" && e >= 0 && e <= 16777215) return [
		e >> 16,
		e >> 8 & 255,
		e & 255,
		1
	];
	throw Error("unknown num color: " + e);
}, Sb = (...e) => {
	let [t, n, r] = X(e, "rgb");
	return (t << 16) + (n << 8) + r;
};
Q.prototype.num = function() {
	return Sb(this._rgb);
}, Object.assign($, { num: (...e) => new Q(...e, "num") }), Z.format.num = xb, Z.autodetect.push({
	p: 5,
	test: (...e) => {
		if (e.length === 1 && Y(e[0]) === "number" && e[0] >= 0 && e[0] <= 16777215) return "num";
	}
}), ab.num = (e, t, n) => {
	let r = e.num();
	return new Q(r + n * (t.num() - r), "num");
};
//#endregion
//#region node_modules/chroma-js/src/io/hcg/hcg2rgb.js
var { floor: Cb } = Math, wb = (...e) => {
	e = X(e, "hcg");
	let [t, n, r] = e, i, a, o;
	r *= 255;
	let s = n * 255;
	if (n === 0) i = a = o = r;
	else {
		t === 360 && (t = 0), t > 360 && (t -= 360), t < 0 && (t += 360), t /= 60;
		let e = Cb(t), c = t - e, l = r * (1 - n), u = l + s * (1 - c), d = l + s * c, f = l + s;
		switch (e) {
			case 0:
				[i, a, o] = [
					f,
					d,
					l
				];
				break;
			case 1:
				[i, a, o] = [
					u,
					f,
					l
				];
				break;
			case 2:
				[i, a, o] = [
					l,
					f,
					d
				];
				break;
			case 3:
				[i, a, o] = [
					l,
					u,
					f
				];
				break;
			case 4:
				[i, a, o] = [
					d,
					l,
					f
				];
				break;
			case 5:
				[i, a, o] = [
					f,
					l,
					u
				];
				break;
		}
	}
	return [
		i,
		a,
		o,
		e.length > 3 ? e[3] : 1
	];
}, Tb = (...e) => {
	let [t, n, r] = X(e, "rgb"), i = Ey(t, n, r), a = Dy(t, n, r), o = a - i, s = o * 100 / 255, c = i / (255 - o) * 100, l;
	return o === 0 ? l = NaN : (t === a && (l = (n - r) / o), n === a && (l = 2 + (r - t) / o), r === a && (l = 4 + (t - n) / o), l *= 60, l < 0 && (l += 360)), [
		l,
		s,
		c
	];
};
Q.prototype.hcg = function() {
	return Tb(this._rgb);
}, $.hcg = (...e) => new Q(...e, "hcg"), Z.format.hcg = wb, Z.autodetect.push({
	p: 1,
	test: (...e) => {
		if (e = X(e, "hcg"), Y(e) === "array" && e.length === 3) return "hcg";
	}
}), ab.hcg = (e, t, n) => yb(e, t, n, "hcg");
//#endregion
//#region node_modules/chroma-js/src/io/hsi/hsi2rgb.js
var { cos: Eb } = Math, Db = (...e) => {
	e = X(e, "hsi");
	let [t, n, r] = e, i, a, o;
	return isNaN(t) && (t = 0), isNaN(n) && (n = 0), t > 360 && (t -= 360), t < 0 && (t += 360), t /= 360, t < 1 / 3 ? (o = (1 - n) / 3, i = (1 + n * Eb(Ay * t) / Eb(jy - Ay * t)) / 3, a = 1 - (o + i)) : t < 2 / 3 ? (t -= 1 / 3, i = (1 - n) / 3, a = (1 + n * Eb(Ay * t) / Eb(jy - Ay * t)) / 3, o = 1 - (i + a)) : (t -= 2 / 3, a = (1 - n) / 3, o = (1 + n * Eb(Ay * t) / Eb(jy - Ay * t)) / 3, i = 1 - (a + o)), i = xy(r * i * 3), a = xy(r * a * 3), o = xy(r * o * 3), [
		i * 255,
		a * 255,
		o * 255,
		e.length > 3 ? e[3] : 1
	];
}, { min: Ob, sqrt: kb, acos: Ab } = Math, jb = (...e) => {
	let [t, n, r] = X(e, "rgb");
	t /= 255, n /= 255, r /= 255;
	let i, a = Ob(t, n, r), o = (t + n + r) / 3, s = o > 0 ? 1 - a / o : 0;
	return s === 0 ? i = NaN : (i = (t - n + (t - r)) / 2, i /= kb((t - n) * (t - n) + (t - r) * (n - r)), i = Ab(i), r > n && (i = Ay - i), i /= Ay), [
		i * 360,
		s,
		o
	];
};
Q.prototype.hsi = function() {
	return jb(this._rgb);
}, $.hsi = (...e) => new Q(...e, "hsi"), Z.format.hsi = Db, Z.autodetect.push({
	p: 2,
	test: (...e) => {
		if (e = X(e, "hsi"), Y(e) === "array" && e.length === 3) return "hsi";
	}
}), ab.hsi = (e, t, n) => yb(e, t, n, "hsi");
//#endregion
//#region node_modules/chroma-js/src/io/hsl/hsl2rgb.js
var Mb = (...e) => {
	e = X(e, "hsl");
	let [t, n, r] = e, i, a, o;
	if (n === 0) i = a = o = r * 255;
	else {
		let e = [
			0,
			0,
			0
		], s = [
			0,
			0,
			0
		], c = r < .5 ? r * (1 + n) : r + n - r * n, l = 2 * r - c, u = t / 360;
		e[0] = u + 1 / 3, e[1] = u, e[2] = u - 1 / 3;
		for (let t = 0; t < 3; t++) e[t] < 0 && (e[t] += 1), e[t] > 1 && --e[t], 6 * e[t] < 1 ? s[t] = l + (c - l) * 6 * e[t] : 2 * e[t] < 1 ? s[t] = c : 3 * e[t] < 2 ? s[t] = l + (c - l) * (2 / 3 - e[t]) * 6 : s[t] = l;
		[i, a, o] = [
			s[0] * 255,
			s[1] * 255,
			s[2] * 255
		];
	}
	return e.length > 3 ? [
		i,
		a,
		o,
		e[3]
	] : [
		i,
		a,
		o,
		1
	];
}, Nb = (...e) => {
	e = X(e, "rgba");
	let [t, n, r] = e;
	t /= 255, n /= 255, r /= 255;
	let i = Ey(t, n, r), a = Dy(t, n, r), o = (a + i) / 2, s, c;
	return a === i ? (s = 0, c = NaN) : s = o < .5 ? (a - i) / (a + i) : (a - i) / (2 - a - i), t == a ? c = (n - r) / (a - i) : n == a ? c = 2 + (r - t) / (a - i) : r == a && (c = 4 + (t - n) / (a - i)), c *= 60, c < 0 && (c += 360), e.length > 3 && e[3] !== void 0 ? [
		c,
		s,
		o,
		e[3]
	] : [
		c,
		s,
		o
	];
};
Q.prototype.hsl = function() {
	return Nb(this._rgb);
}, $.hsl = (...e) => new Q(...e, "hsl"), Z.format.hsl = Mb, Z.autodetect.push({
	p: 2,
	test: (...e) => {
		if (e = X(e, "hsl"), Y(e) === "array" && e.length === 3) return "hsl";
	}
}), ab.hsl = (e, t, n) => yb(e, t, n, "hsl");
//#endregion
//#region node_modules/chroma-js/src/io/hsv/hsv2rgb.js
var { floor: Pb } = Math, Fb = (...e) => {
	e = X(e, "hsv");
	let [t, n, r] = e, i, a, o;
	if (r *= 255, n === 0) i = a = o = r;
	else {
		t === 360 && (t = 0), t > 360 && (t -= 360), t < 0 && (t += 360), t /= 60;
		let e = Pb(t), s = t - e, c = r * (1 - n), l = r * (1 - n * s), u = r * (1 - n * (1 - s));
		switch (e) {
			case 0:
				[i, a, o] = [
					r,
					u,
					c
				];
				break;
			case 1:
				[i, a, o] = [
					l,
					r,
					c
				];
				break;
			case 2:
				[i, a, o] = [
					c,
					r,
					u
				];
				break;
			case 3:
				[i, a, o] = [
					c,
					l,
					r
				];
				break;
			case 4:
				[i, a, o] = [
					u,
					c,
					r
				];
				break;
			case 5:
				[i, a, o] = [
					r,
					c,
					l
				];
				break;
		}
	}
	return [
		i,
		a,
		o,
		e.length > 3 ? e[3] : 1
	];
}, { min: Ib, max: Lb } = Math, Rb = (...e) => {
	e = X(e, "rgb");
	let [t, n, r] = e, i = Ib(t, n, r), a = Lb(t, n, r), o = a - i, s, c, l;
	return l = a / 255, a === 0 ? (s = NaN, c = 0) : (c = o / a, t === a && (s = (n - r) / o), n === a && (s = 2 + (r - t) / o), r === a && (s = 4 + (t - n) / o), s *= 60, s < 0 && (s += 360)), [
		s,
		c,
		l
	];
};
Q.prototype.hsv = function() {
	return Rb(this._rgb);
}, $.hsv = (...e) => new Q(...e, "hsv"), Z.format.hsv = Fb, Z.autodetect.push({
	p: 2,
	test: (...e) => {
		if (e = X(e, "hsv"), Y(e) === "array" && e.length === 3) return "hsv";
	}
}), ab.hsv = (e, t, n) => yb(e, t, n, "hsv");
//#endregion
//#region node_modules/chroma-js/src/utils/multiply-matrices.js
function zb(e, t) {
	let n = e.length;
	Array.isArray(e[0]) || (e = [e]), Array.isArray(t[0]) || (t = t.map((e) => [e]));
	let r = t[0].length, i = t[0].map((e, n) => t.map((e) => e[n])), a = e.map((e) => i.map((t) => Array.isArray(e) ? e.reduce((e, n, r) => e + n * (t[r] || 0), 0) : t.reduce((t, n) => t + n * e, 0)));
	return n === 1 && (a = a[0]), r === 1 ? a.map((e) => e[0]) : a;
}
//#endregion
//#region node_modules/chroma-js/src/io/oklab/oklab2rgb.js
var Bb = (...e) => {
	e = X(e, "lab");
	let [t, n, r, ...i] = e, [a, o, s] = Vb([
		t,
		n,
		r
	]), [c, l, u] = Yy(a, o, s);
	return [
		c,
		l,
		u,
		...i.length > 0 && i[0] < 1 ? [i[0]] : []
	];
};
function Vb(e) {
	return zb([
		[
			1.2268798758459243,
			-.5578149944602171,
			.2813910456659647
		],
		[
			-.0405757452148008,
			1.112286803280317,
			-.0717110580655164
		],
		[
			-.0763729366746601,
			-.4214933324022432,
			1.5869240198367816
		]
	], zb([
		[
			1,
			.3963377773761749,
			.2158037573099136
		],
		[
			1,
			-.1055613458156586,
			-.0638541728258133
		],
		[
			1,
			-.0894841775298119,
			-1.2914855480194092
		]
	], e).map((e) => e ** 3));
}
//#endregion
//#region node_modules/chroma-js/src/io/oklab/rgb2oklab.js
var Hb = (...e) => {
	let [t, n, r, ...i] = X(e, "rgb");
	return [...Ub($y(t, n, r)), ...i.length > 0 && i[0] < 1 ? [i[0]] : []];
};
function Ub(e) {
	return zb([
		[
			.210454268309314,
			.7936177747023054,
			-.0040720430116193
		],
		[
			1.9779985324311684,
			-2.42859224204858,
			.450593709617411
		],
		[
			.0259040424655478,
			.7827717124575296,
			-.8086757549230774
		]
	], zb([
		[
			.819022437996703,
			.3619062600528904,
			-.1288737815209879
		],
		[
			.0329836539323885,
			.9292868615863434,
			.0361446663506424
		],
		[
			.0481771893596242,
			.2642395317527308,
			.6335478284694309
		]
	], e).map((e) => Math.cbrt(e)));
}
Q.prototype.oklab = function() {
	return Hb(this._rgb);
}, Object.assign($, { oklab: (...e) => new Q(...e, "oklab") }), Z.format.oklab = Bb, Z.autodetect.push({
	p: 2,
	test: (...e) => {
		if (e = X(e, "oklab"), Y(e) === "array" && e.length === 3) return "oklab";
	}
}), ab.oklab = (e, t, n) => {
	let r = e.oklab(), i = t.oklab();
	return new Q(r[0] + n * (i[0] - r[0]), r[1] + n * (i[1] - r[1]), r[2] + n * (i[2] - r[2]), "oklab");
}, ab.oklch = (e, t, n) => yb(e, t, n, "oklch");
//#endregion
//#region node_modules/chroma-js/src/generator/average.js
var { pow: Wb, sqrt: Gb, PI: Kb, cos: qb, sin: Jb, atan2: Yb } = Math, Xb = (e, t = "lrgb", n = null) => {
	let r = e.length;
	n ||= Array.from(Array(r)).map(() => 1);
	let i = r / n.reduce(function(e, t) {
		return e + t;
	});
	if (n.forEach((e, t) => {
		n[t] *= i;
	}), e = e.map((e) => new Q(e)), t === "lrgb") return Zb(e, n);
	let a = e.shift(), o = a.get(t), s = [], c = 0, l = 0;
	for (let e = 0; e < o.length; e++) if (o[e] = (o[e] || 0) * n[0], s.push(isNaN(o[e]) ? 0 : n[0]), t.charAt(e) === "h" && !isNaN(o[e])) {
		let t = o[e] / 180 * Kb;
		c += qb(t) * n[0], l += Jb(t) * n[0];
	}
	let u = a.alpha() * n[0];
	e.forEach((e, r) => {
		let i = e.get(t);
		u += e.alpha() * n[r + 1];
		for (let e = 0; e < o.length; e++) if (!isNaN(i[e])) if (s[e] += n[r + 1], t.charAt(e) === "h") {
			let t = i[e] / 180 * Kb;
			c += qb(t) * n[r + 1], l += Jb(t) * n[r + 1];
		} else o[e] += i[e] * n[r + 1];
	});
	for (let e = 0; e < o.length; e++) if (t.charAt(e) === "h") {
		let t = Yb(l / s[e], c / s[e]) / Kb * 180;
		for (; t < 0;) t += 360;
		for (; t >= 360;) t -= 360;
		o[e] = t;
	} else o[e] = o[e] / s[e];
	return u /= r, new Q(o, t).alpha(u > .99999 ? 1 : u, !0);
}, Zb = (e, t) => {
	let n = e.length, r = [
		0,
		0,
		0,
		0
	];
	for (let i = 0; i < e.length; i++) {
		let a = e[i], o = t[i] / n, s = a._rgb;
		r[0] += Wb(s[0], 2) * o, r[1] += Wb(s[1], 2) * o, r[2] += Wb(s[2], 2) * o, r[3] += s[3] * o;
	}
	return r[0] = Gb(r[0]), r[1] = Gb(r[1]), r[2] = Gb(r[2]), r[3] > .9999999 && (r[3] = 1), new Q(Sy(r));
}, { pow: Qb } = Math;
function $b(e) {
	let t = "rgb", n = $("#ccc"), r = 0, i = [0, 1], a = [0, 1], o = [], s = [0, 0], c = !1, l = [], u = !1, d = 0, f = 1, p = !1, m = {}, h = !0, g = 1, _ = function(e) {
		if (e ||= ["#fff", "#000"], e && Y(e) === "string" && $.brewer && $.brewer[e.toLowerCase()] && (e = $.brewer[e.toLowerCase()]), Y(e) === "array") {
			e.length === 1 && (e = [e[0], e[0]]), e = e.slice(0);
			for (let t = 0; t < e.length; t++) e[t] = $(e[t]);
			o.length = 0;
			for (let t = 0; t < e.length; t++) o.push(t / (e.length - 1));
		}
		return S(), l = e;
	}, v = function(e) {
		if (c != null) {
			let t = c.length - 1, n = 0;
			for (; n < t && e >= c[n];) n++;
			return n - 1;
		}
		return 0;
	}, y = (e) => e, b = (e) => e, x = function(e, r) {
		let i, a;
		if (r ??= !1, isNaN(e) || e === null) return n;
		a = r ? e : c && c.length > 2 ? v(e) / (c.length - 2) : f === d ? 1 : (e - d) / (f - d), a = b(a), r || (a = y(a)), g !== 1 && (a = Qb(a, g)), a = s[0] + a * (1 - s[0] - s[1]), a = xy(a, 0, 1);
		let u = Math.floor(a * 1e4);
		if (h && m[u]) i = m[u];
		else {
			if (Y(l) === "array") for (let e = 0; e < o.length; e++) {
				let n = o[e];
				if (a <= n) {
					i = l[e];
					break;
				}
				if (a >= n && e === o.length - 1) {
					i = l[e];
					break;
				}
				if (a > n && a < o[e + 1]) {
					a = (a - n) / (o[e + 1] - n), i = $.interpolate(l[e], l[e + 1], a, t);
					break;
				}
			}
			else Y(l) === "function" && (i = l(a));
			h && (m[u] = i);
		}
		return i;
	};
	var S = () => m = {};
	_(e);
	let C = function(e) {
		let t = $(x(e));
		return u && t[u] ? t[u]() : t;
	};
	return C.classes = function(e) {
		if (e != null) {
			if (Y(e) === "array") c = e, i = [e[0], e[e.length - 1]];
			else {
				let t = $.analyze(i);
				c = e === 0 ? [t.min, t.max] : $.limits(t, "e", e);
			}
			return C;
		}
		return c;
	}, C.domain = function(e) {
		if (!arguments.length) return a;
		a = e.slice(0), d = e[0], f = e[e.length - 1], o = [];
		let t = l.length;
		if (e.length === t && d !== f) for (let t of Array.from(e)) o.push((t - d) / (f - d));
		else {
			for (let e = 0; e < t; e++) o.push(e / (t - 1));
			if (e.length > 2) {
				let t = e.map((t, n) => n / (e.length - 1)), n = e.map((e) => (e - d) / (f - d));
				n.every((e, n) => t[n] === e) || (b = (e) => {
					if (e <= 0 || e >= 1) return e;
					let r = 0;
					for (; e >= n[r + 1];) r++;
					let i = (e - n[r]) / (n[r + 1] - n[r]);
					return t[r] + i * (t[r + 1] - t[r]);
				});
			}
		}
		return i = [d, f], C;
	}, C.mode = function(e) {
		return arguments.length ? (t = e, S(), C) : t;
	}, C.range = function(e, t) {
		return _(e, t), C;
	}, C.out = function(e) {
		return u = e, C;
	}, C.spread = function(e) {
		return arguments.length ? (r = e, C) : r;
	}, C.correctLightness = function(e) {
		return e ??= !0, p = e, S(), y = p ? function(e) {
			let t = x(0, !0).lab()[0], n = x(1, !0).lab()[0], r = t > n, i = x(e, !0).lab()[0], a = t + (n - t) * e, o = i - a, s = 0, c = 1, l = 20;
			for (; Math.abs(o) > .01 && l-- > 0;) (function() {
				return r && (o *= -1), o < 0 ? (s = e, e += (c - e) * .5) : (c = e, e += (s - e) * .5), i = x(e, !0).lab()[0], o = i - a;
			})();
			return e;
		} : (e) => e, C;
	}, C.padding = function(e) {
		return e == null ? s : (Y(e) === "number" && (e = [e, e]), s = e, C);
	}, C.colors = function(t, n) {
		arguments.length < 2 && (n = "hex");
		let r = [];
		if (arguments.length === 0) r = l.slice(0);
		else if (t === 1) r = [C(.5)];
		else if (t > 1) {
			let e = i[0], n = i[1] - e;
			r = ex(0, t, !1).map((r) => C(e + r / (t - 1) * n));
		} else {
			e = [];
			let t = [];
			if (c && c.length > 2) for (let e = 1, n = c.length, r = 1 <= n; r ? e < n : e > n; r ? e++ : e--) t.push((c[e - 1] + c[e]) * .5);
			else t = i;
			r = t.map((e) => C(e));
		}
		return $[n] && (r = r.map((e) => e[n]())), r;
	}, C.cache = function(e) {
		return e == null ? h : (h = e, C);
	}, C.gamma = function(e) {
		return e == null ? g : (g = e, C);
	}, C.nodata = function(e) {
		return e == null ? n : (n = $(e), C);
	}, C;
}
function ex(e, t, n) {
	let r = [], i = e < t, a = n ? i ? t + 1 : t - 1 : t;
	for (let t = e; i ? t < a : t > a; i ? t++ : t--) r.push(t);
	return r;
}
//#endregion
//#region node_modules/chroma-js/src/generator/bezier.js
var tx = function(e) {
	let t = [1, 1];
	for (let n = 1; n < e; n++) {
		let e = [1];
		for (let n = 1; n <= t.length; n++) e[n] = (t[n] || 0) + t[n - 1];
		t = e;
	}
	return t;
}, nx = function(e) {
	let t, n, r, i;
	if (e = e.map((e) => new Q(e)), e.length === 2) [n, r] = e.map((e) => e.lab()), t = function(e) {
		return new Q([
			0,
			1,
			2
		].map((t) => n[t] + e * (r[t] - n[t])), "lab");
	};
	else if (e.length === 3) [n, r, i] = e.map((e) => e.lab()), t = function(e) {
		return new Q([
			0,
			1,
			2
		].map((t) => (1 - e) * (1 - e) * n[t] + 2 * (1 - e) * e * r[t] + e * e * i[t]), "lab");
	};
	else if (e.length === 4) {
		let a;
		[n, r, i, a] = e.map((e) => e.lab()), t = function(e) {
			return new Q([
				0,
				1,
				2
			].map((t) => (1 - e) * (1 - e) * (1 - e) * n[t] + 3 * (1 - e) * (1 - e) * e * r[t] + 3 * (1 - e) * e * e * i[t] + e * e * e * a[t]), "lab");
		};
	} else if (e.length >= 5) {
		let n, r, i;
		n = e.map((e) => e.lab()), i = e.length - 1, r = tx(i), t = function(e) {
			let t = 1 - e;
			return new Q([
				0,
				1,
				2
			].map((a) => n.reduce((n, o, s) => n + r[s] * t ** (i - s) * e ** s * o[a], 0)), "lab");
		};
	} else throw RangeError("No point in running bezier with only one color.");
	return t;
}, rx = (e) => {
	let t = nx(e);
	return t.scale = () => $b(t), t;
}, { round: ix } = Math;
Q.prototype.rgb = function(e = !0) {
	return e === !1 ? this._rgb.slice(0, 3) : this._rgb.slice(0, 3).map(ix);
}, Q.prototype.rgba = function(e = !0) {
	return this._rgb.slice(0, 4).map((t, n) => n < 3 ? e === !1 ? t : ix(t) : t);
}, Object.assign($, { rgb: (...e) => new Q(...e, "rgb") }), Z.format.rgb = (...e) => {
	let t = X(e, "rgba");
	return t[3] === void 0 && (t[3] = 1), t;
}, Z.autodetect.push({
	p: 3,
	test: (...e) => {
		if (e = X(e, "rgba"), Y(e) === "array" && (e.length === 3 || e.length === 4 && Y(e[3]) == "number" && e[3] >= 0 && e[3] <= 1)) return "rgb";
	}
});
//#endregion
//#region node_modules/chroma-js/src/generator/blend.js
var ax = (e, t, n) => {
	if (!ax[n]) throw Error("unknown blend mode " + n);
	return ax[n](e, t);
}, ox = (e) => (t, n) => {
	let r = $(n).rgb(), i = $(t).rgb();
	return $.rgb(e(r, i));
}, sx = (e) => (t, n) => {
	let r = [];
	return r[0] = e(t[0], n[0]), r[1] = e(t[1], n[1]), r[2] = e(t[2], n[2]), r;
};
ax.normal = ox(sx((e) => e)), ax.multiply = ox(sx((e, t) => e * t / 255)), ax.screen = ox(sx((e, t) => 255 * (1 - (1 - e / 255) * (1 - t / 255)))), ax.overlay = ox(sx((e, t) => t < 128 ? 2 * e * t / 255 : 255 * (1 - 2 * (1 - e / 255) * (1 - t / 255)))), ax.darken = ox(sx((e, t) => e > t ? t : e)), ax.lighten = ox(sx((e, t) => e > t ? e : t)), ax.dodge = ox(sx((e, t) => e === 255 ? 255 : (e = t / 255 * 255 / (1 - e / 255), e > 255 ? 255 : e))), ax.burn = ox(sx((e, t) => 255 * (1 - (1 - t / 255) / (e / 255))));
//#endregion
//#region node_modules/chroma-js/src/generator/cubehelix.js
var { pow: cx, sin: lx, cos: ux } = Math;
function dx(e = 300, t = -1.5, n = 1, r = 1, i = [0, 1]) {
	let a = 0, o;
	Y(i) === "array" ? o = i[1] - i[0] : (o = 0, i = [i, i]);
	let s = function(s) {
		let c = Ay * ((e + 120) / 360 + t * s), l = cx(i[0] + o * s, r), u = (a === 0 ? n : n[0] + s * a) * l * (1 - l) / 2, d = ux(c), f = lx(c), p = l + u * (-.14861 * d + 1.78277 * f), m = l + u * (-.29227 * d - .90649 * f), h = l + 1.97294 * d * u;
		return $(Sy([
			p * 255,
			m * 255,
			h * 255,
			1
		]));
	};
	return s.start = function(t) {
		return t == null ? e : (e = t, s);
	}, s.rotations = function(e) {
		return e == null ? t : (t = e, s);
	}, s.gamma = function(e) {
		return e == null ? r : (r = e, s);
	}, s.hue = function(e) {
		return e == null ? n : (n = e, Y(n) === "array" ? (a = n[1] - n[0], a === 0 && (n = n[1])) : a = 0, s);
	}, s.lightness = function(e) {
		return e == null ? i : (Y(e) === "array" ? (i = e, o = e[1] - e[0]) : (i = [e, e], o = 0), s);
	}, s.scale = () => $.scale(s), s.hue(n), s;
}
//#endregion
//#region node_modules/chroma-js/src/generator/random.js
var fx = "0123456789abcdef", { floor: px, random: mx } = Math, hx = (e = mx) => {
	let t = "#";
	for (let n = 0; n < 6; n++) t += fx.charAt(px(e() * 16));
	return new Q(t, "hex");
}, { log: gx, pow: _x, floor: vx, abs: yx } = Math;
function bx(e, t = null) {
	let n = {
		min: Number.MAX_VALUE,
		max: Number.MAX_VALUE * -1,
		sum: 0,
		values: [],
		count: 0
	};
	return Y(e) === "object" && (e = Object.values(e)), e.forEach((e) => {
		t && Y(e) === "object" && (e = e[t]), e != null && !isNaN(e) && (n.values.push(e), n.sum += e, e < n.min && (n.min = e), e > n.max && (n.max = e), n.count += 1);
	}), n.domain = [n.min, n.max], n.limits = (e, t) => xx(n, e, t), n;
}
function xx(e, t = "equal", n = 7) {
	Y(e) == "array" && (e = bx(e));
	let { min: r, max: i } = e, a = e.values.sort((e, t) => e - t);
	if (n === 1) return [r, i];
	let o = [];
	if (t.substr(0, 1) === "c" && (o.push(r), o.push(i)), t.substr(0, 1) === "e") {
		o.push(r);
		for (let e = 1; e < n; e++) o.push(r + e / n * (i - r));
		o.push(i);
	} else if (t.substr(0, 1) === "l") {
		if (r <= 0) throw Error("Logarithmic scales are only possible for values > 0");
		let e = Math.LOG10E * gx(r), t = Math.LOG10E * gx(i);
		o.push(r);
		for (let r = 1; r < n; r++) o.push(_x(10, e + r / n * (t - e)));
		o.push(i);
	} else if (t.substr(0, 1) === "q") {
		o.push(r);
		for (let e = 1; e < n; e++) {
			let t = (a.length - 1) * e / n, r = vx(t);
			if (r === t) o.push(a[r]);
			else {
				let e = t - r;
				o.push(a[r] * (1 - e) + a[r + 1] * e);
			}
		}
		o.push(i);
	} else if (t.substr(0, 1) === "k") {
		let e, t = a.length, s = Array(t), c = Array(n), l = !0, u = 0, d = null;
		d = [], d.push(r);
		for (let e = 1; e < n; e++) d.push(r + e / n * (i - r));
		for (d.push(i); l;) {
			for (let e = 0; e < n; e++) c[e] = 0;
			for (let e = 0; e < t; e++) {
				let t = a[e], r = Number.MAX_VALUE, i;
				for (let a = 0; a < n; a++) {
					let n = yx(d[a] - t);
					n < r && (r = n, i = a), c[i]++, s[e] = i;
				}
			}
			let r = Array(n);
			for (let e = 0; e < n; e++) r[e] = null;
			for (let n = 0; n < t; n++) e = s[n], r[e] === null ? r[e] = a[n] : r[e] += a[n];
			for (let e = 0; e < n; e++) r[e] *= 1 / c[e];
			l = !1;
			for (let e = 0; e < n; e++) if (r[e] !== d[e]) {
				l = !0;
				break;
			}
			d = r, u++, u > 200 && (l = !1);
		}
		let f = {};
		for (let e = 0; e < n; e++) f[e] = [];
		for (let n = 0; n < t; n++) e = s[n], f[e].push(a[n]);
		let p = [];
		for (let e = 0; e < n; e++) p.push(f[e][0]), p.push(f[e][f[e].length - 1]);
		p = p.sort((e, t) => e - t), o.push(p[0]);
		for (let e = 1; e < p.length; e += 2) {
			let t = p[e];
			!isNaN(t) && o.indexOf(t) === -1 && o.push(t);
		}
	}
	return o;
}
//#endregion
//#region node_modules/chroma-js/src/utils/contrast.js
var Sx = (e, t) => {
	e = new Q(e), t = new Q(t);
	let n = e.luminance(), r = t.luminance();
	return n > r ? (n + .05) / (r + .05) : (r + .05) / (n + .05);
}, Cx = .027, wx = 5e-4, Tx = .1, Ex = 1.14, Dx = .022, Ox = 1.414, kx = (e, t) => {
	e = new Q(e), t = new Q(t), e.alpha() < 1 && (e = ob(t, e, e.alpha(), "rgb"));
	let n = Ax(...e.rgb()), r = Ax(...t.rgb()), i = n >= Dx ? n : n + (Dx - n) ** +Ox, a = r >= Dx ? r : r + (Dx - r) ** +Ox, o = a ** .56 - i ** .57, s = a ** .65 - i ** .62, c = Math.abs(a - i) < wx ? 0 : i < a ? o * Ex : s * Ex;
	return (Math.abs(c) < Tx ? 0 : c > 0 ? c - Cx : c + Cx) * 100;
};
function Ax(e, t, n) {
	return .2126729 * (e / 255) ** 2.4 + .7151522 * (t / 255) ** 2.4 + .072175 * (n / 255) ** 2.4;
}
//#endregion
//#region node_modules/chroma-js/src/utils/delta-e.js
var { sqrt: jx, pow: Mx, min: Nx, max: Px, atan2: Fx, abs: Ix, cos: Lx, sin: Rx, exp: zx, PI: Bx } = Math;
function Vx(e, t, n = 1, r = 1, i = 1) {
	var a = function(e) {
		return 360 * e / (2 * Bx);
	}, o = function(e) {
		return 2 * Bx * e / 360;
	};
	e = new Q(e), t = new Q(t);
	let [s, c, l] = Array.from(e.lab()), [u, d, f] = Array.from(t.lab()), p = (s + u) / 2, m = (jx(Mx(c, 2) + Mx(l, 2)) + jx(Mx(d, 2) + Mx(f, 2))) / 2, h = .5 * (1 - jx(Mx(m, 7) / (Mx(m, 7) + Mx(25, 7)))), g = c * (1 + h), _ = d * (1 + h), v = jx(Mx(g, 2) + Mx(l, 2)), y = jx(Mx(_, 2) + Mx(f, 2)), b = (v + y) / 2, x = a(Fx(l, g)), S = a(Fx(f, _)), C = x >= 0 ? x : x + 360, w = S >= 0 ? S : S + 360, T = Ix(C - w) > 180 ? (C + w + 360) / 2 : (C + w) / 2, E = 1 - .17 * Lx(o(T - 30)) + .24 * Lx(o(2 * T)) + .32 * Lx(o(3 * T + 6)) - .2 * Lx(o(4 * T - 63)), D = w - C;
	D = Ix(D) <= 180 ? D : w <= C ? D + 360 : D - 360, D = 2 * jx(v * y) * Rx(o(D) / 2);
	let O = u - s, ee = y - v, te = 1 + .015 * Mx(p - 50, 2) / jx(20 + Mx(p - 50, 2)), ne = 1 + .045 * b, re = 1 + .015 * b * E, ie = 30 * zx(-Mx((T - 275) / 25, 2)), ae = -(2 * jx(Mx(b, 7) / (Mx(b, 7) + Mx(25, 7)))) * Rx(2 * o(ie));
	return Px(0, Nx(100, jx(Mx(O / (n * te), 2) + Mx(ee / (r * ne), 2) + Mx(D / (i * re), 2) + ae * (ee / (r * ne)) * (D / (i * re)))));
}
//#endregion
//#region node_modules/chroma-js/src/utils/distance.js
function Hx(e, t, n = "lab") {
	e = new Q(e), t = new Q(t);
	let r = e.get(n), i = t.get(n), a = 0;
	for (let e in r) {
		let t = (r[e] || 0) - (i[e] || 0);
		a += t * t;
	}
	return Math.sqrt(a);
}
//#endregion
//#region node_modules/chroma-js/src/utils/valid.js
var Ux = (...e) => {
	try {
		return new Q(...e), !0;
	} catch {
		return !1;
	}
}, Wx = {
	cool() {
		return $b([$.hsl(180, 1, .9), $.hsl(250, .7, .4)]);
	},
	hot() {
		return $b([
			"#000",
			"#f00",
			"#ff0",
			"#fff"
		], [
			0,
			.25,
			.75,
			1
		]).mode("rgb");
	}
}, Gx = {
	OrRd: [
		"#fff7ec",
		"#fee8c8",
		"#fdd49e",
		"#fdbb84",
		"#fc8d59",
		"#ef6548",
		"#d7301f",
		"#b30000",
		"#7f0000"
	],
	PuBu: [
		"#fff7fb",
		"#ece7f2",
		"#d0d1e6",
		"#a6bddb",
		"#74a9cf",
		"#3690c0",
		"#0570b0",
		"#045a8d",
		"#023858"
	],
	BuPu: [
		"#f7fcfd",
		"#e0ecf4",
		"#bfd3e6",
		"#9ebcda",
		"#8c96c6",
		"#8c6bb1",
		"#88419d",
		"#810f7c",
		"#4d004b"
	],
	Oranges: [
		"#fff5eb",
		"#fee6ce",
		"#fdd0a2",
		"#fdae6b",
		"#fd8d3c",
		"#f16913",
		"#d94801",
		"#a63603",
		"#7f2704"
	],
	BuGn: [
		"#f7fcfd",
		"#e5f5f9",
		"#ccece6",
		"#99d8c9",
		"#66c2a4",
		"#41ae76",
		"#238b45",
		"#006d2c",
		"#00441b"
	],
	YlOrBr: [
		"#ffffe5",
		"#fff7bc",
		"#fee391",
		"#fec44f",
		"#fe9929",
		"#ec7014",
		"#cc4c02",
		"#993404",
		"#662506"
	],
	YlGn: [
		"#ffffe5",
		"#f7fcb9",
		"#d9f0a3",
		"#addd8e",
		"#78c679",
		"#41ab5d",
		"#238443",
		"#006837",
		"#004529"
	],
	Reds: [
		"#fff5f0",
		"#fee0d2",
		"#fcbba1",
		"#fc9272",
		"#fb6a4a",
		"#ef3b2c",
		"#cb181d",
		"#a50f15",
		"#67000d"
	],
	RdPu: [
		"#fff7f3",
		"#fde0dd",
		"#fcc5c0",
		"#fa9fb5",
		"#f768a1",
		"#dd3497",
		"#ae017e",
		"#7a0177",
		"#49006a"
	],
	Greens: [
		"#f7fcf5",
		"#e5f5e0",
		"#c7e9c0",
		"#a1d99b",
		"#74c476",
		"#41ab5d",
		"#238b45",
		"#006d2c",
		"#00441b"
	],
	YlGnBu: [
		"#ffffd9",
		"#edf8b1",
		"#c7e9b4",
		"#7fcdbb",
		"#41b6c4",
		"#1d91c0",
		"#225ea8",
		"#253494",
		"#081d58"
	],
	Purples: [
		"#fcfbfd",
		"#efedf5",
		"#dadaeb",
		"#bcbddc",
		"#9e9ac8",
		"#807dba",
		"#6a51a3",
		"#54278f",
		"#3f007d"
	],
	GnBu: [
		"#f7fcf0",
		"#e0f3db",
		"#ccebc5",
		"#a8ddb5",
		"#7bccc4",
		"#4eb3d3",
		"#2b8cbe",
		"#0868ac",
		"#084081"
	],
	Greys: [
		"#ffffff",
		"#f0f0f0",
		"#d9d9d9",
		"#bdbdbd",
		"#969696",
		"#737373",
		"#525252",
		"#252525",
		"#000000"
	],
	YlOrRd: [
		"#ffffcc",
		"#ffeda0",
		"#fed976",
		"#feb24c",
		"#fd8d3c",
		"#fc4e2a",
		"#e31a1c",
		"#bd0026",
		"#800026"
	],
	PuRd: [
		"#f7f4f9",
		"#e7e1ef",
		"#d4b9da",
		"#c994c7",
		"#df65b0",
		"#e7298a",
		"#ce1256",
		"#980043",
		"#67001f"
	],
	Blues: [
		"#f7fbff",
		"#deebf7",
		"#c6dbef",
		"#9ecae1",
		"#6baed6",
		"#4292c6",
		"#2171b5",
		"#08519c",
		"#08306b"
	],
	PuBuGn: [
		"#fff7fb",
		"#ece2f0",
		"#d0d1e6",
		"#a6bddb",
		"#67a9cf",
		"#3690c0",
		"#02818a",
		"#016c59",
		"#014636"
	],
	Viridis: [
		"#440154",
		"#482777",
		"#3f4a8a",
		"#31678e",
		"#26838f",
		"#1f9d8a",
		"#6cce5a",
		"#b6de2b",
		"#fee825"
	],
	Spectral: [
		"#9e0142",
		"#d53e4f",
		"#f46d43",
		"#fdae61",
		"#fee08b",
		"#ffffbf",
		"#e6f598",
		"#abdda4",
		"#66c2a5",
		"#3288bd",
		"#5e4fa2"
	],
	RdYlGn: [
		"#a50026",
		"#d73027",
		"#f46d43",
		"#fdae61",
		"#fee08b",
		"#ffffbf",
		"#d9ef8b",
		"#a6d96a",
		"#66bd63",
		"#1a9850",
		"#006837"
	],
	RdBu: [
		"#67001f",
		"#b2182b",
		"#d6604d",
		"#f4a582",
		"#fddbc7",
		"#f7f7f7",
		"#d1e5f0",
		"#92c5de",
		"#4393c3",
		"#2166ac",
		"#053061"
	],
	PiYG: [
		"#8e0152",
		"#c51b7d",
		"#de77ae",
		"#f1b6da",
		"#fde0ef",
		"#f7f7f7",
		"#e6f5d0",
		"#b8e186",
		"#7fbc41",
		"#4d9221",
		"#276419"
	],
	PRGn: [
		"#40004b",
		"#762a83",
		"#9970ab",
		"#c2a5cf",
		"#e7d4e8",
		"#f7f7f7",
		"#d9f0d3",
		"#a6dba0",
		"#5aae61",
		"#1b7837",
		"#00441b"
	],
	RdYlBu: [
		"#a50026",
		"#d73027",
		"#f46d43",
		"#fdae61",
		"#fee090",
		"#ffffbf",
		"#e0f3f8",
		"#abd9e9",
		"#74add1",
		"#4575b4",
		"#313695"
	],
	BrBG: [
		"#543005",
		"#8c510a",
		"#bf812d",
		"#dfc27d",
		"#f6e8c3",
		"#f5f5f5",
		"#c7eae5",
		"#80cdc1",
		"#35978f",
		"#01665e",
		"#003c30"
	],
	RdGy: [
		"#67001f",
		"#b2182b",
		"#d6604d",
		"#f4a582",
		"#fddbc7",
		"#ffffff",
		"#e0e0e0",
		"#bababa",
		"#878787",
		"#4d4d4d",
		"#1a1a1a"
	],
	PuOr: [
		"#7f3b08",
		"#b35806",
		"#e08214",
		"#fdb863",
		"#fee0b6",
		"#f7f7f7",
		"#d8daeb",
		"#b2abd2",
		"#8073ac",
		"#542788",
		"#2d004b"
	],
	Set2: [
		"#66c2a5",
		"#fc8d62",
		"#8da0cb",
		"#e78ac3",
		"#a6d854",
		"#ffd92f",
		"#e5c494",
		"#b3b3b3"
	],
	Accent: [
		"#7fc97f",
		"#beaed4",
		"#fdc086",
		"#ffff99",
		"#386cb0",
		"#f0027f",
		"#bf5b17",
		"#666666"
	],
	Set1: [
		"#e41a1c",
		"#377eb8",
		"#4daf4a",
		"#984ea3",
		"#ff7f00",
		"#ffff33",
		"#a65628",
		"#f781bf",
		"#999999"
	],
	Set3: [
		"#8dd3c7",
		"#ffffb3",
		"#bebada",
		"#fb8072",
		"#80b1d3",
		"#fdb462",
		"#b3de69",
		"#fccde5",
		"#d9d9d9",
		"#bc80bd",
		"#ccebc5",
		"#ffed6f"
	],
	Dark2: [
		"#1b9e77",
		"#d95f02",
		"#7570b3",
		"#e7298a",
		"#66a61e",
		"#e6ab02",
		"#a6761d",
		"#666666"
	],
	Paired: [
		"#a6cee3",
		"#1f78b4",
		"#b2df8a",
		"#33a02c",
		"#fb9a99",
		"#e31a1c",
		"#fdbf6f",
		"#ff7f00",
		"#cab2d6",
		"#6a3d9a",
		"#ffff99",
		"#b15928"
	],
	Pastel2: [
		"#b3e2cd",
		"#fdcdac",
		"#cbd5e8",
		"#f4cae4",
		"#e6f5c9",
		"#fff2ae",
		"#f1e2cc",
		"#cccccc"
	],
	Pastel1: [
		"#fbb4ae",
		"#b3cde3",
		"#ccebc5",
		"#decbe4",
		"#fed9a6",
		"#ffffcc",
		"#e5d8bd",
		"#fddaec",
		"#f2f2f2"
	]
}, Kx = Object.keys(Gx), qx = new Map(Kx.map((e) => [e.toLowerCase(), e])), Jx = typeof Proxy == "function" ? new Proxy(Gx, {
	get(e, t) {
		let n = t.toLowerCase();
		if (qx.has(n)) return e[qx.get(n)];
	},
	getOwnPropertyNames() {
		return Object.getOwnPropertyNames(Kx);
	}
}) : Gx, Yx = (...e) => {
	e = X(e, "cmyk");
	let [t, n, r, i] = e, a = e.length > 4 ? e[4] : 1;
	return i === 1 ? [
		0,
		0,
		0,
		a
	] : [
		t >= 1 ? 0 : 255 * (1 - t) * (1 - i),
		n >= 1 ? 0 : 255 * (1 - n) * (1 - i),
		r >= 1 ? 0 : 255 * (1 - r) * (1 - i),
		a
	];
}, { max: Xx } = Math, Zx = (...e) => {
	let [t, n, r] = X(e, "rgb");
	t /= 255, n /= 255, r /= 255;
	let i = 1 - Xx(t, Xx(n, r)), a = i < 1 ? 1 / (1 - i) : 0;
	return [
		(1 - t - i) * a,
		(1 - n - i) * a,
		(1 - r - i) * a,
		i
	];
};
Q.prototype.cmyk = function() {
	return Zx(this._rgb);
}, Object.assign($, { cmyk: (...e) => new Q(...e, "cmyk") }), Z.format.cmyk = Yx, Z.autodetect.push({
	p: 2,
	test: (...e) => {
		if (e = X(e, "cmyk"), Y(e) === "array" && e.length === 4) return "cmyk";
	}
});
//#endregion
//#region node_modules/chroma-js/src/io/css/hsl2css.js
var Qx = (...e) => {
	let t = X(e, "hsla"), n = wy(e) || "lsa";
	return t[0] = Oy(t[0] || 0) + "deg", t[1] = Oy(t[1] * 100) + "%", t[2] = Oy(t[2] * 100) + "%", n === "hsla" || t.length > 3 && t[3] < 1 ? (t[3] = "/ " + (t.length > 3 ? t[3] : 1), n = "hsla") : t.length = 3, `${n.substr(0, 3)}(${t.join(" ")})`;
}, $x = (...e) => {
	let t = X(e, "lab"), n = wy(e) || "lab";
	return t[0] = Oy(t[0]) + "%", t[1] = Oy(t[1]), t[2] = Oy(t[2]), n === "laba" || t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `lab(${t.join(" ")})`;
}, eS = (...e) => {
	let t = X(e, "lch"), n = wy(e) || "lab";
	return t[0] = Oy(t[0]) + "%", t[1] = Oy(t[1]), t[2] = isNaN(t[2]) ? "none" : Oy(t[2]) + "deg", n === "lcha" || t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `lch(${t.join(" ")})`;
}, tS = (...e) => {
	let t = X(e, "lab");
	return t[0] = Oy(t[0] * 100) + "%", t[1] = ky(t[1]), t[2] = ky(t[2]), t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `oklab(${t.join(" ")})`;
}, nS = (...e) => {
	let [t, n, r, ...i] = X(e, "rgb"), [a, o, s] = Hb(t, n, r), [c, l, u] = hb(a, o, s);
	return [
		c,
		l,
		u,
		...i.length > 0 && i[0] < 1 ? [i[0]] : []
	];
}, rS = (...e) => {
	let t = X(e, "lch");
	return t[0] = Oy(t[0] * 100) + "%", t[1] = ky(t[1]), t[2] = isNaN(t[2]) ? "none" : Oy(t[2]) + "deg", t.length > 3 && t[3] < 1 ? t[3] = "/ " + (t.length > 3 ? t[3] : 1) : t.length = 3, `oklch(${t.join(" ")})`;
}, { round: iS } = Math, aS = (...e) => {
	let t = X(e, "rgba"), n = wy(e) || "rgb";
	if (n.substr(0, 3) === "hsl") return Qx(Nb(t), n);
	if (n.substr(0, 3) === "lab") {
		let e = Gy();
		Wy("d50");
		let r = $x(Xy(t), n);
		return Wy(e), r;
	}
	if (n.substr(0, 3) === "lch") {
		let e = Gy();
		Wy("d50");
		let r = eS(gb(t), n);
		return Wy(e), r;
	}
	return n.substr(0, 5) === "oklab" ? tS(Hb(t)) : n.substr(0, 5) === "oklch" ? rS(nS(t)) : (t[0] = iS(t[0]), t[1] = iS(t[1]), t[2] = iS(t[2]), (n === "rgba" || t.length > 3 && t[3] < 1) && (t[3] = "/ " + (t.length > 3 ? t[3] : 1), n = "rgba"), `${n.substr(0, 3)}(${t.slice(0, n === "rgb" ? 3 : 4).join(" ")})`);
}, oS = (...e) => {
	e = X(e, "lch");
	let [t, n, r, ...i] = e, [a, o, s] = lb(t, n, r), [c, l, u] = Bb(a, o, s);
	return [
		c,
		l,
		u,
		...i.length > 0 && i[0] < 1 ? [i[0]] : []
	];
}, sS = "((?:-?\\d+)|(?:-?\\d+(?:\\.\\d+)?)%|none)", cS = "((?:-?(?:\\d+(?:\\.\\d*)?|\\.\\d+)%?)|none)", lS = "((?:-?(?:\\d+(?:\\.\\d*)?|\\.\\d+)%)|none)", uS = "\\s*", dS = "\\s+", fS = "\\s*,\\s*", pS = "((?:-?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:deg)?)|none)", mS = "\\s*(?:\\/\\s*((?:[01]|[01]?\\.\\d+)|\\d+(?:\\.\\d+)?%))?", hS = RegExp("^rgba?\\(" + uS + [
	sS,
	sS,
	sS
].join(dS) + mS + "\\)$"), gS = RegExp("^rgb\\(" + uS + [
	sS,
	sS,
	sS
].join(fS) + uS + "\\)$"), _S = RegExp("^rgba\\(" + uS + [
	sS,
	sS,
	sS,
	cS
].join(fS) + uS + "\\)$"), vS = RegExp("^hsla?\\(" + uS + [
	pS,
	lS,
	lS
].join(dS) + mS + "\\)$"), yS = RegExp("^hsl?\\(" + uS + [
	pS,
	lS,
	lS
].join(fS) + uS + "\\)$"), bS = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/, xS = RegExp("^lab\\(" + uS + [
	cS,
	cS,
	cS
].join(dS) + mS + "\\)$"), SS = RegExp("^lch\\(" + uS + [
	cS,
	cS,
	pS
].join(dS) + mS + "\\)$"), CS = RegExp("^oklab\\(" + uS + [
	cS,
	cS,
	cS
].join(dS) + mS + "\\)$"), wS = RegExp("^oklch\\(" + uS + [
	cS,
	cS,
	pS
].join(dS) + mS + "\\)$"), { round: TS } = Math, ES = (e) => e.map((e, t) => t <= 2 ? xy(TS(e), 0, 255) : e), DS = (e, t = 0, n = 100, r = !1) => (typeof e == "string" && e.endsWith("%") && (e = parseFloat(e.substring(0, e.length - 1)) / 100, e = r ? t + (e + 1) * .5 * (n - t) : t + e * (n - t)), +e), OS = (e, t) => e === "none" ? t : e, kS = (e) => {
	if (e = e.toLowerCase().trim(), e === "transparent") return [
		0,
		0,
		0,
		0
	];
	let t;
	if (Z.format.named) try {
		return Z.format.named(e);
	} catch {}
	if ((t = e.match(hS)) || (t = e.match(gS))) {
		let e = t.slice(1, 4);
		for (let t = 0; t < 3; t++) e[t] = +DS(OS(e[t], 0), 0, 255);
		e = ES(e);
		let n = t[4] === void 0 ? 1 : +DS(t[4], 0, 1);
		return e[3] = n, e;
	}
	if (t = e.match(_S)) {
		let e = t.slice(1, 5);
		for (let t = 0; t < 4; t++) e[t] = +DS(e[t], 0, 255);
		return e;
	}
	if ((t = e.match(vS)) || (t = e.match(yS))) {
		let e = t.slice(1, 4);
		e[0] = +OS(e[0].replace("deg", ""), 0), e[1] = DS(OS(e[1], 0), 0, 100) * .01, e[2] = DS(OS(e[2], 0), 0, 100) * .01;
		let n = ES(Mb(e));
		return n[3] = t[4] === void 0 ? 1 : +DS(t[4], 0, 1), n;
	}
	if (t = e.match(bS)) {
		let e = t.slice(1, 4);
		e[1] *= .01, e[2] *= .01;
		let n = Mb(e);
		for (let e = 0; e < 3; e++) n[e] = TS(n[e]);
		return n[3] = +t[4], n;
	}
	if (t = e.match(xS)) {
		let e = t.slice(1, 4);
		e[0] = DS(OS(e[0], 0), 0, 100), e[1] = DS(OS(e[1], 0), -125, 125, !0), e[2] = DS(OS(e[2], 0), -125, 125, !0);
		let n = Gy();
		Wy("d50");
		let r = ES(Ky(e));
		return Wy(n), r[3] = t[4] === void 0 ? 1 : +DS(t[4], 0, 1), r;
	}
	if (t = e.match(SS)) {
		let e = t.slice(1, 4);
		e[0] = DS(e[0], 0, 100), e[1] = DS(OS(e[1], 0), 0, 150, !1), e[2] = +OS(e[2].replace("deg", ""), 0);
		let n = Gy();
		Wy("d50");
		let r = ES(ub(e));
		return Wy(n), r[3] = t[4] === void 0 ? 1 : +DS(t[4], 0, 1), r;
	}
	if (t = e.match(CS)) {
		let e = t.slice(1, 4);
		e[0] = DS(OS(e[0], 0), 0, 1), e[1] = DS(OS(e[1], 0), -.4, .4, !0), e[2] = DS(OS(e[2], 0), -.4, .4, !0);
		let n = ES(Bb(e));
		return n[3] = t[4] === void 0 ? 1 : +DS(t[4], 0, 1), n;
	}
	if (t = e.match(wS)) {
		let e = t.slice(1, 4);
		e[0] = DS(OS(e[0], 0), 0, 1), e[1] = DS(OS(e[1], 0), 0, .4, !1), e[2] = +OS(e[2].replace("deg", ""), 0);
		let n = ES(oS(e));
		return n[3] = t[4] === void 0 ? 1 : +DS(t[4], 0, 1), n;
	}
};
kS.test = (e) => hS.test(e) || vS.test(e) || xS.test(e) || SS.test(e) || CS.test(e) || wS.test(e) || gS.test(e) || _S.test(e) || yS.test(e) || bS.test(e) || e === "transparent", Q.prototype.css = function(e) {
	return aS(this._rgb, e);
}, $.css = (...e) => new Q(...e, "css"), Z.format.css = kS, Z.autodetect.push({
	p: 5,
	test: (e, ...t) => {
		if (!t.length && Y(e) === "string" && kS.test(e)) return "css";
	}
}), Z.format.gl = (...e) => {
	let t = X(e, "rgba");
	return t[0] *= 255, t[1] *= 255, t[2] *= 255, t;
}, $.gl = (...e) => new Q(...e, "gl"), Q.prototype.gl = function() {
	let e = this._rgb;
	return [
		e[0] / 255,
		e[1] / 255,
		e[2] / 255,
		e[3]
	];
}, Q.prototype.hex = function(e) {
	return Vy(this._rgb, e);
}, $.hex = (...e) => new Q(...e, "hex"), Z.format.hex = zy, Z.autodetect.push({
	p: 4,
	test: (e, ...t) => {
		if (!t.length && Y(e) === "string" && [
			3,
			4,
			5,
			6,
			7,
			8,
			9
		].indexOf(e.length) >= 0) return "hex";
	}
});
//#endregion
//#region node_modules/chroma-js/src/io/temp/temperature2rgb.js
var { log: AS } = Math, jS = (e) => {
	let t = e / 100, n, r, i;
	return t < 66 ? (n = 255, r = t < 6 ? 0 : -155.25485562709179 - .44596950469579133 * (r = t - 2) + 104.49216199393888 * AS(r), i = t < 20 ? 0 : -254.76935184120902 + .8274096064007395 * (i = t - 10) + 115.67994401066147 * AS(i)) : (n = 351.97690566805693 + .114206453784165 * (n = t - 55) - 40.25366309332127 * AS(n), r = 325.4494125711974 + .07943456536662342 * (r = t - 50) - 28.0852963507957 * AS(r), i = 255), [
		n,
		r,
		i,
		1
	];
}, { round: MS } = Math, NS = (...e) => {
	let t = X(e, "rgb"), n = t[0], r = t[2], i = 1e3, a = 4e4, o;
	for (; a - i > .4;) {
		o = (a + i) * .5;
		let e = jS(o);
		e[2] / e[0] >= r / n ? a = o : i = o;
	}
	return MS(o);
};
//#endregion
//#region node_modules/chroma-js/src/io/temp/index.js
Q.prototype.temp = Q.prototype.kelvin = Q.prototype.temperature = function() {
	return NS(this._rgb);
};
var PS = (...e) => new Q(...e, "temp");
//#endregion
//#region node_modules/chroma-js/index.js
Object.assign($, {
	temp: PS,
	kelvin: PS,
	temperature: PS
}), Z.format.temp = Z.format.kelvin = Z.format.temperature = jS, Q.prototype.oklch = function() {
	return nS(this._rgb);
}, Object.assign($, { oklch: (...e) => new Q(...e, "oklch") }), Z.format.oklch = oS, Z.autodetect.push({
	p: 2,
	test: (...e) => {
		if (e = X(e, "oklch"), Y(e) === "array" && e.length === 3) return "oklch";
	}
}), Object.assign($, {
	analyze: bx,
	average: Xb,
	bezier: rx,
	blend: ax,
	brewer: Jx,
	Color: Q,
	colors: Iy,
	contrast: Sx,
	contrastAPCA: kx,
	cubehelix: dx,
	deltaE: Vx,
	distance: Hx,
	input: Z,
	interpolate: ob,
	limits: xx,
	mix: ob,
	random: hx,
	scale: $b,
	scales: Wx,
	valid: Ux
});
var FS = $, IS = {
	light: {
		"dsfr-chart-colors-01": "#5C68E5",
		"dsfr-chart-colors-02": "#82B5F2",
		"dsfr-chart-colors-03": "#29598F",
		"dsfr-chart-colors-04": "#31A7AE",
		"dsfr-chart-colors-05": "#81EEF5",
		"dsfr-chart-colors-06": "#B478F1",
		"dsfr-chart-colors-07": "#CFB1F5",
		"dsfr-chart-colors-08": "#CECECE",
		"dsfr-chart-colors-09": "#DBDAFF",
		"dsfr-chart-colors-10": "#00005F",
		"dsfr-chart-colors-11": "#298641",
		"dsfr-chart-colors-12": "#79D289",
		"dsfr-chart-colors-13": "#EFB900",
		"dsfr-chart-colors-14": "#FFA373",
		"dsfr-chart-colors-15": "#E91719",
		"dsfr-chart-colors-default": "#5C68E5",
		"dsfr-chart-colors-neutral": "#B1B1B1"
	},
	dark: {
		"dsfr-chart-colors-01": "#5C68E5",
		"dsfr-chart-colors-02": "#699BD6",
		"dsfr-chart-colors-03": "#4878B1",
		"dsfr-chart-colors-04": "#00828A",
		"dsfr-chart-colors-05": "#51C1C8",
		"dsfr-chart-colors-06": "#BC8AF2",
		"dsfr-chart-colors-07": "#CFB1F5",
		"dsfr-chart-colors-08": "#A4A4A4",
		"dsfr-chart-colors-09": "#B8B9FF",
		"dsfr-chart-colors-10": "#3647CA",
		"dsfr-chart-colors-11": "#298641",
		"dsfr-chart-colors-12": "#449D57",
		"dsfr-chart-colors-13": "#AF8800",
		"dsfr-chart-colors-14": "#FFA373",
		"dsfr-chart-colors-15": "#E16834",
		"dsfr-chart-colors-default": "#5C68E5",
		"dsfr-chart-colors-neutral": "#808080"
	}
};
//#endregion
//#region src/utils/colors.js
function LS({ yparse: e = [], tmpColorParse: t = [], highlightIndex: n = [], selectedPalette: r = "" }) {
	let i = [], a = [], o = YS(r);
	for (let s = 0; s < e.length; s++) {
		let c = e[s], l = [], u = [];
		if (t[s]) {
			let e = t[s], n = c && c.length ? c.length : 1;
			l = Array(n).fill(e), u = l.map((e) => FS(e).darken(.8).hex());
		} else if (r === "neutral" && n.length > 0 && Array.isArray(c)) {
			let e = c && c.length ? c.length : 1;
			for (let t = 0; t < e; t++) {
				let e = n.includes(t) ? qS() : JS();
				l.push(e), u.push(FS(e).darken(.8).hex());
			}
		} else if (r.startsWith("divergent")) {
			let e = c && c.length ? c.length : 1;
			l = Array(e).fill(o[s % o.length]), u = l.map((e) => FS(e).darken(.8).hex());
		} else if (r === "categorical" || !r) {
			let e = KS(s, o), t = c && c.length ? c.length : 1;
			l = Array(t).fill(e), u = l.map((e) => FS(e).darken(.8).hex());
		} else {
			let t = e.flat(), n = Math.min(...t), r = Math.max(...t), i = FS.scale(o).domain([r, n]);
			l = (c || [n]).map((e) => FS(i(e)).hex()), u = l.map((e) => FS(e).darken(.8).hex());
		}
		i.push(l), a.push(u);
	}
	return {
		colorParse: i,
		colorHover: a,
		legendColors: i.map((e) => e[0])
	};
}
function RS({ vlineParse: e = [], hlineParse: t = [], tmpVlineColorParse: n = [], tmpHlineColorParse: r = [], selectedPalette: i = "" }) {
	let a = YS(i), o = [KS(0, a)], s = [FS(o[0]).darken(.8).hex()], c = [KS(1, a)];
	return {
		colorBarParse: o,
		colorBarHover: s,
		colorParse: c,
		colorHover: [FS(c[0]).darken(.8).hex()],
		vlineColorParse: e.map((e, t) => n[t] || JS()),
		hlineColorParse: t.map((e, t) => r[t] || JS())
	};
}
function zS({ yparse: e = [], tmpColorParse: t = [], selectedPalette: n = "", highlightIndex: r = -1, vlineParse: i = [], tmpVlineColorParse: a = [], hlineParse: o = [], tmpHlineColorParse: s = [] }) {
	let c = YS(n), l = [], u = [];
	for (let n = 0; n < e.length; n++) {
		let e;
		e = t[n] ? t[n] : n === r ? JS() : KS(n, c), l.push(e), u.push(FS(e).darken(.8).hex());
	}
	return {
		colorParse: l,
		colorHover: u,
		vlineColorParse: i.map((e, t) => a[t] || JS()),
		hlineColorParse: o.map((e, t) => s[t] || JS())
	};
}
function BS() {
	return IS[document.documentElement.getAttribute("data-fr-theme") || "light"] || IS.light;
}
function VS() {
	let e = BS();
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
function HS() {
	let e = BS();
	return FS.scale([e["dsfr-chart-colors-09"], e["dsfr-chart-colors-10"]]).colors(10);
}
function US() {
	let e = BS();
	return FS.scale([e["dsfr-chart-colors-10"], e["dsfr-chart-colors-09"]]).colors(10);
}
function WS() {
	let e = BS();
	return FS.scale([
		e["dsfr-chart-colors-11"],
		e["dsfr-chart-colors-13"],
		e["dsfr-chart-colors-15"]
	]).colors(4);
}
function GS() {
	let e = BS();
	return FS.scale([
		e["dsfr-chart-colors-15"],
		e["dsfr-chart-colors-13"],
		e["dsfr-chart-colors-11"]
	]).colors(4);
}
function KS(e, t = VS()) {
	return t[e % t.length];
}
function qS() {
	return BS()["dsfr-chart-colors-default"];
}
function JS() {
	return BS()["dsfr-chart-colors-neutral"];
}
function YS(e) {
	switch (e) {
		case "default": return [qS()];
		case "neutral": return [JS()];
		case "categorical": return VS();
		case "sequentialAscending": return HS();
		case "sequentialDescending": return US();
		case "divergentAscending": return WS();
		case "divergentDescending": return GS();
		default: return VS();
	}
}
//#endregion
//#region src/components/BarChart.vue
J.register(dp, rg);
var XS = {
	name: "BarChart",
	mixins: [lv],
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
		subX: {
			type: String,
			default: null
		},
		subY: {
			type: String,
			default: null
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
			type: [Array, String],
			default: () => []
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
			selectedIndex: -1,
			datasets: [],
			labels: [],
			xparse: [],
			yparse: [],
			subXParse: [],
			subYParse: [],
			nameParse: [],
			tmpColorParse: [],
			colorParse: [],
			colorHover: [],
			legendColors: [],
			isSubChart: !1,
			isSubLevel: !1,
			subTitle: null,
			targetReady: !1
		};
	},
	watch: {
		$props: {
			handler() {
				this.chartId && (this.resetData(), this.getData(), this.createChart());
			},
			deep: !0,
			immediate: !0
		},
		targetReady(e) {
			e && this.$nextTick(() => {
				this.resetData(), this.createChart();
			});
		}
	},
	created() {
		cv(), this.chartId = `dsfr-chart-${Math.floor(Math.random() * 1e3)}`, this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1e3)}`;
	},
	mounted() {
		if (!this.databoxId || !this.databoxType) this.resetData(), this.createChart();
		else {
			let e = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
			document.getElementById(e) ? this.targetReady = !0 : (this._targetObserver = new MutationObserver(() => {
				document.getElementById(e) && (this._targetObserver.disconnect(), this.targetReady = !0);
			}), this._targetObserver.observe(document.body, {
				childList: !0,
				subtree: !0
			}));
		}
		document.documentElement.addEventListener("dsfr.theme", (e) => {
			this.chartId !== "" && this.changeColors(e.detail.theme);
		});
	},
	beforeUnmount() {
		this._targetObserver && this._targetObserver.disconnect();
	},
	methods: {
		resetData() {
			this.chart && this.chart.destroy(), this.datasets = [], this.labels = [], this.xparse = [], this.yparse = [], this.subXParse = [], this.subYParse = [], this.nameParse = [], this.tmpColorParse = [], this.highlightIndexParse = [], this.colorParse = [], this.colorHover = [];
		},
		getData() {
			try {
				this.xparse = JSON.parse(this.x), this.yparse = JSON.parse(this.y), this.subXParse = JSON.parse(this.subX), this.subYParse = JSON.parse(this.subY);
			} catch (e) {
				console.error("Erreur lors du parsing des données x ou y:", e);
				return;
			}
			this.subXParse && this.subYParse && (this.isSubChart = !0);
			let e = [];
			if (this.name) try {
				e = JSON.parse(this.name);
			} catch (e) {
				console.error("Erreur lors du parsing de name:", e);
			}
			this.nameParse = [];
			for (let t = 0; t < this.yparse.length; t++) e[t] ? this.nameParse.push(e[t]) : this.nameParse.push(`Série ${t + 1}`);
			this.labels = this.xparse[0], this.loadColors(), this.datasets = this.yparse.map((e, t) => ({
				data: e,
				borderColor: this.colorParse[t],
				backgroundColor: this.colorParse[t],
				hoverBorderColor: this.colorHover[t],
				hoverBackgroundColor: this.colorHover[t],
				barThickness: this.barSize,
				...this.maxBarSize ? { maxBarThickness: this.maxBarSize } : {}
			}));
		},
		choosePalette() {
			return YS(this.selectedPalette);
		},
		loadColors() {
			try {
				this.highlightIndexParse = Array.isArray(this.highlightIndex) ? this.highlightIndex : JSON.parse(this.highlightIndex);
			} catch (e) {
				console.error("Erreur lors du parsing des données highlight-index:", e), this.highlightIndexParse = [];
			}
			let { colorParse: e, colorHover: t, legendColors: n } = LS({
				yparse: this.yparse,
				tmpColorParse: this.tmpColorParse,
				highlightIndex: this.highlightIndexParse,
				selectedPalette: this.selectedPalette
			});
			this.colorParse = e, this.colorHover = t, this.legendColors = n;
		},
		createChart() {
			this.chart && this.chart.destroy(), this.getData();
			let e = this.$refs[this.chartId].getContext("2d");
			this.chart = new J(e, {
				type: "bar",
				data: {
					labels: this.labels,
					datasets: this.datasets
				},
				options: {
					indexAxis: [
						!0,
						"true",
						""
					].includes(this.horizontal) ? "y" : "x",
					aspectRatio: this.aspectRatio,
					scales: {
						x: {
							offset: ![
								!0,
								"true",
								""
							].includes(this.horizontal),
							stacked: [
								!0,
								"true",
								""
							].includes(this.stacked),
							grid: {
								drawTicks: !1,
								drawOnChartArea: [
									!0,
									"true",
									""
								].includes(this.horizontal)
							},
							ticks: { padding: [
								!0,
								"true",
								""
							].includes(this.horizontal) ? 5 : 15 },
							...this.xMin ? { suggestedMin: this.xMin } : {},
							...this.xMax ? { suggestedMax: this.xMax } : {}
						},
						y: {
							stacked: [
								!0,
								"true",
								""
							].includes(this.stacked),
							offset: [
								!0,
								"true",
								""
							].includes(this.horizontal),
							grid: {
								drawTicks: !1,
								drawOnChartArea: ![
									!0,
									"true",
									""
								].includes(this.horizontal)
							},
							border: { dash: [3] },
							ticks: {
								autoSkip: !1,
								padding: 5
							},
							...this.yMin ? { suggestedMin: this.yMin } : {},
							...this.yMax ? { suggestedMax: this.yMax } : {}
						}
					},
					plugins: {
						legend: { display: !1 },
						tooltip: {
							enabled: !1,
							mode: "index",
							displayColors: !1,
							backgroundColor: "#6b6b6b",
							callbacks: {
								label: (e) => this.datasets.map((t) => this.formatNumber(t.data[e.dataIndex])),
								title: (e) => e[0].label,
								labelTextColor: () => this.colorParse
							},
							external: (e) => {
								let t = (document.getElementById(`${this.databoxId}-${this.databoxType}-${this.databoxSource}`) || this.$el.nextElementSibling).querySelector(".tooltip"), n = e.tooltip;
								if (!t) return;
								if (!n || n.opacity === 0) {
									t.style.opacity = 0;
									return;
								}
								if (t.classList.remove("above", "below", "no-transform"), n.yAlign ? t.classList.add(n.yAlign) : t.classList.add("no-transform"), n.body) {
									let e = n.title || [], r = [n.body.map((e) => e.lines).flat()], i = t.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
									i.innerText = e[0];
									let a = t.querySelector(".tooltip_value");
									a.innerHTML = "", r[0].forEach((e, t) => {
										if (e && e !== "NaN" && n.dataPoints[t]) {
											let { datasetIndex: r, dataIndex: i } = n.dataPoints[t], o = this.colorParse[r] ? this.colorParse[r][i] : "#000", s = `${e}${this.unitTooltip ? ` ${this.unitTooltip}` : ""}`;
											a.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" data-color="${o}"></span>
                          <p class="tooltip_place fr-mb-0">${s}</p>
                        </div>
                      `, a.querySelectorAll(".tooltip_dot").forEach((e) => {
												e.style.backgroundColor = e.getAttribute("data-color");
											});
										}
									});
								}
								let { offsetLeft: r, offsetTop: i } = this.chart.canvas, a = Number(this.chart.canvas.style.width.replace(/\D/g, "")), o = Number(this.chart.canvas.style.height.replace(/\D/g, "")), s = r + n.caretX + 10, c = i + n.caretY - 20;
								s + t.clientWidth > r + a && (s = r + n.caretX - t.clientWidth - 10), c + t.clientHeight > i + .9 * o && (c = i + n.caretY - t.clientHeight + 20), s < r && (s = r + n.caretX - t.clientWidth / 2, c = i + n.caretY - t.clientHeight - 20), t.style.position = "absolute", t.style.padding = `${n.padding}px ${n.padding}px`, t.style.pointerEvents = "none", t.style.left = `${s}px`, t.style.top = `${c}px`, t.style.opacity = 1;
							}
						}
					},
					onClick: (e) => {
						if (!this.subYParse) return;
						let t = this.chart.getElementsAtEventForMode(e, "nearest", { intersect: !0 }, !0);
						if (t.length > 0) {
							let { index: e } = t[0], n = this.chart.data.labels[e];
							if (!this.subYParse[e]) return;
							this.subTitle ||= n, this.subYParse[e] && !this.isSubLevel && (this.updateChart(e), this.isSubLevel = !0, this.selectedIndex = e);
						}
					}
				}
			});
		},
		changeColors(e) {
			this.loadColors(), this.chart.data.datasets.forEach((e, t) => {
				e.borderColor = this.colorParse[t], e.backgroundColor = this.colorParse[t], e.hoverBorderColor = this.colorHover[t], e.hoverBackgroundColor = this.colorHover[t];
			}), this.chart.options.scales.x.ticks.color = e === "dark" ? "#cecece" : J.defaults.color, this.chart.options.scales.y.ticks.color = e === "dark" ? "#cecece" : J.defaults.color, this.chart.update("none");
		},
		updateChart(e) {
			let t = this.subYParse[e];
			!t || t.length === 0 || (this.chart.data.labels = this.subXParse[e], this.chart.data.datasets[0].data = this.subYParse[e], this.chart.update());
		},
		resetSub() {
			this.isSubLevel = !1, this.subTitle = null, this.chart.data.labels = this.xparse[0], this.chart.data.datasets[0].data = this.yparse[0], this.chart.update(), this.selectedIndex = -1;
		}
	}
}, ZS = ["data-index", "data-sub-chart"], QS = { class: "fr-col-12" }, $S = { class: "chart" }, eC = {
	key: 1,
	class: "fr-mb-0"
}, tC = ["aria-labelledby", "aria-label"], nC = { class: "chart_legend fr-mb-0 fr-mt-4v" }, rC = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, iC = {
	key: 1,
	class: "flex fr-mt-1w"
}, aC = { class: "fr-text--xs" };
function oC(e, t, n, r, i, a) {
	return !n.databoxId || i.targetReady ? (P(), ia(er, {
		key: 0,
		to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource,
		disabled: !n.databoxId
	}, [I("div", {
		ref: i.widgetId,
		class: "widget_container fr-grid-row",
		"data-index": i.selectedIndex,
		"data-sub-chart": i.isSubChart
	}, [I("div", QS, [I("div", $S, [
		t[1] ||= I("div", { class: "tooltip" }, [I("div", { class: "tooltip_header fr-text--sm fr-mb-0" }), I("div", { class: "tooltip_body" }, [I("div", { class: "tooltip_value" })])], -1),
		i.isSubChart ? (P(), F("div", {
			key: 0,
			class: he(i.isSubLevel ? "" : "fr-mt-6v"),
			style: {
				textAlign: "center",
				position: "relative"
			}
		}, [i.isSubLevel ? (P(), F("button", {
			key: 0,
			class: "fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w",
			style: {
				position: "absolute",
				left: 0
			},
			onClick: t[0] ||= (...e) => a.resetSub && a.resetSub(...e)
		}, " Retour ")) : R("", !0), i.subTitle ? (P(), F("p", eC, A(i.subTitle), 1)) : R("", !0)], 2)) : R("", !0),
		I("canvas", {
			ref: i.chartId,
			role: "img",
			"aria-labelledby": n.databoxId ? "title-" + n.databoxId : null,
			"aria-label": n.databoxId ? null : "Graphique en barres"
		}, null, 8, tC),
		I("div", nC, [(P(!0), F(N, null, Fr(i.nameParse, (t, n) => (P(), F("div", {
			key: n,
			class: "flex fr-mt-3v fr-mb-1v"
		}, [I("span", {
			class: "legend_dot",
			style: k({ "background-color": i.legendColors[n] })
		}, null, 4), I("p", rC, A(e.capitalize(t)), 1)]))), 128))]),
		n.date ? (P(), F("div", iC, [I("p", aC, "Mise à jour : " + A(n.date), 1)])) : R("", !0)
	])])], 8, ZS)], 8, ["to", "disabled"])) : R("", !0);
}
var sC = /*#__PURE__*/ Sv(XS, [["render", oC]]);
//#endregion
//#region src/components/BarLineChart.vue
J.register(mp, Gh);
var cC = {
	name: "BarLineChart",
	mixins: [lv],
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
			default: ""
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
			colorBarHover: [],
			targetReady: !1
		};
	},
	watch: {
		$props: {
			handler() {
				this.chartId && (this.resetData(), this.getData(), this.createChart());
			},
			deep: !0,
			immediate: !0
		},
		targetReady(e) {
			e && this.$nextTick(() => {
				this.resetData(), this.createChart();
			});
		}
	},
	created() {
		cv(), this.chartId = `dsfr-chart-${Math.floor(Math.random() * 1e3)}`, this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1e3)}`;
	},
	mounted() {
		if (!this.databoxId || !this.databoxType) this.resetData(), this.createChart();
		else {
			let e = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
			document.getElementById(e) ? this.targetReady = !0 : (this._targetObserver = new MutationObserver(() => {
				document.getElementById(e) && (this._targetObserver.disconnect(), this.targetReady = !0);
			}), this._targetObserver.observe(document.body, {
				childList: !0,
				subtree: !0
			}));
		}
		document.documentElement.addEventListener("dsfr.theme", (e) => {
			this.chartId !== "" && this.changeColors(e.detail.theme);
		});
	},
	beforeUnmount() {
		this._targetObserver && this._targetObserver.disconnect();
	},
	methods: {
		resetData() {
			this.chart && this.chart.destroy(), this.datasets = [], this.labels = [], this.xparse = [], this.ybarparse = [], this.ylineparse = [], this.vlineParse = [], this.vlineColorParse = [], this.tmpVlineColorParse = [], this.vlineNameParse = [], this.hlineParse = [], this.hlineColorParse = [], this.tmpHlineColorParse = [], this.hlineNameParse = [], this.colorParse = [], this.colorBarParse = [], this.colorHover = [], this.colorBarHover = [];
		},
		getData() {
			try {
				this.xparse = JSON.parse(this.x), this.ybarparse = JSON.parse(this.yBar), this.ylineparse = JSON.parse(this.yLine);
			} catch (e) {
				console.error("Erreur lors du parsing des données x ou y-bar ou y-line:", e);
				return;
			}
			if (this.vline) {
				this.vlineParse = JSON.parse(this.vline);
				let e = [];
				this.vlinename && (e = JSON.parse(this.vlinename)), this.vlinecolor && (this.tmpVlineColorParse = JSON.parse(this.vlinecolor));
				for (let t = 0; t < this.vlineParse.length; t++) e[t] ? this.vlineNameParse.push(e[t]) : this.vlineNameParse.push(`V${t + 1}`);
			}
			if (this.hline) {
				this.hlineParse = JSON.parse(this.hline);
				let e = [];
				this.hlinename && (e = JSON.parse(this.hlinename)), this.hlinecolor && (this.tmpHlineColorParse = JSON.parse(this.hlinecolor));
				for (let t = 0; t < this.hlineParse.length; t++) e[t] ? this.hlineNameParse.push(e[t]) : this.hlineNameParse.push(`H${t + 1}`);
			}
			this.labels = this.xparse, this.loadColors(), this.datasets = [{
				data: this.ybarparse,
				type: "bar",
				borderColor: this.colorBarParse[0],
				backgroundColor: this.colorBarParse[0],
				hoverBorderColor: this.colorBarHover[0],
				hoverBackgroundColor: this.colorBarHover[0],
				pointRadius: 5,
				pointHoverRadius: 5,
				barThickness: this.barSize,
				...this.maxBarSize ? { maxBarThickness: this.maxBarSize } : {},
				barPercentage: .5
			}, {
				data: this.ylineparse,
				type: "line",
				borderColor: this.colorParse[0],
				backgroundColor: this.colorParse[0],
				hoverBorderColor: this.colorHover[0],
				hoverBackgroundColor: this.colorHover[0],
				pointBorderColor: this.colorParse[0],
				pointBackgroundColor: this.colorParse[0],
				pointHoverBorderColor: this.colorHover[0],
				pointHoverBackgroundColor: this.colorHover[0],
				pointRadius: 5,
				pointHoverRadius: 5,
				yAxisID: "yLine",
				tension: .4
			}];
		},
		choosePalette() {
			return YS(this.selectedPalette);
		},
		loadColors() {
			let { colorBarParse: e, colorBarHover: t, colorParse: n, colorHover: r, vlineColorParse: i, hlineColorParse: a } = RS({
				vlineParse: this.vlineParse,
				hlineParse: this.hlineParse,
				tmpVlineColorParse: this.tmpVlineColorParse,
				tmpHlineColorParse: this.tmpHlineColorParse,
				selectedPalette: this.selectedPalette
			});
			this.colorBarParse = e, this.colorBarHover = t, this.colorParse = n, this.colorHover = r, this.vlineColorParse = i, this.hlineColorParse = a;
		},
		createChart() {
			this.chart && this.chart.destroy(), this.getData();
			let e = this.$refs[this.chartId].getContext("2d");
			this.chart = new J(e, {
				data: {
					labels: this.labels,
					datasets: this.datasets
				},
				plugins: [{
					afterDatasetDraw: (e) => {
						this.vlineParse && this.vlineParse.forEach((t, n) => {
							let { ctx: r } = e, i = e.scales.x.getPixelForValue(t);
							r.save(), r.beginPath(), r.moveTo(i, e.scales.y.bottom), r.strokeStyle = this.vlineColorParse[n], r.lineWidth = 3, r.setLineDash([10, 5]), r.lineTo(i, e.scales.y.top), r.stroke(), r.restore();
						}), this.hlineParse && this.hlineParse.forEach((t, n) => {
							let { ctx: r } = e, i = e.scales.y.getPixelForValue(t);
							r.save(), r.beginPath(), r.moveTo(e.scales.x.left, i), r.strokeStyle = this.hlineColorParse[n], r.lineWidth = 3, r.setLineDash([10, 5]), r.lineTo(e.scales.x.right, i), r.stroke(), r.restore();
						});
					},
					afterDraw: (e) => {
						if (e.tooltip?._active && e.tooltip?._active.length) {
							let { ctx: t } = e, { x: n } = e.tooltip.getActiveElements()[0].element.tooltipPosition(), { index: r } = e.tooltip._active[0], i = e.scales.y.getPixelForValue(this.ybarparse[r]), a = e.scales.yLine.getPixelForValue(this.ylineparse[r]);
							t.save(), t.beginPath(), t.moveTo(n, e.scales.y.top), t.lineTo(n, e.scales.y.bottom), t.lineWidth = 1, t.strokeStyle = this.colorPrecisionBar, t.setLineDash([10, 5]), t.stroke(), t.restore(), t.save(), t.beginPath(), t.moveTo(e.scales.x.right, a), t.lineTo(n, a), t.lineWidth = 1, t.strokeStyle = this.colorPrecisionBar, t.setLineDash([10, 5]), t.stroke(), t.restore(), t.save(), t.beginPath(), t.moveTo(e.scales.x.left, i), t.lineTo(n, i), t.lineWidth = 1, t.strokeStyle = this.colorPrecisionBar, t.setLineDash([10, 5]), t.stroke(), t.restore();
						}
					}
				}],
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
							grid: { drawTicks: !1 },
							border: { dash: [3] },
							ticks: {
								padding: 10,
								maxTicksLimit: 5,
								callback: (e) => Math.abs(e) >= 1e9 ? `${e / 1e9}B` : Math.abs(e) >= 1e6 ? `${e / 1e6}M` : Math.abs(e) >= 1e3 ? `${e / 1e3}K` : e
							},
							...this.yBarMin ? { suggestedMin: this.yBarMin } : {},
							...this.yBarMax ? { suggestedMax: this.yBarMax } : {}
						},
						yLine: {
							type: "linear",
							position: "right",
							id: "yLine",
							beginAtZero: !0,
							grid: { drawTicks: !1 },
							border: { dash: [3] },
							ticks: {
								autoSkip: !1,
								padding: 10,
								maxTicksLimit: 5,
								callback: (e) => Math.abs(e) >= 1e9 ? `${e / 1e9}B` : Math.abs(e) >= 1e6 ? `${e / 1e6}M` : Math.abs(e) >= 1e3 ? `${e / 1e3}K` : e
							},
							...this.yLineMin ? { suggestedMin: this.yLineMin } : {},
							...this.yLineMax ? { suggestedMax: this.yLineMax } : {}
						}
					},
					plugins: {
						legend: { display: !1 },
						tooltip: {
							enabled: !1,
							displayColors: !1,
							backgroundColor: "#6b6b6b",
							callbacks: {
								label: (e) => this.datasets.map((t) => this.formatNumber(t.data[e.dataIndex])),
								title: (e) => e[0].label,
								labelTextColor: () => this.colorParse
							},
							external: (e) => {
								let t = (document.getElementById(`${this.databoxId}-${this.databoxType}-${this.databoxSource}`) || this.$el.nextElementSibling).querySelector(".tooltip"), n = e.tooltip;
								if (!t) return;
								if (!n || n.opacity === 0) {
									t.style.opacity = 0;
									return;
								}
								if (t.classList.remove("above", "below", "no-transform"), n.yAlign ? t.classList.add(n.yAlign) : t.classList.add("no-transform"), n.body) {
									let e = n.title || [], r = n.body.map((e) => e.lines), i = t.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
									i.innerText = e[0];
									let a = t.querySelector(".tooltip_value");
									a.innerHTML = "", r[0].forEach((e, t) => {
										if (e && e !== "NaN") {
											let n = t === 0 ? `${e}${this.unitTooltipBar ? ` ${this.unitTooltipBar}` : ""}` : `${e}${this.unitTooltipLine ? ` ${this.unitTooltipLine}` : ""}`;
											a.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" data-color="${[this.colorBarParse, this.colorParse][t]}"></span>
                          <p class="tooltip_place fr-mb-0">${n}</p>
                        </div>
                      `, a.querySelectorAll(".tooltip_dot").forEach((e) => {
												e.style.backgroundColor = e.getAttribute("data-color");
											});
										}
									});
								}
								let { offsetLeft: r, offsetTop: i } = this.chart.canvas, a = Number(this.chart.canvas.style.width.replace(/\D/g, "")), o = Number(this.chart.canvas.style.height.replace(/\D/g, "")), s = r + n.caretX + 10, c = i + n.caretY - 20;
								s + t.clientWidth > r + a && (s = r + n.caretX - t.clientWidth - 10), c + t.clientHeight > i + .9 * o && (c = i + n.caretY - t.clientHeight + 20), s < r && (s = r + n.caretX - t.clientWidth / 2, c = i + n.caretY - t.clientHeight - 20), t.style.position = "absolute", t.style.padding = `${n.padding}px ${n.padding}px`, t.style.pointerEvents = "none", t.style.left = `${s}px`, t.style.top = `${c}px`, t.style.opacity = 1;
							}
						}
					}
				}
			});
		},
		changeColors(e) {
			this.loadColors(), this.chart.data.datasets.forEach((e) => {
				e.borderColor = this.colorParse[0], e.backgroundColor = this.colorBarParse[0], e.hoverBorderColor = this.colorHover[0], e.hoverBackgroundColor = this.colorBarHover[0], e.pointBorderColor = this.colorParse[0], e.pointBackgroundColor = this.colorParse[0], e.pointHoverBorderColor = this.colorHover[0], e.pointHoverBackgroundColor = this.colorHover[0];
			}), this.chart.options.scales.x.ticks.color = e === "dark" ? "#cecece" : J.defaults.color, this.chart.options.scales.y.ticks.color = e === "dark" ? "#cecece" : J.defaults.color, this.chart.options.scales.yLine.ticks.color = e === "dark" ? "#cecece" : J.defaults.color, this.chart.update("none");
		}
	}
}, lC = { class: "fr-col-12" }, uC = { class: "chart" }, dC = ["aria-labelledby", "aria-label"], fC = { class: "chart_legend fr-mb-0 fr-mt-4v" }, pC = { class: "flex fr-mt-3v fr-mb-1v" }, mC = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, hC = { class: "flex fr-mt-3v fr-mb-1v" }, gC = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, _C = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, vC = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, yC = {
	key: 0,
	class: "flex fr-mt-1w"
}, bC = { class: "fr-text--xs" };
function xC(e, t, n, r, i, a) {
	return !n.databoxId || i.targetReady ? (P(), ia(er, {
		key: 0,
		to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource,
		disabled: !n.databoxId
	}, [I("div", {
		ref: i.widgetId,
		class: "widget_container fr-grid-row"
	}, [I("div", lC, [I("div", uC, [
		t[0] ||= I("div", { class: "tooltip" }, [I("div", { class: "tooltip_header fr-text--sm fr-mb-0" }), I("div", { class: "tooltip_body" }, [I("div", { class: "tooltip_value" })])], -1),
		I("canvas", {
			ref: i.chartId,
			role: "img",
			"aria-labelledby": n.databoxId ? "title-" + n.databoxId : null,
			"aria-label": n.databoxId ? null : "Graphique en ligne / Diagramme en barres"
		}, null, 8, dC),
		I("div", fC, [I("div", pC, [I("span", {
			class: "legend_dot",
			style: k({ "background-color": i.colorBarParse })
		}, null, 4), I("p", mC, A(e.capitalize(n.nameBar)), 1)]), I("div", hC, [I("span", {
			class: "legend_dot",
			style: k({ "background-color": i.colorParse })
		}, null, 4), I("p", gC, A(e.capitalize(n.nameLine)), 1)])]),
		(P(!0), F(N, null, Fr(i.hlineNameParse, (t, n) => (P(), F("div", {
			key: n,
			class: "flex"
		}, [
			I("span", {
				class: "legend_dash_line",
				style: k({ "background-color": i.hlineColorParse[n] })
			}, null, 4),
			I("span", {
				class: "legend_dash_line legend_dash_line_end",
				style: k({ "background-color": i.hlineColorParse[n] })
			}, null, 4),
			I("p", _C, A(e.capitalize(t)), 1)
		]))), 128)),
		(P(!0), F(N, null, Fr(i.vlineNameParse, (t, n) => (P(), F("div", {
			key: n,
			class: "flex"
		}, [
			I("span", {
				class: "legend_dash_line",
				style: k({ "background-color": i.vlineColorParse[n] })
			}, null, 4),
			I("span", {
				class: "legend_dash_line legend_dash_line_end",
				style: k({ "background-color": i.vlineColorParse[n] })
			}, null, 4),
			I("p", vC, A(e.capitalize(t)), 1)
		]))), 128)),
		n.date ? (P(), F("div", yC, [I("p", bC, "Mise à jour : " + A(n.date), 1)])) : R("", !0)
	])])], 512)], 8, ["to", "disabled"])) : R("", !0);
}
var SC = /*#__PURE__*/ Sv(cC, [["render", xC]]), CC = {
	name: "GaugeChart",
	mixins: [lv],
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
			default: 0
		},
		percent: {
			type: [Number, String],
			default: null
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
			width: "",
			tmpColorParse: [],
			colorParse: "",
			targetReady: !1
		};
	},
	watch: {
		$props: {
			handler() {
				this.widgetId && this.createChart();
			},
			deep: !0,
			immediate: !0
		},
		targetReady(e) {
			e && this.$nextTick(() => {
				this.createChart();
			});
		}
	},
	created() {
		this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1e3)}`;
	},
	mounted() {
		if (!this.databoxId || !this.databoxType) this.createChart();
		else {
			let e = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
			document.getElementById(e) ? this.targetReady = !0 : (this._targetObserver = new MutationObserver(() => {
				document.getElementById(e) && (this._targetObserver.disconnect(), this.targetReady = !0);
			}), this._targetObserver.observe(document.body, {
				childList: !0,
				subtree: !0
			}));
		}
		document.documentElement.addEventListener("dsfr.theme", (e) => {
			this.widgetId !== "" && this.changeColors(e.detail.theme);
		});
	},
	beforeUnmount() {
		this._targetObserver && this._targetObserver.disconnect();
	},
	methods: {
		createChart() {
			this.loadColors(), this.percent === null ? this.percentage = Math.round(100 * (Number(this.value) - Number(this.init)) / (this.target - this.init)) : this.percentage = Math.round(this.percent), this.width = Math.min(100, this.percentage);
		},
		loadColors() {
			let { colorParse: e } = LS({
				yparse: [null],
				tmpColorParse: this.tmpColorParse,
				selectedPalette: "default"
			});
			this.colorParse = e;
		},
		changeColors(e) {
			this.loadColors();
		}
	}
}, wC = { class: "fr-col-12" }, TC = { class: "chart" }, EC = { class: "gauge-container" }, DC = { class: "jauge-text fr-text fr-text--sm fr-text-inverted--grey fr-pl-1w" }, OC = { class: "gauge-container" }, kC = { class: "fr-text--xs fr-text-mention--grey fr-mt-1w fr-mb-0" }, AC = { class: "fr-text--xs fr-text-mention--grey fr-mt-1w fr-mb-0 fr-ml-auto fr-mr-0" }, jC = {
	key: 0,
	class: "gauge-container"
}, MC = { class: "fr-text--xs fr-text-mention--grey" }, NC = { class: "fr-text--xs fr-text-mention--grey fr-ml-auto fr-mr-0" }, PC = {
	key: 1,
	class: "flex"
}, FC = {
	key: 2,
	class: "flex fr-mt-3v fr-mb-1v"
}, IC = {
	key: 3,
	class: "flex fr-mt-1w"
}, LC = { class: "fr-text--xs" };
function RC(e, t, n, r, i, a) {
	return !n.databoxId || i.targetReady ? (P(), ia(er, {
		key: 0,
		to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource,
		disabled: !n.databoxId
	}, [I("div", {
		ref: i.widgetId,
		class: "widget_container fr-grid-row"
	}, [I("div", wC, [I("div", TC, [
		I("div", EC, [I("div", {
			class: "jauge",
			style: k({ height: n.height })
		}, [I("div", {
			class: "jauge-fill",
			style: k({
				width: i.width + "%",
				backgroundColor: i.colorParse
			})
		}, [I("span", DC, A(i.percentage) + "%", 1)], 4)], 4)]),
		I("div", OC, [I("p", kC, A(e.formatNumber(n.init)), 1), I("p", AC, A(e.formatNumber(n.target)), 1)]),
		n.initDate && n.targetDate ? (P(), F("div", jC, [I("p", MC, A(n.initDate), 1), I("p", NC, A(n.targetDate), 1)])) : R("", !0),
		[
			!0,
			"true",
			""
		].includes(n.legend) ? (P(), F("div", PC, [...t[0] ||= [I("span", { class: "legend_dot target_legend" }, null, -1), I("p", { class: "fr-text--sm fr-text--bold fr-ml-2v fr-mb-0" }, "Valeur cible", -1)]])) : R("", !0),
		[
			!0,
			"true",
			""
		].includes(n.legend) ? (P(), F("div", FC, [I("span", {
			class: "legend_dot",
			style: k({ backgroundColor: i.colorParse })
		}, null, 4), t[1] ||= I("p", { class: "fr-text--sm fr-text--bold fr-ml-2v fr-mb-0" }, "Valeur actuelle", -1)])) : R("", !0),
		n.date ? (P(), F("div", IC, [I("p", LC, "Mise à jour : " + A(n.date), 1)])) : R("", !0)
	])])], 512)], 8, ["to", "disabled"])) : R("", !0);
}
var zC = /*#__PURE__*/ Sv(CC, [["render", RC], ["__scopeId", "data-v-4a7c3e58"]]);
//#endregion
//#region src/components/LineChart.vue
J.register(mp, Gh);
var BC = {
	name: "LineChart",
	mixins: [lv],
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
			datasets: [],
			labels: [],
			xAxisType: "",
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
			colorHover: [],
			targetReady: !1
		};
	},
	watch: {
		$props: {
			handler() {
				this.chartId && (this.resetData(), this.getData(), this.createChart());
			},
			deep: !0,
			immediate: !0
		},
		targetReady(e) {
			e && this.$nextTick(() => {
				this.resetData(), this.createChart();
			});
		}
	},
	created() {
		cv(), this.chartId = `dsfr-chart-${Math.floor(Math.random() * 1e3)}`, this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1e3)}`;
	},
	mounted() {
		if (!this.databoxId || !this.databoxType) this.resetData(), this.createChart();
		else {
			let e = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
			document.getElementById(e) ? this.targetReady = !0 : (this._targetObserver = new MutationObserver(() => {
				document.getElementById(e) && (this._targetObserver.disconnect(), this.targetReady = !0);
			}), this._targetObserver.observe(document.body, {
				childList: !0,
				subtree: !0
			}));
		}
		document.documentElement.addEventListener("dsfr.theme", (e) => {
			this.chartId !== "" && this.changeColors(e.detail.theme);
		});
	},
	beforeUnmount() {
		this._targetObserver && this._targetObserver.disconnect();
	},
	methods: {
		resetData() {
			this.chart && this.chart.destroy(), this.datasets = [], this.labels = [], this.xAxisType = "", this.xparse = [], this.yparse = [], this.nameParse = [], this.tmpColorParse = [], this.colorParse = [], this.vlineParse = [], this.vlineColorParse = [], this.tmpVlineColorParse = [], this.vlineNameParse = [], this.hlineParse = [], this.hlineColorParse = [], this.tmpHlineColorParse = [], this.hlineNameParse = [], this.colorHover = [];
		},
		getData() {
			try {
				this.xparse = JSON.parse(this.x), this.yparse = JSON.parse(this.y);
			} catch (e) {
				console.error("Erreur lors du parsing des données x ou y:", e);
				return;
			}
			let e = [];
			if (this.name) try {
				e = JSON.parse(this.name);
			} catch (e) {
				console.error("Erreur lors du parsing de name:", e);
			}
			this.nameParse = [];
			for (let t = 0; t < this.yparse.length; t++) e[t] ? this.nameParse.push(e[t]) : this.nameParse.push(`Série ${t + 1}`);
			if (this.vline) {
				this.vlineParse = JSON.parse(this.vline);
				let e = [];
				this.vlinename && (e = JSON.parse(this.vlinename)), this.vlinecolor && (this.tmpVlineColorParse = JSON.parse(this.vlinecolor));
				for (let t = 0; t < this.vlineParse.length; t++) e[t] ? this.vlineNameParse.push(e[t]) : this.vlineNameParse.push(`V${t + 1}`);
			}
			if (this.hline) {
				this.hlineParse = JSON.parse(this.hline);
				let e = [];
				this.hlinename && (e = JSON.parse(this.hlinename)), this.hlinecolor && (this.tmpHlineColorParse = JSON.parse(this.hlinecolor));
				for (let t = 0; t < this.hlineParse.length; t++) e[t] ? this.hlineNameParse.push(e[t]) : this.hlineNameParse.push(`H${t + 1}`);
			}
			this.labels = this.xparse[0], this.xAxisType = parseFloat(this.labels[0]) == this.labels[0] ? "linear" : "category", this.loadColors(), this.datasets = this.yparse.map((e, t) => ({
				data: e,
				fill: !1,
				pointRadius: 5,
				pointHoverRadius: 5,
				borderColor: this.colorParse[t],
				backgroundColor: this.colorParse[t],
				hoverBorderColor: this.colorHover[t],
				hoverBackgroundColor: this.colorHover[t],
				pointBorderColor: this.colorParse[t],
				pointBackgroundColor: this.colorParse[t],
				pointHoverBackgroundColor: this.colorHover[t],
				pointHoverBorderColor: this.colorHover[t],
				borderWidth: 2,
				tension: .4
			}));
		},
		loadColors() {
			this.colorParse = [], this.colorHover = [];
			let e = this.choosePalette();
			for (let t = 0; t < this.yparse.length; t++) if (this.tmpColorParse[t]) {
				let e = this.tmpColorParse[t];
				this.colorParse.push(e), this.colorHover.push(FS(e).brighten(.5).hex());
			} else {
				let n = KS(t, e);
				this.colorParse.push(n), this.colorHover.push(FS(n).brighten(.5).hex());
			}
			this.vlineColorParse = [];
			for (let e = 0; e < this.vlineParse.length; e++) this.tmpVlineColorParse[e] ? this.vlineColorParse.push(this.tmpVlineColorParse[e]) : this.vlineColorParse.push(JS());
			this.hlineColorParse = [];
			for (let e = 0; e < this.hlineParse.length; e++) this.tmpHlineColorParse[e] ? this.hlineColorParse.push(this.tmpHlineColorParse[e]) : this.hlineColorParse.push(JS());
		},
		choosePalette() {
			return YS(this.selectedPalette);
		},
		changeColors(e) {
			this.loadColors(), this.chart.data.datasets.forEach((e, t) => {
				e.borderColor = this.colorParse[t], e.backgroundColor = this.colorParse[t], e.hoverBorderColor = this.colorHover[t], e.hoverBackgroundColor = this.colorHover[t], e.pointBorderColor = this.colorParse[t], e.pointBackgroundColor = this.colorParse[t], e.pointHoverBorderColor = this.colorHover[t], e.pointHoverBackgroundColor = this.colorHover[t];
			}), this.chart.options.scales.x.ticks.color = e === "dark" ? "#cecece" : J.defaults.color, this.chart.options.scales.y.ticks.color = e === "dark" ? "#cecece" : J.defaults.color, this.chart.update("none");
		},
		createChart() {
			this.chart && this.chart.destroy(), this.getData();
			let e = this.$refs[this.chartId].getContext("2d");
			this.chart = new J(e, {
				type: "line",
				data: {
					labels: this.labels,
					datasets: this.datasets
				},
				plugins: [{
					afterDatasetDraw: (e) => {
						this.vlineParse && this.vlineParse.forEach((t, n) => {
							let { ctx: r } = e, i = e.scales.x.getPixelForValue(t);
							r.save(), r.beginPath(), r.moveTo(i, e.scales.y.bottom), r.strokeStyle = this.vlineColorParse[n], r.lineWidth = 3, r.setLineDash([10, 5]), r.lineTo(i, e.scales.y.top), r.stroke(), r.restore();
						}), this.hlineParse && this.hlineParse.forEach((t, n) => {
							let { ctx: r } = e, i = e.scales.y.getPixelForValue(t);
							r.save(), r.beginPath(), r.moveTo(e.scales.x.left, i), r.strokeStyle = this.hlineColorParse[n], r.lineWidth = 3, r.setLineDash([10, 5]), r.lineTo(e.scales.x.right, i), r.stroke(), r.restore();
						});
					},
					afterDraw: (e) => {
						if (e.tooltip?._active && e.tooltip?._active.length) {
							let { ctx: t } = e, { x: n } = e.tooltip.getActiveElements()[0].element.tooltipPosition(), { index: r } = e.tooltip._active[0];
							t.save(), t.beginPath(), t.moveTo(n, e.scales.y.top), t.lineTo(n, e.scales.y.bottom), t.lineWidth = 1, t.strokeStyle = this.colorPrecisionBar, t.setLineDash([10, 5]), t.stroke(), t.restore(), this.yparse.forEach((n) => {
								let i = e.scales.y.getPixelForValue(n[r]);
								t.save(), t.beginPath(), t.moveTo(e.scales.x.left, i), t.lineTo(e.scales.x.right, i), t.lineWidth = 1, t.strokeStyle = this.colorPrecisionBar, t.setLineDash([10, 5]), t.stroke(), t.restore();
							});
						}
					}
				}],
				options: {
					aspectRatio: this.aspectRatio,
					scales: {
						x: {
							offset: !0,
							type: this.xAxisType,
							grid: { drawOnChartArea: !1 },
							ticks: {
								padding: 10,
								callback: (e) => this.xAxisType === "category" ? this.labels[e] : e
							},
							...this.xMin ? { suggestedMin: this.xMin } : {},
							...this.xMax ? { suggestedMax: this.xMax } : {}
						},
						y: {
							grid: { drawTicks: !1 },
							border: { dash: [3] },
							ticks: {
								autoSkip: !1,
								padding: 5,
								maxTicksLimit: 5,
								callback: (e) => Math.abs(e) >= 1e9 ? `${e / 1e9}B` : Math.abs(e) >= 1e6 ? `${e / 1e6}M` : Math.abs(e) >= 1e3 ? `${e / 1e3}K` : e
							},
							...this.yMin ? { suggestedMin: this.yMin } : {},
							...this.yMax ? { suggestedMax: this.yMax } : {}
						}
					},
					plugins: {
						legend: { display: !1 },
						tooltip: {
							enabled: !1,
							displayColors: !1,
							backgroundColor: "#6b6b6b",
							callbacks: {
								label: (e) => this.datasets.map((t) => this.formatNumber(t.data[e.dataIndex])),
								title: (e) => e[0].label,
								labelTextColor: () => this.colorParse
							},
							external: (e) => {
								let t = (document.getElementById(`${this.databoxId}-${this.databoxType}-${this.databoxSource}`) || this.$el.nextElementSibling).querySelector(".tooltip"), n = e.tooltip;
								if (!t) return;
								if (!n || n.opacity === 0) {
									t.style.opacity = 0;
									return;
								}
								if (t.classList.remove("above", "below", "no-transform"), n.yAlign ? t.classList.add(n.yAlign) : t.classList.add("no-transform"), n.body) {
									let e = n.title || [], r = n.body.map((e) => e.lines), i = t.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
									i.innerText = e[0];
									let a = t.querySelector(".tooltip_value");
									a.innerHTML = "", r[0].forEach((e, t) => {
										if (e && e !== "NaN") {
											let n = `${e}${this.unitTooltip ? ` ${this.unitTooltip}` : ""}`;
											a.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" data-color="${this.colorParse[t]}"></span>
                          <p class="tooltip_place fr-mb-0">${n}</p>
                        </div>
                      `, a.querySelectorAll(".tooltip_dot").forEach((e) => {
												e.style.backgroundColor = e.getAttribute("data-color");
											});
										}
									});
								}
								let { offsetLeft: r, offsetTop: i } = this.chart.canvas, a = Number(this.chart.canvas.style.width.replace(/\D/g, "")), o = Number(this.chart.canvas.style.height.replace(/\D/g, "")), s = r + n.caretX + 10, c = i + n.caretY - 20;
								s + t.clientWidth > r + a && (s = r + n.caretX - t.clientWidth - 10), c + t.clientHeight > i + .9 * o && (c = i + n.caretY - t.clientHeight + 20), s < r && (s = r + n.caretX - t.clientWidth / 2, c = i + n.caretY - t.clientHeight - 20), t.style.position = "absolute", t.style.padding = `${n.padding}px ${n.padding}px`, t.style.pointerEvents = "none", t.style.left = `${s}px`, t.style.top = `${c}px`, t.style.opacity = 1;
							}
						}
					}
				}
			});
		}
	}
}, VC = { class: "fr-col-12" }, HC = { class: "chart" }, UC = ["aria-labelledby", "aria-label"], WC = { class: "chart_legend fr-mb-0 fr-mt-4v" }, GC = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, KC = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, qC = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, JC = {
	key: 0,
	class: "flex fr-mt-1w"
}, YC = { class: "fr-text--xs" };
function XC(e, t, n, r, i, a) {
	return !n.databoxId || i.targetReady ? (P(), ia(er, {
		key: 0,
		to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource,
		disabled: !n.databoxId
	}, [I("div", {
		ref: i.widgetId,
		class: "widget_container fr-grid-row"
	}, [I("div", VC, [I("div", HC, [
		t[0] ||= I("div", { class: "tooltip" }, [I("div", { class: "tooltip_header fr-text--sm fr-mb-0" }), I("div", { class: "tooltip_body" }, [I("div", { class: "tooltip_value" })])], -1),
		I("canvas", {
			ref: i.chartId,
			role: "img",
			"aria-labelledby": n.databoxId ? "title-" + n.databoxId : null,
			"aria-label": n.databoxId ? null : "Graphique en ligne"
		}, null, 8, UC),
		I("div", WC, [(P(!0), F(N, null, Fr(i.nameParse, (t, n) => (P(), F("div", {
			key: n,
			class: "flex fr-mt-3v fr-mb-1v"
		}, [I("span", {
			class: "legend_dot",
			style: k({ "background-color": i.colorParse[n] })
		}, null, 4), I("p", GC, A(e.capitalize(t)), 1)]))), 128))]),
		(P(!0), F(N, null, Fr(i.hlineNameParse, (t, n) => (P(), F("div", {
			key: n,
			class: "flex fr-mt-3v"
		}, [
			I("span", {
				class: "legend_dash_line",
				style: k({ "background-color": i.hlineColorParse[n] })
			}, null, 4),
			I("span", {
				class: "legend_dash_line legend_dash_line_end",
				style: k({ "background-color": i.hlineColorParse[n] })
			}, null, 4),
			I("p", KC, A(e.capitalize(t)), 1)
		]))), 128)),
		(P(!0), F(N, null, Fr(i.vlineNameParse, (t, n) => (P(), F("div", {
			key: n,
			class: "flex fr-mt-3v fr-mb-1v"
		}, [
			I("span", {
				class: "legend_dash_line",
				style: k({ "background-color": i.vlineColorParse[n] })
			}, null, 4),
			I("span", {
				class: "legend_dash_line legend_dash_line_end",
				style: k({ "background-color": i.vlineColorParse[n] })
			}, null, 4),
			I("p", qC, A(e.capitalize(t)), 1)
		]))), 128)),
		n.date ? (P(), F("div", JC, [I("p", YC, "Mise à jour : " + A(n.date), 1)])) : R("", !0)
	])])], 512)], 8, ["to", "disabled"])) : R("", !0);
}
var ZC = /*#__PURE__*/ Sv(BC, [["render", XC]]), QC = { class: "map_info fr-col-12 fr-col-lg-3" }, $C = { key: 0 }, ew = { class: "flex fr-text--sm fr-text--bold fr-mb-2w" }, tw = { class: "fr-text--sm fr-text--bold fr-mb-1v" }, nw = { class: "fr-text--md fr-text--bold fr-my-0" }, rw = { class: "scale fr-mt-auto" }, iw = { class: "scale_values" }, aw = { class: "min fr-text--sm fr-text--bold fr-mb-0" }, ow = { class: "max fr-text--sm fr-text--bold fr-mb-0" }, sw = /*#__PURE__*/ Sv({
	__name: "MapInfo",
	props: { data: {
		type: Object,
		required: !0
	} },
	setup(e) {
		let t = e, n = Ba(() => `linear-gradient(90deg,${t.data.colorMin} 0%,${t.data.colorMax} 100%)`);
		return (t, r) => (P(), F("div", QC, [
			e.data.valueNat !== null || e.data.valueReg !== null ? (P(), F("div", $C, [
				I("p", {
					class: "fr-text--xs fr-text--bold fr-mb-1v",
					style: k({ color: e.data.textMention })
				}, A(e.data.names) + ", " + A(e.data.level), 5),
				I("p", {
					class: "fr-text--xs fr-text--bold fr-mb-2w",
					style: k({ color: e.data.textMention })
				}, A(Zt(Y_)(e.data.value)), 5),
				r[0] ||= I("div", { class: "sep fr-mb-2w" }, null, -1)
			])) : R("", !0),
			I("div", null, [
				I("p", {
					class: "fr-text--xs fr-mb-1v",
					style: k({ color: e.data.textMention })
				}, " Localisation ", 4),
				I("p", ew, [I("span", null, A(e.data.localisation), 1)]),
				e.data.date ? (P(), F("p", {
					key: 0,
					class: "fr-text--xs fr-mb-1v",
					style: k({ color: e.data.textMention })
				}, " Mise à jour : " + A(e.data.date), 5)) : R("", !0),
				I("p", tw, A(e.data.names), 1),
				I("p", nw, A(Zt(Y_)(e.data.valueNat || e.data.valueReg || e.data.value)), 1)
			]),
			I("div", rw, [
				r[1] ||= I("div", { class: "sep fr-my-2w" }, null, -1),
				I("p", {
					class: "fr-text--xs fr-mb-1w",
					style: k({ color: e.data.textMention })
				}, " Légende ", 4),
				I("div", {
					class: "scale_container",
					style: k({ background: n.value })
				}, null, 4),
				I("div", iw, [I("span", aw, A(Zt(Y_)(e.data.min)), 1), I("span", ow, A(Zt(Y_)(e.data.max)), 1)])
			])
		]));
	}
}, [["__scopeId", "data-v-764760d4"]]), cw = ["viewBox"], lw = ["stroke"], uw = {
	__name: "France",
	props: {
		config: {
			type: Object,
			required: !0
		},
		onClick: {
			type: Function,
			required: !0
		},
		onDblClick: {
			type: Function,
			required: !0
		},
		onEnter: {
			type: Function,
			required: !0
		},
		onLeave: {
			type: Function,
			required: !0
		}
	},
	setup(e) {
		return (t, n) => (P(), F("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: e.config.viewBox
		}, [I("g", {
			fill: "#5C68E5",
			stroke: e.config.colorStroke,
			"stroke-width": ".2%"
		}, [
			I("path", {
				class: "FR-2A",
				style: k({ display: e.config.displayPath["FR-2A"] }),
				d: "M930 907v3l3 3 6 4 1 3-4 1-5 1v2l2 2v8l8 2 3 1 2 4-2 2-2 1-3 4-2 3 1 6h6l1 1 5-2 2 1-3 6 3 2-5 3-2 7 8 2 11 1-5 5s-2-1-3-1v1c0 2-3 6-3 7l4 3 6 4 12 4 4 1 3 2-2 3h6l1 3h5l2-7-4-1 5-5-1-2v-3l7-4v-4h-4l-3 2v-4h5l2-4 2-13-1-5v-5l-7 4h-7l-1-5 1-1-2-2-1-9-1-2h-4l-2-1v-6l-2-2-2-1-4-5v-3h-5l-2-5h-6l-4-4 1-2-2-1h-5l-2-1h-8v-2z",
				onClick: n[0] ||= (t) => e.onClick(t),
				onDblclick: n[1] ||= (t) => e.onDblClick(),
				onMouseenter: n[2] ||= (t) => e.onEnter(t),
				onMouseleave: n[3] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-2B",
				style: k({ display: e.config.displayPath["FR-2B"] }),
				d: "m990 834-5 4v4l3 3-3 3 1 3-2 2v3l4 4v5l-2 4-3 1-3-3h-5l-1-1h-4l-4 4-2 6-9 2-7 6-2 4-3-1-2-2-1 6-3 1v6l1 3-4 3-1 3h4v2h7l2 1h6l2 1-1 2 4 4h6l2 5h5v3l3 5 3 1 2 2v6l2 2h4l1 1 1 9 2 2-1 1 1 5h7l7-4-1-11 9-12v-20l-4-7-1-22-2-4-5-4-1-13 2-6-2-10-2-8-2-2z",
				onClick: n[4] ||= (t) => e.onClick(t),
				onDblclick: n[5] ||= (t) => e.onDblClick(),
				onMouseenter: n[6] ||= (t) => e.onEnter(t),
				onMouseleave: n[7] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-13",
				style: k({ display: e.config.displayPath["FR-13"] }),
				d: "m686 750-10 5-3 20-11-2-3 8 3 4-12 7-3 8h11l15 1 3 3h-5l-4 6 16 3 12-2-7-6 5-4 7 3 3 7 20 1 6-3 1 4-6 5h8l-1 4-2 2h17l9 3 1 1v-7l3-3 3-2v-2l-3-2h-3l-2-2 3-3v-1l-3-1v-3h7l2-1-6-6v-7l-4-3 3-7 8-5-6-4-4 3-10 3-7-1-15-6h-8l-7-3-3-4-5-6-13-5h-1z",
				onClick: n[8] ||= (t) => e.onClick(t),
				onDblclick: n[9] ||= (t) => e.onDblClick(),
				onMouseenter: n[10] ||= (t) => e.onEnter(t),
				onMouseleave: n[11] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-84",
				style: k({ display: e.config.displayPath["FR-84"] }),
				d: "M699 697h-5l-4 6 1 7 6 1-1 2-5 1-5 5-1-2 1-7-2-2-10 1-2 4 1 1 6 10v8l11 11v4l-4 3 13 5 5 6 3 4 7 3h9l14 6 8 1 9-3 4-3 1-2-7-9h-9v-3l3-3v-4l-6-3-1-5 4-2v-4l-4-1-1-5h-3l-6-5-1-4-10-1-7-1-1-4 2-5-4 4-8-1-1-3 5-6z",
				onClick: n[12] ||= (t) => e.onClick(t),
				onDblclick: n[13] ||= (t) => e.onDblClick(),
				onMouseenter: n[14] ||= (t) => e.onEnter(t),
				onMouseleave: n[15] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-83",
				style: k({ display: e.config.displayPath["FR-83"] }),
				d: "M830 756h-6l-2 2h-10l-9 6-6-4-9 3-1 4-7 5-12-8-9 3-1 2 7 4-8 6-4 6 4 3v7l6 6-2 1h-7v3l4 1v1l-3 3 1 2h3l3 2v2l-3 2-3 3v7l1 2 6 2 2 8 4 1 4-3 6-4 11 1v3l-4 2h9l-2-2-1-5 5-3 5 2h2l2 3 3-2v-5l3-2h8l2-4 5 2 6-3v-9h-8l6-3 3-4 1-6 10-1 6-7-4-4v-2l-2-2 2-2v-4l-5-2h-2l-4-3v-8l-5-1-4-1-1-4z",
				onClick: n[16] ||= (t) => e.onClick(t),
				onDblclick: n[17] ||= (t) => e.onDblClick(),
				onMouseenter: n[18] ||= (t) => e.onEnter(t),
				onMouseleave: n[19] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-04",
				style: k({ display: e.config.displayPath["FR-04"] }),
				d: "m841 665-4 6-5 4-2 3-5 1v3l-2 2-2 5h-11l-6-3-4 3-6-1-2 3h2v6h-1l-6-3v-3l-4-3h-2v4h-3l-6 4-4 6-1 4h2l1 5h-2l-4-3-2 1 1 2 5 7-3 1-3-2h-6l-6 6v2l-2-3-3-2-2 5-3 3h-2l1 5 4 1v4l-4 2 1 5 6 3v4l-3 3v3h8l8 9 9-3 12 8 7-5 1-4 10-3 5 4 9-6h10l2-2h6l-2-4 2-2v-2h5l1-2 5-3 4 3 2-2-6-5-6-6-3-1v-5l-4-6 2-8 1-5 4-3v-4l5-3h1v-7l5-1-3-3-3-1-2-4 1-4 7-7-1-5h1z",
				onClick: n[20] ||= (t) => e.onClick(t),
				onDblclick: n[21] ||= (t) => e.onDblClick(),
				onMouseenter: n[22] ||= (t) => e.onEnter(t),
				onMouseleave: n[23] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-06",
				style: k({ display: e.config.displayPath["FR-06"] }),
				d: "M841 698h-1l-5 3v4l-4 3-1 5-2 8 4 6v5l3 1 6 6 6 5-2 2-4-3-5 3-1 2h-5v2l-2 2 2 4-4 2 1 4h4l5 2v7l4 4h2l5 2v3l-2 3 2 1v3l4 4 1-9 7 2 2-3h4v-11l9-1 7-6h6l1-4 6-4-4-8 6-5-1-5 8-3 2-8-1-5-2-3-2-5h-5l-17 6h-5l-10-7-9-3h-5v-6z",
				onClick: n[24] ||= (t) => e.onClick(t),
				onDblclick: n[25] ||= (t) => e.onDblClick(),
				onMouseenter: n[26] ||= (t) => e.onEnter(t),
				onMouseleave: n[27] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-05",
				style: k({ display: e.config.displayPath["FR-05"] }),
				d: "m810 619-3 1-1 6-6 1-1-6-2-2-7 1-2 2-2 8 1 2h8l1 5 3 1v8h-7l-2 3-9-1-4 4-4-2-4 4 1 3-2 3h-10v4l3 2-1 2-6 3-7 1-3 6v5l4 3-4 5-5-3h-6v3l3 3-4 3 1 6 13 3 2 5h3l-1 11 6-5h6l3 2 3-1-5-7-1-2 2-1 4 3h2l-1-5h-2l1-4 4-6 6-4h3v-4h2l4 3v3l6 3h2l-1-6h-2l2-3 6 1 4-3 6 3h11l2-5 2-2v-3l5-1 1-3 6-4 4-6 5 1 3-4h4v-3l-5-3-1-10-4-1h-5l-10-4-1-11-6-2-1-4-3-5z",
				onClick: n[28] ||= (t) => e.onClick(t),
				onDblclick: n[29] ||= (t) => e.onDblClick(),
				onMouseenter: n[30] ||= (t) => e.onEnter(t),
				onMouseleave: n[31] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-48",
				style: k({ display: e.config.displayPath["FR-48"] }),
				d: "m577 643-10 4-3 6-7-4-5 16-5 12 7 9v7l5 4v8l2 13 6 2-1 4 9-1 3 1-2 2 11 7 10-2 1-2-1-3 4-1 6 5 9 1 4-7v-5l3-3-2-1v-7l-6-6h5l2-2 2-4-2-1 1-7-6-7-3-13-9-12-7 2-1-6h-4v5l-10 3z",
				onClick: n[32] ||= (t) => e.onClick(t),
				onDblclick: n[33] ||= (t) => e.onDblClick(),
				onMouseenter: n[34] ||= (t) => e.onEnter(t),
				onMouseleave: n[35] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-03",
				style: k({ display: e.config.displayPath["FR-03"] }),
				d: "m541 451-5 6h-3l-3 4-3-4-10 9v6l2 2v2l-5 4-5-1-9 2-4 5-2 4 4 6v4l3 4 2-4 3 5 4 2 4 9v3l6 4 3-1 2-6h2v-3l4-1 1 2 5-5h5l1 2-2 3 3 5 1 2 9 5 12 2h3l5 1 4-3 3 2 1 4 4 1h6l1 4 5 2v-2h9l-1-21-2-5 1-4 6-1 8-6v-14l-3-4h-5l-2-3h-7l-1-2v-5l-8-14-3-2-7 9-3 1-1-5-3-2-2 3h-5l-1-3-4 2-3 2-5-4-6-3v-5z",
				onClick: n[36] ||= (t) => e.onClick(t),
				onDblclick: n[37] ||= (t) => e.onDblClick(),
				onMouseenter: n[38] ||= (t) => e.onEnter(t),
				onMouseleave: n[39] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-30",
				style: k({ display: e.config.displayPath["FR-30"] }),
				d: "m624 696-2 4-2 2h-5l6 6v7l2 1-3 3v5l-4 7-9-1-6-5-4 1 1 3-1 3-10 1-11-7-2 2v5l-4 1 1 4 5 1h6l1 7-6 3v4l5 2v2l2 2 2-2h3l1 3h4l2-7h3l5-6h6l1 9 2 3 4-2 6 3 2 4 11 6 4 10v4l-7 4-5 4 6 1v7h13l3-8 12-7-3-4 3-8 11 2 2-20 15-8v-4l-11-11v-8l-6-10-13-7-1 5-5 1-2-6-5 1-1 7-4-1-8-6-4 2v-10z",
				onClick: n[40] ||= (t) => e.onClick(t),
				onDblclick: n[41] ||= (t) => e.onDblClick(),
				onMouseenter: n[42] ||= (t) => e.onEnter(t),
				onMouseleave: n[43] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-11",
				style: k({ display: e.config.displayPath["FR-11"] }),
				d: "m491 802-1 7-6-2h-7v-3l-4 1-7 2-3-4-5 4 2 4-6 2-1 6-5 2 5 5-1 3 17 8 2 13v6l1 9h-9l-3 4 12 9 7-3 8 9-1 1h1l15-7-4-5v-6h34l-1-5 8-4 10 7 4 2v-22l-4 1-4-6 3-5 6 6 6-4 3-4 1-4h-5l-1-5h-5l-4-7-4 1-3-2-1-6-2 1 1 4h-5v6l-7 3-3-7-5 3-4-3-1-5 3-4-2-4h-11l-11-2z",
				onClick: n[44] ||= (t) => e.onClick(t),
				onDblclick: n[45] ||= (t) => e.onDblClick(),
				onMouseenter: n[46] ||= (t) => e.onEnter(t),
				onMouseleave: n[47] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-34",
				style: k({ display: e.config.displayPath["FR-34"] }),
				d: "m604 747-5 6h-3l-2 7h-4l-1-3h-3l-2 2-2-2v-3l-5-2v2l-7 1-3 3 1 6h-5l-6-3h-3v4l1 10h-10l-2 4-13 5-5-4-3 5-2 5 6 5-2 7-8 2 2 4-3 4 1 5 4 3 5-3 3 7 7-3v-6h5l-1-4 2-1 1 6 3 2 4-1 4 7h5l1 5h5v-2l13-3 1-4h11l3-4 19-16 12-8h5l5-4 7-4v-5l-4-9-11-6-2-5-6-3-4 2-2-2-1-9z",
				onClick: n[48] ||= (t) => e.onClick(t),
				onDblclick: n[49] ||= (t) => e.onDblClick(),
				onMouseenter: n[50] ||= (t) => e.onEnter(t),
				onMouseleave: n[51] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-66",
				style: k({ display: e.config.displayPath["FR-66"] }),
				d: "m539 858-8 4 1 5h-34v6l4 5-15 7h-14l-1 3-6 2-4 4-12 2 1 4 6 5 10 3v6l6 5h5l6-8 7-1 12 4 10 8 3-3h3l2 2 2-2 1-5 11-2 3-5 6-2h7l5 5 6 1v-6l-3-4-5-2-1-32-5-2z",
				onClick: n[52] ||= (t) => e.onClick(t),
				onDblclick: n[53] ||= (t) => e.onDblClick(),
				onMouseenter: n[54] ||= (t) => e.onEnter(t),
				onMouseleave: n[55] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-15",
				style: k({ display: e.config.displayPath["FR-15"] }),
				d: "m512 590-1 4 2 5-2 2h-4l-4-4-3-2v10l-7 5-4 6 1 6-2 3-2 6h-2l-3 4 2 2 1 4-4 3 1 12 7 5-5 10 5 2-2 6 4 1 3-5h5l1 1h11l2-4 3-1 1-8h2v-9l11-9 1 1 1 7 7-1 1 10h4l1 11 3 3 5-11 5-16 7 4 3-7 9-3v-3l-2-3-4-2 2-3-2-2h2l3-2-4-1-2-2-1-7-2-2-2-6h-8l-2-5h-2l-2 3-5-1-5-7-2-1-4-2-2 3h-6l-3-7z",
				onClick: n[56] ||= (t) => e.onClick(t),
				onDblclick: n[57] ||= (t) => e.onDblClick(),
				onMouseenter: n[58] ||= (t) => e.onEnter(t),
				onMouseleave: n[59] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-43",
				style: k({ display: e.config.displayPath["FR-43"] }),
				d: "m571 595-2 2v2h-4l-4 3-6 1-2 2h1l2 5h8l2 6 2 2 1 7 1 2 5 1-3 2h-2l2 2-2 3 4 2 2 3v3h1l6 17 9-3 1-5h4l1 6 7-2 8 10 6-8 9-7h9l3-9h5l1-7h5l-1-2-1-5 2-4 5-2 2-8-5-6h-6l1-6-11-5h-4l-8 6-8-2-1 2-5-2-3-3-2 4-5-1-3-2-2 5-4-2-2-4h-3l-2-2-4 1h-5l-2-1-2 1z",
				onClick: n[60] ||= (t) => e.onClick(t),
				onDblclick: n[61] ||= (t) => e.onDblClick(),
				onMouseenter: n[62] ||= (t) => e.onEnter(t),
				onMouseleave: n[63] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-63",
				style: k({ display: e.config.displayPath["FR-63"] }),
				d: "m537 509-5 5v-2l-5 1v3h-2l-2 6-3 1-5-4v8l3 4 1 7-4 3-1 5-4 2-7 4 1 3 8 9 1 5-3 5v5l2 3 1 6-1 2 11 4 3 6h6l2-2 4 1 2 1 5 7 5 1 2-3h1l2-2 6-1 4-3h4v-3l2-1 1 2 2-1 2 1h5l4-2 2 3h3l2 4 4 1 2-4 3 2 5 1 2-4 3 3 5 1 1-1-2-1-1-4 6-7-3-12-9-6-4-9-5-6 2-8 3-3-6-5v-1l-5-2-2-4h-5l-4-1-1-4-3-2-4 2-5-1-4 1-11-2-9-5-1-3-3-4 2-4-1-1z",
				onClick: n[64] ||= (t) => e.onClick(t),
				onDblclick: n[65] ||= (t) => e.onDblClick(),
				onMouseenter: n[66] ||= (t) => e.onEnter(t),
				onMouseleave: n[67] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-65",
				style: k({ display: e.config.displayPath["FR-65"] }),
				d: "m315 784-3 2 6 10-3 4 2 4 5 6-4 5-5 13-10 8 2 5-2 2-5-1-2 12-3 2v7h1l6 3 7 6 1 4 5 5h5l12-5 5 6 7 1 2-4 4 1 7 1-1-19h4l3 1 2-2v-4l5-2-2-7-2-2-4 2 2-4-1-4-6-4 1-3 3-6 4-1v-3l3-3 1-3-6-3h-9l-1-3h-5l-1-3h-5l-1 1h-5v-3l-4-2 1-1 1-4-1-1-2-5-4-1-4-2v-6z",
				onClick: n[68] ||= (t) => e.onClick(t),
				onDblclick: n[69] ||= (t) => e.onDblClick(),
				onMouseenter: n[70] ||= (t) => e.onEnter(t),
				onMouseleave: n[71] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-64",
				style: k({ display: e.config.displayPath["FR-64"] }),
				d: "m302 785-5 3-10-1-1-1-7 2-5 1-4-3-5 2-1-2h-5l-3 2h-9l-4 3h-9l-1 2-2-1 2-3-4-3-6 5h-9l-11-5-1 3-8 10-7 3h-4v4l4 4h6l1 5 5 1 1-4 7 3 4 1 1 5-2 2v7l-5 2v3l3 4 6 2 1-6 3-3-1 5 3 3h6l3 4 9 2 8 5h14l1 7 9 7 4 5 4-2 3-1 2 2 3-2 7-4v-7l3-2 2-12 5 1 2-2-2-5 9-8 6-13 4-5-5-6-2-4 3-4-6-10-9-1z",
				onClick: n[72] ||= (t) => e.onClick(t),
				onDblclick: n[73] ||= (t) => e.onDblClick(),
				onMouseenter: n[74] ||= (t) => e.onEnter(t),
				onMouseleave: n[75] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-40",
				style: k({ display: e.config.displayPath["FR-40"] }),
				d: "m243 684-12 6h-3l-6 34-8 32-3 12-2 9-6 9 11 5h9l6-5 4 4-2 2 2 1 1-2h9l4-4 9 1 3-2h5l1 2 5-2 3 3 6-1 7-2 1 1 10 1 5-3-2-5 2-7 4-4-1-7 3-3-5-7 4-4 4-1 4 2 5-5 1 6 2 2 4-1v-4l1-3-1-2 1-7 4-4-2-3h-4l-5-2-7 1-2-8-4-6h-2l1 6v2l-7 1-6-3-2-8-4-5h-3l-1-3-3-2-6-2 2-2v-2l-2-2-3-1h-6l-4 4h-3l-4-3-6 3-3-2 2-3 1-5z",
				onClick: n[76] ||= (t) => e.onClick(t),
				onDblclick: n[77] ||= (t) => e.onDblClick(),
				onMouseenter: n[78] ||= (t) => e.onEnter(t),
				onMouseleave: n[79] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-33",
				style: k({ display: e.config.displayPath["FR-33"] }),
				d: "m245 575-6 9-2 30-4 30-4 24v6l3-8 5-6 7 6 1 2 2 3-9 1-2-3-3 2-1 5-4 6v8h3l11-6 7 2-1 4-2 4 3 1 6-2 4 3h3l3-4 7-1 2 2 2 2v2l-1 2 6 2 3 2v3h4l4 5 2 8 6 2h6v-8h2l3 5 6-1 3-3-1-3-2-2 1-4h3l4-2-2-4-1-4 3-5 5-8 4-4 3-1v-4h-3l-2-4 1-3 5-1 3-1 4-1-1-7 4-2-5-3-4 5h-11l-1-2-4-2 3-3v-4l-1-2v-1l3-3 1-5 2-6-2-3h-4l-2-2-1 4-4-2-5 2-4-1-9-8h-5l-1-12-10-1v-5l-2 1h-10v3l3 10v11l-1 2-2-8-5-20-19-17 1-7-4-1z",
				onClick: n[80] ||= (t) => e.onClick(t),
				onDblclick: n[81] ||= (t) => e.onDblClick(),
				onMouseenter: n[82] ||= (t) => e.onEnter(t),
				onMouseleave: n[83] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-24",
				style: k({ display: e.config.displayPath["FR-24"] }),
				d: "m372 566-3 6h-6v9l-17 12v12l-7 7-3 3-7-1-4 7-1 2 1 3h4l2 3-2 5-1 6-3 2v2l1 1v4l-2 3 3 2 1 3 11-1 4-5 5 3-4 2 1 7 5 4 1 7 5 2 3-3h8l3-3h3v3h8l1-2h3l3 3v3l-3 1 1 2 4 1 4-4h4l3 3 5 2 1-1 3-3 1-6h7l6-8h-3v-4l6-1v-4l3-1 4-6-4-4v-4l3-2-3-5v-8h-8l-3-2 3-3-4-4 3-3-3-2v-5l7-6-4-3-2-6-8-1-2-2 5-2-2-3-8-1-2-7-11-1-3 3-2 1-3-4 1-4-2-4z",
				onClick: n[84] ||= (t) => e.onClick(t),
				onDblclick: n[85] ||= (t) => e.onDblClick(),
				onMouseenter: n[86] ||= (t) => e.onEnter(t),
				onMouseleave: n[87] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-47",
				style: k({ display: e.config.displayPath["FR-47"] }),
				d: "M345 664h-4l-3 1-5 1-1 4 2 3 3 1v3l-3 1-3 4-6 8-2 5 1 5 1 3-4 2h-3l-1 4 3 2v3l-3 3-5 1v1l2 8 7-1 5 2h4l2 3-4 4-1 7 1 2 1-3 5 4 5-6 3 4 6-1 7-1 2-5 11-1 6 5 2-2 3-1-1-5 5-1 7-2-2-4 3-3 1-6-4-5 3-8 6 3 7-1-3-8-3-11h7l2-4-6-2-3-3h-4l-4 4-4-1-1-2 3-1v-3l-3-3-3-1-2 2h-7v-2h-2l-4 3h-8l-3 3-5-2-1-7-5-4z",
				onClick: n[88] ||= (t) => e.onClick(t),
				onDblclick: n[89] ||= (t) => e.onDblClick(),
				onMouseenter: n[90] ||= (t) => e.onEnter(t),
				onMouseleave: n[91] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-46",
				style: k({ display: e.config.displayPath["FR-46"] }),
				d: "m441 634-7 4h-1l-3 2v4l4 4-4 6-3 1v4l-6 1v3l3 1-6 8h-8v6l-3 3-2 5h-7l3 11 3 7 4-1 1 2-3 3 2 4h3l3 4h3l2-3 1 1v3l1 4h7l5-5 3-1 1 2 2 4h3l1-7 5 1 3-4 6 1 8-4v1l2-2-3-5-1-7 4-3h2l6-6h3l1-2h7l2-2 1-2-3-1 2-6-5-2 5-10-6-5-2-13-6-2-4 4-2-3-6 6h-4l-8-10z",
				onClick: n[92] ||= (t) => e.onClick(t),
				onDblclick: n[93] ||= (t) => e.onDblClick(),
				onMouseenter: n[94] ||= (t) => e.onEnter(t),
				onMouseleave: n[95] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-09",
				style: k({ display: e.config.displayPath["FR-09"] }),
				d: "m422 817-2 2-1 1 5 4 1 2-1 2-8 1-2 3v1l3 1 2 2-2 3h-2l-4-3-4-2-5 1-7 4v7l2 1-1 5-8 2-4 4v7l2 1-3 3 1 1 11 3h5l7 7h15l6 9 6-2 15 2 1 7 12-2 4-4 6-2 1-3 14-1-8-9-7 3-12-9 3-4h9l-1-9v-6l-2-13-17-8v-3l-3-4-3 1-4 1-7-4h-2l3 4-1 2h-6l-1-4-3-5z",
				onClick: n[96] ||= (t) => e.onClick(t),
				onDblclick: n[97] ||= (t) => e.onDblClick(),
				onMouseenter: n[98] ||= (t) => e.onEnter(t),
				onMouseleave: n[99] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-32",
				style: k({ display: e.config.displayPath["FR-32"] }),
				d: "m368 735-11 1-2 5-7 1-6 1-3-4-5 6-5-4-2 6v4l-4 1-2-2-1-6-5 5-4-2-4 1-4 4 5 8-3 2 1 7-4 4-2 7 3 5 9 1 3-2h6v6l4 2 4 1 2 5 1 1-1 4-1 1 4 2v3h5l1-1h5l1 3h5l1 3h9l6 3 1-1 4-2 6-8 12 1 5 3 2-2 3-8 3-7 7-3 3-2-1-2-3-1-2-3h-2l-4-4v-3l-6-6-1-3-3 1-1-2 2-3-3-3v-4l-2-3h-7v-4l4-3v-4l4-1-2-2-3 2h-5l-2-2h-1l-1 2z",
				onClick: n[100] ||= (t) => e.onClick(t),
				onDblclick: n[101] ||= (t) => e.onDblClick(),
				onMouseenter: n[102] ||= (t) => e.onEnter(t),
				onMouseleave: n[103] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-31",
				style: k({ display: e.config.displayPath["FR-31"] }),
				d: "m437 754-5 2-2 3-2-2-4-1v3l-3 1 4 2-3 4-8 2-3-4h-4l-2 1h-10l-1 1 1 3 6 6v3l4 4h2l2 3 3 1 1 2-3 2-7 3-3 7-3 8-2 2-5-3-12-1-7 8-3 2-2 4-3 3v3l-4 1-3 6-1 3 6 4 1 4-2 4 4-2 2 2 2 7-5 2v4l-2 2-3-2h-4l1 20 14 1 1-18 5 1 8 4 3-3-2-1v-7l4-4 8-2 1-5-2-1v-7l7-4 5-1 4 2 4 3h2l2-3-2-2-3-1v-1l2-3 8-1 1-2-1-2-5-4 1-1 2-2h3l3 5 1 4h6l1-3-3-3h2l7 4 4-1 3-1-1-1 5-2 1-5 6-3-2-4 5-4 3 4 7-2h2v-7h-4l-5-1-4-5-2-3-8-3-2-3 2-1v-4l-2-2-4-6v-4l-1-1-4-4-2-5z",
				onClick: n[104] ||= (t) => e.onClick(t),
				onDblclick: n[105] ||= (t) => e.onDblClick(),
				onMouseenter: n[106] ||= (t) => e.onEnter(t),
				onMouseleave: n[107] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-82",
				style: k({ display: e.config.displayPath["FR-82"] }),
				d: "m391 703-3 8 4 5-1 6-3 3 2 4-7 2-5 1 1 5-3 1 2 2h5l3-2 2 2-4 1v4l-4 3v4h7l2 3v4l3 3-2 3 1 2 4-2h10l2-1h4l3 4 8-2 3-4-4-2 3-1v-3l4 1 2 2 2-3 5-2 2 1 2-3-3-3h6l2-4 4-4h-4l2-5 11-2 4-2 5-2 2-2-2-5 3-6h-6v-8l-8 3-5-1-4 4-5-1-1 7h-3l-1-4-1-2-3 1-6 5h-7l-1-4v-4l-3 3h-3l-3-4h-3l-2-4 3-3v-2h-5v2l-7 1z",
				onClick: n[108] ||= (t) => e.onClick(t),
				onDblclick: n[109] ||= (t) => e.onDblClick(),
				onMouseenter: n[110] ||= (t) => e.onEnter(t),
				onMouseleave: n[111] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-12",
				style: k({ display: e.config.displayPath["FR-12"] }),
				d: "m529 645-11 9v9h-2l-1 8-3 1-2 4h-11l-1-1h-5l-3 5h-1l-1 2-2 2h-7l-1 2h-3l-6 6h-2l-4 3 1 7 3 5-2 2v8h5l-3 6 3 6 3-2 1 3 4-4h6l7 4 10 2 4 7 6 2 3 8-1 3 4 7v3l7 9 6 3 4-1 2-3 3 1 6 4h10l-1-11v-3h3l6 3h5l-1-6 3-3 7-1v-5l6-3-1-7h-6l-5-1-1-4 4-1v-5l4-4-3-1-9 1 1-4-6-2-2-13v-8l-5-4 1-7-11-13-1-10h-4l-1-11-8 1v-6z",
				onClick: n[112] ||= (t) => e.onClick(t),
				onDblclick: n[113] ||= (t) => e.onDblClick(),
				onMouseenter: n[114] ||= (t) => e.onEnter(t),
				onMouseleave: n[115] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-81",
				style: k({ display: e.config.displayPath["FR-81"] }),
				d: "M484 726h-6l-4 4-1-3-3 2-1-1-1 2-5 2-5 2-11 2-1 5h4l-4 4-2 4h-6l3 3-2 3 1 1 1 4 4 5 1 1 1 4 3 5 3 3v4l-3 1 2 3 8 4 2 2 4 5 5 1h4v7l2-1v3h7l6 2 1-7h3l11 2h11l8-2 2-7-6-5 2-5 3-5 5 4 13-5 2-4-6-4-3-1-2 3-4 1-6-3-7-9v-4l-4-6 1-3-3-7-6-3-4-7-10-2z",
				onClick: n[116] ||= (t) => e.onClick(t),
				onDblclick: n[117] ||= (t) => e.onDblClick(),
				onMouseenter: n[118] ||= (t) => e.onEnter(t),
				onMouseleave: n[119] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-01",
				style: k({ display: e.config.displayPath["FR-01"] }),
				d: "M692 478h-4l-2 5-7 26-1 3-1 8-2 3v12l-1 3 7 4h3l4 4 1 6 5-1 7 2v-1h4l5 4 4-2 3-7 2-3 3 1 3 2 2 5 14 18 5-3v-7h5v-12l3-2v-11l1 1v-4l-2-4 1-10 4 2 2-3 3-1 4-3h-4v-7l4-3h7v-4l-2-1 5-7-1-2-6-4-15 17h-10v-5l-6-2-7 7-5 1v-5l-5-2-7-10-7-3-2-5h-3l-4 2-3 1z",
				onClick: n[120] ||= (t) => e.onClick(t),
				onDblclick: n[121] ||= (t) => e.onDblClick(),
				onMouseenter: n[122] ||= (t) => e.onEnter(t),
				onMouseleave: n[123] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-38",
				style: k({ display: e.config.displayPath["FR-38"] }),
				d: "m719 544-2 3-3 7-4 2-5-4h-4v5l5 4-8 10-10 3-8 2 5 5 1 3-8 4v11h-1l2 5 7 2 4-2 5-3 7 5h6l3 6-1 3v6l-1 6v1h3l6 2 9 2 3-2 2-3h1v29l2 2h5l5 3 4 3h3l2 2 7 1v-1l-3-2v-4h10l2-3-1-3 4-4 4 2 4-4 9 1 2-3h7v-8l-3-1-1-5h-8l-1-2 2-8 2-2-2-3-4-2-2 2 1-3v-3l-3-3 1-8 4-2-1-5-7-7h-3l-2 3-5-7-2 1-3 5 2 3-1 1-3-2-10-2-4-8v-3l-4-5-1-2-14-18-2-5-3-2z",
				onClick: n[124] ||= (t) => e.onClick(t),
				onDblclick: n[125] ||= (t) => e.onDblClick(),
				onMouseenter: n[126] ||= (t) => e.onEnter(t),
				onMouseleave: n[127] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-74",
				style: k({ display: e.config.displayPath["FR-74"] }),
				d: "m808 484-8 2-8 6-2-3h-4l-4 8 1 3 4 4-8 4-4 5h-8l-4 3-4 1-1 3-4-2-1 10 2 4v4l3 2v10l7 2 3 5h6l2-2h3l5 6 2 2 6-1 2-3 2-7 3-2 3-8 4-3 2 1 1 2-2 3 4 4h5l4 6-1 2 4-3 3-3 2 1v-7l12-5 2-3-1-8-8-8-3 1v-9l-6-3-1-3 4-4v-5l-6-7v-5z",
				onClick: n[128] ||= (t) => e.onClick(t),
				onDblclick: n[129] ||= (t) => e.onDblClick(),
				onMouseenter: n[130] ||= (t) => e.onEnter(t),
				onMouseleave: n[131] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-42",
				style: k({ display: e.config.displayPath["FR-42"] }),
				d: "m611 506-6 1-1 4 2 5 1 21h-9v3l6 5-3 3-2 8 5 6 4 9 9 6 3 12-6 7 1 4 10 3 8-6h3l12 5-1 6h6l5 5h3l6-2 2-7 9-5v-11h1l-5-1-3 2-4-2 4-5-1-4-12-2-10-9v-3l2-2v-3l-3-2 3-3v-5l-5-4v-5l-3-3v-4l-2-5 3-3v-7h7l2-2-2-4v-4l-2-1-1 7h-4l-3 3-2-2-12-2-4 3h-3l-1-3-5-1-1-5z",
				onClick: n[132] ||= (t) => e.onClick(t),
				onDblclick: n[133] ||= (t) => e.onDblClick(),
				onMouseenter: n[134] ||= (t) => e.onEnter(t),
				onMouseleave: n[135] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-69",
				style: k({ display: e.config.displayPath["FR-69"] }),
				d: "M671 501h-4l-3 4-2-3-4 3-4-3h-4l-1 1-1 4 2 2v3l2 4-1 2h-8v7l-3 3 2 6v3l3 3v5l5 4v5l-3 4 3 1v3l-2 2v3l10 9 12 2 1 4-4 4 4 2 3-1 5 1 7-4-1-3-5-5 8-2 10-3 8-10-5-4v-4l-7-2-5 1-1-6-4-4h-3l-7-4 1-3v-12l2-3 1-8-1 2h-3l-1-7z",
				onClick: n[136] ||= (t) => e.onClick(t),
				onDblclick: n[137] ||= (t) => e.onDblClick(),
				onMouseenter: n[138] ||= (t) => e.onEnter(t),
				onMouseleave: n[139] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-73",
				style: k({ display: e.config.displayPath["FR-73"] }),
				d: "M754 535v11l-3 2v12h-5v7l-5 3 1 2 4 5v3l5 8 9 2 3 2 1-1-2-3 3-5 2-1 5 7 2-3h3l7 7 1 5-4 2-1 8 3 3v3l-1 3 2-2 4 2 2 3 7-1 2 2 1 6 6-1 1-6 3-1h7l11-4 4 2h4v-4l5-3 2-2 9-3 1-7-1-2 5-9-5-2-2-5-9-6s1-11-1-13c-2 0-7 1-7 1l-5-7v-5l-2-1-3 3-4 3 1-2-4-6h-5l-4-4 2-3-1-2-3-1-3 3-3 8-3 2-2 7-2 3-6 1-2-2-5-6h-3l-2 2h-6l-3-5-7-2v-10z",
				onClick: n[140] ||= (t) => e.onClick(t),
				onDblclick: n[141] ||= (t) => e.onDblClick(),
				onMouseenter: n[142] ||= (t) => e.onEnter(t),
				onMouseleave: n[143] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-07",
				style: k({ display: e.config.displayPath["FR-07"] }),
				d: "m677 599-8 5-2 7-6 2h-3l-2 9-5 2-2 4 1 5 1 2h-6v7h-5l-3 9h-9l-9 7-6 8 1 2 3 13 6 6-1 8 8 5v10l4-2 8 6 4 1 1-7 5-1 2 5h5l1-5 12 6 2-4 5-1v-7l-1-2h-2v-3l2-3-2-3 1-7 4-5v-8l-1-9 3-1 1-4 3-7 2-5-3-8-2-6-3-11v-15h-1z",
				onClick: n[144] ||= (t) => e.onClick(t),
				onDblclick: n[145] ||= (t) => e.onDblClick(),
				onMouseenter: n[146] ||= (t) => e.onEnter(t),
				onMouseleave: n[147] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-26",
				style: k({ display: e.config.displayPath["FR-26"] }),
				d: "m695 601-5 3-4 2-5-2v15l3 11 2 6 3 8-2 5-3 7-1 4-4 1 2 9v8l-4 5-1 7 1 3-1 3v3h2l1 2v7h5l2 2-1 7 1 2 5-5 5-1 1-2-6-1-1-7 4-6h5l5 5-5 6 1 3 8 1 4-4-2 5v4l8 1 10 1 2 4 5 5h5l3-3 2-6 3 3 2 3 1-14h-3l-2-5-13-3-1-6 4-3-4-3 1-3h6l5 3 4-5-4-3v-5l3-6 7-1 6-3 1-1-7-1-2-2h-3l-4-3-5-3h-5l-2-2v-29h-1l-2 3-3 2-9-2-6-2-3 1v-2l1-6v-5l1-4-4-6h-5z",
				onClick: n[148] ||= (t) => e.onClick(t),
				onDblclick: n[149] ||= (t) => e.onDblClick(),
				onMouseenter: n[150] ||= (t) => e.onEnter(t),
				onMouseleave: n[151] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-17",
				style: k({ display: e.config.displayPath["FR-17"] }),
				d: "m260 492-5 1-11 6 3 3-6 5-1 3-5 1-3-3-7-1-1-4-4-3-6 3 3 5h5l6 4 3 3 8-1 2 4 4 1 2 5 4 1-1 4-4-1-1 3 3 4-2 8h-4v5l1 2h-5l-1-3 4-4-2-3-1-1-1-9-6-1-5-6-1 13 8 6 1 7 2 8v8l5-1 7 6 5 3 1 4 4 1 11 11 3 13h10l2-2 1 5 9 1 1 12h6l8 9h4l5-2 4 2 3-6 2-5-7-5-2-3-4-4-7 1-3-1v-2l4-1v-1l-3-1-2-1 5-4v-3l-2-2 1-2 1-4-3-3-2-3-4-5-3-1 2-4h-1l-1-8-3-2 4-2h6l2-2h4l1 2h4l3-1 1-7 3-11-3-3-1-4-5-3-7-4-8 1-5-7h-7l-6-5v-2l-4-5-1-5-5-4-7 3z",
				onClick: n[152] ||= (t) => e.onClick(t),
				onDblclick: n[153] ||= (t) => e.onDblClick(),
				onMouseenter: n[154] ||= (t) => e.onEnter(t),
				onMouseleave: n[155] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-19",
				style: k({ display: e.config.displayPath["FR-19"] }),
				d: "m475 561-1 3-6 2-3 4h-2l-4-1-3 4-4 1-3 5h-4l-2 2h-7l-3 4-2-1-5 6-5-2-2 5 2 4 4 3-7 6v5l3 2-3 3 4 4-3 3 3 2h8v8l3 5h1l7-4 10 4 7 10h4l6-6 2 3 4-4 5 2 1 1 4-3-1-4-2-2 3-4h2l2-6 2-3-1-6 4-6 7-5v-9l3 1 4 4h4l2-2-2-5 2-6-1-6-2-3v-5l3-5-1-5-1-1-3 3h-7l-3 3h-4l-4-3-1-3h-9l-2-2z",
				onClick: n[156] ||= (t) => e.onClick(t),
				onDblclick: n[157] ||= (t) => e.onDblClick(),
				onMouseenter: n[158] ||= (t) => e.onEnter(t),
				onMouseleave: n[159] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-23",
				style: k({ display: e.config.displayPath["FR-23"] }),
				d: "m457 487-2 6h-6l-2-1h-4l-3-2-7 7v6l-4 8 1 5 5 1 3 8 3 3-1 15 7-2 2 3-4 4v3l4 1 6-1 2-3h1l-1 5 6 2 4 4v2h-2v4l2 2 1-1 6-1 1-4h3l2 2h9l2 3 3 3h4l3-3h7l3-3-7-8-1-3 7-4 4-2 1-5 4-3-1-7-3-4-1-11-4-9-4-2-3-5-2 4-3-4v-4l-4-6-12 1-7-2z",
				onClick: n[160] ||= (t) => e.onClick(t),
				onDblclick: n[161] ||= (t) => e.onDblClick(),
				onMouseenter: n[162] ||= (t) => e.onEnter(t),
				onMouseleave: n[163] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-87",
				style: k({ display: e.config.displayPath["FR-87"] }),
				d: "m427 493-3 3-10-1h-1l-6 1-5 4v4h-7l-5 6-3 2 3 3-1 9-2 4 3 3h5l1 5 1 4-7 1-3 1 1 9-5 3-3 1-2 5h-3l-1 6h8l2 4-1 4 3 4 2-1 3-3 11 1 2 7 8 1 2 3-5 2 2 2 8 1v2l2-4 5 1 5-6 2 1 3-4h7l2-2h4l3-5 4-1 3-4 4 1h2l2-3-2-2v-4h2v-2l-4-4-6-2 1-5h-1l-2 3-7 1-3-1v-3l4-4-2-4-7 3 1-15-3-3-3-8-5-1-1-5 4-8v-6 1z",
				onClick: n[164] ||= (t) => e.onClick(t),
				onDblclick: n[165] ||= (t) => e.onDblClick(),
				onMouseenter: n[166] ||= (t) => e.onEnter(t),
				onMouseleave: n[167] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-86",
				style: k({ display: e.config.displayPath["FR-86"] }),
				d: "m333 409-7 8-2 3 1 8h3v4l2 6 2 5-3 2 1 2-1 3v1l3 3v2l-2 3-4 6 4 2 2 3-2 4v2l-3 4v3h2v8l3 2-2 3 1 2 3 4 2-3v-1l3-2 2 2v5l-2 3-2 5 2 4 6 2-1 3-5 1 4 6 7-1 5-1 6 3 2-2-1-5 3-2 3 4 2 3 7-3 3-3h6l3 2 1-7-3-3 3-2 5-6h7v-5l5-3 9-2 1-5-4-2-2-8h-6l-3-4-7-5 1-5v-7l-6-6-1-5-6-7-3-8-2-1-3-4-3 2 1 3-9 3h-11v-12l-9-2v-4l-6-2-2-5h-3z",
				onClick: n[168] ||= (t) => e.onClick(t),
				onDblclick: n[169] ||= (t) => e.onDblClick(),
				onMouseenter: n[170] ||= (t) => e.onEnter(t),
				onMouseleave: n[171] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-16",
				style: k({ display: e.config.displayPath["FR-16"] }),
				d: "m365 519-3 2 1 5-2 2-6-3-5 1-7 1-4-6h-2l-6 4-5 1v2l-3 4 1 1-4 3-2 11-1 7-3 1h-4l-1-2h-4l-2 2h-6l-4 2 3 2 1 8h1l-2 3 3 2 4 4 2 4 3 3-1 4-1 2 2 2v3l-5 3 2 2 3 1v1l-4 1v2l3 1 7-1 4 4 2 3 7 5 2-2 7 1 3-3 7-7v-12l17-12v-9h6l3-6h2l1-6h3l2-5 3-1 5-3-1-9 3-1 7-1-1-4-1-5h-5l-3-3 2-4v-3l-3-1h-6l-3 3-7 3-2-3z",
				onClick: n[172] ||= (t) => e.onClick(t),
				onDblclick: n[173] ||= (t) => e.onDblClick(),
				onMouseenter: n[174] ||= (t) => e.onEnter(t),
				onMouseleave: n[175] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-79",
				style: k({ display: e.config.displayPath["FR-79"] }),
				d: "m320 416-10 1-9 1-10 1v5l-5 3-11-2-7 3 3 5v4l9 8-2 4 6 7-3 3 4 6 1 10-2 3 2 4-2 5v3l3-3 3 4-5 3-1 2-5 1-4 2h-1l1 6 4 4v2l5 5h8l5 7 8-1 7 4 5 3 1 4 3 3 3-2-1-2 3-4v-2l5-1 6-4 7-1 1-3-6-2-2-4 2-5 2-3v-6l-2-1-3 1v2l-2 3-3-4-1-2 2-3-3-2v-8h-2v-3l3-4v-2l2-4-2-3-4-2 4-6 2-3v-2l-3-3v-1l1-3-1-2 3-2-2-5-2-6v-4h-3l-1-8v1l-3-2z",
				onClick: n[176] ||= (t) => e.onClick(t),
				onDblclick: n[177] ||= (t) => e.onDblClick(),
				onMouseenter: n[178] ||= (t) => e.onEnter(t),
				onMouseleave: n[179] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-22",
				style: k({ display: e.config.displayPath["FR-22"] }),
				d: "m113 220-3 3-8 1-2 2-6-4-7 5 2 4-5 7-2 9 5 1-1 4 3 2-2 3-3 1 1 4 4 1-4 1v5l3 3v11l-1 2 1 5 6 1v3l4 1 3-2 2 2 7 2 5-3 2-3h4l6 5 5-1 4 4h2l2 3h5l1-2 2 4 4 1 6-3v-4l4-1h3l3 5 7 1 4-4 4-9 5-2 2-3 3 2 6-1 2-16 1-7-1-4-3-1-2-11-3 3-7-1v4l-5 1v-5l-4-1-2 2v-7l-4 4-7-2-2 5-13 7v4h-3v-7l-8-4 1-6-7-5v-6l-5-1v-6l-4-1 1-4h-8l-1 4z",
				onClick: n[180] ||= (t) => e.onClick(t),
				onDblclick: n[181] ||= (t) => e.onDblClick(),
				onMouseenter: n[182] ||= (t) => e.onEnter(t),
				onMouseleave: n[183] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-85",
				style: k({ display: e.config.displayPath["FR-85"] }),
				d: "m240 417-2 3h-6l3 3-2 6-6 2-2-2 1-6-1-3h-4l-2 2 1 9 3 4-3 3-5-1-7-2-2-6h-5l-6-3-2-4-7-4-10 14-1 9 11 10v4h3l7 20 7 4 8 7h8l3 7h8l4 6 8 4v-6l2 2 11-6 5-1 2 6 7-3 6 4 4-2 5-1 1-2 5-3-3-4-3 3v-3l2-5-2-4 2-3-1-10-4-6 3-3-6-7 2-4-9-8v-4l-3-5-5-4h-9l-3-2-4-1-5-4z",
				onClick: n[184] ||= (t) => e.onClick(t),
				onDblclick: n[185] ||= (t) => e.onDblClick(),
				onMouseenter: n[186] ||= (t) => e.onEnter(t),
				onMouseleave: n[187] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-50",
				style: k({ display: e.config.displayPath["FR-50"] }),
				d: "m205 136-1 3 7 7v7l-3 4 2 2h1v7l2 6 8 9 2 9 2 2v13l4 9v10l-4 9 5 13 8 2v4l-3 2h-7l1 4 2 7 6 5 3 1 3-4h3l4-5 4 3h4l3 1v1l6 1 4-3 5 2 6-5 2-7v-3l1-3-4-4-9-6h-7l-7-9 6-2 2-5-3-2 3-3 2 2 5-3 3-4 1-5-2-4 2-2-3-4 3-4-3-3-2 4-5-3-7-6v-3l2-3v-3h-4v-8l-10-11 3-8h4l-3-9-16-1-8 6-9-6z",
				onClick: n[188] ||= (t) => e.onClick(t),
				onDblclick: n[189] ||= (t) => e.onDblClick(),
				onMouseenter: n[190] ||= (t) => e.onEnter(t),
				onMouseleave: n[191] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-56",
				style: k({ display: e.config.displayPath["FR-56"] }),
				d: "m88 289-6 3h-4l-5 3v3l3 7 1 5 10 2 4 4 2-3 3 4-2 2v5h-3l-2 4h-4l-2 7 4 6 6 2 2-4-1 4 5 2 7 7 2 4-1 5-1 4 5 4 2-3-2-3v-6l4 1 2-5 1 3 4 4 3-4-3-5 4 6 5-1-1-3 5 2 4 4-2 3-5-2-5-2-3 3 4 2 3 5 20-2 5 1-2 2v4h2l3-3 2 2h6l7-4 10-3 1-11 2-1-4-7 3-3-1-1-1-2 3-1 3-4-1-3h-3l-1-4 2-3-3-6-4-2h-5l-2-1v-2l3-2 1-6-1-4-1 1h-7l-3-6h-3l-4 1v4l-6 4-4-2-2-4-2 2h-4l-2-3h-2l-4-4-5 1-6-5-5 1-1 3-6 3-7-3-1-2-3 2h-4v-3l-6-2z",
				onClick: n[192] ||= (t) => e.onClick(t),
				onDblclick: n[193] ||= (t) => e.onDblClick(),
				onMouseenter: n[194] ||= (t) => e.onEnter(t),
				onMouseleave: n[195] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-29",
				style: k({ display: e.config.displayPath["FR-29"] }),
				d: "m60 231-5 4-4-2-8 1-1 4-5 1-1-4-8 1v3h-6l-2-2-3 2-1 4H7l-6 6 5 4-6 4 2 4-2 7 6 1 2-2 1 1 14-1 9-7-8 8 1 3 7-3-1 5h7v3l-8-1-7-2-9-3-5 5 7 3-1 9 2-1 4-6 8 4 3 1 2 5-2 4h-9l-8 1-12 1-2 3 3 2h4l4 3 4-1 8 9 2 9-3 5 8 2h8l2-4-4-4 4 1h3l6 3h3v-7l2 7 5 7 10 1v-2l2 3 7 1h4l1 1 1-7h4l3-4h2l1-5 1-2-3-3-2 2-4-4-9-1-2-6-3-7v-2l5-4h4l6-3-1-4 1-2v-11l-3-3v-5l4-1-4-1-1-4 3-1 2-3-3-2 1-4-5-1 2-9-6-4-10 1v7h-3v-3h-5z",
				onClick: n[196] ||= (t) => e.onClick(t),
				onDblclick: n[197] ||= (t) => e.onDblClick(),
				onMouseenter: n[198] ||= (t) => e.onEnter(t),
				onMouseleave: n[199] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-35",
				style: k({ display: e.config.displayPath["FR-35"] }),
				d: "m199 244-4 3 3 12 3 1 1 3-1 7-2 16-6 1-3-2-2 3-5 2-4 9-3 3 1 3-1 6-3 3v2l2 1h5l5 2 3 6-3 3 1 4h4v4l-3 3-3 2 2 1v2l-3 2 4 7 7-3 22-2 2-4 3-3 8-1 1-4h5l3 5 8 2 1-3 2-7 5-11 2-2 6 1v-10l-2-2v-11l-1-3v-6l3-4v-7l-2-1 1-11-3-1h-4l-4-3-4 5h-3l-3 4h-3l-6-6-2-7-1-4h-18l-7-4 5-6z",
				onClick: n[200] ||= (t) => e.onClick(t),
				onDblclick: n[201] ||= (t) => e.onDblClick(),
				onMouseenter: n[202] ||= (t) => e.onEnter(t),
				onMouseleave: n[203] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-44",
				style: k({ display: e.config.displayPath["FR-44"] }),
				d: "m230 336-1 4-8 1-3 4-1 3-23 2-9 5-1 10-10 4-7 3h-5l-3-2-3 3h-1l1 1-6 7 1 1 2 3-4 5 4 2 7 2v-3l4 5h7l5-5h6l-7 3 1 4 1 3-4 4h-4l1 5 7-1 10 9h-1l7 4 2 4 6 3h5l2 6 7 2 5 1 3-3-3-4-1-9 2-2h4l1 3-1 6 2 2 6-2 2-6-3-3h6l2-3h2l5 4 3 1v-4l-2-4h-6l2-2v-3l3-1 1-4-1-1v-5h-4l-4-5v-3l4-3 8-1h11l4-2-1-7-6-5h-6l-2-1v-6l4-4-3-4-3-6-3-3v-4l-1-1-7-2-3-4z",
				onClick: n[204] ||= (t) => e.onClick(t),
				onDblclick: n[205] ||= (t) => e.onDblClick(),
				onMouseenter: n[206] ||= (t) => e.onEnter(t),
				onMouseleave: n[207] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-49",
				style: k({ display: e.config.displayPath["FR-49"] }),
				d: "m247 341-1 2h-1v5l4 2 3 7 3 4-4 4v6l2 1 6-1 6 5 1 8-4 2h-11l-8 1-4 2v4l4 5h4v5l2 1-2 4-3 1v3l-2 2h6l3 4v4l3 2h9l5 4 7-3 11 2 5-3v-5l10-1 9-1 10-1 1 3 3 2 2-4 7-8h3l4-15 5-6v-8l4-5v-2l-2-2 1-3-5-1-15-10-14-4h-5v-4l-4-2h-3l-6-3-5 5h-9l-4-2-11-4-2 3-6-3h-6z",
				onClick: n[208] ||= (t) => e.onClick(t),
				onDblclick: n[209] ||= (t) => e.onDblClick(),
				onMouseenter: n[210] ||= (t) => e.onEnter(t),
				onMouseleave: n[211] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-72",
				style: k({ display: e.config.displayPath["FR-72"] }),
				d: "M358 273h-9l-10 9h-5l-7 2-2 4-1 7 1 5-6 5-1 3 1 3-2 3 1 2h-6l-1 3 3 6-1 2-2 2-5 1-1 1 2 2v11l-1 3 3 2v4h5l14 4 15 10 5 1 3-4 7 5h4l-2-8 4 3 2-3 11-3-2-5 3-3 5-2 5-6v-7h4l1-5 1-8-4-3 3-5 4-6-5-3-5-1-5-7h-1l-1 3v-2h-7l-4-6-6-2-2-13z",
				onClick: n[212] ||= (t) => e.onClick(t),
				onDblclick: n[213] ||= (t) => e.onDblClick(),
				onMouseenter: n[214] ||= (t) => e.onEnter(t),
				onMouseleave: n[215] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-53",
				style: k({ display: e.config.displayPath["FR-53"] }),
				d: "M321 263h-3l-2 4-5 2-10-1-10 5-3-2-6 4-4-3-2-5-6-2-3 3-6-1-1 10 2 1v7l-3 4v6l1 3v11l2 2v10l-6-1-2 2-5 11-2 7-1 1 7 1h5l6 4 3-3 10 4 5 2h9l4-5 7 3h4l1-3v-11l-2-2 1-2h5l2-2 1-2-3-6 1-3h6l-1-2 2-4-1-2 1-3 6-5-1-4 1-8 2-4 7-2h-1l-2-6-5-2-1-8z",
				onClick: n[216] ||= (t) => e.onClick(t),
				onDblclick: n[217] ||= (t) => e.onDblClick(),
				onMouseenter: n[218] ||= (t) => e.onEnter(t),
				onMouseleave: n[219] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-14",
				style: k({ display: e.config.displayPath["FR-14"] }),
				d: "m359 173-9 2-13 8-16 6-12-7-30-4-7-4-10 3v4l-2 2v3l7 7 5 2 2-4 3 3-3 4 3 4-2 2 2 4-1 5-3 5-5 2-2-1-3 2 3 3-2 4-6 2 7 9h7l5 4 7-3 6-6 7 2 7-4 4-2 4 5 7-2 6 4 7-3 7-5 4-5h3l1 3h2l1-3 7-1 2 1 7-1 2-4-1-3-4-1v-3l3-2 1-4-2-8-5-7 4-2v-1l-4-1z",
				onClick: n[220] ||= (t) => e.onClick(t),
				onDblclick: n[221] ||= (t) => e.onDblClick(),
				onMouseenter: n[222] ||= (t) => e.onEnter(t),
				onMouseleave: n[223] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-61",
				style: k({ display: e.config.displayPath["FR-61"] }),
				d: "m366 223-7 1-2-1-7 1-1 3h-2l-1-3h-3l-4 5-7 5-7 3-6-4-7 2-4-5-4 2-7 4-7-2-6 6-7 3 4 2 4 4-1 3v3l-2 7-6 6 2 4 4 3 6-4 3 2 10-5 10 1 5-2 2-4h3l4 3 1 8 5 2 2 6h6l10-9h9l3 4 2 13 6 2 4 6h7v2l1-4h1l6 8 3 1v-9l-2-3-1-3 6-3 5-1 4-5-1-13-8-7v-6l-6-4 2-4-2-5-5-2-3-3-2-5-10-1-3-4z",
				onClick: n[224] ||= (t) => e.onClick(t),
				onDblclick: n[225] ||= (t) => e.onDblClick(),
				onMouseenter: n[226] ||= (t) => e.onEnter(t),
				onMouseleave: n[227] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-28",
				style: k({ display: e.config.displayPath["FR-28"] }),
				d: "m441 225-2 2v6l-8 4v5l-2 2h-9l-4-1-13 7h-5l-5 4 1 1v6l8 7v13l-3 5-6 1-5 3 1 3 2 3v9h1l5 3-2 3 4 2 5-1h4v1l-4 2 3 1h5l2 5 3 1 2 5 8 3 5-1 4-4 4 1 1-2v-3l2-1 3 2 3-2v-2l2-2 3 1 2 2 4-2h5l3-3 2-7h3l-1-7 3-3-1-2 1-1h-1l-1-9-1-2-1-4-7-2-3-4-1-7-5-1v-4l-6-4-2-6 2-4-2-3v-4l1-4-3-3-1-4z",
				onClick: n[228] ||= (t) => e.onClick(t),
				onDblclick: n[229] ||= (t) => e.onDblClick(),
				onMouseenter: n[230] ||= (t) => e.onEnter(t),
				onMouseleave: n[231] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-89",
				style: k({ display: e.config.displayPath["FR-89"] }),
				d: "m572 283-3 3-14-1-6 3-3 6 3 3-4 5-4 4 7 6 2 6 4 5v6l-9 8 3 4v5l-6 4h-7l1 4 5 6 1 6 1 4-2 1 5 1h3l2-3h2l3 2-1 3 3 2h3l5 3 2-1 2 2 2-1 3-2 4 1 2-1v-6h1l1 3 4 3v4h6l8 7 5 1v-3l2-3 1 3-1 2 1 2 3-1h3v5l3 2 2-1 6-4v-1l-4-2v-4l4-1 1-2-1-2v-4l3-4 4-9 1-4 3-1v-1l-2-1v-3l5-3 1-5-2-3h-3l-1-1v-4l4-3v-3l-1-2-2 4-2-1-2-4-8 4-14-1-2-4-4-5v-7l-6-7-4 3-6-5 1-10-9-10h-5l-2-2z",
				onClick: n[232] ||= (t) => e.onClick(t),
				onDblclick: n[233] ||= (t) => e.onDblClick(),
				onMouseenter: n[234] ||= (t) => e.onEnter(t),
				onMouseleave: n[235] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-70",
				style: k({ display: e.config.displayPath["FR-70"] }),
				d: "m766 317-6 1-2 3-3 3-3-3-1 1 1 2-4 2 1 3-3 2v5h-6v2l-5 1v5h4l-2 2-1 8h-3l-6 1-6-1-5 1v4l4 1 3 6 1 3-5 5-2 1-2 2 4 1 1 6h3l1 8 1 1v1l3 1 3 3h5l2-2h6l7-6h2l3-2 7 1 6-5 4-1 2-4 3-1 3-5 5-4 5-1 3 3 7-1v-4l3-1 2-3h4l3-3v-9l-1-6v-4l3-2 3-2-12-7-3-3-3-2-3 1-1 2-2 2h-2l-6-6h-7l-4 2-2 1-5-4v-4z",
				onClick: n[236] ||= (t) => e.onClick(t),
				onDblclick: n[237] ||= (t) => e.onDblClick(),
				onMouseenter: n[238] ||= (t) => e.onEnter(t),
				onMouseleave: n[239] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-76",
				style: k({ display: e.config.displayPath["FR-76"] }),
				d: "m431 106-2 3-16 12-27 7-18 6-15 8-9 13-1 10 7 6 10 2h-1l8-1 4-4 3-1 4 6h5l2 4 8-1 9 6-5 2 4 3h2l3 5h4l1-3-3-2 9-3 9-1 2-6 5-4 8-1 10 5 5 1 1-3 3-5 1-2h-3v-6l-2-4 1-7 1-4h-2l1-4 4-4-4-6-1-7-16-15-2-4h-4z",
				onClick: n[240] ||= (t) => e.onClick(t),
				onDblclick: n[241] ||= (t) => e.onDblClick(),
				onMouseenter: n[242] ||= (t) => e.onEnter(t),
				onMouseleave: n[243] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-27",
				style: k({ display: e.config.displayPath["FR-27"] }),
				d: "m374 167-3 1-4 4-8 1 1 14 4 1v1l-4 2 5 7 2 8-1 4-3 2v3l4 1 1 3-3 9 3 3 10 1 2 5 3 3 5 2 2 5-2 4 5 3 5-4h5l13-7 4 2h9l2-3v-5l8-4v-6l1-2v-1l2-2-3-1v-2l-2-3 2-2 10-3 2-4 2-8 3-4 1-4 3 2 2-1-1-3-1-8-4-3-5-1-10-5-8 1-5 3-2 7-9 1-9 3 3 2-1 3h-4l-3-5h-2l-4-3 5-2-9-6-8 1-2-4h-5z",
				onClick: n[244] ||= (t) => e.onClick(t),
				onDblclick: n[245] ||= (t) => e.onDblClick(),
				onMouseenter: n[246] ||= (t) => e.onEnter(t),
				onMouseleave: n[247] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-37",
				style: k({ display: e.config.displayPath["FR-37"] }),
				d: "m376 356 1 2-11 3-2 3-4-3 2 8h-4l-7-5-4 7 2 2v2l-4 5 1 8-6 7-4 14 2 6 6 2v4l9 2v12h10l10-3-1-4 3-1 3 4 2 1 3 8 6 7 1 5 5 6 3-1 4-3 3-15 2-5 1-7 6-2 4 1 2 2 3-4 3-3v-3h3l1-3-3-4 1-2-2-2-6-8h-7l-2-3v-12l-3-8v-9l-4-1-4-3h-1l-4 3-2-2-1-3 3-2v-1l-1-1z",
				onClick: n[248] ||= (t) => e.onClick(t),
				onDblclick: n[249] ||= (t) => e.onDblClick(),
				onMouseenter: n[250] ||= (t) => e.onEnter(t),
				onMouseleave: n[251] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-45",
				style: k({ display: e.config.displayPath["FR-45"] }),
				d: "m490 289-5 4-10 1-1 1 1 2-3 3 1 7h-3l-2 7-3 3h-5l-4 2-2-2-3-1-2 2v3l-3 1-3-2-2 1v3l-1 2h4v2l-2 4v2h2l2 2v2l-4 4 2 5v2l4 3h4l3 3 1 4 3 4 4-1 2-3h5l2 2h3l2-2h13l3 5 4 1 3 3h4l1-2h2l3 4h6l2 2 4 6 2 1h2v-5h3l2 3 2 1 4-1-1-1v-4l7-2-1-4-1-6-5-6-1-4h8l5-4v-5l-3-4 9-8v-6l-4-5-2-6-7-6-9 5v-3h-4l-1 3h-14l-4 2-3-2 6-4-1-7-4-2-4-5-9-1z",
				onClick: n[252] ||= (t) => e.onClick(t),
				onDblclick: n[253] ||= (t) => e.onDblClick(),
				onMouseenter: n[254] ||= (t) => e.onEnter(t),
				onMouseleave: n[255] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-36",
				style: k({ display: e.config.displayPath["FR-36"] }),
				d: "m455 401-3 1h-4l-6 2-1 3-1-1h-6l-3 2-3 1-1 2 3 4-1 3h-3v3l-3 3-3 4-2-2-4-1-6 2-1 7-2 5-3 15-4 3-3 1h1v7l-1 5 7 5 3 4h6l2 8 4 2-1 6h-3 1l10 1 3-3 6 5 7-8 3 2h4l2 1h6l2-6 18 3 7 1h3l1-3 3-4v-3l-3-4 1-1v-5l2-2v-1l-3-2-1-4-5-3v-3l4-2v-2l-4-3-1-2 3-1-1-2 5-4-1-1h-3l-2-2v-2l2-3v-2l-4-6v-5l-2-1h-5l-4 1h-5l-2-2-1-2 4-3v-4l-5-4z",
				onClick: n[256] ||= (t) => e.onClick(t),
				onDblclick: n[257] ||= (t) => e.onDblClick(),
				onMouseenter: n[258] ||= (t) => e.onEnter(t),
				onMouseleave: n[259] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-41",
				style: k({ display: e.config.displayPath["FR-41"] }),
				d: "m395 311-2 3-3 5 4 3-1 8-1 5h-4v7l-5 6-5 2-3 3 1 3 18 1 1 1v1l-3 2 1 3 2 2 4-3h1l4 3 4 1v9l3 7v13l2 3h7l6 9 1 1h1l3-1 3-2h6l1 1 1-3 6-2h4l3-1 3 3 5 4 5-1v-4l2-3h2l2 2 7-1 5-2-1-2-1-2v-3l3-6 5-2v-4l1-2-3-1-2-4-4-1-1-2 5-4 5-3-3-4h-13l-2 2h-3l-2-2h-5l-2 3-4 1-3-4-1-4-3-3h-4l-4-3v-2l-2-5 4-4v-2l-2-2h-2v-2l2-3v-3h-3l-5-1-4 4-5 1-8-2-2-6-3-1-2-4h-5l-3-2 4-2v-1h-4l-5 1z",
				onClick: n[260] ||= (t) => e.onClick(t),
				onDblclick: n[261] ||= (t) => e.onDblClick(),
				onMouseenter: n[262] ||= (t) => e.onEnter(t),
				onMouseleave: n[263] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-18",
				style: k({ display: e.config.displayPath["FR-18"] }),
				d: "m493 363-5 3-5 4v2l5 1 2 4 3 1-1 2v4l-5 2-3 6v3l1 2 1 2-5 2-7 1-2-2h-2l-2 3v4l-5 1v4l-4 3 1 2 2 2h5l4-1h5l2 2v4l4 6v2l-2 3v2l2 2h3l1 1-5 4 1 2-3 1 1 2 4 3v2l-4 2v3l5 3 1 4 3 2v1l-2 2v5l-1 1 3 4v3l-3 4v3l8-1 2-4 4-5 9-2 5 1 5-4v-2l-2-2v-6l10-9 3 4 3-4h3l5-6h9v2l3-9-2-3v-5l1-9-4-4 1-9-4-7v-5l-6-5-2-5 4-4v-7l-4-4-4 1-1-1-3-3h-3v5h-2l-2-1-4-6-2-2h-6l-3-4h-2l-1 2h-4l-3-3-4-1z",
				onClick: n[264] ||= (t) => e.onClick(t),
				onDblclick: n[265] ||= (t) => e.onDblClick(),
				onMouseenter: n[266] ||= (t) => e.onEnter(t),
				onMouseleave: n[267] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-21",
				style: k({ display: e.config.displayPath["FR-21"] }),
				d: "M655 320v5l-5 2h-12l1 3v3l-4 2v5l1 1h3l2 2-1 6-5 3v3l2 1v1l-3 1-1 4-4 8-3 5v4l1 2-1 2-4 1v4l4 2 1 3-1 4v3l2 3 5 1 2 4v1l-2 1v3h1l7 8 7-1 6 5 5 4v4l5 1 4 3 11-3 8-3h3l1-2h4l3 2 4-1 4-3 3 1v-1l3-1-1-2-1-2 2-3 6-3v-3l3-3 2-2-1-3 1-4 1-6h1v-2l-1-1-1-8h-3l-1-5-4-2 2-2 2-1 5-5-1-3-3-6-4-1-1 4-8 2-1-2-6-8-3 2h-4l-2-3-6 1v-7l-3-2 4-5-8-11-6-7-6-3z",
				onClick: n[268] ||= (t) => e.onClick(t),
				onDblclick: n[269] ||= (t) => e.onDblClick(),
				onMouseenter: n[270] ||= (t) => e.onEnter(t),
				onMouseleave: n[271] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-58",
				style: k({ display: e.config.displayPath["FR-58"] }),
				d: "m551 369-2 3h-3l-5-1-5 1v4l5 5v7l-4 4 2 5 6 5v5l4 7-1 9 4 4-1 9v5l2 3-3 9v3l6 3 5 4 3-2 4-2 1 3h5l2-3 3 2 1 5 3-1 7-9 3 2 1 1 5-3h3l2 4h3l3-3h3l3-3 2-1 1-2 5 1 1-2-3-2v-2l4-2v-2l-4-2v-8l-2-1 2-3 1-1 2-3-2-1-2-3 3-4 4-2h5v-4l2-1v-1l-2-4-6-1-1-3v-3l1-4-1-2-6 4-2 1-3-2v-5h-3l-3 1-1-2 2-2-2-3-2 3v3h-5l-8-8h-6v-4l-4-3-1-3h-1v6l-2 1-4-1-3 2h-2l-2-1-2 1-5-3h-3l-3-2 1-3-3-2z",
				onClick: n[272] ||= (t) => e.onClick(t),
				onDblclick: n[273] ||= (t) => e.onDblClick(),
				onMouseenter: n[274] ||= (t) => e.onEnter(t),
				onMouseleave: n[275] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-71",
				style: k({ display: e.config.displayPath["FR-71"] }),
				d: "M633 413v1h-5l-4 2-3 4 2 3 2 1-1 3-2 1-2 3 2 2v7l4 2v2l-4 2v2l3 2-1 2-5-1-1 2-2 1-3 3h-3l-3 3h-3l-2-4h-3l-5 3 7 13v5l1 2h7l2 3h5l3 4v14l-8 6h1l1 6 5 1 1 3h3l4-3 12 2 2 2 3-3h4l2-11 1-1h4l4 3 4-3 2 3 3-4h4l2 6 1 7h3l2-5 7-26 2-5h4l4 3 3-1 4-2h3l2 5 2 1 10-1 4-3-2-2-4-2-1-5 4-3 1-6-3-5-2-3 1-1v-4l-3-2v-3l8-1 1-3h-3l-2-2h-4l-3-6h-3v-4l-3-1-4 3-4 1-3-1-4-1-1 2h-3l-8 3-11 3-4-3-5-1v-4l-5-4-6-5-7 1-7-8z",
				onClick: n[276] ||= (t) => e.onClick(t),
				onDblclick: n[277] ||= (t) => e.onDblClick(),
				onMouseenter: n[278] ||= (t) => e.onEnter(t),
				onMouseleave: n[279] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-39",
				style: k({ display: e.config.displayPath["FR-39"] }),
				d: "M725 394v1h-1l-1 6-1 4 1 3-2 2-3 3v3l-6 3-2 3 1 2 1 2-3 1v5h3l3 6h4l2 2h3l-1 3-8 1v3l3 2v4l-1 1 2 3 3 5-1 6-4 3 1 5 4 2 2 2-4 3-10 1 5 2 7 10 5 2v5l5-1 7-7 6 2v5h10l15-17v-8l6-6-4-2 1-2h-5v-3l3-3-1-2-2-4 7-2 2-4 1-4-5-5-4-1-8-2v-8l-1-5-6 1-10-4 1-3 3-6v-3l-2-4-5-3v-6h-4l-1 2h-5l-3-3z",
				onClick: n[280] ||= (t) => e.onClick(t),
				onDblclick: n[281] ||= (t) => e.onDblClick(),
				onMouseenter: n[282] ||= (t) => e.onEnter(t),
				onMouseleave: n[283] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-51",
				style: k({ display: e.config.displayPath["FR-51"] }),
				d: "m607 176-4 2 1 4h-8l-7 5v9l5 3 2 4h-9v4l3 2-2 2-3 2 1 2h4l2 3-3 2-3 7-5 3-2 4-2 2 1 2-3 2-1 5 3 2 1 5-2 3 2 3h5v1h1l7 7 8-2 11-7h6l6-4 7-4h6l1 7 6 10h8l10-2 7 3 8-6 1-9 8-1v-6l-7-5v-3l2-5-2-2 2-5 4-2 3-9-6 1 4-4-3-8-2-5 3-3-2-1-1-2-3-3-4 4h-1l-2-2h-8l-2 2h-2l-3-5h-4l-2 1h-4l-6-5-4-1-2-2-7-5h-9v3l-2 1z",
				onClick: n[284] ||= (t) => e.onClick(t),
				onDblclick: n[285] ||= (t) => e.onDblClick(),
				onMouseenter: n[286] ||= (t) => e.onEnter(t),
				onMouseleave: n[287] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-60",
				style: k({ display: e.config.displayPath["FR-60"] }),
				d: "m459 141-2 2-1 4h2l-1 4-1 7 2 4v6h3l-1 2-3 5-1 3 4 3 1 8 1 3-2 1-3-2-1 4 2 3 2 4 10 1 7-1 4-4 6 4 3 2 4-1 4-2 8 4 8 5 2 3 4-3 4 2 2 2 4-1 2-3 5 3 6-2 3 1 4-3 2-1h1l1-5-3-3-4-3-2 3-1 1-1-6 4-1-1-5h-4l2-4 6-1 2-9 4-2-5-3 2-3v-11l-1-9-8 1-5-1-9 3-9 8-6-3h-7l-5-5-9-3-13 1-3-2h-6l-5 1-2-1v-4l-1-1z",
				onClick: n[288] ||= (t) => e.onClick(t),
				onDblclick: n[289] ||= (t) => e.onDblClick(),
				onMouseenter: n[290] ||= (t) => e.onEnter(t),
				onMouseleave: n[291] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-62",
				style: k({ display: e.config.displayPath["FR-62"] }),
				d: "m482 9-20 3-16 13v50l5 1 2 4 4-1 3-3 3 1 7 5 2-1 2 4 7 3v4l5 2 4-2 9-1 2 2 5-2 2 4-6 3v5l2 2h2l1-3 3-2 3 2 8 3h3v-4l5 3v3l-2 3 4-2 3-1 2 2v3l5-3h9l2-4-1-2h-7l-2-1 4-2h6l1-6 2-2v-3l-4-3h-5l-1-1 3-2 1-2-3-2-3-4v-2l5-3 1-2-4-2-2-4-6-1-7-2v-7l4-3-2-4h-3l-3 4-11-1-9-2-5-5v-5l4-1-4-3h-8l-4-12-8-12z",
				onClick: n[292] ||= (t) => e.onClick(t),
				onDblclick: n[293] ||= (t) => e.onDblClick(),
				onMouseenter: n[294] ||= (t) => e.onEnter(t),
				onMouseleave: n[295] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-59",
				style: k({ display: e.config.displayPath["FR-59"] }),
				d: "m512 0-11 6-18 2h-2l8 12 4 12h8l4 3-4 1v5l5 5 9 2 11 1 3-4h3l2 4-4 3v7l7 2h6l2 5 4 2-1 2-5 2v3l3 4 3 2-1 2-3 2 1 1h5l4 3v3l-2 2-1 6h-6l-4 2h6l3 1 1 2-2 4 3 3 3 1 3-2h4l1 2h1l5-3 4 3 6-4h2l3 2 6-4 2 1 2 2h9v3l4-3h2l2 4 7 2 2-1h-1v-4l7-4-1-7-7-2 2-1v-5l5-4-1-3-12-9-20 1-2 4h-3l1-13-6-7-5 1-2-3-7 3-3-3h-5l-1-5-1-14-3-2v-2h-2l-1-4h-5l-9 3-4 5h-5l-2-3-1-4-4-4h-5l-2-4v-6l2-4-1-6z",
				onClick: n[296] ||= (t) => e.onClick(t),
				onDblclick: n[297] ||= (t) => e.onDblClick(),
				onMouseenter: n[298] ||= (t) => e.onEnter(t),
				onMouseleave: n[299] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-02",
				style: k({ display: e.config.displayPath["FR-02"] }),
				d: "m591 107-6 5-3-3h-2l-6 4-4-3-5 3h-1l-1-2h-4l-3 2v5l-4 5v5l-3 3v5l2 7 2 13v11l-2 3 5 3-4 2-2 9-6 1-2 4h4l1 5-4 1 1 6 1-1 2-3 4 3 3 3-1 5 3 3 1 8 10 9 3 1 2 4 6 2 1-1 2-4 5-3 3-7 3-2-2-3h-4l-1-2 3-2 2-2-3-2v-4h9l-2-4-5-3v-9l7-6h8l-1-3 4-2 7 4 2-1v-12l1-4 1-5-4-3 1-3 6-1v-5l6-3 1-4-2-3 1-6 3-2-3-7 1-6h-7l-2 1-7-2-2-4h-2l-4 4-1-4h-8l-2-2z",
				onClick: n[300] ||= (t) => e.onClick(t),
				onDblclick: n[301] ||= (t) => e.onDblClick(),
				onMouseenter: n[302] ||= (t) => e.onEnter(t),
				onMouseleave: n[303] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-80",
				style: k({ display: e.config.displayPath["FR-80"] }),
				d: "m446 75-1 12 8 7v4l-10-6-12 14 3 1h4l2 4 16 15 1 7 4 6-2 2h5l1 1v4l2 1 5-1h6l3 2 13-1 9 3 5 5h7l6 3 9-8 9-3 5 1 8-1-1-4-2-7v-4l3-4v-5l4-5v-5l-3-1-4-3h-8l-6 3v-3l-1-2-3 1-4 2 2-3v-3l-5-3v4h-3l-8-3-3-2-3 2-1 3h-2l-2-2v-5l6-4-2-3-5 2-2-2-9 1-4 2-5-2v-4l-7-3-2-4-2 1-7-5-3-1-3 3-4 1-2-4z",
				onClick: n[304] ||= (t) => e.onClick(t),
				onDblclick: n[305] ||= (t) => e.onDblClick(),
				onMouseenter: n[306] ||= (t) => e.onEnter(t),
				onMouseleave: n[307] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-08",
				style: k({ display: e.config.displayPath["FR-08"] }),
				d: "m663 96-3 5-4 3v8l-4 3-8 2-4 2-5-4h-7l-1 7 3 6-3 3v5l1 3-1 4-6 3v5l-6 1-1 3 4 3-1 4-1 5v9h9l7 5 2 2 4 1 6 5h4l2-1h4l3 5h2l2-3 8 1 2 2h1l4-4 3 3v-2l5-2 2-2-2-4v-2l4-3 1-8-4-5 1-3 4-6 1 1h6l2 2 3-2 3-4h-3l-1-7-3-3-10-1-2-4-3-3-12-1-1-8 2-2v-3l-6-4 1-4 2-3-3-2 4-4v-6l-1-2h-6z",
				onClick: n[308] ||= (t) => e.onClick(t),
				onDblclick: n[309] ||= (t) => e.onDblClick(),
				onMouseenter: n[310] ||= (t) => e.onEnter(t),
				onMouseleave: n[311] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-10",
				style: k({ display: e.config.displayPath["FR-10"] }),
				d: "m629 249-7 4-6 4h-6l-11 7-8 2-7-7h-1v1l-5 3v4l-3 3-2 8v5l2 2h4l10 10-2 10 7 5 4-3 5 7 1 7 4 5 2 4 14 1 8-4 2 4h2l2-4h12l5-2v-5h11l1 1-1-5-3-2 4-3 6-1 3-3-1-13-1-8-7-2-6-9v-6l2-4-3-1-10 2h-8l-6-10-1-7z",
				onClick: n[312] ||= (t) => e.onClick(t),
				onDblclick: n[313] ||= (t) => e.onDblClick(),
				onMouseenter: n[314] ||= (t) => e.onEnter(t),
				onMouseleave: n[315] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-52",
				style: k({ display: e.config.displayPath["FR-52"] }),
				d: "m684 251-8 1-1 9-8 6-4-2-2 4v6l6 9 7 2 1 8 1 13-3 3-6 1-4 3 3 2 1 5 5 2 6 7 8 11-4 5 3 2v7l6-1 2 3h4l3-1 6 7 1 2 8-2 1-4v-4l5-1 6 1 6-1h3l1-8 2-2h-4v-5l5-1v-2h6v-5l3-2-1-3h1l-3-3-4 1v-7l-10-5 2-10 4-2-1-3-5-1-1-5h-5l-5-6-5-1-3-4 3-3-7-8-4-1-8-4-5-5-7-1z",
				onClick: n[316] ||= (t) => e.onClick(t),
				onDblclick: n[317] ||= (t) => e.onDblClick(),
				onMouseenter: n[318] ||= (t) => e.onEnter(t),
				onMouseleave: n[319] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-67",
				style: k({ display: e.config.displayPath["FR-67"] }),
				d: "m872 200-7 2-3 5v6l-3 2h-2l-5-3-4 3h-4l-4-4-7-1-3-2-2-5-3 3-2 9-5 1v5l5 2 4 2-2 4 3 2 6-4 10 5-4 8v3l3 3-2 7-7 8-4-1 3 3-2 6 2 10 6 2v1h5l3 3 3 4h7l3 9 6 2v-1l9-18-1-11 5-14 1-12 9-7v-4l4-5h2l4-3-1-6 3-9 5-1-5-4-9-1-8-4-5 3-3-3z",
				onClick: n[320] ||= (t) => e.onClick(t),
				onDblclick: n[321] ||= (t) => e.onDblClick(),
				onMouseenter: n[322] ||= (t) => e.onEnter(t),
				onMouseleave: n[323] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-54",
				style: k({ display: e.config.displayPath["FR-54"] }),
				d: "m726 156-4 4h-7l-2 2v5l2 3-1 2-1 3 1 1 2-1 1-3 4-1 6-1 3 2 1 3 1 3v3l2 2v2l-2 2v5l2 2v7l2 2 3 2-1 2 4 4-3 4v2l4 2v2h-4l-2 2v2l3 3-3 7-2 6 1 4v6l1 3h2l2 2h-4l-2 2v2l3 3v5l4-1h5v6h2l-2 2v2l3 1 3 3 12-1 2-4h6l2-2 3 2 3-1h5l4-1 4-3 2 2v-5l3-1 1 5h5l4 1h2l6-2 3-3 3-3 5-2 4-1-2-2h5l-5-2-6-4-5-4h-6l-7-4h-5v-2l-8-4-10-4h-4l-2-5-7-9h-7l-3-4h-6l1-6-8-4 1-5h4v-4l1-3-3-3 3-5-2-5-2-2-5-10 2-3v-5h-5l-7-7z",
				onClick: n[324] ||= (t) => e.onClick(t),
				onDblclick: n[325] ||= (t) => e.onDblClick(),
				onMouseenter: n[326] ||= (t) => e.onEnter(t),
				onMouseleave: n[327] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-77",
				style: k({ display: e.config.displayPath["FR-77"] }),
				d: "m552 208-2 1-4 3-3-1-6 2-5-3-2 3h-4l-2-1-4-2-4 3v-1l-2 10 3 13v8l-3 8v4l-3 3 2 10-1 2-2 9 3 3-8 6v7l2 3 4 2 1 7-6 4 3 3 4-3h14l1-3h4v3l9-5 4-4 4-5-3-3 3-6 6-3 14 1 3-3h1v-6l2-7 3-3v-4l5-3v-2h-6l-1-3 2-3-1-5-3-2 1-5 3-2-1-2 1-1-6-2-2-4-3-1-10-9-1-8z",
				onClick: n[328] ||= (t) => e.onClick(t),
				onDblclick: n[329] ||= (t) => e.onDblClick(),
				onMouseenter: n[330] ||= (t) => e.onEnter(t),
				onMouseleave: n[331] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-68",
				style: k({ display: e.config.displayPath["FR-68"] }),
				d: "M844 282h-5l-4 8-4 8 1 6-4 8-6 5v14l-4 4v1l1 2 6 1 6 5 2 2-1 4-2 4 1 4 5-1 1 4 2 8 4-1-1 4 3 2h13l7-5 1-8 3-5-5-5-2-6 3-4v-9l2-4v-8l3-4-4-5v-11l-5-2-4-9h-7l-3-4z",
				onClick: n[332] ||= (t) => e.onClick(t),
				onDblclick: n[333] ||= (t) => e.onDblClick(),
				onMouseenter: n[334] ||= (t) => e.onEnter(t),
				onMouseleave: n[335] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-55",
				style: k({ display: e.config.displayPath["FR-55"] }),
				d: "m705 152-3 5-3 2-3-3h-5l-1-1-4 7-1 2 4 6-1 7-4 3v2l2 4-2 2-5 2 1 4 2 1-3 3 2 5 3 8-4 4 6-1-3 9-4 2-2 6 2 1-2 5v3l7 5 1 13 7 1 5 5 8 4 4 1 7 8-1 1 7-1v-3l7-1v-3h2v2l5-1 3-3h-1v-5l-4-3v-2l3-2h4l-2-2h-1l-2-3v-6l-1-4 2-6 3-7-3-3v-2l2-2h4v-2l-4-2v-2l3-4-4-4 1-2-3-2-2-2v-7l-2-2v-5l2-2v-2l-2-1v-4l-1-3-1-3-3-2-6 2h-4l-2 3-1 2-1-2 1-2 1-3-2-3v-4h-2l-1-7-3-3h-2z",
				onClick: n[336] ||= (t) => e.onClick(t),
				onDblclick: n[337] ||= (t) => e.onDblClick(),
				onMouseenter: n[338] ||= (t) => e.onEnter(t),
				onMouseleave: n[339] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-57",
				style: k({ display: e.config.displayPath["FR-57"] }),
				d: "M765 160h-5l-4 4-1 1h-6l-2-2h-1v6l-2 2 5 10 2 2 2 5-3 5 3 3-1 3v4h-4v5l7 4v6h5l3 4h7l7 9 2 5h5l9 4 8 4v2h5l7 4h6l6 4 5 4 5 2 6-7 2-7-2-3-1-3 5-8-10-5-6 4-4-2 2-4-4-2-5-2v-5l5-1 2-9 3-3 2 5 4 2 7 1 3 4h4l4-3 5 3h2l3-2v-6l3-5-3-3-7-5-3-4-8 1-5 5h-13l-3-2c-.9-2-2.3-3.7-4-5h-1c-2 0-5-2-5-2l-5 2v4l-6 1-4-7-2-1v-5l-5-2-1-9-3-3-8-4h-3l-1 1h-4l-5-4z",
				onClick: n[340] ||= (t) => e.onClick(t),
				onDblclick: n[341] ||= (t) => e.onDblClick(),
				onMouseenter: n[342] ||= (t) => e.onEnter(t),
				onMouseleave: n[343] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-88",
				style: k({ display: e.config.displayPath["FR-88"] }),
				d: "m832 262-4 1-5 2-3 4-3 2-6 2h-2l-4-1h-5l-1-5-3 1v5l-2-2-4 3-4 1h-5l-3 1-3-2-2 2h-6l-2 4-12 1-2-3-4-1v-2l2-2h-2v-6h-6l-2 1-3 3-5 2v-3h-2v3l-7 1v3l-7 1-2 3 3 3 5 1 5 6h5l1 5 5 1 1 3-4 2-2 10 10 5v7l4-1 3 3 3-2-1-2 1-1 3 3 4-3 1-3 6-1 2 1v4l5 4 2-1 4-2h7l6 6h2l2-2 1-2 3-1 3 2 3 3 12 6 4-4v-14l6-5 4-8-1-6 4-8 4-9-7-2-1-10 2-6z",
				onClick: n[344] ||= (t) => e.onClick(t),
				onDblclick: n[345] ||= (t) => e.onDblClick(),
				onMouseenter: n[346] ||= (t) => e.onEnter(t),
				onMouseleave: n[347] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-91",
				style: k({ display: e.config.displayPath["FR-91"] }),
				d: "m491 244-3 2-4 1-1 4-5 3-1 4 3 4-4 5h-5l2 3-2 3-1 5 2 1v4l1 2 1 9 11-1 5-4 4 3 9 1 2 2v-7l8-6-3-3 2-9 1-2-2-10 3-3v-4l-4-2h-7l-3-2-3 1-6-3z",
				onClick: n[348] ||= (t) => e.onClick(t),
				onDblclick: n[349] ||= (t) => e.onDblClick(),
				onMouseenter: n[350] ||= (t) => e.onEnter(t),
				onMouseleave: n[351] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-78",
				style: k({ display: e.config.displayPath["FR-78"] }),
				d: "m449 211-10 3-2 2 2 3v2l3 1-2 2v2l1-1 3 4 1 4 3 3-1 4v4l2 3-2 4 2 6 6 4v4h5l1 8 3 4 6 1 1-5 2-3-2-3h5l4-5-3-4 1-4 5-3 1-4 4-1 3-2v1-1l-3-3-2-6 3-7-1-5-7-4h-8l-9-6-6 2z",
				onClick: n[352] ||= (t) => e.onClick(t),
				onDblclick: n[353] ||= (t) => e.onDblClick(),
				onMouseenter: n[354] ||= (t) => e.onEnter(t),
				onMouseleave: n[355] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-95",
				style: k({ display: e.config.displayPath["FR-95"] }),
				d: "m456 195-3 4-2 8-2 4 9 4 6-2 9 6h8l7 4 1 5h1l6-3 10-1 5-2 4-3 1-7-2-2-8-5-8-4-4 2-4 1-3-2-6-4-4 4-7 1-10-1-2-4z",
				onClick: n[356] ||= (t) => e.onClick(t),
				onDblclick: n[357] ||= (t) => e.onDblClick(),
				onMouseenter: n[358] ||= (t) => e.onEnter(t),
				onMouseleave: n[359] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-93",
				style: k({ display: e.config.displayPath["FR-93"] }),
				d: "m515 219-4 3-5 2-10 1 1 1h1v3h-1v2h5l1 2 1 4 1-1 2-1h2l3 2 2 2 1 1h2v-5l-3-13z",
				onClick: n[360] ||= (t) => e.onClick(t),
				onDblclick: n[361] ||= (t) => e.onDblClick(),
				onMouseenter: n[362] ||= (t) => e.onEnter(t),
				onMouseleave: n[363] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-75",
				style: k({ display: e.config.displayPath["FR-75"] }),
				d: "M502 231h-5l-2 1-1 1h-1l-2 2v2l3 1 4 2h3l2-1 4 1v-3h-2v1h-2l1-1-1-4z",
				onClick: n[364] ||= (t) => e.onClick(t),
				onDblclick: n[365] ||= (t) => e.onDblClick(),
				onMouseenter: n[366] ||= (t) => e.onEnter(t),
				onMouseleave: n[367] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-92",
				style: k({ display: e.config.displayPath["FR-92"] }),
				d: "m496 225-6 3h-1l-3 7 2 6 3 4 5 4 2-1-1-2 1-3-1-1 1-2-4-2-3-1v-2l2-2h1l1-1 2-1v-2h1v-3h-1z",
				onClick: n[368] ||= (t) => e.onClick(t),
				onDblclick: n[369] ||= (t) => e.onDblClick(),
				onMouseenter: n[370] ||= (t) => e.onEnter(t),
				onMouseleave: n[371] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-94",
				style: k({ display: e.config.displayPath["FR-94"] }),
				d: "m507 235-2 1-1 1-1 1h2v-1h2v3l-4-1-2 1h-3l-1 2 1 1-1 3 1 2 1-1 4 2h7l4 2 3-8v-3h-2l-1-1-2-2-3-2z",
				onClick: n[372] ||= (t) => e.onClick(t),
				onDblclick: n[373] ||= (t) => e.onDblClick(),
				onMouseenter: n[374] ||= (t) => e.onEnter(t),
				onMouseleave: n[375] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-25",
				style: k({ display: e.config.displayPath["FR-25"] }),
				d: "m811 361-1 1h-4l-2 3-3 1v4l-7 1-3-3-5 1-5 4-3 5-3 1-2 4-4 1-6 5h-7l-3 1h-2l-7 6h-3v6l5 3 2 3v4l-3 6-1 3 10 4 6-1 1 6v7l8 2 4 1 5 5-1 4-2 4-7 2 2 4 1 2-3 3v3h5l22-21-1-17 8-4 6-3 5-4v-8l5-2 12-13-2-5 4-1 4-6-2-3-9 2v-1l8-10z",
				onClick: n[376] ||= (t) => e.onClick(t),
				onDblclick: n[377] ||= (t) => e.onDblClick(),
				onMouseenter: n[378] ||= (t) => e.onEnter(t),
				onMouseleave: n[379] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-90",
				style: k({ display: e.config.displayPath["FR-90"] }),
				d: "m818 336-3 2-3 2v5l1 5v9l-2 2 22 11 1-2 5-1-2-8-1-4-5 1-1-4 2-4v-4l-1-2-6-5-6-1z",
				onClick: n[380] ||= (t) => e.onClick(t),
				onDblclick: n[381] ||= (t) => e.onDblClick(),
				onMouseenter: n[382] ||= (t) => e.onEnter(t),
				onMouseleave: n[383] ||= (t) => e.onLeave(t)
			}, null, 36)
		], 8, lw)], 8, cw));
	}
}, dw = ["viewBox"], fw = ["stroke"], pw = {
	__name: "FranceReg",
	props: {
		config: {
			type: Object,
			required: !0
		},
		onClick: {
			type: Function,
			required: !0
		},
		onDblClick: {
			type: Function,
			required: !0
		},
		onEnter: {
			type: Function,
			required: !0
		},
		onLeave: {
			type: Function,
			required: !0
		}
	},
	setup(e) {
		return (t, n) => (P(), F("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: e.config.viewBox
		}, [I("g", {
			fill: "#5C68E5",
			stroke: e.config.colorStroke,
			"stroke-width": ".2%"
		}, [
			I("path", {
				class: "FR-20R",
				style: k({ display: e.config.displayPath["FR-20R"] }),
				d: "m1010 932-9 12 1 11v5l1 5-2 13-2 4h-5v4l3-2h4v4l-7 4v3l1 2-5 5 4 1-2 7h-5l-1-3h-6l2-3-3-2-4-1-12-4-6-4-4-3c0-1 3-5 3-7v-1c1 0 3 1 3 1l5-5-11-1-8-2 2-7 5-3-3-2 3-6-2-1-5 2-1-1h-6l-1-6 2-3 3-4 2-1 2-2-2-4-3-1-8-2v-8l-2-2v-2l5-1 4-1-1-3-6-4-3-3v-3h3l1-3 4-3-1-3v-6l3-1 1-6 2 2 3 1 2-4 7-6 9-2 2-6 4-4h4l1 1h5l3 3 3-1 2-4v-5l-4-4v-3l2-2-1-3 3-3-3-3v-4l5-4 3 2 2 2 2 8 2 10-2 6 1 13 5 4 2 4 1 22 4 7z",
				onClick: n[0] ||= (t) => e.onClick(t),
				onDblclick: n[1] ||= (t) => e.onDblClick(),
				onMouseenter: n[2] ||= (t) => e.onEnter(t),
				onMouseleave: n[3] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-PAC",
				style: k({ display: e.config.displayPath["FR-PAC"] }),
				d: "m903 734-8 3 1 5-6 5 4 8-6 4-1 4h-6l-7 6-9 1v11h-4l-2 3-7-2-1 9-6 7-10 1-1 6-3 4-6 3h8v9l-6 3-5-2-2 4h-8l-3 2v5l-3 2-2-3h-2l-5-2-5 3 1 5 2 2h-9l4-2v-3l-11-1-6 4-4 3-4-1-2-8-6-2-1-2-1-1-9-3h-17l2-2 1-4h-8l6-5-1-4-6 3-20-1-3-7-7-3-5 4 7 6-12 2-16-3 4-6h5l-3-3-15-1h-11l3-8 12-7-3-4 3-8 11 2 3-20 10-5 4-3v-4l-11-11v-8l-6-10-1-1 2-4 10-1 2 2-1 7 1 2 5-5 5-1 1-2-6-1-1-7 4-6h5l5 5-5 6 1 3 8 1 4-4-2 5 1 4 7 1 10 1 1 4 6 5h5l3-3 2-5 3 2 2 3 1-14h-3l-2-5-13-3-1-6 4-3-3-3v-3h6l5 3 4-5-4-3v-5l3-6 7-1 6-3 1-2-3-2v-4h10l2-3-1-3 4-4 4 2 4-4 9 1 2-3h7v-8l-3-1-1-5h-8l-1-2 2-8 2-2 7-1 2 2 1 6 6-1 1-6 3-1h7l3 5 1 4 6 2 1 11 10 4h5l4 1 1 10 5 3v3h-4l-3 4h-1l1 5-7 7-1 4 2 4 3 1 3 3-5 1v7l8 5v6h5l9 3 10 7h5l17-6h5l2 5 2 3 1 5z",
				onClick: n[4] ||= (t) => e.onClick(t),
				onDblclick: n[5] ||= (t) => e.onDblClick(),
				onMouseenter: n[6] ||= (t) => e.onEnter(t),
				onMouseleave: n[7] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-OCC",
				style: k({ display: e.config.displayPath["FR-OCC"] }),
				d: "M690 743v4l-15 8-2 20-11-2-3 8 3 4-12 7-3 8h-13v-7l-6-1h-5l-12 8-19 16-3 4h-11l-1 4-13 3v2l-1 4-3 4-6 4-6-6-3 5 4 6 4-1v22l1 32 5 2 3 4v6l-6-1-5-5h-7l-6 2-3 5-11 2-1 5-2 2-2-2h-3l-3 3-10-8-12-4-7 1-6 8h-5l-6-5v-6l-10-3-6-5-1-4-1-7-15-2-6 2-6-9h-15l-7-7h-5l-11-3-1-1-8-4-5-1-1 18-14-1-7-1-4-1-2 4-7-1-5-6-12 5h-5l-5-5-1-4-7-6-6-3h-1v-7l3-2 2-12 5 1 2-2-2-5 10-8 5-13 4-5-5-6-2-4 3-4-6-10-9-1-3-5 2-7 4-4-1-7 3-2-5-8 4-4 4-1 4 2 5-5 1 6 2 2 4-1v-4l2-6 5 4 5-6 3 4 6-1 7-1 2-5 11-1 6 5 1-2h1l3-1-1-5 5-1 7-2-2-4 3-3 1-6-4-5 3-8 6 3 7-1v-1l-3-7-3-11h7l2-5 3-3v-6h8l6-8-3-1v-3l6-1v-4l3-1 4-6-4-4v-4l3-2h1l7-4 9 4 8 10h4l6-6 2 3 4-4 6 2 2 13 6 5-5 10 5 2-2 6 3 1h1l3-5h5l1 1h11l2-4 3-1 1-8h2v-9l11-9 1 2v6l8-1 1 11h4l1 10 3.1 3.7L552 665l5-16 7 4 3-6 10-4 6 17 10-3v-5h4l1 6 7-2 9 12 3 13 6 7-1 7 2 1 6 4v10l4-2 8 6 4 1 1-7 5-1 2 6 5-1 1-5 13 7 6 10v8z",
				onClick: n[8] ||= (t) => e.onClick(t),
				onDblclick: n[9] ||= (t) => e.onDblClick(),
				onMouseenter: n[10] ||= (t) => e.onEnter(t),
				onMouseleave: n[11] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-ARA",
				style: k({ display: e.config.displayPath["FR-ARA"] }),
				d: "m852 596 1 2-1 7-9 3-2 2-5 3v4h-4l-4-2-11 4h-7l-3 1-1 6-6 1-1-6-2-2-7 1-2 2-2 8 1 2h8l1 5 3 1v8h-7l-2 3-9-1-4 4-4-2-4 4 1 3-2 3h-10v4l3 2v1l-1 1-6 3-7 1-3 6v5l4 3-4 5-5-3h-6l-1 3 4 3-4 3 1 6 13 3 2 5h3l-1 14-2-3-3-3-2 6-3 3h-5l-5-5-2-4-10-1-8-1v-4l2-5-4 4-8-1-1-3 5-6-5-5h-5l-4 6 1 7 6 1-1 2-5 1-5 5-1-2 1-7-2-2h-5l-5 1-2 4-12-6-1 5h-5l-2-5-5 1-1 7-4-1-8-6-4 2v-10l-8-5 1-8-6-6-3-13-1-2-8-10-7 2-1-6h-4l-1 5-9 3-6-17h-1l-9 3-3 7-7-4-5 16-5 11-3-3-1-11h-4l-1-10-7 1-1-7-1-1-11 9v9h-2l-1 8-3 1-2 4h-11l-1-1h-5l-3 5-4-1 2-6-5-2 5-10-7-5-1-12 4-3-1-4-2-2 3-4h2l2-6 2-3-1-6 4-6 7-5v-10l3 2 4 4h4l2-2-2-5 1-4 1-2-1-6-2-3v-5l3-5-1-5-8-9-1-3 7-4 4-2 1-5 4-3-1-7-3-4v-7.3l-1-.7v-3l-4-9-4-2-3-5-2 4-3-4v-4l-4-6 2-4 4-5 9-2 5 1 5-4v-2l-2-2v-6l10-9 3 4 3-4h3l5-6h9v5l6 3 5 4 3-2 4-2 1 3h5l2-3 3 2 1 5 3-1 7-9 3 2 8 14v5l1 2h7l2 3h5l3 4v14l-8 6 1 1 1 5 5 1 1 3h3l4-3 12 2 2 2 3-3h4l1-7 1-4 1-1h4l4 3 4-3 2 3 3-4h4l2 6 1 7h3l1-2 1-3 7-26 2-5h4l4 3 3-1 4-2h3l2 5 7 3 7 10 5 2v5l5-1 7-7 6 2v5h10l15-17 6 4 1 2-5 7 2 1v4h-7l-4 3v7h12l4-5 8-4-4-4-1-3 4-8h4l2 3 8-6 8-2h13v5l6 7v5l-4 4 1 3 6 3v9l3-1 8 8 1 8-2 3-12 5v12l5 7s5-1 7-1c2 2 1 13 1 13l9 6 2 5 5 2z",
				onClick: n[12] ||= (t) => e.onClick(t),
				onDblclick: n[13] ||= (t) => e.onDblClick(),
				onMouseenter: n[14] ||= (t) => e.onEnter(t),
				onMouseleave: n[15] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-NAQ",
				style: k({ display: e.config.displayPath["FR-NAQ"] }),
				d: "m519 538-4 3-1 5-4 2-7 4 1 3 7 8 1 1 1 5-3 5v5l2 3 1 6-2 6 2 5-2 2h-4l-4-4-3-1v9l-7 5-4 6 1 6-2 3-2 6h-2l-3 4 2 2 1 4-4 3-1-1-5-2-4 4-2-3-6 6h-4l-7-10-10-4-7 4h-1l-3 2v4l4 4-4 6-3 1v4l-6 1v4h3l-6 8h-7l-1 6-3.8 3.8.8.2-2 4h-7l3 11 3 8-7 1-6-3-3 8 4 5-1 6-3 3 2 4-7 2-5 1 1 5-3 1-2 2-6-5-11 1-2 5-7 1-6 1-3-4-5 6-5-4-2 6v4l-4 1-2-2-1-6-5 5-4-2-4 1-4 4 5 7-3 3 1 7-4 4-2 7 2 5h1l9 1 6 10-3 4 2 4 5 6-4 5-6 13-9 8 2 5-2 2-5-1-2 12-3 2v7l-7 4-3 2-2-2-3 1-4 2-4-5-9-7-1-7h-14l-8-5-9-2-3-4h-6l-3-3 1-5-3 3-1 6-6-2-3-4v-3l5-2v-7l2-2-1-5-4-1-7-3-1 4-5-1-1-5h-6l-4-4v-4h4l7-3 8-10 1-3 6-9 2-9 11-44 6-34v-8l4-6 1-5 3-2 2 3 9-1-2-3-1-2-7-6-5 6-3 8v-6l4-24 4-30 2-30 6-9v-1l4 1-1 7 19 17 7 28 1-2v-11l-3-10v-2l-3-13-11-11-4-1-1-4-5-3-7-6-5 1v-8l-2-8-1-7-8-6 1-13 5 6 6 1 1 9 1 1 2 3-4 4 1 3h5l-1-2v-5h4l2-8-3-4 1-3 4 1 1-4-4-1-2-5-4-1-2-4-8 1-3-3-6-4h-5l-3-5 6-3 4 3 1 4 7 1 3 3 5-1 1-3 6-5-3-3 11-6 5-1 2 6 7-3 5 4h1l4-2 5-1 1-2 5-3-3-4-3 3v-3l2-5-2-4 2-3-1-10-4-6 3-3-6-7 2-4-9-8v-4l-3-5 7-3 11 2 5-3v-5l10-1 9-1 10-1 1 3 3 2v-1l2-3 7-8v1h3l2 5 6 2v4l9 2v12h11l9-3-1-3 3-2 3 4 2 1 3 8 6 7 1 5 6 6v7l-1 5 7 5 3 4h6l2 8 4 2-1 5-2 1 10 1 3-3 6 5v-1l7-7 3 2h4l2 1h6l2-6 18 2 7 2 12-1 4 6v4l3 4 2-4 3 5 4 2 4 9 1 11 3 4z",
				onClick: n[16] ||= (t) => e.onClick(t),
				onDblclick: n[17] ||= (t) => e.onDblClick(),
				onMouseenter: n[18] ||= (t) => e.onEnter(t),
				onMouseleave: n[19] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-BRE",
				style: k({ display: e.config.displayPath["FR-BRE"] }),
				d: "M259 289v6l1 3v11l2 2v10l-6-1-2 2-5 11-2 7-1 3-8-2-3-5h-5l-1 4-8 1-3 3-2 4-22 2-7 3-2 1-1 11-10 3-7 4h-6l-2-2-3 3h-2v-4l2-2-5-1-20 2-3-5-4-2 3-3 10 4 2-3-4-4-5-2 1 3-5 1-4-6 3 5-3 4-4-4-1-3-2 5-4-1v6l2 3-2 3-5-4 1-4 1-5-2-4-7-7-5-2 1-4-2 4-6-2-4-6 .2-.8-.2-.2h-4l-7-1-2-3v2l-10-1-5-7-2-7v7h-3l-6-3h-3l-4-1 4 4-2 4h-8l-8-2 3-5-2-9-8-9-4 1-4-3H4l-3-2 2-3 12-1 8-1h9l2-4-2-5-3-1-8-4-4 6-2 1 1-9-7-3 5-5 9 3 7 2 8 1v-3h-7l1-5-7 3-1-3 8-8-9 7-14 1-1-1-2 2-6-1 2-7-2-4 6-4-5-4 6-6h9l1-4 3-2 2 2h6v-3l8-1 1 4 5-1 1-4 8-1 4 2 5-4v8h5v3h3v-7l10-1 6 4 5-7-2-4 7-5 6 4 2-2 8-1 3-3 2 5 1-4h8l-1 4 4 1v6l5 1v6l7 5-1 6 8 4v7h3v-4l13-7 2-5 7 2 4-4v7l2-2 4 1v5l5-1v-4l7 1 2.2-2.2-.2-.8 4-3h9l-5 6 7 4h18l1 4 2 7 6 6h3l3-4h3l4-5 4 3h4l3 1-1 11 2 1v7z",
				onClick: n[20] ||= (t) => e.onClick(t),
				onDblclick: n[21] ||= (t) => e.onDblClick(),
				onMouseenter: n[22] ||= (t) => e.onEnter(t),
				onMouseleave: n[23] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-PDL",
				style: k({ display: e.config.displayPath["FR-PDL"] }),
				d: "m390 319 4 3-1 8-1 5h-4v7l-5 6-5 2-3 3 2 5-11 3-2 3-4-3 2 8h-4l-7-5-3 4-1 3 2 2v2l-4 5v8l-5 6-4 15h-3l-7 8-2 4-3-2-1-3-10 1-9 1-10 1v5l-5 3-11-2-7 3 3 5v4l9 8-2 4 6 7-3 3 4 6 1 10-2 3 2 4-2 5v3l3-3 3 4-5 3-1 2-5 1-4 2-6-4-7 3-2-6-5 1-11 6-2-2v6l-8-4-4-6h-8l-3-7h-8l-8-7-7-4-7-20h-3v-4l-11-10 1-9 10-14h1l-10-9-7 1-1-5h4l4-4-1-3-1-4 7-3h-6l-5 5h-7l-4-5v3l-7-2-4-2 4-5-2-3-1-1 6-7-1-1h1l3-3 3 2h5l7-3 10-4 1-10 9-5 23-2 1-3 3-4 8-1 1-4 5 1 3 4 7 2h1l.9-1.9-.9-.1 1-1 2-7 5-11 2-2 6 1v-10l-2-2v-11l-1-3v-6l3-4v-7l-2-1 1-10 6 1 3-3 6 2 2 5 4 3 6-4 3 2 10-5 10 1 5-2 2-4h3l4 3 1 8 5 2 2 6h6l10-9h9l3 4 2 13 6 2 4 6h7v2l1-3h1l5 7 5 1 5 3-4 6z",
				onClick: n[24] ||= (t) => e.onClick(t),
				onDblclick: n[25] ||= (t) => e.onDblClick(),
				onMouseenter: n[26] ||= (t) => e.onEnter(t),
				onMouseleave: n[27] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-CVL",
				style: k({ display: e.config.displayPath["FR-CVL"] }),
				d: "m554 329-9 8 3 4v5l-5 4h-8l1 4 5 6 1 6 1 4-7 2v4l5 5v7l-4 4 2 5 6 5v5l4 7-1 9 4 4-1 9v5l2 3-3 9v-2h-9l-5 6h-3l-3 4-3-4-10 9v6l2 2v2l-5 4-5-1-9 2-4 5-2 4-8 1h-4l-7-1-18-3-2 6h-6l-2-1h-4l-3-2-7 8-6-5-3 3-10-1h2l1-6-4-2-2-8h-6l-3-4-7-5 1-5v-7h-1l-5-6-1-5-6-7-3-8-2-1-3-4-3 1 1 4-10 3h-10v-12l-9-2v-4l-6-2-2-6 4-14 6-7-1-8 4-5v-2l-2-2 4-7 7 5h4l-2-8 4 3 2-3 11-3-1-2-1-3 3-3 5-2 5-6v-7h4l1-5 1-8-4-3 3-5 4-6-5-3h-1v-9l-2-3-1-3 5-3 6-1 3-5v-13l-8-7v-6l-1-1 5-4h5l13-7 4 1h9l2-2v-5l8-4v-6l2-2 3 4 1 4 3 3-1 4v4l2 3-2 4 2 6 6 4v4l5 1 1 7 3 4 7 2 1 4 1 2 1 9h1l10-1 5-4 4 3 9 1 4 5 4 2 1 7-6 4 3 2 4-2h14l1-3h4v3l9-5 7 6 2 6 4 5z",
				onClick: n[28] ||= (t) => e.onClick(t),
				onDblclick: n[29] ||= (t) => e.onDblClick(),
				onMouseenter: n[30] ||= (t) => e.onEnter(t),
				onMouseleave: n[31] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-NOR",
				style: k({ display: e.config.displayPath["FR-NOR"] }),
				d: "m462 192-2 1-3-2-1 4-3 4-2 8-2 4-10 3-2 2 2 3v2l3 1-2 2v1l-1 2v6l-8 4v5l-2 3h-9l-4-2-13 7h-5l-5 4-5-3 6 4v6l8 7 1 13-4 5-5 1-6 3 1 3 2 3v9l-3-1-6-8h-1l-1 4v-2h-7l-4-6-6-2-2-13-3-4h-9l-10 9h-6l-2-6-5-2-1-8-4-3h-3l-2 4-5 2-10-1-10 5-3-2-6 4-4-3-2-4v-1l-5-2-4 3-6-1v-1l-3-1h-4l-4-3-4 5h-3l-3 4-3-1-6-5-2-7-1-4h7l3-2v-4l-8-2-5-13 4-9v-10l-4-9v-13l-2-2-2-9-8-9-2-6v-7h-1l-2-2 3-4v-7l-7-7 1-3 14 4 9 6 8-6 16 1 3 9h-4l-3 8 10 11v8h4l10-3 7 4 30 4 12 7 16-6 13-8 9-2h1l-.4-.1-9.6-1.9-7-6 1-10 9-13 15-8 18-6 27-7 16-12 2-3 3 1h4l2 4 16 15 1 7 4 6-4 4-1 4h2l-1 4-1 7 2 4v6h3l-1 2-3 5-1 3 4 3 1 8z",
				onClick: n[32] ||= (t) => e.onClick(t),
				onDblclick: n[33] ||= (t) => e.onDblClick(),
				onMouseenter: n[34] ||= (t) => e.onEnter(t),
				onMouseleave: n[35] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-HDF",
				style: k({ display: e.config.displayPath["FR-HDF"] }),
				d: "m626 136 2 3-1 4-6 3v5l-6 1-1 3 4 3-1 5-1 4v12l-2 1-7-4-4 2 1 3h-8l-7 6v9l5 3 2 4h-9v4l3 2-2 2-3 2 1 2h4l2 3-3 2-3 7-5 3-2 4-1 1-6-2-2-4-3-1-10-9-1-8-3-3h-1l-2 1-4 3-3-1-6 2-5-3-2 3-4 1-2-2-4-2-4 3-2-3-8-5-8-4-4 2-4 1-9-6-4 4-7 1-10-1-2-4-2-3 1-4 3 2 2-1-1-3-1-8-4-3 1-3 3-5 1-2h-3v-6l-2-4 1-7 1-4h-2l1-4 4-4-4-6-1-7-16-15-2-4h-4l-3-1 12-14 10 6v-4l-8-7 1-12V25l16-13 19.7-2.9.3-.1-1-1h2l18-2 11-6 5 9 1 6-2 4v6l2 4h5l4 4 1 4 2 3h5l4-5 9-3h5l1 4h2v2l3 2 1 14 1 5h5l3 3 7-3 2 3 5-1 6 7-1 13h3l2-4 20-1 12 9 1 3-5 4v5l-2 1 7 2 1 7-7 4v4h8l-1 6 3 7-3 2z",
				onClick: n[36] ||= (t) => e.onClick(t),
				onDblclick: n[37] ||= (t) => e.onDblClick(),
				onMouseenter: n[38] ||= (t) => e.onEnter(t),
				onMouseleave: n[39] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-IDF",
				style: k({ display: e.config.displayPath["FR-IDF"] }),
				d: "M583 258v2l-5 3v4l-3 3-2 7v6h-1l-3 3-14-1-6 3-3 6 3 3-4 5-4 4-9 5v-3h-4l-1 3h-14l-4 3-3-3 6-4-1-7-4-2-2-3-2-2-9-1-4-3-5 4-11 1-1-9-1-2v-4l-2-1-6-1-3-4-1-8h-5v-4l-6-4-2-6 2-4-2-3v-4l1-4-3-3-1-4-3-4-1 1v-2l2-2-3-1v-2l-2-3 2-2 10-3 2-4 2-8 3-4 2 3 2 4 10 1 7-1 4-4 9 6 4-1 4-2 8 4 8 5 2 2v1l4-3 6 3h4l2-3 5 3 6-2 3 1 4-3 2-1 4 3 1 8 10 9 3 1 2 4 6 2-1 1 1 2-3 2-1 5 3 2 1 5-2 3 1 3z",
				onClick: n[40] ||= (t) => e.onClick(t),
				onDblclick: n[41] ||= (t) => e.onDblClick(),
				onMouseenter: n[42] ||= (t) => e.onEnter(t),
				onMouseleave: n[43] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-GES",
				style: k({ display: e.config.displayPath["FR-GES"] }),
				d: "m901 210-3 9 1 6-4 3h-2l-4 5v4l-9 7-1 12-5 14 1 11-9 18v12l4 5-3 4v8l-2 4v9l-3 4 2 6 5 5-3 5-1 8-7 5h-13l-3-2 1-4-4 1-3-12-5 1-1-4 2-4-1-6-6-5-6-1-1-2-12-7-3-3-3-2-3 1-1 2-2 2h-2l-6-6h-7l-6 3-5-4v-4l-2-1-6 1-1 3-4 3-3-3-1 1 1 2-3 2h-1l1 3-3 2v5h-6v2l-5 1v5h4l-2 2-1 8h-3l-6 1-6-1-5 1v4l-1 4-8 2-1-2-6-7-3 1h-4l-2-3-6 1v-7l-3-2 4-5-8-11-6-7-5-2-1-1h-11v5l-5 2h-12l-2 4h-2l-2-4-8 4-14-1-2-4-4-5-1-7-5-7-4 3-7-5 2-10-10-10h-4l-2-2v-5l2-8 3-3v-4l5-3v-2h-5l-2-3 2-3-1-5-3-2 1-5 3-2-1-2 2-2 2-4 5-3 3-7 3-2-2-3h-4l-1-2 3-2 2-2-3-2v-4h9l-2-4-5-3v-9l7-5h8l-1-4 4-2 7 4 2-1v-12l1-5 1-4-4-3 1-3 6-1v-5l6-3 1-4-1-3v-5l3-3-3-6 1-7h7l5 4 4-2 8-2 4-3v-8l4-3 3-5v-1h6l1 2v6l-4 4 3 2-2 3-1 4 6 4v3l-2 2 1 8 12 1 3 3 2 4 10 1 3 3 1 7h3v1h2l3 3 1 7h2v-1l2-2h7l4-4h8l7 7h6l2 2h6l5-5h6l5 4h4l1-1h3l8 4 3 3 1 9 5 2v5l2 1 4 7 6-1v-4l5-2s3 2 5 2h1a13 13 0 0 1 4 5l3 2h13l5-5 8-1 3 4 7 5 3 3 7-2h4l3 3 5-3 8 4 9 1 5 4z",
				onClick: n[44] ||= (t) => e.onClick(t),
				onDblclick: n[45] ||= (t) => e.onDblClick(),
				onMouseenter: n[46] ||= (t) => e.onEnter(t),
				onMouseleave: n[47] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "FR-BFC",
				style: k({ display: e.config.displayPath["FR-BFC"] }),
				d: "m834 380 2 3-4 6-4 1 2 5-12 13-5 2v8l-5 4-14 7 1 17-22 21-1 2 4 2-6 6v8l-15 17h-10v-5l-6-2-7 7-5 1v-5l-5-2-7-10-5-2-2-1-2-5h-3l-4 2-3 1-4-3h-4l-2 5-7 26-2 5h-3l-1-7-2-6h-4l-3 4-2-3-4 3-4-3h-4l-1 1-2 11h-4l-3 3-2-2-12-2-4 3h-3l-1-3-5-1-1-6h-1l8-6v-14l-3-4h-5l-2-3h-7l-1-2v-5l-7-13-1-1-3-2-7 9-3 1-1-5-3-2-2 3h-5l-1-3-4 2-3 2-5-4-6-3v-3l3-9-2-3v-5l1-9-4-4 1-9-4-7v-5l-6-5-2-5 4-4v-7l-5-5v-4l5-1 2-1-1-4-1-6-5-6-1-4h7l6-4v-5l-3-4 9-8v-6l-4-5-2-6-7-6 4-4 4-5-3-3 3-6 6-3 14 1 3-3h1l2 2h5l9 10-1 10 6 5 4-3 6 7v7l4 5 2 4 14 1 8-4 2 4 2 1 2-4 1 2-1-3h12l5-2v-5h11l6 3 6 7 8 11-4 5 3 2v7l6-1 2 3h4l3-2 6 8 1 2 8-2 1-4v-4l5-1 6 1 6-1h3l1-8 2-2h-4v-5l5-1v-2h6v-5l3-2-1-3 4-2-1-2 1-1 3 3 3-3 2-3 6-1 2 1v4l5 4 6-3h7l6 6h2l2-2 1-2 3-1 3 2 3 3 12 7 1 2 6 1 6 5 1 2v4l-2 4 1 4 5-1 3 12-5 1-1 2-.6-.3-7.4 9.3v1z",
				onClick: n[48] ||= (t) => e.onClick(t),
				onDblclick: n[49] ||= (t) => e.onDblClick(),
				onMouseenter: n[50] ||= (t) => e.onEnter(t),
				onMouseleave: n[51] ||= (t) => e.onLeave(t)
			}, null, 36)
		], 8, fw)], 8, dw));
	}
}, mw = ["viewBox"], hw = ["stroke"], gw = {
	__name: "FranceAca",
	props: {
		config: {
			type: Object,
			required: !0
		},
		onClick: {
			type: Function,
			required: !0
		},
		onDblClick: {
			type: Function,
			required: !0
		},
		onEnter: {
			type: Function,
			required: !0
		},
		onLeave: {
			type: Function,
			required: !0
		}
	},
	setup(e) {
		return (t, n) => (P(), F("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: e.config.viewBox
		}, [I("g", {
			fill: "#5C68E5",
			stroke: e.config.colorStroke,
			"stroke-width": ".2%"
		}, [
			I("path", {
				class: "CORSE",
				style: k({ display: e.config.displayPath.CORSE }),
				d: "m1010 932-9 12 1 11v5l1 5-2 13-2 4h-5v4l3-2h4v4l-7 4v3l1 2-5 5 4 1-2 7h-5l-1-3h-6l2-3-3-2-4-1-12-4-6-4-4-3c0-1 3-5 3-7v-1c1 0 3 1 3 1l5-5-11-1-8-2 2-7 5-3-3-2 3-6-2-1-5 2-1-1h-6l-1-6 2-3 3-4 2-1 2-2-2-4-3-1-8-2v-8l-2-2v-2l5-1 4-1-1-3-6-4-3-3v-3h3l1-3 4-3-1-3v-6l3-1 1-6 2 2 3 1 2-4 7-6 9-2 2-6 4-4h4l1 1h5l3 3 3-1 2-4v-5l-4-4v-3l2-2-1-3 3-3-3-3v-4l5-4 3 2 2 2 2 8 2 10-2 6 1 13 5 4 2 4 1 22 4 7z",
				onClick: n[0] ||= (t) => e.onClick(t),
				onDblclick: n[1] ||= (t) => e.onDblClick(),
				onMouseenter: n[2] ||= (t) => e.onEnter(t),
				onMouseleave: n[3] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "NICE",
				style: k({ display: e.config.displayPath.NICE }),
				d: "m903 734-8 3 1 5-6 5 4 8-6 4-1 4h-6l-7 6-9 1v11h-4l-2 3-7-2-1 9-6 7-10 1-1 6-3 4-6 3h8v9l-6 3-5-2-2 4h-8l-3 2v5l-3 2-2-3h-2l-5-2-5 3 1 5 2 2h-9l4-2v-3l-11-1-6 4-4 3-4-1-2-8-6-2-1-2v-7l3-3 3-2v-2l-3-2h-3l-1-2 3-3v-1l-4-1v-3h7l2-1-6-6v-7l-4-3 4-6 8-6-7-4 1-2 9-3 12 8 7-5 1-4 9-3 6 4 9-6h10l2-2h6l-2-4 2-2v-2h5l1-2 5-3 4 3 2-2-6-5-6-6-3-1v-5l-4-6 2-8 1-5 4-3v-4l5-3h1l8 5v6h5l9 3 10 7h5l17-6h5l2 5 2 3 1 5z",
				onClick: n[4] ||= (t) => e.onClick(t),
				onDblclick: n[5] ||= (t) => e.onDblClick(),
				onMouseenter: n[6] ||= (t) => e.onEnter(t),
				onMouseleave: n[7] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "AIX-MARSEILLE",
				style: k({ display: e.config.displayPath["AIX-MARSEILLE"] }),
				d: "M853 659v3h-4l-3 4h-1l1 5-7 7-1 4 2 4 3 1 3 3-5 1v7h-1l-5 3v4l-4 3-1 5-2 8 4 6v5l3 1 6 6 6 5-2 2-4-3-5 3-1 2h-5v2l-2 2 2 4h-6l-2 2h-10l-9 6-5-4-10 3-1 4-7 5-12-8-9 3-1 2 6 4-8 5-3 7 4 3v7l6 6-2 1h-7v3l3 1v1l-3 3 2 2h3l3 2v2l-3 2-3 3v7l-1-1-9-3h-17l2-2 1-4h-8l6-5-1-4-6 3-20-1-3-7-7-3-5 4 7 6-12 2-16-3 4-6h5l-3-3-15-1h-11l3-8 12-7-3-4 3-8 11 2 3-20 10-5 4-3v-4l-11-11v-8l-6-10-1-1 2-4 10-1 2 2-1 7 1 2 5-5 5-1 1-2-6-1-1-7 4-6h5l5 5-5 6 1 3 8 1 4-4-2 5 1 4 7 1 10 1 1 4 6 5h5l3-3 2-5 3 2 2 3v-3l1-11h-3l-2-5-13-3-1-6 4-3-3-3v-3h6l5 3 4-5-4-3v-5l3-6 7-1 6-3 1-2-3-2v-4h10l2-3-1-3 4-4 4 2 4-4 9 1 2-3h7v-8l-3-1-1-5h-8l-1-2 2-8 2-2 7-1 2 2 1 6 6-1 1-6 3-1h7l3 5 1 4 6 2 1 11 10 4h5l4 1 1 10z",
				onClick: n[8] ||= (t) => e.onClick(t),
				onDblclick: n[9] ||= (t) => e.onDblClick(),
				onMouseenter: n[10] ||= (t) => e.onEnter(t),
				onMouseleave: n[11] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "MONTPELLIER",
				style: k({ display: e.config.displayPath.MONTPELLIER }),
				d: "M690 743v4l-15 8-2 20-11-2-3 8 3 4-12 7-3 8h-13v-7l-6-1h-5l-12 8-19 16-3 4h-11l-1 4-13 3v2l-1 4-3 4-6 4-6-6-3 5 4 6 4-1v22l1 32 5 2 3 4v6l-6-1-5-5h-7l-6 2-3 5-11 2-1 5-2 2-2-2h-3l-3 3-10-8-12-4-7 1-6 8h-5l-6-5v-6l-10-3-6-5-1-4 12-2 4-4 6-2 1-3h13l1-1-8-9-7 3-12-9 3-4h9l-1-9v-6l-2-13-17-8 1-3-5-5 5-2 1-6 6-2-2-4 5-4 3 4 7-2 4-1v3h7l6 2 1-7h3l11 2h11l8-2 2-7-6-5 2-5 3-5 5 4 13-5 2-4h10l-1-10v-4h3l6 3h5l-1-6 3-3 7-1v-5l6-3-1-7h-6l-5-1-1-4 4-1v-5l4-4-3-1-9 1 1-4-6-2-2-13v-8l-5-4v-7l-7-9 5-12 5-16 7 4 3-6 10-4 6 17 10-3v-5h4l1 6 7-2 9 12 3 13 6 7-1 7 2 1 6 4v10l4-2 8 6 4 1 1-7 5-1 2 6 5-1 1-5 13 7 6 10v8z",
				onClick: n[12] ||= (t) => e.onClick(t),
				onDblclick: n[13] ||= (t) => e.onDblClick(),
				onMouseenter: n[14] ||= (t) => e.onEnter(t),
				onMouseleave: n[15] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "CLERMONT-FERRAND",
				style: k({ display: e.config.displayPath["CLERMONT-FERRAND"] }),
				d: "m658 614-2 8-5 2-2 4 1 5 1 2h-5l-1 7h-5l-3 9h-9l-9 7-6 8-8-10-7 2-1-6h-4l-1 5-9 3-6-17h-1l-9 3-3 7-7-4-5 16-5 11-3-3-1-11h-4l-1-10-7 1-1-7-1-1-11 9v9h-2l-1 8-3 1-2 4h-11l-1-1h-5l-3 5-4-1 2-6-5-2 5-10-7-5-1-12 4-3-1-4-2-2 3-4h2l2-6 2-3-1-6 4-6 7-5v-10l3 2 4 4h4l2-2-2-5 1-4 1-2-1-6-2-3v-5l3-5-1-5-8-9-1-3 7-4 4-2 1-5 4-3-1-7-3-4v-7.3l-1-.7v-3l-4-9-4-2-3-5-2 4-3-4v-4l-4-6 2-4 4-5 9-2 5 1 5-4v-2l-2-2v-6l10-9 3 4 3-4h3l5-6h9v5l6 3 5 4 3-2 4-2 1 3h5l2-3 3 2 1 5 3-1 7-9 3 2 8 14v5l1 2h7l2 3h5l3 4v14l-8 6-6 1-1 4 2 5 1 21h-9v3l6 5-3 3-2 8 5 6 4 9 9 6 3 12-6 7 1 4 2 1 8 2 8-6h4l11 5-1 6h6z",
				onClick: n[16] ||= (t) => e.onClick(t),
				onDblclick: n[17] ||= (t) => e.onDblClick(),
				onMouseenter: n[18] ||= (t) => e.onEnter(t),
				onMouseleave: n[19] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "BORDEAUX",
				style: k({ display: e.config.displayPath.BORDEAUX }),
				d: "m434 648-4 6-3 1v4l-6 1v4h3l-6 8h-7l-1 6-3.8 3.8.8.2-2 4h-7l3 11 3 8-7 1-6-3-3 8 4 5-1 6-3 3 2 4-7 2-5 1 1 5-3 1-2 2-6-5-11 1-2 5-7 1-6 1-3-4-5 6-5-4-2 6v4l-4 1-2-2-1-6-5 5-4-2-4 1-4 4 5 7-3 3 1 7-4 4-2 7 2 5h1l9 1 6 10-3 4 2 4 5 6-4 5-6 13-9 8 2 5-2 2-5-1-2 12-3 2v7l-7 4-3 2-2-2-3 1-4 2-4-5-9-7-1-7h-14l-8-5-9-2-3-4h-6l-3-3 1-5-3 3-1 6-6-2-3-4v-3l5-2v-7l2-2-1-5-4-1-7-3-1 4-5-1-1-5h-6l-4-4v-4h4l7-3 8-10 1-3 6-9 2-9 11-44 6-34v-8l4-6 1-5 3-2 2 3 9-1-2-3-1-2-7-6-5 6-3 8v-6l4-24 4-30 2-30 6-9v-1l4 1-1 7 19 17 7 28 1-2v-11l-3-10v-3h10l2-1v5l10 1 1 12h5l9 8 4 1 5-2 4 2 1-4 1.5 1.5-.5-1.5 1-2 4-7 7 1 10-10v-12l17-12v-9h6l3-6h10l2 4-1 4 3 4 2-1 3-3 11 1 2 7 8 1 2 3-5 2 2 2 8 1 2 6 4 3-7 6v5l3 2-3 3 4 4-3 3 3 2h8v8l3 5-3 2v4z",
				onClick: n[20] ||= (t) => e.onClick(t),
				onDblclick: n[21] ||= (t) => e.onDblClick(),
				onMouseenter: n[22] ||= (t) => e.onEnter(t),
				onMouseleave: n[23] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "TOULOUSE",
				style: k({ display: e.config.displayPath.TOULOUSE }),
				d: "m583 746-6 3v5l-7 1-3 3 1 6h-5l-6-3h-3v3l1 11h-10l-2 4-13 5-5-4-3 5-2 5 6 5-2 7-8 2h-11l-11-2h-3l-1 7-6-2h-7v-3l-2 1h-2l-7 2-3-4-5 4 2 4-6 3-1 5-5 2 1 1 3 4v3l17 8 2 13v6l1 9h-9l-3 4 12 9 7-3 8 9-14 1-1 3-6 2-4 4-12 2-1-7-15-2-6 2-6-9h-15l-7-7h-5l-11-3-1-1-8-4-5-1-1 18-14-1-7-1-4-1-2 4-7-1-5-6-12 5h-5l-5-5-1-4-7-6-6-3h-1v-7l3-2 2-12 5 1 2-2-2-5 10-8 5-13 4-5-5-6-2-4 3-4-6-10-9-1-3-5 2-7 4-4-1-7 3-2-5-8 4-4 4-1 4 2 5-5 1 6 2 2 4-1v-4l2-6 5 4 5-6 3 4 6-1 7-1 2-5 11-1 6 5 1-2h1l3-1-1-5 5-1 7-2-2-4 3-3 1-6-4-5 3-8 6 3 7-1v-1l-3-7-3-11h7l2-5 3-3v-6h8l6-8-3-1v-3l6-1v-4l3-1 4-6-4-4v-4l3-2h1l7-4 9 4 8 10h4l6-6 2 3 4-4 6 2 2 13 6 5-5 10 5 2-2 6 3 1h1l3-5h5l1 1h11l2-4 3-1 1-8h2v-9l11-9 1 2v6l8-1 1 11h4l1 10 11 13-1 7 5 4v8l2 13 6 2-1 4 9-1 3 1-4 4v5l-4 1 1 4 5 1h6z",
				onClick: n[24] ||= (t) => e.onClick(t),
				onDblclick: n[25] ||= (t) => e.onDblClick(),
				onMouseenter: n[26] ||= (t) => e.onEnter(t),
				onMouseleave: n[27] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "GRENOBLE",
				style: k({ display: e.config.displayPath.GRENOBLE }),
				d: "m852 596 1 2-1 7-9 3-2 2-5 3v4h-4l-4-2-11 4h-7l-3 1-1 6-6 1-1-6-2-2-7 1-2 2-2 8 1 2h8l1 5 3 1v8h-7l-2 3-9-1-4 4-4-2-4 4 1 3-2 3h-10v4l3 2v1l-1 1-6 3-7 1-3 6v5l4 3-4 5-5-3h-6l-1 3 4 3-4 3 1 6 13 3 2 5h3l-1 14-2-3-3-3-2 6-3 3h-5l-5-5-2-4-10-1-8-1v-4l2-5-4 4-8-1-1-3 5-6-5-5h-5l-4 6 1 7 6 1-1 2-5 1-5 5-1-2 1-7-2-2h-5l-5 1-2 4-12-6-1 5h-5l-2-5-5 1-1 7-4-1-8-6-4 2v-10l-8-5 1-8-6-6-3-13-1-2 6-8 9-7h9l3-9h5v-7h6l-1-2-1-5 2-4 5-2 2-9h3l6-2 2-7 8-5h1v-11l8-4-1-3-5-5 8-2 10-3 8-10-5-4v-5h4l5 4 4-2 3-7 2-3 3 1 3 2 2 5 14 18 5-3v-7h5v-12l3-2v-11l1 .8V532l-2-4 1-10 4 2 1-3 4-1 4-3h8l4-5 8-4-4-4-1-3 4-8h4l2 3 8-6 8-2h13v5l6 7v5l-4 4 1 3 6 3v9l3-1 8 8 1 8-2 3-12 5v12l5 7s5-1 7-1c2 2 1 13 1 13l9 6 2 5 5 2z",
				onClick: n[28] ||= (t) => e.onClick(t),
				onDblclick: n[29] ||= (t) => e.onDblClick(),
				onMouseenter: n[30] ||= (t) => e.onEnter(t),
				onMouseleave: n[31] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "LIMOGES",
				style: k({ display: e.config.displayPath.LIMOGES }),
				d: "m519 538-4 3-1 5-4 2-7 4 1 3 7 8 1 1 1 5-3 5v5l2 3 1 6-2 6 2 5-2 2h-4l-4-4-3-1v9l-7 5-4 6 1 6-2 3-2 6h-2l-3 4 2 2 1 4-4 3-1-1-5-2-4 4-2-3-6 6h-4l-7-10-10-4-7 4h-1l-3-5v-8h-8l-3-2 3-3-4-4 3-3-3-2v-5l7-6-4-3-2-4v-2l-8-1-2-2 5-2-2-3-8-1-2-7-11-1-3 3-2 1-3-4 1-4-2-4h-8l1-6h3l2-5 3-1 5-3-1-9 3-1 7-1-1-4-1-5h-5l-3-3 2-4 1-9-3-3 3-2 5-6h7v-4l5-4 6-1h1l10 1 3-3 6 5v-1l7-7 3 2h4l2 1h6l2-6 18 2 7 2 12-1 4 6v4l3 4 2-4 3 5 4 2 4 9 1 11 3 4z",
				onClick: n[32] ||= (t) => e.onClick(t),
				onDblclick: n[33] ||= (t) => e.onDblClick(),
				onMouseenter: n[34] ||= (t) => e.onEnter(t),
				onMouseleave: n[35] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "POITIERS",
				style: k({ display: e.config.displayPath.POITIERS }),
				d: "m417 489-1 5-9 2-5 3v5h-7l-5 6-3 2 3 3-1 7v2l-2 4 3 3h5l1 5 1 4-7 1-3 1 1 9-5 3-3 1-2 5h-3l-1 6h-2l-3 6h-6v9l-17 12v12l-10 10-7-1-2 2-2 5-3 6-4-2-5 2h-4l-8-9h-6l-1-12-9-1-1-5-2 2h-10l-3-13-11-11-4-1-1-4-5-3-7-6-5 1v-8l-2-8-1-7-8-6 1-13 5 6 6 1 1 9 1 1 2 3-4 4 1 3h5l-1-2v-5h4l2-8-3-4 1-3 4 1 1-4-4-1-2-5-4-1-2-4-8 1-3-3-6-4h-5l-3-5 6-3 4 3 1 4 7 1 3 3 5-1 1-3 6-5-3-3 11-6 5-1 2 6 7-3 5 4h1l4-2 5-1 1-2 5-3-3-4-3 3v-3l2-5-2-4 2-3-1-10-4-6 3-3-6-7 2-4-9-8v-4l-3-5 7-3 11 2 5-3v-5l10-1 9-1 10-1 1 3 3 2v-1l2-3 7-8v1h3l2 5 6 2v4l9 2v12h11l9-3-1-3 3-2 3 4 2 1 3 8 6 7 1 5 6 6v7l-1 5 7 5 3 4h6l2 8z",
				onClick: n[36] ||= (t) => e.onClick(t),
				onDblclick: n[37] ||= (t) => e.onDblClick(),
				onMouseenter: n[38] ||= (t) => e.onEnter(t),
				onMouseleave: n[39] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "RENNES",
				style: k({ display: e.config.displayPath.RENNES }),
				d: "M259 289v6l1 3v11l2 2v10l-6-1-2 2-5 11-2 7-1 3-8-2-3-5h-5l-1 4-8 1-3 3-2 4-22 2-9 4-1 11-10 3-7 4h-6l-2-2-3 3h-2v-4l2-2-5-1-20 2-3-5-4-2 3-3 10 4 2-3-4-4-5-2 1 3-5 1-1-1-3 4-4-4-1-3-2 5-4-1v6l2 3-2 3-5-4 1-4 1-5-2-4-7-7-5-2 1-4-2 4-6-2-4-6 .2-.8-.2-.2h-4l-7-1-2-3v2l-10-1-5-7-2-7v7h-3l-6-3h-3l-4-1 4 4-2 4h-8l-8-2 3-5-2-9-8-9-4 1-4-3H4l-3-2 2-3 12-1 8-1h9l2-4-2-5-3-1-8-4-4 6-2 1 1-9-7-3 5-5 9 3 7 2 8 1v-3h-7l1-5-7 3-1-3 8-8-9 7-14 1-1-1-2 2-6-1 2-7-2-4 6-4-5-4 6-6h9l1-4 3-2 2 2h6v-3l8-1 1 4 5-1 1-4 8-1 4 2 5-4v8h5v3h3v-7l10-1 6 4 5-7-2-4 7-5 6 4 2-2 8-1 3-3 2 5 1-4h8l-1 4 4 1v6l5 1v6l7 5-1 6 8 4v7h3v-4l13-7 2-5 7 2 4-4v7l2-2 4 1v5l5-1v-4l7 1 2.2-2.2-.2-.8 4-3h9l-5 6 7 4h18l1 4 2 7 6 5 3 1 3-4h3l4-5 4 3h4l3 1-1 11 2 1v7z",
				onClick: n[40] ||= (t) => e.onClick(t),
				onDblclick: n[41] ||= (t) => e.onDblClick(),
				onMouseenter: n[42] ||= (t) => e.onEnter(t),
				onMouseleave: n[43] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "NANTES",
				style: k({ display: e.config.displayPath.NANTES }),
				d: "m390 319 4 3-1 8-1 5h-4v7l-5 6-5 2-3 3 2 5-11 3-2 3-4-3 2 8h-4l-7-5-3 4-1 3 2 2v2l-4 5v8l-5 6-4 15h-3l-7 8-2 4-3-2-1-3-10 1-9 1-10 1v5l-5 3-11-2-7 3 3 5v4l9 8-2 4 6 7-3 3 4 6 1 10-2 3 2 4-2 5v3l3-3 3 4-5 3-1 2-5 1-4 2-6-4-7 3-2-6-5 1-11 6-2-2v6l-8-4-4-6h-8l-3-7h-8l-8-7-7-4-7-20h-3v-4l-11-10 1-9 10-14h1l-10-9-7 1-1-5h4l4-4-1-3-1-4 7-3h-6l-5 5h-7l-4-5v3l-7-2-4-2 4-5-2-3-1-1 6-7-1-1h1l3-3 3 2h5l7-3 10-4 1-10 9-5 23-2 1-3 3-4 8-1 1-4 5 1 3 4 7 2h1l.9-1.9.9.2-.8-.3-.1.1-.9-.1 1-1 2-7 5-11 2-2 6 1v-10l-2-2v-11l-1-3v-6l3-4v-7l-2-1 1-10 6 1 3-3 6 2 2 5 4 3 6-4 3 2 10-5 10 1 5-2 2-4h3l4 3 1 8 5 2 2 6h6l10-9h9l3 4 2 13 6 2 4 6h7v2l1-3h1l5 7 5 1 5 3-4 6z",
				onClick: n[44] ||= (t) => e.onClick(t),
				onDblclick: n[45] ||= (t) => e.onDblClick(),
				onMouseenter: n[46] ||= (t) => e.onEnter(t),
				onMouseleave: n[47] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "ORLEANS-TOURS",
				style: k({ display: e.config.displayPath["ORLEANS-TOURS"] }),
				d: "m554 329-9 8 3 4v5l-5 4h-8l1 4 5 6 1 6 1 4-7 2v4l5 5v7l-4 4 2 5 6 5v5l4 7-1 9 4 4-1 9v5l2 3-3 9v-2h-9l-5 6h-3l-3 4-3-4-10 9v6l2 2v2l-5 4-5-1-9 2-4 5-2 4-8 1h-4l-7-1-18-3-2 6h-6l-2-1h-4l-3-2-7 8-6-5-3 3-10-1h2l1-6-4-2-2-8h-6l-3-4-7-5 1-5v-7h-1l-5-6-1-5-6-7-3-8-2-1-3-4-3 1 1 4-10 3h-10v-12l-9-2v-4l-6-2-2-6 4-14 6-7-1-8 4-5v-2l-2-2 4-7 7 5h4l-2-8 4 3 2-3 11-3-1-2-1-3 3-3 5-2 5-6v-7h4l1-5 1-8-4-3 3-5 4-6-5-3h-1v-9l-2-3-1-3 5-3 6-1 3-5v-13l-8-7v-6l-1-1 5-4h5l13-7 4 1h9l2-2v-5l8-4v-6l2-2 3 4 1 4 3 3-1 4v4l2 3-2 4 2 6 6 4v4l5 1 1 7 3 4 7 2 1 4 1 2 1 9h1l10-1 5-4 4 3 9 1 4 5 4 2 1 7-6 4 3 2 4-2h14l1-3h4v3l9-5 7 6 2 6 4 5z",
				onClick: n[48] ||= (t) => e.onClick(t),
				onDblclick: n[49] ||= (t) => e.onDblClick(),
				onMouseenter: n[50] ||= (t) => e.onEnter(t),
				onMouseleave: n[51] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "DIJON",
				style: k({ display: e.config.displayPath.DIJON }),
				d: "M725 393v2h-1l-1 6-1 4 1 3-5 5v3l-6 3-2 3 2 4-3 1v5h3l3 6h4l2 2h3l-1 3-8 1v3l3 2v4l-1 1 2 3 3 5-1 6-4 3 1 5 4 2 2 2-4 3-10 1-2-1-2-5h-3l-4 2-3 1-4-3h-4l-2 5-7 26-2 5h-3l-1-7-2-6h-4l-3 4-2-3-4 3-4-3h-4l-1 1-2 11h-4l-3 3-2-2-12-2-4 3h-3l-1-3-5-1-1-6h-1l8-6v-14l-3-4h-5l-2-3h-7l-1-2v-5l-7-13-1-1-3-2-7 9-3 1-1-5-3-2-2 3h-5l-1-3-4 2-3 2-5-4-6-3v-3l3-9-2-3v-5l1-9-4-4 1-9-4-7v-5l-6-5-2-5 4-4v-7l-5-5v-4l5-1 2-1-1-4-1-6-5-6-1-4h7l6-4v-5l-3-4 9-8v-6l-4-5-2-6-7-6 4-4 4-5-3-3 3-6 6-3 14 1 3-3h1l2 2h5l9 10-1 10 6 5 4-3 6 7v7l4 5 2 4 14 1 8-4 2 4h2l2-4h12l5-2v-5h11l6 3 6 7 8 11-4 5 3 2v7l6-1 2 3h4l3-2 6 8 1 2 8-2 1-4 4 1 3 6 1 3-5 5-2 1-2 2 4 2 1 5h3l1 8z",
				onClick: n[52] ||= (t) => e.onClick(t),
				onDblclick: n[53] ||= (t) => e.onDblClick(),
				onMouseenter: n[54] ||= (t) => e.onEnter(t),
				onMouseleave: n[55] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "NORMANDIE",
				style: k({ display: e.config.displayPath.NORMANDIE }),
				d: "m462 192-2 1-3-2-1 4-3 4-2 8-2 4-10 3-2 2 2 3v2l3 1-2 2v1l-1 2v6l-8 4v5l-2 3h-9l-4-2-13 7h-5l-5 4 1 1v6l8 7 1 13-4 5-5 1-6 3 1 3 2 3v9l-3-1-6-8h-1l-1 4v-2h-7l-4-6-6-2-2-13-3-4h-9l-10 9h-6l-2-6-5-2-1-8-4-3h-3l-2 4-5 2-10-1-10 5-3-2-6 4-4-3-2-4v-1l-5-2-4 3-6-1v-1l-3-1h-4l-4-3-4 5h-3l-3 4-3-1-6-5-2-7-1-4h7l3-2v-4l-8-2-5-13 4-9v-10l-4-9v-13l-2-2-2-9-8-9-2-6v-7h-1l-2-2 3-4v-7l-7-7 1-3 14 4 9 6 8-6 16 1 3 9h-4l-3 8 10 11v8h4l10-3 7 4 30 4 12 7 16-6 13-8 9-2h1l-10-2-7-6 1-10 9-13 15-8 18-6 27-7 16-12 2-3 3 1h4l2 4 16 15 1 7 4 6-4 4-1 4h2l-1 4-1 7 2 4v6h3l-1 2-3 5-1 3 4 3 1 8z",
				onClick: n[56] ||= (t) => e.onClick(t),
				onDblclick: n[57] ||= (t) => e.onDblClick(),
				onMouseenter: n[58] ||= (t) => e.onEnter(t),
				onMouseleave: n[59] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "LILLE",
				style: k({ display: e.config.displayPath.LILLE }),
				d: "M620 115h1l-2 1-7-2-2-4h-2l-4 3v-3h-9l-2-2-2-1-6 4-3-2h-2l-6 4-4-3-5 3h-1l-1-2h-4l-3 2-3-1-3-3h-9l-5 3v-3l-2-2-3 1-4 2 2-3v-3l-5-3v4h-3l-8-3-3-2-3 2-1 3h-2l-2-2v-5l6-3-2-4-5 2-2-2-9 1-4 2-5-2v-4l-7-3-2-4-2 1-7-5-3-1-3 3-4 1-2-4-5-1V25l16-13 19.7-2.9.3-.1-1-1h2l18-2 11-6 5 9 1 6-2 4v6l2 4h5l4 4 1 4 2 3h5l4-5 9-3h5l1 4h2v2l3 2 1 14 1 5h5l3 3 7-3 2 3 5-1 6 7-1 13h3l2-4 20-1 12 9 1 3-5 4v5l-2 1 7 2 1 7-7 4z",
				onClick: n[60] ||= (t) => e.onClick(t),
				onDblclick: n[61] ||= (t) => e.onDblClick(),
				onMouseenter: n[62] ||= (t) => e.onEnter(t),
				onMouseleave: n[63] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "AMIENS",
				style: k({ display: e.config.displayPath.AMIENS }),
				d: "m626 136 2 3-1 4-6 3v5l-6 1-1 3 4 3-1 5-1 4v12l-2 1-7-4-4 2 1 3h-8l-7 6v9l5 3 2 4h-9v4l3 2-2 2-3 2 1 2h4l2 3-3 2-3 7-5 3-2 4-1 1-6-2-2-4-3-1-10-9-1-8-3-3h-1l-2 1-4 3-3-1-6 2-5-3-2 3-4 1-2-2-4-2-4 3-2-3-8-5-8-4-4 2-4 1-9-6-4 4-7 1-10-1-2-4-2-3 1-4 3 2 2-1-1-3-1-8-4-3 1-3 3-5 1-2h-3v-6l-2-4 1-7 1-4h-2l1-4 4-4-4-6-1-7-16-15-2-4h-4l-3-1 12-14 10 6v-4l-8-7 1-12 5 1 2 4 4-1 3-3 3 1 7 5 2-1 2 4 7 3v4l5 2 4-2 9-1 2 2 5-2 2 3-6 4v5l2 2h2l1-3 3-2 3 2 8 3h3v-4l5 3v3l-2 3 4-2 3-1 1 2v3l6-3h8l4 3 3 1 3-2h4l1 2h1l5-3 4 3 6-4h2l3 3 6-5 2 1 2 2h8l1 4 4-4h2l2 4 7 2 2-1h7l-1 6 3 7-3 2z",
				onClick: n[64] ||= (t) => e.onClick(t),
				onDblclick: n[65] ||= (t) => e.onDblClick(),
				onMouseenter: n[66] ||= (t) => e.onEnter(t),
				onMouseleave: n[67] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "REIMS",
				style: k({ display: e.config.displayPath.REIMS }),
				d: "m748 326 1 3-3 2v5h-6v2l-5 1v5h4l-2 2-1 8h-3l-6 1-6-1-5 1v4l-1 4-8 2-1-2-6-7-3 1h-4l-2-3-6 1v-7l-3-2 4-5-8-11-6-7-5-2-1-1h-11v5l-5 2h-12l-2 4h-2l-2-4-8 4-14-1-2-4-4-5-1-7-5-7-4 3-7-5 2-10-10-10h-4l-2-2v-5l2-8 3-3v-4l5-3v-2h-5l-2-3 2-3-1-5-3-2 1-5 3-2-1-2 2-2 2-4 5-3 3-7 3-2-2-3h-4l-1-2 3-2 2-2-3-2v-4h9l-2-4-5-3v-9l7-5h8l-1-4 4-2 7 4 2-1v-12l1-5 1-4-4-3 1-3 6-1v-5l6-3 1-4-1-3v-5l3-3-3-6 1-7h7l5 4 4-2 8-2 4-3v-8l4-3 3-5v-1h6l1 2v6l-4 4 3 2-2 3-1 4 6 4v3l-2 2 1 8 12 1 3 3 2 4 10 1 3 3 1 7h3l-3 4-3 2-2-2h-6l-1-1-4 6-1 3 4 5-1 8-4 3v2l2 4-2 2-5 2v2l1 2 2 1-3 3 2 5 3 8-4 4 6-1-3 9-4 2-2 5 2 2-2 5v3l7 5v6l1 7 7 1 5 5 8 4 4 1 7 8-3 3 3 4 5 1 5 6h5l1 5 5 1 1 3-4 2-2 10 10 5v7l4-1 3 3z",
				onClick: n[68] ||= (t) => e.onClick(t),
				onDblclick: n[69] ||= (t) => e.onDblClick(),
				onMouseenter: n[70] ||= (t) => e.onEnter(t),
				onMouseleave: n[71] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "STRASBOURG",
				style: k({ display: e.config.displayPath.STRASBOURG }),
				d: "m901 210-3 9 1 6-4 3h-2l-4 5v4l-9 7-1 12-5 14 1 11-9 18v12l4 5-3 4v8l-2 4v9l-3 4 2 6 5 5-3 5-1 8-7 5h-13l-3-2 1-4-4 1-3-12-5 1-1-4 2-4 1-4-2-2-6-5-6-1-1-2v-1l4-4v-14l6-5 4-8-1-6 8-16v-1l-6-2-2-10 2-6-3-3 4 1 7-8 2-7-3-3v-3l4-8-10-5-6 4-3-2 2-4-4-2-5-2v-5l5-1 2-9 3-3 2 5 3 2 7 1 4 4h4l4-3 5 3h2l3-2v-6l3-5 7-2h4l3 3 5-3 8 4 9 1 5 4z",
				onClick: n[72] ||= (t) => e.onClick(t),
				onDblclick: n[73] ||= (t) => e.onDblClick(),
				onMouseenter: n[74] ||= (t) => e.onEnter(t),
				onMouseleave: n[75] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "NANCY-METZ",
				style: k({ display: e.config.displayPath["NANCY-METZ"] }),
				d: "m865 202-3 5v6l-3 2h-2l-5-3-4 3h-4l-3-4-7-1-4-2-2-5-3 3-2 9-5 1v5l5 2 4 2-2 4 4 2 6-4 10 5-5 8 1 3 2 3-2 7-6 7h-5l3 3-2 6 1 10 7 2-4 9-4 8 1 6-4 8-6 5v14l-4 4-12-6-3-3-3-2-3 1-1 2-2 2h-2l-6-6h-7l-6 3-5-4v-4l-2-1-6 1-1 3-4 3-3-3-1 1 1 2-3 2-3-3-4 1v-7l-10-5 2-10 4-2-1-3-5-1-1-5h-5l-5-6-5-1-3-3 2-3 1-1-7-8-4-1-8-4-5-5-7-1-1-13-7-5v-3l2-5-2-1 2-6 4-2 3-9-6 1 4-4-3-8-2-5 3-3-2-1-1-4 5-2 2-2-2-4v-2l4-3 1-7-4-6 1-2 4-7 1 1h5l3 3 3-2 3-5v1h2l3 3 1 7h2v-1l2-2h7l4-4h8l7 7h6l2 2h6l5-5h6l5 4h4l1-1h3l8 4 3 3 1 9 5 2v5l2 1 4 7 6-1v-4l5-2s3 2 5 2h1a13 13 0 0 1 4 5l3 2h13l5-5 8-1 3 4 7 5z",
				onClick: n[76] ||= (t) => e.onClick(t),
				onDblclick: n[77] ||= (t) => e.onDblClick(),
				onMouseenter: n[78] ||= (t) => e.onEnter(t),
				onMouseleave: n[79] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "VERSAILLES",
				style: k({ display: e.config.displayPath.VERSAILLES }),
				d: "m506 224-10 1 1 1h1v3h-1v2l-2 1-1 1h-1l-2 2v2l3 1 4 2-1 2 1 1-1 3 .9 1.7 2.1-.7 3 2h7l4 2v4l-3 3 2 10-1 2-2 9 3 3-8 6v7l-2-2-9-1-4-3-5 4-11 1-1-9-1-2v-4l-2-1-6-1-3-4-1-8h-5v-4l-6-4-2-6 2-4-2-3v-4l1-4-3-3-1-4-3-4-1 1v-2l2-2-3-1v-2l-2-3 2-2 10-3 2-4 2-8 3-4 2 3 2 4 10 1 7-1 4-4 9 6 4-1 4-2 8 4 8 5 2 2-1 7-4 3z",
				onClick: n[80] ||= (t) => e.onClick(t),
				onDblclick: n[81] ||= (t) => e.onDblClick(),
				onMouseenter: n[82] ||= (t) => e.onEnter(t),
				onMouseleave: n[83] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "CRETEIL",
				style: k({ display: e.config.displayPath.CRETEIL }),
				d: "M583 258v2l-5 3v4l-3 3-2 7v6h-1l-3 3-14-1-6 3-3 6 3 3-4 5-4 4-9 5v-3h-4l-1 3h-14l-4 3-3-3 6-4-1-7-4-2-2-3v-7l8-6-3-3 2-9 1-2-2-10 3-3v-4l-4-2h-7l-4-2-1 1-1-2 1-3-1-1 1-2h3l2-1 4 1v-3h-2v1h-2l1-1-1-4-1-2h-5v-2h1v-3h-1l-1-1 10-1 5-2 3.5-2.6 1.5-7.4v1l4-3 6 3h4l2-3 5 3 6-2 3 1 4-3 2-1 4 3 1 8 10 9 3 1 2 4 6 2-1 1 1 2-3 2-1 5 3 2 1 5-2 3 1 3z",
				onClick: n[84] ||= (t) => e.onClick(t),
				onDblclick: n[85] ||= (t) => e.onDblClick(),
				onMouseenter: n[86] ||= (t) => e.onEnter(t),
				onMouseleave: n[87] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "PARIS",
				style: k({ display: e.config.displayPath.PARIS }),
				d: "M502 231h-5l-2 1-1 1h-1l-2 2v2l3 1 4 2h3l2-1 4 1v-3h-2v1h-2l1-1-1-4z",
				onClick: n[88] ||= (t) => e.onClick(t),
				onDblclick: n[89] ||= (t) => e.onDblClick(),
				onMouseenter: n[90] ||= (t) => e.onEnter(t),
				onMouseleave: n[91] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "BESANCON",
				style: k({ display: e.config.displayPath.BESANCON }),
				d: "m834 380 2 3-4 6-4 1 2 5-12 13-5 2v8l-5 4-14 7 1 17-22 21-1 2 4 2-6 6v8l-15 17h-10v-5l-6-2-7 7-5 1v-5l-5-2-7-10-5-2 10-1 4-3-2-2-4-2-1-5 4-3 1-6-3-5-2-3 1-1v-4l-3-2v-3l8-1 1-3h-3l-2-2h-4l-3-6h-3v-5l3-1-2-4 2-3 6-3v-3l5-5-1-3 1-4 1-6h1v-2l-1-1-1-8h-3l-1-6-4-1 2-2 2-1 5-5-1-3-3-6-4-1v-4l5-1 6 1 6-1h3l1-8 2-2h-4v-5l5-1v-2h6v-5l3-2-1-3 4-2-1-2 1-1 3 3 3-3 2-3 6-1 2 1v4l5 4 6-3h7l6 6h2l2-2 1-2 3-1 3 2 3 3 12 7 1 2 6 1 6 5 1 2v4l-2 4 1 4 5-1 3 12-5 1-1 2-.6-.3-7.4 9.3v1z",
				onClick: n[92] ||= (t) => e.onClick(t),
				onDblclick: n[93] ||= (t) => e.onDblClick(),
				onMouseenter: n[94] ||= (t) => e.onEnter(t),
				onMouseleave: n[95] ||= (t) => e.onLeave(t)
			}, null, 36),
			I("path", {
				class: "LYON",
				style: k({ display: e.config.displayPath.LYON }),
				d: "m772 498 2 1v4h-7l-4 3v7h4l-4 3-3 1-2 3-4-2-1 10 2 4v4l-1-1v11l-3 2v12h-5v7l-5 3-14-18-2-5-3-2-3-1-2 3-3 7-4 2-5-4h-4v5l5 4-8 10-10 3-8 2 5 5 1 3-7 4h-1v11l-9 5-2 7-6 2h-3l-5-5h-6l1-6-12-5h-3l-8 6-10-3-1-4 6-7-3-12-9-6-4-9-5-6 2-8 3-3-6-5v-3h9l-1-21-2-5 1-4 6-1 1 1 1 5 5 1 1 3h3l4-3 12 2 2 2 3-3h4l1-7 1-4 1-1h4l4 3 4-3 2 3 3-4h4l2 6 1 7h3l1-2 1-3 7-26 2-5h4l4 3 3-1 4-2h3l2 5 7 3 7 10 5 2v5l5-1 7-7 6 2v5h10l15-17 6 4 1 2z",
				onClick: n[96] ||= (t) => e.onClick(t),
				onDblclick: n[97] ||= (t) => e.onDblClick(),
				onMouseenter: n[98] ||= (t) => e.onEnter(t),
				onMouseleave: n[99] ||= (t) => e.onLeave(t)
			}, null, 36)
		], 8, hw)], 8, mw));
	}
}, _w = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 57 50"
}, vw = ["stroke"], yw = {
	__name: "Guadeloupe",
	props: {
		config: {
			type: Object,
			required: !0
		},
		onClick: {
			type: Function,
			required: !0
		},
		onDblClick: {
			type: Function,
			required: !0
		},
		onEnter: {
			type: Function,
			required: !0
		},
		onLeave: {
			type: Function,
			required: !0
		}
	},
	setup(e) {
		return (t, n) => (P(), F("svg", _w, [I("g", {
			fill: "#5C68E5",
			stroke: e.config.colorStroke,
			"stroke-width": "0.2%"
		}, [I("path", {
			class: "FR-971 GUADELOUPE",
			d: "m22.8 0-.2.2-2 1.2-.7.5-.3.4-1 1.3-.7 1v.6l.4.7.4 2.5.5.1.6.3.4.3.3.3V11l-.2.3-1.3.3-.6.7-1.1 3.8-.3 1v1l.3.8.7.9.9.7 1.1.7 1.4.5 1.4.3 1.2-.2 2.3-1 12-2.8 1 .3.6.2 2 .5h.5l.7-.6-.3-.4-1.3-.4-3.7-2.6-.7-.3-.4-.3-1.5-1.3-.7-.4-.8-.1h-1.3l-.7-.4-.5.5-1-.5-.8-.6-.7-.8-.7-1-.5-1.1-.1-.7.1-1.9-.3-1.8-.8-1.5-1.2-1.2L23 .1zm-6 16.2-.5-.5-.8.2-.7.5-.3.8-.7-.8-.3-.2-.2.2H13l-.5-.2 1-.5-1.2-1.4L10 13l-2.5-1-1.7-.3-.6-.3-.5-.6-.6-.4-1.3.3-1 .9-1.1 2-.7.6.3.9-.3 2.2v1.2l.4.8.5.8.4.8-.4 1 1 2.6v5.6l1 2.5.5.4.3.7.2.8.5.8.8.7.7.5.6.5.5 1-.5.5.4 1 .1.4 3.5-1.5 3.1-1.9 2.2-2.6.5-3.7-.4-3.9L15 24l-.1-3.3.4-.7 1.2-.3.5-.1-.5-1.4.4-1.6zm-2.4-4.6.6-.2-.2-.2-.3-.1h-.3l-.3.5.2.3zm40.6.2-1.7-.5-1.7.7-2.7 2.3-.9.5 1.6.2 2-.9zm-8 11.8v.2l.2-.2zm-.7.7h.5l.2-.4h-1.4l.5.4zm-5.2 17-.3-1-.5-.6-.5-.4-.8-2-1.3-1.2-1.7-.3-1.5.8-1.2 1.4-.5.8-.2 1-.6 1-.3.4.2.3.3.2.2.4.2.6v.5l1 1.8 2 .4 2.3-.6 1.7-.9.8-.6.4-.5.2-.7zM15.7 45v-.2l-.5-.1-.4.2-.3.7-.4.2-.3.3.2.3.7-.2.8-.5.3-.4zm-1.6-.1h-.4l.2.2h.3zm-2.3.6-.7.4-.3 1 .8.4.6-.4.2-.6-.4-.5zm2.6 2.5v-.3l-.3-.2v.2zm-1.5-.3.2.1h.1v-.1z",
			onClick: n[0] ||= (t) => e.onClick(t),
			onDblclick: n[1] ||= (t) => e.onDblClick(),
			onMouseenter: n[2] ||= (t) => e.onEnter(t),
			onMouseleave: n[3] ||= (t) => e.onLeave(t)
		}, null, 32)], 8, vw)]));
	}
}, bw = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 43 50"
}, xw = ["stroke"], Sw = {
	__name: "Martinique",
	props: {
		config: {
			type: Object,
			required: !0
		},
		onClick: {
			type: Function,
			required: !0
		},
		onDblClick: {
			type: Function,
			required: !0
		},
		onEnter: {
			type: Function,
			required: !0
		},
		onLeave: {
			type: Function,
			required: !0
		}
	},
	setup(e) {
		return (t, n) => (P(), F("svg", bw, [I("g", {
			fill: "#5C68E5",
			stroke: e.config.colorStroke,
			"stroke-width": "0.2%"
		}, [I("path", {
			class: "FR-972 MARTINIQUE",
			d: "m35.1 48 1.4-.1 1.1-.5 1-1.4 1.2-3 1.2-.5v-.7l-.6-1.2-.3-1.7-.6-1.4-1.2-.6.3-.5.1-.3.3-.3.6-.3-.8-1.1-.3-1.2v-1.3l.4-1.3-1.3.7.1-.8-.1-1-.3-.7-.7-.3-1-.3-.3-.6-.2-.7-.2-.5-2-1.2-.8-.8-.6-1.5.6-.3.3-.2.4-.2h.7l-3.3-1.5-.8 1.2-.9-.3-.1-.9 1.2-.6-.8-.8 2.7-1.5-.5-.6-.6-.3-.7-.1-.9.4-.2-2.3.3-1.9.8-.6 1.1 2 2.1-2.2-.2-.6.3-.4.6-.4.6-.6h-2.3l-2.3.6-2 1-1.4 1.2-1.7-3.6-1.2-.3-.5-.7-.2-.9-.4-.8-1.6-1-3.8-1.8-4.4-2.8L9.1 0 5.7.1 1.8 2.3l-.9.8-.6 1.1L0 5.6l.3 1.5.7 1.2 2.8 3 .7 1 .6 1.2.2 1.3-.2.6-.3.7-.2.7.4.7.4.5.3.5.3.5v.7l.8 1.8 1.7 1.7 3.5 2.5.4.4.6 1.2.4.5.6.1 2.1-.1h2.1l1.1-.2 1.5-.5.2 1.7.7 1.4.8 1.1.3.6-.7 1.5-1.4.6-1.5-.5-1.1-1.6-.8.9-2.6 1.2-2.7 2.9.9.5.5.4.1.4-.1.7 2.2 3.1.8.5 1.5-.2 2.4-1 1.5-.3 5.8.8 2.7-.5.6.2-.1 1 1.6.1 1.6-1 1.3-.5 1 1.4-.1 1.5-1 .6-1.1.3-.6 1.1.4 1.5z",
			onClick: n[0] ||= (t) => e.onClick(t),
			onDblclick: n[1] ||= (t) => e.onDblClick(),
			onMouseenter: n[2] ||= (t) => e.onEnter(t),
			onMouseleave: n[3] ||= (t) => e.onLeave(t)
		}, null, 32)], 8, xw)]));
	}
}, Cw = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 40 50"
}, ww = ["stroke"], Tw = {
	__name: "Guyane",
	props: {
		config: {
			type: Object,
			required: !0
		},
		onClick: {
			type: Function,
			required: !0
		},
		onDblClick: {
			type: Function,
			required: !0
		},
		onEnter: {
			type: Function,
			required: !0
		},
		onLeave: {
			type: Function,
			required: !0
		}
	},
	setup(e) {
		return (t, n) => (P(), F("svg", Cw, [I("g", {
			fill: "#5C68E5",
			stroke: e.config.colorStroke,
			"stroke-width": "0.2%"
		}, [I("path", {
			class: "FR-973 GUYANE",
			d: "m7.8 0 .3.1.3.1h1l.2.1.3.2h.1l.2.1.1.1.2.1.2.1.2.1.2.2.3.1h.1l.1.1h.1l.5.3h.1l.2.1h.1l.1.1h.1l.1.1h.1v.1h.1l.1.1.2.1h.1l.4.2v.2l.1-.1v-.1h1l.2.1h.1l.4.1.1.1h.3l.2-.1-.1-.1h.1v-.1h.2v-.1l.3.1.2.1v.1l.3.1h.1l.2.1.2.1h.1l.1.1h.2v.1h.1v.1h.1v.1h.1l.1.1.1.1h.1l.1.1h.1l.3.2.3-.1h.1l.3.2h.2l.3.2.4.2.1.1h.1v.1l.2.1h.1l.1.1h.1l.1.2v-.1l.1-.1v.1h.1l.1.1v.1l.1.1.1.1h.1l-.1.1h-.1.1l.1.1v-.1l.1.1h.1l.2.2v-.1l.1.1.1.1.1.1v.2h.1l.1.1.1.1v.2h.1v.1l.2.2.1.1h.1l.1.1.1.1.1.1h.2l.1.2.2.3h.1l.1.1h-.1v.1l.1.1.1.1h.1l.2.1.2.3h.1v.1l.1.1.1.1.2.1h.2V9l.1.1.1.1.1.1h.1l.1.1.1.1h.1v.1h.1l.1.1.1.1.1.1h.1v.1h.1v.1h.1l.1.1v.1h.1v.1l.1.1.1.2.1.1.2.2h.3l.1-.1v-.1h-.1v-.1h.2v-.1.1-.1l.1.1.1-.1h.1l.1.1h.1v.1l.2.1.1.1.1.1h-.1v.2l.1.1h.1l.1.1.2.3h.2l.1.1.1.1.1.1v.2h.1v-.1l.1.1h.1v.1h.1l.1.1v.2h.1l.1.1v-.1l-.1-.1.1.1h.1v.2h.1v-.1l.1.1v.1h.1v.1h.1l-.1-.1.2.2h.1l.1.1h.1l.1.1h.1l.1.1h.1v.1h.1v.1h-.1.1l.1.1.1.1v-.1.2h.1v.2h.1-.1l.2.1.2.2h.4l.4-.2v-.1h.3l.1.1h.1v.1h.1l.1.1h.1l.1.1.1.1.1.1h.1l-.1.1h.2v.1l.1.2h.1l-.1-.1h.1v.3-.1.1h.1v.3l.1.1v.4l.1.1v.6l.1.2h.1v.1h.1v.2h-.1v.2h.1v.1l.1.1h.1l.1.2h.3v-.1h.1v.2h-.1l-.1.1v.1l-.1.1-.1.1.1.2v.2l.1.2.1.1v.1l.1.1.1.2h.1v.2l.1.1h.1v.1l.1.1.6-.1-.1.6v.3l-.1.2-.2.3v.2l-.1.5-.2.4-.1.1-.1.1-.3.1-.2.1-.2.1-.3.2-.2.4-.1.1-.1.1v.6l-.2.2-.2.3-.1.2-.2.1-.5.5-.2.1-.2.2-.2.1v.1l.1.3v.2l-.2.1h-.3l-.1.1-.1.1-.2.5v.4l-.1.3-.3.3-.2.1-.3.8v.1h-.1l-.1.1v.1l-.2.4v.1l-.2.2-.2.3-.5.9-.1.2-.3.3v.2l-.1.2-.1.1-.4.5h-.1l-.1-.1-.1.1-.3.2-.2.4v.3h-.2l-.1.1h-.1l-.1.3-.1.1.1.1h-.2v.1l.1.1v.3l.2.1v.2l-.1.2-.2.3v.1l-.1.1v.2l-.2.2-.1.5-.2.1v.4h.1l.1.1h-.1l-.1.2h-.3l-.1.1-.3.5-.4.9v.2l-.1.1.1.1-.2.2-.1.2-.1.2-.1.3-.2.4h-.2l-.1.1v.1l.1.1v.3h.1l.1.1v.3l-.1.1v.1h-.1l-.1.1v.2l.1.1-.1.1-.3.3-.1.2-.1.1-.1.1H25l-.2.1h.1v.2h-.2v.1h-.1l-.1.1v.1l-.1.2v.2l-.1.1-.1.2H24l-.2.1-.1.1h-.1v.1l-.1.1h-.1l-.4.2h-.1v.1h-.1l-.1.1-.1.1h-.1l-.2.1h-.2l-.1.1v.1h-.2l.1.1-.1.1-.2.1v.2l-.1.1-.1.2-.1.2-.1.2h-.3l-.1-.1v.2l-.1.1h-.2l-.4.1-.2-.1h-.1l-.1-.1h-.3l-.1-.1-.1-.1-.2-.3h-.3l-.1-.1-.2.1-.1-.1-.1.1h-.7l-.1-.1-.1-.1-.2-.4-.1-.1-.1-.1h-.2l-.3-.1-.2-.1-.2.1-.4.1-.3.1h-.6l-.2-.1-.3-.5-.2-.1-.1-.1-.2.1h-.2l-.3.2-.3.1h-.3l-.1.1-.3.1h-.5l-.5.1-.2-.1h-.1l-.3-.1-.3-.3-.1-.1-.1-.3v-.1l-.2-.1h-.1l-.1.1-.2.2-.1.2v.1l-.2.1h-.6l-.4.4h-.1l-.1-.2h-.2v.1l-.1.1v.4l-.2.2-.2.1h-.1l-.3.1-.1.2-.2.1h-.1l-.2-.1h-.2L6 47l-.1.1-.1.3v.2l-.1.2-.1.1h-.1l-.1-.1H5l-.1-.2-.1-.3h-.4l-.9.3h-.2l-.3-.1h-.3l-.1-.1-.1-.2-.1-.1-.1-.2-.1-.1h-.5l-.2-.1h-.4l-.2-.1-.3-.4H.5l-.1-.1H.1L0 46v-.1l.1-.1h.2v-.1l-.1-.1.5-.1h.1l.1-.1.1-.1h.2l.2-.2V45l-.1-.2-.1-.3.1-.5v-.2l.2.1.1-.1.3-.3.1-.1v-.1l.1-.1h.1l.1-.2.1-.1.2-.5-.1-.2h.1l.1-.1V42l.1-.3.1-.1.1-.1-.1-.1v-.1l.2-.3.2-.2h.1l.1-.2.1-.4v-.1h.1V40h.2l.1-.2v-.1h.1l.1-.1h-.1l.1-.1.1-.1v-.2h.1v-.6h.2l.1-.1v-.3h-.2V38l.1-.3v-.2l.1-.1.1-.1v-.4H5l-.1-.1h-.1l-.1-.1-.1-.2h.1l.1-.1v-.3l-.1-.2-.1-.2v-.1l.2-.2-.1-.2.1-.1-.1-.2v-.1l-.1-.1h-.1l-.1.1h-.1v-.1l.1-.1v-.1h-.1v-.1h.1l.1-.3.1-.2-.1-.1.1-.1h.2l.1-.1v-.1l.1-.1.1-.1v-.2l.2-.2.2-.2.2-.2H6l.1-.2.1-.1.1-.5.1-.3v-.1l.2-.2.1-.1.1-.2.1-.1-.1-.3.2-.4v-.9l.1-.3v-.1l.1-.1.1-.1v-.1l-.1-.2-.1-.2-.1-.2h-.1l-.2.2h-.2l-.1-.1v-.2l-.2-.1-.2-.3V27l-.1-.3-.2-.4-.3-.5h-.7l-.2-.1v-.2l.1-.2v-.1l-.1-.1-.4-.1-.2-.2-.1-.2-.1-.1v-.1l-.2-.1-.1-.2-.1-.1-.1-.3-.1-.3-.2-.4-.1-.1-.2-.1h-.1l-.1-.1-.1-.1v-.2l.2-.2.1-.2v-.3l.2-.3.1-.1-.1-.1-.1-.1-.2-.1-.2-.1-.3-.1v-.3l.1-.3v-.5l-.1-.3v-.6l-.2-.4-.1-.1-.1-.1V18l-.1-.3-.1-.1V17l-.2-.7.1-.2.3-.2v-.1l.1-.3v-.4l-.1-.1-.2-.3.1-.2v-.8l-.2-.2h-.2l-.1-.1.1-.4v-.2l-.1-.3v-.8l-.1-.4v-.1l.1-.1.1-.2.1-.2.1-.1V10l.1-.3.1-.3.1-.4.2-.2.2-.2.2-.2v-.2l.1-.1.1-.1.1-.2.3-.5.3-.6.4-.3L4 6l.2-.1.2-.1.3-.4.3-.1.2-.1.1-.1v-.4l.1-.2.4-.4.2-.4.5-.5.2-.2.1-.3.1-.4v-.6l.1-.1v-.3l.1-.2.1-.1.1-.2h.1V.4l.1-.1.1-.2V0z",
			onClick: n[0] ||= (t) => e.onClick(t),
			onDblclick: n[1] ||= (t) => e.onDblClick(),
			onMouseenter: n[2] ||= (t) => e.onEnter(t),
			onMouseleave: n[3] ||= (t) => e.onLeave(t)
		}, null, 32)], 8, ww)]));
	}
}, Ew = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 56 50"
}, Dw = ["stroke"], Ow = {
	__name: "Reunion",
	props: {
		config: {
			type: Object,
			required: !0
		},
		onClick: {
			type: Function,
			required: !0
		},
		onDblClick: {
			type: Function,
			required: !0
		},
		onEnter: {
			type: Function,
			required: !0
		},
		onLeave: {
			type: Function,
			required: !0
		}
	},
	setup(e) {
		return (t, n) => (P(), F("svg", Ew, [I("g", {
			fill: "#5C68E5",
			stroke: e.config.colorStroke,
			"stroke-width": "0.2%"
		}, [I("path", {
			class: "FR-974 REUNION",
			d: "m20.4 0-1 .5-1.6-.3-1.7.5-.6.2-3.7 2.8-.6.9-1.3.6-.6.1-.2-.3.1.3h.2v.6l-1-.2.5-.2v-.4l-1 .2-1.6-.5-.5.2-.1.9H6v-.3l.3.1-.2.7-.3-.2-.1.6.1-.6.1-.1h-.3l-.1 1.1-.3.5.5 1.9-.4 2.2-2 1.6-.7.3-1-.2L0 15.2v.6l.6 1-.2 2.4.8 1.2 2 1.6-.1.4 1.6 1.7.1 1.7.8.3.5.7v2l-.6 1.9.5.4.6 2.1 1.6.9.8.8v.4l.9.6.3.9-.2.4.7.7 2.2.3 2.1.7.8.5 1.9 2.3.8.4 1.7.2.5.3.2.7.9.5 1 .1-.4-.1h.4l.1-.3-.1.6h.2l.3.4 1.5-.1 1.9.9 1.3.3 1.1 1 .3-.3 1.5.5 1.3-.5.3.4.8.3.9.8 2.4-.5.8.7 1.2-.7 1 .2.8-.9 2.5.2 1.6-.7 2-.1.5-.5 1.7.2 1.9-1.4.9-1.2.1-.6-.5-2 .4-2-.4-.8-.2-1.8.7-3 .5-1.2.9-1 .1-1.6.9-.2-.3-1.7.2-.5-.7-.7-.1-.8-1.4-.6-1.2-1.1-1.3-.2-.9-1.5-.8-.7-.5-1-1.6-1.8-.6-1 .1-.8-1.3-1.7-.8-.4-.5-.9-.2-3.6-.3-1.3-1.2-1.9L39.1 5l-1.2-.8-1-.4-1.7-.2-2.5-1.4-.9.2-2-.6-.7.4-.8-.1L25.1 1l-1.4.3h-1.4z",
			onClick: n[0] ||= (t) => e.onClick(t),
			onDblclick: n[1] ||= (t) => e.onDblClick(),
			onMouseenter: n[2] ||= (t) => e.onEnter(t),
			onMouseleave: n[3] ||= (t) => e.onLeave(t)
		}, null, 32)], 8, Dw)]));
	}
}, kw = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 38 50"
}, Aw = ["stroke"], jw = {
	__name: "Mayotte",
	props: {
		config: {
			type: Object,
			required: !0
		},
		onClick: {
			type: Function,
			required: !0
		},
		onDblClick: {
			type: Function,
			required: !0
		},
		onEnter: {
			type: Function,
			required: !0
		},
		onLeave: {
			type: Function,
			required: !0
		}
	},
	setup(e) {
		return (t, n) => (P(), F("svg", kw, [I("g", {
			fill: "#5C68E5",
			stroke: e.config.colorStroke,
			"stroke-width": "0.2%"
		}, [I("path", {
			class: "FR-976 MAYOTTE",
			d: "M30.8 19.5V19l-.3-.2h-.2v.4l.1.1h.3zl.2.1v.3h.4v.1l.2.1h.2l.2.2h-.1.1l.2.2.2.1v.1l.1.1.2.6.4.4.2.4v.8h.1v.2l.2.1h.1l.2.1h.2l.2.5h.2v-.1L34 23v-1l.1-.1v-.1l.2-.2v-.1h.1v-.1h.9v-.2h.1l.1-.2.2-.2v-.2h-.2v-.4l-.2-.1v-.3l.2-.1v-.3l.2-.1h.1v.2h.1l.1-.1v-.3h-.5V19l.3-.3-.2-.2h-.2v-.1h-.1v-1H35l-.1-.1v-.1l-.1-.1-.1-.1h-.1v-.2h-.1l-.1-.1h-.1v-.3h-.1v-.1l-.2-.1v.1h-.1v.2h-.1v.1l-.2.1v.2l-.3.3-.2.2-.1.1-.2.2-.3.2-.7.7-.4.6.1.1h.2v-.1h.2l.2-.1v-.3H32v-.2h.1v.3h.1v-.1h.1v-.3h.4v.4l-.3.2v.2l-.2.2-.3.3v.3h-.3v-.2h-.2l-.2-.1.1-.1h.3v-.2.1H31h.2l.1-.3h-.1zM16.6 48l.2-.1.2-.1.1-.2h.1l.1-.3.2-.3v-.2h.2v-.2l.2-.2V46h-.1v-.3l-.2-.1v-.3h.1v-.1h.1l.2-.1v-.2h.1l.1-.1h1.1v.1h.1v.1l.2.1v.4h.1l.2.3v.8l.1.2v.1l.1.1v.3h.5V47h-.1l-.1-.1v-.4l.1-.1v-.2h.1l.1-.2h.3l.3-.1h.1l.2.1h.2l.2.2h.2v.1h.2V46l.1-.1.2-.1h.1v-.2l.1-.1h.1v-.1h.3V45h.1l.1-.2h.1l.2-.2-.1-.1h-.8v.2h-.2l-.4-.2-.1-.1-.1-.1-.2-.3h-.6l-.2-.2-.2-.1-.2-.2h-.1l-.2-.1-.1-.2-.1-.4v-.4l-.1-.1v-.2l-.2-.1-.1-.2h-.2l-.1-.1v-.2h-.1l-.2-.3V41l.2-.3v-.2h.1l.1-.2h.4l.2.1h.2l.2.1V40l-.3-.5-.1-.1v-.5l.2-.2.1-.3.1-.1v-.1l.1-.1h.3l.1-.1h.2v-.3h-.1v-.4l.2-.1.1-.2h1.1v.1h.1v.1l.2.1.3.1h.7l.4.2v-.1l-.4-.1h-.2v-.2h-.1V37h-.2v-.2l-.2-.1H23l-.1-1.4.2-.8-.1-.3h.1l.2-.1.3-.2h.1l.1-.1h.3v-.1h.3v-.1h.3v-.3h.1l.2-.2.2-.2h.3v-.3h-.2V32h.2v-.3h.1l.2-.2.2-.2V31h-.4l-.4.1-.2.1-.2-.2-.2-.3v-.1l.1-.5h.1v-.2l-.1-.1h-.2l-.2.1-.3-.2-.1-.1h-.1l-.3-.2V29l-.1-.2v-.1l-.1-.1H23v.1h-.2l-.1-.1v-.4l-.1-.1h-.1v-.6l.1-.1h-.1v-.1h-.1v-.2l-.2-.1v-.2h-.1v-.3l.1-.2h.1v-.1l.1-.1V26h.1l.2-.2v-.2h.3v-.1h-.6v-.4l.1-.4h.2v-.2h.1v-.1l.3-.2h.4l.1-.1v-.4h.1v-.3l.2-.2v-.4h.1l.1-.1.2-.2h.1v-.2l.1-.1.2-.1.3-.3h.2v-.2h.1v-.8h.1l.2-.1v-.1l.2-.1.2-.2.3-.3.3-.2.1-.1h.4v-.2h.2l.1-.1h.1v.1l.1.1h.3v-.1h.1V19h-.5l-.1-.1v-.2h-.1v-.2h.1v-.2h-.3v-.1l-.3-.1v.1l-.2-.1v-.4h.1v-.1h.1l.1-.1v-.2h.1v-.1l.1-.2v-.3h.3v.7h-.1v.2H27v.3h.5l.1-.3.1-.5h.1v-.4l.5-.1v-.1l-.1-.3H28l-.2-.4v-.2l.1-.1v-.3l-.1-.1h-.5V15H27v-.1l-.2-.1h.1v-.3l-.3-.1V14h-.2l-.5.1-.2-.1v-.3H25v-.2h-.1v-.2h-.1v-.2l.2-.1.1-.5H25v.3h-.2v.1h-.1v-.1h-.4v-.3H24v-.2h-.4l-.1-.1v-.1l-.2.1v.1h-.9l-.1-.1v-.1H22V12h-.7v-.1H21l-.1.1v.1h-.5l-.6-.2-.1-.2h-.1l-.2-.1v-.1l-.1-.3-.2-.2-.2-.3-.2.1v.1h-.1v.2h.1l.3.1v.4h-.2v-.2h-.3v.1l.1.2h.1l-.4.3v.2l-.4.5-.5.2-.5-.1v-.6h-.1V12h-2.1l.2-.3-.2-.2-.2-.2-.2-.3v-.6l-.2-.1-.1-.2h-.1l-.1-.2h-.2l-.1-.2v-.8l.4-.2h.2V9h.2v-.5l-.2.1h-.3l-.2-.1-.2-.1h-.2L13 8l-.2-.1-.2-.2h-.3l-.1-.1v-.1H12v-.3l-.1-.1v-.3h.3v-.1l-.1-.1-.1-.2h-.4v-.1l-.1-.2V6h-.8v-.2h-.1v-.2h.1l.1-.1.1-.2.1-.1h-.3v-.1h-.4l-.1-.1H10v-.2h-.5v-.1h-.4L9 4.5v-.4h.1V4h.2l.1-.1h.1v-.2h.3l.1-.1h.2v-.1h.3v-.1h.2l.1-.1h.4l.1-.1h-.3v-.1h-.2v-.3l.1-.1v-.4h.2l.1-.1v-.1h.2V2h-.1v-.1H11v.3h-.1l-.1.1v.1h-.1v.1h-.1v.1h-.2l-.1.1v.1H10V3h-.4l-.1-.1h-.1V3h.1v.6h-.2v.1h-.1v.1H9V4h-.4v.5h-.1v.1h-.2l-.1.1v.8l.1.1v.1l-.1.1-.1.1-.2.1h-.1l-.2.1-.2.1h-.6L6.6 6h-.3v-.1h-.1v.2h.1l.2.1h.2l.1.1.1.1H7v.9h-.1v.1h-.1l-.1.2v.1h-.2v-.1h-.2v.1h.1v.1h.1V8h-.1l-.1.1v.1h-.1v.1H6l-.1.1h-.2v.1h-.1l-.1.1-.3-.1h-.6v-.1h-.4v.2H4v.2l-.2.1h.3v.7H4v.3l-.2.1v.2l-.1.1-.2.3-.2.1v.1l-.1.1v.1l-.2.2h-.3v.2h1.4l.3.1h.2l.1.1v.1l.1.1v.1l.2.2-.1.1-.2.1v.3l-.1.3-.1.1h-.1l-.2.2-.2.2-.4.1-.2.1v.2l-.3.2-.1.2v.5l.1.1.1.1h.1l.1.1.1.2H4v.2l.1.1v.2h.3l.1-.1.1-.2v-.1l.2-.1h.7l.1.1.1.1h.1v.3H6v.3h.2v.1l.4.2h.1v.1h.1v.1l.2.2v.1h.1v.1h.1v.1h.2v.1l.3.1.3-.3.7.2.2.1.1.1h.1v.1l.2.2.1.2h.2l.1-.1h.1v-.2h.2v-.2l.1-.1V17l.2-.2h.2v.2h.2v.1l-.1.1v.2h.1v.2l.1.2v.2h-.2v.9h-.2v.1h-.1l-.1.1v.1H10l-.1.1h-.2v.3h.1l.1.1.1.2v.3h.1v.2l1.2.1v-.1l.2.1v.3l-.7.2-.2.1v.4h-.1v.7l.4.4v.5h.1v.2h.1v.8h-.2v.7l-.1.3-.1.3-.2.5v.1l.3.2h.7l.1.1h.4l.1.1h.1l.2.2h.2v.4l-.1.2h-1l-.3.2-.3-.2h-.2v.2l-.3.4-.2.2-.2.2h-.5v.2l.1.1h.2v.1l.1.1h.1v.1h.1v.1l.1.1.1.1v.2h.1v.1h.2v.1h.2v.1l.1.1v.1h.7v.1h.2l.2.1v.1l.2.2v.3h.2v.3l.1.1v.1h.1v.1l.1.1v.1l.1.2h.2v.1l.2.2v.1l.2.1v.2h.4l.2.1v.1h.2l.3.7h.4l.1.1h.2v.4l.2.5v.6h.3l.1.1v.4l.1.2h.2l.1.2.1.1.1.1v.2l.1.1v.3l.1.2.1.2v.1l.1.2v.6l-.3.9-.4.4-1 .3h-.6l-.6-.4-.3-.2v-.2l-.2-.1h-.3l-.4-.2-.2-.1-.1-.1H12V38h-.4l-.2-.1h-.1v-.2H11l-.1-.2h-.1l-.2-.4v-1.3l.1-.1v-.5l-.3-.3-.1-.1v-.2h-.6l-.1-.1H7.4l-.2.1h-.5v.4H7l.1.1h.1l.3.5.2.5v.3l.2.1v.5l.2.1v.3l.2.2.1.1h.3l.2.3v.1l.1.1v.2l-.2.1v.2h.4l.2-.2.2-.1h.2v-.2h.6l.2.2.1.2.2.2v.6l-.1.1h-.1v.6l-.1.1v.4l-.1.2-.1.2-.2.2-.2.2-.1.2-.2.2-.1.2h-.3l-.2.1-.2.1-.3.2h-.1l-.1.1-.1.1H8v.4h-.1v.1H8l.2-.1h.3l.4.3.6.4.5-.3h.4l.2-.3.2-.2.1-.2v-.1l.7.3v1.4l-.1.1-.2.1v.8l.2.4-.2.4-.2.2v.4h.2l.1.2.1.2v.1h.1V47l.3-.8V46l.4-.4.2-.1h.2l.2-.1.3.1.3.1h.1v.3l.2.4-.2.5.1.2v.4l.3-.1h.2l.1-.1h.2V47l.1-.2h.4l.4.1v.3l.2.3v.3l.2.1h.3zM1 0 .9.3v.1L.8.5H.7L.5.8H.3v.1H0V1l.1.2v.2h.4l.1-.1h.2l.2.1.2.2.2.1.1.2v.4l-.1.1h-.2v.1l-.1.2v.2l.1-.2v-.2h.6l.2-.2V2l.2-.1v-.1h.2l.3-.2H3v-.3l-.1-.1h-.1L2.4 1V.7H2V.5L1.7.3h-.2V.2h-.2z",
			onClick: n[0] ||= (t) => e.onClick(t),
			onDblclick: n[1] ||= (t) => e.onDblClick(),
			onMouseenter: n[2] ||= (t) => e.onEnter(t),
			onMouseleave: n[3] ||= (t) => e.onLeave(t)
		}, null, 32)], 8, Aw)]));
	}
}, Mw = ["viewBox"], Nw = ["stroke"], Pw = {
	France: uw,
	FranceReg: pw,
	FranceAca: gw,
	Guadeloupe: yw,
	Martinique: Sw,
	Guyane: Tw,
	Reunion: Ow,
	Mayotte: jw,
	World: {
		__name: "World",
		props: {
			config: {
				type: Object,
				required: !0
			},
			onClick: {
				type: Function,
				required: !0
			},
			onDblClick: {
				type: Function,
				required: !0
			},
			onEnter: {
				type: Function,
				required: !0
			},
			onLeave: {
				type: Function,
				required: !0
			}
		},
		setup(e) {
			return (t, n) => (P(), F("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: e.config.viewBox
			}, [I("g", {
				fill: "#5C68E5",
				stroke: e.config.colorStroke,
				"stroke-width": ".1%"
			}, [
				I("path", {
					id: "United Arab Emirates",
					class: "AE",
					style: k({ display: e.config.displayPath.AE }),
					d: "m619.9 393.7.5-.1v.8l2.3-.5 2.3.1 1.7.1 1.9-2 2.1-2 1.8-2 .5 1.1.4 2.4H632l-.3 2 .5.5-1.2.6v1.2l-.9 1.3v1.2l-.6.6-8.4-1.5-1.1-3z",
					onClick: n[0] ||= (t) => e.onClick(t),
					onDblclick: n[1] ||= (t) => e.onDblClick(),
					onMouseenter: n[2] ||= (t) => e.onEnter(t),
					onMouseleave: n[3] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Afghanistan",
					class: "AF",
					style: k({ display: e.config.displayPath.AF }),
					d: "m646.9 356.9 2.8 1.3 2.1-.5.6-1.5 2.3-.5 1.5-1 .6-2.9 2.4-.7.4-1.2 1.3 1h2.4l2.1.8.9.4 2-1 1 .6.9-1.6h1.6l.5-.5.3-1.4 1.2-1.2 1.5.8-.3 1 .9.2-.3 3 1 1.1 1-.7 1.3-.3 1.8-1.6 1.9.3h2.9l.5 1-1.6.3-1.5.7-3.2.4-3 .7-1.6 1.5.6 1.5.3 1.7-1.4 1.4.2 1.3-.8 1.3-2.7-.2 1.1 2.3-1.7.8-1.2 2 .1 2-1 1-1.1-.4-2.2.4-.3 1h-2l-1.6 1.8-.1 2.7-3.7 1.4-2-.3-.5.7-1.7-.4-2.8.5-4.7-1.7 2.6-2.9-.2-2.1-2.2-.6-.2-2-1-2.7 1.3-1.8-1.2-.5.7-2.5z",
					onClick: n[4] ||= (t) => e.onClick(t),
					onDblclick: n[5] ||= (t) => e.onDblClick(),
					onMouseenter: n[6] ||= (t) => e.onEnter(t),
					onMouseleave: n[7] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Albania",
					class: "AL",
					style: k({ display: e.config.displayPath.AL }),
					d: "m533 334.7-.4 1.2.4 1.6 1.2 1v.9l-1 .5-.2 1.2-1.2 1.8-.5-.3v-.8l-1.6-1.2-.3-1.7.3-2.6.3-1.1-.4-.6-.2-1.2 1.2-1.9.2.7.7-.3.6 1 .7.4z",
					onClick: n[8] ||= (t) => e.onClick(t),
					onDblclick: n[9] ||= (t) => e.onDblClick(),
					onMouseenter: n[10] ||= (t) => e.onEnter(t),
					onMouseleave: n[11] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Armenia",
					class: "AM",
					style: k({ display: e.config.displayPath.AM }),
					d: "m597.5 337.5 3.9-.6.5 1 1.1.6-.6 1 1.5 1.2-.8 1.2 1.2 1 1.3.6v2.5h-1l-1.1-2v-.6h-1.2l-.9-1-.5.2-1.2-1.1-2-1 .2-1.7z",
					onClick: n[12] ||= (t) => e.onClick(t),
					onDblclick: n[13] ||= (t) => e.onDblClick(),
					onMouseenter: n[14] ||= (t) => e.onEnter(t),
					onMouseleave: n[15] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Angola",
					class: "AO",
					style: k({ display: e.config.displayPath.AO }),
					d: "m521 479.8.7 2 .8 1.7.7 1 1 1.4 1.9-.2 1-.4 1.5.4.4-.7.7-1.6 1.7-.1.2-.5h1.4l-.2 1h3.4v1.7l.6 1.1-.4 1.7.2 1.7 1 1-.2 3.5.7-.3h1.2l1.7-.4 1.3.2.3.9-.3 1.4.5 1.3-.4 1 .2 1h-5.8l-.2 9.2 2 2.4 1.7 1.8-5.1 1.2-6.8-.4-2-1.4-11.3.1-.4.2-1.7-1.3h-1.8l-1.7.4-1.3.6-.3-1.9.4-2.5 1-2.7.1-1.2 1-2.6.6-1.2 1.6-1.8.9-1.3.3-2.1-.2-1.6-.8-1-.8-1.7-.6-1.7.1-.6.9-1.1-.9-2.8-.6-1.8-1.4-1.8.3-.6 1.2-.3h.8l1-.3zm-10.9-.6-.7.3-.7-2 1-1.3 1-.4 1 1-1 .5-.5.7z",
					onClick: n[16] ||= (t) => e.onClick(t),
					onDblclick: n[17] ||= (t) => e.onDblClick(),
					onMouseenter: n[18] ||= (t) => e.onEnter(t),
					onMouseleave: n[19] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Argentina",
					class: "AR",
					style: k({ display: e.config.displayPath.AR }),
					d: "m291.6 649-2.7.2-1.4-1.8-1.7-.1h-3v-10.6l1.1 2.2 1.4 3.5 3.6 2.9 4 1.2zm1.5-122.5 1.7 2.2 1-2.5 3.2.1.5.7 5.1 5 2.3.4 3.5 2.2 2.8 1.2.4 1.4-2.7 4.7 2.8.9 3.2.5 2.2-.5 2.5-2.4.5-2.8 1.4-.6 1.4 1.8v2.5l-2.4 1.7-2 1.3-3 3.1-3.8 4.4-.7 2.6-.8 3.3v3.3l-.5.8-.3 2.1-.2 1.8 3.6 3-.4 2.3 1.8 1.5-.2 1.7-2.7 4.5-4.1 2-5.6.7-3.1-.4.6 2.2-.6 2.7.5 1.8-1.7 1.3-2.8.5-2.7-1.3-1.1 1 .4 3.7 1.9 1.1 1.5-1.2.9 2-2.6 1.2-2.3 2.3-.4 4-.6 2h-2.7l-2.2 2.1-.8 3 2.8 3 2.6.8-1 3.8-3.2 2.3-1.8 5-2.6 1.8-1.2 2 1 4.7 1.8 2.6-1.2-.2-2.6-.7-6.7-.6-1.2-2.7V628l-1.8.3-1-1.6-.3-4.6 2.2-1.9.9-2.7-.3-2 1.4-3.6 1-5.4-.2-2.3 1.2-.7-.3-1.5-1.3-.8 1-1.6-1.4-1.5-.6-4.4 1.1-.8-.5-4.5.7-3.7.8-3.3 1.6-1.3-.8-3.4v-3.2l2.1-2.3v-2.9l1.5-3.3v-3l-.7-.7-1.3-5.7 1.8-3.3-.3-3.1 1-3 1.8-2.9 2-2-.8-1.2.6-1-.1-5.1 3-1.5 1-3.2-.4-.7 2.4-2.8z",
					onClick: n[20] ||= (t) => e.onClick(t),
					onDblclick: n[21] ||= (t) => e.onDblClick(),
					onMouseenter: n[22] ||= (t) => e.onEnter(t),
					onMouseleave: n[23] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Austria",
					class: "AT",
					style: k({ display: e.config.displayPath.AT }),
					d: "m522.9 309.9-.2 1.7H521l.5.9-1 2.6-.5.7-2.4.1-1.4 1-2.3-.4-4-1-.7-1.5-2.7.8-.4.7-1.7-.6H503l-1.3-.8.5-1-.2-.8.9-.2 1.4 1.2.4-1.1 2.5.2 2-.8 1.3.1 1 .9.2-.7-.4-2.7 1-.6 1-2 2 1.4 1.6-1.7 1-.3 2.2 1.3 1.3-.2 1.3.8-.2.5z",
					onClick: n[24] ||= (t) => e.onClick(t),
					onDblclick: n[25] ||= (t) => e.onDblClick(),
					onMouseenter: n[26] ||= (t) => e.onEnter(t),
					onMouseleave: n[27] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Australia",
					class: "AU",
					style: k({ display: e.config.displayPath.AU }),
					d: "m883 588.2 2.6 1.2 1.6-.5 2.2-.7 1.6.3.2 4.4-1 1.3-.2 3-1-1-2 2.7-.5-.2-1.7-.2-1.8-3.2-.4-2.5-1.6-3.3.1-1.7zm-5.2-86.1 1 2.3 1.8-1.1 1 1.2 1.3 1.1-.3 1.3.6 2.5.4 1.4.7.4.8 2.5-.3 1.5 1 2 3 1.5 2 1.4 1.8 1.3-.4.7 1.6 2 1.1 3.2 1.2-.7 1.1 1.3.7-.4.5 3.2 2 1.8 1.3 1.2 2.1 2.5.8 2.5.1 1.8-.2 1.9 1.4 2.7-.2 2.8-.5 1.5-.8 2.8.1 1.9-.5 2.3-1.3 3-2 1.7-1 2.6-1 1.6-.9 3-1 1.7-.7 2.5-.4 2.4.1 1.2-1.6 1.2-3.1.1-2.6 1.5-1.3 1.3-1.7 1.6-2.3-1.6-1.7-.6.4-1.9-1.5.7-2.5 2.6-2.4-1-1.6-.6-1.6-.2-2.7-1-1.8-2.2-.5-2.7-.7-1.7-1.4-1.4-2.7-.4 1-1.7-.7-2.5-1.4 2.3-2.5.7 1.5-2 .4-1.9 1-1.6-.1-2.5-2.3 2.9-1.8 1.1-1 2.7-2.2-1.4v-1.8l-1.7-2.4-1.5-1.3.6-.7-3.6-2-2-.1-2.7-1.6-5 .3-3.7 1.2-3.1 1-2.7-.2-3 1.7-2.4.8-.6 1.8-1 1.3-2.4.1-1.7.3-2.5-.6-2 .4-2 .1-1.6 1.8-.9-.1-1.4 1-1.3 1-2-.1h-2l-3-2.2-1.4-.6v-2l1.4-.4.5-.8v-1.2l.2-2.3-.3-2-1.4-3.2-.5-1.9.1-1.8-1.1-2v-1l-1.3-1.3-.4-2.4-1.6-2.5-.4-1.4 1.3 1.4-1-2.9 1.4 1 .8 1.1v-1.6l-1.4-2.4-.3-1-.6-.9.3-1.8.6-.7.3-1.5-.3-1.8 1.2-2.2.2 2.3 1.2-2 2.3-1 1.3-1.3 2.2-1.1 1.2-.3.8.4 2.2-1.1 1.7-.3.4-.7.8-.3 1.5.1 3-.9 1.5-1.3.7-1.5 1.7-1.5.1-1.2v-1.6l2-2.5 1.2 2.5 1.2-.5-1-1.4.9-1.4 1.2.6.4-2.2 1.5-1.4.7-1.2 1.4-.5v-.8l1.2.4.1-.7 1.2-.4 1.4-.4 2 1.3 1.6 1.7h1.8l1.7.3-.5-1.6 1.3-2.3 1.3-.7-.5-.8 1.2-1.6 1.7-1 1.5.3 2.3-.5V496l-2-1 1.4-.4 1.9.7 1.5 1.2 2.3.7.8-.3 1.8.9 1.6-.8 1 .2.7-.5 1.3 1.4-.7 1.5-1.1 1.2h-1l.4 1.2-.9 1.5-1 1.4.2.8 2.3 1.6 2.1.9 1.5 1 2 1.7h.8l1.5.8.4.9 2.7 1 1.8-1 .6-1.6.5-1.3.4-1.6.8-2.3-.3-1.4.2-.8-.4-1.7.4-2.1.5-.6-.4-1 .7-1.5.5-1.5v-.8l1.1-1 .8 1.3.2 1.8.7.3.1 1.2 1 1.5.3 1.6z",
					onClick: n[28] ||= (t) => e.onClick(t),
					onDblclick: n[29] ||= (t) => e.onDblClick(),
					onMouseenter: n[30] ||= (t) => e.onEnter(t),
					onMouseleave: n[31] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Azerbaijan",
					class: "AZ",
					style: k({ display: e.config.displayPath.AZ }),
					d: "m601.4 342.5.9 1h1.2v.5l1.1 2-1.9-.4-1.4-1.7-.4-1.4.5.1zm6.7-5.5 1.2.3.5-1 1.7-1.5 1.4 2 1.5 2.6 1.3.2.8 1-2.3.3-.5 2.8-.4 1.2-1 .9v1.8l-.7.1-1.7-1.8 1-1.8-.9-1-1 .2-3.4 2.7v-2.5l-1.3-.6-1.2-1 .8-1.2-1.5-1.2.6-1-1-.6-.7-1 .7-.6 2.1 1 1.5.3.4-.4-1.4-2 .8-.6.8.2z",
					onClick: n[32] ||= (t) => e.onClick(t),
					onDblclick: n[33] ||= (t) => e.onDblClick(),
					onMouseenter: n[34] ||= (t) => e.onEnter(t),
					onMouseleave: n[35] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Bosnia and Herzegovina",
					class: "BA",
					style: k({ display: e.config.displayPath.BA }),
					d: "M528.5 323.1h1l-.6 1.7 1.3 1.5-.4 1.8-.7.2-.5.4-.9.9-.4 2-2.5-1.4-1-1.6-1.1-.8-1.3-1.5-.6-1.2-1.4-1.8.6-1.7 1 1 .6-.9h1.3l2.4.6h2z",
					onClick: n[36] ||= (t) => e.onClick(t),
					onDblclick: n[37] ||= (t) => e.onDblClick(),
					onMouseenter: n[38] ||= (t) => e.onEnter(t),
					onMouseleave: n[39] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Bangladesh",
					class: "BD",
					style: k({ display: e.config.displayPath.BD }),
					d: "M735 400.4v2.2l-1-.5.2 2.4-.8-1.6-.1-1.5-.6-1.4-1.1-1.8-2.6-.1.3 1.3-1 1.6-1.1-.6-.4.6-.8-.4-1.1-.2-.4-2.5-1-2.3.5-1.8-1.8-.9.6-1 1.8-1.2-2-1.7 1-2 2.2 1.3 1.3.1.3 2.2 2.6.4h2.6l1.7.5-1.3 2.6-1.3.1-.9 1.8 1.6 1.6.4-2h.8z",
					onClick: n[40] ||= (t) => e.onClick(t),
					onDblclick: n[41] ||= (t) => e.onDblClick(),
					onMouseenter: n[42] ||= (t) => e.onEnter(t),
					onMouseleave: n[43] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Belgium",
					class: "BE",
					style: k({ display: e.config.displayPath.BE }),
					d: "m484.6 296 2 .3 2.6-1 1.8 2 1.5 1-.3 3-.7.1-.3 2.5-2.5-2-1.4.4-2-2.1-1.3-1.8h-1.3l-.4-1.6z",
					onClick: n[44] ||= (t) => e.onClick(t),
					onDblclick: n[45] ||= (t) => e.onDblClick(),
					onMouseenter: n[46] ||= (t) => e.onEnter(t),
					onMouseleave: n[47] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Burkina Faso",
					class: "BF",
					style: k({ display: e.config.displayPath.BF }),
					d: "m467.3 436.4-1.9-.7h-1.3l-1 .8-1.2-.6-.5-1-1.3-.6-.2-1.6.8-1.2v-1l2.1-2.3.4-2 .8-.7 1.4.4 1.2-.6.3-.7 2.2-1.3.5-1 2.7-1.1 1.5-.4.7.5h1.8l-.2 1.4.4 1.3 1.5 1.9.1 1.4 3.3.6-.1 2-.6.8-1.4.3-.6 1.2-1 .4-2.4-.1-1.3-.2-.9.4-1.2-.2-4.9.2v1.6z",
					onClick: n[48] ||= (t) => e.onClick(t),
					onDblclick: n[49] ||= (t) => e.onDblClick(),
					onMouseenter: n[50] ||= (t) => e.onEnter(t),
					onMouseleave: n[51] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Bulgaria",
					class: "BG",
					style: k({ display: e.config.displayPath.BG }),
					d: "m538.8 325.6.8 1.6 1-.3 2.2.6 4.2.2 1.3-1 3.3-1 2 1.5 1.7.4-1.4 1.6-1 2.7.9 2.2-2.5-.5-2.8 1.2v1.8l-2.6.4-2-1.3-2.2 1-2-.1-.3-2.5-1.4-1.2.5-.5-.3-.5.4-1.2 1.1-1.2-1.4-1.6-.2-1.5z",
					onClick: n[52] ||= (t) => e.onClick(t),
					onDblclick: n[53] ||= (t) => e.onDblClick(),
					onMouseenter: n[54] ||= (t) => e.onEnter(t),
					onMouseleave: n[55] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Burundi",
					class: "BI",
					style: k({ display: e.config.displayPath.BI }),
					d: "m557.5 476-.2-3.4-.7-1.3 1.7.2.9-1.6 1.5.2.1 1.1.7.6v1l-.7.5-1.1 1.5-1 1z",
					onClick: n[56] ||= (t) => e.onClick(t),
					onDblclick: n[57] ||= (t) => e.onDblClick(),
					onMouseenter: n[58] ||= (t) => e.onEnter(t),
					onMouseleave: n[59] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Benin",
					class: "BJ",
					style: k({ display: e.config.displayPath.BJ }),
					d: "m482.8 446-2.3.3-.7-2 .1-6.4-.5-.6-.1-1.4-1-1-.9-.8.4-1.5 1-.4.5-1.2 1.4-.3.6-.8 1-.8h1l2 1.6v1l.6 1.6-.5 1.1.2.8-1.3 1.8-.9.8-.5 1.8v1.8z",
					onClick: n[60] ||= (t) => e.onClick(t),
					onDblclick: n[61] ||= (t) => e.onDblClick(),
					onMouseenter: n[62] ||= (t) => e.onEnter(t),
					onMouseleave: n[63] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Brunei Darussalam",
					class: "BN",
					style: k({ display: e.config.displayPath.BN }),
					d: "m795.5 450.8 1-1 2.5-1.6-.2 1.4-.1 1.8-1.4-.1-.6 1z",
					onClick: n[64] ||= (t) => e.onClick(t),
					onDblclick: n[65] ||= (t) => e.onDblClick(),
					onMouseenter: n[66] ||= (t) => e.onEnter(t),
					onMouseleave: n[67] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Bolivia",
					class: "BO",
					style: k({ display: e.config.displayPath.BO }),
					d: "m299 526.4-3.2-.2-1 2.4-1.7-2.1-3.7-.8-2.3 2.8-2 .4-1.1-4.2-1.5-3.3.9-2.9-1.5-1.2-.4-2.2-1.4-2 1.8-3.1-1.2-2.4.6-1-.5-1 1.1-1.5v-2.5l.2-2 .6-1-2.4-4.5 2 .2h1.5l.7-.9 2.4-1.1 1.5-1.1 3.7-.5-.3 2.1.3 1.1-.2 2 3 2.5 3.2.4 1 1.1 2 .6 1.1.8h1.8l1.6.8.1 1.7.6.8v1.3h-.8l1 3.4 5.4.1-.4 1.7.3 1.1 1.6.9.6 1.8-.5 2.3-.7 1.3.2 1.7-.8.6v-1l-2.7-1.4h-2.6l-4.9.8-1.3 2.6-.1 1.6-1.1 3.6z",
					onClick: n[68] ||= (t) => e.onClick(t),
					onDblclick: n[69] ||= (t) => e.onDblClick(),
					onMouseenter: n[70] ||= (t) => e.onEnter(t),
					onMouseleave: n[71] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Brazil",
					class: "BR",
					style: k({ display: e.config.displayPath.BR }),
					d: "m313.7 551.8 3.7-4.4 3.2-3 1.9-1.3 2.3-1.8v-2.5l-1.3-1.7-1.4.5.5-1.7.4-1.9v-1.6l-1-.6-1 .5-1-.1-.4-1.2-.3-2.8-.5-.9-1.9-.8-1.1.6-3-.6.2-4-.8-1.7.8-.6-.2-1.7.7-1.3.5-2.3-.6-1.8-1.6-.9-.3-1.1.4-1.7-5.3-.1-1.1-3.4h.8v-1.3l-.6-.8V502l-1.7-.8h-1.8l-1.1-.8-2-.6-1-1-3.2-.5-3-2.6.2-1.9-.3-1 .3-2.2-3.7.5-1.5 1-2.4 1.2-.7.9h-1.4l-2.1-.2-1.6.5-1.3-.4.2-4.3-2.3 1.7H273l-1.1-1.6-1.9-.1.6-1.2-1.5-1.8-1.2-2.5.7-.5v-1.2l1.7-.8-.2-1.5.7-1 .2-1.3 3.2-2 2.3-.4.4-.5 2.5.2 1.2-7.7.1-1.2-.4-1.6-1.3-1v-2l1.6-.5.6.3v-1l-1.6-.3v-1.8h5.5l.9-.9.8.9.5 1.6.5-.3 1.6 1.5 2.2-.2.5-.9 2-.6 1.3-.5.3-1.1 2-.9-.2-.5-2.3-.3-.4-1.7v-1.9l-1.2-.7.5-.3 2.1.4 2.3.7.8-.7 2-.4 3.1-1 1-1.1-.3-.8 1.4-.1.7.6-.4 1.2 1 .4.6 1.4-.8 1-.4 2.3.7 1.4.2 1.3 1.7 1.3 1.4.2.3-.6 1-.1 1.2-.5.9-.7 1.5.2.7-.1 1.6.2.2-.6-.5-.5.3-.8 1.1.2 1.4-.2 1.6.5 1.2.6.9-.7h.6l.4.9 1.3-.2 1-1 1-2.1 1.6-2.6 1-.1.7 1.5 1.5 4.9 1.5.4.1 2-2.1 2.3.9.8 5 .4v2.8l2.2-1.8 3.5 1 4.6 1.7 1.4 1.6-.4 1.6 3.2-.9 5.5 1.5 4.2-.1 4.1 2.3 3.6 3.1 2.1.8 2.4.1 1 1 1 3.5.5 1.7-1.1 4.7-1.5 1.8-4 4-1.7 3.1-2 2.5h-.8l-.8 2.2.2 5.4-.7 4.5-.4 1.9-.8 1.1-.5 4-2.9 3.9-.4 3-2.3 1.4-.7 1.8h-3l-4.4 1.1-2 1.4-3.2.9-3.2 2.4-2.4 3-.4 2.4.4 1.7-.5 3.2-.6 1.6-2 1.7-3 5.7-2.6 2.6-1.9 1.5-1.2 3.2-1.9 1.9-.8-2 1.3-1.5-1.7-2.2-2.2-1.9-2.8-2h-1l-2.9-2.4z",
					onClick: n[72] ||= (t) => e.onClick(t),
					onDblclick: n[73] ||= (t) => e.onDblClick(),
					onMouseenter: n[74] ||= (t) => e.onEnter(t),
					onMouseleave: n[75] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Bahamas",
					class: "BS",
					style: k({ display: e.config.displayPath.BS }),
					d: "m257.9 395.2-.7.2-.7-1.8-1-.9.5-2 .9.2 1 2.5zm-.8-8.7-3.1.5-.2-1.1 1.3-.3 1.9.1zm2.3 0-.5 2.2-.5-.4v-1.6l-1.2-1.3v-.3z",
					onClick: n[76] ||= (t) => e.onClick(t),
					onDblclick: n[77] ||= (t) => e.onDblClick(),
					onMouseenter: n[78] ||= (t) => e.onEnter(t),
					onMouseleave: n[79] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Bhutan",
					class: "BT",
					style: k({ display: e.config.displayPath.BT }),
					d: "m732.4 382.8 1.1 1-.2 2H731l-2.4-.2-1.7.5-2.6-1.2v-.6l1.8-2.4 1.5-.8 2 .8h1.5z",
					onClick: n[80] ||= (t) => e.onClick(t),
					onDblclick: n[81] ||= (t) => e.onDblClick(),
					onMouseenter: n[82] ||= (t) => e.onEnter(t),
					onMouseleave: n[83] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Botswana",
					class: "BW",
					style: k({ display: e.config.displayPath.BW }),
					d: "m547.2 516 .5.5 1 1.7 3 3.2 1.3.4v1l.8 1.9 2.2.5 1.8 1.3-4 2.2-2.5 2.3-1 2-.8 1.2-1.5.2-.5 1.5-.3 1-1.8.7-2.3-.2-1.3-.8-1.2-.4-1.4.7-.6 1.5-1.4 1-1.4 1.3-2 .3-.6-1 .3-2-1.7-2.9-.8-.5v-8.8l2.8-.1V515h2.2l4.3-1.1 1 1.2 1.9-1.2h.8l1.6-.6.5.2z",
					onClick: n[84] ||= (t) => e.onClick(t),
					onDblclick: n[85] ||= (t) => e.onDblClick(),
					onMouseenter: n[86] ||= (t) => e.onEnter(t),
					onMouseleave: n[87] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Belarus",
					class: "BY",
					style: k({ display: e.config.displayPath.BY }),
					d: "m541.1 284 2.7.1 3-1.8.7-2.7 2.3-1.6-.3-2.2 1.7-.8 3-2 3 1.3.4 1.2 1.5-.6 2.7 1.2.3 2.3-.6 1.4 1.8 3.1 1 .9v.8l1.8.9.8 1.2-1 1-2.3-.1-.6.4.7 1.6.7 2.9-2.4.3-.9 1-.2 2.2-1-.4-2.6.2-.8-1-1 .7-1-.6-2.3-.1-3.1-1-2.8-.4H544l-1.5 1.3-1.4.2v-2l-.9-2.2 1.7-1V288l-.8-1.7z",
					onClick: n[88] ||= (t) => e.onClick(t),
					onDblclick: n[89] ||= (t) => e.onDblClick(),
					onMouseenter: n[90] ||= (t) => e.onEnter(t),
					onMouseleave: n[91] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Belize",
					class: "BZ",
					style: k({ display: e.config.displayPath.BZ }),
					d: "M225.3 413v-.5l.3-.1.5.3 1-1.7h.6v.4h.5v.8l-.5 1.2.3.5-.3 1 .1.3-.3 1.5-.5.8h-.5l-.6 1h-.8l.2-3.2z",
					onClick: n[92] ||= (t) => e.onClick(t),
					onDblclick: n[93] ||= (t) => e.onDblClick(),
					onMouseenter: n[94] ||= (t) => e.onEnter(t),
					onMouseleave: n[95] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Canada",
					class: "CA",
					style: k({ display: e.config.displayPath.CA }),
					d: "m199 96.2-.3-5.9 3.6.6 1.7 1 3.3 4.9-.7 5-4.2 2.7-2.3-3zm13 12.8.4-1.5-2-2.5-5.6-.2.7 3.7 5.3.9zm36.4 47 3 5 .9.6 3-1.3 3 .2 3 .3-.2-2.6-4.8-5.4-6.5-1-1.3.6zM183 93l-2.7 4.2 6.2.5 4.6 4.5 4.6 1.5-1.1-5.7-2.1-6.7L185 86l-5.5-2 .2 5.7zm26-10 5-.1-2.1 4V92l3 5.7 5.7 1.8 5-1 5.2-10.7 3.8-4.5-3.3-5-2.2-10.6-4.6-3.2-4.8-3.7-3.5-9.5-6.6 1 1.3 4-3 1.3L206 63l-1.9 7.5 1.8 7.3zm-63.8 53.4 4 2 12.6-1.4-5.8 4.8.3 3.4 4.3-.2 7-4.6 9.6-1.7 1.7-5.2-.5-5.6-3-.5-2.5 2-1-4.2-1-5.7-2.9-1.4-2.6 4.4 4 11-4.9-.8-5-6.8-7.8-4-2.7 3.4zm22.6-42-3.7-3-1.5-.7-2.9 4.3v2h4.7zm-1.5 12.3 1-4-4-2.1-4.1 1.3-2.3 4.3 4.2 4.2zm29.1 33.2 4.6-1.1 1.3-8.3v-6L199 119l-.2 1.6-4-.7-4.2 4.1-3-.4.2 9 4.6-.9-.1 6.5zm-3.3 45.6-5-4-4.7-4.1-1-6.2-1.7-9-3.1-3.8-2.8-1.5-2.5 1.4 2 9.6-1.4 3.7-2.3-9-2.5-3-3.2 4.7-4-4.7-6.2 2.8 1.4-4.4-2.8-1.9-7.5 5.9-2 3.7-2.3 6.7 4.9 2.4 4.3-.2-6.5 3.5 1.5 3.1 4 .2 6-.7 5.4 2-3.7 1.4-4-.3-4.3 1.4-1.8.8 3.4 6.4 2.5-.9 3.8 2.2 1.5 3.6 5-.7 7.1-1.2 5.3-2.6 3.3-.5 4.8 2.1 5 1.2 1-2.8-1.8-3 4.6-.7zm7.8-1-2 3.6-2.5 2.5 3.9 3.5 2.2-.8 3.8 2.3 1.8-2.7-1.7-3-.9-1.6-1.7-1.4zM182.2 155l-2-2.2-3.8.4-1 1.4 4.4 6.7zm28.7 13.2 3-7 3.4-1.8 4.2-8.8-5.4-2.4-5.8-.4-2.8 2.8-1.5 4.2v4.8l1.7 8.2zm17.2-23 5.8-.2 8-1.6 3.6 1.2 4.2-2.2 1.7-2.9-.6-4.5-3-4.2-4.6-.8-5.7 1-4.5 2.4-4-1-3.8-.4-1.8-2.7-3.2-2.7.6-4.4-2.4-4h-5.5l-3.1-4-5.8-.7-1 5 3.2 3.8 5.8 1.5 2.8 5 .3 5.7 1 6 7.4 3.4zm-89-18.3 5.2-5 2.6-.7 2.2-4.2.3-9.8-3.8 2-4.3-.2-5.8 8.2-4.7 9 3.8 2.4zm72.2 16.2 1.5-4.2-1-3.4-2.5-4-4 3-1.5 5 3.4 2.8zm-8.4 11.4-.7-2.9-5 1.3-3.3-2.1-3.4 4.8 3.1 6.2-5.7-1.1v3l7 7 1.9 3.4 2.7.7 4.6-3.4.5-8.2-4.3-4zm-74 153.7-1.1-2.3-2.8-1.8-1.4-2-1-1.5-2.6-.5-1.7-.7-3-1-.2 1.1 1 2.4 3 .8.5 1.2 2.5 1.5.8 1.5 4.6 2zm121.8-77.6-2-2.1-2.1.5-.3-3-3.2-2.1-3-2.3-1.7-1.7-1.4 1-.5-3-2-.5-1 6.1-.4 5.1-2.4 3.2 3.8-.6 1 3.6 4-3.2 2.7-3.4 1.6 2.9 4.3 1.5zM130 178.1l7.4-4.2V170l3.5-6.4 6.9-6.7 3.5-2.5-3-4.2-2.8-3-7.1-.5-4-2.1-9.5 1.6 2.8 6.2-2.5 6.4-2 7-1.1 3.8 6.4 4.7zm134.3 27.3.3-1v-3.2l-2.2-2.1-2.6 1-1.2 4.2.7 3.6 3.1-.4zm23.8 7.5 4.4 6.6 3.4 2.9 5-8 .8-4.9-4.4-.4-4-6.7-4.5-1.7-6.6-5 5.2-3.6-2.7-7.5-2.4-3.3-6.8-3.4-2.9-5.5-5.2 2-.4-4-3.8-4.2-6.2-4.7-2.7 3.7-5.5 2.6.4-6-4.8-10-7.1 4-2.6 7.7-2.2-6 2-6.3-7.2 2.6-2.9 4-2.2 8.4 1 9 4 .1-3 4 2.3 3 4.6 1.2 5.9 2.4 10.2 1.8 5-1 1.6-2.5 2.2 2.8 2.5.5 3 5-1.9 2 5.7 2.6 4.3 3.6 1 2.6.8 3.2-3.6 7-1 3.4 1 2.4-5.8.9-5.3.1-1.8 4.9 2.4 2.2 8-1v-2l4.1 3.2 4.2 3.3-1 1.8 3.4 3 6 3.5 7.6 2.4-.4-2-3-3.7-4-5.4 7.1 5 3.6 1.7 1-4.5-1.9-6.3-1.2-1.7-3.8-3-3-4 .4-3.9zM222.4 51.3l2.3 7.3 5 6 9.8-1.2 6.3 2-4.4 6-2.2-1.7-7.7-.8 1.2 8.4 4 6-.8 5.2-5 3.5-2.3 5.4 4.6 2.7 3.8 8.5-7.5-5.7-1.7 1 1.4 9.4-5.2 2.8.3 5.8 5.3.7 4.2 1.4 8.2-1.8 7.4 3.2 7.5-7.2v-3l-4.9.5-.4-2.8 4-3.9 1.3-5.1 4.3-3.9 2.7-4.7-2.3-7.1 1.9-2.7-3.9-1.9 8.5-1.6 1.9-3 5.8-2.6 4.8-13.5 4.6-5 6.6-11h-6.1l2.5-4.3 6.8-4 6.8-8.9.2-5.7-5.2-6-6-3-7.5-1.8-6-1.5-6.1-1.5-8.1 4-1.5-2.5-8.6 1-5 2.5-3.7 3.7-2.1 11.7-3.1-6-3.5-1.1-4.1 8-5.5 3.3-3.3.7-4.1 3.8.6 6.6zm74.4 265-1-2-1 1.3.6 1.4 3.6 1.7 1-.3 1.4-1.6h-2.6zm-57-77.8.6 1.6 2 .1 3.2-3.3v-1.2h-3.8zm62 66.4-2.8-1.8-3.7-1-1 .3 2.7 2 3.6 1.4 1.3-.1zm25 4.8-.4-2.2-2 .7 1-3.1-2.9-1.3-1.3 1-2.5-1.2 1-1.5-1.9-1-1.8 1.6 1.9-3.9 1.5-2.8.5-1.2-1.3-.2-2.4 1.6-1.8 2.5-2.9 7-2.3 2.5 1.2 1.1-1.7 1.5.4 1.2 5.4.2 3-.3 2.7 1-2 2h1.7l3.3-3.5.7.5-.6 3.4 1.9.8 1.2-.2 1.2-3.6zm-21.2 4.8-2.8 4.5-4.7.6-3.6-2-1-3-.8-4.5 2.6-2.9-2.5-2-4.1.4-6 3.5-4.4 5.5-2.4.6 3.2-3.8 4-5.5 3.6-2 2.4-3 2.9-.3h4.2l6 .9 4.7-.7 3.6-3.6 4.6-1.6 2-1.6 2-1.7-.2-5.2-1-1.8-2.3-.6-1-4-1.9-1.6-4.5-1.3-2.5-2.8-3.7-2.8 1.1-3.2-3-6.3-3.7-6.9-2.2-5-1.9 2.7-2.6 6-4.1 3-2-3.2-2.6-.8-1-7 .2-4.8-5-.4-.9-2.3-3.4-3.5-2.7-2-2.3 1.6-2.9-.6-4.8-1.6-2 1.4 1 9.1 1.2 5.2-3.3 5.7 3.4 4 2 4.5.2 3.4-1.6 3.5-3.2 3.4-4.4 2.3 2 2.6 1.4 7.4-1.5 4.6-2.2 1.5-4.2-4.3-2-5.2-.9-4.7.5-4.2-3-.5-4.7-.3-3-2-3.5-1.4-2-2.4-2.8-2-5.2-2.2-3.9 1-1.3-3.9-1.3-5-4-.9v-6.4l1.2-4.5 3-6.6 3.4-4.9 3.3-.7.2-4 2.2-2.8 4-.4 3.2-4.4.9-2.9 2.7-5.7.8-3.5 3 2.1 3.8-1 5.5-5 .4-3.6-2-4 2-4-.1-3.9-3.8-4-4.1-1.1-4-.6-.1 8.7-2 6.5-3 5.3-2.7-5 .8-5.5-3.3-5-3.8 6v-8l-5.2-1.6 2.5-4-3.8-9.6-2.8-3.9-3.7-1.4-3.4 6.4-.2 9.3 3.3 3.3 3 5-1.3 7.6-2.2-.2-1.8 6v-7l-4.3-2.7-2.5 1.4.3 4.6-4-.1-4.4 1.1-5-3.3-3.1.6-2.8-4.1-2.3-1.9-2.2.8-3.4.4-1.9 2.6 2.9 3.2-3 3.7-3-4.4-2.4 1.3-7.6.8-5-1.6 3.9-3.7-3.8-4-2.8.6-3.8-1.3-6.6-3-4.3-3.3-3.4-.5-1 2.4-3.5 1.3-.3-6.1-3.8 5.5-4.7-7.4-2-.8-.6 3.9-2 1.9-2-3.4-4.6 2-4.2 3.6-4.2-1L95 191l-2.4 3.3-3-.7-4.4-3.8-5.2-2V251l2.7.2 2.8 1.5 2 2.5 2.4 3.6 2.8-3 2.8-1.9 1.5 2.9 1.8 2.2 2.6 2.4 1.8 3.8 2.8 5.9 4.8 3.2v3.1l-1.5 2.4v2.4l3.5 3.5.5 3.8 3.6 2-.4 2.7 1.5 4 5 1.8 2 1.9 5.5 4.2h78v-1.6h1l.5 2.3.8.7 2 .3 2.9.7 2.7 1.3 2.3-.6 3.4 1 1.1-1.6 1.6-.6.7-1 .6-.6 2.6.9h2l.6.6 1 2.4 3 .6-.4 1.2 1.1 1.2-.5 1.6 1.2.5-.6 1.4h.8l.5-.5.5.9 2.1.5h2.2l2.2.4 2.6.8.9 1.3 1.8 3-1 1.3-2.2-.5-1.4-2.5.3 2.5-1.3 2.2.2 1.8-.3 1.1-1.8 1.3-1.3 2-.6 1.4 1.5.2 2-1.2 1.3-1 .9-.2 1.5.4.7-.6 1.4-.5 2.5-.5-.3-1.1h-.1l-.9.2-1.1-.3.8-1.3.9-.5 2-.6 2.3-.5 1.3.7.8-.8.8-.6.6.3 3-2.6 1.2-.8h9.4l.3-1 1-.2 1.1-.6 1-1.8.9-3.2 2.1-3 1 1 1.8-.7 1.3 1.2v5.5l1.8 2.3 3.1-.5 4.5-.1-4.9 3.2.1 3.3 2.2.3 3.1-2.8 2.8-1.6 6.2-2.3 3.5-2.6-1.8-1.5zm-53.7-71.1 1.1-3.2-.7-1.2-1.2-.1-1 1.8-.2.4.8 1.8zm-142.6 36.4 1.5-2.3zm-3.5 3.3-2.6.4-1.4-.7-.1 1.6.5 2 1.4 1.5 1 2.1 1.7 2.1h1.2l-2.5-3.7z",
					onClick: n[96] ||= (t) => e.onClick(t),
					onDblclick: n[97] ||= (t) => e.onDblClick(),
					onMouseenter: n[98] ||= (t) => e.onEnter(t),
					onMouseleave: n[99] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Democratic Republic of Congo",
					class: "CD",
					style: k({ display: e.config.displayPath.CD }),
					d: "m561.7 453.6-.2 3.3 1.2.3-1 1-1 .8-1 1.4-.7 1.3-.1 2.3-.7 1v2.1l-.8.8-.1 1.7-.4.2-.3 1.5.7 1.3.2 3.3.5 2.6-.3 1.5.6 1.6 1.6 1.5 1.5 3.6-1-.3-3.8.5-.8.3-.8 1.8.6 1.3-.5 3.3-.3 2.9.8.5 2 1 .7-.4.2 3h-2.1l-1.2-1.6-1-1.2-2.2-.4-.6-1.5-1.7 1-2.2-.5-1-1.2-1.8-.3h-1.3l-.1-.8h-1l-1.3-.3-1.7.5-1.2-.1-.7.3.1-3.4-1-1-.1-1.8.4-1.7-.6-1v-1.9h-3.4l.2-1h-1.4l-.2.6h-1.7l-.7 1.7-.4.7-1.6-.4-.9.4-1.9.2-1-1.4-.7-1-.8-1.6-.7-2.1h-8.2l-1 .3h-.8l-1.2.3-.4-.9.7-.3.1-1.2.5-.7 1-.6.7.3 1-1h1.5l.2.8 1 .4 1.7-1.7 1.6-1.4.7-.9V471l1.2-2.7 1.2-1.4 1.9-1.3.3-1v-1l.5-1-.1-1.5.3-2.5.6-1.7.8-1.5.2-1.7.2-2 1.1-1.4 1.5-.8 2.4.9 1.7 1 2 .3 2.2.5.8-1.6.4-.2 1.3.2 3.1-1.4 1.1.6h1l.3-.7 1-.3 2.2.3h1.8l1-.2 1.6 2.3 1.3.3.7-.4 1.3.1 1.6-.5.6 1.1z",
					onClick: n[100] ||= (t) => e.onClick(t),
					onDblclick: n[101] ||= (t) => e.onDblClick(),
					onMouseenter: n[102] ||= (t) => e.onEnter(t),
					onMouseleave: n[103] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Central African Republic",
					class: "CF",
					style: k({ display: e.config.displayPath.CF }),
					d: "m518 442.7 2.4-.3.5-.7h.5l.7.7 3.5-1 1.2-1.2 1.5-1-.3-1 .8-.2 2.7.2 2.6-1.3 2-3.1 1.5-1.2 1.8-.5.3 1.3 1.6 1.7v1.2l-.4 1.2.1.8 1 .8 2.1 1.3 1.6 1.1v1l1.9 1.4 1.1 1.2.8 1.7 2 1.1.5.9-1 .3h-1.7l-2.1-.4-1 .3-.5.6-.9.1-1.1-.6-3.1 1.4-1.3-.2-.4.2-.8 1.6-2.1-.5-2-.3-1.9-1-2.3-1-1.5 1-1 1.4-.3 2-1.8-.2-2-.5-1.6 1.5-1.5 2.6-.2-.8-.2-1.3-1.2-1-1-1.4-.3-1-1.4-1.4.3-.8-.3-1.2.2-2.2.7-.5z",
					onClick: n[104] ||= (t) => e.onClick(t),
					onDblclick: n[105] ||= (t) => e.onDblClick(),
					onMouseenter: n[106] ||= (t) => e.onEnter(t),
					onMouseleave: n[107] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Republic of Congo",
					class: "CG",
					style: k({ display: e.config.displayPath.CG }),
					d: "m511.7 476.7-1-1-1 .5-1 1.2-2.3-3 2-1.5-1-1.8 1-.7 1.9-.3.2-1.3 1.5 1.3 2.5.2.9-1.4.3-1.8-.3-2.2-1.3-1.6 1.2-3.2-.7-.6-2.1.2-.8-1.4.2-1.2h3.6l2.2.8 2.3.7.1-1.5 1.5-2.6 1.7-1.5 1.9.5 1.8.1-.2 1.7-.8 1.5-.6 1.7-.3 2.5.1 1.6-.4 1v1l-.4.9-1.9 1.3-1.2 1.4-1.3 2.7.1 2.3-.7 1-1.6 1.3-1.7 1.8-1-.6-.2-.7h-1.5l-1 1z",
					onClick: n[108] ||= (t) => e.onClick(t),
					onDblclick: n[109] ||= (t) => e.onDblClick(),
					onMouseenter: n[110] ||= (t) => e.onEnter(t),
					onMouseleave: n[111] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Switzerland",
					class: "CH",
					style: k({ display: e.config.displayPath.CH }),
					d: "M502.2 312.3v.8l-.4 1 1.3.7 1.4.1-.2 1.7-1.2.7-2.1-.5-.6 1.6-1.3.2-.5-.7-1.6 1.4-1.4.2-1.2-.9-1-1.8-1.3.7v-1.9l2.1-2.3v-1l1.2.4.8-.7h2.4l.5-1z",
					onClick: n[112] ||= (t) => e.onClick(t),
					onDblclick: n[113] ||= (t) => e.onDblClick(),
					onMouseenter: n[114] ||= (t) => e.onEnter(t),
					onMouseleave: n[115] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Côte d'Ivoire",
					class: "CI",
					style: k({ display: e.config.displayPath.CI }),
					d: "M467.2 449.5H466l-2-.6h-1.8l-3.3.6-2 .8-2.7 1h-.6l.2-2.4.3-.3v-1.1l-1.3-1.2-.9-.2-.8-.8.6-1.2-.2-1.4v-.8h.5l.2-1.2-.2-.6.3-.4 1-.3-.7-2.2-.7-1.2.3-1 .5-.2.4-.2.8.4h2.1l.6-.8h.4l.9-.3.4 1.2.6-.3 1.2-.5 1.3.7.5.9 1.2.6 1-.7 1.3-.1 2 .7.7 4-1.2 2.4-.7 3.1 1.2 2.5z",
					onClick: n[116] ||= (t) => e.onClick(t),
					onDblclick: n[117] ||= (t) => e.onDblClick(),
					onMouseenter: n[118] ||= (t) => e.onEnter(t),
					onMouseleave: n[119] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Chile",
					class: "CL",
					style: k({ display: e.config.displayPath.CL }),
					d: "M282.8 636.7v10.6h3l1.7.1-1 2-2.3 1.5-1.4-.1-1.7-.4-2-1.5-3-.7-3.5-2.7-2.8-2.6-3.9-5.2 2.3 1 4 3 3.7 1.8 1.4-2.2 1-3.2 2.5-2zm1.2-112 1 4.2 2-.4.4.7-1 3.2-3 1.5.1 5.1-.6 1 .9 1.3-2 2-1.9 2.9-1 2.9.3 3-1.7 3.4 1.3 5.7.7.6v3.1l-1.6 3.3v2.9l-2 2.3v3.2l.8 3.4-1.7 1.3-.7 3.3-.7 3.7.5 4.5-1.2.8.7 4.4 1.3 1.5-1 1.6 1.3.8.3 1.5-1.2.7.3 2.3-1 5.4-1.5 3.5.3 2.1-.9 2.7-2.1 1.9.3 4.6 1 1.6 1.8-.3v3.3l1.1 2.7 6.8.6 2.6.7h-2.5l-1.3 1-2.6 1.8-.4 4.3-1.2.1-3.2-1.5-3.2-3.2-3.5-2.7-.9-2.8.8-2.7-1.4-3-.3-7.2 1.2-4 3-3.3-4.3-1.2 2.6-3.5 1-6.6 3.1 1.4 1.5-8-2-1-.8 4.8-1.8-.6 1-5.4.9-6.8 1.3-2.5-.9-3.5-.2-4 1.2-.1 1.7-5.6 2-5.4 1.1-5-.6-5 .8-2.6-.3-4 1.6-3.8.6-6 .8-6.4 1-6.8-.3-4.8-.6-4.2 1.5-.7.7-1.5 1.4 2 .4 2 1.4 1.3-.8 2.9z",
					onClick: n[120] ||= (t) => e.onClick(t),
					onDblclick: n[121] ||= (t) => e.onDblClick(),
					onMouseenter: n[122] ||= (t) => e.onEnter(t),
					onMouseleave: n[123] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Cameroon",
					class: "CM",
					style: k({ display: e.config.displayPath.CM }),
					d: "M512 457h-.4l-1.7.3-1.7-.4-1.3.2h-4.6l.4-2.3-1-1.8-1.4-.5-.5-1.2-.7-.4v-.8l.7-2 1.3-2.7h.8l1.7-1.7h1l1.7 1.1 1.9-1 .3-1 .6-1.2.4-1.4 1.5-1.2.6-2 .6-.6.4-1.5.7-1.8 2.4-2.2.1-1 .3-.4-1-1.2v-.9l.8-.1 1.1 1.8.2 1.9-.1 1.9 1.5 2.5h-1.5l-.8.2-1.3-.3-.6 1.4 1.6 1.6 1.3.5.4 1.2.8 1.9-.4.8-1.4 2.8-.7.5-.2 2.2.3 1.2-.2.8 1.3 1.4.2 1 1 1.5 1.3.9.1 1.3.4.8-.2 1.5-2.3-.7-2.2-.7z",
					onClick: n[124] ||= (t) => e.onClick(t),
					onDblclick: n[125] ||= (t) => e.onDblClick(),
					onMouseenter: n[126] ||= (t) => e.onEnter(t),
					onMouseleave: n[127] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "China",
					class: "CN",
					style: k({ display: e.config.displayPath.CN }),
					d: "m784.6 410.4-2.4 1.4-2.3-.9v-2.5l1.3-1.4 3-.8h1.7l.6 1.2-1.2 1.3zM833.2 303l4.9 1.4 3.3 3 1.1 4h4.3l2.4-1.7 4.6-1.2-1.4 3.7-1.1 1.5-1 4.5-1.9 3.9-3.4-.7-2.4 1.4.8 3.3-.4 4.6h-1.5v2l-1.8-2.2-1 2.1-4.4 1.6.4 2-2.4-.1-1.3-1.2-2 2.6-3 2-2.3 2.4-4 1-2 1.7-3 1 1.5-1.7-.6-1.4 2.2-2.4-1.5-2-2.4 1.3-3.2 2.6-1.7 2.3-2.8.2-1.4 1.7 1.5 2.4 2.3.6v1.5l2.3 1 3.1-2.5 2.5 1.4 1.8.1.5 1.8-4 1-1.3 1.9-2.7 1.7-1.5 2.4 3 1.9 1.2 3.3 1.7 3 1.9 2.5v2.5l-1.8.9.6 1.7 1.7 1-.4 2.6-.8 2.5-1.5.3-2 3.4-2.3 4.1-2.6 3.7-4 2.8-3.8 2.6-3.2.3-1.7 1.3-1-1-1.5 1.6-4 1.5-3 .4-.9 3.2-1.5.1-.8-2.1.7-1.2-3.8-1-1.3.6-2.8-.8-1.4-1.2.5-1.8-2.6-.5-1.3-1.2-2.4 1.6-2.7.4h-2.3l-1.5.7-1.4.5.4 3.4h-1.5l-.3-.8V401l-2.1.8-1.2-.5-2.1-1.1.8-2.6-1.8-.5-.6-2.8-3 .5.4-3.7 2.6-2.5.1-2.6v-2.4l-1.3-.8-1-1.8-1.6.2-3-.4 1-1.4-1.3-2-2 1.4-2.4-.8-3.2 2-2.6 2.4-2.2.4-1.3-.9h-1.5l-2-.8-1.5.8-1.8 2.4-.2-2.5-1.8.6-3.2-.3-3.2-.7-2.3-1.4-2.2-.6-.9-1.6-1.6-.4-2.8-2.1-2.3-1-1.1.8-4-2.3-2.7-2-.8-3.7 2 .5.1-1.7-1-1.7.2-2.8-3-4-4.6-1.4-.8-2.6-2.1-1.6-.5-1-.4-2v-1.4l-1.6-.9-1 .4-.7-3.3.8-.8-.4-.9 2.7-1.7 2-.7 3 .4 1-2.3 3.6-.5 1-1.4 4.4-2 .4-1-.2-2 1.9-1-2.5-6.8 5.5-1.6 1.5-.9 2-7.3 5.5 1.4 1.6-1.9.1-4.2 2.4-.3 2.1-2.9 1.1-.3.7 3 2.4 2.2 4 1.5 2 3.4-1.2 4.7 1 1.7 3.4.7 3.8.6 3.4 2.4 1.7.4 1.3 3.6 1.6 2.3 3.1-.1 5.8.8 3.7-.5 2.8.6 4.1 2.3h3.4l1.3 1.1 3.2-2 4.6-1.3 4.2-.1 3.2-1.4 2-2 2-1.3-.4-1.3-1-1.5 1.5-2.5 1.6.3 2.9.8 2.8-2 4.3-1.6 2-2.7 2-1.2 4-.5 2.3.5.3-1.5-2.6-2.9-2.2-1.3-2.2 1.5-2.7-.6-1.6.5-.8-1.7 2-4.2 1.4-3.3 3.4 1.7 4-2.8-.1-2 2.5-4.6 1.6-1.5v-2.5l-1.6-1.1 2.3-2.3 3.5-.9 3.7-.1 4.2 1.4 2.5 1.7 1.7 4.6 1 2 1 2.7z",
					onClick: n[128] ||= (t) => e.onClick(t),
					onDblclick: n[129] ||= (t) => e.onDblClick(),
					onMouseenter: n[130] ||= (t) => e.onEnter(t),
					onMouseleave: n[131] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Colombia",
					class: "CO",
					style: k({ display: e.config.displayPath.CO }),
					d: "m264 463.8-1.3-.7-1.4-.9-.8.5-2.3-.4-.7-1.2h-.5l-2.8-1.6-.4-.8 1-.2-.1-1.4.7-1 1.3-.2 1.2-1.8 1.1-1.4-1-.7.5-1.6-.6-2.6.6-.7-.5-2.4-1.1-1.5.3-1.3 1 .2.5-.9-.7-1.6.4-.5 1.4.1 2.1-2 1.2-.2v-1l.5-2.4 1.6-1.3h1.8l.2-.6 2.2.2 2.2-1.4 1.1-.7 1.4-1.3 1 .1.7.8-.6 1-1.7.4-.8 1.4-1 .9-.9 1-.3 2-.8 1.7 1.5.2.3 1.3.6.6.3 1.1-.4 1 .1.6.7.3.7 1 3.6-.3 1.6.3 2 2.5 1.1-.3 2 .1 1.6-.3 1 .5-.5 1.5-.6 1-.2 2 .5 1.8.8.8.1.6-1.4 1.4 1 .6.8 1 .8 2.8-.5.3-.5-1.6-.8-.9-1 1h-5.4v1.7l1.7.2-.1 1.1-.6-.3-1.6.5v2l1.3 1 .4 1.6v1.2l-1.3 7.7-1.4-1.5h-.9l1.9-3-2.2-1.2-1.7.2-1-.5-1.5.8-2.1-.4-1.7-2.9-1.3-.7-.9-1.3-1.8-1.4z",
					onClick: n[132] ||= (t) => e.onClick(t),
					onDblclick: n[133] ||= (t) => e.onDblClick(),
					onMouseenter: n[134] ||= (t) => e.onEnter(t),
					onMouseleave: n[135] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Costa Rica",
					class: "CR",
					style: k({ display: e.config.displayPath.CR }),
					d: "m242.6 440.4-1.5-.6-.6-.6.4-.5-.1-.6-.8-.7-1.1-.6-1-.3-.2-.9-.7-.5.2.9-.6.6-.6-.7-1-.3-.3-.6v-.9l.4-.9-.8-.3.6-.6.4-.4 1.9.8.6-.4 1 .3.4.5.8.2.7-.6.7 1.6 1 1.1 1.4 1.2-1 .3v1.1l.5.4-.4.4.1.5-.2.5z",
					onClick: n[136] ||= (t) => e.onClick(t),
					onDblclick: n[137] ||= (t) => e.onDblClick(),
					onMouseenter: n[138] ||= (t) => e.onEnter(t),
					onMouseleave: n[139] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Cuba",
					class: "CU",
					style: k({ display: e.config.displayPath.CU }),
					d: "m244.6 397 2.4.2h2.2l2.6 1 1.2 1.1 2.6-.3 1 .7 2.3 1.9 1.8 1.3h1l1.6.6-.2.8 2 .1 2.2 1.3-.4.7-1.8.3-2 .2-1.9-.3-4 .3 2-1.6-1.2-.8-1.8-.2-1-.9-.7-1.7-1.6.2-2.6-.8-.8-.7-3.7-.4-1-.6 1.1-.8-2.7-.1-2 1.5H240l-.4.8-1.4.3-1.2-.3 1.5-.9.6-1 1.3-.7 1.4-.6 2.1-.3z",
					onClick: n[140] ||= (t) => e.onClick(t),
					onDblclick: n[141] ||= (t) => e.onDblClick(),
					onMouseenter: n[142] ||= (t) => e.onEnter(t),
					onMouseleave: n[143] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Cyprus",
					class: "CY",
					style: k({ display: e.config.displayPath.CY }),
					d: "m570.3 358.3 1.9-1.5-2.6 1h-2l-.4.8h-.2l-1.3.2.6 1.3 1.4.5 2.9-1.4v-.3z",
					onClick: n[144] ||= (t) => e.onClick(t),
					onDblclick: n[145] ||= (t) => e.onDblClick(),
					onMouseenter: n[146] ||= (t) => e.onEnter(t),
					onMouseleave: n[147] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Czech Republic",
					class: "CZ",
					style: k({ display: e.config.displayPath.CZ }),
					d: "m522.8 307.9-1.3-.8-1.3.2-2.2-1.3-1 .3-1.5 1.7-2.1-1.3-1.6-1.9-1.4-1-.3-1.8-.5-1.3 2-1 1-1 2-1 .8-.8.7.5 1.3-.4 1.3 1.4 2 .4v1.2l1.4.9.4-1.1 2 .5.2 1.3 2.1.3 1.3 2.1h-.8l-.5.8-.6.2-.2 1-.5.2-.1.4-1 .4h-1.2z",
					onClick: n[148] ||= (t) => e.onClick(t),
					onDblclick: n[149] ||= (t) => e.onDblClick(),
					onMouseenter: n[150] ||= (t) => e.onEnter(t),
					onMouseleave: n[151] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Germany",
					class: "DE",
					style: k({ display: e.config.displayPath.DE }),
					d: "m503 279 .1 1.8 2.9 1.1v1.7l2.8-.9 1.6-1.3 3.1 1.9 1.3 1.5.7 2.4-.8 1.3 1 1.6.7 2.4-.2 1.6 1.2 2.9-1.3.4-.7-.5-.7.9-2 .8-1 1.1-2.1 1 .5 1.3.3 1.8 1.4 1 1.6 1.9-1 2-1 .5.4 2.7-.3.7-.9-.9h-1.3l-2 .7-2.5-.2-.4 1-1.4-1-.9.1-3-1.2-.5.9h-2.4l.3-3 1.5-3-4-.7-1.4-1.1.2-2-.6-1 .3-2.9-.5-4.7h1.7l.7-1.7.7-4.2-.5-1.6.6-1 2.3-.2.5 1 2-2.3-.7-1.8-.1-2.8 2 .7z",
					onClick: n[152] ||= (t) => e.onClick(t),
					onDblclick: n[153] ||= (t) => e.onDblClick(),
					onMouseenter: n[154] ||= (t) => e.onEnter(t),
					onMouseleave: n[155] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Djibouti",
					class: "DJ",
					style: k({ display: e.config.displayPath.DJ }),
					d: "m596 427.7.7.9v1.2l-1.7.7 1.2.7-1 1.6-.6-.5-.7.2h-1.6v-1l-.2-.7 1-1.4.9-1.2 1.2.2z",
					onClick: n[156] ||= (t) => e.onClick(t),
					onDblclick: n[157] ||= (t) => e.onDblClick(),
					onMouseenter: n[158] ||= (t) => e.onEnter(t),
					onMouseleave: n[159] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Denmark",
					class: "DK",
					style: k({ display: e.config.displayPath.DK }),
					d: "m510.8 275.8-1.7 4-2.9-2.8-.4-2 4.1-1.7zm-5-4.2-.6 1.9-.9-.6-2 3.6.8 2.4-1.8.8-2.1-.7-1.2-2.7v-5.1l.4-1.4.8-1.5 2.5-.4 1-1.4 2.2-1.5v2.7l-1 1.7.4 1.4z",
					onClick: n[160] ||= (t) => e.onClick(t),
					onDblclick: n[161] ||= (t) => e.onDblClick(),
					onMouseenter: n[162] ||= (t) => e.onEnter(t),
					onMouseleave: n[163] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Dominican Republic",
					class: "DO",
					style: k({ display: e.config.displayPath.DO }),
					d: "m274.2 407.4.3-.6h2.2l1.7.8h.7l.5 1h1.6l-.1.8 1.2.1 1.4 1.1-1 1.2-1.4-.6h-2.2l-.5.5-1 .2-.5-.8-1 .5-1 2-.8-.5-.1-.8v-.8l-.7-1 .7-.4.2-1.1z",
					onClick: n[164] ||= (t) => e.onClick(t),
					onDblclick: n[165] ||= (t) => e.onDblClick(),
					onMouseenter: n[166] ||= (t) => e.onEnter(t),
					onMouseleave: n[167] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Algeria",
					class: "DZ",
					style: k({ display: e.config.displayPath.DZ }),
					d: "m508.9 396-9.6 5.8-8.1 5.9-4 1.3-3 .3-.1-1.9-1.3-.5-1.8-.8-.6-1.4-9.5-6.6-9.4-6.6-10.6-7.5v-4.6l4.6-2.4 2.8-.5 2.3-.8 1-1.6 3.3-1.3.1-2.4 1.6-.3 1.3-1.2 3.7-.6.5-1.3-.7-.7-1-3.5-.2-2-1-2.2 2.7-2 3-.5 1.8-1.5 2.7-1 4.7-.6 4.7-.3 1.4.5 2.6-1.4h3l1.1.8 2-.2-.6 1.8.4 3.3-.6 2.8-1.7 1.9.2 2.5 2.3 2v.8l1.7 1.3 1.2 5.9 1 2.8.1 1.5-.5 2.6.2 1.4-.4 1.8.3 2-1.1 1.2 1.6 2.3.1 1.3 1 1.7 1.3-.6 2.3 1.5z",
					onClick: n[168] ||= (t) => e.onClick(t),
					onDblclick: n[169] ||= (t) => e.onDblClick(),
					onMouseenter: n[170] ||= (t) => e.onEnter(t),
					onMouseleave: n[171] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Ecuador",
					class: "EC",
					style: k({ display: e.config.displayPath.EC }),
					d: "m250.1 472.9 1.5-2.1-.6-1.2-1 1.3-1.8-1.3.6-.7-.5-2.6 1-.4.5-1.7 1-1.8-.1-1.1 1.5-.7 2-1 2.8 1.5h.5l.7 1.2 2.3.4.8-.5 1.4 1 1.2.6.4 2.1-.9 1.8-3 3-3.4 1-1.7 2.5-.5 1.9-1.6 1.1-1.2-1.4-1.1-.3-1.2.2v-1l.7-.7z",
					onClick: n[172] ||= (t) => e.onClick(t),
					onDblclick: n[173] ||= (t) => e.onDblClick(),
					onMouseenter: n[174] ||= (t) => e.onEnter(t),
					onMouseleave: n[175] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Estonia",
					class: "EE",
					style: k({ display: e.config.displayPath.EE }),
					d: "m543.4 264.7.4-3.1-1 .7-1.9-2-.2-3 3.5-1.6 3.6-.8 3 1 3-.2.3 1-2 3 .9 5-1.2 1.7h-2.3l-2.5-2-1.2-.6z",
					onClick: n[176] ||= (t) => e.onClick(t),
					onDblclick: n[177] ||= (t) => e.onDblClick(),
					onMouseenter: n[178] ||= (t) => e.onEnter(t),
					onMouseleave: n[179] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Egypt",
					class: "EG",
					style: k({ display: e.config.displayPath.EG }),
					d: "m573.2 377.3-.8 1.3-.6 2.4-.8 1.6-.6.6-1-1-1.2-1.5-2-4.5-.3.3 1.1 3.3 1.8 3.2 2 4.9 1.1 1.7 1 1.7 2.4 3.4-.5.5v2l3.3 2.7.5.6h-33.2v-22.4l-.9-2.6.7-2-.4-1.4 1-1.5h3.7l2.7.8 2.8 1 1.3.5 2.2-1 1.1-1 2.5-.3 2 .4.8 1.7.6-1.1 2.3.8 2.2.2 1.3-.9z",
					onClick: n[180] ||= (t) => e.onClick(t),
					onDblclick: n[181] ||= (t) => e.onDblClick(),
					onMouseenter: n[182] ||= (t) => e.onEnter(t),
					onMouseleave: n[183] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Western Sahara",
					class: "EH",
					style: k({ display: e.config.displayPath.EH }),
					d: "M438.6 383h3.6l8.7.1h-12.4l-1.9 3.3-1.8 1.1-1 2-.1 1.6-.8 1.8-.9.5-1.6 2-1 2 .3 1-1 1.7-1 .8-.2 1.4v1.2l.5-1h11l-.5-4.3.7-1.6 2.6-.2-.1-7.9 9.2.2V383z",
					onClick: n[184] ||= (t) => e.onClick(t),
					onDblclick: n[185] ||= (t) => e.onDblClick(),
					onMouseenter: n[186] ||= (t) => e.onEnter(t),
					onMouseleave: n[187] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Eritrea",
					class: "ER",
					style: k({ display: e.config.displayPath.ER }),
					d: "m594 428.2-1-1-1.1-1.6-1.2-1-.8-1-2.4-1.1h-2l-.6-.6-1.7.6-1.7-1.3-.8 2.2-3.3-.6-.3-1.2 1.2-4.2.3-2 .9-.8 2-.5 1.5-1.7 1.6 3.4.8 2.6 1.5 1.5 3.8 2.7 1.6 1.6 1.5 1.7.9 1 1.3.8-.8.7z",
					onClick: n[188] ||= (t) => e.onClick(t),
					onDblclick: n[189] ||= (t) => e.onDblClick(),
					onMouseenter: n[190] ||= (t) => e.onEnter(t),
					onMouseleave: n[191] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Spain",
					class: "ES",
					style: k({ display: e.config.displayPath.ES }),
					d: "M450 334.6v-2.7l-1-1.7 3.9-2.7 3.4.6h3.8l3 .7 2.3-.2 4.5.1 1.1 1.5 5.2 1.7 1-.8 3.2 1.7 3.2-.5.2 2.2-2.7 2.5-3.6.8-.2 1.2-1.7 2-1.1 3 1 2-1.6 1.7-.6 2.3-2 .7-2 2.7H463l-1.7 1.2-1.1 1.3-1.4-.3-1-1.2-.8-2-2.6-.5-.3-1.2 1-1.3.4-1-1-1 .9-2.4-1.2-2.1 1.2-.3.2-1.8.4-.5v-2.9l1.3-1-.7-1.8-1.7-.2-.5.5h-1.6l-.7-1.8-1.2.5z",
					onClick: n[192] ||= (t) => e.onClick(t),
					onDblclick: n[193] ||= (t) => e.onDblClick(),
					onMouseenter: n[194] ||= (t) => e.onEnter(t),
					onMouseleave: n[195] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Ethiopia",
					class: "ET",
					style: k({ display: e.config.displayPath.ET }),
					d: "m581.5 421.2 1.7 1.3 1.7-.6.7.6h1.9l2.4 1.1.8 1 1.2 1 1.1 1.6 1 1-1 1.2-1 1.4.3.8v.8h1.6l.7-.1.6.5-.6 1 1 1.5 1 1.4 1.1 1 9.2 3.3h2.4l-8 8.4-3.6.2-2.5 2h-1.8l-.8.9h-2l-1-1-2.6 1.2-.8 1.2-1.9-.3-.6-.3H582l-3.5-2.3h-2l-1-1v-1.5l-1.4-.5-1.6-3-1.3-.7-.5-1-1.4-1.5-1.7-.2 1-1.6h1.4l.4-.9v-2.5l.8-3 1.3-.8.3-1.2 1.2-2.1 1.7-1.4 1.2-2.9.4-2.4 3.3.6z",
					onClick: n[196] ||= (t) => e.onClick(t),
					onDblclick: n[197] ||= (t) => e.onDblClick(),
					onMouseenter: n[198] ||= (t) => e.onEnter(t),
					onMouseleave: n[199] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Finland",
					class: "FI",
					style: k({ display: e.config.displayPath.FI }),
					d: "m555.4 193.1-.4 5.4 4.3 5-2.6 5.5 3.3 8-2 5.7 2.6 4.9-1.1 4 4.1 4.3-1 3.2-2.6 3.4-6 7.4-5.1.5-5 2-4.5 1.2-1.6-3-2.8-2 .7-5.7-1.4-5.4 1.3-3.5 2.6-4 6.4-7 1.9-1.4-.3-2.8-4-3.2-.9-2.7v-11.2l-4.4-5.1-3.8-3.8 1.7-2.1 3.1 4.1 3.7-.4 3 2 2.7-3.5 1.4-5.9 4.3-2.7 3.6 3.2z",
					onClick: n[200] ||= (t) => e.onClick(t),
					onDblclick: n[201] ||= (t) => e.onDblClick(),
					onMouseenter: n[202] ||= (t) => e.onEnter(t),
					onMouseleave: n[203] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Fiji",
					class: "FJ",
					style: k({ display: e.config.displayPath.FJ }),
					d: "m980.5 508.6-.3 1.4-.3.2-1.7.7-1.8.6-.4-1 1.4-.7 1-.1 1.5-1zm-5.8 4.3-1.3-.3-1 1 .2 1.2 1.6.4 1.7-.4.5-1.5-1-.9z",
					onClick: n[204] ||= (t) => e.onClick(t),
					onDblclick: n[205] ||= (t) => e.onDblClick(),
					onMouseenter: n[206] ||= (t) => e.onEnter(t),
					onMouseleave: n[207] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Falkland Islands",
					class: "FK",
					style: k({ display: e.config.displayPath.FK }),
					d: "m303.7 633.1 3.3-2.7 2.4 1.2 1.7-1.8 2.2 2-.8 1.6-3.8 1.3-1.3-1.6-2.3 2z",
					onClick: n[208] ||= (t) => e.onClick(t),
					onDblclick: n[209] ||= (t) => e.onDblClick(),
					onMouseenter: n[210] ||= (t) => e.onEnter(t),
					onMouseleave: n[211] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "France",
					class: "FR",
					style: k({ display: e.config.displayPath.FR }),
					d: "m502 333.5-.9 3-1.2-.8-.7-2.6.6-1.4 1.8-1.4zm-16.7-33.3 2 2 1.4-.3 2.5 2 .6.4.8-.1 1.3 1 4 .9-1.4 2.9-.3 3-.8.7-1.3-.4.1 1-2 2.3v1.9l1.3-.7 1 1.8-.2 1.1.8 1.5-1 1.3.8 3 1.5.5-.3 1.7-2.6 2.1-5.5-1-4 1.2-.4 2.3-3.2.5-3.2-1.7-1 .8-5.2-1.7-1-1.5 1.4-2.3.5-8-2.9-4.2-2-2-4.4-1.7-.2-3 3.6-1 4.7 1.1-.9-4.8 2.7 1.9 6.5-3.4.8-3.6 2.5-1 .4 1.6 1.3.1z",
					onClick: n[212] ||= (t) => e.onClick(t),
					onDblclick: n[213] ||= (t) => e.onDblClick(),
					onMouseenter: n[214] ||= (t) => e.onEnter(t),
					onMouseleave: n[215] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Gabon",
					class: "GA",
					style: k({ display: e.config.displayPath.GA }),
					d: "m506.4 474.5-3-2.8-1.8-2.3-1.7-3 .1-.8.6-1 .7-2 .6-2 1-.2h4v-3.3l1.3-.2 1.7.4 1.7-.4.3.2-.2 1.2.8 1.4 2-.2.8.6-1.2 3.2 1.3 1.6.3 2.2-.4 1.8-.8 1.4-2.5-.2-1.5-1.3-.2 1.3-1.9.3-1 .7 1 1.8z",
					onClick: n[216] ||= (t) => e.onClick(t),
					onDblclick: n[217] ||= (t) => e.onDblClick(),
					onMouseenter: n[218] ||= (t) => e.onEnter(t),
					onMouseleave: n[219] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "United Kingdom of Great Britain and Northern Ireland",
					class: "GB",
					style: k({ display: e.config.displayPath.GB }),
					d: "m459.4 281-1.5 3.3-2.1-1H454l.6-2.5-.6-2.6 2.4-.2zm7.4-20.8-3 5.8 2.9-.7h3l-.7 4.2-2.5 4.5 3 .3.1.6 2.5 5.8 2 .7 1.7 5.4.8 1.9 3.4.9-.4 2.9-1.4 1.3 1.1 2.3-2.5 2.4h-3.7l-4.8 1.1-1.3-.8-1.9 2-2.6-.5-2 1.7-1.4-.9 4-4.6 2.6-1-4.4-.7-.8-1.8 3-1.4-1.6-2.5.5-3 4.2.3.4-2.7-1.9-3-3.4-.9-.7-1.3 1-2.2-.9-1.4-1.5 2.4-.2-4.8-1.4-2.6 1-5.4 2.2-4.3 2.3.4z",
					onClick: n[220] ||= (t) => e.onClick(t),
					onDblclick: n[221] ||= (t) => e.onDblClick(),
					onMouseenter: n[222] ||= (t) => e.onEnter(t),
					onMouseleave: n[223] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Greenland",
					class: "GL",
					style: k({ display: e.config.displayPath.GL }),
					d: "m344.1 24 9.4-13.7 9.9 1 3.6-8.9 9.9-2.4 22.4 3.2 17.5 18.5-5.2 8.3-10.7 1-15 2 1.3 3.6 10-2.2 8.4 7 5.4-6.2 2.4 7.1-3.1 11 7.1-7 13.6-7.5 8.4 3.8 1.6 8.2-11.4 12.6-1.6 4-9 2.8 6.5.8-3.2 11.5L420 92v15.2l3.5 8.4-4.4.5-4.6 3.9 5.1 6.3.7 9.6-3 1 3.6 9.2-6.2.7 3.3 4.1-1 3.6-4 1.5h-3.8l3.5 6.5v4.1l-5.5-3.8-1.5 2.5 3.8 2.3 3.7 5.4 1 7-5 1.6-2.1-3.3-3.5-5 1 6-3.3 4.3 7.4.4 3.9.4-7.5 7-7.7 6.2-8.1 2.6h-3.1l-3 3-3.8 7.5-6 5-2 .2-3.7 1.7-4 1.6-2.5 4.1v4.6l-1.4 4.1-4.6 5 1.1 4.7-1.2 4.8-1.5 5.6-4 .3-4-4.6h-5.7l-2.7-3.2-1.9-5.8-4.8-7.7-1.4-4.1-.4-6-4-6.2 1.1-5.2-1.9-2.5 2.8-8.6 4.2-2.9 1.1-3.2.6-6.3-3.2 2.9-1.5 1.1-2.5 1.2-3.5-2.6-.2-5.6 1.1-4.5h2.6l5.8 2.2-4.9-5.5-2.5-3-2.8 1.3-2.3-2.2 3.1-8.5-1.7-3.6-2.2-6.7-3.4-10.9-3.5-4.2V133l-7.5-6.7-6-.8-7.5.4-6.8.9-3.3-3.8-4.8-7.6 7.3-4 5.7-.7-12-3.3-6.4-5.5.4-5.3 10.6-6.9 10.3-7.1 1-5.7-7.5-5.7 2.5-6.7 9.7-12.3 4-2-1.1-8.6 6.6-5.2 8.7-3.2 8.6-.2 3 6.3L334 28l6.7 7.8 3.9 1.6 5.8 6.4-6.6-10.8z",
					onClick: n[224] ||= (t) => e.onClick(t),
					onDblclick: n[225] ||= (t) => e.onDblClick(),
					onMouseenter: n[226] ||= (t) => e.onEnter(t),
					onMouseleave: n[227] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Georgia",
					class: "GE",
					style: k({ display: e.config.displayPath.GE }),
					d: "m591.8 335.9.4-1.6-.7-2.6-1.6-1.4-1.6-.5-1-1.1.3-.5 2.4.7 4.1.6 3.8 1.8.5.7 1.7-.6 2.6.8.9 1.6 1.8.8-.8.5 1.4 2-.4.5-1.5-.2-2-1-.7.5-4 .6-2.6-1.8z",
					onClick: n[228] ||= (t) => e.onClick(t),
					onDblclick: n[229] ||= (t) => e.onDblClick(),
					onMouseenter: n[230] ||= (t) => e.onEnter(t),
					onMouseleave: n[231] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "French Guiana",
					class: "GF",
					style: k({ display: e.config.displayPath.GF }),
					d: "m327.9 456.4-1 1-1.4.3-.4-.8-.6-.1-.9.7-1.2-.5.7-1.2.2-1.3.5-1.2-1-1.6-.3-2 1.5-2.4 1 .3 2 .7 3 2.4.4 1.1-1.7 2.6z",
					onClick: n[232] ||= (t) => e.onClick(t),
					onDblclick: n[233] ||= (t) => e.onDblClick(),
					onMouseenter: n[234] ||= (t) => e.onEnter(t),
					onMouseleave: n[235] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Ghana",
					class: "GH",
					style: k({ display: e.config.displayPath.GH }),
					d: "m478.2 446.8-4.4 1.7-1.5 1-2.6.8-2.5-.8.2-1.1-1.2-2.5.7-3.1 1.2-2.4-.8-4-.4-2.1.1-1.6 4.9-.2 1.2.2 1-.4 1.2.2-.2.9 1.2 1.5v2l.3 2.2.6 1-.6 2.6.3 1.4.7 1.8z",
					onClick: n[236] ||= (t) => e.onClick(t),
					onDblclick: n[237] ||= (t) => e.onDblClick(),
					onMouseenter: n[238] ||= (t) => e.onEnter(t),
					onMouseleave: n[239] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Gambia",
					class: "GM",
					style: k({ display: e.config.displayPath.GM }),
					d: "m428 426.4.4-1.2 3-.1.7-.7h.9l1 .7h1l.9-.5.5.8-1.2.7H434l-1.2-.7-1 .7h-.5l-.7.4z",
					onClick: n[240] ||= (t) => e.onClick(t),
					onDblclick: n[241] ||= (t) => e.onDblClick(),
					onMouseenter: n[242] ||= (t) => e.onEnter(t),
					onMouseleave: n[243] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Guinea",
					class: "GN",
					style: k({ display: e.config.displayPath.GN }),
					d: "m451.6 442-.8-.2-.6 1.2h-.8l-.5-.6.2-1.2-1.2-1.7-.7.3h-.6l-.8.3v-1l-.4-.8v-.8l-.5-1.2-.8-1h-2.3l-.6.5h-.8l-.5.7-.3.8-1.5 1.2-1.2-1.7-1.1-1-.7-.4-.7-.6-.3-1.3-.5-.6-.8-.5 1.3-1.3h.8l.8-.5h.6l.4-.4-.2-.9.3-.3v-1h1.4l2 .8.6-.1.2-.3 1.6.2.4-.2.1 1.1h.5l.7-.4.5.1.8.7 1.1.3.8-.7 1-.3.6-.4h.6l.6.7.3.8 1.2 1.1-.6.8-.1.9.6-.3.3.3-.1.9.8.8-.5.2-.2 1 .6 1.1.7 2.3-1 .4-.3.3.2.6-.2 1.2z",
					onClick: n[244] ||= (t) => e.onClick(t),
					onDblclick: n[245] ||= (t) => e.onDblClick(),
					onMouseenter: n[246] ||= (t) => e.onEnter(t),
					onMouseleave: n[247] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Equatorial Guinea",
					class: "GQ",
					style: k({ display: e.config.displayPath.GQ }),
					d: "m501.9 460.6-.6-.5 1-3h4.6v3.3h-4z",
					onClick: n[248] ||= (t) => e.onClick(t),
					onDblclick: n[249] ||= (t) => e.onDblClick(),
					onMouseenter: n[250] ||= (t) => e.onEnter(t),
					onMouseleave: n[251] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Greece",
					class: "GR",
					style: k({ display: e.config.displayPath.GR }),
					d: "m541.7 356.7 1.5 1.2 2.2-.2 2.1.2v.6l1.5-.4-.4 1-4 .3v-.5l-3.4-.7zm8.1-21-.8 2.4-.7.4-1.7-.1-1.5-.4-3.4 1 2 2-1.4.6h-1.6l-1.5-1.8-.5.8.6 2.1 1.4 1.7-1 .8 1.5 1.7 1.4 1v2l-1.3-1.1-1.2.2.8 1.8-1 .2-1-.7 1.3 4h-.6l-.5-1.3h-.5l-.3 1.3-.4-.3v-.8l-.5-1h-.6v.8l-.2.3-.6-.5-.4-1 .5-.6-.3-.8-.4-.3-.4-.1-.5-1 .5-.5.4-.5.6.1.2-.4.6-.1.7.4.5.2.4-.6-1-.1-.5-.2-1.2.3h-1.2l-1.1-1.6-.2-.3.2-.6-1.5-1.1-.2-1 1.3-1.8.2-1.2 1-.6v-1l1.8-.3 1-.8 1.6.1.5-.6.5-.2 2 .1 2.3-1 2 1.3 2.5-.3v-1.9z",
					onClick: n[252] ||= (t) => e.onClick(t),
					onDblclick: n[253] ||= (t) => e.onDblClick(),
					onMouseenter: n[254] ||= (t) => e.onEnter(t),
					onMouseleave: n[255] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Guatemala",
					class: "GT",
					style: k({ display: e.config.displayPath.GT }),
					d: "m222.6 424.8-1.4-.6h-1.7l-1.3-.6-1.5-1.2v-.8l.4-.7-.4-.5 1.3-2.4h3.6v-1l-.4-.1-.3-.7-1-.6-1-1h1.2v-1.7h5.2v2.4l-.2 3.3h.8l1 .5.2-.5.8.4-1.3 1.1-1.3.8-.2.6.2.5-.6.8-.6.1.1.4-.5.3-1 .7z",
					onClick: n[256] ||= (t) => e.onClick(t),
					onDblclick: n[257] ||= (t) => e.onDblClick(),
					onMouseenter: n[258] ||= (t) => e.onEnter(t),
					onMouseleave: n[259] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Guinea-Bissau",
					class: "GW",
					style: k({ display: e.config.displayPath.GW }),
					d: "m432.8 432.4-1.5-1.1-1.2-.2-.6-.8v-.5l-.8-.6-.2-.6 1.5-.5 1 .1.7-.3 5.1.1v1l-.3.3.2 1-.4.3h-.6l-.8.5h-.8z",
					onClick: n[260] ||= (t) => e.onClick(t),
					onDblclick: n[261] ||= (t) => e.onDblClick(),
					onMouseenter: n[262] ||= (t) => e.onEnter(t),
					onMouseleave: n[263] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Guyana",
					class: "GY",
					style: k({ display: e.config.displayPath.GY }),
					d: "m307.7 440 1.8 1 1.8 1.9v1.4h1.1l1.5 1.4 1.1 1-.4 2.5-1.7.8.1.6-.5 1.5 1.3 2h.8l.4 1.6 1.7 2.4h-.7l-1.5-.1-1 .7-1.2.5-.9.1-.3.6-1.4-.2-1.7-1.3-.2-1.3-.7-1.4.4-2.4.8-1-.6-1.2-1-.5.4-1.2-.7-.6H305l-2-2 .8-.8v-1.3l1.7-.5.7-.5-1-1 .3-1z",
					onClick: n[264] ||= (t) => e.onClick(t),
					onDblclick: n[265] ||= (t) => e.onDblClick(),
					onMouseenter: n[266] ||= (t) => e.onEnter(t),
					onMouseleave: n[267] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Honduras",
					class: "HN",
					style: k({ display: e.config.displayPath.HN }),
					d: "m230.4 426.9-.5-.9-.8-.2.2-1.2-.4-.3-.6-.2-1.2.3-.1-.3-.8-.5-.6-.6-.9-.2.6-.8-.2-.5.2-.6 1.3-.8 1.3-1h.3l.6-.5h.8l.3.2.4-.1 1.3.2h1.3l.9-.4.3-.3 1 .2.6.2.7-.1.6-.3 1.3.4.4.1.9.5.8.7 1 .4.7.8h-1l-.3.4-1 .3h-.7l-.6.4-.6-.1-.5-.5-.3.1-.3.7h-.3v.6l-1 .8-.5.3-.3.4-.8-.6-.7.8H232v1.4h-.3l-.4.7z",
					onClick: n[268] ||= (t) => e.onClick(t),
					onDblclick: n[269] ||= (t) => e.onDblClick(),
					onMouseenter: n[270] ||= (t) => e.onEnter(t),
					onMouseleave: n[271] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Croatia",
					class: "HR",
					style: k({ display: e.config.displayPath.HR }),
					d: "m528 319 .7 1.5 1 1.1-1.2 1.5-1.2-.9h-2l-2.4-.6-1.3.1-.6.8-1-.9-.6 1.7 1.4 1.8.6 1.2 1.3 1.5 1 .8 1.1 1.6 2.5 1.5-.3.6-2.6-1.4-1.7-1.4-2.5-1.1-2.4-2.9.6-.3-1.3-1.6v-1.4l-1.9-.6-.8 1.7-.9-1.3.1-1.4h.1l2 .1.5-.7 1 .7h1v-1l1-.5.3-1.6 2.2-1 .9.4 2 1.8 2.4.7z",
					onClick: n[272] ||= (t) => e.onClick(t),
					onDblclick: n[273] ||= (t) => e.onDblClick(),
					onMouseenter: n[274] ||= (t) => e.onEnter(t),
					onMouseleave: n[275] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Haiti",
					class: "HT",
					style: k({ display: e.config.displayPath.HT }),
					d: "M270 406.8h1.8l2.4.6.2 1.6-.2 1-.7.6.8.9-.1.8-1.9-.5-1.3.2-1.7-.2-1.3.5-1.5-1 .2-.9 2.6.5 2.1.2 1-.7-1.2-1.2V408l-1.8-.4z",
					onClick: n[276] ||= (t) => e.onClick(t),
					onDblclick: n[277] ||= (t) => e.onDblClick(),
					onMouseenter: n[278] ||= (t) => e.onEnter(t),
					onMouseleave: n[279] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Hungary",
					class: "HU",
					style: k({ display: e.config.displayPath.HU }),
					d: "m520.7 315.1 1-2.6-.6-1h1.5l.3-1.6 1.4 1 1 .5 2.4-.5.2-.9 1.1-.1 1.4-.6.3.2 1.3-.5.7-1 .9-.2 3 1.2.6-.4 1.5 1.1.2 1.2-1.7.8-1.3 2.8-1.7 2.8-2.2.8-1.8-.2-2.2 1-1 .6-2.3-.7-2.1-1.8-.9-.5-.6-1.3z",
					onClick: n[280] ||= (t) => e.onClick(t),
					onDblclick: n[281] ||= (t) => e.onDblClick(),
					onMouseenter: n[282] ||= (t) => e.onEnter(t),
					onMouseleave: n[283] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Indonesia",
					class: "ID",
					style: k({ display: e.config.displayPath.ID }),
					d: "m813.7 492-1.2.1-3.7-2 2.6-.5 1.5.8 1 .9zm10.4-.2-2.4.6-.3-.3.3-1 1.2-1.7 2.7-1.1.3.5v.9zm-18.3-5.8 1 .8 1.8-.3.7 1.2-3.3.6-2 .4h-1.4l1-1.7h1.5zm14 0-.3 1.6-4.3.8-3.7-.4v-1l2.2-.6 1.8.8 1.9-.2zm-40-3.7 5.4.3.6-1.2 5.2 1.4 1 1.8 4.2.5 3.5 1.7-3.2 1-3.1-1h-2.5l-3-.2-2.6-.5-3.2-1-2-.4-1.2.4-5.2-1.2-.4-1.2-2.6-.2 1.9-2.7 3.4.2 2.3 1 1.1.3zm73.2-1.6-1.4 2-.3-2.2.5-1 .6-1 .6.9zm-21-7.7-1 1-2-.6-.5-1.2h2.8zm9-1 1.1 2.1-2.4-1.1-2.3-.2-1.6.1h-2l.7-1.6 3.5-.1zm10.4-5.4.8 4.5 2.8 1.7 2.4-3 3.2-1.7h2.5l2.4 1 2 1 3 .5.1 9.1v9.2l-2.4-2.3-2.9-.6-.7.8-3.5.1 1.2-2.3 1.8-.8-.8-3-1.3-2.4-5.5-2.3-2.3-.3-4.2-2.6-.8 1.4-1 .3-.7-1v-1.3l-2.2-1.3 3-1h2l-.2-.7H846l-1.1-1.7-2.5-.5-1.2-1.4 3.8-.7 1.4-.9 4.5 1.2zm-25-7.2-2.2 2.8-2.2.5-2.7-.5-4.6.1-2.5.4-.4 2.1 2.5 2.5 1.5-1.2 5.3-1-.3 1.3-1.2-.4-1.2 1.6-2.5 1.1 2.7 3.6-.5 1 2.5 3.1v1.9l-1.5.8-1.1-1 1.3-2.3-2.7 1.1-.7-.8.3-1-2-1.7.2-2.7-1.8.9.2 3.2.1 4-1.8.4-1.2-.8.8-2.6-.4-2.7h-1.2l-.8-1.9 1.1-1.8.4-2.2 1.4-4.2.6-1.2 2.4-2 2.2.8 3.5.4 3.2-.2 2.8-2zm9.7.8-.2 2.5-1.4-.3-.4 1.7 1.1 1.5-.8.3-1.1-1.8-.8-3.5.5-2.3 1-1 .1 1.5 1.7.3zm-30.3-2 3.1 2.7-3.3.3-1 1.9.2 2.5-2.7 2-.1 2.7-1 4.3-.5-1-3.2 1.2-1-1.7-2-.1-1.5-1-3.3 1-1-1.3-1.9.2-2.3-.3-.4-3.8-1.4-.8-1.4-2.3-.4-2.5.4-2.6 1.6-1.8.5 1.9 2 1.5 1.7-.5 1.8.2 1.7-1.5 1.3-.2 2.6.8 2.3-.6 1.5-3.9 1-1 1-3.1h3.2l2.5.4-1.6 2.6 2 2.6zM772 479.8h-3.1l-2.4-2.3-3.6-2.2-1.2-1.7-2.1-2.3-1.4-2.1-2.2-3.9-2.4-2.3-.8-2.4-1-2.2-2.6-1.7-1.5-2.4-2-1.6-3-3-.2-1.5 1.8.1 4.3.6 2.5 2.7 2.2 1.9 1.5 1.2 2.7 3h2.8l2.4 1.9 1.6 2.3 2.1 1.3-1 2.3 1.5 1h1l.5 2 1 1.5 2 .3 1.4 1.7-.7 3.5z",
					onClick: n[284] ||= (t) => e.onClick(t),
					onDblclick: n[285] ||= (t) => e.onDblClick(),
					onMouseenter: n[286] ||= (t) => e.onEnter(t),
					onMouseleave: n[287] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Ireland",
					class: "IE",
					style: k({ display: e.config.displayPath.IE }),
					d: "m457.9 284.3.4 3.3-2 4.2-5 2.6-4-.6 2.3-4.8-1.5-4.8 3.8-3.7 2.1-2.3.6 2.6-.6 2.6h1.8z",
					onClick: n[288] ||= (t) => e.onClick(t),
					onDblclick: n[289] ||= (t) => e.onDblClick(),
					onMouseenter: n[290] ||= (t) => e.onEnter(t),
					onMouseleave: n[291] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Israel",
					class: "IL",
					style: k({ display: e.config.displayPath.IL }),
					d: "m575.4 366.8-.5 1-1-.4-.6 2.2.7.4-.7.4-.1.9 1.3-.5v1.3l-1.3 5.2-1.9-5.6.8-1-.1-.2.7-1.6.6-2.5.4-.8h1l.2-.6h.8v1.3z",
					onClick: n[292] ||= (t) => e.onClick(t),
					onDblclick: n[293] ||= (t) => e.onDblClick(),
					onMouseenter: n[294] ||= (t) => e.onEnter(t),
					onMouseleave: n[295] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "India",
					class: "IN",
					style: k({ display: e.config.displayPath.IN }),
					d: "m693.5 357.4 3 4-.3 2.8 1.1 1.7v1.7l-2-.5.7 3.7 2.8 2 3.9 2.3-1.8 1.4-1 3 2.6 1.2 2.7 1.6 3.6 1.8 3.9.4 1.6 1.6 2.2.3 3.3.7h2.4l.3-1.3-.4-2 .2-1.4 1.7-.6.3 2.5v.6l2.6 1.2 1.8-.5 2.3.2h2.3l.2-2-1.1-1 2.2-.4 2.6-2.4 3.2-2 2.4.8 2-1.4 1.3 2-1 1.4 3 .4.3 1.2-1 .6.2 2-2-.6-3.6 2.1v1.8l-1.5 2.6-.1 1.5-1.3 2.5-2.2-.7v3.2l-.7 1 .3 1.3-1.4.7-1.5-4.8h-.8l-.4 2-1.5-1.6.8-1.7 1.3-.2 1.3-2.6-1.6-.6-2.7.1-2.6-.4-.3-2.2-1.3-.1-2.2-1.4-1 2.1 2 1.7-1.7 1.1-.7 1.1 1.8.9-.5 1.8 1 2.3.4 2.5-.4 1h-2l-3.4.6.2 2.3-1.5 1.8-4 2-3.2 3.4-2.1 1.9-2.8 1.9v1.3l-1.4.7-2.5 1-1.3.2-.9 2.2.6 3.8.2 2.3-1.2 2.8v4.8l-1.5.1-1.3 2.2.9.9-2.6.8-1 2-1 .7-2.7-2.6-1.3-4-1-2.8-1-1.4-1.5-2.7-.7-3.6-.5-1.8-2.6-4-1.1-5.6-.9-3.8v-3.5l-.5-2.8-4 1.8-2-.4-3.7-3.6 1.3-1.1-.8-1.2-3.3-2.6 1.9-2h6.2l-.6-2.7-1.6-1.5-.3-2.4-1.8-1.4 3-3.3 3.3.2 3-3.3 1.7-3.2 2.7-3.3v-2.3l2.4-2-2.3-1.6-1-2.2-1-3 1.4-1.4 4.3.8 3-.5z",
					onClick: n[296] ||= (t) => e.onClick(t),
					onDblclick: n[297] ||= (t) => e.onDblClick(),
					onMouseenter: n[298] ||= (t) => e.onEnter(t),
					onMouseleave: n[299] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Iraq",
					class: "IQ",
					style: k({ display: e.config.displayPath.IQ }),
					d: "m602.6 355.8 1.8 1 .3 2-1.5 1.2-.6 2.6 2 3.2 3.4 1.8 1.4 2.5-.4 2.4h.9v1.7l1.5 1.7-1.6-.1-2-.3-2 3-5.2-.2-7.9-6.5-4.2-2.3-3.4-.9-1-4 6.1-3.5 1-4.1-.2-2.5 1.6-.9 1.4-2.2 1.2-.5 3.3.4 1 1 1.3-.7z",
					onClick: n[300] ||= (t) => e.onClick(t),
					onDblclick: n[301] ||= (t) => e.onDblClick(),
					onMouseenter: n[302] ||= (t) => e.onEnter(t),
					onMouseleave: n[303] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Iran",
					class: "IR",
					style: k({ display: e.config.displayPath.IR }),
					d: "m626.4 351.5 2.5-.6 2-2h1.9l1.2-.6 2 .3 3.1 1.8 2.2.4 3.2 3 2.1.2.3 2.9-1.2 4.3-.7 2.4 1.2.5-1.2 1.8 1 2.7.1 2 2.1.6.3 2.1-2.6 3 1.4 1.6 1.2 2 2.6 1.3.1 2.8 1.3.5.3 1.5-4 1.6-1.1 3.6-5.3-1-3-.7-3.2-.4-1.2-3.8-1.4-.6-2.1.6-2.8 1.5-3.5-1-2.8-2.4-2.7-1-1.9-3-2-4.2-1.5.5-1.8-1-1 1.2-1.6-1.7v-1.7h-1l.5-2.4-1.4-2.5-3.5-1.8-2-3.2.7-2.6 1.5-1.2-.3-2-1.8-1-1.8-4.2-1.5-2.8.5-1-.9-4.2 2-1 .4 1.3 1.4 1.7 2 .5 1-.1 3.3-2.7 1-.3.8 1.1-1 1.8 1.8 1.8.7-.1.9 2.6 2.7.7 2 1.8 3.9.6 4.4-1z",
					onClick: n[304] ||= (t) => e.onClick(t),
					onDblclick: n[305] ||= (t) => e.onDblClick(),
					onMouseenter: n[306] ||= (t) => e.onEnter(t),
					onMouseleave: n[307] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Iceland",
					class: "IS",
					style: k({ display: e.config.displayPath.IS }),
					d: "m434.6 212.4-.7 4.5 3.2 4.6-3.7 5-8 4.4-2.5 1.2-3.6-1-7.9-2 2.8-2.8-6.1-3.2 5-1.3-.2-2-5.8-1.6 1.8-4.4 4.3-1 4.4 4.6 4.2-3.7 3.6 2 4.5-3.8z",
					onClick: n[308] ||= (t) => e.onClick(t),
					onDblclick: n[309] ||= (t) => e.onDblClick(),
					onMouseenter: n[310] ||= (t) => e.onEnter(t),
					onMouseleave: n[311] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Italy",
					class: "IT",
					style: k({ display: e.config.displayPath.IT }),
					d: "m518.8 347.9-1 2.8.4 1-.6 1.8-2.2-1.3-1.4-.4-3.9-1.7.4-1.9 3.3.4 2.8-.4zM501 337l1.7 2.6-.4 4.8-1.3-.2-1.1 1.2-1.1-1-.1-4.4-.6-2 1.5.1zm8.8-21.6 4 1-.2 2 .6 1.7-2.2-.6-2.3 1.4.2 2-.4 1.1 1 2 2.6 2 1.4 3.2 3.1 3h2.2l.7.8-.8.8 2.5 1.3 2 1.1 2.5 2 .3.6-.5 1.3-1.6-1.7-2.4-.6-1.2 2.4 2 1.3-.3 2-1.2.1-1.5 3-1.2.4v-1l.6-2 .6-.7-1-2.1-1-1.8-1-.5-1-1.6-1.7-.6-1.2-1.5-2.1-.3-2.2-1.6-2.5-2.5-2-2.2-.8-3.8-1.4-.4-2.3-1.3-1.3.5-1.6 1.8-1.2.3.3-1.7-1.5-.5-.7-3 1-1.2-.9-1.5.2-1.2 1.2.9 1.3-.2 1.6-1.4.5.7 1.3-.1.6-1.7 2 .5 1.3-.6.3-1.7 1.7.6.3-.8 2.8-.7z",
					onClick: n[312] ||= (t) => e.onClick(t),
					onDblclick: n[313] ||= (t) => e.onDblClick(),
					onMouseenter: n[314] ||= (t) => e.onEnter(t),
					onMouseleave: n[315] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Jamaica",
					class: "JM",
					style: k({ display: e.config.displayPath.JM }),
					d: "m257.8 411 1.8.2 1.5.7.5.8h-2l-.8.6-1.6-.5-1.6-1 .3-.7 1.2-.2z",
					onClick: n[316] ||= (t) => e.onClick(t),
					onDblclick: n[317] ||= (t) => e.onDblClick(),
					onMouseenter: n[318] ||= (t) => e.onEnter(t),
					onMouseleave: n[319] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Jordan",
					class: "JO",
					style: k({ display: e.config.displayPath.JO }),
					d: "m575 367.9.4-1 3.1 1.2 5.5-3.5 1.1 4-.5.5-5.6 1.7 2.8 3.2-1 .6-.4 1-2.1.5-.7 1.2-1.2 1-3.1-.6-.1-.4 1.4-5.2-.1-1.3.4-1z",
					onClick: n[320] ||= (t) => e.onClick(t),
					onDblclick: n[321] ||= (t) => e.onDblClick(),
					onMouseenter: n[322] ||= (t) => e.onEnter(t),
					onMouseleave: n[323] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Japan",
					class: "JP",
					style: k({ display: e.config.displayPath.JP }),
					d: "m852.8 362 .3 1.2-1.6 2-1.1-1-1.4.7-.8 2-1.8-1v-1.6l1.5-2 1.6.4 1.2-1.4zm17.7-10.3-1 2.8.5 1.7-1.5 2.5-3.6 1.6-5 .2-4 3.8-1.8-1.3-.1-2.5-4.9.8-3.3 1.5-3.3.1 2.9 2.5-2 5.6-1.7 1.3-1.4-1.2.7-3-1.8-1-1.1-2.2 2.7-1 1.4-2.2 2.8-1.7 2.1-2.3 5.6-1 3 .6 3-6.1 1.8 1.6 4-3.5 1.7-1.4 1.7-4.3-.4-4.1 1.1-2.4 3-.6 1.6 5-.1 3-2.6 3.6zm8.3-25.9 2 .8 2-1.6.5 4.3-4.1 1-2.5 3.8-4.4-2.5-1.5 4-3.1.1-.4-3.7 1.4-3 3-.1.8-5.4.8-3.1 3.3 4.1z",
					onClick: n[324] ||= (t) => e.onClick(t),
					onDblclick: n[325] ||= (t) => e.onDblClick(),
					onMouseenter: n[326] ||= (t) => e.onEnter(t),
					onMouseleave: n[327] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Kenya",
					class: "KE",
					style: k({ display: e.config.displayPath.KE }),
					d: "m590.2 465.8 1.6 2.3-2 1-.6 1.3-1 .2-.5 2-.9 1-.5 1.9-1.1 1-4-2.9-.2-1.6-10.2-5.7-.5-.3v-3l.8-1 1.4-1.9 1-2-1.2-3.2-.4-1.4-1.3-2 1.7-1.6 2-1.9 1.4.5v1.6l1 .9h1.9l3.5 2.4h1.6l.6.2 1.9.3.8-1.2 2.6-1.2 1 1h2l-2.4 3.1z",
					onClick: n[328] ||= (t) => e.onClick(t),
					onDblclick: n[329] ||= (t) => e.onDblClick(),
					onMouseenter: n[330] ||= (t) => e.onEnter(t),
					onMouseleave: n[331] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Kyrgyzstan",
					class: "KG",
					style: k({ display: e.config.displayPath.KG }),
					d: "m674.2 333.1.6-1.7 1.9-.5 4.6 1.3.4-2.2 1.6-.8 4 1.6 1-.4h4.7l4.2.5 1.4 1.3 1.7.6-.4.8-4.4 2-1 1.6-3.6.4-1 2.3-3-.4-2 .7-2.7 1.7.4.9-.8.8-5.3.5-3.4-1.1-3 .2.2-2 3 .6 1-1.2 2.2.4 3.6-2.7-3.3-2-2 1-2.1-1.4 2.3-2.4z",
					onClick: n[332] ||= (t) => e.onClick(t),
					onDblclick: n[333] ||= (t) => e.onDblClick(),
					onMouseenter: n[334] ||= (t) => e.onEnter(t),
					onMouseleave: n[335] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Cambodia",
					class: "KH",
					style: k({ display: e.config.displayPath.KH }),
					d: "m765.4 433.6-1.1-1.5-1.4-3-.7-3.4 1.8-2.3 3.6-.6 2.7.4 2.3 1.1 1.3-2 2.4 1.1.7 2-.4 3.4-4.7 2.1 1.3 1.8-3 .2-2.4 1.1z",
					onClick: n[336] ||= (t) => e.onClick(t),
					onDblclick: n[337] ||= (t) => e.onDblClick(),
					onMouseenter: n[338] ||= (t) => e.onEnter(t),
					onMouseleave: n[339] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "North Korea",
					class: "KP",
					style: k({ display: e.config.displayPath.KP }),
					d: "m841.6 332.6.3.7-1-.2-1.2 1.2-.9 1.3.1 2.7-1.4.8-.5.6-1 1.1-2 .6-1.2 1v1.6l-.4.4 1.1.6 1.6 1.5-.4.9-1.2.2-2 .2-1 1.6-1.3-.1-.2.3-1.3-.7-.4.7-.8.3v-.7l-.8-.3-.8-.6.8-1.6.7-.4-.3-.6.7-2-.2-.6-1.6-.4-1.3-1 2.3-2.3 3-2 2-2.6 1.3 1.2 2.4.1-.4-2 4.3-1.6 1.1-2.1z",
					onClick: n[340] ||= (t) => e.onClick(t),
					onDblclick: n[341] ||= (t) => e.onDblClick(),
					onMouseenter: n[342] ||= (t) => e.onEnter(t),
					onMouseleave: n[343] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "South Korea",
					class: "KR",
					style: k({ display: e.config.displayPath.KR }),
					d: "m835.1 346.5 2.4 4.2.7 2.3v4l-1 1.8-2.5.7-2.3 1.4-2.5.3-.3-1.8.5-2.6-1.2-3.6 2-.6-1.9-3 .2-.3h1.3l1-1.5 2-.2 1.2-.2z",
					onClick: n[344] ||= (t) => e.onClick(t),
					onDblclick: n[345] ||= (t) => e.onDblClick(),
					onMouseenter: n[346] ||= (t) => e.onEnter(t),
					onMouseleave: n[347] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Kuwait",
					class: "KW",
					style: k({ display: e.config.displayPath.KW }),
					d: "m609.8 375.8.6 1.4-.3.7.9 2.4h-2l-.7-1.4-2.5-.3 2-3.1z",
					onClick: n[348] ||= (t) => e.onClick(t),
					onDblclick: n[349] ||= (t) => e.onDblClick(),
					onMouseenter: n[350] ||= (t) => e.onEnter(t),
					onMouseleave: n[351] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Kazakhstan",
					class: "KZ",
					style: k({ display: e.config.displayPath.KZ }),
					d: "m674.2 333.1-1.6.7-3.7 2.6-1.2 2.7h-1l-.8-1.8h-3.6l-.6-3.1h-1.3l.2-3.9-3.4-2.8-4.8.3-3.3.6-2.6-3.5-2.3-1.5-4.4-2.8-.5-.4-7.2 2.4v14.1l-1.4.2-2-3-1.8-1-3.2.8-1.2 1.2-.2-.9.7-1.6-.5-1.3-3.3-1.3-1.3-3.4-1.5-1-.1-1.3 2.7.4.1-3 2.4-.6 2.5.6.5-3.9-.5-2.5-2.8.2-2.4-1-3.3 1.8-2.6.9-1.4-.7.3-2.1-1.8-2.8-2 .2-2.5-2.9 1.7-3.2-.9-.9 2.3-4.7 2.9 2.5.3-3.2 5.8-4.8 4.4-.2 6.2 3.1 3.3 1.8 3-1.9h4.4l3.6 2.3.8-1.4 4 .2.6-2-4.5-3.2 2.7-2.2-.5-1.2 2.6-1.2-2-3.2 1.3-1.7L658 282l1.4-1.2 7-1.8 2.5-2 5 1 1 5 2.9-1.1 3.6 1.6-.3 2.6 2.7-.3 7-4.5-1 1.5 3.6 3.7 6.3 11.6 1.5-2.4 3.8 2.6 4-1.2 1.6.8 1.3 2.6 2 .8 1.2 1.9 3.6-.6 1.5 2.6-2.1 2.9-2.4.4-.1 4.1-1.6 1.9-5.5-1.4-2 7.3-1.5.9-5.5 1.6 2.5 6.7-2 1 .3 2.2-1.7-.6-1.4-1.3-4.2-.4-4.6-.1-1 .4-4-1.6-1.7.8-.4 2.2-4.6-1.3-1.9.6z",
					onClick: n[352] ||= (t) => e.onClick(t),
					onDblclick: n[353] ||= (t) => e.onDblClick(),
					onMouseenter: n[354] ||= (t) => e.onEnter(t),
					onMouseleave: n[355] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Lao People's Democratic Republic",
					class: "LA",
					style: k({ display: e.config.displayPath.LA }),
					d: "m770.3 423.2.9-1.3.1-2.4-2.3-2.6-.1-2.8-2.2-2.4-2-.2-.7 1h-1.6l-.8-.4-3 1.7v-2.6l.6-3.1-1.9-.1-.1-1.8-1.2-1 .6-1 2.4-2 .2.7 1.5.1-.4-3.4 1.4-.5 1.7 2.4 1.2 2.7h3.5l1 2.6-1.7.8-.8 1 3.3 1.8 2.4 3.5 1.7 2.6 2.1 2 .8 2-.6 3-2.4-1.1-1.3 2z",
					onClick: n[356] ||= (t) => e.onClick(t),
					onDblclick: n[357] ||= (t) => e.onDblClick(),
					onMouseenter: n[358] ||= (t) => e.onEnter(t),
					onMouseleave: n[359] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Lebanon",
					class: "LB",
					style: k({ display: e.config.displayPath.LB }),
					d: "M575.7 365h-.8l-.2.6h-1l1-2.8 1.4-2.4 1.4.1.4 1.3-1.5 1.3z",
					onClick: n[360] ||= (t) => e.onClick(t),
					onDblclick: n[361] ||= (t) => e.onDblClick(),
					onMouseenter: n[362] ||= (t) => e.onEnter(t),
					onMouseleave: n[363] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Sri Lanka",
					class: "LK",
					style: k({ display: e.config.displayPath.LK }),
					d: "m704.6 442.4-.5 2.9-1.1.8-2.5.6-1.3-2.2-.5-4 1.3-4.6 2 1.6 1.2 2z",
					onClick: n[364] ||= (t) => e.onClick(t),
					onDblclick: n[365] ||= (t) => e.onDblClick(),
					onMouseenter: n[366] ||= (t) => e.onEnter(t),
					onMouseleave: n[367] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Liberia",
					class: "LR",
					style: k({ display: e.config.displayPath.LR }),
					d: "M453.6 451.2h-.7L450 450l-2.5-2.1-2.4-1.6-2-1.8.8-.9.1-.8 1.3-1.5 1.3-1.3h.6l.7-.4 1.2 1.7-.2 1.2.5.6h.8l.6-1.2.8.1-.1.8.2 1.4-.6 1.2.8.8 1 .2 1.1 1.2.1 1-.3.4z",
					onClick: n[368] ||= (t) => e.onClick(t),
					onDblclick: n[369] ||= (t) => e.onDblClick(),
					onMouseenter: n[370] ||= (t) => e.onEnter(t),
					onMouseleave: n[371] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Lesotho",
					class: "LS",
					style: k({ display: e.config.displayPath.LS }),
					d: "m556.5 547.8 1 1-.9 1.5-.5 1-1.5.5-.5 1-1 .4-2.1-2.5 1.5-2 1.5-1.3 1.3-.6z",
					onClick: n[372] ||= (t) => e.onClick(t),
					onDblclick: n[373] ||= (t) => e.onDblClick(),
					onMouseenter: n[374] ||= (t) => e.onEnter(t),
					onMouseleave: n[375] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Lithuania",
					class: "LT",
					style: k({ display: e.config.displayPath.LT }),
					d: "m539 282-.2-1.1.3-1.4-1.3-.7-3-.9-.5-4.1 3.2-1.6 4.7.3 2.8-.5.4 1 1.4.4 2.7 2.4.3 2.2-2.3 1.6-.6 2.7-3 1.8H541l-.7-1.5z",
					onClick: n[376] ||= (t) => e.onClick(t),
					onDblclick: n[377] ||= (t) => e.onDblClick(),
					onMouseenter: n[378] ||= (t) => e.onEnter(t),
					onMouseleave: n[379] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Luxembourg",
					class: "LU",
					style: k({ display: e.config.displayPath.LU }),
					d: "m492.2 301.3.6 1-.2 1.9h-.8l-.6-.3.3-2.4z",
					onClick: n[380] ||= (t) => e.onClick(t),
					onDblclick: n[381] ||= (t) => e.onDblClick(),
					onMouseenter: n[382] ||= (t) => e.onEnter(t),
					onMouseleave: n[383] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Latvia",
					class: "LV",
					style: k({ display: e.config.displayPath.LV }),
					d: "M534.3 273.8v-3.9l1.5-3.2 2.6-1.8 2.2 3.9 2.3-.1.5-4 2.4-1 1.2.7 2.5 2h2.3l1.3 1.2.3 2.5.9 3-3 1.9-1.8.8-2.7-2.4-1.4-.3-.4-1-2.8.4-4.7-.3z",
					onClick: n[384] ||= (t) => e.onClick(t),
					onDblclick: n[385] ||= (t) => e.onDblClick(),
					onMouseenter: n[386] ||= (t) => e.onEnter(t),
					onMouseleave: n[387] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Libya",
					class: "LY",
					style: k({ display: e.config.displayPath.LY }),
					d: "m516.9 398-2 1-1.6-1.6-4.4-1.3-1.2-2-2.2-1.4-1.4.6-1-1.7v-1.3l-1.7-2.3 1.1-1.3-.2-2 .3-1.7-.2-1.4.5-2.6-.1-1.5-1-2.8 1.4-.8.3-1.3-.4-1.4 2-1.2.8-1.1 1.4-1 .2-2.5 3.3 1.2 1.1-.3 2.4.5 3.7 1.5 1.3 3 2.5.6 4 1.3 3 1.6 1.3-.8 1.4-1.5-.7-2.5 1-1.6 2-1.6 1.9-.4 3.8.7 1 1.4h1l.8.6 2.8.4.7 1-1 1.6.4 1.4-.7 2 .9 2.6v28.4H542v1.2l-11.2-5.7-11.2-5.7z",
					onClick: n[388] ||= (t) => e.onClick(t),
					onDblclick: n[389] ||= (t) => e.onDblClick(),
					onMouseenter: n[390] ||= (t) => e.onEnter(t),
					onMouseleave: n[391] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Morocco",
					class: "MA",
					style: k({ display: e.config.displayPath.MA }),
					d: "M451 383.1v-3.7l4.5-2.4 2.8-.5 2.3-.8 1-1.6 3.3-1.3.1-2.4 1.6-.3 1.3-1.2 3.7-.6.5-1.3-.7-.7-1-3.5-.2-2-1-2.2H468l-3-.8-2.6.2-1.7-1.5h-2l-1 2.1-1.8 3.5-2.1 1.4-2.8 1.6-1.8 2.2-.4 1.7-1 2.9.6 4-2.3 2.7-1.4.8-2.2 2.2-2.6.3-1.3 1.2h12.3-12.3z",
					onClick: n[392] ||= (t) => e.onClick(t),
					onDblclick: n[393] ||= (t) => e.onDblClick(),
					onMouseenter: n[394] ||= (t) => e.onEnter(t),
					onMouseleave: n[395] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Moldova",
					class: "MD",
					style: k({ display: e.config.displayPath.MD }),
					d: "m549.9 309.5.7-.7 1.8-.4 2 1.3 1.2.2 1.3 1.1-.2 1.4 1 .7.4 1.7 1 1-.2.6.5.5-.7.3-1.7-.2-.2-.5-.6.3.2.7-.8 1.3-.5 1.4-.7.4-.5-1.8.3-1.7v-1.8l-1.7-2.5-.9-1.7-.9-1.2z",
					onClick: n[396] ||= (t) => e.onClick(t),
					onDblclick: n[397] ||= (t) => e.onDblClick(),
					onMouseenter: n[398] ||= (t) => e.onEnter(t),
					onMouseleave: n[399] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Montenegro",
					class: "ME",
					style: k({ display: e.config.displayPath.ME }),
					d: "m530.8 332.2-.2-.7-1.2 1.9.2 1.2-.6-.3-.8-1.2-1.2-.8.3-.6.4-2.1 1-1 .4-.3.8.7.4.5 1 .4 1 .8-.2.3-.6.9z",
					onClick: n[400] ||= (t) => e.onClick(t),
					onDblclick: n[401] ||= (t) => e.onDblClick(),
					onMouseenter: n[402] ||= (t) => e.onEnter(t),
					onMouseleave: n[403] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Madagascar",
					class: "MG",
					style: k({ display: e.config.displayPath.MG }),
					d: "m614.2 498.4.7 1.2.7 1.9.5 3.5.7 1.3-.3 1.4-.5.9-1-1.7-.5.8.6 2.2-.3 1.2-.8.7-.1 2.4-1.1 3.5-1.4 4-1.8 5.7-1 4.2-1.3 3.6-2.3.7-2.4 1.3-1.6-.8-2.3-1-.7-1.7-.2-2.7-1-2.4-.3-2.2.5-2.1 1.3-.6v-1l1.4-2.2.2-1.9-.6-1.4-.6-1.9-.2-2.6 1-1.7.4-1.8 1.4-.1 1.5-.6 1-.6h1.3l1.6-1.6 2.3-1.8.9-1.5-.4-1.2 1.2.4 1.5-2v-1.7l1-1.3z",
					onClick: n[404] ||= (t) => e.onClick(t),
					onDblclick: n[405] ||= (t) => e.onDblClick(),
					onMouseenter: n[406] ||= (t) => e.onEnter(t),
					onMouseleave: n[407] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Macedonia",
					class: "MK",
					style: k({ display: e.config.displayPath.MK }),
					d: "M533 334.7h.3l.2-.8 1.6-.6.6-.1 1-.2h1.3l1.4 1.1.2 2.5-.5.1-.5.7-1.5-.1-1 .8-2 .3-1-.9-.5-1.6z",
					onClick: n[408] ||= (t) => e.onClick(t),
					onDblclick: n[409] ||= (t) => e.onDblClick(),
					onMouseenter: n[410] ||= (t) => e.onEnter(t),
					onMouseleave: n[411] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Mali",
					class: "ML",
					style: k({ display: e.config.displayPath.ML }),
					d: "m441.1 422.2 1-.5.4-1.7h1l1.9.7 1.6-.5 1 .2.5-.7h11.2l.7-2-.5-.4-1.4-12.7-1.3-13 4.3-.1 9.4 6.6 9.5 6.6.6 1.4 1.8.8 1.3.5v1.9l3.1-.3v6.8l-1.5 1.9-.2 1.8-2.5.4-3.9.3-1 1-1.8.1h-1.8l-.7-.5-1.5.4-2.7 1.2-.5.9-2.2 1.3-.3.7-1.2.6-1.4-.4-.7.7-.5 2-2.2 2.3v1l-.7 1.2.2 1.6-1.2.5-.6.3-.4-1.2-.9.3h-.4l-.6.8h-2l-.8-.4-.4.2-.8-.8.1-.9-.3-.3-.6.3v-1l.7-.7-1.2-1.1-.3-.8-.6-.7h-.6l-.7.4-.9.3-.7.7-1.2-.3-.8-.7h-.5l-.7.3h-.5l-.1-1 .1-1-.2-1-1-.9-.6-1.6z",
					onClick: n[412] ||= (t) => e.onClick(t),
					onDblclick: n[413] ||= (t) => e.onDblClick(),
					onMouseenter: n[414] ||= (t) => e.onEnter(t),
					onMouseleave: n[415] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Myanmar",
					class: "MM",
					style: k({ display: e.config.displayPath.MM }),
					d: "m754.4 406-1.7 1.2-2 .2-1.2 3.2-1.2.5 1.3 2.6 1.8 2 1.2 2-1 2.5-1 .6.6 1.4 2 2.3.2 1.6v1.3l1 2.6-1.5 2.7-1.3 2.9-.3-2.1.9-2.2-1-1.7.3-3-1.2-1.6-.9-3.4-.5-3.7-1.2-2.4-1.9 1.5-3.1 2-1.6-.2-1.8-.7 1-3.6-.6-2.7-2.2-3.4.4-1-1.7-.5-2-2.4-.1-2.4 1 .5v-2.2l1.4-.7-.3-1.3.6-1 .1-3.2 2.2.7 1.3-2.5.1-1.5 1.5-2.6v-1.8l3.6-2.1 2 .5-.2-1.9 1-.6-.3-1.2 1.7-.2 1 1.9 1.1.7.1 2.4v2.6l-2.7 2.5-.4 3.7 3-.5.6 2.8 1.8.6-.8 2.5 2 1.1 1.3.6 2-1 .2 1.3-2.4 2-.6 1z",
					onClick: n[416] ||= (t) => e.onClick(t),
					onDblclick: n[417] ||= (t) => e.onDblClick(),
					onMouseenter: n[418] ||= (t) => e.onEnter(t),
					onMouseleave: n[419] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Mongolia",
					class: "MN",
					style: k({ display: e.config.displayPath.MN }),
					d: "m721.3 304.9 3-.8 5.3-3.7 4.3-2 2.4 1.3h3l1.8 2 2.8.2 4 1.1 2.8-3-1.2-2.6 3-4.7 3 2 2.6.4 3.3 1.2.6 3.3 4 1.8 2.6-.8 3.5-.5 2.9.5 2.7 2.1 1.7 2.2h2.6l3.5.7 2.6-1 3.7-.8 4.1-3 1.7.4 1.5 1.5 3.3-.4-1.4 3.3-2 4.2.8 1.7 1.6-.5 2.7.6 2.2-1.5 2.2 1.3 2.6 3-.3 1.4-2.2-.5-4.1.5-2 1.2-2 2.7-4.3 1.5-2.8 2.1-2.9-.8-1.6-.4-1.4 2.6.9 1.5.4 1.3-2 1.3-2 2-3.2 1.3-4.2.2-4.6 1.3-3.2 2-1.3-1.1H765l-4.1-2.3-2.8-.6-3.7.5-5.8-.8h-3.1l-1.6-2.2-1.3-3.6-1.7-.4-3.4-2.5-3.8-.5-3.4-.7-1-1.7 1.1-4.7-2-3.4-4-1.5-2.3-2.2z",
					onClick: n[420] ||= (t) => e.onClick(t),
					onDblclick: n[421] ||= (t) => e.onDblClick(),
					onMouseenter: n[422] ||= (t) => e.onEnter(t),
					onMouseleave: n[423] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Mauritania",
					class: "MR",
					style: k({ display: e.config.displayPath.MR }),
					d: "m441.1 422.2-1.8-2-1.7-2-1.9-.9-1.3-.8h-1.6l-1.4.6-1.3-.2-1 1-.2-1.6.7-1.5.4-2.7-.3-3-.4-1.4.3-1.5-.7-1.4-1.5-1.3.6-1h11l-.5-4.3.7-1.6 2.6-.2-.1-7.9 9.2.2V384l10.6 7.5h-4.3l1.3 13.1 1.4 12.7.5.3-.7 2-11.2.1-.4.7-1.1-.2-1.6.5-2-.8-.9.1-.4 1.7z",
					onClick: n[424] ||= (t) => e.onClick(t),
					onDblclick: n[425] ||= (t) => e.onDblClick(),
					onMouseenter: n[426] ||= (t) => e.onEnter(t),
					onMouseleave: n[427] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Malawi",
					class: "MW",
					style: k({ display: e.config.displayPath.MW }),
					d: "m572.2 495.7-.8 2.2.8 3.7h1l1 .8 1.1 2.1.3 3.8-1.3.6-.8 2-1.9-1.8-.1-2 .5-1.4-.1-1.2-1.1-.7-.8.3-1.6-1.4-1.5-.7.9-2.7.8-1-.5-2.4.6-2.3.4-.7-.7-2.4-1.3-1.3 2.8.5.5.8 1 1.3z",
					onClick: n[428] ||= (t) => e.onClick(t),
					onDblclick: n[429] ||= (t) => e.onDblClick(),
					onMouseenter: n[430] ||= (t) => e.onEnter(t),
					onMouseleave: n[431] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Mexico",
					class: "MX",
					style: k({ display: e.config.displayPath.MX }),
					d: "m202.9 388.7-1.1 2.7-.5 2.2-.2 4.1-.3 1.5.5 1.6.9 1.5.6 2.3 1.8 2.2.7 1.7 1 1.5 3 .8 1.2 1.2 2.5-.9 2-.2 2.2-.6 1.8-.5 1.7-1.2.7-1.7.2-2.5.5-.9 2-.8 2.9-.6h2.5l1.7-.2.6.6v1.5l-1.6 1.7-.6 1.9.5.5-.4 1.2-.7 2.3-.7-.7H227l-1 1.8-.5-.3-.3.1v.5H220v1.6h-1.3l1 1 1.1.6.3.7.5.1-.1 1H218l-1.3 2.4.4.5-.4.7v.8l-3.2-3-1.5-1-2.2-.8-1.6.3-2.3 1-1.4.3-2-.7-2-.6-2.7-1.3-2-.4-3.3-1.4-2.3-1.4-.7-.8-1.6-.1-2.8-1-1.2-1.3-3-1.7-1.4-1.8-.7-1.5 1-.3-.4-.8.7-.8v-1l-1-1.4-.2-1.2-1-1.5-2.4-3-2.8-2.4-1.4-2-2.4-1.2-.5-.7.4-2-1.4-.7-1.7-1.5-.7-2.2-1.5-.3-1.6-1.6-1.3-1.6-.1-1-1.6-2.4-1-2.5.1-1.2-2-1.3-1 .1-1.6-.9-.4 1.4.4 1.5.3 2.4 1 1.4 2 2.2.5.7.5.3.3 1h.5l.6 2 .8.9.6 1 1.8 1.7 1 2.8.8 1.4.7 1.4.2 1.7h1.3l1.2 1.4 1 1.4v.6l-1.3 1h-.5l-.7-1.8-1.8-1.7-2-1.5-1.5-.8.1-2.2-.4-1.7-1.4-1-1.9-1.4-.4.4-.7-.8-1.7-.7-1.6-1.9.2-.2 1.1.2 1-1.2.2-1.4-2.2-2.3-1.6-.9-1-2-1.1-2.1-1.3-2.6-1.2-3 3.2-.2 3.6-.4-.3.6 4.3 1.6 6.4 2.4h7.8V370h4.8l1 1.1 1.5 1 1.6 1.5 1 1.7.7 1.8 1.4 1 2.3.9 1.8-2.6h2.3l2 1.3 1.4 2.2 1 1.8 1.6 1.8.6 2.2.8 1.5 2.2 1 2 .6z",
					onClick: n[432] ||= (t) => e.onClick(t),
					onDblclick: n[433] ||= (t) => e.onDblClick(),
					onMouseenter: n[434] ||= (t) => e.onEnter(t),
					onMouseleave: n[435] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Malaysia",
					class: "MY",
					style: k({ display: e.config.displayPath.MY }),
					d: "m758.7 446 .2 1.5 1.8-.3 1-1.2.6.3 1.6 1.7 1.2 1.9.2 1.8-.3 1.3.2 1 .3 1.6 1 .8 1 2.4v1l-2 .2-2.6-2-3.4-2.3-.3-1.4-1.6-1.9-.4-2.3-1-1.5.3-2-.6-1.3.5-.5zm49.1 4.9-2 1-2.4-.5H800l-1 3.1-1 1-1.5 3.9-2.3.6-2.6-.8-1.3.2-1.7 1.5-1.8-.2-1.8.5-1.9-1.5-.5-1.9 2 1 2.3-.6.5-2.3 1.2-.5 3.4-.6 2-2.3 1.4-1.7 1.3 1.4.5-1 1.4.2.1-1.8.2-1.4 2.1-2 1.4-2.1h1.2l1.4 1.4.1 1.2 1.9.8 2.3.8-.2 1.1-1.9.2z",
					onClick: n[436] ||= (t) => e.onClick(t),
					onDblclick: n[437] ||= (t) => e.onDblClick(),
					onMouseenter: n[438] ||= (t) => e.onEnter(t),
					onMouseleave: n[439] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Mozambique",
					class: "MZ",
					style: k({ display: e.config.displayPath.MZ }),
					d: "m572.2 495.7 2-.2 3.4.8.8-.4h2l1-1 1.6.1 3-1 2.3-1.7.5 1.3-.2 2.8.4 2.5v4.5l.6 1.4-.9 2-1 2-1.8 1.8-2.6 1.1-3.1 1.5-3.2 3.1-1.1.6-2 2-1.1.7-.2 2.1 1.3 2.3.5 1.8v.9l.6-.2-.1 3-.5 1.4.7.5-.4 1.3-1.2 1-2.3 1.1-3.4 1.7-1.2 1.1.2 1.3.7.2-.2 1.7h-2.1l-.3-1.4-.4-1.4-.2-1.1.5-3.5-.7-2.1-1.4-4.3 3-3.4.7-2.2.4-.2.3-1.8-.4-.9.1-2.1.6-2v-3.8l-1.5-1-1.3-.1-.6-.7-1.3-.7-2.4.1-.2-1-.2-2.1 8.5-2.4 1.6 1.4.8-.3 1 .7.2 1.2-.5 1.3.1 2 1.9 1.9.8-2 1.3-.6-.3-3.8-1.2-2-1-1h-1l-.7-3.6z",
					onClick: n[440] ||= (t) => e.onClick(t),
					onDblclick: n[441] ||= (t) => e.onDblClick(),
					onMouseenter: n[442] ||= (t) => e.onEnter(t),
					onMouseleave: n[443] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Namibia",
					class: "NA",
					style: k({ display: e.config.displayPath.NA }),
					d: "m521 546.5-2-2.4-1.1-2.2-.6-3-.7-2.3-1-4.7v-3.7l-.4-1.6-1-1.3-1.5-2.4-1.5-3.6-.6-1.8-2.3-3-.2-2.2 1.4-.5 1.7-.5h1.8l1.7 1.4.4-.2 11.4-.1 1.9 1.4 6.8.4 5.1-1.2 2.3-.7 1.9.2 1 .6v.3l-1.5.6h-.9l-1.7 1.2-1.1-1.2-4.3 1-2.1.1-.1 10.6H531v20.5l-2.5 1.6-1.5.2-1.7-.6-1.3-.2-.5-1.4-1-.8z",
					onClick: n[444] ||= (t) => e.onClick(t),
					onDblclick: n[445] ||= (t) => e.onDblClick(),
					onMouseenter: n[446] ||= (t) => e.onEnter(t),
					onMouseleave: n[447] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "New Caledonia",
					class: "NC",
					style: k({ display: e.config.displayPath.NC }),
					d: "m940 523.5 2.4 1.8 1.4 1.4-1 .8-1.6-.9-2-1.3-1.8-1.6-1.8-2.1-.4-1h1.2l1.6 1 1.2 1z",
					onClick: n[448] ||= (t) => e.onClick(t),
					onDblclick: n[449] ||= (t) => e.onDblClick(),
					onMouseenter: n[450] ||= (t) => e.onEnter(t),
					onMouseleave: n[451] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Niger",
					class: "NE",
					style: k({ display: e.config.displayPath.NE }),
					d: "M481.3 429.9v-2l-3.2-.6v-1.4l-1.6-1.9-.4-1.3.2-1.4h1.8l1-1.1 3.9-.3 2.4-.4.3-1.8 1.5-2V409l4-1.3 8-5.9 9.7-5.7 4.4 1.3 1.6 1.7 2-1.2.7 4.7 1 .8v1l1.2 1-.6 1.2-1 6-.2 3.8-3.6 2.7-1.2 3.8 1.2 1.1v1.9h1.8l-.3 1.4-.8.1v1h-.6l-1.9-3.1-.7-.2-2.1 1.6-2.2-.8-1.5-.1-.8.3h-1.7l-1.6 1.2h-1.5l-3.4-1.4-1.3.7h-1.4l-1-1.2-2.9-1-3 .3-.7.6-.4 1.7-.8 1.1-.2 2.6-2.2-1.7h-1z",
					onClick: n[452] ||= (t) => e.onClick(t),
					onDblclick: n[453] ||= (t) => e.onDblClick(),
					onMouseenter: n[454] ||= (t) => e.onEnter(t),
					onMouseleave: n[455] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Nigeria",
					class: "NG",
					style: k({ display: e.config.displayPath.NG }),
					d: "m499 450-2.8 1h-1l-1.2.6-2.2-.1-1.5-1.7-1-2-2-2-2 .1h-2.5l.2-4.5-.1-1.8.5-1.8.9-.8 1.3-1.8-.2-.7.5-1.2-.6-1.7v-1l.3-2.5.8-1.1.4-1.7.7-.6 3-.3 2.8 1 1 1.1h1.5l1.3-.6 3.4 1.5 1.5-.1 1.6-1.2h1.7l.8-.4 1.5.2 2.1.9 2.2-1.7.7.2 1.9 3.1h.5l1.1 1-.3.6-.1 1-2.4 2.1-.7 1.8-.4 1.5-.6.6-.6 2-1.5 1.2-.4 1.4-.7 1.1-.2 1.2-2 1-1.5-1.2h-1l-1.7 1.7h-.9l-1.3 2.7z",
					onClick: n[456] ||= (t) => e.onClick(t),
					onDblclick: n[457] ||= (t) => e.onDblClick(),
					onMouseenter: n[458] ||= (t) => e.onEnter(t),
					onMouseleave: n[459] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Nicaragua",
					class: "NI",
					style: k({ display: e.config.displayPath.NI }),
					d: "m235 432.3-1-.9-1.3-1.1-.7-1-1.2-.9-1.4-1.3.3-.4.5.4.2-.2.9-.1.3-.7h.5l-.1-1.4h1.3l.5-.8.9.6.3-.4.5-.3 1-.8v-.6h.3l.3-.7h.3l.5.4.6.1.6-.4h.7l1-.3.4-.4h1l-.3.3-.2.7.3 1-.6 1-.3 1.1-.1 1.3.1.7.1 1.3-.4.3-.3 1.2.2.8-.6.7.2.8.4.4-.7.6-.8-.2-.5-.5-.9-.3-.6.4-1.8-.8z",
					onClick: n[460] ||= (t) => e.onClick(t),
					onDblclick: n[461] ||= (t) => e.onDblClick(),
					onMouseenter: n[462] ||= (t) => e.onEnter(t),
					onMouseleave: n[463] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Netherlands",
					class: "NL",
					style: k({ display: e.config.displayPath.NL }),
					d: "m492.3 286 2.3.1.5 1.6-.7 4.2-.7 1.7H492l.5 4.7-1.5-1-1.8-2-2.6 1-2-.4 1.4-1.2 2.4-6.8z",
					onClick: n[464] ||= (t) => e.onClick(t),
					onDblclick: n[465] ||= (t) => e.onDblClick(),
					onMouseenter: n[466] ||= (t) => e.onEnter(t),
					onMouseleave: n[467] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Norway",
					class: "NO",
					style: k({ display: e.config.displayPath.NO }),
					d: "m554.2 175.6 8.8 6.3-3.6 2.2 3 5-4.7 3.3-2.3.7 1.2-5.6-3.6-3.2-4.3 2.7-1.4 5.9-2.7 3.4-3-1.8-3.6.3-3.2-4.1-1.6 2-1.8.4-.4 5-5.3-1.1-.7 4.2h-2.7l-1.9 5.2-2.8 7.9-4.3 9.5 1 2.2-1 2.5h-2.7l-1.9 5.8.2 8 1.8 3-1 6.8-2.3 3.8-1.2 3.1-1.9-3.3-5.5 6.3-3.8 1.2-3.8-2.7-1-5.9-1-13.2 2.6-3.9 7.4-5.2 5.6-6.6 5.1-9.3 6.8-13.7 4.7-5.7 7.7-9.9 6.1-3.6 4.6.5 4.3-7 5.1.3z",
					onClick: n[468] ||= (t) => e.onClick(t),
					onDblclick: n[469] ||= (t) => e.onDblClick(),
					onMouseenter: n[470] ||= (t) => e.onEnter(t),
					onMouseleave: n[471] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Nepal",
					class: "NP",
					style: k({ display: e.config.displayPath.NP }),
					d: "m722.3 382.5-.2 1.3.4 2-.3 1.2h-2.4l-3.3-.6-2.2-.3-1.6-1.6-3.9-.4-3.6-1.8-2.7-1.6-2.7-1.2 1.1-3 1.8-1.4 1.1-.8 2.3 1 2.8 2.1 1.6.5 1 1.5 2.1.6 2.3 1.4 3.2.7z",
					onClick: n[472] ||= (t) => e.onClick(t),
					onDblclick: n[473] ||= (t) => e.onDblClick(),
					onMouseenter: n[474] ||= (t) => e.onEnter(t),
					onMouseleave: n[475] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "New Zealand",
					class: "NZ",
					style: k({ display: e.config.displayPath.NZ }),
					d: "m960.4 588.6.6 1.6 2-1.5.8 1.5v1.6l-1 1.7-1.8 2.8-1.5 1.6 1 1.8h-2.1l-2.4 1.5-.8 2.6-1.6 4-2.2 1.9-1.4 1.1h-2.5l-1.9-1.4-3-.3-.5-1.5 1.5-3 3.6-3.8 1.8-.7 2-1.5 2.4-2 1.7-2 1.2-2.8 1-1 .5-2 2-1.7zm4.4-17 2 3.7.1-2.4 1.3 1 .4 2.6 2.3 1.2 1.9.2 1.6-1.3 1.4.4-.7 3.1-.8 2.1H972l-.7 1 .2 1.6-.4.7-1 2-1.4 2.5-2.2 1.5-.5-1-1.2-.5 1.7-3-1-2-3-1.5.1-1.3 2-1.3.5-2.7-.1-2.3-1.2-2.4.1-.6-1.3-1.4-2.2-3-1.2-2.4 1-.3 1.6 1.9 2.2.9z",
					onClick: n[476] ||= (t) => e.onClick(t),
					onDblclick: n[477] ||= (t) => e.onDblClick(),
					onMouseenter: n[478] ||= (t) => e.onEnter(t),
					onMouseleave: n[479] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Oman",
					class: "OM",
					style: k({ display: e.config.displayPath.OM }),
					d: "m640.3 403.2-1 2-1.3-.1-.6.7-.5 1.5.4 2-.3.3h-1.3l-1.7 1.1-.3 1.4-.6.7h-1.8l-1 .7v1.2l-1.4.8-1.6-.3-1.8 1-1.3.1-1-2-2.2-4.8 8.5-3 1.8-6-1.3-2.1.1-1.2.8-1.3v-1.2l1.3-.6-.5-.5.2-2h1.5l1.2 2.1 1.6 1.1 2 .4 1.7.6 1.3 1.7.7 1 1 .4v.7l-1 1.8-.4.8zm-7-14.6-.3.6-.5-1 .8-1.1.3.2z",
					onClick: n[480] ||= (t) => e.onClick(t),
					onDblclick: n[481] ||= (t) => e.onDblClick(),
					onMouseenter: n[482] ||= (t) => e.onEnter(t),
					onMouseleave: n[483] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Panama",
					class: "PA",
					style: k({ display: e.config.displayPath.PA }),
					d: "m256.9 443.2-1-.8-.6-1.5.7-.8-.7-.2-.5-.9-1.4-.8-1.2.2-.6 1-1.1.7h-.6l-.3.7 1.3 1.5-.7.4-.4.4-1.3.1-.5-1.7-.4.5-1-.1-.5-1.2-1.1-.2-.8-.3H243v.6l-.4-.4.2-.6.2-.5-.1-.5.4-.4-.6-.4v-1.1l1.1-.3 1 1v.6l1 .2.3-.3.8.7 1.4-.2 1.2-.7 1.7-.6 1-.8 1.5.1-.1.3 1.6.1 1.2.5 1 .9 1 .7-.4.5.7 1.6-.6.9-.9-.2z",
					onClick: n[484] ||= (t) => e.onClick(t),
					onDblclick: n[485] ||= (t) => e.onDblClick(),
					onMouseenter: n[486] ||= (t) => e.onEnter(t),
					onMouseleave: n[487] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Peru",
					class: "PE",
					style: k({ display: e.config.displayPath.PE }),
					d: "m280.1 513.1-.7 1.5-1.5.8-2.8-1.7-.2-1.2-5.6-3-5-3-2.2-1.9-1.1-2.3.4-.9-2.3-3.7-2.8-5.2-2.7-5.7-1.1-1.3-.9-2-2.2-1.9-2-1 1-1.3-1.4-2.7.9-2 2.2-1.7.3 1.1-.8.7.1 1 1.2-.2 1.1.3 1.2 1.4 1.6-1.1.5-2 1.7-2.4 3.4-1 3-3 1-1.8-.5-2 .8-.4 1.8 1.4 1 1.3 1.2.7 1.7 3 2 .3 1.6-.8 1 .5 1.7-.2 2.2 1.3-1.9 2.8h.9l1.4 1.6-2.6-.2-.3.5-2.3.5-3.2 1.9-.2 1.3-.7 1 .2 1.5-1.7.8v1.2l-.7.5 1.2 2.5 1.5 1.8-.6 1.2 1.9.1 1 1.5 2.5.1 2.3-1.7-.2 4.3 1.3.4 1.6-.5 2.4 4.6-.6 1-.1 2v2.4l-1.2 1.4.5 1-.6 1 1.2 2.5z",
					onClick: n[488] ||= (t) => e.onClick(t),
					onDblclick: n[489] ||= (t) => e.onDblClick(),
					onMouseenter: n[490] ||= (t) => e.onEnter(t),
					onMouseleave: n[491] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Papua New Guinea",
					class: "PG",
					style: k({ display: e.config.displayPath.PG }),
					d: "m912.3 482.4-.8.3-1.2-1-1.2-1.9-.6-2 .4-.4.3.9.8.6 1.4 1.8 1.3 1zm-11-3.7-1.4.2-.4.8-1.6.7-1.4.6H895l-2.3-.8-1.6-.8.2-.8 2.6.4 1.5-.2.4-1.4h.4l.3 1.4 1.6-.2.8-1 1.5-1-.3-1.6h1.7l.6.4v1.6zM888 484l2.5 1.9 1.8 3 1.6-.1-.1 1.2 2.2.5-.9.5 3 1.2-.3.8-1.9.2-.7-.7-2.4-.3-2.8-.5-2.2-1.8-1.6-1.5-1.4-2.5-3.7-1.2-2.4.8-1.7 1 .4 2-2.2 1-1.6-.5-2.9-.1v-9.2l-.1-9 4.9 1.9 5.2 1.6 1.9 1.4 1.5 1.4.5 1.6 4.6 1.8.7 1.5-2.6.3zm16.6-8-.9.7-.5-1.7-.6-1-1.3-1-1.6-1.2-2-.8.8-.6 1.5.7 1 .6 1.1.7 1.1 1.2 1 .9z",
					onClick: n[492] ||= (t) => e.onClick(t),
					onDblclick: n[493] ||= (t) => e.onDblClick(),
					onMouseenter: n[494] ||= (t) => e.onEnter(t),
					onMouseleave: n[495] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Philippines",
					class: "PH",
					style: k({ display: e.config.displayPath.PH }),
					d: "m829.6 439.9.3 1.8.2 1.6-1 2.6-1-2.9-1.3 1.4.9 2.1-.8 1.3-3.3-1.6-.8-2 .8-1.4-1.7-1.3-1 1.2-1.2-.1-2.1 1.5-.5-.8 1.1-2.4 1.8-.8 1.5-1 1 1.3 2.1-.8.5-1.3h2l-.2-2.2 2.3 1.3.2 1.4zm-6.7-5.3-1 1-1 1.7-.8.9-1.7-2 .6-.7.7-.8.3-1.8 1.5-.2-.4 2 2-2.8zm-15.4 2.7-3.7 2.7 1.4-2 2-1.7 1.7-2 1.4-2.8.5 2.3-1.8 1.6zm9.5-7.3 1.7.9h1.8v1.2l-1.4 1.2-1.8.8v-1.3l.1-1.4zm10.1-.7.8 3.1-2.1-.7v1l.7 1.7-1.3.6-.1-2-.9-.1-.4-1.7 1.6.2v-1.1l-1.7-2.2h2.7zm-11.1-2.6-.7 2.4-1.2-1.4-1.5-2.2 2.4.1zm-.6-15.8 1.7.9 1-.8.2.8-.5 1.2 1 2-.8 2.5-1.6 1-.5 2.3.7 2.3 1.4.3 1.3-.4 3.5 1.6-.3 1.6 1 .7-.4 1.3-2.1-1.4-1-1.5-.8 1-1.8-1.7-2.5.4-1.4-.6.1-1.2.9-.7-.8-.7-.4 1-1.4-1.6-.4-1.2-.1-2.8 1.1 1 .3-4.6 1-2.7z",
					onClick: n[496] ||= (t) => e.onClick(t),
					onDblclick: n[497] ||= (t) => e.onDblClick(),
					onMouseenter: n[498] ||= (t) => e.onEnter(t),
					onMouseleave: n[499] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Pakistan",
					class: "PK",
					style: k({ display: e.config.displayPath.PK }),
					d: "m686 351.8 2 1.6.9 2.7 4.6 1.3-2.7 2.9-3.1.5-4.3-.8-1.4 1.4 1 3 1 2.2 2.3 1.7-2.4 1.9v2.3l-2.7 3.3-1.8 3.2-2.9 3.3-3.2-.2-3.1 3.3 1.8 1.4.3 2.4 1.6 1.5.6 2.7h-6.2l-1.9 2-2-.8-.9-2.2-2.1-2.3-5.2.6h-4.6l-4 .5 1.1-3.6 4-1.6-.2-1.5-1.3-.5v-2.8l-2.7-1.4-1.2-1.9-1.4-1.7 4.7 1.7 2.8-.5 1.7.4.6-.7 2 .3 3.6-1.4v-2.7l1.6-1.9h2.1l.3-.9 2.2-.4 1 .3 1.1-1-.1-1.9 1.1-2 1.8-.8-1-2.3 2.6.2.8-1.3-.1-1.3 1.3-1.4-.3-1.7-.6-1.5 1.6-1.5 3-.7 3.2-.4 1.5-.7z",
					onClick: n[500] ||= (t) => e.onClick(t),
					onDblclick: n[501] ||= (t) => e.onDblClick(),
					onMouseenter: n[502] ||= (t) => e.onEnter(t),
					onMouseleave: n[503] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Poland",
					class: "PL",
					style: k({ display: e.config.displayPath.PL }),
					d: "m517.4 297-1.2-2.9.2-1.6-.7-2.4-1-1.7.8-1.2-.7-2.4 2-1.4 4.3-2.2 3.6-1.6 2.8.8.2 1.2h2.7l3.4.6 5.2-.1 1.4.5.7 1.5.1 2 .8 1.8v1.9l-1.7 1 .9 2v2l1.4 4-.3 1.2-1.4.5-2.5 3.6.7 2-.6-.3-2.7-1.7-2 .6-1.3-.4-1.7 1-1.4-1.6-1.1.6-.2-.3-1.3-2.1-2-.3-.3-1.3-2-.5-.4 1.1-1.5-.9.2-1.2-2.1-.4z",
					onClick: n[504] ||= (t) => e.onClick(t),
					onDblclick: n[505] ||= (t) => e.onDblClick(),
					onMouseenter: n[506] ||= (t) => e.onEnter(t),
					onMouseleave: n[507] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Puerto Rico",
					class: "PR",
					style: k({ display: e.config.displayPath.PR }),
					d: "m289.4 410.9 1.4.3.6.5-.8.8H287l-.2-1.2.4-.4z",
					onClick: n[508] ||= (t) => e.onClick(t),
					onDblclick: n[509] ||= (t) => e.onDblClick(),
					onMouseenter: n[510] ||= (t) => e.onEnter(t),
					onMouseleave: n[511] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Palestine",
					class: "PS",
					style: k({ display: e.config.displayPath.PS }),
					d: "M575 367.9v2l-.5 1-1.3.4.1-.9.7-.4-.7-.4.6-2.2z",
					onClick: n[512] ||= (t) => e.onClick(t),
					onDblclick: n[513] ||= (t) => e.onDblClick(),
					onMouseenter: n[514] ||= (t) => e.onEnter(t),
					onMouseleave: n[515] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Portugal",
					class: "PT",
					style: k({ display: e.config.displayPath.PT }),
					d: "m450 334.6 1-1 1-.5.8 1.8h1.6l.5-.5 1.7.2.7 1.8-1.3 1v3l-.4.4-.2 1.8-1.2.3 1.2 2.1-.8 2.4 1 1-.4 1-1 1.3.2 1.2-1.2.9-1.4-.5-1.5.4.4-2.8-.2-2.1-1.3-.4-.7-1.3.3-2.4 1-1.3.3-1.5.6-2.2-.1-1.5-.6-1.4z",
					onClick: n[516] ||= (t) => e.onClick(t),
					onDblclick: n[517] ||= (t) => e.onDblClick(),
					onMouseenter: n[518] ||= (t) => e.onEnter(t),
					onMouseleave: n[519] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Paraguay",
					class: "PY",
					style: k({ display: e.config.displayPath.PY }),
					d: "m299.5 527 1.1-3.6v-1.6l1.4-2.6 4.9-.9h2.6l2.6 1.6v.9l.9 1.7-.2 4 3 .6 1.1-.6 1.9.8.5 1 .3 2.7.3 1.2 1 .1 1.1-.5 1 .6v1.6l-.4 1.9-.5 1.7-.5 2.8-2.5 2.4-2.2.5-3.2-.5-2.8-.8 2.8-4.8-.4-1.3-3-1.2-3.4-2.3-2.2-.5z",
					onClick: n[520] ||= (t) => e.onClick(t),
					onDblclick: n[521] ||= (t) => e.onDblClick(),
					onMouseenter: n[522] ||= (t) => e.onEnter(t),
					onMouseleave: n[523] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Qatar",
					class: "QA",
					style: k({ display: e.config.displayPath.QA }),
					d: "m617.7 392.2-.2-2.3.8-1.6.8-.3.8 1v1.7l-.6 1.9-.7.2z",
					onClick: n[524] ||= (t) => e.onClick(t),
					onDblclick: n[525] ||= (t) => e.onDblClick(),
					onMouseenter: n[526] ||= (t) => e.onEnter(t),
					onMouseleave: n[527] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Romania",
					class: "RO",
					style: k({ display: e.config.displayPath.RO }),
					d: "m539 310.9 1.1-1 1.8.5h1.8l1.3 1 1-.6 2-.4.7-1h1.2l.8.5 1 1.2.8 1.7 1.6 2.5.1 1.8-.3 1.7.5 1.8 1.3.8 1.3-.7 1.3.7v1l-1.3.9-.9-.4-.8 4.7-1.6-.4-2-1.4-3.4.9-1.3 1-4.2-.2-2.1-.6-1.1.3-.8-1.6-.5-.7.6-.7-.7-.5-.9 1-1.6-1.2-.2-1.7-1.7-.9-.3-1.3-1.5-1.6 2.2-.7 1.7-2.8 1.3-2.8z",
					onClick: n[528] ||= (t) => e.onClick(t),
					onDblclick: n[529] ||= (t) => e.onDblClick(),
					onMouseenter: n[530] ||= (t) => e.onEnter(t),
					onMouseleave: n[531] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Serbia",
					class: "RS",
					style: k({ display: e.config.displayPath.RS }),
					d: "m533.8 320.9 1.7 1 .2 1.6 1.6 1.1 1-.9.6.5-.6.7.5.7-.7.8.2 1.5 1.4 1.6-1 1.2-.5 1.2.3.5-.5.5h-1.3l-1 .3v-.3l.3-.4.3-1h-.4l-.5-.6-.5-.2-.4-.6-.5-.3-.4-.5-.5.2-.4 1.3-.7.2.3-.3-1-.8-1-.4-.4-.5-.8-.7.7-.2.4-1.8-1.3-1.5.7-1.7h-1l1-1.5-.9-1.1-.7-1.6 2.2-1 1.8.2 1.5 1.5z",
					onClick: n[532] ||= (t) => e.onClick(t),
					onDblclick: n[533] ||= (t) => e.onDblClick(),
					onMouseenter: n[534] ||= (t) => e.onEnter(t),
					onMouseleave: n[535] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Russia",
					class: "RU",
					style: k({ display: e.config.displayPath.RU }),
					d: "m1008.3 215.8-2.8 3-4.6.6v6.5l-1.2 1.3-2.6-.2-2.2-2.2-3.7-2-.6-2.8-2.9-1.1-3.2.8-1.5-2.3.6-2.6-3.3 1.7 1.2 3.2-1.6 2.8-3.6 3-3.6-.6 2.5 3.5 1.7 5.2 1.3 1.6.3 2.6-.7 1.6-5.3-1.4-7.8 4.6-2.5.6-4.3 4.1-4 3.5-1 2.6-4-3.9-7.4 4.4-1.3-2-2.7 2.3-3.7-.7-1 3.6-3.3 5.2.1 2.2 3.2 1.1-.4 7.5-2.6.2-1.2 4.1 1.2 2.1-4.9 2.5-1 5.4-4.2 1.1-.8 4.7-4 4.2-1-3.1-1.3-6.7-1.5-10.6 1.3-7 2.4-3 .1-2.5 4.4-1.2 5-6.8 4.8-5.7 5-4.6 2.3-8.3-3.4.5-1.7 4.9-7 6.4-2.4-7.2-7.2 2-7 9.6 2.3 3.4-6.3 1.4-4.3.5.2-4-4.4-.7-3.4 2.7-8.6-1-9.2 1.6-9.1 10.4-10.8 11.7 4.5.7 1.3 3 2.8 1 1.8-2.4 3 .3 4 5.2.2 4-2.2 4.5-.3 5.2-1.2 6.9-4.2 6-1 2.8-3.8 4.7-3.8 4.5-1.8 2.3-3.7 2.2h-1.8l-1.8-1.8-3.7 2.8-.5 1.3-.3-.7v-2h1.4l.4-4.6-.8-3.3 2.4-1.4 3.4.7 2-4 .9-4.4 1-1.5 1.5-3.8-4.6 1.3-2.4 1.6h-4.3l-1.1-4-3.3-3-4.9-1.3-1-4.3-1-2.7-1-2-1.8-4.6-2.5-1.7-4.2-1.4-3.7.1-3.5.9-2.3 2.3 1.6 1v2.6l-1.6 1.5-2.5 4.7v2l-4 2.7-3.3-1.7-3.3.4-1.5-1.5-1.7-.4-4 3-3.8.7-2.6 1-3.5-.6h-2.6l-1.7-2.2-2.7-2-2.9-.6-3.5.5-2.7.8-4-1.8-.5-3.3-3.3-1.2-2.5-.5-3.1-1.9-3 4.7 1.2 2.6-2.7 3-4-1-2.9-.2-1.9-2-2.9-.1-2.4-1.4-4.3 2-5.3 3.8-3 .8-1 .3-1.6-2.6-3.6.6-1.2-1.9-2-.8-1.3-2.6-1.5-.8-4 1.2-4-2.6-1.4 2.3-6.3-11.6-3.6-3.6 1-1.5-7 4.5-2.7.2.3-2.5-3.6-1.7-3 1.2-.8-5-5-1-2.6 2-7 1.8-1.4 1.1-10.5 1.7-1.3 1.6 2 3.2-2.6 1.2.5 1.3-2.7 2.2 4.5 3.1-.7 2.1-3.9-.2-.8 1.3-3.6-2.3-4.4.1-3 1.9-3.3-1.8-6.2-3h-4.4l-5.8 4.9-.3 3.2-3-2.6-2.2 4.8.9.9-1.7 3.2 2.4 2.8h2.1l1.8 2.7-.3 2 1.4.7-1.3 2.4-2.7.7-2.8 4 2.6 3.8-.3 2.6 3 4.4-1.6 1.5-.5 1-1.2-.3-2-2.2-.7-.2-1.8-.8-.9-1.6-2.6-.8-1.7.6-.5-.7-3.8-1.8-4.1-.6-2.4-.7-.3.5-3.6-3.3-3.2-1.5-2.4-2.3 2-.7 2.3-3.3-1.5-1.6 4.1-1.7v-.9l-2.6.7.1-1.8 1.5-1.2 2.7-.3.4-1.4-.6-2.3 1.1-2.3v-1.2l-4.1-1.4h-1.7l-1.7-2-2.2.7-3.5-1.6v-.9l-1-1.9-2.2-.2-.2-1.4.7-1-1.8-2.5-3 .5-.8-.3-.7 1-1-.1-.7-3-.7-1.5.6-.4 2.2.1 1.1-1-.8-1.2-1.9-.9.2-.8-1.2-1-1.7-3 .6-1.4-.3-2.3-2.7-1.2-1.5.6-.4-1.2-3-1.3-.9-3-.2-2.4-1.3-1.2 1.2-1.7-.9-5 2-3-.4-1 3.2-3.1-3-2.7 6-7.4 2.7-3.5 1-3-4.1-4.3 1.1-4.2-2.5-4.8 1.9-5.8-3.3-8 2.6-5.4-4.3-5 .4-5.4 2.3-.7 4.8-3.2 2.8-2.8 4.7 4.8 7.6 2 10.6 8.6 2.2 3.5.2 4.8-3.1 3.7-4.6 1.8-12.5-5.3-2.1.9 4.6 5.1.1 3.2.2 6.7 3.6 2 2.2 1.6.4-3-1.7-2.9 1.8-2.5 6.8 4.1 2.3-1.6-1.9-4.9 6.6-6.7 2.5.4 2.7 2.4 1.6-4.8-2.3-4.3 1.3-4.4-2-4.7 7.8 2.5 1.6 4.2-3.5.9v4l2.2 2.5 4.3-1.6.7-4.6 5.9-3.5 9.8-6.6 2 .4-2.7 4.7 3.5.7 2-2.5 5.2-.2 4.2-3.2 3.2 4.6 3.2-5.1-3-4.6 1.5-2.6 8.3 2.4 3.9 2.5 10.1 8.8 2-4-3-4.1v-1.7l-3.4-.8 1-3.8-1.6-6.5V177l5.1-8 1.9-8.4 2-2 7.5 2.6.5 5.2-2.6 7.3 1.7 2.7 1 6-.7 11 3 4.8-1.1 5-5.5 10.2 3.2 1 1.1-2.5 3-1.8.8-3.6 2.5-3.5-1.7-4.2 1.3-5.1-3-.6-.7-4.5 2.2-8.2-3.6-7 5-6.1-.6-6.6 1.4-.2 1.4 5.1-1 8.7 3 1.6-1.4-6.4 4.7-3.5 5.9-.5 5.1 5.1-2.5-7.6-.2-10.3 4.8-2 6.8.5 6-1.4-2.2-5.3 3.2-7 3.3-.4 5.4-5.5 7.4-1.5 1-3.1 7.3-1.1 2.3 2.6 6.3-6.2 5.1.2.8-5.3 2.7-5.3 6.6-5.3 4.8 4.2-3.8 3.1 6.3 2 .8 6 2.6-3 8.2.2 6.3 5.8 2.2 4.4-.7 5.8-3 3.3-7.4 5.9-2.1 3 3.4 1.5 4.2 2.6 2.5-2 1.4 6.4 1.3-2.5 4.4-1.6 9 1.7.7 4.5 11.7 1.5.2-7.5 6 1.7h4.4l4.6 5.1 1.3 6-1.7 3.9 3.5 7 4.4 3.5 2.7-9.2 4.5 4 4.8-2.4 5.4 2.7 2.1-2.4 4.6 1.2-2-8.4 3.7-4 25.3 6 2.4 5.3 7.3 6.7 11.4-1.6 5.5 1.4 2.4 3.5-.4 6 3.5 2.3 3.7-1.6 5-.3 5.3 1.6 5.3-.9 4.9 7 3.4-2.5-2.2-5 1.2-3.7 9 2.3 5.8-.5 8 3.9 4 3.4 6.9 5.9 7.3 7.3-.2 4.5 1.9 1.7-.7-5.1 7.6 1zm-127.5 90.4-2.8-7.6-1.1-4.5v-4.5l-1-4.5-.7-3.2-1.2.7 1 2.2-2.5 2.2-.2 6.3 1.6 4.4-.1 5.8-.7 3.3.3 4.5-.3 4 .6 3.4 1.8-3.1 2.1 2.4.1-2.8-2.7-4.2 1.7-6.2zm-343-27.4-3-.9-3.8 1.6-.6 2.1 3.4.6 5.2-.1-.2-1.2.3-1.4zM980 178.7l3.6-.6 2.9-2 .2-1.2-4-2.5h-2.4l-.4.3-3.5 3.7.5 2.7zm-110-27.1-2.6 3.9.5.5 5.8 1h4.2l-.3-2.6-4-3.8zm24.6-9.6 3.3-4.2-7-2.9-5.3-1.7-.7 3.6 5.3 4.3zm-25-1.7 10.2.3 2.3-8.1-10.2-6-7.4-.6-3.7 2.2-1.5 7.8 5.6 7zm-247.2 26-2.9 2 .4 4.8 5.1 2.3.7 3.8 9.2 1.1 1.7-.7-5.4-7.1-.6-7.5 4.4-9.2 4.2-9.8 8.7-10.2 8.6-5.3 10-5.7 1.8-3.7-2-4.9-5.4 1.6-4.8 4.5-9.4 2.2-9.2 7.4-6.3 5.9.8 4.9-6.7 9 2.5 1.2-5.5 8.3zm147.5-68 .8-5.7-7.1-8.3-2.1-1-2.3 1.7-5.1 18.6zM605.6 69l3 4 3.4-2.8.3-2.7 2.6-1.3 3.7-2.2 1.1-2.6-4.2-3.9-2.6 3-1.6 4-.6-4.6-4.2.2-5.5 3.1 6.2.6zM737 82l4.6 5.8 7.8 4.2 6.2-1.8.7-13.6-6.5-16-5.5-9-6 4-7.3 11.9 3.8 3.2z",
					onClick: n[536] ||= (t) => e.onClick(t),
					onDblclick: n[537] ||= (t) => e.onDblClick(),
					onMouseenter: n[538] ||= (t) => e.onEnter(t),
					onMouseleave: n[539] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Rwanda",
					class: "RW",
					style: k({ display: e.config.displayPath.RW }),
					d: "m560.5 466.6 1.2 1.5-.2 1.7-.8.3-1.5-.2-.9 1.6-1.7-.2.3-1.5.4-.2v-1.7l.9-.8.7.3z",
					onClick: n[540] ||= (t) => e.onClick(t),
					onDblclick: n[541] ||= (t) => e.onDblClick(),
					onMouseenter: n[542] ||= (t) => e.onEnter(t),
					onMouseleave: n[543] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Saudi Arabia",
					class: "SA",
					style: k({ display: e.config.displayPath.SA }),
					d: "m595.2 417.2-.4-1.2-.8-.9-.2-1.2-1.5-1-1.5-2.5-.8-2.4-1.9-2-1.2-.5-2-2.9-.2-2v-1.8l-1.5-3.4-1.3-1.2-1.5-.6-1-1.8.2-.7-.8-1.6-.8-.6-1.1-2.4-1.7-2.5-1.5-2.1h-1.3l.4-1.8.1-1 .4-1.4 3 .6 1.3-1 .7-1.2 2.1-.4.5-1.1.9-.6-2.8-3.2 5.6-1.7.5-.5 3.4 1 4.2 2.2 8 6.5 5.1.3 2.5.3.7 1.5h2l1.1 2.6 1.4.8.5 1 1.9 1.4.1 1.3-.2 1 .3 1 .8.9.4 1 .4.8.9.6.7-.2.6 1.1v.7l1.2 3.1 8.4 1.5.5-.6 1.3 2.1-1.8 6-8.5 3-8 1-2.6 1.4-2 3-1.4.6-.7-1-1 .1-2.7-.2-.6-.3h-3.2l-.8.3-1.1-.8-.8 1.5.3 1.2z",
					onClick: n[544] ||= (t) => e.onClick(t),
					onDblclick: n[545] ||= (t) => e.onDblClick(),
					onMouseenter: n[546] ||= (t) => e.onEnter(t),
					onMouseleave: n[547] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Solomon Islands",
					class: "SB",
					style: k({ display: e.config.displayPath.SB }),
					d: "m929.8 492.8.8 1-2-.1-1-1.7 1.6.7zm-3.5-1.8h-1.1l-1.8-.2-.5-.5.1-1 1.9.4.9.6zm2.3-.7-.4.5-2.1-2.5-.6-1.7h1l1 2.3zm-5-3.6v.6l-2.2-1.2-1.5-1-1-1 .4-.3 1.3.7 2.3 1.3zm-6.6-2.8-.6.2-1.2-.7-1.2-1.1.2-.5 1.6 1.2z",
					onClick: n[548] ||= (t) => e.onClick(t),
					onDblclick: n[549] ||= (t) => e.onDblClick(),
					onMouseenter: n[550] ||= (t) => e.onEnter(t),
					onMouseleave: n[551] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Sudan",
					class: "SD",
					style: k({ display: e.config.displayPath.SD }),
					d: "M570.5 436.9h-.4v-1.5l-.3-1-1.4-1-.4-2.1.4-2.1-1.3-.2-.2.6-1.7.2.7.8.2 1.7-1.5 1.6-1.4 2-1.5.3-2.3-1.6-1.1.5-.3.9-1.4.5-.1.6h-2.8l-.4-.6h-2l-1 .4-.8-.2-1.5-1.7-.4-.8-2 .4-.8 1.3-.7 2.6-1 .5-.9.3-.2-.2-1-.8-.1-.8.4-1.2V435l-1.6-1.7-.3-1.2v-.7l-1-.9V429l-.6-1.1-1 .1.2-1 .8-1.2-.3-1.2.9-.9-.6-.6.7-1.8 1.3-2.2 2.4.3-.1-11.7v-1.2h3.3v-6h33.2l1 3-.7.5.4 3 1 3.6 1.1.7 1.6 1.1-1.5 1.7-2 .4-1 1-.2 1.9-1.2 4.2.3 1.2-.4 2.4-1.2 2.9-1.7 1.4-1.2 2.1-.3 1.2-1.3.8-.8 3z",
					onClick: n[552] ||= (t) => e.onClick(t),
					onDblclick: n[553] ||= (t) => e.onDblClick(),
					onMouseenter: n[554] ||= (t) => e.onEnter(t),
					onMouseleave: n[555] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Sweden",
					class: "SE",
					style: k({ display: e.config.displayPath.SE }),
					d: "m537.5 217.5-2.8 4.7.5 4-4.5 5.1-5.4 5.4-2 8.4 2 4 2.6 3.2-2.5 6.2-3 1.3-1 8.8-1.6 4.8-3.4-.5-1.6 4-3.3.2-.9-4.7-2.3-5.8-2.1-7.6 1.2-3.1 2.3-3.8 1-6.7-1.8-3-.2-8 1.8-6 2.8.1 1-2.5-1-2.2 4.3-9.5 2.8-8 1.9-5.2h2.7l.7-4.1 5.3 1.2.4-5.1 1.7-.3 3.8 3.8 4.4 5.1V213l1 2.7z",
					onClick: n[556] ||= (t) => e.onClick(t),
					onDblclick: n[557] ||= (t) => e.onDblClick(),
					onMouseenter: n[558] ||= (t) => e.onEnter(t),
					onMouseleave: n[559] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Slovenia",
					class: "SI",
					style: k({ display: e.config.displayPath.SI }),
					d: "m514 316.5 2.3.3 1.4-.9 2.4-.1.6-.7h.4l.6 1.4-2.2 1.1-.3 1.6-1 .4v1.2l-1-.1-1-.7-.5.7-2-.1.6-.4-.6-1.7z",
					onClick: n[560] ||= (t) => e.onClick(t),
					onDblclick: n[561] ||= (t) => e.onDblClick(),
					onMouseenter: n[562] ||= (t) => e.onEnter(t),
					onMouseleave: n[563] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Svalbard and Jan Mayen",
					class: "SJ",
					style: k({ display: e.config.displayPath.SJ }),
					d: "m544.6 104.5-6.3 5.3-5-3 2-3.4-1.7-4.3 5.8-2.8 1.1 5.2zm-18.2-26.7 9.3 11.3-7.1 5.7-1.6 10-2.4 2.5-1.3 10.5-3.4.5-6-7.6 2.5-4.6-4.2-3.9-5.5-11.8-2.2-11.8 7.7-5.7 1.5 5.6 4-.3 1-5.4 4.2-.5zm20.2-11.5 5.5 5.8-4.2 8.6-8 1.8-8.4-2.6-.5-4.3-4-.3-3-7.5 8.6-4.7 4 4.1 3-5z",
					onClick: n[564] ||= (t) => e.onClick(t),
					onDblclick: n[565] ||= (t) => e.onDblClick(),
					onMouseenter: n[566] ||= (t) => e.onEnter(t),
					onMouseleave: n[567] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Slovakia",
					class: "SK",
					style: k({ display: e.config.displayPath.SK }),
					d: "m528.1 304 .2.3 1.1-.6 1.4 1.5 1.7-.9 1.3.4 2-.6 2.7 1.7-.8 1-.5 1.8-.6.4-3-1.2-1 .2-.6 1-1.3.5-.3-.2-1.4.6-1.1.1-.2.9-2.4.5-1-.5-1.4-1-.3-1.5.2-.5.4-1 1.3.1.9-.4v-.4l.6-.2.2-1 .6-.2.5-.8z",
					onClick: n[568] ||= (t) => e.onClick(t),
					onDblclick: n[569] ||= (t) => e.onDblClick(),
					onMouseenter: n[570] ||= (t) => e.onEnter(t),
					onMouseleave: n[571] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Sierra Leone",
					class: "SL",
					style: k({ display: e.config.displayPath.SL }),
					d: "m443.2 444.4-.8-.2-2-1.1-1.4-1.5-.5-1-.4-2.1 1.5-1.2.3-.8.5-.6.8-.1.6-.5h2.3l.8 1 .6 1.2-.1.8.4.7v1l.8-.1-1.3 1.3-1.3 1.5-.1.8z",
					onClick: n[572] ||= (t) => e.onClick(t),
					onDblclick: n[573] ||= (t) => e.onDblClick(),
					onMouseenter: n[574] ||= (t) => e.onEnter(t),
					onMouseleave: n[575] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Senegal",
					class: "SN",
					style: k({ display: e.config.displayPath.SN }),
					d: "m428.4 425.2-1.2-2.3-1.4-1 1.3-.5 1.3-2 .7-1.6 1-.9 1.3.3 1.4-.7h1.6l1.3.8 1.9.8 1.7 2.1 1.8 2 .2 1.8.5 1.6 1 .9.3 1-.1 1-.4.1-1.6-.2-.2.3h-.6l-2-.6h-1.4l-5.1-.2-.8.3h-1l-1.4.4-.5-2.2h2.6l.7-.3h.5l1-.7 1.2.6h1.2l1.2-.6-.5-.8-1 .5h-.8l-1.1-.7h-1l-.6.7z",
					onClick: n[576] ||= (t) => e.onClick(t),
					onDblclick: n[577] ||= (t) => e.onDblClick(),
					onMouseenter: n[578] ||= (t) => e.onEnter(t),
					onMouseleave: n[579] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Somalia",
					class: "SO",
					style: k({ display: e.config.displayPath.SO }),
					d: "M618.6 430.4v-.8h-1.1l-1.3 1-1.5.3-1.3.4h-.9l-1.6.2-1 .5-1.4.2-2.5.9-3 .3-2.7.7H599l-1.3-1.2-.6-1.1-.9-.6-1 1.6-.6 1 1 1.5 1 1.4 1.1 1 9.2 3.3h2.4l-8 8.4-3.6.2-2.5 2h-1.8l-.8.9-2.4 3.1v10.2l1.6 2.3.7-.7.6-1.4 3.1-3.4 2.6-2.2 4.2-2.7 2.8-2.3 3.3-3.8 2.4-3.1 2.4-4.1 1.7-3.6 1.4-3.2.8-3 .6-1V432z",
					onClick: n[580] ||= (t) => e.onClick(t),
					onDblclick: n[581] ||= (t) => e.onDblClick(),
					onMouseenter: n[582] ||= (t) => e.onEnter(t),
					onMouseleave: n[583] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Suriname",
					class: "SR",
					style: k({ display: e.config.displayPath.SR }),
					d: "m315 446.7 3.4.6.3-.5 2.3-.2 3 .7-1.5 2.4.2 2 1.1 1.6-.5 1.2-.2 1.3-.7 1.1-1.6-.5-1.4.2-1-.2-.4.8.5.6-.2.5-1.6-.2-1.7-2.4-.4-1.6h-.9l-1.2-2 .5-1.5-.1-.6 1.7-.8z",
					onClick: n[584] ||= (t) => e.onClick(t),
					onDblclick: n[585] ||= (t) => e.onDblClick(),
					onMouseenter: n[586] ||= (t) => e.onEnter(t),
					onMouseleave: n[587] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "South Sudan",
					class: "SS",
					style: k({ display: e.config.displayPath.SS }),
					d: "M570.5 436.9v2.2l-.4.9h-1.5l-1 1.6 1.8.2 1.4 1.4.5 1.1 1.3.7 1.6 3-1.9 1.9-1.7 1.6-1.7 1.3h-2l-2.3.7-1.7-.7-1.2.8-2.5-1.9-.6-1.1-1.6.5-1.3-.1-.7.4-1.3-.3-1.7-2.3-.4-.9-2.1-1.1-.7-1.7-1.2-1.2-1.9-1.5v-.9l-1.6-1.1-1.9-1.1.9-.3 1-.6.7-2.5.7-1.3 2-.4.5.8 1.5 1.6.8.3 1-.5 2 .1.4.6h2.8v-.6l1.5-.5.3-.9 1-.5 2.4 1.6 1.5-.3 1.4-2 1.5-1.6-.2-1.7-.7-.8 1.7-.2.2-.6 1.3.2-.4 2.1.4 2 1.4 1.2.3 1v1.4z",
					onClick: n[588] ||= (t) => e.onClick(t),
					onDblclick: n[589] ||= (t) => e.onDblClick(),
					onMouseenter: n[590] ||= (t) => e.onEnter(t),
					onMouseleave: n[591] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "El Salvador",
					class: "SV",
					style: k({ display: e.config.displayPath.SV }),
					d: "m229 425.8-.2.6h-1.6l-1-.3-1.2-.6-1.6-.1-.8-.6.1-.5 1-.7.5-.3-.1-.4.6-.1.9.2.6.6.8.4.1.4 1.2-.3.6.2.4.3z",
					onClick: n[592] ||= (t) => e.onClick(t),
					onDblclick: n[593] ||= (t) => e.onDblClick(),
					onMouseenter: n[594] ||= (t) => e.onEnter(t),
					onMouseleave: n[595] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Syria",
					class: "SY",
					style: k({ display: e.config.displayPath.SY }),
					d: "m584 364.6-5.5 3.5-3-1.3h-.1l.3-.5v-1.4l.7-1.8 1.5-1.3-.4-1.3-1.3-.2-.3-2.6.7-1.4.8-.7.7-.8.2-2 .9.7 3-1 1.6.7h2.3l3.2-1.3h1.5l3.2-.5-1.4 2.2-1.6.9.3 2.5-1 4.1z",
					onClick: n[596] ||= (t) => e.onClick(t),
					onDblclick: n[597] ||= (t) => e.onDblClick(),
					onMouseenter: n[598] ||= (t) => e.onEnter(t),
					onMouseleave: n[599] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Eswatini",
					class: "SZ",
					style: k({ display: e.config.displayPath.SZ }),
					d: "m565.2 540.7-.6 1.4-1.6.4-1.7-1.7v-1.1l.7-1.2.3-.9.8-.2 1.4.6.4 1.4z",
					onClick: n[600] ||= (t) => e.onClick(t),
					onDblclick: n[601] ||= (t) => e.onDblClick(),
					onMouseenter: n[602] ||= (t) => e.onEnter(t),
					onMouseleave: n[603] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Chad",
					class: "TD",
					style: k({ display: e.config.displayPath.TD }),
					d: "m515.9 427.3.3-1.4h-1.8V424l-1.2-1 1.2-3.9 3.6-2.7.1-3.8 1.1-6 .6-1.2-1.1-1v-1l-1.1-.8-.7-4.7 2.8-1.6L531 402l11.2 5.7.1 11.7-2.4-.2-1.3 2-.7 1.9.6.6-1 1 .4 1-.8 1.3-.2 1 1-.1.5 1v1.7l1 .9v.6l-1.7.5-1.4 1.2-2 3-2.7 1.4-2.7-.2-.8.3.3 1-1.5 1-1.2 1-3.5 1.1-.7-.6h-.5l-.5.6-2.3.3.4-.8-.9-2-.4-1.1-1.2-.5-1.6-1.6.6-1.4 1.3.3.8-.2h1.5l-1.5-2.5.1-2-.2-1.8z",
					onClick: n[604] ||= (t) => e.onClick(t),
					onDblclick: n[605] ||= (t) => e.onDblClick(),
					onMouseenter: n[606] ||= (t) => e.onEnter(t),
					onMouseleave: n[607] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "French Southern Territories",
					class: "TF",
					style: k({ display: e.config.displayPath.TF }),
					d: "m668.5 619 1.8 1.4 2.7.5v.8l-.7 2-4.3.3v-2.3l.4-1.8z",
					onClick: n[608] ||= (t) => e.onClick(t),
					onDblclick: n[609] ||= (t) => e.onDblClick(),
					onMouseenter: n[610] ||= (t) => e.onEnter(t),
					onMouseleave: n[611] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Togo",
					class: "TG",
					style: k({ display: e.config.displayPath.TG }),
					d: "m480.5 446.3-2.3.5-.6-1-.7-1.7-.3-1.4.6-2.6-.6-1-.3-2.2v-2l-1.2-1.5.2-.9h2.5l-.4 1.6.9.8 1 1v1.4l.6.6-.1 6.4z",
					onClick: n[612] ||= (t) => e.onClick(t),
					onDblclick: n[613] ||= (t) => e.onDblClick(),
					onMouseenter: n[614] ||= (t) => e.onEnter(t),
					onMouseleave: n[615] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Thailand",
					class: "TH",
					style: k({ display: e.config.displayPath.TH }),
					d: "m762.9 429.2-2.5-1.3H758l.4-2.2h-2.5l-.2 3.1-1.5 4.2-1 2.5.3 2 1.8.1 1.1 2.6.5 2.4 1.6 1.6 1.7.4 1.4 1.4-.9 1.2-1.8.3-.2-1.4-2.3-1.3-.5.5-1.1-1-.5-1.4-1.5-1.6-1.4-1.3-.4 1.6-.5-1.6.3-1.7.8-2.7 1.3-3 1.6-2.6-1.1-2.6v-1.3l-.3-1.6-1.9-2.3-.6-1.4 1-.6 1-2.5-1.2-2-1.8-2-1.3-2.6 1.2-.5 1.2-3.2 2-.2 1.7-1.2 1.6-.7 1.2.9.1 1.8h2l-.8 3.2.1 2.6 3-1.7.8.5h1.6l.6-1.1 2.1.2 2.2 2.4.1 2.8 2.3 2.6-.1 2.4-1 1.3-2.6-.4-3.6.6-1.8 2.3z",
					onClick: n[616] ||= (t) => e.onClick(t),
					onDblclick: n[617] ||= (t) => e.onDblClick(),
					onMouseenter: n[618] ||= (t) => e.onEnter(t),
					onMouseleave: n[619] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Tajikistan",
					class: "TJ",
					style: k({ display: e.config.displayPath.TJ }),
					d: "m674.4 340.6-1 1.1-3.1-.6-.3 2.1 3-.2 3.5 1.1 5.3-.5.7 3.3 1-.3 1.7.8-.1 1.3.4 2h-3l-1.8-.2-1.8 1.6-1.2.3-1 .7-1.1-1.1.3-3-.9-.1.3-1.1-1.5-.8-1.2 1.2-.3 1.4-.4.6-1.7-.1-1 1.6-.9-.7-2 1.1-.9-.4 1.6-3.6-.6-2.6-2-.9.7-1.6 2.3.2 1.4-2 .8-2.3 3.8-1-.6 1.8.4 1z",
					onClick: n[620] ||= (t) => e.onClick(t),
					onDblclick: n[621] ||= (t) => e.onDblClick(),
					onMouseenter: n[622] ||= (t) => e.onEnter(t),
					onMouseleave: n[623] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Timor-Leste",
					class: "TL",
					style: k({ display: e.config.displayPath.TL }),
					d: "m825.7 488.3.3-.7 2.4-.6 2-.1.8-.4 1 .4-1 .7-2.9 1.3-2.3.8v-.9z",
					onClick: n[624] ||= (t) => e.onClick(t),
					onDblclick: n[625] ||= (t) => e.onDblClick(),
					onMouseenter: n[626] ||= (t) => e.onEnter(t),
					onMouseleave: n[627] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Turkmenistan",
					class: "TM",
					style: k({ display: e.config.displayPath.TM }),
					d: "m646.9 356.9-.3-3h-2l-3.3-3.1-2.2-.4-3.1-1.8-2-.3-1.2.6h-1.9l-2 2-2.5.6-.5-2.5.4-3.7-2.2-1.2.8-2.5-1.9-.2.6-3.1 2.7 1 2.4-1.3-2-2.2-.8-2.2-2.3 1-.3 2.7-.8-2.4 1.2-1.2 3.2-.8 1.9 1 2 3 1.4-.2h3.1l-.4-2 2.4-1.2 2.3-2.2 3.8 2 .3 3 1 .7 3.1-.1 1 .6 1.3 3.8 3.3 2.5 1.8 1.7 3 1.8 3.6 1.5v2.1h-.9l-1.3-1-.5 1.3-2.3.6-.6 2.8-1.6 1-2.2.6-.5 1.5-2.2.5z",
					onClick: n[628] ||= (t) => e.onClick(t),
					onDblclick: n[629] ||= (t) => e.onDblClick(),
					onMouseenter: n[630] ||= (t) => e.onEnter(t),
					onMouseleave: n[631] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Tunisia",
					class: "TN",
					style: k({ display: e.config.displayPath.TN }),
					d: "m501.8 374.7-1.2-5.9-1.7-1.3v-.8l-2.3-2-.2-2.5 1.7-1.9.6-2.8-.4-3.3.6-1.8 3-1.4 2 .4-.1 1.8 2.4-1.3.2.7-1.4 1.7v1.6l1 .8-.4 3-1.9 1.7.5 1.8h1.5l.7 1.7 1 .5v2.6l-1.5.9-.8 1-2 1.3.3 1.4-.2 1.3z",
					onClick: n[632] ||= (t) => e.onClick(t),
					onDblclick: n[633] ||= (t) => e.onDblClick(),
					onMouseenter: n[634] ||= (t) => e.onEnter(t),
					onMouseleave: n[635] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Turkey",
					class: "TR",
					style: k({ display: e.config.displayPath.TR }),
					d: "m578.8 336.6 4 1.4 3.2-.5 2.4.3 3.4-2 3-.1 2.6 1.8.5 1.3-.2 1.8 2 .9 1.1 1-1.9 1 .9 4.2-.5 1.1 1.5 2.8-1.4.6-1-.9-3.2-.4-1.2.5-3.2.6-1.5-.1-3.2 1.3h-2.3l-1.5-.6-3.1 1-1-.7v1.9l-.8.8-.8.7-1-1.6 1-1.3-1.7.3-2.3-.8-2 2-4.2.4-2.3-1.8-3-.1-.6 1.4-2 .4-2.7-1.8h-3L551 350l-2-2 1.3-2.7-1.8-1.7 3.1-3.5 4.3-.2 1.2-2.8 5.4.5 3.3-2.4 3.3-1 4.6-.1zm-27.3 2.4-2.3 2-1-1.7.1-.8.7-.4.9-2.3-1.4-1 2.8-1.2 2.5.5.3 1.4 2.4 1.2-.5 1-3.3.1z",
					onClick: n[636] ||= (t) => e.onClick(t),
					onDblclick: n[637] ||= (t) => e.onDblClick(),
					onMouseenter: n[638] ||= (t) => e.onEnter(t),
					onMouseleave: n[639] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Trinidad and Tobago",
					class: "TT",
					style: k({ display: e.config.displayPath.TT }),
					d: "m302.3 433.2 1.6-.3h.6l-.1 2.2-2.3.3-.6-.3.9-.7z",
					onClick: n[640] ||= (t) => e.onClick(t),
					onDblclick: n[641] ||= (t) => e.onDblClick(),
					onMouseenter: n[642] ||= (t) => e.onEnter(t),
					onMouseleave: n[643] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Taiwan",
					class: "TW",
					style: k({ display: e.config.displayPath.TW }),
					d: "M816.7 393.3 815 398l-1.2 2.5-1.5-2.5-.3-2.3 1.7-3 2.2-2.3 1.3 1z",
					onClick: n[644] ||= (t) => e.onClick(t),
					onDblclick: n[645] ||= (t) => e.onDblClick(),
					onMouseenter: n[646] ||= (t) => e.onEnter(t),
					onMouseleave: n[647] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Tanzania",
					class: "TZ",
					style: k({ display: e.config.displayPath.TZ }),
					d: "m570.3 466 .5.3L581 472l.1 1.6 4 2.8-1.2 3.5.1 1.6 1.8 1 .1.7-.7 1.7.1.9-.2 1.3 1 1.8 1.2 2.8 1 .6-2.2 1.6-3.1 1.1h-1.7l-1 .8-2 .1-.7.4-3.3-.8-2.1.2-.8-3.9-1-1.3-.5-.8-2.8-.5-1.6-.8-1.8-.5-1-.5-1.3-.7-1.5-3.6-1.6-1.5-.6-1.6.3-1.5-.5-2.6 1.2-.1 1-1 1-1.5.8-.6v-.9l-.6-.6-.2-1 .8-.4.2-1.7-1.2-1.6 1-.3h3.1z",
					onClick: n[648] ||= (t) => e.onClick(t),
					onDblclick: n[649] ||= (t) => e.onDblClick(),
					onMouseenter: n[650] ||= (t) => e.onEnter(t),
					onMouseleave: n[651] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Ukraine",
					class: "UA",
					style: k({ display: e.config.displayPath.UA }),
					d: "m564.4 292.5 1 .2.7-1 .9.2 2.9-.5 1.8 2.6-.7 1 .2 1.3 2.3.2 1 2-.1.8 3.6 1.6 2.1-.7 1.7 2h1.7l4.1 1.4v1.2l-1.1 2.3.6 2.3-.4 1.4-2.7.3-1.5 1.2v1.8l-2.3.3-1.9 1.3-2.6.3-2.4 1.5-1.3 1 1.5 1.5 1.3 1 2.9-.3-.6 1.4-3 .7-3.9 2.3-1.5-.8.6-1.9-3-1.1.5-.8 3.1-1.6-.4-.8-.4.4-.5-.3-4.3-1-.2-1.5-2.6.5-1 2.2-2.2 3-1.3-.7-1.3.7-1.3-.8.7-.4.5-1.4.8-1.3-.2-.7.6-.3.2.5 1.7.1.7-.2-.5-.5.2-.6-1-1-.4-1.7-1-.7.2-1.4-1.3-1.1-1.1-.2-2-1.3-2 .4-.6.6h-1.2l-.7 1-2 .4-1 .7-1.3-1h-1.8l-1.8-.5-1.2.9-.2-1.2-1.5-1.1.5-1.7.8-1.1.6.2-.7-1.9 2.5-3.6 1.4-.5.3-1.2-1.4-4 1.4-.1 1.5-1.2 2.2-.1 2.8.3 3.1 1.1h2.2l1 .7 1.1-.7.8 1 2.5-.2 1.1.4.2-2.2.9-1z",
					onClick: n[652] ||= (t) => e.onClick(t),
					onDblclick: n[653] ||= (t) => e.onDblClick(),
					onMouseenter: n[654] ||= (t) => e.onEnter(t),
					onMouseleave: n[655] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Uganda",
					class: "UG",
					style: k({ display: e.config.displayPath.UG }),
					d: "M564.6 466.3h-3l-1 .3-1.7.8-.7-.3v-2l.7-1.1.1-2.3.6-1.3 1-1.4 1.2-.8.9-1-1.2-.3.2-3.3 1.2-.8 1.7.7 2.3-.7h2l1.7-1.3 1.3 2 .4 1.4 1.2 3.2-1 2-1.4 1.8-.8 1.2v3z",
					onClick: n[656] ||= (t) => e.onClick(t),
					onDblclick: n[657] ||= (t) => e.onDblClick(),
					onMouseenter: n[658] ||= (t) => e.onEnter(t),
					onMouseleave: n[659] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "United States of America",
					class: "US",
					style: k({ display: e.config.displayPath.US }),
					d: "m109.3 279.8-1.6-1.8-2.5-1.6-.8-4.4-3.6-4-1.5-5-2.7-.4-4.4-.1-3.3-1.5-5.8-5.7-2.7-1-4.9-2-3.9.5-5.5-2.6-3.3-2.5-3.1 1.3.6 3.9-1.6.3-3.2 1.2-2.5 1.9-3.1 1.1-.4-3.2 1.2-5.5 3-1.8-.7-1.5-3.6 3.2-2 3.8-4 4 2 2.6-2.6 3.9-3 2.2-2.8 1.6-.7 2.3-4.4 2.6-.8 2.3-3.3 2.2-2-.4-2.6 1.4-2.8 1.6-2.3 1.7-4.9 1.4-.4-.9 3-2.2 2.8-1.5 3-2.7 3.5-.6 1.4-2 3.9-3.1.6-1 2-1.9.5-4 1.5-3.1-3.3 1.6-.9-1-1.5 2-1.8-2.7-.8 2-1-2.8-2.8 2.2h-1.7l-.3-3.2.5-2-1.8-2-3.6 1-2.4-2.6-2-1.4v-3.2l-2-2.5 1-3.4 2.3-3.4 1-3.1 2.2-.5 2 1 2.2-3 2 .6 2.2-2-.5-3-1.6-1 2.1-2.6h-1.7l-3 1.5-.9 1.4-2.2-1.4-4 .7-4-1.5-1.2-2.7-3.6-3.9 4-2.9 6.2-3.4h2.3l-.4 3.5 6-.3-2.3-4.3-3.5-2.7-2-3.7-2.6-3.1-3.9-2.4 1.6-4 5-.3 3.5-3.6.7-3.9 2.8-4 2.7-.9 5.4-3.7 2.5.6 4.3-4.7 4.3 1.9 2 3.8 1.3-1.6 4.7.5-.2 2 4.3 1.4 2.9-.9 5.9 2.7 5.4.8 2.1 1 3.8-1.3 4.2 2.5 3 1v63.2l2.8.1 2.7 1.6 2 2.4 2.5 3.6 2.7-3 2.8-1.8 1.5 2.8 2 2.3 2.5 2.4 1.7 3.8 2.9 5.9 4.8 3.2v3zm175.9 34.4-1.3-1.2-1.8.7-1-1-2.1 3-.9 3.2-1 1.8-1.2.7-.9.2-.2 1h-9.5l-1.2.7-3 2.7.4.6.1 1.5-2 1.2-2.4-.3-2.2-.1-1.3.4.3 1.2v.3l-2.4 2.3-2.1 1.1-1.5.5-1.6 1-2 .5-1.4-.2-1.8-.7 1-1.5.6-1.3 1.3-2-.1-1.6-.5-2.3-1-.4-1.8 1.7h-.6l-.1-1 1.5-1.5.3-1.8-.2-1.8-2.1-1.6-2.4-.8-.4 1.5-.6.4-.5 2-.3-1.3-1 1-.8 1.2-.7 2-.1 1.6.9 2.4-.1 2.5-1.1 1.8-.6.5-.8.5h-1l-.2-.3-.7-2v-1.9l-.3-1.8.5-2.2.6-2.7 1.5-3h-.4l-2 2.5-.5-.5 1.1-1.4 1.7-2.6 2-.3 2.1-.8 2.2.4h.1l2.5-.3-1.4-1.7h-.8l-.8-.2-.6-1.2-2.8.4-2.5.9-2-1.6-1.5-.5.9-2.2-2.5 1.4-2.3 1.3-2.1 1-1.7-1.3-2.8.8v-.6l1.9-1.7 2-1.7 2.8-1.3-3.4-1.1-2.3.5-2.7-1.3-2.9-.6-2-.3-.8-.7-.5-2.4h-1v1.7h-77.6l1 3.5.4 3.4-.7 1-1.5-3.8-4-1.5-.4.9.9 1.9.9 3.5.5 5.4-.4 3.6-.3 3.6-1.1 3.6.9 2.9v3.2l-.5 3 1.5 2 .4 3 2.1 3 1.3 1.1-.1.9 2.3 4.8 2.7 3.5.4 1.8.7.6 2.6.3 1 1h1.5l.4 1 1.3.4 1.8 2 .5 1.7 3.1-.3 3.6-.3-.3.6 4.3 1.6 6.4 2.3h7.8V370h4.8l1 1.2 1.5 1 1.7 1.5.9 1.7.7 1.7 1.4 1 2.4 1 1.7-2.6h2.3l2 1.2 1.4 2.2 1 1.9 1.6 1.8.7 2.2.8 1.4 2.1 1 2 .7 1.1-.1-.5-1-.1-1.6v-2.1l.6-1.4 1.6-1.6 2.8-1.3 2.5-2.4 2.4-.7 1.7-.3 2 .8 2.5-.4 2 1.7h2.1l1-.6 1.1.5.5-.4-.6-.6V376l-.4-.9 1.1-.5 2.2-.2 2.5.3 3.1-.4 1.8.8 1.4 1.5.5.2 2.8-1.5 1 .5 2.3 2.7.8 1.8-.6 2 .4 1.3 1.3 2.4 1.5 2.7 1 .7.5 1.3 1.4.4.8-.4.7-1.9.1-1.2.1-2-1.3-3.7v-1.4l-1.3-2.3-1-2.7-.4-2.3.4-2.3 1.3-2 1.6-1.5 3.1-2.1.4-1.2 1.4-1.2 1.4-.2 1.9-2 2.9-1 1.7-2.5-.3-3.5-.3-1.2-.8-.2-.2-3.4-1.9-1.1 1.9.5-.6-2.2.5-1.6.3 3 1.5 1.3-1 2.4.4.2 1.5-2.8 1-1.4-.1-1.4-.7-.6-.6-2 1 1 .6.2.2.9 2-2.8.6-2.6-.8-.2.8-1v.4h1.7l4-1-.9-.8-4 .7 2.3-1 1.6-.2 1.2-.2 2-.7 1.4.1 2-.6.1-1-.8-1 .3 1.4h-1.2l-.9-2v-2l.5-.9 1.5-2.3 3-1.1 2.8-1.4 3-1.9-.5-1.3-1.8-2.2zM45.6 263.8l-1.5.8-2.5 1.9.4 2.4 1.4 1.3 2.8-2 2.5-2.4-1.2-1.7zM0 235.2l2-1.2.3-.7-2.3-.7zm8.5 15.4-2.8 1 1.7 1.5 1.9 1 1.7-.8-.3-2.2zm97.4 32.5-2.7.4-1.4-.7-.1 1.6.5 2 1.4 1.5 1 2.1 1.7 2.1h1.2l-2.5-3.7zM37 403.8l-1-.3-.2.3v.1l.3.3.5.6 1-.2.1-.4zm-3-.6 1.5.1.1-.3-1.3-.1zm6 3.3-.6-.2-1-.5-.2-.1-.2.3.2.6-.5.4-.1.4.4 1v.9l.6.4.4-.5 1-.5 1-.6.1-.1-.7-1zm-8-5.1-.7.4.1.1.4.7 1 .1h.2l.1-.1-.8-1zm-4.3-1.6-.5.3-.1.2 1 .6.3-.3-.1-.7z",
					onClick: n[660] ||= (t) => e.onClick(t),
					onDblclick: n[661] ||= (t) => e.onDblClick(),
					onMouseenter: n[662] ||= (t) => e.onEnter(t),
					onMouseleave: n[663] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Uruguay",
					class: "UY",
					style: k({ display: e.config.displayPath.UY }),
					d: "m313.7 551.8 1.8-.3 2.8 2.5 1-.1 3 2 2.1 1.9 1.7 2.2-1.3 1.6.8 1.9-1.2 2.1-3.2 1.9-2-.7-1.6.4-2.6-1.5-1.9.1-1.7-1.8.3-2.2.6-.7v-3.4l.7-3.3z",
					onClick: n[664] ||= (t) => e.onClick(t),
					onDblclick: n[665] ||= (t) => e.onDblClick(),
					onMouseenter: n[666] ||= (t) => e.onEnter(t),
					onMouseleave: n[667] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Uzbekistan",
					class: "UZ",
					style: k({ display: e.config.displayPath.UZ }),
					d: "M661.8 351v-2.2l-3.7-1.5-3-1.8-1.7-1.7-3.3-2.5-1.3-3.8-1-.6-3 .1-1-.7-.4-3-3.8-2-2.3 2.2-2.4 1.3.4 1.8-3.1.1-.1-14.1 7.2-2.4.5.4 4.4 2.8 2.3 1.5 2.6 3.5 3.3-.6 4.8-.3 3.4 2.8-.2 3.8h1.3l.6 3.1 3.6.1.7 1.8h1l1.3-2.7 3.7-2.6 1.6-.7.8.4-2.3 2.4 2 1.4 2-1 3.4 2-3.6 2.7-2.1-.4-1.2.1-.4-1 .6-1.7-3.8.9-.9 2.3-1.3 2-2.3-.2-.7 1.6 2 .9.6 2.6-1.6 3.6-2-.7z",
					onClick: n[668] ||= (t) => e.onClick(t),
					onDblclick: n[669] ||= (t) => e.onDblClick(),
					onMouseenter: n[670] ||= (t) => e.onEnter(t),
					onMouseleave: n[671] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Venezuela",
					class: "VE",
					style: k({ display: e.config.displayPath.VE }),
					d: "m275.3 430.4-.1.6-1.7.4 1 1.2-.1 1.5-1.2 1.7 1 2.2 1.2-.2.7-2-.9-1-.1-2.2 3.4-1.1-.3-1.4 1-.9 1 2 2 .1 1.7 1.6.2 1h2.5l3-.3 1.6 1.2 2.1.4 1.6-1v-.6l3.5-.2h3.4l-2.4.8 1 1.3 2.2.3 2 1.3.5 2.3h1.5l1.1.6-2.2 1.6-.3 1 1 1.1-.7.5-1.7.5v1.3l-.7.8 1.9 2 .3.9-1 1-3.1 1-2 .5-.8.7-2.3-.7-2-.4-.6.3 1.3.7-.1 1.9.4 1.7 2.3.3.2.6-2 .8-.4 1.1-1.1.5-2 .6-.6.9-2.2.2-1.6-1.5-.8-2.8-.8-1-1-.6 1.4-1.4v-.6l-.9-.8-.5-1.9.2-2 .6-1 .5-1.4-1-.5-1.5.3-2-.1-1.2.3-2-2.4-1.6-.4-3.6.3-.7-1-.7-.2v-.6l.3-1-.3-1.2-.6-.6-.3-1.3-1.5-.2.8-1.7.3-2 .8-1 1.1-.9.8-1.4z",
					onClick: n[672] ||= (t) => e.onClick(t),
					onDblclick: n[673] ||= (t) => e.onDblClick(),
					onMouseenter: n[674] ||= (t) => e.onEnter(t),
					onMouseleave: n[675] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Vietnam",
					class: "VN",
					style: k({ display: e.config.displayPath.VN }),
					d: "m778.2 401.9-3.7 2.5-2.4 2.8-.6 2 2.2 3.2 2.6 3.8 2.5 1.8 1.7 2.3 1.3 5.3-.4 5-2.3 2-3.2 1.8-2.3 2.3-3.5 2.6-1-1.8.8-1.9-2.1-1.6 2.4-1.1 3-.2-1.3-1.8 4.7-2.1.4-3.5-.7-1.9.6-2.9-.8-2-2-2-1.9-2.6-2.3-3.5-3.3-1.7.8-1 1.8-.9-1.1-2.6h-3.5l-1.2-2.7-1.7-2.4 1.5-.7h2.3l2.7-.3 2.4-1.7 1.3 1.2 2.6.5-.5 1.8 1.4 1.2z",
					onClick: n[676] ||= (t) => e.onClick(t),
					onDblclick: n[677] ||= (t) => e.onDblClick(),
					onMouseenter: n[678] ||= (t) => e.onEnter(t),
					onMouseleave: n[679] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Vanuatu",
					class: "VU",
					style: k({ display: e.config.displayPath.VU }),
					d: "m945.9 509.9-1 .4-.9-1.3.1-.8zm-2.1-4.4.5 2.3-.8-.4-.6.2-.4-.8v-2.2z",
					onClick: n[680] ||= (t) => e.onClick(t),
					onDblclick: n[681] ||= (t) => e.onDblClick(),
					onMouseenter: n[682] ||= (t) => e.onEnter(t),
					onMouseleave: n[683] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Kosovo",
					class: "XK",
					style: k({ display: e.config.displayPath.XK }),
					d: "m533.5 334-.2.7h-.3l-.2-1.4-.7-.4-.6-1 .5-.9.7-.2.4-1.3.5-.2.4.5.5.3.4.6.5.2.5.7h.4l-.3.9-.3.4v.3l-.6.1z",
					onClick: n[684] ||= (t) => e.onClick(t),
					onDblclick: n[685] ||= (t) => e.onDblClick(),
					onMouseenter: n[686] ||= (t) => e.onEnter(t),
					onMouseleave: n[687] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Yemen",
					class: "YE",
					style: k({ display: e.config.displayPath.YE }),
					d: "m624.2 416.3-2 .8-.6 1.3v1l-2.9 1.2-4.5 1.4-2.5 2-1.2.1-.8-.1-1.7 1.2-1.8.5-2.3.2-.7.1-.6.8-.8.2-.4.7H600l-.9.3-2-.1-.7-1.7.1-1.5-.4-.9-.6-2.1-.8-1.2.6-.1-.3-1.4.3-.5-.1-1.3 1.2-1-.3-1.1.8-1.5 1.1.8.8-.3h3.2l.5.3 2.8.2 1-.1.7 1 1.3-.5 2-3 2.7-1.4 8-1.1 2.3 4.8z",
					onClick: n[688] ||= (t) => e.onClick(t),
					onDblclick: n[689] ||= (t) => e.onDblClick(),
					onMouseenter: n[690] ||= (t) => e.onEnter(t),
					onMouseleave: n[691] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "South Africa",
					class: "ZA",
					style: k({ display: e.config.displayPath.ZA }),
					d: "m563.6 548.7-.5.5-1.2 1.6-.8 1.7-1.6 2.3-3.2 3.4-2 2-2 1.5-3 1.3-1.4.1-.4 1-1.7-.5-1.4.6-3-.7-1.7.5-1.2-.2-2.8 1.3-2.4.5-1.8 1.3-1.2.1-1.2-1.2h-1l-1.2-1.6-.1.5-.4-1v-1.9l-.9-2.2 1-.6-.2-2.5-1.8-3-1.4-2.8-2-4.2 1.3-1.5 1.1.8.5 1.4 1.3.2 1.7.6 1.5-.2 2.5-1.6v-11.6l.8.5 1.7 3-.3 1.8.6 1.1 2-.3 1.4-1.4 1.4-1 .6-1.4 1.4-.7 1.2.4 1.3.8 2.3.2 1.8-.7.3-1 .5-1.5 1.5-.2.8-1.2 1-2 2.5-2.3 4-2.2h1.1l1.4.5 1-.3 1.4.3 1.3 4.2.8 2.2-.5 3.4.2 1.2-1.4-.6-.8.2-.3 1-.7 1v1.2l1.7 1.7 1.6-.4.6-1.4h2l-.6 2.3-.3 2.7-.8 1.4zm-7.1-1-1.2-1-1.3.7-1.5 1.3-1.5 2 2 2.5 1-.3.6-1 1.5-.6.5-1 .9-1.6z",
					onClick: n[692] ||= (t) => e.onClick(t),
					onDblclick: n[693] ||= (t) => e.onDblClick(),
					onMouseenter: n[694] ||= (t) => e.onEnter(t),
					onMouseleave: n[695] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Zambia",
					class: "ZM",
					style: k({ display: e.config.displayPath.ZM }),
					d: "m567.1 489.2 1.3 1.3.7 2.4-.4.7-.6 2.3.5 2.4-.8 1-.9 2.6 1.5.8-8.5 2.4.2 2-2 .4-1.7 1.2-.3 1-1 .2-2.5 2.4-1.5 1.9h-1l-.9-.3-3.1-.3-.5-.2v-.3l-1.1-.6-1.9-.2-2.3.7-1.8-1.8-1.9-2.4.1-9.2h5.9l-.2-1 .4-1-.5-1.3.3-1.4-.3-.9h1l.1 1 1.3-.1 1.8.3 1 1.2 2.2.4 1.7-.9.6 1.5 2.2.4 1 1.3 1.2 1.5h2.1l-.2-3-.8.5-2-1.1-.7-.5.4-2.9.4-3.3-.6-1.3.8-1.8.8-.3 3.7-.5 1.1.3 1.2.7 1.1.5 1.8.5z",
					onClick: n[696] ||= (t) => e.onClick(t),
					onDblclick: n[697] ||= (t) => e.onDblClick(),
					onMouseenter: n[698] ||= (t) => e.onEnter(t),
					onMouseleave: n[699] ||= (t) => e.onLeave(t)
				}, null, 36),
				I("path", {
					id: "Zimbabwe",
					class: "ZW",
					style: k({ display: e.config.displayPath.ZW }),
					d: "m562.7 527-1.5-.3-1 .4-1.3-.6h-1.1l-1.8-1.3-2.2-.5-.8-1.9v-1l-1.2-.4-3.2-3.2-.9-1.7-.5-.5-1.1-2.4 3.1.3 1 .4.9-.1 1.5-1.9 2.5-2.4 1-.2.3-1 1.6-1.2 2.1-.4.2 1.1h2.4l1.3.6.6.7 1.3.2 1.5 1v3.6l-.6 2-.1 2.3.4.8-.3 1.8-.4.2-.7 2.2z",
					onClick: n[700] ||= (t) => e.onClick(t),
					onDblclick: n[701] ||= (t) => e.onDblClick(),
					onMouseenter: n[702] ||= (t) => e.onEnter(t),
					onMouseleave: n[703] ||= (t) => e.onLeave(t)
				}, null, 36)
			], 8, Nw)], 8, Mw));
		}
	}
}, Fw = {
	name: "MapChart",
	components: {
		MapInfo: sw,
		...Pw
	},
	mixins: [{ methods: {
		...uv.methods,
		formatNumber: Y_
	} }],
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
			default: ""
		},
		level: {
			type: String,
			default: "dep"
		},
		name: {
			type: String,
			default: "Données"
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
			isAca: !1,
			isWorld: !1,
			zoomDep: "",
			InfoProps: {
				localisation: "",
				level: "",
				names: [],
				min: 0,
				max: 0,
				colorMin: "",
				colorMax: "",
				value: 0,
				valueNat: null,
				date: ""
			},
			MapProps: {
				viewBox: "0 0 1010 1010",
				displayPath: {},
				colorStroke: "#FFFFFF"
			},
			tooltip: {
				top: "0px",
				left: "0px",
				visibility: "hidden",
				value: null,
				place: ""
			},
			displayFrance: "",
			displayGuadeloupe: "",
			displayMartinique: "",
			displayMayotte: "",
			displayReunion: "",
			displayGuyane: "",
			dromColor: "#6b6b6b",
			targetReady: !1
		};
	},
	watch: {
		$props: {
			handler() {
				this.widgetId && this.createChart();
			},
			deep: !0,
			immediate: !0
		},
		targetReady(e) {
			e && this.$nextTick(() => {
				this.createChart();
			});
		}
	},
	created() {
		this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1e3)}`, this.isDep = this.level === "dep", this.isReg = this.level === "reg", this.isAca = this.level === "aca", this.isWorld = this.level === "monde";
	},
	mounted() {
		if (!this.databoxId || !this.databoxType) this.createChart(), this.$forceUpdate();
		else {
			let e = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
			document.getElementById(e) ? this.targetReady = !0 : (this._targetObserver = new MutationObserver(() => {
				document.getElementById(e) && (this._targetObserver.disconnect(), this.targetReady = !0);
			}), this._targetObserver.observe(document.body, {
				childList: !0,
				subtree: !0
			}));
		}
		document.documentElement.addEventListener("dsfr.theme", (e) => {
			this.widgetId !== "" && this.changeColors(e.detail.theme);
		});
	},
	beforeUnmount() {
		this._targetObserver && this._targetObserver.disconnect();
	},
	methods: {
		createChart() {
			let e = this.$refs[this.widgetId];
			try {
				this.dataParse = JSON.parse(this.data);
			} catch (e) {
				console.error("Erreur lors du parsing des données data:", e);
				return;
			}
			let t = this.choosePalette();
			this.colorLeft = t[0], this.colorRight = t[t.length - 1], this.InfoProps.colorMin = this.colorLeft, this.InfoProps.colorMax = this.colorRight, this.InfoProps.date = this.date, this.InfoProps.names = this.name;
			let n = [], r = [];
			if (this.MapProps.displayPath = {}, this.zoomDep) {
				let e = this.zoomDep.split(" ");
				for (let t of e) if (this.dataParse[t] !== void 0) {
					if (this.isDep) {
						let e = this.getDep(t).region_value;
						r = this.getDepsFromReg(e);
					} else if (this.isReg) r = this.getAllReg();
					else if (this.isAca) r = this.getAllAca();
					else if (this.isWorld) {
						let e = this.getCountry(t).continent_value;
						r = this.getCountriesFromContinent(e);
					}
				}
				for (let e of r) n.push(this.dataParse[e]);
			} else for (let e in this.dataParse) n.push(this.dataParse[e]);
			n = n.filter((e) => e != null), this.scaleMin = n.length > 0 ? Math.min(...n) : 0, this.scaleMax = n.length > 0 ? Math.max(...n) : 0;
			let i = FS.scale([this.colorLeft, this.colorRight]).domain([this.scaleMin, this.scaleMax]), a = [], o = [], s = [], c = [];
			for (let t in this.dataParse) {
				let n = this.isAca || this.isWorld ? t : `FR-${t}`, l = e.getElementsByClassName(n);
				if (l.length === 0) {
					console.warn(`L'élément de la carte n'existe pas pour la valeur ${n}, veuillez le supprimer de vos données.`);
					continue;
				}
				if (!this.zoomDep) l[0].setAttribute("fill", i(this.dataParse[t])), l[0].setAttribute("stroke", this.MapProps.colorStroke), l[0].setAttribute("stroke-width", "0.2%"), this.MapProps.displayPath[n] = "";
				else {
					let e = l[0].getBBox(), u = this.zoomDep.split(" ");
					for (let d of u) this.dataParse[d] !== void 0 && (d === t ? (l[0].setAttribute("fill", i(this.dataParse[d])), l[0].setAttribute("stroke", "#1212FF"), l[0].setAttribute("stroke-width", 2), l[0].parentNode.appendChild(l[0]), this.MapProps.displayPath[n] = "", a.push(e.x), s.push(e.y), o.push(e.x + e.width), c.push(e.y + e.height)) : r.includes(t) ? (l[0].setAttribute("fill", i(this.dataParse[t]).alpha(.6)), l[0].setAttribute("stroke", this.MapProps.colorStroke), l[0].setAttribute("stroke-width", "0.2%"), this.MapProps.displayPath[n] = "", a.push(e.x), s.push(e.y), o.push(e.x + e.width), c.push(e.y + e.height)) : (l[0].setAttribute("fill", "rgba(255, 255, 255, 0)"), this.MapProps.displayPath[n] = "none"));
				}
			}
			if (this.zoomDep) {
				let e = this.zoomDep.split(" ");
				for (let t of e) {
					if (this.dataParse[t] === void 0) continue;
					let e = Math.min(...a), n = Math.min(...s), r = Math.max(...o), i = Math.max(...c), l = r - e, u = i - n, d = Math.max(l, u);
					this.MapProps.viewBox = `${e} ${n} ${d} ${d}`, this.InfoProps.level = "en France", this.isDep ? this.InfoProps.localisation = this.getDep(t).department : this.isReg ? this.InfoProps.localisation = this.getReg(t).region : this.isAca ? this.InfoProps.localisation = this.getAca(t).academy : this.isWorld && (this.InfoProps.level = "dans le monde", this.InfoProps.localisation = this.getCountry(t).country), this.InfoProps.value = this.value, this.InfoProps.valueNat = this.dataParse[t], this.isDep && (this.displayFrance = "none", this.displayGuadeloupe = "none", this.displayMartinique = "none", this.displayMayotte = "none", this.displayReunion = "none", this.displayGuyane = "none", t === "971" ? this.displayGuadeloupe = "" : t === "972" ? this.displayMartinique = "" : t === "973" ? this.displayGuyane = "" : t === "974" ? this.displayReunion = "" : t === "976" ? this.displayMayotte = "" : this.displayFrance = "");
				}
			} else this.isWorld ? (this.InfoProps.localisation = "Monde", this.InfoProps.level = "dans le monde", this.MapProps.viewBox = "0 0 1010 710") : (this.InfoProps.localisation = "France", this.InfoProps.level = "en France", this.MapProps.viewBox = "0 0 1010 1010"), this.InfoProps.value = this.value, this.InfoProps.valueNat = null, this.displayFrance = "", this.displayGuadeloupe = "", this.displayMartinique = "", this.displayMayotte = "", this.displayReunion = "", this.displayGuyane = "";
			this.InfoProps.names = this.name, this.InfoProps.min = this.scaleMin, this.InfoProps.max = this.scaleMax, this.InfoProps.colorMin = this.colorLeft, this.InfoProps.colorMax = this.colorRight;
		},
		displayTooltip(e) {
			if (X_()) return;
			let t = this.$refs[this.widgetId], n = e.target.className.baseVal, r = n.replace("FR-", "").split(" "), i = t.getElementsByClassName(n);
			i[0].style.opacity = .8, this.tooltip.value = null;
			for (let e of r) this.dataParse[e] !== void 0 && (this.tooltip.value = this.dataParse[e]), this.isDep && this.getDep(e) ? this.tooltip.place = this.getDep(e).department : this.isReg && this.getReg(e) ? this.tooltip.place = this.getReg(e).region : this.isAca && this.getAca(e) ? this.tooltip.place = this.getAca(e).academy : this.isWorld && this.getCountry(e) && (this.tooltip.place = this.getCountry(e).country);
			let a = t.querySelector(".map_container").getBoundingClientRect(), o = t.querySelector(".map_tooltip").getBoundingClientRect(), s = e.target.getBoundingClientRect(), c = window.innerWidth > 1e3 ? window.innerWidth / 30 : window.innerWidth / 15, l = s.x - a.x + o.width - c, u = s.y - a.y;
			l + o.width + c > a.x && (l = s.x / 2 - a.x + o.width + c / 2), this.tooltip.top = `${u}px`, this.tooltip.left = `${l}px`, this.tooltip.visibility = "visible";
		},
		hideTooltip(e) {
			if (X_()) return;
			this.tooltip.visibility = "hidden";
			let t = this.$refs[this.widgetId], n = e.target.className.baseVal, r = t.getElementsByClassName(n);
			r[0].style.opacity = 1;
		},
		changeGeoLevel(e) {
			this.zoomDep = e.target.className.baseVal.replace("FR-", ""), this.createChart();
		},
		resetGeoFilters() {
			this.zoomDep = "", this.createChart();
		},
		choosePalette() {
			return YS(this.selectedPalette);
		},
		changeColors(e) {
			e === "light" ? (this.dromColor = "#6b6b6b", this.MapProps.colorStroke = "#FFFFFF") : (this.dromColor = "#cecece", this.MapProps.colorStroke = "#161616"), this.createChart();
		}
	}
}, Iw = { class: "fr-col-12 fr-col-lg-9 align-stretch" }, Lw = { class: "map" }, Rw = { class: "tooltip_header fr-text--sm fr-mb-0" }, zw = { class: "tooltip_body" }, Bw = { class: "tooltip_value-content" }, Vw = { class: "tooltip_value" }, Hw = {
	key: 3,
	class: "map_container no_select"
}, Uw = {
	key: 4,
	class: "map_sub_container fr-grid-row no_select"
};
function Ww(e, t, n, r, i, a) {
	let o = Ar("MapInfo"), s = Ar("france"), c = Ar("france-reg"), l = Ar("france-aca"), u = Ar("world"), d = Ar("guadeloupe"), f = Ar("martinique"), p = Ar("guyane"), m = Ar("reunion"), h = Ar("mayotte");
	return !n.databoxId || i.targetReady ? (P(), ia(er, {
		key: 0,
		to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource,
		disabled: !n.databoxId
	}, [I("div", {
		ref: i.widgetId,
		class: "widget_container fr-grid-row"
	}, [L(o, { data: i.InfoProps }, null, 8, ["data"]), I("div", Iw, [i.zoomDep ? (P(), F("button", {
		key: 0,
		class: "fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w",
		onClick: t[0] ||= (...e) => a.resetGeoFilters && a.resetGeoFilters(...e)
	}, " Retour ")) : R("", !0), I("div", Lw, [
		I("div", {
			class: "map_tooltip",
			style: k({
				top: i.tooltip.top,
				left: i.tooltip.left,
				visibility: i.tooltip.visibility
			})
		}, [I("div", Rw, A(i.tooltip.place), 1), I("div", zw, [I("div", Bw, [I("div", Vw, A(e.formatNumber(i.tooltip.value)), 1)])])], 4),
		i.isDep ? (P(), F("div", {
			key: 0,
			class: "map_container no_select",
			style: k({ display: i.displayFrance })
		}, [L(s, {
			config: i.MapProps,
			"on-click": a.changeGeoLevel,
			"on-dbl-click": a.resetGeoFilters,
			"on-enter": a.displayTooltip,
			"on-leave": a.hideTooltip
		}, null, 8, [
			"config",
			"on-click",
			"on-dbl-click",
			"on-enter",
			"on-leave"
		])], 4)) : R("", !0),
		i.isReg ? (P(), F("div", {
			key: 1,
			class: "map_container no_select",
			style: k({ display: i.displayFrance })
		}, [L(c, {
			config: i.MapProps,
			"on-click": a.changeGeoLevel,
			"on-dbl-click": a.resetGeoFilters,
			"on-enter": a.displayTooltip,
			"on-leave": a.hideTooltip
		}, null, 8, [
			"config",
			"on-click",
			"on-dbl-click",
			"on-enter",
			"on-leave"
		])], 4)) : R("", !0),
		i.isAca ? (P(), F("div", {
			key: 2,
			class: "map_container no_select",
			style: k({ display: i.displayFrance })
		}, [L(l, {
			config: i.MapProps,
			"on-click": a.changeGeoLevel,
			"on-dbl-click": a.resetGeoFilters,
			"on-enter": a.displayTooltip,
			"on-leave": a.hideTooltip
		}, null, 8, [
			"config",
			"on-click",
			"on-dbl-click",
			"on-enter",
			"on-leave"
		])], 4)) : R("", !0),
		i.isWorld ? (P(), F("div", Hw, [L(u, {
			config: i.MapProps,
			"on-click": a.changeGeoLevel,
			"on-dbl-click": a.resetGeoFilters,
			"on-enter": a.displayTooltip,
			"on-leave": a.hideTooltip
		}, null, 8, [
			"config",
			"on-click",
			"on-dbl-click",
			"on-enter",
			"on-leave"
		])])) : R("", !0),
		i.isWorld ? R("", !0) : (P(), F("div", Uw, [
			I("div", {
				class: "drom fr-col-sm",
				style: k({ display: i.displayGuadeloupe })
			}, [I("span", {
				class: "fr-text--xs fr-my-1w",
				style: k({ color: i.dromColor })
			}, " Guadeloupe ", 4), L(d, {
				height: "50",
				config: i.MapProps,
				"on-click": a.changeGeoLevel,
				"on-dbl-click": a.resetGeoFilters,
				"on-enter": a.displayTooltip,
				"on-leave": a.hideTooltip
			}, null, 8, [
				"config",
				"on-click",
				"on-dbl-click",
				"on-enter",
				"on-leave"
			])], 4),
			I("div", {
				class: "drom fr-col-sm",
				style: k({ display: i.displayMartinique })
			}, [I("span", {
				class: "fr-text--xs fr-my-1w",
				style: k({ color: i.dromColor })
			}, " Martinique ", 4), L(f, {
				height: "50",
				config: i.MapProps,
				"on-click": a.changeGeoLevel,
				"on-dbl-click": a.resetGeoFilters,
				"on-enter": a.displayTooltip,
				"on-leave": a.hideTooltip
			}, null, 8, [
				"config",
				"on-click",
				"on-dbl-click",
				"on-enter",
				"on-leave"
			])], 4),
			I("div", {
				class: "drom fr-col-sm",
				style: k({ display: i.displayGuyane })
			}, [I("span", {
				class: "fr-text--xs fr-my-1w",
				style: k({ color: i.dromColor })
			}, " Guyane ", 4), L(p, {
				height: "50",
				config: i.MapProps,
				"on-click": a.changeGeoLevel,
				"on-dbl-click": a.resetGeoFilters,
				"on-enter": a.displayTooltip,
				"on-leave": a.hideTooltip
			}, null, 8, [
				"config",
				"on-click",
				"on-dbl-click",
				"on-enter",
				"on-leave"
			])], 4),
			I("div", {
				class: "drom fr-col-sm",
				style: k({ display: i.displayReunion })
			}, [I("span", {
				class: "fr-text--xs fr-my-1w",
				style: k({ color: i.dromColor })
			}, " La Réunion ", 4), L(m, {
				height: "50",
				config: i.MapProps,
				"on-click": a.changeGeoLevel,
				"on-dbl-click": a.resetGeoFilters,
				"on-enter": a.displayTooltip,
				"on-leave": a.hideTooltip
			}, null, 8, [
				"config",
				"on-click",
				"on-dbl-click",
				"on-enter",
				"on-leave"
			])], 4),
			I("div", {
				class: "drom fr-col-sm",
				style: k({ display: i.displayMayotte })
			}, [I("span", {
				class: "fr-text--xs fr-my-1w",
				style: k({ color: i.dromColor })
			}, " Mayotte ", 4), L(h, {
				height: "50",
				config: i.MapProps,
				"on-click": a.changeGeoLevel,
				"on-dbl-click": a.resetGeoFilters,
				"on-enter": a.displayTooltip,
				"on-leave": a.hideTooltip
			}, null, 8, [
				"config",
				"on-click",
				"on-dbl-click",
				"on-enter",
				"on-leave"
			])], 4)
		]))
	])])], 512)], 8, ["to", "disabled"])) : R("", !0);
}
var Gw = /*#__PURE__*/ Sv(Fw, [["render", Ww], ["__scopeId", "data-v-799105ff"]]), Kw = {
	name: "MapChartReg",
	components: {
		MapInfo: sw,
		...Pw
	},
	mixins: [{ methods: {
		...uv.methods,
		formatNumber: Y_
	} }],
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
			default: ""
		},
		region: {
			type: String,
			required: !0
		},
		name: {
			type: String,
			default: "Données"
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
				level: "",
				names: [],
				min: 0,
				max: 0,
				colorMin: "",
				colorMax: "",
				value: 0,
				valueReg: null,
				date: ""
			},
			MapProps: {
				viewBox: "0 0 1010 1010",
				displayPath: {},
				colorStroke: "#FFFFFF"
			},
			tooltip: {
				top: "0px",
				left: "0px",
				visibility: "hidden",
				value: null,
				place: ""
			},
			displayFrance: "",
			displayGuadeloupe: "",
			displayMartinique: "",
			displayMayotte: "",
			displayReunion: "",
			displayGuyane: "",
			dromColor: "#6b6b6b",
			targetReady: !1
		};
	},
	watch: {
		$props: {
			handler() {
				this.widgetId && this.createChart();
			},
			deep: !0,
			immediate: !0
		},
		targetReady(e) {
			e && this.$nextTick(() => {
				this.createChart();
			});
		}
	},
	created() {
		this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1e3)}`;
	},
	mounted() {
		if (!this.databoxId || !this.databoxType) this.createChart(), this.$forceUpdate();
		else {
			let e = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
			document.getElementById(e) ? this.targetReady = !0 : (this._targetObserver = new MutationObserver(() => {
				document.getElementById(e) && (this._targetObserver.disconnect(), this.targetReady = !0);
			}), this._targetObserver.observe(document.body, {
				childList: !0,
				subtree: !0
			}));
		}
		document.documentElement.addEventListener("dsfr.theme", (e) => {
			this.widgetId !== "" && this.changeColors(e.detail.theme);
		});
	},
	beforeUnmount() {
		this._targetObserver && this._targetObserver.disconnect();
	},
	methods: {
		createChart() {
			let e = this.$refs[this.widgetId];
			try {
				this.dataParse = JSON.parse(this.data);
			} catch (e) {
				console.error("Erreur lors du parsing des données data:", e);
				return;
			}
			let t = this.choosePalette();
			this.colorLeft = t[0], this.colorRight = t[t.length - 1], this.InfoProps.colorMin = this.colorLeft, this.InfoProps.colorMax = this.colorRight, this.InfoProps.date = this.date, this.InfoProps.names = this.name;
			let n = [];
			this.MapProps.displayPath = {};
			let r = this.getDepsFromReg(this.region);
			for (let e of r) this.dataParse[e] !== void 0 && n.push(this.dataParse[e]);
			n = n.filter((e) => e != null), this.scaleMin = n.length > 0 ? Math.min(...n) : 0, this.scaleMax = n.length > 0 ? Math.max(...n) : 0;
			let i = FS.scale([this.colorLeft, this.colorRight]).domain([this.scaleMin, this.scaleMax]), a = [], o = [], s = [], c = [];
			for (let t of this.getAllDep()) {
				let n = `FR-${t}`, r = e.getElementsByClassName(n);
				if (r.length === 0) {
					console.warn(`L'élément de la carte n'existe pas pour la valeur ${n}, veuillez le supprimer de vos données.`);
					continue;
				}
				r[0].setAttribute("fill", "rgba(255, 255, 255, 0)"), this.MapProps.displayPath[n] = "none";
			}
			for (let t of r) {
				let n = `FR-${t}`, l = e.getElementsByClassName(n);
				if (l.length === 0) {
					console.warn(`L'élément de la carte n'existe pas pour la valeur ${n}, veuillez le supprimer de vos données.`);
					continue;
				}
				if (!this.zoomDep) {
					if (r.includes(t)) {
						let e = l[0].getBBox();
						l[0].setAttribute("fill", i(this.dataParse[t])), l[0].setAttribute("stroke", this.MapProps.colorStroke), l[0].setAttribute("stroke-width", "0.2%"), this.MapProps.displayPath[n] = "", a.push(e.x), s.push(e.y), o.push(e.x + e.width), c.push(e.y + e.height);
					}
				} else if (this.zoomDep === t) {
					let e = l[0].getBBox();
					l[0].setAttribute("fill", i(this.dataParse[t])), l[0].setAttribute("stroke", "#1212FF"), l[0].setAttribute("stroke-width", 2), l[0].parentNode.appendChild(l[0]), this.MapProps.displayPath[n] = "", a.push(e.x), s.push(e.y), o.push(e.x + e.width), c.push(e.y + e.height);
				} else if (r.includes(t)) {
					let e = l[0].getBBox();
					l[0].setAttribute("fill", i(this.dataParse[t]).alpha(.6)), l[0].setAttribute("stroke", this.MapProps.colorStroke), l[0].setAttribute("stroke-width", "0.2%"), this.MapProps.displayPath[n] = "", a.push(e.x), s.push(e.y), o.push(e.x + e.width), c.push(e.y + e.height);
				}
			}
			if (a.length && s.length && o.length && c.length) {
				let e = Math.min(...a), t = Math.min(...s), n = Math.max(...o), r = Math.max(...c), i = n - e, l = r - t, u = Math.max(i, l);
				this.MapProps.viewBox = `${e} ${t} ${u} ${u}`;
			}
			this.InfoProps.level = `dans la région ${this.getReg(this.region).region}`, this.zoomDep ? this.InfoProps.localisation = this.getDep(this.zoomDep).department : this.InfoProps.localisation = this.getReg(this.region).region, this.InfoProps.value = this.value, this.InfoProps.valueReg = this.dataParse[this.zoomDep], this.displayFrance = "none", this.displayGuadeloupe = "none", this.displayMartinique = "none", this.displayMayotte = "none", this.displayReunion = "none", this.displayGuyane = "none", this.region === "971" ? this.displayGuadeloupe = "" : this.region === "972" ? this.displayMartinique = "" : this.region === "973" ? this.displayGuyane = "" : this.region === "974" ? this.displayReunion = "" : this.region === "976" ? this.displayMayotte = "" : this.displayFrance = "", this.InfoProps.min = this.scaleMin, this.InfoProps.max = this.scaleMax;
		},
		displayTooltip(e) {
			if (X_()) return;
			let t = this.$refs[this.widgetId], n = e.target.className.baseVal, r = n.replace("FR-", "").split(" "), i = t.getElementsByClassName(n);
			i[0].style.opacity = .8, this.tooltip.value = null;
			for (let e of r) this.dataParse[e] !== void 0 && (this.tooltip.value = this.dataParse[e]), this.getDep(e) && (this.tooltip.place = this.getDep(e).department);
			let a = t.querySelector(".map_container").getBoundingClientRect(), o = t.querySelector(".map_tooltip").getBoundingClientRect(), s = e.target.getBoundingClientRect(), c = window.innerWidth > 1e3 ? window.innerWidth / 30 : window.innerWidth / 15, l = s.x - a.x + o.width - c, u = s.y - a.y;
			l + o.width + c > a.x && (l = s.x / 2 - a.x + o.width + c / 2), this.tooltip.top = `${u}px`, this.tooltip.left = `${l}px`, this.tooltip.visibility = "visible";
		},
		hideTooltip(e) {
			if (X_()) return;
			this.tooltip.visibility = "hidden";
			let t = this.$refs[this.widgetId], n = e.target.className.baseVal, r = t.getElementsByClassName(n);
			r[0].style.opacity = 1;
		},
		changeGeoLevel(e) {
			this.zoomDep = e.target.className.baseVal.replace("FR-", "").split(" ")[0], this.createChart();
		},
		resetGeoFilters() {
			this.zoomDep = "", this.createChart();
		},
		choosePalette() {
			return YS(this.selectedPalette);
		},
		changeColors(e) {
			e === "light" ? (this.dromColor = "#6b6b6b", this.MapProps.colorStroke = "#FFFFFF") : (this.dromColor = "#cecece", this.MapProps.colorStroke = "#161616"), this.createChart();
		}
	}
}, qw = { class: "fr-col-12 fr-col-lg-9 align-stretch" }, Jw = { class: "map" }, Yw = { class: "tooltip_header fr-text--sm fr-mb-0" }, Xw = { class: "tooltip_body" }, Zw = { class: "tooltip_value-content" }, Qw = { class: "tooltip_value" }, $w = { class: "map_sub_container fr-grid-row no_select" };
function eT(e, t, n, r, i, a) {
	let o = Ar("MapInfo"), s = Ar("france"), c = Ar("guadeloupe"), l = Ar("martinique"), u = Ar("guyane"), d = Ar("reunion"), f = Ar("mayotte");
	return !n.databoxId || i.targetReady ? (P(), ia(er, {
		key: 0,
		to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource,
		disabled: !n.databoxId
	}, [I("div", {
		ref: i.widgetId,
		class: "widget_container fr-grid-row"
	}, [L(o, { data: i.InfoProps }, null, 8, ["data"]), I("div", qw, [i.zoomDep ? (P(), F("button", {
		key: 0,
		class: "fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w",
		onClick: t[0] ||= (...e) => a.resetGeoFilters && a.resetGeoFilters(...e)
	}, " Retour ")) : R("", !0), I("div", Jw, [
		I("div", {
			class: "map_tooltip",
			style: k({
				top: i.tooltip.top,
				left: i.tooltip.left,
				visibility: i.tooltip.visibility
			})
		}, [I("div", Yw, A(i.tooltip.place), 1), I("div", Xw, [I("div", Zw, [I("div", Qw, A(e.formatNumber(i.tooltip.value)), 1)])])], 4),
		I("div", {
			class: "map_container no_select",
			style: k({ display: i.displayFrance })
		}, [L(s, {
			config: i.MapProps,
			"on-click": a.changeGeoLevel,
			"on-dbl-click": a.resetGeoFilters,
			"on-enter": a.displayTooltip,
			"on-leave": a.hideTooltip
		}, null, 8, [
			"config",
			"on-click",
			"on-dbl-click",
			"on-enter",
			"on-leave"
		])], 4),
		I("div", $w, [
			I("div", {
				class: "drom fr-col-sm",
				style: k({ display: i.displayGuadeloupe })
			}, [L(c, {
				config: i.MapProps,
				"on-click": a.changeGeoLevel,
				"on-dbl-click": a.resetGeoFilters,
				"on-enter": a.displayTooltip,
				"on-leave": a.hideTooltip
			}, null, 8, [
				"config",
				"on-click",
				"on-dbl-click",
				"on-enter",
				"on-leave"
			])], 4),
			I("div", {
				class: "drom fr-col-sm",
				style: k({ display: i.displayMartinique })
			}, [L(l, {
				config: i.MapProps,
				"on-click": a.changeGeoLevel,
				"on-dbl-click": a.resetGeoFilters,
				"on-enter": a.displayTooltip,
				"on-leave": a.hideTooltip
			}, null, 8, [
				"config",
				"on-click",
				"on-dbl-click",
				"on-enter",
				"on-leave"
			])], 4),
			I("div", {
				class: "drom fr-col-sm",
				style: k({ display: i.displayGuyane })
			}, [L(u, {
				config: i.MapProps,
				"on-click": a.changeGeoLevel,
				"on-dbl-click": a.resetGeoFilters,
				"on-enter": a.displayTooltip,
				"on-leave": a.hideTooltip
			}, null, 8, [
				"config",
				"on-click",
				"on-dbl-click",
				"on-enter",
				"on-leave"
			])], 4),
			I("div", {
				class: "drom fr-col-sm",
				style: k({ display: i.displayReunion })
			}, [L(d, {
				config: i.MapProps,
				"on-click": a.changeGeoLevel,
				"on-dbl-click": a.resetGeoFilters,
				"on-enter": a.displayTooltip,
				"on-leave": a.hideTooltip
			}, null, 8, [
				"config",
				"on-click",
				"on-dbl-click",
				"on-enter",
				"on-leave"
			])], 4),
			I("div", {
				class: "drom fr-col-sm",
				style: k({ display: i.displayMayotte })
			}, [L(f, {
				config: i.MapProps,
				"on-click": a.changeGeoLevel,
				"on-dbl-click": a.resetGeoFilters,
				"on-enter": a.displayTooltip,
				"on-leave": a.hideTooltip
			}, null, 8, [
				"config",
				"on-click",
				"on-dbl-click",
				"on-enter",
				"on-leave"
			])], 4)
		])
	])])], 512)], 8, ["to", "disabled"])) : R("", !0);
}
var tT = /*#__PURE__*/ Sv(Kw, [["render", eT], ["__scopeId", "data-v-7d429ca9"]]);
//#endregion
//#region src/components/PieChart.vue
J.register(pp, hp, Mh);
var nT = {
	name: "PieChart",
	mixins: [lv],
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
		subX: {
			type: String,
			default: null
		},
		subY: {
			type: String,
			default: null
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
			selectedIndex: -1,
			datasets: [],
			labels: [],
			xparse: [],
			yparse: [],
			subXParse: [],
			subYParse: [],
			nameParse: [],
			tmpColorParse: [],
			colorParse: [],
			colorHover: [],
			isSubChart: !1,
			isSubLevel: !1,
			subTitle: null,
			targetReady: !1
		};
	},
	watch: {
		$props: {
			handler() {
				this.chartId && (this.resetData(), this.getData(), this.createChart());
			},
			deep: !0,
			immediate: !0
		},
		targetReady(e) {
			e && this.$nextTick(() => {
				this.resetData(), this.createChart();
			});
		}
	},
	created() {
		cv(), this.chartId = `dsfr-chart-${Math.floor(Math.random() * 1e3)}`, this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1e3)}`;
	},
	mounted() {
		if (!this.databoxId || !this.databoxType) this.resetData(), this.createChart();
		else {
			let e = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
			document.getElementById(e) ? this.targetReady = !0 : (this._targetObserver = new MutationObserver(() => {
				document.getElementById(e) && (this._targetObserver.disconnect(), this.targetReady = !0);
			}), this._targetObserver.observe(document.body, {
				childList: !0,
				subtree: !0
			}));
		}
		document.documentElement.addEventListener("dsfr.theme", (e) => {
			this.chartId !== "" && this.changeColors(e.detail.theme);
		});
	},
	beforeUnmount() {
		this._targetObserver && this._targetObserver.disconnect();
	},
	methods: {
		resetData() {
			this.chart && this.chart.destroy(), this.datasets = [], this.labels = [], this.xparse = [], this.yparse = [], this.subXParse = [], this.subYParse = [], this.nameParse = [], this.tmpColorParse = [], this.colorParse = [], this.colorHover = [];
		},
		getData() {
			try {
				this.xparse = JSON.parse(this.x), this.yparse = JSON.parse(this.y), this.subXParse = JSON.parse(this.subX), this.subYParse = JSON.parse(this.subY);
			} catch (e) {
				console.error("Erreur lors du parsing des données x ou y:", e);
				return;
			}
			this.subXParse && this.subYParse && (this.isSubChart = !0);
			let e = [];
			if (this.name) try {
				e = JSON.parse(this.name);
			} catch (e) {
				console.error("Erreur lors du parsing de name:", e);
			}
			this.nameParse = [];
			for (let t = 0; t < this.yparse[0].length; t++) e[t] ? this.nameParse.push(e[t]) : this.nameParse.push(`Série ${t + 1}`);
			this.labels = this.xparse[0], this.loadColors(), this.datasets = this.yparse.map((e, t) => ({
				data: e,
				borderColor: this.colorParse[t],
				backgroundColor: this.colorParse[t],
				hoverBorderColor: this.colorHover[t],
				hoverBackgroundColor: this.colorHover[t]
			}));
		},
		createChart() {
			this.chart && this.chart.destroy(), this.getData();
			let e = this.$refs[this.chartId].getContext("2d");
			this.chart = new J(e, {
				type: [
					!0,
					"true",
					""
				].includes(this.fill) ? "pie" : "doughnut",
				data: {
					labels: this.labels,
					datasets: this.datasets
				},
				options: {
					aspectRatio: this.aspectRatio,
					layout: { padding: {
						left: 50,
						right: 50,
						top: 0,
						bottom: 0
					} },
					plugins: {
						legend: { display: !1 },
						tooltip: {
							enabled: !1,
							displayColors: !1,
							backgroundColor: "#6b6b6b",
							callbacks: {
								label: (e) => this.datasets.map((t) => this.formatNumber(t.data[e.dataIndex])),
								title: (e) => e[0].label,
								labelTextColor: () => this.colorParse
							},
							external: (e) => {
								let t = (document.getElementById(`${this.databoxId}-${this.databoxType}-${this.databoxSource}`) ?? this.$el.nextElementSibling).querySelector(".tooltip"), n = e.tooltip;
								if (!t) return;
								if (!n || n.opacity === 0) {
									t.style.opacity = 0;
									return;
								}
								if (t.classList.remove("above", "below", "no-transform"), n.yAlign ? t.classList.add(n.yAlign) : t.classList.add("no-transform"), n.body) {
									let e = n.title || [], r = n.body.map((e) => e.lines), i = t.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
									i.innerText = e[0];
									let a = t.querySelector(".tooltip_value");
									a.innerHTML = "", r[0].forEach((e, t) => {
										if (e && e !== "NaN" && n.dataPoints[t]) {
											let { datasetIndex: r, dataIndex: i } = n.dataPoints[t], o = this.colorParse[r] ? this.colorParse[r][i] : "#000", s = `${e}${this.unitTooltip ? ` ${this.unitTooltip}` : ""}`;
											a.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" data-color="${o}"></span>
                          <p class="tooltip_place fr-mb-0">${s}</p>
                        </div>
                      `, a.querySelectorAll(".tooltip_dot").forEach((e) => {
												e.style.backgroundColor = e.getAttribute("data-color");
											});
										}
									});
								}
								let { offsetLeft: r, offsetTop: i } = this.chart.canvas, a = Number(this.chart.canvas.style.width.replace(/\D/g, "")), o = Number(this.chart.canvas.style.height.replace(/\D/g, "")), s = r + n.caretX + 10, c = i + n.caretY - 20;
								s + t.clientWidth > r + a && (s = r + n.caretX - t.clientWidth - 10), c + t.clientHeight > i + .9 * o && (c = i + n.caretY - t.clientHeight + 20), s < r && (s = r + n.caretX - t.clientWidth / 2, c = i + n.caretY - t.clientHeight - 20), t.style.position = "absolute", t.style.padding = `${n.padding}px ${n.padding}px`, t.style.pointerEvents = "none", t.style.left = `${s}px`, t.style.top = `${c}px`, t.style.opacity = 1;
							}
						}
					},
					onClick: (e) => {
						if (!this.subYParse) return;
						let t = this.chart.getElementsAtEventForMode(e, "nearest", { intersect: !0 }, !0);
						if (t.length > 0) {
							let { index: e } = t[0], n = this.chart.data.labels[e];
							if (!this.subYParse[e]) return;
							this.subTitle || (this.subTitle = n, this.nameParse = this.subXParse[e]), this.subYParse[e] && !this.isSubLevel && (this.updateChart(e), this.isSubLevel = !0, this.selectedIndex = e);
						}
					}
				}
			});
		},
		loadColors() {
			let e = this.yparse;
			(this.selectedPalette === "" || this.selectedPalette === "categorical") && (e = this.yparse[0]);
			let { colorParse: t, colorHover: n } = LS({
				yparse: e,
				tmpColorParse: this.tmpColorParse,
				selectedPalette: this.selectedPalette
			});
			this.colorParse = [t.flat()], this.colorHover = [n.flat()];
		},
		choosePalette() {
			return YS(this.selectedPalette);
		},
		changeColors(e) {
			this.loadColors(), this.chart.data.datasets.forEach((e, t) => {
				e.borderColor = this.colorParse[t], e.backgroundColor = this.colorParse[t], e.hoverBorderColor = this.colorHover[t], e.hoverBackgroundColor = this.colorHover[t];
			}), this.chart.update("none");
		},
		updateChart(e) {
			let t = this.subYParse[e];
			!t || t.length === 0 || (this.chart.data.labels = this.subXParse[e], this.chart.data.datasets[0].data = this.subYParse[e], this.chart.update());
		},
		resetSub() {
			this.isSubLevel = !1, this.subTitle = null;
			let e = [];
			if (this.name) try {
				e = JSON.parse(this.name);
			} catch (e) {
				console.error("Erreur lors du parsing de name:", e);
			}
			this.nameParse = [];
			for (let t = 0; t < this.yparse[0].length; t++) e[t] ? this.nameParse.push(e[t]) : this.nameParse.push(`Série ${t + 1}`);
			this.chart.data.labels = this.xparse[0], this.chart.data.datasets[0].data = this.yparse[0], this.chart.update(), this.selectedIndex = -1;
		}
	}
}, rT = ["data-index", "data-sub-chart"], iT = { class: "fr-col-12" }, aT = { class: "chart" }, oT = {
	key: 1,
	class: "fr-mb-0"
}, sT = ["aria-labelledby", "aria-label"], cT = { class: "chart_legend fr-mb-0 fr-mt-4v" }, lT = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, uT = {
	key: 0,
	class: "flex fr-mt-1w"
}, dT = { class: "fr-text--xs" };
function fT(e, t, n, r, i, a) {
	return !n.databoxId || i.targetReady ? (P(), ia(er, {
		key: 0,
		to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource,
		disabled: !n.databoxId
	}, [I("div", {
		ref: i.widgetId,
		class: "widget_container fr-grid-row",
		"data-index": i.selectedIndex,
		"data-sub-chart": i.isSubChart
	}, [I("div", iT, [I("div", aT, [
		t[1] ||= I("div", { class: "tooltip" }, [I("div", { class: "tooltip_header fr-text--sm fr-mb-0" }), I("div", { class: "tooltip_body" }, [I("div", { class: "tooltip_value" })])], -1),
		i.isSubChart ? (P(), F("div", {
			key: 0,
			class: he(i.isSubLevel ? "" : "fr-mt-6v"),
			style: {
				textAlign: "center",
				position: "relative"
			}
		}, [i.isSubLevel ? (P(), F("button", {
			key: 0,
			class: "fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w",
			style: {
				position: "absolute",
				left: 0
			},
			onClick: t[0] ||= (...e) => a.resetSub && a.resetSub(...e)
		}, " Retour ")) : R("", !0), i.subTitle ? (P(), F("p", oT, A(i.subTitle), 1)) : R("", !0)], 2)) : R("", !0),
		I("canvas", {
			ref: i.chartId,
			role: "img",
			"aria-labelledby": n.databoxId ? "title-" + n.databoxId : null,
			"aria-label": n.databoxId ? null : "Diagramme circulaire"
		}, null, 8, sT),
		I("div", cT, [(P(!0), F(N, null, Fr(i.nameParse, (t, n) => (P(), F("div", {
			key: n,
			class: "flex fr-mt-3v fr-mb-1v"
		}, [I("span", {
			class: "legend_dot",
			style: k({ "background-color": i.colorParse[0][n] })
		}, null, 4), I("p", lT, A(e.capitalize(t)), 1)]))), 128)), n.date ? (P(), F("div", uT, [I("p", dT, "Mise à jour : " + A(n.date), 1)])) : R("", !0)])
	])])], 8, rT)], 8, ["to", "disabled"])) : R("", !0);
}
var pT = /*#__PURE__*/ Sv(nT, [["render", fT]]);
//#endregion
//#region src/components/RadarChart.vue
J.register(gp, M_);
var mT = {
	name: "RadarChart",
	mixins: [lv],
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
		scaleMin: {
			type: [Number, String],
			default: null
		},
		scaleMax: {
			type: [Number, String],
			default: null
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
			datasets: [],
			labels: [],
			xparse: [],
			yparse: [],
			nameParse: [],
			tmpColorParse: [],
			colorParse: [],
			colorHover: [],
			targetReady: !1
		};
	},
	watch: {
		$props: {
			handler() {
				this.chartId && (this.resetData(), this.getData(), this.createChart());
			},
			deep: !0,
			immediate: !0
		},
		targetReady(e) {
			e && this.$nextTick(() => {
				this.resetData(), this.createChart();
			});
		}
	},
	created() {
		cv(), this.chartId = `dsfr-chart-${Math.floor(Math.random() * 1e3)}`, this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1e3)}`;
	},
	mounted() {
		if (!this.databoxId || !this.databoxType) this.resetData(), this.createChart();
		else {
			let e = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
			document.getElementById(e) ? this.targetReady = !0 : (this._targetObserver = new MutationObserver(() => {
				document.getElementById(e) && (this._targetObserver.disconnect(), this.targetReady = !0);
			}), this._targetObserver.observe(document.body, {
				childList: !0,
				subtree: !0
			}));
		}
		document.documentElement.addEventListener("dsfr.theme", (e) => {
			this.chartId !== "" && this.changeColors(e.detail.theme);
		});
	},
	beforeUnmount() {
		this._targetObserver && this._targetObserver.disconnect();
	},
	methods: {
		resetData() {
			this.chart && this.chart.destroy(), this.datasets = [], this.labels = [], this.xparse = [], this.yparse = [], this.nameParse = [], this.tmpColorParse = [], this.colorParse = [], this.colorHover = [];
		},
		getData() {
			try {
				this.xparse = JSON.parse(this.x), this.yparse = JSON.parse(this.y);
			} catch (e) {
				console.error("Erreur lors du parsing des données x ou y:", e);
				return;
			}
			let e = [];
			if (this.name) try {
				e = JSON.parse(this.name);
			} catch (e) {
				console.error("Erreur lors du parsing de name:", e);
			}
			this.nameParse = [];
			for (let t = 0; t < this.yparse.length; t++) e[t] ? this.nameParse.push(e[t]) : this.nameParse.push(`Série ${t + 1}`);
			this.labels = this.xparse[0], this.loadColors(), this.datasets = this.yparse.map((e, t) => ({
				data: e,
				fill: !0,
				pointRadius: 5,
				pointHoverRadius: 5,
				borderColor: this.colorParse[t],
				backgroundColor: FS(this.colorParse[t]).alpha(.3).hex(),
				hoverBorderColor: this.colorHover[t],
				hoverBackgroundColor: this.colorHover[t],
				pointBorderColor: this.colorParse[t],
				pointBackgroundColor: this.colorParse[t],
				pointHoverBackgroundColor: this.colorHover[t],
				pointHoverBorderColor: this.colorHover[t]
			}));
		},
		loadColors() {
			let { colorParse: e, colorHover: t } = LS({
				yparse: this.yparse.map(() => [1]),
				tmpColorParse: this.tmpColorParse,
				selectedPalette: this.selectedPalette
			});
			this.colorParse = e.map((e) => e[0]), this.colorHover = t.map((e) => e[0]);
		},
		choosePalette() {
			return YS(this.selectedPalette);
		},
		changeColors(e) {
			this.loadColors(), this.chart.data.datasets.forEach((e, t) => {
				e.borderColor = this.colorParse[t], e.backgroundColor = FS(this.colorParse[t]).alpha(.3).hex(), e.hoverBorderColor = this.colorHover[t], e.hoverBackgroundColor = this.colorHover[t], e.pointBorderColor = this.colorParse[t], e.pointBackgroundColor = this.colorParse[t], e.pointHoverBackgroundColor = this.colorHover[t], e.pointHoverBorderColor = this.colorHover[t];
			}), this.chart.options.scales.r.pointLabels.color = e === "dark" ? "#cecece" : J.defaults.color, this.chart.update("none");
		},
		createChart() {
			this.chart && this.chart.destroy(), this.getData();
			let e = this.$refs[this.chartId].getContext("2d");
			this.chart = new J(e, {
				type: "radar",
				data: {
					labels: this.labels,
					datasets: this.datasets
				},
				options: {
					aspectRatio: this.aspectRatio,
					scales: { r: {
						angleLines: {
							display: !0,
							borderDash: [3, 3]
						},
						ticks: { display: !1 },
						grid: { color: "#6b6b6b" },
						suggestedMin: this.scaleMin,
						suggestedMax: this.scaleMax
					} },
					plugins: {
						legend: { display: !1 },
						tooltip: {
							enabled: !1,
							mode: "index",
							displayColors: !1,
							backgroundColor: "#6b6b6b",
							callbacks: {
								label: (e) => this.datasets.map((t) => this.formatNumber(t.data[e.dataIndex])),
								title: (e) => e[0].label,
								labelTextColor: () => this.colorParse
							},
							external: (e) => {
								let t = (document.getElementById(`${this.databoxId}-${this.databoxType}-${this.databoxSource}`) || this.$el.nextElementSibling).querySelector(".tooltip"), n = e.tooltip;
								if (!t) return;
								if (!n || n.opacity === 0) {
									t.style.opacity = 0;
									return;
								}
								if (t.classList.remove("above", "below", "no-transform"), n.yAlign ? t.classList.add(n.yAlign) : t.classList.add("no-transform"), n.body) {
									let e = [this.xparse[0][n.dataPoints[0].dataIndex]], r = n.body.map((e) => e.lines), i = t.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
									i.innerText = e[0];
									let a = t.querySelector(".tooltip_value");
									a.innerHTML = "", r[0].forEach((e, t) => {
										if (e && e !== "NaN") {
											let n = `${e}${this.unitTooltip ? ` ${this.unitTooltip}` : ""}`;
											a.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" data-color="${this.colorParse[t]}"></span>
                          <p class="tooltip_place fr-mb-0">${n}</p>
                        </div>
                      `, a.querySelectorAll(".tooltip_dot").forEach((e) => {
												e.style.backgroundColor = e.getAttribute("data-color");
											});
										}
									});
								}
								let { offsetLeft: r, offsetTop: i } = this.chart.canvas, a = Number(this.chart.canvas.style.width.replace(/\D/g, "")), o = Number(this.chart.canvas.style.height.replace(/\D/g, "")), s = r + n.caretX + 10, c = i + n.caretY - 20;
								s + t.clientWidth > r + a && (s = r + n.caretX - t.clientWidth - 10), c + t.clientHeight > i + .9 * o && (c = i + n.caretY - t.clientHeight + 20), s < r && (s = r + n.caretX - t.clientWidth / 2, c = i + n.caretY - t.clientHeight - 20), t.style.position = "absolute", t.style.padding = `${n.padding}px ${n.padding}px`, t.style.pointerEvents = "none", t.style.left = `${s}px`, t.style.top = `${c}px`, t.style.opacity = 1;
							}
						}
					}
				}
			});
		}
	}
}, hT = { class: "fr-col-12" }, gT = { class: "chart" }, _T = ["aria-labelledby", "aria-label"], vT = { class: "chart_legend fr-mb-0 fr-mt-4v" }, yT = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, bT = {
	key: 0,
	class: "flex fr-mt-1w"
}, xT = { class: "fr-text--xs" };
function ST(e, t, n, r, i, a) {
	return !n.databoxId || i.targetReady ? (P(), ia(er, {
		key: 0,
		to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource,
		disabled: !n.databoxId
	}, [I("div", {
		ref: i.widgetId,
		class: "widget_container fr-grid-row"
	}, [I("div", hT, [I("div", gT, [
		t[0] ||= I("div", { class: "tooltip" }, [I("div", { class: "tooltip_header fr-text--sm fr-mb-0" }), I("div", { class: "tooltip_body" }, [I("div", { class: "tooltip_value" })])], -1),
		I("canvas", {
			ref: i.chartId,
			role: "img",
			"aria-labelledby": n.databoxId ? "title-" + n.databoxId : null,
			"aria-label": n.databoxId ? null : "Diagramme en étoile"
		}, null, 8, _T),
		I("div", vT, [(P(!0), F(N, null, Fr(i.nameParse, (t, n) => (P(), F("div", {
			key: n,
			class: "flex fr-mt-3v fr-mb-1v"
		}, [I("span", {
			class: "legend_dot",
			style: k({ "background-color": i.colorParse[n] })
		}, null, 4), I("p", yT, A(e.capitalize(t)), 1)]))), 128))]),
		n.date ? (P(), F("div", bT, [I("p", xT, "Mise à jour : " + A(n.date), 1)])) : R("", !0)
	])])], 512)], 8, ["to", "disabled"])) : R("", !0);
}
var CT = /*#__PURE__*/ Sv(mT, [["render", ST]]);
//#endregion
//#region src/components/ScatterChart.vue
J.register(_p);
var wT = {
	name: "ScatterChart",
	mixins: [lv],
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
			datasets: [],
			labels: [],
			xAxisType: "",
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
			colorHover: [],
			targetReady: !1
		};
	},
	watch: {
		$props: {
			handler() {
				this.chartId && (this.resetData(), this.getData(), this.createChart());
			},
			deep: !0,
			immediate: !0
		},
		targetReady(e) {
			e && this.$nextTick(() => {
				this.resetData(), this.createChart();
			});
		}
	},
	created() {
		cv(), this.chartId = `dsfr-chart-${Math.floor(Math.random() * 1e3)}`, this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1e3)}`;
	},
	mounted() {
		if (!this.databoxId || !this.databoxType) this.resetData(), this.createChart();
		else {
			let e = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
			document.getElementById(e) ? this.targetReady = !0 : (this._targetObserver = new MutationObserver(() => {
				document.getElementById(e) && (this._targetObserver.disconnect(), this.targetReady = !0);
			}), this._targetObserver.observe(document.body, {
				childList: !0,
				subtree: !0
			}));
		}
		document.documentElement.addEventListener("dsfr.theme", (e) => {
			this.chartId !== "" && this.changeColors(e.detail.theme);
		});
	},
	beforeUnmount() {
		this._targetObserver && this._targetObserver.disconnect();
	},
	methods: {
		resetData() {
			this.chart && this.chart.destroy(), this.datasets = [], this.labels = [], this.xAxisType = "", this.xparse = [], this.yparse = [], this.nameParse = [], this.tmpColorParse = [], this.colorParse = [], this.vlineParse = [], this.vlineColorParse = [], this.tmpVlineColorParse = [], this.vlineNameParse = [], this.hlineParse = [], this.hlineColorParse = [], this.tmpHlineColorParse = [], this.hlineNameParse = [], this.colorHover = [];
		},
		getData() {
			try {
				this.xparse = JSON.parse(this.x), this.yparse = JSON.parse(this.y);
			} catch (e) {
				console.error("Erreur lors du parsing des données x ou y:", e);
				return;
			}
			let e = [];
			if (this.name) try {
				e = JSON.parse(this.name);
			} catch (e) {
				console.error("Erreur lors du parsing de name:", e);
			}
			this.nameParse = [];
			for (let t = 0; t < this.yparse.length; t++) e[t] ? this.nameParse.push(e[t]) : this.nameParse.push(`Série ${t + 1}`);
			if (this.vline) {
				this.vlineParse = JSON.parse(this.vline);
				let e = [];
				this.vlinename && (e = JSON.parse(this.vlinename)), this.vlinecolor && (this.tmpVlineColorParse = JSON.parse(this.vlinecolor));
				for (let t = 0; t < this.vlineParse.length; t++) e[t] ? this.vlineNameParse.push(e[t]) : this.vlineNameParse.push(`V${t + 1}`);
			}
			if (this.hline) {
				this.hlineParse = JSON.parse(this.hline);
				let e = [];
				this.hlinename && (e = JSON.parse(this.hlinename)), this.hlinecolor && (this.tmpHlineColorParse = JSON.parse(this.hlinecolor));
				for (let t = 0; t < this.hlineParse.length; t++) e[t] ? this.hlineNameParse.push(e[t]) : this.hlineNameParse.push(`H${t + 1}`);
			}
			this.labels = this.xparse[0], this.xAxisType = parseFloat(this.labels[0]) == this.labels[0] ? "linear" : "category", this.loadColors(), this.datasets = this.yparse.map((e, t) => ({
				data: e,
				fill: !1,
				pointRadius: 5,
				pointHoverRadius: 5,
				borderColor: this.colorParse[t],
				backgroundColor: this.colorParse[t],
				hoverBorderColor: this.colorHover[t],
				hoverBackgroundColor: this.colorHover[t],
				pointBorderColor: this.colorParse[t],
				pointBackgroundColor: this.colorParse[t],
				pointHoverBackgroundColor: this.colorHover[t],
				pointHoverBorderColor: this.colorHover[t],
				showLine: [
					!0,
					"true",
					""
				].includes(this.showLine),
				borderWidth: 2,
				tension: .4
			}));
		},
		createChart() {
			this.chart && this.chart.destroy(), this.getData();
			let e = this.$refs[this.chartId].getContext("2d");
			this.chart = new J(e, {
				type: "scatter",
				data: {
					labels: this.labels,
					datasets: this.datasets
				},
				plugins: [{
					afterDatasetDraw: (e) => {
						this.vlineParse && this.vlineParse.forEach((t, n) => {
							let { ctx: r } = e, i = e.scales.x.getPixelForValue(t);
							r.save(), r.beginPath(), r.moveTo(i, e.scales.y.bottom), r.strokeStyle = this.vlineColorParse[n], r.lineWidth = 3, r.setLineDash([10, 5]), r.lineTo(i, e.scales.y.top), r.stroke(), r.restore();
						}), this.hlineParse && this.hlineParse.forEach((t, n) => {
							let { ctx: r } = e, i = e.scales.y.getPixelForValue(t);
							r.save(), r.beginPath(), r.moveTo(e.scales.x.left, i), r.strokeStyle = this.hlineColorParse[n], r.lineWidth = 3, r.setLineDash([10, 5]), r.lineTo(e.scales.x.right, i), r.stroke(), r.restore();
						});
					},
					afterDraw: (e) => {
						if (e.tooltip?._active && e.tooltip?._active.length) {
							let { ctx: t } = e, { x: n } = e.tooltip.getActiveElements()[0].element.tooltipPosition(), { index: r } = e.tooltip._active[0];
							t.save(), t.beginPath(), t.moveTo(n, e.scales.y.top), t.lineTo(n, e.scales.y.bottom), t.lineWidth = 1, t.strokeStyle = this.colorPrecisionBar, t.setLineDash([10, 5]), t.stroke(), t.restore(), this.yparse.forEach((n) => {
								let i = e.scales.y.getPixelForValue(n[r]);
								t.save(), t.beginPath(), t.moveTo(e.scales.x.left, i), t.lineTo(e.scales.x.right, i), t.lineWidth = 1, t.strokeStyle = this.colorPrecisionBar, t.setLineDash([10, 5]), t.stroke(), t.restore();
							});
						}
					}
				}],
				options: {
					aspectRatio: this.aspectRatio,
					scales: {
						x: {
							offset: !0,
							type: this.xAxisType,
							grid: { drawOnChartArea: !1 },
							ticks: {
								padding: 10,
								callback: (e) => this.xAxisType === "category" ? this.labels[e] : e
							},
							...this.xMin ? { suggestedMin: this.xMin } : {},
							...this.xMax ? { suggestedMax: this.xMax } : {}
						},
						y: {
							grid: { drawTicks: !1 },
							border: { dash: [3] },
							ticks: {
								autoSkip: !1,
								padding: 5,
								maxTicksLimit: 5,
								callback: (e) => Math.abs(e) >= 1e9 ? `${e / 1e9}B` : Math.abs(e) >= 1e6 ? `${e / 1e6}M` : Math.abs(e) >= 1e3 ? `${e / 1e3}K` : e
							},
							...this.yMin ? { suggestedMin: this.yMin } : {},
							...this.yMax ? { suggestedMax: this.yMax } : {}
						}
					},
					plugins: {
						legend: { display: !1 },
						tooltip: {
							enabled: !1,
							displayColors: !1,
							backgroundColor: "#6b6b6b",
							callbacks: {
								label: (e) => this.datasets.map((t) => this.formatNumber(t.data[e.dataIndex])),
								title: (e) => e[0].label,
								labelTextColor: () => this.colorParse
							},
							external: (e) => {
								let t = (document.getElementById(`${this.databoxId}-${this.databoxType}-${this.databoxSource}`) || this.$el.nextElementSibling).querySelector(".tooltip"), n = e.tooltip;
								if (!t) return;
								if (!n || n.opacity === 0) {
									t.style.opacity = 0;
									return;
								}
								if (t.classList.remove("above", "below", "no-transform"), n.yAlign ? t.classList.add(n.yAlign) : t.classList.add("no-transform"), n.body) {
									let e = n.title || [], r = n.body.map((e) => e.lines), i = t.querySelector(".tooltip_header.fr-text--sm.fr-mb-0");
									i.innerText = e[0];
									let a = t.querySelector(".tooltip_value");
									a.innerHTML = "", r[0].forEach((e, t) => {
										if (e && e !== "NaN") {
											let n = `${e}${this.unitTooltip ? ` ${this.unitTooltip}` : ""}`;
											a.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" data-color="${this.colorParse[t]}"></span>
                          <p class="tooltip_place fr-mb-0">${n}</p>
                        </div>
                      `, a.querySelectorAll(".tooltip_dot").forEach((e) => {
												e.style.backgroundColor = e.getAttribute("data-color");
											});
										}
									});
								}
								let { offsetLeft: r, offsetTop: i } = this.chart.canvas, a = Number(this.chart.canvas.style.width.replace(/\D/g, "")), o = Number(this.chart.canvas.style.height.replace(/\D/g, "")), s = r + n.caretX + 10, c = i + n.caretY - 20;
								s + t.clientWidth > r + a && (s = r + n.caretX - t.clientWidth - 10), c + t.clientHeight > i + .9 * o && (c = i + n.caretY - t.clientHeight + 20), s < r && (s = r + n.caretX - t.clientWidth / 2, c = i + n.caretY - t.clientHeight - 20), t.style.position = "absolute", t.style.padding = `${n.padding}px ${n.padding}px`, t.style.pointerEvents = "none", t.style.left = `${s}px`, t.style.top = `${c}px`, t.style.opacity = 1;
							}
						}
					}
				}
			});
		},
		loadColors() {
			let { colorParse: e, colorHover: t, vlineColorParse: n, hlineColorParse: r } = zS({
				yparse: this.yparse,
				tmpColorParse: this.tmpColorParse,
				selectedPalette: this.selectedPalette,
				vlineParse: this.vlineParse,
				tmpVlineColorParse: this.tmpVlineColorParse,
				hlineParse: this.hlineParse,
				tmpHlineColorParse: this.tmpHlineColorParse
			});
			this.colorParse = e, this.colorHover = t, this.vlineColorParse = n, this.hlineColorParse = r;
		},
		choosePalette() {
			return YS(this.selectedPalette);
		},
		changeColors(e) {
			this.loadColors(), this.chart.data.datasets.forEach((e, t) => {
				e.borderColor = this.colorParse[t], e.backgroundColor = this.colorParse[t], e.hoverBorderColor = this.colorHover[t], e.hoverBackgroundColor = this.colorHover[t], e.pointBorderColor = this.colorParse[t], e.pointBackgroundColor = this.colorParse[t], e.pointHoverBorderColor = this.colorHover[t], e.pointHoverBackgroundColor = this.colorHover[t];
			}), this.chart.options.scales.x.ticks.color = e === "dark" ? "#cecece" : J.defaults.color, this.chart.options.scales.y.ticks.color = e === "dark" ? "#cecece" : J.defaults.color, this.chart.update("none");
		}
	}
}, TT = { class: "fr-col-12" }, ET = { class: "chart" }, DT = ["aria-labelledby", "aria-label"], OT = { class: "chart_legend fr-mb-0 fr-mt-4v" }, kT = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, AT = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, jT = { class: "fr-text--sm fr-text--bold fr-ml-1w fr-mb-0" }, MT = {
	key: 0,
	class: "flex fr-mt-1w"
}, NT = { class: "fr-text--xs" };
function PT(e, t, n, r, i, a) {
	return !n.databoxId || i.targetReady ? (P(), ia(er, {
		key: 0,
		to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource,
		disabled: !n.databoxId
	}, [I("div", {
		ref: i.widgetId,
		class: "widget_container fr-grid-row"
	}, [I("div", TT, [I("div", ET, [
		t[0] ||= I("div", { class: "tooltip" }, [I("div", { class: "tooltip_header fr-text--sm fr-mb-0" }), I("div", { class: "tooltip_body" }, [I("div", { class: "tooltip_value" })])], -1),
		I("canvas", {
			ref: i.chartId,
			role: "img",
			"aria-labelledby": n.databoxId ? "title-" + n.databoxId : null,
			"aria-label": n.databoxId ? null : "Nuage de points"
		}, null, 8, DT),
		I("div", OT, [(P(!0), F(N, null, Fr(i.nameParse, (t, n) => (P(), F("div", {
			key: n,
			class: "flex fr-mt-3v fr-mb-1v"
		}, [I("span", {
			class: "legend_dot",
			style: k({ "background-color": i.colorParse[n] })
		}, null, 4), I("p", kT, A(e.capitalize(t)), 1)]))), 128))]),
		(P(!0), F(N, null, Fr(i.hlineNameParse, (t, n) => (P(), F("div", {
			key: n,
			class: "flex fr-mt-3v"
		}, [
			I("span", {
				class: "legend_dash_line",
				style: k({ "background-color": i.hlineColorParse[n] })
			}, null, 4),
			I("span", {
				class: "legend_dash_line legend_dash_line_end",
				style: k({ "background-color": i.hlineColorParse[n] })
			}, null, 4),
			I("p", AT, A(e.capitalize(t)), 1)
		]))), 128)),
		(P(!0), F(N, null, Fr(i.vlineNameParse, (t, n) => (P(), F("div", {
			key: n,
			class: "flex fr-mt-3v fr-mb-1v"
		}, [
			I("span", {
				class: "legend_dash_line",
				style: k({ "background-color": i.vlineColorParse[n] })
			}, null, 4),
			I("span", {
				class: "legend_dash_line legend_dash_line_end",
				style: k({ "background-color": i.vlineColorParse[n] })
			}, null, 4),
			I("p", jT, A(e.capitalize(t)), 1)
		]))), 128)),
		n.date ? (P(), F("div", MT, [I("p", NT, "Mise à jour : " + A(n.date), 1)])) : R("", !0)
	])])], 512)], 8, ["to", "disabled"])) : R("", !0);
}
var FT = /*#__PURE__*/ Sv(wT, [["render", PT]]), IT = {
	name: "TableChart",
	mixins: [lv],
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
		subX: {
			type: String,
			default: null
		},
		subY: {
			type: String,
			default: null
		},
		line: {
			type: String,
			default: ""
		},
		maxOverflow: {
			type: [Number, String],
			default: 128
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
			subXParse: [],
			subYParse: [],
			lineParse: [],
			nameParse: [],
			selectedIndex: -1,
			targetReady: !1
		};
	},
	watch: {
		$props: {
			handler() {
				this.tableId && (this.resetData(), this.getData());
			},
			deep: !0,
			immediate: !0
		},
		targetReady(e) {
			e && this.$nextTick(() => {
				this.resetData(), this.getData(), this.observeRelatedChart();
			});
		}
	},
	created() {
		this.tableId = `dsfr-table-${Math.floor(Math.random() * 1e3)}`, this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1e3)}`;
	},
	mounted() {
		if (!this.databoxId || !this.databoxType) this.resetData(), this.getData(), this.observeRelatedChart();
		else {
			let e = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
			document.getElementById(e) ? this.targetReady = !0 : (this._targetObserver = new MutationObserver(() => {
				document.getElementById(e) && (this._targetObserver.disconnect(), this.targetReady = !0);
			}), this._targetObserver.observe(document.body, {
				childList: !0,
				subtree: !0
			}));
		}
	},
	beforeUnmount() {
		this._targetObserver && this._targetObserver.disconnect(), this._indexObserver && this._indexObserver.disconnect();
	},
	methods: {
		resetData() {
			this.xparse = [], this.yparse = [], this.lineParse = [], this.nameParse = [];
		},
		getData() {
			if (this.x && this.y) try {
				this.xparse = JSON.parse(this.x ?? "[]"), this.yparse = JSON.parse(this.y ?? "[]"), this.subXParse = JSON.parse(this.subX), this.subYParse = JSON.parse(this.subY);
			} catch (e) {
				console.error("Erreur lors du parsing des données x ou y:", e);
				return;
			}
			if (this.line) try {
				this.lineParse = JSON.parse(this.line ?? "[]");
			} catch (e) {
				console.error("Erreur lors du parsing des données line:", e);
				return;
			}
			let e = [];
			if (this.name) try {
				e = JSON.parse(this.name);
			} catch (e) {
				console.error("Erreur lors du parsing de name:", e);
			}
			this.nameParse = [];
			for (let t = 0; t < this.yparse.length; t++) e[t] ? this.nameParse.push(e[t]) : this.nameParse.push(`Série ${t + 1}`);
			for (let t = 0; t < (this.lineParse.length ? this.lineParse[0].length : 0); t++) e[t] ? this.nameParse.push(e[t]) : this.nameParse.push(`Série ${t + 1}`);
		},
		getClass(e) {
			let t = "";
			return typeof e == "string" && e.replace(/<[^>]*>/g, "").length > parseInt(this.maxOverflow) && (t += "cell-overflow "), typeof e == "number" ? t += "cell-number " : t += "cell-text ", t;
		},
		observeRelatedChart() {
			let e = this.databoxSource === "global" ? "default" : `${this.databoxSource}`, t = document.querySelector(`#${this.databoxId}-chart-${e} .widget_container`), n = {
				attributes: !0,
				subtree: !1,
				childList: !1
			};
			t && (this._indexObserver = new MutationObserver((e) => {
				for (let t of e) t.attributeName === "data-index" && (this.selectedIndex = parseInt(t.target.getAttribute("data-index")), this.selectedIndex === -1 ? (this.xparse = JSON.parse(this.x), this.yparse = JSON.parse(this.y)) : (this.xparse = this.subXParse[this.selectedIndex], this.yparse = [this.subYParse[this.selectedIndex]]));
			}), this._indexObserver.observe(t, n));
		}
	}
}, LT = { class: "fr-table__wrapper" }, RT = { class: "fr-table__container" }, zT = { class: "fr-table__content" }, BT = ["aria-labelledby", "aria-label"], VT = {
	key: 0,
	scope: "col"
}, HT = ["innerHTML"];
function UT(e, t, n, r, i, a) {
	return !n.databoxId || i.targetReady ? (P(), ia(er, {
		key: 0,
		to: "#" + n.databoxId + "-" + n.databoxType + "-" + n.databoxSource,
		disabled: !n.databoxId
	}, [I("div", {
		ref: i.widgetId,
		class: "widget_container"
	}, [I("div", {
		ref: i.tableId,
		class: "fr-table",
		style: {
			maxHeight: "30rem",
			overflow: "auto"
		}
	}, [I("div", LT, [I("div", RT, [I("div", zT, [I("table", {
		"aria-labelledby": n.databoxId ? "title-" + n.databoxId : null,
		"aria-label": n.databoxId ? null : "Tableau de données"
	}, [I("thead", null, [I("tr", null, [i.xparse.length ? (P(), F("th", VT, A(n.tableName), 1)) : R("", !0), (P(!0), F(N, null, Fr(i.nameParse, (e, t) => (P(), F("th", {
		key: t,
		scope: "col"
	}, A(e), 1))), 128))])]), I("tbody", null, [(P(!0), F(N, null, Fr(i.xparse, (t, n) => (P(), F("tr", { key: n }, [I("td", { class: he(a.getClass(t)) }, A(t), 3), (P(!0), F(N, null, Fr(i.yparse, (t, r) => (P(), F("td", {
		key: r,
		class: he(a.getClass(t[n]))
	}, A(e.formatNumber(t[n])), 3))), 128))]))), 128)), (P(!0), F(N, null, Fr(i.lineParse, (e, t) => (P(), F("tr", { key: t }, [(P(!0), F(N, null, Fr(e, (e, t) => (P(), F("td", {
		key: t,
		class: he(a.getClass(e)),
		innerHTML: e
	}, null, 10, HT))), 128))]))), 128))])], 8, BT)])])])], 512)], 512)], 8, ["to", "disabled"])) : R("", !0);
}
var WT = /*#__PURE__*/ Sv(IT, [["render", UT], ["__scopeId", "data-v-dc1a1148"]]);
customElements.define("data-box", /* @__PURE__ */ Oo(vy, { shadowRoot: !1 })), customElements.define("bar-chart", /* @__PURE__ */ Oo(sC, { shadowRoot: !1 })), customElements.define("bar-line-chart", /* @__PURE__ */ Oo(SC, { shadowRoot: !1 })), customElements.define("gauge-chart", /* @__PURE__ */ Oo(zC, { shadowRoot: !1 })), customElements.define("line-chart", /* @__PURE__ */ Oo(ZC, { shadowRoot: !1 })), customElements.define("map-chart", /* @__PURE__ */ Oo(Gw, { shadowRoot: !1 })), customElements.define("map-chart-reg", /* @__PURE__ */ Oo(tT, { shadowRoot: !1 })), customElements.define("pie-chart", /* @__PURE__ */ Oo(pT, { shadowRoot: !1 })), customElements.define("radar-chart", /* @__PURE__ */ Oo(CT, { shadowRoot: !1 })), customElements.define("scatter-chart", /* @__PURE__ */ Oo(FT, { shadowRoot: !1 })), customElements.define("table-chart", /* @__PURE__ */ Oo(WT, { shadowRoot: !1 }));
//#endregion
