import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import axios from "axios";

const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  const decoded = base64Decode(token);

  const verifyPaymentAndUpdateStatus = async () => {
    try {
      const response = await axios.post("http://localhost:3000/payment-status", {
        product_id: decoded.transaction_uuid,
      });

      if (response.status === 200) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white shadow-lg p-8 rounded-2xl text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Verification Failed</h1>
          <p className="text-gray-700 mb-4">We encountered an issue verifying your transaction.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gap-y-20 flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg p-8 rounded-2xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
        <p className="text-gray-700 mb-4">Thank you for your payment. Your transaction was successful.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Success;
