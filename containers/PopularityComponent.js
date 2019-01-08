import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import Spacer from '../components/Spacer';

import PopularityAnimatedComponent from "../components/PopularityAnimatedComponent";

export default class PopularityComponent extends Component {
    componentDidMount() {
        this.props.onData(2)
    }

    _refresh = () => {
        this.props.onData(2)
    }

    render() {
        const { ...rest } = this.props;
        if (!this.props.popularity) {
            return <ActivityIndicator />
        }
        return (
            <ScrollView
                style={styles.container}
                onScroll={event => {
                    const ratio = event.nativeEvent.contentOffset.y / event.nativeEvent.contentSize.height;
                    console.log('ratio', ratio)
                    if (ratio < 0) {
                        this._refresh()
                    }
                    if (ratio > 0.3) {
                        this.props.onData2(2);
                    }
                }}>
                <Spacer height={8} />
                    <FlatList
                        data={this.props.popularity}
                        // extraData={this.state.page}
                        // onEndReached={this.handleEnd}
                        // onEndReachedThreshold={0.5}
                        ListFooterComponent={() =>
                            this.state.loading
                                ? <ActivityIndicator animating />
                                : null}
                        renderItem={({ item, index }) => {
                            return (
                                <PopularityAnimatedComponent item={item} {...rest} />
                            )
                        }}
                        keyExtractor={(item, index) => item.category + `${index}`}>
                    </FlatList>
                <Spacer height={80} />
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

