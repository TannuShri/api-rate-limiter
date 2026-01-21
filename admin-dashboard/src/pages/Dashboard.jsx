import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

import { fetchUsageByPlan, fetchUsageTimeline } from "../api/adminApi";
import UsageByPlanChart from "../components/UsageByPlanChart";
import UsageTimelineChart from "../components/UsageTimelineChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const Dashboard = () => {
  const [usageByPlan, setUsageByPlan] = useState([]);
  const [usageTimeline, setUsageTimeline] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const plans = await fetchUsageByPlan();
      const timeline = await fetchUsageTimeline();
      setUsageByPlan(plans);
      setUsageTimeline(timeline);
    } catch (err) {
      console.error("Dashboard error:", err.message);
    }
  };

  const totalRequests = usageByPlan.reduce(
    (sum, p) => sum + p.totalRequests,
    0
  );

  return (
    <div className="container">
      <h1>Admin API Usage Dashboard</h1>

      <div className="stats">
        <div className="card">Total Requests: <b>{totalRequests}</b></div>
        <div className="card">Active Plans: <b>{usageByPlan.length}</b></div>
      </div>

      <div className="card">
        <UsageByPlanChart data={usageByPlan} />
      </div>

      <div className="card">
        <UsageTimelineChart data={usageTimeline} />
      </div>
    </div>
  );
};

export default Dashboard;
