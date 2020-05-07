module.exports = app => {
    const summary = require("../controllers/summary.controller");
    var router = require("express").Router();
    router.get("/", summary.getSummary);
    app.use("/api/summary", router);
}