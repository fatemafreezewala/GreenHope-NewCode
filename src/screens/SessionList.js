import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../constant/colors';
import Ion from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import url from '../constant/url';
import Toast from 'react-native-simple-toast';
import AppContext from '../context/AppContext';
import I18n from '../i18n';
const SessionList = ({navigation, route}) => {
  const {lang} = useContext(AppContext);
  const [user, setIsUserText] = useState({});

  const [isShowingText, setIsShowingText] = useState(true);
  const [list, sryArray] = useState([]);
  const {userId} = route.params;
  const {name} = route.params;
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    setIsShowingText(true);

    try {
      const res = await fetch(`${url}getmysession`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
        }),
      });

      const json = await res.json();
      setIsShowingText(false);
      if (json.status == '200') {
        if (json.data) {
          console.log(json.data);
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
        Toast.show('No Record Found.', Toast.LONG);
      }
    } catch (error) {
      setIsShowingText(false);
      Toast.show('Network connection error.', Toast.LONG);
      sryArray([]);
      console.error(error);
    }
  };
  const gotodetail = async (val) => {
    await AsyncStorage.setItem('rate', JSON.stringify(val));
    navigation.navigate('SessionInfoAdmin');
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MCI name="arrow-left" size={40} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <Text style={styles.head}>
        Session {'\n'}
        {name}
      </Text>
      {isShowingText ? (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="small"
          color="#000"
        />
      ) : (
        <View />
      )}
      <ScrollView>
        {list.map((item) => {
          return (
            <TouchableOpacity onPress={() => gotodetail(item)}>
              <View style={styles.cardWrapper}>
                <View style={styles.cardMiddle}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {item.method}
                  </Text>
                  <Text>{item.created_at}</Text>
                  <Text>
                    Strain:
                    <Text style={{fontWeight: 'bold'}}>{item.strain}</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                    }}>
                    {Array(item.rate).fill(
                      <Ion
                        style={{
                          alignItems: 'center',
                          marginLeft: 3,
                          marginTop: '-10%',
                        }}
                        name="md-star"
                        color="#f2a905"
                        size={25}
                      />,
                    )}
                  </View>
                  <Text style={styles.badgeGreen}>Details</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SessionList;

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
    paddingTop: 10,
    paddingBottom: 25,
    paddingLeft: 15,
    paddingRight: 15,
    height: 100,
    // justifyContent: 'space-between',
  },
  cardMiddle: {
    flex: 1,
  },
  badgeGreen: {
    backgroundColor: 'orange',
    alignSelf: 'flex-end',
    color: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: '-10%',
  },
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.themeRed,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  head: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 25,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
});
