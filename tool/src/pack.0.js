this.__custom_fw__ = this.__custom_fw__ || {};
let has_been_initialized = [];
const app_state = this.__custom_fw__.state || new Map();
this.__custom_fw__.state = app_state;

function mutationHandler(mutation) {
  let event = new Event("CustomElement" + mutation.type[0].toUpperCase() + mutation.type.substr(1), mutation);
  event.target = mutation.target;
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
const mutationListener = this.__custom_fw__.mutation || new MutationObserver(function (mutations) {
  mutations.forEach(mutationHandler);
});
this.__custom_fw__.mutation = mutationListener;

function initialize(element, el_this, constructor, el_id) {
  mutationListener.observe(el_this, {
    attributes: true,
    childList: true
  });
  Array.from(element.querySelectorAll("script")).map(el => {
    el.hasAttribute("init") ? (() => {
      if (has_been_initialized[el_id]) return -1;
      has_been_initialized[el_id] = true;
      new Function("constructor", "state", el.innerHTML)(constructor, app_state);
    })() : new Function("self", "constructor", "root", "state", el.innerHTML)(el_this, constructor, el_this.shadowRoot, app_state);
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