import axios from 'axios';
import { Alert } from 'react-native';
import { dispatchDataSuccess } from './tabScreen';

export const SUCCESS = "writingScreen/SUCCESS";

export function writingScreenSuccess() {
    return {
        type: SUCCESS,
    };
}

const initialState = {
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SUCCESS:
            return {
                ...state,
            };
        default:
            return state;
    }
}

export const dispatchWriting = (navigation, text, anonymous) => async (dispatch, getstate) => {
    const stateItem = getstate();
    const latitude = stateItem.tabScreen.latitude;
    const longitude = stateItem.tabScreen.longitude;
    const token = stateItem.informationScreen.token;
    console.log('token', token)
    console.log('latitude', latitude)
    console.log('longitude', longitude)
    await axios.post('http://35.243.89.78:8082/v1/post', {
        content: text,
        topic: "test111",
        tags: ["stest", "ok_tags"],
        latitude: latitude,
        longitude: longitude,
        is_anonymous: anonymous,
        hash: "wyd8s31gme0"
    },
        {
            headers: {
                'content-type': 'application/json',
                'x-access-token': token
            },
    })
        .then(response => {
            console.log('성공', response)
            if (response.data.result_code === 0) {
                // dispatch(dispatchDataSuccess(1));
                navigation.navigate('TabNavigator');     
            }
        })
        .catch(e => { console.log('에러', e) });
};