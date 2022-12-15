var Se=Object.defineProperty,Ae=Object.defineProperties;var Be=Object.getOwnPropertyDescriptors;var fe=Object.getOwnPropertySymbols;var Te=Object.prototype.hasOwnProperty,ze=Object.prototype.propertyIsEnumerable;var pe=(t,e,o)=>e in t?Se(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,ge=(t,e)=>{for(var o in e||(e={}))Te.call(e,o)&&pe(t,o,e[o]);if(fe)for(var o of fe(e))ze.call(e,o)&&pe(t,o,e[o]);return t},ve=(t,e)=>Ae(t,Be(e));import{_ as ae,u as R}from"./base.82319d04.js";import{E as $e,o as Ie,a as Le,b as $,u as Oe}from"./el-checkbox.e25659ec.js";import{l as X,o as E,h as L,w as ee,p as Pe,J as je,a8 as Me,u as K,U as He,x as se,a9 as qe,A as G,R as ye,aa as V,f as w,V as S,ab as me,z as ke,ac as Re,a0 as Ue,r as B,W as de,X as le,c as O,a as N,ad as Ye,n as F,ae as I,i as Y,b as W,q as We,F as ue,G as be,af as Ne,g as Ee,ag as Ge,ah as Ve,m as Xe,t as _,_ as Je,d as T,e as Qe}from"./app.d6e58541.js";import{r as ie,a as Ze,E as et,l as tt,c as nt,f as ot}from"./index2.0308604b.js";import"./event2.e3c79b80.js";const at={name:"ElCollapseTransition"},rt=X(ve(ge({},at),{setup(t){const e=R("collapse-transition"),o={beforeEnter(n){n.dataset||(n.dataset={}),n.dataset.oldPaddingTop=n.style.paddingTop,n.dataset.oldPaddingBottom=n.style.paddingBottom,n.style.maxHeight=0,n.style.paddingTop=0,n.style.paddingBottom=0},enter(n){n.dataset.oldOverflow=n.style.overflow,n.scrollHeight!==0?(n.style.maxHeight=`${n.scrollHeight}px`,n.style.paddingTop=n.dataset.oldPaddingTop,n.style.paddingBottom=n.dataset.oldPaddingBottom):(n.style.maxHeight=0,n.style.paddingTop=n.dataset.oldPaddingTop,n.style.paddingBottom=n.dataset.oldPaddingBottom),n.style.overflow="hidden"},afterEnter(n){n.style.maxHeight="",n.style.overflow=n.dataset.oldOverflow},beforeLeave(n){n.dataset||(n.dataset={}),n.dataset.oldPaddingTop=n.style.paddingTop,n.dataset.oldPaddingBottom=n.style.paddingBottom,n.dataset.oldOverflow=n.style.overflow,n.style.maxHeight=`${n.scrollHeight}px`,n.style.overflow="hidden"},leave(n){n.scrollHeight!==0&&(n.style.maxHeight=0,n.style.paddingTop=0,n.style.paddingBottom=0)},afterLeave(n){n.style.maxHeight="",n.style.overflow=n.dataset.oldOverflow,n.style.paddingTop=n.dataset.oldPaddingTop,n.style.paddingBottom=n.dataset.oldPaddingBottom}};return(n,a)=>(E(),L(He,je({name:K(e).b()},Me(o)),{default:ee(()=>[Pe(n.$slots,"default")]),_:3},16,["name"]))}}));var te=ae(rt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/collapse-transition/src/collapse-transition.vue"]]);te.install=t=>{t.component(te.name,te)};const it=te,q="$treeNodeId",Ce=function(t,e){!e||e[q]||Object.defineProperty(e,q,{value:t.id,enumerable:!1,configurable:!1,writable:!1})},he=function(t,e){return t?e[t]:e[q]},ce=t=>{let e=!0,o=!0,n=!0;for(let a=0,r=t.length;a<r;a++){const s=t[a];(s.checked!==!0||s.indeterminate)&&(e=!1,s.disabled||(n=!1)),(s.checked!==!1||s.indeterminate)&&(o=!1)}return{all:e,none:o,allWithoutDisable:n,half:!e&&!o}},ne=function(t){if(t.childNodes.length===0)return;const{all:e,none:o,half:n}=ce(t.childNodes);e?(t.checked=!0,t.indeterminate=!1):n?(t.checked=!1,t.indeterminate=!0):o&&(t.checked=!1,t.indeterminate=!1);const a=t.parent;!a||a.level===0||t.store.checkStrictly||ne(a)},Z=function(t,e){const o=t.store.props,n=t.data||{},a=o[e];if(typeof a=="function")return a(n,t);if(typeof a=="string")return n[a];if(typeof a=="undefined"){const r=n[e];return r===void 0?"":r}};let st=0;class P{constructor(e){this.id=st++,this.text=null,this.checked=!1,this.indeterminate=!1,this.data=null,this.expanded=!1,this.parent=null,this.visible=!0,this.isCurrent=!1,this.canFocus=!1;for(const o in e)se(e,o)&&(this[o]=e[o]);this.level=0,this.loaded=!1,this.childNodes=[],this.loading=!1,this.parent&&(this.level=this.parent.level+1)}initialize(){const e=this.store;if(!e)throw new Error("[Node]store is required!");e.registerNode(this);const o=e.props;if(o&&typeof o.isLeaf!="undefined"){const r=Z(this,"isLeaf");typeof r=="boolean"&&(this.isLeafByUser=r)}if(e.lazy!==!0&&this.data?(this.setData(this.data),e.defaultExpandAll&&(this.expanded=!0,this.canFocus=!0)):this.level>0&&e.lazy&&e.defaultExpandAll&&this.expand(),Array.isArray(this.data)||Ce(this,this.data),!this.data)return;const n=e.defaultExpandedKeys,a=e.key;a&&n&&n.includes(this.key)&&this.expand(null,e.autoExpandParent),a&&e.currentNodeKey!==void 0&&this.key===e.currentNodeKey&&(e.currentNode=this,e.currentNode.isCurrent=!0),e.lazy&&e._initDefaultCheckedNode(this),this.updateLeafState(),this.parent&&(this.level===1||this.parent.expanded===!0)&&(this.canFocus=!0)}setData(e){Array.isArray(e)||Ce(this,e),this.data=e,this.childNodes=[];let o;this.level===0&&Array.isArray(this.data)?o=this.data:o=Z(this,"children")||[];for(let n=0,a=o.length;n<a;n++)this.insertChild({data:o[n]})}get label(){return Z(this,"label")}get key(){const e=this.store.key;return this.data?this.data[e]:null}get disabled(){return Z(this,"disabled")}get nextSibling(){const e=this.parent;if(e){const o=e.childNodes.indexOf(this);if(o>-1)return e.childNodes[o+1]}return null}get previousSibling(){const e=this.parent;if(e){const o=e.childNodes.indexOf(this);if(o>-1)return o>0?e.childNodes[o-1]:null}return null}contains(e,o=!0){return(this.childNodes||[]).some(n=>n===e||o&&n.contains(e))}remove(){const e=this.parent;e&&e.removeChild(this)}insertChild(e,o,n){if(!e)throw new Error("InsertChild error: child is required.");if(!(e instanceof P)){if(!n){const a=this.getChildren(!0);a.includes(e.data)||(typeof o=="undefined"||o<0?a.push(e.data):a.splice(o,0,e.data))}Object.assign(e,{parent:this,store:this.store}),e=qe(new P(e)),e instanceof P&&e.initialize()}e.level=this.level+1,typeof o=="undefined"||o<0?this.childNodes.push(e):this.childNodes.splice(o,0,e),this.updateLeafState()}insertBefore(e,o){let n;o&&(n=this.childNodes.indexOf(o)),this.insertChild(e,n)}insertAfter(e,o){let n;o&&(n=this.childNodes.indexOf(o),n!==-1&&(n+=1)),this.insertChild(e,n)}removeChild(e){const o=this.getChildren()||[],n=o.indexOf(e.data);n>-1&&o.splice(n,1);const a=this.childNodes.indexOf(e);a>-1&&(this.store&&this.store.deregisterNode(e),e.parent=null,this.childNodes.splice(a,1)),this.updateLeafState()}removeChildByData(e){let o=null;for(let n=0;n<this.childNodes.length;n++)if(this.childNodes[n].data===e){o=this.childNodes[n];break}o&&this.removeChild(o)}expand(e,o){const n=()=>{if(o){let a=this.parent;for(;a.level>0;)a.expanded=!0,a=a.parent}this.expanded=!0,e&&e(),this.childNodes.forEach(a=>{a.canFocus=!0})};this.shouldLoadData()?this.loadData(a=>{Array.isArray(a)&&(this.checked?this.setChecked(!0,!0):this.store.checkStrictly||ne(this),n())}):n()}doCreateChildren(e,o={}){e.forEach(n=>{this.insertChild(Object.assign({data:n},o),void 0,!0)})}collapse(){this.expanded=!1,this.childNodes.forEach(e=>{e.canFocus=!1})}shouldLoadData(){return this.store.lazy===!0&&this.store.load&&!this.loaded}updateLeafState(){if(this.store.lazy===!0&&this.loaded!==!0&&typeof this.isLeafByUser!="undefined"){this.isLeaf=this.isLeafByUser;return}const e=this.childNodes;if(!this.store.lazy||this.store.lazy===!0&&this.loaded===!0){this.isLeaf=!e||e.length===0;return}this.isLeaf=!1}setChecked(e,o,n,a){if(this.indeterminate=e==="half",this.checked=e===!0,this.store.checkStrictly)return;if(!(this.shouldLoadData()&&!this.store.checkDescendants)){const{all:s,allWithoutDisable:d}=ce(this.childNodes);!this.isLeaf&&!s&&d&&(this.checked=!1,e=!1);const h=()=>{if(o){const p=this.childNodes;for(let i=0,g=p.length;i<g;i++){const y=p[i];a=a||e!==!1;const C=y.disabled?y.checked:a;y.setChecked(C,o,!0,a)}const{half:f,all:c}=ce(p);c||(this.checked=c,this.indeterminate=f)}};if(this.shouldLoadData()){this.loadData(()=>{h(),ne(this)},{checked:e!==!1});return}else h()}const r=this.parent;!r||r.level===0||n||ne(r)}getChildren(e=!1){if(this.level===0)return this.data;const o=this.data;if(!o)return null;const n=this.store.props;let a="children";return n&&(a=n.children||"children"),o[a]===void 0&&(o[a]=null),e&&!o[a]&&(o[a]=[]),o[a]}updateChildren(){const e=this.getChildren()||[],o=this.childNodes.map(r=>r.data),n={},a=[];e.forEach((r,s)=>{const d=r[q];!!d&&o.findIndex(p=>p[q]===d)>=0?n[d]={index:s,data:r}:a.push({index:s,data:r})}),this.store.lazy||o.forEach(r=>{n[r[q]]||this.removeChildByData(r)}),a.forEach(({index:r,data:s})=>{this.insertChild({data:s},r)}),this.updateLeafState()}loadData(e,o={}){if(this.store.lazy===!0&&this.store.load&&!this.loaded&&(!this.loading||Object.keys(o).length)){this.loading=!0;const n=a=>{this.loaded=!0,this.loading=!1,this.childNodes=[],this.doCreateChildren(a,o),this.updateLeafState(),e&&e.call(this,a)};this.store.load(this,n)}else e&&e.call(this)}}class dt{constructor(e){this.currentNode=null,this.currentNodeKey=null;for(const o in e)se(e,o)&&(this[o]=e[o]);this.nodesMap={}}initialize(){this.root=new P({data:this.data,store:this}),this.root.initialize(),this.lazy&&this.load?this.load(this.root,o=>{this.root.doCreateChildren(o),this._initDefaultCheckedNodes()}):this._initDefaultCheckedNodes()}filter(e){const o=this.filterNodeMethod,n=this.lazy,a=function(r){const s=r.root?r.root.childNodes:r.childNodes;if(s.forEach(d=>{d.visible=o.call(d,e,d.data,d),a(d)}),!r.visible&&s.length){let d=!0;d=!s.some(h=>h.visible),r.root?r.root.visible=d===!1:r.visible=d===!1}!e||r.visible&&!r.isLeaf&&!n&&r.expand()};a(this)}setData(e){e!==this.root.data?(this.root.setData(e),this._initDefaultCheckedNodes()):this.root.updateChildren()}getNode(e){if(e instanceof P)return e;const o=typeof e!="object"?e:he(this.key,e);return this.nodesMap[o]||null}insertBefore(e,o){const n=this.getNode(o);n.parent.insertBefore({data:e},n)}insertAfter(e,o){const n=this.getNode(o);n.parent.insertAfter({data:e},n)}remove(e){const o=this.getNode(e);o&&o.parent&&(o===this.currentNode&&(this.currentNode=null),o.parent.removeChild(o))}append(e,o){const n=o?this.getNode(o):this.root;n&&n.insertChild({data:e})}_initDefaultCheckedNodes(){const e=this.defaultCheckedKeys||[],o=this.nodesMap;e.forEach(n=>{const a=o[n];a&&a.setChecked(!0,!this.checkStrictly)})}_initDefaultCheckedNode(e){(this.defaultCheckedKeys||[]).includes(e.key)&&e.setChecked(!0,!this.checkStrictly)}setDefaultCheckedKey(e){e!==this.defaultCheckedKeys&&(this.defaultCheckedKeys=e,this._initDefaultCheckedNodes())}registerNode(e){const o=this.key;!e||!e.data||(o?e.key!==void 0&&(this.nodesMap[e.key]=e):this.nodesMap[e.id]=e)}deregisterNode(e){!this.key||!e||!e.data||(e.childNodes.forEach(n=>{this.deregisterNode(n)}),delete this.nodesMap[e.key])}getCheckedNodes(e=!1,o=!1){const n=[],a=function(r){(r.root?r.root.childNodes:r.childNodes).forEach(d=>{(d.checked||o&&d.indeterminate)&&(!e||e&&d.isLeaf)&&n.push(d.data),a(d)})};return a(this),n}getCheckedKeys(e=!1){return this.getCheckedNodes(e).map(o=>(o||{})[this.key])}getHalfCheckedNodes(){const e=[],o=function(n){(n.root?n.root.childNodes:n.childNodes).forEach(r=>{r.indeterminate&&e.push(r.data),o(r)})};return o(this),e}getHalfCheckedKeys(){return this.getHalfCheckedNodes().map(e=>(e||{})[this.key])}_getAllNodes(){const e=[],o=this.nodesMap;for(const n in o)se(o,n)&&e.push(o[n]);return e}updateChildren(e,o){const n=this.nodesMap[e];if(!n)return;const a=n.childNodes;for(let r=a.length-1;r>=0;r--){const s=a[r];this.remove(s.data)}for(let r=0,s=o.length;r<s;r++){const d=o[r];this.append(d,n.data)}}_setCheckedKeys(e,o=!1,n){const a=this._getAllNodes().sort((d,h)=>h.level-d.level),r=Object.create(null),s=Object.keys(n);a.forEach(d=>d.setChecked(!1,!1));for(let d=0,h=a.length;d<h;d++){const p=a[d],f=p.data[e].toString();if(!s.includes(f)){p.checked&&!r[f]&&p.setChecked(!1,!1);continue}let i=p.parent;for(;i&&i.level>0;)r[i.data[e]]=!0,i=i.parent;if(p.isLeaf||this.checkStrictly){p.setChecked(!0,!1);continue}if(p.setChecked(!0,!0),o){p.setChecked(!1,!1);const g=function(y){y.childNodes.forEach(k=>{k.isLeaf||k.setChecked(!1,!1),g(k)})};g(p)}}}setCheckedNodes(e,o=!1){const n=this.key,a={};e.forEach(r=>{a[(r||{})[n]]=!0}),this._setCheckedKeys(n,o,a)}setCheckedKeys(e,o=!1){this.defaultCheckedKeys=e;const n=this.key,a={};e.forEach(r=>{a[r]=!0}),this._setCheckedKeys(n,o,a)}setDefaultExpandedKeys(e){e=e||[],this.defaultExpandedKeys=e,e.forEach(o=>{const n=this.getNode(o);n&&n.expand(null,this.autoExpandParent)})}setChecked(e,o,n){const a=this.getNode(e);a&&a.setChecked(!!o,n)}getCurrentNode(){return this.currentNode}setCurrentNode(e){const o=this.currentNode;o&&(o.isCurrent=!1),this.currentNode=e,this.currentNode.isCurrent=!0}setUserCurrentNode(e,o=!0){const n=e[this.key],a=this.nodesMap[n];this.setCurrentNode(a),o&&this.currentNode.level>1&&this.currentNode.parent.expand(null,!0)}setCurrentNodeKey(e,o=!0){if(e==null){this.currentNode&&(this.currentNode.isCurrent=!1),this.currentNode=null;return}const n=this.getNode(e);n&&(this.setCurrentNode(n),o&&this.currentNode.level>1&&this.currentNode.parent.expand(null,!0))}}const lt=X({name:"ElTreeNodeContent",props:{node:{type:Object,required:!0},renderContent:Function},setup(t){const e=R("tree"),o=G("NodeInstance"),n=G("RootTree");return()=>{const a=t.node,{data:r,store:s}=a;return t.renderContent?t.renderContent(ye,{_self:o,node:a,data:r,store:s}):n.ctx.slots.default?n.ctx.slots.default({node:a,data:r}):ye("span",{class:e.be("node","label")},[a.label])}}});var ct=ae(lt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tree/src/tree-node-content.vue"]]);function De(t){const e=G("TreeNodeMap",null),o={treeNodeExpand:n=>{t.node!==n&&t.node.collapse()},children:[]};return e&&e.children.push(o),V("TreeNodeMap",o),{broadcastExpanded:n=>{if(!!t.accordion)for(const a of o.children)a.treeNodeExpand(n)}}}const xe=Symbol("dragEvents");function ut({props:t,ctx:e,el$:o,dropIndicator$:n,store:a}){const r=R("tree"),s=w({showDropIndicator:!1,draggingNode:null,dropNode:null,allowDrop:!0,dropType:null});return V(xe,{treeNodeDragStart:({event:f,treeNode:c})=>{if(typeof t.allowDrag=="function"&&!t.allowDrag(c.node))return f.preventDefault(),!1;f.dataTransfer.effectAllowed="move";try{f.dataTransfer.setData("text/plain","")}catch{}s.value.draggingNode=c,e.emit("node-drag-start",c.node,f)},treeNodeDragOver:({event:f,treeNode:c})=>{const i=c,g=s.value.dropNode;g&&g!==i&&ie(g.$el,r.is("drop-inner"));const y=s.value.draggingNode;if(!y||!i)return;let C=!0,k=!0,D=!0,z=!0;typeof t.allowDrop=="function"&&(C=t.allowDrop(y.node,i.node,"prev"),z=k=t.allowDrop(y.node,i.node,"inner"),D=t.allowDrop(y.node,i.node,"next")),f.dataTransfer.dropEffect=k||C||D?"move":"none",(C||k||D)&&g!==i&&(g&&e.emit("node-drag-leave",y.node,g.node,f),e.emit("node-drag-enter",y.node,i.node,f)),(C||k||D)&&(s.value.dropNode=i),i.node.nextSibling===y.node&&(D=!1),i.node.previousSibling===y.node&&(C=!1),i.node.contains(y.node,!1)&&(k=!1),(y.node===i.node||y.node.contains(i.node))&&(C=!1,k=!1,D=!1);const A=i.$el.getBoundingClientRect(),j=o.value.getBoundingClientRect();let x;const J=C?k?.25:D?.45:1:-1,Q=D?k?.75:C?.55:0:1;let M=-9999;const u=f.clientY-A.top;u<A.height*J?x="before":u>A.height*Q?x="after":k?x="inner":x="none";const m=i.$el.querySelector(`.${r.be("node","expand-icon")}`).getBoundingClientRect(),b=n.value;x==="before"?M=m.top-j.top:x==="after"&&(M=m.bottom-j.top),b.style.top=`${M}px`,b.style.left=`${m.right-j.left}px`,x==="inner"?Ze(i.$el,r.is("drop-inner")):ie(i.$el,r.is("drop-inner")),s.value.showDropIndicator=x==="before"||x==="after",s.value.allowDrop=s.value.showDropIndicator||z,s.value.dropType=x,e.emit("node-drag-over",y.node,i.node,f)},treeNodeDragEnd:f=>{const{draggingNode:c,dropType:i,dropNode:g}=s.value;if(f.preventDefault(),f.dataTransfer.dropEffect="move",c&&g){const y={data:c.node.data};i!=="none"&&c.node.remove(),i==="before"?g.node.parent.insertBefore(y,g.node):i==="after"?g.node.parent.insertAfter(y,g.node):i==="inner"&&g.node.insertChild(y),i!=="none"&&a.value.registerNode(y),ie(g.$el,r.is("drop-inner")),e.emit("node-drag-end",c.node,g.node,i,f),i!=="none"&&e.emit("node-drop",c.node,g.node,i,f)}c&&!g&&e.emit("node-drag-end",c.node,null,i,f),s.value.showDropIndicator=!1,s.value.draggingNode=null,s.value.dropNode=null,s.value.allowDrop=!0}}),{dragState:s}}const ht=X({name:"ElTreeNode",components:{ElCollapseTransition:it,ElCheckbox:$e,NodeContent:ct,ElIcon:et,Loading:tt},props:{node:{type:P,default:()=>({})},props:{type:Object,default:()=>({})},accordion:Boolean,renderContent:Function,renderAfterExpand:Boolean,showCheckbox:{type:Boolean,default:!1}},emits:["node-expand"],setup(t,e){const o=R("tree"),{broadcastExpanded:n}=De(t),a=G("RootTree"),r=w(!1),s=w(!1),d=w(null),h=w(null),p=w(null),f=G(xe),c=ke();V("NodeInstance",c),t.node.expanded&&(r.value=!0,s.value=!0);const i=a.props.children||"children";S(()=>{const u=t.node.data[i];return u&&[...u]},()=>{t.node.updateChildren()}),S(()=>t.node.indeterminate,u=>{C(t.node.checked,u)}),S(()=>t.node.checked,u=>{C(u,t.node.indeterminate)}),S(()=>t.node.expanded,u=>{me(()=>r.value=u),u&&(s.value=!0)});const g=u=>he(a.props.nodeKey,u.data),y=u=>{const m=t.props.class;if(!m)return{};let b;if(Re(m)){const{data:re}=u;b=m(re,u)}else b=m;return Ue(b)?{[b]:!0}:b},C=(u,m)=>{(d.value!==u||h.value!==m)&&a.ctx.emit("check-change",t.node.data,u,m),d.value=u,h.value=m},k=u=>{const m=a.store.value;m.setCurrentNode(t.node),a.ctx.emit("current-change",m.currentNode?m.currentNode.data:null,m.currentNode),a.currentNode.value=t.node,a.props.expandOnClickNode&&z(),a.props.checkOnClickNode&&!t.node.disabled&&A(null,{target:{checked:!t.node.checked}}),a.ctx.emit("node-click",t.node.data,t.node,c,u)},D=u=>{a.instance.vnode.props.onNodeContextmenu&&(u.stopPropagation(),u.preventDefault()),a.ctx.emit("node-contextmenu",u,t.node.data,t.node,c)},z=()=>{t.node.isLeaf||(r.value?(a.ctx.emit("node-collapse",t.node.data,t.node,c),t.node.collapse()):(t.node.expand(),e.emit("node-expand",t.node.data,t.node,c)))},A=(u,m)=>{t.node.setChecked(m.target.checked,!a.props.checkStrictly),me(()=>{const b=a.store.value;a.ctx.emit("check",t.node.data,{checkedNodes:b.getCheckedNodes(),checkedKeys:b.getCheckedKeys(),halfCheckedNodes:b.getHalfCheckedNodes(),halfCheckedKeys:b.getHalfCheckedKeys()})})};return{ns:o,node$:p,tree:a,expanded:r,childNodeRendered:s,oldChecked:d,oldIndeterminate:h,getNodeKey:g,getNodeClass:y,handleSelectChange:C,handleClick:k,handleContextMenu:D,handleExpandIconClick:z,handleCheckChange:A,handleChildNodeExpand:(u,m,b)=>{n(m),a.ctx.emit("node-expand",u,m,b)},handleDragStart:u=>{!a.props.draggable||f.treeNodeDragStart({event:u,treeNode:t})},handleDragOver:u=>{u.preventDefault(),a.props.draggable&&f.treeNodeDragOver({event:u,treeNode:{$el:p.value,node:t.node}})},handleDrop:u=>{u.preventDefault()},handleDragEnd:u=>{!a.props.draggable||f.treeNodeDragEnd(u)},CaretRight:nt}}}),ft=["aria-expanded","aria-disabled","aria-checked","draggable","data-key"],pt=["aria-expanded"];function gt(t,e,o,n,a,r){const s=B("el-icon"),d=B("el-checkbox"),h=B("loading"),p=B("node-content"),f=B("el-tree-node"),c=B("el-collapse-transition");return de((E(),O("div",{ref:"node$",class:F([t.ns.b("node"),t.ns.is("expanded",t.expanded),t.ns.is("current",t.node.isCurrent),t.ns.is("hidden",!t.node.visible),t.ns.is("focusable",!t.node.disabled),t.ns.is("checked",!t.node.disabled&&t.node.checked),t.getNodeClass(t.node)]),role:"treeitem",tabindex:"-1","aria-expanded":t.expanded,"aria-disabled":t.node.disabled,"aria-checked":t.node.checked,draggable:t.tree.props.draggable,"data-key":t.getNodeKey(t.node),onClick:e[1]||(e[1]=I((...i)=>t.handleClick&&t.handleClick(...i),["stop"])),onContextmenu:e[2]||(e[2]=(...i)=>t.handleContextMenu&&t.handleContextMenu(...i)),onDragstart:e[3]||(e[3]=I((...i)=>t.handleDragStart&&t.handleDragStart(...i),["stop"])),onDragover:e[4]||(e[4]=I((...i)=>t.handleDragOver&&t.handleDragOver(...i),["stop"])),onDragend:e[5]||(e[5]=I((...i)=>t.handleDragEnd&&t.handleDragEnd(...i),["stop"])),onDrop:e[6]||(e[6]=I((...i)=>t.handleDrop&&t.handleDrop(...i),["stop"]))},[N("div",{class:F(t.ns.be("node","content")),style:We({paddingLeft:(t.node.level-1)*t.tree.props.indent+"px"})},[t.tree.props.icon||t.CaretRight?(E(),L(s,{key:0,class:F([t.ns.be("node","expand-icon"),t.ns.is("leaf",t.node.isLeaf),{expanded:!t.node.isLeaf&&t.expanded}]),onClick:I(t.handleExpandIconClick,["stop"])},{default:ee(()=>[(E(),L(Ye(t.tree.props.icon||t.CaretRight)))]),_:1},8,["class","onClick"])):Y("v-if",!0),t.showCheckbox?(E(),L(d,{key:1,"model-value":t.node.checked,indeterminate:t.node.indeterminate,disabled:!!t.node.disabled,onClick:e[0]||(e[0]=I(()=>{},["stop"])),onChange:t.handleCheckChange},null,8,["model-value","indeterminate","disabled","onChange"])):Y("v-if",!0),t.node.loading?(E(),L(s,{key:2,class:F([t.ns.be("node","loading-icon"),t.ns.is("loading")])},{default:ee(()=>[W(h)]),_:1},8,["class"])):Y("v-if",!0),W(p,{node:t.node,"render-content":t.renderContent},null,8,["node","render-content"])],6),W(c,null,{default:ee(()=>[!t.renderAfterExpand||t.childNodeRendered?de((E(),O("div",{key:0,class:F(t.ns.be("node","children")),role:"group","aria-expanded":t.expanded},[(E(!0),O(ue,null,be(t.node.childNodes,i=>(E(),L(f,{key:t.getNodeKey(i),"render-content":t.renderContent,"render-after-expand":t.renderAfterExpand,"show-checkbox":t.showCheckbox,node:i,accordion:t.accordion,props:t.props,onNodeExpand:t.handleChildNodeExpand},null,8,["render-content","render-after-expand","show-checkbox","node","accordion","props","onNodeExpand"]))),128))],10,pt)),[[le,t.expanded]]):Y("v-if",!0)]),_:1})],42,ft)),[[le,t.node.visible]])}var vt=ae(ht,[["render",gt],["__file","/home/runner/work/element-plus/element-plus/packages/components/tree/src/tree-node.vue"]]);function yt({el$:t},e){const o=R("tree"),n=Ne([]),a=Ne([]);Ee(()=>{s(),Ie(t.value,"keydown",r)}),Ge(()=>{Le(t.value,"keydown",r)}),Ve(()=>{n.value=Array.from(t.value.querySelectorAll("[role=treeitem]")),a.value=Array.from(t.value.querySelectorAll("input[type=checkbox]"))}),S(a,d=>{d.forEach(h=>{h.setAttribute("tabindex","-1")})});const r=d=>{const h=d.target;if(!h.className.includes(o.b("node")))return;const p=d.code;n.value=Array.from(t.value.querySelectorAll(`.${o.is("focusable")}[role=treeitem]`));const f=n.value.indexOf(h);let c;if([$.up,$.down].includes(p)){if(d.preventDefault(),p===$.up){c=f===-1?0:f!==0?f-1:n.value.length-1;const g=c;for(;!e.value.getNode(n.value[c].dataset.key).canFocus;){if(c--,c===g){c=-1;break}c<0&&(c=n.value.length-1)}}else{c=f===-1?0:f<n.value.length-1?f+1:0;const g=c;for(;!e.value.getNode(n.value[c].dataset.key).canFocus;){if(c++,c===g){c=-1;break}c>=n.value.length&&(c=0)}}c!==-1&&n.value[c].focus()}[$.left,$.right].includes(p)&&(d.preventDefault(),h.click());const i=h.querySelector('[type="checkbox"]');[$.enter,$.space].includes(p)&&i&&(d.preventDefault(),i.click())},s=()=>{var d;n.value=Array.from(t.value.querySelectorAll(`.${o.is("focusable")}[role=treeitem]`)),a.value=Array.from(t.value.querySelectorAll("input[type=checkbox]"));const h=t.value.querySelectorAll(`.${o.is("checked")}[role=treeitem]`);if(h.length){h[0].setAttribute("tabindex","0");return}(d=n.value[0])==null||d.setAttribute("tabindex","0")}}const mt=X({name:"ElTree",components:{ElTreeNode:vt},props:{data:{type:Array,default:()=>[]},emptyText:{type:String},renderAfterExpand:{type:Boolean,default:!0},nodeKey:String,checkStrictly:Boolean,defaultExpandAll:Boolean,expandOnClickNode:{type:Boolean,default:!0},checkOnClickNode:Boolean,checkDescendants:{type:Boolean,default:!1},autoExpandParent:{type:Boolean,default:!0},defaultCheckedKeys:Array,defaultExpandedKeys:Array,currentNodeKey:[String,Number],renderContent:Function,showCheckbox:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},allowDrag:Function,allowDrop:Function,props:{type:Object,default:()=>({children:"children",label:"label",disabled:"disabled"})},lazy:{type:Boolean,default:!1},highlightCurrent:Boolean,load:Function,filterNodeMethod:Function,accordion:Boolean,indent:{type:Number,default:18},icon:[String,Object]},emits:["check-change","current-change","node-click","node-contextmenu","node-collapse","node-expand","check","node-drag-start","node-drag-end","node-drop","node-drag-leave","node-drag-enter","node-drag-over"],setup(t,e){const{t:o}=Oe(),n=R("tree"),a=w(new dt({key:t.nodeKey,data:t.data,lazy:t.lazy,props:t.props,load:t.load,currentNodeKey:t.currentNodeKey,checkStrictly:t.checkStrictly,checkDescendants:t.checkDescendants,defaultCheckedKeys:t.defaultCheckedKeys,defaultExpandedKeys:t.defaultExpandedKeys,autoExpandParent:t.autoExpandParent,defaultExpandAll:t.defaultExpandAll,filterNodeMethod:t.filterNodeMethod}));a.value.initialize();const r=w(a.value.root),s=w(null),d=w(null),h=w(null),{broadcastExpanded:p}=De(t),{dragState:f}=ut({props:t,ctx:e,el$:d,dropIndicator$:h,store:a});yt({el$:d},a);const c=Xe(()=>{const{childNodes:l}=r.value;return!l||l.length===0||l.every(({visible:v})=>!v)});S(()=>t.defaultCheckedKeys,l=>{a.value.setDefaultCheckedKey(l)}),S(()=>t.defaultExpandedKeys,l=>{a.value.setDefaultExpandedKeys(l)}),S(()=>t.data,l=>{a.value.setData(l)},{deep:!0}),S(()=>t.checkStrictly,l=>{a.value.checkStrictly=l});const i=l=>{if(!t.filterNodeMethod)throw new Error("[Tree] filterNodeMethod is required when filter");a.value.filter(l)},g=l=>he(t.nodeKey,l.data),y=l=>{if(!t.nodeKey)throw new Error("[Tree] nodeKey is required in getNodePath");const v=a.value.getNode(l);if(!v)return[];const H=[v.data];let U=v.parent;for(;U&&U!==r.value;)H.push(U.data),U=U.parent;return H.reverse()},C=(l,v)=>a.value.getCheckedNodes(l,v),k=l=>a.value.getCheckedKeys(l),D=()=>{const l=a.value.getCurrentNode();return l?l.data:null},z=()=>{if(!t.nodeKey)throw new Error("[Tree] nodeKey is required in getCurrentKey");const l=D();return l?l[t.nodeKey]:null},A=(l,v)=>{if(!t.nodeKey)throw new Error("[Tree] nodeKey is required in setCheckedNodes");a.value.setCheckedNodes(l,v)},j=(l,v)=>{if(!t.nodeKey)throw new Error("[Tree] nodeKey is required in setCheckedKeys");a.value.setCheckedKeys(l,v)},x=(l,v,H)=>{a.value.setChecked(l,v,H)},J=()=>a.value.getHalfCheckedNodes(),Q=()=>a.value.getHalfCheckedKeys(),M=(l,v=!0)=>{if(!t.nodeKey)throw new Error("[Tree] nodeKey is required in setCurrentNode");a.value.setUserCurrentNode(l,v)},u=(l,v=!0)=>{if(!t.nodeKey)throw new Error("[Tree] nodeKey is required in setCurrentKey");a.value.setCurrentNodeKey(l,v)},m=l=>a.value.getNode(l),b=l=>{a.value.remove(l)},re=(l,v)=>{a.value.append(l,v)},we=(l,v)=>{a.value.insertBefore(l,v)},Ke=(l,v)=>{a.value.insertAfter(l,v)},_e=(l,v,H)=>{p(v),e.emit("node-expand",l,v,H)},Fe=(l,v)=>{if(!t.nodeKey)throw new Error("[Tree] nodeKey is required in updateKeyChild");a.value.updateChildren(l,v)};return V("RootTree",{ctx:e,props:t,store:a,root:r,currentNode:s,instance:ke()}),V(ot,void 0),{ns:n,store:a,root:r,currentNode:s,dragState:f,el$:d,dropIndicator$:h,isEmpty:c,filter:i,getNodeKey:g,getNodePath:y,getCheckedNodes:C,getCheckedKeys:k,getCurrentNode:D,getCurrentKey:z,setCheckedNodes:A,setCheckedKeys:j,setChecked:x,getHalfCheckedNodes:J,getHalfCheckedKeys:Q,setCurrentNode:M,setCurrentKey:u,t:o,getNode:m,remove:b,append:re,insertBefore:we,insertAfter:Ke,handleNodeExpand:_e,updateKeyChildren:Fe}}});function Nt(t,e,o,n,a,r){var s;const d=B("el-tree-node");return E(),O("div",{ref:"el$",class:F([t.ns.b(),t.ns.is("dragging",!!t.dragState.draggingNode),t.ns.is("drop-not-allow",!t.dragState.allowDrop),t.ns.is("drop-inner",t.dragState.dropType==="inner"),{[t.ns.m("highlight-current")]:t.highlightCurrent}]),role:"tree"},[(E(!0),O(ue,null,be(t.root.childNodes,h=>(E(),L(d,{key:t.getNodeKey(h),node:h,props:t.props,accordion:t.accordion,"render-after-expand":t.renderAfterExpand,"show-checkbox":t.showCheckbox,"render-content":t.renderContent,onNodeExpand:t.handleNodeExpand},null,8,["node","props","accordion","render-after-expand","show-checkbox","render-content","onNodeExpand"]))),128)),t.isEmpty?(E(),O("div",{key:0,class:F(t.ns.e("empty-block"))},[N("span",{class:F(t.ns.e("empty-text"))},_((s=t.emptyText)!=null?s:t.t("el.tree.emptyText")),3)],2)):Y("v-if",!0),de(N("div",{ref:"dropIndicator$",class:F(t.ns.e("drop-indicator"))},null,2),[[le,t.dragState.showDropIndicator]])],2)}var oe=ae(mt,[["render",Nt],["__file","/home/runner/work/element-plus/element-plus/packages/components/tree/src/tree.vue"]]);oe.install=t=>{t.component(oe.name,oe)};const Ct=oe,kt=Ct;const bt=T(" \u6EE1\u8DB3\u4EE5\u4E0B\u7684\u76EE\u5F55\u7ED3\u6784\u7684 "),Et=T(" \u90FD\u662F\u7B26\u5408\u8981\u6C42\u7684\u914D\u7F6E\u6587\u4EF6\u4F4D\u7F6E\uFF0C\u9009\u5219\u4E00\u4E2A\u5408\u9002\u7684\u4F4D\u7F6E\u5373\u53EF\u3002\u5982\u679C\u4F60\u521B\u5EFA\u4E86\u591A\u4E2A\uFF0C\u90A3\u3002\u3002\u3002\u3002\u522B\u521B\u5EFA\u591A\u4E2A\u554A\u3002 "),Dt={class:"language-bash ext-sh line-numbers-mode"},xt={class:"language-bash"},wt=N("span",{class:"token builtin class-name"},".",-1),Kt=Qe('<div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">\xA0</div></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div>',2),_t={class:"custom-container tip"},Ft=N("p",{class:"custom-container-title"},"\u76EE\u5F55\u6811",-1),St=N("p",null,"\u6216\u8005\u8FD9\u6837\u66F4\u52A0\u751F\u52A8",-1),At=T(" \u5982\u679C\u8FD8\u4E0D\u77E5\u9053\u600E\u4E48\u914D\u7F6E\uFF0C\u53EF\u4EE5"),Bt=["href"],Tt=T(" \u4F60\u53EF\u4EE5\u4E0D\u7528\u6587\u4EF6\u914D\u7F6E\uFF0C\u800C\u662F\u4F7F\u7528\u73AF\u5883\u53D8\u91CF "),zt=N("code",null,"BILITOOLS_CONFIG",-1),$t=T("\uFF08\u540C\u6837\u7684\u914D\u7F6E\uFF0C\u4F46\u9700\u8981 "),It={href:"https://www.baidufe.com/fehelper/en-decode/",target:"_blank",rel:"noopener noreferrer"},Lt=T("gzip \u538B\u7F29"),Ot=T("\uFF09 "),Pt=X({__name:"ConfigPath",props:{configName:{default:"config"},indexName:{default:"index"}},setup(t){const e=t,o=(h,p)=>h.isPenultimate?"is-penultimate":null,n=w("");Ee(()=>{var h;window.location.hostname==="localhost"?n.value="/":n.value=(h=location.href)!=null&&h.includes("vercel")?"/":"/BiliOutils/"});const{configName:a,indexName:r}=e,s={children:"children",label:"label",class:o},d=[{label:"config",children:[{label:`${a}.json`},{label:`${a}.json5`}]},{label:"src",children:[{label:"config",children:[{label:`${a}.json`},{label:`${a}.json5`}]},{isPenultimate:!0,label:`${r}.js`},{label:`${a}.json`},{label:`${a}.json5`}]}];return(h,p)=>{const f=kt,c=B("ExternalLinkIcon");return E(),O(ue,null,[N("p",null,[bt,N("code",null,_(K(a))+".json{5}",1),Et]),N("div",Dt,[N("pre",xt,[N("code",null,[wt,T(`
\u251C\u2500\u2500 config
\u2502  \u251C\u2500\u2500 `+_(K(a))+`.json
\u2502  \u2514\u2500\u2500 `+_(K(a))+`.json5
\u2514\u2500\u2500 src
   \u251C\u2500\u2500 config
   \u2502  \u251C\u2500\u2500 `+_(K(a))+`.json
   \u2502  \u2514\u2500\u2500 `+_(K(a))+`.json5
   \u251C\u2500\u2500 `+_(K(a))+`.json
   \u251C\u2500\u2500 `+_(K(a))+`.json5
   \u2514\u2500\u2500 `+_(K(r))+`.js
`,1)])]),Kt]),N("div",_t,[Ft,St,W(f,{data:d,props:s})]),N("ul",null,[N("li",null,[At,N("a",{href:`${n.value}config/#\u7528\u6237\u914D\u7F6E\u53C2\u8003`,rel:"noopener noreferrer"},"\u70B9\u51FB\u67E5\u770B\u914D\u7F6E\u53C2\u8003",8,Bt)]),N("li",null,[Tt,zt,$t,N("a",It,[Lt,W(c)]),Ot])])],64)}}});var Yt=Je(Pt,[["__file","ConfigPath.vue"]]);export{Yt as default};
