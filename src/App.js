import React,{useEffect,useState} from 'react'
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import {auth} from './services/firebaseConfig'
import {onAuthStateChanged} from 'firebase/auth'
import Login from './pages/Login'
import Dashborad from './pages/Dashborad'


const App = () => {


    const [user,setUser] = useState(null);

    useEffect(() =>{
      onAuthStateChanged(auth, (user)=>{
        if(user){
          setUser(user)
        }else{
          setUser(null)
        }
      })
    },[])

  return ( 
      <Router>
      {
           user ? 
            (<>
             <Routes>
              <Route path='/dashboard' element={<Dashborad/>}/>
             </Routes>
             </>
            ) 
            :
            ( <>
             <Routes>
               <Route path='/' element={<Login/>}/>
             </Routes>
             </>
          )      
      }
      </Router>
  )
}

export default App