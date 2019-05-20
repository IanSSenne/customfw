var globalThis = globalThis || this || window;
const _this = this || globalThis;
_this.__custom_fw__ = _this.__custom_fw__ || {};
let has_been_initialized = [];
const app_state = _this.__custom_fw__.state || new Map();
_this.__custom_fw__.state = app_state;

function mutationHandler(mutation) {
  let event = new Event("CustomElement" + mutation.type[0].toUpperCase() + mutation.type.substr(1), mutation);
  event.element = mutation.target;
  switch (mutation.type) {
    case "attributes":
      event.attributeName = mutation.attributeName;
      event.attributeValue = mutation.target.getAttribute(mutation.attributeName);
      break;
    case "childList":
      event.removedNodes = mutation.removedNodes;
      event.addedNodes = mutation.addedNodes;
      break;
  }
  mutation.target.dispatchEvent(event);
}
const mutationListener = _this.__custom_fw__.mutation || new MutationObserver(function (mutations) {
  mutations.forEach(mutationHandler);
});
_this.__custom_fw__.mutation = mutationListener;
let elements = [];
setInterval(() => {
  let el = elements.shift();
  if (!el.parentNode) {
    if (el.__interval__) {
      el.__interval__.forEach(el._clearinterval);
    }
    if (el.__timeout__) {
      el.__timeout__.forEach(el._cleartimeout);
    }
    el.dispatchEvent(new Event("CustomElementDestroyed"));
  }
  elements.push(el);
});
window.script_map = new Map;

function initialize(element, el_this, constructor, el_id) {
  mutationListener.observe(el_this, {
    attributes: true,
    childList: true
  });
  elements.push(el_this);
  Array.from(element.querySelectorAll("script")).map(el => {
    if (el.hasAttribute("init")) {
      if (has_been_initialized[el_id]) return -1;
      has_been_initialized[el_id] = true;
      new Function("constructor", "state", el.innerHTML)(constructor, app_state);
    } else {
      let _settimeout = $setTimeout.bind(el_this);
      let _setinterval = $setInterval.bind(el_this);
      let _cleartimeout = $clearTimeout.bind(el_this);
      let _clearinterval = $clearInterval.bind(el_this);
      el_this._cleartimeout = _cleartimeout;
      el_this._clearinterval = _clearinterval;
      let func = null;
      let hash = el.getAttribute("hash");
      if (script_map.has(hash)) {
        func = script_map.get(hash);
      } else {
        func = new Function("self", "constructor", "root", "state", "setTimout", "setInterval", "clearTimeout", "clearInterval", el.innerHTML);
        script_map.set(hash, func);
      }
      func(el_this, constructor, el_this.shadowRoot, app_state, _settimeout, _setinterval, _cleartimeout, _clearinterval);
    }
    el.parentNode.removeChild(el);
  });
}

function init(el) {
  let sd = el.attachShadow({
    mode: 'open'
  });
  sd.appendChild(el.constructor.template.content.cloneNode(true));
  initialize(sd, el, el.constructor, el.constructor.id);
}

function $setTimeout(func, delay) {
  console.log(this);
  this.__timeouts__ = this.__timeouts__ || [];
  let id = setTimeout(func, delay);
  this.__timeouts__.push(id);
  return id;
}

function $setInterval(func, delay) {
  console.log(this);
  this.__interval__ = this.__interval__ || [];
  let id = setInterval(func, delay);
  this.__interval__.push(id);
  return id;
}

function $clearInterval(id) {
  console.log(this);
  if (this.__interval__ && this.__interval__.includes(id)) this.__interval__.splice(this.__interval__.indexOf(id), 1);
}

function $clearTimeout(id) {
  console.log(this);
  if (this.__timeout__ && this.__timeout__.includes(id)) this.__timeout__.splice(this.__timeout__.indexOf(id), 1);
}