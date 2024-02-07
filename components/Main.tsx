import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';

declare global {
    interface Window {
        ethereum: any;
    }
}

export const Main = (props) => {

    const [transactions, setTransactions] = useState([])

    const Default = ({ wallet }) => {
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
                <button onClick={() => checkForTransactions(wallet)}>Check for Transactions</button>
            </div>
        );
    } 

    const checkForTransactions = async (wallet: string) => {
        console.log("Checking for transactions");
        try {
            const response = await fetch(`http://34.94.156.159:3000/api/pending_transactions/${wallet}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Error checking the transactions:', error);
        }
    }

    const sendWithholding = async (transaction) => {
        let signer = null;
        let provider;
        if (window.ethereum == null){
            console.log("MetaMask not installed: using read-only defaults");
            provider = ethers.getDefaultProvider('homestead');        
        }else{
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = provider.getSigner();
            let tx = await signer.sendTransaction({
                to: transaction.to,
                value: ethers.parseEther(transaction.value),
            });
            console.log("Transaction sent: ", tx);
        }

    }

    useEffect(() => {
        checkForTransactions(props.wallet);
    }, [props.wallet]);

  return (
    <div>
      <Default wallet={props.wallet} />
      {transactions.length > 0 ? <p>There are {transactions.length} transactions that need your attention</p> : null}
      <div className="transactions">
        {transactions.map((transaction) => {
            return (
                <>
                    <div>
                        <p>Value (Ether): {transaction.value}</p>
                        <p>From (You): {transaction.from}</p>
                        <p>Receiver (Your withholding wallet): {transaction.to}</p>
                    </div>
                    <div>
                        <button onClick={(transaction)=>sendWithholding(transaction)}>Send Withholding</button>
                        <button>Later</button>
                    </div>
                </>
            )
        })}
      </div>
    </div>
  )
}

export default Main;