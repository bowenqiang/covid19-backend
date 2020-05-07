const removeObjUndefinedProps = (obj) => {
    return Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});
}

module.exports = { removeObjUndefinedProps };