import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../../constant/colors';
import url from '../../constant/url';
import AsyncStorage from '@react-native-community/async-storage';
import Ion from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import AppContext from '../../context/AppContext';
import I18n from '../../i18n';
const Trackone = ({navigation}) => {
  const {lang} = useContext(AppContext);
  const [user, setIsUserText] = useState({});
  const [isShowingText, setIsShowingText] = useState(false);
  const [list, sryArray] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    setIsShowingText(true);
    let userrr = await AsyncStorage.getItem('USER');
    userrr = JSON.parse(userrr);
    setIsUserText(user);
    try {
      const res = await fetch(`${url}getmysession`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userrr.id,
        }),
      });

      const json = await res.json();
      setIsShowingText(false);
      console.log(json);
      if (json.status == '200') {
        if (json.data) {
          json.data.map((item) => {
            if (item.star == '') {
              item.rate = 0;
            } else {
              item.rate = parseInt(item.star);
            }
          });
          sryArray(json.data);
        }
      } else {
        setIsShowingText(false);
        Toast.show('Network connection error.', Toast.LONG);
      }
    } catch (error) {
      setIsShowingText(false);
      Toast.show('Network connection error.', Toast.LONG);
      sryArray([]);
      console.error(error);
    }
  };
  const write = async (val, id, mthid) => {
    console.log(mthid);
    await AsyncStorage.setItem('tracktwo', JSON.stringify(val));
    await AsyncStorage.setItem('seleectedmethod', mthid);
    navigation.navigate('Aftersessionone', {
      id: id,
      method: mthid,
    });
  };
  const gotodetail = async (val) => {
    await AsyncStorage.setItem('rate', JSON.stringify(val));
    navigation.navigate('Sessioninfo');
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FEA name="arrow-left-circle" size={30} color="#0ea1bc" />
        </TouchableOpacity>

        <FEA name="inbox" size={30} color="#0ea1bc" />
      </View>
      <Image
        style={styles.track}
        source={require('../../assets/Webp.net-resizeimage.png')}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Feelings')}
        style={styles.signup}
        underlayColor="#fff">
        <Text style={styles.submitText}>
          {I18n.t('START_NEW_SESSION', {locale: lang})}
        </Text>
      </TouchableOpacity>
      <ScrollView style={{marginTop: 20}}>
        {isShowingText && (
          <ActivityIndicator size="large" color={colors.mangoColor} />
        )}

        {list.map((item) => {
          return (
            <TouchableWithoutFeedback>
              <View style={styles.box}>
                <View style={{width: 170, height: 85}}>
                  <Text style={styles.name}>{item.created_at}</Text>
                  <Text style={styles.date}>{user.fullname}</Text>
                  <Text style={styles.name}>{item.method}</Text>
                  <Text style={styles.name}>{item.strain}</Text>
                </View>
                <View
                  style={{
                    width: 140,
                    height: 85,
                    flexDirection: 'row',
                  }}>
                  {Array(item.rate).fill(
                    <Ion
                      style={{
                        marginTop: 17,
                        alignItems: 'flex-start',
                        marginLeft: 3,
                      }}
                      name="md-star"
                      color="#f2a905"
                      size={25}
                    />,
                  )}
                  {item.review_status == 'pending' ? (
                    <TouchableOpacity
                      onPress={() => {
                        write(item.feelingbefore, item.id, item.method);
                      }}
                      style={styles.review}>
                      <View>
                        <FEA
                          style={{position: 'absolute', left: 50, top: 5}}
                          name="edit-2"
                          size={18}
                          color="#f2a905"
                        />
                        <Text
                          style={{
                            color: '#f2a905',
                            position: 'absolute',
                            left: 5,
                          }}>
                          {I18n.t('review', {locale: lang})}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => {
                    gotodetail(item);
                  }}>
                  <View
                    style={{
                      width: 40,
                      height: 85,
                      paddingVertical: 20,
                    }}>
                    <Ion name="ios-arrow-forward" color="#f2a905" size={40} />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Trackone;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  track: {
    marginTop: 50,
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
  signup: {
    backgroundColor: '#f2a905',
    width: 300,
    height: 50,
    alignItems: 'center',
    paddingTop: 13,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  box: {
    width: 350,
    height: 90,
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
  },
  date: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    marginTop: 5,
    fontWeight: '300',
    color: '#12a2bd',
    marginLeft: 10,
  },
  name: {
    fontFamily: 'Montserrat-Regular',
    color: '#0e8169',
    marginLeft: 10,
    fontSize: 13,
  },
  review: {
    borderColor: '#f2a905',
    borderWidth: 1,
    position: 'absolute',
    top: 50,
    width: 80,
    height: 30,
    left: 10,
    borderRadius: 10,
  },
});
