const db = require("../models/index");
const { removeObjUndefinedProps } = require('../utils/utils');
const DailyDetail = db.dailyDetail;
const Global = db.global;
const _ = require("lodash");

exports.findHistoryData = (req, res) => {
    const country = req.query.country;
    const uid = req.query.uid;
    const date = req.query.date;
    const query = {
        "Country": country,
        "UID": uid,
        "Date": date,
    };
    removeObjUndefinedProps(query);
    if (_.isEmpty(query)) {
        res.status(400).send({ message: `Bad Request, Please check parameters`});
        return;
    }
    if (query.Country === "Global") {
        delete query["Country"];
        Global.createCollection();
        Global.find(query)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Can't Find Record for Country ${country}`});
            }
            else {
                const dataSorted = data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
                res.send(dataSorted);
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error retrieving Record for Country ${country}`});
        })
        return;
    }
    
    DailyDetail.find(query)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: `Can't Find Record for Country ${country}`});
        }
        else {
            const dataSorted = data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
            res.send(dataSorted);
        }
    })
    .catch(err => {
        res.status(500).send({ message: `Error retrieving Record for Country ${country}`});
    })
};

exports.test = (req, res) => {
    DailyDetail.find()
    .then(data => {
      if (!data) {
          res.status(404).send({ message: ``});
      }
      else {
          res.send(data);
      }
    })
    .catch(err => {
  
    })
};