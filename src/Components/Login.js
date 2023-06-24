import React, { useState,useContext } from 'react';
import authContext from './AuthContext'
import {useNavigate} from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [formDetails,setformDetails] = useState({username:'', password:''});
    const [error,setError] = useState("");
    const [userDetails,setUserDetails] = useContext(authContext);

    async function handleSubmit(e){
        e.preventDefault();

        if(formDetails.username === '' || formDetails.password === ''){
            setError('All fields are mandatory');
            return ;
        }
        
        try{
            let res = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username:`${formDetails.username}`,
                    password:`${formDetails.password}`,
                })
            });
            let data = await res.json();
            if(data.message === "Invalid credentials"){
                setError(data.message);
                return ;
            }
            setError('');
            setUserDetails(data);
            setformDetails({username:'',password:''})
            navigate('/profile');
        }
        catch(err){
            console.log("There was some Error : ", err);
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <h1>Login Form</h1>
            
                <input type='text' id='username' placeholder='User Name' onChange={(e)=>{setformDetails({...formDetails,username:e.target.value})}} value={formDetails.username} />
            
                <input type='password' id='password' placeholder='Password' onChange={(e)=>{setformDetails({...formDetails,password:e.target.value})}} value={formDetails.password} />
                
            {error && <p className='error'>{error}</p>}
            <button type='submit'>Login</button>
        </form>
    );
};

export default Login;