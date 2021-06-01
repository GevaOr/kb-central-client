import firebase from "firebase";
import "firebase/auth"
import "firebase/database";
import "@firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();
// const storage = firebase.storage();

export {
    firebase,
    db,
    auth,
    // storage 
};


// STORAGE EX
// const files = [ 'image1.png', 'image2.png' ]; 
// files.map( filename => {
//     storage
//       .ref( `/covers/${filename}` )
//       .getDownloadURL()
//       .then( url => {
//         console.log( "Got download url: ", url );
//       });
// });