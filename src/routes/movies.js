const {Router} = require('express');
const {
    getAllMovie, 
    createMovie, 
    updateMovie, 
    getMovie, 
    deleteMovie
    } = require('../controllers/Movies');
const router = Router();
const {postRequestValidations, 
        putRequestValidations, 
        getAllMoviesRequestValidations, 
        getMovieRequestValidations,
        deleteRequestValidations
        } = require('../middlewares/Movies/index');

router.get('/', getAllMoviesRequestValidations, getAllMovie);
router.post('/', postRequestValidations, createMovie);
router.put('/:id', putRequestValidations, updateMovie);
router.get('/:id', getMovieRequestValidations, getMovie);
router.delete('/:id', deleteRequestValidations, deleteMovie);

module.exports = router;