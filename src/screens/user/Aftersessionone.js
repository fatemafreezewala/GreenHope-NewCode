import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';

const Aftersessionone = ({route, navigation}) => {
  const [user, setIsShowingText] = useState([]);

  const {id} = route.params;
  const {method} = route.params;
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
    await AsyncStorage.setItem('rangesli', JSON.stringify(user));
    navigation.navigate('Review', {
      id: id,
    });
    // if (method == 'Concentrate(Dabs)' || method == 'Flower') {
    //   navigation.navigate('Review', {
    //     id: id,
    //   });
    // } else {
    //   navigation.navigate('Reviewtwo', {
    //     id: id,
    //   });
    // }
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate('Trackone')}>
        <Icon
          style={styles.inbox}
          name="arrow-left-circle"
          size={40}
          color="#0c7488"
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
        <Icon style={styles.menu} name="menu" size={40} color="#4b8f7a" />
      </TouchableWithoutFeedback>
      <Text style={styles.head}>How severe</Text>
      <Text style={styles.subhead}>are your symptoms now?</Text>
      {user.map((item) => {
        return (
          <View style={{marginTop: 15, textAlign: 'left'}}>
            <Text style={styles.title}>{item.label}</Text>
            <Slider
              style={{width: 320, marginTop: 20}}
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

      <View style={styles.footer}>
        <TouchableOpacity style={styles.signup} onPress={navvv}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
  menu: {
    position: 'absolute',
    top: 35,
    right: 10,
  },
  inbox: {
    position: 'absolute',
    top: 35,
    left: 20,
  },
  signup: {
    width: '90%',
    height: 45,
    backgroundColor: '#f2cb05',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    fontFamily: 'Montserrat-Regular',
  },
  head: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginTop: 70,
  },
  subhead: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginTop: 0,
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
  slider: {
    height: 20,
    width: 290,
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    color: '#8eb48f',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
  },
});
export default Aftersessionone;
