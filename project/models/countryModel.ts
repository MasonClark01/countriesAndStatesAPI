import mongoose from "mongoose";

interface Country{
    _id: number;
    name: string;
    code: string;
};

const countrySchema = new mongoose.Schema<Country>({
    _id: {type: Number}, //replace _
    name: {type: String},
    code: {type: String},
},

{
    versionKey: false
});

const Countrie = mongoose.model('Countrie', countrySchema); //create models folder

export {Countrie}