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
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage';
import AppContext from '../../context/AppContext';
import I18n from '../../i18n';
const Severe = ({navigation}) => {
  const {lang} = useContext(AppContext);
  const [user, setIsShowingText] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let user = await AsyncStorage.getItem('tracktwo');
    user = JSON.parse(user);
    user.map((unique) => {
      unique.range = 0;
    });
    console.log(user);
    setIsShowingText(user);
  };
  const getVal = (item, val) => {
    user.map((unique) => {
      if (unique.value == item.value) {
        unique.range = val;
      }
    });
    setIsShowingText(user);
  };
  const navvv = async () => {
    await AsyncStorage.setItem('trackthree', JSON.stringify(user));
    navigation.navigate('Consumption');
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FEA name="arrow-left-circle" size={30} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <Text style={styles.head}>{I18n.t('how_severe', {locale: lang})}</Text>
      <Text style={styles.subhead}>
        {I18n.t('are_your_symptoms', {locale: lang})}.
      </Text>
      <ScrollView>
        {user.map((item) => {
          return (
            <View style={{marginTop: 15, textAlign: 'left'}}>
              <Text style={styles.title}>{item.label}</Text>
              <Slider
                style={{width: 320, marginTop: 20, marginLeft: '5%'}}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#0ea1bc"
                maximumTrackTintColor="#000"
                thumbTintColor={'#f2cb05'}
                step={10}
                onValueChange={(val) => {
                  getVal(item, val);
                }}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.signup} onPress={navvv}>
          <Text style={styles.submitText}>
            {I18n.t('Continue', {locale: lang})}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Severe;

const styles = StyleSheet.create({
  head: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginTop: 10,
    alignSelf: 'center',
  },
  subhead: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    marginTop: 0,
    alignSelf: 'center',
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
  },
  signup: {
    width: '90%',
    height: 45,
    backgroundColor: '#f2cb05',
    borderRadius: 40,
    justifyContent: 'center',
    paddingLeft: '30%',
    marginTop: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
  title: {
    color: colors.buttonColor,
    marginTop: 10,
    marginLeft: '7%',
    fontSize: 20,
  },
});
