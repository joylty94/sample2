export const SUCCESS = "informationScreen/SUCCESS";

export function informationSuccess(token) {
    return {
        type: SUCCESS,
        token
    };
}

const initialState = {
    token: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SUCCESS:
            return {
                ...state,
                token: action.token
            };
        default:
            return state;
    }
}

export const dispatchToken = ( navigation, token ) => async (dispatch) => {
    dispatch(informationSuccess( token.data.result_data.token ));
    console.log('token', token.data.result_data.token)
    navigation.replace('TabNavigator', {token:token.data.result_data.token} )
};