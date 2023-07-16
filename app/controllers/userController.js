const User = require("../models/User");

class userController {
    // POST localhost:[port]/api/user/register
    async register(req, res, next) {
        const formData = req.body;
        const user = new User(formData);
        try {
            const existingUser = await User.findOne({ user_name: formData.user_name });
            if (existingUser) {
                // Handle the case where a user with the same user_name already exists
                // You can choose to redirect, send an error response, or handle it in any other way
                res.send("New creation failed");
            } else {
                await user.save();
                res.redirect(`/api/house/view/${user.user_name}`);
            }
            next();
        } catch (err) {
            console.error("Error saving user:", err);
            res.status(500).send("New creation failed");
        }
    }
    // POST localhost:[port]/api/user/login
    async login(req, res, next) {
        const formData = req.body;
        User.findOne({ user_name: formData.user_name })
            .then((user) => {
                if (!user) {
                    return res.status(401).send("Invalid userName or password");
                }
                if (user.password !== formData.password) {
                    return res.status(401).send("Invalid userName or password");
                }
                res.redirect(`/api/house/view/${user.user_name}`);
                next();
            })
            .catch((err) => {
                console.error("Error logging in user:", err);
                res.status(500).send("Login failed");
            });
    }
    // GET localhost:[port]/api/user/login
    formLogin(req, res) {
        res.render("user/login");
    }
    formRegister(req, res) {
        res.render("user/register");
    }
}

module.exports = new userController();
