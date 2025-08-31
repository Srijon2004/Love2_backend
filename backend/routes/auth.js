const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashed });
    await user.save();

    const payload = { user: { id: user.id, username: user.username } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send ID in response
    res
      .cookie("token", token, { httpOnly: true, sameSite: "lax" })
      .json({ id: user._id, username: user.username, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});




// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = { user: { id: user.id, username: user.username } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // res
    //   .cookie("token", token, { httpOnly: true, sameSite: "lax" })
    //   .json({ username: user.username, email: user.email });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,    // required on Render HTTPS
        sameSite: "None", 
        maxAge: 7 * 24 * 60 * 60 * 1000 // optional: 7 days in ms
      }).json({ username: user.username, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});













// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});









// router.post("/google", async (req, res) => {
//   const { email, name, photo, uid } = req.body;

//   try {
//     // Check if user exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       // If new user, create with firebaseUID
//       user = await User.create({
//         username: name,
//         email,
//         firebaseUID: uid,
//       });
//     }

//     // Create JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     // Send token in cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "Lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     res.status(200).json({ user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Google Sign-In failed", error: err.message });
//   }
// });














// router.post("/google", async (req, res) => {
//   const { email, name, photo, uid } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         username: name,
//         email,
//         firebaseUID: uid,
//       });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     // Send JWT in cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false, // true if using HTTPS
//       sameSite: "Lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({ user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Google Sign-In failed", error: err.message });
//   }
// });














// router.post("/google", async (req, res) => {
//   const { email, name, uid } = req.body;

//   try {
//     // Check if a user with this email already exists
//     let user = await User.findOne({ email });

//     // If the user does not exist, create a new one
//     if (!user) {
//       user = await User.create({
//         username: name, // Use 'name' from Google as the 'username'
//         email,
//         firebaseUID: uid,
//         // Password is not needed for Google Sign-In
//       });
//     }

//     // --- THIS IS THE FIX ---
//     // The payload now creates a nested 'user' object with an 'id',
//     // which matches the structure of your manual login token.
//     // This ensures that your `auth` middleware will always find `req.user.id`.
//     const payload = { 
//       user: { 
//         id: user.id, 
//         username: user.username 
//       } 
//     };
    
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

//     // Send back the token and user info to the frontend
//     res.status(200).json({ 
//         token, 
//         user: { 
//             id: user._id, 
//             username: user.username, 
//             email: user.email 
//         } 
//     });

//   } catch (err) {
//     console.error("Error during Google Sign-In:", err.message);
//     res.status(500).json({ message: "Server error during Google Sign-In" });
//   }
// });







// backend/routes/auth.js

// router.post("/google", async (req, res) => {
//   const { email, name, uid } = req.body;

//   try {
//     // Check if a user with this email already exists
//     let user = await User.findOne({ email });

//     // If the user does not exist, create a new one
//     if (!user) {
//       user = await User.create({
//         username: name, // Use 'name' from Google as the 'username'
//         email,
//         firebaseUID: uid,
//         // Password is not needed for Google Sign-In
//       });
//     }

//     // --- THIS IS THE FIX ---
//     // The payload now creates a nested 'user' object with an 'id',
//     // which matches the structure of your manual login token.
//     // This ensures that your `auth` middleware will always find `req.user.id`.
//     const payload = {
//       user: {
//         id: user.id,
//         username: user.username
//       }
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

//     // Send back the token and user info to the frontend
//     res.status(200).json({
//         token,
//         user: {
//             id: user._id,
//             username: user.username,
//             email: user.email
//         }
//     });

//   } catch (err) {
//     console.error("Error during Google Sign-In:", err.message);
//     res.status(500).json({ message: "Server error during Google Sign-In" });
//   }
// });








// router.post("/google", async (req, res) => {
//   const { email, name, photo, uid } = req.body;

//   try {
//     // Step 1: Check if user already exists by email
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Step 2: If not exists, create new
//       user = new User({
//         email,
//         name,
//         profilePhoto: photo,
//         googleId: uid,
//         authType: "google"
//       });
//       await user.save();
//     } else {
//       // Step 3: If exists, update with Google details (optional)
//       if (!user.googleId) {
//         user.googleId = uid;
//         user.authType = "manual+google"; // mark linked account
//         if (!user.profilePhoto) user.profilePhoto = photo;
//         await user.save();
//       }
//     }

//     // Step 4: Issue JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d"
//     });

//     res.cookie("token", token, { httpOnly: true });
//     res.json({ success: true, user, token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });





















// Google login / signup
router.post("/google", async (req, res) => {
  const { email, name, photo, uid } = req.body;

  try {
    // Step 1: Check if a user already exists by email
    let user = await User.findOne({ email });

    if (user) {
      // Existing manual user found
      // Step 2: Link Google info if not linked already
      if (!user.googleId) {
        user.googleId = uid;
        user.authType = user.authType === "manual" ? "manual+google" : user.authType;
        if (!user.profilePhoto) user.profilePhoto = photo;
        await user.save();
      }
    } else {
      // No existing user, create a new Google user
      user = new User({
        email,
        username: name,       // Assuming your User model uses 'username' field
        profilePhoto: photo,
        googleId: uid,
        authType: "google"
      });
      await user.save();
    }

    // Step 3: Issue JWT with the correct user ID (merged or new)
    const token = jwt.sign(
      { user: { id: user._id, username: user.username, email: user.email } },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Step 4: Send token via cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,      // required if deployed on HTTPS
      sameSite: "None",  // required if deployed on HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Step 5: Send user data
    res.json({ success: true, user, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});





module.exports = router;







































