const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth')
const settingsController = require('../controllers/settingsController')

router.get('/command', settingsController.getCommands)
router.get('/counter', authMiddleware.isAuth, settingsController.getCounters)
router.get('/counters', authMiddleware.isAuth, settingsController.getCounter)
router.put('/counters', authMiddleware.isAuth, settingsController.updateCounters)
router.put('/counters/countersResetConfirm', authMiddleware.isAuth, settingsController.confirmCountersReset)
router.put('/counters/serviceResetConfirm', authMiddleware.isAuth, settingsController.confirmServiceReset)
router.put('/flags/freeMode', authMiddleware.isAuth, settingsController.freeModeFlags)
router.put('/flags/disabled', authMiddleware.technicianRole, settingsController.deviceDisabledFlags)
router.put('/settings/basic',  settingsController.sendBasicSettings)
router.get('/settings/basic', settingsController.receiveBasicSettings)
router.get('/settings/extended', settingsController.receiveExtendedSettings)
router.put('/settings/extended', settingsController.sendExtendedSettings)
router.get('/settings/date', settingsController.receiveDateTime)
router.put('/settings/change-date', settingsController.changeDeviceDateTime)

router.get('/total-components', authMiddleware.isAuth, settingsController.getTotalComponents)
router.post('/total-component', authMiddleware.adminRole, settingsController.addComponentToTotal)
router.post('/total-component/edit', authMiddleware.adminRole, settingsController.editComponentFromTotal)
router.post('/total-component/remove', authMiddleware.adminRole, settingsController.removeComponentFromTotal)

router.post('/car-wash/device/disable', authMiddleware.technicianRole, settingsController.disableCarWashDevice)
router.post('/car-wash/device/enable', authMiddleware.technicianRole, settingsController.enableCarWashDevice)

module.exports = router