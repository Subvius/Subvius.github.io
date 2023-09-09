'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "favicon%202.png": "5dcef449791fa27946b3d35ad8803796",
"version.json": "980547175e325fe622a3362b84d55b6a",
"favicon.ico": "a34a4bfbf1bf11bed749938171eaf7f8",
"index.html": "f6bca8c7cc527b01fd607e0ed473efc4",
"/": "f6bca8c7cc527b01fd607e0ed473efc4",
"main.dart.js": "0f8f5af5c281f0b340cbf3c6f40bd974",
"flutter.js": "8ae00b472ec3937a5bee52055d6bc8b4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "90c454c29b48f08bc06627d125f70466",
"manifest%202.json": "90c454c29b48f08bc06627d125f70466",
"assets/AssetManifest.json": "d3286d4b61cdb9ae2ba984a8a4d4c928",
"assets/NOTICES": "ac446d54a1d574d6a2455bf3c71af679",
"assets/FontManifest.json": "5c337b58f3f57910b4c930b256433c03",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "2ad5fabd6a36a6deff087b8edfd0c1f8",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/img_1.png": "ef1b888959495b49bf3555c27e45c521",
"assets/assets/images/blocks_icon.svg": "ba3ec03653823201349753b223e82e65",
"assets/assets/images/main.jpg": "ec840f577197e273b9d103ab56d54b85",
"assets/assets/images/dashboard_icon.png": "e80b68e62941907cbf293ffe15d7f63a",
"assets/assets/images/home_icon.png": "0d88c0469826246198df22199742339b",
"assets/assets/images/gallery_photo-0.jpeg": "7f7788b5e0a2c0560fc04a0dd06831cf",
"assets/assets/images/ice_training.jpeg": "aceb556fe939b51982dcb5920ea709b9",
"assets/assets/images/features_of_the_work.jpeg": "72465f2876cba5ef9b9d3cefd6609cb6",
"assets/assets/images/wrench_icon.svg": "0f5905dd00b87adb80462fb1c7c09cbe",
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
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
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
