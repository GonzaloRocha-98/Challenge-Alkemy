const {Router} = require('express');
const { login, register } = require('../controllers/auth.js');
const {
        postLoginRequestValidations,
        postRegisterRequestValidations
        } = require('../middlewares/auth/index');


const router = Router();
router.post('/login', postLoginRequestValidations, login);
router.post('/register', postRegisterRequestValidations, register);


module.exports = router;  