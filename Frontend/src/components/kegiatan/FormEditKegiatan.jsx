import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditKegiatan = () => {
  const [nama_kegiatan, setNamaKegiatan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [waktu, setWaktu] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getKegiatanById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/kegiatan/${id}`
        );
        setNamaKegiatan(response.data.nama_kegiatan);
        setDeskripsi(response.data.deskripsi);
        setWaktu(response.data.waktu);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getKegiatanById();
  }, [id]);

  const updateKegiatan = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/kegiatan/${id}`, {
        nama_kegiatan: nama_kegiatan,
        deskripsi: deskripsi,
        waktu: waktu,
      });
      navigate("/kegiatan");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Kegiatan</h1>
      <h2 className="subtitle">Edit Kegiatan</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateKegiatan}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama Kegiatan</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={nama_kegiatan}
                    onChange={(e) => setNamaKegiatan(e.target.value)}
                    placeholder="Nama Kegiatan"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Deskripsi</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Deskripsi"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Waktu</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={waktu}
                    onChange={(e) => setWaktu(e.target.value)}
                    placeholder="Tanggal Kegiatan"
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

export default FormEditKegiatan;
