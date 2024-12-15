import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditBuku = () => {
  const [judul_buku, setJudulBuku] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahun_terbit, setTahunTerbit] = useState("");
  const [bahasa, setBahasa] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [gambar, setGambar] = useState(null);
  const [previewGambar, setPreviewGambar] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getBukuById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/buku/${id}`);
        const data = response.data;
        setJudulBuku(data.judul_buku);
        setPenulis(data.penulis);
        setPenerbit(data.penerbit);
        setTahunTerbit(data.tahun_terbit);
        setBahasa(data.bahasa);
        setJumlah(data.jumlah);
        setPreviewGambar(`http://localhost:5000/images/${data.gambar}`);
      } catch (error) {
        setMsg(error.response?.data?.msg || "Gagal memuat data.");
      }
    };
    getBukuById();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreviewGambar(URL.createObjectURL(file)); // Preview gambar baru
  };

  const updateBuku = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul_buku", judul_buku);
    formData.append("penulis", penulis);
    formData.append("penerbit", penerbit);
    formData.append("tahun_terbit", tahun_terbit);
    formData.append("bahasa", bahasa);
    formData.append("jumlah", jumlah);
    if (gambar) {
      formData.append("file", gambar); // Key harus sesuai dengan backend
    }

    try {
      await axios.put(`http://localhost:5000/buku/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/buku");
    } catch (error) {
      setMsg(error.response?.data?.msg || "Gagal memperbarui buku.");
    }
  };

  return (
    <div>
      <h1 className="title">Buku</h1>
      <h2 className="subtitle">Edit Buku</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateBuku}>
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
                {previewGambar && (
                  <figure className="image is-128x128">
                    <img src={previewGambar} alt="Preview" />
                  </figure>
                )}
                <div className="control">
                  <input
                    type="file"
                    className="input"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
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

export default FormEditBuku;
