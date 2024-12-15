import { Sequelize } from "sequelize";
import argon2 from "argon2";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Users = db.define("users", {
    uuid: { type: DataTypes.STRING, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
});

(async () => {
    const hashPassword = await argon2.hash("11111111");
    await Users.create({
        name: "Admin User",
        email: "admin@gmail.com",
        password: hashPassword,
        role: "admin",
    });
    console.log("Admin user created");
    process.exit();
})();
