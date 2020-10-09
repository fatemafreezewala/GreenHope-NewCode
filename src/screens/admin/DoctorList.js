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
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
const DoctorList = ({route, navigation}) => {
  const [isShowingText, setIsShowingText] = useState(true);
  const [myid, setId] = useState('');
  const [list, setList] = useState([]);
  const {uid} = route.params;
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    mylogin();
  }, []);

  const mylogin = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    setIsShowingText(true);

    try {
      const res = await fetch(`${url}getdoctorlist`, {
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
          json.data.map((item) => {
            (item.label = item.fullname), (item.value = item.id);
          });
          setList(json.data);
        }
      }
    } catch (error) {
      setIsShowingText(false);
      Toast.show('Network connection error.', Toast.LONG);
      console.error(error);
    }
  };
  const allocatenow = async (id) => {
    console.log('hiie');
    //let uid = await AsyncStorage.getItem('uid');

    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    console.log(user);
    setIsShowingText(true);

    try {
      const res = await fetch(`${url}allocateappointment`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: uid,
          to: id,
        }),
      });
      setIsShowingText(false);
      const json = await res.json();
      console.log(json);
      if (json.status == '200') {
        Toast.show('Appointment allocated successfully.', Toast.LONG);
        navigation.navigate('AdminDash');
      }
    } catch (error) {
      setIsShowingText(false);
      Toast.show('Network connection error.', Toast.LONG);
      console.error(error);
    }
  };
  const onSelectionsChange = (selected) => {
    setSelected(selected);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MCI name="arrow-left" size={40} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <Text style={styles.head}>All Admin & Trainer</Text>
      {isShowingText ? (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="small"
          color="#000"
        />
      ) : (
        <Text />
      )}
      <ScrollView>
        {list.map((item) => {
          return (
            <TouchableOpacity>
              <View style={styles.cardWrapper}>
                <View style={styles.cardMiddle}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {item.fullname} - {item.role}
                  </Text>
                  <TouchableOpacity onPress={allocatenow(item.id)}>
                    <Text style={styles.badgeGreen}>Allocate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* <View style={styles.cardWrapper}>
          <View style={styles.cardMiddle}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              fatema freezewala - Trainer
            </Text>

            <Text style={styles.badgeGreen}>Allocate</Text>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default DoctorList;

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
    padding: 20,
    // justifyContent: 'space-between',
  },
  cardMiddle: {
    flex: 1,
  },
  badgeGreen: {
    backgroundColor: 'green',
    alignSelf: 'flex-end',
    color: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 2,
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
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginTop: 10,
    alignSelf: 'center',
  },
});
