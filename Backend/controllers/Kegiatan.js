import Kegiatan from "../models/KegiatanModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getKegiatan = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Kegiatan.findAll({
                attributes: ['uuid', 'nama_kegiatan', 'deskripsi', 'waktu'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Kegiatan.findAll({
                attributes: ['uuid', 'nama_kegiatan', 'deskripsi', 'waktu'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getKegiatanById = async (req, res) => {
    try {
        const kegiatan = await Kegiatan.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!kegiatan) return res.status(404).json({ msg: "Data tidak ditemukan" });

        let response;
        if (req.role === "admin") {
            response = await Kegiatan.findOne({
                attributes: ['uuid', 'nama_kegiatan', 'deskripsi', 'waktu'],
                where: {
                    id: kegiatan.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Kegiatan.findOne({
                attributes: ['uuid', 'nama_kegiatan', 'deskripsi', 'waktu'],
                where: {
                    [Op.and]: [{ id: kegiatan.id }, { userId: req.userId }]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createKegiatan = async (req, res) => {
    const { nama_kegiatan, deskripsi, waktu } = req.body;
    try {
        await Kegiatan.create({
            nama_kegiatan,
            deskripsi,
            waktu,
            userId: req.userId
        });
        res.status(201).json({ msg: "Kegiatan berhasil dibuat" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateKegiatan = async (req, res) => {
    try {
        const kegiatan = await Kegiatan.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!kegiatan) return res.status(404).json({ msg: "Data tidak ditemukan" });

        const { nama_kegiatan, deskripsi, waktu } = req.body;
        if (req.role === "admin") {
            await Kegiatan.update({ nama_kegiatan, deskripsi, waktu }, {
                where: {
                    id: kegiatan.id
                }
            });
        } else {
            if (req.userId !== kegiatan.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await Kegiatan.update({ nama_kegiatan, deskripsi, waktu }, {
                where: {
                    [Op.and]: [{ id: kegiatan.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Kegiatan berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteKegiatan = async (req, res) => {
    try {
        const kegiatan = await Kegiatan.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!kegiatan) return res.status(404).json({ msg: "Data tidak ditemukan" });

        if (req.role === "admin") {
            await Kegiatan.destroy({
                where: {
                    id: kegiatan.id
                }
            });
        } else {
            if (req.userId !== kegiatan.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await Kegiatan.destroy({
                where: {
                    [Op.and]: [{ id: kegiatan.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Kegiatan berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
