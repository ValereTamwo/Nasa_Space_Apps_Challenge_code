import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2010', womenAffected: 2000 },
  { year: '2012', womenAffected: 3000 },
  { year: '2014', womenAffected: 3500 },
  { year: '2016', womenAffected: 4000 },
  { year: '2018', womenAffected: 4500 },
  { year: '2020', womenAffected: 5000 },
];

const WomenImpactLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="womenAffected" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WomenImpactLineChart;
