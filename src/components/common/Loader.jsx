import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Gradient Spinner */}
        <div className="w-20 h-20 rounded-full border-4 border-t-transparent border-b-transparent border-l-orange-500 border-r-orange-400 animate-spin shadow-lg"></div>
        
        {/* Loading Text */}
        <p className="text-gray-800 text-xl font-semibold animate-pulse">
          Loading your delicious food...
        </p>

        {/* Optional skeleton for cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="h-40 bg-gray-200 rounded-2xl animate-pulse shadow-md"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;