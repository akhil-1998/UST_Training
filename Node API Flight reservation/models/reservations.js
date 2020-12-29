

var settings = require('../db/settings')

var ReservationsSchema = settings.mongoose.Schema({
   
    name: {type:String, required:[true,'Name is needed']},
    age: {type: Number, required: true},
    email: {type:String, required: true},
    class: {type:String, required: true},
    travellers: {type: Number, required: true},
    destinations : [{country:String, countryCode:String}],
    flightIncludes : [{
        what:{type:String, enum:['Food','Beverage']},
        description:{type:String, required:false}
    }],
    departDate:{type:Date, required:true},
    offer : {
        discount: Number,
        description : String,
        expires:{type:Date, required:false}
    },
    ticketCount:{type: Number, required:true},
    soldout: {type:Boolean, required:true, default:false}
    


});

// Export the model
exports.Reservations = settings.mongoose.model('reservations', ReservationsSchema)