import {
      UPDATE_PROFILE_REQUEST,
      UPDATE_PROFILE_SUCCESS,
      UPDATE_PROFILE_FAIL,
      UPDATE_PROFILE_RESET,

      UPDATE_PASSWORD_FAIL,
      UPDATE_PASSWORD_REQUEST,
      UPDATE_PASSWORD_SUCCESS,
      UPDATE_PASSWORD_RESET,

      CLEAR_ERROR
} from "../constants/userProfileConstants";

export const userProfileReducer = (state = {}, action) => {
      switch (action.type) {
            case UPDATE_PROFILE_REQUEST:
            case UPDATE_PASSWORD_REQUEST:
                  return {
                        ...state,
                        loading: true
                  }
            case UPDATE_PROFILE_SUCCESS:
            case UPDATE_PASSWORD_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        isUpdated: action.payload
                  }
            case UPDATE_PROFILE_RESET:
            case UPDATE_PASSWORD_RESET:
                  return {
                        ...state,
                        isUpdated: false
                  }
            case UPDATE_PROFILE_FAIL:
            case UPDATE_PASSWORD_FAIL:
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