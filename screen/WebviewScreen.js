import React, { Component } from 'react';
import { View, StyleSheet, WebView } from 'react-native';

export default class WebviewScreen extends Component {
    render() {
        let url = this.props.navigation.state.params;
        return (
            <View style={{flex:1}}>
                <WebView 
                    source={{uri: url.url}}
                    automaticallyAdjustContentInsets={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

})