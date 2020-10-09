import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import MCI from 'react-native-vector-icons/Feather';

import colors from '../../constant/colors';
import SearchStrain from '../user/SearchStrain';
import AddStrain from '../user/AddStrain';
import SavedStrain from '../user/SavedStrain';
import AppContext from '../../context/AppContext';
import I18n from '../../i18n';
const initialLayout = {width: Dimensions.get('window').width};
const Strain = ({navigation}) => {
  const {lang} = useContext(AppContext);
  const [allstarin, setstrain] = useState([{name: 'john'}, {name: 'jane'}]);
  const [term, setTerm] = useState('j');
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: I18n.t('search', {locale: lang})},
    {key: 'second', title: I18n.t('add_new', {locale: lang})},
    {key: 'third', title: I18n.t('SAVED', {locale: lang})},
  ]);

  const renderScene = SceneMap({
    first: SearchStrain,
    second: AddStrain,
    third: SavedStrain,
  });

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        <View style={{flexDirection: 'row'}}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <View
                style={{
                  flexDirection: 'column',
                  width: '30%',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  key={i}
                  style={styles.tabItem}
                  onPress={() => setIndex(i)}>
                  <Text
                    style={
                      route.key === props.navigationState.routes[index].key
                        ? styles.tabTextActive
                        : styles.tabText
                    }>
                    {route.title}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MCI name="arrow-left-circle" size={30} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <Text style={styles.head}>
        {I18n.t('Select_the_strain_you_are_using', {locale: lang})} ?
      </Text>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{backgroundColor: '#fff'}}
        indicatorStyle={{backgroundColor: 'white'}}
        labelStyle={{color: '#000'}}
      />
    </View>
  );
};

export default Strain;

const styles = StyleSheet.create({
  containerhed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.themeRed,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  scene: {
    flex: 1,
  },
  head: {
    color: '#12a2bd',
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  tabBar: {
    width: '100%',
    //padding: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  tabItem: {
    // flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabText: {
    color: colors.mangoColor,
    borderRadius: 10,
    padding: 10,
  },
  tabTextActive: {
    borderWidth: 2,
    borderColor: colors.mangoColor,
    borderRadius: 10,
    padding: 10,
    color: colors.mangoColor,
  },
});
