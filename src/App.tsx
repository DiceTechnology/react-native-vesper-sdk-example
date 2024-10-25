import React, { useEffect, useState } from 'react';
import {
  Button,
  View
} from 'react-native';
import { authManager } from './utils/DemoAuthManager';
import { VesperSdk, VesperSdkConfig } from '@dicetechnology/react-native-vesper-sdk';
import { Player } from './components/Player';
import { CONFIG } from './constants/CONFIG';

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const requiredKeys: (keyof typeof CONFIG)[] = ['API_KEY', 'REALM'];
    const missingKeys = requiredKeys.filter((key) => !CONFIG[key])
    if (missingKeys.length) {
      console.error(`Make sure to configure the following keys in './src/constants/CONFIG.ts': ${missingKeys.join(', ')}`);
      return;
    }

    const { USERNAME, PASSWORD } = CONFIG;
    const loginPromise = USERNAME && PASSWORD
      ? authManager.login(USERNAME, PASSWORD)
      : authManager.guestCheckin();

    loginPromise.then(() => {
      setIsLoggedIn(true);
    }, (error) => {
      console.error(error.message);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Configure Vesper SDK"
        onPress={() => {
          const config: VesperSdkConfig = {
            apiConfig: {
              apiKey: CONFIG.API_KEY,
              environment: CONFIG.ENV,
              realm: CONFIG.REALM
            },
            authManager
          };
          console.log('Configuring Vesper SDK:', { apiConfig: config.apiConfig });
          VesperSdk.setup(config);
          setIsConfigured(true)
        }} />
      {isLoggedIn && isConfigured ? <Player /> : null}
    </View>
  );
}

export default App;
