import React from "react";
import { useNavigate } from "react-router-dom";

const DonasiDashboard = () => {
  const message = "Selamat datang di dashboard donasi!";
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 text-left">
      <h1 className="text-2xl font-semibold text-left">Halo, Selamat Datang</h1>
      <h2 className="text-3xl font-bold mt-1 text-left">Jane!</h2>
      <p className="text-gray-600 mt-2 text-left">{message}</p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Navigasi ke Form Donasi Buku */}
        <div className="relative group cursor-pointer" onClick={() => navigate("/donasi-buku")}>
          <img
            src="/img/buku.png"
            alt="Donasi Buku"
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col items-start justify-center px-4">
            <span className="text-white text-lg font-semibold text-left">Donasi Buku</span>
            <span className="text-white text-xl mt-2">→</span>
          </div>
        </div>

        {/* Navigasi ke Form Donasi Uang */}
        <div className="relative group cursor-pointer" onClick={() => navigate("/donasi-uang")}>
          <img
            src="/img/uang.jpg"
            alt="Donasi Uang"
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col items-start justify-center px-4">
            <span className="text-white text-lg font-semibold text-left">Donasi Uang</span>
            <span className="text-white text-xl mt-2">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonasiDashboard;
