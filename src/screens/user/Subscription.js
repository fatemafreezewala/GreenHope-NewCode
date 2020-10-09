import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import colors from '../../constant/colors';
import url from '../../constant/url';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import AuthContext from '../../navigation/Auth';
import AppContext from '../../context/AppContext';
import I18n from '../../i18n';
const DATA = [
  {
    id: '1',
    title: 'Preminum - $14.99',
    image: 'https://i.ibb.co/4mNsP8z/star.png',
    desp:
      '* Resources \n * Usage Traker \n * Video Call With Admin and coach \n * chat with admin coach',
  },
  {
    id: '2',
    title: 'Basic - $9.99',
    image: 'https://i.ibb.co/hDjYJ8c/star-1.png',
    desp:
      ' * Resources \n * Usage Traker \n * Video Call With Coach only \n * chat with admin coach',
  },
  {
    id: '3',
    title: 'Free - $0.00',
    image: 'https://i.ibb.co/Vpx3Ldm/star-2.png',
    desp: ' * Resources \n * Usage Traker \n',
  },
];
const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style={{flexDirection: 'row'}}>
      <View style={{flexDirection: 'column', width: '30%'}}>
        <Image
          style={{width: 90, height: 90}}
          source={{uri: item.image}}></Image>
      </View>
      <View style={{flexDirection: 'column', width: '70%'}}>
        <Text style={{color: '#000', fontSize: 20, marginLeft: 10}}>
          {item.title}
        </Text>
        <Text style={{marginTop: 5, marginLeft: 10}}>{item.desp}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Subscription = ({navigation}) => {
  const {lang} = useContext(AppContext);
  const [selectedId, setSelectedId] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [isShowingText, setIsShowingText] = useState(false);
  const {signIn} = useContext(AuthContext);
  const mylogin = async () => {
    if (selectedId != '') {
      let UserObj = await AsyncStorage.getItem('USER');
      UserObj = JSON.parse(UserObj);

      setIsShowingText(true);
      let is_free = '';
      if (selectedId == '3') {
        is_free = 'true';
      } else {
        is_free = 'false';
      }
      try {
        const res = await fetch(`${url}updateSubs`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            is_free: is_free,
            subs: selectedId,
            id: UserObj.id,
          }),
        });

        const json = await res.json();

        if (json.status == '200') {
          await AsyncStorage.setItem('USER', JSON.stringify(json.data));
          await AsyncStorage.setItem('USER_TOKEN', '123');
          signIn('s123');
          navigation.navigate('Home');
        } else {
          setIsShowingText(false);
          Toast.show('Network connection error.', Toast.LONG);
        }
      } catch (error) {
        setIsShowingText(false);
        Toast.show('Network connection error.', Toast.LONG);
        console.error(error);
      }
    } else {
      Alert.alert('Please Select Pakage First');
    }
  };
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? colors.mangoColor : '#fff';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
      />
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{fontSize: 30, marginTop: 40, alignSelf: 'center'}}>
          Subscriptions
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 40,
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          14 Days Free Trial.{'\n'}For Additional Features opt fro below {'\n'}{' '}
        </Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        <TouchableOpacity style={styles.signup} onPress={mylogin}>
          {isShowingText ? (
            <ActivityIndicator
              animating={true}
              style={styles.indicator}
              size="small"
              color="#fff"
            />
          ) : (
            <Text style={styles.submitText}>CONTINUE</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  item: {
    padding: 20,

    elevation: 1,
    shadowOpacity: 0.5,
    borderRadius: 10,
    minHeight: 130,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
  },
  signup: {
    width: '90%',
    height: 50,
    backgroundColor: '#f2cb05',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 21,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    color: '#fff',
  },
  container: {
    flex: 1,
  },
});
