import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Pinjaman = db.define("pinjaman", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nama_peminjam: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    judul_buku: {
        type: DataTypes.STRING(255),
        allowNull: false,  
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tanggal_pengajuan: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tanggal_pinjaman: {
        type: DataTypes.DATE,
        allowNull: true,  
    },
    tanggal_pengembalian: {
        type: DataTypes.DATE,
        allowNull: false,   
    },
    status: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected", "Returned"),
        allowNull: false,
        defaultValue: "Pending", // Status default
    },
    gambar: {
        type: DataTypes.STRING(255),
        allowNull: true,  
    },
}, {
    freezeTableName: true, // Nama tabel tidak diubah ke bentuk jamak
    timestamps: false, // Nonaktifkan createdAt dan updatedAt
});

export default Pinjaman;
