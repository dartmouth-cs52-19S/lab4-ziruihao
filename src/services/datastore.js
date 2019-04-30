import firebase from 'firebase';
import 'firebase/auth';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDWnpu_TH3IWAQbAQ0T1YwCqr6-bFaDdr4',
  authDomain: 'cs52-crud.firebaseapp.com',
  databaseURL: 'https://cs52-crud.firebaseio.com',
  projectId: 'cs52-crud',
  storageBucket: 'cs52-crud.appspot.com',
  messagingSenderId: '554640161181',
};
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

/**
 * Logs the user in via firebase.
 */
export function auth(uidCallback) {
  firebase.auth().signInWithPopup(provider).then((result) => {
    const { uid } = result.user;
    const { displayName } = result.user;
    const { photoURL } = result.user;
    uidCallback(uid, displayName, photoURL);
    console.log(`user ${displayName} logged in`);
  }).catch((error) => {
    console.log(`error in authentication: ${error}`);
  });
}

/**
 * Logs the user out via firebase.
 */
export function deAuth() {
  firebase.auth().signOut().then(() => {
  }).catch((error) => {
    console.log(`error in deauthentication: ${error}`);
  });
}
