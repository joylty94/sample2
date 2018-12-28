import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, Platform } from 'react-native';
import axios from 'axios';
import { Constants, Location, Permissions } from 'expo';

import NoteListAnimatedComponent from "../components/NoteListAnimatedComponent";

export default class LocationComponent extends Component {
    state = {
        data: null,
        errorMessage: null,
        page: 5,
        loading: false,
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
        await axios.get(`http://35.243.89.78:8082/v1/posts?limit=5&order=desc&latlng=${this.props.latitude},${this.props.longitude}`).then(response => {
            this.setState({ data: response, loading: false })
        }).catch(e => {
            console.log(e)
        });
    };

    handleEnd = () => {
        this.setState({
            page: this.state.page + 5
        })
        this.fetchData()
    }

    render() {
        console.log('333', this.state.page)
        console.log('loading3', this.state.loading)
        const { ...rest } = this.props;
        if (this.state.data) {
            console.log('asdfe', this.state.data.data.result_data)
            return (
                <ScrollView style={styles.container}>
                    <FlatList
                        data={this.state.data.data.result_data.posts}
                        extraData={this.state.page}
                        // onEndReached={this.handleEnd}
                        // onEndReachedThreshold={0.5}
                        ListFooterComponent={() =>
                            this.state.loading
                                ? <ActivityIndicator animating />
                                : null}
                        renderItem={({ item, index }) => {
                            return (
                                <NoteListAnimatedComponent item={item} {...rest} />
                            )
                        }}
                        keyExtractor={(item, index) => item.category + `${index}`}>
                    </FlatList>
                </ScrollView>
            )
        }
        return <ActivityIndicator />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(241,243,245)"
    },
})

