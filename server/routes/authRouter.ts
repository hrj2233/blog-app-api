import express from 'express';
import authController from '../controllers/authController';
import auth from '../middleware/auth';
import { validRegister } from '../middleware/vaild';

const router = express.Router();

router.post('/register', validRegister, authController.register);
router.post('/active', authController.activeAccount);
router.post('/login', authController.login);
router.get('/logout', auth, authController.logout);
router.get('/refresh_token', authController.refreshToken);
router.post('/google_login', authController.googleLogin);
router.post('/login_sms', authController.loginSMS);
router.post('/sms_verify', authController.smsVerify);
router.post('/forgot_password', authController.forgotPassword);

export default router;
