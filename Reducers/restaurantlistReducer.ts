export const initialState = init();

function init() {
  return {
    loading: true,
    error: false,
    restaurantList: [],
    lastDoc: {},
    errorMsg: "",
  };
}
export default function fetchReducer(
  state: typeof initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case "fetching":
      return {
        ...state,
        loading: true,
      };
    case "success":
      return {
        ...state,
        loading: false,
        restaurantList: action.payload.List,
        lastDoc: action.payload.LastDoc,
      };
    case "error":
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload.errorMsg,
      };
    case "updatedList":
      return {
        ...state,
        loading: false,
        restaurantList: action.payload.List,
        lastDoc: action.payload.LastDoc
          ? action.payload.LastDoc
          : state.lastDoc,
      };
    default:
      throw new Error();
  }
}
