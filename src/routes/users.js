const {Router} = require('express');
const {
    getAllUsers, 
    createUser, 
    updateUser, 
    getUser, 
    deleteUser
    } = require('../controllers/users');
const router = Router();
const {postRequestValidations, 
        putRequestValidations, 
        getAllUsersRequestValidations, 
        getUserRequestValidations,
        deleteRequestValidations
        } = require('../middlewares/users/index');

router.get('/', getAllUsersRequestValidations, getAllUsers);
router.post('/', postRequestValidations, createUser);
router.put('/:id', putRequestValidations, updateUser);
router.get('/:id', getUserRequestValidations, getUser);
router.delete('/:id', deleteRequestValidations, deleteUser);

module.exports = router;