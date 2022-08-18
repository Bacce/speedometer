import React, { useEffect, useState } from 'react';

//navigator.geolocation.watchPosition((data)=>{console.log("Update", data)}, (err)=>{console.log("Err", err)}, {timeout: 5000, maximumAge: 0, enableHighAccuracy: false});

const App = () => {
  const [speed, setSpeed] = useState(0);
  const options = {
    enableHighAccuracy: true,
    timeout: 500,
    maximumAge: 0  
  };

  const successCb = (pos:any) => {
    console.log("succ", pos.coords.speed);
    setSpeed(pos.coords.speed);
  }
  const errorCb = (err:any) => {
    console.log("err", err);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(successCb, errorCb, options);
    }

    // if ('geolocation' in navigator) {
    //   navigator.geolocation.watchPosition((data)=>{console.log("Update", data)}, (err)=>{console.log("Err", err)}, {timeout: 5000, maximumAge: 0, enableHighAccuracy: false});

    //   navigator.geolocation.getCurrentPosition((data) => {
    //     console.log(data);
    //     setLocation("");
    //   });
    // } else {
    //   /* geolocation IS NOT available */
    // }
  },[]);

  return (
    <div className="App">
      <h1>{Number(speed)}</h1>
    </div>
  );
}

export default App;
