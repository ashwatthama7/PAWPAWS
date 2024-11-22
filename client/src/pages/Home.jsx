import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

SwiperCore.use([Navigation]);

export default function Home() {
  const [strayListings, setStrayListings] = useState([]);
  const [vaccinedListings, setVaccinedListings] = useState([]);

  useEffect(() => {
    const fetchStrayListings = async () => {
      try {
        const res = await fetch('/api/listing/get?stray=true&limit=4');
        const data = await res.json();
        setStrayListings(data);
      } catch (error) {
        console.error('Error fetching stray listings:', error);
      }
    };

    const fetchVaccinedListings = async () => {
      try {
        const res = await fetch('/api/listing/get?vaccined=true&limit=4');
        const data = await res.json();
        setVaccinedListings(data);
      } catch (error) {
        console.error('Error fetching vaccinated listings:', error);
      }
    };

    fetchStrayListings();
    fetchVaccinedListings();
  }, []);

  return (
    <div>
      {/* Top Section */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Rescue Rehabilitate Rehome
          <br />
        </h1>
        <h2 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Together We Can Make a Difference
          <br />
        </h2>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Help us rescue stray dogs and ensure every vaccinated dog gets a safe home.
          <br />
          Your contribution can make a significant impact!
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* Swiper Section for Stray Listings */}
      <Swiper navigation>
        {strayListings &&
          strayListings.length > 0 &&
          strayListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'contain',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Listing Results for Stray and Vaccinated Dogs */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {strayListings && strayListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Stray Dogs</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?stray=true'}>
                Show more stray dogs
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {strayListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {vaccinedListings && vaccinedListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Vaccinated Dogs</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?vaccined=true'}>
                Show more vaccinated dogs
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {vaccinedListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
