import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import {
    AntDesign,
    FontAwesome
} from '@expo/vector-icons';
import Button from 'react-native-button'

export default class DetailScreen extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: params.target_pin.title,
        }
    };
    handleWebview = (item) => {
        this.props.navigation.navigate('Webview', item.url_meta)
    }
    render() {
        let item = this.props.navigation.state.params;
        return (
            <View style={{flex:1}}>
                <View style={{ borderBottomWidth: 1, flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'blue', marginRight: 10 }}></View>
                            <View>
                                <Text style={{ marginBottom: 5 }}>
                                    {item.profile.nick_name}
                                </Text>
                            </View>
                        </View>
                        <Button>
                            <AntDesign name='ellipsis1' size='25' />
                        </Button>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text numberOfLines={false} style={{ fontSize: 18, fontWeight: '300', textAlign: 'justify' }}>
                            {item.content}
                        </Text>
                    </View>
                    {
                        (item.url_meta)
                            ?
                            <View 
                                style={{ flex: 1, flexDirection: 'column', marginHorizontal: 10, marginBottom: 10, borderWidth: 1, borderColor: 'rgb(73,80,87)' }}
                                onPress={() => this.handleWebview(item)}>
                                <TouchableOpacity>
                                    <Image source={{ uri: item.url_meta.image }} style={{ height: 200, width: null }} />
                                    <View style={{ padding: 5 }}>
                                        <Text style={{ marginBottom: 3, fontSize: 18 }}
                                            numberOfLines={1}>{item.url_meta.title}</Text>
                                        <Text
                                            numberOfLines={3}>{item.url_meta.description}</Text>
                                        <Text style={{ fontSize: 12, color: 'rgb(134,142,150)', marginTop: 3 }}
                                            numberOfLines={1}>{item.url_meta.url}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            : null
                    }
                    <View style={{flexDirection:'row', justifyContent:'space-around', alignItems: 'center', marginTop: 10}}>
                        <View style={{padding:10 , justifyContent:'center', alignItems:'center'}}>
                            <Button style={{ color: '#000' }}><FontAwesome name='refresh' size='25' /></Button>
                        </View>
                        <View style={{ padding: 10 ,justifyContent: 'center', alignItems:'center'}}>
                            <Button style={{color:'#000'}}><AntDesign name='hearto' size='23' style={{ marginRight: 5 }} />{item.likes}</Button>
                        </View>
                        <View style={{ padding: 10, justifyContent: 'center', alignItems:'center'}}>
                            <Button style={{ color: '#000' }}><FontAwesome name='comment-o' size='23' style={{ marginRight: 5 }} />{item.comments}</Button>
                        </View>
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <View style={{alignItems:'flex-end', paddingRight:20}}>
                        <Button>더보기</Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

})