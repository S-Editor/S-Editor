function viewSource(link) {
  let xhrFile = new XMLHttpRequest();
  xhrFile.open('GET', link);
  xhrFile.send();
  xhrFile.onload = function() {
     $().result(xhrFile.response);
  };
}