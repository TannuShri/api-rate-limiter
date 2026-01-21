import express from "express";
import ApiUsage from "../models/ApiUsage.js";
import adminAuth from "../middleware/adminAuth.js";

const router=express.Router();
/**
 * GET /api/admin/usage
 * Returns usage count per user
 */
router.get("/usage",adminAuth, async (req, res) => {
  try {
    const byPlan = await ApiUsage.aggregate([
      {
        $group: {
          _id: "$plan",
          totalRequests: { $sum: 1 }
        }
      }
    ]);

    res.json(byPlan);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch usage data" });
  }
});


/**
 * GET /api/admin/usage/timeline
 * Requests per minute
 */
router.get("/usage/timeline", adminAuth,async(req,res)=>{
    try {
    const data = await ApiUsage.aggregate([
      {
        $group: {
          _id: {
            hour: { $hour: "$timestamp" },
            minute: { $minute: "$timestamp" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.hour": 1, "_id.minute": 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch timeline data" });
  }
});


export default router;