import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//
import SelectMultiple from 'react-native-select-multiple';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../../constant/colors';
import AppContext from '../../context/AppContext';
import I18n from '../../i18n';
const ThankYou = (props) => {
  const {lang} = useContext(AppContext);
  const fetchUser = async () => {
    props.navigation.navigate('Sessioninfo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.thanky}>
        {I18n.t(
          'Thank_you_You_will_receive_a_push_notification_in_2_hours_to_review_your_symptoms_and_rate_your_session_You_can_also_access_your_reviews_and_ratings_any_time_in_your_sessionP_history',
          {locale: lang},
        )}
      </Text>
      <TouchableOpacity style={styles.signup} onPress={fetchUser}>
        <Text style={styles.submitText}>
          {' '}
          {I18n.t('Continue', {locale: lang})}
        </Text>
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

  thanky: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    color: '#4b8f7a',
    position: 'absolute',
    padding: 10,
    top: 180,
    textAlign: 'center',
  },
  signup: {
    width: '85%',
    height: 50,
    backgroundColor: '#4b8f7a',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  submitText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
});
export default ThankYou;
