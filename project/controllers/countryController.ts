    import mongoose from "mongoose";
    import { State } from "./stateController";
    import { Countrie } from "../models/countryModel";

    const getAllCountries = async (req: JSON, res: any) =>{
        const data = await Countrie.find()
        res.status(200).json(data)
    };

    const newCountry = async (req:any, res:any) =>{
        const lastEntry = await Countrie.find().sort({ _id: -1 }).limit(1)
        const lastID = lastEntry[0]["_id"]+1
        if(!req.body.name || !req.body.code){
            res.status(400)
            throw new Error('Inadequate country information')
        }

        const name = req.body.name
        const code = req.body.code

        const checkName = await Countrie.find().or([{"name": name}, {"code": code}]).exec();

        if(checkName.length !== 0){
            res.status(409).json({"Message": "409 Error"})
            return    
        }
        
        const newCountry = await Countrie.create({
            _id: lastID,
            name,
            code
        })
        
        if(newCountry){
            res.status(201).json({
                _id: newCountry["_id"],
                name: newCountry["name"],
                code: newCountry["code"]
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
            res.status(200).json(countrySearch)
        }
        else{
            res.status(404)
            throw new Error("Can't Find Country")
        }
    }

    const getStatesByCountry = async (req: any, res: any) =>{
        const countrySearch = await Countrie.findOne({code: req.params.code})
        const stateList = await State.find({countryId: countrySearch?.["_id"]})
        if(stateList){
            res.status(200).json(stateList)
        }
        else{
            res.status(404)
            throw new Error("Can't Find States")
        }
    }

    export {getAllCountries, newCountry, getCountry, getStatesByCountry}