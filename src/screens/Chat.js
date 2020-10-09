/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import url from '../constant/url';
const Chat = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // const role = navigation.getParam('role', 'admin');
  // const userId = navigation.getParam('userId');
  // const userName = navigation.getParam('userName');
  // const adminId = navigation.getParam('adminId');
  // const adminName = navigation.getParam('adminName');
  const {role} = route.params;
  console.log(role);
  const {userId} = route.params;
  const {userName} = route.params;
  const {adminId} = route.params;
  const {adminName} = route.params;
  const getRef = (person, type) => {
    return database().ref('chat').child(`${person}/${userId}/${type}`);
  };

  const chatRef = getRef('user', 'messages');
  const adminOneRef = getRef('admin1', 'messages');
  const adminTwoRef = getRef('admin2', 'messages');
  const adminThreeRef = getRef('admin3', 'messages');
  const userInfoRef = getRef('user', 'info');
  const adminOneInfoRef = getRef('admin1', 'info');
  const adminTwoInfoRef = getRef('admin2', 'info');
  const adminThreeInfoRef = getRef('admin3', 'info');

  const getListenForItemsRef = () => {
    let ref;
    if (role === 'admin') {
      ref = getRef(`admin${adminId}`, 'messages');
    } else {
      ref = chatRef;
    }
    return ref;
  };

  useEffect(() => {
    listenForItems();
    navigation.setParams({
      refToDelete: getListenForItemsRef(),
    });
    return () => {
      getListenForItemsRef().off();
    };
  }, []);

  const listenForItems = () => {
    getListenForItemsRef()
      .orderByChild('order')
      .on('value', (snap) => {
        var items = [];
        snap.forEach((child) => {
          items.push({
            _id: child.val()._id,
            text: child.val().text,
            createdAt: new Date(child.val().createdAt),
            user: {
              _id: child.val().user._id,
              name: child.val().user.name,
            },
          });
        });
        setMessages(items);
        setLoading(false);
      });
  };

  const onSend = (msg) => {
    console.log(msg);
    let now = new Date().getTime();
    let finalMsg = {
      _id: msg[0]._id,
      createdAt: now,
      order: -1 * now,
      text: msg[0].text,
      user: {
        _id: msg[0].user._id,
        name: msg[0].user.name,
      },
    };
    chatRef.push(finalMsg);
    adminOneRef.push(finalMsg);
    adminTwoRef.push(finalMsg);
    adminThreeRef.push(finalMsg);

    let userInfo = {
      id: userId,
      name: userName,
    };

    if (role !== 'admin') {
      userInfoRef.set(userInfo);
      adminOneInfoRef.set(userInfo);
      adminTwoInfoRef.set(userInfo);
      adminThreeInfoRef.set(userInfo);
    }
    if (role == 'user') {
      console.log('user');
      sendnotificatio('user', userName, '', '', '');
    } else {
      console.log('admin');
      if (adminId == '1') {
        sendnotificatio('admin', adminName, '2', '3', userId);
      } else if (adminId == '2') {
        sendnotificatio('admin', adminName, '1', '3', userId);
      } else {
        sendnotificatio('admin', adminName, '1', '2', userId);
      }
    }
  };
  const sendnotificatio = async (type, message, ridone, ridtwo, ridthree) => {
    console.log(ridone);
    console.log(ridtwo);
    console.log(ridthree);
    console.log(message);
    try {
      const res = await fetch(`${url}sendnotification`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stype: type,
          sname: message,
          msg: message,
          ridone: ridone,
          ridtwo: ridtwo,
          ridthree: ridthree,
        }),
      });
      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  const generateName = () => {
    let name;
    if (role === 'admin') {
      name = adminName;
    } else if (role === 'user') {
      name = userName;
    }
    return name;
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FEA name="arrow-left-circle" size={30} color="#0ea1bc" />
        </TouchableOpacity>

        <FEA name="inbox" size={30} color="#0ea1bc" />
      </View>
      {loading && <ActivityIndicator />}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        maxInputLength={500}
        renderUsernameOnMessage={true}
        renderAvatar={null}
        alwaysShowSend={true}
        user={{
          _id: role === 'admin' ? adminId : userId,
          name: generateName(),
        }}
      />
    </View>
  );
};

Chat.navigationOptions = ({navigation}) => {
  const refToDel = navigation.getParam('refToDelete');
  return {
    headerTitleAlign: 'center',
    headerStyle: {
      elevation: 1,
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            '',
            'Are you sure you want to delete this chat?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  refToDel.parent.remove();
                  navigation.goBack();
                },
              },
            ],
            {cancelable: true},
          );
        }}>
        <Text style={styles.headerButton}>Delete</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButton: {
    marginRight: 20,
  },
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20,
  },
});

export default Chat;
