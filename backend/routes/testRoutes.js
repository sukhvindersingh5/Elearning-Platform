const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// These routes exist only to prove Phase 1's protection works end-to-end.
// They will be replaced by real course/dashboard routes in later phases.

// Any logged-in user (student or admin) can access this
router.get("/protected", protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, you are logged in as ${req.user.role}.` });
});

// Only admins can access this
router.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}. This is the admin dashboard area.` });
});

// Only students can access this
router.get("/student-only", protect, authorizeRoles("student"), (req, res) => {
  res.json({ message: `Welcome Student ${req.user.name}. This is your learning area.` });
});

module.exports = router;
