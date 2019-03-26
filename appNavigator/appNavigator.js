import React from 'react';
import {
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation'
import { StyleSheet, Text, View, Button, BackHandler } from 'react-native';
import AuthScreen from './authNavigator';
import AntScreen from './antDesign';
import ReduxScreen from './redux';

// 主页面
class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: 'white',  //文字颜色
            headerTitleStyle: {        //文字格式
                fontWeight: 'bold',
            },
            // headerTitle: <LogoTitle />,  //自定义title组件
            headerRight: (
                <View style={styles.container2}>
                    <Button
                        onPress={() => navigation.navigate('MyModal')}
                        title="Modal" color="#895475"
                    />
                    <Button
                        onPress={navigation.getParam('increaseCount')}
                        title="+1" color="black"
                    />
                </View>
            ),
        }
    }
    constructor(props) {
        super(props);
        this._didFocusSubscription;
        this._willBlurSubscription;
        this.state = {
            count: 0,
        }
        // 监听物理返回键
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        )
    }
    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this.increaseCount });
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }
    onBackButtonPressAndroid = () => {
        if (this.state.count === 0) {
            return true;
        } else {
            return false;
        }
    };
    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }
    // 代理header按钮的方法，header按钮无法直接调用this
    increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>{this.state.count}</Text>
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="跳转"
                        onPress={() => navigate('Chat', {
                            title: '参数标题',
                            param: '首页携带的参数啊啊啊',
                        })}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="切换tab"
                        onPress={() => navigate('Auth')}
                    />
                </View>
            </View>
        )
    }
}

// 页面堆栈
class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', '默认标题'),  //第二个值是默认值
        };
    };
    render() {
        const { navigate, push, goBack } = this.props.navigation;

        // 获取携带参数
        const param = this.props.navigation.getParam('param');
        return (
            <View style={styles.container}>
                {
                    JSON.stringify(param) ?
                        <Text>param:{JSON.stringify(param)}</Text> : null
                }
                {/* 直接追溯名字,无视路由嵌套 */}
                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={() => navigate('Home')}
                        title="返回首页"
                    />
                </View>
                {/* 开一个新路由 */}
                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={() => push('Chat')}
                        title="开启嵌套路由"
                    />
                </View>
                {/* 返回上一个路由 */}
                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={() => goBack()}
                        title="后退一个路由"
                    />
                </View>
                {/* 更新标题 */}
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="更新标题"
                        onPress={() => this.props.navigation.setParams({ title: '更新了哦' })}
                    />
                </View>
            </View>
        );
    }
}

// modal堆栈
class ModalScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
            </View>
        );
    }
}

// 普通导航器
const MainStack = createStackNavigator(
    {
        Home: HomeScreen,
        Chat: ChatScreen
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {        //全局导航样式
            headerStyle: {
                backgroundColor: '#236985',
            },
        },
    }
);

// 嵌套导航器
const RootStack = createStackNavigator(
    {
        Main: MainStack,
        MyModal: ModalScreen,
    },
    {
        mode: 'card',  //或者是modal
        headerMode: 'none',
    }
);

// 两种导航的融合
export default AppContainer = createAppContainer(
    createBottomTabNavigator(
        {
            Home: RootStack,
            Ant: AntScreen,
            Auth: AuthScreen,
            Redux: ReduxScreen
        }
    )
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
});
