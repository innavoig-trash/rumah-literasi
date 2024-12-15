import express from "express";
import {
    getPinjaman,
    getPinjamanById,
    approvePinjaman,
    savePinjaman,
    rejectPinjaman,
    returnPinjaman,
} from "../controllers/Pinjaman.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Route untuk Pinjaman
router.get("/pinjaman", verifyUser, getPinjaman); // Mengambil semua pinjaman
router.get("/pinjaman/:id", verifyUser, getPinjamanById); // Mengambil pinjaman berdasarkan ID
router.post("/pinjaman/", verifyUser, savePinjaman); // Mengambil pinjaman berdasarkan ID
router.patch("/pinjaman/approve/:id", verifyUser, approvePinjaman); // Menyetujui pinjaman
router.patch("/pinjaman/reject/:id", verifyUser, rejectPinjaman); // Menolak pinjaman
router.patch("/pinjaman/return/:id", verifyUser, returnPinjaman);


export default router;
