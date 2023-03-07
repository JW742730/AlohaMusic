import * as SplashScreen from 'expo-splash-screen';
import React, { Component } from 'react';
//import { Audio } from 'expo';
import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from "expo-av";
import { Feather } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const alohaImage = require('./assets/ukulele.png');
const alohaSong = require("./assets/ukulele.mp3");

export default class App extends Component {
  
  state = {
    isPlaying: false,
    playbackInstance: null,
    volume: 1.0,
    isBuffering: false,
  }

  async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playThroughEarpieceAndroid: true,
      //interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interrutionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      //interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      interrutionModeAndroid: InterruptionModeAndroid.DoNotMix,
    });
    this.loadAudio();
  }

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
    this.setState({
      isPlaying: !isPlaying
    });
  }

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering
    });
  }

   async loadAudio() {
    const playbackInstance = new Audio.Sound();
    const source = alohaSong
		const status = {
			shouldPlay: this.state.isPlaying,
			volume: this.state.volume,
    };
    playbackInstance
      .setOnPlaybackStatusUpdate(
        this.onPlaybackStatusUpdate
      );
    await playbackInstance.loadAsync(source, status, false);
    this.setState({
      playbackInstance
    });
  }

render() {
  return (
    
    <View style={styles.container}>
      <Text style={styles.heading}>Aloha Music</Text>
      <Image source={alohaImage} style={styles.image}/>
      <TouchableOpacity
            style={styles.icons}
            onPress={this.handlePlayPause}
          >
            {this.state.isPlaying ?
              <Feather name="pause" size={32} color="#563822"/> :
              <Feather name="play" size={32} color="#563822"/>
            }
          </TouchableOpacity>
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    backgroundColor: "#da9547",
    width: 300,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 42
  },
  image: {
    width: 300,
    height: 500,
  },
  icons: {
    marginTop: 35
  }
});
