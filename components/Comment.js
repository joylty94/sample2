import React, { Component } from "react";
import { View, Text } from "react-native";
import Button from 'react-native-button';

export default class Comment extends Component {
    render() {
        const { item } = this.props;
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingTop: 10 }}>
                    <Text>{item}</Text>
                </View>
            </View>
        )
    }
}