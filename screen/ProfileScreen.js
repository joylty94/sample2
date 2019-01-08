import React, { Component } from 'react';
import { View } from 'react-native';
import {
    Container, Header, Left, Body, Right, Button, Title,
    Content, Footer, FooterTab, Text, Tabs, Tab, ScrollableTab
} from 'native-base';
import {
    AntDesign,
    MaterialIcons,
    FontAwesome,
} from '@expo/vector-icons';

export default class ProfileScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '활동',
        tabBarIcon: ({ tintColor }) => (
            <AntDesign name='user' size={25} color={tintColor} />
        )
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Title>프로필</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>
                    <View style={{alignItems:'center', paddingVertical:5}}>
                        <View style={{width:60, height:60, borderRadius:30, backgroundColor:'blue'}}></View>
                        <View>
                            <Text>이태용</Text>
                            <Text note>즐겨찾기 핀(PIN) 1,234</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Button rounded light style={{paddingHorizontal:20, marginRight:20}}>
                                <Text>활동 분석</Text>
                            </Button>
                            <Button rounded light style={{ paddingHorizontal: 20 }}>
                                <Text>즐겨찾기 핀</Text>
                            </Button>
                        </View>
                    </View>
                    <Tabs renderTabBar={() => <ScrollableTab />}>
                        <Tab heading="핀글">
                            <View></View>
                        </Tab>
                        <Tab heading="댓글">
                            <View></View>
                        </Tab>
                        <Tab heading="공감">
                            <View></View>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}