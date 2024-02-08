import React from 'react';
import CurrencyProvider from "./components/context/CurrencyContext";
import Currency from "./Currency";

const Curr = () => {
  return (
    <CurrencyProvider>
        <Currency />
    </CurrencyProvider>
  )
}

export default Curr;
