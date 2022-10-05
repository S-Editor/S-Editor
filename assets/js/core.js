//  Code By  : TDIM Developer
//  Website  : https://tdim.ml
//  Designed : 2021/07/04

/* Default Tab And Content */
tdimjs.$("#data").innerHTML = "<style>.tab{border-color:#fff} .html{border-color:#09f} .content{display:none} #html{display:block;}<\/style>";
/* Editor Loader window onload*/
tdimjs.$().onload = tdimjs.$(".L-loader").style.display = "none";
/* Editor Contents Requirements */
ace.require("ace/ext/language_tools");

// global variables
var html = ace.edit("html"),
  headEditor = ace.edit("headEditor"),
  css = ace.edit("css"),
  js = ace.edit("js");

/* Setup head Editor Content */
headEditor.session.setMode("ace/mode/html");
headEditor.setTheme("ace/theme/monokai");
headEditor.setValue("<title>HTML Document</title>");
headEditor.setOptions({
  scrollPastEnd: 0.3,
  wrap: true,
  tabSize: "2",
  fontSize: 15
});

/* Setup HTML Editor Content */
html.session.setMode("ace/mode/html");
html.setTheme("ace/theme/monokai");
html.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  scrollPastEnd: 0.3,
  wrap: true,
  tabSize: "2",
  foldStyle: "markbeginend",
  navigateWithinSoftTabs: true,
  mergeUndoDeltas: "always",
  fontSize: 15
});

/* Setup CSS Editor Content */
css.session.setMode("ace/mode/css");
css.setTheme("ace/theme/monokai");
css.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  scrollPastEnd: 0.3,
  wrap: true,
  tabSize: "2",
  foldStyle: "markbeginend",
  navigateWithinSoftTabs: true,
  mergeUndoDeltas: "always",
  fontSize: 15
});

/* Setup Javascript Editor Content */
js.session.setMode("ace/mode/javascript");
js.setTheme("ace/theme/monokai");
js.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  scrollPastEnd: 0.3,
  wrap: true,
  tabSize: "2",
  foldStyle: "markbeginend",
  navigateWithinSoftTabs: true,
  mergeUndoDeltas: "always",
  fontSize: 15
});

/* The Change Tab And Content Function */
function run(app) {
  let y = app.classList[1];
  let x = tdimjs.$("#data").innerHTML = `<style>.tab{border-color:#fff} .${y}{border-color:#09f} .content{display:none} #${y}{display:block;}<\/style>`;
}

/* The Play Code Function */
function playCode(rawPreview) {
  var editorHost = tdimjs.domain;
  
  var domConsole = tdimjs.$("#domConsole");
  var domConsoleVal = " ";
  if (domConsole.checked == true) {
    domConsoleVal =
      '<link rel="stylesheet" href="' + editorHost + '/assets/plugins/dom/console.css">' +
      '<script src="' + editorHost + '/assets/plugins/dom/console.js"><\/script>';
    //+'<script src="./assets/plugins/dom/esprismajs"><\/script>';
  }
  
  var erudaConsole = tdimjs.$("#erudaConsole");
  var erudaConsoleVal = " ";
  if (erudaConsole.checked == true) {
    erudaConsoleVal =
      '<script src="' + editorHost + '/assets/plugins/eruda/eruda.js"><\/script>' +
      '<script src="' + editorHost + '/assets/plugins/eruda/conf.js"><\/script>';
  }
  
  var markdownEnable = tdimjs.$("#markdownEnable");
  var markdownEnableVal1 = " ";
  var markdownEnableVal2 = " ";
  if (markdownEnable.checked == true) {
    markdownEnableVal1 =
      '<link rel="stylesheet" href="' + editorHost + '/assets/plugins/marked/atom-one-light.min.css" />' +
      '<link rel="stylesheet" href="' + editorHost + '/assets/plugins/marked/github-markdown.min.css" />' +
      '<template type="markdown">';
    markdownEnableVal2 =
      '<\/template>' +
      '<script src="' + editorHost + '/assets/plugins/marked/marked.min.js"><\/script>' +
      '<script src="' + editorHost + '/assets/plugins/marked/highlight.min.js"><\/script>' +
      '<script src="' + editorHost + '/assets/plugins/marked/javascript.min.js"><\/script>';
  }
  
  var iframe = "<!DOCTYPE html>"
    + "<html>"
    + "<head>"
    + '<meta http-equiv="content-type" content="text/html; charset=utf-8" />'
    + domConsoleVal + erudaConsoleVal
    + headEditor.getValue()
    + "<style>"
    + css.getValue()
    + "<\/style>"
    + "</head>"
    + "<body>"
    + markdownEnableVal1 + html.getValue() + markdownEnableVal2
    + "<script>"
    + js.getValue()
    + "</script>"
    + "</body>"
    + "</html>";
  var preview = new Blob([iframe], {
    type: "text/html"
  });
  preview = window.URL.createObjectURL(preview);
  if (rawPreview == true) {
    window.open(preview);
    //console.log(rawPreview, preview);
  } else {
    window.play.src = preview;
  }
}

