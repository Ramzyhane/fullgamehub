import React,{useState} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import {auth,database} from '../services/firebaseConfig'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {collection, addDoc} from 'firebase/firestore'


const Authentication = () => {

    const navigate = useNavigate();
    const [firstName,setFirstName] = useState("");
    const [lastNmae,setlastName] = useState("");
    const [mobile,setMobile] = useState("");
    const [addris,setAddris] = useState("");
    const [city,setCity] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isLoginView,setIsLoginView] = useState(true);
    const [isLoading, setIsLoding] = useState(false)



    const loginAction = async() =>{
        setIsLoding(true)
        if(email !== "" && password !== ""){
            try {
                await signInWithEmailAndPassword(auth,email,password)
                .then(async(user) =>{
                    setIsLoding(false)
                    console.log(user);
                    navigate('/dashboard')
                })
                
            } catch (error) {
                setIsLoding(false)
                toast.error(error.message)
            }

        }else{
            toast.error("All inputs required")
        }
    }
    
    const sigupAction = async() =>{
        setIsLoding(true)
        if(email !== "" && password !== "" && firstName !== "" && lastNmae !== ""){
            try {
                await createUserWithEmailAndPassword(auth,email,password)
                .then(async(user) =>{

                  await addDoc(collection(database,"accounts"),{
                    firstName:firstName,
                    lastNmae:lastNmae,
                    email:email,
                    accountUid: user.user.uid,
                    addris: addris,
                    mobile: mobile,
                    city: city,
                    avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
                    isUserLock: false
                  })
                  .then(account_creted=>{
                    console.log(account_creted);
                    setIsLoding(false)
                    navigate('/dashboard')

                  })
                })
                
            } catch (error) {
                toast.error(error.message)
                setIsLoding(false)
            }

        }else{
            toast.error("All inputs required")
            setIsLoding(false)
        }
    }
    
    
  return (
    <div style={{marginTop:50}}>
        <ToastContainer/>

        {
            isLoginView ? (<>
                <h1 className='title'>Login</h1>
                
                <label className="form-label">Email address</label>
                <input 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder='Please Enter your email' 
                    type="email" 
                    className="form-control"/>

                <label className="form-label">Passwored</label>
                <input
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder='Please Enter your passowrd' 
                    type="password" 
                    className="form-control"/>

                    {
                        isLoading ? (<>
                         <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                         </div>
                        
                        </>) : (<button onClick={loginAction} className='btn btn-dark'>Login</button>)
                    }

                
            
            </>) : (<>
            <h1 className='title'>Creat new Account</h1>

            <label className="form-label">First name<span style={{color:'#880000'}}>*</span></label>
            <input 
                value={firstName}
                onChange={(e)=>{setFirstName(e.target.value)}}
                type="email" 
                className="form-control"/>

            <label className="form-label">Last name<span style={{color:'#880000'}}>*</span></label>
            <input 
                value={lastNmae}
                onChange={(e)=>{setlastName(e.target.value)}}
                type="email" 
                className="form-control"/>

            <label className="form-label"> mobile</label>
            <input 
                value={mobile}
                onChange={(e)=>{setMobile(e.target.value)}}
                type="email" 
                className="form-control"/>

            <label className="form-label">Addris</label>
            <input 
                value={addris}
                onChange={(e)=>{setAddris(e.target.value)}}
                type="email" 
                className="form-control"/>

            <label className="form-label">City</label>
            <input 
                value={city}
                onChange={(e)=>{setCity(e.target.value)}}
                type="email" 
                className="form-control"/>
            
            <label className="form-label">Email address<span style={{color:'#880000'}}>*</span></label>
            <input 
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder='Please Enter your email' 
                type="email" 
                className="form-control"/>

            <label className="form-label">Passwored<span style={{color:'#880000'}}>*</span></label>
            <input
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder='Please Enter your passowrd' 
                type="password" 
                className="form-control"/>


                   {
                        isLoading ? (<>
                         <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                         </div>
                        
                        </>) : (<button onClick={sigupAction} className='btn btn-dark'>Sign Up</button>)
                    }

            
            </>)
        }
        <button onClick={()=>{setIsLoginView(!isLoginView)}} className='btn btn-outline-dark'>
            {
                isLoginView ? "Go to signup" : "Go to Login"
            }
        </button>
        
    </div>
  )
}

export default Authentication