import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const placeholderImg = 'https://i.ibb.co/pzktFRw/avatar2.png';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import AuthContext from '../../navigation/Auth';
const Admindash = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  const [user, setIsShowingText] = useState({});
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    setIsShowingText(user);
  };
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'calendar',
      title: 'Pending \n Appointment',
      onpress: 'AllocateToDoctor',
    },

    {
      id: 'bd7acbea-c1b1-46c-aed5-3ad53abb28ba',
      name: 'list',
      title: 'session \n details',
      onpress: 'UserList',
    },
    {
      id: 'bd7acbea-c11-46c2-aed5-3ad53abb28ba',
      name: 'time',
      title: 'allocated \n appointment',
      onpress: 'Appointment',
    },
    {
      id: 'bd7acea-c1b1-46c2-aed5-3ad53ab28ba',
      name: 'person',
      title: 'profile',
      onpress: 'AdminProfile',
    },
    {
      id: 'bd7cbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'calendar',
      title: 'Completed \n Appointment',
      onpress: 'CompletedApoint',
    },
    {
      id: 'bd7acbea-c11-46c2-aed5-3ad53abb28ba',
      name: 'log-out',
      title: 'Logout',
      onpress: 'Logout',
    },
    {
      id: 'bd7acbea-c1b1-462-aed5-3ad53abb28ba',
      name: 'ios-chatbox-ellipses',
      title: 'Message',
      onpress: 'Chat',
    },
    {
      id: 'bd7acbea-c1b1-462-aed5-3ad53abb28ba',
      name: 'person',
      title: 'User List',
      onpress: 'UserInfo',
    },
  ];
  const renderItem = ({item}) => (
    <Item
      onPress={() => {
        if (item.onpress == 'Chat') {
          navigation.navigate('Messages', {
            adminId: user.id,
            adminName: user.fullname,
          });
        } else if (item.onpress == 'Logout') {
          Logout();
        } else {
          navigation.navigate(item.onpress);
        }
      }}
      title={item.name}
      icon={item.title}
    />
  );
  const Logout = async () => {
    await AsyncStorage.clear();
    signOut();
  };
  const Item = ({title, icon, onPress}) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Icon color="#0c7488" name={title} size={50}></Icon>
      <Text style={styles.sub}>{icon}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome ! {user.fullname}</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    height: 120,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 15,
    marginVertical: 20,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    backgroundColor: '#dedede',
    flex: 1,
  },
  title: {
    fontSize: 30,
    marginLeft: 15,
    marginTop: '10%',
  },
  sub: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Admindash;
