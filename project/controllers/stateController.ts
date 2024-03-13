import mongoose from "mongoose";

interface State{
    _id: number;
    name: string;
    code: string;
    countryID: number;
};

const stateSchema = new mongoose.Schema<State>({
    _id: {type: Number},
    name: {type: String},
    code: {type: String},
    countryID: {type: Number}
},

{
    versionKey: false
});

const State = mongoose.model('State', stateSchema)

const getAllStates = async (req: JSON, res: any) =>{
    const data = await State.find()
    res.send(data)
};

const newState = async (req:any, res:any) =>{
    const lastEntry = await State.find().sort({ _id: -1 }).limit(1)
    const lastID = lastEntry[0]._id+1
    if(!req.body.name || !req.body.code || req.body.countryID){
        res.status(400)
        throw new Error('Inadequate state information')
    }
    const name = req.body.name
    const code = req.body.code
    const cID = req.body.countryID
    const newState = await State.create({
        _id: lastID,
        name,
        code,
        countryID: cID,
    })
    if(newState){
        res.status(201).json({
            _id: newState.id,
            name: newState.name,
            code: newState.code,
            countryID: newState.countryID
        })
    }
    else{
    res.status(400)
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