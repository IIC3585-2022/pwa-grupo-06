importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCiiDUincmDNXCFcAlVXxR0y6tZqMeclWU",
    authDomain: "ctplmdc.firebaseapp.com",
    projectId: "ctplmdc",
    storageBucket: "ctplmdc.appspot.com",
    messagingSenderId: "347639001430",
    appId: "1:347639001430:web:76af4be10c775e5f81a6f7",
    measurementId: "G-82XYRRQSDM"
  });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload['notification']['title'];
    const notificationOptions = {
      body: payload['notification']['body'],
      icon: payload['notification']['image']
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
});

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            cache.addAll(['./', './src/styles.css', './images/logo.png', './images/manifest-icon-192.maskable.png', './images/next_song.png'])
        })
    );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());
});