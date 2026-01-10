import './App.css'
import { useState, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "/firebaseConfig.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getFirestore, Timestamp } from 'firebase/firestore';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Muzli from './Muzli';
import Register from './Register';
import Nevjegy from './Nevjegy';
import Notfound from './Notfound';
import Users from './Users';
import Login from './Login';

export default function App() {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  let [ user, setUser ] = useState();
  let [ partner, setPartner ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setPartner("");
    });
    return unsub;
  },[]);

  async function kuldUzenet(uzenet) {
    let ido = Timestamp.now(); // vagy még .toDate(); <- ez string
    let ujUzenet = { kitol:user.email, kinek:partner, mikor:ido, uzenet:uzenet };
    await addDoc(collection(db, "uzenetek"), ujUzenet);
  }

  const router = createBrowserRouter([
    { path: "/", element: <Muzli /> },
    { path: "/register", element: <Register /> },
    { path: "/nevjegy", element: <Nevjegy /> },
    { path: "*", element: <Notfound /> }
  ]);

  return (
    <div className='app'>
      <RouterProvider router={router}>
        App
      </RouterProvider>
      Axxasfsad
    </div>
  )

}
  
