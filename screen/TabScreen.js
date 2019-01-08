import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab, Left, Body, Right, Title, Footer, FooterTab } from 'native-base';
import {
    AntDesign,
    MaterialIcons,
    FontAwesome,
} from '@expo/vector-icons';
import { connect } from 'react-redux';
import Button from 'react-native-button'
import { PermissionsAndroid } from 'react-native';
import NormalComponent from '../containers/NormalComponent';
import PopularityComponent from '../containers/PopularityComponent';
import LocationComponent from '../containers/LocationComponent';
import { dispatchMapSuccess, dispatchDataSuccess, dispatchNextDataSuccess } from '../ducks/tabScreen';

class TabScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '홈',
        tabBarIcon: ({ tintColor }) => (
            <AntDesign name='home' size={25} color={tintColor}/>
        )
    }

    componentDidMount() {
        this.props.onMount();
    }

//     _requestCameraPermission = async () => {
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//                 'title': '위치 정보 동의',
//                 'message': '위치 정보 동의합니까?'
//             }
//         )
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log("위치정보 동의")
//             let location = await Location.getCurrentPositionAsync({});
//             this.setState({
//                 location,
//                 latitude: location.coords.latitude,
//                 longitude: Math.abs(location.coords.longitude),
//                 loading: false
//             })
//             console.log('안들로이드', location)
//         } else {
//             console.log("위치정보 거절")
//         }
//     } catch (err) {
//         console.warn(err)
//     }
// }

    // state = {
    //     mapRegion: null,
    //     hasLocationPermissions: false,
    //     locationResult: null
    // };

    // componentDidMount() {
    //     this._getLocationAsync();
    // }

    // _getLocationAsync = async () => {
    //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //     if (status !== 'granted') {
    //         this.setState({
    //             locationResult: 'Permission to access location was denied',
    //         });
    //     } else {
    //         this.setState({ hasLocationPermissions: true });
    //     }

    //     let location = await Location.getCurrentPositionAsync({});
    //     this.setState({ locationResult: JSON.stringify(location) });

    //     // Center the map on the location we just fetched.
    //     this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: Math.abs(location.coords.longitude)} });
    //     this.props.onMapRegion(this.state.mapRegion)
    // };

    render() {
        const { ...rest } = this.props;
        const {token} = this.props.navigation.state.params
        const location = ({latitude:this.props.latitude , longitude:this.props.longitude, token:token})
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => this.props.navigation.navigate('Writing', location)}>
                            <AntDesign name='form' size={30} color={(Platform.OS === 'ios') ? '#000' : '#fff'}/>
                        </Button>
                    </Right>
                </Header>
                <Tabs renderTabBar={() => <ScrollableTab />}>
                    <Tab heading='지금'>
                        <NormalComponent {...rest} token={token} />
                    </Tab>
                    <Tab heading='인기'>
                        <PopularityComponent {...rest} token={token} />
                    </Tab>
                    <Tab heading='주변'>
                        <LocationComponent {...rest} token={token} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default connect(
    // mapStateToProps
    state => ({
        latitude: state.tabScreen.latitude,
        longitude: state.tabScreen.longitude,
        normal: state.tabScreen.normal,
        normalNext: state.tabScreen.normalNext,
        popularity: state.tabScreen.popularity,
        popularityNext: state.tabScreen.popularityNext,
        location: state.tabScreen.location,
        locationNext: state.tabScreen.locationNext,
    }),
    // mapDispatchToProps
    dispatch => ({
        onMount: () => {
            dispatch(dispatchMapSuccess());
        },
        onData: (num) => {
            dispatch(dispatchDataSuccess(num));
        },
        onData2: (num) => {
            dispatch(dispatchNextDataSuccess(num));
        },
    }),
)(TabScreen);