import { authenticationActions } from "./notification.slice";
import {messagein}
import { getToken, onMessage } from "firebase/messaging";
import Cookies from "js-cookie";

export const initFcmToken = () => {
  return (dispatch) => {
    const handleGetFcmToken = async () => {
      await getToken(messaging, {
        vapidKey: process.env.REACT_APP_CLOUD_MESSAGE_KEY,
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("current token for client: ", currentToken);
            setMessToken(currentToken);
            //TODO: call API to store FCM
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    };
  };
};
