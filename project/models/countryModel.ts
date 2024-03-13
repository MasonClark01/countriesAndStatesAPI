import mongoose from "mongoose";

interface Country{
    name: string;
    code: string;
}
const countrySchema = new mongoose.Schema<Country>({
    name: {type: String},
    code: {type: String} 
})

const CountryModel = mongoose.model('Countries', countrySchema)


export default CountryModel