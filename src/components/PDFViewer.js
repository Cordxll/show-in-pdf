import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { highlightPlugin, Trigger } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import HighlightRenderer from './HighlightRenderer';

const PDFViewer = ({ fileUrl, onHighlightPluginReady }) => {
  const highlightPluginInstance = highlightPlugin({
    trigger: Trigger.None, // Disable user highlighting
    renderHighlights: (props) => (
      <HighlightRenderer 
        pageIndex={props.pageIndex}
        getCssProperties={props.getCssProperties}
        rotation={props.rotation}
      />
    )
  });

  // Pass the highlight plugin instance to parent component
  React.useEffect(() => {
    if (onHighlightPluginReady) {
      onHighlightPluginReady(highlightPluginInstance);
    }
  }, [highlightPluginInstance, onHighlightPluginReady]);

  return (
    <div className="pdf-viewer-container">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={fileUrl}
          plugins={[highlightPluginInstance]}
          defaultScale={1.2}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
