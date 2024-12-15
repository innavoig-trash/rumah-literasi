import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const BukuList = () => {
  const [buku, setBuku] = useState([]);
  const { user } = useSelector((state) => state.auth); // Ambil informasi user yang login
  const navigate = useNavigate();

  useEffect(() => {
    getBuku();
  }, []);

  const getBuku = async () => {
    try {
      const response = await axios.get("http://localhost:5000/buku");
      setBuku(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handlePinjam = (buku) => {
    // Navigasikan ke halaman FormAddPinjaman dengan membawa ID buku dan data buku
    navigate(`/pinjaman/add/${buku.id}`, {
      state: {
        buku, // Kirim seluruh data buku
        user: { name: user.name }, // Kirim data user
      },
    });
  };

  const deleteBuku = async (bukuId) => {
    try {
      await axios.delete(`http://localhost:5000/buku/${bukuId}`);
      getBuku();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h1 className="title">Buku</h1>
      <h2 className="subtitle">List of Buku</h2>
      {user && user.role !== "user" && (
        <button onClick={() => navigate("/buku/add")} className="button is-primary mb-2">
          Add New
        </button>
      )}
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Judul Buku</th>
            <th>Penulis</th>
            <th>Tahun Terbit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buku.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <figure className="image is-64x64">
                  <img
                    src={`http://localhost:5000/images/buku/${item.gambar}`}
                    alt={item.judul_buku}
                  />
                </figure>
              </td>
              <td>{item.judul_buku}</td>
              <td>{item.penulis}</td>
              <td>{item.tahun_terbit}</td>
              <td>
                {user && user.role === "user" ? (
                  // Jika user memiliki role 'user', tampilkan tombol Pinjam
                  <button
                    onClick={() => handlePinjam(item)}
                    className="button is-small is-success"
                  >
                    Pinjam
                  </button>
                ) : (
                  // Jika bukan 'user', tampilkan tombol Edit dan Delete
                  <>
                    <button
                      onClick={() => navigate(`/buku/edit/${item.id}`)}
                      className="button is-small is-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBuku(item.id)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BukuList;
