import React from 'react';
import { AppRegistry,View } from 'react-native';
import AppContainer from './appNavigator/appNavigator';

// 退出app保持退出前的状态，实验功能
const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;
class ActivityIndicator extends React.Component {
    render() {
        return <View></View>
    }
}
export default class App extends React.Component {
    render() {
        return <AppContainer 
            // persistenceKey={navigationPersistenceKey}
            // renderLoadingExperimental={() => <ActivityIndicator />}
        />
    }
}
AppRegistry.registerComponent('App', () => App);