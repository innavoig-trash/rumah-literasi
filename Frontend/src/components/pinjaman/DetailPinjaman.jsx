import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DetailPinjaman = () => {
  const [nama_peminjam, setNamaPeminjam] = useState("");
  const [judul_buku, setJudulBuku] = useState("");
  const [tanggal_pengembalian, setTanggalPengembalian] = useState("");
  const [status, setStatus] = useState("");
  const [gambar, setGambar] = useState(""); // Gambar buku yang dipinjam
  const [buktiPengembalian, setBuktiPengembalian] = useState(""); // Bukti pengembalian
  const [file, setFile] = useState(null); // State untuk file yang akan di-upload
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPinjamanById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pinjaman/${id}`);
        const data = response.data;
        setNamaPeminjam(data.nama_peminjam);
        setJudulBuku(data.judul_buku || "-");
        setTanggalPengembalian(data.tanggal_pengembalian || "-");
        setStatus(data.status);
        setGambar(data.gambar);
        setBuktiPengembalian(data.bukti_pengembalian || ""); // Menambahkan data bukti pengembalian
      } catch (error) {
        setMsg(error.response?.data?.msg || "Gagal memuat data.");
      }
    };
    getPinjamanById();
  }, [id]);

  const handleApprove = async () => {
    try {
      await axios.patch(`http://localhost:5000/pinjaman/approve/${id}`);
      setStatus("Approved");
    } catch (error) {
      setMsg(error.response?.data?.msg || "Gagal menyetujui pinjaman.");
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(`http://localhost:5000/pinjaman/reject/${id}`);
      setStatus("Rejected");
    } catch (error) {
      setMsg(error.response?.data?.msg || "Gagal menolak pinjaman.");
    }
  };

  const handleReturn = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.patch(`http://localhost:5000/pinjaman/return/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("Returned");
      setBuktiPengembalian(response.data.fileName); // Update bukti pengembalian dengan nama file baru
      navigate("/pinjaman");
    } catch (error) {
      setMsg(error.response?.data?.msg || "Gagal mengembalikan buku.");
    }
  };

  const handleBack = () => {
    navigate("/pinjaman");
  };

  return (
    <div>
      <h1 className="title">Detail Pinjaman</h1>
      <h2 className="subtitle">Informasi Pinjaman</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Nama Peminjam</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={nama_peminjam}
                  readOnly
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
                  readOnly
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Tanggal Pengembalian</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={tanggal_pengembalian}
                  readOnly
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Status</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={status}
                  readOnly
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Gambar Buku</label>
              {gambar && (
                <figure className="image is-128x128">
                  <img
                    src={`http://localhost:5000/images/pinjaman/${gambar}`}
                    alt="Gambar Buku"
                  />
                </figure>
              )}
              {/* Tampilkan bukti pengembalian jika status Returned */}
              {status === "Returned" && buktiPengembalian && (
                <div>
                  <label className="label">Bukti Pengembalian</label>
                  <figure className="image is-128x128">
                    <img
                      src={`http://localhost:5000/images/pinjaman/${buktiPengembalian}`}
                      alt="Bukti Pengembalian"
                    />
                  </figure>
                </div>
              )}
            </div>
            {status === "Pending" && (
              <div className="field is-grouped">
                <div className="control">
                  <button onClick={handleApprove} className="button is-success">
                    Approve
                  </button>
                </div>
                <div className="control">
                  <button onClick={handleReject} className="button is-danger">
                    Reject
                  </button>
                </div>
              </div>
            )}
            {status === "Approved" && (
              <form onSubmit={handleReturn}>
                <div className="field">
                  <label className="label">Upload Bukti Pengembalian</label>
                  <div className="control">
                    <input
                      type="file"
                      className="input"
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button type="submit" className="button is-success">
                      Kembalikan Buku
                    </button>
                  </div>
                </div>
              </form>
            )}
            {(status === "Returned" || status === "Rejected") && (
              <div className="field">
                <div className="control">
                  <button onClick={handleBack} className="button is-primary">
                    Kembali
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPinjaman;
