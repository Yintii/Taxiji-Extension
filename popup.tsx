import { useState, useEffect } from "react"

function IndexPopup() {
  const [data, setData] = useState("")


  const connectWebSocket = () => {
    const socket = new WebSocket('ws://34.94.156.159:3000');

    socket.addEventListener('open', () => {
      console.log('WebSocket connection opened');
      // Do any setup after successful connection

      // Optionally, you may want to send an initial message or request here
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.signal === 'show_popup') {
          showPopup(data.payload); // Pass the payload to the showPopup function
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed', event);

      // Retry after a delay (e.g., 5 seconds)
      setTimeout(() => {
        connectWebSocket();
      }, 5000);
    });

    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);

      // Retry after a delay (e.g., 5 seconds)
      setTimeout(() => {
        connectWebSocket();
      }, 5000);
    });
  };


  function showPopup(payload) {
    // Code to open the popup and use the payload data
    console.log('Received payload:', payload);
  }

  // Start the WebSocket connection
  connectWebSocket();

  return (
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
  )
}

export default IndexPopup
