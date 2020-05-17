package com.ezsms;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.google.firebase.messaging.RemoteMessage;
import javax.annotation.Nullable;

public class FirebaseCloudMessagingHeadlessService extends HeadlessJsTaskService {
    private static final String TAG = FirebaseCloudMessagingHeadlessService.class.getSimpleName();

    @Nullable
    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Log.d(TAG, "Fired HeadlessJSTask");
        Bundle extras = intent.getExtras();
        if (extras != null) {
            RemoteMessage message = intent.getParcelableExtra("message");
            WritableMap map = MessagingSerializer.parseRemoteMessage(message);
            return new HeadlessJsTaskConfig("RemoteMessage", map, 60000, false);
        }
        return null;
    }
}