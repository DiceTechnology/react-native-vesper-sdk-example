import React, { useEffect, useState } from 'react';
import {
  Button,
  View
} from 'react-native';
import { authManager } from './utils/DemoAuthManager';
import { Environment, VesperSdk, VesperSdkConfig } from '@dicetechnology/react-native-vesper-sdk';
import { Player } from './components/Player';

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const env = {
      'PUBLIC_USERNAME': process.env.PUBLIC_USERNAME,
      'PUBLIC_PASSWORD': process.env.PUBLIC_PASSWORD,
      'PUBLIC_REALM': process.env.PUBLIC_REALM,
      'PUBLIC_API_KEY': process.env.PUBLIC_API_KEY,
      'PUBLIC_ENV': process.env.PUBLIC_ENV,
    };
    const missingKeys = (Object.keys(env) as (keyof typeof env)[]).filter((key) =>  !env[key])
    if (missingKeys.length) {
      console.error(`Make sure to configure the following keys in '.env': ${missingKeys.join(', ')}`)
    } else {
      authManager.login(
        process.env.PUBLIC_USERNAME,
        process.env.PUBLIC_PASSWORD
      ).then(() => {
        setIsLoggedIn(true);
      });
    }
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
              apiKey: process.env.PUBLIC_API_KEY,
              environment: process.env.PUBLIC_ENV as Environment,
              realm: process.env.PUBLIC_REALM
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
