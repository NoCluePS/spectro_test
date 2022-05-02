import React from "react";
import styled from "styled-components";

interface IProps {
  currency: string;
  btcAmount: number;
  price: number;
  onDelete: () => void;
}

export const FiatCard: React.FC<IProps> = ({
  currency,
  btcAmount,
  price,
  onDelete,
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

  return (
    <FiatCardWrapper>
      {currency} - {formatter.format(btcAmount / price)}{" "}
      <button onClick={onDelete}>X</button>
    </FiatCardWrapper>
  );
};

const FiatCardWrapper = styled.div`
  display: flex;
  max-width: 20rem;
  word-break: break-all;
  margin: 0.5rem 0;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  button {
    margin-left: 1rem;
  }
`;
