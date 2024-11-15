import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaMapMarker, FaShare } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';
export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const {currentUser} = useSelector((state)=>state.user);
  const [contact,setContact]= useState(false)
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

  return (
    <main className="p-4">
      {loading && <p className="text-center my-7 text-xl md:text-2xl">Loading...</p>}
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
                        {listing.name}
                    </p>
                     <p className="text-sm font-medium text-gray-600 text-center md:text-left">
                         ({listing.year} years {listing.month} months)
                     </p>
                </div>
            </div>

          {/* Address */}
          <div className="flex items-center gap-2 text-slate-600 text-sm sm:text-base font-medium justify-center md:justify-start p-3">
            <FaMapMarker className="text-green-700" />
            <p>{listing.address}</p>
          </div>

          {/* Status Tags */}
          <div className="flex flex-row gap-4 justify-center md:justify-start mb-6">
            <p className="bg-red-600 w-36 text-white text-center p-2 rounded-md text-xs sm:text-sm shadow-md">
              {listing.stray === 'true' ? 'Stray' : 'Not Stray'}
            </p>
            <p className="bg-green-600 w-36 text-white text-center p-2 rounded-md text-xs sm:text-sm shadow-md">
              {listing.vaccined === 'true' ? 'Vaccinated' : 'Not Vaccinated'}
            </p>
          </div>

          {/* Description */}
          <div className="p-3 text-center md:text-left max-w-4xl mx-auto">
            <h1 className="font-bold text-base sm:text-lg text-blue-950 mb-2">Description</h1>
            <p className="text-sm sm:text-base font-medium text-gray-800">{listing.description}</p>
          </div>
          <div>
            {currentUser && listing.userRef !== currentUser._id && !contact &&(
            <button onClick={()=> setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95'>
              Contact Uploader
            </button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  );
}
