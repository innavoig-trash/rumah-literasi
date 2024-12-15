import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddBuku = () => {
  const [judul_buku, setJudulBuku] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahun_terbit, setTahunTerbit] = useState("");
  const [bahasa, setBahasa] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [gambar, setGambar] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveBuku = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("judul_buku", judul_buku);
      formData.append("penulis", penulis);
      formData.append("penerbit", penerbit);
      formData.append("tahun_terbit", tahun_terbit);
      formData.append("bahasa", bahasa);
      formData.append("jumlah", jumlah);
      formData.append("file", gambar); // Gunakan key 'file'

      try {
          await axios.post("http://localhost:5000/buku", formData, {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
          });
          navigate("/buku");
      } catch (error) {
          if (error.response) {
              setMsg(error.response.data.msg);
          }
      }
  };

  return (
    <div>
      <h1 className="title">Buku</h1>
      <h2 className="subtitle">Tambah Buku Baru</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveBuku}>
              <p className="has-text-centered">{msg}</p>
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
              <div className="field">
                <label className="label">Penulis</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={penulis}
                    onChange={(e) => setPenulis(e.target.value)}
                    placeholder="Penulis"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Penerbit</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={penerbit}
                    onChange={(e) => setPenerbit(e.target.value)}
                    placeholder="Penerbit"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tahun Terbit</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={tahun_terbit}
                    onChange={(e) => setTahunTerbit(e.target.value)}
                    placeholder="Tahun Terbit"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Bahasa</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={bahasa}
                    onChange={(e) => setBahasa(e.target.value)}
                    placeholder="Bahasa"
                  />
                </div>
              </div>
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
                <label className="label">Gambar</label>
                <div className="control">
                  <input
                    type="file"
                    className="input"
                    onChange={(e) => setGambar(e.target.files[0])}
                  />
                </div>
              </div>

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

export default FormAddBuku;
