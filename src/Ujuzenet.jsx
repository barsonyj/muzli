import { useState } from 'react';
import { BiSend } from "react-icons/bi";

export default function Uzenet({kuldUzenet}) {

  let [ uzenet, setUzenet ] = useState("");

  function kuldHaEnter(e) { if (e.keyCode == 13) kuld(); }

  function kuld() {
    kuldUzenet(uzenet);
    setUzenet("");
  }
  
  return (
    <div className='uzenet doboz'>
      <input type="text" className='mezo' value={uzenet} onChange={e => setUzenet(e.target.value)} onKeyDown={e => kuldHaEnter(e)} />
      <BiSend className='kuld' onClick={kuld} />
    </div>
  )
}
