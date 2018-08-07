import * as React from 'react';
import { Modal, Animated, View, TouchableOpacity, Text, Picker } from 'react-native';

import styles, { HEIGHT, TimePickerStyle } from './styles';

const ANIMATE_DURATION = 200;

interface ParentProps {
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

interface State {
  openAnimation: Animated.Value;
  visible: boolean;
  currentValue: number;
  hourValue: number;
  minuteValue: number;
  secondValue: number;
}

type Props = ParentProps;

class PickerModal extends React.Component<Props, State> {
  public static defaultProps = {
    backTitle: 'Cancel',
    saveTitle: 'Save',
    modalHeight: HEIGHT,
    enabledHours: false,
    enabledMinutes: false,
    enabledSeconds: false,
    hoursTitle: 'Hour',
    minutesTitle: 'Minute',
    secondsTitle: 'Second',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      openAnimation: new Animated.Value(0),
      currentValue: props.value,
      hourValue: Math.floor(props.value / 3600),
      minuteValue: Math.floor(props.value / 60),
      secondValue: props.value % 60,
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { isOpen, value } = this.props;
    const { currentValue } = this.state;

    if (isOpen !== prevProps.isOpen) {
      if (isOpen) {
        this.setState({ visible: true });
        this.animateBox(1);
      } else {
        this.setState({ visible: false });
      }
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    const { isOpen, value } = this.props;
    const { visible, currentValue } = this.state;

    return isOpen !== nextProps.isOpen ||
      visible !== nextState.visible ||
      value !== nextProps.value ||
      currentValue !== nextState.currentValue;
  }

  animateBox = (toValue: number) => {
    const { openAnimation } = this.state;
    const { animateDuration } = this.props;

    Animated.timing(
      openAnimation,
      {
        toValue: toValue,
        duration: animateDuration || ANIMATE_DURATION,
        useNativeDriver: true,
      }
    ).start();
  };

  cancel = () => {
    const { onPressCancel, value } = this.props;
    this.setState({ currentValue: value });
    onPressCancel();
  };

  save = () => {
    const { onPressSave } = this.props;
    const { currentValue } = this.state;
    console.log({
      currentValue,
    });
    onPressSave(currentValue);
  };

  onChangeHour = (value: number) => {
    const { minuteValue, secondValue } = this.state;

    const newValue = value * 3600 + minuteValue * 60 + secondValue;
    this.setState({ currentValue: newValue, hourValue: value });
  };

  onMinuteChanged = (value: number) => {
    const { hourValue, secondValue } = this.state;

    const newValue = hourValue * 3600 + value * 60 + secondValue;
    this.setState({ currentValue: newValue, minuteValue: value });
  };

  onSecondChanged = (value: number) => {
    const { hourValue, minuteValue } = this.state;

    const newValue = hourValue * 3600 + minuteValue * 60 + value;
    this.setState({ currentValue: newValue, secondValue: value });
  };

  render() {
    const {
      style,
      modalHeight,
      backTitle,
      saveTitle,
      enabledHours,
      enabledMinutes,
      enabledSeconds,
      hoursTitle,
      secondsTitle,
      minutesTitle,
    } = this.props;
    const mergedStyles = { ...styles, ...style };
    const { openAnimation, visible, hourValue, minuteValue, secondValue } = this.state;
    const height = modalHeight || HEIGHT;

    return (
      <Modal
        transparent
        visible={visible}
      >
        <View
          style={[
            mergedStyles.modalBackgroundContainer,
          ]}
        >
          <Animated.View style={[
            {
              opacity: openAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.2]
              })
            },
            mergedStyles.background,
          ]}/>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    translateY: openAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [2 * height, 0],
                    }),
                  }
                ],
              },
              mergedStyles.modalContainer,
            ]}
          >
            <View
              style={[
                mergedStyles.modalHeaderContainer,
              ]}
            >
              <TouchableOpacity
                onPress={this.cancel}
                style={[
                  mergedStyles.modalHeaderButton,
                  mergedStyles.modalHeaderButtonCancel,
                ]}
              >
                <Text
                  style={[
                    mergedStyles.modalHeaderButtonText,
                    mergedStyles.modalHeaderButtonTextCancel,
                  ]}
                >
                  {backTitle}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.save}
                style={[
                  mergedStyles.modalHeaderButton,
                  mergedStyles.modalHeaderButtonSave,
                ]}
              >
                <Text
                  style={[
                    mergedStyles.modalHeaderButtonText,
                    mergedStyles.modalHeaderButtonTextSave,
                  ]}
                >
                  {saveTitle}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={mergedStyles.modalContentContainer}>
              {
                enabledHours ?
                  <View style={mergedStyles.pickerContainer}>
                    <Text style={mergedStyles.pickerHeader}>{hoursTitle}</Text>
                    <Picker
                      style={mergedStyles.picker}
                      onValueChange={this.onChangeHour}
                      selectedValue={hourValue}
                    >
                      {
                        Array.from(Array(30).keys()).map(value => (
                          <Picker.Item key={value.toString()} value={value} label={value.toString()}/>
                        ))
                      }
                    </Picker>
                  </View> : null
              }
              {
                enabledMinutes ?
                  <View style={mergedStyles.pickerContainer}>
                    <Text style={mergedStyles.pickerHeader}>{minutesTitle}</Text>
                    <Picker
                      style={mergedStyles.picker}
                      onValueChange={this.onMinuteChanged}
                      selectedValue={minuteValue}
                    >
                      {
                        Array.from(Array(60).keys()).map(value => (
                          <Picker.Item key={value.toString()} value={value} label={value.toString()}/>
                        ))
                      }
                    </Picker>
                  </View> : null
              }
              {
                enabledSeconds ?
                  <View style={mergedStyles.pickerContainer}>
                    <Text style={mergedStyles.pickerHeader}>{secondsTitle}</Text>
                    <Picker
                      style={mergedStyles.picker}
                      selectedValue={secondValue}
                      onValueChange={this.onSecondChanged}
                    >
                      {
                        Array.from(Array(60).keys()).map((value) => (
                          <Picker.Item key={value.toString()} value={value} label={value.toString()}/>
                        ))
                      }
                    </Picker>
                  </View> : null
              }
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

export default PickerModal;
