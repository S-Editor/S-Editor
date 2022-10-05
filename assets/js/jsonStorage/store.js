"use strict";
var rdb = class TdimJsRemoteDBClass {
  constructor() {
    this.apiKey="";
    this.store = (data) => {
      return fetch ("https://json.extendsclass.com/bin",{
        method: "POST",
        headers: {"Api-key":rdb.apiKey},
        body: data
      }).then(res=>res.json());
    };
    this.update = (data, id) => {
      const request = new XMLHttpRequest();
      request.open("PUT", "https://json.extendsclass.com/bin/"+id, true);
      request.onload = () => {
        console.log(JSON.parse(request.responseText));
      };
      request.send(data);

    };
    this.get = (id) => {
      if (!id) id = "";
      return fetch("https://json.extendsclass.com/bin/" + id).then(res => res.text());
    };
    this.all = () => {
      return fetch("https://json.extendsclass.com/bins",{
        method: "GET",
        headers:{"Api-key":rdb.apiKey}
      }).then(res=>res.json());
    };
    this.delete = (id) => {
      fetch("https://json.extendsclass.com/bin/"+id,{
        method: "DELETE"
      }).then(res=>res.json).then(res=>console.log(`Id ${id} deleted`));
    };
    this.clear = () => {
      fetch("https://json.extendsclass.com/bins",{
        method: "GET",
        headers:{"Api-key":rdb.apiKey}
      }).then(res=>res.json())
      .then(res=>{
          for (var i = 0; i <= res.length; i++) {
            rdb.delete(res[i]);
          }
        console.log("API cleared");
      });
    };
  }
};

rdb = new rdb();
rdb.apiKey="e2b5fc25-68d5-11ec-b95c-0242ac110002";
function tests(){
  //rdb.store("{}"); //bfdd3b461a9d
  rdb.get("bfdd3b461a9d").then(res=>console.log(res)); // "{}"
  rdb.update("{'test':123}","bfdd3b461a9d");
  rdb.get("bfdd3b461a9d").then(res=>console.log(res)); // "{'test':123}"
  rdb.all().then(res=>console.log(res)); // Array with data
  rdb.delete("bfdd3b461a9d"); // "id bfdd3b461a9d deleted"
  rdb.clear(); // API cleared
  rdb.all().then(res=>console.log(res)); // Array without data
}