const {Router} = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth')
const settingsController = require('../controllers/settingsController')

router.get('/command', authMiddleware.isAuth, settingsController.getCommands)
router.get('/counters', authMiddleware.isAuth, settingsController.getCounters)
router.put('/counters', authMiddleware.isAuth, settingsController.updateCounters)
router.put('/counters/countersResetConfirm', authMiddleware.isAuth, settingsController.confirmCountersReset)
router.put('/counters/serviceResetConfirm', authMiddleware.isAuth, settingsController.confirmServiceReset)
router.put('/flags/freeMode', authMiddleware.isAuth, settingsController.freeModeFlags)
router.put('/flags/disabled', authMiddleware.isAuth, settingsController.deviceDisabledFlags)
router.put('/settings/basic', authMiddleware.isAuth, settingsController.sendBasicSettings)
router.get('/settings/basic', authMiddleware.isAuth, settingsController.receiveBasicSettings)
router.put('/settings/extended', authMiddleware.isAuth, settingsController.sendExtendedSettings)
router.get('/settings/date', authMiddleware.isAuth, settingsController.receiveDateTime)

router.get('/total-components', authMiddleware.isAuth, settingsController.getTotalComponents)
router.post('/total-component', authMiddleware.adminRole, settingsController.addComponentToTotal)
router.post('/total-component/edit', authMiddleware.adminRole, settingsController.editComponentFromTotal)
router.post('/total-component/remove', authMiddleware.adminRole, settingsController.removeComponentFromTotal)

module.exports = router