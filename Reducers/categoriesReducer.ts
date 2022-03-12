export const initialStateCategory = init();

function init() {
  return {
    loading: false,
    error: false,
    categories: [],
    isAddCategory: false,
    errorMsg: "",
    modalIsOpen: false,
    categoryExists: false,
    newCategory: "",
    selectedresto: {},
    selectedCategory: "",
  };
}
export default function categoryReducer(
  state: typeof initialStateCategory,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case "success":
      return {
        ...state,
        loading: false,
        categories: action.payload.List,
      };
    case "openMOdal":
      return {
        ...state,
        modalIsOpen: true,
        isAddCategory: action.payload.addingNew ?? false,
        selectedresto: action.payload.resto ?? state.selectedresto,
      };
    case "closeMOdal":
      const newList = action.payload?.newList;
      return {
        ...state,
        modalIsOpen: false,
        newCategory: "",
        error: false,
        categories: newList ? newList : state.categories,
      };
    case "addnew":
      return {
        ...state,
        newCategory: action.payload.newCategory,
      };
    case "error":
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload.errorMsg,
      };
    case "update":
      return {
        ...state,
        selectedCategory: action.payload.category,
      };
    case "filterList":
      return {
        ...state,

        categories: action.payload.List,
      };
    default:
      throw new Error();
  }
}
