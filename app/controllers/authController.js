const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let reFreshTokens = [];
const authController = {
    // POST localhost:[port]/api/user/register
    async register(req, res) {
        // const formData = req.body;
        // const user = new User(formData);
        try {
            const sait = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, sait);

            // Create new User
            const newUser = await new User({
                user_name: req.body.user_name,
                email: req.body.email,
                password: hashed,
            });

            // Save new User
            const user = await newUser.save();
            // res.status(200).send("Successfully");
            res.status(200).redirect(`/api/auth/login`);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Generate Access Token
    generateAccessToken(user) {
        const accessToken = jwt.sign(
            {
                id: user.id,
                user_name: user.user_name,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: "1d", // Flex 1 day => 30s
            }
        );
        return accessToken;
    },

    // Generate Refresh Token
    generateRefreshToken(user) {
        const refreshToken = jwt.sign(
            {
                id: user.id,
                user_name: user.user_name,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: "1d",
            }
        );
        return refreshToken;
    },

    // POST localhost:[port]/api/user/login
    async login(req, res) {
        try {
            const user = await User.findOne({ user_name: req.body.user_name });
            if (!user) {
                return res.status(404).json("Wrong username!");
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(404).json("Wrong password!");
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                reFreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "strict",
                    secure: false,
                });
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "strict",
                    secure: false,
                });
                // const { password, ...others } = user._doc;
                // Delete password return
                // res.status(200).json({ ...others, accessToken });
                res.status(200).redirect(`/api/house/view/${user.user_name}`);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Refresh Token
    async requestRefreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json("You're not authenticated");
        }
        if (!reFreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh Token is not valid");
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                return res.status(401).json(err);
            }
            reFreshTokens = reFreshTokens.filter((token) => token !== refreshToken);
            // Create new accessToken and refreshToken
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                path: "/",
                sameSite: "strict",
                secure: false,
            });
            reFreshTokens.push(newRefreshToken);
            res.status(200).json({ accessToken: newAccessToken });
        });
    },

    async logout(req, res) {
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        reFreshTokens = reFreshTokens.filter((token) => token !== req.cookies.refreshToken);
        res.status(200).json("Logged out");
    },

    // GET localhost:[port]/api/user/login
    formLogin(req, res) {
        res.render("auth/login");
    },
    formRegister(req, res) {
        res.render("auth/register");
    },
};

module.exports = authController;
