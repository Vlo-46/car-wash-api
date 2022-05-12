const CarWashPoint = require('../models').carWashPoint
const CarWashDevice = require('../models').carWashDevice
const DeviceSettings = require('../models').deviceSettings
const Counter = require('../models').counters

const {Op} = require("sequelize");

const constants = require('../utils/constants')

const changeName = async (req, res) => {
    try {
        const {id} = req.user;
        const {car_wash_point_name, carWashId} = req.body;
        const carWashPoint = await CarWashPoint.findByPk(carWashId, {
            where: {user_id: id}
        })

        if (!carWashPoint) return res.send({success: false})

        carWashPoint.set({car_wash_point_name})
        await carWashPoint.save()

        return res.send({success: true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getCarWash = async (req, res) => {
    try {
        const {id, role} = req.user;

        let carWashPoints;

        if (role === constants.userTypes.TECHNICIAN) {
            carWashPoints = await CarWashPoint.findAll({
                where: {technician_id: id}
            })
        }

        if (role === constants.userTypes.USER) {
            carWashPoints = await CarWashPoint.findAll({
                where: {user_id: id}
            })
        }

        return res.send(carWashPoints)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getSingleCarWashPoint = async (req, res) => {
    try {
        const {point_id} = req.params;

        const points = await CarWashPoint.findByPk(point_id)

        return res.send(points)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const addACarWash = async (req, res) => {
    try {
        const {user_id} = req.body;
        const {id} = req.user

        const newCarWash = await CarWashPoint.create({
            user_id,
            technician_id: id
        })

        return res.send({success: true, carWashPoint: newCarWash})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const removeTheCarWash = async (req, res) => {
    try {
        const {car_wash_point_id} = req.body;
        const {id} = req.user

        await CarWashPoint.destroy({
            where: {
                [Op.and]: [
                    {id: car_wash_point_id},
                    {technician_id: id}
                ]
            }
        }).then(() => {
            res.send({success: true})
        });

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getCarWashDevices = async (req, res) => {
    try {
        const carWashDevices = await CarWashDevice.findAll({
            where: {technician_id: req.user.id}
        })

        return res.send(carWashDevices)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getSingleDevice = async (req, res) => {
    try {
        const {device_id} = req.params
        const device = await CarWashDevice.findByPk(device_id, {
            include: [
                DeviceSettings, Counter
            ]
        })

        return res.send(device)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const addACarWashDevice = async (req, res) => {
    try {
        const {car_wash_point_id, name} = req.body;
        const {id} = req.user;

        const device = await CarWashDevice.create({
            technician_id: id,
            car_wash_point_id,
            name
        })

        let date = new Date().toISOString().replaceAll('-', '');

        const deviceSettings = await DeviceSettings.create({device_id: device.id, dateTime: date, devID: device.id})
        const deviceCounter = await Counter.create({device_id: device.id})

        return res.send({success: true, device, deviceSettings, deviceCounter})

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const removeTheCarWashDevice = async (req, res) => {
    try {
        const {device_id} = req.body;
        const {id} = req.user;

        await CarWashDevice.destroy({
            where: {
                [Op.and]: [
                    {id: device_id},
                    {technician_id: id}
                ]
            }
        }).then(() => {
            res.send({success: true})
        });

    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    addACarWash,
    removeTheCarWash,
    changeName,
    addACarWashDevice,
    removeTheCarWashDevice,
    getCarWash,
    getCarWashDevices,
    getSingleCarWashPoint,
    getSingleDevice
}