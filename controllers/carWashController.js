const CarWashPoint = require('../models').carWashPoint
const CarWashDevice = require('../models').carWashDevice

const {Op} = require("sequelize");

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

const addACarWashDevice = async (req, res) => {
    try {
        const {car_wash_point_id, name} = req.body;
        const {id} = req.user;

        const device = await CarWashDevice.create({
            technician_id: id,
            car_wash_point_id,
            name
        })

        return res.send({success: true, device})

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

module.exports = {
    addACarWash,
    removeTheCarWash,
    changeName,
    addACarWashDevice,
    removeTheCarWashDevice
}