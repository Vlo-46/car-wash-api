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

// getting data from nats
const {connect, StringCodec, Empty} = require('nats')
const sc = StringCodec();
const CarWashPoint = require('./models').carWashPoint
const CarWashDevice = require('./models').carWashDevice
const Counter = require('./models').counters

const cron = require('node-cron');

cron.schedule('* * * * *', async () => {
    const nc = await connect({
        servers: process.env.NATS_SERVER,
        user: process.env.NATS_USERNAME,
        pass: process.env.NATS_PASSWORD,
    });

    console.log('running a task every minute');

    // We are waiting for the device request

    const msub = nc.subscribe("api.data.counters_and_flags");

    for await (const m of msub) {
        // console.log(
        //     `[${msub}] #${msub.getProcessed()} - ${m.subject} ${
        //         m.data ? " " + sc.decode(m.data) : ""
        //     }`,
        // );

        let data = JSON.parse(sc.decode(m.data));

        let carWashPointToken = data.token;
        const carWashPoint = await CarWashPoint.findOne({
            where: {
                token: carWashPointToken
            }
        })

        if (!carWashPoint) {
            console.log('no car wash point with this token')
            return {success: false}
        }

        const device = await CarWashDevice.findOne({
            where: {
                car_wash_point_id: carWashPoint.id
            }
        })

        if (!device) {
            console.log('no device with this car wash point id')
            return {success: false}
        }

        let counterIds = []

        data.counters.forEach(c => counterIds.push(c.id))

        await Counter.findAll({
            where: {id: counterIds}
        }).then(async result => {
            for (let j = 0; j < counterIds.length; j++) {
                let counter = result.find(item => item.id === counterIds[j])
                let request = data.counters.find(item => item.id === counterIds[j])

                if (!counter) {
                    console.log('no counter')
                    return {success: false}
                }

                counter.coinT = request?.coin?.t;
                counter.coinD = request?.coin?.d;
                counter.billT = request?.bill?.t;
                counter.billD = request?.bill?.d;
                counter.cashlessT = request?.cashless?.t;
                counter.cashlessD = request?.cashless?.d;
                counter.bonusT = request?.bonus?.t;
                counter.bonusD = request?.bonus?.d;
                counter.serviceT = request?.service?.t;
                counter.serviceD = request?.service?.d;
                counter.chSpentT = request?.chSpent[0]?.t;
                counter.chSpentD = request?.chSpent[0]?.d;
                counter.chTimePaidModeT = request?.chTimePaidMode[0]?.t;
                counter.chTimePaidModeD = request?.chTimePaidMode[0]?.d;
                counter.chTimeFreeModeT = request?.chTimeFreeMode[0]?.t;
                counter.chTimeFreeModeD = request?.chTimeFreeMode[0]?.d;
                counter.powerOnTime = request?.powerOnTime

                await counter.save()
            }
        }).catch(e => {
            console.log(e)
            return {success: false}
        })
    }

    await nc.closed().then((err) => {
        let m = `connection to ${nc.getServer()} closed`;
        if (err) {
            m = `${m} with an error: ${err.message}`;
        }
        console.log(m);
    });

});

// server

const PORT = process.env.PORT || 5000;

const db = require('./models')

db.sequelize.sync().then(() => {
    http.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    });
});

