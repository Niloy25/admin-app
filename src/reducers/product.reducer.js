import { productConstant } from "../actions/constant"

const initState = {
    products: []
}

const productReducer = (state=initState, action) => {
    switch(action.type){
        case productConstant.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
    }
    return state;
}

export default productReducer