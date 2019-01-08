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

export function tabScreenNormalSuccess(data, next) {
    return {
        type: NORMALSUCCESS,
        data,
        next
    };
}

export function tabScreenPopularitySuccess(data, next) {
    return {
        type: POPULARITYSUCCESS,
        data,
        next
    };
}

export function tabScreenLocationSuccess(data, next) {
    return {
        type: LOCATIONSUCCESS,
        data,
        next
    };
}

const initialState = {
    latitude: null,
    longitude: null,
    normal: null,
    normalNext: null,
    popularity: null,
    popularityNext: null,
    location: null,
    locationNext: null, 
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
                normal: action.data,
                normalNext: action.next
            };
        case POPULARITYSUCCESS:
            return {
                ...state,
                popularity: action.data,
                popularityNext: action.next
            };
        case LOCATIONSUCCESS:
            return {
                ...state,
                location: action.data,
                locationNext: action.next
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
        console.log('좌표값', location)
        dispatch(tabScreenMapSuccess(location.coords.latitude, Math.abs(location.coords.longitude)));
    }
}

export const dispatchDataSuccess = (num) => async (dispatch, getstate) => {
    const stateItem = getstate();
    if(num === 1) {
        await axios.get(`http://35.243.89.78:8082/v1/posts?limit=5&order=desc&comments=0`).then(response => {
            console.log('data', response.data.result_data.posts)
            dispatch(tabScreenNormalSuccess(response.data.result_data.posts, response.data.result_data.next))
        }).catch(e => {
            console.log(e)
        });
    } else if (num === 2){
        await axios.get(`http://35.243.89.78:8082/v1/posts?limit=5&order=desc&comments=0&sort=likes`).then(response => {
            dispatch(tabScreenPopularitySuccess(response.data.result_data.posts, response.data.result_data.next))
        }).catch(e => {
            console.log(e)
        });
    } else if (num === 3){
        const latitude = stateItem.tabScreen.latitude;
        const longitude = stateItem.tabScreen.longitude;
        if (latitude != null && longitude != null) {
            console.log('위치정보', latitude, longitude)
            await axios.get(`http://35.243.89.78:8082/v1/posts?limit=5&order=desc&latlng=${latitude},${longitude}`).then(response => {
                dispatch(tabScreenLocationSuccess(response.data.result_data.posts, response.data.result_data.next))
            }).catch(e => {
                console.log(e)
            });
        }
    }
};

export const dispatchNextDataSuccess = (num) => async (dispatch, getstate) => {
    const stateItem = getstate();
    if(num === 1) {
        const normal = stateItem.tabScreen.normal;
        const normalNext = stateItem.tabScreen.normalNext;
        console.log('normalNext111', `http://35.243.89.78:8082/${normalNext}`)
        await axios.get(`http://35.243.89.78:8082${normalNext}`).then(response => {
            const newData = normal.concat(response.data.result_data.posts)
            dispatch(tabScreenNormalSuccess(newData, response.data.result_data.next))
        }).catch(e => {
            console.log(e)
        });
    } else if (num === 2){
        const popularity = stateItem.tabScreen.popularity;
        const popularityNext = stateItem.tabScreen.popularityNext;
        await axios.get(`http://35.243.89.78:8082${popularityNext}`).then(response => {
            const newData = popularity.concat(response.data.result_data.posts)
            dispatch(tabScreenPopularitySuccess(newData, response.data.result_data.next))
        }).catch(e => {
            console.log(e)
        });
    } else if (num === 3){
        const latitude = stateItem.tabScreen.latitude;
        const longitude = stateItem.tabScreen.longitude;
        const location = stateItem.tabScreen.location
        const locationNext = stateItem.tabScreen.locationNext
        if (latitude != null && longitude != null) {
            console.log('위치정보', latitude, longitude)
            await axios.get(`http://35.243.89.78:8082${locationNext}`).then(response => {
                const newData = location.concat(response.data.result_data.posts)
                dispatch(tabScreenLocationSuccess(newData, response.data.result_data.next))
            }).catch(e => {
                console.log(e)
            });
        }
    }
};