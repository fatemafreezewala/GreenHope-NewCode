/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

import requestCameraAndAudioPermission from './Permission';

class Videohome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AppID: 'fc9521da6e7e4b5b9cc822cef14af9bb', //Set your APPID here
      ChannelName: '', //Set a default channel or leave blank
    };
    if (Platform.OS === 'android') {
      //Request required permissions from Android
      requestCameraAndAudioPermission().then((_) => {
        console.log('requested!');
      });
    }
  }
  /**
   * @name handleSubmit
   * @description Helper function to handle data on submit click
   */
  handleSubmit = () => {
    let AppID = this.state.AppID;
    let ChannelName = this.state.ChannelName;
    if (AppID !== '' && ChannelName !== '') {
      this.props.navigation.navigate('Video', {
        AppID: AppID,
        ChannelName: ChannelName,
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <TextInput
          style={styles.formInput}
          onChangeText={(AppID) => this.setState({ AppID })}
          value={this.state.AppID}
        /> */}
        <Text style={styles.formLabel}>Channel Name</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(ChannelName) => this.setState({ChannelName})}
          value={this.state.ChannelName}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title="Start Call!"
            onPress={this.handleSubmit}
            style={styles.submitButton}>
            <Text style={{color: '#ffffff'}}> Start Call </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formLabel: {
    paddingBottom: 10,
    paddingTop: 10,
    color: '#0093E9',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: 20,
    marginTop: -30,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  submitButton: {
    paddingHorizontal: 100,
    paddingVertical: 12,
    backgroundColor: '#0c7488',
    borderRadius: 25,
  },
  formInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#8eb48f',
    color: '#0093E9',
    borderRadius: 4,
    paddingLeft: 20,
    borderRadius: 33,
    marginTop: 10,
  },
});

export default Videohome;
