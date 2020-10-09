import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import AppContext from '../../context/AppContext';
import I18n from '../../i18n';
const RoleCheck = ({navigation}) => {
  const {lang, setLang} = useContext(AppContext);
  useEffect(() => {
    roleCheck();
  }, []);
  const checkLanguage = async () => {
    let language = await AsyncStorage.getItem('lang');
    if (language) {
      I18n.locale = language;
      setLang(language);
    }
  };
  const roleCheck = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    checkLanguage();
    if (user.role == 'user') {
      console.log(user.role);
      navigation.navigate('Home');
    } else if (user.role == 'admin') {
      navigation.navigate('AdminDash');
    } else {
      navigation.navigate('DoctorDash');
    }
  };
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default RoleCheck;

const styles = StyleSheet.create({});
