import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from '../redux/user/useSlice';

import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
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
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => setFileUploadError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
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

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center'
      style={{
        backgroundImage: `url('https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png')`,
      }}
    >
      <div className='w-full max-w-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl text-white'>
        <h1 className='text-3xl font-bold text-center mb-6'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center border-4 border-white/30 hover:border-teal-400 transition-all duration-300 shadow-lg'
            alt='profile'
          />
          <p className='text-center text-sm'>
            {fileUploadError ? (
              <span className='text-red-400'>
                Error uploading image (must be less than 2MB)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-300'>Successfully Uploaded!</span>
            ) : (
              ''
            )}
          </p>
          <input
            type='text'
            placeholder='Username'
            defaultValue={currentUser.username}
            id='username'
            className='bg-white/20 placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            id='email'
            defaultValue={currentUser.email}
            className='bg-white/20 placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            id='password'
            className='bg-white/20 placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400'
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className='bg-teal-600 text-white p-3 rounded-lg uppercase hover:bg-teal-700 transition-all duration-300 disabled:opacity-50'
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
          <Link
            to='/create-listing'
            className='bg-emerald-600 text-white p-3 rounded-lg uppercase text-center hover:bg-emerald-700 transition-all duration-300'
          >
            Create a Listing
          </Link>
        </form>

        <div className='flex justify-between mt-5 text-sm'>
          <span
            onClick={handleDeleteUser}
            className='text-red-400 cursor-pointer hover:text-red-500'
          >
            Delete Account
          </span>
          <span
            onClick={handleSignOut}
            className='text-red-400 cursor-pointer hover:text-red-500'
          >
            Sign Out
          </span>
        </div>

        {error && <p className='text-red-400 mt-4 text-center'>{error}</p>}
        {updateSuccess && (
          <p className='text-green-300 mt-4 text-center'>
            User updated successfully!
          </p>
        )}

        <button
          onClick={handleShowListings}
          className='mt-6 w-full text-center text-white hover:text-teal-300'
        >
          Show Listings
        </button>
        {showListingsError && (
          <p className='text-red-400 text-center'>Error showing listings</p>
        )}

        {userListings.length > 0 && (
          <div className='flex flex-col gap-4 mt-6'>
            <h2 className='text-2xl text-center font-semibold'>
              Your Listings
            </h2>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className='flex items-center justify-between gap-4 p-3 rounded-lg bg-white/10 border border-white/20 shadow-md hover:shadow-lg transition'
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt='listing'
                    className='h-16 w-16 object-cover rounded-lg'
                  />
                </Link>
                <Link
                  to={`/listing/${listing._id}`}
                  className='text-white font-medium hover:underline truncate flex-1'
                >
                  {listing.name}
                </Link>
                <div className='flex flex-col items-center gap-1 text-sm'>
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className='text-red-400 hover:text-red-500'
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className='text-green-400 hover:text-green-500'>
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
