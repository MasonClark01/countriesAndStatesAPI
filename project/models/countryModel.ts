import {Schema} from "mongoose";

const mongoose = require('mongoose')

interface Country{
    name: string;
    code: string;
}
const countrySchema = new Schema<Country>({
    name: {type: String},
    code: {type: String} 
})

module.exports = mongoose.model('Countries', countrySchema)
