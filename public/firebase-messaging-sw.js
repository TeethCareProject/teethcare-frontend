// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyD0DnyoeAzqU0vlbNjaJaof1M5CV8bQ7Qk",
  authDomain: "teethcare-66fd1.firebaseapp.com",
  databaseURL:
    "https://teethcare-66fd1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "teethcare-66fd1",
  storageBucket: "teethcare-66fd1.appspot.com",
  messagingSenderId: "402672546513",
  appId: "1:402672546513:web:fb0c44a5491319bfcecbf0",
  measurementId: "G-NB2YV501NB",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  // };
  // self.registration.showNotification(notificationTitle, notificationOptions);
});
