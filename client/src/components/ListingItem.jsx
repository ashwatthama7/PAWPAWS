import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
    return (
      <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`}>
          <img
            src={
              listing.imageUrls?.[0] ||
              'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*'
            }
            alt='listing cover'
            className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
          />
          <div className='p-3 flex flex-col gap-2 w-full'>
            <p className='truncate text-lg font-semibold text-slate-700'>
              {listing.name || 'No name available'}
            </p>
            <div className='flex items-center gap-1'>
              <MdLocationOn className='h-4 w-4 text-green-700' />
              <p className='text-sm text-gray-600 truncate w-full'>
                {listing.address || 'No address available'}
              </p>
            </div>
            <p className='text-sm text-gray-600 line-clamp-2'>
              {listing.description || 'No description available'}
            </p>
            <p className='text-slate-500 mt-2 font-semibold '>
              Rs.{listing.price?.toLocaleString('en-US') || '0'}
            </p>
            <div className='text-slate-700 flex gap-4'>
              <div className='font-bold text-xs'>
                {listing.year || '0'} yrs
              </div>
              <div className='font-bold text-xs'>
                {listing.month || '0'} mths
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  