"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[843],{158:(e,a,t)=>{t.d(a,{Z:()=>o});const n="Button_Button__TgQcb",r="Button_iconWrapper__JV6a-";var s=t(184);const o=e=>{let{text:a,onClick:t,disabled:o,icon:l,variant:c}=e;return(0,s.jsxs)("button",{onClick:t,className:c||n,disabled:o,children:[l&&(0,s.jsx)("div",{className:r,children:(0,s.jsx)(l,{width:20,height:20})}),a]})}},240:(e,a,t)=>{t.d(a,{Z:()=>d});var n=t(791);const r="Input_Label__mHZ-A",s="Input_Input__DDfaA",o="Input_InputContainer__A-x4I",l="Input_Icon__hwKMM";var c=t(184);const d=e=>{let{value:a,disabled:t,...d}=e;const[i,m]=(0,n.useState)(!1);return(0,c.jsxs)("label",{className:r,children:[d.label,(0,c.jsxs)("div",{className:o,children:[(0,c.jsx)("input",{required:!0,value:a,...d,className:s,onFocus:()=>{m(!0)},onBlur:()=>{m(!1)},disabled:t}),!i&&d.icon&&(0,c.jsx)(d.icon,{className:l,width:20,height:20})]})]})}},722:(e,a,t)=>{t.d(a,{Z:()=>n});const n={name:{label:"Name",name:"name",type:"text",required:!0,placeholder:"Your name"},orgname:{label:"Organization name",name:"orgname",type:"text",required:!0,placeholder:"Organization"},datecreate:{label:"Date of created",name:"datecreate",type:"text",required:!0,placeholder:"Date of created"}}},411:(e,a,t)=>{t.d(a,{Z:()=>n});const n={name:"",orgname:"",datecreate:(new Date).toISOString().split("T")[0]}},342:(e,a,t)=>{t.d(a,{Z:()=>i});var n=t(791),r=t(164);const s="Modal_overlay__lbxGs",o="Modal_modal__Yoxg+",l="Modal_close__btOOY";var c=t(184);const d=document.getElementById("modal-root"),i=e=>{let{close:a,children:t}=e;const i=e=>{let{target:t,currentTarget:n,code:r}=e;t!==n&&"Escape"!==r||a()};return(0,n.useEffect)((()=>(document.body.addEventListener("keydown",i),()=>document.body.removeEventListener("keydown",i))),[]),(0,r.createPortal)((0,c.jsx)("div",{onClick:i,className:s,children:(0,c.jsxs)("div",{className:o,children:[(0,c.jsx)("span",{onClick:a,className:l,children:"X"}),t]})}),d)}},986:(e,a,t)=>{t.d(a,{Z:()=>s});const n="Spinner_Loader__gSaW9";var r=t(184);const s=()=>(0,r.jsx)("div",{className:n})},843:(e,a,t)=>{t.r(a),t.d(a,{default:()=>b});var n=t(791),r=t(87);const s="Card_datatable__DnyBH",o="Card_rowLink__mSB1y";var l=t(184);const c=e=>{let{data:a}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("table",{className:s,children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"ID"}),(0,l.jsx)("th",{children:"Name"}),(0,l.jsx)("th",{children:"Organization"}),(0,l.jsx)("th",{children:"Date of create"})]})}),(0,l.jsx)("tbody",{children:a.map((e=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:e.id}),(0,l.jsx)("td",{children:(0,l.jsx)(r.rU,{to:"/org/".concat(e.id),className:o,children:(0,l.jsx)("span",{children:e.name})})}),(0,l.jsx)("td",{children:e.orgname}),(0,l.jsx)("td",{children:e.datecreate})]},e.id)))})]})})};var d=t(158),i=t(342),m=t(85),h=t(922),u=t(835),x=t(240),p=t(722),_=t(411),j=t(33);const g=e=>{let{onClose:a}=e;const[t,r]=(0,n.useState)(_.Z),{name:s,orgname:o,datecreate:c}=t;return(0,l.jsx)("div",{className:u.Z.wrapper,children:(0,l.jsxs)("form",{onSubmit:async()=>{try{await(0,j.NX)("addInfoCard",t,(e=>{t||(r(e.data),a())}))}catch(e){console.error(e),m.Am.error("Info didn't create",h.A)}},className:u.Z.form,action:"",children:[(0,l.jsx)(x.Z,{value:s,onChange:e=>{r({...t,name:e.target.value})},...p.Z.name}),(0,l.jsx)(x.Z,{value:o,onChange:e=>{r({...t,orgname:e.target.value})},...p.Z.orgname}),(0,l.jsx)(x.Z,{value:c,onChange:e=>{r({...t,datecreate:e.target.value})},...p.Z.datecreate}),(0,l.jsxs)("div",{className:u.Z.wrappers,children:[(0,l.jsx)(d.Z,{type:"submit",text:"Ok",disabled:""===t.name||""===t.orgname||""===t.datecreate}),(0,l.jsx)(d.Z,{type:"reset",text:"Cancel",onClick:e=>{e.preventDefault(),r({..._.Z}),a()}})]})]})})};var v=t(986);const b=()=>{const[e,a]=(0,n.useState)(!1),[t,r]=(0,n.useState)(),[s,o]=(0,n.useState)(!1),[m,h]=(0,n.useState)(!1);(0,n.useEffect)((()=>{(async()=>{try{o(!0),h(!1),(0,j.NX)("getAllInfo",null,(e=>{t||r(e.data),o(!1)}))}catch(m){h(!0),console.log(m.message)}finally{o(!1)}})()}),[t]);const u=()=>{a(!1)};return(0,l.jsxs)(l.Fragment,{children:[e&&(0,l.jsx)(i.Z,{close:u,children:(0,l.jsx)(g,{onClose:u})}),(0,l.jsx)(d.Z,{text:"Add",onClick:()=>{a(!0)}}),s&&(0,l.jsx)(v.Z,{}),m&&(0,l.jsx)("div",{children:"Opps, error... Please, wait or update page"}),!m&&!s&&(null===t||void 0===t?void 0:t.length)>0&&(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(c,{data:t})})]})}},922:(e,a,t)=>{t.d(a,{A:()=>n});const n={position:"bottom-right",autoClose:2500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"colored",toastId:"custom-id-yes"}},835:(e,a,t)=>{t.d(a,{Z:()=>n});const n={wrapper:"Form_wrapper__rT3T0",form:"Form_form__RilmH",wrappers:"Form_wrappers__S4MGo"}}}]);
//# sourceMappingURL=843.f5a88884.chunk.js.map