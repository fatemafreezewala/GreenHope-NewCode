import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FEA from 'react-native-vector-icons/Feather';
import colors from '../constant/colors';
import url from '../constant/url';
import AppContext from '../context/AppContext';
import I18n from '../i18n';
import DropDownPicker from 'react-native-dropdown-picker';
const UserInfo = ({navigation}) => {
  const {lang} = useContext(AppContext);
  const [completelist, setcompleteList] = useState([]);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState('all');

  const [isShowingText, setisShowingText] = useState(true);
  useEffect(() => {
    fetchUser('all');
  }, []);

  const fetchUser = async (rrr) => {
    setisShowingText(true);
    console.log('called');
    try {
      const res = await fetch(`${url}getalluserByType`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: rrr,
        }),
      });

      const json = await res.json();

      if (json.status == '200') {
        console.log(json);
        if (json.data) {
          let dat = json.data;
          dat.forEach((element) => {
            if (element.subs_category == '1') {
              element.type = 'Premium';
            } else if (element.subs_category == '2') {
              element.type = 'Basic';
            } else {
              element.type = 'Free';
            }
          });
          setcompleteList(dat);
          setData(dat);
          setisShowingText(false);
        }
      } else {
        setcompleteList([]);
        setData([]);
        setisShowingText(false);
      }
    } catch (error) {
      setcompleteList([]);
      setData([]);
      setisShowingText(false);
    }
  };
  const viewSession = (id, name) => {
    navigation.navigate('SessionList', {
      userId: id,
      name: name,
    });
  };
  const SortItem = (val) => {
    if (val == '') {
      setData(completelist);
    } else {
      let datat = data;
      datat = datat.filter((location) => {
        return location.fullname.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });

      setData(datat);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerhed}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MCI name="arrow-left" size={40} color="#0ea1bc" />
        </TouchableOpacity>
      </View>
      <Text style={styles.head}> Users</Text>
      <DropDownPicker
        items={[
          {
            label: 'All',
            value: 'all',
            icon: () => <FEA name="flag" size={18} color="#900" />,
          },
          {
            label: 'Premium',
            value: '1',
            icon: () => <FEA name="flag" size={18} color="#900" />,
          },
          {
            label: 'Basic',
            value: '2',
            icon: () => <FEA name="flag" size={18} color="#900" />,
          },
          {
            label: 'Free',
            value: '3',
            icon: () => <FEA name="flag" size={18} color="#900" />,
          },
        ]}
        defaultValue={term}
        containerStyle={{height: 40}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={(item) => {
          console.log(item);
          setTerm(item.value);
          fetchUser(item.value);
        }}
      />
      <TextInput
        style={{
          borderWidth: 1,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: '10%',
        }}
        placeholder="Search"
        onChangeText={(text) => SortItem(text)}
      />
      {isShowingText ? (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="small"
          color="#000"
        />
      ) : (
        <View />
      )}
      <ScrollView>
        {data.map((item) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SessionList', {
                  userId: item.id,
                  name: item.fullname,
                })
              }>
              <View style={styles.cardWrapper}>
                <View style={styles.cardMiddle}>
                  <TouchableOpacity>
                    <Text style={styles.badgeYellow}>{item.type}</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {item.fullname}
                    {'\n'}
                    {item.email}
                    {'\n'}
                    {item.phone}
                  </Text>

                  <TouchableOpacity
                    onPress={() => viewSession(item.id, item.fullname)}>
                    <Text style={styles.badgeGreen}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
    padding: 20,
    // justifyContent: 'space-between',
  },
  cardMiddle: {
    flex: 1,
  },
  badgeGreen: {
    backgroundColor: 'green',
    alignSelf: 'flex-end',
    color: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  badgeYellow: {
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    color: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 2,
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
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginTop: 10,
    alignSelf: 'center',
  },
});