/* Inserter Functions [color, symbols, file] */
let cIn = html;
function inSelect(addIn, fname) {
  cIn = addIn;
  window.fname.value = fname;
  return cIn;
}
const inputElement = document.querySelector('.pickr');
const pickr = new Pickr({
  el: inputElement,
  useAsButton: true,
  default: '#FF5500',
  theme: 'monolith',
  swatches: ['#FF5500', '#0099FF', '#E91E63', '#9C27B0', '#673AB7', '#00FFFF', '#00FF00'],
  position: 'top-start',
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      rgba: true,
      hsva: true,
      input: true,
      save: true
    }
  },
  i18n: {
    'btn:save': 'Copy'
  }
}).on('save', (color, pickr) => {
  //inputElement.value = color.toHEXA().toString(0);
  inputElement.style.background = pickr.getRoot().interaction.result.value;
  pickr.getRoot().interaction.result.select();
  document.execCommand("copy");
  pickr.hide();
})

function insert(todo) {
  cIn.insert(todo);
  cIn.focus();
}

function toggleInserter() {
  window.html.container.classList.toggle('toggleInserter');
  window.css.container.classList.toggle('toggleInserter');
  window.js.container.classList.toggle('toggleInserter');
  document.querySelector(".fa-list").classList.toggle("blue");
}

function read64(e) {
  const file = e.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    let data64all = reader.result;
    let dataContent = data64all.slice(data64all.indexOf(";base64,") + 8, data64all.length);
    cIn.setValue(atob(dataContent));
  };
  reader.readAsDataURL(file);
}

/* move up & down - copy up & down*/
function mumdcucd(defAction) {
  if (defAction == "0") {
    cIn.moveLinesUp()
  } else if (defAction == "1") {
    cIn.moveLinesDown()
  } else if (defAction == "2") {
    cIn.copyLinesUp()
  } else if (defAction == "3") {
    cIn.copyLinesDown()
  }
}

/* The Full Screen Function And Ctrl Action With "Q" */
function full() {
  var doc = window.document;
  var docEl = doc.documentElement;
  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || pdoc.msExitFullscreen;
  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}
document.body.addEventListener("keydown", function(e) {
  if (e.ctrlKey) {if (e.keyCode == 113) {
      full();e.preventDefault();
    }}
});

/* The Storage Manager Function For Save Codes On Browser Storage*/
function storage(action) {
  if (action == "restore") {
    var sdDatas = window.localStorage.getItem("sdData");
    if (sdDatas) {
      var datas = JSON.parse(atob(sdDatas));
      headEditor.setValue(datas["headEditor"]);
      html.setValue(datas["html"]);
      css.setValue(datas["css"]);
      js.setValue(datas["js"]);
      toasta("Restoring...");
    }
  }
  if (action == "save") {
    var sdData = {
      "headEditor": headEditor.getValue(),
      "html": html.getValue(),
      "css": css.getValue(),
      "js": js.getValue()
    };
    window.localStorage.setItem("sdData", btoa(JSON.stringify({
      "headEditor": headEditor.getValue(),
      "html": html.getValue(),
      "css": css.getValue(),
      "js": js.getValue()
    })));
    toasta("Saving...");
    loading();
  }
  if (action == "clear") {
    window.localStorage.delete("sdData");
    toasta("Cleaning...");
    loading();
  }
}
storage("restore");

