import { ActivityIndicator } from 'react-native';
import Modal from '@/components/ui/atoms/Modal/Modal';

const Spinner = ({ open }) => (
  <Modal open={open}>
    <ActivityIndicator />
  </Modal>
);

export default Spinner;
