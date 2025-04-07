import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/useSlice';
import {useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch=useDispatch();
    const navigate =useNavigate();
    const handleGoogleClick = async() =>{

        try {
            const provider =new GoogleAuthProvider()
            const auth = getAuth(app)
            
            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:result.user.displayName, 
                    email: result.user.email, 
                    photo: result.user.photoURL}),

            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            console.log('Failed to sign in with google',error)
        }


    }
  return (
    <button 
    onClick={handleGoogleClick}
    type='button'
    className='flex items-center justify-center border border-gray-300 rounded-md p-2 w-full hover:bg-gray-100 transition'
>
    <img 
        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" 
        alt="Google Logo"
        className='h-5 w-5 mr-3'
    />
    <span className='text-gray-700 font-medium'>
        Continue with Google
    </span>
</button>
 )
}