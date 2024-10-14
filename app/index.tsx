import { DemoAuthManager } from "@/utils/AuthManager";
import { PlayerView, ResolvableSource, VesperSdk, VesperSdkConfig } from "@dicetechnology/react-native-vesper-sdk";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, View, TextInput, Switch, Text } from "react-native";

import { NativeModules } from 'react-native';

console.log('Modules:', Object.keys(NativeModules));

const authManager = new DemoAuthManager();

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    authManager.login(
      process.env.EXPO_PUBLIC_USERNAME!,
      process.env.EXPO_PUBLIC_PASSWORD!
    ).then(() => {
      setIsLoggedIn(true);
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
              apiKey: process.env.EXPO_PUBLIC_API_KEY!,
              environment: process.env.EXPO_PUBLIC_ENV!,
              realm: process.env.EXPO_PUBLIC_REALM!
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

function Player() {
  const playerRef = useRef<PlayerView>(null);
  const [isLive, setIsLive] = useState(false);
  const toggleSwitch = () => setIsLive(previousState => !previousState);
  const [videoId, setVideoId] = useState('');

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder="Video id"
        value={videoId}
        onChangeText={text => setVideoId(text)}
      />
      <View style={{ height: 20 }} />
      <View style={styles.row}>
        <Text>{isLive ? "Live  " : "VOD  "}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isLive ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isLive}
        />
      </View>
      <Button
        title="Load"
        onPress={() => {
          const source: ResolvableSource = { id: videoId, isLive: isLive };
          console.info('Loading:', source);
          playerRef.current?.load(source);
        }}
      />
      <PlayerView
        ref={playerRef}
        style={styles.videoBox}
        onPlayerViewEvent={(e) => { console.info((`PlayerViewEvent: ${JSON.stringify(e)}`)); }}
      />
      <View style={{ height: 20 }} />
      <View style={styles.buttonContainer}>
        <Button
          title="Play"
          onPress={() => {
            playerRef.current?.play();
          }}
        />
        <View style={styles.optionButton} />
        <Button
          title="Pause"
          onPress={() => {
            playerRef.current?.pause();
          }}
        />
        <View style={styles.optionButton} />
        <Button
          title="Unload"
          onPress={() => {
            playerRef.current?.unload();
          }}
        />
        <View style={styles.optionButton} />
        <Button
          title="Seek"
          onPress={() => {
            playerRef.current?.seekToPosition(100);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoBox: {
    width: 320,
    height: 180,
    marginVertical: 20,
    backgroundColor: 'black'
  },
  optionButton: {
    marginLeft: 6,
    marginRight: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row', // Aligns items horizontally
    alignItems: 'center', // Vertically aligns the toggle and label in the center
    justifyContent: 'space-between', // Distributes space between label and switch
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10, // Adds space between label and switch
  },
});
