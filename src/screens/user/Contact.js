import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';
import I18n from '../../i18n';
import url from '../../constant/url';
import AppContext from '../../context/AppContext';
const Contact = ({navigation}) => {
  const {lang} = useContext(AppContext);
  const [date, ondateText] = useState('Title');
  const [user, onEmail] = useState('');
  const [id, onId] = useState('');
  const [time, ontimeText] = useState('Description');
  const [isShowingText, setIsShowingText] = useState(false);
  const onSelectionsChange = (selected) => {
    setSelected(selected);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    onEmail(user.email);
    onId(user.id);
    console.log(user);
  };
  const mylogin = async () => {
    setIsShowingText(true);
    try {
      const res = await fetch(`${url}contactus`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: date,
          desp: time,
          email: user,
        }),
      });

      const json = await res.json();
      console.log(json);
      if (json.status == '200') {
        Toast.show('Thank you. We will contact you soon.', Toast.LONG);
        navigation.navigate('Home');
      } else {
        setIsShowingText(false);
        Toast.show(' Failed. Try again later', Toast.LONG);
      }
    } catch (error) {
      setIsShowingText(false);
      Toast.show('Network connection error.', Toast.LONG);
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Contact Us</Text>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Icon
          style={styles.inbox}
          name="arrow-left-circle"
          size={30}
          color="#0c7488"
        />
      </TouchableWithoutFeedback>

      <TextInput
        placeholder="Title"
        style={styles.myInp}
        onChangeText={(text) => ondateText(text)}
      />

      <TextInput
        placeholder={I18n.t('description', {locale: lang})}
        onChangeText={(text) => ontimeText(text)}
        style={styles.textarea}
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
            {' '}
            {I18n.t('send_request', {locale: lang})}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 10,
  },
  inbox: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  head: {
    fontSize: 22,
    fontFamily: 'Montserrat-Regular',
    color: '#0e8169',
    position: 'absolute',
    top: 45,
  },
  myInp: {
    borderRadius: 10,
    width: '85%',
    height: 50,
    borderWidth: 1,
    borderColor: '#8eb48f',
    paddingLeft: 20,
    marginTop: 25,
    paddingTop: 10,
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  signup: {
    width: '85%',
    height: 50,
    backgroundColor: '#4b8f7a',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  submitText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    color: '#fff',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
    width: '85%',
    borderWidth: 1,
    borderColor: '#8eb48f',
    borderRadius: 10,
    marginTop: 20,
  },
});
export default Contact;
