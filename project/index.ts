import { connectDB } from "./config/db";
import express from 'express';
const dotenv = require('dotenv').config()

const port = process.env.PORT || 5000;
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/countries', require('./routes/countryRoutes'))

app.listen(port, ()=> console.log(`Server on port ${port}`))

