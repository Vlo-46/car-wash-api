const jwt = require('jsonwebtoken');
const constants = require('../utils/constants')

const User = require('../models').users

const adminRole = async (req, res, next) => {
    try {
        let authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.sendStatus(403)
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(403)
            }
            if (decoded.role !== constants.userTypes.ADMIN) {
                return res.sendStatus(403)
            }
            const candidate = await User.findByPk(decoded.id)
            if (!candidate) return res.send({error: 'Something went wrong'})
            if (candidate.token !== token) {
                candidate.set({token: null})
                await candidate.save();
                return res.send('Your token expired, please sign in again')
            }
            req.user = decoded;
            return next();
        })
    } catch (e) {
        console.log(e)
    }
}

const userRole = async (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(403)
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.sendStatus(403)
        }
        if (decoded.role !== constants.userTypes.USER) {
            return res.sendStatus(403)
        }
        const candidate = await User.findByPk(decoded.id)
        if (!candidate) return res.send({error: 'Something went wrong'})
        if (candidate.token !== token) {
            candidate.set({token: null})
            await candidate.save();
            return res.send('Your token expired, please sign in again')
        }
        if (!candidate.active) return res.send('You account is deactivated')
        req.user = decoded;
        return next();
    })
}

const technicianRole = async (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(403)
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.sendStatus(403)
        }
        if (decoded.role !== constants.userTypes.TECHNICIAN) {
            return res.sendStatus(403)
        }
        const candidate = await User.findByPk(decoded.id)
        if (!candidate) return res.send({error: 'Something went wrong'})
        if (candidate.token !== token) {
            candidate.set({token: null})
            await candidate.save();
            return res.send('Your token expired, please sign in again')
        }
        if (!candidate.active) return res.send('You account is deactivated')
        req.user = decoded;
        return next();
    })
}

const isAuth = async (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(403)
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.sendStatus(403)
        }
        const candidate = await User.findByPk(decoded.id)
        if (!candidate) return res.send({error: 'Something went wrong'})
        if (candidate.token !== token) {
            candidate.set({token: null})
            await candidate.save();
            return res.send('Your token expired, please sign in again')
        }
        if (!candidate.active) return res.send('You account is deactivated')
        req.user = decoded;
        return next();
    })
}

module.exports = {
    adminRole,
    userRole,
    technicianRole,
    isAuth
}