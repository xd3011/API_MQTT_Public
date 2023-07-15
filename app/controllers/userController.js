const User = require("../models/User");

class userController {
    // POST localhost:[port]/api/user/register
    async register(req, res, next) {
        const formData = req.body;
        const user = new User(formData);
        user.save()
            .then(() => res.send("Create user successfully"))
            .catch((err) => {
                console.error("Error saving user:", err);
                res.status(500).send("New creation failed");
            });
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
                // req.user = user;
                next();
            })
            .catch((err) => {
                console.error("Error logging in user:", err);
                res.status(500).send("Login failed");
            });
    }
    get(req, res) {
        res.send("Test Success");
    }
}

module.exports = new userController();
