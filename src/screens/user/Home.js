import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Platform,
  Alert,
} from 'react-native';
import colors from '../../constant/colors';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import I18n from '../../i18n';
import AppContext from '../../context/AppContext';
import messaging from '@react-native-firebase/messaging';
import url from '../../constant/url';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
const Home = ({navigation}) => {
  const {lang, setLang, userData, setuserData} = useContext(AppContext);
  const [user, setIsShowingText] = useState({});
  useEffect(() => {
    fetchUser();

    if (Platform.OS === 'ios') {
      checkApplicationPermission();
    }
  }, []);

  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      let token = await messaging.getToken();
      iosfetchUser(token);
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
    } else {
    }
  }
  const iosfetchUser = async (token) => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    try {
      let id = await AsyncStorage.getItem('uid');
      console.log(id);

      const res = await fetch(`${url}updatetoken`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          id: user.id,
        }),
      });
      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
    setIsShowingText(user);
  };
  const fetchUser = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    setIsShowingText(user);
    checkSubscription(user.register_at);
    setuserData(user);
    try {
      let id = await AsyncStorage.getItem('uid');

      let token = await messaging().getToken();

      const res = await fetch(`${url}updatetoken`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          id: user.id,
        }),
      });
      const json = await res.json();
      // console.log('update token', json);
      if (json.status == '200') {
        await AsyncStorage.setItem('USER', json.data);
        setuserData(json.data);
        setIsShowingText(json.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkSubscription = async (dateReg) => {
    console.log('subscription');
    let d1 = moment(new Date().toISOString());
    let d2 = moment(dateReg);
    let diff = d1.diff(d2, 'hours');

    //if (diff >= 1) {
    Alert.alert(
      'Subscription Expired',
      'Do you want to renew ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.navigate('InAppPayment'),
        },
      ],
      {cancelable: false},
    );

    let UserObj = await AsyncStorage.getItem('USER');
    UserObj = JSON.parse(UserObj);
    let is_free = '';
    is_free = 'true';
    try {
      const res = await fetch(`${url}updateSubs`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_free: '',
          subs: '3',
          id: UserObj.id,
          expiry: 'yes',
        }),
      });
      const json = await res.json();
      if (json.status == '200') {
        await AsyncStorage.setItem('USER', JSON.stringify(json.data));
      }
    } catch (error) {
      console.error(error);
    }
    // }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MCI name="menu" size={40} color="#0ea1bc" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log(user);
            if (user.is_free == 'true' || user.subs_category != '3') {
              navigation.navigate('Chat', {
                userId: user.id,
                userName: user.fullname,
                role: user.role,
              });
            } else {
              Alert.alert(
                'Subscription Expired',
                'To use Chat renew Subscription?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('InAppPayment'),
                  },
                ],
                {cancelable: false},
              );
            }
          }}>
          <FEA name="inbox" size={40} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.textname}>
          {I18n.t('Hi', {locale: lang})}! {user.fullname} {'\n'}{' '}
          {I18n.t('Lets_Get_Started', {locale: lang})}
        </Text>
        <Image
          style={{width: 190, height: 190, alignSelf: 'center', marginTop: 20}}
          source={require('../../assets/login.png')}></Image>
        <TouchableOpacity
          style={styles.signup}
          onPress={() => navigation.navigate('Trackone')}>
          <Text style={styles.submitText}>
            {I18n.t('track_usage', {locale: lang})}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cresources')}
          style={styles.submit}>
          <Text style={styles.submitText}>
            {I18n.t('Cannabis_Resources', {locale: lang})}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.themeRed,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  appName: {
    color: '#fff',
    fontFamily: 'MyriadPro-Regular',
    fontSize: 26,
  },
  submit: {
    width: '90%',
    height: 50,
    backgroundColor: '#0ea1bc',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'center',
  },
  signup: {
    width: '90%',
    height: 50,
    backgroundColor: '#f2cb05',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 21,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  },
  textname: {
    textAlign: 'center',
    color: '#0ea1bc',
    fontSize: 30,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 30,
  },
});
