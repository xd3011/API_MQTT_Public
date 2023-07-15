const fieldRouter = require("./field");
const userRouter = require("./user");
const houseRouter = require("./house");
// const siteRouter = require("./site");

function route(app) {
    // Create routes
    // Test use api field is number random
    app.use("/api/field", fieldRouter);

    // Create routes for user
    app.use("/api/user", userRouter);

    // Create routes for house user
    app.use("/api/house", houseRouter);
    // app.use("/api", coursesRouter);
}

module.exports = route;
