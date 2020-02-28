console.log("Hello from service-worker.js");

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
);

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
