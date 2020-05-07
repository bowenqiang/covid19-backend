const Config = require("../config/config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.NODE_ENV === 'production' ? Config.production.db.url : Config.dev.db.url;
db.countryRef = require("./countryRef.model")(mongoose);
db.dailyDetail = require("./dailyDetail.model")(mongoose);
db.global = require("./global.model")(mongoose);
module.exports = db;