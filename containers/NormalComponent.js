import React, { Component } from "react";
import { StyleSheet, FlatList, ScrollView, Text, ActivityIndicator } from "react-native";
import axios from 'axios';

import NoteListAnimatedComponent from "../components/NoteListAnimatedComponent";

export default class NormalComponent extends Component {
    state = {
        data: null,
        errorMessage: null,
        page: 5,
        loading: false,
    };

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        this.setState({ loading: true })
        try{
            await axios.get(`http://localhost:8082/v1/posts?limit=${this.state.page}&order=desc&comments=0`).then(response => {
                this.setState({ data: response, loading: false })
            });
        } catch(e) {
            console.log(e)
        }
    }

    handleEnd = () => {
        this.setState({
            page: this.state.page + 5,
        },
        () => {
            this.fetchData()
        })
    }

    render() {
        console.log('111', this.state.page)
        const { ...rest } = this.props;
        if (this.state.data) {
            return (
                <ScrollView style={styles.container}>
                    <FlatList
                        data={this.state.data.data.result_data.posts}
                        extraData={this.state.page}
                        onEndReached={this.handleEnd}
                        onEndReachedThreshold={0}
                        ListFooterComponent={() => 
                            this.state.loading
                            ? <ActivityIndicator animating />
                            : null }
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
        return <ActivityIndicator animating />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(241,243,245)"
    },
})