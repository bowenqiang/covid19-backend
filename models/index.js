const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.countryRef = require("./countryRef.model")(mongoose);
db.dailyDetail = require("./dailyDetail.model")(mongoose);
db.global = require("./global.model")(mongoose);
module.exports = db;