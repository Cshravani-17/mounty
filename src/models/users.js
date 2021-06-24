const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;
const UserSchema = Schema({
    userId: { type: Number }, 
    name: { type: String, required: true }, 
    mobile: { type: String, unique: true, required: true }, 
    email: { type: String, unique: true, required: true }, 
    address: { 
        street: { type: String, required: true },
        locality: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        location: {
            type: { type: String, required: true, default: "Point" },
            coordinates: { type: [Number], required: true },
        }
    },
},
{
    timestamps:true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
UserSchema.plugin(AutoIncrement, { id: 'userId', inc_field: 'userId', start_seq: 1 });
module.exports = mongoose.model('User', UserSchema);