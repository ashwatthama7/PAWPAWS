import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/useSlice";
import OAuth from "../components/OAuth";
import image from "../assets/helpinghand.png";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-10 flex flex-wrap  justify-center align-middle rounded-lg">
      {/* Left Side - Image Section */}
      <div
        className="hidden md:flex w-full md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b flex flex-col items-center justify-center text-emerald-950 p-8">
          <h1 className="text-5xl font-bold mb-4">PawPaws</h1>
          <p className="text-xl text-center leading-relaxed">
            "Saving one dog won’t change the world, but for that one dog, the world will change forever."
          </p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full md:w-1/2 bg-white p-10 flex flex-col items-center justify-center">
        <h2 className="text-5xl font-extrabold text-blue-900 mb-6 text-center">Welcome Back</h2>
        <p className="text-lg text-blue-700 mb-6 text-center">Login with Email</p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <OAuth />
        </form>

        <p className="text-center text-blue-700 mt-6">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-600 font-semibold hover:underline">
            Register Now
          </Link>
        </p>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}