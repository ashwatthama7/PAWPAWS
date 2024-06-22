import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const[formData, setFormData] =useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
          setLoading(true);
         
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

          if(data.success ===false)
            {
              setLoading(false);
              setError(data.message);
              return;
            }
          setLoading(false);
          setError(null);
          navigate('/');
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
        
      };

     return (
      <div className='p-3 max-w-lg mx-auto'>
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
              className='bg-slate-700 text-white p-3 
              rounded-lg uppercase hover:opacity-90'>
              {loading ? 'Loading....':'Sign In'}
              </button>

        </form>
        
        <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
            <Link to ={"/sign-up"}> 
              <span className='text-violet-300'> Sign up</span>
            </Link>
       </div>
       {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  )
}
