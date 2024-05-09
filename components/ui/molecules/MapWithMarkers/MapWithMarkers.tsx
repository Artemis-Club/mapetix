import React, { useEffect, useRef } from 'react';
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
  focusedMarker: number;
  setFocusedMarker: (index: number) => void;
}

const MapWithMarkers: React.FC<MapWithMarkersProps> = ({
  markers,
  focusedMarker,
  setFocusedMarker,
  ...props
}) => {
  const padding = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (markers.length === 0) return;
    const map = mapRef.current as MapView;

    map.animateCamera({
      center: {
        latitude: markers[focusedMarker].coordinate.latitude - 0.004,
        longitude: markers[focusedMarker].coordinate.longitude,
      },
      heading: 0,
      pitch: 0,
      zoom: 15,
    });
  }, [focusedMarker]);

  return (
    <View className="justify-center flex-1 ">
      <MapView className="flex-1" {...props} mapPadding={padding} ref={mapRef}>
        {markers.map((marker, index) => (
          <MapMarker
            key={index}
            coordinate={marker.coordinate}
            onPress={() => setFocusedMarker(index)}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapWithMarkers;
