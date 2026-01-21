const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

const headers = {
  "x-admin-key": ADMIN_KEY
};

export const fetchUsageByPlan = async () => {
  const res = await fetch(`${BASE_URL}/api/admin/usage`, {
    headers
  });
  if (!res.ok) throw new Error("Failed to fetch usage by plan");
  return res.json();
};

export const fetchUsageTimeline = async () => {
  const res = await fetch(`${BASE_URL}/api/admin/usage/timeline`, {
    headers
  });
  if (!res.ok) throw new Error("Failed to fetch usage timeline");
  return res.json();
};
