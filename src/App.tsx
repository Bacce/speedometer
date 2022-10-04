import NoSleep from 'nosleep.js';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Diagram } from './Diagram';
import { Progress } from './Progress';

const App = () => {
  const debug = true;
  const noSleep = new NoSleep();
  const [speed, setSpeed] = useState(0);
  const [fullscreenBtn, setFullscreenBtn] = useState(true);
  const [logSpeed, setLogSpeed] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

  const options = {
    enableHighAccuracy: true,
    timeout: 50,
    maximumAge: 0
  };

  const successCb = (pos:any) => {
    console.log("succ", pos.coords.speed);
    const speedRounded = Math.floor((pos.coords.speed*3.6) * 100) / 100; // Convert to Km/h and round
    setSpeed(speedRounded);
  }
  
  const errorCb = (err:any) => {
    console.log("err", err);
  }

  const handleFullscreen = () => {
    document.documentElement.requestFullscreen(); // Start app in fullscreen
    setFullscreenBtn(false);
  }

  const addToArray = (array:number[], item:number) => {
    let newArray = array.slice(0,-1); // Remove last item
    newArray.unshift(item);
    return newArray;
  }

  useEffect(() => {
    noSleep.enable(); // Stop screen sleep for mobile devices
    if (navigator.geolocation) { // Watch location change
      navigator.geolocation.watchPosition(successCb, errorCb, options);
    }
    //setLogSpeed(Array.from(Array(100), (_, i) => 0));
  },[]);

  useEffect(()=>{
    setLogSpeed(addToArray(logSpeed, speed));
  },[speed]);

  return (
    <div style={{height: '100vh', position: 'relative',}}>
      {debug ? (<>
          {/* <input type="text" value={speed} onChange={(e)=>{console.log("Change triggered");setSpeed(Number(e.target.value))}} /> */}
        </>
      ):(<></>)}
      <Diagram values={logSpeed} />
      <Progress value={speed}/>
      {fullscreenBtn && (<button className={"fullscreen-btn"} onClick={handleFullscreen}>Fullscreen</button>)}
    </div>
  );
}

export default App;
