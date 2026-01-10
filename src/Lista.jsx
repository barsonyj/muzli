import { useState, useEffect } from 'react';
import { and, collection, onSnapshot, or, orderBy, query, where } from 'firebase/firestore';

export default function Lista({db, user, partner}) {

  let [ uzenetek, setUzenetek ] = useState([]);

  useEffect(() => {
    if (user?.email && partner != "") {
      const unsub = onSnapshot(
        query(
          collection(db, "uzenetek"),
          or (
            and(where("kinek", "==", user.email), where("kitol", "==", partner)),
            and(where("kinek", "==", partner), where("kitol", "==", user.email))
          )
          , orderBy("mikor")
        ), (snap) => {
          setUzenetek(snap.docs.map(doc => ({ ...doc.data(), id:doc.id })));
        }
      );
      return unsub;
    }
  },[user, partner]);

  function magyarIdo(timestamp) {
    let date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    let datum = date.toLocaleDateString().replaceAll(". ", ".");
    let ido = date.toLocaleTimeString();
    return datum + " " + ido;
  }

  return (
    <div className='lista doboz'>
      {partner ?
         uzenetek.map(x => <div key={x.id} className={x.kitol == user.email ? "tolem" : "nekem"}>
         <div className='ido'>{magyarIdo(x.mikor)}</div>
           {x.uzenet}
         </div>)
      : "< Válassz egy partnert!"
      }
    </div>
  )
}
