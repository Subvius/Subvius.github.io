'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "980547175e325fe622a3362b84d55b6a",
"favicon.ico": "a34a4bfbf1bf11bed749938171eaf7f8",
"index.html": "f25bbf8326e97711ef2717d43e7ff87e",
"/": "f25bbf8326e97711ef2717d43e7ff87e",
"main.dart.js": "d08dab59cab18fe4f45e23f62cf5b45e",
"flutter.js": "0b19a3d1d54c58174c41cd35acdd9388",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "90c454c29b48f08bc06627d125f70466",
"assets/AssetManifest.json": "df7039858c00d510603ad824cdf1070c",
"assets/NOTICES": "d84d84e26fc4d9f6ef0cf9886d559b06",
"assets/FontManifest.json": "5c337b58f3f57910b4c930b256433c03",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "63f2ff297405e8e7add88b490e137772",
"assets/fonts/MaterialIcons-Regular.otf": "e5d7a16ee8e9c93bd4d74cb5e63dc5eb",
"assets/assets/images/img_1.png": "ef1b888959495b49bf3555c27e45c521",
"assets/assets/images/blocks_icon.svg": "ba3ec03653823201349753b223e82e65",
"assets/assets/images/main.jpg": "ec840f577197e273b9d103ab56d54b85",
"assets/assets/images/home_icon-filled.png": "0d88c0469826246198df22199742339b",
"assets/assets/images/gym_training.jpg": "ec840f577197e273b9d103ab56d54b85",
"assets/assets/images/dashboard_icon.png": "e80b68e62941907cbf293ffe15d7f63a",
"assets/assets/images/home_icon.png": "335d4cec4fe992b966ddce86953326dd",
"assets/assets/images/gallery_photo-0.jpeg": "7f7788b5e0a2c0560fc04a0dd06831cf",
"assets/assets/images/ice_training.jpeg": "aceb556fe939b51982dcb5920ea709b9",
"assets/assets/images/features_of_the_work.jpeg": "72465f2876cba5ef9b9d3cefd6609cb6",
"assets/assets/images/wrench_icon.svg": "0f5905dd00b87adb80462fb1c7c09cbe",
"assets/assets/images/dashboard_icon-filled.png": "8943e5c75d80bc2b50a66f1adfc46cbe",
"assets/assets/images/img.png": "5aea51d1e52f2703378ae084e699d720",
"assets/assets/images/gallery_photo-1.jpeg": "b860e4f85bd06a28840f41c886c42e5f",
"assets/assets/images/board_icon.svg": "67b00d79c2b801b9498f49563bc13731",
"assets/assets/images/gallery_photo-2.jpeg": "28c96c785a2172072c7402336182e516",
"assets/assets/images/smile.svg": "b20d14ecaa617d643ebf337bbbe25d1b",
"assets/assets/images/hero-base-desktop.svg": "c8b1b04a242c333096434ad022476103",
"assets/assets/images/empty_user_avatar.jpg": "ec73ea4e7783bf3a6b1f21ba99476a9d",
"assets/assets/images/logo.png": "8151dcf5e3cf3768739a7670acdd87fd",
"assets/assets/images/gallery_photo-3.jpeg": "56b8e022b6c826859c44108423ed9562",
"assets/assets/images/gallery_photo-4.jpeg": "1ffc4ab156d79cb9840883006937e20b",
"assets/assets/images/widget_chart.svg": "eafd15041fa71ffe7fadf929e689d0bf",
"assets/assets/images/hero-1.svg": "75fb9385a1f0d5abf39b45f13ef491f4",
"assets/assets/images/gallery_photo-5.jpeg": "639268e547a14b4cce73449bc964980e",
"assets/assets/font/Panton.ttf": "a53aaed7fcc9d1cc4560eaf4a69d77c1",
"canvaskit/skwasm.js": "5256dd3e40ec9fe1fc9faa51a116bcfd",
"canvaskit/skwasm.wasm": "4e8794ddf4a38d9d979502cced963d9f",
"canvaskit/chromium/canvaskit.js": "2829bb10a7eb9912e12b452dfd671141",
"canvaskit/chromium/canvaskit.wasm": "7a1bea507c76779850ab738ff5eb598f",
"canvaskit/canvaskit.js": "3bd93dfe6f74ec4261f82b4d4c2c63dc",
"canvaskit/canvaskit.wasm": "acffb57c88613883935113f62d3f1cef",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
