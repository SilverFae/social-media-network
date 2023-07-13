const router = require('express').Router();
const thoughtsRoute = require('./thought-route');
const userRoute = require('./user-route');

router.use('/thoughts', thoughtsRoute);
router.use('/users', userRoute);

module.exports = router;
