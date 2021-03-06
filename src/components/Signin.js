import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';
import firebase from 'firebase/app';
import firebaseApp from './../firebase';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Signin extends Component {
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <>
        { user ?
        <Nav.Link><Link onClick={signOut} to="/home" style={{color: '#ffffff', textDecoration: 'none'}}>Sign out</Link></Nav.Link> :
        <Nav.Link onClick={signInWithGoogle}>Sign in with Google</Nav.Link>}
      </>
    )
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Signin);