/* Code Beautifier function */
function tidy(text) {
  var tidy = {
    "indent_size": 2,
    "indent_empty_lines": true,
    "templating": ["auto"]
  }
  if (text == oneTemplate()) return html_beautify(text, tidy);
  if (text == html.getValue()) return html_beautify(text, tidy);
  if (text == css.getValue()) return css_beautify(text, tidy);
  if (text == js.getValue()) return js_beautify(text, tidy);
}

/* file raw & download functions */
function oneTemplate() {
  var oneTemplate = "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    '<meta http-equiv="content-type" content="text/html; charset=utf-8" \/>\n' +
    headEditor.getValue() +
    "\n<style>\n" +
    css.getValue() +
    "\n<\/style>\n" +
    "<\/head>\n" +
    "<body>\n" +
    html.getValue() +
    "\n<script>\n" +
    js.getValue() +
    "\n<\/script>\n" +
    "<\/body>\n" +
    "<\/html>";
  return oneTemplate;
}

function raw(text) {
  if (text == "oneTemplate") {
    text = oneTemplate();
  }
  text = tidy(text);
  var blob = new Blob([text], {
    type: "text/plain"
  });
  var url = window.URL.createObjectURL(blob);
  window.open(url)
}

function dFile(text, filename) {
  if (text == "oneTemplate") {
    text = oneTemplate();
  }
  var down = document.createElement("a");
  text = tidy(text);
  var blob = new Blob([text], {
    type: "text/plain"
  });
  down.download = filename;
  var url = window.URL.createObjectURL(blob);
  down.target = "_blank";
  down.href = url;
  down.click();
}

/* Toast Maker Function*/
function toasta(text) {
  window.toast.style.display = "flex";
  if (text) {
    window.toastText.innerHTML = text;
  } else {
    text = window.toastText.innerHTML
  }
  setTimeout(() => {
    window.toast.style.display = "none";
  }, +2500);
}

/* Loading function */
function loading() {
  document.querySelector(".L-loader").style.display = "flex";
  setTimeout(() => {
    document.querySelector(".L-loader").style.display = "none";
  }, +2500);
}

/* Project Manager*/
const penList = window.te;
const penKeys = Object.keys(window.localStorage);
for (const penKey of penKeys) {
  const penOption = document.createElement('option');
  penOption.textContent = penKey;
  penOption.value = penKey;
  if (penKey != "sdData" && penKey != "eruda-sources" && penKey != "eruda-resources" && penKey != "eruda-entry-button" && penKey != "eruda-elements" && penKey != "eruda-dev-tools" && penKey != "eruda-console") {
    penList.appendChild(penOption);
  }
}

function penManager(action) {
  if (action == "save") {
    var tead = JSON.stringify({
      "html": html.getValue(),
      "css": css.getValue(),
      "js": js.getValue(),
      "head": headEditor.getValue()
    });
    var ghk = window.ghk;
    var opt = document.createElement('option');
    if (ghk.value !== "") {
      window.localStorage.setItem(ghk.value, tead);
      opt.textContent = ghk.value;
      opt.value = ghk.value;
      penList.appendChild(opt);
    } else {
      alert("Name Required")
    }
  }
  if (action == "remove") {
    var ecs = window.te;
    var secs = ecs.options[ecs.selectedIndex].value;
    if (confirm(' Do you want to delete [' + secs + '] ?')) {
      window.localStorage.removeItem(secs);
      if (secs != "false") {
        ecs.remove(ecs.selectedIndex);
      }
    }
  }
  if (action == "restore") {
    var e = window.te;
    var scs = e.options[e.selectedIndex].value;
    var ghk = window.ghk;
    if (scs != "false") {
      ghk.value = scs;
      html.setValue(JSON.parse(window.localStorage.getItem(scs)).html);
      css.setValue(JSON.parse(window.localStorage.getItem(scs)).css);
      js.setValue(JSON.parse(window.localStorage.getItem(scs)).js);
      headEditor.setValue(JSON.parse(window.localStorage.getItem(scs)).head);
    }
  }
}