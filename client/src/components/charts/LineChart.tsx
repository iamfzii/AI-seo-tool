import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: Array<{ month: string; score: number }>;
}

export function LineChart({ data }: LineChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 3.7%, 15.9%)" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(240, 5%, 64.9%)"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(240, 5%, 64.9%)"
            fontSize={12}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(240, 10%, 3.9%)', 
              border: '1px solid hsl(240, 3.7%, 15.9%)',
              borderRadius: '6px',
              color: 'hsl(0, 0%, 98%)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="hsl(217, 91%, 60%)" 
            strokeWidth={2}
            dot={{ fill: 'hsl(217, 91%, 60%)', strokeWidth: 2 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
