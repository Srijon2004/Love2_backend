// const express = require("express");
// const auth = require("../middleware/auth");
// const User = require("../models/User");

// const router = express.Router();

// // Save girlfriend details (authenticated)
// router.post("/girlfriend", auth, async (req, res) => {
//   try {
//     const { name, photo, details } = req.body;

//     if (!name) {
//       return res.status(400).json({ message: "Girlfriend name is required" });
//     }

//     // Find user
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Update or insert girlfriend data
//     user.girlfriend = {
//       name,
//       photo: photo || "",
//       details: details || "",
//     };

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Girlfriend details saved successfully ✅",
//       data: {
//         userId: user._id,       
//         username: user.username,
//         girlfriend: user.girlfriend,
//       },
//     });
//   } catch (err) {
//     console.error("Error saving girlfriend:", err.message);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Get girlfriend details by username (public)
// router.get("/propose/:username", async (req, res) => {
//   try {
//     const { username } = req.params;
//     const user = await User.findOne({ username }).select("girlfriend username");
//     if (!user || !user.girlfriend || !user.girlfriend.name)
//       return res
//         .status(404)
//         .json({ message: "No proposal found for this user" });
//     res.json({ username: user.username, girlfriend: user.girlfriend });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router; // only once at the end























// const express = require("express");
// const auth = require("../middleware/auth");
// const User = require("../models/User");

// const router = express.Router();

// // ----------------------------
// // Add a new girlfriend link
// // ----------------------------
// router.post("/girlfriend", auth, async (req, res) => {
//   try {
//     const { name, photo, details } = req.body;

//     if (!name) {
//       return res.status(400).json({ message: "Girlfriend name is required" });
//     }

//     // Find user
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Create new girlfriend object
//     const newGirlfriend = {
//       name,
//       photo: photo || "",
//       details: details || "",
//     };

//     // Add to user's girlfriends array
//     user.girlfriends.push(newGirlfriend);
//     await user.save();

//     res.status(201).json({
//       success: true,
//       message: "Girlfriend link added successfully ✅",
//       data: {
//         userId: user._id,
//         username: user.username,
//         girlfriend: newGirlfriend,
//       },
//     });
//   } catch (err) {
//     console.error("Error saving girlfriend:", err.message);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ----------------------------
// // Get all girlfriend links by username (public)
// // ----------------------------
// router.get("/propose/:username", async (req, res) => {
//   try {
//     const { username } = req.params;
//     const user = await User.findOne({ username }).select("girlfriends username");

//     if (!user || user.girlfriends.length === 0) {
//       return res.status(404).json({ message: "No proposals found for this user" });
//     }

//     res.json({ username: user.username, girlfriends: user.girlfriends });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });



// // 












// // Get a specific girlfriend by ID
// router.get("/propose/:username/:girlfriendId", async (req, res) => {
//   try {
//     const { username, girlfriendId } = req.params;
//     const user = await User.findOne({ username }).select("girlfriends username");

//     if (!user || !user.girlfriends || user.girlfriends.length === 0) {
//       return res.status(404).json({ message: "No proposals found for this user" });
//     }

//     const gf = user.girlfriends.id(girlfriendId); // find by _id
//     if (!gf) return res.status(404).json({ message: "Girlfriend not found" });

//     res.json({ username: user.username, girlfriend: gf });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });
// module.exports = router;



















// const express = require("express");
// const auth = require("../middleware/auth");
// const User = require("../models/User");

// const router = express.Router();

// // Add a new girlfriend
// router.post("/girlfriend", auth, async (req, res) => {
//   try {
//     const { name, photo, details } = req.body;
//     if (!name) return res.status(400).json({ message: "Girlfriend name is required" });

//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const newGirlfriend = { name, photo: photo || "", details: details || "" };
//     user.girlfriends.push(newGirlfriend);
//     await user.save();

//     // Return the newly added girlfriend including its _id
//     const addedGirlfriend = user.girlfriends[user.girlfriends.length - 1];

//     res.status(201).json({
//       success: true,
//       message: "Girlfriend link added successfully ✅",
//       data: {
//         userId: user._id,
//         username: user.username,
//         girlfriend: addedGirlfriend,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Get all girlfriends by username
// router.get("/propose/:username", async (req, res) => {
//   try {
//     const { username } = req.params;
//     const user = await User.findOne({ username }).select("girlfriends username");

//     if (!user || user.girlfriends.length === 0) {
//       return res.status(404).json({ message: "No proposals found for this user" });
//     }

