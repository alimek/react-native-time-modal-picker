import * as React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';

import styles, { TimePickerStyle } from './styles';
// @ts-ignore
import Modal from './Modal';
import { mergeStyles } from './utils';

interface ParentProps {
  value: number;
  onValueChanged: (value: number) => void;
  style?: TimePickerStyle;
  modalHeight?: number;
  backTitle?: string;
  saveTitle?: string;
  animateDuration?: number;
  enabledHours?: boolean;
  enabledMinutes?: boolean;
  enabledSeconds?: boolean;
  hoursTitle?: string;
  minutesTitle?: string;
  secondsTitle?: string;
}

interface State {
  isOpen: boolean;
}

type Props = ParentProps;

class Input extends React.Component<Props, State> {
  public static defaultProps = {
    isOpen: false,
    enabledSeconds: true,
    enabledMinutes: true,
  };

  state = {
    isOpen: false,
  };

  openPicker = () => {
    this.setState({ isOpen: true });
  };

  onChanged = (value: number) => {
    const { onValueChanged } = this.props;
    const { isOpen } = this.state;

    console.log(value);
    this.setState({ isOpen: !isOpen });
    onValueChanged && onValueChanged(value);
  };

  render() {
    const {
      value,
      enabledMinutes,
      enabledSeconds,
      enabledHours,
      modalHeight,
      backTitle,
      saveTitle,
      animateDuration,
      hoursTitle,
      minutesTitle,
      secondsTitle,
      style,
    } = this.props;
    const { isOpen } = this.state;

    const minutes = Math.floor(value / 60);
    const seconds = value % 60;

    return (
      <React.Fragment>
        <TouchableWithoutFeedback
          onPress={this.openPicker}
        >
          <View
            style={mergeStyles(styles, style || {}, 'container')}
          >
            <Text style={mergeStyles(styles, style || {}, 'containerText')}>
              {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          isOpen={isOpen}
          onPressCancel={() => this.setState({ isOpen: !isOpen })}
          onPressSave={this.onChanged}
          value={value}
          enabledMinutes={enabledMinutes}
          enabledSeconds={enabledSeconds}
          enabledHours={enabledHours}
          modalHeight={modalHeight}
          backTitle={backTitle}
          saveTitle={saveTitle}
          animateDuration={animateDuration}
          hoursTitle={hoursTitle}
          minutesTitle={minutesTitle}
          secondsTitle={secondsTitle}
          style={style}
        />
      </React.Fragment>
    );
  }
}

export default Input;
