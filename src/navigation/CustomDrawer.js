import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import colors from '../constant/colors';

import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import I18n from '../i18n';
import AppContext from '../context/AppContext';

import AsyncStorage from '@react-native-community/async-storage';
import AuthContext from '../navigation/Auth';
import Ant from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
function CustomDrawer(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const {signOut} = useContext(AuthContext);
  const {lang, setLang, userData} = useContext(AppContext);
  useEffect(() => {
    console.log(userData);
  }, []);
  const rateUs = async () => {
    console.log('Ok');
    if (Platform.OS === 'android') {
      Linking.openURL(
        'itms-apps://itunes.apple.com/us/app/apple-store/id1526500547?mt=8',
      );
    } else {
      Linking.openURL(
        'itms-apps://itunes.apple.com/us/app/apple-store/id1526500547?mt=8',
      );
    }
  };
  const toggleSwitch = async (val) => {
    setIsEnabled(val);
    if (val == true) {
      I18n.locale = 'spanish';
      setLang('spanish');
      await AsyncStorage.setItem('lang', 'spanish');
    } else {
      I18n.locale = 'en';
      setLang('en');
      await AsyncStorage.setItem('lang', 'en');
    }
    console.log(lang);
  };
  const Logout = async () => {
    await AsyncStorage.clear();
    signOut();
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.themeRed}}>
      <View style={styles.drawerHeader}>
        {userData.image == '' ? (
          <Image
            style={{
              width: 100,
              height: 100,

              marginTop: '10%',
            }}
            source={require('../assets/profileimage.png')}
          />
        ) : (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginTop: '10%',
            }}
            source={{uri: userData.image}}
          />
        )}

        <Text>{'\n'}14 Days Left</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <TouchableOpacity onPress={rateUs}>
          <View style={{flexDirection: 'row', marginTop: '1%'}}>
            <Icon
              style={{marginLeft: '7%', marginTop: '3%'}}
              name="star"
              size={25}
              color="#fff"
            />
            <Text
              style={{
                color: '#fff',
                marginLeft: '10%',
                marginTop: '3%',
                fontSize: 15,
              }}>
              {I18n.t('rate_us', {locale: lang})}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('Contact')}>
          <View style={{flexDirection: 'row', marginTop: '5%'}}>
            <Icon
              style={{marginLeft: '7%', marginTop: '3%'}}
              name="mail"
              size={25}
              color="#fff"
            />
            <Text
              style={{
                color: '#fff',
                marginLeft: '10%',
                marginTop: '3%',
                fontSize: 15,
              }}>
              {I18n.t('Contact_Us', {locale: lang})}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Logout}>
          <View style={{flexDirection: 'row', marginTop: '5%'}}>
            <Ant
              style={{marginLeft: '7%', marginTop: '3%'}}
              name="logout"
              size={25}
              color="#fff"
            />
            <Text
              style={{
                color: '#fff',
                marginLeft: '10%',
                marginTop: '3%',
                fontSize: 15,
              }}>
              {I18n.t('Logout', {locale: lang})}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginTop: 20,
            marginLeft: 15,
          }}>
          <Text
            style={{
              color: '#fff',
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
              color: '#fff',
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Spanish
          </Text>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  drawerHeader: {
    elevation: 3,
    backgroundColor: colors.themeRed,
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appName: {
    color: '#fff',
    fontFamily: 'MyriadPro-Regular',
    fontSize: 20,
    marginLeft: 15,
  },
});

export default CustomDrawer;
