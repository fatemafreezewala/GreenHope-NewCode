import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../constant/colors';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../i18n';
import AppContext from '../../context/AppContext';
const Emoji = ({navigation}) => {
  const [selecteed, setselected] = useState([]);
  const {lang} = useContext(AppContext);
  const setselectedfunc = (number) => {
    number = parseInt(number);
    let obj;
    switch (number) {
      case 1:
        obj = {
          img: 'https://i.ibb.co/1rNF62H/11.png',
          id: '1',
          isselected: 'false',
          name: I18n.t('Great', {locale: lang}),
        };

        break;
      case 2:
        obj = {
          img: 'https://i.ibb.co/BC5XyrK/12.png',
          id: '2',
          isselected: 'false',
          name: I18n.t('Paranoid', {locale: lang}),
        };
        break;
      case 3:
        obj = {
          img: 'https://i.ibb.co/VtfThPG/13.png',
          id: '3',
          isselected: 'false',
          name: I18n.t('Tingly', {locale: lang}),
        };
        break;
      case 4:
        obj = {
          img: 'https://i.ibb.co/XFBF8rs/14.png',
          id: '4',
          isselected: 'false',
          name: I18n.t('Sleepy', {locale: lang}),
        };
        break;
      case 5:
        obj = {
          img: 'https://i.ibb.co/HDg9cdN/15.png',
          id: '5',
          isselected: 'false',
          name: I18n.t('Silly', {locale: lang}),
        };
        break;
      case 6:
        obj = {
          img: 'https://i.ibb.co/xHtWq3j/16.png',
          id: '6',
          isselected: 'false',
          name: I18n.t('Talkative', {locale: lang}),
        };
        break;
      case 7:
        obj = {
          img: 'https://i.ibb.co/dmCzCFY/17.png',
          id: '7',
          isselected: 'false',
          name: I18n.t('Giggly', {locale: lang}),
        };
        break;
      case 8:
        obj = {
          img: 'https://i.ibb.co/0FBHbvb/18.png',
          id: '8',
          isselected: 'false',
          name: I18n.t('Chill', {locale: lang}),
        };
        break;
      case 9:
        obj = {
          img: 'https://i.ibb.co/hHMLJHJ/19.png',
          id: '9',
          isselected: 'false',
          name: I18n.t('Uplifted', {locale: lang}),
        };
        break;
      case 10:
        obj = {
          img: 'https://i.ibb.co/Dk44fJX/20.png',
          id: '10',
          isselected: 'false',
          name: I18n.t('Grateful', {locale: lang}),
        };
        break;
      case 11:
        obj = {
          img: 'https://i.ibb.co/bPpcCQX/21.png',
          id: '11',
          isselected: 'false',
          name: I18n.t('Frisky', {locale: lang}),
        };
        break;
      case 12:
        obj = {
          img: 'https://i.ibb.co/C82tgqL/22.png',
          id: '12',
          isselected: 'false',
          name: I18n.t('Unmotivated', {locale: lang}),
        };
        break;
      case 13:
        obj = {
          img: 'https://i.ibb.co/QHxGWXg/23.png',
          id: '13',
          isselected: 'false',
          name: I18n.t('Productive', {locale: lang}),
        };
        break;
      case 14:
        obj = {
          img: 'https://i.ibb.co/sJ866hC/24.png',
          id: '14',
          isselected: 'false',
          name: I18n.t('Euphoric', {locale: lang}),
        };
        break;
      case 15:
        obj = {
          img: 'https://i.ibb.co/F3s4x24/25.png',
          id: '15',
          isselected: 'false',
          name: I18n.t('Confused', {locale: lang}),
        };
        break;
      case 16:
        obj = {
          img: 'https://i.ibb.co/CsxGr2C/26.png',
          id: '16',
          isselected: 'false',
          name: I18n.t('Restless', {locale: lang}),
        };
        break;
      case 17:
        obj = {
          img: 'https://i.ibb.co/n1fLFzK/27.png',
          id: '17',
          isselected: 'false',
          name: I18n.t('Visuals', {locale: lang}),
        };
        break;
      case 18:
        obj = {
          img: 'https://i.ibb.co/J33b8V7/28.png',
          id: '18',
          isselected: 'false',
          name: I18n.t('Anxious', {locale: lang}),
        };
        break;
      case 19:
        obj = {
          img: 'https://i.ibb.co/drWSvJj/29.png',
          id: '19',
          isselected: 'false',
          name: I18n.t('Dry_EYe_Mouth', {locale: lang}),
        };
        break;
      case 20:
        obj = {
          img: 'https://i.ibb.co/w48HcmG/30.png',
          id: '20',
          isselected: 'false',
          name: I18n.t('Relaxed', {locale: lang}),
        };
        break;
      case 21:
        obj = {
          img: 'https://i.ibb.co/PDTwrvk/31.png',
          id: '21',
          isselected: 'false',
          name: I18n.t('Focused', {locale: lang}),
        };
        break;
    }
    console.log(obj);
    if (selecteed.length <= 5) {
      setselected([...selecteed, obj]);
    } else {
      Alert.alert('Only six could be selected.');
    }
  };
  const move = async () => {
    console.log(selecteed);
    await AsyncStorage.setItem('Aftersessiontwo', JSON.stringify(selecteed));
    let mm = await AsyncStorage.getItem('trackfour');
    if (mm == 'Concentrate(Dabs)' || mm == 'Flower') {
      navigation.navigate('RateOne');
    } else {
      navigation.navigate('RateTwo');
    }
  };
  const remove = (id) => {
    let arry = selecteed;
    arry = arry.filter((item) => item.id != id);
    // var index = arry.indexOf(elem);
    // if (index != -1) {
    //   arry = arry.splice(index, 1);
    // }
    setselected(arry);
    console.log(selecteed);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Strain')}>
        <Icon
          style={styles.inbox}
          name="arrow-left-circle"
          size={30}
          color="#0c7488"
        />
      </TouchableWithoutFeedback>

      <Text style={styles.head}>
        {I18n.t('How_are_you_feeling', {locale: lang})}
      </Text>
      {selecteed.length != 0 && (
        <View style={styles.rowselec}>
          {selecteed.map((item, i) => {
            return (
              <View key={i} style={styles.colselec}>
                <Image
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                  source={{uri: item.img}}
                />
                <TouchableOpacity onPress={() => remove(item.id)}>
                  <MCI name="close" size={30} color="#0ea1bc" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      <View style={{height: '66%', marginTop: 15, paddingBottom: 70}}>
        <ScrollView>
          <View style={styles.row}>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('1')}>
                <Image source={require('../../assets/11.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Great', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('2')}>
                <Image source={require('../../assets/12.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Paranoid', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('3')}>
                <Image source={require('../../assets/13.png')} />
                <Text style={styles.imgtextmore}>
                  {I18n.t('Tingly', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('4')}>
                <Image source={require('../../assets/14.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Sleepy', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('5')}>
                <Image source={require('../../assets/15.png')} />
                <Text style={styles.imgtextmore}>
                  {I18n.t('Silly', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('6')}>
                <Image source={require('../../assets/16.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Talkative', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('7')}>
                <Image source={require('../../assets/17.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Giggly', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('8')}>
                <Image source={require('../../assets/18.png')} />
                <Text style={styles.imgtextmore}>
                  {I18n.t('Chill', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('9')}>
                <Image source={require('../../assets/19.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Uplifted', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('10')}>
                <Image source={require('../../assets/20.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Grateful', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('11')}>
                <Image source={require('../../assets/21.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Frisky', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('12')}>
                <Image
                  style={{marginLeft: 12}}
                  source={require('../../assets/22.png')}
                />
                <Text style={styles.imgtext}>
                  {I18n.t('Unmotivated', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('13')}>
                <Image source={require('../../assets/23.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Productive', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('14')}>
                <Image source={require('../../assets/24.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Euphoric', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('15')}>
                <Image source={require('../../assets/25.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Confused', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('16')}>
                <Image source={require('../../assets/26.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Restless', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('17')}>
                <Image source={require('../../assets/27.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Visuals', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('18')}>
                <Image source={require('../../assets/28.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Anxious', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('19')}>
                <Image
                  style={{marginLeft: 20}}
                  source={require('../../assets/29.png')}
                />
                <Text style={styles.imgtext}>
                  {I18n.t('Dry_EYe_Mouth', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('20')}>
                <Image source={require('../../assets/30.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Relaxed', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.col}>
              <TouchableOpacity onPress={() => setselectedfunc('21')}>
                <Image source={require('../../assets/31.png')} />
                <Text style={styles.imgtext}>
                  {I18n.t('Focused', {locale: lang})}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.signup} onPress={move}>
          <Text style={styles.submitText}>
            {I18n.t('Continue', {locale: lang})}
          </Text>
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
    top: 30,
    right: 10,
  },
  lable: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    color: '#8eb48f',
    paddingTop: 0,
  },
  inbox: {
    position: 'absolute',
    top: 30,
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
    marginTop: 80,
  },
  subhead: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
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
  imgtext: {
    fontFamily: 'Montserrat-Regular',
    color: '#8eb48f',
    marginLeft: 10,
  },
  imgtextmore: {
    fontFamily: 'Montserrat-Regular',
    color: '#8eb48f',
    marginLeft: 18,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    alignItems: 'center',
  },
  col: {
    flexDirection: 'column',
    width: '33%',
    height: 100,
    textAlign: 'center',
    alignItems: 'center',
  },
  colselec: {
    flexDirection: 'column',
    width: '15%',
    height: 80,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowselec: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
});
export default Emoji;
