import {Sequelize} from "sequelize";

const db = new Sequelize('rumah_literasi', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;