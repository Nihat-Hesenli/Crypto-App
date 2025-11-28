import { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([])
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const AZN_RATE_TO_USD = 1.70;

    const contextValue = {

        allCoin,currency,setCurrency,AZN_RATE_TO_USD


    }

    const fetchAllCoin = async () => {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h`;
        const options = {
            method: 'GET',
            headers: { 'x-cg-demo-api-key': 'CG-oNrESPx7dsnEoghsJnHgB18A' },
            body: undefined
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            setAllCoin(data);



            console.log(data);
        } catch (error) {
            console.error(error);
        }



    }


    useEffect(()=> {
      fetchAllCoin();

    },[currency])

    return (
        <CoinContext.Provider value={contextValue}>

            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;
