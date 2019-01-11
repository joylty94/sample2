import { Location, Permissions } from 'expo';
import axios from 'axios';
import { Platform } from 'react-native';

export const MAPSUCCESS = "tabScreen/MAPSUCCESS";
export const NORMALSUCCESS = "tabScreen/NORMALSUCCESS";
export const POPULARITYSUCCESS = "tabScreen/POPULARITYSUCCESS";
export const LOCATIONSUCCESS = "tabScreen/LOCATIONSUCCESS";
export const LOADING ="tabScreen/LOADING";

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

export function tabScreenLoading() {
    return {
        type: LOADING,
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
    loading: false,
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
                normalNext: action.next,
                loading: false,
            };
        case POPULARITYSUCCESS:
            return {
                ...state,
                popularity: action.data,
                popularityNext: action.next,
                loading: false,
            };
        case LOCATIONSUCCESS:
            return {
                ...state,
                location: action.data,
                locationNext: action.next,
                loading: false,
            };
        case LOADING:
            return {
                ...state,
                loading: true,
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
        if (Platform.OS === 'ios') {
            let location = await Location.getCurrentPositionAsync({});
            console.log('좌표값', location)
            dispatch(tabScreenMapSuccess(location.coords.latitude, Math.abs(location.coords.longitude)));
        } else {
            console.log('이게')
            dispatch(tabScreenMapSuccess(37.5273935, 127.0405756));
        }
    }
}

export const dispatchDataSuccess = (num) => async (dispatch, getstate) => {
    const stateItem = getstate();
    const token = stateItem.informationScreen.token;
    if(num === 1) {
        await axios.get(`http://35.243.89.78:8082/v1/posts?limit=5&order=desc&comments=0`,
            {
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': token
                },
            })
            .then(response => {
                console.log(response.data.result_data.posts)
                dispatch(tabScreenNormalSuccess(response.data.result_data.posts, response.data.result_data.next))

            })
            .catch(e => { 
                console.log('에러', e);
                dispatch(dispatchDataSuccess(1));
            });
        
    } else if (num === 2){
        await axios.get(`http://35.243.89.78:8082/v1/posts?limit=5&order=desc&comments=0&sort=likes`,
            {
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': token
                },
            })
            .then(response => {
                dispatch(tabScreenPopularitySuccess(response.data.result_data.posts, response.data.result_data.next))
            })
            .catch(e => { 
                console.log('에러', e);
                dispatch(dispatchDataSuccess(2));
            });
    } else if (num === 3){
        const latitude = stateItem.tabScreen.latitude;
        const longitude = stateItem.tabScreen.longitude;
        console.log('위치정보1', latitude, longitude)
        if (latitude != null && longitude != null) {
            await axios.get(`http://35.243.89.78:8082/v1/posts?limit=5&order=desc&latlng=${latitude},${longitude}`,
                {
                    headers: {
                        'content-type': 'application/json',
                        'x-access-token': token
                    },
                })
                .then(response => {
                    dispatch(tabScreenLocationSuccess(response.data.result_data.posts, response.data.result_data.next))
                })
                .catch(e => { 
                    console.log('에러', e);
                    dispatch(dispatchDataSuccess(3));
                 });
        }
    }
};

export const dispatchNextDataSuccess = (num) => async (dispatch, getstate) => {
    const stateItem = getstate();
    const token = stateItem.informationScreen.token;
    dispatch(tabScreenLoading())
    if(num === 1) {
        const normal = stateItem.tabScreen.normal;
        const normalNext = stateItem.tabScreen.normalNext;
        // console.log('normalNext111', `http://35.243.89.78:8082/${normalNext}`)
        // await axios.get(`http://35.243.89.78:8082${normalNext}`).then(response => {
        //     const newData = normal.concat(response.data.result_data.posts)
        //     setTimeout(() => {
        //         dispatch(tabScreenNormalSuccess(newData, response.data.result_data.next))
        //     }, 2000);  
        // }).catch(e => {
        //     console.log(e)
        // });
        await axios.get(`http://35.243.89.78:8082${normalNext}`,
            {
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': token
                },
            })
            .then(response => {
                const newData = normal.concat(response.data.result_data.posts)
                setTimeout(() => {
                    dispatch(tabScreenNormalSuccess(newData, response.data.result_data.next))
                }, 2000);
            })
            .catch(e => {
                console.log('에러', e);
                // dispatch(dispatchDataSuccess(1));
            });
    } else if (num === 2){
        const popularity = stateItem.tabScreen.popularity;
        const popularityNext = stateItem.tabScreen.popularityNext;
        // await axios.get(`http://35.243.89.78:8082${popularityNext}`).then(response => {
        //     const newData = popularity.concat(response.data.result_data.posts)
        //     setTimeout(() => {
        //         dispatch(tabScreenPopularitySuccess(newData, response.data.result_data.next))
        //     }, 2000);
        // }).catch(e => {
        //     console.log(e)
        // });
        await axios.get(`http://35.243.89.78:8082${popularityNext}`,
            {
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': token
                },
            })
            .then(response => {
                const newData = popularity.concat(response.data.result_data.posts)
                setTimeout(() => {
                    dispatch(tabScreenPopularitySuccess(newData, response.data.result_data.next))
                }, 2000);
            })
            .catch(e => {
                console.log('에러', e);
                // dispatch(dispatchDataSuccess(1));
            });
    } else if (num === 3){
        const latitude = stateItem.tabScreen.latitude;
        const longitude = stateItem.tabScreen.longitude;
        const location = stateItem.tabScreen.location
        const locationNext = stateItem.tabScreen.locationNext
        if (latitude != null && longitude != null) {
            // await axios.get(`http://35.243.89.78:8082${locationNext}`).then(response => {
            //     const newData = location.concat(response.data.result_data.posts)
            //     setTimeout(() => {
            //         dispatch(tabScreenLocationSuccess(newData, response.data.result_data.next))
            //     }, 2000);
            // }).catch(e => {
            //     console.log(e)
            // });
            await axios.get(`http://35.243.89.78:8082${locationNext}`,
                {
                    headers: {
                        'content-type': 'application/json',
                        'x-access-token': token
                    },
                })
                .then(response => {
                    const newData = location.concat(response.data.result_data.posts)
                    setTimeout(() => {
                        dispatch(tabScreenLocationSuccess(newData, response.data.result_data.next))
                    }, 2000);
                })
                .catch(e => {
                    console.log('에러', e);
                    // dispatch(dispatchDataSuccess(1));
                });
        }
    }
};