const House = require("../models/House");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose");

class houseController {
    // POST localhost:[port]/api/house/user/register
    async register(req, res, next) {
        const accessToken = req.cookies.accessToken;
        await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
        });
        const formData = req.body;
        formData.user_id = req.user.id;
        formData.image =
            "https://akisa.vn/uploads/plugin/product_items/13553/thiet-ke-nha-dep-2-tang-tan-co-dien-bt22371-v1.jpg";
        console.log(formData);
        await User.findOne({ _id: req.user.id })
            .then((user) => {
                if (!user) {
                    return res.status(401).send("Invalid userName or password");
                }
                const house = new House(formData);
                house.save();
            })
            .then(() => {
                // res.send("Create house successfully");
                res.redirect(`/api/house/${formData.user_id}`);
            })
            .catch((err) => {
                console.error("Error saving house:", err);
                res.status(500).send("New creation failed");
            });
    }
    // POST localhost:[port]/api/house/:slug
    async view(req, res, next) {
        // const formData = req.body;
        House.find({ user_id: req.params.id })
            .then((house) => {
                if (!house) {
                    return res.status(401).send("You don't have a home");
                }
                res.status(200).json(house);
                // res.send(req.params.slug);
                // res.render("house/house", {
                //     house: mutipleMongooseToObject(house),
                // });
                // res.send(house.map((mongoose) => mongoose.toObject()));
            })
            .catch(next);
    }

    async delete(req, res, next) {
        try {
            const house = await House.findOne({ _id: req.params.id });
            if (!house) {
                return res.status(401).json("The house with the above id does not exist");
            }
            await House.findByIdAndDelete(req.params.id);
            res.redirect("back");
        } catch (err) {
            return res.status(500).json(error);
        }
    }

    async edit(req, res, next) {
        House.updateOne({ _id: req.params.id }, req.body)
            .then(async () => {
                const accessToken = req.cookies.accessToken;
                await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                    if (err) {
                        return res.status(403).json("Token is not valid");
                    }
                    req.user = user;
                });
                res.status(200).redirect(`/api/house/${req.user.id}`);
            })
            .catch(next);
    }

    formRegister(req, res) {
        res.render("house/register");
    }

    formHouseEdit(req, res, next) {
        House.findById(req.params.id)
            .then((house) => {
                res.render("house/edit_house", {
                    house: mongooseToObject(house),
                });
            })
            .catch(next);
    }
}

module.exports = new houseController();
