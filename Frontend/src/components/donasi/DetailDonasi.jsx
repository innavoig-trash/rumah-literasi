import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DetailDonasi = () => {
  const [nama_user, setNamaUser] = useState("");
  const [jenis_donasi, setJenisDonasi] = useState("");
  const [judul_buku, setJudulBuku] = useState(""); // Tambahkan state untuk judul buku
  const [jumlah, setJumlah] = useState("");
  const [status, setStatus] = useState("");
  const [gambar, setGambar] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDonasiById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/donasi/${id}`);
        const data = response.data;
        setNamaUser(data.nama_user);
        setJenisDonasi(data.jenis_donasi);
        setJudulBuku(data.judul_buku || "-"); // Default "-" jika judul buku tidak ada
        setJumlah(data.jumlah);
        setStatus(data.status);
        setGambar(data.gambar);
      } catch (error) {
        setMsg(error.response?.data?.msg || "Gagal memuat data.");
      }
    };
    getDonasiById();
  }, [id]);

  const handleApprove = async () => {
    try {
      await axios.patch(`http://localhost:5000/donasi/approve/${id}`);
      setStatus("Approved");
    } catch (error) {
      setMsg(error.response?.data?.msg || "Gagal menyetujui donasi.");
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(`http://localhost:5000/donasi/reject/${id}`);
      setStatus("Rejected");
    } catch (error) {
      setMsg(error.response?.data?.msg || "Gagal menolak donasi.");
    }
  };

  const handleBack = () => {
    navigate("/donasi");
  };

  return (
    <div>
      <h1 className="title">Detail Donasi</h1>
      <h2 className="subtitle">Informasi Donasi</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Nama User</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={nama_user}
                  readOnly
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Jenis Donasi</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={jenis_donasi}
                  readOnly
                />
              </div>
            </div>
            {/* Hanya tampilkan judul buku jika jenis donasi adalah Buku */}
            {jenis_donasi === "Buku" && (
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
            )}
            <div className="field">
              <label className="label">Jumlah</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  value={jumlah}
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
              <label className="label">
                {jenis_donasi === "Tunai" ? "Bukti Transfer" : "Cover Buku"}
              </label>
              {gambar && (
                <figure className="image is-128x128">
                  <img
                    src={`http://localhost:5000/images/donasi/${gambar}`}
                    alt={jenis_donasi === "Tunai" ? "Bukti Transfer" : "Cover Buku"}
                  />
                </figure>
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
            {(status === "Approved" || status === "Rejected") && (
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

export default DetailDonasi;
