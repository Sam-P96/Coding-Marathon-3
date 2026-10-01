const VehicleRental = require('../models/vehicleRentalModel');
const mongoose = require('mongoose');

// CHECK THE SCHEMA!!

// GET /api/vehicleRentals
const getAllVehicleRentals = async (req, res) => {
  try {
    const vehicleRentals = await VehicleRental.find({}).sort({ createdAt: -1 });
    res.status(200).json(vehicleRentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/vehicleRentals
const createVehicleRental = async (req, res) => {
  const { vehicleModel, category, description, agency, location, dailyPrice, listingDate, availabilityStatus, bookingDeadline, insurancePolicy } = req.body;
  try {
    const vehicleRental = await VehicleRental.create({ vehicleModel, category, description, agency, location, dailyPrice, listingDate, availabilityStatus, bookingDeadline, insurancePolicy });
    res.status(201).json(vehicleRental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/vehicleRentals/:vehicleRentalId
const getVehicleRentalById = async (req, res) => {
  const { vehicleRentalId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
    return res.status(404).json({ error: 'VehicleRental not found' });
  }
  try {
    const vehicleRental = await VehicleRental.findById(vehicleRentalId);
    if (!vehicleRental) {
      return res.status(404).json({ error: 'VehicleRental not found' });
    }
    res.status(200).json(vehicleRental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/vehicleRentals/:vehicleRentalId
const updateVehicleRental = async (req, res) => {
  const { vehicleRentalId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
    return res.status(404).json({ error: 'VehicleRental not found' });
  }
  try {
    const vehicleRental = await VehicleRental.findOneAndUpdate(
      { _id: vehicleRentalId },
      { ...req.body },
      { new: true, returnDocument: 'after' }
    );
    if (!vehicleRental) {
      return res.status(404).json({ error: 'VehicleRental not found' });
    }
    res.status(200).json(vehicleRental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/vehicleRentals/:vehicleRentalId
const deleteVehicleRental = async (req, res) => {
  const { vehicleRentalId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
    return res.status(404).json({ error: 'VehicleRental not found' });
  }
  try {
    const vehicleRental = await VehicleRental.findOneAndDelete({ _id: vehicleRentalId });
    if (!vehicleRental) {
      return res.status(404).json({ error: 'VehicleRental not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
}, VehicleRental;

