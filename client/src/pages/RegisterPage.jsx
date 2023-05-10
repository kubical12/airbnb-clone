import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
const RegisterPage = () => {
  const [name , setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function resgisterUser(e){
    e.preventDefault();
    try{
      await axios.post('/register' , {
        name,
        email,
        password
      });
      alert("register succesfull now you can login");
    } catch(e){
      alert("registration failed ");
    }
  }
  
  return (
    <div>
       <div className='m-4 grow flex  items-center justify-around'>
      <div className="mb-64">
      <h1 className='text-4xl text-center mb-4' >Register</h1>
      <form action="" className='max-w-md mx-auto' onSubmit={resgisterUser}>
        <input type="text" placeholder='your name' value={name} onChange={e =>setName(e.target.value)} />
        <input type="email" placeholder='your email' value={email}  onChange={e =>setEmail(e.target.value)}/>
        <input type="password" placeholder='your passsword' value={password} onChange={e => setPassword(e.target.value )}/>
        <button className='primary'>Login</button>
        <div className="text-center py-2">
          Already have an account ? 
          <Link className='text-black underline ' to={"/login"}>Login now   </Link>
        </div>
      </form>
      </div>
    </div>
    </div>
  )
}

export default RegisterPage
