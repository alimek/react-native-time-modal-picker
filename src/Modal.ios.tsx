import * as React from 'react';
import { Modal, Animated, View, TouchableOpacity, Text, Picker } from 'react-native';

import styles, { HEIGHT } from './styles';
import { ModalProps } from './typings';
import { mergeStyles } from './utils';

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
      minutesMaxValue,
      hoursMaxValue,
    } = this.props;
    const { openAnimation, visible, hourValue, minuteValue, secondValue } = this.state;
    const height = modalHeight || HEIGHT;

    const secondsArray = new Array(60).fill(1);
    const minutesArray = new Array(minutesMaxValue + 1).fill(1);
    const hoursArray = new Array(hoursMaxValue + 1).fill(1);

    return (
      <Modal
        transparent
        visible={visible}
      >
        <View
          style={[
            mergeStyles(styles, style, 'modalBackgroundContainer')
          ]}
        >
          <Animated.View style={[
            {
              opacity: openAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.2]
              })
            },
            mergeStyles(styles, style, 'background'),
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
              mergeStyles(styles, style, 'modalContainer'),
            ]}
          >
            <View
              style={[
                mergeStyles(styles, style, 'modalHeaderContainer'),
              ]}
            >
              <TouchableOpacity
                onPress={this.cancel}
                style={[
                  mergeStyles(styles, style, 'modalHeaderButton'),
                  mergeStyles(styles, style, 'modalHeaderButtonCancel'),
                ]}
              >
                <Text
                  style={[
                    mergeStyles(styles, style, 'modalHeaderButtonText'),
                    mergeStyles(styles, style, 'modalHeaderButtonTextCancel'),
                  ]}
                >
                  {backTitle}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.save}
                style={[
                  mergeStyles(styles, style, 'modalHeaderButton'),
                  mergeStyles(styles, style, 'modalHeaderButtonSave'),
                ]}
              >
                <Text
                  style={[
                    mergeStyles(styles, style, 'modalHeaderButtonText'),
                    mergeStyles(styles, style, 'modalHeaderButtonTextSave'),
                  ]}
                >
                  {saveTitle}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={mergeStyles(styles, style, 'modalContentContainer')}>
              {
                enabledHours ?
                  <View style={mergeStyles(styles, style, 'pickerContainer')}>
                    <Text style={mergeStyles(styles, style, 'pickerHeader')}>{hoursTitle}</Text>
                    <Picker
                      style={mergeStyles(styles, style, 'picker')}
                      onValueChange={this.onChangeHour}
                      selectedValue={hourValue}
                    >
                      {
                        hoursArray.map((value, index) => (
                          <Picker.Item key={index.toString()} value={index} label={index.toString()}/>
                        ))
                      }
                    </Picker>
                  </View> : null
              }
              {
                enabledMinutes ?
                  <View style={mergeStyles(styles, style, 'pickerContainer')}>
                    <Text style={mergeStyles(styles, style, 'pickerHeader')}>{minutesTitle}</Text>
                    <Picker
                      style={mergeStyles(styles, style, 'picker')}
                      onValueChange={this.onMinuteChanged}
                      selectedValue={minuteValue}
                    >
                      {
                        minutesArray.map((value, index) => (
                          <Picker.Item key={index.toString()} value={index} label={index.toString()}/>
                        ))
                      }
                    </Picker>
                  </View> : null
              }
              {
                enabledSeconds ?
                  <View style={mergeStyles(styles, style, 'pickerContainer')}>
                    <Text style={mergeStyles(styles, style, 'pickerHeader')}>{secondsTitle}</Text>
                    <Picker
                      style={mergeStyles(styles, style, 'picker')}
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
