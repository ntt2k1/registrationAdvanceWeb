import express from 'express';
import { register, login, allUser } from '../controllers/AuthController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', allUser);

export default router;
