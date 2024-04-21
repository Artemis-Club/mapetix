import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import MapMarker from '../../atoms/MapMarker/MapMarker';
import Text from '../../atoms/Text/Text';
import { mapSettings } from '@/config/map';

interface Marker {
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

interface MapWithMarkersProps {
  markers: Marker[];
}

const MapWithMarkers: React.FC<MapWithMarkersProps> = ({
  markers,
  ...props
}) => {
  return (
    <View className="justify-center flex-1 ">
      <MapView className="flex-1" {...props}>
        {markers.map((marker, index) => (
          <MapMarker key={index} coordinate={marker.coordinate} />
        ))}
      </MapView>
    </View>
  );
};

export default MapWithMarkers;
