import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGyDUotsEYWUP74c-A74y7pfH7KytJNUU",
  authDomain: "gleaming-tube-344514.firebaseapp.com",
  projectId: "gleaming-tube-344514",
  storageBucket: "gleaming-tube-344514.appspot.com",
  messagingSenderId: "225680320623",
  appId: "1:225680320623:web:fcd1703713f518ea3ac59a",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "books");

/// queries
// const q = query(colRef, where("author", "==", "Jamer Clear"));

// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];

//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });

//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

onSnapshot(colRef, (snapshot) => {
  let books = [];

  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });

  console.log(books);
});

// onSnapshot(q, (snapshot) => {
//   let books = [];

//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id });
//   });

//   console.log(books);
// });

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
