import mongoose from "mongoose";

interface Country{
    _id: number;
    name: string;
    code: string;
}
const countrySchema = new mongoose.Schema<Country>({
    _id: {type: Number},
    name: {type: String},
    code: {type: String},
},
{
    versionKey: false
})
const Countrie = mongoose.model('Countrie', countrySchema);

const getAllCountries = async (req: JSON, res: any) =>{
    const data = await Countrie.find()
    res.send(data)
};

const newCountry = async (req:any, res:any) =>{
    const lastEntry = await Countrie.find().sort({ _id: -1 }).limit(1)
    const lastID = lastEntry[0]._id+1
    if(!req.body.name || !req.body.code){
        res.status(400)
        throw new Error('Inadequate country information')
    }
    const name = req.body.name
    const code = req.body.code
    const newCountry = await Countrie.create({
        _id: lastID,
        name,
        code
    })
    if(newCountry){
        res.status(201).json({
            _id: newCountry.id,
            name: newCountry.name,
            code: newCountry.code
        })
    }
    else{
    res.status(400)
    throw new Error("Invalid Data")
    }
}

const getCountry = async (req:any, res:any) =>{
    const countrySearch = await Countrie.findOne({_id: req.params.id} )
    if(countrySearch){
        res.status(201).json(countrySearch)
    }
    else{
        res.status(400)
        throw new Error("Can't Find Country")
    }
}


export {getAllCountries, newCountry, getCountry}