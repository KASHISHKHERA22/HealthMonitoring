const hardModel = require('../models/hardModel')
const fs = require('fs');

// Read the JSON file containing the serialized model
const modelJson = fs.readFileSync('./savedModels/model_h.json', 'utf8');

// Parse the JSON to reconstruct the model
const model = JSON.parse(modelJson);

function dotProduct(vec1, vec2) {
    return vec1.reduce((acc, curr, i) => acc + curr * vec2[i], 0);
}

// Predict function
function predict(inputVector, model) {
    const score = dotProduct(inputVector, model.coefficients) + model.intercept;
    return score >= 0 ? 1 : 0;
}


async function storeData(req, res) {
    try {
        let data = req.body;
        const l1 = Object.values(data);

        // Initialize l3 with zeros
        const l3 = new Array(134).fill(0);

        // Set 1 for elements present in l1
        l1.forEach((element) => {
            const index = l1.indexOf(element);
            if (index !== -1) {
                l3[index] = 1;
            }
        });
        const te = predict(l3, model);
        console.log(te);

        let storedData = await hardModel.create(data);
        if (storedData) {
            return res.json({
                message: "data added",
                data: storedData,
                predicted: te
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