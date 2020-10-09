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
import colors from '../../constant/colors';
import url from '../../constant/url';
import Ion from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
const CompletedApoint = ({navigation}) => {
  const [list, setList] = useState([]);
  const [isShowingText, setIsShowingText] = useState(true);
  useEffect(() => {
    mylogin();
  }, []);

  const mylogin = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    console.log(user);
    setIsShowingText(true);
    try {
      const res = await fetch(`${url}getcompleted`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
        }),
      });
      setIsShowingText(false);
      const json = await res.json();

      if (json.status == '200') {
        if (json.data) {
          setList(json.data);
          console.log(json);
        }
      }
    } catch (error) {
      setIsShowingText(false);
      Toast.show('Network connection error.', Toast.LONG);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MCI name="arrow-left" size={40} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <Text style={styles.head}>Completed Appointment</Text>
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
            <View style={styles.box}>
              <Text style={{fontWeight: 'bold'}}>Name</Text>
              <Text style={{fontWeight: 'bold'}}>Date</Text>
              <Text style={{fontWeight: 'bold'}}>Time</Text>
              <Text style={{fontWeight: 'bold'}}>Scheduled For :</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CompletedApoint;

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
    height: 110,

    justifyContent: 'flex-start',
    padding: 25,
    // justifyContent: 'space-between',
  },
  cardMiddle: {
    flexDirection: 'column',
    width: '40%',
  },
  badgeGreen: {
    backgroundColor: 'green',
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
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
