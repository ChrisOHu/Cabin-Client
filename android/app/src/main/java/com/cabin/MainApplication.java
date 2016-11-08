package com.cabin;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.burlap.filetransfer.FileTransferPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.microsoft.codepush.react.CodePush;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new RNSpinkitPackage(),
           new MainReactPackage(),
            new FileTransferPackage(),
            new PickerPackage(),
            new MapsPackage(),
            new CodePush("_xhxqrft6XsFcbkeYOoH-U5Us-_wN1cJKQhAb", getApplicationContext(), BuildConfig.DEBUG),
            new PickerPackage(),
            new SplashScreenReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
