const DeviceSettings = require('../models').deviceSettings
const CarWashPoint = require('../models').carWashPoint
const CarWashDevice = require('../models').carWashDevice
const Counter = require('../models').counters
const TotalComponent = require('../models').total_components

const constants = require('../utils/constants')

const http = require("http");

const getCommands = async (req, res) => {
    try {
        const {id} = req.query;

        const devices = await CarWashDevice.findAll({
            where: {id: JSON.parse(id)}
        })

        let keepAliveAgent = new http.Agent({
            keepAlive: true
        });

        const requestOptions = {
            agent: keepAliveAgent,
            host: 'localhost',
            port: '5000',
            headers: {
                Connection: 'keep-alive'
            }
        }

        const request = http.request(requestOptions, (response) => {

        });

        return res.send({devices, request})
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
        const {id} = req.body;

        // const user_id = req.user.id;
        // const role = req.user.role;
        //
        // if (role !== constants.userTypes.USER) return res.status(403).json({success: false})
        // bug

        const data = {
            "id": [0]
        }

        await Counter.findAll({
            where: {id}
        })
            .then(async result => {
                for (let j = 0; j < id.length; j++) {
                    let counter = result.find(item => item.id === id[j])

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
                }
                return res.send({success: true})
            })
            .catch(e => {
                return res.send({success: false})
            })

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const confirmServiceReset = async (req, res) => {
    try {
        const {id} = req.body;
        const data = {
            "id": [0]
        }

        await Counter.findAll({
            where: {id}
        })
            .then(async result => {
                for (let j = 0; j < id.length; j++) {
                    let counter = result.find(item => item.id === id[j])

                    if (!counter) return res.send({success: false})

                    counter.serviceD = 0

                    await counter.save()
                }

                return res.send({success: true})
            })
            .catch(e => {
                return res.send({success: false})
            })
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const freeModeFlags = async (req, res) => {
    try {
        const {freeModeflag} = req.body;

        // const user_id = req.user.id;
        // const role = req.user.role;
        //
        // if (role !== constants.userTypes.USER) return res.status(403).json({success: false})

        const data = {
            "freeModeflag": [
                {
                    "id": 0,
                    "flag": 0
                }
            ]
        }

        let deviceIds = []

        freeModeflag.forEach(item => deviceIds.push(item.id))

        await DeviceSettings.findAll({
            where: {id: deviceIds}
        }).then(async (result) => {
            for (let j = 0; j < deviceIds.length; j++) {
                let deviceSetting = result.find(item => item.id === deviceIds[j])

                if (!deviceSetting) return res.send({success: false})

                let request = freeModeflag.find(item => item.id === deviceIds[j])

                deviceSetting.bonusMode = request.flag;

                await deviceSetting.save()
            }

            return res.send({success: true})
        }).catch(err => {
            return res.send({success: false})
        })
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deviceDisabledFlags = async (req, res) => {
    try {
        const {isDisabled} = req.body;

        const data = {
            "isDisabled": [
                {
                    "id": 0,
                    "flag": 0
                }
            ]
        }

        let deviceIds = []

        isDisabled.forEach(item => deviceIds.push(item.id))

        await DeviceSettings.findAll({
            where: {id: deviceIds}
        }).then(async (result) => {
            for (let j = 0; j < deviceIds.length; j++) {
                let deviceSetting = result.find(item => item.id === deviceIds[j])

                if (!deviceSetting) return res.send({success: false})

                let request = isDisabled.find(item => item.id === deviceIds[j])

                deviceSetting.pauseMode = request.flag;

                await deviceSetting.save()
            }

            return res.send({success: true})
        }).catch(err => {
            return res.send({success: false})
        })
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const sendBasicSettings = async (req, res) => {
    try {
        const {settings} = req.body;

        const data = {
            "settings": [
                {
                    "id": 0,
                    "tariff": [
                        0
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
                }
            ]
        }

        const device = await DeviceSettings.findByPk(settings[0].id)
        if (!device) return res.send({success: false})

        // tariff ?, and tariff is array
        if (settings[0]?.tariff) device.set({tariffPct: settings[0]?.tariff})
        if (settings[0]?.coinNom) device.set({coinNominal: settings[0]?.coinNom})
        if (settings[0]?.billNom) device.set({billNominal: settings[0]?.billNom})
        if (settings[0]?.bonusP) device.set({bonusPct: settings[0]?.bonusP})
        if (settings[0]?.bonusV) device.set({bonusVal: settings[0]?.bonusV})
        if (settings[0]?.bingoT) device.set({bingoThr: settings[0]?.bingoT})
        if (settings[0]?.bingoV) device.set({bingoVal: settings[0]?.bingoV})
        if (settings[0]?.schedule?.tStart) device.set({tariffSchStart: settings[0]?.schedule?.tStart})
        if (settings[0]?.schedule?.tEnd) device.set({tariffSchEnd: settings[0]?.schedule?.tEnd})
        if (settings[0]?.schedule?.tPct) device.set({tariffPct: settings[0]?.schedule?.tPct})
        if (settings[0]?.schedule?.bStart) device.set({bonusSchStart: settings[0]?.schedule?.bStart})
        if (settings[0]?.schedule?.bEnd) device.set({bonusSchEnd: settings[0]?.schedule?.bEnd})
        if (settings[0]?.schedule?.bPct) device.set({tBonusPct: settings[0]?.schedule?.bPct})
        if (settings[0]?.schedule?.bVal) device.set({tBonusVal: settings[0]?.schedule?.bVal})

        await device.save()

        return res.send({device})
        // return res.send({success: true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const receiveBasicSettings = async (req, res) => {
    try {
        const {id} = req.query;

        // id type: ARRAY OF NUMBERS, description: Device ID
        // [1,2,3]

        let arrayOfDevicesID = JSON.parse(id)

        const devices = await DeviceSettings.findAll({
            where: {device_id: arrayOfDevicesID},
            // where: {
            //     [Op.and]: [
            //         { id: arrayOfDevicesID },
            //         { device_id: arrayOfDevicesID }
            //     ]
            // }
        })

        if (!devices?.length) return res.send({success: false})

        const settings = [];

        devices.forEach(dev => {
            const data = {}
            data.id = dev.device_id;
            data.tariff = dev.tariffPct // discussion
            data.coinNom = dev.coinNominal;
            data.billNom = dev.billNominal;
            data.bonusP = dev.bonusPct;
            data.bonusV = dev.bonusVal;
            data.bingoT = dev.bingoThr;
            data.bingoV = dev.bingoVal;
            data.schedule = {
                tStart: dev.tariffSchStart,
                tEnd: dev.tariffSchEnd,
                tPct: dev.tariffPct,
                bStart: dev.bonusSchStart,
                bEnd: dev.bonusSchEnd,
                bPct: dev.tBonusPct,
                bVal: dev.tBonusVal
            }

            settings.push(data)
        })

        const response = {
            success: true,
            settings
        }

        return res.send(response)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const sendExtendedSettings = async (req, res) => {
    try {
        const {configs} = req.body;
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
                        5
                    ],
                    "component": [
                        0
                    ],
                    "screen": [
                        300
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
                }
            ]
        }

        const device = await DeviceSettings.findByPk(configs[0].id)

        if (!device) return res.send({success: false})

        if (configs[0]?.mode) device.set({mode: configs[0]?.mode})
        // bpEn ? bypasenable
        if (configs[0]?.bpEn) device.set({bypass: configs[0]?.bpEn})
        if (configs[0]?.bpTime) device.set({bpTime: configs[0].bpTime})
        if (configs[0]?.bpCh) device.set({bypassChann: configs[0].bpCh[0]}) // discussion, bypassChann is array
        if (configs[0]?.service) device.set({service: configs[0].service})
        if (configs[0]?.hopper?.enabled) device.set({hopper: configs[0].hopper.enabled})
        if (configs[0]?.hopper?.nominal) device.set({hopperNominal: configs[0].hopper.nominal})
        if (configs[0]?.hopper?.threshold) device.set({hopperThreshold: configs[0].hopper.threshold})
        if (configs[0]?.valve?.period) device.set({valveP: configs[0].valve.period})
        if (configs[0]?.valve?.duration) device.set({ValveD: configs[0].valve.duration})
        if (configs[0]?.valve?.count) device.set({ValveC: configs[0].valve.count})
        if (configs[0]?.language) device.set({language: configs[0]?.language})
        if (configs[0]?.currency) device.set({currency: configs[0]?.currency})
        if (configs[0]?.dColor) device.set({digColor: configs[0]?.dColor})
        if (configs[0]?.color) device.set({colors: configs[0]?.color[0]}) // discussion, colors is array
        // component ?, and component is array,, ...name
        if (configs[0]?.screen) device.set({screen: configs[0]?.screen[0]}) // discussion, screen is array
        if (configs[0]?.bonusMode) device.set({bonusMode: configs[0]?.bonusMode})
        if (configs[0]?.pauseMode) device.set({pauseMode: configs[0]?.pauseMode})
        if (configs[0]?.hpt) device.set({hpt: configs[0]?.hpt})
        if (configs[0]?.flowSensor[0]['pulse']) device.set({flowPulse1: configs[0]?.flowSensor[0]['pulse']}) // discussion, flowSensor is array, (flowPulse1, flowPulse2)
        if (configs[0]?.flowSensor[0]['timeout']) device.set({flowTimeout1: configs[0]?.flowSensor[0]['timeout']}) // discussion, flowSensor is array, (flowTimeout1, flowTimeout2)
        // relayOutput ?, and relayOutput is array  tables , orinak jur - channels 1234

        await device.save()

        return res.send({device})
        // return res.send({success: true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const receiveDateTime = async (req, res) => {
    try {
        const {device_id} = req.query;

        const device = await CarWashDevice.findByPk(device_id, {
            include: [
                DeviceSettings
            ]
        })


        const data = {
            success: true,
            dateTime: device.DeviceSetting.dateTime
        }

        return res.send(data)
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
        const {name} = req.body;

        const component = await TotalComponent.create({name})

        return res.send({success: true, component})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const editComponentFromTotal = async (req, res) => {
    try {
        const {id, name} = req.body;

        const component = await TotalComponent.findByPk(id)

        if (!component) return res.send({success: false, msg: "Not found"})

        component.name = name;
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
    removeComponentFromTotal
}