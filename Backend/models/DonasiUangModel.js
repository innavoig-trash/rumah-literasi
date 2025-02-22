import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Donasi_Uang = db.define('donasi_uang', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nomer_rekening: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    bukti_transfer: {
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

export default Donasi_Uang;
