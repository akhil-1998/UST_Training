
var model = require ('../models/reservations')
var settings = require('../db/settings')

// Book the Reservation
exports.save = function (data, callback) {

    new model.Reservations(data).save(function (err, inserted) {
        callback(err, inserted)

    })
}

// RETRIEVE vacation packages based on criteria
exports.select = function (criteria, callback) {
    model.Reservations.find(criteria, function (err, data) {
        callback(err, data)
    })
}
