import React, { Component } from 'react';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title,
    Tab, Tabs, ScrollableTab, Footer, FooterTab, Text
} from 'native-base';
import { Platform, StyleSheet } from 'react-native';
import {
    Feather,
    AntDesign,
    MaterialIcons,
    FontAwesome,
} from '@expo/vector-icons';
import axios from 'axios';
import { Constants, Location, Permissions } from 'expo';
import NormalComponent from '../containers/NormalComponent';
import PopularityScreen from '../containers/PopularityScreen';

export default class TabScreen extends Component {
    state = {
        location: null,
        errorMessage: null,
        latitude: null,
        longitude: null,
    };

    // componentWillMount() {
    //     if (Platform.OS === 'android' && !Constants.isDevice) {
    //         this.setState({
    //             errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    //         });
    //     } else {
    //         this._getLocationAsync();
    //     }
    // }

    // _getLocationAsync = async () => {
    //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //     if (status !== 'granted') {
    //         this.setState({
    //             errorMessage: 'Permission to access location was denied',
    //         });
    //     }

    //     let location = await Location.getCurrentPositionAsync({});
    //     this.setState({ location });
    //     this.setState({ latitude: location.coords.latitude,
    //         longitude: Math.abs(location.coords.longitude)
    //         })
    //     await axios.get(`http://172.30.1.36:8082/v1/location?latlng=${this.state.latitude},${this.state.longitude}`).then(response => {
    //         console.log("정보", response)
    //     });
    // };

    render() {
        // let text = 'Waiting..';
        // if (this.state.errorMessage) {
        //     text = this.state.errorMessage;
        // } else if (this.state.location) {
        //     text = JSON.stringify(this.state.location);
        // }
        const { ...rest } = this.props;
        // console.log("위치정보1",this.state.location)
        // console.log("위도", this.state.latitude)
        // console.log("경도", this.state.longitude)
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
                        <PopularityScreen {...rest}/>
                    </Tab>
                    <Tab heading="근처">
                        <NormalComponent {...rest}/>
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

// const styles = StyleSheet.create({
//     headerContainer :{
//         height: Platform.OS === 'android' ? 76 : 100,
//         marginTop: Platform.OS === 'ios' ? 0 : 24,
//     }
// })