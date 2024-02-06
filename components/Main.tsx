import React from 'react'
import Prompt from './Prompt'


const Default = () => {
    return(
        <div
            style={{
                padding: 16,
                width: 200,
            }}>
            <h2>Taxiji</h2>
            <p>Don't worry... We're keeping a look out.</p>
            <p>
                There's no need to check the Taxiji extension,
                when there's a transaction that needs your attention, we'll let you know.
            </p>
            <button onClick={checkForTransactions}>Check for Transactions</button>
        </div>
    );
} 

const checkForTransactions = async () => {
    console.log("Checking for transactions");
    try {
        const response = await fetch('http://34.94.156.159:3000/api/wallet_transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log("Withholding Transaction data: ", data);
    } catch (error) {
        console.error('Error checking the transactions:', error);
    }
}


export const Main = () => {
  return (
    <div>
      <Default />
    </div>
  )
}

export default Main;