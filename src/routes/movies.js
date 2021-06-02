const {Router} = require('express');
const {
    getAllMovie, 
    createMovie, 
    updateMovie, 
    getMovie, 
    deleteMovie,
    uploadImageMovie,
    assocCharacter
    } = require('../controllers/Movies');
const router = Router();
const {postRequestValidations, 
        putRequestValidations, 
        getAllMoviesRequestValidations, 
        getMovieRequestValidations,
        deleteRequestValidations,
        postImageRequestValidations,
        putAssocRequestValidations
        } = require('../middlewares/Movies/index');

router.get('/', getAllMoviesRequestValidations, getAllMovie);
router.post('/', postRequestValidations, createMovie);
router.put('/:id', putRequestValidations, updateMovie);
router.get('/:id', getMovieRequestValidations, getMovie);
router.delete('/:id', deleteRequestValidations, deleteMovie);
router.post('/image', postImageRequestValidations, uploadImageMovie);
router.put('/:idMovie/character/:idCharacter', putAssocRequestValidations, assocCharacter);

module.exports = router;