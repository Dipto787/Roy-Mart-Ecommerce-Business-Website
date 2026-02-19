'use client';

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Users", value: 400 },
  { name: "Products", value: 300 },
  { name: "Orders", value: 200 },
  { name: "Revenue", value: 100 },
];

const COLORS = ["#f97316", "#3b82f6", "#10b981", "#8b5cf6"];

const AdminHome = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of your platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Users" value="1,245" />
        <StatCard title="Products" value="320" />
        <StatCard title="Orders" value="890" />
        <StatCard title="Revenue" value="$12,450" />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4">Platform Data Distribution</h2>
        <div className="w-full h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-5">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
  </div>
);

export default AdminHome;
