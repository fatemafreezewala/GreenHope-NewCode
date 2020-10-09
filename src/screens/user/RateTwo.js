import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../../constant/colors';
import Toast from 'react-native-simple-toast';
import url from '../../constant/url';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../i18n';
import AppContext from '../../context/AppContext';
const RateTwo = ({navigation}) => {
  const {lang} = useContext(AppContext);
  const [id, setIsUserText] = useState('');
  const [feelingsone, setFeelingsone] = useState([]);
  const [feelingstwo, setFeelingstwo] = useState([]);
  const [emoji, setEmoji] = useState([]);
  const [method, setMethod] = useState('');
  const [strain, setStrain] = useState('');
  const [time, setTime] = useState('');

  const [rate, setRating] = useState('');
  const [notes, setNotes] = useState('');
  const [isShowingText, setIsShowingText] = useState(false);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    setIsUserText(user.id);
    let tracktow = await AsyncStorage.getItem('trackthree');
    tracktow = JSON.parse(tracktow);
    setFeelingsone(tracktow);
    let mm = await AsyncStorage.getItem('trackfour');
    setMethod(mm);
    let ss = await AsyncStorage.getItem('strain');
    setStrain(ss);

    let tt = '00:00:00';
    setTime(tt);

    let emk = await AsyncStorage.getItem('Aftersessiontwo');
    emk = JSON.parse(emk);
    setEmoji(emk);
  };
  const onChange = (text) => {
    setNotes(text);
  };
  const mylogin = async () => {
    setIsShowingText(true);
    try {
      const res = await fetch(`${url}save`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feelingbefore: feelingsone,
          feelingafter: feelingstwo,
          method: method,
          strain: strain,
          time: '0:00',
          emoji: emoji,
          star: '0',
          notes: notes,
          id: id,
          review_status: 'pending',
        }),
      });

      const json = await res.json();
      if (json.status == '200') {
        notig();
        Toast.show('Session Saved Successfully.', Toast.LONG);
        await AsyncStorage.setItem('rate', JSON.stringify(json.data));
        navigation.navigate('Thankyouthirty');
      } else {
        Toast.show('Network connection error.', Toast.LONG);
      }
      setIsShowingText(false);
    } catch (error) {
      Toast.show('Network connection error.', Toast.LONG);
      console.error(error);
      setIsShowingText(false);
    }
  };

  const notig = () => {
    console.log(method);
    if (Platform.OS === 'android') {
      PushNotification.localNotificationSchedule({
        title: 'Please Fill The Session Review',
        message: 'you can fill review by visiting track usage section',
        date: new Date(Date.now() + 120 * 60 * 1000), // in 60 secs
      });
    } else {
      PushNotificationIOS.scheduleLocalNotification({
        fireDate: new Date(Date.now() + 120 * 60 * 1000).toISOString(),
        alertTitle: 'Please Fill The Session Review',
        alertBody: 'you can fill review by visiting track usage section',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FEA name="arrow-left-circle" size={30} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.starttitlt}>
          {I18n.t('Take_some_notes', {locale: lang})}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Montserrat-SemiBold',
            marginTop: '10%',
          }}>
          {I18n.t(
            'Have_you_tried_anything_else_to_help_alleviate_your_symptoms',
            {locale: lang},
          )}
          {'\n'}
          {'\n'}
          {I18n.t('Have_you_also_tried_other_consumption_methods', {
            locale: lang,
          })}
          {'\n'}
          {'\n'}
          {I18n.t('How_long_have_you_been_medicating_with_cannabis', {
            locale: lang,
          })}
        </Text>
        <TextInput
          onChangeText={(text) => {
            onChange(text);
          }}
          placeholder={I18n.t('Notes', {locale: lang})}
          style={styles.textInput}
        />

        <TouchableOpacity style={styles.signup} onPress={mylogin}>
          {isShowingText ? (
            <ActivityIndicator
              animating={true}
              style={styles.indicator}
              size="small"
              color="#fff"
            />
          ) : (
            <Text style={styles.submitText}>
              {I18n.t('Continue', {locale: lang})}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RateTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  starttitlt: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginTop: 10,

    alignSelf: 'center',
  },
  textInput: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
    width: 300,
    borderWidth: 1,
    borderColor: '#12a2bd',
    borderRadius: 10,
    marginTop: 30,
    alignSelf: 'center',
  },
  signup: {
    width: '90%',
    height: 45,
    backgroundColor: '#f2cb05',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
