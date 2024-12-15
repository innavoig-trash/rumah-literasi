import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PinjamanList = () => {
  const [pinjaman, setPinjaman] = useState([]);

  useEffect(() => {
    getPinjaman();
  }, []);

  const getPinjaman = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pinjaman");
      setPinjaman(response.data);
    } catch (error) {
      console.error("Error fetching pinjaman:", error);
    }
  };

  return (
    <div>
      <h1 className="title">Pinjaman</h1>
      <h2 className="subtitle">List of Pinjaman</h2>
      <Link to="/buku" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Nama Peminjam</th>
            <th>Judul Buku</th>
            <th>Tanggal Pengembalian</th>
            <th>Status</th>
            <th>Actions</th> {/* Tambahkan kolom untuk actions */}
          </tr>
        </thead>
        <tbody>
          {pinjaman.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <figure className="image is-64x64">
                  <img
                    src={`http://localhost:5000/images/pinjaman/${item.gambar}`}
                    alt={item.nama_peminjam}
                  />
                </figure>
              </td>
              <td>{item.nama_peminjam}</td>
              <td>{item.judul_buku ? item.judul_buku : "-"}</td>
              <td>{item.tanggal_pengembalian ? item.tanggal_pengembalian : "-"}</td>
              <td>{item.status}</td>
              <td>
                <Link
                  to={`/pinjaman/detail/${item.id}`}
                  className="button is-small is-info"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PinjamanList;
