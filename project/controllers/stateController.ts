import mongoose from "mongoose";
import { State } from "../models/stateModel";

const getAllStates = async (req: JSON, res: any) =>{
    const data = await State.find()
    res.send(data)
};

const newState = async (req:any, res:any) =>{
    const lastEntry = await State.find().sort({ _id: -1 }).limit(1)
    const lastID = lastEntry[0]["_id"]+1
    
    const name = req.body.name
    const code = req.body.code
    const countryId = req.body.countryId

    const checkState = await State.find().or([{"name": name}, {"code": code}]).exec();
    
    if(checkState.length !== 0){
        res.status(409).json({"Message": "409 Error"})
        return    
    }

    const NewState = await State.create({
        _id: lastID,
        name,
        code,
        countryId,
    })
    if(NewState){
        res.status(201).json({
            _id: NewState["id"],
            name: NewState["name"],
            code: NewState["code"],
            countryId: NewState["countryId"]
        })
    }
    else{
        res.status(400)
        console.log(req)
        throw new Error("Invalid Data")
    }
}

const getState = async (req:any, res:any) =>{
    const stateSearch = await State.findOne({_id: req.params.id} )
    if(stateSearch){
        res.status(201).json(stateSearch)
    }
    else{
        res.status(400)
        throw new Error("Can't Find State")
    }
}



export {getAllStates, newState, getState, State}