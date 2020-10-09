import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import Slider from '@react-native-community/slider';
import Ion from 'react-native-vector-icons/Ionicons';
import Fea from 'react-native-vector-icons/Feather';
import AppContext from '../../context/AppContext';
import I18n from '../../i18n';
const Sessioninfo = (props) => {
  const [feelingsone, setFeelingsone] = useState([]);
  const [feeelingbefore, setFeelingsbefore] = useState([]);
  const [feeelingafter, setFeelingsafret] = useState([]);
  const [emoji, setemoji] = useState([]);
  const {lang} = useContext(AppContext);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    let tracktow = await AsyncStorage.getItem('rate');
    tracktow = JSON.parse(tracktow);
    if (tracktow.star == '') {
      tracktow.rate = 0;
    } else {
      tracktow.rate = parseInt(tracktow.star);
    }
    setFeelingsone(tracktow);
    setFeelingsbefore(tracktow.feelingbefore);
    setFeelingsafret(tracktow.feelingafter);
    setemoji(tracktow.emoji);
  };
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top: 30, width: '100%', height: 80}}>
        {/* <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Home')}>
          <Fea
            style={styles.inbox}
            name="arrow-left-circle"
            size={30}
            color="#4b8f7a"
          />
        </TouchableWithoutFeedback> */}
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('Home')}>
          <Icon style={styles.menu} name="close" size={35} color="#4b8f7a" />
        </TouchableWithoutFeedback>
      </View>

      <View
        style={{
          width: 380,
          height: '85%',
          position: 'absolute',
          top: 75,
          paddingLeft: 15,
        }}>
        <ScrollView>
          <Text style={styles.head}>
            {I18n.t('Session_Detail', {locale: lang})}
          </Text>

          <Text style={styles.sub}>{feelingsone.created_at}</Text>
          <Text style={styles.strain}>{feelingsone.strain}</Text>
          <Text style={styles.method}>By {feelingsone.method}</Text>

          {feelingsone.rate != '' ? (
            <View>
              <Text style={styles.main}>
                {I18n.t('Rating', {locale: lang})}
              </Text>
              <View
                style={{
                  width: 200,
                  height: 40,
                  flexWrap: 'wrap',
                }}>
                {Array(feelingsone.rate).fill(
                  <Ion
                    style={{marginLeft: 10, marginTop: 3}}
                    name="md-star"
                    color="#f2a905"
                    size={35}
                  />,
                )}
              </View>
            </View>
          ) : (
            <View />
          )}

          <Text style={styles.mainextra}>
            {I18n.t('Symptoms_Before', {locale: lang})}
          </Text>
          {feeelingbefore.map((items) => {
            return (
              <View>
                <Text style={styles.title}>{items.label}</Text>
                <Slider
                  disabled={true}
                  style={{width: 350, height: 20}}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#0ea1bc"
                  maximumTrackTintColor="#000"
                  step={10}
                  value={items.range}
                  onValueChange={(val) => {}}
                />
              </View>
            );
          })}
          {feelingsone.review_status == 'complete' ? (
            <View>
              <Text style={styles.mainextra}>
                {I18n.t('Symptoms_After', {locale: lang})}
              </Text>
              {feeelingafter.map((items) => {
                return (
                  <View>
                    <Text style={styles.title}>{items.label}</Text>
                    <Slider
                      style={{width: 350, height: 20}}
                      minimumValue={0}
                      maximumValue={100}
                      minimumTrackTintColor="#0ea1bc"
                      maximumTrackTintColor="#000"
                      step={10}
                      value={items.range}
                      onValueChange={(val) => {}}
                      disabled={true}
                    />
                  </View>
                );
              })}
            </View>
          ) : (
            <View />
          )}
          <Text style={styles.mainextra}>
            {I18n.t('felt_like', {locale: lang})} :
          </Text>
          <View style={styles.row}>
            {emoji.map((item) => {
              return (
                <View style={styles.col}>
                  <Image
                    style={{width: 70, height: 70, alignSelf: 'center'}}
                    source={{uri: item.img}}
                  />
                  <Text style={styles.emojilabel}>{item.name}</Text>
                </View>
              );
            })}
          </View>
          {feelingsone.notes != '' ? (
            <View>
              <Text style={styles.main}>{I18n.t('Notes', {locale: lang})}</Text>
              <Text style={styles.title}>{feelingsone.notes}</Text>
            </View>
          ) : (
            <View />
          )}
          {feelingsone.review != '' ? (
            <View>
              <Text style={styles.main}>
                {I18n.t('review', {locale: lang})}
              </Text>
              <Text style={styles.title}>{feelingsone.review}</Text>
            </View>
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sub: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: '#12a2bd',
    marginTop: 10,
  },
  container: {
    alignItems: 'flex-start',
    height: '100%',
    backgroundColor: '#fff',
    paddingLeft: 20,
  },
  menu: {
    position: 'absolute',
    right: 10,
  },
  inbox: {
    position: 'absolute',

    left: 20,
  },

  head: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 25,
    marginTop: 30,
  },
  main: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    color: '#12a2bd',
    marginTop: 25,
  },
  mainextra: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    color: '#12a2bd',
    marginTop: 25,
  },
  method: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    color: '#0e8169',
    marginTop: 20,
  },
  strain: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 25,
    color: '#12a2bd',
    marginTop: 20,
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    color: '#0e8169',
    marginTop: 10,
    fontSize: 17,
  },
  emojilabel: {
    fontFamily: 'Montserrat-Regular',
    color: '#0e8169',
    alignItems: 'center',
    textAlign: 'center',

    textAlign: 'center',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingLeft: -10,
  },
  col: {
    flexDirection: 'column',
    width: '33%',
    height: 100,
    textAlign: 'center',
    alignItems: 'flex-start',
  },
});
export default Sessioninfo;
