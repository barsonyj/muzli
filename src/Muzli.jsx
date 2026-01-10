import { useState, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "/firebaseConfig.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getFirestore, Timestamp } from 'firebase/firestore';
import Login from './Login';
import Lista from './Lista';
import Ujuzenet from './Ujuzenet';
import Users from './Users';

export default function Muzli() {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [ user, setUser ] = useState();
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

  return (
    <>
    <Login auth={auth} user={user} />
    Muzli
    {user ? <div className='hbox'>
        <Users db={db} user={user} partner={partner} setPartner={setPartner} />
        <div className='vbox'>
        <Lista db={db} user={user} partner={partner} />
        {partner ? <Ujuzenet kuldUzenet={kuldUzenet} /> : ""}
        </div>
    </div> : ""}
    </>
  )
}
