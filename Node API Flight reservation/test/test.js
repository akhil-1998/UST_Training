// Setup the DB_URI
process.env.DB_URI = require("../db/clouddb").DB_URI

//Test#1  Insert the Vacation data
var db = require('../db/reservations')
var data = require('../data/reservations')

// Save a single row
db.save(data.SingleRow,function(err, saved){
    if(err){
        console.log("Failed single row save")
        //console.log(err)
        //process.exit(1)
    } else {
        console.log("Success - Save single row - %s",saved.name)
    }
});

// Save multiple rows
db.saveMany(data.MultipleRows,function(err, docs){
    if(err){
        console.log("Failed multiple row insert")
        //console.log(err)
        //process.exit(1)
    } else {
        console.log("Success - Multiple rows inserted - %d",docs.length)
    }
});

// Select all passengers
var selectCriteria = {soldout: false}
db.select(selectCriteria, function(err, data){
    if(err){
        console.log("Failed to get passenger list: %s",criteria)
        console.log(err)
    } else {
        console.log("Successfully selected %d documents for %s", data.length, JSON.stringify(selectCriteria))
    }
});

// Update the passenger details
var updateCriteria = {name:'Ashik Kurian'}
var doc = {age: 23}
db.update(updateCriteria,doc,function(err, doc){
    if(err){
        console.log("Failed to get update")
        console.log(err)
    } else {
        console.log("Successfully updated with criteria %s", updateCriteria)
    }
})