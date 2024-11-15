import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Header() {
  const { currentUser } = useSelector(state => state.user)

  return (
    <header className="bg-sky-950 shadow-cyan-900 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex-wrap">
            <span className="text-fuchsia-300">PawPaws</span>
          </h1>
        </Link>
        
        <form className="bg-green-50 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button>
          <FaSearch className='text-blue-950'/>
        </button>
        </form>
        
        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-red-300 hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/donate">
            <li className="text-red-300 hidden sm:inline hover:underline">Donate</li>
          </Link>
          
          <Link to="/about">
            <li className="text-red-300 hidden sm:inline hover:underline">About</li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar }
                alt="profile"
              />
            ) : (
              <li className="text-gray-100 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
