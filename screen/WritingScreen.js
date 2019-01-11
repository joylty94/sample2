import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text, KeyboardAvoidingView, Switch, Alert } from 'react-native';
import Button from 'react-native-button';
import { MaterialIcons, EvilIcons, AntDesign } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import { dispatchWriting } from '../ducks/writingScreen';

class WritingScreen extends Component {
    static navigationOptions = () => {
        return {
            title: '글'
        };
    }

    state = {
        text: null,
        anonymous: false
    }

    handleText = (navigation, text, anonymous) => {
        console.log('글',text)
        if (text == null || text === '') {
            Alert.alert(
                "",
                "글을 입력해주세요.",
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            )
        } else {
            this.props.ondispatch(navigation, text, anonymous)
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{flex:1}}>
                <TouchableOpacity
                    style={{ flex: 1, paddingVertical: 5, paddingHorizontal: 5 }}
                    onPress={() => this.refs.writing.focus()}>
                    <TextInput
                        ref={"writing"}
                        placeholder="질문을 입력하세요"
                        placeholderTextColor="rgb(134,142,150)"
                        underlineColorAndroid="#fff"
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({
                            text
                        })}
                    />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    {/* <View>
                        <Button><EvilIcons name='camera' size={35} color='rgb(134,142,150)' style={{ paddingTop: 3}} /></Button>
                    </View> */}
                    <View>
                        <Switch
                            value={this.state.anonymous}
                            onValueChange={() => this.setState((state, props) => {
                                return { anonymous: !state.anonymous };
                            })}
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                    </View>
                    {/* <View>
                        <ModalDropdown 
                            style={{ width: 80, paddingVertical: 3, paddingHorizontal: 5, borderWidth: 1, borderColor: 'rgb(134,142,150)'}} 
                            options={['공개', '비공개']}
                            defaultValue='사용자 설정'
                            dropdownStyle={{ width: 80, height: 62, marginLeft: -6, marginTop: -4, borderWidth: 1, borderColor:'rgb(134,142,150)'}}
                            // dropdownTextHighlightStyle={{height:10}} 
                            />
                    </View> */}
                    <Button onPress={() => this.handleText(this.props.navigation, this.state.text, this.state.anonymous)}>완료</Button>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default connect(
    // mapStateToProps
    state => ({
    }),
    // mapDispatchToProps
    dispatch => ({
        ondispatch: (navigation, text, anonymous) => {
            dispatch(dispatchWriting(navigation, text, anonymous));
        },
    }),
)(WritingScreen);

const styles = StyleSheet.create({
    infoContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: 'rgb(134,142,150)',
        paddingHorizontal:5,
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // bottom: 0,
        // height: 40,
    }
})
