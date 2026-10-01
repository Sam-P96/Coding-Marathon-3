const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {
        expiresIn: "3d"
    })
}

const signupUser = async (req, res) => {
    const { name, username, password, phone_number, licenseNumber, date_of_birth, address } = req.body;
    try {
        //Check missing info
        if (!username || !name || !password) {
            res.status(400);
            throw new Error("Please add all fields");
        }

        // Is the username taken?
        const userExists = await User.findOne({username})

        if (userExists) {
            res.status(400);
            throw new Error("User already exists")
        }

        // Hash the password, remember to use genSalt and NOT genSalt**Sync**
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            username,
            password: hashedPassword,
            phone_number,
            licenseNumber,
            date_of_birth,
            address,
        });

        // Send back a token
        if (user) {
            const token = generateToken(user._id);
            res.status(201).json({ username, token })
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);
            res.status(200).json({username, token});
        } else {
            res.status(400);
            throw new Error("Invalid credentials")
        }
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// *********************************************



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/users DONT USE THIS!!!
const createUser = async (req, res) => {
  const { name, username, password, phone_number, licenseNumber, date_of_birth, address } = req.body;
  try {
    const user = await User.create({ name, username, password, phone_number, licenseNumber, date_of_birth, address });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/users/:userId
const getUserById = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: 'User not found' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/users/:userId
const updateUser = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: 'User not found' });
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { ...req.body },
      { new: true, returnDocument: 'after' }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/users/:userId
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: 'User not found' });
  }
  try {
    const user = await User.findOneAndDelete({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}





// *********************************************
module.exports = {
    signupUser,
    loginUser,
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
}, User;