import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const KegiatanList = () => {
  const [kegiatan, setKegiatan] = useState([]);

  useEffect(() => {
    getKegiatan();
  }, []);

  const getKegiatan = async () => {
    const response = await axios.get("http://localhost:5000/kegiatan");
    setKegiatan(response.data);
  };

  const deleteKegiatan = async (kegiatanId) => {
    await axios.delete(`http://localhost:5000/kegiatan/${kegiatanId}`);
    getKegiatan();
  };

  return (
    <div>
      <h1 className="title">Kegiatan</h1>
      <h2 className="subtitle">List of Kegiatan</h2>
      <Link to="/kegiatan/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Kegiatan</th>
            <th>Deskripsi</th>
            <th>Waktu</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {kegiatan.map((item, index) => (
            <tr key={item.uuid}>
              <td>{index + 1}</td>
              <td>{item.nama_kegiatan}</td>
              <td>{item.deskripsi.slice(0, 5)}...</td> {/* Potong deskripsi */}
              <td>{item.waktu}</td>
              <td>{item.user.name}</td>
              <td>
                <Link
                  to={`/kegiatan/edit/${item.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteKegiatan(item.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KegiatanList;
