if(Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var n=this.length;for("undefined"==typeof t&&(t=0),t=Number(t),t=0>t?Math.ceil(t):Math.floor(t),0>t&&(t+=n);n>t;t++)if(t in this&&this[t]===e)return t;return-1}),Array.prototype.filter||(Array.prototype.filter=function(e,t){var n=this.length;if("function"!=typeof e)throw new TypeError("filter: not a function");for(var r=new Array,i=0;n>i;i++)if(i in this){var o=this[i];e.call(t,o,i,this)&&r.push(o)}return r}),Array.prototype.forEach||(Array.prototype.forEach=function(e,t){var n=this.length;if("function"!=typeof e)throw new TypeError("forEach: not a function");for(var r=0;n>r;r++)r in this&&e.call(t,this[r],r,this)}),Array.prototype.every||(Array.prototype.every=function(e,t){var n=this.length;if("function"!=typeof e)throw new TypeError("every: not a function");for(var r=0;n>r;r++)if(r in this&&!e.call(t,this[r],r,this))return!1;return!0}),Array.prototype.map||(Array.prototype.map=function(e,t){var n=this.length;if("function"!=typeof e)throw new TypeError("map: not a function");for(var r=new Array(n),i=0;n>i;i++)i in this&&(r[i]=e.call(t,this[i],i,this));return r}),Array.prototype.some||(Array.prototype.some=function(e,t){var n=this.length;if("function"!=typeof e)throw new TypeError("some: not a function");for(var r=0;n>r;r++)if(r in this&&e.call(t,this[r],r,this))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(e,t){var n=this.length;if("function"!=typeof e)throw new TypeError("reduce: not a function ");var r,i=0;if("undefined"!=typeof t)r=t;else for(;;){if(i in this){r=this[i++];break}if(++i>=n)throw new TypeError("reduce: empty array")}for(;n>i;i++)i in this&&(r=e.call(null,r,this[i],i,this));return r}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(e,t){var n=this.length;if("function"!=typeof e)throw new TypeError("reduceRight: not a function");var r,i=n-1;if("undefined"!=typeof t)r=t;else for(;;){if(i in this){r=this[i--];break}if(--i<0)throw new TypeError("reduceRight: empty array")}for(;i>=0;i--)i in this&&(r=e.call(null,r,this[i],i,this));return r}),"undefined"==typeof GNN)var GNN={};!function(){var e=function(t,n){n=n||{};for(var r in n)null===t[r]||"object"!=typeof n[r]||"object"!=typeof t[r]?t[r]=n[r]:e(t[r],n[r]);return t};GNN.override=e;var t=function(e,t){var n=e||{};for(var r in t)"undefined"==typeof n[r]&&(n[r]=t[r]);return n};GNN.inherit=t;var n=function(e,t){for(var n in e)t(n,e[n])},r=function(){var e={},t=[];return t.push.apply(t,arguments),t.forEach(function(t){n(t,function(t,n){"undefined"==typeof e[t]&&(e[t]=n)})}),e};GNN.Hash=GNN.Hash||{},GNN.Hash.forEach=n,GNN.Hash.merge=r}(),["GNN",function(e){var t=this.pop();"undefined"==typeof e[t]&&(e[t]={});var n,r=e[t];n=r.URI=function i(e){if(!(this instanceof i))return new i(e);var t;new RegExp("^([^:]+)://").test(e)&&(t=RegExp.$1);var n=e.replace(new RegExp("^([^:]+)://"),"").split("/"),r=n.shift(),o={},a=n.pop(),c="?";a&&/[=?]/.test(a)?(/^(.*?)\?(.*)$/.test(a)&&(n.push(RegExp.$1),a=RegExp.$2),a.split(/&/).forEach(function(e){/^([^=]+)=(.*)$/.test(e)?o[RegExp.$1]=RegExp.$2:(o._flags=o._flags||[],o._flags.push(e))})):n.push(a),this.scheme=t,this.domain=r,this.local=n,this.params=o,this.q=c},n.prototype={data:function(){var e=[];for(var t in this.params)if("undefined"!=typeof this.params[t])if("_flags"==t)e=e.concat(this.params[t]);else{var r=this.params[t],i=n.encode(r+"");e.push(t+"="+(/%/.test(r)?r:i))}return e.join("&")},toLocalPath:function(){var e=this.data(),t=this.local.join("/");return"/"+(e.length?t+this.q+e:t)},toString:function(){var e=this.toLocalPath(),t=this.domain+e;return this.scheme&&(t=this.scheme+"://"+t),t}},n.prototype.constructor=n,n.encode=function(e,t){t=t||"[^\\w\\d]";for(var n="",r=e.length,i=0;r>i;i++){var o=e.charAt(i),a=e.charCodeAt(i);n+=!new RegExp("^"+t+"$").test(o)||o>255?o:"%"+a.toString(16)}return n},n.location=function(){return new n(location.href)},n.params=function(e){e=e||{};var t=n.location();for(var r in e)t.params[r]=e[r];return t}}].reverse()[0](this),["GNN",function(e){var t=this.pop();"undefined"==typeof e[t]&&(e[t]={});var n,r=e[t],i=r.URI;n=r.XHR=function(e,t,r){return n.get(e,t,r)},n.callback={},n.maxConnections=8,n.retryDelay=100,n.defaultTimeout=2e4;var o=[],a={q:[],push:function(e){this.q.push(e),1==this.q.length&&this.process()},pop:function(){if(o.length<n.maxConnections){var e=this.q.shift();return e&&e(),!0}return!1},process:function(){for(;this.q.length>0&&this.pop(););if(this.q.length>0){var e=this;setTimeout(function(){e.process()},n.retryDelay)}}},c=[XMLHttpRequest,JSON].every(function(e){return"undefined"!=typeof e}),u=function(e,t,r,c,u,s){r instanceof i||(r=new i(r+"")),c=c||function(){},u=u||function(){};var f={uri:r+""};f.callback=function(){var e=c.apply(null,arguments);return f.stop(),e},f.error=function(){var e=u.apply(null,arguments);return f.stop(),e},f.stop=function(){f.done=!0,o=o.filter(function(e){return!e.done})},"undefined"==typeof r.params.timestamp&&(r.params.timestamp=encodeURI(new Date)),"undefined"==typeof s&&(s=n.defaultTimeout);var l=function(){if(o.push(f),s&&setTimeout(function(){f.done||f.error("timeout",f,s)},s),!t(f,r)){var n=new XMLHttpRequest;f.req=n,f.stop_=f.stop,f.stop=function(){n.abort(),f.stop_(),f.callback=function(){},f.error=function(){}};var i=null;"POST"==e&&(i=r.data(),r.params={}),n.open(e,r+""),n.onreadystatechange=function(){4==n.readyState&&(200<=n.status&&n.status<300?f.callback(n):f.error("request",n))},n.send(i)}};return a.push(l),f},s=function(e,t,r,i){var o;"undefined"!=typeof t.timeout&&(o=t.timeout,delete t.timeout);var a=function(){};if("object"==typeof t.async){var c=t.async,u={};delete t.async;for(var s in c)c[s].done=!1;a=function(e,t){for(var n in c){var r=c[n].keys||[n];if(!u[n]&&r.every(function(t){return e.indexOf(t)<0})){u[n]=!0;var i=c[n].callback||c[n];"function"==typeof i&&i(t)}}}}r=r||function(){};var f=[],l={},p=!1,d={};for(var h in t)f.push(h);var v=f.concat([]);i=i||function(){};var y=function(e){return function(t){if("timeout"==t)v.length&&(f=[],p=!0,v.forEach(function(e){d[e]&&d[e].stop()}),i(t,d,v,arguments[2]));else{var n=Array.prototype.slice.apply(arguments);n.push([e]),i.apply(null,n)}}},m=function(){if(f.length>0){var i=f.shift();d[i]=n[e](t[i],function(e){l[i]=e,v=v.filter(function(e){return e!=i}),a(v,l),v.length||p||r(l)},y(i),o),setTimeout(m,0)}};return m(),{stop:function(){for(;v.length>0;)d[v.shift()].stop()}}};n.get=function(e,t,n,r){return u("GET",function(){return!1},e,t,n,r)},n.post=function(e,t,n,r){return u("POST",function(){return!1},e,t,n,r)},n.retrieve=function(e,t,n){return s("get",e,t,n)};var f=function(e,r){for(var i=[["%","_"],["-","_"],["\\*","_"],["\\.","_"]].reduce(function(e,t){return e.replace(new RegExp(t[0],"g"),t[1])},escape(encodeURIComponent(e.uri)));n.callback[i];)i+="_";e.stop_=e.stop,e.stop=function(){e.stop_(),delete n.callback[i]},n.callback[i]=e.callback,r.params.callback=[t,"XHR.callback",i].join("."),e.script=document.createElement("script"),e.script.src=r+"",e.script.type="text/javascript";var o=document.getElementsByTagName("head")[0];return o.appendChild(e.script),!0};n.json=function(e,t,n,r){var i=f;if(c){i=function(){return!1};var o=t||function(){};n=n||function(){},t=function(e){var t;try{t=JSON.parse(e.responseText)}catch(r){n("request",e)}o(t)}}return u("GET",i,e,t,n,r)},n.json.retrieve=function(e,t,n){return s("json",e,t,n)},n.jsonp=function(e,t,n,r){return u("GET",f,e,t,n,r)},n.jsonp.retrieve=function(e,t,n){return s("jsonp",e,t,n)}}].reverse()[0](this),"undefined"==typeof GNN.UI&&(GNN.UI={}),function(e){var t=GNN.Hash.forEach;e.doc=function(){return e.document||document},e.isNode=function(e){return e&&"number"==typeof e.nodeType},e.text=function(e){return e.textContent||e.innerText||""},e._$=function(t){return e.doc().getElementById(t)},e.$=function(t){return e.isNode(t)?t:e._$(t)},e.$new=function(n,r){var i=e.doc().createElement(n);if(r=r||{},r.id&&(i.id=r.id),r.klass&&(i.className=r.klass),t(r.style||{},function(e,t){i.style[e]=t}),r.attr)for(var o in r.attr)i.setAttribute(o,r.attr[o]);if("undefined"!=typeof r.child){r.child instanceof Array||(r.child=[r.child]);for(var a=0;a<r.child.length;a++){var c=e.$node(r.child[a]);i.appendChild(c)}}return i},e.$text=function(t){return("undefined"==typeof t||null==t)&&(t=""),e.doc().createTextNode(t+"")},e.$node=function(t){return e.isNode(t)?t:e.$text(t)},e.$select=function(t){t.klass||(t.klass=[]),t.klass instanceof Array||(t.klass=[t.klass]);for(var n=t.root||e.doc(),r=n.getElementsByTagName(t.tag),i=[],o=0;o<r.length;o++){var a=e.classNames(r[o]);t.klass.every(function(e){return a.indexOf(e)>=0})&&i.push(r[o])}return i},e.classNames=function(e){return(e.className||"").split(/\s+/)},e.hasClass=function(t,n){return e.classNames(t).indexOf(n)>=0},e.appendClass=function(t,n){t.className=e.classNames(t).filter(function(e){return e!=n}).concat([n]).join(" ")},e.removeClass=function(t,n){t.className=e.classNames(t).filter(function(e){return e!=n}).join(" ")},e.removeAllChildren=function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},e.replaceLastChild=function(e,t){var n=e.lastChild;n&&e.removeChild(n),e.appendChild(t)},e.insertText=function(e,t){var n=e.selectionStart,r=e.selectionEnd;if("number"==typeof n&&"number"==typeof r){var i=e.value.substring(0,n),o=e.value.substring(r);e.value=i+t+o,e.selectionStart=e.selectionEnd=n+t.length}else e.value+=t},e.getStyle=function(t,n){var r=(t.style||{})[n];if(!r){var i=e.doc().defaultView||{};if(i.getComputedStyle)try{var o=i.getComputedStyle(t,null);n=n.replace(/([A-Z])/g,"-$1").toLowerCase(),r=o?o.getPropertyValue(n):null}catch(a){return null}else t.currentStyle&&(r=t.currentStyle[n])}return r},e.getPosition=function(e){var t={x:0,y:0};do t.x+=e.offsetLeft,t.y+=e.offsetTop;while(e=e.offsetParent);return t},e.getMousePosition=function(t){if(-1!=navigator.userAgent.indexOf("Chrome/")&&navigator.userAgent.indexOf("Safari")>-1&&navigator.userAgent.indexOf("Version/")<0)return{x:t.clientX,y:t.clientY};var n={},r=e.doc().documentElement;return window.innerWidth?(n.x=window.pageXOffset,n.y=window.pageYOffset):r&&r.clientWidth?(n.x=r.scrollLeft,n.y=r.scrollTop):e.doc().body.clientWidth&&(n.x=e.doc().body.scrollLeft,n.y=e.doc().body.scrollTop),{x:t.clientX+n.x,y:t.clientY+n.y}},e.Event=function(t){var n={event:t};return n.mousePos=function(){return e.getMousePosition(n.event)},n.stopPropagation=function(){n.event.stopPropagation?n.event.stopPropagation():n.event.cancelBubble=!0},n.preventDefault=function(){n.event.preventDefault?n.event.preventDefault():n.event.returnValue=!1},n.stop=function(){n.stopPropagation(),n.preventDefault()},n.target=function(){return n.event.target||n.event.srcElement},n.disable=function(){n.target().disabled=!0},n.enable=function(){n.target().disabled=!1},n},e.Observer=function(t,n,r,i){var o={node:t,event:n},a=r;"string"==typeof i?a=r[i]:"undefined"!=typeof i&&(a=i);var c=function(t){return a.call(r,new e.Event(t))};return o.start=function(){o.node.addEventListener?(0===n.indexOf("on")&&(o.event=n.substr(2)),o.node.addEventListener(o.event,c,!1)):o.node.attachEvent&&o.node.attachEvent(o.event,c)},o.stop=function(){o.node.removeEventListener?o.node.removeEventListener(o.event,c,!1):o.node.detachEvent&&o.node.detachEvent(o.event,c)},o.start(),o}}(GNN.UI);var base=function(){var e=GNN.URI.location();return e.local.pop(),e.local.pop(),e},api=function(e,t){var n=base();return n.local.push("api"),n.local.push(e+".cgi"),n.params=t||{},n.refresh=function(){return delete n.params.timestamp,n},n},setTitle=function(e){["title","subtitle","institute"].forEach(function(t){var n=GNN.UI.$(t);n&&(GNN.UI.removeAllChildren(n),n.appendChild(GNN.UI.$text(e[t])))}),document.title=[e.subtitle,e.title].join(" - ")},addLinks=function(e){e=e||[];var t=GNN.UI.$("footer");t&&e.reverse().forEach(function(e){var n=GNN.UI.$new("a",{attr:{href:e.uri},child:e.label});t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n)})},reportFatalErrors=function(e){var t=GNN.UI.$new,n=function(e){if(e instanceof Array){var r=t("ul");return e.forEach(function(e){r.appendChild(t("li",{child:n(e)}))}),r}if("object"==typeof e){var i=t("dl");for(var o in e)i.appendChild(t("dt",{child:o})),i.appendChild(t("dd",{child:n(e[o])}));return i}return GNN.UI.$text(e+"")},r=GNN.UI.$("fatalerror");r.appendChild(t("h3",{child:"Error"}));var i=t("ul");e.forEach(function(e){var r=t("li",{child:e.message+" ("+e.reason+")"});e.detail&&r.appendChild(n(e.detail)),i.appendChild(r)}),r.appendChild(i)},jsonpFailure=function(e,t,n){var r={},i={uri:"preparing for request"};n.forEach(function(e){r[e]=(t[e]||i).uri}),reportFatalErrors([{message:"JSONP request failed:",reason:e,detail:r}])},apiPost=function(e,t,n,r){var i=function(e){var t=[];for(var n in e)t.push([n,e[n]].map(encodeURIComponent).join("="));return t.join(";")};n=n||function(){},r=r||function(){};var o=new XMLHttpRequest,a=api(e,{}),c="application/x-www-form-urlencoded";o.open("POST",a+""),o.setRequestHeader("Content-Type",c),o.onreadystatechange=function(){4==o.readyState&&(200<=o.status&&o.status<300?n(o):r(o))},o.send(i(t))},loadingIcon=function(){return GNN.UI.$new("img",{klass:"loading",attr:{src:"loading.gif"}})},makeExerciseSelector=function(e,t,n,r,i){var o=GNN.UI.$new,a=GNN.UI.Observer;r=r||"ex";var c=function(e,t){var c=r+e,u=o("input",{id:c,attr:{type:"checkbox",name:"ex",value:e}});if(i&&(new a(u,"onchange",i),new a(u,"onclick",i)),(n||[]).indexOf(e)>=0&&(u.checked=!0),t.level){for(var s="",f=t.level,l=0;f>l;l++)s+="★";e+="["+s+"]"}t.required&&(Math.abs(t.required)==(t.number||1)?(t.required>0&&(e+=" [必修]"),n||(u.checked=!0)):t.required instanceof Array||(e+=" [必修("+t.required+"問選択)]"));var p=o("label",{child:e,attr:{"for":c}});return{check:u,label:p}};t.forEach(function(t){var r=t[0],i=t[1]||{},u=o("li");i.sub&&i.sub.every(function(e){return(e[1]||{}).required})&&(i.required=i.sub.length,i.number=i.sub.length);var s=c(r+"",i);u.appendChild(s.check),u.appendChild(s.label);var f=[];if(i.sub){var l=o("ul");i.sub.forEach(function(e){var t=e[0],r=e[1]||{};i.required==i.sub.length&&(r.required=-1);var a=o("li"),u=c(t,r,n);a.appendChild(u.check),a.appendChild(u.label),l.appendChild(a),f.push(u.check)}),u.appendChild(l);var p=function(){s.check.checked=f.every(function(e){return e.checked})},d=function(e){var t=e.target().checked;f.forEach(function(e){e.checked=t})};f.forEach(function(e){new a(e,"onchange",p),new a(e,"onclick",p)}),new a(s.check,"onchange",d),new a(s.check,"onclick",d),p()}e.appendChild(u)})},deepEq=function(e,t){if(typeof e!=typeof t)return!1;if("object"==typeof e){if(e instanceof Array&&t instanceof Array){if(e.length!=t.length)return!1;for(var n=0;n<e.length;n++)if(!deepEq(e[n],t[n]))return!1;return!0}var r={};for(var i in e){if(!deepEq(e[i],t[i]))return!1;r[i]=!0}for(var o in t)if(!r[o])return!1;return!0}return e===t},init=function(){var e=GNN.UI.$,t=GNN.UI.$new,n=GNN.UI.$node,r=GNN.UI.$text,i=GNN.UI.Observer,o=function(){var o={},a=e("form");return new i(a,"onsubmit",function(t){""==e("file").value&&(t.stop(),alert("ファイルを選択して下さい"))}),o.reset=function(){if(o.unselectAll(),!o.selected){var t=e("report_id").value;t&&t.length&&o.scheme&&(o.selected=o.scheme.reduce(function(e,n){return n.id==t?n:e},null))}o.select(o.selected||(o.scheme||[])[0])},o.setScheme=function(n){return n.forEach(function(n){var a=e("selector"),c=t("li",{id:"button_"+n.id});a.appendChild(c);var u=t("a",{attr:{href:"."},child:r(n.name)});new i(u,"onclick",function(e){e.stop(),o.unselectAll(),o.select(n)}),c.appendChild(u)}),o.scheme=n,o},o.setSolved=function(e){return o.solved=e,o},o.unselect=function(t){var n=e("button_"+t);n.className=""},o.unselectAll=function(){o.scheme&&o.scheme.forEach(function(e){o.unselect(e.id)})},o.select=function(r){if(r){o.selected=r,e("report_id").value=r.id;var i=e("button_"+r.id);i.className="selected";var a=e("selected_report");GNN.UI.removeAllChildren(a),a.appendChild(n(r.name));var c=function(e){var r=t("li");switch(e.type){case"code":r.appendChild(t("code",{child:n(e.value)}));break;case"html":r.innerHTML=e.value;break;case"text":r.appendChild(n(e.value));break;default:return}return r},u=function(){var t=r.requirements;t&&t.dynamic&&t.dynamic.forEach(function(t){var n=e(t.target);if(n){GNN.UI.removeAllChildren(n);var r=t["default"];for(var i in t){var o=e("ex"+i);if(o&&o.checked){t[i].forEach(function(e){r=r.map(function(t){return t.name==e.name?e:t})});var a=t[i].filter(function(e){return!r.some(function(t){return t.name==e.name})});r=r.concat(a)}}r.forEach(function(e){var t=c(e);t&&n.appendChild(t)})}})},s=e("ex");GNN.UI.removeAllChildren(s);var f=o.solved||{};f=(f[r.id]||{}).solved||[],f.length<=0&&(f=null);var l=r.exercise||[];if(makeExerciseSelector(s,l,f,"ex",u),reqs=e("requirements"),GNN.UI.removeAllChildren(reqs),r.requirements){var p=r.requirements["static"];p&&p.forEach(function(e){node=c(e),node&&reqs.appendChild(node)})}u()}},o},a=new o,c={template:function(e){setTitle(e.template),addLinks(e.template.links)},master:function(t){var r=e("login");r.appendChild(n(t.master.user)),new GNN.XHR.json(api("user",{user:t.master.user,type:"status",status:"solved"}),function(e){e=e[0]||{};var n;e.token==t.master.token&&(n=e.report),a.setSolved(n||{}),a.reset()})},scheme:function(e){a.setScheme(e.scheme),a.reset();var t={async:{}};e.scheme.forEach(function(e){t[e.id]=api("scheme",{id:e.id,type:"post",exercise:!0}),t.async[e.id]=function(t){e.exercise=t[e.id][0].exercise,a.reset()}}),GNN.XHR.json.retrieve(t,null,jsonpFailure)},reqs:{keys:"scheme reqs".split(" "),callback:function(e){e.scheme.forEach(function(t){var n=e.reqs.requirements[t.id];n&&(t.requirements=n)}),a.reset()}}};GNN.XHR.json.retrieve({master:api("master",{year:!0,user:!0,token:!0}),template:api("template",{type:"none",links:!0}),scheme:api("scheme",{type:"post"}),reqs:api("template",{type:"post",requirements:!0}),async:c},null,jsonpFailure)};