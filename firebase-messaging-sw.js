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
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
});

messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
});