# Professional PDF Viewer with Hardcoded Highlights

A React-based PDF viewer with predefined highlights that can be easily configured through a separate data file.

## Features

- 🎯 **Hardcoded Highlights**: Predefined highlight areas that display automatically
- 🎨 **Customizable Colors**: Each highlight can have its own color and note
- 📱 **Responsive Design**: Professional layout that works on all screen sizes
- 🔧 **Easy Configuration**: All highlight coordinates stored in a separate file
- 🚫 **No User Interaction**: Users cannot add/remove highlights (read-only)

## Project Structure

```
src/
├── components/
│   ├── Header.js              # Application header
│   ├── PDFViewer.js          # Main PDF viewer component
│   ├── HighlightRenderer.js   # Renders highlight overlays
│   └── HighlightInfo.js      # Displays highlight information panel
├── data/
│   └── highlightCoordinates.js # ⭐ Highlight configuration file
├── App.js                     # Main application component
└── App.css                    # Styling
```

## How to Modify Highlights

### 1. Edit Highlight Coordinates

Open `src/data/highlightCoordinates.js` and modify the highlights array:

```javascript
export const highlightCoordinates = [
  {
    id: 1,                                    // Unique identifier
    pageIndex: 0,                            // Page number (0-based)
    top: 15,                                 // Distance from top (%)
    left: 10,                                // Distance from left (%)
    width: 40,                               // Width of highlight (%)
    height: 3,                               // Height of highlight (%)
    color: 'rgba(255, 255, 0, 0.4)',       // Background color
    note: 'Important section 1'             // Description/note
  }
  // Add more highlights here...
];
```

### 2. Coordinate System

- **pageIndex**: 0 for first page, 1 for second page, etc.
- **top/left/width/height**: Percentages relative to the page size
- **color**: Any valid CSS color (rgba recommended for transparency)

### 3. Adding New Highlights

To add a new highlight:

1. Open `src/data/highlightCoordinates.js`
2. Add a new object to the array with a unique `id`
3. Set the coordinates and styling
4. Save the file - changes will be reflected immediately

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Replace the sample PDF:**
   - Add your PDF file to the `public/` folder
   - Update the `fileUrl` prop in `src/App.js`

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
