const express = require('express');
const router = express.Router();

// Mock controller functions - to be implemented
const getAllSetlists = (req, res) => {
  res.status(200).json({ 
    setlists: [
      { id: '1', rehearsal_id: '1', name: 'Rock Show Setlist', created_by: '123' },
      { id: '2', rehearsal_id: '2', name: 'Practice Setlist', created_by: '123' }
    ]
  });
};

const getSetlistById = (req, res) => {
  res.status(200).json({ 
    setlist: { 
      id: req.params.id, 
      rehearsal_id: '1', 
      name: 'Rock Show Setlist', 
      created_by: '123',
      items: [
        { id: '1', song_name: 'Song 1', duration_minutes: 4, position: 1 },
        { id: '2', song_name: 'Song 2', duration_minutes: 3, position: 2 },
        { id: '3', song_name: 'Song 3', duration_minutes: 5, position: 3 }
      ]
    }
  });
};

const createSetlist = (req, res) => {
  res.status(201).json({ 
    message: 'Setlist created successfully',
    setlist: { id: '3', rehearsal_id: req.body.rehearsal_id, name: req.body.name, created_by: '123' }
  });
};

const updateSetlist = (req, res) => {
  res.status(200).json({ 
    message: 'Setlist updated successfully',
    setlist: { id: req.params.id, rehearsal_id: req.body.rehearsal_id, name: req.body.name, created_by: '123' }
  });
};

const deleteSetlist = (req, res) => {
  res.status(200).json({ 
    message: 'Setlist deleted successfully'
  });
};

// Routes
router.get('/', getAllSetlists);
router.get('/:id', getSetlistById);
router.post('/', createSetlist);
router.put('/:id', updateSetlist);
router.delete('/:id', deleteSetlist);

module.exports = router;