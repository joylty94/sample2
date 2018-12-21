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
                            <AntDesign name='search1' size="30" />
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
                <Footer>
                    <FooterTab>
                        <Button badge vertical onPress={() => {this.props.navigation.navigate('Home')}}>
                            <AntDesign name="home" size="25" />
                            <Text>홈</Text>
                        </Button>
                        <Button active vertical>
                            <FontAwesome name="compass" size="25" />
                            <Text>탐색</Text>
                        </Button>
                        <Button badge vertical onPress={() => { this.props.navigation.navigate('Alarm')}}>
                            <MaterialIcons active name="access-alarm" size="25" />
                            <Text>알람</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Profile')}>
                            <MaterialIcons name="person" size="25" />
                            <Text>프로필</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}