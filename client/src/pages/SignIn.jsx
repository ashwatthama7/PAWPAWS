import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure} from '../redux/user/useSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const[formData, setFormData] =useState({});
  const{loading, error} =useSelector((state)=> state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange =(e) =>{
    setFormData(
      {
          ...formData,
          [e.target.id]: e.target.value,

      });
    };

    const handleSubmit = async (e) =>
      {
        //to prevent the refreshing of the page
        e.preventDefault();
        
        try {
          dispatch(signInStart());
         
        //for requesting data from the port 
        const res = await fetch('/api/auth/signin', 
          {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),

          });
          const data = await res.json();

          if(data.success === false)
            {
              dispatch(signInFailure(data.message));
              return;
            }
          dispatch(signInSuccess(data));
          navigate('/');

        } catch (error) {
          dispatch(signInFailure(error.message));
        }
        
      };

     return (
      <div className='p-6 max-w-md mx-auto my-10 bg-blue-300 shadow-blue-200 shadow-lg rounded-lg'>
      <h1 className='text-3l text-center font-semibold my-7'>SignIn</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
            
              <input 
                type="text" 
                placeholder='email'
                className='border p-3 rounded-lg' 
                id='email' 
                onChange={handleChange}
              />
              <input 
                type="password" 
                placeholder='password'
                className='border p-3 rounded-lg' 
                id='password' 
                onChange={handleChange}
              />    

              <button 
              disabled={loading} 
              className='bg-emerald-700 text-white p-3 
              rounded-lg uppercase hover:opacity-85'>
              {loading ? 'Loading....':'Sign In'}
              </button>
        <OAuth/>
        </form>
        
        <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
            <Link to ={"/sign-up"}> 
              <span className='text-pink-800 hover:underline'> Sign up</span>
            </Link>
       </div>
       {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
    )
}
