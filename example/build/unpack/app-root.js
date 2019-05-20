"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}function _possibleConstructorReturn(t,e){return!e||"object"!==_typeof(e)&&"function"!=typeof e?_assertThisInitialized(t):e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_setPrototypeOf(t,e)}function _wrapNativeSuper(t){var e="function"==typeof Map?new Map:void 0;return(_wrapNativeSuper=function(t){if(null===t||!_isNativeFunction(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return _construct(t,arguments,_getPrototypeOf(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(n,t)})(t)}function isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function _construct(t,e,n){return(_construct=isNativeReflectConstruct()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&_setPrototypeOf(o,n.prototype),o}).apply(null,arguments)}function _isNativeFunction(t){return-1!==Function.toString.call(t).indexOf("[native code]")}function _setPrototypeOf(t,e){return(_setPrototypeOf=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function _getPrototypeOf(t){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}!function(){var t=t||this||window,e=this||t;e.__custom_fw__=e.__custom_fw__||{};var n=[],r=e.__custom_fw__.state||new Map;function o(t){var e=new Event("CustomElement"+t.type[0].toUpperCase()+t.type.substr(1),t);switch(e.element=t.target,t.type){case"attributes":e.attributeName=t.attributeName,e.attributeValue=t.target.getAttribute(t.attributeName);break;case"childList":e.removedNodes=t.removedNodes,e.addedNodes=t.addedNodes}t.target.dispatchEvent(e)}e.__custom_fw__.state=r;var i=e.__custom_fw__.mutation||new MutationObserver(function(t){t.forEach(o)});e.__custom_fw__.mutation=i;var u=[];function a(t,e,o,a){i.observe(e,{attributes:!0,childList:!0}),u.push(e),Array.from(t.querySelectorAll("script")).map(function(t){if(t.hasAttribute("init")){if(n[a])return-1;n[a]=!0,new Function("constructor","state",t.innerHTML)(o,r)}else{var i=function(t,e){console.log(this),this.__timeouts__=this.__timeouts__||[];var n=setTimeout(t,e);return this.__timeouts__.push(n),n}.bind(e),u=function(t,e){console.log(this),this.__interval__=this.__interval__||[];var n=setInterval(t,e);return this.__interval__.push(n),n}.bind(e),s=function(t){console.log(this),this.__timeout__&&this.__timeout__.includes(t)&&this.__timeout__.splice(this.__timeout__.indexOf(t),1)}.bind(e),c=function(t){console.log(this),this.__interval__&&this.__interval__.includes(t)&&this.__interval__.splice(this.__interval__.indexOf(t),1)}.bind(e);e._cleartimeout=s,e._clearinterval=c;var _=null,l=t.getAttribute("hash");script_map.has(l)?_=script_map.get(l):(_=new Function("self","constructor","root","state","setTimout","setInterval","clearTimeout","clearInterval",t.innerHTML),script_map.set(l,_)),_(e,o,e.shadowRoot,r,i,u,s,c)}t.parentNode.removeChild(t)})}setInterval(function(){var t=u.shift();t.parentNode||(t.__interval__&&t.__interval__.forEach(t._clearinterval),t.__timeout__&&t.__timeout__.forEach(t._cleartimeout),t.dispatchEvent(new Event("CustomElementDestroyed"))),u.push(t)}),window.script_map=new Map;var s=document.createElement("template");s.setAttribute("for","app-root"),document.head.appendChild(s),s.innerHTML='<html><head><style> .wrapper { overflow: hidden; }li { list-style: none; }.wrapper>ul { padding-left: 0px; margin-top: 0px; }</style></head><body><div class="wrapper"> <ul> <li> <app-nav> <ul> <li> <a href="#home">home</a> </li> <li> <a href="#404">404</a> </li> </ul> </app-nav> </li> <li> <app-content></app-content> </li> </ul></div></body></html>',customElements.define("app-root",function(t){function e(){var t,n,r;return _classCallCheck(this,e),t=_possibleConstructorReturn(this,_getPrototypeOf(e).call(this)),n=_assertThisInitialized(t),(r=n.attachShadow({mode:"open"})).appendChild(n.constructor.template.content.cloneNode(!0)),a(r,n,n.constructor,n.constructor.id),t}return _inherits(e,_wrapNativeSuper(HTMLElement)),_createClass(e,null,[{key:"id",get:function(){return 6}},{key:"template",get:function(){return s}}]),e}())}();