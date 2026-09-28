(function(){
  "use strict";
  const requested=new URLSearchParams(location.search).get("hubLang")||new URLSearchParams(location.search).get("lang");
  const lang=requested==="en"?"en":"es";
  document.documentElement.lang=lang;
  const load=src=>new Promise((resolve,reject)=>{
    const script=document.createElement("script");
    script.src=src;
    script.onload=resolve;
    script.onerror=()=>reject(new Error(`Unable to load ${src}`));
    document.body.appendChild(script);
  });
  const translations=lang==="es"?[
    "translations-es-01.js","translations-es-02.js","translations-es-03.js",
    "translations-es-04.js","translations-es-extra.js"
  ].map(load):[];
  Promise.all(translations).then(()=>load("localization.js")).catch(error=>console.error(error));
})();
