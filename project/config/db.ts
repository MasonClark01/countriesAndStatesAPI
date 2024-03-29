import mongoose from 'mongoose'

const connectDB = async () =>{
    try{
        if(process.env.MONGO_URI){
            const connect = await mongoose.connect(process.env.MONGO_URI)
            console.log(`MongoDB Connected: ${connect.connection.host}`)
        }
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

export {connectDB}