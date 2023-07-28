const Room = require("../models/Room");
const House = require("../models/House");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class roomController {
    // POST localhost:[port]/api/house/view/user/home/register
    async register(req, res, next) {
        const accessToken = req.cookies.accessToken;
        await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
        });
        const house_id = req.cookies.house_id;
        const formData = req.body;
        formData.house_id = house_id;
        formData.image =
            "https://img.freepik.com/free-photo/green-sofa-white-living-room-with-free-space_43614-834.jpg?w=1380&t=st=1690529518~exp=1690530118~hmac=364ecefe21842e5c71d4e45531a5a2b61dc860360b77fc6df189ff8236f1593c";
        console.log(formData);
        await User.findOne({ user_name: req.user.user_name })
            .then((user) => {
                if (!user) {
                    return res.status(401).send("Invalid userName or password");
                }
                const room = new Room(formData);
                room.save();
            })
            .then(() => {
                res.redirect(`/api/room/${formData.house_id}`);
            })
            .catch((err) => {
                console.error("Error saving room:", err);
                res.status(500).send("New creation failed");
            });
    }
    // POST localhost:[port]/api/house/user/:slug
    async view(req, res, next) {
        Room.find({ house_id: req.params.slug })
            .then((room) => {
                if (!room) {
                    return res.status(401).send("You don't have a room");
                }
                res.render("room/room", {
                    room: mutipleMongooseToObject(room),
                });
            })
            .then(() => {
                res.cookie("house_id", req.params.slug, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "strict",
                    secure: false,
                });
            })
            .catch(next);
    }
    formRoomRegister(req, res) {
        res.render("room/register");
    }
}

module.exports = new roomController();
