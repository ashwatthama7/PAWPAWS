import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function Contact({listing}) {
    const [uploader, setUploader] = useState(null);
    const [message, setMessage] =useState('');
    
    
    const onChange =(e)=>{
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchUploader = async () => {
          try {
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            setUploader(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchUploader();
      }, [listing.userRef]);
    return (
    <>
    {uploader &&(
        <div>
            <p> Contact <span className='font-semibold'>{uploader.username}</span> 
                for <span className='font-semibold'>
                {listing.name.toLowerCase()}</span></p>
                <textarea name='message' id ='message'cols='20'
                rows='2' value={message} 
                placeholder='Enter your message'
                onChange={onChange}></textarea>

<Link
          to={`mailto:${uploader.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>

    )}
    </>
  )
}
