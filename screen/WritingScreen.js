import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text, KeyboardAvoidingView, Switch } from 'react-native';
import Button from 'react-native-button';
import { MaterialIcons, EvilIcons, AntDesign } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';

export default class WebviewScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '글',
            // headerRight:(<Button onPress={() => this.fetchInput()}>완료</Button>)
        };
    }

    state = {
        text: null,
        anonymous: false
    }

    fetchInput = async () => {
        let location = this.props.navigation.state.params;
        console.log('token', location.token)
        console.log('latitude', location.latitude)
        console.log('location', location.longitude)
        await axios.post('http://35.243.89.78:8082/v1/post', {
            content: this.state.text,
            topic: "test111",
            tags: ["stest", "ok_tags"],
            latitude: location.latitude,
            longitude: location.longitude,
            is_anonymous: this.state.anonymous,
            hash: "wyd8s31gme0"
        },
        {
            headers: {
                'content-type': 'application/json', 
                'x-access-token': location.token },
        })
        .then(response => {
            console.log('성공', response)
        })
        .catch(e => { console.log('에러', e) });
    }
    render() {
        console.log('익명', this.state.anonymous)
        return (
            <KeyboardAvoidingView style={{flex:1}}>
                <TouchableOpacity
                    style={{ flex: 1, paddingVertical: 5, paddingHorizontal: 5 }}
                    onPress={() => this.refs.writing.focus()}>
                    <TextInput
                        ref={"writing"}
                        placeholder="질문을 입력하세요"
                        placeholderTextColor="rgb(134,142,150)"
                        underlineColorAndroid="#fff"
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({
                            text
                        })}
                    />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    {/* <View>
                        <Button><EvilIcons name='camera' size={35} color='rgb(134,142,150)' style={{ paddingTop: 3}} /></Button>
                    </View> */}
                    <View>
                        <Switch
                            value={this.state.anonymous}
                            onValueChange={() => this.setState((state, props) => {
                                return { anonymous: !state.anonymous };
                            })}
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                    </View>
                    {/* <View>
                        <ModalDropdown 
                            style={{ width: 80, paddingVertical: 3, paddingHorizontal: 5, borderWidth: 1, borderColor: 'rgb(134,142,150)'}} 
                            options={['공개', '비공개']}
                            defaultValue='사용자 설정'
                            dropdownStyle={{ width: 80, height: 62, marginLeft: -6, marginTop: -4, borderWidth: 1, borderColor:'rgb(134,142,150)'}}
                            // dropdownTextHighlightStyle={{height:10}} 
                            />
                    </View> */}
                    <Button onPress={() => this.fetchInput()}>완료</Button>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: 'rgb(134,142,150)',
        paddingHorizontal:5,
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // bottom: 0,
        // height: 40,
    }
})
