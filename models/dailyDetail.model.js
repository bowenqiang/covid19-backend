module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            "Date": String,
            "Country": String,
            "Confirmed": String,
            "Recovered": String,
            "Deaths": String,
        }
    );

    const DailyDetail = mongoose.model("dailyDetail", schema);
    return DailyDetail;
};