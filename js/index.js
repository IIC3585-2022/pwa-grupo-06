// Import the functions you need from the SDKs you need
import { initializeApp } from "./node_modules/firebase/app";
import { getAnalytics } from "./node_modules/firebase/analytics";
import { getMessaging } from "./node_modules/firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiiDUincmDNXCFcAlVXxR0y6tZqMeclWU",
  authDomain: "ctplmdc.firebaseapp.com",
  projectId: "ctplmdc",
  storageBucket: "ctplmdc.appspot.com",
  messagingSenderId: "347639001430",
  appId: "1:347639001430:web:76af4be10c775e5f81a6f7",
  measurementId: "G-82XYRRQSDM"
};

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log(registration);
    }).catch(error => {
        console.error(error);
    });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);