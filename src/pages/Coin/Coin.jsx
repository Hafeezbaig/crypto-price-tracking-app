import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams(); // Get the coin ID from the route params
  const [coinData, setCoinData] = useState(null); // State for coin details
  const [historicalData, setHistoricalData] = useState(null); // State for historical data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [historicalLoading, setHistoricalLoading] = useState(true); // Separate loading state for historical data
  const { currency } = useContext(CoinContext); // Context to get the currency

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-bCa3YTSXQ41v4qc1eQSCKfgT',
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      if (!response.ok) throw new Error('Failed to fetch coin data');
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error('Coin data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-bCa3YTSXQ41v4qc1eQSCKfgT',
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      if (!response.ok) throw new Error('Failed to fetch historical data');
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error('Historical data error:', err);
    } finally {
      setHistoricalLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]);

  if (loading || historicalLoading) {
    // Display spinner while data is loading
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  if (!coinData || !historicalData || !coinData.image || !coinData.market_data) {
    // Display error message if data is invalid or unavailable
    return <div>Error loading coin data. Please try again later.</div>;
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
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
          <li>Current Price</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.current_price[currency.name]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.market_cap[currency.name]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hours High</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.high_24h[currency.name]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hours Low</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.low_24h[currency.name]?.toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
