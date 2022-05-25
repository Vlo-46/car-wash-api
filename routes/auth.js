const {Router} = require('express')
const router = Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/auth')

router.post('/login', authController.signIn)
router.get('/users', authMiddleware.isAuth, authController.getUsers)

router.get('/logout', authMiddleware.isAuth, authController.logout)
router.get('/auth/me', authMiddleware.isAuth, authController.getAuth)

router.post('/email', authMiddleware.isAuth, authController.addEmail)
router.post('/change-password', authMiddleware.isAuth, authController.changePassword)

// forgot password by steps

router.post('/forgot-password/email', authController.forgotPasswordSendEmail)
router.post('/forgot-password/confirm-code', authController.confirmTheCodeSentByEmail)
router.post('/forgot-password/change', authController.forgotPassword)

// admin routes

router.post('/admin/create', authMiddleware.adminRole, authController.createAdmin)
router.post('/admin/remove', authMiddleware.adminRole, authController.removeAdmin)
router.post('/technician/create', authMiddleware.adminRole, authController.registerTechnician)
router.post('/technician/deactivate', authMiddleware.adminRole, authController.deactivateTechnicianAccount)
router.post('/technician/activate', authMiddleware.adminRole, authController.activateTechnicianAccount)
router.post('/technician/change-password', authMiddleware.adminRole, authController.changeTechnicianPassword)


// technician routes

router.post('/user/create', authMiddleware.technicianRole, authController.registerUser)
router.post('/user/deactivate', authMiddleware.technicianRole, authController.deactivateUserAccount)
router.post('/user/activate', authMiddleware.technicianRole, authController.activateUserAccount)

module.exports = router