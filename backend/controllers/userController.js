const User = require("../models/User");

// Add a new girlfriend link
const addGirlfriend = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const newGirlfriend = {
      name: req.body.name,
      photo: req.body.photo,
      details: req.body.details,
    };

    user.girlfriends.push(newGirlfriend); // push new link
    await user.save();

    res.status(201).json({ message: "Link created", link: newGirlfriend });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addGirlfriend };
