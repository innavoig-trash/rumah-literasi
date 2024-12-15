import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DonasiList = () => {
  const [donasi, setDonasi] = useState([]);

  useEffect(() => {
    getDonasi();
  }, []);

  const getDonasi = async () => {
    const response = await axios.get("http://localhost:5000/donasi");
    setDonasi(response.data);
  };

  // const approveDonasi = async (donasiId) => {
  //   try {
  //     await axios.put(`http://localhost:5000/donasi/${donasiId}`, {
  //       status: "Approved",
  //     });
  //     getDonasi();
  //   } catch (error) {
  //     console.error("Error approving donasi:", error);
  //   }
  // };

  return (
    <div>
      <h1 className="title">Donasi</h1>
      <h2 className="subtitle">List of Donasi</h2>
      <Link to="/donasi/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Nama User</th>
            <th>Jenis Donasi</th>
            <th>Judul Buku</th>
            <th>Jumlah</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donasi.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <figure className="image is-64x64">
                  <img
                    src={`http://localhost:5000/images/donasi/${item.gambar}`}
                    alt={item.nama_user}
                  />
                </figure>
              </td>
              <td>{item.nama_user}</td>
              <td>{item.jenis_donasi}</td>
              <td>{item.judul_buku ? item.judul_buku : "-"}</td>
              <td>{item.jumlah}</td>
              <td>{item.status}</td>
              <td>
                <Link
                  to={`/donasi/detail/${item.id}`}
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

export default DonasiList;
