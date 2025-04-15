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
    <header className="bg-gradient-to-r from-teal-900 to-teal-800 shadow-lg py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4 md:gap-10">

        {/* Logo */}
        <Link to="/" className="hover:scale-105 transition-transform duration-300">
          <img src={image} className="w-10" alt="logo" />
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-lg flex items-center shadow-md w-full max-w-md">
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

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} className="text-cyan-300" /> : <Menu size={28} className="text-cyan-300" />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`fixed md:static top-0 left-0 w-full h-screen md:h-auto bg-sky-900/90 md:bg-transparent px-4 pt-16 md:pt-0 md:px-0 flex flex-col md:flex-row items-center justify-center md:gap-6 z-50 backdrop-blur-sm transition-all duration-300 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          {/* Close button (mobile only) */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 text-cyan-300 hover:text-fuchsia-300 transition-colors duration-300 md:hidden"
          >
            <X size={28} />
          </button>

          <Link to="/" onClick={() => setMenuOpen(false)}>
            <li className="text-cyan-300 hover:text-fuchsia-300 hover:underline transition-colors duration-300 py-4 md:py-0">Home</li>
          </Link>

          <Link to="/payment" onClick={() => setMenuOpen(false)}>
            <li className="text-cyan-300 hover:text-fuchsia-300 hover:underline transition-colors duration-300 py-4 md:py-0">Donate</li>
          </Link>

          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <li className="text-cyan-300 hover:text-fuchsia-300 hover:underline transition-colors duration-300 py-4 md:py-0">About</li>
          </Link>

          {currentUser && (
            <Link to="/chat" onClick={() => setMenuOpen(false)}>
              <li className="text-cyan-300 hover:text-fuchsia-300 transition-colors duration-300 py-4 md:py-0">
                <FaComments className="text-xl" />
              </li>
            </Link>
          )}

          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            {currentUser ? (
              <img
                className="rounded-full h-10 w-10 object-cover border-2 border-cyan-300 hover:border-fuchsia-300 transition-all duration-300 mt-4 md:mt-0"
                src={
                  currentUser.avatar ||
                  'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
                }
                alt="profile"
              />
            ) : (
              <li className="text-cyan-300 hover:text-fuchsia-300 hover:underline transition-colors duration-300 py-4 md:py-0">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
