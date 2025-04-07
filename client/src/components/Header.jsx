import { FaSearch, FaComments } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import image from '../assets/logo.png';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gradient-to-r from-sky-900 to-sky-950 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-0">
        {/* Logo Section */}
        <Link to="/">
          <h1 className="font-bold text-xl sm:text-2xl flex-wrap hover:scale-105 transition-transform duration-300">
            <img src={image} className='w-10 '></img>
          </h1>
        </Link>
        
        {/* Search Bar */}
        <div className="flex justify-center my-4">
          <form onSubmit={handleSubmit} className="bg-white p-2 rounded-lg flex items-center shadow-sm hover:shadow-md transition-shadow duration-300 max-w-md w-full mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full text-sky-900 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="hover:scale-110 transition-transform duration-300">
              <FaSearch className="text-sky-900" />
            </button>
          </form>
        </div>
        
        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} className="text-cyan-300" /> : <Menu size={28} className="text-cyan-300" />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`absolute md:static top-16 left-0 w-full md:w-auto bg-sky-900 p-2 md:p-0 md:bg-transparent rounded-lg md:flex md:gap-4 items-center transition-all duration-300 ${menuOpen ? 'block' : 'hidden'}`}>
          <Link to="/">
            <li className="text-cyan-300 hover:text-fuchsia-300 hover:underline transition-colors duration-300 py-2 md:py-0">Home</li>
          </Link>
          <Link to="/news">
            <li className="text-cyan-300 hover:text-fuchsia-300 hover:underline transition-colors duration-300 py-2 md:py-0">News</li>
          </Link>
          <Link to="/donate">
            <li className="text-cyan-300 hover:text-fuchsia-300 hover:underline transition-colors duration-300 py-2 md:py-0">Donate</li>
          </Link>
          <Link to="/about">
            <li className="text-cyan-300 hover:text-fuchsia-300 hover:underline transition-colors duration-300 py-2 md:py-0">About</li>
          </Link>

          {/* Chat Icon - Only shown when user is logged in */}
          {currentUser && (
            <Link to="/chat">
              <li className="text-cyan-300 hover:text-fuchsia-300 transition-colors duration-300 py-2 md:py-0">
                <FaComments className="text-xl" />
              </li>
            </Link>
          )}

          {/* Profile/Sign In */}
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-cyan-300 hover:border-fuchsia-300 transition-all duration-300"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-cyan-300 hover:text-fuchsia-300 hover:underline transition-colors duration-300 py-2 md:py-0">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}