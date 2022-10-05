import { W as e } from "./vendor.js";
!(function () {
  const e = document.createElement("link").relList;
  if (!(e && e.supports && e.supports("modulepreload"))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e);
    new MutationObserver((e) => {
      for (const o of e) if ("childList" === o.type) for (const e of o.addedNodes) "LINK" === e.tagName && "modulepreload" === e.rel && t(e);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function t(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = (function (e) {
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
  (t.innerText = e), r.appendChild(t);
}
i("> ⁂ waiting for form submission..."),
  t.addEventListener(
    "submit",
    async function (t) {
      t.preventDefault(), i("> 📦 creating web3.storage client");
      const c = n.value,
        s = new e({ token: c });
      i("> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID");
      const l = o.files,
        a = await s.put(l, {
          onRootCidReady: (e) => {
            i(`> 🔑 locally calculated Content ID: ${e} `), i("> 📡 sending files to web3.storage ");
          },
          onStoredChunk: (e) => i(`> 🛰 sent ${e.toLocaleString()} bytes to web3.storage`),
        });
      i(`> ✅ web3.storage now hosting ${a}`),
        (function (e) {
          const t = document.createElement("a");
          t.href = e;
          t.innerHTML = `> 🔗 ${e}`;
          r.appendChild(t);
        })(`https://dweb.link/ipfs/${a}`),
        i("> 📡 fetching the list of all unique uploads on this account");
      let u = 0;
      for await (const e of s.list()) i(`> 📄 ${e.cid}  ${e.name}`), (u += e.dagSize || 0);
      i(`> ⁂ ${u.toLocaleString()} bytes stored!`);
    },
    !1
  );
