!function(){this.__custom_fw__=this.__custom_fw__||{};let t=[];const e=this.__custom_fw__.state||new Map;function n(t){let e=new Event("CustomElement"+t.type[0].toUpperCase()+t.type.substr(1),t);switch(e.target=t.target,t.type){case"attributes":e.attributeName=t.attributeName,e.attributeValue=t.target.getAttribute(t.attributeName);break;case"childList":e.removedNodes=t.removedNodes,e.addedNodes=t.addedNodes}t.target.dispatchEvent(e)}this.__custom_fw__.state=e;const o=this.__custom_fw__.mutation||new MutationObserver(function(t){t.forEach(n)});function r(n){let r=n.attachShadow({mode:"open"});var a,s,i,c;r.appendChild(n.constructor.template.content.cloneNode(!0)),a=r,s=n,i=n.constructor,c=n.constructor.id,o.observe(s,{attributes:!0,childList:!0}),Array.from(a.querySelectorAll("script")).map(n=>{n.hasAttribute("init")?(()=>{if(t[c])return-1;t[c]=!0,new Function("constructor","state",n.innerHTML)(i,e)})():new Function("self","constructor","root","state",n.innerHTML)(s,i,s.shadowRoot,e),n.parentNode.removeChild(n)})}this.__custom_fw__.mutation=o;const a=document.createElement("template");a.setAttribute("for","app-content"),document.head.appendChild(a),a.innerHTML='<html><head><style>#router{width:100vw;height:100%}</style><script>function updateContent(){let t=window.location.hash.substr(1),e="app-content-"+(t.length>0?t:"home"),n=root.querySelector("#router"),o=document.createElement(e);o.constructor===HTMLElement&&(o=document.createElement("app-content-404")).setAttribute("original-target",e),n.innerHTML="",n.appendChild(o)}updateContent(),window.addEventListener("hashchange",updateContent,!1);<\/script></head><body><div id="router"></div></body></html>',customElements.define("app-content",class extends HTMLElement{constructor(){super(),r(this)}static get id(){return 4}static get template(){return a}})}();