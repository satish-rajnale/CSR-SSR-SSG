import { createSlice, configureStore } from "@reduxjs/toolkit";
import { DocumentSnapshot } from "firebase/firestore";
import RestaurantType from "../types";
const restoSlice = createSlice({
  name: "counter",
  initialState: {
    LastDoc: <DocumentSnapshot>{},
    allData: <RestaurantType[]>[],
    cart: <Array<{ id: string; count: number }>>[],
  },
  reducers: {
    addRestoData: (state, action) => {
      const modArr = [...action.payload.allData].map((item) => {
        item.count = 0;
        return item;
      });
      state.allData = modArr;
      state.LastDoc = action.payload.LastDoc;
    },
    incrementCartCount: (state, action) => {
      const isInCart = state.cart.findIndex(
        (obj) => obj.id == action.payload.receivedId
      );
      if (isInCart != -1) {
        let newVal = state.cart[isInCart].count + 1;

        state.cart[isInCart].count = newVal;
      }
      state.cart.push({ id: action.payload.receivedId, count: 1 });
    },

    reduceCartCount: (state, action) => {
      const isInCart = state.cart.findIndex(
        (obj) => obj.id == action.payload.receivedId
      );
      if (isInCart != -1) {
        if (state.cart[isInCart].count != 0) {
          let newVal = state.cart[isInCart].count - 1;

          state.cart[isInCart].count = newVal;

          state.cart[isInCart].count = newVal;
        }
      }
    },

    deleteRecord: (state, action) => {
      const isInCart = state.cart.findIndex(
        (obj) => obj.id == action.payload.id
      );
      if (isInCart != -1) {
        state.cart.splice(isInCart, 1);
      }
    },
  },
});

export const {
  addRestoData,
  incrementCartCount,
  reduceCartCount,
  deleteRecord,
} = restoSlice.actions;

export const store = configureStore({
  reducer: restoSlice.reducer,
});
