import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../../constant/colors';
import Ion from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import url from '../../constant/url';
import requestCameraAndAudioPermission from '../Permission';
import AppContext from '../../context/AppContext';
import I18n from '../../i18n';
const ViewAppointment = ({navigation}) => {
  const [list, setList] = useState([]);
  const {lang} = useContext(AppContext);
  const [isShowingText, setIsShowingText] = useState(true);
  const [onerror, setOnerrorText] = useState(false);
  useEffect(() => {
    mylogin();
    if (Platform.OS === 'android') {
      //Request required permissions from Android
      requestCameraAndAudioPermission().then((_) => {
        console.log('requested!');
      });
    }
  }, []);
  const mylogin = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    console.log(user);
    setIsShowingText(true);
    try {
      const res = await fetch(`${url}getallapointmentbyid`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
        }),
      });
      setIsShowingText(false);
      const json = await res.json();

      if (json.status == '200') {
        if (json.data) {
          setList(json.data);
        } else {
          setOnerrorText(true);
        }
      }
    } catch (error) {
      setIsShowingText(false);
      Toast.show('Network connection error.', Toast.LONG);
      console.error(error);
    }
  };
  const gotovideo = async (id, time, date) => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    const date1 = new Date(today);
    const date2 = new Date(date);
    if (date > today) {
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      Toast.show(`This call is scheduled after ${diffDays} days.`, Toast.LONG);
    } else if ((date = today)) {
      await AsyncStorage.setItem('channelid', id);

      navigation.navigate('Video2', {
        AppID: '67a7769981df45359020561bad947353',
        ChannelName: id,
      });
    } else {
      Toast.show('Your appointment has expired.', Toast.LONG);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FEA name="arrow-left-circle" size={40} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <Text style={styles.head}>
        {I18n.t('my_appointment', {locale: lang})}
      </Text>
      {onerror && <Text style={styles.subhead}>No Appointment found !</Text>}

      {isShowingText && <ActivityIndicator size="large" color="#f2cb05" />}
      <ScrollView>
        {list.map((item) => {
          return (
            <View style={styles.box}>
              <Text style={{fontWeight: 'bold'}}>
                {I18n.t('Date', {locale: lang})} : {item.date}
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {I18n.t('Time', {locale: lang})} : {item.time}
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                Scheduled For : {item.scheduled_for}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  gotovideo(item.booking_id, item.time, item.date);
                }}
                style={{
                  width: 150,
                  height: 30,
                  backgroundColor: colors.mangoColor,
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                }}>
                <Text style={{textAlign: 'center', color: '#fff'}}>
                  {I18n.t('JOIN_NOW', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ViewAppointment;

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
    height: 110,

    padding: 10,
    justifyContent: 'flex-start',
    padding: 20,
    // justifyContent: 'space-between',
  },
  cardMiddle: {
    flexDirection: 'column',
    width: '40%',
  },
  badgeGreen: {
    backgroundColor: 'green',
    alignSelf: 'flex-end',
    color: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: '-10%',
  },
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.themeRed,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  head: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  subhead: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
