import React, { useEffect, useState } from 'react';
import { Pressable, Modal as RNModal } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { View } from 'react-native';

export interface ModalProps {
  open?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ open = false, children, onClose }) => {
  // const [delayedOpen, setDelayedOpen] = useState(open);

  const delayedOpen = open;
  // useEffect(() => {
  //   open ? setDelayedOpen(open) : setTimeout(() => setDelayedOpen(open), 300);
  // }, [open]);

  return (
    <>
      {delayedOpen && (
        <RNModal transparent visible={true}>
          {open && (
            <Animated.View
              className="absolute z-10 w-full h-full"
              entering={FadeInUp.duration(300)}
              exiting={FadeOutDown.duration(300)}
            >
              <Pressable
                className="absolute -z-10 bg-black w-full h-full opacity-40"
                onPress={onClose}
              />
              <View className="z-10 w-full my-auto p-8">{children}</View>
            </Animated.View>
          )}
        </RNModal>
      )}
    </>
  );
};

export default Modal;
