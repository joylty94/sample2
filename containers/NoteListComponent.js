import React, { Component } from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";

import NoteListAnimatedComponent from "../components/NoteListAnimatedComponent";

export default class NoteListComponent extends Component {
    render() {
        const { itemData, ...rest } = this.props;
        // const { notesItem, results, search, ...rest } = this.props;
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={itemData}
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 10,
        marginBottom: 10,
        backgroundColor: "rgb(241,243,245)"
    },
})