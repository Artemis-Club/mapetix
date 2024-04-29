import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import MapMarker from '../../atoms/MapMarker/MapMarker';
import Text from '../../atoms/Text/Text';
import { mapSettings } from '@/config/map';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const padding = useSafeAreaInsets();
  return (
    <View className="justify-center flex-1 ">
      <MapView className="flex-1" {...props} mapPadding={padding}>
        {markers.map((marker, index) => (
          <MapMarker key={index} coordinate={marker.coordinate} />
        ))}
      </MapView>
    </View>
  );
};

export default MapWithMarkers;
