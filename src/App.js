import React, { useState, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import PDFViewer from './components/PDFViewer';
import HighlightInfo from './components/HighlightInfo';
import DataSourceConfig from './components/DataSourceConfig';

function App() {
  const [highlightPlugin, setHighlightPlugin] = useState(null);
  const highlightInfoRef = useRef(null);

  const handleHighlightPluginReady = (plugin) => {
    setHighlightPlugin(plugin);
  };

  const handleHighlightClick = (highlight) => {
    if (highlightPlugin && highlightPlugin.jumpToHighlightArea) {
      // Convert our highlight data to the format expected by jumpToHighlightArea
      const highlightArea = {
        pageIndex: highlight.pageIndex,
        top: highlight.top,
        left: highlight.left,
        width: highlight.width,
        height: highlight.height
      };
      
      highlightPlugin.jumpToHighlightArea(highlightArea);
    }
  };

  const handleConfigChange = () => {
    // Force refresh of highlights when data source changes
    if (highlightInfoRef.current && highlightInfoRef.current.refreshHighlights) {
      highlightInfoRef.current.refreshHighlights();
    }
    // You might also want to refresh the PDF viewer highlights
    window.location.reload(); // Simple approach - you could implement more sophisticated refresh
  };

  return (
    <div className="App">
      <Header title="Professional PDF Viewer" />
      <main className="main-content">
        <div className="content-layout">
          <div className="sidebar">
            <DataSourceConfig onConfigChange={handleConfigChange} />
            <HighlightInfo 
              ref={highlightInfoRef}
              onHighlightClick={handleHighlightClick} 
            />
          </div>
          <div className="viewer-section">
            <div className="pdf-viewer-wrapper">
              <PDFViewer 
                fileUrl="/sample.pdf" 
                onHighlightPluginReady={handleHighlightPluginReady}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;