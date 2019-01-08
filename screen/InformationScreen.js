import * as Expo from "expo";
import React, {Component} from "react";
import { View, StyleSheet, TextInput, AsyncStorage, Alert } from "react-native";
import { Button, Text, CheckBox } from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';
import { dispatchToken } from '../ducks/informationScreen';
import Storage from 'react-native-key-value-store';

class InformationScreen extends Component {
    state = {
        nickName: null,
        // email: null,
    }

    componentDidMount() {
        this.postData()
    }

    confirmation = async () => {
        if( this.state.nickName == null){
            Alert.alert(
                "",
                "닉네임을 입력해주세요.",
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            )
            return;
        }
        await axios.post('http://35.243.89.78:8082/v1/join', {
            agreement_location_infomation: false,
            push_on: true,
            age: null,
            gender: null,
            device_id: Expo.Constants.deviceId,
            email: `${this.state.nickName}@gmail.com`,
            sign_type: "google",
            nick_name: this.state.nickName,
            profile_image: "default8"
        })
        .then(response => {
            if(response.data.result_code === 0){
                console.log('1111', Expo.Constants.deviceId, this.state.nickName )
                Storage.set('device_id', ({ device_id: Expo.Constants.deviceId, nickName: this.state.nickName }));
                this.props.onToken(this.props.navigation, response);
            }
        })
        .catch(response => { console.log(response) });
    }

    postData = async () => {
        let value = await Storage.get('device_id', 'default value');
        value = await Storage.get('device_id');
        if(value != null){
            if (value.device_id === Expo.Constants.deviceId){
                this.setState({
                    nickName: value.nickName
                })
            }
        }
    }

    render() {
        console.log('nick', this.state.nickName)
        return (
            <View style={{flex:1, justifyContent:'space-between', paddingVertical: 10}}>
                <View style={{ paddingHorizontal: 5, height: 50}}>
                    <TextInput
                        style={styles.input}
                        placeholder="닉네임을 입력해주세요."
                        placeholderTextColor='rgb(173,181,189)'
                        underlineColorAndroid='rgb(255,255,255)'
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            this.setState({
                                nickName: text
                            })
                        }}
                        value={this.state.nickName}
                    />
                </View>
                {/* <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                    <Text style={styles.title}>이메일</Text>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="4글자 이상 15자 미만으로 입력하세요."
                            placeholderTextColor='rgb(173,181,189)'
                            underlineColorAndroid='rgb(255,255,255)'
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(text) => {
                                this.setState({
                                    email: text
                                })
                            }}
                        />
                        <Button light><Text> 중복체크 </Text></Button>
                    </View>
                    <Text>별명정보는 최초 등록 후 변경이 불가합니다.</Text>
                </View>
                    <View style={{marginTop:10, paddingHorizontal:10}}>
                        <Text style={styles.title}>별명</Text>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="4글자 이상 15자 미만으로 입력하세요."
                                placeholderTextColor='rgb(173,181,189)'
                                underlineColorAndroid='rgb(255,255,255)'
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={(text) => {
                                    this.setState({
                                        nickName: text
                                    })
                                }}
                            />
                            <Button light><Text> 중복체크 </Text></Button>
                        </View>
                            <Text>별명정보는 최초 등록 후 변경이 불가합니다.</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[{marginLeft:10}, styles.title]}>성별</Text>
                        <View style={styles.genderImage}>
                            <View style={styles.viewImage}></View>
                            <View style={styles.viewImage}></View>
                            <View style={styles.viewImage}></View>
                        </View>
                    </View>
                    <View style={{marginTop:10, paddingLeft: 10}}>
                        <Text style={styles.title}>나이</Text>
                        <View style={styles.ageContainer}>
                            <TextInput
                                style={styles.input2}
                                placeholder="나이 선택"
                                placeholderTextColor='rgb(173,181,189)'
                                underlineColorAndroid='rgb(255,255,255)'
                                autoCorrect={false}
                                autoCapitalize="none"
                            onChangeText={}
                            />
                            <CheckBox checked={false} />
                            <Text style={{marginLeft:15}}>나이 미입력</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
                        <Text>서비스이용약관보기</Text>
                        <Text>개인정보취급방침보기</Text>
                    </View> */}
                <View>
                    <Button block success style={{marginHorizontal:10, height:50}}
                        onPress={() => this.confirmation()}>
                        <Text>확인</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

export default connect(
    // mapStateToProps
    state => ({
        token: state.informationScreen.token,
    }),
    // mapDispatchToProps
    dispatch => ({
        onToken: (navigation, token) => {
            dispatch(dispatchToken(navigation, token));
        },
    }),
)(InformationScreen);

const styles = StyleSheet.create({
    formContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        height:40,
        marginBottom:5,
        paddingLeft:5
    },
    title:{
        fontSize: 18,
        fontWeight: '600'
    },
    genderImage:{
        flexDirection:'row',
        justifyContent: 'space-around',
        marginTop:5
    },
    ageContainer:{
    flexDirection:'row',
    alignItems: 'center'
    },
    input: {
        height: 40,
        fontSize: 14,
        color: "rgb(52,58,64)",
        borderBottomWidth: 1,
        borderColor: 'rgb(52,58,64)',
    },
    input2: {
        height: 40,
        paddingRight:40,
        fontSize: 14,
        color: "rgb(52,58,64)",
        borderBottomWidth: 1,
        borderColor: 'rgb(52,58,64)',
    },
    viewImage: {
        width:100,
        height:100,
        borderRadius:50,
        borderWidth:1,
        borderColor: 'rgb(52,58,64)',
    }
})