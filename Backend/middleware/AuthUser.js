import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    console.log("Verifying user...");
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId,
        },
    });
    if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Menyisipkan informasi user ke dalam req
    req.userId = user.id;
    req.name = user.name; // Tambahkan nama user
    req.role = user.role;
    next();
};

export const superadminOnly = async (req, res, next) => {
    console.log("Checking superadmin role...");
    const user = await User.findOne({
        where: {
            uuid: req.session.userId,
        },
    });
    if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    if (user.role !== "superadmin") {
        return res.status(403).json({ msg: "Akses terlarang" });
    }
    next();
};
