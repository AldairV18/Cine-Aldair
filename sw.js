const CACHE_NAME = "Boveda3";
const CACHE_IMG = "Imagenes";


self.addEventListener("install", (event) => {
    caches.delete(CACHE_NAME);
    caches.delete(CACHE_IMG);
    const recursos = caches.open(CACHE_NAME).then((cache) => {
        cache.add("/");
        cache.add("app.js");
        cache.add("appCine.js");
        cache.add("index.html");
        cache.add("node_modules/bootstrap/dist/css/bootstrap.css");
        cache.add("manifest.json")
    });
  
    const Imagenes = caches.open(CACHE_IMG).then((cache) => {
        cache.add("/");
        cache.add("logo.png");
        cache.add("cars.jpg");
        cache.add("meg.jpg");
        cache.add("potter.jpg");
        cache.add("conjuro.jpg");
        cache.add("monja.jpg");
        cache.add("portada.jpeg");
    });


    event.waitUntil(recursos);
  });


  // self.addEventListener("fetch", (event) => {
  //   event.respondWith(
  //     caches.match(event.request).then((cachedResponse) => {
  //       if (cachedResponse) {
  //         // Si la solicitud se encuentra en la caché, devolverla
  //         return cachedResponse;
  //       } else {
  //         return fetch(event.request).then((newResp) => {
  //           if (event.request.headers.get("Accept").includes("image")) {
  //             // Si la solicitud es una imagen, guárdala en "Imagenes"
  //             return caches.open(CACHE_IMG).then((cache) => {
  //               cache.put(event.request, newResp.clone());
  //               return newResp;
  //             });
  //           } else {
  //             // Guarda todas las demás solicitudes en "Boveda3"
  //             return caches.open(CACHE_NAME).then((cache) => {
  //               cache.put(event.request, newResp.clone());
  //               return newResp;
  //             });
  //           }
  //         }).catch(err => {
  //           return caches.match(event.request);
  //         });
  //       }
  //     })
  //   );
  // });





  self.addEventListener("fetch", (event) => {
    // Estrategia 3 abajo 
    const respuesta = fetch(event.request).then((newResp) => {
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, newResp);
      });

      return newResp.clone();      
    }).catch(err =>{
      return caches.match(event.request);
    })
    event.respondWith(respuesta);
});




      //estretegia 1 only cache
    //estretegia 2 first cache, then network
    //estrategia 3 first network, then cache 

  // estrategia 2 abajo 
    /*const respuesta = caches.match(event.request).then((res) => {
      if (res) return res;
      //no existe el archivo
      //tengo que ir a la web
      console.log("No existe", event.request.url);
  
      return fetch(event.request).then((newResp) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, newResp);
        });
  
        return newResp.clone();
      });
    });
    event.respondWith(respuesta);
    */