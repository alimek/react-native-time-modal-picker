import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const HEIGHT = Platform.select({
  ios: 250,
  android: 130,
});

export interface TimePickerStyle {
  container?: ViewStyle;
  modalContainer?: ViewStyle;
  modalBackgroundContainer?: ViewStyle;
  background?: ViewStyle;
  modalHeaderContainer?: ViewStyle;
  modalHeaderButton?: ViewStyle;
  modalHeaderButtonCancel?: ViewStyle;
  modalHeaderButtonSave?: ViewStyle;
  modalHeaderButtonText?: TextStyle;
  modalHeaderButtonTextCancel?: TextStyle;
  modalHeaderButtonTextSave?: TextStyle;
  modalContentContainer?: ViewStyle;
  picker?: ViewStyle;
  pickerContainer?: ViewStyle;
  pickerHeader?: TextStyle;
  androidPickerWrapper?: TextStyle;
  [key: string]: any;
}

export default StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'black',
    height: HEIGHT,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'column',
  },
  modalBackgroundContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalHeaderButton: {
    alignItems: 'center',
    padding: 10,
  },
  modalHeaderButtonCancel: {
    alignSelf: 'flex-start',
  },
  modalHeaderButtonSave: {
    alignSelf: 'flex-end',
  },
  modalHeaderButtonText: {

  },
  modalHeaderButtonTextCancel: {

  },
  modalHeaderButtonTextSave: {

  },
  modalContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  picker: Platform.select({
    ios: {
      flex: 1,
    },
    android: {
      width: '80%',
      height: 80,
    },
  }),
  androidPickerWrapper: {
    marginLeft: '25%',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  pickerHeader: {
    textAlign: 'center',
  },
});
