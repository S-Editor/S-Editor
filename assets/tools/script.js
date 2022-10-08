var old="";
function getMe(tool) {
  window.contents.style.display="block";
  document.querySelector(tool).style.display="block";
  old = tool;
  return old;
}
function closeMe(){
  window.contents.style.display="none";
  document.querySelector(old).style.display="none";
}