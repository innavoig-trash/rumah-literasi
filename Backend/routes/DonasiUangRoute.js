import express from "express";
import {
    getDonasiUang,
    getDonasiUangById,
    saveDonasiUang,
    deleteDonasiUang
} from "../controllers/DonasiUang.js";
import { verifyUser, superadminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/donasi-uang", verifyUser, getDonasiUang);
router.get("/donasi-uang/:id", verifyUser, getDonasiUangById);
router.post("/donasi-uang", verifyUser, saveDonasiUang);
router.delete("/donasi-uang/:id", verifyUser, superadminOnly, deleteDonasiUang);

export default router;
