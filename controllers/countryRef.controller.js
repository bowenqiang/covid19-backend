const db = require("../models/index");
const CountryRef = db.countryRef;

// Find a single Country Ref
exports.listAllCountrySimpleRef = (req, res) => {
    CountryRef.find({})
    .then(data => {
        if (!data) {
            res.status(404).send({ message: `Not found Country Ref`});
        }
        else {
            const dataTrimed = data.filter(item => !item.Province_State).map(item => {
                return {
                    "UID": item["UID"],
                    "iso3": item["iso3"],
                    "Country_Region": item["Country_Region"],
                }
            })
            res.send(dataTrimed);
        }
    })
    .catch(err => {
        res.status(500).send({ message: `Error retrieving Country Ref`});
    });

};

// Find a single Country Ref detail
exports.findOneCountryRef = (req, res) => {
    const type = req.query.type;
    const value = req.query.value;
    const query = {};
    query[type] = value;
    CountryRef.findOne(query)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: `Not found Country Ref with ${type} = ${value}`});
        }
        else {
            res.send(data);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({ message: `Error retrieving Country Ref with ${type} = ${value}`});
    });

};