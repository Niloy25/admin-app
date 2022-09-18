import { pageConstant } from "../actions/constant";

const initState = {
    error: null,
    loading: false,
    page: {}
}

const pageReducer = (state = initState, action) => {
    switch(action.type){
        case pageConstant.CREATE_PAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case pageConstant.CREATE_PAGE_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case pageConstant.CREATE_PAGE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}

export default pageReducer;