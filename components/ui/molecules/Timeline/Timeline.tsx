import React from 'react';
import TimelineFlatList from 'react-native-timeline-flatlist';

interface TimelineProps {
  events: [];
  onEventPress: (event: any) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, ...props }) => {
  return (
    <TimelineFlatList
      data={events}
      descriptionStyle={{ color: 'white' }}
      titleStyle={{ color: 'white' }}
      timeStyle={{ color: 'white' }}
      circleColor="#f59e0b"
      lineColor="#f59e0b"
      detailContainerStyle={{
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#6366f1',
      }}
      timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
      listViewContainerStyle={{ padding: 16 }}
      lineWidth={4}
      {...props}
    />
  );
};

export default Timeline;
