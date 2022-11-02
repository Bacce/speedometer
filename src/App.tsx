import {parse, stringify} from 'zipson';
import NoSleep from 'nosleep.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Diagram } from './Diagram';
import { Progress } from './Progress';

const App = () => {
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);
   const noSleep = new NoSleep();
  const [speed, setSpeed] = useState(0);
  const [logSpeed, setLogSpeed] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const speedsLog = useRef<{speed:number,time:number, coords: any}[]>([]);

  const options = {
    enableHighAccuracy: true,
    timeout: 50,
    maximumAge: 0
  };

  const successCb = (pos:any) => {
    console.log("succ", pos.coords);
    const speedRounded = Math.floor((pos.coords.speed*3.6) * 100) / 100; // Convert to Km/h and round
    console.log("SR",speedRounded);
    const currentTime = + new Date();

    let newSpeedLogs = [...speedsLog.current];
    let newData = {speed:pos.coords.speed*3.6, time: currentTime, coords: {lat:pos.coords.latitude, long: pos.coords.longitude}};
    newSpeedLogs.push(newData);
    speedsLog.current = newSpeedLogs;
    forceUpdate();
    setSpeed(speedRounded);
  }
  
  const errorCb = (err:any) => {
    console.log("err", err);
  }

  const addToArray = (array:number[], item:number) => {
    let newArray = array.slice(0,-1); // Remove last item
    newArray.unshift(item);
    return newArray;
  }

  const downloadHistory = () => {
    const logs = localStorage.getItem("speedsLog");
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(logs || "");
    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "export_speedometer.zipson";
    link.click();
  }

  const geoloc = useCallback(async()=>{
    if (navigator.geolocation) { // Watch location change
      navigator.geolocation.watchPosition(await successCb, errorCb, options);
    }
  },[]);

  useEffect(()=>{
    setLogSpeed(addToArray(logSpeed, speed));
  },[speed]);

  useEffect(()=>{
    if(speedsLog.current && speedsLog.current.length > 0) {
      localStorage.setItem("speedsLog", stringify(speedsLog.current));
    }
  },[speedsLog.current]);

  useEffect(() => {
    noSleep.enable(); // Stop screen sleep for mobile devices
    geoloc().catch((e)=>{console.log("err", e)});
    // Load data from localstorage
    const speeds = localStorage.getItem("speedsLog");
    
    if(speeds){
      console.log("speeds log loaded");
      console.log(JSON.stringify(parse(speeds)));
      speedsLog.current = parse(speeds);
    }
  },[]);

  return (
    <div style={{height: '100vh', position: 'relative',}}>
      <Diagram values={logSpeed} />
      <Progress value={speed} />
      <p>Log count: {speedsLog.current.length}</p>
      <button style={{padding: 15}} onClick={downloadHistory}>Download logs</button>
    </div>
  );
}

export default App;
