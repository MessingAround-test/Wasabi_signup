import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Button from 'react-bootstrap/Button';
 

import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import QRCodeShower from './Components/QRCodeShower';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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
const QRCode = require('qrcode');


// TODO,
// Remove the option to pick the email, they must use the one signed in with!
// Add the rest of the fields and get them into the cloud
// Make it not accept duplicate 
// Get the sending of the email to work
// Inject the QR code into the email, look at docs but i think you can export as a image. Or maybe just use the canvas inb the html bit
//  Unique emails works now!

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        {user ? <NavBar /> : <ReturnNothing/>}
        
      </header>

      <section>
        {user ? <SignUpSheet /> : <SignIn />}
      </section>
      <canvas id="canvas"></canvas>
    </div>
  );
}



function NavBar(){
  return (
    
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Wasabi event login</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <Nav.Link href="#Membership">Become a member</Nav.Link>
      <Nav.Link href="#events">Upcoming Events</Nav.Link>
      <Nav.Link href="/QRCode">QR code</Nav.Link>
    </Nav>
    <Form inline>
      
      
      <SignOut />
    </Form>
  </Navbar.Collapse>
</Navbar>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <Button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</Button>
      
    </>
  )

}


function SignOut() {
  return auth.currentUser && (
    <Button className="sign-out" variant="outline-success" onClick={() => auth.signOut()}>Sign Out</Button>
  )
}

function ReturnNothing(){
  return (null);
}


function SignUpSheet(){

  const SignedUpUsersRef = firestore.collection('RegisteredUsers');
  var state= {}
  const sendForm = async (e) => {
    e.preventDefault();
    var res = await requestDataAboutEmail();
     
    
    if (res){
      alert("You have already registered with this email")
    }else{
      const { uid } = auth.currentUser;

      await SignedUpUsersRef.add({
        name: state.name,
        email: auth.currentUser.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid
      })

      alert("success")
      
      // setFormValue('');
      // dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  }



 

  const handleChangeEmail = (event) => {
    event.preventDefault()
    state.email = event.target.value
  }

  const handleChangeName = (event) => {
    event.preventDefault()
    state.name = event.target.value
  }

  const generateQRCode = async (e) => {
    var canvas = document.getElementById('canvas')
    var uid = auth.currentUser.uid

    // Need to get a actual URL assosiated with it
    var url = "www.wasabi.com.au/signin"
    QRCode.toCanvas(canvas, url+ "/" +uid, function (error) {
      if (error) console.error(error)
      console.log('success!');
    })
    ;

    // This does work. 
    
    // console.log(res)

  }

  const requestDataAboutEmail = async (event) => {
    // Based on the user which is logged in, we make a request to the database
    const snapshot = await SignedUpUsersRef.where('email', '==', auth.currentUser.email).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());});
    return snapshot
  }

  


  return (
    
    <Form onSubmit={sendForm}>
    <Form.Group controlId="BasicInputForm">
      <Form.Label>University Degree</Form.Label>
      <Form.Control type="text" placeholder='Degree Name' />
      {/* <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text> */}
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder={auth.currentUser.displayName} onChange={handleChangeName}/> 
    
     
    </Form.Group>
    <Router>
    <Route path="/QRCode">
      <QRCodeShower />
    </Route>
    </Router>
    
    <Button variant="primary" type="submit">
      Submit
    </Button>

    <Button onClick={generateQRCode}> test QR code</Button>
  </Form>
  
);
}

export default App;
