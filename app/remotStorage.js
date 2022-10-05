const request = new XMLHttpRequest();
request.open("POST", "https://json.extendsclass.com/bin", true);
request.setRequestHeader("Api-key", "e2b5fc25-68d5-11ec-b95c-0242ac110002");
request.send('{"name7h": "my JSObN"}');
request.onload = () => {
  console.log("http://editor.tdim.me/preview/"+JSON.parse(request.responseText).id);
};

var wget=(url,format)=>{
  if(format=="json"){
  return fetch(url).then(response =>response.json());
  }
  else{
  return fetch(url).then(response =>response.text());
  }
};
  wget("https://pastebin.com/raw/Kc6nxKUV").then(output => {
    console.log(output);
  });
  wget("http://tdim.epizy.com/ben/?&code=test code").then(output => {
    console.log(output);
  });