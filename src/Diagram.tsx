import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

export const Diagram = ({values}:{values:number[]}) => {
  return (
    <ResponsiveContainer width="100%" height="20%">
      <LineChart data={values.map((value)=>{return {"name":"speed", "speed": value} })}>
        <Line type="monotone" dataKey="speed" stroke="#8884d8" dot={<></>} isAnimationActive={false} />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  )
}