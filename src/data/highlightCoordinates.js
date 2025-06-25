// Highlight coordinates configuration
// Each highlight has: pageIndex (0-based), top, left, width, height (all in percentages)
export const highlightCoordinates = [
  {
    id: 1,
    pageIndex: 0,
    top: 15,
    left: 10,
    width: 40,
    height: 3,
    color: 'rgba(255, 255, 0, 0.4)', // Yellow highlight
    note: 'Important section 1'
  },
  {
    id: 2,
    pageIndex: 0,
    top: 30,
    left: 20,
    width: 50,
    height: 4,
    color: 'rgba(0, 255, 0, 0.3)', // Green highlight
    note: 'Key finding'
  },
  {
    id: 3,
    pageIndex: 1,
    top: 50,
    left: 15,
    width: 60,
    height: 3.5,
    color: 'rgba(255, 0, 0, 0.3)', // Red highlight
    note: 'Critical information'
  }
  // Add more highlights as needed
];
