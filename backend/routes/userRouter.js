const express = require("express");
const router = express.Router();

const {loginUser, signupUser, getAllUsers, createUser, getUserById, updateUser, deleteUser} = require("../controllers/userControllers");

// login route
router.post("/login", loginUser);

// signin route
router.post("/signup", signupUser);

// GET /api/user
router.get('/', getAllUsers);

// POST /api/user
router.post('/', createUser);

// GET /api/user/:userId
router.get('/:userId', getUserById);

// PUT /api/user/:userId
router.put('/:userId', updateUser);

// DELETE /api/user/:userId
router.delete('/:userId', deleteUser);


module.exports = router;