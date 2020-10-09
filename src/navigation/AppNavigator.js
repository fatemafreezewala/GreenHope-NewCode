import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext, {defaultState, reducer, restoreToken} from './Auth';
import Login from '../screens/auth/Login';
import GetStarted from '../screens/auth/GetStarted';
import Signup from '../screens/auth/Signup';
import AdminDash from '../screens/admin/Dashboard';
import Doctordash from '../screens/trainer/Dashboard';
import DrawerNavigator from './DrawerNavigator';
import Home from '../screens/user/Home';
import Cresources from '../screens/user/Cresources';
import Subscription from '../screens/user/Subscription';
import Trackone from '../screens/user/Trackone';
import Strain from '../screens/user/Strain';
import Feelings from '../screens/user/Feelings';
import Consumption from '../screens/user/Consumption';
import Emoji from '../screens/user/Emoji';
import Severe from '../screens/user/Severe';
import Profile from '../screens/user/Profile';
import ChatVideo from '../screens/user/ChatVideo';
import Chat from '../screens/Chat';
import BookAppoint from '../screens/user/BookAppoint';
import UserList from '../screens/UserList';
import SessionList from '../screens/SessionList';
import AllocateToDoctor from '../screens/admin/AllocateToDoctor';
import DoctorList from '../screens/admin/DoctorList';
import RateOne from '../screens/user/RateOne';
import RateTwo from '../screens/user/RateTwo';
import Thankyouthirty from '../screens/user/Thankyouthirty';
import Sessioninfo from '../screens/user/Sessioninfo';
import RoleCheck from '../screens/auth/RoleCheck';
import ChangeSubscription from '../screens/user/ChangeSubscrption';
import Appointment from '../screens/admin/Appointments';
import CompletedApoint from '../screens/admin/CompletedApoint';
import AdminProfile from '../screens/admin/Profile';
import Messages from '../screens/admin/Messages';
import SessionInfoAdmin from '../screens/SessionInfoAdmin';
import ViewAppointment from '../screens/user/ViewAppointment';
import CresourcesBasic from '../screens/user/CresourcesBasic';
import Video2 from '../screens/Video2';
import Video from '../screens/Video';
import Contact from '../screens/user/Contact';
import ThankYou from '../screens/user/ThankYou';
import Aftersessionone from '../screens/user/Aftersessionone';
import Review from '../screens/user/Review';
import UserInfo from '../screens/UserInfo';
import InAppPayment from '../screens/user/InAppPayment';
const Stack = createStackNavigator();
const AppNavigator = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  React.useEffect(() => {
    restoreToken(dispatch);
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: (data) => {
        dispatch({type: 'SIGN_IN', token: data});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: (data) => {
        dispatch({type: 'SIGN_IN', token: data});
      },
    }),
    [],
  );

  if (state.isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.userToken == null ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="GetStarted" component={GetStarted} />
              {/* <Stack.Screen name="Subscription" component={Subscription} /> */}
            </>
          ) : (
            <>
              <Stack.Screen name="RoleCheck" component={RoleCheck} />

              <Stack.Screen name="Home" component={DrawerNavigator} />
              <Stack.Screen name="Emoji" component={Emoji} />
              <Stack.Screen name="Cresources" component={Cresources} />
              <Stack.Screen name="Strain" component={Strain} />

              <Stack.Screen name="RateOne" component={RateOne} />

              <Stack.Screen name="Sessioninfo" component={Sessioninfo} />

              <Stack.Screen name="RateTwo" component={RateTwo} />

              <Stack.Screen name="UserList" component={UserList} />
              <Stack.Screen name="SessionList" component={SessionList} />

              <Stack.Screen name="AdminDash" component={AdminDash} />

              <Stack.Screen name="DoctorList" component={DoctorList} />
              <Stack.Screen
                name="AllocateToDoctor"
                component={AllocateToDoctor}
              />
              {/* <Stack.Screen name="Emoji" component={Emoji} /> */}

              <Stack.Screen name="BookAppoint" component={BookAppoint} />

              <Stack.Screen name="ChatVideo" component={ChatVideo} />
              <Stack.Screen name="Chat" component={Chat} />

              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Severe" component={Severe} />

              <Stack.Screen name="Consumption" component={Consumption} />
              <Stack.Screen name="Feelings" component={Feelings} />

              <Stack.Screen name="Trackone" component={Trackone} />

              <Stack.Screen name="DoctorDash" component={Doctordash} />
              <Stack.Screen name="Thankyouthirty" component={Thankyouthirty} />
              <Stack.Screen name="Appointment" component={Appointment} />
              <Stack.Screen name="Messages" component={Messages} />
              <Stack.Screen name="Video2" component={Video2} />
              <Stack.Screen
                name="SessionInfoAdmin"
                component={SessionInfoAdmin}
              />
              <Stack.Screen name="UserInfo" component={UserInfo} />
              <Stack.Screen
                name="CompletedApoint"
                component={CompletedApoint}
              />
              <Stack.Screen name="AdminProfile" component={AdminProfile} />

              <Stack.Screen
                name="ChangeSubscription"
                component={ChangeSubscription}
              />
              <Stack.Screen
                name="ViewAppointment"
                component={ViewAppointment}
              />
              <Stack.Screen
                name="CresourcesBasic"
                component={CresourcesBasic}
              />

              <Stack.Screen name="Contact" component={Contact} />
              <Stack.Screen name="Video" component={Video} />
              <Stack.Screen name="ThankYou" component={ThankYou} />
              <Stack.Screen name="Review" component={Review} />
              <Stack.Screen
                name="Aftersessionone"
                component={Aftersessionone}
              />

              <Stack.Screen name="InAppPayment" component={InAppPayment} />
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default AppNavigator;
