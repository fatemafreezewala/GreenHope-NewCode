import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Switch,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import colors from '../../constant/colors';
import AuthContext from '../../navigation/Auth';
import url from '../../constant/url';
import Toast from 'react-native-simple-toast';
import I18n from '../../i18n';
import AppContext from '../../context/AppContext';
import RootViewBackgroundColor from 'react-native-root-view-background-color';
const Login = ({navigation}) => {
  const {signIn} = useContext(AuthContext);
  const {lang, setLang} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isShowingText, setIsShowingText] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    //RootViewBackgroundColor.setBackground(255, 255, 255, 1);
    // BackgroundColor.setColor('#FFFFFF');
    checkLanguage();
  }, []);
  const toggleSwitch = (val) => {
    setIsEnabled(val);
    if (val == true) {
      I18n.locale = 'spanish';
      setLang('spanish');
    } else {
      I18n.locale = 'en';
      setLang('en');
    }
    console.log(lang);
  };
  const checkLanguage = async () => {
    let language = await AsyncStorage.getItem('lang');
    if (language) {
      I18n.locale = language;
      setLang(language);
    }
  };
  const mylogin = async () => {
    console.log('ok');
    if (email == '' || password == '') {
      Toast.show('Email and password is required.', Toast.LONG);
    } else {
      setIsShowingText(true);
      try {
        const res = await fetch(`${url}login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const json = await res.json();
        console.log(json);
        if (json.status == '200') {
          await AsyncStorage.setItem('USER', JSON.stringify(json.data));
          await AsyncStorage.setItem('uid', json.data.id);
          await AsyncStorage.setItem('USER_TOKEN', 'qww');
          signIn('s123');
          if (json.data.role == 'doctor') {
            navigation.navigate('DoctorDash');
          } else if (json.data.role == 'admin') {
            navigation.navigate('AdminDash');
          } else {
            navigation.navigate('Home');
          }
        } else {
          Toast.show('Invalid credentials.', Toast.LONG);
        }
        setIsShowingText(false);
      } catch (error) {
        setIsShowingText(false);
        Toast.show('Network connection error.', Toast.LONG);
        console.error(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/login.png')}
            style={{width: 150, height: 150}}
          />
          <Image
            style={styles.track}
            source={require('../../assets/track1.png')}
          />
          <Image
            style={styles.track}
            source={require('../../assets/track.png')}
          />
        </View>
        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
          <Text
            style={{
              color: colors.mangoColor,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            English
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(val) => {
              toggleSwitch(val);
            }}
            value={isEnabled}
          />
          <Text
            style={{
              color: colors.buttonColor,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Spanish
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={setEmail}
            style={styles.input}
            placeholder={I18n.t('Email', {locale: lang})}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            onFocus={() => setError(null)}
          />
          <TextInput
            onChangeText={setPassword}
            style={styles.input}
            placeholder={I18n.t('Password', {locale: lang})}
            secureTextEntry
            onFocus={() => setError(null)}
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={mylogin}>
          <View style={styles.buttonWrapper}>
            {isShowingText ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>
                {I18n.t('sign_in', {locale: lang})}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <View style={styles.createAcc}>
            <Text style={styles.btnText}>
              {I18n.t('Create_Account', {locale: lang})}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  track: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '20%',
  },
  mainText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.themeViolet,
    marginHorizontal: 20,
  },
  subText: {
    fontSize: 16,
    color: colors.themeViolet,
    marginHorizontal: 20,
    marginTop: 10,
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    backgroundColor: '#fff',
    marginVertical: 10,
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    fontFamily: 'Montserrat-SemiBold',
    borderColor: '#8eb48f',
    borderWidth: 1,
    paddingLeft: 10,
    width: '100%',
    borderRadius: 33,
    color: colors.buttonColor,
  },
  buttonWrapper: {
    paddingVertical: 12,
    marginLeft: 20,
    backgroundColor: colors.buttonColor,
    alignSelf: 'flex-start',
    borderRadius: 5,
    width: '90%',
    borderRadius: 33,
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  btnText: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
  },

  createAcc: {
    paddingVertical: 12,
    marginLeft: 20,
    backgroundColor: colors.mangoColor,
    alignSelf: 'flex-start',
    borderRadius: 5,
    width: '90%',
    borderRadius: 33,
    alignItems: 'center',
    fontSize: 20,
    marginTop: 10,
  },
  tc: {
    fontSize: 16,
    color: '#756399',
    textAlign: 'center',
    marginVertical: 30,
  },
  error: {
    marginLeft: 20,
    marginBottom: 20,
    color: 'red',
  },
});
