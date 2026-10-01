const express = require('express');
const router = express.Router();
const {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
} = require('../controllers/vehicleRentalControllers');

const requireAuth = require('../middleware/requireAuth');

// GET /api/vehicleRentals
router.get('/', getAllVehicleRentals);

// GET /api/vehicleRentals/:vehicleRentalId
router.get('/:vehicleRentalId', getVehicleRentalById);

router.use(requireAuth);

// PUT /api/vehicleRentals/:vehicleRentalId
router.put('/:vehicleRentalId', updateVehicleRental);

// DELETE /api/vehicleRentals/:vehicleRentalId
router.delete('/:vehicleRentalId', deleteVehicleRental);

// POST /api/vehicleRentals
router.post('/', createVehicleRental);
module.exports = router;
