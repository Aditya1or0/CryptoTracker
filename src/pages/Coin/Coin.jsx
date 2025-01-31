import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/Navbar/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const [error, setError] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-91Na3gF37jLkMimFB9B4FtwP",
      },
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      setError("Failed to fetch coin data");
      console.log(err);
    }
  };

  const fetchHistoricData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-91Na3gF37jLkMimFB9B4FtwP",
      },
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      setError("Failed to fetch historical data");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricData();
  }, [coinId, currency]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img
            src={coinData.image.large}
            alt="coinimg"
            onError={(e) => (e.target.src = "path/to/default-image.jpg")} // Fallback image if loading fails
          />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Crypto Price</li>
            <li>
              {currency.symbol}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market cap</li>
            <li>
              {currency.symbol}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>
              {currency.symbol}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
