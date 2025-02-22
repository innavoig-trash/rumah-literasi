import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoCalendar,
  IoHome,
  IoLogOut,
  IoBook,
  IoGift,
  IoLibrary,
  IoClipboard,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation(); // Ambil pathname dari useLocation()

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const renderMenu = () => {
    if (!user) return null;

    const menuItems = {
      superadmin: [
        { path: "/dashboard", icon: <IoHome />, label: "Dashboard" },
        { path: "/kegiatan", icon: <IoCalendar />, label: "Kegiatan" },
        { path: "/buku", icon: <IoBook />, label: "Buku" },
        { path: "/donasi", icon: <IoGift />, label: "Donasi" },
        { path: "/ruangbaca", icon: <IoLibrary />, label: "Ruang Baca" },
        { path: "/pinjaman", icon: <IoClipboard />, label: "Pinjaman" },
        { path: "/users", icon: <IoPerson />, label: "Users" },
      ],
      pustakawan: [
        { path: "/dashboard", icon: <IoHome />, label: "Dashboard" },
        { path: "/buku", icon: <IoBook />, label: "Buku" },
        { path: "/ruangbaca", icon: <IoLibrary />, label: "Ruang Baca" },
        { path: "/pinjaman", icon: <IoClipboard />, label: "Pinjaman" },
      ],
      admin: [
        { path: "/dashboard", icon: <IoHome />, label: "Dashboard" },
        { path: "/kegiatan", icon: <IoCalendar />, label: "Kegiatan" },
        { path: "/donasi", icon: <IoGift />, label: "Donasi" },
      ],
      user: [
        { path: "/dashboard", icon: <IoHome />, label: "Dashboard" },
        { path: "/donasi", icon: <IoGift />, label: "Donasi" },
        { path: "/ruangbaca", icon: <IoLibrary />, label: "Ruang Baca" },
        { path: "/pinjaman", icon: <IoClipboard />, label: "Pinjaman" },
      ],
    };

    return menuItems[user.role]?.map((item, index) => (
      <li key={index}>
        <NavLink
          to={item.path}
          className="sidebar-link"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderRadius: "5px",
            textDecoration: "none",
            color: location.pathname.includes(item.path) ? "white" : "#333",
            backgroundColor: location.pathname.includes(item.path)
              ? "#5092f5"
              : "transparent",
            transition: "0.3s",
          }}
        >
          {item.icon} <span style={{ marginLeft: "8px" }}>{item.label}</span>
        </NavLink>
      </li>
    ));
  };

  return (
    <div>
      <aside style={{ padding: "10px" }}>
        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>General</p>
        <ul style={{ listStyle: "none", padding: 0 }}>{renderMenu()}</ul>

        <p style={{ fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>Settings</p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <button
              onClick={logout}
              style={{
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                color: "#d9534f",
                cursor: "pointer",
                padding: "10px",
                fontSize: "16px",
              }}
            >
              <IoLogOut /> <span style={{ marginLeft: "8px" }}>Logout</span>
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
