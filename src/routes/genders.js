const {Router} = require('express');
const {
    getAllGender, 
    createGender, 
    updateGender, 
    getGender, 
    deleteGender
    } = require('../controllers/genders');
const router = Router();
const {postRequestValidations, 
        putRequestValidations, 
        getAllGendersRequestValidations, 
        getGenderRequestValidations,
        deleteRequestValidations
        } = require('../middlewares/genders/index');

router.get('/', getAllGendersRequestValidations, getAllGender);
router.post('/', postRequestValidations, createGender);
router.put('/:id', putRequestValidations, updateGender);
router.get('/:id', getGenderRequestValidations, getGender);
router.delete('/:id', deleteRequestValidations, deleteGender);

module.exports = router;