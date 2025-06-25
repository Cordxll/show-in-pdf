import React, { useState, useEffect } from 'react';
import { getHighlightCoordinates } from '../data/highlightDataService';

const HighlightRenderer = ({ pageIndex, getCssProperties, rotation }) => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const loadHighlights = async () => {
      try {
        const highlightData = await getHighlightCoordinates();
        setHighlights(highlightData);
      } catch (error) {
        console.error('Failed to load highlights in renderer:', error);
        setHighlights([]); // Fallback to empty array
      }
    };

    loadHighlights();
  }, []);

  // Filter highlights for the current page
  const pageHighlights = highlights.filter(
    highlight => highlight.pageIndex === pageIndex
  );

  return (
    <div>
      {pageHighlights.map((highlight) => (
        <div
          key={highlight.id}
          style={{
            ...getCssProperties({
              pageIndex: highlight.pageIndex,
              top: highlight.top,
              left: highlight.left,
              width: highlight.width,
              height: highlight.height
            }, rotation),
            backgroundColor: highlight.color,
            pointerEvents: 'none',
            borderRadius: '2px',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}
          title={highlight.note}
        />
      ))}
    </div>
  );
};

export default HighlightRenderer;
