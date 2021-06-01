const {Router} = require('express');
const {
    getAllGender, 
    createGender, 
    updateGender, 
    getGender, 
    deleteGender,
    uploadImageGender
    } = require('../controllers/genders');
const router = Router();
const {postRequestValidations, 
        putRequestValidations, 
        getAllGendersRequestValidations, 
        getGenderRequestValidations,
        deleteRequestValidations,
        postImageRequestValidations
        } = require('../middlewares/genders/index');

router.get('/', getAllGendersRequestValidations, getAllGender);
router.post('/', postRequestValidations, createGender);
router.put('/:id', putRequestValidations, updateGender);
router.get('/:id', getGenderRequestValidations, getGender);
router.delete('/:id', deleteRequestValidations, deleteGender);
router.post('/image', postImageRequestValidations, uploadImageGender)

module.exports = router;