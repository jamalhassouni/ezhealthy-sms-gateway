package com.ezsms;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.messaging.RemoteMessage;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.util.Log;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

import androidx.annotation.NonNull;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ezsms";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    IntentFilter intentFilter = new IntentFilter("com.example.firebase.notification.event");

    LocalBroadcastManager.getInstance(this.getApplicationContext()).registerReceiver(new BroadcastReceiver() {
      @Override
      public void onReceive(Context context, Intent intent) {
        RemoteMessage remoteMessage = intent.getParcelableExtra("message");
        WritableMap data = MessagingSerializer.parseRemoteMessage(remoteMessage);
        sendEvent("FirebasePushNotification", data);

      }
    }, intentFilter);

    FirebaseInstanceId.getInstance().getInstanceId().addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
      @Override
      public void onComplete(@NonNull Task<InstanceIdResult> task) {

        if (task.isSuccessful()) {
          String token = task.getResult().getToken();
          // Emitting event from java code
          // Send token To React Native
          sendToken(token);

          Log.d("TAG", "onComplete: Token: " + token);
        }

      }
    });

  }

  private void sendEvent(String eventName, Object params) {
    // this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName,
    // params);
    while (getReactInstanceManager().getCurrentReactContext() == null)
      ; // Busy wait.
    getReactInstanceManager().getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
  }

  private void sendToken(String Token) {
    ReactInstanceManager mReactInstanceManager = getReactNativeHost().getReactInstanceManager();
    ReactApplicationContext context = (ReactApplicationContext) mReactInstanceManager.getCurrentReactContext();
    mReactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
      public void onReactContextInitialized(ReactContext validContext) {
        // Use validContext here
        sendEvent("getDeviceToken", Token);

      }
    });
  }

}
