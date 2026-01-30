"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config/config");
app_1.default.listen(config_1.default.port, () => {
    console.log(`Server started on ${config_1.default.port}`);
});
//# sourceMappingURL=server.js.map