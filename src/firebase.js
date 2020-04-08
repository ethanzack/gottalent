import firebase from 'firebase';
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAGvZ7a8zHdrwwLICKIHmGZx6WjnNYDpb4",
  authDomain: "talentidea-22c36.firebaseapp.com",
  databaseURL: "https://talentidea-22c36.firebaseio.com",
  projectId: "talentidea-22c36",
  storageBucket: "talentidea-22c36.appspot.com",
  messagingSenderId: "410529826390",
  appId: "1:410529826390:web:cf16615a0bf38412c21df7",
  measurementId: "G-8B8BF90H12"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()
export {
  storage, firebase as default
}
