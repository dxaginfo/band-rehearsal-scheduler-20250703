const express = require('express');
const authRoutes = require('./auth.routes');
const bandRoutes = require('./band.routes');
const rehearsalRoutes = require('./rehearsal.routes');
const venueRoutes = require('./venue.routes');
const setlistRoutes = require('./setlist.routes');

const router = express.Router();

// Mount route groups
router.use('/auth', authRoutes);
router.use('/bands', bandRoutes);
router.use('/rehearsals', rehearsalRoutes);
router.use('/venues', venueRoutes);
router.use('/setlists', setlistRoutes);

module.exports = router;