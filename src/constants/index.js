const USER_ROLE = 'USER_ROLE';
const ADMIN_ROLE = 'ADMIN_ROLE';
const ROLES = [USER_ROLE, ADMIN_ROLE];
const USER_FILTERS = [ "name", "username", "email", "role"];
const CHARACTER_FILTERS = ['name', 'age', 'weight', 'movies'];
const MOVIE_FILTERS = ['title', 'order', 'gender'];

module.exports = {
    CHARACTER_FILTERS,
    ROLES,
    ADMIN_ROLE,
    USER_ROLE,
    USER_FILTERS,
    MOVIE_FILTERS
}