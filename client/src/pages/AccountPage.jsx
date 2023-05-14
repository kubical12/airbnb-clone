import React, { useContext, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext'
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';
const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  console.log(subpage);
  if (subpage == undefined) {
    subpage = "profile";
  }
  async function Logout() {
    await axios.post('/logout');
    setUser(null);
    setRedirect('/');
  }

  if (!ready) {
    return "Loading....";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <AccountNav/>
     
      {/* account page for {user?.name} */}
      {subpage == 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={Logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  )
}

export default AccountPage
