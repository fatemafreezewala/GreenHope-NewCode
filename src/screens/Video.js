/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  NativeModules,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import {RtcEngine, AgoraView} from '@zhigang1992/react-native-agora';
import Icon from 'react-native-vector-icons/dist/Feather';
const {Agora} = NativeModules; //Define Agora object as a native module
import Octicons from 'react-native-vector-icons/dist/Octicons';
import AsyncStorage from '@react-native-community/async-storage';
const {FPS30, AudioProfileDefault, AudioScenarioDefault, Adaptative} = Agora;

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peerIds: [], //Array for storing connected peers
      uid: Math.floor(Math.random() * 100), //Generate a UID for local user
      appid: '67a7769981df45359020561bad947353', //Enter the App ID generated from the Agora Website
      channelName: 'dsasda', //Channel Name for the current session
      vidMute: false, //State variable for Video Mute
      audMute: false, //State variable for Audio Mute
      joinSucceed: false, //State variable for storing success
    };
    const config = {
      //Setting config of the app
      appid: this.state.appid, //App ID
      channelProfile: 0, //Set channel profile as 0 for RTC
      videoEncoderConfig: {
        //Set Video feed encoder settings
        width: 720,
        height: 1080,
        bitrate: 1,
        frameRate: FPS30,
        orientationMode: Adaptative,
      },
      audioProfile: AudioProfileDefault,
      audioScenario: AudioScenarioDefault,
    };

    RtcEngine.init(config); //Initialize the RTC engine
  }
  componentDidMount() {
    RtcEngine.on('userJoined', (data) => {
      const {peerIds} = this.state; //Get currrent peer IDs
      if (peerIds.indexOf(data.uid) === -1) {
        //If new user has joined
        this.setState({
          peerIds: [...peerIds, data.uid], //add peer ID to state array
        });
      }
    });
    RtcEngine.on('userOffline', (data) => {
      //If user leaves
      this.setState({
        peerIds: this.state.peerIds.filter((uid) => uid !== data.uid), //remove peer ID from state array
      });
    });
    RtcEngine.on('joinChannelSuccess', (data) => {
      //If Local user joins RTC channel
      RtcEngine.startPreview(); //Start RTC preview
      this.setState({
        joinSucceed: true, //Set state variable to true
      });
    });
    RtcEngine.joinChannel(this.state.channelName, this.state.uid); //Join Channel
    RtcEngine.enableAudio(); //Enable the audio
  }
  /**
   * @name toggleAudio
   * @description Function to toggle local user's audio
   */
  toggleAudio() {
    let mute = this.state.audMute;
    console.log('Audio toggle', mute);
    RtcEngine.muteLocalAudioStream(!mute);
    this.setState({
      audMute: !mute,
    });
  }
  /**
   * @name toggleVideo
   * @description Function to toggle local user's video
   */
  toggleVideo() {
    let mute = this.state.vidMute;
    console.log('Video toggle', mute);
    this.setState({
      vidMute: !mute,
    });
    RtcEngine.muteLocalVideoStream(!this.state.vidMute);
  }
  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    RtcEngine.destroy();
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    if (user) {
      if (user.role == 'user') {
        this.props.navigation.navigate('Home');
      } else if (user.role == 'admin') {
        this.props.navigation.navigate('Admindashboard');
      } else if (user.role == 'doctor') {
        this.props.navigation.navigate('Doctordashboard');
      }
    }
  };
  /**
   * @name peerClick
   * @description Function to swap the main peer videostream with a different peer videostream
   */
  peerClick(data) {
    let peerIdToSwap = this.state.peerIds.indexOf(data);
    this.setState((prevState) => {
      let currentPeers = [...prevState.peerIds];
      let temp = currentPeers[peerIdToSwap];
      currentPeers[peerIdToSwap] = currentPeers[0];
      currentPeers[0] = temp;
      return {peerIds: currentPeers};
    });
  }
  /**
   * @name videoView
   * @description Function to return the view for the app
   */
  videoView() {
    return (
      <View style={{flex: 1}}>
        {this.state.peerIds.length > 1 ? (
          <View style={{flex: 1}}>
            <View style={{height: (dimensions.height * 3) / 4 - 50}}>
              <AgoraView
                style={{flex: 1}}
                remoteUid={this.state.peerIds[0]}
                mode={1}
                key={this.state.peerIds[0]}
              />
            </View>
            <View style={{height: dimensions.height / 4}}>
              <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={dimensions.width / 2}
                snapToAlignment={'center'}
                style={{
                  width: dimensions.width,
                  height: dimensions.height / 4,
                }}>
                {this.state.peerIds.slice(1).map((data) => (
                  <TouchableOpacity
                    style={{
                      width: dimensions.width / 2,
                      height: dimensions.height / 4,
                    }}
                    onPress={() => this.peerClick(data)}
                    key={data}>
                    <AgoraView
                      style={{
                        width: dimensions.width / 2,
                        height: dimensions.height / 4,
                      }}
                      remoteUid={data}
                      mode={1}
                      key={data}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : this.state.peerIds.length > 0 ? (
          <View style={{height: dimensions.height - 50}}>
            <AgoraView
              style={{flex: 1}}
              remoteUid={this.state.peerIds[0]}
              mode={1}
            />
          </View>
        ) : (
          <Text
            style={{
              marginTop: '50%',
              fontSize: 20,
              fontFamily: 'Montserrat-SemiBold',
              textAlign: 'center',
            }}>
            Please wait for your cannabis coach to join the call.
          </Text>
        )}
        {!this.state.vidMute ? ( //view for local video
          <AgoraView
            style={styles.localVideoStyle}
            zOrderMediaOverlay={true}
            showLocalVideo={true}
            mode={1}
          />
        ) : (
          <View />
        )}
        <View style={styles.buttonBar}>
          {/* <Button
            title="mute"
            style={styles.iconStyle}
            backgroundColor="#0093E9"
            name={this.state.audMute ? 'mic-off' : 'mic'}
            onPress={() => this.toggleAudio()}
          /> */}

          <TouchableWithoutFeedback onPress={() => this.toggleAudio()}>
            {this.state.audMute ? (
              <Octicons
                style={styles.menu}
                name="mute"
                size={30}
                color="#fff"
              />
            ) : (
              <Octicons
                style={styles.menu}
                name="unmute"
                size={30}
                color="#fff"
              />
            )}
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.endCall()}>
            <Icon style={styles.menu} name="phone-off" size={30} color="#fff" />
          </TouchableWithoutFeedback>
          {/* <Button
            title="end"
            style={styles.iconStyle}
            backgroundColor="#0093E9"
            name="call-end"
            onPress={() => this.endCall()}
          /> */}
          <TouchableWithoutFeedback onPress={() => this.toggleVideo()}>
            {this.state.vidMute ? (
              <Icon
                style={styles.menu}
                name="video-off"
                size={30}
                color="#fff"
              />
            ) : (
              <Icon style={styles.menu} name="video" size={30} color="#fff" />
            )}
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
  render() {
    return this.videoView();
  }
}

let dimensions = {
  //get dimensions of the device to use in view styles
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
  buttonBar: {
    height: 50,
    backgroundColor: '#0093E9',
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  localVideoStyle: {
    width: 140,
    height: 160,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 100,
  },
  iconStyle: {
    fontSize: 34,
    paddingTop: 15,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 15,
    borderRadius: 0,
  },
  menu: {
    marginLeft: 30,
    marginTop: 10,
  },
});

export default Video;
