import React, { Component } from 'react';
import {
    Container, Header, Left, Body, Right, Button, Title,
    Content, Footer, FooterTab, Text
} from 'native-base';
import {
    AntDesign, 
    MaterialIcons,
    FontAwesome,
} from '@expo/vector-icons';

export default class AlarmScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '알람',
        tabBarIcon: ({ tintColor }) => (
            <MaterialIcons name='alarm' size={25} color={tintColor} />
        )
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Title>알람</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content></Content>
            </Container>
        )
    }
}