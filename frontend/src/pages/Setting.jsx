import { useState } from "react"

function Setting() {
  const [settings, setSettings] = useState({
    temperatureMin: 18,
    temperatureMax: 35,
    humidityMin: 30,
    humidityMax: 80,
    lightMin: 100,
    lightMax: 1000,
  })

  const updateSetting = (key, value) => {
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  const handleSave = () => {
    console.log("Saved settings:", settings)
    alert("Settings saved successfully!")
  }

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>System Settings</h1>
          <p>Configure environmental monitoring thresholds</p>
        </div>
      </div>

      <div className="settings-panel">

        <div className="settings-section">
          <h2>Temperature</h2>
          <p>Configure acceptable temperature range</p>

          <div className="setting-row">

            <label>
              Minimum
              <div className="input-group">
                <input
                  type="number"
                  value={settings.temperatureMin}
                  onChange={(e) =>
                    updateSetting(
                      "temperatureMin",
                      e.target.value
                    )
                  }
                />
                <span>°C</span>
              </div>
            </label>

            <label>
              Maximum
              <div className="input-group">
                <input
                  type="number"
                  value={settings.temperatureMax}
                  onChange={(e) =>
                    updateSetting(
                      "temperatureMax",
                      e.target.value
                    )
                  }
                />
                <span>°C</span>
              </div>
            </label>

          </div>
        </div>

        <div className="settings-section">
          <h2>Humidity</h2>
          <p>Configure acceptable humidity range</p>

          <div className="setting-row">

            <label>
              Minimum
              <div className="input-group">
                <input
                  type="number"
                  value={settings.humidityMin}
                  onChange={(e) =>
                    updateSetting(
                      "humidityMin",
                      e.target.value
                    )
                  }
                />
                <span>%</span>
              </div>
            </label>

            <label>
              Maximum
              <div className="input-group">
                <input
                  type="number"
                  value={settings.humidityMax}
                  onChange={(e) =>
                    updateSetting(
                      "humidityMax",
                      e.target.value
                    )
                  }
                />
                <span>%</span>
              </div>
            </label>

          </div>
        </div>

        <div className="settings-section">
          <h2>Light Intensity</h2>
          <p>Configure acceptable light intensity range</p>

          <div className="setting-row">

            <label>
              Minimum
              <div className="input-group">
                <input
                  type="number"
                  value={settings.lightMin}
                  onChange={(e) =>
                    updateSetting(
                      "lightMin",
                      e.target.value
                    )
                  }
                />
                <span>lux</span>
              </div>
            </label>

            <label>
              Maximum
              <div className="input-group">
                <input
                  type="number"
                  value={settings.lightMax}
                  onChange={(e) =>
                    updateSetting(
                      "lightMax",
                      e.target.value
                    )
                  }
                />
                <span>lux</span>
              </div>
            </label>

          </div>
        </div>

        <div className="settings-actions">
          <button
            className="save-button"
            onClick={handleSave}
          >
            Save Settings
          </button>
        </div>

      </div>

    </div>
  )
}

export default Setting