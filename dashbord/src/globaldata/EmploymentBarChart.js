import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const employmentData = [
  { sector: 'Agriculture', percentage: 35 },
  { sector: 'Manufacturing', percentage: 22 },
  { sector: 'Services', percentage: 30 },
  { sector: 'Tourism', percentage: 13 },
];

const EmploymentBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={employmentData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sector" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="percentage" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EmploymentBarChart;
