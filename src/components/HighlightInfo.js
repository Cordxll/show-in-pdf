import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { getHighlightCoordinates } from '../data/highlightDataService';

const HighlightInfo = forwardRef(({ onHighlightClick }, ref) => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHighlights = async () => {
    try {
      setLoading(true);
      setError(null);
      const highlightData = await getHighlightCoordinates();
      setHighlights(highlightData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load highlights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHighlights();
  }, []);

  // Expose refresh method to parent component
  useImperativeHandle(ref, () => ({
    refreshHighlights: loadHighlights
  }));

  const handleHighlightClick = (highlight) => {
    if (onHighlightClick) {
      onHighlightClick(highlight);
    }
  };

  const refreshHighlights = async () => {
    await loadHighlights();
  };

  if (loading) {
    return (
      <div className="highlight-info">
        <h3>Document Highlights</h3>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading highlights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="highlight-info">
        <h3>Document Highlights</h3>
        <div className="error-state">
          <p className="error-message">⚠️ Error loading highlights: {error}</p>
          <button className="retry-button" onClick={refreshHighlights}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="highlight-info">
      <div className="highlight-header">
        <h3>Document Highlights ({highlights.length})</h3>
        <button className="refresh-button" onClick={refreshHighlights} title="Refresh highlights">
          🔄
        </button>
      </div>
      <p className="highlight-instructions">💡 Click on any highlight below to jump to its location in the document</p>
      <div className="highlight-list">
        {highlights.map((highlight) => (
          <div 
            key={highlight.id} 
            className="highlight-item clickable"
            onClick={() => handleHighlightClick(highlight)}
            title="Click to jump to highlight in document"
          >
            <div 
              className="highlight-color" 
              style={{ backgroundColor: highlight.color }}
            />
            <div className="highlight-details">
              <p className="highlight-note">{highlight.note}</p>
              <p className="highlight-position">
                Page {highlight.pageIndex + 1} • Top: {highlight.top}% • Left: {highlight.left}%
              </p>
            </div>
            <div className="jump-icon">→</div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default HighlightInfo;
