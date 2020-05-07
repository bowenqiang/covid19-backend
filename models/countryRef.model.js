module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            "UID": String,
            "iso2": String,
            "iso3": String,
            "code3": String,
            "FIPS": String,
            "Admin2": String,
            "Province_State": String,
            "Country_Region": String,
            "Lat": String,
            "Long_": String,
            "Combined_Key": String,
            "Population": String,
        }
    );
    // schema.method("toJSON", () => {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // })

    const CountryRef = mongoose.model("countryRef", schema);
    return CountryRef;
}