import React from 'react';
import { Marker } from 'react-native-maps';
import type {
  MapMarkerProps as RNMapMarkerProps,
  LatLng,
} from 'react-native-maps';

interface MapMarkerProps extends RNMapMarkerProps {}

const MapMarker: React.FC<MapMarkerProps> = ({ coordinate, ...props }) => {
  return <Marker coordinate={coordinate} {...props} />;
};

export default MapMarker;
