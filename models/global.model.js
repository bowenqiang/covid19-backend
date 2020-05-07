module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            "Date": String,
            "Increase rate": String,
            "Confirmed": String,
            "Recovered": String,
            "Deaths": String,
        }
    );

    const Global = mongoose.model("global", schema);
    return Global;
};