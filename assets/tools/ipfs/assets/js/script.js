import { W as e } from "./vendor.js";
!(function() {
  const e = document.createElement("link").relList;
  if (!(e && e.supports && e.supports("modulepreload"))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e);
    new MutationObserver((e) => {
      for (const o of e)
        if ("childList" === o.type)
          for (const e of o.addedNodes) "LINK" === e.tagName && "modulepreload" === e.rel && t(e);
    }).observe(document, {
      childList: !0,
      subtree: !0
    });
  }
  
  function t(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = (function(e) {
      const t = {};
      return (
        e.integrity && (t.integrity = e.integrity),
        e.referrerpolicy && (t.referrerPolicy = e.referrerpolicy),
        "use-credentials" === e.crossorigin ? (t.credentials = "include") : "anonymous" === e.crossorigin ? (t.credentials = "omit") : (t.credentials = "same-origin"),
        t
      );
    })(e);
    fetch(e.href, t);
  }
})();

const t = document.querySelector("#upload-form"),
  o = document.querySelector("#filepicker"),
  n = document.querySelector("#token"),
  r = document.querySelector("#output");
function i(e) {
  const t = document.createElement("div");
  (t.innerHTML = e), r.appendChild(t);
}

i(`<il>[0/3] Select files to upload.</il>`),
  t.addEventListener(
    "submit",
    async function(t) {
        i(`<il>[1/3] Uploading your files.</il>`),
          t.preventDefault();
        const c = n.value,
          s = new e({
            token: c
          });
        const l = o.files,
          a = await s.put(l, {});
        (function(e) {
          const t = document.createElement("a");
          t.href = e;
          t.target="_blank";
          t.innerHTML = `<il>[2/3] Files uploaded.</il>`;
          r.appendChild(t);
        })(`https://${a}.ipfs.dweb.link/`);
        sizers();
        i(`<il>[3/3] ${window.xr} kb stored!</il>`);
      },
      !1
  );