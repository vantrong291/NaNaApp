/** @format */

import {AppRegistry, YellowBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import bgMessaging from './src/bgMessaging';
import TrackPlayer from 'react-native-track-player';

YellowBox.ignoreWarnings(['ListView is deprecated', 'Accessing view']);
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
TrackPlayer.registerPlaybackService(() => require('./service'));
