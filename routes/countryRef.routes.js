module.exports = app => {
    const countryRef = require("../controllers/countryRef.controller");
    var router = require("express").Router();
    router.get("/", countryRef.listAllCountrySimpleRef);
    router.get("/detail/", countryRef.findOneCountryRef);
    app.use("/api/countryRef", router);
}