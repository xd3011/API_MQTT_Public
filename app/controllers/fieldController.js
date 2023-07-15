const Number_Random = require("../models/Number_Random");

class fieldController {
    // Get localhost:[port]/api/field
    async index(req, res, next) {
        res.setHeader("Content-Type", "application/json");
        const formData = req.body;
        const number_random = new Number_Random(formData);
        number_random
            .save()
            .then(() => res.send("Test Success"))
            .catch((err) => {
                console.error("Error saving course:", err);
                res.status(500).send("An error occurred while saving the course.");
            });
    }
    get(req, res, next) {
        Number_Random.find({})
            .then((Number) => {
                res.send(Number.map((mongoose) => mongoose.toObject()));
            })
            .catch(next);
    }
}

module.exports = new fieldController();
