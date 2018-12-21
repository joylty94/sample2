import React, { Component } from "react";
import { StyleSheet, TouchableWithoutFeedback, Animated, View } from "react-native";
import {
    Left, Body, Right, Button, Icon, Card, CardItem, Text,
} from 'native-base';

export default class NoteListAnimatedComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animatePress: new Animated.Value(1)
        }
    }

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
    handleSearching = (search) => {
        if (search) {
            this.props.onSearching()
        }
        // this.props.navigation.navigate(DetailNoteScreen, this.props.item)
    }
    render() {
        const { itemName, itemAdr, itemText, itemTime, itemLikes, itemComments, item } = this.props
        return (
            <TouchableWithoutFeedback
                onPressIn={() => this.AnimateIn()}
                onPressOut={() => this.AnimateOut()}
                // onPress={() => this.handleSearching(search)}
                >
                <Animated.View style={[{
                    transform: [
                        {
                            scale: this.state.animatePress,
                        }
                    ]
                }, styles.listView]}>
                    <Card>
                        <CardItem>
                            <Left>
                                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'blue' }}></View>
                                <Body>
                                    <Text>{item.itemName}</Text>
                                    <Text note>{item.itemAdr}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <View style={{ paddingHorizontal: 5 }}>
                            <Text style={{ fontSize: 18 }}>
                                {item.itemText}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Button transparent dark>
                                    <Text style={{ fontSize: 15 }}>더보기</Text>
                                </Button>
                            </View>
                        </View>
                        <CardItem cardBody>
                            <View style={{ height: 200, width: 200, flex: 1, borderWidth: 1, }}>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>{item.itemTime}</Text>
                            </Left>
                            <Body>
                                <Button transparent>
                                    <Icon active name="thumbs-up" style={{ padding: 0 }} />
                                    <Text>{item.itemLikes}</Text>
                                </Button>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <Text>{item.itemComments}</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    listView: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        marginTop: 10,
        borderColor: "rgb(173,181,189)",
        backgroundColor: "rgb(255,255,255)",
        borderRadius: 5
    },
})