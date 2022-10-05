"use strict";
var tdimjs = class TdimJs {
  constructor() {
    var engine = {
      requirements: class TdimJsRequireClass {
        constructor() {
          this.data = [];
          this.str = "";
          this.add = (requiredData, requiredDataType) => {
            if (!requiredDataType) {
              fetch(requiredData).then(res => res.text())
                .then(res => {
                  this.data[this.data.length] = res;
                  this.str += `\n${res}`;
                });
            } else {
              this.data[this.data.length] = requiredData;
              this.str += `\n${requiredData}`;
            }
          };
          this.push = (dataType, pushWhere) => {
            if (dataType == "js") {
              var blob = new Blob([this.str], {
                type: 'text/javascript'
              });
              var blobUrl = URL.createObjectURL(blob);
              var reqObj = document.createElement('script');
              reqObj.src = blobUrl;
              if (!pushWhere) pushWhere = document.head;
              pushWhere.appendChild(reqObj);
            } else if (dataType == "css") {
              var blobCss = new Blob([this.str], {
                type: 'text/css'
              });
              var blobUrlCss = URL.createObjectURL(blobCss);
              var reqObjCss = document.createElement('link');
              reqObjCss.rel = "stylesheet";
              reqObjCss.href = blobUrlCss;
              if (!pushWhere) pushWhere = document.head;
              pushWhere.appendChild(reqObjCss);
            }
          };
          this.clear = () => {
            this.data = [];
            this.str = "";
          };
        }
      },
      db: class TdimJsDbClass {
        constructor() {
          var lstrg = window.localStorage;
          if (lstrg) return lstrg;
          else return "Your browser doesn't support the localStorage !";
        }
      },
      dolarActions: class TdimJsDolarActionsClass {
        constructor(bridge) {
          this.style = bridge.style;
          this.show = (e) => {
            if (!e) e = "";
            bridge.style.display = e;
          };
          this.hide = () => {
            bridge.style.display = "none";
          };
          this.gCenter = () => {
            bridge.style.display = "flex";
            bridge.style.justifyContent = "center";
            bridge.style.alignItems = "center";
          };
        }
      },
      $: (el, place) => {
        var name = el;
        if (place) el = document.querySelectorAll(el)[place];
        else el = document.querySelector(el);
        if (!el) el = window;
        el.els = el.children;
        el.$ = (elin, place) => {
          var namein = elin;
          if (!place) place = 0;
          if (!elin) elin = window;
          else elin = el.querySelectorAll(elin)[place];
          elin.els = elin.children;
          elin.do = new engine.dolarActions(elin);
          elin.$ = el.$;
          return elin;
        };
        el.do = new engine.dolarActions(el);
        return el;
      },
      doAfter: (action, sleep) => {
        var inv = window.setInterval(function() {
          action();
          window.clearInterval(inv);
        }, sleep);
      },
      rdb: class TdimJsRemoteDBClass {
        constructor() {
          this.apiKey = "";
          this.store = (data) => {
            return fetch("https://json.extendsclass.com/bin", {
              method: "POST",
              headers: {
                "Api-key": tdimjs.rdb.apiKey
              },
              body: data
            }).then(res => res.json());
          };
          this.update = (data, id) => {
            const request = new XMLHttpRequest();
            request.open("PUT", "https://json.extendsclass.com/bin/" + id, true);
            request.onload = () => {
              console.log("Id data Updated");
            };
            request.send(data);
            
          };
          this.get = (id) => {
            if (!id) id = "";
            return fetch("https://json.extendsclass.com/bin/" + id).then(res => res.text());
          };
          this.all = () => {
            return fetch("https://json.extendsclass.com/bins", {
              method: "GET",
              headers: {
                "Api-key": tdimjs.rdb.apiKey
              }
            }).then(res => res.json());
          };
          this.delete = (id) => {
            fetch("https://json.extendsclass.com/bin/" + id, {
              method: "DELETE"
            }).then(res => res.json).then(res => console.log(`Id ${id} deleted`));
          };
          this.clear = () => {
            fetch("https://json.extendsclass.com/bins", {
                method: "GET",
                headers: {
                  "Api-key": tdimjs.rdb.apiKey
                }
              }).then(res => res.json())
              .then(res => {
                for (var i = 0; i <= res.length; i++) {
                  tdimjs.rdb.delete(res[i]);
                }
                console.log("API cleared");
              });
          };
        }
      },
      ldb: class localDBClass{
        constructor(){
          var browserLDBTypes=window.localStorage;
          if(browserLDBTypes){
            var engine={
              "use":browserLDBTypes,
            };
            this.newDB=(name)=>{
              engine.use.setItem(name,"{}");
              //console.log(engine.use);
            };
            this.delDB=(name)=>{
              engine.use.removeItem(name);
            };
            this.exist=(name)=>{
              if(name in engine.use){
                return true;
              } else return false;
            };
            this.clear=(name)=>{
              engine.use.clear();
            };
            this.ldbs=()=>{
              var dbs={};
              for(var i=0;i<engine.use.length;i++){
                dbs[engine.use.key(i)]=engine.use[engine.use.key(i)];
              }
              return dbs;
            };
            this.data=(name)=>{
              return JSON.parse(engine.use.getItem(name));
            };
            this.set=(name,key,value)=>{
              var parse=JSON.parse(engine.use.getItem(name));
              parse[key]=value;
              engine.use.setItem(name,JSON.stringify(parse));
            };
            this.get=(name,key)=>{
              var parse=JSON.parse(engine.use.getItem(name));
              var res=parse[key];
              engine.use.setItem(name,JSON.stringify(parse));
              return res;
            };
            this.del=(name,key)=>{
              var parse=JSON.parse(engine.use.getItem(name));
              delete parse[key];
              engine.use.setItem(name,JSON.stringify(parse));
            };
          } else{
            this.message="Your browser doesn't support localStorage!";
          }
        }
      }
    };
    this.req = new engine.requirements();
    this.db = new engine.db();
    this.rdb = new engine.rdb();
    this.ldb = new engine.ldb();
    this.$ = engine.$;
    this.doAfter = engine.doAfter;
    this.domain = window.origin;
  }
};
window.tdimjs = new tdimjs();