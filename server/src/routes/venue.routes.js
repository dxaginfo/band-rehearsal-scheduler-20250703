const express = require('express');
const router = express.Router();

// Mock controller functions - to be implemented
const getAllVenues = (req, res) => {
  res.status(200).json({ 
    venues: [
      { id: '1', name: 'Studio A', address: '123 Music St', capacity: 10, hourly_rate: 50 },
      { id: '2', name: 'Jam Room B', address: '456 Band Ave', capacity: 5, hourly_rate: 30 }
    ]
  });
};

const getVenueById = (req, res) => {
  res.status(200).json({ 
    venue: { id: req.params.id, name: 'Studio A', address: '123 Music St', capacity: 10, hourly_rate: 50 }
  });
};

const createVenue = (req, res) => {
  res.status(201).json({ 
    message: 'Venue created successfully',
    venue: { id: '3', name: req.body.name, address: req.body.address, capacity: req.body.capacity, hourly_rate: req.body.hourly_rate }
  });
};

const updateVenue = (req, res) => {
  res.status(200).json({ 
    message: 'Venue updated successfully',
    venue: { id: req.params.id, name: req.body.name, address: req.body.address, capacity: req.body.capacity, hourly_rate: req.body.hourly_rate }
  });
};

const deleteVenue = (req, res) => {
  res.status(200).json({ 
    message: 'Venue deleted successfully'
  });
};

// Routes
router.get('/', getAllVenues);
router.get('/:id', getVenueById);
router.post('/', createVenue);
router.put('/:id', updateVenue);
router.delete('/:id', deleteVenue);

module.exports = router;