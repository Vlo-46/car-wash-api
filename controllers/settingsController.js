const {connect, StringCodec, Empty} = require('nats')
const {Op} = require('sequelize')

const DeviceSettings = require('../models').deviceSettings
const CarWashPoint = require('../models').carWashPoint
const CarWashDevice = require('../models').carWashDevice
const Counter = require('../models').counters
const TotalComponent = require('../models').total_components

const constants = require('../utils/constants')

const sc = StringCodec();

const getCommands = async (req, res) => {
    try {
        const {id} = req.query;

        const nc = await connect({
            servers: process.env.NATS_SERVER,
            user: process.env.NATS_USERNAME,
            pass: process.env.NATS_PASSWORD,
        });

        let command;

        await nc.request(`command.device${JSON.parse(id)[0]}`, Empty, {timeout: 10000})
            .then((m) => {
                command = sc.decode(m.data)
                console.log(`got response testing: ${sc.decode(m.data)}`);
                // return res.send({msg: sc.decode(m.data)})
            })
            .catch((err) => {
                console.log(`problem with request: ${err.message}`);
                command = err.message;
            });

        await nc.close();

        return res.send({command})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getCounters = async (req, res) => {
    try {
        const {id, role} = req.user;

        if (role !== constants.userTypes.USER) return res.status(403).json({success: false})

        const carWashPoints = await CarWashPoint.findAll({
            where: {
                user_id: id
            },
            include: [
                {
                    model: CarWashDevice,
                    include: [
                        {
                            model: DeviceSettings
                        },
                        {
                            model: Counter
                        }
                    ]
                },

            ]
        })

        return res.send(carWashPoints)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getCounter = async (req, res) => {
    try {
        const {device_id} = req.query;

        const device = await CarWashDevice.findByPk(device_id)
        if (!device) return res.send({success: false, msg: 'Not found'})

        const point = await CarWashPoint.findByPk(device.car_wash_point_id)

        if (!point) return res.send({success: false, msg: 'Not found'})

        const nc = await connect({
            servers: process.env.NATS_SERVER,
            user: process.env.NATS_USERNAME,
            pass: process.env.NATS_PASSWORD,
        });

        nc.publish(`${constants.listOfCommands.COUNTERS_AND_FLAGS_UPDATE}${point.token}`);

        const sub = nc.subscribe(`${constants.listOfSubjects.COUNTERS_AND_FLAGS}`);


        (async () => {
            for await (let m of sub) {
                let response = JSON.parse(sc.decode(m.data))
                if (response.token === point.token) {
                    response.counters.forEach(async dev => {
                        const counter = await Counter.findOne({device_id: dev.id})
                        if (!counter) return res.send({success: false})

                        counter.coinT = dev?.coin?.t;
                        counter.coinD = dev?.coin?.d;
                        counter.billT = dev?.bill?.t;
                        counter.billD = dev?.bill?.d;
                        counter.cashlessT = dev?.cashless?.t;
                        counter.cashlessD = dev?.cashless?.d;
                        counter.bonusT = dev?.bonus?.t;
                        counter.bonusD = dev?.bonus?.d;
                        counter.serviceT = dev?.service?.t;
                        counter.serviceD = dev?.service?.d;
                        counter.chSpentT = dev?.chSpent[0]?.t;
                        counter.chSpentD = dev?.chSpent[0]?.d;
                        counter.chTimePaidModeT = dev?.chTimePaidMode[0]?.t;
                        counter.chTimePaidModeD = dev?.chTimePaidMode[0]?.d;
                        counter.chTimeFreeModeT = dev?.chTimeFreeMode[0]?.t;
                        counter.chTimeFreeModeD = dev?.chTimeFreeMode[0]?.d;
                        counter.powerOnTime = dev?.powerOnTime

                        await counter.save()

                        // return res.send({success: true})
                    })
                } else {
                    return res.send({success: false})
                }

            return res.send(response)
            }
        })();
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const updateCounters = async (req, res) => {
    try {
        const {counters} = req.body;

        const data = {
            "counters": [
                {
                    "id": 1,
                    "coin": {
                        "t": 0,
                        "d": 0
                    },
                    "bill": {
                        "t": 0,
                        "d": 0
                    },
                    "cashless": {
                        "t": 0,
                        "d": 0
                    },
                    "bonus": {
                        "t": 0,
                        "d": 0
                    },
                    "service": {
                        "t": 0,
                        "d": 0
                    },
                    "chSpent": [
                        {
                            "t": 0,
                            "d": 0
                        }
                    ],
                    "chTimePaidMode": [
                        {
                            "t": 0,
                            "d": 0
                        }
                    ],
                    "chTimeFreeMode": [
                        {
                            "t": 0,
                            "d": 0
                        }
                    ],
                    "powerOnTime": 0
                },
                {
                    "id": 2,
                    "coin": {
                        "t": 0,
                        "d": 0
                    },
                    "bill": {
                        "t": 0,
                        "d": 0
                    },
                    "cashless": {
                        "t": 0,
                        "d": 0
                    },
                    "bonus": {
                        "t": 0,
                        "d": 0
                    },
                    "service": {
                        "t": 0,
                        "d": 0
                    },
                    "chSpent": [
                        {
                            "t": 0,
                            "d": 0
                        }
                    ],
                    "chTimePaidMode": [
                        {
                            "t": 0,
                            "d": 0
                        }
                    ],
                    "chTimeFreeMode": [
                        {
                            "t": 0,
                            "d": 0
                        }
                    ],
                    "powerOnTime": 0
                }
            ]
        }

        let counterIds = []

        counters.forEach(c => counterIds.push(c.id))

        await Counter.findAll({
            where: {id: counterIds}
        }).then(async result => {
            for (let j = 0; j < counterIds.length; j++) {
                let counter = result.find(item => item.id === counterIds[j])
                let request = counters.find(item => item.id === counterIds[j])

                if (!counter) return res.send({success: false})

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
            return res.send({success: false})
        })
        return res.send({success: true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const confirmCountersReset = async (req, res) => {
    try {
        const {token, id} = req.body;

        const data = {
            "id": [0]
        }

        const point = await CarWashPoint.findOne({
            where: {token}
        })

        if (!point) return res.send({success: false, msg: 'Not found'})

        const nc = await connect({
            servers: process.env.NATS_SERVER,
            user: process.env.NATS_USERNAME,
            pass: process.env.NATS_PASSWORD,
        });

        if (!id) {
            nc.publish(`${constants.listOfCommands.COUNTERS_RESET}${point.token}`);
        } else {
            nc.publish(`${constants.listOfCommands.COUNTERS_RESET}${point.token}.${id}`);
        }

        const sub = nc.subscribe(`${constants.listOfSubjects.COUNTERS_RESET}`);
        (async () => {
            for await (const m of sub) {
                let response = JSON.parse(sc.decode(m.data))
                if (token !== response.token) return res.send({success: false})

                response.result.forEach(async dev => {
                    if (dev.success) {
                        const counter = await Counter.findOne({
                            where: {device_id: dev.id}
                        })

                        if (!counter) return res.send({success: false})

                        // counter.coinT = 0
                        counter.coinD = 0
                        // counter.billT = 0
                        counter.billD = 0
                        // counter.cashlessT = 0
                        counter.cashlessD = 0
                        // counter.bonusT = 0
                        counter.bonusD = 0
                        // counter.serviceT = 0
                        counter.serviceD = 0
                        counter.chSpent = "{t: 0, d: 0}"
                        counter.chTimePaidMode = "{t: 0, d: 0}"
                        counter.chTimeFreeMode = "{t: 0, d: 0}"
                        counter.powerOnTime = 0

                        await counter.save()
                        return res.send({success: true})
                    } else {
                        return res.send({success: false})
                    }
                })
            }
            console.log("subscription closed");
        })();
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const confirmServiceReset = async (req, res) => {
    try {
        const {token, id} = req.body;
        const data = {
            "id": [0]
        }

        const point = await CarWashPoint.findOne({
            where: {token}
        })

        if (!point) return res.send({success: false, msg: 'Not found'})

        const nc = await connect({
            servers: process.env.NATS_SERVER,
            user: process.env.NATS_USERNAME,
            pass: process.env.NATS_PASSWORD,
        });

        if (!id) {
            nc.publish(`${constants.listOfCommands.SERVICE_RESET}${point.token}`);
        } else {
            nc.publish(`${constants.listOfCommands.SERVICE_RESET}${point.token}.${id}`);
        }

        const sub = nc.subscribe(`${constants.listOfSubjects.SERVICE_RESET}`);
        (async () => {
            for await (const m of sub) {
                let response = JSON.parse(sc.decode(m.data))
                if (token !== response.token) return res.send({success: false})

                response.result.forEach(async dev => {
                    if (dev.success) {
                        const counter = await Counter.findOne({
                            where: {device_id: dev.id}
                        })

                        if (!counter) return res.send({success: false})

                        counter.serviceD = 0

                        await counter.save()
                        return res.send({success: true})
                    } else {
                        return res.send({success: false})
                    }
                })
            }
            console.log("subscription closed");
        })();
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const freeModeFlags = async (req, res) => {
    try {
        const {token, freeModeflag} = req.body;

        const data = {
            "freeModeflag": [
                {
                    "id": 0,
                    "flag": 0
                }
            ]
        }

        const point = await CarWashPoint.findOne({
            where: {token}
        })

        if (!point) return res.send({success: false, msg: 'Not found'})

        const nc = await connect({
            servers: process.env.NATS_SERVER,
            user: process.env.NATS_USERNAME,
            pass: process.env.NATS_PASSWORD,
        });

        freeModeflag.forEach(item => {
            if (item.flag) {
                // free mode on
                if (!item.id) {
                    nc.publish(`${constants.listOfCommands.FREE_MODE_ON}${point.token}`);
                } else {
                    nc.publish(`${constants.listOfCommands.FREE_MODE_ON}${point.token}.${item.id}`);
                }

                const sub = nc.subscribe(`${constants.listOfSubjects.FREE_MODE_ON}`);
                (async () => {
                    for await (const m of sub) {
                        let response = JSON.parse(sc.decode(m.data))
                        if (token !== response.token) return res.send({success: false})

                        response.result.forEach(async dev => {
                            if (dev.success) {
                                const device = await DeviceSettings.findOne({
                                    where: {
                                        device_id: dev.id
                                    }
                                })

                                if (!device) return res.send({success: false})

                                device.bonusMode = 1

                                await device.save()
                                return res.send({success: true})
                            } else {
                                return res.send({success: false})
                            }
                        })
                    }
                    console.log("subscription closed");
                })();
            } else {
                // free mode off
                if (!item.id) {
                    nc.publish(`${constants.listOfCommands.FREE_MODE_OFF}${point.token}`);
                } else {
                    nc.publish(`${constants.listOfCommands.FREE_MODE_OFF}${point.token}.${item.id}`);
                }

                const sub = nc.subscribe(`${constants.listOfSubjects.FREE_MODE_OFF}`);
                (async () => {
                    for await (const m of sub) {
                        let response = JSON.parse(sc.decode(m.data))
                        if (token !== response.token) return res.send({success: false})

                        response.result.forEach(async dev => {
                            if (dev.success) {
                                const device = await DeviceSettings.findOne({
                                    where: {
                                        device_id: dev.id
                                    }
                                })

                                if (!device) return res.send({success: false})

                                device.bonusMode = 0

                                await device.save()
                                return res.send({success: true})
                            } else {
                                return res.send({success: false})
                            }
                        })
                    }
                    console.log("subscription closed");
                })();
            }
        })
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deviceDisabledFlags = async (req, res) => {
    try {
        const {token, isDisabled} = req.body;

        const data = {
            "isDisabled": [
                {
                    "id": 0,
                    "flag": 0
                }
            ]
        }

        const point = await CarWashPoint.findOne({
            where: {token}
        })

        if (!point) return res.send({success: false, msg: 'Not found'})

        const nc = await connect({
            servers: process.env.NATS_SERVER,
            user: process.env.NATS_USERNAME,
            pass: process.env.NATS_PASSWORD,
        });

        isDisabled.forEach(item => {
            if (item.flag) {
                // device enable
                if (!item.id) {
                    nc.publish(`${constants.listOfCommands.DEVICE_ENABLE}${point.token}`);
                } else {
                    nc.publish(`${constants.listOfCommands.DEVICE_ENABLE}${point.token}.${item.id}`);
                }

                const sub = nc.subscribe(`${constants.listOfSubjects.DEVICE_ENABLE}`);
                (async () => {
                    for await (const m of sub) {
                        let response = JSON.parse(sc.decode(m.data))
                        if (token !== response.token) return res.send({success: false})

                        response.result.forEach(async dev => {
                            if (dev.success) {
                                const device = await DeviceSettings.findOne({
                                    where: {
                                        device_id: dev.id
                                    }
                                })

                                if (!device) return res.send({success: false})

                                device.pauseMode = 1

                                await device.save()
                                return res.send({success: true})
                            } else {
                                return res.send({success: false})
                            }
                        })
                    }
                    console.log("subscription closed");
                })();
            } else {
                // device disable
                if (!item.id) {
                    nc.publish(`${constants.listOfCommands.DEVICE_DISABLE}${point.token}`);
                } else {
                    nc.publish(`${constants.listOfCommands.DEVICE_DISABLE}${point.token}.${item.id}`);
                }

                const sub = nc.subscribe(`${constants.listOfSubjects.DEVICE_DISABLE}`);
                (async () => {
                    for await (const m of sub) {
                        let response = JSON.parse(sc.decode(m.data))
                        if (token !== response.token) return res.send({success: false})

                        response.result.forEach(async dev => {
                            if (dev.success) {
                                const device = await DeviceSettings.findOne({
                                    where: {
                                        device_id: dev.id
                                    }
                                })

                                if (!device) return res.send({success: false})

                                device.pauseMode = 0

                                await device.save()
                                return res.send({success: true})
                            } else {
                                return res.send({success: false})
                            }
                        })
                    }
                    console.log("subscription closed");
                })();
            }
        })

        // let deviceIds = []
        //
        // isDisabled.forEach(item => deviceIds.push(item.id))
        //
        // await DeviceSettings.findAll({
        //     where: {id: deviceIds}
        // }).then(async (result) => {
        //     for (let j = 0; j < deviceIds.length; j++) {
        //         let deviceSetting = result.find(item => item.id === deviceIds[j])
        //
        //         if (!deviceSetting) return res.send({success: false})
        //
        //         let request = isDisabled.find(item => item.id === deviceIds[j])
        //
        //         deviceSetting.pauseMode = request.flag;
        //
        //         await deviceSetting.save()
        //         await publishToNats({commandName: 'cmdFreeModeOff', command: 6, device_id: deviceSetting.device_id})
        //     }
        //
        //     return res.send({success: true})
        // }).catch(err => {
        //     return res.send({success: false})
        // })
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const sendBasicSettings = async (req, res) => {
    try {
        const {token, settings} = req.body;

        const data = {
            "settings": [
                {
                    "id": 1,
                    "tariff": [
                        1, 2, 3
                    ],
                    "coinNom": 0,
                    "billNom": 0,
                    "bonusP": 0,
                    "bonusV": 0,
                    "bingoT": 0,
                    "bingoV": 0,
                    "schedule": {
                        "tStart": "12:00",
                        "tEnd": "12:00",
                        "tPct": 0,
                        "bStart": "12:00",
                        "bEnd": "12:00",
                        "bPct": 0,
                        "bVal": 0
                    }
                },
                {
                    "id": 2,
                    "tariff": [
                        1, 2, 3
                    ],
                    "coinNom": 0,
                    "billNom": 0,
                    "bonusP": 0,
                    "bonusV": 0,
                    "bingoT": 0,
                    "bingoV": 0,
                    "schedule": {
                        "tStart": "12:00",
                        "tEnd": "12:00",
                        "tPct": 0,
                        "bStart": "12:00",
                        "bEnd": "12:00",
                        "bPct": 0,
                        "bVal": 0
                    }
                },
            ]
        }

        const deviceIds = []

        const point = await CarWashPoint.findOne({
            where: {token}
        })

        if (!point) return res.send({success: false, msg: 'Not found'})

        const nc = await connect({
            servers: process.env.NATS_SERVER,
            user: process.env.NATS_USERNAME,
            pass: process.env.NATS_PASSWORD,
        });


        settings.forEach(item => {
            if (item.id) {
                nc.publish(`${constants.listOfCommands.SETTINGS_BASIC_WRITE}${token}.${item.id}`, sc.encode(item));
            } else {
                nc.publish(`${constants.listOfCommands.SETTINGS_BASIC_WRITE}${token}`);
            }

        })

        const sub = nc.subscribe(`${constants.listOfSubjects.SETTINGS_BASIC_WRITE}`);
        (async () => {
            for await (const m of sub) {
                let response = JSON.parse(sc.decode(m.data));

                const point = await CarWashPoint.findOne({token: response.token})
                if (!point) return res.send({success: false})


                response.result.forEach(async dev => {
                    if (dev.success) {
                        const deviceSetting = await DeviceSettings.findOne({device_id: dev.id})
                        if (!deviceSetting) return res.send({success: false})
                        const request = settings.find(i => i.id == dev.id)

                        if (request?.tariff) deviceSetting.set({tariffPct: JSON.stringify(request?.tariff)})
                        if (request?.coinNom) deviceSetting.set({coinNominal: request?.coinNom})
                        if (request?.billNom) deviceSetting.set({billNominal: request?.billNom})
                        if (request?.bonusP) deviceSetting.set({bonusPct: request?.bonusP})
                        if (request?.bonusV) deviceSetting.set({bonusVal: request?.bonusV})
                        if (request?.bingoT) deviceSetting.set({bingoThr: request?.bingoT})
                        if (request?.bingoV) deviceSetting.set({bingoVal: request?.bingoV})
                        if (request?.schedule?.tStart) deviceSetting.set({tariffSchStart: request?.schedule?.tStart})
                        if (request?.schedule?.tEnd) deviceSetting.set({tariffSchEnd: request?.schedule?.tEnd})
                        if (request?.schedule?.tPct) deviceSetting.set({tariffPct: request?.schedule?.tPct})
                        if (request?.schedule?.bStart) deviceSetting.set({bonusSchStart: request?.schedule?.bStart})
                        if (request?.schedule?.bEnd) deviceSetting.set({bonusSchEnd: request?.schedule?.bEnd})
                        if (request?.schedule?.bPct) deviceSetting.set({tBonusPct: request?.schedule?.bPct})
                        if (request?.schedule?.bVal) deviceSetting.set({tBonusVal: request?.schedule?.bVal})

                        await deviceSetting.save()

                        return res.send({success: true})

                    } else {
                        return res.send({success: false})
                    }

                })

            }
            console.log("subscription closed");
        })();

        // settings.forEach(item => deviceIds.push(item.id))
        //
        // await DeviceSettings.findAll({
        //     where: {id: deviceIds}
        // }).then(async result => {
        //     for (let j = 0; j < deviceIds.length; j++) {
        //         const deviceSetting = result.find(item => item.id === deviceIds[j])
        //         if (!deviceSetting) return res.send({success: false})
        //
        //         const request = settings.find(item => item.id === deviceIds[j])
        //
        //         if (request?.tariff) deviceSetting.set({tariffPct: JSON.stringify(request?.tariff)})
        //         if (request?.coinNom) deviceSetting.set({coinNominal: request?.coinNom})
        //         if (request?.billNom) deviceSetting.set({billNominal: request?.billNom})
        //         if (request?.bonusP) deviceSetting.set({bonusPct: request?.bonusP})
        //         if (request?.bonusV) deviceSetting.set({bonusVal: request?.bonusV})
        //         if (request?.bingoT) deviceSetting.set({bingoThr: request?.bingoT})
        //         if (request?.bingoV) deviceSetting.set({bingoVal: request?.bingoV})
        //         if (request?.schedule?.tStart) deviceSetting.set({tariffSchStart: request?.schedule?.tStart})
        //         if (request?.schedule?.tEnd) deviceSetting.set({tariffSchEnd: request?.schedule?.tEnd})
        //         if (request?.schedule?.tPct) deviceSetting.set({tariffPct: request?.schedule?.tPct})
        //         if (request?.schedule?.bStart) deviceSetting.set({bonusSchStart: request?.schedule?.bStart})
        //         if (request?.schedule?.bEnd) deviceSetting.set({bonusSchEnd: request?.schedule?.bEnd})
        //         if (request?.schedule?.bPct) deviceSetting.set({tBonusPct: request?.schedule?.bPct})
        //         if (request?.schedule?.bVal) deviceSetting.set({tBonusVal: request?.schedule?.bVal})
        //
        //         await deviceSetting.save()
        //
        //         await publishToNats({
        //             commandName: 'cmdWriteBasicSettings',
        //             command: 10,
        //             device_id: deviceSetting.device_id
        //         })
        //     }
        // }).catch(e => res.send({success: false, error: e}))
        //
        //
        // return res.send({success: true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const receiveBasicSettings = async (req, res) => {
    try {
        const {token, id} = req.query;

        // id type: ARRAY OF NUMBERS, description: Device ID
        // [1,2,3]

        // let arrayOfDevicesID = JSON.parse(id)

        const point = await CarWashPoint.findOne({
            where: {token}
        })

        if (!point) return res.send({success: false, msg: 'Not found'})

        const nc = await connect({
            servers: process.env.NATS_SERVER,
            user: process.env.NATS_USERNAME,
            pass: process.env.NATS_PASSWORD,
        });

        nc.publish(`${constants.listOfCommands.SETTINGS_BASIC_READ}${token}`);

        const sub = nc.subscribe(`${constants.listOfSubjects.SETTINGS_BASIC}`);
        (async () => {
            for await (const m of sub) {
                let response = JSON.parse(sc.decode(m.data))

                const point = await CarWashPoint.findOne({token: response.token})
                if (!point) return res.send({success: false})

                response.basicSettings.forEach(async dev => {
                    const deviceSetting = await DeviceSettings.findOne({device_id: dev.id})
                    if (!deviceSetting) return res.send({success: false})

                    if (dev?.tariff) deviceSetting.set({tariffPct: JSON.stringify(dev?.tariff)})
                    if (dev?.coinNom) deviceSetting.set({coinNominal: dev?.coinNom})
                    if (dev?.billNom) deviceSetting.set({billNominal: dev?.billNom})
                    if (dev?.bonusP) deviceSetting.set({bonusPct: dev?.bonusP})
                    if (dev?.bonusV) deviceSetting.set({bonusVal: dev?.bonusV})
                    if (dev?.bingoT) deviceSetting.set({bingoThr: dev?.bingoT})
                    if (dev?.bingoV) deviceSetting.set({bingoVal: dev?.bingoV})
                    if (dev?.schedule?.tStart) deviceSetting.set({tariffSchStart: dev?.schedule?.tStart})
                    if (dev?.schedule?.tEnd) deviceSetting.set({tariffSchEnd: dev?.schedule?.tEnd})
                    if (dev?.schedule?.tPct) deviceSetting.set({tariffPct: dev?.schedule?.tPct})
                    if (dev?.schedule?.bStart) deviceSetting.set({bonusSchStart: dev?.schedule?.bStart})
                    if (dev?.schedule?.bEnd) deviceSetting.set({bonusSchEnd: dev?.schedule?.bEnd})
                    if (dev?.schedule?.bPct) deviceSetting.set({tBonusPct: dev?.schedule?.bPct})
                    if (dev?.schedule?.bVal) deviceSetting.set({tBonusVal: dev?.schedule?.bVal})

                    await deviceSetting.save()
                })

                return res.send(response.basicSettings)
            }
            console.log("subscription closed");
        })();

        // const devices = await DeviceSettings.findAll({
        //     where: {device_id: arrayOfDevicesID},
        //     // where: {
        //     //     [Op.and]: [
        //     //         { id: arrayOfDevicesID },
        //     //         { device_id: arrayOfDevicesID }
        //     //     ]
        //     // }
        // })
        //
        // if (!devices?.length) return res.send({success: false})
        //
        // const settings = [];
        //
        // devices.forEach(dev => {
        //     const data = {}
        //     data.id = dev.device_id;
        //     data.tariff = JSON.parse(dev.tariffPct) // discussion
        //     data.coinNom = dev.coinNominal;
        //     data.billNom = dev.billNominal;
        //     data.bonusP = dev.bonusPct;
        //     data.bonusV = dev.bonusVal;
        //     data.bingoT = dev.bingoThr;
        //     data.bingoV = dev.bingoVal;
        //     data.schedule = {
        //         tStart: dev.tariffSchStart,
        //         tEnd: dev.tariffSchEnd,
        //         tPct: JSON.parse(dev.tariffPct),
        //         bStart: dev.bonusSchStart,
        //         bEnd: dev.bonusSchEnd,
        //         bPct: dev.tBonusPct,
        //         bVal: dev.tBonusVal
        //     }
        //
        //     publishToNats({commandName: 'cmdReadBasicSettings', command: 9, device_id: dev.device_id})
        //     settings.push(data)
        // })
        //
        // const response = {
        //     success: true,
        //     settings
        // }
        //
        // return res.send(response)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const receiveExtendedSettings = async (req, res) => {
    try {
        const {token} = req.query
        // const {token, device_id} = req.query

        const point = await CarWashPoint.findOne({
            where: {token}
        })

        if (!point) return res.send({success: false, msg: 'Not found'})

        const nc = await connect({
            servers: process.env.NATS_SERVER,
            user: process.env.NATS_USERNAME,
            pass: process.env.NATS_PASSWORD,
        });
        nc.publish(`${constants.listOfCommands.SETTINGS_EXTENDED_READ}${token}`);


        const sub = nc.subscribe(`${constants.listOfSubjects.SETTINGS_EXTENDED}`);
        (async () => {
            for await (const m of sub) {
                // console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);

                let response = JSON.parse(sc.decode(m.data))

                const point = await CarWashPoint.findOne({token: response.token})
                if (!point) return res.send({success: false})

                response.extendedSettings.forEach(async dev => {
                    const deviceSetting = await DeviceSettings.findOne({device_id: dev.id})
                    if (!deviceSetting) return res.send({success: false})

                    if (dev?.mode) deviceSetting.set({mode: dev?.mode})
                    if (dev?.bpEn) deviceSetting.set({bypass: dev?.bpEn})
                    if (dev?.bpTime) deviceSetting.set({bpTime: dev.bpTime})
                    if (dev?.bpCh) deviceSetting.set({bypassChann: JSON.stringify(dev.bpCh)})
                    if (dev?.service) deviceSetting.set({service: dev.service})

                    if (dev?.hopper?.enabled) deviceSetting.set({hopper: dev.hopper.enabled})
                    if (dev?.hopper?.nominal) deviceSetting.set({hopperNominal: dev.hopper.nominal})
                    if (dev?.hopper?.threshold) deviceSetting.set({hopperThreshold: dev.hopper.threshold})

                    if (dev?.valve?.period) deviceSetting.set({valveP: dev.valve.period})
                    if (dev?.valve?.duration) deviceSetting.set({ValveD: dev.valve.duration})
                    if (dev?.valve?.count) deviceSetting.set({ValveC: dev.valve.count})

                    if (dev?.language) deviceSetting.set({language: dev?.language})
                    if (dev?.currency) deviceSetting.set({currency: dev?.currency})

                    if (dev?.dColor) deviceSetting.set({digColor: dev?.dColor})
                    if (dev?.color) deviceSetting.set({colors: JSON.stringify(dev?.color)})

                    if (dev?.screen) deviceSetting.set({screen: JSON.stringify(dev?.screen)})
                    if (dev?.bonusMode) deviceSetting.set({bonusMode: dev?.bonusMode})
                    if (dev?.pauseMode) deviceSetting.set({pauseMode: dev?.pauseMode})
                    if (dev?.hpt) deviceSetting.set({hpt: dev?.hpt})
                    if (dev?.component) deviceSetting.set({component: JSON.stringify(dev?.component)})
                    if (dev?.relayOutput) deviceSetting.set({relayOutput: JSON.stringify(dev?.relayOutput)})

                    if (dev?.flowSensor[0].length && request?.flowSensor[0]['pulse']) deviceSetting.set({flowPulse1: dev?.flowSensor[0]['pulse']})
                    if (dev?.flowSensor[0].length && request?.flowSensor[0]['timeout']) deviceSetting.set({flowTimeout1: dev?.flowSensor[0]['timeout']})
                    if (dev?.flowSensor[1].length && request?.flowSensor[1]['pulse']) deviceSetting.set({flowPulse2: dev?.flowSensor[1]['pulse']})
                    if (dev?.flowSensor[1].length && request?.flowSensor[1]['timeout']) deviceSetting.set({flowTimeout2: dev?.flowSensor[1]['timeout']})

                    await deviceSetting.save()
                })

                return res.send(response.extendedSettings)
            }
            console.log("subscription closed");
        })();


        // const device = await DeviceSettings.findOne({
        //     where: {
        //         device_id
        //     }
        // })
        //
        // if (!device) return res.send({success: false, msg: 'Not found'})
        //
        // await publishToNats({commandName: 'cmdReadExtendedSettings', command: 11, device_id})
        // return res.send({success: true, device})

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const sendExtendedSettings = async (req, res) => {
    try {
        const {configs, token} = req.body;
        const data = {
            "configs": [
                {
                    "id": 1,
                    "mode": 1,
                    "bpEn": 0,
                    "bpTime": 120,
                    "bpCh": [
                        1
                    ],
                    "service": 2500,
                    "hopper": {
                        "enabled": 0,
                        "nominal": 2600,
                        "threshold": 3500
                    },
                    "valve": {
                        "period": 150,
                        "duration": 250,
                        "count": 350
                    },
                    "language": 1,
                    "currency": 3,
                    "dColor": 4,
                    "color": [
                        4, 5, 6
                    ],
                    "component": [
                        5, 6, 7, 8
                    ],
                    "screen": [
                        100, 200, 300
                    ],
                    "bonusMode": 0,
                    "pauseMode": 0,
                    "hpt": 0,
                    "flowSensor": [
                        {
                            "pulse": 5000,
                            "timeout": 6000
                        }
                    ],
                    "relayOutput": [
                        [
                            0
                        ]
                    ]
                },
            ]
        }

        const point = await CarWashPoint.findOne({
            where: {token}
        })

        if (!point) return res.send({success: false, msg: 'Not found'})

        const nc = await connect({
            servers: process.env.NATS_SERVER,
            user: process.env.NATS_USERNAME,
            pass: process.env.NATS_PASSWORD,
        });


        configs.forEach(item => {
            if (item.id) {
                nc.publish(`${constants.listOfCommands.SETTINGS_EXTENDED_WRITE}${token}.${item.id}`, sc.encode(item));
            } else {
                nc.publish(`${constants.listOfCommands.SETTINGS_EXTENDED_WRITE}${token}`);
            }
        })

        const sub = nc.subscribe(`${constants.listOfSubjects.SETTINGS_EXTENDED_WRITE}`);
        (async () => {
            for await (const m of sub) {
                console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);

                let response = JSON.parse(sc.decode(m.data));

                const point = await CarWashPoint.findOne({token: response.token})
                if (!point) return res.send({success: false})


                response.result.forEach(async dev => {
                    if (dev.success) {
                        const deviceSetting = await DeviceSettings.findOne({device_id: dev.id})
                        if (!deviceSetting) return res.send({success: false})
                        const request = configs.find(i => i.id == dev.id)

                        if (request?.mode) deviceSetting.set({mode: request?.mode})
                        if (request?.bpEn) deviceSetting.set({bypass: request?.bpEn})
                        if (request?.bpTime) deviceSetting.set({bpTime: request.bpTime})
                        if (request?.bpCh) deviceSetting.set({bypassChann: JSON.stringify(request.bpCh)})
                        if (request?.service) deviceSetting.set({service: request.service})

                        if (request?.hopper?.enabled) deviceSetting.set({hopper: request.hopper.enabled})
                        if (request?.hopper?.nominal) deviceSetting.set({hopperNominal: request.hopper.nominal})
                        if (request?.hopper?.threshold) deviceSetting.set({hopperThreshold: request.hopper.threshold})

                        if (request?.valve?.period) deviceSetting.set({valveP: request.valve.period})
                        if (request?.valve?.duration) deviceSetting.set({ValveD: request.valve.duration})
                        if (request?.valve?.count) deviceSetting.set({ValveC: request.valve.count})

                        if (request?.language) deviceSetting.set({language: request?.language})
                        if (request?.currency) deviceSetting.set({currency: request?.currency})

                        if (request?.dColor) deviceSetting.set({digColor: request?.dColor})
                        if (request?.color) deviceSetting.set({colors: JSON.stringify(request?.color)})

                        if (request?.screen) deviceSetting.set({screen: JSON.stringify(request?.screen)})
                        if (request?.bonusMode) deviceSetting.set({bonusMode: request?.bonusMode})
                        if (request?.pauseMode) deviceSetting.set({pauseMode: request?.pauseMode})
                        if (request?.hpt) deviceSetting.set({hpt: request?.hpt})
                        if (request?.component) deviceSetting.set({component: JSON.stringify(request?.component)})
                        if (request?.relayOutput) deviceSetting.set({relayOutput: JSON.stringify(request?.relayOutput)})

                        if (request?.flowSensor[0] && request?.flowSensor[0]['pulse']) deviceSetting.set({flowPulse1: request?.flowSensor[0]['pulse']})
                        if (request?.flowSensor[0] && request?.flowSensor[0]['timeout']) deviceSetting.set({flowTimeout1: request?.flowSensor[0]['timeout']})
                        if (request?.flowSensor[1] && request?.flowSensor[1]['pulse']) deviceSetting.set({flowPulse2: request?.flowSensor[1]['pulse']})
                        if (request?.flowSensor[1] && request?.flowSensor[1]['timeout']) deviceSetting.set({flowTimeout2: request?.flowSensor[1]['timeout']})

                        await deviceSetting.save()

                        return res.send({success: true})
                    } else {
                        return res.send({success: false})
                    }

                })
            }
            console.log("subscription closed");
        })();

        // const deviceIds = []
        //
        // configs.forEach(item => deviceIds.push(item.id))
        //
        // await DeviceSettings.findAll({
        //     where: {id: deviceIds}
        // }).then(async result => {
        //     for (let j = 0; j < deviceIds.length; j++) {
        //         const deviceSetting = result.find(item => item.id === deviceIds[j])
        //         if (!deviceSetting) return res.send({success: false})
        //
        //         const request = configs.find(item => item.id === deviceIds[j])
        //
        //         if (request?.mode) deviceSetting.set({mode: request?.mode})
        //         if (request?.bpEn) deviceSetting.set({bypass: request?.bpEn})
        //         if (request?.bpTime) deviceSetting.set({bpTime: request.bpTime})
        //         if (request?.bpCh) deviceSetting.set({bypassChann: JSON.stringify(request.bpCh)})
        //         if (request?.service) deviceSetting.set({service: request.service})
        //
        //         if (request?.hopper?.enabled) deviceSetting.set({hopper: request.hopper.enabled})
        //         if (request?.hopper?.nominal) deviceSetting.set({hopperNominal: request.hopper.nominal})
        //         if (request?.hopper?.threshold) deviceSetting.set({hopperThreshold: request.hopper.threshold})
        //
        //         if (request?.valve?.period) deviceSetting.set({valveP: request.valve.period})
        //         if (request?.valve?.duration) deviceSetting.set({ValveD: request.valve.duration})
        //         if (request?.valve?.count) deviceSetting.set({ValveC: request.valve.count})
        //
        //         if (request?.language) deviceSetting.set({language: request?.language})
        //         if (request?.currency) deviceSetting.set({currency: request?.currency})
        //
        //         if (request?.dColor) deviceSetting.set({digColor: request?.dColor})
        //         if (request?.color) deviceSetting.set({colors: JSON.stringify(request?.color)})
        //
        //         if (request?.screen) deviceSetting.set({screen: JSON.stringify(request?.screen)})
        //         if (request?.bonusMode) deviceSetting.set({bonusMode: request?.bonusMode})
        //         if (request?.pauseMode) deviceSetting.set({pauseMode: request?.pauseMode})
        //         if (request?.hpt) deviceSetting.set({hpt: request?.hpt})
        //         if (request?.component) deviceSetting.set({component: JSON.stringify(request?.component)})
        //         if (request?.relayOutput) deviceSetting.set({relayOutput: JSON.stringify(request?.relayOutput)})
        //
        //         if (request?.flowSensor[0].length && request?.flowSensor[0]['pulse']) deviceSetting.set({flowPulse1: request?.flowSensor[0]['pulse']})
        //         if (request?.flowSensor[0].length && request?.flowSensor[0]['timeout']) deviceSetting.set({flowTimeout1: request?.flowSensor[0]['timeout']})
        //         if (request?.flowSensor[1].length && request?.flowSensor[1]['pulse']) deviceSetting.set({flowPulse2: request?.flowSensor[1]['pulse']})
        //         if (request?.flowSensor[1].length && request?.flowSensor[1]['timeout']) deviceSetting.set({flowTimeout2: request?.flowSensor[1]['timeout']})
        //
        //         await deviceSetting.save()
        //
        //         await publishToNats({
        //             commandName: 'cmdWriteExtendedSettings',
        //             command: 12,
        //             device_id: deviceSetting.device_id
        //         })
        //     }
        // }).catch(e => res.send({success: false, error: e}))
        //
        //
        // return res.send({success: true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const receiveDateTime = async (req, res) => {
    try {
        const {device_id, token} = req.query;

        const point = await CarWashPoint.findOne({
            where: {token}
        })

        if (!point) return res.send({success: false, msg: 'Not found'})

        const nc = await connect({
            servers: process.env.NATS_SERVER,
            user: process.env.NATS_USERNAME,
            pass: process.env.NATS_PASSWORD,
        });

        let date = new Date().toISOString().replaceAll('-', '');

        nc.publish(`${constants.listOfCommands.DATETIME_SET}${token}`, sc.encode(date));

        const sub = nc.subscribe(`${constants.listOfSubjects.DATETIME_SET}`);
        (async () => {
            for await (const m of sub) {
                let response = JSON.parse(sc.decode(m.data))
                if (response.token === token) {
                    response.result.forEach(async dev => {
                        if (dev.success) {
                            const deviceSetting = await DeviceSettings.findOne({device_id: dev.id})
                            deviceSetting.dateTime = date;

                            await deviceSetting.save()
                            return res.send({success: true, date})
                        } else {
                            res.send({success: false})
                        }
                    })
                }
                console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
            }
            console.log("subscription closed");
        })();

        // const device = await CarWashDevice.findByPk(device_id, {
        //     include: [
        //         DeviceSettings
        //     ]
        // })
        //
        // const data = {
        //     success: true,
        //     dateTime: device.DeviceSetting.dateTime
        // }
        //
        // return res.send(data)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const changeDeviceDateTime = async (req, res) => {
    try {
        const {device_id, new_date} = req.body;

        const deviceSetting = await DeviceSettings.findByPk(device_id)

        if (!deviceSetting) return res.send({success: false})

        deviceSetting.set({dateTime: new_date})
        await deviceSetting.save()

        // await publishToNats({commandName: 'cmdSetDateTime', command: 13, device_id})
        return res.send({success: true})

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const disableCarWashDevice = async (req, res) => {
    try {
        const {device_id} = req.body;
        const {id} = req.user;

        const device = await CarWashDevice.findOne({
            where: {
                [Op.and]: [
                    {id: device_id},
                    {technician_id: id}
                ]
            }
        })

        if (!device) return res.send({success: false, msg: 'Not found'})

        device.disable = true
        await device.save()

        // await publishToNats({commandName: 'cmdDeviceDisable', command: 7, device_id})

        return res.send({success: true})

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const enableCarWashDevice = async (req, res) => {
    try {
        const {device_id} = req.body;
        const {id} = req.user;

        const device = await CarWashDevice.findOne({
            where: {
                [Op.and]: [
                    {id: device_id},
                    {technician_id: id}
                ]
            }
        })

        if (!device) return res.send({success: false, msg: 'Not found'})

        device.disable = false
        await device.save()

        // await publishToNats({commandName: 'cmdDeviceEnable', command: 8, device_id})
        return res.send({success: true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getTotalComponents = async (req, res) => {
    try {
        const {role} = req.user;

        if (role === constants.userTypes.USER) return res.status(403).send({success: false})

        const totalComponents = await TotalComponent.findAll()

        return res.send(totalComponents)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const addComponentToTotal = async (req, res) => {
    try {
        const {name_am, name_ru, name_en} = req.body;

        const component = await TotalComponent.create({name_am, name_ru, name_en})

        return res.send({success: true, component})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const editComponentFromTotal = async (req, res) => {
    try {
        const {id, name_am, name_ru, name_en} = req.body;

        const component = await TotalComponent.findByPk(id)

        if (!component) return res.send({success: false, msg: "Not found"})

        component.name_am = name_am;
        component.name_ru = name_ru;
        component.name_en = name_en;
        await component.save()

        return res.send({success: true, component})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const removeComponentFromTotal = async (req, res) => {
    try {
        const {id} = req.body;

        const component = await TotalComponent.findByPk(id)

        if (!component) return res.send({success: false, msg: "Not found"})

        await component.destroy()

        return res.send({success: true})

    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    getCommands,
    getCounters,
    getCounter,
    updateCounters,
    confirmCountersReset,
    confirmServiceReset,
    freeModeFlags,
    deviceDisabledFlags,
    sendBasicSettings,
    receiveBasicSettings,
    sendExtendedSettings,
    receiveDateTime,
    getTotalComponents,
    addComponentToTotal,
    editComponentFromTotal,
    removeComponentFromTotal,
    disableCarWashDevice,
    enableCarWashDevice,
    changeDeviceDateTime,
    receiveExtendedSettings
}