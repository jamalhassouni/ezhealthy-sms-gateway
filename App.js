import React, {Component, Fragment} from 'react';
import {
  NativeModules,
  PermissionsAndroid,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const DirectSms = NativeModules.DirectSms;
import PushController from './PushController';
<PushController />;
export class SMSScreen extends Component {
  constructor(props) {
    super(props);
    this.pushData = [
      {
        title: 'First push',
        message: 'First push message',
      },
      {
        title: 'Second push',
        message: 'Second push message',
      },
    ];
  }

  _renderItem = ({item}) => (
    <View key={item.title}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  // sendDirectSms = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.SEND_SMS,
  //       {
  //         title: 'Ezsms App Sms Permission',
  //         message:
  //           'Ezsms App needs access to your inbox ' +
  //           'so you can send messages in background.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       DirectSms.sendDirectSms(
  //         '0697570055',
  //         'This is a direct message from your app.',
  //       );
  //     } else {
  //       alert('SMS permission denied');
  //     }
  //   } catch (err) {
  //     alert.warn(err);
  //   }
  // };

  render() {
    return (
      <Fragment>
        {/* <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.sendDirectSms()}>
            <Text style={styles.submitButtonText} selectTextOnFocus={true}>
              {' '}
              Submit{' '}
            </Text>
          </TouchableOpacity>
        </View> */}
        <PushController />
      </Fragment>
    );
  }
}

export default SMSScreen;

const styles = StyleSheet.create({
  mother_container: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  button: {
    width: 200,
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 24,
    color: '#ffff',
  },
  scrollView: {backgroundColor: Colors.lighter},
  listHeader: {backgroundColor: '#eee', color: '#222', height: 44, padding: 12},
  title: {fontSize: 18, fontWeight: 'bold', paddingTop: 10},
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  engine: {position: 'absolute', right: 0},
  body: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: {marginTop: 32, paddingHorizontal: 24},
  sectionTitle: {fontSize: 24, fontWeight: '600', color: Colors.black},
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {fontWeight: '700'},
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
