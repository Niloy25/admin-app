import { userComponent } from "../actions/constant";

const initState = {
    error: null, 
    message: '',
    loading: false
}

const userReducer = (state= initState, action) => {
    switch(action.type){
        case userComponent.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;
        case userComponent.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
        break;
        case userComponent.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        break;
    }
    return state;
}

export default userReducer;