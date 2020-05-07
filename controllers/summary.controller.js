const db = require("../models/index");
const { removeObjUndefinedProps } = require('../utils/utils');
const DailyDetail = db.dailyDetail;
const Global = db.global;
const _ = require("lodash");

exports.getSummary = (req, res) => {
    const country = req.query.country;
    const query = {
        "Country": country,
    };
    if (_.isEmpty(query)) {
        res.status(400).send({ message: `Bad Request, Please check parameters`});
        return;
    }

    if (query.Country === 'Global') {
        Global.find({})
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Can't Find Record for Country ${country}`});
            }
            else {
                const dataSorted = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
                res.send(dataSorted[0]);
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error retrieving Record for Country ${country}`});
        })

    } else {
        DailyDetail.find(query)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Can't Find Record for Country ${country}`});
            }
            else {
                const dataSorted = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
                res.send(dataSorted[0]);
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error retrieving Record for Country ${country}`});
        })
    }
};

// exports.template = (req, res) => {
//     DailyDetail.find()
//     .then(data => {
//       if (!data) {
//           res.status(404).send({ message: ``});
//       }
//       else {
//           res.send(data);
//       }
//     })
//     .catch(err => {
  
//     })
// };