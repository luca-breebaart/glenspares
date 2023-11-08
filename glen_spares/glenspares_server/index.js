const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv/config')

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Used with react
app.use(cors({
    origin: 'http://localhost:3000'
}));

// routes
const carRoute = require('./routes/cars')
const orderRoute = require('./routes/orders')
app.use(carRoute)
app.use(orderRoute)

// db connection
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'SoleHaven', //Collection Name
}).then(() => console.log("Connected to GlenSpares DB"))
    .catch((err) => {
        console.log("No Connection. Reason: " + err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server started at port: ${PORT}`) })
