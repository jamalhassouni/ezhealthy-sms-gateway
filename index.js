/**
 * @format
 */

import {AppRegistry, PermissionsAndroid, NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
const DirectSms = NativeModules.DirectSms;

AppRegistry.registerComponent(appName, () => App);
/*
  Define a method to handle Push Notifications
*/
const NotificationHandler = async (message) => {
  console.log('Jamal', message);
  let payload = JSON.parse(message.data.payload);
  //await sendDirectSms(payload.number, payload.message);
  //handleNotification(message);
};

/**
 * Send SMS
 */
const sendDirectSms = async (number, message) => {
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
      DirectSms.sendDirectSms(number, message);
    } else {
      alert('SMS permission denied');
    }
  } catch (err) {
    alert.warn(err);
  }
};
/*
  Register the task with the ReactNative App Registry
  */
AppRegistry.registerHeadlessTask('RemoteMessage', () => NotificationHandler);
