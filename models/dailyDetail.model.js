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

    schema.statics.lastUpdate = function() {
        return this.find({}).sort('-Date').limit(1);
    }

    const DailyDetail = mongoose.model("dailyDetail", schema);
    return DailyDetail;
};