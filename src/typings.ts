import { TimePickerStyle } from './styles';

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
  minutesMaxValue: number;
  hoursMaxValue: number;
}

export type ModalProps = ParentProps;