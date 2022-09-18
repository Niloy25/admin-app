import axios from "../helpers/axios"
import { getInitialData } from "./initialData.action";

export const addProduct = (form) => {
    return async (dispatch) => {
        const res = await axios.post('/product/create', form);
        console.log(res);
        dispatch(getInitialData())
    }
}