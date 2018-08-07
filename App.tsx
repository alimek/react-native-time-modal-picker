import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TimePicker from './src/index';

interface State {
  value: number;
}

export default class App extends React.Component<any, State> {
  state = {
    value: 1230,
  };

  render() {
    return (
      <View style={styles.container}>
        <TimePicker
          value={this.state.value}
          onValueChanged={value => this.setState({ value })}
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
