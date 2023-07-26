const fieldRouter = require("./field");
const authRouter = require("./auth");
const houseRouter = require("./house");
const userRouter = require("./user");
// const siteRouter = require("./site");

function route(app) {
    // Create routes
    // Test use api field is number random
    app.use("/api/field", fieldRouter);

    // Create routes for auth
    app.use("/api/auth", authRouter);

    // Create routes for house user
    app.use("/api/house", houseRouter);
    // app.use("/api", coursesRouter);

    // Get all user
    app.use("/api/user", userRouter);
}

module.exports = route;
