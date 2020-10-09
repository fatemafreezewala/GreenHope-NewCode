import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/dist/Feather';

const Messages = ({route, navigation}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);
  const [noMessage, setNoMessage] = useState(false);

  const {adminId} = route.params;
  const {adminName} = route.params;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let tempArray = [];
      const snap = await database().ref(`chat/admin1`).once('value');
      snap.forEach((val) => {
        tempArray.push(val.child('info').val());
      });
      setLoading(false);
      setUsers(tempArray);
      if (tempArray.length === 0) {
        setNoMessage(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="#000" />}
      {noMessage && <Text style={styles.noMessage}>No Messages</Text>}
      <ScrollView>
        {users.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.navigate('Chat', {
                  userId: item.id,
                  userName: item.name,
                  adminId,
                  adminName,
                  role: 'admin',
                });
              }}>
              <View style={styles.chatBar}>
                <Text style={styles.userName}>{item.name}</Text>
                <Icon name="chevron-right" size={18} color="gray" />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  chatBar: {
    borderColor: '#0c7488',
    borderWidth: 0.5,
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 17,
  },
  noMessage: {
    textAlign: 'center',
    color: 'gray',
  },
});

Messages.navigationOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    elevation: 1,
  },
};

export default Messages;
