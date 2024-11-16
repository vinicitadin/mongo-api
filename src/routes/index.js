const express = require('express');
const router = express.Router();
const professionalsRoutes = require('./professionalsRoutes');
const teachersRoutes = require('./teachersRoutes');

router.use(express.json());
router.use('/professionals', professionalsRoutes);
router.use('/teachers', teachersRoutes);

const db = require('../db/db');
db.connect();

module.exports = router;