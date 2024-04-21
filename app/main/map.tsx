import { Text, View } from 'react-native';
import { MapWithMarkers } from '@/components';
import PlanCard from '@/components/ui/molecules/PlanCard/PlanCard';
import { mapSettings } from '@/config/map';
export default function TabOneScreen() {
  return (
    <View className="flex-1">
      <MapWithMarkers markers={[]} {...mapSettings}></MapWithMarkers>
    </View>
  );
}
