import { Line } from "react-chartjs-2";

const UsageTimelineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No timeline data available</p>;
  }

  const labels = data.map(
    d => `${d._id.hour}:${String(d._id.minute).padStart(2, "0")}`
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Requests",
        data: data.map(d => d.count),
        borderColor: "#2563eb",
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Requests Over Time"
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default UsageTimelineChart;
