import React from 'react';
import { Marker, LatLng } from 'react-native-maps';

interface MapMarkerProps {
  coordinate: LatLng;
}

const MapMarker: React.FC<MapMarkerProps> = ({ coordinate }) => {
  return <Marker coordinate={coordinate} />;
};

export default MapMarker;
