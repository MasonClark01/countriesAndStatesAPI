const Country = require(".//models/countryModel")

const getAllCountries = async (req: JSON, res: any) =>{
    const countries = await Country.find()
    res.status(200).json(countries)
}
const newCountry = async (req:any, res:any) =>{
    if(!req.body.name || !req.body.code){
        res.status(400)
        throw new Error('Inadequate country information')
    }
    res.send("creates!")
}

const getCountry = async (req:any, res:any) =>{
    res.json({message: `works on country${req.params.id}`})
}


export {getAllCountries, newCountry, getCountry}