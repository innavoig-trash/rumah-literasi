import express from "express";
import {
    getDonasiBuku,
    getDonasiBukuById,
    saveDonasiBuku,
    deleteDonasiBuku
} from "../controllers/DonasiBuku.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/donasi-buku-index", verifyUser, getDonasiBuku); // Mengambil semua donasi buku
router.get("/donasi-buku/:id", verifyUser, getDonasiBukuById); // Mengambil donasi buku berdasarkan ID
router.post("/donasi-buku", verifyUser, saveDonasiBuku); // Menyimpan donasi buku baru
router.delete("/donasi-buku/:id", verifyUser, deleteDonasiBuku); // Menghapus donasi buku berdasarkan ID

export default router;
