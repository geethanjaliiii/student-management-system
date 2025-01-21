"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./config/db");
const app = new app_1.App();
const database = new db_1.ConnectMongo();
database.connectDB();
app.getApp().listen(process.env.PORT, () => console.log(`Server is running on http://127.0.0.1:${process.env.PORT}`));
