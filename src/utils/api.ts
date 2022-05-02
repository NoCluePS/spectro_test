import axios from 'axios'

const BASE_URL = "https://spectrocoin.com/scapi/ticker/BTC";

export const getGBP = async () => await axios
  .get(`${BASE_URL}/GBP`, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  })
  .then(({ data }) => data.last);

export const getEUR = async () => await axios
  .get(`${BASE_URL}/EUR`, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  })
  .then(({ data }) => data.last);

export const getUSD = async () => await axios
  .get(`${BASE_URL}/USD`, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  })
  .then(({ data }) => data.last);