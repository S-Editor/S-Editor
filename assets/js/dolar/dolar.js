var $ = (el,length) =>{
  var name = el;
  if(length) el = document.querySelectorAll(el)[length];
  else el = document.querySelector(el);
  if(!el) el = window;
  el.getVal = () => {return el.value || el.innerHTML};
  el.setVal = (e) => {el.value=el.innerHTML=e};
  el.show = (e) => {if(!e) el.style.display="block";};
  el.hide = () => {el.style.display="none"};
  el.length = () => {return document.querySelectorAll(name).length};
  el.db = () => {if(window.localStorage){return window.localStorage} else{
    console.log("Your browser dosen't support localStorage");
}};
  el.domain = () => {return location.protocol+"//"+location.host};
  el.script = (e) => {el.innerHTML+=`\n<script src="${e}"><\/script>`};
  el.style = (e) => {el.innerHTML+=`\n<link rel="stylesheet" href="${e}"/>`};
  el.curl = (link) =>{
    let xhrFile = new XMLHttpRequest();
    xhrFile.open('GET', link);
    xhrFile.send();
    xhrFile.onload = function() {
      $().result(xhrFile.response);
    };
  }
  return el;
};