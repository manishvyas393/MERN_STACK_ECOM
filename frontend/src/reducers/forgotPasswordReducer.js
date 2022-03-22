import {
      FORGOT_PASSWORD_FAIL,
      FORGOT_PASSWORD_SUCCESS,
      FORGOT_PASSWORD_REQUEST,


      RESET_FORGOT_PASSWORD_FAIL,
      RESET_FORGOT_PASSWORD_REQUEST,
      RESET_FORGOT_PASSWORD_SUCCESS,

      CLEAR_ERROR
} from "../constants/forgotPassword";

export const forgotPasswordReducer = (state = {}, action) => {
      switch (action.type) {
            case FORGOT_PASSWORD_REQUEST: 
                  return {
                        ...state,
                        loading: true,
                        error: null
                  }
            case FORGOT_PASSWORD_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        message: action.payload
                  }
            case FORGOT_PASSWORD_FAIL:
                  return {
                        ...state,
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



export const ResetForgotPasswordReducer = (state = {}, action) => {
      switch (action.type) {
            case RESET_FORGOT_PASSWORD_REQUEST:
                  return {
                        ...state,
                        loading: true,
                        error: null
                  }
            case RESET_FORGOT_PASSWORD_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        success: action.payload
                  }
            case RESET_FORGOT_PASSWORD_FAIL:
                  return {
                        ...state,
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