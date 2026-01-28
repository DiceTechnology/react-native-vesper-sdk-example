import React, { useEffect, useState } from 'react';
import { NativeModules, Platform, Text, View } from 'react-native';

import { Player } from '@/components/Player';
import { CONFIG } from '@/constants/CONFIG';
import { authManager } from '@/utils/DemoAuthManager';
import { VesperSdk, type VesperSdkConfig } from '@dicetechnology/react-native-vesper-sdk';

export default function HomeScreen() {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const requiredKeys: (keyof typeof CONFIG)[] = ['API_KEY', 'REALM'];
    const missingKeys = requiredKeys.filter(key => !CONFIG[key]);
    if (missingKeys.length) {
      console.error(
        `Make sure to configure the following keys in 'constants/CONFIG.ts': ${missingKeys.join(', ')}`
      );
      return;
    }

    const { USERNAME, PASSWORD } = CONFIG;
    const loginPromise =
      USERNAME && PASSWORD ? authManager.login(USERNAME, PASSWORD) : authManager.guestCheckin();

    loginPromise.then(
      () => {
        if (Platform.OS === 'web') {
          console.warn('Vesper SDK is not supported on web; skipping setup.');
          return;
        }

        const { RNVesperSDK } = NativeModules as { RNVesperSDK?: object };
        if (!RNVesperSDK) {
          console.error(
            'Vesper native module (RNVesperSDK) is not available. ' +
              'Make sure you have built a dev client (expo run:ios / expo run:android) after installing @dicetechnology/react-native-vesper-sdk.'
          );
          return;
        }

        const config: VesperSdkConfig = {
          apiConfig: {
            apiKey: CONFIG.API_KEY,
            environment: CONFIG.ENV,
            realm: CONFIG.REALM,
          },
          authManager,
        };
        console.log('Configuring Vesper SDK:', { apiConfig: config.apiConfig });
        VesperSdk.setup(config);
        setIsConfigured(true);
      },
      error => {
        console.error(error.message);
      }
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isConfigured ? <Player /> : <Text>Logging in...</Text>}
    </View>
  );
}
