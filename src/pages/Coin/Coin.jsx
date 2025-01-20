import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null); // Initialize as null to handle the loading state better
  const [loading, setLoading] = useState(true); // Loading state
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-bCa3YTSXQ41v4qc1eQSCKfgT' },
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Stop loading once the API call completes
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [currency, coinId]);

  if (loading) {
    // Display the loader while loading is true
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  if (!coinData || !coinData.image) {
    // Fallback if data is not available or invalid
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
    </div>
  );
};

export default Coin;
