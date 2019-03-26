import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import store from '../store/index';

// function counter(state, action) {
//     if (typeof state === 'undefined') {
//         return 0;
//     }

//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1;
//         case 'DECREMENT':
//             return state - 1;
//         default:
//             return state;
//     }
// }

// let store = createStore(combineReducers({ count: counter }));

class Counter extends React.Component {
    static navigationOptions = {
        title: 'Counter!',
    };

    render() {
        // {console.log(this.props)}
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>{this.props.count}</Text>
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Increment"
                        onPress={this.props.handleIncrement.bind(this,this.props.count)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Decrement"
                        onPress={this.props.handleDecrement.bind(this,this.props.count)}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Go to static count screen"
                        onPress={() => this.props.navigation.navigate('StaticCounter')}
                    />
                </View>
            </View>
        );
    }
}

// Another screen!
class StaticCounter extends React.Component {
    static navigationOptions = {
        title: `Same number, wow!`,
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>{this.props.count}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.TODOReducer.count,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleIncrement(count){
            var action = {
                type:'INCREMENT',
                value:count + 1
            }
            console.log(action)
            store.dispatch(action);
        },
        handleDecrement(count){
            var action = {
                type:'DECREMENT',
                value:count - 1
            }
            store.dispatch(action);
        }
    }
}

// 把store融入路由
let CounterContainer = connect(mapStateToProps,mapDispatchToProps)(Counter);
let StaticCounterContainer = connect(mapStateToProps,mapDispatchToProps)(StaticCounter);


let RootStack = createStackNavigator({
    Counter: CounterContainer,
    StaticCounter: StaticCounterContainer,
});
let Navigation = createAppContainer(RootStack);
export default class Redux extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
