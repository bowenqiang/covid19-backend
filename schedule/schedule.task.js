const schedule = require('node-schedule');
const { Dataset } = require('data.js');
const jStream = require('JSONStream');

const db = require("../models/index");
const DailyDetail = db.dailyDetail;
const Global = db.global;

const path = 'https://datahub.io/core/covid-19/datapackage.json';
const interestedFiles = ['worldwide-aggregated_json', 'countries-aggregated_json'];

const updateDatabase = () => {
    schedule.scheduleJob('0 0 7 * * *', () => {
        ; (async () => {
            const globalLastUpdateDate = new Date((await Global.lastUpdate())[0].Date);
            const dailyLastUpdateDate = new Date((await DailyDetail.lastUpdate())[0].Date);

            const dataset = await Dataset.load(path)
            for (const id in dataset.resources) {
                const format = dataset.resources[id]._descriptor.format;
                const name = dataset.resources[id]._descriptor.name;
                if (format === "json" && interestedFiles.indexOf(name) != -1) {

                    const file = dataset.resources[id]
                    // Get a raw stream
                    const stream = await file.stream()

                    // import data
                    let jsonStream = jStream.parse('*')
                        .on('data', (data) => {
                            const date = new Date(data.Date);
                            if (name === 'worldwide-aggregated_json') {
                                if (date.getTime() === globalLastUpdateDate.getTime()) {
                                    const query = {
                                        "Date": data.Date,
                                    };
                                    const options = {
                                        useFindAndModify: false
                                    }
                                    Global.findOneAndUpdate(query, data, options);
                                } else if (date.getTime() > globalLastUpdateDate.getTime()) {
                                    const newGlobal = new Global(data);
                                    newGlobal.save();
                                }
                            } else if (name === 'countries-aggregated_json') {
                                if (date.getTime() === dailyLastUpdateDate.getTime()) {
                                    const query = {
                                        "Date": data.Date,
                                        "Country": data.Country,
                                    };
                                    const options = {
                                        useFindAndModify: false
                                    }
                                    Global.findOneAndUpdate(query, data, options);
                                } else if (date.getTime() > dailyLastUpdateDate.getTime()) {
                                    const newDaily = new DailyDetail(data);
                                    newDaily.save();
                                }
                            }
                        })
                        .on('end', () => {
                            console.log(`Import completed ${name}`);
                        })
                    stream.pipe(jsonStream);
                }
            }
        })()
    });
}

module.exports = { updateDatabase }
