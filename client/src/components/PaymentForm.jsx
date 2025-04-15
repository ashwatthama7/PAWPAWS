import React, { useState } from "react";
import axios from "axios";
import { generateUniqueId } from "esewajs";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/initiate-payment", {
        amount,
        productId: generateUniqueId(),
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp"></img>
        <form onSubmit={handlePayment} className="space-y-5">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (NPR)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Enter amount"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Donate via eSewa
            
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
