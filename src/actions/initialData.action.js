import axios from "../helpers/axios";
import { categoryConstant, productConstant } from "./constant"

export const getInitialData = () => {
    return async dispatch => {
        
        const res = await axios.get('/initialdata');
        if(res.status === 200){
            const { categories, products } = res.data
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstant.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            })
        }
        console.log(res);
    }
}