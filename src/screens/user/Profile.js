import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import url from '../../constant/url';
import ImageResizer from 'react-native-image-resizer';
import I18n from '../../i18n';
import AppContext from '../../context/AppContext';
const Profile = ({navigation}) => {
  const {lang,setuserData} = useContext(AppContext);
  const [email, onemailText] = useState('');
  const [password, onpassText] = useState('');
  const [phone, onphoneText] = useState('');
  const [name, onnameText] = useState('');
  const [uid, onid] = useState('');
  const [imageInfo, setImageInfo] = useState({});
  const [avatar, setAvatar] = useState(require('../../assets/user.png'));
  const [isShowingText, setIsShowingText] = useState(false);
  const [imageResize, setResizeInfo] = useState({});
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    onemailText(user.email);
    onpassText(user.password);
    onphoneText(user.phone);
    onnameText(user.fullname);
    onid(user.id);
    setImageInfo({
      uri: user.image,
      fileName: '',
      type: '',
      path: '',
    });
  };
  const selectphoto = () => {
    const options = {
      title: 'Select Avatar',
      noData: true,
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log(response);
      if (response.error) {
        console.log(response.error);
      } else if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        resize(response.uri);
        setImageInfo({
          uri: response.uri,

          type: response.type,
        });
      }
    });
  };
  const resize = (uri) => {
    ImageResizer.createResizedImage(uri, 300, 300, 'JPEG', 100)
      .then((response) => {
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        // response.path is the path of the new image
        // response.name is the name of the new image with the extension
        // response.size is the size of the new image
        console.log(response);
        setResizeInfo({uri: response.uri});
      })
      .catch((err) => {});
  };
  const uploadImage = async () => {
    setIsShowingText(true);
    console.log(imageInfo.uri);
    let formData = new FormData();
    if (imageInfo.path != '') {
      formData.append('imagefile', {
        uri:
          Platform.OS === 'android'
            ? imageResize.uri
            : imageResize.uri.replace('file://', ''),
        type: imageInfo.type,
        name: 'fate.jpg',
      });
    }
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('id', uid);
    try {
      const res = await fetch(`${url}editprofile`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsShowingText(false);
      const json = await res.json();
      console.log(json);
      if (json.status == '200') {
        await AsyncStorage.setItem('USER', JSON.stringify(json.data));
        setuserData(json.data)
        Toast.show('Success.', Toast.LONG);
        navigation.navigate('Home');
      }
      console.log(json);
    } catch (error) {
      setIsShowingText(false);
      console.log(error);
      Toast.show('Network connection error.', Toast.LONG);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
        <Icon
          style={styles.inbox}
          name="arrow-left-circle"
          size={30}
          color="#0c7488"
        />
      </TouchableWithoutFeedback>

      <Text style={styles.head}>{I18n.t('Profile', {locale: lang})}</Text>
      <TouchableWithoutFeedback onPress={selectphoto}>
        <View>
          {imageInfo.uri == '' ? (
            <View>
              <Image
                style={styles.avatar}
                source={require('../../assets/user.png')}
              />
              <Image
                style={{position: 'absolute', bottom: 10, right: -10}}
                source={require('../../assets/photograph.png')}
              />
            </View>
          ) : (
            <Image style={styles.avatar} source={{uri: imageInfo.uri}} />
          )}
        </View>
      </TouchableWithoutFeedback>
      <TextInput
        placeholder={I18n.t('Email', {locale: lang})}
        style={styles.myInp}
        onChangeText={(text) => onemailText(text)}
        placeholderTextColor="#c2d7c3"
        value={email}
      />
      <TextInput
        placeholder={I18n.t('Full_name', {locale: lang})}
        textContentType="password"
        style={styles.myInp}
        onChangeText={(text) => onnameText(text)}
        placeholderTextColor="#c2d7c3"
        value={name}
      />
      <TextInput
        placeholder={I18n.t('Phone', {locale: lang})}
        textContentType="password"
        style={styles.myInp}
        onChangeText={(text) => onphoneText(text)}
        placeholderTextColor="#c2d7c3"
        value={phone}
      />
      <TextInput
        secureTextEntry={true}
        placeholder={I18n.t('Password', {locale: lang})}
        textContentType="password"
        style={styles.myInp}
        onChangeText={(text) => onpassText(text)}
        placeholderTextColor="#c2d7c3"
        value={password}
      />
      <TouchableOpacity
        onPress={uploadImage}
        style={styles.submit}
        underlayColor="#fff">
        {isShowingText ? (
          <ActivityIndicator
            animating={true}
            style={styles.indicator}
            size="small"
            color="#fff"
          />
        ) : (
          <Text style={styles.submitText}>
            {I18n.t('update', {locale: lang})}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
  menu: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
  inbox: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
    marginTop: 20,
  },
  myInp: {
    borderRadius: 33,
    width: '90%',
    height: 45,
    borderWidth: 1,
    borderColor: '#8eb48f',
    paddingLeft: 20,
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
  },
  submit: {
    width: '90%',
    height: 45,
    backgroundColor: '#0ea1bc',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    fontFamily: 'Montserrat-Semibold',
    marginLeft: 5,
  },
  submitText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  head: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginTop: 60,
    textAlign: 'center',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    color: '#fff',
  },
});
export default Profile;
