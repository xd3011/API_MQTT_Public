const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Create router
const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Route init
route(app);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
