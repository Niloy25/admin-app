import axios from "../helpers/axios"
import { pageConstant } from "./constant"

export const createPage = (form) => {
    return async dispatch => {
        dispatch({ type: pageConstant.CREATE_PAGE_REQUEST })
        try {
            const res = await axios.post('/page/create', form)
            console.log(res);
            if(res.status === 201){
                dispatch({ 
                    type: pageConstant.CREATE_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                })
            }
            else{
                dispatch({ 
                    type: pageConstant.CREATE_PAGE_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error.response);
        }
    }
}