import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../../constant/colors';
import url from '../../constant/url';
import Ion from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
const AllocateToDoctor = ({navigation}) => {
  const [list, setList] = useState([]);
  const [isShowingText, setIsShowingText] = useState(true);
  useEffect(() => {
    mylogin();
  }, []);

  const mylogin = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    setIsShowingText(true);
    try {
      const res = await fetch(`${url}getallapointment`, {
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
      console.log(json);
      if (json.status == '200') {
        if (json.data) {
          setList(json.data);
        }
      } else {
        Toast.show('No Request Found.', Toast.LONG);
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

        <FEA name="inbox" size={40} color="#0ea1bc" />
      </View>
      <Text style={styles.head}>Allocate Appointment</Text>
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
        {list.map((item, key) => {
          return (
            <View style={styles.box}>
              <Text style={{fontWeight: 'bold'}}>Name {item.fullname}</Text>
              <Text style={{fontWeight: 'bold'}}>Date : {item.date}</Text>
              <Text style={{fontWeight: 'bold'}}>Time : {item.time}</Text>
              <Text style={{fontWeight: 'bold'}}>
                Scheduled For : {item.scheduled_for}
              </Text>
              <TouchableOpacity
                style={styles.badgeGreen}
                onPress={() =>
                  navigation.navigate('DoctorList', {
                    uid: item.id,
                  })
                }>
                <Text style={{color: '#fff'}}>Allocate</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AllocateToDoctor;

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
    height: 110,

    padding: 10,
    justifyContent: 'flex-start',
    padding: 20,
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
