import React, { Component } from 'react';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title,
    Tab, Tabs, ScrollableTab, Footer, FooterTab, Text
} from 'native-base';
import { Platform, StyleSheet, View } from 'react-native';
import {
    Feather,
    AntDesign,
    MaterialIcons,
    FontAwesome,
} from '@expo/vector-icons';
import axios from 'axios';
import { Constants, Location, Permissions } from 'expo';
import NormalComponent from '../containers/NormalComponent';
import PopularityComponent from '../containers/PopularityComponent';
import LocationComponent from '../containers/LocationComponent';

export default class TabScreen extends Component {
    state = {
        errorMessage: null,
        loading: false,
        location: null,
        latitude: null,
        longitude: null,
    };

    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        this.setState({ loading: true })
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            location,
            latitude: location.coords.latitude,
            longitude: Math.abs(location.coords.longitude),
            loading: false
        })
    };
    render() {
        const { ...rest } = this.props;
        return (
            <Container>
                <Header style={{paddingTop:30}}>
                    <Left>
                    </Left>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <AntDesign name='form' size="30" />
                        </Button>
                    </Right>
                </Header>
                <Tabs renderTabBar={() => <ScrollableTab />}>
                    <Tab heading="지금">
                        <NormalComponent { ...rest}/>
                    </Tab>
                    <Tab heading="인기">
                        <PopularityComponent {...rest}/>
                    </Tab>
                    <Tab heading="근처">
                        <LocationComponent {...rest} latitude={this.state.latitude} longitude={this.state.longitude} />
                    </Tab>
                </Tabs>
                <Footer>
                    <FooterTab>
                        <Button badge vertical active>
                            <AntDesign name="home" size="25" />
                            <Text>홈</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Search')}>
                            <FontAwesome name="compass" size="25" />
                            <Text>탐색</Text>
                        </Button>
                        <Button badge vertical onPress={() => this.props.navigation.navigate('Alarm')}>
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