import mongoose from "mongoose";

interface State{
    _id: number;
    name: string;
    code: string;
    countryId: number;
};

const stateSchema = new mongoose.Schema<State>({
    _id: {type: Number},
    name: {type: String},
    code: {type: String},
    countryId: {type: Number}
},

{
    versionKey: false
});

const State = mongoose.model('State', stateSchema)

export { State }