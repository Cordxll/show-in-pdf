import { highlightCoordinates as hardcodedHighlights } from './highlightCoordinates';

// Configuration for data source
const DATA_CONFIG = {
  useAPI: false, // Set to true to use API, false for hardcoded data
  apiEndpoint: 'https://your-api-endpoint.com/highlights', // Replace with your API URL
  fallbackToHardcoded: true // Fallback to hardcoded data if API fails
};

/**
 * Fetches highlight coordinates from API
 * @returns {Promise<Array>} Array of highlight objects
 */
const fetchHighlightsFromAPI = async () => {
  try {
    const response = await fetch(DATA_CONFIG.apiEndpoint);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Validate the API response structure
    if (!Array.isArray(data)) {
      throw new Error('API response is not an array');
    }
    
    // Validate each highlight object has required fields
    const validatedData = data.map((highlight, index) => {
      const requiredFields = ['id', 'pageIndex', 'top', 'left', 'width', 'height', 'color', 'note'];
      const missingFields = requiredFields.filter(field => !(field in highlight));
      
      if (missingFields.length > 0) {
        console.warn(`Highlight at index ${index} missing fields: ${missingFields.join(', ')}`);
      }
      
      return {
        id: highlight.id || index + 1,
        pageIndex: highlight.pageIndex || 0,
        top: highlight.top || 0,
        left: highlight.left || 0,
        width: highlight.width || 10,
        height: highlight.height || 2,
        color: highlight.color || 'rgba(255, 255, 0, 0.4)',
        note: highlight.note || 'Untitled highlight',
        ...highlight // Spread any additional properties
      };
    });
    
    return validatedData;
  } catch (error) {
    console.error('Error fetching highlights from API:', error);
    
    if (DATA_CONFIG.fallbackToHardcoded) {
      console.log('Falling back to hardcoded highlights');
      return hardcodedHighlights;
    }
    
    throw error;
  }
};

/**
 * Gets highlight coordinates from configured source
 * @returns {Promise<Array>} Array of highlight objects
 */
export const getHighlightCoordinates = async () => {
  if (DATA_CONFIG.useAPI) {
    return await fetchHighlightsFromAPI();
  } else {
    // Return hardcoded data wrapped in a promise for consistency
    return Promise.resolve([...hardcodedHighlights]);
  }
};

/**
 * Updates the data source configuration
 * @param {Object} config - Configuration object
 */
export const updateDataConfig = (config) => {
  Object.assign(DATA_CONFIG, config);
};

/**
 * Gets current data configuration
 * @returns {Object} Current configuration
 */
export const getDataConfig = () => {
  return { ...DATA_CONFIG };
};

/**
 * Transforms API response to expected format (customize based on your API)
 * Example API response format:
 * [
 *   {
 *     "highlight_id": 1,
 *     "page": 0,
 *     "position": { "top": 15, "left": 10, "width": 40, "height": 3 },
 *     "style": { "backgroundColor": "rgba(255, 255, 0, 0.4)" },
 *     "description": "Important section"
 *   }
 * ]
 */
export const transformAPIResponse = (apiData) => {
  return apiData.map(item => ({
    id: item.highlight_id || item.id,
    pageIndex: item.page || item.pageIndex,
    top: item.position?.top || item.top,
    left: item.position?.left || item.left,
    width: item.position?.width || item.width,
    height: item.position?.height || item.height,
    color: item.style?.backgroundColor || item.color,
    note: item.description || item.note || item.text
  }));
};

export default {
  getHighlightCoordinates,
  updateDataConfig,
  getDataConfig,
  transformAPIResponse
};
