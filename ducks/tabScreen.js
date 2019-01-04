import { Location, Permissions } from 'expo';
import axios from 'axios';

export const MAPSUCCESS = "tabScreen/MAPSUCCESS";
export const NORMALSUCCESS = "tabScreen/NORMALSUCCESS";
export const POPULARITYSUCCESS = "tabScreen/POPULARITYSUCCESS";
export const LOCATIONSUCCESS = "tabScreen/LOCATIONSUCCESS";

export function tabScreenMapSuccess(latitude, longitude) {
    return {
        type: MAPSUCCESS,
        latitude,
        longitude
    };
}

export function tabScreenNormalSuccess(data) {
    return {
        type: NORMALSUCCESS,
        data
    };
}

export function tabScreenPopularitySuccess(data) {
    return {
        type: POPULARITYSUCCESS,
        data
    };
}

export function tabScreenLocationSuccess(data) {
    return {
        type: LOCATIONSUCCESS,
        data
    };
}

const initialState = {
    latitude: null,
    longitude: null,
    normal: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case MAPSUCCESS:
            return {
                ...state,
                latitude: action.latitude,
                longitude: action.longitude
            };
        case NORMALSUCCESS:
            return {
                ...state,
                normal: action.data
            };
        case POPULARITYSUCCESS:
            return {
                ...state,
                popularity: action.data
            };
        case LOCATIONSUCCESS:
            return {
                ...state,
                location: action.data
            };
        default:
            return state;
    }
}

export const dispatchMapSuccess = () => async (dispatch) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('status', status)
    if (status !== 'granted') {
        this.setState({
            errorMessage: 'Permission to access location was denied',
        });
    }
    if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        dispatch(tabScreenMapSuccess(location.coords.latitude, Math.abs(location.coords.longitude)));
    }
}

export const dispatchDataSuccess = (num) => async (dispatch, getstate) => {
    if(num === 1) {
        let normalPage = 5
        await axios.get(`http://35.243.89.78:8082/v1/posts?limit=${normalPage}&order=desc&comments=0`).then(response => {
            dispatch(tabScreenNormalSuccess(response.data.result_data.posts))
        }).catch(e => {
            console.log(e)
        });
    } else if (num === 2){
        let popularityPage = 5
        await axios.get(`http://35.243.89.78:8082/v1/posts?limit=${popularityPage}&order=desc&comments=0&sort=likes`).then(response => {
            dispatch(tabScreenPopularitySuccess(response.data.result_data.posts))
        }).catch(e => {
            console.log(e)
        });
    } else if (num === 3){
        const stateItem = getstate();
        const latitude = stateItem.tabScreen.latitude;
        const longitude = stateItem.tabScreen.longitude;
        if (latitude != null && longitude != null) {
            console.log('위치정보', latitude, longitude)
            await axios.get(`http://35.243.89.78:8082/v1/posts?limit=5&order=desc&latlng=${latitude},${longitude}`).then(response => {
                dispatch(tabScreenLocationSuccess(response.data.result_data.posts))
            }).catch(e => {
                console.log(e)
            });
        }
    }
};