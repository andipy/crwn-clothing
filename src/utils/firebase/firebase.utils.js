// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4siI_MHkQgSFMzXAAL9_OGhXcT90ctxo",
  authDomain: "crwn-clothing-81841.firebaseapp.com",
  projectId: "crwn-clothing-81841",
  storageBucket: "crwn-clothing-81841.appspot.com",
  messagingSenderId: "350305715711",
  appId: "1:350305715711:web:a2bcfa1cf10064229453ca"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log("there was an error creating the user", error.message)
    }
  }

  return userDocRef;
}

export { firebaseApp, auth, db, signInWithGooglePopup, createUserDocumentFromAuth }