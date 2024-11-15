import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    year: 0,
    month: 1,
    Price: 0,
    stray: false,
    vaccined: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold text-center my-5 text-gray-800'>
        List a Dog
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='grid sm:grid-cols-2 gap-6'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600'
            id='name'
            maxLength='60'
            minLength='5'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder='Description'
            className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='stray'
              onChange={handleChange}
              checked={formData.stray}
              className='w-5'
            />
            <label htmlFor='stray'>Stray</label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='vaccined'
              onChange={handleChange}
              checked={formData.vaccined}
              className='w-5'
            />
            <label htmlFor='vaccined'>Vaccined</label>
          </div>
          <div className='flex items-center gap-2'>
            <h4 className='text-lg font-semibold'>Age</h4>
            <input
              type='number'
              id='year'
              min='0'
              max='20'
              required
              className='p-3 border border-gray-300 rounded-lg w-20'
              onChange={handleChange}
              value={formData.year}
            />
            <p>Years</p>
            <input
              type='number'
              id='month'
              min='0'
              max='11'
              required
              className='p-3 border border-gray-300 rounded-lg w-20'
              onChange={handleChange}
              value={formData.month}
            />
            <p>Months</p>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='Price'
              min='0'
              max='10000000'
              required
              className='p-3 border border-gray-300 rounded-lg w-full'
              onChange={handleChange}
              value={formData.Price}
            />
            <p className='text-sm font-semibold'>Price (Rs.)</p>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded-lg hover:bg-green-100 disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center bg-gray-50 rounded-lg'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-cover rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg hover:bg-red-100'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}
