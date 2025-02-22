import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/user/Users";
import Kegiatan from "./pages/kegiatan/Kegiatan";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import AddKegiatan from "./pages/kegiatan/AddKegiatan";
import EditKegiatan from "./pages/kegiatan/EditKegiatan";
import Buku from "./pages/buku/Buku";
import AddBuku from "./pages/buku/AddBuku";
import EditBuku from "./pages/buku/EditBuku";
import Donasi from "./pages/donasi/Donasi";
import DonasiBukuForm from "./pages/donasi/DonasiBukuForm";
import DonasiUangForm from "./pages/donasi/DonasiUangForm";



// Import halaman untuk fitur Pinjaman
import Pinjaman from "./pages/pinjaman/Pinjaman"; // Import halaman Pinjaman
import AddPinjaman from "./pages/pinjaman/AddPinjaman"; // Import halaman AddPinjaman
import DetailPinjaman from "./components/pinjaman/DetailPinjaman"; // Import halaman DetailPinjaman

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/kegiatan" element={<Kegiatan />} />
          <Route path="/kegiatan/add" element={<AddKegiatan />} />
          <Route path="/kegiatan/edit/:id" element={<EditKegiatan />} />
          <Route path="/buku" element={<Buku />} />
          <Route path="/buku/add" element={<AddBuku />} />
          <Route path="/buku/edit/:id" element={<EditBuku />} />
          <Route path="/donasi" element={<Donasi />} />
          <Route path="/donasi-buku" element={<DonasiBukuForm />} />
          <Route path="/donasi-uang" element={<DonasiUangForm />} />

          {/* Route untuk Pinjaman */}
          <Route path="/pinjaman" element={<Pinjaman />} /> {/* Route Pinjaman */}
          <Route path="/pinjaman/add/:id" element={<AddPinjaman />} /> {/* Route AddPinjaman */}
          <Route path="/pinjaman/detail/:id" element={<DetailPinjaman />} /> {/* Route Detail Pinjaman */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
