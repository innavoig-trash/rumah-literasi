import React, { useEffect } from "react";
import Layout from "../Layout";
import DonasiDashboard from "../../components/donasiBuku/DonasiDashboard";
import DonasiBukuForm from "../../components/donasiBuku/DonasiBukuForm";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Donasi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <DonasiDashboard />
    </Layout>
  );
};

export default Donasi;
