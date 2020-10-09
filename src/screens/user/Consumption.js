import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../../constant/colors';
import I18n from '../../i18n';
import AppContext from '../../context/AppContext';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

const Consumption = ({navigation}) => {
  const {lang} = useContext(AppContext);
  const [radio_props, setIsShowingText] = useState([
    {label: 'Concentrate (Dabs)', isChecked: false, value: 'Concentrate(Dabs)'},
    {label: 'Flower', isChecked: false, value: 'Flower'},
    {
      label: 'Capsule/Tinture /RSO ',
      isChecked: false,
      value: 'Capsule/Tinture /RSO ',
    },
    {label: 'Edible', isChecked: false, value: 'Edible'},
    {label: 'Topical', isChecked: false, value: 'Topical'},
    {label: 'Suppository', isChecked: false, value: 'Suppository'},
    {label: 'Patches', isChecked: false, value: 'Patches'},
    {label: 'Others', isChecked: false, value: 'Others'},
  ]);

  const [method, setmethod] = useState('Concentrate(Dabs)');
  useEffect(() => {
    if (lang == 'en') {
      setIsShowingText([
        {
          label: 'Concentrate (Dabs)',
          isChecked: false,
          value: 'Concentrate(Dabs)',
        },
        {label: 'Flower', isChecked: false, value: 'Flower'},
        {
          label: 'Capsule/Tinture /RSO ',
          isChecked: false,
          value: 'Capsule/Tinture /RSO ',
        },
        {label: 'Edible', isChecked: false, value: 'Edible'},
        {label: 'Topical', isChecked: false, value: 'Topical'},
        {label: 'Suppository', isChecked: false, value: 'Suppository'},
        {label: 'Patches', isChecked: false, value: 'Patches'},
        {label: 'Others', isChecked: false, value: 'Others'},
      ]);
    } else {
      setIsShowingText([
        {
          label: 'Concentrados (Dabs)',
          isChecked: false,
          value: 'Concentrate(Dabs)',
        },
        {label: 'Flor', isChecked: false, value: 'Flower'},
        {
          label: 'Cápsula/Tintura/RSO',
          isChecked: false,
          value: 'Capsule/Tinture /RSO ',
        },
        {label: 'Comestibles', isChecked: false, value: 'Edible'},
        {label: 'Tópico', isChecked: false, value: 'Topical'},
        {label: 'Supositorio', isChecked: false, value: 'Suppository'},
        {label: 'Parches', isChecked: false, value: 'Patches'},
        {label: 'Otros', isChecked: false, value: 'Others'},
      ]);
    }
  }, []);
  const route = async () => {
    if (method == '') {
      Toast.show('No Method Selected.', Toast.LONG);
    } else {
      await AsyncStorage.setItem('trackfour', method);
      navigation.navigate('Strain');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FEA name="arrow-left-circle" size={30} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <Text style={styles.head}>
        {I18n.t('What_method_of_consumption', {locale: lang})}
      </Text>
      <Text style={styles.subhead}>
        {I18n.t('are_you_using_today', {locale: lang})}?
      </Text>
      <View style={{width: '100%', paddingLeft: 20, marginTop: 60}}>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          formHorizontal={false}
          labelHorizontal={true}
          buttonColor={'#f2c705'}
          buttonInnerColor={'#f2c705'}
          selectedButtonColor={'#f2c705'}
          animation={true}
          onPress={(value) => {
            setmethod(value);
            console.log(value);
          }}
          buttonSize={15}
          buttonOuterSize={25}
          labelStyle={styles.lable}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.signup} onPress={route}>
          <Text style={styles.submitText}>
            {I18n.t('Continue', {locale: lang})}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Consumption;

const styles = StyleSheet.create({
  head: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 23,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  subhead: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    marginTop: 0,
    alignSelf: 'center',
  },
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.themeRed,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  container: {
    flex: 1,
  },
  lable: {
    fontSize: 20,

    color: colors.buttonColor,
    paddingTop: 0,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
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
    marginTop: 15,
    fontFamily: 'Montserrat-Regular',
  },
});
