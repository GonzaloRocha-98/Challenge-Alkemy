const {Router} = require('express');
const {
    getAllMovie, 
    createMovie, 
    updateMovie, 
    getMovie, 
    deleteMovie,
    uploadImageMovie
    } = require('../controllers/Movies');
const router = Router();
const {postRequestValidations, 
        putRequestValidations, 
        getAllMoviesRequestValidations, 
        getMovieRequestValidations,
        deleteRequestValidations,
        postImageRequestValidations
        } = require('../middlewares/Movies/index');

router.get('/', getAllMoviesRequestValidations, getAllMovie);
router.post('/', postRequestValidations, createMovie);
router.put('/:id', putRequestValidations, updateMovie);
router.get('/:id', getMovieRequestValidations, getMovie);
router.delete('/:id', deleteRequestValidations, deleteMovie);
router.post('/image', postImageRequestValidations, uploadImageMovie)

module.exports = router;