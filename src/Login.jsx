import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function Login({auth, user}) {

  let [ email, setEmail ] = useState("");
  let [ password, setPassword ] = useState("");

  let [ uzenet, setUzenet] = useState("Be kell jelentkezned.");

  const navigate = useNavigate();
  function register() {
    navigate("/register", { replace: true });
  }

  function loginHaEnter(e) { if (e.keyCode == 13) login(); }

  async function login() {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        setUzenet("Nem létező email cím, vagy hibás jelszó!");
        console.log("Login error:", err);
    }
  }

  async function logout() {
    await signOut(auth);
    setEmail(""); setPassword(""); setUzenet("Be kell jelentkezned.")
  }

  return (
    <div className='login doboz'>
      {user ?
        <div className='info'>
          {user.email}
          <input className='gomb' type='button' value='Kilépés' onClick={logout}/>
        </div>
        :
        <div className='space'>
          <div className='urlap'>  
            <input className='mezo email' type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder='email'/>
            <input className='mezo jelszo' type='password' value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => loginHaEnter(e)} placeholder='jelszó' />
            <input className='gomb' type='button' value='Belépés' onClick={login} />
            {uzenet}
          </div>
          <input className='gomb' type='button' value='Regisztráció' onClick={register} />
        </div>
      }
    </div>   
  )
}
