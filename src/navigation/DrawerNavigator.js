import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Octa from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/Feather';
import Ant from 'react-native-vector-icons/AntDesign';
import Home from '../screens/user/Home';
import Profile from '../screens/user/Profile';
import CustomDrawer from './CustomDrawer';
import BookAppoint from '../screens/user/BookAppoint';

import ChangeSubscrption from '../screens/user/ChangeSubscrption';
import ViewAppointment from '../screens/user/ViewAppointment';
import InAppPayment from '../screens/user/InAppPayment';
import I18n from '../i18n';
import AppContext from '../context/AppContext';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {lang} = useContext(AppContext);
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',

        labelStyle: {
          fontSize: 16,
        },
        style: {
          backgroundColor: '#458c78',
          flex: 1,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        options={{
          drawerLabel: I18n.t('Home', {locale: lang}),
          drawerIcon: () => <MCI name="home" size={25} color="#fff" />,
        }}
        name="Home"
        component={Home}
      />
      <Drawer.Screen
        options={{
          drawerLabel: I18n.t('Edit_Profile', {locale: lang}),
          drawerIcon: () => <Icon name="user" size={25} color="#fff" />,
        }}
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        options={{
          drawerLabel: I18n.t('view_appointment', {locale: lang}),
          drawerIcon: () => <Icon name="calendar" size={25} color="#fff" />,
        }}
        name="Calendar"
        component={ViewAppointment}
      />
      <Drawer.Screen
        options={{
          drawerLabel: I18n.t('upgrade_subscription', {locale: lang}),
          drawerIcon: () => <Icon name="calendar" size={25} color="#fff" />,
        }}
        name="Upgrade"
        component={InAppPayment}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
