function SensorCard({
  title,
  value,
  unit,
  icon,
  status = "Normal",
}) {
  return (
    <div className="sensor-card">

      <div className="sensor-card-header">

        <div className="sensor-icon">
          {icon}
        </div>

        <span className="sensor-status">
          {status}
        </span>

      </div>

      <p className="sensor-title">
        {title}
      </p>

      <div className="sensor-value">
        {value}

        <span>
          {unit}
        </span>
      </div>

    </div>
  )
}

export default SensorCard