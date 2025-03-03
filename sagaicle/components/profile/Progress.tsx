import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { MdDirectionsBike } from "react-icons/md";

// Unhandled Runtime Error回避のため動的インポート
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), {
  ssr: false,
});

interface ProgressChartProps {
  current: number;
  goal: number;
}

const ProgressChart = ({ current, goal }: ProgressChartProps) => {
  const [size, setSize] = useState(200); // 初期サイズ

  const updateSize = () => {
    const newSize = Math.min(Math.max(window.innerWidth * 0.4, 150), 300);
    setSize(newSize);
  };

  useEffect(() => {
    updateSize(); // 初回実行
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const data = [
    { name: "Completed", value: current },
    { name: "Remaining", value: goal - current },
  ];
  const COLORS = ["#d3963c", "#ddd"]; // theme-brown, theme-light-gray

  return (
    <div className="flex justify-center">
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={size * 0.3}
          outerRadius={size * 0.4}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          animationDuration={800}
          className="border-none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>

        <foreignObject
          x={size * 0.25}
          y={size * 0.25}
          width={size * 0.5}
          height={size * 0.5}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            style={{
              width: `${size * 0.5}px`,
              height: `${size * 0.5}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: `${size * 0.08}px`,
              fontWeight: "normal",
              color: "#888",
              textAlign: "center",
            }}
          >
            <div
              className="flex flex-col items-center"
              style={{ fontSize: `${size * 0.08}px` }}
            >
              <MdDirectionsBike
                style={{
                  width: size * 0.15,
                  height: size * 0.15,
                  marginBottom: size * 0.02,
                }}
              />
              <span style={{ fontSize: `${size * 0.05}px` }}>Total</span>
              <span style={{ fontSize: `${size * 0.07}px` }}>
                {current.toFixed(0)} km
              </span>
            </div>
          </motion.div>
        </foreignObject>
      </PieChart>
    </div>
  );
};

export default ProgressChart;
