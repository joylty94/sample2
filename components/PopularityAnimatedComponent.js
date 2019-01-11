import React, { Component } from "react";
import { StyleSheet, TouchableWithoutFeedback, Animated, View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import {
    AntDesign,
} from '@expo/vector-icons';
import Button from 'react-native-button';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';

export default class PopularityAnimatedComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animatePress: new Animated.Value(1),
            lines: false,
            like: null,
        }
    }

    // handleLikes = async () => {
    //     console.log('토큰', this.props.token)
    //     await axios.put(`http://35.243.89.78:8082/v1/like/post/${this.props.item.post_id}`,{

    //     },
    //     {
    //             headers: {
    //                 'content-type': 'application/json',
    //                 'x-access-token': this.props.token
    //             },
    //         })
    //         .then(response => {
    //             console.log('성공', response)
    //         })
    //         .catch(e => { console.log('에러', e) });
    // }

    AnimateIn = () => {
        Animated.timing(this.state.animatePress, {
            toValue: 0.95,
            duration: 200,
        }).start()
    }
    AnimateOut = () => {
        Animated.timing(this.state.animatePress, {
            toValue: 1,
            duration: 200,
        }).start()
    }
    handleDetail = (item, token) => {
        this.props.navigation.navigate('Detail',  {item: ({...item, token, num:2 })})
    }
    handleWebview = (item) => {
        this.props.navigation.navigate('Webview', item.url_meta)
    }
    render() {
        const { item } = this.props;
        if (!item) {
            return <ActivityIndicator animating />
        }
        return (
            <TouchableWithoutFeedback
                onPressIn={() => this.AnimateIn()}
                onPressOut={() => this.AnimateOut()}
                onPress={() => this.handleDetail(item, this.props.token)}
                >
                <Animated.View style={[{
                    transform: [
                        {
                            scale: this.state.animatePress,
                        }
                    ]
                }, styles.listView]}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:10, paddingTop:10}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'blue', marginRight: 10 }}></View>
                                <View>
                                    <Text style={{ marginBottom: 5 }}>{item.profile.nick_name}</Text>
                                    <Text note>{item.target_pin.title}</Text>
                                </View>
                            </View>
                            <Button>
                                <AntDesign name='ellipsis1' size={25}/>
                            </Button>
                        </View>
                        {
                            (item.content != null)
                            ?
                                (this.state.lines) 
                                ?
                                    <View style={{ padding: 10 }}>
                                        <Text numberOfLines={false} style={{ fontSize: 18, fontWeight: '300', textAlign: 'justify' }}>
                                            {item.content}
                                        </Text>
                                    </View>
                                :
                                    (item.content.length < 500)
                                    ?
                                        <View style={{ padding: 10 }}>
                                            <Text numberOfLines={10} style={{ fontSize: 16, fontWeight: '300', marginBottom: 8, textAlign: 'justify' }}>
                                                {item.content}
                                            </Text>
                                        </View>   
                                    :
                                        <View style={{ padding: 10}}>
                                            <Text numberOfLines={10} style={{ fontSize: 16, fontWeight: '300', marginBottom: 8, textAlign: 'justify' }}>
                                                {item.content}
                                            </Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                                                <Button onPress={() => this.setState({
                                                    lines: true
                                                })}
                                                style={{ fontSize: 14, color:'#000'}}> 
                                                더보기
                                                </Button>
                                            </View>
                                        </View>
                            :   null     
                        } 
                        {
                            (item.url_meta)
                            ?
                                <TouchableOpacity 
                                    style={{ flex:1, flexDirection:'column', marginHorizontal: 10, marginBottom:10, borderWidth: 1, borderColor:'rgb(73,80,87)'}}
                                    onPress={() => this.handleWebview(item)}>
                                    <Image source={{ uri: item.url_meta.image }} style={{ height: 200, width: null, flex: 1 }} />
                                    <View style={{padding:5}}>
                                        <Text style={{marginBottom:3, fontSize:18}}
                                            numberOfLines={1}>{item.url_meta.title}</Text>
                                        <Text
                                            numberOfLines={3}>{item.url_meta.description}</Text>
                                        <Text style={{ fontSize: 12, color:'rgb(134,142,150)', marginTop:3}}
                                            numberOfLines={1}>{item.url_meta.url}</Text>
                                    </View>
                                </TouchableOpacity>
                            : null
                        }                        
                        <View style={{ flexDirection: 'row', alignItems: 'center',
                         justifyContent: 'flex-end', paddingHorizontal: 20,
                        backgroundColor:'rgb(241,243,245)', paddingVertical:10}}>
                            <Button
                                style={{ fontSize: 16, color:'#000', marginRight: 5}}
                                // onPress={() => this.handleLikes()}
                                >
                            좋아요
                            </Button>
                            <Text style={{ fontSize: 16, marginRight: 10 }}>{item.likes}</Text>
                            <Button style={{ color: '#000', marginRight: 5}}>
                            댓글
                            </Button>
                            <Text style={{ fontSize: 16 }}>{item.comments}</Text>
                        </View>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    listView: {
        // marginBottom: 10,
        backgroundColor: "rgb(255,255,255)",
    },
})