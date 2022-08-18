import NoSleep from 'nosleep.js';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Progress } from './Progress';

const App = () => {
  const noSleep = new NoSleep();
  const [speed, setSpeed] = useState(100);
  const [fullscreenBtn, setFullscreenBtn] = useState(true);
  const options = {
    enableHighAccuracy: true,
    timeout: 50,
    maximumAge: 0
  };

  const successCb = (pos:any) => {
    console.log("succ", pos.coords.speed);
    const speedRounded = Math.floor((pos.coords.speed*3.6) * 100) / 100; // Convert to Km/h and round
    //setSpeed(speedRounded);
  }
  const errorCb = (err:any) => {
    console.log("err", err);
  }

  const handleFullscreen = () => {
    document.documentElement.requestFullscreen(); // Start app in fullscreen
    setFullscreenBtn(false);
  }

  useEffect(() => {
    noSleep.enable(); // Stop screen sleep for mobile devices
    if (navigator.geolocation) { // Watch location change
      navigator.geolocation.watchPosition(successCb, errorCb, options);
    }
  },[]);

  return (
    <div>
      <input type="text" value={speed} onChange={(e)=>{setSpeed(Number(e.target.value))}} />
      <Progress value={speed}/>
      {fullscreenBtn && (<button className={"fullscreen-btn"} onClick={handleFullscreen}>Fullscreen</button>)}
    </div>
  );
}

export default App;
