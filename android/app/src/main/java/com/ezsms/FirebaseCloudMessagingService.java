package com.ezsms;

import android.app.ActivityManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.List;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;
import android.telephony.SmsManager;
import android.telephony.SmsMessage;

import org.json.JSONException;
import org.json.JSONObject;

public class FirebaseCloudMessagingService extends FirebaseMessagingService {

    private final static String TAG = FirebaseCloudMessagingService.class.getSimpleName();
    private final String SERVER = "https://8a9c9a02.ngrok.io/EzsmsAPI/reg_device0.php";
    private final int REQ_CODE_PERMISSION_SEND_SMS = 221;

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, "Remote Message received: " + remoteMessage);

        String payload = remoteMessage.getData().get("payload");
        try {

            JSONObject jsonObject = new JSONObject(payload);
            SmsManager sms = SmsManager.getDefault();
            sms.sendTextMessage(jsonObject.getString("number"), null, jsonObject.getString("message"), null, null);

        } catch (JSONException err) {
            Log.d("Error parse", err.toString());
        }

        if (this.isAppInBackground()) {
            if (remoteMessage.getData().size() > 0) {
                Intent intent = new Intent(getApplicationContext(), FirebaseCloudMessagingHeadlessService.class);
                intent.putExtra("message", remoteMessage);
                getApplicationContext().startService(intent);
                HeadlessJsTaskService.acquireWakeLockNow(this);
            }
        } else {
            Intent intent = new Intent("com.example.firebase.notification.event");
            intent.putExtra("message", remoteMessage);
            LocalBroadcastManager.getInstance(this.getApplicationContext()).sendBroadcast(intent);
        }
    }

    private boolean isAppInBackground() {
        ActivityManager activityManager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);

        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.KITKAT) {
            List<ActivityManager.RunningAppProcessInfo> runningAppProcessInfoList = activityManager
                    .getRunningAppProcesses();
            for (ActivityManager.RunningAppProcessInfo processInfo : runningAppProcessInfoList) {
                if (processInfo.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND) {
                    for (String pkg : processInfo.pkgList) {
                        if (pkg.equals(getPackageName())) {
                            return false;
                        }
                    }
                }
            }
        } else {
            List<ActivityManager.RunningTaskInfo> runningTaskInfoList = activityManager
                    .getRunningTasks(Integer.MAX_VALUE);
            ComponentName name = runningTaskInfoList.get(0).topActivity;
            return name.getPackageName().equals(getPackageName());
        }

        return true;
    }

    @Override
    public void onDeletedMessages() {
        super.onDeletedMessages();
    }

    @Override
    public void onNewToken(String s) {
        super.onNewToken(s);
        Log.d("getToken", s);
    }

}