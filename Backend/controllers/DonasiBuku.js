import DonasiBuku from "../models/DonasiBukuModel.js";

export const getIndexDonasi = async (req, res) => {
    try {
        res.json({ message: "Welcome to Donasi Dashboard" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
};



export const getDonasiBuku = async (req, res) => {
    try {
        const response = await DonasiBuku.findAll();
        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const getDonasiBukuById = async (req, res) => {
    try {
        const response = await DonasiBuku.findOne({ where: { id: req.params.id } });
        if (!response) return res.status(404).json({ msg: "Donasi Buku tidak ditemukan" });
        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const saveDonasiBuku = async (req, res) => {
    try {
        const { judul_buku, kategori_buku, jumlah_buku, alamat_pengiriman } = req.body;

        if (!judul_buku || !kategori_buku || !jumlah_buku || !alamat_pengiriman) {
            return res.status(400).json({ msg: "Semua field harus diisi!" });
        }

        await DonasiBuku.create({
            judul_buku,
            kategori_buku,
            jumlah_buku,
            alamat_pengiriman
        });

        res.status(201).json({ msg: "Donasi Buku berhasil dibuat" });
    } catch (error) {
        console.error("Error saat menyimpan data:", error);
        res.status(500).json({ msg: "Database error", error: error.message });
    }
};


export const deleteDonasiBuku = async (req, res) => {
    try {
        const donasiBuku = await DonasiBuku.findOne({ where: { id: req.params.id } });
        if (!donasiBuku) return res.status(404).json({ msg: "Donasi Buku tidak ditemukan" });

        await DonasiBuku.destroy({ where: { id: req.params.id } });
        res.status(200).json({ msg: "Donasi Buku berhasil dihapus" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Gagal menghapus donasi buku." });
    }
};
