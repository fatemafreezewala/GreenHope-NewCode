import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
//
import SelectMultiple from 'react-native-select-multiple';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../../constant/colors';
import Toast from 'react-native-simple-toast';
import I18n from '../../i18n';
import AppContext from '../../context/AppContext';
const Feelings = ({navigation}) => {
  const {lang} = useContext(AppContext);
  const [list, setList] = useState([
    {
      label: I18n.t('Agitation_Irritability', {locale: lang}),
      value: 'Agitation/Irritability',
      id: '1',
    },
    {label: I18n.t('Anxiety', {locale: lang}), value: 'Anxiety', id: '2'},
    {label: I18n.t('Seizures', {locale: lang}), value: 'Convulsions', id: '3'},
    {label: I18n.t('Cramps', {locale: lang}), value: 'Cramps', id: '4'},
    {label: I18n.t('Depression', {locale: lang}), value: 'Depression', id: '5'},
    {label: I18n.t('Dizziness', {locale: lang}), value: 'Dizziness', id: '6'},
    {
      label: I18n.t('Weight_gain_or_loss', {locale: lang}),
      value: 'Weight gain or loss',
      id: '7',
    },
    {
      label: I18n.t('Vision_changes', {locale: lang}),
      value: 'Vision changes',
      id: '8',
    },
    {label: I18n.t('Fatigue', {locale: lang}), value: 'Fatigue', id: '9'},
    {label: I18n.t('Headaches', {locale: lang}), value: 'Headaches', id: '10'},
    {
      label: I18n.t('Inflammation', {locale: lang}),
      value: 'Inflammation',
      id: '11',
    },
    {label: I18n.t('Insomnia', {locale: lang}), value: 'Insomnia', id: '12'},
    {
      label: I18n.t('Lack_of_Appetite', {locale: lang}),
      value: 'Lack of Appetite',
      id: '13',
    },
    {
      label: I18n.t('Muscle_Spams', {locale: lang}),
      value: 'Muscle Spams',
      id: '14',
    },
    {
      label: I18n.t('Chronic_Pain', {locale: lang}),
      value: 'Chronic Pain',
      id: '15',
    },
    {
      label: I18n.t('Difficulty_breathing', {locale: lang}),
      value: 'Difficulty breathing',
      id: '16',
    },
    {label: I18n.t('Stress', {locale: lang}), value: 'Stress', id: '17'},
    {label: I18n.t('Other', {locale: lang}), value: 'Other', id: '18'},
    {label: I18n.t('Nausea', {locale: lang}), value: 'Nausea', id: '19'},
  ]);

  const [selected, setSelected] = useState([]);
  const renderLabel = (label, style) => {
    return (
      <View style={{flexDirection: 'row', width: '80%', alignItems: 'center'}}>
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              color: colors.buttonColor,

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
  const move = async () => {
    if (selected.length != 0) {
      await AsyncStorage.setItem('tracktwo', JSON.stringify(selected));
      navigation.navigate('Severe');
    } else {
      Toast.show('No Feelings Selected.', Toast.LONG);
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
        {I18n.t('How_are_you_feeling', {locale: lang})}
      </Text>
      <Text style={styles.subhead}>
        {I18n.t('Choose_up_to_four', {locale: lang})}
      </Text>
      <View style={{height: '65%'}}>
        <SelectMultiple
          items={list}
          renderLabel={renderLabel}
          selectedItems={selected}
          onSelectionsChange={onSelectionsChange}
          maxSelect={4}
          checkboxStyle={{color: '#000'}}
          labelStyle={{fontSize: 25}}
          checkboxSource={require('../../assets/empty.png')}
          selectedCheckboxSource={require('../../assets/check.png')}
          checkboxStyle={{color: '#000', fontSize: 30}}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.signup} onPress={move}>
          <Text style={styles.submitText}>
            {I18n.t('Continue', {locale: lang})}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Feelings;

const styles = StyleSheet.create({
  head: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
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
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.themeRed,
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    textAlign: 'center',
  },
  signup: {
    width: '90%',
    height: 45,
    backgroundColor: '#f2cb05',
    borderRadius: 40,
    justifyContent: 'center',

    marginTop: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
});
