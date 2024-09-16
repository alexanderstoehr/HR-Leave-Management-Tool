import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LabelList,
  Label,
} from "recharts";

const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

export default class EmployeeChart extends PureComponent {
  render() {
    const { chartData } = this.props;

    return (
      <PieChart width={300} height={120}>
        <Pie
          data={chartData}
          cx={140}
          cy={90}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList
            dataKey="name"
            position="outside"
            style={{ fontSize: "12px", stroke: "none" }}
          />
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }
}
