module.exports = app => {
    const daiylDetail = require("../controllers/dailyDetail.controller");
    var router = require("express").Router();
    router.get("/country/", daiylDetail.findHistoryData);
    app.use("/api/dailyDetail", router);
}