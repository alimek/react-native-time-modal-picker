import * as React from 'react';
import { Modal, Animated, View, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';

import styles, { HEIGHT } from './styles';
import { ModalProps } from './typings';

const ANIMATE_DURATION = 200;

export interface State {
  openAnimation: Animated.Value;
  visible: boolean;
  currentValue: number;
  hourValue: number;
  minuteValue: number;
  secondValue: number;
}

class PickerModal extends React.Component<ModalProps, State> {
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
    minutesMaxValue: 59,
    hoursMaxValue: 23,
  };

  constructor(props: ModalProps) {
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

  componentDidUpdate(prevProps: ModalProps, prevState: State) {
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

  shouldComponentUpdate(nextProps: ModalProps, nextState: State): boolean {
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
    onPressSave(currentValue);
  };

  onChangeHour = (value: number) => {
    const { minuteValue, secondValue } = this.state;
    const { enabledMinutes, enabledSeconds } = this.props;

    let newValue = value * 3600;

    if (enabledMinutes) {
      newValue += minuteValue * 60;
    }

    if (enabledSeconds) {
      newValue = secondValue;
    }

    this.setState({ currentValue: newValue, hourValue: value });
  };

  onMinuteChanged = (value: number) => {
    const { hourValue, secondValue } = this.state;
    const { enabledHours, enabledSeconds } = this.props;

    let newValue = value * 60;

    if (enabledSeconds) {
      newValue += secondValue;
    }

    if (enabledHours) {
      newValue += hourValue * 3600;
    }

    this.setState({ currentValue: newValue, minuteValue: value });
  };

  onSecondChanged = (value: number) => {
    const { hourValue, minuteValue } = this.state;
    const { enabledHours, enabledMinutes } = this.props;


    let newValue = value;

    if (enabledMinutes) {
      newValue += minuteValue * 60;
    }

    if (enabledHours) {
      newValue += hourValue * 3600;
    }

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
      minutesMaxValue,
      hoursMaxValue,
    } = this.props;
    const mergedStyles = { ...styles, ...style };
    const { openAnimation, visible, hourValue, minuteValue, secondValue } = this.state;
    const height = modalHeight || HEIGHT;

    const secondsArray = new Array(60).fill(1);
    const minutesArray = new Array(minutesMaxValue + 1).fill(1);
    const hoursArray = new Array(hoursMaxValue + 1).fill(1);

    return (
      <Modal
        transparent
        visible={visible}
        onRequestClose={this.cancel}
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
                    <View style={mergedStyles.androidPickerWrapper}>
                      <Picker
                        style={mergedStyles.picker}
                        onValueChange={this.onChangeHour}
                        selectedValue={hourValue}
                        mode="dropdown"
                      >
                        {
                          hoursArray.map((value, index) => (
                            <Picker.Item key={index.toString()} value={index} label={index.toString()}/>
                          ))
                        }
                      </Picker>
                    </View>
                  </View> : null
              }
              {
                enabledMinutes ?
                  <View style={mergedStyles.pickerContainer}>
                    <Text style={mergedStyles.pickerHeader}>{minutesTitle}</Text>
                    <View style={mergedStyles.androidPickerWrapper}>
                      <Picker
                        style={mergedStyles.picker}
                        onValueChange={this.onMinuteChanged}
                        selectedValue={minuteValue}
                        mode="dropdown"
                      >
                        {
                          minutesArray.map((value, index) => (
                            <Picker.Item key={index.toString()} value={index} label={index.toString()}/>
                          ))
                        }
                      </Picker>
                    </View>
                  </View> : null
              }
              {
                enabledSeconds ?
                  <View style={mergedStyles.pickerContainer}>
                    <Text style={mergedStyles.pickerHeader}>{secondsTitle}</Text>
                    <View style={mergedStyles.androidPickerWrapper}>
                      <Picker
                        style={mergedStyles.picker}
                        selectedValue={secondValue}
                        onValueChange={this.onSecondChanged}
                        mode="dropdown"
                      >
                        {
                          secondsArray.map((value, index) => (
                            <Picker.Item key={index.toString()} value={index} label={index.toString()}/>
                          ))
                        }
                      </Picker>
                    </View>
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
