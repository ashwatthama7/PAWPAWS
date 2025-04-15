import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-50vh bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">Create Account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            id="username"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            id="email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            id="password"
            onChange={handleChange}
            required
          />

          <button
            disabled={loading}
            className="bg-emerald-600 text-white p-3 rounded-lg uppercase hover:bg-emerald-700 transition duration-300 disabled:opacity-60"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <OAuth />
        </form>

        <div className="flex items-center justify-center gap-2 mt-6 text-sm">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-violet-600 font-semibold hover:underline">
            Sign In
          </Link>
        </div>

        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}
