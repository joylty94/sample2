import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, Platform } from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import Button from 'react-native-button';
import Spacer from '../components/Spacer';

import LocationAnimatedComponent from "../components/LocationAnimatedComponent";

export default class LocationComponent extends Component {
    state = {
        data: null,
        errorMessage: null,
        page: 5,
        loading: false,
    };

    componentDidMount() {
        setTimeout(() => {
            this.props.onData(3);
        }, 2000);
    }

    _refresh = () => {
        this.props.onData(3)
    }

    handleRefresh = () => {
        console.log('실행되라')
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
                this.props.onData(3)
            }, 2000)
        });
    }
    render() {
        const { ...rest } = this.props;
        if (!this.props.location) {
            return <ActivityIndicator />
        }
        // return (
        //     <ScrollView
        //         style={styles.container}
        //         onScroll={event => {
        //             const ratio = event.nativeEvent.contentOffset.y / event.nativeEvent.contentSize.height;
        //             console.log('ratio', ratio)
        //             if (ratio < 0) {
        //                 this._refresh()
        //             }
        //             if (ratio > 0.3) {
        //                 this.props.onData2(3);
        //             }
        //         }}>
        //             <Spacer height={8} />
        //             <FlatList
        //                 data={this.props.location}
        //                 extraData={this.props.location}
        //                 // onEndReached={this.handleEnd}
        //                 // onEndReachedThreshold={0.5}
        //                 ListFooterComponent={() =>
        //                     this.state.loading
        //                         ? <ActivityIndicator animating />
        //                         : null}
        //                 renderItem={({ item, index }) => {
        //                     return (
        //                         <LocationAnimatedComponent item={item} {...rest} />
        //                     )
        //                 }}
        //                 keyExtractor={(item, index) => item.category + `${index}`}>
        //             </FlatList>
        //             <Spacer height={80} />
        //     </ScrollView>
        // )
        return (
            <PTRView onRefresh={this.handleRefresh}
                style={styles.container}
            >
                {/* <Spacer height={8} /> */}
                <FlatList
                    refreshing={true}
                    // onEndReachedThreshold={3}
                    // onEndReached={() => this.handle()}
                    data={this.props.location}
                    extraData={this.props.location}
                    renderItem={({ item, index }) => {
                        return (
                            <LocationAnimatedComponent item={item} {...rest} />
                        )
                    }}
                    keyExtractor={(item, index) => item.category + `${index}`}>
                </FlatList>
                {
                    (this.props.loading)
                        ?
                        <ActivityIndicator animating />
                        :
                        <Button style={{ padding: 3 }}
                            onPress={() => this.props.onData2(3)}>
                            더보기
                        </Button>
                }
            </PTRView>
        );       
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "rgb(241,243,245)"
    },
})

