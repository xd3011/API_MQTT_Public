const Device = require("../models/Device");
const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose");

class deviceController {
    // POST localhost:[port]/api/device/register
    async register(req, res, next) {
        const room_id = req.cookies.room_id;
        const formData = req.body;
        formData.room_id = room_id;
        console.log(formData);
        try {
            const room = new Device(formData);
            room.save();
            res.redirect(`/api/device/${formData.room_id}`);
        } catch (err) {
            console.error("Error saving room:", err);
            res.status(500).send("New creation failed");
        }
    }

    // POST localhost:[port]/api/device/:slug
    async view(req, res, next) {
        Device.find({ room_id: req.params.slug })
            .then((device) => {
                if (!device) {
                    return res.status(401).send("Your room doesn't have a device");
                }
                res.render("device/device", {
                    device: mutipleMongooseToObject(device),
                });
            })
            .then(() => {
                res.cookie("room_id", req.params.slug, {
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
            const device = await Device.findOne({ _id: req.params.id });
            if (!device) {
                return res.status(401).json("The device with the above id does not exist");
            }
            await Device.findByIdAndDelete(req.params.id);
            res.redirect("back");
        } catch (err) {
            return res.status(500).json(error);
        }
    }

    formDeviceEdit(req, res, next) {
        Device.findById(req.params.id)
            .then((device) => {
                res.render("device/edit_device", {
                    device: mongooseToObject(device),
                });
            })
            .catch(next);
    }

    async edit(req, res, next) {
        Device.updateOne({ _id: req.params.id }, req.body)
            .then(async () => {
                res.status(200).redirect(`/api/device/${req.cookies.room_id}`);
            })
            .catch(next);
    }

    formDeviceRegister(req, res) {
        res.render("device/register");
    }
}

module.exports = new deviceController();
