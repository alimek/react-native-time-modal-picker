import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import TimePicker from './src/index';

interface State {
  value: number;
}


export default class App extends React.Component<any, State> {
  state = {
    value: 5280,
  };

  onValueChanged = (value: number): void => {
    this.setState({ value });
  };

  render() {
    return (
      <View style={styles.container}>
        <TimePicker
          value={this.state.value}
          onValueChanged={this.onValueChanged}
          minutesMaxValue={99}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
