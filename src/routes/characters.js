const {Router} = require('express');
const {
    getAllCharacter, 
    createCharacter, 
    updateCharacter, 
    getCharacter, 
    deleteCharacter,
    uploadImageCharacter
    } = require('../controllers/characters');
const router = Router();
const {postRequestValidations, 
        putRequestValidations, 
        getAllCharactersRequestValidations, 
        getCharacterRequestValidations,
        deleteRequestValidations,
        postImageRequestValidations
        } = require('../middlewares/characters/index');

router.get('/', getAllCharactersRequestValidations, getAllCharacter);
router.post('/', postRequestValidations, createCharacter);
router.put('/:id', putRequestValidations, updateCharacter);
router.get('/:id', getCharacterRequestValidations, getCharacter);
router.delete('/:id', deleteRequestValidations, deleteCharacter);
router.post('/image', postImageRequestValidations, uploadImageCharacter)

module.exports = router;