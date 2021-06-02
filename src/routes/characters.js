const {Router} = require('express');
const {
    getAllCharacter, 
    createCharacter, 
    updateCharacter, 
    getCharacter, 
    deleteCharacter,
    uploadImageCharacter,
    assocMovie
    } = require('../controllers/characters');
const router = Router();
const {postRequestValidations, 
        putRequestValidations, 
        getAllCharactersRequestValidations, 
        getCharacterRequestValidations,
        deleteRequestValidations,
        postImageRequestValidations,
        putAssocRequestValidations
        } = require('../middlewares/characters/index');

router.get('/', getAllCharactersRequestValidations, getAllCharacter);
router.post('/', postRequestValidations, createCharacter);
router.put('/:id', putRequestValidations, updateCharacter);
router.get('/:id', getCharacterRequestValidations, getCharacter);
router.delete('/:id', deleteRequestValidations, deleteCharacter);
router.post('/image', postImageRequestValidations, uploadImageCharacter);
router.put('/:idCharacter/movie/:idMovie', putAssocRequestValidations, assocMovie);

module.exports = router;