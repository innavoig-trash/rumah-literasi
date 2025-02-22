import Donasi_Uang from "../models/DonasiUangModel.js";
import path from "path";
import fs from "fs";

export const getDonasiUang = async (req, res) => {
    try {
        const response = await Donasi_Uang.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Database error" });
    }
};

export const getDonasiUangById = async (req, res) => {
    try {
        const response = await Donasi_Uang.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (!response) return res.status(404).json({ msg: "Donasi tidak ditemukan" });
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Database error" });
    }
};

export const saveDonasiUang = (req, res) => {
    if (!req.files || !req.files.bukti_transfer) {
        return res.status(400).json({ msg: "No File Uploaded" });
    }

    const { nomer_rekening } = req.body;
    const file = req.files.bukti_transfer; // Menggunakan nama yang sesuai dengan frontend
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filePath = `./public/images/donasi/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Images" });
    }
    if (fileSize > 5000000) {
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    file.mv(filePath, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });

        try {
            await Donasi_Uang.create({
                nomer_rekening,
                bukti_transfer: fileName,
            });
            res.status(201).json({ msg: "Donasi berhasil dibuat" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Database error" });
        }
    });
};

export const deleteDonasiUang = async (req, res) => {
    const donasi = await Donasi_Uang.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!donasi) return res.status(404).json({ msg: "Donasi tidak ditemukan" });

    try {
        const filePath = `./public/images/donasi/${donasi.bukti_transfer}`;
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        await Donasi_Uang.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({ msg: "Donasi berhasil dihapus" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Database error" });
    }
};
