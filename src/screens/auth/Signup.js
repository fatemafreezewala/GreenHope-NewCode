import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../../constant/colors';
import url from '../../constant/url';
import AuthContext from '../../navigation/Auth';
import AppContext from '../../context/AppContext';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';
import I18n from '../../i18n';
import moment from 'moment';
import BackgroundColor from 'react-native-background-color';
const Signup = ({navigation}) => {
  const {signIn} = useContext(AuthContext);

  const [email, onemailText] = useState('');
  const [password, onpassText] = useState('');
  const [name, onnameText] = useState('');
  const [cpassword, oncpassText] = useState('');
  const {lang} = useContext(AppContext);
  const [isShowingText, setIsShowingText] = useState(false);
  const [emailError, onemailError] = useState('');
  useEffect(() => {
    BackgroundColor.setColor('#FFFFFF');
    // DateDiff();
  }, []);

  const mylogin = async () => {
    if (password != '' || cpassword != '' || email != '' || name != '') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        onemailError('Invalid Email');
        Toast.show('Invalid Email.', Toast.LONG);
      } else {
        if (password == cpassword) {
          setIsShowingText(true);
          let d1 = moment(new Date().toISOString());
          try {
            const res = await fetch(`${url}signup`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                role: 'user',
                regDate: d1,
                expireDate: 'no',
                is_free: 'true',
                subs_category: '3',
              }),
            });

            const json = await res.json();
            console.log(json);
            if (json.status == '200') {
              await AsyncStorage.setItem('USER', JSON.stringify(json.data));

              navigation.navigate('GetStarted');
            } else if (json.status == '500') {
              Toast.show('Email Already Exist.', Toast.LONG);
            } else {
              setIsShowingText(false);
              Toast.show('Network connection error.', Toast.LONG);
            }
          } catch (error) {
            setIsShowingText(false);
            Toast.show('Network connection error.', Toast.LONG);
            console.error(error);
          }
        } else {
          Toast.show('Password And Confirm Password donot match.', Toast.LONG);
        }
      }
    } else {
      Toast.show('All Fields are required.', Toast.LONG);
    }
  };
  const DateDiff = () => {
    let numWeeks = 2;
    let now = new Date();
    console.log(now);
    now.setDate(now.getDate() + numWeeks * 7);
    console.log(now);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
          <Icon
            style={styles.inbox}
            name="arrow-left-circle"
            size={30}
            color="#fff"
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Text
            style={{
              left: 80,
              color: '#fff',
              fontSize: 23,
              position: 'absolute',
              top: 40,
            }}>
            {I18n.t('Thanks_for_signing_up', {locale: lang})}
          </Text>
        </TouchableWithoutFeedback>
        <View style={styles.formbox}>
          <Text style={styles.head}>
            {I18n.t('Create_an_accoun', {locale: lang})}
          </Text>
          <TextInput
            placeholder={I18n.t('Full_name', {locale: lang})}
            textContentType="password"
            style={styles.myInp}
            onChangeText={(text) => onnameText(text)}
            placeholderTextColor="#c2d7c3"
          />
          <TextInput
            placeholder={I18n.t('Email', {locale: lang})}
            textContentType="password"
            style={styles.myInp}
            onChangeText={(text) => onemailText(text)}
            placeholderTextColor="#c2d7c3"
          />

          <TextInput
            placeholder={I18n.t('Password', {locale: lang})}
            textContentType="password"
            style={styles.myInp}
            secureTextEntry={true}
            onChangeText={(text) => onpassText(text)}
            placeholderTextColor="#c2d7c3"
          />
          <TextInput
            placeholder={I18n.t('confirm_password', {locale: lang})}
            secureTextEntry={true}
            textContentType="password"
            style={styles.myInp}
            onChangeText={(text) => oncpassText(text)}
            placeholderTextColor="#c2d7c3"
          />
          <Text style={styles.green}>
            {I18n.t(
              'By_creating_an_account_you_agree_to_our_Terms_of_Service_and_Privacy_Policy',
              {locale: lang},
            )}
          </Text>
          <TouchableOpacity onPress={mylogin} style={styles.signup}>
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mangoColor,
  },
  myInp: {
    width: '90%',
    borderWidth: 1,
    height: 40,
    borderColor: '#8eb48f',
    marginTop: 20,
    paddingVertical: 0,

    fontSize: 18,
    paddingLeft: 15,
  },
  submitText: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
  },
  green: {
    color: '#0e8169',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
  },
  signup: {
    backgroundColor: '#0ea1bc',
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 40,
  },
  formbox: {
    width: '90%',
    height: 445,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 70,
    alignSelf: 'center',
    marginTop: '10%',
  },
  head: {
    color: '#0e8169',
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    color: '#fff',
  },
  inbox: {
    marginTop: '10%',
    marginLeft: 20,
  },
});
export default Signup;