//     res.json({ username: user.username, girlfriends: user.girlfriends });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// // Get a single girlfriend by ID (for unique link)
// // In user.js
// router.get("/propose/:username/:girlfriendId", async (req, res) => {
//   try {
//     const { username, girlfriendId } = req.params;
//     const user = await User.findOne({ username }).select("girlfriends username");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     const gf = user.girlfriends.id(girlfriendId);
//     if (!gf) return res.status(404).json({ message: "Girlfriend not found" });

//     res.json({ username: user.username, girlfriend: gf });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router;


















// const express = require("express");
// const auth = require("../middleware/auth");
// const User = require("../models/User");

// const router = express.Router();

// // router.get("/my-proposals", auth, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.user.id).select("girlfriends");
// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }
// //     // This now correctly returns the proposals for the logged-in user
// //     res.json({ girlfriends: user.girlfriends });
// //   } catch (err) {
// //     console.error("Error fetching user proposals:", err.message);
// //     res.status(500).send("Server Error");
// //   }
// // });

// router.get("/my-proposals", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("girlfriends");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ girlfriends: user.girlfriends });
//   } catch (err) {
//     console.error("Error fetching user proposals:", err.message);
//     res.status(500).send("Server Error");
//   }
// });




// // Add a new girlfriend
// // router.post("/girlfriend", auth, async (req, res) => {
// //   try {
// //     const { name, photo, details } = req.body;
// //     if (!name) return res.status(400).json({ message: "Girlfriend name is required" });

// //     const user = await User.findById(req.user.id);
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     const newGirlfriend = { name, photo: photo || "", details: details || "" };
// //     user.girlfriends.push(newGirlfriend);
// //     await user.save();

// //     // Return the newly added girlfriend including its _id
// //     const addedGirlfriend = user.girlfriends[user.girlfriends.length - 1];

// //     res.status(201).json({
// //       success: true,
// //       message: "Girlfriend link added successfully ✅",
// //       data: {
// //         userId: user._id,
// //         username: user.username,
// //         girlfriend: addedGirlfriend,
// //       },
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });



// router.post("/girlfriend", auth, async (req, res) => {
//   try {
//     const { name, photo, details } = req.body;
//     if (!name) return res.status(400).json({ message: "Girlfriend name is required" });

//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const newGirlfriend = { name, photo: photo || "", details: details || "" };
//     user.girlfriends.push(newGirlfriend);
//     await user.save();
    
//     const addedGirlfriend = user.girlfriends[user.girlfriends.length - 1];

//     res.status(201).json({
//       success: true,
//       message: "Girlfriend link added successfully ✅",
//       data: {
//         username: user.username,
//         girlfriend: addedGirlfriend,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });











// // Get all girlfriends by username
// router.get("/propose/:username", async (req, res) => {
//   try {
//     const { username } = req.params;
//     const user = await User.findOne({ username }).select("girlfriends username");

//     if (!user || user.girlfriends.length === 0) {
//       return res.status(404).json({ message: "No proposals found for this user" });
//     }

//     res.json({ username: user.username, girlfriends: user.girlfriends });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// // Get a single girlfriend by ID (for unique link)
// // router.get("/propose/:username/:girlfriendId", async (req, res) => {
// //   try {
// //     const { username, girlfriendId } = req.params;
// //     const user = await User.findOne({ username }).select("girlfriends username");

// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     const gf = user.girlfriends.id(girlfriendId);
// //     if (!gf) return res.status(404).json({ message: "Girlfriend not found" });

// //     res.json({ username: user.username, girlfriend: gf });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Server error");
// //   }
// // });

// router.get("/propose/:username/:girlfriendId", async (req, res) => {
//   try {
//     const { username, girlfriendId } = req.params;
//     const user = await User.findOne({ username }).select("girlfriends username");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     const gf = user.girlfriends.id(girlfriendId);
//     if (!gf) return res.status(404).json({ message: "Girlfriend not found" });

//     res.json({ username: user.username, girlfriend: gf });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });





// // router.delete("/girlfriend/:girlfriendId", auth, async (req, res) => {
// //   try {
// //     const { girlfriendId } = req.params;
// //     const user = await User.findById(req.user.id);

// //     if (!user) {
// //         return res.status(404).json({ message: "User not found" });
// //     }

// //     // Pull the girlfriend from the array
// //     user.girlfriends.pull({ _id: girlfriendId });
// //     await user.save();
    
// //     res.status(200).json({ success: true, message: "Proposal deleted successfully" });
// //   } catch(err) {
// //     console.error("Error deleting girlfriend:", err.message);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });






// // backend/routes/user.js

