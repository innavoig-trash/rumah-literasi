import React, { useEffect } from "react";
import Layout from "../Layout";
import PinjamanList from "../../components/pinjaman/PinjamanList"; // Import komponen PinjamanList
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Pinjaman = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe()); // Periksa autentikasi user
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/"); // Jika tidak autentikasi, arahkan ke halaman login
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <PinjamanList /> {/* Komponen untuk menampilkan daftar pinjaman */}
    </Layout>
  );
};

export default Pinjaman;
