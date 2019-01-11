import React, { Component } from "react";
import { StyleSheet, FlatList, ScrollView, Text, ActivityIndicator, SafeAreaView, View } from "react-native";
import PTRView from 'react-native-pull-to-refresh';
import Spacer from '../components/Spacer';
import Button from 'react-native-button';
// import { GiftedListView, InfiniteVirtualizedList } from 'react-native-infinite-virtualized-list'

import NormalAnimatedComponent from "../components/NormalAnimatedComponent";

export default class NormalComponent extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.onData(1);
        }, 2000);
    }

    handleRefresh = () => {
        console.log('실행되라')
            return new Promise((resolve) => {
            setTimeout(()=> {
                resolve()
                this.props.onData(1)
            }, 2000)
    });
    }

    handleIndex = () => {
        console.log('된다')
        this.flatListRef.scrollToIndex({ animated: true, index: 0 })
    }

    // _refresh = () => function() {
    // return new Promise((resolve) => {
    //     setTimeout(() => { resolve() }, 2000)
    // });
    // }

    render() {
        const { ...rest } = this.props;
        if (!this.props.normal) {
            return <ActivityIndicator animating />
        }
        // return (
        //         <ScrollView 
        //             style={styles.container}
        //             onScroll={event => {
        //                 const ratio = event.nativeEvent.contentOffset.y / event.nativeEvent.contentSize.height;
        //                 console.log('ratio', ratio)
        //                 if (ratio < 0) {
        //                     this.handleRefresh()
        //                 }
        //                 if (ratio > 0.3) {
        //                     this.props.onData2(1);
        //                 }
        //             }}>
        //             <Spacer height={8} />
        //             <FlatList
        //                 refreshing={true}
        //                 data={this.props.normal}
        //                 extraData={this.props.normal}
        //                 renderItem={({ item, index }) => {
        //                     return (
        //                         <NormalAnimatedComponent item={item} {...rest} />
        //                     )
        //                 }}
        //                 keyExtractor={(item, index) => item.category + `${index}`}>
        //             </FlatList>
        //         <Spacer height={80} />
        //     </ScrollView>
        // )
        return (
                <PTRView onRefresh={this.handleRefresh}
                    style={styles.container}
                    >
                    <FlatList
                        refreshing={true}
                        ref={(ref) => { this.flatListRef = ref; }}
                        // onEndReachedThreshold={1}
                        // onEndReached={() => this.handle()}
                        data={this.props.normal}
                        extraData={this.props.normal}
                        renderItem={({ item, index }) => {
                            return (
                                <NormalAnimatedComponent item={item} {...rest} />
                            )
                        }}
                        keyExtractor={(item, index) => item.category + `${index}`}>
                    </FlatList>
                    {
                        (this.props.loading)
                        ?
                        <ActivityIndicator animating /> 
                        :
                        <Button style={{padding:3}}
                            onPress={() => this.props.onData2(1)}>
                            더보기
                        </Button>
                    }
            </PTRView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex:1,
        backgroundColor: "rgb(241,243,245)"
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    navBar: {
        height: 64,
        backgroundColor: '#CCC'
    },
    row: {
        padding: 10,
        height: 44,
    },
})