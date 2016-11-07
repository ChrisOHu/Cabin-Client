package com.cabin;

import com.facebook.react.ReactActivity;
import com.cmcewen.blurview.BlurViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.rnfs.RNFSPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnative.imagepicker.PickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.burlap.filetransfer.FileTransferPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "cabin";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new BlurViewPackage(),
            new OrientationPackage(this),
            new RNSpinkitPackage(),
            new RNFSPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new FileTransferPackage(),
            new ReactNativePushNotificationPackage(this),
            new CodePush(null, this, BuildConfig.DEBUG)
        );
    }
}
