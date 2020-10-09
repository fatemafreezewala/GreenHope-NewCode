import React, {useState, useContext, useEffect, us} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import url from '../../constant/url';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
let dummyData = [{name: 'john'}, {name: 'jane'}];
import {useNavigation} from '@react-navigation/native';
import AppContext from '../../context/AppContext';
import colors from '../../constant/colors';
import I18n from '../../i18n';
const SavedStrain = () => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState('');
  const [allstarin, setstrain] = useState([]);
  const [strain, setselectedstrain] = useState('');
  const [user, setUser] = useState({});
  const navigation = useNavigation();
  const {lang, setChange, change} = useContext(AppContext);
  useEffect(() => {
    fetchUser();
  }, [change]);
  const fetchUser = async () => {
    let user = await AsyncStorage.getItem('USER');
    user = JSON.parse(user);
    getallstarin(user.id);
  };
  const SortItem = (val) => {
    if (val == '') {
      console.log(allstarin);
      setData(allstarin);
    } else {
      let datat = data;
      datat = datat.filter((location) => {
        return location.label.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });

      setData(datat);
    }
  };
  const getallstarin = async (id) => {
    console.log('saved');
    return fetch(`${url}getstrain&id=${id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        let arry = responseJson.data;
        if (arry) {
          arry.map((item) => {
            item.label = item.name;
            item.value = item.name;
          });

          setstrain(responseJson.data);
          setData(responseJson.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const move = async () => {
    await AsyncStorage.setItem('strain', strain);
    navigation.navigate('Emoji');
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.searchmyInp}
          placeholder={I18n.t('Search', {locale: lang})}
          onChangeText={SortItem}
        />
        <View style={{alignSelf: 'flex-start', margin: '10%'}}>
          <RadioForm
            radio_props={data}
            initial={0}
            formHorizontal={false}
            labelHorizontal={true}
            buttonColor={colors.mangoColor}
            buttonInnerColor={colors.mangoColor}
            selectedButtonColor={colors.mangoColor}
            animation={true}
            onPress={(value) => {
              setselectedstrain(value);
              console.log(value);
            }}
            buttonSize={10}
            buttonOuterSize={20}
            labelStyle={styles.lable}
          />
        </View>
      </ScrollView>
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

export default SavedStrain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchmyInp: {
    width: 350,
    height: 45,
    borderWidth: 1,
    borderColor: colors.buttonColor,
    paddingLeft: 20,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  lable: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.buttonColor,
    paddingTop: 0,
    alignSelf: 'center',
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
  signup: {
    width: '90%',
    height: 45,
    backgroundColor: '#f2cb05',
    borderRadius: 40,
    justifyContent: 'center',
    paddingLeft: '30%',
    marginTop: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
});
