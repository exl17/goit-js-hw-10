import"./assets/styles-6d3275e3.js";import{f as s,i as y}from"./assets/vendor-651d7991.js";const h={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=e[0],n=new Date;t<=n?(y.error({title:"Error",message:"Please choose a date in the future"}),document.querySelector("[data-start]").disabled=!0):document.querySelector("[data-start]").disabled=!1}};s("#datetime-picker",h);function o(e){return e<10?`0${e}`:e}function D(e){const i=Math.floor(e/864e5),l=Math.floor(e%864e5/36e5),m=Math.floor(e%864e5%36e5/6e4),f=Math.floor(e%864e5%36e5%6e4/1e3);return{days:i,hours:l,minutes:m,seconds:f}}let d,u;function a(){const e=new Date,t=u-e;if(t<=0){clearInterval(d),c({days:0,hours:0,minutes:0,seconds:0});return}const n=D(t);c(n)}function c({days:e,hours:t,minutes:n,seconds:r}){document.querySelector("[data-days]").textContent=o(e),document.querySelector("[data-hours]").textContent=o(t),document.querySelector("[data-minutes]").textContent=o(n),document.querySelector("[data-seconds]").textContent=o(r)}document.querySelector("[data-start]").addEventListener("click",()=>{document.querySelector("[data-start]").disabled=!0,u=s("#datetime-picker").selectedDates[0],a(),d=setInterval(a,1e3)});
//# sourceMappingURL=commonHelpers.js.map
