import React, { useEffect } from "react";
import Layout from "../Layout";
import DetailPinjaman from "../../components/pinjaman/DetailPinjaman"; // Import FormAddPinjaman
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const AddPinjaman = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe()); // Periksa autentikasi user
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/"); // Jika autentikasi gagal, arahkan ke halaman login
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <DetailPinjaman /> {/* Komponen untuk form tambah pinjaman */}
    </Layout>
  );
};

export default AddPinjaman;
