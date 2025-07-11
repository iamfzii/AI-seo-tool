import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: Array<{ type: string; count: number }>;
}

export function BarChart({ data }: BarChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 3.7%, 15.9%)" />
          <XAxis 
            dataKey="type" 
            stroke="hsl(240, 5%, 64.9%)"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(240, 5%, 64.9%)"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(240, 10%, 3.9%)', 
              border: '1px solid hsl(240, 3.7%, 15.9%)',
              borderRadius: '6px',
              color: 'hsl(0, 0%, 98%)'
            }}
          />
          <Bar 
            dataKey="count" 
            fill="hsl(217, 91%, 60%)"
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