// router.delete("/girlfriend/:girlfriendId", auth, async (req, res) => {
//     try {
//       const { girlfriendId } = req.params;
//       const user = await User.findById(req.user.id);
  
//       if (!user) {
//           return res.status(404).json({ message: "User not found" });
//       }
  
//       // Pull the girlfriend from the array
//       user.girlfriends.pull({ _id: girlfriendId });
//       await user.save();
      
//       res.status(200).json({ success: true, message: "Proposal deleted successfully" });
//     } catch(err) {
//       console.error("Error deleting girlfriend:", err.message);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   });




// router.get("/girlfriend/:girlfriendId", auth, async (req, res) => {
//   try {
//     const { girlfriendId } = req.params;
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const girlfriend = user.girlfriends.id(girlfriendId);
//     if (!girlfriend) {
//       return res.status(404).json({ message: "Proposal not found" });
//     }

//     res.json(girlfriend);
//   } catch (err) {
//     console.error("Error fetching girlfriend details:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// // ------------------------------------------
// // NEW: UPDATE a girlfriend's details (secure)
// // ------------------------------------------
// router.put("/girlfriend/:girlfriendId", auth, async (req, res) => {
//   try {
//     const { girlfriendId } = req.params;
//     const { name, photo, details } = req.body;

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const girlfriend = user.girlfriends.id(girlfriendId);
//     if (!girlfriend) {
//       return res.status(404).json({ message: "Proposal not found" });
//     }

//     // Update the fields
//     girlfriend.name = name || girlfriend.name;
//     girlfriend.photo = photo || girlfriend.photo;
//     girlfriend.details = details || girlfriend.details;

//     await user.save();

//     res.json({ success: true, message: "Proposal updated successfully!", girlfriend });
//   } catch (err) {
//     console.error("Error updating girlfriend:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });











// module.exports = router;





























































const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// router.get("/my-proposals", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("girlfriends");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     // This now correctly returns the proposals for the logged-in user
//     res.json({ girlfriends: user.girlfriends });
//   } catch (err) {
//     console.error("Error fetching user proposals:", err.message);
//     res.status(500).send("Server Error");
//   }
// });





router.get("/my-proposals", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("girlfriends username");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ girlfriends: user.girlfriends, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Add a new girlfriend
router.post("/girlfriend", auth, async (req, res) => {
  try {
    const { name, photo, details } = req.body;
    if (!name) return res.status(400).json({ message: "Girlfriend name is required" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newGirlfriend = { name, photo: photo || "", details: details || "" };
    user.girlfriends.push(newGirlfriend);
    await user.save();

    const addedGirlfriend = user.girlfriends[user.girlfriends.length - 1];

    res.status(201).json({
      success: true,
      message: "Girlfriend link added successfully ✅",
      data: {
        username: user.username,
        girlfriend: addedGirlfriend,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get a single girlfriend by ID (for unique link)
router.get("/propose/:username/:girlfriendId", async (req, res) => {
  try {
    const { username, girlfriendId } = req.params;
    const user = await User.findOne({ username }).select("girlfriends username");

    if (!user) return res.status(404).json({ message: "User not found" });

    const gf = user.girlfriends.id(girlfriendId);
    if (!gf) return res.status(404).json({ message: "Girlfriend not found" });

    res.json({ username: user.username, girlfriend: gf });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.delete("/girlfriend/:girlfriendId", auth, async (req, res) => {
  try {
    const { girlfriendId } = req.params;
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Pull the girlfriend from the array
    user.girlfriends.pull({ _id: girlfriendId });
    await user.save();

    res.status(200).json({ success: true, message: "Proposal deleted successfully" });
  } catch(err) {
    console.error("Error deleting girlfriend:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/girlfriend/:girlfriendId", auth, async (req, res) => {
  try {
    const { girlfriendId } = req.params;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const girlfriend = user.girlfriends.id(girlfriendId);
    if (!girlfriend) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.json(girlfriend);
  } catch (err) {
    console.error("Error fetching girlfriend details:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/girlfriend/:girlfriendId", auth, async (req, res) => {
  try {
    const { girlfriendId } = req.params;
    const { name, photo, details } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const girlfriend = user.girlfriends.id(girlfriendId);
    if (!girlfriend) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    // Update the fields
    girlfriend.name = name || girlfriend.name;
    girlfriend.photo = photo || girlfriend.photo;
    girlfriend.details = details || girlfriend.details;

    await user.save();

    res.json({ success: true, message: "Proposal updated successfully!", girlfriend });
  } catch (err) {
    console.error("Error updating girlfriend:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;




















