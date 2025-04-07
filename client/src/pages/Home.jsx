import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

SwiperCore.use([Navigation, Autoplay]);

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listing/get?limit=8');
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-4 sm:p-6 md:p-10">
      {/* Hero Section */}
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-slate-800 font-extrabold text-3xl md:text-5xl lg:text-7xl mb-4">Rehabilitate & Rehome</h1>
        <h2 className="text-slate-600 text-xl md:text-3xl lg:text-4xl mb-4">Together We Can Make a Difference</h2>
        <p className="text-gray-600 text-sm md:text-lg mb-6">Help us rescue stray dogs and provide them safe homes.</p>
        <Link
          to={'/search'}
          className="inline-block bg-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Let's get started...
        </Link>
      </div>

      {/* Swiper Section */}
      <div className="mb-10">
        <Swiper
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          {listings.length > 0 &&
            listings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center/cover no-repeat`,
                  }}
                  className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-lg"
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Listing Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 my-10 gap-4">
       {listings && listings.length > 0 && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-slate-700">Available Dogs</h2>
              <Link
                to={'/search'}
                className="text-blue-800 text-sm md:text-base font-medium hover:underline"
              >
                Show more dogs
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-4 gap-2">
              {listings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}