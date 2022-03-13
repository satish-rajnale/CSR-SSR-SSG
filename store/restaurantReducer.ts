import { createSlice, configureStore } from "@reduxjs/toolkit";
import { DocumentSnapshot } from "firebase/firestore";
import RestaurantType from "../types";
const restoSlice = createSlice({
  name: "counter",
  initialState: {
    LastDoc: <DocumentSnapshot>{},
    allData: <RestaurantType[]>[],
    cart: <Array<{ id: string; count: number }>>[],
    subtotal: 0,
  },
  reducers: {
    addRestoData: (state, action) => {
      const modArr = [...action.payload.allData].map((item) => {
        // item.count = 0;
        // return item;
        return Object.assign({}, item, { ...item, count: 0 });
      });
      state.allData = state.allData.concat(modArr);
      state.LastDoc = action.payload.LastDoc;
    },
    incrementCartCount: (state, action) => {
      const isInCart = state.cart.findIndex(
        (obj) => obj.id == action.payload.id
      );
      if (isInCart != -1) {
        let newVal = state.cart[isInCart].count + 1;

        state.cart[isInCart].count = newVal;
        state.subtotal = subtotalCalc(state);
      } else {
        state.cart.push({ id: action.payload.id, count: 1 });
        state.subtotal = subtotalCalc(state);
      }
    },

    reduceCartCount: (state, action) => {
      const isInCart = state.cart.findIndex(
        (obj) => obj.id == action.payload.id
      );
      if (isInCart != -1) {
        if (state.cart[isInCart].count != 0) {
          let newVal = state.cart[isInCart].count - 1;
          if (newVal == 0) {
            state.cart.splice(isInCart, 1);
            state.subtotal = subtotalCalc(state);
          } else {
            state.cart[isInCart].count = newVal;
            state.subtotal = subtotalCalc(state);
          }
        }
      }
    },

    deleteRecord: (state, action) => {
      const isInCart = state.cart.findIndex(
        (obj) => obj.id == action.payload.id
      );
      if (isInCart != -1) {
        state.cart.splice(isInCart, 1);
        state.subtotal = subtotalCalc(state);
      }
    },
    DESTROY_CART: (state, action) => {
      state.cart = [];
      state.subtotal = 0;
    },
  },
});

function subtotalCalc(state) {
  if (state.cart.length != 0) {
    const prodList = [];
    for (let obj of state.allData) {
      for (let cartObj of state.cart) {
        if (cartObj.id == obj.id && cartObj.count != 0) {
          prodList.push(cartObj.count * obj.price);
        }
      }
    }
    let subtotalCalc = prodList.reduce((acc, val) => {
      return (acc += val);
    }, 0);

    return subtotalCalc.toFixed(2);
  }
  return 0;
}

export const {
  addRestoData,
  incrementCartCount,
  reduceCartCount,
  deleteRecord,
} = restoSlice.actions;

export const store = configureStore({
  reducer: restoSlice.reducer,
});
