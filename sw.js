const C="menus-v1",F=["./","index.html","manifest.webmanifest","icon-180.png","icon-512.png","recettes.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);
 if(u.pathname.endsWith("recettes.json")||u.pathname.endsWith("index.html")||u.pathname.endsWith("/")){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))}
 else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
