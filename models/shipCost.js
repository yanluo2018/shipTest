var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var shipCost = new Schema ({
    region: String,
    cost: Number,
});
module.exports = mongoose.model('shipCost', shipCost);