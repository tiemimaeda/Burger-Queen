import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyASu9cwxw6Tjdx8VW4jw7u8ihohqZdmDoo",
  authDomain: "burger-queen-ptm.firebaseapp.com",
  databaseURL: "https://burger-queen-ptm.firebaseio.com",
  projectId: "burger-queen-ptm",
  storageBucket: "burger-queen-ptm.appspot.com",
  messagingSenderId: "157641123968",
  appId: "1:157641123968:web:6cb8cf1a409980fc6c9e65",
  measurementId: "G-PMQRG52ZY8"
};

export const firebaseImpl = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
export default firestore;