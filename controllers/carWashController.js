const {Op} = require("sequelize");
const constants = require('../utils/constants')
const uuid = require("uuid");

const User = require("../models").users
const CarWashPoint = require('../models').carWashPoint
const CarWashDevice = require('../models').carWashDevice
const DeviceSettings = require('../models').deviceSettings
const Counter = require('../models').counters
const Component = require('../models').components

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
                where: {technician_id: id},
                // include: [
                //     {
                //         model: User,
                //         as: 'user_info',
                //         attributes: ['id', 'username', 'email']
                //     },
                //     {
                //         model: User,
                //         as: 'technician_info',
                //         attributes: ['id', 'username', 'email']
                //     },
                // ]
            })
        }

        if (role === constants.userTypes.USER) {
            carWashPoints = await CarWashPoint.findAll({
                where: {user_id: id},
                // include: [
                //     {
                //         model: User,
                //         as: 'user_info',
                //         attributes: ['username', 'email']
                //     },
                //     {
                //         model: User,
                //         as: 'technician_info',
                //         attributes: ['username', 'email']
                //     },
                // ]
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

        const point = await CarWashPoint.findOne({
            where: {
                id: point_id,
                [Op.or]: [
                    {user_id: req.user.id},
                    {technician_id: req.user.id},
                ]
            }
        })

        if (!point) return res.send({success: false, msg: 'Not found'})

        return res.send(point)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const addACarWash = async (req, res) => {
    try {
        const {user_id} = req.body;
        const {id} = req.user
        const car_wash_token = uuid.v4();


        const newCarWash = await CarWashPoint.create({
            user_id,
            technician_id: id,
            token: car_wash_token
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
        })

        await CarWashDevice.destroy({
            where: {
                [Op.and]: [
                    {car_wash_point_id},
                    {technician_id: id}
                ]
            }
        })

        res.send({success: true})

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getCarWashDevices = async (req, res) => {
    try {
        const {role} = req.user;

        let carWashDevices = []

        if (role === constants.userTypes.TECHNICIAN) {
            carWashDevices = await CarWashDevice.findAll({
                where: {technician_id: req.user.id}
            })
        }
        if (role === constants.userTypes.USER) {
            let pointsId = []
            const carWashPointIds = await CarWashPoint.findAll({
                where: {
                    user_id: req.user.id
                },
                attributes: ['id']
            })
            carWashPointIds?.forEach(item => {
                pointsId.push(item.id)
            })

            carWashDevices = await CarWashDevice.findAll({
                where: {car_wash_point_id: pointsId}
            })
        }


        if (!carWashDevices) return res.send({success: false, msg: 'Not found'})

        return res.send(carWashDevices)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getSingleDevice = async (req, res) => {
    try {
        const {device_id} = req.params
        const device = await CarWashDevice.findOne({
            where: {
                id: device_id,
            },
            include: [
                DeviceSettings, Counter, Component
            ]
        })

        if (!device) return res.send({success: false, msg: "Not found"})

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
        }).then(async () => {
            const settings = await DeviceSettings.findOne({where: {device_id}})
            const counter = await Counter.findOne({where: {device_id}})
            const component = await Component.findOne({where: {device_id}})

            await settings.destroy()
            await counter.destroy()
            await component.destroy()

            res.send({success: true})
        }).catch(e => res.send({success: false, error: e}))

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const addComponents = async (req, res) => {
    try {
        const {device_id, name_am, name_ru, name_en, value} = req.body;
        const {id} = req.user;

        const device = await CarWashDevice.findOne({
            where: {
                [Op.and]: [
                    {technician_id: id},
                    {id: device_id},
                ]
            }
        })

        if (!device) return res.send({success: false, msg: 'Not found'})
        if (device.disabled) return res.send({success: false, msg: 'Device is disabled'})

        const existComponent = await Component.findOne({
            where: {
                device_id,
                [Op.or]: [
                    {value: {$iLike: value}},
                    {name_am}
                ]
            }
        })

        if (existComponent) return res.send({success: false, msg: 'There is already a component with this value'})

        const component = await Component.create({
            device_id,
            name_am,
            name_ru,
            name_en,
            value
        })

        return res.send(component)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const editComponent = async (req, res) => {
    try {
        const {id, device_id, value, name_am, name_ru, name_en} = req.body;

        const device = await CarWashDevice.findOne({
            where: {
                [Op.and]: [
                    {id: device_id},
                    {technician_id: req.user.id}
                ]
            }
        })

        if (!device) return res.send({success: false, msg: 'Not found'})
        if (device.disabled) return res.send({success: false, msg: 'Device is disabled'})

        const component = await Component.findByPk(id, {
            where: {device_id}
        })

        if (!component) return res.send({success: false})

        const existComponent = await Component.findOne({
            where: {
                device_id,
                [Op.or]: [
                    {value: {$iLike: value}},
                    {name_am}
                ]
            }
        })

        if (existComponent) return res.send({success: false, msg: 'There is already a component with this value'})

        component.set({value})
        component.set({name_am})
        component.set({name_ru})
        component.set({name_en})

        await component.save()

        return res.send({success: true, component})

    } catch (e) {
        console.log('something went wrong', e)
    }
}

const removeComponent = async (req, res) => {
    try {
        const {component_id, device_id} = req.body;
        const {id} = req.user;

        const device = await CarWashDevice.findOne({
            where: {
                [Op.and]: [
                    {technician_id: id},
                    {id: device_id}
                ]
            }
        })

        if (!device) return res.send({success: false})

        const component = await Component.findByPk(component_id)

        await component.destroy()

        return res.send({success: true})


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
    getSingleDevice,
    addComponents,
    editComponent,
    removeComponent,
}