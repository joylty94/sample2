import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import Button from 'react-native-button';
import { MaterialIcons, EvilIcons, AntDesign } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Picker, Icon } from 'native-base';

export default class WebviewScreen extends Component {
    state = {
        text: null,
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{ height: 60, paddingTop:30, paddingHorizontal:5, borderBottomWidth:1, flexDirection: 'row', justifyContent:'space-between'}}>
                    <Button><MaterialIcons name='close' size={25} /></Button>
                    <View></View>
                    <Button>완료</Button>
                </View>
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
                <View style={{flexDirection:'row', borderTopWidth:1, borderBottomWidth:1}}>
                    <View>
                        <Button><EvilIcons name='camera' size={25} /></Button>
                    </View>
                </View>
            </View>
        );
    }
}
