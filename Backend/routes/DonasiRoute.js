import express from "express";
import {
    getDonasi,
    getDonasiById,
    saveDonasi,
    deleteDonasi,
    approveDonasi,
    rejectDonasi,
} from "../controllers/Donasi.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/donasi", verifyUser, getDonasi); // Mengambil semua donasi
router.get("/donasi/:id", verifyUser, getDonasiById); // Mengambil donasi berdasarkan ID
router.post("/donasi", verifyUser, saveDonasi); // Menyimpan donasi baru
router.delete("/donasi/:id", verifyUser, deleteDonasi); // Menghapus donasi berdasarkan ID
router.patch("/donasi/approve/:id", verifyUser, approveDonasi);
router.patch("/donasi/reject/:id", verifyUser, rejectDonasi);


export default router;
