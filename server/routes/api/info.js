const router = require('express').Router();

const ctrl = require('../../controllers');

// ROOT ENDPOINT
router.get('/test', (req, res, next) => {
  res.json({ message: 'Ok' });
});

// GET ALL CARD INFO
router.get('/info', ctrl.getAllInfo);

// GET ONE INFO CARD BY ID
router.get('/info/:id', ctrl.getInfoById);

// CREATE NEW INFO CARD
router.post('/add', ctrl.addInfo);

// EDIT INFO by ID all fields
router.patch('/edit/:id', ctrl.editAllInfo);

// EDIT INFO by ID all only name
router.patch('/edit-name/:id', ctrl.editInfoName);

module.exports = router;
