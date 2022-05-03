const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth')
const carWashController = require('../controllers/carWashController')

router.post('/car-wash/create', authMiddleware.technicianRole, carWashController.addACarWash)
router.post('/car-wash/remove', authMiddleware.technicianRole, carWashController.removeTheCarWash)
router.post('/car-wash/device/create', authMiddleware.technicianRole, carWashController.addACarWashDevice)
router.post('/car-wash/device/remove', authMiddleware.technicianRole, carWashController.removeTheCarWashDevice)
router.post('/car-wash/change-name', authMiddleware.userRole, carWashController.changeName)

module.exports = router;