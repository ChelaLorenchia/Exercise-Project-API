const passport = require('passport');
const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

async function createUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Check if email already taken
    const isEmailTaken = await userService.isEmailTaken(email);
    if (isEmailTaken) {
      return next(errorResponder(errorTypes.EMAIL_ALREADY_TAKEN));
    }

    // Create user
    const user = await usersRepository.createUser(name, email, password);

    // Send response
    res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Check if user with given email already exists
 * @param {string} email - User email
 * @returns {boolean}
 */
async function checkEmailExists(email) {
  const user = await User.findOne({ email });
  return !!user; // Return true if user with given email exists, otherwise false
}

async function changePassword(id, newPassword) {
  return User.updateOne(
    { _id: id},
    {
      $set: {
        password: newPassword,
      },
    }
  );
  }
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkEmailExists, 
  changePassword,
};

