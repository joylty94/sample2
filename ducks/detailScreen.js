import axios from 'axios';

export const LOADING = 'detailScreen/LOADING';
export const SUCCESS = "detailScreen/SUCCESS";
export const LIKED = "detailScreen/LIKED";

export function detailScreenSuccess(item) {
    return {
        type: SUCCESS,
        item
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
    liked: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SUCCESS:
            return {
                ...state,
                item: action.item,
                liked: action.item.liked
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
    dispatch(detailScreenSuccess(item));
};

export const dispatchLiked = () => async (dispatch, getstate) => {
    const stateItem = getstate();
    const item = stateItem.detailScreen.item;
    if(item.liked){
        console.log('라이크 토큰', item.token)
        console.log('라이크 포스트 아이디', item.post_id)
        await axios.delete(`http://35.243.89.78:8082/v1/like/post/${item.post_id}`,
            {
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': item.token
                },
            })
            .then(response => {
                if (response.data.result_code === 0) {
                    item.liked = false;
                    item.likes = item.likes - 1;
                    console.log('item정보', item)
                    dispatch(detailScreenLiked(item))
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
                if(response.data.result_code === 0){
                    item.liked= true;
                    item.likes= item.likes + 1;
                    console.log('item정보', item)
                    dispatch(detailScreenLiked(item))
                }
            })
            .catch(e => { console.log('에러', e) });
    }
};