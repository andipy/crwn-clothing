// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
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

const createUserDocumentFromAuth = async(userAuth, additionalInfo) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })
    } catch (error) {
      console.log("there was an error creating the user", error.message)
    }
  }

  return userDocRef;
}

const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

const signOutUser = async () => {
  await signOut(auth);
}

const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export { firebaseApp, auth, db, signInWithGooglePopup, createUserDocumentFromAuth, createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword, signOutUser, onAuthStateChangedListener }