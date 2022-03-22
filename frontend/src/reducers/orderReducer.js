import {
      CREATE_NEW_ORDER_REQUEST,
      CREATE_NEW_ORDER_SUCCESS,
      CREATE_NEW_ORDER_FAIL,

      GET_USER_ORDER_REQUEST,
      GET_USER_ORDER_SUCCESS,
      GET_USER_ORDER_FAIL,

      GET_ORDER_DETAILS_REQUEST,
      GET_ORDER_DETAILS_SUCCESS,
      GET_ORDER_DETAILS_FAIL,

      CLEAR_ERROR
} from "../constants/orderConstants"

export const NewOrderReducer = (state = {}, action) => {
      switch (action.type) {
            case CREATE_NEW_ORDER_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case CREATE_NEW_ORDER_SUCCESS: 
                  return {
                        loading: false,
                        order: action.payload,
                  }
            case CREATE_NEW_ORDER_FAIL:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case CLEAR_ERROR:
                  return {
                        ...state,
                        error: null
                  }
            default:
                  return state
      }
}

export const MyOrdersReducers = (state = {orders:[]}, action) => {
      switch (action.type) {
            case GET_USER_ORDER_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case GET_USER_ORDER_SUCCESS:
                  return {
                        loading: false,
                        orders: action.payload,
                  }
            case GET_USER_ORDER_FAIL:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case CLEAR_ERROR:
                  return {
                        ...state,
                        error: null
                  }
            default:
                  return state
      }
}
export const MyOrderDetailsReducers = (state = { orderDetails: [] }, action) => {
      switch (action.type) {
            case GET_ORDER_DETAILS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case GET_ORDER_DETAILS_SUCCESS:
                  return {
                        loading: false,
                        orderDetails: action.payload,
                  }
            case GET_ORDER_DETAILS_FAIL:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case CLEAR_ERROR:
                  return {
                        ...state,
                        error: null
                  }
            default:
                  return state
      }
}