import 'firebase/auth';
import firebase from 'firebase/app';
const auth = firebase.auth();

firebase.initializeApp({
    apiKey: "AIzaSyAavR_oNAX7acSEr5-0wV6WBKQpDNaVHrM",
    authDomain: "eventattendance-33368.firebaseapp.com",
    projectId: "eventattendance-33368",
    storageBucket: "eventattendance-33368.appspot.com",
    messagingSenderId: "312252542576",
    appId: "1:312252542576:web:10853be1f37b5b8d21ceb5",
    measurementId: "G-5V5RVE7VS3"
  
  })
  
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const analytics = firebase.analytics();



const  SignOut = () =>{
    return auth.currentUser && (
      <Button className="sign-out" variant="outline-success" onClick={() => auth.signOut()}>Sign Out</Button>
    )
  }