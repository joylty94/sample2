import React, { Component } from 'react';
import { View } from 'react-native';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title,
    Content, Card, CardItem, Text,
} from 'native-base';
import NoteListComponent from '../containers/NoteListComponent';

export default class HomeScreen extends Component {
    render() {
        const itemData = [
            { 
                itemName: '오피스',
                itemAdr: '주소주소주소주소',
                itemText: 'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
                itemTime: '2018.12.21',
                itemLikes: 21,
                itemComments: 12
            },
            {
                itemName: '오피스1',
                itemAdr: '주소주소주소주소11',
                itemText: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddgggggggg',
                itemTime: '2018.12.21',
                itemLikes: 821,
                itemComments: 128
            },
            {
                itemName: '오피스2',
                itemAdr: '주소주소주소주소222',
                itemText: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddvvvvvv',
                itemTime: '2018.12.21',
                itemLikes: 221,
                itemComments: 122
            },
            {
                itemName: '오피스3',
                itemAdr: '주소주소주소주소333',
                itemText: 'dddddddddddddsefesddddddddddddesfsfdddddddddsdfefsdddddddddddddddddddddddddddddddd',
                itemTime: '2018.12.21',
                itemLikes: 213,
                itemComments: 122
            },
        ]
        return (
                <Content>
                    <NoteListComponent itemData={itemData}/>
                </Content>
        );
    }
}

