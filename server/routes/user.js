import {Router} from 'express';
import {login, register} from "../controllers/user.js";
import {check} from "express-validator";

const router = Router()

router.post('/login', [
    check('email', 'Incorrect email').isEmail().normalizeEmail(),
    check('password', 'Minimum password length 6 characters').isLength({min: 6})
], login)
router.post('/register', [
    check('email', 'Incorrect email').isEmail().normalizeEmail(),
    check('password', 'Minimum password length 6 characters').isLength({min: 6})
], register)

export default router