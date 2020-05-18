import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter,
  PermissionsAndroid,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {isEmpty, storeToken, getToken} from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  async componentDidMount() {
    await DeviceEventEmitter.addListener('getDeviceToken', (token) => {
      if (!isEmpty(token)) {
        storeToken(token);
        console.log('Device Token', token);
      }
    });

    let storedToken = await getToken();
    if (!isEmpty(storedToken)) {
      this.setState({token: storedToken});
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'Ezsms App Sms Permission',
          message:
            'Ezsms App needs access to your inbox ' +
            'so you can send messages in background.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        alert('SMS permission denied');
      }
    } catch (err) {
      alert.warn(err);
    }
  }

  render() {
    return (
      <>
        <View style={styles.listHeader}>
          <Text>Push Notifications</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.noData}>
            <Text style={styles.noDataText}>Your Device Token Is :</Text>
            <Text style={styles.noDataText} selectable>
              {this.state.token}
            </Text>
          </View>
        </View>
      </>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  listHeader: {
    backgroundColor: '#eee',
    color: '#222',
    height: 44,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  noData: {
    paddingVertical: 50,
  },
  noDataText: {
    fontSize: 14,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
