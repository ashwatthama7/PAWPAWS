import React from "react";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h1>
        <p className="text-gray-700 mb-6">
          There was an issue with your payment. Please try again or contact support.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Failure;
