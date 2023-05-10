import React, { useState , useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios";
import { UserContext } from '../UserContext';
const LoginPage = () => {
  const[email, setEmail] = useState("");
  const[password , setPassword] = useState("");
  const[redirect , setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  async function handleLoginSubmit(e){
    e.preventDefault();
    try{
    const {data} = await  axios.post('/login' , {email, password});
    setUser(data);
      alert("login successfull");
      setRedirect( true);
    } catch(e){
      alert("login failed")
    }
  }
  if(redirect){
    return <Navigate to={"/"} />
  }
  return (
    <div className='m-4 grow flex  items-center justify-around'>
      <div className="-mt-32">
      <h1 className='text-4xl text-center mb-4'>login</h1>
      <form action="" className='max-w-md mx-auto ' onSubmit={handleLoginSubmit}>
        <input type="email" placeholder='your email' value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" placeholder='your passsword' value={password} onChange={e =>setPassword(e.target.value)}/>
        <button className='primary'>Login</button>
        <div className="text-center py-2">
          don't have account yet? 
          <Link  to={'/register'} className='text-black underline'>Register now </Link>
        </div>
      </form>
      </div>
    </div>
  )
}

export default LoginPage
