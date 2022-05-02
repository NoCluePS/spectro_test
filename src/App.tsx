/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiatCard } from "./components/fiatCard";
import { getGBP, getEUR, getUSD } from "./utils/api";

enum Currencies {
  usd = "usd",
  gbp = "gbp",
  eur = "eur",
}

function App() {
  const [btcValue, setBtcValue] = useState(0);
  const [showCurrencies, setShowCurrencies] = useState({
    USD: true,
    GBP: true,
    EUR: true,
  });
  const [prices, setPrices] = useState({
    usd: 0,
    gbp: 0,
    eur: 0,
  });

  useEffect(() => {
    if (!prices.eur) {
      Promise.all([getEUR(), getGBP(), getUSD()]).then((values) => {
        setPrices({ usd: values[2], gbp: values[1], eur: values[0] });
      });
    }

    const upadteInterval = setInterval(() => {
      Promise.all([getEUR(), getGBP(), getUSD()]).then((values) => {
        setPrices({ usd: values[2], gbp: values[1], eur: values[0] });
      });
    }, 60000);

    return () => clearInterval(upadteInterval);
  }, []);

  return (
    <AppContainer>
      <FormContainer>
        <Title>BTC Calculator</Title>
        <InputsContainer>
          <input
            placeholder="Input BTC value"
            type="number"
            onChange={(e) => setBtcValue(+e.target.value)}
          />
          {Object.values(showCurrencies).some((value) => value === false) && (
            <select
              onChange={(e) =>
                setShowCurrencies({ ...showCurrencies, [e.target.value]: true })
              }
            >
              <option selected>-- select currency --</option>

              {Object.keys(showCurrencies).map(
                (currency) =>
                  !showCurrencies[currency as "USD"] && (
                    <option key={currency}>{currency}</option>
                  )
              )}
            </select>
          )}
        </InputsContainer>
        <div>
          {Object.keys(showCurrencies).map((currency) => {
            return showCurrencies[currency as "USD"] ? (
              <FiatCard
                onDelete={() =>
                  setShowCurrencies({ ...showCurrencies, [currency]: false })
                }
                btcAmount={btcValue}
                currency={currency}
                price={
                  prices[currency.toLowerCase() as keyof typeof Currencies]
                }
                key={currency}
              />
            ) : null;
          })}
        </div>
      </FormContainer>
    </AppContainer>
  );
}

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 0.5rem;
  }

  select {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h4`
  text-align: center;
  margin-top: 0;
`;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormContainer = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0 0.5rem 1.5rem;
  padding: 2rem;
  border-radius: 1rem;
`;

export default App;
