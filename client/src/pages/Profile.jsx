import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';


export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [ file, setFile]= useState(undefined)
  const [ filePerc, setFilePerc] = useState(0);
  const [ fileUploadError, setFileUploadError] = useState(false);
  const [ formData, setFormData] = useState({});
  
 
useEffect(()=> {
if(file){
  handleFileUpload(file);
}
}, [file]);


const handleFileUpload = (file) => {
const storage = getStorage(app);
const fileName = new Date().getTime() + file.name;
const storageRef = ref(storage, fileName);
const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on(
  'state_changed',
   (snapshot) => {
    const progress =
     (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    setFilePerc(Math.round(progress));
    },
    (error) =>{
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) =>
        setFormData({...formData, avatar : downloadURL})
      );
    }
  );
  };




  //file array ma 0 passs garera first ma select gareko file matra line ho, for some murkh users who selects multiple files.
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'></input>
        
        <img onClick={()=> fileRef.current.click()} src={formData.avatar || currentUser.avatar} 
        className='rounded-full h-24 w-24 
        object-cover cursor-pointer 
        self-center'></img>
        
        <p className='text-sm self-center'>
          {fileUploadError ? (
          <span className='text-red-700'>Error Image 
          Upload(image must me less than 2 MB)</span>
          ): filePerc > 0 && filePerc < 100 ? (
          <span className='text-emerald-950'>{`Uploading 
            ${filePerc}%`} </span>
          ):
          filePerc === 100 ? (
            <span className='text-green-600'>Sucessfully Uploaded</span>
          ) : (
            ''
          )}
        </p>

      <input type='text' 
        placeholder='username'
        className='border p-3 rounded-lg'
        id='username'></input>
      
      <input type='email' 
        placeholder='email'
        className='border p-3 rounded-lg'
        id='email'></input>
      
      <input type='text' 
        placeholder='password'
        className='border p-3 rounded-lg'
        id='password'></input>
      
      <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80 '>Update</button>
      
      
      </form>
      
      <div className='flex justify-between mt-5'>

        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>

      </div>


    </div>
  )
}
