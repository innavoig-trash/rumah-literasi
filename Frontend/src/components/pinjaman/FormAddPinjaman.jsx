import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FormAddPinjaman = () => {
  const [nama_peminjam, setNamaPeminjam] = useState(""); // Nama peminjam (otomatis)
  const [judul_buku, setJudulBuku] = useState(""); // Judul buku (otomatis)
  const [tanggal_pengembalian, setTanggalPengembalian] = useState(""); // Input oleh user
  const [gambar, setGambar] = useState(""); // Gambar buku (otomatis)
  const [tanggal_pengajuan, setTanggalPengajuan] = useState(""); // Tanggal pengajuan otomatis
  const [msg, setMsg] = useState("");
  const { id } = useParams(); // ID buku dari route parameter
  const navigate = useNavigate();

  useEffect(() => {
    // Atur tanggal pengajuan menjadi tanggal saat ini
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setTanggalPengajuan(today);

    // Ambil data buku berdasarkan ID
    const fetchBukuData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/buku/${id}`);
        const buku = response.data;
        setJudulBuku(buku.judul_buku);
        setGambar(buku.gambar);
      } catch (error) {
        setMsg(error.response?.data?.msg || "Gagal memuat data buku.");
      }
    };

    // Ambil data user login
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user", {
          withCredentials: true, // Kirim cookie untuk autentikasi
        });
        setNamaPeminjam(response.data.name); // Set nama peminjam dari user
      } catch (error) {
        setMsg(error.response?.data?.msg || "Gagal mengambil data user.");
      }
    };

    fetchBukuData();
    fetchUserData();
  }, [id]);

  const savePinjaman = async (e) => {
    e.preventDefault();
    console.log("Data yang akan dikirim:", {
        nama_peminjam,
        judul_buku,
        tanggal_pengembalian,
        tanggal_pengajuan,
        gambar,
        status: "Pending",
    });
    try {
        await axios.post("http://localhost:5000/pinjaman", {
            nama_peminjam,
            judul_buku,
            jumlah: 1,
            tanggal_pengembalian,
            tanggal_pengajuan,
            gambar,
            status: "Pending",
        });
        navigate("/pinjaman");
    } catch (error) {
        console.error("Error saat menyimpan pinjaman:", error.response?.data?.msg);
        setMsg(error.response?.data?.msg || "Gagal menyimpan pinjaman.");
    }
};


  return (
    <div>
      <h1 className="title">Pinjaman</h1>
      <h2 className="subtitle">Form Pinjam Buku</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={savePinjaman}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama Peminjam</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={nama_peminjam}
                    readOnly // Tidak dapat diubah
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Judul Buku</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={judul_buku}
                    readOnly // Tidak dapat diubah
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal Pengembalian</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={tanggal_pengembalian}
                    onChange={(e) => setTanggalPengembalian(e.target.value)}
                    required // Wajib diisi
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Gambar Buku</label>
                <div className="control">
                  <figure className="image is-128x128">
                    <img
                      src={`http://localhost:5000/images/buku/${gambar}`}
                      alt={judul_buku}
                    />
                  </figure>
                </div>
              </div>
              {/* Hidden field untuk tanggal pengajuan */}
              <input type="hidden" value={tanggal_pengajuan} name="tanggal_pengajuan" />
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Pinjam
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

export default FormAddPinjaman;
