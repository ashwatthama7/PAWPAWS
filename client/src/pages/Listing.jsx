import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaMapMarker, FaShare, FaComments } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { fetchUsers, setSelectedUser, fetchMessages } from '../redux/chatSlice';
import { useDispatch } from 'react-redux';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setListing(data);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
   // Import if not already

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.chat); // Add this inside your component if not present
  
  const handleStartChat = async () => {
    try {
      // If users not loaded yet, fetch them
      if (!users || users.length === 0) {
        await dispatch(fetchUsers()).unwrap();
      }
  
      // Find the seller by listing.userRef
      const seller = users.find((u) => u._id === listing.userRef);
  
      if (!seller) {
        alert('Unable to find seller. Please try again.');
        return;
      }
  
      // Set selected user and fetch messages
      dispatch(setSelectedUser(seller));
      dispatch(fetchMessages(seller._id));
  
      // Navigate to chat page
      navigate('/chat');
    } catch (error) {
      console.error('Failed to start chat:', error);
      alert('Failed to start chat. Please try again.');
    }
  };
  return (
    <main className="p-4">
      {loading && <p className="text-center my-7 text-xl md:text-2xl">Loading.....</p>}
      {error && <p className="text-center my-7 text-xl md:text-2xl">Something went wrong!</p>}

      {listing && !loading && !error && (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-md p-4 md:p-6 lg:p-8">
          {/* Image Slider */}
          <Swiper navigation className="mb-5 rounded-lg overflow-hidden shadow-sm">
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-48 sm:h-64 md:h-80 lg:h-[550px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${url})` }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Share Button */}
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex justify-center items-center bg-slate-100 cursor-pointer shadow-md">
            <FaShare
              className="text-slate-500 text-xs sm:text-base lg:text-lg"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 text-xs sm:text-sm text-gray-600 shadow">
              Link copied!
            </p>
          )}

          {/* Listing Details */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex flex-row items-center gap-2">
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-center md:text-left">
                {listing.name},
              </p>
              <p className="text-sm">
                {listing.breed}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-2 text-slate-600 text-sm sm:text-base font-medium justify-center md:justify-start p-3">
            <FaMapMarker className="text-green-700" />
            <p>{listing.address}</p>
          </div>

          {/* Description */}
          <div className="p-3 text-center md:text-left max-w-4xl mx-auto">
            <h1 className="font-bold text-base sm:text-lg text-blue-950 mb-2">Description</h1>
            <p className="text-sm sm:text-base font-medium text-gray-800">{listing.description}</p>
          </div>
          
          {/* Contact Buttons */}
          <div className="flex justify-center mt-6 gap-4">
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <>
                <button 
                  onClick={handleStartChat} 
                  className='bg-sky-600 text-white rounded-lg uppercase p-3 hover:opacity-95 flex items-center gap-2'
                >
                  <FaComments /> Start Chat
                </button>
              </>
            )}
            
          </div>
        </div>
      )}
    </main>
  );
}