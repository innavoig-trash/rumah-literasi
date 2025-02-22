import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Donasi_Buku = db.define('donasi_buku', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    judul_buku: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kategori_buku: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    jumlah_buku: {
        type: DataTypes.STRING(3),
        allowNull: true, // Karena dapat bernilai NULL
        defaultValue: null
    },
    alamat_pengiriman: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true, // Nama tabel tidak diubah menjadi bentuk jamak
    timestamps: false // Nonaktifkan timestamps (createdAt dan updatedAt)
});

export default Donasi_Buku;
