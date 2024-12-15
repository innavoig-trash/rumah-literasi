import React, { useEffect } from "react";
import Layout from "../Layout";
import DetailDonasi from "../../components/donasi/DetailDonasi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import DetailDonasi from "../../components/donasi/DetailDonasi";

const DetailDonasi = () => {
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
      <DetailDonasi />
    </Layout>
  );
};

export default DetailDonasi;
