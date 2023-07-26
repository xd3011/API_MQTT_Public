const User = require("../models/User");

class userController {
    // Get all user
    async getAllUser(req, res) {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Delete user
    async deleteUser(req, res) {
        try {
            // const user = await User.findByIdAndDelete(req.params.id);
            const user = await User.findById(req.params.id);
            res.status(200).json("Delete Successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = new userController();
