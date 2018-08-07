import * as React from 'react';
import { TouchableWithoutFeedback, View, Text, ViewStyle } from 'react-native';

import styles from './styles';
import ModalPicker from './Modal';

interface ParentProps {
  value: number;
  onValueChanged: (value: number) => void;
  containerStyle?: ViewStyle;
}

interface State {
  isOpen: boolean;
}

type Props = ParentProps;

class Input extends React.Component<Props, State> {
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
      containerStyle,
      value,
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
            style={[
              styles.container,
              containerStyle,
            ]}
          >
            <Text>
              {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <ModalPicker
          isOpen={isOpen}
          onPressCancel={() => this.setState({ isOpen: !isOpen })}
          onPressSave={this.onChanged}
          value={value}
          enabledMinutes
          enabledSeconds
        />
      </React.Fragment>
    );
  }
}

export default Input;
