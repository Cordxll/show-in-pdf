import React, { useState } from 'react';
import { updateDataConfig, getDataConfig } from '../data/highlightDataService';

const DataSourceConfig = ({ onConfigChange }) => {
  const [config, setConfig] = useState(getDataConfig());
  const [isOpen, setIsOpen] = useState(false);

  const handleConfigUpdate = (newConfig) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    updateDataConfig(updatedConfig);
    
    if (onConfigChange) {
      onConfigChange(updatedConfig);
    }
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="data-source-config">
      <button 
        className="config-toggle" 
        onClick={togglePanel}
        title="Configure data source"
      >
        ⚙️ Data Source
      </button>
      
      {isOpen && (
        <div className="config-panel">
          <div className="config-section">
            <label className="config-label">
              <input
                type="radio"
                name="dataSource"
                checked={!config.useAPI}
                onChange={() => handleConfigUpdate({ useAPI: false })}
              />
              Use Hardcoded Data
            </label>
            
            <label className="config-label">
              <input
                type="radio"
                name="dataSource"
                checked={config.useAPI}
                onChange={() => handleConfigUpdate({ useAPI: true })}
              />
              Use API Data
            </label>
          </div>
          
          {config.useAPI && (
            <div className="config-section">
              <label className="config-input-label">
                API Endpoint:
                <input
                  type="text"
                  value={config.apiEndpoint}
                  onChange={(e) => handleConfigUpdate({ apiEndpoint: e.target.value })}
                  placeholder="https://your-api-endpoint.com/highlights"
                  className="config-input"
                />
              </label>
              
              <label className="config-label">
                <input
                  type="checkbox"
                  checked={config.fallbackToHardcoded}
                  onChange={(e) => handleConfigUpdate({ fallbackToHardcoded: e.target.checked })}
                />
                Fallback to hardcoded data if API fails
              </label>
            </div>
          )}
          
          <div className="config-status">
            <strong>Current Source:</strong> {config.useAPI ? 'API' : 'Hardcoded'}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSourceConfig;
