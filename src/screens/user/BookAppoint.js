import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../../constant/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import AsyncStorage from '@react-native-community/async-storage';
import url from '../../constant/url';
import Toast from 'react-native-simple-toast';
import AppContext from '../../context/AppContext';
import I18n from '../../i18n';
const BookAppoint = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, ondateText] = useState('Prefered Date');
  const [time, ontimeText] = useState('Prefered Time');
  const [isShowingText, setIsShowingText] = useState(false);
  const [selected, setSelected] = useState('Health Coach');
  const [regionList, setRegionList] = useState([{id: '', name: ''}]);
  const [list, setList] = useState([]);
  const {lang} = useContext(AppContext);
  const [basic, setBasic] = useState([
    {label: 'Health Coach', name: 'Health Coach', id: '1'},
  ]);
  const [premium, setPre] = useState([
    {label: 'Doctor', name: 'Doctor', id: '1'},
    {label: 'Health Coach', name: 'Health Coach', id: '2'},
  ]);
  const [user, onEmail] = useState('');
  const [id, onId] = useState('');
  const [userObj, setuserObj] = useState({});
  useEffect(() => {
    fetchUser();
    ondateText(I18n.t('Prefered_Date', {locale: lang}));
    ontimeText(I18n.t('Prefered_Date', {locale: lang}));
  }, []);
  const fetchUser = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    onEmail(user.email);
    onId(user.id);
    setuserObj(user);
    if (user.subs_category == '2') {
      console.log('ok');
      setList(basic);
    } else {
      setList(premium);
    }
  };
  const mylogin = async () => {
    if (date == 'Prefered Date' || time == 'Prefered Time') {
      Alert.alert('All Fields are mandatory.');
    } else {
      setIsShowingText(true);
      try {
        const res = await fetch(`${url}bookappointent`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: date,
            time: time,
            id: id,
            email: user,
            schedule_for: selected[0].value,
          }),
        });

        const json = await res.json();
        console.log(json);
        if (json.status == '200') {
          Toast.show(
            'Thank you for making an appointment with Green Hope. Kindly check your email for details.',
            Toast.LONG,
          );
          navigation.navigate('Home');
        } else {
          setIsShowingText(false);
          Toast.show('Booking failed.', Toast.LONG);
        }
      } catch (error) {
        setIsShowingText(false);
        Toast.show('Network connection error.', Toast.LONG);
        console.error(error);
      }
    }
  };
  const checkSubs = async () => {
    let user = await AsyncStorage.getItem('USER');
    console.log(user);
    if (user.subs_category == '2') {
      console.log('ok');
      setList(basic);
    } else {
      setList(premium);
    }
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const handleConfirm = (date) => {
    let newDate = JSON.stringify(date);
    newDate = newDate.slice(1, 11);
    ondateText(newDate);
    console.log('A date has been picked: ', JSON.stringify(date));
    // ondateText(date);
    hideDatePicker();
  };
  const handleConfirmTime = (time) => {
    let newTime = JSON.stringify(time);
    var d = new Date(time);
    var hor = d.getHours();
    var min = d.getMinutes();
    var comlete = hor + ':' + min;
    console.log(comlete);
    ontimeText(comlete);
    console.log(d.getHours());

    hideDatePickerTime();
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePickerTime = () => {
    setTimePickerVisibility(false);
  };
  const renderLabel = (label, style) => {
    return (
      <View style={{flexDirection: 'row', width: '80%', alignItems: 'center'}}>
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              color: '#abc7ab',
              fontFamily: 'Montserrat-Regular',
              fontSize: 18,
            }}>
            {label}
          </Text>
        </View>
      </View>
    );
  };
  const onSelectionsChange = (selected) => {
    setSelected(selected);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FEA name="arrow-left-circle" size={30} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{marginTop: '20%'}}>
          <Text style={styles.head}>
            {I18n.t('Book_Appointment', {locale: lang})}
          </Text>
          <TouchableWithoutFeedback onPress={showDatePicker}>
            <Text style={styles.myInp}>{date}</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={showTimePicker}>
            <Text style={styles.myInp}>{time}</Text>
          </TouchableWithoutFeedback>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideDatePickerTime}
          />
        </View>
        <View style={{marginLeft: '10%', marginTop: '10%'}}>
          {list.map((item, i) => {
            return (
              <TouchableOpacity
                style={styles.dialogTouch}
                key={i}
                onPress={() => {
                  setSelected(item.name);
                }}>
                <View style={styles.radio}>
                  {item.name.toUpperCase() === selected.toUpperCase() && (
                    <View style={styles.radioActive}></View>
                  )}
                </View>
                <Text style={styles.dialogOption}>
                  {item.name.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
              {I18n.t('BOOK_NOW', {locale: lang})}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default BookAppoint;

const styles = StyleSheet.create({
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.themeRed,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  myInp: {
    borderRadius: 5,
    width: '85%',
    height: 50,
    borderWidth: 1,
    borderColor: '#8eb48f',
    paddingLeft: 20,
    marginTop: 25,
    paddingTop: 10,
    fontSize: 20,
    alignSelf: 'center',
  },
  head: {
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#0e8169',

    alignSelf: 'center',
  },
  signup: {
    width: '85%',
    height: 50,
    backgroundColor: '#4b8f7a',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    alignSelf: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  dialogOption: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.buttonColor,
  },
  radio: {
    height: 30,
    width: 30,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 3,
    borderColor: colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: colors.buttonColor,
  },
  dialogTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});
