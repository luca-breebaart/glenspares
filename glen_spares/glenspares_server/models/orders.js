const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    CarMake: {
        type: String,
        required: true
    },
    CarModel: {
        type: String,
        required: true
    },
    ChasisNumber: {
        type: Number,
        required: true
    },
    Year: {
        type: Number,
        required: true
    },
    PartID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Order", OrderSchema);
