import React, { Component } from 'react';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title,
    Item, Input, Text, Footer, FooterTab, Content, CardItem, Card
} from 'native-base';
import { View } from 'react-native';
import {
    AntDesign,
    FontAwesome,
    MaterialIcons
} from '@expo/vector-icons';

export default class SearchScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '탐색',
        tabBarIcon: ({ tintColor }) => (
            <AntDesign name='search1' size={25} color={tintColor} />
        )
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Title>탐색</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <AntDesign name='search1' size={30} />
                        </Button>
                    </Right>
                </Header>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-people" />
                    </Item>
                    {/* <Button transparent>
                        <Text>Search</Text>
                    </Button> */}
                </View>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'blue' }}></View>
                                <Body>
                                    <Text>오피스</Text>
                                    <Text note>서울</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}