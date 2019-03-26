import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
import { Font } from 'expo';
import { Button,Provider,Modal } from '@ant-design/react-native';
import Movie from './movieDemo';

// antDesign - RN
export default class Ant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isReady: false,
            flag:false,
        };
    }
    async componentDidMount() {
        await Font.loadAsync(
            'antoutline',
            require('@ant-design/icons-react-native/fonts/antoutline.ttf')
        );
        await Font.loadAsync(
            'antfill',
            require('@ant-design/icons-react-native/fonts/antfill.ttf')
        );
        this.setState({ isReady: true });
    }
    render() {
        const { isReady } = this.state;
        if (isReady) {
            return (
                <Provider>
                <View>
                    <Button type="primary"
                        onPress={() => this.setState({flag:true})}
                    >Click Me!
                    </Button>
                    <Modal
                        title="Title" transparent maskClosable
                        onClose={() => this.setState({flag: false})}
                        visible={this.state.flag}
                        footer={[
                            { text: 'Cancel', onPress: () => console.log('cancel') },
                            { text: 'Ok', onPress: () => console.log('ok') },
                        ]}
                    >
                        <View style={{ paddingVertical: 20 }}>
                            <Text style={{ textAlign: 'center' }}>Modal</Text>
                        </View>
                    </Modal>
                    <Movie />
                </View>
                </Provider>
            );
        }else{
            return (
                <View style={styles.container}>
                    <Text>请先加载字体</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
