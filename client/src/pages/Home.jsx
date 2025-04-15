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
  const [dogs, setDogs] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listing/get?limit=20');
        const data = await res.json();
        setListings(data);

        const dogListings = data.filter((listing) => listing.breed?.toLowerCase() !== 'news');
        const newsListings = data.filter((listing) => listing.breed?.toLowerCase() === 'news');

        setDogs(dogListings);
        setNews(newsListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4 sm:p-6 md:p-10"
      style={{ backgroundImage: "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAzL2pvYjE1NzEtcmVtaXgtMTAtZC5qcGc.jpg')" }} // <-- your background image here
    >
      {/* Hero Section */}
      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-2xl p-6 sm:p-10 mb-10 text-center animate-fade-in">
        <h1 className="text-emerald-900 font-extrabold text-3xl md:text-5xl lg:text-7xl mb-4">Rehabilitate & Rehome</h1>
        <h2 className="text-emerald-800 text-xl md:text-3xl lg:text-4xl mb-4">Together We Can Make a Difference</h2>
        <p className="text-emerald-700 text-sm md:text-lg mb-6 ">Help us rescue stray dogs and provide them safe homes.</p>
        <Link
          to={'/search'}
          className="inline-block bg-teal-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg text-lg font-semibold hover:bg-teal-600 transition-all border border-white/40"
        >
          Let's get started...
        </Link>
      </div>

      {/* Swiper Section */}
      {dogs.length > 0 && (
        <div className="mb-10 backdrop-blur-md bg-white/10 border border-white/30 rounded-xl shadow-xl overflow-hidden">
          <Swiper
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="rounded-lg"
          >
            {dogs.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center/cover no-repeat`,
                  }}
                  className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]"
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Available Dogs Section */}
      {dogs.length > 0 && (
        <div className="max-w-6xl mx-auto my-10">
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-2xl font-semibold text-emerald-900 drop-shadow-md">Available Dogs</h2>
            <Link to={'/search'} className="text-emerald-900 text-base hover:underline">
              Show more dogs
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {dogs.map((listing) => (
              <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl shadow-md p-2">
                <ListingItem listing={listing} key={listing._id} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News Section */}
      {news.length > 0 && (
        <div className="max-w-6xl mx-auto my-10">
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-2xl font-semibold text-indigo-950 drop-shadow-md">News & Updates</h2>
            <Link to={'/search?breed=news'} className="text-indigo-950 text-base hover:underline">
              View all news
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {news.map((listing) => (
              <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl shadow-md p-2">
                <ListingItem listing={listing} key={listing._id} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
