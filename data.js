/*globals require, module */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema({
	name: String,
	val2: String
});

module.exports = mongoose.model('Data', DataSchema);
