import React from 'react';
import './Progress.css';

export const Progress = ({value}:{value:number}) => {
  const percent = value;
  const lines = 165;

  return (
    <div className="progress centeralign"><>
      {Array.from(Array(lines).keys()).map((value, index) => (
        <i key={index} style={{"--i": index} as React.CSSProperties} className={percent > (index) ? "selected":""}></i>
      ))}
      <p className="selected percent-text text">{percent}<br/>km/h</p>
    </></div>
  );
}