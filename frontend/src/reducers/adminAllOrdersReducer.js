import {
      GET_ADMIN_ORDER_REQUEST,
      GET_ADMIN_ORDER_SUCCESS,
      GET_ADMIN_ORDER_FAIL,

      ADMIN_DELETE_ORDER_REQUEST,
      ADMIN_DELETE_ORDER_SUCCESS,
      ADMIN_DELETE_ORDER_FAIL,
      ADMIN_DELETE_ORDER_RESET,

      CLEAR_ERROR,

      ADMIN_UPDATE_ORDER_REQUEST,
      ADMIN_UPDATE_ORDER_SUCCESS,
      ADMIN_UPDATE_ORDER_FAIL,
      ADMIN_UPDATE_ORDER_RESET
} from "../constants/adminOrderConstants"


export const getAllAdminOrdersReducer = (state = { adminOrders: [] }, action) => {
      switch (action.type) {
            case GET_ADMIN_ORDER_REQUEST:
                  return {
                        loading: true,
                        adminOrders: []
                  }
            case GET_ADMIN_ORDER_SUCCESS:
                  return {
                        loading: false,
                        adminOrders: action.payload.order,
                        totalAmount: action.payload.totalAmount
                  }
            case GET_ADMIN_ORDER_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case CLEAR_ERROR:
                  return {
                        ...state,
                        loading: false,
                        error: null
                  }
            default:
                  return state;
      }
}
export const adminDeleteOrderReducer = (state = {}, action) => {
      switch (action.type) {
            case ADMIN_DELETE_ORDER_REQUEST:
                  return {
                        ...state,
                        loading: true
                  };
            case ADMIN_DELETE_ORDER_SUCCESS:
                  return {
                        loading: false,
                        isDeleted: action.payload
                  };
            case ADMIN_DELETE_ORDER_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case ADMIN_DELETE_ORDER_RESET:
                  return {
                        ...state,
                        isDeleted: false
                  }
            case CLEAR_ERROR:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state;
      }
}
export const adminUpdateOrderReducer = (state = {}, action) => {
      switch (action.type) {
            case ADMIN_UPDATE_ORDER_REQUEST:
                  return {
                        ...state,
                        loading: true
                  };
            case ADMIN_UPDATE_ORDER_SUCCESS:
                  return {
                        loading: false,
                        isUpdated: action.payload
                  };
            case ADMIN_UPDATE_ORDER_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case ADMIN_UPDATE_ORDER_RESET:
                  return {
                        ...state,
                        isUpdated: false
                  }
            case CLEAR_ERROR:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state;
      }
}