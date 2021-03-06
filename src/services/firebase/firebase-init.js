// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { notification } from "antd";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export const messaging = getMessaging(firebaseApp);

export const requestForToken = (setMessToken) => {
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_CLOUD_MESSAGE_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        setMessToken(currentToken);
      } else {
        // Show permission request UI
        notification["error"]({
          message: `No registration token available!`,
          description:
            "No registration token available. Request permission to generate one.",
          duration: 2,
        });
      }
    })
    .catch((err) => {
      notification["error"]({
        message: `Error!`,
        description: "An error occurred while retrieving token. " + err,
        duration: 2,
      });
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
