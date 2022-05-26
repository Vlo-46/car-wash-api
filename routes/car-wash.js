const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth')
const carWashController = require('../controllers/carWashController')

router.get('/car-wash', authMiddleware.isAuth, carWashController.getCarWash)
router.post('/car-wash/change-name', authMiddleware.userRole, carWashController.changeName)
router.get('/car-wash/points/:point_id', authMiddleware.isAuth, carWashController.getSingleCarWashPoint)
router.post('/car-wash/create', authMiddleware.technicianRole, carWashController.addACarWash)
router.post('/car-wash/remove', authMiddleware.technicianRole, carWashController.removeTheCarWash)
router.get('/car-wash/device', authMiddleware.isAuth, carWashController.getCarWashDevices)
router.get('/car-wash/device/:device_id', authMiddleware.isAuth, carWashController.getSingleDevice)
router.post('/car-wash/device/create', authMiddleware.technicianRole, carWashController.addACarWashDevice)
router.post('/car-wash/device/remove', authMiddleware.technicianRole, carWashController.removeTheCarWashDevice)
router.post('/car-wash/device/components', authMiddleware.technicianRole, carWashController.addComponents)
router.post('/car-wash/device/components/edit', authMiddleware.technicianRole, carWashController.editComponent)
router.post('/car-wash/device/components/remove', authMiddleware.technicianRole, carWashController.removeComponent)

module.exports = router;