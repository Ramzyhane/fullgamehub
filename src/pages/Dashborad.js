import React from 'react'
import {auth} from '../services/firebaseConfig'
import {useNavigate} from 'react-router-dom'

const Dashborad = () => {
    const navigate = useNavigate();
    const logoutAchtion = async() =>{
        auth.signOut()
        navigate("/")

    }
  return (
    <div>Dashborad <br/>
     <button onClick={logoutAchtion} className='btn btn-outline-danger'>Logout</button>
    </div>
  )
}

export default Dashborad