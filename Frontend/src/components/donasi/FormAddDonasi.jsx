import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddDonasi = () => {
  const [nama_user, setNamaUser] = useState(""); // Nama user otomatis
  const [jenis_donasi, setJenisDonasi] = useState("Tunai"); // Default dropdown
  const [judul_buku, setJudulBuku] = useState(""); // Judul buku (opsional)
  const [jumlah, setJumlah] = useState("");
  const [gambar, setGambar] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data user login dari backend
    const fetchUserName = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user", {
          withCredentials: true, // Kirim cookie untuk autentikasi
        });
        setNamaUser(response.data.name); // Set nama user dari respons
      } catch (error) {
        setMsg(error.response?.data?.msg || "Gagal mengambil data user.");
      }
    };

    fetchUserName();
  }, []);

  const saveDonasi = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_user", nama_user); // Nama user otomatis
    formData.append("jenis_donasi", jenis_donasi);
    formData.append("jumlah", jumlah);
    formData.append("status", "Pending"); // Status otomatis "Pending"
    formData.append("file", gambar); // Gunakan key 'file'

    // Tambahkan judul_buku jika jenis donasi adalah Buku
    if (jenis_donasi === "Buku") {
      formData.append("judul_buku", judul_buku);
    }

    try {
      await axios.post("http://localhost:5000/donasi", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      navigate("/donasi");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Donasi</h1>
      <h2 className="subtitle">Tambah Donasi Baru</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveDonasi}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama User</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={nama_user}
                    hidden // Tidak dapat diubah
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Jenis Donasi</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={jenis_donasi}
                      onChange={(e) => setJenisDonasi(e.target.value)}
                    >
                      <option value="Tunai">Tunai</option>
                      <option value="Buku">Buku</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Input untuk judul buku hanya muncul jika jenis donasi adalah Buku */}
              {jenis_donasi === "Buku" && (
                <div className="field">
                  <label className="label">Judul Buku</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={judul_buku}
                      onChange={(e) => setJudulBuku(e.target.value)}
                      placeholder="Judul Buku"
                    />
                  </div>
                </div>
              )}
              <div className="field">
                <label className="label">Jumlah</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                    placeholder="Jumlah"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">
                  {jenis_donasi === "Tunai" ? "Bukti Transfer" : "Cover Buku"}
                </label>
                <div className="control">
                  <input
                    type="file"
                    className="input"
                    onChange={(e) => setGambar(e.target.files[0])}
                  />
                </div>
              </div>
              <input type="hidden" value="Pending" name="status" />
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddDonasi;
