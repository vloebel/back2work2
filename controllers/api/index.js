const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const meetingRoutes = require('./meeting-routes.js');
const participantRoutes = require('./participant-routes.js');

router.use('/users', userRoutes);
router.use('/meetings', meetingRoutes);
router.use('/participants', participantRoutes);

module.exports = router;
