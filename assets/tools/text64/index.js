var text=window.code;
function base64() {
  text.value=btoa(text.value);
}
function utf() {
  text.value=atob(text.value);
}
function copy(input) {
  input.select();
  document.execCommand('copy');
}