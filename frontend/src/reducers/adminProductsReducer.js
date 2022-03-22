import {
      ADMIN_ALL_PRODUCT_REQUEST,
      ADMIN_ALL_PRODUCT_SUCCESS,
      ADMIN_ALL_PRODUCT_FAIL,

      ADMIN_DELETE_PRODUCT_REQUEST,
      ADMIN_DELETE_PRODUCT_SUCCESS,
      ADMIN_DELETE_PRODUCT_FAIL,
      ADMIN_DELETE_PRODUCT_RESET,

      ADMIN_NEW_PRODUCT_REQUEST,
      ADMIN_NEW_PRODUCT_SUCCESS,
      ADMIN_NEW_PRODUCT_FAIL,
      ADMIN_NEW_PRODUCT_RESET,

      ADMIN_UPDATE_PRODUCT_REQUEST,
      ADMIN_UPDATE_PRODUCT_SUCCESS,
      ADMIN_UPDATE_PRODUCT_FAIL,
      ADMIN_UPDATE_PRODUCT_RESET,
      
      CLEAR_ERROR,
      
      ADMIN_UPDATE_PRODUCT_IMAGES_REQUEST,
      ADMIN_UPDATE_PRODUCT_IMAGES_SUCCESS,
      ADMIN_UPDATE_PRODUCT_IMAGES_FAIL,
      ADMIN_UPDATE_PRODUCT_IMAGES_RESET,
      
      ADMIN_PRODUCT_REVIEW_REQUEST,
      ADMIN_PRODUCT_REVIEW_SUCCESS,
      ADMIN_PRODUCT_REVIEW_FAIL,

      
      ADMIN_DELETE_PRODUCT_REVIEW_REQUEST,
      ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS,
      ADMIN_DELETE_PRODUCT_REVIEW_FAIL,
      ADMIN_DELETE_PRODUCT_REVIEW_RESET,
     

} from "../constants/adminProductsConstants";

export const getAllAdminProductsReducer = (state = { adminProducts: [] }, action) => {
      switch (action.type) {
            case ADMIN_ALL_PRODUCT_REQUEST:
                  return {
                        loading: true,
                        adminProducts: []
                  }
            case ADMIN_ALL_PRODUCT_SUCCESS:
                  return {
                        loading: false,
                        adminProducts: action.payload
                  }
            case ADMIN_ALL_PRODUCT_FAIL:
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

export const adminDeleteProductReducer = (state = {}, action) => {
      switch (action.type) {
            case ADMIN_DELETE_PRODUCT_REQUEST:
                  return {
                        ...state,
                        loading: true
                  };
            case ADMIN_DELETE_PRODUCT_SUCCESS:
                  return {
                        loading: false,
                        isDeleted: action.payload
                  };
            case ADMIN_DELETE_PRODUCT_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case ADMIN_DELETE_PRODUCT_RESET:
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
export const adminNewProductReducer = (state = {}, action) => {
      switch (action.type) {
            case ADMIN_NEW_PRODUCT_REQUEST:
                  return {
                        ...state,
                        loading: true
                  };
            case ADMIN_NEW_PRODUCT_SUCCESS:
                  return {
                        loading: false,
                        isCreated: action.payload
                  };
            case ADMIN_NEW_PRODUCT_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case ADMIN_NEW_PRODUCT_RESET:
                  return {
                        ...state,
                        isCreated: false
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

export const adminUpdateProductDetailsReducer = (state = {}, action) => {
      switch (action.type) {
            case ADMIN_UPDATE_PRODUCT_REQUEST:
                  return {
                        ...state,
                        loading: true
                  };
            case ADMIN_UPDATE_PRODUCT_SUCCESS:
                  return {
                        loading: false,
                        isUpdated: action.payload
                  };
            case ADMIN_UPDATE_PRODUCT_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case ADMIN_UPDATE_PRODUCT_RESET:
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
export const adminUpdateProductImagesReducer = (state = {}, action) => {
      switch (action.type) {
            case ADMIN_UPDATE_PRODUCT_IMAGES_REQUEST:
                  return {
                        ...state,
                        loading: true
                  };
            case ADMIN_UPDATE_PRODUCT_IMAGES_SUCCESS:
                  return {
                        loading: false,
                        isUpdated: action.payload
                  };
            case ADMIN_UPDATE_PRODUCT_IMAGES_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case ADMIN_UPDATE_PRODUCT_IMAGES_RESET:
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
export const adminGetProductReviewReducer = (state = {}, action) => {
      switch (action.type) {
            case ADMIN_PRODUCT_REVIEW_REQUEST:
                  return {
                        ...state,
                        loading: true
                  };
            case ADMIN_PRODUCT_REVIEW_SUCCESS:
                  return {
                        loading: false,
                        reviews: action.payload
                  };
            case ADMIN_PRODUCT_REVIEW_FAIL:
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
                  return state;
      }
}
export const adminDeleteProductReviewReducer = (state = {}, action) => {
      switch (action.type) {
            case ADMIN_DELETE_PRODUCT_REVIEW_REQUEST:
                  return {
                        ...state,
                        loading: true
                  };
            case ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS:
                  return {
                        loading: false,
                        isDeleted: action.payload
                  };
            case ADMIN_DELETE_PRODUCT_REVIEW_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload
                  }
            case ADMIN_DELETE_PRODUCT_REVIEW_RESET:
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
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERROR })
}