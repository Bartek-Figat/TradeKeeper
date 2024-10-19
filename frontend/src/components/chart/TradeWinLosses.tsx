import React, { useEffect, useRef, useMemo } from "react";
import { createChart, ISeriesApi, LineData } from "lightweight-charts";
// ... existing code ...

const TradeChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const wins = useMemo(
    () => [
      {
        symbol: "SYM759",
        exitDate: 1729274357072,
        entryPrice: 28.38,
        exitPrice: 77.68,
        profitLoss: 49.30000000000001,
      },
      {
        symbol: "SYM979",
        exitDate: 1729258549505,
        entryPrice: 23.33,
        exitPrice: 86.01,
        profitLoss: 62.68000000000001,
      },
      {
        symbol: "SYM572",
        exitDate: 1729228716640,
        entryPrice: 29.47,
        exitPrice: 98.03,
        profitLoss: 68.56,
      },
    ],
    [],
  );

  const losses = useMemo(
    () => [
      {
        symbol: "SYM142",
        exitDate: 1729233091986,
        entryPrice: 86.98,
        exitPrice: 34.96,
        profitLoss: -52.02,
      },
      {
        symbol: "SYM291",
        exitDate: 1729215603667,
        entryPrice: 36.3,
        exitPrice: 30.93,
        profitLoss: -5.369999999999997,
      },
      {
        symbol: "SYM929",
        exitDate: 1729175080347,
        entryPrice: 19.3,
        exitPrice: 6.13,
        profitLoss: -13.170000000000002,
      },
    ],
    [],
  );

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
          tickMarkFormatter: (timestamp: number) => {
            return new Date(timestamp * 1000).toLocaleDateString(); // Use your formatter here
          },
        },
      });

      const lineSeries: ISeriesApi<"Line"> = chart.addLineSeries();

      const data: LineData[] = [...wins, ...losses]
        .map((trade, index) => ({
          time: new Date(trade.exitDate + index).toISOString().split("T")[0], // Add index to ensure uniqueness
          value: trade.profitLoss,
          color: trade.profitLoss > 0 ? "green" : "red",
        }))
        .sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
        ); // Sort by time

      lineSeries.setData(
        data.map(({ time, value, color }) => ({ time, value, color })), // Set data with exitDate as time
      );

      const toolTip = document.createElement("div");
      toolTip.style.width = "120px";
      toolTip.style.height = "auto";
      toolTip.style.position = "absolute";
      toolTip.style.display = "none";
      toolTip.style.padding = "10px";
      toolTip.style.boxSizing = "border-box";
      toolTip.style.fontSize = "14px";
      toolTip.style.textAlign = "left";
      toolTip.style.zIndex = "1000";
      toolTip.style.pointerEvents = "none";
      toolTip.style.border = "1px solid";
      toolTip.style.borderRadius = "8px";
      toolTip.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      toolTip.style.transition = "opacity 0.3s ease";
      toolTip.style.opacity = "0";
      toolTip.style.fontFamily =
        '-apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif';
      toolTip.style.background = "white";
      toolTip.style.color = "black";
      toolTip.style.borderColor = "#2962FF";
      chartContainerRef.current.appendChild(toolTip);

      chart.subscribeCrosshairMove((param) => {
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > chartContainerRef.current!.clientWidth ||
          param.point.y < 0 ||
          param.point.y > chartContainerRef.current!.clientHeight
        ) {
          toolTip.style.opacity = "0";
          toolTip.style.display = "none"; // Hide the tooltip
        } else {
          const dateStr = param.time;
          toolTip.style.opacity = "1";
          toolTip.style.display = "block"; // Show the tooltip
          const data = param.seriesData.get(lineSeries);
          let price = 0;
          if (data) {
            if ("value" in data) {
              price = data.value;
            } else if ("close" in data) {
              price = data.close;
            }
          }
          toolTip.innerHTML = `<div style="color: #2962FF; font-weight: bold;">Trade Info</div><div style="font-size: 24px; margin: 4px 0px; color: black">
              ${Math.round(100 * price) / 100}
              </div><div style="color: black">
              ${dateStr}
              </div>`;

          const coordinate = lineSeries.priceToCoordinate(price);
          let shiftedCoordinate = param.point.x - 60;
          if (coordinate === null) {
            return;
          }
          shiftedCoordinate = Math.max(
            0,
            Math.min(
              chartContainerRef.current!.clientWidth - 120,
              shiftedCoordinate,
            ),
          );
          const coordinateY =
            coordinate - 80 - 15 > 0
              ? coordinate - 80 - 15
              : Math.max(
                  0,
                  Math.min(
                    chartContainerRef.current!.clientHeight - 80 - 15,
                    coordinate + 15,
                  ),
                );
          toolTip.style.left = shiftedCoordinate + "px";
          toolTip.style.top = coordinateY + "px";
        }
      });

      return () => chart.remove();
    }
  }, [chartContainerRef, wins, losses]);

  return (
    <div
      ref={chartContainerRef}
      style={{ position: "relative", width: "100%" }}
    />
  );
};

export default TradeChart;
