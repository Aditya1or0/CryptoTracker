import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((coin) => {
      return coin.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto MarketPlace
        </h1>
        <p>Buy and sell cryptocurrencies.</p>
        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            value={input}
            required
            type="text"
            placeholder="Search crypto.."
          />

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {Array.isArray(displayCoin) &&
          displayCoin.slice(0, 10).map((coin, index) => {
            return (
              <div className="table-layout" key={coin.id}>
                <p>{coin.market_cap_rank}</p>
                {/* other coin details */}
                <div>
                  <img src={coin.image} alt="" />
                  <p>{coin.name + "-" + coin.symbol}</p>
                </div>
                <p>{currency.symbol + coin.current_price.toLocaleString()}</p>
                <p
                  className={
                    coin.price_change_percentage_24h > 0 ? "green" : "red"
                  }
                >
                  {Math.floor(coin.price_change_percentage_24h * 100)}
                </p>
                <p className="market-cap">
                  {currency.symbol} {coin.market_cap.toLocaleString()}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
