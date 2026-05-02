import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  categorie: string;
  montant: number;
}

interface Props {
  transactions: Transaction[];
}

const COLORS = ['#1B5E20', '#F9A825', '#1565C0', '#E8F5E9', '#FFF8E1'];

const TransactionChart: React.FC<Props> = ({ transactions }) => {
  const dataMap: Record<string, number> = {};
  transactions.forEach(t => {
    dataMap[t.categorie] = (dataMap[t.categorie] || 0) + t.montant;
  });
  const data = Object.keys(dataMap).map((k, i) => ({ name: k, value: dataMap[k], color: COLORS[i % COLORS.length] }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-primary">Dépenses par catégorie</h3>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} innerRadius={50} outerRadius={80} paddingAngle={2}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value.toLocaleString('fr-FR')} FCFA`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionChart;
