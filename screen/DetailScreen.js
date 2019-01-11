import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView, FlatList, KeyboardAvoidingView, TextInput } from 'react-native';
import {
    AntDesign,
    FontAwesome,
    EvilIcons
} from '@expo/vector-icons';
import { Header, Left, Body, Right, Icon, Title } from 'native-base';
import { dispatchItem, dispatchLiked, dispatchBackData, dispatchComment } from '../ducks/detailScreen'; 
import { connect } from 'react-redux';
import Button from 'react-native-button';
import Spacer from '../components/Spacer';
import Modal from "react-native-modal";
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

class DetailScreen extends Component {
    state = {
        isModalVisible: false,
        text: null,
    }
    componentDidMount() {
        let { item } = this.props.navigation.state.params;
        this.props.onItem(item)
    }

    handleBack = (item, navigation) => {
        this.props.onBackData(item, navigation)
    }

    handleWebview = (item) => {
        this.props.navigation.navigate('Webview', item.url_meta)
    }

    handleLikes = () => {
        this.props.onLiked()
    }

    handleModal = () => {
        this.setState({
            isModalVisible: false
        })
    }    
    handleCommentModal = () => {

    }
    render() {
        if (this.props.item && this.props.commentItem){
            const { item, commentItem } = this.props;

            return (
                <View style={{flex:1}}>
                    <ScrollView
                        style={styles.container}
                        >
                        <Header>
                            <Left>
                                <Button
                                    onPress={() => this.handleBack(this.props.item, this.props.navigation)}>
                                    Back
                                </Button>
                            </Left>
                            <Body>
                                <Title>{item.target_pin.title}</Title>
                            </Body>
                            <Right>
                            </Right>
                        </Header>
                        <View style={{ borderBottomWidth: 1, borderColor:'rgb(73,80,87)', paddingHorizontal:10}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'blue', marginRight: 10 }}></View>
                                    <View>
                                        <Text style={{ marginBottom: 5 }}>
                                            {item.profile.nick_name}
                                        </Text>
                                    </View>
                                </View>
                                <Button>
                                    <AntDesign name='ellipsis1' size={25} />
                                </Button>
                            </View>
                            <View style={{ paddingVertical: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: '300', textAlign: 'justify' }}>
                                    {item.content}
                                </Text>
                            </View>
                            {
                                (item.url_meta)
                                    ?
                                    <View 
                                        style={{flexDirection: 'column', marginHorizontal: 10, marginBottom: 10, borderWidth: 1, borderColor: 'rgb(134,142,150)' }}
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
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginRight:5}}>좋아요{item.likes}</Text>
                                <Text>댓글{item.comments}</Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-around', alignItems: 'center', marginTop: 10, borderTopWidth:1, borderColor:'rgb(134,142,150)'}}>
                                <View style={{padding:10 , justifyContent:'center', alignItems:'center'}}>
                                    <Button style={{ color: '#000', justifyContent:'center', alignItems: 'center' }}><FontAwesome name='refresh' size={20} /></Button>
                                </View>
                                <View style={{ padding: 10 ,justifyContent: 'center', alignItems:'center'}}>
                                {
                                    (item.liked)
                                    ?(
                                            <Button
                                                style={{ color: '#000', justifyContent:'center', alignItems: 'center', fontSize: 14 }}><AntDesign name='heart' size={20} color='rgb(250,82,82)' style={{ marginRight: 5 }}
                                                onPress={() => this.handleLikes()}
                                                />좋아요
                                            </Button>
                                    )
                                    :(
                                            <Button
                                                style={{ color: '#000', justifyContent:'center', alignItems: 'center', fontSize: 14 }}><AntDesign name='hearto' size={20} color='rgb(250,82,82)' style={{ marginRight: 5 }}
                                                onPress={() => this.handleLikes()} 
                                                />좋아요
                                            </Button>
                                    )
                                }
                                </View>
                                <View style={{ padding: 10, justifyContent: 'center', alignItems:'center'}}>
                                    <Button style={{ color: '#000', justifyContent:'center', alignItems: 'center', fontSize: 14 }}
                                        onPress={() => this.setState({
                                            isModalVisible: true    
                                        })}>
                                    <FontAwesome name='comment-o' size={20} style={{ marginTop:-5, marginRight: 5 }} />댓글달기
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={{marginTop:10}}>
                            {/* <View style={{alignItems:'flex-end', paddingRight:20}}>
                                <Button>더보기</Button>
                            </View> */}
                                <Spacer height={8} />
                                <FlatList
                                data={commentItem}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{flexDirection:'row', marginBottom:5, paddingRight: 5}}>
                                                <View style={{width:'15%', justifyContent:'center', alignItems:'center'}}>
                                                    <View style={{width: 40, height:40, borderRadius:20, backgroundColor:'blue', marginRight:5}}/>
                                                </View>
                                                <View style={{ flexDirection: 'row', width:'85%', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5, backgroundColor:'rgb(208,235,255)', borderRadius: 10 }}>
                                                    <Text>{item.content}</Text>
                                                </View>
                                            </View>
                                        )
                                    }}
                                    keyExtractor={(item, index) => item.category + `${index}`}>
                                </FlatList>
                        </View>
                    {/* <Spacer height={80} /> */}
                    </ScrollView>
                    <Modal
                        style={{ justifyContent: "flex-end", margin:0}}
                        isVisible={this.state.isModalVisible}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        onBackdropPress={() => this.handleModal()}
                        onBackButtonPress={() => this.handleModal()}>
                        <View>
                            <KeyboardAvoidingView>
                                <View style={{flexDirection:'row', alignItems:'flex-end', paddingVertical:5, backgroundColor:"#fff"}}>
                                    <View style={{width:'10%', marginBottom:-3}}>
                                        <EvilIcons name="camera" size={35} style={{padding:0}} />
                                    </View>
                                    <AutoGrowingTextInput
                                        style={{ backgroundColor: '#fff', width: '80%', borderWidth: 1, borderColor:'rgb(134,142,150)', borderRadius:5, paddingVertical:3, paddingHorizontal:5}}
                                        placeholder="질문을 입력하세요"
                                        placeholderTextColor="rgb(134,142,150)"
                                        underlineColorAndroid="#fff"
                                        autoCapitalize="none"
                                        autoFocus={true}
                                        onChangeText={(text) => this.setState({
                                            text
                                        })}
                                    />
                                    <View style={{width:'10%', justifyContent:'center'}}>
                                        <Button style={{padding:3}}
                                            onPress={() => {this.props.onComment(this.state.text)
                                                            this.handleModal()} }
                                            >
                                            등록
                                        </Button>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
                </View>
            );
        }
        return (<ActivityIndicator animating />)
    }
}
//7b474738-036b-11e9-992a-ec85f37e1564
export default connect(
    // mapStateToProps
    state => ({
        item: state.detailScreen.item,
        commentItem: state.detailScreen.commentItem,
        liked: state.detailScreen.liked
    }),
    // mapDispatchToProps
    dispatch => ({
        onItem: (item) => {
            dispatch(dispatchItem(item));
        },
        onLiked: () => {
            dispatch(dispatchLiked());
        },
        onBackData: (item, navigation) => {
            dispatch(dispatchBackData(item, navigation));
        },
        onComment: (text) => {
            dispatch(dispatchComment(text));
        },
    }),
)(DetailScreen);

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "rgb(241,243,245)"
    },
})