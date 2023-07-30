const Room = require("../models/Room");
const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose");

class roomController {
    // POST localhost:[port]/api/house/view/user/home/register
    async register(req, res, next) {
        const house_id = req.cookies.house_id;
        const formData = req.body;
        formData.house_id = house_id;
        formData.image =
            "https://img.freepik.com/free-photo/green-sofa-white-living-room-with-free-space_43614-834.jpg?w=1380&t=st=1690529518~exp=1690530118~hmac=364ecefe21842e5c71d4e45531a5a2b61dc860360b77fc6df189ff8236f1593c";
        console.log(formData);
        try {
            const room = new Room(formData);
            room.save();
            res.redirect(`/api/room/${formData.house_id}`);
        } catch (err) {
            console.error("Error saving room:", err);
            res.status(500).send("New creation failed");
        }
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

    async delete(req, res, next) {
        try {
            const room = await Room.findOne({ _id: req.params.id });
            if (!room) {
                return res.status(401).json("The room with the above id does not exist");
            }
            await Room.findByIdAndDelete(req.params.id);
            res.redirect("back");
        } catch (err) {
            return res.status(500).json(error);
        }
    }

    formRoomEdit(req, res, next) {
        Room.findById(req.params.id)
            .then((room) => {
                res.render("room/edit_room", {
                    room: mongooseToObject(room),
                });
            })
            .catch(next);
    }

    async edit(req, res, next) {
        Room.updateOne({ _id: req.params.id }, req.body)
            .then(async () => {
                res.status(200).redirect(`/api/room/${req.cookies.house_id}`);
            })
            .catch(next);
    }

    formRoomRegister(req, res) {
        res.render("room/register");
    }
}

module.exports = new roomController();
