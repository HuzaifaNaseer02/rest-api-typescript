"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = require("./routes/userRoutes");
const express = require("express");
const app = express();
app.use(express.json());
app.use("/api/users", userRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map