import React, { Component } from "react";
import { StyleSheet, FlatList, ScrollView, Text, ActivityIndicator, SafeAreaView } from "react-native";
import PTRView from 'react-native-pull-to-refresh';
import Spacer from '../components/Spacer';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import NormalAnimatedComponent from "../components/NormalAnimatedComponent";

export default class NormalComponent extends Component {
    componentDidMount() {
        this.props.onData(1)
    }

    _refresh = () => {
        this.props.onData(1)
    }
    render() {
        let param = this.props.navigation.state.param
        if(param === 'back'){
            this.props.onData(1) 
        }
        const { ...rest } = this.props;
        if (!this.props.normal) {
            return <ActivityIndicator animating />
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
                            this.props.onData2(1);
                        }
                    }}>
                    <Spacer height={8} />
                    <FlatList
                        refreshing={true}
                        data={this.props.normal}
                        extraData={this.props.normal}
                        renderItem={({ item, index }) => {
                            return (
                                <NormalAnimatedComponent item={item} {...rest} />
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
        flex:1,
        backgroundColor: "rgb(241,243,245)"
    },
})