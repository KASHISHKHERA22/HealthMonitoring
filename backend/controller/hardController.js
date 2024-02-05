const hardModel = require('../models/hardModel')


async function storeData(req, res) {
    try {
        let data = req.body;
        let storedData = await hardModel.create(data);
        if (storedData) {
            return res.json({
                message: "data added",
                data: storedData
            });
        }
        else {
            return res.json({
                message: "error while storing"
            })
        }
    } catch (error) {
        res.json({
            message: err.message
        });
    }
}

module.exports = storeData