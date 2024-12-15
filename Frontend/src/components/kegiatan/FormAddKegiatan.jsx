import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddKegiatan = () => {
  const [nama_kegiatan, setNamaKegiatan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [waktu, setWaktu] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveKegiatan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/kegiatan", {
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
      <h2 className="subtitle">Tambah Kegiatan Baru</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveKegiatan}>
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

export default FormAddKegiatan;
