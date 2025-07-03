const express = require('express');
const router = express.Router();

// Mock controller functions - to be implemented
const getAllRehearsals = (req, res) => {
  res.status(200).json({ 
    rehearsals: [
      { id: '1', band_id: '1', venue_id: '1', start_time: '2025-08-01T18:00:00Z', end_time: '2025-08-01T20:00:00Z', status: 'scheduled' },
      { id: '2', band_id: '1', venue_id: '2', start_time: '2025-08-08T18:00:00Z', end_time: '2025-08-08T20:00:00Z', status: 'scheduled' }
    ]
  });
};

const getRehearsalById = (req, res) => {
  res.status(200).json({ 
    rehearsal: { id: req.params.id, band_id: '1', venue_id: '1', start_time: '2025-08-01T18:00:00Z', end_time: '2025-08-01T20:00:00Z', status: 'scheduled' }
  });
};

const createRehearsal = (req, res) => {
  res.status(201).json({ 
    message: 'Rehearsal created successfully',
    rehearsal: { id: '3', band_id: req.body.band_id, venue_id: req.body.venue_id, start_time: req.body.start_time, end_time: req.body.end_time, status: 'scheduled' }
  });
};

const updateRehearsal = (req, res) => {
  res.status(200).json({ 
    message: 'Rehearsal updated successfully',
    rehearsal: { id: req.params.id, band_id: req.body.band_id, venue_id: req.body.venue_id, start_time: req.body.start_time, end_time: req.body.end_time, status: req.body.status }
  });
};

const deleteRehearsal = (req, res) => {
  res.status(200).json({ 
    message: 'Rehearsal deleted successfully'
  });
};

// Routes
router.get('/', getAllRehearsals);
router.get('/:id', getRehearsalById);
router.post('/', createRehearsal);
router.put('/:id', updateRehearsal);
router.delete('/:id', deleteRehearsal);

module.exports = router;