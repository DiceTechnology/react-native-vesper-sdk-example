import { PlayerView, ResolvableSource } from "@dicetechnology/react-native-vesper-sdk";
import type { PlayerViewEvent } from '@dicetechnology/react-native-vesper-sdk';
import { useRef, useState } from "react";
import { View, TextInput, Text, Switch, Button, StyleSheet } from "react-native";
import Orientation from 'react-native-orientation-locker';
import { CONFIG } from "../constants/CONFIG";

export function Player() {
    const playerRef = useRef<PlayerView>(null);
    const [isLive, setIsLive] = useState(false);
    const [isPipActive, setIsPipActive] = useState(false);
    const toggleSwitch = () => setIsLive(previousState => !previousState);
    const [videoId, setVideoId] = useState(CONFIG.VIDEO_ID);
    const [isFullscreen, setIsFullscreen] = useState(CONFIG.IS_LIVE);

    const handlePlayerViewEvent = (event: PlayerViewEvent) => {
        console.info(`PlayerViewEvent: ${JSON.stringify(event)}`);

        // Check if the event is a fullscreen button tap
        if (event.name === 'fullscreenButtonTap' && event.type === 'view' && event.data != null) {
            const eventData = JSON.parse(event.data);
            if (!eventData.isFullscreen) {
                setIsFullscreen(true);
                Orientation.lockToLandscapeLeft();
            } else {
                setIsFullscreen(false);
                Orientation.lockToPortrait();
            }
        } else if (event.name === 'enterPip') {
            setIsPipActive(true)
        } else if (event.name === 'exitPip'){
            setIsPipActive(false)
        }
    }

    return (
        <View style={isFullscreen ? styles.fullscreenContainer : styles.container}>
            {!isPipActive && 
                <View>
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
                </View>
            }
            <PlayerView
                ref={playerRef}
                style={isFullscreen ? styles.fullscreenVideoBox : styles.videoBox}
                onPlayerViewEvent={handlePlayerViewEvent}
                isFullscreen={isFullscreen}
            />
            {!isPipActive && 
                <View>
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
                                playerRef.current?.seekTo(100);
                            }}
                        />
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fullscreenContainer: {
        flex: 1,
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    videoBox: {
        width: 320,
        height: 180,
        marginVertical: 20,
        backgroundColor: 'black'
    },
    fullscreenVideoBox: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
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