// const User = require("../models/User");

// // Add a new girlfriend link
// const addGirlfriend = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     const newGirlfriend = {
//       name: req.body.name,
//       photo: req.body.photo,
//       details: req.body.details,
//     };

//     user.girlfriends.push(newGirlfriend); // push new link
//     await user.save();

//     res.status(201).json({ message: "Link created", link: newGirlfriend });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { addGirlfriend };













const User = require("../models/User");

const addGirlfriend = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Fixed _id to id to match your auth middleware
    if (!user) return res.status(404).json({ message: "User not found" });

    // Use req.file.path which contains the Cloudinary URL
    const photoUrl = req.file ? req.file.path : ""; 

    const newGirlfriend = {
      name: req.body.name,
      photo: photoUrl, // Stores the HTTPS link from Cloudinary
      details: req.body.details,
    };

    user.girlfriends.push(newGirlfriend);
    await user.save();

    res.status(201).json({ 
      message: "Link created", 
      link: user.girlfriends[user.girlfriends.length - 1] 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addGirlfriend };