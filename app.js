const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// middleware

const http = require('http').Server(app, {
    cors: {
        origin: process.env.FRONT_URL,
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(cors())

app.use(helmet());
app.use(compression());

require('dotenv').config()

const authRouter = require('./routes/auth')
const carWashRouter = require('./routes/car-wash')
const settingsRouter = require('./routes/settings')


app.use('/api/', authRouter);
app.use('/api/', carWashRouter);
app.use('/api/', settingsRouter)

// server
// testing sequelize mysql

const PORT = process.env.PORT || 5000;

const db = require('./models')

db.sequelize.sync().then(() => {
    http.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    });
});

