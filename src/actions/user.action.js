import axios from "../helpers/axios";
import { userComponent } from "./constant"

export const signup = (user) => {
    return async (dispatch) => {

        dispatch({ type: userComponent.USER_REGISTER_REQUEST })
        const res = await axios.post('/admin/signup', {
            ...user
        });

        if(res.status === 201){
            const { message } = res.data;
            dispatch({
                type: userComponent.USER_REGISTER_SUCCESS,
                payload: {
                    message
                }
            })
        }
        else{
            if(res.status === 500){
                dispatch({
                    type: userComponent.USER_REGISTER_FAILURE,
                    paload: {
                        error: res.data.error
                    }
                })
            }
        }
    }
}