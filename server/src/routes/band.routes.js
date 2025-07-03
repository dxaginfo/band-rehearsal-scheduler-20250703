const express = require('express');
const router = express.Router();

// Mock controller functions - to be implemented
const getAllBands = (req, res) => {
  res.status(200).json({ 
    bands: [
      { id: '1', name: 'Rock Band', leader_id: '123' },
      { id: '2', name: 'Jazz Ensemble', leader_id: '456' }
    ]
  });
};

const getBandById = (req, res) => {
  res.status(200).json({ 
    band: { id: req.params.id, name: 'Rock Band', leader_id: '123' }
  });
};

const createBand = (req, res) => {
  res.status(201).json({ 
    message: 'Band created successfully',
    band: { id: '3', name: req.body.name, leader_id: '123' }
  });
};

const updateBand = (req, res) => {
  res.status(200).json({ 
    message: 'Band updated successfully',
    band: { id: req.params.id, name: req.body.name, leader_id: '123' }
  });
};

const deleteBand = (req, res) => {
  res.status(200).json({ 
    message: 'Band deleted successfully'
  });
};

// Routes
router.get('/', getAllBands);
router.get('/:id', getBandById);
router.post('/', createBand);
router.put('/:id', updateBand);
router.delete('/:id', deleteBand);

module.exports = router;