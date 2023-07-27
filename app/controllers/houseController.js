const House = require("../models/House");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class houseController {
    // POST localhost:[port]/api/user/register
    async register(req, res, next) {
        const accessToken = req.cookies.accessToken;
        await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
        });
        const formData = req.body;
        formData.user_name = req.user.user_name;
        formData.image =
            "https://akisa.vn/uploads/plugin/product_items/13553/thiet-ke-nha-dep-2-tang-tan-co-dien-bt22371-v1.jpg";
        console.log(formData);
        await User.findOne({ user_name: req.user.user_name })
            .then((user) => {
                if (!user) {
                    return res.status(401).send("Invalid userName or password");
                }
                const house = new House(formData);
                house.save();
            })
            .then(() => {
                // res.send("Create house successfully");
                res.redirect(`/api/house/view/${formData.user_name}`);
            })
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
                res.render("house/house", {
                    house: mutipleMongooseToObject(house),
                });
                // res.send(house.map((mongoose) => mongoose.toObject()));
            })
            .catch(next);
    }
    formRegister(req, res) {
        res.render("house/register");
    }
}

module.exports = new houseController();
