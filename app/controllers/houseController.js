const House = require("../models/House");
const User = require("../models/User");

class houseController {
    // POST localhost:[port]/api/user/register
    async register(req, res, next) {
        const formData = req.body;
        User.findOne({ user_name: formData.user_name })
            .then((user) => {
                if (!user) {
                    return res.status(401).send("Invalid userName or password");
                }
                const house = new House(formData);
                house.save();
            })
            .then(() => res.send("Create house successfully"))
            .catch((err) => {
                console.error("Error saving house:", err);
                res.status(500).send("New creation failed");
            });
    }
    // POST localhost:[port]/api/user/view/:slug
    async view(req, res, next) {
        // const formData = req.body;
        House.find({ user_name: req.params.slug })
            .then((house) => {
                if (!house) {
                    return res.status(401).send("You don't have a home");
                }
                // res.send(req.params.slug);
                res.render("home");
                // res.send(house.map((mongoose) => mongoose.toObject()));
            })
            .catch(next);
    }
    formRegister(req, res) {
        res.render("house/register");
    }
}

module.exports = new houseController();
