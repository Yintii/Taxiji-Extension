import { useState, useEffect } from "react"
import Login from "./components/Login"
import Main from "./components/Main"

function IndexPopup() {

  const [user, setUser] = useState(null);
  const [wallets, setWallets] = useState(null);
  const [loading, setLoading] = useState(false);


  const getUserIfLoggedIn = async () => {
    chrome.cookies.get({ url: "https://nameless-thicket-51908-7757c6d88739.herokuapp.com/", name: "wallets" }, (cookie) => {
      if (cookie) {
        //decode the cookie
        const decodedCookie = decodeURIComponent(cookie.value);
        console.log("Cookie: ", JSON.parse(decodedCookie));
        setWallets(JSON.parse(decodedCookie));
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
      { wallets ? <Main /> : <Login /> }
    </div>
  )
}

export default IndexPopup
