import React, { Component } from "react";
import { StyleSheet, FlatList, ScrollView, Text, ActivityIndicator } from "react-native";

import NormalAnimatedComponent from "../components/NormalAnimatedComponent";

export default class NormalComponent extends Component {
    state = {
    };

    componentDidMount() {
        this.props.onData(1)
    }

    handleEnd = () => {
        // console.log('실행')
        // this.setState({
        //     page: this.state.page + 5
        // })
        // this.fetchData()
    }

    render() {
        const { ...rest } = this.props;
        if (!this.props.normal) {
            return <ActivityIndicator animating />
        }
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.props.normal}
                    extraData={this.props.normal}
                    // onEndReached={this.handleEnd}
                    // onEndReachedThreshold={0}
                    ListFooterComponent={() =>
                        this.state.loading
                            ? <ActivityIndicator animating />
                            : null}
                    renderItem={({ item, index }) => {
                        return (
                            <NormalAnimatedComponent item={item} {...rest} />
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