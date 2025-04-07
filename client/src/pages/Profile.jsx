import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytesResumable 
} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, 
  updateUserSuccess,
  updateUserFailure, 
  deleteUserFailure, 
  deleteUserStart, 
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess} from '../redux/user/useSlice';

import { Link } from 'react-router-dom';


export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [ file, setFile]= useState(undefined)
  const [ filePerc, setFilePerc] = useState(0);
  const [ fileUploadError, setFileUploadError] = useState(false);
  const [ formData, setFormData] = useState({});
  const [ updateSuccess, setUpdateSuccess] = useState(false);
  
  const dispatch = useDispatch();
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);


//firebase storage ko lagi 
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

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  //for preventing page from refresh while submitting
  /*for the update user functionality */
  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`
        , {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
          body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
       dispatch(updateUserSuccess(data));
       setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  //\\*delete user functionality //\\
const handleDeleteUser = async () =>{

  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method: 'DELETE',
    });

    const data = await res.json();
    if (data.success === false){
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
    
    
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

const handleSignOut = async() =>{
  try {
    dispatch(signOutUserStart());
    const res = await fetch('/api/auth/signout');
    const data = await res.json();

    if (data.success === false){
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
  }
};


const handleShowListings = async()=>
{
  try {
    setShowListingsError(false);
    const res = await fetch(`/api/user/listings/${currentUser._id}`);
    const data = await res.json();
    if(data.success === false){
      setShowListingsError(true);
      return;
    }
    setUserListings(data);
  } catch (error) {
    setShowListingsError(true);
  }
};


const handleListingDelete = async (listingId) => {
  try {
    const res = await fetch(`/api/listing/delete/${listingId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }

    setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
  } catch (error) {
    console.log(error.message);
  }
};

  //file array ma 0 passs garera first ma select gareko file matra line ho, for some murkh users who selects multiple files.
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-sky-900'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* Profile Picture Upload */}
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center border-2 border-sky-900 hover:border-fuchsia-500 transition-all duration-300'
          alt='profile'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-600'>Error Image Upload (image must be less than 2 MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-sky-900'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-600'>Successfully Uploaded</span>
          ) : (
            ''
          )}
        </p>

        {/* Form Inputs */}
        <input
          type='text'
          placeholder='Username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
          onChange={handleChange}
        />

        {/* Update Button */}
        <button
          disabled={loading}
          className='bg-sky-900 text-white rounded-lg p-3 uppercase hover:bg-sky-800 transition-colors duration-300 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>

        {/* Create Listing Button */}
        <Link
          to='/create-listing'
          className='bg-emerald-700 text-white p-3 rounded-lg uppercase text-center hover:bg-emerald-600 transition-colors duration-300'
        >
          Create a Listing
        </Link>
      </form>

      {/* Delete Account and Sign Out */}
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-600 cursor-pointer hover:text-red-700 transition-colors duration-300'
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className='text-red-600 cursor-pointer hover:text-red-700 transition-colors duration-300'
        >
          Sign Out
        </span>
      </div>

      {/* Error and Success Messages */}
      <p className='text-red-600 mt-5'>{error ? error : ''}</p>
      <p className='text-green-600 mt-5'>{updateSuccess ? 'User updated successfully!' : ''}</p>

      {/* Show Listings Button */}
      <button
        onClick={handleShowListings}
        className='text-sky-900 w-full mt-5 hover:text-sky-800 transition-colors duration-300'
      >
        Show Listings
      </button>
      <p className='text-red-600 mt-5'>{showListingsError ? 'Error showing listings' : ''}</p>

      {/* User Listings */}
      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4 mt-7'>
          <h1 className='text-center text-2xl font-semibold text-sky-900'>Your Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4 hover:shadow-md transition-shadow duration-300'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-cover rounded-lg'
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className='text-sky-900 font-semibold hover:underline truncate flex-1'
              >
                <p>{listing.name}</p>
              </Link>
              <div className='flex flex-col items-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-600 hover:text-red-700 transition-colors duration-300'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-600 hover:text-green-700 transition-colors duration-300'>
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}