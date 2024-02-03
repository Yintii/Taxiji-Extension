import { useState, useEffect } from "react"
import Login from "./components/login"

function IndexPopup() {

  const [user, setUser] = useState(null)

  const url = "https://nameless-thicket-51908-7757c6d88739.herokuapp.com/"
  const cookie = 'user_wallets'

  const checkUser = async () => {
    chrome.cookies.get({ url: url, name: cookie }, function (cookie) {
      if (cookie) {
        try {

            //get the user_info cookie
            const user_info = cookie.value
            console.log(user_info)

          // Implement your logic to extract user information from the decoded value
        } catch (error) {
          console.error('Error decoding cookie value:', error);
        }
      } else {
        console.log('Cookie not found');
      }
    });

  }


  // function parseUserInfo(decodedValue) {
  //   // Implement your parsing logic based on the actual format used by the server
  //   // For example, if the format is key-value pairs separated by some delimiter:
  //   var keyValuePairs = decodedValue.split('&');
  //   var userInfo = {};

  //   keyValuePairs.forEach(function (pair) {
  //     var [key, value] = pair.split('=');
  //     userInfo[key] = value;
  //   });

  //   return userInfo;
  // }


  useEffect(() => {
    checkUser()
  }, [])

  const Default = () => {
    return(
      <div
        style={{
          padding: 16,
          width: 200,
        }}>
        <h2>Taxiji here!</h2>
        <p>We see you have a taxable transaction!</p>
        <p>Would you like to send your withholding now?</p>
        <div>
          <button>Yes</button>
          <button>Later</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {user ? <Default /> : <Login />}
    </div>
  )
}

export default IndexPopup
