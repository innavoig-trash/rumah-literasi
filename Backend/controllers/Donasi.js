import Donasi from "../models/DonasiModel.js";
import path from "path";
import fs from "fs";

export const getDonasi = async (req, res) => {
    try {
        const response = await Donasi.findAll();
        res.json(response);
    } catch (error) {
        console.error(error.message);
    }
};

export const getDonasiById = async (req, res) => {
    try {
        const response = await Donasi.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (!response) return res.status(404).json({ msg: "Donasi tidak ditemukan" });
        res.json(response);
    } catch (error) {
        console.error(error.message);
    }
};

export const saveDonasi = (req, res) => {
    if (!req.files || !req.files.file) {
        console.log("No file uploaded");
        return res.status(400).json({ msg: "No File Uploaded" });
    }

    const { jenis_donasi, jumlah, judul_buku } = req.body; // Tambahkan judul_buku dari frontend
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const filePath = `./public/images/donasi/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    console.log("Jenis Donasi:", jenis_donasi);
    console.log("Jumlah:", jumlah);
    console.log("Judul Buku:", judul_buku || "Tidak ada judul");
    console.log("File:", file.name);
    console.log("Nama User dari Middleware:", req.name); // Nama user dari middleware

    // Validasi file
    if (!allowedType.includes(ext.toLowerCase())) {
        console.log("Invalid file type:", ext);
        return res.status(422).json({ msg: "Invalid Images" });
    }
    if (fileSize > 5000000) {
        console.log("File size too large:", fileSize);
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    // Ambil nama user dari middleware
    const nama_user = req.name || "Anonymous";

    // Pindahkan file ke folder tujuan
    file.mv(filePath, async (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(500).json({ msg: err.message });
        }

        try {
            // Simpan data ke database
            await Donasi.create({
                nama_user, // Dari middleware
                jenis_donasi,
                judul_buku: judul_buku || null, // Kolom opsional, default null
                jumlah,
                status: "Pending", // Default status
                gambar: fileName, // Nama file
            });
            console.log("Donasi berhasil disimpan ke database");
            res.status(201).json({ msg: "Donasi berhasil dibuat" });
        } catch (error) {
            console.error("Database error:", error.message);
            res.status(500).json({ msg: "Database error" });
        }
    });
};

export const deleteDonasi = async (req, res) => {
    const donasi = await Donasi.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!donasi) return res.status(404).json({ msg: "Donasi tidak ditemukan" });

    try {
        const filePath = `./public/images/donasi/${donasi.gambar}`;
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        await Donasi.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Donasi berhasil dihapus" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Gagal menghapus donasi." });
    }
};

export const approveDonasi = async (req, res) => {
    try {
        const donasi = await Donasi.findOne({ where: { id: req.params.id } });
        if (!donasi) return res.status(404).json({ msg: "Donasi tidak ditemukan" });

        await Donasi.update({ status: "Approved" }, { where: { id: req.params.id } });
        res.status(200).json({ msg: "Donasi berhasil disetujui" });
    } catch (error) {
        console.error("Error saat menyetujui donasi:", error);
        res.status(500).json({ msg: "Gagal menyetujui donasi." });
    }
};

export const rejectDonasi = async (req, res) => {
    try {
        const donasi = await Donasi.findOne({ where: { id: req.params.id } });
        if (!donasi) return res.status(404).json({ msg: "Donasi tidak ditemukan" });

        await Donasi.update({ status: "Rejected" }, { where: { id: req.params.id } });
        res.status(200).json({ msg: "Donasi berhasil ditolak" });
    } catch (error) {
        console.error("Error saat menolak donasi:", error);
        res.status(500).json({ msg: "Gagal menolak donasi." });
    }
};
