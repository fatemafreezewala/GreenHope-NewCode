import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  Alert,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import RNIap, {
  Product,
  ProductPurchase,
  PurchaseError,
  acknowledgePurchaseAndroid,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import MCI from 'react-native-vector-icons/Feather';
import url from '../../constant/url';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

import moment from 'moment';
const itemSkus = Platform.select({
  ios: ['premium_14.99', 'basic_9.99'],
  android: ['premium_14.99', 'basic_9.99'],
});
// const itemSubs = Platform.select({ios: ['test.sub'], android: ['test.sub']});
let purchaseUpdateSubscription;
let purchaseErrorSubscription;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      receipt: '',
      availableItemsMessage: '',
      current: '',
    };
  }
  async componentDidMount() {
    try {
      const result = await RNIap.initConnection();
      console.log('connection is => ', result);
      await RNIap.consumeAllItemsAndroid();
    } catch (err) {
      console.log('error in cdm => ', err);
    }
    await this.getItems();
    purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      console.log('purchaseUpdatedListener', purchase);
      if (
        purchase.purchaseStateAndroid === 1 &&
        !purchase.isAcknowledgedAndroid
      ) {
        try {
          const ackResult = await acknowledgePurchaseAndroid(
            purchase.purchaseToken,
          );
          console.log('ackResult', ackResult);
        } catch (ackErr) {
          console.warn('ackErr', ackErr);
        }
      }
      this.setState({receipt: purchase.transactionReceipt});
      this.purchaseConfirmed(purchase.transactionReceipt);

      purchaseErrorSubscription = purchaseErrorListener((error) => {
        console.log('purchaseErrorListener', error);
        // alert('purchase error', JSON.stringify(error));
      });
    });
  }
  componentWillUnmount() {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
  }
  getItems = async () => {
    try {
      console.log('itemSkus[0]', itemSkus[0]);
      const products = await RNIap.getProducts(itemSkus);
      console.log('Products[0]', products[0]);
      this.setState({productList: products});
      //   this.requestPurchase(itemSkus[0]);
    } catch (err) {
      console.log('getItems || purchase error => ', err);
    }
  };
  //   getSubscriptions = async (): void => {
  //     try {
  //       const products = await RNIap.getSubscriptions(itemSubs);
  //       console.log('Products => ', products);
  //       this.setState({productList: products});
  //     } catch (err) {
  //       console.log('getSubscriptions error => ', err);
  //     }
  //   };
  getAvailablePurchases = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      console.info('Available purchases => ', purchases);
      if (purchases && purchases.length > 0) {
        this.setState({
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0].transactionReceipt,
        });
      }
    } catch (err) {
      console.warn(err.code, err.message);
      console.log('getAvailablePurchases error => ', err);
    }
  };
  requestPurchase = async (sku) => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.log('requestPurchase error => ', err);
    }
  };
  //   requestSubscription = async (sku) => {
  //     try {
  //       await this.getItems();
  //       await RNIap.requestSubscription(sku);
  //     } catch (err) {
  //       alert(err.toLocaleString());
  //     }
  //   };
  purchaseConfirmed = async (receipth) => {
    receipth = JSON.parse(receipth);
    console.log('#####Purchase Confirmed', receipth.productId);
    //Alert.alert(receipt.productId);
    await this.handlePaymentSuccess(receipth.productId, receipth.orderId);
  };

  handlePaymentSuccess = async (Productid, orderId) => {
    console.log(Productid);
    let d1 = moment(new Date().toISOString());
    let UserObj = await AsyncStorage.getItem('USER');
    UserObj = JSON.parse(UserObj);
    let selectedId = '';
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
          orderId: orderId,
        }),
      });

      const json = await res.json();

      if (json.status == '200') {
        await AsyncStorage.setItem('USER', JSON.stringify(json.data));
        Toast.show('Subscription Successful.', Toast.LONG);
        this.props.navigation.navigate('Home');
      } else {
        Toast.show('Network connection error.', Toast.LONG);
      }
    } catch (error) {
      Toast.show('Network connection error.', Toast.LONG);
      console.error(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerhed}>
          <TouchableOpacity>
            <MCI name="arrow-left-circle" size={30} color="#0ea1bc" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={{fontSize: 30, marginTop: 10, alignSelf: 'center'}}>
            Subscriptions
          </Text>
          {/* <Text style={{fontSize: 20, marginTop: 40, alignSelf: 'center'}}>
            Current : {current}
          </Text> */}
          <FlatList
            data={this.state.productList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => this.requestPurchase(item.productId)}
                  style={[styles.item]}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', width: '100%'}}>
                      <Text
                        style={{color: '#000', fontSize: 20, marginLeft: 10}}>
                        {item.title}
                      </Text>
                      <Text style={{marginTop: 5, marginLeft: 10}}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
    );
  }
}
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
