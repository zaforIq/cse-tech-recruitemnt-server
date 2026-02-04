const express = require('express');
const router = express.Router();
const { updateCandidates, getCandidates, getCandidateById } = require('../controllers/candidateController');

router.post('/candidate_update', updateCandidates);
router.get('/candidates', getCandidates);
router.get('/candidates/:id', getCandidateById);

module.exports = router;
