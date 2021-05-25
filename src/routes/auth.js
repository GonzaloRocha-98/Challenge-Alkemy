const {Router} = require('express');
const { login } = require('../controllers/auth.js');
const {
        postLoginRequestValidations
        } = require('../middlewares/auth/index');


const router = Router();
router.post('/login', postLoginRequestValidations, login);


module.exports = router;  