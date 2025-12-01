



import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'

const Coin = () => {
  const { coinId } = useParams()

  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null)
  const { currency, AZN_RATE_TO_USD } = useContext(CoinContext)

  const fetchCoinData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const options = {
      method: 'GET',
      headers: { 'x-cg-demo-api-key': 'CG-oNrESPx7dsnEoghsJnHgB18A' }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error("Coin Data Error:", error);
    }
  }

const fetchHistoricalData = async () => {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10&interval=daily`;
  
  const options = {
    method: 'GET',
    headers: { 'x-cg-demo-api-key': 'CG-oNrESPx7dsnEoghsJnHgB18A' }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    setHistoricalData(data);
  } catch (error) {
    console.error("Historical Data Error:", error);
  }
}


  useEffect(() => {
    setCoinData(null)
    setHistoricalData(null)
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId])

  if (!coinData || !coinData.market_data || !historicalData) {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    )
  }

  const currentPriceUSD = coinData.market_data.current_price?.usd ?? 0;
  const marketCapUSD = coinData.market_data.market_cap?.usd ?? 0;
  const hourHighUsd = coinData.market_data.high_24h?.usd ?? 0;
  const hourLowUsd = coinData.market_data.low_24h?.usd ?? 0;

  const currentPrice =
    currency.name === "azn"
      ? (currentPriceUSD * AZN_RATE_TO_USD).toLocaleString()
      : currentPriceUSD.toLocaleString();

  const MarketCap =
    currency.name === "azn"
      ? (marketCapUSD * AZN_RATE_TO_USD).toLocaleString()
      : marketCapUSD.toLocaleString();

  const HourHigh =
    currency.name === "azn"
      ? (hourHighUsd * AZN_RATE_TO_USD).toLocaleString()
      : hourHighUsd.toLocaleString();

  const HourLow =
    currency.name === "azn"
      ? (hourLowUsd * AZN_RATE_TO_USD).toLocaleString()
      : hourLowUsd.toLocaleString();

  const symbol = currency.symbol;


  return (
    <div className='coin'>
      <div className='coin-name'>
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>

      <div className='coin-chart'>
        <LineChart historicalData={historicalData} />
      </div>

      <div className='coin-info'>
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>

        <ul>
          <li>Current Price</li>
          <li>{symbol} {currentPrice}</li>
        </ul>

        <ul>
          <li>Market Cap</li>
          <li>{symbol} {MarketCap}</li>
        </ul>

        <ul>
          <li>24 Hour high</li>
          <li>{symbol} {HourHigh}</li>
        </ul>

        <ul>
          <li>24 Hour low</li>
          <li>{symbol} {HourLow}</li>
        </ul>
      </div>
    </div>
  )
}

export default Coin
