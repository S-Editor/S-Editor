if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.querySelector(':root').style.setProperty('--theme', '#444');
} else {
  document.querySelector(':root').style.setProperty('--theme', '#fff');
}

var editor = ace.edit("editor");
editor.session.setMode("ace/mode/html");
editor.setTheme("ace/theme/monokai");

window.lng="html";
function chLang(lang){
  lng=lang;
  if(lang=="html"){
  editor.session.setMode("ace/mode/html");
  }if(lang=="css"){
  editor.session.setMode("ace/mode/css");
  }
  else{
  editor.session.setMode("ace/mode/javascript");
  }
}

function tidy() {
  var tidy = {
    "indent_size": 2,
    "indent_empty_lines": true,
    "templating": ["auto"]
  };
  if (lng == "html") {
    editor.setValue(html_beautify(editor.getValue(), tidy));
  } else if (lng == "css") {
    editor.setValue(css_beautify(editor.getValue(), tidy));
  } else if (lng == "javascript") {
    editor.setValue(js_beautify(editor.getValue(), tidy));
  }
}