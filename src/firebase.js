import { initializeApp } from 'firebase/app';
import { getStorage, ref as storageRef, listAll, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// add your firebase keys

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

// Function to fetch results filtered by type
export const fetchResultsByType = async (type) => {
  const resultsRef = ref(database, 'results');
  const resultsQuery = query(resultsRef, orderByChild('type'), equalTo(type));

  // Fetch the data
  const snapshot = await get(resultsQuery);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

export {
  app,
  ref,
  storage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  db,
  collection,
  addDoc,
  database
};
