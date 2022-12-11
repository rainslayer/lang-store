import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "src/const/types";
import { DispatchType } from "src/store";

const localStorageKey = "cart";

export interface ICartState {
  cart: Record<string, Omit<ICartItem, "name">>;
  count: number;
}

const initialState = (): ICartState => {
  const storedItems: ICartState = JSON.parse(
    localStorage.getItem(localStorageKey) ?? "{}"
  );

  return {
    cart: storedItems.cart ?? {},
    count: storedItems.count ?? 0,
  };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    _calculateTotalCount: (state) => {
      state.count = Object.values(state.cart).reduce(
        (acc, elem) => acc + elem.amount,
        0
      );
    },
    _addToCart: (state, action: PayloadAction<ICartItem>) => {
      const { amount, image, name, price } = action.payload;
      state.cart[name] = {
        image,
        price,
        amount: (state.cart[name]?.amount ?? 0) + amount,
      };
    },
    _setAmmount: (state, action: PayloadAction<ICartItem>) => {
      const { amount, name } = action.payload;
      if (amount === 0) {
        delete state.cart[name];
      } else {
        state.cart[name].amount = amount;
      }
    },
    _clearCart: (state) => {
      state.cart = {};
      state.count = 0;
    },
    _updateLS: (state) => {
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
  },
});

export const {
  _calculateTotalCount,
  _addToCart,
  _setAmmount,
  _clearCart,
  _updateLS,
} = cartSlice.actions;

export default cartSlice.reducer;

export const addToCart = (payload: ICartItem) => (dispatch: DispatchType) => {
  dispatch(_addToCart(payload));
  dispatch(_calculateTotalCount());
  dispatch(_updateLS());
};

export const setAmmount = (payload: ICartItem) => (dispatch: DispatchType) => {
  dispatch(_setAmmount(payload));
  dispatch(_calculateTotalCount());
  dispatch(_updateLS());
};

export const clearCart = () => (dispatch: DispatchType) => {
  dispatch(_clearCart());
  dispatch(_updateLS());
};
