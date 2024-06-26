import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
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
        const res = await fetch('/api/auth/signup', 
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
          navigate('/sign-in');
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
        
      };

     return (
      <div className='p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg'>
      <h1 className='text-3l text-center font-semibold my-7'>SignUp</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
              <input 
                type="text"
                placeholder='username'
                className='border p-3 rounded-lg' 
                id='username'
                onChange={handleChange}
              />

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
              {loading ? 'Loading....':'SignUp'}
              </button>

        </form>
        
        <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
            <Link to ={"/sign-in"}> 
              <span className='text-violet-100'> Sign in</span>
            </Link>
       </div>
       {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  )
}
