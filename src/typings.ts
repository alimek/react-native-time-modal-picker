import { TimePickerStyle } from './styles';
import { Animated } from 'react-native';

export interface ParentProps {
  isOpen: boolean;
  style?: TimePickerStyle;
  modalHeight?: number;
  backTitle?: string;
  saveTitle?: string;
  onPressCancel: Function;
  onPressSave: (value: number) => void;
  animateDuration?: number;
  value: number;
  enabledHours?: boolean;
  enabledMinutes?: boolean;
  enabledSeconds?: boolean;
  hoursTitle?: string;
  minutesTitle?: string;
  secondsTitle?: string;
}

export type ModalProps = ParentProps;