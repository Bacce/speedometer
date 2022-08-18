import NoSleep from 'nosleep.js';
import React, { useEffect, useState } from 'react';

const App = () => {
  const noSleep = new NoSleep();
  const [speed, setSpeed] = useState(0);
  const options = {
    enableHighAccuracy: true,
    timeout: 50,
    maximumAge: 0
  };

  const successCb = (pos:any) => {
    console.log("succ", pos.coords.speed);
    const speedRounded = Math.floor(pos.coords.speed * 100) / 100;
    setSpeed(speedRounded);
  }
  const errorCb = (err:any) => {
    console.log("err", err);
  }

  useEffect(() => {
    noSleep.enable(); // Stop screen sleep for mobile devices
    if (navigator.geolocation) { // Watch location change
      navigator.geolocation.watchPosition(successCb, errorCb, options);
    }
  },[]);

  return (
    <div className="App">
      <h1>{Number(speed)}</h1>
    </div>
  );
}

export default App;
