const fieldRouter = require("./field");
const authRouter = require("./auth");
const houseRouter = require("./house");
const userRouter = require("./user");
const roomRouter = require("./room");
const deviceRouter = require("./device");
const subDeviceRouter = require("./subDevice");
// const siteRouter = require("./site");

function route(app) {
    // Create routes
    // Test use api field is number random
    app.use("/api/field", fieldRouter);

    // Create routes for auth
    app.use("/api/auth", authRouter);

    // Create routes for house user
    app.use("/api/house", houseRouter);

    app.use("/api/room", roomRouter);

    app.use("/api/device", deviceRouter);

    app.use("/api/sub_device", subDeviceRouter);

    // Get all user
    app.use("/api/user", userRouter);
}

module.exports = route;
