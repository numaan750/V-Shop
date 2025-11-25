// context/Reduxprovider.js
"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeCart } from "@/redux/cartslice";

// ✅ NEW - Inner component to dispatch initializeCart
function CartInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Component mount par cart initialize karo
    dispatch(initializeCart());
  }, [dispatch]);

  return <>{children}</>;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <CartInitializer>
        {children}
      </CartInitializer>
    </Provider>
  );
}