const DeviceSettings = require('../models').deviceSettings
const CarWashPoint = require('../models').carWashPoint
const CarWashDevice = require('../models').carWashDevice
const Counter = require('../models').counters

const constants = require('../utils/constants')

const getCommands = async (req, res) => {
    try {
        const {id} = req.query;

        return res.send({id})
        // return res.send({command: 0})
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

        const counter = await Counter.findByPk(counters[0].id)
        if (!counter) return res.send({success: false})

        counter.coinT = counters[0]?.coin?.t;
        counter.coinD = counters[0]?.coin?.d;
        counter.billT = counters[0]?.bill?.t;
        counter.billD = counters[0]?.bill?.d;
        counter.cashlessT = counters[0]?.cashless?.t;
        counter.cashlessD = counters[0]?.cashless?.d;
        counter.bonusT = counters[0]?.bonus?.t;
        counter.bonusD = counters[0]?.bonus?.d;
        counter.serviceT = counters[0]?.service?.t;
        counter.serviceD = counters[0]?.service?.d;
        counter.chSpentT = counters[0]?.chSpent[0]?.t;
        counter.chSpentD = counters[0]?.chSpent[0]?.d;
        counter.chTimePaidModeT = counters[0]?.chTimePaidMode[0]?.t;
        counter.chTimePaidModeD = counters[0]?.chTimePaidMode[0]?.d;
        counter.chTimeFreeModeT = counters[0]?.chTimeFreeMode[0]?.t;
        counter.chTimeFreeModeD = counters[0]?.chTimeFreeMode[0]?.d;
        counter.powerOnTime = counters[0]?.powerOnTime

        // await counter.save()

        return res.json({counter})
        // return res.send({success: true})
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
                let request = id.find(i => i === result?.filter(r => r.id === i)[0].id)
                let counter = result.find(item => item.id === request)

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
                let request = id.find(i => i === result?.filter(r => r.id === i)[0].id)
                let counter = result.find(item => item.id === request)

                if (!counter) return res.send({success: false})

                counter.serviceT = 0
                counter.serviceD = 0

                await counter.save()

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
            let request = freeModeflag.find(i => i.id === result?.filter(r => r.id === i.id)[0].id)
            let device = result.find(item => item.id === request.id)

            if (!device) return res.send({success: false})

            device.bonusMode = request.flag;

            await device.save()
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
            let request = isDisabled.find(i => i.id === result?.filter(r => r.id === i.id)[0].id)
            let device = result.find(item => item.id === request.id)

            if (!device) return res.send({success: false})

            device.pauseMode = request.flag;

            await device.save()
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

        // await device.save()

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
            data.tariff = [0] // discussion
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
        // bpEn ?
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
        // component ?, and component is array
        if (configs[0]?.screen) device.set({screen: configs[0]?.screen[0]}) // discussion, screen is array
        if (configs[0]?.bonusMode) device.set({bonusMode: configs[0]?.bonusMode})
        if (configs[0]?.pauseMode) device.set({pauseMode: configs[0]?.pauseMode})
        if (configs[0]?.hpt) device.set({hpt: configs[0]?.hpt})
        if (configs[0]?.flowSensor[0]['pulse']) device.set({flowPulse1: configs[0]?.flowSensor[0]['pulse']}) // discussion, flowSensor is array, (flowPulse1, flowPulse2)
        if (configs[0]?.flowSensor[0]['timeout']) device.set({flowTimeout1: configs[0]?.flowSensor[0]['timeout']}) // discussion, flowSensor is array, (flowTimeout1, flowTimeout2)
        // relayOutput ?, and relayOutput is array

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
    receiveDateTime
}