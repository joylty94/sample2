import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Right, Button, Body,
    Title, Text } from 'native-base';
import {
    Feather,
    AntDesign, MaterialIcons
} from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
export default class LoginScreen extends Component {
    render() {
        return (
            <Container style={{marginTop:35, paddingBottom:40, flex:1, alignItems:'center', justifyContent:'space-between',}}>
                <View style={{width:200, height:200, backgroundColor: 'blue'}}><Text>로고</Text></View>
                <View style={{width:'95%'}}>
                    <View style={styles.buttonContainer}>
                        <Button block danger style={{ marginBottom: 10 }} onPress={() => this.props.navigation.navigate('Information')}>
                            <Text>회원가입</Text>
                        </Button>
                        <Button block style={{ marginBottom: 10 }}>
                            <Text>Primary</Text>
                        </Button>
                        <Button block danger style={{ marginBottom: 10 }}>
                            <Text>Danger</Text>
                        </Button>
                        <Button block style={{ marginBottom: 20 }}>
                            <Text>Primary</Text>
                        </Button>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ marginBottom: 10, fontWeight: '900' }}>로그인 건너뛰기</Text>
                        <Text style={{ marginBottom: 10 }}>비회원인 경우 이용에 제한이 있을 수 있습니다.</Text>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer:{
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: 'rgb(33, 37, 41)',
    },
    textContainer: {
        alignItems: 'center'
    },
})