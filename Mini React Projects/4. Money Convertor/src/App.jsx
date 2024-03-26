import React, { useEffect, useState } from "react";


function App() {
const [amount, setAmount] = useState(100);
const [from, setFrom] = useState('USD');
const [to, setTo] = useState('EUR');
const [exchange, setExchange] = useState('');
const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function convert() {
      try {
        if(!amount) return;
        if(from === to){
          setExchange(amount);
          return;
        } 
        setIsLoading(true);
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
        if (!response.ok) throw new Error('Something went wrong with Fetching data');
        const data = await response.json();
        setExchange((data.rates[to]).toFixed(2));
        setIsLoading(false);
      } catch (error) {
        console.warn(error.message);
      }
    }
    convert();
  }, [amount, from, to]);

  return (
    <>
    <input type="number" onChange={(e)=>setAmount(Number(e.target.value))} placeholder={amount} />
    <select value={from} onChange={(e)=>setFrom(e.target.value)} >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="TRY">TRY</option>
      <option value="GBP">GBP</option>
    </select>
    <select value={to} onChange={(e)=>setTo(e.target.value)} >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="TRY">TRY</option>
      <option value="GBP">GBP</option>
    </select>
    {isLoading ? <p>Loading...</p> : <p>{amount} {from} = {exchange} {to}</p>}
    </>
  );
}

export default App;