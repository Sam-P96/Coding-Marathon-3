const express = require("express");
const userRouter = express.Router();
const {
    loginUser, 
    signupUser, 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser} = require("../controllers/userControllers");

// login route
userRouter.post("/login", loginUser);

// signin route
userRouter.post("/signup", signupUser);

// GET /api/user
userRouter.get('/', getAllUsers);

// POST /api/user
userRouter.post('/', createUser);

// GET /api/user/:userId
userRouter.get('/:userId', getUserById);

// PUT /api/user/:userId
userRouter.put('/:userId', updateUser);

// DELETE /api/user/:userId
userRouter.delete('/:userId', deleteUser);


module.exports = userRouter;