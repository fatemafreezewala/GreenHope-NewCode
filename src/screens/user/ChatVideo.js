import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../../constant/colors';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../i18n';
import AppContext from '../../context/AppContext';
const ChatVideo = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const {lang} = useContext(AppContext);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    let userl = await AsyncStorage.getItem('USER');

    userl = JSON.parse(userl);
    setUser(userl);
    setRole(userl.subs_category);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FEA name="arrow-left-circle" size={30} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image
          style={styles.message}
          source={require('../../assets/box2.png')}
        />
        <Text style={styles.textname}>
          {I18n.t(
            'Reach_out_to_one_of_our_certified_cannabis_health_coaches_by_video_chat_or_direct_message',
            {locale: lang},
          )}
        </Text>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => {
            navigation.navigate('BookAppoint');
          }}>
          <Text style={styles.submitText}>
            {I18n.t('START_VIDEO_CHAT', {locale: lang})}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Chat', {
              userId: user.id,
              userName: user.fullname,
              role: user.role,
            })
          }
          style={styles.submit}>
          <Text style={styles.submitText}>
            {I18n.t('DIRECT_MESSAGE', {locale: lang})}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ChatVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.themeRed,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  message: {
    marginTop: 20,
    marginLeft: 20,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  textname: {
    textAlign: 'center',
    color: '#0ea1bc',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    marginTop: 20,
  },
  submit: {
    width: '90%',
    height: 50,
    backgroundColor: '#4b8f7a',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 23,
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'center',
  },

  submitText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: -10,
    fontFamily: 'Montserrat-SemiBold',
  },
  signup: {
    width: '90%',
    height: 50,
    backgroundColor: '#0c7488',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 23,
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'center',
  },
});
