import { useState } from "react";
import axios from "axios";

const DonasiBukuForm = () => {
  const [formData, setFormData] = useState({
    judul_buku: "",
    kategori_buku: "",
    jumlah_buku: "",
    alamat_pengiriman: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data yang dikirim:", formData);

    try {
      const response = await axios.post("http://localhost:5000/donasi-buku", formData, {
        withCredentials: true,
      });

      // Tampilkan modal
      setIsModalOpen(true);

      // Reset form setelah sukses
      setFormData({
        judul_buku: "",
        kategori_buku: "",
        jumlah_buku: "",
        alamat_pengiriman: "",
      });

      // Tutup modal setelah 3 detik
      setTimeout(() => setIsModalOpen(false), 3000);
      
    } catch (error) {
      console.error("Error dari backend:", error.response?.data || error);
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-gray-100">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Donasi Buku</h2>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5092f5]">Judul Buku</label>
            <input
              type="text"
              name="judul_buku"
              value={formData.judul_buku}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-[#5092f5] rounded-md"
              placeholder="Masukkan judul buku"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5092f5]">Kategori Buku</label>
            <input
              type="text"
              name="kategori_buku"
              value={formData.kategori_buku}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-[#5092f5] rounded-md"
              placeholder="Masukkan kategori"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5092f5]">Jumlah Buku</label>
            <input
              type="number"
              name="jumlah_buku"
              value={formData.jumlah_buku}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-[#5092f5] rounded-md"
              placeholder="Masukkan jumlah buku"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5092f5]">Alamat Pengiriman</label>
            <input
              type="text"
              name="alamat_pengiriman"
              value={formData.alamat_pengiriman}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-[#5092f5] rounded-md"
              placeholder="Masukkan alamat pengiriman"
              required
            />
          </div>
          <button type="submit" className="w-full bg-[#5092f5] text-white py-2 px-4 rounded-md hover:bg-[#4082e5]">
            Donasikan
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
        <img src="/img/paket.jpg" alt="Donasi Buku" className="rounded-lg shadow-md w-full max-w-2xl" />
      </div>

      {/* Modal Donasi Berhasil */}
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

export default DonasiBukuForm;
