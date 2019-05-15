package com.bjssx.zl01;

import com.facebook.react.ReactActivity;
import android.os.Bundle;//here
import org.devio.rn.splashscreen.SplashScreen;//here
import android.util.Log;
import com.facebook.react.*;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

import java.lang.Override;
import cn.jpush.android.api.JPushInterface;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "baoxiu";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
        JPushInterface.init(this);
    }
    // ...other code
    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
