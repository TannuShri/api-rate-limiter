import { Bar } from "react-chartjs-2";

const UsageByPlanChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No usage data available</p>;
  }

  const chartData = {
    labels: data.map(d => d._id),
    datasets: [
      {
        label: "API Requests",
        data: data.map(d => d.totalRequests),
        backgroundColor: ["#4f46e5", "#22c55e"]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "API Requests by Plan"
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default UsageByPlanChart;
