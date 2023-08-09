const SubDevice = require("../models/SubDevice");
const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose");

class subDeviceController {
    // POST localhost:[port]/api/sub_device/register
    async register(req, res) {
        const device_id = req.cookies.device_id;
        const formData = req.body;
        formData.device_id = device_id;
        formData.sub_device_state = "OFF";
        console.log(formData);
        try {
            const sub_device = new SubDevice(formData);
            await sub_device.save();
            res.redirect(`/api/sub_device/${formData.device_id}`);
        } catch (err) {
            console.error("Error saving sub_device:", err);
            res.status(500).send("New creation failed");
        }
    }

    // GET localhost:[port]/api/sub_device/:slug
    async view(req, res, next) {
        SubDevice.find({ device_id: req.params.slug })
            .then((sub_device) => {
                if (!sub_device) {
                    return res.status(401).send("Your sub_device doesn't have a device");
                }
                res.render("sub_device/sub_device", {
                    sub_device: mutipleMongooseToObject(sub_device),
                });
            })
            .then(() => {
                res.cookie("device_id", req.params.slug, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "strict",
                    secure: false,
                });
            })
            .catch(next);
    }

    // POST localhost:[port]/api/sub_device/_id/changeState
    async changeState(req, res) {
        const sub_device_id = req.params.id;
        const device_id = req.cookies.device_id;
        try {
            const subDevice = await SubDevice.findById(sub_device_id);
            if (!subDevice) {
                return res.status(404).send("Sub Device not found");
            }
            if (subDevice.sub_device_state == "ON") {
                subDevice.sub_device_state = "OFF";
            } else if (subDevice.sub_device_state == "OFF") {
                subDevice.sub_device_state = "ON";
            }
            await subDevice.save();
            return res.redirect(`/api/sub_device/${device_id}`);
        } catch (err) {
            console.error("Error changing sub_device state:", err);
            return res.status(500).send("State change failed");
        }
    }

    // GET localhost:[port]/api/sub_device/_id/getState
    async getState(req, res) {
        const sub_device_id = req.params.id;
        try {
            const subDevice = await SubDevice.findById(sub_device_id);
            if (!subDevice) {
                return res.status(404).send("Sub Device not found");
            }
            console.log(subDevice.sub_device_state);
            return res.status(200).send(subDevice.sub_device_state);
        } catch (err) {
            console.error("Error get sub_device state:", err);
            return res.status(500).send("State cannot get");
        }
    }
    // async delete(req, res, next) {
    //     try {
    //         const sub_device = await SubDevice.findOne({ _id: req.params.id });
    //         if (!sub_device) {
    //             return res.status(401).json("The device with the above id does not exist");
    //         }
    //         await SubDevice.findByIdAndDelete(req.params.id);
    //         res.redirect("back");
    //     } catch (err) {
    //         return res.status(500).json(error);
    //     }
    // }

    // formSubDeviceEdit(req, res, next) {
    //     SubDevice.findById(req.params.id)
    //         .then((sub_device) => {
    //             res.render("sub_device/edit_sub_device", {
    //                 sub_device: mongooseToObject(sub_device),
    //             });
    //         })
    //         .catch(next);
    // }

    // async edit(req, res, next) {
    //     SubDevice.updateOne({ _id: req.params.id }, req.body)
    //         .then(async () => {
    //             res.status(200).redirect(`/api/sub_device/${req.cookies.device_id}`);
    //         })
    //         .catch(next);
    // }

    formSubDeviceRegister(req, res) {
        res.render("sub_device/register");
    }
}

module.exports = new subDeviceController();
