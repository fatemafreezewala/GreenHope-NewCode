import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../../constant/colors';
import Ion from 'react-native-vector-icons/Ionicons';
const Appointment = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MCI name="menu" size={40} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <Text style={styles.head}>My Appointment</Text>
      <ScrollView>
        <View style={styles.box}>
          <Text style={{fontWeight: 'bold'}}>Name</Text>
          <Text style={{fontWeight: 'bold'}}>Date</Text>
          <Text style={{fontWeight: 'bold'}}>Time</Text>
          <Text style={{fontWeight: 'bold'}}>Scheduled For :</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
    height: 110,

    padding: 10,
    justifyContent: 'flex-start',
    padding: 20,
    // justifyContent: 'space-between',
  },
  cardMiddle: {
    flexDirection: 'column',
    width: '40%',
  },
  badgeGreen: {
    backgroundColor: 'green',
    alignSelf: 'flex-end',
    color: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: '-10%',
  },
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.themeRed,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  head: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
