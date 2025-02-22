import Pinjaman from "../models/PinjamanModel.js"; // Model Pinjaman
import path from "path";
import fs from "fs";

// Ambil semua data pinjaman
export const getPinjaman = async (req, res) => {
    try {
        const response = await Pinjaman.findAll();
        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Gagal memuat data pinjaman." });
    }
};

export const savePinjaman = async (req, res) => {
    try {
        const { nama_peminjam, judul_buku, tanggal_pengembalian, status } = req.body;

        // Log data yang diterima dari frontend
        console.log("Data diterima:", { nama_peminjam, judul_buku, tanggal_pengembalian, status });

        // Isi tanggal pengajuan dengan tanggal saat ini
        const tanggal_pengajuan = new Date();

        // Variabel untuk tanggal pinjaman (null jika status belum Approved)
        const tanggal_pinjaman = status === "Approved" ? new Date() : null;

        let fileName = null;

        // Validasi file jika ada
        if (req.files && req.files.file) {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const filePath = `./public/images/pinjaman/${fileName}`;
            const allowedType = [".png", ".jpg", ".jpeg"];

            // Log validasi file
            console.log("Memvalidasi file...");

            if (!allowedType.includes(ext.toLowerCase())) {
                console.log("Invalid file type:", ext);
                return res.status(422).json({ msg: "Invalid Images" });
            }
            if (fileSize > 5000000) {
                console.log("File size too large:", fileSize);
                return res.status(422).json({ msg: "Image must be less than 5 MB" });
            }

            try {
                // Simpan file
                file.mv(filePath);
                console.log("File uploaded successfully:", filePath);
            } catch (err) {
                console.error("File upload error:", err);
                return res.status(500).json({ msg: err.message });
            }
        }

        // Simpan data ke database
        console.log("Menyimpan data ke database...");
        await Pinjaman.create({
            nama_peminjam,
            judul_buku,
            jumlah: 1, // Default jumlah
            tanggal_pengajuan,
            tanggal_pinjaman,
            tanggal_pengembalian,
            status: status || "Pending",
            gambar: fileName,
        });

        console.log("Pinjaman berhasil disimpan ke database");
        res.status(201).json({ msg: "Pinjaman berhasil dibuat" });
    } catch (error) {
        console.error("Database error:", error.message);
        res.status(500).json({ msg: "Database error" });
    }
};


// Ambil data pinjaman berdasarkan ID
export const getPinjamanById = async (req, res) => {
    try {
        const response = await Pinjaman.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (!response) return res.status(404).json({ msg: "Pinjaman tidak ditemukan" });
        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Gagal memuat data pinjaman." });
    }
};


export const returnPinjaman = async (req, res) => {
    const { id } = req.params;
    let fileName = null;

    if (req.files && req.files.file) {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const filePath = `./public/images/pinjaman/${fileName}`;
        const allowedType = [".png", ".jpg", ".jpeg"];

        if (!allowedType.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Invalid Images" });
        }
        if (fileSize > 5000000) {
            return res.status(422).json({ msg: "Image must be less than 5 MB" });
        }

        try {
            file.mv(filePath);
        } catch (err) {
            return res.status(500).json({ msg: "Failed to upload file" });
        }
    }

    try {
        await Pinjaman.update(
            { status: "Returned", gambar: fileName },
            { where: { id } }
        );
        res.status(200).json({ msg: "Buku berhasil dikembalikan" });
    } catch (error) {
        res.status(500).json({ msg: "Gagal mengembalikan buku" });
    }
};


// Menyetujui pinjaman
export const approvePinjaman = async (req, res) => {
    try {
        const pinjaman = await Pinjaman.findOne({ where: { id: req.params.id } });
        if (!pinjaman) {
            return res.status(404).json({ msg: "Pinjaman tidak ditemukan" });
        }

        // Isi tanggal pinjaman dengan tanggal saat ini
        const tanggal_pinjaman = new Date();

        // Perbarui status dan tanggal pinjaman
        await Pinjaman.update(
            { status: "Approved", tanggal_pinjaman },
            { where: { id: req.params.id } }
        );

        res.status(200).json({ msg: "Pinjaman berhasil disetujui" });
    } catch (error) {
        console.error("Error saat menyetujui pinjaman:", error.message);
        res.status(500).json({ msg: "Gagal menyetujui pinjaman." });
    }
};


// Menolak pinjaman
export const rejectPinjaman = async (req, res) => {
    try {
        const pinjaman = await Pinjaman.findOne({ where: { id: req.params.id } });
        if (!pinjaman) return res.status(404).json({ msg: "Pinjaman tidak ditemukan" });

        await Pinjaman.update({ status: "Rejected" }, { where: { id: req.params.id } });
        res.status(200).json({ msg: "Pinjaman berhasil ditolak" });
    } catch (error) {
        console.error("Error saat menolak pinjaman:", error);
        res.status(500).json({ msg: "Gagal menolak pinjaman." });
    }
};
