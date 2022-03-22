import {
      ADMIN_ALL_USERS_REQUEST,
      ADMIN_ALL_USERS_SUCCESS,
      ADMIN_ALL_USERS_FAIL,

      ADMIN_DELETE_USER_REQUEST,
      ADMIN_DELETE_USER_SUCCESS,
      ADMIN_DELETE_USER_FAIL,
      ADMIN_DELETE_USER_RESET,

      ADMIN_GET_USER_DETAILS_REQUEST,
      ADMIN_GET_USER_DETAILS_SUCCESS,
      ADMIN_GET_USER_DETAILS_FAIL,

      ADMIN_UPDATE_USER_DETAILS_REQUEST,
      ADMIN_UPDATE_USER_DETAILS_SUCCESS,
      ADMIN_UPDATE_USER_DETAILS_FAIL,

      CLEAR_ERROR,
      ADMIN_UPDATE_USER_RESET,
     
} from "../constants/adminUsersConstants"

export const adminGetAllUsersReducer = (state = { allUsers: [] }, action) => {
      switch (action.type) {
            case ADMIN_ALL_USERS_REQUEST:
                  return {
                        loading: true,
                        allUsers: []
                  }
            case ADMIN_ALL_USERS_SUCCESS:
                  return {
                        loading: false,
                        allUsers: action.payload
                  }
            case ADMIN_ALL_USERS_FAIL:
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
export const adminDeleteUserReducer = (state = {}, action) => {
      switch (action.type) {
            case ADMIN_DELETE_USER_REQUEST:
                  return {
                        ...state,
                        loading: true
                  };
            case ADMIN_DELETE_USER_SUCCESS:
                  return {
                        loading: false,
                        isDeleted: action.payload
                  };
            case ADMIN_DELETE_USER_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case ADMIN_DELETE_USER_RESET:
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
export const adminGetUserDetailsReducer= (state = { adminRequestedUser: {} }, action) => {
      switch (action.type) {
            case ADMIN_GET_USER_DETAILS_REQUEST:
                  return {
                        loading: true,
                  };
            case ADMIN_GET_USER_DETAILS_SUCCESS:
                  return {
                        loading: false,
                        adminRequestedUser: action.payload,
                  }
            case ADMIN_GET_USER_DETAILS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        adminRequestedUser: null,
                        error: action.payload
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
export const adminUpdateUserReducer = (state = {}, action) => {
      switch (action.type) {
            case ADMIN_UPDATE_USER_DETAILS_REQUEST:
                  return {
                        ...state,
                        loading: true
                  };
            case ADMIN_UPDATE_USER_DETAILS_SUCCESS:
                  return {
                        loading: false,
                        isUpdated: action.payload
                  };
            case ADMIN_UPDATE_USER_DETAILS_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case ADMIN_UPDATE_USER_RESET:
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
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERROR })
}