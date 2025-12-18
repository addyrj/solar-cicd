import { SET_DATA_FROM_SOURCE } from "../Constant/DemoConstant";

const initialState = {
    apiData: [],
    apiFilterData: []
}

const DemoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_FROM_SOURCE:
            return {
                ...state,
                apiData: action.payload,
                apiFilterData: action.payload
            }

        default:
            return state;
    }
}

export default DemoReducer