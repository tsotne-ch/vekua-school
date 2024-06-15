import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const secondaryAppConfig = {
  apiKey: process.env.REACT_APP_SECONDARY_API_KEY,
  authDomain: process.env.REACT_APP_SECONDARY_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_SECONDARY_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SECONDARY_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SECONDARY_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_SECONDARY_APP_ID,
  measurementId: process.env.REACT_APP_SECONDARY_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const secondaryApp = firebase.initializeApp(secondaryAppConfig, "secondary");
const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { secondaryApp, firebaseConfig, firestore, auth, storage, firebase };
