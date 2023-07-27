const express = require("express");
const path = require("path");
const app = express();
const handlebars = require("express-handlebars");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 3000;
// Create router
const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "./public/img")));
console.log(__dirname);

//Template engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Route init
route(app);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
