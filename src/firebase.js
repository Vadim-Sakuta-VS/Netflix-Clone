import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyARE8vzyDT3W4PYgfrki6hrZX_X7uP1sHI",
  authDomain: "streaming-service-f60ff.firebaseapp.com",
  projectId: "streaming-service-f60ff",
  storageBucket: "streaming-service-f60ff.appspot.com",
  messagingSenderId: "299790182598",
  appId: "1:299790182598:web:d3ff140f34a2d4fbd9cfc7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {auth};
export default db;
