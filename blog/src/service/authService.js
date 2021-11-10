import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export function SignIn() {
  function signInWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider());
  }
  return (
    <div className="signin">
      <Nav.Link onClick={signInWithGoogle}>Sign In</Nav.Link>
    </div>
  );
}

export function SignOut() {
  return (
    auth.currentUser && (
      <p className="mb1">
        {auth.currentUser.displayName}&nbsp;
        <Nav.Link
          onClick={() => {
            signOut(auth);
          }}
          href="/"
        >
          Sign Out
        </Nav.Link>
      </p>
    )
  );
}

export function useAuthentication() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });
  }, []);
  return user;
}
