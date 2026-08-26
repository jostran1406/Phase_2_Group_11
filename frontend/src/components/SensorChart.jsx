import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Đăng ký các module cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function SensorChart({ historyData = [] }) {
  // Chuẩn bị dữ liệu cho biểu đồ từ mảng lịch sử truyền vào
  const labels = historyData.map((item) => new Date(item.time || item.created_at).toLocaleTimeString())

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: historyData.map((item) => item.temperature),
        borderColor: "rgb(239, 68, 68)", // Màu đỏ
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        tension: 0.3,
      },
      {
        label: "Gas Concentration (ppm)",
        data: historyData.map((item) => item.gas_ppm),
        borderColor: "rgb(234, 179, 8)", // Màu vàng/cam
        backgroundColor: "rgba(234, 179, 8, 0.5)",
        tension: 0.3,
      },
      {
        label: "Light Intensity (lux)",
        data: historyData.map((item) => item.light),
        borderColor: "rgb(59, 130, 246)", // Màu xanh dương
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Real-time Environmental Sensor Chart",
      },
    },
  }

  return (
    <div className="chart-container" style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
      <Line data={data} options={options} />
    </div>
  )
}

export default SensorChart