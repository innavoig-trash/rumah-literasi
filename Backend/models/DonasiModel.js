import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Donasi = db.define('donasi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nama_user: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    jenis_donasi: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    judul_buku: {
        type: DataTypes.STRING(255),
        allowNull: true, // Karena dapat bernilai NULL
        defaultValue: null
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    gambar: {
        type: DataTypes.STRING(255),
        allowNull: false, 
        defaultValue: null
    }
}, {
    freezeTableName: true, // Nama tabel tidak diubah menjadi bentuk jamak
    timestamps: false // Nonaktifkan timestamps (createdAt dan updatedAt)
});

export default Donasi;
