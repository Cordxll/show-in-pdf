import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">{title}</h1>
        <div className="header-actions">
          <span className="status-indicator">Ready</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
