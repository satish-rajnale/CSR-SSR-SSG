import { createSlice, configureStore } from "@reduxjs/toolkit";
import { DocumentSnapshot } from "firebase/firestore";
import RestaurantType from "../types";
const restoSlice = createSlice({
  name: "counter",
  initialState: {
    LastDoc: <DocumentSnapshot>{},
    allData: <RestaurantType[]>[],
  },
  reducers: {
    addRestoData: (state, action) => {
      state.allData = action.payload.allData;
      state.LastDoc = action.payload.LastDoc;
    },
    updateCategory: (state, action) => {
      state.allData = state.allData.map((obj: RestaurantType) => {
        if (obj.id == action.payload.id) {
          obj.category = action.payload.category;
        }
        return obj;
      });
    },
  },
});

export const { addRestoData, updateCategory } = restoSlice.actions;

export const store = configureStore({
  reducer: restoSlice.reducer,
});
