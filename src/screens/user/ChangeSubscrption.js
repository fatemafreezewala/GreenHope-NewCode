import React, {useState, useContext, useEffect} from 'react';
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
  Platform,
} from 'react-native';
import colors from '../../constant/colors';
import url from '../../constant/url';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import AuthContext from '../../navigation/Auth';
import moment from 'moment';
import MCI from 'react-native-vector-icons/Feather';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import AppContext from '../../context/AppContext';
import I18n from '../../i18n';
const itemSkus = Platform.select({
  ios: ['com.greenhopewellness.app.basic', 'com.greenhopewellness.app.premium'],
  android: ['premium_14.99', 'basic_9.99'],
});

const ChangeSubscription = ({navigation}) => {
  const [selectedId, setSelectedId] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [isShowingText, setIsShowingText] = useState(false);
  const {signIn} = useContext(AuthContext);
  const {lang} = useContext(AppContext);
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getSubs();
    getProduct();
  }, []);
  const getSubs = async () => {
    let User = await AsyncStorage.getItem('USER');
    User = JSON.parse(User);
    if (User.subs_category == '1') {
      setCurrent('Premium');
    } else if (User.subs_category == '2') {
      setCurrent('Basic');
    } else {
      setCurrent('Free');
    }
  };
  const getProduct = async () => {
    try {
      let products = await RNIap.getProducts(itemSkus);
      console.log(products);
      setProducts(products);
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
  };
  const Item = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', width: '100%'}}>
          <Text style={{color: '#000', fontSize: 20, marginLeft: 10}}>
            {item.title}
          </Text>
          <Text style={{marginTop: 5, marginLeft: 10}}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const requestSubscription = async (sku) => {
    try {
      const response = await RNIap.requestPurchase(sku);
      const json = await response.json();
      if (json) {
        mylogin('premium_14.99');
      } else {
        mylogin('basic_9.99');
      }
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const mylogin = async (Productid) => {
    let d1 = moment(new Date().toISOString());
    let UserObj = await AsyncStorage.getItem('USER');
    UserObj = JSON.parse(UserObj);
    setIsShowingText(true);
    let is_free = '';
    if (Productid == 'premium_14.99') {
      selectedId = '1';
    } else {
      selectedId = '2';
    }
    try {
      const res = await fetch(`${url}updateSubs`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_free: 'false',
          subs: selectedId,
          id: UserObj.id,
          reg_at: d1,
          expiry: 'no',
        }),
      });

      const json = await res.json();

      if (json.status == '200') {
        await AsyncStorage.setItem('USER', JSON.stringify(json.data));
        Toast.show('Subscription Successful.', Toast.LONG);
        navigation.navigate('Home');
      } else {
        setIsShowingText(false);
        Toast.show('Network connection error.', Toast.LONG);
      }
      setIsShowingText(false);
    } catch (error) {
      setIsShowingText(false);
      Toast.show('Network connection error.', Toast.LONG);
      console.error(error);
    }
  };
  const renderItem = ({item}) => {
    const backgroundColor =
      item.productId === selectedId ? colors.mangoColor : '#fff';

    return (
      <Item
        item={item}
        onPress={() => requestSubscription(item.productId)}
        style={{backgroundColor}}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MCI name="arrow-left-circle" size={30} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={{fontSize: 30, marginTop: 10, alignSelf: 'center'}}>
          Subscriptions
        </Text>
        <Text style={{fontSize: 20, marginTop: 40, alignSelf: 'center'}}>
          Current : {current}
        </Text>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </ScrollView>
    </View>
  );
};

export default ChangeSubscription;

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
    marginTop: '10%',
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
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
