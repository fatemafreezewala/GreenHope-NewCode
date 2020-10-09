import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../../constant/colors';
import {useNavigation} from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import I18n from '../../i18n';
import AppContext from '../../context/AppContext';
import AsyncStorage from '@react-native-community/async-storage';
import AuthContext from '../../navigation/Auth';
const GetStarted = ({navigation}) => {
  const [showRealApp, setShowRealApp] = useState(false);
  const {lang} = useContext(AppContext);
  const {signIn} = useContext(AuthContext);
  const slides = [
    {
      key: '1',
      title: I18n.t('track_usage', {locale: lang}),
      text: I18n.t(
        'Track_and_journal_your_usage_to_document_symptom_improvement_and_side_effects_for_each_strain_and_consumption_method',
        {locale: lang},
      ),
      image: require('../../assets/image1.png'),
      backgroundColor: '#febe29',
    },
    {
      key: '2',
      title: I18n.t('Talk_to_a_coach', {locale: lang}),
      text: I18n.t(
        'Instant_message_or_video_chat_with_one_of_Green_Hopes_cannabis_coaches',
        {locale: lang},
      ),
      image: require('../../assets/image_2.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: '3',
      title: I18n.t('Find_Products', {locale: lang}),
      text: I18n.t(
        'Use_our_Cannabis_Resource_Hub_with_access_to_our_educational_articles_and_vetted_product_offerings',
        {locale: lang},
      ),
      image: require('../../assets/image3.png'),
      backgroundColor: '#febe29',
    },
  ];

  const _renderItem = ({item}) => {
    return (
      <View style={styles.slide} backgroundColor={item.backgroundColor}>
        <Text style={styles.title}>{item.title}</Text>

        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <Text style={styles.buttonText}>{I18n.t('Skip', {locale: lang})}</Text>
    );
  };

  const _renderDoneButton = () => {
    return (
      <Text style={styles.buttonText}>{I18n.t('Finish', {locale: lang})}</Text>
    );
  };
  const _renderNextButton = () => {
    return (
      <Text style={styles.buttonText}>{I18n.t('Next', {locale: lang})}</Text>
    );
  };
  const _onDone = async () => {
    setShowRealApp(true);
    await AsyncStorage.setItem('USER_TOKEN', 'qww');
    signIn('1234');
    navigation.navigate('Home');
  };
  return (
    <>
      <AppIntroSlider
        showSkipButton={true}
        onSkip={_onDone}
        renderSkipButton={_renderSkipButton}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
      />
    </>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  slide: {
    height: '100%',

    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    marginTop: 35,
    fontFamily: 'Montserrat-Regular',
  },
  text: {
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
    fontFamily: 'Montserrat-Regular',
    marginTop: 20,
    fontSize: 18,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 70,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    padding: 12,
  },
});
