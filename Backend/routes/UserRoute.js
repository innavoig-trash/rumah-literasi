import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/Users.js";
import { verifyUser, superadminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// Route baru untuk mendapatkan data user login
router.get('/user', verifyUser, (req, res) => {
    res.json({
        id: req.userId, // ID user
        name: req.name, // Nama user
        role: req.role, // Role user
    });
});

// Route untuk manajemen user (Superadmin Only)
router.get('/users', verifyUser, superadminOnly, getUsers);
router.get('/users/:id', verifyUser, superadminOnly, getUserById);
router.post('/users', verifyUser, superadminOnly, createUser);
router.patch('/users/:id', verifyUser, superadminOnly, updateUser);
router.delete('/users/:id', verifyUser, superadminOnly, deleteUser);

export default router;
