import{W as l,j as e}from"./app-C-Hlkg4h.js";import{B as a}from"./search-lnmR4na9.js";import{A as d}from"./AuthenticatedLayout-DpyDrtym.js";import"./createLucideIcon-NAgh--qz.js";import"./transition-CStnyOU7.js";const u=({generator:s})=>{console.log(s);const t=s[0].id;console.log(t);const{data:r,post:c,setData:o}=l({generator:t}),n=i=>{i.preventDefault(),o("generator",t),c(route("requestAccess",r))};return e.jsxs("div",{className:"justify-center",children:[e.jsx("div",{className:"flex justify-center",children:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Oops. Looks like you don't have an access on ",s[0].serial_number,". Ask for an access by clicking this button"]})}),e.jsx("div",{className:"flex w-full justify-center p-5",children:e.jsx(a,{onClick:n,children:"Request Access"})})]})},m=u;function p({auth:s,generator:t}){const r=JSON.stringify(t),c=JSON.parse(r);return e.jsx(d,{header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Access Request"}),user:s.user,role:s.role,children:e.jsx("div",{className:"flex justify-center mt-6 max-w-full border border-2",children:e.jsx(m,{generator:c})})})}export{p as default};
