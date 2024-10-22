import React, { useEffect, useState } from 'react';
import {
  Button,
  View
} from 'react-native';
import { authManager } from './utils/DemoAuthManager';
import { Environment, VesperSdk, VesperSdkConfig } from '@dicetechnology/react-native-vesper-sdk';
import { Player } from './components/Player';
import Config from 'react-native-config';

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const requiredKeys: (keyof typeof Config)[] = [
      'PUBLIC_API_KEY', 'PUBLIC_ENV', 'PUBLIC_PASSWORD', 'PUBLIC_REALM', 'PUBLIC_USERNAME'
    ]
    const missingKeys = requiredKeys.filter((key) => !Config[key])
    if (missingKeys.length) {
      console.error(`Make sure to configure the following keys in '.env.local': ${missingKeys.join(', ')}`);
      return;
    }

    authManager.login(
      Config.PUBLIC_USERNAME,
      Config.PUBLIC_PASSWORD
    ).then(() => {
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
              apiKey: Config.PUBLIC_API_KEY,
              environment: Config.PUBLIC_ENV as Environment,
              realm: Config.PUBLIC_REALM
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
