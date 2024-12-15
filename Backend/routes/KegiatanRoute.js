import express from "express";
import {
    getKegiatan,
    getKegiatanById,
    createKegiatan,
    updateKegiatan,
    deleteKegiatan
} from "../controllers/Kegiatan.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Rute untuk Kegiatan
router.get('/kegiatan', verifyUser, getKegiatan);
router.get('/kegiatan/:id', verifyUser, getKegiatanById);
router.post('/kegiatan', verifyUser, createKegiatan);
router.patch('/kegiatan/:id', verifyUser, updateKegiatan);
router.delete('/kegiatan/:id', verifyUser, deleteKegiatan);

export default router;
