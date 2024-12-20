const express = require('express');
const router = express.Router();
const professionalsRoutes = require('./professionalsRoutes');
const teachersRoutes = require('./teachersRoutes');
const studentsRoutes = require('./studentsRoutes');
const usersRoutes = require('./usersRoutes');
const eventsRoutes = require('./eventsRoutes');
const appointmentsRoutes = require('./appointmentsRoutes');

router.use(express.json());
router.use('/professionals', professionalsRoutes);
router.use('/teachers', teachersRoutes);
router.use('/students', studentsRoutes);
router.use('/users', usersRoutes);
router.use('/events', eventsRoutes);
router.use('/appointments', appointmentsRoutes);

const db = require('../db/db');
db.connect();

module.exports = router;
