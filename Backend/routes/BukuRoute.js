import express from "express";
import {
    getBuku,
    getBukuById,
    saveBuku,
    savePinjaman,
    updateBuku,
    deleteBuku,
} from "../controllers/Buku.js";
import { verifyUser, superadminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/buku", verifyUser, getBuku);
router.post("/pinjaman/add/:id", verifyUser, savePinjaman);
router.get("/buku/:id", verifyUser, getBukuById);
router.post("/buku", verifyUser, superadminOnly, saveBuku);
router.put("/buku/:id", verifyUser, superadminOnly, updateBuku);
router.delete("/buku/:id", verifyUser, superadminOnly, deleteBuku);

export default router;
