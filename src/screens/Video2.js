import React, {useState, useEffect} from 'react';
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
const Video2 = ({route, navigation}) => {
  const [peerIds, setpeerIds] = useState('');
  // const {AppID} = route.params;
  const {ChannelName} = route.params;
  const [vidMute, setvidMute] = useState(true);
  const [audMute, setaudMute] = useState(false);
  const [joinSucceed, setjoinSucceed] = useState(false);
  const [prevState, setprevState] = useState('');
  const uid = Math.floor(Math.random() * 100);
  const config = {
    appid: '67a7769981df45359020561bad947353',
    channelProfile: 0,
    videoEncoderConfig: {
      width: 720,
      height: 1080,
      bitrate: 1,
      frameRate: FPS30,
      orientationMode: Adaptative,
    },
    audioProfile: AudioProfileDefault,
    audioScenario: AudioScenarioDefault,
  };

  useEffect(() => {
    console.log('from vide', ChannelName);
    RtcEngine.init(config);
    RtcEngine.on('userJoined', (data) => {
      //Get currrent peer IDs
      if (peerIds.indexOf(data.uid) === -1) {
        //If new user has joined
        setpeerIds([...peerIds, data.uid]); //add peer ID to state array
      }
    });
    RtcEngine.on('userOffline', (data) => {
      //If user leaves
      let arr = peerIds.filter((uid) => uid !== data.uid);
      setpeerIds(arr);
    });
    RtcEngine.on('joinChannelSuccess', (data) => {
      //If Local user joins RTC channel
      RtcEngine.startPreview(); //Start RTC preview
      setjoinSucceed(true);
    });
    RtcEngine.joinChannel(ChannelName, uid); //Join Channel
    RtcEngine.enableAudio(); //Enable the audio
  }, []);

  const endCall = async () => {
    RtcEngine.destroy();
    navigation.navigate('ViewAppointment');
  };
  const toggleAudio = () => {
    let mute = audMute;
    console.log('Audio toggle', mute);
    RtcEngine.muteLocalAudioStream(!mute);
    setaudMute(!mute);
  };
  const toggleVideo = () => {
    let mute = vidMute;
    console.log('Video toggle', mute);
    setvidMute(!mute);
    RtcEngine.muteLocalVideoStream(!mute);
  };
  const peerClick = (data) => {
    let peerIdToSwap = peerIds.indexOf(data);

    let currentPeers = [...prevState.peerIds];
    let temp = currentPeers[peerIdToSwap];
    currentPeers[peerIdToSwap] = currentPeers[0];
    currentPeers[0] = temp;
    setpeerIds(currentPeers);
  };
  return (
    <View style={{flex: 1}}>
      {peerIds.length > 1 ? (
        <View style={{flex: 1}}>
          <View style={{height: (dimensions.height * 3) / 4 - 50}}>
            <AgoraView
              style={{flex: 1}}
              remoteUid={peerIds[0]}
              mode={1}
              key={peerIds[0]}
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
              {peerIds.slice(1).map((data) => (
                <TouchableOpacity
                  style={{
                    width: dimensions.width / 2,
                    height: dimensions.height / 4,
                  }}
                  onPress={peerClick(data)}
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
      ) : peerIds.length > 0 ? (
        <View style={{height: dimensions.height - 50}}>
          <AgoraView style={{flex: 1}} remoteUid={peerIds[0]} mode={1} />
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
      {vidMute ? ( //view for local video
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
        <TouchableWithoutFeedback onPress={toggleAudio}>
          {audMute ? (
            <Octicons style={styles.menu} name="mute" size={30} color="#fff" />
          ) : (
            <Octicons
              style={styles.menu}
              name="unmute"
              size={30}
              color="#fff"
            />
          )}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={endCall}>
          <Icon style={styles.menu} name="phone-off" size={30} color="#fff" />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={toggleVideo}>
          {vidMute ? (
            <Icon style={styles.menu} name="video-off" size={30} color="#fff" />
          ) : (
            <Icon style={styles.menu} name="video" size={30} color="#fff" />
          )}
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
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
export default Video2;
