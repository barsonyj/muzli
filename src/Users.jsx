import { useState, useEffect } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export default function Users({db, user, partner, setPartner}) {

  let [ users, setUsers ] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "users"), orderBy("nev")), (snap) => {
      setUsers(snap.docs.map(doc => ({ ...doc.data(), id:doc.id })));
    });
    return unsub;
  },[user]);

  /*console.log("<Users> / partner:", partner);

  if (user && users.length > 1 && partner == "") {
    if (user.email != users[0].email) setPartner(users[0].email);
    else setPartner(users[1].email);
  }*/

  return (
    <div className='users doboz'>
      {users.map(x => {
        if (x.email != user.email) return <div
          key={x.id}
          className={partner == x.email ? "selected" : "item"}
          onClick={() => setPartner(x.email)}
        >{x.nev} ({x.email})</div>
      })}
    </div>
  )
}
