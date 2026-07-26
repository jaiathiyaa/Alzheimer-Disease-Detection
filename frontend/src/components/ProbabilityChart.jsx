import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { FaChartBar } from 'react-icons/fa';

const ProbabilityChart = ({ probabilities, darkMode }) => {
  if (!probabilities || typeof probabilities !== 'object') {
    return null;
  }

  // Stage display labels & colors
  const stageMeta = {
    NonDemented: { label: 'Non Demented', color: '#10B981' }, // Emerald
    VeryMildDemented: { label: 'Very Mild Demented', color: '#F59E0B' }, // Amber
    MildDemented: { label: 'Mild Demented', color: '#F97316' }, // Orange
    ModerateDemented: { label: 'Moderate Demented', color: '#EF4444' }, // Rose
  };

  // Convert probabilities dict object to chart array
  const data = Object.entries(probabilities).map(([key, val]) => {
    const numericVal = typeof val === 'number' ? val : parseFloat(val) || 0;
    const meta = stageMeta[key] || { label: key, color: '#3B82F6' };
    return {
      rawKey: key,
      name: meta.label,
      value: parseFloat(numericVal.toFixed(2)),
      color: meta.color,
    };
  });

  // Custom Recharts Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-sans space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <p className="font-bold">{item.name}</p>
          </div>
          <p className="text-slate-300">
            Probability: <span className="font-extrabold text-blue-400">{item.value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
            3
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Stage Probability Distribution</span>
              <FaChartBar className="text-blue-500 text-base" />
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comparative softmax confidence metrics across all 4 diagnostic stages
            </p>
          </div>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="w-full h-72 sm:h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={darkMode ? '#334155' : '#E2E8F0'}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: darkMode ? '#94A3B8' : '#64748B',
                fontSize: 12,
                fontWeight: 600,
              }}
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              unit="%"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: darkMode ? '#94A3B8' : '#64748B',
                fontSize: 12,
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              barSize={44}
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend / Breakdown Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        {data.map((item) => (
          <div
            key={item.rawKey}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800"
          >
            <div className="flex items-center space-x-2 truncate">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                {item.name}
              </span>
            </div>
            <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 ml-2">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProbabilityChart;
