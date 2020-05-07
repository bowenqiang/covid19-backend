module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            "Date": String,
            "Increase rate": String,
            "Confirmed": String,
            "Recovered": String,
            "Deaths": String,
        }
    );

    schema.statics.lastUpdate = function() {
        return this.find({}).sort('-Date').limit(1);
    }

    const Global = mongoose.model("global", schema);
    return Global;
};