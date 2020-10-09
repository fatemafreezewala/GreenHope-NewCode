import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import url from '../../constant/url';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import AppContext from '../../context/AppContext';
import colors from '../../constant/colors';
import BackgroundColor from 'react-native-background-color';

import I18n from '../../i18n';
const AddStrain = ({navigation}) => {
  const [name, setname] = useState('');
  const [ischeck, setCheck] = useState(false);
  const [user, setUser] = useState({});
  const {lang, setChange, change} = useContext(AppContext);
  useEffect(() => {
    fetchUser();
    BackgroundColor.setColor('#FFFFFF');
  }, []);
  const fetchUser = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    setUser(user);
  };
  const addStrain = async () => {
    console.log(user);
    if (name == '') {
      Toast.show('Please Enter Name Of Strain.', Toast.LONG);
    } else {
      try {
        const res = await fetch(`${url}addstrain`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            thc: '',
            cbd: '',
            user_id: ischeck ? user.id : '',
          }),
        });

        const json = await res.json();

        if (json.status == '200') {
          Toast.show('Strain added Successfully.', Toast.LONG);
          setname('');
          console.log(json);
          setChange(json.name);
        }
      } catch (error) {
        Toast.show('Network connection error.', Toast.LONG);
        console.error(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            color: colors.buttonColor,
            fontSize: 20,
            fontFamily: 'Montserrat-Regular',
            alignSelf: 'center',
          }}>
          {I18n.t('Cannabis_Strain', {locale: lang})}
        </Text>
        <TextInput
          style={styles.custom}
          placeholderTextColor={colors.buttonColor}
          placeholder={I18n.t('Enter_Name', {locale: lang})}
          onChangeText={(text) => setname(text)}
          value={name}
        />
        <CheckBox
          style={{flex: 0.5, paddingRight: 40, marginTop: 30}}
          onClick={() => {
            setCheck(!ischeck);
          }}
          isChecked={ischeck}
          leftText={I18n.t('Saved_for_later', {locale: lang})}
          checkedCheckBoxColor={colors.buttonColor}
          uncheckedCheckBoxColor={colors.buttonColor}
          leftTextStyle={{
            fontSize: 20,
            color: colors.buttonColor,
            marginLeft: '10%',
          }}
        />

        <TouchableOpacity style={styles.signup} onPress={addStrain}>
          <Text style={styles.submitText}>
            {I18n.t('add_now', {locale: lang})}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddStrain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  custom: {
    width: 330,
    height: 45,
    borderWidth: 1,
    borderColor: colors.buttonColor,
    paddingLeft: 20,
    marginTop: 15,
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
  },
  footer: {
    position: 'absolute',

    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  signup: {
    width: '90%',
    height: 45,
    backgroundColor: '#f2cb05',
    borderRadius: 40,
    justifyContent: 'center',
    paddingLeft: '30%',
    marginTop: 35,
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'center',
  },
});
