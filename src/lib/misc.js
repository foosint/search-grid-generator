import { parseShp } from 'shpjs';

// takes a coordinate string, does some basic checks
// if success: return a cleaned up string
// if failure: returns the input string
export const cleanCoordinate = (coordinate) => {
    // a coordinate needs a comma
    if (!coordinate.includes(',')) {
        return { coordinate, error: true };
    }

    // split and quick check
    const [lat, lng] = coordinate.split(',').map((s) => s.trim());
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
        return { coordinate, error: true };
    }
    // we have a valid input, update the store
    const cleanCoordinate = `${parsedLat},${parsedLng}`;
    return { coordinate: cleanCoordinate, error: false };
};

// arraybuffer to geojson
export const arrayBufferToGeoJSON = (arrayBuffer) => {
    try {
        // Convert the ArrayBuffer into a Uint8Array
        // const uint8Array = new Uint8Array(arrayBuffer);

        // Parse the shapefile into GeoJSON
        const geojson = parseShp(arrayBuffer);
        return geojson;
    } catch (error) {
        console.error('Error reading shapefile:', error);
        throw error;
    }
};
