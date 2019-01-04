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
                <Footer>
                    <FooterTab>
                        <Button badge vertical onPress={() => { this.props.navigation.navigate('Home') }}>
                            <AntDesign name="home" size={25} />
                            <Text>홈</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Search')}>
                            <FontAwesome name="compass" size={25} />
                            <Text>탐색</Text>
                        </Button>
                        <Button badge vertical active>
                            <MaterialIcons active name="access-alarm" size={25} />
                            <Text>알람</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Profile')}>
                            <MaterialIcons name="person" size={25} />
                            <Text>프로필</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}