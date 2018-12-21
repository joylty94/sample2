import React, {Component} from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Button, Text, CheckBox } from 'native-base';

export default class InformationScreen extends Component {
    render() {
        return (
            <Container>
                <Content style={{flax:1}}>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <View style={{width:50, height:50, borderRadius:30, backgroundColor:'blue'}}></View>
                            </Left>
                            <Body>
                                <Text>Facebook</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                    </List>
                    <View style={{marginTop:10, paddingHorizontal:10}}>
                        <Text style={styles.title}>별명</Text>
                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="4글자 이상 15자 미만으로 입력하세요."
                                placeholderTextColor='rgb(173,181,189)'
                                underlineColorAndroid='rgb(255,255,255)'
                                autoCorrect={false}
                                autoCapitalize="none"
                                // onChangeText={}
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
                            // onChangeText={}
                            />
                            <CheckBox checked={false} />
                            <Text style={{marginLeft:15}}>나이 미입력</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
                        <Text>서비스이용약관보기</Text>
                        <Text>개인정보취급방침보기</Text>
                    </View>
                        <Button block success style={{marginHorizontal:10}}>
                            <Text>Success</Text>
                        </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    formContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        height:40,
        marginBottom:5
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
        paddingRight: 50,
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