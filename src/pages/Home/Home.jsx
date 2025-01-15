import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../context/CoinContext';

const Home = () => {
  const { allCoins, currency } = useContext(CoinContext); // Correct destructuring

  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoins); // Use allCoins here
  }, [allCoins]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos
        </p>
        <form>
          <input type="text" placeholder="Search crypto.." />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: 'center' }}>24H Change</p>
          <p className="market-cap">Marketcap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <div className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>{currency.symbol}{item.current_price.toLocaleString()}</p>


            <p style={{ textAlign: 'center' }} className={item.price_change_percentage_24h>0?"green":"red"}>
              {Math.floor(item.price_change_percentage_24h*100)/100}
            </p>


            {/* <p style={{ textAlign: 'center' }}>{item.price_change_percentage_24h}%</p> */}
            <p className="market-cap">{currency.symbol}{item.market_cap.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
