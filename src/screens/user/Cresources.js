import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constant/colors';
import FEA from 'react-native-vector-icons/Feather';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../i18n';
import AppContext from '../../context/AppContext';
const Cresources = ({navigation}) => {
  const {lang} = useContext(AppContext);
  const [role, setRole] = useState('');
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    let userl = await AsyncStorage.getItem('USER');
    userl = JSON.parse(userl);
    setRole(userl.subs_category);
    console.log(userl.subs_category);
    setUser(userl);
  };
  getDeepLink = (path = '') => {
    const scheme = 'my-greenhope';
    const prefix =
      Platform.OS === 'android' ? `${scheme}://demo/` : `${scheme}://`;
    return prefix + path;
  };
  const tryDeepLinkingtow = async () => {
    console.log(user.is_free);
    if (user.is_free == 'true') {
      Alert.alert(
        'Subscription Expired',
        'To use Video call upgrade Subscription to premium.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => navigation.navigate('InAppPayment'),
          },
        ],
        {cancelable: false},
      );
    } else {
      navigation.navigate('BookAppoint');
    }
  };
  const tryDeepLinking = async () => {
    const loginUrl = 'https://greenhopewellness.com/resources/';
    const redirectUrl = this.getDeepLink();
    const url = `${loginUrl}?redirect_url=${encodeURIComponent(redirectUrl)}`;
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.openAuth(url, redirectUrl, {
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          ephemeralWebSession: false,
          enableDefaultShare: false,
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
        });
      } else {
        Alert.alert('InAppBrowser is not supported :/');
      }
    } catch (error) {
      Alert.alert('Something’s wrong with the app :(');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FEA name="arrow-left-circle" size={30} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            if (user.is_free == 'true' || user.subs_category == '1') {
              navigation.navigate('CresourcesBasic');
            } else {
              Alert.alert(
                'Subscription Expired',
                'To use Video call & chat upgrade Subscription.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('InAppPayment'),
                  },
                ],
                {cancelable: false},
              );
            }
          }}>
          <View style={styles.strip2}>
            <View style={{height: 150, width: '38%'}}>
              <Image
                style={styles.track}
                source={require('../../assets/box.png')}
              />
            </View>
            <View style={{height: 150, width: '60%'}}>
              <Text style={styles.textname}>
                {I18n.t('Get_Your_Medical_Recommendation', {locale: lang})}
                {/* Get Your Medical {'\n'}Recommendation */}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (user.is_free == 'true' || user.subs_category == '2') {
              navigation.navigate('ChatVideo');
            } else {
              Alert.alert(
                'Subscription Expired',
                'To use Video call & chat upgrade Subscription.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('InAppPayment'),
                  },
                ],
                {cancelable: false},
              );
            }
          }}>
          <View style={styles.strip}>
            <View style={{height: 190, width: '60%', justifyContent: 'center'}}>
              <Text style={styles.textname2}>
                {I18n.t('Chat_with_a_Cannabis_Health_Coach', {locale: lang})}
                {/* Chat with a {'\n'} Cannabis{'\n'} Health Coach */}
              </Text>
            </View>
            <View style={{height: 150, width: '40%'}}>
              <Image
                style={styles.track2}
                source={require('../../assets/box2.png')}
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={tryDeepLinking}>
          <View style={styles.strip}>
            <View style={{height: 150, width: '43%'}}>
              <Image
                style={styles.track}
                source={require('../../assets/box3.png')}
              />
            </View>
            <View style={{height: 150, width: '57%'}}>
              <Text style={styles.textname}>
                {I18n.t('Explore_the_Green_Market', {locale: lang})}
                {/* Explore the {'\n'} Green Market */}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Cresources;

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
  strip2: {
    flexDirection: 'row',
    backgroundColor: colors.mangoColor,
    width: '100%',
    height: 190,
    marginTop: '10%',
  },
  textname: {
    color: '#fff',
    marginTop: 65,
    textAlign: 'left',
    fontSize: 22,
    marginLeft: 15,
    fontFamily: 'Montserrat-Regular',
  },
  strip: {
    flexDirection: 'row',
    backgroundColor: '#f2cb05',
    width: '100%',
    height: 190,
    marginTop: 15,
  },
  track: {
    height: 150,
    width: 140,
    marginLeft: 20,
    marginTop: 28,
  },
  track2: {
    height: 150,
    width: 190,
    marginLeft: -45,
    marginTop: 15,
  },
  textname2: {
    color: '#fff',

    textAlign: 'left',
    fontSize: 22,
    marginLeft: 15,
    fontFamily: 'Montserrat-Regular',
  },
});
