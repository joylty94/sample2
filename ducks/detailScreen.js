import axios from 'axios';
import { tabScreenNormalSuccess, dispatchDataSuccess } from './tabScreen';

export const LOADING = 'detailScreen/LOADING';
export const SUCCESS = "detailScreen/SUCCESS";
export const COMMENTSUCCESS = "detailScreen/COMMENTSUCCESS";
export const LIKED = "detailScreen/LIKED";

export function detailScreenSuccess(item, commentItem) {
    return {
        type: SUCCESS,
        item,
        commentItem
    };
}
export function commentSuccess() {
    return {
        type: COMMENTSUCCESS,
    };
}

export function detailScreenLiked(item) {
    return {
        type: LIKED,
        item,
    };
}

const initialState = {
    item: null,
    commentItem: null,
    liked: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SUCCESS:
            return {
                ...state,
                item: action.item,
                liked: action.item.liked,
                commentItem: action.commentItem
            };
        case LIKED:
            return {
                ...state,
                item: action.item,
                liked: action.item.liked
            };
        default:
            return state;
    }
}

export const dispatchItem = (item) => async (dispatch) => {
    await axios.get(`http://35.243.89.78:8082/v1/post/${item.post_id}?comments=999`,
        {
            headers: {
                'content-type': 'application/json',
                'x-access-token': item.token
            },
        })
        .then(response => {
            setTimeout(() => {
                dispatch(detailScreenSuccess(item, response.data.result_data.child));
            }, 1000);
        })
        .catch(e => { console.log('에러', e) });
};

export const dispatchLiked = () => async (dispatch, getstate) => {
    const stateItem = getstate();
    const item = stateItem.detailScreen.item;
    if(item.liked){
        await axios.delete(`http://35.243.89.78:8082/v1/like/post/${item.post_id}`,
            {
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': item.token
                },
            })
            .then(response => {
                console.log('like', response)
                if (response.data.result_code === 0) {
                    item.liked = false;
                    item.likes = item.likes - 1;
                    setTimeout(() => {
                        dispatch(detailScreenLiked(item))
                    }, 1000);
                }
            })
            .catch(e => { console.log('에러', e) });

    } else {
        await axios.put(`http://35.243.89.78:8082/v1/like/post/${item.post_id}`,{
        },
            {
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': item.token
                },
            })
            .then(response => {
                console.log('like', response)
                if(response.data.result_code === 0){
                    item.liked= true;
                    item.likes= item.likes + 1;
                    console.log('item정보', item)
                    setTimeout(() => {
                        dispatch(detailScreenLiked(item))
                    }, 1000);
                }
            })
            .catch(e => { console.log('에러', e) });
    }
};

export const dispatchBackData = (item, navigation) => async (dispatch, getstate) => {
    const stateItem = getstate();
    const normalItem = stateItem.tabScreen.normal;
    if(item.num === 1){
        // let updateNum = normalItem.findIndex((data) => data.post_id === item.post_id);
        // normalItem.splice((updateNum), 1, item);
        navigation.goBack();
        // setTimeout(() => {
            dispatch(dispatchDataSuccess(1));
        // }, 2000);
    }
    if(item.num === 2){
        // let updateNum = normalItem.findIndex((data) => data.post_id === item.post_id);
        // normalItem.splice((updateNum), 1, item);
        navigation.goBack();
        // setTimeout(() => {
            dispatch(dispatchDataSuccess(2));
        // }, 2000);
    }
    if(item.num === 3){
        // let updateNum = normalItem.findIndex((data) => data.post_id === item.post_id);
        // normalItem.splice((updateNum), 1, item);
        navigation.goBack();
        // setTimeout(() => {
            dispatch(dispatchDataSuccess(3));
        // }, 2000);
    }
};

export const dispatchComment = (text) => async (dispatch, getstate) => {
    const stateItem = getstate();
    const item = stateItem.detailScreen.item;
    const latitude = stateItem.tabScreen.latitude;
    const longitude = stateItem.tabScreen.longitude;
    const commentItem = stateItem.detailScreen.commentItem;
    await axios.post(`http://35.243.89.78:8082/v1/post`, {
        content: text,
        topic: "xxxtest1",
        tags: ["xxxtest"],
        latitude: latitude,
        longitude: longitude,
        is_anonymous: false,
        parent_post_id: item.post_id
    },
        {
            headers: {
                'content-type': 'application/json',
                'x-access-token': item.token
            },
        })
        .then(response => {
            console.log('실행1', response)
            if (response.data.result_code === 0) {
                setTimeout(() => {
                    dispatch(dispatchItem(item))
                }, 2000);
            }
        })
        .catch(e => { console.log('에러', e) });
}
