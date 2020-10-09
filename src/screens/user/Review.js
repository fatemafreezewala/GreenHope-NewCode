import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';
import url from '../../constant/url';
import {Rating, AirbnbRating} from 'react-native-ratings';
const Review = ({route, navigation}) => {
  const [notes, setNotes] = useState('');
  const {id} = route.params;
  const [rate, setRating] = useState('');

  const mylogin = async () => {
    let user = await AsyncStorage.getItem('rangesli');
    user = JSON.parse(user);
    try {
      const res = await fetch(`${url}updateReview`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feelingafter: user,
          id: id,
          notes: notes,
          rate: rate,
        }),
      });

      const json = await res.json();
      console.log(json);
      if (json.status == '200') {
        Toast.show('Review Saved Successfully.', Toast.LONG);
        navigation.navigate('Home');
      } else {
        Toast.show('Network connection error.', Toast.LONG);
      }
    } catch (error) {
      Toast.show('Network connection error.', Toast.LONG);
      console.error(error);
    }
  };
  const onChange = (text) => {
    setNotes(text);
  };
  const ratingCompleted = (rating) => {
    setRating(rating);
    console.log('Rating is: ' + rating);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={{backgroundColor: '#000'}}
        onPress={() => navigation.navigate('Home')}>
        <Icon
          style={styles.inbox}
          name="arrow-left-circle"
          size={30}
          color="#0c7488"
        />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView style={{width: '100%', alignItems: 'center'}}>
        <Text style={styles.head}>How would you rate</Text>
        <Text style={styles.subhead}>this strain over all ?</Text>
        <View style={{marginTop: 30}}>
          <AirbnbRating
            count={5}
            defaultRating={0}
            size={40}
            onFinishRating={ratingCompleted}
            showRating={false}
          />
        </View>
        <Text style={styles.head}>Write a Review</Text>

        <View style={{width: '90%', marginTop: 50}}>
          <TextInput
            onChangeText={(text) => {
              onChange(text);
            }}
            style={styles.textarea}
            placeholder="Write a review"
          />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.signup} onPress={mylogin}>
          <Text style={styles.submitText}>CONTINUE</Text>
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
    top: 35,
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
    top: 35,
    left: 20,
  },
  signup: {
    width: '90%',
    height: 45,
    backgroundColor: '#f2cb05',
    borderRadius: 40,
    justifyContent: 'center',
    paddingLeft: '30%',
    marginTop: 15,
    fontFamily: 'Montserrat-Regular',
  },
  head: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginTop: 70,
  },
  subhead: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginTop: 0,
  },
  start: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginTop: 20,
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
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
    width: '98%',
    borderWidth: 1,
    borderColor: '#12a2bd',
    borderRadius: 10,
  },
});
export default Review;
