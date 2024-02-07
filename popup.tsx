import { useState, useEffect } from "react"
import Login from "./components/Login"
import Main from "./components/Main"

function IndexPopup() {

  const [wallet, setWallet] = useState('');

  const getUserIfLoggedIn = async () => {
    chrome.cookies.get({ url: "https://nameless-thicket-51908-7757c6d88739.herokuapp.com/", name: "wallets" }, (cookie) => {
      if (cookie) {
        //decode the cookie
        const decodedCookie = decodeURIComponent(cookie.value);
        const data = JSON.parse(decodedCookie);
        console.log("Cookie: ", data);
        console.log('Type of cookie: ', typeof data);
        console.log('First entry: ', data[0].wallet_address);
        //get the wallet address out of the cookie
        const wallet = data[0].wallet_address;
        setWallet(wallet);
        
      }else{
        console.log("No cookie found");
      }
    });
  }

  useEffect(() => {
    getUserIfLoggedIn()
  }, [])


  return (
    <div>
      { wallet ? <Main wallet={wallet} /> : <Login /> }
    </div>
  )
}

export default IndexPopup
