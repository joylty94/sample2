import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, Platform } from 'react-native';
import axios from 'axios';

import LocationAnimatedComponent from "../components/LocationAnimatedComponent";

export default class LocationComponent extends Component {
    state = {
        data: null,
        errorMessage: null,
        page: 5,
        loading: false,
    };

    componentDidMount() {
        this.props.onData(3);
    }

    handleEnd = () => {
        // this.setState({
        //     page: this.state.page + 5
        // })
        // this.fetchData()
    }

    render() {
        const { ...rest } = this.props;
        if (!this.props.location) {
            return <ActivityIndicator />
        }
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.props.location}
                    extraData={this.props.location}
                    // onEndReached={this.handleEnd}
                    // onEndReachedThreshold={0.5}
                    ListFooterComponent={() =>
                        this.state.loading
                            ? <ActivityIndicator animating />
                            : null}
                    renderItem={({ item, index }) => {
                        return (
                            <LocationAnimatedComponent item={item} {...rest} />
                        )
                    }}
                    keyExtractor={(item, index) => item.category + `${index}`}>
                </FlatList>
            </ScrollView>
        )       
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(241,243,245)"
    },
})

