!function(){this.__custom_fw__=this.__custom_fw__||{};let t=[];const e=this.__custom_fw__.state||new Map;function o(t){let e=new Event("CustomElement"+t.type[0].toUpperCase()+t.type.substr(1),t);switch(e.target=t.target,t.type){case"attributes":e.attributeName=t.attributeName,e.attributeValue=t.target.getAttribute(t.attributeName);break;case"childList":e.removedNodes=t.removedNodes,e.addedNodes=t.addedNodes}t.target.dispatchEvent(e)}this.__custom_fw__.state=e;const n=this.__custom_fw__.mutation||new MutationObserver(function(t){t.forEach(o)});function r(o){let r=o.attachShadow({mode:"open"});var a,s,i,c;r.appendChild(o.constructor.template.content.cloneNode(!0)),a=r,s=o,i=o.constructor,c=o.constructor.id,n.observe(s,{attributes:!0,childList:!0}),Array.from(a.querySelectorAll("script")).map(o=>{o.hasAttribute("init")?(()=>{if(t[c])return-1;t[c]=!0,new Function("constructor","state",o.innerHTML)(i,e)})():new Function("self","constructor","root","state",o.innerHTML)(s,i,s.shadowRoot,e),o.parentNode.removeChild(o)})}this.__custom_fw__.mutation=n;const a=document.createElement("template");a.setAttribute("for","app-content-red"),document.head.appendChild(a),a.innerHTML="<html><head><style>div{background-image:linear-gradient(to bottom left,red,#00f);width:100%;height:-webkit-fill-available}</style></head><body><div></div></body></html>",customElements.define("app-content-red",class extends HTMLElement{constructor(){super(),r(this)}static get id(){return 3}static get template(){return a}})}();