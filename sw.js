self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            cache.addAll(['./', './src/styles.css', './images/logo.png', './images/manifest-icon-192.maskable.png'])
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
        )
});

self.addEventListener('push', function(e) {
    var options = {
      body: 'This notification was generated from a push!',
      icon: 'images/logo.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2'
      },
      actions: [
        {action: 'explore', title: 'Explore this new world',
          icon: 'images/logo.png'},
        {action: 'close', title: 'Close',
          icon: 'images/logo.png'},
      ]
    };
    e.waitUntil(
      self.registration.showNotification('Hello world!', options)
    );
  });