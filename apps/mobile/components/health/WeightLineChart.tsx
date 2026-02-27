import { useWindowDimensions } from "react-native";
import Svg, {
  Circle,
  Defs,
  Path,
  Stop,
  LinearGradient as SvgGradient,
  Text as SvgText,
} from "react-native-svg";
import type { WeightHistoryEntry } from "./types";

interface WeightLineChartProps {
  data: WeightHistoryEntry[];
}

export function WeightLineChart({ data }: WeightLineChartProps) {
  const { width: screenWidth } = useWindowDimensions();
  // account for Card padding (px-5 * 2 = 40) + Card internal padding (p-5 * 2 = 40)
  const svgWidth = screenWidth - 80;
  const svgHeight = 120;
  const padL = 28;
  const padR = 12;
  const padT = 16;
  const padB = 28;

  const chartW = svgWidth - padL - padR;
  const chartH = svgHeight - padT - padB;

  const vals = data.map((d) => d.value);
  const minV = Math.min(...vals) - 0.3;
  const maxV = Math.max(...vals) + 0.3;

  const getX = (i: number) => padL + (i / (data.length - 1)) * chartW;
  const getY = (v: number) => padT + (1 - (v - minV) / (maxV - minV)) * chartH;

  const points = data.map((d, i) => ({ x: getX(i), y: getY(d.value) }));

  // Smooth bezier via cardinal spline tension
  const buildPath = () => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const prev = points[i - 1] ?? points[i];
      const curr = points[i];
      const next = points[i + 1];
      const after = points[i + 2] ?? next;
      const cp1x = curr.x + (next.x - prev.x) / 6;
      const cp1y = curr.y + (next.y - prev.y) / 6;
      const cp2x = next.x - (after.x - curr.x) / 6;
      const cp2y = next.y - (after.y - curr.y) / 6;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    return d;
  };

  const buildAreaPath = () => {
    const linePath = buildPath();
    const lastPt = points[points.length - 1];
    const firstPt = points[0];
    return `${linePath} L ${lastPt.x} ${svgHeight - padB} L ${firstPt.x} ${svgHeight - padB} Z`;
  };

  const linePath = buildPath();
  const areaPath = buildAreaPath();
  const lastPt = points[points.length - 1];

  return (
    <Svg width={svgWidth} height={svgHeight}>
      <Defs>
        <SvgGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FF8C69" stopOpacity="0.25" />
          <Stop offset="1" stopColor="#FF8C69" stopOpacity="0" />
        </SvgGradient>
      </Defs>

      {/* Area fill */}
      <Path d={areaPath} fill="url(#areaGrad)" />

      {/* Line */}
      <Path
        d={linePath}
        stroke="#FF8C69"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dots */}
      {points.map((pt, i) => (
        <Circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r={i === points.length - 1 ? 5 : 3}
          fill={i === points.length - 1 ? "#FF8C69" : "#FF8C69"}
          stroke="white"
          strokeWidth={i === points.length - 1 ? 2.5 : 1.5}
        />
      ))}

      {/* Value label on last point */}
      <SvgText
        x={lastPt.x}
        y={lastPt.y - 10}
        fontSize={10}
        fill="#FF8C69"
        textAnchor="middle"
        fontWeight="bold"
      >
        {data[data.length - 1].value}
      </SvgText>

      {/* X-axis labels */}
      {data.map((d, i) => (
        <SvgText
          key={d.date}
          x={getX(i)}
          y={svgHeight - 6}
          fontSize={10}
          fill="#9CA3AF"
          textAnchor="middle"
        >
          {d.date}
        </SvgText>
      ))}
    </Svg>
  );
}
