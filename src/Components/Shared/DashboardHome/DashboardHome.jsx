import React, { useEffect, useState } from "react";
import { Layers3, Users, Tag } from "lucide-react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const DashboardHome = () => {
  const [totalGroups, setTotalGroups] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [categoryCount, setCategoryCount] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupRes, userRes] = await Promise.all([
          axios.get(`${BASE_URL}/menu`),
          axios.get(`${BASE_URL}/user`),
        ]);

        setTotalGroups(groupRes.data.length);

        const categoryMap = {};
        groupRes.data.forEach((item) => {
          const cat = item.category || "Uncategorized";
          categoryMap[cat] = (categoryMap[cat] || 0) + 1;
        });

        const categoryData = Object.entries(categoryMap).map(([key, value]) => ({
          name: key,
          value,
        }));

        setCategoryCount(categoryData);
        setTotalUsers(userRes.data.length);
        setLoading(false); // ✅ Turn off loading after data loaded
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Total Groups",
      count: totalGroups,
      icon: <Layers3 className="text-blue-700" size={30} />,
      bg: "bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-700",
    },
    {
      title: "Total Users",
      count: totalUsers,
      icon: <Users className="text-green-700" size={30} />,
      bg: "bg-gradient-to-br from-green-200 to-green-300 dark:from-green-800 dark:to-green-700",
    },
    {
      title: "Top Category",
      count:
        categoryCount.length > 0
          ? categoryCount.reduce((a, b) => (a.value > b.value ? a : b)).name
          : "N/A",
      icon: <Tag className="text-purple-700" size={30} />,
      bg: "bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-700",
    },
  ];

  const COLORS = [
    "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#EC4899", "#8B5CF6",
  ];

  // ✅ Show spinner if loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl shadow-md ${card.bg} text-white dark:text-white transition duration-300`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              {card.icon}
            </div>
            <p className="text-4xl font-bold">{card.count}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Group Distribution by Category
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={categoryCount}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={140}
              innerRadius={60}
              paddingAngle={5}
              label
            >
              {categoryCount.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "10px",
                color: "#fff",
              }}
            />
            <Legend
              wrapperStyle={{
                color: "#4B5563",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHome;
