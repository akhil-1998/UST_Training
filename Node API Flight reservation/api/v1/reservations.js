var RESOURCE_NAME = 'reservations';
var VERSION = 'v1';
var URI = '/' + VERSION + '/' + RESOURCE_NAME;

// Setup the reservation db
var db = require('../../db/reservations')

//Error info
var apiErrors = require('../../util/errors')
var apiMessages = require('../../util/message')
var MAX_AGE = 15

module.exports = function(router){
    'use strict';

    // RETRIEVE all active reservation stats
    // Active = ticketCount <= 0

    //    /v1/reservations
    router.route(URI).get(function(req, res,next){
        console.log("GET Reservation stats")
        res.header('Cache-Control', 'public, max-age='+MAX_AGE);
        //1. Setup query criteria for the ticket count
        var criteria = {age:{$gte:20}}

        //2. execute the query
        db.select(criteria, function(err,docs){
           
            if(err){
                console.log(err)
                res.status(500)
                res.send("Error connecting to db")
            } else {
                if(docs.length == 0){
                    res.status(404)
                }
                console.log("Retrieved flight stats = %d",docs.length)
                res.send(docs)
            }
        });
    });

    // CREATE new Flight
    router.route(URI).post(function(req, res,next){
        console.log("Add Passenger")
        res.header('Cache-Control', 'public, max-age='+MAX_AGE);

        //1. Get the data
        var doc = req.body;

        //2. Call the insert method
        db.save(doc, function(err,saved){
            if(err){
                // The returned error need to be defined better - in this example it is being left as is
                var userError = processMongooseErrors(apiMessages.errors.API_MESSAGE_CREATE_FAILED, "POST", URI, err,{});
                res.setHeader('content-type', 'application/json')
                res.status(400).send(userError)
            } else {
                res.send(saved)
            }
        });
    });
}
/**
 * Converts the Mongoose validation errors to API specific errors
 */
var processMongooseErrors = function (message, method, endpoint, err,payload) {
    var errorList = []
    // Check for validation error
    if (err.name === 'ValidationError'){
        errorList = processValidationErrors(err)
    } else if(err.code == 11000){
        // it could be database error - 11000 is for duplicate key
        errorList.push(apiErrors.errors.PACKAGE_ALREADY_EXISTS)
    } else {
        var errUnknown = apiErrors.errors.UNKNOWN_ERROR
        errUnknown.payload = err
        errorList = [apiErrors.errors.UNKNOWN_ERROR]
    }
    return apiErrors.create(message, method, endpoint, errorList, payload)
}

/**
 * Converts Mongoose errors to API specific errors
 */
var processValidationErrors = function (err) {
    var errorList = []
   
    // Check if name of the package is missing
    if (err.errors.name) {
        if (err.errors.name.kind === apiErrors.kinds.REQUIRED) {
            errorList.push(apiErrors.errors.MISSING_PACKAGE_NAME)
        }
    }

    // Check if description of the package is missing
    if (err.errors.description) {
        if (err.errors.description.kind === apiErrors.kinds.REQUIRED) {
            errorList.push(apiErrors.errors.MISSING_PACKAGE_DESCRIPTION)
        }
    }

    return errorList;
}
