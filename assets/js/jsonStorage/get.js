//fetch("https://json.extendsclass.com/bin/5e22441d333e").then(res=>res.json()).then(res=>{console.log(res);});

const request = new XMLHttpRequest();
request.open("GET", "https://json.extendsclass.com/bin/5367531dde4e", true);
//request.setRequestHeader("Security-key", "remote db");
request.onload = () => {
	console.log(request.responseText);
};
request.send();


//get all ids
/*
const request = new XMLHttpRequest();
request.open("GET", "https://json.extendsclass.com/bins", true);
request.setRequestHeader("Api-key", "e2b5fc25-68d5-11ec-b95c-0242ac110002");
request.onload = () => {
	console.log(JSON.parse(request.responseText));
};
request.send();*/