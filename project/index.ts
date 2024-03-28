import { connectDB } from "./config/db";
import express from 'express';
const dotenv = require('dotenv').config()
import cors from "cors";

const corsOptions = {
    origin:"http://localhost:3000"
}

const port = process.env.PORT || 5000;
const app = express();
connectDB();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOptions))

app.use('/api/countries', require('./routes/countryRoutes'))
app.use('/api/states', require('./routes/stateRoutes'))

app.listen(port, ()=> console.log(`Server on port ${port}`))

