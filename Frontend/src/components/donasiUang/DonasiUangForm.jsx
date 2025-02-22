import { useState } from "react";
import axios from "axios";

const DonasiUangForm = () => {
  const [formData, setFormData] = useState({
    nomer_rekening: "",
    bukti_transfer: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "bukti_transfer") {
      setFormData({ ...formData, bukti_transfer: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Cek apakah file telah dipilih
    if (!formData.bukti_transfer) {
      alert("Silakan unggah bukti transfer!");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("nomer_rekening", formData.nomer_rekening);
    formDataToSend.append("bukti_transfer", formData.bukti_transfer);
  
    try {
      const response = await axios.post("http://localhost:5000/donasi-uang", formDataToSend, {
        withCredentials: true, 
      });
  
      setIsModalOpen(true);
      setFormData({
        nomer_rekening: "",
        bukti_transfer: null,
      });
  
      setTimeout(() => setIsModalOpen(false), 3000);
    } catch (error) {
      console.error("Error dari backend:", error.response?.data || error);
      alert(error.response?.data?.msg || "Gagal menyimpan donasi");
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-gray-100">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Donasi Uang</h2>
        <p className="text-gray-600 mb-6">Masukkan nomor rekening Anda dan unggah bukti transfer untuk berdonasi.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5092f5]">Nomor Rekening</label>
            <input
              type="number"
              name="nomer_rekening"
              value={formData.nomer_rekening}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-[#5092f5] rounded-md"
              placeholder="Masukkan nomor rekening"
              pattern="[0-9]*"
              inputMode="numeric"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5092f5]">Upload Bukti Transfer</label>
            <input
              type="file"
              name="bukti_transfer"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-[#5092f5] rounded-md"
              accept="image/*"
              required
            />
          </div>
          <button type="submit" className="w-full bg-[#5092f5] text-white py-2 px-4 rounded-md hover:bg-[#4082e5]">
            Donasikan
          </button>
        </form>
      </div>
      
      {/* Gambar di sebelah kanan */}
      <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
        <img src="/img/donasi.webp" alt="Donasi Uang" className="rounded-lg shadow-md w-full max-w-2xl" />
      </div>
      
      {/* Modal Notifikasi */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-bold text-blue-600">Donasi Berhasil</h2>
            <p className="text-gray-600 mt-2">Terima kasih telah berdonasi! Donasi Anda sangat berarti.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonasiUangForm;
