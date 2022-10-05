    const penList=window.te;
    const penKeys=Object.keys(window.localStorage);
    for(const penKey of penKeys){
      const penOption=document.createElement('option');
      penOption.textContent=penKey;
      penOption.value=penKey;
      penList.appendChild(penOption);
    }
    function penManager(action) {
      if (action == "save") {
        var tead=JSON.stringify({
          "html" : window.ta1.value,
          "css" : window.ta2.value,
          "js" : window.ta3.value,
          "head" : window.ta4.value
        });
        var ghk=window.ghk;
        var opt=document.createElement('option');
        if(ghk.value!==""){
          window.localStorage.setItem(ghk.value,tead);
          opt.textContent=ghk.value;
          opt.value=ghk.value;
          list.appendChild(opt);
        }
      }
      if (action == "remove") {
        var ecs=window.te;
        var secs=ecs.options[ecs.selectedIndex].value;
        if(confirm(' Do you want to delete ['+secs+'] ?')){
          window.localStorage.removeItem(secs);
          if(secs!="false"){ecs.remove(ecs.selectedIndex);}
        }
      }
      if (action == "restore") {
        var e=window.te;
        var scs=e.options[e.selectedIndex].value;
        var ghk=window.ghk;
        if(scs!="false"){
          ghk.value=scs;
          window.ta1.value=JSON.parse(window.localStorage.getItem(scs)).html;
          window.ta2.value=JSON.parse(window.localStorage.getItem(scs)).css;
          window.ta3.value=JSON.parse(window.localStorage.getItem(scs)).js;
          window.ta4.value=JSON.parse(window.localStorage.getItem(scs)).head;
        }
      }
    }